const {chromium}=require('/opt/codex/cua_node/lib/node_modules/playwright');
const fs=require('node:fs/promises'),assert=require('node:assert/strict');
(async()=>{
 const base='https://ageofresearch.github.io/luz-de-mar-realism/';
 const out='work/boarding-vr-r01/public';await fs.mkdir(out,{recursive:true});
 const browser=await chromium.launch({executablePath:'/usr/bin/chromium',headless:true,
  proxy:{server:process.env.HTTPS_PROXY||'http://proxy:8080'},
  args:['--use-angle=swiftshader','--enable-unsafe-swiftshader','--disable-gpu-watchdog']});
 const page=await browser.newPage({viewport:{width:1100,height:760},deviceScaleFactor:1});
 const report={url:base+'?room=beach-club&release=boarding-vr-r01',errors:[],softwareRenderer:true};
 page.on('pageerror',e=>report.errors.push(String(e)));
 await page.route('https://ageofresearch.github.io/**',async route=>{
  try{await route.fulfill({response:await route.fetch({timeout:180000})});}
  catch(e){report.errors.push(String(e));await route.abort();}
 });
 const ready=()=>page.waitForFunction(()=>window.__yachtRealism?.status==='ready'&&document.querySelector('#loading').hidden,null,{timeout:300000});
 try{
  await page.goto(report.url,{waitUntil:'domcontentloaded',timeout:180000});await ready();
  report.candidate=await page.evaluate(()=>__yachtRealism.stats);
  assert.equal(report.candidate.boarding,'boarding-vr-r01');assert.equal(report.candidate.loading.presentationReady,true);
  await page.screenshot({path:out+'/candidate.png'});
  await page.selectOption('#room-selector','cockpit');await ready();
  await page.evaluate(async()=>{const a=__yachtRealism.app;await a.stream.ensure('beach-club');a.nav.setZone('cockpit',[3.8,2.72]);a.controls.focus([3.8,2.72,5.5],[3.8,4,5.5],false);});
  await page.keyboard.down('w');await page.evaluate(()=>{const a=__yachtRealism.app;for(let i=0;i<30;i++)a.controls.update(1/60);a.controls.clear();});await page.keyboard.up('w');
  await page.evaluate(()=>__yachtRealism.draw());report.walk=await page.evaluate(()=>__yachtRealism.stats);
  assert.equal(report.walk.navigationLayer,'gangway');assert.ok(report.walk.residentZones.length<=2);
  await page.click('#reset-view');report.reset=await page.evaluate(()=>__yachtRealism.stats);
  assert.equal(report.reset.room,'beach-club');assert.equal(report.reset.navigationLayer,'deck');
  await page.goto(base+'?room=beach-club',{waitUntil:'domcontentloaded',timeout:180000});await ready();
  report.default=await page.evaluate(()=>{const a=__yachtRealism.app,branches=[];a.room.root.traverse(o=>{if(o.userData.boardingVariant)branches.push({id:o.userData.boardingVariant,visible:o.visible});});return{branches,boarding:__yachtRealism.stats.boarding};});
  assert.equal(report.default.boarding,null);assert.ok(report.default.branches.some(v=>v.id==='baseline'&&v.visible));
  assert.ok(report.default.branches.every(v=>v.id!=='candidate'||!v.visible));
  assert.deepEqual(report.errors,[]);report.pass=true;console.log('PASS public boarding candidate, selector, walk, reset and original branch');
 }finally{await fs.writeFile(out+'/report.json',JSON.stringify(report,null,2)+'\n');await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
