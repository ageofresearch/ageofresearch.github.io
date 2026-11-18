const assert=require('node:assert/strict');

// Compare actual resolved color against the ordinary all-direction drawing
// range in the same buffers, pipeline, profile, camera and render pass.
module.exports=async function sightlineFrames(frame,readFrame){
  for(const [room,xy,target] of [
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
      return {ordinary:batch.ranges[band],views:batch.views.map(v=>v.first),glass:p.batches[1].indices.length};
    },{room,xy,target});
    const optimized=await readFrame();
    assert.ok(optimized.indexedTriangles<(window.ordinary[1]+window.glass)/3,'Expected a directional draw at '+xy);
    await frame.evaluate(({ordinary,views})=>{
      const original=GPURenderPassEncoder.prototype.drawIndexed;
      GPURenderPassEncoder.prototype.drawIndexed=function(count,instances,first,...rest){
        return views.includes(first)?original.call(this,ordinary[1],instances,ordinary[0],...rest):original.call(this,count,instances,first,...rest);
      };
      globalThis.undoSightlineControl=()=>{GPURenderPassEncoder.prototype.drawIndexed=original;};
    },window);
    let control;
    try{control=await readFrame();}finally{await frame.evaluate(()=>{undoSightlineControl();delete globalThis.undoSightlineControl;});}
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
  await frame.evaluate(()=>__app.yachtWalk.enterRoom('boarding'));
};
