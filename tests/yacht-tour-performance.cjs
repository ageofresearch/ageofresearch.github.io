// Same-camera walk through the new fittings on one otherwise idle WebGPU worker.
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const {chromium}=require('playwright-core');

async function measure(browser,base){
  const context=await browser.newContext({viewport:{width:360,height:540},deviceScaleFactor:1,hasTouch:true});
  try{
    await context.addInitScript(()=>{
      window.tourAllocations=[];
      for(const name of ['createBuffer','createTexture','createShaderModule','createRenderPipeline','createRenderPipelineAsync','createBindGroup']){
        const native=GPUDevice.prototype[name];
        GPUDevice.prototype[name]=function(...args){tourAllocations.push(performance.now());return native.apply(this,args);};
      }
    });
    const page=await context.newPage();
    await page.goto(base+'mobile.html?world=rocha');
    await page.locator('#yacht').contentFrame().locator('#app').waitFor({timeout:90000});
    const frame=page.frames().find(f=>f.url().includes('play.html'));
    await frame.waitForFunction(()=>window.__mapsPublicStatus?.status==='ready'&&__app.entranceYacht.guestAccessLoadState==='ready',null,{timeout:180000});
    return await frame.evaluate(async()=>{
      const app=window.__app,w=app.yachtWalk,n=w.nav,b=w.model.group.userData.yacht,results=[];
      function point([x,y,z]){
        return w.model.group.localToWorld(app.camera.position.clone().set(y*b.sy,z-b.seaReference,x*b.sx-b.length/2));
      }
      for(const [room,xy,axis,target] of [
        ['swim-platform',[.35,-1.15],1,[2.4,0,3.65]],
        ['MD_R02',[9.25,0],0,[12.6,.1,4.8]],
        ['UD_R02',[14.55,0],0,[17.2,-1,6.66]],
        ['UD_R04',[26.8,-.45],1,[24.6,1.12,6.5]],
      ]){
        w.enterRoom(room);n.position=xy.slice();n.stair=null;n.elevation=n.floorHeight(...xy);
        w.cameraElevation=n.elevation;w.applyPosition();
        const d=point(target).sub(point([...xy,n.elevation+1.6])).normalize();
        w.yaw=Math.atan2(-d.x,-d.z);w.pitch=Math.asin(d.y);app.camera.rotation.set(w.pitch,w.yaw,0,'YXZ');
        const start=performance.now(),times=[],move=[],original=app.frame;
        let previous=null,tick=0,travelled=0;
        await new Promise(resolve=>{app.frame=function(dt){
          const t=performance.now();if(previous!==null)times.push(t-previous);previous=t;
          const v=[0,0],before=n.position[axis];
          v[axis]=tick<60?.01:-.01;n.move(...v);travelled+=Math.abs(n.position[axis]-before);
          move.push(performance.now()-t);original.call(app,dt);
          if(++tick===120){app.frame=original;resolve();}
        };});
        const sorted=times.toSorted((a,b)=>a-b),mean=times.reduce((a,b)=>a+b)/times.length;
        results.push({room,mean,fps:1000/mean,p95:sorted[Math.ceil(sorted.length*.95)-1],over25:times.filter(t=>t>25).length,
          over50:times.filter(t=>t>50).length,maxMovementMs:Math.max(...move),travelled,
          gpuAllocations:tourAllocations.filter(t=>t>=start).length,requests:performance.getEntriesByType('resource').filter(e=>e.startTime>=start).length,
          scale:app.engine.renderScale,samples:app.gangwayRenderer.samples,triangles:w.model.stats.triangles,geometryBytes:w.model.stats.residentGeometryBytes});
      }
      return results;
    });
  }finally{await context.close();}
}

(async()=>{
  const candidate=process.env.YACHT_BASE||'http://127.0.0.1:8764/tidewater-rocha/';
  const reference=process.env.YACHT_REFERENCE_BASE||'http://127.0.0.1:8765/tidewater-rocha/';
  const output=path.join(process.env.YACHT_OUTPUT||'/tmp/yacht-mobile-parity','tour');
  fs.mkdirSync(output,{recursive:true});
  const browser=await chromium.launch({...(process.env.CHROME_PATH?{executablePath:process.env.CHROME_PATH}:{channel:'chrome'}),headless:true,
    args:['--enable-unsafe-webgpu','--enable-unsafe-swiftshader','--use-angle=swiftshader','--enable-features=Vulkan','--use-vulkan=swiftshader','--disable-vulkan-surface','--disable-gpu-watchdog']});
  const runs={reference:[],candidate:[]},med=v=>v.toSorted((a,b)=>a-b)[1];
  try{
    for(let i=0;i<3;i++)for(const name of i%2?['candidate','reference']:['reference','candidate']){
      const rows=await measure(browser,name==='candidate'?candidate:reference);
      runs[name].push(rows);fs.writeFileSync(path.join(output,'timings.json'),JSON.stringify(runs,null,2));
      for(const r of rows){
        assert.equal(r.scale,1);assert.equal(r.samples,4);assert.ok(r.triangles<=25000);
        assert.equal(r.requests,0);assert.equal(r.gpuAllocations,0);
        assert.ok(r.travelled>1.15,`${name} route blocked in ${r.room}, distance ${r.travelled}`);
      }
    }
    for(let i=0;i<4;i++){
      const r=runs.reference.map(rows=>rows[i]),c=runs.candidate.map(rows=>rows[i]),room=c[0].room;
      const mean=med(c.map(v=>v.mean)),baseline=med(r.map(v=>v.mean)),p95=med(c.map(v=>v.p95));
      console.log({room,mean,baseline,p95});
      if(process.env.GITHUB_ACTIONS)console.log(`::notice title=Furnished walk · ${room}::Mean ${mean.toFixed(2)} ms, reference ${baseline.toFixed(2)} ms, P95 ${p95.toFixed(2)} ms`);
      assert.ok(1000/mean>=40&&mean<=baseline*1.05&&p95<=25,room+' timing budget exceeded');
    }
  }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
