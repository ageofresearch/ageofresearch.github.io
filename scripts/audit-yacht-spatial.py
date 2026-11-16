"""Offline spatial audit of actual submitted ranges (see audit-yacht-export.mjs).

No photograph is treated as a metric survey. Numerical checks and evidence
confidence are deliberately separate. Run with the requirements beside this file.
"""
import argparse, collections, csv, gzip, hashlib, json, math, pathlib, re
import numpy as np
import trimesh
from shapely import set_precision
from shapely.geometry import Polygon, MultiPoint, Point
from shapely.ops import unary_union

parser=argparse.ArgumentParser()
parser.add_argument('directory',type=pathlib.Path)
parser.add_argument('--output',type=pathlib.Path)
parser.add_argument('--check',action='store_true',help='Fail on defects or new unresolved pairs; use the explicit source-baseline allowance')
args=parser.parse_args()
output=args.output or args.directory
output.mkdir(parents=True,exist_ok=True)
parts=json.load(gzip.open(args.directory/'geometry.json.gz'))
baseline=json.loads((args.directory/'inventory.json').read_text())
levels=baseline['levels']
cache={}
def mesh(p):
    if p['key'] not in cache:
        cache[p['key']]=trimesh.Trimesh(p['vertices'],p['faces'],process=True)
    return cache[p['key']]
def shape(p):
    return set_precision(MultiPoint(np.array(p['vertices'])[:,:2]).convex_hull,1e-6)
def project_floor(deck,z):
    polygons=[]
    for p in parts:
        if not (p['anchor']==deck+'_DCK_001' and p['bounds'][5]<z+.002 or
                deck=='MD' and 'aft-teak-floor-following' in p['id']):continue
        t=np.array(p['vertices'])[np.array(p['faces'])]
        for tri in t[np.max(abs(t[:,:,2]-z),axis=1)<.001]:
            q=set_precision(Polygon(tri[:,:2]),1e-6)
            if q.area>1e-10:polygons.append(q)
    return unary_union(polygons)
floors={d:project_floor(d,z) for d,z in levels.items()}
finite=[]
for p in parts:
    v=np.array(p['vertices']);f=np.array(p['faces'])
    if not np.isfinite(v).all() or f.min()<0 or f.max()>=len(v):finite.append(p['id'])

# Contact samples are real low vertices, not the empty convex hull between legs.
# Area coverage is additionally measured for continuous plinths.
supports=[]
rugs=[p for p in parts if re.search(r'\brug\b|carpet',p['feature'],re.I)]
for p in parts:
    d=p['deck'];b=p['bounds']
    if d not in levels or p['category'] not in ['Furniture','Soft_furnishing','Equipment']:continue
    z=levels[d]
    if not z-.001<=b[2]<=z+.0501 or b[5]<z+.1:continue
    v=np.array(p['vertices']);low=np.unique(np.round(v[v[:,2]<v[:,2].min()+.0001],6),axis=0)
    if len(low)<3:continue
    foot=set_precision(MultiPoint(low[:,:2]).convex_hull,1e-6)
    if foot.area<1e-8:continue
    support=floors[d]
    own=[q for q in parts if q['id']!=p['id'] and q['anchor']==p['anchor'] and
         q['bounds'][5]<=b[2]+.001 and q['bounds'][5]>=b[2]-.051]
    contacts=[]
    for point in low:
        xy=Point(point[:2]);heights=[]
        if support.buffer(.0005).covers(xy):heights.append(z)
        for q in own:
            if shape(q).buffer(.0005).covers(xy):heights.append(q['bounds'][5])
        for q in rugs:
            if q['deck']==d and shape(q).covers(xy) and q['bounds'][5]<=point[2]+.012:heights.append(q['bounds'][5])
        contacts.append(float(point[2]-max(heights)) if heights else None)
    gap=max((x for x in contacts if x is not None),default=None)
    outside=foot.difference(support).area/foot.area
    # Rounded upholstery has open hems; base/feet/plinths are the load contacts.
    bearing=bool(re.search(r'plinth|pedestal|\bfoot\b|\bleg\b|folding wood frame|daybed tailored|pouf tailored|helm console',p['feature'],re.I))
    supports.append({'id':p['id'],'samples':len(low),'missing':sum(x is None for x in contacts),
        'maxGap':gap,'projectedOutsideFraction':outside,'bearing':bearing,
        'status':'issue' if bearing and (any(x is None for x in contacts) or gap is not None and gap>.001) else 'screened',
        'method':'Low contact vertices against deck/supports; soft carpet compression up to 12 mm is recorded as an intended contact'})

# Positive solid volume proves an intersection; overlapping boxes alone do not.
fixtures=[p for p in parts if p['category'] in ['Furniture','Soft_furnishing','Sanitary','Equipment'] and
    not re.search(r'seam|piping|binding|rug|cloth|stitch|button|tap|rim|drain|spout|lamp|light|hinge|switch',p['feature'],re.I)]
walls=[p for p in parts if p['category'] in ['Partitions','Glazing','Stairs','Superstructure'] and
    not re.search(r'skirt|switch|frame|seam|light|handrail|marking',p['feature'],re.I)]
collisions=[];open_candidates=[];tested=0
for p in fixtures:
    for q in walls:
        if p['deck']!=q['deck']:continue
        a=np.array(p['bounds']);b=np.array(q['bounds'])
        overlap=np.minimum(a[3:],b[3:])-np.maximum(a[:3],b[:3])
        if min(overlap)<.0011:continue
        m,n=mesh(p),mesh(q)
        if not m.is_volume or not n.is_volume:
            open_candidates.append({'part':p['id'],'boundary':q['id'],'status':'open-surface-review'});continue
        tested+=1
        volume=float(trimesh.boolean.intersection([m,n],engine='manifold').volume)
        if volume<=1e-7:continue
        assembly_joint='stone shower floor' in p['feature'] and ('GLA' in q['anchor'] or volume<.00001)
        status='assembly-contact' if assembly_joint else 'pending-reference' if p['deck']=='LD' else 'issue'
        collisions.append({'part':p['id'],'boundary':q['id'],'volume':volume,'status':status,
            'note':'Screen or threshold seated in its shower tray' if assembly_joint else
            'Original lower-cabin/service layout needs reference reconciliation' if p['deck']=='LD' else 'Unintended solid intersection'})

# Retain opposite-facing contact faces separately from same-facing duplicates.
seen={};duplicates=collections.Counter()
for p in parts:
    t=np.round(np.array(p['vertices'])[np.array(p['faces'])],6)
    for tri in t:
        order=np.lexsort((tri[:,2],tri[:,1],tri[:,0]));key=hashlib.blake2b(tri[order].tobytes(),digest_size=16).digest()
        normal=np.cross(tri[1]-tri[0],tri[2]-tri[0])
        if np.linalg.norm(normal)<1e-10:continue
        if key in seen:
            previous,n=seen[key]
            if previous!=p['id']:duplicates[(previous,p['id'],'same-facing' if normal@n>0 else 'contact')]+=1
        else:seen[key]=(p['id'],normal)
duplicate_rows=[{'parts':[a,b],'kind':kind,'triangles':n} for (a,b,kind),n in duplicates.items()]
report={'version':baseline['version'],'parts':len(parts),'triangles':baseline['triangles'],
    'recessSolids':[{'id':p['id'],'closedVolume':bool(mesh(p).is_volume),'volume':float(mesh(p).volume)}
                    for p in parts if p['id'] in ['MD_FUR_035/004','MD_FUR_035/005']],
    'floorContours':{deck:[{'outer':list(p.exterior.coords),'holes':[list(r.coords) for r in p.interiors]}
                          for p in ([floor] if floor.geom_type=='Polygon' else floor.geoms) if p.geom_type=='Polygon']
                     for deck,floor in floors.items()},
    'finiteFailures':finite,'supportChecks':supports,'solidPairsTested':tested,'collisions':collisions,
    'openSurfaceCandidates':open_candidates,'coincidentFaces':duplicate_rows,
    'corrections':baseline['correctionRecords'],'stairs':baseline.get('stairs'),
    'limits':['Coordinates are model coordinates, not surveyed metres.',
              'All submitted mesh ranges are inventoried; contact sampling is not a proof of every continuous surface.',
              'Lower-cabin layout contradictions and open-surface candidates remain explicit; they are not certified correct.',
              'Source photographs and construction scans cited by older code are not all available for direct comparison.']}
(output/'checks.json').write_text(json.dumps(report,ensure_ascii=False,indent=2))
print(json.dumps({'parts':len(parts),'triangles':baseline['triangles'],'finiteFailures':len(finite),
    'supports':len(supports),'supportIssues':[p['id'] for p in supports if p['status']=='issue'],
    'solidPairsTested':tested,'collisions':dict(collections.Counter(p['status'] for p in collisions)),
    'openSurfaceCandidates':len(open_candidates),'coincidentPairs':len(duplicates)},ensure_ascii=False))
if args.check:
    allowance=json.loads((pathlib.Path(__file__).resolve().parent.parent/'tests/fixtures/yacht-spatial-pending.json').read_text())
    key=lambda p:(p['part'],p['boundary'])
    pending={key(p):p['volume'] for p in allowance['pendingCollisions']}
    open_allowed={key(p) for p in allowance['openSurfaces']}
    failures=[]
    if len(report['recessSolids'])!=2:failures.append('Missing audited galley recess solids')
    failures.extend('Open galley recess: '+p['id'] for p in report['recessSolids'] if not p['closedVolume'])
    failures.extend('Invalid geometry: '+id for id in finite)
    failures.extend('Unsupported: '+p['id'] for p in supports if p['status']=='issue')
    failures.extend('Duplicate faces: '+str(p['parts']) for p in duplicate_rows if p['kind']=='same-facing')
    for collision in collisions:
        if collision['status']=='assembly-contact':continue
        if collision['status']=='issue' or key(collision) not in pending or collision['volume']>pending[key(collision)]+1e-7:
            failures.append('Unapproved solid intersection: '+str(collision))
    failures.extend('New open-surface candidate: '+str(p) for p in open_candidates if key(p) not in open_allowed)
    if failures:raise SystemExit('\n'.join(failures))
    print('Spatial regression gate passed; existing source-layout exceptions remain explicit.')
