"""Build the captured rooms in Blender, UV unwrap, bake fixed ambient, export GLBs.
blender -b -Y --python tools/bake-rooms.py -- --room saloon
"""
import argparse,sys,json,hashlib,array,math,time
from pathlib import Path
import bpy,numpy as np
from mathutils import Vector
ap=argparse.ArgumentParser();ap.add_argument('--room',choices=['saloon','machinery'],required=True);ap.add_argument('--samples',type=int,default=24);ap.add_argument('--skip-bake',action='store_true');opt=ap.parse_args(sys.argv[sys.argv.index('--')+1:])
root=Path(__file__).resolve().parents[1];work=root/'work';snap=work/'snapshot';out=root/'public/assets'/opt.room;out.mkdir(parents=True,exist_ok=True)
meta=json.loads((snap/(opt.room+'.json')).read_text());blob=(snap/meta['binary']).read_bytes();assert hashlib.sha256(blob).hexdigest()==meta['sha256']
raw=np.frombuffer(blob,dtype='<f4',count=meta['vertices']*11).reshape((-1,11));ix=np.frombuffer(blob,dtype='<u4',offset=meta['vertexBytes'],count=meta['triangles']*3).reshape((-1,3));pi=np.frombuffer(blob,dtype='<u4',offset=meta['vertexBytes']+meta['indexBytes'])
textures=json.loads((work/'textures/materials.json').read_text());bpy.ops.wm.read_factory_settings(use_empty=True);scene=bpy.context.scene;scene.name='Luz de Mar | '+meta['label'];scene.unit_settings.system='METRIC';scene['source_sha256']=meta['sha256'];scene['dimensions']='Existing digital reconstruction; not surveyed';scene['coordinate_system']='Physical metres; X port, Y up, Z forward (web), mapped to Blender X/Y/Z'
scene.render.engine='CYCLES';scene.cycles.device='CPU';scene.cycles.samples=opt.samples;scene.cycles.use_denoising=False;scene.cycles.max_bounces=5;scene.cycles.diffuse_bounces=3;scene.cycles.glossy_bounces=2
scene.render.threads_mode='FIXED';scene.render.threads=8
scene.world=bpy.data.worlds.new('Room ambient');scene.world.use_nodes=True;world=scene.world.node_tree.nodes['Background'];world.inputs[0].default_value=(.68,.78,1,1)if opt.room=='saloon'else(.85,.91,1,1);world.inputs[1].default_value=.22 if opt.room=='saloon'else .10
scene.view_settings.view_transform='AgX';scene.render.bake.margin=12;scene.render.bake.use_pass_direct=True;scene.render.bake.use_pass_indirect=True;scene.render.bake.use_pass_color=False
imagecache={};materials={};objects=[];dynamic=[];bakeimages={}
def image(name,kind):
 k=(name,kind)
 if k not in imagecache:
  im=bpy.data.images.load(str(work/'textures'/name),check_existing=True);im.colorspace_settings.name='sRGB'if kind=='color'else'Non-Color';imagecache[k]=im
 return imagecache[k]
def make_material(ri,atlas):
 key=(ri,atlas)
 if key in materials:return materials[key]
 r=meta['recipes'][ri];family=r['family'];family='carpet'if family=='fabric'and r['pattern']==6 else'acoustic'if family=='insulation'and r['pattern']in[24,34]else family
 mat=bpy.data.materials.new(f'{family}-{ri}-{atlas}');mat.use_nodes=True;mat.diffuse_color=(*r['color'],1);mat['family']=family;mat['lightmap']=atlas;mat['roughnessFactor']=r['rough'];mat['metallicFactor']=r['metal'];nodes=mat.node_tree.nodes;links=mat.node_tree.links;s=nodes.get('Principled BSDF');s.inputs['Base Color'].default_value=(*r['color'],1);s.inputs['Roughness'].default_value=r['rough'];s.inputs['Metallic'].default_value=r['metal']
 # Every mesh's Color channel preserves the exact per-component source palette.
 col=nodes.new('ShaderNodeVertexColor');col.layer_name='Color'
 if family!='glass':
  t=textures[family];uv=nodes.new('ShaderNodeUVMap');uv.uv_map='UV0';maps={}
  for kind in ['color','normal','roughness']:
   n=nodes.new('ShaderNodeTexImage');n.image=image(t[kind],kind);links.new(uv.outputs['UV'],n.inputs['Vector']);maps[kind]=n
  mix=nodes.new('ShaderNodeMixRGB');mix.blend_type='MULTIPLY';mix.inputs[0].default_value=1;links.new(col.outputs['Color'],mix.inputs[1]);links.new(maps['color'].outputs['Color'],mix.inputs[2]);links.new(mix.outputs[0],s.inputs['Base Color'])
  rough=nodes.new('ShaderNodeMath');rough.operation='MULTIPLY';rough.inputs[1].default_value=r['rough'];links.new(maps['roughness'].outputs['Color'],rough.inputs[0]);links.new(rough.outputs[0],s.inputs['Roughness'])
  norm=nodes.new('ShaderNodeNormalMap');norm.uv_map='UV0';norm.inputs['Strength'].default_value=.18 if family=='wood'else .12 if family=='paint'else .4;links.new(maps['normal'].outputs['Color'],norm.inputs['Color']);links.new(norm.outputs[0],s.inputs['Normal'])
  if family in ['fabric','carpet']:s.inputs['Sheen Weight'].default_value=.18;s.inputs['Sheen Roughness'].default_value=.7
 else:
  s.inputs['Alpha'].default_value=.16;s.inputs['Roughness'].default_value=.09;mat.surface_render_method='DITHERED';mat.use_backface_culling=False
 if r['emission']:
  s.inputs['Emission Color'].default_value=(*r['color'],1);s.inputs['Emission Strength'].default_value=r['emission']
 if atlas!='none':
  if atlas not in bakeimages:bakeimages[atlas]=bpy.data.images.new(opt.room+'-'+atlas,2048,2048,float_buffer=True)
  target=nodes.new('ShaderNodeTexImage');target.image=bakeimages[atlas];target.name='BAKE | linear ambient only';nodes.active=target
 materials[key]=mat;return mat
def build(name,face_ids,atlas,dyn=None):
 ids=ix[face_ids];unique,inv=np.unique(ids,return_inverse=True);verts=raw[unique,:3];verts=verts[:,[0,2,1]].copy();verts[:,1]*=-1;normals=raw[unique,3:6][:,[0,2,1]].copy();normals[:,1]*=-1
 mesh=bpy.data.meshes.new(name);mesh.from_pydata(verts.tolist(),[],inv.reshape((-1,3)).tolist());mesh.update();ob=bpy.data.objects.new(name,mesh);scene.collection.objects.link(ob);objects.append(ob);ob['lightmap']=atlas;ob['sourceIDs']=json.dumps(sorted(set(meta['parts'][int(pi[f])]['id']for f in face_ids)));ob['dynamic']=dyn or''
 color=mesh.color_attributes.new(name='Color',type='FLOAT_COLOR',domain='POINT');cs=np.c_[raw[unique,6:9],np.ones(len(unique))];color.data.foreach_set('color',cs.ravel())
 # Original split normals are retained; UV unwrapping never welds different finishes.
 for p in mesh.polygons:p.use_smooth=True
 mesh.normals_split_custom_set_from_vertices(normals.tolist());uv=mesh.uv_layers.new(name='UV0');uv1=mesh.uv_layers.new(name='UV1');slots={}
 for face,sourceface in zip(mesh.polygons,face_ids):
  part=meta['parts'][int(pi[sourceface])];ri=part['recipe'];recipe=meta['recipes'][ri];mat=make_material(ri,atlas)
  if ri not in slots:slots[ri]=len(mesh.materials);mesh.materials.append(mat)
  face.material_index=slots[ri];family=mat['family'];tile=textures.get(family,{}).get('tileMetres',1);n=np.abs(np.mean(normals[list(face.vertices)],axis=0));axis=int(np.argmax(n));axes=(0,1)if axis==2 else(0,2)if axis==1 else(1,2)
  for loop in face.loop_indices:
   p=verts[mesh.loops[loop].vertex_index];uv.data[loop].uv=(p[axes[0]]/tile,p[axes[1]]/tile)
 if atlas!='none':
  bpy.ops.object.select_all(action='DESELECT');ob.select_set(True);bpy.context.view_layer.objects.active=ob;mesh.uv_layers.active_index=1;bpy.ops.object.mode_set(mode='EDIT');bpy.ops.mesh.select_all(action='SELECT');bpy.ops.uv.smart_project(angle_limit=math.radians(66),island_margin=.007,area_weight=.2,correct_aspect=True,scale_to_bounds=True);bpy.ops.object.mode_set(mode='OBJECT')
 mesh.uv_layers.active_index=0;mesh.uv_layers['UV0'].active_render=True
 if dyn:dynamic.append(ob)
 return ob
for atlas in ['architecture','furniture','none']:
 faces=np.array([i for i,p in enumerate(pi)if meta['parts'][int(p)]['atlas']==atlas and not meta['parts'][int(p)]['dynamic']],dtype=int)
 if len(faces):build(meta['sourceID']+' | '+atlas,faces,atlas)
for dyn in ['register','door']:
 faces=np.array([i for i,p in enumerate(pi)if meta['parts'][int(p)]['dynamic']==dyn],dtype=int)
 if len(faces):build(meta['sourceID']+' | '+dyn,faces,'none',dyn)
def point(p):return Vector((p[0],-p[2],p[1]))
def area(name,position,target,energy,size,color):
 d=bpy.data.lights.new(name,'AREA');d.energy=energy;d.shape='DISK';d.size=size;d.color=color;ob=bpy.data.objects.new(name,d);scene.collection.objects.link(ob);ob.location=point(position);ob.rotation_euler=(point(target)-ob.location).to_track_quat('-Z','Y').to_euler();ob['purpose']='Ambient bake fill, runtime direct lights excluded';return ob
# Soft light transport is authored once. SUN and live work lamps are not in these bakes.
if opt.room=='saloon':
 area('Window ambient transport',(-3.05,3.05,-4.5),(0,2.8,-4.5),220,4.5,(.84,.91,1));area('Camera-side soft bounce',(0,3.3,-9.1),(0,2.7,-4.5),100,4,(1,.94,.85));area('Ceiling soft bounce',(0,3.72,-4.8),(0,2,-4.8),55,4,(1,.97,.92))
else:
 for z in [-10.1,-7.5,-5.4]:area('Work-light ambient transport '+str(z),(0,1.63,z),(0,.1,z),70,2.4,(.91,.96,1))
 for side in [-1,1]:area('Side bounce '+str(side),(side*2.9,.8,-7.5),(0,.4,-7.5),28,2.1,(.91,.95,1))
scene['ambientBake']='SUN/live lamps absent. Movable geometry excluded as occluders. Fixed artist fill approximates room bounce.'
for ob in dynamic:ob.hide_render=True
for ob in objects:
 if ob.get('lightmap')=='none':ob.hide_render=True
scene.render.image_settings.file_format='OPEN_EXR';scene.render.image_settings.color_depth='16';scene.render.image_settings.color_mode='RGB';scene.render.image_settings.exr_codec='PIZ'
if not opt.skip_bake:
 for atlas,im in bakeimages.items():
  ob=next(o for o in objects if o.get('lightmap')==atlas);bpy.ops.object.select_all(action='DESELECT');ob.select_set(True);bpy.context.view_layer.objects.active=ob;ob.data.uv_layers.active_index=1
  for mat in ob.data.materials:mat.node_tree.nodes.active=mat.node_tree.nodes['BAKE | linear ambient only']
  start=time.time();cached=out/('ambient-'+atlas+'.exr')
  if cached.exists()and cached.stat().st_size>100000:
   saved=bpy.data.images.load(str(cached),check_existing=True);assert tuple(saved.size)==(2048,2048);bakeimages[atlas]=saved;print('Reusing completed linear EXR',atlas,flush=True)
  else:
   bpy.ops.object.bake(type='DIFFUSE');im.save_render(str(cached),scene=scene)
  print(json.dumps({'baked':atlas,'seconds':time.time()-start}),flush=True);ob.data.uv_layers.active_index=0
for ob in objects:ob.hide_render=False
for ob in scene.objects:ob.select_set(ob.type=='MESH')
bpy.context.view_layer.objects.active=objects[0]
# Export extras preserve source identities and mark each atlas/movable assembly.
bpy.ops.export_scene.gltf(filepath=str(out/'room-source.glb'),export_format='GLB',use_selection=True,export_yup=True,export_extras=True,export_normals=True,export_texcoords=True,export_materials='EXPORT',export_vertex_color='ACTIVE',export_all_vertex_colors=False)
for im in bpy.data.images:
 if im.source=='FILE'and im.has_data:im.pack()
scene.camera=None;native=work/(opt.room+'-master.blend');bpy.ops.wm.save_as_mainfile(filepath=str(native))
report={'room':opt.room,'sourceGeometrySHA256':meta['sha256'],'sourceTriangles':meta['triangles'],'sourceVertices':meta['vertices'],'atlasSize':2048,'atlases':list(bakeimages),'dynamicObjects':[o.name for o in dynamic],'bakedOccludersExcludeDynamic':True,'blender':bpy.app.version_string,'samples':opt.samples,'masterSHA256':hashlib.sha256(native.read_bytes()).hexdigest()}
(out/'authoring.json').write_text(json.dumps(report,indent=2)+'\n');print(json.dumps(report),flush=True)
