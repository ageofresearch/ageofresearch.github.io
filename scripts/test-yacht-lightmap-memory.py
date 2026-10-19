"""Regression test using repository assets, Playwright and Chromium.

Draw commands are suppressed; decoding, shaders and GL allocation are real.
This checks retained CPU arrays, not physical VRAM or Mac process memory.
Run: python scripts/test-yacht-lightmap-memory.py --output-dir /tmp/yacht-memory-test
Requires Python playwright and an installed Chromium or Playwright Chromium.
"""
from pathlib import Path
from urllib.parse import urlsplit,unquote
from playwright.sync_api import sync_playwright
import argparse,hashlib,json,mimetypes,shutil,traceback

parser=argparse.ArgumentParser();parser.add_argument('--output-dir',required=True);parser.add_argument('--chromium-path',default=shutil.which('chromium'));args=parser.parse_args()
I=Path(args.output_dir);I.mkdir(parents=True,exist_ok=True)
S=Path(__file__).resolve().parents[1]/'site/marina-casa-de-campo'
report={'scope':__doc__,'cases':[]}
def save():(I/'ROOM-RETENTION.json').write_text(json.dumps(report,indent=2)+'\n')

with sync_playwright()as p:
 for fixed in [False,True]:
  runtime=S/'assets'/('yacht-parity-runtime-r110-memory-fix1.js'if fixed else'yacht-parity-runtime-r110-flight-fix1.js')
  case={'fixed':fixed,'runtime_sha256':hashlib.sha256(runtime.read_bytes()).hexdigest(),'samples':[],'errors':[]};report['cases'].append(case);save()
  b=p.chromium.launch(executable_path=args.chromium_path,headless=True,args=['--no-sandbox','--disable-dev-shm-usage','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader'])
  page=b.new_page(viewport={'width':320,'height':240});page.on('pageerror',lambda e:case['errors'].append(str(e)))
  def route(r):
   u=urlsplit(r.request.url)
   if u.hostname!='yacht-memory.test':r.abort();return
   f=(S/unquote(u.path).lstrip('/')).resolve()
   if not f.is_relative_to(S.resolve())or not f.is_file():r.fulfill(status=404,body='Missing local file');return
   body=runtime.read_bytes()if f.name=='yacht-parity-runtime-r110-memory-fix1.js'else f.read_bytes()
   if f.name.startswith('marina-yacht-entry-r110-'):body=body.replace(b'await app.init();',b'await app.init();app.engine.stop();')
   kind='text/javascript'if f.suffix in ['.js','.mjs']else'application/wasm'if f.suffix=='.wasm'else mimetypes.guess_type(f.name)[0]or'application/octet-stream'
   r.fulfill(status=200,content_type=kind,body=body)
  page.route('**/*',route)
  page.add_init_script("const original=HTMLCanvasElement.prototype.getContext;HTMLCanvasElement.prototype.getContext=function(...a){const gl=original.apply(this,a);if(gl&&a[0]==='webgl2'&&!gl.__memoryTest){gl.__memoryTest=true;for(const k of ['drawElements','drawArrays','drawElementsInstanced','drawArraysInstanced'])gl[k]=()=>{}}return gl}")
  try:
   page.goto('https://yacht-memory.test/marina.html?diagnostics=1',wait_until='domcontentloaded')
   page.wait_for_function("window.__marina?.yacht&&['ready','error'].includes(__marina.yacht.state)",timeout=240000);assert page.evaluate('__marina.yacht.state')=='ready',page.evaluate('__marina.yacht.error')
   page.locator('[data-auto]').evaluate("el=>{el.checked=false;el.dispatchEvent(new Event('change',{bubbles:true}))}");page.evaluate('__marina.hydro.paused=true')
   rooms=page.evaluate('__marina.yacht.rooms.map(r=>r.id)');case['room_count']=len(rooms)
   for sweep in range(2 if fixed else 1):
    for room in rooms if fixed else rooms[:12]:
     page.evaluate('async id=>{__marina.yacht.go(id);await __marina.yacht.runtime.whenAppearanceReady();__marina.render();__marinaDiagnostics.sample()}',room)
     sample=page.evaluate('''()=>{const a=__marina,s=__marinaDiagnostics.report().latest;let badActiveMaterials=0;a.yacht.root.traverse(o=>{if(o.isMesh)for(const m of Array.isArray(o.material)?o.material:[o.material])if(m.lightMap&&!m.lightMap.image?.data?.byteLength)badActiveMaterials++});return {room:a.yacht.room.id,lighting:s.lighting,gpu:s.gpu,heap:s.jsHeapBytes,contextLost:s.contextLost,badActiveMaterials,error:a.yacht.runtime.appearanceError||null}}''')
     sample['sweep']=sweep;case['samples'].append(sample);save()
     assert not sample['badActiveMaterials']and not sample['contextLost']and not sample['error'],sample
     assert sample['gpu']['trackingErrors']==0,sample
     if fixed:assert sample['lighting']['visibleModelStaleArrayBytes']==0,sample
     print('fixed'if fixed else'baseline',sweep,room,'stale MiB',sample['lighting']['visibleModelStaleArrayBytes']/1048576,flush=True)
   if fixed:
    # Mirror-camera storage may warm during sweep one. Compare both ends of
    # repeated sweeps, rather than mistaking different active room maps for a leak.
    end1=case['samples'][len(rooms)-1]['gpu']['totalBytes'];end2=case['samples'][-1]['gpu']['totalBytes'];case['sweep_end_requested_bytes']=[end1,end2];assert end1==end2
   else:assert max(s['lighting']['visibleModelStaleArrayBytes']for s in case['samples'])>0
   assert not case['errors'];case['passed']=True;save()
  except Exception as e:case.update(exception=str(e),traceback=traceback.format_exc());save();raise
  finally:b.close()
report['completed']=True;save();print('ROOM_RETENTION_PASSED',flush=True)
