import {EquirectangularReflectionMapping,Matrix4,Group} from 'three';
import {assetURL} from './asset-version.js';
import {applyRoomShading} from './shading.js';
import {pendingAppearanceBundles} from './appearance-resources.js';

// A fixed assembly and its lighting are committed together. Original room and
// engine lighting remain owned by their original loaders and are never disposed here.
export class InstalledBulkhead {
 constructor(app,room,spec,deps,signal){
  Object.assign(this,{app,room,spec,deps});this.active=false;this.ready=false;this.committed=false;this.disposed=false;this.loading=false;this.error='';this.ticket=0;this.fallback=[];this.pendingBundles=new Set();
  this.label=spec.label||'mamparo';this.version=spec.id||'bulkhead-vr-r01';
  const variants=spec.fallbackVariants||['bulkhead-r11'],components=spec.fallbackComponents||[];room.root.traverse(o=>{if(variants.includes(o.userData.variant)||components.includes(o.userData.componentID))this.fallback.push(o);});for(const name of spec.fallbackDynamic||[])for(const o of room.dynamic?.[name]||[])if(!this.fallback.includes(o))this.fallback.push(o);
  this.externalSignal=signal;this.onAbort=()=>this.dispose();signal.addEventListener('abort',this.onAbort,{once:true});
 }
 async bytes(name,signal){
  const response=await fetch(assetURL(this.spec.base+name),{signal});if(!response.ok)throw Error('No se pudo preparar el '+this.label+' ('+response.status+')');
  const bytes=await response.arrayBuffer(),expected=this.spec.hashes[name];if(!expected)throw Error('Falta la versión del activo del '+this.label);
  const digest=await crypto.subtle.digest('SHA-256',bytes),actual=[...new Uint8Array(digest)].map(v=>v.toString(16).padStart(2,'0')).join('');
  if(actual!==expected)throw Error('El activo del '+this.label+' no coincide con su versión');signal.throwIfAborted();return bytes;
 }
 async load(){
  if(this.disposed||this.ready)return this.ready;if(this.promise)return this.promise;
  const ticket=++this.ticket,controller=this.controller=new AbortController(),signal=controller.signal;this.loading=true;this.error='';this.notify();
  this.promise=(async()=>{
   const bundle={textures:[],targets:[],engineLighting:{}};this.pendingBundles.add(bundle);pendingAppearanceBundles.add(bundle);
   try{
    const geometry=this.spec.geometries||[{asset:this.spec.geometry}],atlases=this.spec.irradiances||{bulkhead:this.spec.irradiance};
    const names=[...geometry.map(g=>g.asset),...Object.values(atlases),...this.spec.probes.map(p=>p.asset),...Object.values(this.spec.engineLighting).flatMap(s=>[s.irradiance,...s.probes.map(p=>p.asset)])];
    const buffers=new Map(await Promise.all([...new Set(names)].map(async name=>[name,await this.bytes(name,signal)])));signal.throwIfAborted();
    const irradiance=name=>{const t=this.deps.texture(buffers.get(name),true);bundle.textures.push(t);return t;};
    const reflectionCache=new Map();const reflections=specs=>specs.map(spec=>{if(reflectionCache.has(spec.asset))return reflectionCache.get(spec.asset);const raw=this.deps.texture(buffers.get(spec.asset));raw.mapping=EquirectangularReflectionMapping;const target=this.deps.pmrem.fromEquirectangular(raw);raw.dispose();bundle.targets.push(target);reflectionCache.set(spec.asset,target);return target;});
    bundle.irradiances=Object.fromEntries(Object.entries(atlases).map(([key,name])=>[key,irradiance(name)]));bundle.irradiance=bundle.irradiances.bulkhead;bundle.roomLighting={targets:reflections(this.spec.probes),specs:this.spec.probes};
    for(const [side,spec]of Object.entries(this.spec.engineLighting))bundle.engineLighting[side]={irradiance:irradiance(spec.irradiance),targets:reflections(spec.probes),specs:spec.probes};
    bundle.root=new Group();for(const g of geometry){const model=await this.deps.gltf.parseAsync(buffers.get(g.asset),new URL(this.spec.base,location.href).href);bundle.root.add(model.scene);signal.throwIfAborted();}
    bundle.root.applyMatrix4(new Matrix4().fromArray(this.spec.matrix));this.configure(bundle);
    const h=this.spec.navigation.headroom;if(h){const values=Uint8Array.from(atob(h.eyeHeights),c=>c.charCodeAt(0)),grid=this.navigation()?.grid;if(!grid||values.length!==grid.nx*grid.ny||![h.minimumEyeHeight,h.maximumEyeHeight].every(Number.isFinite)||h.minimumEyeHeight<.5||h.maximumEyeHeight<h.minimumEyeHeight||h.maximumEyeHeight>2.5)throw Error('La altura del paso de servicio es incompatible');bundle.headroom={...h,values};}
    const uploads=new Set(bundle.textures);bundle.root.traverse(o=>{for(const m of Array.isArray(o.material)?o.material:o.material?[o.material]:[])for(const value of Object.values(m))if(value?.isTexture&&!value.isRenderTargetTexture)uploads.add(value);});for(const texture of uploads)this.app.renderer.initTexture?.(texture);signal.throwIfAborted();
    const errors=this.app.errors.length;await this.app.renderer.compileAsync(bundle.root,this.app.camera,this.app.scene);signal.throwIfAborted();
    if(this.app.errors.length!==errors)throw Error('No se pudieron preparar los materiales del '+this.label);
    if(this.disposed||ticket!==this.ticket)return false;
    this.bundle=bundle;this.ready=true;bundle.root.visible=false;this.room.root.add(bundle.root);this.update();return true;
   }catch(error){if(!this.disposed&&ticket===this.ticket&&error.name!=='AbortError'){this.error=error.message;controller.abort();}return false;}
   finally{if(this.bundle!==bundle)this.release(bundle);this.pendingBundles.delete(bundle);pendingAppearanceBundles.delete(bundle);if(ticket===this.ticket){this.loading=false;this.promise=null;this.notify();}}
  })();return this.promise;
 }
 configure(bundle){
  const local={...this.room,reflectionOverride:null,environments:bundle.roomLighting.targets,probeSpecs:this.spec.probes,probeBindings:new Map()},seen=new Set();
  bundle.doors=[];bundle.root.traverse(o=>{if(o.userData.appearanceDoor){o.updateMatrix();bundle.doors.push({object:o,parent:o.parent,matrix:o.matrix.clone()});}});
  bundle.root.traverse(o=>{if(!o.isMesh)return;o.castShadow=true;o.receiveShadow=false;const mode=o.geometry.getAttribute('_bake_mode'),irradiance=o.geometry.getAttribute('_irradiance');if(mode&&irradiance){o.geometry.setAttribute('aBakedMode',mode);o.geometry.setAttribute('aBakedIrradiance',irradiance);}
   for(const material of Array.isArray(o.material)?o.material:[o.material]){
    if(seen.has(material))continue;seen.add(material);material.lightMap=bundle.irradiances[material.userData.lightmap]||bundle.irradiance;material.lightMapIntensity=Math.PI;material.envMap=bundle.roomLighting.targets[0].texture;material.envMapIntensity=.85;if(material.transparent){material.transmission=0;material.depthWrite=false;}
    if(material.userData.appearanceDoor){material.lightMap=null;o.receiveShadow=true;applyRoomShading(material,local,{baked:false});continue;}
    applyRoomShading(material,local,{baked:true});const before=material.onBeforeCompile,key=material.customProgramCacheKey.bind(material);
    material.onBeforeCompile=(shader,renderer)=>{before(shader,renderer);if(material.userData.electricalMaterial){shader.vertexShader='attribute float aBakedMode;attribute vec3 aBakedIrradiance;varying float vBakedMode;varying vec3 vBakedIrradiance;\n'+shader.vertexShader;shader.vertexShader=shader.vertexShader.replace('#include <begin_vertex>','#include <begin_vertex>\nvBakedMode=aBakedMode;vBakedIrradiance=aBakedIrradiance;');shader.fragmentShader='varying float vBakedMode;varying vec3 vBakedIrradiance;\n'+shader.fragmentShader;const token='vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;';if(!shader.fragmentShader.includes(token))throw Error('El material de iluminación del frente eléctrico es incompatible');shader.fragmentShader=shader.fragmentShader.replace(token,'vec3 lightMapIrradiance = mix(lightMapTexel.rgb,vBakedIrradiance,vBakedMode) * lightMapIntensity;');material.userData.hybridTransportReady=true;}shader.fragmentShader=shader.fragmentShader.replace('#include <lights_fragment_end>','#include <lights_fragment_end>\nreflectedLight.directDiffuse=vec3(0.);reflectedLight.directSpecular=vec3(0.);\n#ifdef USE_CLEARCOAT\nclearcoatSpecularDirect=vec3(0.);\n#endif\n');};
    material.customProgramCacheKey=()=>key()+'-fixed-full-diffuse-v2-'+!!material.userData.electricalMaterial;
   }
  });
 }
 contextLighting(lighting){
  this.room.appearanceLighting=this.room.bulkheadLighting=lighting;const targets=lighting?.targets||this.room.environments,specs=lighting?.specs||this.room.probeSpecs;
  this.room.reflectionOverride=lighting?{targets,specs}:null;
  for(const uniforms of (this.room.probeBindings?.values()||[]))for(const [i,name]of ['A','B','C'].entries()){
   const index=Math.min(i,targets.length-1);uniforms['uRoomProbe'+name].value=targets[index].texture;uniforms['uRoomPosition'+name].value.fromArray(specs[index].position);
  }
  this.room.root.traverse(o=>{if(!o.isMesh)return;for(const m of Array.isArray(o.material)?o.material:[o.material])if(!m.userData.leftMaterial&&!m.userData.rightMaterial&&!m.userData.bulkheadMaterial&&!m.userData.electricalMaterial)m.envMap=targets[Math.floor(targets.length/2)].texture;});
 }
 navigation(){return this.room.machinery.nav?.isolated.get('machinery');}
 safeToCommit(){
  const nav=this.navigation();if(!nav)return false;const closed=nav.bits,open=nav.openBits;
  try{nav.bits=this.closedBits??=Uint8Array.from(atob(this.spec.navigation.mask),c=>c.charCodeAt(0));nav.openBits=this.openBits??=Uint8Array.from(atob(this.spec.navigation.openMask),c=>c.charCodeAt(0));return nav.safe(...this.app.nav.position);}
  finally{nav.bits=closed;nav.openBits=open;}
 }
 update(){
  if(this.disposed||document.hidden||!this.active||!this.ready||this.committed||!this.safeToCommit())return;
  const nav=this.navigation();this.originalNavigation??={nav,bits:nav.bits,openBits:nav.openBits,headroom:nav.headroom};nav.bits=this.closedBits;nav.openBits=this.openBits;nav.headroom=this.bundle.headroom;
  if(this.bundle.headroom)this.app.controls?.apply?.();
  this.contextLighting(this.bundle.roomLighting);
  for(const [side,key]of [['port','installed'],['starboard','installedRight']])this.room.machinery[key]?.setLightingOverride(this.bundle.engineLighting[side]);
  const pivot=this.room.machinery.doorPivot;if(pivot&&this.bundle.doors?.length){const angle=pivot.rotation.y;pivot.rotation.y=0;this.room.root.updateMatrixWorld(true);for(const door of this.bundle.doors)pivot.attach(door.object);pivot.rotation.y=angle;pivot.updateMatrixWorld(true);}
  for(const o of this.fallback)o.visible=false;this.bundle.root.visible=true;this.committed=true;this.notify(true);
 }
 restore(){
  if(!this.committed)return;
  this.contextLighting(null);for(const key of ['installed','installedRight'])this.room.machinery[key]?.setLightingOverride(null);
  for(const door of this.bundle?.doors||[]){door.parent.attach(door.object);door.object.matrix.copy(door.matrix);door.object.matrix.decompose(door.object.position,door.object.quaternion,door.object.scale);door.object.updateMatrixWorld(true);}
  for(const o of this.fallback)o.visible=true;if(this.bundle)this.bundle.root.visible=false;
  if(this.originalNavigation){const {nav,bits,openBits,headroom}=this.originalNavigation;nav.bits=bits;nav.openBits=openBits;nav.headroom=headroom;}
  this.committed=false;this.notify(true);
 }
 setActive(value){
  this.active=value;if(!value){this.restore();if(this.loading){this.ticket++;this.controller?.abort();this.promise=null;this.loading=false;}if(this.bundle){this.release(this.bundle);this.bundle=null;this.ready=false;}this.originalNavigation=null;}
  else if(this.ready)this.update();else if(!this.error)void this.load();
 }
 retry(){this.error='';return this.load();}
 notify(shadows=false){if(this.disposed)return;this.app.syncUI();this.app.invalidate(false,shadows);}
 release(bundle){
  const geometries=new Set(),materials=new Set(),textures=new Set(bundle.textures);bundle.root?.removeFromParent();bundle.root?.traverse(o=>{if(o.geometry)geometries.add(o.geometry);for(const m of Array.isArray(o.material)?o.material:o.material?[o.material]:[]){materials.add(m);for(const key of ['map','normalMap','roughnessMap','metalnessMap','alphaMap','emissiveMap'])if(m[key])textures.add(m[key]);}});
  for(const g of geometries)g.dispose();for(const m of materials)m.dispose();for(const t of textures)t.dispose();for(const target of bundle.targets)target.dispose();
 }
 dispose(){if(this.disposed)return;this.restore();this.disposed=true;this.ticket++;this.controller?.abort();this.externalSignal.removeEventListener('abort',this.onAbort);if(this.bundle)this.release(this.bundle);this.bundle=null;}
 get stats(){return{ready:this.ready,loading:this.loading,error:this.error,active:this.active,committed:this.committed,waitingForSafePosition:this.ready&&this.active&&!this.committed,triangles:this.spec.triangles,version:this.version,label:this.label};}
}
