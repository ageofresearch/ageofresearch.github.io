"""Linear HDR transport -> RGBM128; source EXR remains in authoring only."""
import os,json,numpy as np
from pathlib import Path
from PIL import Image
W=Path(os.environ.get('FILTER_WELL_WORK','/tmp/ldm-filter-well-r01'));a=np.load(W/'irradiance.npy')[:,:,:3];assert np.isfinite(a).all()and a.min()>=0
source_size=int(a.shape[0]);size=int(os.environ.get('FILTER_WELL_RUNTIME_ATLAS','1024'))
if source_size!=size:
 a=np.stack([np.asarray(Image.fromarray(a[:,:,i],mode='F').resize((size,size),Image.Resampling.BOX))for i in range(3)],axis=2)
limit=128.;assert a.max()<=limit,a.max();m=np.maximum(1/255,np.ceil(a.max(2,keepdims=True)/limit*255)/255);rgb=np.clip(a/(m*limit),0,1);rgba=np.concatenate([rgb,m],2)
Image.fromarray(np.round(rgba[::-1]*255).astype('uint8'),'RGBA').save(W/'irradiance-rgbm.png')
(W/'lightmap.json').write_text(json.dumps({'format':'Linear RGBM128,RGBA8 KTX2; no albedo','range':limit,'width':int(a.shape[1]),'height':int(a.shape[0]),'authoringSize':source_size,'derivation':'Linear area average; no mipmaps; at least two runtime texels between packed charts','rawMaximum':float(a.max()),'samples':json.loads((W/'bake-settings.json').read_text())['samples'],'authoringEXR':'well-irradiance.exr','orientation':'PNG top row is Cycles top row; glTF UV1 uses1-v'},indent=2)+'\n')
