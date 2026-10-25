"""Owned generator PBR and a derived mesh; retain the electrical front verbatim.

Only vertices shared between atlas and corner-lighting triangles are split.
Physical UV0, evaluated custom normals and old-front topology are preserved.
"""
import bpy,numpy as np,json,hashlib,subprocess,math,os
from pathlib import Path
R=Path(__file__).resolve().parents[1];W=Path(os.environ['ELECTRICAL_AUTHORING_WORK']);S=bpy.context.scene
a=json.loads((W/'authoring.json').read_text());review=json.loads((W/'neutral-review.json').read_text())
assert review['advanceToFinish'] and review['neutralGeometrySHA256']==a['neutralGeometrySHA256']
parts=list(bpy.data.collections['EDITABLE | VR generator'].objects);textures=W/'textures';textures.mkdir(exist_ok=True)
materials=[m for m in bpy.data.materials if m.get('ownedPBR')];families={m.name:json.loads(m['ownedPBR'])for m in materials}
script='''import json,numpy as np
from PIL import Image,ImageFilter
from pathlib import Path
O=Path(OUTPUT);families=json.loads(FAMILIES);rng=np.random.default_rng(1667308298);n=256
v=np.asarray(Image.fromarray(rng.integers(0,255,(n,n),dtype=np.uint8)).filter(ImageFilter.GaussianBlur(.8))).astype(float)/255-.5
for name,(rgb,rough,metal)in families.items():
 name=name.replace('GVR | ','').replace(' ','-')
 col=np.clip(np.array(rgb)[None,None,:]*(1+v[:,:,None]*.012),0,1)
 orm=np.stack([np.ones_like(v),np.clip(rough+v*.022,0,1),np.full_like(v,metal)],2)
 gx=np.gradient(v,axis=1)*.008;gy=np.gradient(v,axis=0)*.008;q=np.stack([-gx,-gy,np.ones_like(v)],2);q/=np.linalg.norm(q,axis=2,keepdims=True)
 for kind,pixels in [('color',col),('orm',orm),('normal',q*.5+.5)]:Image.fromarray((pixels*255).astype('uint8')).save(O/(name+'-'+kind+'.png'))
'''.replace('OUTPUT',repr(str(textures))).replace('FAMILIES',repr(json.dumps(families)))
subprocess.run(['python','-c',script],check=True)
for m in materials:
 name=m.name.replace('GVR | ','').replace(' ','-');nodes=m.node_tree.nodes;links=m.node_tree.links;p=nodes['Principled BSDF'];uv=nodes.new('ShaderNodeUVMap');uv.uv_map='UV0'
 for kind in ['color','orm','normal']:
  im=bpy.data.images.load(str(textures/(name+'-'+kind+'.png')),check_existing=True);im.colorspace_settings.name='sRGB'if kind=='color'else'Non-Color';t=nodes.new('ShaderNodeTexImage');t.image=im;links.new(uv.outputs[0],t.inputs['Vector'])
  if kind=='color':links.new(t.outputs['Color'],p.inputs['Base Color'])
  elif kind=='orm':
   sep=nodes.new('ShaderNodeSeparateColor');links.new(t.outputs['Color'],sep.inputs[0]);links.new(sep.outputs['Green'],p.inputs['Roughness']);links.new(sep.outputs['Blue'],p.inputs['Metallic'])
  else:
   normal=nodes.new('ShaderNodeNormalMap');normal.uv_map='UV0';normal.inputs['Strength'].default_value=.12;links.new(t.outputs['Color'],normal.inputs['Color']);links.new(normal.outputs[0],p.inputs['Normal'])

hero=S.objects['EVR installed | retained front'];bpy.ops.object.select_all(action='DESELECT');hero.select_set(True);bpy.context.view_layer.objects.active=hero
bpy.ops.export_scene.gltf(filepath=str(W/'retained-front-source.glb'),export_format='GLB',use_selection=True,export_extras=True,export_attributes=True,export_vertex_color='NONE')
deps=bpy.context.evaluated_depsgraph_get();copies=[]
for original in parts:
 print('DERIVE',original.name,flush=True)
 ev=original.evaluated_get(deps);d=ev.to_mesh(preserve_all_data_layers=True,depsgraph=deps);d.calc_loop_triangles();area=sum(p.area for p in d.polygons);wholeMicro=area<.03 or bool(original.get('forceVertexLighting'))
 positions=[];faces=[];uvs=[];normals=[];modes=[];mapping={};materialIndices=[];smooth=[]
 for tri in d.loop_triangles:
  coords=[d.vertices[i].co for i in tri.vertices];edges=[(coords[i]-coords[(i+1)%3]).length for i in range(3)];micro=wholeMicro or tri.area<1e-5 or 2*tri.area/max(max(edges),1e-12)<.003;face=[]
  for vi,li in zip(tri.vertices,tri.loops):
   key=(vi,micro)
   if key not in mapping:mapping[key]=len(positions);positions.append(d.vertices[vi].co[:]);modes.append(float(micro))
   face.append(mapping[key]);uvs.append(d.uv_layers['UV0'].data[li].uv[:]);normals.append(d.corner_normals[li].vector[:])
  faces.append(face);materialIndices.append(tri.material_index);smooth.append(d.polygons[tri.polygon_index].use_smooth)
 q=bpy.data.meshes.new('GVR derivative | '+original.name);q.from_pydata(positions,[],faces);q.update()
 for m in d.materials:q.materials.append(m.original)
 for p,mi,sm in zip(q.polygons,materialIndices,smooth):p.material_index=mi;p.use_smooth=sm
 q.normals_split_custom_set(normals);uv=q.uv_layers.new(name='UV0');uv.data.foreach_set('uv',np.array(uvs,dtype=np.float32).ravel());q.uv_layers.new(name='UV1');q.uv_layers['UV1'].data.foreach_set('uv',np.zeros(len(q.loops)*2,dtype=np.float32))
 for name,values in [('_BAKE_MODE',modes),('_GENERATOR_ID',np.full(len(positions),2)),('_CLEARANCE_ID',np.ones(len(positions)))]:
  attr=q.attributes.new(name,type='FLOAT',domain='POINT');attr.data.foreach_set('value',np.array(values,dtype=np.float32))
 q.attributes.new('_IRRADIANCE',type='FLOAT_VECTOR',domain='CORNER');o=bpy.data.objects.new('GVR evaluated | '+original.name,q);S.collection.objects.link(o);o.matrix_world=original.matrix_world.copy();copies.append(o);ev.to_mesh_clear()
print('MERGE DERIVATIVES',flush=True)
# Avoid Blender's join path merging heterogeneous custom corner-data layouts.
# Copy the defined physical attributes explicitly, including evaluated normals.
positions=[];faces=[];normals=[];uvs=[];mis=[];smooth=[];modeValues=[];groupValues=[];clearValues=[];materials=[]
for o in [hero]+copies:
 d=o.data;d.calc_loop_triangles();offset=len(positions);positions.extend([(o.matrix_world@v.co)[:]for v in d.vertices]);normalMatrix=o.matrix_world.to_3x3().inverted().transposed()
 matIndices=[]
 for m in d.materials:
  if m not in materials:materials.append(m)
  matIndices.append(materials.index(m))
 for tri in d.loop_triangles:
  faces.append([i+offset for i in tri.vertices]);mis.append(matIndices[tri.material_index]);smooth.append(d.polygons[tri.polygon_index].use_smooth)
  for li in tri.loops:normals.append((normalMatrix@d.corner_normals[li].vector).normalized()[:]);uvs.append(d.uv_layers['UV0'].data[li].uv[:])
 for name,target in [('_BAKE_MODE',modeValues),('_GENERATOR_ID',groupValues),('_CLEARANCE_ID',clearValues)]:target.extend([x.value for x in d.attributes[name].data])
d=bpy.data.meshes.new('Generator and retained electrical derivative');d.from_pydata(positions,[],faces);d.update()
for m in materials:d.materials.append(m)
for f,mi,sm in zip(d.polygons,mis,smooth):f.material_index=mi;f.use_smooth=sm
d.normals_split_custom_set(normals);uv=d.uv_layers.new(name='UV0');uv.data.foreach_set('uv',np.array(uvs,dtype=np.float32).ravel());d.uv_layers.new(name='UV1')
for name,values in [('_BAKE_MODE',modeValues),('_GENERATOR_ID',groupValues),('_CLEARANCE_ID',clearValues)]:d.attributes.new(name,type='FLOAT',domain='POINT').data.foreach_set('value',np.array(values,dtype=np.float32))
d.attributes.new('_IRRADIANCE',type='FLOAT_VECTOR',domain='CORNER')
bpy.ops.object.select_all(action='DESELECT');bpy.context.view_layer.objects.active=None
for o in [hero]+copies:
 o.name='ARCHIVE derivative | '+o.name;o.hide_render=True;o.hide_viewport=True
hero=bpy.data.objects.new('EVR installed | static',d);S.collection.objects.link(hero);d.calc_loop_triangles()
print('MERGE COMPLETE',len(d.polygons),flush=True)
for layer in list(d.uv_layers):
 if layer.name not in ['UV0','UV1']:d.uv_layers.remove(layer)
d.uv_layers['UV1'].data.foreach_set('uv',np.zeros(len(d.loops)*2,dtype=np.float32))
positions=np.array([v.co[:]for v in d.vertices],dtype=np.float32);indices=np.array([t.vertices[:]for t in d.loop_triangles],dtype=np.uint32);mode=np.array([p.value for p in d.attributes['_BAKE_MODE'].data]);atlas=mode[indices].max(1)<.5
np.savez_compressed(W/'uv-input.npz',positions=positions,indices=indices[atlas]);subprocess.run(['python',str(R/'tools/pack-electrical-uv.py'),str(W/'uv-input.npz'),str(W/'uv-packed.npz')],check=True)
packed=np.load(W/'uv-packed.npz')['corner_uvs'];uv=d.uv_layers['UV1']
for tri,coords in zip([t for t,k in zip(d.loop_triangles,atlas)if k],packed):
 for li,co in zip(tri.loops,coords):uv.data[li].uv=co
tri=np.array([[uv.data[li].uv[:]for li in t.loops]for t in d.loop_triangles],dtype='<f4');x=tri[:,1]-tri[:,0];y=tri[:,2]-tri[:,0];areas=np.abs(x[:,0]*y[:,1]-x[:,1]*y[:,0])/2
a['uv']={'packing':json.loads((W/'uv-packed.npz.json').read_text()),'coverage':float(areas[atlas].sum()),'minimumGutterPixels':4,'degenerateTriangleFraction':float((areas[atlas]<1e-12).mean()),'uvTrianglesSHA256':hashlib.sha256(tri.tobytes()).hexdigest(),'atlasTriangles':int(atlas.sum()),'vertexIrradianceTriangles':int((~atlas).sum()),'microLighting':'Cycles diffuse direct+indirect without albedo at actual corners; split atlas/micro boundaries preserve evaluated normals.'}
a['staticTriangles']=len(d.loop_triangles);a['dynamicTriangles']=44;a['triangles']=a['staticTriangles']+44;a['generatorTriangles']=a['staticTriangles']-a['retainedFrontTriangles'];a['neutralMilestone']=review
assert a['uv']['coverage']>=.4 and a['uv']['degenerateTriangleFraction']<.0001 and a['triangles']<=a['triangleBudget'],a
print('PACKED UV',a['triangles'],flush=True)
for o in parts:o.hide_render=True;o.hide_viewport=True
hero['lightmap']='electrical';hero['variant']='generator-vr-r01';hero['sourceIDs']=json.dumps([o['componentID']for o in parts]);d.uv_layers.active_index=d.uv_layers.find('UV0');d.uv_layers['UV0'].active_render=True
a['sourceTextures']={p.name:hashlib.sha256(p.read_bytes()).hexdigest()for p in textures.glob('*.png')};a['stage']='generator material candidate; strict VR acceptance remains documented separately'
S.view_settings.view_transform='Khronos PBR Neutral';S.view_settings.look='None';S.view_settings.exposure=math.log2(.05)
print('DISPLAY SET',flush=True)
for im in bpy.data.images:
 if im.source=='FILE'and im.has_data and not im.packed_file:
  print('PACK IMAGE',im.name,flush=True);im.pack()
print('SAVE MASTER',flush=True)
bpy.context.view_layer.update();print('UPDATED',flush=True)
bpy.ops.wm.save_as_mainfile(filepath=str(W/'electrical-master.blend'),compress=True);a['masterSHA256']=hashlib.sha256((W/'electrical-master.blend').read_bytes()).hexdigest();(W/'authoring.json').write_text(json.dumps(a,ensure_ascii=False,indent=2)+'\n')
print('GENERATOR FINISHED',a['triangles'],'triangles, new',a['generatorTriangles'],'UV',a['uv']['coverage'],flush=True)
