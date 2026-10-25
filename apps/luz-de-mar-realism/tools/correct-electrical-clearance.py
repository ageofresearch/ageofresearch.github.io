"""R03 authoring: replace stair skins without editing the R02 electrical parts."""
import bpy,bmesh,numpy as np,json,hashlib,os,subprocess,ast
from pathlib import Path
from mathutils import Vector
R=Path(__file__).resolve().parents[1];W=Path(os.environ.get('ELECTRICAL_AUTHORING_WORK',R/'work/electrical-clearance-r03'));S=bpy.context.scene
def preserved_inventory(objects):
 # The R03 correction must retain R02's source rectangles, paths and bounds,
 # rather than replacing the earlier evidence with a reduced ID-only list.
 previous=json.loads((W/'input-inventory.json').read_text());byid={p['id']:p for p in previous};specs={p['id']:p for p in json.loads((W/'casings.json').read_text())['casings']};rows=[];inherited=0
 for o in objects:
  identity=o.get('componentID')
  if identity in byid:rows.append(byid[identity]);inherited+=1;continue
  vertices=np.array([o.matrix_world@v.co for v in o.data.vertices]);source=np.stack([(-vertices[:,1]+17.615)/(35.23/36),vertices[:,0]/(7.47/7.6),vertices[:,2]+2.01],1);spec=specs[identity]
  rows.append({'id':identity,'assembly':o.get('assembly'),'classification':o.get('classification'),'boundsSource':[*source.min(0).tolist(),*source.max(0).tolist()],'referenceRect':None,'referencePath':None,'sourceID':spec['sourceID'],'materials':[m.name for m in o.data.materials],'connects':spec.get('connects',[]),'evidence':'Frozen VR visibility masks and existing digital yacht structure; hidden construction and mounting spacers inferred.'})
 assert inherited==len(previous),'An inherited R02 inventory entry was lost'
 return rows
a=json.loads((W/'input-authoring.json').read_text());c=json.loads((W/'casings.json').read_text());C=bpy.data.collections['EDITABLE | VR electrical'];parts=list(C.objects)
def physical_digest(objects):
 h=hashlib.sha256()
 for o in sorted(objects,key=lambda x:x.name):
  if o.type!='MESH':continue
  h.update(o.name.encode());h.update(np.array([v.co[:]for v in o.data.vertices],dtype='<f4').tobytes());h.update(np.array(o.matrix_world,dtype='<f4').tobytes());h.update(np.array([i for p in o.data.polygons for i in p.vertices],dtype='<i4').tobytes())
 return h.hexdigest()
before=physical_digest(parts)
meta=json.loads((R/'work/machinery-r11/snapshot/machinery.json').read_text());blob=(R/'work/machinery-r11/snapshot/machinery.bin').read_bytes();raw=np.frombuffer(blob,dtype='<f4',count=meta['vertices']*11).reshape(-1,11);vv=raw[:,:3];ii=np.frombuffer(blob,dtype='<u4',offset=meta['vertexBytes'],count=meta['triangles']*3).reshape(-1,3);ids=np.frombuffer(blob,dtype='<u4',offset=meta['vertexBytes']+meta['indexBytes'],count=meta['triangles'])
def key(points):return tuple(sorted(tuple(round(float(x),5)for x in p)for p in points))
drop={key(vv[t])for t,p in zip(ii,ids)if meta['parts'][p]['id']in c['replacedIDs']};step_index=next(i for i,p in enumerate(meta['parts'])if p['id']=='LD/service-route/92');step_keys={key(vv[t])for t,p in zip(ii,ids)if p==step_index};step_uv=[];step_xy=[]
for n in ast.parse((R/'tools/build-left-engine.py').read_text()).body:
 if isinstance(n,ast.FunctionDef)and n.name in ['filtered','closed_solid']:exec(compile(ast.Module(body=[n],type_ignores=[]),str(R/'tools/build-left-engine.py'),'exec'),globals())
removed=0
for o in list(S.objects):
 if o.type!='MESH'or o.hide_render or not o.name.startswith(('KEEP |','LD_R02 |','BVR context |','EVR context |')):continue
 for f in o.data.polygons:
  if f.normal.z>.99 and key([(o.data.vertices[i].co.x,o.data.vertices[i].co.z,-o.data.vertices[i].co.y)for i in f.vertices])in step_keys:
   for li in f.loop_indices:
    p=o.data.vertices[o.data.loops[li].vertex_index].co;step_xy.append([p.x,p.y,1]);step_uv.append(o.data.uv_layers['UV0'].data[li].uv[:])
 keep=[f.index for f in o.data.polygons if key([(o.data.vertices[i].co.x,o.data.vertices[i].co.z,-o.data.vertices[i].co.y)for i in f.vertices])not in drop]
 if len(keep)!=len(o.data.polygons):
  q=filtered(o,keep,'R03 context | '+o.name);q['variant']='context';removed+=len(o.data.polygons)-len(keep);o.hide_render=True;o.hide_viewport=True
assert removed==len(drop),(removed,len(drop));assert len(step_xy)>=3
uv_coeff=np.linalg.lstsq(np.array(step_xy),np.array(step_uv),rcond=None)[0];assert np.abs(np.array(step_xy)@uv_coeff-np.array(step_uv)).max()<1e-5
new=[];paint=bpy.data.materials['EVR | paint'];materials={'paint':paint,'metal':bpy.data.materials['EVR | metal']}
# The original procedural wood is packed in the frozen authoring scene. Bake
# its constant source vertex tint into a small owned PBR map, retaining UV0's
# physical scale and keeping the extra runtime texture memory below4MiB.
textures=W/'textures';textures.mkdir(exist_ok=True)
for kind in ['color','normal','roughness']:
 im=bpy.data.images.get('wood-'+kind+'.png');assert im and im.packed_file,kind;(textures/('source-wood-'+kind+'.png')).write_bytes(im.packed_file.data)
step_vertices=np.unique(ii[ids==step_index]);tint=raw[step_vertices,6:9].mean(0).tolist();rough=meta['recipes'][12]['rough']
script='''from pathlib import Path
import numpy as np
from PIL import Image
O=Path(OUTPUT);tint=np.array(TINT);size=(256,256)
c=np.asarray(Image.open(O/'source-wood-color.png').convert('RGB').resize(size,Image.Resampling.LANCZOS))/255
c=np.where(c<=.04045,c/12.92,((c+.055)/1.055)**2.4)*tint
c=np.where(c<=.0031308,c*12.92,1.055*np.maximum(c,0)**(1/2.4)-.055)
Image.fromarray(np.uint8(np.clip(c,0,1)*255)).save(O/'service-wood-color.png')
n=np.asarray(Image.open(O/'source-wood-normal.png').convert('RGB').resize(size,Image.Resampling.LANCZOS))/255*2-1;n/=np.maximum(np.linalg.norm(n,axis=2,keepdims=True),1e-8)
Image.fromarray(np.uint8(np.clip(n*.5+.5,0,1)*255)).save(O/'service-wood-normal.png')
r=np.asarray(Image.open(O/'source-wood-roughness.png').convert('L').resize(size,Image.Resampling.LANCZOS))/255*ROUGH
orm=np.stack([np.ones_like(r),r,np.zeros_like(r)],2);Image.fromarray(np.uint8(orm*255)).save(O/'service-wood-orm.png')
'''.replace('OUTPUT',repr(str(textures))).replace('TINT',repr(tint)).replace('ROUGH',repr(rough))
subprocess.run(['python','-c',script],check=True)
wood=bpy.data.materials.new('EVR | service-wood');wood.use_nodes=True;wood['family']='electrical-service-wood';wood['electricalMaterial']=True;wood['lightmap']='electrical';n=wood.node_tree.nodes;l=wood.node_tree.links;p=n['Principled BSDF'];p.inputs['Coat Weight'].default_value=.03;p.inputs['Coat Roughness'].default_value=.2;uvn=n.new('ShaderNodeUVMap');uvn.uv_map='UV0'
for kind in ['color','orm','normal']:
 im=bpy.data.images.load(str(textures/('service-wood-'+kind+'.png')),check_existing=True);im.colorspace_settings.name='sRGB'if kind=='color'else'Non-Color';t=n.new('ShaderNodeTexImage');t.image=im;l.new(uvn.outputs[0],t.inputs['Vector'])
 if kind=='color':l.new(t.outputs['Color'],p.inputs['Base Color'])
 elif kind=='orm':
  sep=n.new('ShaderNodeSeparateColor');l.new(t.outputs['Color'],sep.inputs[0]);l.new(sep.outputs['Green'],p.inputs['Roughness']);l.new(sep.outputs['Blue'],p.inputs['Metallic'])
 else:
  normal=n.new('ShaderNodeNormalMap');normal.uv_map='UV0';normal.inputs['Strength'].default_value=.4;l.new(t.outputs['Color'],normal.inputs[0]);l.new(normal.outputs[0],p.inputs['Normal'])
materials['service-wood']=wood
for spec in c['casings']:
 d=bpy.data.meshes.new(spec['id']);d.from_pydata([(x,-z,y)for x,y,z in spec['vertices']],[],spec['faces']);d.update();used=list(dict.fromkeys(spec.get('faceMaterials',[spec.get('material','paint')]*len(d.polygons))))
 for name in used:d.materials.append(materials[name])
 for f,name in zip(d.polygons,spec.get('faceMaterials',[spec.get('material','paint')]*len(d.polygons))):f.material_index=used.index(name)
 o=bpy.data.objects.new(spec['id'],d);C.objects.link(o)
 if spec.get('material')=='metal':
  bm=bmesh.new();bm.from_mesh(d);bmesh.ops.remove_doubles(bm,verts=list(bm.verts),dist=5e-6);bmesh.ops.dissolve_degenerate(bm,edges=list(bm.edges),dist=1e-8);boundary=[e for e in bm.edges if e.is_boundary]
  if boundary:bmesh.ops.holes_fill(bm,edges=boundary,sides=0)
  print('ACCESS METAL CLOSURE',spec['id'],len(boundary),sum(not e.is_manifold for e in bm.edges),flush=True);bm.to_mesh(d);bm.free();d.update()
 closed_solid(o);o['componentID']=spec['id'];o['assembly']='service-enclosure'if spec['sourceID']in ['LD/service-route/123','LD/service-route/124']else'service-access';o['classification']=spec.get('classification','digital access adjustment; observed exposed electrical front, hidden depth inferred');o['lightmap']='electrical'
 uv=d.uv_layers.new(name='UV0')
 for f in d.polygons:
  axes=np.argsort(np.abs(f.normal))[:2]
  for li in f.loop_indices:
   p=d.vertices[d.loops[li].vertex_index].co;uv.data[li].uv=tuple(np.array([p.x,p.y,1])@uv_coeff)if spec['id']=='CLEARANCE/step-8'and abs(f.normal.z)>.99 else(p[int(axes[0])]/.18,p[int(axes[1])]/.18)
 d.uv_layers.new(name='UV1');mode=d.attributes.new(name='_BAKE_MODE',type='FLOAT',domain='POINT');mode.data.foreach_set('value',np.full(len(d.vertices),1 if spec.get('material')=='metal'else 0,dtype=np.float32));new.append(o)
assert physical_digest(parts)==before,'An existing electrical component moved'
hero=S.objects['EVR installed | static'];base=hero.data.attributes.get('_CLEARANCE_ID')or hero.data.attributes.new(name='_CLEARANCE_ID',type='FLOAT',domain='POINT');base.data.foreach_set('value',np.ones(len(hero.data.vertices),dtype=np.float32))
copies=[]
for o in new:
 q=o.copy();q.data=o.data.copy();S.collection.objects.link(q);q.name='R03 optimized | '+o.name
 # Submillimetre notch edges cannot own four-pixel atlas gutters. Split their
 # boundaries and use the same Cycles corner transport as existing small parts.
 bm=bmesh.new();bm.from_mesh(q.data);bmesh.ops.triangulate(bm,faces=list(bm.faces));bm.normal_update()
 def microface(f):
  longest=max((e.calc_length()for e in f.edges),default=1);return q.data.materials[f.material_index].name=='EVR | metal'or f.calc_area()<1e-5 or 2*f.calc_area()/max(longest,1e-8)<.004
 edges=list({e for f in bm.faces if microface(f)for e in f.edges})
 if edges:bmesh.ops.split_edges(bm,edges=edges)
 bm.to_mesh(q.data);bm.free();q.data.update();values=np.zeros(len(q.data.vertices),dtype=np.float32)
 for f in q.data.polygons:
  ps=[q.data.vertices[i].co for i in f.vertices];longest=max((ps[i]-ps[(i+1)%len(ps)]).length for i in range(len(ps)));small=q.data.materials[f.material_index].name=='EVR | metal'or f.area<1e-5 or 2*f.area/max(longest,1e-8)<.004
  if small:
   for i in f.vertices:values[i]=1
 q.data.attributes['_BAKE_MODE'].data.foreach_set('value',values);attr=q.data.attributes.new(name='_CLEARANCE_ID',type='FLOAT',domain='POINT');attr.data.foreach_set('value',np.full(len(q.data.vertices),2,dtype=np.float32));copies.append(q);o.hide_render=True;o.hide_viewport=True
bpy.ops.object.select_all(action='DESELECT');hero.select_set(True)
for o in copies:o.select_set(True)
bpy.context.view_layer.objects.active=hero;bpy.ops.object.join();triangulate=hero.modifiers.new('Deterministic clearance UV corners','TRIANGULATE');bpy.ops.object.modifier_apply(modifier=triangulate.name);d=hero.data;d.calc_loop_triangles();modes=d.attributes['_BAKE_MODE'];atlas=np.array([modes.data[t.vertices[0]].value<.5 for t in d.loop_triangles]);positions=np.array([v.co[:]for v in d.vertices],dtype='<f4');indices=np.array([t.vertices[:]for t in d.loop_triangles],dtype='<u4');np.savez_compressed(W/'uv-input.npz',positions=positions,indices=indices[atlas]);subprocess.run(['python',str(R/'tools/pack-electrical-uv.py'),str(W/'uv-input.npz'),str(W/'uv-packed.npz')],check=True)
uv=d.uv_layers['UV1'];packed=np.load(W/'uv-packed.npz')['corner_uvs']
for t in d.loop_triangles:
 for li in t.loops:uv.data[li].uv=(0,0)
for t,coords in zip([t for t,keep in zip(d.loop_triangles,atlas)if keep],packed):
 for li,p in zip(t.loops,coords):uv.data[li].uv=p
tri=np.array([[uv.data[li].uv[:]for li in t.loops]for t in d.loop_triangles],dtype='<f4');u=tri[:,1]-tri[:,0];v=tri[:,2]-tri[:,0];area=np.abs(u[:,0]*v[:,1]-u[:,1]*v[:,0])/2
a.update({'version':3,'id':'electrical-clearance-r03','inputR02MasterSHA256':hashlib.sha256((W/'input-master.blend').read_bytes()).hexdigest(),'sourceMasterSHA256':hashlib.sha256((W/'input-master.blend').read_bytes()).hexdigest(),'sourceRuntimeGLBSHA256':a['runtimeGeometrySHA256'],'parentAuthoringVersion':'electrical-lower-r02','replacedIDs':sorted(set(a['replacedIDs']+c['replacedIDs'])),'editableObjects':len(parts)+len(new),'staticTriangles':len(d.loop_triangles),'triangles':len(d.loop_triangles)+44,'stage':'clearance geometry; lighting and visibility acceptance pending','clearance':{'sourceParts':c['replacedIDs'],'removedContextTriangles':removed,'newParts':len(new),'sourceRearPlaneWebZ':c['rearPlaneWebZ'],'requiredGapMetres':.01,'existingElectricalPhysicalSHA256':before,'existingElectricalPartsUnchanged':True,'navigationUnchanged':True,'accessAdjustmentsExplicitlySelected':True,'woodSourceTint':tint,'woodUV0Affine':uv_coeff.tolist()},'uv':{**a['uv'],'packing':json.loads((W/'uv-packed.npz.json').read_text()),'coverage':float(area[atlas].sum()),'degenerateTriangleFraction':float((area[atlas]<1e-12).mean()),'uvTrianglesSHA256':hashlib.sha256(tri.tobytes()).hexdigest(),'atlasTriangles':int(atlas.sum()),'vertexIrradianceTriangles':int((~atlas).sum())}})
bad=np.flatnonzero((area<1e-12)&atlas);print('R03 GEOMETRY LIMITS',a['triangles'],a['uv']['coverage'],a['uv']['degenerateTriangleFraction'],'degenerate classes',[d.attributes['_CLEARANCE_ID'].data[d.loop_triangles[i].vertices[0]].value for i in bad[:20]],flush=True);assert a['triangles']<=120000 and a['uv']['coverage']>=.4 and a['uv']['degenerateTriangleFraction']<.0001
hero['sourceIDs']=json.dumps([o.get('componentID')for o in parts+new]);S['R03 scope']='Recessed stair skins, local tread8 notch at unchanged height/contact patch and a continuous rail on the opposite side with mirrored brackets and three inferred digital mounting spacers, as explicitly selected. No existing electrical component, engine, KOHLER, door or floor edited.'
a['sourceTextures'].update({p.name:hashlib.sha256(p.read_bytes()).hexdigest()for p in textures.glob('service-wood-*.png')})
bpy.ops.wm.save_as_mainfile(filepath=str(W/'electrical-master.blend'),compress=True);a['masterSHA256']=hashlib.sha256((W/'electrical-master.blend').read_bytes()).hexdigest();(W/'authoring.json').write_text(json.dumps(a,indent=2)+'\n')
(W/'component-inventory.json').write_text(json.dumps(preserved_inventory(parts+new),indent=2)+'\n');print('R03 CASES PREPARED',a['triangles'],a['uv']['coverage'],removed,flush=True)
