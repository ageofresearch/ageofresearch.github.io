"""Run on the immutable generator R01 master before constructing the union."""
import bpy,json,os
from pathlib import Path
W=Path(os.environ.get('PEDESTAL_WORK','/tmp/ldm-pedestal-r01'));W.mkdir(parents=True,exist_ok=True)
names=['EVR | vented pedestal '+s for s in ['upper plate','front upper web','side -0.902','side 0.902']]
for name in names:
 o=bpy.data.objects[name];o.hide_viewport=False;o.hide_set(False)
bpy.context.view_layer.update();deps=bpy.context.evaluated_depsgraph_get();parts=[]
for name in names:
 o=bpy.data.objects[name];ev=o.evaluated_get(deps);d=ev.to_mesh();d.calc_loop_triangles()
 parts.append({'name':name,'positions':[(o.matrix_world@v.co)[:]for v in d.vertices],'triangles':[t.vertices[:]for t in d.loop_triangles]});ev.to_mesh_clear()
(W/'source-parts.json').write_text(json.dumps(parts));print('EXTRACTED PEDESTAL PARTS',len(parts))
