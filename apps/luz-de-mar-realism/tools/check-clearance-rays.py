"""Independent BVH rays through source-mask interiors, including lateral stations.

The native mask is frozen before adjustment. Physical lateral stations have no
additional photographic perspective; they test occlusion of the same surfaces.
"""
import os,json,numpy as np
from pathlib import Path
from mathutils import Vector
from mathutils.bvhtree import BVHTree
R=Path(__file__).resolve().parents[1];W=Path(os.environ.get('ELECTRICAL_AUTHORING_WORK',R/'work/electrical-clearance-r03'))
e=json.loads((W/'clearance-evidence.json').read_text());rows=np.fromfile(W/'audit/candidate-triangles.bin',dtype='<f8').reshape(-1,10)
def tree(t):
 v=t[:,:9].reshape(-1,3);return BVHTree.FromPolygons([Vector(p)for p in v],np.arange(len(v)).reshape(-1,3).tolist(),all_triangles=True)
electrical=tree(rows[rows[:,9]==1]);context=tree(rows[rows[:,9]!=1]);origin=Vector((0,1.17,9.15*35.23/36-17.615));stations=[origin]+[Vector((p['position'][1]*7.47/7.6,p['position'][2]-2.01,p['position'][0]*35.23/36-17.615))for p in e['poses'][-2:]];result=[]
for c in e['controlMasks']['controls']:
 mask=np.load(W/'audit'/('mask-'+c['id']+'.npy'));yy,xx=np.where(mask);targets=[]
 for y,x in zip(yy,xx):
  if x%4 or y%4:continue
  d=Vector(((x+.5)/1024-1,1-(y+.5)/1024,-1)).normalized();hit=electrical.ray_cast(origin,d)
  assert hit[0]is not None,('Missing reference control surface',c['id'],x,y)
  targets.append(hit[0])
 for i,camera in enumerate(stations):
  blocked=[]
  for j,target in enumerate(targets):
   d=target-camera;distance=d.length;hit=context.ray_cast(camera,d.normalized(),distance-.0003)
   if hit[0]is not None:blocked.append(j)
  result.append({'control':c['id'],'station':i,'rays':len(targets),'blocked':len(blocked),'pass':not blocked})
report={'pass':all(r['pass']for r in result),'runtimeGeometrySHA256':json.loads((W/'audit/candidate-triangles.json').read_text())['runtimeGeometrySHA256'],'stationsWebMetres':[list(p)for p in stations],'nativeMaskSampleStep':4,'rays':sum(r['rays']for r in result),'results':result,'method':'Exact triangle BVHs from decoded production GLBs; first electrical hit from each frozen native-mask sample is the target. Cast from three stations against all non-electrical retained and replacement triangles, excluding only a 0.3 mm endpoint tolerance.'};(W/'audit/ray-visibility.json').write_text(json.dumps(report,indent=2)+'\n');print('CONTROL BVH RAYS',report['pass'],report['rays'],[(r['control'],r['station'],r['blocked'])for r in result if not r['pass']]);assert report['pass']
