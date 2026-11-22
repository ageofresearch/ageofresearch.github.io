const assert=require('node:assert/strict');
const {writeFileSync}=require('node:fs');
const {PNG}=require('pngjs');

module.exports=async function saloonViews(frame,out,readFrame,mobile) {
  const saved=await frame.evaluate(()=>{
    const w=window.__app.yachtWalk;
    return {position:w.nav.position.slice(),deck:w.nav.deck,yaw:w.yaw,pitch:w.pitch};
  });
  for(const {name,position,target} of [
    {name:'entry',position:[9.2,0],target:[12.3,0,4.7]},
    {name:'sofas',position:[10,1.95],target:[12.3,0,4.6]},
    {name:'forward',position:[14.4,0],target:[16,0,4.6]},
    {name:'return',position:[10,0],target:[6.5,0,4.7]},
  ]) {
    await frame.evaluate(({position,target,mobile})=>{
      const app=window.__app,w=app.yachtWalk,b=w.model.group.userData.yacht;
      w.nav.enterRoom('MD_R02');
      if(mobile&&!w.nav.floorSafe(...position))throw Error('Unsafe saloon inspection pose');
      w.nav.position=position;w.nav.elevation=3.95;w.cameraElevation=3.95;w.applyPosition();
      const look=app.camera.position.clone().set(target[1]*b.sy,target[2]-b.seaReference,target[0]*b.sx-b.length/2);
      w.model.group.localToWorld(look).sub(app.camera.position).normalize();
      w.yaw=Math.atan2(-look.x,-look.z);w.pitch=Math.asin(look.y);
    },{position,target,mobile});
    const result=await readFrame(),png=new PNG({width:result.width,height:result.height});
    png.data=Buffer.from(result.pixels,'base64');
    writeFileSync(out+`/saloon-${mobile?'mobile':'full'}-${name}.png`,PNG.sync.write(png));
    if(mobile) {
      assert.equal(result.indexedDraws,2);assert.deepEqual(result.passLabels,['Gangway to screen']);
      assert.ok(result.indexedTriangles<=25000,JSON.stringify(result.indexedTriangles));
      const stats=await frame.evaluate(()=>window.__app.entranceYacht.stats);
      assert.equal(result.indexedTriangles,stats.triangles);
      const profiles=await frame.evaluate(()=>Object.keys((__app.entranceYacht.guestAccess||__app.entranceYacht.bow).profiles).length);
      // Preserve the existing 9 MiB / five-profile allowance for each
      // prepared profile is installed. This measures resident geometry.
      assert.ok(stats.residentGeometryBytes<profiles*(9/5)*1024*1024);
    }
  }
  if(mobile) {
    async function approach(from) {
      return frame.evaluate(from=>{
        const app=window.__app,w=app.yachtWalk,nav=w.nav;
        nav.enterRoom('MD_R02');nav.position=[from,.1];nav.elevation=3.95;
        w.cameraElevation=3.95;w.yaw=.17;w.pitch=-.05;w.applyPosition();
        const target=8.85,direction=Math.sign(target-from),profiles=new Set();
        while(Math.abs(target-nav.position[0])>1e-6) {
          const previous=nav.position[0];
          nav.move(direction*Math.min(.025,Math.abs(target-previous)),0);
          if(Math.abs(nav.position[0]-previous)<1e-6)throw Error('Saloon approach is blocked');
          w.applyPosition();app.frame(0);profiles.add(app.gangwayRenderer.activeProfile);
        }
        nav.position=[target,.1];w.applyPosition();
        return [...profiles];
      },from);
    }
    assert.deepEqual(await approach(7.9),['main']);
    const fromTerrace=await readFrame();
    assert.deepEqual(await approach(10),['main']);
    const fromSaloon=await readFrame();
    assert.equal(fromTerrace.pixels,fromSaloon.pixels,'The doorway must look identical after walking from either side');
  }
  await frame.evaluate(saved=>{
    const w=window.__app.yachtWalk;
    w.nav.enterRoom('boarding');w.nav.position=saved.position;w.nav.deck=saved.deck;
    w.nav.elevation=w.nav.floorHeight(...saved.position);w.cameraElevation=w.nav.elevation;
    w.yaw=saved.yaw;w.pitch=saved.pitch;w.applyPosition();
  },saved);
};
