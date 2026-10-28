import {BufferAttribute,WebGLRenderTarget,RGBAFormat,UnsignedByteType,NearestFilter,NoBlending,Color,Vector4} from 'three';
import {assetURL} from './asset-version.js';
export const SELECTION_COLOR=[50/255,230/255,90/255];
export const SELECTION_OPACITY=.35;
export function pointerTravel(start,x,y){return Math.hypot(x-start[0],y-start[1]);}
export function decodeSelectionPixel(pixel){return pixel[0]+pixel[1]*256+pixel[2]*65536;}
export function selectionShader(shader,uniforms){
 if(shader.vertexShader.includes('varying float vEquipmentId;'))return;
 shader.uniforms.uEquipmentSelected=uniforms.selected;shader.uniforms.uEquipmentPick=uniforms.pick;
 shader.vertexShader='attribute float aEquipmentId;varying float vEquipmentId;\n'+shader.vertexShader;
 shader.vertexShader=shader.vertexShader.replace('#include <begin_vertex>','#include <begin_vertex>\nvEquipmentId=aEquipmentId;');
 shader.fragmentShader='uniform float uEquipmentSelected;uniform float uEquipmentPick;varying float vEquipmentId;\n'+shader.fragmentShader;
 const picking=`if(uEquipmentPick>.5){float equipment=floor(vEquipmentId+.5);if(uEquipmentPick>1.5){gl_FragColor=vec4(vec3(abs(equipment-uEquipmentSelected)<.25&&uEquipmentSelected>.5?1.:0.),1.);}else{gl_FragColor=vec4(mod(equipment,256.)/255.,mod(floor(equipment/256.),256.)/255.,floor(equipment/65536.)/255.,1.);}return;}`;
 if(shader.fragmentShader.includes('#include <alphatest_fragment>'))shader.fragmentShader=shader.fragmentShader.replace('#include <alphatest_fragment>','#include <alphatest_fragment>\n'+picking);
 else shader.fragmentShader=shader.fragmentShader.replace(/void main\(\)\s*\{/,match=>match+picking);
 const end=shader.fragmentShader.lastIndexOf('}');
 shader.fragmentShader=shader.fragmentShader.slice(0,end)+`if(uEquipmentSelected>.5&&abs(vEquipmentId-uEquipmentSelected)<.25){gl_FragColor.rgb=mix(gl_FragColor.rgb,vec3(${SELECTION_COLOR.join(',')}),${SELECTION_OPACITY});}`+shader.fragmentShader.slice(end);
}
export class EquipmentSelection{
 constructor(app){this.app=app;this.enabled=new URLSearchParams(location.search).get('selection')==='equipment-r01';this.uniforms={selected:{value:0},pick:{value:0}};this.catalog=null;this.maps=new Map();this.materials=new WeakMap();this.prepared=new WeakSet();this.pending=new Set();this.errors=[];this.pickPasses=0;this.disposers=[];this.activePointers=new Set();this.gesture=null;this.request=0;
  const canvas=app.renderer.domElement,on=(el,name,fn)=>{el.addEventListener(name,fn);this.disposers.push(()=>el.removeEventListener(name,fn));};
  on(canvas,'pointerdown',e=>{this.activePointers.add(e.pointerId);if(this.activePointers.size!==1){if(this.gesture)this.gesture.cancelled=true;return;}if(!e.isPrimary||e.button!==0||app.room?.id!=='machinery'||app.loading||!this.enabled)return;this.gesture={pointer:e.pointerId,start:[e.clientX,e.clientY],max:0,cancelled:false};});
  on(canvas,'pointermove',e=>{const g=this.gesture;if(g&&g.pointer===e.pointerId)g.max=Math.max(g.max,pointerTravel(g.start,e.clientX,e.clientY));});
  on(canvas,'pointerup',e=>{this.activePointers.delete(e.pointerId);const g=this.gesture;if(!g||g.pointer!==e.pointerId)return;this.gesture=null;if(!g.cancelled&&Math.max(g.max,pointerTravel(g.start,e.clientX,e.clientY))<=5&&!app.deckMap?.open)void this.pick(e.clientX,e.clientY);});
  for(const name of ['pointercancel','lostpointercapture'])on(canvas,name,e=>{this.activePointers.delete(e.pointerId);if(this.gesture?.pointer===e.pointerId)this.gesture=null;});
  on(window,'blur',()=>{this.gesture=null;this.activePointers.clear();});
  on(window,'keydown',e=>{if(e.key==='Escape')this.clear();});
 }
 async load(){if(this.catalog)return this.catalog;if(this.catalogPromise)return this.catalogPromise;return this.catalogPromise=(async()=>{let c;if(this.app?.assets)c=await this.app.assets.json('./assets/selection-r01/catalog.json');else{const r=await fetch(assetURL('./assets/selection-r01/catalog.json'));if(!r.ok)throw Error('No se pudo cargar la selección de equipos');c=await r.json();}if(c.version!=='equipment-r01'||!Array.isArray(c.objects)||!c.assets)throw Error('Catálogo de selección incompatible');this.catalog=c;this.enabled||=c.promoted===true;return c;})().catch(e=>{this.errors.push(e.message);this.catalogPromise=null;return null;});}
 async tag(model,bytes){const c=await this.load();if(!c)return;const hash=[...new Uint8Array(await crypto.subtle.digest('SHA-256',bytes))].map(v=>v.toString(16).padStart(2,'0')).join('');const spec=c.assets[hash];if(!spec)return;
  try{let map=this.maps.get(hash);if(!map){let data;if(this.app?.assets)data=await this.app.assets.bytes('./assets/selection-r01/'+spec.asset);else{const r=await fetch(assetURL('./assets/selection-r01/'+spec.asset));if(!r.ok)throw Error('No se pudo descargar la identidad de equipos');data=await r.arrayBuffer();}const digest=[...new Uint8Array(await crypto.subtle.digest('SHA-256',data))].map(v=>v.toString(16).padStart(2,'0')).join('');if(digest!==spec.sha256)throw Error('La identidad de equipos no coincide con su versión');map=JSON.parse(await new Response(new Blob([data]).stream().pipeThrough(new DecompressionStream('gzip'))).text());this.maps.set(hash,map);}
   const meshes=[];model.scene.traverse(o=>{if(o.isMesh)meshes.push(o);});
   for(const mesh of meshes){const assoc=model.parser.associations.get(mesh);if(assoc?.meshes===undefined)continue;const record=map.primitives.find(p=>p.mesh===assoc.meshes&&p.primitive===(assoc.primitives??0));if(!record)throw Error('Falta identidad de una superficie');const geometry=mesh.geometry,indices=geometry.index?.array;if(!indices||record.triangles!==indices.length/3)throw Error('Triangulación de selección incompatible');
    const ids=new Uint16Array(geometry.attributes.position.count);const assigned=new Uint8Array(ids.length);let offset=0;
    for(const [count,id]of record.runs){if(!Number.isInteger(count)||count<1||!Number.isInteger(id)||id<0||id>65535)throw Error('Identidad inválida');for(let t=0;t<count;t++){for(let k=0;k<3;k++){const v=indices[offset++];if(assigned[v]&&ids[v]!==id)throw Error('Vértice compartido entre equipos: requiere separación de autoría');assigned[v]=1;ids[v]=id;}}}
    if(offset!==indices.length)throw Error('Identidad de selección incompleta');geometry.setAttribute('aEquipmentId',new BufferAttribute(ids,1));mesh.userData.selectionBinding=hash;
   }
  }catch(e){model.scene.userData.selectionError=e.message;this.errors.push(e.message);console.warn('Selección no disponible:',e.message);model.scene.traverse(o=>{if(o.isMesh)o.geometry.deleteAttribute('aEquipmentId');});}
 }
 native(geometry,asset,kind,side,predicate=null){const c=this.catalog;if(!c)return;const key=kind+'-'+side;const bindings=c.native[key];if(!bindings)return;const ids=new Uint16Array(geometry.attributes.position.count);const assigned=new Uint8Array(ids.length);let offset=0;
  for(const part of asset.meta.parts){if(predicate&&!predicate(part))continue;const id=bindings[part.name]||0;for(let i=0;i<part.count;i++){const v=geometry.index.array[offset++];if(assigned[v]&&ids[v]!==id)throw Error('Identidad nativa ambigua');assigned[v]=1;ids[v]=id;}}
  if(offset!==geometry.index.count)throw Error('Identidad nativa incompleta');const current=geometry.getAttribute('aEquipmentId');if(current&&current.count===ids.length){current.array.set(ids);current.needsUpdate=true;}else geometry.setAttribute('aEquipmentId',new BufferAttribute(ids,1));
 }
 prepare(root=this.app.room?.root){if(this.app.room?.id!=='machinery'&&!root?.userData.selectionMachinery)return;root?.traverse(o=>{if(!o.isMesh)return;const g=o.geometry;if(!g.attributes.aEquipmentId)g.setAttribute('aEquipmentId',new BufferAttribute(new Uint16Array(g.attributes.position.count),1));
   for(const m of Array.isArray(o.material)?o.material:[o.material]){const old=this.materials.get(m);if(old?.wrapper===m.onBeforeCompile)continue;const before=m.onBeforeCompile,key=m.customProgramCacheKey.bind(m),uniforms=this.uniforms;const wrapper=(shader,r)=>{before?.(shader,r);selectionShader(shader,uniforms);};m.onBeforeCompile=wrapper;m.customProgramCacheKey=()=>key()+'-equipment-selection-r01';m.needsUpdate=true;this.materials.set(m,{wrapper});}
  });}
 set(id){if(id&&!this.enabled)return false;const value=typeof id==='string'?this.catalog?.objects.find(o=>o.selectableId===id)?.value:id;if(value&& !this.catalog?.objects.some(o=>o.value===value))return false;this.uniforms.selected.value=value||0;this.app.invalidate();return true;}
 clear(){this.request++;if(this.uniforms.selected.value){this.uniforms.selected.value=0;this.app.invalidate();}}
 async pick(x,y){const ticket=++this.request;if(this.app.room?.id!=='machinery'||this.app.loading)return 0;await this.load();if(!this.enabled||ticket!==this.request)return 0;const value=this.read(x,y);if(ticket===this.request)this.set(value===this.uniforms.selected.value?0:value);return value;}
 read(x,y){const a=this.app,r=a.renderer,rect=r.domElement.getBoundingClientRect();if(x<rect.left||y<rect.top||x>=rect.right||y>=rect.bottom)return 0;this.prepare();
  this.target??=new WebGLRenderTarget(1,1,{format:RGBAFormat,type:UnsignedByteType,minFilter:NearestFilter,magFilter:NearestFilter,depthBuffer:true,stencilBuffer:false});
  const camera=a.camera.clone(),width=r.domElement.width,height=r.domElement.height;camera.setViewOffset(width,height,Math.floor((x-rect.left)/rect.width*width),Math.floor((y-rect.top)/rect.height*height),1,1);camera.updateMatrixWorld();
  return this.pass(this.target,camera,1);
 }
 ids(){const r=this.app.renderer,target=new WebGLRenderTarget(r.domElement.width,r.domElement.height,{format:RGBAFormat,type:UnsignedByteType,depthBuffer:true});try{return this.pass(target,this.app.camera,1,true);}finally{target.dispose();}}
 mask(value){const r=this.app.renderer,target=new WebGLRenderTarget(r.domElement.width,r.domElement.height,{format:RGBAFormat,type:UnsignedByteType,depthBuffer:true});target.samples=Math.min(r.capabilities.maxSamples,r.getContext().getParameter(r.getContext().SAMPLES)||4);const selected=this.uniforms.selected.value;try{this.uniforms.selected.value=value;return this.pass(target,this.app.camera,2,true);}finally{this.uniforms.selected.value=selected;target.dispose();}}
 pass(destination,camera,mode,full=false){const a=this.app,r=a.renderer;this.prepare();const target=r.getRenderTarget(),clear=r.getClearColor(new Color()),alpha=r.getClearAlpha(),viewport=r.getViewport(new Vector4()),scissor=r.getScissor(new Vector4()),scissorTest=r.getScissorTest(),background=a.scene.background,auto=r.autoClear,shadow=r.shadowMap.needsUpdate;const saved=new Map();const pixel=new Uint8Array(destination.width*destination.height*4);
  try{a.room.root.traverse(o=>{if(!o.isMesh)return;for(const m of Array.isArray(o.material)?o.material:[o.material])if(!saved.has(m)){saved.set(m,{blending:m.blending,depthWrite:m.depthWrite});m.blending=NoBlending;m.depthWrite=true;}});this.uniforms.pick.value=mode;a.scene.background=null;r.shadowMap.needsUpdate=false;r.setRenderTarget(destination);r.setScissorTest(false);r.setClearColor(0,1);r.autoClear=true;r.render(a.scene,camera);r.readRenderTargetPixels(destination,0,0,destination.width,destination.height,pixel);if(mode===1)this.pickPasses++;
  }finally{this.uniforms.pick.value=0;for(const[m,s]of saved)Object.assign(m,s);a.scene.background=background;r.shadowMap.needsUpdate=shadow;r.setRenderTarget(target);r.setViewport(viewport);r.setScissor(scissor);r.setScissorTest(scissorTest);r.setClearColor(clear,alpha);r.autoClear=auto;}
  return full?pixel:decodeSelectionPixel(pixel);
 }
 leave(){this.clear();this.gesture=null;this.activePointers.clear();this.target?.dispose();this.target=null;this.maps.clear();}
 dispose(){this.leave();for(const d of this.disposers)d();this.disposers=[];}
 get stats(){return {enabled:this.enabled,selected:this.catalog?.objects.find(o=>o.value===this.uniforms.selected.value)?.selectableId||null,pickPasses:this.pickPasses,errors:[...this.errors],catalogCount:this.catalog?.objects.length||0,targetBytes:this.target?8:0};}
}
