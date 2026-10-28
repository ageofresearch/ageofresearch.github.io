import * as THREE from 'three';import {applyRoomShading} from './shading.js';import {TexturePool} from './streaming.js';import {InstalledEngine} from './installed-engine.js';
import {assetURL} from './asset-version.js';
import {InstalledBulkhead} from './installed-bulkhead.js';
import {InstalledFilterWell} from './filter-well.js';
import {engineAllowed,appearanceProfile} from './loading.js';
export function roomAssets({gltf,exr,pmrem,app,mechanics}){
 const pool=new TexturePool();
 const bytes=(url,signal)=>app.assets.bytes(url,signal);
 const texture=(buffer,atlas=false)=>{const t=exr.parse(buffer),v=new THREE.DataTexture(t.data,t.width,t.height,t.format,t.type);v.colorSpace=THREE.LinearSRGBColorSpace;v.minFilter=v.magFilter=THREE.LinearFilter;v.generateMipmaps=false;v.flipY=atlas;v.channel=atlas?1:0;v.needsUpdate=true;return v;};
 function dispose(room){
  room.machinery?.dispose();
  const geometries=new Set(),materials=new Set(),textures=new Set(Object.values(room.atlases||{})),pooled=new Set([...pool.entries.values()].map(e=>e.texture)),environmentTargets=new Set((room.environments||[]).map(e=>e.texture));
  room.root?.traverse(o=>{if(o.geometry)geometries.add(o.geometry);if(o.material)for(const m of Array.isArray(o.material)?o.material:[o.material])materials.add(m);});
  for(const m of materials){for(const v of Object.values(m))if(v?.isTexture&&!pooled.has(v)&&!environmentTargets.has(v))textures.add(v);m.dispose();}for(const g of geometries)g.dispose();for(const t of textures)t.dispose();for(const e of room.environments||[])e.dispose();pool.release(room.lease||new Set());
 }
 async function load(id,signal){
  const base='./assets/'+id+'/',meta=await app.assets.json(base+'room.json',signal),atlases=meta.atlases,probeSpecs=meta.probes;
  const buffers=await Promise.all([bytes(base+'room.glb',signal),...atlases.map(a=>bytes(base+a.asset,signal)),...probeSpecs.map(p=>bytes(base+p.asset,signal)),...(meta.supplementGeometry?[bytes(base+meta.supplementGeometry.asset,signal)]:[])]);
  signal.throwIfAborted();const room={id,meta,dynamic:{register:[],door:[]},atlases:{},environments:[],probeSpecs,probePosition:meta.probePosition,probeBounds:meta.probeBounds,lease:new Set()};
  try{
   if(id==='machinery'&&!await app.selection.load())throw Error('No se pudo preparar la selección de equipos');const model=await gltf.parseAsync(buffers[0],new URL(base,location.href).href);room.root=model.scene;if(meta.supplementGeometry){const extra=await gltf.parseAsync(buffers.at(-1),new URL(base,location.href).href);room.root.add(extra.scene);}room.root.traverse(o=>{if(['filter-well-context','filter-well-register'].includes(o.userData.variant))o.visible=false;if(o.userData.dynamic&&room.dynamic[o.userData.dynamic])room.dynamic[o.userData.dynamic].push(o);});signal.throwIfAborted();
   atlases.forEach((a,i)=>room.atlases[a.key]=texture(buffers[i+1],true));
   for(let i=0;i<probeSpecs.length;i++){const raw=texture(buffers[1+atlases.length+i]);raw.mapping=THREE.EquirectangularReflectionMapping;room.environments.push(pmrem.fromEquirectangular(raw));raw.dispose();}
   room.environment=room.environments[Math.floor(room.environments.length/2)];const configured=new Set();
   room.root.traverse(o=>{if(!o.isMesh)return;for(const m of Array.isArray(o.material)?o.material:[o.material]){
    if(configured.has(m))continue;configured.add(m);for(const[slot,key]of Object.entries(m.userData.textureKeys||{}))if(m[slot]){const t=m[slot],settings=[t.colorSpace,t.channel,t.flipY,t.wrapS,t.wrapT].join('/');m[slot]=pool.acquire(key+'/'+settings,t,room.lease);}
    const atlas=m.userData.lightmap||o.userData.lightmap,baked=!!room.atlases[atlas];if(baked){m.lightMap=room.atlases[atlas];m.lightMapIntensity=Math.PI;}m.envMap=room.environment.texture;m.envMapIntensity=.85;applyRoomShading(m,room,{baked});const family=m.userData.family;if(m.normalScale)m.normalScale.setScalar(['outdoor-fabric','fabric','charcoal-weave'].includes(family)?.55:['teak','wood'].includes(family)&&id!=='saloon'?.06:.22);
    if(id==='machinery'&&m.normalScale)m.normalScale.setScalar(family==='checker'?.65:family==='paint'?.05:.4);if(id==='saloon'&&family==='wood'&&m.roughness<.6){m.roughness=.14;m.clearcoat=.9;m.clearcoatRoughness=.06;}if(m.userData.visibleEmitter){m.emissive.setRGB(.9,.94,.88);m.emissiveIntensity=id==='machinery'?60:3;}if(m.transparent){m.transmission=0;m.depthWrite=false;m.side=THREE.DoubleSide;}
   }o.castShadow=!(Array.isArray(o.material)?o.material.every(m=>m.transparent):o.material.transparent);o.receiveShadow=true;});if(id==='machinery'){const{Machinery}=await import('./mechanics.js');room.machinery=new Machinery(app,room,mechanics,signal);await room.machinery.load();signal.throwIfAborted();if(meta.filterAppearance)room.machinery.filterWell=new InstalledFilterWell(room.machinery,meta.filterAppearance,{gltf});const params=new URLSearchParams(location.search),query=params.get('engine');for(const side of['port','starboard']){const spec=mechanics.mtu.appearance?.[side];if(engineAllowed(spec,query))room.machinery[side==='port'?'installed':'installedRight']=new InstalledEngine(app,room,{...spec,side},{gltf,exr,pmrem,pool,texture,bytes},signal);}const electrical=meta.electricalAppearance,bulkhead=meta.bulkheadAppearance,profile=appearanceProfile(meta,params),spec=profile==='electrical'?electrical:profile==='bulkhead'?bulkhead:null;if(spec){room.machinery.bulkhead=new InstalledBulkhead(app,room,spec,{gltf,pmrem,texture},signal);const generatorView=['generator-r01','vr-r05'].includes(params.get('electrical'))||params.get('generator')==='vr-r01',preview=generatorView&&spec.generatorPreviewCamera||spec.previewCamera;if(preview)meta.room={...meta.room,spawn:preview.position,look:preview.target};}}return room;
  }catch(error){dispose(room);throw error;}
 }
 return{load,dispose,pool};
}
