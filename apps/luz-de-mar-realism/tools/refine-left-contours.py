"""Add one residual contour fit, preserving held-out observations for evaluation."""
from pathlib import Path
import json,numpy as np
from PIL import Image
from scipy.ndimage import binary_erosion,distance_transform_edt
R=Path(__file__).resolve().parents[1];W=R/'work/left-engine-r13';target=R/'tools/left-engine-r13-contours.json'
record=json.loads(target.read_text())if target.exists()else{'version':1,'stages':[],'method':'Residual adjustment of training contours only; held-out edge observations are never used as controls.'}
groups={}
for item in json.loads((W/'review/grid/contours.json').read_text())['contours']:
 mask=np.asarray(Image.open(W/'review'/('mask-'+item['group']+'.png')).convert('RGBA'))[:,:,3]>128;edge=mask&~binary_erosion(mask,border_value=1);distance,indices=distance_transform_edt(~edge,return_indices=True);unique={}
 for x,y in item['points']:
  yy,xx=indices[:,y,x];unique.setdefault((int(xx),int(yy)),[]).append([x,y])
 points=np.array(list(unique),float)/2048;targets=np.array([np.mean(v,axis=0)for v in unique.values()])/2048;n=len(points);r=np.linalg.norm(points[:,None]-points[None,:],axis=2);K=r*r*np.log(np.maximum(r,1e-10));P=np.c_[np.ones(n),points];smooth=2e-6
 weights=np.linalg.solve(np.block([[K+smooth*np.eye(n),P],[P.T,np.zeros((3,3))]]),np.r_[targets-points,np.zeros((3,2))])
 groups[item['group']]={'points':points.tolist(),'weights':weights[:n].tolist(),'affine':weights[n:].tolist(),'smoothing':smooth,'sourcePixels':(points*2048).tolist(),'targetPixels':(targets*2048).tolist()}
record['stages'].append({'groups':groups});target.write_text(json.dumps(record,indent=2)+'\n');print('Residual contour stage',len(record['stages']))
