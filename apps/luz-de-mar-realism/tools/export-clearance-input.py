"""Export the frozen R02 assembly for a physical before/after proof; never save input."""
import bpy,os
from pathlib import Path
R=Path(__file__).resolve().parents[1];W=Path(os.environ.get('ELECTRICAL_AUTHORING_WORK',R/'work/electrical-clearance-r03'))
bpy.ops.object.select_all(action='DESELECT');hero=bpy.data.objects['EVR installed | static'];hero.select_set(True);bpy.context.view_layer.objects.active=hero
for o in bpy.context.scene.objects:
 if o.get('appearanceDoor')and o.data.attributes.get('_BAKE_MODE'):o.select_set(True)
bpy.ops.export_scene.gltf(filepath=str(W/'input-electrical-source.glb'),export_format='GLB',use_selection=True,export_extras=True,export_normals=True,export_texcoords=True,export_attributes=True,export_vertex_color='NONE')
