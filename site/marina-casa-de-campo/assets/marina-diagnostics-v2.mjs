const MiB=1024*1024;
const BUILD='marina-diagnostics-v2';
const STORAGE_KEY='marina.memory-diagnostics.v1';
const MAX_SAMPLES=600,MAX_EVENTS=40,GROWTH_LIMIT=256*MiB;

// Payload requested through WebGL, not physical VRAM or total process RAM.
// Keep numeric records and weak object IDs: the monitor must not retain GL objects.
export function trackAllocations(gl){
 const ids=new WeakMap(),textures=new Map(),buffers=new Map(),renderbuffers=new Map(),boundTextures=new Map(),boundBuffers=new Map();
 let nextId=0,unit=0,boundRB=null,allocationCalls=0,trackingErrors=0;
 const id=o=>{if(!o)return null;if(!ids.has(o))ids.set(o,++nextId);return ids.get(o)};
 const formats=new Map();
 for(const [name,bytes]of Object.entries({R8:1,RG8:2,RGB8:3,RGBA8:4,SRGB8:3,SRGB8_ALPHA8:4,R16F:2,RG16F:4,RGB16F:6,RGBA16F:8,R32F:4,RG32F:8,RGB32F:12,RGBA32F:16,DEPTH_COMPONENT16:2,DEPTH_COMPONENT24:4,DEPTH_COMPONENT32F:4,DEPTH24_STENCIL8:4,DEPTH32F_STENCIL8:8,RGBA4:2,RGB5_A1:2,RGB565:2,R11F_G11F_B10F:4,RGB10_A2:4,RGBA8UI:4,RGBA8I:4}))if(gl[name]!==undefined)formats.set(gl[name],{name,bytes});
 const format=f=>formats.get(f)||{name:String(f),bytes:0};
 const wrap=(name,observe)=>{if(typeof gl[name]!=='function')return;const original=gl[name];gl[name]=function(...args){const result=original.apply(this,args);try{observe(...args)}catch{trackingErrors++}return result}};
 const cubeFace=t=>t>=gl.TEXTURE_CUBE_MAP_POSITIVE_X&&t<=gl.TEXTURE_CUBE_MAP_NEGATIVE_Z;
 const binding=t=>boundTextures.get(unit+':'+(cubeFace(t)?gl.TEXTURE_CUBE_MAP:t));
 const texture=t=>textures.get(binding(t));
 function storage(r,t,levels,f,w,h,d=1){
  if(!r)return;allocationCalls++;Object.assign(r,{width:w,height:h,depth:d,format:format(f).name,bpp:format(f).bytes,immutable:true,levels:{}});
  for(let l=0;l<levels;l++)r.levels[l]=Math.max(1,w>>l)*Math.max(1,h>>l)*(t===gl.TEXTURE_3D?Math.max(1,d>>l):d)*(t===gl.TEXTURE_CUBE_MAP?6:1)*r.bpp;
 }
 wrap('activeTexture',t=>unit=t-gl.TEXTURE0);
 wrap('bindTexture',(t,o)=>{const i=id(o);boundTextures.set(unit+':'+t,i);if(i&&!textures.has(i))textures.set(i,{id:i,levels:{}})});
 wrap('deleteTexture',o=>textures.delete(id(o)));
 wrap('texStorage2D',(t,n,f,w,h)=>storage(texture(t),t,n,f,w,h));
 wrap('texStorage3D',(t,n,f,w,h,d)=>storage(texture(t),t,n,f,w,h,d));
 wrap('texImage2D',(...a)=>{
  const [t,l,f]=a,r=texture(t);if(!r)return;
  const w=a.length>=9?a[3]:a[5]?.width,h=a.length>=9?a[4]:a[5]?.height;if(!(w>0&&h>0))return;
  const info=format(f);allocationCalls++;Object.assign(r,{format:info.name,bpp:info.bytes,immutable:false});
  if(l===0)Object.assign(r,{width:w,height:h});
  r.levels[(cubeFace(t)?(t-gl.TEXTURE_CUBE_MAP_POSITIVE_X)+':':'')+l]=w*h*r.bpp;
 });
 wrap('texImage3D',(t,l,f,w,h,d)=>{const r=texture(t);if(!r)return;const info=format(f);allocationCalls++;Object.assign(r,{format:info.name,bpp:info.bytes,immutable:false});if(l===0)Object.assign(r,{width:w,height:h,depth:d});r.levels[l]=w*h*d*r.bpp});
 wrap('generateMipmap',t=>{
  const r=texture(t);if(!r||r.immutable||!r.width||!r.height)return;
  const faces=t===gl.TEXTURE_CUBE_MAP?6:1;
  // Replace mutable higher levels, avoiding counting explicit and generated mips twice.
  for(const k of Object.keys(r.levels))if(Number(k.split(':').at(-1))>0)delete r.levels[k];
  for(let l=1;l<=Math.floor(Math.log2(Math.max(r.width,r.height,t===gl.TEXTURE_3D?r.depth||1:1)));l++)r.levels[l]=Math.max(1,r.width>>l)*Math.max(1,r.height>>l)*(t===gl.TEXTURE_3D?Math.max(1,(r.depth||1)>>l):r.depth||1)*r.bpp*faces;
 });
 wrap('bindBuffer',(t,o)=>{const i=id(o);boundBuffers.set(t,i);if(i&&!buffers.has(i))buffers.set(i,{id:i,bytes:0})});
 wrap('bufferData',(t,data,usage,offset=0,length)=>{const r=buffers.get(boundBuffers.get(t));if(!r)return;allocationCalls++;r.bytes=typeof data==='number'?data:!data?0:length>0?length*(data.BYTES_PER_ELEMENT||1):data.byteLength-offset*(data.BYTES_PER_ELEMENT||1)});
 wrap('deleteBuffer',o=>buffers.delete(id(o)));
 wrap('bindRenderbuffer',(t,o)=>{boundRB=id(o);if(boundRB&&!renderbuffers.has(boundRB))renderbuffers.set(boundRB,{id:boundRB,bytes:0})});
 const rb=(f,w,h,samples)=>{const r=renderbuffers.get(boundRB);if(!r)return;allocationCalls++;const info=format(f);Object.assign(r,{width:w,height:h,samples,format:info.name,bpp:info.bytes,bytes:w*h*Math.max(1,samples)*info.bytes})};
 wrap('renderbufferStorage',(t,f,w,h)=>rb(f,w,h,1));
 wrap('renderbufferStorageMultisample',(t,n,f,w,h)=>rb(f,w,h,n));
 wrap('deleteRenderbuffer',o=>renderbuffers.delete(id(o)));
 const rows=()=>[...[...textures.values()].map(r=>({...r,kind:'texture',bytes:Object.values(r.levels).reduce((a,b)=>a+b,0)})),...[...renderbuffers.values()].map(r=>({...r,kind:'renderbuffer'})),...[...buffers.values()].map(r=>({...r,kind:'buffer'}))];
 return {
  snapshot(){const all=rows(),sum=kind=>all.filter(r=>r.kind===kind).reduce((n,r)=>n+r.bytes,0),textureBytes=sum('texture'),renderbufferBytes=sum('renderbuffer'),bufferBytes=sum('buffer');return {textureBytes,renderbufferBytes,bufferBytes,totalBytes:textureBytes+renderbufferBytes+bufferBytes,textures:textures.size,renderbuffers:renderbuffers.size,buffers:buffers.size,unknownFormatObjects:all.filter(r=>r.kind!=='buffer'&&r.format!==undefined&&!r.bpp).length,allocationCalls,trackingErrors}},
  largest(){return rows().sort((a,b)=>b.bytes-a.bytes).slice(0,12).map(({kind,width,height,depth,format,samples,bytes})=>({kind,width,height,depth,format,samples,bytes}))},
  reset(){textures.clear();buffers.clear();renderbuffers.clear();boundTextures.clear();boundBuffers.clear();boundRB=null}
 };
}

// Read only the displayed model's materials/uniforms. Do not keep texture refs
// between samples, and do not claim coverage of the private reflection scene.
export function lightingMemory(app){
 const materials=new Set(),active=new Set(),arrays=new Set(),staleArrays=new Set();let staleTextures=0;
 app.yacht?.root?.traverse(o=>{if(o.isMesh)for(const m of Array.isArray(o.material)?o.material:[o.material])materials.add(m)});
 for(const m of materials)if(m.lightMap)active.add(m.lightMap);
 const add=(t,stale=false)=>{const data=t?.image?.data;if(!ArrayBuffer.isView(data))return;arrays.add(data.buffer);if(stale)staleArrays.add(data.buffer)};
 for(const t of active)add(t);
 const stale=new Set();
 for(const m of materials){const uniforms=app.engine?.glRenderer?.properties?.get(m)?.uniforms;
  for(const name of ['lightMap','nativeBackLight']){const t=uniforms?.[name]?.value;if(!t?.userData?.parity_path)continue;const old=name==='lightMap'&&!active.has(t);add(t,old);if(old&&t.image?.data)stale.add(t)}
 }
 staleTextures=stale.size;const sum=set=>[...set].reduce((n,b)=>n+b.byteLength,0);
 const report=app.yacht?.runtime?.appearance?.report();
 return {activeMaps:report?.residentLightmaps??null,activeArrayBytes:report?.lightmapBytes??null,visibleModelReachableArrayBytes:sum(arrays),visibleModelStaleArrayBytes:sum(staleArrays),visibleModelStaleTextures:staleTextures,scope:'Displayed model material and shader-uniform references; private reflection materials and other allocations excluded.'};
}

export function installDiagnostics(win){
 if(!['1','true'].includes(new URLSearchParams(win.location.search).get('diagnostics')))return null;
 const doc=win.document,contexts=[],events=[],samples=[],session=Date.now().toString(36),startedAt=new Date().toISOString();
 let app=null,panel=null,output=null,status=null,renderState=null,baseline=null,previousSample=null,lastSample=null,lastTick=performance.now(),paused=false,pauseKind=null,pauseReason=null,controlledEngine=null,autoPause=true,storageAvailable=true,previousReport=null,lastPersist=0,previousFrames=null,errorCount=0;
 const peaks={jsHeapBytes:0,gpuRequestedBytes:0,staleLightingBytes:0,eventLoopDelayMs:0};
 try{const raw=win.localStorage.getItem(STORAGE_KEY);if(raw&&raw.length<128000)previousReport=JSON.parse(raw)}catch{storageAvailable=false}
 const record=(type,message)=>{events.push({at:new Date().toISOString(),type,message:String(message).slice(0,600)});if(events.length>MAX_EVENTS)events.shift()};
 const original=win.HTMLCanvasElement.prototype.getContext;
 win.HTMLCanvasElement.prototype.getContext=function(...args){const gl=original.apply(this,args);if(gl&&['webgl','webgl2'].includes(args[0])&&!contexts.some(c=>c.gl===gl)){try{const audit=trackAllocations(gl);contexts.push({gl,canvas:this,audit});this.addEventListener('webglcontextlost',()=>{audit.reset();record('context-lost','WebGL context lost');sample()});this.addEventListener('webglcontextrestored',()=>record('context-restored','WebGL context restored'))}catch(e){record('monitor-error',e.message)}}return gl};
 const mb=n=>Number.isFinite(n)?(n/MiB).toFixed(1)+' MiB':'Unavailable';
 const delta=(a,b)=>Number.isFinite(a)&&Number.isFinite(b)?((a-b>=0?'+':'')+((a-b)/MiB).toFixed(1)+' MiB'):'Unavailable';
 function payload(recovery=false,compact=false){const data={schema:1,build:BUILD,session,startedAt,capturedAt:new Date().toISOString(),recovery,scope:'JS heap is partial/approximate. WebGL bytes are requested payload estimates; exclude default canvas, driver overhead and untracked allocations. Total Chrome process RAM, physical VRAM, Mac memory pressure and swap are unavailable. No report is sent automatically.',browser:{userAgent:win.navigator.userAgent,deviceMemoryGiBApproximate:win.navigator.deviceMemory??null},page:{path:win.location.pathname,viewport:[win.innerWidth,win.innerHeight],pixelRatio:win.devicePixelRatio},graphics:contexts.map(({gl})=>{const ext=gl.getExtension('WEBGL_debug_renderer_info');return {renderer:gl.getParameter(ext?ext.UNMASKED_RENDERER_WEBGL:gl.RENDERER),vendor:gl.getParameter(ext?ext.UNMASKED_VENDOR_WEBGL:gl.VENDOR)}}),runtimeUrls:performance.getEntriesByType('resource').filter(r=>/yacht-parity-runtime|marina-yacht-entry/.test(r.name)).map(r=>new URL(r.name).pathname),baseline,peaks:{...peaks},latest:lastSample,events:[...events],samples:recovery?samples.slice(-12):[...samples],largestAllocations:recovery?undefined:contexts.map(c=>c.audit.largest()),storageAvailable,automaticPause:{enabled:autoPause,growthLimitBytes:GROWTH_LIMIT,scope:'Heuristic on tracked growth since baseline; cannot detect all memory exhaustion or guarantee protection.'}};
  if(compact){
   const toMiB=n=>Number.isFinite(n)?Math.round(n/MiB*10)/10:null;
   data.timelineColumns=['seconds','jsHeapMiB','webGLMiB','staleLightingMiB','textures','mode','yachtEntered','room','framesPerSecond','eventLoopDelayMs','animationRunning','pausedByDiagnostics'];
   data.timeline=samples.filter((s,i)=>i%10===0||i===samples.length-1).map(s=>[s.seconds,toMiB(s.jsHeapBytes),toMiB(s.gpu.totalBytes),toMiB(s.lighting.visibleModelStaleArrayBytes),s.gpu.textures,s.mode,s.yachtInside,s.room,s.framesPerSecond,Math.round(s.eventLoopDelayMs),s.animationRunning,s.pausedByDiagnostics]);
   data.timelineScope='One sample per ten recorded readings plus the latest; full recent baseline, latest and peaks above. A bounded in-memory ring keeps up to 600 readings.';
   delete data.samples;
  }
  data.animation={engineRunning:app?.engine?._running??null,pausedByDiagnostics:paused,pauseKind,pauseReason};
  return data;
 }
 function persist(){if(!lastSample)return;try{win.localStorage.setItem(STORAGE_KEY,JSON.stringify(payload(true)));storageAvailable=true;lastPersist=performance.now()}catch{storageAvailable=false}}
 function pause(reason,kind='manual'){paused=true;pauseKind=kind;pauseReason=reason;app?.engine?.stop();record('pause',reason);if(panel)panel.querySelector('[data-pause]').textContent='Resume 3D';draw();persist()}
 function bindEngine(){
  if(!app?.engine||controlledEngine===app.engine)return;
  controlledEngine=app.engine;const start=controlledEngine.start;
  // Visibility changes and yacht loading can restart animation independently.
  // Keep an explicit diagnostic pause until the user chooses Resume 3D.
  controlledEngine.start=function(...args){if(paused){record('resume-blocked','Diagnostic pause kept during animation restart');return}return start.apply(this,args)};
 }
 function draw(){if(!output||!lastSample)return;const s=lastSample;output.textContent=[
  `JS heap (partial): ${mb(s.jsHeapBytes)}`,
  `Heap change: ${delta(s.jsHeapBytes,baseline?.jsHeapBytes)}`,
  `WebGL estimate: ${s.gpu.contexts?mb(s.gpu.totalBytes):'Unavailable'}`,
  `GPU change: ${delta(s.gpu.totalBytes,baseline?.gpu?.totalBytes)}`,
  `Textures ${s.gpu.textures} · buffers ${s.gpu.buffers}`,
  `Lighting arrays: ${mb(s.lighting.activeArrayBytes)}`,
  `Stale lighting refs: ${mb(s.lighting.visibleModelStaleArrayBytes)}`,
  `Frames/sec: ${s.framesPerSecond??'—'} · delay ${Math.round(s.eventLoopDelayMs)} ms`,
  `Mode: ${s.mode} · yacht ${s.yachtInside?'entered':'outside'} · ${s.yachtState}`,
  `Errors: ${errorCount} · GPU context ${s.gpu.contexts?(s.contextLost?'LOST':'ok'):'—'}`,
  `Recovery snapshot: ${storageAvailable?(lastPersist?'saved locally':'pending'):'unavailable'}`
 ].join('\n');
  if(renderState){renderState.dataset.paused=String(paused);renderState.textContent=paused?(pauseKind==='automatic'?'3D paused automatically to limit memory growth.':'3D paused by you.'):(app?.engine?._running?'3D running':'3D not animating');}
 }
 function sample(){
  try{
   app=win.__marina||app;bindEngine();const now=performance.now(),elapsed=Math.max(1,now-lastTick),renderer=app?.engine?.glRenderer,heap=performance.memory?.usedJSHeapSize;
   const entries=contexts.map(c=>c.audit.snapshot()),gpu={totalBytes:0,textureBytes:0,renderbufferBytes:0,bufferBytes:0,textures:0,renderbuffers:0,buffers:0,unknownFormatObjects:0,allocationCalls:0,trackingErrors:0};
   for(const e of entries)for(const k of Object.keys(gpu))gpu[k]+=e[k];
   gpu.contexts=entries.length;
   const submitted=app?.engine?.pacingStats?.submitted??null,light=app?lightingMemory(app):{activeArrayBytes:null,visibleModelStaleArrayBytes:0};
   const position=app?.camera?.position,local=position&&app.yacht?.root?app.yacht.root.worldToLocal(position.clone()).toArray().map(n=>Math.round(n*100)/100):null;
   const s={at:new Date().toISOString(),seconds:Math.round(performance.now()/1000),jsHeapBytes:Number.isFinite(heap)?heap:null,gpu,lighting:light,framesPerSecond:submitted!==null&&previousFrames!==null?Math.round((submitted-previousFrames)*1000/elapsed):null,eventLoopDelayMs:doc.hidden?0:Math.max(0,elapsed-1000),hidden:doc.hidden,mode:app?.navigation?.mode||'loading',yachtInside:!!app?.yacht?.inside,yachtState:app?.yacht?.state||'loading',room:app?.yacht?.inside?app.yacht.room?.id||null:null,localPosition:local,animationRunning:app?.engine?._running??null,pausedByDiagnostics:paused,renderer:renderer?{...renderer.info.memory,programs:renderer.info.programs?.length,drawCalls:renderer.info.render.calls,triangles:renderer.info.render.triangles}:null,contextLost:contexts.some(c=>c.gl.isContextLost())};
   previousFrames=submitted;lastTick=now;lastSample=s;samples.push(s);if(samples.length>MAX_SAMPLES)samples.shift();
   peaks.jsHeapBytes=Math.max(peaks.jsHeapBytes,heap||0);peaks.gpuRequestedBytes=Math.max(peaks.gpuRequestedBytes,gpu.totalBytes);peaks.staleLightingBytes=Math.max(peaks.staleLightingBytes,light.visibleModelStaleArrayBytes||0);
   peaks.eventLoopDelayMs=Math.max(peaks.eventLoopDelayMs,s.eventLoopDelayMs);
   if(!baseline&&s.yachtState==='ready'){baseline=s;record('baseline','Yacht ready; initial memory baseline captured')}
   if(previousSample&&(s.mode!==previousSample.mode||s.yachtInside!==previousSample.yachtInside||s.room!==previousSample.room))record('movement',`${s.mode}; yacht entered=${s.yachtInside}; room=${s.room||'none'}`);
   previousSample=s;
   if(autoPause&&!paused&&baseline&&(gpu.totalBytes-baseline.gpu.totalBytes>GROWTH_LIMIT||(Number.isFinite(heap)&&Number.isFinite(baseline.jsHeapBytes)&&heap-baseline.jsHeapBytes>GROWTH_LIMIT)))pause('Tracked memory grew by over 256 MiB since baseline. This is a precaution, not proof of a leak.','automatic');
   if(paused)app?.engine?.stop();
   if(now-lastPersist>=5000)persist();placePanel();draw();
  }catch(e){record('monitor-error',e.message);if(status)status.textContent='A diagnostic reading failed; copy report for details'}
 }
 function placePanel(){
  if(!panel)return;
  if(win.innerWidth>760){panel.style.top='';panel.style.maxHeight='';return}
  const yacht=doc.querySelector('#yacht-panel'),top=yacht?Math.max(138,yacht.getBoundingClientRect().bottom+8):138;
  panel.style.top=top+'px';panel.style.maxHeight=Math.max(36,win.innerHeight-top-90)+'px';
 }
 async function copy(value){const text=JSON.stringify(value,null,2);try{await win.navigator.clipboard.writeText(text);status.textContent='Report copied — paste it into the chat'}catch{const area=panel.querySelector('textarea');area.hidden=false;area.value=text;area.focus();area.select();status.textContent='Press ⌘C / Ctrl+C to copy the selected report'}}
 function mount(){
  doc.documentElement.dataset.memoryDiagnostics='true';
  const style=doc.createElement('style');style.textContent='#marina-memory-panel{position:fixed;z-index:10000;top:90px;right:12px;width:330px;max-width:calc(100vw - 24px);max-height:calc(100dvh - 110px);overflow:auto;background:#f8f5edeF;border:1px solid #536b60;border-radius:12px;padding:10px 12px;color:#183c31;font:12px/1.45 system-ui;box-sizing:border-box;box-shadow:0 3px 18px #0003}#marina-memory-panel summary{font-weight:650;cursor:pointer}#marina-memory-panel pre{font:11px/1.55 ui-monospace,monospace;white-space:pre-wrap;margin:8px 0}#marina-memory-panel button{border:1px solid #85958d;border-radius:7px;padding:5px 8px;margin:3px 3px 3px 0;background:#fff}#marina-memory-panel p{margin:7px 0}#marina-memory-panel textarea{box-sizing:border-box;width:100%;height:110px;font:10px monospace}#marina-memory-panel label{display:block;font-size:11px}@media(min-width:761px){[data-memory-diagnostics] #yacht-panel[data-inside=true]{right:354px}}@media(max-width:760px){#marina-memory-panel{top:138px;max-height:calc(100dvh - 235px)}}';doc.head.appendChild(style);
  panel=doc.createElement('details');panel.id='marina-memory-panel';panel.open=true;
  style.textContent+='#marina-memory-panel [data-render-state]{font-weight:650}#marina-memory-panel [data-render-state][data-paused=true]{background:#fff0c2;border:1px solid #b68b26;border-radius:6px;padding:6px 8px}';
  panel.innerHTML='<summary>Memory diagnostics</summary><p data-render-state role="status">Preparing 3D</p><pre aria-label="Memory readings"></pre><button type="button" data-copy>Copy report</button><button type="button" data-pause>Pause 3D</button><button type="button" data-baseline>Set baseline</button><button type="button" data-previous>Copy previous session</button><label><input type="checkbox" checked data-auto> Auto-pause after 256 MiB of tracked growth</label><p data-status role="status">Recording locally — no data is sent</p><p>Partial readings: total Chrome/Mac memory is unavailable. Estimates can miss allocations. No stress test runs.</p><textarea aria-label="Diagnostic report to copy" hidden readonly></textarea>';
  doc.body.appendChild(panel);output=panel.querySelector('pre');status=panel.querySelector('[data-status]');renderState=panel.querySelector('[data-render-state]');
  win.addEventListener('resize',placePanel);
  const yacht=doc.querySelector('#yacht-panel');if(yacht&&win.ResizeObserver)new win.ResizeObserver(placePanel).observe(yacht);
  panel.querySelector('[data-copy]').onclick=()=>{sample();persist();copy(payload(false,true))};
  panel.querySelector('[data-previous]').disabled=!previousReport;
  panel.querySelector('[data-previous]').onclick=()=>copy(previousReport);
  panel.querySelector('[data-pause]').onclick=()=>{app=win.__marina||app;if(!paused)pause('User paused rendering');else if(app?.engine?.callback){baseline=lastSample;paused=false;pauseKind=null;pauseReason=null;app.engine.start(app.engine.callback);record('resume','User resumed; growth baseline reset');panel.querySelector('[data-pause]').textContent='Pause 3D';status.textContent='Recording locally — no data is sent';draw();persist()}};
  panel.querySelector('[data-baseline]').onclick=()=>{sample();baseline=lastSample;record('baseline','User reset the baseline');draw();persist()};
  panel.querySelector('[data-auto]').onchange=e=>autoPause=e.target.checked;
  // Keep game shortcuts and pointer-lock gestures out of the diagnostic controls.
  for(const name of ['pointerdown','mousedown','touchstart','keydown','wheel'])panel.addEventListener(name,e=>e.stopPropagation());
  sample();win.setInterval(sample,1000);
 }
 const errorSnapshot=()=>{if(performance.now()-lastPersist>1000)persist()};
 win.addEventListener('error',e=>{errorCount++;record('error',e.message||'Resource load error');errorSnapshot()});
 win.addEventListener('unhandledrejection',e=>{errorCount++;record('unhandled-rejection',e.reason?.stack||e.reason);errorSnapshot()});
 doc.addEventListener('keydown',e=>{if(!e.repeat&&['KeyF','KeyE'].includes(e.code)&&!panel?.contains(e.target)){record('key',e.code);persist()}},{capture:true});
 doc.addEventListener('click',e=>{const target=e.target.closest?.('[data-view],#enter-yacht,#yacht-outside,#board-at-quay');if(target){record('action',target.dataset.view||target.id);persist()}},{capture:true});
 doc.addEventListener('change',e=>{if(['yacht-room','yacht-deck'].includes(e.target.id)){record('destination',`${e.target.id}=${e.target.value}`);persist()}},{capture:true});
 win.addEventListener('pagehide',persist);doc.addEventListener('visibilitychange',()=>{record('visibility',doc.hidden?'hidden':'visible');persist()});
 const api={enabled:true,report:()=>payload(),sample,pause,copy:()=>copy(payload(false,true))};win.__marinaDiagnostics=api;
 if(doc.readyState==='loading')doc.addEventListener('DOMContentLoaded',mount,{once:true});else mount();
 return api;
}

if(typeof window!=='undefined')installDiagnostics(window);
