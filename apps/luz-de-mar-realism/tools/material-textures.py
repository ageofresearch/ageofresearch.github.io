"""Independent physical-scale material maps. Wood relief derives from CC0 Poly Haven.
No owner/reference photographs are used as textures.
"""
from pathlib import Path
import json,hashlib
import numpy as np
from PIL import Image
root=Path(__file__).resolve().parents[1];out=root/'work/textures';out.mkdir(parents=True,exist_ok=True)
rng=np.random.default_rng(20261022)
def save(name,a):
 a=np.clip(a,0,1);Image.fromarray(np.uint8(np.round(a*255))).save(out/name,optimize=True)
def normals(h,strength):
 dy,dx=np.gradient(h);n=np.stack((-dx*strength,-dy*strength,np.ones_like(h)),axis=-1);n/=np.linalg.norm(n,axis=-1)[...,None];return n*.5+.5
spec={}
for family,size,tile in [('wood',2048,1.0),('fabric',1024,.25),('carpet',1024,.35),('paint',512,.18),('metal',1024,.25),('checker',1024,.13),('insulation',1024,.18),('acoustic',1024,.08),('rubber',512,.18)]:
 y,x=np.mgrid[0:size,0:size]/size;noise=rng.normal(0,1,(size,size));grain=np.zeros_like(x);rough=.96+noise*.008;color=np.ones_like(x)*.99
 if family=='wood':
  src=root/'work/material-sources';im=np.asarray(Image.open(src/'black_walnut_veneer_02_diff_2k.jpg').convert('L').resize((size,size)),dtype=float)/255
  color=np.clip(.91+(im-np.mean(im))*.6,.58,1)
  normal=np.asarray(Image.open(src/'black_walnut_veneer_02_nor_gl_2k.jpg').resize((size,size)),dtype=float)/255
  rough=np.asarray(Image.open(src/'black_walnut_veneer_02_rough_2k.jpg').convert('L').resize((size,size)),dtype=float)/255;rough=np.clip(.75+rough*.25,0,1)
 elif family=='fabric':
  yarn=np.sin(x*2*np.pi*170)*np.sin(y*2*np.pi*160);grain=yarn*.045+noise*.008;color=.97+yarn*.022+noise*.005;rough=.96+yarn*.025;normal=normals(grain,size*.055)
 elif family=='carpet':
  grain=noise*.025+np.sin(x*2*np.pi*123+np.sin(y*47))*.01;color=.94+noise*.025;rough=.98+noise*.008;normal=normals(grain,size*.018)
 elif family=='checker':
  a=(x+y)*2;b=(x-y)*2;cx=np.mod(a,1)-.5;cy=np.mod(b,1)-.5;dist=np.abs(cx)/.34+np.abs(cy)/.09;mark=np.clip((1-dist)*8,0,1);grain=mark*.05;color=.98-mark*.055;rough=.9+mark*.06;normal=normals(grain,size*.12)
 elif family=='insulation':
  grain=np.sin(x*2*np.pi*12)*np.sin(y*2*np.pi*12)*.025+noise*.012;color=.96+grain*.5;rough=.93+noise*.02;normal=normals(grain,size*.04)
 elif family=='acoustic':
  hole=np.sqrt((np.mod(x*16,1)-.5)**2+(np.mod(y*16,1)-.5)**2);grain=-np.clip((.22-hole)*20,0,1)*.018;color=.99+grain*6;rough=.95+grain;normal=normals(grain,size*.04)
 elif family=='metal':
  grain=np.sin(y*2*np.pi*410+x*.5)*.006+noise*.003;rough=.85+noise*.018+np.sin(y*2*np.pi*410)*.05;normal=normals(grain,size*.015)
 else:
  grain=noise*.008;normal=normals(grain,size*.015);color=np.ones_like(x)*.995;rough=.97+noise*.008
 save(family+'-color.png',np.repeat(color[...,None],3,axis=-1)**(1/2.2));save(family+'-normal.png',normal);save(family+'-roughness.png',np.repeat(np.clip(rough,0,1)[...,None],3,axis=-1))
 spec[family]={'tileMetres':tile,'size':size,'color':family+'-color.png','normal':family+'-normal.png','roughness':family+'-roughness.png'}
(out/'materials.json').write_text(json.dumps(spec,indent=2)+'\n')
print('Created',len(spec),'material map sets')
