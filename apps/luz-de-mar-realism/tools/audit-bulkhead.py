"""Private original-resolution object-ID render and independent landmark checks."""
import bpy,numpy as np,json,math
from pathlib import Path
from mathutils import Vector
R=Path(__file__).resolve().parents[1];W=R/'work/bulkhead-vr-r01';S=bpy.context.scene;E=json.loads((W/'evidence-frozen.json').read_text());SX=35.23/36;SY=7.47/7.6
def pt(p):return Vector((p[1]*SY,-(p[0]*SX-17.615),p[2]-2.01))
def emission(name,color):
 m=bpy.data.materials.new(name);m.use_nodes=True;n=m.node_tree.nodes;n.clear();e=n.new('ShaderNodeEmission');e.inputs['Color'].default_value=(*color,1);e.inputs['Strength'].default_value=1;out=n.new('ShaderNodeOutputMaterial');m.node_tree.links.new(e.outputs[0],out.inputs[0]);return m
black=emission('ID context',[0,0,0]);names={};bounds={}
S.cycles.pixel_filter_type='BOX';S.cycles.filter_width=.01
for o in S.objects:
 if o.type=='MESH'and not o.hide_render:o.data.materials.clear();o.data.materials.append(black)
 if o.type=='LIGHT':o.hide_render=True
if S.objects.get('BVR installed | static'):S.objects['BVR installed | static'].hide_render=True
for i,o in enumerate(bpy.data.collections['EDITABLE | VR bulkhead'].objects,1):
 if o.type!='MESH':continue
 o.hide_render=False;o.data.materials.clear();color=[(i&255)/255,((i>>8)&255)/255,0];o.data.materials.append(emission('ID '+str(i),color));names[i]=o.name
cam=S.camera;cam.data.type='PERSP';cam.data.sensor_fit='VERTICAL';cam.data.angle=math.pi/2;cam.location=pt(E['camera']['sourcePosition']);cam.rotation_euler=(pt([10.15,0,3.18])-cam.location).to_track_quat('-Z','Y').to_euler();cam.data.clip_start=.035
S.render.engine='CYCLES';S.cycles.samples=1;S.cycles.use_denoising=False;S.render.threads_mode='FIXED';S.render.threads=4;S.render.resolution_x=2048;S.render.resolution_y=2048;S.render.resolution_percentage=100;S.render.image_settings.file_format='OPEN_EXR';S.render.image_settings.color_mode='RGB';S.render.image_settings.color_depth='16';S.render.image_settings.exr_codec='PIZ';S.render.filepath=str(W/'review/ids-f.exr');bpy.ops.render.render(write_still=True)
im=bpy.data.images.load(str(W/'review/ids-f.exr'),check_existing=False);data=np.array(im.pixels[:],dtype=np.float32).reshape(2048,2048,4)[::-1];rgb=np.clip(np.rint(data[:,:,:3]*255),0,255).astype(np.uint8);ids=rgb[:,:,0].astype(np.uint16)+rgb[:,:,1].astype(np.uint16)*256
np.savez_compressed(W/'review/ids-f.npz',ids=ids);(W/'review/ids-f-components.json').write_text(json.dumps(names,indent=2)+'\n')
targets={'eco-left':'enclosure eco','eco-bottom':'enclosure eco','operating-port-right':'enclosure port-operating','epu-left':'enclosure epu','epu-bottom':'enclosure epu','port-local-right':'enclosure port-local','starboard-local-left':'enclosure starboard-local','junction-right':'enclosure junction','operating-starboard-left':'enclosure starboard-operating','scu-bottom':'enclosure scu','central-upper-white':'upper white swept header','central-brass-outer':'right brass elbow','motor-fan-center':'motor body rectangular ribs','manual-cover-center':'manual circular cover inner','tray-line':'upper perforated cable tray','cable-drop':'starboard full height harness 0'}
results=[]
for item in E['heldOut']:
 name='BVR | '+targets[item['id']];target_names=[name]
 if targets[item['id']].startswith('enclosure '):target_names.append('BVR | door '+targets[item['id']].removeprefix('enclosure '))
 identifiers=[k for k,v in names.items()if v in target_names];mask=np.isin(ids,identifiers);edge=mask&~(np.roll(mask,1,0)&np.roll(mask,-1,0)&np.roll(mask,1,1)&np.roll(mask,-1,1));yy,xx=np.nonzero(edge);x,y=item['pixel'];method='visible component boundary, including its own door when present'
 if 'center'in item['id']:
  o=S.objects[name];coords=[o.matrix_world@Vector(p)for p in o.bound_box];p=sum(coords,Vector())/8;source=[(-p.y+17.615)/SX,p.x/SY,p.z+2.01];depth=(source[0]-9.15)*SX;actual=[1024*(1-source[1]*SY/depth),1024*(1-(source[2]-3.18)/depth)];error=math.dist(actual,[x,y]);method='projected geometric bounding centre; not a floating annotation'
 else:error=float(np.sqrt((xx-x)**2+(yy-y)**2).min())if len(xx)else None;actual=None
 results.append({**item,'object':name,'method':method,'actual':actual,'visiblePixels':int(mask.sum()),'errorPixels':error,'passed':error is not None and error<=4})
report={'camera':E['camera'],'cubeSize':2048,'checks':results,'unambiguousLandmarkMaxPixels':4,'passedLandmarks':sum(p['passed']for p in results),'landmarkCount':len(results),'allLandmarksPassed':all(p['passed']for p in results),'allClearEdgesCertified':False,'visualAcceptance':False,'limits':['Visible boundary/centre samples only; no certification of 95% of every component edge.','Manual photograph coordinates have uncertainty; all measurements retained, including occlusions and failures.']}
(W/'landmarks.json').write_text(json.dumps(report,indent=2)+'\n');print('RESERVED LANDMARKS',report['passedLandmarks'],'/',len(results),flush=True)
