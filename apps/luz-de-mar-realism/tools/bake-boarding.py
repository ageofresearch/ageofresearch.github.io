"""Rebake only boarding receivers, retaining the cockpit mesh/UV payload verbatim."""
import bpy,numpy as np,subprocess,math,json,hashlib,time
from pathlib import Path
from mathutils import Vector
R=Path(__file__).resolve().parents[1];W=R/'work/boarding-vr-r01';A=R/'public/assets';rawdir=W/'raw';rawdir.mkdir(exist_ok=True)
bpy.ops.wm.open_mainfile(filepath=str(W/'boarding-master.blend'));S=bpy.context.scene
S.render.engine='CYCLES';S.cycles.device='CPU';S.cycles.samples=64;S.cycles.use_denoising=False;S.cycles.max_bounces=5;S.cycles.diffuse_bounces=3;S.render.threads_mode='FIXED';S.render.threads=4
S.render.bake.use_pass_color=False;S.render.bake.use_pass_direct=True;S.render.bake.use_pass_indirect=True
S.render.image_settings.file_format='OPEN_EXR';S.render.image_settings.color_mode='RGB';S.render.image_settings.color_depth='16'
for o in S.objects:
 if o.get('runtimePresentation')or o.type=='LIGHT'and o.data.type=='SUN':o.hide_render=True
S.view_settings.view_transform='Khronos PBR Neutral';S.view_settings.exposure=1
sha=lambda p:hashlib.sha256(Path(p).read_bytes()).hexdigest()
report={};geometry=json.load(open(W/'geometry.json'))
for zone,pos in [('beach-club',[1.6,0,3.2]),('cockpit',[6.9,0,5.0])]:
 t=time.time();ob=S.objects[zone+' | '+zone];size=2048;image=bpy.data.images.new('Boarding raw ambient '+zone,size,size,float_buffer=True);image.use_fake_user=True
 for m in ob.data.materials:
  node=m.node_tree.nodes.get('BAKE | linear ambient only')or m.node_tree.nodes.new('ShaderNodeTexImage');node.name='BAKE | linear ambient only';node.image=image;m.node_tree.nodes.active=node
 bpy.ops.object.select_all(action='DESELECT');ob.select_set(True);bpy.context.view_layer.objects.active=ob;ob.data.uv_layers.active_index=1;S.render.bake.margin=4;S.cycles.samples=64
 bpy.ops.object.bake(type='DIFFUSE',uv_layer='UV1');ob.data.uv_layers.active_index=0
 raw=rawdir/(zone+'-ambient.exr');S.render.image_settings.exr_codec='PIZ';image.save_render(str(raw),scene=S)
 rgba=np.array(image.pixels[:],dtype=np.float32).reshape(size,size,4);pfm=rawdir/(zone+'.pfm');den=rawdir/(zone+'-denoised.pfm')
 with open(pfm,'wb')as f:f.write(b'PF\n2048 2048\n-1.0\n');f.write(rgba[:,:,:3].astype('<f4').tobytes())
 subprocess.run(['/tmp/luz-oidn/bin/oidnDenoise','-d','cpu','-f','RTLightmap','--hdr',str(pfm),'-o',str(den),'--threads','4','--maxmem','384'],check=True)
 with open(den,'rb')as f:
  assert f.readline().strip()==b'PF';assert f.readline().strip()==b'2048 2048';assert float(f.readline())<0;rgb=np.frombuffer(f.read(),dtype='<f4').reshape(size,size,3)
 assert np.isfinite(rgb).all();rgba[:,:,:3]=np.maximum(rgb,0);filtered=bpy.data.images.new('Boarding filtered '+zone,size,size,float_buffer=True);filtered.pixels.foreach_set(rgba.ravel());filtered.update()
 filtered.save_render(str(rawdir/(zone+'-filtered-lossless.exr')),scene=S)
 S.render.image_settings.exr_codec='DWAA';filtered.save_render(str(A/zone/('ambient-'+zone+'.exr')),scene=S)
 decoded=bpy.data.images.load(str(A/zone/('ambient-'+zone+'.exr')),check_existing=False);pixels=np.array(decoded.pixels[:],dtype=np.float32).reshape(size,size,4);difference=np.abs(pixels[:,:,:3]-rgba[:,:,:3]);compression={'meanAbsoluteLinearError':float(difference.mean()),'p99AbsoluteLinearError':float(np.percentile(difference,99)),'maxAbsoluteLinearError':float(difference.max())}
 image.pack();image.use_fake_user=True;filtered.pack();filtered.use_fake_user=True;pfm.unlink();den.unlink()
 camera=bpy.data.cameras.new(zone+' boarding probe');cam=bpy.data.objects.new(zone+' boarding probe',camera);S.collection.objects.link(cam);S.camera=cam;camera.type='PANO';camera.panorama_type='EQUIRECTANGULAR';cam.rotation_euler=(math.pi/2,0,0);cam.location=(pos[1]*7.47/7.6,-(pos[0]*35.23/36-17.615),pos[2]-2.01)
 S.render.resolution_x=1024;S.render.resolution_y=512;S.render.resolution_percentage=100;S.cycles.samples=128;S.render.filepath=str(A/zone/'probe.exr');bpy.ops.render.render(write_still=True)
 binding=json.load(open(A/zone/'authoring.json'));binding.update({'boardingRevision':'boarding-vr-r01','samples':64,'rawBakesSHA256':{zone:sha(raw)},'denoise':'OIDN 2.5.1 CPU RTLightmap; raw unfiltered EXR retained in authoring archive','distributionCodec':'DWAA half-float linear HDR; lossless filtered and raw masters retained','compressionError':compression,'bakeSeconds':round(time.time()-t,2),'nativeToneCurve':'Khronos PBR Neutral','cameraExposure':2})
 if zone=='beach-club':binding['atlasPadding']=geometry['bindings'][zone]['uv'];binding['bakeGeometrySHA256']=geometry['bindings'][zone]['sourceSHA256']
 for probe in binding['probes']:probe['samples']=128
 (A/zone/'authoring.json').write_text(json.dumps(binding,indent=2)+'\n');report[zone]={'seconds':round(time.time()-t,2),'rawSHA256':sha(raw),'publishedAtlasSHA256':sha(A/zone/('ambient-'+zone+'.exr')),'publishedProbeSHA256':sha(A/zone/'probe.exr'),'compression':compression};bpy.data.objects.remove(cam,do_unlink=True)
 print('BOARDING BAKED',zone,report[zone],flush=True)
(W/'lighting.json').write_text(json.dumps(report,indent=2)+'\n');bpy.ops.wm.save_as_mainfile(filepath=str(W/'boarding-lit.blend'),compress=True)
