"""Orient exposed horizontal single-face panels upward before baking.
Blender's recalc on an isolated open ngon cannot determine an enclosed volume.
Closed furniture meshes retain their existing outward normals.
"""
import bpy
from pathlib import Path
R=Path(__file__).resolve().parents[1];S=bpy.context.scene;fixed=[]
for col in S.collection.children:
 if not col.name.startswith('EDITABLE |'):continue
 for o in col.objects:
  if o.type!='MESH'or len(o.data.polygons)!=1:continue
  normal=o.matrix_world.to_3x3()@o.data.polygons[0].normal
  if normal.z<-.7:
   o.data.flip_normals();o.data.update();o['surfaceNormal']='Exposed horizontal panel, upward';fixed.append(o.name)
S['openSurfaceNormalCorrections']=fixed;bpy.ops.wm.save_as_mainfile(filepath=str(R/'work/exteriors-upward.blend'),compress=True);print('UPWARD SURFACES',fixed,flush=True)
