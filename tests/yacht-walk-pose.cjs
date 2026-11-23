const assert = require('node:assert/strict');

// Use the same yacht-local directions in both renderers, regardless of berth yaw.
module.exports = async function verifyWalkPose(frame) {
  const cases = await frame.evaluate(() => {
    const app = window.__app, walk = app.yachtWalk;
    const panel = document.querySelector('.yacht-pose');
    const read = () => Array.from(panel.children, row => row.textContent);
    const results = [];
    walk.enterRoom('boarding');
    for (const [x, y, z] of [[0, 0, 1], [-1, 1, 0], [0, -1, -1], [1, 0, 0]]) {
      const direction = app.camera.position.clone().set(x, y, z).normalize().applyQuaternion(walk.model.group.quaternion);
      walk.yaw = Math.atan2(-direction.x, -direction.z);
      walk.pitch = Math.asin(direction.y);
      app.frame(0);
      results.push(read());
    }
    const observer = new MutationObserver(() => {});
    observer.observe(panel, {childList:true, subtree:true, characterData:true, attributes:true});
    app.frame(0);
    const stable = observer.takeRecords().length === 0;
    observer.disconnect();
    const stairs = [];
    walk.enterRoom('MD_R01');
    const nav = walk.nav;
    for (const [x, y] of [[7.4,-1.6], [7.4,-2.5], [6.6,-3.1], [4,-3.03], [2.7,-3.03], [1.5,-3.03], [2.2,-3.03]]) {
      nav.move(x - nav.position[0], y - nav.position[1]);
      app.frame(1/60);
      if (nav.stair) {
        const group = walk.model.group;
        const eye = group.worldToLocal(app.camera.position.clone()).y + group.userData.yacht.seaReference;
        stairs.push({feet:nav.elevation, eye, label:read()[1]});
      }
    }
    walk.enterRoom('boarding');
    app.frame(0);
    return {results, stable, stairs};
  });
  const views = cases.results;
  for (const row of views) assert.deepEqual(row.slice(0, 2), views[0].slice(0, 2));
  assert.deepEqual(views.map(row => row[2]), ['Rumbo 0,0° · Proa', 'Rumbo 90,0° · Estribor',
    'Rumbo 180,0° · Popa', 'Rumbo 270,0° · Babor']);
  assert.deepEqual(views.map(row => row[3]), ['Inclinación 0,0°', 'Inclinación 45,0°', 'Inclinación -45,0°', 'Inclinación 0,0°']);
  const format = value => value.toFixed(3).replace('.', ',');
  assert.ok(cases.stairs.length >= 2);
  assert.ok(cases.stairs.some(s => Math.abs(s.eye - s.feet - 1.6) > .02));
  for (const s of cases.stairs) assert.equal(s.label, 'Z pies ' + format(s.feet) + '   Z cámara ' + format(s.eye));
  assert.ok(cases.stable, 'Stationary frames must leave the readout untouched');
};
