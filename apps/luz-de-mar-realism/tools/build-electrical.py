"""Editable electrical front derived from frozen native photographic regions.

Projection determines the visible layout. Depth, rear construction and supports
are estimates constrained by the existing yacht, never surveyed boat dimensions.
The unmodified bulkhead authoring master is the input; neither engine is edited.
"""
import bpy,bmesh,numpy as np,json,math,hashlib,ast
from pathlib import Path
from mathutils import Vector
R=Path(__file__).resolve().parents[1];W=R/'work/electrical-vr-r01';S=bpy.context.scene;SX=35.23/36;SY=7.47/7.6
E=json.loads((W/'evidence-frozen.json').read_text());parts=[];mats={}
def pt(p):return Vector((p[1]*SY,-(p[0]*SX-17.615),p[2]-2.01))
def plane(pixel,x=7.78):
 u,v=pixel;d=(9.15-x)*SX;return[x,(u-1024)*d/1024/SY,3.18+(1024-v)*d/1024]
def activate(o):
 bpy.ops.object.select_all(action='DESELECT');o.select_set(True);bpy.context.view_layer.objects.active=o
C=bpy.data.collections.new('EDITABLE | VR electrical');S.collection.children.link(C)
colors={'paint':(.87,.875,.85),'edge':(.65,.67,.65),'metal':(.65,.69,.71),'dark':(.025,.029,.027),'rubber':(.018,.022,.02),'red':(.58,.023,.012),'blue':(.025,.12,.48),'green':(.025,.38,.31),'blue-lit':(.12,.32,.94),'green-lit':(.10,.85,.30),'amber':(.83,.39,.025),'cream':(.72,.71,.59),'screen':(.20,.25,.22),'screen-pale':(.71,.75,.72),'glass':(.73,.79,.76),'copper':(.48,.24,.10)}
for name,color in colors.items():
 m=bpy.data.materials.new('EVR | '+name);m.use_nodes=True;m['family']='electrical-'+name;m['electricalMaterial']=True;m['lightmap']='electrical';m['tileMetres']=.18
 p=m.node_tree.nodes['Principled BSDF'];p.inputs['Base Color'].default_value=(*color,1);p.inputs['Roughness'].default_value=.48
 if name=='glass':p.inputs['Alpha'].default_value=.13;m.surface_render_method='DITHERED';p.inputs['Roughness'].default_value=.18
 m.node_tree.nodes.new('ShaderNodeTexImage').name='BAKE | electrical diffuse';mats[name]=m
def mat(name):return mats[name]
def register(o,name,material,group):
 o.name='EVR | '+name;o.data.materials.clear();o.data.materials.append(mat(material));o['componentID']='EVR/'+name;o['assembly']=group;o['classification']='observed visible form; inferred depth, thickness and hidden construction';o['lightmap']='electrical';parts.append(o)
 for c in list(o.users_collection):c.objects.unlink(o)
 C.objects.link(o);return o
for n in ast.parse((R/'tools/build-left-engine.py').read_text()).body:
 if isinstance(n,ast.FunctionDef)and n.name in ['mesh','closed_solid','box','cylinder','tube','bolt','filtered']:
  exec(compile(ast.Module(body=[n],type_ignores=[]),str(R/'tools/build-left-engine.py'),'exec'),globals())
def bevel(o,r=.002,segments=1):
 if r:
  b=o.modifiers.new('Manufactured radius','BEVEL');b.width=r;b.segments=segments;b.limit_method='ANGLE';b.angle_limit=.4
  n=o.modifiers.new('Weighted face normals','WEIGHTED_NORMAL');n.keep_sharp=True
 return o
def ring(name,center,r,wire,material,group,axis='x',segments=24):
 x,y,z=center;p=[]
 for t in np.linspace(0,math.tau,segments+1):p.append((x,y+r*math.cos(t)/SY,z+r*math.sin(t))if axis=='x'else(x+r*math.cos(t)/SX,y,z+r*math.sin(t))if axis=='y'else(x+r*math.cos(t)/SX,y+r*math.sin(t)/SY,z))
 return tube(name,p,wire,material,group,6,1)
def pb(name,rect,x=7.78,depth=.015,material='paint',group='distribution',radius=.0015):
 a,b,c,d=rect;p=plane([(a+c)/2,(b+d)/2],x);scale=(9.15-x)*SX/1024
 o=box(name,[x-depth/2,p[1],p[2]],[depth,(c-a)*scale,(d-b)*scale],material,group,radius);o['referenceFace']='b';o['referenceRect']=json.dumps(rect);return o
def line(name,pixels,x=7.80,r=.0015,material='dark',group='distribution',sub=1,radial=6):
 o=tube(name,[plane(p,x)for p in pixels],r,material,group,radial,sub);o['referenceFace']='b';o['referencePath']=json.dumps(pixels);return o
def disc(name,uv,rpx,x=7.80,depth=.008,material='dark',group='distribution',segments=20):
 p=plane(uv,x);r=rpx*(9.15-x)*SX/1024
 o=cylinder(name,[x-depth,p[1],p[2]],p,r,material,group,segments);o['referenceFace']='b';o['referenceRect']=json.dumps([uv[0]-rpx,uv[1]-rpx,uv[0]+rpx,uv[1]+rpx]);return o
def frame(name,rect,x=7.80,r=.001,material='edge',group='distribution'):
 a,b,c,d=rect;return line(name,[(a,b),(c,b),(c,d),(a,d),(a,b)],x,r,material,group)
def screw(name,uv,x=7.80,r=3,group='distribution'):
 disc(name,uv,r,x,.003,'metal',group,12);line(name+' slot',[(uv[0]-r*.55,uv[1]),(uv[0]+r*.55,uv[1])],x+.001,.0006,'dark',group)
def label(name,body,rect,x=7.81,material='dark',group='distribution'):
 # Only words actually legible in the photograph enter this function.
 bpy.ops.object.text_add();o=bpy.context.object;o.data.body=body;o.data.align_x='CENTER';o.data.align_y='CENTER';o.data.size=.08;o.data.extrude=0;o.data.resolution_u=2;bpy.ops.object.convert(target='MESH')
 if not o.data.vertices:bpy.data.objects.remove(o,do_unlink=True);return
 xx=[v.co.x for v in o.data.vertices];yy=[v.co.y for v in o.data.vertices];cx=(min(xx)+max(xx))/2;cy=(min(yy)+max(yy))/2
 a,b,c,d=rect;scale=(9.15-x)*SX/1024;size=min((c-a)*scale/max(max(xx)-min(xx),.001),(d-b)*scale/max(max(yy)-min(yy),.001));center=plane([(a+c)/2,(b+d)/2],x)
 for v in o.data.vertices:v.co=pt([x,center[1]+(v.co.x-cx)*size/SY,center[2]+(v.co.y-cy)*size])
 o.location=(0,0,0);register(o,name,material,group);o['referenceRect']=json.dumps(rect);o['referenceFace']='b';o['classification']='legible reference text; independently authored lettering';return o
def pilot(name,uv,color,x=7.82,r=10,lit=False,handle=False,group='distribution'):
 disc(name+' bezel',uv,r+2,x,.005,'metal',group);disc(name+' collar',uv,r,x+.004,.006,'dark',group);o=disc(name+' lens',uv,r-1,x+.011,.008,color+'-lit'if lit and color in ['green','blue']else color,group)
 if lit:o['photographicState']='illuminated, fixed';o['fixedPilot']=True
 if handle:line(name+' handle',[(uv[0]-r*.6,uv[1]-r*.55),(uv[0]+r*.8,uv[1]+r*.3)],x+.02,.003,'dark',group)
 # Unreadable caption is represented by its observed border, without invented text.
 frame(name+' caption',[uv[0]-16,uv[1]+15,uv[0]+18,uv[1]+22],x,.00045,'edge',group)

# Partition ONLY the old electrical approximations. Retained source normals,
# material assignments, positions, colors and both UV sets remain unchanged.
meta=json.loads((R/'work/machinery-r11/snapshot/machinery.json').read_text());blob=(R/'work/machinery-r11/snapshot/machinery.bin').read_bytes()
vv=np.frombuffer(blob,dtype='<f4',count=meta['vertices']*11).reshape(-1,11)[:,:3];ii=np.frombuffer(blob,dtype='<u4',offset=meta['vertexBytes'],count=meta['triangles']*3).reshape(-1,3);ids=np.frombuffer(blob,dtype='<u4',offset=meta['vertexBytes']+meta['indexBytes'],count=meta['triangles'])
replaced=[p['id']for p in meta['parts']if '/switchboard/'in p['id']or '/asea-'in p['id']]
def key(points):return tuple(sorted(tuple(round(float(x),5)for x in p)for p in points))
remove={key(vv[t])for t,p in zip(ii,ids)if meta['parts'][p]['id']in replaced};removed=0
for o in list(S.objects):
 if o.type!='MESH'or o.hide_render or not o.name.startswith(('KEEP |','LD_R02 |','BVR context |')):continue
 keep=[f.index for f in o.data.polygons if key([(o.data.vertices[i].co.x,o.data.vertices[i].co.z,-o.data.vertices[i].co.y)for i in f.vertices])not in remove]
 if len(keep)!=len(o.data.polygons):
  copy=filtered(o,keep,'EVR context | '+o.name);copy['variant']='context';removed+=len(o.data.polygons)-len(keep);o.hide_render=True;o.hide_viewport=True
for o in S.objects:
 if o.name.endswith('walking')or o.name.startswith(('LVR |','RVR |','BVR |')):o.hide_render=True

# Observed white backing between the cabinets. Existing structural closure is
# retained; this cladding hides the obsolete context behind the photographed wall.
cladding_x=6.84
# The hidden backing belongs behind the existing service door, not across its
# approach. Preserve that actual opening instead of inventing a new passage.
cladding_depth=(9.15-cladding_x)*SX
cut_left=1024+.60*SY/cladding_depth*1024;cut_right=1024+1.40*SY/cladding_depth*1024
cut_top=1024-(3.75-3.18)/cladding_depth*1024;cut_bottom=1024-(1.54-3.18)/cladding_depth*1024
for name,rect in [('left',[540,535,cut_left,2285]),('right',[cut_right,535,1740,2285]),('above-door',[cut_left,535,cut_right,cut_top]),('below-door',[cut_left,cut_bottom,cut_right,2285])]:
 pb('electrical backing cladding '+name,rect,cladding_x,.025,'paint','supports',.002)
# Two upper and two lower doors. All four sit in one vertical front plane.
X=7.78
for j,rect in enumerate([[-535,449,-8,1008],[-2,449,512,1008],[-535,1023,-4,1905],[2,1023,532,1905]]):
 a,b,c,d=rect;g='distribution';pb('main enclosure '+str(j),rect,X-.015,.17,'paint',g,.008)
 pb('main door gasket '+str(j),[a+8,b+8,c-8,d-8],X+.001,.009,'dark',g,.003)
 pb('main closed door '+str(j),[a+12,b+12,c-12,d-12],X+.006,.009,'paint',g,.003)
 frame('main engraved perimeter '+str(j),[a+21,b+21,c-21,d-21],X+.011,.0009,'edge',g)
 frame('main inner perimeter '+str(j),[a+25,b+25,c-25,d-25],X+.012,.00045,'dark',g)
 for k,(u,v)in enumerate([(a+39,b+37),(c-39,b+37),(c-39,d-36)]):screw('main door '+str(j)+' latch '+str(k),(u,v),X+.020,8)
 for k,v in enumerate([b+50,(b+d)/2,d-52]):pb('main hinge '+str(j)+' '+str(k),[a-3,v-10,a+11,v+10],X+.012,.014,'metal',g,.002)
for v in [1013,1933]:
 line('main cross rail '+str(v),[[-555,v],[546,v]],X+.026,.011,'metal')
 for u in [-540,-15,528]:disc('rail end '+str(u)+' '+str(v),(u,v),8,X+.04,.02,'metal')

# Display bezels, inset LCD, actual button counts and visible screen structure.
for side,a in [('left',-495),('right',20)]:
 rect=[a+177,512,a+420,718];pb(side+' Woodward black bezel',rect,X+.025,.025,'dark',radius=.011)
 pb(side+' Woodward silver fascia',[a+184,508,a+405,705],X+.035,.007,'paint',radius=.006)
 pb(side+' LCD recessed window',[a+237,567,a+350,644],X+.042,.005,'dark',radius=.001)
 pb(side+' LCD surface',[a+241,555,a+335,635],X+.044,.001,'screen-pale'if side=='right'else'screen',radius=0)
 label(side+' maker','WOODWARD',[a+297,531,a+394,544],X+.046)
 for k in range(4):
  for u in [a+225,a+363]:pb(side+' display side key '+str(u)+' '+str(k),[u,578+k*17,u+10,589+k*17],X+.046,.006,'dark',radius=.002)
 for k in range(6):pb(side+' display lower key '+str(k),[a+245+k*22,666,a+256+k*22,678],X+.046,.006,'dark',radius=.002)
 for k in range(4):pb(side+' display auxiliary key '+str(k),[a+201+(k%2)*19,642+(k//2)*20,a+214+(k%2)*19,655+(k//2)*20],X+.046,.006,'paint',radius=.002)
 # Reference diagram traced as independent lines, not a claimed real circuit.
 for k in range(7):
  yy=580+k*8;line(side+' LCD row '+str(k),[(a+248,yy),(a+336-(k%3)*8,yy)],X+.045,.00045,'edge')
  if side=='left':line(side+' LCD vertical '+str(k),[(a+252+k*11,578),(a+252+k*11,633)],X+.045,.00045,'green')
 pb(side+' upper meter black frame',[a+4,510,a+88,602],X+.026,.022,'dark',radius=.003)
 pb(side+' upper meter glass',[a+12,520,a+79,590],X+.034,.004,'screen',radius=.001)
 for k in range(4):line(side+' meter tick '+str(k),[(a+22+k*12,531),(a+22+k*12,569)],X+.037,.0005,'cream')
 for row in range(2):
  for col,color in enumerate(['green','blue','red']):pilot(side+' upper pilot '+str(row)+' '+str(col),(a+20+col*58,628+row*55),color,lit=(row==0 and col==1))
 frame(side+' upper caption',[a+98,533,a+165,585],X+.018,.0005,'dark')
 label(side+' EURO EL','EURO EL',[a+359,725,a+456,738],X+.018)
 label(side+' logo','AZIMUT',[a+142,956,a+334,979]if side=='right'else[a+142,1824,a+334,1852],X+.019)
 label(side+' signature','Grande',[a+193,983,a+302,999]if side=='right'else[a+187,1855,a+312,1875],X+.019)

# Upper-left rows differ from the right panel; they are not mirrored copies.
frame('left auxiliary controls',[-505,729,-30,837],X+.019,.0008,'dark')
pb('left secondary digital meter',[-489,741,-431,818],X+.03,.018,'dark',radius=.003)
for k in range(5):line('left digital row '+str(k),[(-481,751+k*11),(-441,751+k*11)],X+.034,.0005,'blue')
for row in range(2):
 for k,color in enumerate(['red','amber','amber','amber','amber','amber']if row==0 else['green','blue','red','red','red','green']):pilot('left management '+str(row)+' '+str(k),(-398+k*66,750+row*52),color,lit=(row==1 and k==0),handle=(row==1 and k==5))
for row,yy in enumerate([869,930]):
 frame('left lower group '+str(row),[-507,yy-23,-28,yy+27],X+.019,.0006,'edge')
 for k,color in enumerate(['green','red','green','red','green','green','red','green']if row==0 else['cream','cream','green','red','green','red','cream','cream']):pilot('left service '+str(row)+' '+str(k),(-487+k*62,yy),color,r=8,handle=k in[2,4])
frame('right power management',[13,744,455,859],X+.019,.0008,'dark')
label('management heading','POWER SOURCES SYSTEM CONTROLS',[15,737,393,748],X+.02)
for k,color in enumerate(['blue','green','cream','green','green','red']):pilot('right management '+str(k),(43+k*72,790),color,lit=k in[1,3,4],handle=k in[3,4])
frame('right internal lights',[464,744,502,859],X+.019,.0008,'dark');pilot('right blue internal selector',(483,799),'blue',r=10,handle=True)
frame('right lower services',[13,877,500,943],X+.019,.0007,'edge')
label('water pump title','BLACK / GRAY WATER PUMPS',[80,865,393,877],X+.02)
for k,color in enumerate(['red','green','red','green','red','green','red']):pilot('right service '+str(k),(43+k*64,900),color,handle=k==3)

# Eight independent clear protection covers; module layout differs by row.
for side,a in [('left',-499),('right',30)]:
 for row in range(4):
  top=1081+row*127;rect=[a,top,a+450,top+102]
  pb(side+' protection dark recess '+str(row),rect,X+.014,.011,'dark',radius=.002)
  pb(side+' protection rail '+str(row),[a+7,top+22,a+443,top+77],X+.027,.006,'edge',radius=.001)
  count=25 if row<2 else 23
  for k in range(count):
   u=a+10+k*17;wide=29 if(row==2 and k<2)else 14
   pb(side+' breaker '+str(row)+' '+str(k),[u,top+30,u+wide,top+69],X+.031,.012,'paint',radius=.0007)
   color='dark'if(row==2 and k<3)or(row==3 and 11<k<16)else'edge'
   pb(side+' breaker lever '+str(row)+' '+str(k),[u+2,top+42,u+10,top+56],X+.042,.006,color,radius=.0005)
   if k%2==0:disc(side+' terminal '+str(row)+' '+str(k),(u+6,top+34),1.4,X+.044,.002,'metal',segments=8)
  for yy in [top+8,top+92]:line(side+' cover rail '+str(row)+' '+str(yy),[(a-2,yy),(a+452,yy)],X+.066,.0028,'paint')
  for uu in [a-2,a+452]:line(side+' cover side '+str(row)+' '+str(uu),[(uu,top+8),(uu,top+92)],X+.066,.0022,'paint')
  pb(side+' transparent closed cover '+str(row),[a,top+8,a+450,top+92],X+.063,.002,'glass',radius=.002)
  for k in range(11):frame(side+' unreadable breaker caption '+str(row)+' '+str(k),[a+4+k*40,top+79,a+39+k*40,top+89],X+.05,.00035,'edge')
 # Lower maker names, observed warning triangles and right grille.
 label(side+' lower EURO EL','EURO EL',[a+213,1855,a+360,1875],X+.025)
if True:
 pb('lower right vent dark aperture',[334,1645,421,1748],X+.02,.007,'dark',radius=.002)
 for k in range(10):
  yy=1650+k*9;line('lower right chevron grille '+str(k),[(338,yy+7),(377,yy),(417,yy+7)],X+.03,.002,'paint')
for u in [-460,-15,480]:
 p=plane([u,1923],X-.03);box('main inferred mounting foot '+str(u),[p[0]-.04,p[1],(p[2]+1.60)/2],[.10,.06,max(.04,p[2]-1.60)],'metal','supports',.002)

# Shore power board: two upper selectors with different frozen lever directions.
X=7.84;g='shore'
pb('shore mounting backplate',[686,647,1301,1110],X-.10,.020,'paint',g,.002)
pb('shore closed enclosure',[805,515,1204,1106],X-.014,.15,'paint',g,.005)
frame('shore engraved outer border',[821,532,1186,1088],X+.006,.0008,'edge',g)
for i,rect in enumerate([[834,560,1177,711],[834,725,1177,886],[834,900,1177,1003]]):frame('shore zone '+str(i),rect,X+.007,.0007,'edge',g)
label('shore title','SHORE POWER SYSTEM',[924,533,1129,549],X+.012,group=g)
for i,(uv,end)in enumerate([((903,636),(811,664)),((1106,635),(1036,563))]):
 u,v=uv;pb('shore selector polished plate '+str(i),[u-68,v-63,u+68,v+61],X+.012,.004,'metal',g,.002)
 frame('shore selector black plate border '+str(i),[u-68,v-63,u+68,v+61],X+.016,.0011,'dark',g)
 disc('shore selector black boss '+str(i),uv,30,X+.03,.018,'dark',g,36);disc('shore selector spindle '+str(i),uv,16,X+.041,.02,'metal',g,24)
 line('shore selector lever '+str(i),[uv,end],X+.06,.008,'dark',g,1,12);disc('shore selector lever grip '+str(i),end,10,X+.066,.012,'dark',g,24)
 label('shore selector caption '+str(i),'PHASE SELECTION'if i==0 else'VOLTAGE SELECTION',[u-63,v-79,u+63,v-68],X+.01,group=g)
for i,rect in enumerate([[868,766,940,850],[1066,766,1142,850]]):
 pb('shore instrument bezel '+str(i),rect,X+.018,.012,'dark',g,.0015)
 a,b,c,d=rect;pb('shore instrument face '+str(i),[a+5,b+5,c-5,d-5],X+.027,.004,'screen'if i==0 else'paint',g,.001)
 if i==0:
  for j,(uu,vv)in enumerate([(886,787),(918,787),(886,827),(903,827),(920,827)]):disc('phase instrument pilot '+str(j),(uu,vv),2,X+.032,.002,'red'if j==0 else'green',g,8)
 else:
  label('voltmeter symbol','V',[1074,774,1090,790],X+.033,group=g)
  for j in range(9):line('voltmeter scale '+str(j),[(1077+j*6,811-8*math.sin(j*math.pi/8)),(1077+j*6,815-8*math.sin(j*math.pi/8))],X+.034,.0005,'dark',g)
  line('voltmeter needle',[(1102,838),(1081,815)],X+.035,.0006,'dark',g)
pb('shore small latch',[1160,795,1182,819],X+.023,.013,'dark',g,.001);screw('shore small latch screw',(1171,806),X+.04,5,g)
disc('shore general switch bezel',(917,947),28,X+.027,.015,'metal',g,32);disc('shore general switch boss',(917,947),22,X+.04,.02,'dark',g,32)
pb('shore general switch long handle',[907,946,924,1043],X+.063,.025,'dark',g,.006)
pb('shore general switch ivory inset',[912,957,918,1018],X+.076,.004,'cream',g,.0015)
label('shore general caption','GENERAL SWITCH',[850,902,976,915],X+.014,group=g)
label('shore voltage caption','READING VOLTAGE',[1042,902,1166,915],X+.014,group=g)
pb('shore voltage small plate',[1082,937,1120,976],X+.025,.005,'paint',g,.001);frame('shore voltage plate edge',[1082,937,1120,976],X+.03,.0005,'edge',g)
disc('shore voltage small rotary',(1100,956),10,X+.036,.008,'dark',g,16);pb('shore voltage small handle',[1098,944,1102,972],X+.046,.005,'paint',g,.001)
label('shore logo','AZIMUT',[948,1049,1098,1070],X+.014,group=g);label('shore signature','Grande',[991,1072,1071,1084],X+.014,group=g);label('shore maker','EURO EL',[1110,1080,1178,1090],X+.014,group=g)
for u,v in [(805,645),(805,817),(805,1090),(1270,1087)]:screw('shore backing fixing '+str(u)+' '+str(v),(u,v),X-.076,4,g)
pb('shore right secondary instrument frame',[1227,653,1296,715],X-.05,.016,'paint',g,.003);pb('shore right secondary instrument LCD',[1238,665,1287,697],X-.03,.006,'screen',g,.001)

# Vented lower cabinet: stamped louvres have a curved, overhanging cross-section,
# dark openings behind them and continuous end caps, not painted horizontal lines.
X=8.18;g='vented';scale=(9.15-X)*SX/1024
pb('vented main closed enclosure',[644,1240,1454,2298],X-.02,.43,'paint',g,.006)
pb('vented front shadow recess',[670,1262,1427,2278],X+.002,.008,'dark',g,.002)
pb('vented front face',[670,1263,1427,2278],X+.005,.005,'paint',g,.002)
for col,u in enumerate([758,942,1127,1310]):
 for row in range(32):
  v=1281+row*30.4;width=74;height=18
  pb('vent slot '+str(col)+' '+str(row),[u-width/2,v+5,u+width/2,v+height],X+.009,.002,'dark',g,.001)
  polygon=[(-width/2,-1),(width/2,-1),(width/2,4),(width/2-5,9),(-width/2+5,9),(-width/2,4)]
  verts=[]
  for xx,dy in [(X+.012,0),(X+.023,3),(X+.026,8)]:
   verts.extend([pt(plane([u+du,v+dv+dy],xx))for du,dv in polygon])
  n=len(polygon);faces=[tuple(range(n-1,-1,-1)),tuple(range(2*n,3*n))]+[(j*n+k,j*n+(k+1)%n,(j+1)*n+(k+1)%n,(j+1)*n+k)for j in range(2)for k in range(n)]
  closed_solid(mesh('stamped louvre '+str(col)+' '+str(row),verts,faces,'paint',g))
pb('vented lid overhang',[626,1214,1468,1241],X+.025,.49,'paint',g,.003)
for i,u in enumerate([817,1298]):
 center=plane([u,1184],X-.045);ring('vented lifting eye '+str(i),center,.013,.003,'metal',g,'x',20)
 cylinder('vented lifting eye stem '+str(i),[center[0],center[1],center[2]-.025],center,.005,'metal',g,12)
for u in [664,1016,1432]:screw('vented lid screw '+str(u),(u,1227),X+.026,2.4,g)
# Four actual feet meet the existing digital floor. The hidden height is inferred.
for i,(u,xx)in enumerate([(710,X-.04),(1380,X-.04),(710,X-.38),(1380,X-.38)]):
 p=plane([u,2285],X);cylinder('vented mounting foot '+str(i),[xx,p[1],1.59],[xx,p[1],max(1.63,p[2])],.018,'metal',g,16)
 box('vented floor mounting pad '+str(i),[xx,p[1],1.60],[.11,.08,.025],'paint',g,.003)

# Battery column: the front continues beyond the B seam on the right.
X=7.93;g='battery'
pb('battery column closed enclosure',[1705,296,2190,2020],X-.02,.08,'paint',g,.005)
frame('battery column panel joint',[1714,308,2180,2013],X+.004,.0006,'edge',g)
pb('battery upper ventilation recess',[1875,462,1996,593],X+.008,.006,'dark',g,.001)
for row in range(12):
 v=469+row*10;line('battery upper grille '+str(row),[(1881,v+9),(1935,v),(1990,v+9)],X+.022,.0022,'paint',g)
titles=['PORT ME STARTING BATTERY SWITCH','PORT ME STARTING BACK-UP BATTERY SWITCH','STBD ME STARTING BATTERY SWITCH','STBD ME STARTING BACK-UP BATTERY SWITCH']
for j,v in enumerate([741,846,947,1050]):
 disc('battery red switch base '+str(j),(1940,v),47,X+.022,.02,'red',g,48)
 ring('battery selector cream ring '+str(j),plane([1940,v],X+.044),38*(9.15-X)*SX/1024,.0045,'cream',g,segments=32)
 disc('battery red centre '+str(j),(1940,v),31,X+.048,.013,'red',g,32)
 end=(1940,v-22)if j in[0,2]else(1963,v)
 line('battery ivory pointer '+str(j),[(1940,v),end],X+.064,.0036,'cream',g,1,8)
 for k,(u,vv)in enumerate([(1900,v-34),(1980,v-34),(1900,v+34),(1980,v+34)]):screw('battery large mounting screw '+str(j)+' '+str(k),(u,vv),X+.029,3,g)
 label('battery readable caption '+str(j),titles[j],[1858,v-65,2023,v-54],X+.014,group=g)
 label('battery switch OFF '+str(j),'OFF',[1927,v-40,1951,v-31],X+.056,group=g)
for j,(v,angle,color)in enumerate([(1172,-12,'red'),(1355,-15,'red'),(1451,38,'dark'),(1558,20,'dark'),(1656,0,'red'),(1759,0,'red')]):
 uv=(1934,v);disc('battery small switch boss '+str(j),uv,14,X+.029,.012,'dark',g,24);disc('battery small spindle '+str(j),uv,7,X+.045,.012,'metal',g,16)
 end=(uv[0]+52*math.cos(math.radians(angle)),uv[1]+52*math.sin(math.radians(angle)))
 line('battery small switch key '+str(j),[uv,end],X+.065,.0035,color,g,1,8)
 line('battery small switch tether '+str(j),[(1933,v+8),(1918,v+48),(1928,v+88),(1963,v+93),(1983,v+56),end],X+.04,.0009,'blue',g,5,6)
 disc('battery protective cap '+str(j),(1941,v+44),10,X+.055,.006,'dark',g,16)
 frame('battery small caption '+str(j),[1858,v-38,2027,v-26],X+.01,.0005,'edge',g)
 screw('battery small upper fixing '+str(j),(1934,v-22),X+.025,3,g)

# Immediate cable context: paths enter enclosures, remain on trays and have ties.
g='cables';X=7.70
pb('electrical perforated tray',[550,621,1395,708],X-.07,.045,'paint',g,.001)
for u in range(570,1385,28):pb('electrical tray aperture '+str(u),[u,641,u+14,647],X-.02,.002,'dark',g,0)
for j in range(14):
 v=571+j*6;line('rear upper loom '+str(j),[(530,v),(665,v+5),(804,v+5),(1230,v+5),(1357,v-3),(1372,v+15),(1374,743)],X,.0045,'rubber',g,4,8)
line('rear upper amber conductor',[(530,563),(800,568),(1260,568),(1338,568),(1362,590)],X+.008,.004,'amber',g,4,8)
for u in [600,775,1260,1352]:pb('rear loom tie '+str(u),[u,563,u+4,662],X+.014,.009,'dark',g,.001)
for j in range(7):line('shore lower wiring '+str(j),[(828+j*36,1106),(830+j*36,1123),(860+j*28,1136),(1050+j*6,1137),(1179+j*9,1110)],7.73,.0038,'rubber',g,5,8)
for j in range(5):
 u=1266+j*10;line('shore side descent '+str(j),[(u,649),(u+23,660),(u+39,717),(u+35,758)],7.73,.003,'rubber',g,5,8)
for u in [-570,-545,-520]:line('left immediate copper riser '+str(u),[(u-20,640),(u-20,920),(u,1054)],7.65,.008,'copper',g,4,12)
for v in [770,940]:pb('left copper pipe mounting strip '+str(v),[-607,v,-496,v+9],7.67,.018,'metal',g,.001)

# Four ceiling beacons. Their lens shape is geometry; no flashing is invented.
g='beacons'
for j,(u,v,color)in enumerate([(968,281,'red'),(1084,280,'red'),(1222,277,'amber'),(1323,276,'blue')]):
 # Independent depth keeps the observed short bodies below the existing ceiling.
 x=8.35;p=plane([u,v],x);radius=.030
 cylinder('beacon mount '+str(j),[p[0],p[1],p[2]+.03],[p[0],p[1],p[2]+.051],radius*1.08,'paint',g,24)
 cylinder('beacon colored lens '+str(j),[p[0],p[1],p[2]-.055],[p[0],p[1],p[2]+.03],radius,color,g,32,r2=radius*.92)
 for k in range(6):ring('beacon lens molded rib '+str(j)+' '+str(k),[p[0],p[1],p[2]-.05+k*.009],radius,.0015,color,g,'z',24)

# Fine correction, measured from the native photographs. These are fitting
# controls, explicitly NOT independent acceptance/verification points.
adjustments=[]
def move_cluster(prefix,old,new):
 du,dv=new[0]-old[0],new[1]-old[1]
 for o in parts:
  if not o.name.startswith('EVR | '+prefix+' '):continue
  for vert in o.data.vertices:
   p=o.matrix_world@vert.co;x=(-p.y+17.615)/SX;d=(9.15-x)*SX
   vert.co.x+=du*d/1024;vert.co.z-=dv*d/1024
  if'referenceRect'in o:
   a,b,c,d=json.loads(o['referenceRect']);o['referenceRect']=json.dumps([a+du,b+dv,c+du,d+dv])
  if'referencePath'in o:o['referencePath']=json.dumps([[u+du,v+dv]for u,v in json.loads(o['referencePath'])])
  o.data.update()
 adjustments.append({'cluster':prefix,'old':old,'new':new,'source':'native B or R-to-B angular resampling; used for fitting'})
for side,a,xx,yys in [('left',-495,[-493,-434.4,-375.8],[607.5,662]),('right',20,[35,93.9,151.4],[611.5,665])]:
 for row in range(2):
  for col in range(3):move_cluster(side+' upper pilot '+str(row)+' '+str(col),(a+20+col*58,628+row*55),(xx[col],yys[row]))
for row,targets in enumerate([[-373.2,-320.6,-264.9,-208.6,-153.2,-97.3],[-377.4,-323.1,-261.8,-205.4,-150.2,-95]]):
 for k,u in enumerate(targets):move_cluster('left management '+str(row)+' '+str(k),(-398+k*66,750+row*52),(u,737.5 if row==0 else 793))
for row in range(2):
 for k,u in enumerate([-487,-437,-387,-317,-264,-212,-156,-106]):move_cluster('left service '+str(row)+' '+str(k),(-487+k*62,[869,930][row]),(u,865 if row==0 else 936))
for k,u in enumerate([35.8,93.5,154,199.2,256.5,318.8]):move_cluster('right management '+str(k),(43+k*72,790),(u,766.5))
move_cluster('right blue internal selector',(483,799),(399.2,766.1))
for k,u in enumerate([40.7,104,165.1,231,299.1,364,427.8]):move_cluster('right service '+str(k),(43+k*64,900),(u,868))
# Engraved outlines and display subcomponents follow the observed row divisions.
for name,rect in [('right power management',[8,735,354,826]),('right internal lights',[365,735,451,826]),('right lower services',[8,844,451,896])]:
 for o in parts:
  if o.name=='EVR | '+name:
   # Rebuild only the thin outline, retaining all other editable components.
   parts.remove(o);bpy.data.objects.remove(o,do_unlink=True);break
 frame(name,rect,7.799,.0007,'edge')
(W/'fit-controls.json').write_text(json.dumps({'method':'Native colored-control centres and visual panel boundaries. Fitting only, never reported as independent validation.','adjustments':adjustments},indent=2)+'\n')
inventory=[];deps=bpy.context.evaluated_depsgraph_get();digest=hashlib.sha256();triangles=0
for o in parts:
 if not o.data.uv_layers.get('UV0'):
  uv=o.data.uv_layers.new(name='UV0')
  for f in o.data.polygons:
   axes=np.argsort(np.abs(f.normal))[:2]
   for li in f.loop_indices:
    p=o.data.vertices[o.data.loops[li].vertex_index].co;uv.data[li].uv=(p[int(axes[0])]/.18,p[int(axes[1])]/.18)
 evaluated=o.evaluated_get(deps);d=evaluated.to_mesh();d.calc_loop_triangles();triangles+=len(d.loop_triangles);digest.update(o['componentID'].encode());digest.update(np.round(np.array([(o.matrix_world@v.co)[:]for v in d.vertices]),5).astype('<f8').tobytes());digest.update(np.array([t.vertices[:]for t in d.loop_triangles],dtype='<u4').tobytes());evaluated.to_mesh_clear()
 inventory.append({'id':o['componentID'],'assembly':o['assembly'],'classification':o['classification'],'referenceFace':o.get('referenceFace'),'referenceRect':json.loads(o['referenceRect'])if'referenceRect'in o else None,'referencePath':json.loads(o['referencePath'])if'referencePath'in o else None})
S['electricalVersion']='electrical-vr-r01';S['stage']='neutral electrical geometry; appearance acceptance pending'
binding={'version':1,'id':'electrical-vr-r01','strategy':'LDM-VR-EST-001 v1.0','sourceMasterSHA256':hashlib.sha256((R/'work/bulkhead-vr-r01/bulkhead-master.blend').read_bytes()).hexdigest(),'replacedIDs':replaced,'removedContextTriangles':removed,'editableObjects':len(parts),'sourceTriangles':triangles,'camera':E['camera'],'neutralGeometrySHA256':digest.hexdigest(),'stage':'neutral geometry milestone','visualAcceptance':False,'metricLimits':'The existing constant-height floor/ceiling and generators differ from the single VR station. The cabinet depths/supports are estimates; no surveyed dimensions are claimed.'}
(W/'component-inventory.json').write_text(json.dumps(inventory,ensure_ascii=False,indent=2)+'\n');(W/'authoring.json').write_text(json.dumps(binding,indent=2)+'\n')
S.render.engine='CYCLES';S.cycles.device='CPU';S.cycles.max_bounces=6;S.cycles.diffuse_bounces=3;S.cycles.glossy_bounces=3;S.render.threads_mode='FIXED';S.render.threads=4
bpy.ops.wm.save_as_mainfile(filepath=str(W/'electrical-neutral.blend'),compress=True)
print('ELECTRICAL NEUTRAL',len(parts),'objects;',triangles,'triangles;',removed,'old triangles removed',flush=True)
