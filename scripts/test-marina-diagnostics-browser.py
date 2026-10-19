"""Exercise diagnostic controls with synthetic counters, without large allocations.

Requires Python Playwright and Chromium. This verifies pause policy and reporting,
not physical GPU memory, yacht performance, or the user's Mac.
"""
import argparse
import json
import mimetypes
from pathlib import Path
import shutil
from urllib.parse import unquote, urlsplit

from playwright.sync_api import sync_playwright

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--output-dir', required=True)
parser.add_argument('--chromium-path', default=shutil.which('chromium'))
args = parser.parse_args()
site = Path(__file__).resolve().parents[1] / 'site/marina-casa-de-campo'
out = Path(args.output_dir)
out.mkdir(parents=True, exist_ok=True)
origin = 'https://marina-diagnostics.test'
result = {'scope': __doc__, 'cases': []}

def html(module):
    return '''<!doctype html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"></head><body><script>
window.__heap=391*1024*1024;
Object.defineProperty(performance,'memory',{get:()=>({usedJSHeapSize:__heap})});
window.__shortcut=0;document.addEventListener('keydown',()=>__shortcut++);
window.__marina={engine:{_running:true,callback:()=>{},pacingStats:{submitted:0},stop(){this._running=false},start(){this._running=true}},yacht:{state:'loading'},navigation:{mode:'fly'}};
function frame(){if(__marina.engine._running)__marina.engine.pacingStats.submitted++;requestAnimationFrame(frame)}requestAnimationFrame(frame);
const gl={TEXTURE0:0,TEXTURE_2D:1,RGBA8:2,RENDERER:3,VENDOR:4,TEXTURE_CUBE_MAP_POSITIVE_X:100,TEXTURE_CUBE_MAP_NEGATIVE_Z:105,
activeTexture(){},bindTexture(){},texStorage2D(){},isContextLost(){return false},getExtension(){return null},getParameter(k){return k===3?'synthetic renderer':'test'}};
const original=HTMLCanvasElement.prototype.getContext;
HTMLCanvasElement.prototype.getContext=function(type,...rest){return type==='webgl2'?gl:original.call(this,type,...rest)};
window.__originalContext=HTMLCanvasElement.prototype.getContext;
window.__setGPU=mb=>{if(!window.__testGL){window.__testGL=document.createElement('canvas').getContext('webgl2');__testGL.bindTexture(gl.TEXTURE_2D,{})}__testGL.texStorage2D(gl.TEXTURE_2D,1,gl.RGBA8,1024,mb*256)};
</script><script type="module" src="/assets/''' + module + '''"></script></body></html>'''

def new_page(browser, module='marina-diagnostics-v3.mjs', diagnostics=True, blocked=False):
    context = browser.new_context(viewport={'width': 1280, 'height': 720}, permissions=['clipboard-read', 'clipboard-write'])
    page = context.new_page()
    errors = []
    page.on('pageerror', lambda e: errors.append(str(e)))
    if blocked:
        page.add_init_script("Object.defineProperty(navigator,'clipboard',{value:undefined});Storage.prototype.getItem=Storage.prototype.setItem=function(){throw Error('Storage blocked for test')}")
    def route(r):
        u = urlsplit(r.request.url)
        if u.hostname != 'marina-diagnostics.test':
            r.abort()
            return
        if u.path == '/':
            r.fulfill(status=200, content_type='text/html', body=html(module))
            return
        path = (site / unquote(u.path).lstrip('/')).resolve()
        if not path.is_relative_to(site.resolve()) or not path.is_file():
            r.fulfill(status=404, body='Missing local file')
            return
        r.fulfill(status=200, content_type='text/javascript' if path.suffix in ['.js', '.mjs'] else mimetypes.guess_type(path.name)[0], body=path.read_bytes())
    page.route('**/*', route)
    page.goto(origin + ('/?diagnostics=1' if diagnostics else '/'))
    if diagnostics:
        page.wait_for_selector('#marina-memory-panel')
        page.evaluate("__setGPU(778);__marina.yacht.state='ready';__marinaDiagnostics.sample()")
    return context, page, errors

with sync_playwright() as p:
    browser = p.chromium.launch(executable_path=args.chromium_path, headless=True, args=['--no-sandbox', '--disable-dev-shm-usage'])
    try:
        # Positive control: the previously published monitor stops on this path.
        context, page, errors = new_page(browser, 'marina-diagnostics-v2.mjs')
        page.evaluate('__setGPU(1062);__marinaDiagnostics.sample()')
        assert not page.evaluate('__marina.engine._running')
        assert page.evaluate('__marinaDiagnostics.report().animation.pauseKind') == 'automatic'
        assert not errors, errors
        result['cases'].append({'name': 'v2 reproduces GPU-threshold pause', 'passed': True})
        context.close()

        context, page, errors = new_page(browser)
        assert not page.locator('[data-auto]').is_checked()
        assert not page.evaluate('__marinaDiagnostics.report().automaticPause.enabled')
        page.evaluate('__setGPU(1062);__marinaDiagnostics.sample()')
        assert page.evaluate('__marina.engine._running')
        page.wait_for_selector('[data-growth]:visible')
        assert 'WebGL estimate grew by 284.0 MiB' in page.locator('[data-growth]').inner_text()
        assert 'Movement continues' in page.locator('[data-growth]').inner_text()
        before = page.evaluate('__marina.engine.pacingStats.submitted')
        page.wait_for_function('n=>__marina.engine.pacingStats.submitted>n', arg=before)
        # Transient heap growth also warns without stopping the engine.
        page.evaluate('__heap=700*1024*1024;for(let i=0;i<750;i++)__marinaDiagnostics.sample()')
        assert page.evaluate('__marina.engine._running')
        assert not page.evaluate('__marinaDiagnostics.report().animation.pausedByDiagnostics')
        assert page.evaluate('__marinaDiagnostics.report().samples.length') == 600
        page.locator('[data-copy]').click()
        copied = json.loads(page.evaluate('navigator.clipboard.readText()'))
        assert copied['memoryGrowth']['signals'] == ['JS heap', 'WebGL estimate']
        assert copied['automaticPause']['defaultEnabled'] is False
        assert copied['latest']['pausedByDiagnostics'] is False
        assert len(copied['timeline']) <= 61
        assert 'webGLRenderbufferMiB' in copied['timelineColumns']
        assert all(len(row) == len(copied['timelineColumns']) for row in copied['timeline'])
        assert not any(e['type'] == 'pause' for e in copied['events'])
        page.screenshot(path=str(out / 'warning-movement-running.png'))

        # A warning clears when counters fall, without requiring a new baseline.
        page.evaluate('__heap=391*1024*1024;__setGPU(778);__marinaDiagnostics.sample()')
        assert page.locator('[data-growth]').is_hidden()
        assert page.evaluate('__marina.engine._running')
        page.evaluate('__heap=undefined;__setGPU(1062);__marinaDiagnostics.sample()')
        assert page.evaluate('__marinaDiagnostics.report().memoryGrowth.signals') == ['WebGL estimate']
        assert page.evaluate('__marinaDiagnostics.report().memoryGrowth.heapDeltaBytes') is None
        assert page.evaluate('__marina.engine._running')
        page.evaluate('__heap=391*1024*1024;__setGPU(778);__marinaDiagnostics.sample()')

        # Explicit opting in retains the guard and an informative pause reason.
        page.locator('[data-auto]').check()
        page.evaluate('__setGPU(1062);__marinaDiagnostics.sample()')
        assert not page.evaluate('__marina.engine._running')
        paused = page.evaluate('__marinaDiagnostics.report()')
        assert paused['animation']['pauseKind'] == 'automatic'
        assert paused['latest']['pausedByDiagnostics'] is True
        assert paused['latest']['animationRunning'] is False
        assert 'WebGL estimate grew by 284.0 MiB' in paused['animation']['pauseReason']
        page.evaluate('__marina.engine.start(__marina.engine.callback)')
        assert not page.evaluate('__marina.engine._running')
        page.locator('[data-copy]').click()
        assert 'paused automatically' in page.locator('[data-render-state]').inner_text()
        page.locator('[data-pause]').click()
        page.evaluate('__marinaDiagnostics.sample()')
        assert page.evaluate('__marina.engine._running')
        assert not page.evaluate('__marinaDiagnostics.report().memoryGrowth.exceeded')

        page.locator('[data-pause]').click()
        assert page.evaluate('__marinaDiagnostics.report().animation.pauseKind') == 'manual'
        page.evaluate('__marina.engine.start(__marina.engine.callback)')
        assert not page.evaluate('__marina.engine._running')
        page.locator('[data-pause]').click()
        assert page.evaluate('__marina.engine._running')
        page.locator('[data-copy]').focus()
        shortcut = page.evaluate('__shortcut')
        page.keyboard.press('f')
        assert page.evaluate('__shortcut') == shortcut
        page.locator('[data-copy]').click()
        previous_session = page.evaluate('__marinaDiagnostics.report().session')
        stored = page.evaluate('localStorage.getItem("marina.memory-diagnostics.v1")')
        assert len(stored) < 128000 and len(json.loads(stored)['samples']) <= 12
        page.reload()
        page.wait_for_selector('#marina-memory-panel')
        assert not page.locator('[data-auto]').is_checked(), 'A stored report must not enable stopping on reload'
        page.locator('[data-previous]').click()
        recovered = json.loads(page.evaluate('navigator.clipboard.readText()'))
        assert recovered['session'] == previous_session and recovered['recovery']
        page.set_viewport_size({'width': 375, 'height': 812})
        box = page.locator('#marina-memory-panel').bounding_box()
        assert box['x'] >= 0 and box['x'] + box['width'] <= 375 and box['y'] + box['height'] <= 812
        assert not errors, errors
        result['cases'].append({'name': 'v3 warning without interruption, explicit auto/manual pause, resume guard, clear warning, compact report, bounded storage, recovery, shortcuts, mobile', 'passed': True, 'growth_report': copied})
        context.close()

        context, page, errors = new_page(browser, diagnostics=False)
        assert not page.locator('#marina-memory-panel').count()
        assert page.evaluate('window.__marinaDiagnostics===undefined&&HTMLCanvasElement.prototype.getContext===__originalContext')
        assert not errors, errors
        result['cases'].append({'name': 'ordinary visit has no monitor or instrumentation', 'passed': True})
        context.close()

        context, page, errors = new_page(browser, blocked=True)
        page.locator('[data-copy]').click()
        assert json.loads(page.locator('textarea').input_value())['build'] == 'marina-diagnostics-v3'
        assert not page.evaluate('__marinaDiagnostics.report().storageAvailable')
        assert page.evaluate('__marina.engine._running')
        assert not errors, errors
        result['cases'].append({'name': 'blocked clipboard and local storage fallback', 'passed': True})
        context.close()
        result['completed'] = True
    finally:
        browser.close()
        (out / 'BROWSER-CHECK.json').write_text(json.dumps(result, indent=2) + '\n')

print(json.dumps({'completed': result['completed'], 'cases': [{'name': c['name'], 'passed': c['passed']} for c in result['cases']]}))
