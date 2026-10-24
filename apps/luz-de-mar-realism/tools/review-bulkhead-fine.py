"""Every native 16/8px cell, private reference/geometry/finish comparisons.

Coverage and numeric diagnostics never grant visual acceptance automatically.
"""
from pathlib import Path
import json,hashlib
import numpy as np
from PIL import Image,ImageDraw
from scipy.ndimage import sobel,distance_transform_edt,gaussian_filter
R=Path(__file__).resolve().parents[1];W=R/'work/bulkhead-vr-r01';O=W/'review/fine';O.mkdir(parents=True,exist_ok=True)
spec=json.loads((R/'tools/bulkhead-fine-observations.json').read_text());source=R/'work/reference/machinery/cubes/pano_f.jpg';photo=Image.open(source).convert('RGB');reference=np.asarray(photo,dtype=float)/255
ids=np.load(W/'review/ids-f.npz')['ids'];names=json.loads((W/'review/ids-f-components.json').read_text());visible=ids>0
union=np.zeros((2048,2048),bool);detail=np.zeros_like(union)
for x0,y0,x1,y1 in spec['sourceRegions']:union[y0:y1,x0:x1]=True
for f in spec['features']:
 x0,y0,x1,y1=f['rect']
 if f['detail']:detail[y0:y1,x0:x1]=True
union|=visible
beauty_path=W/'review/beauty-native/f.png';clay_path=W/'review/clay-native/f.png';browser_path=W/'review/candidate/native-f.png';candidate_path=browser_path if browser_path.exists()else beauty_path if beauty_path.exists() else clay_path
candidate=np.asarray(Image.open(candidate_path).convert('RGB'),dtype=float)/255 if candidate_path.exists()else None
if candidate is not None and float(candidate.std())<.001:raise RuntimeError('Empty capture; do not compare a cleared drawing buffer')
tiles=[]
for y in range(0,2048,16):
 for x in range(0,2048,16):
  if not union[y:y+16,x:x+16].any():continue
  step=8 if detail[y:y+16,x:x+16].any()else 16
  for yy in range(y,y+16,step):
   for xx in range(x,x+16,step):
    if not union[yy:yy+step,xx:xx+step].any():continue
    features=[f for f in spec['features']if f['rect'][0]<xx+step and f['rect'][2]>xx and f['rect'][1]<yy+step and f['rect'][3]>yy]
    found=np.unique(ids[yy:yy+step,xx:xx+step]);components=[names[str(int(i))]for i in found if i and str(int(i))in names]
    row={'id':f'f-r{yy:04}-c{xx:04}-s{step}','rect':[xx,yy,step,step],'features':[f['id']for f in features],'referenceObservations':[f['observed']for f in features],'materials':sorted(set(f['material']for f in features)),'candidateComponents':components,'geometryStatus':'inventoried; internal details, connections and occlusion require review','materialStatus':'neutral geometry; not an appearance acceptance'if not beauty_path.exists()else'appearance comparison pending','reviewed':False,'accepted':False,'depth':'inferred','automaticAcceptance':False}
    if candidate is not None:
     a=reference[yy:yy+step,xx:xx+step];b=candidate[yy:yy+step,xx:xx+step];lum=np.array([.2126,.7152,.0722]);ae=np.hypot(sobel(a@lum,axis=0),sobel(a@lum,axis=1));be=np.hypot(sobel(b@lum,axis=0),sobel(b@lum,axis=1));row['diagnostics']={'meanSRGBDifference':float(np.abs(a-b).mean()),'referenceEdgeDensity':float((ae>.2).mean()),'candidateEdgeDensity':float((be>.2).mean()),'visibleCandidatePixels':int(visible[yy:yy+step,xx:xx+step].sum()),'interpretation':'Edge guides include shadows and highlights. Neutral materials do not permit color acceptance.'if not beauty_path.exists()else'Image guides only; photograph exposure and white balance are not calibrated.'}
    tiles.append(row)
grid=photo.copy();d=ImageDraw.Draw(grid)
for t in tiles:
 x,y,w,h=t['rect'];d.rectangle((x,y,x+w-1,y+h-1),outline='#c78a62'if w==16 else'#4b9d9d')
grid.crop((0,768,2048,1456)).save(O/'native-grid.png');photo.save(O/'reference.jpg',quality=100,subsampling=0)
if candidate_path.exists():Image.open(candidate_path).save(O/'candidate.png')
palette=np.zeros((2048,2048,3),dtype=np.uint8);palette[:,:,0]=(ids*53)%251;palette[:,:,1]=(ids*97)%251;palette[:,:,2]=(ids*137)%251;Image.fromarray(palette).save(O/'ids.png')
grey=reference@np.array([.2126,.7152,.0722]);edge=np.hypot(sobel(grey,axis=0),sobel(grey,axis=1))>.2;model=visible&((ids!=np.roll(ids,1,0))|(ids!=np.roll(ids,1,1)))
soft=gaussian_filter(grey,.7);reference_guides=np.hypot(sobel(soft,axis=0),sobel(soft,axis=1))>.12;to_reference=distance_transform_edt(~reference_guides);to_model=distance_transform_edt(~model);feature_edges=[]
for feature in spec['features']:
 x0,y0,x1,y1=feature['rect'];a=to_model[y0:y1,x0:x1][reference_guides[y0:y1,x0:x1]];b=to_reference[y0:y1,x0:x1][model[y0:y1,x0:x1]]
 feature_edges.append({'id':feature['id'],'referenceGuidePixels':len(a),'modelGuidePixels':len(b),'referenceToModelWithin6Pixels':float((a<=6).mean())if len(a)else None,'modelToReferenceWithin6Pixels':float((b<=6).mean())if len(b)else None,'referenceToModelP95Pixels':float(np.quantile(a,.95))if len(a)else None,'modelToReferenceP95Pixels':float(np.quantile(b,.95))if len(b)else None,'accepted':False})
(O/'edges-by-feature.json').write_text(json.dumps({'nativeSize':2048,'method':'Bidirectional distance from photographic luminance edge guides (Gaussian sigma .7 / Sobel threshold .12) to actual model component-ID boundaries. Unclassified guides include material/shadow/text edges and retained context; these are diagnostics, not certified clear-edge acceptance.','features':feature_edges,'certified95PercentClearEdges':False},indent=2)+'\n')
for name,mask,color in [('reference-edges',edge,[255,190,30]),('model-edges',model,[0,230,255])]:
 pixels=np.zeros((2048,2048,4),dtype=np.uint8);pixels[mask,:3]=color;pixels[mask,3]=255;Image.fromarray(pixels).save(O/(name+'.png'))
for feature in spec['features']:
 rect=feature['rect'];photo.crop(rect).resize(((rect[2]-rect[0])*3,(rect[3]-rect[1])*3),Image.Resampling.NEAREST).save(O/(feature['id']+'-reference.png'))
 if candidate_path.exists():Image.open(candidate_path).crop(rect).resize(((rect[2]-rect[0])*3,(rect[3]-rect[1])*3),Image.Resampling.NEAREST).save(O/(feature['id']+'-candidate.png'))
ledger={'version':spec['version'],'camera':[9.15,0,3.18],'sourceResolution':[2048,2048],'sourceSHA256':hashlib.sha256(source.read_bytes()).hexdigest(),'candidateStage':'webgl-native'if browser_path.exists()else'beauty-native'if beauty_path.exists()else'clay-native','tileCount':len(tiles),'tiles16':sum(t['rect'][2]==16 for t in tiles),'tiles8':sum(t['rect'][2]==8 for t in tiles),'features':spec['features'],'tiles':tiles,'accepted':False,'policy':spec['policy'],'limits':['One panorama station; no additional depth obtained by smaller crops.','Every covered cell is inventoried and compared when its matching native render exists. Manual review and acceptance remain separate.','Region masks conservatively include background gaps; appearance differences are diagnostics, not geometric similarity scores.']}
(O/'inventory.json').write_text(json.dumps(ledger,ensure_ascii=False,indent=2)+'\n')
page='''<!doctype html><html lang="es"><meta charset="utf-8"><title>Mamparo · comparación privada 16/8 px</title><style>body{font:15px system-ui;background:#15212a;color:#edf3f6;margin:20px}button,input,select{font:inherit;padding:6px;margin:4px}main{display:grid;grid-template-columns:1fr 1fr;gap:15px}canvas{width:100%;image-rendering:pixelated;background:black}pre{white-space:pre-wrap}.tools{position:sticky;top:0;background:#15212a;padding:8px}a{color:#8ddaff}</style><h1>Mamparo · comparación privada 16/8 píxeles</h1><p>Original VR 2048² / render de igual cámara y resolución. Una celda inventariada no es una celda aprobada.</p><div class="tools"><select id="feature"><option value="">Todas las zonas</option></select><button id="prev">←</button><select id="tile"></select><button id="next">→</button><select id="mode"><option value="candidate">Render</option><option value="ids">Piezas identificadas</option></select><label>Superposición<input id="mix" type="range" min="0" max="1" step=".05" value="1"></label><label><input id="edges" type="checkbox">Bordes</label><label><input id="whole" type="checkbox">Conjunto completo</label></div><main><section>VR original<canvas id="reference"></canvas></section><section>Candidato<canvas id="candidate"></canvas></section></main><pre id="info"></pre><script>
const ledger=LEDGER,images={},feature=document.querySelector('#feature'),tile=document.querySelector('#tile');
for(const f of ledger.features)feature.add(new Option(f.id,f.id));for(const name of ['reference','candidate','ids','reference-edges','model-edges']){const i=new Image;i.src=name+(name==='reference'?'.jpg':'.png');images[name]=i;i.onload=draw;}
function select(){tile.innerHTML='';for(const t of ledger.tiles.filter(t=>!feature.value||t.features.includes(feature.value)))tile.add(new Option(t.id,t.id));draw();}
function draw(){const t=ledger.tiles.find(t=>t.id===tile.value);if(!t)return;const rect=document.querySelector('#whole').checked?[0,768,2048,688]:t.rect;for(const id of ['reference','candidate']){const c=document.getElementById(id);c.width=rect[2]>32?2048:512;c.height=c.width*rect[3]/rect[2];const ctx=c.getContext('2d');ctx.imageSmoothingEnabled=false;ctx.clearRect(0,0,c.width,c.height);if(!images.reference.complete)continue;ctx.drawImage(images.reference,...rect,0,0,c.width,c.height);if(id==='candidate'){const im=images[document.querySelector('#mode').value];if(im.complete){ctx.globalAlpha=+document.querySelector('#mix').value;ctx.drawImage(im,...rect,0,0,c.width,c.height);ctx.globalAlpha=1;}}if(document.querySelector('#edges').checked){const im=images[id==='reference'?'reference-edges':'model-edges'];if(im.complete)ctx.drawImage(im,...rect,0,0,c.width,c.height);}}document.querySelector('#info').textContent=JSON.stringify(t,null,2);}
feature.onchange=select;tile.onchange=draw;document.querySelector('#prev').onclick=()=>{tile.selectedIndex=Math.max(0,tile.selectedIndex-1);draw();};document.querySelector('#next').onclick=()=>{tile.selectedIndex=Math.min(tile.options.length-1,tile.selectedIndex+1);draw();};for(const id of ['mode','mix','edges','whole'])document.querySelector('#'+id).oninput=draw;select();</script></html>'''
(O/'index.html').write_text(page.replace('LEDGER',json.dumps(ledger,ensure_ascii=False).replace('</','<\\/')))
print(json.dumps({'tiles':len(tiles),'16px':ledger['tiles16'],'8px':ledger['tiles8'],'nativeCandidateExists':candidate is not None,'accepted':False}))
