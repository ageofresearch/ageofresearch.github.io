import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {DeckNavigation,surfaceHeight} from '../src/deck-navigation.js';
const layout=JSON.parse(fs.readFileSync(new URL('../public/assets/navigation.json',import.meta.url))),saloon=JSON.parse(fs.readFileSync(new URL('../public/assets/saloon/room.json',import.meta.url)));
const nav=()=>new DeckNavigation(layout,saloon);
function travel(n,x,y){const length=Math.hypot(x-n.position[0],y-n.position[1]),steps=Math.ceil(length/.025);for(let i=steps;i>0;i--)n.move((x-n.position[0])/i,(y-n.position[1])/i);}
test('walk from cockpit to deployed free end and back without a dock or layer jump',()=>{
 const n=nav();n.setZone('cockpit',[3.8,2.72]);travel(n,3.8,3.4);assert.equal(n.layer,'gangway');travel(n,-.12,3.4);assert.ok(n.position[0]<.0);assert.equal(n.layer,'gangway');const z=n.elevation;travel(n,-10,3.4);assert.ok(n.position[0]>-.30&&n.position[0]<0);assert.equal(n.elevation,z);travel(n,2.4,3.4);travel(n,2.4,2.5);assert.ok(n.position[1]>3.15,'Cannot step through a rail to the stair');assert.equal(n.layer,'gangway');travel(n,3.8,3.4);travel(n,3.8,2.7);assert.equal(n.layer,'deck');assert.equal(n.zone,'cockpit');
});
test('port stair retains physical tread heights in both directions',()=>{
 const n=nav();n.setZone('cockpit',[3.7,2.5]);travel(n,.99,2.5);assert.ok(n.position[0]<1.1);assert.ok(Math.abs(n.elevation-2.12)<.01);travel(n,3.7,2.5);assert.ok(n.position[0]>3.6);assert.ok(Math.abs(n.elevation-3.95)<.02);assert.equal(n.layer,'deck');
});
test('unloaded boarding geometry cannot be entered; retry keeps the same safe position',()=>{
 let loaded=false,requested;const n=new DeckNavigation(layout,saloon,{available:id=>id!=='beach-club'||loaded,onBoundary:id=>requested=id});n.setZone('cockpit',[3.8,2.72]);travel(n,3.8,3.4);assert.equal(requested,'beach-club');assert.equal(n.zone,'cockpit');const before=n.position.slice();loaded=true;travel(n,3.8,3.4);assert.equal(n.layer,'gangway');assert.ok(Math.hypot(n.position[0]-before[0],n.position[1]-before[1])<.8);
});
test('biaxial floor planes preserve source units and old longitudinal slopes',()=>{
 assert.equal(surfaceHeight({plane:[.1,-.2,4]},3,2),3.9);assert.equal(surfaceHeight({x0:3,z0:2,slope:.5},5,99),3);
});
test('upper solid floor blocks headroom and never acts as a teleport',()=>{
 const d=structuredClone(layout);d.regions.push({id:'test-overlap',zone:'beach-club',layer:'test-upper',polygon:[[.8,1.8],[1.2,1.8],[1.2,2.8],[.8,2.8]],height:{plane:[0,0,3.0]},solidUnderside:true,thickness:.1});const n=new DeckNavigation(d,saloon);n.zone='beach-club';n.elevation=2.12;assert.equal(n.candidate(1.0,2.3),null);assert.equal(n.layer,'deck');
});
