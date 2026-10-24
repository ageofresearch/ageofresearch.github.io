"""Verify the actual generated camera route under retained source stair triangles."""
from pathlib import Path
import json,base64,numpy as np
R=Path(__file__).resolve().parents[1];W=R/'work/electrical-lower-r02';m=json.loads((R/'work/machinery-r11/snapshot/machinery.json').read_text());b=(R/'work/machinery-r11/snapshot/machinery.bin').read_bytes();a=json.loads((W/'authoring.json').read_text());room=json.loads((W/'baseline/luz-de-mar-realism/assets/machinery/room.json').read_text());nav=json.loads((W/'navigation.json').read_text());routes=json.loads((W/'navigation-connectivity.json').read_text());g=room['navigation'];h=nav['headroom'];field=np.frombuffer(base64.b64decode(h['eyeHeights']),dtype=np.uint8).reshape(g['ny'],g['nx']);SX=35.23/36;SY=7.47/7.6
v=np.frombuffer(b,dtype='<f4',count=m['vertices']*11).reshape(-1,11)[:,:3];v=np.stack([(v[:,2]+17.615)/SX,v[:,0]/SY,v[:,1]+2.01],1);ix=np.frombuffer(b,dtype='<u4',offset=m['vertexBytes'],count=m['triangles']*3).reshape(-1,3);part=np.frombuffer(b,dtype='<u4',offset=m['vertexBytes']+m['indexBytes'],count=m['triangles']);replaced=set(a['replacedIDs']+room['partition']['replacedIDs']+room['rightPartition']['replacedIDs']+room['bulkheadAppearance']['replacedIDs']);keep=np.array([p['id']not in replaced and p.get('dynamic')!='door' for p in m['parts']])[part];tri=v[ix[keep]];tri=tri[tri[:,:,2].max(1)>1.88];aa=tri[:,0,:2];ab=tri[:,1,:2]-aa;ac=tri[:,2,:2]-aa;det=ab[:,0]*ac[:,1]-ab[:,1]*ac[:,0];valid=np.abs(det)>1e-10;tri=tri[valid];aa=aa[valid];ab=ab[valid];ac=ac[valid];det=det[valid]
def eye(x,y):
 fx=np.clip((x-g['x0'])/g['step'],0,g['nx']-1);fy=np.clip((y-g['y0'])/g['step'],0,g['ny']-1);ix=int(fx);iy=int(fy);ax=fx-ix;ay=fy-iy
 f=lambda x,y:field[min(y,g['ny']-1),min(x,g['nx']-1)]/255
 t=(1-ay)*((1-ax)*f(ix,iy)+ax*f(ix+1,iy))+ay*((1-ax)*f(ix,iy+1)+ax*f(ix+1,iy+1));return h['minimumEyeHeight']+t*(h['maximumEyeHeight']-h['minimumEyeHeight'])
violations=[];clearances=[]
all_local_cells=0
for state,spec in routes['states'].items():
 bits=np.unpackbits(np.frombuffer(base64.b64decode(nav['openMask'if state=='open'else'mask']),dtype=np.uint8),bitorder='little')[:g['nx']*g['ny']].reshape(g['ny'],g['nx']);extra=[]
 for iy in range(g['ny']-1):
  for ix in range(g['nx']-1):
   x=g['x0']+(ix+.5)*g['step'];y=g['y0']+(iy+.5)*g['step']
   if 6.86<=x<=8.15 and 1.06<=y<=2.4 and bits[iy:iy+2,ix:ix+2].all():extra.append([x,y])
 all_local_cells+=len(extra)
 for point in spec['path']+extra:
  height=eye(*point)+1.58+.10
  for dx,dy in [(0,0)]+[(.14*np.cos(t)/SX,.14*np.sin(t)/SY)for t in np.linspace(0,2*np.pi,8,endpoint=False)]:
   pp=np.array(point)+[dx,dy]-aa;u=(pp[:,0]*ac[:,1]-pp[:,1]*ac[:,0])/det;vv=(ab[:,0]*pp[:,1]-ab[:,1]*pp[:,0])/det;hit=(u>=-1e-8)&(vv>=-1e-8)&(u+vv<=1+1e-8)
   zz=tri[hit,0,2]+u[hit]*(tri[hit,1,2]-tri[hit,0,2])+vv[hit]*(tri[hit,2,2]-tri[hit,0,2]);zz=zz[zz>1.88]
   if len(zz):
    clearance=float(zz.min()-height);clearances.append(clearance)
    if clearance<-.002:violations.append({'state':state,'point':point,'offset':[dx,dy],'bodyTop':height,'surfaceZ':float(zz.min()),'clearance':clearance})
report={'pass':not violations,'cameraAndBodyRadius':.14,'bodyAboveEye':.10,'dynamicDoor':'Closed source door excluded because the appearance door operates separately on its original live pivot; browser verifies the round trip and rotation.','routesChecked':sum(len(s['path'])for s in routes['states'].values()),'additionalSafeLocalCellsChecked':all_local_cells,'retainedTriangleCount':len(tri),'minimumClearanceMetres':min(clearances),'violations':violations,'method':'Barycentric intersections of all retained source triangles above the floor, at the actual bilinearly interpolated route camera and eight14cm head-ring samples; no stair geometry removed.'};(W/'service-clearance.json').write_text(json.dumps(report,indent=2)+'\n');print('SOURCE STAIR CLEARANCE',report['pass'],report['minimumClearanceMetres']);assert report['pass']
