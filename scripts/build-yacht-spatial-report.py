"""Build the public, geometry-only audit. Never publish private source media."""
import argparse,collections,csv,json,pathlib,shutil
p=argparse.ArgumentParser();p.add_argument('before',type=pathlib.Path);p.add_argument('after',type=pathlib.Path)
p.add_argument('--output',type=pathlib.Path,default=pathlib.Path('site/tidewater-rocha/spatial-audit'));a=p.parse_args()
a.output.mkdir(parents=True,exist_ok=True)
before=json.loads((a.before/'inventory.json').read_text());after=json.loads((a.after/'inventory.json').read_text())
checks=json.loads((a.after/'checks.json').read_text());old={p['id']:p for p in before['inventory']}
changes={id:r for r in checks['corrections'] for id in r['parts']}
pending={v[k] for v in checks['collisions'] if v['status']=='pending-reference' for k in ['part','boundary']}
opened={v[k] for v in checks['openSurfaceCandidates'] for k in ['part','boundary']}
supports={r['id']:r for r in checks['supportChecks']}
rows=[]
for part in after['inventory']:
    row={k:part[k] for k in ['key','id','anchor','feature','deck','category','bounds','triangles','reference','evidence','dimensionStatus']}
    row['before']=old.get(part['id'],part)['bounds'];row['change']=changes.get(part['id'],{}).get('id')
    row['changes']=[r['id'] for r in checks['corrections'] if part['id'] in r['parts']]
    row['status']='corregido' if row['change'] else 'pendiente' if part['id'] in pending else 'revisar superficie' if part['id'] in opened else 'inventariado'
    row['support']=supports.get(part['id']);rows.append(row)
for record in checks['corrections']:
    if record.get('action')!='remove-duplicate':continue
    for id in record['parts']:
        source=old[id]
        rows.append({k:source[k] for k in ['key','id','anchor','feature','deck','category','bounds','triangles','reference','evidence','dimensionStatus']}|
            {'before':source['bounds'],'change':record['id'],'status':'duplicado eliminado','support':None})
data={'version':'spatial-correction-1','beforeRelease':before.get('release','bridge-access-1'),
      'afterRelease':after.get('release'),'beforeTriangles':before['triangles'],'afterTriangles':after['triangles'],
      'beforeParts':before['parts'],'afterParts':after['parts'],'rows':rows,'checks':checks,
      'sources':after['sources'],'hashes':{'before':before['sourceHash'],'after':after['sourceHash']},
      'generatorFiles':after.get('generatorFiles',{})}
(a.output/'data.json').write_text(json.dumps(data,ensure_ascii=False,separators=(',',':')))
with (a.output/'inventario.csv').open('w',newline='') as f:
    fields=['id','feature','deck','category','status','before','bounds','change','reference','evidence']
    writer=csv.DictWriter(f,fields,extrasaction='ignore',lineterminator='\n');writer.writeheader();writer.writerows(rows)
(a.output/'comprobaciones.json').write_text(json.dumps(checks,ensure_ascii=False,indent=2))
for phase,source in [('before',a.before),('after',a.after)]:
    dest=a.output/'images'/phase;dest.mkdir(parents=True,exist_ok=True)
    for image in (source/'images').glob('spatial-*.png'):shutil.copy2(image,dest/image.name)
print(json.dumps({'rows':len(rows),'states':dict(collections.Counter(r['status'] for r in rows)),'output':str(a.output)},ensure_ascii=False))
