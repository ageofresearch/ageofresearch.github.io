const assert=require('node:assert/strict');
const {writeFileSync}=require('node:fs');
const {PNG}=require('pngjs');
module.exports=async function interiorViews(frame,out,readFrame,mobile){
  const saved=await frame.evaluate(()=>{const w=__app.yachtWalk;return {position:w.nav.position.slice(),deck:w.nav.deck,yaw:w.yaw,pitch:w.pitch};});
  const clearance=await frame.evaluate(()=>{
    const w=__app.yachtWalk,n=w.nav;w.enterRoom('UD_R02');
    return [1.7,-2.1].map(y=>{
      n.position=[15,y];for(let i=0;i<100;i++)n.move(0,Math.sign(y)*.02);
      return {y:n.position[1],overlap:n.floorSafe(15,y>0?1.95:-2.4,'UD')};
    });
  });
  assert.ok(clearance.every(p=>p.y<1.916&&p.y>-2.338&&!p.overlap),'Both glass panels stop the body in the rendered client');
  for(const {name,position,target} of [
    {name:'terrace',position:[13.8,0],target:[17,0,6.9]},
    {name:'threshold',position:[14.21,0],target:[17,0,6.65]},
    {name:'floor-joint',position:[14.8,0],target:[14.21,0,6]},
    {name:'cabinet',position:[15.5,0],target:[18.1,1.1,6.5]},
    {name:'return',position:[18.3,-1.9],target:[14.2,0,7]},
    {name:'ceiling',position:[16,1.6],target:[14.2,1,7.65]},
  ]){
    await frame.evaluate(({position,target})=>{
      const app=__app,w=app.yachtWalk,b=w.model.group.userData.yacht;w.enterRoom('UD_R02');
      if(!w.nav.floorSafe(...position,'UD'))throw Error('Unsafe interior pose '+position);
      w.nav.position=position;w.nav.elevation=6;w.cameraElevation=6;w.applyPosition();
      const direction=app.camera.position.clone().set(target[1]*b.sy,target[2]-b.seaReference,target[0]*b.sx-b.length/2);
      w.model.group.localToWorld(direction).sub(app.camera.position).normalize();w.yaw=Math.atan2(-direction.x,-direction.z);w.pitch=Math.asin(direction.y);
    },{position,target});
    const shot=await readFrame(),png=new PNG({width:shot.width,height:shot.height});png.data=Buffer.from(shot.pixels,'base64');
    writeFileSync(out+`/upper-interior-${mobile?'mobile':'full'}-${name}.png`,PNG.sync.write(png));
    if(mobile){assert.equal(shot.indexedDraws,2);assert.deepEqual(shot.passLabels,['Gangway to screen']);assert.ok(shot.indexedTriangles<=25000);
      assert.equal(await frame.evaluate(()=>__app.gangwayRenderer.activeProfile),'upper');
      assert.equal(await frame.locator('.luz-upper-interior-limit').isVisible(),name==='return');}
  }
  await frame.evaluate(saved=>{
    const w=__app.yachtWalk;w.enterRoom('boarding');w.nav.position=saved.position;w.nav.deck=saved.deck;
    w.nav.elevation=w.nav.floorHeight(...saved.position);w.cameraElevation=w.nav.elevation;w.yaw=saved.yaw;w.pitch=saved.pitch;w.applyPosition();
  },saved);
};
