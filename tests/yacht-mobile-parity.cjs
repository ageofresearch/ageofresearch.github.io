// Run against the static site with playwright-core, pngjs and Google Chrome.
const { chromium } = require('playwright-core');
const { PNG } = require('pngjs');
const assert = require('node:assert/strict');
const { writeFileSync, mkdirSync } = require('node:fs');
const base = process.env.YACHT_BASE || 'http://127.0.0.1:8764/tidewater-rocha/';
const out = process.env.YACHT_OUTPUT || '/tmp/yacht-mobile-parity';
mkdirSync(out, { recursive:true });

async function capture(browser, mobile) {
  const context = await browser.newContext({viewport:{width:360,height:540}, deviceScaleFactor:1, hasTouch:true});
  try {
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', error=>errors.push(error.message.slice(0,350)));
    page.on('console', message=>{if(message.type()==='error' && errors.length<12)errors.push(message.text().slice(0,350));});
    const resources = new Set();
    page.on('request', request => resources.add(new URL(request.url()).pathname));
    const entry = mobile ? 'mobile.html?world=rocha' : 'play.html?world=rocha&view=walk-chat';
    await page.goto(base + entry, {waitUntil:'domcontentloaded',timeout:90000});
    const canonical = new URL('play.html?world=rocha&view=walk-chat', base).href;
    if (mobile) await page.locator('#yacht').contentFrame().locator('#app').waitFor({timeout:90000});
    const frame = page.frames().find(f => f.url() === canonical);
    assert.ok(frame, 'Both entry points must use the exact walk-chat document');
    await frame.waitForFunction(() => ['ready','unsupported'].includes(window.__mapsPublicStatus?.status), null, {timeout:180000});
    const state = await frame.evaluate(() => window.__mapsPublicStatus);
    assert.equal(state.status,'ready',JSON.stringify(state));
    if (mobile) await page.locator('#pilot').waitFor({state:'visible'});
    const pose = await frame.evaluate(() => {
      const app = window.__app;
      return {position:app.camera.position.toArray(),rotation:app.camera.quaternion.toArray(),
        walking:[...app.yachtWalk.nav.position], spawn:app.yachtWalk.model.boarding.room.spawn.slice(0,2)};
    });
    assert.deepEqual(pose.walking,pose.spawn);
    // Hide only interface chrome while comparing the underlying rendered scene.
    await frame.addStyleTag({content:'body > :not(#app) {visibility:hidden!important;}'});
    const hidePanel = mobile && await page.addStyleTag({content:'#pilot {visibility:hidden!important;}'});
    // The app announces readiness before its presentation loop has converged.
    await frame.evaluate(async () => {
      const app=window.__app, start=app.gpu.frame;
      await new Promise(resolve=>{
        function wait(){if(app.gpu.frame-start>=16)resolve();else requestAnimationFrame(wait);}
        wait();
      });
      await app.gpu.queue.onSubmittedWorkDone();
    });
    const pixels = await page.screenshot({timeout:30000});
    console.log(mobile?'mobile':'walk-chat',JSON.stringify(errors));
    writeFileSync(out + (mobile ? '/mobile.png' : '/walk-chat.png'),pixels);
    if (mobile) {
      await hidePanel.evaluate(e=>e.remove());
      const panel = page.locator('#pilot');
      await panel.locator('summary').click();
      await page.getByRole('button',{name:'Recorrer la pasarela'}).click();
      await frame.waitForFunction(start=>window.__app.yachtWalk.nav.position[0]>start+.05,pose.spawn[0],{timeout:30000});
      await page.getByRole('button',{name:'Detener recorrido'}).click();
      await page.getByRole('button',{name:'Volver al inicio'}).click();
      assert.deepEqual(await frame.evaluate(()=>window.__app.yachtWalk.nav.position),pose.spawn);
      assert.ok(![...resources].some(path=>/\/mobile\/(coast\.jpg|gangway\.bin\.gz|scene\.js|renderer\.js)/.test(path)));
    }
    return {pose,image:PNG.sync.read(pixels)};
  } finally {await context.close();}
}

(async()=>{
  const browser = await chromium.launch({channel:'chrome',headless:true,
    args:['--enable-unsafe-webgpu','--enable-unsafe-swiftshader','--use-angle=swiftshader','--enable-features=Vulkan','--use-vulkan=swiftshader','--disable-vulkan-surface','--disable-gpu-watchdog']});
  try {
    const original=await capture(browser,false), mobile=await capture(browser,true);
    assert.deepEqual(mobile.pose,original.pose);
    const {width,height,data}=original.image;
    assert.equal(mobile.image.width,width);assert.equal(mobile.image.height,height);
    let error=0, dark=0, light=0;
    for(let i=0;i<data.length;i+=4){
      if(data[i]<75)dark++;if(data[i]>135)light++;
      for(let k=0;k<3;k++)error+=Math.abs(data[i+k]-mobile.image.data[i+k]);
    }
    const mean=error/(width*height*3);
    console.log(JSON.stringify({dark,light,pixels:width*height,mean}));
    assert.ok(dark>width*height*.004 && light>width*height*.01,'Reference must contain a rendered yacht');
    assert.ok(mean<6,'Mean image difference: '+mean);
    console.log(JSON.stringify({viewport:[width,height],meanRgbDifference:mean,pose:original.pose}));
  } finally {await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
