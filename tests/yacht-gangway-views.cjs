const { PNG } = require('pngjs');
const { writeFileSync } = require('node:fs');
const assert = require('node:assert/strict');
module.exports = async (frame, out, readFrame, mobile) => {
  const saved = await frame.evaluate(() => {
    const w = __app.yachtWalk;
    return {
      position: w.nav.position.slice(),
      deck: w.nav.deck,
      elevation: w.nav.elevation,
      yaw: w.yaw,
      pitch: w.pitch,
    };
  });
  const views = [
    ['panel-1', -3.3, 0.7],
    ['panel-2', -2.6, 0.7],
    ['panel-3', 1.25, 0.7],
    ['joint-1', -3.29, 0.4],
    ['joint-2', -1.57, 0.4],
    ['forward', -4.1, 5.5],
    ['return', 1.8, -6],
    ['grain-close', -3.3, 0.15, 0.45],
  ];
  const rows = [];
  for (const [name, x, forward, eye = 1.6] of views.filter(
    ([name]) => !process.env.YACHT_VIEWS || process.env.YACHT_VIEWS.split(',').includes(name),
  )) {
    await frame.evaluate(
      ({ x, forward, eye }) => {
        const a = __app,
          w = a.yachtWalk,
          n = w.nav,
          b = w.model.group.userData.yacht;
        w.enterRoom('boarding');
        n.deck = 'MD';
        n.position = [x, w.model.boarding.y];
        n.stair = null;
        n.elevation = w.model.boarding.height(x);
        w.cameraElevation = n.elevation + eye - 1.6;
        w.applyPosition();
        // applyPosition restores the visitor's standard eye height. A close-up
        // uses its own source-space camera after that normal navigation update.
        const eyePosition = a.camera.position
          .clone()
          .set(w.model.boarding.y * b.sy, n.elevation + eye - b.seaReference, x * b.sx - b.length / 2);
        w.model.group.localToWorld(eyePosition);
        a.camera.position.copy(eyePosition);
        const target = a.camera.position
          .clone()
          .set(
            w.model.boarding.y * b.sy,
            w.model.boarding.height(x + forward) - b.seaReference,
            (x + forward) * b.sx - b.length / 2,
          );
        const d = w.model.group.localToWorld(target).sub(a.camera.position).normalize();
        w.yaw = Math.atan2(-d.x, -d.z);
        w.pitch = Math.asin(d.y);
        if (eye !== 1.6) {
          // Inspection only: prevent normal eye-height easing from raising
          // the close-up camera during the sixteen unchanged readback frames.
          const position = a.camera.position.clone(),
            yaw = w.yaw,
            pitch = w.pitch;
          w.__teakUpdate = w.update;
          w.update = () => {
            a.camera.position.copy(position);
            a.camera.rotation.set(pitch, yaw, 0, 'YXZ');
          };
          w.update();
        }
      },
      { x, forward, eye },
    );
    const shot = await readFrame(),
      png = new PNG({ width: shot.width, height: shot.height });
    png.data = Buffer.from(shot.pixels, 'base64');
    writeFileSync(out + `/teak-${mobile ? 'mobile' : 'full'}-${name}.png`, PNG.sync.write(png));
    if (name === 'panel-2' && !process.env.YACHT_REFERENCE) {
      const samples = await frame.evaluate(() => {
        const a = __app,
          w = a.yachtWalk,
          b = w.model.group.userData.yacht;
        const project = (y) => {
          const x = -1.95,
            p = a.camera.position
              .clone()
              .set(y * b.sy, w.model.boarding.height(x) - b.seaReference, x * b.sx - b.length / 2);
          w.model.group.localToWorld(p).project(a.camera);
          return [(p.x * 0.5 + 0.5) * a.engine.width, (0.5 - p.y * 0.5) * a.engine.height];
        };
        const wood = (0.764 - 6 * 0.004) / 7,
          pitch = wood + 0.004;
        return Array.from({ length: 6 }, (_, i) => {
          const joint = 2.718 + (i + 1) * pitch - 0.002;
          // Sample both shoulders of this seam, within the same local light.
          return {joint: project(joint), wood: [-.16, -.12, .12, .16].map(offset => project(joint + offset*pitch))};
        });
      });
      const luma = (x, y) => {
        const i = (Math.round(y) * png.width + Math.round(x)) * 4;
        return 0.2126 * png.data[i] + 0.7152 * png.data[i + 1] + 0.0722 * png.data[i + 2];
      };
      for (const [i, sample] of samples.entries()) {
        const [x, y] = sample.joint;
        assert.ok(x > 2 && x < png.width - 2 && y > 2 && y < png.height - 2, 'Caulking probe outside frame');
        const darkest = Math.min(...[-1, 0, 1].flatMap((dx) => [-1, 0, 1].map((dy) => luma(x + dx, y + dy))));
        const wood = sample.wood.map(([wx, wy]) => luma(wx, wy)).sort((a,b) => a-b);
        const localWood = (wood[1] + wood[2]) / 2;
        assert.ok(darkest < localWood * 0.8, `Rendered caulk seam ${i + 1} disappeared`);
      }
    }
    const actualEye = await frame.evaluate(() => {
      const w = __app.yachtWalk,
        p = w.model.group.worldToLocal(__app.camera.position.clone());
      return p.y + w.model.group.userData.yacht.seaReference - w.nav.elevation;
    });
    assert.ok(Math.abs(actualEye - eye) < 1e-6, `${name}: inspection eye height changed`);
    if (mobile) {
      assert.equal(shot.indexedDraws, 2);
      assert.deepEqual(shot.passLabels, ['Gangway to screen']);
      assert.ok(shot.indexedTriangles <= 25000);
    }
    rows.push({ name, draws: shot.indexedDraws, triangles: shot.indexedTriangles });
    await frame.evaluate(() => {
      const w = __app.yachtWalk;
      if (w.__teakUpdate) {
        w.update = w.__teakUpdate;
        delete w.__teakUpdate;
      }
    });
  }
  await frame.evaluate((saved) => {
    const w = __app.yachtWalk;
    Object.assign(w.nav, {
      deck: saved.deck,
      position: saved.position,
      elevation: saved.elevation,
      stair: null,
    });
    w.cameraElevation = saved.elevation;
    w.yaw = saved.yaw;
    w.pitch = saved.pitch;
    w.applyPosition();
  }, saved);
  return rows;
};
