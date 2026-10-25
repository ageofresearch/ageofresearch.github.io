"""Build the R03 editable delivery in Actions from immutable R02/R11 Releases.

No VR photographs are downloaded. Production lightmap corners are matched to
the reconstructed geometry so platform-dependent UV packing cannot break bakes.
"""
from pathlib import Path
import os,json,hashlib,urllib.request,zipfile,subprocess,shutil,sys
R=Path(__file__).resolve().parents[1];W=Path(os.environ.get('ELECTRICAL_RELEASE_WORK',R/'work/electrical-clearance-r03'));os.environ['ELECTRICAL_AUTHORING_WORK']=str(W);P=R/'public/assets/machinery/electrical-vr-r01';O=W/'release';O.mkdir(parents=True,exist_ok=True)
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def download(tag,name,digest):
 p=W/'input-archives'/name;p.parent.mkdir(parents=True,exist_ok=True)
 if not p.exists()or sha(p)!=digest:urllib.request.urlretrieve('https://github.com/ageofresearch/ageofresearch.github.io/releases/download/'+tag+'/'+name,p)
 assert sha(p)==digest,('Pinned archive changed',name)
 return p
inputs=[('luz-de-mar-machinery-r11','luz-de-mar-machinery-r11.zip','3140321fe7b5f01700ac2421cc80467df7ff1373c7974ee2a4dc0b09c133f41f'),('luz-electrical-lower-r02','luz-electrical-lower-r02-authoring.zip','cb5f4d90b814e1419ac48a64aeca7e6899c904a614422a16d2f64614f3d3b7d4')]
for tag,name,digest in inputs:
 with zipfile.ZipFile(download(tag,name,digest))as z:
  wanted={'source-snapshot/machinery.bin':R/'work/machinery-r11/snapshot/machinery.bin','source-snapshot/machinery.json':R/'work/machinery-r11/snapshot/machinery.json'}if tag.endswith('r11')else{'electrical-master.blend':W/'input-master.blend','review/production-authoring.json':W/'input-authoring.json','review/component-inventory.json':W/'input-inventory.json'}
  for member,target in wanted.items():target.parent.mkdir(parents=True,exist_ok=True);target.write_bytes(z.read(member))
for name,target in [('evidence.json','evidence-frozen.json'),('clearance-evidence.json','clearance-evidence.json')]:shutil.copyfile(P/name,W/target)
blender=os.environ.get('BLENDER','blender')
def run(master,script):
 env=dict(os.environ);env.pop('PYTHONPATH',None)
 subprocess.run([blender,'-b',str(master),'-t','4','--python-exit-code','1','--python',str(R/'tools'/script)],check=True,env=env)
subprocess.run(['python',str(R/'tools/build-clearance-casings.py')],check=True)
expected=json.loads((P/'authoring.json').read_text());assert sha(W/'casings.json')==sha(P/'casings.json'),'Reconstructed service-access geometry differs'
run(W/'input-master.blend','correct-electrical-clearance.py')
a=json.loads((W/'authoring.json').read_text());assert a['triangles']==expected['triangles'];assert a['clearance']['existingElectricalPhysicalSHA256']==expected['clearance']['existingElectricalPhysicalSHA256']
for name in ['service-wood-color.png','service-wood-normal.png','service-wood-orm.png']:assert sha(W/'textures'/name)==expected['sourceTextures'][name]
subprocess.run(['node',str(R/'tools/export-electrical-runtime.mjs')],check=True);run(W/'electrical-master.blend','align-electrical-runtime.py')
proof=json.loads((W/'runtime-uv-equivalence.json').read_text());assert proof['passed']and proof['matchedTriangles']==expected['triangles'];a=json.loads((W/'authoring.json').read_text());a['lighting']=expected['lighting'];a['stage']='R03 clearance correction; visibility accepted, full-room strict visual acceptance not claimed';(W/'authoring.json').write_text(json.dumps(a,indent=2)+'\n');run(W/'electrical-master.blend','finalize-electrical.py')
proof.update({'masterSHA256':sha(W/'electrical-master.blend'),'sourceCommit':os.environ.get('GITHUB_SHA','local'),'originalVRPhotosIncluded':False,'productionAuthoringSHA256':sha(P/'authoring.json'),'inputs':[{'tag':t,'name':n,'sha256':h}for t,n,h in inputs]});(O/'equivalence.json').write_text(json.dumps(proof,indent=2)+'\n')
if '--bind-only'in sys.argv:
 print('R03 CANONICAL BINDING VERIFIED',json.dumps(proof),flush=True);sys.exit(0)
def archive(name,files):
 with zipfile.ZipFile(O/name,'w',compression=zipfile.ZIP_DEFLATED,compresslevel=6)as z:
  for file,relative in files:z.write(file,relative)
owned=['release-electrical-clearance.py','build-clearance-casings.py','correct-electrical-clearance.py','check-clearance-authoring.py','check-clearance-visibility.py','check-clearance-rays.py','check-clearance-webgl.cjs','check-clearance-control-ids.py','check-clearance-mounts.py','clearance-evidence.mjs','export-clearance-audit.mjs','export-clearance-input.py','prove-clearance-components.mjs','partition-electrical.mjs','prepare-electrical.mjs','pack-electrical-uv.py','bake-electrical.py','finalize-electrical.py','build-left-engine.py','bake-left-engine.py','align-electrical-runtime.py','export-electrical-runtime.mjs','capture-electrical.cjs','check-electrical-service-clearance.py','compare-clearance-grid.py','report-electrical-clearance.mjs']
archive('luz-electrical-clearance-r03-authoring.zip',[(W/'electrical-master.blend','electrical-master.blend'),(W/'authoring.json','authoring.json'),(O/'equivalence.json','equivalence.json'),*[(R/'tools'/n,'tools/'+n)for n in owned],*[(P/n,'review/'+('production-authoring.json'if n=='authoring.json'else n))for n in ['authoring.json','input-authoring.json','clearance-evidence.json','casings.json','validation.json','component-inventory.json']],*[(f,'textures/'+f.name)for f in(W/'textures').glob('*.png')]])
archive('luz-electrical-clearance-r03-bakes.zip',[(f,f.name)for f in P.glob('*.exr')]+[(W/n,n)for n in ['runtime-corners.bin','runtime-binding.json','runtime-materials.bin','runtime-door-corners.bin']]+[(P/'authoring.json','authoring.json')])
review=R/'public/review/electrical-vr-r01';archive('luz-electrical-clearance-r03-evidence.zip',[(f,str(f.relative_to(review)))for f in review.rglob('*')if f.is_file()]+[(O/'equivalence.json','equivalence.json')])
(O/'SHA256SUMS').write_text(''.join(sha(f)+'  '+f.name+'\n'for f in sorted(O.glob('*.zip'))))
(O/'NOTES.md').write_text('Corrección R03 de interferencias ante los diez mandos y sus rótulos. Carcasas de escalera retranqueadas; recorte local del peldaño 8 a igual altura y barandilla continua en el lado opuesto, según la elección explícita del usuario. Tres pequeñas piezas de montaje inferidas cierran los apoyos y el terminal del pasamanos; no se identifican como herrajes observados en la VR. Mandos, motores, puerta y navegación conservados.\n\nLa validación acepta la visibilidad del alcance corregido; no certifica la semejanza completa del cuarto. Incluye Blender editable, materiales propios, cuatro atlas y tres reflejos de producción y comparativas R02/R03. UV y transporte por esquina vinculados al GLB comprimido mediante correspondencia de todas las caras. Las fotografías VR y sus comparaciones permanecen privadas. Las profundidades y dimensiones son digitales, no mediciones del barco. Se conservan los archivos R02.\n')
print('R03 AUTHORING RELEASE VERIFIED',json.dumps(proof),flush=True)
