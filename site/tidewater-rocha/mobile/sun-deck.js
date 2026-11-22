import {preloadUpperInterior} from './upper-interior.js?v=port-guest-1';
import {decodeSaloon} from './main-saloon.js?v=port-guest-1';
import {createFlight,installFlightNavigation,restorableStair,restoreStairPosition} from './stair-surfaces.js?v=port-guest-1';
import {indexFootprints} from './terrace-geometry.js?v=chair-fidelity-1';
import {supportedFloor} from './sun-deck-geometry.js?v=port-guest-1';
export const sunVersion='gangway-profile-2';
export function decodeSun(manifest,buffer) {
  const result=decodeSaloon(manifest,buffer,{version:sunVersion,names:['exterior','upper','sun'],roomID:'SD_R01'}),f=result.flight;
  if(f?.route?.id!=='sun'||f.route.lower!=='UD'||f.route.upper!=='SD'||f.surfaces?.length!==15||f.treadCount!==13||f.riseCount!==14||
    f.surfaces.some((s,i)=>s.index!==i||!s.polygons?.length||Math.abs(s.height-(6+i*2.2/14))>1e-5)||
    f.obstacles?.length!==15||f.obstacles.some((s,i)=>Math.abs(s.height-f.surfaces[i].height)>1e-5||!Array.isArray(s.footprints)))throw Error('Escalera del solárium incompleta');
  return result;
}
export async function loadSun({signal,fetcher=globalThis.fetch.bind(globalThis),timeoutMs=45000}={}) {
  const controller=new AbortController(),abort=()=>controller.abort();
  signal?.addEventListener('abort',abort,{once:true});if(signal?.aborted)abort();const timer=setTimeout(abort,timeoutMs);
  try {
    const r=await Promise.all(['json','bin'].map(ext=>fetcher(new URL(`./sun-deck.${ext}?v=${sunVersion}`,import.meta.url),{signal:controller.signal})));
    if(r.some(r=>!r.ok))throw Error('No se pudo cargar el solárium');
    const [manifest,buffer]=await Promise.all([r[0].json(),r[1].arrayBuffer()]);return decodeSun(manifest,buffer);
  }finally{clearTimeout(timer);signal?.removeEventListener('abort',abort);controller.abort();}
}
export function prepareSun(sun) {
  const f=sun.flight,byHeight=new Map(f.obstacles.map(s=>[s.height.toFixed(6),indexFootprints(s.footprints)]));
  const flight=createFlight(f.route,{UD:6,SD:8.2},f.surfaces.slice(1),{lower:f.surfaces[0].polygons,upper:f.surfaces.at(-1).polygons},
    (x,y,h,r)=>!byHeight.get(h.toFixed(6))(x,y,r));
  return {...sun,flight,floorSafe:supportedFloor(sun.floor,sun.collisionFootprints)};
}
export function connectSun(walk,prepared) {
  const {model,nav}=walk;if(model.sun)return;if(!model.upper)throw Error('La terraza superior debe estar preparada');
  const sun=prepared.floorSafe?prepared:prepareSun(prepared),previous=nav.floorSafe.bind(nav),location=nav.location.bind(nav),nearest=nav.nearest.bind(nav);
  nav.floorSafe=(x,y,deck=nav.deck)=>deck==='SD'?sun.floorSafe(x,y,nav.radius):previous(x,y,deck);
  nav.location=()=>nav.deck==='SD'&&!nav.stair?sun.room:location();
  nav.nearest=(x,y,deck=nav.deck)=>deck==='SD'?sun.room.spawn.slice(0,2):nearest(x,y,deck);
  // The compact renderer keeps SD resident; its hide toggle is unavailable.
  model.optionalSunDeck=true;model.setSunDeck??=()=>{};
  model.asset.data.levels.SD=8.2;model.asset.data.rooms.push(sun.room);
  nav.routes.push(sun.flight.route);installFlightNavigation(nav,[sun.flight]);model.sun=sun;
  if(walk.controls){
    walk.controls.rooms.push(sun.room);const button=walk.controls.root.querySelector('[data-deck="SD"]');if(button)button.hidden=false;
    walk.controls.root.querySelector('[data-nav-note]').textContent='Desde la terraza superior puedes subir al solárium por la escalera de babor.';
    walk.controls.syncLocation();if(walk.controls.open)walk.controls.renderRooms();
  }
}
export function restoreSunHandoff(walk,state) {
  const nav=walk.nav,route=nav.routes.find(r=>r.id==='sun');
  nav.deck=state.deck;nav.position=state.position.slice();nav.stair=null;
  if(state.stair==='sun'&&route&&restorableStair(nav,route,state))restoreStairPosition(nav,route,state);
  else if(state.deck==='SD'&&!state.stair&&nav.floorSafe(...state.position,'SD'))nav.elevation=8.2;
  else {
    nav.deck=state.elevation>7.1?'SD':'UD';nav.position=nav.deck==='SD'?[13.85,.7]:[11.3,2.7];
    if(!nav.floorSafe(...nav.position,nav.deck))nav.position=nav.nearest(...nav.position,nav.deck);
    nav.elevation=nav.floorHeight(...nav.position);
  }
  nav.room=nav.location();walk.cameraElevation=nav.elevation;walk.applyPosition();
}
export function preloadSun(app) {
  const model=app.entranceYacht;if(model.loadSun)return;
  const abort=new AbortController(),panel=document.createElement('div');panel.className='luz-saloon-load luz-sun-load';
  panel.innerHTML='<span role="status" aria-live="polite"></span><button type="button" hidden>Reintentar</button>';document.body.append(panel);
  const status=panel.querySelector('span'),retry=panel.querySelector('button');let pending;
  async function load() {
    if(pending||abort.signal.aborted||model.sunLoadState==='ready')return pending;
    const resume=app.engine._running===true,loader=document.getElementById('loader');
    if(resume){app.engine.stop();loader.hidden=false;loader.style.display='';}
    const oldStatus=loader?.querySelector('.loader-status')?.textContent;
    if(loader?.querySelector('.loader-status'))loader.querySelector('.loader-status').textContent='Preparando el solárium…';
    model.sunLoadState='loading';panel.hidden=false;retry.hidden=true;status.textContent='Preparando el solárium…';
    pending=(async()=>{
      const sun=prepareSun(await loadSun({signal:abort.signal}));if(abort.signal.aborted)return;
      await app.gangwayRenderer.installProfiles(sun.profiles,{prepare:true,activate:()=>{
        if(abort.signal.aborted)throw Error('Carga cancelada');connectSun(app.yachtWalk,sun);
      }});
      model.sunLoadState='ready';panel.hidden=true;window.dispatchEvent(new Event('luz-de-mar:sun-ready'));
      await preloadUpperInterior(app);
    })().catch(error=>{
      if(abort.signal.aborted)return;model.sunLoadState='error';status.textContent='No se pudo preparar el solárium. El recorrido anterior sigue disponible.';retry.hidden=false;
      console.warn('Sun deck loading failed',error);
    }).finally(()=>{
      pending=null;
      if(!abort.signal.aborted&&resume){loader.hidden=true;loader.style.display='none';
        app.input.keys.clear();app.input.pressed.clear();app.input.look.x=app.input.look.y=0;
        app.yachtWalk.controls?.joystick?.reset?.();app.engine.start(dt=>app.frame(dt));}
      if(loader?.querySelector('.loader-status'))loader.querySelector('.loader-status').textContent=oldStatus;
    });return pending;
  }
  retry.onclick=load;model.loadSun=load;const dispose=model.dispose.bind(model);
  model.dispose=()=>{abort.abort();panel.remove();dispose();};return load();
}
