// Run alone: three fresh contexts, identical resolution/MSAA, no prior walk.
const assert=require('node:assert/strict');
const {quantileUpper95}=require('./yacht-performance-statistics.cjs');
const {mkdirSync,writeFileSync}=require('node:fs');
const defaultBase=process.env.YACHT_BASE||'http://127.0.0.1:8764/tidewater-rocha/';
const defaultOut=process.env.YACHT_OUTPUT||'/tmp/yacht-mobile-parity';
const summarize=rows=>{
 const intervals=rows.map(r=>r.interval).filter(Number.isFinite).sort((a,b)=>a-b);
 return {p95Upper95:quantileUpper95(intervals),frames:rows.length,fps:intervals.length*1000/intervals.reduce((a,b)=>a+b,0),p95:intervals[Math.floor(intervals.length*.95)],
  max:intervals.at(-1),over25ms:intervals.filter(t=>t>25).length,over50ms:intervals.filter(t=>t>50).length,
  maxMove:Math.max(...rows.map(r=>r.move)),maxCPU:Math.max(...rows.map(r=>r.cpu))};
};
async function measureGuest(base=defaultBase,out=defaultOut){
 const {chromium}=require('playwright-core');
 const browser=await chromium.launch({...(process.env.CHROME_PATH?{executablePath:process.env.CHROME_PATH}:{channel:'chrome'}),headless:true,
  args:['--enable-unsafe-webgpu','--enable-unsafe-swiftshader','--use-angle=swiftshader','--enable-features=Vulkan','--use-vulkan=swiftshader','--disable-vulkan-surface','--disable-gpu-watchdog']});
 const runs=[];mkdirSync(out,{recursive:true});
 try{for(let run=0;run<3;run++){
  const context=await browser.newContext({viewport:{width:360,height:540},deviceScaleFactor:1,hasTouch:true});
  let release;
  try{
   await context.addInitScript(()=>{
    window.__guestGPU=[];
    for(const name of ['createBuffer','createTexture','createShaderModule','createRenderPipeline','createRenderPipelineAsync','createBindGroup']){
     const original=GPUDevice.prototype[name];GPUDevice.prototype[name]=function(...args){__guestGPU.push({name,time:performance.now()});return original.apply(this,args);};
    }
   });
   const held=new Promise(resolve=>{release=resolve;});
   await context.route('**/guest-access.bin?*',async route=>{await held;await route.continue();});
   const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
   await page.goto(base+'mobile.html',{waitUntil:'domcontentloaded'});
   await page.locator('#yacht').contentFrame().locator('#app').waitFor({timeout:90000});
   const frame=page.frames().find(f=>f.url().includes('play.html'));
   await frame.waitForFunction(()=>window.__app?.entranceYacht?.guestAccessLoadState==='loading',null,{timeout:180000});
   assert.deepEqual(await frame.evaluate(()=>({ready:__mapsPublicStatus.status,running:__app.engine._running===true,guest:!!__app.entranceYacht.guestAccess})),{ready:'starting',running:false,guest:false});
   release();await frame.waitForFunction(()=>window.__mapsPublicStatus?.status==='ready',null,{timeout:180000});
   const result=await frame.evaluate(async()=>{
    const app=__app,w=app.yachtWalk,n=w.nav,rows=[];
    if(w.model.guestAccessLoadState!=='ready')throw Error('Guest preparation failed');
    w.enterRoom('MD_R02');n.position=[14.4,0];n.stair=null;n.elevation=3.95;w.cameraElevation=3.95;w.applyPosition();
    const path=w.model.guestAccess.route;

    let leg=0,index=1,previous;const start=performance.now(),original=app.frame;
    await new Promise((resolve,reject)=>{
     app.frame=function(dt){try{
      const t=performance.now(),points=leg%2?path.toReversed():path,to=points[index],dx=to[0]-n.position[0],dy=to[1]-n.position[1],d=Math.hypot(dx,dy),step=Math.min(d,1.12*Math.min(.075,Math.max(.001,dt)));
      if(d>1e-7)n.move(dx/d*step,dy/d*step);
      const move=performance.now()-t,b=w.model.group.userData.yacht;
      const direction=app.camera.position.clone().set(dy*b.sy,0,dx*b.sx).applyQuaternion(w.model.group.quaternion);
      w.yaw=Math.atan2(-direction.x,-direction.z);w.pitch=-.2;original(dt);
      rows.push({leg,position:n.position.slice(),elevation:n.elevation,interval:previous===undefined?null:t-previous,move,cpu:performance.now()-t,profile:app.gangwayRenderer.activeProfile,triangles:w.model.stats.triangles});previous=t;
      if(Math.hypot(to[0]-n.position[0],to[1]-n.position[1])<.002){index++;if(index===points.length){index=1;leg++;}}
      if(leg===4){app.frame=original;resolve();}else if(t-start>240000)throw Error('Guest route stalled '+n.position);
     }catch(error){app.frame=original;reject(error);}};
    });
    await app.gpu.queue.onSubmittedWorkDone();
    return {rows,start,gpu:__guestGPU.filter(e=>e.time>=start),resources:performance.getEntriesByType('resource').filter(e=>e.startTime>=start&&/\.(bin|json|glb)(\?|$)/.test(e.name)).map(e=>e.name),
      scale:app.engine.renderScale,samples:app.gangwayRenderer.samples,collisionHeights:n.stairFlights.get('guest').clearance.preparedHeights,residentGeometryBytes:w.model.stats.residentGeometryBytes,finishTextureBytes:w.model.stats.finishTextureBytes};
   });
   assert.deepEqual(result.gpu,[]);assert.deepEqual(result.resources,[]);assert.deepEqual(errors,[]);
   assert.equal(result.collisionHeights,15);assert.equal(result.scale,1);assert.equal(result.samples,4);assert.ok(result.rows.every(r=>r.triangles<=25000));
   assert.deepEqual([...new Set(result.rows.map(r=>r.profile))].sort(),['guest','interior']);
   const legs=[0,1,2,3].map(leg=>({leg,...summarize(result.rows.filter(r=>r.leg===leg))}));
   runs.push({run,legs,...result});writeFileSync(out+`/guest-cold-${run}.json`,JSON.stringify(runs.at(-1),null,2));console.log('Fresh guest context',run,legs);
  }finally{release?.();await context.close();}
 }}finally{await browser.close();}
 writeFileSync(out+'/guest-performance.json',JSON.stringify(runs.map(({rows,...r})=>r),null,2));
 return runs;
}
function assertGuestBudget(runs) {
 for(let leg=0;leg<4;leg++)assert.ok(runs.map(r=>r.legs[leg].p95).sort((a,b)=>a-b)[1]<=25,'Controlled median guest P95 exceeds 25 ms on leg '+leg);
}
module.exports={measureGuest,assertGuestBudget};
if(require.main===module)measureGuest().then(assertGuestBudget).catch(e=>{console.error(e);process.exitCode=1});
