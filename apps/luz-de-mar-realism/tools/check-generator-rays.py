"""First-hit checks against actual exported generator, context and engines."""
import os,json,numpy as np
from pathlib import Path
from mathutils import Vector
from mathutils.bvhtree import BVHTree
W=Path(os.environ['ELECTRICAL_AUTHORING_WORK']);meta=json.loads((W/'audit/generator-triangles.json').read_text());rows=np.fromfile(W/'audit/generator-triangles.bin',dtype='<f8').reshape(-1,10);verts=rows[:,:9].reshape(-1,3);tree=BVHTree.FromPolygons([Vector(p)for p in verts],np.arange(len(verts)).reshape(-1,3).tolist(),all_triangles=True);origin=Vector((0,1.17,9.15*35.23/36-17.615));checks=[]
targets=[('red stop',[432,1136],'EVR | red'),('LCD',[475,1135],'GVR | lcd'),('pink key',[461,1159.5],'GVR | key-pink'),('blue key',[476,1159.5],'GVR | key-blue'),('violet key',[491,1159.5],'GVR | key-violet'),('lower left latch',[408,1226],'GVR | olive'),('lower right latch',[550,1226],'GVR | olive'),('large door latch',[731,1108],'GVR | olive'),('auxiliary left pilot',[214.5,1251.8],'GVR | pilot-green'),('auxiliary center pilot',[248.9,1241.0],'GVR | pilot-green'),('auxiliary right pilot',[280.4,1231.8],'GVR | pilot-green'),('intercom blue pilot',[241,638],'GVR | intercom-blue'),('intercom green selector',[237,701],'GVR | pilot-green'),('upper closure',[685,540],None)]
for name,(u,v),material in targets:
 direction=Vector((1,1-v/1024,u/1024-1)).normalized();hit,normal,index,distance=tree.ray_cast(origin,direction,20);label=meta['names'].get(str(int(rows[index,9])),'')if index is not None else'miss';passed=label.startswith('generator | ')and(material is None or label.endswith(material));checks.append({'name':name,'nativeUV':[u,v],'firstHit':label,'distanceMetres':distance,'expectedMaterial':material,'pass':passed})
logoBlockers=[]
for v in range(1442,1468,4):
 for u in range(372,516,4):
  hit,normal,index,distance=tree.ray_cast(origin,Vector((1,1-v/1024,u/1024-1)).normalized(),20);label=meta['names'].get(str(int(rows[index,9])),'')if index is not None else'miss'
  if not label.startswith('generator | ')or label.endswith('rubber'):logoBlockers.append({'uv':[u,v],'firstHit':label})
logo={'name':'manufacturer area clear of the service hose','referenceRect':[372,1442,516,1468],'sampleStepPixels':4,'rays':252,'blockers':logoBlockers,'pass':not logoBlockers};checks.append(logo)
oldControls=[]
if(W/'control-mask-rays.json').exists():
 masks=json.loads((W/'control-mask-rays.json').read_text())
 for control in masks['controls']:
  blockers={}
  for u,v in control['pixels']:
   hit,normal,index,distance=tree.ray_cast(origin,Vector((u/1024-1,1-v/1024,-1)).normalized(),20);label=meta['names'].get(str(int(rows[index,9])),'')if index is not None else'miss'
   if not label.startswith('electrical | '):blockers[label]=blockers.get(label,0)+1
  oldControls.append({'id':control['id'],'rays':len(control['pixels']),'blockers':blockers,'pass':not blockers})
report={'pass':all(c['pass']for c in checks+oldControls),'runtimeGeometrySHA256':meta['runtimeGeometrySHA256'],'cameraSource':[9.15,0,3.18],'projection':'Native2048² cube L; preserved electrical masks in cube B','method':'Nearest intersection against all opaque decoded production GLB triangles, including both detailed engines. Controls must be the actual first visible surface, not just exist behind another mesh.','checks':checks,'preservedTenControls':oldControls};(W/'audit/generator-rays.json').write_text(json.dumps(report,indent=2)+'\n');print('GENERATOR EXPORTED RAYS',report['pass'],[(r['name'],r.get('firstHit',r.get('blockers')))for r in checks if not r['pass']],oldControls);assert report['pass']
