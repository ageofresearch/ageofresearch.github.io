const { chromium } = require('playwright-core');
const { mkdirSync } = require('node:fs');
const assert = require('node:assert/strict');
const base = process.env.YACHT_BASE || 'http://127.0.0.1:8764/tidewater-rocha/';
const out = process.env.YACHT_OUTPUT || '/tmp/yacht-teak-views';
mkdirSync(out, { recursive: true });
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
  try {
    async function capture(mobile) {
      const context = await browser.newContext({ viewport: { width: 720, height: 540 } });
      try {
        const page = await context.newPage(),
          errors = [];
        page.on('pageerror', (e) => errors.push(e.message));
        await page.goto(
          base +
            (mobile ? 'mobile.html?world=rocha&v=yacht-daylight-1' : 'play.html?world=rocha&view=walk-chat'),
        );
        if (mobile) await page.locator('#yacht').contentFrame().locator('#app').waitFor({ timeout: 90000 });
        const frame = mobile ? page.frames().find((f) => f.url().includes('play.html')) : page.mainFrame();
        await frame.waitForFunction(() => window.__mapsPublicStatus?.status === 'ready', null, {
          timeout: 180000,
        });
        const readFrame = require('./yacht-frame-reader.cjs')(frame);
        await require('./yacht-gangway-views.cjs')(frame, out, readFrame, mobile);
        assert.deepEqual(errors, []);
        console.log(mobile ? 'BOARDING MOBILE VIEWS PASS' : 'BOARDING FULL VIEWS PASS');
      } finally {
        await context.close();
      }
    }
    await capture(process.env.YACHT_CHECK !== 'full');
  } finally {
    await browser.close();
  }
})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
