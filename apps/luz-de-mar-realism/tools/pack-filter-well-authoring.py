"""Embed the owned runtime maps in the matching editable Blender scene."""
import bpy,os
from pathlib import Path
W=Path(os.environ.get('FILTER_WELL_WORK','/tmp/ldm-filter-well-r01'))
for family in['enamel','galvanized','floor']:
 m=bpy.data.materials['FW | '+family];nodes=m.node_tree.nodes;links=m.node_tree.links;p=nodes['Principled BSDF'];uv=nodes.new('ShaderNodeUVMap');uv.uv_map='UV0'
 for kind in['color','orm','normal']:
  image=bpy.data.images.load(str(W/'textures'/f'{family}-{kind}.png'),check_existing=True);image.colorspace_settings.name='sRGB'if kind=='color'else'Non-Color';image.pack();n=nodes.new('ShaderNodeTexImage');n.image=image;n.extension='REPEAT';n.name='OWN MAP | '+kind;links.new(uv.outputs['UV'],n.inputs['Vector'])
  if kind=='color':links.new(n.outputs['Color'],p.inputs['Base Color'])
  elif kind=='orm':
   split=nodes.new('ShaderNodeSeparateColor');links.new(n.outputs['Color'],split.inputs['Color']);links.new(split.outputs['Green'],p.inputs['Roughness']);links.new(split.outputs['Blue'],p.inputs['Metallic'])
  else:
   normal=nodes.new('ShaderNodeNormalMap');normal.inputs['Strength'].default_value=.18;links.new(n.outputs['Color'],normal.inputs['Color']);links.new(normal.outputs['Normal'],p.inputs['Normal'])
hdr=bpy.data.images.load(str(W/'well-irradiance.exr'),check_existing=True);hdr.colorspace_settings.name='Linear Rec.709';hdr.pack()
for m in bpy.data.materials:
 if m.use_nodes:
  for n in m.node_tree.nodes:
   if n.type=='TEX_IMAGE'and n.name=='BAKE | well spatial irradiance':n.image=hdr
for image in list(bpy.data.images):
 if image.name=='Well linear diffuse irradiance'and image.users==0:bpy.data.images.remove(image)
bpy.context.scene['runtimeMaps']='Own procedural maps embedded; no photo pixels. UV0 is in physical 12cm units, UV1 is dedicated to lighting.'
bpy.ops.wm.save_as_mainfile(filepath=str(W/'filter-well-master.blend'),compress=True)
