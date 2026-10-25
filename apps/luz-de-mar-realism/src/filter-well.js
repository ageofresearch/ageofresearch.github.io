import {LinearSRGBColorSpace}from'three';
import {assetURL}from'./asset-version.js';import{applyRoomShading}from'./shading.js';import{inRegister}from'./navigation.js';
// One atomic replacement: the extended opening, recessed context and both
// installed housings become active only after all new materials compile.
export class InstalledFilterWell{
 constructor(machinery,spec,deps){Object.assign(this,{machinery,spec,deps});this.app=machinery.app;this.room=machinery.room;this.ready=false;this.committed=false;this.active=false;this.disposed=false;this.loading=false;this.error='';this.ticket=0;this.legacy=[];this.context=[];this.covers=[];
  this.room.root.traverse(o=>{const v=o.userData.variant;if(v==='filter-well-legacy')this.legacy.push(o);if(v==='filter-well-context')this.context.push(o);if(v==='filter-well-register')this.covers.push(o);});
 }
 async load(){if(this.disposed||this.loading||this.ready)return;this.loading=true;this.error='';const ticket=++this.ticket,controller=this.controller=new AbortController();this.notify();let bundle=null;
  try{
   const buffers=await Promise.all([this.spec.asset,this.spec.lightmap.asset].map(async name=>{const r=await fetch(assetURL(this.spec.base+name),{signal:controller.signal});if(!r.ok)throw Error('No se pudo preparar el foso ('+r.status+')');const bytes=await r.arrayBuffer(),h=await crypto.subtle.digest('SHA-256',bytes),expected=name===this.spec.asset?this.spec.sha256:this.spec.lightmap.sha256;if([...new Uint8Array(h)].map(v=>v.toString(16).padStart(2,'0')).join('')!==expected)throw Error('La instalación de filtros no coincide con su versión');return bytes;}));controller.signal.throwIfAborted();
   const model=await this.deps.gltf.parseAsync(buffers[0],new URL(this.spec.base,location.href).href);bundle={root:model.scene,lids:[],textures:new Set(),materials:new Set(),geometries:new Set()};
   bundle.root.traverse(o=>{if(!o.isMesh)return;bundle.geometries.add(o.geometry);for(const m of Array.isArray(o.material)?o.material:[o.material]){bundle.materials.add(m);for(const key of['map','roughnessMap','metalnessMap','normalMap'])if(m[key])bundle.textures.add(m[key]);}});
   const configured=new Set();
   const atlas=await new Promise((resolve,reject)=>this.app.ktx.parse(buffers[1],resolve,reject));atlas.colorSpace=LinearSRGBColorSpace;atlas.channel=1;bundle.textures.add(atlas);
   bundle.root.traverse(o=>{if(!o.isMesh)return;bundle.geometries.add(o.geometry);let owner=o;while(owner&&!owner.userData.wellRole)owner=owner.parent;if(owner?.userData.wellRole==='lid'&&!bundle.lids.some(l=>l.object===owner))bundle.lids.push({object:owner,position:owner.position.clone(),side:owner.userData.wellSide});const ir=o.geometry.getAttribute('_well_irradiance')||o.geometry.getAttribute('_WELL_IRRADIANCE');if(!ir)throw Error('Falta la iluminación del foso');o.geometry.setAttribute('aWellIrradiance',ir);const mode=o.geometry.getAttribute('_well_mode')||o.geometry.getAttribute('_WELL_MODE');if(!mode)throw Error('Falta el modo de iluminación');o.geometry.setAttribute('aWellMode',mode);o.castShadow=true;o.receiveShadow=true;
    for(const m of Array.isArray(o.material)?o.material:[o.material]){if(configured.has(m))continue;configured.add(m);bundle.materials.add(m);for(const key of['map','roughnessMap','metalnessMap','normalMap'])if(m[key])bundle.textures.add(m[key]);m.lightMap=atlas;m.lightMapIntensity=Math.PI;m.envMap=this.room.environment.texture;m.envMapIntensity=.75;applyRoomShading(m,this.room,{baked:true});const before=m.onBeforeCompile,key=m.customProgramCacheKey.bind(m);m.onBeforeCompile=(s,r)=>{before?.(s,r);s.vertexShader='attribute vec3 aWellIrradiance;attribute float aWellMode;varying vec3 vWellIrradiance;varying float vWellMode;\n'+s.vertexShader;s.vertexShader=s.vertexShader.replace('#include <begin_vertex>','#include <begin_vertex>\nvWellIrradiance=aWellIrradiance*128.0;vWellMode=aWellMode;');s.fragmentShader='varying vec3 vWellIrradiance;varying float vWellMode;\n'+s.fragmentShader;s.fragmentShader=s.fragmentShader.replace('vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;','vec3 lightMapIrradiance = mix(lightMapTexel.rgb*lightMapTexel.a*128.0,vWellIrradiance,vWellMode) * lightMapIntensity;');s.fragmentShader=s.fragmentShader.replace('#include <lights_fragment_end>','#include <lights_fragment_end>\nreflectedLight.directDiffuse=vec3(0.);');};m.customProgramCacheKey=()=>key()+'-filter-well-cycles-r01';}
   });
   this.room.root.add(bundle.root);bundle.root.visible=false;await this.app.renderer.compileAsync(bundle.root,this.app.camera,this.app.scene);controller.signal.throwIfAborted();if(this.disposed||ticket!==this.ticket){this.release(bundle);return;}this.bundle=bundle;this.ready=true;this.update();
  }catch(e){if(bundle&&this.bundle!==bundle)this.release(bundle);if(e.name!=='AbortError'&&!this.disposed)this.error=e.message;}
  finally{if(ticket===this.ticket){this.loading=false;this.notify();}}
 }
 update(){if(!this.active||!this.ready||this.committed||this.disposed)return;const m=this.machinery;if(m.filters.accessOpen&&inRegister(...this.app.nav.position,.14,this.spec.register))return;
  this.committed=true;for(const o of this.legacy)o.visible=false;for(const o of this.context)o.visible=true;this.nav=this.app.nav.isolated.get('machinery');this.previousRegister=this.nav.register;this.nav.register=this.spec.register;this.bundle.root.visible=true;m.sync();this.notify();
 }
 sync(){if(!this.committed)return;const f=this.machinery.filters;for(const o of this.covers)o.visible=!f.accessOpen;const frame=f.progress*120,a=Math.floor(frame),b=Math.min(120,a+1),t=frame-a,motion=this.machinery.filterMotion;const p=motion?motion.samples[a].lid.map((v,k)=>v+(motion.samples[b].lid[k]-v)*t):[0,0,0];
  for(const lid of this.bundle.lids){lid.object.position.copy(lid.position);if(f.accessOpen&&f.selected===lid.side)lid.object.position.add({x:p[1],y:p[2],z:p[0]});}
 }
 setActive(value){this.active=value;if(value){if(this.ready)this.update();else if(!this.loading&&!this.error)void this.load();return;}
  this.ticket++;this.controller?.abort();this.loading=false;if(this.committed){for(const o of this.legacy)o.visible=true;for(const o of[...this.context,...this.covers])o.visible=false;if(this.nav)this.nav.register=this.previousRegister;}this.committed=false;if(this.bundle)this.release(this.bundle);this.bundle=null;this.ready=false;this.machinery.sync();
 }
 notify(){if(this.disposed)return;this.app.syncUI();this.app.invalidate(false,true);}
 retry(){this.error='';return this.load();}
 release(b){b.root.removeFromParent();for(const g of b.geometries)g.dispose();for(const m of b.materials){this.room.probeBindings?.delete(m);m.dispose();}for(const t of b.textures)t.dispose();}
 dispose(){this.setActive(false);this.disposed=true;}
 get stats(){return{waitingForSafePosition:this.active&&this.ready&&!this.committed,ready:this.ready,loading:this.loading,committed:this.committed,error:this.error,version:this.spec.id,register:this.committed?this.spec.register:null};}
}
