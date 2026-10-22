"""Bake ambient-only HDR, filter linear data and capture local specular probes.
Blender input: work/exteriors-ready.blend. Optional -- cockpit beach-club ...
No direct sun is present during the bake or probes; it is rendered live.
"""
import bpy,numpy as np,subprocess,math,json,hashlib,sys,time
from pathlib import Path
from mathutils import Vector
R=Path(__file__).resolve().parents[1];W=R/'work';A=R/'public/assets';S=bpy.context.scene
ids=sys.argv[sys.argv.index('--')+1:]if'--'in sys.argv else['cockpit','beach-club','saloon','port-side','starboard-side','bow']
specs={'saloon':[[9.65,.65,5.25],[12,-.2,5.20],[16,0,5.30]],'cockpit':[[6.9,0,5.0]],'beach-club':[[1.6,0,3.2]],'port-side':[[14.5,3.12,5.0]],'starboard-side':[[14.5,-3.12,5.0]],'bow':[[28.0,0,7.2]]}
sx=35.23/36;sy=7.47/7.6
def pt(p):return Vector((p[1]*sy,-(p[0]*sx-17.615),p[2]-2.01))
S.render.engine='CYCLES';S.cycles.device='CPU';S.cycles.samples=24;S.cycles.use_denoising=False;S.cycles.max_bounces=5;S.cycles.diffuse_bounces=3;S.render.threads_mode='FIXED';S.render.threads=4;S.render.bake.use_pass_color=False;S.render.bake.use_pass_direct=True;S.render.bake.use_pass_indirect=True
S.render.image_settings.file_format='OPEN_EXR';S.render.image_settings.color_mode='RGB';S.render.image_settings.color_depth='16';S.render.image_settings.exr_codec='PIZ'
for o in S.objects:
 if o.type=='LIGHT':o.visible_camera=False;o.visible_glossy=False
 if o.get('runtimePresentation'):o.hide_render=True
for id in ids:
 t=time.time();out=A/id;binding=json.loads((out/'authoring.json').read_text());cache=W/'raw-atlases'/binding['bakeGeometrySHA256'];cache.mkdir(parents=True,exist_ok=True);raws={}
 for atlas in binding['atlases']:
  ob=S.objects[id+' | '+atlas]
  # Curves / glass / moving parts have no permanent shadow imprint.
  for o in S.objects:
   if o.get('lightmap')=='none':o.hide_render=True
  im=bpy.data.images.new('RAW CURRENT | '+atlas,2048,2048,float_buffer=True);im.use_fake_user=True
  for m in ob.data.materials:
   node=m.node_tree.nodes['BAKE | linear ambient only'];node.image=im;m.node_tree.nodes.active=node
  bpy.ops.object.select_all(action='DESELECT');ob.select_set(True);bpy.context.view_layer.objects.active=ob;ob.data.uv_layers.active_index=1;S.render.bake.margin=binding['atlasPadding'][atlas]['bakeMarginPixels'];bpy.ops.object.bake(type='DIFFUSE',uv_layer='UV1');ob.data.uv_layers.active_index=0
  raw=cache/(id+'-ambient-'+atlas+'.exr');im.save_render(str(raw),scene=S);im.pack();raws[atlas]=hashlib.sha256(raw.read_bytes()).hexdigest()
  rgba=np.array(im.pixels[:],dtype=np.float32).reshape(2048,2048,4);pfm=cache/(id+'-'+atlas+'.pfm');den=pfm.with_name(pfm.stem+'-denoised.pfm')
  with open(pfm,'wb')as f:f.write(b'PF\n2048 2048\n-1.0\n');f.write(rgba[:,:,:3].astype('<f4').tobytes())
  subprocess.run(['/tmp/luz-oidn/bin/oidnDenoise','-d','cpu','-f','RTLightmap','--hdr',str(pfm),'-o',str(den),'--threads','4','--maxmem','384'],check=True)
  with open(den,'rb')as f:assert f.readline().strip()==b'PF';assert f.readline().strip()==b'2048 2048';assert float(f.readline())<0;rgb=np.frombuffer(f.read(),dtype='<f4').reshape(2048,2048,3)
  assert np.isfinite(rgb).all();rgba[:,:,:3]=np.maximum(rgb,0);filtered=bpy.data.images.new('FILTERED | '+atlas,2048,2048,float_buffer=True);filtered.pixels.foreach_set(rgba.ravel());filtered.update();filtered.save_render(str(out/('ambient-'+atlas+'.exr')),scene=S);filtered.pack();filtered.use_fake_user=True
  print('BAKED/FILTERED',id,atlas,time.time()-t,flush=True)
 for o in S.objects:
  if o.get('lightmap')=='none':o.hide_render=False
 camera=bpy.data.cameras.new(id+' local probe');cam=bpy.data.objects.new(id+' local probe',camera);S.collection.objects.link(cam);S.camera=cam;camera.type='PANO';camera.panorama_type='EQUIRECTANGULAR';cam.rotation_euler=(math.pi/2,0,0);S.render.resolution_x=1024;S.render.resolution_y=512;S.render.resolution_percentage=100;S.cycles.samples=24;probes=[]
 for i,p in enumerate(specs[id]):
  asset='probe.exr'if len(specs[id])==1 or i==1 else'probe-'+('aft'if i==0 else'dining')+'.exr';cam.location=pt(p);S.render.filepath=str(out/asset);bpy.ops.render.render(write_still=True);probes.append({'id':id+'-'+str(i),'position':[p[1]*sy,p[2]-2.01,p[0]*sx-17.615],'sourcePosition':p,'asset':asset,'width':1024,'height':512,'samples':24,'purpose':'Local static specular capture; live sun excluded'})
 # Self-contained editable scene for each zone. Context is a separate collection,
 # not a duplicate of the selected zone's surfaces. Other-zone occluders are kept
 # as merged meshes so the archive can reproduce its baked light and reflection.
 scene=bpy.data.scenes.new(id+' | Editable authoring');scene.world=S.world;scene.unit_settings.system='METRIC';scene.render.engine='CYCLES';scene.cycles.samples=24;scene.view_settings.exposure=math.log2(3)
 for o in S.objects:
  if o.type in['MESH','LIGHT']and not any(c.name.startswith('EDITABLE |')for c in o.users_collection):scene.collection.objects.link(o)
 edit=bpy.data.collections.get('EDITABLE | '+id);scene.collection.children.link(edit)
 scene['reference']='https://vrcloud.com/?pv=1667308298';scene['accuracy']='All exterior dimensions inferred from panoramic views and inherited model; not surveyed';scene['zone']=id;scene['fixedPlatform']=True;scene['fixedOpenAftDoor']=True
 camera.type='PERSP';camera.sensor_fit='VERTICAL';camera.angle=math.radians(72);p=specs[id][len(specs[id])//2];cam.location=pt(p);target=[p[0]+(2 if id not in['cockpit','beach-club']else-2),p[1],p[2]];cam.rotation_euler=(pt(target)-cam.location).to_track_quat('-Z','Y').to_euler();scene.collection.objects.link(cam);scene.camera=cam
 sun=bpy.data.lights.new('Presentation sun, excluded from ambient','SUN');sun.energy=1.15;sun.color=(1,.94,.85);sun.angle=.035;lamp=bpy.data.objects.new('Presentation sun',sun);scene.collection.objects.link(lamp);lamp.rotation_euler=(pt([13,0,4.7])-pt([13,-10,10])).to_track_quat('-Z','Y').to_euler();lamp['runtimePresentation']=True
 native=W/(id+'-master.blend');bpy.data.libraries.write(str(native),{scene},fake_user=True,compress=True)
 binding.update({'rawBakesSHA256':raws,'rawNativeBakesPacked':True,'denoise':'OIDN 2.5.1 CPU RTLightmap, full linear HDR atlas','probes':probes,'probePosition':probes[len(probes)//2]['position'],'halfFloatLinearAtlases':True,'masterSHA256':hashlib.sha256(native.read_bytes()).hexdigest(),'bakeSeconds':round(time.time()-t,2)});(out/'authoring.json').write_text(json.dumps(binding,indent=2)+'\n')
 bpy.data.scenes.remove(scene);bpy.data.objects.remove(lamp,do_unlink=True);bpy.data.objects.remove(cam,do_unlink=True);print('ZONE COMPLETE',id,time.time()-t,flush=True)
print('ALL BAKES COMPLETE',ids,flush=True)
