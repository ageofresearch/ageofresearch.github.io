"""Pack lightmap UVs with a coverage gate; reject collapsed furniture atlases."""
import bpy,math,numpy as np,hashlib
from pathlib import Path

def prepare_uv(ob,atlas,root):
 d=ob.data;d.uv_layers.active_index=1;margin=.006;stats=None
 for attempt in range(7):
  bpy.ops.object.select_all(action='DESELECT');ob.select_set(True);bpy.context.view_layer.objects.active=ob;bpy.ops.object.mode_set(mode='EDIT');bpy.ops.mesh.select_all(action='SELECT');bpy.ops.uv.smart_project(angle_limit=math.radians(68),island_margin=margin,margin_method='FRACTION',area_weight=.15,scale_to_bounds=True);bpy.ops.object.mode_set(mode='OBJECT')
  d.calc_loop_triangles();coords=np.array([v.uv[:]for v in d.uv_layers[1].data],dtype=np.float32);indices=np.array([t.loops[:]for t in d.loop_triangles],dtype=np.int32);tri=coords[indices];a=tri[:,1]-tri[:,0];b=tri[:,2]-tri[:,0];areas=np.abs(a[:,0]*b[:,1]-a[:,1]*b[:,0])*.5;coverage=float(areas.sum());degenerate=float((areas<1e-12).mean());print('UV COVERAGE',atlas,margin,coverage,degenerate,flush=True)
  if coverage>(.4 if atlas=='architecture'else .25)and degenerate<.05:break
  margin*=.5
 else:raise RuntimeError('Lightmap UV coverage failed: '+atlas)
 folder=Path(root)/'work/lightmap-uv';folder.mkdir(exist_ok=True);file=folder/(atlas+'.npz');np.savez_compressed(file,triangles=tri)
 d.uv_layers.active_index=0;d.uv_layers[0].active_render=True
 return {'marginMethod':'FRACTION','islandMargin':margin,'coverage':coverage,'degenerateTriangleFraction':degenerate,'bakeMarginPixels':max(1,int(margin*2048*.34)),'uvTrianglesSHA256':hashlib.sha256(file.read_bytes()).hexdigest()}
