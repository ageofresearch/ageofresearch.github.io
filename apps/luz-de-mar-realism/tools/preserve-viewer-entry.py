"""Retain the previous entry's full JS dependency graph without accumulating
unreferenced historical builds. Restrict every mutation to the realism subtree.
"""
from pathlib import Path
import json,shutil
R=Path(__file__).resolve().parents[1];W=R/'work/right-engine-r01';target=R/'../../site/luz-de-mar-realism';baseline=W/'baseline-site'
files={p.name:p for p in (baseline/'assets').glob('*.js')};files.update({p.name:p for p in (target/'assets').glob('*.js')})
keep=set()
for folder in [target,baseline]:
 for p in folder.rglob('*.html'):
  text=p.read_text(errors='replace');keep.update(name for name in files if name in text)
while True:
 next_keep=keep|{name for current in keep for name in files if name in files[current].read_text(errors='replace')}
 if next_keep==keep:break
 keep=next_keep
assert len(keep)>=3
for name in keep:
 if not(target/'assets'/name).exists():shutil.copyfile(files[name],target/'assets'/name)
previous=W/'bundle-retention.json'
removed=json.loads(previous.read_text()).get('removedUnreferencedHistoricalBundles',{})if previous.exists()else{}
for p in (target/'assets').glob('*.js'):
 if p.name not in keep:removed[p.name]=p.stat().st_size;p.unlink()
report={'retainedEntryGraphs':['current HTML entries','previous published floor-fix HTML entries'],'kept':sorted(keep),'removedUnreferencedHistoricalBundles':removed,'bytesRemoved':sum(removed.values()),'scope':'site/luz-de-mar-realism/assets/*.js only; no authoring downloads or original-yacht files removed'}
(W/'bundle-retention.json').write_text(json.dumps(report,indent=2)+'\n');print('BUNDLE RETENTION',len(keep),'kept;',sum(removed.values()),'unreferenced bytes removed')
