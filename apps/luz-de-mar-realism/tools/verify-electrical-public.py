"""Verify new runtime bytes and all servable original files; preserve the629-file tree."""
from pathlib import Path
import os,json,urllib.request,hashlib,concurrent.futures,subprocess,posixpath
R=Path(__file__).resolve().parents[1];W=Path(os.environ.get('ELECTRICAL_AUTHORING_WORK',str(R/'work/electrical-vr-r01')));S=(R/'../../site').resolve();base='https://ageofresearch.github.io/';commit=subprocess.check_output(['git','rev-parse','HEAD'],cwd=R,text=True).strip()
def sha(b):return hashlib.sha256(b).hexdigest()
review=os.environ.get('ELECTRICAL_REVIEW_PATH','review/electrical-vr-r01')
room=json.loads((S/'luz-de-mar-realism/assets/machinery/room.json').read_text());paths=['index.html','assets/manifest.json','assets/hashes.json','publication.json','assets/machinery/room.json','assets/machinery/room.glb',review+'/index.html',review+'/validation.json']+[posixpath.normpath('assets/machinery/electrical-vr-r01/'+n)for n in room['electricalAppearance']['hashes']]
entry=(S/'luz-de-mar-realism/index.html').read_text()
import re
paths+=re.findall(r'(?:src|href)="(/luz-de-mar-realism/assets/[^" ]+)"',entry);paths=[n.removeprefix('/luz-de-mar-realism/')for n in paths]
original=json.loads((R/'work/left-engine-r13/original-629.json').read_text());assert len(original)==629
for n,h in original.items():assert sha((S/n).read_bytes())==h,('Local original changed',n)
hidden=[n for n in original if Path(n).name=='.nojekyll'];assert hidden==['tidewater-rocha/.nojekyll'];servable={n:h for n,h in original.items()if n not in hidden}
public_originals=servable if os.environ.get('ELECTRICAL_VERIFY_ORIGINALS_PUBLIC','1')=='1'else{}
expected={**public_originals,**{'luz-de-mar-realism/'+n:sha((S/'luz-de-mar-realism'/n).read_bytes())for n in paths}}
def check(item):
 name,digest=item
 try:
  with urllib.request.urlopen(base+name+'?verify='+commit,timeout=180)as response:data=response.read()
 except Exception as e:raise RuntimeError(name)from e
 assert sha(data)==digest,('Published hash mismatch',name)
 return{'path':name,'bytes':len(data),'sha256':digest,'passed':True}
with concurrent.futures.ThreadPoolExecutor(max_workers=6)as pool:results=list(pool.map(check,expected.items()))
before=subprocess.check_output(['git','rev-parse','f399e512a18ad6c40b9e401524f1a0ba6dca95a9:site/tidewater-rocha'],cwd=R,text=True).strip();after=subprocess.check_output(['git','rev-parse','HEAD:site/tidewater-rocha'],cwd=R,text=True).strip();assert before==after
report={'commit':commit,'publicBase':base,'assets':results,'originalYachtTreeUnchanged':True,'originalGitTree':after,'localOriginalFilesVerified':629,'publicOriginalFilesVerified':len(public_originals),'dotfilesPreservedInGitButNotServed':hidden,'pass':True};(W/'public-verification.json').write_text(json.dumps(report,indent=2)+'\n');print('PUBLIC BYTES VERIFIED',len(results),'assets;',len(public_originals),'public originals; preserved629-file Git tree',flush=True)
