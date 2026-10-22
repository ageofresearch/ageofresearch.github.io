import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import crypto from 'node:crypto';
import {polygonsOnDeck} from '../src/deck-map.js';
const A=new URL('../public/assets/',import.meta.url),read=file=>JSON.parse(fs.readFileSync(new URL(file,A))),s=read('yacht-structure.json'),nav=read('navigation.json'),manifest=read('manifest.json');
test('structural map uses the guarded published yacht, with all 31 rooms on their source deck',()=>{
 const source=fs.readFileSync(new URL('../../../site/tidewater-rocha/rocha/luz-de-mar/model.json',import.meta.url));
 assert.equal(crypto.createHash('sha256').update(source).digest('hex'),s.sourceFiles['rocha/luz-de-mar/model.json']);
 const original=JSON.parse(source);assert.deepEqual(Object.fromEntries(s.decks.map(d=>[d.id,d.floor])),original.levels);
 const rooms=s.decks.flatMap(d=>d.rooms);assert.equal(rooms.length,31);assert.equal(new Set(rooms.map(r=>r.id)).size,31);
 for(const r of rooms){const o=original.rooms.find(x=>x.id===r.id);assert.equal(o.deck,r.deck);assert.deepEqual(o.bbox,r.bounds);}
 const machinery=rooms.find(r=>r.id==='LD_R02'),saloon=rooms.find(r=>r.id==='MD_R02'),bridge=rooms.find(r=>r.id==='UD_R03'),bow=rooms.find(r=>r.id==='UD_R04');
 assert.ok(machinery.bounds[0]<saloon.bounds[2]&&machinery.bounds[2]>saloon.bounds[0]);assert.ok(bridge.bounds[2]<bow.bounds[0]);
});
test('the map preserves the walking graph and explicitly records VR level overrides',()=>{
 assert.deepEqual(s.connections,nav.connections);assert.deepEqual(s.areas.map(a=>a.id).sort(),manifest.rooms.map(a=>a.id).sort());
 const lower=s.reconciliation.find(r=>r.id==='beach-platform');assert.equal(lower.status,'documented-override');assert.ok(Math.abs(lower.realismTop-lower.originalTop-lower.difference)<1e-9);
 assert.equal(s.areas.find(a=>a.id==='bow').deck,'UD');assert.equal(s.reconciliation.find(r=>r.id==='aft-upper-stair').status,'reserved');
 assert.ok(!nav.connections.some(c=>c.zones.includes('port-side')&&c.zones.includes('bow')));
});
test('upper-deck map contains only the starboard stair and landing, without copying the main-deck passage',()=>{
 const a=s.areas.find(a=>a.id==='starboard-side'),upper=s.decks.find(d=>d.id==='UD'),p=polygonsOnDeck(a,upper);assert.ok(p.length>0);assert.ok(p.some(p=>p.height.slope>0));assert.ok(p.every(p=>Math.min(...p.polygon.map(v=>v[0]))>=21.8));
 assert.equal(polygonsOnDeck(a,s.decks.find(d=>d.id==='MD')).length,a.polygons.length);
});
