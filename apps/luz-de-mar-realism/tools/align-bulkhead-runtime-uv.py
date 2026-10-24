"""Bind the editable derivative to the actual published runtime UVs.

Packing may differ between platforms. Match every triangle by world position,
winding and material, disambiguating with unchanged physical UV0. Then copy UV0
and UV1 per corner; do not move any vertex or touch either engine.
"""
import bpy,numpy as np,json,hashlib,itertools,math
from pathlib import Path
R=Path(__file__).resolve().parents[1];W=R/'work/bulkhead-vr-r01';a=json.loads((W/'authoring.json').read_text());expected=json.loads((R/'public/assets/machinery/bulkhead-vr-r01/authoring.json').read_text());spec=json.loads((W/'runtime-binding.json').read_text());hero=bpy.data.objects['BVR installed | static'];d=hero.data;d.calc_loop_triangles();runtime=np.fromfile(W/'runtime-corners.bin',dtype='<f8').reshape(-1,3,7);mats=np.fromfile(W/'runtime-materials.bin',dtype='<i4');assert len(runtime)==len(d.loop_triangles)==expected['triangles'];cell=.00025;buckets={}
for i,c in enumerate(runtime[:,:,:3].mean(axis=1)):buckets.setdefault(tuple(np.floor(c/cell).astype(int)),[]).append(i)
used=set();assign=[];max_error=0;fallback_uv_disambiguation=0
for t in d.loop_triangles:
 ps=[];old_uv=[]
 for vi,li in zip(t.vertices,t.loops):
  v=hero.matrix_world@d.vertices[vi].co;ps.append([v.x,v.z,-v.y]);u=d.uv_layers['UV0'].data[li].uv;old_uv.append([u.x,1-u.y])
 ps=np.array(ps);old_uv=np.array(old_uv);key=np.floor(ps.mean(axis=0)/cell).astype(int);material=spec['names'].index(d.materials[t.material_index].name);choices=[]
 for delta in itertools.product([-1,0,1],repeat=3):
  for i in buckets.get(tuple(key+delta),[]):
   if i in used or mats[i]!=material:continue
   for shift in range(3):
    order=np.roll(np.arange(3),shift);q=runtime[i,order];error=float(np.linalg.norm(q[:,:3]-ps,axis=1).max())
    if error<=.00025:choices.append((float(np.abs(q[:,3:5]-old_uv).max()),error,i,shift))
 assert choices,('No matching runtime triangle',t.index)
 choices.sort();uv_error,error,i,shift=choices[0];fallback_uv_disambiguation+=int(uv_error>1e-5);used.add(i);assign.append((t.index,i,shift));max_error=max(max_error,error)
assert len(used)==len(runtime),'Every runtime triangle must match exactly one authored triangle'
maximum_uv_error=0
for ti,ri,shift in assign:
 q=runtime[ri,np.roll(np.arange(3),shift)]
 for li,corner in zip(d.loop_triangles[ti].loops,q):
  for layer,offset in [('UV0',3),('UV1',5)]:
   d.uv_layers[layer].data[li].uv=(corner[offset],1-corner[offset+1]);u=d.uv_layers[layer].data[li].uv;maximum_uv_error=max(maximum_uv_error,abs(u.x-corner[offset]),abs(1-u.y-corner[offset+1]))
assert maximum_uv_error<2e-7,maximum_uv_error
tri=np.array([[d.uv_layers['UV1'].data[i].uv[:]for i in t.loops]for t in d.loop_triangles],dtype='<f4');u=tri[:,1]-tri[:,0];v=tri[:,2]-tri[:,0];area=float((np.abs(u[:,0]*v[:,1]-u[:,1]*v[:,0])/2).sum());assert area>=.4
proof={'method':'All decoded production triangles matched once by physical world positions, winding and material; UV0 disambiguates near-coincident faces. Per-corner physical UV0 and lightmap UV1 copied from the public GLB, preserving geometry.','runtimeGLBSHA256':spec['sha256'],'matchedTriangles':len(used),'maximumGeometryDifferenceMetres':max_error,'maximumCopiedUVComponentError':maximum_uv_error,'cornersCopied':len(used)*3,'UV0FallbackDisambiguations':fallback_uv_disambiguation,'originalEnginesChanged':False,'passed':True}
a['uv']['generatedPackingOnRunner']=a['uv']['packing'];a['uv']['packing']=expected['uv']['packing'];a['uv']['unquantizedProductionCornerSHA256']=expected['uv']['uvTrianglesSHA256'];a['uv']['uvTrianglesSHA256']=hashlib.sha256(tri.tobytes()).hexdigest();a['uv']['coverage']=area;a['runtimeUVBinding']=proof;(W/'runtime-uv-equivalence.json').write_text(json.dumps(proof,indent=2)+'\n');(W/'authoring.json').write_text(json.dumps(a,indent=2)+'\n');bpy.ops.wm.save_as_mainfile(filepath=str(W/'bulkhead-master.blend'),compress=True);print('RUNTIME UV BINDING',json.dumps(proof),flush=True)
