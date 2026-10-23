"""Check the deliverable scene without modifying it."""
import bpy,json,hashlib,numpy as np,math
from mathutils import Vector
from pathlib import Path
R=Path(__file__).resolve().parents[1];W=R/'work/machinery-r11';b=json.loads((R/'public/assets/machinery/authoring.json').read_text());S=bpy.context.scene
assert S.unit_settings.system=='METRIC';assert len(bpy.data.collections['EDITABLE | machinery'].objects)==1043;assert bpy.data.collections['EDITABLE | machinery'].hide_render
engines=[o for o in S.objects if o.name.startswith('mtu-r03 |')];filters=[o for o in S.objects if o.name.startswith('sea-strainers |')];assert len(engines)==len(filters)==2;assert engines[0].data is engines[1].data and filters[0].data is filters[1].data
sx=35.23/36;sy=7.47/7.6
def point(p):return Vector((p[1]*sy,-(p[0]*sx-17.615),p[2]-2.01))
rows=[]
for o in engines:
 sign=1 if'Babor'in o.name else-1;actual=o.matrix_world@Vector((-1.089,0,.52));expected=point([9.72,sign*1.2,1.94]);error=(actual-expected).length;assert error<1e-6
 vertices=np.array([v.co[:]for v in o.data.vertices]);low=vertices.min(0);high=vertices.max(0);assert np.max(abs((high-low)-np.array([2.258,1.293,1.453])))<.005;assert abs(o.matrix_world.to_3x3().determinant()-1)<1e-6
 rows.append({'side':'port'if sign>0 else'starboard','couplingErrorMetres':error,'nativeBounds':[low.tolist(),high.tolist()],'footSourceZ':float(low[2]+1.42),'topSourceZ':float(high[2]+1.42)})
assert len([o for o in S.objects if o.type=='LIGHT'and o.data.type=='AREA'])==7;assert len([o for o in S.objects if o.type=='LIGHT'and o.data.type=='SPOT'])==2
assert len(bpy.data.collections['VR | machinery supplements'].objects)==9
external=[im.name for im in bpy.data.images if im.source=='FILE'and im.has_data and not im.packed_file];assert not external,external
assert S.camera.data.type=='PERSP';assert abs(S.view_settings.exposure-math.log2(b['lights']['exposure']))<1e-5
native=W/'machinery-master.blend';sha=hashlib.sha256(native.read_bytes()).hexdigest();assert sha==b['masterSHA256'];report={'pass':True,'masterSHA256':sha,'editableRecords':1043,'sharedNativeEngineMesh':True,'sharedNativeFilterMesh':True,'areaLights':7,'workBeams':2,'vrSupplementObjects':9,'imagesPacked':True,'placements':rows,'scope':'Digital source placement and nominal exterior dimensions; not an as-built survey'};(W/'native-verification.json').write_text(json.dumps(report,indent=2)+'\n');print('NATIVE SCENE VERIFIED',sha,flush=True)
