"""Private native-pixel diagnostics. Grids and image edges do NOT certify cells."""
from pathlib import Path
from PIL import Image,ImageDraw
import json,math,numpy as np
from scipy.ndimage import sobel,binary_erosion,distance_transform_edt
R=Path(__file__).resolve().parents[1];W=R/'work/boarding-vr-r01';O=W/'comparison';O.mkdir(exist_ok=True);frozen=json.load(open(W/'evidence-frozen.json'));captures=json.load(open(W/'candidate/captures.json'));C=R/'work/reference/exteriors/cubes'
# Source XYZ camera directions, with one common station for every Beach Club view.
basis={'f':([0,-1,0],[-1,0,0],[0,0,1]),'b':([0,1,0],[1,0,0],[0,0,1]),'l':([1,0,0],[0,-1,0],[0,0,1]),'r':([-1,0,0],[0,1,0],[0,0,1]),'u':([0,0,1],[-1,0,0],[0,1,0]),'d':([0,0,-1],[-1,0,0],[0,-1,0])}
cache={}
def panorama(q):
 w,h=q['width'],q['height'];direction=np.array(q['target'])-q['position'];direction*=np.array([35.23/36,7.47/7.6,1]);direction/=np.linalg.norm(direction);right=np.cross(direction,[0,0,1]);right/=np.linalg.norm(right);up=np.cross(right,direction)
 x,y=np.meshgrid((np.arange(w)+.5-w/2)/(w/2),(h/2-np.arange(h)-.5)/(h/2));rays=direction+x[:,:,None]*right*math.tan(math.radians(q['hfov']/2))+y[:,:,None]*up*math.tan(math.radians(q['vfov']/2));out=np.zeros((h,w,3),dtype=np.uint8);dominant=np.argmax(np.abs(rays),axis=-1)
 for face,(f,r,u)in basis.items():
  f,r,u=np.array(f),np.array(r),np.array(u);axis=np.argmax(np.abs(f));den=rays@f;mask=(dominant==axis)&(den>0);key=q['station']+'-'+face
  if key not in cache:cache[key]=np.asarray(Image.open(C/(key+'.jpg')).convert('RGB'))
  a=np.clip(((rays@r/np.maximum(den,1e-10)+1)*1024).astype(int),0,2047);b=np.clip(((1-rays@u/np.maximum(den,1e-10))*1024).astype(int),0,2047);out[mask]=cache[key][b[mask],a[mask]]
 return Image.fromarray(out)
for q in captures['poses']:
 ref=Image.open(C/('Beach_Club-'+q['id'][-1]+'.jpg')).convert('RGB')if q['id'].startswith('native-')else panorama(q);candidate=Image.open(W/'candidate'/(q['id']+'.png')).convert('RGB');baseline=Image.open(W/'baseline'/(q['id']+'.png')).convert('RGB');ref.save(O/(q['id']+'-vr.jpg'),quality=96);Image.blend(ref,candidate,.5).save(O/(q['id']+'-overlay.png'))
 panel=Image.new('RGB',(q['width']*3,q['height']+28),(20,25,25));d=ImageDraw.Draw(panel)
 for i,(label,im)in enumerate([('VR — private reference',ref),('Previous published viewer',baseline),('Candidate — NOT ACCEPTED',candidate)]):panel.paste(im,(q['width']*i,28));d.text((q['width']*i+8,8),label,fill='white')
 panel.save(O/(q['id']+'-comparison.jpg'),quality=92)
 if q['id'].startswith('native-'):
  for grid in[8,4]:
   gridimage=Image.blend(ref,candidate,.5).convert('RGBA');layer=Image.new('RGBA',gridimage.size);draw=ImageDraw.Draw(layer)
   for n in range(0,2048,grid):draw.line([(n,0),(n,2047)],fill=(60,255,170,80));draw.line([(0,n),(2047,n)],fill=(60,255,170,80))
   Image.alpha_composite(gridimage,layer).convert('RGB').save(O/(q['id']+'-grid-'+str(grid)+'.png'))
# Edge distances are diagnostic only; photograph texture edges aren't manually
# established component contours. They cannot grant a 95% acceptance claim.
def edges(im):
 a=np.asarray(im.convert('L'),dtype=np.float32)/255;g=np.hypot(sobel(a,0),sobel(a,1));return g>.17
report=[]
for region in frozen['regions']:
 if region['face']not in['b','l']or region['station']!='Beach_Club':continue
 ref=Image.open(C/(region['station']+'-'+region['face']+'.jpg'));candidate=Image.open(W/'candidate'/('native-'+region['face']+'.png'));mask=Image.new('L',(2048,2048));d=ImageDraw.Draw(mask)
 for polygon in region['polygons']:d.polygon([tuple(p)for p in polygon],fill=255)
 m=binary_erosion(np.asarray(mask)>0,iterations=2);a=edges(ref)&m;b=edges(candidate)&m;da=distance_transform_edt(~a);db=distance_transform_edt(~b)
 report.append({'component':region['id'],'referenceEdgePixels':int(a.sum()),'candidateEdgePixels':int(b.sum()),'referenceToCandidateWithin6px':float((db[a]<=6).mean())if a.any()else None,'candidateToReferenceWithin6px':float((da[b]<=6).mean())if b.any()else None,'status':'diagnostic only; requires curated contours and camera registration; not accepted'})
points={'tip-upper':[-.3,3.02,3.952],'tip-lower':[-.3,3.02,3.872],'deck-splice':[.97,3.02,3.952],'post1-foot':[-.20,3.0,3.95],'post2-foot':[.315,3.0,3.95],'rail-left':[-.455,3.80,4.93]}
ambiguous={'post1-knee':'Frozen marker falls along a bend rather than an identified corner; correspondence must be re-annotated separately from held-out controls.','far-post-foot':'Far stanchion root is hidden by the near deck blade; the visible endpoint is an occlusion boundary, not a physical foot.','rail-right':'Frozen point is along a continuous rail; no unique 3D feature has been established.'}
checks=[]
for control in frozen['heldOut']:
 v={**control,'status':'unmeasured / registration pending'}
 if control['id']in ambiguous:v.update(status='ambiguous correspondence; excluded from point acceptance',reason=ambiguous[control['id']])
 if control['id']in points:
  delta=(np.array(points[control['id']])-np.array([.30,2.22,3.60]))*np.array([35.23/36,7.47/7.6,1]);pixel=[1024+1024*delta[0]/delta[1],1024-1024*delta[2]/delta[1]];v.update(candidatePixel=pixel,errorPixels=float(np.linalg.norm(np.array(pixel)-control['pixel'])),status='measured diagnostic; unaccepted')
 if control['id']in['tip-upper','deck-splice','post1-foot','post2-foot','rail-left','rail-right']:v.update(independence='Feature informed approximate camera/scale or geometry adjustment; excluded from independent acceptance',usedForAdjustment=True)
 checks.append(v)
result={'revision':'boarding-vr-r01','accepted':False,'grid':{'nativeSize':2048,'basePixels':8,'detailPixels':4,'acceptedCells':0},'station':{'Beach_Club':[.30,2.22,3.60],'state':'approximate registration; supersedes initial provisional station without altering frozen source evidence'},'views':len(captures['poses']),'diagnosticEdges':report,'controls':checks,'remaining':['Complete independent camera registration against rigid shared features.','Align stair, landing and mount to all four panoramas.','Curate component contours and finish manual 8/4-pixel cell review.','Do not promote candidate until independent points and bidirectional edges meet thresholds.']}
(O/'assessment.json').write_text(json.dumps(result,indent=2)+'\n')
html='''<!doctype html><meta charset="utf-8"><title>Boarding R01 · private native grid</title><style>body{background:#18201e;color:#fff;font:16px system-ui;margin:20px}canvas{max-width:100%;image-rendering:pixelated}button,select{font:inherit;margin:8px}pre{white-space:pre-wrap}</style><h1>Comparación privada · candidata sin aceptar</h1><p>Cuadros sobre originales de 2048². La división no equivale a revisión ni aprobación. Las imágenes VR no deben publicarse.</p><select id="face"><option>b</option><option>l</option></select><select id="mode"><option value="vr">VR</option><option value="candidate">Candidata</option><option value="overlay">Superposición 50 %</option><option value="baseline">Anterior</option></select><select id="grid"><option>8</option><option>4</option></select><span id="cell">Mueve el puntero sobre la imagen</span><canvas width="2048" height="2048"></canvas><p><a href="assessment.json">Resultados y pendientes</a></p><script>const c=document.querySelector('canvas'),ctx=c.getContext('2d'),face=document.querySelector('#face'),mode=document.querySelector('#mode'),grid=document.querySelector('#grid');async function draw(){const f=face.value,m=mode.value,img=new Image();img.src=m==='vr'?`native-${f}-vr.jpg`:m==='overlay'?`native-${f}-overlay.png`:`../${m}/native-${f}.png`;await img.decode();ctx.drawImage(img,0,0);ctx.strokeStyle='#32e65a70';ctx.lineWidth=.5;const g=+grid.value;ctx.beginPath();for(let n=0;n<2048;n+=g){ctx.moveTo(n,0);ctx.lineTo(n,2048);ctx.moveTo(0,n);ctx.lineTo(2048,n)}ctx.stroke()}for(const s of[face,mode,grid])s.onchange=draw;c.onpointermove=e=>{const r=c.getBoundingClientRect(),x=(e.clientX-r.left)*2048/r.width,y=(e.clientY-r.top)*2048/r.height,g=+grid.value;document.querySelector('#cell').textContent=`Beach_Club/${face.value} · fila ${Math.floor(y/g)} · columna ${Math.floor(x/g)} · pendiente`};draw();</script>'''
(O/'index.html').write_text(html)
print(json.dumps({'views':len(captures['poses']),'edgeComponents':len(report),'accepted':False,'measuredControls':len(points)}))
