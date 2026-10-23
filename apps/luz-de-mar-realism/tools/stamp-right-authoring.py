"""Correct scene-level provenance without changing geometry, maps or lighting."""
import bpy,json,hashlib
from pathlib import Path
R=Path(__file__).resolve().parents[1];W=R/'work/right-engine-r01'
S=bpy.context.scene;S['authoringRevision']='right-vr-r01';S['accuracy']='Right VR-observed exterior with inferred depths; original left R13 retained and R03 internals separate/nominal'
bpy.ops.wm.save_as_mainfile(filepath=str(W/'right-engine-master.blend'),compress=True)
p=W/'authoring.json';binding=json.loads(p.read_text());binding['masterSHA256']=hashlib.sha256((W/'right-engine-master.blend').read_bytes()).hexdigest();p.write_text(json.dumps(binding,indent=2)+'\n');print('RIGHT MASTER PROVENANCE',binding['masterSHA256'])
