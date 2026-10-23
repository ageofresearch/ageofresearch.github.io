"""Make UV0 normal input and source vertex-color export explicit; preserve UV1."""
import bpy,json,hashlib
from pathlib import Path
R=Path(__file__).resolve().parents[1];W=R/'work/machinery-r11';A=R/'public/assets/machinery';S=bpy.context.scene
for m in bpy.data.materials:
 if not m.get('family'):continue
 for n in m.node_tree.nodes:
  if n.type=='NORMAL_MAP':
   for link in list(n.inputs['Strength'].links):m.node_tree.links.new(link.from_socket,n.inputs['Color']);m.node_tree.links.remove(link)
   n.inputs['Strength'].default_value=.10 if m['family']in['paint','metal']else .35
bpy.ops.object.select_all(action='DESELECT')
for o in S.objects:
 if o.name.startswith('LD_R02 |')and o.type=='MESH':o.data.color_attributes.active_color_index=0;o.data.color_attributes.render_color_index=0;o.select_set(True)
bpy.context.view_layer.objects.active=S.objects['LD_R02 | architecture'];bpy.ops.export_scene.gltf(filepath=str(W/'machinery-source.glb'),export_format='GLB',use_selection=True,export_extras=True,export_normals=True,export_texcoords=True,export_vertex_color='ACTIVE',export_all_vertex_colors=False)
binding=json.loads((A/'authoring.json').read_text());binding['bakeGeometrySHA256']=hashlib.sha256((W/'machinery-source.glb').read_bytes()).hexdigest();binding['explicitVertexColors']=True;binding.pop('rawBakesSHA256',None);binding.pop('probes',None);bpy.ops.wm.save_as_mainfile(filepath=str(W/'machinery-master.blend'),compress=True);binding['masterSHA256']=hashlib.sha256((W/'machinery-master.blend').read_bytes()).hexdigest();(A/'authoring.json').write_text(json.dumps(binding,indent=2)+'\n');print('Explicit source colors; UV coordinates retained',flush=True)
