import bpy,json,hashlib,numpy as np
from pathlib import Path
from mathutils import Vector
R=Path(__file__).resolve().parents[1];SX=35.23/36;SY=7.47/7.6
rects=[];inventory=[]
for o in bpy.data.collections['EDITABLE | VR bulkhead'].objects:
 if o.type!='MESH':continue
 vs=[o.matrix_world@Vector(p) for p in o.bound_box];xs=[(-p.y+17.615)/SX for p in vs];ys=[p.x/SY for p in vs];zs=[p.z+2.01 for p in vs]
 inventory.append({'id':o.get('componentID',o.name),'assembly':o.get('assembly','unknown'),'classification':o.get('classification','observed form with inferred hidden depth'),'boundsSource':[min(xs),min(ys),min(zs),max(xs),max(ys),max(zs)],'referenceRect':json.loads(o['referenceRect']) if 'referenceRect' in o else None,'referencePath':json.loads(o['referencePath']) if 'referencePath' in o else None})
 if min(zs)<3.18 and max(zs)>1.58:rects.append([min(xs),min(ys),max(xs),max(ys)])
(R/'work/bulkhead-vr-r01/collision-rects.json').write_text(json.dumps(rects)+'\n');print('COLLISION RECTS',len(rects))

(R/'work/bulkhead-vr-r01/component-inventory.json').write_text(json.dumps(inventory,ensure_ascii=False,indent=2)+'\n')
