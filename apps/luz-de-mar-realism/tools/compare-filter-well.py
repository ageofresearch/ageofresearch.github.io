"""Private, native-resolution photo comparison. A measured cell is not accepted."""
import os,json,hashlib,csv,shutil
from pathlib import Path
from PIL import Image,ImageDraw,ImageFilter
import numpy as np
W=Path(os.environ.get('FILTER_WELL_WORK','/tmp/ldm-filter-well-r01'));D=Path('/workspace/artifacts/Foso_Filtros_R01');D.mkdir(parents=True,exist_ok=True)
photo=Path('/workspace/tidewater-rocha/results/luz-machinery/source/IMG-20261016-WA0004.jpg')
ref=Image.open(photo).convert('RGB');candidate=Image.open(W/'candidate-photo.png').convert('RGB');before=Image.open(W/'before-photo.png').convert('RGB')
assert ref.size==candidate.size==(1200,1600),'Capture the candidate at native photo resolution'
if before.size!=ref.size:before=before.resize(ref.size,Image.Resampling.LANCZOS)
regions=[('marco y travesano',(140,550,1100,1600)),('tapas y racores',(300,700,940,990)),('puente y válvula azul',(370,270,820,600)),('válvulas traseras',(350,570,830,745)),('mariposas delanteras',(335,990,875,1215)),('volantes y colector',(290,1040,935,1395)),('manguera enrollada y línea inferior',(450,1280,960,1510)),('caja y ramales finos',(305,200,885,760))]
# Review masks are defined on the photo, not on the model silhouette. They
# intentionally include missing parts and adjoining transitions.
mask=Image.new('1',ref.size);draw=ImageDraw.Draw(mask)
for _,box in regions:draw.rectangle(box,fill=1)
r=np.asarray(ref,dtype=float);c=np.asarray(candidate,dtype=float);re=np.asarray(ref.filter(ImageFilter.FIND_EDGES).convert('L'));ce=np.asarray(candidate.filter(ImageFilter.FIND_EDGES).convert('L'));rows=[]
for y in range(0,1600,8):
 for x in range(0,1200,8):
  if not np.asarray(mask.crop((x,y,x+8,y+8))).any():continue
  detail=any(x<b[2]and x+8>b[0]and y<b[3]and y+8>b[1]for n,b in regions if n!='marco y travesano')
  size=4 if detail else 8
  for yy in range(y,y+8,size):
   for xx in range(x,x+8,size):
    p=(slice(yy,yy+size),slice(xx,xx+size));rows.append({'id':f'PHOTO-r{yy//size:03d}-c{xx//size:03d}-{size}px','x':xx,'y':yy,'size':size,'meanAbsoluteRGB':round(float(abs(r[p]-c[p]).mean()),2),'referenceEdgePixels':int((re[p]>50).sum()),'candidateEdgePixels':int((ce[p]>50).sum()),'state':'compared; no automatic acceptance','components':'; '.join(n for n,b in regions if b[0]<=xx<b[2]and b[1]<=yy<b[3])})
with open(D/'celdas.csv','w')as f:w=csv.DictWriter(f,fieldnames=list(rows[0]));w.writeheader();w.writerows(rows)
shutil.copyfile(photo,D/'foto-privada.jpg')
for name,im in [('software-anterior',before),('candidato',candidate),('superposicion',Image.blend(ref,candidate,.5))]:
 im.save(D/(name+'.png'))
 if(D/(name+'.jpg')).exists():(D/(name+'.jpg')).unlink()
for i,(name,box)in enumerate(regions):
 a=ref.crop(box);b=candidate.crop(box);grid=Image.new('RGB',(a.width*2,a.height));grid.paste(a);grid.paste(b,(a.width,0));d=ImageDraw.Draw(grid)
 for offset in[0,a.width]:
  for x in range((-box[0])%4,a.width,4):d.line((offset+x,0,offset+x,a.height),fill=(180,55,20),width=1)
  for y in range((-box[1])%4,a.height,4):d.line((offset,y,offset+a.width,y),fill=(180,55,20),width=1)
 grid.save(D/f'detalle-{i+1}.png')
report={'scope':'Only the open filter well; other room surfaces are context','referenceSHA256':hashlib.sha256(photo.read_bytes()).hexdigest(),'nativeResolution':[1200,1600],'baseGrid':8,'detailGrid':4,'cells':len(rows),'camera':json.loads((W/'photo-camera.json').read_text()),'regions':regions,'limitations':['One physical photo station; hidden depth/routing inferred.','Camera fitted using nominal rim dimensions; fitting points are not independent validation.','Pixel/edge differences describe discrepancies and do not establish engineering dimensions.','No blanket fidelity approval for generated grid cells.','Surrounding engines, room wall and their pipe connections are outside this correction.']}
(D/'comparacion.json').write_text(json.dumps(report,indent=2));(W/'comparison.json').write_text(json.dumps(report,indent=2))
html='''<!doctype html><html lang="es"><meta charset="utf-8"><title>Foso de filtros · comparación privada</title><style>body{font:16px system-ui;background:#eee;margin:20px}section{display:flex;gap:12px}figure{margin:0;flex:1}img{max-width:100%}#frame{position:relative;width:1200px}canvas{position:absolute;inset:0;pointer-events:none}button,select{font:inherit;padding:8px}details{margin:20px 0}</style><h1>Foso de filtros R01 · referencia privada</h1><p>8 × 8 px nativos; 4 × 4 px en detalles. Misma cámara estimada para todo el candidato. Las celdas medidas no se consideran automáticamente aceptadas.</p><section><figure><figcaption>Foto original</figcaption><img src="foto-privada.jpg"></figure><figure><figcaption>Software anterior</figcaption><img src="software-anterior.png"></figure><figure><figcaption>Candidato</figcaption><img src="candidato.png"></figure></section><p><select id="view"><option value="superposicion">Superposición 50 %</option><option value="foto-privada">Foto</option><option value="candidato">Candidato</option></select> Cuadrícula <select id="cell"><option>8</option><option>4</option><option>0</option></select> <a href="celdas.csv">Inventario por celda</a></p><div id="frame"><img id="im" src="superposicion.png"><canvas width="1200" height="1600"></canvas></div>'''
for i,(name,box)in enumerate(regions):html+=f'<details><summary>{name} · cuadros de 4 px</summary><img src="detalle-{i+1}.png"></details>'
html+='''<script>const cell=document.querySelector('#cell'),im=document.querySelector('#im'),ctx=document.querySelector('canvas').getContext('2d');function grid(){ctx.clearRect(0,0,1200,1600);const s=+cell.value;if(!s)return;ctx.strokeStyle='rgba(220,70,30,.55)';ctx.lineWidth=.5;ctx.beginPath();for(let x=0;x<=1200;x+=s){ctx.moveTo(x,0);ctx.lineTo(x,1600)}for(let y=0;y<=1600;y+=s){ctx.moveTo(0,y);ctx.lineTo(1200,y)}ctx.stroke()}cell.onchange=grid;document.querySelector('#view').onchange=e=>im.src=e.target.value+(e.target.value==='foto-privada'?'.jpg':'.png');grid()</script>''';(D/'index.html').write_text(html);print('PRIVATE COMPARISON',D,len(rows))
