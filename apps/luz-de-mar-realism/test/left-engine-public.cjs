// Deployment smoke: the comprehensive failure/cancellation/resource checks run
// locally against these same hashed assets in left-engine-browser.cjs.
const {chromium}=require('playwright'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const base=process.argv[2]||'https://ageofresearch.github.io/luz-de-mar-realism/';
const out=path.resolve('work/left-engine-r13/public-browser.json');
const report={url:base,scope:'Public controls and deployment smoke; full resource-cycle/failure checks are in browser.json',checks:{},errors:[]};
(async()=>{
 const b=await chromium.launch({executablePath:'/usr/bin/chromium',headless:true,proxy:{server:process.env.HTTPS_PROXY||'http://proxy:8080'},args:['--use-angle=swiftshader','--enable-unsafe-swiftshader','--disable-gpu-watchdog']});
 try{
  const p=await b.newPage({viewport:{width:600,height:400}});p.setDefaultTimeout(240000);p.on('pageerror',e=>report.errors.push(e.message));
  const ready=()=>p.waitForFunction(()=>window.__yachtRealism?.status==='ready'&&document.querySelector('#loading').hidden);
  const draw=()=>p.evaluate(()=>__yachtRealism.draw());
  await p.goto(base+'?room=machinery&engine=left-vr-grid-r13');await ready();await p.waitForFunction(()=>__yachtRealism.stats.machinery.installed.ready);await draw();
  report.assets=await p.evaluate(()=>__yachtRealism.app.room.machinery.installed.spec.hashes);
  const expected=JSON.parse(fs.readFileSync('public/assets/mechanics/left-vr-r01/authoring.json')).runtime.files;
  assert.deepEqual(report.assets,Object.fromEntries(Object.entries(expected).map(([k,v])=>[k,v.sha256])));
  report.installed=await p.evaluate(()=>__yachtRealism.stats);assert.ok(report.installed.machinery.installed.visible);assert.ok(report.installed.calls<=120&&report.installed.triangles<=1e6);report.checks.publishedCandidateRendered=true;
  await p.keyboard.press('KeyK');await p.check('#motor-cutaway');await p.waitForFunction(()=>__yachtRealism.stats.machinery.motor.cutaway&&!__yachtRealism.stats.machinery.motor.loading);await draw();
  assert.equal(await p.evaluate(()=>__yachtRealism.stats.machinery.installed.visible),false);
  await p.click('#motor-play');await p.waitForFunction(()=>__yachtRealism.stats.machinery.motor.time>0);await p.click('#motor-play');
  await p.locator('#motor-time').evaluate(e=>{e.value='4';e.dispatchEvent(new Event('input',{bubbles:true}));});assert.equal(await p.evaluate(()=>__yachtRealism.stats.machinery.motor.time),4);
  await p.click('#motor-restart');assert.equal(await p.evaluate(()=>__yachtRealism.stats.machinery.motor.time),0);report.checks.nominalCutPlaybackScrubAndReset=true;
  await p.selectOption('#motor-side','starboard');assert.equal(await p.evaluate(()=>__yachtRealism.stats.machinery.installed.visible),true);await p.uncheck('#motor-cutaway');report.checks.rightSelectionRestoresLeftExterior=true;
  await p.click('#inspect-filter-tab');await p.evaluate(()=>{const a=__yachtRealism.app;a.nav.position=a.nav.nearest(11.1,0);a.controls.apply();});await p.check('#filter-access');await p.click('#filter-extract');await p.waitForFunction(()=>__yachtRealism.stats.machinery.filterInspectionLoaded);
  await p.locator('#filter-progress').evaluate(e=>{e.value='1';e.dispatchEvent(new Event('input',{bubbles:true}));});await p.check('#filter-dirty');assert.equal(await p.evaluate(()=>__yachtRealism.stats.machinery.filters.dirty),true);await p.click('#reset-view');assert.equal(await p.evaluate(()=>__yachtRealism.stats.machinery.filters.accessOpen),false);report.checks.filterControlsAndReset=true;
  await p.goto(base+'?room=machinery');await ready();assert.equal(await p.evaluate(()=>__yachtRealism.stats.machinery.installed),null);report.checks.defaultUsesNominalExterior=true;
  assert.deepEqual(report.errors,[]);report.pass=true;console.log('Public candidate, cutaway, side selection, filter controls and default entry passed');
 }finally{await b.close();fs.writeFileSync(out,JSON.stringify(report,null,2)+'\n');}
})().catch(e=>{console.error(e);process.exitCode=1;});
