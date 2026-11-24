const assert=require('node:assert/strict');
const {writeFileSync}=require('node:fs');const {PNG}=require('pngjs');
module.exports=async function accessViews(frame,out,readFrame,mobile){
 const saved=await frame.evaluate(()=>{const w=__app.yachtWalk;return {position:w.nav.position.slice(),deck:w.nav.deck,yaw:w.yaw,pitch:w.pitch};});
 for(const {name,position,target,step}of [
  {name:'saloon-threshold',position:[17.3,.2],target:[18.7,1.1,4.7]},
  {name:'lobby',position:[18.5,1.35],target:[19.16,.2,5.2]},
  {name:'stair-middle',position:[19.16,-.1466666667],target:[19.16,-1.8,6.4],step:6},
  {name:'upper-landing',position:[19.16,-1.8],target:[19.16,.6,4.9],step:12},
  {name:'bridge-return',position:[20.5,-1.25],target:[19.16,-1.8,6.3],step:12},
 ]){
  await frame.evaluate(({position,target,step})=>{const a=__app,w=a.yachtWalk,n=w.nav,b=w.model.group.userData.yacht;w.enterRoom('MD_R07');
   const f=n.stairFlights.get('bridge');n.position=position;n.stair=null;n.deck=step===12?'UD':'MD';n.elevation=step?f.surfaces[step].height:3.95;
   if(step&&step<12)n.stair={route:f.route,surfaceIndex:step,d:0};
   if(!n.safe(...position))throw Error('Unsafe access view '+position);
   w.cameraElevation=n.elevation;w.applyPosition();const d=a.camera.position.clone().set(target[1]*b.sy,target[2]-b.seaReference,target[0]*b.sx-b.length/2);w.model.group.localToWorld(d).sub(a.camera.position).normalize();w.yaw=Math.atan2(-d.x,-d.z);w.pitch=Math.asin(d.y);
  },{position,target,step});
  const shot=await readFrame(),png=new PNG({width:shot.width,height:shot.height});png.data=Buffer.from(shot.pixels,'base64');writeFileSync(out+`/access-${mobile?'mobile':'full'}-${name}.png`,PNG.sync.write(png));
  if(mobile){assert.equal(shot.indexedDraws,2);assert.deepEqual(shot.passLabels,['Gangway to screen']);assert.ok(shot.indexedTriangles<=25000);assert.equal(await frame.evaluate(()=>__app.gangwayRenderer.activeProfile),step?'upper':'main');assert.equal(await frame.locator('.luz-bridge-helm-limit').isVisible(),false);}
 }
 await frame.evaluate(saved=>{const w=__app.yachtWalk;w.enterRoom('boarding');w.nav.position=saved.position;w.nav.deck=saved.deck;w.nav.stair=null;w.nav.elevation=w.nav.floorHeight(...saved.position);w.cameraElevation=w.nav.elevation;w.yaw=saved.yaw;w.pitch=saved.pitch;w.applyPosition();},saved);
};
