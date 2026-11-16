// Run against the static site with playwright-core, pngjs and Google Chrome.
const { chromium } = require('playwright-core');
const { PNG } = require('pngjs');
const assert = require('node:assert/strict');
const { writeFileSync, readFileSync, mkdirSync } = require('node:fs');
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
    const canonical = new URL('play.html?world=rocha&view=walk-chat' + (mobile ? '&scene=gangway&v=gangway-teak-1' : ''), base).href;
    if (mobile) await page.locator('#yacht').contentFrame().locator('#app').waitFor({timeout:90000});
    const frame = page.frames().find(f => f.url() === canonical);
    assert.ok(frame, 'Expected '+canonical+'; got '+page.frames().map(f=>f.url()).join(', '));
    await frame.waitForFunction(() => ['ready','unsupported'].includes(window.__mapsPublicStatus?.status), null, {timeout:180000});
    const state = await frame.evaluate(() => window.__mapsPublicStatus);
    assert.equal(state.status,'ready',JSON.stringify(state));
    if (mobile) {
      await page.locator('#pilot').waitFor({state:'visible'});
      await frame.waitForFunction(()=>window.__app.entranceYacht.upperLoadState==='ready',null,{timeout:90000});
    }
    if (mobile) await require('./yacht-joystick.cjs')(page, frame, out);
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
      const parts = model.boarding.parts.filter(p => /^(telescopic section|section |gangway |shaped lower boarding|widened upper teak boarding|raised teak cockpit threshold|rounded teak landing lip|landing handhold|landing mounted post|open inboard |gate )/.test(p.name));
      const furniture = model.terrace ? model.terrace.parts.filter(p=>p.role==='furniture') :
        model.exterior.parts.filter(p=>['MD_FUR_003','MD_FUR_007','MD_FUR_008'].includes(p.anchor));
      return { meshes, triangles, count: model.boarding.parts.length, parts: JSON.stringify(parts),
        furniture:furniture.map(p=>[p.id,p.materialID,p.indices.length/3,p.bounds]),
        stern:model.transom.parts.filter(p=>p.deck === 'MD').map(p=>[p.id,p.materialID,p.triangles,p.bounds]) };
    });
    // The headless compositor can present black even when the renderer draws.
    // Send one unchanged final render pass to a readable color attachment of
    // the same size and format. This hook exists only inside the test.
    const readFrame = require('./yacht-frame-reader.cjs')(frame);
    const captured = await readFrame();
    const image=new PNG({width:captured.width,height:captured.height});
    image.data=Buffer.from(captured.pixels,'base64');
    writeFileSync(out + (mobile ? '/mobile.png' : '/walk-chat.png'),PNG.sync.write(image));
    console.log(mobile?'mobile':'walk-chat',JSON.stringify(errors));
    if (!mobile) await require('./yacht-stair-surfaces.cjs')(frame,out,readFrame);
    await require('./yacht-saloon.cjs')(frame,out,readFrame,mobile);
    await require('./yacht-upper.cjs')(frame,out,readFrame,mobile);
    await require('./yacht-sun.cjs')(frame,out,readFrame,mobile);
    await require('./yacht-upper-interior.cjs')(frame,out,readFrame,mobile);
    await require('./yacht-bridge.cjs')(frame,out,readFrame,mobile);
    await require('./yacht-bow.cjs')(frame,out,readFrame,mobile);
    await require('./yacht-bridge-access.cjs')(frame,out,readFrame,mobile);
    await require('./yacht-spatial-views.cjs')(frame,out,readFrame,mobile);
    if (mobile) {
      const fullFile = path => /\/(model\.(bin|json)|mtu[^/]*\.(bin|glb))$|\/assets\/main-[^/]+\.js$/.test(path);
      assert.ok(![...resources].some(fullFile), 'The isolated view must not fetch the complete yacht');
      assert.equal(geometry.meshes, 2);
      assert.equal(await frame.evaluate(() => window.__app.gangwayOnly),true);
      assert.deepEqual(captured.passLabels,['Gangway to screen']);
      assert.equal(captured.indexedDraws,2);
      assert.equal(await frame.evaluate(() => !!(window.__app.post || window.__app.shadows)),false);
      await require('./yacht-stern-access.cjs')(page,frame,out,readFrame);
      async function measureStern() {
        // Read the displayed image at the actual pose, then omit only the
        // original transom parts in the same two batches for a control frame.
        const visible = await readFrame();
        const coverage = await frame.evaluate(() => {
          const app = window.__app, model = app.entranceYacht;
          const basis = model.group.userData.yacht;
          function projected(box) {
            const points=[];
            for (const x of [box[0],box[3]]) for (const y of [box[1],box[4]]) for (const z of [box[2],box[5]]) {
              const p=app.camera.position.clone().set(y*basis.sy,z-basis.seaReference,x*basis.sx-basis.length/2);
              p.applyMatrix4(model.group.matrixWorld).project(app.camera);
              points.push([p.x,p.y,p.z]);
            }
            return points;
          }
          const letter=projected(model.transom.nameBounds);
          return {within:letter.every(([x,y,z])=>Math.abs(x)<1 && Math.abs(y)<1 && z>0 && z<=1),
            width:(Math.max(...letter.map(p=>p[0]))-Math.min(...letter.map(p=>p[0])))*app.engine.width/2,
            skip:model.bow.profiles.exterior.audit.filter(p=>model.transom.parts.some(s=>s.id===p.id)).reduce((n,p)=>n+p.triangles*3,0)};
        });
        await frame.evaluate(skip=>{
          const native=GPURenderPassEncoder.prototype.drawIndexed;
          window.restoreSternDraw=()=>{GPURenderPassEncoder.prototype.drawIndexed=native};
          GPURenderPassEncoder.prototype.drawIndexed=function(count,...rest){
            return native.call(this,count>skip ? count-skip : count,...rest);
          };
        },coverage.skip);
        let omitted;
        try { omitted=await readFrame(); }
        finally { await frame.evaluate(()=>{window.restoreSternDraw();delete window.restoreSternDraw;}); }
        const a=Buffer.from(visible.pixels,'base64'), b=Buffer.from(omitted.pixels,'base64');
        let changed=0;
        for(let i=0;i<a.length;i+=4) if(Math.max(...[0,1,2].map(k=>Math.abs(a[i+k]-b[i+k])))>12) changed++;
        const share=changed/(visible.width*visible.height);
        console.log('Original stern visible in frame:',{share,letterPixels:coverage.width,fullyFramed:coverage.within});
        assert.ok(share>.09,'The stern must visibly occupy the camera frame');
        return coverage;
      }
      const firstView=await measureStern();
      assert.ok(firstView.within && firstView.width>60,'The original name must be framed on first paint');
      const panel = page.locator('#pilot');
      await panel.locator('summary').click();
      const smooth = panel.locator('#smooth');
      assert.ok(await smooth.isChecked());
      assert.ok(captured.resolved);
      await smooth.uncheck();
      const aliased = await readFrame();
      assert.deepEqual(aliased.passLabels, captured.passLabels);
      assert.equal(aliased.resolved,false);
      const before = new PNG({width:aliased.width,height:aliased.height});
      before.data = Buffer.from(aliased.pixels,'base64');
      writeFileSync(out+'/mobile-no-aa.png',PNG.sync.write(before));
      // A box-filtered 2× capture independently approximates the true pixel coverage.
      // Keep the camera fixed and score the two bands containing the rails and cables.
      await frame.evaluate(() => window.__app.engine.setRenderScale(2));
      const reference = await readFrame();
      const hi = Buffer.from(reference.pixels,'base64');
      assert.equal(reference.width, image.width*2);
      let rawError=0, smoothError=0;
      for (let y=Math.floor(image.height*.49); y<image.height*.88; y++) {
        for (let x=0; x<image.width; x++) {
          if (x>image.width*.43 && x<image.width*.57) continue;
          for (let c=0;c<3;c++) {
            const i=4*(y*image.width+x)+c;
            const j=4*(2*y*reference.width+2*x)+c;
            const ref=(hi[j]+hi[j+4]+hi[j+reference.width*4]+hi[j+reference.width*4+4])/4;
            rawError+=Math.abs(before.data[i]-ref);
            smoothError+=Math.abs(image.data[i]-ref);
          }
        }
      }
      console.log('Rail-band error reduction vs 2× box reference, percent:',(100*(1-smoothError/rawError)).toFixed(1));
      assert.ok(smoothError < rawError*.9,'Smoothing should improve visible rail and cable edges');
      await frame.evaluate(() => window.__app.engine.setRenderScale(1));
      await smooth.check();
      await page.getByRole('button',{name:'Entrar al salón'}).click();
      await frame.waitForFunction(start=>window.__app.yachtWalk.nav.position[0]>start+.05,pose.spawn[0],{timeout:30000});
      await page.getByRole('button',{name:'Detener recorrido'}).click();
      await page.getByRole('button',{name:'Entrar al salón'}).click();
      await panel.getByRole('button',{name:'Regresar por la pasarela'}).waitFor({timeout:45000});
      const atLanding = await frame.evaluate(() => {
        const w=window.__app.yachtWalk, b=w.model.boarding;
        return {room:w.nav.location().name, landed:w.nav.position[0]-b.end, level:w.nav.elevation, expected:b.layout.deckHeight};
      });
      assert.equal(atLanding.room,'Salón principal');
      assert.ok(atLanding.landed>5.8);
      assert.equal(atLanding.level,atLanding.expected);
      const back=await readFrame();
      const backImage = new PNG({width:back.width,height:back.height});
      backImage.data=Buffer.from(back.pixels,'base64');
      writeFileSync(out+'/terrace-entrance.png',PNG.sync.write(backImage));
      let terracePixels=0;
      for(let i=0;i<backImage.data.length;i+=4) {
        if(Math.max(...[0,1,2].map(k=>Math.abs(backImage.data[i+k]-[163,153,135][k])))>16)terracePixels++;
      }
      assert.ok(terracePixels>back.width*back.height*.2,'Arrival must frame the furnished saloon');
      assert.equal(back.indexedDraws,2);
      assert.deepEqual(back.passLabels,['Gangway to screen']);
      await panel.getByRole('button',{name:'Regresar por la pasarela'}).click();
      await frame.waitForFunction(x=>Math.abs(window.__app.yachtWalk.nav.position[0]-x)<.005,pose.spawn[0],{timeout:45000});
      await page.getByRole('button',{name:'Volver al inicio'}).click();
      assert.deepEqual(await frame.evaluate(()=>window.__app.yachtWalk.nav.position),pose.spawn);
      // Capture the same useful close views in CI, with the native camera and
      // collision map. The furniture remains in the same two render batches.
      for(const {name,position,target} of [
        {name:'terrace-landing',position:[4.5,3.1],target:[5.5,-.25,4.6]},
        {name:'terrace-bar',position:[7.7,-.7],target:[6.48,-1.98,4.85]},
      ]) {
        await frame.evaluate(({position,target})=>{
          const app=window.__app, w=app.yachtWalk, basis=w.model.group.userData.yacht;
          if(!w.nav.floorSafe(...position))throw Error('Unsafe inspection pose');
          w.nav.position=position;w.nav.elevation=w.nav.floorHeight(...position);
          w.cameraElevation=w.nav.elevation;w.applyPosition();
          const look=app.camera.position.clone().set(target[1]*basis.sy,target[2]-basis.seaReference,target[0]*basis.sx-basis.length/2);
          w.model.group.localToWorld(look).sub(app.camera.position).normalize();
          w.yaw=Math.atan2(-look.x,-look.z);w.pitch=Math.asin(look.y);
        },{position,target});
        const close=await readFrame();
        assert.equal(close.indexedDraws,2);
        assert.deepEqual(close.passLabels,['Gangway to screen']);
        const png=new PNG({width:close.width,height:close.height});
        png.data=Buffer.from(close.pixels,'base64');
        writeFileSync(out+'/'+name+'.png',PNG.sync.write(png));
      }
      await frame.evaluate(()=>{
        const w=window.__app.yachtWalk;
        w.enterRoom('MD_R01');
        if(!w.nav.safe(...w.nav.position))throw Error('Unsafe terrace spawn');
        w.enterRoom('boarding');
      });
      await frame.waitForFunction(() => /^[0-9]+\.[0-9] fps$/.test(document.getElementById('fps').textContent));
      console.log('Headless software renderer, boarding sample:', await frame.locator('#fps').innerText());
      const scale = panel.locator('#scale');
      const compare = panel.locator('#compare');
      await scale.selectOption('0.5');
      assert.deepEqual(await frame.evaluate(() => [window.__app.engine.width,window.__app.engine.height]),[180,270]);
      await compare.click();
      await page.getByRole('button',{name:'Cancelar comparación'}).click();
      assert.equal(await panel.locator('#progress').textContent(),'Prueba interrumpida');
      assert.equal(await frame.evaluate(() => window.__app.engine.renderScale),.5);
      await scale.selectOption('1');
      await compare.click();
      await panel.locator('#results li').nth(1).waitFor({timeout:190000});
      const measurements = await panel.locator('#results li').allTextContents();
      for (const [i,dimensions] of ['360 × 540','180 × 270'].entries()) {
        assert.ok(measurements[i].includes(dimensions));
        assert.match(measurements[i],/[0-9]+\.[0-9]+ FPS de media/);
      }
      console.log('Two real-time 60s walks, Chrome software rendering:',measurements);
      assert.equal(await panel.locator('#progress').textContent(),'Comparación terminada');
      assert.equal(await frame.evaluate(() => window.__app.engine.renderScale),1);
      assert.deepEqual(await frame.evaluate(() => window.__app.yachtWalk.nav.position),pose.spawn);
      const compareEdges = panel.locator('#compareEdges');
      await compareEdges.click();
      assert.ok(!(await smooth.isChecked()));
      await compareEdges.click();
      assert.ok(await smooth.isChecked());
      assert.equal(await frame.evaluate(() => window.__app.gangwayRenderer.samples),4);
      await compareEdges.click();
      await panel.locator('#results li').nth(1).waitFor({timeout:190000});
      const edges = await panel.locator('#results li').allTextContents();
      assert.ok(edges[0].startsWith('Sin suavizado (360 × 540)'));
      assert.ok(edges[1].startsWith('MSAA 4× (360 × 540)'));
      console.log('Fixed-resolution AA walks:',edges);
      assert.ok(await smooth.isChecked());
      await panel.locator('summary').click();
      await frame.locator('.ldm-chat-launcher').click();
      const field = frame.locator('textarea.ldm-chat-input');
      await field.fill('¿Dónde estoy?'); await field.press('Enter');
      await frame.locator('.ldm-chat-log').getByText(/ubicación|ubicaci.n|Muelle|pasarela/i).first().waitFor();
      assert.ok(![...resources].some(fullFile), 'Ordinary chat and crossing must stay isolated');
      await frame.getByRole('button',{name:'Minimizar chat',exact:true}).click();
      await frame.evaluate(()=>window.__app.yachtWalk.enterRoom('swim-platform'));
      await frame.locator('[data-explore]').click();
      await frame.getByRole('button',{name:'Explorar el yate completo'}).click();
      await frame.waitForFunction(() => window.__app.gangwayOnly === false, null, {timeout:120000});
      assert.ok([...resources].some(path => path.endsWith('/model.bin')));
      assert.equal(await frame.locator('.luz-yacht-controls').count(),1);
      assert.deepEqual(await frame.evaluate(()=>({deck:window.__app.yachtWalk.nav.deck,
        position:window.__app.yachtWalk.nav.position,height:window.__app.yachtWalk.nav.elevation})),
        {deck:'MD',position:[5.6,.8],height:3.95});
      await frame.locator('[data-deck="MD"]').click();
      await frame.locator('.luz-stick .front').waitFor();
      assert.equal(await frame.locator('.luz-stick').count(),1);
      assert.equal(await frame.locator('[data-key]').count(),0);
      assert.equal(await frame.evaluate(() => !!(window.__app.post && window.__app.shadows)),true);
      assert.equal(await frame.locator('#ldm-chat-widget').count(),1);
      await frame.locator('[data-room="MD_R02"]').click();
      assert.equal(await frame.evaluate(() => window.__app.yachtWalk.nav.room.id),'MD_R02');
      assert.ok(![...resources].some(path=>/\/mobile\/(coast\.jpg|gangway\.bin\.gz|scene\.js|renderer\.js)/.test(path)));
    }
    return {pose,image,geometry};
  } finally {await context.close();}
}

function compare(original,mobile) {
    assert.equal(mobile.geometry.parts, original.geometry.parts);
    assert.deepEqual(mobile.geometry.stern,original.geometry.stern);
    assert.deepEqual(mobile.geometry.furniture,original.geometry.furniture);
    assert.equal(mobile.geometry.furniture.length,25);
    assert.ok(mobile.geometry.stern.some(p=>p[0].includes('LUZ-DE-MAR')));
    assert.equal(mobile.geometry.count, JSON.parse(original.geometry.parts).length);
    assert.ok(mobile.geometry.triangles <= 25000,'Keep the furnished scene inside its explicit mobile budget');
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
}
(async()=>{
  const mode=process.env.YACHT_CHECK||'all';
  assert.ok(['all','mobile','full','compare'].includes(mode),'Unknown YACHT_CHECK '+mode);
  if(mode==='compare'){
    const read=name=>({...JSON.parse(readFileSync(out+'/'+name+'-result.json')),image:PNG.sync.read(readFileSync(out+(name==='full'?'/walk-chat.png':'/mobile.png')))});
    compare(read('full'),read('mobile'));return;
  }
  const browser=await chromium.launch({...(process.env.CHROME_PATH?{executablePath:process.env.CHROME_PATH}:{channel:'chrome'}),headless:true,
    args:['--enable-unsafe-webgpu','--enable-unsafe-swiftshader','--use-angle=swiftshader','--enable-features=Vulkan','--use-vulkan=swiftshader','--disable-vulkan-surface','--disable-gpu-watchdog']});
  try {
    let mobile,original;
    if(mode!=='full'){
      mobile=await capture(browser,true);
      writeFileSync(out+'/mobile-result.json',JSON.stringify({pose:mobile.pose,geometry:mobile.geometry}));
    }
    if(mode!=='mobile'){
      original=await capture(browser,false);
      writeFileSync(out+'/full-result.json',JSON.stringify({pose:original.pose,geometry:original.geometry}));
    }
    if(mode!=='full'){
      await require('./yacht-saloon-loading.cjs')(browser,base);
      await require('./yacht-upper-loading.cjs')(browser,base);
      await require('./yacht-sun-loading.cjs')(browser,base);
      await require('./yacht-upper-interior-loading.cjs')(browser,base);
      await require('./yacht-bridge-loading.cjs')(browser,base);
      await require('./yacht-bow-loading.cjs')(browser,base);
      await require('./yacht-bridge-access-loading.cjs')(browser,base);
    }
    if(mode==='all')compare(original,mobile);
  }finally{await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
