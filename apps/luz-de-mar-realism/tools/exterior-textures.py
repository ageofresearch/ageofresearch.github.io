"""Own outdoor finishes, using the already credited CC0 veneer relief as grain."""
from pathlib import Path
import json,numpy as np
from PIL import Image
R=Path(__file__).resolve().parents[1];O=R/'work/textures';T=json.loads((O/'materials.json').read_text());N=2048;y,x=np.mgrid[:N,:N]/N;rng=np.random.default_rng(36036)
def save(name,a):Image.fromarray(np.uint8(np.rint(np.clip(a,0,1)*255))).save(O/name,optimize=True)
grain=np.asarray(Image.open(R/'work/material-sources/black_walnut_veneer_02_diff_2k.jpg').convert('L').resize((N,N)),dtype=float)/255;grain-=grain.mean()
for family,tile in [('teak',2.40),('outdoor-fabric',.32),('charcoal-weave',.22)]:
 if family=='teak':
  row=np.floor(y*20).astype(int);v=y*20%1;u=(x+(row%4)*.25)%1;seam=np.maximum(np.exp(-(np.minimum(v,1-v)/.012)**2),np.exp(-(np.minimum(u,1-u)/.0014)**2));vary=rng.uniform(-.035,.035,20)[row];base=np.array([.72,.59,.43]);color=base[None,None,:]*(1+grain[...,None]*.35+vary[...,None])-seam[...,None]*.48;h=grain*.00016-seam*.00030;rough=.88+grain*.08+seam*.08
 else:
  warp=np.sin(x*np.pi*2*150);weft=np.sin(y*np.pi*2*143);n=rng.normal(0,1,(N,N));pattern=warp*weft;v=.965+pattern*.025+n*.006;color=np.repeat(v[...,None],3,axis=-1);h=pattern*.000038+n*.000005;rough=.96+pattern*.02
 dy,dx=np.gradient(h);normal=np.stack((-dx*N/tile,-dy*N/tile,np.ones_like(x)),axis=-1);normal/=np.linalg.norm(normal,axis=-1)[...,None]
 save(family+'-color.png',color);save(family+'-normal.png',normal*.5+.5);save(family+'-roughness.png',np.repeat(np.clip(rough,0,1)[...,None],3,axis=-1));T[family]={'tileMetres':tile,'size':N,'color':family+'-color.png','normal':family+'-normal.png','roughness':family+'-roughness.png'}
(O/'materials.json').write_text(json.dumps(T,indent=2)+'\n');print('Outdoor teak and woven textiles prepared')
