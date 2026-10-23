"""Verify the deployed candidate bytes and unchanged original yacht tree."""
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor
import subprocess,json,hashlib,sys,time,urllib.request
R=Path(__file__).resolve().parents[1];repo=R.parents[1];W=R/'work/right-engine-r01';base='5bb26ba6083bd82feefc763a5c3bb1d4a8e5aba6';commit=sys.argv[1]
def git(*args):return subprocess.check_output(['git',*args],cwd=repo,text=True).strip()
assert git('rev-parse',commit)==commit
files=git('diff','--name-only','--diff-filter=ACM',base,commit,'--','site/luz-de-mar-realism').splitlines()
def verify(name):
 local=repo/name;rel=name.removeprefix('site/');expected=hashlib.sha256(local.read_bytes()).hexdigest();url='https://ageofresearch.github.io/'+rel+'?verify='+commit[:12];error=''
 for attempt in range(5):
  try:
   with urllib.request.urlopen(url,timeout=90)as r:
    actual=hashlib.sha256();size=0
    while chunk:=r.read(1024*1024):actual.update(chunk);size+=len(chunk)
   assert actual.hexdigest()==expected,('Hash differs',rel,actual.hexdigest(),expected)
   return {'file':rel,'bytes':size,'sha256':expected,'match':True}
  except Exception as e:error=str(e);time.sleep(min(attempt+1,5))
 raise RuntimeError(error)
legacy=json.loads((R/'work/left-engine-r13/original-629.json').read_text());assert len(legacy)==629
assert git('rev-parse',base+':site/tidewater-rocha')==git('rev-parse',commit+':site/tidewater-rocha')
assert all(hashlib.sha256((repo/'site'/name).read_bytes()).hexdigest()==digest for name,digest in legacy.items())
with ThreadPoolExecutor(max_workers=4)as pool:results=list(pool.map(verify,files+['site/tidewater-rocha/play.html']))
report={'sourceCommit':commit,'baselineCommit':base,'allPublishedSHA256Match':True,'newFilesVerified':len(files),'originalFilesVerified':len(legacy),'originalGitTreeUnchanged':True,'originalPublicEntryVerified':True,'originalVerificationMethod':'SHA256 of all629 local files and identical Git tree at the deployed commit; public HTTP hash check of play.html','files':results}
(W/'public-verification.json').write_text(json.dumps(report,indent=2)+'\n');print('PUBLIC HASH CHECK',len(files),'candidate files + original entry; original629 tree unchanged')
