"""Apply the runtime boundary to a new editable master; never save over R01."""
import bpy,json,os,numpy as np,hashlib
from pathlib import Path
W=Path(os.environ.get('PEDESTAL_WORK','/tmp/ldm-pedestal-r01'))
parts=json.loads((W/'source-parts.json').read_text());patch=json.loads((W/'pedestal-patch.json').read_text())
hero=bpy.data.objects['EVR installed | static'];d=hero.data
points=[np.array(p['positions'])for p in parts];vertices=np.array([(hero.matrix_world@v.co)[:]for v in d.vertices]);removed=[]
for f in d.polygons:
 q=vertices[list(f.vertices)]
 if not(np.all(np.abs(q[:,0])<.89)and np.all((q[:,1]>9.79)&(q[:,1]<10.49))and np.all((q[:,2]>-.42)&(q[:,2]<-.23))):continue
 if any(np.max(np.min(np.linalg.norm(q[:,None,:]-p[None,:,:],axis=2),axis=1))<2e-6 for p in points):removed.append(f.index)
assert len(removed)==176,len(removed)
remove=set(removed);keep=[f for f in d.polygons if f.index not in remove];loops=[i for f in keep for i in f.loop_indices]
mesh=bpy.data.meshes.new('Electrical derivative with pedestal source removed');mesh.from_pydata([v.co[:]for v in d.vertices],[],[list(f.vertices)for f in keep]);mesh.update()
for m in d.materials:mesh.materials.append(m)
for f,old in zip(mesh.polygons,keep):f.material_index=old.material_index;f.use_smooth=old.use_smooth
for layer in d.uv_layers:
 uv=mesh.uv_layers.new(name=layer.name);uv.data.foreach_set('uv',np.array([layer.data[i].uv[:]for i in loops],dtype=np.float32).ravel())
for attr in d.attributes:
 if not attr.name.startswith('_'):continue
 out=mesh.attributes.new(attr.name,attr.data_type,attr.domain);indices=range(len(d.vertices))if attr.domain=='POINT'else loops
 field='vector'if attr.data_type=='FLOAT_VECTOR'else'value';values=np.array([getattr(attr.data[i],field)for i in indices],dtype=np.float32);out.data.foreach_set(field,values.ravel())
mesh.normals_split_custom_set([d.corner_normals[i].vector[:]for i in loops]);hero.data=mesh
a=patch['attributes'];pos=np.array(a['POSITION']).reshape(-1,3);blender=pos[:,[0,2,1]]*np.array([1,-1,1]);normal=np.array(a['NORMAL']).reshape(-1,3)[:,[0,2,1]]*np.array([1,-1,1])
q=bpy.data.meshes.new('Pedestal closed boundary with production UVs');q.from_pydata(blender,[],np.arange(len(pos)).reshape(-1,3));q.update();q.materials.append(bpy.data.materials['EVR | paint'])
for f in q.polygons:f.use_smooth=True
q.normals_split_custom_set(normal)
for semantic,name in [('TEXCOORD_0','UV0'),('TEXCOORD_1','UV1')]:
 uv=np.array(a[semantic]).reshape(-1,2);uv[:,1]=1-uv[:,1];q.uv_layers.new(name=name).data.foreach_set('uv',uv.astype(np.float32).ravel())
for name in ['_BAKE_MODE','_GENERATOR_ID','_CLEARANCE_ID']:q.attributes.new(name,'FLOAT','POINT').data.foreach_set('value',a[name])
q.attributes.new('_IRRADIANCE','FLOAT_VECTOR','CORNER').data.foreach_set('vector',a['_IRRADIANCE'])
o=bpy.data.objects.new('EVR installed | pedestal boundary union',q);bpy.context.scene.collection.objects.link(o);o['componentID']='EVR/vented-pedestal-union';o['lightmap']='electrical';o['repair']='pedestal-r01';o['replaces']=json.dumps(patch['sourceParts'])
for name in patch['sourceParts']:
 old=bpy.data.objects[name];old.hide_render=True;old.hide_viewport=True;old.name='ARCHIVE pedestal-r01 | '+name
editable=o.copy();editable.data=q.copy();editable.name='EVR editable | pedestal boundary union';bpy.data.collections['EDITABLE | VR electrical'].objects.link(editable);editable.hide_render=True;editable.hide_viewport=True
bpy.context.scene['pedestalRepair']='Closed boundary union, original exterior material/UV transport retained; original master preserved in luz-generator-vr-r01'
bpy.ops.wm.save_as_mainfile(filepath=str(W/'electrical-master.blend'),compress=True)
proof={'removedAuthoredTriangles':len(removed),'unionTriangles':len(q.polygons),'masterSHA256':hashlib.sha256((W/'electrical-master.blend').read_bytes()).hexdigest(),'previousMasterUnmodified':True,'productionPatchSHA256':hashlib.sha256((W/'pedestal-patch.json').read_bytes()).hexdigest()}
(W/'authoring-proof.json').write_text(json.dumps(proof,indent=2)+'\n');print('AUTHORING',proof,flush=True)
