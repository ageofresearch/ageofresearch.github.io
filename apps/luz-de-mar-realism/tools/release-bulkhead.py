"""Rebuild editable authoring in a CI runner; never place ZIPs in Pages/git.

Inputs are already-public, hash-pinned original authoring releases. Original VR
photos are neither downloaded nor packaged. Canonical geometry and UV corner
hashes must match the reviewed/published authoring record before upload.
"""
from pathlib import Path
import os,json,hashlib,urllib.request,zipfile,subprocess,shutil
R=Path(__file__).resolve().parents[1];W=R/'work/bulkhead-vr-r01';P=R/'public/assets/machinery/bulkhead-vr-r01';O=W/'release'
O.mkdir(parents=True,exist_ok=True)
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def download(url,dest,expected):
 dest.parent.mkdir(parents=True,exist_ok=True)
 if not dest.exists() or sha(dest)!=expected:urllib.request.urlretrieve(url,dest)
 assert sha(dest)==expected,('Source hash mismatch',url)
 return dest
inputs=[('luz-de-mar-machinery-r11','luz-de-mar-machinery-r11.zip','3140321fe7b5f01700ac2421cc80467df7ff1373c7974ee2a4dc0b09c133f41f'),('luz-right-engine-r01','luz-right-engine-r01-authoring.zip','9a704a9e393206af07e4719f73059eaca4ec034215e807065a205fe82381c54f')]
for tag,name,digest in inputs:
 archive=download('https://github.com/ageofresearch/ageofresearch.github.io/releases/download/'+tag+'/'+name,W/'input-archives'/name,digest)
 with zipfile.ZipFile(archive) as z:
  wanted={'source-snapshot/machinery.bin':R/'work/machinery-r11/snapshot/machinery.bin','source-snapshot/machinery.json':R/'work/machinery-r11/snapshot/machinery.json'}if tag.endswith('r11')else{'right-engine-master.blend':R/'work/right-engine-r01/right-engine-master.blend'}
  for member,dest in wanted.items():
   dest.parent.mkdir(parents=True,exist_ok=True);dest.write_bytes(z.read(member))
shutil.copyfile(P/'evidence.json',W/'evidence-frozen.json');shutil.copyfile(P/'fine-neutral-review.json',W/'fine-neutral-review.json')
blender=os.environ.get('BLENDER','blender');original=R/'work/right-engine-r01/right-engine-master.blend'
def run(master,script):subprocess.run([blender,'-b',str(master),'-t','4','--python',str(R/'tools'/script)],check=True)
run(original,'build-bulkhead.py');run(W/'bulkhead-neutral.blend','finish-bulkhead.py');run(W/'bulkhead-master.blend','bulkhead-collisions.py')
actual=json.loads((W/'authoring.json').read_text());expected=json.loads((P/'authoring.json').read_text())
assert actual['neutralGeometrySHA256']==expected['neutralGeometrySHA256'],'Canonical geometry differs'
assert actual['uv']['uvTrianglesSHA256']==expected['uv']['uvTrianglesSHA256'],'UV corner layout differs; do not publish a mismatched scene'
assert actual['triangles']==expected['triangles']
for name,digest in expected['sourceTextures'].items():assert sha(W/'textures'/name)==digest,('Source material map changed',name)
run(W/'bulkhead-master.blend','finalize-bulkhead.py')
proof={'method':'Pinned Blender 4.3.2 reconstruction from verified public input archives; canonical evaluated source and exact optimized UV corner hashes match the locally reviewed production record. Blend binary metadata may differ.','neutralGeometrySHA256':actual['neutralGeometrySHA256'],'uvTrianglesSHA256':actual['uv']['uvTrianglesSHA256'],'triangles':actual['triangles'],'originalVRPhotosIncluded':False,'masterSHA256':sha(W/'bulkhead-master.blend'),'sourceCommit':os.environ.get('GITHUB_SHA','local')}
(O/'equivalence.json').write_text(json.dumps(proof,indent=2)+'\n')
def archive(name,files):
 with zipfile.ZipFile(O/name,'w',compression=zipfile.ZIP_DEFLATED,compresslevel=6) as z:
  for file,relative in files:z.write(file,relative)
owned=['build-bulkhead.py','refine-bulkhead.py','finish-bulkhead.py','pack-bulkhead-uv.py','bake-bulkhead.py','bulkhead-collisions.py','finalize-bulkhead.py','build-left-engine.py','bake-left-engine.py','bulkhead-fine-observations.json','release-bulkhead.py']
archive('luz-bulkhead-vr-r01-authoring.zip',[(W/'bulkhead-master.blend','bulkhead-master.blend'),(W/'authoring.json','authoring.json'),(O/'equivalence.json','equivalence.json'),*[(R/'tools'/n,'tools/'+n)for n in owned],*[(P/n,'review/'+('production-authoring.json'if n=='authoring.json'else n))for n in ['authoring.json','evidence.json','fine-neutral-review.json','component-inventory.json','validation.json']],*[(f,'textures/'+f.name)for f in (W/'textures').glob('*.png')]])
archive('luz-bulkhead-vr-r01-bakes.zip',[(f,f.name)for f in P.glob('*.exr')]+[(P/'authoring.json','authoring.json')])
review=R/'public/review/bulkhead-vr-r01'
archive('luz-bulkhead-vr-r01-evidence.zip',[(f,str(f.relative_to(review)))for f in review.rglob('*')if f.is_file()]+[(O/'equivalence.json','equivalence.json')])
(O/'SHA256SUMS').write_text(''.join(sha(f)+'  '+f.name+'\n'for f in sorted(O.glob('*.zip'))))
(O/'NOTES.md').write_text('Candidata del mamparo VR R01. Escena editable con 16/8 px de revisión y mapas de autoría propia. No se declara alcanzada la tolerancia visual estricta. Las fotografías originales de VR permanecen privadas.\n\nLa escena se reconstruye con Blender 4.3.2 y se verifican las geometrías evaluadas y los UV de producción; `equivalence.json` documenta esa correspondencia. Los bakes incluidos son los EXR lineales de producción. Los dos motores conservan sus activos originales.\n')
print('VERIFIED RELEASE',json.dumps(proof),flush=True)
