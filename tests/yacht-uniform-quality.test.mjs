import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {buildUniformQuality} from '../scripts/build-yacht-uniform-quality.mjs';
import {createUniformSelection,uniformPartKey} from '../scripts/yacht-geometry/uniform-selection.mjs';
import {decodeUniformQuality,loadUniformQuality} from '../site/tidewater-rocha/mobile/uniform-quality.js';
import {decodeRenderProfiles} from '../site/tidewater-rocha/mobile/render-profiles.js';
const root=new URL('../site/tidewater-rocha/mobile/',import.meta.url);
const manifest=JSON.parse(await readFile(new URL('uniform-quality.json',root))),binary=await readFile(new URL('uniform-quality.bin',root));
const guestText=await readFile(new URL('guest-access.json',root)),guest=JSON.parse(guestText);
guest.manifestSHA256=createHash('sha256').update(guestText).digest('hex');
const array=b=>b.buffer.slice(b.byteOffset,b.byteOffset+b.byteLength);

test('uniform generation is reproducible and preserves each existing best mobile variant',async()=>{
 const generated=await buildUniformQuality();assert.deepEqual(generated.manifest,manifest);assert.deepEqual(generated.binary,binary);
 const profile=decodeUniformQuality(manifest,array(binary),guest).profiles.uniform;
 assert.ok(profile.triangles>25000&&profile.triangles<=40000);assert.equal(profile.batches.length,2);
 assert.ok(profile.geometryBytes<3*1024*1024);
 const audit=profile.audit;assert.equal(new Set(audit.map(r=>r.key)).size,audit.length);
 assert.equal(audit.length,guest.profiles.exterior.audit.length);
 for(const [i,row]of audit.entries()){
  const old=guest.profiles[row.sourceProfile].audit[i];
  assert.equal(row.id,old.id);assert.equal(row.triangles,old.triangles);assert.equal(row.error,old.error);
  if(!row.triangles)assert.ok(Object.values(guest.profiles).every(p=>p.audit[i].triangles===0));
 }
 const floors=audit.filter(r=>r.id==='MD_DCK_001/stairs/stair-opening');assert.equal(floors.length,2);assert.notEqual(floors[0].key,floors[1].key);
 // Every submitted triangle, including its vertex lighting and finish, must
 // already occur in one legacy profile. No newly overlapping copies allowed.
 const legacyBin=await readFile(new URL('guest-access.bin',root));
 const legacy=decodeRenderProfiles(guest,array(legacyBin),Object.keys(guest.profiles));
 function triangles(p){const counts=new Map();for(const b of p.batches){
  const stride={position:3,normal:3,color:3,aSurface:4},keys=Array.from({length:b.attributes.position.length/3},(_,i)=>JSON.stringify(Object.entries(stride).flatMap(([k,n])=>Array.from(b.attributes[k].slice(i*n,(i+1)*n)))));
  for(let i=0;i<b.indices.length;i+=3){const key=JSON.stringify(Array.from(b.indices.slice(i,i+3),j=>keys[j]).sort());counts.set(key,(counts.get(key)||0)+1);}
 }return counts;}
 const available=new Map();for(const p of Object.values(legacy))for(const [k,n]of triangles(p))available.set(k,Math.max(n,available.get(k)||0));
 for(const [k,n]of triangles(profile))assert.ok(available.get(k)>=n,'A triangle changed its attributes or gained a duplicate');
});

test('selection distinguishes regions and prefers existing complete geometry, then error and detail',()=>{
 const a={id:'floor',vertices:[0,0,0,0,0,1],indices:[0,0,0]},b={...a,vertices:[1,0,0,0,0,1]};
 assert.notEqual(uniformPartKey(a),uniformPartKey(b));const s=createUniformSelection();
 const add=(source,tag,triangles,error,complete=true)=>s.consider(source,{tag},{id:source.id,triangles,error,complete,sourceProfile:tag});
 add(a,'clipped',10,0,false);add(a,'complete',8,.1);assert.equal(s.get(a).geometry.tag,'complete');
 add(a,'accurate',9,.01);add(a,'omitted',0,0);assert.equal(s.get(a).geometry.tag,'accurate');
 add(a,'more-detail',12,.01);add(a,'stable-tie',12,.01);assert.equal(s.get(a).geometry.tag,'more-detail');
 add(b,'other-region',5,0);assert.equal(s.get(b).geometry.tag,'other-region');
});

test('uniform decoder cannot relax legacy budgets or accept incompatible or corrupt data',async()=>{
 assert.throws(()=>decodeRenderProfiles(manifest,array(binary),['uniform']),/Perfil/);
 for(const field of ['version','sourceSHA256','guestSHA256'])assert.throws(()=>decodeUniformQuality({...manifest,[field]:'stale'},array(binary),guest),/versión/);
 assert.throws(()=>decodeUniformQuality(manifest,array(binary),{}),/versión/);
 assert.throws(()=>decodeUniformQuality(manifest,new ArrayBuffer(12),guest),/incompleto/);
 const m=structuredClone(manifest);m.profiles.uniform.triangles=40001;assert.throws(()=>decodeUniformQuality(m,array(binary),guest),/Perfil/);
 const b=array(binary),position=m.profiles.uniform.batches[0].attributes.position;
 new Float32Array(b,position.offset,position.length)[0]=NaN;assert.throws(()=>decodeUniformQuality(manifest,b,guest),/Geometría/);
 await assert.rejects(loadUniformQuality(guest,{fetcher:async()=>({ok:false})}),/cargar/);
 await assert.rejects(loadUniformQuality(guest,{timeoutMs:5,fetcher:(_,{signal})=>new Promise((_,reject)=>signal.addEventListener('abort',()=>reject(Error('timeout'))))}),/timeout/);
});
