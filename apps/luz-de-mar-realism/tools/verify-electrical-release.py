"""Full published Release download hashes, ZIP CRC and editable/runtime binding."""
from pathlib import Path
import json,hashlib,urllib.request,zipfile,concurrent.futures
R=Path(__file__).resolve().parents[1];W=R/'work/electrical-vr-r01';O=W/'release-download';O.mkdir(parents=True,exist_ok=True);base='https://github.com/ageofresearch/ageofresearch.github.io/releases/download/luz-electrical-vr-r01/'
def download(name):
 target=O/name;h=hashlib.sha256()
 with urllib.request.urlopen(base+name,timeout=240)as response,target.open('wb')as output:
  while data:=response.read(1024*1024):h.update(data);output.write(data)
 return name,h.hexdigest()
download('SHA256SUMS');expected={line.split()[1]:line.split()[0]for line in(O/'SHA256SUMS').read_text().splitlines()if line.strip()};assert len(expected)==3
with concurrent.futures.ThreadPoolExecutor(max_workers=3)as pool:hashes=dict(pool.map(download,expected))
assert hashes==expected,'Release download SHA256 mismatch';archives=[]
for name,digest in hashes.items():
 with zipfile.ZipFile(O/name)as z:
  assert z.testzip()is None,('ZIP CRC failure',name)
  assert not any('pano_'in n or n.endswith(('-reference.jpg','-reference.png'))for n in z.namelist()),'Private VR image included'
  archives.append({'name':name,'sha256':digest,'bytes':(O/name).stat().st_size,'members':len(z.namelist()),'crcVerified':True})
with zipfile.ZipFile(O/'luz-electrical-vr-r01-authoring.zip')as z:
 proof=json.loads(z.read('equivalence.json'));author=json.loads(z.read('authoring.json'));master=hashlib.sha256(z.read('electrical-master.blend')).hexdigest();assert master==proof['masterSHA256']==author['masterSHA256'];assert proof['passed']and proof['matchedTriangles']==88083 and not proof['originalVRPhotosIncluded'];assert proof['maximumGeometryDifferenceMetres']<=.00025 and proof['maximumCopiedUVComponentError']<2e-7
 expected_runtime=hashlib.sha256((R/'public/assets/machinery/electrical-vr-r01/electrical.glb').read_bytes()).hexdigest();assert proof['runtimeGLBSHA256']==expected_runtime
report={'release':base,'archives':archives,'binding':proof,'pass':True};(W/'release-verification.json').write_text(json.dumps(report,indent=2)+'\n');print('RELEASE VERIFIED',len(archives),'complete ZIP downloads; hashes, CRC and Blender binding passed',flush=True)
