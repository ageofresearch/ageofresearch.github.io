// Run alone: the first passage and repeated returns in three fresh contexts.
const { chromium } = require('playwright-core');
const assert = require('node:assert/strict');
const { mkdirSync, writeFileSync } = require('node:fs');
const base = process.env.YACHT_BASE || 'http://127.0.0.1:8764/tidewater-rocha/';
const out = process.env.YACHT_OUTPUT || '/tmp/yacht-mobile-parity';
const summarize = (rows) => {
  const times = rows
    .map((r) => r.interval)
    .filter(Number.isFinite)
    .sort((a, b) => a - b);
  return {
    frames: rows.length,
    fps: (times.length * 1000) / times.reduce((a, b) => a + b, 0),
    p95: times[Math.floor(times.length * 0.95)],
    max: times.at(-1),
    over25ms: times.filter((t) => t > 25).length,
    over50ms: times.filter((t) => t > 50).length,
    maxMove: Math.max(...rows.map((r) => r.move)),
    maxCPU: Math.max(...rows.map((r) => r.cpu)),
  };
};
(async () => {
  const browser = await chromium.launch({
    ...(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : { channel: 'chrome' }),
    headless: true,
    args: [
      '--enable-unsafe-webgpu',
      '--enable-unsafe-swiftshader',
      '--use-angle=swiftshader',
      '--enable-features=Vulkan',
      '--use-vulkan=swiftshader',
      '--disable-vulkan-surface',
      '--disable-gpu-watchdog',
    ],
  });
  const runs = [];
  mkdirSync(out, { recursive: true });
  try {
    for (let run = 0; run < 3; run++) {
      const context = await browser.newContext({
        viewport: { width: 360, height: 540 },
        deviceScaleFactor: 1,
        hasTouch: true,
      });
      let release;
      try {
        await context.addInitScript(() => {
          window.__teakGPU = [];
          for (const name of [
            'createBuffer',
            'createTexture',
            'createShaderModule',
            'createRenderPipeline',
            'createRenderPipelineAsync',
            'createBindGroup',
          ]) {
            const original = GPUDevice.prototype[name];
            GPUDevice.prototype[name] = function (...args) {
              __teakGPU.push({ name, time: performance.now() });
              return original.apply(this, args);
            };
          }
        });
        const held = new Promise((resolve) => {
          release = resolve;
        });
        await context.route('**/bridge-access.bin?*', async (route) => {
          await held;
          await route.continue();
        });
        const page = await context.newPage(),
          errors = [];
        page.on('pageerror', (e) => errors.push(e.message));
        await page.goto(base + 'mobile.html', { waitUntil: 'domcontentloaded' });
        await page.locator('#yacht').contentFrame().locator('#app').waitFor({ timeout: 90000 });
        const frame = page.frames().find((f) => f.url().includes('play.html'));
        await frame.waitForFunction(
          () => window.__app?.entranceYacht?.bridgeAccessLoadState === 'loading',
          null,
          { timeout: 180000 },
        );
        assert.deepEqual(
          await frame.evaluate(() => ({
            status: __mapsPublicStatus.status,
            running: __app.engine._running === true,
          })),
          { status: 'starting', running: false },
        );
        release();
        await frame.waitForFunction(() => window.__mapsPublicStatus?.status === 'ready', null, {
          timeout: 180000,
        });
        const result = await frame.evaluate(async () => {
          const app = __app,
            w = app.yachtWalk,
            n = w.nav,
            rows = [];
          const path = [
            [-4.3, 3.1],
            [-3.6, 2.95],
            [-2, 3.25],
            [-0.8, 3],
            [0.4, 3.25],
            [1.4, 2.95],
            [2.1, 3.1],
          ];
          w.enterRoom('boarding');
          n.position = path[0].slice();
          n.stair = null;
          n.elevation = w.model.boarding.height(path[0][0]);
          w.cameraElevation = n.elevation;
          w.applyPosition();
          let leg = 0,
            index = 1,
            previous;
          const start = performance.now(),
            original = app.frame;
          await new Promise((resolve, reject) => {
            app.frame = function (dt) {
              try {
                const t = performance.now(),
                  points = leg % 2 ? path.toReversed() : path,
                  to = points[index],
                  dx = to[0] - n.position[0],
                  dy = to[1] - n.position[1],
                  d = Math.hypot(dx, dy),
                  step = Math.min(d, 1.12 * Math.min(0.075, Math.max(0.001, dt)));
                if (d > 1e-7) n.move((dx / d) * step, (dy / d) * step);
                const move = performance.now() - t,
                  b = w.model.group.userData.yacht;
                const direction = app.camera.position
                  .clone()
                  .set(dy * b.sy, 0, dx * b.sx)
                  .applyQuaternion(w.model.group.quaternion);
                w.yaw = Math.atan2(-direction.x, -direction.z);
                w.pitch = -0.75;
                original(dt);
                rows.push({
                  leg,
                  interval: previous === undefined ? null : t - previous,
                  move,
                  cpu: performance.now() - t,
                  profile: app.gangwayRenderer.activeProfile,
                  triangles: w.model.stats.triangles,
                });
                previous = t;
                if (Math.hypot(to[0] - n.position[0], to[1] - n.position[1]) < 0.002) {
                  index++;
                  if (index === points.length) {
                    index = 1;
                    leg++;
                  }
                }
                if (leg === 4) {
                  app.frame = original;
                  resolve();
                } else if (t - start > 90000) throw Error('Boarding route stalled ' + n.position);
              } catch (e) {
                app.frame = original;
                reject(e);
              }
            };
          });
          await app.gpu.queue.onSubmittedWorkDone();
          return {
            rows,
            gpu: __teakGPU.filter((e) => e.time >= start),
            resources: performance
              .getEntriesByType('resource')
              .filter((e) => e.startTime >= start && /\.(bin|json|glb)(\?|$)/.test(e.name))
              .map((e) => e.name),
            scale: app.engine.renderScale,
            samples: app.gangwayRenderer.samples,
            finishTextureBytes: w.model.stats.finishTextureBytes,
          };
        });
        assert.deepEqual(result.gpu, []);
        assert.deepEqual(result.resources, []);
        assert.deepEqual(errors, []);
        assert.equal(result.scale, 1);
        assert.equal(result.samples, 4);
        assert.ok(result.finishTextureBytes <= 3600000);
        assert.ok(result.rows.every((r) => r.triangles <= 25000 && r.profile === 'exterior'));
        const legs = [0, 1, 2, 3].map((leg) => ({
          leg,
          ...summarize(result.rows.filter((r) => r.leg === leg)),
        }));
        runs.push({ run, legs, ...result });
        writeFileSync(out + `/teak-cold-${run}.json`, JSON.stringify(runs.at(-1), null, 2));
        console.log('Fresh boarding context', run, legs);
      } finally {
        release?.();
        await context.close();
      }
    }
  } finally {
    await browser.close();
  }
  writeFileSync(
    out + '/teak-performance.json',
    JSON.stringify(
      runs.map(({ rows, ...r }) => r),
      null,
      2,
    ),
  );
  for (let leg = 0; leg < 4; leg++)
    assert.ok(
      runs.map((r) => r.legs[leg].p95).sort((a, b) => a - b)[1] <= 25,
      'Controlled median boarding P95 exceeds 25 ms on leg ' + leg,
    );
})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
