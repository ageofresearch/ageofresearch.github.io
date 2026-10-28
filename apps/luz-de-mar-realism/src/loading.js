import {assetURL} from './asset-version.js';

export const engineAllowed=(spec,query)=>!!spec&&(!spec.previewQuery||query===spec.previewQuery||spec.previewAliases?.includes(query));
export function appearanceProfile(meta,params){
 const e=meta.electricalAppearance||meta.electrical,b=meta.bulkheadAppearance||meta.bulkhead;
 if(e&&(e.promoted||['vr-r01','vr-r02','lower-r02','vr-r03','clearance-r03','vr-r04','no-stairs-r04','vr-r05','generator-r01'].includes(params.get('electrical'))||params.get('generator')==='vr-r01'))return'electrical';
 return b&&(b.promoted||params.get('bulkhead')==='vr-r01')?'bulkhead':null;
}
export function entryResources(inventory,id,params=new URLSearchParams(),bootstrap=false){
 const groups=[...(bootstrap?['bootstrap']:[]),'decoders','room/'+id];
 if(id==='machinery'){
  groups.push('machinery-native','selection');for(const[side,s]of Object.entries(inventory.choices.engines))if(engineAllowed(s,params.get('engine')))groups.push('engine/'+side);
  const profile=appearanceProfile(inventory.choices,params);if(profile)groups.push(profile);if(inventory.choices.well)groups.push('well');
 }
 const paths=new Map();for(const g of groups)for(const p of inventory.groups[g]||[])paths.set(p,paths.get(p)||inventory.labels[g]);
 if(id==='machinery')for(const p of [...paths.keys()])if(inventory.sidecars[p])paths.set(inventory.sidecars[p],'Identidad de equipos');
 return [...paths].map(([path,label])=>({path,label,...inventory.files[path]}));
}
const aborted=()=>new DOMException('Carga cancelada','AbortError');
const digest=async b=>[...new Uint8Array(await crypto.subtle.digest('SHA-256',b))].map(n=>n.toString(16).padStart(2,'0')).join('');
export class LoadSession{
 constructor(service,id,resources,{label=id,signal=null,presentationRequired=false}={}){
  Object.assign(this,{service,id,label,presentationRequired});this.presentationReady=false;this.controller=new AbortController();this.signal=this.controller.signal;this.phase='download';this.message='Descargando recursos…';this.error='';this.records=new Map(resources.map(r=>[service.key(r.path),{...r,loaded:0,done:false,buffer:null,promise:null,url:null}]));this.holds=0;this.released=false;this.peakBufferedBytes=0;
  this.externalSignal=signal;this.onAbort=()=>this.cancel();signal?.addEventListener('abort',this.onAbort,{once:true});if(signal?.aborted)this.cancel();
 }
 notify(){this.service.changed(this);}
 setPhase(phase,message){if(['error','cancelled','ready'].includes(this.phase))return;this.phase=phase;this.message=message;this.notify();}
 async bytes(path,signal){
  signal?.throwIfAborted();this.signal.throwIfAborted();const r=this.records.get(this.service.key(path));if(!r)throw Error('Dependencia no registrada: '+path);if(r.buffer)return r.buffer;if(r.promise)return r.promise;
  r.promise=(async()=>{try{
   const response=await this.service.transport(assetURL(r.path),{signal:this.signal});if(!response.ok)throw Error(r.label+': no se pudo descargar un recurso ('+response.status+')');
   const reader=response.body?.getReader(),chunks=[];let count=0;
   if(reader){try{while(true){this.signal.throwIfAborted();const{done,value}=await reader.read();if(done)break;chunks.push(value);count+=value.length;r.loaded=count;this.notify();}}finally{reader.releaseLock();}}
   else{const b=new Uint8Array(await response.arrayBuffer());chunks.push(b);count=b.length;r.loaded=count;this.notify();}
   this.signal.throwIfAborted();if(count!==r.bytes)throw Error(r.label+': el recurso está incompleto');const bytes=new Uint8Array(count);let offset=0;for(const b of chunks){bytes.set(b,offset);offset+=b.length;}
   if(await digest(bytes)!==r.sha256)throw Error(r.label+': el recurso no coincide con su versión');this.signal.throwIfAborted();r.buffer=bytes.buffer;r.done=true;this.peakBufferedBytes=Math.max(this.peakBufferedBytes,this.bufferedBytes);this.notify();return r.buffer;
  }catch(e){if(e.name!=='AbortError')this.fail(e);throw e;}finally{r.promise=null;}})();return r.promise;
 }
 async json(path,signal){return JSON.parse(new TextDecoder().decode(await this.bytes(path,signal)));}
 async prefetch(){
  const queue=[...this.records.values()].filter(r=>!r.done);let next=0,failure;
  await Promise.allSettled(Array.from({length:Math.min(6,queue.length)},async()=>{while(next<queue.length&&!failure){const r=queue[next++];try{await this.bytes(r.path);}catch(e){failure??=e;}}}));
  if(this.phase==='error')throw Error(this.error);if(failure)throw failure;this.signal.throwIfAborted();
 }
 resolve(path){const r=this.records.get(this.service.key(path));if(!r?.buffer)throw Error('Recurso gráfico no preparado: '+path);return r.url??=URL.createObjectURL(new Blob([r.buffer]));}
 async hold(fn){this.holds++;try{return await fn();}finally{this.holds--;if(this.released)this.release();}}
 fail(error){if(this.phase==='cancelled')return;this.phase='error';this.error=error.message;this.message=error.message;this.controller.abort();this.notify();}
 complete(){this.signal.throwIfAborted();if([...this.records.values()].some(r=>!r.done))throw Error('Quedan recursos por preparar');if(this.presentationRequired&&!this.presentationReady)throw Error('La imagen final todavía no está preparada');this.phase='ready';this.message='Listo';this.notify();this.release();}
 cancel(){if(this.phase!=='ready')this.phase='cancelled';this.controller.abort();this.release();this.notify();}
 release(){this.released=true;if(this.holds)return;for(const r of this.records.values()){if(r.url)URL.revokeObjectURL(r.url);r.url=null;r.buffer=null;}this.externalSignal?.removeEventListener('abort',this.onAbort);}
 get bufferedBytes(){return [...this.records.values()].reduce((n,r)=>n+(r.buffer?.byteLength||0),0);}
 get stats(){const rs=[...this.records.values()];return{id:this.id,label:this.label,phase:this.phase,message:this.message,error:this.error,presentationReady:this.presentationReady,bytes:rs.reduce((n,r)=>n+r.loaded,0),totalBytes:rs.reduce((n,r)=>n+r.bytes,0),files:rs.filter(r=>r.done).length,totalFiles:rs.length,pending:rs.filter(r=>!r.done).map(r=>r.path),bufferedBytes:this.bufferedBytes,peakBufferedBytes:this.peakBufferedBytes};}
}
export class AssetService{
 constructor({inventory,base=location.href,onChange=()=>{},transport=globalThis.fetch.bind(globalThis)}={}){Object.assign(this,{inventory,base,onChange,transport});this.current=null;this.last=null;this.operations=new Map();this.serial=0;}
 key(path){const u=new URL(path,this.base);u.search='';u.hash='';return u.href;}
 changed(s){this.onChange(s);}
 begin(id,params,bootstrap=false){
  const previous=this.current,reusable=previous?.phase==='error'?new Map([...previous.records].filter(([,r])=>r.done&&r.buffer).map(([k,r])=>[k,r.buffer])):new Map();previous?.cancel();const s=new LoadSession(this,'entry-'+(++this.serial),entryResources(this.inventory,id,params,bootstrap),{label:this.inventory.rooms[id],presentationRequired:true});
  // Valid payloads remain usable after a failed preparation, without a second download.
  for(const[k,r]of s.records)if(reusable.has(k)){r.buffer=reusable.get(k);r.loaded=r.bytes;r.done=true;}
  s.peakBufferedBytes=s.bufferedBytes;this.current=s;this.last=s;this.changed(s);return s;
 }
 async bytes(path,signal){signal?.throwIfAborted();if(this.current&&!['ready','cancelled'].includes(this.current.phase))return this.current.bytes(path,signal);const r=await this.transport(assetURL(path),{signal});if(!r.ok)throw Error('No se pudo descargar el recurso ('+r.status+')');return r.arrayBuffer();}
 async json(path,signal){return JSON.parse(new TextDecoder().decode(await this.bytes(path,signal)));}
 resolveURL(path){if(/^(blob:|data:)/.test(path))return path;const s=this.current;if(s&&!['ready','cancelled'].includes(s.phase))return s.resolve(path);return path;}
 async parse(fn){const s=this.current;return s&&!['ready','cancelled'].includes(s.phase)?s.hold(fn):fn();}
 finish(s){s.complete();if(this.current===s)this.current=null;}
 operation(kind,signal){const old=this.operations.get(kind);old?.cancel();const group='inspection/'+kind,resources=(this.inventory.groups[group]||[]).map(path=>({path,label:this.inventory.labels[group],...this.inventory.files[path]})),s=new LoadSession(this,group,resources,{label:this.inventory.labels[group],signal});this.operations.set(kind,s);return s;}
}
export function displayLoading(session){
 const s=session.stats,$=id=>document.getElementById(id),meter=$('loading-meter'),box=$('loading-progress');$('loading-title').textContent='Abriendo '+s.label.toLowerCase();$('loading-detail').textContent=s.message;
 box.hidden=!s.totalFiles||s.phase==='startup';meter.max=s.totalBytes||1;meter.value=Math.min(s.bytes,s.totalBytes);$('loading-counts').textContent=`Descarga: ${s.totalBytes?Math.floor(Math.min(1,s.bytes/s.totalBytes)*100):0} % · ${(s.bytes/1048576).toFixed(1)} / ${(s.totalBytes/1048576).toFixed(1)} MB · ${s.files} / ${s.totalFiles} archivos`;$('loading-activity').hidden=['error','ready'].includes(s.phase);$('retry').hidden=s.phase!=='error';if(s.phase==='error')$('loading-title').textContent='No se pudo completar la carga';
}
export function waitVisible(signal){if(!document.hidden)return Promise.resolve();return new Promise((resolve,reject)=>{const done=()=>{if(!document.hidden){cleanup();resolve();}},cancel=()=>{cleanup();reject(aborted());},cleanup=()=>{document.removeEventListener('visibilitychange',done);signal?.removeEventListener('abort',cancel);};document.addEventListener('visibilitychange',done);signal?.addEventListener('abort',cancel,{once:true});if(signal?.aborted)cancel();});}
export function finishGpu(renderer,signal){
 const gl=renderer.getContext(),sync=gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE,0);if(!sync)return Promise.reject(Error('No se pudo finalizar la imagen'));gl.flush();
 return new Promise((resolve,reject)=>{const check=()=>{if(signal?.aborted||gl.isContextLost()){gl.deleteSync(sync);reject(aborted());return;}const result=gl.clientWaitSync(sync,0,0);if(result===gl.WAIT_FAILED){gl.deleteSync(sync);reject(Error('No se pudo preparar la imagen'));}else if(result===gl.TIMEOUT_EXPIRED)setTimeout(check,16);else{gl.deleteSync(sync);resolve();}};check();});
}
