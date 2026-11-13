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
    const canonical = new URL('play.html?world=rocha&view=walk-chat' + (mobile ? '&scene=gangway' : ''), base).href;
    if (mobile) await page.locator('#yacht').contentFrame().locator('#app').waitFor({timeout:90000});
    const frame = page.frames().find(f => f.url() === canonical);
    assert.ok(frame, 'Expected the walk-chat renderer with the selected scene');
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
    const geometry = await frame.evaluate(() => {
      const model = window.__app.entranceYacht;
      let meshes = 0, triangles = 0;
      model.group.traverse(node => {
        if (node.geometry) { meshes++; triangles += node.geometry.index.count / 3; }
      });
      // Compare exact original part IDs, vertices, normals, indices and material assignments.
      const parts = model.boarding.parts.filter(p => /^(telescopic section|section |gangway )/.test(p.name));
      return { meshes, triangles, count: model.boarding.parts.length, parts: JSON.stringify(parts) };
    });
    // The headless compositor can present black even when the renderer draws.
    // Send one unchanged final render pass to a readable color attachment of
    // the same size and format. This hook exists only inside the test.
    const captured = await frame.evaluate(async () => {
      const app = window.__app;
      const first = app.gpu.frame;
      return new Promise((resolve, reject) => {
        const original = app.frame;
        app.frame = function(dt) {
          if (app.gpu.frame-first < 16) return original(dt);
          app.frame = original;
          try {
            const gpu = app.gpu, engine = app.engine;
            const width=engine.width, height=engine.height;
            const image=gpu.device.createTexture({size:[width,height],format:app.post.outputFormat,
              usage:GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.COPY_SRC});
            const previous=app.post.outputTexture;
            app.post.outputTexture={view:options=>image.createView(options)};
            try {original(dt);} finally {app.post.outputTexture=previous;}
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
              output.unmap();output.destroy();image.destroy();
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
      const fullFile = path => /\/(model\.(bin|json)|mtu[^/]*\.(bin|glb)|main-[^/]+\.js)$/.test(path);
      assert.ok(![...resources].some(fullFile), 'The isolated view must not fetch the complete yacht');
      assert.equal(geometry.meshes, 1);
      assert.equal(await frame.evaluate(() => window.__app.gangwayOnly),true);
      const panel = page.locator('#pilot');
      await panel.locator('summary').click();
      await page.getByRole('button',{name:'Recorrer la pasarela'}).click();
      await frame.waitForFunction(start=>window.__app.yachtWalk.nav.position[0]>start+.05,pose.spawn[0],{timeout:30000});
      await page.getByRole('button',{name:'Detener recorrido'}).click();
      await page.getByRole('button',{name:'Volver al inicio'}).click();
      assert.deepEqual(await frame.evaluate(()=>window.__app.yachtWalk.nav.position),pose.spawn);
      await frame.waitForFunction(() => /^[0-9]+\.[0-9] fps$/.test(document.getElementById('fps').textContent));
      console.log('Headless software renderer, boarding sample:', await frame.locator('#fps').innerText());
      await panel.locator('summary').click();
      await frame.locator('.ldm-chat-launcher').click();
      const field = frame.locator('textarea.ldm-chat-input');
      await field.fill('¿Dónde estoy?'); await field.press('Enter');
      await frame.locator('.ldm-chat-log').getByText(/ubicación|ubicaci.n|Muelle|pasarela/i).first().waitFor();
      assert.ok(![...resources].some(fullFile), 'Ordinary chat and crossing must stay isolated');
      await frame.getByRole('button',{name:'Minimizar chat',exact:true}).click();
      await frame.locator('[data-explore]').click();
      await frame.getByRole('button',{name:'Explorar el yate completo'}).click();
      await frame.waitForFunction(() => window.__app.gangwayOnly === false, null, {timeout:120000});
      assert.ok([...resources].some(path => path.endsWith('/model.bin')));
      assert.equal(await frame.locator('.luz-yacht-controls').count(),1);
      assert.equal(await frame.locator('#ldm-chat-widget').count(),1);
      await frame.locator('[data-room="MD_R02"]').click();
      assert.equal(await frame.evaluate(() => window.__app.yachtWalk.nav.room.id),'MD_R02');
      assert.ok(![...resources].some(path=>/\/mobile\/(coast\.jpg|gangway\.bin\.gz|scene\.js|renderer\.js)/.test(path)));
    }
    return {pose,image,geometry};
  } finally {await context.close();}
}

(async()=>{
  const browser = await chromium.launch({channel:'chrome',headless:true,
    args:['--enable-unsafe-webgpu','--enable-unsafe-swiftshader','--use-angle=swiftshader','--enable-features=Vulkan','--use-vulkan=swiftshader','--disable-vulkan-surface','--disable-gpu-watchdog']});
  try {
    const original=await capture(browser,false), mobile=await capture(browser,true);
    assert.equal(mobile.geometry.parts, original.geometry.parts);
    assert.equal(mobile.geometry.count, JSON.parse(original.geometry.parts).length);
    assert.ok(mobile.geometry.triangles < original.geometry.triangles / 10);
    const {width,height,data} = mobile.image;
    let dark = 0, light = 0, changed = 0;
    for (let i = 0; i < data.length; i += 4) {
      if (data[i] < 110) dark++;
      if (data[i] > 135) light++;
      if (Math.abs(original.image.data[i] - data[i]) > 16) changed++;
    }
    assert.ok(dark > width*height*.003 && light > width*height*.01, 'Gangway frame must show geometry and sky');
    assert.ok(changed > width*height*.02, 'Full yacht must disappear');
    console.log(JSON.stringify({fullTriangles:original.geometry.triangles, gangwayTriangles:mobile.geometry.triangles,
      gangwayMeshes:mobile.geometry.meshes, parts:mobile.geometry.count, dark, light, changed}));
  } finally {await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
