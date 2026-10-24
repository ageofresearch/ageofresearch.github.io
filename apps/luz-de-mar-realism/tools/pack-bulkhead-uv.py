"""xatlas UV1 only: preserve every source position, face order and material UV."""
import sys,json
from pathlib import Path
import numpy as np
try:import xatlas
except ImportError:
 sys.path.insert(0,'/tmp/luz-xatlas');import xatlas
source=np.load(sys.argv[1]);positions=source['positions'].astype(np.float32);indices=source['indices'].astype(np.uint32)
atlas=xatlas.Atlas();atlas.add_mesh(positions,indices)
charts=xatlas.ChartOptions();charts.max_iterations=2;charts.texture_seam_weight=0
packing=xatlas.PackOptions();packing.resolution=1700;packing.padding=4;packing.bilinear=True;packing.rotate_charts=True
for attempt in range(4):
 atlas.generate(chart_options=charts,pack_options=packing)
 if max(atlas.width,atlas.height)<=2048:break
 packing.resolution=int(packing.resolution*.85)
else:raise RuntimeError('Atlas exceeds 2048; retain the four-pixel padding')
mapping,new_indices,uvs=atlas[0]
assert atlas.atlas_count==1,('Multiple atlases',atlas.atlas_count)
assert np.array_equal(positions[mapping[new_indices]],positions[indices]),'Atlas changed the corner correspondence'
corner_uvs=uvs[new_indices];a=corner_uvs[:,1]-corner_uvs[:,0];b=corner_uvs[:,2]-corner_uvs[:,0];areas=np.abs(a[:,0]*b[:,1]-a[:,1]*b[:,0])/2
report={'method':'xatlas 0.0.11; independent UV1 charts, source geometry and UV0 unchanged','atlasCount':atlas.atlas_count,'width':atlas.width,'height':atlas.height,'utilization':atlas.utilization,'coverage':float(areas.sum()),'paddingPixels':4,'effectivePaddingAt2048':4*2048/max(atlas.width,atlas.height),'charts':atlas.chart_count}
np.savez_compressed(sys.argv[2],corner_uvs=corner_uvs)
Path(sys.argv[2]+'.json').write_text(json.dumps(report,indent=2)+'\n');print(json.dumps(report),flush=True)
