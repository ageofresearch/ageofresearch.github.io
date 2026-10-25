"""Perspective-correct ID/depth pass and rays on decoded exported triangles.

Rasterization includes all retained source surfaces. Photographic masks are
eroded by two ORIGINAL pixels. No generated cell is automatically accepted.
"""
from pathlib import Path
import os,json,sys
import numpy as np
from PIL import Image,ImageDraw
from scipy.ndimage import binary_erosion
from numba import njit
R=Path(__file__).resolve().parents[1];W=Path(os.environ.get('ELECTRICAL_AUTHORING_WORK',R/'work/electrical-clearance-r03'));stage=sys.argv[1]if len(sys.argv)>1 else'candidate';a=json.loads((W/'audit'/f'{stage}-triangles.json').read_text());tri=np.fromfile(W/'audit'/f'{stage}-triangles.bin',dtype='<f8').reshape(-1,10);e=json.loads((W/'clearance-evidence.json').read_text());camera=np.array([0,1.17,9.15*35.23/36-17.615]);xyz=tri[:,:9].reshape(-1,3,3)-camera;depth=-xyz[:,:,2];p=np.stack([1024+xyz[:,:,0]/depth*1024,1024-xyz[:,:,1]/depth*1024,1/depth],2)
@njit
def raster(p,ids):
 z=np.zeros((2048,2048),np.float64);out=np.zeros((2048,2048),np.int32)
 for t in range(len(p)):
  q=p[t]
  if min(q[0,2],q[1,2],q[2,2])<=0:continue
  x0=max(1800,int(np.floor(min(q[0,0],q[1,0],q[2,0]))));x1=min(2047,int(np.ceil(max(q[0,0],q[1,0],q[2,0]))));y0=max(620,int(np.floor(min(q[0,1],q[1,1],q[2,1]))));y1=min(1900,int(np.ceil(max(q[0,1],q[1,1],q[2,1]))))
  det=(q[1,1]-q[2,1])*(q[0,0]-q[2,0])+(q[2,0]-q[1,0])*(q[0,1]-q[2,1])
  if abs(det)<1e-10:continue
  for y in range(y0,y1+1):
   for x in range(x0,x1+1):
    u=((q[1,1]-q[2,1])*(x+.5-q[2,0])+(q[2,0]-q[1,0])*(y+.5-q[2,1]))/det;v=((q[2,1]-q[0,1])*(x+.5-q[2,0])+(q[0,0]-q[2,0])*(y+.5-q[2,1]))/det
    if u<0 or v<0 or u+v>1:continue
    d=u*q[0,2]+v*q[1,2]+(1-u-v)*q[2,2]
    if d>z[y,x]:z[y,x]=d;out[y,x]=ids[t]
 return out,z
out,z=raster(p,tri[:,9].astype(np.int32));np.savez_compressed(W/'audit'/f'{stage}-ids.npz',ids=out,inverseDepth=z)
rows=[];combined=np.zeros((2048,2048),bool)
for control in e['controlMasks']['controls']:
 im=Image.new('1',(2048,2048));d=ImageDraw.Draw(im);x,y=control['center'];r=control['radius'];d.ellipse([x-r,y-r,x+r,y+r],fill=1);d.rectangle(control['caption'],fill=1);d.rectangle(control.get('sourceCaption',control['caption']),fill=1)
 if 'handle'in control:d.polygon([tuple(p)for p in control['handle']],fill=1)
 mask=binary_erosion(np.asarray(im),iterations=2);combined|=mask;values,counts=np.unique(out[mask],return_counts=True);hits={a['names'].get(str(int(k)),str(int(k))):int(n)for k,n in zip(values,counts)};blocked=int((out[mask]!=1).sum());rows.append({'id':control['id'],'nativePixels':int(mask.sum()),'electricalFirstHitPixels':int((out[mask]==1).sum()),'blockedPixels':blocked,'firstHitComponents':hits,'pass':blocked==0});Image.fromarray(mask).save(W/'audit'/f"mask-{control['id']}.png");np.save(W/'audit'/f"mask-{control['id']}.npy",mask)
colors=np.zeros((2048,2048,3),np.uint8);colors[out==1]=[64,188,136];colors[out==2]=[60,130,220];colors[(out>=1000)]=[180,75,70];colors[combined&(out!=1)]=[255,25,20];Image.fromarray(colors).save(W/'audit'/f'{stage}-id-pass.png')
report={'pass':all(r['pass']for r in rows),'stage':stage,'runtimeGeometrySHA256':a['runtimeGeometrySHA256'],'cameraSource':e['camera']['sourcePosition'],'nativeSize':2048,'erosionPixels':2,'method':'Perspective-correct depth/ID raster of actual decoded normalized GLB positions, including retained source geometry. All photographed control/handle and caption interior pixels must first hit the electrical assembly.','controls':rows,'totalBlockedPixels':sum(r['blockedPixels']for r in rows)};(W/'audit'/f'{stage}-visibility.json').write_text(json.dumps(report,indent=2)+'\n');print('VISIBILITY',stage,report['pass'],'blocked pixels',report['totalBlockedPixels']);print([(r['id'],r['blockedPixels'],r['firstHitComponents'])for r in rows if not r['pass']])
if stage=='candidate':assert report['pass'],'A retained or replacement surface still obscures a photographed control'
