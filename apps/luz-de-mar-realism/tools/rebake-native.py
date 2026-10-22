"""Bake and bind native UV1 geometry to raw HDR inputs with hashes, no stale cache."""
import bpy,json,hashlib,time
from pathlib import Path
R=Path(__file__).resolve().parents[1];O=R/'public/assets/saloon';S=bpy.context.scene;S.cycles.samples=48;S.cycles.use_denoising=False;S.render.threads_mode='FIXED';S.render.threads=4;S.render.bake.margin=16;S.render.bake.use_pass_color=False;S.render.bake.use_pass_direct=True;S.render.bake.use_pass_indirect=True
S.render.image_settings.file_format='OPEN_EXR';S.render.image_settings.color_mode='RGB';S.render.image_settings.color_depth='16';S.render.image_settings.exr_codec='PIZ';records={}
for o in S.objects:
 if o.get('lightmap')=='none':o.hide_render=True
for a in ['architecture','furniture']:
 ob=S.objects['MD_R02 | '+a];im=bpy.data.images.new('RAW CURRENT | '+a,2048,2048,float_buffer=True);im.use_fake_user=True
 for m in ob.data.materials:
  node=m.node_tree.nodes.get('BAKE | linear ambient only');assert node;node.image=im;m.node_tree.nodes.active=node
 bpy.ops.object.select_all(action='DESELECT');ob.select_set(True);bpy.context.view_layer.objects.active=ob;ob.data.uv_layers.active_index=1;t=time.time();bpy.ops.object.bake(type='DIFFUSE');assert im.has_data;file=O/('ambient-'+a+'.exr');im.save_render(str(file),scene=S);im.pack();ob.data.uv_layers.active_index=0;records[a]=hashlib.sha256(file.read_bytes()).hexdigest();print('CURRENT BAKE',a,time.time()-t,records[a],flush=True)
for o in S.objects:
 if o.name.startswith('MD_R02 |'):o.hide_render=False
p=O/'authoring.json';j=json.loads(p.read_text());j['rawBakesSHA256']=records;j['bakeGeometrySHA256']=hashlib.sha256((R/'work/saloon-source.glb').read_bytes()).hexdigest();j['samples']=48;j['rawNativeBakesPacked']=True;p.write_text(json.dumps(j,indent=2)+'\n');bpy.ops.wm.save_as_mainfile(filepath=str(R/'work/saloon-master.blend'),compress=True)
