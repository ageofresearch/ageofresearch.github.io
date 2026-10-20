"""Compare deployed-baseline and lossless performance assets in Chromium.

--mode visual executes real draws from startup for all 55 fitted cameras,
fixtures and marina/ball views. --mode allocation suppresses draws only, while
retaining actual decoders/shaders/GL allocations. Neither measures Mac FPS,
physical VRAM or total application RAM. Requires Python Playwright/Pillow/numpy.
"""
from pathlib import Path
from urllib.parse import urlsplit,unquote
import argparse,base64,hashlib,json,mimetypes,shutil,traceback
from playwright.sync_api import sync_playwright
from PIL import Image
import numpy as np

parser=argparse.ArgumentParser(description=__doc__)
parser.add_argument('--mode',choices=['visual','allocation','controls','recovery'],required=True)
parser.add_argument('--output-dir',required=True)
parser.add_argument('--chromium-path',default=shutil.which('chromium'))
parser.add_argument('--size',type=int,default=360)
args=parser.parse_args();out=Path(args.output_dir);out.mkdir(parents=True,exist_ok=True)
site=Path(__file__).resolve().parents[1]/'site/marina-casa-de-campo'
report={'scope':__doc__,'mode':args.mode,'viewport':[args.size,args.size],'cases':[]}
def save():(out/(args.mode.upper()+'.json')).write_text(json.dumps(report,indent=2)+'\n')

def setup(p,label,forced_codec=None):
 case={'variant':label,'errors':[],'missing':[],'samples':[],'models_requested':[]};report['cases'].append(case)
 b=p.chromium.launch(executable_path=args.chromium_path,headless=True,args=['--no-sandbox','--disable-dev-shm-usage','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader'])
 page=b.new_page(viewport={'width':args.size,'height':args.size});page.set_default_timeout(300000)
 page.on('pageerror',lambda e:case['errors'].append(str(e)))
 def route(r):
  u=urlsplit(r.request.url)
  if u.hostname!='yacht-performance.test':r.abort();return
  f=(site/unquote(u.path).lstrip('/')).resolve()
  if label=='baseline':
   names={'marina-yacht-entry-r110-performance1.js':'marina-yacht-entry-r110-diagnostics3.js','yacht-experience-r110-performance1.js':'yacht-experience-r110-memory-fix1.js','yacht-parity-runtime-r110-performance1.js':'yacht-parity-runtime-r110-memory-fix1.js'}
   if f.name in names:f=f.with_name(names[f.name])
  if not f.is_relative_to(site)or not f.is_file():case['missing'].append(str(f));r.fulfill(status=404,body='Missing file');return
  if f.suffix=='.glb'and f.name.startswith('grande-36m'):case['models_requested'].append(f.name)
  body=f.read_bytes()
  if f.name.startswith('marina-yacht-entry-r110-'):body=body.replace(b'await app.init();',b'await app.init();app.engine.stop();')
  kind='text/javascript'if f.suffix in ['.js','.mjs']else'application/wasm'if f.suffix=='.wasm'else mimetypes.guess_type(f.name)[0]or'application/octet-stream'
  r.fulfill(status=200,content_type=kind,body=body)
 page.route('**/*',route)
 if args.mode!='visual':
  page.add_init_script("const get=HTMLCanvasElement.prototype.getContext;HTMLCanvasElement.prototype.getContext=function(...a){const gl=get.apply(this,a);if(gl&&a[0]==='webgl2'&&!gl.__allocationTest){gl.__allocationTest=true;for(const k of ['drawElements','drawArrays','drawElementsInstanced','drawArraysInstanced'])gl[k]=()=>{}}return gl}")
 if forced_codec=='reject':
  page.add_init_script("const decode=window.createImageBitmap;window.createImageBitmap=function(blob,...a){if(blob?.type==='image/webp')return Promise.reject(Error('Test: blocked WebP decoder'));return decode.call(this,blob,...a)}")
 page.goto('https://yacht-performance.test/marina.html?diagnostics=1',wait_until='domcontentloaded')
 page.wait_for_function("window.__marina?.yacht&&['ready','error'].includes(__marina.yacht.state)",timeout=360000)
 assert page.evaluate('__marina.yacht.state')=='ready',page.evaluate('__marina.yacht.error')
 page.evaluate('__marina.engine.stop();__marina.hydro.paused=true;__marina.hydro.time=0')
 case['browser']=page.evaluate('navigator.userAgent')
 print(args.mode,label,'ready',case['models_requested'],flush=True);save()
 return b,page,case

def snapshot(page):
 return page.evaluate('''()=>{const a=__marina;__marinaDiagnostics.sample();const s=__marinaDiagnostics.report().latest;let badActiveMaterials=0;a.yacht.root.traverse(o=>{if(o.isMesh)for(const m of Array.isArray(o.material)?o.material:[o.material])if(m.lightMap&&!m.lightMap.image?.data?.byteLength)badActiveMaterials++});return {gpu:s.gpu,lighting:s.lighting,contextLost:s.contextLost,badActiveMaterials,error:a.yacht.runtime.appearanceError||null}}''')

def capture(page,case,name):
 encoded=page.evaluate("()=>{__marina.render();__marina.engine.glRenderer.getContext().finish();return __marina.engine.canvas.toDataURL('image/png').split(',')[1]}")
 f=out/(case['variant']+'-'+name+'.png');f.write_bytes(base64.b64decode(encoded))
 state=snapshot(page);assert not state['error']and not state['contextLost']and not state['badActiveMaterials'],state
 assert state['lighting']['visibleModelStaleArrayBytes']==0,state
 row={'id':name,'image':f.name,'sha256':hashlib.sha256(f.read_bytes()).hexdigest(),'contextLost':state['contextLost'],'appearance':page.evaluate('__marina.yacht.runtime.appearance.report()')};case['samples'].append(row);save()
 print('captured',case['variant'],name,flush=True)

with sync_playwright()as p:
 try:
  if args.mode=='visual':
   poses=json.loads((site/'marina/yacht-r110/review/FRAMES.json').read_text())['frames'];assert len(poses)==55
   for label in ['baseline','candidate']:
    b,page,case=setup(p,label)
    try:
     for pose in poses:
      page.evaluate('id=>__marina.yacht.runtime.photo(id)',pose['id']);capture(page,case,pose['id'])
     # Same camera plus continuously moving door fractions; mirror images
     # remain independent while the temporary transmission camera is shared.
     page.evaluate('__marina.yacht.go("salon");__marina.yacht.runtime.whenAppearanceReady()')
     fixture=page.evaluate('__marina.yacht.runtime.report().movers.find(m=>/door.*hinge/i.test(m.name))?.name')
     assert fixture
     page.evaluate('name=>__marina.yacht.runtime.toggle(name)',fixture)
     for i in range(4):
      page.evaluate('__marina.yacht.runtime.tick(.3125);__marina.yacht.runtime.whenAppearanceReady()');capture(page,case,'fixture-'+str(i))
     case['fixture']=fixture
     page.evaluate('__marina.yacht.leave();__marina.setView("quay");__marina.yacht.runtime.whenAppearanceReady()');capture(page,case,'quay')
     page.evaluate('__marina.setView("yacht");__marina.yacht.runtime.whenAppearanceReady()');capture(page,case,'exterior')
     page.evaluate('__marina.setView("ball")');capture(page,case,'ball')
     assert not case['errors']and not case['missing'],case
     case['passed']=True;save()
    finally:b.close()
   report['comparisons']=[]
   for row in report['cases'][0]['samples']:
    name=row['id'];a=np.asarray(Image.open(out/('baseline-'+name+'.png'))).astype(np.int16);c=np.asarray(Image.open(out/('candidate-'+name+'.png'))).astype(np.int16);d=np.abs(a-c)
    metric={'id':name,'different_pixels':int(np.any(d,axis=2).sum()),'maximum_channel_difference':int(d.max()),'mean_channel_difference':float(d.mean())};report['comparisons'].append(metric)
   save();assert all(x['different_pixels']==0 for x in report['comparisons']),report['comparisons']
  elif args.mode=='allocation':
   for label in ['baseline','candidate']:
    b,page,case=setup(p,label)
    try:
     rooms=page.evaluate('__marina.yacht.rooms.map(r=>r.id)')
     for sweep in range(2):
      for room in rooms:
       page.evaluate('async id=>{__marina.yacht.go(id);await __marina.yacht.runtime.whenAppearanceReady();__marina.render()}',room)
       row=snapshot(page);row.update(room=room,sweep=sweep);case['samples'].append(row)
       assert not row['contextLost']and not row['error']and not row['badActiveMaterials']and row['gpu']['trackingErrors']==0,row
       assert row['lighting']['visibleModelStaleArrayBytes']==0,row
      print(label,'sweep',sweep,'end bytes',case['samples'][-1]['gpu']['totalBytes'],flush=True);save()
     case['end_sweep_requested_bytes']=[case['samples'][len(rooms)-1]['gpu']['totalBytes'],case['samples'][-1]['gpu']['totalBytes']]
     assert case['end_sweep_requested_bytes'][0]==case['end_sweep_requested_bytes'][1]
     # Exercise target recreation after a desktop resize, with actual allocation.
     page.set_viewport_size({'width':1440,'height':788});page.wait_for_function('__marina.engine.width===1440&&__marina.engine.height===788')
     page.evaluate('__marina.render()');case['desktop_size']=snapshot(page)
     assert not case['errors']and not case['missing'];case['passed']=True;save()
    finally:b.close()
   report['requested_webgl_bytes_saved']=report['cases'][0]['end_sweep_requested_bytes'][-1]-report['cases'][1]['end_sweep_requested_bytes'][-1]
   report['lighting_records_identical']=all(a['lighting']==b['lighting']for a,b in zip(report['cases'][0]['samples'],report['cases'][1]['samples']));assert report['lighting_records_identical']
  else:
   # A failed lossless decode probe must select PNG before either model is fetched.
   for label,codec in ([('candidate',None)]if args.mode=='recovery'else[('candidate',None),('fallback','reject')]):
    b,page,case=setup(p,label,codec)
    try:
     assert case['models_requested']==(['grande-36m.glb']if codec else['grande-36m-lossless-webp-v1.glb']),case
     case['codec_supported']=page.evaluate("async()=>{const m=await import('/assets/yacht-model-delivery-r110-performance1.mjs');return m.supportsLosslessWebP()}")
     assert case['codec_supported']==(codec is None)
     if codec is None:
      # Fixed timesteps exercise actual key handlers without a software-GPU loop.
      page.keyboard.press('f');page.evaluate('__marina.navigation.input.hit("KeyF")&&__marina.toggleMovement();__marina.navigation.input.endFrame()')
      assert page.evaluate('__marina.navigation.mode')=='fly'
      # Free-fly through the yacht from the marina, including mirrors.
      page.evaluate('''async()=>{const a=__marina,c=a.walkCamera;for(const p of [[-10,4,0],[-2,3,0],[8,3,0],[8,5,0]]){const q=c.position.clone().fromArray(p);a.yacht.root.localToWorld(q);c.position.copy(q);c.lookAt(a.yacht.root.localToWorld(q.clone().set(15,4,0)));c.updateMatrixWorld(true);a.render();}await a.yacht.runtime.whenAppearanceReady()}''')
      case['marina_F_entry']=snapshot(page)
      page.evaluate('__marina.yacht.runtime.setAuditMode(true)')
      case['routes']=page.evaluate('__marina.yacht.runtime.walkAudit()');case['stairs']=page.evaluate('__marina.yacht.runtime.walkStairAudit()')
      assert all(x['passed']for x in case['routes']+case['stairs'])
      page.evaluate('__marina.yacht.go("salon")')
      def movement(shift=False):
       before=page.evaluate('__marina.yacht.controlState().local.toArray()')
       if shift:page.keyboard.down('Shift')
       page.keyboard.down('w');page.evaluate('for(let i=0;i<4;i++)__marina.navigation.update(.05)');page.keyboard.up('w')
       if shift:page.keyboard.up('Shift')
       after=page.evaluate('__marina.yacht.controlState().local.toArray()');return float(np.linalg.norm(np.array(before)-after))
      case['W_metres']=movement();case['Shift_W_metres']=movement(True);assert case['W_metres']>.1 and case['Shift_W_metres']>case['W_metres']
      page.keyboard.press('f');page.evaluate('__marina.navigation.input.hit("KeyF")&&__marina.toggleMovement();__marina.navigation.input.endFrame()');assert page.evaluate('__marina.yacht.fly')
      page.keyboard.press('f');page.evaluate('__marina.navigation.input.hit("KeyF")&&__marina.toggleMovement();__marina.navigation.input.endFrame()');assert not page.evaluate('__marina.yacht.fly')
      page.keyboard.press('e');page.evaluate('__marina.navigation.update(.05)');assert not page.evaluate('__marina.yacht.inside')
      page.evaluate('__marina.yacht.runtime.setAuditMode(false);__marina.yacht.go("salon");__marina.yacht.runtime.whenAppearanceReady()');page.evaluate('__marina.render()')
      if args.mode=='recovery':
       # R uses the actual aimed interaction path, including an intermediate door pose.
       page.evaluate('__marina.yacht.runtime.setAuditMode(true);__marina.yacht.go("cockpit");if(__marina.yacht.runtime.report().movers.find(m=>m.name==="Port_twin_entry_hinge").target>.5)__marina.yacht.runtime.toggle("Port_twin_entry_hinge");for(let i=0;i<100;i++)__marina.navigation.update(1/60)')
       page.evaluate('__marina.yacht.go("port-twin")');case['door_aim']=page.evaluate('__marina.yacht.runtime.aim("Port_twin_entry_hinge")')
       assert case['door_aim']['nearest']=='Port_twin_entry_hinge'
       page.keyboard.press('r');page.evaluate('for(let i=0;i<100;i++)__marina.navigation.update(1/60)')
       case['door_after_R']=page.evaluate('__marina.yacht.runtime.report().movers.find(m=>m.name==="Port_twin_entry_hinge")');assert case['door_after_R']['fraction']>.99
       page.set_viewport_size({'width':390,'height':844});page.evaluate('__marina.yacht.go("cockpit")');before=page.evaluate('__marina.yacht.runtime.report().foot')
       page.add_style_tag(content='body > :not(#app){pointer-events:none!important}');assert page.evaluate('document.elementFromPoint(55,450).tagName')=='CANVAS'
       session=page.context.new_cdp_session(page);session.send('Emulation.setTouchEmulationEnabled',{'enabled':True})
       session.send('Input.dispatchTouchEvent',{'type':'touchStart','touchPoints':[{'x':55,'y':450,'id':1}]});session.send('Input.dispatchTouchEvent',{'type':'touchMove','touchPoints':[{'x':55,'y':390,'id':1}]});page.wait_for_function('__marina.navigation.touchKeys.has("KeyW")');page.evaluate('for(let i=0;i<20;i++)__marina.navigation.update(1/60)');session.send('Input.dispatchTouchEvent',{'type':'touchEnd','touchPoints':[]})
       after=page.evaluate('__marina.yacht.runtime.report().foot');case['touch_metres']=float(np.linalg.norm(np.array(before)-after));case['touch_keys_released']=page.evaluate('__marina.navigation.touchKeys.size===0');assert case['touch_metres']>.05 and case['touch_keys_released']
       page.evaluate('__marina.yacht.runtime.setAuditMode(false);__marina.yacht.go("salon");__marina.yacht.runtime.whenAppearanceReady()');page.evaluate('__marina.render()')
       page.evaluate('window.__lossExtension=__marina.engine.glRenderer.getContext().getExtension("WEBGL_lose_context");__lossExtension.loseContext()');page.wait_for_function('__marina.engine.glRenderer.getContext().isContextLost()');page.wait_for_timeout(250);page.evaluate('__lossExtension.restoreContext()')
       page.wait_for_function('!__marina.engine.glRenderer.getContext().isContextLost()&&document.querySelector("#status").hidden',timeout=300000)
       page.evaluate('__marina.render()');case['restored']=snapshot(page);assert not case['restored']['contextLost']and not case['restored']['error']
       case['restored_mask']=page.evaluate('''()=>{const r=__marina.engine.glRenderer,g=r.getContext(),old=r.getRenderTarget(),t=__marina.yacht.runtime.output.maskTarget;r.setRenderTarget(t);const result={complete:g.checkFramebufferStatus(g.FRAMEBUFFER)===g.FRAMEBUFFER_COMPLETE,format:t.texture.format,internalFormat:t.texture.internalFormat,width:t.width,height:t.height,error:g.getError()};r.setRenderTarget(old);return result}''')
       assert case['restored_mask']['complete']and case['restored_mask']['format']==1028 and case['restored_mask']['internalFormat']=='R8'and case['restored_mask']['error']==0
      state=snapshot(page);assert not state['contextLost']and not state['error'];case['final']=state
     assert not case['errors']and not case['missing'],case;case['passed']=True;save()
    finally:b.close()
  report['completed']=True;save();print(args.mode.upper()+'_PASSED',flush=True)
 except Exception as e:report.update(exception=str(e),traceback=traceback.format_exc());save();raise
