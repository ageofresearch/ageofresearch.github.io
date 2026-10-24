"""Recover only cells formerly occupied by removed cabinets, then add new ones.

Unchanged closed/open masks stay authoritative elsewhere. Recovery requires
actual floor support and clearance from retained source geometry, not simply
clearing the combined bounding rectangle of the removed equipment.
"""
import json,base64,numpy as np
from pathlib import Path
R=Path(__file__).resolve().parents[1];W=R/'work/electrical-vr-r01';m=json.loads((R/'work/machinery-r11/snapshot/machinery.json').read_text());b=(R/'work/machinery-r11/snapshot/machinery.bin').read_bytes();a=json.loads((W/'authoring.json').read_text());room=json.loads((W/'baseline/luz-de-mar-realism/assets/machinery/room.json').read_text());g=room['navigation'];SX=35.23/36;SY=7.47/7.6
v=np.frombuffer(b,dtype='<f4',count=m['vertices']*11).reshape(-1,11)[:,:3];v=np.stack([(v[:,2]+17.615)/SX,v[:,0]/SY,v[:,1]+2.01],1);ix=np.frombuffer(b,dtype='<u4',offset=m['vertexBytes'],count=m['triangles']*3).reshape(-1,3);part=np.frombuffer(b,dtype='<u4',offset=m['vertexBytes']+m['indexBytes'],count=m['triangles']);tri=v[ix];removed=np.array([p['id']in a['replacedIDs']for p in m['parts']])[part]
old=tri[removed];oldlo=old[:,:,:2].min(1)-.14;oldhi=old[:,:,:2].max(1)+.14
vertical=(tri[:,:,2].max(1)>1.64)&(tri[:,:,2].min(1)<3.18)&~removed
body=tri[vertical,:,:2];lo=body.min(1)-.14;hi=body.max(1)+.14
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
def blocked(p):
 selected=body[((p>=lo)&(p<=hi)).all(1)]
 if not len(selected):return False
 if within(selected,p).any():return True
 for j in range(3):
  u=selected[:,j];w=selected[:,(j+1)%3]-u;t=np.clip(((p-u)*w).sum(1)/np.maximum((w*w).sum(1),1e-12),0,1);d=((u+w*t[:,None]-p)**2).sum(1)
  if(d<.14**2).any():return True
 return False
results={};stats={}
for state,base in [('closed',room['bulkheadAppearance']['navigation']['mask']),('open',room['bulkheadAppearance']['navigation']['openMask'])]:
 bits=np.unpackbits(np.frombuffer(base64.b64decode(base),dtype=np.uint8),bitorder='little')[:g['nx']*g['ny']].copy();before=bits.copy();recovered=0;blockednew=0
 for iy in range(g['ny']):
  for ix in range(g['nx']):
   k=iy*g['nx']+ix;p=np.array([g['x0']+ix*g['step'],g['y0']+iy*g['step']])
   affected=scope[0]<=p[0]<=scope[2] and scope[1]<=p[1]<=scope[3]
   supported=all(within(floor,p+offset).any()for offset in [np.array([0,0]),np.array([.14,0]),np.array([-.14,0]),np.array([0,.14]),np.array([0,-.14])])if affected and not bits[k]else False
   if not bits[k] and affected and supported and not blocked(p):bits[k]=1;recovered+=1
   if bits[k] and any(p[0]>r[0]-.14 and p[0]<r[2]+.14 and p[1]>r[1]-.14 and p[1]<r[3]+.14 for r in rects):bits[k]=0;blockednew+=1
 results[state]=base64.b64encode(np.packbits(bits,bitorder='little').tobytes()).decode();stats[state]={'recoveredBeforeNewObstacles':recovered,'blockedByNewAssemblies':blockednew,'changedCells':int((bits!=before).sum()),'safeCells':int(bits.sum())}
report={'mask':results['closed'],'openMask':results['open'],'radius':.14,'step':g['step'],'scopeSource':scope,'method':'Only the electrical-front bounds and immediate 30cm approach may reopen; five actual original-floor support checks and retained-triangle clearance required. New electrical and bulkhead footprints then applied together. Legacy coarse masks remain authoritative elsewhere.','changes':stats}
(W/'navigation.json').write_text(json.dumps(report,indent=2)+'\n');print('ELECTRICAL NAVIGATION',stats)
