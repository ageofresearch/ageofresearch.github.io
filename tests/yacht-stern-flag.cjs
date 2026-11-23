const assert = require('node:assert/strict');

// Compare a real scissored frame with a fresh full draw at the same wind phase.
// The copyable offscreen texture supplies the same capabilities as the canvas.
module.exports = async function checkFlagMotion(frame) {
  const measurements = await frame.evaluate(async () => {
    const app = __app, walk = app.yachtWalk, nav = walk.nav, renderer = app.gangwayRenderer;
    const engine = app.engine, gpu = app.gpu, device = gpu.device;
    const {width,height} = engine;
    const stride = Math.ceil(width*4/256)*256;
    const image = device.createTexture({size:[width,height],format:gpu.format,
      usage:GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.COPY_SRC|GPUTextureUsage.COPY_DST});
    const readback = device.createBuffer({size:height*stride,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ});
    const original = app.frame, surface = engine.currentTexture;
    const proto = GPURenderPassEncoder.prototype, setScissor = proto.setScissorRect;
    let patches = 0;
    async function read() {
      const encoder = device.createCommandEncoder();
      encoder.copyTextureToBuffer({texture:image},{buffer:readback,bytesPerRow:stride},[width,height]);
      device.queue.submit([encoder.finish()]);
      await readback.mapAsync(GPUMapMode.READ);
      const bytes = new Uint8Array(readback.getMappedRange()).slice();
      readback.unmap();
      return bytes;
    }
    const views = [];
    try {
      app.frame = () => {};
      engine.currentTexture = () => image;
      proto.setScissorRect = function (...rect) { patches++; return setScissor.apply(this,rect); };
      for (const x of [14.8,17.4,4.55]) {
        walk.enterRoom(x>10?'UD_R02':'UD_R01');
        nav.position = [x,x>10?0:.4];
        nav.elevation = walk.cameraElevation = 6;
        walk.applyPosition();
        const group = walk.model.group, basis = group.userData.yacht;
        const d = app.camera.position.clone();
        if (x>10) {
          d.set(0,0,-1).applyQuaternion(group.quaternion);
          walk.pitch = -.2;
        } else {
          d.set(.398*basis.sy,7.18-basis.seaReference,3.19*basis.sx-basis.length/2);
          group.localToWorld(d).sub(app.camera.position).normalize();
          walk.pitch = Math.asin(d.y);
        }
        walk.yaw = Math.atan2(-d.x,-d.z);
        original.call(app,0);
        await renderer.prepareCurrentView();
        let compared = 0, changed = 0, previous;
        for (let tick=0;tick<45 && compared<4;tick++) {
          const before = patches;
          original.call(app,1/24);
          await gpu.queue.onSubmittedWorkDone();
          if (before===patches) continue;
          const partial = await read();
          original.call(app,0);
          const full = await read();
          for (let i=0;i<full.length;i++) {
            if (partial[i]!==full[i]) throw Error('Changed yacht sample at '+x+', byte '+i);
            if (previous && full[i]!==previous[i]) changed++;
          }
          previous = full;
          compared++;
        }
        views.push({x,compared,changed});
      }
    } finally {
      proto.setScissorRect = setScissor;
      app.frame = original;
      engine.currentTexture = surface;
      image.destroy();
      readback.destroy();
      walk.enterRoom('boarding');
    }
    return views;
  });
  for (const view of measurements) {
    assert.equal(view.compared,4,'Expected a partial redraw at '+view.x);
    assert.ok(view.changed>0,'The visible flag must keep moving at '+view.x);
  }
};
