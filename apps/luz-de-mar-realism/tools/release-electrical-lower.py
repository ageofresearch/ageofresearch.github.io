"""Reconstruct authoring in Actions from public pinned inputs, then upload there.

Original VR photographs are never downloaded, packaged or used as textures.
Platform-dependent lightmap repacking is replaced by verified runtime corners.
"""
from pathlib import Path
import os,json,hashlib,urllib.request,zipfile,subprocess,shutil
R=Path(__file__).resolve().parents[1];W=R/'work/electrical-lower-r02';os.environ['ELECTRICAL_AUTHORING_WORK']=str(W);P=R/'public/assets/machinery/electrical-vr-r01';O=W/'release';O.mkdir(parents=True,exist_ok=True)
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def download(tag,name,digest):
 p=W/'input-archives'/name;p.parent.mkdir(parents=True,exist_ok=True)
 if not p.exists()or sha(p)!=digest:urllib.request.urlretrieve('https://github.com/ageofresearch/ageofresearch.github.io/releases/download/'+tag+'/'+name,p)
 assert sha(p)==digest,('Public source archive changed',name)
 return p
inputs=[('luz-de-mar-machinery-r11','luz-de-mar-machinery-r11.zip','3140321fe7b5f01700ac2421cc80467df7ff1373c7974ee2a4dc0b09c133f41f'),('luz-electrical-vr-r01','luz-electrical-vr-r01-authoring.zip','83b9c3db8a6d88b0e53b2aab131d396eb9864438281035bf4b9147d33099ceff')]
for tag,name,digest in inputs:
 with zipfile.ZipFile(download(tag,name,digest))as z:
  wanted={'source-snapshot/machinery.bin':R/'work/machinery-r11/snapshot/machinery.bin','source-snapshot/machinery.json':R/'work/machinery-r11/snapshot/machinery.json'}if tag.endswith('r11')else{'electrical-master.blend':R/'work/electrical-vr-r01/electrical-master.blend','review/production-authoring.json':W/'input-authoring.json'}
  for member,target in wanted.items():target.parent.mkdir(parents=True,exist_ok=True);target.write_bytes(z.read(member))
for name,target in [('evidence.json','evidence-frozen.json'),('neutral-review.json','neutral-review.json'),('lower-evidence.json','lower-evidence.json')]:shutil.copyfile(P/name,W/target)
blender=os.environ.get('BLENDER','blender')
def run(master,script):subprocess.run([blender,'-b',str(master),'-t','4','--python-exit-code','1','--python',str(R/'tools'/script)],check=True)
run(R/'work/electrical-vr-r01/electrical-master.blend','correct-electrical-lower.py');run(W/'electrical-neutral.blend','finish-electrical.py')
a=json.loads((W/'authoring.json').read_text());expected=json.loads((P/'authoring.json').read_text());assert a['neutralGeometrySHA256']==expected['neutralGeometrySHA256'],'Canonical electrical geometry changed';assert a['triangles']==expected['triangles']
for name,digest in expected['sourceTextures'].items():assert sha(W/'textures'/name)==digest,('Owned material map changed',name)
subprocess.run(['node',str(R/'tools/export-electrical-runtime.mjs')],check=True);run(W/'electrical-master.blend','align-electrical-runtime.py');proof=json.loads((W/'runtime-uv-equivalence.json').read_text());assert proof['passed']and proof['matchedTriangles']==expected['triangles']
run(W/'electrical-master.blend','finalize-electrical.py');a=json.loads((W/'authoring.json').read_text());proof.update({'masterSHA256':sha(W/'electrical-master.blend'),'sourceCommit':os.environ.get('GITHUB_SHA','local'),'originalVRPhotosIncluded':False,'productionAuthoringSHA256':sha(P/'authoring.json')});(O/'equivalence.json').write_text(json.dumps(proof,indent=2)+'\n')
def archive(name,files):
 with zipfile.ZipFile(O/name,'w',compression=zipfile.ZIP_DEFLATED,compresslevel=6)as z:
  for file,relative in files:z.write(file,relative)
owned=['electrical-evidence.py','build-electrical.py','finish-electrical.py','pack-electrical-uv.py','bake-electrical.py','finalize-electrical.py','electrical-collisions.py','electrical-navigation.py','export-electrical-runtime.mjs','align-electrical-runtime.py','render-electrical.py','audit-electrical.py','check-electrical-controls.py','electrical-verification-controls.json','review-electrical-grid.py','release-electrical-lower.py','correct-electrical-lower.py','report-electrical-lower.mjs','check-electrical-lower-controls.py','check-electrical-service-clearance.py','check-electrical-floor-mat.py','compare-electrical-lower-patches.py','prove-electrical-lighting-only.mjs','prepare-electrical.mjs','repair-electrical-micro-uv.py','rebake-electrical-atlas.py','check-electrical-navigation.mjs','capture-electrical.cjs','report-electrical.mjs','verify-electrical-public.py','verify-electrical-viewer.cjs','build-left-engine.py','bake-left-engine.py']
archive('luz-electrical-lower-r02-authoring.zip',[(W/'electrical-master.blend','electrical-master.blend'),(W/'authoring.json','authoring.json'),(O/'equivalence.json','equivalence.json'),*[(R/'tools'/n,'tools/'+n)for n in owned],*[(P/n,'review/'+('production-authoring.json'if n=='authoring.json'else n))for n in ['authoring.json','evidence.json','neutral-review.json','component-inventory.json','validation.json','input-authoring.json','lower-evidence.json']],*[(f,'textures/'+f.name)for f in(W/'textures').glob('*.png')]])
archive('luz-electrical-lower-r02-bakes.zip',[(f,f.name)for f in P.glob('*.exr')]+[(W/'runtime-corners.bin','runtime-corners.bin'),(W/'runtime-binding.json','runtime-binding.json'),(W/'runtime-door-corners.bin','runtime-door-corners.bin'),(P/'authoring.json','authoring.json')])
review=R/'public/review/electrical-vr-r01';archive('luz-electrical-lower-r02-evidence.zip',[(f,str(f.relative_to(review)))for f in review.rglob('*')if f.is_file()]+[(O/'equivalence.json','equivalence.json'),(R/'tools/electrical-lower-grid-inventory.json.gz','grid-inventory.json.gz')])
(O/'SHA256SUMS').write_text(''.join(sha(f)+'  '+f.name+'\n'for f in sorted(O.glob('*.zip'))))
(O/'NOTES.md').write_text('Frente eléctrico inferior R02 · candidata corregida. Escena editable y materiales propios, con comparación nativa de cuadros de8píxeles en B/R/D/L; el nadir negro se excluye explícitamente. No se declara superada la tolerancia visual estricta. Cuadros cerrados, estados fijos; función del armario ventilado no identificada.\n\nLa geometría canónica se reconstruye con Blender 4.3.2; UV y HDR por esquina se vinculan al GLB público verificado. `equivalence.json` documenta la correspondencia, sin exigir identidad binaria de metadatos Blender. Los EXR incluidos son los bakes lineales de producción; los resultados sin filtrar se conservan en el espacio de trabajo. Las fotografías VR permanecen privadas.\n')
print('ELECTRICAL AUTHORING RELEASE VERIFIED',json.dumps(proof),flush=True)
