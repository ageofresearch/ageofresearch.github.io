"""Conservative walking grid for the observed furniture layout, in source metres."""
import json,math,base64
from collections import deque
from pathlib import Path
import numpy as np
R=Path(__file__).resolve().parents[1];src=json.loads((R/'work/snapshot/saloon.json').read_text());g=src['navigation'];x0,y0,step=8.70,-2.45,.04;nx=223;ny=124;y,x=np.mgrid[0:ny,0:nx];x=x0+x*step;y=y0+y*step;r=.14;safe=(x>8.73+r)&(x<17.72-r)&(y>-2.56+r)&(y<2.56-r)
# Collision bounds are separate from the shaded geometry; extra clearance protects touch motion.
def rect(cx,cy,hx,hy):
 global safe;safe&=~((abs(x-cx)<hx+r)&(abs(y-cy)<hy+r))
def ellipse(cx,cy,rx,ry):
 global safe;safe&=~(((x-cx)/(rx+r))**2+((y-cy)/(ry+r))**2<1)
for a in np.linspace(-52,153,260):
 t=math.radians(a);ellipse(11.90+1.60*math.cos(t),.03+1.80*math.sin(t),.48,.48)
for cx in [11.15,12.25]:ellipse(cx,-1.70,.41,.40)
ellipse(11.78,-.23,.62,.91);ellipse(13.30,1.44,.24,.24);rect(9.45,2.32,.73,.24);rect(9.23,-2.585,.57,.07);rect(16,.05,.76,1.56)
for cx in [15.02,16.98]:
 for cy in [-.895,-.265,.365,.995]:ellipse(cx,cy,.31,.30)
for cy in [-1.72,1.82]:ellipse(16,cy,.30,.31)
for cy in [-2.47,2.47]:rect(14.10,cy,.34,.24)
# Keep the original room envelope, update only furniture collision footprints.
bits=np.packbits(safe.ravel(),bitorder='little');nav={'x0':x0,'y0':y0,'step':step,'nx':nx,'ny':ny,'mask':base64.b64encode(bits.tobytes()).decode(),'radius':r,'safeCells':int(safe.sum()),'basis':'Room envelope inherited; furniture footprints follow the image-estimated reference revision'}
spawn=[9.2,0,5.57];ix=round((spawn[0]-x0)/step);iy=round((spawn[1]-y0)/step);assert safe[iy,ix];queue=deque([(iy,ix)]);seen={(iy,ix)}
while queue:
 a,b=queue.popleft()
 for j,k in [(a+1,b),(a-1,b),(a,b+1),(a,b-1)]:
  if 0<=j<ny and 0<=k<nx and safe[j,k]and(j,k)not in seen:seen.add((j,k));queue.append((j,k))
assert len(seen)>safe.sum()*.7,(len(seen),safe.sum())
# Exclude isolated slivers so reset/focus cannot land in an unreachable pocket.
connected=np.zeros_like(safe)
for a,b in seen:connected[a,b]=True
nav['mask']=base64.b64encode(np.packbits(connected.ravel(),bitorder='little').tobytes()).decode();nav['safeCells']=nav['reachableCells']=len(seen);(R/'work/reference/navigation.json').write_text(json.dumps(nav));print('Navigation:',len(seen),'safe cells, all reachable from aft entry')
