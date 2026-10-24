import test from 'node:test';
import assert from 'node:assert/strict';
import {Group,Scene,Mesh,BoxGeometry,MeshStandardMaterial,Texture,PerspectiveCamera} from 'three';
import {InstalledBulkhead} from '../src/installed-bulkhead.js';
const tick=()=>new Promise(r=>setImmediate(r));
function gate(){let resolve;const promise=new Promise(r=>resolve=r);return{promise,resolve};}
function setup(compile=async()=>{}){
 globalThis.document={hidden:false};globalThis.location={href:'http://localhost/'};
 const root=new Group(),fallback=new Group();fallback.userData.variant='bulkhead-r11';root.add(fallback);
 const targets=[0,1,2].map(()=>({texture:new Texture()})),specs=[0,1,2].map(i=>({position:[0,0,i],asset:'probe-'+i+'.exr'}));
 let safe=true;const nav={bits:new Uint8Array([255]),openBits:new Uint8Array([255]),safe:()=>safe};
 const engine=()=>({setLightingOverride(value){this.lightingOverride=value;}}),room={root,environments:targets,probeSpecs:specs,machinery:{installed:engine(),installedRight:engine(),nav:{isolated:new Map([['machinery',nav]])}}};
 const app={scene:new Scene(),camera:new PerspectiveCamera(),nav:{position:[9.15,0]},renderer:{compileAsync:compile},errors:[],syncUI(){},invalidate(){}};
 const made=[],deps={texture:()=>new Texture(),pmrem:{fromEquirectangular:()=>{const t={texture:new Texture(),disposed:false,dispose(){this.disposed=true;this.texture.dispose();}};made.push(t);return t;}},gltf:{parseAsync:async()=>{const scene=new Group();scene.add(new Mesh(new BoxGeometry(),new MeshStandardMaterial()));return{scene};}}};
 const spec={base:'./bulkhead/',geometry:'model.glb',irradiance:'wall.exr',probes:specs,engineLighting:{port:{irradiance:'port.exr',probes:specs},starboard:{irradiance:'starboard.exr',probes:specs}},matrix:[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],navigation:{mask:btoa(String.fromCharCode(1)),openMask:btoa(String.fromCharCode(2))}};
 const signal=new AbortController(),controller=new InstalledBulkhead(app,room,spec,deps,signal.signal);room.machinery.bulkhead=controller;controller.bytes=async()=>new ArrayBuffer(1);
 return{controller,app,room,nav,fallback,targets,made,setSafe:v=>safe=v};
}
test('bulkhead waits for compilation and a safe position, then swaps all lighting and navigation together',async()=>{
 const g=gate(),s=setup(()=>g.promise),original=s.nav.bits;s.controller.setActive(true);await tick();assert.equal(s.fallback.visible,true);assert.equal(s.controller.ready,false);s.setSafe(false);g.resolve();await s.controller.promise;
 assert.equal(s.controller.ready,true);assert.equal(s.controller.committed,false);assert.equal(s.fallback.visible,true);assert.equal(s.room.bulkheadLighting,undefined);assert.equal(s.nav.bits,original);
 s.setSafe(true);s.controller.update();assert.equal(s.controller.committed,true);assert.equal(s.fallback.visible,false);assert.deepEqual([...s.nav.bits],[1]);assert.equal(s.room.machinery.installed.lightingOverride,s.controller.bundle.engineLighting.port);assert.equal(s.room.machinery.installedRight.lightingOverride,s.controller.bundle.engineLighting.starboard);
 assert.equal(s.made.length,3,'Three shared targets, not separate targets per engine');assert.equal(s.controller.bundle.engineLighting.port.targets[0],s.controller.bundle.engineLighting.starboard.targets[0]);
 s.controller.setActive(false);assert.equal(s.nav.bits,original);assert.equal(s.fallback.visible,true);assert.equal(s.room.bulkheadLighting,null);assert.equal(s.room.machinery.installed.lightingOverride,null);assert.equal(s.controller.bundle,null);assert.equal(s.controller.ready,false);assert.ok(s.made.every(t=>t.disposed),'Leaving releases resources even while the original room remains cached');s.controller.dispose();
});
test('failed shader preparation retains the preceding complete assembly and releases new GPU resources',async()=>{
 const s=setup();s.app.renderer.compileAsync=async()=>s.app.errors.push('shader failed');s.controller.setActive(true);await s.controller.promise;assert.equal(s.controller.ready,false);assert.equal(s.fallback.visible,true);assert.equal(s.controller.bundle,undefined);assert.match(s.controller.error,/materiales/);assert.ok(s.made.every(t=>t.disposed));s.controller.dispose();
});
test('cancellation discards a stale compilation without replacing a successful retry',async()=>{
 const g=gate();let n=0;const s=setup(()=>++n===1?g.promise:Promise.resolve());s.controller.setActive(true);await tick();const previous=s.controller.promise;s.controller.setActive(false);s.controller.setActive(true);await s.controller.promise;const winner=s.controller.bundle;g.resolve();await previous;assert.equal(s.controller.bundle,winner);assert.equal(s.controller.committed,true);assert.equal(s.fallback.visible,false);assert.ok(s.made.slice(0,3).every(t=>t.disposed));s.controller.dispose();
});
test('hidden document defers replacement until the next visible update',async()=>{
 const s=setup();document.hidden=true;s.controller.setActive(true);await s.controller.promise;assert.equal(s.controller.ready,true);assert.equal(s.controller.committed,false);assert.equal(s.fallback.visible,true);document.hidden=false;s.controller.update();assert.equal(s.controller.committed,true);s.controller.dispose();
});
