"""Private full native grid: all cells compared; review is never auto-acceptance."""
from pathlib import Path
import json,gzip,hashlib,shutil
import numpy as np
from PIL import Image,ImageDraw
from scipy.ndimage import sobel,gaussian_filter,distance_transform_edt
R=Path(__file__).resolve().parents[1];W=R/'work/electrical-vr-r01';O=W/'review/fine';O.mkdir(parents=True,exist_ok=True);E=json.loads((W/'evidence-frozen.json').read_text());correction=json.loads((W/'reference-correction.json').read_text());features=[f for f in E['features']if f['id']not in correction['supersededFeatureIDs']]+correction['features'];names=json.loads((W/'review/ids-components.json').read_text());cells=[];edges=[];sources={}
annotations=json.loads((W/'reference-components.json').read_text())
for face in sorted(set(f['face']for f in features)):
 original=R/'work/reference/machinery/cubes'/('pano_'+face+'.jpg');photo=Image.open(original).convert('RGB');reference=np.asarray(photo,dtype=float)/255;shutil.copyfile(original,O/(face+'-reference.jpg'));sources[face]=hashlib.sha256(original.read_bytes()).hexdigest()
 candidate_path=W/'review/candidate'/('native-'+face+'.png');candidate=np.asarray(Image.open(candidate_path).convert('RGB'),dtype=float)/255 if candidate_path.exists()else None
 if candidate_path.exists():Image.open(candidate_path).save(O/(face+'-candidate.png'))
 ids_path=W/'review'/('ids-'+face+'.npz');ids=np.load(ids_path)['ids']if ids_path.exists()else np.zeros((2048,2048),dtype=np.uint16)
 union=np.zeros((2048,2048),bool);detail=union.copy();local=[f for f in features if f['face']==face]
 for f in local:
  a,b,c,d=f['rect'];union[b:d,a:c]=True
  if f['detail']:detail[b:d,a:c]=True
 # A detailed 8px leaf replaces its entire 16px parent: no overlaps.
 parents=detail.reshape(128,16,128,16).any(axis=(1,3));expanded=np.repeat(np.repeat(parents,16,axis=0),16,axis=1);detail=expanded&union;coverage=np.zeros((2048,2048),dtype=np.uint8)
 luminance=reference@np.array([.2126,.7152,.0722]);photo_guides=np.hypot(sobel(gaussian_filter(luminance,.7),0),sobel(gaussian_filter(luminance,.7),1))>.12;id_boundaries=(ids>0)&((ids!=np.roll(ids,1,0))|(ids!=np.roll(ids,1,1)));border_distance=distance_transform_edt(~id_boundaries)
 grid=photo.copy();draw=ImageDraw.Draw(grid)
 for step,mask in [(16,union&~expanded),(8,detail)]:
  for y in range(0,2048,step):
   for x in range(0,2048,step):
    if not mask[y:y+step,x:x+step].any():continue
    coverage[y:y+step,x:x+step]+=1
    fs=[f for f in local if f['rect'][0]<x+step and f['rect'][2]>x and f['rect'][1]<y+step and f['rect'][3]>y]
    found=np.unique(ids[y:y+step,x:x+step]);row={'id':f'{face}-r{y:04}-c{x:04}-s{step}','face':face,'rect':[x,y,step,step],'features':[f['id']for f in fs],'observations':[f['observation']for f in fs],'materials':[f['materials']for f in fs],'candidateComponents':[names[str(int(i))]for i in found if i and str(int(i))in names],'certainty':'visible form observed; hidden depth inferred','state':'measured'if candidate is not None else'inventoried','reviewed':False,'accepted':False}
    row['referenceComponents']=[c['id']for c in annotations['components']if c['face']==face and c['rect'][0]<x+step and c['rect'][2]>x and c['rect'][1]<y+step and c['rect'][3]>y]
    row['quantities']={'referenceAnnotations':len(row['referenceComponents']),'candidateComponentIDs':len(row['candidateComponents']),'countsArePhotographicInterpretations':True};row['evidence']={'sourceSHA256':sources[face],'nativeFace':face,'resolution':[2048,2048]};row['occlusions']='Single-station visible layers; hidden connections and depths remain inferred. Review adjacent cells before acceptance.'
    local_edges=photo_guides[y:y+step,x:x+step];distances=border_distance[y:y+step,x:x+step][local_edges];row['edges']={'photographicGuidePixels':int(local_edges.sum()),'candidateIDBoundaryPixels':int(id_boundaries[y:y+step,x:x+step].sum()),'guideWithin6Pixels':float((distances<=6).mean())if len(distances)else None,'clearEdgesManuallyClassified':False}
    if candidate is not None:row['diagnostics']={'meanSRGBDifference':float(np.abs(reference[y:y+step,x:x+step]-candidate[y:y+step,x:x+step]).mean()),'candidateIDPixels':int((ids[y:y+step,x:x+step]>0).sum())}
    cells.append(row);draw.rectangle((x,y,x+step-1,y+step-1),outline='#4b9d9d'if step==8 else'#ca9566')
 assert coverage.max()<=1,'Overlapping leaf cells'
 assert np.all(coverage[union]==1),'Missing covered source pixels'
 grid.save(O/(face+'-grid.png'));visible=ids>0;model=visible&((ids!=np.roll(ids,1,0))|(ids!=np.roll(ids,1,1)))
 lum=reference@np.array([.2126,.7152,.0722]);soft=gaussian_filter(lum,.7);guides=np.hypot(sobel(soft,0),sobel(soft,1))>.12;dm=distance_transform_edt(~model);dr=distance_transform_edt(~guides)
 for f in local:
  a,b,c,d=f['rect'];photo.crop((a,b,c,d)).save(O/(f['id']+'-reference.png'))
  if candidate_path.exists():Image.open(candidate_path).crop((a,b,c,d)).save(O/(f['id']+'-candidate.png'))
  aa=dm[b:d,a:c][guides[b:d,a:c]];bb=dr[b:d,a:c][model[b:d,a:c]];edges.append({'id':f['id'],'face':face,'referenceToModelWithin6Pixels':float((aa<=6).mean())if len(aa)else None,'modelToReferenceWithin6Pixels':float((bb<=6).mean())if len(bb)else None,'referenceToModelP95Pixels':float(np.quantile(aa,.95))if len(aa)else None,'modelToReferenceP95Pixels':float(np.quantile(bb,.95))if len(bb)else None,'certifiedClearEdges':False})
ledger={'version':'electrical-vr-r01','nativeSize':2048,'camera':E['camera'],'grid':E['grid'],'sources':sources,'features':features,'cells':cells,'totalCells':len(cells),'cells16':sum(c['rect'][2]==16 for c in cells),'cells8':sum(c['rect'][2]==8 for c in cells),'comparedCells':sum('diagnostics'in c for c in cells),'manuallyAcceptedCells':0,'strictVisualAcceptance':False,'limits':['Conservative source masks include background and occlusions.','All covered cells have individual measurements when their matching native WebGL image exists; this is not manual acceptance.','Unclassified photographic edges include shadows, reflections and text, so numeric guides do not certify 95% of clear geometric edges.']}
assert ledger['comparedCells']==ledger['totalCells'],'Missing candidate native comparisons'
ledger['leafCoverage']={'complete':True,'overlapPixels':0,'policy':'8px leaves replace entire aligned16px parents'}
ledger['referenceComponentAnnotations']=annotations;ledger['referenceCorrection']=correction
raw=(json.dumps(ledger,ensure_ascii=False,separators=(',',':'))+'\n').encode();(O/'inventory.json.gz').write_bytes(gzip.compress(raw,mtime=0));(O/'edges.json').write_text(json.dumps({'method':'Bidirectional source luminance guides vs actual component-ID boundaries; diagnostics only','features':edges,'certified95PercentClearEdges':False},indent=2)+'\n')
summary={k:v for k,v in ledger.items()if k!='cells'};(O/'summary.json').write_text(json.dumps(summary,ensure_ascii=False,indent=2)+'\n')
html='''<!doctype html><meta charset="utf-8"><title>Frente eléctrico · comparación privada 16/8</title><style>body{font:16px system-ui;background:#13232b;color:#edf3f5;margin:20px}canvas{width:48%;image-rendering:pixelated}select,input,button{font:inherit;margin:5px}pre{white-space:pre-wrap}</style><h1>Frente eléctrico · VR / candidato · privado</h1><p>Cuadros nativos de 16×16 y 8×8. Medir no equivale a aceptar.</p><select id="face"></select><select id="feature"><option value="">Todo el frente</option></select><button id="prev">←</button><select id="tile"></select><button id="next">→</button><label>Superposición<input id="mix" type="range" min="0" max="1" step=".05" value="1"></label><label><input id="whole" type="checkbox">Vista completa</label><div><canvas id="ref"></canvas><canvas id="cand"></canvas></div><pre id="info"></pre><script>
const ledger=DATA,images={},$=x=>document.getElementById(x);for(const f of Object.keys(ledger.sources)){$('face').add(new Option(f,f));for(const suffix of ['reference.jpg','candidate.png']){const im=new Image;im.src=f+'-'+suffix;images[f+'-'+suffix]=im;im.onload=draw;}}for(const f of ledger.features)$('feature').add(new Option(f.id,f.id));function select(){const old=$('tile').value;$('tile').innerHTML='';for(const t of ledger.cells.filter(c=>c.face===$('face').value&&(!$('feature').value||c.features.includes($('feature').value))))$('tile').add(new Option(t.id,t.id));if([...$('tile').options].some(o=>o.value===old))$('tile').value=old;draw();}function draw(){const t=ledger.cells.find(c=>c.id===$('tile').value);if(!t)return;const r=$('whole').checked?[0,0,2048,2048]:t.rect;for(const key of ['ref','cand']){const c=$(key);c.width=768;c.height=c.width*r[3]/r[2];const ctx=c.getContext('2d');ctx.imageSmoothingEnabled=false;ctx.clearRect(0,0,c.width,c.height);const ref=images[t.face+'-reference.jpg'],cand=images[t.face+'-candidate.png'];if(ref.complete&&ref.naturalWidth)ctx.drawImage(ref,...r,0,0,c.width,c.height);if(key==='cand'&&cand.complete&&cand.naturalWidth){ctx.globalAlpha=+$('mix').value;ctx.drawImage(cand,...r,0,0,c.width,c.height);ctx.globalAlpha=1;}}$('info').textContent=JSON.stringify(t,null,2);}for(const key of ['face','feature'])$(key).onchange=select;for(const key of ['tile','mix','whole'])$(key).oninput=draw;$('prev').onclick=()=>{$('tile').selectedIndex=Math.max(0,$('tile').selectedIndex-1);draw();};$('next').onclick=()=>{$('tile').selectedIndex=Math.min($('tile').options.length-1,$('tile').selectedIndex+1);draw();};select();</script>'''
(O/'index.html').write_text(html.replace('DATA',json.dumps(ledger,ensure_ascii=False).replace('</','<\\/')))
print('ELECTRICAL GRID',json.dumps({k:summary[k]for k in ['totalCells','cells16','cells8','comparedCells','manuallyAcceptedCells']}))
