const{chromium}=require('playwright'),fs=require('node:fs'),assert=require('node:assert/strict');
const W=process.env.PEDESTAL_WORK||'/tmp/ldm-pedestal-r01',base=process.argv[2]||'http://127.0.0.1:5291/site/luz-de-mar-realism/',report={checks:{},errors:[],renderer:'SwiftShader correctness, not hardware performance'};
(async()=>{const browser=await chromium.launch({executablePath:'/usr/bin/chromium',headless:true,args:['--use-angle=swiftshader','--enable-unsafe-swiftshader','--disable-gpu-watchdog']});try{
 const p=await browser.newPage({viewport:{width:600,height:400}});p.setDefaultTimeout(300000);p.on('pageerror',e=>report.errors.push(e.message));let mode='http';
 await p.route('**/assets/machinery/electrical-vr-r01/electrical.glb?*',r=>mode==='http'?r.fulfill({status:503,body:'diagnostic download failure'}):mode==='hash'?r.fulfill({status:200,body:'diagnostic corrupt bytes'}):r.continue());
 await p.goto(base+'?room=machinery&engine=right-vr-r01&bulkhead=vr-r01&electrical=generator-r01');await p.waitForFunction(()=>window.__yachtRealism);await p.evaluate(()=>__yachtRealism.setFixedRatio(.5));
 for(const failure of['http','hash']){
  if(failure==='hash'){mode='hash';await p.evaluate(()=>__yachtRealism.app.room.machinery.bulkhead.retry());}
  await p.waitForFunction(()=>!!__yachtRealism.app.room?.machinery?.bulkhead?.error);
  const state=await p.evaluate(()=>{const e=__yachtRealism.app.room.machinery.bulkhead;return{error:e.error,committed:e.committed,visibleFallback:e.fallback.every(o=>o.visible)};});assert(!state.committed&&state.visibleFallback);assert(state.error.includes(failure==='http'?'503':'no coincide'));report.checks[failure+'FailureKeepsFallback']=true;
 }
 mode='ok';await p.evaluate(()=>__yachtRealism.app.room.machinery.bulkhead.retry());await p.waitForFunction(()=>__yachtRealism.stats.machinery.bulkhead?.committed&&__yachtRealism.stats.machinery.installed?.ready&&__yachtRealism.stats.machinery.installedRight?.ready);report.checks.retryCommits=true;console.log('PASS failure, hash rejection and retry');
 report.runtimeSHA256=await p.evaluate(()=>__yachtRealism.app.room.meta.electricalAppearance.hashes['electrical.glb']);
 await p.keyboard.press('KeyK');
 for(const side of['port','starboard']){
  await p.selectOption('#motor-side',side);await p.check('#motor-cutaway');await p.waitForFunction(()=>__yachtRealism.stats.machinery.motor.cutaway&&!__yachtRealism.stats.machinery.motor.loading);
  await p.click('#motor-play');const t=await p.evaluate(()=>__yachtRealism.stats.machinery.motor.time);await p.waitForFunction(t=>__yachtRealism.stats.machinery.motor.time!==t,t);await p.click('#motor-play');await p.click('#motor-restart');await p.uncheck('#motor-cutaway');
 }report.checks.bothCutsPlaybackAndReset=true;console.log('PASS both engine inspections');
 await p.click('#inspect-filter-tab');await p.check('#filter-access');await p.check('#filter-dirty');await p.selectOption('#filter-side','starboard');await p.click('#inspection-reset');report.checks.filterRegisterSideDirtyAndReset=true;
 await p.evaluate(()=>{const a=__yachtRealism.app;a.controls.focus([8.3,.5,3.18],[6.88,1,2.5]);a.syncUI();});await p.click('#machine-door',{timeout:15000});await p.click('#machine-door',{timeout:15000});report.checks.doorToggle=true;
 await p.evaluate(()=>__yachtRealism.app.controls.focus([9.15,0,3.18],[10.2,0,2.9]));
 await p.evaluate(()=>{const a=__yachtRealism.app;window.__walkStart=[...a.nav.position];a.controls.keys.add('KeyW');a.invalidate(true);});await p.waitForFunction(()=>Math.hypot(...__yachtRealism.app.nav.position.map((v,i)=>v-__walkStart[i]))>.05);await p.evaluate(()=>__yachtRealism.app.controls.clear());report.checks.keyboardWalking=true;
 await p.evaluate(()=>{window.__prior=__yachtRealism.app.room.machinery.bulkhead;return __yachtRealism.select('saloon');});assert(await p.evaluate(()=>!__prior.bundle&&!__prior.ready));
 await p.evaluate(()=>__yachtRealism.select('machinery'));await p.waitForFunction(()=>__yachtRealism.stats.machinery.bulkhead?.committed);report.checks.exitReleaseAndReturn=true;
 await p.evaluate(()=>{__yachtRealism.setFixedRatio(null);__yachtRealism.setResolutionMode('sharp');});await p.evaluate(()=>__yachtRealism.draw());report.stats=await p.evaluate(()=>__yachtRealism.stats);assert.deepEqual(report.stats.canvas,[600,400]);assert.deepEqual(report.errors,[]);report.pass=true;console.log('PEDESTAL LIFECYCLE PASSED');
}finally{await browser.close();fs.writeFileSync(W+'/lifecycle-proof.json',JSON.stringify(report,null,2)+'\n');}})().catch(e=>{console.error(e);process.exitCode=1});
