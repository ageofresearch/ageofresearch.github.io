"""Independent decoded-GLB check: none of the old KOHLER surfaces may remain.

Run with the untouched R04 input Blender. New generator surfaces are identified
by their exported generator ID and excluded from this residual-old-mesh check.
"""
import bpy,os,json,numpy as np
from pathlib import Path
from mathutils import Vector
from mathutils.bvhtree import BVHTree
W=Path(os.environ['ELECTRICAL_AUTHORING_WORK']);m=json.loads((W/'audit/generator-triangles.json').read_text());rows=np.fromfile(W/'audit/generator-triangles.bin',dtype='<f8').reshape(-1,10);keep=[m['names'][str(int(i))].startswith('electrical | ')for i in rows[:,9]];points=rows[keep,:9].reshape(-1,3);tree=BVHTree.FromPolygons([Vector(p)for p in points],np.arange(len(points)).reshape(-1,3).tolist(),all_triangles=True);deps=bpy.context.evaluated_depsgraph_get();residual=[];tested=0;minimum=100
for o in bpy.data.collections['EDITABLE | VR electrical'].objects:
 if o.get('assembly')!='side-context':continue
 ev=o.evaluated_get(deps);d=ev.to_mesh();d.calc_loop_triangles()
 for tri in d.loop_triangles:
  ps=[o.matrix_world@d.vertices[i].co for i in tri.vertices]
  if(ps[1]-ps[0]).cross(ps[2]-ps[0]).length/2<1.2e-7:continue
  p=sum(ps,Vector())/3;p=Vector((p.x,p.z,-p.y));near=tree.find_nearest(p);tested+=1;minimum=min(minimum,near[3])
  if near[3]<.0003:residual.append({'component':o.get('componentID',o.name),'triangle':tri.index,'distanceMetres':near[3],'nearestRetainedMaterial':m['names'][str(int(rows[keep][near[2],9]))],'nearestTriangleWeb':rows[keep][near[2],:9].tolist()})
 ev.to_mesh_clear()
report={'pass':not residual,'runtimeGeometrySHA256':m['runtimeGeometrySHA256'],'oldAuthoredSurfaceCentroidsTested':tested,'residualMatches':residual,'minimumDistanceToRetainedFrontMetres':minimum,'toleranceMetres':.0003,'method':'Old evaluated proxy triangles from the immutable R04 Blender versus only retained electrical triangles decoded from the actual new GLB. New generator triangles are excluded; submillimetre slivers excluded as in the original derivative.'};(W/'proxy-residual-proof.json').write_text(json.dumps(report,indent=2)+'\n');print('EXPORTED OLD PROXY RESIDUALS',len(residual),'of',tested);assert report['pass']
