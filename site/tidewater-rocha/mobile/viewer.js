import {WebGPURenderer, PerspectiveCamera, PCFShadowMap, NeutralToneMapping} from './renderer.js';
import {loadExterior, createScene} from './scene.js';

const el = id => document.getElementById(id);
const clamp = (v,min,max) => Math.max(min,Math.min(max,v));
const canvas = el('scene');
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
let renderer, running = false;

function failure(message) {
  running = false;
  el('controls').hidden = true;
  el('loading').hidden = false;
  el('loadText').textContent = message;
  el('retry').hidden = false;
}

async function start() {
  renderer = new WebGPURenderer({canvas, antialias:true, alpha:false, powerPreference:'default'});
  const [, exterior] = await Promise.all([renderer.init(),loadExterior()]);
  const {scene, clock} = await createScene(exterior);
  renderer.toneMapping = NeutralToneMapping;
  renderer.toneMappingExposure = .98;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = PCFShadowMap;
  scene.traverse(light => {
    if (light.isDirectionalLight) { light.shadow.autoUpdate = false; light.shadow.needsUpdate = true; }
  });
  const nav = exterior.nav;
  const camera = new PerspectiveCamera(60,1,.08,350);
  const keys = new Set();
  const stick = el('stick'), nub = el('nub'), tourButton = el('tour');
  const state = {x:nav.center,z:nav.start,yaw:Math.PI-.12,pitch:-.09,forward:0,side:0};
  let stickId = null, look = null, tour = null, frameId = 0, lastTime = 0, lastReport = 0;
  let pixelRatio = 1, quality = 1, elapsed = 0, intervals = [], qualityAge = 0, updateAge = 0;
  let cssWidth = 0, cssHeight = 0;
  function size() {
    cssWidth = canvas.clientWidth; cssHeight = canvas.clientHeight;
    if (!cssWidth || !cssHeight) return;
    const screenRatio = Math.min(devicePixelRatio || 1, 1.55, Math.sqrt(780000/(cssWidth*cssHeight)));
    pixelRatio = screenRatio*quality;
    renderer.setPixelRatio(pixelRatio);
    renderer.setSize(cssWidth,cssHeight,false);
    camera.aspect = cssWidth/cssHeight;
    camera.fov = camera.aspect < .8 ? 71 : 58;
    camera.updateProjectionMatrix();
    el('resolution').textContent = canvas.width+' × '+canvas.height;
  }
  function height(z) {
    const profile = nav.heights;
    for (let i = 1; i < profile.length; i++) {
      const [end,h] = profile[i], [begin,prev] = profile[i-1];
      if (z <= end) return prev + (h-prev)*clamp((z-begin)/(end-begin),0,1);
    }
    return profile.at(-1)[1];
  }
  let eyeY = height(state.z)+1.52;
  function pose(dt) {
    eyeY += (height(state.z)+1.52-eyeY)*(1-Math.exp(-15*dt));
    camera.position.set(state.x,eyeY,state.z);
    camera.rotation.set(state.pitch,state.yaw,0,'YXZ');
  }
  function endTour() {tour=null; tourButton.textContent='Recorrer';}
  function release() {
    keys.clear(); stickId=null; look=null; state.forward=state.side=0;
    nub.style.transform='';
  }
  const clearHint = () => {el('hint').hidden=true;};
  function moveStick(e) {
    const r=stick.getBoundingClientRect(), radius=r.width*.34;
    let x=(e.clientX-r.left-r.width/2)/radius, y=(e.clientY-r.top-r.height/2)/radius;
    const scale=Math.max(1,Math.hypot(x,y)); x/=scale; y/=scale;
    state.forward=-y; state.side=x; nub.style.transform='translate('+x*radius+'px,'+y*radius+'px)';
  }
  stick.addEventListener('pointerdown',e=>{
    if(stickId!==null)return;
    stickId=e.pointerId; stick.setPointerCapture(stickId); clearHint(); endTour(); moveStick(e);
  });
  stick.addEventListener('pointermove',e=>{if(e.pointerId===stickId)moveStick(e);});
  const releaseStick=e=>{
    if(e.pointerId!==stickId)return;
    stickId=null;state.forward=state.side=0;nub.style.transform='';
  };
  for(const type of ['pointerup','pointercancel','lostpointercapture'])stick.addEventListener(type,releaseStick);
  canvas.addEventListener('pointerdown',e=>{
    if(look || (e.pointerType==='mouse' && e.button!==0))return;
    look={id:e.pointerId,x:e.clientX,y:e.clientY};canvas.setPointerCapture(e.pointerId);
    canvas.focus({preventScroll:true});clearHint(); endTour();
  });
  canvas.addEventListener('pointermove',e=>{
    if(look?.id!==e.pointerId)return;
    const speed=2.2/Math.max(330,Math.min(cssWidth,cssHeight));
    state.yaw-=(e.clientX-look.x)*speed;
    state.pitch=clamp(state.pitch-(e.clientY-look.y)*speed,-1.15,1.10);
    look.x=e.clientX;look.y=e.clientY;
  });
  for(const type of ['pointerup','pointercancel','lostpointercapture'])canvas.addEventListener(type,e=>{if(look?.id===e.pointerId)look=null;});
  const walkKeys=['KeyW','KeyS','KeyA','KeyD','ArrowUp','ArrowDown','ArrowLeft','ArrowRight'];
  window.addEventListener('keydown', e=>{
    if(e.altKey || e.ctrlKey || e.metaKey || !walkKeys.includes(e.code))return;
    e.preventDefault(); endTour();clearHint(); keys.add(e.code);
  });
  window.addEventListener('keyup',e=>keys.delete(e.code));
  window.addEventListener('blur',release);
  el('reset').addEventListener('click',()=>{
    endTour();release();Object.assign(state,{x:nav.center,z:nav.start,yaw:Math.PI-.12,pitch:-.09});eyeY=height(nav.start)+1.52;
  });
  tourButton.addEventListener('click',()=>{
    if(tour){endTour();return;}
    release();clearHint();
    const outbound=state.z<nav.max-.16;
    const target=outbound?nav.max:nav.start;
    const heading=outbound?Math.PI+.09:0;
    tour={progress:0,duration:Math.max(2.5,Math.abs(target-state.z)/1.05+1),z:state.z,x:state.x,yaw:state.yaw,pitch:state.pitch,target,
      turn:Math.atan2(Math.sin(heading-state.yaw),Math.cos(heading-state.yaw))};
    tourButton.textContent='Detener';
  });
  function update(dt) {
    if(tour){
      tour.progress=Math.min(1,tour.progress+dt/tour.duration);
      const t=tour.progress, eased=t*t*(3-2*t);
      state.z=tour.z+(tour.target-tour.z)*eased;state.x=tour.x+(nav.center-tour.x)*eased;
      const aim=Math.min(1,t*3), blend=aim*aim*(3-2*aim);
      state.yaw=tour.yaw+tour.turn*blend; state.pitch=tour.pitch+(-.055-tour.pitch)*blend;
      if(t===1)endTour();
    }else{
      const has=(a,b)=>Number(keys.has(a)||keys.has(b));
      const f=state.forward+has('KeyW','ArrowUp')-has('KeyS','ArrowDown');
      const s=state.side+has('KeyD','ArrowRight')-has('KeyA','ArrowLeft');
      const step=dt*1.55/Math.max(1,Math.hypot(f,s));
      state.x=clamp(state.x+(-Math.sin(state.yaw)*f+Math.cos(state.yaw)*s)*step,nav.center-nav.halfWidth,nav.center+nav.halfWidth);
      state.z=clamp(state.z+(-Math.cos(state.yaw)*f-Math.sin(state.yaw)*s)*step,nav.min,nav.max);
    }
    pose(dt);
  }
  function frame(now) {
    if(!running || document.hidden)return;
    const ms=lastTime?now-lastTime:0;
    lastTime=now;
    const dt=Math.min(ms/1000,.065);
    if(ms>0){
      intervals.push(ms);if(intervals.length>150)intervals.shift();
      qualityAge+=ms;updateAge+=ms;
    }
    update(dt);elapsed+=dt;
    clock.value=reduced.matches?0:elapsed;
    renderer.render(scene,camera);
    if(intervals.length>=12 && now-lastReport>650){
      lastReport=now;
      const sorted=intervals.slice().sort((a,b)=>a-b);
      const mean=intervals.reduce((a,b)=>a+b,0)/intervals.length;
      el('fps').textContent=Math.round(1000/mean)+' FPS';
      el('p95').textContent=sorted[Math.ceil(sorted.length*.95)-1].toFixed(1)+' ms';
      if(qualityAge>4500 && updateAge>1800){
        let next=quality;
        if(sorted[Math.floor(sorted.length*.75)]>35)next=Math.max(.65,quality-.10);
        else if(qualityAge>9000 && sorted[Math.floor(sorted.length*.90)]<19)next=Math.min(1,quality+.05);
        updateAge=0;
        if(next!==quality){quality=next;qualityAge=0;size();}
      }
    }
    frameId=requestAnimationFrame(frame);
  }
  function visibility(){
    cancelAnimationFrame(frameId); release();
    lastTime=0;intervals=[];qualityAge=updateAge=0;
    if(!document.hidden&&running)frameId=requestAnimationFrame(frame);
  }
  document.addEventListener('visibilitychange',visibility);
  new ResizeObserver(size).observe(canvas);
  size();pose(1);
  renderer.onDeviceLost=()=>failure('Se interrumpió la vista 3D. Recarga para volver a la pasarela.');
  await renderer.compileAsync(scene,camera);
  renderer.render(scene,camera);
  await new Promise(requestAnimationFrame);
  el('ready').textContent=(performance.now()/1000).toFixed(1)+' s';
  el('backend').textContent=renderer.backend.isWebGPUBackend?'WebGPU':'WebGL 2';
  el('loading').hidden=true;el('controls').hidden=false;
  running=true;visibility();
}
start().catch(error=>{
  console.error('Gangway initialization',error);
  failure('No se pudo iniciar la pasarela en este navegador.');
});
