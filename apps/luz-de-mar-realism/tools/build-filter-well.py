"""Photo-observed service well only. Source dimensions remain estimates."""
import bpy,bmesh,math,json,os,numpy as np,subprocess
from pathlib import Path
from mathutils import Vector
W=Path(os.environ.get('FILTER_WELL_WORK','/tmp/ldm-filter-well-r01'));W.mkdir(parents=True,exist_ok=True)
SX=35.23/36;SY=7.47/7.6;S=bpy.context.scene;LIGHT_SIZE=int(os.environ.get('FILTER_WELL_BAKE_SIZE','2048'));SAMPLES=int(os.environ.get('FILTER_WELL_SAMPLES','64'))
bpy.ops.object.select_all(action='SELECT');bpy.ops.object.delete(use_global=False)
C=bpy.data.collections.new('EDITABLE | photo service well');S.collection.children.link(C);parts=[];mats={}
families={'enamel':((.83,.85,.82),.30,0),'galvanized':((.48,.52,.53),.46,1),'inox':((.66,.70,.72),.22,1),'rubber':((.012,.018,.016),.7,0),'black':((.012,.017,.019),.32,.05),'navy':((.013,.025,.16),.28,.14),'teal':((.012,.24,.27),.33,.10),'red':((.65,.018,.014),.34,.05),'brass':((.50,.33,.12),.28,1),'blue':((.015,.055,.21),.51,0),'yellow':((.56,.43,.025),.55,0),'green':((.015,.38,.23),.32,.05),'floor':((.47,.49,.47),.35,.08),'insulation':((.09,.042,.022),.83,0)}
for name,(color,rough,metal)in families.items():
 m=bpy.data.materials.new('FW | '+name);m.use_nodes=True;p=m.node_tree.nodes['Principled BSDF'];p.inputs['Base Color'].default_value=(*color,1);p.inputs['Roughness'].default_value=rough;p.inputs['Metallic'].default_value=metal;p.inputs['Coat Weight'].default_value=.18 if name in ['enamel','navy','teal','red','green']else 0;m['family']=name;m['filterWellMaterial']=True;mats[name]=m
def pt(p):return Vector((p[1]*SY,-(p[0]*SX-17.615),p[2]-2.01))
def register(o,name,material,role='fixed',side='',evidence='observed; depth estimated'):
 o.name='FW | '+name;o.data.materials.clear();o.data.materials.append(mats[material]);o['componentID']='FW/'+name;o['wellRole']=role;o['wellSide']=side;o['evidence']=evidence
 for c in list(o.users_collection):c.objects.unlink(o)
 C.objects.link(o);parts.append(o);return o
def bevel(o,r=.002):
 if r:
  mod=o.modifiers.new('Manufactured radius','BEVEL');mod.width=r;mod.segments=2
  n=o.modifiers.new('Weighted normals','WEIGHTED_NORMAL');n.keep_sharp=True
 return o
def mesh(name,verts,faces,material,role='fixed',side='',radius=0):
 d=bpy.data.meshes.new(name);d.from_pydata(verts,[],faces);d.update();bm=bmesh.new();bm.from_mesh(d);bmesh.ops.recalc_face_normals(bm,faces=list(bm.faces));bm.to_mesh(d);bm.free();o=bpy.data.objects.new(name,d);C.objects.link(o);register(o,name,material,role,side);return bevel(o,radius)
def box(name,c,size,material,role='fixed',side='',r=.002):
 bpy.ops.mesh.primitive_cube_add(size=1,location=pt(c));o=bpy.context.object;o.scale=(size[1]*SY,size[0]*SX,size[2]);bpy.ops.object.transform_apply(location=False,rotation=False,scale=True);return bevel(register(o,name,material,role,side),r)
def cyl(name,a,b,r,material,role='fixed',side='',n=24):
 a,b=pt(a),pt(b);bpy.ops.mesh.primitive_cylinder_add(vertices=n,radius=r,depth=(b-a).length,location=(a+b)/2);o=bpy.context.object;o.rotation_euler=(b-a).to_track_quat('Z','Y').to_euler();bpy.ops.object.transform_apply(location=False,rotation=False,scale=True)
 for f in o.data.polygons:f.use_smooth=len(f.vertices)==4
 return register(o,name,material,role,side)
def tube(name,ps,r,material,role='fixed',side='',radial=12,rounding=.07):
 ps=[Vector(p)for p in ps];curve=[ps[0]]
 for a,c,b in zip(ps,ps[1:],ps[2:]):
  if rounding<=0 or (c-a).normalized().dot((b-c).normalized())>.9999:
   curve.append(c);continue
  va=(c-a).normalized();vb=(b-c).normalized();cut=min(rounding,(c-a).length*.35,(b-c).length*.35);p=c-va*cut;q=c+vb*cut;curve.append(p)
  for t in np.linspace(0,1,7)[1:]:curve.append((1-t)**2*p+2*(1-t)*t*c+t*t*q)
 curve.append(ps[-1]);points=[pt(p)for p in curve];vs=[];closed=(points[0]-points[-1]).length<1e-8
 for i,p in enumerate(points):
  t=((points[1]-points[-2])if closed and i in[0,len(points)-1]else(points[min(i+1,len(points)-1)]-points[max(0,i-1)])).normalized();u=t.cross(Vector((0,0,1)))
  if u.length<.01:u=t.cross(Vector((1,0,0)))
  u.normalize();v=t.cross(u)
  vs.extend([p+r*(math.cos(a)*u+math.sin(a)*v)for a in np.linspace(0,math.tau,radial,endpoint=False)])
 fs=([]if closed else[tuple(range(radial-1,-1,-1)),tuple((len(points)-1)*radial+i for i in range(radial))])+[(j*radial+i,j*radial+(i+1)%radial,(j+1)*radial+(i+1)%radial,(j+1)*radial+i)for j in range(len(points)-1)for i in range(radial)]
 o=mesh(name,vs,fs,material,role,side)
 for f in o.data.polygons:f.use_smooth=len(f.vertices)==4
 return o
def flange(name,c,axis,r=.081,length=.014,material='enamel',role='fixed',side='',bolts=8):
 c=np.array(c);d=np.array(axis)/np.linalg.norm(axis);o=cyl(name,c-d*length/2,c+d*length/2,r,material,role,side,40);u=np.cross(d,[0,0,1])
 if np.linalg.norm(u)<.01:u=np.cross(d,[0,1,0])
 u/=np.linalg.norm(u);v=np.cross(d,u)
 for i in range(bolts):
  p=c+(u*math.cos((i+.5)*math.tau/bolts)+v*math.sin((i+.5)*math.tau/bolts))*r*.81;cyl(name+' bolt '+str(i),p+d*length/2,p+d*(length/2+.009),.005,'inox',role,side,6)
 return o
def handle(name,a,b,width=.026,role='fixed',side=''):
 a,b=np.array(a),np.array(b);axis=b-a;u=np.cross(axis,[-.62,0,.78])
 if np.linalg.norm(u)<.01:u=np.cross(axis,[0,0,1])
 u=u/np.linalg.norm(u)*width/2;v=np.cross(axis,u);v=v/np.linalg.norm(v)*.005
 outline=[a-u*.75,a+u*.75,b+u*.48,b-u*.48];verts=[pt(p+v*s)for s in[-1,1]for p in outline];o=mesh(name,verts,[(3,2,1,0),(4,5,6,7),(0,1,5,4),(1,2,6,5),(2,3,7,6),(3,0,4,7)],'black',role,side,.002)
 mid=(a+b)/2;tube(name+' raised spine',[a+(b-a)*.25+v*1.2,b-(b-a)*.12+v*1.2],.0018,'rubber',role,side,6,0);return o

# The opening and its frame reproduce the photograph's exposed compartment.
box('continuous recessed floor',[11.90,0,.737],[1.80,1.02,.026],'floor',r=.003)
for y in [-.50,.50]:box('white well side '+str(y),[11.91,y,1.15],[1.80,.024,.79],'enamel')
for x in [11.03,12.79]:box('well end '+str(x),[x,0,1.15],[.025,1.02,.79],'enamel')
for y in [-.465,.465]:
 box('galvanized longitudinal rim '+str(y),[11.91,y,1.552],[1.81,.069,.047],'galvanized',r=.0015)
 box('rim vertical return '+str(y),[11.91,y,1.49],[1.81,.007,.09],'galvanized',r=.0008)
# Estimated support offset leaves 10 mm clearance for the existing lid lift.
for x in [11.07,11.895,12.76]:
 box('galvanized crossmember '+str(x),[x,0,1.548],[.050 if x==11.895 else .065,.93,.055],'galvanized',r=.0015)
 box('crossmember lower web '+str(x),[x,0,1.49],[.006,.86,.10],'galvanized',r=.0008)
 for y in[-.43,.43]:cyl('frame seated bolt '+str((x,y)),[x,y,1.575],[x,y,1.582],.006,'inox',n=6)

# Two reusable basket housings retain the nominal seat and motion dimensions.
for side,sign in [('port',1),('starboard',-1)]:
 y=sign*.27
 n=64;profile=[(.145,.795),(.158,.82),(.158,1.425),(.148,1.44),(.133,1.44),(.133,.80)];vv=[pt([12.14+r*math.cos(t)/SX,y+r*math.sin(t)/SY,z])for r,z in profile for t in np.linspace(0,math.tau,n,endpoint=False)];ff=[(j*n+i,j*n+(i+1)%n,((j+1)%len(profile))*n+(i+1)%n,((j+1)%len(profile))*n+i)for j in range(len(profile))for i in range(n)]
 body=mesh(side+' hollow housing barrel',vv,ff,'enamel',side=side);body.data.materials.append(mats['brass'])
 for f in body.data.polygons:
  f.use_smooth=True
  if f.index//n==4:f.material_index=1
 # Annular flange, leaving an actual opening for the basket inspection.
 n=64;vs=[]
 for z,r in [(1.423,.205),(1.460,.205),(1.460,.132),(1.423,.132)]:vs.extend([pt([12.14+r*math.cos(t)/SX,y+r*math.sin(t)/SY,z])for t in np.linspace(0,math.tau,n,endpoint=False)])
 mesh(side+' white annular upper flange',vs,[(j*n+i,j*n+(i+1)%n,((j+1)%4)*n+(i+1)%n,((j+1)%4)*n+i)for j in range(4)for i in range(n)],'enamel',side=side)
 # The closed top and its raised fittings form one independently movable lid.
 cyl(side+' lid',[12.14,y,1.465],[12.14,y,1.484],.205,'enamel','lid',side,64)
 for i in range(8):
  t=(i+.5)*math.tau/8;x=12.14+.188*math.cos(t)/SX;yy=y+.188*math.sin(t)/SY;cyl(side+' lid bolt '+str(i),[x,yy,1.484],[x,yy,1.494],.007,'enamel','lid',side,6)
 a=[12.15,y+sign*.025,1.484];cyl(side+' small hex plug',a,[a[0],a[1],1.505],.014,'brass','lid',side,6)
 stem=[12.19,y+sign*.075,1.484];cyl(side+' raised lid fitting',stem,[stem[0],stem[1],1.560],.014,'brass','lid',side,20);cyl(side+' fitting top',[stem[0],stem[1],1.56],[stem[0],stem[1],1.57],.010,'inox','lid',side,6)
 end=[stem[0]+(.075 if sign==1 else-.025),stem[1]+(.008 if sign==1 else-.070),1.545];tube(side+' red lid lever',[[stem[0],stem[1],1.535],end],.0045,'red','lid',side,8,.01)
 for dx in[-.10,.10]:box(side+' seated housing foot '+str(dx),[12.14+dx,y,.768],[.07,.16,.036],'enamel',side=side)
 # Front butterfly assemblies, oriented longitudinally as in the photograph.
 tube(side+' forward connection',[[12.01,y,1.005],[11.68,y,1.005],[11.68,y,.945]],.056,'enamel',side=side,radial=20)
 for x in[11.875,11.942]:flange(side+' front flange '+str(x),[x,y,1.005],[1,0,0],side=side,bolts=4)
 cyl(side+' front teal butterfly',[11.888,y,1.005],[11.930,y,1.005],.073,'teal',side=side,n=32)
 cyl(side+' front actuator hub',[11.910,y,1.061],[11.910,y,1.085],.040,'black',side=side,n=28)
 handle(side+' front long lever',[11.91,y,1.088],[11.69,y-sign*.005,1.082],side=side)
 # Rear riser: hidden lower encounter is an inferred continuation.
 tube(side+' rear riser',[[12.27,y,1.005],[12.43,y,1.005],[12.43,y,1.76],[12.62,y,1.9],[12.68,sign*.55,1.94]],.056,'enamel',side=side,radial=24,rounding=.09)
 for z in[1.49,1.56]:flange(side+' rear valve flange '+str(z),[12.43,y,z],[0,0,1],side=side,bolts=4)
 cyl(side+' rear valve body',[12.43,y,1.505],[12.43,y,1.545],.074,'enamel',side=side,n=32)
 cyl(side+' rear black actuator',[12.38,y,1.528],[12.35,y,1.528],.038,'black',side=side,n=28)
 handle(side+' rear upright lever',[12.345,y,1.528],[12.34,y,1.80],side=side)
 for c in[[11.9,y,1.02],[12.43,y,1.53]]:
  tube(side+' yellow bonding '+str(c),[[c[0],c[1]+.075,c[2]],[c[0]+.03,c[1]+.09,c[2]-.03],[c[0]+.08,c[1]+.09,c[2]-.03]],.0024,'yellow',side=side,radial=6)

# Off-centre blue butterfly and its black downward lever in the upper bridge.
tube('upper white transverse bridge',[[12.62,-.27,1.90],[12.62,.27,1.90]],.060,'enamel',radial=24)
for y in[-.165,-.075]:flange('upper bridge flange '+str(y),[12.62,y,1.90],[0,1,0],r=.096,length=.014,bolts=8)
cyl('upper dark blue butterfly',[12.62,-.154,1.90],[12.62,-.086,1.90],.084,'navy',n=40)
cyl('upper bridge actuator hub',[12.60,-.12,1.826],[12.55,-.12,1.826],.042,'black',n=28)
handle('upper bridge long lever',[12.55,-.12,1.826],[12.41,-.045,1.72],width=.029)
tube('upper bridge bonding jumper',[[12.62,-.20,1.965],[12.62,-.17,1.975],[12.62,-.075,1.965]],.0023,'yellow',radial=6)
box('observed green box',[12.77,0,1.99],[.10,.13,.15],'green')
box('green box unreadable plate',[12.714,0,2.025],[.001,.068,.015],'black',r=0)

# Fore collector and the two central / one offset handwheels.
tube('front white collector',[[11.68,-.37,.945],[11.68,.37,.945]],.060,'enamel',radial=24)
for y in[-.083,.083]:tube('central valve branch '+str(y),[[11.68,y,.945],[11.83,y,.945],[11.83,y,1.1]],.033,'enamel',radial=16,rounding=.025)
def wheel(name,c,r):
 c=np.array(c);n=np.array([-.62,0,.78]);n/=np.linalg.norm(n);u=np.array([0,1,0]);v=np.cross(n,u)
 flange(name+' white valve bonnet',c-n*.015,n,r=r*1.05,length=.017,bolts=4);cyl(name+' blue centre',c+n*.016,c+n*.032,r*.65,'blue',n=24)
 tube(name+' red rim',[c+n*.034+r*(1+.07*math.cos(6*t))*(u*math.cos(t)+v*math.sin(t))for t in np.linspace(0,math.tau,49)],.006,'red',radial=8,rounding=0)
 for i in range(5):
  t=math.tau*i/5;tube(name+' spoke '+str(i),[c+n*.025,c+n*.025+r*.90*(u*math.cos(t)+v*math.sin(t))],.004,'red',radial=6,rounding=0)
 cyl(name+' yellow centre bolt',c+n*.035,c+n*.045,.009,'brass',n=6)
for i,y in enumerate([.083,-.083]):wheel('central handwheel '+str(i),[11.83,y,1.10],.050)
tube('offset left return',[[11.68,.37,.945],[11.60,.40,.945],[11.60,.40,.82],[11.43,.40,.82],[11.43,.40,1.00]],.034,'enamel',radial=16,rounding=.03)
wheel('offset left smaller handwheel',[11.59,.40,.865],.034)
tube('right collector elbow',[[11.68,-.37,.945],[11.68,-.48,.945],[11.73,-.54,1.01]],.060,'enamel',radial=24,rounding=.04)
tube('right exposed brown sleeve',[[11.68,-.39,.945],[11.68,-.48,.945]],.0615,'insulation',radial=20)
for y in[-.394,-.472]:flange('sleeve retaining band '+str(y),[11.68,y,.945],[0,1,0],r=.064,length=.005,material='inox',bolts=0)
for i in range(3):
 tube('blue hose coil '+str(i),[[11.55+(.065+.007*i)*math.cos(t),.01+(.16+.02*i)*math.sin(t),.79+i*.008]for t in np.linspace(0,math.tau,73)],.010,'blue',radial=8,rounding=0)
tube('blue lower hose tail',[[11.55,-.17,.805],[11.31,-.23,.79],[11.29,-.38,.82],[11.43,-.41,.88]],.009,'blue',radial=10)
tube('lower right white service line',[[11.42,-.40,.77],[11.42,-.40,.91],[11.42,-.40,1.02]],.017,'enamel',radial=12,rounding=.03)
cyl('lower black connector',[11.42,-.40,.90],[11.42,-.40,.97],.028,'black',n=24)
box('lower connector clamp',[11.42,-.40,.965],[.064,.072,.012],'inox')
box('small inner junction box',[12.63,-.02,1.34],[.065,.09,.10],'enamel')
tube('junction cable entering box',[[12.60,-.02,1.29],[12.60,-.02,1.20],[12.59,-.06,1.20],[12.59,-.06,1.43],[12.59,-.15,1.43]],.004,'black',radial=8)

# Visible fine stainless runs and their paired saddle blocks, inside the well.
for sign in[-1,1]:
 for k in range(2):
  y=sign*(.425+k*.022);tube('side stainless run '+str((sign,k)),[[11.10,y,1.60],[11.87,y,1.60],[12.35,y,1.60],[12.62,y,1.58],[12.72,y,1.62]],.0045,'inox',radial=10,rounding=.035)
  for x in[11.15,11.92,12.55]:
   box('paired saddle '+str((sign,k,x)),[x,y,1.601],[.032,.018,.017],'galvanized',r=.001)
   cyl('saddle screw '+str((sign,k,x)),[x,y,1.610],[x,y,1.615],.0034,'inox',n=6)
 for x in[11.28,12.03,12.58]:tube('small side bonding '+str((sign,x)),[[x,sign*.47,1.47],[x+.015,sign*.45,1.43],[x+.065,sign*.44,1.43]],.002,'yellow',radial=6)

# Keep editable components, derive evaluated material meshes for the browser.
S.render.engine='CYCLES';S.cycles.device='CPU';S.cycles.samples=SAMPLES;S.cycles.max_bounces=5;S.cycles.diffuse_bounces=3;S.render.threads_mode='FIXED';S.render.threads=4;S.world.use_nodes=True;S.world.node_tree.nodes['Background'].inputs['Color'].default_value=(.12,.12,.12,1);S.world.node_tree.nodes['Background'].inputs['Strength'].default_value=.5
for x,y,energy in[(11.2,0,850),(12.5,0,850),(12.0,-1.6,500),(12.0,1.6,500)]:
 d=bpy.data.lights.new('Room fixed light '+str((x,y)),'AREA');d.energy=energy;d.shape='RECTANGLE';d.size=1.8;d.size_y=.05;o=bpy.data.objects.new(d.name,d);S.collection.objects.link(o);o.location=pt([x,y,3.74])
# Bake-only proxy for white engine surfaces surrounding the well. It supplies
# their omitted diffuse bounce, without changing the room's runtime lights.
for y in[-.85,.85]:
 d=bpy.data.lights.new('Estimated adjacent white-surface bounce '+str(y),'AREA');d.energy=160;d.shape='RECTANGLE';d.size=1.4;d.size_y=.6;o=bpy.data.objects.new(d.name,d);S.collection.objects.link(o);o.location=pt([12.0,y,2.0]);o.rotation_euler=(pt([12.0,0,1.1])-o.location).to_track_quat('-Z','Y').to_euler();o['evidence']='Inferred bake context; not an observed luminaire'
camera=json.loads((W/'photo-camera.json').read_text());cam=bpy.data.objects.new('Frozen estimated owner-photo camera',bpy.data.cameras.new('Owner photo lens'));S.collection.objects.link(cam);cam.location=pt(camera['position']);cam.rotation_euler=(pt(camera['target'])-cam.location).to_track_quat('-Z','Y').to_euler();cam.rotation_euler.rotate_axis('Z',camera['roll']);cam.data.type='PERSP';cam.data.sensor_fit='VERTICAL';cam.data.lens=cam.data.sensor_height/(2*math.tan(math.radians(camera['vfov'])/2));S.camera=cam;S.render.resolution_x=1200;S.render.resolution_y=1600;S.render.resolution_percentage=100;S.view_settings.view_transform='Khronos PBR Neutral';S.view_settings.exposure=math.log2(.05)
deps=bpy.context.evaluated_depsgraph_get();derived=[]
for role,side in [('fixed',''),('lid','port'),('lid','starboard')]:
 selected=[o for o in parts if(o.get('wellRole')=='lid'and o.get('wellSide')==side)if role=='lid']if role=='lid'else[o for o in parts if o.get('wellRole')!='lid']
 positions=[];faces=[];normals=[];uvs=[];material_indices=[];materials=[]
 for original in selected:
  ev=original.evaluated_get(deps);d=ev.to_mesh();d.calc_loop_triangles();local_materials=list(original.data.materials)
  for mat in local_materials:
   if mat not in materials:materials.append(mat)
  for t in d.loop_triangles:
   ids=[]
   for vi,li in zip(t.vertices,t.loops):
    p=original.matrix_world@d.vertices[vi].co;n=original.matrix_world.to_3x3().inverted().transposed()@d.corner_normals[li].vector;n.normalize();ids.append(len(positions));positions.append(p[:]);normals.append(n[:]);axis=int(np.argmax(np.abs(n)));axes=(0,1)if axis==2 else(0,2)if axis==1 else(1,2);uvs.append([p[axes[0]]/.12,p[axes[1]]/.12])
   faces.append(ids);material_indices.append(materials.index(local_materials[t.material_index]))
  ev.to_mesh_clear()
 d=bpy.data.meshes.new('Well evaluated '+role+side);d.from_pydata(positions,[],faces);d.update()
 for m in materials:d.materials.append(m)
 for f,i in zip(d.polygons,material_indices):f.material_index=i;f.use_smooth=True
 d.normals_split_custom_set(normals);d.uv_layers.new(name='UV0').data.foreach_set('uv',np.array(uvs,dtype=np.float32).ravel());o=bpy.data.objects.new('FW installed | '+role+' '+side,d);S.collection.objects.link(o);o['wellRole']=role;o['wellSide']=side;o['componentID']='FW/installed/'+role+'/'+side;derived.append(o)
for o in parts:o.hide_render=True;o.hide_viewport=True
# Lids are excluded as permanent occluders when baking the fixed well.
for o in derived:
 o.hide_render=o.get('wellRole')=='lid'
 color=o.data.color_attributes.new(name='Well irradiance',type='FLOAT_COLOR',domain='CORNER');o.data.color_attributes.active_color=color
 bpy.ops.object.select_all(action='DESELECT');o.select_set(True);bpy.context.view_layer.objects.active=o;o.hide_render=False
 S.render.bake.use_pass_direct=True;S.render.bake.use_pass_indirect=True;S.render.bake.use_pass_color=False
 bpy.ops.object.bake(type='DIFFUSE',target='VERTEX_COLORS');values=np.array([v.color[:3]for v in color.data],dtype=np.float32);assert np.isfinite(values).all()and values.max()>0
 # Equal physical positions/normals share one transport estimate.
 groups={}
 for li,loop in enumerate(o.data.loops):
  key=tuple(round(v,6)for v in o.data.vertices[loop.vertex_index].co)+tuple(round(v,5)for v in o.data.corner_normals[li].vector);groups.setdefault(key,[]).append(li)
 for ids in groups.values():values[ids]=values[ids].mean(0)
 o.data.attributes.new('_WELL_IRRADIANCE','FLOAT_VECTOR','CORNER').data.foreach_set('vector',values.ravel());o.hide_render=o.get('wellRole')=='lid'
(W/'bake-settings.json').write_text(json.dumps({'samples':SAMPLES,'size':LIGHT_SIZE}))
# Independent UV1 and a spatial HDR atlas for broad surfaces. Thin hardware
# keeps the corner transport; flat lids/barrels/walls must not interpolate a
# handful of Monte Carlo samples over large triangles.
positions=[];faces=[];selected=[];offset=0
for o in derived:
 d=o.data;d.calc_loop_triangles();d.uv_layers.new(name='UV1',do_init=False);mode=np.ones(len(d.vertices),dtype=np.float32)
 positions.extend([v.co[:]for v in d.vertices])
 for t in d.loop_triangles:
  pp=[d.vertices[i].co for i in t.vertices];longest=max((pp[i]-pp[(i+1)%3]).length for i in range(3));broad=t.area>1e-5 and 2*t.area/max(longest,1e-8)>.003
  if broad:
   for i in t.vertices:mode[i]=0
   faces.append([i+offset for i in t.vertices]);selected.append((o,t.index))
 d.attributes.new('_WELL_MODE','FLOAT','POINT').data.foreach_set('value',mode);offset+=len(d.vertices)
points=np.array(positions,dtype=np.float32);virtual=np.round(points,6);unique,inv=np.unique(virtual,axis=0,return_inverse=True);indices=inv[np.array(faces,dtype=np.uint32)]
np.savez_compressed(W/'uv-input.npz',positions=unique,indices=indices)
subprocess.run(['python',str(Path(__file__).with_name('pack-electrical-uv.py')),str(W/'uv-input.npz'),str(W/'uv-packed.npz')],check=True)
uvs=np.load(W/'uv-packed.npz')['corner_uvs']
for (o,ti),coords in zip(selected,uvs):
 for li,uv in zip(o.data.loop_triangles[ti].loops,coords):o.data.uv_layers['UV1'].data[li].uv=uv
im=bpy.data.images.new('Well linear diffuse irradiance',LIGHT_SIZE,LIGHT_SIZE,float_buffer=True)
im.pixels.foreach_set(np.zeros(LIGHT_SIZE*LIGHT_SIZE*4,dtype=np.float32))
for m in mats.values():
 n=m.node_tree.nodes.new('ShaderNodeTexImage');n.name='BAKE | well spatial irradiance';n.image=im;m.node_tree.nodes.active=n
S.render.bake.target='IMAGE_TEXTURES';S.render.bake.margin=4;S.render.bake.use_clear=False
for o in derived:o.hide_render=o.get('wellRole')=='lid'
for o in derived:
 o.hide_render=False;bpy.ops.object.select_all(action='DESELECT');o.select_set(True);bpy.context.view_layer.objects.active=o
 o.data.uv_layers.active_index=1;o.data.uv_layers['UV1'].active_render=True
 bpy.ops.object.bake(type='DIFFUSE',uv_layer='UV1',use_clear=False)
 o.data.uv_layers.active_index=0;o.data.uv_layers['UV0'].active_render=True;o.hide_render=o.get('wellRole')=='lid'
S.render.image_settings.file_format='OPEN_EXR';S.render.image_settings.color_depth='16';S.render.image_settings.exr_codec='ZIP';S.view_settings.view_transform='Standard';S.view_settings.exposure=0;im.save_render(str(W/'well-irradiance.exr'),scene=S)
pixels=np.array(im.pixels[:],dtype=np.float32).reshape(LIGHT_SIZE,LIGHT_SIZE,4);assert np.isfinite(pixels).all();np.save(W/'irradiance.npy',pixels)
S.view_settings.view_transform='Khronos PBR Neutral';S.view_settings.exposure=math.log2(.05)
for o in derived:o.hide_render=False
bpy.ops.object.select_all(action='DESELECT')
for o in derived:o.select_set(True)
bpy.context.view_layer.objects.active=derived[0];bpy.ops.export_scene.gltf(filepath=str(W/'well-source.glb'),export_format='GLB',use_selection=True,export_extras=True,export_attributes=True,export_vertex_color='NONE')
S['scope']='Only the opened central service well and filter installation; engine geometry is outside this authoring scene';S['reference']='Private IMG-20261016-WA0004.jpg,1200x1600; camera and dimensions inferred';S['grid']='8px native,4px detail; cells are not automatically accepted'
im.pack();bpy.ops.wm.save_as_mainfile(filepath=str(W/'filter-well-master.blend'),compress=True)
inventory=[{'id':o['componentID'],'role':o['wellRole'],'side':o['wellSide'],'evidence':o['evidence']}for o in parts]
(W/'inventory.json').write_text(json.dumps(inventory,indent=2));print('FILTER WELL BUILT',len(parts),sum(len(o.data.polygons)for o in derived),flush=True)
