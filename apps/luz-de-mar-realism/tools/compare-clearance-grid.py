"""Private VR/R02/R03 comparison at native8px,4px at the ten controls.

Coverage and obstruction acceptance are distinct from full visual fidelity.
Original VR imagery and all sheets produced here must remain private.
"""
from pathlib import Path
import os,json,gzip,hashlib
import numpy as np
from PIL import Image,ImageDraw
R=Path(__file__).resolve().parents[1];W=Path(os.environ.get('ELECTRICAL_AUTHORING_WORK',R/'work/electrical-clearance-r03'));O=W/'review/grid';O.mkdir(parents=True,exist_ok=True)
E=json.loads((W/'clearance-evidence.json').read_text());images=[Image.open(R/'work/reference/machinery/cubes/pano_b.jpg').convert('RGB'),*[Image.open(W/'review'/stage/'native-b.png').convert('RGB')for stage in ['baseline','candidate']]];arrays=[np.asarray(im,dtype=np.float32)/255 for im in images];vis=json.loads((W/'audit/candidate-visibility.json').read_text());before=json.loads((W/'audit/baseline-visibility.json').read_text());capture=json.loads((W/'review/candidate/report.json').read_text());assert capture.get('pass')and capture.get('native',{}).get('b',{}).get('canvas')==[2048,2048]and capture['runtimeGeometrySHA256']==vis['runtimeGeometrySHA256'],'Completed native captures must describe the actual final GLB';byid={r['id']:r for r in vis['controls']}
nativeIDs=np.load(W/'review/ids-b.npz')['ids'];componentNames=json.loads((W/'review/ids-components.json').read_text())
coverage=np.zeros((2048,2048),np.uint8);cells=[];detail=np.zeros_like(coverage,dtype=bool);controlRects={}
for c in E['controlMasks']['controls']:
 x,y=c['center'];rect=[1852,y-70,2032,y+(52 if c['kind']=='large' else 36)];controlRects[c['id']]=rect;detail[rect[1]:rect[3],rect[0]:rect[2]]=True
for y in range(616,1904,8):
 for x in range(1800,2048,8):
  step=4 if detail[y:y+8,x:x+8].any() else 8
  for yy in range(y,y+8,step):
   for xx in range(x,x+8,step):
    coverage[yy:yy+step,xx:xx+step]+=1;rect=[xx,yy,xx+step,yy+step];controls=[c for c,r in controlRects.items()if r[0]<xx+step and r[2]>xx and r[1]<yy+step and r[3]>yy];a,b,c=[im[yy:yy+step,xx:xx+step]for im in arrays];cells.append({'id':f'b-r{yy:04}-c{xx:04}-s{step}','rect':[xx,yy,step,step],'controls':controls,'candidateComponents':[componentNames[str(int(i))]for i in np.unique(nativeIDs[yy:yy+step,xx:xx+step])if i and str(int(i))in componentNames],'referenceObservation':'Frozen control/caption region'if controls else'battery enclosure and immediate stair encounter','materials':['paint','red or black polymer','metal','label']if controls else['paint','metal'],'quantityInterpretation':'Component IDs intersecting this cell are recorded; counts of photographic parts are not inferred automatically.','occlusionReview':'Compare first-hit depth and adjacent cells; hidden backing remains inferred.','certainty':'visible source mask observed; hidden depth inferred','state':'measured','reviewed':False,'visualAccepted':False,'sourceSHA256':hashlib.sha256((R/'work/reference/machinery/cubes/pano_b.jpg').read_bytes()).hexdigest(),'meanSRGBDifferenceR02':float(np.abs(a-b).mean()),'meanSRGBDifferenceR03':float(np.abs(a-c).mean()),'note':'Color differences include lighting, printed labels and photographic reflections. Zero obstructions does not certify matching fine shape or finish.'})
assert coverage.max()==1 and coverage[616:1904,1800:2048].min()==1
for c in E['controlMasks']['controls']:
 x0,y0,x1,y1=controlRects[c['id']];w,h=x1-x0,y1-y0;sheet=Image.new('RGB',(w*3*3,h*3+32),'#172830');d=ImageDraw.Draw(sheet)
 for i,(title,im)in enumerate(zip(['VR privada','R02','R03'],images)):
  tile=im.crop((x0,y0,x1,y1)).resize((w*3,h*3),Image.Resampling.NEAREST);g=ImageDraw.Draw(tile)
  for x in range((4-x0%4)%4,w,4):g.line((x*3,0,x*3,h*3-1),fill='#608080')
  for y in range((4-y0%4)%4,h,4):g.line((0,y*3,w*3-1,y*3),fill='#608080')
  sheet.paste(tile,(i*w*3,32));d.text((i*w*3+3,6),f'{title} {c["id"]} B:{x0},{y0} /4px',fill='white')
 sheet.save(O/(c['id']+'.png'))
for name,im in zip(['reference','baseline','candidate'],images):im.save(O/(name+'.png'))
overlay=Image.blend(images[0],images[2],.5);overlay.save(O/'overlay50.png')
summary={'version':'electrical-clearance-r03','runtimeGeometrySHA256':vis['runtimeGeometrySHA256'],'nativeSize':2048,'grid':{'basePixels':8,'detailPixels':4},'region':[1800,616,2048,1904],'totalCells':len(cells),'comparedCells':len(cells),'cells8':sum(c['rect'][2]==8 for c in cells),'cells4':sum(c['rect'][2]==4 for c in cells),'leafCoverage':{'complete':True,'overlapPixels':0},'strictVisualAcceptance':False,'visibilityAccepted':vis['pass'],'beforeBlockedPixels':before['totalBlockedPixels'],'afterBlockedPixels':vis['totalBlockedPixels'],'sources':{'b':cells[0]['sourceSHA256']},'manualReview':'Ten4px control sheets and six complete browser views are reviewed separately. Generated per-cell measurements do not mean manual acceptance of every cell.','limits':['Only obstruction correction is accepted. Existing caption alignment, small labels, generator, overhead equipment and engine insulation are not reconstructed in R03.','The two lateral camera stations test physical visibility; the panorama provides only one physical photographic station.']}
(O/'summary.json').write_text(json.dumps(summary,indent=2)+'\n');(O/'inventory.json.gz').write_bytes(gzip.compress(json.dumps({**summary,'cells':cells},separators=(',',':')).encode(),mtime=0))
(O/'index.html').write_text('''<!doctype html><meta charset="utf-8"><title>R03 comparación privada</title><style>body{background:#14252c;color:white;font:16px system-ui}canvas{width:32%;image-rendering:pixelated}input{width:60%}</style><h1>VR / R02 / R03 · privado</h1><input id="n" type="range" min="0" max="MAX" value="0"><pre id="info"></pre><canvas></canvas><canvas></canvas><canvas></canvas><script>const cells=DATA,ims=['reference','baseline','candidate'].map(s=>{const i=new Image;i.src=s+'.png';i.onload=draw;return i}),n=document.querySelector('input');function draw(){const c=cells[+n.value];document.querySelector('pre').textContent=JSON.stringify(c,null,2);document.querySelectorAll('canvas').forEach((el,k)=>{el.width=el.height=512;const x=el.getContext('2d');x.imageSmoothingEnabled=false;if(ims[k].complete&&ims[k].naturalWidth)x.drawImage(ims[k],...c.rect,0,0,512,512);});}n.oninput=draw;</script>'''.replace('MAX',str(len(cells)-1)).replace('DATA',json.dumps(cells)))
print('PRIVATE R03 GRID',summary['totalCells'],summary['cells4'],'detail cells; blocked',summary['beforeBlockedPixels'],'->',summary['afterBlockedPixels'])
