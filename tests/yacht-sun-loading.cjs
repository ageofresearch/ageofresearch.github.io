const assert=require('node:assert/strict');
module.exports=async function sunLoading(browser,base) {
  const context=await browser.newContext({viewport:{width:360,height:540},hasTouch:true});
  try {
    const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
    await page.route('**/sun-deck.bin?*',r=>r.fulfill({status:503,body:'Unavailable'}));
    await page.goto(base+'mobile.html',{waitUntil:'domcontentloaded'});
    await page.locator('#yacht').contentFrame().locator('#app').waitFor({timeout:90000});
    let frame=page.frames().find(f=>f.url().includes('play.html'));
    await frame.waitForFunction(()=>window.__mapsPublicStatus?.status==='ready'&&__app.entranceYacht.sunLoadState==='error',null,{timeout:180000});
    const before=await frame.evaluate(()=>{const a=__app;return {routes:a.yachtWalk.nav.routes.map(r=>r.id),triangles:a.entranceYacht.stats.triangles,profile:a.gangwayRenderer.activeProfile};});
    assert.deepEqual(before.routes,['starboard-swim','aft']);assert.ok(await frame.locator('[data-deck="SD"]').isHidden());
    await page.unroute('**/sun-deck.bin?*');
    // Fail after uploading, while executing candidate buffers. Prior buffers
    // must survive, and retry preparation must never overlap active walking.
    await frame.evaluate(()=>{
      const r=__app.gangwayRenderer,original=r.prepareProfiles;
      r.prepareProfiles=async function(){r.prepareProfiles=original;await original.call(r);await new Promise((resolve,reject)=>{window.failSunPreparation=()=>reject(Error('Injected sun warm-up failure'));});};
    });
    await frame.locator('.luz-sun-load button').click();
    await frame.waitForFunction(()=>typeof window.failSunPreparation==='function',null,{timeout:90000});
    assert.deepEqual(await frame.evaluate(()=>({running:__app.engine._running,loader:!document.getElementById('loader').hidden,routes:__app.yachtWalk.nav.routes.length})),{running:false,loader:true,routes:2});
    await frame.evaluate(()=>window.failSunPreparation());
    await frame.waitForFunction(()=>__app.entranceYacht.sunLoadState==='error'&&__app.engine._running,null,{timeout:90000});
    assert.deepEqual(await frame.evaluate(()=>{const a=__app;return {routes:a.yachtWalk.nav.routes.map(r=>r.id),triangles:a.entranceYacht.stats.triangles,profile:a.gangwayRenderer.activeProfile};}),before);
    await frame.locator('.luz-sun-load button').click();
    await frame.waitForFunction(()=>__app.entranceYacht.sunLoadState==='ready'&&__app.engine._running,null,{timeout:90000});
    assert.equal(await frame.evaluate(()=>__app.yachtWalk.nav.routes.length),5);
    await frame.evaluate(()=>__app.yachtWalk.enterRoom('SD_R01'));
    await page.locator('#pilot summary').click();await page.waitForFunction(()=>document.querySelector('#cross').disabled);
    assert.equal(await page.locator('#cross').isEnabled(),false);
    await frame.evaluate(()=>__app.loadFullYacht());
    assert.deepEqual(await frame.evaluate(()=>{const n=__app.yachtWalk.nav;return {deck:n.deck,position:n.position,elevation:n.elevation};}),{deck:'SD',position:[14.6,-.3],elevation:8.2});
    assert.equal(await frame.locator('.luz-sun-load').count(),0);
    await page.reload({waitUntil:'domcontentloaded'});await page.locator('#yacht').contentFrame().locator('#app').waitFor({timeout:90000});
    frame=page.frames().find(f=>f.url().includes('play.html'));
    await frame.waitForFunction(()=>window.__mapsPublicStatus?.status==='ready'&&__app.entranceYacht.sunLoadState==='ready',null,{timeout:180000});
    const state=await frame.evaluate(()=>{const w=__app.yachtWalk,f=w.model.sun.flight,s=f.surfaces[7],ps=s.polygons.flat();
      w.nav.deck='UD';w.nav.position=[0,1].map(k=>(Math.min(...ps.map(p=>p[k]))+Math.max(...ps.map(p=>p[k])))/2);
      w.nav.elevation=s.height;w.nav.stair={route:f.route,surfaceIndex:s.index,d:1.8};w.applyPosition();return {position:w.nav.position,elevation:s.height};});
    await frame.evaluate(()=>__app.loadFullYacht());
    assert.deepEqual(await frame.evaluate(()=>{const n=__app.yachtWalk.nav;return {position:n.position,elevation:n.elevation,stair:n.stair?.route.id,index:n.stair?.surfaceIndex};}),{...state,stair:'sun',index:7});
    assert.deepEqual(errors,[]);console.log('Sun network failure, GPU preparation rollback, retry and SD/stair handoffs passed');
  }finally{await context.close();}
};
