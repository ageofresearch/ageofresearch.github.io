const {PNG}=require('pngjs');
const {writeFileSync}=require('node:fs');
const assert=require('node:assert/strict');
// Fixed inspection cameras, including a view outside the bow navigation limit.
// These inspect geometry and do not claim that those camera positions are walkable.
module.exports=async(frame,out,readFrame,mobile)=>{
 const saved=await frame.evaluate(()=>{const w=__app.yachtWalk;return {position:w.nav.position.slice(),deck:w.nav.deck,elevation:w.nav.elevation,yaw:w.yaw,pitch:w.pitch};});
 const views=[
  {name:'cockpit',deck:'MD',position:[5.3,.8],target:[4.58,-1.45,4.05]},
  {name:'dining-aft',deck:'UD',position:[10.2,-2.5],target:[11.7,-.78,6.4]},
  {name:'dining-forward',deck:'UD',position:[14,-2.5],target:[12.9,-.78,6.4]},
  {name:'bow-port-contact',deck:'UD',position:[30.7,3.1],elevation:4.9,target:[30.05,2.13,6.05]},
  {name:'bow-starboard-contact',deck:'UD',position:[30.7,-3.1],elevation:4.9,target:[30.05,-2.13,6.05]},
  {name:'helm-glazing',deck:'UD',position:[20.7,1.5],target:[22.6,1.65,6.75]},
  ...mobile?[]:[
   {name:'galley',deck:'MD',position:[20.8,1.65],target:[20.8,2.7,4.7]},
   {name:'owner-chair',deck:'MD',position:[24.5,1.6],target:[25.7,2.5,4.3]},
   {name:'day-head',deck:'MD',position:[21.4,-2.35],target:[21.95,-2.93,4.3]},
  ],
 ];
 for(const view of views.filter(v=>!process.env.YACHT_VIEWS||process.env.YACHT_VIEWS.split(',').includes(v.name))){
  await frame.evaluate(({deck,position,target,elevation})=>{
   const a=__app,w=a.yachtWalk,n=w.nav,b=w.model.group.userData.yacht;
   w.enterRoom(deck==='UD'?'UD_R01':'MD_R01');
   n.deck=deck;n.position=position;n.stair=null;n.elevation=elevation??(deck==='UD'?6:3.95);
   w.cameraElevation=n.elevation;w.applyPosition();
   const d=a.camera.position.clone().set(target[1]*b.sy,target[2]-b.seaReference,target[0]*b.sx-b.length/2);
   w.model.group.localToWorld(d).sub(a.camera.position).normalize();w.yaw=Math.atan2(-d.x,-d.z);w.pitch=Math.asin(d.y);
  },view);
  const shot=await readFrame(),png=new PNG({width:shot.width,height:shot.height});png.data=Buffer.from(shot.pixels,'base64');
  writeFileSync(out+`/spatial-${mobile?'mobile':'full'}-${view.name}.png`,PNG.sync.write(png));
  if(mobile){assert.equal(shot.indexedDraws,2);assert.equal(shot.passLabels.length,1);assert.ok(shot.indexedTriangles<=25000);}
 }
 await frame.evaluate(saved=>{const w=__app.yachtWalk;Object.assign(w.nav,{deck:saved.deck,position:saved.position,elevation:saved.elevation,stair:null});w.cameraElevation=saved.elevation;w.yaw=saved.yaw;w.pitch=saved.pitch;w.applyPosition();},saved);
};
