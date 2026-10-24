"""Public evidence from actual native WebGL captures, never private VR imagery."""
from pathlib import Path
import json,hashlib,shutil
from PIL import Image
import numpy as np
R=Path(__file__).resolve().parents[1];W=R/'work/machinery-sharp-r01';B=W/'browser';P=R/'public/review/machinery-sharp-r01';P.mkdir(parents=True,exist_ok=True)
report=json.loads((B/'report.json').read_text());assert report['pass']
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
checks={}
for mode in ['sharp','performance']:
 a=np.array(Image.open(B/f'{mode}-moving.png').convert('RGB'));b=np.array(Image.open(B/f'{mode}-rest.png').convert('RGB'))
 assert a.shape==b.shape and np.array_equal(a,b)
 checks[mode]={'canvas':[a.shape[1],a.shape[0]],'differentPixels':int(np.any(a!=b,axis=2).sum()),'movingSHA256':sha(B/f'{mode}-moving.png'),'restSHA256':sha(B/f'{mode}-rest.png')}
proof={'revision':'machinery-sharp-r01','checks':checks,'browserChecks':report['checks'],'controlledProductionCadences':report.get('cadence',[]),'environment':report['environment'],'hardwareFPSValidated':False,'geometryMaterialsAndAnisotropyChanged':False,'pass':True}
proof['sourceSHA256']={name:sha(R/name) for name in ['src/main.js','src/resolution.js','src/style.css','index.html']}
old=Path('/tmp/luz-engine-blur')
if (old/'report.json').exists() and (B/'matched-candidate.png').exists():
 before=json.loads((old/'report.json').read_text());after=Image.open(B/'matched-candidate.png').convert('RGB');reference=Image.open(old/'rest-full-native.png').convert('RGB');difference=np.array(after).astype(int)-np.array(reference).astype(int)
 proof['matchedBaseline']={'beforeWalkingCanvas':before['moving']['canvas'],'afterCanvas':list(after.size),'sameCamera':report['matchedPose']['position']==before['moving']['position'] and report['matchedPose']['quaternion']==before['moving']['quaternion'],'fullReferenceDifferentPixels':int(np.any(difference!=0,axis=2).sum()),'rmse8bit':float(np.sqrt(np.mean(difference.astype(float)**2)))}
 assert proof['matchedBaseline']['sameCamera']
 # Both sources are our own viewer output. Preserve originals in work, expose
 # small display copies only; the proof references untouched PNG hashes.
 low=Image.open(old/'adaptive-walking-native.png').convert('RGB');low.save(P/'before.webp',quality=90)
 after.save(P/'after.webp',quality=90)
 enlarged=low.resize(after.size,Image.Resampling.BILINEAR);box=(1290,720,1840,1180)
 panel=Image.new('RGB',(1100,460));panel.paste(enlarged.crop(box),(0,0));panel.paste(after.crop(box),(550,0));panel.save(P/'detail.webp',quality=92)
for name in ['timing-before','timing-after','mobile','mobile-layout','original-verification','asset-verification']:
 p=W/(name+'.json')
 if p.exists():
  data=json.loads(p.read_text())
  if name.startswith('timing-'):
   assert data['pass'] and len(data['frames'])==8
   assert all(f['canvas']==[600,400] and f['readbackBytes']==960000 for f in data['frames'])
   assert any(sum(f['centerPixel'][:3])>0 for f in data['frames'])
  proof[name.replace('-','_')]=data
(P/'validation.json').write_text(json.dumps(proof,indent=2)+'\n')
# No downloadable authoring/model changes in this rendering-only release.
page='''<!doctype html><html lang="es"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Motores: nitidez constante al caminar</title><style>body{font:16px/1.6 system-ui;max-width:1050px;margin:35px auto;padding:0 20px;background:#f5f3ed;color:#25332b}h1{line-height:1.2}img{width:100%;height:auto}table{border-collapse:collapse;width:100%}td,th{padding:10px;border-bottom:1px solid #c9ccc3;text-align:left}a{color:#285d47}.pair{display:grid;grid-template-columns:1fr 1fr;gap:15px}figure{margin:0}figcaption,small{font-size:13px;color:#59655d}@media(max-width:650px){.pair{grid-template-columns:1fr}}</style><h1>Los motores conservan la nitidez al moverse</h1><p>La resolución del cuarto de máquinas ya no baja al caminar, girar o animar equipos. El selector <b>Calidad de imagen</b> ofrece <b>Nitidez</b>, predeterminada, y <b>Rendimiento</b>, una resolución menor que también permanece constante al detenerse.</p><p><a href="../?room=machinery&amp;engine=right-vr-r01">Abrir el cuarto de máquinas</a> · <a href="./right-engine.html">Reconstrucción del motor derecho</a></p><h2>Comparación con la versión anterior</h2><div class="pair"><figure><img src="./machinery-sharp-r01/before.webp" alt="Motor en movimiento con el antiguo renderizado reducido"><figcaption>Antes: 825 × 550 píxeles al caminar.</figcaption></figure><figure><img src="./machinery-sharp-r01/after.webp" alt="Mismo encuadre con resolución constante"><figcaption>Después: 1920 × 1280 en movimiento y reposo, viewport 960 × 640 y DPR 2.</figcaption></figure></div><p>Detalle con iguales coordenadas: antes a la izquierda y después a la derecha. La imagen anterior se amplía bilinealmente para presentar el mismo tamaño.</p><img src="./machinery-sharp-r01/detail.webp" alt="Tornillería y carcasas antes y después de corregir la resolución"><h2>Prueba de aceptación</h2><p>Se capturó el cuadro nativo al caminar y se volvió a dibujar desde la misma cámara, conservando mallas, materiales e iluminación. En ambos modos las imágenes de movimiento y reposo son idénticas píxel por píxel. Los originales PNG se conservan con sus hashes en el registro de validación; las imágenes de esta página son copias WebP para consulta.</p><table><tr><th>Modo probado</th><th>Movimiento / reposo</th><th>Píxeles diferentes</th></tr>'''
for mode,label in [('sharp','Nitidez'),('performance','Rendimiento')]:
 c=checks[mode];page+=f"<tr><td>{label}</td><td>{c['canvas'][0]} × {c['canvas'][1]} / igual</td><td>{c['differentPixels']}</td></tr>"
page+='''</table>'''
if 'timing_before' in proof and 'timing_after' in proof:
 page+='<h2>Coste a resolución equivalente</h2><p>Buffer fijo de 600 × 400; ocho cuadros caminando, con los dos primeros excluidos de las estadísticas. La lectura síncrona del buffer completo obliga a completar el renderizado. Estas latencias incluyen el renderizado y la lectura a CPU; son una muestra breve por software, no FPS de una GPU real.</p><table><tr><th>Versión</th><th>p50</th><th>p95</th></tr>'
 for key,label in [('timing_before','Antes'),('timing_after','Después')]:
  t=proof[key];page+=f"<tr><td>{label}</td><td>{t['p50']/1000:.3f} s</td><td>{t['p95']/1000:.3f} s</td></tr>"
 page+='</table>'
page+='''<h2>Qué se corrigió</h2><p>Maquinaria queda fuera del multiplicador automático de calidad y de la restauración de resolución al parar. Una sola política se aplica al dibujar, cambiar el tamaño, entrar en la zona y recuperar WebGL. Se conserva la preferencia durante la sesión; las demás zonas mantienen su política adaptativa.</p><p>Nitidez usa el DPR del dispositivo hasta 2. Rendimiento usa un DPR máximo de 1 y hasta 1,5 millones de píxeles tanto caminando como detenido. Los límites de WebGL se respetan en ambos casos.</p><h2>Validación y límites</h2><p>Se comprueban caminata, giros, cadencias de 30/60/120 Hz, pausas largas, redimensionado, selección de modo, recarga, cambio de zona, pestaña oculta, corte nominal, filtros, memoria y recuperación de WebGL. Las pruebas gráficas utilizan SwiftShader: verifican corrección, no FPS de una GPU real. La resolución completa puede aumentar el coste por cuadro; Rendimiento permite reducirlo explícitamente.</p><p>Esta corrección conserva los modelos, materiales, texturas, filtrado anisotrópico y reconstrucciones de ambos motores. No añade precisión documental a la reconstrucción.</p><p><a href="https://github.com/ageofresearch/ageofresearch.github.io/releases/tag/luz-machinery-sharp-r01">Capturas PNG originales y pruebas reproducibles</a> · <a href="./machinery-sharp-r01/validation.json">Resultados, hashes y mediciones</a> · <a href="./">Fuentes del proyecto</a></p></html>'''
(R/'public/review/machinery-sharp.html').write_text(page)
(W/'validation.json').write_text(json.dumps(proof,indent=2)+'\n')
print(json.dumps({'pixelChecks':checks,'matched':proof.get('matchedBaseline'),'publicBytes':sum(p.stat().st_size for p in P.iterdir())},indent=2))
