const assert=require('node:assert/strict');
module.exports=async function bridgeLoading(browser,base){
  const context=await browser.newContext({viewport:{width:360,height:540},hasTouch:true});
  try{
    const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
    await page.route('**/bridge-helm.bin?*',r=>r.fulfill({status:503,body:'Unavailable'}));
    await page.goto(base+'mobile.html',{waitUntil:'domcontentloaded'});
    await page.locator('#yacht').contentFrame().locator('#app').waitFor({timeout:90000});
    const frame=page.frames().find(f=>f.url().includes('play.html'));
    const failed=()=>frame.waitForFunction(()=>window.__mapsPublicStatus?.status==='ready'&&__app.entranceYacht.bridgeLoadState==='error',null,{timeout:180000});
    await failed();
    const snapshot=()=>frame.evaluate(()=>{const a=__app,w=a.yachtWalk;return {rooms:w.model.asset.data.rooms.map(r=>r.id),routes:w.nav.routes.map(r=>r.id),stats:{...w.model.stats},profile:a.gangwayRenderer.activeProfile,safe:w.nav.floorSafe(20.5,0,'UD')};});
    const before=await snapshot();assert.equal(before.safe,false);assert.ok(before.rooms.includes('UD_R02'));assert.ok(!before.rooms.includes('UD_R03'));
    await page.unroute('**/bridge-helm.bin?*');
    await page.route('**/bridge-helm.bin?*',r=>r.fulfill({status:200,body:Buffer.alloc(12),contentType:'application/octet-stream'}));
    await frame.locator('.luz-bridge-helm-load button').click();await failed();assert.deepEqual(await snapshot(),before);
    await page.unroute('**/bridge-helm.bin?*');
    await frame.evaluate(()=>{const r=__app.gangwayRenderer,original=r.prepareProfiles;
      r.prepareProfiles=async function(){r.prepareProfiles=original;await original.call(r);await new Promise((_,reject)=>{window.failInteriorPreparation=()=>reject(Error('Injected interior GPU failure'));});};
    });
    await frame.locator('.luz-bridge-helm-load button').click();
    await frame.waitForFunction(()=>typeof window.failInteriorPreparation==='function',null,{timeout:90000});
    assert.deepEqual(await frame.evaluate(()=>({running:__app.engine._running,loader:!document.getElementById('loader').hidden,bridge:!!__app.entranceYacht.bridge})),{running:false,loader:true,bridge:false});
    await frame.evaluate(()=>window.failInteriorPreparation());await failed();
    await frame.waitForFunction(()=>__app.engine._running);assert.deepEqual(await snapshot(),before);
    await frame.locator('.luz-bridge-helm-load button').click();
    await frame.waitForFunction(()=>__app.entranceYacht.bridgeLoadState==='ready'&&__app.engine._running,null,{timeout:90000});
    assert.equal((await snapshot()).rooms.filter(r=>r==='UD_R03').length,1);
    await frame.evaluate(()=>{const w=__app.yachtWalk;w.enterRoom('UD_R03');w.nav.position=[20.5,0];w.applyPosition();});
    await page.locator('#pilot summary').click();await page.waitForFunction(()=>document.querySelector('#cross').disabled);
    assert.equal(await page.locator('#cross').isEnabled(),false);
    await frame.evaluate(()=>__app.loadFullYacht());
    assert.deepEqual(await frame.evaluate(()=>{const n=__app.yachtWalk.nav;return {deck:n.deck,position:n.position,elevation:n.elevation,safe:n.floorSafe(...n.position)};}),{deck:'UD',position:[20.5,0],elevation:6,safe:true});
    assert.equal(await frame.locator('.luz-bridge-helm-load').count(),0);assert.equal(await frame.locator('.luz-bridge-helm-limit').count(),0);
    assert.deepEqual(errors,[]);console.log('Bridge network/corruption, GPU rollback, paused retry and full-yacht handoff passed');
  }finally{await context.close();}
};
