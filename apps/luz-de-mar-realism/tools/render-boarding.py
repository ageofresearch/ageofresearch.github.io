import bpy,math,json,sys
from pathlib import Path
from mathutils import Vector
R=Path(__file__).resolve().parents[1];W=R/'work/boarding-vr-r01'
bpy.ops.wm.open_mainfile(filepath=str(W/'boarding-master.blend'));S=bpy.context.scene
S.render.engine='CYCLES';S.cycles.samples=12;S.cycles.use_denoising=False;S.render.threads_mode='FIXED';S.render.threads=4
S.render.resolution_x=S.render.resolution_y=2048;S.render.resolution_percentage=50
S.render.image_settings.file_format='PNG';S.view_settings.view_transform='Khronos PBR Neutral';S.view_settings.exposure=1
cam=bpy.data.objects.new('Frozen Beach Club camera',bpy.data.cameras.new('Frozen camera'));S.collection.objects.link(cam);S.camera=cam;cam.data.type='PERSP';cam.data.lens=18;cam.data.sensor_width=36
pt=lambda p:Vector((p[1]*7.47/7.6,-(p[0]*35.23/36-17.615),p[2]-2.01))
mat=bpy.data.materials.new('Neutral geometry verification');mat.use_nodes=True;mat.node_tree.nodes['Principled BSDF'].inputs['Base Color'].default_value=(.48,.48,.48,1);mat.node_tree.nodes['Principled BSDF'].inputs['Roughness'].default_value=.65
S.view_layers[0].material_override=mat
p=json.load(open(W/'evidence-frozen.json'))['stations']['Beach_Club']['position'] if False else [.30,2.22,3.60]
cam.location=pt(p)
for face,d in [('b',(0,1,0)),('l',(1,0,0))]:
 cam.rotation_euler=(pt([p[i]+d[i]for i in range(3)])-cam.location).to_track_quat('-Z','Y').to_euler();S.render.filepath=str(W/('neutral-'+face+'.png'));bpy.ops.render.render(write_still=True)
