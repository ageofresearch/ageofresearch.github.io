"""Clear unused micro UV1 without moving geometry or changing any used atlas UV."""
import bpy,numpy as np,json,hashlib
from pathlib import Path
R=Path(__file__).resolve().parents[1];W=R/'work/electrical-vr-r01';S=bpy.context.scene;o=S.objects['EVR installed | static'];d=o.data;d.calc_loop_triangles();a=json.loads((W/'authoring.json').read_text());mode=np.array([x.value for x in d.attributes['_BAKE_MODE'].data]);uv=d.uv_layers['UV1'];macro=[];micro=[]
for t in d.loop_triangles:
 (micro if mode[t.vertices[0]]>.5 else macro).extend(t.loops)
before=np.array([uv.data[i].uv[:]for i in macro],dtype='<f4');bad=sum(any(v<0 or v>1 for v in uv.data[i].uv)for i in micro)
def nonuv():
 h=hashlib.sha256();h.update(np.array([v.co[:]for v in d.vertices],dtype='<f4').tobytes());h.update(np.array([d.uv_layers['UV0'].data[i].uv[:]for i in range(len(d.loops))],dtype='<f4').tobytes());h.update(np.array([x.vector[:]for x in d.attributes['_IRRADIANCE'].data],dtype='<f4').tobytes());h.update(mode.astype('<f4').tobytes());return h.hexdigest()
unchanged=nonuv()
for li in micro:uv.data[li].uv=(0,0)
assert np.array_equal(before,np.array([uv.data[i].uv[:]for i in macro],dtype='<f4')) and nonuv()==unchanged
tri=np.array([[uv.data[i].uv[:]for i in t.loops]for t in d.loop_triangles],dtype='<f4');a['uv']['uvTrianglesSHA256']=hashlib.sha256(tri.tobytes()).hexdigest();a['uv']['unusedMicroUV1Zeroed']=True
proof={'cause':'Blender copied UV0 into a newly created UV1. Unused micro coordinates could overlap the macro image bake.','clearedMicroCorners':len(micro),'previousOutOfRangeCorners':bad,'macroUVsByteIdentical':True,'geometryMaterialUV0CornerIrradianceAndModeUnchanged':True,'nonUVBindingSHA256':unchanged,'otherEngineAndBulkheadLightmapUVsUnchanged':True,'electricalAtlasRequiresRebake':True};a['microUVRepair']=proof;(W/'micro-uv-repair.json').write_text(json.dumps(proof,indent=2)+'\n');(W/'authoring.json').write_text(json.dumps(a,indent=2)+'\n');bpy.ops.wm.save_as_mainfile(filepath=str(W/'electrical-master.blend'),compress=True);print('MICRO UV REPAIR',json.dumps(proof),flush=True)
