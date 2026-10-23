"""Bake indirect work light, excluding movable equipment; capture local probes."""
import bpy,numpy as np,json,hashlib,math,subprocess,time
from pathlib import Path
from mathutils import Vector
R=Path(__file__).resolve().parents[1];W=R/'work/machinery-r11';A=R/'public/assets/machinery';S=bpy.context.scene;binding=json.loads((A/'authoring.json').read_text());cache=W/'raw-atlases'/binding['bakeGeometrySHA256'];cache.mkdir(parents=True,exist_ok=True)
S.render.engine='CYCLES';S.cycles.samples=48;S.cycles.use_denoising=False;S.render.threads_mode='FIXED';S.render.threads=4;S.render.bake.use_pass_direct=False;S.render.bake.use_pass_indirect=True;S.render.bake.use_pass_color=False;S.render.image_settings.file_format='OPEN_EXR';S.render.image_settings.color_mode='RGB';S.render.image_settings.color_depth='16';S.render.image_settings.exr_codec='PIZ';raws={}
def filtered_image(im,name,folder,filter='RTLightmap'):
 width,height=im.size;rgba=np.array(im.pixels[:],dtype=np.float32).reshape(height,width,4);pfm=folder/(name+'.pfm');den=folder/(name+'-denoised.pfm')
 with open(pfm,'wb')as f:f.write(('PF\n%d %d\n-1.0\n'%(width,height)).encode());f.write(rgba[:,:,:3].astype('<f4').tobytes())
 subprocess.run(['/tmp/luz-oidn/bin/oidnDenoise','-d','cpu','-f',filter,'--hdr',str(pfm),'-o',str(den),'--threads','4','--maxmem','384'],check=True)
 with open(den,'rb')as f:assert f.readline().strip()==b'PF';assert f.readline().strip()==('%d %d'%(width,height)).encode();assert float(f.readline())<0;rgb=np.frombuffer(f.read(),dtype='<f4').reshape(height,width,3)
 assert np.isfinite(rgb).all();rgba[:,:,:3]=np.maximum(rgb,0);out=bpy.data.images.new('FILTERED | '+name,width,height,float_buffer=True);out.pixels.foreach_set(rgba.ravel());out.update();out.pack();out.use_fake_user=True;return out
for o in S.objects:
 if o.get('dynamic')or o.get('lightmap')=='none':o.hide_render=True
for atlas in['architecture','furniture']:
 t=time.time();o=S.objects['LD_R02 | '+atlas];im=bpy.data.images.new('RAW CURRENT | '+atlas,2048,2048,float_buffer=True);im.use_fake_user=True
 for m in o.data.materials:n=m.node_tree.nodes['BAKE | linear ambient only'];n.image=im;m.node_tree.nodes.active=n
 bpy.ops.object.select_all(action='DESELECT');o.select_set(True);bpy.context.view_layer.objects.active=o;o.data.uv_layers.active_index=1;S.render.bake.margin=binding['atlasPadding'][atlas]['bakeMarginPixels'];bpy.ops.object.bake(type='DIFFUSE',uv_layer='UV1');o.data.uv_layers.active_index=0;file=cache/('machinery-ambient-'+atlas+'.exr');im.save_render(str(file),scene=S);im.pack();raws[atlas]=hashlib.sha256(file.read_bytes()).hexdigest();filtered=filtered_image(im,atlas,cache);filtered.save_render(str(A/('ambient-'+atlas+'.exr')),scene=S);print('BAKED/FILTERED',atlas,time.time()-t,flush=True)
for o in S.objects:
 if o.get('dynamic')or o.get('lightmap')=='none':o.hide_render=False
camera=S.camera;camera.data.type='PANO';camera.data.panorama_type='EQUIRECTANGULAR';camera.rotation_euler=(math.pi/2,0,0);S.render.resolution_x=1024;S.render.resolution_y=512;S.render.resolution_percentage=100;S.cycles.samples=48;probes=[]
def pt(p):return Vector((p[1]*7.47/7.6,-(p[0]*35.23/36-17.615),p[2]-2.01))
for i,p in enumerate([[8.4,0,2.7],[10.5,0,2.7],[12.4,0,2.7]]):
 asset=['probe-aft.exr','probe.exr','probe-forward.exr'][i];camera.location=pt(p);S.render.filepath=str(cache/asset);bpy.ops.render.render(write_still=True);raw=bpy.data.images.load(str(cache/asset),check_existing=False);filtered=filtered_image(raw,'probe-'+str(i),cache,'RT');filtered.save_render(str(A/asset),scene=S);probes.append({'id':'machinery-'+str(i),'sourcePosition':p,'position':[p[1]*7.47/7.6,p[2]-2.01,p[0]*35.23/36-17.615],'asset':asset,'width':1024,'height':512,'samples':48,'purpose':'Local fixed work-light reflection; engine exterior and closed panels represented in this static capture'})
meta=json.loads((W/'snapshot/machinery.json').read_text());camera.data.type='PERSP';camera.data.sensor_fit='VERTICAL';camera.data.angle=math.radians(72);camera.location=pt(meta['room']['spawn']);camera.rotation_euler=(pt(meta['room']['look'])-camera.location).to_track_quat('-Z','Y').to_euler();S.render.resolution_x=1200;S.render.resolution_y=800;S['bake']='Indirect diffuse only. Live area/spot work lights supply direct illumination in WebGL. No sunlight.';S['bakeExclusions']='Door, floor register, engines, filter bodies/lids/baskets';S['authoringRevision']=11
for im in bpy.data.images:
 if im.source=='FILE'and im.has_data:im.pack()
native=W/'machinery-master.blend';bpy.ops.wm.save_as_mainfile(filepath=str(native),compress=True);binding.update({'masterSHA256':hashlib.sha256(native.read_bytes()).hexdigest(),'rawBakesSHA256':raws,'rawNativeBakesPacked':True,'samples':48,'denoise':'OIDN 2.5.1 CPU RTLightmap / RT HDR','probes':probes,'probePosition':probes[1]['position'],'directLightExcludedFromBakes':True,'reflectionLimitation':'Static local probes retain the closed exterior in reflections during inspection; geometry and live shadows use the selected pose.'});(A/'authoring.json').write_text(json.dumps(binding,indent=2)+'\n');print('MACHINERY LIGHTING COMPLETE',flush=True)
