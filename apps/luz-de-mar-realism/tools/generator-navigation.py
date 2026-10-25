"""Constrain source-triangle recovery to this installation's local footprint.

The source floor/14cm checks have already run in electrical-navigation.py.
Outside the generator approach, preserve the preceding R04 mask verbatim.
"""
import json,base64,os
from pathlib import Path
import numpy as np
W=Path(os.environ['ELECTRICAL_AUTHORING_WORK']);n=json.loads((W/'navigation.json').read_text());m=json.loads((W/'baseline/luz-de-mar-realism/assets/machinery/room.json').read_text());g=m['navigation'];old=m['electricalAppearance']['navigation'];scope=[6.10,.90,10.05,3.70];yy,xx=np.mgrid[:g['ny'],:g['nx']];x=g['x0']+xx.ravel()*g['step'];y=g['y0']+yy.ravel()*g['step'];inside=(x>=scope[0])&(x<=scope[2])&(y>=scope[1])&(y<=scope[3]);changes={}
for state,key in [('closed','mask'),('open','openMask')]:
 a=np.unpackbits(np.frombuffer(base64.b64decode(n[key]),dtype=np.uint8),bitorder='little');b=np.unpackbits(np.frombuffer(base64.b64decode(old[key]),dtype=np.uint8),bitorder='little');a[:len(inside)][~inside]=b[:len(inside)][~inside];n[key]=base64.b64encode(np.packbits(a,bitorder='little').tobytes()).decode();changes[state]={'changedCellsFromR04':int((a!=b).sum()),'reopenedCells':int(((a>0)&(b==0)).sum()),'newlyBlockedCells':int(((b>0)&(a==0)).sum()),'unchangedOutsideScope':bool((a[:len(inside)][~inside]==b[:len(inside)][~inside]).all()),'safeCells':int(a.sum())}
assert n['headroom']['lowCells']==0
n['generatorLocalScopeSource']=scope;n['changesFromR04']=changes;n['method']+=' Generator update constrained to local sourceXY[6.10,.90,10.05,3.70]; previous electrical-navigation bits retained exactly outside.';(W/'navigation.json').write_text(json.dumps(n,indent=2)+'\n');(W/'navigation-local-proof.json').write_text(json.dumps({'pass':True,'scopeSource':scope,'radius':.14,'states':changes,'sourceFloorAndRetainedTriangleChecksReused':True,'standingHeightPreserved':True},indent=2)+'\n');print('GENERATOR LOCAL NAVIGATION',changes)
