"""Repair context only; keep all room geometry, UVs and bakes byte-identical.
Run with the r9 exteriors-final.blend. The original hull is read from the guarded
published binary. New joining bands are inferred display structure, not a survey.
"""
import bpy,json,struct,hashlib,runpy,math
from mathutils import Vector
from pathlib import Path
R=Path(__file__).resolve().parents[1];W=R/'work/structure-r10';W.mkdir(parents=True,exist_ok=True)
source=R.parents[1]/'site/tidewater-rocha/rocha/luz-de-mar'
model=json.loads((source/'model.json').read_text());binary=(source/'model.bin').read_bytes()
audit=json.loads((R/'public/assets/yacht-structure.json').read_text())
assert hashlib.sha256(binary).hexdigest()==audit['sourceFiles']['rocha/luz-de-mar/model.bin']
P=runpy.run_path(str(R/'tools/exterior-primitives.py'));P['configure'](R);P['zone']('context')
# Functions share the module globals, including configure/zone state.
mesh=P['mesh'];white=P['material']('Structural joining enamel',(.83,.83,.79),'paint',.35,atlas='context')
S=bpy.context.scene;col=bpy.data.collections['EDITABLE | context'];col.hide_viewport=False
for o in list(S.objects):
 if o.type=='MESH'and not any(c.name.startswith('EDITABLE |')for c in o.users_collection):bpy.data.objects.remove(o,do_unlink=True)
for o in list(col.objects):
 if o.name.startswith('X07 Preserved source hull'):bpy.data.objects.remove(o,do_unlink=True)
def deck_cut(x):
 if x<3.4:return 2.02
 if x<23:return 3.86
 if x<24.55:return 3.86+(x-23)/1.55*(5.92-3.86)
 if x<=32.65:return 5.92
 if x<33.75:return 5.92-(x-32.65)/1.1*.90
 return 5.02
def clip(poly,a,limit,greater):
 out=[]
 for p,q in zip(poly,poly[1:]+poly[:1]):
  ip=p[a]>=limit if greater else p[a]<=limit;iq=q[a]>=limit if greater else q[a]<=limit
  if ip:out.append(p)
  if ip!=iq:
   t=(limit-p[a])/(q[a]-p[a]);out.append([p[k]+(q[k]-p[k])*t for k in range(len(p))])
 return out
knots=[0,3.4,23,24.55,32.65,33.75,36.001];hulls=[];seam_samples=[]
for m in model['meshes']:
 if m['category']!='Hull':continue
 floats=struct.unpack_from('<'+'f'*(m['vCount']*6),binary,m['vByte']);vs=[list(floats[i:i+6])for i in range(0,len(floats),6)];ix=struct.unpack_from('<'+'H'*m['iCount'],binary,model['vertexBytes']+m['iByte']);verts=[];faces=[]
 for i in range(0,len(ix),3):
  tri=[vs[k]for k in ix[i:i+3]]
  for lo,hi in zip(knots,knots[1:]):
   p=clip(clip(tri,0,lo,True),0,hi,False)
   # Clip against the actual sloping interface rather than a triangle centroid.
   out=[]
   for a,b in zip(p,p[1:]+p[:1]):
    da=a[2]-deck_cut(max(lo+1e-6,min(hi-1e-6,a[0])));db=b[2]-deck_cut(max(lo+1e-6,min(hi-1e-6,b[0])))
    if da<=0:out.append(a)
    if(da<=0)!=(db<=0):t=da/(da-db);out.append([a[k]+(b[k]-a[k])*t for k in range(len(a))])
   if len(out)>2:k=len(verts);verts+=out;faces.append(tuple(range(k,k+len(out))))
 # Every clipped source triangle has its own vertices. Recalculating normals
 # on those disconnected faces picks arbitrary winding and opens apparent holes
 # under back-face culling. Preserve the source's interpolated normal field.
 name='X07 Reconciled source hull '+m['id'];d=bpy.data.meshes.new(name)
 positions=[P['point'](p)for p in verts];normals=[Vector((p[4]/P['SY'],-p[3]/P['SX'],p[5])).normalized()for p in verts];fixed=[]
 for f in faces:
  a,b,c=[positions[k]for k in f[:3]];n=sum((normals[k]for k in f),Vector())
  fixed.append(tuple(reversed(f))if(b-a).cross(c-a).dot(n)<0 else f)
 d.from_pydata(positions,[],fixed);d.update()
 for f in d.polygons:f.use_smooth=True
 d.normals_split_custom_set_from_vertices(normals);ob=bpy.data.objects.new(name,d);S.collection.objects.link(ob);P['keep'](ob,name,white)
 ob['sourceIDs']=json.dumps([m['id']]);ob['dimensionStatus']='Original published hull clipped to reconstructed deck underside; source winding and smooth normals preserved';hulls.append((m,vs,ix))
def rim(x):
 # Intersect outer source hull triangles with a transverse plane. Choose the
 # positive outer edge at the highest retained point of that section.
 m,vs,ix=hulls[0];points=[]
 for i in range(0,len(ix),3):
  tri=[vs[k]for k in ix[i:i+3]]
  for a,b in zip(tri,tri[1:]+tri[:1]):
   if(a[0]-x)*(b[0]-x)>0 or abs(b[0]-a[0])<1e-9:continue
   t=(x-a[0])/(b[0]-a[0]);q=[a[k]+(b[k]-a[k])*t for k in range(3)]
   if q[1]>0 and q[2]<=deck_cut(x)+1e-5:points.append(q)
  # Include the exact cut through this triangle's transverse section when the
  # source rim is higher than the reconstructed working deck.
  intersections=[]
  for a,b in zip(tri,tri[1:]+tri[:1]):
   if(a[0]-x)*(b[0]-x)<=0 and abs(b[0]-a[0])>1e-9:
    t=(x-a[0])/(b[0]-a[0]);intersections.append([a[k]+(b[k]-a[k])*t for k in range(3)])
  if len(intersections)==2:
   a,b=intersections;z=deck_cut(x)
   if(a[2]-z)*(b[2]-z)<=0 and abs(b[2]-a[2])>1e-9:
    t=(z-a[2])/(b[2]-a[2]);q=[a[k]+(b[k]-a[k])*t for k in range(3)]
    if q[1]>0:points.append(q)
 assert points,('Missing hull section',x)
 z=max(p[2]for p in points);return max((p for p in points if abs(p[2]-z)<1e-4),key=lambda p:p[1])
def width(x):
 if x<=31.9:return 2.95
 if x<=32.65:return 2.95-(x-31.9)/.75*.4
 if x<=33.75:return 2.55-(x-32.65)/1.1*.285
 return 2.265-(x-33.75)/(35.65-33.75)*1.615
def deck_join(x):
 # The tapered working deck is a single top face, whereas the lounge deck is
 # an 11 cm slab. Meet their actual surfaces instead of leaving an 8 cm slit.
 if x<=32.65:return 5.92
 if x<33.75:return 5.92-(x-32.65)/1.1*.82
 return 5.1
stations=sorted(set([24.55,26,28.5,31,31.9,32.65,33,33.75,34.5,35.4,35.65]+[24.55+i*.15 for i in range(75)if 24.55+i*.15<35.65]))
for side in[-1,1]:
 verts=[];faces=[]
 for x in stations:
  p=rim(x);top=[x,side*width(x),deck_join(x)];bottom=[x,side*p[1],p[2]];verts.extend([bottom,top]);seam_samples.append({'x':x,'side':side,'hullContact':bottom,'deckContact':top})
 for i in range(len(stations)-1):k=i*2;faces.append((k,k+2,k+3,k+1))
 ob=mesh('X08 Inferred foredeck structural skin '+str(side),verts,faces,white)
 for f in ob.data.polygons:
  if f.normal.x*side<0:f.flip()
 ob['sourceIDs']=json.dumps(['HULL_HUL_001','UD_DCK_001']);ob['dimensionStatus']='Inferred joining skin, anchored to original hull sections and existing reconstructed deck edge'
ob=mesh('X08 Foredeck aft return',[(24.55,-2.95,3.95),(24.55,2.95,3.95),(24.55,2.95,5.92),(24.55,-2.95,5.92)],[(0,1,2,3)],white)
for f in ob.data.polygons:
 if f.normal.y<0:f.flip()
ob['dimensionStatus']='Inferred closing surface below the forward lounge, above the main-deck suite footprint'
# Isolate editable context; rooms and their UV-bound exports remain untouched.
new=P['objects']
for o in new:
 for c in list(o.users_collection):c.objects.unlink(o)
 col.objects.link(o)
for c in S.collection.children:
 if c.name.startswith('EDITABLE |')and c!=col:c.hide_viewport=True
bpy.context.view_layer.update();deps=bpy.context.evaluated_depsgraph_get();exports=[]
for o in col.objects:
 if o.type not in['MESH','CURVE']:continue
 d=bpy.data.meshes.new_from_object(o.evaluated_get(deps));ob=bpy.data.objects.new(o.name+' | Web',d);ob.matrix_world=o.matrix_world.copy();S.collection.objects.link(ob);ob['zone']='context';ob['lightmap']='context';exports.append(ob)
bpy.ops.object.select_all(action='DESELECT')
for o in exports:o.select_set(True)
bpy.ops.export_scene.gltf(filepath=str(W/'context-source.glb'),export_format='GLB',use_selection=True,export_extras=True,export_texcoords=True,export_normals=True)
for o in exports:bpy.data.objects.remove(o,do_unlink=True)
scene=bpy.data.scenes.new('Yacht structural context | r10');scene.world=S.world;scene.unit_settings.system='METRIC';scene.collection.children.link(col);scene['source']=audit['original'];scene['sourceModelSHA256']=audit['sourceFiles']['rocha/luz-de-mar/model.bin'];scene['accuracy']='Source hull preserved; foredeck joining skins inferred. No additional walking areas.'
for im in bpy.data.images:
 if im.source=='FILE'and im.filepath and not im.packed_file:im.pack()
bpy.data.libraries.write(str(W/'yacht-structure-r10.blend'),{scene},fake_user=True,compress=True)
record={'revision':'structure-r10','sourceModelSHA256':scene['sourceModelSHA256'],'nativeSHA256':hashlib.sha256((W/'yacht-structure-r10.blend').read_bytes()).hexdigest(),'sourceGLBSHA256':hashlib.sha256((W/'context-source.glb').read_bytes()).hexdigest(),'components':len(col.objects),'seamSamples':seam_samples,'roomsReexported':False,'bakesRecomputed':False,'lightingLimit':'Existing room irradiance and probes retained; added outer joining skins use the existing context ambient and live sun.'}
(W/'geometry-verification.json').write_text(json.dumps(record,indent=2)+'\n');print('STRUCTURE COMPLETE',len(col.objects),'components',len(seam_samples),'seam samples',flush=True)
