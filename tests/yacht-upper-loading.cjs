const assert=require('node:assert/strict');
module.exports=async function upperLoading(browser,base) {
  const context=await browser.newContext({viewport:{width:360,height:540},hasTouch:true});
  try {
    const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
    await page.route('**/upper-terrace.bin?*',route=>route.fulfill({status:503,body:'Unavailable'}));
    await page.goto(base+'mobile.html?world=rocha',{waitUntil:'domcontentloaded'});
    await page.locator('#yacht').contentFrame().locator('#app').waitFor({timeout:90000});
    const frame=page.frames().find(f=>f.url().includes('play.html'));
    await frame.waitForFunction(()=>window.__app?.entranceYacht?.upperLoadState==='error',null,{timeout:180000});
    assert.deepEqual(await frame.evaluate(()=>{
      const a=window.__app,n=a.yachtWalk.nav;return {saloon:n.floorSafe(9.2,0,'MD'),upper:n.floorSafe(8.35,2.21,'UD'),flights:n.routes.map(r=>r.id),profile:a.gangwayRenderer.activeProfile};
    }),{saloon:true,upper:false,flights:['starboard-swim'],profile:'exterior'});
    assert.ok(await frame.locator('[data-deck="UD"]').isHidden());
    // GPU allocation failure also retains the prior ready scene and navigation.
    await page.unroute('**/upper-terrace.bin?*');
    await frame.evaluate(()=>{const r=window.__app.gangwayRenderer,original=r.installProfiles;r.installProfiles=async()=>{r.installProfiles=original;throw Error('Injected GPU allocation failure');};});
    await frame.locator('.luz-upper-load button').click();
    await frame.waitForFunction(()=>window.__app.entranceYacht.upperLoadState==='error',null,{timeout:90000});
    assert.equal(await frame.evaluate(()=>window.__app.yachtWalk.nav.routes.length),1);
    await frame.locator('.luz-upper-load button').click();
    await frame.waitForFunction(()=>window.__app.entranceYacht.upperLoadState==='ready',null,{timeout:90000});
    assert.equal(await frame.evaluate(()=>window.__app.yachtWalk.nav.routes.length),2);
    await frame.evaluate(()=>{const w=window.__app.yachtWalk;w.enterRoom('UD_R01');});
    await page.locator('#pilot summary').click();
    await page.waitForFunction(()=>document.querySelector('#cross').disabled);
    assert.equal(await page.locator('#cross').isEnabled(),false);
    await frame.evaluate(()=>window.__app.loadFullYacht());
    assert.deepEqual(await frame.evaluate(()=>{const n=window.__app.yachtWalk.nav;return {deck:n.deck,position:n.position,elevation:n.elevation};}),{deck:'UD',position:[8.35,2.21],elevation:6});
    assert.equal(await frame.locator('.luz-upper-load').count(),0);
    // Reload to exercise the actual full-yacht switch while halfway upstairs.
    await page.reload({waitUntil:'domcontentloaded'});
    await page.locator('#yacht').contentFrame().locator('#app').waitFor({timeout:90000});
    const next=page.frames().find(f=>f.url().includes('play.html'));
    await next.waitForFunction(()=>window.__app?.entranceYacht?.upperLoadState==='ready',null,{timeout:90000});
    const state=await next.evaluate(()=>{
      const w=window.__app.yachtWalk,f=w.model.upper.flight,s=f.surfaces[6],pts=s.polygons.flat();
      w.nav.deck='MD';w.nav.position=[0,1].map(k=>(Math.min(...pts.map(p=>p[k]))+Math.max(...pts.map(p=>p[k])))/2);
      w.nav.elevation=s.height;w.nav.stair={route:f.route,surfaceIndex:s.index,d:1.2};w.applyPosition();return {position:w.nav.position,elevation:s.height};
    });
    await next.evaluate(()=>window.__app.loadFullYacht());
    assert.deepEqual(await next.evaluate(()=>{const n=window.__app.yachtWalk.nav;return {position:n.position,elevation:n.elevation,stair:n.stair?.route.id,index:n.stair?.surfaceIndex};}),{...state,stair:'aft',index:6});
    assert.deepEqual(errors,[]);console.log('Upper failure, GPU rollback, retry, UD and stair handoff passed');
  }finally{await context.close();}
};
