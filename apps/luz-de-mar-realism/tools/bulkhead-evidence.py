"""Freeze native panorama observations before modelling; photos stay private."""
from pathlib import Path
import ast, json, math, hashlib
import numpy as np
from PIL import Image, ImageDraw

R=Path(__file__).resolve().parents[1];W=R/'work/bulkhead-vr-r01';A=R/'public/assets/machinery/bulkhead-vr-r01';SOURCE=R/'work/reference/machinery/cubes'
W.mkdir(parents=True,exist_ok=True);A.mkdir(parents=True,exist_ok=True)
CAMERA=[9.15,0,3.18]
POSES=[('front',0,0,90),('port-oblique',-30,0,90),('starboard-oblique',30,0,90),('port-panels',-25,0,45),('starboard-panels',25,0,45),('central',0,15,45),('cables',0,-10,70),('lower',0,30,45)]
# Native F cube coordinates, manually read before the authored meshes exist.
boxes=[('eco',[132,898,273,979],'ECO / R'),('port-operating',[286,896,409,1028],None),('epu',[418,895,671,1051],'EPU'),('port-local',[705,899,841,1006],None),('starboard-local',[1180,899,1308,1007],None),('junction',[1420,894,1487,944],None),('starboard-operating',[1550,902,1686,1056],None),('scu',[1697,894,2018,1031],'SCU')]
groups=[('wall','Paneles, juntas y encuentros',[[0,875,2048,1060],[870,1058,1167,1418]]),('panels','Ocho cajas y armarios principales visibles',[b[1]for b in boxes]),('central','Conjunto de tubos, equipo motorizado y soporte central',[[882,890,1152,1410]]),('cables','Bandeja superior y haces de cable',[ [0,798,2048,901],[699,990,872,1100],[1148,990,1325,1100],[1139,1060,1190,1380]]),('fasteners','Fijaciones y entradas visibles',[[0,875,2048,1060],[882,890,1152,1410]])]
held=[('eco-left',132,940,'panels'),('eco-bottom',212,979,'panels'),('operating-port-right',409,963,'panels'),('epu-left',418,972,'panels'),('epu-bottom',555,1051,'panels'),('port-local-right',841,955,'panels'),('starboard-local-left',1180,954,'panels'),('junction-right',1487,920,'panels'),('operating-starboard-left',1550,980,'panels'),('scu-bottom',1836,1031,'panels'),('central-upper-white',1019,910,'central'),('central-brass-outer',1137,1009,'central'),('motor-fan-center',1031,1115,'central'),('manual-cover-center',1028,1215,'central'),('tray-line',1380,826,'cables'),('cable-drop',1162,1240,'cables')]
evidence={'version':1,'id':'bulkhead-vr-r01','strategy':'LDM-VR-EST-001 v1.0','reference':'https://vrcloud.com/?pv=1667308298','panoramaStations':1,'camera':{'sourcePosition':CAMERA,'estimated':True,'fixedForAllViews':True},'poses':[{'id':n,'h':h,'v':v,'hfov':f,'vfov':math.degrees(2*math.atan(math.tan(math.radians(f)/2)/1.5))}for n,h,v,f in POSES],'boxes':[{'id':n,'rect':b,'legibleLabel':label}for n,b,label in boxes],'groups':[{'id':key,'title':title,'referenceRects':rects,'classification':'observed visible form; inferred depth and hidden connections'}for key,title,rects in groups],'heldOut':[{'id':n,'face':'f','pixel':[x,y],'group':g,'confidence':'medium','usedForFineAdjustment':False}for n,x,y,g in held],'sources':[{'face':f,'sha256':hashlib.sha256((SOURCE/f'pano_{f}.jpg').read_bytes()).hexdigest(),'url':f'https://cdn-static.vrcloud.com/azimut-yachts/ma2805/panos/Engine_Room.tiles/pano_{f}.jpg?v=p29279716'}for f in 'flrbud'],'limits':['A single photographic station; metric depth and hidden equipment inferred.','No real circuit function, serial number, capacity or hidden routing asserted.','Reference photographs are private and never used as material textures.','Held-out annotations are manual and include uncertainty; report all results, not only favourable subsets.']}
file=W/'evidence-frozen.json'
if file.exists():assert json.loads(file.read_text())==evidence,'Do not silently change frozen observations'
else:file.write_text(json.dumps(evidence,ensure_ascii=False,indent=2)+'\n')
(A/'evidence.json').write_text(json.dumps(evidence,ensure_ascii=False,indent=2)+'\n')
# Reuse only the existing cubemap-resampling section, with this frozen pose set.
script=(R/'tools/left-engine-evidence.py').read_text();section=script[script.index('faces={k:'):script.index("(W/'reference/cameras.json')")]
exec(compile(section,str(R/'tools/left-engine-evidence.py'),'exec'),globals())
(W/'reference/cameras.json').write_text(json.dumps(evidence['poses'],indent=2)+'\n')
im=Image.open(SOURCE/'pano_f.jpg');draw=ImageDraw.Draw(im)
for item in evidence['boxes']:draw.rectangle(item['rect'],outline='#00ffff',width=2);draw.text((item['rect'][0]+3,item['rect'][1]+3),item['id'],fill='yellow')
for p in evidence['heldOut']:
 x,y=p['pixel'];draw.ellipse((x-4,y-4,x+4,y+4),outline='magenta',width=2)
im.crop((0,780,2048,1440)).save(W/'reference/annotations.png')
print('FROZEN',len(boxes),'principal enclosures,',len(held),'reserved checks,',len(POSES),'views')
