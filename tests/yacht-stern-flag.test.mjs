import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {flagRect, flagOcclusion, flagTexel} from '../site/tidewater-rocha/mobile/stern-flag.js';
import {filterSamples} from '../site/tidewater-rocha/mobile/sample-visibility.js';

test('all prepared flag profiles carry the whole double-sided cloth and the staff tip', async()=>{
  for(const name of ['upper-terrace','sun-deck','upper-interior','bridge-helm','bow-deck','bridge-access','guest-access']){
    const url=new URL('../site/tidewater-rocha/mobile/'+name+'.json',import.meta.url);
    const {profiles}=JSON.parse(await readFile(url));
    for(const [profile,{audit,triangles,batches}] of Object.entries(profiles)){
      const cloth=audit.filter(p=>p.id.endsWith('/Panama-flag-cloth'));
      assert.equal(cloth.length,1,name+'/'+profile);
      assert.equal(cloth[0].triangles,16*5*4);
      assert.equal(cloth[0].sourceTriangles,cloth[0].triangles);
      assert.ok(!audit.some(p=>/Panama-flag-(sewn|blue|red)/.test(p.id)));
      assert.ok(audit.some(p=>p.id.endsWith('/inclined-polished-stern-flagpole')&&p.triangles===32));
      assert.ok(triangles<=25000);assert.equal(batches.length,2);
    }
  }
});

test('frame reuse requires the complete sweep to be outside or behind an opaque triangle',()=>{
  const clip=Float32Array.of(1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1);
  const box=[-.1,-.1,-2,.1,.1,-1];
  assert.ok(flagRect(clip,box,600,400));
  assert.equal(flagRect(clip,[1.2,0,0,2,.2,1],600,400),null);
  const face=Float32Array.of(-2,-2,0,2,-2,0,0,2,0);
  const hidden=flagOcclusion(face,[0,1,2],[0,3],box,new Float32Array(12));
  assert.equal(hidden({x:0,y:0,z:1}),true);
  assert.equal(hidden({x:7,y:0,z:1}),false);
  assert.equal(hidden({x:0,y:0,z:-.5}),false);
});

test('a stationary capture retains the cloth and the scenery it can uncover',()=>{
  const v=new Uint8Array(9*32),f=new Float32Array(v.buffer),layer=new Int16Array(v.buffer);
  for(let i=0;i<9;i++){f[i*8]=i>=6?2:0;layer[i*16+14]=i<3?-4:0;}
  const matrix=Float32Array.of(1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1);
  const result=filterSamples(new Uint32Array(2048),v,Uint16Array.from({length:9},(_,i)=>i),0,9,[-.2,-.2,.2,.2],matrix);
  assert.deepEqual([...result.output.slice(0,result.length)],[0,1,2,3,4,5]);
});

test('the mobile cloth atlas carries both five-pointed stars and a darker sewn hem',()=>{
  const emblem=(u,v)=>flagTexel(Math.floor(4+248*u),Math.floor(4+248*v));
  for(const centre of [.25,.75]){
    assert.equal(emblem(centre,centre),255);
    for(let i=0;i<10;i++){
      const theta=i*Math.PI/5;
      const value=emblem(centre+.042*Math.sin(theta)/.77,centre-.042*Math.cos(theta)/.51);
      assert.equal(value,i%2===0?255:0);
    }
  }
  assert.equal(emblem(.25,.75),0);
  assert.equal(emblem(.75,.25),0);
  assert.ok(flagTexel(260+2,128)<flagTexel(260+12,128));
});
