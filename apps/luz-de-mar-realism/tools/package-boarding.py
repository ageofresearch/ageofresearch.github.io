from pathlib import Path
import json,hashlib,zipfile
R=Path(__file__).resolve().parents[1];W=R/'work/boarding-vr-r01';D=W/'release';D.mkdir(exist_ok=True);sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();files={}
def add(p,n=None):files[n or p.relative_to(R).as_posix()]=p
for name in ['README.md','geometry.json','lighting.json','packing.json','preservation.json','baseline-hdr-compression.json','evidence-frozen.json','cells.json','reference-summary.json','browser-validation.json','loading-validation.json','render-sequence.json','authoring-images.json']:
 add(W/name,'evidence/'+name if name!='README.md'else name)
add(W/'comparison/assessment.json','evidence/assessment.json')
add(W/'machinery-regression/report.json','evidence/machinery-regression.json')
add(W/'refinement-review.json','evidence/refinement-review.json')
add(R/'work/cockpit-source.glb');add(R/'work/beach-club-source.glb')
add(W/'boarding-lit.blend');add(W/'boarding-master.blend');add(R/'work/exteriors-final.blend')
for p in(W/'raw').glob('*.exr'):add(p)
for p in(W/'baseline').rglob('*'):
 if p.is_file()and p.suffix in['.glb','.exr','.json']:add(p)
for p in(R/'tools').glob('*boarding*'):
 if p.is_file()and p.suffix in['.py','.mjs','.cjs']:add(p)
for name in ['exterior-primitives.py','lightmap-uv.py','light-proxies.mjs']:add(R/'tools'/name)
for p in(R/'test').glob('boarding*'):add(p)
add(R/'work/textures/materials.json');textures=json.load(open(R/'work/textures/materials.json'))
for kind in['color','normal','roughness']:add(R/'work/textures'/textures['paint'][kind])
for zone in['cockpit','beach-club']:
 for p in(R/'public/assets'/zone).iterdir():
  if p.is_file()and p.suffix in['.glb','.json','.exr']:add(p)
add(W/'unit-tests.log','evidence/unit-tests.log');add(W/'browser-final.log','evidence/browser-final.log')
add(R/'public/assets/navigation.json');add(R/'public/CREDITS.md')
# Explicit whitelist: no VR photos or VR/photo composites enter Releases.
assert all(p.suffix not in['.jpg','.jpeg']for p in files.values())
manifest={n:{'sha256':sha(p),'bytes':p.stat().st_size}for n,p in files.items()};out=D/'luz-boarding-vr-r01-authoring.zip'
with zipfile.ZipFile(out,'w',zipfile.ZIP_DEFLATED,compresslevel=5)as z:
 for name,p in sorted(files.items()):z.write(p,name)
 z.writestr('contents.json',json.dumps(manifest,indent=2)+'\n')
with zipfile.ZipFile(out)as z:assert z.testzip()is None
(D/'SHA256SUMS').write_text(sha(out)+'  '+out.name+'\n')
proof={'archive':out.name,'sha256':sha(out),'bytes':out.stat().st_size,'files':len(files),'referencePhotosIncluded':False,'candidateVisualAcceptance':False};(D/'release-proof.json').write_text(json.dumps(proof,indent=2)+'\n')
(D/'NOTES.md').write_text('Candidata de embarque de popa: pasarela fija caminable, perfiles de referencia explícitos y pruebas de recorrido. La correspondencia visual con la VR sigue pendiente; no es una reproducción aceptada. Incluye Blender editable, bakes originales, fuentes propias y diagnósticos. No incluye fotografías VR.\n\nPrevisualización: https://ageofresearch.github.io/luz-de-mar-realism/?room=beach-club&release=boarding-vr-r01\n')
print(json.dumps(proof))
