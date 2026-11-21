// Measure the public walking renderer and the real sliders at the same fixed resolution.
const assert = require('node:assert/strict');
const { chromium } = require('playwright-core');
const fs = require('node:fs');
(async () => {
  const base = process.env.YACHT_BASE || 'http://127.0.0.1:8764/tidewater-rocha/';
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
  const results = [];
  try {
    for (let run = 0; run < 3; run++) {
      const ctx = await browser.newContext({ viewport: { width: 360, height: 540 }, hasTouch: true });
      try {
        await ctx.addInitScript(() => {
          const counters = (window.daylightCounters = { allocations: 0, shadows: 0, draws: 0 });
          for (const name of [
            'createBuffer',
            'createTexture',
            'createRenderPipeline',
            'createRenderPipelineAsync',
            'createShaderModule',
            'createBindGroup',
          ]) {
            const original = GPUDevice.prototype[name];
            GPUDevice.prototype[name] = function (...args) {
              counters.allocations++;
              return original.apply(this, args);
            };
          }
          const pass = GPUCommandEncoder.prototype.beginRenderPass;
          GPUCommandEncoder.prototype.beginRenderPass = function (desc) {
            if (desc.label === 'Yacht moving sun') counters.shadows++;
            if (desc.label === 'Gangway to screen') counters.draws++;
            return pass.call(this, desc);
          };
        });
        const page = await ctx.newPage();
        await page.goto(base + 'mobile.html?world=rocha&v=yacht-daylight-1');
        const frame =
          page.frames().find((f) => f.url().includes('play.html')) ||
          (await page.waitForEvent('framenavigated', (f) => f.url().includes('play.html')));
        await frame.waitForFunction(
          () =>
            window.__mapsPublicStatus?.status === 'ready' &&
            __app.entranceYacht.guestAccessLoadState === 'ready',
          null,
          { timeout: 180000 },
        );
        const stats = await frame.evaluate(async () => {
          const app = __app,
            walk = app.yachtWalk,
            light = app.daylight,
            rows = [];
          const [az, el] = document.querySelectorAll('[data-daylight] input');
          const input = (control, v) => {
            control.value = v;
            control.dispatchEvent(new Event('input', { bubbles: true }));
          };
          for (const room of ['MD_R02', 'MD_R01'])
            for (const dragging of [false, true]) {
              if (!walk.enterRoom(room) || !walk.active) throw Error('Could not start walking in ' + room);
              light.reset();
              app.frame(0);
              const before = { ...daylightCounters },
                start = performance.now(),
                times = [];
              let previous = null,
                tick = 0;
              const original = app.frame;
              await new Promise((resolve) => {
                app.frame = function (dt) {
                  const now = performance.now();
                  if (previous !== null) times.push(now - previous);
                  previous = now;
                  if (dragging) {
                    input(az, (tick * 3) % 361);
                    input(el, 10 + (tick % 78));
                  } else walk.nav.move(tick < 60 ? 0.008 : -0.008, 0);
                  original.call(app, dt);
                  if (++tick === 120) {
                    app.frame = original;
                    resolve();
                  }
                };
              });
              const sorted = times.toSorted((a, b) => a - b);
              rows.push({
                room,
                dragging,
                p95: sorted[Math.ceil(times.length * 0.95) - 1],
                fps: (1000 * times.length) / times.reduce((a, b) => a + b),
                shadows: daylightCounters.shadows - before.shadows,
                draws: daylightCounters.draws - before.draws,
                allocations: daylightCounters.allocations - before.allocations,
                requests: performance.getEntriesByType('resource').filter((r) => r.startTime >= start)
                  .length,
                scale: app.engine.renderScale,
                samples: app.gangwayRenderer.samples,
              });
            }
          input(az, 270);
          input(el, 45);
          return rows;
        });
        results.push(stats);
        console.log(JSON.stringify(stats));
        if (process.env.YACHT_TIMINGS) fs.writeFileSync(process.env.YACHT_TIMINGS, JSON.stringify(results));
        for (const r of stats) {
          assert.equal(r.allocations, 0);
          assert.equal(r.requests, 0);
          assert.equal(r.shadows, r.dragging ? 120 : 0);
          assert.equal(r.draws, 120);
          assert.equal(r.scale, 1);
          assert.equal(r.samples, 4);
        }
        await Promise.all([
          frame.waitForNavigation({ waitUntil: 'domcontentloaded' }),
          frame.evaluate(() => {
            setTimeout(() => location.reload(), 0);
          }),
        ]);
        await frame.waitForFunction(() => window.__mapsPublicStatus?.status === 'ready', null, {
          timeout: 180000,
        });
        assert.deepEqual(await frame.evaluate(() => __app.daylight.state), { azimuth: 270, elevation: 45 });
      } finally {
        await ctx.close();
      }
    }
  } finally {
    await browser.close();
  }
  for (let i = 0; i < results[0].length; i++) {
    const med = (key) => results.map((r) => r[i][key]).sort((a, b) => a - b)[1];
    assert.ok(
      med('p95') <= 25 && med('fps') >= 40,
      JSON.stringify({
        case: results[0][i].room,
        dragging: results[0][i].dragging,
        p95: med('p95'),
        fps: med('fps'),
      }),
    );
  }
})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
