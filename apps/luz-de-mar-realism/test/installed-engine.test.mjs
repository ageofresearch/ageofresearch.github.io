import test from'node:test';import assert from'node:assert/strict';import{Group,Mesh,BoxGeometry,MeshStandardMaterial,Texture,PerspectiveCamera,Scene,Vector3}from'three';import{InstalledEngine}from'../src/installed-engine.js';import{TexturePool}from'../src/streaming.js';
const tick=()=>new Promise(r=>setImmediate(r));const gate=()=>{let resolve;const promise=new Promise(r=>resolve=r);return{promise,resolve};};
function setup(compile=async()=>{}){
 const signal=new AbortController(),fallback=new Group(),root=new Group(),native=new Group(),right=new Group(),camera=new PerspectiveCamera();fallback.userData.variant='left-r11';root.add(fallback);const room={root,lease:new Set(),probeBounds:{min:[0,0,0],max:[10,10,10]},machinery:{mtu:{cutaway:false,selected:'port'},exteriors:{port:native,starboard:right}}},app={camera,scene:new Scene(),renderer:{compileAsync:compile},syncUI(){},invalidate(){}},models=[],pool=new TexturePool();
 const deps={pool,texture:()=>new Texture(),pmrem:{fromEquirectangular:()=>({texture:new Texture(),dispose(){this.texture.dispose();}})},gltf:{ktx2Loader:{parse:(b,ok)=>ok(new Texture())},parseAsync:async()=>{const scene=new Group(),material=new MeshStandardMaterial({map:new Texture()});material.userData.textureKeys={map:'shared-map'};const mesh=new Mesh(new BoxGeometry(),material);scene.add(mesh);models.push({scene,mesh,material});return{scene};}}};
 const spec={base:'./test/',matrix:[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],lods:{walk:{asset:'walk.glb',triangles:10},detail:{asset:'detail.glb',triangles:20}},irradiance:{asset:'irr.exr'},probes:[{asset:'probe.exr',position:[0,0,0]}],receiver:{asset:'receiver.ktx2',boundsWeb:[0,0,1,1],floorWeb:0},detailCenter:[0,0,0]};
 const engine=new InstalledEngine(app,room,spec,deps,signal.signal);engine.bytes=async()=>new ArrayBuffer(1);globalThis.location={href:'http://localhost/'};return{engine,room,fallback,native,right,models,pool,deps,signal,spec};
}
test('installed exterior commits atomically and only port cutaway swaps its representation',async()=>{
 const g=gate(),s=setup(()=>g.promise);s.engine.setActive(true);await tick();assert.equal(s.fallback.visible,true);assert.equal(s.native.visible,true);assert.equal(s.engine.ready,false);g.resolve();await s.engine.promise;assert.equal(s.fallback.visible,false);assert.equal(s.native.visible,false);assert.equal(s.engine.receiver.enabled.value,1);
 s.room.machinery.mtu.cutaway=true;s.room.machinery.mtu.selected='starboard';s.engine.sync();assert.equal(s.engine.lods.get('walk').visible,true);assert.equal(s.right.visible,true);
 s.room.machinery.mtu.selected='port';s.engine.sync();assert.equal(s.engine.lods.get('walk').visible,false);assert.equal(s.engine.receiver.enabled.value,0);assert.equal(s.fallback.visible,true);
 s.room.machinery.mtu.cutaway=false;s.engine.sync();assert.equal(s.engine.lods.get('walk').visible,true);s.engine.dispose();
});
test('failed exterior preserves the complete original and supports retry',async()=>{
 const s=setup();let fail=true;s.engine.bytes=async()=>{if(fail)throw Error('failed');return new ArrayBuffer(1);};s.engine.setActive(true);await s.engine.promise;assert.equal(s.engine.ready,false);assert.equal(s.fallback.visible,true);assert.equal(s.native.visible,true);assert.equal(s.engine.error,'failed');fail=false;await s.engine.load();assert.equal(s.engine.ready,true);s.engine.dispose();
});
test('a shader compilation failure cannot commit a partial exterior',async()=>{
 const s=setup();s.engine.app.errors=[];s.engine.app.renderer.compileAsync=async()=>{s.engine.app.errors.push('Intentional shader failure');};s.engine.setActive(true);await s.engine.promise;assert.equal(s.engine.ready,false);assert.equal(s.fallback.visible,true);assert.equal(s.native.visible,true);assert.equal(s.engine.lods.size,0);assert.match(s.engine.error,/materiales/);s.engine.dispose();
});
test('a mismatched asset hash retains the original instead of mixing export revisions',async()=>{
 const s=setup(),before=globalThis.fetch;globalThis.fetch=async()=>new Response(new Uint8Array([1,2,3]));s.engine.spec.hashes={'walk.glb':'0'.repeat(64)};s.engine.bytes=InstalledEngine.prototype.bytes.bind(s.engine);try{s.engine.setActive(true);await s.engine.promise;assert.equal(s.engine.ready,false);assert.equal(s.fallback.visible,true);assert.match(s.engine.error,/versión/);}finally{globalThis.fetch=before;s.engine.dispose();}
});
test('leaving during compilation discards stale meshes without hiding the winning retry',async()=>{
 const g=gate();let count=0;const s=setup(()=>++count===1?g.promise:Promise.resolve());s.engine.setActive(true);await tick();const old=s.engine.promise;s.engine.setActive(false);s.engine.setActive(true);await s.engine.promise;const winner=s.engine.lods.get('walk');let disposed=0;s.models[0].material.map.addEventListener('dispose',()=>disposed++);g.resolve();await old;assert.equal(disposed,1);assert.equal(s.engine.lods.get('walk'),winner);assert.equal(winner.visible,true);assert.equal(s.fallback.visible,false);s.engine.dispose();
});
test('cancelled detail releases its private textures and keeps the walking model',async()=>{
 let compile=0;const g=gate(),s=setup(()=>++compile===2?g.promise:Promise.resolve());s.engine.setActive(true);await s.engine.promise;const detail=s.engine.detail();await tick();let disposed=0;s.models[1].material.map.addEventListener('dispose',()=>disposed++);s.engine.setActive(false);g.resolve();await detail;assert.equal(disposed,1);assert.equal(s.engine.lods.has('detail'),false);assert.equal(s.engine.lods.has('walk'),true);s.engine.setActive(true);assert.equal(s.fallback.visible,false);s.engine.update();await tick();assert.equal(s.engine.lods.has('detail'),true,'Returning near the engine must resume cancelled detail loading');s.engine.dispose();
});
test('surrounding specular probes follow the installed/nominal representation and restore on disposal',async()=>{
 const s=setup(),original=new Texture(),uniforms={};s.room.environments=[{texture:original}];s.room.probeSpecs=[{position:[1,2,3]}];for(const name of['A','B','C']){uniforms['uRoomProbe'+name]={value:original};uniforms['uRoomPosition'+name]={value:new Vector3(1,2,3)};}s.room.probeBindings=new Map([['context',uniforms]]);s.engine.setActive(true);await s.engine.promise;const installed=s.engine.targets[0].texture;assert.equal(uniforms.uRoomProbeA.value,installed);s.room.machinery.mtu.cutaway=true;s.room.machinery.mtu.selected='starboard';s.engine.sync();assert.equal(uniforms.uRoomProbeA.value,installed);s.room.machinery.mtu.selected='port';s.engine.sync();assert.equal(uniforms.uRoomProbeA.value,original);assert.deepEqual(uniforms.uRoomPositionA.value.toArray(),[1,2,3]);s.room.machinery.mtu.cutaway=false;s.engine.sync();s.engine.dispose();assert.equal(uniforms.uRoomProbeA.value,original);
});

test('two installed engines swap independently and starboard preserves port context lighting',async()=>{
 const s=setup(),rightFallback=new Group();rightFallback.userData.variant='right-r11';s.room.root.add(rightFallback);
 const right=new InstalledEngine(s.engine.app,s.room,{...s.spec,side:'starboard',fallbackVariant:'right-r11',contextReflections:false},s.deps,s.signal.signal);
 right.bytes=async()=>new ArrayBuffer(1);s.engine.setActive(true);right.setActive(true);await Promise.all([s.engine.promise,right.promise]);
 assert.equal(s.fallback.visible,false);assert.equal(rightFallback.visible,false);assert.equal(s.native.visible,false);assert.equal(s.right.visible,false);
 const reflection=s.room.reflectionOverride;s.room.machinery.mtu.cutaway=true;s.room.machinery.mtu.selected='starboard';s.engine.sync();right.sync();
 assert.equal(s.engine.stats.visible,true);assert.equal(right.stats.visible,false);assert.equal(rightFallback.visible,true);assert.equal(s.fallback.visible,false);assert.equal(s.room.reflectionOverride,reflection);
 s.room.machinery.mtu.selected='port';s.engine.sync();right.sync();assert.equal(right.stats.visible,true);assert.equal(s.engine.stats.visible,false);assert.equal(s.fallback.visible,true);assert.equal(rightFallback.visible,false);
 right.dispose();s.engine.dispose();
});

test('both reversible floor masks compile into independent shader uniforms',async()=>{
 const s=setup(),m=new MeshStandardMaterial(),floor=new Mesh(new BoxGeometry(),m);s.room.root.add(floor);
 const right=new InstalledEngine(s.engine.app,s.room,{...s.spec,side:'starboard',contextReflections:false},s.deps,s.signal.signal);
 s.engine.installReceivers();right.installReceivers();const shader={uniforms:{},fragmentShader:'#include <lights_fragment_end>'};m.onBeforeCompile(shader,{});
 assert.equal(shader.uniforms.uLeftReceiverEnabled,s.engine.receiver.enabled);assert.equal(shader.uniforms.uRightReceiverEnabled,right.receiver.enabled);
 assert.match(shader.fragmentShader,/uniform float uLeftReceiverEnabled/);assert.match(shader.fragmentShader,/uniform float uRightReceiverEnabled/);
 assert.equal((shader.fragmentShader.match(/#include <lights_fragment_end>/g)||[]).length,1);s.engine.receiver.enabled.value=1;right.receiver.enabled.value=0;
 assert.equal(shader.uniforms.uLeftReceiverEnabled.value,1);assert.equal(shader.uniforms.uRightReceiverEnabled.value,0);right.dispose();s.engine.dispose();
});
