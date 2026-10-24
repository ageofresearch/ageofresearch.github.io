"""Fixed-camera review renders. Never imports reference photos into Blender."""
import bpy,numpy as np,json,math,ast,subprocess,sys
from pathlib import Path
from mathutils import Vector
R=Path(__file__).resolve().parents[1];W=R/'work/bulkhead-vr-r01';S=bpy.context.scene;evidence=json.loads((W/'evidence-frozen.json').read_text());SX=35.23/36;SY=7.47/7.6;cam=S.camera
for n in ast.parse((R/'tools/bake-left-engine.py').read_text()).body:
 if isinstance(n,ast.FunctionDef)and n.name in ['pt','neutral_png','filtered','camera']:exec(compile(ast.Module(body=[n],type_ignores=[]),str(R/'tools/bake-left-engine.py'),'exec'),globals())
args=sys.argv[sys.argv.index('--')+1:]if'--'in sys.argv else['clay'];mode=args[0];folder=W/'review'/mode;folder.mkdir(exist_ok=True,parents=True)
S.render.engine='CYCLES';S.cycles.samples=16 if mode=='clay' else 64;S.cycles.use_denoising=False;S.render.threads_mode='FIXED';S.render.threads=4;S.render.resolution_x=900;S.render.resolution_y=600;S.render.resolution_percentage=100;S.render.image_settings.file_format='OPEN_EXR';S.render.image_settings.color_depth='16';S.render.image_settings.exr_codec='DWAA'
native=mode.endswith('-native')
if native:
 S.render.resolution_x=S.render.resolution_y=2048;S.cycles.samples=32;S.render.use_border=True;S.render.use_crop_to_border=False;S.render.border_min_x=0;S.render.border_max_x=1;S.render.border_min_y=1-1456/2048;S.render.border_max_y=1-768/2048
guided=mode=='beauty-native'
if guided:
 S.cycles.samples=64;S.use_nodes=True;S.view_layers[0].cycles.denoising_store_passes=True
 nodes=S.node_tree.nodes;nodes.clear();layer=nodes.new('CompositorNodeRLayers');composite=nodes.new('CompositorNodeComposite');S.node_tree.links.new(layer.outputs['Image'],composite.inputs[0]);aux=nodes.new('CompositorNodeOutputFile');aux.base_path=str(folder);aux.format.file_format='OPEN_EXR';aux.format.color_depth='16';aux.format.exr_codec='PIZ';aux.file_slots.clear()
 for channel in ['Albedo','Normal']:
  aux.file_slots.new(channel);S.node_tree.links.new(layer.outputs['Denoising '+channel],aux.inputs[channel])
def guided_filter(im,pose):
 w,h=im.size
 def pfm(image,name):
  rgba=np.array(image.pixels[:],dtype=np.float32).reshape(h,w,4);p=folder/(pose+'-'+name+'.pfm')
  with p.open('wb')as f:f.write(f'PF\n{w} {h}\n-1.0\n'.encode());f.write(rgba[:,:,:3].astype('<f4').tobytes())
  return p
 raw=pfm(im,'radiance');guides={}
 for name in ['Albedo','Normal']:
  path=folder/(pose+'-'+name.lower()+'-'+str(S.frame_current).zfill(4)+'.exr');image=bpy.data.images.load(str(path),check_existing=False);guides[name]=pfm(image,name.lower());bpy.data.images.remove(image)
 output=folder/(pose+'-guided.pfm');subprocess.run(['/tmp/luz-oidn/bin/oidnDenoise','-d','cpu','-f','RT','--hdr',str(raw),'--alb',str(guides['Albedo']),'--nrm',str(guides['Normal']),'-o',str(output),'--threads','4','--maxmem','512'],check=True)
 with output.open('rb')as f:
  assert f.readline().strip()==b'PF';assert f.readline().strip()==f'{w} {h}'.encode();assert float(f.readline())<0;rgb=np.frombuffer(f.read(),dtype='<f4').reshape(h,w,3)
 rgba=np.ones((h,w,4),np.float32);rgba[:,:,:3]=np.maximum(rgb,0);result=bpy.data.images.new('Guided native comparison '+pose,w,h,float_buffer=True);result.pixels.foreach_set(rgba.ravel());return result
if mode.startswith('clay'):
 m=bpy.data.materials.new('Neutral geometry comparison');m.use_nodes=True;p=m.node_tree.nodes['Principled BSDF'];p.inputs['Base Color'].default_value=(.62,.62,.62,1);p.inputs['Roughness'].default_value=.65;S.view_layers[0].material_override=m
poses=[{'id':'f','h':0,'v':0,'hfov':90,'vfov':90}]if native else evidence['poses']
for pose in poses:
 if len(args)>1 and pose['id']not in args[1:]:continue
 camera(pose)
 if guided:
  for slot in aux.file_slots:slot.path=pose['id']+'-'+slot.path.split('-')[0].lower()+'-'
 raw=folder/(pose['id']+'.exr');S.render.filepath=str(raw);bpy.ops.render.render(write_still=True);im=bpy.data.images.load(str(raw),check_existing=False);clean=guided_filter(im,pose['id'])if guided else filtered(im,mode+'-'+pose['id'],'RT');dst=folder/(pose['id']+'-denoised.exr');clean.save_render(str(dst),scene=S);neutral_png(dst,folder/(pose['id']+'.png'))
 if native:neutral_png(raw,folder/(pose['id']+'-raw.png'))
 print('BULKHEAD REVIEW',mode,pose['id'],flush=True)
