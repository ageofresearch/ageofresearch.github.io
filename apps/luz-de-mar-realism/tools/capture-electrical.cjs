// All eight comparisons use the same source station, fixed FOVs and actual WebGL pixels.
const {chromium}=require('playwright'),fs=require('node:fs'),path=require('node:path');
const base=process.argv[2]||'http://127.0.0.1:5251/',out=path.resolve(process.argv[3]||'work/electrical-vr-r01/review/candidate'),evidence=JSON.parse(fs.readFileSync(path.resolve(process.env.ELECTRICAL_AUTHORING_WORK||'work/electrical-vr-r01','evidence-frozen.json')));
const lower=path.resolve(process.env.ELECTRICAL_AUTHORING_WORK||'work/electrical-vr-r01','lower-evidence.json');if(fs.existsSync(lower))evidence.poses.push(...JSON.parse(fs.readFileSync(lower)).poses);
fs.mkdirSync(out,{recursive:true});const candidate=process.env.BASELINE!=='1',report=(process.env.NATIVE_ONLY==='1'||process.env.APPEND==='1')?JSON.parse(fs.readFileSync(path.join(out,'report.json'))):{url:base,candidate,camera:evidence.camera,views:[],errors:[],renderer:'Chromium SwiftShader; correctness only, not hardware FPS'};
(async()=>{const remote=base.startsWith('https:'),browser=await chromium.launch({executablePath:'/usr/bin/chromium',headless:true,...remote?{proxy:{server:process.env.HTTPS_PROXY||'http://proxy:8080'}}:{},args:['--use-angle=swiftshader','--enable-unsafe-swiftshader','--disable-gpu-watchdog']});
try{
 const page=await browser.newPage({viewport:{width:1200,height:800},deviceScaleFactor:1});page.setDefaultTimeout(600000);page.on('pageerror',e=>report.errors.push(e.message));
 if(remote)await page.route('https://ageofresearch.github.io/**',async route=>route.fulfill({response:await route.fetch({timeout:180000})}));
 await page.goto(base+'?room=machinery&engine=right-vr-r01&bulkhead=vr-r01'+(candidate?'&electrical='+(process.env.ELECTRICAL_QUERY||'vr-r01'):''),{waitUntil:'domcontentloaded'});await page.waitForFunction(()=>!!window.__yachtRealism);await page.evaluate(()=>__yachtRealism.setFixedRatio(.5));
 await page.waitForFunction(()=>__yachtRealism.status==='ready'&&[__yachtRealism.app.room.machinery.installed,__yachtRealism.app.room.machinery.installedRight].every(e=>e?.ready));
 await page.evaluate(async()=>{for(const e of[__yachtRealism.app.room.machinery.installed,__yachtRealism.app.room.machinery.installedRight]){await e.detail();await Promise.all([...e.loadingLods.values()]);}});
 await page.waitForFunction(()=>__yachtRealism.stats.machinery.bulkhead?.committed);
 report.runtimeGeometrySHA256=await page.evaluate(()=>__yachtRealism.app.room.meta.electricalAppearance?.hashes['electrical.glb']||null);
 await page.addStyleTag({content:'.topbar,.room-caption,.room-actions,.touch-pad,.inspector,#notice{visibility:hidden!important}'});
 await page.evaluate(()=>{__yachtRealism.setFixedRatio(1);const a=__yachtRealism.app;a.renderer.toneMappingExposure=a.exposureTarget;});
 for(const pose of evidence.poses){
  if(process.env.NATIVE_ONLY==='1')continue;
  if(process.env.CAPTURE_POSES&&!process.env.CAPTURE_POSES.split(',').includes(pose.id))continue;
  const h=pose.h*Math.PI/180,v=pose.v*Math.PI/180,position=pose.position||evidence.camera.sourcePosition,d=[Math.cos(v)*Math.cos(h),-Math.cos(v)*Math.sin(h),-Math.sin(v)],target=pose.target||[position[0]+d[0]/(35.23/36),position[1]+d[1]/(7.47/7.6),position[2]+d[2]];
  await page.evaluate(([p,t,f])=>__yachtRealism.captureView(p,t,f),[position,target,pose.vfov]);await page.evaluate(()=>__yachtRealism.draw());
  await page.evaluate(async()=>{for(const e of[__yachtRealism.app.room.machinery.installed,__yachtRealism.app.room.machinery.installedRight])await Promise.all([...e.loadingLods.values()]);});await page.evaluate(()=>__yachtRealism.draw());
  await page.screenshot({path:path.join(out,pose.id+'.png'),timeout:180000});report.views=report.views.filter(v=>v.id!==pose.id);report.views.push({...pose,position,target,stats:await page.evaluate(()=>__yachtRealism.stats)});fs.writeFileSync(path.join(out,'report.json'),JSON.stringify(report,null,2));console.log('CAPTURED',pose.id);
 }
 if(process.env.NATIVE==='1'){
  await page.setViewportSize({width:2048,height:2048});
  for(const [face,target]of [['b',[9.15-1/(35.23/36),0,3.18]],['r',[9.15,-1/(7.47/7.6),3.18]],['u',[9.15,0,4.18]],['d',[9.15,0,2.18]],['l',[9.15,1/(7.47/7.6),3.18]]]){
   if(process.env.NATIVE_FACES&&!process.env.NATIVE_FACES.split(',').includes(face))continue;
   await page.evaluate(([t,f])=>{const a=__yachtRealism.app;a.camera.up.set(...(f==='u'?[0,0,-1]:f==='d'?[0,0,1]:[0,1,0]));__yachtRealism.setFixedRatio(1);__yachtRealism.captureView([9.15,0,3.18],t,90);a.camera.up.set(0,1,0);a.renderer.setScissorTest(false);},[target,face]);await page.evaluate(()=>__yachtRealism.draw());
   const native=await page.evaluate(()=>{const a=__yachtRealism.app;a.renderer.render(a.scene,a.camera);a.renderer.getContext().finish();return{pixels:a.renderer.domElement.toDataURL(),canvas:__yachtRealism.stats.canvas,position:a.camera.position.toArray(),quaternion:a.camera.quaternion.toArray(),exposure:a.renderer.toneMappingExposure};});
   const png=Buffer.from(native.pixels.split(',')[1],'base64'),stats=await require('sharp')(png).stats();if(!stats.channels.slice(0,3).some(c=>c.stdev>5))throw Error('Native capture is empty');fs.writeFileSync(path.join(out,'native-'+face+'.png'),png);delete native.pixels;(report.native??={})[face]={...native,sourcePosition:[9.15,0,3.18],hfov:90,vfov:90,readWithinRenderTurn:true};console.log('CAPTURED native',face);
  }
 }

 if(process.env.MOTION_CHECK==='1'){
  await page.setViewportSize({width:600,height:400});await page.evaluate(()=>{__yachtRealism.setFixedRatio(null);__yachtRealism.setResolutionMode('sharp');const a=__yachtRealism.app;a.controls.focus([9.15,0,3.18],[7.8,0,2.8]);a.renderer.toneMappingExposure=a.exposureTarget;window.__finalMotion=null;const update=a.controls.update.bind(a.controls),render=a.renderer.render.bind(a.renderer);window.__finalUpdate=update;window.__finalRender=render;let count=0;a.controls.update=()=>update(1/120);a.renderer.render=(s,c)=>{render(s,c);if(a.controls.keys.has('KeyW')&&++count===30){window.__finalMotion={pixels:a.renderer.domElement.toDataURL(),canvas:[a.renderer.domElement.width,a.renderer.domElement.height],position:c.position.toArray(),quaternion:c.quaternion.toArray()};a.controls.clear();}};a.controls.keys.add('KeyW');a.invalidate(true);});
  await page.waitForFunction(()=>!!window.__finalMotion);await page.waitForFunction(()=>!__yachtRealism.app.raf&&__yachtRealism.app.lastTime===null);
  const result=await page.evaluate(()=>{const a=__yachtRealism.app;__finalRender(a.scene,a.camera);a.renderer.getContext().finish();const still={pixels:a.renderer.domElement.toDataURL(),canvas:[a.renderer.domElement.width,a.renderer.domElement.height],position:a.camera.position.toArray(),quaternion:a.camera.quaternion.toArray()};a.controls.update=__finalUpdate;return{moving:__finalMotion,still};});if(JSON.stringify(result.moving)!==JSON.stringify(result.still))throw Error('Final moving/still image differs at identical camera');
  for(const stage of['moving','still'])fs.writeFileSync(path.join(out,stage+'.png'),Buffer.from(result[stage].pixels.split(',')[1],'base64'));report.motionCheck={sameCamera:true,canvas:result.still.canvas,identicalPixels:true,renderer:'SwiftShader',fixedRatioOverride:false,mode:'Nitidez'};console.log('PASS FINAL SAME-CAMERA MOTION');
 }
 report.pass=!report.errors.length;
}finally{for(const context of browser.contexts())for(const page of context.pages())try{report.finalState=await page.evaluate(()=>({status:window.__yachtRealism?.status,stats:window.__yachtRealism?.stats,detail:document.querySelector('#loading-detail')?.textContent}));}catch{}await browser.close();fs.writeFileSync(path.join(out,'report.json'),JSON.stringify(report,null,2));}})().catch(error=>{console.error(error);process.exitCode=1});
