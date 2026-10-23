"""Private tile ledger and interactive reference/model comparator.

Inventory coverage is distinct from visual acceptance. A populated tile is never
marked matched merely because its candidate object exists or its contour fits.
"""
from pathlib import Path
import json,hashlib,shutil
import numpy as np
from PIL import Image,ImageDraw
from scipy.ndimage import binary_erosion,distance_transform_edt,sobel
R=Path(__file__).resolve().parents[1];W=R/'work/left-engine-r13';O=W/'review/tiles';O.mkdir(exist_ok=True)
spec=json.loads((R/'tools/left-tile-evidence.json').read_text());camera=json.loads((W/'review/cubes/camera.json').read_text());objects=camera['objects'];size=2048;tiles=[];edges=[];assets={}
for face in 'flrbud':
 source=R/f'work/reference/machinery/cubes/pano_{face}.jpg';photo=Image.open(source).convert('RGB');beauty_path=W/f'review/cubes/{face}-beauty.png';beauty_pixels=np.asarray(Image.open(beauty_path).convert('RGB'),dtype=float)/255 if beauty_path.exists() else None;reference_pixels=np.asarray(photo,dtype=float)/255;ids=Image.open(W/f'review/cubes/{face}-ids.png').convert('RGBA');a=np.array(ids);codes=(a[:,:,0].astype(np.uint32)<<16)+(a[:,:,1].astype(np.uint32)<<8)+a[:,:,2];visible=a[:,:,3]>128
 regions=[];union=np.zeros((size,size),bool);detail=np.zeros_like(union)
 for region in spec['regions'][face]:
  im=Image.new('1',(size,size));ImageDraw.Draw(im).polygon([tuple(p)for p in region['polygon']],fill=1);mask=np.array(im,bool);union|=mask
  if region.get('detail'):detail|=mask
  regions.append((region,mask))
 union|=visible
 if not union.any():continue
 # Curated reference region coverage + candidate coverage catches omissions and
 # protrusions. It does not label background holes as engine surfaces.
 grid=photo.copy();draw=ImageDraw.Draw(grid)
 for y in range(0,size,64):
  for x in range(0,size,64):
   if not union[y:y+64,x:x+64].any():continue
   step=32 if detail[y:y+64,x:x+64].any()else 64
   for yy in range(y,y+64,step):
    for xx in range(x,x+64,step):
     if not union[yy:yy+step,xx:xx+step].any():continue
     covered=[r for r,m in regions if m[yy:yy+step,xx:xx+step].any()];found=np.unique(codes[yy:yy+step,xx:xx+step][visible[yy:yy+step,xx:xx+step]]);parts=[objects[str(int(c))]for c in found if str(int(c))in objects]
     tid=f'{face}-r{yy//64:02}-c{xx//64:02}'+(f'-s{(yy%64)//32}{(xx%64)//32}'if step==32 else'')
     row={'id':tid,'face':face,'rect':[xx,yy,step,step],'parent64':[y//64,x//64],'observations':[r['name']for r in covered],'materials':sorted(set(r['material']for r in covered)),'candidateComponents':[p['id']for p in parts],'assemblies':sorted(set(p['assembly']for p in parts)),'confidence':'high'if any(r['confidence']=='high'for r in covered)else'medium'if covered else'candidate-only','geometryStatus':'needs-comparison','materialStatus':'needs-comparison','accepted':False,'depthStatus':'inferred','pending':['Confirm interior divisions and component count against reference','Check adjacent-cell surface and connection continuity','Approve material response and occlusion manually'],'reviewNote':'Inventory complete; visible presence alone is not a similarity pass.'}
     if beauty_pixels is not None:
      support=visible[yy:yy+step,xx:xx+step];ref=reference_pixels[yy:yy+step,xx:xx+step];render=beauty_pixels[yy:yy+step,xx:xx+step]
      if support.any():
       luminance=np.array([.2126,.7152,.0722]);row['appearanceDiagnostics']={'supportedPixels':int(support.sum()),'meanAbsoluteSRGBDifference':float(np.abs(ref-render)[support].mean()),'referenceMedianLuminance':float(np.median((ref@luminance)[support])),'candidateMedianLuminance':float(np.median((render@luminance)[support])),'interpretation':'Image appearance diagnostic only: VR exposure/white balance and hidden geometry are not calibrated. Candidate support may include reference background gaps.'}
      row['geometryStatus']='visible object IDs inventoried; geometric approval pending';row['materialStatus']='appearance-assessed; approval pending';row['automaticallyAssessed']=True;row['manualVisualApproval']=False
      row['reviewNote']='Matched-resolution appearance and object-ID support assessed; these diagnostics do not establish geometric or material acceptance.'
     tiles.append(row);draw.rectangle((xx,yy,xx+step-1,yy+step-1),outline='#e96767');draw.text((xx+2,yy+2),f'{yy//64}:{xx//64}',fill='#ffbc6b',stroke_width=1,stroke_fill='#222')
 beauty=W/f'review/cubes/{face}-beauty.png'
 if beauty.exists():shutil.copyfile(beauty,O/f'{face}-beauty.png')
 # Analytical edge guides only. Reference edges include texture/highlights and
 # are never used as a numeric geometric acceptance mask.
 grey=reference_pixels@np.array([.2126,.7152,.0722]);gradient=np.hypot(sobel(grey,axis=0),sobel(grey,axis=1));reference_edge=gradient>.20
 model_edge=visible&((codes!=np.roll(codes,1,0))|(codes!=np.roll(codes,1,1)))
 for name,mask,color in [('reference-edges',reference_edge,[255,200,70]),('model-edges',model_edge,[0,235,255])]:
  pixels=np.zeros((size,size,4),dtype=np.uint8);pixels[mask,:3]=color;pixels[mask,3]=255;Image.fromarray(pixels).save(O/f'{face}-{name}.png')
 grid.save(O/f'{face}-grid.jpg',quality=95);photo.save(O/f'{face}-reference.jpg',quality=98);ids.save(O/f'{face}-ids.png');assets[face]={'referenceSHA256':hashlib.sha256(source.read_bytes()).hexdigest()}
 for edge in spec['heldOutEdges']:
  if edge['face']!=face:continue
  code=next((int(k)for k,v in objects.items()if v['name']==edge['object']),None)
  if code is None:continue
  values=[code]
  if edge['name']=='exhaust top visible edge':values=[int(k)for k,v in objects.items()if v['name'].removeprefix('LVR | ')in ['black main swept exhaust','exhaust sewn end panel','main exhaust textile band'] or v['name'].startswith('LVR | main band')]
  mask=np.isin(codes,values)&visible;outline=mask&~binary_erosion(mask,border_value=1);distance=distance_transform_edt(~outline);errors=[float(distance[y,x])for x,y in edge['points']];edges.append({**edge,'errorsPixels':errors,'p95Pixels':float(np.percentile(errors,95)),'maxPixels':max(errors),'passed':bool(np.percentile(errors,95)<=6),'measurement':'Visible rendered object boundary; occluded annotations remain reported, not silently discarded.'})
ledger={'version':'left-vr-grid-r13','camera':spec['cameraSource'],'cubeSize':size,'referenceAssets':assets,'tileCount':len(tiles),'automaticallyAssessedCount':sum(bool(t.get('automaticallyAssessed'))for t in tiles),'parent64Count':len(set((t['face'],*t['parent64'])for t in tiles)),'tiles':tiles,'heldOutEdges':edges,'acceptance':spec['acceptance'],'accepted':False,'status':'Candidate under comparison; no automatic promotion','limits':spec['limits']}
(O/'inventory.json').write_text(json.dumps(ledger,ensure_ascii=False,indent=2)+'\n')
page='''<!doctype html><html lang="es"><meta charset="utf-8"><title>Motor izquierdo · cuadros R13 · privado</title><style>body{background:#172026;color:#e4e8eb;font:15px system-ui;margin:18px}button,select,input{font:inherit;margin:4px;padding:6px}main{display:grid;grid-template-columns:1fr 1fr;gap:12px}canvas{width:100%;background:#000}pre{white-space:pre-wrap}small{color:#f2bd70}</style><h1>Motor izquierdo · revisión por cuadros</h1><p>Referencia privada. Una celda inventariada no significa una celda aprobada. Cámara y resolución coincidentes.</p><select id="face"></select><button id="prev" aria-label="Cuadro anterior">←</button><select id="tile"></select><button id="next" aria-label="Cuadro siguiente">→</button><select id="kind"><option value="ids">Geometría</option><option value="beauty">Acabados · Cycles</option></select><label>Superposición <input id="mix" type="range" min="0" max="1" step=".05" value=".5"></label><label><input id="edges" type="checkbox">Guías de bordes (no métrica)</label><label><input id="whole" type="checkbox">Cara completa</label><main><section>VR original<canvas id="vr"></canvas></section><section>Geometría: IDs / superposición<canvas id="model"></canvas></section></main><pre id="info"></pre><script>
const data=LEDGER,images={},f=document.querySelector('#face'),t=document.querySelector('#tile');
for(const face of Object.keys(data.referenceAssets)){f.add(new Option(face.toUpperCase(),face));for(const kind of ['reference','ids','beauty','reference-edges','model-edges']){const im=new Image;im.src=face+'-'+kind+(kind==='reference'?'.jpg':'.png');images[face+kind]=im;im.onload=draw;}}
function options(){t.innerHTML='';for(const row of data.tiles.filter(x=>x.face===f.value))t.add(new Option(row.id,row.id));draw();}
function draw(){const row=data.tiles.find(x=>x.id===t.value);if(!row)return;const rect=document.querySelector('#whole').checked?[0,0,2048,2048]:row.rect;for(const [id,kind]of [['vr','reference'],['model',document.querySelector('#kind').value]]){const c=document.getElementById(id),ctx=c.getContext('2d');c.width=c.height=document.querySelector('#whole').checked?2048:512;ctx.imageSmoothingEnabled=false;const photo=images[f.value+'reference'],model=images[f.value+kind];if(!photo?.complete||!model?.complete)continue;ctx.drawImage(photo,...rect,0,0,c.width,c.height);if(id==='model'){ctx.globalAlpha=+document.querySelector('#mix').value;ctx.drawImage(model,...rect,0,0,c.width,c.height);ctx.globalAlpha=1;}if(document.querySelector('#edges').checked){const guide=images[f.value+(id==='vr'?'reference-edges':'model-edges')];if(guide?.complete)ctx.drawImage(guide,...rect,0,0,c.width,c.height);}}document.querySelector('#info').textContent=JSON.stringify(row,null,2);}
document.querySelector('#prev').onclick=()=>{t.selectedIndex=Math.max(0,t.selectedIndex-1);draw();};document.querySelector('#next').onclick=()=>{t.selectedIndex=Math.min(t.options.length-1,t.selectedIndex+1);draw();};f.onchange=options;t.onchange=draw;document.querySelector('#kind').onchange=draw;document.querySelector('#mix').oninput=draw;document.querySelector('#whole').onchange=draw;document.querySelector('#edges').onchange=draw;options();</script></html>'''
(O/'index.html').write_text(page.replace('LEDGER',json.dumps(ledger,ensure_ascii=False).replace('</','<\\/')))
print(json.dumps({'tiles':len(tiles),'parents64':ledger['parent64Count'],'edgeP95':[(e['name'],e['p95Pixels'])for e in edges],'accepted':False}))
