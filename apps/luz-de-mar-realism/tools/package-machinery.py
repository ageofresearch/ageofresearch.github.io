"""Reproducible authoring deliverable; excludes owner media and VR photographs."""
from pathlib import Path
import hashlib,json,zipfile
R=Path(__file__).resolve().parents[1];W=R/'work/machinery-r11';P=R/'public';A=P/'assets/machinery';b=json.loads((A/'authoring.json').read_text());sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
assert sha(W/'machinery-master.blend')==b['masterSHA256'];assert sha(W/'machinery-source.glb')==b['bakeGeometrySHA256'];assert sha(W/'machinery-vr-source.glb')==b['vrSupplements']['sha256']
raw=W/'raw-atlases'/b['bakeGeometrySHA256'];out=W/'luz-de-mar-machinery-r11.zip'
readme='''Luz de Mar realism / Machinery r11

Open machinery-master.blend with Blender 4.3.2 or newer. Metres.
The hidden EDITABLE | machinery collection contains all original component
records separately. Hide the merged LD_R02 render groups before showing that
collection, to avoid duplicate surfaces. The native engine/filter exterior meshes
are shared by two independent, equally oriented physical placements.

The MTU cutaway, animation samples and spring deltas, and the filter basket motion
are provided in source-snapshot/mechanics/. The runtime loads these native binary
samples on demand. This Blender room contains exterior assemblies; the original
R03 mechanism authoring file is a separate user-provided source and is not edited
or silently replaced here. MODEL-BASIS.md files state its provenance and limits.

Source X forward, Y port, Z up. Blender coordinates:
[Y*7.47/7.6, -(X*35.23/36-17.615), Z-2.01]. Native mechanical geometry is fitted
in physical metres, compensating for the yacht display normalization. Source
installation dimensions remain digital estimates, not a surveyed as-built model.

Two 2048-square half-float EXR irradiance atlases bake indirect diffuse only.
Door, register and inspectable machinery are excluded as permanent occluders.
Seven area emitters and two live work beams provide direct light in WebGL.
Three local static probes include closed exteriors; their reflections retain
that approximation while inspected geometry and live shadows change pose.
Lighting calibration is artistic. No measured lux or onboard material identities
are asserted. EXR source bakes and material images are packed into the native file.

The separate VR | machinery supplements collection contains four transverse
LED fixtures and an ochre removable grid, fitted by eye to the imported room.
The original source equipment and all source vertices are retained. The VR audit
lists 32 observations and remaining geometric differences. It does not identify
the tour hull as Luz de Mar or reveal the seawater filter under the closed floor.
No VR photographs or owner photographs/video are included in this archive.

Rebuild within the repository apps/luz-de-mar-realism checkout; requirements are
listed in package.json and CREDITS.md. Source binary snapshots, tools and geometry
bindings accompany this file. The tools/refine-machinery-vr.py pass follows the
base authoring builder, then tools/bake-machinery.py and tools/prepare-machinery.mjs.

Sources:
https://ageofresearch.github.io/tidewater-rocha/play.html?world=rocha
https://vrcloud.com/?pv=1667308298 (boat icon / LOWER / Engine Room)
'''
with zipfile.ZipFile(out,'w',zipfile.ZIP_DEFLATED,compresslevel=5)as z:
 z.writestr('README.txt',readme)
 for name in ['machinery-master.blend','machinery-source.glb','machinery-vr-source.glb','gpu-verification.json','native-verification.json']:z.write(W/name,name)
 for f in sorted((W/'snapshot').rglob('*')):
  if f.is_file():z.write(f,'source-snapshot/'+str(f.relative_to(W/'snapshot')))
 for name in ['machinery-ambient-architecture.exr','machinery-ambient-furniture.exr','probe-aft.exr','probe.exr','probe-forward.exr']:z.write(raw/name,'raw-hdr/'+name)
 for f in sorted(A.iterdir()):
  if f.is_file():z.write(f,'viewer-assets/'+f.name)
 for name in ['machinery-vr-evidence.json','original-yacht-hashes.json']:z.write(P/'review'/name,'verification/'+name)
 for name in ['CREDITS.md','THREE-LICENSE.txt','MESHOPT-LICENSE.txt','BASISU-LICENSE.txt']:z.write(P/name,name)
 for name in ['MACHINERY.md','package.json','package-lock.json']:z.write(R/name,name)
 for name in ['build-machinery.py','refine-machinery-vr.py','bake-machinery.py','prepare-machinery.mjs','export-yacht.mjs','lightmap-uv.py','document-machinery-vr.py','verify-machinery-native.py']:z.write(R/'tools'/name,'tools/'+name)
record={'version':1,'file':out.name,'bytes':out.stat().st_size,'sha256':sha(out),'masterSHA256':b['masterSHA256'],'sourceSHA256':b['sourceGeometrySHA256'],'sourcePartRecords':b['editableParts'],'url':'https://github.com/ageofresearch/ageofresearch.github.io/releases/download/luz-de-mar-machinery-r11/'+out.name,'includes':['Editable Blender scene','Lossless original room snapshot','Original mechanical samples and spring deltas','Raw HDR atlases and probes','Viewer assets','Tools, source/geometry bindings and credits'],'excludes':['VR photographs','Owner photographs/video','Unchanged original R03 Blender source']}
(P/'authoring/machinery-download.json').write_text(json.dumps(record,indent=2)+'\n');print(out,record['bytes'],record['sha256'])
