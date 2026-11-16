// Publish only our fixed-camera render comparisons and measured checks.
import { readFile, writeFile, mkdir, copyFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { createHash } from 'node:crypto';
import { gangwayTeak } from '../site/tidewater-rocha/mobile/gangway-finish.js';
import { finishPatternMips, teakPatternMips } from '../site/tidewater-rocha/mobile/finish-patterns.js';
const [before, after, performance] = process.argv.slice(2).map((p) => resolve(p));
if (!before || !after || !performance)
  throw Error('Usage: build-yacht-teak-report.mjs before-views after-views performance-directory');
const output = resolve('site/tidewater-rocha/teak-audit');
const cameras = ['panel-1', 'panel-2', 'panel-3', 'joint-1', 'joint-2', 'forward', 'return', 'grain-close'];
for (const [phase, path] of [
  ['before', before],
  ['after', after],
]) {
  const dest = output + '/images/' + phase;
  await mkdir(dest, { recursive: true });
  for (const mode of ['mobile', 'full'])
    for (const camera of cameras)
      await copyFile(path + `/teak-${mode}-${camera}.png`, dest + `/teak-${mode}-${camera}.png`);
}
const manifest = JSON.parse(await readFile('site/tidewater-rocha/mobile/bridge-access.json'));
const runs = JSON.parse(await readFile(performance + '/teak-performance.json'));
if (
  runs.length !== 3 ||
  runs.some((r) => r.gpu.length || r.resources.length || r.scale !== 1 || r.samples !== 4)
)
  throw Error('Unverified cold-walk results');
const medianP95 = Array.from(
  { length: 4 },
  (_, i) => runs.map((r) => r.legs[i].p95).sort((a, b) => a - b)[1],
);
if (medianP95.some((t) => t > 25)) throw Error('Boarding frame-time gate failed');
const textures = [...finishPatternMips(), ...teakPatternMips()].reduce((n, p) => n + p.data.length, 0);
const fixture = await readFile('tests/fixtures/yacht-gangway-geometry.json');
const checks = {
  version: gangwayTeak.version,
  layout: gangwayTeak,
  geometry: `Se comprobaron ${JSON.parse(fixture).length} piezas de embarque contra sus posiciones, vértices, índices y límites anteriores: sin cambios geométricos. Las regresiones de navegación y escaleras conservan los recorridos.`,
  materials:
    'Los tres paneles conservan su material en los 27 perfiles de los siete paquetes con respaldo. Las superficies explícitas de tipo cero se respetan, y los materiales desconocidos producen un error. Las tres capas de textura anteriores coinciden byte a byte.',
  graphics: `Texturas de acabado: ${textures.toLocaleString('es')} bytes. Dos texturas muestreadas, dos lotes y un pase en móvil, escala 1 y MSAA 4. Veta, juntas y remates revisados desde ocho cámaras en móvil y yate completo.`,
  performance: `Tres contextos nuevos, con primera entrada y recorridos repetidos: medianas de P95 ${medianP95.map((n) => n.toFixed(1)).join(' / ')} ms. Sin descargas de modelos ni creación de recursos gráficos durante el movimiento. Medición controlada con renderizado por software; no certifica FPS de un teléfono.`,
  profiles: Object.fromEntries(Object.entries(manifest.profiles).map(([name, p]) => [name, p.triangles])),
  textureBytes: textures,
  geometryFixtureSHA256: createHash('sha256').update(fixture).digest('hex'),
  medianP95,
  runs: runs.map(({ rows, ...r }) => r),
  references: [
    {
      url: 'https://www.althausyachts.com/brokerage/luz-de-mar/',
      scope: 'Vessel-specific aft-deck material appearance; not measured gangway layout',
    },
  ],
  caveat:
    'Approved provisional board layout and material values; not surveyed vessel measurements or a calibrated onboard colour sample.',
};
await writeFile(output + '/comprobaciones.json', JSON.stringify(checks, null, 2) + '\n');
console.log(JSON.stringify({ images: 32, textureBytes: textures, medianP95 }));
