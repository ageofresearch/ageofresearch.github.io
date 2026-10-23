"""Private camera/visibility audit against the original cube grid.

No camera adjustment per crop. Pixel rays and rendered component IDs use the
same source station. This checks real surfaces, rather than free-floating marks.
"""
import bpy, json, math, sys
from pathlib import Path
from mathutils import Vector
R=Path(__file__).resolve().parents[1];W=R/'work/left-engine-r13';S=bpy.context.scene
SX=35.23/36;SY=7.47/7.6
def pt(p):return Vector((p[1]*SY,-(p[0]*SX-17.615),p[2]-2.01))
def src(p):return [(-p.y+17.615)/SX,p.x/SY,p.z+2.01]
origin=pt([9.15,0,3.18]);editable=bpy.data.collections['EDITABLE | VR left installed'];editable.hide_viewport=False;editable.hide_render=False
for o in S.objects:
 if o.name.startswith('LVR installed |'):o.hide_render=True;o.hide_viewport=True
S.view_layers[0].update();deps=bpy.context.evaluated_depsgraph_get()
for name,face,pixel in [
 ('intake center','f',[575,1280]),('intake mesh','f',[704,1230]),
 ('white inlet face','f',[485,1320]),('upper cowl','f',[540,1155]),
 ('near rail','f',[278,1360]),('upper rail','f',[610,1225]),
 ('exhaust crown','l',[1600,480]),('cuff','l',[1150,1000]),
 ('blue','l',[1500,1200])]:
 x,y=pixel;u=(x-1024)/1024;v=(1024-y)/1024
 d=Vector((1,-u,v))if face=='f'else Vector((u,1,v))
 direction=Vector((d.y,-d.x,d.z)).normalized()
 hit,pos,n,index,obj,m=S.ray_cast(deps,origin,direction)
 print('GRID HIT',json.dumps(dict(name=name,face=face,pixel=pixel,object=obj.name if hit else None,source=src(pos)if hit else None)))

# Emission IDs make silhouette/occlusion checks independent of lighting.
colors={'covers':(.7,.3,.1),'casting':(.35,.28,.13),'intake':(.05,.7,.1),'exhaust':(.1,.2,.6),'jacket':(.6,.15,.65),'closures':(.9,.4,.5),'rails':(.1,.7,.8),'gearbox':(.3,.3,.7),'extinguisher':(.8,.05,.03),'couplings':(.1,.2,.8),'service':(.8,.7,.05),'hoses':(.3,.5,.3),'mounts':(.5,.6,.3)}
for o in S.objects:
 if o.type=='MESH' and not o.name.startswith('LVR |'):o.hide_render=True
for o in editable.objects:
 m=bpy.data.materials.new('ID '+o.name);m.diffuse_color=(*colors[o['assembly']],1);m.use_nodes=True;n=m.node_tree.nodes;n.clear();em=n.new('ShaderNodeEmission');em.inputs['Color'].default_value=(*colors[o['assembly']],1);out=n.new('ShaderNodeOutputMaterial');m.node_tree.links.new(em.outputs[0],out.inputs[0]);o.data.materials.clear();o.data.materials.append(m)
S.render.engine='CYCLES';S.cycles.samples=1;S.cycles.use_denoising=False;S.render.resolution_x=1200;S.render.resolution_y=800;S.render.resolution_percentage=100;S.render.film_transparent=True;S.render.image_settings.file_format='PNG';S.view_settings.view_transform='Standard';S.view_settings.exposure=0
poses=json.loads((W/'reference/cameras.json').read_text());folder=W/'review/ids';folder.mkdir(exist_ok=True)
for p in poses:
 if len(sys.argv)>sys.argv.index('--')+1 and p['id']not in sys.argv[sys.argv.index('--')+1:]:continue
 h=math.radians(p['h']);v=math.radians(p['v']);d=Vector((-math.cos(v)*math.sin(h),-math.cos(v)*math.cos(h),-math.sin(v)));c=S.camera;c.location=origin;c.rotation_euler=d.to_track_quat('-Z','Y').to_euler();c.data.sensor_fit='VERTICAL';c.data.angle=math.radians(p['vfov']);S.render.filepath=str(folder/(p['id']+'.png'));bpy.ops.render.render(write_still=True)
