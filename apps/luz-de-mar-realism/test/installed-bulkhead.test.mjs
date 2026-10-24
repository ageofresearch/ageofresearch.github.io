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
test('electrical profile commits both fronts, four atlases and three shared reflections as one unit',async()=>{
 const s=setup(),electrical=new Group();electrical.userData.variant='electrical-r11';s.room.root.add(electrical);
 s.controller.dispose();const spec={...s.controller.spec,id:'electrical-vr-r01',label:'frente eléctrico',fallbackVariants:['bulkhead-r11','electrical-r11'],geometries:[{asset:'electrical.glb'},{asset:'../bulkhead-vr-r01/bulkhead.glb'}],irradiances:{bulkhead:'bulkhead.exr',electrical:'electrical.exr'}};
 const controller=new InstalledBulkhead(s.app,s.room,spec,s.controller.deps,new AbortController().signal);controller.bytes=async()=>new ArrayBuffer(1);controller.setActive(true);await controller.promise;
 assert.equal(controller.committed,true);assert.equal(s.fallback.visible,false);assert.equal(electrical.visible,false);assert.equal(controller.bundle.root.children.length,2);assert.equal(controller.bundle.textures.length,4);assert.equal(controller.bundle.targets.length,3);assert.equal(s.room.appearanceLighting,controller.bundle.roomLighting);assert.equal(controller.stats.version,'electrical-vr-r01');
 controller.setActive(false);assert.equal(s.fallback.visible,true);assert.equal(electrical.visible,true);assert.equal(s.room.appearanceLighting,null);assert.equal(controller.bundle,null);controller.dispose();
});
test('electrical replacement attaches the plain access panel to the live door pivot and restores it without accumulating transforms',async()=>{
 const s=setup(),oldDoor=new Mesh(new BoxGeometry(),new MeshStandardMaterial()),oldGrid=new Group(),pivot=new Group();oldGrid.userData.componentID='VR_ER/ochre-grid';s.room.root.add(oldGrid,pivot);pivot.add(oldDoor);s.room.dynamic={door:[oldDoor]};s.room.machinery.doorPivot=pivot;pivot.rotation.y=-Math.PI/2;
 s.controller.dispose();const deps={...s.controller.deps,gltf:{parseAsync:async()=>{const scene=new Group(),door=new Mesh(new BoxGeometry(),new MeshStandardMaterial());door.userData.appearanceDoor=true;door.material.userData.appearanceDoor=true;door.position.set(1,2,3);scene.add(door);return{scene};}}};const spec={...s.controller.spec,fallbackComponents:['VR_ER/ochre-grid'],fallbackDynamic:['door']},c=new InstalledBulkhead(s.app,s.room,spec,deps,new AbortController().signal);c.bytes=async()=>new ArrayBuffer(1);c.setActive(true);await c.promise;assert.equal(c.committed,true);assert.equal(oldDoor.visible,false);assert.equal(oldGrid.visible,false);const replacement=c.bundle.doors[0].object;assert.equal(replacement.parent,pivot);assert.equal(pivot.rotation.y,-Math.PI/2);pivot.rotation.y=0;assert.deepEqual(replacement.position.toArray(),[1,2,3]);c.restore();assert.equal(oldDoor.visible,true);assert.equal(oldGrid.visible,true);assert.deepEqual(replacement.position.toArray(),[1,2,3]);c.update();assert.equal(replacement.parent,pivot);assert.deepEqual(replacement.position.toArray(),[1,2,3]);c.setActive(false);assert.equal(oldDoor.visible,true);assert.equal(oldGrid.visible,true);assert.equal(c.bundle,null);c.dispose();
});
test('invalid service headroom data is rejected before the appearance transaction',async()=>{const s=setup();s.controller.spec.navigation.headroom={eyeHeights:btoa('x'),minimumEyeHeight:.9,maximumEyeHeight:1.6};s.nav.grid={nx:2,ny:2};s.controller.setActive(true);await s.controller.promise;assert.equal(s.controller.committed,false);assert.equal(s.fallback.visible,true);assert.match(s.controller.error,/altura/);assert.equal(s.nav.headroom,undefined);s.controller.dispose();});
