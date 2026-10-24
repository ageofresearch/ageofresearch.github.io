"""Freeze the photographic evidence before electrical-front reconstruction.

The source photographs and crops are private work products, never runtime maps.
16/8 pixel cells refer to original 2048-pixel cube faces, not enlarged previews.
"""
from pathlib import Path
import json, hashlib, math, ast
import numpy as np
from PIL import Image

R=Path(__file__).resolve().parents[1];W=R/'work/electrical-vr-r01';A=R/'public/assets/machinery/electrical-vr-r01';SOURCE=R/'work/reference/machinery/cubes'
for p in [W,A,W/'reference',W/'review']:p.mkdir(exist_ok=True,parents=True)
CAMERA=[9.15,0,3.18]
# All rectangles are observations made on the source, before authored meshes.
# B extends across the R seam; R coordinates below cover the missing left half.
features=[
 ('distribution-upper','Dos frentes EURO EL / Woodward','b',[0,446,515,1008],'paint / plastic / LCD',True),
 ('distribution-upper-R','Continuación del cuadro superior','r',[1680,490,2048,1050],'paint / plastic / LCD',True),
 ('distribution-lower','Protecciones, cuatro tapas transparentes derechas','b',[0,1018,536,1925],'paint / clear plastic / metal',True),
 ('distribution-lower-R','Protecciones, cuatro tapas transparentes izquierdas','r',[1680,1045,2048,1860],'paint / clear plastic / metal',True),
 ('shore','SHORE POWER SYSTEM y placa de montaje','b',[686,514,1237,1114],'paint / black plastic / instruments',True),
 ('vented','Cuatro columnas de lamas, tapa, dos argollas','b',[630,1148,1464,2048],'paint / metal',True),
 ('battery','Cuatro seccionadores rojos y seis mandos menores','b',[1740,676,2036,1878],'paint / red plastic / rubber / metal',True),
 ('battery-enclosure','Envolvente y rejilla superior','b',[1698,292,2048,2020],'paint / grille',False),
 ('cables','Haces superiores, bajadas, bandeja y soportes','b',[637,508,1438,1120],'rubber / paint / metal',True),
 ('cables-R','Continuación del cableado en el borde derecho R','r',[1500,540,1698,960],'rubber / copper / paint',True),
 ('beacons','Dos balizas rojas, una ámbar y una azul','b',[916,215,1390,403],'colored plastic / metal',True),
 ('upper-junction','Remate superior y entrada de balizas','u',[640,1390,1190,1810],'paint / rubber',False),
]
# Explicitly photographed positions, not fitting markers attached to meshes.
# Historical initial24: later review found overlap with fitting anchors.
# They are diagnostic only; the separate verification set is authoritative.
checks=[
 ('D01','b',[197,514],'distribution','Woodward upper-left bezel'),('D02','b',[431,515],'distribution','Woodward upper-right bezel'),
 ('D03','b',[96,612],'distribution','Blue illuminated pilot centre'),('D04','b',[70,768],'distribution','Green illuminated pilot centre'),
 ('D05','b',[36,1091],'distribution','First clear cover upper-left'),('D06','b',[462,1562],'distribution','Fourth clear cover lower-right'),
 ('S01','b',[903,636],'shore','Phase selector pivot'),('S02','b',[1106,635],'shore','Voltage selector pivot'),
 ('S03','b',[811,650],'shore','Left lever end'),('S04','b',[1036,567],'shore','Right lever end'),
 ('S05','b',[931,990],'shore','General selector lower tip'),('S06','b',[1099,818],'shore','Voltmeter dial centre'),
 ('V01','b',[630,1237],'vented','Lid left edge'),('V02','b',[1464,1237],'vented','Lid right edge'),
 ('V03','b',[817,1174],'vented','Left lifting eye centre'),('V04','b',[1298,1179],'vented','Right lifting eye centre'),
 ('V05','b',[760,1310],'vented','First louvre column'),('V06','b',[1310,1505],'vented','Fourth louvre column'),
 ('B01','b',[1940,741],'battery','First red selector centre'),('B02','b',[1940,846],'battery','Second red selector centre'),
 ('B03','b',[1940,947],'battery','Third red selector centre'),('B04','b',[1940,1050],'battery','Fourth red selector centre'),
 ('B05','b',[1934,1172],'battery','Upper small key pivot'),('B06','b',[1938,1700],'battery','Lowest small switch pivot'),
]
POSES=[('general-150',150,0,90),('general-180',180,0,90),('general-210',210,0,90),('distribution-upper',147,-12,45),('distribution-lower',147,30,55),('shore',180,-8,45),('vented',180,38,55),('batteries',219,18,65)]
e={'version':1,'id':'electrical-vr-r01','strategy':'LDM-VR-EST-001 v1.0','camera':{'sourcePosition':CAMERA,'estimated':True,'fixedForAllViews':True},'reference':'https://vrcloud.com/?pv=1667308298','scene':'scene_engine_room','panoramaStations':1,'nativeSize':2048,'grid':{'basePixels':16,'detailPixels':8,'automaticAcceptance':False},'features':[{'id':i,'observation':t,'face':f,'rect':r,'materials':m,'detail':d,'classification':'observed visible form; depth and hidden routing inferred'}for i,t,f,r,m,d in features],'heldOut':[{'id':i,'face':f,'pixel':p,'assembly':g,'description':t,'usedForAdjustment':False,'annotationUncertaintyPixels':2}for i,f,p,g,t in checks],'poses':[{'id':i,'h':h,'v':v,'hfov':f,'vfov':math.degrees(2*math.atan(math.tan(math.radians(f)/2)/1.5))}for i,h,v,f in POSES],'sources':[{'face':f,'sha256':hashlib.sha256((SOURCE/f'pano_{f}.jpg').read_bytes()).hexdigest(),'url':f'https://cdn-static.vrcloud.com/azimut-yachts/ma2805/panos/Engine_Room.tiles/pano_{f}.jpg?v=p29279716'}for f in 'flrbud'],'limits':['One photographic station; small cells do not establish hidden depth.','Vented cabinet function and manufacturer remain unverified.','Unreadable labels and electrical topology are not invented.','Fixed appearance only; the electrical controls do not operate real circuits.','Existing room floor, ceiling and generator placement constrain the reconstruction and may differ from the photographed room.']}
p=W/'evidence-frozen.json'
if p.exists():assert json.loads(p.read_text())==e,'Frozen evidence must not be silently rewritten'
else:p.write_text(json.dumps(e,ensure_ascii=False,indent=2)+'\n')
(A/'evidence.json').write_text(json.dumps(e,ensure_ascii=False,indent=2)+'\n')
guards={'commit':'f399e512a18ad6c40b9e401524f1a0ba6dca95a9','files':{}}
for folder in [R/'public/assets/mechanics',R/'public/assets/machinery/bulkhead-vr-r01']:
 for f in sorted(folder.rglob('*')):
  if f.is_file():guards['files'][str(f.relative_to(R))]=hashlib.sha256(f.read_bytes()).hexdigest()
strategy=Path('/workspace/documents/luz-de-mar-estrategia-vr-v1.0/Luz-de-Mar_Estrategia-de-reconstruccion-y-realismo-VR_v1.0.pdf')
guards['strategySHA256']=hashlib.sha256(strategy.read_bytes()).hexdigest()
if not(W/'baseline-hashes.json').exists():(W/'baseline-hashes.json').write_text(json.dumps(guards,indent=2)+'\n')
# Reuse the established, independently tested cube-to-rectilinear resampler.
text=(R/'tools/left-engine-evidence.py').read_text();section=text[text.index('faces={k:'):text.index("(W/'reference/cameras.json')")]
exec(compile(section,str(R/'tools/left-engine-evidence.py'),'exec'),globals())
(W/'reference/cameras.json').write_text(json.dumps(e['poses'],indent=2)+'\n')
print('ELECTRICAL REFERENCE FROZEN:',len(features),'regions,',len(checks),'initial diagnostic points, eight views; grid 16/8')
