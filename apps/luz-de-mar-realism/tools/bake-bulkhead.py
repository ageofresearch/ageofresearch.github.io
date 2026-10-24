"""Cycles transport for the fixed wall and unchanged engine UVs. Resumable files.

No original engine geometry/material file is exported or overwritten. The new
lighting assets are activated only together with the new bulkhead assembly.
"""
import bpy,numpy as np,json,math,hashlib,subprocess,sys,time,ast
from pathlib import Path
from mathutils import Vector
R=Path(__file__).resolve().parents[1];W=R/'work/bulkhead-vr-r01';A=R/'public/assets/machinery/bulkhead-vr-r01';S=bpy.context.scene;SX=35.23/36;SY=7.47/7.6
binding=json.loads((W/'authoring.json').read_text());evidence=json.loads((W/'evidence-frozen.json').read_text());cam=S.camera
for node in ast.parse((R/'tools/bake-left-engine.py').read_text()).body:
 if isinstance(node,ast.FunctionDef)and node.name in ['pt','filtered']:exec(compile(ast.Module(body=[node],type_ignores=[]),str(R/'tools/bake-left-engine.py'),'exec'),globals())
S.render.engine='CYCLES';S.cycles.device='CPU';S.cycles.max_bounces=6;S.cycles.diffuse_bounces=3;S.cycles.glossy_bounces=3;S.cycles.use_denoising=False;S.render.threads_mode='FIXED';S.render.threads=4;S.render.resolution_percentage=100;S.render.image_settings.file_format='OPEN_EXR';S.render.image_settings.color_mode='RGB';S.render.image_settings.color_depth='16';S.render.image_settings.exr_codec='DWAA'
S.view_settings.view_transform='Standard';S.view_settings.exposure=0
hero=S.objects['BVR installed | static'];objects={'bulkhead':hero,'port':S.objects['LVR installed | detail'],'starboard':S.objects['RVR installed | detail']}
for o in objects.values():o.hide_render=False
for o in S.objects:
 if o.name.endswith('walking')or o.name.startswith(('BVR |','LVR |','RVR |')):o.hide_render=True
raw_dir=W/'raw';raw_dir.mkdir(exist_ok=True);binding['lighting']={'diffuseSamples':64,'reflectionSamples':128,'irradianceSize':2048,'model':'Full diffuse direct+indirect without albedo; local static probe specular; no duplicate direct contribution','hdr':'Linear RGB half-float EXR DWAA','files':{},'engineUVBindings':{}}
def save_metadata(): (W/'lighting.json').write_text(json.dumps(binding['lighting'],indent=2)+'\n')

# Geometry export precedes any bake-image assignment. Both source UV layers are
# retained; the runtime preparer verifies actual TEXCOORD_1, not a metadata claim.
bpy.ops.object.select_all(action='DESELECT');hero.select_set(True);bpy.context.view_layer.objects.active=hero;hero.data.uv_layers.active_index=0;hero.data.uv_layers['UV0'].active_render=True
bpy.ops.export_scene.gltf(filepath=str(W/'bulkhead-source.glb'),export_format='GLB',use_selection=True,export_extras=True,export_normals=True,export_texcoords=True)
binding['sourceGeometrySHA256']=hashlib.sha256((W/'bulkhead-source.glb').read_bytes()).hexdigest()
fine=[]
for m in bpy.data.materials:
 if m.use_nodes:
  for n in m.node_tree.nodes:
   if n.type=='NORMAL_MAP':fine.append((n,n.inputs['Strength'].default_value));n.inputs['Strength'].default_value=0
for name,o in objects.items():
 d=o.data;assert d.uv_layers.get('UV1');d.calc_loop_triangles();uv=d.uv_layers['UV1'];corners=[]
 for t in d.loop_triangles:
  for vi,li in zip(t.vertices,t.loops):
   v=o.matrix_world@d.vertices[vi].co;u=uv.data[li].uv;corners.append([v.x,v.z,-v.y,u.x,1-u.y])
 binding['lighting']['engineUVBindings'][name]={'cornerSHA256':hashlib.sha256(np.array(corners,dtype='<f4').tobytes()).hexdigest(),'triangles':len(d.loop_triangles),'originalGeometryUnchanged':name!='bulkhead'}
 asset=name+'-irradiance.exr';rawfile=raw_dir/(name+'-irradiance.exr');done=W/(asset+'.done.json');signature={'masterGeometry':binding['sourceGeometrySHA256'],'corners':binding['lighting']['engineUVBindings'][name]['cornerSHA256'],'samples':64,'size':2048}
 if not done.exists()or json.loads(done.read_text())!=signature or not(A/asset).exists():
  im=bpy.data.images.new('RAW bulkhead transport '+name,2048,2048,float_buffer=True)
  for m in d.materials:
   n=m.node_tree.nodes.get('BAKE | bulkhead diffuse')or m.node_tree.nodes.get('BAKE | installed diffuse')
   if n is None:n=m.node_tree.nodes.new('ShaderNodeTexImage');n.name='BAKE | bulkhead diffuse'
   n.image=im;m.node_tree.nodes.active=n
  bpy.ops.object.select_all(action='DESELECT');o.select_set(True);bpy.context.view_layer.objects.active=o;d.uv_layers.active_index=d.uv_layers.find('UV1')
  S.cycles.samples=64;S.render.bake.margin=4;S.render.bake.use_pass_direct=True;S.render.bake.use_pass_indirect=True;S.render.bake.use_pass_color=False
  started=time.time();bpy.ops.object.bake(type='DIFFUSE',uv_layer='UV1');d.uv_layers.active_index=d.uv_layers.find('UV0');im.save_render(str(rawfile),scene=S)
  output=filtered(im,'bulkhead-transport-'+name);output.save_render(str(A/asset),scene=S);done.write_text(json.dumps(signature,indent=2)+'\n');print('TRANSPORT DONE',name,time.time()-started,flush=True)
 binding['lighting']['files'][asset]={'rawSHA256':hashlib.sha256(rawfile.read_bytes()).hexdigest(),'sha256':hashlib.sha256((A/asset).read_bytes()).hexdigest(),'bytes':(A/asset).stat().st_size};save_metadata()
for n,strength in fine:n.inputs['Strength'].default_value=strength

# Camera-only emitters reproduce luminaire lines in the reflection capture
# without contributing an additional diffuse light source.
emitters=[]
for light in [o for o in S.objects if o.type=='LIGHT'and o.data.type=='AREA']:
 data=light.data;x=data.size/2;y=(data.size_y if data.shape in ['RECTANGLE','ELLIPSE']else data.size)/2
 mesh=bpy.data.meshes.new('Bulkhead probe emitter');mesh.from_pydata([(-x,-y,-.003),(x,-y,-.003),(x,y,-.003),(-x,y,-.003)],[],[(0,3,2,1)]);mesh.update();o=bpy.data.objects.new('PROBE ONLY | bulkhead '+light.name,mesh);S.collection.objects.link(o);o.matrix_world=light.matrix_world.copy()
 m=bpy.data.materials.new('Bulkhead probe emitter radiance');m.use_nodes=True;n=m.node_tree.nodes;n.clear();em=n.new('ShaderNodeEmission');em.inputs['Color'].default_value=(*data.color,1);em.inputs['Strength'].default_value=data.energy/(4*x*y*math.pi);end=n.new('ShaderNodeOutputMaterial');m.node_tree.links.new(em.outputs[0],end.inputs[0]);mesh.materials.append(m)
 o.visible_camera=True;o.visible_diffuse=False;o.visible_glossy=False;o.visible_shadow=False;o.visible_transmission=False;emitters.append(o)
room=json.loads((R/'public/assets/machinery/room.json').read_text());manifest=json.loads((R/'public/assets/manifest.json').read_text());probes={}
for name,specs in [('room',room['probes'])]:
 probes[name]=[]
 for i,spec in enumerate(specs):
  asset=f'{name}-probe-{i}.exr';rawfile=raw_dir/asset;signature={'geometry':binding['sourceGeometrySHA256'],'samples':128,'sourcePosition':spec['sourcePosition'],'size':[1024,512]};done=W/(asset+'.done.json')
  if not done.exists()or json.loads(done.read_text())!=signature or not(A/asset).exists():
   cam.data.type='PANO';cam.data.panorama_type='EQUIRECTANGULAR';cam.rotation_euler=(math.pi/2,0,0);cam.location=pt(spec['sourcePosition']);S.render.resolution_x=1024;S.render.resolution_y=512;S.cycles.samples=128;S.render.filepath=str(rawfile);bpy.ops.render.render(write_still=True)
   raw=bpy.data.images.load(str(rawfile),check_existing=False);output=filtered(raw,'bulkhead-'+name+'-probe-'+str(i),'RT');output.save_render(str(A/asset),scene=S);done.write_text(json.dumps(signature,indent=2)+'\n');print('PROBE DONE',name,i,flush=True)
  probes[name].append({**spec,'asset':asset,'width':1024,'height':512,'samples':128,'state':'New bulkhead with installed static engine exteriors'})
  binding['lighting']['files'][asset]={'sha256':hashlib.sha256((A/asset).read_bytes()).hexdigest(),'bytes':(A/asset).stat().st_size};save_metadata()
binding['lighting']['probes']=probes;save_metadata()
for o in emitters:o.hide_render=True
for m in bpy.data.materials:
 if m.use_nodes:
  for n in m.node_tree.nodes:
   if n.type=='TEX_IMAGE'and n.name.startswith('BAKE |'):n.image=None
for im in list(bpy.data.images):
 if im.users==0:bpy.data.images.remove(im)
for im in bpy.data.images:
 if im.source=='FILE'and im.has_data:im.pack()
S.view_settings.exposure=math.log2(.05);S['bake']='New static bulkhead full diffuse plus updated compatible engine transport and reflection probes; no photographic textures'
bpy.ops.wm.save_as_mainfile(filepath=str(W/'bulkhead-master.blend'),compress=True);binding['masterSHA256']=hashlib.sha256((W/'bulkhead-master.blend').read_bytes()).hexdigest();(W/'authoring.json').write_text(json.dumps(binding,indent=2)+'\n');print('BULKHEAD LIGHTING COMPLETE',flush=True)
