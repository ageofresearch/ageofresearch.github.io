const assert=require('node:assert/strict');
const {writeFileSync}=require('node:fs');
const {PNG}=require('pngjs');

async function capture(frame,out,readFrame,prefix='stairs',selected=null) {
  for(const [name,eye,target] of [
    ['bridge-lower',[19.16,1.18,5.55],[19.16,.75,4.25]],
    ['bridge-upper',[19.16,-1.8,7.6],[19.16,.65,4.6]],
    ['service-turn',[7.65,1.75,4.65],[8.95,1.85,3.75]],
    ['guest-turn',[17.2,-.1,3.15],[18.85,-.8,2.8]],
  ]) {
    if(selected && !selected.includes(name))continue;
    await frame.evaluate(({eye,target})=>{
      const app=window.__app,w=app.yachtWalk,m=w.model,b=m.group.userData.yacht;
      const vector=p=>m.group.localToWorld(app.camera.position.clone().set(p[1]*b.sy,p[2]-b.seaReference,p[0]*b.sx-b.length/2));
      const position=vector(eye),direction=vector(target).sub(position).normalize();
      w.__stairsUpdate??=w.update;
      w.update=()=>{app.camera.position.copy(position);app.camera.rotation.set(Math.asin(direction.y),Math.atan2(-direction.x,-direction.z),0,'YXZ');};
      w.update();w.resetHistory();
    },{eye,target});
    const shot=await readFrame(),image=new PNG({width:shot.width,height:shot.height});
    image.data=Buffer.from(shot.pixels,'base64');writeFileSync(`${out}/${prefix}-${name}.png`,PNG.sync.write(image));
  }
  await frame.evaluate(()=>{const w=window.__app.yachtWalk;w.update=w.__stairsUpdate;delete w.__stairsUpdate;w.enterRoom('boarding');});
}

module.exports=async function verifyFlights(frame,out,readFrame) {
  const result=await frame.evaluate(()=>{
    const model=window.__app.yachtWalk.model,nav=window.__app.yachtWalk.nav;
    const flights=model.stairInventory.flights;
    return {inventory:flights.map(f=>[f.id,f.treadCount,f.riseCount]),
      provisional:model.stairInventory.provisionalReferences.map(r=>r.ids.length),
      registry:[...nav.stairFlights.keys()],
      bridge:flights.find(f=>f.id==='bridge').surfaces.slice(1,4).map(s=>Math.max(...s.polygons.flat().map(p=>p[1])))};
  });
  assert.deepEqual(result.inventory,[['guest',13,14],['bridge',11,12],['aft',11,12],['sun',13,14],['service',12,13]]);
  assert.deepEqual(result.provisional,[9,9]);
  assert.equal(result.registry.length,5);assert.ok(result.bridge.every(y=>y<=1.11));
  await capture(frame,out,readFrame);
  console.log('Shared stair surfaces in the browser:',result);
};
module.exports.capture=capture;
