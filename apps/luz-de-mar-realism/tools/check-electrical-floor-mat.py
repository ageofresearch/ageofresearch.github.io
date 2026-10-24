"""Compare actual slot geometry with source interior pixels, not just its outline.

Photographs and sheets stay private. Only owned measurements can be published.
One patch was used to fit the repeat; the second is a frozen spatial holdout.
"""
from pathlib import Path
import json,hashlib,numpy as np
from PIL import Image,ImageDraw
R=Path(__file__).resolve().parents[1];W=R/'work/electrical-lower-r02';source=R/'work/reference/machinery/cubes/pano_d.jpg';photo=np.asarray(Image.open(source).convert('RGB'));new=np.load(W/'review/ids-d.npz')['ids'];newnames=json.loads((W/'review/ids-components.json').read_text());old=np.load(W/'iterations/appearance-01/ids/ids-d.npz')['ids'];oldnames=json.loads((W/'iterations/appearance-01/ids/ids-components.json').read_text());prefix='EVR | ochre grating traced from floor'
mask=lambda ids,names:np.isin(ids,[int(k)for k,v in names.items()if v==prefix]);nm=mask(new,newnames);om=mask(old,oldnames);checks=[]
for label,rect,fitted in [('repeat-fit',[1008,1488,1104,1584],True),('repeat-holdout',[1376,1504,1472,1600],False)]:
 a,b,c,d=rect;p=photo[b:d,a:c].astype(float)/255;ref=(p[:,:,2]/np.maximum(p[:,:,0],.01)<.60)&(p.max(2)>.10);metrics=[]
 for stage,m in [('firstCandidate',om[b:d,a:c]),('correctedGeometry',nm[b:d,a:c])]:
  union=(m|ref).sum();metrics.append({'stage':stage,'modelSolidFraction':float(m.mean()),'intersectionOverUnion':float((m&ref).sum()/union),'pixelAgreement':float((m==ref).mean())})
 checks.append({'id':label,'nativeRect':rect,'usedForFitting':fitted,'sourceSolidFraction':float(ref.mean()),'sourcePixels':int(ref.size),'measurements':metrics})
 sheet=Image.new('RGB',(1152,420),'#17262b');draw=ImageDraw.Draw(sheet)
 for i,(title,im)in enumerate([('VR original privada',Image.fromarray(photo[b:d,a:c])),('Primera candidata: geometría',Image.fromarray(np.where(om[b:d,a:c,None],[168,112,58],[205,210,208]).astype('uint8'))),('Corrección: geometría',Image.fromarray(np.where(nm[b:d,a:c,None],[168,112,58],[205,210,208]).astype('uint8'))) ]):
  enlarged=im.resize((384,384),Image.Resampling.NEAREST);g=ImageDraw.Draw(enlarged)
  for x in range(0,384,32):g.line((x,0,x,383),fill='#518e94');g.line((0,x,383,x),fill='#518e94')
  draw.text((i*384+6,4),title,fill='white');sheet.paste(enlarged,(i*384,32))
 sheet.save(W/'reference'/('floor-mat-'+label+'.png'))
report={'sourceSHA256':hashlib.sha256(source.read_bytes()).hexdigest(),'candidateNeutralGeometrySHA256':json.loads((W/'authoring.json').read_text())['neutralGeometrySHA256'],'method':'Blender native-D component-ID occupancy versus source brown-top segmentation (B/R<0.60, maxRGB>0.10); same station/projection. Brown/shadow/antialias edges are uncertain. This is a local interior-repeat diagnostic, not a global visual acceptance score.','classificationUncertaintyPixels':2,'patches':checks,'strictVisualAcceptance':False,'remainingDifference':'The spatial holdout retains a row-phase/orientation discrepancy and darker hole interiors. Correct solid coverage is not proof of full alignment; the holdout is not accepted or used to tune the fitted repeat.'};(W/'floor-mat-diagnostics.json').write_text(json.dumps(report,indent=2)+'\n');print(json.dumps(checks,indent=2))
