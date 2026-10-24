"""Independent checks against actual visible ID-render pixels, not annotations."""
from pathlib import Path
import json,math,numpy as np,hashlib
R=Path(__file__).resolve().parents[1];W=R/'work/electrical-vr-r01';spec=json.loads((R/'tools/electrical-verification-controls.json').read_text());names=json.loads((W/'review/ids-components.json').read_text());images={};checks=[]
for p in spec['points']:
 face=p['face'];ids=images.setdefault(face,np.load(W/'review'/('ids-'+face+'.npz'))['ids']);keys=[int(k)for k,v in names.items()if v=='EVR | '+p['object']];mask=np.isin(ids,keys);yy,xx=np.where(mask);actual=None;error=None
 if len(xx):
  if p['measure']=='centroid':actual=[float(xx.mean()),float(yy.mean())];error=math.dist(actual,p['pixel'])
  else:
   edge=mask&~(np.roll(mask,1,0)&np.roll(mask,-1,0)&np.roll(mask,1,1)&np.roll(mask,-1,1));y,x=np.where(edge);dist=(x-p['pixel'][0])**2+(y-p['pixel'][1])**2;k=int(np.argmin(dist));actual=[int(x[k]),int(y[k])];error=float(np.sqrt(dist[k]))
 checks.append({**p,'actual':actual,'visiblePixels':len(xx),'errorPixels':error,'passed':error is not None and error<=4,'ambiguousOrOccluded':len(xx)<3,'annotationUncertaintyPixels':2})
report={**spec,'geometrySHA256':json.loads((W/'authoring.json').read_text())['neutralGeometrySHA256'],'verificationSourceSHA256':hashlib.sha256((R/'tools/electrical-verification-controls.json').read_bytes()).hexdigest(),'checks':checks,'passed':sum(c['passed']for c in checks),'total':len(checks),'allPassed':all(c['passed']for c in checks),'strictVisualAcceptance':False,'limits':['Only reserved visible point/boundary checks; no 95% clear-edge certification.','Manual source annotations have uncertainty. Failures are retained, not tuned away.']}
(W/'verification-controls.json').write_text(json.dumps(report,indent=2)+'\n');print('ELECTRICAL RESERVED CHECKS',report['passed'],'/',len(checks))
