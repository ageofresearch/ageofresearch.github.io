"""Sample the existing 14 cm walking capsule against the installed exterior.

Checks only already-walkable cells near the changed assembly; does not invent
new walking space or change unrelated room boundaries.
"""
import bpy,json,base64,math
from pathlib import Path
from mathutils import Vector
from mathutils.bvhtree import BVHTree
R=Path(__file__).resolve().parents[1];W=R/'work/right-engine-r01';meta=json.loads((W/'baseline-site/assets/machinery/room.json').read_text());g=meta['navigation'];bits=bytearray(base64.b64decode(g['mask']));SX=35.23/36;SY=7.47/7.6
S=bpy.context.scene;obj=S.objects['RVR installed | detail'];bvh=BVHTree.FromObject(obj,bpy.context.evaluated_depsgraph_get());radius=.14;dz=.10;effective=math.sqrt(radius*radius+(dz/2)**2);hits=[];checked=0
def pt(x,y,z):return Vector((y*SY,-(x*SX-17.615),z-2.01))
def walk(ix,iy):
 k=iy*g['nx']+ix;return bool(bits[k>>3]&(1<<(k&7)))
for iy in range(g['ny']-1):
 for ix in range(g['nx']-1):
  x=g['x0']+(ix+.5)*g['step'];y=g['y0']+(iy+.5)*g['step']
  if not(8.6<x<12.8 and -2.3<y<-.15)or not all(walk(ix+a,iy+b)for a,b in[(0,0),(1,0),(0,1),(1,1)]):continue
  checked+=1;distance=10
  for i in range(17):
   z=meta['floor']+radius+i*dz;nearest,normal,index,d=bvh.find_nearest(pt(x,y,z),effective)
   if nearest is not None:distance=min(distance,d)
  if distance<effective:hits.append({'ix':ix,'iy':iy,'source':[x,y],'nearestSurfaceMetres':distance})
report={'method':'Nearest-surface samples along a vertical walking capsule at centers of already-walkable cells; conservative vertical spacing envelope','radiusMetres':radius,'heightSampleStepMetres':dz,'sourceFloor':meta['floor'],'checkedSafeCells':checked,'conflicts':hits,'conflictsCount':len(hits)}
(W/'clearance.json').write_text(json.dumps(report,indent=2)+'\n');print('CLEARANCE',checked,'safe cells checked;',len(hits),'conflicts')
