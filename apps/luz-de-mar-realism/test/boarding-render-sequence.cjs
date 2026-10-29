// Actually render every moved camera pose; do not report a batch of unrendered
// nav updates as a walking performance measurement. Software timings only.
const {chromium}=require('/opt/codex/cua_node/lib/node_modules/playwright');
const fs=require('node:fs/promises'),assert=require('node:assert/strict');
(async()=>{
 const base=process.env.BOARDING_URL||'http://127.0.0.1:5261/';
 const browser=await chromium.launch({executablePath:'/usr/bin/chromium',headless:true,
  args:['--use-angle=swiftshader','--enable-unsafe-swiftshader','--disable-gpu-watchdog']});
 const page=await browser.newPage({viewport:{width:900,height:600},deviceScaleFactor:1});
 const errors=[];page.on('pageerror',e=>errors.push(String(e)));
 try{
  await page.goto(base+'?room=cockpit&release=boarding-vr-r01',{waitUntil:'domcontentloaded'});
  await page.waitForFunction(()=>window.__yachtRealism?.status==='ready',null,{timeout:240000});
  await page.evaluate(async()=>{__yachtRealism.setFixedRatio(1);await __yachtRealism.app.stream.ensure('beach-club');});
  const result=await page.evaluate(async()=>{
   const viewer=__yachtRealism,a=viewer.app,gl=a.renderer.getContext();
   const extension=gl.getExtension('WEBGL_debug_renderer_info');
   const renderer=extension?gl.getParameter(extension.UNMASKED_RENDERER_WEBGL):gl.getParameter(gl.RENDERER);
   a.nav.setZone('cockpit',[3.8,2.72]);a.nav.move(0,.68);
   const samples=[];
   for(let i=0;i<32;i++){
    a.nav.move(i<16?-.20:.20,0);
    const [x,y]=a.nav.position,z=a.nav.elevation+1.62;
    viewer.captureView([x,y,z],[x-2,y+.12*Math.sin(i/5),z-.3],72);
    const start=performance.now();await viewer.draw();
    samples.push({completedFrameMs:performance.now()-start,position:[x,y],...viewer.stats});
   }
   const sorted=samples.map(s=>s.completedFrameMs).sort((a,b)=>a-b);
   return{renderer,viewport:[900,600],dpr:1,frames:samples.length,
    p50:sorted[Math.floor(sorted.length*.5)],p95:sorted[Math.floor(sorted.length*.95)],
    samples,method:'Sequential camera movement + actual render + gl.finish; includes scheduling and software GPU completion, not hardware FPS.'};
  });
  assert.equal(result.frames,32);assert.ok(result.samples.every(s=>s.calls<=120&&s.triangles<=1e6));
  assert.ok(result.samples.every(s=>s.canvas[0]===900&&s.canvas[1]===600));
  assert.deepEqual(errors,[]);result.pass=true;
  await fs.writeFile('work/boarding-vr-r01/render-sequence.json',JSON.stringify(result,null,2)+'\n');
  console.log(JSON.stringify({pass:true,frames:32,p50:result.p50,p95:result.p95,renderer:result.renderer}));
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
