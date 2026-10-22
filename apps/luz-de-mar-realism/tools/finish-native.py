"""Pack room atlases and capture three fixed local HDR reflection probes.
Run after a completed saloon bake. Diffuse transport is unchanged; the visible
sky/sea background is selected only for camera, glossy and transparent rays.
"""
import argparse,sys,json,hashlib,math,runpy
from pathlib import Path
import bpy
from mathutils import Vector
ap=argparse.ArgumentParser();ap.add_argument('--room',choices=['saloon'],required=True);ap.add_argument('--skip-preview',action='store_true');opt=ap.parse_args(sys.argv[sys.argv.index('--')+1:]);root=Path(__file__).resolve().parents[1];out=root/'public/assets/saloon';scene=bpy.context.scene
scene.render.image_settings.file_format='OPEN_EXR';scene.render.image_settings.color_mode='RGB';scene.render.image_settings.color_depth='16';scene.render.image_settings.exr_codec='PIZ'
for name in ['architecture','furniture']:
 im=bpy.data.images.load(str(out/('ambient-'+name+'.exr')),check_existing=False);im.pack()
runpy.run_path(str(root/'tools/native-surroundings.py'))
# The fill lights describe diffuse sky transport, rather than bright rectangles
# that should themselves appear in lacquer. Static visible luminaires stay in
# reflection captures: there are no user-switchable lamps in this room.
for ob in scene.objects:
 if ob.get('dynamic'):ob.hide_render=True
 if ob.type=='LIGHT':ob.visible_camera=False;ob.visible_glossy=False
world=scene.world;nodes=world.node_tree.nodes;links=world.node_tree.links;original=nodes.get('Background');output=nodes.get('World Output')
visible=nodes.new('ShaderNodeBackground');visible.name='Visible marine HDR | illustrative';visible.inputs[1].default_value=1
for link in original.inputs[0].links:links.new(link.from_socket,visible.inputs[0])
path=nodes.new('ShaderNodeLightPath');maximum=nodes.new('ShaderNodeMath');maximum.operation='MAXIMUM';links.new(path.outputs['Is Camera Ray'],maximum.inputs[0]);links.new(path.outputs['Is Glossy Ray'],maximum.inputs[1]);mix=nodes.new('ShaderNodeMixShader');links.new(maximum.outputs[0],mix.inputs[0]);links.new(original.outputs[0],mix.inputs[1]);links.new(visible.outputs[0],mix.inputs[2]);links.new(mix.outputs[0],output.inputs['Surface'])
for ob in scene.objects:
 if ob.get('runtimePresentation'):ob.hide_render=True
for ob in list(scene.objects):
 if ob.name.startswith('Local ambient probe'):bpy.data.objects.remove(ob,do_unlink=True)
data=bpy.data.cameras.new('Local reflection probes');cam=bpy.data.objects.new('Local ambient probe',data);scene.collection.objects.link(cam);scene.camera=cam;data.type='PANO';data.panorama_type='EQUIRECTANGULAR';cam.rotation_euler=(math.pi/2,0,0)
sx=35.23/36;sy=7.47/7.6
probes=[]
for id,source,asset in [('aft',[9.65,.65,5.25],'probe-aft.exr'),('saloon',[12.0,-.2,5.20],'probe.exr'),('dining',[16.0,0,5.30],'probe-dining.exr')]:
 web=[source[1]*sy,source[2]-2.01,source[0]*sx-17.615];cam.location=(web[0],-web[2],web[1]);scene.render.resolution_x=1024;scene.render.resolution_y=512;scene.render.resolution_percentage=100;scene.cycles.samples=64;scene.cycles.use_denoising=False;scene.render.filepath=str(out/asset);bpy.ops.render.render(write_still=True);probes.append({'id':id,'position':web,'sourcePosition':source,'asset':asset,'width':1024,'height':512,'samples':64,'purpose':'Fixed static specular environment, spatially blended; runtime sun excluded'})
# A separate native presentation sun is added after probes, never to their bake.
for ob in list(scene.objects):
 if ob.get('runtimePresentation'):bpy.data.objects.remove(ob,do_unlink=True)
sun=bpy.data.lights.new('Viewer presentation sun','SUN');sun.energy=.55;sun.color=(1,.913,.807);sun.angle=math.radians(3);ob=bpy.data.objects.new('Viewer presentation sun',sun);scene.collection.objects.link(ob);ob.location=(-10*sy,-(13*sx-17.615),10-2.01);target=Vector((0,-(13*sx-17.615),4.7-2.01));ob.rotation_euler=(target-ob.location).to_track_quat('-Z','Y').to_euler();ob['runtimePresentation']=True
# Editable presentation camera matches the viewer's standard walking height/FOV.
data.type='PERSP';data.sensor_fit='VERTICAL';data.angle=math.radians(72)
def p(v):return Vector((v[1]*sy,-(v[0]*sx-17.615),v[2]-2.01))
cam.location=p([9.2,0,5.5]);cam.rotation_euler=(p([13.157,.084,5.5])-cam.location).to_track_quat('-Z','Y').to_euler();scene.render.resolution_x=1200;scene.render.resolution_y=800;scene.cycles.samples=64;scene.render.image_settings.file_format='PNG';scene.render.filepath=str(root/'work/saloon-native.png')
if not opt.skip_preview:bpy.ops.render.render(write_still=True)
scene['probe_note']='Three static local probes; visible fixtures and inferred marine horizon retained, runtime direct sun excluded';bpy.ops.wm.save_as_mainfile(filepath=str(root/'work/saloon-master.blend'),compress=True)
pth=out/'authoring.json';r=json.loads(pth.read_text());r['masterSHA256']=hashlib.sha256((root/'work/saloon-master.blend').read_bytes()).hexdigest();r['probePosition']=probes[1]['position'];r['probes']=probes;r['halfFloatLinearAtlases']=True;pth.write_text(json.dumps(r,indent=2)+'\n')
