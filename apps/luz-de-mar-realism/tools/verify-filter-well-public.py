"""Verify the actual deployed well and preserve the original 629-file tree."""
from pathlib import Path
import json,os,re,hashlib,urllib.request,concurrent.futures,subprocess
R=Path(__file__).resolve().parents[1];S=(R/'../../site').resolve();W=Path(os.environ.get('FILTER_WELL_WORK','/tmp/ldm-filter-well-r01'));commit=subprocess.check_output(['git','rev-parse','HEAD'],cwd=R,text=True).strip();sha=lambda b:hashlib.sha256(b).hexdigest();manifest=json.loads((S/'luz-de-mar-realism/assets/hashes.json').read_text())
paths=['index.html','assets/manifest.json','assets/hashes.json','publication.json','assets/machinery/room.json','assets/machinery/room.glb']+[n for n in manifest['files']if n.startswith(('assets/machinery/filter-well-r01/','review/filter-well-r01/'))or re.fullmatch(r'assets/[^/]+\.(js|css)',n)]
guard=json.loads((R/'work/left-engine-r13/original-629.json').read_text());assert len(guard)==629
for n,h in guard.items():assert sha((S/n).read_bytes())==h,n
expected={'luz-de-mar-realism/'+n:sha((S/'luz-de-mar-realism'/n).read_bytes())for n in paths};expected['tidewater-rocha/play.html']=guard['tidewater-rocha/play.html']
def check(item):
 name,digest=item
 with urllib.request.urlopen('https://ageofresearch.github.io/'+name+'?verify='+commit,timeout=180)as f:data=f.read()
 assert sha(data)==digest,('Public byte mismatch',name)
 return{'path':name,'bytes':len(data),'sha256':digest}
with concurrent.futures.ThreadPoolExecutor(max_workers=6)as pool:records=list(pool.map(check,expected.items()))
tree=subprocess.check_output(['git','rev-parse','HEAD:site/tidewater-rocha'],cwd=R,text=True).strip();assert tree=='f5475b87b550c4d5dfb999a49d37d86dcefe4c25'
report={'pass':True,'commit':commit,'publicAssets':records,'originalFilesLocallyVerified':629,'originalGitTree':tree,'originalPublishedEntryVerified':True,'allOriginalPublicBytesRedownloadedThisTurn':False};(W/'public-verification.json').write_text(json.dumps(report,indent=2)+'\n');print('PUBLIC FILTER WELL VERIFIED',len(records),'assets;629 original files and Git tree unchanged')
