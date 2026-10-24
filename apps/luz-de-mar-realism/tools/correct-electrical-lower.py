"""R02: reconstruct the lower electrical installation from B/R/D/L evidence.

Input is the immutable R01 editable scene. Original engine meshes, materials,
UVs and the source panorama files are never modified. Hidden depths remain
estimates; visible floor/pedestal boundaries are fitted at the frozen station.
"""
import bpy, bmesh, numpy as np, json, math, hashlib, ast, os
from pathlib import Path
from mathutils import Vector

R=Path(__file__).resolve().parents[1]
W=Path(os.environ.get('ELECTRICAL_AUTHORING_WORK',str(R/'work/electrical-lower-r02')))
W.mkdir(parents=True,exist_ok=True)
S=bpy.context.scene;SX=35.23/36;SY=7.47/7.6
E=json.loads((W/'evidence-frozen.json').read_text())
previous=json.loads((W/'input-authoring.json').read_text())
C=bpy.data.collections['EDITABLE | VR electrical'];parts=list(C.objects)
mats={m.name.split('EVR | ',1)[1]:m for m in bpy.data.materials if m.name.startswith('EVR | ')}
for path,names in [('build-electrical.py',['pt','plane','activate','register','mat','bevel','ring','pb','line','disc','frame','screw','label','pilot']),('build-left-engine.py',['mesh','closed_solid','box','cylinder','tube','bolt','filtered'])]:
 for n in ast.parse((R/'tools'/path).read_text()).body:
  if isinstance(n,ast.FunctionDef)and n.name in names:exec(compile(ast.Module(body=[n],type_ignores=[]),str(R/'tools'/path),'exec'),globals())

def material(name,rgb,rough,metal=0):
 m=bpy.data.materials.new('EVR | '+name);m.use_nodes=True;m['family']='electrical-'+name;m['electricalMaterial']=True;m['lightmap']='electrical';m['tileMetres']=.12
 p=m.node_tree.nodes['Principled BSDF'];p.inputs['Base Color'].default_value=(*rgb,1);p.inputs['Roughness'].default_value=rough;p.inputs['Metallic'].default_value=metal
 mats[name]=m
material('checker',(.78,.80,.81),.45,.18)
material('grating',(.64,.45,.23),.70)
material('brass',(.61,.43,.19),.34,.9)
material('warning-yellow',(.82,.70,.10),.4)

def remove(o):
 if o in parts:parts.remove(o)
 bpy.data.objects.remove(o,do_unlink=True)
hero=S.objects.get('EVR installed | static')
if hero:bpy.data.objects.remove(hero,do_unlink=True)
for o in list(parts):
 if o.get('assembly')=='vented'or o.name.startswith('EVR | main inferred mounting foot')or o.name=='EVR | main cross rail 1933'or(o.name.startswith('EVR | rail end ')and o.name.endswith(' 1933')):remove(o)
 else:o.hide_render=False;o.hide_viewport=False

# These legacy objects occupied the photographed pedestal and lateral controls.
meta=json.loads((R/'work/machinery-r11/snapshot/machinery.json').read_text());blob=(R/'work/machinery-r11/snapshot/machinery.bin').read_bytes()
raw=np.frombuffer(blob,dtype='<f4',count=meta['vertices']*11).reshape(-1,11)
vv=raw[:,:3];ii=np.frombuffer(blob,dtype='<u4',offset=meta['vertexBytes'],count=meta['triangles']*3).reshape(-1,3)
ids=np.frombuffer(blob,dtype='<u4',offset=meta['vertexBytes']+meta['indexBytes'],count=meta['triangles'])
extra=[p['id']for p in meta['parts']if '/tools/'in p['id']or '/generator-port/'in p['id']or p['id']in ['LD_R02/photo-layout/floor/100','LD_R02/photo-layout/floor/101','LD_R02/machinery-craft/floor/469']]
replaced=sorted(set(previous['replacedIDs']+extra))
def key(points):return tuple(sorted(tuple(round(float(x),5)for x in p)for p in points))
drop={key(vv[t])for t,p in zip(ii,ids)if meta['parts'][p]['id']in extra};removed=0
for o in list(S.objects):
 if o.type!='MESH'or o.hide_render or not o.name.startswith(('KEEP |','LD_R02 |','BVR context |','EVR context |')):continue
 keep=[f.index for f in o.data.polygons if key([(o.data.vertices[i].co.x,o.data.vertices[i].co.z,-o.data.vertices[i].co.y)for i in f.vertices])not in drop]
 if len(keep)!=len(o.data.polygons):
  clone=filtered(o,keep,'EVR context | lower R02 '+o.name);clone['variant']='context';removed+=len(o.data.polygons)-len(keep);o.hide_render=True;o.hide_viewport=True
for o in S.objects:
 if o.get('componentID')=='VR_ER/ochre-grid':o.hide_render=True
 if o.get('dynamic')=='door':o.hide_render=True

def dpoint(pixel,z):
 u,v=pixel;t=3.18-z
 return[9.15+(1024-v)*t/1024/SX,-(u-1024)*t/1024/SY,z]
def lpoint(pixel,y=2.9):
 u,v=pixel;t=y*SY
 return[9.15+(u-1024)*t/1024/SX,y,3.18+(1024-v)*t/1024]
def face_label(o,face,rect):o['referenceFace']=face;o['referenceRect']=json.dumps(rect);return o
def projected_quad(name,pixels,z,material_name,group):
 o=mesh(name,[pt(dpoint(p,z))for p in pixels],[(0,1,2,3)],material_name,group)
 if o.data.polygons[0].normal.z<0:o.data.flip_normals()
 return face_label(o,'d',[min(p[0]for p in pixels),min(p[1]for p in pixels),max(p[0]for p in pixels),max(p[1]for p in pixels)])

# Physical floor kept at the existing walk height. Replace the front slab rather
# than layering coplanar checkerplates; keep the register and other floor parts.
selected=np.flatnonzero([meta['parts'][int(i)]['id']=='LD_R02/photo-layout/floor/100'for i in ids])
vertices=[];faces=[]
for t in ii[selected]:
 start=len(vertices);vertices.extend([Vector((vv[j,0],-vv[j,2],vv[j,1]))for j in t]);faces.append(tuple(range(start,start+3)))
o=mesh('front checkerplate slab',vertices,faces,'checker','floor');o['retainedFloorCoordinates']=True
for p0,p1 in [((400,1710),(1690,1710)),((1024,1625),(1024,1750)),((280,1280),(1400,1280))]:
 tube('front floor panel joint '+str(p0),[dpoint(p0,1.582),dpoint(p1,1.582)],.0007,'edge','floor',5,1)

# Low enclosed plinth, with its real visible front slot and two compact front
# supports. The four hidden/rear mounting positions are explicitly inferred.
front=7.970;back=7.32;left=-.918;right=.918;top=1.778;bottom=1.596
box('vented pedestal upper plate',[(front+back)/2,0,top-.012],[front-back,right-left,.024],'paint','vented',.0025)
box('vented pedestal front upper web',[front-.012,0,1.711],[.024,1.78,.112],'paint','vented',.0015)
box('vented pedestal dark interior',[front-.036,0,1.631],[.018,1.64,.039],'dark','vented',.001)
box('vented pedestal front lower lip',[front+.002,0,1.600],[.028,1.80,.021],'metal','vented',.002)
for yy in [-.902,.902]:box('vented pedestal side '+str(yy),[(front+back)/2,yy,(top+bottom)/2],[front-back,.026,top-bottom],'paint','vented',.002)
for yy in [-.84,0,.84]:box('vented pedestal slot upright '+str(yy),[front-.006,yy,1.634],[.022,.026,.047],'paint','vented',.001)
for yy in [-.878,.878]:cylinder('vented pedestal plate screw '+str(yy),[front-.025,yy,top],[front-.025,yy,top+.003],.0032,'metal','vented',12)
# Native D corners are approximately (384,1868) and (1660,1880).
# A small source-observed skew is shared by the whole pedestal, never a camera
# adjustment. The first rectangular estimate was too wide on the right.
for o in parts:
 if o.name.startswith('EVR | vented pedestal'):
  for vertex in o.data.vertices:
   y=vertex.co.x/SY;vertex.co.x*=.9535;vertex.co.y-=(-.009+.010*y)*SX

X=7.78;g='vented';rect=[634,1240,1458,2040]
pb('vented main closed enclosure',rect,X-.020,.45,'paint',g,.006)
pb('vented front face',[640,1248,1452,2036],X+.003,.008,'paint',g,.002)
pb('vented lid overhang',[626,1214,1468,1240],X+.025,.49,'paint',g,.003)
edge_y=[1294,1321,1347,1373,1400,1426,1453,1480,1506,1532,1558,1585,1611,1638,1664,1690,1716,1742,1768,1795,1821,1847,1872,1898,1924,1949,1975,2000]
# A pressed hood follows a rounded perimeter. Its large radius and soft rolled
# lip are geometry; no black triangular caps or repeated rectangular shelves.
for col,u in enumerate([767,954,1140,1327]):
 for row,v in enumerate(edge_y):
  width=83;h=18;outline=[]
  for angle in np.linspace(0,math.pi,9):outline.append((u+(width/2-8)*math.cos(angle),v-h+8+8*math.sin(angle)))
  outline=[(u-width/2+8,v-h),(u+width/2-8,v-h),(u+width/2,v-h+5),(u+width/2-1,v-3),(u+width/2-8,v),(u-width/2+8,v),(u-width/2+1,v-3),(u-width/2,v-h+5)]
  verts=[]
  for xx,scale,dy in [(X+.004,1,0),(X+.017,1,-1),(X+.022,.91,-2)]:
   verts.extend([pt(plane([u+(a-u)*scale,b+dy],xx))for a,b in outline])
  n=len(outline);fs=[tuple(range(n-1,-1,-1)),tuple(range(2*n,3*n))]+[(j*n+k,j*n+(k+1)%n,(j+1)*n+(k+1)%n,(j+1)*n+k)for j in range(2)for k in range(n)]
  face_label(closed_solid(mesh('stamped louvre '+str(col)+' '+str(row),verts,fs,'paint',g)),'b',[u-width/2,v-h,u+width/2,v])
for i,u in enumerate([817,1298]):
 c=plane([u,1184],X-.045);ring('vented lifting eye '+str(i),c,.013,.003,'metal',g,'x',20);cylinder('vented lifting eye stem '+str(i),[c[0],c[1],c[2]-.025],c,.005,'metal',g,12)
for u in [664,1016,1432]:screw('vented lid screw '+str(u),(u,1227),X+.026,2.4,g)
for i,(pixel,xx)in enumerate([((780,2024),7.80),((1250,2024),7.80),((780,2024),7.47),((1250,2024),7.47)]):
 center=dpoint(pixel,1.823);center[0]=xx
 box('vented compact mounting pad '+str(i),[xx,center[1],top+.004],[.080,.072,.008],'metal',g,.002)
 cylinder('vented compact dark core '+str(i),[xx,center[1],top+.008],[xx,center[1],1.857],.020,'rubber',g,20)
 for dy in [-.032,.032]:box('vented mounting bracket '+str(i)+' '+str(dy),[xx,center[1]+dy,1.821],[.078,.008,.080],'metal',g,.002)
 cylinder('vented compact stud '+str(i),[xx,center[1],1.830],[xx,center[1],1.873],.006,'metal',g,12)

# Full transverse grating and its lateral continuation are traced on the source
# floor, independent from the collision mask. Bars have actual depth/open holes.
grating_shapes=[[(0,1148),(1312,1148),(1312,1232),(2048,1232),(2048,1770),(1232,1770),(1232,1696),(0,1696)]]
gv=[];gf=[]
def inside(poly,x,y):
 hit=False
 for (a,b),(c,d)in zip(poly,poly[1:]+poly[:1]):
  if(b>y)!=(d>y)and x<(c-a)*(y-b)/(d-b)+a:hit=not hit
 return hit
def bar3(a,b,c,d):
 # Trim against the inner perimeter, so the frame and grid never have
 # overlapping coplanar top faces at the photographed cut-outs.
 for (x0,y0),(x1,y1)in zip(poly,poly[1:]+poly[:1]):
  if y0==y1 and min(c,max(x0,x1))-max(a,min(x0,x1))>1e-7:
   if x1>x0 and b<y0+5.0 and d>y0:b=max(b,y0+5.0)
   if x1<x0 and d>y0-5.0 and b<y0:d=min(d,y0-5.0)
  if x0==x1 and min(d,max(y0,y1))-max(b,min(y0,y1))>1e-7:
   if y1>y0 and c>x0-5.0 and a<x0:c=min(c,x0-5.0)
   if y1<y0 and a<x0+5.0 and c>x0:a=max(a,x0+5.0)
 if c<=a or d<=b:return
 pts=[dpoint(p,z)for z in[1.586,1.595]for p in[(a,b),(c,b),(c,d),(a,d)]];i=len(gv);gv.extend(pt(p)for p in pts)
 # Top plus the two longitudinal walls; the underside rests against the floor.
 gf.extend([tuple(i+k for k in f)for f in[(7,6,5,4),(4,5,1,0),(6,7,3,2)]])
for poly in grating_shapes:
 # Source D:33px cross-web period,9px web,11.65px row period,
 #7px broad strip and4.65px opening. Native hole samples atD1022..1046,
 #y1499/1511/1522 determine phase; the old square wire mesh was incorrect.
 for y in np.arange(1152,1776,11.65):
  scan=y+3.5;crossings=sorted(x0 for(x0,y0),(x1,y1)in zip(poly,poly[1:]+poly[:1])if x0==x1 and min(y0,y1)<=scan<max(y0,y1))
  for a,c in zip(crossings[::2],crossings[1::2]):bar3(a,y,c,y+7)
 for x in np.arange(-10,2048,33):
  for y in np.arange(1152,1776,11.65):
   if inside(poly,x+4.5,y+9.325):bar3(x,y+7,x+9,y+11.65)
 # Continuous source-visible perimeter, with shared mitered corners. Without
 # this the cell-centre clipping left a tooth-shaped edge one row too early.
 inner=[]
 for j,b in enumerate(poly):
  a=np.array(poly[j-1],float);b=np.array(b,float);c=np.array(poly[(j+1)%len(poly)],float);d0=b-a;d1=c-b;n0=np.array([-d0[1],d0[0]])/np.linalg.norm(d0);n1=np.array([-d1[1],d1[0]])/np.linalg.norm(d1);p=b+n0*5.0;q=b+n1*5.0;t=np.linalg.solve(np.column_stack([d0,-d1]),q-p)[0];inner.append(p+t*d0)
 for j in range(len(poly)):
  k=(j+1)%len(poly);pixels=[poly[j],poly[k],inner[k],inner[j]];i=len(gv);gv.extend(pt(dpoint(p,z))for z in[1.586,1.595]for p in pixels)
  gf.extend([tuple(i+k for k in f)for f in[(7,6,5,4),(4,5,1,0),(6,7,3,2)]])
grating=mesh('ochre grating traced from floor',gv,gf,'grating','floor');grating['forceVertexLighting']=True;grating['sourceMask']='D traced boundary; no navigation clipping';grating['referenceFace']='d';grating['referencePolygon']=json.dumps(grating_shapes)
def lfloor(p,z=1.595):
 u,v=p;t=(3.18-z)*1024/(v-1024)
 return[9.15+(u-1024)*t/1024/SX,t/SY,z]
return_polygon=[(48,1640),(714,1650),(608,1868),(912,1860),(884,2048),(352,2048),(384,1980),(48,1980)]
poly=[lfloor(p)[:2]for p in return_polygon];xs=[p[0]for p in poly];ys=[p[1]for p in poly];rv=[];rf=[]
def physical_bar(x0,y0,x1,y1):
 pts=[pt([x,y,z])for z in[1.586,1.595]for x,y in[(x0,y0),(x1,y0),(x1,y1),(x0,y1)]];i=len(rv);rv.extend(pts);rf.extend([tuple(i+k for k in f)for f in[(4,5,6,7),(0,1,5,4),(2,3,7,6)]])
for x in np.arange(min(xs),max(xs),.018):
 if x<6.852:continue # Outside the original supported floor, behind its wall.
 active=[y for y in np.arange(min(ys),max(ys),.051)if inside(poly,x+.009,y+.0255)]
 if active:physical_bar(x,active[0],x+.0108,active[-1]+.051)
 for y in active:physical_bar(x+.0108,y,x+.018,y+.014)
o=mesh('ochre grating lateral return',rv,rf,'grating','floor');o['forceVertexLighting']=True;o['referenceFace']='l';o['referencePolygon']=json.dumps(return_polygon)

# Replace the side generator casing only in this appearance. Correcting its
# inward face from Y2.01 to Y2.90 makes room for the photographed auxiliary box.
Y=2.90;group='side-context'
def lb(name,rect,y=Y,depth=.018,material_name='paint',radius=.002):
 a,b,c,d=rect;pa=lpoint([(a+c)/2,(b+d)/2],y);s=y*SY/1024
 o=box(name,[pa[0],y+depth/2,pa[2]],[(c-a)*s,depth,(d-b)*s],material_name,group,radius)
 return face_label(o,'l',rect)
def ll(name,pixels,y=Y,r=.001,material_name='dark'):
 o=tube(name,[lpoint(p,y)for p in pixels],r,material_name,group,6,1);o['referenceFace']='l';o['referencePath']=json.dumps(pixels);return o
lb('side generator closed enclosure',[334,1034,1260,1547],Y,.48,'paint',.025)
for name,rect in [('control door',[354,1090,581,1283]),('service door',[585,1057,1228,1528]),('lower small door',[355,1291,579,1517])]:
 a,b,c,d=rect;ll('side generator '+name,[(a,b),(c,b),(c,d),(a,d),(a,b)],Y-.004,.0012,'edge')
lb('side generator control black bezel',[409,1091,546,1183],Y-.016,.013,'dark',.004)
lb('side generator control LCD',[461,1110,519,1149],Y-.024,.004,'screen-pale',.001)
for i,color in enumerate(['blue','green','red']):
 c=lpoint([458+i*20,1168],Y-.029);cylinder('side generator pilot '+str(i),c,[c[0],c[1]-.006,c[2]],.005,color,group,12)
for uv in [(421,1225),(546,1225),(685,1070)]:
 a,b=uv;lb('side generator recessed latch '+str(uv),[a-4,b-11,a+4,b+11],Y-.010,.006,'dark',.001)
for yy in [Y+.02,Y+.43]:box('side generator low mounting rail '+str(yy),[8.10,yy,1.613],[1.98,.040,.035],'metal',group,.003)
# Independently authored legible manufacturer name, without fabricated model ID.
bpy.ops.object.text_add();o=bpy.context.object;o.data.body='KOHLER';o.data.size=.14;o.data.extrude=0;o.data.resolution_u=2;bpy.ops.object.convert(target='MESH')
xx=[v.co.x for v in o.data.vertices];zz=[v.co.y for v in o.data.vertices];cx=(min(xx)+max(xx))/2;cz=(min(zz)+max(zz))/2;center=lpoint([443,1468],Y-.012);scale=.36/max(max(xx)-min(xx),.001)
for v in o.data.vertices:v.co=pt([center[0]+(v.co.x-cx)*scale,Y-.014,center[2]+(v.co.y-cz)*scale])
o.location=(0,0,0);register(o,'side generator readable manufacturer','dark',group)

# Auxiliary box and its immediate pipes, traced from the continuation in L.
YA=2.58
lb('three green pilot enclosure',[112,1214,302,1329],YA,.10,'paint',.007)
for i,(u,v)in enumerate([(214.49,1251.75),(248.91,1241.01),(280.42,1231.82)]):
 c=lpoint([u,v],YA-.023);c[1]=YA-.006;cylinder('auxiliary pilot bezel '+str(i),c,[c[0],c[1]-.010,c[2]],.014,'dark',group,20);cylinder('auxiliary green lens '+str(i),[c[0],c[1]-.010,c[2]],[c[0],c[1]-.017,c[2]],.0105,'green',group,20)
c=lpoint([248,1290],YA-.018);cylinder('auxiliary selector round base',c,[c[0],c[1]-.012,c[2]],.018,'dark',group,20);ll('auxiliary selector handle',[(248,1290),(260,1288)],YA-.04,.006,'dark')
ll('auxiliary bracket',[(109,1352),(299,1323)],YA-.004,.012,'metal')
for i in range(4):ll('auxiliary cable '+str(i),[(169+i*10,1329),(205+i*9,1355),(245+i*7,1352),(264+i*7,1378),(264+i*7,1497)],YA-.035-i*.002,.004,'rubber')
ll('auxiliary bonded conductor',[(160,1510),(229,1495),(296,1463)],YA-.055,.0014,'green')
ll('side white lower pipe',[(197,1664),(173,1650),(170,1605),(170,1533)],YA-.05,.045,'paint')
ll('side brass elbow',[(170,1533),(170,1517),(180,1501),(202,1493)],YA-.055,.046,'brass')
ll('side black connected hose',[(202,1493),(249,1493),(300,1475),(335,1465)],YA-.055,.026,'rubber')
for uv in [(203,1493),(229,1493),(272,1486)]:
 p=lpoint(uv,YA-.055);cylinder('side pipe metal clamp '+str(uv),[p[0]-.008,p[1],p[2]],[p[0]+.008,p[1],p[2]],.029,'metal',group,20)

# Remove uniform dark protection bands. Preserve the eight transparent covers
# and add photographed wider modules, grouped levers and pale mounting surfaces.
for o in parts:
 if 'protection dark recess'in o.name:o.data.materials.clear();o.data.materials.append(mats['paint'])
 if 'protection rail'in o.name:o.data.materials.clear();o.data.materials.append(mats['paint'])
 if 'lower right chevron grille'in o.name:o.data.materials.clear();o.data.materials.append(mats['paint'])
 if 'lower EURO EL'in o.name:
  # The main label is small and leaves room for the warning symbols.
  centre=sum((v.co for v in o.data.vertices),Vector())/len(o.data.vertices)
  for v in o.data.vertices:v.co=centre+(v.co-centre)*.68
  for vert in o.data.vertices:vert.co.z+=.062
  if 'right lower EURO EL'in o.name:
   for vert in o.data.vertices:
    p=vert.co;depth=(9.15-(-p.y+17.615)/SX)*SX
    vert.co.x-=74.5*depth/1024;vert.co.z+=12*depth/1024
 # The reference lower casing ends at B1856, with a separate low web/slot.
 if any(o.name.startswith('EVR | '+prefix+' '+str(j))for j in[2,3]for prefix in ['main enclosure','main door gasket','main closed door','main engraved perimeter','main inner perimeter','main hinge','main door']):
  for vert in o.data.vertices:
   p=vert.co;x=(-p.y+17.615)/SX;d=(9.15-x)*SX;v=1024-(p.z+2.01-3.18)*1024/d
   if v>1600:vert.co.z+=(v-(1600+(v-1600)*(256/305)))*d/1024
 if 'lower right chevron grille'in o.name or 'lower right vent dark aperture'in o.name:
  # Native source B, not the erroneous R01 control on the blank panel.
  for vert in o.data.vertices:
   p=vert.co;depth=(9.15-(-p.y+17.615)/SX)*SX
   u=1024+p.x*1024/depth;v=1024-(p.z+2.01-3.18)*1024/depth
   u2=176+(u-334)*120/87;v2=1658+(v-1645)*107/103
   vert.co.x+=(u2-u)*depth/1024;vert.co.z-=(v2-v)*depth/1024
  o['referenceFace']='b';o['referenceRect']=json.dumps([176,1658,296,1765])
for o in list(parts):
 if o.name.startswith(('EVR | lower right chevron grille','EVR | lower right vent dark aperture')):remove(o)
# Nine folded, broad chevron blades. Native close-up shows a much steeper
# chevron and a thicker painted surface than the old wire strokes.
pb('lower right vent dark aperture',[180,1664,290,1773],7.804,.006,'edge',radius=.001)
outer=[(172,1656),(300,1656),(300,1776),(172,1776)];inner=[(180,1664),(290,1664),(290,1773),(180,1773)]
verts=[pt(plane(p,x))for x in[7.806,7.835]for ring_points in[outer,inner]for p in ring_points];faces=[]
for j in range(4):
 k=(j+1)%4;faces.extend([(8+j,8+k,12+k,12+j),(j,k,8+k,8+j),(4+j,12+j,12+k,4+k),(j,4+j,4+k,k)])
face_label(closed_solid(mesh('lower right grille white housing',verts,faces,'paint','distribution')),'b',[172,1656,300,1776])
def clip_grille(points):
 for axis,edge,sign in[(0,180,1),(0,290,-1),(1,1664,1),(1,1773,-1)]:
  out=[]
  for a,b in zip(points,points[1:]+points[:1]):
   ia=(a[axis]-edge)*sign>=0;ib=(b[axis]-edge)*sign>=0
   if ia:out.append(a)
   if ia!=ib:
    t=(edge-a[axis])/(b[axis]-a[axis]);out.append([a[c]+t*(b[c]-a[c])for c in range(2)])
  points=out
  if len(points)<3:return[]
 return points
for row,v in enumerate([1664,1677,1690,1703,1716,1729,1742,1755,1768]):
 for side,points in [('left',[(180,v+17),(230,v),(230,v+6),(180,v+23)]),('right',[(230,v),(290,v+20),(290,v+26),(230,v+6)])]:
  points=clip_grille(points)
  if not points:continue
  n=len(points);verts=[]
  for behind in[.002,0]:
   for u,y in points:
    upper=v+(17*(230-u)/50 if side=='left' else 20*(u-230)/60);fraction=np.clip((y-upper)/6,0,1);verts.append(pt(plane([u,y],7.836-.014*fraction-behind)))
  fs=[tuple(range(n-1,-1,-1)),tuple(range(n,2*n))]+[(j,(j+1)%n,(j+1)%n+n,j+n)for j in range(n)]
  face_label(closed_solid(mesh('lower right chevron grille '+str(row)+' '+side,verts,fs,'paint','distribution')),'b',[min(p[0]for p in points),min(p[1]for p in points),max(p[0]for p in points),max(p[1]for p in points)])
for side,a in [('left',-499),('right',30)]:
 for row in range(4):
  top=1081+row*127
  for o in list(parts):
   if o.name.startswith(('EVR | '+side+' breaker '+str(row)+' ','EVR | '+side+' breaker lever '+str(row)+' ')):remove(o)
  layout=[1]*24 if row<2 else([2,2,1,1,1,1,1,1,1,1,1,1,1,3,3]if row==2 else[1]*14+[3,3,3])
  x=a+10;unit=17.5
  for j,n in enumerate(layout):
   width=n*unit-1.3
   pb(side+' grouped module '+str(row)+' '+str(j),[x,top+24,x+width,top+68],7.817,.011,'paint',radius=.0009)
   for k in range(n):
    pb(side+' grouped handle '+str(row)+' '+str(j)+' '+str(k),[x+2+k*unit,top+39,x+unit-2+k*unit,top+47],7.832,.005,'dark'if row==2 and j<7 else'edge',radius=.0006)
   if n>1:pb(side+' grouped switch bridge '+str(row)+' '+str(j),[x+2,top+43,x+width-2,top+47],7.838,.003,'dark',radius=.0005)
   x+=n*unit
for u in [-176,-157,-138]:
 v=1813;verts=[pt(plane([u,v-9],7.81)),pt(plane([u-8,v+6],7.81)),pt(plane([u+8,v+6],7.81))]
 mesh('left lower warning triangle '+str(u),verts,[(0,1,2)],'warning-yellow','distribution');line('left warning stroke '+str(u),[(u,v-4),(u,v+1)],7.812,.00065,'dark')

# Radial depth calibration retains every selector's projected location while
# bringing the column's observed base to the original walking floor.
for o in parts:
 if o.get('assembly')=='battery':
  for vert in o.data.vertices:
   p=vert.co;x=(-p.y+17.615)/SX;d=(9.15-x)*SX;u=1024+p.x*1024/d
   if u>2048:vert.co.x+=(2048+(u-2048)*62/142-u)*d/1024
  station=pt([9.15,0,3.18]);ratio=(9.15-7.50)/(9.15-7.93)
  for vert in o.data.vertices:vert.co=station+(vert.co-station)*ratio
box('battery column grounded plinth',[7.455,1.41,1.603],[.108,.72,.042],'paint','battery',.003)

# Compact framed main-board base, avoiding the old isolated long feet.
pb('main board lower white web',[-535,1856,532,1905],7.78,.025,'paint','supports',.002)
for u in[-520,-15,515]:
 p=plane([u,1930],7.40);box('main board rear mounting upright '+str(u),[7.40,p[1],1.84],[.045,.035,.49],'paint','supports',.002)
p0=plane([-555,1980],7.40);p1=plane([546,1980],7.40)
box('main board low base rail',[7.40,(p0[1]+p1[1])/2,1.608],[.040,(p1[1]-p0[1])*SY,.035],'metal','supports',.002)

# The observed white wall hides the porthole only as an appearance panel. It is
# attached to the existing service-door pivot by the viewer and remains operable.
door=box('white service access appearance',[6.885,1.0,2.63],[.018,.574,2.10],'paint','door-appearance',.002)
door['appearanceDoor']=True;door['excludeFromStaticBake']=True

for o in parts:
 if not o.data.uv_layers.get('UV0'):
  uv=o.data.uv_layers.new(name='UV0')
  for f in o.data.polygons:
   axes=np.argsort(np.abs(f.normal))[:2]
   for li in f.loop_indices:
    p=o.data.vertices[o.data.loops[li].vertex_index].co;uv.data[li].uv=(p[int(axes[0])]/.12,p[int(axes[1])]/.12)
 o.hide_render=False;o.hide_viewport=False

deps=bpy.context.evaluated_depsgraph_get();digest=hashlib.sha256();triangles=0;inventory=[]
for o in parts:
 e=o.evaluated_get(deps);d=e.to_mesh();d.calc_loop_triangles();triangles+=len(d.loop_triangles);digest.update(o['componentID'].encode());digest.update(np.round(np.array([(o.matrix_world@v.co)[:]for v in d.vertices]),5).astype('<f8').tobytes());digest.update(np.array([t.vertices[:]for t in d.loop_triangles],dtype='<u4').tobytes());e.to_mesh_clear();inventory.append({'id':o['componentID'],'assembly':o['assembly'],'classification':o.get('classification'),'referenceFace':o.get('referenceFace'),'referenceRect':json.loads(o['referenceRect'])if'referenceRect'in o else None})
binding={'version':2,'id':'electrical-lower-r02','strategy':'LDM-VR-EST-001 v1.0','sourceMasterSHA256':previous['masterSHA256'],'sourceRuntimeGLBSHA256':previous['runtimeGeometrySHA256'],'replacedIDs':replaced,'removedContextTriangles':removed,'editableObjects':len(parts),'sourceTriangles':triangles,'camera':E['camera'],'neutralGeometrySHA256':digest.hexdigest(),'stage':'lower geometry correction; review required','visualAcceptance':False,'sourceFaces':['b','r','d','l'],'louvres':{'columns':4,'observedRows':28,'fittingLowerEdges':edge_y,'counts':'28 visible hoods per column in native B; detection inspected against the source'},'floorMat':{'sourceFace':'d','pitchPixels':[33,11.65],'webPixels':[9,7],'holePixels':[24,4.65],'phasePixels':[-10,1152],'classification':'Observed slotted appearance; material and hidden support inferred'},'smallGrille':{'observedRows':9,'nativeRect':[172,1656,300,1776],'construction':'Broad folded chevrons and raised housing; no wire strokes'},'materialOverrides':{'checker':[[.78,.80,.81],.45,.18,.014],'grating':[[.64,.45,.23],.70,0,.008],'brass':[[.61,.43,.19],.34,.9,.005],'warning-yellow':[[.82,.70,.10],.40,0,.002]},'navigationNotes':'Existing floor height/register and service-door pivot retained. New grating is a source-traced surface, never clipped to old collision cells.','limits':['Single source station; hidden depths are inferred.','Side generator casing placement is reconstructed to clear the photographed controls; internals are not modelled.','Bright checkerplate finish is inferred: pale coated/oxidized base and exposed metallic ridge crests. Actual alloy and coating are unverified.']}
(W/'component-inventory.json').write_text(json.dumps(inventory,ensure_ascii=False,indent=2)+'\n');(W/'authoring.json').write_text(json.dumps(binding,indent=2)+'\n')
S['electricalVersion']='electrical-lower-r02';S.render.resolution_x=1200;S.render.resolution_y=800;S.render.resolution_percentage=100
bpy.ops.wm.save_as_mainfile(filepath=str(W/'electrical-neutral.blend'),compress=True)
print('LOWER ELECTRICAL CORRECTED',len(parts),'objects',triangles,'triangles',removed,'legacy triangles removed',flush=True)
