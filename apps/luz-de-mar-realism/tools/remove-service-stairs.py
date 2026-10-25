"""R04: remove the misplaced service stair, without relocating its components.

Run against the frozen R03 master. Electrical controls, engines and retained
context keep their positions, UVs and split normals. R03 remains the archive.
"""
import ast, hashlib, json, os
from pathlib import Path
import bpy
import numpy as np

R = Path(__file__).resolve().parents[1]
W = Path(os.environ['ELECTRICAL_AUTHORING_WORK'])
S = bpy.context.scene
a = json.loads((W / 'input-authoring.json').read_text())
m = json.loads((R / 'work/machinery-r11/snapshot/machinery.json').read_text())
b = (R / 'work/machinery-r11/snapshot/machinery.bin').read_bytes()
v = np.frombuffer(b, dtype='<f4', count=m['vertices'] * 11).reshape(-1, 11)[:, :3]
ix = np.frombuffer(b, dtype='<u4', offset=m['vertexBytes'], count=m['triangles'] * 3).reshape(-1, 3)
parts = np.frombuffer(b, dtype='<u4', offset=m['vertexBytes'] + m['indexBytes'], count=m['triangles'])
ids = [p['id'] for p in m['parts'] if p['id'].startswith('LD/service-route/')
       and (67 <= int(p['id'].split('/')[-1]) <= 124
            or int(p['id'].split('/')[-1]) in [127, 129, 130, 131])]

def key(points):
    return tuple(sorted(tuple(round(float(c), 5) for c in p) for p in points))

drop = {key(v[t]) for t, p in zip(ix, parts) if m['parts'][int(p)]['id'] in ids}
for n in ast.parse((R / 'tools/build-left-engine.py').read_text()).body:
    if isinstance(n, ast.FunctionDef) and n.name == 'filtered':
        exec(compile(ast.Module(body=[n], type_ignores=[]), __file__, 'exec'), globals())

removed = []
hero = S.objects['EVR installed | static']
for o in list(S.objects):
    if o.type != 'MESH' or o == hero:
        continue
    if o.name.startswith(('EVR |', 'BVR |', 'LVR |', 'RVR |')):
        continue
    if o.name.startswith('CLEARANCE/'):
        removed.append({'object': o.name, 'triangles': len(o.data.polygons), 'kind': 'R03 editable stair part'})
        bpy.data.objects.remove(o, do_unlink=True)
        continue
    keep = []
    for f in o.data.polygons:
        points = [o.matrix_world @ o.data.vertices[i].co for i in f.vertices]
        if key([(p.x, p.z, -p.y) for p in points]) not in drop:
            keep.append(f.index)
    if len(keep) == len(o.data.polygons):
        continue
    removed.append({'object': o.name, 'triangles': len(o.data.polygons) - len(keep), 'kind': 'original source stair'})
    if keep:
        q = filtered(o, keep, 'R04 without stairs | ' + o.name)
        q.matrix_world = o.matrix_world.copy()
        q.hide_render, q.hide_viewport = o.hide_render, o.hide_viewport
        # Preserve the original collection visibility, including authoring-only
        # source pieces which must never become extra render occluders.
        for c in list(q.users_collection): c.objects.unlink(q)
        for c in o.users_collection: c.objects.link(q)
    bpy.data.objects.remove(o, do_unlink=True)

d = hero.data
keep = [f.index for f in d.polygons if all(d.attributes['_CLEARANCE_ID'].data[i].value < 1.5 for i in f.vertices)]
oldloops = [li for i in keep for li in d.polygons[i].loop_indices]
oldverts = sorted({i for f in keep for i in d.polygons[f].vertices})
replacement = filtered(hero, keep, 'EVR installed | no stairs')
replacement.matrix_world = hero.matrix_world.copy()
for name in ['_BAKE_MODE', '_CLEARANCE_ID', '_IRRADIANCE']:
    old = d.attributes[name]
    attr = replacement.data.attributes.new(name=name, type=old.data_type, domain=old.domain)
    source = oldverts if old.domain == 'POINT' else oldloops
    field = 'vector' if old.data_type == 'FLOAT_VECTOR' else 'value'
    data = np.array([getattr(old.data[i], field) for i in source], dtype=np.float32)
    attr.data.foreach_set(field, data.ravel())
removed.append({'object': hero.name, 'triangles': len(d.polygons)-len(keep), 'kind': 'R03 merged stair assembly'})
bpy.data.objects.remove(hero, do_unlink=True)
replacement.name = 'EVR installed | static'
d = replacement.data
d.calc_loop_triangles()
uv = np.array([[d.uv_layers['UV1'].data[li].uv[:] for li in t.loops] for t in d.loop_triangles], dtype='<f4')
atlas = np.array([d.attributes['_BAKE_MODE'].data[t.vertices[0]].value < .5 for t in d.loop_triangles])
du, dv = uv[:, 1]-uv[:, 0], uv[:, 2]-uv[:, 0]
area = np.abs(du[:, 0]*dv[:, 1]-du[:, 1]*dv[:, 0])/2
assert len(d.loop_triangles) == 114578
assert area[atlas].sum() >= .4 and not (area[atlas] < 1e-12).any()
a.update(version=4, id='electrical-no-stairs-r04', parentAuthoringVersion='electrical-clearance-r03',
         parentProductionMasterSHA256=a['masterSHA256'],
         sourceMasterSHA256=hashlib.sha256(Path(bpy.data.filepath).read_bytes()).hexdigest(), staticTriangles=len(d.loop_triangles),
         triangles=len(d.loop_triangles)+44, editableObjects=1510,
         stage='Stairs removed at user request; relocation deferred.', removedSourceIDs=ids,
         stairRemoval={'sourceIDs': ids, 'objects': removed, 'relocated': False,
                       'retained': ['electrical controls', 'engine geometry and finishes', 'door', 'floor', 'structural walls and ceilings'],
                       'R03ArchiveRetained': True})
a['uv'].update(coverage=float(area[atlas].sum()), uvTrianglesSHA256=hashlib.sha256(uv.tobytes()).hexdigest(),
               atlasTriangles=int(atlas.sum()), vertexIrradianceTriangles=int((~atlas).sum()))
a['parentClearance'] = a.pop('clearance', None)
a.pop('runtimeUVBinding', None)
a['uv']['packing']['retainedLayoutAfterRemoval'] = True
replacement['sourceIDs'] = json.dumps([x for x in json.loads(replacement['sourceIDs']) if not x.startswith('CLEARANCE/')])
inventory = json.loads((W/'input-component-inventory.json').read_text())
(W/'component-inventory.json').write_text(json.dumps([x for x in inventory if not x['id'].startswith('CLEARANCE/')], indent=2)+'\n')
(W/'removal.json').write_text(json.dumps(a['stairRemoval'], indent=2)+'\n')
S['R04 scope'] = 'Service stairs, casings and their handrail removed. Relocation intentionally deferred.'
S.render.use_file_extension = True
bpy.ops.wm.save_as_mainfile(filepath=str(W/'electrical-master.blend'), compress=True)
a['masterSHA256'] = hashlib.sha256((W/'electrical-master.blend').read_bytes()).hexdigest()
(W/'authoring.json').write_text(json.dumps(a, indent=2)+'\n')
print('R04 STAIR REMOVAL', a['triangles'], a['uv']['coverage'], json.dumps(removed), flush=True)
