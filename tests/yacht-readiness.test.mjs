import test from 'node:test';
import assert from 'node:assert/strict';
import {preloadYachtExteriors} from '../site/tidewater-rocha/mobile/scene-readiness.js';
import {distanceToFootprint,indexFootprints} from '../site/tidewater-rocha/mobile/terrace-geometry.js';

test('exterior preparation awaits both models and leaves inspection fetchers unchanged',async()=>{
  let finish;const pending=new Promise(resolve=>{finish=resolve;});let settled=false;
  const fetcher=async()=>pending;
  const controller=()=>({fetcher,state:'idle',async loadExterior(){
    this.state='loading';await this.fetcher('exterior');this.state='ready';
  },loadInspection(){assert.fail('Walking must not prepare inspection animations');}});
  const model={mtu:controller(),strainers:controller()};
  const preparation=preloadYachtExteriors(model).then(()=>{settled=true;});
  await Promise.resolve();assert.equal(settled,false);assert.equal(model.mtu.state,'loading');
  finish();await preparation;
  for(const c of [model.mtu,model.strainers]){assert.equal(c.state,'ready');assert.equal(c.fetcher,fetcher);}
});

test('optional exterior requests are aborted on timeout without hanging scene readiness',async()=>{
  let aborted=false;
  const fetcher=(_url,{signal})=>new Promise((_resolve,reject)=>{
    signal.addEventListener('abort',()=>{aborted=true;reject(Error('Aborted'));},{once:true});
  });
  const controller={fetcher,async loadExterior(){
    try{await this.fetcher('exterior');}catch{this.fallback=true;return false;}
  }};
  await preloadYachtExteriors({mtu:controller},{timeoutMs:10});
  assert.equal(aborted,true);assert.equal(controller.fallback,true);assert.equal(controller.fetcher,fetcher);
});

test('spatial support retains gaps, negative cell boundaries and the exact joint allowance',()=>{
  const left=[[-1,-1],[-.5,-1],[-.5,1],[-1,1]],right=[[.5,-1],[1,-1],[1,1],[.5,1]];
  const hit=indexFootprints([left,right].map(polygon=>({polygon})));
  assert.equal(hit(0,0,.14),false,'No hull may bridge disconnected surfaces');
  for(const x of [-.5,.5])assert.equal(hit(x,0,0),true);
  assert.equal(hit(-.4921,0,.008),true);assert.equal(hit(-.4919,0,.008),false);
  assert.equal(distanceToFootprint(-.75,0,left),0);
  assert.equal(distanceToFootprint(0,0,right),.5);
  assert.ok(Math.abs(distanceToFootprint(2,2,right)-Math.SQRT2)<1e-12);
  const repeated=[[-1,-1],[-1,-1],[-.5,-1],[-.5,1],[-1,1]];
  assert.equal(distanceToFootprint(0,0,repeated),.5,'A repeated endpoint cannot introduce NaN');
});
