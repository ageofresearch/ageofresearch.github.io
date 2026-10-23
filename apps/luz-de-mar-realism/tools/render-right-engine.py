"""Fixed-station private right-engine review renders, without camera refitting."""
import bpy,numpy as np,json,math,ast,subprocess,sys
from pathlib import Path
from mathutils import Vector
R=Path(__file__).resolve().parents[1];W=R/'work/right-engine-r01';S=bpy.context.scene;evidence=json.loads((R/'public/assets/mechanics/right-vr-r01/evidence.json').read_text());SX=35.23/36;SY=7.47/7.6;cam=S.camera
for n in ast.parse((R/'tools/bake-left-engine.py').read_text()).body:
 if isinstance(n,ast.FunctionDef)and n.name in ['pt','neutral_png','filtered','camera']:exec(compile(ast.Module(body=[n],type_ignores=[]),str(R/'tools/bake-left-engine.py'),'exec'),globals())
args=sys.argv[sys.argv.index('--')+1:]if'--'in sys.argv else ['clay'];mode=args[0];folder=W/'review'/mode;folder.mkdir(exist_ok=True,parents=True)
S.render.engine='CYCLES';S.cycles.samples=16 if mode=='clay' else 32;S.cycles.use_denoising=False;S.render.threads_mode='FIXED';S.render.threads=4;S.render.resolution_x=750;S.render.resolution_y=500;S.render.resolution_percentage=100;S.render.image_settings.file_format='OPEN_EXR';S.render.image_settings.color_depth='16';S.render.image_settings.exr_codec='PIZ';S.view_layers[0].material_override=None
if mode=='clay':
 m=bpy.data.materials.new('Right neutral clay');m.use_nodes=True;p=m.node_tree.nodes['Principled BSDF'];p.inputs['Base Color'].default_value=(.62,.62,.62,1);p.inputs['Roughness'].default_value=.65;S.view_layers[0].material_override=m
for pose in evidence['poses']:
 if len(args)>1 and pose['id']not in args[1:]:continue
 camera(pose);raw=folder/(pose['id']+'.exr');S.render.filepath=str(raw);bpy.ops.render.render(write_still=True);im=bpy.data.images.load(str(raw),check_existing=False);clean=filtered(im,mode+'-'+pose['id'],'RT');dst=folder/(pose['id']+'-denoised.exr');clean.save_render(str(dst),scene=S);neutral_png(dst,folder/(pose['id']+'.png'));print('RIGHT REVIEW',mode,pose['id'],flush=True)
