import {preloadBow} from './bow-deck.js?v=bow-deck-1';
import {decodeSaloon} from './main-saloon.js?v=bow-deck-1';
import {bridgeRoom,prepareBridgeFloor} from './bridge-geometry.js?v=bow-deck-1';

export const bridgeVersion='bow-deck-1';
export function decodeBridge(manifest,buffer) {
  const result=decodeSaloon(manifest,buffer,{version:bridgeVersion,names:['exterior','interior','upper','sun'],roomID:'UD_R03'});
  const polygon=p=>Array.isArray(p)&&p.length>=3&&p.every(v=>Array.isArray(v)&&v.length===2&&v.every(Number.isFinite));
  if(!result.domains?.length||!result.domains.every(polygon)||!result.floor.every(polygon)||
    !result.collisionFootprints.every(p=>polygon(p.polygon))||!result.bridgePartIDs?.length)
    throw Error('Puente de mando incompleto');
  return result;
}
export async function loadBridge({signal,fetcher=globalThis.fetch.bind(globalThis),timeoutMs=45000}={}) {
  const controller=new AbortController(),abort=()=>controller.abort();
  signal?.addEventListener('abort',abort,{once:true});if(signal?.aborted)abort();const timer=setTimeout(abort,timeoutMs);
  try {
    const responses=await Promise.all(['json','bin'].map(ext=>fetcher(new URL(`./bridge-helm.${ext}?v=${bridgeVersion}`,import.meta.url),{signal:controller.signal})));
    if(responses.some(r=>!r.ok))throw Error('No se pudo cargar el puente de mando');
    const [manifest,buffer]=await Promise.all([responses[0].json(),responses[1].arrayBuffer()]);return decodeBridge(manifest,buffer);
  }finally{clearTimeout(timer);signal?.removeEventListener('abort',abort);controller.abort();}
}
export function prepareBridge(interior) {
  const prepared={...interior,...prepareBridgeFloor(interior)};
  if(!prepared.mobileSafe(...bridgeRoom.spawn.slice(0,2))||!prepared.mobileSafe(19.6,1.7))
    throw Error('El acceso al puente de mando está bloqueado');
  return prepared;
}
export function connectBridge(walk,prepared) {
  const {model,nav}=walk;if(model.bridge)return;
  if(!model.upperInterior)throw Error('El interior superior debe estar preparado');
  const interior=prepared.mobileSafe?prepared:prepareBridge(prepared);
  const floor=nav.floorSafe.bind(nav),location=nav.location.bind(nav),nearest=nav.nearest.bind(nav);
  nav.floorSafe=(x,y,deck=nav.deck)=>deck==='UD'?(interior.mobileSafe(x,y,nav.radius)||floor(x,y,deck)):floor(x,y,deck);
  nav.location=()=>nav.deck==='UD'&&!nav.stair&&nav.position[0]>=18.71233?interior.room:location();
  nav.nearest=(x,y,deck=nav.deck)=>deck==='UD'&&x>=18.71233?interior.room.spawn.slice(0,2):nearest(x,y,deck);
  model.bridge=interior;model.asset.data.rooms.push(interior.room);
  if(walk.controls) {
    const controls=walk.controls,notice=walk.doc.createElement('div');
    notice.className='luz-bridge-helm-limit';notice.hidden=true;notice.setAttribute('role','status');
    notice.textContent='Escalera interior y proa · Continuación pendiente';
    notice.style.cssText='position:fixed;left:50%;bottom:24px;transform:translateX(-50%);padding:8px 12px;border-radius:10px;background:#302e29e8;color:#efe9dd;font:13px system-ui;text-align:center;pointer-events:none;max-width:55vw';
    controls.hud.appendChild(notice);
    const sync=controls.syncLocation.bind(controls);
    controls.syncLocation=()=>{
      sync();const label=model.bow?'Escalera interior · Continuación pendiente':'Escalera interior y proa · Continuación pendiente';
      if(notice.textContent!==label)notice.textContent=label;
      const hidden=!walk.active||controls.open||nav.deck!=='UD'||!!nav.stair||!(nav.position[0]<19.8&&nav.position[0]>18.7&&nav.position[1]<-.9||!model.bow&&nav.position[0]>21.4);
      if(notice.hidden!==hidden)notice.hidden=hidden;
    };
    controls.rooms.push(interior.room);
    controls.root.querySelector('[data-nav-note]').textContent='Puedes entrar al puente por el paso de babor. La proa visible y la escalera interior siguen fuera del recorrido móvil.';
    controls.syncLocation();if(controls.open)controls.renderRooms();
  }
}
export function restoreBridgeHandoff(walk,state) {
  const nav=walk.nav;nav.deck='UD';nav.stair=null;
  nav.position=state.deck==='UD'&&!state.stair&&nav.floorSafe(...state.position,'UD')?state.position.slice():bridgeRoom.spawn.slice(0,2);
  if(!nav.floorSafe(...nav.position,'UD'))throw Error('No hay un punto seguro en el puente de mando');
  nav.elevation=6;nav.room=nav.location();walk.cameraElevation=6;walk.applyPosition();
}
export function preloadBridge(app) {
  const model=app.entranceYacht;if(model.loadBridge)return;
  const abort=new AbortController(),panel=document.createElement('div');panel.className='luz-saloon-load luz-bridge-helm-load';
  panel.innerHTML='<span role="status" aria-live="polite"></span><button type="button" hidden>Reintentar</button>';document.body.append(panel);
  const status=panel.querySelector('span'),retry=panel.querySelector('button');let pending;
  async function load() {
    if(pending||abort.signal.aborted||model.bridgeLoadState==='ready')return pending;
    const resume=app.engine._running===true,loader=document.getElementById('loader');
    if(resume){app.engine.stop();loader.hidden=false;loader.style.display='';}
    const oldStatus=loader?.querySelector('.loader-status')?.textContent;
    if(loader?.querySelector('.loader-status'))loader.querySelector('.loader-status').textContent='Preparando el puente de mando…';
    model.bridgeLoadState='loading';panel.hidden=false;retry.hidden=true;status.textContent='Preparando el puente de mando…';
    pending=(async()=>{
      const interior=prepareBridge(await loadBridge({signal:abort.signal}));if(abort.signal.aborted)return;
      await app.gangwayRenderer.installProfiles(interior.profiles,{prepare:true,activate:()=>{
        if(abort.signal.aborted)throw Error('Carga cancelada');connectBridge(app.yachtWalk,interior);
      }});
      model.bridgeLoadState='ready';panel.hidden=true;window.dispatchEvent(new Event('luz-de-mar:bridge-helm-ready'));
      await preloadBow(app);
    })().catch(error=>{
      if(abort.signal.aborted)return;model.bridgeLoadState='error';status.textContent='No se pudo preparar el puente de mando. El recorrido anterior sigue disponible.';retry.hidden=false;
      console.warn('Bridge loading failed',error);
    }).finally(()=>{
      pending=null;
      if(!abort.signal.aborted&&resume){loader.hidden=true;loader.style.display='none';
        app.input.keys.clear();app.input.pressed.clear();app.input.look.x=app.input.look.y=0;
        app.yachtWalk.controls?.joystick?.reset?.();app.engine.start(dt=>app.frame(dt));}
      if(loader?.querySelector('.loader-status'))loader.querySelector('.loader-status').textContent=oldStatus;
    });return pending;
  }
  retry.onclick=load;model.loadBridge=load;const dispose=model.dispose.bind(model);
  model.dispose=()=>{abort.abort();panel.remove();dispose();};return load();
}
