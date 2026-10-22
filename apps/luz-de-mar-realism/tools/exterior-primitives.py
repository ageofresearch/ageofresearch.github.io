"""Shared Blender authoring primitives; same source axes as the preserved yacht."""
import bpy,math,json,bmesh
from pathlib import Path
from mathutils import Vector
SX=35.23/36;SY=7.47/7.6;ZONE='context';objects=[];materials={};images={};atlases={}
def configure(root):
 global R,W,T,S
 R=Path(root);W=R/'work';T=json.loads((W/'textures/materials.json').read_text());S=bpy.context.scene
def zone(id):
 global ZONE
 ZONE=id
def point(p):return Vector((p[1]*SY,-(p[0]*SX-17.615),p[2]-2.01))

def img(file,kind):
 if (file,kind)not in images:
  v=bpy.data.images.load(str(W/'textures'/file),check_existing=True);v.colorspace_settings.name='sRGB'if kind=='color'else'Non-Color';images[file,kind]=v
 return images[file,kind]

def material(name,color,family='paint',rough=.5,metal=0,atlas=None,emission=0):
 atlas=ZONE if atlas is None else atlas
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

def keep(o,name,mat):
 o.name=name;o.data.materials.append(mat);o['zone']=ZONE;o['lightmap']=mat['lightmap'];o['componentID']=ZONE+'/'+name.split(' ')[0]+'/'+str(len(objects)+1).zfill(4);o['evidence']='exterior-inventory.json';o['dimensionStatus']='VR image-estimated, not surveyed';objects.append(o);return o

def mesh(name,verts,faces,mat,smooth=False):
 d=bpy.data.meshes.new(name);d.from_pydata([point(p)for p in verts],[],faces);d.update();bm=bmesh.new();bm.from_mesh(d)
 if len(faces)>1:bmesh.ops.recalc_face_normals(bm,faces=list(bm.faces))
 bm.to_mesh(d);bm.free();o=bpy.data.objects.new(name,d);S.collection.objects.link(o)
 for f in d.polygons:f.use_smooth=smooth
 return keep(o,name,mat)

def box(name,c,size,mat,bevel=.02):
 bpy.ops.mesh.primitive_cube_add(size=1,location=point(c));o=bpy.context.object;o.dimensions=(size[1]*SY,size[0]*SX,size[2]);bpy.ops.object.transform_apply(location=False,rotation=False,scale=True)
 if bevel:
  m=o.modifiers.new('Rounded manufactured edges','BEVEL');m.width=bevel;m.segments=2;m=o.modifiers.new('Face-weighted shading','WEIGHTED_NORMAL');m.keep_sharp=True
 return keep(o,name,mat)

def ellipsoid(name,c,size,mat,rot=0,power=.55):
 vs=[];fs=[];n=32;k=16
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
 nx=24;ny=18;vs=[];fs=[]
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
 d=bpy.data.curves.new(name,'CURVE');d.dimensions='3D';d.resolution_u=1;d.bevel_depth=r;d.bevel_resolution=2;sp=d.splines.new('POLY');sp.points.add(len(pts)-1)
 for q,p in zip(sp.points,pts):q.co=(*point(p),1)
 sp.use_cyclic_u=closed;o=bpy.data.objects.new(name,d);S.collection.objects.link(o);keep(o,name,mat);return o

def cylinder(name,c,rx,ry,height,mat):
 vs=[];n=48
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
