"""Cycles transport for the electrical front, compatible bulkhead and unchanged engine UVs. Resumable files.

No original engine geometry/material file is exported or overwritten. The new
lighting assets are activated only together with the new bulkhead assembly.
"""
import bpy,numpy as np,json,math,hashlib,subprocess,sys,time,ast
import os
from pathlib import Path
from mathutils import Vector
R=Path(__file__).resolve().parents[1];W=Path(os.environ.get('ELECTRICAL_AUTHORING_WORK',str(R/'work/electrical-vr-r01')));A=R/'public/assets/machinery/electrical-vr-r01';S=bpy.context.scene;SX=35.23/36;SY=7.47/7.6
binding=json.loads((W/'authoring.json').read_text());evidence=json.loads((W/'evidence-frozen.json').read_text());cam=S.camera
for node in ast.parse((R/'tools/bake-left-engine.py').read_text()).body:
 if isinstance(node,ast.FunctionDef)and node.name in ['pt','filtered']:exec(compile(ast.Module(body=[node],type_ignores=[]),str(R/'tools/bake-left-engine.py'),'exec'),globals())
S.render.engine='CYCLES';S.cycles.device='CPU';S.cycles.max_bounces=6;S.cycles.diffuse_bounces=3;S.cycles.glossy_bounces=3;S.cycles.use_denoising=False;S.render.threads_mode='FIXED';S.render.threads=4;S.render.resolution_percentage=100;S.render.image_settings.file_format='OPEN_EXR';S.render.image_settings.color_mode='RGB';S.render.image_settings.color_depth='16';S.render.image_settings.exr_codec='DWAA'
S.view_settings.view_transform='Standard';S.view_settings.exposure=0
hero=S.objects['EVR installed | static'];objects={'electrical':hero,'bulkhead':S.objects['BVR installed | static'],'port':S.objects['LVR installed | detail'],'starboard':S.objects['RVR installed | detail']}
hero.data.calc_loop_triangles()
for t in hero.data.loop_triangles:
 if hero.data.attributes['_BAKE_MODE'].data[t.vertices[0]].value>.5:
  assert all(abs(c)<1e-9 for li in t.loops for c in hero.data.uv_layers['UV1'].data[li].uv),'Unused micro UV1 must be zero before the image bake'
for o in objects.values():o.hide_render=False
def engine_occluders(visible):
 # Removable installed engines must not leave permanent imprints on the new
 # floor/grating. Runtime reversible receivers supply their contact shadows.
 for key in ['port','starboard']:objects[key].hide_render=not visible
dynamic_doors=[o for o in S.objects if o.get('appearanceDoor')and o.data.attributes.get('_BAKE_MODE')]
for o in dynamic_doors:o.hide_render=True
for o in S.objects:
 if o.name.endswith('walking')or o.name.startswith(('EVR |','BVR |','LVR |','RVR |')):o.hide_render=True
raw_dir=W/'raw';raw_dir.mkdir(exist_ok=True);atlas_only=os.environ.get('ELECTRICAL_REBAKE_ATLAS_ONLY')=='1'
if atlas_only:
 proof=json.loads((W/'lighting-only-proof.json').read_text());assert proof['passed']and proof['neutralGeometrySHA256']==binding['neutralGeometrySHA256'],'UV-only physical-scene proof required'
 binding['lighting']=json.loads((W/'iterations/before-louvre-atlas/lighting.json').read_text());cached_bindings=json.loads(json.dumps(binding['lighting']['engineUVBindings']))
 for name,item in binding['lighting']['files'].items():assert hashlib.sha256((A/name).read_bytes()).hexdigest()==item['sha256'],('Cached HDR changed',name)
 binding['lighting']['spatialLouvreAtlasRepair']={'reason':'Corner-only transport produced diagonal interpolation across the broad louvre fronts. Their front faces now receive per-texel HDR irradiance.','physicalSceneProof':proof,'reusedUnchangedAssets':['bulkhead-irradiance.exr','port-irradiance.exr','starboard-irradiance.exr','room-probe-0.exr','room-probe-1.exr','room-probe-2.exr'],'completed':False}
else:binding['lighting']={'diffuseSamples':64,'reflectionSamples':128,'irradianceSize':2048,'model':'Full diffuse direct+indirect without albedo; local static probe specular; no duplicate direct contribution','hdr':'Linear RGB half-float EXR DWAA','files':{},'engineUVBindings':{}}
def save_metadata(): (W/'lighting.json').write_text(json.dumps(binding['lighting'],indent=2)+'\n')

# Small pieces receive the same Cycles transport, sampled at actual corners.
# This avoids allocating thousands of mostly-empty islands for screw heads,
# lettering and small controls. Broad surfaces retain the 2048² HDR atlas.
engine_occluders(False)
S.cycles.samples=64;S.render.bake.use_pass_direct=True;S.render.bake.use_pass_indirect=True;S.render.bake.use_pass_color=False
d=hero.data;color=d.color_attributes.get('EVR baked irradiance')or d.color_attributes.new(name='EVR baked irradiance',type='FLOAT_COLOR',domain='CORNER');d.color_attributes.active_color=color
bpy.ops.object.select_all(action='DESELECT');hero.select_set(True);bpy.context.view_layer.objects.active=hero
bpy.ops.object.bake(type='DIFFUSE',target='VERTEX_COLORS');values=np.array([c.color[:3]for c in color.data],dtype=np.float32)
assert np.isfinite(values).all() and values.max()>0,'Invalid corner irradiance'
continuity=None
if binding.get('version',1)>=5:
 import runpy
 np.savez_compressed(raw_dir/'electrical-corner-irradiance-unsmoothed.npz',irradiance=values)
 values,continuity=runpy.run_path(str(R/'tools/generator-irradiance.py'))['continuous_generator_irradiance'](d,values)
 color.data.foreach_set('color',np.column_stack((values,np.ones(len(values),dtype=np.float32))).ravel())
attr=d.attributes.get('_IRRADIANCE')or d.attributes.new(name='_IRRADIANCE',type='FLOAT_VECTOR',domain='CORNER');attr.data.foreach_set('vector',values.ravel())
binding['lighting']['cornerIrradiance']={'samples':64,'corners':len(values),'maximum':float(values.max()),'minimum':float(values.min()),'sha256':hashlib.sha256(values.astype('<f4').tobytes()).hexdigest(),'mode':'Full diffuse direct + indirect without albedo, actual corner positions/normals; only _BAKE_MODE=1 consumes these values.'}
if continuity:binding['lighting']['cornerIrradiance']['continuity']=continuity;binding['generatorCornerContinuity']=continuity
np.savez_compressed(raw_dir/'electrical-corner-irradiance.npz',irradiance=values)
S.render.bake.target='IMAGE_TEXTURES'
bpy.ops.object.select_all(action='DESELECT');hero.select_set(True);bpy.context.view_layer.objects.active=hero;hero.data.uv_layers.active_index=0;hero.data.uv_layers['UV0'].active_render=True
for o in dynamic_doors:o.select_set(True)
bpy.ops.export_scene.gltf(filepath=str(W/'electrical-source.glb'),export_format='GLB',use_selection=True,export_extras=True,export_normals=True,export_texcoords=True,export_attributes=True,export_vertex_color='NONE')
binding['sourceGeometrySHA256']=hashlib.sha256((W/'electrical-source.glb').read_bytes()).hexdigest()
fine=[]
for m in bpy.data.materials:
 if m.use_nodes:
  for n in m.node_tree.nodes:
   if n.type=='NORMAL_MAP':fine.append((n,n.inputs['Strength'].default_value));n.inputs['Strength'].default_value=0
for name,o in objects.items():
 engine_occluders(name!='electrical')
 d=o.data;assert d.uv_layers.get('UV1');d.calc_loop_triangles();uv=d.uv_layers['UV1'];corners=[]
 for t in d.loop_triangles:
  for vi,li in zip(t.vertices,t.loops):
   v=o.matrix_world@d.vertices[vi].co;u=uv.data[li].uv;corners.append([v.x,v.z,-v.y,u.x,1-u.y])
 binding['lighting']['engineUVBindings'][name]={'cornerSHA256':hashlib.sha256(np.array(corners,dtype='<f4').tobytes()).hexdigest(),'triangles':len(d.loop_triangles),'originalGeometryUnchanged':name in ['port','starboard']}
 if atlas_only and name!='electrical':
  assert cached_bindings[name]['cornerSHA256']==binding['lighting']['engineUVBindings'][name]['cornerSHA256'],('Unchanged HDR UV binding failed',name)
  continue
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
engine_occluders(True)
binding['lighting']['removableShadowPolicy']='Installed engines excluded from electrical floor/grating/cabinet diffuse transport; reversible runtime contact receivers remain. Engines included in static reflection capture.'

# Camera-only emitters reproduce luminaire lines in the reflection capture
# without contributing an additional diffuse light source.
emitters=[]
for light in ([]if atlas_only else[o for o in S.objects if o.type=='LIGHT'and o.data.type=='AREA']):
 data=light.data;x=data.size/2;y=(data.size_y if data.shape in ['RECTANGLE','ELLIPSE']else data.size)/2
 mesh=bpy.data.meshes.new('Bulkhead probe emitter');mesh.from_pydata([(-x,-y,-.003),(x,-y,-.003),(x,y,-.003),(-x,y,-.003)],[],[(0,3,2,1)]);mesh.update();o=bpy.data.objects.new('PROBE ONLY | bulkhead '+light.name,mesh);S.collection.objects.link(o);o.matrix_world=light.matrix_world.copy()
 m=bpy.data.materials.new('Bulkhead probe emitter radiance');m.use_nodes=True;n=m.node_tree.nodes;n.clear();em=n.new('ShaderNodeEmission');em.inputs['Color'].default_value=(*data.color,1);em.inputs['Strength'].default_value=data.energy/(4*x*y*math.pi);end=n.new('ShaderNodeOutputMaterial');m.node_tree.links.new(em.outputs[0],end.inputs[0]);mesh.materials.append(m)
 o.visible_camera=True;o.visible_diffuse=False;o.visible_glossy=False;o.visible_shadow=False;o.visible_transmission=False;emitters.append(o)
room=json.loads((R/'public/assets/machinery/room.json').read_text());manifest=json.loads((R/'public/assets/manifest.json').read_text());probes=binding['lighting'].get('probes',{})if atlas_only else{}
for o in dynamic_doors:o.hide_render=False
for name,specs in ([]if atlas_only else[('room',room['probes'])]):
 probes[name]=[]
 for i,spec in enumerate(specs):
  asset=f'{name}-probe-{i}.exr';rawfile=raw_dir/asset;signature={'geometry':binding['sourceGeometrySHA256'],'samples':128,'sourcePosition':spec['sourcePosition'],'size':[1024,512]};done=W/(asset+'.done.json')
  if not done.exists()or json.loads(done.read_text())!=signature or not(A/asset).exists():
   cam.data.type='PANO';cam.data.panorama_type='EQUIRECTANGULAR';cam.rotation_euler=(math.pi/2,0,0);cam.location=pt(spec['sourcePosition']);S.render.resolution_x=1024;S.render.resolution_y=512;S.cycles.samples=128;S.render.filepath=str(rawfile);bpy.ops.render.render(write_still=True)
   raw=bpy.data.images.load(str(rawfile),check_existing=False);output=filtered(raw,'bulkhead-'+name+'-probe-'+str(i),'RT');output.save_render(str(A/asset),scene=S);done.write_text(json.dumps(signature,indent=2)+'\n');print('PROBE DONE',name,i,flush=True)
  probes[name].append({**spec,'asset':asset,'width':1024,'height':512,'samples':128,'state':'New bulkhead with installed static engine exteriors'})
  binding['lighting']['files'][asset]={'sha256':hashlib.sha256((A/asset).read_bytes()).hexdigest(),'bytes':(A/asset).stat().st_size};save_metadata()
binding['lighting']['probes']=probes;save_metadata()
if atlas_only:binding['lighting']['spatialLouvreAtlasRepair']['completed']=True;save_metadata()
for o in emitters:o.hide_render=True
for m in bpy.data.materials:
 if m.use_nodes:
  for n in m.node_tree.nodes:
   if n.type=='TEX_IMAGE'and n.name.startswith('BAKE |'):n.image=None
for im in list(bpy.data.images):
 if im.users==0:bpy.data.images.remove(im)
for im in bpy.data.images:
 if im.source=='FILE'and im.has_data and not im.packed_file:im.pack()
S.view_settings.exposure=math.log2(.05);S['bake']='New static bulkhead full diffuse plus updated compatible engine transport and reflection probes; no photographic textures'
bpy.ops.wm.save_as_mainfile(filepath=str(W/'electrical-master.blend'),compress=True);binding['masterSHA256']=hashlib.sha256((W/'electrical-master.blend').read_bytes()).hexdigest();(W/'authoring.json').write_text(json.dumps(binding,indent=2)+'\n');print('ELECTRICAL LIGHTING COMPLETE',flush=True)
