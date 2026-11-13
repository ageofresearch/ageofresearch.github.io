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
    const gpuPassTimes=await f.evaluate(async()=>{
      const a=window.__app,device=a.gpu.device,queue=device.queue;
      if(!a.gpu.hasTimestamp)return {unavailable:true};
      const proto=GPUCommandEncoder.prototype, originals={beginRenderPass:proto.beginRenderPass,beginComputePass:proto.beginComputePass};
      const query=device.createQuerySet({type:'timestamp',count:128});
      const result=device.createBuffer({size:1024,usage:GPUBufferUsage.QUERY_RESOLVE|GPUBufferUsage.COPY_SRC});
      const read=device.createBuffer({size:1024,usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST});
      const samples={};
      for(const condition of ['still','walk']){
        const records=[];
        for(let i=-4;i<16;i++){
          if(condition==='walk'){a.yachtWalk.nav.move(.035,0);a.yachtWalk.yaw+=.002;}
          const names=[];
          for(const [key,original] of Object.entries(originals)){
            proto[key]=function(desc={}){
              const ix=names.length*2; names.push(desc.label||'?');
              return original.call(this,{...desc,timestampWrites:{querySet:query,beginningOfPassWriteIndex:ix,endOfPassWriteIndex:ix+1}});
            };
          }
          const start=performance.now();
          try{a.frame(1/60);}finally{Object.assign(proto,originals);}
          const n=names.length*2,enc=device.createCommandEncoder();
          enc.resolveQuerySet(query,0,n,result,0);enc.copyBufferToBuffer(result,0,read,0,n*8);queue.submit([enc.finish()]);
          await read.mapAsync(GPUMapMode.READ);
          const t=new BigUint64Array(read.getMappedRange()), row={};
          names.forEach((label,idx)=>{row[label]=(row[label]||0)+Number(t[idx*2+1]-t[idx*2])/1e6;});
          const span=Number(t[n-1]-t[0])/1e6;
          read.unmap();if(i>=0)records.push({stage:row,span,wall:performance.now()-start});
        }
        const median=v=>{v.sort((a,b)=>a-b);return +((v[7]+v[8])/2).toFixed(2);};
        const labels=new Set(records.flatMap(r=>Object.keys(r.stage)));
        samples[condition]={span:median(records.map(r=>r.span)),wall:median(records.map(r=>r.wall)),
          stages:Object.fromEntries([...labels].map(k=>[k,median(records.map(r=>r.stage[k]||0))]))};
      }
      query.destroy(); result.destroy(); read.destroy();return samples;
    });
    console.log('QUERY_TIMES',JSON.stringify(gpuPassTimes));
  }finally{await b.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
