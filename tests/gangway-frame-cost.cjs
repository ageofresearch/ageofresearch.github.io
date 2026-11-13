const { chromium } = require('playwright-core');
(async()=>{
  const b=await chromium.launch({channel:'chrome',headless:true,args:['--enable-unsafe-webgpu','--enable-unsafe-swiftshader','--use-angle=swiftshader','--enable-features=Vulkan','--use-vulkan=swiftshader','--disable-vulkan-surface','--disable-gpu-watchdog']});
  try{
    const page=await b.newPage({viewport:{width:390,height:844},deviceScaleFactor:1,hasTouch:true});
    page.on('pageerror',e=>console.error('PAGE ERROR',e.message));
    page.on('console',m=>{if(m.type()==='error')console.error('BROWSER',m.text().slice(0,330));});
    const resources=new Set();page.on('request',r=>resources.add(new URL(r.url()).pathname));
    await page.goto('http://localhost:8874/tidewater-rocha/mobile.html?world=rocha');
    const f=page.frames().find(f=>f.url().includes('scene=gangway'));
    await f.waitForFunction(()=>window.__app?.startupStats || window.__mapsPublicStatus?.status==='unsupported',null,{timeout:180000});
    console.log('META', await f.evaluate(()=>{
      const a=window.__app;
      if(!a?.gangwayOnly)throw Error(JSON.stringify(window.__mapsPublicStatus));
      a.engine.stop();const info=a.gpu.adapter.info;
      return JSON.stringify({width:a.engine.width,height:a.engine.height,adapter:[info.vendor,info.architecture,info.device,info.description],timestamp:a.gpu.hasTimestamp,
        mesh:a.entranceYacht.stats,shadow:a.shadows.size,shutter:a.post.motionBlur.shutter.value,aoSamples:a.post.aoPass.samples.value,bloom:a.post._bloomPasses.length,scale:a.post.scale,active:a.engine.renderOptimizations});
    }));
    console.log('OTHER_MODEL', [...resources].filter(p=>/\/(model\.(bin|json)|main-[^/]*\.js)$/.test(p)));
    await f.evaluate(async()=>{
      const a=window.__app,p=a.post;
      await a.gpu.queue.onSubmittedWorkDone();
      window.runSample=async(mode,count,warm=3)=>{
        const revert=[];
        const replace=(o,k,v)=>{const old=o[k];o[k]=v;revert.push(()=>o[k]=old);};
        const noop=()=>{};
        if(mode==='no-post')replace(p,'render',noop);
        if(mode==='no-shadow-update')replace(a.shadows,'render',noop);
        if(mode==='no-mesh')replace(a.entranceYacht.group,'visible',false);
        if(mode==='no-ao')for(const object of [p._aoDepthPass,p.aoPass,p._aoBlurXPass,p._aoBlurYPass])replace(object,'render',noop);
        if(mode==='no-bloom')replace(p,'_bloomPasses',[]);
        if(mode==='no-taa')replace(p.taau,'render',noop);
        if(mode==='no-motion')replace(p.motionBlur.shutter,'value',0);
        if(mode==='half-size')a.engine.setRenderScale(.5);
        let wall=[],cpu=[];
        try{
          for(let i=-warm;i<count;i++){
            const start=performance.now();a.frame(1/60);const encoded=performance.now();
            await a.gpu.queue.onSubmittedWorkDone();const end=performance.now();
            if(i>=0){wall.push(end-start);cpu.push(encoded-start);}
          }
        }finally{revert.reverse().forEach(fn=>fn());if(mode==='half-size')a.engine.setRenderScale(1);}
        return {wall,cpu};
      };
      await window.runSample('baseline',4,12);
    });
    // Count actual pass/copy commands on four consecutive stationary frames, after warmup.
    const trace=await f.evaluate(async()=>{
      const a=window.__app,proto=GPUCommandEncoder.prototype,out=[];
      for(let frame=0;frame<4;frame++){
        const row={r:[],c:[],copies:[]},prev={};
        for(const key of ['beginRenderPass','beginComputePass','copyTextureToTexture']){
          prev[key]=proto[key];proto[key]=function(...args){
            if(key==='copyTextureToTexture'){const [src,dst,size]=args;row.copies.push([src.texture.label,dst.texture.label,size.width,size.height]);}
            else row[key==='beginRenderPass'?'r':'c'].push(args[0]?.label||'?');
            return prev[key].apply(this,args);
          };
        }
        try{a.frame(1/60);await a.gpu.queue.onSubmittedWorkDone();}
        finally{Object.assign(proto,prev);}out.push(row);
      }return out;
    });
    console.log('TRACE',JSON.stringify(trace));
    const first=['baseline','no-mesh','no-post','no-shadow-update','no-bloom','no-ao','no-taa','no-motion','half-size','baseline'];
    const second=['baseline','half-size','no-motion','no-taa','no-ao','no-bloom','no-shadow-update','no-post','no-mesh','baseline'];
    const all={};
    for(const mode of [...first,...second]){
      const res=await f.evaluate(mode=>window.runSample(mode,8,3),mode);
      const result=all[mode]??={wall:[],cpu:[]};result.wall.push(...res.wall);result.cpu.push(...res.cpu);
    }
    function q(v,f){v=[...v].sort((a,b)=>a-b);const i=(v.length-1)*f;return +(v[Math.floor(i)]+(v[Math.ceil(i)]-v[Math.floor(i)])*(i%1)).toFixed(2);}
    for(const [mode,s] of Object.entries(all))console.log('RESULT',JSON.stringify({mode,n:s.wall.length,p25:q(s.wall,.25),p50:q(s.wall,.5),p75:q(s.wall,.75),cpu:q(s.cpu,.5)}));
  }finally{await b.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
