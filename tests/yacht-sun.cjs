const assert=require('node:assert/strict');
const {writeFileSync}=require('node:fs');
const {PNG}=require('pngjs');
module.exports=async function sunViews(frame,out,readFrame,mobile) {
  const saved=await frame.evaluate(()=>{const w=__app.yachtWalk;return {position:w.nav.position.slice(),deck:w.nav.deck,yaw:w.yaw,pitch:w.pitch};});
  for(const {name,position,target,deck='SD',step=null}of [
    {name:'stair-base',position:[11.35,2.7],target:[13.85,1.02,8.2],deck:'UD'},
    {name:'stair-turn',position:null,target:[13.85,.7,8.5],deck:'UD',step:7},
    {name:'arrival',position:[13.85,.7],target:[17.5,0,8.9]},
    {name:'loungers',position:[13.85,-.3],target:[11.6,-.1,8.6]},
    {name:'bar',position:[17.2,-.3],target:[15.5,-1.3,8.9]},
    {name:'seating',position:[18.9,0],target:[15.6,1,8.9]},
  ]) {
    await frame.evaluate(({position,target,deck,step})=>{
      const app=__app,w=app.yachtWalk,b=w.model.group.userData.yacht;
      w.enterRoom(deck==='SD'?'SD_R01':'UD_R01');
      if(step){const f=w.model.sun?.flight||w.model.stairInventory.flights.find(f=>f.id==='sun'),s=f.surfaces[step],ps=s.polygons.flat();
        position=[0,1].map(k=>(Math.min(...ps.map(p=>p[k]))+Math.max(...ps.map(p=>p[k])))/2);w.nav.stair={route:f.route,surfaceIndex:step,d:0};w.nav.elevation=s.height;
      }else {if(!w.nav.floorSafe(...position))throw Error('Unsafe sun pose '+position);w.nav.elevation=deck==='SD'?8.2:6;}
      w.nav.position=position;w.cameraElevation=w.nav.elevation;w.applyPosition();
      const look=app.camera.position.clone().set(target[1]*b.sy,target[2]-b.seaReference,target[0]*b.sx-b.length/2);
      w.model.group.localToWorld(look).sub(app.camera.position).normalize();w.yaw=Math.atan2(-look.x,-look.z);w.pitch=Math.asin(look.y);
    },{position,target,deck,step});
    const shot=await readFrame(),png=new PNG({width:shot.width,height:shot.height});png.data=Buffer.from(shot.pixels,'base64');
    writeFileSync(out+`/sun-${mobile?'mobile':'full'}-${name}.png`,PNG.sync.write(png));
    if(mobile){assert.equal(shot.indexedDraws,2);assert.deepEqual(shot.passLabels,['Gangway to screen']);assert.ok(shot.indexedTriangles<=25000);assert.equal(await frame.evaluate(()=>__app.gangwayRenderer.activeProfile),deck==='SD'||step?'sun':'upper');}
  }
  if(mobile) {
    const states=await frame.evaluate(()=>{
      const a=__app,w=a.yachtWalk,n=w.nav,f=w.model.sun.flight;
      return f.surfaces.slice(1,-1).map(s=>{const ps=s.polygons.flat();n.deck='UD';n.position=[0,1].map(k=>(Math.min(...ps.map(p=>p[k]))+Math.max(...ps.map(p=>p[k])))/2);
        n.elevation=s.height;n.stair={route:f.route,surfaceIndex:s.index,d:0};w.applyPosition();a.frame(0);return {safe:n.safe(...n.position),profile:a.gangwayRenderer.activeProfile};});
    });assert.equal(states.length,13);assert.ok(states.every(s=>s.safe&&s.profile==='sun'));
    await frame.evaluate(()=>{__app.yachtWalk.nav.stair=null;__app.yachtWalk.enterRoom('SD_R01');});
  }
  await frame.evaluate(saved=>{const w=__app.yachtWalk;w.enterRoom('boarding');w.nav.position=saved.position;w.nav.deck=saved.deck;w.nav.elevation=w.nav.floorHeight(...saved.position);w.cameraElevation=w.nav.elevation;w.yaw=saved.yaw;w.pitch=saved.pitch;w.applyPosition();},saved);
};
