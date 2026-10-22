"""Denoise linear HDR atlases with OIDN's CPU RTLightmap filter; never tonemap."""
import bpy,numpy as np,subprocess,json,hashlib,os
from pathlib import Path
root=Path(__file__).resolve().parents[1];cachebase=root/'work/raw-atlases';cachebase.mkdir(exist_ok=True)
for room in ['saloon']:
 report=root/'public/assets'/room/'authoring.json';binding=json.loads(report.read_text());cache=cachebase/binding.get('bakeGeometrySHA256','legacy');cache.mkdir(exist_ok=True)
 for atlas in ['architecture','furniture']:
  file=root/'public/assets'/room/('ambient-'+atlas+'.exr');original=cache/(room+'-'+file.name)
  if not original.exists():original.write_bytes(file.read_bytes())
  if 'rawBakesSHA256'in binding:assert hashlib.sha256(original.read_bytes()).hexdigest()==binding['rawBakesSHA256'][atlas],'Cached bake does not match the current geometry'
  im=bpy.data.images.load(str(original),check_existing=False);w,h=im.size;rgba=np.array(im.pixels[:],dtype=np.float32).reshape(h,w,4);pfm=cache/(room+'-'+atlas+'.pfm');denoised=pfm.with_name(pfm.stem+'-denoised.pfm')
  with open(pfm,'wb')as f:f.write(('PF\n%d %d\n-1.0\n'%(w,h)).encode());f.write(rgba[:,:,:3].astype('<f4').tobytes())
  subprocess.run([os.environ.get('OIDN','/tmp/luz-oidn/bin/oidnDenoise'),'-d','cpu','-f','RTLightmap','--hdr',str(pfm),'-o',str(denoised),'--threads','4','--maxmem','384'],check=True)
  with open(denoised,'rb')as f:assert f.readline().strip()==b'PF';assert f.readline().strip()==('%d %d'%(w,h)).encode();assert float(f.readline())<0;rgb=np.frombuffer(f.read(),dtype='<f4').reshape(h,w,3)
  assert np.isfinite(rgb).all()
  for atlasName,stats in binding.get('atlasPadding',{}).items():
   if 'uvTrianglesSHA256'in stats:assert hashlib.sha256((root/'work/lightmap-uv'/(atlasName+'.npz')).read_bytes()).hexdigest()==stats['uvTrianglesSHA256']
  rgba[:,:,:3]=np.maximum(rgb,0);im.pixels.foreach_set(rgba.ravel());im.update();scene=bpy.context.scene;scene.render.image_settings.file_format='OPEN_EXR';scene.render.image_settings.color_mode='RGB';scene.render.image_settings.color_depth='16';scene.render.image_settings.exr_codec='PIZ';im.save_render(str(file),scene=scene)
  print('Denoised',room,atlas,flush=True)
 report=root/'public/assets'/room/'authoring.json';r=json.loads(report.read_text());r['denoise']='Intel Open Image Denoise 2.5.1 CPU RTLightmap, linear HDR full-atlas filtering; original 96-sample bakes retained in authoring archive';report.write_text(json.dumps(r,indent=2)+'\n')
