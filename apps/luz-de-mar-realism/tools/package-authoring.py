"""Package only the main saloon. Reference photographs stay outside publication."""
from pathlib import Path
import json,hashlib
from zipfile import ZipFile,ZIP_DEFLATED
R=Path(__file__).resolve().parents[1];O=R/'public/authoring';O.mkdir(exist_ok=True);meta=json.loads((R/'public/assets/saloon/authoring.json').read_text());binding=meta['bakeGeometrySHA256'];raw=R/'work/raw-atlases'/binding
assert hashlib.sha256((R/'work/saloon-source.glb').read_bytes()).hexdigest()==binding
with ZipFile(O/'saloon-authoring.zip','w',ZIP_DEFLATED,compresslevel=6)as z:
 z.write(R/'work/saloon-master.blend','Blender/Saloon-MD_R02.blend');z.write(R/'README.md','README.md');z.write(R/'REALISM-AUDIT.md','REALISM-AUDIT.md');z.write(R/'public/CREDITS.md','CREDITS.md')
 for p in (R/'tools').glob('*'):
  if p.is_file()and p.suffix in ['.py','.mjs']:z.write(p,'tools/'+p.name)
 for p in [R/'work/snapshot/saloon.json',R/'work/snapshot/saloon.bin',R/'work/snapshot/snapshot.json']:z.write(p,'work/snapshot/'+p.name)
 for p in (R/'work/reference').glob('*.json'):z.write(p,'work/reference/'+p.name)
 for p in (R/'work/lightmap-uv').glob('*.npz'):z.write(p,'work/lightmap-uv/'+p.name)
 z.write(R/'work/material-sources/sources.json','work/material-sources/sources.json');z.write(R/'work/material-sources/exterior-source.json','work/material-sources/exterior-source.json');z.write(R/'work/textures/materials.json','work/textures/materials.json');z.write(R/'public/assets/saloon/authoring.json','authoring.json')
with ZipFile(O/'saloon-raw-bakes.zip','w',ZIP_DEFLATED,compresslevel=6)as z:
 for a in ['architecture','furniture']:
  p=raw/('saloon-ambient-'+a+'.exr');assert hashlib.sha256(p.read_bytes()).hexdigest()==meta['rawBakesSHA256'][a];z.write(p,p.name)
print('Authoring archive bytes:',(O/'saloon-authoring.zip').stat().st_size)
assert(O/'saloon-authoring.zip').stat().st_size<100*1024*1024,'GitHub per-file size limit'
