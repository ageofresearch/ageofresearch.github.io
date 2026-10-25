"""Measure the authored control fronts in the original2048px L projection.

These are fit landmarks, not independent held-out validation points. Their
error cannot establish complete photographic/geometric equivalence.
"""
import bpy,json,os,numpy as np
from pathlib import Path
W=Path(os.environ['ELECTRICAL_AUTHORING_WORK']);camera=np.array([0,1.17,9.15*35.23/36-17.615]);results=[]
def check(name,target,cap=True):
 o=bpy.data.objects['GVR | '+name];vertices=np.array([(o.matrix_world@v.co)[:]for v in o.data.vertices]);vertices=vertices[len(vertices)//2:]if cap else vertices[np.abs(vertices[:,0]-vertices[:,0].min())<1e-6];p=vertices.mean(0);q=np.array([p[0],p[2],-p[1]])-camera;projected=np.array([1024+q[2]/q[0]*1024,1024-q[1]/q[0]*1024]);error=float(np.linalg.norm(projected-target));results.append({'component':o.get('componentID',name),'face':'l','referenceUV':target,'projectedUV':projected.tolist(),'errorPixels':error,'pass':error<=4})
check('red emergency stop',[432,1136])
for i,p in enumerate([[214.5,1251.8],[248.9,1241.0],[280.4,1231.8]]):check('auxiliary green indicator '+str(i)+' lens',p)
check('intercom blue pilot lens',[241,638]);check('intercom green selector lens',[237,701])
for u in [413,542]:
 for v in [1099,1180]:check('controller frame screw '+str((u,v)),[u,v])
for i,(u,v)in enumerate([(408,1230),(550,1230),(731,1112)]):check('latch moving tongue '+str(i),[u,v-4],False)
for i,u in enumerate([461,476,491]):check('controller colored key '+str(i),[u,1159.5],False)
report={'pass':all(r['pass']for r in results),'projection':'Native L cube,2048²; one estimated fixed station','cameraSource':[9.15,0,3.18],'landmarkClass':'fit controls; not held out','points':len(results),'maximumErrorPixels':max(r['errorPixels']for r in results),'results':results,'limitations':['A center match does not validate every edge or hidden depth.','No95% clear-edge or per-cell visual acceptance is claimed.']};(W/'projection-proof.json').write_text(json.dumps(report,indent=2)+'\n');print('GENERATOR PROJECTED CONTROLS',report['pass'],report['maximumErrorPixels']);assert report['pass'],[r for r in results if not r['pass']]
