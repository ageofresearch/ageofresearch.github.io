"""Render isolated actual surface silhouettes in the original L cube grid."""
import bpy, math
from pathlib import Path
from mathutils import Vector
R=Path(__file__).resolve().parents[1];W=R/'work/left-engine-r12';S=bpy.context.scene;SX=35.23/36;SY=7.47/7.6
collection=bpy.data.collections['EDITABLE | VR left installed'];collection.hide_render=False;collection.hide_viewport=False
m=bpy.data.materials.new('Silhouette');m.use_nodes=True;n=m.node_tree.nodes;n.clear();e=n.new('ShaderNodeEmission');e.inputs[0].default_value=(1,1,1,1);o=n.new('ShaderNodeOutputMaterial');m.node_tree.links.new(e.outputs[0],o.inputs[0])
for obj in S.objects:
 if obj.type=='MESH':obj.hide_render=True
for obj in collection.objects:obj.data.materials.clear();obj.data.materials.append(m)
camera=S.camera;camera.data.type='PERSP';camera.data.sensor_fit='VERTICAL';camera.data.angle=math.pi/2;camera.location=Vector((0,-(9.15*SX-17.615),3.18-2.01));camera.rotation_euler=Vector((1,0,0)).to_track_quat('-Z','Y').to_euler();S.render.engine='CYCLES';S.cycles.samples=1;S.cycles.use_denoising=False;S.render.resolution_x=2048;S.render.resolution_y=2048;S.render.resolution_percentage=100;S.render.film_transparent=True;S.render.image_settings.file_format='PNG';S.render.image_settings.color_mode='RGBA';S.view_settings.view_transform='Standard';S.view_settings.exposure=0
for group,names in [('exhaust',['black main swept exhaust','exhaust sewn end panel','main exhaust textile band']),('jacket',['aluminized padded elbow','upper black fastening cuff'])]:
 for obj in collection.objects:obj.hide_render=obj.name.removeprefix('LVR | ')not in names
 S.render.filepath=str(W/'review'/('mask-'+group+'.png'));bpy.ops.render.render(write_still=True)
