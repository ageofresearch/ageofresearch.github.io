// Run alone with the reference and candidate served on separate ports.
const assert = require('node:assert/strict');
const {mkdirSync, writeFileSync} = require('node:fs');
const {chromium} = require('playwright-core');
const {compareRoute} = require('./yacht-route-performance-comparison.cjs');
const {quantileUpper95} = require('./yacht-performance-statistics.cjs');

async function measure(browser, base, candidate) {
  const context = await browser.newContext({viewport:{width:360,height:540}, deviceScaleFactor:1, hasTouch:true});
  try {
    await context.addInitScript(() => {
      window.renderAllocations = [];
      for (const name of ['createBuffer','createTexture','createShaderModule','createRenderPipeline','createRenderPipelineAsync','createBindGroup']) {
        const native = GPUDevice.prototype[name];
        GPUDevice.prototype[name] = function(...args) {
          window.renderAllocations.push(performance.now());
          return native.apply(this,args);
        };
      }
    });
    const page = await context.newPage(), errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(base, {waitUntil:'domcontentloaded'});
    await page.locator('#yacht').contentFrame().locator('#app').waitFor({timeout:90000});
    const frame = page.frames().find(frame => frame.url().includes('play.html'));
    await frame.waitForFunction(() => window.__mapsPublicStatus?.status === 'ready',null,{timeout:180000});
    const result = await frame.evaluate(async () => {
      const app = window.__app, walk = app.yachtWalk, nav = walk.nav;
      const model = walk.model;
      if (model.guestAccessLoadState !== 'ready') throw Error('The final package did not load');
      walk.enterRoom('MD_R02');
      nav.position = [7.7,.1];
      walk.cameraElevation = nav.elevation;
      walk.applyPosition();
      const start = performance.now(), render = app.frame, rows = [];
      let leg = 0, previous;
      await new Promise((resolve,reject) => {
        app.frame = function(dt) {
          try {
            const now = performance.now();
            const target = leg%2 ? 7.7 : 10.5;
            const dx = target-nav.position[0];
            const direction = Math.sign(dx);
            nav.move(direction*Math.min(Math.abs(dx),1.12*Math.min(.075,dt)),0);
            const moved = performance.now();
            const look = app.camera.position.clone().set(0,0,direction).applyQuaternion(model.group.quaternion);
            walk.yaw = Math.atan2(-look.x,-look.z);
            walk.pitch = -.15;
            render(dt);
            rows.push({leg,interval:previous===undefined?null:now-previous,profile:app.gangwayRenderer.activeProfile,
              movementMs:moved-now,triangles:model.stats.triangles});
            previous = now;
            if (Math.abs(target-nav.position[0])<1e-5) {leg++;previous=undefined;}
            if (leg===4) {app.frame=render;resolve();}
            else if (now-start>45000) throw Error('Saloon route blocked at '+nav.position);
          } catch (error) {app.frame=render;reject(error);}
        };
      });
      await app.gpu.queue.onSubmittedWorkDone();
      return {rows,hasInteriorProfile:Object.hasOwn(model.guestAccess.profiles,'interior'),width:app.engine.width,height:app.engine.height,scale:app.engine.renderScale,samples:app.gangwayRenderer.samples,
        allocations:window.renderAllocations.filter(time=>time>=start).length,
        downloads:performance.getEntriesByType('resource').filter(e=>e.startTime>=start&&/\.(bin|json|glb)(\?|$)/.test(e.name)).length};
    });
    assert.deepEqual(errors,[]);
    assert.deepEqual([result.width,result.height,result.scale,result.samples],[360,540,1,4]);
    assert.equal(result.allocations,0);
    assert.equal(result.downloads,0);
    assert.ok(result.rows.every(row=>row.triangles<=25000));
    if(candidate)assert.equal(result.hasInteriorProfile,false,'The main deck must use one continuous profile');
    assert.deepEqual([...new Set(result.rows.map(row=>row.profile))],result.hasInteriorProfile?['exterior','interior']:['exterior']);
    const legs = [0,1,2,3].map(leg=>{
      const rows = result.rows.filter(row=>row.leg===leg);
      const times = rows.map(row=>row.interval).filter(Number.isFinite).sort((a,b)=>a-b);
      return {p95:times[Math.floor(times.length*.95)],p95Upper95:quantileUpper95(times),
        fps:times.length*1000/times.reduce((a,b)=>a+b,0),max:times.at(-1),
        over25:times.filter(t=>t>25).length,over50:times.filter(t=>t>50).length,
        maxMove:Math.max(...rows.map(row=>row.movementMs))};
    });
    return {...result,legs};
  } finally {await context.close();}
}

async function main() {
  const referenceURL = process.env.YACHT_REFERENCE_BASE && new URL('mobile.html',process.env.YACHT_REFERENCE_BASE).href;
  const candidateURL = process.env.YACHT_SALOON_URL || 'http://127.0.0.1:8764/tidewater-rocha/mobile.html';
  const out = process.env.YACHT_OUTPUT || '/tmp/yacht-saloon-performance';
  mkdirSync(out,{recursive:true});
  const browser = await chromium.launch({...(process.env.CHROME_PATH?{executablePath:process.env.CHROME_PATH}:{channel:'chrome'}), headless:true,
    args:['--enable-unsafe-webgpu','--enable-unsafe-swiftshader','--use-angle=swiftshader','--enable-features=Vulkan','--use-vulkan=swiftshader','--disable-vulkan-surface','--disable-gpu-watchdog']});
  const reference = [], candidate = [];
  try {
    for (let round=0;round<3;round++) {
      for (const isCandidate of referenceURL?(round%2?[true,false]:[false,true]):[true]) {
        const result = await measure(browser,isCandidate?candidateURL:referenceURL,isCandidate);
        (isCandidate?candidate:reference).push(result);
        console.log(isCandidate?'candidate':'reference',round,result.legs);
      }
    }
  } finally {await browser.close();}
  writeFileSync(out+'/saloon-frames.json',JSON.stringify({reference,candidate},null,2));
  const comparison = referenceURL ? compareRoute(reference,candidate,'saloon') : null;
  for (const leg of [0,1,2,3]) {
    const median = values => values.sort((a,b)=>a-b)[1];
    assert.ok(median(candidate.map(run=>run.legs[leg].p95))<=25,'Saloon P95 exceeds 25 ms');
    assert.ok(median(candidate.map(run=>run.legs[leg].fps))>=40,'Saloon FPS fell below 40');
  }
  console.log('Saloon comparison',comparison);
}

main().catch(error=>{console.error(error);process.exitCode=1;});
