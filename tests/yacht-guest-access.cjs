const assert=require('node:assert/strict');
const {writeFileSync}=require('node:fs');
const {PNG}=require('pngjs');
module.exports=async function guestViews(frame,out,readFrame,mobile) {
  const saved=await frame.evaluate(()=>{const w=__app.yachtWalk;return {position:w.nav.position.slice(),deck:w.nav.deck,elevation:w.nav.elevation,yaw:w.yaw,pitch:w.pitch};});
  for(const view of [
    {name:'saloon-approach',position:[14.4,0],target:[17.4,-1.42,4.4],deck:'MD'},
    {name:'upper-landing',position:[17.4,-1.42],target:[18.75,-1.35,3.6],deck:'MD'},
    {name:'stair-upper',step:12,target:[18.9,-.85,3.2]},
    {name:'stair-turn',step:7,target:[17.4,-.08,2.6]},
    {name:'lower-landing',position:[17.210263340389897,-.0167544467966324],target:[18.8,-.7,3],deck:'LD'},
    {name:'distributor-aft',position:[16.8,-.1],target:[13.4,-.1,2.6],deck:'LD'},
    {name:'cabin-door',position:[16.48,-.1],target:[16.10,3.12,2.53],deck:'LD'},
    {name:'cabin-berth',position:[17.04,1.02],target:[15.87,2.75,2.29],deck:'LD'},
    {name:'cabin-return',position:[17.04,2.48],target:[16.48,.35,2.58],deck:'LD'},
    {name:'distributor-forward',position:[13.7,-.1],target:[17.2,-.1,2.6],deck:'LD'},
  ]) {
    await frame.evaluate(({position,target,deck,step})=>{
      const a=__app,w=a.yachtWalk,n=w.nav,b=w.model.group.userData.yacht,f=n.stairFlights.get('guest');
      w.enterRoom('LD_R11');n.deck=deck||'LD';n.stair=null;
      if(step){const ps=f.surfaces[step].polygons.flat();position=[0,1].map(k=>(Math.min(...ps.map(p=>p[k]))+Math.max(...ps.map(p=>p[k])))/2);n.stair={route:f.route,surfaceIndex:step,d:0};}
      n.position=position;n.elevation=step?f.surfaces[step].height:deck==='MD'?3.95:1.55;
      if(!n.safe(...position))throw Error('Unsafe guest view '+position);
      w.cameraElevation=n.elevation;w.applyPosition();
      const d=a.camera.position.clone().set(target[1]*b.sy,target[2]-b.seaReference,target[0]*b.sx-b.length/2);
      w.model.group.localToWorld(d).sub(a.camera.position).normalize();w.yaw=Math.atan2(-d.x,-d.z);w.pitch=Math.asin(d.y);
    },view);
    const shot=await readFrame(),png=new PNG({width:shot.width,height:shot.height});png.data=Buffer.from(shot.pixels,'base64');
    writeFileSync(out+`/guest-${mobile?'mobile':'full'}-${view.name}.png`,PNG.sync.write(png));
    if(mobile) {
      assert.equal(shot.indexedDraws,2);assert.deepEqual(shot.passLabels,['Gangway to screen']);assert.ok(shot.indexedTriangles<=25000);
      assert.equal(await frame.evaluate(()=>__app.gangwayRenderer.activeProfile),view.deck==='MD'?'main':'guest');
    }
  }
  await frame.evaluate(saved=>{const w=__app.yachtWalk;w.enterRoom('boarding');Object.assign(w.nav,{position:saved.position,deck:saved.deck,elevation:saved.elevation,stair:null});w.cameraElevation=saved.elevation;w.yaw=saved.yaw;w.pitch=saved.pitch;w.applyPosition();},saved);
};
