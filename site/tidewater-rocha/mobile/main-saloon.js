import { preloadUpper } from './upper-terrace.js?v=guest-access-1';
import { connectTerrace } from './aft-terrace.js?v=guest-access-1';

export const saloonVersion = 'guest-access-1';
const attributes={position:3,normal:3,color:3,aSurface:4};

export function decodeSaloon(manifest, buffer, {version=saloonVersion,names=['exterior','interior'],roomID='MD_R02'}={}) {
  if(manifest.version!==version)throw Error('Actualiza la página para cargar el salón');
  function array(descriptor,Type=Float32Array) {
    if(!descriptor||!Number.isInteger(descriptor.offset)||descriptor.offset<0||descriptor.offset%4||
      !Number.isInteger(descriptor.length)||descriptor.length<=0||descriptor.offset+descriptor.length*4>buffer.byteLength)
      throw Error('Archivo del salón incompleto');
    return new Type(buffer,descriptor.offset,descriptor.length);
  }
  const profiles={};
  for(const name of names) {
    const p=manifest.profiles?.[name];
    if(!p||p.batches.length!==2||p.triangles>25000)throw Error('Perfil del salón inválido');
    const batches=p.batches.map((batch,i)=>{
      if(Boolean(batch.glass)!==Boolean(i))throw Error('Materiales del salón inválidos');
      const attrs=Object.fromEntries(Object.entries(attributes).map(([name,size])=>{
        const d=batch.attributes[name];
        if(d.itemSize!==size)throw Error('Atributos del salón inválidos');
        return [name,array(d)];
      }));
      const count=attrs.position.length/3,indices=array(batch.indices,Uint32Array);
      if(indices.length%3||Object.entries(attributes).some(([name,size])=>attrs[name].length!==count*size)||
        indices.some(i=>i>=count)||Object.values(attrs).some(a=>a.some(v=>!Number.isFinite(v))))throw Error('Geometría del salón inválida');
      return {attributes:attrs,indices};
    });
    const triangles=batches.reduce((n,b)=>n+b.indices.length/3,0);
    if(triangles!==p.triangles)throw Error('Recuento del salón inválido');
    profiles[name]={...p,batches,triangles,geometryBytes:batches.reduce((n,b)=>n+b.indices.byteLength+
      Object.values(b.attributes).reduce((sum,a)=>sum+a.byteLength,0),0)};
  }
  if(!manifest.floor?.length||!manifest.collisionFootprints?.length||manifest.room?.id!==roomID)
    throw Error('Navegación del salón incompleta');
  return {...manifest,profiles};
}

export async function loadSaloon({signal,fetcher=globalThis.fetch.bind(globalThis),timeoutMs=45000}={}) {
  const controller=new AbortController(),abort=()=>controller.abort();
  signal?.addEventListener('abort',abort,{once:true});
  if(signal?.aborted)abort();
  const timer=setTimeout(abort,timeoutMs);
  try {
    const responses=await Promise.all(['json','bin'].map(ext=>fetcher(new URL(`./main-saloon.${ext}?v=${saloonVersion}`,import.meta.url),{signal:controller.signal})));
    if(responses.some(r=>!r.ok))throw Error('No se pudo cargar el salón');
    const [manifest,buffer]=await Promise.all([responses[0].json(),responses[1].arrayBuffer()]);
    return decodeSaloon(manifest,buffer);
  }finally{clearTimeout(timer);signal?.removeEventListener('abort',abort);controller.abort();}
}

export function nextProfile(current, x, deck='MD', stair=null, bowExterior=false, bridgeAccess=false, guestAccess=false) {
  if(stair==='guest')return 'guest';
  if(deck==='SD'||stair==='sun')return 'sun';
  if(stair==='aft'||stair==='bridge')return 'upper';
  if(guestAccess&&['MD','LD'].includes(deck))return 'guest';
  if(deck==='MD'&&bridgeAccess&&(x>17.5||current==='upper'&&x>=17.1))return 'upper';
  if(deck==='UD'){
    if(bowExterior&&(x>13.8||current==='bow'&&x>=12.8))return 'bow';
    return 'upper';
  }
  if(deck!=='MD'||x<8)return 'exterior';
  if(x>9.2)return 'interior';
  return ['upper','sun','bow','guest'].includes(current)?'exterior':current;
}

export function connectSaloon(walk,saloon) {
  const {model,nav}=walk,{boarding,terrace,sternAccess}=model;
  if(model.saloon)return;
  connectTerrace(boarding,terrace,sternAccess.upperFloor,saloon);
  const deckSafe=boarding.safe;
  boarding.safe=(x,y,radius=.14)=>deckSafe(x,y,radius)&&sternAccess.deckClearance(x,y,radius);
  model.saloon=saloon;
  model.asset.data.rooms.push(saloon.room);
  const location=nav.location.bind(nav),nearest=nav.nearest.bind(nav);
  nav.location=()=>nav.deck==='MD'&&!nav.stair&&nav.position[0]>=8.4433?saloon.room:location();
  nav.nearest=(x,y,deck=nav.deck)=>deck==='MD'&&x>=8.4433?saloon.room.spawn.slice(0,2):nearest(x,y,deck);
  if(walk.controls) {
    walk.controls.rooms.push(saloon.room);
    walk.controls.root.querySelector('[data-nav-note]').textContent='Recorre la terraza, el salón y la plataforma de baño por estribor.';
    walk.controls.syncLocation();
    if(walk.controls.open)walk.controls.renderRooms();
  }
}

export function preloadSaloon(app) {
  const model=app.entranceYacht,abort=new AbortController();
  const panel=document.createElement('div');
  panel.className='luz-saloon-load';
  panel.innerHTML='<style>.luz-saloon-load{position:fixed;top:70px;left:50%;transform:translateX(-50%);z-index:70;padding:8px 12px;border-radius:10px;background:#302e29e8;color:#efe9dd;font:13px system-ui;max-width:70vw}.luz-saloon-load[hidden]{display:none}.luz-saloon-load button{font:inherit;padding:7px;margin-left:6px;color:#302e29;background:#efe9dd;border:0;border-radius:5px}</style><span role="status" aria-live="polite"></span><button type="button" hidden>Reintentar</button>';
  const status=panel.querySelector('[role=status]'),retry=panel.querySelector('button');
  document.body.append(panel);
  let pending;
  async function load() {
    if(pending||abort.signal.aborted)return pending;
    status.textContent='Preparando el salón…';retry.hidden=true;panel.hidden=false;
    model.saloonLoadState='loading';
    pending=(async()=>{
      const saloon=await loadSaloon({signal:abort.signal});
      if(abort.signal.aborted)return;
      await app.gangwayRenderer.installProfiles(saloon.profiles);
      if(abort.signal.aborted)return;
      await app.gangwayRenderer.prepareProfiles();
      if(abort.signal.aborted)return;
      connectSaloon(app.yachtWalk,saloon);
      model.saloonLoadState='ready';panel.hidden=true;
      window.dispatchEvent(new Event('luz-de-mar:saloon-ready'));
      await preloadUpper(app);
    })().catch(error=>{
      if(abort.signal.aborted)return;
      model.saloonLoadState='error';status.textContent='No se pudo preparar el salón. Puedes seguir recorriendo el exterior.';retry.hidden=false;
      console.warn('Saloon loading failed',error);
    }).finally(()=>{pending=null;});
    return pending;
  }
  retry.onclick=load;
  model.loadSaloon=load;
  const dispose=model.dispose.bind(model);
  model.dispose=()=>{abort.abort();panel.remove();dispose();};
  return load();
}
