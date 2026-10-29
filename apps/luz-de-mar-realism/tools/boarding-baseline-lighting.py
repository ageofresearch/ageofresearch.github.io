import bpy,json,hashlib,numpy as np
from pathlib import Path
R=Path(__file__).resolve().parents[1];W=R/'work/boarding-vr-r01';A=R/'public/assets';S=bpy.context.scene;S.render.image_settings.file_format='OPEN_EXR';S.render.image_settings.color_depth='16';S.render.image_settings.color_mode='RGB';S.render.image_settings.exr_codec='DWAA';report={}
for zone in ['beach-club','cockpit']:
 report[zone]={}
 for source,target in [(f'ambient-{zone}.exr',f'ambient-{zone}-baseline.exr'),('probe.exr','probe-baseline.exr')]:
  im=bpy.data.images.load(str(W/'baseline'/zone/source),check_existing=False);original=np.array(im.pixels[:],dtype=np.float32);im.save_render(str(A/zone/target),scene=S);r=bpy.data.images.load(str(A/zone/target),check_existing=False);delta=np.abs(np.array(r.pixels[:],dtype=np.float32)-original);report[zone][target]={'maxLinearError':float(delta.max()),'meanLinearError':float(delta.mean()),'originalSHA256':hashlib.sha256((W/'baseline'/zone/source).read_bytes()).hexdigest()};bpy.data.images.remove(im);bpy.data.images.remove(r)
(W/'baseline-hdr-compression.json').write_text(json.dumps(report,indent=2))
# Cockpit source is exported without changing its geometry, normals or UVs.
bpy.ops.wm.open_mainfile(filepath=str(W/'boarding-lit.blend'));S=bpy.context.scene;bpy.ops.object.select_all(action='DESELECT')
for o in S.objects:
 if o.get('zone')=='cockpit'and not any(c.name.startswith('EDITABLE')for c in o.users_collection):o.select_set(True)
bpy.ops.export_scene.gltf(filepath=str(W/'cockpit-source.glb'),export_format='GLB',use_selection=True,export_extras=True)
