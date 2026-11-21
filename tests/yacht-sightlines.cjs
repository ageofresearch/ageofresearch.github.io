const assert=require('node:assert/strict');

// Compare actual resolved color against the ordinary all-direction drawing
// range in the same buffers, pipeline, profile, camera and render pass.
module.exports=async function sightlineFrames(frame,readFrame){
  let trimmedViews=0;
  for(const [room,xy,target] of [
    ['LD_R03',[17.04,1.02],[15.85,2.75,2.38]],
    ['LD_R03',[17.04,2.48],[16.49,.35,2.59]],
    ['MD_R02',[9.55,0],[12.6,.1,4.8]],
    ['MD_R02',[15.3,-1.6],[17.3,-1.4,4.85]],
    ['MD_R02',[15.7,-1.8],[14.4,-1.34,5.20]],
    ['UD_R02',[14.8,0],[12.8,0,7.2]],
    ['LD_R11',[16.84,-.05],[13.61,-.09,2.31]],
    ['LD_R11',[14.75,-.10],[16.84,-.05,2.80]],
    ['MD_R01',[6.68,-.48],[5.22,-.74,4.44]],
    ['swim-platform',[.35,-1.15],[2.4,0,3.65]],
    ['swim-platform',[.35,.5],[2.55,.25,3.72]],
    ['UD_R04',[26.86,0],[23.1,0,6.75]],
    ['UD_R04',[20.4,-2.91],[24.6,-2.85,6.68]],
  ]){
    const window=await frame.evaluate(async({room,xy,target})=>{
      const a=__app,w=a.yachtWalk,n=w.nav,b=w.model.group.userData.yacht;
      w.enterRoom(room);n.position=xy.slice();n.stair=null;n.elevation=n.floorHeight(...xy);
      w.cameraElevation=n.elevation;w.applyPosition();
      const d=w.model.group.localToWorld(a.camera.position.clone().set(target[1]*b.sy,target[2]-b.seaReference,target[0]*b.sx-b.length/2)).sub(a.camera.position).normalize();
      w.yaw=Math.atan2(-d.x,-d.z);w.pitch=Math.asin(d.y);a.frame(0);
      const p=w.model.guestAccess.profiles[a.gangwayRenderer.activeProfile],batch=p.batches[0];
      const eye=w.model.boarding.group.worldToLocal(a.camera.position.clone()),band=Math.max(0,Math.min(batch.ranges.length-1,Math.floor((eye.z-p.visibility.start)/p.visibility.step)));
      return {band,ordinary:batch.ranges[band],glass:p.batches[1].indices.length};
    },{room,xy,target});
    const optimized=await readFrame();
    assert.ok(optimized.indexedTriangles<(window.ordinary[1]+window.glass)/3,'Expected a directional draw at '+xy);
    const reference=async band=>{
      await frame.evaluate(band=>{
        const r=__app.gangwayRenderer,original=r.render;
        r.render=function(profile,target){return original.call(r,profile??r.activeProfile,target,band);};
        globalThis.undoSightlineControl=()=>{r.render=original;};
      },band);
      try{return await readFrame();}
      finally{await frame.evaluate(()=>{undoSightlineControl();delete globalThis.undoSightlineControl;});}
    };
    const baked=await reference(null);
    assert.equal(Buffer.compare(Buffer.from(optimized.pixels,'base64'),Buffer.from(baked.pixels,'base64')),0,
      'View filtering changed the resolved yacht at '+xy);
    if(optimized.indexedTriangles<baked.indexedTriangles)trimmedViews++;
    assert.ok(baked.indexedTriangles<(window.ordinary[1]+window.glass)/3,'Baked sightline was unavailable at '+xy);
    const control=await reference(window.band);
    const a=Buffer.from(optimized.pixels,'base64'),b=Buffer.from(control.pixels,'base64');
    let changed=0,maxRun=0;
    for(let y=0;y<optimized.height;y++){
      let run=0;
      for(let x=0;x<optimized.width;x++){
        const i=4*(y*optimized.width+x);
        const delta=Math.max(...[0,1,2].map(k=>Math.abs(a[i+k]-b[i+k])));
        if(delta>8){changed++;run++;maxRun=Math.max(maxRun,run);}else run=0;
      }
    }
    assert.ok(changed<optimized.width*optimized.height*.0005&&maxRun<8,'Lost visible color at '+xy+': '+changed+' pixels, widest run '+maxRun);
  }
  assert.ok(trimmedViews>0,'Expected the worker to supply a narrower visible span');
  await frame.evaluate(()=>__app.yachtWalk.enterRoom('boarding'));
};
