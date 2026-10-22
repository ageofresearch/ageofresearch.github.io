"""Reference-led saloon authoring, kept entirely separate from the original yacht.
Visible forms follow the supplied Azimut 36M tour. All dimensions are estimated
within the inherited room envelope; object names link to the visual inventory.
"""
import bpy,math,json,hashlib,time,bmesh,runpy
from mathutils import Vector
from pathlib import Path
import numpy as np
R=Path(__file__).resolve().parents[1];W=R/'work';O=R/'public/assets/saloon';O.mkdir(parents=True,exist_ok=True)
SX=35.23/36;SY=7.47/7.6;F=3.95
bpy.ops.wm.read_factory_settings(use_empty=True);S=bpy.context.scene;S.name='MD_R02 | Salón principal — referencia 360';S.unit_settings.system='METRIC'
S.render.engine='CYCLES';S.cycles.device='CPU';S.cycles.samples=96;S.cycles.max_bounces=6;S.cycles.diffuse_bounces=4;S.cycles.glossy_bounces=2;S.cycles.use_denoising=False;S.render.threads_mode='FIXED';S.render.threads=5;S.view_settings.view_transform='AgX'
S.world=bpy.data.worlds.new('Diffuse sky');S.world.use_nodes=True;S.world.node_tree.nodes['Background'].inputs[0].default_value=(.78,.85,1,1);S.world.node_tree.nodes['Background'].inputs[1].default_value=.20
environment=S.world.node_tree.nodes.new('ShaderNodeTexEnvironment');environment.image=bpy.data.images.load(str(W/'material-sources/marine-ambient.exr'));S.world.node_tree.links.new(environment.outputs[0],S.world.node_tree.nodes['Background'].inputs[0])
S.render.bake.margin=16;S.render.bake.margin_type='EXTEND';S.render.bake.use_pass_color=False;S.render.bake.use_pass_direct=True;S.render.bake.use_pass_indirect=True
T=json.loads((W/'textures/materials.json').read_text());materials={};objects=[];images={};atlases={a:bpy.data.images.new('saloon-'+a,2048,2048,float_buffer=True)for a in ['architecture','furniture']}
def point(p):return Vector((p[1]*SY,-(p[0]*SX-17.615),p[2]-2.01))
def img(file,kind):
 if (file,kind)not in images:
  v=bpy.data.images.load(str(W/'textures'/file),check_existing=True);v.colorspace_settings.name='sRGB'if kind=='color'else'Non-Color';images[file,kind]=v
 return images[file,kind]
def material(name,color,family='paint',rough=.5,metal=0,atlas='furniture',emission=0):
 key=(name,atlas)
 if key in materials:return materials[key]
 m=bpy.data.materials.new(name+' | '+atlas);m.use_nodes=True;m.diffuse_color=(*color,1);m['family']=family;m['lightmap']=atlas;m['roughnessFactor']=rough;m['metallicFactor']=metal;m['baseColorFactor']=list(color);n=m.node_tree.nodes;l=m.node_tree.links;p=n['Principled BSDF'];p.inputs['Base Color'].default_value=(*color,1);p.inputs['Roughness'].default_value=rough;p.inputs['Metallic'].default_value=metal
 if family=='glass':p.inputs['Alpha'].default_value=.14;p.inputs['Roughness'].default_value=.075;m.surface_render_method='DITHERED'
 elif family in T:
  uv=n.new('ShaderNodeUVMap');uv.uv_map='UV0';maps={}
  for k in ['color','normal','roughness']:
   t=n.new('ShaderNodeTexImage');t.image=img(T[family][k],k);l.new(uv.outputs['UV'],t.inputs['Vector']);maps[k]=t
  mult=n.new('ShaderNodeMixRGB');mult.blend_type='MULTIPLY';mult.inputs[0].default_value=1;mult.inputs[1].default_value=(*color,1);l.new(maps['color'].outputs[0],mult.inputs[2]);l.new(mult.outputs[0],p.inputs['Base Color'])
  mul=n.new('ShaderNodeMath');mul.operation='MULTIPLY';mul.inputs[1].default_value=rough;l.new(maps['roughness'].outputs[0],mul.inputs[0]);l.new(mul.outputs[0],p.inputs['Roughness'])
  norm=n.new('ShaderNodeNormalMap');norm.uv_map='UV0';norm.inputs['Strength'].default_value=.28 if family in ['fabric','carpet']else .15;l.new(maps['normal'].outputs[0],norm.inputs['Color']);l.new(norm.outputs[0],p.inputs['Normal'])
 if family=='wood':p.inputs['Coat Weight'].default_value=.85;p.inputs['Coat Roughness'].default_value=.075
 if family in ['fabric','carpet','boucle','cloudrug']:p.inputs['Sheen Weight'].default_value=.22;p.inputs['Sheen Roughness'].default_value=.72
 if emission:p.inputs['Emission Color'].default_value=(*color,1);p.inputs['Emission Strength'].default_value=emission
 if atlas in atlases:t=n.new('ShaderNodeTexImage');t.image=atlases[atlas];t.name='BAKE | linear ambient only';n.active=t
 materials[key]=m;return m
white=material('Ivory architectural enamel',(.78,.77,.73),rough=.32,atlas='architecture');wall=material('Ivory satin panel',(.74,.73,.69),rough=.4,atlas='architecture');linen=material('Ivory woven sofa',(.80,.79,.73),'fabric',.88);boucle=material('Ivory boucle chairs',(.84,.83,.78),'boucle',.94);blue=material('Pale blue linen',(.40,.49,.59),'fabric',.88);yellow=material('Muted butter linen',(.72,.65,.43),'fabric',.9);walnut=material('Glossy warm vertical veneer',(.32,.13,.038),'wood',.15);oak=material('Pale plank floor',(.79,.76,.69),'flooroak',.46,atlas='architecture');gold=material('Warm metal',(.58,.42,.18),'metal',.24,.8);dark=material('Dark bronze edge',(.055,.045,.032),'metal',.25,.75);black=material('Soft black gasket',(.012,.015,.016),'rubber',.75,atlas='architecture');glass=material('Retained smoked glazing',(.31,.38,.40),'glass',.09,atlas='none');rugmat=material('Clouded blue pile',(1,1,1),'cloudrug',.87);stone=material('Warm taupe veined stone',(.38,.35,.30),'stone',.25);cream=material('Pale coffee tabletop',(.80,.77,.63),rough=.3);red=material('Gloss red-orange shade',(.62,.045,.012),rough=.12);warm=material('Warm light diffuser',(1,.76,.4),rough=.6,atlas='none',emission=3.4);chrome=material('Polished lamp metal',(.7,.72,.72),'metal',.15,1);ceramic=material('Pale celadon ceramic',(.48,.57,.40),rough=.24);grille=material('Perforated white speaker grille',(.78,.76,.70),'acoustic',.66,atlas='architecture')
def keep(o,name,mat):
 if name.startswith('S'):o.location+=Vector((0,-.60*SX,0))
 o.name=name;o.data.materials.append(mat);o['lightmap']=mat['lightmap'];o['componentID']='MD_R02/OBS/'+name.split(' ')[0]+'/'+str(len(objects)+1).zfill(4);o['evidence']='saloon-detail-inventory.json';o['dimensionStatus']='image-estimated within inherited room envelope';objects.append(o);return o

def mesh(name,verts,faces,mat,smooth=False):
 d=bpy.data.meshes.new(name);d.from_pydata([point(p)for p in verts],[],faces);d.update();bm=bmesh.new();bm.from_mesh(d);bmesh.ops.recalc_face_normals(bm,faces=list(bm.faces));bm.to_mesh(d);bm.free();o=bpy.data.objects.new(name,d);S.collection.objects.link(o)
 for f in d.polygons:f.use_smooth=smooth
 return keep(o,name,mat)
def box(name,c,size,mat,bevel=.02):
 bpy.ops.mesh.primitive_cube_add(size=1,location=point(c));o=bpy.context.object;o.dimensions=(size[1]*SY,size[0]*SX,size[2]);bpy.ops.object.transform_apply(location=False,rotation=False,scale=True)
 if bevel:
  m=o.modifiers.new('Rounded manufactured edges','BEVEL');m.width=bevel;m.segments=4;m=o.modifiers.new('Face-weighted shading','WEIGHTED_NORMAL');m.keep_sharp=True
 return keep(o,name,mat)
def ellipsoid(name,c,size,mat,rot=0,power=.55):
 vs=[];fs=[];n=40;k=20
 # Superellipsoid: softly padded, shallow deterministic surface folds.
 for j in range(1,k):
  v=-math.pi/2+math.pi*j/k;cv=abs(math.cos(v))**power;z=math.copysign(abs(math.sin(v))**power,math.sin(v))
  for i in range(n):
   u=2*math.pi*i/n;x=cv*math.copysign(abs(math.cos(u))**power,math.cos(u))*size[0]/2;y=cv*math.copysign(abs(math.sin(u))**power,math.sin(u))*size[1]/2;zz=z*size[2]/2;zz+=.004*math.sin(u*7+v*3)*math.sin(v*4)*cv;vs.append((c[0]+x*math.cos(rot)-y*math.sin(rot),c[1]+x*math.sin(rot)+y*math.cos(rot),c[2]+zz))
 for j in range(k-2):
  for i in range(n):a=j*n+i;b=j*n+(i+1)%n;fs.append((a,b,b+n,a+n))
 vs.extend([(c[0],c[1],c[2]-size[2]/2),(c[0],c[1],c[2]+size[2]/2)]);lo=len(vs)-2;hi=lo+1
 for i in range(n):fs.append((lo,(i+1)%n,i));fs.append((hi,(k-2)*n+i,(k-2)*n+(i+1)%n))
 return mesh(name,vs,fs,mat,True)
def pillow(name,c,size,mat,rot=0,seed=0):
 # Two sewn panels with a pinched perimeter, corner tension folds and a soft sag.
 # The reference shows broad rectangular cushions, rather than upright spheres.
 nx=40;ny=32;vs=[];fs=[]
 for side in [-1,1]:
  for j in range(ny+1):
   v=-1+2*j/ny
   for i in range(nx+1):
    u=-1+2*i/nx;e=max(abs(u),abs(v));puff=max(0,(1-u*u)*(1-v*v))**.34
    yy=u*size[1]/2*math.sqrt(1-.20*v*v);zz=v*size[2]/2*math.sqrt(1-.20*u*u)
    edge=math.exp(-((e-.88)/.075)**2);corners=(abs(u)*abs(v))**2
    fold=.0035*math.sin(27*u+11*v+seed)*corners*math.sin(math.pi*(1-e)/2)
    broad=.002*math.sin(7*u-5*v+seed)*puff
    xx=side*(size[0]*(.11+.39*puff)-.0028*edge+fold+broad)
    xx+=.035*v;zz-=.009*puff*(1+.2*math.sin(seed))
    vs.append((c[0]+xx*math.cos(rot)-yy*math.sin(rot),c[1]+xx*math.sin(rot)+yy*math.cos(rot),c[2]+zz))
 stride=(nx+1)*(ny+1)
 for s in range(2):
  for j in range(ny):
   for i in range(nx):
    a=s*stride+j*(nx+1)+i;f=(a,a+1,a+nx+2,a+nx+1);fs.append(f if s else tuple(reversed(f)))
 edgeids=list(range(nx+1))+[j*(nx+1)+nx for j in range(1,ny+1)]+[ny*(nx+1)+i for i in range(nx-1,-1,-1)]+[j*(nx+1)for j in range(ny-1,0,-1)]
 for k,a in enumerate(edgeids):b=edgeids[(k+1)%len(edgeids)];fs.append((a,b,b+stride,a+stride))
 o=mesh(name,vs,fs,mat,True)
 seam=[tuple((Vector(vs[i])+Vector(vs[i+stride]))*.5)for i in edgeids]
 tube(name+' sewn perimeter',seam,.00125,mat,True)
 return o
def tube(name,pts,r,mat,closed=False):
 d=bpy.data.curves.new(name,'CURVE');d.dimensions='3D';d.resolution_u=1;d.bevel_depth=r;d.bevel_resolution=3;sp=d.splines.new('POLY');sp.points.add(len(pts)-1)
 for q,p in zip(sp.points,pts):q.co=(*point(p),1)
 sp.use_cyclic_u=closed;o=bpy.data.objects.new(name,d);S.collection.objects.link(o);keep(o,name,mat);return o
def cylinder(name,c,rx,ry,height,mat):
 vs=[];n=80
 for z in [-height/2,height/2]:vs.extend([(c[0]+rx*math.cos(i*math.tau/n),c[1]+ry*math.sin(i*math.tau/n),c[2]+z)for i in range(n)])
 fs=[tuple(range(n-1,-1,-1)),tuple(range(n,2*n))]+[(i,(i+1)%n,(i+1)%n+n,i+n)for i in range(n)];o=mesh(name,vs,fs,mat,True)
 for f in list(o.data.polygons)[:2]:f.use_smooth=False
 return o
def rrect(w,h,r,n=10):
 out=[]
 for x,y,a in [(w/2-r,h/2-r,0),(-w/2+r,h/2-r,90),(-w/2+r,-h/2+r,180),(w/2-r,-h/2+r,270)]:
  for i in range(n+1):t=math.radians(a+i*90/n);out.append((x+r*math.cos(t),y+r*math.sin(t)))
 return out
def panel(name,c,w,h,r,axis,mat,inner=None):
 def p(u,v):return (c[0]+u,c[1],c[2]+v)if axis=='Y'else(c[0],c[1]+u,c[2]+v)
 a=rrect(w,h,r);vs=[p(*v)for v in a];fs=[]
 if inner:
  b=rrect(inner[0],inner[1],max(.01,r-(w-inner[0])/2));vs.extend([p(*v)for v in b]);n=len(a);fs=[(i,(i+1)%n,(i+1)%n+n,i+n)for i in range(n)]
  if name=='A09 Rounded ivory glazing reveal':
   # A real deep reveal catches light around the rounded opening. Keep its
   # room-facing face at the inherited wall boundary; extrude outboard.
   depth=.11*(1 if c[1]>0 else-1);vs.extend([(v[0],v[1]+depth,v[2])for v in vs[:2*n]])
   fs.extend([(i+2*n,i+3*n,(i+1)%n+3*n,(i+1)%n+2*n)for i in range(n)])
   fs.extend([(i,i+2*n,(i+1)%n+2*n,(i+1)%n)for i in range(n)])
   fs.extend([(i+n,(i+1)%n+n,(i+1)%n+3*n,i+3*n)for i in range(n)])
 else:fs=[tuple(range(len(a)))]
 return mesh(name,vs,fs,mat)
# Room envelope and side glazing, from inherited MD_R02 bounds.
box('A10 Plank floor substrate',(13.157,0,F-.035),(9.24,5.28,.07),oak,.008)
for side in [-1,1]:
 y=side*2.62
 box('A09 Lower white side lining',(13.15,y,4.10),(9.24,.12,.3),white,.025);box('A09 Upper curved window soffit',(13.15,y,5.94),(9.24,.14,.18),white,.045)
 niche=14.10;living_start=10.23 if side==1 else 9.85;living_end=niche-.3275;dining_start=niche+.3275;dining_end=17.42
 windows=[((living_start+living_end)/2,living_end-living_start),((dining_start+dining_end)/2,dining_end-dining_start)]
 for j,(x,width)in enumerate(windows):
  panel('A09 Rounded ivory glazing reveal', (x,y-side*.015,5.06),width+ .13,1.73,.18,'Y',white,(width,1.6))
  panel('A09 Thin dark window gasket',(x,y-side*.035,5.06),width,1.60,.115,'Y',black,(width-.046,1.554))
  panel('A09 Smoked glass',(x,y+side*.105,5.06),width-.046,1.554,.092,'Y',glass)
  tube('A09 Fine lower sill track',[(x-width/2+.1,y-side*.05,4.277),(x+width/2-.1,y-side*.05,4.277)],.009,chrome)
 # Niches replace the generic long side cabinets.
 for x in [14.10]:
  box('A01 White sculpted niche base',(x,y-side*.08,4.27),(.59,.28,.64),white,.085)
  box('A01 Rounded veneer niche backing',(x,y-side*.005,5.26),(.55,.11,1.46),walnut,.035)
  for dx in [-.29,.29]:box('A01 Ivory niche return',(x+dx,y-side*.09,5.11),(.075,.26,1.76),white,.032)
  box('A01 Niche shelf',(x,y-side*.19,4.66),(.53,.39,.045),walnut,.024)
  box('A01 Curved veneer ceiling transition',(x,y-side*.13,5.925),(.56,.36,.12),walnut,.045)
  if side==-1:
   # Shallow celadon bowl and three feet, visibly distinct from a flat disk.
   cx=x;cy=y-side*.19;cz=4.79;nv=48;vs=[];fs=[]
   for rr,zz in [(.115,-.055),(.155,.045),(.137,.033),(.075,-.025)]:vs.extend([(cx+rr*math.cos(i*math.tau/nv),cy+rr*math.sin(i*math.tau/nv),cz+zz)for i in range(nv)])
   for row in range(3):
    for i in range(nv):a=row*nv+i;b=row*nv+(i+1)%nv;fs.append((a,b,b+nv,a+nv))
   fs.append(tuple(range(3*nv,4*nv)));mesh('A02 Ceramic bowl',vs,fs,ceramic,True)
   for a in [0,2.1,4.2]:tube('A02 Bowl foot',[(cx+.07*math.cos(a),cy+.07*math.sin(a),cz-.035),(cx+.10*math.cos(a),cy+.10*math.sin(a),4.687)],.012,ceramic)
  elif side==1:
   for dx,z in [(-.12,.10),(0,.14),(.12,.08)]:cylinder('A03 Small pale cylinders',(x+dx,y-side*.18,4.69+z/2),.034,.034,z,cream)
# Board joints live in the physically scaled floor maps. Long subpixel tube
# triangles leaked through foreground surfaces in the browser's rasterizer.
# The starboard aft side has a full-height veneer panel and recessed pull,
# rather than a third window or a second mirrored display niche.
box('A11 Starboard full-height veneer panel',(9.23,-2.585,4.99),(1.13,.105,2.02),walnut,.035)
box('A11 Fine vertical door division',(9.23,-2.523,4.99),(.002,.004,1.89),dark,.0005)
box('A11 Recessed dark vertical pull',(9.27,-2.520,4.99),(.022,.012,.28),black,.010)
# Aft sliding portal and pleated drapes.
for y,width in [(-1.4,1.36),(0,1.36),(1.4,1.36)]:
 panel('A08 Aft glass sliding panel',(8.57,y,4.97),width,1.94,.03,'X',glass)
 panel('A08 Sliding door metal edge',(8.59,y,4.97),width+.025,1.98,.035,'X',chrome,(width-.018,1.94))
for z in [F+.014,5.97]:tube('A08 Triple sliding track',[(8.60,-2.12,z),(8.60,2.12,z)],.008,chrome)
for side in [-1,1]:
 vs=[];fs=[];n=64;m=14
 for j in range(m+1):
  z=F+.025+j*1.98/m
  for i in range(n+1):y=side*(2.15+.40*i/n);x=8.68+.065*math.sin(i/n*math.pi*14)*(1-.1*math.sin(j/m*math.pi));vs.append((x,y,z+.007*math.sin(i*.6)*(1-j/m)))
 for j in range(m):
  for i in range(n):a=j*(n+1)+i;fs.append((a,a+1,a+n+2,a+n+1))
 mesh('A07 Pleated full-height curtain',vs,fs,linen,True)
# Warm curved veneer frieze and the cabinet's wall backing frame the aft portal.
box('A04 Aft veneer ceiling frieze',(8.65,0,5.89),(.15,5.02,.20),walnut,.04)
for side in [-1,1]:box('A04 Aft frieze return',(9.02,side*2.50,5.89),(.72,.16,.20),walnut,.05)
box('A04 Veneer wall behind the cabinet',(9.45,2.575,5.36),(1.47,.12,1.18),walnut,.035)
# Forward panels and return into the corridor; room walking envelope stays closed.
for y,w in [(1.65,1.75),(.1,1.25),(-1.04,.94)]:box('D04 Ivory forward wall panel',(17.72,y,4.97),(.09,w,2.04),wall,.018)
box('D04 Passage shadow closure',(18.04,-2.0,4.97),(.06,1.0,2.04),wall,.01)
for y in [-2.52,-1.5]:box('D04 Passage reveal',(17.86,y,4.97),(.39,.09,2.04),walnut,.015)
for y in [.74,-.58]:box('C05 Vertical warm panel joint',(17.66,y,4.98),(.012,.015,1.95),warm,.002)
# Continuous sculptural sofa, seven separate padded modules, open to starboard.
def arc(name,a,b,rx,ry,z,depth,height,mat,cx=11.30,cy=.03):
 vs=[];fs=[];n=max(24,int((b-a)*1.1));m=32
 for j in range(n+1):t=math.radians(a+(b-a)*j/n)
 # loop below retains a smooth rounded cross-section at every station.
 for j in range(n+1):
  t=math.radians(a+(b-a)*j/n)
  for k in range(m):
   q=math.tau*k/m;d=math.copysign(abs(math.cos(q))**.55,math.cos(q))*depth/2;h=math.copysign(abs(math.sin(q))**.55,math.sin(q))*height/2
   if mat in [linen,boucle]:
    end=min(j/max(1,n),(n-j)/max(1,n));fold=.0028*math.sin(j*.63+q*3)*math.exp(-end*18)*math.sin(q)**2
    h+=fold-.002*math.sin(math.pi*j/n)**2*max(0,math.sin(q))
   vs.append((cx+(rx+d)*math.cos(t),cy+(ry+d)*math.sin(t),z+h))
 for j in range(n):
  for k in range(m):a0=j*m+k;b0=j*m+(k+1)%m;fs.append((a0,b0,b0+m,a0+m))
 fs.extend([tuple(range(m-1,-1,-1)),tuple(range(n*m,(n+1)*m))]);return mesh(name,vs,fs,mat,True)
arc('S01 Dark recessed sofa plinth',-52,153,1.45,1.63,4.10,.64,.20,dark)
for j in range(7):
 a=-52+205*j/7;b=-52+205*(j+1)/7;arc('S01 Curved seat module %02d'%j,a+.25,b-.25,1.46,1.65,4.24,.81,.28,linen)
 if j not in [0,6]:arc('S01 Curved back module %02d'%j,a+.35,b-.35,1.73,1.94,4.58,.24,.50,linen)
 # Fine piping along the seat's front and upper outer edge.
 for rad in [-.39,.38]:tube('S01 Upholstery seam',[(11.30+(1.46+rad)*math.cos(math.radians(a+(b-a)*k/45)),.03+(1.65+rad)*math.sin(math.radians(a+(b-a)*k/45)),4.333)for k in range(46)],.0025,linen)
for j,t in enumerate([10,50,105,145]):
 a=math.radians(t);x=11.30+1.55*math.cos(a);y=.03+1.75*math.sin(a)
 pillow('S05 Butter back cushion',(x,y,4.63),(.14,.52,.39),yellow,a,seed=j+1)
 pillow('S05 Blue front cushion',(x-.095*math.cos(a),y-.095*math.sin(a),4.58),(.13,.42,.27),blue,a+.025*math.sin(j+1),seed=j+8)
# Two separate boucle armchairs opposite the continuous sofa.
for j,x in enumerate([10.55,11.65]):
 y=-1.70;cylinder('S02 Chair recessed base',(x,y,4.08),.31,.30,.19,dark);ellipsoid('S02 Boucle seat',(x,y,4.30),(.80,.77,.34),boucle,power=.52)
 # Back is an open rounded barrel oriented toward the coffee table.
 arc('S02 Boucle barrel back',185,350,.34,.34,4.60,.19,.53,boucle,cx=x,cy=y)
# One continuous pile rug, one oval coffee table and nested trays.
cylinder('S07 Oval blue pile rug',(11.23,0,F+.009),2.45,2.32,.016,rugmat)
cylinder('S03 Dark oval coffee border',(11.18,-.23,4.39),.62,.91,.064,dark);cylinder('S03 Pale oval coffee top',(11.18,-.23,4.427),.602,.892,.016,cream)
tube('S03 Thin warm oval rim',[(11.18+.605*math.cos(i*math.tau/120),-.23+.895*math.sin(i*math.tau/120),4.432)for i in range(120)],.005,gold,True)
for y in [-.68,.18]:box('S03 Inferred coffee support',(11.18,y,4.18),(.11,.07,.40),dark,.015)
for j,(x,y,sx,sy)in enumerate([(11.18,-.20,.42,.58),(11.08,-.34,.20,.24)]):
 box('S04 Nested tray base',(x,y,4.448+j*.012),(sx,sy,.013),gold,.025)
 for dx in [-sx/2,sx/2]:box('S04 Tray raised edge',(x+dx,y,4.472+j*.012),(.012,sy,.045),gold,.007)
 for dy in [-sy/2,sy/2]:
  box('S04 Tray raised edge',(x,y+dy,4.472+j*.012),(sx,.012,.045),gold,.007)
  tube('S04 Loop tray handle',[(x-.07,y+dy,4.49+j*.012),(x-.09,y+dy*1.22,4.51+j*.012),(x+.09,y+dy*1.22,4.51+j*.012),(x+.07,y+dy,4.49+j*.012)],.006,gold)
# A fringed linen throw draped over the forward sofa seat.
vs=[];fs=[];nx=12;ny=28
for j in range(ny+1):
 t=j/ny;y=-.95+t*.80
 for i in range(nx+1):x=12.42+(i/nx-.5)*.43;z=4.385 if t<.64 else 4.385-(t-.64)/.36*.38;z+=.008*math.sin(i*1.8+j*.3);vs.append((x,y,z))
for j in range(ny):
 for i in range(nx):a=j*(nx+1)+i;fs.append((a,a+1,a+nx+2,a+nx+1))
mesh('S06 Draped pale throw',vs,fs,yellow,True)
for i in range(36):x=12.22+i*.0118;tube('S06 Throw fringe',[(x,-.15,4.01),(x+.006*math.sin(i),-.15,3.98)],.0013,yellow)
# Mushroom-like side lamp on its own pale table.
cylinder('S08 Side table top',(12.70,1.44,4.50),.24,.24,.035,cream);tube('S08 Side table stem',[(12.70,1.44,4.02),(12.70,1.44,4.49)],.025,cream);cylinder('S08 Side table foot',(12.70,1.44,4.02),.15,.15,.025,cream)
tube('S08 Lamp slender stem',[(12.70,1.44,4.53),(12.70,1.44,5.0)],.009,gold);cylinder('S08 Lamp small base',(12.70,1.44,4.53),.08,.08,.025,gold)
vs=[];fs=[];n=80;m=14
for j in range(m+1):
 a=math.pi/2*j/m;rr=.26*math.sin(a);z=5.09+.12*math.cos(a)
 for i in range(n):t=i*math.tau/n;r=rr*(1+.065*math.cos(t*8)*math.sin(a)**3);vs.append((12.70+r*math.cos(t),1.44+r*math.sin(t),z))
for j in range(m):
 for i in range(n):a=j*n+i;b=j*n+(i+1)%n;fs.append((a,b,b+n,a+n))
mesh('S08 Lobed glossy red shade',vs,fs,red,True)
# Aft port cabinet, aligned with the side wall, with two different-height lamps.
box('A04 Rounded aft glossy cabinet',(9.45,2.32,4.38),(1.42,.44,.80),walnut,.10);box('A04 Pale counter top',(9.45,2.32,4.79),(1.46,.46,.028),cream,.075)
for x in [9.10,9.45,9.80]:tube('A04 Cabinet door hairline',[(x,2.091,4.03),(x,2.091,4.75)],.0012,dark)
for j,(x,h)in enumerate([(9.12,.81),(9.64,.98)]):
 tube('A05 Sculptural white lamp foot',[(x-.12,2.30,4.81),(x,2.30,5.02)],.035,cream)
 tube('A05 Dark slender lamp stem',[(x,2.30,5.00),(x+.025,2.30,4.81+h-.19)],.014,dark)
 vs=[];fs=[];n=56
 for rr,z in [(.12,4.81+h-.25),(.09,4.81+h+.04)]:vs.extend([(x+.025+rr*math.cos(i*math.tau/n),2.30+rr*math.sin(i*math.tau/n),z)for i in range(n)])
 for i in range(n):fs.append((i,(i+1)%n,(i+1)%n+n,i+n))
 mesh('A05 Ivory tapered lampshade',vs,fs,linen,True)
box('A06 Small framed ornament',(9.95,2.32,4.96),(.19,.025,.28),chrome,.012)
for j in range(3):b=box('A06 Reflective sculptural plates',(9.92+j*.055,2.25,4.93+j*.04),(.035,.19,.045),chrome,.008);b.rotation_euler[0]=-.35+j*.27
# Rounded oblong dining table, visible upholstered chair family, pedestal centerpiece.
vs=[];outline=rrect(1.45,3.05,.48);n=len(outline)
for z in [4.667,4.738]:vs.extend([(16.0+x,.05+y,z)for x,y in outline])
fs=[tuple(range(n-1,-1,-1)),tuple(range(n,2*n))]+[(i,(i+1)%n,(i+1)%n+n,i+n)for i in range(n)]
o=mesh('D01 Rounded dark stone tabletop',vs,fs,stone);mod=o.modifiers.new('Polished stone eased edge','BEVEL');mod.width=.008;mod.segments=3
vs=[];outline=rrect(1.51,3.11,.51);n=len(outline)
for z in [4.64,4.730]:vs.extend([(16+x,.05+y,z)for x,y in outline])
mesh('D01 Rounded dark tabletop border',vs,[tuple(range(n-1,-1,-1)),tuple(range(n,2*n))]+[(i,(i+1)%n,(i+1)%n+n,i+n)for i in range(n)],dark)
for y in [-.74,.84]:box('D01 Pale sculptural table support',(16.0,y,4.30),(.67,.19,.71),cream,.065)
chair_positions=[(x,y)for x in [15.02,16.98]for y in [-.895,-.265,.365,.995]]+[(16.0,-1.72),(16.0,1.82)]
for j,(x,y)in enumerate(chair_positions):
 rot=math.pi/2 if x<15.5 else-math.pi/2 if x>16.5 else math.pi if y<0 else 0
 ellipsoid('D02 Upholstered dining seat',(x,y,4.39),(.51,.54,.19),linen,rot,power=.6)
 # Upholstered back shell wraps around the sides, with a low open seat junction.
 n=30;m=12;vs=[];fs=[]
 for row in range(2):
  z=4.42+row*.46
  for k in range(n+1):a=math.radians(10+160*k/n);u=.30*math.cos(a);v=.29*math.sin(a)-.08;vs.append((x+u*math.cos(rot)-v*math.sin(rot),y+u*math.sin(rot)+v*math.cos(rot),z))
 for k in range(n):fs.append((k,k+1,k+n+2,k+n+1))
 o=mesh('D02 Curved dining back',vs,fs,linen,True);mod=o.modifiers.new('Upholstery thickness','SOLIDIFY');mod.thickness=.065;mod=o.modifiers.new('Soft shell edges','BEVEL');mod.width=.03;mod.segments=4
 for dx in [-.20,.20]:
  for dy in [-.19,.19]:tube('D02 Slim dining leg',[(x+dx,y+dy,F+.035),(x+dx*.9,y+dy*.9,4.36)],.012,dark)
# Scalloped white centerpiece, modeled as a pedestal bowl rather than a generic vase.
vs=[];fs=[];n=80
for rr,z in [(.17,4.748),(.065,4.99),(.12,5.015),(.24,5.10),(.235,5.16),(.20,5.14),(.05,5.04)]:
 for i in range(n):a=i*math.tau/n;r=rr;vs.append((16.0+r*math.cos(a),.05+r*math.sin(a),z))
for row in range(6):
 for i in range(n):a=row*n+i;b=row*n+(i+1)%n;fs.append((a,b,b+n,a+n))
centerpiece=material('White ceramic centerpiece',(.82,.83,.82),rough=.26)
mesh('D03 Pedestal centerpiece bowl',vs,fs,centerpiece,True)
for i in range(13):
 a=i*math.tau/13;bpy.ops.mesh.primitive_uv_sphere_add(segments=16,ring_count=8,radius=.026,location=point((16.0+.232*math.cos(a),.05+.232*math.sin(a),5.155)));o=bpy.context.object
 for f in o.data.polygons:f.use_smooth=True
 keep(o,'D03 Rounded ceramic rim bead',centerpiece)
# Ceiling relief, panel seams, restrained fixtures and thin suspended dining oval.
box('C01 Main white ceiling',(13.16,0,6.055),(9.26,5.32,.09),white,.04)
# The lip is annular. A solid cylinder would hide the recessed centre entirely.
vs=[];fs=[];n=160
profile=[(1.83,2.05,6.009),(1.83,2.05,5.985),(1.818,2.038,5.968),(1.80,2.02,5.960),(1.77,1.99,5.960),(1.748,1.968,5.976),(1.74,1.96,5.995),(1.74,1.96,6.009)]
for rx,ry,z in profile:vs.extend([(11.75+rx*math.cos(i*math.tau/n),ry*math.sin(i*math.tau/n),z)for i in range(n)])
for j in range(len(profile)):
 for i in range(n):a=j*n+i;b=j*n+(i+1)%n;c=((j+1)%len(profile))*n+(i+1)%n;d=((j+1)%len(profile))*n+i;fs.append((a,b,c,d))
mesh('C01 Rounded annular coffer lip',vs,fs,white,True)
cylinder('C01 Recessed oval center',(11.75,0,6.006),1.746,1.966,.008,white)
# C02 panel joints are filtered surface lines in the viewer, not sliver meshes.
white['surfaceDetailIDs']=['MD_R02/OBS/C02/filtered-panel-joints'];oak['surfaceDetailIDs']=['MD_R02/OBS/A10/plank-texture-joints']
for x in [9.5,12.2,14.1,16.9]:
 for y in [-1.9,1.9]:
  cylinder('C03 Downlight white rim',(x,y,5.98),.042,.042,.025,white);cylinder('C03 Small recessed warm diffuser',(x,y,5.963),.028,.028,.008,warm)
for x in [11.40,12.10]:
 for y in [-.45,.45]:
  cylinder('C03 Coffered ceiling downlight rim',(x,y,5.993),.033,.033,.016,white);cylinder('C03 Coffered ceiling warm diffuser',(x,y,5.981),.022,.022,.005,warm)
for x in [10.7,13.8]:
 for y in [-1.85,1.85]:cylinder('C03 Circular speaker grille',(x,y,5.989),.095,.095,.012,grille)
cylinder('C03 Alarm puck',(14.9,1.4,5.98),.052,.052,.03,white)
for y in [-2.4,2.4]:
 for k in range(3):tube('C03 Long ventilation slot',[(9.15,y+k*.012,5.99),(12.0,y+k*.012,5.99)],.002,black)
cylinder('C04 Dining ceiling inset',(16.0,.05,6.007),.818,1.697,.008,white)
# The dining oval is a shallow ceiling recess, with a continuous warm perimeter
# and a central row of small diffusers. The tour shows no suspension wires.
for z,mat,r in [(6.003,white,.022),(5.976,warm,.011)]:tube('C04 Recessed luminous dining oval',[(16.0+.84*math.cos(i*math.tau/180),.05+1.72*math.sin(i*math.tau/180),z)for i in range(180)],r,mat,True)
for y in [-1.10,-.66,-.22,.22,.66,1.10]:
 cylinder('C04 Central dining diffuser rim',(16.0,y+.05,5.990),.025,.025,.015,white);cylinder('C04 Central dining diffuser',(16.0,y+.05,5.979),.016,.016,.005,warm)
for side in [-1,1]:box('C05 Aft warm accent joint',(8.76,side*2.09,4.98),(.012,.016,1.93),warm,.002)
# Evaluate modifiers without changing the editable authoring scene.
components=[];deps=bpy.context.evaluated_depsgraph_get();exportobjs=[]
for o in objects:
 ev=o.evaluated_get(deps);data=bpy.data.meshes.new_from_object(ev);ob=bpy.data.objects.new(o.name+' | Web',data);ob.matrix_world=o.matrix_world.copy();S.collection.objects.link(ob);ob['lightmap']=o['lightmap'];ob['sourceIDs']=json.dumps([o['componentID']]);exportobjs.append(ob);components.append({'id':o['componentID'],'feature':o.name,'lightmap':o['lightmap'],'dimensionStatus':'image-estimated','source':'VRCLOUD viewpoint inventory'})
# Editable originals are kept in a dedicated, hidden export-free collection.
original=bpy.data.collections.new('EDITABLE | reference-authored components');S.collection.children.link(original)
for o in objects:
 for c in list(o.users_collection):c.objects.unlink(o)
 original.objects.link(o)
original.hide_render=True;original.hide_viewport=True
merged=[];atlasStats={};prepareUV=runpy.run_path(str(R/'tools/lightmap-uv.py'))['prepare_uv']
groups={a:[o for o in exportobjs if o['lightmap']==a]for a in ['architecture','furniture','none']}
for atlas,group in groups.items():
 # Architecture material placements share one atlas, furniture another.
 bpy.ops.object.select_all(action='DESELECT')
 for o in group:o.select_set(True)
 bpy.context.view_layer.objects.active=group[0];bpy.ops.object.join();ob=bpy.context.object;ob.name='MD_R02 | '+atlas;ob['lightmap']=atlas;ob['sourceIDs']=json.dumps(sorted({c['id']for c in components if c['lightmap']==atlas}));merged.append(ob)
 # Flatten object transform for coherent metres-based material UVs.
 bpy.ops.object.transform_apply(location=False,rotation=False,scale=True);d=ob.data
 while len(d.uv_layers):d.uv_layers.remove(d.uv_layers[0])
 uv=d.uv_layers.new(name='UV0');uv1=d.uv_layers.new(name='UV1')
 for f in d.polygons:
  mat=d.materials[f.material_index];family=mat.get('family','paint');tile=T.get(family,{}).get('tileMetres',1)
  axis=max(range(3),key=lambda i:abs(f.normal[i]));axes=(0,1)if axis==2 else(0,2)if axis==1 else(1,2)
  if family in ['wood','flooroak']:axes=tuple(reversed(axes))
  for li in f.loop_indices:p=d.vertices[d.loops[li].vertex_index].co;uv.data[li].uv=(p[axes[0]]/tile,p[axes[1]]/tile)
 if atlas!='none':
  atlasStats[atlas]=prepareUV(ob,atlas,R)
 d.uv_layers.active_index=0;d.uv_layers['UV0'].active_render=True
# Fixed diffuse sky transport, with no runtime sun or lamp shadow imprints.
def area(name,p,t,energy,size):
 d=bpy.data.lights.new(name,'AREA');d.energy=energy;d.shape='DISK';d.size=size;o=bpy.data.objects.new(name,d);S.collection.objects.link(o);o.location=point(p);o.rotation_euler=(point(t)-o.location).to_track_quat('-Z','Y').to_euler();o['purpose']='Ambient-only authoring fill'
for side in [-1,1]:
 area('Diffuse sky fill', (11.2,side*3.2,5.15),(11.2,0,4.6),160 if side==-1 else 80,3.4);area('Diffuse dining fill',(16.1,side*3.2,5.2),(16.1,0,4.7),105 if side==-1 else 65,2.4)
area('Aft diffuse fill',(8.2,0,5.1),(11,0,4.6),45,3)
for o in merged:
 if o['lightmap']=='none':o.hide_render=True
S.render.image_settings.file_format='OPEN_EXR';S.render.image_settings.color_mode='RGB';S.render.image_settings.color_depth='16';S.render.image_settings.exr_codec='PIZ'
for a in ['architecture','furniture']:
 ob=next(o for o in merged if o['lightmap']==a);bpy.ops.object.select_all(action='DESELECT');ob.select_set(True);bpy.context.view_layer.objects.active=ob;ob.data.uv_layers.active_index=1
 for m in ob.data.materials:m.node_tree.nodes.active=m.node_tree.nodes['BAKE | linear ambient only']
 S.render.bake.margin=atlasStats[a]['bakeMarginPixels'];start=time.time();bpy.ops.object.bake(type='DIFFUSE');atlases[a].save_render(str(O/('ambient-'+a+'.exr')),scene=S);atlases[a].pack();atlases[a].use_fake_user=True;print('BAKED',a,time.time()-start,flush=True);ob.data.uv_layers.active_index=0
for o in merged:o.hide_render=False
bpy.ops.object.select_all(action='DESELECT')
for o in merged:o.select_set(True)
bpy.ops.export_scene.gltf(filepath=str(O/'room-source.glb'),export_format='GLB',use_selection=True,export_extras=True,export_texcoords=True,export_normals=True,export_materials='EXPORT')
for im in bpy.data.images:
 if im.has_data and im.source=='FILE':im.pack()
S['source_basis']='Inherited MD_R02 envelope; 28 observed detail groups from user-provided 360 tour';S['accuracy']='Image-based reconstruction. Geometry and coordinates inferred, no as-built dimensional claim.';S['reference']='https://vrcloud.com/?pv=1667308298';S['release_scope']='Salón principal only';bpy.ops.wm.save_as_mainfile(filepath=str(W/'saloon-master.blend'))
(O/'reference-components.json').write_text(json.dumps(components,indent=2)+'\n');(O/'authoring.json').write_text(json.dumps({'room':'saloon','revision':7,'atlasPadding':atlasStats,'sourceGeometrySHA256':json.loads((W/'snapshot/saloon.json').read_text())['sha256'],'replacementBasis':'28 viewpoint detail groups; inherited room envelope, furniture and visible interior replaced as image-estimated geometry','atlasSize':2048,'atlases':['architecture','furniture'],'rawBakesSHA256':{a:hashlib.sha256((O/('ambient-'+a+'.exr')).read_bytes()).hexdigest()for a in ['architecture','furniture']},'bakeGeometrySHA256':hashlib.sha256((O/'room-source.glb').read_bytes()).hexdigest(),'rawNativeBakesPacked':True,'samples':96,'ambientEnvironmentSHA256':hashlib.sha256((W/'material-sources/marine-ambient.exr').read_bytes()).hexdigest(),'uvRoles':{'material':0,'ambient':1},'surfaceDetails':{'C02':'Derivative-filtered ceiling panel joints in the Three.js material','A10':'Physically scaled floor texture includes staggered plank joints'},'blender':bpy.app.version_string,'dynamicObjects':[],'bakedOccludersExcludeDynamic':True,'masterSHA256':hashlib.sha256((W/'saloon-master.blend').read_bytes()).hexdigest()},indent=2)+'\n');print('COMPLETE',len(components),'components',flush=True)
