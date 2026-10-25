const{chromium}=require('playwright'),fs=require('node:fs'),assert=require('node:assert/strict');
const W=process.env.PEDESTAL_WORK||'/tmp/ldm-pedestal-r01',base=process.env.PEDESTAL_BASE||'http://127.0.0.1:5291/site/luz-de-mar-realism/',report={renderer:'Chromium / SwiftShader; correctness only',errors:[],views:[]};
fs.mkdirSync(W+'/captures',{recursive:true});
if(process.env.PEDESTAL_REUSE_BASELINE==='1'){const old=JSON.parse(fs.readFileSync(W+'/viewer-proof.json'));report.before=old.before;report.views=old.views.filter(v=>v.stage==='before');}
(async()=>{const browser=await chromium.launch({executablePath:'/usr/bin/chromium',headless:true,args:['--use-angle=swiftshader','--enable-unsafe-swiftshader','--disable-gpu-watchdog']});try{
for(const stage of process.env.PEDESTAL_REUSE_BASELINE==='1'?['candidate']:['before','candidate']){
 const page=await browser.newPage({viewport:{width:900,height:600}});page.setDefaultTimeout(300000);page.on('pageerror',e=>report.errors.push(e.message));
 const meta=JSON.parse(fs.readFileSync(W+'/baseline/room.json'));if(stage==='candidate')meta.electricalAppearance.hashes['electrical.glb']=JSON.parse(fs.readFileSync(W+'/repair.json')).runtimeSHA256;
 await page.route('**/assets/machinery/room.json?*',r=>r.fulfill({contentType:'application/json',body:JSON.stringify(meta)}));
 await page.route('**/assets/machinery/electrical-vr-r01/electrical.glb?*',r=>r.fulfill({contentType:'model/gltf-binary',body:fs.readFileSync(W+(stage==='before'?'/baseline':'')+'/electrical.glb')}));
 await page.goto(base+'?room=machinery&engine=right-vr-r01&bulkhead=vr-r01&electrical=generator-r01');await page.waitForFunction(()=>window.__yachtRealism);await page.evaluate(()=>__yachtRealism.setFixedRatio(.5));
 await page.waitForFunction(()=>__yachtRealism.status==='ready'&&__yachtRealism.stats.machinery.bulkhead?.committed&&__yachtRealism.stats.machinery.installed.ready&&__yachtRealism.stats.machinery.installedRight.ready);
 await page.addStyleTag({content:'.topbar,.room-caption,.room-actions,.touch-pad,.inspector,#notice{visibility:hidden!important}'});
 await page.evaluate(async()=>{window.__diagnosticThree=await import('/apps/luz-de-mar-realism/node_modules/three/build/three.module.js');__yachtRealism.setFixedRatio(null);__yachtRealism.setResolutionMode('sharp');const a=__yachtRealism.app;a.renderer.toneMappingExposure=a.exposureTarget;});
 async function capture(id,position,target){await page.evaluate(([p,t])=>__yachtRealism.captureView(p,t,58),[position,target]);await page.evaluate(()=>__yachtRealism.draw());const result=await page.evaluate(()=>{const a=__yachtRealism.app;a.renderer.render(a.scene,a.camera);return{png:a.renderer.domElement.toDataURL(),canvas:__yachtRealism.stats.canvas};});fs.writeFileSync(W+'/captures/'+stage+'-'+id+'.png',Buffer.from(result.png.split(',')[1],'base64'));report.views.push({stage,id,position,target,canvas:result.canvas});}
 for(const [id,position]of [['front',[9.15,0,3.18]],['left',[9.15,-.35,3.18]],['right',[9.15,.35,3.18]],['near',[8.65,0,3.18]]])await capture(id,position,[7.78,0,1.78]);
 const rays=await page.evaluate(()=>{const{Vector3,Raycaster}=__diagnosticThree,a=__yachtRealism.app;a.scene.updateMatrixWorld(true);const objects=[];a.scene.traverse(o=>{if(!o.isMesh)return;for(let p=o;p;p=p.parent)if(!p.visible)return;if(o.material?.transparent)return;objects.push(o);});const rows=[];
  for(const lateral of[-.35,0,.35])for(const side of[-1,1])for(let j=0;j<15;j++){
   const origin=new Vector3(lateral*7.47/7.6,1.17,9.15*35.23/36-17.615),target=new Vector3(side*.845,-.232,-9.86-j*.040),ray=new Raycaster(origin,target.clone().sub(origin).normalize()),hits=ray.intersectObjects(objects,false),first=hits[0];
   rows.push({lateral,side,j,first:first?.object.userData.componentID||first?.object.name,coplanarHits:hits.filter(h=>first&&Math.abs(h.distance-first.distance)<.0002).length});
  }return rows;});
 report[stage]={rays,runtimeSHA256:meta.electricalAppearance.hashes['electrical.glb']};if(stage==='candidate'){for(const[r,i]of rays.map((r,i)=>[r,i])){if(report.before.rays[i].coplanarHits>1)assert.equal(r.first,'EVR/vented-pedestal-union');else assert.equal(r.first,report.before.rays[i].first,'A legitimately occluded ray must retain its original first surface');}assert(rays.every(r=>r.coplanarHits===1));report.visibleStripRays=report.before.rays.filter(r=>r.coplanarHits>1).length;report.contextOccludedRays=rays.length-report.visibleStripRays;}
 else assert(rays.filter(r=>r.coplanarHits>1).length>60,'Baseline must reproduce duplicate visible surfaces');
 if(stage==='candidate'){
  await capture('motion-start',[9.15,0,3.18],[7.78,0,1.78]);
  const motion=await page.evaluate(()=>{const a=__yachtRealism.app,rows=[];a.controls.clear();for(let i=0;i<16;i++){a.camera.position.x+=.002;a.camera.rotateY(.0003);a.renderer.render(a.scene,a.camera);rows.push([a.renderer.domElement.width,a.renderer.domElement.height]);}const moving=a.renderer.domElement.toDataURL();a.renderer.render(a.scene,a.camera);return{dimensions:rows,moving,still:a.renderer.domElement.toDataURL()};});assert.equal(motion.moving,motion.still);assert(motion.dimensions.every(v=>v[0]===900&&v[1]===600));report.motion={frames:16,canvas:[900,600],sameCameraIdenticalPixels:true,fixedRatioOverride:false};
  fs.writeFileSync(W+'/captures/candidate-motion-end.png',Buffer.from(motion.moving.split(',')[1],'base64'));
  const idImage=await page.evaluate(()=>{const a=__yachtRealism.app,parts=[];a.scene.traverse(o=>{if(o.userData.componentID==='EVR/vented-pedestal-union')parts.push(o);});const old=parts.map(o=>o.material),mat=new __diagnosticThree.MeshBasicMaterial({color:0x00ff00});parts.forEach(o=>o.material=mat);a.renderer.render(a.scene,a.camera);const image=a.renderer.domElement.toDataURL();parts.forEach((o,i)=>o.material=old[i]);mat.dispose();return image;});fs.writeFileSync(W+'/captures/candidate-identifiers.png',Buffer.from(idImage.split(',')[1],'base64'));
 }
 report[stage].stats=await page.evaluate(()=>__yachtRealism.stats);await page.close();console.log('CHECKED',stage);
}
assert.deepEqual(report.errors,[]);report.pass=true;
}finally{await browser.close();fs.writeFileSync(W+'/viewer-proof.json',JSON.stringify(report,null,2)+'\n');}})().catch(e=>{console.error(e);process.exitCode=1});
