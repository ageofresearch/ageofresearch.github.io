"""Recover only cells formerly occupied by removed cabinets, then add new ones.

Unchanged closed/open masks stay authoritative elsewhere. Recovery requires
actual floor support and clearance from retained source geometry, not simply
clearing the combined bounding rectangle of the removed equipment.
"""
import json,base64,numpy as np
from scipy.ndimage import distance_transform_edt
import os
from pathlib import Path
R=Path(__file__).resolve().parents[1];W=Path(os.environ.get('ELECTRICAL_AUTHORING_WORK',str(R/'work/electrical-vr-r01')));m=json.loads((R/'work/machinery-r11/snapshot/machinery.json').read_text());b=(R/'work/machinery-r11/snapshot/machinery.bin').read_bytes();a=json.loads((W/'authoring.json').read_text());room=json.loads((W/'baseline/luz-de-mar-realism/assets/machinery/room.json').read_text());g=room['navigation'];SX=35.23/36;SY=7.47/7.6
v=np.frombuffer(b,dtype='<f4',count=m['vertices']*11).reshape(-1,11)[:,:3];v=np.stack([(v[:,2]+17.615)/SX,v[:,0]/SY,v[:,1]+2.01],1);ix=np.frombuffer(b,dtype='<u4',offset=m['vertexBytes'],count=m['triangles']*3).reshape(-1,3);part=np.frombuffer(b,dtype='<u4',offset=m['vertexBytes']+m['indexBytes'],count=m['triangles']);tri=v[ix];removed=np.array([p['id']in a['replacedIDs']for p in m['parts']])[part]
old=tri[removed];oldlo=old[:,:,:2].min(1)-.14;oldhi=old[:,:,:2].max(1)+.14
vertical=(tri[:,:,2].max(1)>1.64)&(tri[:,:,2].min(1)<3.18)&~removed
def height_clipped(triangles,z0,z1):
 result=[]
 for original in triangles:
  polygon=list(original)
  for z,sign in[(z0,1),(z1,-1)]:
   clipped=[]
   for a,b in zip(polygon,polygon[1:]+polygon[:1]):
    a_in=(a[2]-z)*sign>=-1e-9;b_in=(b[2]-z)*sign>=-1e-9
    if a_in:clipped.append(a)
    if a_in!=b_in:clipped.append(a+(b-a)*((z-a[2])/(b[2]-a[2])))
   polygon=clipped
   if len(polygon)<3:break
  for i in range(1,len(polygon)-1):result.append([polygon[0][:2],polygon[i][:2],polygon[i+1][:2]])
 return np.array(result)
# Sloped stair closures must be clipped to actual avatar height before XY
# projection; projecting the entire triangle blocked empty space beneath it.
body=height_clipped(tri[vertical],1.64,3.18);lo=body.min(1)-.14;hi=body.max(1)+.14
low_body=height_clipped(tri[vertical],1.64,2.58);low_lo=low_body.min(1)-.14;low_hi=low_body.max(1)+.14
floor=tri[(np.abs(tri[:,:,2]-1.58).max(1)<.012),:,:2]
electrical_rects=json.loads((W/'collision-rects.json').read_text());rects=electrical_rects+json.loads((R/'work/bulkhead-vr-r01/collision-rects.json').read_text())
# Original masks also contain legacy coarse obstacles outside the evaluated
# cabinet mesh. Re-evaluate the immediate front and its 30cm approach from
# actual retained triangles; otherwise the new side approach can dead-end on
# an invisible old obstacle. No cells outside this local scope may reopen.
scope=[min(float(oldlo[:,0].min()),min(r[0]for r in electrical_rects))-.30,min(float(oldlo[:,1].min()),min(r[1]for r in electrical_rects))-.30,max(float(oldhi[:,0].max()),max(r[2]for r in electrical_rects))+.30,max(float(oldhi[:,1].max()),max(r[3]for r in electrical_rects))+.30]
def within(t,p):
 a=t[:,0];b=t[:,1];c=t[:,2];ab=b-a;bc=c-b;ca=a-c
 def cross(v,w):return v[:,0]*w[:,1]-v[:,1]*w[:,0]
 s=np.stack([cross(ab,p-a),cross(bc,p-b),cross(ca,p-c)],1);area=np.abs(cross(ab,c-a));return((s>=-1e-9).all(1)|(s<=1e-9).all(1))&(area>1e-10)
def blocked(p,low=False):
 selected=low_body[((p>=low_lo)&(p<=low_hi)).all(1)]if low else body[((p>=lo)&(p<=hi)).all(1)]
 if not len(selected):return False
 if within(selected,p).any():return True
 for j in range(3):
  u=selected[:,j];w=selected[:,(j+1)%3]-u;t=np.clip(((p-u)*w).sum(1)/np.maximum((w*w).sum(1),1e-12),0,1);d=((u+w*t[:,None]-p)**2).sum(1)
  if(d<.14**2).any():return True
 return False
results={};stats={};low_cells=np.zeros(g['nx']*g['ny'],dtype=bool)
for state,base in [('closed',room['bulkheadAppearance']['navigation']['mask']),('open',room['bulkheadAppearance']['navigation']['openMask'])]:
 bits=np.unpackbits(np.frombuffer(base64.b64decode(base),dtype=np.uint8),bitorder='little')[:g['nx']*g['ny']].copy();before=bits.copy();recovered=0;blockednew=0
 for iy in range(g['ny']):
  for ix in range(g['nx']):
   k=iy*g['nx']+ix;p=np.array([g['x0']+ix*g['step'],g['y0']+iy*g['step']])
   affected=scope[0]<=p[0]<=scope[2] and scope[1]<=p[1]<=scope[3]
   supported=all(within(floor,p+offset).any()for offset in [np.array([0,0]),np.array([.14,0]),np.array([-.14,0]),np.array([0,.14]),np.array([0,-.14])])if affected and not bits[k]else False
   in_service=6.86<=p[0]<=8.15 and 1.06<=p[1]<=2.40
   if not bits[k] and affected and supported:
    standing=not blocked(p);ducking=in_service and not blocked(p,low=True)
    if standing or ducking:bits[k]=1;recovered+=1
    if ducking and not standing:low_cells[k]=True
   if bits[k] and any(p[0]>r[0]-.14 and p[0]<r[2]+.14 and p[1]>r[1]-.14 and p[1]<r[3]+.14 for r in rects):bits[k]=0;blockednew+=1
 results[state]=base64.b64encode(np.packbits(bits,bitorder='little').tobytes()).decode();stats[state]={'recoveredBeforeNewObstacles':recovered,'blockedByNewAssemblies':blockednew,'changedCells':int((bits!=before).sum()),'safeCells':int(bits.sum())}
accessible=np.unpackbits(np.frombuffer(base64.b64decode(results['closed']),dtype=np.uint8),bitorder='little')[:g['nx']*g['ny']]|np.unpackbits(np.frombuffer(base64.b64decode(results['open']),dtype=np.uint8),bitorder='little')[:g['nx']*g['ny']];low_cells&=accessible.astype(bool)
distance=distance_transform_edt(~low_cells.reshape(g['ny'],g['nx']))*g['step'];t=np.clip((distance-.16)/.45,0,1);smooth=t*t*(3-2*t);eye=np.rint(smooth*255).astype(np.uint8)
report={'mask':results['closed'],'openMask':results['open'],'radius':.14,'step':g['step'],'scopeSource':scope,'method':'Actual floor support and retained triangles clipped to avatar height. A local under-stair service passage uses1.00m body clearance/0.90m eye height; normal standing clearance remains elsewhere. New installation obstacles are never bypassed.','changes':stats,'headroom':{'eyeHeights':base64.b64encode(eye.tobytes()).decode(),'minimumEyeHeight':.90,'maximumEyeHeight':1.60,'bodyClearance':1.00,'standingBodyClearance':1.60,'blendDistance':.45,'anticipationDistance':.16,'lowCells':int(low_cells.sum()),'scopeSource':[6.86,1.06,8.15,2.40],'note':'Digital service passage under original stairs; height inferred from retained scene geometry, not surveyed aboard.'}}
(W/'navigation.json').write_text(json.dumps(report,indent=2)+'\n');print('ELECTRICAL NAVIGATION',stats)
