"""Derive restrained clean enamel/steel maps from project-authored R13 maps.
No VR pixels are sampled or published. Changes are isolated to right materials.
"""
from pathlib import Path
from PIL import Image
import numpy as np
R=Path(__file__).resolve().parents[1];src=R/'work/left-engine-r13/textures';out=R/'work/right-engine-r01/textures';out.mkdir(exist_ok=True)
for family,mean,contrast in [('enamel',.24,.22),('cast',.30,.30),('steel',.13,.18)]:
 a=np.array(Image.open(src/(family+'-orm.png')),dtype=float);g=a[:,:,1];a[:,:,1]=mean*255+(g-g.mean())*contrast;Image.fromarray(np.clip(a,0,255).astype('uint8')).save(out/(family+'-orm.png'))
 if family!='steel':
  a=np.array(Image.open(src/(family+'-color.png')),dtype=float);avg=a.mean((0,1));a=avg+(a-avg)*.40;Image.fromarray(np.clip(a,0,255).astype('uint8')).save(out/(family+'-color.png'))
print('RIGHT MATERIAL MAPS',len(list(out.glob('*.png'))))
