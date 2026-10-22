"""Normalize the exported UV roles without changing baked atlas coordinates.
Some Blender primitives bring a default UVMap into the joined mesh. Remove that
inherited layer; retain the exact baked coordinates, restore physical UV0, and
bind material textures to UV0 and irradiance to UV1 explicitly.
"""
import bpy,json,hashlib,shutil
from pathlib import Path
R=Path(__file__).resolve().parents[1];O=R/'public/assets/saloon';scene=bpy.context.scene;T=json.loads((R/'work/textures/materials.json').read_text());p=O/'authoring.json';report=json.loads(p.read_text());oldBinding=report['bakeGeometrySHA256'];objects=[]
for ob in scene.objects:
 if not ob.name.startswith('MD_R02 |')or ob.type!='MESH':continue
 d=ob.data;old=d.uv_layers.get('UV0');assert old and len(d.uv_layers)>=3,(ob.name,list(d.uv_layers));atlas=[tuple(v.uv)for v in old.data]
 while len(d.uv_layers):d.uv_layers.remove(d.uv_layers[0])
 uv0=d.uv_layers.new(name='UV0');uv1=d.uv_layers.new(name='UV1')
 for i,xy in enumerate(atlas):uv1.data[i].uv=xy
 for face in d.polygons:
  m=d.materials[face.material_index];family=m.get('family','paint');tile=T.get(family,{}).get('tileMetres',1);axis=max(range(3),key=lambda i:abs(face.normal[i]));axes=(0,1)if axis==2 else(0,2)if axis==1 else(1,2)
  for li in face.loop_indices:v=d.vertices[d.loops[li].vertex_index].co;uv0.data[li].uv=(v[axes[0]]/tile,v[axes[1]]/tile)
 assert all(tuple(v.uv)==atlas[i]for i,v in enumerate(uv1.data));d.uv_layers.active_index=0;uv0.active_render=True;uv1.active_render=False;objects.append(ob)
 for m in d.materials:
  for node in m.node_tree.nodes:
   if node.type in ['UVMAP','NORMAL_MAP']:node.uv_map='UV0'
bpy.ops.object.select_all(action='DESELECT')
for ob in objects:ob.select_set(True)
bpy.context.view_layer.objects.active=objects[0];file=O/'room-source.glb';bpy.ops.export_scene.gltf(filepath=str(file),export_format='GLB',use_selection=True,export_extras=True,export_normals=True,export_texcoords=True,export_materials='EXPORT')
newBinding=hashlib.sha256(file.read_bytes()).hexdigest();dest=R/'work/raw-atlases'/newBinding;dest.mkdir(exist_ok=True)
for atlas in ['architecture','furniture']:
 name='saloon-ambient-'+atlas+'.exr';shutil.copyfile(R/'work/raw-atlases'/oldBinding/name,dest/name)
report['bakeGeometrySHA256']=newBinding;report['uvRoles']={'material':0,'ambient':1};report['uvAtlasCoordinatesUnchanged']=True;p.write_text(json.dumps(report,indent=2)+'\n');bpy.ops.wm.save_as_mainfile(filepath=str(R/'work/saloon-master.blend'),compress=True);report['masterSHA256']=hashlib.sha256((R/'work/saloon-master.blend').read_bytes()).hexdigest();p.write_text(json.dumps(report,indent=2)+'\n');print('Verified and normalized UV roles',flush=True)
