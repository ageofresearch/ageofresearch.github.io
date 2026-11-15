// Controlled reference: run alone, with no other GPU tests or builders active.
const {chromium}=require('playwright-core');
const assert=require('node:assert/strict');
const {mkdirSync,writeFileSync}=require('node:fs');
const base=process.env.YACHT_BASE||'http://127.0.0.1:8764/tidewater-rocha/';
const out=process.env.YACHT_OUTPUT||'/tmp/yacht-mobile-parity';
(async()=>{
 const browser=await chromium.launch({...(process.env.CHROME_PATH?{executablePath:process.env.CHROME_PATH}:{channel:'chrome'}),headless:true,args:['--enable-unsafe-webgpu','--enable-unsafe-swiftshader','--use-angle=swiftshader','--enable-features=Vulkan','--use-vulkan=swiftshader','--disable-vulkan-surface','--disable-gpu-watchdog']});
 const runs=[];
 try{
  for(let run=0;run<3;run++){
   const context=await browser.newContext({viewport:{width:360,height:540}});
   try{
    const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
    await page.goto(base+'mobile.html');await page.locator('#yacht').contentFrame().locator('#app').waitFor({timeout:90000});
    const frame=page.frames().find(f=>f.url().includes('play.html'));
    await frame.waitForFunction(()=>window.__mapsPublicStatus?.status==='ready',null,{timeout:180000});
    for(const x of [14.8,17.4])runs.push({run,...await frame.evaluate(async x=>{
     const app=__app,w=app.yachtWalk,n=w.nav;w.enterRoom('UD_R02');n.position=[x,0];n.elevation=6;w.cameraElevation=6;w.applyPosition();
     const d=app.camera.position.clone().set(0,0,-1).applyQuaternion(w.model.group.quaternion);w.yaw=Math.atan2(-d.x,-d.z);w.pitch=-.2;
     await new Promise(r=>setTimeout(r,350));
     let last;const times=[],original=app.frame;
     await new Promise(resolve=>{app.frame=function(dt){const t=performance.now();original(dt);if(last!==undefined)times.push(t-last);last=t;if(times.length>=160){app.frame=original;resolve();}};});
     times.sort((a,b)=>a-b);
     return {x,fps:1000/(times.reduce((a,b)=>a+b,0)/times.length),p95:times[Math.floor(times.length*.95)],max:times.at(-1),scale:app.engine.renderScale,samples:app.gangwayRenderer.samples,triangles:w.model.stats.triangles,bridgeReady:w.model.bridgeLoadState};
    },x)});
    assert.deepEqual(errors,[]);
   }finally{await context.close();}
  }
 }finally{await browser.close();}
 mkdirSync(out,{recursive:true});writeFileSync(out+'/bridge-controlled-performance.json',JSON.stringify(runs,null,2));console.log(runs);
 for(const r of runs){assert.equal(r.bridgeReady,'ready');assert.equal(r.scale,1);assert.equal(r.samples,4);assert.ok(r.triangles<=25000);}
 for(const x of [14.8,17.4])assert.ok(runs.filter(r=>r.x===x).map(r=>r.p95).sort((a,b)=>a-b)[1]<=25,'Controlled median return-view P95 exceeds 25 ms at '+x);
})().catch(e=>{console.error(e);process.exitCode=1});
