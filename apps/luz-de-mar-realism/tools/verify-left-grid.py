"""Measure actual authored feature points in one fixed panorama registration.

These are fitting controls, not independent proof of dimensional accuracy.
No floating landmarks, per-view camera fitting, or photographs in public assets.
"""
import bpy, json, math
from pathlib import Path
from mathutils import Vector
R=Path(__file__).resolve().parents[1];W=R/'work/left-engine-r13';S=bpy.context.scene;SX=35.23/36;SY=7.47/7.6
def source(p):return [(-p.y+17.615)/SX,p.x/SY,p.z+2.01]
def average(vertices):return sum((v.co for v in vertices),Vector())/len(vertices)
def point(name,mode='center',n=20):
 o=S.objects['LVR | '+name];vs=list(o.data.vertices)
 if mode=='start':p=average(vs[:n])
 elif mode=='vertex':p=vs[n].co
 elif mode=='end':p=average(vs[-n:])
 elif mode=='top':p=max(vs,key=lambda v:v.co.z).co
 elif mode=='far-inner':p=min(vs[n:],key=lambda v:v.co.x).co
 else:p=average(vs)
 return source(o.matrix_world@p)
controls=[
 ('rail-near','inner longitudinal guard 0','start',20,'f',[300,1295]),
 ('rail-far','inner longitudinal guard 0','end',20,'f',[844,1100]),
 ('far-frame','guard transverse crown far','start',20,'f',[840,1100]),
 ('near-post','guard single upright 9.80.48','end',24,'f',[270,1310]),
 ('cap-1','service cap black 0','center',24,'f',[410,1100]),
 ('cap-2','service cap black 1','center',24,'f',[460,1100]),
 ('cap-3','service cap black 2','center',24,'f',[510,1095]),
 ('intake-near','intake black end lip 11.51','center',8,'f',[575,1280]),
 ('intake-near-top','intake black end lip 11.51','top',8,'f',[575,1180]),
 ('intake-far','intake black end lip 12.08','center',8,'f',[650,1230]),
 ('intake-far-inner','intake woven cylinder','far-inner',64,'f',[740,1240]),
 ('blue-inner','blue silicone sleeve 0','center',40,'l',[1460,1200]),
 ('blue-outer','blue silicone sleeve 1','center',40,'l',[1350,1160]),
 ('cuff','upper black fastening cuff','center',64,'l',[1150,1000]),
 ('red-handle-upper','extinguisher red handle 2.81','end',12,'f',[300,1680]),
 ('red-handle-lower','extinguisher red handle 2.75','end',12,'f',[300,1770]),
 ('casting-upper-0','near upper stepped accessory casting','vertex',0,'l',[1608,1418]),
 ('casting-upper-2','near upper stepped accessory casting','vertex',2,'l',[1690,1339]),
 ('casting-upper-3','near upper stepped accessory casting','vertex',3,'l',[1770,1336]),
 ('casting-upper-9','near upper stepped accessory casting','vertex',9,'l',[1806,1582]),
 ('casting-lower-0','near lower accessory casting','vertex',0,'l',[1618,1558]),
 ('casting-lower-3','near lower accessory casting','vertex',3,'l',[1835,1650]),
 ('casting-lower-8','near lower accessory casting','vertex',8,'l',[1662,1845]),
 ('casting-lower-10','near lower accessory casting','vertex',10,'l',[1585,1682]),
]
rows=[]
for id,name,mode,n,face,expected in controls:
 p=point(name,mode,n);dx=(p[0]-9.15)*SX;dy=p[1]*SY;dz=p[2]-3.18
 actual=[1024*(1-dy/dx),1024*(1-dz/dx)]if face=='f'else[1024*(1+dx/dy),1024*(1-dz/dy)]
 error=math.dist(actual,expected);rows.append(dict(id=id,object='LVR | '+name,method=mode,face=face,expected=expected,actual=actual,errorPixels=error,errorFractionOfWidth=error/2048,sourcePosition=p))
report={'stationSource':[9.15,0,3.18],'cubeSize':2048,'cameraFixedForAllViews':True,'purpose':'fitting controls measured on real authored geometry; not independent validation','thresholdPixels':40.96,'controls':rows,'maxErrorPixels':max(r['errorPixels']for r in rows),'anchorFitPassed':all(r['errorPixels']<=40.96 for r in rows),'silhouetteReview':'Required separately; point fit does not establish contour or material fidelity.'}
(W/'grid-fit.json').write_text(json.dumps(report,indent=2)+'\n');print(json.dumps(report,indent=2))
