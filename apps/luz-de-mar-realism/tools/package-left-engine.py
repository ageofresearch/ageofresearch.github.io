"""Package editable authoring and its provenance without private VR pixels."""
from pathlib import Path
import zipfile,json,hashlib
R=Path(__file__).resolve().parents[1];W=R/'work/left-engine-r12'
image_audit=json.loads((W/'image-source-validation.json').read_text());assert image_audit['masterSHA256']==hashlib.sha256((W/'left-engine-master.blend').read_bytes()).hexdigest()and not image_audit['privateVrImages']
items=[(W/'left-engine-master.blend','left-engine-master.blend'),(W/'authoring.json','authoring.json'),(R/'public/assets/mechanics/left-vr-r01/authoring.json','runtime-assets.json'),(W/'grid-fit.json','validation/grid-fit.json'),(W/'clearance.json','validation/clearance.json'),(W/'source-integrity.json','provenance/source-integrity.json'),(W/'review/grid/contours.json','validation/contours.json'),(R/'LEFT_ENGINE_GRID_R12.md','README.md'),(R/'public/assets/mechanics/left-vr-r01/evidence.json','provenance/evidence.json')]
for pattern in ['*left*engine*.py','*left*grid*.py','fit-left-contours.py','left-silhouette.py','check-left-clearance.py','check-left-image-sources.py','compare-left-default.py','left-component-inventory.py','left-engine-grid-controls.json','lightmap-uv.py']:
 for p in (R/'tools').glob(pattern):
  record=(p,'tools/'+p.name)
  if record not in items:items.append(record)
for name in['CREDITS.md','THREE-LICENSE.txt','MESHOPT-LICENSE.txt','BASISU-LICENSE.txt']:items.append((R/'public'/name,'provenance/'+name))
for name in['prepare-left-engine.mjs','partition-machinery.mjs','capture-left-engine.cjs']:items.append((R/'tools'/name,'tools/'+name))
items.append((W/'image-source-validation.json','provenance/image-source-validation.json'))
items.append((R/'public/assets/mechanics/left-vr-r01/component-inventory.json','provenance/components.json'))
for name in['browser.json','performance.json','performance-r11.json']:
 items.append((W/name,'validation/'+name))
items.append((W/'review/default/comparison.json','validation/default-appearance.json'))
out=W/'luz-left-engine-grid-r12-authoring.zip';inventory={}
with zipfile.ZipFile(out,'w',compression=zipfile.ZIP_STORED)as z:
 for source,name in items:
  data=source.read_bytes();z.writestr(name,data);inventory[name]={'bytes':len(data),'sha256':hashlib.sha256(data).hexdigest()}
 z.writestr('provenance/NOTICE.txt','The VR cube photographs are private reference only and are not included.\nThe original R03 ZIP and Blender source are unchanged. Compatible nominal geometry is credited by source hashes in authoring metadata.\nThis candidate fits observed outlines from one camera; hidden depth and dimensions remain inferred.\nExisting room authoring and dependency credits: https://github.com/ageofresearch/ageofresearch.github.io/releases/tag/luz-de-mar-machinery-r11\n')
result={'file':out.name,'bytes':out.stat().st_size,'sha256':hashlib.sha256(out.read_bytes()).hexdigest(),'entries':inventory,'privateVrPhotosIncluded':False}
(W/'authoring-archive.json').write_text(json.dumps(result,indent=2)+'\n');print(json.dumps({k:v for k,v in result.items()if k!='entries'}))
