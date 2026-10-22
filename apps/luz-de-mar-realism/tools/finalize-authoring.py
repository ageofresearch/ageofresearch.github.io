"""Update editable saloon scene with the published atlases and matched finish controls."""
import bpy,json,hashlib
from pathlib import Path
root=Path(__file__).resolve().parents[1];scene=bpy.context.scene
currentAtlases={}
for atlas in ['architecture','furniture']:
 im=bpy.data.images.load(str(root/'public/assets/saloon'/('ambient-'+atlas+'.exr')),check_existing=False);im.pack();currentAtlases[atlas]=im
for mat in bpy.data.materials:
 if not mat.use_nodes:continue
 for normalNode in mat.node_tree.nodes:
  if normalNode.type=='NORMAL_MAP':normalNode.inputs['Strength'].default_value=1 if mat.get('family')=='boucle'else .55 if mat.get('family')=='fabric'else .4 if mat.get('family')in ['carpet','cloudrug']else .22
 node=mat.node_tree.nodes.get('BAKE | linear ambient only');atlas=mat.get('lightmap')
 if node and atlas in ['architecture','furniture']:
  node.image=currentAtlases[atlas]
 if mat.get('family')=='wood'and mat.get('roughnessFactor',1)<.6:
  for node in mat.node_tree.nodes:
   if node.type=='MATH'and node.operation=='MULTIPLY':node.inputs[1].default_value=.14
  p=mat.node_tree.nodes.get('Principled BSDF');p.inputs['Coat Weight'].default_value=.9;p.inputs['Coat Roughness'].default_value=.06
# Store source irradiance as packed half-float files, avoiding redundant full-float generated buffers.
binding=json.loads((root/'public/assets/saloon/authoring.json').read_text()).get('bakeGeometrySHA256')
if binding:
 for atlas in ['architecture','furniture']:
  file=root/'work/raw-atlases'/binding/('saloon-ambient-'+atlas+'.exr')
  raw=bpy.data.images.load(str(file),check_existing=True);raw.use_fake_user=True;raw.pack()
 for im in list(bpy.data.images):
  if (im.name.startswith('REPACK ')or(im.source=='GENERATED'and('saloon-'in im.name or 'RAW CURRENT'in im.name)))and im.users<=1:bpy.data.images.remove(im)
# Shared reference-visible window context is also present in reflection captures.
import runpy
runpy.run_path(str(root/'tools/native-surroundings.py'))
# Discard obsolete packed bake files from earlier UV bindings.
needed={n.image for m in bpy.data.materials if m.use_nodes for n in m.node_tree.nodes if n.type=='TEX_IMAGE'and n.image}
needed.update(n.image for n in scene.world.node_tree.nodes if n.type=='TEX_ENVIRONMENT'and n.image)
needed.update(i for i in bpy.data.images if binding and binding in i.filepath)
for im in list(bpy.data.images):
 if im not in needed and im.source in ['FILE','GENERATED']:bpy.data.images.remove(im);continue
 if im.source=='FILE'and im.name.startswith('saloon-ambient-')and binding and binding not in im.filepath:
  im.use_fake_user=False
  if im.users==0:bpy.data.images.remove(im)
scene['reference_360']='https://vrcloud.com/?pv=1667308298 | Azimut Grande 36M, vessel identity not verified';scene['release_scope']='Salón principal MD_R02 only';scene['lighting_note']='Ambient bakes exclude runtime sun. Linear HDR denoised with OIDN CPU RTLightmap; atlas UVs preserved in optimized glTF.'
for im in bpy.data.images:
 if im.source=='FILE'and im.filepath:
  if not im.packed_file:im.reload()
  im.pack()
  assert im.packed_file,'Unpacked authoring image: '+im.name
bpy.ops.wm.save_as_mainfile(filepath=str(root/'work/saloon-master.blend'),compress=True)
p=root/'public/assets/saloon/authoring.json';j=json.loads(p.read_text());j['denoise']='Intel Open Image Denoise 2.5.1 CPU RTLightmap, linear HDR full-atlas filtering; original 96-sample bakes retained in authoring archive';j['finishControls']={'wood':{'roughness':.14,'clearcoat':.9,'clearcoatRoughness':.06},'normalStrength':{'boucle':1,'fabric':.55,'carpet':.4,'cloudrug':.4,'other':.22}};j['masterSHA256']=hashlib.sha256((root/'work/saloon-master.blend').read_bytes()).hexdigest();p.write_text(json.dumps(j,indent=2)+'\n')
