"""Reference-visible exterior silhouettes shared by native probes and authoring.
Dimensions are image estimates; no change to the original yacht.
"""
import bpy
scene=bpy.context.scene
# Reference-visible side walkway and guardrails, outside the room's navigation.
from mathutils import Vector
sx=35.23/36;sy=7.47/7.6
for ob in list(scene.objects):
 if ob.name.startswith('A09 | Window surroundings'):bpy.data.objects.remove(ob,do_unlink=True)
def surround_box(kind,c,d):
 p=(c[1]*sy,-(c[0]*sx-17.615),c[2]-2.01);bpy.ops.mesh.primitive_cube_add(size=1,location=p);ob=bpy.context.object;ob.name='A09 | Window surroundings | '+kind;ob.dimensions=(d[1]*sy,d[0]*sx,d[2]);bpy.ops.object.transform_apply(location=False,rotation=False,scale=True);m=bpy.data.materials.get('Surroundings '+kind)
 if not m:
  m=bpy.data.materials.new('Surroundings '+kind);m.use_nodes=True;p=m.node_tree.nodes['Principled BSDF'];p.inputs['Base Color'].default_value=(*({'paint':(.73,.70,.63),'metal':(.03,.045,.05),'glass':(.20,.30,.34)}[kind]),1);p.inputs['Roughness'].default_value=.25 if kind=='metal'else .48;p.inputs['Metallic'].default_value=.75 if kind=='metal'else 0
  if kind=='glass':p.inputs['Alpha'].default_value=.12;m.surface_render_method='DITHERED'
 ob.data.materials.append(m);ob['componentID']='MD_R02/OBS/A09/window-surroundings';ob['dimensionStatus']='image-estimated';ob['lighting']='Local probe + live sun in viewer; excluded from ambient atlas'
for side in [-1,1]:
 surround_box('paint',(13.2,side*3.10,3.91),(9.2,.91,.07));surround_box('paint',(13.2,side*3.55,4.12),(9.2,.10,.43));surround_box('metal',(13.2,side*3.55,4.99),(9.2,.055,.035));surround_box('metal',(13.2,side*3.55,4.41),(9.2,.025,.02))
 for x in [8.72,11.0,13.3,15.6,17.7]:surround_box('metal',(x,side*3.55,4.46),(.045,.045,1.03))
 surround_box('glass',(13.2,side*3.55,4.68),(9.1,.01,.53))
