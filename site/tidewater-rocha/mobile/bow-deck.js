import {preloadBridgeAccess} from './bridge-access.js?v=port-guest-1';
import {decodeSaloon} from './main-saloon.js?v=port-guest-1';
import {bowRoom,bowRoute,prepareBowFloor} from './bow-geometry.js?v=port-guest-1';

export const bowVersion='main-deck-stability-1';
export function decodeBow(manifest,buffer) {
  const result=decodeSaloon(manifest,buffer,{version:bowVersion,names:['exterior','upper','sun','bow'],roomID:'UD_R04'});
  const polygon=p=>Array.isArray(p)&&p.length>=3&&p.every(v=>Array.isArray(v)&&v.length===2&&v.every(Number.isFinite));
  if(!result.domains?.length||!result.domains.every(polygon)||!result.floor.every(polygon)||
    !result.collisionFootprints.every(p=>polygon(p.polygon))||!result.bowPartIDs?.length)
    throw Error('Estar de proa incompleto');
  return result;
}
export async function loadBow({signal,fetcher=globalThis.fetch.bind(globalThis),timeoutMs=45000}={}) {
  const controller=new AbortController(),abort=()=>controller.abort();
  signal?.addEventListener('abort',abort,{once:true});if(signal?.aborted)abort();const timer=setTimeout(abort,timeoutMs);
  try {
    const responses=await Promise.all(['json','bin'].map(ext=>fetcher(new URL(`./bow-deck.${ext}?v=${bowVersion}`,import.meta.url),{signal:controller.signal})));
    if(responses.some(r=>!r.ok))throw Error('No se pudo cargar el estar de proa');
    const [manifest,buffer]=await Promise.all([responses[0].json(),responses[1].arrayBuffer()]);return decodeBow(manifest,buffer);
  }finally{clearTimeout(timer);signal?.removeEventListener('abort',abort);controller.abort();}
}
export function prepareBow(zone) {
  const prepared={...zone,...prepareBowFloor(zone)};
  if(!prepared.mobileSafe(...bowRoom.spawn.slice(0,2))||bowRoute.some(p=>!prepared.mobileSafe(...p)))
    throw Error('El acceso al estar de proa está bloqueado');
  return prepared;
}
export function connectBow(walk,prepared) {
  const {model,nav}=walk;if(model.bow)return;
  if(!model.bridge)throw Error('El puente debe estar preparado');
  const zone=prepared.mobileSafe?prepared:prepareBow(prepared);
  const floor=nav.floorSafe.bind(nav),location=nav.location.bind(nav),nearest=nav.nearest.bind(nav);
  nav.floorSafe=(x,y,deck=nav.deck)=>deck==='UD'?(zone.mobileSafe(x,y,nav.radius)||floor(x,y,deck))&&zone.clearanceSafe(x,y,nav.radius):floor(x,y,deck);
  nav.location=()=>nav.deck==='UD'&&!nav.stair&&zone.contains(...nav.position)?zone.room:location();
  nav.nearest=(x,y,deck=nav.deck)=>deck==='UD'&&zone.contains(x,y)?zone.room.spawn.slice(0,2):nearest(x,y,deck);
  model.bow=zone;model.asset.data.rooms.push(zone.room);
  if(walk.controls) {
    const controls=walk.controls,notice=walk.doc.createElement('div');
    notice.className='luz-bow-deck-limit';notice.hidden=true;notice.setAttribute('role','status');
    notice.textContent='Punta de proa y conexión de babor · Continuación pendiente';
    notice.style.cssText='position:fixed;left:50%;bottom:24px;transform:translateX(-50%);padding:8px 12px;border-radius:10px;background:#302e29e8;color:#efe9dd;font:13px system-ui;text-align:center;pointer-events:none;max-width:55vw';
    controls.hud.appendChild(notice);
    const sync=controls.syncLocation.bind(controls);
    controls.syncLocation=()=>{
      sync();const hidden=!walk.active||controls.open||nav.deck!=='UD'||!!nav.stair||!(nav.position[0]>28.8||nav.position[0]<24.2&&nav.position[0]>23.7&&nav.position[1]>1.8);
      if(notice.hidden!==hidden)notice.hidden=hidden;
    };
    controls.rooms.push(zone.room);
    controls.root.querySelector('[data-nav-note]').textContent='Accede al estar de proa por el pasillo de estribor. La punta, la conexión exterior de babor y la escalera interior del puente siguen pendientes.';
    controls.syncLocation();if(controls.open)controls.renderRooms();
  }
}
export function restoreBowHandoff(walk,state) {
  const nav=walk.nav;nav.deck='UD';nav.stair=null;
  nav.position=state.deck==='UD'&&!state.stair&&nav.floorSafe(...state.position,'UD')?state.position.slice():bowRoom.spawn.slice(0,2);
  if(!nav.floorSafe(...nav.position,'UD'))throw Error('No hay un punto seguro en el estar de proa');
  nav.elevation=6;nav.room=nav.location();walk.cameraElevation=6;walk.applyPosition();
}
export function preloadBow(app) {
  const model=app.entranceYacht;if(model.loadBow)return;
  const abort=new AbortController(),panel=document.createElement('div');panel.className='luz-saloon-load luz-bow-deck-load';
  panel.innerHTML='<span role="status" aria-live="polite"></span><button type="button" hidden>Reintentar</button>';document.body.append(panel);
  const status=panel.querySelector('span'),retry=panel.querySelector('button');let pending;
  async function load() {
    if(pending||abort.signal.aborted||model.bowLoadState==='ready')return pending;
    const resume=app.engine._running===true,loader=document.getElementById('loader');
    if(resume){app.engine.stop();loader.hidden=false;loader.style.display='';}
    const oldStatus=loader?.querySelector('.loader-status')?.textContent;
    if(loader?.querySelector('.loader-status'))loader.querySelector('.loader-status').textContent='Preparando el estar de proa…';
    model.bowLoadState='loading';panel.hidden=false;retry.hidden=true;status.textContent='Preparando el estar de proa…';
    pending=(async()=>{
      const zone=prepareBow(await loadBow({signal:abort.signal}));if(abort.signal.aborted)return;
      await app.gangwayRenderer.installProfiles(zone.profiles,{prepare:true,activate:()=>{
        if(abort.signal.aborted)throw Error('Carga cancelada');connectBow(app.yachtWalk,zone);
      }});
      model.bowLoadState='ready';panel.hidden=true;window.dispatchEvent(new Event('luz-de-mar:bow-deck-ready'));
      await preloadBridgeAccess(app);
    })().catch(error=>{
      if(abort.signal.aborted)return;model.bowLoadState='error';status.textContent='No se pudo preparar el estar de proa. El recorrido anterior sigue disponible.';retry.hidden=false;
      console.warn('Bow loading failed',error);
    }).finally(()=>{
      pending=null;
      if(!abort.signal.aborted&&resume){loader.hidden=true;loader.style.display='none';
        app.input.keys.clear();app.input.pressed.clear();app.input.look.x=app.input.look.y=0;
        app.yachtWalk.controls?.joystick?.reset?.();app.engine.start(dt=>app.frame(dt));}
      if(loader?.querySelector('.loader-status'))loader.querySelector('.loader-status').textContent=oldStatus;
    });return pending;
  }
  retry.onclick=load;model.loadBow=load;const dispose=model.dispose.bind(model);
  model.dispose=()=>{abort.abort();panel.remove();dispose();};return load();
}
