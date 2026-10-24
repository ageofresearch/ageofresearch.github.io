// Verify native drawing-buffer pixels, not CSS screenshots or a fixed-DPR test
// override: machinery's production policy must keep every moving frame sharp.
const {chromium}=require('playwright'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),os=require('node:os');
const base=process.argv[2]||'http://127.0.0.1:5251/',out=path.resolve(process.argv[3]||'work/machinery-sharp-r01/browser');fs.mkdirSync(out,{recursive:true});
const report=process.env.RESUME==='1'?JSON.parse(fs.readFileSync(path.join(out,'report.json'))):{url:base,environment:{renderer:'SwiftShader; correctness only, not hardware FPS',cpu:os.cpus()[0].model},checks:{},sequences:[],errors:[]};
if(report.failure)report.previousAttempts=[...(report.previousAttempts||[]),{failure:report.failure,errors:report.errors}];
delete report.failure;delete report.pass;report.errors=[];
const save=(name,data)=>fs.writeFileSync(path.join(out,name+'.png'),Buffer.from(data.split(',')[1],'base64'));
(async()=>{const remote=base.startsWith('https:'),browser=await chromium.launch({executablePath:'/usr/bin/chromium',headless:true,...remote?{proxy:{server:process.env.HTTPS_PROXY||'http://proxy:8080'}}:{},args:['--use-angle=swiftshader','--enable-unsafe-swiftshader','--disable-gpu-watchdog']});try{
 const context=await browser.newContext({viewport:(process.env.COMPACT==='1'||process.env.RESUME==='1')?{width:600,height:400}:{width:960,height:640},deviceScaleFactor:2}),p=await context.newPage();p.setDefaultTimeout(300000);p.on('pageerror',e=>report.errors.push({message:e.message,stack:e.stack}));
 if(remote)await p.route('https://ageofresearch.github.io/**',async r=>r.fulfill({response:await r.fetch({timeout:180000})}));
 await p.goto(base+'?room=machinery&engine=right-vr-r01',{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>window.__yachtRealism);await p.evaluate(()=>__yachtRealism.setFixedRatio(.5));
 const ready=async()=>p.waitForFunction(()=>window.__yachtRealism?.status==='ready'&&[__yachtRealism.app.room.machinery.installed,__yachtRealism.app.room.machinery.installedRight].every(i=>i?.ready));await ready();
 await p.evaluate(async()=>{const a=__yachtRealism.app;for(const i of[a.room.machinery.installed,a.room.machinery.installedRight])await i.detail();a.renderer.toneMappingExposure=a.exposureTarget;a.controls.focus([9.15,0,3.18],[10.8,-1.2,2.6]);a.camera.fov=50;a.camera.updateProjectionMatrix();});
 console.log('READY both engines and LODs');
 await p.evaluate(()=>{const a=__yachtRealism.app,render=a.renderer.render.bind(a.renderer);window.__resolutionFrames=[];window.__renderDirect=render;a.renderer.render=(s,c)=>{render(s,c);const state={time:performance.now(),ratio:a.renderer.getPixelRatio(),resolution:{...a.resolution},canvas:[a.renderer.domElement.width,a.renderer.domElement.height],position:c.position.toArray(),quaternion:c.quaternion.toArray(),lod:[a.room?.machinery?.installed?.lod,a.room?.machinery?.installedRight?.lod],triangles:a.renderer.info.render.triangles,walking:a.controls.keys.has('KeyW')};__resolutionFrames.push(state);if(state.walking&&window.__captureCount>0&&--window.__captureCount===0){a.controls.clear();window.__motionCapture={state,png:a.renderer.domElement.toDataURL('image/png')};}};});
 const idle=async()=>p.waitForFunction(()=>{const a=__yachtRealism.app;return!a.raf&&a.lastTime===null&&performance.now()>a.motionUntil;});
 async function direct(name){const result=await p.evaluate(()=>{const a=__yachtRealism.app;window.__renderDirect(a.scene,a.camera);a.renderer.getContext().finish();return{png:a.renderer.domElement.toDataURL('image/png'),state:{...__yachtRealism.stats,position:a.camera.position.toArray(),quaternion:a.camera.quaternion.toArray()}};});save(name,result.png);return result;}
 if(process.env.RESUME!=='1'){
 for(const mode of['sharp','performance']){
  await p.selectOption('#machinery-resolution',mode);await p.evaluate(()=>__yachtRealism.setFixedRatio(null));await idle();
  const start=await p.evaluate(()=>{window.__resolutionFrames=[];window.__motionCapture=null;window.__captureCount=3;const a=__yachtRealism.app;a.quality=.55;a.controls.keys.add('KeyW');a.invalidate(true);return{position:a.camera.position.toArray(),shadowUpdates:a.shadowUpdates};});
  await p.waitForFunction(()=>window.__motionCapture);const moving=await p.evaluate(()=>window.__motionCapture);save(mode+'-moving',moving.png);await idle();const rest=await direct(mode+'-rest');
  assert.deepEqual(moving.state.position,rest.state.position);assert.deepEqual(moving.state.quaternion,rest.state.quaternion);assert.deepEqual(moving.state.canvas,rest.state.canvas);assert.equal(moving.png,rest.png,'Native pixels must match exactly at the same pose');assert.notDeepEqual(start.position,rest.state.position);
  assert.equal(moving.state.resolution.source,'machinery');assert.equal(rest.state.shadowUpdates,start.shadowUpdates);
  const frames=await p.evaluate(()=>__resolutionFrames);assert.ok(frames.length>=3);assert.ok(frames.every(f=>f.ratio===(mode==='sharp'?2:1)));assert.ok(frames.every(f=>f.resolution.source==='machinery'));
  report.sequences.push({mode,moving:moving.state,rest:rest.state,frames,pixelIdentical:true});report.checks[mode+'PixelsIdentical']=true;
  console.log('PASS native motion/rest pixels',mode,moving.state.canvas);
 }
 // Pointer rotation, not just translation. Use the production sharp policy.
 await p.selectOption('#machinery-resolution','sharp');await idle();await p.evaluate(()=>{window.__resolutionFrames=[];});await p.mouse.move(500,320);await p.mouse.down();await p.mouse.move(525,330,{steps:2});await p.mouse.up();await idle();
 const rotation=await p.evaluate(()=>__resolutionFrames);assert.ok(rotation.length>0&&rotation.every(f=>f.ratio===2));report.rotation=rotation;report.checks.pointerRotationSharp=true;
 // A deterministic matched pose from the pre-fix diagnostic, if available.
 const previous='/tmp/luz-engine-blur/report.json';if(fs.existsSync(previous)&&process.env.COMPACT!=='1'){
  const reference=JSON.parse(fs.readFileSync(previous));await p.evaluate(pose=>{const a=__yachtRealism.app;a.camera.position.fromArray(pose.position);a.camera.quaternion.fromArray(pose.quaternion);for(const i of[a.room.machinery.installed,a.room.machinery.installedRight]){i.lod='walk';i.sync();}},reference.moving);
  const matched=await direct('matched-candidate');report.matchedPose={position:matched.state.position,quaternion:matched.state.quaternion,canvas:matched.state.canvas};
 }
 }
 // Lifecycle checks use the explicit performance mode to keep software rendering
 // affordable. The full-DPR production path has already been verified above.
 await p.selectOption('#machinery-resolution','performance');await idle();
 // Drive the real production RAF callback with controlled timestamps. GPU
 // submissions alone are stubbed; policy, timing and scheduling still execute.
 report.cadence=await p.evaluate(()=>{
  const a=__yachtRealism.app,raf=window.requestAnimationFrame,render=a.renderer.render,update=a.controls.update,syncUI=a.syncUI;
  cancelAnimationFrame(a.raf);a.raf=0;let callback;window.requestAnimationFrame=fn=>{callback=fn;return 1;};a.renderer.render=()=>{};a.controls.update=()=>true;a.syncUI=()=>{};
  const results=[];
  try{__yachtRealism.setFixedRatio(null);for(const mode of['sharp','performance'])for(const hz of[30,60,120]){
   a.setResolutionMode(mode);const frame=callback;a.resetTiming();a.quality=.55;const ratios=new Set();let t=performance.now();
   for(let i=0;i<hz*30;i++){t+=1000/hz;frame(t);ratios.add(a.renderer.getPixelRatio());}
   frame(t+10000);ratios.add(a.renderer.getPixelRatio());results.push({mode,hz,seconds:30,longStallMs:10000,ratios:[...ratios],source:a.resolution.source});
  }}finally{window.requestAnimationFrame=raf;a.renderer.render=render;a.controls.update=update;a.syncUI=syncUI;a.raf=0;a.resetTiming();a.applyResolution();a.invalidate();}
  return results;
 });
 for(const c of report.cadence){assert.deepEqual(c.ratios,[c.mode==='sharp'?2:1]);assert.equal(c.source,'machinery');}report.checks.productionCadencesAndStalls=true;console.log('PASS production 30/60/120 Hz and long stalls');
 await p.selectOption('#machinery-resolution','performance');await idle();
 const shadowBefore=await p.evaluate(()=>__yachtRealism.stats.shadowUpdates);await p.evaluate(()=>__yachtRealism.setFixedRatio(.5));assert.equal(await p.evaluate(()=>__yachtRealism.stats.ratio),.5);await p.evaluate(()=>__yachtRealism.setFixedRatio(null));await idle();assert.equal(await p.evaluate(()=>__yachtRealism.stats.ratio),1);report.checks.fixedOverrideAndClear=true;
 for(const size of[{width:1920,height:1080},{width:390,height:844},{width:844,height:390}]){
  await p.setViewportSize(size);await idle();const stats=await p.evaluate(()=>__yachtRealism.stats);assert.ok(stats.canvas[0]*stats.canvas[1]<=1500000);assert.equal(stats.resolution.mode,'performance');report.sequences.push({name:'resize',viewport:size,ratio:stats.ratio,canvas:stats.canvas});
 }
 await p.setViewportSize({width:600,height:400});await idle();
 // A same-tab reload must retain the user's selected mode.
 await p.reload({waitUntil:'domcontentloaded'});await ready();assert.equal(await p.inputValue('#machinery-resolution'),'performance');assert.equal(await p.evaluate(()=>__yachtRealism.stats.resolution.mode),'performance');report.checks.sessionPreference=true;console.log('PASS session preference and resize');
 await p.evaluate(async()=>{const a=__yachtRealism.app;await a.load('saloon');});assert.equal(await p.isVisible('#machinery-resolution-control'),false);assert.equal(await p.evaluate(()=>__yachtRealism.stats.resolution.mode),'adaptive');await p.evaluate(()=>__yachtRealism.select('machinery'));await ready();assert.equal(await p.inputValue('#machinery-resolution'),'performance');assert.equal(await p.evaluate(()=>__yachtRealism.stats.ratio),1);assert.ok(await p.evaluate(()=>__yachtRealism.stats.frameMs.samples<5));report.checks.roomPolicyAndReturn=true;console.log('PASS saloon policy and machinery return');
 await p.evaluate(()=>{Object.defineProperty(document,'hidden',{configurable:true,value:true});document.dispatchEvent(new Event('visibilitychange'));});const hidden=await p.evaluate(()=>__yachtRealism.stats.frames);await p.waitForTimeout(300);assert.equal(await p.evaluate(()=>__yachtRealism.stats.frames),hidden);await p.evaluate(()=>{delete document.hidden;document.dispatchEvent(new Event('visibilitychange'));});await idle();assert.equal(await p.evaluate(()=>__yachtRealism.stats.ratio),1);report.checks.visibilityAndIdle=true;
 const restFrames=await p.evaluate(()=>__yachtRealism.stats.frames);await p.waitForTimeout(400);assert.equal(await p.evaluate(()=>__yachtRealism.stats.frames),restFrames);
 // Real controls: both nominal cuts, playback, scrub, register and baskets.
 if(process.env.SMOKE==='1'){await p.selectOption('#machinery-resolution','sharp');await p.evaluate(()=>document.activeElement?.blur());}
 await p.keyboard.press('KeyK');await p.selectOption('#motor-side','starboard');await p.check('#motor-cutaway');await p.waitForFunction(()=>__yachtRealism.stats.machinery.motor.cutaway&&!__yachtRealism.stats.machinery.motor.loading);await p.click('#motor-play');const clock=await p.evaluate(()=>__yachtRealism.stats.machinery.motor.time);await p.waitForFunction(t=>__yachtRealism.stats.machinery.motor.time!==t,clock);await p.click('#motor-play');await p.locator('#motor-time').evaluate(e=>{e.value='3.75';e.dispatchEvent(new Event('input',{bubbles:true}));});assert.equal(await p.evaluate(()=>__yachtRealism.stats.machinery.motor.time),3.75);
 if(process.env.SMOKE==='1'){assert.equal(await p.evaluate(()=>__yachtRealism.stats.ratio),2);report.checks.sharpNominalInspection=true;await p.selectOption('#machinery-resolution','performance');}
 await p.selectOption('#motor-side','port');assert.equal(await p.evaluate(()=>__yachtRealism.stats.machinery.motor.selected),'port');await p.uncheck('#motor-cutaway');
 await p.evaluate(()=>{const a=__yachtRealism.app;a.nav.position=a.nav.nearest(11.1,0);a.controls.apply();});await p.click('#inspect-filter-tab');await p.check('#filter-access');await p.click('#filter-extract');await p.waitForFunction(()=>__yachtRealism.app.room.machinery.filterMotion);await p.locator('#filter-progress').evaluate(e=>{e.value='1';e.dispatchEvent(new Event('input',{bubbles:true}));});await p.check('#filter-dirty');assert.equal(await p.evaluate(()=>__yachtRealism.app.nav.safe(12.1,0)),false);await p.click('#inspection-reset');assert.equal(await p.evaluate(()=>__yachtRealism.stats.machinery.filters.accessOpen),false);report.checks.inspectionControls=true;console.log('PASS inspection and filter controls');
 if(process.env.SMOKE==='1'){report.final=await p.evaluate(()=>__yachtRealism.stats);assert.deepEqual(report.final.errors,[]);assert.deepEqual(report.errors,[]);report.pass=true;console.log('PASS public pixel proof, modes and controls');return;}
 const cycles=[];for(let i=0;i<2;i++){await p.evaluate(async()=>{const a=__yachtRealism.app;a.room.machinery.setActive(false);a.stream.evict('machinery');a.room=null;await a.load('machinery');});await ready();await p.evaluate(async()=>{for(const i of[__yachtRealism.app.room.machinery.installed,__yachtRealism.app.room.machinery.installedRight])await i.detail();});await idle();cycles.push(await p.evaluate(()=>({memory:__yachtRealism.stats.memory,pool:__yachtRealism.stats.sharedTextures,programs:__yachtRealism.app.renderer.info.programs.length})));}assert.deepEqual(cycles[0],cycles[1]);report.resourceCycles=cycles;report.checks.resourcesStable=true;console.log('PASS two disposal/reload cycles');
 // Restore through the actual WEBGL_lose_context extension.
 await p.evaluate(()=>{const a=__yachtRealism.app,extension=a.renderer.getContext().getExtension('WEBGL_lose_context');window.__contextLoss=extension;extension.loseContext();});await p.waitForFunction(()=>!document.querySelector('#loading').hidden);await p.evaluate(()=>window.__contextLoss.restoreContext());await ready();await idle();assert.equal(await p.evaluate(()=>__yachtRealism.stats.resolution.mode),'performance');assert.equal(await p.evaluate(()=>__yachtRealism.stats.ratio),1);report.checks.contextRestore=true;
 report.final=await p.evaluate(()=>__yachtRealism.stats);assert.deepEqual(report.final.errors,[]);assert.deepEqual(report.errors,[]);report.pass=true;console.log('PASS session, rooms, hidden, resize, resources, WebGL restoration');
 }finally{await browser.close();fs.writeFileSync(path.join(out,'report.json'),JSON.stringify(report,null,2));}})().catch(e=>{report.failure=e.stack;fs.writeFileSync(path.join(out,'report.json'),JSON.stringify(report,null,2));console.error(e);process.exitCode=1});
