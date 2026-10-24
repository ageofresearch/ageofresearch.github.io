"""Archive native diagnostic captures and reproducible tests for GitHub Releases."""
from pathlib import Path
import json,hashlib,zipfile
R=Path(__file__).resolve().parents[1];W=R/'work/machinery-sharp-r01';A=W/'release';A.mkdir(exist_ok=True)
report=json.loads((W/'browser/report.json').read_text());assert report['pass']
files={}
for p in (W/'browser').glob('*.png'):files['candidate/'+p.name]=p
for name in ['browser/report.json','validation.json','timing-before.json','timing-after.json','mobile.json','mobile-layout.json','default/report.json','asset-verification.json','original-verification.json','tests.log','resolution-tests.log']:
 p=W/name
 if p.exists():files['validation/'+name]=p
for name in ['machinery-resolution-browser.cjs','machinery-resolution-mobile.cjs','machinery-resolution-timing.cjs','machinery-resolution-layout.cjs','resolution.test.mjs']:files['tests/'+name]=R/'test'/name
for name in ['adaptive-walking-native.png','rest-full-native.png','report.json','controller.json','investigate.cjs','controller.cjs']:
 p=Path('/tmp/luz-engine-blur')/name
 if p.exists():files['before/'+name]=p
manifest={name:{'sha256':hashlib.sha256(p.read_bytes()).hexdigest(),'bytes':p.stat().st_size}for name,p in files.items()}
archive=A/'machinery-sharp-r01-evidence.zip'
with zipfile.ZipFile(archive,'w',compression=zipfile.ZIP_DEFLATED,compresslevel=6)as z:
 for name,p in sorted(files.items()):z.write(p,name)
 z.writestr('manifest.json',json.dumps(manifest,indent=2)+'\n')
with zipfile.ZipFile(archive)as z:
 for name,spec in manifest.items():assert hashlib.sha256(z.read(name)).hexdigest()==spec['sha256']
(A/'archive-verification.json').write_text(json.dumps({'entriesVerified':len(manifest),'privateVRImagesIncluded':False,'archiveSHA256':hashlib.sha256(archive.read_bytes()).hexdigest(),'bytes':archive.stat().st_size},indent=2)+'\n')
print('Verified evidence archive',archive.stat().st_size,'bytes,',len(manifest),'entries')
