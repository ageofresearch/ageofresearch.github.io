const assert = require('node:assert/strict');

// Real simultaneous touch events enter through the iframe, NippleJS, then native walking.
module.exports = async function exerciseJoystick(page, frame, out) {
  await frame.locator('.luz-stick .front').waitFor();
  assert.equal(await frame.locator('[data-key]').count(), 0);
  const cdp = await page.context().newCDPSession(page);
  const box = await frame.locator('.luz-stick').boundingBox();
  const center = {x: box.x + box.width / 2, y: box.y + box.height / 2};
  const finger = (id, x, y) => ({id, x, y, radiusX:4, radiusY:4, force:1});
  const left = (x=0,y=0) => finger(1, center.x+x, center.y+y);
  const touch = async (type, touchPoints) => {
    await cdp.send('Input.dispatchTouchEvent', {type,touchPoints});
    // Chromium coalesces pointermove until the next animation frame.
    await frame.evaluate(() => new Promise(resolve => requestAnimationFrame(resolve)));
  };
  const vector = () => frame.evaluate(() => ({...window.__app.yachtWalk.touchMove}));
  const neutral = async () => assert.deepEqual(await vector(), {x:0,y:0});
  await frame.evaluate(() => {
    const walk=window.__app.yachtWalk;
    window.__joystickTest={update:walk.update, yaw:walk.yaw, pitch:walk.pitch};
    walk.update=()=>{}; // deterministic physics; the real render loop keeps running
  });
  const resetPose = () => frame.evaluate(() => {
    const w=window.__app.yachtWalk;
    w.controls.clearInput(); w.enterRoom('boarding');
    w.yaw=window.__joystickTest.yaw; w.pitch=window.__joystickTest.pitch;
  });
  const advance = () => frame.evaluate(() => {
    const w=window.__app.yachtWalk, before=w.nav.position.slice();
    for(let i=0;i<5;i++)window.__joystickTest.update.call(w,.1);
    return Math.hypot(w.nav.position[0]-before[0],w.nav.position[1]-before[1]);
  });
  try {
    await touch('touchStart',[left()]);
    await touch('touchMove',[left(2,-2)]);
    await neutral();
    assert.equal(await advance(),0,'Rest area must prevent creeping');
    await touch('touchMove',[left(0,-28)]);
    const half=await vector();
    assert.ok(half.y>.4 && half.y<.5,JSON.stringify(half));
    const slow=await advance();
    await touch('touchEnd',[]);
    await neutral();
    assert.equal(await advance(),0,'Release must stop walking');
    await resetPose();
    await touch('touchStart',[left()]);
    await touch('touchMove',[left(0,-56)]);
    const fast=await advance();
    assert.ok(slow>.03 && fast>slow*1.8 && fast<slow*2.8,JSON.stringify({slow,fast}));
    await touch('touchMove',[left(48,-48)]);
    const diagonal=await vector();
    assert.ok(diagonal.x>.5 && diagonal.y>.5,JSON.stringify(diagonal));
    assert.ok(Math.hypot(diagonal.x,diagonal.y)<=1.000001,'Diagonal movement has a speed cap');
    await touch('touchMove',[left(-40,20)]);
    const reverse=await vector();
    assert.ok(reverse.x<0 && reverse.y<0,'Left and back use continuous signed axes: '+JSON.stringify(reverse));
    const yaw=await frame.evaluate(()=>window.__app.yachtWalk.yaw);
    await touch('touchMove',[left(0,-56)]);
    await touch('touchStart',[left(0,-56),finger(2,165,240)]);
    await touch('touchMove',[left(0,-56),finger(2,345,230)]);
    await advance();
    const turn=Math.abs(await frame.evaluate(()=>window.__app.yachtWalk.yaw)-yaw)*180/Math.PI;
    assert.ok(turn>81 && turn<99,'A 180px right-finger swipe must turn about 90 degrees while walking: '+turn);
    console.log('Touch camera: 180px swipe turned',turn,'degrees');
    assert.ok((await vector()).y>.95,'Looking must not cancel walking');
    await page.screenshot({path:out+'/joystick-multitouch.png'});
    await touch('touchCancel',[]);
    await neutral();
    await touch('touchStart',[left()]);
    await touch('touchMove',[left(0,-56)]);
    await frame.evaluate(()=>window.dispatchEvent(new Event('blur')));
    await neutral();
    await touch('touchMove',[left(0,-50)]);
    await neutral();
    await touch('touchEnd',[]);
    await touch('touchStart',[left()]);
    await touch('touchMove',[left(0,-56)]);
    await frame.evaluate(()=>window.__app.yachtWalk.controls.openMenu());
    await neutral();
    await touch('touchEnd',[]);
    await frame.evaluate(()=>window.__app.yachtWalk.controls.closeMenu({focus:false}));
    await resetPose();
    // Native keyboard input still uses the same walk speed and collision path.
    await frame.evaluate(()=>window.__app.input.keys.add('KeyW'));
    assert.ok(await advance()>.03);
    console.log('Joystick: dead zone, proportional speed, all directions, simultaneous look, release/cancel, blur, menu and keyboard passed', {slow,fast});
  } finally {
    await resetPose();
    await frame.evaluate(()=>{
      window.__app.yachtWalk.update=window.__joystickTest.update;
      delete window.__joystickTest;
    });
    await cdp.detach();
  }
};
