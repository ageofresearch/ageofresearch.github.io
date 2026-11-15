const assert=require('node:assert/strict');

module.exports=async function loadingAndHandoff(browser,base) {
  const context=await browser.newContext({viewport:{width:360,height:540},hasTouch:true});
  try {
    const page=await context.newPage(),errors=[];
    page.on('pageerror',error=>errors.push(error.message));
    await page.route('**/main-saloon.bin?*',route=>route.fulfill({status:503,body:'Unavailable'}));
    await page.goto(base+'mobile.html?world=rocha',{waitUntil:'domcontentloaded'});
    await page.locator('#yacht').contentFrame().locator('#app').waitFor({timeout:90000});
    const frame=page.frames().find(f=>f.url().includes('play.html'));
    await frame.waitForFunction(()=>window.__app?.entranceYacht?.saloonLoadState==='error',null,{timeout:180000});
    assert.equal(await frame.evaluate(()=>window.__app.yachtWalk.nav.floorSafe(9.2,0)),false);
    assert.ok(await frame.evaluate(()=>window.__app.entranceYacht.stats.triangles<=25000));
    assert.ok(await frame.evaluate(()=>{
      const w=window.__app.yachtWalk;
      w.enterRoom('MD_R01');return w.nav.floorSafe(...w.nav.position);
    }));
    await page.unroute('**/main-saloon.bin?*');
    await frame.locator('.luz-saloon-load button').click();
    await frame.waitForFunction(()=>window.__app.entranceYacht.saloonLoadState==='ready',null,{timeout:90000});
    assert.equal(await frame.evaluate(()=>window.__app.yachtWalk.nav.floorSafe(9.2,0)),true);
    await frame.evaluate(()=>{
      const w=window.__app.yachtWalk;
      w.enterRoom('MD_R02');w.nav.move(.8,.1);w.applyPosition();
    });
    const position=await frame.evaluate(()=>window.__app.yachtWalk.nav.position);
    await frame.locator('[data-explore]').click();
    await frame.getByRole('button',{name:'Explorar el yate completo'}).click();
    await frame.waitForFunction(()=>window.__app.gangwayOnly===false,null,{timeout:120000});
    assert.deepEqual(await frame.evaluate(()=>window.__app.yachtWalk.nav.position),position);
    assert.deepEqual(await frame.evaluate(()=>({deck:window.__app.yachtWalk.nav.deck,height:window.__app.yachtWalk.nav.elevation})),{deck:'MD',height:3.95});
    assert.equal(await frame.locator('.luz-saloon-load').count(),0);
    assert.equal(await frame.locator('.luz-yacht-controls').count(),1);
    assert.deepEqual(errors,[]);
    console.log('Saloon failure, retry and full-yacht handoff passed');
  }finally{await context.close();}
};
