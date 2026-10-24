"""Matched review views from one frozen station. Source photographs stay private."""
import bpy,numpy as np,json,math,ast,subprocess,sys
from pathlib import Path
from mathutils import Vector
R=Path(__file__).resolve().parents[1];W=R/'work/electrical-vr-r01';S=bpy.context.scene;SX=35.23/36;SY=7.47/7.6;evidence=json.loads((W/'evidence-frozen.json').read_text())
for node in ast.parse((R/'tools/bake-left-engine.py').read_text()).body:
 if isinstance(node,ast.FunctionDef)and node.name in ['pt','neutral_png','filtered','camera']:exec(compile(ast.Module(body=[node],type_ignores=[]),str(R/'tools/bake-left-engine.py'),'exec'),globals())
cam=S.camera;args=sys.argv[sys.argv.index('--')+1:]if'--'in sys.argv else['clay'];mode=args[0];folder=W/'review'/mode;folder.mkdir(parents=True,exist_ok=True);native=mode.endswith('native')
S.render.engine='CYCLES';S.cycles.device='CPU';S.cycles.samples=8 if mode.startswith('clay')else 64;S.cycles.use_denoising=False;S.render.threads_mode='FIXED';S.render.threads=4;S.render.resolution_percentage=100;S.render.resolution_x=2048 if native else 900;S.render.resolution_y=2048 if native else 600;S.render.use_border=False;S.render.image_settings.file_format='OPEN_EXR';S.render.image_settings.color_mode='RGB';S.render.image_settings.color_depth='16';S.render.image_settings.exr_codec='DWAA'
S.view_settings.view_transform='Standard';S.view_settings.exposure=0
if mode.startswith('clay'):
 m=bpy.data.materials.new('Electrical neutral geometry audit');m.use_nodes=True;p=m.node_tree.nodes['Principled BSDF'];p.inputs['Base Color'].default_value=(.62,.62,.62,1);p.inputs['Roughness'].default_value=.65
 glass=m.copy();glass.name='Neutral clear protection covers';glass.node_tree.nodes['Principled BSDF'].inputs['Alpha'].default_value=.13;glass.surface_render_method='DITHERED'
 for o in S.objects:
  if o.type=='MESH'and not o.hide_render:
   for slot in o.material_slots:slot.material=glass if slot.material and slot.material.name=='EVR | glass'else m
guided=mode.startswith('beauty')
if guided:
 for node in ast.parse((R/'tools/render-bulkhead.py').read_text()).body:
  if isinstance(node,ast.FunctionDef)and node.name=='guided_filter':exec(compile(ast.Module(body=[node],type_ignores=[]),str(R/'tools/render-bulkhead.py'),'exec'),globals())
 S.use_nodes=True;S.view_layers[0].cycles.denoising_store_passes=True;n=S.node_tree.nodes;n.clear();layer=n.new('CompositorNodeRLayers');out=n.new('CompositorNodeComposite');S.node_tree.links.new(layer.outputs['Image'],out.inputs[0]);aux=n.new('CompositorNodeOutputFile');aux.base_path=str(folder);aux.format.file_format='OPEN_EXR';aux.format.color_depth='16';aux.format.exr_codec='PIZ';aux.file_slots.clear()
 for channel in ['Albedo','Normal']:aux.file_slots.new(channel);S.node_tree.links.new(layer.outputs['Denoising '+channel],aux.inputs[channel])
poses=[{'id':f,'h':h,'v':v,'hfov':90,'vfov':90}for f,h,v in [('b',180,0),('r',90,0),('l',270,0),('u',0,-90),('d',0,90)]]if native else evidence['poses']
for pose in poses:
 if len(args)>1 and pose['id']not in args[1:]:continue
 if guided:
  for channel,slot in zip(['albedo','normal'],aux.file_slots):slot.path=pose['id']+'-'+channel+'-'
 camera(pose);raw=folder/(pose['id']+'.exr');S.render.filepath=str(raw);bpy.ops.render.render(write_still=True);im=bpy.data.images.load(str(raw),check_existing=False);clean=guided_filter(im,pose['id'])if guided else filtered(im,mode+'-'+pose['id'],'RT');dst=folder/(pose['id']+'-denoised.exr');clean.save_render(str(dst),scene=S);neutral_png(dst,folder/(pose['id']+'.png'))
 if native:neutral_png(raw,folder/(pose['id']+'-raw.png'))
 print('ELECTRICAL REVIEW',mode,pose['id'],flush=True)
