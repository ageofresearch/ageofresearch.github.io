"""Rebake only the corrected destination atlas. Physical transport is unchanged."""
import bpy,numpy as np,json,hashlib,math,ast,subprocess,time
from pathlib import Path
from mathutils import Vector
R=Path(__file__).resolve().parents[1];W=R/'work/electrical-vr-r01';A=R/'public/assets/machinery/electrical-vr-r01';S=bpy.context.scene;a=json.loads((W/'authoring.json').read_text());assert a['uv']['unusedMicroUV1Zeroed'];hero=S.objects['EVR installed | static'];d=hero.data
for node in ast.parse((R/'tools/bake-left-engine.py').read_text()).body:
 if isinstance(node,ast.FunctionDef)and node.name=='filtered':exec(compile(ast.Module(body=[node],type_ignores=[]),str(R/'tools/bake-left-engine.py'),'exec'),globals())
S.render.engine='CYCLES';S.cycles.device='CPU';S.cycles.samples=64;S.cycles.max_bounces=6;S.cycles.diffuse_bounces=3;S.cycles.glossy_bounces=3;S.cycles.use_denoising=False;S.render.threads_mode='FIXED';S.render.threads=4;S.render.image_settings.file_format='OPEN_EXR';S.render.image_settings.color_mode='RGB';S.render.image_settings.color_depth='16';S.render.image_settings.exr_codec='DWAA';S.view_settings.view_transform='Standard';S.view_settings.exposure=0
fine=[]
for m in bpy.data.materials:
 if m.use_nodes:
  for n in m.node_tree.nodes:
   if n.type=='NORMAL_MAP':fine.append((n,n.inputs['Strength'].default_value));n.inputs['Strength'].default_value=0
im=bpy.data.images.new('Corrected electrical atlas transport',2048,2048,float_buffer=True)
for m in d.materials:
 n=m.node_tree.nodes.get('BAKE | bulkhead diffuse')or m.node_tree.nodes.new('ShaderNodeTexImage');n.image=im;m.node_tree.nodes.active=n
bpy.ops.object.select_all(action='DESELECT');hero.select_set(True);bpy.context.view_layer.objects.active=hero;d.uv_layers.active_index=d.uv_layers.find('UV1');S.render.bake.target='IMAGE_TEXTURES';S.render.bake.margin=4;S.render.bake.use_pass_direct=True;S.render.bake.use_pass_indirect=True;S.render.bake.use_pass_color=False;start=time.time();bpy.ops.object.bake(type='DIFFUSE',uv_layer='UV1');raw=W/'raw/electrical-irradiance.exr';im.save_render(str(raw),scene=S);out=filtered(im,'electrical-corrected-transport');out.save_render(str(A/'electrical-irradiance.exr'),scene=S)
for n,strength in fine:n.inputs['Strength'].default_value=strength
for m in bpy.data.materials:
 if m.use_nodes:
  for n in m.node_tree.nodes:
   if n.type=='TEX_IMAGE'and n.name.startswith('BAKE |'):n.image=None
for image in list(bpy.data.images):
 if image.users==0:bpy.data.images.remove(image)
d.uv_layers.active_index=d.uv_layers.find('UV0');S.view_settings.view_transform='Khronos PBR Neutral';S.view_settings.exposure=math.log2(.05)
files=a['lighting']['files'];files['electrical-irradiance.exr']={'rawSHA256':hashlib.sha256(raw.read_bytes()).hexdigest(),'sha256':hashlib.sha256((A/'electrical-irradiance.exr').read_bytes()).hexdigest(),'bytes':(A/'electrical-irradiance.exr').stat().st_size}
a['microUVRepair']['electricalAtlasRebaked']=True;a['microUVRepair']['samples']=64;a['microUVRepair']['seconds']=time.time()-start
corners=[]
for t in d.loop_triangles:
 for vi,li in zip(t.vertices,t.loops):
  v=hero.matrix_world@d.vertices[vi].co;u=d.uv_layers['UV1'].data[li].uv;corners.append([v.x,v.z,-v.y,u.x,1-u.y])
a['lighting']['engineUVBindings']['electrical']['cornerSHA256']=hashlib.sha256(np.array(corners,dtype='<f4').tobytes()).hexdigest();(W/'lighting.json').write_text(json.dumps(a['lighting'],indent=2)+'\n');bpy.ops.wm.save_as_mainfile(filepath=str(W/'electrical-master.blend'),compress=True);a['masterSHA256']=hashlib.sha256((W/'electrical-master.blend').read_bytes()).hexdigest();(W/'authoring.json').write_text(json.dumps(a,indent=2)+'\n');print('CORRECTED ELECTRICAL ATLAS DONE',a['microUVRepair']['seconds'],flush=True)
