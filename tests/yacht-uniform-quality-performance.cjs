// Run on an otherwise idle worker: alternate immutable reference and candidate.
const assert=require('node:assert/strict');
const {mkdirSync,writeFileSync}=require('node:fs');
const {chromium}=require('playwright-core');
const median=a=>a.toSorted((a,b)=>a-b)[Math.floor(a.length/2)];
const summarize=rows=>{const t=rows.map(r=>r.interval).filter(Number.isFinite).sort((a,b)=>a-b);return {
 frames:t.length,fps:1000*t.length/t.reduce((a,b)=>a+b,0),p95:t[Math.floor(t.length*.95)],max:t.at(-1),
 over25ms:t.filter(v=>v>25).length,over50ms:t.filter(v=>v>50).length,
 maxMove:Math.max(...rows.map(r=>r.move)),maxCPU:Math.max(...rows.map(r=>r.cpu))};};
async function measureContext(browser,base,mode,round,out,{viewsOnly=false}={}) {
 const context=await browser.newContext({viewport:{width:360,height:540},deviceScaleFactor:1,hasTouch:true});
 try {
  await context.addInitScript(()=>{window.__uniformGPU=[];
   for(const name of ['createBuffer','createTexture','createShaderModule','createRenderPipeline','createRenderPipelineAsync','createBindGroup']) {
    const original=GPUDevice.prototype[name];GPUDevice.prototype[name]=function(...args){__uniformGPU.push({name,time:performance.now()});return original.apply(this,args);};
   }
  });
  const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(base+'mobile.html'+(mode==='candidate'?'?quality=uniform':''),{waitUntil:'domcontentloaded'});
  await page.locator('#yacht').contentFrame().locator('#app').waitFor({timeout:90000});
  const frame=page.frames().find(f=>f.url().includes('play.html'));
  await frame.waitForFunction(()=>window.__mapsPublicStatus?.status==='ready',null,{timeout:180000});
  const ready=await frame.evaluate(()=>({readyMs:__mapsPublicStatus.readyMs,stats:{...__app.entranceYacht.stats},uniform:__app.entranceYacht.uniformLoadState,
   scale:__app.engine.renderScale,samples:__app.gangwayRenderer.samples,width:__app.engine.width,height:__app.engine.height,
   bytes:performance.getEntriesByType('resource').filter(r=>/\.(bin|json)(\?|$)/.test(r.name)).reduce((n,r)=>n+r.encodedBodySize,0)}));
  assert.equal(ready.scale,1);assert.equal(ready.samples,4);assert.equal(ready.width,360);assert.equal(ready.height,540);
  if(mode==='candidate')assert.equal(ready.uniform,'ready');
  const cases=await frame.evaluate(viewsOnly=>{
   const w=__app.yachtWalk;
   const walks=[
    {name:'saloon',room:'MD_R01',path:[[7.8,.1],[10,.1],[10,1.95],[14.4,1.95],[14.4,0]]},
    {name:'aft',room:'MD_R01',path:[[5.2,2.21],[8.35,2.21]]},
    {name:'sun',room:'UD_R01',path:[[11.35,2.7],...w.model.sun.flight.route.path,[13.85,.7],[13.85,-.3],[14.6,-.3]]},
    {name:'upper',room:'UD_R01',path:[[13.8,0],[14.21,0],[14.8,0],[18.3,0],[18.3,-1.9]]},
    {name:'bridge',room:'MD_R02',path:[[17,.2],[18.35,.2],[18.5,1.35],[19.16,1.35],[19.16,1.15],[19.16,1.1],[19.16,-1.62],[19.16,-1.8],[19.78,-1.8],[19.78,-1.25],[20.5,-1.25],[20.5,0]]},
    {name:'bow',room:'UD_R01',path:[[11,-2.5],[11.2,-3],[18.5,-3],[22.5,-2.7],[24,-2.65],[26.8,-2.3],[26.8,0],[27,-2],[28.7,-1.95],[29.1,-1.95],[28.7,-1.95],[27,-2],[26.8,0],[27,2],[28.7,1.95],[29.1,1.95]]},
    {name:'guest',room:'MD_R02',path:w.model.guestAccess.route},
    {name:'swim',room:'MD_R01',path:[[4,-3.03],[.35,-3.03],[.35,0]]},
    {name:'boarding',room:'boarding',path:w.model.boarding.route},
   ];
   const views=[
    {name:'saloon-return',room:'MD_R02',position:[10,0],target:[6.5,0,4.7]},
    {name:'saloon-forward',room:'MD_R02',position:[14.4,0],target:[16,0,4.6]},
    {name:'upper-return-a',room:'UD_R02',position:[14.8,0],target:[10,0,6.6]},
    {name:'upper-return-b',room:'UD_R02',position:[17.4,0],target:[10,0,6.1]},
    {name:'sun-return',room:'SD_R01',position:[14.6,-.3],target:[8,0,7.8]},
    {name:'bow-return',room:'UD_R04',position:[26.8,0],target:[19,0,7]},
    {name:'guest-return',room:'LD_R11',position:[16.8,-.1],target:[13.5,-.1,2.6]},
   ];
   return viewsOnly?views:[...walks,...views];
  },viewsOnly);
  const results=[];
  for(const c of cases) {
   const result=await frame.evaluate(async c=>{
    const app=__app,w=app.yachtWalk,n=w.nav,rows=[],b=w.model.group.userData.yacht;
    w.enterRoom(c.room);n.position=(c.path?.[0]||c.position).slice();n.stair=null;n.elevation=n.floorHeight(...n.position);w.cameraElevation=n.elevation;w.applyPosition();
    if(!n.floorSafe(...n.position))throw Error('Unsafe start '+c.name+' '+n.position);
    if(c.target){const [x,y,z]=c.target,d=w.model.group.localToWorld(app.camera.position.clone().set(y*b.sy,z-b.seaReference,x*b.sx-b.length/2)).sub(app.camera.position).normalize();w.yaw=Math.atan2(-d.x,-d.z);w.pitch=Math.asin(d.y);}
    let leg=0,index=1,previous;const start=performance.now(),original=app.frame;
    await new Promise((resolve,reject)=>{app.frame=function(dt){try{
     const t=performance.now();let to;
     if(c.path){const points=leg%2?c.path.toReversed():c.path;to=points[index];const dx=to[0]-n.position[0],dy=to[1]-n.position[1],d=Math.hypot(dx,dy),step=Math.min(d,1.12*Math.min(.075,Math.max(.001,dt)));
      if(d>1e-7)n.move(dx/d*step,dy/d*step);
      const direction=app.camera.position.clone().set(dy*b.sy,0,dx*b.sx).applyQuaternion(w.model.group.quaternion);w.yaw=Math.atan2(-direction.x,-direction.z);w.pitch=-.25;
     }
     const move=performance.now()-t;original(dt);
     rows.push({leg,interval:previous===undefined?null:t-previous,move,cpu:performance.now()-t,profile:app.gangwayRenderer.activeProfile,triangles:w.model.stats.triangles});previous=t;
     if(c.path&&Math.hypot(to[0]-n.position[0],to[1]-n.position[1])<.002){index++;if(index===c.path.length){index=1;leg++;previous=undefined;}}
     if(c.path?leg===4:rows.length>=200){app.frame=original;resolve();}
     else if(t-start>300000)throw Error('Stalled '+c.name+' at '+n.position);
    }catch(e){app.frame=original;reject(e);}};});
    await app.gpu.queue.onSubmittedWorkDone();
    return {name:c.name,rows,gpu:__uniformGPU.filter(e=>e.time>=start),resources:performance.getEntriesByType('resource').filter(e=>e.startTime>=start&&/\.(bin|json|glb)(\?|$)/.test(e.name)).map(e=>e.name)};
   },c);
   assert.deepEqual(result.gpu,[]);assert.deepEqual(result.resources,[]);
   if(mode==='candidate')assert.ok(result.rows.every(r=>r.profile==='uniform'&&r.triangles<=40000));
   else assert.ok(result.rows.every(r=>r.triangles<=25000));
   result.legs=(c.path?[0,1,2,3]:[0]).map(leg=>({leg,...summarize(result.rows.filter(r=>r.leg===leg))}));
   results.push(result);console.log(mode,round,c.name,result.legs.map(r=>({p95:r.p95,fps:r.fps,max:r.max})));
   writeFileSync(`${out}/${mode}-${round}-${c.name}.json`,JSON.stringify(result));
  }
  assert.deepEqual(errors,[]);
  const run={mode,round,ready,cases:results.map(({rows,...r})=>r)};
  writeFileSync(`${out}/${mode}-${round}.json`,JSON.stringify(run,null,2));return run;
 }finally{await context.close();}
}
function compare(runs) {
 const reference=runs.filter(r=>r.mode==='reference'),candidate=runs.filter(r=>r.mode==='candidate');
 assert.equal(reference.length,3);assert.equal(candidate.length,3);
 return reference[0].cases.flatMap(c=>c.legs.map(({leg})=>{
  const summary=group=>{const rows=group.map(r=>r.cases.find(t=>t.name===c.name).legs[leg]);return {p95:median(rows.map(r=>r.p95)),fps:median(rows.map(r=>r.fps)),mean:median(rows.map(r=>1000/r.fps))};};
  const r=summary(reference),p=summary(candidate);
  return {case:c.name,leg,reference:r,candidate:p,passed:r.fps>=40&&p.p95<=25&&p.fps>=40&&p.mean<=r.mean*1.05};
 }));
}
async function main() {
 const out=process.env.YACHT_OUTPUT||'/tmp/yacht-uniform-performance',base=process.env.YACHT_BASE||'http://127.0.0.1:8764/tidewater-rocha/',reference=process.env.YACHT_REFERENCE_BASE;
 assert.ok(reference,'An immutable reference is required');mkdirSync(out,{recursive:true});
 const browser=await chromium.launch({...(process.env.CHROME_PATH?{executablePath:process.env.CHROME_PATH}:{channel:'chrome'}),headless:true,args:['--enable-unsafe-webgpu','--enable-unsafe-swiftshader','--use-angle=swiftshader','--enable-features=Vulkan','--use-vulkan=swiftshader','--disable-vulkan-surface','--disable-gpu-watchdog']});
 const runs=[];
 try{for(let round=0;round<3;round++)for(const mode of round%2?['candidate','reference']:['reference','candidate'])runs.push(await measureContext(browser,mode==='reference'?reference:base,mode,round,out,{viewsOnly:process.env.YACHT_UNIFORM_VIEWS_ONLY==='1'}));}
 finally{await browser.close();}
 const comparison=compare(runs);writeFileSync(out+'/comparison.json',JSON.stringify({runs,comparison},null,2));
 const failed=comparison.filter(r=>!r.passed);console.log('Comparison failures:',failed);assert.deepEqual(failed,[],'Uniform quality cannot replace the current renderer');
}
module.exports={measureContext,compare};
if(require.main===module)main().catch(e=>{console.error(e);process.exitCode=1});
