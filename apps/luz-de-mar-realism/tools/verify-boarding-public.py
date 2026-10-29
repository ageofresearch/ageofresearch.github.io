"""Verify downloaded candidate bytes, independently of the local build."""
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor
from urllib.request import urlopen, Request
import json,hashlib
R=Path(__file__).resolve().parents[1];W=R/'work/boarding-vr-r01';base='https://ageofresearch.github.io/luz-de-mar-realism/'
def download(name):
 with urlopen(Request(base+name+'?v=boarding-vr-r01',headers={'User-Agent':'Luz-de-Mar-asset-verification'}),timeout=180)as r:return r.read()
publication=json.loads(download('publication.json'));assert publication['build']=='boarding-vr-r01'
encoded=download('assets/hashes.json');assert hashlib.sha256(encoded).hexdigest()==publication['assetManifestSHA256'];hashes=json.loads(encoded)['files']
files=[n for n in hashes if n.startswith(('assets/beach-club/','assets/cockpit/','review/boarding-vr-r01/'))or n in['index.html','assets/manifest.json','assets/navigation.json','assets/entry-load-r01.json','assets/yacht-structure.json']or n.startswith(('assets/index-','assets/mechanics-','assets/shading-'))]
def verify(name):
 b=download(name);h=hashlib.sha256(b).hexdigest();assert h==hashes[name]['sha256'],name;assert len(b)==hashes[name]['bytes'];return{'path':name,'bytes':len(b),'sha256':h}
with ThreadPoolExecutor(max_workers=4)as pool:verified=list(pool.map(verify,files))
report={'pass':True,'url':base+'?room=beach-club&release=boarding-vr-r01','build':publication['build'],'downloadedFiles':verified,'candidatePromoted':publication['boarding']['promoted'],'pagesArtifact':publication['pagesArtifact'],'method':'Downloaded bytes compared with the published hash manifest, whose hash is bound to publication.json. Full original-yacht preservation is checked separately on the deployed source tree.'}
(W/'public').mkdir(exist_ok=True);(W/'public/asset-verification.json').write_text(json.dumps(report,indent=2)+'\n');print(json.dumps({'pass':True,'downloadedFiles':len(verified),'bytes':sum(r['bytes']for r in verified)}))
