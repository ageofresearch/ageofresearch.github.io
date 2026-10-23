"""Private VR references and public, observation-only left-engine inventory."""
from pathlib import Path
import json, hashlib, math
import numpy as np
from PIL import Image

R=Path(__file__).resolve().parents[1]
W=R/'work/left-engine-r12'; W.mkdir(parents=True,exist_ok=True)
A=R/'public/assets/mechanics/left-vr-r01'; A.mkdir(parents=True,exist_ok=True)
SOURCE=R/'work/reference/machinery/cubes'
CAMERA=[9.15,0,3.18]
POSES=[('front',0,0,90),('oblique',330,0,90),('exhaust',300,0,90),('side',270,0,90),('lower',270,65,90),('intake',330,18,45),('jacket',290,3,45),('mounting',310,40,45)]
groups=[
 ('casting','Bloque, cárter y nervaduras','pano_f.jpg','pano_l.jpg','Estructura compatible del ZIP; superficies ocultas nominales. Carcasas próximas trazadas en el cubo L, con profundidad inferida.'),
 ('covers','Tapas inclinadas y juntas','pano_f.jpg','pano_l.jpg','Reutilizar tapas compatibles y ajustar carenados observables.'),
 ('intake','Cilindro de admisión con malla y aro negro','pano_f.jpg','pano_l.jpg','Patrón superficial y dimensiones estimados; paso de malla de 5,6 mm para la lectura visual, no medido. No es el filtro de agua de mar.'),
 ('service','Tapones negros/amarillos, tubos y accesorios superiores','pano_f.jpg','pano_l.jpg','No atribuir funciones o referencias ilegibles.'),
 ('exhaust','Escape negro longitudinal y dos conexiones inferiores','pano_f.jpg','pano_l.jpg','Recorrido reconstruido desde rayos de la única panorámica; profundidad inferida.'),
 ('jacket','Funda plateada, pliegues y bandas textiles','pano_l.jpg','pano_f.jpg','Forma observada; sección posterior inferida.'),
 ('closures','Cierres, costuras y soportes de aislamiento','pano_l.jpg','pano_f.jpg','Se reproducen los cierres que se distinguen; no certifica desmontaje real.'),
 ('couplings','Manguitos azules y abrazaderas','pano_l.jpg','pano_f.jpg','Cantidad y encuentros visibles; fabricante sin identificar.'),
 ('gearbox','Reductora, carcasas y acoplamiento','pano_d.jpg','pano_l.jpg','El anclaje digital se conserva. La VR no confirma el modelo exacto.'),
 ('mounts','Pies, soportes y bancadas','pano_d.jpg','pano_f.jpg','Partes visibles observadas; cotas y caras ocultas estimadas.'),
 ('rails','Barandilla inoxidable y fijaciones','pano_f.jpg','pano_l.jpg','Recorridos observados y ajuste al corredor digital.'),
 ('hoses','Mangueras, cables y abrazaderas del motor','pano_f.jpg','pano_l.jpg','Solo servicios del conjunto izquierdo; circuitos no identificados.'),
 ('extinguisher','Extintor izquierdo con manetas, manguera y soporte','pano_f.jpg','pano_d.jpg','Tipo y capacidad no afirmados a partir de la fotografía.'),
]
inventory={'version':1,'reference':'https://vrcloud.com/?pv=1667308298','scene':'scene_engine_room','leftDefinition':'Left when looking toward the central fluid group; port instance in the digital source, not a verified VR hull-side identification.','referenceCubeSize':[2048,2048],'panoramaStations':1,'camera':{'sourcePosition':CAMERA,'status':'Estimated single registration, fixed for all orientations','fitBasis':'Compatible engine envelope and near/far rail, intake and exhaust landmarks'},'units':'physical metres; original yacht normalization compensated','items':[{'id':'LVR/'+key,'title':title,'evidence':[a,b],'classification':'observed form / estimated 3D depth','note':note}for key,title,a,b,note in groups],'poses':[{'id':name,'h':h,'v':v,'hfov':fov,'vfov':math.degrees(2*math.atan(math.tan(math.radians(fov)/2)/1.5))}for name,h,v,fov in POSES],'sources':[],'limits':['Six cube photographs from one position; zoom adds no new depth or image resolution.','The VR identifies a Grande 36M, not a verified identity as Luz de Mar.','Dimensions and installation interfaces are estimates constrained by the existing digital mounting.','R03 internals remain a separate nominal demonstration.','No original VR photograph is a published model texture.']}
for f in ['f','l','r','b','u','d']:
 p=SOURCE/f'pano_{f}.jpg'; inventory['sources'].append({'face':f,'sha256':hashlib.sha256(p.read_bytes()).hexdigest(),'url':f'https://cdn-static.vrcloud.com/azimut-yachts/ma2805/panos/Engine_Room.tiles/pano_{f}.jpg?v=p29279716'})
inventory['compatibleDocuments']=[{'url':'https://www.mtu-solutions.com/content/dam/mtu/products/yacht/main-propulsion/mtu-series-2000/3238241_MTU_Marine_spec_10V12V16V2000M96_1DS.pdf/_jcr_content/renditions/original./3238241_MTU_Marine_spec_10V12V16V2000M96_1DS.pdf','purpose':'Nominal engine-envelope reference; does not identify the photographed accessory installation.'},{'url':'https://azimutyachts.com/wp-content/uploads/2022/04/Lowerdeck_Grande36M.jpg','purpose':'General lower-deck machinery arrangement; not proof of the digital mounting coordinates.'}]
(A/'evidence.json').write_text(json.dumps(inventory,ensure_ascii=False,indent=2)+'\n')
# Rectilinear crops resample original cube pixels only. No inferred detail or retouch.
faces={k:np.asarray(Image.open(SOURCE/f'pano_{k}.jpg').convert('RGB'))for k in 'flrbud'}
bases={'f':([1,0,0],[0,-1,0],[0,0,1]),'l':([0,1,0],[1,0,0],[0,0,1]),'r':([0,-1,0],[-1,0,0],[0,0,1]),'b':([-1,0,0],[0,1,0],[0,0,1]),'u':([0,0,1],[0,-1,0],[-1,0,0]),'d':([0,0,-1],[0,-1,0],[1,0,0])}
folder=W/'reference';folder.mkdir(exist_ok=True)
for name,h,v,fov in POSES:
 h,v,fov=np.radians([h,v,fov]);forward=np.array([math.cos(v)*math.cos(h),-math.cos(v)*math.sin(h),-math.sin(v)]);right=np.array([-math.sin(h),-math.cos(h),0]);up=np.cross(right,forward)
 x=(np.arange(1200)+.5)/1200*2-1;y=1-(np.arange(800)+.5)/800*2;xx,yy=np.meshgrid(x,y);rays=forward+xx[:,:,None]*right*math.tan(fov/2)+yy[:,:,None]*up*math.tan(fov/2)/1.5
 out=np.zeros((800,1200,3),dtype=np.uint8);chosen=np.argmax(np.abs(rays),axis=2)
 for key,(n,r,u)in bases.items():
  n,r,u=map(np.array,(n,r,u));axis=np.flatnonzero(n)[0];den=rays@n;mask=(chosen==axis)&(den>0)
  uu=np.clip(((rays@r)/np.maximum(den,1e-8)+1)*1024-.5,0,2047);vv=np.clip((1-(rays@u)/np.maximum(den,1e-8))*1024-.5,0,2047)
  x0=uu.astype(int);y0=vv.astype(int);x1=np.minimum(x0+1,2047);y1=np.minimum(y0+1,2047);a=(uu-x0)[...,None];b=(vv-y0)[...,None];im=faces[key];sample=(im[y0,x0]*(1-a)*(1-b)+im[y0,x1]*a*(1-b)+im[y1,x0]*(1-a)*b+im[y1,x1]*a*b)
  out[mask]=sample[mask].astype(np.uint8)
 Image.fromarray(out).save(folder/(name+'.png'))
(W/'reference/cameras.json').write_text(json.dumps(inventory['poses'],indent=2))
print('Left engine inventory:',len(groups),'groups;',len(POSES),'reference projections')
