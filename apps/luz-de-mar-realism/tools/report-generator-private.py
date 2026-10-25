"""Private native-grid report. Never copy these photographs into Pages/Releases."""
import os,json,gzip,hashlib,math,shutil,zipfile
from pathlib import Path
import numpy as np
from PIL import Image,ImageDraw,ImageFont
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import landscape,A4
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.utils import ImageReader
R=Path(__file__).resolve().parents[1];W=Path(os.environ['ELECTRICAL_AUTHORING_WORK']);B=R/'work/generator-vr-audit-r01';O=Path(os.environ.get('GENERATOR_PRIVATE_OUTPUT','/workspace/artifacts/KOHLER_Correccion_VR_R01_Grid_8y4px'));O.mkdir(parents=True,exist_ok=True);(O/'patches').mkdir(exist_ok=True)
E=json.loads((W/'evidence-frozen.json').read_text());capture=json.loads((W/'review/candidate/report.json').read_text());assert capture['pass']and len(capture['views'])==15
sources=json.loads((W/'source-verification.json').read_text())['sources']
for item in sources:assert hashlib.sha256((R/'work/reference/machinery/cubes'/item['face']).read_bytes()).hexdigest()==item['sha256'],'Frozen original changed'
observations=json.loads((W/'region-observations.json').read_text()) if (W/'region-observations.json').exists() else {}
data={};cells=[];coverage={};counts={4:0,8:0};measurements={};reviews=[]
notes={
'G01':'Carcasa redondeada con puertas independientes; extremo derecho oculto y profundidad estimados.',
'G02':'Marco, bisagra superior y cuatro fijaciones independientes.',
'G03':'Parada roja con collar y campo de franjas amarillo/negro.',
'G04':'LCD, tres teclas rectangulares de color y selector derecho; impresión diminuta incompleta.',
'G05':'Junta horizontal y dos cierres con reborde, lengüeta y llave.',
'G06':'Cierre grande libre de las orejeras y placa de advertencia; texto ilegible no inventado.',
'G07':'Marca KOHLER y junta vertical reproducidas con geometría propia.',
'G08':'Labio inferior conectado a seis apoyos y dos largueros; diseño posterior inferido.',
'A01':'Caja rígida inclinada; tres lentes sobre un plano común y selector.',
'A02':'Cinco cables continuos y fijaciones; rutas ocultas inferidas.',
'P01':'Codo, manguera continua y abrazaderas; conexión final termina dentro de la carcasa.',
'P02':'Tramo blanco hasta el piso, collar y apoyo; conexión oculta inferida.',
'I01':'Caja, dos mandos, cuatro fijaciones, rótulos legibles y rejilla lateral.',
'I02':'Dos copas a la izquierda, banda, inserto, pivotes y sujeción; su detalle fino sigue siendo aproximado.',
'I03':'Seis entradas y bucles separados con continuidad; longitud y profundidad ocultas inferidas.',
'I04':'Soporte abierto con bordes plegados; profundidad estimada.',
'B01':'Cuadro posterior con puerta, piloto y seccionador; no se atribuye capacidad o circuito.',
'B02':'Prensaestopas y cables negro/naranja; trazado oculto inferido.',
'B03':'Dos tubos y cuatro fijaciones con tornillos.',
'B04':'Haces del fondo con curvas y ataduras; número oculto no acreditado.',
'V01':'Envolvente, panel naranja, seis fijaciones del marco, mando y cables.',
'V02':'Riser circular, bridas y pernos; cantidad posterior estimada.',
'V03':'Boca abierta, veinticuatro anillos y travesaños; material y perfil fino aproximados.',
'V04':'Cables llegan a sus entradas y se conserva la curva de cobre posterior.',
'C01':'Cierre local, juntas y dos luminarias; techo completo fuera de esta etapa.',
'C02':'Cierre blanco, conjunto superior, soportes, entradas y flecha observada; función interna sin identificar.',
'F01':'Chapa y juntas anteriores conservadas; cambió su iluminación. El suelo completo queda fuera de esta etapa.',
'F02':'Rejillas anteriores conservadas; apoyos ajustados en el conjunto KOHLER.',
'S01':'Columna y diez mandos conservados; visibilidad comprobada mediante máscaras y rayos.'}
font=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',15)
for face,roi in E['regions'].items():
 for stage,source in [('vr',R/f'work/reference/machinery/cubes/pano_{face}.jpg'),('before',B/f'review/candidate/native-{face}.png'),('after',W/f'review/candidate/native-{face}.png')]:shutil.copyfile(source,O/(stage+'-'+face+('.jpg'if stage=='vr'else'.png')))
 images=[Image.open(O/(stage+'-'+face+('.jpg'if stage=='vr'else'.png'))).convert('RGB')for stage in ['vr','before','after']];arrays=[np.asarray(im,dtype=np.float32)/255 for im in images];data[face]=(images,arrays);detail=np.zeros((2048,2048),bool);covered=np.zeros_like(detail,dtype=np.uint8)
 for f in E['features']:
  if f['face']==face and f['detail']:x,y,xx,yy=f['rect'];detail[y:yy,x:xx]=True
 x0,y0,x1,y1=roi
 for y in range(y0,y1,8):
  for x in range(x0,x1,8):
   step=4 if detail[y:y+8,x:x+8].any()else 8
   for yy in range(y,y+8,step):
    for xx in range(x,x+8,step):
     covered[yy:yy+step,xx:xx+step]+=1;counts[step]+=1;p,b,a=[im[yy:yy+step,xx:xx+step]for im in arrays];features=[f['id']for f in E['features']if f['face']==face and f['rect'][0]<xx+step and f['rect'][2]>xx and f['rect'][1]<yy+step and f['rect'][3]>yy];cells.append({'id':f'{face}-y{yy:04}-x{xx:04}-s{step}','face':face,'rect':[xx,yy,step,step],'features':features,'beforeMeanSRGBDifference':round(float(abs(p-b).mean()),6),'afterMeanSRGBDifference':round(float(abs(p-a).mean()),6),'state':'measured','individuallyReviewed':False,'accepted':False})
 assert covered.max()==1 and covered[y0:y1,x0:x1].min()==1;coverage[face]={'region':roi,'pixels':int((covered>0).sum()),'complete':True,'overlaps':0}
for f in E['features']:
 images,arrays=data[f['face']];x,y,xx,yy=f['rect'];step=4 if f['detail']else 8;x=x//step*step;y=y//step*step;xx=math.ceil(xx/step)*step;yy=math.ceil(yy/step)*step;width,height=xx-x,yy-y;scale=min(12,max(1,int(600/max(width,height))));tw,th=width*scale,height*scale;sheet=Image.new('RGB',(tw*4,th+54),'#152c33');draw=ImageDraw.Draw(sheet);combined=images+[Image.blend(images[0],images[2],.5)]
 for k,(title,im)in enumerate(zip(['VR','R04 anterior','Candidato R01','VR/R01 al50%'],combined)):
  tile=im.crop((x,y,xx,yy)).resize((tw,th),Image.Resampling.NEAREST).convert('RGBA');layer=Image.new('RGBA',tile.size);ld=ImageDraw.Draw(layer)
  for u in range(x,xx+1,step):ld.line(((u-x)*scale,0,(u-x)*scale,th),fill=(43,190,207,95))
  for v in range(y,yy+1,step):ld.line((0,(v-y)*scale,tw,(v-y)*scale),fill=(43,190,207,95))
  sheet.paste(Image.alpha_composite(tile,layer).convert('RGB'),(k*tw,54));draw.text((k*tw+5,4),f['id']+' | '+title,font=font,fill='white');draw.text((k*tw+5,27),f'{f["face"].upper()} ({x},{y}) | {step}px nativos',font=font,fill='#9de0d7')
 sheet.save(O/'patches'/(f['id']+'.png'));p,b,a=[im[y:yy,x:xx]for im in arrays];measurements[f['id']]={'beforeMeanSRGBDifference':float(abs(p-b).mean()),'afterMeanSRGBDifference':float(abs(p-a).mean()),'interpretation':'Color diagnostic including lighting/material/reflections; not geometric fidelity.'};reviews.append({**f,'correction':notes[f['id']],'observation':observations.get(f['id'],''),'candidateRegionReviewed':False,'individualCellsAccepted':0,'strictVisualAcceptance':False})
summary={'version':'generator-vr-r01','camera':E['camera'],'nativeSize':2048,'grid':E['grid'],'totalCells':len(cells),'cells8':counts[8],'cells4':counts[4],'measuredCells':len(cells),'coverage':coverage,'regions':len(reviews),'automaticCellAcceptance':False,'individuallyAcceptedCells':0,'strictVisualAcceptance':False,'views':len(capture['views']),'nativeFaces':list(capture['native']),'runtimeGeometrySHA256':capture['runtimeGeometrySHA256'],'privacy':'VR originals remain private; published textures are authored.','diagnosticLimits':'SRGB differences include exposure, shadows and reflection. They are not a geometry score. Sixteen control centers are fitting landmarks, not independent holdouts.'}
(O/'summary.json').write_text(json.dumps(summary,ensure_ascii=False,indent=2)+'\n');(W/'grid-summary.json').write_text(json.dumps(summary,ensure_ascii=False,indent=2)+'\n');(W/'region-review.json').write_text(json.dumps(reviews,ensure_ascii=False,indent=2)+'\n');(O/'inventory.json.gz').write_bytes(gzip.compress(json.dumps({**summary,'cells':cells},separators=(',',':')).encode(),mtime=0))
html='''<!doctype html><html lang="es"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>KOHLER · comparación privada8/4</title><style>body{font:16px/1.5 system-ui;margin:22px;background:#10262d;color:#edf5ef}select,button{font:inherit;margin:5px;padding:5px}.controls{position:sticky;top:0;background:#10262df2;padding:10px}.row{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px}canvas{width:100%}a{color:#96dfd4}@media(max-width:900px){.row{grid-template-columns:1fr 1fr}}</style><h1>VR / R04 / KOHLER corregido</h1><p>Referencia privada. Una estación estimada fija[9.15,0,3.18], proyección nativa2048². El grid organiza la comparación; no aprueba celdas automáticamente.</p><div class="controls"><select id="region"></select><select id="grid"><option value="auto">8/4px</option><option value="4">4px</option><option value="8">8px</option><option value="0">Sin grid</option></select><select id="mode"><option value="region">Región</option><option value="cell">Celda y vecinos</option><option value="face">Cara completa</option></select><button id="left">←</button><button id="right">→</button><button id="up">↑</button><button id="down">↓</button></div><div class="row"><div>VR<canvas id="vr"></canvas></div><div>Software R04<canvas id="before"></canvas></div><div>Candidato R01<canvas id="after"></canvas></div><div>VR/R01 al50%<canvas id="overlay"></canvas></div></div><p id="coordinates"></p><p id="notes"></p><p><a href="summary.json">Cobertura y límites</a> · <a href="inventory.json.gz">Todas las celdas medidas</a></p><script>const features=FEATURES,$=id=>document.getElementById(id),images={};let cx=0,cy=0;for(const f of['l','b'])for(const stage of['vr','before','after']){const i=new Image;i.src=stage+'-'+f+(stage==='vr'?'.jpg':'.png');i.onload=draw;images[stage+f]=i;}for(const f of features)$('region').add(new Option(f.id+' · '+f.title,f.id));function reset(){const f=features.find(f=>f.id===$('region').value);cx=(f.rect[0]+f.rect[2])/2;cy=(f.rect[1]+f.rect[3])/2;draw();}function draw(){const f=features.find(f=>f.id===$('region').value);if(!f)return;const s=$('grid').value==='auto'?(f.detail?4:8):+$('grid').value,step=s||4;let r=[...f.rect];if($('mode').value==='face')r=[0,0,2048,2048];if($('mode').value==='cell')r=[Math.max(0,Math.floor(cx/step)*step-3*step),Math.max(0,Math.floor(cy/step)*step-3*step),Math.min(2048,Math.floor(cx/step)*step+4*step),Math.min(2048,Math.floor(cy/step)*step+4*step)];let[x,y,xx,yy]=r,w=xx-x,h=yy-y;for(const stage of['vr','before','after','overlay']){const c=$(stage);c.width=900;c.height=Math.round(900*h/w);const g=c.getContext('2d');g.imageSmoothingEnabled=false;const im=images[(stage==='overlay'?'vr':stage)+f.face];if(im?.naturalWidth)g.drawImage(im,x,y,w,h,0,0,c.width,c.height);if(stage==='overlay'&&images['after'+f.face]?.naturalWidth){g.globalAlpha=.5;g.drawImage(images['after'+f.face],x,y,w,h,0,0,c.width,c.height);g.globalAlpha=1;}if(s){g.strokeStyle='#49c5cb70';g.lineWidth=.6;g.beginPath();for(let u=Math.ceil(x/s)*s;u<=xx;u+=s){const a=(u-x)/w*c.width;g.moveTo(a,0);g.lineTo(a,c.height);}for(let v=Math.ceil(y/s)*s;v<=yy;v+=s){const a=(v-y)/h*c.height;g.moveTo(0,a);g.lineTo(c.width,a);}g.stroke();}c.onclick=e=>{const b=c.getBoundingClientRect();cx=x+(e.clientX-b.left)/b.width*w;cy=y+(e.clientY-b.top)/b.height*h;$('mode').value='cell';draw();};}$('coordinates').textContent='Cara '+f.face.toUpperCase()+' · ['+r.join(', ')+'] · '+step+'px nativos';$('notes').textContent=f.correction+' '+(f.observation||'')+' '+f.certainty;}for(const id of['mode','grid'])$(id).oninput=draw;$('region').onchange=reset;for(const[id,x,y]of[['left',-1,0],['right',1,0],['up',0,-1],['down',0,1]])$(id).onclick=()=>{const f=features.find(f=>f.id===$('region').value),s=$('grid').value==='auto'?(f.detail?4:8):+$('grid').value||4;cx=Math.max(0,Math.min(2047,cx+x*s));cy=Math.max(0,Math.min(2047,cy+y*s));draw();};reset();</script></html>'''
(O/'index.html').write_text(html.replace('FEATURES',json.dumps(reviews,ensure_ascii=False).replace('</','<\\/')))
pdfmetrics.registerFont(TTFont('VRGrid','/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'));pdfmetrics.registerFont(TTFont('VRGridBold','/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'));pdf=O.parent/'KOHLER_Correccion_VR_R01_Grid_8y4px.pdf';pw,ph=landscape(A4);doc=canvas.Canvas(str(pdf),pagesize=(pw,ph));doc.setTitle('KOHLER · VR/R04/R01 · Comparación privada8/4px')
def textblock(text,x,y,width,size=10):
 doc.setFont('VRGrid',size);line=''
 for word in text.split():
  q=(line+' '+word).strip()
  if pdfmetrics.stringWidth(q,'VRGrid',size)>width:doc.drawString(x,y,line);y-=size*1.4;line=word
  else:line=q
 doc.drawString(x,y,line);return y-size*1.4
doc.setFont('VRGridBold',20);doc.drawString(30,ph-45,'KOHLER y equipos locales · corrección R01');y=textblock('Comparación privada VR / software R04 / candidato. Cámara estimada fija[9.15,0,3.18]. Cuadros nativos de8×8 y4×4 píxeles, antes de ampliar las imágenes.',30,ph-80,pw-60,12);y=textblock(f'{len(cells):,} celdas medidas,29 regiones y15 encuadres. Ninguna celda se acepta automáticamente. Los puntos del controlador son controles de ajuste, no una prueba independiente de toda la forma. Las partes ocultas siguen inferidas.',30,y-20,pw-60,12);y=textblock('Las diferencias RGB también reflejan iluminación, exposición y reflejos: no representan un porcentaje de exactitud geométrica. Los motores y el suelo sirven de contexto; la fidelidad fotográfica completa no se declara alcanzada.',30,y-20,pw-60,12);doc.showPage()
for f in reviews:
 doc.setFont('VRGridBold',14);doc.drawString(25,ph-30,f['id']+' · '+f['title']);im=Image.open(O/'patches'/(f['id']+'.png'));scale=min((pw-50)/im.width,(ph-175)/im.height);width,height=im.width*scale,im.height*scale;doc.drawImage(ImageReader(im),25,ph-50-height,width,height);y=textblock(f['observation'] or f['correction'],25,100,pw-50,10);textblock(f['certainty']+' Las profundidades ocultas no se han medido a bordo.',25,y-5,pw-50,9);doc.setFont('VRGrid',8);doc.drawString(25,18,'VR privada · grid original8/4px · candidata revisable, sin aceptación automática');doc.showPage()
doc.save();print('PRIVATE GENERATOR REPORT',pdf,len(cells),'cells',len(reviews),'regions',flush=True)
