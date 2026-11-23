import {loadZone} from './load-zone.js?v=bow-loading-1';
import {decodeSaloon} from './main-saloon.js?v=port-guest-1';
import {createFlight,installFlightNavigation,restorableStair,restoreStairPosition} from './stair-surfaces.js?v=port-guest-1';
import {indexFootprints} from './terrace-geometry.js?v=chair-fidelity-1';
import {accessRoom,prepareAccessFloor,inAccess,accessProfileDomain} from './bridge-access-geometry.js?v=port-guest-1';
import {preloadGuestAccess} from './guest-access.js?v=port-guest-1';

export const bridgeAccessVersion='stern-flag-1';
export function decodeBridgeAccess(manifest,buffer) {
  const result=decodeSaloon(manifest,buffer,{version:bridgeAccessVersion,names:['exterior','upper','sun','bow'],roomID:'MD_R07'}),f=result.flight;
  const polygon=p=>Array.isArray(p)&&p.length>=3&&p.every(v=>Array.isArray(v)&&v.length===2&&v.every(Number.isFinite));
  if(!result.floor?.length||!result.floor.every(polygon)||!result.domains?.length||!result.domains.every(polygon)||
    !result.collisionFootprints.every(p=>polygon(p.polygon))||!result.accessPartIDs?.length||
    f?.route?.id!=='bridge'||f.route.lower!=='MD'||f.route.upper!=='UD'||f.treadCount!==11||f.riseCount!==12||
    f.route.steps!==12||f.route.width!==.76||!Number.isFinite(f.route.length)||Math.abs(f.route.length-2.72)>1e-6||
    !Array.isArray(f.route.path)||f.route.path.length!==2||f.route.path.some(p=>!Array.isArray(p)||p.length!==2||!p.every(Number.isFinite))||
    f.route.path.some((p,i)=>Math.abs(p[0]-19.16)>1e-6||Math.abs(p[1]-(i?-1.62:1.1))>1e-6)||
    !Array.isArray(f.route.distances)||f.route.distances.length!==2||!f.route.distances.every(Number.isFinite)||f.route.distances[0]!==0||Math.abs(f.route.distances[1]-2.72)>1e-6||
    f.surfaces?.length!==13||f.surfaces.some((s,i)=>s.index!==i||!Number.isFinite(s.height)||Math.abs(s.height-(3.95+i*2.05/12))>1e-5||!s.polygons?.length||!s.polygons.every(polygon))||
    f.obstacles?.length!==13||f.obstacles.some((s,i)=>!Number.isFinite(s.height)||Math.abs(s.height-f.surfaces[i].height)>1e-5||!Array.isArray(s.footprints)||!s.footprints.every(p=>polygon(p.polygon))))
    throw Error('Acceso interior incompleto');
  return result;
}
export function loadBridgeAccess(options) {
  return loadZone('bridge-access', bridgeAccessVersion, decodeBridgeAccess, options);
}
export function prepareBridgeAccess(zone) {
  const f=zone.flight,indices=new Map(f.obstacles.map(s=>[s.height.toFixed(6),indexFootprints(s.footprints)]));
  const clearance=(x,y,h,r)=>!indices.get(h.toFixed(6))(x,y,r);
  Object.defineProperty(clearance,'preparedHeights',{get:()=>indices.size});
  const flight=createFlight(f.route,{MD:3.95,UD:6},f.surfaces.slice(1),{lower:f.surfaces[0].polygons,upper:[]},clearance);
  const prepared={...zone,...prepareAccessFloor(zone),flight,profileContains:accessProfileDomain};
  if(!prepared.floorSafe(...accessRoom.spawn.slice(0,2))||!flight.safe(19.16,1.15,.14,0)||!flight.safe(19.16,-1.8,.14,12))
    throw Error('El acceso interior está bloqueado');
  return prepared;
}
export function connectBridgeAccess(walk,prepared) {
  const {model,nav}=walk;if(model.bridgeAccess)return;
  if(!model.bow)throw Error('La proa debe estar preparada');
  const zone=prepared.floorSafe?prepared:prepareBridgeAccess(prepared),flight=zone.flight;
  const floor=nav.floorSafe.bind(nav),location=nav.location.bind(nav),nearest=nav.nearest.bind(nav);
  nav.floorSafe=(x,y,deck=nav.deck)=>deck==='MD'&&inAccess(x,y)?
    zone.limitSafe(x,y,nav.radius)&&(zone.floorSafe(x,y,nav.radius)||flight.safe(x,y,nav.radius,0)?.index===0):
    deck==='UD'&&flight.safe(x,y,nav.radius,12)?.index===12?true:floor(x,y,deck);
  nav.location=()=>nav.deck==='MD'&&!nav.stair&&inAccess(...nav.position)?zone.room:location();
  nav.nearest=(x,y,deck=nav.deck)=>deck==='MD'&&inAccess(x,y)?zone.room.spawn.slice(0,2):nearest(x,y,deck);
  nav.routes.push(flight.route);installFlightNavigation(nav,[flight]);
  model.bridgeAccess=zone;model.asset.data.rooms.push(zone.room);
  if(walk.controls){
    const controls=walk.controls;controls.rooms.push(zone.room);
    controls.root.querySelector('[data-nav-note]').textContent='El vestíbulo conecta el salón con el puente por la escalera interior. Cocina, camarotes y escalera de invitados · Continuación pendiente.';
    controls.syncLocation();if(controls.open)controls.renderRooms();
  }
}
export function restoreBridgeAccessHandoff(walk,state) {
  const nav=walk.nav,route=nav.routes.find(r=>r.id==='bridge');nav.deck=state.deck;nav.position=state.position.slice();nav.stair=null;
  if(state.stair==='bridge'&&route&&restorableStair(nav,route,state))restoreStairPosition(nav,route,state);
  else if(!state.stair&&['MD','UD'].includes(state.deck)&&nav.floorSafe(...state.position,state.deck))nav.elevation=state.deck==='MD'?3.95:6;
  else{nav.deck=state.elevation>4.975?'UD':'MD';nav.position=nav.deck==='MD'?accessRoom.spawn.slice(0,2):[19.16,-1.8];nav.elevation=nav.deck==='MD'?3.95:6;}
  if(!nav.stair&&!nav.floorSafe(...nav.position,nav.deck))throw Error('No hay desembarco seguro para el acceso interior');
  nav.room=nav.location();walk.cameraElevation=nav.elevation;walk.applyPosition();
}

export function preloadBridgeAccess(app) {
  const model=app.entranceYacht;if(model.loadBridgeAccess)return;
  const abort=new AbortController(),panel=document.createElement('div');panel.className='luz-saloon-load luz-bridge-access-load';
  panel.innerHTML='<span role="status" aria-live="polite"></span><button type="button" hidden>Reintentar</button>';document.body.append(panel);
  const status=panel.querySelector('span'),retry=panel.querySelector('button');let pending;
  async function load() {
    if(pending||abort.signal.aborted||model.bridgeAccessLoadState==='ready')return pending;
    const resume=app.engine._running===true,loader=document.getElementById('loader');
    if(resume){app.engine.stop();loader.hidden=false;loader.style.display='';}
    const oldStatus=loader?.querySelector('.loader-status')?.textContent;
    if(loader?.querySelector('.loader-status'))loader.querySelector('.loader-status').textContent='Preparando el acceso interior…';
    model.bridgeAccessLoadState='loading';panel.hidden=false;retry.hidden=true;status.textContent='Preparando el acceso interior…';
    pending=(async()=>{
      const zone=prepareBridgeAccess(await loadBridgeAccess({signal:abort.signal}));if(abort.signal.aborted)return;
      await app.gangwayRenderer.installProfiles(zone.profiles,{prepare:true,activate:()=>{
        if(abort.signal.aborted)throw Error('Carga cancelada');connectBridgeAccess(app.yachtWalk,zone);
      }});
      model.bridgeAccessLoadState='ready';panel.hidden=true;window.dispatchEvent(new Event('luz-de-mar:bridge-access-ready'));
      await preloadGuestAccess(app);
    })().catch(error=>{
      if(abort.signal.aborted)return;model.bridgeAccessLoadState='error';status.textContent='No se pudo preparar el acceso interior. El recorrido anterior sigue disponible.';retry.hidden=false;
      console.warn('Bridge access loading failed',error);
    }).finally(()=>{
      pending=null;
      if(!abort.signal.aborted&&resume){loader.hidden=true;loader.style.display='none';
        app.input.keys.clear();app.input.pressed.clear();app.input.look.x=app.input.look.y=0;
        app.yachtWalk.controls?.joystick?.reset?.();app.engine.start(dt=>app.frame(dt));}
      if(loader?.querySelector('.loader-status'))loader.querySelector('.loader-status').textContent=oldStatus;
    });return pending;
  }
  retry.onclick=load;model.loadBridgeAccess=load;const dispose=model.dispose.bind(model);
  model.dispose=()=>{abort.abort();panel.remove();dispose();};return load();
}
