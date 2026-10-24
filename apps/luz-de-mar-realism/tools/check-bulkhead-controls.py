"""Retain failed, absent and occluded verification points without tuning to them."""
from pathlib import Path
import json,numpy as np,math
R=Path(__file__).resolve().parents[1];W=R/'work/bulkhead-vr-r01';spec=json.loads((R/'tools/bulkhead-verification-controls.json').read_text());ids=np.load(W/'review/ids-f.npz')['ids'];names=json.loads((W/'review/ids-f-components.json').read_text());checks=[]
for p in spec['points']:
 name='BVR | '+p['object'];found=[int(k)for k,v in names.items()if v==name];mask=np.isin(ids,found);y,x=np.where(mask);reference=p['pixel'];actual=[float(x.mean()),float(y.mean())]if len(x)else None;error=math.dist(actual,reference)if actual else None
 checks.append({**p,'actualVisibleCentroid':actual,'visiblePixels':len(x),'errorPixels':error,'passed':error is not None and error<=4,'occludedOrSubpixel':len(x)<3})
report={**spec,'geometrySHA256':json.loads((W/'authoring.json').read_text())['neutralGeometrySHA256'],'method':'Centroid of actual isolated visible component pixels from the fixed-camera ID render; no floating helper markers. Occluded/subpixel items retained, not silently removed.','checks':checks,'passed':sum(p['passed']for p in checks),'allPassed':all(p['passed']for p in checks),'strictVisualAcceptance':False}
(W/'verification-controls.json').write_text(json.dumps(report,indent=2)+'\n');print('UNFITTED CONTROLS',report['passed'],'/',len(checks))
