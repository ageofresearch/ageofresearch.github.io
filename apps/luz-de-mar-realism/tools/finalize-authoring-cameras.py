"""Bind each editable scene's presentation camera to its published walking spawn."""
import bpy,json,hashlib,math,sys
from pathlib import Path
from mathutils import Vector
R=Path(__file__).resolve().parents[1];W=R/'work';A=R/'public/assets';ids=sys.argv[sys.argv.index('--')+1:]if'--'in sys.argv else['saloon','cockpit','beach-club','port-side','starboard-side','bow'];sx=35.23/36;sy=7.47/7.6
def pt(p):return Vector((p[1]*sy,-(p[0]*sx-17.615),p[2]-2.01))
for id in ids:
 native=W/(id+'-master.blend');bpy.ops.wm.open_mainfile(filepath=str(native));scene=bpy.context.scene;meta=json.loads((A/id/'room.json').read_text());camera=scene.camera;camera.data.type='PERSP';camera.data.sensor_fit='VERTICAL';camera.data.angle=math.radians(72);camera.location=pt(meta['room']['spawn']);camera.rotation_euler=(pt(meta['room']['look'])-camera.location).to_track_quat('-Z','Y').to_euler();exposure=meta.get('camera',{}).get('exposure',1.15);scene.view_settings.exposure=math.log2(exposure);scene['viewerExposure']=exposure;scene['nativeToneCurve']='AgX; viewer uses Three Neutral, so curves differ';scene.render.resolution_x=900;scene.render.resolution_y=600;bpy.ops.wm.save_as_mainfile(filepath=str(native),compress=True)
 p=A/id/'authoring.json';binding=json.loads(p.read_text());binding['masterSHA256']=hashlib.sha256(native.read_bytes()).hexdigest();binding['cameraExposure']=exposure;binding['presentationCamera']={'sourcePosition':meta['room']['spawn'],'target':meta['room']['look'],'verticalFov':72,'viewerToneCurve':'Three.js Neutral','nativeToneCurve':'Blender AgX'};p.write_text(json.dumps(binding,indent=2)+'\n');print('CAMERA BOUND',id,flush=True)
