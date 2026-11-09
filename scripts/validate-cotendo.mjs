import {readFileSync,existsSync} from 'node:fs';
import {resolve,join} from 'node:path';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';

const site=resolve(import.meta.dirname,'../site/sucre');
const read=name=>JSON.parse(readFileSync(join(site,name),'utf8'));
const hash=file=>createHash('sha256').update(readFileSync(file)).digest('hex');
const release=read('release.json'),data=read('data/catalog.json'),audit=read('data/audit.json'),acceptance=read('acceptance.json');
assert.equal(data.source.sha256,'b73e00aa1a198e63f98f8145bcabfc925f1b51c632aaf2a9060339e1b990573e','Unexpected source DWG fingerprint');
for(const source of [release.source,audit.source])assert.deepEqual(source,data.source,'Stale source metadata');
assert.equal(data.source.units,'m');assert.equal(data.source.revision,'V19-P3');assert.equal(data.source.engineCommit,'9d7394a1015545ad835cfc63407a762e6acfddde');
assert.equal(hash(join(site,'data/catalog.json')),audit.catalogSha256,'Stale catalog fingerprint');
for(const[name,expected]of Object.entries(release.files)){assert.ok(existsSync(join(site,name)),'Missing release file '+name);assert.equal(hash(join(site,name)),expected,'Changed or stale release file '+name);}
assert.equal(acceptance.status,'passed','WebGPU browser acceptance is required');assert.equal(acceptance.testedManifestSha256,hash(join(site,'release.json')),'Browser acceptance belongs to a different build');assert.equal(acceptance.source.sha256,data.source.sha256);
assert.equal(acceptance.authoringCommit,release.authoringCommit);assert.ok(acceptance.runtime.frames>12);assert.deepEqual(acceptance.runtime.errors,[]);
for(const prefix of ['WebGPU adapter','Selected 2D parcel','Visible nonblank','Lake water','Fly controls','Narrow layout','Accessible measured plan'])assert.ok(acceptance.checks.some(c=>c.startsWith(prefix)),'Missing browser acceptance scenario '+prefix);
assert.equal(acceptance.mobileOverview.feature,'PROPERTY');assert.ok(acceptance.mobileOverview.bounds.every(n=>Math.abs(n)<.9),'Mobile overview clips the property');
const features=new Map(data.features.map(f=>[f.id,f]));assert.equal(features.size,data.features.length,'Duplicate feature IDs');
assert.equal(audit.coverage.length,4775);assert.equal(new Set(audit.coverage.map(e=>e.handle)).size,4775);assert.deepEqual(audit.decode.missingEntities,[]);assert.deepEqual(audit.decode.customEntityClasses,[]);assert.equal(audit.decode.stats.unknownEntityCount,0);assert.equal(audit.decode.warningResolution.status,'resolved for drawable geometry');
const geometry=new Map(audit.coverage.filter(e=>['geometry','reference'].includes(e.classification)).map(e=>[e.handle,e]));let vertices=0,edges=0;
for(const record of audit.coverage){if(record.featureId)assert.ok(features.has(record.featureId),'Missing record '+record.featureId);}
for(const f of data.features){assert.ok(f.description&&f.name&&f.category);assert.equal(f.rings.length,f.components.length);for(const[ridx,r]of f.rings.entries()){assert.equal(geometry.get(r.handle)?.featureId,f.id);assert.ok(r.vertices.every(p=>p.length===2&&p.every(Number.isFinite)));vertices+=r.vertices.length;const points=r.vertices.length>1&&r.vertices[0].every((n,i)=>n===r.vertices.at(-1)[i])?r.vertices.slice(0,-1):r.vertices;const m=f.components[ridx];assert.equal(m.handle,r.handle);assert.equal(m.edgeLengthsM.length,r.closed?points.length:points.length-1);edges+=m.edgeLengthsM.length;for(let i=0;i<m.edgeLengthsM.length;i++)assert.ok(Math.abs(m.edgeLengthsM[i]-Math.hypot(points[i][0]-points[(i+1)%points.length][0],points[i][1]-points[(i+1)%points.length][1]))<1e-10,'Stale edge measurement '+r.handle);}}
const active=data.features.filter(f=>!f.reference);assert.equal(active.filter(f=>f.category==='Residential parcels').length,434);assert.equal(active.filter(f=>f.category==='Commercial parcels').length,89);assert.ok(features.has('AN04')&&features.has('AN05'));assert.equal(active.filter(f=>['COT_COL_COM_PARKING','COT_COL_ANCLA_PARKING'].includes(f.layer)).length,70);assert.equal(active.filter(f=>f.id==='PROPERTY').length,1);assert.equal(active.filter(f=>f.id==='LAKE').length,1);assert.equal(Number(features.get('LAKE').measurements.areaM2.toFixed(2)),2000);assert.equal(Number(features.get('PROPERTY').measurements.areaM2.toFixed(2)),100029.05);
for(const row of data.areaSchedule)assert.equal(Number(row.measuredM2.toFixed(2)),row.publishedM2);
for(const k of ['invalid','outsideProperty','parcelOverlaps'])assert.deepEqual(audit.topology[k],[]);assert.equal(audit.topology.partitionGapM2,0);assert.equal(audit.topology.partitionOutsideM2,0);assert.ok(Math.abs(audit.topology.partitionOverlapM2)<.00001);assert.ok(audit.precision.coordinateRoundTripMaxM<=.000001);assert.ok(audit.precision.float32LocalMaxM<=.0001);
const csv=readFileSync(join(site,'data/measurements.csv'),'utf8');assert.equal(csv.trimEnd().split(/\r?\n/).length,edges+1,'Missing CSV measurement rows');const svg=readFileSync(join(site,'data/plan.svg'),'utf8');assert.ok(svg.includes('<svg')&&svg.includes('<title'));assert.equal([...svg.matchAll(/data-feature-id=/g)].length,active.length,'Missing SVG feature records');
const html=readFileSync(join(site,'index.html'),'utf8');assert.ok(html.includes('welcome to sucre')&&html.includes('COTENDO')&&html.includes('noscript'));
console.log(`COTENDO validation passed: ${features.size} features, 4,775 source entities, ${vertices} original vertices, ${edges} edge measurements, verified WebGPU build.`);
