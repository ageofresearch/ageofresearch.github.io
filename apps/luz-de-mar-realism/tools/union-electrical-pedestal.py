"""Blender exact Boolean boundary; source face IDs survive for UV transfer."""
import bpy,bmesh,json,os
from pathlib import Path
W=Path(os.environ.get('PEDESTAL_WORK','/tmp/ldm-pedestal-r01'))
source=json.loads((W/'source-triangles.json').read_text())
bpy.ops.object.select_all(action='SELECT');bpy.ops.object.delete(use_global=False)
materials=[bpy.data.materials.new('source-face-'+str(i))for i in range(len(source))]
objects=[]
for part in range(4):
 vertices=[];faces=[];ids=[];lookup={}
 for i,s in enumerate(source):
  if s['part']!=part:continue
  face=[]
  for p in s['points']:
   # Micrometre snapping removes float32 noise on intended common planes.
   key=tuple(round(v,6)for v in p)
   if key not in lookup:lookup[key]=len(vertices);vertices.append(key)
   face.append(lookup[key])
  faces.append(face);ids.append(i)
 mesh=bpy.data.meshes.new('pedestal part');mesh.from_pydata(vertices,[],faces);mesh.update()
 for m in materials:mesh.materials.append(m)
 for f,i in zip(mesh.polygons,ids):f.material_index=i
 o=bpy.data.objects.new('pedestal part '+str(part),mesh);bpy.context.collection.objects.link(o);objects.append(o)
objects=objects[1:]+objects[:1]
hero=objects[0];bpy.context.view_layer.objects.active=hero;hero.select_set(True)
for other in objects[1:]:
 mod=hero.modifiers.new('Boundary union','BOOLEAN');mod.operation='UNION';mod.solver='EXACT';mod.object=other
 bpy.ops.object.modifier_apply(modifier=mod.name);bpy.data.objects.remove(other,do_unlink=True)
bm=bmesh.new();bm.from_mesh(hero.data)
bmesh.ops.remove_doubles(bm,verts=list(bm.verts),dist=2e-6)
bmesh.ops.triangulate(bm,faces=list(bm.faces))
boundary=sum(e.is_boundary for e in bm.edges);nonmanifold=sum(not e.is_manifold for e in bm.edges)
print('UNION',len(bm.faces),'boundary',boundary,'nonmanifold',nonmanifold,flush=True)
assert boundary==nonmanifold==0
bm.normal_update();assert bm.calc_volume(signed=True)>0
out={'closed':True,'boundaryEdges':boundary,'nonmanifoldEdges':nonmanifold,'volume':bm.calc_volume(signed=True),'faces':[{'source':f.material_index,'points':[list(v.co)for v in f.verts]}for f in bm.faces]}
(W/'union.json').write_text(json.dumps(out))
bm.free()
