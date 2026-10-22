"""Editable VR-led exterior reconstruction. Coordinates are estimates, never surveys.
Run with Blender --background --python-exit-code 1 --python tools/build-exteriors.py.
Reference photographs remain private; no panorama pixels enter exported assets.
"""
import bpy,math,json,runpy,hashlib,importlib.util,bmesh
from pathlib import Path
from mathutils import Vector
R=Path(__file__).resolve().parents[1];W=R/'work';A=R/'public/assets'
spec=importlib.util.spec_from_file_location('primitives',R/'tools/exterior-primitives.py');P=importlib.util.module_from_spec(spec);spec.loader.exec_module(P)
bpy.ops.wm.open_mainfile(filepath=str(W/'revisions/r7/saloon-master.blend'))
for im in bpy.data.images:
 if im.source=='FILE':
  file=Path(bpy.path.abspath(im.filepath))
  if not file.exists():
   for folder in [W/'textures',W/'material-sources',A/'saloon']:
    candidate=folder/file.name
    if candidate.exists():im.filepath=str(candidate);break
S=bpy.context.scene;S.name='Luz de Mar | Connected exterior authoring';S.render.engine='CYCLES';S.cycles.samples=48;S.cycles.use_denoising=False;S.render.threads_mode='FIXED';S.render.threads=4
original=bpy.data.collections['EDITABLE | reference-authored components'];original.hide_viewport=False;original.hide_render=False
saloon=list(original.objects)
for o in list(S.objects):
 if o not in saloon and (o.type!='LIGHT' or o.data.type=='SUN'):bpy.data.objects.remove(o,do_unlink=True)
for o in saloon:
 o['zone']='saloon'
 # Stack the three aft sliding leaves at port. They stay fixed open.
 if o.name.startswith(('A08 Aft glass sliding panel','A08 Sliding door metal edge')):
  verts=[o.matrix_world@v.co for v in o.data.vertices];cy=(min(v.x for v in verts)+max(v.x for v in verts))/2/P.SY
  index=round(cy/1.4)+1;o.location.x+=(1.42-cy)*P.SY;o.location.y+=.045*index*P.SX;o['fixedPose']='Open, stacked to port; doorway remains clear'
P.configure(R)
ids=['cockpit','beach-club','port-side','starboard-side','bow'];P.atlases={a:bpy.data.images.new('RAW | '+a,2048,2048,float_buffer=True)for a in ids+['architecture','furniture']}
for o in saloon:
 for m in o.data.materials:
  if m and m.get('lightmap') in P.atlases:m.node_tree.nodes['BAKE | linear ambient only'].image=P.atlases[m['lightmap']]
box=P.box;tube=P.tube;mesh=P.mesh;ell=P.ellipsoid;pillow=P.pillow;cyl=P.cylinder
nav=[];obstacles=[];inventory=[]
labels={'saloon':'Salón principal','cockpit':'Terraza de popa','beach-club':'Beach club','port-side':'Pasillo de babor','starboard-side':'Pasillo de estribor','bow':'Proa'}
def rect(id,x0,y0,x1,y1,z,z1=None):nav.append({'id':id+'-'+str(len(nav)),'zone':id,'polygon':[[x0,y0],[x1,y0],[x1,y1],[x0,y1]],'height':{'x0':x0,'z0':z,'slope':0 if z1 is None else(z1-z)/(x1-x0)}})
def block(x,y,w,d,id):obstacles.append({'zone':P.ZONE,'id':id,'bounds':[x-w/2,y-d/2,x+w/2,y+d/2]})
def start(id):
 P.zone(id)
 global white,teak,wood,linen,blue,yellow,chrome,dark,glass,black,slate
 white=P.material('Gloss ivory marine enamel',(.8,.79,.75),rough=.28);teak=P.material('Weathered teak with black caulking',(1,1,1),'teak',.7);wood=P.material('Pale oiled exterior timber',(.65,.43,.23),'wood',.38);linen=P.material('Ivory outdoor woven upholstery',(.8,.81,.79),'outdoor-fabric',.88);blue=P.material('Pale blue cushion',(.38,.52,.67),'outdoor-fabric',.88);yellow=P.material('Ochre cushion',(.82,.57,.15),'outdoor-fabric',.9);chrome=P.material('Polished marine stainless steel',(.75,.78,.8),'metal',.16,1,atlas='none');dark=P.material('Charcoal sling weave',(.075,.086,.09),'charcoal-weave',.85);glass=P.material('Blue grey glazing',(.28,.42,.5),'glass',.08,atlas='none');black=P.material('Gloss carbon black trim',(.014,.022,.031),rough=.19);slate=P.material('Satin transom grey',(.3,.32,.34),rough=.38)
def deck(name,x0,y0,x1,y1,z):box(name,((x0+x1)/2,(y0+y1)/2,z-.055),(x1-x0,y1-y0,.11),teak,.012)
def rounded_table(name,c,w,d,mat):
 outline=P.rrect(w,d,.16,8);n=len(outline);vs=[(c[0]+x,c[1]+y,c[2]+z)for z in[-.035,.035]for x,y in outline];faces=[tuple(range(n-1,-1,-1)),tuple(range(n,2*n))]+[(i,(i+1)%n,(i+1)%n+n,i+n)for i in range(n)];mesh(name+' pale edge',vs,faces,white)
 outline=P.rrect(w-.045,d-.045,.14,8);mesh(name+' timber top',[(c[0]+x,c[1]+y,c[2]+.037)for x,y in outline],[tuple(range(len(outline)))],mat)
def sofa(name,x,y,w,d,z,back='aft'):
 box(name+' plinth',(x,y,z+.14),(w,d,.22),white,.10);ell(name+' seat',(x,y,z+.36),(w-.035,d-.02,.30),linen)
 if back=='aft':ell(name+' back',(x-w/2+.16,y,z+.73),(.27,d,.59),linen)
 elif back=='port':ell(name+' back',(x,y+d/2-.14,z+.73),(w,.28,.59),linen)
 elif back=='starboard':ell(name+' back',(x,y-d/2+.14,z+.73),(w,.28,.59),linen)
 block(x,y,w,d,name)
def pillows(x,y,z,rot=0):
 for i,(mat,dy)in enumerate([(yellow,-.18),(blue,.14)]):pillow('Loose sewn accent cushion',(x,y+dy,z),(.15,.4,.29),mat,rot,i)
def rail(name,points,z):
 tube(name+' polished top rail',[(x,y,z+1.03)for x,y in points],.021,chrome)
 tube(name+' lower rail',[(x,y,z+.43)for x,y in points],.012,chrome)
 for x,y in points:tube(name+' stanchion',[(x,y,z+.10),(x,y,z+1.03)],.018,chrome);cyl(name+' deck flange',(x,y,z+.035),.045,.045,.025,chrome)
def cleat(x,y,z):
 box('Mooring recessed fairlead',(x,y,z+.22),(.42,.105,.20),black,.055)
 for dx in[-.09,.09]:tube('Stainless cleat foot',[(x+dx,y-.055,z+.10),(x+dx,y-.055,z+.20)],.021,chrome)
 tube('Stainless cleat horns',[(x-.22,y-.055,z+.22),(x+.22,y-.055,z+.22)],.025,chrome)
def hatch(x,y,z,w=.55,d=.55):
 box('Flush teak service hatch',(x,y,z+.004),(w,d,.012),wood,.025)
 for dy in[-d/2+.035,d/2-.035]:tube('Hatch short hinge',[(x-.045,y+dy,z+.014),(x+.045,y+dy,z+.014)],.008,chrome)
 cyl('Circular flush hatch catch',(x+.16,y,z+.018),.035,.035,.005,chrome)
def stairs(name,x0,x1,y,width,z0,z1,n,zone,handrails=True):
 for i in range(n):
  a=x0+(x1-x0)*i/n;b=x0+(x1-x0)*(i+1)/n;z=z0+(z1-z0)*(i+1)/n;box(name+' white riser',((a+b)/2,y,z-.12),(b-a,width,.24),white,.012);box(name+' teak tread',((a+b)/2,y,z+.009),(b-a-.01,width-.025,.025),teak,.007)
 rect(zone,min(x0,x1),y-width/2,max(x0,x1),y+width/2,z0 if x1>x0 else z1,z1 if x1>x0 else z0)
 if handrails:
  for side in[-1,1]:
   yy=y+side*(width/2-.01);block((x0+x1)/2,yy,abs(x1-x0),.044,name+' continuous guard');tube(name+' sloped handrail',[(x0,yy,z0+1.0),(x1,yy,z1+1.0)],.022,chrome)
   for t in[0,.5,1]:x=x0+(x1-x0)*t;z=z0+(z1-z0)*t;tube(name+' handrail post',[(x,yy,z+.08),(x,yy,z+1)],.018,chrome)
def bowl(x,y,z,mat,r=.18):
 n=40;vs=[];prof=[(r*.6,z),(r,z+.08),(r*.99,z+.12),(r*.9,z+.11),(r*.5,z+.025)];fs=[]
 for rr,zz in prof:vs.extend([(x+rr*math.cos(i*math.tau/n),y+rr*math.sin(i*math.tau/n),zz)for i in range(n)])
 for j in range(len(prof)-1):
  for i in range(n):a=j*n+i;b=j*n+(i+1)%n;fs.append((a,b,b+n,a+n))
 mesh('Shallow reflective decorative bowl',vs,fs,mat,True)

start('cockpit');deck('C01 Aft terrace teak',3.4,-3.6,8.57,3.6,3.95);rect('cockpit',3.4,-3.47,8.65,3.47,3.95)
sofa('C02 Aft transverse banquette',3.90,0,.9,4.50,3.95)
for sign in[-1,1]:sofa('C02 Curved banquette return',4.5,sign*2.04,1.0,.65,3.95,'port'if sign>0 else'starboard');pillows(4.0,sign*1.5,4.67)
rounded_table('C03 Aft dining table',(5.32,0,4.72),1.40,3.25,wood);block(5.32,0,1.4,3.25,'C03 Table')
for y in[-1.03,-.34,.35,1.04]:
 x=6.40;z=3.95
 # Actual director-chair construction: charcoal sling, crossing timber frames,
 # exposed hinge pivots and wood arm caps, not generic dining silhouettes.
 box('C04 Director sling seat',(x,y,z+.45),(.52,.57,.035),dark,.015)
 box('C04 Director sling back',(x+.24,y,z+.78),(.035,.58,.52),dark,.015)
 for side in[-1,1]:
  yy=y+side*.30
  tube('C04 Folding crossed timber leg',[(x-.26,yy,z+.03),(x+.20,yy,z+.64)],.025,wood);tube('C04 Folding crossed timber leg',[(x+.28,yy,z+.03),(x-.19,yy,z+.64)],.025,wood)
  tube('C04 Chair rear upright',[(x+.23,yy,z+.18),(x+.26,yy,z+1.04)],.025,wood);tube('C04 Timber armrest',[(x-.22,yy,z+.66),(x+.27,yy,z+.66)],.026,wood);ell('C04 Exposed hinge',(x+.015,yy+side*.025,z+.35),(.04,.018,.04),chrome,power=1)
 block(x,y,.66,.65,'C04 Director chair')
# Tour shows four director chairs across the near edge; no invented end chairs.
for y in[-.65,.63]:bowl(5.35,y,4.76,P.material('Green reflective bowl',(.39,.55,.38),'metal',.12,.7,atlas='none'),.20)
cyl('C05 Orchid pot',(5.18,1.13,4.89),.11,.11,.23,white)
for i in range(3):
 x=5.17+i*.025;tube('C05 Orchid stem',[(x,1.13,4.98),(x+.025,1.13,5.25+i*.04)],.006,P.material('Orchid green',(.12,.23,.08),rough=.8))
 for a in range(4):ell('C05 Orchid petal',(x+.025+.035*math.cos(a*1.57),1.13+.035*math.sin(a*1.57),5.25+i*.04),(.06,.04,.02),white,power=.8)
ell('C06 Rounded wetbar',(7.62,-2.38,4.48),(1.26,1.25,1.03),white);block(7.62,-2.38,1.26,1.25,'C06 Wetbar')
ell('C06 Recessed sink',(7.62,-2.40,5.0),(.55,.6,.05),slate);tube('C06 Gooseneck faucet',[(7.78,-2.65,5.0),(7.78,-2.65,5.23),(7.69,-2.52,5.28),(7.60,-2.44,5.16)],.017,chrome)
tube('C06 Chrome ceiling support',[(7.62,-2.80,5.0),(7.62,-2.80,5.98)],.035,chrome)
ell('C07 Curved chaise beneath stairs',(7.52,1.98,4.30),(1.45,1.10,.40),linen);ell('C07 Chaise back',(7.9,2.05,4.66),(.33,1.1,.5),linen);pillows(7.75,2.03,4.68);block(7.55,2.04,1.55,1.15,'C07 Chaise')
stairs('C08 Upper-deck staircase',6.25,8.40,2.83,.65,3.95,6.05,12,'context',False);block(7.325,2.83,2.15,.65,'C08 Staircase beyond scope')
for s in[-1,1]:
 box('C09 Aft bulwark furniture niche',(4.2,s*3.55,4.18),(1.6,.16,.46),white,.065);cleat(4.0,s*3.43,4.05)
 rail('C09 Terrace rail',[(3.42,s*3.52),(5.45,s*3.52),(8.40,s*3.52)],3.95)
 # Thin tinted guard below the polished top edge.
 box('C09 Glass guard',(5.85,s*3.52,4.58),(4.8,.012,.67),glass,.005)
for x in[4.45,6.3,7.9]:
 for y in[-2.0,0,2.0]:cyl('C10 Ceiling downlight rim',(x,y,5.965),.045,.045,.022,white);cyl('C10 Recessed diffuser',(x,y,5.949),.032,.032,.007,P.material('Daytime ceiling diffuser',(.8,.79,.74),rough=.5,atlas='none'))
for y in[-2.55,2.55]:cyl('C10 Ceiling speaker',(6.9,y,5.97),.09,.09,.012,slate)
hatch(7.1,.65,3.95,.55,.55)

start('beach-club');deck('B01 Fixed bathing platform',-.15,-3.28,2.50,3.28,2.12);deck('B01 Recessed beach club floor',2.50,-1.95,4.17,1.95,2.12);rect('beach-club',-.15,-3.28,2.60,3.28,2.12);rect('beach-club',2.5,-1.93,4.17,1.93,2.12)
for s in[-1,1]:
 stairs('B02 '+('Port'if s>0 else'starboard')+' transom stairs',1.20,3.40,s*2.85,.85,2.12,3.95,9,'beach-club');rect('beach-club',2.48,s*2.85-.42,3.5,s*2.85+.42,3.95) if False else None
 # Side shoulder terminates outside the actual stairs, leaving their tread clear.
 tube('B03 Sculpted transom shoulder',[(1.25,s*3.39,2.25),(2.1,s*3.44,3.0),(3.45,s*3.53,4.02)],.11,slate)
box('B04 Recess back wall',(4.18,0,3.02),(.10,3.94,1.79),wood,.02)
box('B04 Open club overhead frieze',(3.38,0,3.88),(1.75,4.0,.14),wood,.035)
for s in[-1,1]:
 box('B04 Grey locker door',(4.10,s*1.43,3.0),(.055,.76,1.66),slate,.025);tube('B04 Vertical locker handle',[(4.055,s*1.43,2.91),(4.055,s*1.43,3.16)],.012,chrome)
 box('B04 Grey alcove return',(3.35,s*1.98,3.02),(1.67,.12,1.82),slate,.03)
sofa('B05 Recessed daybed',3.32,0,1.4,2.22,2.12,back='none')
# Back is against the forward transom panel, rather than sideways.
for o in P.objects[-3:]:pass
ell('B05 Broad daybed back',(3.94,0,2.80),(.23,2.22,.58),linen);pillows(3.79,.15,2.83)
for s in[-1,1]:
 x=.75;y=s*1.15
 for yy in[y-.36,y+.36]:
  tube('B06 Recliner timber leg',[(x-.75,yy,2.15),(x-.18,yy,2.56),(x+.66,yy,2.16)],.034,wood);tube('B06 Recliner inclined frame',[(x-.73,yy,2.33),(x+.42,yy,2.60),(x+.72,yy,3.02)],.034,wood)
 ell('B06 Pale recliner seat',(x-.18,y,2.52),(1.22,.74,.18),linen)
 back=ell('B06 Angled recliner back',(x+.53,y,2.84),(.60,.74,.18),linen);back.rotation_euler[0]=-.48
 pillow('B06 Recliner accent',(x+.54,y,2.94),(.14,.35,.26),blue if s<0 else yellow,0,s)
 block(x,y,1.8,.82,'B06 Recliner')
bowl(.45,0,2.21,P.material('Copper tray',(.55,.26,.10),'metal',.25,.85,atlas='none'),.34)
box('B07 Plain coral book',(.44,0,2.30),(.29,.21,.035),P.material('Coral book cover',(.65,.26,.31),rough=.8),.003);block(.45,0,.7,.7,'B07 Tray')
tube('B08 Curved deck shower',[(2.15,-3.23,2.13),(2.15,-3.23,4.05),(2.06,-3.23,4.18),(1.92,-3.23,4.18)],.026,chrome);ell('B08 Shower head',(1.92,-3.23,4.16),(.14,.14,.035),chrome)
for x in[.0,1.05,2.20]:
 for s in[-1,1]:cyl('B09 Platform flush fitting',(x,s*3.15,2.13),.055,.055,.016,chrome)
for y in[-2.6,0,2.6]:box('B09 Platform hinge',(-.08,y,2.14),(.15,.25,.025),chrome,.012)

for id,s in[('port-side',1),('starboard-side',-1)]:
 start(id);end=20.7 if s>0 else 21.8;deck('S01 Continuous teak side deck',8.57,min(s*2.70,s*3.60),end,max(s*2.70,s*3.60),3.95);rect(id,8.55,min(s*2.74,s*3.52),end,max(s*2.74,s*3.52),3.95)
 # Saloon already supplies its own exterior wall/glass up to X17.8.
 box('S02 Forward glossy cabin wall',((17.8+end)/2,s*2.69,4.98),(end-17.8,.09,2.08),black,.025)
 box('S03 White side-deck soffit',((8.57+end)/2,s*3.16,6.04),(end-8.57,.98,.11),white,.025)
 box('S04 White outer bulwark',((8.57+end)/2,s*3.59,4.13),(end-8.57,.13,.37),white,.03)
 rail('S04 Side-deck guard',[(x,s*3.59)for x in[8.57,10.8,13,15.2,17.5,end]],3.95)
 for x in[10,13.6,17.3,19.9]:cyl('S05 Recessed side-deck light',(x,s*3.12,5.971),.03,.03,.014,white)
 for x in[10.6,16.5,19.5]:hatch(x,s*3.14,3.95,.56,.38);box('S06 Outer scupper',(x,s*3.515,4.02),(.2,.02,.07),slate,.02)
 if s>0:
  box('S07 Documented port end bulkhead',(20.73,3.15,4.97),(.10,.95,2.05),white,.025);block(20.73,3.15,.10,.95,'S07 Port end bulkhead')
 else:
  stairs('S08 Forward starboard stair',21.8,24.1,-3.05,.90,3.95,6.0,12,id);deck('S08 Upper landing',24.10,-3.50,24.70,-2.60,6);rect(id,24.10,-3.50,24.75,-2.60,6)

start('bow')
# The upper foredeck tapers; separate lower working deck avoids overlapping floors.
deck('F01 Upper foredeck',24.55,-2.95,31.90,2.95,6.0);rect('bow',24.55,-2.93,31.9,2.93,6)
for s in[-1,1]:
 deck('F01 Narrow jacuzzi bypass',31.9,min(s*1.43,s*2.55),32.65,max(s*1.43,s*2.55),6);rect('bow',31.9,min(s*1.43,s*2.55),32.65,max(s*1.43,s*2.55),6)
 stairs('F02 Lower working bow stair',32.65,33.75,s*1.96,.75,6,5.1,5,'bow')
mesh('F03 Tapered lower working deck',[(33.65,-2.35,5.1),(35.65,-.65,5.1),(35.65,.65,5.1),(33.65,2.35,5.1)],[(0,1,2,3)],teak)
nav.append({'id':'bow-working','zone':'bow','polygon':[[33.65,-2.35],[35.65,-.65],[35.65,.65],[33.65,2.35]],'height':{'x0':33.65,'z0':5.1,'slope':0}})
sofa('F04 Lounge aft sofa',25.03,0,.87,4.52,6)
for s in[-1,1]:sofa('F04 Lounge return',25.85,s*1.92,1.65,.65,6,'port'if s>0 else'starboard');pillows(25.15,s*1.35,6.72)
for s in[-1,1]:
 rounded_table('F05 Separate lounge table',(26.16,s*.85,6.71),1.40,1.28,wood);box('F05 Table pedestal',(26.16,s*.85,6.33),(.55,.38,.65),white,.08);block(26.16,s*.85,1.4,1.28,'F05 Table')
bowl(26.1,-.85,6.75,P.material('Brass tray',(.60,.42,.16),'metal',.23,.9,atlas='none'),.27);box('F05 Plain monochrome book',(26.2,.85,6.78),(.31,.23,.025),slate,.003)
box('F06 Sunpad plinth',(28.95,0,6.24),(2.8,3.35,.46),white,.12);block(28.95,0,2.85,3.4,'F06 Sunpad')
for y in[-1.10,0,1.10]:
 ell('F06 Separate sewn sunpad',(28.95,y,6.61),(2.78,1.08,.34),linen)
 ell('F06 Rolled head bolster',(27.67,y,6.88),(.35,1.08,.27),linen)
 pillow('F06 Sunpad accent',(28.03,y,6.98),(.16,.43,.26),blue if y else yellow,0,y*3)
for s in[-1,1]:
 box('F07 Timber sunpad endcap',(29.65,s*1.78,6.41),(.75,.30,.44),wood,.085)
 for x in[29.48,29.80]:cyl('F07 Flush circular cup holder',(x,s*1.78,6.64),.07,.07,.008,chrome);cyl('F07 Cup holder hollow',(x,s*1.78,6.645),.055,.055,.01,black)
# Clear blue jacuzzi documented by Bow_Sunbed, fixed water / no invented animation.
box('F08 Jacuzzi basin',(31.1,0,5.95),(1.65,2.75,.7),white,.12);box('F08 Jacuzzi blue interior',(31.1,0,6.10),(1.49,2.57,.08),P.material('Jacuzzi pale blue lining',(.30,.58,.67),rough=.22),.08)
water=P.material('Fixed jacuzzi water',(.14,.37,.46),'metal',.10,.20,atlas='none');box('F08 Fixed water surface',(31.1,0,6.22),(1.48,2.56,.012),water,.05);block(31.1,0,1.68,2.80,'F08 Jacuzzi')
for x in[30.30,31.92]:box('F08 Jacuzzi glass windscreen',(x,0,6.45),(.014,2.8,.53),glass,.005);tube('F08 Jacuzzi bright glass edge',[(x,-1.4,6.72),(x,1.4,6.72)],.01,chrome)
for s in[-1,1]:box('F08 Teak jacuzzi rim',(31.1,s*1.42,6.25),(1.65,.17,.08),teak,.03)
for s in[-1,1]:
 pts=[(25.25 if s<0 else 24.6,s*2.96),(27.0,s*2.96),(29.8,s*2.96),(31.9,s*2.60),(33.65,s*2.35),(35.60,s*.65)]
 for i in range(len(pts)-1):
  a,b=pts[i:i+2];za=6 if i<4 else 5.1;zb=5.1 if i>=3 else 6
  tube('F09 Bow polished top rail',[(a[0],a[1],za+1),(b[0],b[1],zb+1)],.022,chrome);tube('F09 Bow lower rail',[(a[0],a[1],za+.45),(b[0],b[1],zb+.45)],.012,chrome);tube('F09 Bow rail post',[(a[0],a[1],za+.1),(a[0],a[1],za+1)],.018,chrome)
 for x,y,z in[(27,s*2.91,6),(30,s*2.81,6),(34.2,s*1.77,5.1)]:cleat(x,y,z)
 for x,y,z in[(27.1,s*2.25,6),(32.0,s*1.99,6),(34.9,s*.63,5.1)]:hatch(x,y,z,.52,.46)
 x=34.3;y=s*.81;block(x,y,.62,.56,'F10 Anchor windlass');box('F10 Windlass base',(x,y,5.17),(.52,.44,.13),chrome,.05);cyl('F10 Windlass drum',(x,y,5.33),.16,.16,.24,chrome);cyl('F10 Windlass cap',(x,y,5.47),.19,.19,.04,chrome)
 for j in range(15):
  xx=x+.19+j*.055;tube('F10 Individual anchor chain link',[(xx+.035*math.cos(k*math.tau/12),y+.022*math.sin(k*math.tau/12),5.18+.01*(j%2))for k in range(12)],.008,chrome,True)
 box('F10 Chain roller throat',(35.25,y,5.20),(.40,.22,.15),slate,.03)

# Common, non-walkable context has no duplicate exterior deck surfaces.
start('context');box('X01 Aft upper-deck overhang',(5.8,0,6.06),(5.6,7.2,.16),white,.12)
box('X02 Upper cabin roof',(18.7,0,7.9),(10.5,5.6,.18),white,.12)
box('X03 Upper port cabin',(18.3,2.48,6.95),(9.1,.10,1.60),black,.06);box('X03 Upper starboard cabin',(18.3,-2.48,6.95),(9.1,.10,1.60),black,.06)
for s in[-1,1]:
 for x in[15.0,17.4,19.8,22.1]:P.panel('X03 Upper context glazing',(x,s*2.54,7.04),2.15,1.22,.08,'Y',glass)
mesh('X04 Slanted pilothouse windshield',[(23.0,-2.48,7.67),(23.0,2.48,7.67),(24.48,2.32,6.24),(24.48,-2.32,6.24)],[(0,1,2,3)],black)
for y in[-1.5,0,1.5]:tube('X04 Visible windshield wiper',[(24.24,y,6.45),(23.55,y+.23,7.13)],.011,chrome)
box('X05 Sun-deck canopy',(17.4,0,9.20),(5.0,5.1,.16),white,.10)
for s in[-1,1]:tube('X05 Canopy upright',[(17.7,s*2.24,7.98),(17.4,s*2.24,9.20)],.07,white)
tube('X06 Mast',[(16.0,0,9.28),(16.0,0,11.4)],.07,white)
for x in[15.5,16.5]:ell('X06 Satellite dome',(x,0,9.90),(.55,.55,.75),white,power=.85)
# Preserve the inherited hull silhouette but clip its upper surfaces below decks.
source=json.loads((W/'reference/exteriors/hull-source.json').read_text());source=source if isinstance(source,list)else source.get('objects',source)
for h in source:
 vs=[];fs=[];v=h['vertices'];ind=h['indices']
 for i in range(0,len(ind),3):
  tri=[list(v[ind[i+j]])for j in range(3)];meanx=sum(p[0]for p in tri)/3;limit=2.02 if meanx<3.4 else 3.86 if meanx<24 else 5.02
  out=[]
  for a,b in zip(tri,tri[1:]+tri[:1]):
   if a[2]<=limit:out.append(a)
   if (a[2]<=limit)!=(b[2]<=limit):t=(limit-a[2])/(b[2]-a[2]);out.append([a[j]+t*(b[j]-a[j])for j in range(3)])
  if len(out)>2:k=len(vs);vs+=out;fs.append(tuple(range(k,k+len(out))))
 mesh('X07 Preserved source hull '+h['id'],vs,fs,white,True)

# Evaluate once; keep all source components independently editable, merged render
# meshes maintain sourceIDs and separate UV roles for paint/textile vs irradiance.
all_originals=saloon+P.objects;deps=bpy.context.evaluated_depsgraph_get();exportobjs=[];components=[]
for o in all_originals:
 ev=o.evaluated_get(deps);data=bpy.data.meshes.new_from_object(ev)
 if o['zone']!='saloon':
  bm=bmesh.new();bm.from_mesh(data);bmesh.ops.remove_doubles(bm,verts=list(bm.verts),dist=.000002);bmesh.ops.dissolve_degenerate(bm,edges=list(bm.edges),dist=.000002);bad=[f for f in bm.faces if f.calc_area()<1e-10]
  if bad:bmesh.ops.delete(bm,geom=bad,context='FACES')
  bm.to_mesh(data);bm.free()
 ob=bpy.data.objects.new(o.name+' | Web',data);ob.matrix_world=o.matrix_world.copy();S.collection.objects.link(ob);ob['zone']=o['zone'];ob['lightmap']=o.get('lightmap','none');exportobjs.append(ob);components.append({'id':o['componentID'],'zone':o['zone'],'feature':o.name,'lightmap':o.get('lightmap'),'dimensionStatus':'image-estimated; no as-built claim'})
for o in all_originals:
 for col in list(o.users_collection):col.objects.unlink(o)
 col=bpy.data.collections.get('EDITABLE | '+o['zone'])
 if not col:col=bpy.data.collections.new('EDITABLE | '+o['zone']);S.collection.children.link(col)
 col.objects.link(o);col.hide_render=True;col.hide_viewport=True
prepare=runpy.run_path(str(R/'tools/lightmap-uv.py'))['prepare_uv'];stats={};merged=[]
zonegroups={}
for o in exportobjs:zonegroups.setdefault(o['zone'],{}).setdefault(o['lightmap'],[]).append(o)
for id in ['saloon']+ids+['context']:
 groups=zonegroups[id]
 for atlas,group in groups.items():
  bpy.ops.object.select_all(action='DESELECT')
  for o in group:o.select_set(True)
  bpy.context.view_layer.objects.active=group[0];bpy.ops.object.join();ob=bpy.context.object;ob.name=id+' | '+atlas;ob['zone']=id;ob['lightmap']=atlas;ob['sourceIDs']=json.dumps([c['id']for c in components if c['zone']==id and c['lightmap']==atlas]);merged.append(ob)
  bpy.ops.object.transform_apply(location=True,rotation=True,scale=True);d=ob.data
  while len(d.uv_layers):d.uv_layers.remove(d.uv_layers[0])
  uv=d.uv_layers.new(name='UV0');d.uv_layers.new(name='UV1')
  for f in d.polygons:
   mat=d.materials[f.material_index];family=mat.get('family','paint');tile=P.T.get(family,{}).get('tileMetres',1);axis=max(range(3),key=lambda i:abs(f.normal[i]));axes=(0,1)if axis==2 else(0,2)if axis==1 else(1,2)
   if family in['wood','flooroak','teak']:axes=tuple(reversed(axes))
   for li in f.loop_indices:q=d.vertices[d.loops[li].vertex_index].co;uv.data[li].uv=(q[axes[0]]/tile,q[axes[1]]/tile)
  if atlas in P.atlases:stats[atlas]=prepare(ob,atlas,R)
  d.uv_layers.active_index=0;d.uv_layers['UV0'].active_render=True
  bpy.ops.object.select_all(action='DESELECT');ob.select_set(True);bpy.context.view_layer.objects.active=ob
 # Source GLB contains only this zone, never the whole yacht.
 bpy.ops.object.select_all(action='DESELECT')
 for o in merged:
  if o['zone']==id:o.select_set(True)
 bpy.ops.export_scene.gltf(filepath=str(W/(id+'-source.glb')),export_format='GLB',use_selection=True,export_extras=True,export_texcoords=True,export_normals=True,export_materials='EXPORT')
 out=A/id;out.mkdir(exist_ok=True);(out/'reference-components.json').write_text(json.dumps([c for c in components if c['zone']==id],indent=2)+'\n')
 if id!='context':
  old=json.loads((out/'authoring.json').read_text())if(out/'authoring.json').exists()else{}
  old.update({'room':id,'revision':8,'replacementBasis':'VR-led exterior reconstruction; inherited yacht transformation; all unmeasured dimensions inferred','atlasSize':2048,'atlases':['architecture','furniture']if id=='saloon'else[id],'atlasPadding':{k:v for k,v in stats.items()if k in(['architecture','furniture']if id=='saloon'else[id])},'samples':48,'blender':bpy.app.version_string,'uvRoles':{'material':0,'ambient':1},'bakeGeometrySHA256':hashlib.sha256((W/(id+'-source.glb')).read_bytes()).hexdigest(),'reference':'https://vrcloud.com/?pv=1667308298','dynamicObjects':[],'bakedOccludersExcludeDynamic':True,'ambientEnvironmentSHA256':hashlib.sha256((W/'material-sources/marine-ambient.exr').read_bytes()).hexdigest()});(out/'authoring.json').write_text(json.dumps(old,indent=2)+'\n')
navfile={'version':1,'units':'source metres before inherited normalization','radius':.14,'eyeHeight':1.55,'regions':[r for r in nav if r['zone']!='context'],'obstacles':obstacles,'connections':[{'zones':['saloon','cockpit'],'at':[8.57,0]},{'zones':['cockpit','beach-club'],'at':[3.4,2.85]},{'zones':['cockpit','beach-club'],'at':[3.4,-2.85]},{'zones':['cockpit','port-side'],'at':[8.57,3.15]},{'zones':['cockpit','starboard-side'],'at':[8.57,-3.15]},{'zones':['starboard-side','bow'],'at':[24.6,-3.0]}]};(A/'navigation.json').write_text(json.dumps(navfile,indent=2)+'\n')
for im in bpy.data.images:
 if im.has_data and im.source=='FILE'and not im.packed_file:im.pack()
S['reference']='https://vrcloud.com/?pv=1667308298';S['accuracy']='Panorama-guided reconstruction; dimensions inferred. Tour not verified as Luz de Mar.';S['runtimeDirectSunExcludedFromBakes']=True;S['fixedBeachPlatform']=True;S['fixedOpenSaloonDoor']=True
bpy.ops.wm.save_as_mainfile(filepath=str(W/'exteriors-ready.blend'),compress=True)
print('EXTERIORS READY',len(components),'components',len(nav),'walk surfaces',flush=True)
