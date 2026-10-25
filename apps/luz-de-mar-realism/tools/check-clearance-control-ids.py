"""Do not confuse an exposed white cabinet face with an exposed control."""
from pathlib import Path
import os,json,numpy as np
R=Path(__file__).resolve().parents[1];W=Path(os.environ.get('ELECTRICAL_AUTHORING_WORK',R/'work/electrical-clearance-r03'));e=json.loads((W/'clearance-evidence.json').read_text());ids=np.load(W/'review/ids-b.npz')['ids'];names=json.loads((W/'review/ids-components.json').read_text());rows=[]
for c in e['controlMasks']['controls']:
 x,y=c['center'];values,counts=np.unique(ids[y-10:y+11,x-10:x+11],return_counts=True);hits={names.get(str(i),'context'):int(n)for i,n in zip(values,counts)};index=int(c['id'].split('-')[1])-1
 expected=[f'EVR | battery red centre {index}',f'EVR | battery ivory pointer {index}']if c['kind']=='large'else[f'EVR | battery small switch {part} {index}'for part in ['boss','key','tether']]+[f'EVR | battery small spindle {index}']
 controlPixels=sum(n for name,n in hits.items()if name in expected);rows.append({'id':c['id'],'nativeCenterWindow':[21,21],'actualFirstHitComponents':hits,'actualControlPixels':controlPixels,'totalPixels':441,'pass':controlPixels/441>=.95})
report={'pass':all(r['pass']for r in rows),'method':'Blender single-sample native component IDs: at least 95% of each frozen 21 × 21 center window must hit the intended switch parts, rather than the white enclosure. Physical export equivalence is checked separately.','controls':rows};(W/'audit/native-control-parts.json').write_text(json.dumps(report,indent=2)+'\n');print('ACTUAL CONTROL PART IDS',report['pass']);assert report['pass']
