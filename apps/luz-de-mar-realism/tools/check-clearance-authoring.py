"""Physical acceptance of the R03 skins before expensive lighting transport."""
import bpy,json,hashlib,numpy as np,os,bmesh
from pathlib import Path
from mathutils import Vector
from mathutils.bvhtree import BVHTree
R=Path(__file__).resolve().parents[1];W=Path(os.environ.get('ELECTRICAL_AUTHORING_WORK',R/'work/electrical-clearance-r03'));a=json.loads((W/'authoring.json').read_text());old=json.loads((W/'input-authoring.json').read_text());C=bpy.data.collections['EDITABLE | VR electrical'];battery=[o for o in C.objects if o.get('assembly')=='battery'];skins=[o for o in C.objects if o.get('assembly')=='service-enclosure'];bounds=[]
rear=min(-(o.matrix_world@v.co).y for o in battery for v in o.data.vertices)
for o in skins:
 bm=bmesh.new();bm.from_mesh(o.data);assert all(e.is_manifold for e in bm.edges),o.name;volume=abs(bm.calc_volume(signed=True));bm.free();assert volume>0
 front=max(-(o.matrix_world@v.co).y for v in o.data.vertices);gap=rear-front;assert gap>=.01,(o.name,gap);bounds.append({'componentID':o['componentID'],'closed':True,'volumeCubicMetres':volume,'columnSeparationMetres':gap})
bindings={}
for name,objname in [('port','LVR installed | detail'),('starboard','RVR installed | detail'),('bulkhead','BVR installed | static')]:
 o=bpy.data.objects[objname];d=o.data;d.calc_loop_triangles();uv=d.uv_layers['UV1'];corners=[]
 for t in d.loop_triangles:
  for vi,li in zip(t.vertices,t.loops):
   v=o.matrix_world@d.vertices[vi].co;u=uv.data[li].uv;corners.append([v.x,v.z,-v.y,u.x,1-u.y])
 digest=hashlib.sha256(np.array(corners,dtype='<f4').tobytes()).hexdigest();assert digest==old['lighting']['engineUVBindings'][name]['cornerSHA256'],name;bindings[name]=digest
nav=json.loads((W/'navigation.json').read_text());base=json.loads((W/'baseline/luz-de-mar-realism/assets/machinery/room.json').read_text())['electricalAppearance']['navigation'];assert nav==base,'Walking masks/headroom changed'
def surface(objects):
 vertices=[];faces=[];edges=set();face_names=[];vertex_names=[];deps=bpy.context.evaluated_depsgraph_get()
 for o in objects:
  ev=o.evaluated_get(deps);d=ev.to_mesh();d.calc_loop_triangles();offset=len(vertices);vertices.extend([o.matrix_world@v.co for v in d.vertices]);vertex_names.extend([o.name]*len(d.vertices));faces.extend([tuple(offset+i for i in t.vertices)for t in d.loop_triangles]);face_names.extend([o.name]*len(d.loop_triangles));edges.update(tuple(sorted((offset+e.vertices[0],offset+e.vertices[1])))for e in d.edges);ev.to_mesh_clear()
 return vertices,faces,edges,face_names,vertex_names
access=[o for o in C.objects if o.get('assembly')=='service-access'];bv,bf,be,bfn,bvn=surface(battery);av,af,ae,afn,avn=surface(access);bt=BVHTree.FromPolygons(bv,bf,all_triangles=True);at=BVHTree.FromPolygons(av,af,all_triangles=True);minimum=1000.;samples=0;closest=None
for vertices,edges,target,origin_names,target_names in[(bv,be,at,bvn,afn),(av,ae,bt,avn,bfn)]:
 for i,j in edges:
  aa,bb=vertices[i],vertices[j];n=max(1,int(np.ceil((bb-aa).length/.002)))
  for k in range(n+1):
   point=aa+(bb-aa)*(k/n);near,normal,face,d=target.find_nearest(point);samples+=1
   if d<minimum:minimum=d;closest={'origin':origin_names[i],'target':target_names[face],'originPointBlender':list(point),'targetPointBlender':list(near),'distance':d}
(W/'access-distance-diagnostic.json').write_text(json.dumps(closest,indent=2)+'\n');print('CLOSEST ACCESS/ELECTRICAL',closest,flush=True);assert minimum-.001>=.01,('Access/electrical gap too small',minimum)
casings=json.loads((W/'casings.json').read_text());step=next(c for c in casings['casings']if c['id']=='CLEARANCE/step-8');assert step['retainedTopElevation']==step['originalTopElevation']and step['contactPatchMetres']==[.3,.23]
report={'pass':True,'skins':bounds,'accessSeparation':{'minimumSampledMetres':minimum,'conservativeLowerBoundMetres':minimum-.001,'maximumEdgeSampleSpacingMetres':.002,'samples':samples,'method':'Symmetric evaluated surface-edge sampling against exact triangle BVHs; Lipschitz distance bound includes half the maximum sample spacing.'},'tread':{k:step[k]for k in ['originalTopElevation','retainedTopElevation','originalArea','retainedArea','preservedContactPatchXZ','contactPatchMetres']},'accessChangesExplicitlySelected':True,'unchangedWorldAndUV1Bindings':bindings,'navigationUnchanged':True,'existingElectricalComponentsPhysicallyUnchanged':a['clearance']['existingElectricalPartsUnchanged'],'triangles':a['triangles'],'UVcoverage':a['uv']['coverage'],'UVpaddingPixels':a['uv']['packing']['effectivePaddingAt2048']};(W/'authoring-geometry-proof.json').write_text(json.dumps(report,indent=2)+'\n');print('R03 AUTHORING GEOMETRY ACCEPTED',min(b['columnSeparationMetres']for b in bounds),minimum,a['triangles'],flush=True)
