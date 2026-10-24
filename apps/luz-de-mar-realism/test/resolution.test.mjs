import test from 'node:test';
import assert from 'node:assert/strict';
import {resolveResolution,resolutionLimits,storedResolutionMode} from '../src/resolution.js';
const input={zone:'machinery',width:960,height:640,dpr:2};

test('machinery sampling stays identical at 30/60/120 Hz and after long stalls',()=>{
 for(const mode of['sharp','performance']){
  const expected=resolveResolution({...input,mode});
  for(const hz of[30,60,120])for(let i=0;i<hz*30;i++){
   assert.deepEqual(resolveResolution({...input,mode,moving:i%2===0,quality:.55}),expected);
  }
  assert.deepEqual(resolveResolution({...input,mode,moving:true,quality:.01}),expected);
 }
 assert.deepEqual(resolveResolution(input).canvas,[1920,1280]);
});

test('performance has one strict pixel budget, including large displays below DPR .5',()=>{
 for(const [width,height,dpr]of[[960,640,2],[1920,1080,1],[1920,1080,2],[3840,2160,2],[7680,4320,2],[390,844,3],[844,390,3]]){
  const request={...input,width,height,dpr};
  const sharp=resolveResolution(request),performance=resolveResolution({...request,mode:'performance'});
  assert.deepEqual(sharp.canvas,[width*Math.min(dpr,2),height*Math.min(dpr,2)]);
  assert.ok(performance.canvas[0]*performance.canvas[1]<=1500000);
  assert.ok(performance.effectiveDPR<=Math.min(1,dpr));
  assert.deepEqual(resolveResolution({...request,mode:'performance',moving:true,quality:.55}),performance);
 }
});

test('diagnostic fixed DPR takes priority; clearing it restores the selected policy',()=>{
 for(const mode of['sharp','performance'])for(const fixedRatio of[.5,1,2]){
  const r=resolveResolution({...input,mode,fixedRatio,moving:true,quality:.55});
  assert.equal(r.source,'fixed');assert.equal(r.effectiveDPR,fixedRatio);
 }
 assert.equal(resolveResolution({...input,mode:'performance',fixedRatio:null}).effectiveDPR,1);
});

test('hardware limits preserve aspect and bound every render path',()=>{
 const limits={width:1024,height:512};
 for(const request of[{},{mode:'performance'},{fixedRatio:2},{zone:'saloon',moving:true}]){
  const r=resolveResolution({...input,...request,limits});
  assert.ok(r.canvas[0]<=1024&&r.canvas[1]<=512);
  assert.equal(r.effectiveDPR,.8);
  assert.equal(r.hardwareLimited,true);
 }
 const gl={MAX_RENDERBUFFER_SIZE:1,MAX_TEXTURE_SIZE:2,MAX_VIEWPORT_DIMS:3,getParameter:k=>({1:8192,2:4096,3:[2048,8192]})[k]};
 assert.deepEqual(resolutionLimits(gl),{width:2048,height:4096});
});

test('other rooms retain their former adaptive sampling; storage failures default to sharp',()=>{
 const r=resolveResolution({...input,zone:'saloon',moving:true,quality:.55});
 assert.equal(r.mode,'adaptive');assert.equal(r.effectiveDPR,.8593750000000001);
 assert.equal(resolveResolution({...input,zone:'saloon',moving:false}).effectiveDPR,2);
 assert.equal(resolveResolution({...input,zone:'saloon',dpr:.25,moving:false}).effectiveDPR,.5);
 assert.equal(storedResolutionMode({getItem:()=> 'performance'}),'performance');
 assert.equal(storedResolutionMode({getItem:()=> 'unknown'}),'sharp');
 assert.equal(storedResolutionMode({getItem(){throw Error('blocked');}}),'sharp');
 assert.equal(storedResolutionMode(undefined),'sharp');
});
