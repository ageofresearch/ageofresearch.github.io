import {preloadBridge} from './bridge-helm.js?v=port-guest-1';
import {decodeSaloon} from './main-saloon.js?v=port-guest-1';
import {interiorLimits,interiorRoom,prepareInteriorFloor} from './upper-interior-geometry.js?v=port-guest-1';

export const upperInteriorVersion='saloon-entry-1';
export function decodeUpperInterior(manifest,buffer) {
  const result=decodeSaloon(manifest,buffer,{version:upperInteriorVersion,names:['exterior','upper','sun'],roomID:'UD_R02'});
  const polygon=p=>Array.isArray(p)&&p.length>=3&&p.every(v=>Array.isArray(v)&&v.length===2&&v.every(Number.isFinite));
  if(Object.entries(interiorLimits).some(([k,v])=>manifest.limits?.[k]!==v)||!result.floor.every(polygon)||
    !result.collisionFootprints.every(p=>polygon(p.polygon))||!result.interiorPartIDs?.length)
    throw Error('Interior superior incompleto');
  return result;
}
export async function loadUpperInterior({signal,fetcher=globalThis.fetch.bind(globalThis),timeoutMs=45000}={}) {
  const controller=new AbortController(),abort=()=>controller.abort();
  signal?.addEventListener('abort',abort,{once:true});if(signal?.aborted)abort();const timer=setTimeout(abort,timeoutMs);
  try {
    const responses=await Promise.all(['json','bin'].map(ext=>fetcher(new URL(`./upper-interior.${ext}?v=${upperInteriorVersion}`,import.meta.url),{signal:controller.signal})));
    if(responses.some(r=>!r.ok))throw Error('No se pudo cargar el interior superior');
    const [manifest,buffer]=await Promise.all([responses[0].json(),responses[1].arrayBuffer()]);return decodeUpperInterior(manifest,buffer);
  }finally{clearTimeout(timer);signal?.removeEventListener('abort',abort);controller.abort();}
}
export function prepareUpperInterior(interior) {
  const prepared={...interior,...prepareInteriorFloor(interior)};
  if(!prepared.mobileSafe(...interiorRoom.spawn.slice(0,2))||!prepared.mobileSafe(14.21,0))
    throw Error('El acceso al interior superior está bloqueado');
  return prepared;
}
export function connectUpperInterior(walk,prepared) {
  const {model,nav}=walk;if(model.upperInterior)return;
  if(!model.sun)throw Error('El solárium debe estar preparado');
  const interior=prepared.mobileSafe?prepared:prepareUpperInterior(prepared);
  const floor=nav.floorSafe.bind(nav),location=nav.location.bind(nav),nearest=nav.nearest.bind(nav);
  nav.floorSafe=(x,y,deck=nav.deck)=>deck==='UD'?(interior.mobileSafe(x,y,nav.radius)||floor(x,y,deck)):floor(x,y,deck);
  nav.location=()=>nav.deck==='UD'&&!nav.stair&&nav.position[0]>=14.249?interior.room:location();
  nav.nearest=(x,y,deck=nav.deck)=>deck==='UD'&&x>=14.249?interior.room.spawn.slice(0,2):nearest(x,y,deck);
  model.upperInterior=interior;model.asset.data.rooms.push(interior.room);
  if(walk.controls) {
    const controls=walk.controls,notice=walk.doc.createElement('div');
    notice.className='luz-upper-interior-limit';notice.hidden=true;notice.setAttribute('role','status');
    notice.textContent='Puente de mando · Continuación pendiente';
    notice.style.cssText='position:fixed;left:50%;bottom:24px;transform:translateX(-50%);padding:8px 12px;border-radius:10px;background:#302e29e8;color:#efe9dd;font:13px system-ui;text-align:center;pointer-events:none;max-width:55vw';
    controls.hud.appendChild(notice);
    const sync=controls.syncLocation.bind(controls);
    controls.syncLocation=()=>{
      sync();const hidden=!!model.bridge||!walk.active||controls.open||nav.deck!=='UD'||!!nav.stair||nav.position[0]<18.05;
      if(notice.hidden!==hidden)notice.hidden=hidden;
    };
    controls.rooms.push(interior.room);
    controls.root.querySelector('[data-nav-note]').textContent='Puedes entrar al interior superior desde la terraza. El acceso al puente de mando continúa pendiente.';
    controls.syncLocation();if(controls.open)controls.renderRooms();
  }
}
export function restoreUpperInteriorHandoff(walk,state) {
  const nav=walk.nav;nav.deck='UD';nav.stair=null;
  nav.position=state.deck==='UD'&&!state.stair&&nav.floorSafe(...state.position,'UD')?state.position.slice():interiorRoom.spawn.slice(0,2);
  if(!nav.floorSafe(...nav.position,'UD'))throw Error('No hay un punto seguro en el interior superior');
  nav.elevation=6;nav.room=nav.location();walk.cameraElevation=6;walk.applyPosition();
}
export function preloadUpperInterior(app) {
  const model=app.entranceYacht;if(model.loadUpperInterior)return;
  const abort=new AbortController(),panel=document.createElement('div');panel.className='luz-saloon-load luz-upper-interior-load';
  panel.innerHTML='<span role="status" aria-live="polite"></span><button type="button" hidden>Reintentar</button>';document.body.append(panel);
  const status=panel.querySelector('span'),retry=panel.querySelector('button');let pending;
  async function load() {
    if(pending||abort.signal.aborted||model.upperInteriorLoadState==='ready')return pending;
    const resume=app.engine._running===true,loader=document.getElementById('loader');
    if(resume){app.engine.stop();loader.hidden=false;loader.style.display='';}
    const oldStatus=loader?.querySelector('.loader-status')?.textContent;
    if(loader?.querySelector('.loader-status'))loader.querySelector('.loader-status').textContent='Preparando el interior superior…';
    model.upperInteriorLoadState='loading';panel.hidden=false;retry.hidden=true;status.textContent='Preparando el interior superior…';
    pending=(async()=>{
      const interior=prepareUpperInterior(await loadUpperInterior({signal:abort.signal}));if(abort.signal.aborted)return;
      await app.gangwayRenderer.installProfiles(interior.profiles,{prepare:true,activate:()=>{
        if(abort.signal.aborted)throw Error('Carga cancelada');connectUpperInterior(app.yachtWalk,interior);
      }});
      model.upperInteriorLoadState='ready';panel.hidden=true;window.dispatchEvent(new Event('luz-de-mar:upper-interior-ready'));
      await preloadBridge(app);
    })().catch(error=>{
      if(abort.signal.aborted)return;model.upperInteriorLoadState='error';status.textContent='No se pudo preparar el interior superior. El recorrido anterior sigue disponible.';retry.hidden=false;
      console.warn('Upper interior loading failed',error);
    }).finally(()=>{
      pending=null;
      if(!abort.signal.aborted&&resume){loader.hidden=true;loader.style.display='none';
        app.input.keys.clear();app.input.pressed.clear();app.input.look.x=app.input.look.y=0;
        app.yachtWalk.controls?.joystick?.reset?.();app.engine.start(dt=>app.frame(dt));}
      if(loader?.querySelector('.loader-status'))loader.querySelector('.loader-status').textContent=oldStatus;
    });return pending;
  }
  retry.onclick=load;model.loadUpperInterior=load;const dispose=model.dispose.bind(model);
  model.dispose=()=>{abort.abort();panel.remove();dispose();};return load();
}
