import test from 'node:test';
import assert from 'node:assert/strict';
import { TouchLookFilter, createTouchLook, TOUCH_LOOK_GAIN } from '../site/tidewater-rocha/mobile/touch-look.js';

const rates = [30, 60, 120, 240];
const degrees = pixels => pixels * TOUCH_LOOK_GAIN * .0022 * 180 / Math.PI;

test('stationary-finger noise stays still at different sample rates', () => {
  for (const hz of rates) {
    const f = new TouchLookFilter(); f.begin(210, 180, 0);
    for (let i = 1; i <= hz * 10; i++) {
      // Bounded synthetic centroid jitter, including reversals on both axes.
      assert.deepEqual(f.move(210 + 1.2*Math.sin(i*1.7), 180 + .8*Math.sin(i*2.3), i*1000/hz), {x:0,y:0});
    }
  }
});

test('slow subpixel movements accumulate, and the hysteresis boundary has no jump', () => {
  for (const hz of rates) {
    const f = new TouchLookFilter(); f.begin(0,0,0);
    let x = 0;
    for (let i = 1; i <= hz*3; i++) {
      const d = f.move(i*12/hz, 0, i*1000/hz);
      assert.ok(d.x >= 0 && d.x < 1.1*12/hz);
      assert.equal(d.y,0);
      x += d.x;
    }
    assert.ok(x > 33 && x < 36, 'A slow 36px drag must not disappear: '+x);
  }
});

test('a fast 180px swipe stays responsive and sample-rate independent', () => {
  const turns = [];
  for (const hz of rates) {
    const f = new TouchLookFilter(); f.begin(0,0,0);
    let x = 0;
    for (let i = 1; i <= hz*.2; i++) x += f.move(900*i/hz,0,1000*i/hz).x;
    const turn = degrees(x); turns.push(turn);
    assert.ok(turn > 85 && turn < 91, 'Responsive quarter turn: '+turn);
    assert.ok((180-x)/900 < .01, 'Filter plus spatial margin must lag less than 10ms on this trace');
  }
  assert.ok(Math.max(...turns)-Math.min(...turns) < .2);
  console.log('Fast swipe angles at 30/60/120/240 Hz:',turns.map(x=>x.toFixed(2)));
});

test('stopping after a turn settles without persistent shaking or drift', () => {
  for (const hz of rates) {
    const f = new TouchLookFilter(); f.begin(0,0,0);
    let x = 0, y = 0;
    for (let i = 1; i <= hz*.2; i++) x += f.move(900*i/hz,0,1000*i/hz).x;
    const held = [];
    for (let i = 1; i <= hz*5; i++) {
      const d = f.move(180+Math.sin(i*1.7),.5*Math.sin(i*2.3),200+i*1000/hz);
      x+=d.x; y+=d.y;
      if (i>hz*.15) held.push([x,y]);
    }
    for (const axis of [0,1]) {
      const positions=held.map(p=>p[axis]);
      assert.ok(Math.max(...positions)-Math.min(...positions)<.05);
    }
  }
});

test('diagonal filtering is rotationally symmetric and reversed movement remains possible', () => {
  const a=new TouchLookFilter(), b=new TouchLookFilter(); a.begin(0,0,0); b.begin(0,0,0);
  let forward=0, reverse=0;
  for (let i=1;i<=120;i++) {
    const x=i<=60?i*2:240-i*2;
    const d=a.move(x,0,i*1000/120), r=b.move(x/Math.SQRT2,x/Math.SQRT2,i*1000/120);
    assert.ok(Math.abs(r.x-d.x/Math.SQRT2)<1e-9 && Math.abs(r.y-r.x)<1e-9);
    if(i<=60)forward+=d.x; else reverse+=d.x;
  }
  assert.ok(forward>110 && reverse<-105);
});

test('bad or duplicate timestamps do not poison the next gesture', () => {
  const f=new TouchLookFilter(); f.begin(0,0,100);
  for (const sample of [[100,0,100],[100,0,99],[Infinity,0,101],[0,0,NaN]]) {
    assert.deepEqual(f.move(...sample),{x:0,y:0});
  }
  assert.ok(f.move(20,0,120).x>0);
  f.reset(); assert.deepEqual(f.move(500,0,130),{x:0,y:0});
  f.begin(500,300,140); assert.deepEqual(f.move(500.2,300.1,150),{x:0,y:0});
});

test('the camera owns one touch, consumes coalesced samples once, and resets on cancellation', () => {
  const handlers = new Map(), captures = new Set();
  const canvas = {
    setPointerCapture:id=>captures.add(id), hasPointerCapture:id=>captures.has(id),
    releasePointerCapture:id=>captures.delete(id),
  };
  const look={x:0,y:0};
  const walk={active:true, app:{engine:{domElement:canvas}, input:{look}}};
  const controls={walk,open:false,listen:(_,type,fn)=>handlers.set(type,fn)};
  const controller=createTouchLook(controls);
  const send=(type,id,x,y,time,extra={})=>handlers.get(type)({pointerId:id,pointerType:'touch',clientX:x,clientY:y,timeStamp:time,preventDefault(){},...extra});
  send('pointerdown',1,0,0,0,{pointerType:'mouse'});
  send('pointermove',1,80,0,16); assert.equal(look.x,0);
  send('pointerdown',2,200,200,100);
  send('pointerdown',3,0,0,101); send('pointermove',3,100,0,116); assert.equal(look.x,0);
  const samples=[{clientX:205,clientY:200,timeStamp:108},{clientX:210,clientY:200,timeStamp:116}];
  send('pointermove',2,210,200,116,{getCoalescedEvents:()=>samples});
  const reference=new TouchLookFilter(); reference.begin(200,200,100);
  const expected=samples.reduce((sum,s)=>sum+reference.move(s.clientX,s.clientY,s.timeStamp).x*TOUCH_LOOK_GAIN,0);
  assert.equal(look.x,expected);
  send('pointermove',2,210,200,116); assert.equal(look.x,expected);
  send('pointercancel',2,210,200,117);
  send('pointermove',2,400,200,132); assert.equal(look.x,expected);
  assert.equal(captures.size,0);
  send('pointerdown',4,600,400,150); send('pointermove',4,600,400,166); assert.equal(look.x,expected);
  controller.reset(); assert.equal(walk.drag,null); assert.equal(captures.size,0);
  send('pointermove',4,800,400,180); assert.equal(look.x,expected);
  send('pointerdown',5,500,400,200);
  send('lostpointercapture',5,500,400,210);
  send('pointermove',5,800,400,220); assert.equal(look.x,expected);
});
