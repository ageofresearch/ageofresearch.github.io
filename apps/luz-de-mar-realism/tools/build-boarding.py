"""VR boarding candidate. Originals and machinery are never opened for writing."""
import bpy,bmesh,math,json,hashlib,importlib.util,runpy
from pathlib import Path
from mathutils import Vector
R=Path(__file__).resolve().parents[1];W=R/'work/boarding-vr-r01';A=R/'public/assets'
bpy.ops.wm.open_mainfile(filepath=str(R/'work/exteriors-final.blend'))
S=bpy.context.scene;S.name='Boarding VR R01 | editable candidate';S.render.engine='CYCLES';S.cycles.samples=64;S.render.threads_mode='FIXED';S.render.threads=4
spec=importlib.util.spec_from_file_location('p',R/'tools/exterior-primitives.py');P=importlib.util.module_from_spec(spec);spec.loader.exec_module(P);P.configure(R);P.zone('beach-club')
coll=bpy.data.collections['EDITABLE | beach-club'];cock=bpy.data.collections['EDITABLE | cockpit'];removed=[]
for o in list(coll.objects):
 if o.name.startswith('B02 Port')or o.name=='B03 Sculpted transom shoulder.001':removed.append({'id':o.get('componentID'),'name':o.name});bpy.data.objects.remove(o,do_unlink=True)
white=bpy.data.materials['Gloss ivory marine enamel | beach-club'];steel=bpy.data.materials['Polished marine stainless steel | none'];wood=bpy.data.materials['Pale oiled exterior timber | beach-club'];grey=bpy.data.materials['Satin transom grey | beach-club'];black=P.material('BVR dark mechanism',(.025,.030,.033),'paint',.55,0)
rubber=black.copy();rubber.name='BVR joint elastomer';rubber['roughnessFactor']=.78;rubber.node_tree.nodes['Principled BSDF'].inputs['Roughness'].default_value=.78
body=grey.copy();body.name='BVR moulded transom grey';body['roughnessFactor']=.22;body.node_tree.nodes['Principled BSDF'].inputs['Roughness'].default_value=.22
underwood=wood.copy();underwood.name='BVR timber underside';underwood['baseColorFactor']=[.48,.22,.075];underwood.diffuse_color=(.48,.22,.075,1)
for node in underwood.node_tree.nodes:
 if node.type=='MIX_RGB'and node.blend_type=='MULTIPLY':node.inputs[1].default_value=(.48,.22,.075,1)
box=P.box;tube=P.tube;mesh=P.mesh
def arcpoints(x,y,z0,z1,n=12):return[(x,y,z0+(z1-z0)*i/n)for i in range(n+1)]
def bolt(name,c,r=.008,mat=steel):
 o=P.cylinder(name,c,r,r,.006,mat);return o
def strip(name,x0,x1,y0,y1,z,mat=wood):return box(name,((x0+x1)/2,(y0+y1)/2,z-.014),(x1-x0,y1-y0,.028),mat,.006)
def planks(name,x0,x1,y0,y1,z):
 strip(name+' margin port',x0,x1,y1-.065,y1,z);strip(name+' margin starboard',x0,x1,y0,y0+.065,z)
 for x in[x0+.035,x1-.035]:strip(name+' end margin',x-.033,x+.033,y0+.068,y1-.068,z)
 width=y1-y0-.14;num=max(1,round(width/.085));dy=width/num
 box(name+' dark caulk bed',((x0+x1)/2,(y0+y1)/2,z-.026),(x1-x0-.13,width,.012),rubber,.002)
 for i in range(num):strip(name+' longitudinal stave',x0+.07,x1-.07,y0+.07+i*dy+.002,y0+.07+(i+1)*dy-.002,z)
# Gangway on the outboard side of the stair: perspective overlap is not a
# physical staircase roof. The reverse/upper surfaces are explicitly inferred.
y=3.40;edge=[2.94,3.76];start=-.30;end=3.46;top=3.95
sections=[(-.30,.97,.76),(.97,2.20,.80),(2.20,3.46,.84)]
for i,(a,b,w)in enumerate(sections):
 box(f'BVR01 telescopic tray {i}',((a+b)/2,y,top-.046),(b-a-.008,w,.068),steel,.010)
 box(f'BVR01 visible timber underside {i}',((a+b)/2,y,top-.085),(b-a-.10,w-.09,.012),underwood,.004)
 planks(f'BVR02 teak section {i}',a+.014,b-.014,y-w/2+.032,y+w/2-.032,top+.002)
 for side in[-1,1]:
  yy=y+side*w/2;box(f'BVR03 polished side blade {i}',((a+b)/2,yy,top-.038),(b-a,.026,.074),steel,.008)
  tube(f'BVR03 lower slide rail {i}',[(a+.03,yy-side*.027,top-.096),(b-.03,yy-side*.027,top-.096)],.007,steel)
  for xx in[a+.07,b-.07]:
   box('BVR04 telescopic end shoe',(xx,yy-side*.025,top-.100),(.035,.038,.036),steel,.005)
   bolt('BVR04 end shoe screw',(xx,yy,top+.010),.005)
 for dy in[-.21,0,.21]:
  tube('BVR05 underside guide',[(a+.025,y+dy,top-.105),(b-.025,y+dy,top-.105)],.008,steel)
  box('BVR05 dark longitudinal channel',((a+b)/2,y+dy,top-.097),(b-a-.10,.025,.018),black,.003)
 for xx in[a+.09,b-.09]:box('BVR05 cross member',(xx,y,top-.107),(.023,w-.055,.025),steel,.004)
box('BVR06 rounded distal end',(start+.035,y,top-.039),(.075,.78,.078),steel,.016)
for dy in[-.28,.28]:
 tube('BVR06 tip wheel axle',[(start+.10,y+dy-.04,top-.12),(start+.10,y+dy+.04,top-.12)],.012,steel)
 # Side-facing wheel, black tread and central polished axle.
 wheel=P.cylinder('BVR06 roller',(start+.1,y+dy,top-.095),.022,.022,.025,rubber)
 for v in wheel.data.vertices:
  q=v.co-P.point((start+.1,y+dy,top-.095));v.co=P.point((start+.1,y+dy,top-.095))+Vector((q.z,q.y,-q.x))
# B-face traced bends run fore/aft, not across the gangway. Visible far
# stanchion portions are occluded by the near blade: they are NOT deck feet.
# Fixed station unchanged. Hidden roots and remaining spacing are estimates.
for side in[-1,1]:
 yy=y+side*.40;rail=[]
 posts=[(-.20,-.035),(.315,0),(.99,.035),(1.65,0),(2.35,0),(3.22,0)]if side<0 else[(-.30,-.12),(.315,0),(1.36,-.025),(2.35,0),(3.22,0)]
 for i,(xx,dx)in enumerate(posts):
  lo,hi=(.10,.24)if side<0 else(.23,.47)
  pts=[(xx,yy,top-.015),(xx,yy,top+lo),(xx+dx,yy,top+hi),(xx+dx,yy,top+.98)]
  tube(f'BVR07 dogleg stanchion {side}/{i}',pts,.0115,steel)
  box('BVR07 deck socket',(xx,yy,top+.003),(.036,.030,.012),steel,.004)
  for d in[-.011,.011]:bolt('BVR07 socket screw',(xx+d,yy,top+.010),.0025)
  rail.append((xx+dx,yy,top+.98));bolt('BVR08 rail pin',(xx+dx,yy,top+.989),.0035)
 rail[0]=(rail[0][0]-.035,yy,rail[0][2]);rail[-1]=(rail[-1][0]+.035,yy,rail[-1][2])
 tube(f'BVR08 top handrail {side}',rail,.014,steel)
# Hidden actuator routing left pending; retain only reference-visible slide guides.
box('BVR10 mounting saddle',(3.34,y,top-.11),(.34,.92,.24),body,.04)
for yy in[3.00,3.80]:
 tube('BVR10 pivot axle',[(3.22,yy-.035,top-.06),(3.22,yy+.035,top-.06)],.04,steel)
 box('BVR10 pivot cheek',(3.22,yy,top-.10),(.16,.035,.21),steel,.025)
planks('BVR11 boarding landing',3.39,3.98,3.01,3.78,3.95)
# No gate is added: reference does not establish a separate closure here.
# Integrated stair skin. Four lower noses are observed; upper surfaces hidden
# by perspective/mounting are completed to the existing 3.95 m deck elevation.
x0=1.2;x1=3.4;yc=2.50;half=.32;n=7;z0=2.12;z1=3.95
profile=[(x0,z0-.08),(x1,z0-.08),(x1,z1)]
for i in reversed(range(n)):
 a=x0+(x1-x0)*i/n;b=x0+(x1-x0)*(i+1)/n;z=z0+(z1-z0)*(i+1)/n;profile.extend([(a,z),(a,z0+(z1-z0)*i/n)])
vs=[(x,yy,z)for yy in[yc-half,yc+half]for x,z in profile];m=len(profile);faces=[tuple(range(m-1,-1,-1)),tuple(range(m,2*m))]+[(i,(i+1)%m,(i+1)%m+m,i+m)for i in range(m)]
ob=mesh('BVR20 continuous stair shell',vs,faces,body);be=ob.modifiers.new('Moulded edges','BEVEL');be.width=.025;be.segments=3;ob.modifiers.new('Face weights','WEIGHTED_NORMAL')
for i in range(n):
 a=x0+(x1-x0)*i/n;b=x0+(x1-x0)*(i+1)/n;z=z0+(z1-z0)*(i+1)/n
 planks(f'BVR21 teak tread {i}',a-.014,b-.012,yc-half+.025,yc+half-.025,z+.008)
 if i>0:
  box('BVR22 recessed riser face',(a-.004,yc,z-.13),(.012,.68,.17),body,.018)
  for zz in[z-.219,z-.041]:tube('BVR22 riser rebate',[(a-.012,yc-.33,zz),(a-.012,yc+.33,zz)],.003,rubber)
for side in[-1,1]:
 yy=yc+side*.40
 # Closed thick moulding with swept upper edge, rather than floating boxes.
 outline=[(.65,2.10),(1.04,2.38),(1.55,2.99),(2.14,3.66),(2.72,4.20),(3.45,4.42),(3.50,3.80),(1.18,2.06)]
 verts=[(x,yv,z)for yv in[yy-.055,yy+.055]for x,z in outline];m=len(outline)
 fs=[tuple(range(m-1,-1,-1)),tuple(range(m,2*m))]+[(i,(i+1)%m,(i+1)%m+m,i+m)for i in range(m)]
 o=mesh('BVR23 moulded stair shoulder '+str(side),verts,fs,body);mod=o.modifiers.new('Rounded transom shoulder','BEVEL');mod.width=.045;mod.segments=5;o.modifiers.new('Face weights','WEIGHTED_NORMAL')
 # Near the gangway the outboard rail stays below the deployed tray.
 pts=[(.88,yy,2.44),(1.40,yy,3.05),(1.98,yy,3.62),(2.62,yy,4.20),(3.28,yy,4.43)]
 if side>0:pts=pts[:3]
 tube('BVR24 moulded-side handrail '+str(side),pts,.019,steel)
 for p in pts[1:-1]:tube('BVR24 rail support',[(p[0],p[1],p[2]-.05),p],.011,steel)
planks('BVR25 lower rounded landing',.55,1.23,2.11,3.04,2.12)
box('BVR25 threshold black joint',(1.20,yc,2.135),(.045,.84,.035),rubber,.002)
# Inboard locker flap: visible continuous rim, recessed opening and hinge.
box('BVR26 access cover',(2.08,2.035,3.37),(.34,.026,.25),body,.022)
for xx in[1.91,2.25]:tube('BVR26 cover reveal',[(xx,2.014,3.245),(xx,2.014,3.495)],.0025,rubber)
box('BVR26 recessed pull',(2.08,1.997,3.255),(.22,.035,.025),black,.005)
for xx in[1.93,2.23]:bolt('BVR26 cover fastening',(xx,2.012,3.49),.004)
# Stable authoring IDs precede merging. No scene-photograph pixels are used.
for i,o in enumerate(P.objects):
 for c in list(o.users_collection):c.objects.unlink(o)
 coll.objects.link(o);o['componentID']='beach-club/boarding/'+str(i).zfill(4);o['evidence']='boarding-vr-r01/evidence-frozen.json';o['sourceGroup']=o.name.split()[0];o['certainty']='observed silhouette; estimated depth'if not o.name.startswith(('BVR02','BVR09','BVR12'))else'partially observed; hidden construction inferred'
S['boardingCandidate']='boarding-vr-r01';S['photographicParityAccepted']=False
# Remove only runtime derivatives of the two affected bundles.
for o in list(S.objects):
 if o.get('zone')=='beach-club'and not any(c.name.startswith('EDITABLE |')for c in o.users_collection):bpy.data.objects.remove(o,do_unlink=True)
for c in[coll]:c.hide_viewport=False;c.hide_render=False
bpy.context.view_layer.update();deps=bpy.context.evaluated_depsgraph_get();bindings={};uvpack=runpy.run_path(str(R/'tools/lightmap-uv.py'))['prepare_uv']
for zone,c in[('beach-club',coll)]:
 groups={};components=[]
 for o in list(c.objects):
  if o.type not in['MESH','CURVE']:continue
  d=bpy.data.meshes.new_from_object(o.evaluated_get(deps));ob=bpy.data.objects.new(o.name+' | web',d);ob.matrix_world=o.matrix_world.copy();S.collection.objects.link(ob);atlas=o.get('lightmap','none');groups.setdefault(atlas,[]).append(ob)
  components.append({'id':o.get('componentID'),'feature':o.name,'zone':zone,'lightmap':atlas,'certainty':o.get('certainty','preserved existing estimate')})
 c.hide_render=True;c.hide_viewport=True;merged=[];uvs={}
 for atlas,obs in groups.items():
  bpy.ops.object.select_all(action='DESELECT')
  for o in obs:o.select_set(True)
  bpy.context.view_layer.objects.active=obs[0];bpy.ops.object.join();o=bpy.context.object;o.name=zone+' | '+atlas;o['zone']=zone;o['lightmap']=atlas;o['sourceIDs']=json.dumps([v['id']for v in components if v['lightmap']==atlas]);bpy.ops.object.transform_apply(location=True,rotation=True,scale=True);d=o.data
  while len(d.uv_layers):d.uv_layers.remove(d.uv_layers[0])
  uv=d.uv_layers.new(name='UV0');d.uv_layers.new(name='UV1')
  for f in d.polygons:
   mat=d.materials[f.material_index];family=mat.get('family','paint');tile=P.T.get(family,{}).get('tileMetres',1);axis=max(range(3),key=lambda i:abs(f.normal[i]));axes=(0,1)if axis==2 else(0,2)if axis==1 else(1,2)
   if family in['wood','teak']:axes=tuple(reversed(axes))
   for li in f.loop_indices:p=d.vertices[d.loops[li].vertex_index].co;uv.data[li].uv=(p[axes[0]]/tile,p[axes[1]]/tile)
  if atlas!='none':uvs[atlas]=uvpack(o,atlas,R)
  merged.append(o)
 bpy.ops.object.select_all(action='DESELECT')
 for o in merged:o.select_set(True)
 bpy.ops.export_scene.gltf(filepath=str(W/(zone+'-source.glb')),export_format='GLB',use_selection=True,export_extras=True,export_texcoords=True,export_normals=True)
 (W/(zone+'-components.json')).write_text(json.dumps(components,indent=2))
 bindings[zone]={'uv':uvs,'components':len(components),'sourceSHA256':hashlib.sha256((W/(zone+'-source.glb')).read_bytes()).hexdigest()}
(W/'geometry.json').write_text(json.dumps({'removed':removed,'newComponents':len(P.objects),'bindings':bindings,'limits':['Static candidate; physical dimensions and concealed construction estimated.','Independent pixel acceptance remains to be measured.']},indent=2))
S.view_settings.view_transform='Khronos PBR Neutral';S.view_settings.exposure=math.log2(2)
bpy.ops.wm.save_as_mainfile(filepath=str(W/'boarding-master.blend'),compress=True)
print('BOARDING GEOMETRY',len(P.objects),flush=True)
