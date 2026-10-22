"""Refine the hollow jacuzzi rim and raised white foredeck bulwarks.
Operate on exteriors-ready.blend without changing the already baked aft zones.
"""
import bpy,importlib.util,runpy,json,hashlib
from pathlib import Path
R=Path(__file__).resolve().parents[1];W=R/'work';A=R/'public/assets';S=bpy.context.scene
sp=importlib.util.spec_from_file_location('p',R/'tools/exterior-primitives.py');P=importlib.util.module_from_spec(sp);sp.loader.exec_module(P);P.configure(R);P.zone('bow');P.atlases={'bow':bpy.data.images['RAW | bow']};white=bpy.data.materials['Gloss ivory marine enamel | bow']
for o in list(S.objects):
 if o.name in['bow | bow','bow | none','F08 Jacuzzi basin']:bpy.data.objects.remove(o,do_unlink=True)
for x in[30.315,31.885]:P.box('F08 Hollow jacuzzi end wall',(x,0,5.95),(.08,2.75,.70),white,.025)
for y in[-1.335,1.335]:P.box('F08 Hollow jacuzzi side wall',(31.1,y,5.95),(1.49,.08,.70),white,.025)
for side in[-1,1]:
 pts=[(25.25 if side<0 else 24.55,side*3.02,6),(29.8,side*3.02,6),(31.9,side*2.67,6),(33.65,side*2.42,5.1),(35.60,side*.72,5.1)]
 for a,b in zip(pts,pts[1:]):
  vs=[(p[0],p[1]+dy,p[2]+dz)for dz in[-.08,.38]for dy in[-.06,.06]for p in[a,b]];P.mesh('F09 Raised white foredeck bulwark',vs,[(0,1,3,2),(4,6,7,5),(0,4,5,1),(2,3,7,6),(0,2,6,4),(1,5,7,3)],white)
edit=bpy.data.collections['EDITABLE | bow']
for i,o in enumerate(P.objects):
 o['componentID']='bow/'+o.name[:3]+'/refined-'+str(i)
 for c in list(o.users_collection):c.objects.unlink(o)
 edit.objects.link(o)
original=list(edit.objects);deps=bpy.context.evaluated_depsgraph_get();groups={};components=[]
for o in original:
 data=bpy.data.meshes.new_from_object(o.evaluated_get(deps));ob=bpy.data.objects.new(o.name+' | Web',data);ob.matrix_world=o.matrix_world.copy();S.collection.objects.link(ob);atlas=o['lightmap'];groups.setdefault(atlas,[]).append(ob);components.append({'id':o['componentID'],'zone':'bow','feature':o.name,'lightmap':atlas,'dimensionStatus':'image-estimated; no as-built claim'})
prepare=runpy.run_path(str(R/'tools/lightmap-uv.py'))['prepare_uv'];merged=[];stats={}
for atlas,group in groups.items():
 bpy.ops.object.select_all(action='DESELECT')
 for o in group:o.select_set(True)
 bpy.context.view_layer.objects.active=group[0];bpy.ops.object.join();ob=bpy.context.object;ob.name='bow | '+atlas;ob['zone']='bow';ob['lightmap']=atlas;ob['sourceIDs']=json.dumps([c['id']for c in components if c['lightmap']==atlas]);merged.append(ob);bpy.ops.object.transform_apply(location=True,rotation=True,scale=True);d=ob.data
 while len(d.uv_layers):d.uv_layers.remove(d.uv_layers[0])
 uv=d.uv_layers.new(name='UV0');d.uv_layers.new(name='UV1')
 for f in d.polygons:
  m=d.materials[f.material_index];family=m.get('family','paint');tile=P.T.get(family,{}).get('tileMetres',1);axis=max(range(3),key=lambda i:abs(f.normal[i]));axes=(0,1)if axis==2 else(0,2)if axis==1 else(1,2)
  if family in['wood','teak']:axes=tuple(reversed(axes))
  for li in f.loop_indices:p=d.vertices[d.loops[li].vertex_index].co;uv.data[li].uv=(p[axes[0]]/tile,p[axes[1]]/tile)
 if atlas=='bow':stats[atlas]=prepare(ob,atlas,R)
 d.uv_layers.active_index=0;d.uv_layers['UV0'].active_render=True
bpy.ops.object.select_all(action='DESELECT')
for o in merged:o.select_set(True)
bpy.ops.export_scene.gltf(filepath=str(W/'bow-source.glb'),export_format='GLB',use_selection=True,export_extras=True,export_texcoords=True,export_normals=True)
(A/'bow/reference-components.json').write_text(json.dumps(components,indent=2)+'\n');binding=json.loads((A/'bow/authoring.json').read_text());binding['atlasPadding']=stats;binding['bakeGeometrySHA256']=hashlib.sha256((W/'bow-source.glb').read_bytes()).hexdigest();binding['refinements']=['Hollow jacuzzi walls leave the fixed blue water visible','Raised white foredeck bulwarks follow the side taper'];(A/'bow/authoring.json').write_text(json.dumps(binding,indent=2)+'\n')
bpy.ops.wm.save_as_mainfile(filepath=str(W/'exteriors-bow-v2.blend'),compress=True);print('REFINED BOW',len(components),flush=True)
