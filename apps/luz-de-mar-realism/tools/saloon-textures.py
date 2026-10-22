"""Physical-scale saloon maps, independently authored from the visible references.
Floor grain uses CC0 Poly Haven walnut relief as a desaturated wood starting point;
this is a visual finish estimate, not an identification of the installed species.
No tour/reference pixels are included in these maps.
"""
import json
from pathlib import Path
import numpy as np
from PIL import Image
R=Path(__file__).resolve().parents[1];O=R/'work/textures';spec=json.loads((O/'materials.json').read_text());rng=np.random.default_rng(1667308298);N=2048;y,x=np.mgrid[0:N,0:N]/N

def noise(n):
 a=rng.random((n,n));a[-1]=a[0];a[:,-1]=a[:,0]
 return np.asarray(Image.fromarray(np.uint8(a*255)).resize((N,N),Image.Resampling.BICUBIC),dtype=float)/255-.5

def save(f,a):Image.fromarray(np.uint8(np.clip(a,0,1)*255)).save(O/f,optimize=True)
for family,tile in [('flooroak',2.16),('stone',1.5),('boucle',.18),('cloudrug',5)]:
 if family=='flooroak':
  grain=np.asarray(Image.open(R/'work/material-sources/black_walnut_veneer_02_diff_2k.jpg').convert('L').resize((N,N)),dtype=float)/255
  grain=(grain-np.mean(grain));row=np.floor(y*12).astype(int);v=(y*12)%1;u=(x+row/3)%1
  seam=np.maximum(np.exp(-(np.minimum(v,1-v)/.0055)**2),np.exp(-(np.minimum(u,1-u)/.00065)**2))
  variation=np.take(np.array([.008,-.012,.015,-.004,.019,-.015,.009,-.006,.011,-.018,.006,-.003]),row)
  col=.89+grain*.32+variation-seam*.12;h=grain*.00028-seam*.00012;rough=.86+grain*.11+seam*.10
 elif family=='stone':
  f=noise(5)*.55+noise(18)*.18+noise(90)*.05
  v=np.sin((x*.7+y+f*.70)*np.pi*14);vein=np.exp(-abs(v)*45)
  col=.84+f*.33+vein*.10;h=f*.000015;rough=.88+f*.06
 elif family=='boucle':
  warp=noise(128)*.25;a=x*270+warp;b=y*270+warp*.7;dx=np.mod(a,1)-.5;dy=np.mod(b,1)-.5;d=np.sqrt(dx*dx+(dy*1.1)**2)
  loops=np.exp(-((d-.29)/.082)**2);grain=loops*.14+noise(512)*.035
  col=.90+(grain-.055)*.9;h=grain*.0007;rough=.96+noise(128)*.03
 else:
  f=noise(7)*.5+noise(19)*.28+noise(61)*.18+noise(173)*.08
  t=np.clip(.48+f*1.8,0,1);dark=np.array([.12,.19,.25]);light=np.array([.61,.68,.73]);col=dark+(light-dark)*t[...,None]
  h=noise(512)*.0005;rough=.82+noise(65)*.18+f*.12
 dy,dx=np.gradient(h);n=np.stack((-dx*N/tile,-dy*N/tile,np.ones_like(x)),axis=-1);n/=np.linalg.norm(n,axis=-1)[...,None]
 save(family+'-normal.png',n*.5+.5);save(family+'-color.png',np.repeat(col[...,None],3,-1)if col.ndim==2 else col);save(family+'-roughness.png',np.repeat(np.clip(rough,0,1)[...,None],3,-1))
 spec[family]={'tileMetres':tile,'size':N,'color':family+'-color.png','normal':family+'-normal.png','roughness':family+'-roughness.png'}
(O/'materials.json').write_text(json.dumps(spec,indent=2)+'\n')
print('Refined wood grain, plank joints, stone, boucle and variegated pile')
