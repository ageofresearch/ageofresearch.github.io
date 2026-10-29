"""Private silhouette diagnostics: editable source components, no texture copying."""
import bpy,math,json
from pathlib import Path
from mathutils import Vector
R=Path(__file__).resolve().parents[1];W=R/'work/boarding-vr-r01';bpy.ops.wm.open_mainfile(filepath=str(W/'boarding-master.blend'));S=bpy.context.scene
S.render.engine='CYCLES';S.cycles.samples=1;S.cycles.use_denoising=False;S.cycles.max_bounces=1;S.render.threads_mode='FIXED';S.render.threads=4;S.render.resolution_x=S.render.resolution_y=2048;S.render.resolution_percentage=100;S.render.image_settings.file_format='PNG';S.render.image_settings.color_mode='RGB';S.view_settings.view_transform='Standard';S.view_settings.exposure=0;S.view_settings.look='None'
for n in S.world.node_tree.nodes:
 if n.type=='BACKGROUND':n.inputs[0].default_value=(0,0,0,1);n.inputs[1].default_value=0
black=bpy.data.materials.new('ID background occluder');black.use_nodes=True;p=black.node_tree.nodes['Principled BSDF'];p.inputs['Base Color'].default_value=(0,0,0,1);p.inputs['Roughness'].default_value=1
for o in list(S.objects):
 if o.type=='LIGHT':o.hide_render=True
 if o.type in['MESH','CURVE']:
  if o.get('zone')=='beach-club'and not any(c.name.startswith('EDITABLE')for c in o.users_collection):o.hide_render=True
  o.data.materials.clear();o.data.materials.append(black)
coll=bpy.data.collections['EDITABLE | beach-club'];coll.hide_render=False;coll.hide_viewport=False
colors={}
for o in coll.objects:
 if not o.name.startswith('BVR'):continue
 group=o.name.split()[0]
 if group not in colors:
  number=int(group[3:]);color=((number*73%211+30)/255,(number*47%211+30)/255,(number*119%211+30)/255,1);m=bpy.data.materials.new('ID '+group);m.use_nodes=True;n=m.node_tree.nodes;n.clear();e=n.new('ShaderNodeEmission');e.inputs[0].default_value=color;e.inputs[1].default_value=1;out=n.new('ShaderNodeOutputMaterial');m.node_tree.links.new(e.outputs[0],out.inputs['Surface']);colors[group]=(m,color)
 o.data.materials.clear();o.data.materials.append(colors[group][0])
cam=bpy.data.objects.new('Single registered station',bpy.data.cameras.new('ID camera'));S.collection.objects.link(cam);S.camera=cam;cam.data.lens=18;cam.data.sensor_width=36
pt=lambda p:Vector((p[1]*7.47/7.6,-(p[0]*35.23/36-17.615),p[2]-2.01));p=[.30,2.22,3.60];cam.location=pt(p)
for face,delta in [('b',[0,1,0]),('l',[1,0,0])]:
 cam.rotation_euler=(pt([p[i]+delta[i]for i in range(3)])-cam.location).to_track_quat('-Z','Y').to_euler();S.render.filepath=str(W/('id-'+face+'.png'));bpy.ops.render.render(write_still=True)
(W/'identifiers.json').write_text(json.dumps({k:v[1]for k,v in colors.items()},indent=2))
