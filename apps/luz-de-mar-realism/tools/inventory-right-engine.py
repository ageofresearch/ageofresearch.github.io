"""Export component provenance and physical bounds; never publish VR pixels."""
import bpy,json,hashlib
from pathlib import Path
R=Path(__file__).resolve().parents[1];W=R/'work/right-engine-r01';A=R/'public/assets/mechanics/right-vr-r01';items=[];SX=35.23/36;SY=7.47/7.6
for o in sorted(bpy.data.collections['EDITABLE | VR right installed'].objects,key=lambda o:o.name):
 if o.type!='MESH':continue
 points=[o.matrix_world@v.co for v in o.data.vertices];source=[((-p.y+17.615)/SX,p.x/SY,p.z+2.01)for p in points]
 observation=json.loads(o.get('gridObservation','null'))
 items.append({'id':o['componentID'],'name':o.name,'assembly':o['assembly'],'materials':[m.name for m in o.data.materials],'sourceBounds':[[min(p[k]for p in source)for k in range(3)],[max(p[k]for p in source)for k in range(3)]],'evidence':json.loads(o.get('evidence','[]')),'observation':observation,'viewObservation':json.loads(o.get('viewObservation','null')),'placementNote':o.get('rightPlacement'),'classification':'observed right image feature; hidden depth inferred'if observation or o.get('viewObservation') else'compatible shared form; dimensions and hidden installation inferred'if o.get('sharedForm')else'right installation reconstruction; dimensions inferred','sharedForm':o.get('sharedForm')})
report={'version':'right-vr-r01','cameraSource':[9.15,0,3.18],'units':'metres in the source yacht coordinate frame','count':len(items),'masterSHA256':hashlib.sha256((W/'right-engine-master.blend').read_bytes()).hexdigest(),'items':items,'limits':['Common forms derived from R13 are not proof of mirrored internal mechanisms.','Native image coordinates constrain visible projections only, not hidden depths.','No measured pixel-perfect acceptance or real-vessel dimensional certification.']}
(A/'component-inventory.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n');print('INVENTORY',len(items))
