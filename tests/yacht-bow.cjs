const assert=require('node:assert/strict');
const {writeFileSync}=require('node:fs');const {PNG}=require('pngjs');
module.exports=async function bowViews(frame,out,readFrame,mobile){
 const saved=await frame.evaluate(()=>{const w=__app.yachtWalk;return {position:w.nav.position.slice(),deck:w.nav.deck,yaw:w.yaw,pitch:w.pitch};});
 for(const {name,position,target}of [
  {name:'entry',position:[11,-2.5],target:[14,-3,6.6]},
  {name:'passage',position:[16,-3.2],target:[20,-2.8,6.7]},
  {name:'bridge-side',position:[22.5,-2.7],target:[26.8,-1,6.6]},
  {name:'sofas',position:[26.8,0],target:[25.1,0,6.5]},
  {name:'sunpad-starboard',position:[28.7,-1.95],target:[27.7,0,6.5]},
  {name:'sunpad-port',position:[28.7,1.95],target:[27.7,0,6.5]},
  {name:'return',position:[26.8,-2.3],target:[20.5,-2.7,6.6]},
 ]){
  await frame.evaluate(({position,target})=>{const app=__app,w=app.yachtWalk,b=w.model.group.userData.yacht;w.enterRoom('UD_R04');if(!w.nav.floorSafe(...position,'UD'))throw Error('Unsafe bow pose '+position);w.nav.position=position;w.nav.elevation=6;w.cameraElevation=6;w.applyPosition();const d=app.camera.position.clone().set(target[1]*b.sy,target[2]-b.seaReference,target[0]*b.sx-b.length/2);w.model.group.localToWorld(d).sub(app.camera.position).normalize();w.yaw=Math.atan2(-d.x,-d.z);w.pitch=Math.asin(d.y);},{position,target});
  const shot=await readFrame(),png=new PNG({width:shot.width,height:shot.height});png.data=Buffer.from(shot.pixels,'base64');writeFileSync(out+`/bow-${mobile?'mobile':'full'}-${name}.png`,PNG.sync.write(png));
  if(mobile){assert.equal(shot.indexedDraws,2);assert.deepEqual(shot.passLabels,['Gangway to screen']);assert.ok(shot.indexedTriangles<=25000);assert.equal(await frame.evaluate(()=>__app.gangwayRenderer.activeProfile),position[0]>13.8?'bow':'upper');assert.equal(await frame.locator('.luz-upper-interior-limit').isVisible(),false);}
 }
 if(mobile){
  const boundaries=await frame.evaluate(()=>{const n=__app.yachtWalk.nav;n.deck='UD';n.position=[29.1,-1.95];for(let i=0;i<100;i++)n.move(.02,0);return {x:n.position[0],safe:n.floorSafe(n.position[0]+.02,n.position[1],'UD'),room:n.location().displayName};});
  assert.ok(boundaries.x<=29.26&&boundaries.x>29.2&&!boundaries.safe);assert.equal(boundaries.room,'Estar de proa');
 }
 await frame.evaluate(saved=>{const w=__app.yachtWalk;w.enterRoom('boarding');w.nav.position=saved.position;w.nav.deck=saved.deck;w.nav.elevation=w.nav.floorHeight(...saved.position);w.cameraElevation=w.nav.elevation;w.yaw=saved.yaw;w.pitch=saved.pitch;w.applyPosition();},saved);
};
