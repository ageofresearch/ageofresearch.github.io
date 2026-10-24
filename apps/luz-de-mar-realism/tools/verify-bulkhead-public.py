"""Verify deployed bytes, not only successful Pages job status."""
from pathlib import Path
import json,urllib.request,hashlib,concurrent.futures,subprocess
R=Path(__file__).resolve().parents[1];W=R/'work/bulkhead-vr-r01';S=R/'../../site/luz-de-mar-realism';base='https://ageofresearch.github.io/luz-de-mar-realism/';commit=subprocess.check_output(['git','rev-parse','HEAD'],cwd=R,text=True).strip()
def sha(b):return hashlib.sha256(b).hexdigest()
room=json.loads((S/'assets/machinery/room.json').read_text());paths=['index.html','assets/manifest.json','assets/hashes.json','publication.json','assets/machinery/room.json','assets/machinery/room.glb','review/bulkhead-vr-r01/index.html','assets/machinery/bulkhead-vr-r01/authoring.json']+['assets/machinery/bulkhead-vr-r01/'+n for n in room['bulkheadAppearance']['hashes']]
def check(name):
 url=base+name+'?verify='+commit
 with urllib.request.urlopen(url,timeout=180)as response:data=response.read()
 expected=sha((S/name).read_bytes());assert sha(data)==expected,('Published hash mismatch',name);return{'path':name,'bytes':len(data),'sha256':expected,'passed':True}
with concurrent.futures.ThreadPoolExecutor(max_workers=3)as pool:results=list(pool.map(check,paths))
original=R/'../../site/tidewater-rocha/play.html'
with urllib.request.urlopen('https://ageofresearch.github.io/tidewater-rocha/play.html?world=rocha&verify='+commit,timeout=180)as response:entry=response.read()
assert sha(entry)==sha(original.read_bytes())
before=subprocess.check_output(['git','rev-parse','11c4a9c:site/tidewater-rocha'],cwd=R,text=True).strip();after=subprocess.check_output(['git','rev-parse','HEAD:site/tidewater-rocha'],cwd=R,text=True).strip();assert before==after
report={'commit':commit,'publicBase':base,'assets':results,'originalYachtTreeUnchanged':True,'originalGitTree':after,'publicOriginalEntrySHA256':sha(entry),'localOriginalFilesVerified':629,'pass':True};(W/'public-verification.json').write_text(json.dumps(report,indent=2)+'\n');print('PUBLIC BYTES VERIFIED',len(results),'assets; original yacht tree and entry unchanged')
