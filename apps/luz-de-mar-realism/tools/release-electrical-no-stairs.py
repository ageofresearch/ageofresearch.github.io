"""Rebuild the no-stairs editable scene from the preserved R03 release."""
from pathlib import Path
import hashlib, json, os, shutil, subprocess, urllib.request, zipfile

R = Path(__file__).resolve().parents[1]
W = R/'work/electrical-no-stairs-r04-release'
P = R/'public/assets/machinery/electrical-vr-r01'
O = W/'release'
O.mkdir(parents=True, exist_ok=True)
os.environ['ELECTRICAL_AUTHORING_WORK'] = str(W)
def sha(p): return hashlib.sha256(p.read_bytes()).hexdigest()
inputs = [
 ('luz-electrical-clearance-r03', 'luz-electrical-clearance-r03-authoring.zip', '664d988ee90d61d39f88fa791ef3aef1f69b57dc2e438f5cf0e669aa07f5ce0d'),
 ('luz-de-mar-machinery-r11', 'luz-de-mar-machinery-r11.zip', '3140321fe7b5f01700ac2421cc80467df7ff1373c7974ee2a4dc0b09c133f41f')]
for tag, name, digest in inputs:
 archive=W/name
 urllib.request.urlretrieve(f'https://github.com/ageofresearch/ageofresearch.github.io/releases/download/{tag}/{name}', archive)
 assert sha(archive)==digest, 'Pinned authoring input changed'
 with zipfile.ZipFile(archive) as z:
  wanted = {'electrical-master.blend':W/'input-master.blend', 'review/production-authoring.json':W/'input-authoring.json', 'review/component-inventory.json':W/'input-component-inventory.json'} if tag.endswith('r03') else {'source-snapshot/machinery.bin':R/'work/machinery-r11/snapshot/machinery.bin', 'source-snapshot/machinery.json':R/'work/machinery-r11/snapshot/machinery.json'}
  for member, target in wanted.items():
   target.parent.mkdir(parents=True, exist_ok=True)
   target.write_bytes(z.read(member))
def run(master, script):
 env=dict(os.environ);env.pop('PYTHONPATH',None)
 subprocess.run([os.environ.get('BLENDER','blender'), '-b', str(master), '-t', '4', '--python-exit-code', '1', '--python', str(R/'tools'/script)], check=True, env=env)
run(W/'input-master.blend','remove-service-stairs.py')
subprocess.run(['node', str(R/'tools/export-electrical-runtime.mjs')], check=True)
run(W/'electrical-master.blend','align-electrical-runtime.py')
a=json.loads((W/'authoring.json').read_text());expected=json.loads((P/'authoring.json').read_text())
a['lighting']=expected['lighting'];a['stage']=expected['stage']
(W/'authoring.json').write_text(json.dumps(a,indent=2)+'\n')
run(W/'electrical-master.blend','finalize-electrical.py')
proof=json.loads((W/'runtime-uv-equivalence.json').read_text())
assert proof['passed'] and proof['matchedTriangles']==114622
proof.update(masterSHA256=sha(W/'electrical-master.blend'), sourceCommit=os.environ.get('GITHUB_SHA','local'), originalVRPhotosIncluded=False, inputs=[dict(tag=t,name=n,sha256=h)for t,n,h in inputs])
(O/'equivalence.json').write_text(json.dumps(proof,indent=2)+'\n')
owned=['remove-service-stairs.py','remove-stairs-room.mjs','build-left-engine.py','bake-left-engine.py','bake-electrical.py','prepare-electrical.mjs','partition-electrical.mjs','finalize-electrical.py','align-electrical-runtime.py','export-electrical-runtime.mjs','electrical-navigation.py','release-electrical-no-stairs.py']
files=[(W/'electrical-master.blend','electrical-master.blend'),(W/'authoring.json','authoring.json'),(O/'equivalence.json','equivalence.json'),(W/'removal.json','removal.json'),*[(R/'tools'/n,'tools/'+n)for n in owned],*[(p,'bakes/'+p.name)for p in P.glob('*.exr')]]
name='luz-electrical-no-stairs-r04-authoring.zip'
with zipfile.ZipFile(O/name,'w',compression=zipfile.ZIP_DEFLATED,compresslevel=6)as z:
 for file,relative in files:z.write(file,relative)
(O/'SHA256SUMS').write_text(sha(O/name)+'  '+name+'\n')
(O/'NOTES.md').write_text('Escalera de servicio retirada del cuarto de máquinas a petición del usuario: peldaños, carcasas y pasamanos. Reubicación pendiente. Mandos eléctricos y geometría/acabados de ambos motores conservados. Incluye Blender editable, cuatro atlas y tres reflejos regenerados sin la escalera; UV y transporte vinculados a todas las caras del GLB de producción. La versión R03 permanece disponible sin modificar. No se incluyen fotografías VR.\n')
print('R04 AUTHORING VERIFIED',json.dumps(proof),flush=True)
