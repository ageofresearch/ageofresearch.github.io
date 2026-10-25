"""Package only owned authoring files. Never include maintenance/VR pixels."""
from pathlib import Path
import os,json,hashlib,zipfile
R=Path(__file__).resolve().parents[1];W=Path(os.environ.get('FILTER_WELL_WORK','/tmp/ldm-filter-well-r01'));sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
files=[(W/n,n)for n in['filter-well-master.blend','well-source.glb','well-irradiance.exr','photo-camera.json','inventory.json','authoring.json','lightmap.json','bake-settings.json','uv-packed.npz','uv-packed.npz.json','geometry-proof.json','browser-proof.json','README.md','comparison.json']]
files +=[(p,'textures/'+p.name)for p in(W/'textures').iterdir()if p.suffix=='.png']
files +=[(p,'runtime/'+p.name)for p in(R/'public/assets/machinery/filter-well-r01').iterdir()]
files +=[(p,'tools/'+p.name)for p in(R/'tools').iterdir()if('filter-well'in p.name or p.name=='pack-electrical-uv.py')and p.suffix in['.py','.mjs','.cjs']]
assert all(p.is_file()for p,n in files)
manifest={n:{'bytes':p.stat().st_size,'sha256':sha(p)}for p,n in files}
output=R/'tools/filter-well-authoring-inputs.zip'
with zipfile.ZipFile(output,'w',zipfile.ZIP_DEFLATED,compresslevel=6)as z:
 for p,n in files:z.write(p,n)
 z.writestr('contents.json',json.dumps(manifest,indent=2)+'\n')
with zipfile.ZipFile(output)as z:assert z.testzip()is None
(R/'tools/filter-well-authoring-SHA256SUMS').write_text(sha(output)+'  '+output.name+'\n')
(W/'release.json').write_text(json.dumps({'url':'https://github.com/ageofresearch/ageofresearch.github.io/releases/tag/luz-filter-well-r01','archiveSHA256':sha(output),'bytes':output.stat().st_size,'masterSHA256':sha(W/'filter-well-master.blend'),'privateReferenceIncluded':False},indent=2)+'\n')
print('AUTHORING PACKAGED',output.stat().st_size,sha(output))
