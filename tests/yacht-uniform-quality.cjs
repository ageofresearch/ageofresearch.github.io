const assert=require('node:assert/strict');
const {writeFileSync,mkdirSync}=require('node:fs');
const {PNG}=require('pngjs');
const {chromium}=require('playwright-core');
const frameReader=require('./yacht-frame-reader.cjs');
async function verifyUniform(browser,base,out) {
 const context=await browser.newContext({viewport:{width:360,height:540},hasTouch:true});mkdirSync(out,{recursive:true});
 let release;
 try {
  await context.addInitScript(()=>{window.__uniformLive={buffers:new Set(),textures:new Set()};
   for(const [method,kind,Type]of [['createBuffer','buffers',GPUBuffer],['createTexture','textures',GPUTexture]]){
    const create=GPUDevice.prototype[method],destroy=Type.prototype.destroy;
    GPUDevice.prototype[method]=function(...args){const resource=create.apply(this,args);__uniformLive[kind].add(resource);return resource;};
    Type.prototype.destroy=function(...args){__uniformLive[kind].delete(this);return destroy.apply(this,args);};
   }
  });
  const held=new Promise(r=>release=r),page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.route('**/uniform-quality.bin?*',async r=>{await held;await r.fulfill({status:503,body:'Unavailable'});});
  await page.goto(base+'mobile.html?quality=uniform',{waitUntil:'domcontentloaded'});await page.locator('#yacht').contentFrame().locator('#app').waitFor({timeout:90000});
  const frame=page.frames().find(f=>f.url().includes('play.html'));
  await frame.waitForFunction(()=>window.__app?.entranceYacht.uniformLoadState==='loading',null,{timeout:180000});
  assert.deepEqual(await frame.evaluate(()=>({status:__mapsPublicStatus.status,running:__app.engine._running===true,guest:__app.entranceYacht.guestAccessLoadState})),{status:'starting',running:false,guest:'ready'});
  release();
  const failed=()=>frame.waitForFunction(()=>window.__mapsPublicStatus?.status==='ready'&&__app.entranceYacht.uniformLoadState==='error'&&__app.engine._running,null,{timeout:180000});
  const snapshot=()=>frame.evaluate(()=>{const a=__app,w=a.yachtWalk;return {rooms:w.model.asset.data.rooms.map(r=>r.id),routes:w.nav.routes.map(r=>r.id),position:w.nav.position.slice(),yaw:w.yaw,pitch:w.pitch,
   camera:a.camera.position.toArray(),rotation:a.camera.quaternion.toArray(),stats:{...w.model.stats},profile:a.gangwayRenderer.activeProfile,live:{buffers:__uniformLive.buffers.size,textures:__uniformLive.textures.size}};});
  await failed();const before=await snapshot();assert.ok(before.rooms.includes('LD_R11'));assert.equal(before.routes.length,5);
  await page.unroute('**/uniform-quality.bin?*');
  await page.route('**/uniform-quality.bin?*',r=>r.fulfill({status:200,body:Buffer.alloc(12)}));
  await frame.locator('.luz-uniform-load button').click();await failed();assert.deepEqual(await snapshot(),before);
  await page.unroute('**/uniform-quality.bin?*');
  await page.route('**/uniform-quality.json?*',async r=>{const response=await r.fetch(),body=await response.json();body.guestSHA256='stale';await r.fulfill({response,json:body});});
  await frame.locator('.luz-uniform-load button').click();await failed();assert.deepEqual(await snapshot(),before);
  await page.unroute('**/uniform-quality.json?*');
  await frame.evaluate(()=>{const r=__app.gangwayRenderer,original=r.prepareProfiles;r.prepareProfiles=async function(...args){r.prepareProfiles=original;await original.apply(r,args);await new Promise((_,reject)=>{window.failUniformGPU=()=>reject(Error('Injected uniform GPU failure'));});};});
  await frame.locator('.luz-uniform-load button').click();await frame.waitForFunction(()=>typeof failUniformGPU==='function',null,{timeout:90000});
  assert.equal(await frame.evaluate(()=>__app.engine._running),false);
  await frame.evaluate(()=>failUniformGPU());await failed();assert.deepEqual(await snapshot(),before);
  await frame.locator('.luz-uniform-load button').click();await frame.waitForFunction(()=>__app.entranceYacht.uniformLoadState==='ready'&&__app.engine._running,null,{timeout:90000});
  const after=await snapshot();assert.equal(after.profile,'uniform');assert.equal(after.stats.triangles,38055);assert.equal(after.stats.residentGeometryBytes,2640036);
  for(const k of ['rooms','routes','position','yaw','pitch','camera','rotation'])assert.deepEqual(after[k],before[k],k);
  assert.equal(after.live.buffers,before.live.buffers-50);assert.equal(after.live.textures,before.live.textures);
  await frame.evaluate(()=>__app.entranceYacht.loadUniformQuality());assert.deepEqual(await snapshot(),after);
  const read=frameReader(frame);
  async function pose(room,position,target){await frame.evaluate(({room,position,target})=>{const a=__app,w=a.yachtWalk,n=w.nav,b=w.model.group.userData.yacht;
   w.enterRoom(room);n.position=position;n.stair=null;n.elevation=n.floorHeight(...position);w.cameraElevation=n.elevation;w.applyPosition();
   const [x,y,z]=target,d=w.model.group.localToWorld(a.camera.position.clone().set(y*b.sy,z-b.seaReference,x*b.sx-b.length/2)).sub(a.camera.position).normalize();w.yaw=Math.atan2(-d.x,-d.z);w.pitch=Math.asin(d.y);
  },{room,position,target});}
  const shots=[];
  for(const [name,room,position,target]of [
   ['entry','MD_R02',[8.7,.1],[12.3,0,4.7]],['saloon','MD_R02',[10,1.95],[12.3,0,4.6]],['return','MD_R02',[10,0],[6.5,0,4.7]],
   ['upper','UD_R02',[17.4,0],[10,0,6.1]],['bridge','UD_R03',[20.5,0],[23,0,7]],['sun','SD_R01',[14.6,-.3],[17,0,9]],
   ['bow','UD_R04',[26.8,0],[19,0,7]],['guest','LD_R11',[16.8,-.1],[13.5,-.1,2.6]],
  ]){
   await pose(room,position,target);const shot=await read();assert.equal(shot.indexedDraws,2);assert.deepEqual(shot.passLabels,['Gangway to screen']);assert.equal(shot.indexedTriangles,38055);
   const png=new PNG({width:shot.width,height:shot.height});png.data=Buffer.from(shot.pixels,'base64');writeFileSync(out+'/uniform-'+name+'.png',PNG.sync.write(png));shots.push({name,triangles:shot.indexedTriangles});
  }
  // The hysteresis band used to render differently depending on arrival.
  await pose('MD_R01',[7.9,.1],[12.3,0,4.7]);await read();await pose('MD_R02',[8.7,.1],[12.3,0,4.7]);const fromAft=await read();
  await pose('MD_R02',[9.3,.1],[12.3,0,4.7]);await read();await pose('MD_R02',[8.7,.1],[12.3,0,4.7]);const fromForward=await read();
  assert.equal(fromAft.pixels,fromForward.pixels,'The same pose must not change with the previous room');
  await pose('LD_R11',[16.8,-.1],[13.5,-.1,2.6]);
  await frame.evaluate(()=>__app.loadFullYacht());assert.equal(await frame.locator('.luz-uniform-load').count(),0);
  assert.deepEqual(await frame.evaluate(()=>({deck:__app.yachtWalk.nav.deck,position:__app.yachtWalk.nav.position})),{deck:'LD',position:[16.8,-.1]});
  assert.deepEqual(errors,[]);writeFileSync(out+'/uniform-verification.json',JSON.stringify({before,after,shots,historyIndependent:true},null,2));
  console.log('Uniform recovery, resource cleanup, camera restoration, two draws, history independence and full handoff passed');
 }finally{release?.();await context.close();}
}
module.exports=verifyUniform;
if(require.main===module)(async()=>{const browser=await chromium.launch({...(process.env.CHROME_PATH?{executablePath:process.env.CHROME_PATH}:{channel:'chrome'}),headless:true,args:['--enable-unsafe-webgpu','--enable-unsafe-swiftshader','--use-angle=swiftshader','--enable-features=Vulkan','--use-vulkan=swiftshader','--disable-vulkan-surface']});try{await verifyUniform(browser,process.env.YACHT_BASE||'http://127.0.0.1:8764/tidewater-rocha/',process.env.YACHT_OUTPUT||'/tmp/yacht-uniform-views');}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1});
