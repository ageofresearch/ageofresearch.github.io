"""Verify every deployed new-page file and all 629 original yacht files."""
import urllib.request,ssl,hashlib,json,concurrent.futures,sys,time
from pathlib import Path
from urllib.parse import quote
revision=sys.argv[1];source_commit=sys.argv[3];out=Path(sys.argv[2]);out.mkdir(parents=True,exist_ok=True);base='https://ageofresearch.github.io/';ctx=ssl.create_default_context(cafile='/usr/local/share/ca-certificates/environment-proxy-ca.crt')
def open_file(name):
 url=('https://raw.githubusercontent.com/ageofresearch/ageofresearch.github.io/'+source_commit+'/site/'+name)if name.endswith('/.nojekyll')else base+quote(name,safe='/')+'?verify='+revision
 return urllib.request.urlopen(url,context=ctx,timeout=180)
def read(name):
 with open_file(name)as response:return response.read()
publication=json.loads(read('luz-de-mar-realism/publication.json'));raw=read('luz-de-mar-realism/assets/hashes.json');assert hashlib.sha256(raw).hexdigest()==publication['assetManifestSHA256'];manifest=json.loads(raw);guard=json.loads(read('luz-de-mar-realism/review/original-yacht-hashes.json'))
jobs=[('luz-de-mar-realism/'+name,item['sha256'],item['bytes'],'new')for name,item in manifest['files'].items()]+[('tidewater-rocha/'+name,sha,None,'original-marker'if name=='.nojekyll'else'original')for name,sha in guard['files'].items()]
def check(job):
 name,expected,expected_size,kind=job
 for attempt in range(3):
  try:
   with open_file(name)as response:
    h=hashlib.sha256();size=0
    while True:
     block=response.read(1024*1024)
     if not block:break
     size+=len(block);h.update(block)
   assert h.hexdigest()==expected,'SHA mismatch: '+name
   assert expected_size is None or size==expected_size,'Size mismatch: '+name
   return{'file':name,'bytes':size,'sha256':h.hexdigest(),'scope':kind}
  except Exception:
   if attempt==2:raise RuntimeError('Published hash verification failed: '+name)from None
   time.sleep(2)
checked=[]
with concurrent.futures.ThreadPoolExecutor(max_workers=6)as pool:
 for item in pool.map(check,jobs):
  checked.append(item)
  if len(checked)%100==0:print('VERIFIED',len(checked),'/',len(jobs),flush=True)
report={'publication':publication,'allPublishedSHA256Match':True,'newFilesVerified':sum(r['scope']=='new'for r in checked),'originalFilesVerified':sum(r['scope'].startswith('original')for r in checked),'originalPublicResourcesVerified':sum(r['scope']=='original'for r in checked),'deploymentMarkerSourceChecks':[r for r in checked if r['scope']=='original-marker'],'sourceCommit':source_commit,'bytesDownloaded':sum(r['bytes']for r in checked),'files':checked};assert report['originalFilesVerified']==629;(out/'hash-verification.json').write_text(json.dumps(report,indent=2)+'\n');print('PUBLICATION VERIFIED',report['newFilesVerified'],report['originalFilesVerified'],report['bytesDownloaded'],flush=True)
