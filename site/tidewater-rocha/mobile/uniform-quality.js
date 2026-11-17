import {decodeRenderProfiles} from './render-profiles.js?v=uniform-quality-1';

export const uniformVersion='uniform-quality-1';
// The controlled comparison failed the 25 ms/5% gates. Keep this experiment
// opt-in until it qualifies; never change quality in response to live FPS.
export const uniformDefault=false;
export const uniformWarmViews=[
  {eye:[1,3.1,5.55],target:[9,0,4.7]},
  {eye:[10,1.95,5.55],target:[14,0,4.7]},
  {eye:[11,0,7.6],target:[19,0,7]},
  {eye:[20,0,7.6],target:[23,0,7]},
  {eye:[14.6,-.3,9.8],target:[18,0,9]},
  {eye:[26.8,0,7.6],target:[19,0,7]},
  {eye:[16.8,-.1,3.15],target:[13.5,-.1,2.6]},
];

export function decodeUniformQuality(manifest,buffer,guest) {
  if(manifest.version!==uniformVersion||!guest?.manifestSHA256||
    manifest.guestSHA256!==guest.manifestSHA256||manifest.sourceSHA256!==guest.sourceSHA256)
    throw Error('La calidad uniforme no corresponde a esta versión del recorrido');
  return {...manifest,profiles:decodeRenderProfiles(manifest,buffer,['uniform'],{uniform:40000})};
}

export async function loadUniformQuality(guest,{signal,fetcher=globalThis.fetch.bind(globalThis),timeoutMs=45000}={}) {
  const abort=new AbortController(),cancel=()=>abort.abort();
  signal?.addEventListener('abort',cancel,{once:true});if(signal?.aborted)cancel();
  const timer=setTimeout(cancel,timeoutMs);
  try {
    const responses=await Promise.all(['json','bin'].map(ext=>fetcher(new URL(`./uniform-quality.${ext}?v=${uniformVersion}`,import.meta.url),{signal:abort.signal})));
    if(responses.some(r=>!r.ok))throw Error('No se pudo cargar la calidad uniforme');
    const [manifest,buffer]=await Promise.all([responses[0].json(),responses[1].arrayBuffer()]);
    return decodeUniformQuality(manifest,buffer,guest);
  } finally {clearTimeout(timer);signal?.removeEventListener('abort',cancel);abort.abort();}
}

export function preloadUniformQuality(app) {
  const model=app.entranceYacht;
  // Diagnostic comparison only; no automatic quality changes while walking.
  const requested=win=>new URL(win.location.href).searchParams.get('quality');
  let quality=requested(window);try{quality ||= requested(window.parent);}catch{}
  const disabled=quality==='profiles'||quality!=='uniform'&&!uniformDefault;
  if(disabled){model.uniformLoadState='disabled';return;}
  if(model.loadUniformQuality)return model.loadUniformQuality();
  const abort=new AbortController(),panel=document.createElement('div');
  panel.className='luz-saloon-load luz-uniform-load';
  panel.innerHTML='<span role="status" aria-live="polite"></span><button type="button" hidden>Reintentar</button>';
  document.body.append(panel);
  const status=panel.querySelector('span'),retry=panel.querySelector('button');let pending;
  async function load() {
    if(pending||abort.signal.aborted||model.uniformLoadState==='ready')return pending;
    const resume=app.engine._running===true,loader=document.getElementById('loader');
    if(resume){app.engine.stop();loader.hidden=false;loader.style.display='';}
    const label=loader?.querySelector('.loader-status'),oldStatus=label?.textContent;
    if(label)label.textContent='Preparando la calidad del recorrido…';
    model.uniformLoadState='loading';panel.hidden=false;retry.hidden=true;status.textContent='Preparando la calidad del recorrido…';
    pending=(async()=>{
      const zone=await loadUniformQuality(model.guestAccess,{signal:abort.signal});
      if(abort.signal.aborted)return;
      await app.gangwayRenderer.installProfiles(zone.profiles,{prepare:true,views:uniformWarmViews,activate:()=>{
        if(abort.signal.aborted)throw Error('Carga cancelada');model.uniformQuality=zone;
      }});
      model.uniformLoadState='ready';panel.hidden=true;
    })().catch(error=>{
      if(abort.signal.aborted)return;
      model.uniformLoadState='error';status.textContent='No se pudo preparar la calidad uniforme. El recorrido sigue disponible.';retry.hidden=false;
      console.warn('Uniform quality preparation failed',error);
    }).finally(()=>{
      pending=null;
      if(!abort.signal.aborted&&resume){
        loader.hidden=true;loader.style.display='none';
        app.input.keys.clear();app.input.pressed.clear();app.input.look.x=app.input.look.y=0;
        app.yachtWalk.controls?.joystick?.reset?.();app.engine.start(dt=>app.frame(dt));
      }
      if(label)label.textContent=oldStatus;
    });
    return pending;
  }
  retry.onclick=load;model.loadUniformQuality=load;
  const dispose=model.dispose.bind(model);
  model.dispose=()=>{abort.abort();panel.remove();dispose();};
  return load();
}
