const assert = require('node:assert/strict');

module.exports = async function mainDeckMotion(frame, guestDescent = false) {
  // Replay identical poses through the production frame loop and through its
  // all-direction draw. Read an entire sequence after submitting the last turn
  // so a readback cannot hide a stale visibility list on the following frame.
  const stations = [
    ['MD_R10', 7.8, 3.12], ['MD_R11', 7.8, -3.32],
    ['MD_R01', 6.68, -.48], ['MD_R02', 8.5, .1], ['MD_R02', 15.7, -1.8],
    ['MD_R02', 17.15, -1.42], ['MD_R07', 18.5, 1.35],
    ['MD_R10', 18.2, 3.4], ['MD_R11', 18.2, -3.4], ['MD_R08', 20.54, 1.97],
    ['MD_R09', 21.6, .88], ['MD_R03', 21.2, -.18], ['MD_R06', 21.46, -2.39],
    ['MD_R04', 25.76, -1.4], ['MD_R05', 27.75, 1.5], ['MD_R12', 27.9, -1.9],
  ];
  const summary = {frames:0, maxChangedPixels:0, widestRun:0};
  // Descend through both profile transitions, looking down, across and back
  // from each actual tread. Keep the same support and eye in the control draw.
  const route = guestDescent ? Array.from({length:15}, (_, i) => [i === 0 ? 'MD_R02' : 'LD_R11', 0, 0, 14-i]) : stations;
  for (const station of route) {
    const differences = await frame.evaluate(async ([room, x, y, step]) => {
      const a = __app, w = a.yachtWalk, n = w.nav, r = a.gangwayRenderer;
      const {width, height} = a.engine, stride = Math.ceil(width * 4 / 256) * 256;
      const poses = [[-.028,0,-.32],[-.009,.01,-.31],[.009,.02,-.30],[.028,.03,-.29],
        [.009,1.52,-.08],[-.009,3.11,.08],[-.028,3.12,.31],[0,4.70,-.1],[.015,6.23,-.3]];
      w.enterRoom(room);
      const flight = n.stairFlights.get('guest');
      const onStair = step > 0 && step < 14;
      const profile = step !== undefined && step < 14 ? 'guest' : 'main';
      if (step !== undefined) {
        const points = flight.surfaces[step].polygons.flat();
        [x,y] = [0,1].map(k => (Math.min(...points.map(p=>p[k])) + Math.max(...points.map(p=>p[k]))) / 2);
      }
      const device = a.gpu.device;
      const texture = device.createTexture({size:[width,height],format:a.gpu.format,
        usage:GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.COPY_SRC});
      const bytes = height * stride * poses.length;
      const buffers = [0,1].map(() => device.createBuffer({size:bytes,usage:GPUBufferUsage.COPY_DST | GPUBufferUsage.MAP_READ}));
      const update = a.frame, render = r.render, currentTexture = a.engine.currentTexture;
      try {
        a.engine.currentTexture = () => texture;
        for (const [control, buffer] of buffers.entries()) {
          let pose = 0;
          await new Promise((resolve,reject) => {
            a.frame = function() {
              try {
                const [dx,yaw,pitch] = poses[pose];
                n.position = [x+dx,y]; n.stair = onStair ? {route:flight.route, surfaceIndex:step, d:0} : null;
                n.deck = profile === 'guest' ? 'LD' : 'MD';
                n.elevation = step === undefined ? 3.95 : flight.surfaces[step].height;
                w.cameraElevation = n.elevation; w.applyPosition(); w.yaw = yaw; w.pitch = pitch;
                if (control) r.render = function() {
                  const p = w.model.guestAccess.profiles[profile];
                  const eye = w.model.boarding.group.worldToLocal(a.camera.position.clone());
                  const {start,step,lateralBands=0} = p.visibility;
                  const width = lateralBands || p.batches[0].ranges.length;
                  const band = Math.min(width-1,Math.max(0,Math.floor((eye.z-start)/step))) + (eye.x>0?lateralBands:0);
                  return render.call(r,profile,null,band);
                };
                update.call(a,0);
                r.render = render;
                if (r.activeProfile !== profile) throw Error('Unexpected walk profile at '+[room,step]);
                const encoder = device.createCommandEncoder();
                encoder.copyTextureToBuffer({texture},{buffer,offset:pose*height*stride,bytesPerRow:stride},[width,height]);
                device.queue.submit([encoder.finish()]);
                if (++pose === poses.length) { a.frame = update; resolve(); }
              } catch (e) { a.frame = update; r.render = render; reject(e); }
            };
          });
        }
        await Promise.all(buffers.map(b => b.mapAsync(GPUMapMode.READ)));
        const [actual,reference] = buffers.map(b => new Uint8Array(b.getMappedRange()));
        return poses.map((_,k) => {
          let changed = 0, widest = 0;
          for (let row=0; row<height; row++) {
            let run = 0, i = (k*height+row)*stride;
            for (let col=0; col<width; col++,i+=4) {
              if (Math.abs(actual[i]-reference[i])>8 || Math.abs(actual[i+1]-reference[i+1])>8 ||
                  Math.abs(actual[i+2]-reference[i+2])>8) {
                changed++; widest = Math.max(widest,++run);
              } else run = 0;
            }
          }
          return {changed,widest,fraction:changed/(width*height)};
        });
      } finally {
        a.frame = update; r.render = render;
        a.engine.currentTexture = currentTexture;
        for (const buffer of buffers) buffer.destroy();
        texture.destroy();
      }
    }, station);
    for (const [index,diff] of differences.entries()) {
      summary.frames++;
      summary.maxChangedPixels = Math.max(summary.maxChangedPixels,diff.changed);
      summary.widestRun = Math.max(summary.widestRun,diff.widest);
      assert.ok(diff.fraction < .0005 && diff.widest < 8,
        'Visible surface lost during motion at '+station+' pose '+index+' '+JSON.stringify(diff));
    }
  }
  await frame.evaluate(() => __app.yachtWalk.enterRoom('boarding'));
  return summary;
};
