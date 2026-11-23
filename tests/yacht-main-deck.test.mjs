import test from 'node:test';
import assert from 'node:assert/strict';
import {mobile,full,guest} from './yacht-guest-fixture.mjs';
import {l as basis} from '../site/tidewater-rocha/assets/RochaYachtState-P5KwIGIl.js';
import {travel} from './yacht-saloon-fixture.mjs';
import {mainRooms} from '../site/tidewater-rocha/mobile/main-deck.js';

const dining=[[6.7,0],[9.25,0],[9.25,-1.8],[11.2,-1.8],[11.2,-1.9],[17.2,-1.9],[17.2,0.1],[17.3,0.1],[17.3,0.2],[17.6,0.2],[17.6,1.8],[17.7,1.8],[17.7,1.9]];
const lobby=[...dining,[21.3,1.9],[21.3,1.5],[21.4,1.5],[21.4,1.4]];
const suiteDoor=[...lobby,[21.7,1.4],[21.7,0.5],[21.9,0.5],[21.9,0.4],[22.2,0.4],[22.2,0.3],[22.3,0.3],[22.3,0.2],[23.6,0.2]];
const destinations={
  MD_R09:[...lobby,[21.6,1.4],[21.6,0.9]],
  MD_R08:[...dining,[20.5,1.9],[20.5,2]],
  MD_R03:[...dining,[21.2,1.9],[21.2,-0.2]],
  MD_R06:[...lobby,[21.5,1.4],[21.5,-2.4]],
  MD_R04:[...suiteDoor,[23.6,-1.7],[24.8,-1.7],[24.8,-1.6],[24.9,-1.6],[24.9,-1.5],[25.8,-1.5],[25.8,-1.4]],
  MD_R05:[...suiteDoor,[23.6,1.7],[23.7,1.7],[23.7,1.8],[25.6,1.8],[25.6,1.7],[26.6,1.7],[26.6,1],[27,1],[27,0.5],[27.7,0.5],[27.7,1.5]],
  MD_R12:[...suiteDoor,[23.6,-1.7],[24.8,-1.7],[24.8,-1.6],[24.9,-1.6],[24.9,-1.5],[26,-1.5],[26,-1.4],[27,-1.4],[27,-0.6],[27.9,-0.6],[27.9,-1.9]],
  MD_R10:[[6.7,0],[5.6,0],[5.6,0.6],[5.3,0.6],[5.3,1],[5.1,1],[5.1,2.9],[5.3,2.9],[5.3,3],[11.3,3],[11.3,3.2],[11.5,3.2],[11.5,3.3],[20,3.3]],
  MD_R11:[[6.7,0],[8.18,0],[8.18,-3.2],[8.5,-3.2],[8.5,-3.3],[20,-3.3],[20,-3.4]],
};

test('the gangway joins the cockpit and all nine main deck destinations have return routes in both viewers',async()=>{
  for(const fixture of [mobile(),await full({boarding:true})]){
    const {model,walk:{nav}}=fixture;
    const boarding=[[-4.3,3.1],[2.1,3.1],[3.65,3.1],[4.56,3.1],[4.59,2.4],
      [4.59,1.21],[5.91,1.05],[6.11,.74],[6.13,.20],[6.68,0],[6.7,0]];
    const startHeight=model.boarding.height(-4.3);
    for(const hz of [12,40,60]){
      nav.deck='MD';nav.position=boarding[0].slice();nav.stair=null;nav.elevation=startHeight;
      travel(nav,boarding,hz);
      for(const [id,path] of Object.entries(destinations)){
        travel(nav,path,hz);
        assert.equal(nav.location()?.id,id);
        assert.equal(nav.elevation,3.95);
        nav.move(0,0);
        travel(nav,path.toReversed(),hz);
      }
      travel(nav,boarding.toReversed(),hz);
      assert.ok(Math.abs(nav.elevation-startHeight)<.001);
    }
    for(const room of mainRooms){
      const xy=room.spawn.slice(0,2);
      assert.ok(nav.floorSafe(...xy,'MD'),room.id);
      assert.deepEqual(nav.nearest(...xy,'MD'),xy);
      assert.equal(model.asset.data.rooms.filter(r=>r.id===room.id).length,1);
    }
    for(const p of [[21.95,.96],[24.7,0],[29.29,1.9],[20,3.83],[22.5,3.24]])
      assert.equal(nav.floorSafe(...p,'MD'),false,'Walk through fitting or edge '+p);
    fixture.dispose?.();if(!fixture.dispose)model.dispose();
  }
});

test('both side passages retain a supported handrail across the cockpit joint in every walking profile',()=>{
  const stations=[6.8,8.44,8.46,10.2,11.59,11.61,16.2,20,22.2];
  for(const [profile,data] of Object.entries(guest.profiles)){
    const {indices,attributes:{position}}=data.batches[0];
    for(const side of [-1,1])for(const x of stations){
      // Inspect the actual uploaded faces in the all-direction draw at this eye.
      const band=Math.floor((x*basis.sx-basis.length/2-data.visibility.start)/data.visibility.step)
        +(side>0?(data.visibility.lateralBands??0):0);
      const [first,count]=data.batches[0].ranges[band];
      const found=new Set();
      const base=side>0&&x<11.6?4.84:4.49;
      for(let i=first;i<first+count&&found.size<2;i+=3){
        const ids=indices.subarray(i,i+3),ys=Array.from(ids,k=>position[k*3]*side/basis.sy);
        if(ys.some(y=>y<3.3||y>3.82))continue;
        const xs=Array.from(ids,k=>(position[k*3+2]+basis.length/2)/basis.sx);
        if(x<Math.min(...xs)||x>Math.max(...xs))continue;
        const zs=Array.from(ids,k=>position[k*3+1]+basis.seaReference);
        if(zs.every(z=>Math.abs(z-5.025)<.029))found.add('rail');
        // Rounded bulwark ends can dip at the butt joint. Intersect the
        // actual face with the station plane before checking its height.
        for(let j=0;j<3;j++){
          const k=(j+1)%3,dx=xs[k]-xs[j];
          if(!dx)continue;
          const t=(x-xs[j])/dx;
          if(t>=0&&t<=1&&Math.abs(zs[j]+t*(zs[k]-zs[j])-base)<.05)found.add('base');
        }
      }
      assert.deepEqual([...found].sort(),['base','rail'],profile+' side '+side+' at '+x);
    }
  }
});

test('the outside edge stops sideways movement along both main-deck passages in both viewers',async()=>{
  for(const f of [mobile(),await full({boarding:true})]){
    try{
      const nav=f.walk.nav;
      for(const side of [-1,1])for(const x of [8.8,10.2,13.1,16.2,19.8]){
        const start=[x,3.32*side];
        assert.ok(nav.floorSafe(...start,'MD'),'Open passage '+start);
        nav.deck='MD';nav.position=start;nav.stair=null;nav.elevation=3.95;
        for(let i=0;i<48;i++)nav.move(0,.018*side);
        assert.ok(nav.position[1]*side<3.65&&nav.floorSafe(...nav.position,'MD'),'Guard at '+start);
        assert.equal(nav.floorSafe(x,3.82*side,'MD'),false);
      }
    }finally{if(f.dispose)f.dispose();else f.model.dispose();}
  }
});

function insideTriangle(triangle,x,y) {
  const sides=triangle.map(([u,v],j)=>{
    const [U,V]=triangle[(j+1)%3];
    return (U-u)*(y-v)-(V-v)*(x-u);
  });
  return sides.every(d=>d>1e-8)||sides.every(d=>d< -1e-8);
}

test('the visible band keeps the cockpit floor, the passage strips and the overhead across extraction seams',()=>{
  function heightsAt(profile,x,y){
    const {batches,visibility}=profile;
    const {indices,attributes:{position},ranges}=batches[0];
    const band=Math.floor((x*basis.sx-basis.length/2-visibility.start)/visibility.step)
      +(y>0?(visibility.lateralBands??0):0);
    const [first,count]=ranges[band],hits=[];
    for(let i=first;i<first+count;i+=3){
      const face=Array.from(indices.subarray(i,i+3),k=>[(position[3*k+2]+basis.length/2)/basis.sx,
        position[3*k]/basis.sy,position[3*k+1]+basis.seaReference]);
      if(insideTriangle(face,x,y)&&face.every(p=>Math.abs(p[2]-face[0][2])<1e-5))hits.push(face[0][2]);
    }
    return hits;
  }
  for(const [x,y] of [[4.96,-.32],[5.781,.202],[7.32,3.12],[7.32,-3.12],
    [8.499,3.36],[8.501,3.36],[8.501,-3.36],[11.08,.35],[16.16,3.34],[17.84,2.9],[19.49,-3.32],[23.2,.458]]){
    const hits=heightsAt(guest.profiles.main,x,y);
    for(const z of [3.95,5.88])assert.equal(hits.filter(height=>Math.abs(height-z)<1e-5).length,1,
      'Expected one visible surface at '+[x,y,z]);
  }
  for(const [name,profile] of Object.entries(guest.profiles)){
    for(const [x,y] of [[8.51,3.36],[9.14,3.36],[10.22,-3.32],[19.49,-3.32]]){
      assert.equal(heightsAt(profile,x,y).filter(z=>Math.abs(z-3.95)<1e-5).length,1,
        name+' passage floor at '+[x,y]);
    }
  }
});

test('the source hull, teak edge, window reveals and gaskets each have a single exposed face',async()=>{
  const {renderedParts}=await import('../site/tidewater-rocha/mobile/stair-surfaces.js');
  const {model}=await full();
  try{
    const pieces=renderedParts(model);
    const shell=pieces.filter(p=>p.feature==='retained hull with open above-water stern stair bays'||
      p.anchor==='MD_DCK_001'&&p.feature?.startsWith('stair opening'));
    const reveal=pieces.filter(p=>p.id.startsWith('MD_GLA_007/'));
    function facesAt(parts,axis,level,u,v){
      let count=0;
      for(const p of parts){
        for(let i=0;i<p.indices.length;i+=3){
          const face=Array.from(p.indices.slice(i,i+3),k=>Array.from(p.vertices.slice(k*6,k*6+3)));
          if(face.every(pt=>Math.abs(pt[axis]-level)<1e-6)&&
            insideTriangle(face.map(pt=>[pt[(axis+1)%3],pt[(axis+2)%3]]),u,v))count++;
        }
      }
      return count;
    }
    for(const side of [-1,1]){
      for(const x of [8.626,10.131,13.337]){
        assert.equal(facesAt(shell,2,3.95,x,3.751*side),1,'teak against hull at '+x);
        // Beyond the parallel midbody the hull tapers inside this plane.
        if(x<11)assert.equal(facesAt(shell,1,3.8*side,3.902,x),1,'outer hull skin at '+x);
      }
    }
    const profile=guest.profiles.main;
    for(const id of ['MD/boarding-route/4','MD/boarding-route/5']){
      assert.ok(profile.audit.some(p=>p.id===id&&p.triangles>0));
      assert.ok(!profile.audit.some(p=>p.id.startsWith(id+'/main-deck')&&p.triangles>0));
    }
    for(const z of [4.251,4.31,5.783]){
      const y=reveal.find(p=>p.id.endsWith('/000')).bounds[1];
      assert.equal(facesAt(reveal,1,y,z,18.001),1,'window joint at '+z);
    }
  }finally{model.dispose();}
});
