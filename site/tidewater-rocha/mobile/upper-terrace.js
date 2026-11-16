import {preloadSun} from './sun-deck.js?v=spatial-correction-1';
import {decodeSaloon} from './main-saloon.js?v=spatial-correction-1';
import {createFlight,installFlightNavigation,restorableStair,restoreStairPosition} from './stair-surfaces.js?v=spatial-correction-1';
import {indexFootprints} from './terrace-geometry.js?v=spatial-correction-1';
export const upperVersion='spatial-correction-1';
export function decodeUpper(manifest,buffer) {
  const result=decodeSaloon(manifest,buffer,{version:upperVersion,names:['exterior','interior','upper'],roomID:'UD_R01'});
  const f=result.flight;
  if(f?.route?.id!=='aft'||f.surfaces?.length!==13||f.treadCount!==11||f.riseCount!==12||
    f.surfaces.some((s,i)=>s.index!==i||!s.polygons?.length||Math.abs(s.height-(3.95+i*2.05/12))>.00001)||
    f.obstacles?.length!==13)throw Error('Escalera superior incompleta');
  return result;
}
export async function loadUpper({signal,fetcher=globalThis.fetch.bind(globalThis),timeoutMs=45000}={}) {
  const controller=new AbortController(),abort=()=>controller.abort();
  signal?.addEventListener('abort',abort,{once:true});if(signal?.aborted)abort();
  const timer=setTimeout(abort,timeoutMs);
  try {
    const r=await Promise.all(['json','bin'].map(ext=>fetcher(new URL(`./upper-terrace.${ext}?v=${upperVersion}`,import.meta.url),{signal:controller.signal})));
    if(r.some(r=>!r.ok))throw Error('No se pudo cargar la terraza superior');
    const [manifest,buffer]=await Promise.all([r[0].json(),r[1].arrayBuffer()]);
    return decodeUpper(manifest,buffer);
  }finally{clearTimeout(timer);signal?.removeEventListener('abort',abort);controller.abort();}
}
export function connectUpper(walk,upper) {
  const {model,nav}=walk;
  if(model.upper)return;
  if(!model.saloon)throw Error('El salón debe estar preparado primero');
  const hits=indexFootprints(upper.collisionFootprints);
  const supports=indexFootprints(upper.floor.map(polygon=>({polygon})));
  const onFloor=(x,y)=>x<=upper.navigationEnd&&supports(x,y,.000001);
  const floorSafe=(x,y,radius=nav.radius)=>!hits(x,y,radius)&&onFloor(x,y)&&
    Array.from({length:32},(_,i)=>i*Math.PI/16).every(a=>onFloor(x+radius*Math.cos(a),y+radius*Math.sin(a)));
  const data=upper.flight,obstacles=new Map(data.obstacles.map(s=>[s.height.toFixed(6),indexFootprints(s.footprints)]));
  const flight=createFlight(data.route,{MD:3.95,UD:6},data.surfaces.slice(1),
    {lower:data.surfaces[0].polygons,upper:data.surfaces.at(-1).polygons},
    (x,y,height,radius)=>!obstacles.get(height.toFixed(6))(x,y,radius));
  const oldFloor=nav.floorSafe.bind(nav),oldLocation=nav.location.bind(nav),oldNearest=nav.nearest.bind(nav);
  nav.floorSafe=(x,y,deck=nav.deck)=>deck==='UD'?floorSafe(x,y):oldFloor(x,y,deck);
  nav.location=()=>nav.deck==='UD'&&!nav.stair?upper.room:oldLocation();
  nav.nearest=(x,y,deck=nav.deck)=>deck==='UD'?upper.room.spawn.slice(0,2):oldNearest(x,y,deck);
  model.asset.data.levels.UD=6;model.asset.data.rooms.push(upper.room);
  nav.routes.push(flight.route);installFlightNavigation(nav,[flight]);
  model.upper={...upper,flight,floorSafe};
  if(walk.controls) {
    walk.controls.rooms.push(upper.room);
    const button=walk.controls.root.querySelector('[data-deck="UD"]');if(button)button.hidden=false;
    walk.controls.root.querySelector('[data-nav-note]').textContent='Sube a la terraza superior por la escalera exterior de babor. También puedes visitar el salón y la plataforma de baño.';
    walk.controls.syncLocation();if(walk.controls.open)walk.controls.renderRooms();
  }
}
// Shared restoration validates the destination in the complete yacht before
// retaining a pose. Unsupported positions fall back to a real safe landing.
export function restoreUpperHandoff(walk,state) {
  const nav=walk.nav,route=nav.routes.find(r=>r.id==='aft');
  nav.deck=state.deck;nav.position=state.position.slice();nav.stair=null;
  if(state.stair==='aft'&&route&&restorableStair(nav,route,state))restoreStairPosition(nav,route,state);
  else if(state.deck==='UD'&&!state.stair&&nav.floorSafe(...state.position,'UD'))nav.elevation=6;
  else {
    nav.deck=state.elevation>(3.95+6)/2?'UD':'MD';
    nav.position=nav.deck==='UD'?[8.35,2.21]:[5.2,2.21];
    if(!nav.floorSafe(...nav.position,nav.deck))nav.position=nav.nearest(...nav.position,nav.deck);
    nav.elevation=nav.floorHeight(...nav.position);
  }
  nav.room=nav.location();walk.cameraElevation=nav.elevation;walk.applyPosition();
}
export function preloadUpper(app) {
  const model=app.entranceYacht;
  if(model.loadUpper)return;
  const abort=new AbortController(),panel=document.createElement('div');
  panel.className='luz-saloon-load luz-upper-load';
  panel.innerHTML='<span role="status" aria-live="polite"></span><button type="button" hidden>Reintentar</button>';
  document.body.append(panel);
  const status=panel.querySelector('span'),retry=panel.querySelector('button');let pending;
  async function load() {
    if(pending||abort.signal.aborted||model.upperLoadState==='ready')return pending;
    const start=performance.now();model.upperLoadState='loading';panel.hidden=false;retry.hidden=true;status.textContent='Preparando la terraza superior…';
    pending=(async()=>{
      const upper=await loadUpper({signal:abort.signal});if(abort.signal.aborted)return;
      await app.gangwayRenderer.installProfiles(upper.profiles);if(abort.signal.aborted)return;
      await app.gangwayRenderer.prepareProfiles();if(abort.signal.aborted)return;
      connectUpper(app.yachtWalk,upper);model.upperLoadMs=performance.now()-start;
      model.upperLoadState='ready';panel.hidden=true;
      window.dispatchEvent(new Event('luz-de-mar:upper-ready'));
      await preloadSun(app);
    })().catch(error=>{
      if(abort.signal.aborted)return;
      model.upperLoadState='error';status.textContent='No se pudo preparar la terraza superior. El recorrido actual sigue disponible.';retry.hidden=false;
      console.warn('Upper terrace loading failed',error);
    }).finally(()=>{pending=null;});return pending;
  }
  retry.onclick=load;model.loadUpper=load;
  const dispose=model.dispose.bind(model);model.dispose=()=>{abort.abort();panel.remove();dispose();};
  return load();
}
