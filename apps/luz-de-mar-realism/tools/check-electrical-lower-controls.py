"""Native lower diagnostic controls. Fitting points are never called independent."""
import os,json,math,hashlib,numpy as np
from pathlib import Path
R=Path(__file__).resolve().parents[1];W=R/'work/electrical-lower-r02';names=json.loads((W/'review/ids-components.json').read_text());images={};checks=[]
# Reference pixels read on original native faces, before the final WebGL check.
# These checks are diagnostic: some were used for fitting this correction.
spec=[('grille-left','b',[180,1682],'lower right chevron grille',True),('grille-right','b',[296,1754],'lower right grille white housing',True),('grille-top','b',[234,1658],'lower right grille white housing',True),('grille-bottom','b',[234,1775],'lower right grille white housing',True),('pedestal-front-left','d',[384,1868],'vented pedestal upper plate',True),('pedestal-front-right','d',[1660,1880],'vented pedestal upper plate',True),('pedestal-slot','d',[1000,1798],'vented pedestal dark interior',True),('auxiliary-box','l',[112,1214],'three green pilot enclosure',True),('green-0','l',[214.49,1251.75],'auxiliary green lens 0',False),('green-1','l',[248.91,1241.01],'auxiliary green lens 1',False),('green-2','l',[280.42,1231.82],'auxiliary green lens 2',False),('grating-rear','d',[1000,1696],'ochre grating traced from floor',True),('grating-step','d',[1312,1160],'ochre grating traced from floor',True)]
for label,face,pixel,prefix,boundary in spec:
 if face not in images:images[face]=np.load(W/'review'/('ids-'+face+'.npz'))['ids']
 keys=[int(k)for k,v in names.items()if v.startswith('EVR | '+prefix)];mask=np.isin(images[face],keys);y,x=np.where(mask);actual=None;error=None
 if len(x):
  if boundary:
   edge=mask&~(np.roll(mask,1,0)&np.roll(mask,-1,0)&np.roll(mask,1,1)&np.roll(mask,-1,1));y,x=np.where(edge);i=np.argmin((x-pixel[0])**2+(y-pixel[1])**2);actual=[int(x[i]),int(y[i])]
  else:actual=[float(x.mean()),float(y.mean())]
  error=math.dist(actual,pixel)
 checks.append({'id':label,'face':face,'pixel':pixel,'componentPrefix':prefix,'measure':'boundary'if boundary else'centroid','actual':actual,'errorPixels':error,'passed':error is not None and error<=4,'visiblePixels':int(mask.sum()),'independent':False})
report={'version':'electrical-lower-r02','method':'Source-native lower diagnostic checks against actual ID render. No independent acceptance claim: these points include fitting controls.','checks':checks,'passed':sum(c['passed']for c in checks),'total':len(checks),'strictVisualAcceptance':False,'invalidatedHistoricalControls':[{'id':'D-V06','reason':'R01 point B376,1711 is on blank cabinet paint. The actual grille occupies approximately B176..296,1658..1765.'},{'id':'V-V01..04','reason':'R01 louvre rows/pitch do not follow the source28-row count; previous row-specific checks are superseded.'}],'ambiguousControls':[{'id':'pipe-bottom','reason':'Old point170,1648 is inside the white pipe surface, not an unequivocal silhouette edge; excluded from a boundary-error score.'}],'limits':['Native diagnostics do not establish global4px/95% clear-edge acceptance.','Errors and occlusions are retained.','Native photographs contain uncertain edges from shadows and reflections.']}
(W/'verification-controls.json').write_text(json.dumps(report,indent=2)+'\n');print('LOWER NATIVE DIAGNOSTICS',report['passed'],'/',report['total'])
