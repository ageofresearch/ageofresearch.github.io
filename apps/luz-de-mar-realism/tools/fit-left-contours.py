"""Freeze image-grid sculpt controls from the first unsculpted surface masks.

Only the observed outline is constrained. Vertex camera depth stays inferred;
this is single-view modelling, not a dimensional survey of the installation.
"""
from pathlib import Path
import json, numpy as np
from PIL import Image
from scipy.ndimage import binary_erosion,distance_transform_edt
R=Path(__file__).resolve().parents[1];W=R/'work/left-engine-r13';review=W/'review/grid'
annotations=json.loads((review/'contours.json').read_text())['contours'];fit=json.loads((W/'grid-fit.json').read_text());groups={}
def kernel(a,b):
 r=np.linalg.norm(a[:,None,:]-b[None,:,:],axis=2);return r*r*np.log(np.maximum(r,1e-10))
for item in annotations:
 name=item['group'];image=Image.open(W/'review'/('mask-'+name+'.png')).convert('RGBA');a=np.asarray(image)[:,:,3]>128;edge=a&~binary_erosion(a);distance,indices=distance_transform_edt(~edge,return_indices=True);pairs=[]
 for target in item['points']:
  x,y=target;sy,sx=indices[:,y,x];pairs.append([[int(sx),int(sy)],target])
 # Preserve independently fitted connection and cuff centers while sculpting
 # the silhouette. Multiple border controls may share a source pixel.
 if name=='jacket':
  for id in ['cuff']:
   r=next(x for x in fit['controls']if x['id']==id);pairs.append([r['actual'],r['expected']])
 # Extents beyond the available cube image remain inferred. Pin the vertical
 # tube center, preventing an unconstrained global translation of the assembly.
 if name=='exhaust':pairs.append([[1170,960],[1170,940]])
 unique={}
 for p,q in pairs:unique.setdefault(tuple(p),[]).append(q)
 points=np.array(list(unique),float)/2048;target=np.array([np.mean(q,axis=0)for q in unique.values()])/2048;delta=target-points;n=len(points);P=np.c_[np.ones(n),points];K=kernel(points,points);smooth=.0004 if name=='jacket'else 2e-7
 system=np.block([[K+np.eye(n)*smooth,P],[P.T,np.zeros((3,3))]]);coeff=np.linalg.solve(system,np.r_[delta,np.zeros((3,2))])
 groups[name]={'sourcePixels':(points*2048).tolist(),'targetPixels':(target*2048).tolist(),'points':points.tolist(),'weights':coeff[:n].tolist(),'affine':coeff[n:].tolist(),'smoothing':smooth,'method':'Thin-plate grid sculpt, fixed source station, unchanged per-vertex camera depth; inferred hidden surfaces'}
 output=R/'tools/left-engine-grid-controls.json';output.write_text(json.dumps({'version':1,'stationSource':[9.15,0,3.18],'cubeSize':2048,'groups':groups},indent=2)+'\n')
print('Frozen grid sculpt:',[(k,len(v['points']))for k,v in groups.items()])
