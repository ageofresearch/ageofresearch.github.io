const assert=require('node:assert/strict');
module.exports=async function guestLoading(browser,base) {
  const context=await browser.newContext({viewport:{width:360,height:540},hasTouch:true});
  try {
    await context.addInitScript(()=>{
      window.__guestLive={buffers:new Set(),textures:new Set()};
      for(const [method,kind,Type]of [['createBuffer','buffers',GPUBuffer],['createTexture','textures',GPUTexture]]) {
        const create=GPUDevice.prototype[method],destroy=Type.prototype.destroy;
        GPUDevice.prototype[method]=function(...args){const resource=create.apply(this,args);__guestLive[kind].add(resource);return resource;};
        Type.prototype.destroy=function(...args){__guestLive[kind].delete(this);return destroy.apply(this,args);};
      }
    });
    const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
    await page.route('**/guest-access.bin?*',r=>r.fulfill({status:503,body:'Unavailable'}));
    await page.goto(base+'mobile.html',{waitUntil:'domcontentloaded'});
    await page.locator('#yacht').contentFrame().locator('#app').waitFor({timeout:90000});
    let frame=page.frames().find(f=>f.url().includes('play.html'));
    const failed=()=>frame.waitForFunction(()=>window.__mapsPublicStatus?.status==='ready'&&__app.entranceYacht.guestAccessLoadState==='error'&&__app.engine._running,null,{timeout:180000});
    const snapshot=()=>frame.evaluate(()=>{const a=__app,w=a.yachtWalk;return {rooms:w.model.asset.data.rooms.map(r=>r.id),routes:w.nav.routes.map(r=>r.id),stats:{...w.model.stats},profile:a.gangwayRenderer.activeProfile,safe:w.nav.floorSafe(16.8,-.1,'LD'),deckHidden:w.controls.root.querySelector('[data-deck="LD"]')?.hidden??true,live:{buffers:__guestLive.buffers.size,textures:__guestLive.textures.size}};});
    await failed();const before=await snapshot();assert.equal(before.safe,false);assert.equal(before.deckHidden,true);assert.ok(before.rooms.includes('MD_R07'));assert.ok(!before.rooms.includes('LD_R11'));
    await page.unroute('**/guest-access.bin?*');
    await page.route('**/guest-access.bin?*',r=>r.fulfill({status:200,body:Buffer.alloc(12),contentType:'application/octet-stream'}));
    await frame.locator('.luz-guest-access-load button').click();await failed();assert.deepEqual(await snapshot(),before);
    await page.unroute('**/guest-access.bin?*');
    await page.route('**/guest-access.json?*',async r=>{const response=await r.fetch(),body=await response.json();body.flight.obstacles.pop();await r.fulfill({response,json:body});});
    await frame.locator('.luz-guest-access-load button').click();await failed();assert.deepEqual(await snapshot(),before);
    await page.unroute('**/guest-access.json?*');
    await frame.evaluate(()=>{const r=__app.gangwayRenderer,original=r.prepareProfiles;
      r.prepareProfiles=async function(){r.prepareProfiles=original;await original.call(r);await new Promise((_,reject)=>{window.failGuestPreparation=()=>reject(Error('Injected guest GPU failure'));});};
    });
    await frame.locator('.luz-guest-access-load button').click();
    await frame.waitForFunction(()=>typeof window.failGuestPreparation==='function',null,{timeout:90000});
    assert.deepEqual(await frame.evaluate(()=>({running:__app.engine._running,loader:!document.getElementById('loader').hidden,guest:!!__app.entranceYacht.guestAccess})),{running:false,loader:true,guest:false});
    await frame.evaluate(()=>window.failGuestPreparation());await failed();assert.deepEqual(await snapshot(),before);
    await frame.locator('.luz-guest-access-load button').click();
    await frame.waitForFunction(()=>__app.entranceYacht.guestAccessLoadState==='ready'&&__app.engine._running,null,{timeout:90000});
    const prepared=await snapshot();assert.equal(prepared.rooms.filter(r=>r==='LD_R11').length,1);assert.equal(prepared.routes.filter(r=>r==='guest').length,1);assert.equal(prepared.safe,true);assert.equal(prepared.deckHidden,false);
    await frame.evaluate(()=>__app.entranceYacht.loadGuestAccess());assert.deepEqual(await snapshot(),prepared);
    await frame.evaluate(()=>__app.yachtWalk.controls.openMenu());
    await frame.locator('[data-deck="LD"]').click();await frame.locator('[data-room="LD_R11"]').click();
    assert.deepEqual(await frame.evaluate(()=>({deck:__app.yachtWalk.nav.deck,position:__app.yachtWalk.nav.position})),{deck:'LD',position:[16.8,-.1]});
    await frame.evaluate(()=>{const w=__app.yachtWalk;w.yaw=.8;w.pitch=-.15;w.applyPosition();});
    await frame.evaluate(()=>__app.loadFullYacht());
    assert.deepEqual(await frame.evaluate(()=>{const w=__app.yachtWalk,n=w.nav;return {deck:n.deck,position:n.position,elevation:n.elevation,safe:n.floorSafe(...n.position),yaw:w.yaw,pitch:w.pitch};}),{deck:'LD',position:[16.8,-.1],elevation:1.55,safe:true,yaw:.8,pitch:-.15});
    assert.equal(await frame.locator('.luz-guest-access-load').count(),0);
    await page.reload({waitUntil:'domcontentloaded'});await page.locator('#yacht').contentFrame().locator('#app').waitFor({timeout:90000});
    frame=page.frames().find(f=>f.url().includes('play.html'));
    await frame.waitForFunction(()=>window.__mapsPublicStatus?.status==='ready'&&__app.entranceYacht.guestAccessLoadState==='ready',null,{timeout:180000});
    const state=await frame.evaluate(()=>{const w=__app.yachtWalk,f=w.model.guestAccess.flight,s=f.surfaces[10],ps=s.polygons.flat();
      w.nav.deck='LD';w.nav.position=[0,1].map(k=>(Math.min(...ps.map(p=>p[k]))+Math.max(...ps.map(p=>p[k])))/2);
      w.nav.elevation=s.height;w.nav.stair={route:f.route,surfaceIndex:10,d:0};w.yaw=1.2;w.pitch=-.15;w.applyPosition();
      return {position:w.nav.position,elevation:s.height,yaw:w.yaw,pitch:w.pitch};});
    await frame.evaluate(()=>__app.loadFullYacht());
    assert.deepEqual(await frame.evaluate(()=>{const w=__app.yachtWalk,n=w.nav;return {position:n.position,elevation:n.elevation,stair:n.stair?.route.id,index:n.stair?.surfaceIndex,yaw:w.yaw,pitch:w.pitch};}),{...state,stair:'guest',index:10});
    assert.deepEqual(errors,[]);console.log('Guest network/data failures, GPU cleanup, paused retry and lower-deck/stair handoffs passed');
  }finally{await context.close();}
};
