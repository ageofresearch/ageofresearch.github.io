import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { buildTerrace, clipGeometry } from '../scripts/build-yacht-terrace.mjs';
import { connectTerrace, moveAlongRoute, routeSegments } from '../site/tidewater-rocha/mobile/aft-terrace.js';
import { crossing } from '../site/tidewater-rocha/mobile/pasarela.js';
import { placeOnRoute } from '../site/tidewater-rocha/mobile/frame-benchmark.js';
import { createBoarding, createFinishes, i as Walk, l as basis } from '../site/tidewater-rocha/assets/RochaYachtState-P5KwIGIl.js';
import { A as Group } from '../site/tidewater-rocha/assets/common-HBn3Movl.js';

const root = new URL('../site/tidewater-rocha/mobile/', import.meta.url);
const manifest = JSON.parse(await readFile(new URL('aft-terrace.json', root)));

function walkingModel() {
  const group = new Group(); group.userData = { yacht:basis };
  const model = {group};
  const materials = createFinishes(0,true,true,true,true);
  const boarding = model.boarding = createBoarding(model,null,{gangwayOnly:true,includeLanding:true,materials});
  boarding.room.spawn = [boarding.start+.18,boarding.y,boarding.height(boarding.start+.18)+1.6];
  const terrace = structuredClone(manifest);
  connectTerrace(boarding,terrace);
  model.asset = {data:{rooms:[terrace.room],levels:{MD:3.95}}};
  const walk = new Walk({camera:{position:group.position}},model,{document:null});
  walk.nav.routes=[];
  walk.nav.floorSafe=(x,y,deck=walk.nav.deck)=>deck==='MD' && boarding.safe(x,y,walk.nav.radius);
  walk.nav.enterRoom('boarding');
  return {walk,boarding,dispose(){boarding.dispose();materials.opaque.dispose();materials.glass.dispose();}};
}

test('published terrace is a reproducible subset of the refined yacht, with no furniture or full model', async () => {
  const generated = await buildTerrace();
  assert.deepEqual(generated.manifest,manifest);
  assert.deepEqual(generated.binary,await readFile(new URL('aft-terrace.bin',root)));
  assert.ok(manifest.triangles<8000);
  assert.ok(generated.binary.length<800000);
  assert.ok(manifest.parts.every(p=>p.bounds[0]>=3.2-1e-6 && p.bounds[3]<=8.5+1e-6));
  assert.ok(manifest.parts.some(p=>p.role==='roof'));
  assert.ok(manifest.parts.some(p=>p.role==='enclosure'));
  assert.ok(manifest.parts.some(p=>p.glass));
  assert.ok(!manifest.parts.some(p=>/FUR_|SAN_/.test(p.id)));
  assert.ok(manifest.floor.every(([a,b,c])=>Math.abs((b[0]-a[0])*(c[1]-a[1])-(b[1]-a[1])*(c[0]-a[0]))>1e-10),'Degenerate faces must not open navigation holes');
  const lights=manifest.parts.flatMap(p=>Array.from(new Float32Array(generated.binary.buffer,generated.binary.byteOffset+p.light.offset,p.light.length)));
  assert.ok(Math.min(...lights)<.6 && Math.max(...lights)>.95);
});

test('clipping interpolates crossings instead of keeping triangles beyond the zone', () => {
  const result=clipGeometry({vertices:[0,0,0,0,0,1,4,0,0,0,0,1,0,4,0,0,0,1],indices:[0,1,2]},[1,0,-1,2,4,1]);
  assert.ok(result.indices.length>=3);
  assert.ok(result.vertices.filter((_,i)=>i%6===0).every(x=>x>=1 && x<=2));
  assert.ok(result.vertices.filter((_,i)=>i%6===5).every(z=>z===1));
  assert.equal(clipGeometry({vertices:[0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1],indices:[0,1,2]},[-1,-1,-1,1,1,1]).indices.length,0);
});

test('native navigation reaches the saloon threshold and returns without crossing glass, stairs, or deck edges', () => {
  const {walk,boarding,dispose}=walkingModel();
  try {
    const {length}=routeSegments(boarding.route);
    assert.ok(moveAlongRoute(walk.nav,boarding.route,0,length));
    assert.ok(Math.hypot(...walk.nav.position.map((v,i)=>v-boarding.route.at(-1)[i]))<.001);
    assert.equal(walk.nav.elevation,3.95);
    walk.nav.move(2,0);
    assert.ok(walk.nav.position[0]<=8.4-walk.nav.radius+.001);
    const forbidden=[[-5,3.1],[-2,2.3],[2.8,2.655],[4.0,0],[5.5,1.8],[8.35,-1],[6,-3.6],[9,0],[6,3.7]];
    for(const p of forbidden)assert.equal(boarding.safe(...p),false,`Must block ${p}`);
    walk.nav.position=boarding.route.at(-1).slice();
    assert.ok(moveAlongRoute(walk.nav,boarding.route,length,0));
    assert.ok(Math.hypot(...walk.nav.position.map((v,i)=>v-boarding.route[0][i]))<.001);
  } finally {dispose();}
});

test('guided walk can resume after a stop and the same benchmark route reaches the terrace at different frame rates', () => {
  const {walk,boarding,dispose}=walkingModel();
  try {
    let advance=crossing(walk);
    for(let i=0;i<180;i++)advance(1/60);
    advance=crossing(walk);
    let running=true;
    for(let i=0;i<1800 && running;i++)running=advance(1/60);
    assert.equal(running,false);
    assert.ok(walk.nav.position[0]>8.17 && Math.abs(walk.nav.position[1]-.1)<.01);
    advance=crossing(walk); running=true;
    for(let i=0;i<1800 && running;i++)running=advance(1/60);
    assert.ok(Math.abs(walk.nav.position[0]-boarding.room.spawn[0])<.01);
    for(const fps of [12,40,60]) {
      walk.nav.enterRoom('boarding');
      for(let i=0;i<=12*fps;i++)placeOnRoute(walk,i/fps,0);
      assert.ok(walk.nav.position[0]>8.17 && Math.abs(walk.nav.position[1]-.1)<.01,`${fps} FPS reaches terrace`);
    }
  } finally {dispose();}
});
