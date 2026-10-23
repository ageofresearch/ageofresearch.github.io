"""Encode the original filtered linear RGB transport; no rebake or photo data.
Alpha is unused by Three.js lightmaps and reflection probes and is omitted.
"""
import bpy,numpy as np,json
from pathlib import Path
R=Path(__file__).resolve().parents[1];W=R/'work/right-engine-r01';A=R/'public/assets/mechanics/right-vr-r01';S=bpy.context.scene
S.render.image_settings.file_format='OPEN_EXR';S.render.image_settings.color_mode='RGB';S.render.image_settings.color_depth='16';S.render.image_settings.exr_codec='DWAA';S.view_settings.view_transform='Standard';S.view_settings.exposure=0
for source,target in [('right-irradiance','irradiance'),('right-probe-0','probe-0'),('right-probe-1','probe-1')]:
 with open(W/(source+'-filtered.pfm'),'rb')as f:
  assert f.readline().strip()==b'PF';width,height=map(int,f.readline().split());assert float(f.readline())<0;a=np.frombuffer(f.read(),dtype='<f4').reshape(height,width,3)
 rgba=np.ones((height,width,4),dtype=np.float32);rgba[:,:,:3]=np.maximum(a,0);im=bpy.data.images.new('Published RGB '+target,width,height,float_buffer=True);im.pixels.foreach_set(rgba.ravel());im.save_render(str(A/(target+'.exr')),scene=S);bpy.data.images.remove(im);print('RGB HDR',target,(A/(target+'.exr')).stat().st_size)
b=json.loads((W/'authoring.json').read_text());b['hdrEncoding']='Linear RGB half-float EXR DWAA, encoded from the original filtered float32 transport; unused alpha omitted';(W/'authoring.json').write_text(json.dumps(b,ensure_ascii=False,indent=2)+'\n')
