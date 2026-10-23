"""Import evaluated original geometry; keep all parts editable, with UV0/UV1.
The original engine/filter meshes are shared native geometry, never stretched.
"""
import bpy,numpy as np,json,hashlib,math,runpy,time,struct,gzip
from pathlib import Path
from mathutils import Vector,Matrix
R=Path(__file__).resolve().parents[1];W=R/'work/machinery-r11';A=R/'public/assets/machinery';A.mkdir(parents=True,exist_ok=True)
meta=json.loads((W/'snapshot/machinery.json').read_text());blob=(W/'snapshot/machinery.bin').read_bytes();assert hashlib.sha256(blob).hexdigest()==meta['sha256']
raw=np.frombuffer(blob,dtype='<f4',count=meta['vertices']*11).reshape(-1,11);ix=np.frombuffer(blob,dtype='<u4',offset=meta['vertexBytes'],count=meta['triangles']*3).reshape(-1,3);parts=np.frombuffer(blob,dtype='<u4',offset=meta['vertexBytes']+meta['indexBytes']);T=json.loads((R/'work/textures/materials.json').read_text());bpy.ops.wm.read_factory_settings(use_empty=True);S=bpy.context.scene;S.name='Luz de Mar | Machinery r11';S.unit_settings.system='METRIC';S['sourceGeometrySHA256']=meta['sha256'];S['source']='Published Luz de Mar geometry and its evaluated equipment';S['accuracy']='Source installation preserved; inferred dimensions retain their original status'
S.render.engine='CYCLES';S.cycles.device='CPU';S.cycles.samples=48;S.cycles.use_denoising=False;S.cycles.max_bounces=5;S.cycles.diffuse_bounces=3;S.render.threads_mode='FIXED';S.render.threads=4;S.world=bpy.data.worlds.new('Neutral enclosed room');S.world.use_nodes=True;S.world.node_tree.nodes['Background'].inputs[0].default_value=(.88,.92,1,1);S.world.node_tree.nodes['Background'].inputs[1].default_value=.015
editable=bpy.data.collections.new('EDITABLE | machinery');S.collection.children.link(editable);material_cache={};images={};render_meshes=[];components=[]
def family(r):
 p=r['pattern'];return 'checker'if p in[23,35] else'acoustic'if p in[24,34] else'insulation'if p==30 else r['family']
def image(file,kind):
 key=file,kind
 if key not in images:
  im=bpy.data.images.load(str(R/'work/textures'/file),check_existing=True);im.colorspace_settings.name='sRGB'if kind=='color'else'Non-Color';images[key]=im
 return images[key]
def material(ri,atlas):
 key=ri,atlas
 if key in material_cache:return material_cache[key]
 r=meta['recipes'][ri];fam=family(r);m=bpy.data.materials.new(f'Machinery {fam} {ri} | {atlas}');m.use_nodes=True;m.diffuse_color=(*r['color'],1);m['family']=fam;m['lightmap']=atlas;m['roughnessFactor']=r['rough'];m['metallicFactor']=r['metal'];m['baseColorFactor']=[1,1,1];m['visibleEmitter']=bool(r['emission']);n=m.node_tree.nodes;l=m.node_tree.links;p=n['Principled BSDF'];p.inputs['Roughness'].default_value=r['rough'];p.inputs['Metallic'].default_value=r['metal'];p.inputs['Coat Weight'].default_value=.18 if fam=='paint'else .03;p.inputs['Coat Roughness'].default_value=.2
 col=n.new('ShaderNodeVertexColor');col.layer_name='Color'
 if fam!='glass':
  uv=n.new('ShaderNodeUVMap');uv.uv_map='UV0';maps={}
  for k in ['color','normal','roughness']:
   t=n.new('ShaderNodeTexImage');t.image=image(T[fam][k],k);l.new(uv.outputs[0],t.inputs['Vector']);maps[k]=t
  mul=n.new('ShaderNodeMixRGB');mul.blend_type='MULTIPLY';mul.inputs[0].default_value=1;l.new(col.outputs[0],mul.inputs[1]);l.new(maps['color'].outputs[0],mul.inputs[2]);l.new(mul.outputs[0],p.inputs['Base Color'])
  rough=n.new('ShaderNodeMath');rough.operation='MULTIPLY';rough.inputs[1].default_value=r['rough'];l.new(maps['roughness'].outputs[0],rough.inputs[0]);l.new(rough.outputs[0],p.inputs['Roughness']);normal=n.new('ShaderNodeNormalMap');normal.uv_map='UV0';normal.inputs['Strength'].default_value=.10 if fam in['paint','metal']else .35;l.new(maps['normal'].outputs[0],normal.inputs['Color']);l.new(normal.outputs[0],p.inputs['Normal'])
 else:l.new(col.outputs[0],p.inputs['Base Color']);p.inputs['Alpha'].default_value=.18;m.surface_render_method='DITHERED'
 if r['emission']:
  p.inputs['Emission Color'].default_value=(*r['color'],1);path=n.new('ShaderNodeLightPath');maximum=n.new('ShaderNodeMath');maximum.operation='MAXIMUM';l.new(path.outputs['Is Camera Ray'],maximum.inputs[0]);l.new(path.outputs['Is Glossy Ray'],maximum.inputs[1]);strength=n.new('ShaderNodeMath');strength.operation='MULTIPLY';strength.inputs[1].default_value=3;l.new(maximum.outputs[0],strength.inputs[0]);l.new(strength.outputs[0],p.inputs['Emission Strength'])
 if atlas!='none':
  target=n.new('ShaderNodeTexImage');target.name='BAKE | linear ambient only';n.active=target
 material_cache[key]=m;return m
def build(name,faceids,atlas,collection=None):
 ids=ix[faceids];unique,inv=np.unique(ids,return_inverse=True);v=raw[unique,:3][:,[0,2,1]].copy();v[:,1]*=-1;norm=raw[unique,3:6][:,[0,2,1]].copy();norm[:,1]*=-1;d=bpy.data.meshes.new(name);d.from_pydata(v.tolist(),[],inv.reshape(-1,3).tolist());d.update();o=bpy.data.objects.new(name,d);(collection or S.collection).objects.link(o);o['lightmap']=atlas;o['sourceIDs']=json.dumps(sorted(set(meta['parts'][int(parts[f])]['id']for f in faceids)));color=d.color_attributes.new(name='Color',type='FLOAT_COLOR',domain='POINT');color.data.foreach_set('color',np.c_[raw[unique,6:9],np.ones(len(unique))].ravel());uv=d.uv_layers.new(name='UV0');d.uv_layers.new(name='UV1');slots={}
 for f,sf in zip(d.polygons,faceids):
  ri=meta['parts'][int(parts[sf])]['recipe'];m=material(ri,atlas)
  if ri not in slots:slots[ri]=len(d.materials);d.materials.append(m)
  f.material_index=slots[ri];f.use_smooth=True;fam=m['family'];tile=T.get(fam,{}).get('tileMetres',1);axis=int(np.argmax(np.abs(norm[list(f.vertices)].mean(0))));axes=(0,1)if axis==2 else(0,2)if axis==1 else(1,2)
  for li in f.loop_indices:p=v[d.loops[li].vertex_index];uv.data[li].uv=(p[axes[0]]/tile,p[axes[1]]/tile)
 d.normals_split_custom_set_from_vertices(norm.tolist());d.uv_layers['UV0'].active_render=True;return o
for i,p in enumerate(meta['parts']):
 faces=np.flatnonzero(parts==i)
 if not len(faces):continue
 o=build(p['feature'][:45]+' | '+str(i),faces,p['atlas'],editable);o['componentID']=p['id'];o['sourceFeature']=p['feature'];o['dynamic']=p['dynamic']or'';positions=raw[np.unique(ix[faces]),:3];component={**p,'sourceIndex':i,'triangles':len(faces),'webBounds':[positions.min(0).tolist(),positions.max(0).tolist()]};components.append(component)
# Editable parts are never duplicate occluders of the merged render meshes.
editable.hide_render=True;editable.hide_viewport=True
pack=runpy.run_path(str(R/'tools/lightmap-uv.py'))['prepare_uv'];padding={}
for atlas in['architecture','furniture','none','register','door']:
 faces=np.array([i for i,p in enumerate(parts)if(meta['parts'][int(p)]['dynamic']==atlas if atlas in['register','door']else meta['parts'][int(p)]['atlas']==atlas and not meta['parts'][int(p)]['dynamic'])],dtype=int)
 if not len(faces):continue
 o=build('LD_R02 | '+atlas,faces,atlas if atlas not in['register','door']else'none');o['dynamic']=atlas if atlas in['register','door']else'';render_meshes.append(o)
 if atlas in['architecture','furniture']:padding[atlas]=pack(o,'machinery-'+atlas,R)
def webpoint(p):return Vector((p[0],-p[2],p[1]))
def sourcepoint(p):return webpoint([p[1]*7.47/7.6,p[2]-2.01,p[0]*35.23/36-17.615])
light_specs={'rectangles':[{'position':[-1.868,1.746,-7.878],'width':.028,'height':5.50,'intensity':28},{'position':[0,1.746,-7.878],'width':.028,'height':5.50,'intensity':28},{'position':[1.868,1.746,-6.782],'width':.028,'height':3.308,'intensity':28}],'spots':[{'sourcePosition':[8.1,0,3.72],'sourceTarget':[8.1,0,1.35],'intensity':7},{'sourcePosition':[11.75,0,3.72],'sourceTarget':[11.75,0,1.2],'intensity':7}],'color':[.94,.97,1],'exposure':1.15,'bake':'Indirect diffuse only; live work lights supply direct illumination'}
for i,s in enumerate(light_specs['rectangles']):
 d=bpy.data.lights.new('Fixed LED strip '+str(i),'AREA');d.shape='RECTANGLE';d.size=s['width'];d.size_y=s['height'];d.energy=math.pi*s['width']*s['height']*s['intensity'];d.color=light_specs['color'];o=bpy.data.objects.new(d.name,d);S.collection.objects.link(o);o.location=webpoint(s['position']);o.rotation_euler=(0,0,0);o.visible_glossy=False
for i,s in enumerate(light_specs['spots']):
 d=bpy.data.lights.new('Broad work beam '+str(i),'SPOT');d.energy=4*math.pi*s['intensity'];d.spot_size=1.9;d.spot_blend=.85;d.shadow_soft_size=.15;d.color=light_specs['color'];o=bpy.data.objects.new(d.name,d);S.collection.objects.link(o);o.location=sourcepoint(s['sourcePosition']);o.rotation_euler=(sourcepoint(s['sourceTarget'])-o.location).to_track_quat('-Z','Y').to_euler();o.visible_glossy=False
# Native exteriors share one mesh per asset and match the original placements.
installation=json.loads((W/'snapshot/snapshot.json').read_text())
for folder,kind in[('mtu-r03','mtu'),('sea-strainers','filters')]:
 data=json.loads((W/'snapshot/mechanics'/folder/'exterior.json').read_text());b=gzip.decompress((W/'snapshot/mechanics'/folder/'exterior.bin.gz').read_bytes());arrays={k:np.frombuffer(b,dtype='<u4'if v['type']=='u32'else'<f4',offset=v['offset'],count=v['count'])for k,v in data['views'].items()};d=bpy.data.meshes.new(folder+' shared native');positions=arrays['position'].reshape(-1,3);d.from_pydata(positions.tolist(),[],arrays['indices'].reshape(-1,3).tolist());d.update();color=d.color_attributes.new(name='Color',type='FLOAT_COLOR',domain='POINT');color.data.foreach_set('color',np.c_[arrays['color'].reshape(-1,3),np.ones(len(positions))].ravel());m=bpy.data.materials.new(folder+' native white enamel and metal');m.use_nodes=True;n=m.node_tree.nodes;l=m.node_tree.links;p=n['Principled BSDF'];c=n.new('ShaderNodeVertexColor');c.layer_name='Color';l.new(c.outputs[0],p.inputs['Base Color']);rough=d.attributes.new(name='Native roughness',type='FLOAT',domain='POINT');rough.data.foreach_set('value',arrays['surface'][::2]);metal=d.attributes.new(name='Native metalness',type='FLOAT',domain='POINT');metal.data.foreach_set('value',arrays['surface'][1::2]);
 for name,slot in[('Native roughness','Roughness'),('Native metalness','Metallic')]:v=n.new('ShaderNodeAttribute');v.attribute_name=name;l.new(v.outputs['Fac'],p.inputs[slot])
 p.inputs['Coat Weight'].default_value=.13;d.materials.append(m)
 for f in d.polygons:f.use_smooth=True
 d.normals_split_custom_set_from_vertices(arrays['normal'].reshape(-1,3).tolist());pos=installation[kind]
 for side,sign in[('Babor',1),('Estribor',-1)]:
  o=bpy.data.objects.new(folder+' | '+side,d);S.collection.objects.link(o);o['dynamic']='mechanical-exterior';o['excludeFromDiffuseBake']=True;o.matrix_world=Matrix(((0,1,0,sign*pos['y']*7.47/7.6),(-1,0,0,-(pos['x']*35.23/36-17.615)),(0,0,1,pos['z']-2.01),(0,0,0,1)))
bpy.ops.object.select_all(action='DESELECT')
for o in render_meshes:o.select_set(True)
bpy.context.view_layer.objects.active=render_meshes[0];bpy.ops.export_scene.gltf(filepath=str(W/'machinery-source.glb'),export_format='GLB',use_selection=True,export_extras=True,export_normals=True,export_texcoords=True,export_vertex_color='ACTIVE',export_all_vertex_colors=False)
camera=bpy.data.cameras.new('Machinery inspection camera');cam=bpy.data.objects.new(camera.name,camera);S.collection.objects.link(cam);cam.location=sourcepoint(meta['room']['spawn']);cam.rotation_euler=(sourcepoint(meta['room']['look'])-cam.location).to_track_quat('-Z','Y').to_euler();camera.type='PERSP';camera.sensor_fit='VERTICAL';camera.angle=math.radians(72);S.camera=cam;S.view_settings.view_transform='AgX';S.view_settings.exposure=math.log2(light_specs['exposure']);S.render.resolution_x=1200;S.render.resolution_y=800;S.render.resolution_percentage=100
for im in bpy.data.images:
 if im.source=='FILE'and im.has_data:im.pack()
native=W/'machinery-master.blend';bpy.ops.wm.save_as_mainfile(filepath=str(native),compress=True);report={'revision':11,'sourceGeometrySHA256':meta['sha256'],'sourceTriangles':meta['triangles'],'editableParts':len(components),'bakeGeometrySHA256':hashlib.sha256((W/'machinery-source.glb').read_bytes()).hexdigest(),'atlases':['architecture','furniture'],'atlasPadding':padding,'lights':light_specs,'masterSHA256':hashlib.sha256(native.read_bytes()).hexdigest(),'dynamicOccludersExcluded':True,'sourceInstallation':{'mtu':installation['mtu'],'filters':installation['filters']},'accuracy':'Original digital installation preserved; original inferred dimensions remain estimates'};(A/'authoring.json').write_text(json.dumps(report,indent=2)+'\n');(A/'reference-components.json').write_text(json.dumps(components,indent=2)+'\n');(W/'lighting.json').write_text(json.dumps(light_specs,indent=2));print('MACHINERY BUILT',len(components),meta['triangles'],flush=True)
