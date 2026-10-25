"""Rebuild the KOHLER installation from the frozen native L/B observations.

Camera, both installed engines and the electrical-front components are fixed.
Only the old side-context proxy and explicitly enumerated legacy wall equipment
are replaced. Hidden depths and supports remain a documented reconstruction.
"""
import bpy, bmesh, numpy as np, json, math, hashlib, ast, os
from pathlib import Path
from mathutils import Vector
from mathutils.bvhtree import BVHTree
R=Path(__file__).resolve().parents[1];W=Path(os.environ['ELECTRICAL_AUTHORING_WORK']);S=bpy.context.scene;SX=35.23/36;SY=7.47/7.6
a=json.loads((W/'input-authoring.json').read_text());E=json.loads((W/'evidence-frozen.json').read_text());planes=json.loads((R/'tools/generator-planes.json').read_text())
for inherited in ['runtimeUVBinding','transportSourceGeometrySHA256']:a.pop(inherited,None)
C=bpy.data.collections.new('EDITABLE | VR generator');S.collection.children.link(C);parts=[]
mats={n:bpy.data.materials['EVR | '+n]for n in ['paint','edge','metal','dark','rubber','red','blue','green','cream','screen','copper','brass','warning-yellow']}
def pt(p):return Vector((p[1]*SY,-(p[0]*SX-17.615),p[2]-2.01))
def source(p):return Vector(((-p.y+17.615)/SX,p.x/SY,p.z+2.01))
def mat(n):return mats[n]
def register(o,name,material,group='generator'):
 o.name='GVR | '+name;o.data.materials.clear();o.data.materials.append(mat(material));o['componentID']='GVR/'+name;o['assembly']=group;o['classification']='observed visible shape; inferred depth and hidden construction';o['lightmap']='electrical';parts.append(o)
 for c in list(o.users_collection):c.objects.unlink(o)
 C.objects.link(o);return o
def bevel(o,r=.002,segments=3):
 if r:
  m=o.modifiers.new('Manufactured edge radius','BEVEL');m.width=r;m.segments=segments;m.limit_method='ANGLE';m.angle_limit=.4
  m=o.modifiers.new('Weighted face normals','WEIGHTED_NORMAL');m.keep_sharp=True
 return o
for n in ast.parse((R/'tools/build-left-engine.py').read_text()).body:
 if isinstance(n,ast.FunctionDef)and n.name in ['mesh','closed_solid','box','cylinder','tube','filtered']:exec(compile(ast.Module(body=[n],type_ignores=[]),__file__,'exec'),globals())
def material(name,rgb,rough,metal=0,coat=0):
 m=bpy.data.materials.new('GVR | '+name);m.use_nodes=True;m['family']='generator-'+name;m['electricalMaterial']=True;m['lightmap']='electrical';m['tileMetres']=.18;p=m.node_tree.nodes['Principled BSDF'];p.inputs['Base Color'].default_value=(*rgb,1);p.inputs['Roughness'].default_value=rough;p.inputs['Metallic'].default_value=metal;p.inputs['Coat Weight'].default_value=coat;m['ownedPBR']=json.dumps([list(rgb),rough,metal]);mats[name]=m
material('enamel',(.91,.92,.89),.27,0,.2);material('ceiling',(.93,.935,.91),.18,0,.42);material('brushed',(.72,.76,.78),.23,1);material('pilot-green',(.025,.48,.11),.24,0,.22);material('key-pink',(.64,.32,.46),.34);material('key-blue',(.20,.35,.65),.30);material('key-violet',(.22,.25,.64),.30);material('orange',(.91,.39,.055),.36);material('olive',(.18,.21,.105),.55);material('lcd',(.38,.43,.31),.28);material('white-ink',(.86,.88,.82),.5)

material('intercom-blue',(.30,.53,.70),.32,0,.15)

# Remove the 36 old generator/auxiliary proxy components, preserving every
# remaining electrical triangle, split normal, material and physical UV0.
oldC=bpy.data.collections['EDITABLE | VR electrical'];oldparts=[o for o in oldC.objects if o.get('assembly')=='side-context'];deps=bpy.context.evaluated_depsgraph_get()
removedEditableIDs=[o.get('componentID',o.name)for o in oldparts]
def key(ps):return tuple(sorted(tuple(round(float(x),5)for x in p)for p in ps))
drop=set();proxyVertices=[];proxyFaces=[];bezelVolumes=[]
for o in oldparts:
 d=o.evaluated_get(deps).to_mesh();d.calc_loop_triangles()
 offset=len(proxyVertices);proxyVertices.extend([o.matrix_world@v.co for v in d.vertices]);proxyFaces.extend([tuple(i+offset for i in t.vertices)for t in d.loop_triangles])
 if 'side generator control black bezel'in o.get('componentID',''):
  points=np.array([tuple(p)for p in proxyVertices[offset:]]);bezelVolumes.append((points.min(0)-.001,points.max(0)+.001,d.materials[0].original.name,o.get('componentID')))
 for t in d.loop_triangles:drop.add(key([o.matrix_world@d.vertices[i].co for i in t.vertices]))
 o.evaluated_get(deps).to_mesh_clear()
oldHero=S.objects['EVR installed | static'];d=oldHero.data
assert len(bezelVolumes)==1
foreign=[]
for o in oldC.objects:
 if o in oldparts or o.type!='MESH':continue
 points=np.array([tuple(o.matrix_world@Vector(p))for p in o.bound_box]);lo,hi=points.min(0),points.max(0)
 for bb0,bb1,material,id in bezelVolumes:
  if any(m.name==material for m in o.data.materials)and np.all(np.minimum(hi,bb1)-np.maximum(lo,bb0)>.0001):foreign.append(o.name)
assert not foreign,('Bezel ownership box intersects another retained component',foreign)
proxyTree=BVHTree.FromPolygons(proxyVertices,proxyFaces,all_triangles=True);tolerance=.0003;roundedMatches=0;surfaceMatches=0;boundedAdditional=0;keep=[]
for f in d.polygons:
 ps=[oldHero.matrix_world@d.vertices[i].co for i in f.vertices];rounded=key(ps)in drop;roundedMatches+=int(rounded);center=sum(ps,Vector())/len(ps);nearest=proxyTree.find_nearest(center)
 owned=rounded or(nearest[0]is not None and nearest[3]<tolerance and all(proxyTree.find_nearest(p)[3]<tolerance for p in ps))
 material=d.materials[f.material_index].name;bounded=any(material==name and all(np.all(np.array(p)>=lo)and np.all(np.array(p)<=hi)for p in ps)for lo,hi,name,id in bezelVolumes)
 if bounded and not owned:owned=True;boundedAdditional+=1
 if owned:surfaceMatches+=1
 else:keep.append(f.index)
oldloops=[li for j in keep for li in d.polygons[j].loop_indices];oldverts=sorted({i for j in keep for i in d.polygons[j].vertices})
hero=filtered(oldHero,keep,'EVR installed | retained front');hero.matrix_world=oldHero.matrix_world.copy()
for name in ['_BAKE_MODE','_CLEARANCE_ID','_IRRADIANCE']:
 old=d.attributes[name];attr=hero.data.attributes.new(name=name,type=old.data_type,domain=old.domain);indices=oldverts if old.domain=='POINT'else oldloops;field='vector'if old.data_type=='FLOAT_VECTOR'else'value';attr.data.foreach_set(field,np.array([getattr(old.data[i],field)for i in indices],dtype=np.float32).ravel())
removedProxyTriangles=len(d.polygons)-len(keep);assert removedProxyTriangles>100
bpy.data.objects.remove(oldHero,do_unlink=True)
for o in oldparts:bpy.data.objects.remove(o,do_unlink=True)
hero['sourceIDs']=json.dumps([o.get('componentID')for o in oldC.objects])
attr=hero.data.attributes.new(name='_GENERATOR_ID',type='FLOAT',domain='POINT');attr.data.foreach_set('value',np.ones(len(hero.data.vertices),dtype=np.float32))
retainedTree=BVHTree.FromPolygons([hero.matrix_world@v.co for v in hero.data.vertices],[tuple(f.vertices)for f in hero.data.polygons],all_triangles=True);residual=[]
for i,face in enumerate(proxyFaces):
 ps=[proxyVertices[j]for j in face];area=(ps[1]-ps[0]).cross(ps[2]-ps[0]).length/2
 if area<1.2e-7:continue
 center=sum(ps,Vector())/3;near=retainedTree.find_nearest(center)
 if near[0]is not None and near[3]<tolerance:residual.append(i)
assert not residual,('Old proxy surface remains in the retained front',residual)
a['proxyRemoval']={'method':'Evaluated original proxy BVH,0.3mm surface tolerance. The compressed black bezel additionally uses its evaluated1mm-expanded ownership bounds and matching material; no retained authored component intersects that volume. Reverse centroid check on the retained front.','evaluatedProxyTriangles':len(proxyFaces),'removedMergedTriangles':surfaceMatches,'roundedKeyOnlyMatches':roundedMatches,'additionalSurfaceMatches':surfaceMatches-roundedMatches-boundedAdditional,'boundedBezelAdditionalTriangles':boundedAdditional,'boundedBezelForeignComponentIntersections':len(foreign),'toleranceMetres':tolerance,'remainingProxyCentroidMatches':len(residual)}

meta=json.loads((R/'work/machinery-r11/snapshot/machinery.json').read_text());blob=(R/'work/machinery-r11/snapshot/machinery.bin').read_bytes();v=np.frombuffer(blob,dtype='<f4',count=meta['vertices']*11).reshape(-1,11)[:,:3];ix=np.frombuffer(blob,dtype='<u4',offset=meta['vertexBytes'],count=meta['triangles']*3).reshape(-1,3);pi=np.frombuffer(blob,dtype='<u4',offset=meta['vertexBytes']+meta['indexBytes'],count=meta['triangles'])
extra=[]
for p in meta['parts']:
 id=p['id'];take=False
 if id.startswith('LD_R02/machinery/safety/'):take=int(id.split('/')[-1])<=10
 if id.startswith('LD_R02/photo-layout/safety/'):take=int(id.split('/')[-1])in [110,111,112]
 if id.startswith('LD_R02/machinery-craft/safety/'):take=378<=int(id.split('/')[-1])<=413
 if id.startswith('LD_R02/machinery/cables/'):take=20<=int(id.split('/')[-1])<=32
 if id in ['LD_R02/machinery/ceiling/16','LD_R02/machinery/lining/0','LD_R02/photo-layout/ceiling/97','LD_R02/photo-layout/ceiling/98','LD_R02/photo-layout/ceiling/99','LD_R02/machinery-craft/ceiling/466','LD_R02/machinery-craft/ceiling/467','LD_R02/machinery-craft/ceiling/468']:take=True
 if take:extra.append(id)
dropkeys={key([(v[j,0],-v[j,2],v[j,1])for j in t])for t,p in zip(ix,pi)if meta['parts'][int(p)]['id']in extra}
contextRemoved=[]
for o in list(S.objects):
 if o.type!='MESH'or o==hero or o.name.startswith(('EVR |','EVR evaluated','BVR |','BVR installed','LVR |','LVR installed','RVR |','RVR installed')):continue
 keep=[f.index for f in o.data.polygons if key([o.matrix_world@o.data.vertices[i].co for i in f.vertices])not in dropkeys]
 if len(keep)==len(o.data.polygons):continue
 contextRemoved.append(dict(object=o.name,triangles=len(o.data.polygons)-len(keep)))
 if keep:
  q=filtered(o,keep,'GVR context | '+o.name);q.matrix_world=o.matrix_world.copy();q.hide_render=o.hide_render;q.hide_viewport=o.hide_viewport
  for c in list(q.users_collection):c.objects.unlink(q)
  for c in o.users_collection:c.objects.link(q)
 bpy.data.objects.remove(o,do_unlink=True)

def lp(uv,y=2.90):
 u,v=uv;t=y*SY;return Vector((9.15+(u-1024)*t/1024/SX,y,3.18+(1024-v)*t/1024))
def annotate(o,id,rect=None,path=None):
 o['evidenceID']=id;o['referenceFace']='l'
 if rect:o['referenceRect']=json.dumps(rect)
 if path:o['referencePath']=json.dumps(path)
 return o
def polyplate(name,outline,y,depth,material='enamel',id='G01',radius=.001):
 front=[pt(lp(p,y))for p in outline];rear=[p+Vector((depth,0,0))for p in front];n=len(front);faces=[tuple(range(n-1,-1,-1)),tuple(range(n,2*n))]+[(i,(i+1)%n,(i+1)%n+n,i+n)for i in range(n)];o=bevel(closed_solid(mesh(name,front+rear,faces,material,'generator')),radius);annotate(o,id,[min(p[0]for p in outline),min(p[1]for p in outline),max(p[0]for p in outline),max(p[1]for p in outline)]);return o
def rect(name,r,y=2.9,depth=.007,material='enamel',id='G01',radius=.002):
 x,v,xx,vv=r;return polyplate(name,[(x,v),(xx,v),(xx,vv),(x,vv)],y,depth,material,id,radius)
def path(name,ps,y=2.9,r=.002,material='rubber',id='B04',radial=10,sub=4):
 pts=[lp(p[:2],p[2]if len(p)>2 else y)for p in ps];return annotate(tube(name,pts,r,material,'generator',radial,sub),id,path=[list(p[:2])for p in ps])
def disc(name,uv,rpx,y,depth=.005,material='metal',id='G02',segments=24):
 p=lp(uv,y);end=p.copy();end.y-=depth/SY;o=cylinder(name,p,end,rpx*y*SY/1024,material,'generator',segments);return annotate(o,id,[uv[0]-rpx,uv[1]-rpx,uv[0]+rpx,uv[1]+rpx])
def screw(name,uv,y=2.86,rpx=2.2,id='G02'):
 disc(name,uv,rpx,y,.0025,'metal',id,16);path(name+' driver',[(uv[0]-rpx*.55,uv[1]),(uv[0]+rpx*.55,uv[1])],y-.003,.0006,'dark',id,6,1)
def lettering(name,text,r,y,material='dark',id='G07',bold=False):
 bpy.ops.object.text_add();o=bpy.context.object;o.data.body=text;o.data.align_x='CENTER';o.data.align_y='CENTER';o.data.resolution_u=2
 fontpath='/usr/share/fonts/truetype/dejavu/DejaVuSans'+('-Bold'if bold else'')+'.ttf';o.data.font=bpy.data.fonts.load(fontpath,check_existing=True);bpy.ops.object.convert(target='MESH');xs=[v.co.x for v in o.data.vertices];ys=[v.co.y for v in o.data.vertices];cx=(min(xs)+max(xs))/2;cy=(min(ys)+max(ys))/2;x,v,xx,vv=r;s=min((xx-x)/max(max(xs)-min(xs),1e-8),(vv-v)/max(max(ys)-min(ys),1e-8));u=(x+xx)/2;w=(v+vv)/2
 for p in o.data.vertices:p.co=pt(lp([u+(p.co.x-cx)*s,w-(p.co.y-cy)*s],y))
 o.location=(0,0,0);register(o,name,material);annotate(o,id,r);o['legibleReferenceText']=text;return o
def outline_round(r,radius=18):
 x,y,xx,yy=r;ps=[]
 for u,v,start in [(x+radius,y+radius,math.pi),(xx-radius,y+radius,1.5*math.pi),(xx-radius,yy-radius,0),(x+radius,yy-radius,.5*math.pi)]:
  ps.extend([(u+radius*math.cos(t),v+radius*math.sin(t))for t in np.linspace(start,start+math.pi/2,7)])
 return ps

# Generator shell and correctly divided doors. Front panels are solids over
# recessed gaskets, not tube drawings on a single generic box.
polyplate('sound enclosure rolled shell',outline_round([334,1034,1260,1547],22),2.91,.50,id='G01',radius=.003)
for name,r in [('controller door',[356,1073,597,1196]),('lower service door',[356,1199,597,1527]),('large service door',[600,1073,1240,1527])]:
 rect(name+' gasket',r,2.899,.004,'dark','G05',.001)
 rr=[r[0]+1.2,r[1]+1.2,r[2]-1.2,r[3]-1.2];rect(name,rr,2.890,.009,'enamel','G05',.002)
path('upper rolled shoulder joint',[(335,1072),(1250,1072)],2.902,.0008,'edge','G01',6,1)
polyplate('bottom folded retaining lip',outline_round([325,1529,1268,1548],5),2.870,.55,'enamel','G08',.002)
rect('controller black outer seat',[409,1094,546,1184],2.877,.013,'rubber','G02',.006)
rect('controller metal perimeter',[411,1096,544,1182],2.868,.008,'brushed','G02',.004)
rect('controller inner black fascia',[416,1101,539,1178],2.859,.005,'dark','G02',.002)
rect('controller LCD bezel',[450,1118,500,1151],2.852,.004,'rubber','G04',.001)
rect('controller LCD face',[453,1121,497,1149],2.847,.002,'lcd','G04',.001)
path('controller protective top hinge',[(406,1088),(547,1088)],2.861,.003,'brushed','G02',12,1)
for u in [413,542]:
 for v in [1099,1180]:screw('controller frame screw '+str((u,v)),(u,v),2.849,2.4)
# Authored hazard stripes, clipped to the source-observed rectangular field.
rect('stop contrast field',[419,1116,447,1154],2.851,.002,'dark','G03',0)
def clip(poly,axis,value,greater):
 out=[]
 for p,q in zip(poly,poly[1:]+poly[:1]):
  aa=(p[axis]>=value)if greater else(p[axis]<=value);bb=(q[axis]>=value)if greater else(q[axis]<=value)
  if aa:out.append(p)
  if aa!=bb:
   t=(value-p[axis])/(q[axis]-p[axis]);out.append([p[j]+t*(q[j]-p[j])for j in range(2)])
 return out
for k in range(1528,1610,7):
 ps=[[390,k-390],[480,k-480],[480,k+3-480],[390,k+3-390]]
 for ax,value,great in [(0,419,True),(0,447,False),(1,1116,True),(1,1154,False)]:ps=clip(ps,ax,value,great)if ps else[]
 if len(ps)>2:polyplate('stop hazard stripe '+str(k),ps,2.847,.001,'warning-yellow','G03',0)
disc('stop mounting collar',(432,1136),11.6,2.843,.006,'dark','G03',32)
disc('red emergency stop',(432,1136),10.1,2.836,.014,'red','G03',40)
for i,(u,m)in enumerate([(461,'key-pink'),(476,'key-blue'),(491,'key-violet')]):
 rect('controller key seat '+str(i),[u-4,1154,u+4,1166],2.850,.003,'rubber','G04',.002)
 rect('controller colored key '+str(i),[u-3,1155,u+3,1164],2.846,.003,m,'G04',.002)
 path('key printed mark '+str(i),[(u-1,1159),(u+1,1159)],2.842,.00045,'white-ink','G04',5,1)
rect('controller selector silver keyline',[503,1119,534,1152],2.852,.002,'metal','G04',.001)
rect('controller selector black field',[505,1121,532,1150],2.848,.002,'dark','G04',.001)
disc('controller right rotary knob',(516,1135),7.4,2.844,.008,'rubber','G04',28)
path('rotary index',[(516,1129),(516,1134)],2.834,.0007,'white-ink','G04',6,1)
rect('controller lower right switch',[513,1158,521,1165],2.847,.004,'rubber','G04',.001)
disc('controller lower left switch',(435,1160),3.0,2.848,.006,'rubber','G04',16)
lettering('controller manufacturer','KOHLER',[422,1104,444,1110],2.852,'white-ink','G04',True)
lettering('generator manufacturer','KOHLER.',[372,1439,516,1469],2.879,'dark','G07',True)
for i,(u,v)in enumerate([(408,1230),(550,1230),(731,1112)]):
 rect('latch recessed seat '+str(i),[u-8,v-22,u+8,v+22],2.881,.006,'dark','G05'if i<2 else'G06',.003)
 rect('latch brushed rim '+str(i),[u-6.5,v-20,u+6.5,v+20],2.876,.003,'brushed','G05'if i<2 else'G06',.002)
 rect('latch moving tongue '+str(i),[u-4.3,v-17,u+4.3,v+9],2.871,.004,'olive','G05'if i<2 else'G06',.002)
 disc('latch keyway '+str(i),(u,v+12),2.2,2.870,.003,'dark','G05'if i<2 else'G06',16)
 rect('latch keyway slit '+str(i),[u-.6,v+10,u+.6,v+14],2.866,.001,'metal','G05'if i<2 else'G06',0)
for name,r,color,id in [('generator warning',[745,1097,797,1140],'white-ink','G06'),('lower warning',[360,1204,395,1217],'warning-yellow','G05')]:
 rect(name+' plate',r,2.882,.001,color,id,.0005);rect(name+' top stripe',[r[0],r[1],r[2],r[1]+4],2.880,.001,'orange'if id=='G06'else'warning-yellow',id,0)
 for j in range(3):path(name+' unreadable line '+str(j),[(r[0]+3,r[1]+8+4*j),(r[2]-4-3*j,r[1]+8+4*j)],2.878,.00035,'edge',id,4,1)
for y in [2.94,3.32]:
 box('generator continuous support rail '+str(y),[8.50,y,1.613],[2.60,.045,.035],'brushed','generator',.002)
 for x in [7.34,8.50,9.66]:
  floor=1.58 if y<3.1 else 1.55
  o=box('generator inferred foundation pad '+str((x,y)),[x,y,(floor+1.601)/2],[.10,.070,1.601-floor+.002],'rubber','generator',0);o['evidenceID']='G08';o['classification']='inferred support filling the measured digital rail-to-floor gap; hidden arrangement is not established by VR'
  box('generator seated mounting foot '+str((x,y)),[x,y,1.686],[.074,.072,.116],'brushed','generator',.004)
  cylinder('foot isolation core '+str((x,y)),[x,y,1.6305],[x,y,1.664],.026,'rubber','generator',20)
  for dx in [-.023,.023]:cylinder('foot fastener '+str((x,y,dx)),[x+dx,y,1.636],[x+dx,y,1.644],.005,'metal','generator',12)
for o in parts:
 if 'support rail'in o.name or 'mounting foot'in o.name or 'foot isolation'in o.name or 'foot fastener'in o.name:o['evidenceID']='G08';o['classification']='visible supporting arrangement; rear support positions inferred'

# Rigid panel frames fitted from the photographic quadrilaterals. Controls
# share the same local panel plane instead of independent staggered Z values.
origin=np.array([0.,1.17,9.15*SX-17.615])
def world_to_bl(p):return Vector((p[0],-p[2],p[1]))
def frame_data(name):
 f=planes[name];t=np.array(f['centerWebRelativeCamera'])+origin;r=np.array(f['axesWeb']);return f,t,r
def onframe(name,uv,offset=0):
 f,t,r=frame_data(name);ray=np.array([1.,1-uv[1]/1024,uv[0]/1024-1]);n=r[:,2];p=origin+ray*((np.dot(n,t-origin)+offset)/np.dot(n,ray));return source(world_to_bl(p))
def panel_shape(name,frame,wscale,hscale,offset,depth,material,id,radius=.003):
 f,t,r=frame_data(frame);w=f['widthMetresInferred']*wscale;h=f['heightMetresInferred']*hscale;front=[world_to_bl(t+r@np.array([x*w/2,y*h/2,offset]))for x,y in [(-1,1),(1,1),(1,-1),(-1,-1)]];back=[p-world_to_bl(r[:,2])*depth for p in front];o=bevel(closed_solid(mesh(name,front+back,[(3,2,1,0),(4,5,6,7)]+[(i,(i+1)%4,(i+1)%4+4,i+4)for i in range(4)],material,'generator')),radius);o['evidenceID']=id;return o
def panel_pilot(name,frame,uv,material,id):
 f,t,r=frame_data(frame);front=onframe(frame,uv,.022);n=source(world_to_bl(origin+r[:,2]))-source(world_to_bl(origin));n=Vector(n);radius=pt(front).x*(8.3 if frame=='auxiliary'else 10)/1024;p=front-n*.013;end=front-n*.006;cylinder(name+' bezel',p,end,radius*1.20,'metal','generator',24);cylinder(name+' lens',end,front,radius,material,'generator',28)
for frame,id in [('auxiliary','A01'),('intercom','I01')]:
 panel_shape(frame+' case',frame,1.04,1.04,-.006,.105,'enamel',id,.009)
 panel_shape(frame+' lid gasket',frame,1,1,0,.004,'rubber',id,.004)
 panel_shape(frame+' cover',frame,.985,.985,.004,.006,'enamel',id,.007)
for i,p in enumerate([(214.5,1251.8),(248.9,1241.0),(280.4,1231.8)]):panel_pilot('auxiliary green indicator '+str(i),'auxiliary',p,'pilot-green','A01')
panel_pilot('intercom blue pilot','intercom',(241,638),'intercom-blue','I01');panel_pilot('intercom green selector','intercom',(237,701),'pilot-green','I01')
for i,uv in enumerate([(220,616),(356,614),(221,723),(359,721)]):
 p=onframe('intercom',uv,.012);f,t,r=frame_data('intercom');n=source(world_to_bl(origin+r[:,2]))-source(world_to_bl(origin));cylinder('intercom lid fastener '+str(i),p,p+Vector(n)*.002,.003,'metal','generator',12)
p=onframe('auxiliary',(250,1288),.014);f,t,r=frame_data('auxiliary');n=source(world_to_bl(origin+r[:,2]))-source(world_to_bl(origin));cylinder('auxiliary selector base',p,p+Vector(n)*.008,.013,'metal','generator',24);tube('auxiliary selector lever',[p+Vector(n)*.009,p+Vector(n)*.014+Vector((.025,0,.002))],.006,'dark','generator',12,1)
for frame,uv,id in [('auxiliary',(248,1262),'A01'),('intercom',(312,688),'I01')]:
 # Only the short words readable in the photograph are authored as text.
 if frame=='intercom':
  label=lettering('intercom area marking','ENGINE ROOM AREA',[286,680,348,687],1.43,'dark',id)
  def ink_to_panel(o):
   for v in o.data.vertices:
    q=np.array([v.co.x,v.co.z-1.17,-v.co.y-origin[2]]);uv=[1024+q[2]/q[0]*1024,1024-q[1]/q[0]*1024];v.co=pt(onframe('intercom',uv,.0048))
   o.data.update();o['forceVertexLighting']=True
  ink_to_panel(label);label=lettering('intercom observed maker','AZIMUT',[272,711,310,720],1.43,'dark',id);ink_to_panel(label)
  for j,rct in enumerate([[245,615,326,616],[245,623,326,624],[245,615,246,624],[325,615,326,624]]):
   x,v,xx,vv=rct;o=mesh('intercom nameplate outline '+str(j),[pt(onframe('intercom',uv,.0049))for uv in [(x,v),(x,vv),(xx,vv),(xx,v)]],[(0,1,2,3)],'edge','generator');o['evidenceID']='I01';o['forceVertexLighting']=True
# Speaker grille on the actual side of the intercom, not another front decal.
f,t,r=frame_data('intercom')
def side_grille(name,z0,z1,y0,y1,material,outset):
 x=f['widthMetresInferred']*1.04/2+outset;front=[world_to_bl(t+r@np.array([x,y,z]))for z,y in [(z0,y1),(z1,y1),(z1,y0),(z0,y0)]];back=[p-world_to_bl(r[:,0])*.0018 for p in front];o=closed_solid(mesh(name,front+back,[(3,2,1,0),(4,5,6,7)]+[(i,(i+1)%4,(i+1)%4+4,i+4)for i in range(4)],material,'generator'));o['evidenceID']='I01';return o
side_grille('intercom side speaker border',-.020,-.092,-.045,.045,'rubber',.0015)
side_grille('intercom side speaker field',-.025,-.087,-.040,.040,'dark',.0035)
for j in range(8):side_grille('intercom speaker slot '+str(j),-.031,-.081,-.034+j*.008,-.0315+j*.008,'edge',.0055)

# Auxiliary box wiring and a continuous hose route into the generator side.
path('auxiliary perforated support',[(110,1351,2.65),(302,1322,2.65)],r=.010,material='brushed',id='A02',radial=8,sub=1)
for i in range(5):
 u=190+17*i;path('auxiliary bundled cable '+str(i),[(u,1331,2.60),(u+10,1335,2.62),(254+i*5,1330,2.65),(282+i*5,1353,2.67),(282+i*5,1480,2.67)],r=.004,material='rubber',id='A02',radial=10,sub=5)
for v in [1366,1420,1473]:rect('auxiliary cable saddle '+str(v),[274,v-3,310,v+3],2.69,.012,'metal','A02',.001)
path('white lower service elbow',[(197,1654,2.57),(180,1648,2.57),(170,1626,2.57),(170,1540,2.57),(170,1531,2.57)],r=.042,material='enamel',id='P02',radial=24,sub=7)
path('yellow metal elbow',[(170,1531,2.57),(171,1517,2.57),(182,1504,2.57),(204,1497,2.57)],r=.043,material='brass',id='P01',radial=28,sub=8)
# Turn behind the left casing edge before reaching the maker's lettering.
# The old straight approach crossed the visible front in the fixed L view.
path('connected black hose',[(204,1497,2.57),(248,1495,2.60),(301,1479,2.64),(324,1470,2.78),(350,1466,2.96),(390,1465,3.02)],r=.025,material='rubber',id='P01',radial=20,sub=5)
for i,(u,v,y)in enumerate([(207,1497,2.57),(231,1496,2.59),(291,1482,2.63)]):
 p=lp((u,v),y);cylinder('hose stainless band '+str(i),p-Vector((.008,0,0)),p+Vector((.008,0,0)),.028,'metal','generator',28);box('hose band screw '+str(i),p+Vector((0,-.026,.016)),[.017,.012,.012],'metal','generator',.001)
for v in [1534,1550]:path('white pipe collar '+str(v),[(164,v,2.57),(176,v,2.57)],r=.044,material='enamel',id='P02',radial=20,sub=1)
rect('white pipe wall saddle',[146,1567,193,1583],2.61,.025,'brushed','P02',.002)
path('yellow green bonded conductor',[(180,1490,2.57),(250,1488,2.61),(337,1464,2.75),(374,1458,2.96)],r=.0015,material='pilot-green',id='P01',radial=6,sub=3)

# Wall and its local ceiling closure. The forward return preserves the old
# wall location beyond the generator; the recess admits a plausible enclosure.
box('recessed local backing wall',[8.34,3.53,2.69],[3.02,.025,2.27],'enamel','generator',.002)
box('forward retained wall continuation',[11.53,3.145,2.665],[3.12,.025,2.23],'enamel','generator',.002)
box('backing wall transition return',[9.94,3.34,2.69],[.025,.41,2.27],'enamel','generator',.002)
roof=box('closed local ceiling panel',[8.02,1.78,3.7825],[4.0,3.53,.015],'ceiling','generator',.001)
# The ventilation duct intentionally passes through a seated roof collar.
fan=lp((880,660),1.65);fan.z=3.55
bpy.ops.mesh.primitive_cylinder_add(vertices=48,radius=.205,depth=.30,location=pt([fan.x,1.65,3.80]));cut=bpy.context.object;mod=roof.modifiers.new('Seated duct aperture','BOOLEAN');mod.operation='DIFFERENCE';mod.solver='EXACT';mod.object=cut;bpy.context.view_layer.objects.active=roof;roof.select_set(True);bpy.ops.object.modifier_apply(modifier=mod.name);bpy.data.objects.remove(cut,do_unlink=True)
for x in [6.84,7.55,8.25,8.95,9.95]:tube('ceiling panel seam '+str(x),[[x,.02,3.774],[x,3.52,3.774]],.00065,'edge','generator',5,1)
for y in [.85,1.80,2.75]:tube('ceiling transverse trim '+str(y),[[6.05,y,3.771],[9.95,y,3.771]],.0012,'brushed','generator',6,1)
for i,(u0,u1,v)in enumerate([(48,154,494),(530,1210,506)]):
 z=3.758;d=(z-3.18)/(1-v/1024);y=d/SY;p0=lp((u0,v),y);p1=lp((u1,v),y);c=(p0+p1)/2;length=(pt(p1)-pt(p0)).length
 box('linear lamp housing '+str(i),[c.x,c.y,z+.003],[length,.018,.012],'brushed','generator',.003)
 emitter=box('linear lamp diffuser '+str(i),[c.x,c.y,z-.004],[length-.012,.010,.004],'white-ink','generator',.001);em=mat('white-ink').copy();em.name='GVR | lamp emitter '+str(i);em['ownedPBR']=json.dumps([[.91,.94,.86],.35,0]);em.node_tree.nodes['Principled BSDF'].inputs['Emission Color'].default_value=(.91,.94,.86,1);em.node_tree.nodes['Principled BSDF'].inputs['Emission Strength'].default_value=60;emitter.data.materials[0]=em;emitter.visible_diffuse=False;emitter.visible_glossy=False;emitter.visible_shadow=False
 light=bpy.data.lights.new('Generator observed lamp '+str(i),'AREA');light.shape='RECTANGLE';light.size=max(length,.08);light.size_y=.018;light.energy=650 if i else 100;light.color=(.94,.97,.91);o=bpy.data.objects.new(light.name,light);S.collection.objects.link(o);o.location=pt([c.x,c.y,z-.008]);o.rotation_euler=(0,0,math.pi/2)

# Rear mounted cabinet, its actual colored controls and the two vertical runs.
rect('rear cabinet mounting board',[566,850,938,1045],3.28,.025,'enamel','B01',.004)
rect('rear cabinet shell',[609,868,763,1031],3.09,.15,'enamel','B01',.010)
rect('rear cabinet perimeter gasket',[616,874,755,1026],3.075,.006,'rubber','B01',.004)
rect('rear cabinet closed door',[618,876,753,1024],3.067,.008,'enamel','B01',.004)
disc('rear cabinet lock',(637,947),4.2,3.054,.004,'dark','B01',20)
disc('rear cabinet green pilot',(686,957),5.8,3.053,.008,'pilot-green','B01',24)
rect('rear cabinet red switch yellow seat',[668,978,704,1011],3.055,.005,'warning-yellow','B01',.001)
disc('rear cabinet red isolator',(686,994),10,3.046,.014,'red','B01',28)
path('rear cabinet isolator handle',[(684,985),(688,1000)],3.028,.004,'dark','B01',8,1)
lettering('rear cabinet observed maker','AZIMUT',[649,910,711,920],3.052,'dark','B01')
for i in range(7):rect('rear cabinet side ventilation '+str(i),[762,963+i*5,775,965+i*5],3.13,.008,'dark','B01',.0008)
for i,u in enumerate([645,666,688,710]):
 disc('rear cable gland '+str(i),(u,1035),4.8,3.10,.019,'metal','B02',16);path('rear cabinet cable '+str(i),[(u,1036,3.10),(u+5,1050,3.15),(u+12,1065,3.23)],r=.007,material='orange'if i==3 else'rubber',id='B02',radial=10,sub=4)
for i,u in enumerate([800,854]):
 path('rear vertical conduit '+str(i),[(u,870,3.13),(u,1048,3.13)],r=.017,material='enamel',id='B03',radial=24,sub=1)
 for v in [900,1002]:
  rect('conduit mounting pad '+str((i,v)),[u-17,v-8,u+17,v+8],3.18,.025,'rubber','B03',.001)
  rect('conduit retaining saddle '+str((i,v)),[u-14,v-6,u+14,v+6],3.087,.016,'brushed','B03',.002)
  for du in [-10,10]:screw('conduit saddle screw '+str((i,v,du)),(u+du,v),3.068,2.2,'B03')
for i in range(8):
 u=495+8*i;path('rear dense cable bundle '+str(i),[(u,1038,3.25),(u-4,945,3.25),(u-2,856,3.25),(u+18,828,3.25),(u+124,826+i*3,3.25),(u+193,839+i*3,3.25)],r=.007,material='rubber',id='B04',radial=10,sub=5)
for v in [875,938,1003]:path('rear cable tie '+str(v),[(480,v,3.23),(569,v,3.23)],r=.002,material='metal',id='B04',radial=6,sub=1)

# Upper intercom leads, open supporting baffle and its compact ear protection.
polyplate('intercom open bracket back',[(212,816),(500,816),(500,991),(212,991)],1.73,.018,'enamel','I04',.002)
for r in [[210,812,500,826],[210,977,500,991],[210,812,224,991]]:rect('intercom bracket folded edge '+str(r),r,1.49,.25,'enamel','I04',.002)
for i,u in enumerate([282,307,333,359,385,410]):
 p=lp((u,752),1.57);cylinder('intercom underside gland '+str(i),p,p+Vector((0,0,-.018)),.006,'metal','generator',16)
 if i==0:ps=[(u,754,1.57),(u-8,779,1.57),(u-18,780,1.57),(u-28,768,1.57),(u-27,740,1.57)]
 else:ps=[(u,754,1.57),(u+9,786,1.63),(u+24,810,1.69),(431,824+i*2,1.75),(457,798,1.79),(459,680,1.79),(459,603,1.79)]
 path('intercom lead '+str(i),ps,r=.0038 if i else .002,material='rubber',id='I03',radial=10,sub=6)
for v in [640,696,756]:rect('intercom loom clip '+str(v),[451,v-3,467,v+3],1.78,.012,'metal','I03',.001)
for n,uv,rx,ry,material in [('upper',(165,699),33,36,'cream'),('lower',(151,759),43,26,'olive')]:
 center=pt(lp(uv,1.30));bpy.ops.mesh.primitive_uv_sphere_add(segments=28,ring_count=16,location=center);o=bpy.context.object;o.scale=(.022,rx*1.30*SY/1024,ry*1.30*SY/1024);bpy.ops.object.transform_apply(location=False,rotation=False,scale=True);register(o,'ear protection '+n+' shell',material);o['evidenceID']='I02'
 for face in o.data.polygons:face.use_smooth=True
 path('ear protection '+n+' padded edge',[(uv[0]+rx*math.cos(t),uv[1]+ry*math.sin(t))for t in np.linspace(0,math.tau,49)],1.28,.004,'rubber','I02',10,1)
path('ear protection curved headband',[(91,741),(83,705),(99,668),(131,646),(167,658),(199,687)],1.32,.005,'rubber','I02',12,6)
path('ear protection left yoke connection',[(91,741),(99,749),(109,754)],1.32,.005,'rubber','I02',10,3)
path('ear protection lower hanging strap',[(113,780),(144,794),(189,790),(207,765)],1.31,.006,'olive','I02',10,5)
def cap_disc(name,uv,rpx,y,depth,material,segments):
 front=lp(uv,y);back=front.copy();back.y+=depth/SY;o=cylinder(name,back,front,rpx*y*SY/1024,material,'generator',segments);o['evidenceID']='I02';return o
cap_disc('ear protection upper inset face',(165,699),23,1.268,.040,'cream',32)
cap_disc('ear protection upper center boss',(165,699),6.8,1.261,.010,'white-ink',24)
for uv in [(110,690),(202,694),(109,754),(190,767)]:cap_disc('ear protection yoke pivot '+str(uv),uv,3.2,1.266,.055,'metal',16)
polyplate('ear protection lower woven strap',[(137,786),(177,804),(199,779),(190,777),(173,794),(142,781)],1.30,.004,'olive','I02',.001)

# Source-visible white upper junction and directional marker. Their hidden
# function/depth is not identified as a service exit or a particular circuit.
rect('upper junction white front',[450,592,641,676],1.35,.20,'enamel','C02',.002)
for u in [463,620]:
 p=lp((u,592),1.35);o=box('upper junction roof mounting '+str(u),[p.x,1.46,3.757],[.018,.12,.040],'enamel','generator',.001);o['evidenceID']='C02';o['classification']='inferred attachment connecting the observed junction to the digital ceiling'
polyplate('upper junction left upright',[(451,674),(467,681),(469,807),(452,799)],1.48,.08,'enamel','C02',.002)
polyplate('upper junction inclined inner panel',[(471,680),(641,680),(721,717),(490,786)],1.70,.012,'enamel','C02',.002)
polyplate('upper junction right enclosure',[(641,604),(689,635),(691,708),(642,676)],1.42,.045,'enamel','C02',.003)
for u,v in [(455,666),(636,666)]:screw('upper junction fastener '+str((u,v)),(u,v),1.343,2.0,'C02')
rect('observed green direction plate',[605,642,623,660],1.342,.001,'pilot-green','C02',0)
polyplate('observed white left arrow',[(607,651),(615,644),(615,648),(621,648),(621,653),(615,653),(615,658)],1.340,.0005,'white-ink','C02',0)
for u,v in [(652,638),(656,660)]:
 disc('upper junction cable gland '+str((u,v)),(u,v),6,1.405,.006,'enamel','C02',20);disc('upper junction gland aperture '+str((u,v)),(u,v),3,1.397,.007,'rubber','C02',16)

# Ventilator front, orange actuator and the circular lower grille.
rect('ventilator brushed housing',[722,649,1040,787],1.42,.37,'brushed','V01',.003)
rect('actuator black backing',[729,669,903,737],1.401,.013,'rubber','V01',.003)
rect('actuator cast frame',[733,672,900,734],1.391,.009,'metal','V01',.003)
rect('orange actuator face',[739,680,894,727],1.380,.004,'orange','V01',.001)
disc('actuator rotary seat',(865,705),10.5,1.374,.004,'edge','V01',24)
path('actuator blue lever',[(861,696),(871,710)],1.366,.0038,'blue','V01',12,1)
for uv in [(736,675),(815,675),(896,675),(736,731),(815,731),(896,731)]:screw('actuator frame screw '+str(uv),uv,1.373,2.3,'V01')
for uv in [(727,655),(885,655),(1030,655),(727,781),(885,781),(1030,781)]:screw('ventilator casing screw '+str(uv),uv,1.407,2,'V01')
for i in range(2):path('ventilator actuator lead '+str(i),[(736,697+i*15,1.42),(709,705+i*17,1.45),(700,742+i*12,1.55),(675,714+i*7,1.54),(658,683+i*5,1.45),(652+i*4,638+i*22,1.39)],r=.0035,material='rubber',id='V04',radial=10,sub=5)
path('rear copper service bend',[(490,819,2.96),(560,806,2.96),(615,779,2.96),(654,750,2.96)],r=.023,material='copper',id='V04',radial=24,sub=6)
center=lp((880,660),1.65);center.z=3.71
cylinder('circular ventilation riser',[center.x,1.65,3.66],[center.x,1.65,3.86],.196,'brushed','generator',48)
for z in [3.70,3.77]:
 cylinder('riser flange '+str(z),[center.x,1.65,z],[center.x,1.65,z+.012],.215,'metal','generator',48)
 for t in np.linspace(0,math.tau,12,endpoint=False):cylinder('flange stud '+str((z,t)),[center.x+.202*math.cos(t)/SX,1.65+.202*math.sin(t)/SY,z+.012],[center.x+.202*math.cos(t)/SX,1.65+.202*math.sin(t)/SY,z+.024],.003,'metal','generator',8)
box('fan lower hood back',[center.x,1.99,3.432],[.46,.018,.19],'enamel','generator',.002)
for dx in [-.225,.225]:box('fan lower hood side '+str(dx),[center.x+dx/SX,1.73,3.432],[.014,.52,.19],'enamel','generator',.002)
box('fan lower hood lower lip',[center.x,1.73,3.344],[.46,.52,.012],'enamel','generator',.002)
for r in np.linspace(.012,.193,24):tube('fan circular guard '+str(r),[[center.x+r*math.cos(t)/SX,1.69+r*math.sin(t)/SY,3.50]for t in np.linspace(0,math.tau,57)],.0009,'enamel','generator',5,1)
for t in np.linspace(0,math.pi,4,endpoint=False):tube('fan guard cross brace '+str(t),[[center.x+.195*sign*math.cos(t)/SX,1.69+.195*sign*math.sin(t)/SY,3.503]for sign in [-1,1]],.0023,'enamel','generator',8,1)
cylinder('fan dark interior',[center.x,1.69,3.535],[center.x,1.69,3.55],.191,'dark','generator',48)

# Store source axes, editable geometry and explicit replacement provenance.
for o in parts:
 if o.type!='MESH':continue
 if not o.data.uv_layers.get('UV0'):
  uv=o.data.uv_layers.new(name='UV0')
  for f in o.data.polygons:
   axes=np.argsort(np.abs(f.normal))[:2]
   for li in f.loop_indices:
    p=o.data.vertices[o.data.loops[li].vertex_index].co;uv.data[li].uv=(p[int(axes[0])]/.18,p[int(axes[1])]/.18)
 o.hide_render=False;o.hide_viewport=False
hero.name='EVR installed | retained front';hero.hide_render=False
newIDs=[o['componentID']for o in parts];a.update(version=5,id='generator-vr-r01',parentAuthoringVersion='electrical-no-stairs-r04',sourceMasterSHA256=hashlib.sha256((W/'input-master.blend').read_bytes()).hexdigest(),replacedIDs=sorted(set(a['replacedIDs']+extra)),generatorReplacedIDs=extra,replacedEditableIDs=removedEditableIDs,retainedFrontTriangles=len(hero.data.polygons),removedProxyTriangles=removedProxyTriangles,generatorEditableObjects=len(parts),editableObjects=len(oldC.objects)+len(parts),triangleBudget=180000,stage='generator geometry milestone; finishes and verification pending')
a['generatorReconstruction']={'sourceRegions':29,'camera':E['camera'],'grid':E['grid'],'oldContextRemoved':contextRemoved,'newIDs':newIDs,'rigidPanelFrames':planes,'scope':'KOHLER casing/controller/supports, auxiliary box and hoses, upper controls/headset/ventilator, rear runs and local envelope. Engine geometry/materials unchanged.','inference':'Hidden depths, supports and routes are estimates; unreadable text and capacities are not invented.'}
S['generatorVersion']='generator-vr-r01';S['generatorScope']=a['generatorReconstruction']['scope']
digest=hashlib.sha256();deps=bpy.context.evaluated_depsgraph_get()
for o in sorted(parts,key=lambda o:o.name):
 ev=o.evaluated_get(deps);d=ev.to_mesh();d.calc_loop_triangles();digest.update(o['componentID'].encode());digest.update(np.array([(o.matrix_world@v.co)[:]for v in d.vertices],dtype='<f4').tobytes());digest.update(np.array([t.vertices[:]for t in d.loop_triangles],dtype='<u4').tobytes());ev.to_mesh_clear()
a['neutralGeometrySHA256']=digest.hexdigest()
bpy.ops.wm.save_as_mainfile(filepath=str(W/'generator-neutral.blend'),compress=True)
(W/'authoring.json').write_text(json.dumps(a,ensure_ascii=False,indent=2)+'\n');print('GENERATOR NEUTRAL BUILT',len(parts),'new parts; retained',len(hero.data.polygons),'electrical triangles; removed',removedProxyTriangles,flush=True)
