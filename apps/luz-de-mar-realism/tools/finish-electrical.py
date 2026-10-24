"""Owned PBR maps and optimized UV derivative, after an explicit neutral review."""
import bpy,bmesh,numpy as np,json,hashlib,math,subprocess
import os
from pathlib import Path
R=Path(__file__).resolve().parents[1];W=Path(os.environ.get('ELECTRICAL_AUTHORING_WORK',str(R/'work/electrical-vr-r01')));S=bpy.context.scene;a=json.loads((W/'authoring.json').read_text());review=json.loads((W/'neutral-review.json').read_text())
assert review['advanceToFinish'] and review['neutralGeometrySHA256']==a['neutralGeometrySHA256'],'Review the current neutral geometry first'
parts=list(bpy.data.collections['EDITABLE | VR electrical'].objects);textures=W/'textures';textures.mkdir(exist_ok=True)
families={'paint':([.91,.915,.89],.30,0,.012),'edge':([.53,.56,.54],.38,.15,.008),'metal':([.72,.76,.78],.20,1,.005),'dark':([.032,.036,.034],.33,0,.005),'rubber':([.024,.028,.025],.68,0,.018),'red':([.66,.042,.023],.27,0,.006),'blue':([.04,.18,.56],.30,0,.005),'green':([.035,.39,.31],.29,0,.005),'blue-lit':([.12,.32,.94],.22,0,.002),'green-lit':([.10,.85,.30],.22,0,.002),'amber':([.86,.39,.025],.29,0,.006),'cream':([.77,.76,.65],.38,0,.007),'screen':([.23,.29,.25],.22,0,.001),'screen-pale':([.75,.79,.76],.22,0,.001),'glass':([.78,.84,.80],.12,0,.001),'copper':([.67,.37,.18],.29,.95,.008)}
families.update(a.get('materialOverrides',{}))
script='''import json,numpy as np
from PIL import Image,ImageFilter
from pathlib import Path
O=Path(OUTPUT);families=json.loads(FAMILIES);rng=np.random.default_rng(1667308298);n=256
v=np.asarray(Image.fromarray(rng.integers(0,255,(n,n),dtype=np.uint8)).filter(ImageFilter.GaussianBlur(.65))).astype(float)/255-.5
for name,(rgb,r,m,amp)in families.items():
 col=np.clip(np.array(rgb)[None,None,:]*(1+v[:,:,None]*.02),0,1)
 Image.fromarray((col*255).astype('uint8')).save(O/(name+'-color.png'))
 orm=np.stack([np.ones_like(v),np.clip(r+v*.035,0,1),np.full_like(v,m)],2)
 Image.fromarray((orm*255).astype('uint8')).save(O/(name+'-orm.png'))
 gx=np.gradient(v,axis=1)*amp;gy=np.gradient(v,axis=0)*amp;q=np.stack([-gx,-gy,np.ones_like(v)],2);q/=np.linalg.norm(q,axis=2,keepdims=True)
 Image.fromarray(((q*.5+.5)*255).astype('uint8')).save(O/(name+'-normal.png'))
 if name=='checker':
  # Five parallel rounded ridges per group, alternating direction. These are
  # authored physical relief maps, not isolated repeated diamond scratches.
  size=512;yy,xx=np.mgrid[0:size,0:size]/size;h=np.zeros((size,size))
  for ix in range(2):
   for iy in range(2):
    dx=(xx-(.25+.5*ix)+.5)%1-.5;dy=(yy-(.25+.5*iy)+.5)%1-.5;angle=np.pi/4*(1 if(ix+iy)%2==0 else-1);u=dx*np.cos(angle)+dy*np.sin(angle);v=-dx*np.sin(angle)+dy*np.cos(angle)
    for offset in [-.12,-.06,0,.06,.12]:
     distance=np.sqrt(np.maximum(np.abs(u)-.12,0)**2+(v-offset)**2);h=np.maximum(h,np.clip(1-distance/.015,0,1))
  gx=np.gradient(h,axis=1)*size*.00075/.12;gy=np.gradient(h,axis=0)*size*.00075/.12;q=np.stack([-gx,-gy,np.ones_like(h)],2);q/=np.linalg.norm(q,axis=2,keepdims=True)
  # The photograph shows a pale finished plate with brighter metallic crests,
  # rather than the nearly bare dark metal assumed in the first material.
  col=np.clip(np.array(rgb)[None,None,:]+h[:,:,None]*.12,0,1);orm=np.stack([np.ones_like(h),.45-.18*h,.18+.72*h],2)
  Image.fromarray((col*255).astype('uint8')).save(O/(name+'-color.png'))
  Image.fromarray((orm*255).astype('uint8')).save(O/(name+'-orm.png'))
  Image.fromarray(((q*.5+.5)*255).astype('uint8')).save(O/(name+'-normal.png'))
'''.replace('OUTPUT',repr(str(textures))).replace('FAMILIES',repr(json.dumps(families)))
subprocess.run(['python','-c',script],check=True)
for name in families:
 m=bpy.data.materials['EVR | '+name];n=m.node_tree.nodes;l=m.node_tree.links;p=n['Principled BSDF'];uv=n.new('ShaderNodeUVMap');uv.uv_map='UV0'
 for kind in ['color','orm','normal']:
  im=bpy.data.images.load(str(textures/(name+'-'+kind+'.png')),check_existing=True);im.colorspace_settings.name='sRGB'if kind=='color'else'Non-Color';t=n.new('ShaderNodeTexImage');t.image=im;l.new(uv.outputs[0],t.inputs['Vector'])
  if kind=='color':l.new(t.outputs['Color'],p.inputs['Base Color'])
  elif kind=='orm':
   sep=n.new('ShaderNodeSeparateColor');l.new(t.outputs['Color'],sep.inputs[0]);l.new(sep.outputs['Green'],p.inputs['Roughness']);l.new(sep.outputs['Blue'],p.inputs['Metallic'])
  else:
   normal=n.new('ShaderNodeNormalMap');normal.uv_map='UV0';normal.inputs['Strength'].default_value=.72 if name=='checker'else .15;l.new(t.outputs['Color'],normal.inputs['Color']);l.new(normal.outputs[0],p.inputs['Normal'])
 p.inputs['Coat Weight'].default_value=.16 if name in ['paint','red','green','blue']else 0
 if name.endswith('-lit'):
  p.inputs['Emission Color'].default_value=(*families[name][0],1);p.inputs['Emission Strength'].default_value=3
 if name=='glass':p.inputs['Alpha'].default_value=.12;p.inputs['Coat Weight'].default_value=.25
deps=bpy.context.evaluated_depsgraph_get();copies=[];separate=[]
for number,original in enumerate(parts):
 e=original.evaluated_get(deps);d=bpy.data.meshes.new_from_object(e,depsgraph=deps,preserve_all_data_layers=True);o=bpy.data.objects.new('EVR evaluated | '+original.name,d);S.collection.objects.link(o);o.matrix_world=original.matrix_world.copy();copies.append(o)
 louvre_front=original.name.startswith('EVR | stamped louvre ')
 if louvre_front:
  # Corner-only irradiance exaggerated small edge occlusions across these
  # broad flat faces. Split their boundary so only the front uses UV1;
  # tiny side faces keep corner transport without interpolating modes.
  bm=bmesh.new();bm.from_mesh(d);bm.normal_update();front=[f for f in bm.faces if f.normal.y<-.999 and f.calc_area()>1e-5];edges=list({e for f in front for e in f.edges});bmesh.ops.split_edges(bm,edges=edges);bm.normal_update();bm.to_mesh(d);bm.free();d.update()
 if original.get('retainedFloorCoordinates'):
  bm=bmesh.new();bm.from_mesh(d);hidden=[f for f in bm.faces if f.normal.z<-.5];bmesh.ops.delete(bm,geom=hidden,context='FACES');bm.to_mesh(d);bm.free();d.update();a['hiddenFloorUndersideExcludedFromDerivative']=True
 # Fine manufactured components are too small for separate 4px UV gutters.
 # Bake their actual geometry into HDR irradiance per corner instead. Broad
 # surfaces retain the independent HDR atlas; neither method contains albedo.
 area=sum(f.area for f in d.polygons);micro=area<.03 or bool(original.get('forceVertexLighting'))or bool(original.get('appearanceDoor'))
 modes=np.full(len(d.vertices),float(micro),dtype=np.float32)
 if louvre_front:
  for f in d.polygons:
   if f.normal.y<-.999 and f.area>1e-5:
    for vi in f.vertices:modes[vi]=0
 attr=d.attributes.new('_BAKE_MODE',type='FLOAT',domain='POINT');attr.data.foreach_set('value',modes)
 if original.get('appearanceDoor'):
  copies.remove(o);separate.append(o);o['appearanceDoor']=True
  m=d.materials[0].copy();m['appearanceDoor']=True;m['electricalMaterial']=False;m['lightmap']='none';d.materials[0]=m
  for layer in list(d.uv_layers):
   if layer.name!='UV0':d.uv_layers.remove(layer)
  d.uv_layers.new(name='UV1');d.uv_layers['UV1'].data.foreach_set('uv',np.zeros(len(d.loops)*2,dtype=np.float32))
  d.uv_layers.active_index=d.uv_layers.find('UV0');d.uv_layers['UV0'].active_render=True
  ir=d.attributes.new('_IRRADIANCE',type='FLOAT_VECTOR',domain='CORNER');ir.data.foreach_set('vector',np.zeros(len(d.loops)*3,dtype=np.float32))
bpy.ops.object.select_all(action='DESELECT')
for o in copies:o.select_set(True)
bpy.context.view_layer.objects.active=copies[0];bpy.ops.object.join();hero=bpy.context.object;hero.name='EVR installed | static'
tri=hero.modifiers.new('Deterministic UV triangle corners','TRIANGULATE');bpy.ops.object.modifier_apply(modifier=tri.name)
bm=bmesh.new();bm.from_mesh(hero.data);slivers=[f for f in bm.faces if f.calc_area()<1.2e-7];a['removedSubmillimetreSlivers']={'triangles':len(slivers),'areaSquareMetres':sum(f.calc_area()for f in slivers),'scope':'Optimized electrical derivative only; editable components retained'}
if slivers:bmesh.ops.delete(bm,geom=slivers,context='FACES')
bm.to_mesh(hero.data);bm.free();hero.data.update()
for name in [uv.name for uv in hero.data.uv_layers if uv.name not in ['UV0','UV1']]:hero.data.uv_layers.remove(hero.data.uv_layers[name])
if not hero.data.uv_layers.get('UV1'):hero.data.uv_layers.new(name='UV1')
# Blender initializes a new UV layer from the active one. Explicitly clear it:
# unused micro UVs must never write into the broad-surface image bake.
hero.data.uv_layers['UV1'].data.foreach_set('uv',np.zeros(len(hero.data.loops)*2,dtype=np.float32))
hero.data.calc_loop_triangles();positions=np.array([v.co[:]for v in hero.data.vertices],dtype=np.float32);indices=np.array([t.vertices[:]for t in hero.data.loop_triangles],dtype=np.uint32)
mode=np.array([v.value for v in hero.data.attributes['_BAKE_MODE'].data]);atlas_faces=(mode[indices].max(1)<.5)
np.savez_compressed(W/'uv-input.npz',positions=positions,indices=indices[atlas_faces]);subprocess.run(['python',str(R/'tools/pack-electrical-uv.py'),str(W/'uv-input.npz'),str(W/'uv-packed.npz')],check=True)
packed=np.load(W/'uv-packed.npz')['corner_uvs'];uv=hero.data.uv_layers['UV1']
for t,coords in zip([t for t,keep in zip(hero.data.loop_triangles,atlas_faces)if keep],packed):
 for li,coord in zip(t.loops,coords):uv.data[li].uv=coord
tri=np.array([[uv.data[li].uv[:]for li in t.loops]for t in hero.data.loop_triangles]);v=tri[:,1]-tri[:,0];w=tri[:,2]-tri[:,0];area=np.abs(v[:,0]*w[:,1]-v[:,1]*w[:,0])/2
a['uv']={'packing':json.loads((W/'uv-packed.npz.json').read_text()),'coverage':float(area[atlas_faces].sum()),'minimumGutterPixels':4,'degenerateTriangleFraction':float((area[atlas_faces]<1e-12).mean()),'uvTrianglesSHA256':hashlib.sha256(tri.astype('<f4').tobytes()).hexdigest(),'atlasTriangles':int(atlas_faces.sum()),'vertexIrradianceTriangles':int((~atlas_faces).sum()),'microLighting':'Cycles full diffuse without albedo baked per corner for small manufactured parts and narrow grating bars; _BAKE_MODE selects this HDR irradiance instead of the atlas. UV tests apply to atlas participants.'};a['staticTriangles']=len(hero.data.loop_triangles)
for o in separate:o.data.calc_loop_triangles()
a['dynamicTriangles']=sum(len(o.data.loop_triangles)for o in separate);a['triangles']=a['staticTriangles']+a['dynamicTriangles'];a['dynamicDoorLighting']='Live room lighting and probes; excluded from static irradiance and shadow imprints.'
a['louvreFrontLighting']={'components':sum(o.name.startswith('EVR | stamped louvre ')for o in parts),'method':'Front faces use spatial HDR atlas irradiance; split boundaries isolate corner-lit side faces. Geometry and physical UV0 preserved.'}
assert a['uv']['coverage']>=.4 and a['uv']['degenerateTriangleFraction']<.0001 and a['triangles']<=120000,a['uv']
for o in parts:o.hide_render=True;o.hide_viewport=True
for o in separate:o.hide_render=False;o.hide_viewport=False
hero['lightmap']='electrical';hero['variant']='electrical-vr-r01';hero['sourceIDs']=json.dumps([o['componentID']for o in parts]);hero.data.uv_layers.active_index=hero.data.uv_layers.find('UV0');hero.data.uv_layers['UV0'].active_render=True
a['neutralMilestone']=review;a['sourceTextures']={p.name:hashlib.sha256(p.read_bytes()).hexdigest()for p in textures.glob('*.png')};a['stage']='material candidate; strict visual acceptance pending'
S.view_settings.view_transform='Khronos PBR Neutral';S.view_settings.exposure=math.log2(.05);S.view_settings.look='None'
for im in bpy.data.images:
 if im.source=='FILE'and im.has_data:im.pack()
bpy.ops.wm.save_as_mainfile(filepath=str(W/'electrical-master.blend'),compress=True);a['masterSHA256']=hashlib.sha256((W/'electrical-master.blend').read_bytes()).hexdigest();(W/'authoring.json').write_text(json.dumps(a,indent=2)+'\n')
print('ELECTRICAL SURFACES',a['triangles'],'triangles; UV',a['uv']['coverage'],flush=True)
