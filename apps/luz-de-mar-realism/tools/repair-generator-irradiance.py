"""Repair only new micro irradiance; retain every physical surface and HDR file."""
import bpy,os,json,hashlib,runpy,numpy as np
from pathlib import Path
R=Path(__file__).resolve().parents[1];W=Path(os.environ['ELECTRICAL_AUTHORING_WORK']);o=bpy.context.scene.objects['EVR installed | static'];d=o.data
def physical():
 h=hashlib.sha256()
 for data,field,count in [(d.vertices,'co',3),(d.loops,'vertex_index',1),(d.corner_normals,'vector',3)]:
  v=np.empty(len(data)*count,dtype=np.float64 if field!='vertex_index'else np.int32);data.foreach_get(field,v);h.update(v.tobytes())
 for uv in d.uv_layers:
  v=np.empty(len(uv.data)*2,dtype=np.float32);uv.data.foreach_get('uv',v);h.update(uv.name.encode());h.update(v.tobytes())
 for name in ['_GENERATOR_ID','_BAKE_MODE','_CLEARANCE_ID']:
  v=np.empty(len(d.attributes[name].data),dtype=np.float32);d.attributes[name].data.foreach_get('value',v);h.update(v.tobytes())
 v=np.empty(len(d.polygons),dtype=np.int32);d.polygons.foreach_get('material_index',v);h.update(v.tobytes());h.update('|'.join(m.name for m in d.materials).encode());return h.hexdigest()
before=physical();values=np.empty(len(d.loops)*3,dtype=np.float32);d.attributes['_IRRADIANCE'].data.foreach_get('vector',values);values=values.reshape(-1,3)
np.savez_compressed(W/'raw/electrical-corner-irradiance-unsmoothed.npz',irradiance=values)
values,proof=runpy.run_path(str(R/'tools/generator-irradiance.py'))['continuous_generator_irradiance'](d,values)
d.attributes['_IRRADIANCE'].data.foreach_set('vector',values.ravel());np.savez_compressed(W/'raw/electrical-corner-irradiance.npz',irradiance=values)
assert physical()==before
lighting=json.loads((W/'lighting.json').read_text());lighting['cornerIrradiance']['continuity']=proof;lighting['cornerIrradiance']['sha256']=hashlib.sha256(values.astype('<f4').tobytes()).hexdigest();(W/'lighting.json').write_text(json.dumps(lighting,indent=2)+'\n')
a=json.loads((W/'authoring.json').read_text());a['lighting']=lighting;a['generatorCornerContinuity']=proof;(W/'authoring.json').write_text(json.dumps(a,indent=2)+'\n')
proof.update({'pass':True,'physicalBindingSHA256':before,'geometryNormalsUV0UV1MaterialsAndModeUnchanged':True,'atlasesAndReflectionProbesReusedBecausePhysicalSceneUnchanged':True})
(W/'corner-continuity-proof.json').write_text(json.dumps(proof,indent=2)+'\n');bpy.ops.wm.save_as_mainfile(filepath=str(W/'electrical-master.blend'),compress=True);print('GENERATOR CORNER CONTINUITY',json.dumps(proof),flush=True)
