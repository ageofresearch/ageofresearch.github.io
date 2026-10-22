"""Release authoring archives, preserving earlier Pages downloads byte-for-byte."""
from pathlib import Path
from zipfile import ZipFile,ZIP_DEFLATED
import hashlib,json,sys
R=Path(__file__).resolve().parents[1];W=R/'work';O=W/'releases';O.mkdir(exist_ok=True);ids=sys.argv[1:]or['saloon','cockpit','beach-club','port-side','starboard-side','bow'];records=[]
for id in ids:
 binding=json.loads((R/'public/assets'/id/'authoring.json').read_text());assert binding.get('masterSHA256');native=W/(id+'-master.blend');assert hashlib.sha256(native.read_bytes()).hexdigest()==binding['masterSHA256'];out=O/(id+'-authoring-r9.zip');raw=W/'raw-atlases'/binding['bakeGeometrySHA256']
 with ZipFile(out,'w',ZIP_DEFLATED,compresslevel=6)as z:
  z.write(native,'Blender/'+id+'.blend');z.write(W/(id+'-source.glb'),'source/'+id+'-source.glb')
  for p in [R/'EXTERIORS.md',R/'public/CREDITS.md',R/'public/assets/exterior-inventory.json',R/'public/assets/navigation.json',R/'public/assets'/id/'authoring.json',R/'public/assets'/id/'reference-components.json',W/'textures/materials.json']:
   z.write(p,('evidence/'if p.name.endswith('.json')else'')+p.name)
  for p in(R/'tools').glob('*'):
   if p.is_file()and p.suffix in['.py','.mjs','.cjs']:z.write(p,'tools/'+p.name)
  for atlas in binding['atlases']:
   file=raw/(id+'-ambient-'+atlas+'.exr');assert hashlib.sha256(file.read_bytes()).hexdigest()==binding['rawBakesSHA256'][atlas];z.write(file,'raw-bakes/'+file.name);z.write(W/'lightmap-uv'/(atlas+'.npz'),'UV/'+atlas+'.npz')
  z.writestr('REPRODUCING.txt','Editable Blender scene includes the selected editable collection plus merged surrounding occluders. Hidden editable originals are not rendered. Raw linear HDR bakes are included; runtime applies OIDN filtering and local probes. Geometry, coordinates and finishes remain estimates. No tour photographs are redistributed. See EXTERIORS.md and CREDITS.md.\n')
 records.append({'id':id,'file':out.name,'bytes':out.stat().st_size,'sha256':hashlib.sha256(out.read_bytes()).hexdigest(),'nativeSHA256':binding['masterSHA256'],'revision':9});print('PACKAGED',id,out.stat().st_size,flush=True)
old=json.loads((O/'checksums.json').read_text()).get('files',[])if(O/'checksums.json').exists()else[];merged={r['id']:r for r in old};merged.update({r['id']:r for r in records});(O/'checksums.json').write_text(json.dumps({'algorithm':'SHA-256','files':list(merged.values())},indent=2)+'\n')
