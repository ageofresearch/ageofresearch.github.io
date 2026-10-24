"""Editable VR-led bulkhead. Input: immutable right-engine authoring master.

Pixel paths describe visible placement; depths, thicknesses and rear routing are
explicitly inferred. No reference photograph is a model texture.
"""
import bpy,bmesh,numpy as np,json,math,hashlib,ast,sys
from pathlib import Path
from mathutils import Vector,Matrix

R=Path(__file__).resolve().parents[1];W=R/'work/bulkhead-vr-r01';A=R/'public/assets/machinery/bulkhead-vr-r01';S=bpy.context.scene
SX=35.23/36;SY=7.47/7.6;E=json.loads((W/'evidence-frozen.json').read_text());parts=[];mats={}
enclosures=[{**item,'rect':([450,895,651,1051] if item['id']=='epu' else [1748,894,1972,1031] if item['id']=='scu' else item['rect'])} for item in E['boxes']]
def pt(p):return Vector((p[1]*SY,-(p[0]*SX-17.615),p[2]-2.01))
def source(p):return [(-p.y+17.615)/SX,p.x/SY,p.z+2.01]
def plane(pixel,x=12.86):
 u,v=pixel;d=(x-9.15)*SX;return[x,-(u-1024)*d/1024/SY,3.18+(1024-v)*d/1024]
def activate(o):bpy.ops.object.select_all(action='DESELECT');o.select_set(True);bpy.context.view_layer.objects.active=o
def mat(name):return mats[name]
C=bpy.data.collections.new('EDITABLE | VR bulkhead');S.collection.children.link(C)
for name in ['paint','panel-grey','motor-paint','metal','brass','rubber','dark','screen','yellow','green','red','label']:
 m=bpy.data.materials.new('BVR | '+name);m.use_nodes=True;m['family']='bulkhead-'+name;m['bulkheadMaterial']=True;m['lightmap']='bulkhead';m['tileMetres']=.2
 p=m.node_tree.nodes['Principled BSDF'];p.inputs['Base Color'].default_value=(.55,.55,.55,1);p.inputs['Roughness'].default_value=.6
 m.node_tree.nodes.new('ShaderNodeTexImage').name='BAKE | bulkhead diffuse';mats[name]=m
def register(o,name,material,group):
 o.name='BVR | '+name;o.data.materials.clear();o.data.materials.append(mat(material));o['componentID']='BVR/'+name;o['assembly']=group;o['classification']='observed shape; inferred metric depth, thickness and hidden routing';o['lightmap']='bulkhead';parts.append(o)
 for col in list(o.users_collection):col.objects.unlink(o)
 C.objects.link(o);return o
for n in ast.parse((R/'tools/build-left-engine.py').read_text()).body:
 if isinstance(n,ast.FunctionDef)and n.name in ['bevel','mesh','closed_solid','box','cylinder','tube','ring','bolt','filtered']:
  exec(compile(ast.Module(body=[n],type_ignores=[]),str(R/'tools/build-left-engine.py'),'exec'),globals())
def ring(name,center,r,wire,material,group,axis='x'):
 x,y,z=center
 points=[(x,y+r*math.cos(t)/SY,z+r*math.sin(t)) if axis=='x' else (x+r*math.cos(t)/SX,y,z+r*math.sin(t)) if axis=='y' else (x+r*math.cos(t)/SX,y+r*math.sin(t)/SY,z) for t in np.linspace(0,math.tau,33)]
 return tube(name,points,wire,material,group,8,1)

# Remove only the previous forward equipment; keep the structural wall and all
# original texture/normal/UV attributes of other context surfaces.
meta=json.loads((R/'work/machinery-r11/snapshot/machinery.json').read_text());blob=(R/'work/machinery-r11/snapshot/machinery.bin').read_bytes()
verts=np.frombuffer(blob,dtype='<f4',count=meta['vertices']*11).reshape(-1,11)[:,:3];idx=np.frombuffer(blob,dtype='<u4',offset=meta['vertexBytes'],count=meta['triangles']*3).reshape(-1,3);ids=np.frombuffer(blob,dtype='<u4',offset=meta['vertexBytes']+meta['indexBytes'],count=meta['triangles'])
replaced=[p['id']for p in meta['parts']if 'fuel-manifold/'in p['id']or('pump-bank/'in p['id']and(p['bounds'][0]+p['bounds'][3])/2>12.2)] if 'bounds'in meta['parts'][0]else[p['id']for p in meta['parts']if 'fuel-manifold/'in p['id']or'pump-bank/'in p['id']]
def key(points):return tuple(sorted(tuple(round(float(x),5)for x in p)for p in points))
remove_keys={key(verts[t])for t,p in zip(idx,ids)if meta['parts'][p]['id']in replaced};removed=0
for o in list(S.objects):
 if o.type!='MESH'or o.hide_render or not o.name.startswith(('KEEP |','LD_R02 |')):continue
 keep=[]
 for f in o.data.polygons:
  if key([(o.data.vertices[i].co.x,o.data.vertices[i].co.z,-o.data.vertices[i].co.y)for i in f.vertices])not in remove_keys:keep.append(f.index)
 count=len(o.data.polygons)-len(keep)
 if count:
  copy=filtered(o,keep,'BVR context | '+o.name);copy['variant']='context';removed+=count;o.hide_render=True;o.hide_viewport=True
for o in S.objects:
 if o.name.endswith('walking')or o.name.startswith(('LVR |','RVR |')):o.hide_render=True

def pixelbox(name,rect,x=12.76,depth=.20,material='paint',group='panels',radius=.006):
 x0,y0,x1,y1=rect;p=plane([(x0+x1)/2,(y0+y1)/2],x);d=(x-9.15)*SX
 o=box(name,[x+depth/2,p[1],p[2]],[depth,(x1-x0)*d/1024,(y1-y0)*d/1024],material,group,radius);o['referenceRect']=json.dumps(rect);return o
def path(name,pixels,x=12.80,r=.012,material='paint',group='central',sub=4,radial=12):
 o=tube(name,[plane(p,x)for p in pixels],r,material,group,radial,sub);o['referencePath']=json.dumps(pixels);return o
def pixelcylinder(name,pixel,rpx,depth=.035,x=12.66,material='paint',group='central',segments=32):
 p=plane(pixel,x);r=rpx*(x-9.15)*SX/1024;return cylinder(name,p,[x+depth,p[1],p[2]],r,material,group,segments)
def fixings(name,rect,x=12.74,group='panels'):
 a,b,c,d=rect
 for i,(u,v)in enumerate([(a+8,b+8),(c-8,b+8),(a+8,d-8),(c-8,d-8)]):
  p=plane([u,v],x);bolt(name+' fixing '+str(i),p,group,'metal','x',.004)

# Backing remains a solid closure, independent of the original structural wall.
pixelbox('central mounting backplate',[879,890,1157,1404],12.995,.025,'paint','wall',.007)
for i,(a,b)in enumerate([(0,414),(414,700),(700,877),(1159,1542),(1542,2048)]):
 pixelbox('wall cladding '+str(i),[a,885,b,1410],13.035,.024,'paint','wall',.003)
for item in enclosures:
 name,rect=item['id'],item['rect'];front=12.72 if name=='epu' else 12.80
 surface='panel-grey' if name in ['port-local','starboard-local','scu'] else 'paint'
 pixelbox('enclosure '+name,rect,front,.35 if name=='epu' else .27 if name in ['scu','port-operating'] else .13,surface)
 door=[rect[0]+3,rect[1]+3,rect[2]-3,rect[3]-3]
 if name=='scu':door[2]=1876;pixelbox('door scu right',[1878,897,1969,1028],front-.007,.008,surface,radius=.004)
 pixelbox('door '+name,door,front-.007,.008,surface,radius=.004)
 fixings(name,rect,front-.012)
 if name in ['epu','scu','starboard-operating','port-operating']:
  for j,v in enumerate([rect[1]+15,rect[3]-22]):pixelbox(name+' hinge '+str(j),[rect[0]+2,v,rect[0]+8,v+12],front-.018,.012,'metal','fasteners',.002)
 if name in ['port-local','starboard-local']:
  q=[rect[0]+18,rect[1]+31,rect[0]+39,rect[1]+92];pixelbox(name+' recessed status strip',q,front-.012,.008,'dark')
  for j in range(7):pixelbox(name+' indicator '+str(j),[q[0]+3,q[1]+3+j*8,q[2]-3,q[1]+5+j*8],front-.023,.006,'screen',radius=.001)
 if item['legibleLabel']:
  rectlabel=([151,922,232,956] if name=='eco' else [513,985,595,1031] if name=='epu' else [1798,903,1838,917])
  pixelbox(name+' equipment label',rectlabel,front-.017,.002,'label',radius=.001)
for j,(v,col)in enumerate([(924,'green'),(949,'red'),(975,'yellow')]):pixelcylinder('port operating pilot '+str(j),[317,v],4,.006,12.779,col,'panels',16)
pixelcylinder('port emergency stop bezel',[320,999],10,.010,12.765,'yellow','panels')
stop=plane([320,999],12.765)
cylinder('port emergency stop button',[stop[0]-.040,stop[1],stop[2]],[stop[0]-.014,stop[1],stop[2]],.023,'red','panels',32)
pixelbox('starboard operating display',[1591,921,1645,950],12.773,.012,'dark')
for j,(u,v,col)in enumerate([(1605,974,'label'),(1627,974,'red'),(1589,1025,'red'),(1638,1025,'dark'),(1660,1025,'dark')]):pixelcylinder('starboard pilot '+str(j),[u,v],5,.009,12.766,col,'panels',16)
pixelbox('SCU front latch',[1762,958,1775,973],12.771,.016,'dark');pixelbox('SCU lower maker plate',[1798,1010,1840,1025],12.783,.002,'label')

# Continuous trays and independently routed cables, with branches seated into
# visible enclosure glands. Crossings retain separate depths.
pixelbox('upper perforated cable tray',[0,821,2048,847],12.20,.07,'paint','cables',.001)
for u in range(15,2048,19):pixelbox('tray slot '+str(u),[u,829,u+8,832],12.194,.002,'dark','cables',0)
# Inferred suspension depth is constrained by the existing ceiling. The earlier
# wall-plane estimate hid the tray above that ceiling; no camera refit is used.
for j,u in enumerate([120,460,800,1140,1480,1820]):
 p=plane([u,844],12.20);box('tray wall suspension arm '+str(j),[12.66,p[1],p[2]-.016],[.82,.018,.025],'metal','fasteners',.002)
 box('tray suspension wall shoe '+str(j),[13.04,p[1],p[2]+.025],[.025,.065,.10],'metal','fasteners',.002)
for j in range(13):
 v=851+j*3.0;path('horizontal loom '+str(j),[[0,v-8],[110,v],[420,v],[700,v],[880,v],[1145,v],[1450,v],[1790,v],[2048,v-14]],12.25+j*.001,.0045,'rubber','cables',3,8)
for number,(u,v,yellow)in enumerate([(427,882,True),(1100,882,True),(1430,881,True),(1494,882,True),(1713,889,False)]):
 path('upper service branch '+str(number),[[u-65,876],[u-30,876],[u-17,v],[u,v],[u+9,v+21]],12.895,.004,'yellow'if yellow else'rubber','cables',5,8)
for item in enclosures:
 name=item['id'];a,b,c,d=item['rect']
 if name=='junction':continue
 count=7 if name in ['port-local','starboard-local'] else 5 if name=='eco' else 3
 for j in range(count):
  u=a+19+j*(c-a-34)/max(1,count-1);target=869+j*2;x=12.85+j*.003
  side=1 if u<1024 else -1;out=c+22 if side>0 else a-23
  path(name+' cable drop '+str(j),[[u,d],[u+side*2,d+17],[u+side*8,d+36],[u+side*24,d+54],[out,d+60+j*3],[out+side*2,d+80+j*3]],x,.0048,'rubber','cables',5,8)
  pixelcylinder(name+' bottom gland '+str(j),[u,d],3,.020,x,'dark','fasteners',12)
for side,u in [('port',868),('starboard',1165)]:
 for j in range(6):path(side+' full height harness '+str(j),[[u+j*3,850],[u+j*3,1050],[u+j*3,1309],[u+j*3,1350],[u+j*3+(-32 if side=='port' else 32),1362]],12.91,.005,'rubber','cables',4,8)
 for v in range(920,1350,66):pixelbox(side+' harness tie '+str(v),[u-3,v,u+20,v+3],12.899,.004,'dark','fasteners',.001)
path('central bonding conductor',[[1140,867],[1146,1025],[1135,1115],[1137,1262],[1090,1402]],12.92,.0035,'yellow','cables',4,8)

# Top white distribution manifold and its three black operating handles.
path('upper white swept header',[[935,914],[1054,914],[1095,914],[1114,933],[1114,953]],12.78,.034)
for u in [939,1080]:
 p=plane([u,914],12.78);cylinder('white header flange '+str(u),[p[0],p[1]-.025,p[2]],[p[0],p[1]+.025,p[2]],.053,'paint','central',24)
for j,u in enumerate([950,1005,1060]):
 path('upper valve branch '+str(j),[[u,919],[u,946],[u,982]],12.77,.018)
 for v in [938,955]:pixelbox('valve split flange '+str(j)+' '+str(v),[u-17,v-4,u+17,v+4],12.705,.074,'metal','central',.002)
 pixelbox('upper black handle '+str(j),[u-7,945,u+5,992]if j!=1 else[u-20,944,u+32,951],12.685,.018,'dark','central',.003)
path('middle white header',[[944,1010],[944,993],[958,983],[1049,983],[1055,974]],12.80,.022)
for j,u in enumerate([951,1007,1061]):pixelbox('middle black handle '+str(j),[u-24,1007,u+20,1013],12.699,.015,'dark','central',.002)

# Brass bellows line and right-hand vertical strainer-like visible body. Its
# function and internals are intentionally not inferred from the photograph.
path('left brass riser',[[927,1134],[927,1073],[930,1058],[951,1048],[1103,1048]],12.66,.038,'brass')
path('right brass elbow',[[1102,1048],[1124,1048],[1127,1032],[1127,969]],12.68,.032,'brass')
for j,(u,v,r)in enumerate([(1127,964,19),(1127,1000,17),(1127,1030,18)]):
 p=plane([u,v],12.68);cylinder('right flanged rim '+str(j),[p[0],p[1],p[2]-.013],[p[0],p[1],p[2]+.013],r*(12.68-9.15)*SX/1024,'metal','central',32)
 for k in [-1,1]:pixelcylinder('right flange fastening '+str(j)+' '+str(k),[u+k*(r-3),v+4],2,.016,12.615,'brass','fasteners',6)
path('right valve red lever',[[1136,1003],[1152,1003],[1152,1080]],12.60,.006,'red')
for j,u in enumerate([971,1000,1049,1088]):
 p=plane([u,1048],12.66);cylinder('central line collar '+str(j),[p[0],p[1]-.019,p[2]],[p[0],p[1]+.019,p[2]],.062 if j in[1,2]else.047,'metal','central',32)
cylinder('flexible bellows dark recessed core',plane([1014,1048],12.66),plane([1042,1048],12.66),.042,'rubber','central',40)
for j in range(10):
 p=plane([1016+j*2.4,1048],12.66);ring('flexible metallic bellows '+str(j),p,.046,.0045,'metal','central','y')
path('upper red operating lever',[[987,1029],[1008,1016],[1091,1016]],12.57,.008,'red')
for j,u in enumerate([969,1089]):path('bellows bonding loop '+str(j),[[u-6,1040],[u-9,1082],[u,1090],[u+10,1082],[u+9,1039]],12.60,.0028,'yellow')

# Electric unit: white pump casing, grey ribbed motor, mounting shelf and feet.
pixelbox('motor support shelf',[904,1145,1133,1157],12.69,.25,'paint','central',.005)
pixelbox('motor mounting plinth',[990,1135,1080,1148],12.61,.18,'paint','central',.004)
# The volute outline is authored in the fine-detail pass, rather than a front-facing disc.
path('pump white outlet',[[1103,1085],[1103,1110],[1090,1120],[1077,1120]],12.77,.032)
cylinder('electric motor ribbed housing',plane([999,1117],12.71),plane([1070,1117],12.71),.082,'motor-paint','central',48)
cylinder('electric motor white left end cap',plane([985,1117],12.71),plane([1013,1117],12.71),.080,'paint','central',48)
pixelbox('motor body rectangular ribs',[1010,1084,1070,1140],12.61,.18,'motor-paint','central',.015)
for j in range(13):pixelbox('motor cooling fin '+str(j),[1012,1088+j*3.6,1068,1089+j*3.6],12.595,.013,'motor-paint','central',.001)
pixelbox('motor dark rating plate',[1020,1104,1049,1127],12.574,.004,'dark','central',.002)
pixelbox('motor upper terminal box',[1020,1078,1065,1090],12.58,.13,'paint','central',.004)
path('left pump white return',[[938,1112],[970,1112],[996,1112]],12.78,.022)

# Lower circular cover, diagonal yellow handle and the three descending pipes.
path('lower left white riser',[[928,1156],[928,1198],[943,1215]],12.77,.026)
path('lower right white riser',[[1125,1157],[1125,1188],[1124,1215]],12.77,.026)
path('lower horizontal brass line',[[941,1215],[984,1215],[1076,1215],[1123,1215]],12.72,.023,'brass')
pixelcylinder('manual circular body',[1026,1215],36,.15,12.64,'paint',segments=64)
pixelcylinder('manual circular cover flange',[1026,1215],29,.022,12.605,'paint',segments=64)
pixelcylinder('manual circular cover inner',[1026,1215],24,.014,12.58,'paint',segments=64)
for j in range(8):
 a=j*math.tau/8;pixelcylinder('manual cover bolt '+str(j),[1026+32*math.cos(a),1215+32*math.sin(a)],2,.014,12.593,'metal','fasteners',6)
path('manual diagonal grey handle',[[1026,1215],[941,1154]],12.56,.014,'metal')
path('manual diagonal yellow grip',[[1018,1208],[960,1170]],12.548,.017,'yellow')
for j,u in enumerate([955,1018,1093]):
 path('lower descending white pipe '+str(j),[[u,1241],[u,1310],[u,1418]],12.83,.023)
 pixelbox('lower pipe mounting shoe '+str(j),[u-14,1404,u+14,1419],12.78,.14,'paint','fasteners',.003)
pixelbox('lower junction enclosure',[1105,1286,1149,1327],12.85,.10,'paint','panels',.004)
for j in range(3):path('lower junction lead '+str(j),[[1113+j*10,1326],[1113+j*10,1358],[1128+j*9,1370],[1150+j*4,1364],[1163+j*2,1293]],12.82,.004,'rubber','cables',6,8)
for u in[920,1131]:
 pixelbox('central vertical support '+str(u),[u-5,1111,u+5,1270],12.91,.08,'metal','fasteners',.002)
 fixings('central support '+str(u),[u-9,1110,u+9,1270],12.892,'fasteners')

# Fine review revision: secondary forms are authored from native 16/8px regions.
exec(compile((R/'tools/refine-bulkhead.py').read_text(),str(R/'tools/refine-bulkhead.py'),'exec'),globals())

# Surface IDs survive evaluation, allowing rays, cell inventories and export
# bindings to identify actual authored components, not floating test markers.
inventory=[]
for o in parts:
 if not o.data.uv_layers.get('UV0'):
  uv=o.data.uv_layers.new(name='UV0')
  for f in o.data.polygons:
   axes=np.argsort(np.abs(f.normal))[:2]
   for li in f.loop_indices:
    p=o.data.vertices[o.data.loops[li].vertex_index].co;uv.data[li].uv=(p[int(axes[0])]/.2,p[int(axes[1])]/.2)
 inventory.append({'id':o['componentID'],'assembly':o['assembly'],'classification':o['classification'],'referenceRect':json.loads(o['referenceRect'])if 'referenceRect'in o else None,'referencePath':json.loads(o['referencePath'])if 'referencePath'in o else None})
S['bulkheadVersion']='bulkhead-vr-r01';S['stage']='neutral geometry milestone; materials not approved'
S.render.engine='CYCLES';S.cycles.device='CPU';S.cycles.max_bounces=6;S.cycles.diffuse_bounces=3;S.cycles.glossy_bounces=3;S.render.threads_mode='FIXED';S.render.threads=4
binding={'version':1,'id':'bulkhead-vr-r01','sourceMasterSHA256':hashlib.sha256((R/'work/right-engine-r01/right-engine-master.blend').read_bytes()).hexdigest(),'replacedIDs':replaced,'removedContextTriangles':removed,'editableObjects':len(parts),'camera':E['camera'],'stage':'neutral geometry milestone','materialsApproved':False}
geometry_digest=hashlib.sha256();deps=bpy.context.evaluated_depsgraph_get()
for o in sorted(parts,key=lambda o:o['componentID']):
 evaluated=o.evaluated_get(deps);d=evaluated.to_mesh();d.calc_loop_triangles();geometry_digest.update(o['componentID'].encode())
 points=np.array([(o.matrix_world@v.co)[:]for v in d.vertices],dtype=np.float64);geometry_digest.update(np.round(points,5).astype('<f8').tobytes());geometry_digest.update(np.array([t.vertices[:]for t in d.loop_triangles],dtype='<u4').tobytes());evaluated.to_mesh_clear()
binding['neutralGeometrySHA256']=geometry_digest.hexdigest()
(W/'component-inventory.json').write_text(json.dumps(inventory,ensure_ascii=False,indent=2)+'\n');(W/'authoring.json').write_text(json.dumps(binding,indent=2)+'\n')
bpy.ops.wm.save_as_mainfile(filepath=str(W/'bulkhead-neutral.blend'),compress=True)
print('BULKHEAD NEUTRAL',len(parts),'editable objects;',removed,'replaced context triangles',flush=True)
