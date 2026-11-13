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
    // SwiftShader can present a black compositor screenshot while the WebGPU
    // color attachment contains the image. Read the actual presented texture
    // on a completed frame. The published renderer requests COPY_SRC already.
    const captured = await frame.evaluate(async () => {
      const app = window.__app;
      const first = app.gpu.frame;
      return new Promise((resolve, reject) => {
        const original = app.frame;
        app.frame = function(dt) {
          original(dt);
          if (app.gpu.frame-first < 16) return;
          app.frame = original;
          try {
            const gpu = app.gpu, image = gpu.context.getCurrentTexture();
            const width = image.width, height = image.height;
            const stride = Math.ceil(width*4/256)*256;
            const output = gpu.device.createBuffer({size:stride*height,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ});
            const encoder = gpu.device.createCommandEncoder();
            encoder.copyTextureToBuffer({texture:image},{buffer:output,bytesPerRow:stride},[width,height]);
            gpu.queue.submit([encoder.finish()]);
            output.mapAsync(GPUMapMode.READ).then(()=>{
              const data = new Uint8Array(output.getMappedRange());
              const bgra = image.format.startsWith('bgra');
              const segments = [];
              for(let y=0;y<height;y++){
                const row = data.slice(y*stride,y*stride+width*4);
                if(bgra)for(let x=0;x<row.length;x+=4)[row[x],row[x+2]]=[row[x+2],row[x]];
                segments.push(String.fromCharCode(...row));
              }
              output.unmap();output.destroy();
              resolve({pixels:btoa(segments.join('')),width,height});
            },reject);
          }catch(e){reject(e);}
        };
      });
    });
    const image=new PNG({width:captured.width,height:captured.height});
    image.data=Buffer.from(captured.pixels,'base64');
    writeFileSync(out + (mobile ? '/mobile.png' : '/walk-chat.png'),PNG.sync.write(image));
    console.log(mobile?'mobile':'walk-chat',JSON.stringify(errors));
    if (mobile) {
      const panel = page.locator('#pilot');
      await panel.locator('summary').click();
      await page.getByRole('button',{name:'Recorrer la pasarela'}).click();
      await frame.waitForFunction(start=>window.__app.yachtWalk.nav.position[0]>start+.05,pose.spawn[0],{timeout:30000});
      await page.getByRole('button',{name:'Detener recorrido'}).click();
      await page.getByRole('button',{name:'Volver al inicio'}).click();
      assert.deepEqual(await frame.evaluate(()=>window.__app.yachtWalk.nav.position),pose.spawn);
      assert.ok(![...resources].some(path=>/\/mobile\/(coast\.jpg|gangway\.bin\.gz|scene\.js|renderer\.js)/.test(path)));
    }
    return {pose,image};
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
