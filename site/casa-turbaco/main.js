import * as T from './tidewater/engine/index.js';
import {Engine} from './tidewater/engine/Engine.js';
import {GPU} from './tidewater/engine/gpu/GPU.js';
import {FrameUniforms,G} from './tidewater/engine/render/Frame.js';
import {SunShadows} from './tidewater/engine/render/Shadows.js';
import {SceneRenderer} from './tidewater/engine/render/SceneRenderer.js';
import {ShaderModule} from './tidewater/engine/gpu/Shader.js';
import {SceneLighting} from './tidewater/materials/SceneLighting.js';
import {LocalLights} from './tidewater/materials/LocalLights.js';
import {Atmosphere,SUN_ILLUMINANCE} from './tidewater/sky/Atmosphere.js';
import {Sky,sunDirectionFromTime} from './tidewater/sky/Sky.js';
import {SkyProClouds} from './tidewater/sky/SkyProClouds.js';
import {Environment} from './tidewater/sky/Environment.js';
import {PostFX} from './tidewater/post/PostFX.js';
import {Underwater} from './tidewater/post/Underwater.js';
import {AirHaze} from './tidewater/post/AirHaze.js';
import {Input} from './tidewater/core/Input.js';
import {FlyCamera} from './tidewater/player/FlyCamera.js';
import {updateCameraVelocity} from './tidewater/post/CameraVelocity.js';
import {buildHouse,makeVegetation,pt} from './model.js';
import {ScenePointerControls} from './camera-controls.js';

const $=s=>document.getElementById(s),reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
const state={mode:'orbit',time:16.2,interior:false,tour:false,ready:false,sound:false,orbit:{az:.72,el:.64,distance:46,target:new T.Vector3(0,0,-1)},transition:null};
let app,toastTimer,tourElapsed=0,audioCtx,audioTimer;
const data=await fetch('plan-data.json').then(r=>{if(!r.ok)throw Error('No se pudo cargar el plano');return r.json()});
function toast(text){$('toast').textContent=text;$('toast').classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('toast').classList.remove('visible'),3500)}
function progress(n,text){$('load-bar').style.width=n*100+'%';$('load-text').textContent=text}
function formatTime(t){const m=Math.round(t*60);return `${Math.floor(m/60).toString().padStart(2,'0')}:${(m%60).toString().padStart(2,'0')}`}
function updateTime(t){state.time=t;$('sun-time').value=t;const s=formatTime(t);$('time-label').textContent=s;$('sun-output').textContent=s}
function stopTour(){state.tour=false;$('tour-btn').classList.remove('active');$('tour-btn').setAttribute('aria-pressed','false');$('tour-text').textContent='Paseo'}
function invalidateView(){if(!app?.post)return;app.post._hasPrev=false;app.post.motionBlur._hasPrev=false;app.post.taau._needsRestart=true;app.haze._histValid=false;app.clouds.resetHistory();}
function setRoof(v){state.interior=v;if(app?.house)app.house.roofs.visible=!v;invalidateView();$('roof-text').textContent=v?'Ver cubiertas':'Ver interior';$('roof-btn').classList.toggle('active',v);$('roof-btn').setAttribute('aria-pressed',String(v))}
function setMode(mode){if(!state.ready){toast('La escena se está preparando');return}stopTour();state.mode=mode;state.transition=null;document.body.classList.add('exploring');for(const m of ['orbit','walk','top'])$(m+'-btn').classList.toggle('active',mode===m);$('touch-controls').hidden=mode!=='walk'||!matchMedia('(pointer:coarse)').matches;
 if(mode==='walk'){const p=pt(469,490);const pos=new T.Vector3(p[0],1.68,p[1]);app.fly.setPose(pos,0,0);app.fly.velocity.set(0,0,0);state.walkSpawn=pos.clone();$('hint').textContent='W A S D PARA CAMINAR · MUEVE EL RATÓN PARA MIRAR · ESC PARA PAUSAR';$('view-name').textContent='A la altura de los ojos';toast('WASD para caminar · Mueve el ratón para mirar');}
 else if(mode==='top'){setRoof(true);state.orbit.target.set(0,0,0);state.orbit.distance=52;state.orbit.el=1.565;state.orbit.az=0;$('hint').textContent='RUEDA PARA ACERCAR · SELECCIONA UN ESPACIO EN EL PLANO';$('view-name').textContent='Planta arquitectónica';}
 else {state.orbit.target.set(0,0,-1);state.orbit.distance=46;state.orbit.el=.64;state.orbit.az=.72;$('hint').textContent='MUEVE EL RATÓN PARA GIRAR · RUEDA PARA ACERCAR · ESC PARA PAUSAR';$('view-name').textContent='Perspectiva del jardín';}invalidateView();
}
function visitRoom(room){if(!state.ready){toast('La escena necesita WebGPU para recorrerla');return}setMode('walk');setRoof(true);const [a,b,c,d]=room.rect;let x=(a+c)/2,z=(b+d)/2;if(blocked(x,z)){const spots=[];for(let px=a+.3;px<c-.3;px+=.18)for(let pz=b+.3;pz<d-.3;pz+=.18)if(!blocked(px,pz))spots.push([px,pz,Math.hypot(px-x,pz-z)]);spots.sort((a,b)=>a[2]-b[2]);if(spots.length)[x,z]=spots[0];}app.fly.setPose(new T.Vector3(x,1.68,z),room.id==='principal'?-Math.PI/2:0,-.04);invalidateView();$('plan-panel').hidden=true;$('view-name').textContent=room.name;toast(room.name+' · '+room.area.toLocaleString('es-CO')+' m² aprox.');}
for(const r of data.rooms){const b=document.createElement('button');b.innerHTML=`<span>${r.name}</span><small>${r.area.toLocaleString('es-CO')} m² aprox. ↗</small>`;b.onclick=()=>visitRoom(r);$('room-list').appendChild(b)}
for(const m of ['orbit','walk','top'])$(m+'-btn').onclick=()=>setMode(m);
$('roof-btn').onclick=()=>{setRoof(!state.interior);document.body.classList.add('exploring')};
$('map-btn').onclick=()=>$('plan-panel').hidden=!$('plan-panel').hidden;
$('settings-btn').onclick=()=>{const v=!$('settings').hidden;$('settings').hidden=v;$('settings-btn').setAttribute('aria-expanded',String(!v))};
for(const b of document.querySelectorAll('[data-close]'))b.onclick=()=>{$(b.dataset.close).hidden=true;if(b.dataset.close==='settings')$('settings-btn').setAttribute('aria-expanded','false')};
$('info-btn').onclick=()=>$('info').showModal();$('info-close').onclick=()=>$('info').close();$('info').onclick=e=>{if(e.target===$('info')){const r=$('info').getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)$('info').close()}};
$('fullscreen-btn').onclick=async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else await document.documentElement.requestFullscreen()}catch{toast('Usa la opción de pantalla completa de tu navegador')}};
$('sun-time').oninput=e=>updateTime(Number(e.target.value));
$('wind').oninput=e=>{if(app)G.windSpeed.value=Number(e.target.value);$('wind-output').textContent=e.target.value<3?'Calma':e.target.value<7?'Suave':'Intensa'};
$('cloud-cover').oninput=e=>{if(app)app.clouds.coverage.value=Number(e.target.value);$('cloud-output').textContent=e.target.value<.25?'Despejado':e.target.value<.6?'Parcial':'Cubierto'};
$('quality').onchange=e=>{if(app){const q=Number(e.target.value);app.post.setScale(q);app.clouds.resolutionScale=q;app.planting.veg.setQualityLevel(q<.7?.5:1);invalidateView();toast('Calidad gráfica actualizada')}};
$('tour-btn').onclick=()=>{if(!state.ready)return;const start=!state.tour;if(start){setMode('orbit');state.tour=true;tourElapsed=0;$('tour-btn').classList.add('active');$('tour-btn').setAttribute('aria-pressed','true');$('tour-text').textContent='Pausar';$('view-name').textContent='Paseo por el jardín';document.body.classList.add('exploring');}else stopTour()};
for(const b of document.querySelectorAll('[data-key]')){b.onpointerdown=e=>{e.preventDefault();b.setPointerCapture(e.pointerId);app?.input.keys.add(b.dataset.key)};b.onpointerup=b.onpointercancel=()=>app?.input.keys.delete(b.dataset.key)}
window.addEventListener('keydown',e=>{if(e.code==='Escape'){const open=!$('settings').hidden||!$('plan-panel').hidden||$('info').open;$('settings').hidden=true;$('plan-panel').hidden=true;stopTour();if(!open)app?.controls?.setEnabled(!app.controls.enabled);}if(e.target.tagName==='INPUT'||e.target.tagName==='SELECT')return;if(e.code==='KeyH'&&state.ready)setRoof(!state.interior);if(e.code==='KeyP')$('plan-panel').hidden=!$('plan-panel').hidden;if(e.code==='KeyR'&&state.ready)setMode('orbit')});

// Procedural garden soundscape. Starts only after an explicit click.
$('sound-btn').onclick=async()=>{if(!audioCtx){audioCtx=new AudioContext();const buffer=audioCtx.createBuffer(1,audioCtx.sampleRate*3,audioCtx.sampleRate),v=buffer.getChannelData(0);for(let i=0;i<v.length;i++)v[i]=(Math.random()*2-1)*.15;const src=audioCtx.createBufferSource();src.buffer=buffer;src.loop=true;const filter=audioCtx.createBiquadFilter();filter.type='lowpass';filter.frequency.value=650;const gain=audioCtx.createGain();gain.gain.value=.12;src.connect(filter).connect(gain).connect(audioCtx.destination);src.start();audioTimer=setInterval(()=>{if(audioCtx.state!=='running')return;const t=audioCtx.currentTime;for(let i=0;i<3;i++){const o=audioCtx.createOscillator(),g=audioCtx.createGain();o.type='sine';o.frequency.setValueAtTime(1800+Math.random()*1200,t+i*.15);o.frequency.exponentialRampToValueAtTime(3500+Math.random()*1100,t+i*.15+.07);g.gain.setValueAtTime(0,t+i*.15);g.gain.linearRampToValueAtTime(.012,t+i*.15+.015);g.gain.exponentialRampToValueAtTime(.0001,t+i*.15+.12);o.connect(g).connect(audioCtx.destination);o.start(t+i*.15);o.stop(t+i*.15+.13)}},3900)}state.sound=!state.sound;if(state.sound)await audioCtx.resume();else await audioCtx.suspend();$('sound-btn').textContent=state.sound?'Desactivar ♫':'Activar ♫';$('sound-btn').setAttribute('aria-pressed',String(state.sound))};

function drawMapTo(c){const ctx=c.getContext('2d'),w=c.width,to=(x,z)=>[(x+25)/50*w,(z+25)/50*w];ctx.clearRect(0,0,w,w);ctx.fillStyle='#e3e5d2';ctx.fillRect(0,0,w,w);ctx.strokeStyle='#c3ccb8';ctx.lineWidth=1;for(let i=1;i<5;i++){ctx.beginPath();ctx.moveTo(i*w/5,0);ctx.lineTo(i*w/5,w);ctx.moveTo(0,i*w/5);ctx.lineTo(w,i*w/5);ctx.stroke()}
 ctx.strokeStyle='#a3b392';ctx.beginPath();data.boundary.forEach((p,i)=>{const q=to(...p);i?ctx.lineTo(...q):ctx.moveTo(...q)});ctx.closePath();ctx.stroke();
 for(const r of data.rooms){const [a,b,c,d]=r.rect,p=to(a,b),q=to(c,d);ctx.fillStyle=r.kind==='privada'?'#c4c6a7':r.kind==='servicio'?'#b9c2b0':'#d3ccb3';ctx.fillRect(...p,q[0]-p[0],q[1]-p[1]);}
 ctx.fillStyle='#72a99a';ctx.beginPath();data.pool.forEach((p,i)=>{const q=to(...p);i?ctx.lineTo(...q):ctx.moveTo(...q)});ctx.closePath();ctx.fill();ctx.strokeStyle='#7a866b';ctx.lineWidth=.8;for(const wall of data.walls){ctx.beginPath();ctx.moveTo(...to(...wall.a));ctx.lineTo(...to(...wall.b));ctx.stroke()}
 ctx.fillStyle='#7e946b';for(const [px,py] of [[440,43],[502,43],[620,35],[681,83],[366,511],[429,530],[508,530]]){const p=to(...pt(px,py));ctx.beginPath();ctx.arc(...p,6,0,Math.PI*2);ctx.fill()}
 ctx.font='10px Arial';ctx.fillStyle='#53694f';ctx.fillText('50 m',4,12);ctx.fillText('↑',w-17,15);
 if(app){const p=app.engine.camera.position,q=to(p.x,p.z);ctx.save();ctx.translate(...q);ctx.rotate(-app.cameraYaw);ctx.fillStyle='#285443';ctx.beginPath();ctx.moveTo(0,-6);ctx.lineTo(4,5);ctx.lineTo(0,3);ctx.lineTo(-4,5);ctx.closePath();ctx.fill();ctx.restore();}
}
function drawMap(){for(const id of ['mini','public-plan']){const canvas=$(id);if(canvas)drawMapTo(canvas)}}
drawMap();

function blocked(x,z){if(Math.abs(x)>24.4||Math.abs(z)>24.4)return true;for(const w of app.house.collision){const [a,b]=[w.a,w.b],dx=b[0]-a[0],dz=b[1]-a[1];const t=Math.max(0,Math.min(1,((x-a[0])*dx+(z-a[1])*dz)/(dx*dx+dz*dz)));if(Math.hypot(x-a[0]-dx*t,z-a[1]-dz*t)<.19+w.width*.5)return true}
 const pp=data.pool;let inside=false;for(let i=0,j=pp.length-1;i<pp.length;j=i++){const [a,b]=[pp[i],pp[j]];if((a[1]>z)!==(b[1]>z)&&x<(b[0]-a[0])*(z-a[1])/(b[1]-a[1])+a[0])inside=!inside}return inside;
}

async function init(){
 if(!navigator.gpu)throw Error('Este navegador no tiene WebGPU. Abre la escena en Chrome, Edge o Safari recientes, con aceleración gráfica.');
 progress(.08,'Encendiendo el motor de Tidewater…');const engine=new Engine($('app'));await engine.init();engine.renderOptimizations.framePacing=true;engine.camera.near=.08;engine.camera.far=1600;engine.camera.updateProjectionMatrix();
 app={engine,scene:engine.scene,camera:engine.camera,cameraYaw:0};window.turbaco={app,state,data};
 const {scene,camera}=engine;G.waterEnabled.value=0;G.seaLevel.value=-30;G.cameraWaterHeight.value=-30;G.exposure.value=.55;G.windSpeed.value=reduced?1:4;
 await new Promise(r=>requestAnimationFrame(r));
 progress(.18,'Formando el cielo y las nubes…');const atmosphere=app.atmosphere=new Atmosphere(engine),sky=app.sky=new Sky(atmosphere);const clouds=app.clouds=new SkyProClouds(engine,atmosphere);await clouds.ready;clouds.coverage.value=.38;sky.clouds=clouds;
 const shadows=app.shadows=new SunShadows({size:2048,splits:[12,45,140],lightMargin:45,normalBias:[.012,.035,.12],bias:.00002});shadows.layerMask=1;shadows.periods=[1,1,1];
 const environment=app.environment=new Environment(engine,scene,sky);
 SceneLighting.set('directModulation',new ShaderModule({name:'TurbacoCloudShadows',deps:[clouds.shadowModule],code:'fn hookDirectModulation(P:vec3f,N:vec3f)->vec3f{return vec3f(cloudsShadow(P.xz));}'}));
 SceneLighting.set('bounce',new ShaderModule({name:'TurbacoGroundBounce',code:'fn hookBounce(P:vec3f,N:vec3f)->vec3f{return frame.sunColor*vec3f(.032,.033,.018)*max(0.0,.4-N.y*.4)*max(frame.sunDir.y,0.0);}'}));
 const lights=app.lights=new LocalLights();
 progress(.32,'Levantando los muros a 2,70 metros…');await new Promise(r=>requestAnimationFrame(r));app.house=buildHouse(scene,data,sky,lights);
 progress(.47,'Plantando palmeras y jardines…');await new Promise(r=>requestAnimationFrame(r));app.planting=makeVegetation(scene,data);
 const sr=app.sr=new SceneRenderer(engine.meshRenderer,scene,camera);sr.background=sky.background;sr.waterEnabled=false;sr.refractionEnabled=false;
 const query={module:new ShaderModule({name:'TurbacoDryWaterQuery',code:'fn waterQueryCameraState()->vec4f{return vec4f(-30.0,0.0,0.0,0.0);} fn waterQueryHeightAtXZ(xz:vec2f)->f32{return -30.0;}'})};
 const uw=app.uw=new Underwater({depthTexture:sr.sceneRT.depthTexture,maskTexture:sr.waterMaskTexture,query,caustics:null});uw.enabled.value=0;uw.shafts.value=0;
 // This is a land-only camera. Keep the original camera uniform contract for
 // aerial haze without allocating underwater samplers or underwater shafts.
 uw._module=new ShaderModule({name:'TurbacoAirCamera',uniforms:uw.uniforms,uniformName:'underwaterParams',code:`
 fn underwaterViewZ(d:f32)->f32{return -underwaterParams.proj.z/max(d,1e-9);}
 fn underwaterViewRay(uv:vec2f)->vec3f{return vec3f((uv.x*2.0-1.0)/underwaterParams.proj.x,(1.0-uv.y*2.0)/underwaterParams.proj.y,-1.0);}
 fn underwaterWorldDir(uv:vec2f)->vec3f{return normalize((underwaterParams.camWorld*vec4f(underwaterViewRay(uv),0.0)).xyz);}
 fn underwaterMedium(uv:vec2f)->f32{return 0.0;}`});
 uw._compositeModule=new ShaderModule({name:'TurbacoAirComposite',deps:[uw._module],code:'fn underwaterComposite(uv:vec2f,pixel:vec2f)->vec4f{return vec4f(postSceneSample(uv),1.0);}'});
 uw.renderShafts=null;
 const haze=app.haze=new AirHaze({depthTexture:sr.sceneRT.depthTexture,underwater:uw,atmosphere,sky,clouds,csm:shadows});haze.density.value=.8;
 const post=app.post=new PostFX(engine,{sceneRenderer:sr,camera,underwater:uw,clouds,sunDir:atmosphere.sunDir,haze});post.params.vignette.value=.17;post.params.grain.value=0;post.params.bloom.value=.065;
 // The compact architectural map is rendered at native resolution. Spatial
 // SMAA keeps stationary edges still rather than shifting subpixel geometry
 // each frame; fixed AO samples pair with the stable shadow filter.
 post.aaMode='smaa';post.aoPass.useTemporalFiltering=false;post.setScale(1);
 app.input=new Input(engine.domElement);app.fly=new FlyCamera(camera,engine.domElement,app.input);app.fly.speed=2.5;
 app.controls=new ScenePointerControls({canvas:engine.canvas,input:app.input,state,
  isBlocked:()=>!$('settings').hidden||!$('plan-panel').hidden||$('info').open,
  onInteract:()=>{document.body.classList.add('exploring');stopTour()},
  onPauseChange:on=>{$('look-btn').textContent=on?'Activado':'Pausado';$('look-btn').setAttribute('aria-pressed',String(on));if(state.mode!=='top')$('hint').textContent=on?'MUEVE EL RATÓN PARA MIRAR · ESC PARA PAUSAR':'CÁMARA PAUSADA · CLIC EN EL MAPA PARA VOLVER A MIRAR';}
 });
 $('look-btn').onclick=()=>app.controls.setEnabled(!app.controls.enabled);
 engine.canvas.addEventListener('wheel',e=>{if(state.mode!=='walk'){state.orbit.distance=Math.max(5,Math.min(80,state.orbit.distance*Math.exp(e.deltaY*.001)));document.body.classList.add('exploring');stopTour();}},{passive:true});
 progress(.65,'Afinando luz, sombras y reflejos…');post._build();post._outW=0;await GPU.pipelinesReady();
 function frame(dt){GPU.beginFrame();FrameUniforms.fields.frameIndex.value=GPU.frame;G.time.value+=dt;G.dt.value=dt;
  if(state.tour){tourElapsed+=dt;state.orbit.az=.72+tourElapsed*.045;state.orbit.el=.52+Math.sin(tourElapsed*.055)*.14;state.orbit.distance=39+Math.sin(tourElapsed*.04)*4;}
  if(state.mode==='walk'){
   const before=camera.position.clone();app.fly.update(dt);const after=camera.position.clone();camera.position.y=1.68;
   if(blocked(after.x,before.z)){camera.position.x=before.x;app.fly.velocity.x=0;}if(blocked(camera.position.x,after.z)){camera.position.z=before.z;app.fly.velocity.z=0;}
   app.cameraYaw=app.fly.yaw;
  }else{const o=state.orbit;const desired=new T.Vector3(o.target.x+Math.sin(o.az)*Math.cos(o.el)*o.distance,o.target.y+Math.sin(o.el)*o.distance,o.target.z+Math.cos(o.az)*Math.cos(o.el)*o.distance);if(!state.ready||reduced)camera.position.copy(desired);else camera.position.lerp(desired,1-Math.exp(-dt*6));camera.lookAt(o.target);app.cameraYaw=o.az;app.input.consumeLook();}
  const dir=sunDirectionFromTime(state.time);atmosphere.sunDir.value.copy(dir);const night=T.MathUtils.smoothstep(-dir.y,.02,.18);G.night.value=night;sky.starIntensity.value=night;const moon=new T.Vector3(-dir.x,Math.abs(dir.y)*.8+.25,-dir.z).normalize();sky.moonDir.value.copy(moon);G.sunDir.value.copy(dir.y>-.07?dir:moon);
  atmosphere.update(dt,camera.position.y);if(atmosphere.sunTransmittance){const a=atmosphere,T0=a.sunTransmittance,fade=T.MathUtils.smoothstep(dir.y,-.03,.02);if(dir.y>-.07)G.sunColor.value.setRGB(T0[0],T0[1],T0[2]).multiplyScalar(SUN_ILLUMINANCE*fade);else G.sunColor.value.setRGB(.6,.7,1).multiplyScalar(.12*night);const ir=a.skyIrradiance;G.skyIrradiance.value.setRGB(ir[0]+night*.007,ir[1]+night*.008,ir[2]+night*.012);G.horizonColor.value.setRGB(...a.horizon);}
  clouds.update(dt,camera);environment.update(dt);app.planting.veg.update(dt,camera);lights.update(camera,dt);for(const m of app.house.lamps)m.emissiveIntensity=.02+night*3.5;
  post.motionBlur.shutter.value=0;updateCameraVelocity(camera);uw.updateCamera(camera);post.flare.setDepthHeight(sr.sceneRT.height);post.flare.update(camera,dt,{aboveWater:true});post.beginFrame();shadows.render(scene,engine.meshRenderer,shadows.update(camera,G.sunDir.value));sr.render();post.flare.kernel.dispatch(1);post.render();post.endFrame();GPU.submit();app.input.endFrame();
  app.frames=(app.frames||0)+1;if(app.frames%12===0){drawMap();if(state.mode==='walk'){const p=camera.position,r=data.rooms.find(r=>p.x>r.rect[0]&&p.x<r.rect[2]&&p.z>r.rect[1]&&p.z<r.rect[3]);$('space-label').hidden=!r;if(r)$('space-label').textContent=r.name;}else $('space-label').hidden=true;}
 }
 app.frame=frame;
 engine.meshRenderer.precompiling=true;frame(1/60);engine.meshRenderer.precompiling=false;progress(.84,'Preparando el recorrido…');await GPU.pipelinesReady();await GPU.queue.onSubmittedWorkDone();frame(1/60);await GPU.pipelinesReady();
 progress(1,'Bienvenido a Casa Turbaco.');state.ready=true;setRoof(false);engine.start(dt=>{try{frame(dt)}catch(e){engine.stop();console.error(e);toast('La escena se interrumpió. Recarga para volver a entrar.')}});
 $('loading').classList.add('done');setTimeout(()=>$('loading').hidden=true,1100);
 document.addEventListener('visibilitychange',()=>{if(document.hidden){engine.stop();audioCtx?.suspend();}else{engine.start(dt=>frame(dt));if(state.sound)audioCtx?.resume()}});
}
try{await init()}catch(e){console.error(e);progress(0,'');$('loading').innerHTML='<div class="load-brand">T / C</div><h1>Tu casa,<br><i>en el plano.</i></h1><p style="max-width:330px;text-align:center;line-height:1.8;padding:0 15px">'+e.message+'</p><button id="fallback-plan" style="padding:13px 22px;background:#e8ead8;border:0;border-radius:7px;color:#254333">Explorar la planta del modelo ↗</button>';$('fallback-plan').onclick=()=>{$('loading').hidden=true;$('plan-panel').hidden=false;document.body.style.background='#e9e9df'};for(const id of ['orbit-btn','walk-btn','top-btn','roof-btn','tour-btn'])$(id).disabled=true;}
