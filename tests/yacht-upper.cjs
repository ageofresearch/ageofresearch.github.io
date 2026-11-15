const assert=require('node:assert/strict');
const {writeFileSync}=require('node:fs');
const {PNG}=require('pngjs');
module.exports=async function upperViews(frame,out,readFrame,mobile) {
  const saved=await frame.evaluate(()=>{const w=window.__app.yachtWalk;return {position:w.nav.position.slice(),deck:w.nav.deck,yaw:w.yaw,pitch:w.pitch};});
  for(const {name,position,target}of [
    {name:'arrival',position:[8.35,2.21],target:[11.9,0,6.7]},
    {name:'daybed',position:[9.9,1.5],target:[6.1,0,6.6]},
    {name:'dining',position:[10.2,.95],target:[12.1,-.8,6.5]},
    {name:'return',position:[13.8,.1],target:[8,0,6.7]},
  ]) {
    await frame.evaluate(({position,target})=>{
      const app=window.__app,w=app.yachtWalk,b=w.model.group.userData.yacht;
      w.nav.enterRoom('UD_R01');if(!w.nav.floorSafe(...position))throw Error('Unsafe upper inspection pose');
      w.nav.position=position;w.nav.elevation=6;w.cameraElevation=6;w.applyPosition();
      const look=app.camera.position.clone().set(target[1]*b.sy,target[2]-b.seaReference,target[0]*b.sx-b.length/2);
      w.model.group.localToWorld(look).sub(app.camera.position).normalize();w.yaw=Math.atan2(-look.x,-look.z);w.pitch=Math.asin(look.y);
    },{position,target});
    const r=await readFrame(),png=new PNG({width:r.width,height:r.height});png.data=Buffer.from(r.pixels,'base64');
    writeFileSync(out+`/upper-${mobile?'mobile':'full'}-${name}.png`,PNG.sync.write(png));
    if(mobile) {
      assert.equal(r.indexedDraws,2);assert.deepEqual(r.passLabels,['Gangway to screen']);assert.ok(r.indexedTriangles<=25000);
      assert.equal(await frame.evaluate(()=>window.__app.gangwayRenderer.activeProfile),'upper');
    }
  }
  if(mobile) {
    const states=await frame.evaluate(()=>{
      const app=window.__app,w=app.yachtWalk,nav=w.nav,flight=w.model.upper.flight,states=[];
      for(const s of flight.surfaces.slice(1,-1)) {
        const p=s.polygons.flat();nav.deck='MD';nav.position=[0,1].map(k=>(Math.min(...p.map(v=>v[k]))+Math.max(...p.map(v=>v[k])))/2);
        nav.elevation=s.height;nav.stair={route:flight.route,surfaceIndex:s.index,d:0};w.applyPosition();app.frame(0);
        states.push({profile:app.gangwayRenderer.activeProfile,safe:nav.safe(...nav.position)});
      }
      nav.stair=null;w.nav.enterRoom('UD_R01');return states;
    });
    assert.ok(states.every(s=>s.safe&&s.profile==='upper'));
    const metrics=[];
    for(const scale of [1,.5])for(const samples of [1,4]) {
      const m=await frame.evaluate(async({scale,samples})=>{
        const app=window.__app,w=app.yachtWalk,nav=w.nav;
        app.engine.setRenderScale(scale);app.gangwayRenderer.setSamples(samples);
        nav.enterRoom('UD_R01');w.applyPosition();
        const points=[[8.35,2.21],[9.9,1.5],[10.2,1.5],[10.2,.95],[13.8,.95],[13.8,.1]],route=points.concat(points.toReversed().slice(1));
        let index=1,last,start;const submitted=[];
        const originalFrame=app.frame;
        app.frame=function(dt){const result=originalFrame(dt);submitted.push(performance.now());return result;};
        try { await new Promise((resolve,reject)=>{
          function tick(now) {
            if(!start)start=now;
            if(last) {
              const dt=Math.min((now-last)/1000,.1),to=route[index],dx=to[0]-nav.position[0],dy=to[1]-nav.position[1],d=Math.hypot(dx,dy),step=Math.min(d,dt*1.12);
              nav.move(dx/d*step,dy/d*step);w.applyPosition(dt);
              if(Math.hypot(to[0]-nav.position[0],to[1]-nav.position[1])<.02)index=(index+1)%route.length||1;
            }
            last=now;
            if(now-start>=15000)return resolve();requestAnimationFrame(tick);
          }requestAnimationFrame(tick);
        }); }finally{app.frame=originalFrame;}
        const intervals=submitted.slice(1).map((t,i)=>t-submitted[i]);
        if(intervals.length<2)throw Error('No submitted upper-terrace frames');
        const sorted=intervals.slice().sort((a,b)=>a-b);
        return {width:app.engine.width,height:app.engine.height,samples:app.gangwayRenderer.samples,
          fps:intervals.length*1000/intervals.reduce((a,b)=>a+b,0),p95:sorted[Math.floor(sorted.length*.95)],max:Math.max(...intervals),
          triangles:w.model.stats.triangles,residentGeometryBytes:w.model.stats.residentGeometryBytes,loadMs:w.model.upperLoadMs};
      },{scale,samples});
      assert.ok(m.triangles<=25000);metrics.push(m);
    }
    await frame.evaluate(()=>{window.__app.engine.setRenderScale(1);window.__app.gangwayRenderer.setSamples(4);});
    writeFileSync(out+'/upper-performance.json',JSON.stringify(metrics,null,2));console.log('Upper terrace render measurements',metrics);
  }
  await frame.evaluate(saved=>{
    const w=window.__app.yachtWalk;w.nav.enterRoom('boarding');w.nav.position=saved.position;w.nav.deck=saved.deck;
    w.nav.elevation=w.nav.floorHeight(...saved.position);w.cameraElevation=w.nav.elevation;w.yaw=saved.yaw;w.pitch=saved.pitch;w.applyPosition();
  },saved);
};
