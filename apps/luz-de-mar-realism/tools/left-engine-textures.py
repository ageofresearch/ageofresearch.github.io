"""Independently authored, physically tiled surface maps. No photo projection."""
from pathlib import Path
import numpy as np
from PIL import Image,ImageFilter,ImageDraw
R=Path(__file__).resolve().parents[1];O=R/'work/left-engine-r13/textures';O.mkdir(parents=True,exist_ok=True)
N=1024;rng=np.random.default_rng(3612)
def noise(radius):
 a=Image.fromarray(rng.integers(0,256,(N,N),dtype=np.uint8)).filter(ImageFilter.GaussianBlur(radius));v=np.asarray(a).astype(float)/255;return(v-v.mean())/max(v.std(),.0001)
fine=noise(.45);broad=noise(12);mid=noise(2);y,x=np.mgrid[:N,:N]
families={
 'enamel':([.91,.915,.90],.26,0,.16,.035),
 'cast':([.88,.89,.87],.34,0,.22,.065),
 'steel':([.73,.76,.78],.10,1,.25,.005),
 # PNG colors are sRGB. About 3% linear reflectance is ~0.19 sRGB;
 # writing 0.034 directly as sRGB made the insulation nearly featureless black.
 'black-insulation':([.32,.325,.31],.61,0,.20,.32),
 'aluminized':([.83,.84,.84],.65,.55,.12,.045),
 'strap':([.18,.185,.17],.43,.02,.10,.045),
 'rubber':([.028,.032,.03],.67,0,.12,.035),
 'blue':([.025,.07,.50],.32,0,.10,.025),
 'brass':([.48,.34,.12],.32,.92,.18,.03),
 'red':([.60,.025,.018],.23,0,.16,.025),
}
for name,(rgb,rough,metal,tile,amplitude)in families.items():
 weave=(np.sin(x*2*np.pi/5)*np.sin(y*2*np.pi/5))*.3 if name in ['strap','aluminized']else 0
 h=fine*.38+mid*.4+weave
 if name=='black-insulation':h=mid*.6+fine*.45;variation=.09
 else:variation=.012 if name in['enamel','cast']else .025
 color=np.clip(np.array(rgb)[None,None,:]*(1+(fine*.2+broad*.6)[:,:,None]*variation),0,1);Image.fromarray((color*255).astype('uint8')).save(O/(name+'-color.png'))
 gx=np.gradient(h,axis=1)*amplitude;gy=np.gradient(h,axis=0)*amplitude;normal=np.stack([-gx,-gy,np.ones_like(gx)],axis=2);normal/=np.linalg.norm(normal,axis=2,keepdims=True);Image.fromarray(((normal*.5+.5)*255).astype('uint8')).save(O/(name+'-normal.png'))
 rr=np.clip(rough+(broad*.035+fine*.012),.045,.95);orm=np.stack([np.ones_like(rr),rr,np.full_like(rr,metal)],axis=2);Image.fromarray((orm*255).astype('uint8')).save(O/(name+'-orm.png'))
# Fine open mesh: diagonal wire weave, with real alpha openings and metal response.
u=(x+y)%32;v=(x-y)%32;wire=(np.minimum(u,32-u)<5.5)|(np.minimum(v,32-v)<5.5);a=np.where(wire,255,0).astype('uint8');rgb=np.zeros((N,N,4),dtype='uint8');rgb[:,:,:3]=np.array([180,178,151]);rgb[:,:,3]=a;Image.fromarray(rgb).save(O/'intake-mesh-color.png')
Image.fromarray(np.dstack([np.full((N,N),255,dtype='uint8'),np.full((N,N),115,dtype='uint8'),np.full((N,N),220,dtype='uint8')])).save(O/'intake-mesh-orm.png')
print('Authored surface textures:',len(list(O.glob('*.png'))))

# Fine weave relief is evaluated at runtime, not aliased into the diffuse atlas.
h=np.maximum(np.cos(u*2*np.pi/32),np.cos(v*2*np.pi/32));gx=np.gradient(h,axis=1)*1.5;gy=np.gradient(h,axis=0)*1.5;normal=np.stack([-gx,-gy,np.ones_like(gx)],axis=2);normal/=np.linalg.norm(normal,axis=2,keepdims=True);Image.fromarray(((normal*.5+.5)*255).astype('uint8')).save(O/'intake-mesh-normal.png')
