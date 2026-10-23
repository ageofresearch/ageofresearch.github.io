"""Render all six original cube faces, fixed camera, actual visible assembly IDs.
Outputs private analysis artifacts only. No per-view fitting or photo projection.
"""
import bpy,json,math,sys,ast,numpy as np,subprocess
from pathlib import Path
from mathutils import Vector
R=Path(__file__).resolve().parents[1];W=R/'work/left-engine-r13';S=bpy.context.scene
out=W/'review/cubes';out.mkdir(exist_ok=True)
sx=35.23/36;sy=7.47/7.6;origin=Vector((0,-(9.15*sx-17.615),3.18-2.01))
directions={'f':(0,-1,0),'l':(1,0,0),'r':(-1,0,0),'b':(0,1,0),'u':(0,0,1),'d':(0,0,-1)}
palette={'casting':(160,110,80),'covers':(220,170,100),'intake':(30,170,70),'exhaust':(40,70,180),'jacket':(180,60,200),'closures':(240,100,150),'rails':(30,180,200),'gearbox':(80,80,180),'extinguisher':(220,30,20),'couplings':(30,60,220),'service':(220,200,20),'hoses':(80,140,80),'mounts':(130,150,80)}
mode=sys.argv[sys.argv.index('--')+1]if'--'in sys.argv else'ids'
collection=bpy.data.collections['EDITABLE | VR left installed']
if mode=='ids':
 collection.hide_render=False;collection.hide_viewport=False
 # Preserve room occlusion in the ID pass. Rendering the assembly alone
 # would count surfaces hidden by the floor/other equipment as visible.
 holdout=bpy.data.materials.new('ID | context occlusion');holdout.use_nodes=True
 hn=holdout.node_tree.nodes;hn.clear();hs=hn.new('ShaderNodeHoldout');ho=hn.new('ShaderNodeOutputMaterial');holdout.node_tree.links.new(hs.outputs[0],ho.inputs[0])
 for o in S.objects:
  if o.type!='MESH' or o.name in collection.objects:continue
  if o.name.startswith('LVR installed |'):o.hide_render=True
  elif not o.hide_render:
   o.data.materials.clear();o.data.materials.append(holdout)
 objects={}
 for i,o in enumerate(sorted(collection.objects,key=lambda o:o.name)):
  value=(0x283941+(i+1)*7919)%0xFFFFFF;color=((value>>16)&255,(value>>8)&255,value&255);objects[str(value)]={'name':o.name,'id':o['componentID'],'assembly':o['assembly'],'color':color,'observation':json.loads(o.get('gridObservation','null'))};m=bpy.data.materials.new('ID | '+o['assembly']);m.use_nodes=True;n=m.node_tree.nodes;n.clear();em=n.new('ShaderNodeEmission');em.inputs['Color'].default_value=(*[c/255 for c in color],1);end=n.new('ShaderNodeOutputMaterial');m.node_tree.links.new(em.outputs[0],end.inputs[0]);o.data.materials.clear();o.data.materials.append(m)
 S.render.film_transparent=True;S.cycles.samples=1;S.view_settings.view_transform='Raw';S.view_settings.exposure=0
else:
 S.render.film_transparent=False;S.cycles.samples=16
 # Reuse exactly the EXR denoiser and Neutral transfer functions, without
 # executing the bake script's command entrypoint.
 module=ast.parse((R/'tools/bake-left-engine.py').read_text())
 funcs=[n for n in module.body if isinstance(n,ast.FunctionDef)and n.name in ['filtered','neutral_png']]
 exec(compile(ast.Module(body=funcs,type_ignores=[]),'<shared linear EXR conversion>','exec'))
S.render.engine='CYCLES';S.cycles.use_denoising=False;S.render.threads_mode='FIXED';S.render.threads=4
S.render.resolution_x=2048;S.render.resolution_y=2048;S.render.resolution_percentage=100
S.render.image_settings.file_format='PNG';S.render.image_settings.color_mode='RGBA'
for face,direction in directions.items():
 if mode=='beauty' and face not in ['f','l','d']:continue
 c=S.camera;c.location=origin;c.data.type='PERSP';c.data.sensor_fit='VERTICAL';c.data.angle=math.pi/2
 c.rotation_euler=Vector(direction).to_track_quat('-Z','Y').to_euler()
 # For vertical cube faces use front-direction (+source X) as top of D.
 if face=='d':c.rotation_euler=(0,0,math.pi)
 if face=='u':c.rotation_euler=(math.pi,0,0)
 if mode=='beauty':
  # Trace only the union of reference and candidate coverage, at the original
  # 2048px projection. This saves rays on unrelated room surfaces without
  # dropping missing parts or protrusions from the comparison.
  from PIL import Image
  alpha=np.asarray(Image.open(out/(face+'-ids.png')).convert('RGBA'))[:,:,3];yy,xx=np.where(alpha>0)
  points=[p for region in json.loads((R/'tools/left-tile-evidence.json').read_text())['regions'][face]for p in region['polygon']]
  xx=np.r_[xx,[p[0]for p in points]];yy=np.r_[yy,[p[1]for p in points]]
  x0=max(0,int(xx.min())-32);x1=min(2048,int(xx.max())+33);y0=max(0,int(yy.min())-32);y1=min(2048,int(yy.max())+33)
  S.render.use_border=True;S.render.use_crop_to_border=False;S.render.border_min_x=x0/2048;S.render.border_max_x=x1/2048;S.render.border_min_y=1-y1/2048;S.render.border_max_y=1-y0/2048
  (out/(face+'-beauty-region.json')).write_text(json.dumps({'rect':[x0,y0,x1-x0,y1-y0],'projectionSize':2048,'samples':16,'scope':'Union of all reference annotations and actual visible candidate pixels, expanded 32 px. Outside this rectangle is unrendered; not a quality mask.'})+'\n')
 if mode=='ids':
  S.render.filepath=str(out/(face+'-'+mode+'.png'));bpy.ops.render.render(write_still=True)
 else:
  S.render.image_settings.file_format='OPEN_EXR';S.render.image_settings.color_depth='16';raw=out/(face+'-beauty-raw.exr');S.render.filepath=str(raw);bpy.ops.render.render(write_still=True)
  im=bpy.data.images.load(str(raw),check_existing=False);clean=filtered(im,'cube-'+face,'RT');linear=out/(face+'-beauty.exr');clean.save_render(str(linear),scene=S);neutral_png(linear,out/(face+'-beauty.png'))
if mode=='ids':(out/'camera.json').write_text(json.dumps({'positionSource':[9.15,0,3.18],'size':2048,'hfov':90,'vfov':90,'palette':palette,'objects':objects,'mode':mode,'occlusion':'Visible room geometry retained as holdout; hidden fallback and merged derivatives excluded.'},indent=2)+'\n')
