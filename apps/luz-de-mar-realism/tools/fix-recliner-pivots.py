"""Keep angled recliner backs rotating about their own centres, not yacht zero."""
import bpy,json,hashlib,runpy,bmesh
from pathlib import Path
from mathutils import Vector,Matrix
R=Path(__file__).resolve().parents[1];W=R/'work';A=R/'public/assets/beach-club';S=bpy.context.scene;edit=bpy.data.collections['EDITABLE | beach-club']
for o in edit.objects:
 if o.name.startswith('B06 Angled recliner back'):
  c=Vector(tuple((min(v.co[i]for v in o.data.vertices)+max(v.co[i]for v in o.data.vertices))/2 for i in range(3)));rot=Matrix.Rotation(-.85,3,'X')
  for v in o.data.vertices:v.co=c+rot@(v.co-c)
  o.rotation_euler=(0,0,0);o['rotationPivot']='Own cushion centre, inclination inferred'
for o in list(S.objects):
 if o.get('zone')=='beach-club'and o not in list(edit.objects):bpy.data.objects.remove(o,do_unlink=True)
deps=bpy.context.evaluated_depsgraph_get();groups={};components=json.loads((A/'reference-components.json').read_text())
for o in edit.objects:
 d=bpy.data.meshes.new_from_object(o.evaluated_get(deps));bm=bmesh.new();bm.from_mesh(d);bmesh.ops.remove_doubles(bm,verts=list(bm.verts),dist=.000002);bmesh.ops.dissolve_degenerate(bm,edges=list(bm.edges),dist=.000002);bad=[f for f in bm.faces if f.calc_area()<1e-10]
 if bad:bmesh.ops.delete(bm,geom=bad,context='FACES')
 bm.to_mesh(d);bm.free();ob=bpy.data.objects.new(o.name+' | Web',d);ob.matrix_world=o.matrix_world.copy();S.collection.objects.link(ob);groups.setdefault(o['lightmap'],[]).append(ob)
prepare=runpy.run_path(str(R/'tools/lightmap-uv.py'))['prepare_uv'];T=json.loads((W/'textures/materials.json').read_text());merged=[];stats={}
for atlas,group in groups.items():
 bpy.ops.object.select_all(action='DESELECT')
 for o in group:o.select_set(True)
 bpy.context.view_layer.objects.active=group[0];bpy.ops.object.join();o=bpy.context.object;o.name='beach-club | '+atlas;o['zone']='beach-club';o['lightmap']=atlas;o['sourceIDs']=json.dumps([c['id']for c in components if c['lightmap']==atlas]);merged.append(o);bpy.ops.object.transform_apply(location=True,rotation=True,scale=True);d=o.data
 while len(d.uv_layers):d.uv_layers.remove(d.uv_layers[0])
 uv=d.uv_layers.new(name='UV0');d.uv_layers.new(name='UV1')
 for f in d.polygons:
  family=d.materials[f.material_index].get('family','paint');tile=T.get(family,{}).get('tileMetres',1);axis=max(range(3),key=lambda i:abs(f.normal[i]));axes=(0,1)if axis==2 else(0,2)if axis==1 else(1,2)
  if family in['wood','teak']:axes=tuple(reversed(axes))
  for li in f.loop_indices:q=d.vertices[d.loops[li].vertex_index].co;uv.data[li].uv=(q[axes[0]]/tile,q[axes[1]]/tile)
 if atlas=='beach-club':stats[atlas]=prepare(o,atlas,R)
 d.uv_layers.active_index=0;d.uv_layers['UV0'].active_render=True
bpy.ops.object.select_all(action='DESELECT')
for o in merged:o.select_set(True)
bpy.ops.export_scene.gltf(filepath=str(W/'beach-club-source.glb'),export_format='GLB',use_selection=True,export_extras=True)
binding=json.loads((A/'authoring.json').read_text());binding['atlasPadding']=stats;binding['bakeGeometrySHA256']=hashlib.sha256((W/'beach-club-source.glb').read_bytes()).hexdigest();(A/'authoring.json').write_text(json.dumps(binding,indent=2)+'\n');bpy.ops.wm.save_as_mainfile(filepath=str(W/'exteriors-final-fixed.blend'),compress=True);print('RECLINER PIVOTS FIXED',flush=True)
