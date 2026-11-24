const assert=require('node:assert/strict');
const {writeFileSync}=require('node:fs');const {PNG}=require('pngjs');
module.exports=async function bridgeViews(frame,out,readFrame,mobile){
 const saved=await frame.evaluate(()=>{const w=__app.yachtWalk;return {position:w.nav.position.slice(),deck:w.nav.deck,yaw:w.yaw,pitch:w.pitch};});
 for(const {name,position,target}of [
  {name:'passage',position:[18.3,1.7],target:[20.5,1.2,6.8]},
  {name:'helm',position:[20.5,0],target:[22.4,0,6.95]},
  {name:'screens',position:[21.35,-.74],target:[22.3,0,7.05]},
  {name:'bow',position:[21.35,.7],target:[29,0,6.5]},
  {name:'stairs',position:[20.4,-.7],target:[19.16,-.2,5.5]},
  {name:'return',position:[20.5,1.7],target:[17.2,1.7,6.7]},
 ]){
  await frame.evaluate(({position,target})=>{const app=__app,w=app.yachtWalk,b=w.model.group.userData.yacht;w.enterRoom('UD_R03');if(!w.nav.floorSafe(...position,'UD'))throw Error('Unsafe bridge pose '+position);w.nav.position=position;w.nav.elevation=6;w.cameraElevation=6;w.applyPosition();const d=app.camera.position.clone().set(target[1]*b.sy,target[2]-b.seaReference,target[0]*b.sx-b.length/2);w.model.group.localToWorld(d).sub(app.camera.position).normalize();w.yaw=Math.atan2(-d.x,-d.z);w.pitch=Math.asin(d.y);},{position,target});
  const shot=await readFrame(),png=new PNG({width:shot.width,height:shot.height});png.data=Buffer.from(shot.pixels,'base64');writeFileSync(out+`/bridge-${mobile?'mobile':'full'}-${name}.png`,PNG.sync.write(png));
  if(mobile){assert.equal(shot.indexedDraws,2);assert.deepEqual(shot.passLabels,['Gangway to screen']);assert.ok(shot.indexedTriangles<=25000);assert.equal(await frame.evaluate(()=>__app.gangwayRenderer.activeProfile),'upper');assert.equal(await frame.locator('.luz-upper-interior-limit').isVisible(),false);}
 }
 const boundaries=await frame.evaluate(()=>{const n=__app.yachtWalk.nav;n.deck='UD';n.position=[21,1.5];for(let i=0;i<100;i++)n.move(0,.02);return {y:n.position[1],safe:n.floorSafe(21,n.position[1]+.02,'UD'),room:n.location().displayName};});
 assert.ok(boundaries.y>1.7&&boundaries.y<1.8&&!boundaries.safe);assert.equal(boundaries.room,'Puente de mando');
 await frame.evaluate(saved=>{const w=__app.yachtWalk;w.enterRoom('boarding');w.nav.position=saved.position;w.nav.deck=saved.deck;w.nav.elevation=w.nav.floorHeight(...saved.position);w.cameraElevation=w.nav.elevation;w.yaw=saved.yaw;w.pitch=saved.pitch;w.applyPosition();},saved);
};
