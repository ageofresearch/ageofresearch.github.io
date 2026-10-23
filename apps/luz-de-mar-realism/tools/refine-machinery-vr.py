"""Reference-led finish/light pass. Retains all original room vertices and UV1.
Supplement placement is estimated in the original coordinate system, not surveyed.
"""
import bpy,json,hashlib,math,base64,numpy as np
from pathlib import Path
from mathutils import Vector
R=Path(__file__).resolve().parents[1];W=R/'work/machinery-r11';A=R/'public/assets/machinery';S=bpy.context.scene
binding=json.loads((A/'authoring.json').read_text());meta=json.loads((W/'snapshot/machinery.json').read_text());T=json.loads((R/'work/textures/materials.json').read_text())
def family(r):return 'checker'if r['pattern']in[23,35]else'acoustic'if r['pattern']in[24,34]else'insulation'if r['pattern']==30 else r['family']
for m in bpy.data.materials:
 if not m.get('family')or m['family']=='vr-supplement':continue
 ri=int(m.name.split(' |')[0].rsplit(' ',1)[1]);r=meta['recipes'][ri];fam=family(r);changed=fam!=m['family'];m['family']=fam
 if changed:
  for n in m.node_tree.nodes:
   if n.type=='TEX_IMAGE'and n.image and n.name!='BAKE | linear ambient only':
    old=n.image.name.lower();kind='normal'if'normal'in old else'roughness'if'rough'in old else'color';n.image=bpy.data.images.load(str(R/'work/textures'/T[fam][kind]),check_existing=True);n.image.colorspace_settings.name='sRGB'if kind=='color'else'Non-Color'
 for n in m.node_tree.nodes:
  if n.type=='NORMAL_MAP':n.inputs['Strength'].default_value=.65 if fam=='checker'else .05 if fam=='paint'else .4
 p=m.node_tree.nodes.get('Principled BSDF')
 if m.get('visibleEmitter'):
  for n in m.node_tree.nodes:
   if n.type=='MATH'and n.operation=='MULTIPLY'and any(l.to_socket==p.inputs['Emission Strength']for l in m.node_tree.links if l.from_node==n):n.inputs[1].default_value=60
 if ri in[0,3]:
  for link in list(p.inputs['Roughness'].links):m.node_tree.links.remove(link)
  p.inputs['Roughness'].default_value=.12;m['roughnessFactor']=.12;p.inputs['Coat Weight'].default_value=.7;p.inputs['Coat Roughness'].default_value=.10
# Pattern 35 was missing from the family mapping. Restore its physical UV0 tile;
# the lightmap islands remain byte-for-byte unchanged.
for o in S.objects:
 if o.type!='MESH' or not o.get('sourceIDs')and not o.get('componentID'):continue
 for f in o.data.polygons:
  m=o.data.materials[f.material_index]
  if not m.get('family')in['checker','acoustic']:continue
  tile=T[m['family']]['tileMetres'];axis=max(range(3),key=lambda i:abs(f.normal[i]));axes=(0,1)if axis==2 else(0,2)if axis==1 else(1,2)
  for li in f.loop_indices:
   v=o.data.vertices[o.data.loops[li].vertex_index].co;o.data.uv_layers['UV0'].data[li].uv=(v[axes[0]]/tile,v[axes[1]]/tile)
# Do not accumulate supplements on a repeated authoring run.
old=bpy.data.collections.get('VR | machinery supplements')
if old:
 for o in list(old.objects):bpy.data.objects.remove(o,do_unlink=True)
 bpy.data.collections.remove(old)
C=bpy.data.collections.new('VR | machinery supplements');S.collection.children.link(C);supp=[]
def point(p):return Vector((p[1]*7.47/7.6,-(p[0]*35.23/36-17.615),p[2]-2.01))
def material(name,color,rough=.5,metal=0,emit=False):
 m=bpy.data.materials.new(name);m.use_nodes=True;m.diffuse_color=(*color,1);m['family']='vr-supplement';m['lightmap']='none';m['visibleEmitter']=emit;p=m.node_tree.nodes['Principled BSDF'];p.inputs['Base Color'].default_value=(*color,1);p.inputs['Roughness'].default_value=rough;p.inputs['Metallic'].default_value=metal
 if emit:
  p.inputs['Emission Color'].default_value=(*color,1);n=m.node_tree.nodes;l=m.node_tree.links;ray=n.new('ShaderNodeLightPath');mx=n.new('ShaderNodeMath');mx.operation='MAXIMUM';l.new(ray.outputs['Is Camera Ray'],mx.inputs[0]);l.new(ray.outputs['Is Glossy Ray'],mx.inputs[1]);gain=n.new('ShaderNodeMath');gain.operation='MULTIPLY';gain.inputs[1].default_value=60;l.new(mx.outputs[0],gain.inputs[0]);l.new(gain.outputs[0],p.inputs['Emission Strength'])
 return m
metal=material('VR | LED aluminium housing',(.63,.67,.68),.24,.8);diffuser=material('VR | neutral LED diffuser',(.94,.97,1),.28,0,True);amber=material('VR | ochre removable floor grid',(.42,.24,.055),.65)
def box(name,center,size,m):
 p=point(center);# Physical dimensions follow the source axes but do not inherit yacht normalization.
 x,y,z=size;v=[p+Vector((sy*y/2,-sx*x/2,sz*z/2))for sx,sy,sz in[(-1,-1,-1),(-1,-1,1),(-1,1,-1),(-1,1,1),(1,-1,-1),(1,-1,1),(1,1,-1),(1,1,1)]];d=bpy.data.meshes.new(name);d.from_pydata(v,[],[(0,4,6,2),(1,3,7,5),(0,1,5,4),(2,6,7,3),(0,2,3,1),(4,5,7,6)]);d.materials.append(m);o=bpy.data.objects.new(name,d);C.objects.link(o);o['lightmap']='none';o['reference']='VR Engine Room; observed form, estimated placement';o['componentID']='VR_ER/'+name;supp.append(o);return o
specs=binding['lights']
# Nits for rectangular emitters; selected visually, not a real lux measurement.
for r in specs['rectangles']:r['intensity']=1600
for s in specs['spots']:s['intensity']=12
specs['color']=[1,.98,.94];specs['exposure']=.05
extra=[]
for i,(x,y,length)in enumerate([(12.15,-1.85,1.35),(12.15,0,1.35),(12.15,1.85,1.35),(8.35,0,1.25)]):
 box('transverse LED housing '+str(i),[x,y,3.745],[.038,length,.018],metal);box('transverse LED diffuser '+str(i),[x,y,3.733],[.022,length-.035,.006],diffuser);p=point([x,y,3.728]);web=[p.x,p.z,-p.y];extra.append({'position':web,'width':length-.035,'height':.022,'intensity':1600,'evidence':'VR transverse light; fitted position estimated'})
# Existing longitudinal rectangular lights are preserved; supplement only once.
specs['rectangles']=specs['rectangles'][:3]+extra
for o in list(S.objects):
 if o.type=='LIGHT':bpy.data.objects.remove(o,do_unlink=True)
for i,s in enumerate(specs['rectangles']):
 d=bpy.data.lights.new('Fixed LED strip '+str(i),'AREA');d.shape='RECTANGLE';d.size=s['width'];d.size_y=s['height'];d.energy=math.pi*s['width']*s['height']*s['intensity'];d.color=specs['color'];o=bpy.data.objects.new(d.name,d);S.collection.objects.link(o);o.location=(s['position'][0],-s['position'][2],s['position'][1]);o.visible_glossy=False
for i,s in enumerate(specs['spots']):
 d=bpy.data.lights.new('Broad work beam '+str(i),'SPOT');d.energy=4*math.pi*s['intensity'];d.spot_size=1.9;d.spot_blend=.85;d.shadow_soft_size=.15;d.color=specs['color'];o=bpy.data.objects.new(d.name,d);S.collection.objects.link(o);o.location=point(s['sourcePosition']);o.rotation_euler=(point(s['sourceTarget'])-o.location).to_track_quat('-Z','Y').to_euler();o.visible_glossy=False
# Thin removable grid: clip the reference-led transverse placement to the actual
# source walk support, so no bar crosses a cabinet, foso or the engine register.
n=meta['navigation'];bits=base64.b64decode(n['mask'])
def safe(x,y):
 ix=round((x-n['x0'])/n['step']);iy=round((y-n['y0'])/n['step']);i=iy*n['nx']+ix
 return 0<=ix<n['nx']and 0<=iy<n['ny']and bits[i>>3]>>(i&7)&1
verts=[];faces=[]
def bar(x0,y0,x1,y1):
 i=len(verts);verts.extend([point([x0,y0,1.587]),point([x1,y0,1.587]),point([x1,y1,1.587]),point([x0,y1,1.587])]);faces.append((i,i+1,i+2,i+3))
for x in np.arange(8.15,8.77,.020):
 for y in np.arange(-1.65,1.65,.040):
  if safe(x,y)and safe(x,y+.04):bar(x-.003,y,x+.003,y+.04)
for y in np.arange(-1.65,1.65,.020):
 for x in np.arange(8.15,8.77,.040):
  if safe(x,y)and safe(x+.04,y):bar(x,y-.003,x+.04,y+.003)
d=bpy.data.meshes.new('VR ochre grid clipped to original safe floor');d.from_pydata(verts,[],faces);d.materials.append(amber);o=bpy.data.objects.new(d.name,d);C.objects.link(o);o['lightmap']='none';o['componentID']='VR_ER/ochre-grid';o['reference']='VR ochre mat; estimated fit to original walking floor';supp.append(o)
# Export the base separately: the source identities and physical positions remain intact.
opts=dict(export_format='GLB',use_selection=True,export_extras=True,export_normals=True,export_texcoords=True,export_vertex_color='ACTIVE',export_all_vertex_colors=False)
bpy.ops.object.select_all(action='DESELECT')
for o in S.objects:
 if o.name.startswith('LD_R02 |')and o.type=='MESH':o.select_set(True)
bpy.context.view_layer.objects.active=S.objects['LD_R02 | architecture'];bpy.ops.export_scene.gltf(filepath=str(W/'machinery-source.glb'),**opts)
bpy.ops.object.select_all(action='DESELECT')
for o in supp:o.select_set(True)
bpy.context.view_layer.objects.active=supp[0];bpy.ops.export_scene.gltf(filepath=str(W/'machinery-vr-source.glb'),**opts)
S.view_settings.exposure=math.log2(specs['exposure']);S['VR reference']='https://vrcloud.com/?pv=1667308298 — LOWER / Engine Room';S['VR scope']='Finish/light refinement; all original room equipment retained. New transverse LED fixtures and ochre floor grid have estimated placement.'
for im in bpy.data.images:
 if im.source=='FILE'and im.has_data:im.pack()
bpy.ops.wm.save_as_mainfile(filepath=str(W/'machinery-master.blend'),compress=True)
binding.update({'lights':specs,'masterSHA256':hashlib.sha256((W/'machinery-master.blend').read_bytes()).hexdigest(),'bakeGeometrySHA256':hashlib.sha256((W/'machinery-source.glb').read_bytes()).hexdigest(),'explicitVertexColors':True,'vrReference':'https://vrcloud.com/?pv=1667308298','vrSupplements':{'asset':'vr-details.glb','sha256':hashlib.sha256((W/'machinery-vr-source.glb').read_bytes()).hexdigest(),'estimatedPlacement':True,'objects':len(supp),'triangles':sum(len(o.data.polygons)*2 for o in supp),'note':'Four transverse LED fixtures and an ochre floor grid, clipped to existing safe floor; original equipment positions preserved.'},'finishChanges':['Original pattern 35 mapped to physical checkerplate textures','Original pattern 34 mapped to acoustic finish','Ceiling enamel roughness .12 with .7 coat; photographic calibration, not measured','Seven area strips and two work beams; indirect diffuse rebaked consistently']});binding.pop('rawBakesSHA256',None);binding.pop('probes',None);(A/'authoring.json').write_text(json.dumps(binding,indent=2)+'\n');print('VR REFINEMENT COMPLETE',len(supp),'objects',binding['vrSupplements']['triangles'],'triangles',flush=True)
