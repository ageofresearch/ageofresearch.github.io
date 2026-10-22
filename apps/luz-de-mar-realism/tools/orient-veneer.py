"""Orient the observed vertical veneer while retaining every ambient-atlas UV."""
import bpy,json,hashlib,shutil
from pathlib import Path
R=Path(__file__).resolve().parents[1];O=R/'public/assets/saloon';p=O/'authoring.json';r=json.loads(p.read_text());previous=r['bakeGeometrySHA256'];objects=[]
for o in bpy.context.scene.objects:
 if not o.name.startswith('MD_R02 |')or o.type!='MESH':continue
 d=o.data;uv=d.uv_layers['UV0'];atlas=[tuple(q.uv)for q in d.uv_layers['UV1'].data]
 for f in d.polygons:
  if d.materials[f.material_index].get('family')=='wood':
   for li in f.loop_indices:uv.data[li].uv=tuple(reversed(tuple(uv.data[li].uv)))
 assert atlas==[tuple(q.uv)for q in d.uv_layers['UV1'].data];objects.append(o)
bpy.ops.object.select_all(action='DESELECT')
for o in objects:o.select_set(True)
bpy.context.view_layer.objects.active=objects[0];file=O/'room-source.glb';bpy.ops.export_scene.gltf(filepath=str(file),export_format='GLB',use_selection=True,export_extras=True,export_normals=True,export_texcoords=True,export_materials='EXPORT')
binding=hashlib.sha256(file.read_bytes()).hexdigest();dest=R/'work/raw-atlases'/binding;dest.mkdir(exist_ok=True)
for a in ['architecture','furniture']:
 n='saloon-ambient-'+a+'.exr';shutil.copyfile(R/'work/raw-atlases'/previous/n,dest/n)
r['bakeGeometrySHA256']=binding;r['veneerDirection']='Vertical, following the supplied tour; physical UV0 only, ambient UV1 unchanged';bpy.ops.wm.save_as_mainfile(filepath=str(R/'work/saloon-master.blend'),compress=True);r['masterSHA256']=hashlib.sha256((R/'work/saloon-master.blend').read_bytes()).hexdigest();p.write_text(json.dumps(r,indent=2)+'\n')
