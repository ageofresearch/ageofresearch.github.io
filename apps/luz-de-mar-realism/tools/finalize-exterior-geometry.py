"""Give the covered terrace its own baked ceiling and consistent outdoor finish.
Input exteriors-bow-v2.blend; output exteriors-final.blend. No reference pixels.
"""
import bpy,bmesh,json,hashlib,runpy
from pathlib import Path
R=Path(__file__).resolve().parents[1];W=R/'work';A=R/'public/assets';S=bpy.context.scene
roof=bpy.data.objects.get('X01 Aft upper-deck overhang')or bpy.data.objects['C10 Fixed aft terrace ceiling and roof'];roof['zone']='cockpit';roof['lightmap']='cockpit';roof['componentID']='cockpit/C10/covered-ceiling';roof.name='C10 Fixed aft terrace ceiling and roof'
for c in list(roof.users_collection):c.objects.unlink(roof)
bpy.data.collections['EDITABLE | cockpit'].objects.link(roof);roof.data.materials[0]=bpy.data.materials['Gloss ivory marine enamel | cockpit']
for m in bpy.data.materials:
 if m.get('family')=='wood'and m.get('lightmap')not in['architecture','furniture']:
  m['roughnessFactor']=.56;m['baseColorFactor']=[.84,.73,.54];p=m.node_tree.nodes.get('Principled BSDF');p.inputs['Roughness'].default_value=.56;p.inputs['Coat Weight'].default_value=.18;p.inputs['Coat Roughness'].default_value=.35
  mult=next((n for n in m.node_tree.nodes if n.type=='MIX_RGB'),None)
  if mult:mult.inputs[1].default_value=(.84,.73,.54,1)
 # Unbaked metals retain local reflections; micro-grain should stay subtle.
 if m.get('family')in['wood','teak']and m.get('lightmap')not in['architecture','furniture']:
  for n in m.node_tree.nodes:
   if n.type=='NORMAL_MAP':n.inputs['Strength'].default_value=.06
S.world.node_tree.nodes['Background'].inputs[1].default_value=.50
originals=[o for c in S.collection.children if c.name.startswith('EDITABLE |')for o in c.objects if o.type in['MESH','CURVE']]
for o in list(S.objects):
 if o.type=='MESH'and o not in originals:bpy.data.objects.remove(o,do_unlink=True)
for col in S.collection.children:
 if col.name.startswith('EDITABLE |'):col.hide_viewport=False
bpy.context.view_layer.update()
deps=bpy.context.evaluated_depsgraph_get();groups={};components=[]
for o in originals:
 d=bpy.data.meshes.new_from_object(o.evaluated_get(deps));assert len(d.vertices)>0,'Empty evaluated component: '+o.name;bm=bmesh.new();bm.from_mesh(d)
 if o['zone']!='saloon':
  bmesh.ops.remove_doubles(bm,verts=list(bm.verts),dist=.000002);bmesh.ops.dissolve_degenerate(bm,edges=list(bm.edges),dist=.000002);bad=[f for f in bm.faces if f.calc_area()<1e-10]
  if bad:bmesh.ops.delete(bm,geom=bad,context='FACES')
 bm.to_mesh(d);bm.free();ob=bpy.data.objects.new(o.name+' | Web',d);ob.matrix_world=o.matrix_world.copy();S.collection.objects.link(ob);id=o['zone'];atlas=o.get('lightmap','none');groups.setdefault(id,{}).setdefault(atlas,[]).append(ob);components.append({'id':o['componentID'],'zone':id,'feature':o.name,'lightmap':atlas,'dimensionStatus':'image-estimated; no as-built claim'})
for col in S.collection.children:
 if col.name.startswith('EDITABLE |'):col.hide_viewport=True
prepare=runpy.run_path(str(R/'tools/lightmap-uv.py'))['prepare_uv'];textures=json.loads((W/'textures/materials.json').read_text())
for id,zonegroups in groups.items():
 merged=[];stats={}
 for atlas,group in zonegroups.items():
  bpy.ops.object.select_all(action='DESELECT')
  for o in group:o.select_set(True)
  bpy.context.view_layer.objects.active=group[0];bpy.ops.object.join();o=bpy.context.object;o.name=id+' | '+atlas;o['zone']=id;o['lightmap']=atlas;o['sourceIDs']=json.dumps([c['id']for c in components if c['zone']==id and c['lightmap']==atlas]);merged.append(o);bpy.ops.object.transform_apply(location=True,rotation=True,scale=True);d=o.data
  while len(d.uv_layers):d.uv_layers.remove(d.uv_layers[0])
  uv=d.uv_layers.new(name='UV0');d.uv_layers.new(name='UV1')
  for f in d.polygons:
   family=d.materials[f.material_index].get('family','paint');tile=textures.get(family,{}).get('tileMetres',1);axis=max(range(3),key=lambda i:abs(f.normal[i]));axes=(0,1)if axis==2 else(0,2)if axis==1 else(1,2)
   if family in['wood','flooroak','teak']:axes=tuple(reversed(axes))
   for li in f.loop_indices:p=d.vertices[d.loops[li].vertex_index].co;uv.data[li].uv=(p[axes[0]]/tile,p[axes[1]]/tile)
  if atlas not in['none','context']:stats[atlas]=prepare(o,atlas,R)
  d.uv_layers.active_index=0;d.uv_layers['UV0'].active_render=True
 bpy.ops.object.select_all(action='DESELECT')
 for o in merged:o.select_set(True)
 bpy.ops.export_scene.gltf(filepath=str(W/(id+'-source.glb')),export_format='GLB',use_selection=True,export_extras=True,export_texcoords=True,export_normals=True)
 (A/id/'reference-components.json').write_text(json.dumps([c for c in components if c['zone']==id],indent=2)+'\n')
 if id!='context':
  binding=json.loads((A/id/'authoring.json').read_text());newhash=hashlib.sha256((W/(id+'-source.glb')).read_bytes()).hexdigest();changed=binding.get('bakeGeometrySHA256')!=newhash
  if changed:
   binding.pop('rawBakesSHA256',None);binding.pop('masterSHA256',None)
  print('SOURCE BINDING',id,'changed'if changed else'unchanged',flush=True)
  binding.update({'revision':9,'samples':24,'atlasPadding':stats,'bakeGeometrySHA256':hashlib.sha256((W/(id+'-source.glb')).read_bytes()).hexdigest(),'ambientStrength':.5,'nativeOutdoorWoodCoat':.18,'ambientCalibration':'Fixed illustrative daylight, not photometrically measured. Linear ambient HDR strength 0.5; live sun 1.15 excluded from bakes.'});(A/id/'authoring.json').write_text(json.dumps(binding,indent=2)+'\n')
S.cycles.samples=24;S['ambientStrength']=.5;S['authoringRevision']=9;bpy.ops.wm.save_as_mainfile(filepath=str(W/'exteriors-final.blend'),compress=True);print('FINAL GEOMETRY',len(components),flush=True)
