"""Publish an editable derivative through the authenticated GitHub runner."""
from pathlib import Path
import os,json,hashlib,zipfile,urllib.request,subprocess
R=Path(__file__).resolve().parents[1];W=R/'work/pedestal-r01-release';W.mkdir(parents=True,exist_ok=True)
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
with zipfile.ZipFile(R/'tools/pedestal-r01-inputs.zip')as z:z.extractall(W)
parent=W/'parent.zip';url='https://github.com/ageofresearch/ageofresearch.github.io/releases/download/luz-generator-vr-r01/luz-generator-vr-r01-authoring.zip'
urllib.request.urlretrieve(url,parent)
assert sha(parent)=='c2d968333abeb9d94c6b5a0afb1e9870249a2d745a0adcde8e0f4a36a04a4929', 'Parent archive mismatch'
with zipfile.ZipFile(parent)as z:
 (W/'parent-master.blend').write_bytes(z.read('electrical-master.blend'));parent_meta=json.loads(z.read('authoring.json'))
old_url='https://raw.githubusercontent.com/ageofresearch/ageofresearch.github.io/f03845c7f5cff1f20e21c14b068e223fd3055253/apps/luz-de-mar-realism/public/assets/machinery/electrical-vr-r01/electrical.glb'
urllib.request.urlretrieve(old_url,W/'baseline/electrical.glb');assert sha(W/'baseline/electrical.glb')=='98342260c4ad2b58e5e59794482f2821ade61a4fef4a52f5a8d782249e67488a'
env={**os.environ,'PEDESTAL_WORK':str(W)}
subprocess.run([os.environ['BLENDER'],'-b',str(W/'parent-master.blend'),'-t','4','--python-exit-code','1','--python',str(R/'tools/update-pedestal-authoring.py')],check=True,env=env)
release_proof={'parentArchiveSHA256':sha(parent),'parentMasterSHA256':sha(W/'parent-master.blend'),'parentRuntimeUVBinding':parent_meta.get('runtimeUVBinding'),'patch':json.loads((W/'geometry-proof.json').read_text()),'master':json.loads((W/'authoring-proof.json').read_text()),'publishedRuntimeSHA256':sha(R/'public/assets/machinery/electrical-vr-r01/electrical.glb')}
assert release_proof['publishedRuntimeSHA256']==release_proof['patch']['runtimeSHA256']
(W/'release-proof.json').write_text(json.dumps(release_proof,indent=2)+'\n')
D=W/'release';D.mkdir(exist_ok=True);output=D/'luz-pedestal-r01-authoring.zip'
files=[(p,p.relative_to(W).as_posix())for p in W.rglob('*')if p.is_file()and p.suffix in ['.json','.webp','.md','.log']and D not in p.parents]
files +=[(W/'electrical-master.blend','electrical-master.blend'),(W/'baseline/electrical.glb','baseline/electrical.glb'),(R/'public/assets/machinery/electrical-vr-r01/electrical.glb','electrical.glb')]
files +=[(p,'tools/'+p.name)for p in (R/'tools').glob('*pedestal*')if p.suffix!='.zip']
manifest={n:{'bytes':p.stat().st_size,'sha256':sha(p)}for p,n in files}
with zipfile.ZipFile(output,'w',zipfile.ZIP_DEFLATED,compresslevel=6)as z:
 for p,n in files:z.write(p,n)
 z.writestr('contents.json',json.dumps(manifest,indent=2)+'\n')
with zipfile.ZipFile(output)as z:assert z.testzip()is None
(D/'SHA256SUMS').write_text(sha(output)+'  '+output.name+'\n');(D/'release-proof.json').write_text(json.dumps(release_proof,indent=2)+'\n')
print('AUTHORING READY',output.stat().st_size,sha(output),flush=True)
