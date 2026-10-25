"""Check actual mesh contact at the relocated rail mounts, not only proximity."""
from pathlib import Path
import os,json,numpy as np
from mathutils import Vector
from mathutils.bvhtree import BVHTree
R=Path(__file__).resolve().parents[1];W=Path(os.environ.get('ELECTRICAL_AUTHORING_WORK',R/'work/electrical-clearance-r03'));c=json.loads((W/'casings.json').read_text());parts={p['id']:p for p in c['casings']};triangles=np.fromfile(W/'audit/candidate-triangles.bin',dtype='<f8').reshape(-1,10);names=json.loads((W/'audit/candidate-triangles.json').read_text())['names']
def surface(name):
 if name in parts:
  p=parts[name];v=[Vector(x)for x in p['vertices']];f=[(q[0],q[i],q[i+1])for q in p['faces']for i in range(1,len(q)-1)];return v,f
 selected=[int(i)for i,n in names.items()if n==name];v=[Vector(p)for p in triangles[np.isin(triangles[:,9],selected),:9].reshape(-1,3)];return v,np.arange(len(v)).reshape(-1,3).tolist()
def contact(a,b):
 av,af=surface(a);bv,bf=surface(b);assert av and bv,(a,b);at=BVHTree.FromPolygons(av,af,all_triangles=True);bt=BVHTree.FromPolygons(bv,bf,all_triangles=True);hits=0;closest=(100.,None,None)
 for vertices,faces,target in[(av,af,bt),(bv,bf,at)]:
  edges={tuple(sorted((i,j)))for f in faces for i,j in zip(f,list(f[1:])+[f[0]])}
  for i,j in edges:
   p,q=vertices[i],vertices[j];d=q-p
   if d.length>1e-9 and target.ray_cast(p,d.normalized(),d.length+1e-7)[0]is not None:hits+=1
   count=max(1,int(np.ceil(d.length/.0005)))
   for k in range(count+1):
    point=p+d*(k/count);near,normal,index,distance=target.find_nearest(point)
    if distance<closest[0]:closest=(distance,list(point),list(near))
 return{'parts':[a,b],'surfaceEdgeIntersections':hits,'minimumSampledGapMetres':closest[0],'closestPoints':closest[1:],'pass':hits>0}
pairs=[('CLEARANCE/127','CLEARANCE/'+str(i))for i in[129,130]]+[('CLEARANCE/127','CLEARANCE/131-sleeve'),('CLEARANCE/131-sleeve','CLEARANCE/131'),('CLEARANCE/129','CLEARANCE/129-spacer'),('CLEARANCE/129-spacer','CLEARANCE/123/0'),('CLEARANCE/130','CLEARANCE/123/0'),('CLEARANCE/131','CLEARANCE/131-standoff'),('CLEARANCE/131-standoff','MD_DCK_001/stairs/stair-opening')]
rows=[contact(*p)for p in pairs];report={'pass':all(p['pass']for p in rows),'runtimeGeometrySHA256':json.loads((W/'audit/candidate-triangles.json').read_text())['runtimeGeometrySHA256'],'method':'Bidirectional exact segment/triangle rays on authored mounting surfaces; all pairs must have actual intersections. Nearest-edge samples at 0.5 mm provide diagnostic gap positions. Existing structural target is read from decoded exported room triangles.','contacts':rows};(W/'mount-contact-proof.json').write_text(json.dumps(report,indent=2)+'\n');print('RAIL MOUNT CONTACTS',report['pass']);print([(r['parts'],r['pass'],r['minimumSampledGapMetres'],r['closestPoints'])for r in rows]);assert report['pass']
