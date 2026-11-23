const {chromium}=require('playwright-core');
const {mkdirSync}=require('node:fs');
const assert=require('node:assert/strict');
const base=process.env.YACHT_BASE||'http://127.0.0.1:8764/tidewater-rocha/';
const out=process.env.YACHT_OUTPUT||'/tmp/yacht-guest';
(async()=>{
  mkdirSync(out,{recursive:true});
  const browser=await chromium.launch({...(process.env.CHROME_PATH?{executablePath:process.env.CHROME_PATH}:{channel:'chrome'}),headless:true,
    args:['--enable-unsafe-webgpu','--enable-unsafe-swiftshader','--use-angle=swiftshader','--enable-features=Vulkan','--use-vulkan=swiftshader','--disable-vulkan-surface','--disable-gpu-watchdog']});
  try {
    const mobile=process.env.YACHT_CHECK!=='full',context=await browser.newContext({viewport:{width:360,height:540},deviceScaleFactor:1,hasTouch:true});
    try {
      const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
      await page.goto(base+(mobile?'mobile.html':'play.html?world=rocha&view=walk-chat'),{waitUntil:'domcontentloaded'});
      if(mobile)await page.locator('#yacht').contentFrame().locator('#app').waitFor({timeout:90000});
      const frame=page.frames().find(f=>f.url().includes('play.html'));
      await frame.waitForFunction(()=>window.__mapsPublicStatus?.status==='ready',null,{timeout:180000});
      if(mobile)assert.equal(await frame.evaluate(()=>__app.entranceYacht.guestAccessLoadState),'ready');
      await require('./yacht-guest-access.cjs')(frame,out,require('./yacht-frame-reader.cjs')(frame),mobile);
      if(mobile)console.log('Guest stair motion',await require('./yacht-main-deck-motion.cjs')(frame,true));
      assert.deepEqual(errors,[]);console.log('Guest views passed:',mobile?'mobile':'full');
    }finally{await context.close();}
    if(process.env.YACHT_CHECK!=='full'&&process.env.YACHT_SKIP_RECOVERY!=='1')await require('./yacht-guest-access-loading.cjs')(browser,base);
  }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
