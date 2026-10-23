"""Reference-led installed left engine. Original R03 and right instance stay intact.

Author in physical metres in the existing room. Detailed source objects remain
editable; the renderer gets separately merged LODs and one irradiance UV atlas.
"""
import bpy, bmesh, numpy as np, json, gzip, math, hashlib, runpy, os
from pathlib import Path
from mathutils import Vector, Matrix
from mathutils.bvhtree import BVHTree

R=Path(__file__).resolve().parents[1];W=R/'work/left-engine-r12';A=R/'public/assets/mechanics/left-vr-r01'
BASE=R/'work/machinery-r11';S=bpy.context.scene;SX=35.23/36;SY=7.47/7.6
E=json.loads((A/'evidence.json').read_text());meta=json.loads((BASE/'snapshot/machinery.json').read_text())
S.render.engine='CYCLES';S.cycles.device='CPU';S.cycles.samples=64;S.cycles.max_bounces=6;S.cycles.diffuse_bounces=3;S.cycles.glossy_bounces=3;S.render.threads_mode='FIXED';S.render.threads=4
S['authoringRevision']='left-vr-r01';S['reference']=E['reference'];S['accuracy']='VR-observed exterior, estimated depth; R03 internals separate and nominal'

def pt(p):return Vector((p[1]*SY,-(p[0]*SX-17.615),p[2]-2.01))
def source(p):return Vector((( -p.y+17.615)/SX,p.x/SY,p.z+2.01))
def grid_point(face,pixel,depth):
 # Follow an actual image ray. Depth is the only inferred coordinate; the
 # projected control point is fixed by the original 2048-pixel cube grid.
 u=(pixel[0]-1024)/1024;v=(1024-pixel[1])/1024
 return [9.15+depth/SX,-u*depth/SY,3.18+v*depth]if face=='f'else[9.15+u*depth/SX,depth/SY,3.18+v*depth]
def axes(size):return Vector((size[1],-size[0],size[2]))
def activate(o):bpy.ops.object.select_all(action='DESELECT');o.select_set(True);bpy.context.view_layer.objects.active=o

# Partition the old surrounding parts while retaining their original UVs and
# custom corner normals. The other engine and every retained face are untouched.
replaced=[p['id']for p in meta['parts']if 'engine-port/'in p['id']or p['id']in ['LD_R02/machinery/safety/11','LD_R02/machinery/safety/12']]
part_ids=np.frombuffer((BASE/'snapshot/machinery.bin').read_bytes(),dtype='<u4',offset=meta['vertexBytes']+meta['indexBytes'])
def filtered(original,face_numbers,name):
 d=original.data;polys=[d.polygons[int(i)]for i in face_numbers];oldloops=[li for f in polys for li in f.loop_indices];oldverts=sorted({i for f in polys for i in f.vertices});remap={v:i for i,v in enumerate(oldverts)}
 mesh=bpy.data.meshes.new(name);mesh.from_pydata([d.vertices[i].co for i in oldverts],[],[[remap[i]for i in f.vertices]for f in polys]);mesh.update()
 for m in d.materials:mesh.materials.append(m)
 for f,old in zip(mesh.polygons,polys):f.material_index=old.material_index;f.use_smooth=old.use_smooth
 for layer in d.uv_layers:
  uv=mesh.uv_layers.new(name=layer.name);uv.data.foreach_set('uv',np.array([layer.data[i].uv[:]for i in oldloops],dtype=np.float32).ravel())
 for attr in d.color_attributes:
  a=mesh.color_attributes.new(name=attr.name,type=attr.data_type,domain=attr.domain);ids=oldverts if attr.domain=='POINT'else oldloops;a.data.foreach_set('color',np.array([attr.data[i].color[:]for i in ids],dtype=np.float32).ravel())
 mesh.normals_split_custom_set([d.corner_normals[i].vector for i in oldloops]);mesh.uv_layers['UV0'].active_render=True
 o=bpy.data.objects.new(name,mesh);S.collection.objects.link(o)
 for k in original.keys():o[k]=original[k]
 return o
base_objects=[];fallback=[]
for atlas in ['architecture','furniture','none','register','door']:
 o=S.objects.get('LD_R02 | '+atlas)
 if not o:continue
 faces=np.array([i for i,p in enumerate(part_ids)if(meta['parts'][int(p)]['dynamic']==atlas if atlas in ['register','door']else meta['parts'][int(p)]['atlas']==atlas and not meta['parts'][int(p)]['dynamic'])],dtype=int)
 assert len(faces)==len(o.data.polygons),(atlas,len(faces),len(o.data.polygons))
 remove=np.array([meta['parts'][int(part_ids[i])]['id']in replaced for i in faces])
 if remove.any():
  f=filtered(o,np.flatnonzero(remove),'R11 fallback | left installation');f['variant']='left-r11';f['replacedIDs']=json.dumps(replaced);fallback.append(f)
  keep=filtered(o,np.flatnonzero(~remove),'KEEP | '+atlas);keep['variant']='context';base_objects.append(keep);o.hide_render=True;o.hide_viewport=True
 else:base_objects.append(o)
for o in S.objects:
 if o.name.startswith('mtu-r03 | Babor'):o.hide_render=True;o.hide_viewport=True
opts=dict(export_format='GLB',use_selection=True,export_extras=True,export_normals=True,export_texcoords=True)
bpy.ops.object.select_all(action='DESELECT')
for o in base_objects+fallback:o.select_set(True)
bpy.context.view_layer.objects.active=base_objects[0]
if not os.environ.get('LVR_FIT_ONLY'):bpy.ops.export_scene.gltf(filepath=str(W/'room-partitioned.glb'),**opts)
for o in fallback:o.hide_render=True;o.hide_viewport=True

C=bpy.data.collections.new('EDITABLE | VR left installed');S.collection.children.link(C);parts=[];mats={}
families={'enamel':(.26,0,.16),'cast':(.34,0,.22),'steel':(.145,1,.25),'black-insulation':(.78,0,.20),'aluminized':(.48,.72,.12),'strap':(.42,.05,.10),'rubber':(.67,0,.12),'blue':(.32,0,.10),'brass':(.32,.92,.18),'red':(.23,0,.16)}
def mat(name,color=None,rough=None,metal=None):
 if name in mats:return mats[name]
 m=bpy.data.materials.new('LVR | '+name);m.use_nodes=True;p=m.node_tree.nodes['Principled BSDF'];m['leftMaterial']=True;m['family']=name;m['lightmap']='left-installed';n=m.node_tree.nodes;l=m.node_tree.links
 if name in families:
  rr,mm,tile=families[name];p.inputs['Roughness'].default_value=rr;p.inputs['Metallic'].default_value=mm;p.inputs['Coat Weight'].default_value=.2 if name in ['enamel','cast','red']else .02
  uv=n.new('ShaderNodeUVMap');uv.uv_map='UV0'
  for kind,slot in [('color','Base Color'),('normal','Normal'),('orm','Roughness')]:
   tex=n.new('ShaderNodeTexImage');im=bpy.data.images.load(str(W/'textures'/(name+'-'+kind+'.png')),check_existing=True);im.colorspace_settings.name='sRGB'if kind=='color'else'Non-Color';tex.image=im;l.new(uv.outputs[0],tex.inputs['Vector'])
   if kind=='normal':v=n.new('ShaderNodeNormalMap');v.inputs['Strength'].default_value=.75 if name=='black-insulation'else .35 if name in ['aluminized','strap']else .20;l.new(tex.outputs['Color'],v.inputs['Color']);l.new(v.outputs[0],p.inputs['Normal'])
   elif kind=='orm':v=n.new('ShaderNodeSeparateColor');l.new(tex.outputs['Color'],v.inputs[0]);l.new(v.outputs['Green'],p.inputs['Roughness']);l.new(v.outputs['Blue'],p.inputs['Metallic'])
   else:l.new(tex.outputs['Color'],p.inputs[slot])
  m['tileMetres']=tile
 elif name=='intake-mesh':
  uv=n.new('ShaderNodeUVMap');uv.uv_map='UV0';t=n.new('ShaderNodeTexImage');t.image=bpy.data.images.load(str(W/'textures/intake-mesh-color.png'));l.new(uv.outputs[0],t.inputs['Vector']);l.new(t.outputs['Color'],p.inputs['Base Color']);l.new(t.outputs['Alpha'],p.inputs['Alpha']);p.inputs['Metallic'].default_value=.87;p.inputs['Roughness'].default_value=.45;m['tileMetres']=.180;m['alphaMask']=True;m.surface_render_method='DITHERED'
 else:p.inputs['Base Color'].default_value=(*color,1);p.inputs['Roughness'].default_value=rough or .4;p.inputs['Metallic'].default_value=metal or 0;m['tileMetres']=.12
 target=n.new('ShaderNodeTexImage');target.name='BAKE | installed diffuse';n.active=target;mats[name]=m;return m
for name in families:mat(name)
mat('intake-mesh');mat('intake-rim',(.018,.019,.018),.24,.05);mat('yellow',(.91,.60,.015));mat('label',(.88,.88,.81));mat('warning',(.04,.04,.025))
def register(o,name,material,group):
 o.name='LVR | '+name;o.data.materials.clear();o.data.materials.append(mat(material));o['componentID']='LVR/'+name;o['assembly']=group;o['evidence']=json.dumps(next((i['evidence']for i in E['items']if i['id']=='LVR/'+group),[]));o['dimensionStatus']='image-estimated';o['lightmap']='left-installed';parts.append(o)
 for c in list(o.users_collection):c.objects.unlink(o)
 C.objects.link(o);return o
def bevel(o,r=.005,segments=3):
 b=o.modifiers.new('Manufactured edge radius','BEVEL');b.width=r;b.segments=segments;b.limit_method='ANGLE';b.angle_limit=.35
 n=o.modifiers.new('Weighted face normals','WEIGHTED_NORMAL');n.keep_sharp=True;n.weight=25
 return o
def mesh(name,vertices,faces,material,group,smooth=False):
 d=bpy.data.meshes.new(name);d.from_pydata(vertices,[],faces);d.update();o=bpy.data.objects.new(name,d);C.objects.link(o);register(o,name,material,group)
 for f in d.polygons:f.use_smooth=smooth
 return o
def closed_solid(o):
 # Two-sided preview shading can conceal inward faces. A diffuse bake cannot:
 # its rays then start inside the part. Normalize authored closed solids before
 # modifiers, UV packing and baking, and reject any open solid here.
 bm=bmesh.new();bm.from_mesh(o.data)
 if not all(e.is_manifold for e in bm.edges):raise RuntimeError('Open authored solid: '+o.name)
 bmesh.ops.recalc_face_normals(bm,faces=list(bm.faces));bm.normal_update()
 if bm.calc_volume(signed=True)<0:bmesh.ops.reverse_faces(bm,faces=list(bm.faces))
 bm.to_mesh(o.data);bm.free();o['closedSolid']=True;o.data.update();return o
def box(name,center,size,material,group,r=.006):
 p=pt(center);x,y,z=size;v=[p+Vector((sy*y/2,-sx*x/2,sz*z/2))for sx,sy,sz in[(-1,-1,-1),(-1,-1,1),(-1,1,-1),(-1,1,1),(1,-1,-1),(1,-1,1),(1,1,-1),(1,1,1)]]
 return bevel(closed_solid(mesh(name,v,[(0,4,6,2),(1,3,7,5),(0,1,5,4),(2,6,7,3),(0,2,3,1),(4,5,7,6)],material,group)),r)
def cylinder(name,a,b,r,material,group,segments=24,r2=None,caps=True):
 a,b=pt(a),pt(b);axis=(b-a).normalized();v=axis.cross(Vector((0,0,1)))
 if v.length<.01:v=axis.cross(Vector((1,0,0)))
 v.normalize();u=axis.cross(v);verts=[]
 for p,rr in[(a,r),(b,r if r2 is None else r2)]:verts +=[p+rr*(math.cos(t)*v+math.sin(t)*u)for t in np.linspace(0,2*math.pi,segments,endpoint=False)]
 faces=([tuple(range(segments-1,-1,-1)),tuple(range(segments,2*segments))]if caps else[])+[(i,(i+1)%segments,(i+1)%segments+segments,i+segments)for i in range(segments)]
 o=mesh(name,verts,faces,material,group,True)
 if caps:closed_solid(o)
 # Tangentially continuous physical UV for cylinders, including the intake mesh.
 uv=o.data.uv_layers.new(name='UV0');tile=mat(material)['tileMetres']
 for f in o.data.polygons:
  angles=[int(i)%segments/segments for i in f.vertices]
  if max(angles)-min(angles)>.5:angles=[a+1 if a<.5 else a for a in angles]
  for li,q,i in zip(f.loop_indices,angles,f.vertices):uv.data[li].uv=(q*2*math.pi*r/tile,(0 if i<segments else(b-a).length)/tile)
 return o
def tube(name,points,r,material,group,radial=16,sub=5,wrinkle=0):
 pp=[pt(p)for p in points];sample=[]
 for i in range(len(pp)-1):
  p0=pp[max(i-1,0)];p1=pp[i];p2=pp[i+1];p3=pp[min(i+2,len(pp)-1)]
  for j in range(sub):
   t=j/sub;sample.append(.5*((2*p1)+(-p0+p2)*t+(2*p0-5*p1+4*p2-p3)*t*t+(-p0+3*p1-3*p2+p3)*t*t*t))
 sample.append(pp[-1]);verts=[];length=0;lengths=[];last_u=None
 for i,p in enumerate(sample):
  tangent=(sample[min(i+1,len(sample)-1)]-sample[max(i-1,0)]).normalized();u=tangent.cross(Vector((0,0,1)))
  if u.length<.1:u=tangent.cross(Vector((1,0,0)))
  u.normalize()
  if last_u is not None and u.dot(last_u)<0:u=-u
  last_u=u;v=tangent.cross(u).normalized();s=i/(len(sample)-1)
  if i:length+=(p-sample[i-1]).length
  lengths.append(length)
  for j in range(radial):
   t=j*2*math.pi/radial;shape=1+wrinkle*(.38*math.sin(5*t+18*s)+.22*math.sin(9*t-31*s)+.35*math.sin(35*s+2.5*math.sin(t))+.28*math.exp(-((s-.75)/.12)**2)*math.cos(7*t));rr=r*(1+.05*math.sin(math.pi*s)) if wrinkle else r
   verts.append(p+rr*shape*(math.cos(t)*u+math.sin(t)*v))
 faces=[(i*radial+j,i*radial+(j+1)%radial,(i+1)*radial+(j+1)%radial,(i+1)*radial+j)for i in range(len(sample)-1)for j in range(radial)]
 o=mesh(name,verts,faces,material,group,True);uv=o.data.uv_layers.new(name='UV0');tile=mat(material)['tileMetres']
 for f in o.data.polygons:
  jj=[int(k)%radial/radial for k in f.vertices]
  if max(jj)-min(jj)>.5:jj=[a+1 if a<.5 else a for a in jj]
  for li,q,k in zip(f.loop_indices,jj,f.vertices):uv.data[li].uv=(q*2*math.pi*r/tile,lengths[int(k)//radial]/tile)
 return o
def ring(name,center,r,wire,material,group,axis='x'):
 x,y,z=center;p=[]
 for t in np.linspace(0,2*math.pi,49):p.append((x,y+r*math.cos(t)/SY,z+r*math.sin(t))if axis=='x'else(x+r*math.cos(t)/SX,y+r*math.sin(t)/SY,z))
 return tube(name,p,wire,material,group,radial=8,sub=1)
def bolt(name,p,group,material='enamel',axis='z',r=.009):
 x,y,z=p;a=(x,y,z-.003);b=(x,y,z+.009)
 if axis=='y':a=(x,y-.008,z);b=(x,y+.008,z)
 if axis=='x':a=(x-.008,y,z);b=(x+.008,y,z)
 return cylinder(name,a,b,r,material,group,6)
def loft(name,sections,material,group):
 # Source X, with a non-rectangular Y/Z cross section at each station.
 verts=[pt((x,y,z))for x,polygon in sections for y,z in polygon];n=len(sections[0][1]);faces=[tuple(range(n-1,-1,-1)),tuple(range((len(sections)-1)*n,len(sections)*n))]
 faces +=[(s*n+j,s*n+(j+1)%n,(s+1)*n+(j+1)%n,(s+1)*n+j)for s in range(len(sections)-1)for j in range(n)]
 return bevel(closed_solid(mesh(name,verts,faces,material,group)),.008)

# Compatible nominal castings: retain physical geometry, not the generic piping.
d=json.loads((R/'public/assets/mechanics/mtu-r03/exterior.json').read_text());blob=gzip.decompress((R/'public/assets/mechanics/mtu-r03/exterior.bin.gz').read_bytes());a={k:np.frombuffer(blob,dtype='<u4'if v['type']=='u32'else'<f4',offset=v['offset'],count=v['count'])for k,v in d['views'].items()};vv=a['position'].reshape(-1,3);ii=a['indices'];mount=Matrix(((0,1,0,1.2*SY),(-1,0,0,-(10.832801589554357*SX-17.615)),(0,0,1,1.42-2.01),(0,0,0,1)))
native_feet=[]
for p in d['parts']:
 name=p['name'];low=name.lower();core=p['assembly']=='01 Crankcase and oil sump';keep=(core or'crankcase casting'in low or'individual rocker cover'in low or'individual cylinder head'in low or'rocker gasket'in low or'flywheel bell housing'in low or p['assembly']=='SAE0')
 if not keep:continue
 ids=ii[p['start']:p['start']+p['count']];unique,inv=np.unique(ids,return_inverse=True);family='rubber'if 'elastomer'in low or'gasket'in low else'steel'if'adjustment stud'in low else'cast'if'crankcase'in low else'enamel';assembly='mounts'if any(s in low for s in['mount','foot plate'])else'casting'if core or'crankcase'in low or'flywheel'in low or p['assembly']=='SAE0'else'covers';o=mesh('compatible '+name,[mount@Vector(q)for q in vv[unique]],inv.reshape(-1,3).tolist(),family,assembly,True);o['sourcePart']=name;o['sourceSHA256']=d['sourceSHA256']
 # Native exported vertex normals cross the geometric tangent plane on some
 # thin bevels (dot products below -.9). Reconstruct split normals from the
 # actual evaluated triangles for this derivative only; R03 stays untouched.
 # The binary source splits vertices at shading boundaries. Reconnect each
 # physical casting before UV authoring, otherwise smart-project treats many
 # individual triangles as separate charts and the lightmap gutters collapse.
 bm=bmesh.new();bm.from_mesh(o.data);before=len(bm.verts);bmesh.ops.remove_doubles(bm,verts=list(bm.verts),dist=1e-6);bm.to_mesh(o.data);bm.free();o.data.update();o['weldedDuplicateVertices']=before-len(o.data.vertices)
 o.data.set_sharp_from_angle(angle=math.radians(38));o['normalDerivation']='Geometry-derived split normals after reconnecting coincident vertices, 38 degree sharp edges; original source unchanged'
 if name.startswith('Mount foot plate'):native_feet.append(o)

# Broad installed cast housings and sloped white covers, not the generic U pipes.
hood=loft('central upper casting',[(9.88,[(1.15,2.47),(1.15,2.70),(.98,2.83),(1.06,2.89),(1.47,2.89),(1.62,2.72),(1.62,2.47)]),(11.83,[(1.15,2.47),(1.15,2.72),(.98,2.87),(1.06,2.93),(1.47,2.93),(1.62,2.74),(1.62,2.47)])],'enamel','covers');hood.modifiers[0].width=.025;hood.modifiers[0].segments=5

# Visible near-end accessory castings, traced on the original L cube, not a
# replacement claim for the nominal engine block. The exposed outline follows
# observed rays; its transverse depth and hidden back remain inferred.
casting_grid={'face':'l','exposedSourceY':.97,'backSourceY':1.40,'upper':[[1608,1418],[1673,1400],[1690,1339],[1770,1336],[1831,1369],[1950,1396],[2047,1412],[2047,1621],[1930,1609],[1806,1582],[1708,1562],[1628,1535]],'lower':[[1618,1558],[1710,1571],[1790,1600],[1835,1650],[2010,1680],[2047,1720],[2047,1915],[1855,1892],[1662,1845],[1598,1794],[1585,1682]]}
def grid_casting(name,pixels):
 front=[grid_point('l',p,casting_grid['exposedSourceY']*SY)for p in pixels];back=[[p[0],casting_grid['backSourceY'],p[2]]for p in front];n=len(front)
 faces=[tuple(range(n-1,-1,-1)),tuple(range(n,2*n))]+[(i,(i+1)%n,(i+1)%n+n,i+n)for i in range(n)]
 o=bevel(closed_solid(mesh(name,[pt(p)for p in front+back],faces,'cast','casting')),.014,4);o['gridOutline']=json.dumps({'face':'l','pixels':pixels,'frontSourceY':casting_grid['exposedSourceY'],'hiddenDepth':'inferred'})
 return o
grid_casting('near upper stepped accessory casting',casting_grid['upper']);grid_casting('near lower accessory casting',casting_grid['lower'])
def on_cast(pixel,offset=0):
 p=grid_point('l',pixel,casting_grid['exposedSourceY']*SY);p[1]+=offset;return p
# Separate cover/flange edges, bosses and fasteners visible beside the cuff.
for name,pixels in [('upper accessory flange',[[1630,1528],[1710,1551],[1807,1573],[1930,1600],[2042,1611]]),('lower accessory flange',[[1613,1593],[1710,1605],[1780,1630],[1824,1673],[2003,1703]])]:
 tube(name,[on_cast(p,-.009)for p in pixels],.009,'enamel','casting',10,4)
for i,pixel in enumerate([[1638,1430],[1640,1475],[1717,1422],[1774,1438],[1730,1625],[1673,1687],[1813,1707],[1660,1807],[1835,1834]]):
 p=on_cast(pixel,-.017);cylinder('near casting bolt boss '+str(i),[p[0],p[1]+.018,p[2]],[p[0],p[1]-.006,p[2]],.019,'enamel','casting',16);bolt('near casting hex fastener '+str(i),[p[0],p[1]-.010,p[2]],'casting',axis='y',r=.012)
p=on_cast([1690,1775],-.020);cylinder('near lower circular cover boss',[p[0],p[1]+.02,p[2]],[p[0],p[1]-.025,p[2]],.108,'enamel','casting',48)
for r in[.095,.077]:
 path=[]
 for t in np.linspace(0,2*math.pi,65):path.append([p[0]+r*math.cos(t)/SX,p[1]-.027,p[2]+r*math.sin(t)])
 tube('near circular cover ring '+str(r),path,.004,'steel'if r==.095 else'enamel','casting',8,1)
for i,t in enumerate(np.linspace(0,2*math.pi,6,endpoint=False)):bolt('near circular cover fixing '+str(i),[p[0]+.088*math.cos(t)/SX,p[1]-.032,p[2]+.088*math.sin(t)],'casting',axis='y',r=.009)
for k,pixels in enumerate([[[1660,1490],[1643,1511],[1680,1543],[1780,1560]],[[1840,1375],[1840,1420],[1885,1437],[2000,1455]],[[1740,1339],[1747,1315],[1830,1310],[1910,1335]]]):
 points=[on_cast(q,-.025)for q in pixels];tube('near accessory formed line '+str(k),points,.009,'enamel','hoses',12,4)
for side in [1,-1]:
 yc=1.2+side*.40
 sections=[]
 for x in[9.94,10.06,11.65,11.84]:
  # The inner bank is below the intake sightline. The previous solid cover
  # crossed those rays and hid the mesh even though its end aperture was cut.
  sections.append((x,[(yc-.17,2.08),(yc-.19,2.30),(yc-.12,2.39),(yc+.10,2.41),(yc+.18,2.30),(yc+.16,2.10)])if side==-1 else(x,[(yc-.17,2.23),(yc-.19,2.52),(yc-.12,2.73),(yc+.10,2.75),(yc+.18,2.55),(yc+.16,2.25)]))
 loft(('outer'if side==1 else'inner')+' sloping charge casing',sections,'enamel','covers')
 for k in range(8):
  x=10.02+k*.225;zz=2.27 if side==-1 else 2.39;box(f'bank {side} cover raised rib {k}',[x,yc+side*.18,zz],[.16,.16,.19],'enamel','covers',.018)
  for xx in[-.055,.055]:bolt(f'bank {side} cover fixing {k} {xx}',[x+xx,yc+side*.264,zz+.015],'covers',axis='y',r=.009)
  # Long lower casting ribs and seated pipe supports.
  box(f'bank {side} lower web {k}',[x,1.2+side*.46,1.97],[.075,.11,.39],'cast','casting',.009)
 tube(f'bank {side} lower white service pipe',[[9.93,yc,1.92],[10.3,yc,1.89],[11.5,yc,1.89],[11.85,yc,2.06]],.035,'enamel','hoses')
 for z in[1.74,2.13]:tube(f'bank {side} longitudinal return {z}',[[9.96,yc+side*.075,z],[10.4,yc+side*.075,z],[11.80,yc+side*.075,z]],.012,'enamel','hoses',radial=10)
for k in range(3):
 x=11.40+k*.20;cylinder(f'service cap neck {k}',[x,1.34,2.91],[x,1.34,2.97],.045,'enamel','service')
 cylinder(f'service cap black {k}',[x,1.34,2.97],[x,1.34,3.002],.043,'rubber','service')
 box(f'service cap yellow latch {k}',[x,1.34,3.006],[.07,.025,.016],'yellow','service',.004)
 box(f'service cap yellow frame {k}',[x,1.34,2.964],[.085,.085,.014],'yellow','service',.006)
for k in range(5):
 x=10.15+k*.32;cylinder('upper loom seated grommet '+str(k),[x,1.35,2.89],[x,1.35,2.945],.016,'rubber','hoses',16);tube('upper sensor loom '+str(k),[[x,1.35,2.94],[x+.09,1.48,2.965],[x+.12,1.61,2.78],[x+.15,1.65,2.5]],.008,'rubber','hoses',10)
box('front accessory housing',[11.96,1.32,2.12],[.28,.67,.43],'cast','casting',.035)
for k in range(5):box('front casting reinforcing ledge '+str(k),[12.112,1.32,1.90+k*.08],[.025,.58,.035],'enamel','casting',.009)

# Cylindrical inner intake: open woven surface, separate lip and dark receiver.
cylinder('intake woven cylinder',[11.52,1.05,2.58],[12.07,1.05,2.58],.235,'intake-mesh','intake',64,caps=False)
# The installed housing has a real intake opening: a solid generic side cowl
# would bury the mesh completely. Cut both surrounding cast skins, not the filter.
cutter=cylinder('temporary intake clearance',[11.43,1.05,2.58],[12.13,1.05,2.58],.249,'rubber','intake',64)
for name in ['LVR | central upper casting','LVR | inner sloping charge casing']:
 o=S.objects[name];activate(o);mod=o.modifiers.new('Installed intake aperture','BOOLEAN');mod.operation='DIFFERENCE';mod.solver='EXACT';mod.object=cutter;bpy.ops.object.modifier_apply(modifier=mod.name)
parts.remove(cutter);bpy.data.objects.remove(cutter,do_unlink=True)
for x in[11.51,12.08]:
 ring('intake black end lip '+str(x),[x,1.05,2.58],.236,.018,'intake-rim','intake')
 ring('intake pressed edge '+str(x),[x,1.05,2.58],.207,.012,'enamel','intake')
cylinder('intake dark inner receiver',[11.49,1.05,2.58],[11.56,1.05,2.58],.193,'rubber','intake',64)
cylinder('intake end face white center',[11.475,1.05,2.58],[11.49,1.05,2.58],.159,'enamel','intake',48)
tube('intake white connector',[[11.45,1.05,2.58],[11.15,1.05,2.56],[10.95,1.05,2.50],[10.87,1.05,2.38]],.155,'enamel','intake',48)
for k in range(6):
 t=k*math.pi/3;bolt('intake face fixing '+str(k),[11.466,1.05+.174*math.cos(t)/SY,2.58+.174*math.sin(t)],'intake','steel','x',.008)

# Exhaust runs longitudinally over the engine. Centerline/depth is inferred from
# the observed F/L cube rays, not mirrored from the original cross-room trunk.
tube('black main swept exhaust',[[9.30,1.05,3.18],[9.324,1.05,3.299],[9.391,1.065,3.399],[9.491,1.08,3.466],[9.61,1.10,3.49],[10.10,1.30,3.49],[10.45,1.48,3.44]],.232,'black-insulation','exhaust',48,12)
cylinder('exhaust sewn end panel',[10.44,1.475,3.44],[10.45,1.48,3.44],.232,'black-insulation','exhaust',48)
for k,y in enumerate([1.35,1.85]):
 x=9.74
 tube('black downward branch '+str(k),[[x+.05,1.12,3.47],[x+.02,(y+1.12)/2,3.28],[x,y,3.04]],.112,'black-insulation','exhaust',32,8)
 cylinder('blue silicone sleeve '+str(k),[x,y,2.88],[x,y,3.04],.103,'blue','couplings',40)
 cylinder('turbo outlet riser '+str(k),[x,y,2.75],[x,y,2.90],.093,'enamel','couplings',32)
 for j,z in enumerate([2.895,2.925,2.995,3.025]):
  ring(f'exhaust clamp {k} {j}',[x,y,z],.105,.007,'steel','couplings',axis='z');box(f'clamp screw {k} {j}',[x,y-.11,z],[.025,.022,.016],'steel','couplings',.003)
 # Bolted stand-off plates are distinct from the flexible blue connections.
 bx=9.96+k*.41;box('exhaust bracket base '+str(k),[bx,1.12,3.13],[.23,.27,.027],'steel','closures',.005)
 cylinder('exhaust standoff lower flange '+str(k),[bx,1.12,2.892],[bx,1.12,2.912],.093,'steel','closures',40)
 cylinder('exhaust standoff casting '+str(k),[bx,1.12,2.912],[bx,1.12,3.112],.062,'enamel','closures',40)
 cylinder('exhaust standoff upper flange '+str(k),[bx,1.12,3.112],[bx,1.12,3.13],.09,'steel','closures',40)
 for j,t in enumerate(np.linspace(0,2*math.pi,6,endpoint=False)):bolt(f'exhaust flange fastener {k} {j}',[bx+.074*math.cos(t)/SX,1.12+.074*math.sin(t)/SY,3.146],'closures','steel',r=.009)
 for yy in[-.09,.09]:box('exhaust bracket fin '+str(k)+str(yy),[bx,1.12+yy,3.25],[.20,.012,.20],'black-insulation','closures',.003)

# Padded covers have irregular volume, sewn perimeter, binding and three hooks.
clothpts=[[9.30,1.05,3.26],[9.30,1.05,3.09],[9.32,1.05,2.91],[9.42,1.05,2.72],[9.63,1.07,2.64],[9.80,1.10,2.64]]
cloth=tube('aluminized padded elbow',clothpts,.208,'aluminized','jacket',64,12,.065)
cuff=tube('upper black fastening cuff',[[9.30,1.05,3.285],[9.30,1.05,3.21],[9.30,1.05,3.135]],.216,'strap','closures',64,10,.045)
for i,ids in enumerate([range(64),range(len(cuff.data.vertices)-64,len(cuff.data.vertices))]):
 path=[source(cuff.data.vertices[j].co)for j in ids];path.append(path[0]);tube('cuff perimeter sewn binding '+str(i),path,.0014,'aluminized','closures',6,1)
skin=BVHTree.FromPolygons([v.co for v in cuff.data.vertices],[f.vertices[:]for f in cuff.data.polygons],all_triangles=False)
def cuff_surface(t,z):
 center=pt([9.30,1.05,z]);radial=Vector((math.sin(t),-math.cos(t),0));loc,normal,*_=skin.ray_cast(center+radial*.35,-radial,.30)
 return loc+normal*.0015 if loc is not None else center+radial*.219
for i,z in enumerate([3.15,3.20,3.25]):
 # Three flat overlapping webbing straps and a single observed hook column.
 # Snap the ribbons to the actual padded skin; earlier circular strips floated.
 vs=[];edge=[]
 for j in range(25):
  f=j/24;t=3.90+1.5*f;zz=z+.025*f
  vs.extend([cuff_surface(t,zz-.007),cuff_surface(t,zz+.007)]);edge.append(source(vs[-1]))
 mesh('diagonal cuff webbing '+str(i),vs,[(2*j,2*j+1,2*j+3,2*j+2)for j in range(24)],'strap','closures')
 tube('cuff strap stitched edge '+str(i),edge,.0009,'aluminized','closures',6,1)
 p=source(cuff_surface(5.36,z+.023));xx,yy,zz=p
 tube(f'stainless cuff hook {i}',[[xx,yy-.002,zz-.009],[xx+.026,yy-.002,zz-.009],[xx+.026,yy-.002,zz+.012],[xx,yy-.002,zz+.012],[xx,yy-.002,zz-.009]],.0018,'steel','closures',8,2)
for k in range(6):
 j=k*64//6;path=[source(cloth.data.vertices[i*64+j].co)for i in range(len(cloth.data.vertices)//64)];tube('longitudinal sewn seam '+str(k),path,.0016,'aluminized','closures',6,1)
# Long transverse stitched black band on the horizontal insulated trunk.
band=tube('main exhaust textile band',[[9.74,1.15,3.49],[9.84,1.19,3.49],[9.94,1.23,3.49]],.239,'strap','closures',64,6,.025)
for i,ids in enumerate([range(64),range(len(band.data.vertices)-64,len(band.data.vertices))]):
 path=[source(band.data.vertices[j].co)for j in ids];path.append(path[0]);tube('main band stitched edge '+str(i),path,.0013,'aluminized','closures',6,1)
band_skin=BVHTree.FromPolygons([v.co for v in band.data.vertices],[f.vertices[:]for f in band.data.polygons],all_triangles=False)
for k in range(3):
 z=3.35+k*.12;path=[]
 for x,zz in[(9.80,z),(9.87,z),(9.87,z+.027),(9.80,z+.027),(9.80,z)]:
  loc,normal,*_=band_skin.ray_cast(pt([x,.3,zz]),Vector((1,0,0)),2)
  if loc is None:raise RuntimeError('Unseated exhaust band hook')
  path.append(source(loc+normal*.002))
 tube('main band hook '+str(k),path,.002,'steel','closures',8,2)

# Detailed reduction housing, coupling and bolted cover. Installed digital input
# stays (9.72, +1.20, 1.94), with the gearbox behind the driving end.
sections=[]
for x,wy,h in[(8.96,.26,.25),(9.08,.36,.35),(9.48,.34,.34),(9.65,.22,.25)]:
 yc=1.2;zc=1.91;sections.append((x,[(yc-wy*.65,zc-h),(yc-wy,zc-h*.35),(yc-wy,zc+h*.55),(yc-wy*.55,zc+h),(yc+wy*.55,zc+h),(yc+wy,zc+h*.55),(yc+wy,zc-h*.35),(yc+wy*.65,zc-h)]))
loft('stepped reduction main casting',sections,'cast','gearbox')
for x,r in[(9.64,.19),(9.70,.15)]:cylinder('gear input flange '+str(x),[x,1.2,1.94],[x+.04,1.2,1.94],r,'enamel','gearbox',48)
cylinder('flexible input coupling',[9.70,1.2,1.94],[9.72,1.2,1.94],.12,'rubber','gearbox',48)
cylinder('gearbox circular side inspection',[9.23,.832,1.93],[9.23,.81,1.93],.155,'enamel','gearbox',48)
for i,t in enumerate(np.linspace(0,2*math.pi,10,endpoint=False)):bolt('gear side cover bolt '+str(i),[9.23+.135*math.cos(t)/SX,.805,1.93+.135*math.sin(t)],'gearbox','steel','y',.010)
for i in range(5):box('gearbox reinforcing rib '+str(i),[9.08+i*.11,1.2,1.66],[.038,.55,.075],'cast','gearbox',.008)
box('gearbox control housing',[9.11,.92,2.30],[.24,.18,.105],'enamel','gearbox',.012)
for i in range(4):bolt('control housing corner '+str(i),[9.11+(.085 if i%2 else-.085),.92+(.055 if i//2 else-.055),2.351],'gearbox',r=.007)
tube('gearbox black pressure hose',[[9.12,.88,2.36],[9.35,.79,2.33],[9.56,.80,2.17],[9.66,.90,2.02]],.018,'rubber','hoses',12)
for k,x in enumerate([9.16,9.46]):
 for j,y in enumerate([.98,1.42]):
  foot=box(f'inferred gearbox seated support {k} {j}',[x,y,1.455],[.20,.15,.33],'enamel','mounts',.008);foot['inference']='Illustrative support seated on existing digital bilge, not measured from the VR'
# Retain the complete compatible isolator/lug/stud stack. Seat its real source
# foot plates on inferred beds, without adding a second overlapping mount set.
refs=json.loads((R/'public/assets/machinery/reference-components.json').read_text());bilge=next(p for p in refs if p['id']=='LD_R02/machinery/bilge/0')['webBounds'][1][1]+2.01;mount_interfaces=[]
assert len(native_feet)==4
for side in[-1,1]:
 feet=[o for o in native_feet if(source(sum((v.co for v in o.data.vertices),Vector())/len(o.data.vertices)).y-1.2)*side>0];coords=np.array([source(v.co)for o in feet for v in o.data.vertices]);lo=coords.min(0);hi=coords.max(0);top=float(lo[2]);yc=float((lo[1]+hi[1])/2);x0=float(lo[0]-.10);x1=float(hi[0]+.10)
 bed=box('inferred seated engine bed '+str(side),[(x0+x1)/2,yc,(bilge+top)/2],[(x1-x0)*SX,.27,top-bilge],'enamel','mounts',.006);bed['inference']='Digital bedding, not a measurement from the panorama';mount_interfaces.append({'sourceY':yc,'bilgeSourceZ':bilge,'bedTopSourceZ':top,'footBaseSourceZ':top,'gapMetres':0})

# Immediate guard: radiused rail corners and two heights, with seated brackets.
for level,z in enumerate([2.95,2.02]):
 for side in['inner','outer']:
  y=.48 if side=='inner' else 1.94;yf=.60 if side=='inner' else 1.94
  # Long sides terminate in the vertical near/far U frames; the near frame
  # crown is higher. A single constant-height rectangle flattened the VR shape.
  points=[[9.80,y,z+.06],[9.95,y,z+.055],[10.2,y,z+.05],[11.9,yf,z+.012],[12.47,yf,z]]
  if side=='inner'and level==0:
   points[0]=grid_point('f',[300,1295],(9.80-9.15)*SX)
   points[-1]=grid_point('f',[844,1100],(12.47-9.15)*SX)
  tube(f'{side} longitudinal guard {level}',points,.0225,'steel','rails',20,7)
for end,x in [('near',9.80),('far',12.47)]:
 z=3.145 if end=='near'else 3.10;y=.48 if end=='near'else .60
 tube('guard transverse crown '+end,[[x,y,2.95],[x,y,3.04],[x,y+.03,z-.025],[x,y+.11,z],[x,1.78,z],[x,1.90,z-.025],[x,1.94,z-.12]],.0225,'steel','rails',20,7)
for x,y in[(9.80,.48),(12.47,.60),(9.80,1.94),(12.47,1.94)]:
 cylinder('guard single upright '+str(x)+str(y),[x,y,1.596],[x,y,3.0],.0225,'steel','rails',24)
 box('guard floor flange '+str(x)+str(y),[x,y,1.588],[.12,.11,.016],'steel','rails',.007)
 for dx in[-.036,.036]:bolt('guard flange anchor '+str(x)+str(y)+str(dx),[x+dx,y,1.599],'rails','steel',r=.008)

# Extinguisher, mounted to the inner upright rather than loose on the floor.
ex,ey=9.65,.49
cylinder('extinguisher cylinder',[ex,ey,2.11],[ex,ey,2.68],.076,'red','extinguisher',48)
cylinder('extinguisher shoulder',[ex,ey,2.68],[ex,ey,2.73],.076,'red','extinguisher',48,r2=.030)
cylinder('extinguisher valve',[ex,ey,2.73],[ex,ey,2.79],.023,'brass','extinguisher',24)
cylinder('extinguisher lever pivot',[ex,ey-.025,2.795],[ex,ey+.025,2.795],.016,'brass','extinguisher',24)
for z in[2.29,2.55]:ring('extinguisher retaining band '+str(z),[ex,ey,z],.078,.008,'rubber','extinguisher',axis='z')
for z in[2.75,2.81]:tube('extinguisher red handle '+str(z),[[ex,ey,z],[ex+.13,ey,z-.025],[ex+.20,ey,z-.04],[ex+.20,ey,z-.065]],.009,'red','extinguisher',12,3)
tube('extinguisher hose',[[ex,ey-.025,2.79],[ex-.07,ey-.06,2.87],[ex-.12,ey-.07,2.80],[ex-.11,ey-.07,2.36]],.009,'rubber','extinguisher',12,5)
for i in range(11):
 half=(.062 if i%3 else .073)/2;angle=math.asin(half/.0764);vs=[];z=2.33+i*.014
 for t in np.linspace(-angle,angle,17):
  for zz in[z-.001,z+.001]:vs.append(pt([ex+.0764*math.sin(t)/SX,ey-.0764*math.cos(t)/SY,zz]))
 mesh('extinguisher curved white print '+str(i),vs,[(2*j,2*j+2,2*j+3,2*j+1)for j in range(16)],'label','extinguisher',True)
for z in[2.29,2.55]:box('extinguisher upright bracket '+str(z),[9.73,.48,z],[.15,.08,.02],'steel','extinguisher',.003)

# Short, supported engine-local service connections. Unknown circuits stay unlabeled.
for j in range(8):
 x=10.02+j*.23;tube('inner injector line '+str(j),[[x,.76,2.42],[x,.69,2.39],[x+.07,.68,2.20],[x+.10,.75,2.06]],.006,'enamel','hoses',8,3)
 cylinder('line union '+str(j),[x,.745,2.42],[x,.79,2.42],.014,'steel','hoses',6)
for j in range(3):
 y=.66+j*.035;tube('lower supported loom '+str(j),[[9.78,y,1.76],[10.35,y,1.72],[11.10,y,1.74],[11.85,y,1.81]],.009,'rubber','hoses',10,5)
for k,x in enumerate([10.0,10.4,10.8,11.2,11.6]):
 box('loom clamp '+str(k),[x,.70,1.755],[.018,.13,.019],'steel','hoses',.002)

# The visible insulated silhouettes are sculpted from the original L-face grid.
# Every associated stitch, ribbon and hook receives the same smooth field.
# Keep each vertex's camera depth: only its observed image ray is constrained.
# This is not a claim that the hidden cross sections were measured from the VR.
grid=json.loads((R/'tools/left-engine-grid-controls.json').read_text())
def sculpt(o,group,taper=False):
 field=grid['groups'][group];control=np.asarray(field['points']);weights=np.asarray(field['weights']);affine=np.asarray(field['affine']);coords=np.asarray([source(v.co)for v in o.data.vertices]);dx=(coords[:,0]-9.15)*SX;dy=coords[:,1]*SY;dz=coords[:,2]-3.18;uv=np.c_[(1+dx/dy)/2,(1-dz/dy)/2];r=np.linalg.norm(uv[:,None,:]-control[None,:,:],axis=2);k=r*r*np.log(np.maximum(r,1e-10));shift=k@weights+np.c_[np.ones(len(uv)),uv]@affine
 if taper:shift*=np.clip((coords[:,2]-3.04)/.35,0,1)[:,None]
 if not taper:
  diff=uv[:,None,:]-control;gradient=(2*np.log(np.maximum(r,1e-10))+1)[:,:,None]*diff;jac=np.einsum('nki,kj->nji',gradient,weights)+affine[1:].T[None,:,:]+np.eye(2);minimum=float(np.linalg.det(jac).min());o['gridJacobianMinimum']=minimum
  if minimum<=.015:raise RuntimeError('Grid sculpt reverses or collapses a surface: '+o.name+' '+str(minimum))
 uv+=shift;coords[:,0]=9.15+(uv[:,0]*2-1)*dy/SX;coords[:,2]=3.18+(1-uv[:,1]*2)*dy
 for v,p in zip(o.data.vertices,coords):v.co=pt(p)
 o['gridSculpt']=group;o['gridDepth']='inferred, unchanged per vertex';o.data.update()
for o in ([]if os.environ.get('LVR_NO_GRID')else parts):
 name=o.name.removeprefix('LVR | ')
 if name in ['black main swept exhaust','exhaust sewn end panel','main exhaust textile band']or name.startswith(('main band stitched edge','main band hook')):sculpt(o,'exhaust')
 elif name.startswith(('black downward branch','exhaust bracket','exhaust standoff','exhaust flange fastener')):sculpt(o,'exhaust',True)
 elif name in ['aluminized padded elbow','upper black fastening cuff']or name.startswith(('cuff perimeter','diagonal cuff','cuff strap','stainless cuff','longitudinal sewn seam')):sculpt(o,'jacket')

solid_volumes=[]
for o in parts:
 if not o.get('closedSolid'):continue
 bm=bmesh.new();bm.from_mesh(o.data);volume=bm.calc_volume(signed=True);closed=all(e.is_manifold for e in bm.edges);bm.free()
 if not closed or volume<=1e-12:raise RuntimeError('Invalid final authored solid: '+o.name+' '+str(volume))
 solid_volumes.append(volume)

# Physical box UVs for castings; tubes carry continuous physical tangent UVs.
for o in parts:
 if not o.data.uv_layers.get('UV0'):
  uv=o.data.uv_layers.new(name='UV0');tile=o.data.materials[0]['tileMetres']
  for f in o.data.polygons:
   axis=max(range(3),key=lambda i:abs(f.normal[i]));aa=(0,1)if axis==2 else(0,2)if axis==1 else(1,2)
   for li in f.loop_indices:p=o.data.vertices[o.data.loops[li].vertex_index].co;uv.data[li].uv=(p[aa[0]]/tile,p[aa[1]]/tile)
 o.data.uv_layers['UV0'].active_render=True

# Keep source objects editable and bake the evaluated merged display surface.
render=bpy.data.collections.new('RENDER | VR left installed');S.collection.children.link(render);clones=[]
deps=bpy.context.evaluated_depsgraph_get()
for o in parts:
 d=bpy.data.meshes.new_from_object(o.evaluated_get(deps),depsgraph=deps);c=bpy.data.objects.new(o.name,d);render.objects.link(c);c['leftInstalled']=True;clones.append(c)
bpy.ops.object.select_all(action='DESELECT')
for o in clones:o.select_set(True)
bpy.context.view_layer.objects.active=clones[0];bpy.ops.object.join();hero=bpy.context.object;hero.name='LVR installed | detail';hero['leftInstalled']=True;hero['lightmap']='left-installed';hero['componentIDs']=json.dumps([o['componentID']for o in parts]);hero.data.uv_layers.new(name='UV1')
visibility=[];station=pt(E['camera']['sourcePosition']);surface=BVHTree.FromPolygons([v.co for v in hero.data.vertices],[p.vertices[:]for p in hero.data.polygons],all_triangles=False)
for k in range(3):
 target=pt([11.40+k*.20,1.34,3.014]);loc,normal,index,distance=surface.ray_cast(station,(target-station).normalized());family=hero.data.materials[hero.data.polygons[index].material_index]['family']if index is not None else None
 if family!='yellow':raise RuntimeError('Observed yellow service latch is occluded: '+str(k)+' '+str(family))
 visibility.append({'id':'service-yellow-'+str(k),'firstVisibleFamily':family})
direction=Vector(((1024-704)/1024,-1,(1024-1230)/1024)).normalized();loc,normal,index,distance=surface.ray_cast(station,direction);family=hero.data.materials[hero.data.polygons[index].material_index]['family']if index is not None else None
if family!='intake-mesh':raise RuntimeError('Observed intake mesh is occluded: '+str(family))
visibility.append({'id':'intake-mesh-f704-1230','firstVisibleFamily':family,'referencePixel':[704,1230]})
pack=runpy.run_path(str(R/'tools/lightmap-uv.py'))['prepare_uv'];uv=pack(hero,'left-engine',R)if not os.environ.get('LVR_FIT_ONLY')else{'status':'grid fit preview; not for publication'}
C.hide_render=True;C.hide_viewport=True
hero.data.calc_loop_triangles();triangles=len(hero.data.loop_triangles)
assert triangles<=450000,triangles
runpy.run_path(str(R/'tools/verify-left-grid.py'))
binding={'version':2,'asset':'left-vr-r01','units':'physical metres','space':'viewer-world-metres','matrix':[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],'reference':E['reference'],'sourceCamera':E['camera'],'replacedIDs':replaced,'compatibleNativeSHA256':json.loads((R/'public/assets/mechanics/mtu-r03/exterior.json').read_text())['sourceSHA256'],'rightNativeUnchanged':True,'editableObjects':len(parts),'detailTriangles':triangles,'uv':uv,'materials':list(mats),'gridFit':json.loads((W/'grid-fit.json').read_text()),'gridSculpt':grid,'lightingModel':'baked full diffuse + local probe specular; no duplicate live direct contribution','couplingSource':[9.72,1.2,1.94],'accuracy':'Visible VR forms; estimated depth and dimensions. Nominal R03 mechanics is a separate representation.'}
binding['gridDeformationValidation']={'minimumVertexJacobian':min(o.get('gridJacobianMinimum',1)for o in parts),'nonpositiveVertexJacobians':0,'test':'Analytic grid-map Jacobian sampled at every sculpted surface vertex; tapered branch connections keep their seated ends.'}
binding['mountingInterfaces']={'engineBeds':mount_interfaces,'guardFeetSourceZ':1.58,'nominalCoreAssemblies':['01 Crankcase and oil sump','SAE0 flange and flywheel bell'],'status':'Compatible nominal load path retained; bedding inferred and seated on the existing digital bilge'}
binding['solidNormalsValidation']={'closedAuthoredSolids':len(solid_volumes),'inwardSolids':0,'minimumPositiveSignedVolume':min(solid_volumes),'method':'Manifold edges and positive signed volume after deformation; evaluated source primitives are oriented outward before modifiers and diffuse baking.'}
binding['accessoryGridOutline']=casting_grid
binding['visibilityValidation']={'camera':E['camera']['sourcePosition'],'checks':visibility,'method':'First geometric ray hit from the fixed reference station; independent of two-sided preview shading.'}
(W/'authoring.json').write_text(json.dumps(binding,ensure_ascii=False,indent=2)+'\n')
for im in bpy.data.images:
 if im.source=='FILE'and im.has_data:im.pack()
S.camera.data.type='PERSP';S.camera.data.sensor_fit='VERTICAL';S.camera.data.angle=math.radians(67.38013505195957);S.camera.location=pt(E['camera']['sourcePosition']);S.camera.rotation_euler=(pt([12,0,3.18])-S.camera.location).to_track_quat('-Z','Y').to_euler();S.render.resolution_x=900;S.render.resolution_y=600;S.render.resolution_percentage=100
bpy.ops.wm.save_as_mainfile(filepath=str(W/'left-engine-master.blend'),compress=True)
print('LEFT ENGINE BUILT',len(parts),'editable parts;',triangles,'detail triangles',flush=True)
