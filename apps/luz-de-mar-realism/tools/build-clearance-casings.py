"""Recess the two stair skins and apply the explicitly selected access adjustment.

The intersection of the two original side profiles is used, so the replacement
cannot fill a doorway or create a new obstruction in the preserved stair route.
The local tread notch and opposite-side continuous rail are documented below.
All coordinates here are published WebGL metres, not surveyed dimensions.
"""
from pathlib import Path
import os,json,hashlib
import numpy as np
from shapely import union_all,constrained_delaunay_triangles
from shapely.geometry import Polygon,box,MultiPoint

R=Path(__file__).resolve().parents[1]
W=Path(os.environ.get('ELECTRICAL_AUTHORING_WORK',R/'work/electrical-clearance-r03'))
M=R/'work/machinery-r11/snapshot'
m=json.loads((M/'machinery.json').read_text());blob=(M/'machinery.bin').read_bytes()
v=np.frombuffer(blob,dtype='<f4',count=m['vertices']*11).reshape(-1,11)[:,:3]
t=np.frombuffer(blob,dtype='<u4',offset=m['vertexBytes'],count=m['triangles']*3).reshape(-1,3)
ids=np.frombuffer(blob,dtype='<u4',offset=m['vertexBytes']+m['indexBytes'],count=m['triangles'])
selected=['LD/service-route/123','LD/service-route/124']
result=[]
# The frozen column's rear bound is -10.40893m. A 20mm allowance survives the
# runtime position quantization while exceeding the required10mm separation.
rear=-10.430
for name in selected:
 p=next(i for i,p in enumerate(m['parts'])if p['id']==name);tri=v[t[ids==p]]
 tail=tri[tri[:,:,2].max(1)<-10.44];xx,counts=np.unique(np.round(tail[:,:,0].ravel(),6),return_counts=True)
 planes=sorted(xx[np.argsort(counts)[-2:]])
 profiles=[]
 for x in planes:
  polys=[Polygon(q[:,[2,1]])for q in tri if np.abs(q[:,0]-x).max()<2e-6]
  profiles.append(union_all([p for p in polys if p.area>1e-10]))
 shape=profiles[0].intersection(profiles[1]).intersection(box(-100,-100,rear,100)).buffer(0)
 assert shape.area>.1 and shape.is_valid,(name,shape)
 assert profiles[0].covers(shape)and profiles[1].covers(shape),'Replacement exceeds original side profiles'
 parts=list(shape.geoms)if shape.geom_type=='MultiPolygon'else[shape]
 for number,poly in enumerate(parts):
  vertices=[];faces=[];lookup={}
  def vertex(x,z,y):
   p=(round(float(x),7),round(float(y),7),round(float(z),7))
   if p not in lookup:lookup[p]=len(vertices);vertices.append(p)
   return lookup[p]
  for q in constrained_delaunay_triangles(poly).geoms:
   assert poly.covers(q)
   yz=list(q.exterior.coords)[:3]
   for x,reverse in [(planes[0],False),(planes[1],True)]:
    f=[vertex(x,z,y)for z,y in yz];faces.append(f[::-1]if reverse else f)
  for ring in [poly.exterior,*poly.interiors]:
   points=list(ring.coords)
   for a,b in zip(points,points[1:]):faces.append([vertex(planes[0],*a),vertex(planes[1],*a),vertex(planes[1],*b),vertex(planes[0],*b)])
  result.append({'id':'CLEARANCE/'+name.rsplit('/',1)[-1]+'/'+str(number),'sourceID':name,'vertices':vertices,'faces':faces,'webBounds':[np.min(vertices,0).tolist(),np.max(vertices,0).tolist()],'profileArea':poly.area,'retainedOriginalDoorVoids':len(poly.interiors),'closedByConstruction':True})
def source_triangles(name):
 p=next(i for i,p in enumerate(m['parts'])if p['id']==name);return v[t[ids==p]]
# The user selected full visibility with minimal functional-access changes.
# Notch only the conflicting corner of tread8; retain its original elevation
# and a continuous300x230mm contact patch. The original viewer route is unchanged.
step=source_triangles('LD/service-route/92');lo=step.min((0,1));hi=step.max((0,1));footprint=union_all([Polygon(q[:,[0,2]])for q in step if Polygon(q[:,[0,2]]).area>1e-10]).buffer(0)
e=json.loads((W/'clearance-evidence.json').read_text());cams=[np.array([p['position'][1]*7.47/7.6,p['position'][2]-2.01,p['position'][0]*35.23/36-17.615])for p in [e['poses'][0],*e['poses'][-2:]]];reference=np.array([0,1.17,9.15*35.23/36-17.615]);target_z=-10.290;cuts=[]
for c in e['controlMasks']['controls']:
 u,y=c['center'];rect=[1854,y-68,2029,y+50]if c['kind']=='large'else[1854,y-57,2029,y+34];x0,y0,x1,y1=rect;quad=[]
 for xx,yy in [(x0,y0),(x1,y0),(x1,y1),(x0,y1)]:
  depth=reference[2]-target_z;quad.append(np.array([reference[0]+(xx/1024-1)*depth,reference[1]+(1-yy/1024)*depth,target_z]))
 for cam in cams:
  points=[]
  edges=[(cam,q)for q in quad]+list(zip(quad,quad[1:]+quad[:1]))
  for height in [lo[1],hi[1]]:
   for a,b in edges:
    if abs(b[1]-a[1])<1e-12:continue
    f=(height-a[1])/(b[1]-a[1])
    if 0<=f<=1:
     p=a+f*(b-a);points.append((p[0],p[2]))
  if len(points)>=3:cuts.append(MultiPoint(points).convex_hull.buffer(.012))
# Include the unchanged column shell itself, rather than allowing a stair
# corner to remain physically inside the enclosure after the caption is clear.
cuts.append(box(1.0794,-10.4210,1.8129,-10.2887))
# The thin right perimeter joint is ahead of the broad enclosure face. Keep a
# local12mm clearance around that joint instead of removing a full tread strip.
cuts.append(box(1.686,-10.283,1.715,-10.256))
notched=footprint.difference(union_all(cuts)).buffer(0)
contact=box(hi[0]-.310,hi[2]-.240,hi[0]-.010,hi[2]-.010)
assert notched.covers(contact),('Usable tread contact patch lost',notched.area,contact.bounds)
vertices=[];faces=[];materials=[];lookup={}
def sv(x,y,z):
 p=(round(float(x),7),round(float(y),7),round(float(z),7))
 if p not in lookup:lookup[p]=len(vertices);vertices.append(p)
 return lookup[p]
parts=list(notched.geoms)if notched.geom_type=='MultiPolygon'else[notched]
for poly in parts:
 for q in constrained_delaunay_triangles(poly).geoms:
  assert poly.covers(q)
  points=list(q.exterior.coords)[:3]
  for height,reverse,material in [(lo[1]-.001,False,'paint'),(hi[1],True,'service-wood')]:
   f=[sv(x,height,z)for x,z in points];faces.append(f[::-1]if reverse else f);materials.append(material)
 for ring in[poly.exterior,*poly.interiors]:
  points=list(ring.coords)
  for a,b in zip(points,points[1:]):faces.append([sv(a[0],lo[1]-.001,a[1]),sv(b[0],lo[1]-.001,b[1]),sv(b[0],hi[1],b[1]),sv(a[0],hi[1],a[1])]);materials.append('service-wood')
result.append({'id':'CLEARANCE/step-8','sourceID':'LD/service-route/92','vertices':vertices,'faces':faces,'faceMaterials':materials,'material':'service-wood','closedByConstruction':True,'originalTopElevation':float(hi[1]),'retainedTopElevation':float(hi[1]),'originalArea':footprint.area,'retainedArea':notched.area,'preservedContactPatchXZ':list(contact.bounds),'contactPatchMetres':[.3,.23]})
selected+=['LD/service-route/92','LD/service-route/93']
# Place the continuous rail on the opposite side of the same flight, retaining
# its complete height/longitudinal path and mirroring its three wall brackets.
rail=source_triangles('LD/service-route/127');center=float((rail[:,:,0].min()+rail[:,:,0].max())/2);new_center=2.010
for name in ['LD/service-route/127','LD/service-route/129','LD/service-route/130','LD/service-route/131']:
 tris=source_triangles(name);verts=[];ff=[];keys={}
 for q in tris:
  face=[]
  for p in q:
   x,y,z=map(float,p);x=x+new_center-center if name.endswith('/127')else new_center+center-x;k=(round(x,7),round(y,7),round(z,7))
   if k not in keys:keys[k]=len(verts);verts.append(k)
   face.append(keys[k])
  ff.append(face if name.endswith('/127')else face[::-1])
 result.append({'id':'CLEARANCE/'+name.rsplit('/',1)[-1],'sourceID':name,'vertices':verts,'faces':ff,'material':'metal','heightAndLongitudinalPathUnchanged':True,'originalCenterX':float(center),'newCenterX':new_center})
 selected.append(name)
# Close the two contact gaps exposed by moving the rail. These are small
# inferred digital mounting spacers, not hardware identified in the panorama.
# Their targets are the new outer skin and the retained main-deck stair frame;
# no bracket is attached to an electrical cabinet or generator.
for name,p,q,target,width in [
 ('129-spacer',[2.0542302,.8942692,-11.7159319],[2.0542302,.8942692,-11.6944027],'CLEARANCE/123/0',[.022,.020,.008]),
 ('131-standoff',[2.0482843,1.8786231,-9.835042],[2.0482843,1.8199999,-9.835042],'MD_DCK_001/stairs/stair-opening',[.024,.008,.024]),
 ('131-sleeve',[2.0149827,1.926,-9.8428707],[2.0145779,1.926,-9.8522596],'CLEARANCE/127',[.020,.020,.008]),
]:
 aa=np.minimum(p,q)-np.array(width)/2;bb=np.maximum(p,q)+np.array(width)/2
 verts=[[float(x),float(y),float(z)]for x,y,z in [(aa[0],aa[1],aa[2]),(bb[0],aa[1],aa[2]),(bb[0],bb[1],aa[2]),(aa[0],bb[1],aa[2]),(aa[0],aa[1],bb[2]),(bb[0],aa[1],bb[2]),(bb[0],bb[1],bb[2]),(aa[0],bb[1],bb[2])]]
 result.append({'id':'CLEARANCE/'+name,'sourceID':'inferred-digital-mount/'+name,'vertices':verts,'faces':[[0,3,2,1],[4,5,6,7],[0,1,5,4],[1,2,6,5],[2,3,7,6],[3,0,4,7]],'material':'metal','closedByConstruction':True,'classification':'Inferred digital spacer closing the adjusted rail support; not observed VR hardware','connects':['CLEARANCE/'+name.split('-')[0],target],'sourceContact':p,'targetContact':q})
report={'version':3,'id':'electrical-clearance-r03','replacedIDs':selected,'rearPlaneWebZ':rear,'minimumRequiredClearanceMetres':.01,'sourceSHA256':hashlib.sha256(blob).hexdigest(),'method':'Recessed closed stair skins, a locally notched tread with unchanged 300 x 230 mm contact patch/elevation, and a continuous opposite-side rail with closed mounting contacts.','userScope':'Full visibility with minimal functional-access adjustments; user selected this option explicitly.','casings':result}
(W/'casings.json').write_text(json.dumps(report,indent=2)+'\n');print('CLOSED RECESSED SKINS',len(result),sum(len(p['faces'])for p in result),'faces',rear,flush=True)
