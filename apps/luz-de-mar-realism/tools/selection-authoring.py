"""Recover exact component lineage on retained derived geometry, export only a reference.
No original scene, geometry, UV or lighting is overwritten. Connectivity propagates
exact authored vertex seeds, not proximity or bounding boxes. Ambiguities fail closed.
"""
import bpy,json,sys,struct,collections,numpy as np
from pathlib import Path
R=Path(__file__).resolve().parents[1];W=R/'work/selection-r01';catalog=json.loads((W/'catalog-source.json').read_text());palette={o['selectableId']:o['value']for o in catalog['objects']};members=catalog['membership'];mode=sys.argv[-1]
paths={'port':R/'work/left-engine-r13/left-engine-master.blend','starboard':R/'work/right-engine-r01/right-engine-master.blend','bulkhead':R/'work/bulkhead-vr-r01/bulkhead-master.blend','electrical':W/'luz-pedestal-r01/electrical-master.blend','well':W/'luz-filter-well-r01/filter-well-master.blend'}
bpy.ops.wm.open_mainfile(filepath=str(paths[mode]));S=bpy.context.scene;deps=bpy.context.evaluated_depsgraph_get()
collections_by_mode={'port':['EDITABLE | VR left installed'],'starboard':['EDITABLE | VR right installed'],'bulkhead':['EDITABLE | VR bulkhead'],'electrical':['EDITABLE | VR electrical','EDITABLE | VR generator'],'well':[]}
originals=[]
if mode=='well':originals=[o for o in S.objects if o.type=='MESH'and o.get('componentID','').startswith('FW/')and not o.name.startswith('FW installed')]
else:
 for name in collections_by_mode[mode]:
  c=bpy.data.collections.get(name)
  if c:originals.extend(o for o in c.objects if o.type=='MESH')
for collection in bpy.data.collections:collection.hide_viewport=False
for original in originals:original.hide_viewport=False;original.hide_set(False)
bpy.context.view_layer.update();deps=bpy.context.evaluated_depsgraph_get()
# Keys are float32-exact object-local evaluated coordinates transformed into the hero world.
def key(v):return tuple(np.asarray(v,dtype=np.float32).tolist())
seeds={}
for o in originals:
 sid=members.get(o.get('componentID'));value=palette.get(sid,0)
 for d in [o.data]:
  for v in d.vertices:seeds.setdefault(key(o.matrix_world@v.co),set()).add(value)
 ev=o.evaluated_get(deps);d=ev.to_mesh()
 for v in d.vertices:seeds.setdefault(key(o.matrix_world@v.co),set()).add(value)
 ev.to_mesh_clear()
starts={'port':('LVR installed',),'starboard':('RVR installed',),'bulkhead':('BVR installed',),'electrical':('EVR installed',),'well':('FW installed',)}[mode]
heroes=[o for o in S.objects if o.type=='MESH'and o.name.startswith(starts)]
report=[]
for o in heroes:
 d=o.data;parents=list(range(len(d.vertices)))
 def find(a):
  while parents[a]!=a:parents[a]=parents[parents[a]];a=parents[a]
  return a
 for edge in d.edges:
  a,b=map(find,edge.vertices)
  if a!=b:parents[b]=a
 islands=collections.defaultdict(list)
 for v in d.vertices:islands[find(v.index)].append(v.index)
 values=np.zeros(len(d.vertices),dtype=np.float32);ambiguous=[];hits=0
 for root,vertices in islands.items():
  candidates=None;n=0
  for i in vertices:
   k=key(o.matrix_world@d.vertices[i].co);choices=seeds.get(k)
   if choices is not None:candidates=choices.copy()if candidates is None else candidates&choices;n+=1
  if candidates and len(candidates)==1:
   value=next(iter(candidates));values[vertices]=value;hits+=int(value>0)
  else:ambiguous.append({'root':root,'vertices':len(vertices),'matches':n,'candidates':sorted(candidates or [])})
 attr=d.attributes.get('_EQUIPMENT_ID')or d.attributes.new('_EQUIPMENT_ID','FLOAT','POINT');attr.data.foreach_set('value',values)
 # Dedicated physical parts added by the pedestal repair are intentionally not equipment.
 if o.get('componentID')=='EVR/vented-pedestal-union':values[:]=0;attr.data.foreach_set('value',values)
 report.append({'name':o.name,'vertices':len(d.vertices),'islands':len(islands),'selectedIslands':hits,'labelledVertices':int((values>0).sum()),'ambiguous':ambiguous,'counts':dict(collections.Counter(map(int,values)))})
 # Export a compact reference without changing UVs, normals or source files.
 o.hide_set(False);o.hide_viewport=False;o.hide_render=False
if mode in ('port','starboard'):
 detail=next(o for o in heroes if o.name.endswith('detail'));previous=next(o for o in heroes if o.name.endswith('walking'))
 previous.name+=' | retained source'
 walking=detail.copy();walking.data=detail.data.copy();S.collection.objects.link(walking);walking.name=previous.name.replace(' | retained source','');walking.hide_set(False);walking.hide_viewport=False
 bpy.ops.object.select_all(action='DESELECT');walking.select_set(True);bpy.context.view_layer.objects.active=walking
 dec=walking.modifiers.new('Walking derivative, preserve silhouette','DECIMATE');dec.ratio=.72;dec.use_collapse_triangulate=True;bpy.ops.object.modifier_apply(modifier=dec.name)
 heroes=[detail,walking]
bpy.ops.object.select_all(action='DESELECT')
for o in heroes:o.select_set(True)
S.view_layers[0].objects.active=heroes[0]
bpy.ops.export_scene.gltf(filepath=str(W/(mode+'-reference.glb')),export_format='GLB',use_selection=True,export_extras=True,export_attributes=True,export_texcoords=True,export_normals=True,export_image_format='NONE',export_vertex_color='NONE')
(W/(mode+'-lineage.json')).write_text(json.dumps({'mode':mode,'source':str(paths[mode]),'heroes':report},indent=2));print('LINEAGE',mode,[(a['name'],a['labelledVertices'],len(a['ambiguous']))for a in report],flush=True)
