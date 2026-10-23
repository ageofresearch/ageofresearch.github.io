"""Editable right VR installation derived from compatible authored parts.

Run with the immutable R13 left master as input. Camera and left objects stay
fixed. Observed right-side additions are separate objects; hidden depths remain
inferred. Reference photos are never imported as model textures.
"""
import bpy,bmesh,numpy as np,json,math,hashlib,runpy,ast,os
from pathlib import Path
from mathutils import Vector,Matrix
from mathutils.bvhtree import BVHTree
R=Path(__file__).resolve().parents[1];W=R/'work/right-engine-r01';A=R/'public/assets/mechanics/right-vr-r01';S=bpy.context.scene;SX=35.23/36;SY=7.47/7.6
W.mkdir(exist_ok=True);A.mkdir(parents=True,exist_ok=True)
S['authoringRevision']='right-vr-r01';S['accuracy']='Right VR-observed exterior with inferred depths; original left R13 retained and R03 internals separate/nominal'
E=json.loads((A/'evidence.json').read_text());parts=[];mats={}
def pt(p):return Vector((p[1]*SY,-(p[0]*SX-17.615),p[2]-2.01))
def source(p):return Vector(((-p.y+17.615)/SX,p.x/SY,p.z+2.01))
# Reuse construction primitives, not the left scene-building side effects.
helper=ast.parse((R/'tools/build-left-engine.py').read_text())
for node in helper.body:
 if isinstance(node,ast.FunctionDef)and node.name in ['bevel','mesh','closed_solid','box','cylinder','tube','ring','bolt','loft','filtered','activate']:
  exec(compile(ast.Module(body=[node],type_ignores=[]),str(R/'tools/build-left-engine.py'),'exec'),globals())
C=bpy.data.collections.new('EDITABLE | VR right installed');S.collection.children.link(C)
def mat(name):return mats[name]
def register(o,name,material,group):
 o.name='RVR | '+name;o.data.materials.clear();o.data.materials.append(mat(material));o['componentID']='RVR/'+name;o['assembly']=group;o['evidence']=json.dumps(['pano_f.jpg','pano_r.jpg','pano_d.jpg']);o['dimensionStatus']='image-estimated; hidden depth inferred';o['lightmap']='right-installed';parts.append(o)
 for col in list(o.users_collection):col.objects.unlink(o)
 C.objects.link(o);return o
for m in list(bpy.data.materials):
 if not m.name.startswith('LVR | '):continue
 name=m.name.removeprefix('LVR | ');copy=m.copy();copy.name='RVR | '+name;copy['leftMaterial']=False;copy['rightMaterial']=True;copy['lightmap']='right-installed';mats[name]=copy
# Independent clean-enamel maps; R13 images and materials stay untouched.
for family in ['enamel','cast','steel']:
 for n in mats[family].node_tree.nodes:
  if n.type!='TEX_IMAGE' or not n.image:continue
  for suffix in ['orm','color']:
   file=W/'textures'/(family+'-'+suffix+'.png')
   if n.image.name.startswith(family+'-'+suffix) and file.exists():
    im=bpy.data.images.load(str(file),check_existing=True);im.colorspace_settings.name='sRGB' if suffix=='color' else 'Non-Color';n.image=im
mats['intake-mesh'].node_tree.nodes['Principled BSDF'].inputs['Metallic'].default_value=.55
mats['intake-mesh'].node_tree.nodes['Principled BSDF'].inputs['Roughness'].default_value=.40
grey=mats['enamel'].copy();grey.name='RVR | grey';grey['family']='grey';node=grey.node_tree.nodes['Principled BSDF']
for link in list(node.inputs['Base Color'].links):grey.node_tree.links.remove(link)
node.inputs['Base Color'].default_value=(.20,.23,.24,1);node.inputs['Roughness'].default_value=.43;grey['tileMetres']=.12;mats['grey']=grey
# Preserve all left authored and rendered objects. The new right installation is
# independently editable, with reversed winding for the reflected common forms.
for original in list(bpy.data.objects):
 if not original.name.startswith('LVR | ')or original.type!='MESH':continue
 o=original.copy();o.data=original.data.copy();C.objects.link(o);o.name=original.name.replace('LVR | ','RVR | ',1);o.data.transform(Matrix.Diagonal((-1,1,1,1)));o.data.flip_normals();o.data.normals_split_custom_set([(0,0,0)]*len(o.data.loops));o.data.set_sharp_from_angle(angle=math.radians(38));o.hide_render=False;o.hide_viewport=False
 for i,m in enumerate(o.data.materials):o.data.materials[i]=mats[m.name.removeprefix('LVR | ')]
 o['componentID']=o['componentID'].replace('LVR/','RVR/');o['sharedForm']='Compatible common part derived from R13; independent right-side installation, not proof of mirrored mechanical internals';o['lightmap']='right-installed';o.pop('gridObservation',None);parts.append(o)
# Remove only matching source triangles from context; the original blend and all
# left mesh data are preserved. This also applies the published left bed fix.
meta=json.loads((R/'work/machinery-r11/snapshot/machinery.json').read_text());blob=(R/'work/machinery-r11/snapshot/machinery.bin').read_bytes();verts=np.frombuffer(blob,dtype='<f4',count=meta['vertices']*11).reshape(-1,11)[:,:3];idx=np.frombuffer(blob,dtype='<u4',offset=meta['vertexBytes'],count=meta['triangles']*3).reshape(-1,3);part=np.frombuffer(blob,dtype='<u4',offset=meta['vertexBytes']+meta['indexBytes'],count=meta['triangles']);legacy=json.loads((R/'tools/left-engine-legacy-parts.json').read_text())
replaced=[p['id']for p in meta['parts']if 'engine-starboard/'in p['id']];replaced.append('MTU/installation/starboard-beds')
def key(points):return tuple(sorted(tuple(round(float(x),5)for x in p)for p in points))
def bed(points):return any(all(all(lo[k]-1e-5<=(abs(p[k])if k==0 else p[k])<=hi[k]+1e-5 for k in range(3))for p in points)for lo,hi in legacy['webBounds'])
remove_keys={key(verts[tri])for tri,p in zip(idx,part)if meta['parts'][p]['id']in replaced or(meta['parts'][p]['id']=='MTU/installation'and bed(verts[tri]))}
removed=0
for o in list(S.objects):
 if o.type!='MESH'or not o.name.startswith(('KEEP |','LD_R02 |'))or o.hide_render:continue
 bm=bmesh.new();bm.from_mesh(o.data);faces=[]
 for f in bm.faces:
  if key([(v.co.x,v.co.z,-v.co.y)for v in f.verts])in remove_keys:faces.append(f)
 removed+=len(faces);bmesh.ops.delete(bm,geom=faces,context='FACES');bm.to_mesh(o.data);bm.free()
for o in S.objects:
 if o.name.startswith('mtu-r03 | Estribor'):o.hide_render=True;o.hide_viewport=True
# The published left walking derivative must not render over its detail mesh.
for o in S.objects:
 if o.name=='LVR installed | walking':o.hide_render=True;o.hide_viewport=True

def remove_where(test):
 for o in list(parts):
  if test(o):parts.remove(o);bpy.data.objects.remove(o,do_unlink=True)
def observed(o,face,pixels,note='observed shape; depth inferred'):
 o['gridObservation']=json.dumps({'face':face,'pixels':pixels,'classification':note,'tileSize':32});return o
def ray_plane(face,pixel,depth=.95):
 u=(pixel[0]-1024)/1024;v=(1024-pixel[1])/1024
 # Right R cube: forward=-Y, right=-X. F uses the same fixed station.
 if face=='r':return [9.15-u*depth*SY/SX,-depth,3.18+v*depth*SY]
 d=depth*SY/u;return [9.15+d/SX,-depth,3.18+v*d]
def plate(name,face,pixels,depth,thickness,group='casting',material='enamel',radius=.008):
 front=[ray_plane(face,p,depth)for p in pixels];back=[[x,y-thickness,z]for x,y,z in front];n=len(front);faces=[tuple(range(n-1,-1,-1)),tuple(range(n,2*n))]+[(i,(i+1)%n,(i+1)%n+n,i+n)for i in range(n)]
 return observed(bevel(closed_solid(mesh(name,[pt(p)for p in front+back],faces,material,group)),radius,4),face,pixels)
def line(name,face,pixels,depth=.9,r=.006,material='enamel',group='hoses'):
 return observed(tube(name,[ray_plane(face,p,depth)for p in pixels],r,material,group,12,5),face,pixels)
# Right near accessory housing: broad cast cover, articulated linkage and loom.
# Its outline and attachments differ visibly from the left-side derivative.
remove_where(lambda o:any(x in o.name for x in ['near upper stepped accessory','near lower accessory','near casting','near circular','near lower circular','near accessory formed','near accessory removable','near cover fixing','near casting ridge','near corrugated','conduit seated']))
plate('right upper cast accessory shell','r',[[0,1360],[90,1347],[144,1309],[252,1290],[293,1340],[350,1333],[411,1358],[430,1450],[425,1635],[382,1745],[305,1810],[158,1857],[0,1905]],.94,.34,radius=.024)
plate('right stepped accessory cover','r',[[44,1467],[170,1433],[196,1380],[278,1388],[306,1442],[317,1690],[257,1752],[101,1797],[40,1786]],.916,.033,radius=.009)
line('right accessory perimeter flange','r',[[7,1822],[110,1792],[232,1750],[318,1706],[390,1648],[418,1576]],.906,.008)
for i,pix in enumerate([[64,1484],[174,1451],[211,1403],[281,1457],[297,1666],[247,1727],[102,1769],[58,1749]]):bolt('right accessory flange fixing '+str(i),ray_plane('r',pix,.905),'casting',axis='y',r=.008)
# Two cast inspection bosses and a visible link joining their pivot arms.
for i,pix in enumerate([[88,1560],[295,1550]]):
 p=ray_plane('r',pix,.89);cylinder('right linkage pivot '+str(i),[p[0],p[1]-.035,p[2]],[p[0],p[1]+.018,p[2]],.031,'enamel','casting',24);bolt('right linkage pivot nut '+str(i),[p[0],p[1]+.023,p[2]],'casting','steel','y',.012)
line('right articulated linkage rod','r',[[100,1559],[273,1553]],.872,.008,'steel','casting')
for i,pix in enumerate([[145,1315],[322,1374]]):
 p=ray_plane('r',pix,.93);cylinder('right cast circular neck '+str(i),[p[0],p[1],p[2]-.065],[p[0],p[1],p[2]+.03],.056,'enamel','casting',32);ring('right neck recessed lip '+str(i),[p[0],p[1],p[2]+.031],.038,.009,'enamel','casting','z')
line('right white corrugated electrical conduit','r',[[8,1287],[115,1308],[238,1321],[329,1319],[372,1337]],.885,.010)
for j in range(24):
 p=ray_plane('r',[20+j*13,1290+j*1.35],.885);ring('right conduit corrugation '+str(j),p,.011,.002,'enamel','hoses','x')
line('right formed oil line','r',[[366,1410],[374,1486],[362,1585],[379,1645],[410,1675]],.88,.009)
# Gearbox: retain the digital input/coupling constraint, replace generic cover
# with the observed rectangular case, flanges, control block and curved hose.
remove_where(lambda o:o.get('assembly')=='gearbox' or 'gearbox black pressure hose'in o.name)
sections=[]
for x,w,h in [(8.96,.27,.25),(9.06,.35,.34),(9.47,.34,.34),(9.65,.24,.25)]:
 yc=-1.2;z=1.91;sections.append((x,[(yc-w*.7,z-h),(yc-w,z-h*.45),(yc-w,z+h*.72),(yc-w*.65,z+h),(yc+w*.65,z+h),(yc+w,z+h*.72),(yc+w,z-h*.45),(yc+w*.7,z-h)]))
loft('right ribbed reduction housing',sections,'cast','gearbox')
for x,r in [(9.64,.19),(9.70,.15)]:cylinder('right gearbox input flange '+str(x),[x,-1.2,1.94],[x+.04,-1.2,1.94],r,'enamel','gearbox',48)
cylinder('right gearbox flexible input coupling',[9.70,-1.2,1.94],[9.72,-1.2,1.94],.12,'rubber','gearbox',48)
box('right gearbox rectangular near face',[9.21,-.844,1.94],[.51,.046,.46],'enamel','gearbox',.045)
for i in range(5):box('right gearbox cast reinforcing rib '+str(i),[9.01+i*.125,-1.2,1.68],[.032,.59,.10],'cast','gearbox',.008)
for i,(x,z)in enumerate([(8.99,1.77),(9.21,1.74),(9.44,1.77),(8.99,2.10),(9.21,2.16),(9.44,2.10)]):bolt('right gearbox perimeter fixing '+str(i),[x,-.811,z],'gearbox','enamel','y',.012)
box('right gearbox top control manifold',[9.17,-1.30,2.29],[.34,.32,.095],'enamel','gearbox',.014)
box('right gearbox grey cable box',[9.20,-1.15,2.398],[.13,.13,.14],'grey','gearbox',.005)
cylinder('right gearbox brass cable gland',[9.20,-1.077,2.42],[9.20,-1.048,2.42],.028,'brass','gearbox',24)
tube('right gearbox routed black cable',[[9.20,-1.046,2.42],[9.24,-.92,2.38],[9.39,-.81,2.27],[9.48,-.82,2.05],[9.49,-.88,1.94]],.012,'rubber','hoses',12,8)
for k in range(3):
 p=[9.09+k*.10,-1.47,2.32];cylinder('right gearbox service cap '+str(k),p,[p[0],p[1],p[2]+.045],.032,'enamel','gearbox',24)
# The right extinguisher has a visible hose loop and two open stamped levers.
remove_where(lambda o:'extinguisher hose'in o.name or 'extinguisher red handle'in o.name)
ex,ey=9.65,-.49
tube('right extinguisher hose loop',[[ex,ey+.025,2.79],[ex+.12,ey+.07,2.90],[ex+.22,ey+.09,2.88],[ex+.25,ey+.09,2.76],[ex+.18,ey+.09,2.69],[ex+.02,ey+.06,2.72]],.009,'rubber','extinguisher',16,8)
for z in [2.75,2.81]:box('right extinguisher stamped lever '+str(z),[ex-.10,ey,z],[.23,.025,.018],'red','extinguisher',.009)
# Dense woven intake has a separate dark backing behind the wire surface.
lining=mats['grey'].copy();lining.name='RVR | intake-backing';lining['family']='intake-backing';lining.node_tree.nodes['Principled BSDF'].inputs['Base Color'].default_value=(.07,.065,.045,1);mats['intake-backing']=lining
cylinder('right intake dark woven backing',[11.53,-1.05,2.58],[12.06,-1.05,2.58],.228,'intake-backing','intake',64,caps=False)
# Rounded cylinder shoulder and stamped, slotted operating levers.
remove_where(lambda o:any(x in o.name for x in ['extinguisher cylinder','extinguisher shoulder','right extinguisher stamped lever']))
profile=[(2.11,.064),(2.116,.073),(2.13,.076),(2.66,.076),(2.681,.0755),(2.700,.072),(2.716,.064),(2.731,.051),(2.741,.035),(2.744,.029)]
vs=[];segments=64
for z,r in profile:
 for t in np.linspace(0,2*math.pi,segments,endpoint=False):vs.append(pt([ex+r*math.sin(t)/SX,ey+r*math.cos(t)/SY,z]))
faces=[tuple(range(segments-1,-1,-1)),tuple(range((len(profile)-1)*segments,len(profile)*segments))]+[(i*segments+j,i*segments+(j+1)%segments,(i+1)*segments+(j+1)%segments,(i+1)*segments+j)for i in range(len(profile)-1)for j in range(segments)]
closed_solid(mesh('right extinguisher rounded vessel',vs,faces,'red','extinguisher',True))
for number,poly in enumerate([[(0,2.795),(-.05,2.80),(-.20,2.855),(-.24,2.850),(-.245,2.832),(-.06,2.782),(0,2.78)],[(0,2.758),(-.06,2.763),(-.23,2.792),(-.242,2.784),(-.23,2.770),(-.05,2.744),(0,2.744)]]):
 n=len(poly);vs=[pt([ex+x,ey+y,z])for y in[-.012,.012]for x,z in poly];faces=[tuple(range(n-1,-1,-1)),tuple(range(n,2*n))]+[(i,(i+1)%n,(i+1)%n+n,i+n)for i in range(n)];lever=bevel(closed_solid(mesh('right stamped operating lever '+str(number),vs,faces,'red','extinguisher')),.004,3)
 if number==0:
  cutter=box('temporary lever slot',[ex-.135,ey,2.813],[.095,.06,.009],'rubber','extinguisher',.004);activate(lever);mod=lever.modifiers.new('Stamped handle slot','BOOLEAN');mod.operation='DIFFERENCE';mod.object=cutter;bpy.ops.object.modifier_apply(modifier=mod.name);parts.remove(cutter);bpy.data.objects.remove(cutter,do_unlink=True)
# Only the legible equipment word is reproduced. No invented serial/capacity.
bpy.ops.object.text_add();text=bpy.context.object;text.matrix_world=Matrix.Identity(4);text.data.body='ESTINTORE';text.data.size=.012;text.data.align_x='CENTER';text.data.extrude=0;bpy.ops.object.convert(target='MESH')
for v in text.data.vertices:
 u,z=v.co.x,v.co.y;v.co=pt([ex-.0766*math.sin(u/.0766)/SX,ey+.0766*math.cos(u/.0766)/SY,2.51+z])
text.data.flip_normals()
register(text,'right extinguisher observed equipment label','label','extinguisher')
# Register the right extinguisher/nozzle and loop against the fixed intake
# view, preserving the vessel dimensions. The chosen depth keeps the body clear
# of the guard post; mounting plates bridge that inferred installation offset.
def intake_ray(pixel,depth=.59):
 h,v=map(math.radians,[30,18]);f=Vector((math.cos(v)*math.cos(h),-math.cos(v)*math.sin(h),-math.sin(v)));right=Vector((-math.sin(h),-math.cos(h),0));up=right.cross(f);t=math.tan(math.radians(45)/2);d=f+right*((pixel[0]/600-1)*t)+up*((1-pixel[1]/400)*t/1.5);q=Vector((9.15*SX,0,3.18))+d*(-depth*SY/d.y);return Vector((q.x/SX,q.y/SY,q.z))
exec(compile((R/'tools/right-intake-detail.py').read_text(),str(R/'tools/right-intake-detail.py'),'exec'),globals())
nozzle=intake_ray([805,685]);delta=nozzle-Vector((ex,ey,2.78))
remove_where(lambda o:'right extinguisher hose loop'in o.name or'extinguisher upright bracket'in o.name)
for o in parts:
 if o.get('assembly')!='extinguisher':continue
 for vertex in o.data.vertices:vertex.co=pt(source(vertex.co)+delta)
 o.data.update();o['rightPlacement']='Nozzle registered to the fixed intake view; depth and bracket reach inferred'
loop_pixels=[[805,685],[731,704],[673,690],[619,634],[608,571],[650,500],[720,495],[782,550],[775,655],[805,685]]
hose=tube('right observed extinguisher hose loop',[intake_ray(p)for p in loop_pixels],.009,'rubber','extinguisher',16,8)
hose['viewObservation']=json.dumps({'pose':'intake','resolution':[1200,800],'pixels':loop_pixels,'cameraSource':[9.15,0,3.18],'classification':'observed projected path; chosen depth inferred'})
for z in [2.29+delta.z,2.55+delta.z]:box('right extinguisher guard mounting bridge '+str(z),[(9.8+nozzle.x)/2,(-.48+nozzle.y)/2,z],[abs(nozzle.x-9.8)+.045,abs(nozzle.y+.48)+.045,.018],'steel','extinguisher',.004)

# Add the right-specific surface sculpt and closures after the common forms.
if (R/'tools/right-engine-detail.py').exists():exec(compile((R/'tools/right-engine-detail.py').read_text(),str(R/'tools/right-engine-detail.py'),'exec'),globals())
for o in parts:
 if not o.data.uv_layers.get('UV0'):
  uv=o.data.uv_layers.new(name='UV0');tile=o.data.materials[0].get('tileMetres',.12)
  for f in o.data.polygons:
   axis=max(range(3),key=lambda i:abs(f.normal[i]));aa=(0,1)if axis==2 else(0,2)if axis==1 else(1,2)
   for li in f.loop_indices:p=o.data.vertices[o.data.loops[li].vertex_index].co;uv.data[li].uv=(p[aa[0]]/tile,p[aa[1]]/tile)
 o.data.uv_layers['UV0'].active_render=True
render=bpy.data.collections.new('RENDER | VR right installed');S.collection.children.link(render);deps=bpy.context.evaluated_depsgraph_get();clones=[]
for o in parts:
 d=bpy.data.meshes.new_from_object(o.evaluated_get(deps),depsgraph=deps);c=bpy.data.objects.new(o.name,d);render.objects.link(c);c['rightInstalled']=True;clones.append(c)
bpy.ops.object.select_all(action='DESELECT')
for o in clones:o.select_set(True)
bpy.context.view_layer.objects.active=clones[0];bpy.ops.object.join();hero=bpy.context.object;hero.name='RVR installed | detail';hero['rightInstalled']=True;hero['lightmap']='right-installed';hero['componentIDs']=json.dumps([o['componentID']for o in parts]);
for layer in list(hero.data.uv_layers):
 if layer.name!='UV0':hero.data.uv_layers.remove(layer)
hero.data.uv_layers.new(name='UV1');assert [l.name for l in hero.data.uv_layers]==['UV0','UV1'];C.hide_render=True;C.hide_viewport=True
# Evaluated bevels can create zero-area faces where their limits meet. Remove
# those triangles before UV packing; no nonzero surface or silhouette is moved.
bm=bmesh.new();bm.from_mesh(hero.data);bmesh.ops.triangulate(bm,faces=list(bm.faces));degenerate=[f for f in bm.faces if f.calc_area()<1e-13];removed_degenerate=len(degenerate);bmesh.ops.delete(bm,geom=degenerate,context='FACES');bm.to_mesh(hero.data);bm.free();hero.data.update()
hero.data.calc_loop_triangles();triangles=len(hero.data.loop_triangles);assert triangles<=450000,triangles
uv=runpy.run_path(str(R/'tools/lightmap-uv.py'))['prepare_uv'](hero,'right-engine',R)if not os.environ.get('RVR_FIT_ONLY')else {'status':'fit preview only'}
binding={'version':1,'asset':'right-vr-r01','units':'physical metres','matrix':[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],'reference':E['reference'],'sourceCamera':E['camera'],'replacedIDs':replaced,'editableObjects':len(parts),'detailTriangles':triangles,'removedZeroAreaTriangles':removed_degenerate,'uv':uv,'materials':list(mats),'couplingSource':[9.72,-1.2,1.94],'sourceLeftMasterSHA256':hashlib.sha256((R/'work/left-engine-r13/left-engine-master.blend').read_bytes()).hexdigest(),'removedContextTriangles':removed,'accuracy':'Right observed exterior with estimated depth. Compatible common forms derived from R13; gearbox, near accessories, closures and connections independently authored. Mechanical R03 remains nominal.'}
(W/'authoring.json').write_text(json.dumps(binding,indent=2)+'\n')
for im in bpy.data.images:
 if im.source=='FILE'and im.has_data:im.pack()
S.view_settings.view_transform='Standard';S.view_settings.exposure=math.log2(.05);S.render.engine='CYCLES';S.cycles.device='CPU';S.render.threads_mode='FIXED';S.render.threads=4;S.camera.data.type='PERSP';S.camera.data.sensor_fit='VERTICAL';S.camera.data.angle=math.radians(67.380135);S.camera.location=pt([9.15,0,3.18]);S.camera.rotation_euler=(pt([11,-1.2,2.5])-S.camera.location).to_track_quat('-Z','Y').to_euler();S.render.resolution_x=750;S.render.resolution_y=500;S.render.resolution_percentage=100
bpy.ops.wm.save_as_mainfile(filepath=str(W/'right-engine-master.blend'),compress=True)
print('RIGHT AUTHORING',len(parts),triangles,'removed old context',removed,flush=True)
