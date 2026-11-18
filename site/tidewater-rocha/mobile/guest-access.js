import {decodeSaloon} from './main-saloon.js?v=port-guest-1';
import {createFlight,installFlightNavigation,restorableStair,restoreStairPosition} from './stair-surfaces.js?v=port-guest-1';
import {indexFootprints} from './terrace-geometry.js?v=chair-fidelity-1';
import {guestLandings,prepareGuestFloor,guestProfileDomain,lowerRoomAt} from './guest-access-geometry.js?v=port-guest-1';

export const guestAccessVersion='saloon-rug-1';
export function decodeGuestAccess(manifest,buffer) {
  const result=decodeSaloon(manifest,buffer,{version:guestAccessVersion,names:['exterior','upper','sun','bow','guest'],roomID:'LD_R11'}),f=result.flight;
  const polygon=p=>Array.isArray(p)&&p.length>=3&&p.every(v=>Array.isArray(v)&&v.length===2&&v.every(Number.isFinite));
  const vector=p=>Array.isArray(p)&&p.length===3&&p.every(Number.isFinite);
  if(result.cabin?.id!=='LD_R03'||!vector(result.cabin.spawn)||!vector(result.cabin.look)||!Array.isArray(result.cabinRoute)||result.cabinRoute.length<3||
    !result.cabinRoute.every(p=>Array.isArray(p)&&p.length===2&&p.every(Number.isFinite))||!result.floor?.length||!result.floor.every(polygon)||result.domains?.length!==3||!result.domains.every(polygon)||
    result.room.deck!=='LD'||!vector(result.room.spawn)||!vector(result.room.look)||Math.abs(result.room.spawn[2]-3.15)>1e-5||
    !result.collisionFootprints.every(p=>polygon(p.polygon))||!result.guestPartIDs?.length||
    f?.route?.id!=='guest'||f.route.lower!=='LD'||f.route.upper!=='MD'||f.treadCount!==13||f.riseCount!==14||
    f.route.steps!==14||f.route.width!==.76||!Number.isFinite(f.route.length)||f.route.length<=0||
    !Array.isArray(f.route.path)||f.route.path.length<4||f.route.path.some(p=>!Array.isArray(p)||p.length!==2||!p.every(Number.isFinite))||
    !Array.isArray(f.route.distances)||f.route.distances.length!==f.route.path.length||
    f.route.distances.some((d,i)=>!Number.isFinite(d)||i>0&&d<=f.route.distances[i-1])||f.route.distances[0]!==0||
    Math.abs(f.route.distances.at(-1)-f.route.length)>1e-6||
    f.route.path.some((p,i)=>i>0&&Math.abs(f.route.distances[i]-f.route.distances[i-1]-Math.hypot(p[0]-f.route.path[i-1][0],p[1]-f.route.path[i-1][1]))>1e-5)||
    f.route.path.some((p,i)=>(i===0||i===f.route.path.length-1)&&(Math.abs(p[0]-17.4)>1e-5||Math.abs(p[1]-(i===0?-.08:-1.42))>1e-5))||
    f.surfaces?.length!==15||f.surfaces.some((s,i)=>s.index!==i||s.kind!==(i===0||i===14?'landing':'tread')||!Number.isFinite(s.height)||Math.abs(s.height-(1.55+i*2.4/14))>1e-5||!s.polygons?.length||!s.polygons.every(polygon))||
    f.obstacles?.length!==15||f.obstacles.some((s,i)=>!Number.isFinite(s.height)||Math.abs(s.height-f.surfaces[i].height)>1e-5||!Array.isArray(s.footprints)||!s.footprints.every(p=>polygon(p.polygon))))
    throw Error('Acceso de invitados incompleto');
  return result;
}
export async function loadGuestAccess({signal,fetcher=globalThis.fetch.bind(globalThis),timeoutMs=45000}={}) {
  const controller=new AbortController(),abort=()=>controller.abort();
  signal?.addEventListener('abort',abort,{once:true});if(signal?.aborted)abort();const timer=setTimeout(abort,timeoutMs);
  try{
    const responses=await Promise.all(['json','bin'].map(ext=>fetcher(new URL(`./guest-access.${ext}?v=${guestAccessVersion}`,import.meta.url),{signal:controller.signal})));
    if(responses.some(r=>!r.ok))throw Error('No se pudo cargar el acceso de invitados');
    const [manifest,buffer]=await Promise.all([responses[0].json(),responses[1].arrayBuffer()]);return decodeGuestAccess(manifest,buffer);
  }finally{clearTimeout(timer);signal?.removeEventListener('abort',abort);controller.abort();}
}
export function prepareGuestAccess(zone) {
  const f=zone.flight,indices=new Map(f.obstacles.map(s=>[s.height.toFixed(6),indexFootprints(s.footprints)]));
  const clearance=(x,y,h,r)=>!indices.get(h.toFixed(6))(x,y,r);
  Object.defineProperty(clearance,'preparedHeights',{get:()=>indices.size});
  const flight=createFlight(f.route,{LD:1.55,MD:3.95},f.surfaces.slice(1),{lower:f.surfaces[0].polygons,upper:[]},clearance);
  const prepared={...zone,...prepareGuestFloor(zone),flight,profileContains:guestProfileDomain};
  const cabinPoints=[zone.cabin.spawn.slice(0,2),...zone.cabinRoute];
  if(cabinPoints.some(point=>!prepared.limitSafe(...point)||!prepared.floorSafe(...point))||
    !prepared.limitSafe(...zone.room.spawn.slice(0,2))||!prepared.floorSafe(...zone.room.spawn.slice(0,2))||!flight.safe(...guestLandings.lower,.14,0)||!flight.safe(...guestLandings.upper,.14,14))
    throw Error('El acceso de invitados está bloqueado');
  return prepared;
}
export function connectGuestAccess(walk,prepared) {
  const {model,nav}=walk;if(model.guestAccess)return;
  if(!model.bridgeAccess)throw Error('El acceso al puente debe estar preparado');
  const zone=prepared.floorSafe?prepared:prepareGuestAccess(prepared),flight=zone.flight;
  const floor=nav.floorSafe.bind(nav),location=nav.location.bind(nav),nearest=nav.nearest.bind(nav);
  nav.floorSafe=(x,y,deck=nav.deck)=>deck==='LD'?
    zone.limitSafe(x,y,nav.radius)&&(zone.floorSafe(x,y,nav.radius)||flight.safe(x,y,nav.radius,0)?.index===0):
    deck==='MD'&&flight.safe(x,y,nav.radius,14)?.index===14?true:floor(x,y,deck);
  nav.location=()=>nav.deck==='LD'&&!nav.stair?lowerRoomAt(...nav.position):location();
  nav.nearest=(x,y,deck=nav.deck)=>deck==='LD'?lowerRoomAt(x,y).spawn.slice(0,2):nearest(x,y,deck);
  model.asset.data.levels.LD=1.55;
  nav.routes.push(flight.route);installFlightNavigation(nav,[flight]);
  model.guestAccess=zone;model.asset.data.rooms.push(zone.room,zone.cabin);
  if(walk.controls){
    const controls=walk.controls;controls.rooms.push(zone.room,zone.cabin);
    let button=controls.root.querySelector('[data-deck="LD"]');
    if(!button) {
      button=controls.doc.createElement('button');button.type='button';button.dataset.deck='LD';
      button.innerHTML='<span>−1</span>Inferior';button.setAttribute('aria-pressed','false');
      button.onclick=()=>{controls.selectedDeck='LD';controls.search.value='';controls.root.querySelector('[data-more]').open=false;controls.renderRooms();};
      controls.root.querySelector('.luz-decks').prepend(button);
    }
    button.hidden=false;
    controls.root.querySelector('[data-nav-note]').textContent='La escalera de invitados lleva al distribuidor y al camarote de popa de babor. Resto de camarotes, baños y cocina · Continuación pendiente.';
    controls.syncLocation();if(controls.open)controls.renderRooms();
  }
}
export function restoreGuestAccessHandoff(walk,state) {
  const nav=walk.nav,route=nav.routes.find(r=>r.id==='guest');nav.deck=state.deck;nav.position=state.position.slice();nav.stair=null;
  if(state.stair==='guest'&&route&&restorableStair(nav,route,state))restoreStairPosition(nav,route,state);
  else if(!state.stair&&['LD','MD'].includes(state.deck)&&nav.floorSafe(...state.position,state.deck))nav.elevation=state.deck==='LD'?1.55:3.95;
  else{nav.deck=Number.isFinite(state.elevation)&&state.elevation<2.75?'LD':'MD';nav.position=(nav.deck==='LD'?guestLandings.lower:guestLandings.upper).slice();nav.elevation=nav.deck==='LD'?1.55:3.95;}
  if(!nav.stair&&!nav.floorSafe(...nav.position,nav.deck))throw Error('No hay desembarco seguro para el acceso de invitados');
  nav.room=nav.location();walk.cameraElevation=nav.elevation;walk.applyPosition();
}

export function preloadGuestAccess(app) {
  const model=app.entranceYacht;if(model.loadGuestAccess)return;
  const abort=new AbortController(),panel=document.createElement('div');panel.className='luz-saloon-load luz-guest-access-load';
  panel.innerHTML='<span role="status" aria-live="polite"></span><button type="button" hidden>Reintentar</button>';document.body.append(panel);
  const status=panel.querySelector('span'),retry=panel.querySelector('button');let pending;
  async function load() {
    if(pending||abort.signal.aborted||model.guestAccessLoadState==='ready')return pending;
    const resume=app.engine._running===true,loader=document.getElementById('loader');
    if(resume){app.engine.stop();loader.hidden=false;loader.style.display='';}
    const oldStatus=loader?.querySelector('.loader-status')?.textContent;
    if(loader?.querySelector('.loader-status'))loader.querySelector('.loader-status').textContent='Preparando el acceso de invitados…';
    model.guestAccessLoadState='loading';panel.hidden=false;retry.hidden=true;status.textContent='Preparando el acceso de invitados…';
    pending=(async()=>{
      const zone=prepareGuestAccess(await loadGuestAccess({signal:abort.signal}));if(abort.signal.aborted)return;
      await app.gangwayRenderer.installProfiles(zone.profiles,{prepare:true,activate:()=>{
        if(abort.signal.aborted)throw Error('Carga cancelada');connectGuestAccess(app.yachtWalk,zone);
      }});
      model.guestAccessLoadState='ready';panel.hidden=true;window.dispatchEvent(new Event('luz-de-mar:guest-access-ready'));
    })().catch(error=>{
      if(abort.signal.aborted)return;model.guestAccessLoadState='error';status.textContent='No se pudo preparar el acceso de invitados. El recorrido anterior sigue disponible.';retry.hidden=false;
      console.warn('Guest access loading failed',error);
    }).finally(()=>{
      pending=null;
      if(!abort.signal.aborted&&resume){loader.hidden=true;loader.style.display='none';
        app.input.keys.clear();app.input.pressed.clear();app.input.look.x=app.input.look.y=0;
        app.yachtWalk.controls?.joystick?.reset?.();app.engine.start(dt=>app.frame(dt));}
      if(loader?.querySelector('.loader-status'))loader.querySelector('.loader-status').textContent=oldStatus;
    });return pending;
  }
  retry.onclick=load;model.loadGuestAccess=load;const dispose=model.dispose.bind(model);
  model.dispose=()=>{abort.abort();panel.remove();dispose();};return load();
}
