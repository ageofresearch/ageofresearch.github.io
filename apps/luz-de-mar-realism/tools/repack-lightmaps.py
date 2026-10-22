"""Repair UV1/bakes without changing geometry, physical UV0 or static probes."""
import bpy,json,hashlib,runpy,time,sys,argparse
from pathlib import Path
R=Path(__file__).resolve().parents[1];O=R/'public/assets/saloon';W=R/'work';S=bpy.context.scene;p=O/'authoring.json';meta=json.loads(p.read_text());pack=runpy.run_path(str(R/'tools/lightmap-uv.py'))['prepare_uv'];meshes=[o for o in S.objects if o.type=='MESH'and o.name.startswith('MD_R02 |')];stats=meta.get('atlasPadding',{}).copy();atlases={};ap=argparse.ArgumentParser();ap.add_argument('--atlas',choices=['architecture','furniture']);opt=ap.parse_args(sys.argv[sys.argv.index('--')+1:]if'--'in sys.argv else[]);selected=[opt.atlas]if opt.atlas else['architecture','furniture']
# Preserve the current geometry/UV0; only UV1 is repacked.
for ob in meshes:
 atlas=ob.get('lightmap')
 if atlas in selected:stats[atlas]=pack(ob,atlas,R)
S.render.engine='CYCLES';S.cycles.samples=96;S.cycles.use_denoising=False;S.render.threads_mode='FIXED';S.render.threads=5;S.render.bake.margin_type='EXTEND';S.render.bake.use_pass_color=False;S.render.bake.use_pass_direct=True;S.render.bake.use_pass_indirect=True;S.render.image_settings.file_format='OPEN_EXR';S.render.image_settings.color_mode='RGB';S.render.image_settings.color_depth='16';S.render.image_settings.exr_codec='PIZ'
world=S.world;nodes=world.node_tree.nodes;links=world.node_tree.links;output=nodes.get('World Output');saved=output.inputs['Surface'].links[0].from_socket;links.new(nodes.get('Background').outputs[0],output.inputs['Surface'])
hidden=[]
for ob in S.objects:
 if ob.get('runtimePresentation')or ob.get('lightmap')=='none':hidden.append((ob,ob.hide_render));ob.hide_render=True
for atlas in selected:
 im=bpy.data.images.new('REPACK '+atlas,2048,2048,float_buffer=True);atlases[atlas]=im;ob=next(o for o in meshes if o.get('lightmap')==atlas);bpy.ops.object.select_all(action='DESELECT');ob.select_set(True);bpy.context.view_layer.objects.active=ob;ob.data.uv_layers.active_index=1
 for m in ob.data.materials:n=m.node_tree.nodes.get('BAKE | linear ambient only');n.image=im;m.node_tree.nodes.active=n
 S.render.bake.margin=stats[atlas]['bakeMarginPixels'];t=time.time();bpy.ops.object.bake(type='DIFFUSE');im.save_render(str(O/('ambient-'+atlas+'.exr')),scene=S);im.pack();im.use_fake_user=True;ob.data.uv_layers.active_index=0;print('BAKED',atlas,time.time()-t,flush=True)
for ob,value in hidden:ob.hide_render=value
links.new(saved,output.inputs['Surface']);bpy.ops.object.select_all(action='DESELECT')
for ob in meshes:ob.select_set(True)
bpy.context.view_layer.objects.active=meshes[0];file=O/'room-source.glb';bpy.ops.export_scene.gltf(filepath=str(file),export_format='GLB',use_selection=True,export_extras=True,export_texcoords=True,export_normals=True,export_materials='EXPORT')
meta.update(revision=7,atlasPadding=stats,rawBakesSHA256={a:hashlib.sha256((O/('ambient-'+a+'.exr')).read_bytes()).hexdigest()for a in ['architecture','furniture']},bakeGeometrySHA256=hashlib.sha256(file.read_bytes()).hexdigest(),samples=96,probeReuse='Existing static captures retained: geometry and physical UV0 unchanged; only lightmap UV1 and diffuse atlases repaired.')
bpy.ops.wm.save_as_mainfile(filepath=str(W/'saloon-master.blend'),compress=True);meta['masterSHA256']=hashlib.sha256((W/'saloon-master.blend').read_bytes()).hexdigest();p.write_text(json.dumps(meta,indent=2)+'\n')
