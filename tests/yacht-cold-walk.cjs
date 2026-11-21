// This must run in fresh contexts, before screenshots or warm route benchmarks.
const assert=require('node:assert/strict');
const {mkdirSync,writeFileSync}=require('node:fs');
const {chromium}=require('playwright-core');
const base=process.env.YACHT_BASE||'http://127.0.0.1:8764/tidewater-rocha/';
const out=process.env.YACHT_OUTPUT||'/tmp/yacht-mobile-parity';
const summarize=rows=>{
  const intervals=rows.map(r=>r.interval).filter(Number.isFinite).sort((a,b)=>a-b);
  return {frames:rows.length,fps:intervals.length*1000/intervals.reduce((a,b)=>a+b,0),
    p95:intervals[Math.floor(intervals.length*.95)],maxInterval:Math.max(...intervals),longFrames:intervals.filter(t=>t>25).length,
    maxMove:Math.max(...rows.map(r=>r.move)),maxCPU:Math.max(...rows.map(r=>r.cpu))};
};

async function capture(browser,mobile,directory=out) {
  mkdirSync(directory,{recursive:true});
  const context=await browser.newContext({viewport:{width:360,height:540},hasTouch:true});
  let release;
  try {
    await context.addInitScript(()=>{
      window.__coldGPU=[];
      for(const name of ['createBuffer','createTexture','createShaderModule','createRenderPipeline','createRenderPipelineAsync']) {
        const original=GPUDevice.prototype[name];
        GPUDevice.prototype[name]=function(...args){
          __coldGPU.push({name,time:performance.now(),label:args[0]?.label});return original.apply(this,args);
        };
      }
    });
    const held=new Promise(resolve=>{release=resolve;});
    if(mobile)await context.route('**/bridge-helm.bin?*',async route=>{await held;await route.continue();});
    const page=await context.newPage(),errors=[];
    page.on('pageerror',error=>errors.push(error.message));
    await page.goto(base+(mobile?'mobile.html':'play.html?world=rocha&view=walk-chat'),{waitUntil:'domcontentloaded'});
    if(mobile)await page.locator('#yacht').contentFrame().locator('#app').waitFor({timeout:90000});
    const frame=mobile?page.frames().find(f=>f.url().includes('play.html')):page.mainFrame();
    if(mobile) {
      await frame.waitForFunction(()=>window.__app?.entranceYacht?.bridgeLoadState==='loading',null,{timeout:90000});
      assert.deepEqual(await frame.evaluate(()=>({ready:window.__mapsPublicStatus.status,
        running:window.__app.engine._running===true,loader:!document.getElementById('loader').hidden})),
        {ready:'starting',running:false,loader:true},'Background preparation cannot overlap the first walk');
      release();
    }
    await frame.waitForFunction(()=>['ready','unsupported'].includes(window.__mapsPublicStatus?.status),null,{timeout:180000});
    assert.equal(await frame.evaluate(()=>__mapsPublicStatus.status),'ready');
    const ready=await frame.evaluate(()=>{
      const app=__app,w=app.yachtWalk;
      return {time:performance.now(),samples:app.gangwayRenderer?.samples,
        bow:w.model.bowLoadState,upper:w.model.upperLoadState,sun:w.model.sunLoadState,bridge:w.model.bridgeLoadState,upperInterior:w.model.upperInteriorLoadState,saloon:w.model.saloonLoadState,
        mtu:w.model.mtu?.state.status,strainers:w.model.strainers?.state.status,
        prepared:[...w.nav.stairFlights.values()].map(f=>({id:f.id,count:f.clearance.preparedHeights,
          expected:new Set(f.surfaces.map(s=>s.height.toFixed(6))).size}))};
    });
    let timings;
    if(mobile) {
      assert.equal(ready.bow,'ready');assert.equal(ready.bridge,'ready');assert.equal(ready.upperInterior,'ready');assert.equal(ready.sun,'ready');assert.equal(ready.upper,'ready');assert.equal(ready.saloon,'ready');assert.equal(ready.samples,4);
      const result=await frame.evaluate(async()=>{
        const app=__app,w=app.yachtWalk,n=w.nav,rows=[];let leg=0,previous;
        w.enterRoom('MD_R01');n.position=[5.2,2.21];n.stair=null;n.elevation=3.95;w.applyPosition();
        const start=performance.now(),original=app.frame;
        await new Promise((resolve,reject)=>{
          app.frame=function(dt){
            try {
              const t=performance.now(),target=leg%2?5.2:8.35,d=target-n.position[0];
              n.move(Math.sign(d)*Math.min(Math.abs(d),1.12*Math.min(.075,Math.max(.001,dt))),0);
              const move=performance.now()-t;
              const forward=app.camera.position.clone().set(0,0,Math.sign(d)).applyQuaternion(w.model.group.quaternion);
              w.yaw=Math.atan2(-forward.x,-forward.z);w.pitch=-.35;
              original(dt);rows.push({leg,interval:previous===undefined?null:t-previous,move,cpu:performance.now()-t});previous=t;
              if(Math.abs(n.position[0]-target)<.002)leg++;
              if(leg===4){app.frame=original;resolve();}
              else if(t-start>90000)throw Error('First-walk route stalled');
            }catch(error){app.frame=original;reject(error);}
          };
        });
        await app.gpu.queue.onSubmittedWorkDone();
        return {rows,start,gpu:__coldGPU.filter(e=>e.time>=start),
          resources:performance.getEntriesByType('resource').filter(e=>e.startTime>=start&&/mobile\/.*\.(bin|json)/.test(e.name)).map(e=>e.name),
          triangles:w.model.stats.triangles,scale:app.engine.renderScale,samples:app.gangwayRenderer.samples};
      });
      assert.deepEqual(result.resources,[],'Entering a prepared stair must not fetch geometry');
      assert.deepEqual(result.gpu,[],'First stair traversal must not create graphics resources');
      assert.equal(result.scale,1);assert.equal(result.samples,4);assert.ok(result.triangles<=25000);
      const legs=[0,1,2,3].map(leg=>({leg,...summarize(result.rows.filter(r=>r.leg===leg))}));
      writeFileSync(directory+'/cold-mobile.json',JSON.stringify({ready,legs,...result},null,2));
      console.log('Fresh mobile ascent/descent, then repeated route:',legs);
      const sunResult=await frame.evaluate(async()=>{
        const app=__app,w=app.yachtWalk,n=w.nav,rows=[];
        w.enterRoom('UD_R01');n.position=[11.35,2.7];n.stair=null;n.elevation=6;w.cameraElevation=6;w.applyPosition();
        const path=[[11.35,2.7],...w.model.sun.flight.route.path,[13.85,.7],[13.85,-.3],[14.6,-.3]];
        let leg=0,index=1,previous;const start=performance.now(),original=app.frame;
        await new Promise((resolve,reject)=>{
          app.frame=function(dt){try {
            const t=performance.now(),points=leg%2?path.toReversed():path,to=points[index],dx=to[0]-n.position[0],dy=to[1]-n.position[1],d=Math.hypot(dx,dy),step=Math.min(d,1.12*Math.min(.075,Math.max(.001,dt)));
            if(d>1e-7)n.move(dx/d*step,dy/d*step);
            const move=performance.now()-t,b=w.model.group.userData.yacht;
            const direction=app.camera.position.clone().set(dy*b.sy,0,dx*b.sx).applyQuaternion(w.model.group.quaternion);
            w.yaw=Math.atan2(-direction.x,-direction.z);w.pitch=-.35;original(dt);
            rows.push({leg,interval:previous===undefined?null:t-previous,move,cpu:performance.now()-t});previous=t;
            if(Math.hypot(to[0]-n.position[0],to[1]-n.position[1])<.002){index++;if(index===points.length){index=1;leg++;}}
            if(leg===4){app.frame=original;resolve();}else if(t-start>90000)throw Error('Sun cold route stalled '+n.position);
          }catch(error){app.frame=original;reject(error);}};
        });
        await app.gpu.queue.onSubmittedWorkDone();
        return {rows,start,gpu:__coldGPU.filter(e=>e.time>=start),resources:performance.getEntriesByType('resource').filter(e=>e.startTime>=start&&/mobile\/.*\.(bin|json)/.test(e.name)).map(e=>e.name),
          triangles:w.model.stats.triangles,scale:app.engine.renderScale,samples:app.gangwayRenderer.samples};
      });
      assert.deepEqual(sunResult.gpu,[]);assert.deepEqual(sunResult.resources,[]);assert.ok(sunResult.triangles<=25000);assert.equal(sunResult.scale,1);assert.equal(sunResult.samples,4);
      const sunLegs=[0,1,2,3].map(leg=>({leg,...summarize(sunResult.rows.filter(r=>r.leg===leg))}));
      writeFileSync(directory+'/cold-sun.json',JSON.stringify({ready,legs:sunLegs,...sunResult},null,2));console.log('Fresh sun ascent/descent, then repeated route:',sunLegs);

      const interiorResult=await frame.evaluate(async()=>{
        const app=__app,w=app.yachtWalk,n=w.nav,rows=[];
        w.enterRoom('UD_R01');n.position=[13.8,0];n.stair=null;n.elevation=6;w.cameraElevation=6;w.applyPosition();
        const path=[[13.8,0],[14.21,0],[14.8,0],[18.3,0],[18.3,-1.9]];
        let leg=0,index=1,previous;const start=performance.now(),original=app.frame;
        await new Promise((resolve,reject)=>{
          app.frame=function(dt){try{
            const t=performance.now(),points=leg%2?path.toReversed():path,to=points[index],dx=to[0]-n.position[0],dy=to[1]-n.position[1],d=Math.hypot(dx,dy),step=Math.min(d,1.12*Math.min(.075,Math.max(.001,dt)));
            if(d>1e-7)n.move(dx/d*step,dy/d*step);
            const move=performance.now()-t,b=w.model.group.userData.yacht;
            const direction=app.camera.position.clone().set(dy*b.sy,0,dx*b.sx).applyQuaternion(w.model.group.quaternion);
            w.yaw=Math.atan2(-direction.x,-direction.z);w.pitch=-.2;original(dt);
            rows.push({leg,interval:previous===undefined?null:t-previous,move,cpu:performance.now()-t,profile:app.gangwayRenderer.activeProfile});previous=t;
            if(Math.hypot(to[0]-n.position[0],to[1]-n.position[1])<.002){index++;if(index===points.length){index=1;leg++;}}
            if(leg===4){app.frame=original;resolve();}else if(t-start>90000)throw Error('Interior cold route stalled '+n.position);
          }catch(error){app.frame=original;reject(error);}};
        });
        await app.gpu.queue.onSubmittedWorkDone();
        return {rows,start,gpu:__coldGPU.filter(e=>e.time>=start),resources:performance.getEntriesByType('resource').filter(e=>e.startTime>=start&&/mobile\/.*\.(bin|json)/.test(e.name)).map(e=>e.name),
          triangles:w.model.stats.triangles,scale:app.engine.renderScale,samples:app.gangwayRenderer.samples};
      });
      assert.deepEqual(interiorResult.gpu,[]);assert.deepEqual(interiorResult.resources,[]);assert.ok(interiorResult.triangles<=25000);
      assert.equal(interiorResult.scale,1);assert.equal(interiorResult.samples,4);assert.ok(interiorResult.rows.every(r=>r.profile==='upper'));
      const interiorLegs=[0,1,2,3].map(leg=>({leg,...summarize(interiorResult.rows.filter(r=>r.leg===leg))}));
      writeFileSync(directory+'/cold-upper-interior.json',JSON.stringify({ready,legs:interiorLegs,...interiorResult},null,2));console.log('Fresh upper interior entry/return, then repeated route:',interiorLegs);

      const bridgeResult=await frame.evaluate(async()=>{
        const app=__app,w=app.yachtWalk,n=w.nav,rows=[];
        w.enterRoom('UD_R01');n.position=[17.2,0];n.stair=null;n.elevation=6;w.cameraElevation=6;w.applyPosition();
        const path=[[17.2,0],[17.2,1.7],[20.5,1.7],[20.5,0],[20.5,-.8],[21.35,-.8],[21.35,-.5]];
        let leg=0,index=1,previous;const start=performance.now(),original=app.frame;
        await new Promise((resolve,reject)=>{
          app.frame=function(dt){try{
            const t=performance.now(),points=leg%2?path.toReversed():path,to=points[index],dx=to[0]-n.position[0],dy=to[1]-n.position[1],d=Math.hypot(dx,dy),step=Math.min(d,1.12*Math.min(.075,Math.max(.001,dt)));
            if(d>1e-7)n.move(dx/d*step,dy/d*step);
            const move=performance.now()-t,b=w.model.group.userData.yacht;
            const direction=app.camera.position.clone().set(dy*b.sy,0,dx*b.sx).applyQuaternion(w.model.group.quaternion);
            w.yaw=Math.atan2(-direction.x,-direction.z);w.pitch=-.2;original(dt);
            rows.push({leg,interval:previous===undefined?null:t-previous,move,cpu:performance.now()-t,profile:app.gangwayRenderer.activeProfile});previous=t;
            if(Math.hypot(to[0]-n.position[0],to[1]-n.position[1])<.002){index++;if(index===points.length){index=1;leg++;}}
            if(leg===4){app.frame=original;resolve();}else if(t-start>90000)throw Error('Bridge cold route stalled '+n.position);
          }catch(error){app.frame=original;reject(error);}};
        });
        await app.gpu.queue.onSubmittedWorkDone();
        return {rows,start,gpu:__coldGPU.filter(e=>e.time>=start),resources:performance.getEntriesByType('resource').filter(e=>e.startTime>=start&&/mobile\/.*\.(bin|json)/.test(e.name)).map(e=>e.name),
          triangles:w.model.stats.triangles,scale:app.engine.renderScale,samples:app.gangwayRenderer.samples};
      });
      assert.deepEqual(bridgeResult.gpu,[]);assert.deepEqual(bridgeResult.resources,[]);assert.ok(bridgeResult.triangles<=25000);
      assert.equal(bridgeResult.scale,1);assert.equal(bridgeResult.samples,4);assert.ok(bridgeResult.rows.every(r=>r.profile==='upper'));
      const bridgeLegs=[0,1,2,3].map(leg=>({leg,...summarize(bridgeResult.rows.filter(r=>r.leg===leg))}));
      writeFileSync(directory+'/cold-bridge.json',JSON.stringify({ready,legs:bridgeLegs,...bridgeResult},null,2));console.log('Fresh bridge entry/return, then repeated route:',bridgeLegs);

      timings={aft:legs,sun:sunLegs,interior:interiorLegs,bridge:bridgeLegs};
    } else {
      assert.equal(ready.mtu,'ready');assert.equal(ready.strainers,'ready');
      for(const f of ready.prepared)assert.equal(f.count,f.expected,f.id+' must be prepared before walking');
      const result=await frame.evaluate(async()=>{
        const app=__app,w=app.yachtWalk,n=w.nav;app.engine.stop();await app.gpu.queue.onSubmittedWorkDone();
        const start=performance.now(),legs=[];
        w.enterRoom('MD_R01');n.position=[5.2,2.21];n.elevation=3.95;n.stair=null;
        for(let leg=0;leg<4;leg++) {
          const target=leg%2?5.2:8.35,times=[];
          for(let i=0;i<200&&Math.abs(n.position[0]-target)>.001;i++) {
            const t=performance.now();n.move(Math.sign(target-n.position[0])*Math.min(.02,Math.abs(target-n.position[0])),0);
            times.push(performance.now()-t);
          }
          if(Math.abs(n.position[0]-target)>.001)throw Error('Full-yacht route stalled');
          legs.push({leg,max:Math.max(...times),total:times.reduce((a,b)=>a+b,0)});
        }
        n.deck='LD';n.position=[4.575,1.7];n.elevation=1.58;n.stair=null;w.cameraElevation=1.58;w.applyPosition();
        const b=w.model.group.userData.yacht,d=app.camera.position.clone().set(0,2.7-b.seaReference,9*b.sx-b.length/2);
        w.model.group.localToWorld(d).sub(app.camera.position).normalize();w.yaw=Math.atan2(-d.x,-d.z);w.pitch=Math.asin(d.y);
        for(let i=0;i<3;i++){app.frame(0);await app.gpu.queue.onSubmittedWorkDone();}
        return {legs,gpu:__coldGPU.filter(e=>e.time>=start),
          resources:performance.getEntriesByType('resource').filter(e=>e.startTime>=start).map(e=>e.name),
          prepared:[...n.stairFlights.values()].map(f=>({id:f.id,count:f.clearance.preparedHeights}))};
      });
      assert.deepEqual(result.gpu,[],'Machinery entry must reuse already executed shaders and uploaded buffers');
      assert.deepEqual(result.resources,[],'Ordinary full-yacht walking must not fetch equipment');
      assert.deepEqual(result.prepared,ready.prepared.map(({id,count})=>({id,count})));
      writeFileSync(directory+'/cold-full.json',JSON.stringify({ready,...result},null,2));
      console.log('Prepared full-yacht first/repeated movement:',result.legs);
    }
    assert.deepEqual(errors,[]);
    return timings;
  } finally {release?.();await context.close();}
}

(async()=>{
  mkdirSync(out,{recursive:true});
  const browser=await chromium.launch({...(process.env.CHROME_PATH?{executablePath:process.env.CHROME_PATH}:{channel:'chrome'}),headless:true,
    args:['--enable-unsafe-webgpu','--enable-unsafe-swiftshader','--use-angle=swiftshader','--enable-features=Vulkan','--use-vulkan=swiftshader','--disable-vulkan-surface','--disable-gpu-watchdog']});
  try {
    const runs=[];
    for(let index=0;index<3;index++)runs.push(await capture(browser,true,index===0?out:out+'/cold-context-'+index));
    await capture(browser,false);
    const summaries=[];
    for(const name of Object.keys(runs[0]))for(let leg=0;leg<4;leg++){
      const p95s=runs.map(r=>r[name][leg].p95);
      const median=p95s.toSorted((a,b)=>a-b)[1];
      summaries.push({route:name,leg,p95s,median});
    }
    writeFileSync(out+'/cold-frame-budget.json',JSON.stringify(summaries,null,2));
    const slow=summaries.filter(s=>!(s.median<=25));
    assert.deepEqual(slow,[],'Cold walk exceeds the 25 ms median P95 frame budget');
  }finally{await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
