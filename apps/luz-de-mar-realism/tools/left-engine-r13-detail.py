"""R13 editable surface reconstruction in the fixed original panorama frame.

Pixel observations constrain visible surfaces. Depth, wall thickness and hidden
backs are explicitly inferred; no photographic pixels enter the render assets.
Executed inside build-left-engine.py before evaluated meshes/UVs are produced.
"""
from mathutils.bvhtree import BVHTree

def remove_where(predicate):
 for o in list(parts):
  if predicate(o):
   parts.remove(o);bpy.data.objects.remove(o,do_unlink=True)

def observed(o,face,pixels,kind='observed visible feature; depth inferred'):
 o['gridObservation']=json.dumps({'face':face,'pixels':pixels,'classification':kind,'tileSize':32})
 return o

def ray_plane(face,pixel,depth=.95):
 if face=='l':return grid_point(face,pixel,depth*SY)
 # Constant source Y plane; the image ray determines X and Z.
 return grid_point(face,pixel,depth*SY/(1-pixel[0]/1024))

def plate(name,face,pixels,depth,thickness,group='covers',material='enamel',radius=.008):
 front=[ray_plane(face,p,depth) for p in pixels]
 back=[[x,y+thickness,z] for x,y,z in front];n=len(front)
 faces=[tuple(range(n-1,-1,-1)),tuple(range(n,2*n))]+[(i,(i+1)%n,(i+1)%n+n,i+n)for i in range(n)]
 o=bevel(closed_solid(mesh(name,[pt(p)for p in front+back],faces,material,group)),radius,4)
 return observed(o,face,pixels)

def traced_line(name,face,pixels,depth,radius=.006,material='enamel',group='hoses'):
 return observed(tube(name,[ray_plane(face,p,depth)for p in pixels],radius,material,group,12,5),face,pixels)

# The original derivative's rocker surfaces intersected its long overlay cases.
# Remove those visible nominal surfaces from this exterior only. The R03 source,
# mechanism and right engine are never modified. New panel count is observed.
remove_where(lambda o: (o.get('sourcePart') and o['assembly']=='covers') or
 o.name.removeprefix('LVR | ') in ['intake white connector','inner sloping charge casing'] or
 o.name.startswith('LVR | bank -1 cover'))

# Intake casting: broad stepped casing, ribbed face, short round seated neck.
# It is not a long cylindrical pipe. Face silhouette observed in F17..F24.
intake_outline=[[297,1288],[389,1254],[476,1238],[546,1253],[592,1286],
 [615,1315],[618,1350],[590,1392],[548,1424],[503,1450],[461,1480],
 [404,1509],[350,1525],[311,1522],[292,1495],[280,1439],[279,1360]]
plate('R13 stepped intake casting','f',intake_outline ,.78,.25,'intake','cast',.019)
traced_line('R13 intake upper split flange','f',[[299,1304],[388,1270],[476,1255],[543,1269],[580,1295]],.772,.006,'enamel','intake')
traced_line('R13 intake lower flange','f',[[314,1510],[352,1514],[404,1498],[461,1469],[501,1440],[547,1413],[588,1380]],.771,.005,'enamel','intake')
for i,poly in enumerate([
 [[342,1405],[357,1403],[369,1511],[350,1521]],
 [[434,1358],[447,1354],[460,1482],[444,1489]],
 [[499,1313],[510,1310],[517,1443],[502,1451]],
 [[568,1287],[581,1293],[591,1387],[576,1399]]]):
 plate('R13 intake raised rib '+str(i),'f',poly,.766,.035,'intake','enamel',.006)
for i,pix in enumerate([[362,1407],[445,1361],[508,1320],[580,1299],[600,1340]]):
 p=ray_plane('f',pix,.758);bolt('R13 intake rib fastener '+str(i),p,'intake',axis='y',r=.007)
for i,pix in enumerate([[370,1512],[480,1470]]):
 p=ray_plane('f',pix,.78);cylinder('R13 intake cast support '+str(i),[p[0],p[1],p[2]-.14],p,.036,'enamel','intake',24)

tube('R13 intake short seated neck',[[11.14,.94,2.61],[11.33,1.01,2.60],[11.47,1.05,2.58]],.145,'enamel','intake',48,8)

# Eight separately cast bank covers. The observed top edges and recesses follow
# F-face pixels; the outboard bank remains an inferred symmetric installation.
bank_edges=[(356,1655),(435,1567),(499,1493),(553,1433),(600,1379),(643,1331),(680,1289),(714,1250),(744,1215)]
for i,(a,b) in enumerate(zip(bank_edges,bank_edges[1:])):
 x0,y0=a;x1,y1=b;width=35-1.7*i
 poly=[[x0,y0],[x1,y1],[x1+width,y1+35-i*2],[x0+width,y0+42-i*2]]
 o=plate('R13 inner bank cover '+str(i),'f',poly,.82,.075,'covers','enamel',.008)
 # Shallow separate land, gasket and recessed edge (no overlapping coplanar skin).
 traced_line('R13 bank cover joint '+str(i),'f',[poly[0],poly[1]],.814,.0018,'rubber','covers')
 cx=(x0+x1)/2;cy=(y0+y1)/2
 plate('R13 bank cover raised pad '+str(i),'f',[[cx+10,cy+9],[cx+19,cy-1],[cx+26,cy+5],[cx+17,cy+15]],.809,.012,'covers','enamel',.002)
 p=ray_plane('f',[cx+12,cy+12],.804);bolt('R13 bank cover recessed fixing '+str(i),p,'covers',axis='y',r=.0045)

# Long side cover and its narrow seam below the eight lids; these are a smooth
# long casting in the VR, rather than the diagonal plate repetition of R03.
plate('R13 longitudinal lower rocker casing','f',[[360,1731],[777,1298],[791,1321],[412,1870],[341,1960],[319,1945]],.78,.07,'covers','enamel',.012)
traced_line('R13 long lower rocker seam','f',[[352,1825],[485,1660],[606,1503],[780,1310]],.773,.002,'rubber','covers')
traced_line('R13 long lower rocker top lip','f',[[349,1745],[485,1593],[630,1434],[775,1307]],.77,.005,'enamel','covers')

# Near accessories: raised recessed front cover, perimeter screws, three
# non-identical ribs, cable conduit and service pipes with seated unions.
cover=[[1652,1385],[1700,1362],[1769,1375],[1797,1416],[1798,1559],[1722,1544],[1660,1517]]
plate('R13 near accessory removable cover','l',cover,.935,.028,'casting','enamel',.008)
for i,pix in enumerate([[1667,1400],[1755,1390],[1777,1431],[1777,1528],[1680,1500]]):
 p=ray_plane('l',pix,.925);bolt('R13 near cover fixing '+str(i),p,'casting',axis='y',r=.008)
for i,poly in enumerate([
 [[1810,1385],[1831,1392],[1850,1591],[1828,1586]],
 [[1934,1405],[1954,1413],[1983,1611],[1958,1606]],
 [[2020,1426],[2036,1431],[2047,1590],[2029,1583]]]):
 plate('R13 near casting ridge '+str(i),'l',poly,.945,.028,'casting','enamel',.007)
for i,(face,pix,dep,rad) in enumerate([
 ('l',[[1642,1500],[1630,1482],[1615,1483],[1610,1506],[1621,1525],[1680,1530]],.916,.004),
 ('l',[[1796,1382],[1840,1389],[1869,1420],[1872,1464],[1880,1510],[1890,1552],[1970,1575]],.91,.006),
 ('f',[[38,1339],[97,1320],[148,1325],[180,1350],[196,1380]],.9,.007),
 ('f',[[115,1544],[151,1545],[168,1561],[156,1580],[115,1585]],.88,.006),
 ('f',[[375,1601],[351,1580],[339,1590],[346,1625],[369,1665]],.76,.006),
 ('f',[[405,1678],[378,1683],[353,1720],[341,1748],[343,1761]],.75,.006)]):
 traced_line('R13 supported service line '+str(i),face,pix,dep,rad)
 for j,pp in enumerate([pix[0],pix[-1]]):
  p=ray_plane(face,pp,dep);bolt(f'R13 service line union {i} {j}',p,'hoses',axis='y',r=rad*1.7)

# Corrugated electrical conduit, observed diagonal across the near casting.
line=[[1810,1360],[1850,1350],[1891,1355],[1910,1375],[1920,1450],[1930,1510],[1970,1532]]
conduit=traced_line('R13 near corrugated conduit','l',line,.90,.008,'enamel')
# Rings follow the conduit centreline; fine corrugations are baked normals at LOD.
for i in range(1,6):
 p=ray_plane('l',line[i],.90);cylinder('R13 conduit seated connector '+str(i),[p[0],p[1]-.003,p[2]-.014],[p[0],p[1]-.003,p[2]+.014],.011,'enamel','hoses',12)

# Aluminized cover: deform along camera-depth rays so traced outer silhouette
# remains stable. Non-periodic fold paths come from visible creases in L tiles.
# The ridges/valleys are surface relief, not photographic color painted in.
folds=[
 ([[970,1160],[1030,1190],[1110,1145],[1210,1090],[1330,1065]],18,.015),
 ([[991,1250],[1060,1270],[1140,1232],[1240,1165],[1375,1115]],21,.027),
 ([[1015,1322],[1085,1350],[1180,1303],[1300,1221],[1380,1180]],17,.025),
 ([[1040,1390],[1120,1414],[1250,1370],[1380,1302]],14,.019),
 ([[1070,1455],[1160,1478],[1285,1447],[1420,1382]],11,.017),
 ([[1130,1510],[1260,1515],[1400,1454]],9,.012),
 ([[1170,1570],[1280,1545],[1405,1447],[1465,1343]],15,.033),
 ([[1240,1620],[1370,1580],[1450,1455],[1488,1343]],12,.028),
 ([[1350,1665],[1440,1590],[1500,1490],[1518,1360]],10,.023),
 ([[1490,1670],[1510,1550],[1550,1440],[1560,1370]],12,.017)]
cloth=S.objects['LVR | aluminized padded elbow']
def closest_segments(uv,path):
 p=np.array(path,float);best=np.full(len(uv),1e9);progress=np.zeros(len(uv))
 for a,b in zip(p,p[1:]):
  t=np.clip(((uv-a)*(b-a)).sum(1)/((b-a)**2).sum(),0,1);d=np.linalg.norm(uv-a-t[:,None]*(b-a),axis=1);best=np.minimum(best,d)
 return best
def crease_surface(o,curves,scale=1):
 xyz=np.array([source(v.co)for v in o.data.vertices]);depth=xyz[:,1]*SY
 uv=np.c_[1024*(1+(xyz[:,0]-9.15)*SX/depth),1024*(1-(xyz[:,2]-3.18)/depth)]
 # Face-facing surface only. The opposite side has an inferred restrained finish.
 normals=np.array([v.normal[:]for v in o.data.vertices]);toward=np.clip(-normals[:,0],0,1)
 change=np.zeros(len(uv))
 for path,width,amp in curves:
  distance=closest_segments(uv,path);change+=amp*np.exp(-.5*(distance/width)**2)-amp*.48*np.exp(-.5*((distance-width*1.8)/(width*.70))**2)
 change*=toward*scale;newdepth=depth-change;ratio=newdepth/depth
 xyz[:,0]=9.15+(xyz[:,0]-9.15)*ratio;xyz[:,1]*=ratio;xyz[:,2]=3.18+(xyz[:,2]-3.18)*ratio
 for v,p in zip(o.data.vertices,xyz):v.co=pt(p)
 o.data.update();observed(o,'l',[p for path,w,a in curves for p in path],'observed fold paths; relief depth inferred')
crease_surface(cloth,folds)

# Remove straight longitudinal seams inherited from the generic tube. Place the
# actual transverse/diagonal seam and bindings onto the sculpted cloth by ray.
remove_where(lambda o:o.name.startswith(('LVR | longitudinal sewn seam','LVR | cuff strap stitched edge')))
cloth_bvh=BVHTree.FromPolygons([v.co for v in cloth.data.vertices],[p.vertices[:]for p in cloth.data.polygons])
origin=pt([9.15,0,3.18])
def on_skin(pixel,bvh,offset=.0015):
 u=(pixel[0]-1024)/1024;v=(1024-pixel[1])/1024;direction=Vector((1,-u,v)).normalized();hit,n,*_=bvh.ray_cast(origin,direction,8)
 return source(hit+n*offset)if hit is not None else None
for i,path in enumerate([[[1080,1495],[1160,1523],[1260,1515],[1370,1477],[1460,1415]],[[1160,1523],[1220,1580],[1290,1600],[1400,1510]],[[1290,1600],[1360,1650],[1440,1550],[1470,1440]],[[1545,1380],[1580,1510],[1570,1640]]]):
 points=[]
 for a,b in zip(path,path[1:]):
  for t in np.linspace(0,1,10,endpoint=False):
   p=on_skin(np.array(a)*(1-t)+np.array(b)*t,cloth_bvh)
   if p is not None:points.append(p)
 if len(points)>2:observed(tube('R13 fitted padded seam '+str(i),points,.0015,'strap','closures',6,1),'l',path)

# Cuff and horizontal band receive tension folds gathered at their fasteners.
cuff=S.objects['LVR | upper black fastening cuff']
crease_surface(cuff,[([[960,1000],[1030,1028],[1130,1005],[1230,972],[1350,932]],12,.014),([[970,1050],[1070,1060],[1160,1037],[1280,995],[1350,978]],9,.018),([[1170,1060],[1220,1090],[1240,1030],[1320,1000]],8,.020)])
# Keep the black overlap in front of the silver cover. Fold valleys must not
# drive the cuff through its underlying padded cover.
for vertex in cuff.data.vertices:
 direction=(vertex.co-origin).normalized()
 if vertex.normal.dot(direction)>-.08:continue
 hit,normal,index,distance=cloth_bvh.ray_cast(origin,direction,8)
 if hit is not None and (vertex.co-origin).length>distance-.012:vertex.co=origin+direction*(distance-.012)
cuff.data.update()
cuff_skin=BVHTree.FromPolygons([v.co for v in cuff.data.vertices],[p.vertices[:]for p in cuff.data.polygons])
remove_where(lambda o:o.name.startswith(('LVR | diagonal cuff webbing','LVR | cuff perimeter sewn binding','LVR | stainless cuff hook','LVR | R13 stitched webbing edge')))
strap_paths=[[[1040,958],[1140,954],[1240,944],[1337,930]],[[1040,1008],[1140,1000],[1240,978],[1344,978]],[[1040,1044],[1140,1032],[1240,1006],[1349,1018]]]
for number,path in enumerate(strap_paths):
 samples=[]
 for a,b in zip(path,path[1:]):
  for t in np.linspace(0,1,max(2,int(math.dist(a,b)/2)),endpoint=False):samples.append(np.array(a)*(1-t)+np.array(b)*t)
 samples.append(np.array(path[-1]));vertices=[];edge_paths=[[],[]]
 for index,pixel in enumerate(samples):
  tangent=samples[min(index+1,len(samples)-1)]-samples[max(index-1,0)];normal=np.array([-tangent[1],tangent[0]])/np.linalg.norm(tangent)
  for across in [-1,-.5,0,.5,1]:
   point=on_skin(pixel+normal*across*4.5,cuff_skin,.004)
   if point is None:point=ray_plane('l',pixel+normal*across*4.5,.83)
   vertices.append(pt(point))
   if across in [-1,1]:edge_paths[int(across==1)].append(point)
 faces=[(i*5+j,i*5+j+1,(i+1)*5+j+1,(i+1)*5+j)for i in range(len(samples)-1)for j in range(4)]
 ribbon=observed(mesh('R13 fitted cuff webbing '+str(number),vertices,faces,'strap','closures',True),'l',path)
 thick=ribbon.modifiers.new('Woven strap thickness','SOLIDIFY');thick.thickness=.001;thick.offset=0
 for edge,path_points in enumerate(edge_paths):tube(f'R13 cuff binding {number} {edge}',path_points,.0009,'aluminized','closures',6,1)
 end=np.array(path[-1]);hook=[]
 for delta in [[-4,-7],[10,-7],[14,3],[7,10],[-5,8],[-4,-7]]:
  point=on_skin(end+delta,cuff_skin,.007)
  if point is not None:hook.append(point)
 if len(hook)>3:tube('R13 seated cuff buckle '+str(number),hook,.0016,'steel','closures',8,2)

# Small cast service blocks occupy observed spaces alongside the intake case.
for i,(pixel,width,height) in enumerate([([148,1250],.045,.11),([220,1280],.038,.08),([150,1420],.048,.065)]):
 p=ray_plane('f',pixel,.93);box('R13 near service block '+str(i),p,[width,.07,height],'cast','casting',.009)
 cylinder('R13 service block upper cap '+str(i),[p[0],p[1],p[2]+height/2],[p[0],p[1],p[2]+height/2+.018],width*.40,'steel','casting',16)

# Seat the near longitudinal rail on its upright; cap its welded junction.
near=S.objects['LVR | inner longitudinal guard 0'];center=sum((v.co for v in list(near.data.vertices)[:20]),Vector())/20;p=source(center)
delta=pt([9.80,.48,p[2]])-center
for i,v in enumerate(near.data.vertices):v.co+=delta*max(0,1-(i//20)/3)
near.data.update()

# Surface families are calibrated separately from illumination. Avoid strong
# grunge normal noise on polished steel and painted castings.
for family,rough,normal_strength in [('steel',.10,.025),('aluminized',.40,.12),('strap',.27,.16),('enamel',.29,.10),('cast',.34,.14),('black-insulation',.61,.52)]:
 m=mats[family];p=m.node_tree.nodes['Principled BSDF'];p.inputs['Roughness'].default_value=rough
 for n in m.node_tree.nodes:
  if n.type=='NORMAL_MAP':n.inputs['Strength'].default_value=normal_strength

# Re-check the newly introduced closed casings after all detail construction.
solid_volumes.clear()
for o in parts:
 if not o.get('closedSolid'):continue
 bm=bmesh.new();bm.from_mesh(o.data);volume=bm.calc_volume(signed=True);closed=all(e.is_manifold for e in bm.edges);bm.free()
 if not closed or volume<=1e-12:raise RuntimeError('Invalid R13 closed casing: '+o.name)
 solid_volumes.append(volume)

print('R13 surface reconstruction:',len(parts),'editable objects',flush=True)
