"""Package editable authoring and reproducible checks without reference photos."""
from pathlib import Path
import zipfile,json,hashlib
R=Path(__file__).resolve().parents[1];W=R/'work/right-engine-r01';A=R/'public/assets/mechanics/right-vr-r01';P=R/'public/review/right-engine-r01';P.mkdir(parents=True,exist_ok=True)
files={R/'package.json':'project/package.json',R/'package-lock.json':'project/package-lock.json',W/'tests.log':'validation/unit-tests.txt',W/'right-engine-master.blend':'right-engine-master.blend',W/'authoring.json':'authoring.json',A/'authoring.json':'runtime-assets.json',A/'evidence.json':'provenance/evidence.json',A/'component-inventory.json':'provenance/components.json',W/'right-observations.json':'provenance/right-observations.json',W/'clearance.json':'validation/clearance.json',W/'baked-uv-binding.f32':'validation/baked-uv-binding.f32',W/'image-source-validation.json':'provenance/image-source-validation.json',W/'browser/report.json':'validation/browser.json',W/'performance.json':'validation/performance.json',W/'performance-baseline.json':'validation/performance-baseline.json',W/'default/report.json':'validation/default-browser.json',W/'review/candidate/report.json':'validation/captures.json',W/'review/baseline/report.json':'validation/baseline-captures.json',W/'review/tiles/inventory.json':'validation/tile-inventory.json',W/'review/cubes/camera.json':'validation/cube-camera-and-visible-ids.json',W/'visual-assessment.json':'validation/visual-assessment.json',R/'work/left-engine-r13/original-629.json':'provenance/original-yacht-629-sha256.json'}
for name in ['build-right-engine.py','right-engine-detail.py','right-intake-detail.py','right-engine-textures.py','bake-right-engine.py','encode-right-lighting.py','prepare-right-engine.mjs','external-engine-textures.mjs','partition-right-machinery.mjs','render-right-engine.py','render-right-tiles.py','review-right-tiles.py','right-tile-evidence.json','inventory-right-engine.py','check-right-clearance.py','check-right-image-sources.py','stamp-right-authoring.py','preserve-viewer-entry.py','right-engine-evidence.py','capture-right-engine.cjs','package-right-engine.py','build-left-engine.py','bake-left-engine.py','lightmap-uv.py','left-engine-grid-controls.json','left-engine-legacy-parts.json']:
 files[R/'tools'/name]='tools/'+name
for name in ['right-engine-assets.test.mjs','right-engine-browser.cjs','right-engine-performance.cjs','installed-engine.test.mjs','resource-estimates.test.mjs','default-machinery-smoke.cjs']:files[R/'test'/name]='test/'+name
for file in (W/'textures').glob('*.png'):files[file]='textures/'+file.name
readme='''# Motor derecho · reconstrucción VR R01

Escena Blender 4.3.2 editable en metros, con texturas de autoría empaquetadas.
Colección `EDITABLE | VR right installed`: piezas individuales. Permanece oculta
para evitar duplicarla sobre `RVR installed | detail`. Ocultar el conjunto unido
y habilitar la colección editable para modificar componentes. El contexto y el
motor izquierdo proceden del master R13, conservado intacto en su entrega original.

La cámara fuente fija es (9.15, 0, 3.18), X proa, Y babor, Z arriba. Derecha significa
el conjunto a la derecha al mirar hacia el mamparo de tuberías. No confirma qué
lado real del barco identifica la panorámica. Las caras ocultas y profundidades
son estimadas; los interiores R03 siguen siendo una demostración nominal.

Carcasas próximas, reductora, cableado, fundas, cierres y extintor tienen ajustes
propios del lado derecho. Las formas compatibles del motor se derivan de R13;
no se afirma que las instalaciones mecánicas reales sean simples reflejos.

Iluminación: Cycles CPU, irradiancia sin albedo, directa e indirecta, 16 muestras,
4096² reducida linealmente a 2048² y filtrada con OIDN. Reflejos locales 1024×512,
32 muestras. EXR lineal half-float DWAA. Navegador: Three.js Neutral, exposición
0.05 y salida sRGB. Materiales con UV0, iluminación con UV1, KTX2 y meshopt.

La comparación por cuadros de 64/32 px registra las piezas y sus diferencias.
El inventario no certifica todos los bordes a 4/6 píxeles ni aprueba automáticamente
los acabados. Consultar visual-assessment.json y el informe del navegador.
Las imágenes originales de la VR no están incluidas ni se usan como texturas.
Las vistas del navegador publicadas son renders propios.

El master se abre directamente. Los scripts reproducen el flujo dentro del
repositorio apps/luz-de-mar-realism; para reconstruir desde cero necesitan el
master R13 y snapshot R11 identificados por hashes, disponibles en entregas previas.
No modificar esos originales. Preparar work/right-engine-r01/baseline-site con el subárbol site/luz-de-mar-realism del commit 5bb26ba6083bd82feefc763a5c3bb1d4a8e5aba6; se usa para conservar las caras originales y verificar sus hashes. Las cinco texturas propias derivadas están en textures/; copiarlas a work/right-engine-r01/textures antes del build. Generar evidence, build, bake, inventario y clearance;
preparar GLB/KTX2 con prepare-right-engine.mjs y ejecutar los tests antes de publicar.
Las pruebas SwiftShader comprueban funcionamiento; no acreditan FPS de GPU física.

Referencia: https://vrcloud.com/?pv=1667308298
Visor: https://ageofresearch.github.io/luz-de-mar-realism/?room=machinery&engine=right-vr-r01
Código y créditos: https://github.com/ageofresearch/ageofresearch.github.io
'''
(W/'README.txt').write_text(readme);files[W/'README.txt']='README.md'
entries={}
archive=W/'luz-right-engine-r01-authoring.zip'
with zipfile.ZipFile(archive,'w',zipfile.ZIP_DEFLATED,compresslevel=6)as z:
 for source,name in files.items():
  assert source.is_file(),source
  b=source.read_bytes();entries[name]={'bytes':len(b),'sha256':hashlib.sha256(b).hexdigest()};z.writestr(name,b)
 z.writestr('SHA256SUMS',''.join(v['sha256']+'  '+name+'\n'for name,v in entries.items()))
report={'file':archive.name,'bytes':archive.stat().st_size,'sha256':hashlib.sha256(archive.read_bytes()).hexdigest(),'entries':entries,'privateVrPhotosIncluded':False}
comparison=W/'luz-right-engine-r01-captures.zip'
with zipfile.ZipFile(comparison,'w',zipfile.ZIP_DEFLATED,compresslevel=6)as z:
 for folder in ['baseline','candidate']:
  for file in sorted((W/'review'/folder).glob('*.png')):z.write(file,folder+'/'+file.name)
  z.write(W/'review'/folder/'report.json',folder+'/report.json')
 z.writestr('README.txt','Actual WebGL renders, fixed camera, 1200 x 800. No VR photographs included. Compare to https://vrcloud.com/?pv=1667308298 . Baseline: published floor-fix revision 5bb26ba; candidate: right-vr-r01. See report.json for FOV, exposure and resource measurements.\n')
report['comparisonArchive']={'file':comparison.name,'bytes':comparison.stat().st_size,'sha256':hashlib.sha256(comparison.read_bytes()).hexdigest(),'privateVrPhotosIncluded':False}
(W/'authoring-archive.json').write_text(json.dumps(report,indent=2)+'\n');(P/'authoring-archive.json').write_text(json.dumps(report,indent=2)+'\n');print(archive,report['bytes'],report['sha256'])
