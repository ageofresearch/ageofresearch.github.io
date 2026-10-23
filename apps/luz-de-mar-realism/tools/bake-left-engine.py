"""Cycles reference renders, full diffuse atlas, local reflections and receiver mask."""
import bpy, numpy as np, json, math, hashlib, subprocess, sys, time
from pathlib import Path
from mathutils import Vector
R=Path(__file__).resolve().parents[1];W=R/'work/left-engine-r12';A=R/'public/assets/mechanics/left-vr-r01';S=bpy.context.scene
binding=json.loads((W/'authoring.json').read_text());evidence=json.loads((A/'evidence.json').read_text());SX=35.23/36;SY=7.47/7.6
phase=sys.argv[sys.argv.index('--')+1]if'--'in sys.argv else'bake'
S.render.engine='CYCLES';S.cycles.device='CPU';S.cycles.max_bounces=6;S.cycles.diffuse_bounces=3;S.cycles.glossy_bounces=3;S.render.threads_mode='FIXED';S.render.threads=4;S.render.resolution_percentage=100;S.render.image_settings.file_format='OPEN_EXR';S.render.image_settings.color_mode='RGBA';S.render.image_settings.color_depth='16';S.render.image_settings.exr_codec='PIZ'
hero=S.objects['LVR installed | detail'];cam=S.camera;S.render.film_transparent=False
def pt(p):return Vector((p[1]*SY,-(p[0]*SX-17.615),p[2]-2.01))
def neutral_png(raw,output,exposure=.05):
 im=bpy.data.images.load(str(raw),check_existing=False);w,h=im.size;rgba=np.array(im.pixels[:],dtype=np.float32).reshape(h,w,4);c=np.maximum(rgba[:,:,:3]*exposure,0);x=c.min(2);offset=np.where(x<.08,x-6.25*x*x,.04);c-=offset[:,:,None];peak=c.max(2);compress=peak>=.76;new=1-.24*.24/np.maximum(peak+.24-.76,.000001);scale=np.where(compress,new/np.maximum(peak,.000001),1);c*=scale[:,:,None];g=np.where(compress,1-1/(.15*(peak-new)+1),0);c=c*(1-g[:,:,None])+new[:,:,None]*g[:,:,None];rgba[:,:,:3]=np.clip(c,0,1);rgba[:,:,3]=1
 out=bpy.data.images.new('Neutral preview',w,h,float_buffer=True);out.pixels.foreach_set(rgba.ravel());old=(S.view_settings.view_transform,S.view_settings.exposure,S.render.image_settings.file_format);S.view_settings.view_transform='Standard';S.view_settings.exposure=0;S.render.image_settings.file_format='PNG';out.save_render(str(output),scene=S);S.view_settings.view_transform,S.view_settings.exposure,S.render.image_settings.file_format=old;bpy.data.images.remove(out);bpy.data.images.remove(im)
def camera(pose):
 p=evidence['camera']['sourcePosition'];h=math.radians(pose['h']);v=math.radians(pose['v']);d=[math.cos(v)*math.cos(h),-math.cos(v)*math.sin(h),-math.sin(v)];target=[p[0]+d[0]/SX,p[1]+d[1]/SY,p[2]+d[2]];cam.data.type='PERSP';cam.data.sensor_fit='VERTICAL';cam.data.angle=math.radians(pose['vfov']);cam.data.clip_start=.035;cam.data.clip_end=40;cam.location=pt(p);cam.rotation_euler=(pt(target)-cam.location).to_track_quat('-Z','Y').to_euler()
def filtered(im,name,mode='RTLightmap'):
 w,h=im.size;rgba=np.array(im.pixels[:],dtype=np.float32).reshape(h,w,4);f=W/(name+'.pfm');out=W/(name+'-filtered.pfm')
 with open(f,'wb')as s:s.write(f'PF\n{w} {h}\n-1.0\n'.encode());s.write(rgba[:,:,:3].astype('<f4').tobytes())
 subprocess.run(['/tmp/luz-oidn/bin/oidnDenoise','-d','cpu','-f',mode,'--hdr',str(f),'-o',str(out),'--threads','4','--maxmem','512'],check=True)
 with open(out,'rb')as s:
  assert s.readline().strip()==b'PF';assert s.readline().strip()==f'{w} {h}'.encode();assert float(s.readline())<0;rgb=np.frombuffer(s.read(),dtype='<f4').reshape(h,w,3)
 rgba[:,:,:3]=np.maximum(rgb,0);result=bpy.data.images.new('FILTERED | '+name,w,h,float_buffer=True);result.pixels.foreach_set(rgba.ravel());result.update();result.pack();return result
if phase in ['clay','beauty']:
 folder=W/'review'/phase;folder.mkdir(exist_ok=True);S.render.resolution_x=750;S.render.resolution_y=500;S.cycles.samples=24 if phase=='clay' else 96;S.cycles.use_denoising=False
 if phase=='clay':
  m=bpy.data.materials.new('Neutral geometry audit');m.use_nodes=True;p=m.node_tree.nodes['Principled BSDF'];p.inputs['Base Color'].default_value=(.62,.62,.62,1);p.inputs['Roughness'].default_value=.65;S.view_layers[0].material_override=m
 for pose in evidence['poses']:
  if len(sys.argv)>sys.argv.index('--')+2 and pose['id']not in sys.argv[sys.argv.index('--')+2:]:continue
  camera(pose);raw=folder/(pose['id']+'.exr');S.render.filepath=str(raw);bpy.ops.render.render(write_still=True);image=bpy.data.images.load(str(raw),check_existing=False);denoised=filtered(image,phase+'-'+pose['id'],'RT');clean=folder/(pose['id']+'-denoised.exr');denoised.save_render(str(clean),scene=S);neutral_png(clean,folder/(pose['id']+'.png'));print('REFERENCE RENDER',phase,pose['id'],flush=True)
else:
 # A positive enclosed volume alone does not validate custom shading normals.
 # Reject copied rocker/head surfaces whose normals point below the geometric
 # tangent plane: their diffuse bake produces black triangle-edge streaks.
 normal_objects=[o for o in S.objects if o.name.startswith('LVR | compatible')and('rocker cover'in o.name or'cylinder head'in o.name)]
 minimum=min(f.normal.dot(o.data.corner_normals[li].vector)for o in normal_objects for f in o.data.polygons if f.area>1e-10 for li in f.loop_indices)
 assert minimum>0,('Invalid native-derived shading normal',minimum)
 binding['nativeShadingNormalsValidation']={'objects':len(normal_objects),'minimumFaceNormalDot':minimum,'method':'Split normals derived from evaluated geometry, sharp edges at 38 degrees; all nondegenerate head/cover corner normals remain above their geometric tangent plane.'}
 assert binding['uv']['degenerateTriangleFraction']<.0001,'Repair disconnected/collapsed UV charts before baking'
 binding['nativeTopologyValidation']={'duplicateVerticesReconnected':sum(o.get('weldedDuplicateVertices',0)for o in S.objects),'weldToleranceMetres':1e-6,'lightmapDegenerateTriangleFraction':binding['uv']['degenerateTriangleFraction'],'scope':'New left derivative only; coincident native vertices reconnected before UV unwrapping. Original R03 and right instance unchanged.'}
 S.cycles.samples=64;S.cycles.use_denoising=False;S.render.bake.use_pass_direct=True;S.render.bake.use_pass_indirect=True;S.render.bake.use_pass_color=False;S.render.bake.margin=2
 im=bpy.data.images.new('Left engine | full diffuse raw',2048,2048,float_buffer=True)
 for m in hero.data.materials:n=m.node_tree.nodes['BAKE | installed diffuse'];n.image=im;m.node_tree.nodes.active=n
 bpy.ops.object.select_all(action='DESELECT');hero.select_set(True);bpy.context.view_layer.objects.active=hero;hero.data.uv_layers.active_index=1
 started=time.time();bpy.ops.object.bake(type='DIFFUSE',uv_layer='UV1');hero.data.uv_layers.active_index=0;im.save_render(str(W/'irradiance-raw.exr'),scene=S);out=filtered(im,'left-irradiance');out.save_render(str(A/'irradiance.exr'),scene=S);print('FULL DIFFUSE BAKED',time.time()-started,flush=True)
 # Preserve the original environment for the right engine and other equipment.
 # These sharper probes belong only to the new left exterior material.
 cam.data.type='PANO';cam.data.panorama_type='EQUIRECTANGULAR';cam.rotation_euler=(math.pi/2,0,0);S.render.resolution_x=2048;S.render.resolution_y=1024;S.cycles.samples=32;S.cycles.use_denoising=False;probes=[]
 for i,p in enumerate([[10.1,.40,2.80],[11.8,.42,2.80]]):
  cam.location=pt(p);file=W/f'probe-{i}-raw.exr';S.render.filepath=str(file);bpy.ops.render.render(write_still=True);raw=bpy.data.images.load(str(file),check_existing=False);out=filtered(raw,f'left-probe-{i}','RT');asset=f'probe-{i}.exr';out.save_render(str(A/asset),scene=S);wp=pt(p);probes.append({'asset':asset,'position':[wp.x,wp.z,-wp.y],'sourcePosition':p,'width':2048,'height':1024,'state':'installed static exterior'});print('LOCAL PROBE',i,flush=True)
 # Receiver-only bake at the real floor level. Ratio on/off supplies reversible
 # diffuse occlusion without adding a permanent engine silhouette to room atlases.
 bounds=[8.7,.12,12.7,2.05];x0,y0,x1,y1=bounds;verts=[pt([x,y,1.584])for x,y in[(x0,y0),(x1,y0),(x1,y1),(x0,y1)]];d=bpy.data.meshes.new('Temporary receiver');d.from_pydata(verts,[],[(0,1,2,3)]);d.update();o=bpy.data.objects.new('Temporary receiver',d);S.collection.objects.link(o)
 # The source axes map with a positive normal after the room rotation.
 if d.polygons[0].normal.z<0:d.flip_normals()
 uv=d.uv_layers.new(name='UV0')
 for li,coord in zip(d.polygons[0].loop_indices,[(0,0),(1,0),(1,1),(0,1)]):uv.data[li].uv=coord
 m=bpy.data.materials.new('Receiver irradiance');m.use_nodes=True;p=m.node_tree.nodes['Principled BSDF'];p.inputs['Base Color'].default_value=(1,1,1,1);p.inputs['Roughness'].default_value=1;d.materials.append(m);target=m.node_tree.nodes.new('ShaderNodeTexImage');m.node_tree.nodes.active=target;S.cycles.samples=32;S.cycles.use_denoising=False;values=[]
 for state in[True,False]:
  hero.hide_render=not state;image=bpy.data.images.new('Receiver '+str(state),1024,512,float_buffer=True);target.image=image;bpy.ops.object.select_all(action='DESELECT');o.select_set(True);bpy.context.view_layer.objects.active=o;bpy.ops.object.bake(type='DIFFUSE',uv_layer='UV0');f=filtered(image,'receiver-'+str(state));values.append(np.array(f.pixels[:],dtype=np.float32).reshape(512,1024,4)[:,:,:3]);print('RECEIVER STATE',state,flush=True)
 ratio=np.clip(values[0].mean(2)/np.maximum(values[1].mean(2),.02),.18,1);np.save(W/'receiver-ratio.npy',ratio.astype(np.float32))
 hero.hide_render=False;bpy.data.objects.remove(o,do_unlink=True)
 # Export display meshes before packing the irradiance image into the source.
 bpy.ops.object.select_all(action='DESELECT');hero.select_set(True);bpy.context.view_layer.objects.active=hero;opts=dict(export_format='GLB',use_selection=True,export_extras=True,export_normals=True,export_texcoords=True)
 bpy.ops.export_scene.gltf(filepath=str(W/'detail-source.glb'),**opts)
 walk=hero.copy();walk.data=hero.data.copy();S.collection.objects.link(walk);walk.name='LVR installed | walking';bpy.ops.object.select_all(action='DESELECT');walk.select_set(True);bpy.context.view_layer.objects.active=walk;dec=walk.modifiers.new('Walking derivative, preserve silhouette','DECIMATE');dec.ratio=.72;dec.use_collapse_triangulate=True;bpy.ops.object.modifier_apply(modifier=dec.name);walk.data.calc_loop_triangles();walktris=len(walk.data.loop_triangles);assert walktris<=220000;walk['lod']='walk';bpy.ops.export_scene.gltf(filepath=str(W/'walk-source.glb'),**opts);walk.hide_render=True;walk.hide_viewport=True
 binding.update({'walkTriangles':walktris,'probes':probes,'irradiance':{'asset':'irradiance.exr','size':2048,'mode':'full diffuse without albedo; direct + indirect; runtime direct lighting excluded'},'receiver':{'asset':'receiver.ktx2','boundsSource':bounds,'zSource':1.58,'mode':'linear attenuation of diffuse on existing near-floor receiver surfaces only'},'samples':{'diffuse':64,'reflections':32,'receiver':32},'rawIrradianceSHA256':hashlib.sha256((W/'irradiance-raw.exr').read_bytes()).hexdigest(),'geometrySHA256':{k:hashlib.sha256((W/(k+'-source.glb')).read_bytes()).hexdigest()for k in ['detail','walk']}})
 for im in bpy.data.images:
  if im.source=='FILE'and im.has_data:im.pack()
 S.view_settings.exposure=math.log2(.05);camera(evidence['poses'][1]);S.render.resolution_x=1200;S.render.resolution_y=800;bpy.ops.wm.save_as_mainfile(filepath=str(W/'left-engine-master.blend'),compress=True);binding['masterSHA256']=hashlib.sha256((W/'left-engine-master.blend').read_bytes()).hexdigest();(W/'authoring.json').write_text(json.dumps(binding,ensure_ascii=False,indent=2)+'\n');print('LEFT ENGINE LIGHTING COMPLETE',flush=True)
