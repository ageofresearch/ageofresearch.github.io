"""Freeze private native reference cells; never equate inventory with acceptance."""
from pathlib import Path
import json,hashlib,math
import numpy as np
from PIL import Image,ImageDraw
R=Path(__file__).resolve().parents[1];W=R/'work/boarding-vr-r01';S=R/'work/reference/exteriors/cubes'
W.mkdir(exist_ok=True);(W/'reference').mkdir(exist_ok=True)
sources=json.loads((S/'sources.json').read_text())['faces'];scenes=['Beach_Club','Cockpit','Cockpit_-_Port','Cockpit_-_Stbd'];sources=[s for s in sources if s['scene'] in scenes]
for s in sources:assert hashlib.sha256((S/s['file']).read_bytes()).hexdigest()==s['sha256']
# One estimated station per photograph, fixed for every crop. Only Beach Club
# controls geometry fit; the other stations are independent consistency checks.
stations={'Beach_Club':{'position':[.22,-.28,2.75],'yaw':90,'basis':'Gangway side rail/deck vertical separation, retained deck elevation and transom envelope; estimated, not survey'},'Cockpit':{'position':[6.8,0,5.5],'yaw':0,'basis':'Existing terrace rigid envelope; provisional registration'},'Cockpit_-_Port':{'position':[5.7,2.6,5.5],'yaw':90,'basis':'Terrace floor and transom; provisional registration'},'Cockpit_-_Stbd':{'position':[5.7,-2.6,5.5],'yaw':0,'basis':'Terrace floor and transom; provisional registration'}}
# Masks are hand annotated from source photographs, not generated from model.
regions=[
 ('telescopic','Beach_Club','b',[[[251,564],[2047,560],[2047,773],[391,725],[255,659]]],'Perfil lateral, tramos, extremo y guías inferiores'),
 ('stanchions','Beach_Club','b',[[[283,0],[359,0],[398,573],[321,573]],[[1003,0],[1061,0],[1068,575],[1009,575]],[[1933,0],[2007,0],[2000,574],[1933,574]],[[511,171],[2047,126],[2047,166],[536,220]],[[536,196],[578,197],[573,436],[533,575],[500,575],[535,423]],[[1690,148],[1733,148],[1740,436],[1771,566],[1733,566],[1698,445]]],'Montantes acodados y pasamanos; partes recortadas en cara superior'),
 ('mount','Beach_Club','l',[[[0,558],[726,822],[629,925],[0,723]]],'Arranque, estructura inferior y articulaciones visibles'),
 ('stairs','Beach_Club','l',[[[42,1318],[228,1216],[404,888],[658,855],[745,674],[771,909],[651,1266],[329,1505]]],'Escalera inmediata, envolventes, pasamanos y desembarco'),
 ('hardware','Beach_Club','l',[[[529,934],[713,929],[695,1044],[559,1044]],[[465,1095],[576,1076],[559,1211],[469,1230]]],'Tapa rectangular, cierre y herrajes de la envolvente'),
 ('landing','Cockpit_-_Port','r',[[[1300,1460],[1730,1405],[2047,1510],[2047,2047],[1370,2047]]],'Teca del desembarco; calibración secundaria provisional'),
 ('upper-rail','Beach_Club','u',[[[0,1050],[650,1020],[1200,2047],[0,2047]]],'Continuación superior de montantes; evidencia parcial, máscara conservadora'),
]
# Independent controls are recorded now. They are not read by modelling code.
held=[('tip-upper','b',258,566),('tip-lower','b',280,657),('guide-end','b',404,720),('guide-splice','b',1050,723),('deck-splice','b',1939,565),('under-guide','b',1714,744),('post1-knee','b',354,396),('post1-foot','b',374,566),('post2-foot','b',1042,565),('rail-left','b',531,189),('rail-right','b',1940,149),('far-post-foot','b',1741,566),('mount-inner','l',633,886),('mount-lower','l',508,865),('outer-rail-foot','l',78,1151),('step1-left','l',305,1144),('step2-left','l',365,1071),('step3-left','l',398,990),('step4-left','l',468,925),('shoulder-bottom','l',607,1255),('access-cover-left','l',556,938),('access-cover-right','l',700,951),('cleat-support','l',590,727),('base-joint','l',225,1241)]
poses=[('landing','Cockpit_-_Port',90,40,70),('side','Beach_Club',180,-14,90),('tip','Beach_Club',205,-18,48),('mount','Beach_Club',240,-10,60),('underside','Beach_Club',195,0,55),('stanchions','Beach_Club',180,-38,70),('stairs','Beach_Club',285,0,80),('teak','Cockpit_-_Port',95,65,60)]
e={'revision':'boarding-vr-r01','strategy':'LDM-VR-EST-001 v1.0','sources':sources,'stations':stations,'poses':[{'id':n,'station':s,'h':h,'v':v,'hfov':f}for n,s,h,v,f in poses],'nativeSize':[2048,2048],'grid':{'base':8,'detail':4},'heldOut':[{'id':i,'station':'Beach_Club','face':f,'pixel':[x,y],'annotationUncertaintyPixels':4,'usedForAdjustment':False}for i,f,x,y in held],'regions':[{'id':k,'station':s,'face':f,'polygons':p,'observation':o,'certainty':'Visible form; depth and physical measurements estimated'}for k,s,f,p,o in regions],'status':'inventoried; not accepted','limits':['Secondary station registrations remain provisional until checked against common rigid points.','Native photograph annotations have uncertainty; strict pixel acceptance is not asserted by generating this inventory.','Unseen upper tread, mounting internals and reverse faces are inferred.']}
file=W/'evidence-frozen.json'
if file.exists():assert json.loads(file.read_text())==e,'Frozen evidence cannot be silently replaced'
else:file.write_text(json.dumps(e,ensure_ascii=False,indent=2)+'\n')
cells=[]
for k,s,f,polys,obs in regions:
 mask=Image.new('L',(2048,2048));d=ImageDraw.Draw(mask)
 for poly in polys:d.polygon([tuple(p)for p in poly],fill=255)
 mask.save(W/'reference'/f'{k}-mask.png');a=np.array(mask)
 for y in range(0,2048,8):
  for x in range(0,2048,8):
   if not a[y:y+8,x:x+8].any():continue
   cells.append({'id':f'{s}/{f}/r{y//8:03}/c{x//8:03}/{k}','group':k,'rect':[x,y,8,8],'state':'inventariado','material':{'telescopic':'polished metal','stanchions':'polished metal','stairs':'paint / teak / metal','landing':'teak','hardware':'paint / metal'}.get(k,'mixed'),'certainty':'observed surface, inferred depth','pending':['shape','interior details','occlusion','material','continuity']})
   if k in ['hardware','stanchions','mount']:
    for dy in [0,4]:
     for dx in [0,4]:
      if a[y+dy:y+dy+4,x+dx:x+dx+4].any():cells.append({'id':f'{s}/{f}/r{y//8:03}/c{x//8:03}/{k}/{dx//4}{dy//4}','group':k,'rect':[x+dx,y+dy,4,4],'state':'inventariado','certainty':'detail boundary, manual review required'})
 im=Image.open(S/f'{s}-{f}.jpg').convert('RGB');grid=ImageDraw.Draw(im)
 for y in range(0,2048,8):grid.line((0,y,2048,y),fill=(85,180,100),width=1)
 for x in range(0,2048,8):grid.line((x,0,x,2048),fill=(85,180,100),width=1)
 im.save(W/'reference'/f'{k}-grid8.jpg',quality=92)
 for poly in polys:
  x0,y0,x1,y1=min(p[0]for p in poly),min(p[1]for p in poly),max(p[0]for p in poly),max(p[1]for p in poly)
  if k=='hardware':
   crop=Image.open(S/f'{s}-{f}.jpg').crop((x0,y0,x1,y1));dr=ImageDraw.Draw(crop)
   for x in range((-x0)%4,x1-x0,4):dr.line((x,0,x,y1-y0),fill='#52ae68')
   for y in range((-y0)%4,y1-y0,4):dr.line((0,y,x1-x0,y),fill='#52ae68')
   crop.resize((crop.width*3,crop.height*3)).save(W/'reference'/f'{k}-{x0}-grid4.png')
(W/'cells.json').write_text(json.dumps(cells,ensure_ascii=False,separators=(',',':')))
(W/'reference-summary.json').write_text(json.dumps({'sources':24,'baseCells':sum(c['rect'][2]==8 for c in cells),'detailCells':sum(c['rect'][2]==4 for c in cells),'acceptedCells':0,'heldOut':24},indent=2))
print('Frozen',len(cells),'cells; zero automatically accepted')
