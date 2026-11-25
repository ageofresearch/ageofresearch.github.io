const assert = require('node:assert/strict');
const { writeFileSync } = require('node:fs');
const { PNG } = require('pngjs');
const { size, views, sleeve } = require('./fixtures/yacht-gangway-vr-steel.json');

module.exports = async (page, frame, out, readFrame) => {
  const finishBytes = await frame.evaluate(() => __app.entranceYacht.stats.finishTextureBytes);
  assert.ok(finishBytes <= 3600000);
  async function capture(pose, dimensions) {
    await page.setViewportSize({ width: dimensions[0], height: dimensions[1] });
    await frame.waitForFunction(([w, h]) => __app.engine.width === w && __app.engine.height === h, dimensions);
    await frame.evaluate(({ xyz, target, roll, fov }) => {
      const app = __app, walk = app.yachtWalk, camera = app.camera;
      const group = walk.model.group, basis = group.userData.yacht;
      const world = ([x, y, z]) => group.localToWorld(camera.position.clone()
        .set(y * basis.sy, z - basis.seaReference, x * basis.sx - basis.length / 2));
      const position = world(xyz), direction = world(target).sub(position).normalize();
      const yaw = Math.atan2(-direction.x, -direction.z), pitch = Math.asin(direction.y);
      walk.enterRoom('swim-platform');
      walk.update = () => {
        camera.position.copy(position);
        camera.rotation.set(pitch, yaw, roll, 'YXZ');
      };
      walk.update();
      camera.fov = fov;
      camera.updateProjectionMatrix();
      app.daylight.set(174.31892336154965, 27.063938270393358, false);
    }, pose);
    const shot = await readFrame();
    const { width, height, pixels } = shot;
    assert.deepEqual([width, height], dimensions);
    assert.deepEqual(shot.passLabels, ['Gangway to screen']);
    assert.equal(shot.indexedDraws, 2);
    assert.ok(shot.indexedTriangles <= 25000);
    const image = new PNG({ width, height });
    image.data = Buffer.from(pixels, 'base64');
    return image;
  }
  for (const [view, { pose, near, far }] of Object.entries(views)) {
    const image = await capture(pose, size);
    for (const [side, samples, limit] of [['near', near, 40], ['far', far, 48]]) {
      let error = 0;
      for (const [photoX, photoY, expected, x = photoX, y = photoY] of samples) {
        const i = (y * image.width + x) * 4;
        const actual = .2126 * image.data[i] + .7152 * image.data[i + 1] + .0722 * image.data[i + 2];
        error += Math.abs(actual - expected);
      }
      const mean = error / samples.length;
      assert.ok(mean < limit, `${view} ${side}: mean luma deviation ${mean.toFixed(1)} / 255`);
      console.log(`${view} ${side}: mean luma deviation ${mean.toFixed(1)} / 255`);
    }
    writeFileSync(`${out}/steel-mobile-${view}.png`, PNG.sync.write(image));
  }
  const image = await capture(sleeve.pose, sleeve.size);
  for (const [label, samples, limit] of [['cheek', sleeve.cheek, 43], ['guide', sleeve.guide, 58], ['tip', sleeve.tipColor, 42]]) {
    let error = 0;
    for (const [x, y, ...expected] of samples) {
      const total = [0, 0, 0];
      for (let dy = -3; dy <= 3; dy++) for (let dx = -3; dx <= 3; dx++) {
        const i = ((y + dy) * image.width + x + dx) * 4;
        for (let c = 0; c < 3; c++) total[c] += image.data[i + c];
      }
      for (let c = 0; c < 3; c++) error += Math.abs(total[c] / 49 - expected[c]);
    }
    const mean = error / (3 * samples.length);
    assert.ok(mean < limit, `${label}: mean RGB deviation ${mean.toFixed(1)} / 255`);
    console.log(`${label}: mean RGB deviation ${mean.toFixed(1)} / 255`);
  }
  writeFileSync(`${out}/steel-mobile-sleeve.png`, PNG.sync.write(image));
};
