"""Native component IDs, including occlusion by retained context; no helper markers."""
import bpy,numpy as np,json,math
import os
from pathlib import Path
from mathutils import Vector
R=Path(__file__).resolve().parents[1];W=Path(os.environ.get('ELECTRICAL_AUTHORING_WORK',str(R/'work/electrical-vr-r01')));S=bpy.context.scene;E=json.loads((W/'evidence-frozen.json').read_text());SX=35.23/36;SY=7.47/7.6
def pt(p):return Vector((p[1]*SY,-(p[0]*SX-17.615),p[2]-2.01))
def emission(name,color):
 m=bpy.data.materials.new(name);m.use_nodes=True;n=m.node_tree.nodes;n.clear();e=n.new('ShaderNodeEmission');e.inputs[0].default_value=(*color,1);end=n.new('ShaderNodeOutputMaterial');m.node_tree.links.new(e.outputs[0],end.inputs[0]);return m
black=emission('Electrical ID context',[0,0,0]);names={}
for o in S.objects:
 if o.type=='LIGHT':o.hide_render=True
 if o.type=='MESH'and not o.hide_render:o.data.materials.clear();o.data.materials.append(black)
if S.objects.get('EVR installed | static'):S.objects['EVR installed | static'].hide_render=True
for i,o in enumerate(bpy.data.collections['EDITABLE | VR electrical'].objects,1):
 if o.type!='MESH':continue
 o.hide_render=False
 # Transparent covers do not occlude the ID pass of the visible breakers.
 if 'transparent closed cover'in o.name:o.hide_render=True
 o.data.materials.clear();o.data.materials.append(emission('Electrical ID '+str(i),[(i&255)/255,((i>>8)&255)/255,0]));names[i]=o.name
S.cycles.pixel_filter_type='BOX';S.cycles.filter_width=.01;S.render.engine='CYCLES';S.cycles.samples=1;S.cycles.use_denoising=False;S.render.threads_mode='FIXED';S.render.threads=4;S.render.resolution_x=S.render.resolution_y=2048;S.render.resolution_percentage=100;S.render.use_border=False;S.render.image_settings.file_format='OPEN_EXR';S.render.image_settings.color_mode='RGB';S.render.image_settings.color_depth='16';S.render.image_settings.exr_codec='PIZ'
cam=S.camera;cam.data.type='PERSP';cam.data.sensor_fit='VERTICAL';cam.data.angle=math.pi/2;cam.data.clip_start=.035;cam.location=pt([9.15,0,3.18])
for face,target in [('b',[8.15,0,3.18]),('r',[9.15,-1,3.18]),('u',[9.15,0,4.18]),('d',[9.15,0,2.18]),('l',[9.15,1,3.18])]:
 if os.environ.get('AUDIT_FACES')and face not in os.environ['AUDIT_FACES'].split(','):continue
 cam.rotation_euler=(0,0,math.pi)if face=='d'else(0,math.pi,0)if face=='u'else(pt(target)-cam.location).to_track_quat('-Z','Y').to_euler();S.render.filepath=str(W/'review'/('ids-'+face+'.exr'));bpy.ops.render.render(write_still=True)
 im=bpy.data.images.load(S.render.filepath,check_existing=False);rgb=np.clip(np.rint(np.array(im.pixels[:],dtype=np.float32).reshape(2048,2048,4)[::-1,:,:3]*255),0,255).astype(np.uint8);ids=rgb[:,:,0].astype(np.uint16)+rgb[:,:,1].astype(np.uint16)*256;np.savez_compressed(W/'review'/('ids-'+face+'.npz'),ids=ids);bpy.data.images.remove(im)
(W/'review/ids-components.json').write_text(json.dumps(names,ensure_ascii=False,indent=2)+'\n');print('ELECTRICAL NATIVE IDS COMPLETE',len(names),flush=True)
