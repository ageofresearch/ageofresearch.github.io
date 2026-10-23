"""Right R-cube contour, fold and fastener observations (native 2048 pixels)."""
controls=json.loads((R/'tools/left-engine-grid-controls.json').read_text())
targets={
'jacket':[[1088,1085],[1084,1215],[1060,1350],[1018,1452],[962,1490],[918,1530],[867,1590],[805,1635],[704,1660],[588,1674],[476,1723],[419,1687],[412,1600],[407,1506],[410,1414],[442,1350],[495,1311],[550,1301],[602,1307],[626,1324],[642,1340],[650,1316],[666,1245],[680,1162],[685,1095],[680,1052],[891,1000]],
'exhaust':[[1068,937],[1065,905],[1062,860],[1053,821],[1038,780],[998,688],[939,619],[854,570],[766,531],[681,505],[610,493],[539,494],[398,476],[248,484],[148,492],[48,536],[1,587],[1,817],[28,850],[108,891],[248,930],[358,956],[458,954],[568,907],[668,896],[878,923]]}
fields={}
for group,target in targets.items():
 source_pixels=np.array(controls['groups'][group]['targetPixels']);source_pixels[:,0]=2048-source_pixels[:,0];points=source_pixels/2048;target=np.array(target)/2048;n=len(points);dist=np.linalg.norm(points[:,None]-points[None,:],axis=2);kernel=dist**2*np.log(np.maximum(dist,1e-10));P=np.c_[np.ones(n),points];system=np.block([[kernel+np.eye(n)*2e-6,P],[P.T,np.zeros((3,3))]]);solution=np.linalg.solve(system,np.r_[target-points,np.zeros((3,2))]);fields[group]=(points,solution[:n],solution[n:])
def project(o):
 xyz=np.array([source(v.co)for v in o.data.vertices]);depth=-xyz[:,1]*SY;uv=np.c_[1024*(1-(xyz[:,0]-9.15)*SX/depth),1024*(1-(xyz[:,2]-3.18)/depth)];return xyz,depth,uv
for o in parts:
 name=o.name.removeprefix('RVR | ');group=None;taper=False
 if name in ['black main swept exhaust','exhaust sewn end panel','main exhaust textile band']or name.startswith(('main band stitched edge','main band hook')):group='exhaust'
 elif name.startswith(('black downward branch','exhaust bracket','exhaust standoff','exhaust flange fastener')):group='exhaust';taper=True
 elif o.get('assembly')=='jacket'or name=='upper black fastening cuff'or name.startswith(('R13 fitted padded seam','R13 fitted cuff','R13 cuff binding','R13 seated cuff','cuff perimeter')):group='jacket'
 if not group:continue
 xyz,depth,uv=project(o);points,w,a=fields[group];u=uv/2048;d=np.linalg.norm(u[:,None]-points[None,:],axis=2);shift=(d*d*np.log(np.maximum(d,1e-10)))@w+np.c_[np.ones(len(u)),u]@a
 if taper:shift*=np.clip((xyz[:,2]-3.04)/.35,0,1)[:,None]
 u+=shift;xyz[:,0]=9.15+(1-u[:,0]*2)*depth/SX;xyz[:,2]=3.18+(1-u[:,1]*2)*depth
 for v,p in zip(o.data.vertices,xyz):v.co=pt(p)
 o.data.update();observed(o,'r',targets[group],'right contour registration; per-vertex depth inferred')
# Cloth is smooth across tessellation. Repeated left crease relief is softened
# before the right seam/gather paths are applied, rather than copying its folds.
cloth=S.objects['RVR | aluminized padded elbow']
remove_where(lambda o:o.name=='RVR | upper black fastening cuff')
cuff=tube('upper black fastening cuff',[[9.30,-1.05,3.285],[9.30,-1.05,3.21],[9.30,-1.05,3.115]],.222,'strap','closures',96,24)
for o in [cloth,cuff]:
 bm=bmesh.new();bm.from_mesh(o.data)
 for _ in range(10):bmesh.ops.smooth_vert(bm,verts=[v for v in bm.verts if not v.is_boundary],factor=.35,use_axis_x=True,use_axis_y=True,use_axis_z=True)
 bm.to_mesh(o.data);bm.free();o.data.normals_split_custom_set([(0,0,0)]*len(o.data.loops));o.data.set_sharp_from_angle(angle=math.pi)
 for f in o.data.polygons:f.use_smooth=True
 o.data.update()
folds=[
 ([[708,1060],[758,1118],[815,1154],[899,1162],[1008,1154],[1074,1166]],18,.023),
 ([[694,1136],[731,1192],[813,1232],[894,1245],[1002,1251],[1078,1242]],15,.024),
 ([[679,1209],[700,1268],[759,1310],[858,1346],[947,1351],[1061,1320]],13,.020),
 ([[658,1298],[677,1355],[736,1391],[838,1415],[941,1420],[1033,1382]],16,.023),
 ([[642,1374],[678,1433],[744,1464],[847,1490],[958,1468]],11,.017),
 ([[478,1337],[494,1391],[485,1470],[484,1575],[504,1659]],12,.027),
 ([[535,1343],[550,1424],[558,1520],[578,1629],[600,1670]],13,.030),
 ([[599,1416],[617,1490],[645,1584],[686,1646]],11,.028),
 ([[665,1470],[730,1530],[784,1577],[819,1619]],13,.022),
 ([[911,1501],[873,1534],[855,1586],[816,1623]],9,.018)]
def distance_to_path(uv,path):
 best=np.full(len(uv),1e9)
 for a,b in zip(np.array(path,float),np.array(path,float)[1:]):
  t=np.clip(((uv-a)*(b-a)).sum(1)/max(((b-a)**2).sum(),1e-9),0,1);best=np.minimum(best,np.linalg.norm(uv-a-t[:,None]*(b-a),axis=1))
 return best
def crease(o,paths):
 xyz,depth,uv=project(o);normals=np.array([v.normal[:]for v in o.data.vertices]);front=np.clip(normals[:,0],0,1);change=np.zeros(len(uv))
 for path,width,amplitude in paths:
  d=distance_to_path(uv,path);change+=amplitude*np.exp(-.5*(d/width)**2)-amplitude*.40*np.exp(-.5*((d-width*1.8)/(width*.75))**2)
 ratio=(depth-change*front)/depth;xyz[:,0]=9.15+(xyz[:,0]-9.15)*ratio;xyz[:,1]*=ratio;xyz[:,2]=3.18+(xyz[:,2]-3.18)*ratio
 for v,p in zip(o.data.vertices,xyz):v.co=pt(p)
 o.data.update();observed(o,'r',[p for path,w,a in paths for p in path],'observed right crease paths; relief amplitude inferred')
crease(cloth,folds)
crease(cuff,[([[718,920],[785,948],[907,967],[1060,983]],10,.012),([[714,970],[807,995],[913,1025],[1078,1036]],11,.015)])
remove_where(lambda o:any(x in o.name for x in ['R13 fitted padded seam','R13 fitted cuff webbing','R13 cuff binding','R13 seated cuff buckle','cuff perimeter sewn','R13 supported service line','R13 service line union']))
origin=pt([9.15,0,3.18])
def bvh(o):return BVHTree.FromPolygons([v.co for v in o.data.vertices],[f.vertices[:]for f in o.data.polygons])
def skin(pixel,surface,offset=.0015):
 u=(pixel[0]-1024)/1024;v=(1024-pixel[1])/1024;hit,n,*_=surface.ray_cast(origin,Vector((-1,u,v)).normalized(),8);return source(hit+(origin-hit).normalized()*offset)if hit is not None else None
cloth_surface=bvh(cloth)
for v in cuff.data.vertices:
 direction=(v.co-origin).normalized()
 if v.normal.dot(direction)>-.08:continue
 hit,n,i,d=cloth_surface.ray_cast(origin,direction,8)
 if hit is not None and(v.co-origin).length>d-.012:v.co=origin+direction*(d-.012)
cuff.data.update()
surface=bvh(cuff)
# Three independent satin straps, their stitched edges and bent wire buckles.
for number,path in enumerate([[[742,934],[821,941],[945,962],[1074,979]],[[749,992],[835,1001],[957,1021],[1080,1038]],[[748,1026],[835,1042],[958,1060],[1080,1077]]]):
 samples=[]
 for a,b in zip(path,path[1:]):
  for t in np.linspace(0,1,max(3,int(math.dist(a,b)/2)),endpoint=False):samples.append(np.array(a)*(1-t)+np.array(b)*t)
 samples.append(np.array(path[-1]));vs=[];edges=[[],[]]
 for i,pixel in enumerate(samples):
  tangent=samples[min(i+1,len(samples)-1)]-samples[max(0,i-1)];normal=np.array([-tangent[1],tangent[0]])/np.linalg.norm(tangent)
  for across in [-1,-.5,0,.5,1]:
   p=skin(pixel+normal*across*4,surface,.008)
   if p is None:raise RuntimeError('Right strap does not seat on cuff '+str(number)+' '+str(pixel))
   vs.append(pt(p))
   if across in[-1,1]:edges[int(across==1)].append(p)
 faces=[(i*5+j,i*5+j+1,(i+1)*5+j+1,(i+1)*5+j)for i in range(len(samples)-1)for j in range(4)];o=observed(mesh('right fitted cuff strap '+str(number),vs,faces,'strap','closures',True),'r',path);solid=o.modifiers.new('Webbing thickness','SOLIDIFY');solid.thickness=.001
 for k,edge in enumerate(edges):tube(f'right cuff stitched edge {number} {k}',edge,.0009,'aluminized','closures',6,1)
 # Double loop and rounded rectangular tongue are visibly separate in the VR.
 center=np.array(path[0])
 for k,poly in enumerate([[[-15,-11],[-24,-11],[-30,-2],[-26,11],[-15,11]],[[0,-10],[22,-10],[22,10],[0,10],[0,-10]]]):
  points=[skin(center+d,surface,.009)for d in poly]
  if all(p is not None for p in points):tube(f'right cuff double buckle {number} {k}',points,.0017,'steel','closures',10,4)
# Diagonal lower seam and fastening loops follow the right padded elbow.
for number,path in enumerate([[[697,1454],[767,1476],[850,1504],[937,1480],[1032,1439]],[[714,1466],[750,1530],[807,1574],[867,1598]],[[492,1334],[510,1430],[508,1522],[513,1654]],[[546,1322],[571,1425],[584,1550],[610,1667]]]):
 points=[]
 for a,b in zip(path,path[1:]):
  for t in np.linspace(0,1,12,endpoint=False):
   p=skin(np.array(a)*(1-t)+np.array(b)*t,cloth_surface)
   if p is not None:points.append(p)
 if len(points)>3:observed(tube('right padded stitched seam '+str(number),points,.0013,'strap','closures',6,1),'r',path)
for number,pix in enumerate([[1028,1196],[1065,1263],[1021,1364],[1010,1405],[866,1570],[798,1622]]):
 points=[skin(np.array(pix)+d,cloth_surface,.004)for d in [[-9,-4],[-3,-7],[6,0],[2,7],[-9,4],[-9,-4]]]
 if all(p is not None for p in points):tube('right padded seam fastener '+str(number),points,.0015,'steel','closures',8,2)
# Preserve smooth textile normals; keep the original left materials untouched.
for o in parts:
 if o.get('assembly')in['jacket']or o.data.materials[0].get('family')in['strap','black-insulation']:
  o.data.set_sharp_from_angle(angle=math.pi);o.data.normals_split_custom_set([(0,0,0)]*len(o.data.loops))
  for f in o.data.polygons:f.use_smooth=True
(W/'right-observations.json').write_text(json.dumps({'cubeSize':2048,'face':'r','contours':targets,'folds':folds,'cameraSource':[9.15,0,3.18],'note':'Traced observed paths; depths inferred, no claim of measured internals or pixel-perfect acceptance'},indent=2)+'\n')
