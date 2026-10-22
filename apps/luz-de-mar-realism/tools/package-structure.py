"""Package the new editable context for Releases, never the VR photographs."""
import json,hashlib,zipfile
from pathlib import Path
R=Path(__file__).resolve().parents[1];W=R/'work/structure-r10';P=R/'public';source=R.parents[1]/'site/tidewater-rocha/rocha/luz-de-mar';record=json.loads((W/'geometry-verification.json').read_text());out=W/'yacht-structure-r10.zip'
record['viewerContextSHA256']=hashlib.sha256((P/'assets/context/context.glb').read_bytes()).hexdigest()
assert hashlib.sha256((W/'yacht-structure-r10.blend').read_bytes()).hexdigest()==record['nativeSHA256']
readme='''Luz de Mar realism — structural reconciliation r10

Open yacht-structure-r10.blend in Blender 4.3.2 or later. The scene contains
independently editable context components, source hull and inferred joining skins.
The six room scenes and their baked lighting are unchanged from the r9 Releases.
No extra room or upper-deck walking connection is enabled by this update.

Coordinates: source X forward, Y port, Z up; Blender [Y*7.47/7.6,
-(X*35.23/36-17.615), Z-2.01]. Metres. Source dimensions remain provisional.
Source hull winding and interpolated normals are retained after clipping.

The official source model is the published yacht at:
https://ageofresearch.github.io/tidewater-rocha/play.html?world=rocha
VR layout/finish reference: https://vrcloud.com/?pv=1667308298
No tour photographs are redistributed. Refer to CREDITS.md for asset licenses.

The beach platform (-0.72 m vs original proxy) and working bow (-0.90 m)
remain estimated VR-based overrides, rather than surveyed installation levels.
The joining skins are display geometry. They establish neither load-bearing
construction nor additional accuracy about the real vessel.

Existing room HDR atlases and local probes are retained. The new outside skins
use context ambient and the live sun; their indirect-light contribution has not
been rebaked into room probes. Geometry verification and public source hashes
are supplied alongside the native file.
'''
with zipfile.ZipFile(out,'w',zipfile.ZIP_DEFLATED,compresslevel=6)as z:
 z.writestr('README.txt',readme)
 for name in ['yacht-structure-r10.blend','context-source.glb','geometry-verification.json','public-source-check.json']:z.write(W/name,name)
 z.write(P/'assets/yacht-structure.json','structure-inventory.json');z.write(P/'assets/context/context.glb','viewer-context.glb');z.write(P/'CREDITS.md','CREDITS.md')
 for name in ['model.json','model.bin']:z.write(source/name,'source-published/'+name)
 for name in ['audit-yacht-structure.mjs','close-foredeck-structure.py','light-proxies.mjs','exterior-primitives.py']:z.write(R/'tools'/name,'tools/'+name)
 # These tools run within the existing application checkout. Its runtime and
 # texture dependencies remain documented in the repository and r9 archives.
record.update({'file':out.name,'bytes':out.stat().st_size,'sha256':hashlib.sha256(out.read_bytes()).hexdigest(),'url':'https://github.com/ageofresearch/ageofresearch.github.io/releases/download/luz-de-mar-structure-r10/'+out.name,'rebuildBasis':'Existing realism authoring checkout and the r9 exteriors-final.blend; original published source files bundled for audit.'})
(P/'authoring/structure-download.json').write_text(json.dumps({k:v for k,v in record.items()if k!='seamSamples'},indent=2)+'\n');(P/'review/structural-geometry.json').write_text(json.dumps(record,indent=2)+'\n');(P/'assets/context/authoring.json').write_text(json.dumps({k:v for k,v in record.items()if k!='seamSamples'},indent=2)+'\n');print(out,record['bytes'],record['sha256'])
