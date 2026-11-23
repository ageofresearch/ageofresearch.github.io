import {mountWalkPose} from '../mobile/walk-pose.js?v=walk-pose-1';
import {createDaylight,mountDaylightControls,applyFullBounce} from '../mobile/yacht-daylight.js?v=yacht-daylight-1';
import {restoreBridgeAccessHandoff} from '../mobile/bridge-access.js?v=port-guest-1';
import {mainRooms} from '../mobile/main-deck.js?v=main-deck-complete-1';
import {restoreGuestAccessHandoff} from '../mobile/guest-access.js?v=port-guest-1';
import {restoreBowHandoff} from '../mobile/bow-deck.js?v=port-guest-1';
import {restoreBridgeHandoff} from '../mobile/bridge-helm.js?v=port-guest-1';
import {restoreUpperInteriorHandoff} from '../mobile/upper-interior.js?v=port-guest-1';
import {restoreSunHandoff} from '../mobile/sun-deck.js?v=port-guest-1';
import {restoreUpperHandoff} from '../mobile/upper-terrace.js?v=port-guest-1';
import {preloadYachtExteriors,prepareYachtMeshes,warmYachtViews} from '../mobile/scene-readiness.js?v=chair-fidelity-1';
import{t as e}from"./RochaStartup-DD9aAm5G.js";import{D as t,b as n,n as r,o as i,t as a}from"./Frame-CNet77I0.js";import{T as o,_ as s,c,g as l,h as u,i as d,o as f,p,s as m,t as h}from"./PostFX-0mW-sLoH.js";import{t as g}from"./GPU-CxPpnRCf.js";import"./common-HBn3Movl.js";import{t as _}from"./CameraVelocity-DbPmsWHs.js";import{a as v,i as y,n as b,o as x,t as S,u as C}from"./RochaYachtState-P5KwIGIl.js?v=port-guest-1";var w=()=>new Promise(e=>requestAnimationFrame(()=>setTimeout(e,0)));async function T(){let T=performance.now(),E=new URLSearchParams(location.search),D=async(e,t)=>{document.querySelector(`.loader-status`).textContent=e,document.querySelector(`.loader-pct`).textContent=Math.round(t*100)+`%`,document.querySelector(`.loader-fill`).style.width=t*100+`%`,await w()};document.title=`Luz de Mar · Rocha`,document.querySelector(`.loader-title`).textContent=`LUZ DE MAR`,document.querySelector(`.loader-kicker`).textContent=`Rocha · solo el yate`,document.querySelector(`.loader-tagline`).textContent=`Recorre el barco caminando desde la pasarela.`,document.querySelector(`.loader-note`).textContent=`El mapa completo se carga únicamente al pedirlo.`,document.querySelector(`.loader-tips`).hidden=!0,await D(`Cargando el yate…`,.05);const pilot=E.get('scene')==='gangway'?await import('../mobile/gangway-scene.js?v=port-guest-1'):null;
let O=pilot?null:C(),k=fetch(`./rocha/luz-de-mar/berth.json`).then(e=>{if(!e.ok)throw Error(`No se pudo cargar el amarre`);return e.json()}),A=new s(document.getElementById(`app`)),[j,M]=await Promise.all([O,k,A.init()]);await D(`Preparando los detalles de Luz de Mar…`,.35);let N=pilot?await pilot.buildGangway(M):x(M,j,{isolatedBerth:true}),{scene:P,camera:F}=A;P.add(N.group),F.near=.03,F.far=400,F.updateProjectionMatrix();let I=window.__app={engine:A,scene:P,camera:F,gpu:g,worldId:`rocha`,yachtOnly:!0,entranceYacht:N,waterEnabled:!1,terrainData:{surveyed:!1},freeCam:!1,input:new l(A.domElement),player:{position:new t,velocity:new t,yaw:0,pitch:0,mode:`walk`},fly:{yaw:0,pitch:0,velocity:new t}};
let storage;try{storage=window.sessionStorage;}catch{}
const daylight=I.daylight=createDaylight(m(16.2),N.group,storage);
let L,B,V,H,G,forward,pilotReady,fullLightRevision=0;
function applySun(){
  daylight.flush();
  if(fullLightRevision===daylight.revision)return;
  fullLightRevision=daylight.revision;
  L.sunDir.value.copy(daylight.world);r.sunDir.value.copy(daylight.world);
  V.invalidateStatic();applyFullBounce(N,daylight);
}
function prepareFullRenderer(){L=I.atmosphere=new c(A);const R=I.sky=new f(L);R.yachtDaylight=true;const z=daylight.world;L.sunDir.value.copy(z),r.sunDir.value.copy(z),r.sunColor.value.setRGB(3,2.9,2.7),r.skyIrradiance.value.setRGB(.25,.32,.45),r.exposure.value=.55,r.waterEnabled.value=0,r.antiAliasingQuality.value=1,r.atmosphereQuality.value=1;B=I.sceneRenderer=new u(A.meshRenderer,P,F);B.background=R.background;B.clearColor=[.67,.76,.84,1],B.waterEnabled=!1,B.refractionEnabled=!1;V=I.shadows=new o({size:2048,splits:[10,60,400],lightMargin:200,normalBias:[.015,.06,.3],bias:2e-5,cacheStatic:!0,skipUnused:!0});V.layerMask=1<<p.OPAQUE,N.invalidateShadows=()=>V.invalidateStatic();H=I.environment=new d(A,P,R);H.interval=1/0;let U=new i({name:`yacht air medium`,code:`fn underwaterMedium(uv:vec2f)->f32{return 0.0;}`}),W=new i({name:`yacht air composite`,code:`fn underwaterComposite(uv:vec2f,pixel:vec2f)->vec4f{return vec4f(postSceneSample(uv),1.0);}`});G=I.post=new h(A,{sceneRenderer:B,camera:F,underwater:{module:U,compositeModule:W}})}
if(pilot){
  const {createForwardRenderer}=await import('../mobile/forward-renderer.js?v=port-guest-1');
  forward=I.gangwayRenderer=await createForwardRenderer(I,daylight);
}else {
  await preloadYachtExteriors(N);
  prepareFullRenderer();
}
async function prepareWalkRenderer() {
  G?._build();
  if(!forward)await prepareYachtMeshes(I);
  await g.pipelinesReady();
  A.meshRenderer.precompiling=true;
  try { I.frame(0); } finally { A.meshRenderer.precompiling=false; }
  await g.pipelinesReady();
  if(!forward)await warmYachtViews(I);
  for(let i=0;i<2;i++){I.frame(0);await g.queue.onSubmittedWorkDone();}
  if(forward)await forward.prepareCurrentView();
  I.input.keys.clear();I.input.pressed.clear();I.input.look.x=I.input.look.y=0;
  meter?.reset();
}
let K=I.yachtWalk=new y(I,N);if(pilot){
  I.gangwayOnly=true;
  pilot.configureWalk(K);
  let loading;
  I.loadFullYacht=()=>loading??=(async()=>{
    const loader=document.getElementById('loader');
    A.stop();loader.hidden=false;loader.style.display='';
    try {
    await D('Preparando el recorrido completo…',.35);
    const full=x(M,await C(),{isolatedBerth:true});
    await preloadYachtExteriors(full);
    prepareFullRenderer();
    G._build();
    const current=K.nav.position.slice(),yaw=K.yaw,pitch=K.pitch;
    const upperState={deck:K.nav.deck,position:current,elevation:K.nav.elevation,stair:K.nav.stair?.route.id};
    const fromSun=upperState.deck==='SD'||upperState.stair==='sun';
    const fromAccess=upperState.stair==='bridge'||upperState.deck==='MD'&&K.nav.location()?.id==='MD_R07';
    const fromGuest=upperState.stair==='guest'||upperState.deck==='LD';
    const fromUpper=fromGuest||fromAccess||fromSun||upperState.deck==='UD'||upperState.stair==='aft';
    const fromBow=upperState.deck==='UD'&&!upperState.stair&&K.nav.location()?.id==='UD_R04';
    const fromBridge=upperState.deck==='UD'&&!upperState.stair&&K.nav.location()?.id==='UD_R03';
    const fromUpperInterior=upperState.deck==='UD'&&!upperState.stair&&K.nav.location()?.id==='UD_R02';
    const fromSwimAccess=K.nav.deck==='SP'||K.nav.stair?.route.id==='starboard-swim';
    const terraceSpawn=K.model.terrace.room.spawn.slice(0,2);
    const mainRoom=upperState.deck==='MD'&&!upperState.stair&&mainRooms.find(r=>r.id===K.nav.location()?.id);
    const fromSaloon=!mainRoom&&!fromUpper&&K.nav.deck==='MD'&&K.model.saloon&&current[0]>=8.4433;
    const saloonSpawn=K.model.saloon?.room.spawn.slice(0,2);
    const wasOpen=K.controls?.open;
    K.dispose();
    forward.dispose();forward=null;delete I.gangwayRenderer;A.setRenderScale(1);
    N.dispose();
    N=I.entranceYacht=full;
    P.add(N.group);
    N.invalidateShadows=()=>V.invalidateStatic();
    V.invalidateStatic();
    K=I.yachtWalk=new y(I,N);
    mountDaylightControls(daylight,K.controls?.menu);
    K.leave=({restore=true}={})=>{if(restore)K.enterRoom('boarding')};
    K.enterRoom('boarding');
    if(mainRoom)K.nav.enterRoom(mainRoom.id);
    else if(fromSaloon)K.nav.enterRoom('MD_R02');
    let destination=fromSwimAccess?terraceSpawn:current;
    if(mainRoom&&!K.nav.floorSafe(...destination))destination=K.nav.position.slice();
    else if(fromSaloon&&!K.nav.floorSafe(...destination))destination=saloonSpawn;
    if(fromUpper){
      (fromGuest?restoreGuestAccessHandoff:fromAccess?restoreBridgeAccessHandoff:fromSun?restoreSunHandoff:fromBow?restoreBowHandoff:fromBridge?restoreBridgeHandoff:fromUpperInterior?restoreUpperInteriorHandoff:restoreUpperHandoff)(K,upperState);
      K.yaw=yaw;K.pitch=pitch;F.rotation.set(pitch,yaw,0,'YXZ');
    }else if(K.nav.floorSafe(...destination)){
      if(fromSwimAccess)K.nav.enterRoom('MD_R01');
      K.nav.position=destination;
      K.nav.elevation=K.nav.floorHeight(...destination);
      K.nav.room=K.nav.location();
      K.applyPosition();
      K.yaw=yaw;K.pitch=pitch;F.rotation.set(pitch,yaw,0,'YXZ');
    }
    await D('Preparando luz y detalles…',.8);
    await prepareWalkRenderer();
    I.gangwayOnly=false;
    I.startupStats.geometry=N.stats;
    I.startupStats.mode='yacht-only';
    Object.assign(window.__mapsPublicStatus,I.startupStats);
    if(wasOpen)K.controls.openMenu();
    window.dispatchEvent(new Event('luz-de-mar:full-yacht'));
    } finally { loader.hidden=true;loader.style.display='none';A.start(dt=>I.frame(dt)); }
  })().catch(error=>{loading=null;throw error});
  pilot.addFullYachtControl(I);
  pilotReady=pilot.preloadSaloon(I);
}
mountDaylightControls(daylight,K.controls?.menu);
I.boardLuzDeMar=e=>K.enterRoom(e),K.enterRoom(!pilot&&E.has(`walk`)?v(N,E.get(`walk`)):`boarding`);let q=()=>K.enterRoom(`boarding`);K.leave=({restore:e=!0}={})=>{e&&q()},K.controls?.root.querySelector(`[data-leave]`)?.setAttribute(`aria-label`,`Volver a la pasarela`),I.leaveLuzDeMar=q;let J=document.createElement(`div`);J.className=`rocha-map-load tw-interactive`,J.innerHTML=`<style>.rocha-map-load{position:fixed;right:18px;top:18px;z-index:70;max-width:calc(100vw - 36px);font:14px system-ui;color:#efe9dd}.rocha-map-load button{padding:13px 18px;border:1px solid #bcae94;border-radius:12px;background:#f2e9d9;color:#423b31;font:600 14px system-ui;cursor:pointer}.rocha-map-load button:disabled{opacity:.7;cursor:wait}.rocha-map-load p{max-width:290px;padding:10px;background:#302e29;border-radius:8px}.rocha-map-load p:empty{display:none}@media(max-width:600px){.rocha-map-load{right:12px;top:max(12px,env(safe-area-inset-top))}.rocha-map-load button{padding:12px;font-size:12px}}</style><button type="button">Cargar mapa completo</button><p role="status" aria-live="polite"></p>`;const updatePose=mountWalkPose(J,F);let Y=J.querySelector(`button`),X=J.querySelector(`p`);Y.onclick=()=>{if(!Y.disabled){if(g.adapter.limits.maxSampledTexturesPerShaderStage<32){X.textContent=`Este dispositivo permite recorrer el yate. El mapa completo necesita una GPU compatible con 32 texturas por etapa.`;return}Y.disabled=!0,X.textContent=`Cargando Rocha completo…`;try{sessionStorage.setItem(S,JSON.stringify(b(K)))}catch{}location.assign(e(location.href))}};const meter=pilot?pilot.createFrameMeter(document.getElementById('fps')):null;
let Z=0,Q=0,holdingFrame=false;I.frame=e=>{
if(forward){
  const now=performance.now();
  I.gangwayBenchmark?.beforeFrame(now);
  // Acquire the encoder only when input or rendering records GPU work.
  g.beginFrame(false);K.update(e);const drawn=forward.present(e>0&&!I.gangwayBenchmark?.active);g.submit();I.input.endFrame();
  if(I.startupStats){
    updatePose(K);
    if(drawn){meter(now);I.gangwayBenchmark?.submitted(now);}
    else if(!holdingFrame)meter.reset();
    holdingFrame=!drawn;
  }
  return;
}
applySun();g.beginFrame(),r.time.value+=e,r.dt.value=e,a.fields.frameIndex.value=g.frame,K.update(e),N.updateVisibility(F,!0),G.beginFrame(),L.update(e,F.position.y),L.sunTransmittance&&(r.sunColor.value.copy(new n(...L.sunTransmittance).multiplyScalar(11)),r.skyIrradiance.value.setRGB(...L.skyIrradiance),r.horizonColor.value.setRGB(...L.horizon)),H.update(e),_(F),V.render(P,A.meshRenderer,V.update(F,r.sunDir.value)),B.render(),G.render(),G.endFrame(),g.submit(),I.input.endFrame();if(I.startupStats)updatePose(K);if(meter){if(I.startupStats)meter(performance.now());return}Z+=e,Q++,Z>.5&&(document.getElementById(`fps`).textContent=Math.round(Q/Z)+` fps`,Z=0,Q=0)},await D(`Preparando las zonas del recorrido…`,.65),await pilotReady,await D(`Preparando luz y antialiasing…`,.85),await prepareWalkRenderer();return document.getElementById(`loader`).hidden=!0,document.getElementById(`loader`).style.display=`none`,I.startupStats={mode:pilot?"gangway-only":"yacht-only",readyMs:performance.now()-T,geometry:N.stats,mapLoaded:!1},window.__mapsPublicStatus={status:`ready`,world:`Rocha`,mode:`yacht-only`,...I.startupStats},A.domElement.addEventListener(`click`,()=>I.input.requestLock()),A.start(e=>I.frame(e)),window.addEventListener(`pagehide`,()=>A.stop(),{once:!0}),I}export{T as startRochaYacht};
