import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {D as Vector3} from '../site/tidewater-rocha/assets/Frame-CNet77I0.js';
import {A as Group} from '../site/tidewater-rocha/assets/common-HBn3Movl.js';
import {createDaylight,compartment} from '../site/tidewater-rocha/mobile/yacht-daylight.js';
import {lightMatrix} from '../site/tidewater-rocha/mobile/daylight-shadow.js';
import probes from '../site/tidewater-rocha/mobile/daylight-probes.js';
const group=new Group();group.rotation.y=Math.PI/2;
const reference=new Vector3(1,1,0).normalize();
test('sun angles use the yacht axes and restore exactly through a session',()=>{
  const items=new Map(),storage={setItem:(k,v)=>items.set(k,v),getItem:k=>items.get(k)};
  const light=createDaylight(reference,group,storage);
  assert.ok(light.world.distanceTo(reference)<1e-6);
  const initial=light.state;
  light.set(90,5);assert.ok(light.direction.x<-.99);assert.ok(Math.abs(light.direction.z)<1e-6);
  const previous=light.revision;light.set(450,5);assert.equal(light.revision,previous);
  light.set(-90,200);assert.ok(light.direction.y>.99999);
  assert.deepEqual(createDaylight(reference,group,storage).state,{azimuth:270,elevation:90});
  light.reset();assert.deepEqual(light.state,initial);
});
test('bounce is compartment-specific, changes with the sun, and is continuous across north',()=>{
  const id=compartment(12,.3,4.7),cabin=compartment(15,1.5,2.8);
  assert.equal(probes[id-1].id,'MD_R02');assert.equal(probes[cabin-1].id,'LD_R03');
  const light=createDaylight(reference,group);
  const sample=a=>{light.set(a,12);return Array.from(light.irradiance.subarray(id*4,id*4+3));};
  assert.notDeepEqual(sample(90),sample(270));
  const a=sample(359.99);sample(.01).forEach((v,i)=>assert.ok(Math.abs(v-a[i])<.0001));
  for(const p of probes){assert.equal(p.rgb.length,72);assert.equal(p.reflection.length,24);}
});
test('the orthographic shadow fit includes the whole yacht even with overhead sun',()=>{
  const light=createDaylight(reference,group),m=new Float32Array(16);
  for(const a of [0,75,180,270,360])for(const h of [5,45,90]){
    light.set(a,h);lightMatrix(light.direction,a,m);
    for(const x of [-4,4])for(const y of [-2,9])for(const z of [-22,18]){
      const coord=r=>m[r]*x+m[4+r]*y+m[8+r]*z+m[12+r];
      assert.ok(Math.abs(coord(0))<=1&&Math.abs(coord(1))<=1&&coord(2)>=0&&coord(2)<=1);
    }
  }
});
test('every mobile profile has sky as its only surrounding geometry',async()=>{
  const m=JSON.parse(await readFile(new URL('../site/tidewater-rocha/mobile/guest-access.json',import.meta.url)));
  for(const p of Object.values(m.profiles)){
    assert.ok(p.audit.some(a=>a.id.endsWith('/Daylight-sky')&&a.triangles>0));
    assert.ok(!p.audit.some(a=>/Rocha-(lake|sky|offshore|distant|wooded|lakeside)/.test(a.id)));
    assert.ok(p.triangles<=25000);assert.equal(p.batches.length,2);
  }
});
