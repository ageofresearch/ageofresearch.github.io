"""Apply owned material maps only after the neutral milestone; derive UV/bake mesh."""
import bpy,bmesh,numpy as np,json,math,hashlib,ast
from pathlib import Path
from mathutils import Vector
R=Path(__file__).resolve().parents[1];W=R/'work/bulkhead-vr-r01';S=bpy.context.scene;SX=35.23/36;SY=7.47/7.6
E=json.loads((W/'evidence-frozen.json').read_text());binding=json.loads((W/'authoring.json').read_text());C=bpy.data.collections['EDITABLE | VR bulkhead'];parts=list(C.objects)
fine_review=json.loads((W/'fine-neutral-review.json').read_text())
same_geometry=fine_review.get('neutralGeometrySHA256')==binding.get('neutralGeometrySHA256')
same_native=fine_review.get('neutralMasterSHA256')==hashlib.sha256((W/'bulkhead-neutral.blend').read_bytes()).hexdigest()
assert fine_review['advanceToFinish'] and (same_geometry or same_native),'Review current native 16/8px geometry before proceeding to finish'
def pt(p):return Vector((p[1]*SY,-(p[0]*SX-17.615),p[2]-2.01))
def plane(pixel,x):
 u,v=pixel;d=(x-9.15)*SX;return[x,-(u-1024)*d/1024/SY,3.18+(1024-v)*d/1024]
def activate(o):bpy.ops.object.select_all(action='DESELECT');o.select_set(True);bpy.context.view_layer.objects.active=o

# Explicit review record; broad-form gate is separate from strict pixel/material acceptance.
review={'stage':'native neutral geometry','captureSHA256':fine_review['nativeCaptureSHA256'],'comparedFeatures':fine_review['comparedFeatures'],'gridPixels':fine_review['gridPixels'],'detailGridPixels':fine_review['detailGridPixels'],'primaryEnclosureCount':8,'primaryValveGroups':3,'majorAssembliesPresent':True,'advanceToFinish':True,'exactVisualAcceptance':False,'observations':fine_review['remaining'],'reviewBinding':fine_review['neutralGeometrySHA256']}
(W/'neutral-review.json').write_text(json.dumps(review,indent=2)+'\n')

# Generate deterministic, independently owned maps using system Pillow outside Blender.
import subprocess
code='''from pathlib import Path
import numpy as np
from PIL import Image,ImageFilter
O=Path("WORKDIR")/"textures";O.mkdir(exist_ok=True)
rng=np.random.default_rng(1667308298);n=512
v=np.asarray(Image.fromarray(rng.integers(0,255,(n,n),dtype=np.uint8)).filter(ImageFilter.GaussianBlur(.7))).astype(float)/255-.5
families={"paint":([.91,.915,.89],.32,0,.012),"panel-grey":([.77,.79,.77],.36,0,.014),"motor-paint":([.70,.73,.72],.46,0,.020),"metal":([.72,.75,.77],.22,1,.008),"brass":([.72,.60,.35],.25,.92,.018),"rubber":([.045,.049,.047],.68,0,.02),"dark":([.07,.075,.07],.50,0,.008),"screen":([.15,.22,.10],.24,0,.001),"yellow":([.72,.65,.12],.40,0,.009),"green":([.05,.36,.065],.30,0,.009),"red":([.64,.035,.02],.31,0,.008),"label":([.86,.86,.80],.55,0,.001)}
for name,(rgb,r,m,amp)in families.items():
 color=np.clip(np.array(rgb)[None,None,:]*(1+v[:,:,None]*.025),0,1)
 Image.fromarray((color*255).astype("uint8")).save(O/(name+"-color.png"))
 orm=np.stack([np.ones_like(v),np.clip(r+v*.04,0,1),np.full_like(v,m)],2)
 Image.fromarray((orm*255).astype("uint8")).save(O/(name+"-orm.png"))
 gx=np.gradient(v,axis=1)*amp;gy=np.gradient(v,axis=0)*amp;q=np.stack([-gx,-gy,np.ones_like(v)],2);q/=np.linalg.norm(q,axis=2,keepdims=True)
 Image.fromarray(((q*.5+.5)*255).astype("uint8")).save(O/(name+"-normal.png"))
'''.replace('WORKDIR',str(W))
subprocess.run(['python','-c',code],check=True)
for name in ['paint','panel-grey','motor-paint','metal','brass','rubber','dark','screen','yellow','green','red','label']:
 m=bpy.data.materials['BVR | '+name];n=m.node_tree.nodes;l=m.node_tree.links;p=n['Principled BSDF'];uv=n.new('ShaderNodeUVMap');uv.uv_map='UV0'
 for kind in ['color','orm','normal']:
  image=bpy.data.images.load(str(W/'textures'/(name+'-'+kind+'.png')),check_existing=True);image.colorspace_settings.name='sRGB'if kind=='color'else'Non-Color';t=n.new('ShaderNodeTexImage');t.image=image;l.new(uv.outputs[0],t.inputs['Vector'])
  if kind=='color':l.new(t.outputs['Color'],p.inputs['Base Color'])
  elif kind=='orm':
   sep=n.new('ShaderNodeSeparateColor');l.new(t.outputs['Color'],sep.inputs[0]);l.new(sep.outputs['Green'],p.inputs['Roughness']);l.new(sep.outputs['Blue'],p.inputs['Metallic'])
  else:
   normal=n.new('ShaderNodeNormalMap');normal.inputs['Strength'].default_value=.20;l.new(t.outputs['Color'],normal.inputs['Color']);l.new(normal.outputs[0],p.inputs['Normal'])
 p.inputs['Coat Weight'].default_value=.12 if name in ['paint','red']else 0

# Only the legible equipment markings are reconstructed; no invented ratings.
for name,body,rect in [('eco','ECO\nR',[168,927,213,948]),('epu','EPU',[540,998,565,1013]),('scu','SCU',[1805,906,1831,914]),('scu-maker','MTU',[1804,1014,1833,1022])]:
 front=12.72 if name=='epu' else 12.80;x=front-.022
 bpy.ops.object.text_add();o=bpy.context.object;o.data.body=body;o.data.align_x='CENTER';o.data.align_y='CENTER';o.data.size=.08;o.data.extrude=0;bpy.ops.object.convert(target='MESH')
 xs=[v.co.x for v in o.data.vertices];ys=[v.co.y for v in o.data.vertices];width=max(xs)-min(xs);height=max(ys)-min(ys);cx=(min(xs)+max(xs))/2;cy=(min(ys)+max(ys))/2
 center=plane([(rect[0]+rect[2])/2,(rect[1]+rect[3])/2],x);d=(x-9.15)*SX;scale=min((rect[2]-rect[0])*d/1024/max(width,.001),(rect[3]-rect[1])*d/1024/max(height,.001))
 for v in o.data.vertices:v.co=pt([x,center[1]-(v.co.x-cx)*scale/SY,center[2]+(v.co.y-cy)*scale])
 o.name='BVR | legible marking '+name;o.data.materials.clear();o.data.materials.append(bpy.data.materials['BVR | dark']);o['componentID']='BVR/legible marking '+name;o['assembly']='panels';o['lightmap']='bulkhead';o['classification']='legible reference text; no serial or capacity'
 for col in list(o.users_collection):col.objects.unlink(o)
 C.objects.link(o);parts.append(o)
 if not o.data.uv_layers:o.data.uv_layers.new(name='UV0')

# Evaluate each component without changing the editable version or either engine.
deps=bpy.context.evaluated_depsgraph_get();copies=[]
for original in parts:
 evaluated=original.evaluated_get(deps);mesh=bpy.data.meshes.new_from_object(evaluated,depsgraph=deps,preserve_all_data_layers=True);copy=bpy.data.objects.new('BVR evaluated | '+original.name,mesh);S.collection.objects.link(copy);copy.matrix_world=original.matrix_world.copy();copies.append(copy)
bpy.ops.object.select_all(action='DESELECT')
for o in copies:o.select_set(True)
bpy.context.view_layer.objects.active=copies[0];bpy.ops.object.join();hero=bpy.context.object;hero.name='BVR installed | static'
triangulate=hero.modifiers.new('Independent triangulated UV corners','TRIANGULATE')
if hasattr(triangulate,'keep_custom_normals'):triangulate.keep_custom_normals=True
bpy.ops.object.modifier_apply(modifier=triangulate.name)
bm=bmesh.new();bm.from_mesh(hero.data);zero=[f for f in bm.faces if f.calc_area()<1.2e-7]
binding['removedSubmillimetreSlivers']={'triangles':len(zero),'areaSquareMetres':sum(f.calc_area() for f in zero),'maximumTriangleArea':1.2e-7,'scope':'Optimized new bulkhead derivative only; editable source and both engine meshes retained.'}
if zero:bmesh.ops.delete(bm,geom=zero,context='FACES')
bm.to_mesh(hero.data);bm.free();hero.data.update()
unused=[uv.name for uv in hero.data.uv_layers if uv.name not in ['UV0','UV1']]
for name in unused:hero.data.uv_layers.remove(hero.data.uv_layers[name])
binding['removedUnusedUVLayers']=unused
if not hero.data.uv_layers.get('UV1'):hero.data.uv_layers.new(name='UV1')
hero.data.calc_loop_triangles();positions=np.array([v.co[:] for v in hero.data.vertices],dtype=np.float32);indices=np.array([t.vertices[:] for t in hero.data.loop_triangles],dtype=np.uint32)
np.savez_compressed(W/'uv-input.npz',positions=positions,indices=indices)
subprocess.run(['python',str(R/'tools/pack-bulkhead-uv.py'),str(W/'uv-input.npz'),str(W/'uv-packed.npz')],check=True)
packed=np.load(W/'uv-packed.npz')['corner_uvs'];uv=hero.data.uv_layers['UV1']
for t,coords in zip(hero.data.loop_triangles,packed):
 for li,coord in zip(t.loops,coords):uv.data[li].uv=coord
tri=np.array([[uv.data[i].uv[:] for i in t.loops] for t in hero.data.loop_triangles]);a=tri[:,1]-tri[:,0];b=tri[:,2]-tri[:,0];area=np.abs(a[:,0]*b[:,1]-a[:,1]*b[:,0])/2;coverage=float(area.sum());degenerate=float((area<1e-12).mean())
binding['uv']={'packing':json.loads((W/'uv-packed.npz.json').read_text()),'coverage':coverage,'minimumGutterPixels':4,'bakeMarginPixels':4,'degenerateTriangleFraction':degenerate,'uvTrianglesSHA256':hashlib.sha256(tri.astype('<f4').tobytes()).hexdigest()};binding['triangles']=len(hero.data.loop_triangles)
assert coverage>=.40,('UV occupancy',coverage)
assert degenerate<.0001,('Degenerate lighting UVs',degenerate)
assert binding['triangles']<=120000,('Triangle budget',binding['triangles'])
hero.data.uv_layers.active_index=0;hero.data.uv_layers['UV0'].active_render=True
for o in parts:o.hide_render=True;o.hide_viewport=True
hero['lightmap']='bulkhead';hero['variant']='bulkhead-vr-r01';hero['sourceIDs']=json.dumps([o['componentID']for o in parts]);S['stage']='finished material candidate; strict visual acceptance pending'
binding['stage']='material candidate';binding['editableObjects']=len(parts);binding['neutralMilestone']=review;binding['materialsApproved']=False
(W/'authoring.json').write_text(json.dumps(binding,indent=2)+'\n')
bpy.ops.wm.save_as_mainfile(filepath=str(W/'bulkhead-master.blend'),compress=True)
print('BULKHEAD SURFACES',binding['triangles'],'triangles; UV',coverage,degenerate,flush=True)
