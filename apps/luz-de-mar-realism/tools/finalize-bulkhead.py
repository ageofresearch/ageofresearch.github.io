"""Pack the editable scene with the same fixed display transform as WebGL."""
import bpy,math,json,hashlib,numpy as np
from pathlib import Path
R=Path(__file__).resolve().parents[1];W=R/'work/bulkhead-vr-r01';S=bpy.context.scene
a=json.loads((W/'authoring.json').read_text());hero=S.objects['BVR installed | static'];d=hero.data;d.calc_loop_triangles()
def uvhash():return hashlib.sha256(np.array([[d.uv_layers['UV1'].data[i].uv[:]for i in t.loops]for t in d.loop_triangles],dtype='<f4').tobytes()).hexdigest()
before=uvhash();assert before==a['uv']['uvTrianglesSHA256'],'Unexpected baked UV binding'
unused=[uv.name for uv in d.uv_layers if uv.name not in ['UV0','UV1']]
for name in unused:d.uv_layers.remove(d.uv_layers[name])
assert uvhash()==before,'Removing an unused layer changed baked UV1'
d.uv_layers.active_index=d.uv_layers.find('UV0');d.uv_layers['UV0'].active_render=True;a['removedUnusedUVLayers']=list(set(a.get('removedUnusedUVLayers',[])+unused))
if (W/'bulkhead-source.glb').exists():a.setdefault('transportSourceGeometrySHA256',hashlib.sha256((W/'bulkhead-source.glb').read_bytes()).hexdigest())
bpy.ops.object.select_all(action='DESELECT');hero.select_set(True);bpy.context.view_layer.objects.active=hero
bpy.ops.export_scene.gltf(filepath=str(W/'bulkhead-source.glb'),export_format='GLB',use_selection=True,export_extras=True,export_normals=True,export_texcoords=True)
a['sourceGeometrySHA256']=hashlib.sha256((W/'bulkhead-source.glb').read_bytes()).hexdigest();a['bakedUV1BindingPreservedDuringExportRepair']=True
S.view_settings.view_transform='Khronos PBR Neutral';S.view_settings.exposure=math.log2(.05);S.view_settings.look='None';S.display_settings.display_device='sRGB'
for image in bpy.data.images:
 if image.source=='FILE'and image.has_data:image.pack()
S['displayComparison']='Khronos PBR Neutral, exposure multiplier 0.05, sRGB; native comparison PNGs use the corresponding fixed Neutral transform'
bpy.ops.wm.save_as_mainfile(filepath=str(W/'bulkhead-master.blend'),compress=True)
a['masterSHA256']=hashlib.sha256((W/'bulkhead-master.blend').read_bytes()).hexdigest();a['display']={'transform':'Khronos PBR Neutral','exposureMultiplier':.05,'output':'sRGB'};(W/'authoring.json').write_text(json.dumps(a,indent=2)+'\n')
