const assert=require('node:assert/strict');
const {writeFileSync}=require('node:fs');
const {PNG}=require('pngjs');

module.exports=async function verifyStern(page,frame,out,readFrame) {
  const result=await frame.evaluate(()=>{
    const walk=window.__app.yachtWalk,nav=walk.nav,access=walk.model.sternAccess;
    walk.enterRoom('MD_R01');
    const approach=[[6.2,.8],[7.4,-.4],[7.4,-.9],[7.1,-1.2],[5.8,-1.2],[4,-3],[4,-3.03],[2.7,-3.03]];
    const travel=points=>{
      for(const p of points) {
        nav.move(p[0]-nav.position[0],p[1]-nav.position[1]);
        if(Math.hypot(...p.map((v,i)=>v-nav.position[i]))>.002)throw Error('Blocked at '+nav.position+' toward '+p);
      }
    };
    travel(approach);travel([[.35,-3.03],[.35,0]]);
    const lower={deck:nav.deck,elevation:nav.elevation,room:nav.location().id};
    travel([[.35,-3.03],[2.7,-3.03]]);
    const upper={deck:nav.deck,elevation:nav.elevation,stair:nav.stair};
    // The existing camera interpolation must settle exactly at platform eye height.
    travel([[1.5,-3.03]]);walk.applyPosition(1/60);
    const smooth=walk.cameraElevation>nav.elevation && walk.cameraElevation<3.95;
    travel([[.35,-3.03]]);
    for(let i=0;i<60;i++)walk.applyPosition(1/60);
    const local=walk.model.group.worldToLocal(window.__app.camera.position.clone());
    return {lower,upper,smooth,eyeHeight:local.y+walk.model.group.userData.yacht.seaReference,
      platformFloor:access.lowerHeight,triangles:walk.model.stats.triangles};
  });
  assert.deepEqual(result.lower,{deck:'SP',elevation:2.84,room:'swim-platform'});
  assert.deepEqual(result.upper,{deck:'MD',elevation:3.95,stair:null});
  assert.ok(result.smooth);
  assert.ok(Math.abs(result.eyeHeight-4.44)<1e-6);
  assert.ok(result.triangles<=25000);
  await frame.locator('[data-location]').filter({hasText:'Plataforma de baño'}).waitFor();
  await page.locator('#pilot').evaluate(el=>{el.open=true;});
  await page.waitForFunction(()=>document.querySelector('#cross').disabled);
  await page.locator('#pilot').evaluate(el=>{el.open=false;});
  await frame.locator('[data-explore]').click();
  assert.equal(await frame.locator('[data-deck="MD"] span').textContent(),'0');
  await frame.locator('[data-deck="SP"]').waitFor({state:'visible'});
  assert.ok((await frame.locator('[data-list-heading]').textContent()).includes('plataforma'));
  await frame.locator('[data-close]').click();

  const performance=await frame.evaluate(()=>new Promise((resolve,reject)=>{
    const app=window.__app,walk=app.yachtWalk,nav=walk.nav;
    walk.enterRoom('MD_R01');nav.position=[4,-3.03];walk.applyPosition();
    const original=app.frame,intervals=[];let start,previous,target=.35,turns=0;
    app.frame=function(dt) {
      const now=globalThis.performance.now();start??=now;
      if(previous!==undefined)intervals.push(now-previous);
      const seconds=previous===undefined?0:Math.min(.075,(now-previous)/1000);previous=now;
      const delta=target-nav.position[0];
      nav.move(Math.sign(delta)*Math.min(Math.abs(delta),seconds*1.12),0);
      if(Math.abs(target-nav.position[0])<.002){target=target===.35?4:.35;turns++;}
      const direction=app.camera.position.clone().set(0,0,Math.sign(target-nav.position[0])).applyQuaternion(walk.model.group.quaternion);
      walk.yaw=Math.atan2(-direction.x,-direction.z);walk.pitch=-.35;
      try{original.call(app,dt);}catch(error){app.frame=original;reject(error);return;}
      if(now-start>=20000) {
        app.frame=original;
        const sorted=intervals.toSorted((a,b)=>a-b);
        resolve({fps:1000*intervals.length/intervals.reduce((a,b)=>a+b,0),p95:sorted[Math.ceil(sorted.length*.95)-1],
          width:app.engine.width,height:app.engine.height,samples:app.gangwayRenderer.samples,turns});
      }
    };
  }));
  assert.equal(performance.width,360);assert.equal(performance.height,540);assert.equal(performance.samples,4);
  assert.ok(performance.turns>=4,'The timed camera must actually traverse the stair in both directions');
  console.log('Starboard 20s traversal, Chrome software rendering:',performance);

  for(const [name,position,target,deck] of [
    ['starboard-upper',[4,-3.03,3.95],[2,-3.03,3.5],'MD'],
    ['starboard-lower',[.35,-3.03,2.84],[3.5,-3.03,4.05],'SP'],
    ['starboard-platform',[.35,-1.1,2.84],[2.5,-3.03,3.85],'SP']
  ]) {
    await frame.evaluate(({position,target,deck})=>{
      const a=window.__app,w=a.yachtWalk,b=w.model.group.userData.yacht;
      w.nav.enterRoom(deck==='MD'?'MD_R01':'swim-platform');
      w.nav.position=position.slice(0,2);w.nav.elevation=position[2];w.applyPosition();
      const aim=w.model.group.localToWorld(a.camera.position.clone().set(target[1]*b.sy,target[2]-b.seaReference,target[0]*b.sx-b.length/2));
      const direction=aim.sub(a.camera.position).normalize();
      w.yaw=Math.atan2(-direction.x,-direction.z);w.pitch=Math.asin(direction.y);
    },{position,target,deck});
    const shot=await readFrame(),image=new PNG({width:shot.width,height:shot.height});
    image.data=Buffer.from(shot.pixels,'base64');writeFileSync(`${out}/${name}.png`,PNG.sync.write(image));
    assert.equal(shot.indexedDraws,2);assert.deepEqual(shot.passLabels,['Gangway to screen']);
  }
  await frame.evaluate(()=>window.__app.yachtWalk.enterRoom('boarding'));
  console.log('Starboard deck/stairs/platform and native camera:',result);
};
