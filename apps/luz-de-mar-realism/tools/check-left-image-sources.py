"""Read-only provenance check before packaging the editable Blender scene."""
from pathlib import Path
import bpy,json,hashlib
R=Path(__file__).resolve().parents[1];W=R/'work/left-engine-r13';sources=[];private=[]
for im in bpy.data.images:
 if im.source!='FILE'or not im.filepath:continue
 file=Path(bpy.path.abspath(im.filepath));sources.append({'name':im.name,'file':file.name,'packed':bool(im.packed_file)})
 if any(s in str(file).lower()for s in['reference/machinery','/cubes/','pano_f','pano_l','pano_b','pano_r','pano_u','pano_d']):private.append(file.name)
report={'masterSHA256':hashlib.sha256((W/'left-engine-master.blend').read_bytes()).hexdigest(),'fileImagesInspected':len(sources),'privateVrImages':private,'sources':sources}
(W/'image-source-validation.json').write_text(json.dumps(report,indent=2)+'\n');assert not private;assert all(s['packed']for s in sources);print('AUTHORING IMAGE PROVENANCE',len(sources),'packed source images; private VR images',len(private))
