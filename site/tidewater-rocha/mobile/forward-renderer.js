import {flagRect,flagOcclusion} from './stern-flag.js?v=stern-flag-1';
import {loadRoomVisibility} from './room-visibility.js?v=8';
import {sharedVertices} from './shared-vertices.js?v=2';
import {createViewIndices} from './view-indices.js?v=stern-flag-region-1';
import {loadScreenVisibility} from './screen-visibility.js?v=stern-flag-1';
import {prepareImmediateView} from './immediate-view.js?v=stern-flag-1';
import {createMaterialPalette} from './daylight-materials.js?v=yacht-daylight-2';
import {localReflections} from './yacht-daylight.js?v=yacht-daylight-1';
import {createVisibilityTarget,prepareVisibilityPipeline} from './visibility-target.js?v=2';
import {shader,visibilityShader} from './daylight-shader.js?v=stern-flag-1';
import {createDaylightShadow,lightMatrix} from './daylight-shadow.js?v=yacht-daylight-2';
import {loadDeckLight,prepareOpaque,packRenderVertices} from './prepare-light.js?v=chair-fidelity-1';
import {createFinishPatterns} from './finish-patterns.js?v=chair-fidelity-1';
import { onGuestApproach } from './guest-access-geometry.js?v=guest-visibility-1';
import { nextProfile } from './main-saloon.js?v=port-guest-1';

// Use native framebuffer coordinates for both the scissor and the texture
// copies. An offscreen readback or a camera/light/profile change draws in full.
function flagPixels(rect,width,height){
  const left=Math.max(0,Math.floor((1+rect[0])*width/2));
  const right=Math.min(width,Math.ceil((1+rect[2])*width/2));
  const top=Math.max(0,Math.floor((1-rect[3])*height/2));
  const bottom=Math.min(height,Math.ceil((1-rect[1])*height/2));
  const w=right-left,h=bottom-top;
  return w>0 && h>0 && w*h<width*height*.5 ? [left,top,w,h] : null;
}

// The boarding assembly uses one opaque batch and a single glazing batch. Both
// share the same transform, depth attachment and multisampled render pass.
export async function createForwardRenderer(app, daylight) {
  const { device, format } = app.gpu;
  const model = app.entranceYacht;
  const attributes = ['position', 'normal', 'color', 'aSurface'];
  const blend = {
    color:{srcFactor:'src-alpha',dstFactor:'one-minus-src-alpha'},
    alpha:{srcFactor:'one',dstFactor:'one-minus-src-alpha'},
  };
  const module = device.createShaderModule({label:'Gangway finishes', code:shader});
  const bindLayout = device.createBindGroupLayout({entries:[
    {binding:0, visibility:GPUShaderStage.VERTEX|GPUShaderStage.FRAGMENT, buffer:{type:'uniform'}},
    {binding:1, visibility:GPUShaderStage.FRAGMENT, sampler:{type:'filtering'}},
    {binding:2, visibility:GPUShaderStage.FRAGMENT, texture:{sampleType:'float',viewDimension:'2d-array'}},
    {binding:3,visibility:GPUShaderStage.VERTEX|GPUShaderStage.FRAGMENT,texture:{sampleType:'depth'}},
    {binding:4,visibility:GPUShaderStage.VERTEX|GPUShaderStage.FRAGMENT,sampler:{type:'comparison'}},
  ]});
  const layout = device.createPipelineLayout({bindGroupLayouts:[bindLayout]});
  const taggedModule=device.createShaderModule({label:'Yacht coverage evidence',code:visibilityShader});
  function makePipeline(count, glass, tagged=false, waving=false) {
    const constants=glass?{}:{animateCloth:Number(waving)};
    const program=tagged&&!glass?taggedModule:module;
    const targets=[{format,blend:glass?blend:undefined}];
    if(tagged)targets.push({format:'rgba8unorm',writeMask:glass?0:GPUColorWrite.ALL});
    return device.createRenderPipelineAsync({
      label:(glass ? 'Boarding glass ' : 'Boarding finishes ')+count+'×', layout, multisample:{count},
      vertex:{module:program,constants,entryPoint:glass ? 'glassVertex' : 'vertex',buffers:[{arrayStride:32,attributes:[
        {shaderLocation:0,offset:0,format:'float32x3'}, {shaderLocation:1,offset:12,format:'snorm8x4'},
        {shaderLocation:2,offset:16,format:'unorm8x4'}, {shaderLocation:3,offset:20,format:'float32x2'},
        {shaderLocation:4,offset:28,format:'sint16x2'},
      ]},...glass?[]:[{arrayStride:8,attributes:[
        {shaderLocation:5,offset:0,format:'unorm8x4'},{shaderLocation:6,offset:4,format:'unorm8x4'}
      ]}]]},
      fragment:{module:program,constants,entryPoint:glass?'glassFragment':tagged?'tagged':'fragment',targets},
      // The gate is a closed beveled pane, so its outward faces cover both viewing sides.
      primitive:{topology:'triangle-list',cullMode:'back'},
      depthStencil:{format:'depth24plus',depthWriteEnabled:!glass,depthCompare:'greater'},
    });
  }
  function makePipelines(count,tagged) {
    return Promise.all(model.meshes.map(mesh => makePipeline(count,mesh.material.transparent,tagged)));
  }
  const [single, smooth] = await Promise.all([makePipelines(1), makePipelines(4).catch(error => {
    console.warn('Gangway MSAA unavailable', error);
    return null;
  })]);
  const evidence=smooth && await makePipelines(4,true).catch(()=>null);
  const [singleCloth,smoothCloth,evidenceCloth]=await Promise.all([
    makePipeline(1,false,false,true), smooth && makePipeline(4,false,false,true),
    evidence && makePipeline(4,false,true,true),
  ]);
  const coveragePipeline=evidence && await prepareVisibilityPipeline(device).catch(()=>null);
  let samples = smooth ? 4 : 1;
  function upload(array, usage) {
    const buffer = device.createBuffer({size:Math.ceil(array.byteLength/4)*4,usage,mappedAtCreation:true});
    try {
      new Uint8Array(buffer.getMappedRange()).set(new Uint8Array(array.buffer,array.byteOffset,array.byteLength));
      buffer.unmap();
      return buffer;
    }catch(error){buffer.destroy();throw error;}
  }
  const mesh = model.boarding.group;
  mesh.updateWorldMatrix(true,false);
  const localFromWorld = mesh.matrixWorld.clone().invert();
  const clip = mesh.matrixWorld.clone();
  const cameraInYacht = mesh.matrixWorld.clone();
  const eye = app.camera.position.clone();
  const deckLight=await loadDeckLight();
  let palette=createMaterialPalette(device);
  function uploadBatch(source,glass,indices,table=palette,glassData=null) {
    const prepared=glass?source:prepareOpaque(source,deckLight,indices);
    const packed=packRenderVertices(prepared),count=packed.length/32;
    if(glassData)Object.assign(glassData,{vertices:packed, indices:indices.slice()});
    const lightOffset=glass?0:table.append(packed);
    const vertices=upload(packed,GPUBufferUsage.VERTEX);
    try{return {vertices,indices:upload(indices,GPUBufferUsage.INDEX),lightOffset,lightingBytes:glass?0:count*8,
      indexFormat:indices instanceof Uint16Array?'uint16':'uint32',count:indices.length};}
    catch(error){vertices.destroy();throw error;}
  }
  let batches=model.meshes.map(mesh=>{
    const geom=mesh.geometry;
    return uploadBatch(Object.fromEntries(attributes.map(n=>[n,geom.attributes[n].array])),mesh.material.transparent,geom.index.array);
  });
  palette.prepare();
  let shared=null, viewIndices=null, residentBytes=0;
  let profiles=null, activeProfile='exterior', disposed=false;
  const destroy=batches=>batches.forEach(batch=>{
    if(!batch.shared)batch.vertices?.destroy();batch.indices.destroy();
  });
  function selectProfile(name) {
    if(!profiles)return;
    activeProfile=name;batches=profiles[name].batches;
    Object.assign(model.stats,{triangles:profiles[name].triangles,geometryBytes:profiles[name].geometryBytes,
      residentGeometryBytes:residentBytes,profile:name});
  }
  const frame = new Float32Array(40+daylight.irradiance.length+localReflections.length+4);
  frame.set(localReflections,40+daylight.irradiance.length);
  const shadowMatrix=frame.subarray(24,40);let litRevision=-1;
  const uniform = device.createBuffer({size:frame.byteLength,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST});
  device.queue.writeBuffer(uniform,0,frame);
  const shadow=await createDaylightShadow(device,uniform,upload);
  const finishes=createFinishPatterns(device);
  const bindings=device.createBindGroup({layout:bindLayout,entries:[{binding:0,resource:{buffer:uniform}},
    {binding:1,resource:finishes.sampler},{binding:2,resource:finishes.view},{binding:3,resource:shadow.view},{binding:4,resource:shadow.sampler}]});
  model.stats.finishTextureBytes=finishes.bytes;
  model.stats.materialTextures=1;
  let depth, depthView, color, colorView,coverage,lastGeometry,stable=0;
  let savedFrame,savedView,baseReady=false;
  const lastClip=new Float32Array(16);
  // A presented canvas keeps its image until a new surface is acquired.
  // Explicit offscreen draws and preparation always render the requested pose.
  const presentedView=new Float32Array(19);
  let presentedSurface=null,presentedDepth=null,presentedBatches=null,presentedRevision=-1;
  const invalidatePresentation=()=>{
    baseReady=false;presentedSurface=null;
    presentedDepth=null;
    presentedBatches=null;
  };
  document.addEventListener('visibilitychange',invalidatePresentation);
  window.addEventListener('pageshow',invalidatePresentation);
  return {
    get activeProfile() { return activeProfile; },
    async installProfiles(source,{prepare=false,activate=()=>{},roomVisibility=false,signal}={}) {
      if(disposed)throw Error('Renderer disposed');
      const uploaded={},stagedPalette=createMaterialPalette(device);
      device.pushErrorScope('out-of-memory');device.pushErrorScope('validation');
      let failure, sharedBuffer, stagedViews, resident=0;
      try {
        const capacity=Object.values(source).reduce((n,p)=>n+p.batches[0].attributes.position.length/3,0);
        const table=sharedVertices(capacity), lists={}, glazing={}, immediate={};
        let maxIndexBytes=0, maxGlassBytes=0;
        for(const [name,p] of Object.entries(source)) {
          const result=uploaded[name]={...p,batches:[],geometryBytes:0};
          for(const b of p.batches) {
            const views=b.views?.flatMap(v=>[...(v.prefixes??[]).map(span=>({...v,...span})),v]);
            if(result.batches.length===0){
              const packed=packRenderVertices(prepareOpaque(b.attributes,deckLight,b.indices));
              // Bound the complete sweep of the cloth in yacht-local space.
              const points=b.attributes.position, surfaces=b.attributes.aSurface;
              for(let i=0;i<points.length/3;i++)if(surfaces[4*i+2]===54){
                const box=result.flagBounds??=[Infinity,Infinity,Infinity,-Infinity,-Infinity,-Infinity];
                for(let k=0;k<3;k++){
                  const pad=[.069,.060,.14][k],x=points[3*i+k];
                  box[k]=Math.min(box[k],x-pad);box[k+3]=Math.max(box[k+3],x+pad);
                }
              }
              if(result.flagBounds && b.ranges){
                const band=Math.floor(b.ranges.length/4);
                result.flagHidden=flagOcclusion(points,b.indices,b.ranges[band],result.flagBounds,surfaces);
              }
              const localIds=new Uint32Array(packed.length/32);
              const indices=table.remap(packed,b.indices,localIds);
              if(b.ranges)immediate[name]=prepareImmediateView(b.attributes.position,b.indices,localIds,packed);
              lists[name]=indices;
              const batch={shared:true,indices:upload(indices,GPUBufferUsage.INDEX),
                indexFormat:indices.BYTES_PER_ELEMENT===2?'uint16':'uint32',count:indices.length,
                ranges:b.ranges,localView:b.localView,views,cone:b.cone};
              result.batches.push(batch);
              resident+=batch.indices.size;
              result.geometryBytes+=batch.indices.size+packed.length/32*40;
              maxIndexBytes=Math.max(maxIndexBytes,Math.min(indices.length,p.triangles*3)*indices.BYTES_PER_ELEMENT);
            }else{
              const batch=uploadBatch(b.attributes,true,b.indices,stagedPalette,glazing[name]={});
              maxGlassBytes=Math.max(maxGlassBytes,batch.indices.size);
              result.batches.push(batch);
              resident+=batch.indices.size+batch.vertices.size;
              result.geometryBytes+=batch.indices.size+batch.vertices.size;
            }
          }
        }
        const packed=table.finish();
        sharedBuffer=upload(packed,GPUBufferUsage.VERTEX);
        stagedPalette.append(packed);
        stagedPalette.prepare();
        for(const p of Object.values(uploaded))p.batches[0].vertices=sharedBuffer;
        resident+=sharedBuffer.size+stagedPalette.storage.size;
        if(Object.values(uploaded).some(p=>p.batches[0].ranges) && typeof Worker!=='undefined'){
          const [cells, screen]=roomVisibility ? await Promise.all([
            loadRoomVisibility(packed,lists,signal), smooth && loadScreenVisibility(device,signal),
          ]) : [null,null];
          stagedViews=createViewIndices(device,packed,lists,glazing,maxIndexBytes,maxGlassBytes,cells,immediate,screen);
          if(stagedViews){await stagedViews.ready;resident+=stagedViews.buffer.size+stagedViews.exactBuffer.size+stagedViews.patchBuffer.size;}
        }
      }catch(error){failure=error;}
      const validation=await device.popErrorScope(),memory=await device.popErrorScope();
      if(failure||validation||memory||disposed) {
        Object.values(uploaded).forEach(p=>destroy(p.batches));
        sharedBuffer?.destroy();stagedViews?.dispose();
        stagedPalette.dispose();
        throw failure||validation||memory||Error('Renderer disposed');
      }
      const previous={profiles,batches,palette,shared,viewIndices,residentBytes,name:activeProfile,stats:{...model.stats}};
      palette=stagedPalette;shared=sharedBuffer;viewIndices=stagedViews;residentBytes=resident;
      profiles=uploaded;selectProfile(uploaded[previous.name]?previous.name:'exterior');
      try {
        if(prepare) {
          device.pushErrorScope('out-of-memory');device.pushErrorScope('validation');
          let error;try{await this.prepareProfiles();}catch(e){error=e;}
          const invalid=await device.popErrorScope(),memory=await device.popErrorScope();
          if(error||invalid||memory||disposed)throw error||invalid||memory||Error('Renderer disposed');
        }
        activate();
      }catch(error){
        Object.values(uploaded).forEach(p=>destroy(p.batches));
        stagedPalette.dispose();sharedBuffer?.destroy();stagedViews?.dispose();
        if(disposed){previous.palette.dispose();previous.shared?.destroy();previous.viewIndices?.dispose();if(previous.profiles)Object.values(previous.profiles).forEach(p=>destroy(p.batches));else destroy(previous.batches);profiles=null;batches=[];}
        else {shared=previous.shared;viewIndices=previous.viewIndices;residentBytes=previous.residentBytes;palette=previous.palette;profiles=previous.profiles;batches=previous.batches;activeProfile=previous.name;Object.assign(model.stats,previous.stats);}
        throw error;
      }
      previous.palette.dispose();previous.shared?.destroy();previous.viewIndices?.dispose();
      if(previous.profiles)Object.values(previous.profiles).forEach(p=>destroy(p.batches));else destroy(previous.batches);
    },
    get samples() { return samples; },
    get canSmooth() { return Boolean(smooth); },
    setSamples(value) { samples = value === 4 && smooth ? 4 : 1; },
    async prepareProfiles() {
      if(!profiles||disposed)return;
      // Exercise the actual buffers and pipelines offscreen before enabling a
      // new route. Do not change the visitor's pose or flash a different deck.
      const previous=activeProfile;
      const target=device.createTexture({label:'Walk preparation',format,
        size:[app.engine.width,app.engine.height],usage:GPUTextureUsage.RENDER_ATTACHMENT});
      try {
        let clothWarmed=false;
        for(const name of Object.keys(profiles)) {
          if(disposed)return;
          // First and last ranges together touch the complete resident index buffer.
          const ranges=profiles[name].batches[0].ranges;
          const warmBands=ranges?[0,ranges.length-1]:[0];
          if(profiles[name].visibility?.lateralBands)warmBands.push(ranges.length/2-1,ranges.length/2);
          if(name===previous && coveragePipeline && samples===4)warmBands.push('coverage');
          if(!clothWarmed && profiles[name].flagBounds){
            warmBands.push('wind');
            if(coveragePipeline && samples===4)warmBands.push('wind-coverage');
            clothWarmed=true;
          }
          if(profiles[name].batches[0].localView)warmBands.push('local');
          // A parent span warms all of its narrower frustum prefixes.
          const views=profiles[name].batches[0].views??[];
          warmBands.push(...views.filter((v,i)=>views[i+1]?.first!==v.first));
          for(const band of warmBands){
            app.gpu.beginFrame();this.render(name,target.createView(),band);app.gpu.submit();
            await app.gpu.queue.onSubmittedWorkDone();
          }
        }
      } finally { target.destroy();if(!disposed)selectProfile(previous); }
    },
    async prepareCurrentView(){
      if(disposed||!viewIndices)return;
      // The final camera can differ from the profile warm-up cameras. Finish
      // both visibility lists before the visitor can move or retry a package.
      await coverage?.pending;
      await viewIndices.idle();
      if(disposed)return;
      const {gpu,engine}=app;
      const texture=device.createTexture({label:'Initial visitor view',format,size:[engine.width,engine.height],
        usage:GPUTextureUsage.RENDER_ATTACHMENT});
      try {
        const target=texture.createView();
        gpu.beginFrame();this.render(null,target,null,true);gpu.submit();
        await coverage?.pending;
        await viewIndices.idle();
        if(disposed)return;
        gpu.beginFrame();this.render(null,target);gpu.submit();
        await gpu.queue.onSubmittedWorkDone();
      }finally{texture.destroy();}
    },
    present(allowReuse,seconds){
      frame[frame.length-4]=seconds;
      return this.render(null,null,null,false,allowReuse);
    },
    render(preparingProfile=null,target=null,preparedBand=null,prepareVisitor=false,allowReuse=false) {
      const {engine, gpu, camera} = app;
      if(profiles) {
        const nav=app.yachtWalk.nav;
        let name=preparingProfile;
        if(name===null){
          // Keep the level deck in one scene, including both stair approaches.
          // The landing connects to the boarding ramp at x=3.8.
          if(profiles.main && nav.deck==='MD' && !nav.stair && nav.position[0]>=3.8){
            name='main';
          }else{
            const guest=app.entranceYacht.guestAccess;
            const guestApproach=!!guest&&(nav.deck==='LD'||nav.deck==='MD'&&guest.profileContains(...nav.position,activeProfile)&&nav.floorSafe(...nav.position,'MD'));
            name=nextProfile(activeProfile,nav.position[0],nav.deck,nav.stair?.route.id,
              !!app.entranceYacht.bow?.contains(...nav.position),!!app.entranceYacht.bridgeAccess?.profileContains(...nav.position),guestApproach);
          }
        }
        if(name!==activeProfile)selectProfile(name);
      }
      if (depth?.width !== engine.width || depth.height !== engine.height || depth.sampleCount !== samples) {
        coverage?.dispose();coverage=null;lastGeometry=null;
        savedFrame?.destroy();savedFrame=savedView=null;baseReady=false;
        depth?.destroy();
        color?.destroy();
        const attachment = {size:[engine.width,engine.height],sampleCount:samples,
          usage:GPUTextureUsage.RENDER_ATTACHMENT | (GPUTextureUsage.TRANSIENT_ATTACHMENT ?? 0)};
        depth = device.createTexture({...attachment,label:'Gangway depth',format:'depth24plus'});
        depthView = depth.createView();
        color = samples > 1 ? device.createTexture({...attachment,label:'Gangway multisample color',format}) : null;
        colorView = color?.createView();
        if(coveragePipeline && samples===4)coverage=createVisibilityTarget(device,engine.width,engine.height,coveragePipeline);
        if(coverage){
          savedFrame=device.createTexture({label:'Stationary yacht frame',format,size:attachment.size,
            usage:GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.COPY_SRC});
          savedView=savedFrame.createView();
        }
      }
      camera.updateMatrixWorld();
      clip.multiplyMatrices(camera.projectionMatrix,camera.matrixWorldInverse).multiply(mesh.matrixWorld).toArray(frame);
      eye.copy(camera.position).applyMatrix4(localFromWorld).toArray(frame,16);
      daylight.flush();palette.update(daylight);
      const moved=litRevision!==daylight.revision;
      if(moved){
        if(litRevision>=0){viewIndices?.invalidateFixed();lastGeometry=null;}
        const bearing=daylight.state.azimuth*Math.PI/180;frame[23]=Math.cos(bearing);frame[19]=Math.sin(bearing);
        daylight.direction.toArray(frame,20);lightMatrix(daylight.direction,daylight.state.azimuth,shadowMatrix);
        frame.set(daylight.irradiance,40);litRevision=daylight.revision;
      }
      const bounds=profiles?.[activeProfile]?.flagBounds;
      const windRect=bounds&&!profiles[activeProfile].flagHidden?.(eye)&&flagRect(frame,bounds,engine.width,engine.height);
      const preparingCoverage=preparedBand==='coverage'||preparedBand==='wind-coverage';
      const waving=windRect||preparedBand==='wind'||preparedBand==='wind-coverage';
      if(preparingCoverage||preparedBand==='wind')preparedBand=0;
      let capture=preparingCoverage&&coverage;
      if(coverage && viewIndices && preparingProfile===null){
        let same=lastGeometry===batches;
        for(let i=0;i<16&&same;i++)same=frame[i]===lastClip[i];
        if(!same){lastClip.set(frame.subarray(0,16));lastGeometry=batches;stable=0;}
        else if(stable<3)stable++;
        // A readback for the previous pose may still be in flight when this
        // one settles. Keep the capture eligible until the buffer is available.
        if((prepareVisitor || stable===3) && !coverage.busy){
          stable=4;
          capture=!viewIndices.matches(activeProfile,frame,engine.width,engine.height);
        }
      }else lastGeometry=null;
      let sameView=false;
      if(allowReuse && !capture && presentedSurface===engine.currentTexture && presentedDepth===depth &&
          presentedBatches===batches && presentedRevision===daylight.revision){
        let same=true;
        for(let i=0;i<presentedView.length && same;i++)same=frame[i]===presentedView[i];
        sameView=same;
        if(same&&!windRect)return false;
      }
      gpu.queue.writeBuffer(uniform,0,frame,0,moved?40+daylight.irradiance.length:20);
      if(waving)gpu.queue.writeBuffer(uniform,frame.byteLength-16,frame,frame.length-4,1);
      if(moved)shadow.draw(gpu.getEncoder(),daylight.state);
      let settled=!coverage || !viewIndices;
      const canvas=target?null:engine.currentTexture();
      const screen=target??canvas.createView();
      const canCache=allowReuse && !capture && windRect && stable>=3 && savedFrame && (canvas?.usage & GPUTextureUsage.COPY_DST);
      const rect=canCache && flagPixels(windRect,engine.width,engine.height);
      const patch=rect && baseReady && sameView && viewIndices?.patch(activeProfile,frame,engine.width,engine.height,daylight.revision);
      const saveBase=rect && !patch;
      const destination=saveBase?savedView:screen;
      const pass = gpu.getEncoder().beginRenderPass({
        label:'Gangway to screen',
        colorAttachments:[{view:colorView ?? destination,resolveTarget:colorView ? destination : undefined,
          loadOp:'clear',storeOp:colorView ? 'discard' : 'store',
          clearValue:{r:.40,g:.64,b:.84,a:1}},...(capture?[coverage.attachment]:[])],
        depthStencilAttachment:{view:depthView,depthClearValue:0,depthLoadOp:'clear',depthStoreOp:'discard'},
      });
      if(patch)pass.setScissorRect(...rect);
      pass.setBindGroup(0,bindings);
      const pipelines = capture?evidence:samples === 4 ? smooth : single;
      let capturedSource;
      let visible;
      for (let i=0; i<batches.length; i++) {
        const batch = batches[i];
        pass.setPipeline(i===0&&waving ? (capture?evidenceCloth:samples===4?smoothCloth:singleCloth) : pipelines[i]);
        pass.setVertexBuffer(0,batch.vertices);
        if(i===0)pass.setVertexBuffer(1,palette.storage);
        pass.setIndexBuffer(batch.indices,batch.indexFormat);
        if(patch){
          pass.setIndexBuffer(viewIndices.patchBuffer,batch.indexFormat,i===0?0:viewIndices.glassOffset);
          pass.drawIndexed(patch[i]);settled=true;
          if(i===0)model.stats.triangles=(patch[0]+patch[1])/3;
        }else if (batch.ranges) {
          const {start,step,lateralBands}=profiles[activeProfile].visibility;
          const view=batch.localView,box=view?.box;
          let first,count;
          let directional=preparedBand && typeof preparedBand==='object'?preparedBand:null;
          if(preparedBand===null&&batch.views?.length){
            const m=cameraInYacht.multiplyMatrices(localFromWorld,camera.matrixWorld).elements,p=camera.projectionMatrix.elements;
            const inside=(sign,axis,edge,tangent)=>{
              const component=k=>sign*tangent*m[2+k]+edge*m[axis+k];
              return -component(8)+component(0)*p[8]/p[0]+component(4)*p[9]/p[5]
                -Math.abs(component(0)/p[0])-Math.abs(component(4)/p[5])>.001;
            };
            directional=batch.views.find(({box:b,sign,cone=batch.cone})=>eye.x>=b[0]&&eye.x<=b[3]&&eye.y>=b[1]&&eye.y<=b[4]&&eye.z>=b[2]&&eye.z<=b[5]&&
              (!sign||inside(sign,0,1,cone[0])&&inside(sign,0,-1,cone[0])&&inside(sign,1,1,cone[1])&&inside(sign,1,-1,cone[2])));
          }
          if(directional){first=directional.first;count=directional.count;}
          else if(view&&(preparedBand==='local'||preparedBand===null&&eye.x>=box[0]&&eye.x<=box[3]&&
            eye.y>=box[1]&&eye.y<=box[4]&&eye.z>=box[2]&&eye.z<=box[5])){
            // Max component across the four frustum rays in yacht coordinates.
            // Include camera roll, projection offsets and the yacht rotation.
            const m=cameraInYacht.multiplyMatrices(localFromWorld,camera.matrixWorld).elements;
            const axis=view.axis,p=camera.projectionMatrix.elements;
            const highestRay=-m[axis+8]+m[axis]*p[8]/p[0]+m[axis+4]*p[9]/p[5]+Math.abs(m[axis]/p[0])+Math.abs(m[axis+4]/p[5]);
            first=view.first;count=preparedBand===null&&highestRay<-.001?view.lowCount:view.count;
          }else{
            const width=lateralBands||batch.ranges.length;
            const longitudinal=Math.max(0,Math.min(width-1,Math.floor((eye.z-start)/step)));
            const band=preparedBand??(longitudinal+(eye.x>0&&lateralBands?width:0));
            [first,count]=batch.ranges[band];
          }
          if(preparingProfile===null && preparedBand===null && viewIndices){
            const cameraMatrix=cameraInYacht.multiplyMatrices(localFromWorld,camera.matrixWorld).elements;
            const rangeStart=first,rangeCount=count;
            const nav=app.yachtWalk.nav;
            // The gangway and narrow cabin approaches expose many small faces.
            // Test their native sample coverage without building an occluder grid.
            const [x,y]=nav.position;
            const mainDeck=nav.deck==='MD'&&!nav.stair;
            // The furnished main deck can see past the lower stair approach.
            // Its walls and furniture still occlude surfaces behind them.
            const samplesOnly=activeProfile==='guest'||activeProfile==='exterior'&&mainDeck&&(
              model.guestAccess&&onGuestApproach(x,y)||model.boarding.baseSafe?.(x,y,0));
            const refinement=windRect?'cloth':samplesOnly?'samples':'occlusion';
            visible=viewIndices.select(activeProfile,first,count,clip.elements,cameraMatrix,camera.projectionMatrix.elements,engine.width,engine.height,daylight.revision,frame,samples,refinement);
            if(capture)capturedSource={
              indices:viewIndices,profile:activeProfile,first,count,clip:frame.slice(0,16),
              candidates:viewIndices.captureCandidates(visible),windRect,
            };
            if(visible && visible.length<count){
              pass.setIndexBuffer(viewIndices.buffer,batch.indexFormat);
              first=0;count=visible.length;
            }
            if(!capture&&samples===4){
              const fixed=viewIndices.fixed(activeProfile,rangeStart,rangeCount,frame,engine.width,engine.height,daylight.revision);
              if(fixed!==null)settled=true;
              if(fixed!==null&&fixed<count){
                pass.setIndexBuffer(viewIndices.exactBuffer,batch.indexFormat);
                first=0;count=fixed;
              }
            }
          }
          pass.drawIndexed(count,1,first);
          model.stats.triangles=(count+(visible?.glassLength??batches[1].count))/3;
        } else if(i===1 && visible && visible.glassLength<batch.count){
          pass.setIndexBuffer(viewIndices.buffer,batch.indexFormat,viewIndices.glassOffset);
          pass.drawIndexed(visible.glassLength);
        } else pass.drawIndexed(batch.count);
      }
      pass.end();
      if(saveBase){
        gpu.getEncoder().copyTextureToTexture({texture:savedFrame},{texture:canvas},[engine.width,engine.height]);
      }else if(patch){
        const [x,y,w,h]=rect;
        const restore=(left,top,width,height)=>{
          if(width&&height){
            const origin=[left,top];
            gpu.getEncoder().copyTextureToTexture({texture:savedFrame,origin},{texture:canvas,origin},[width,height]);
          }
        };
        restore(0,0,engine.width,y);
        restore(0,y+h,engine.width,engine.height-y-h);
        restore(0,y,x,h);
        restore(x+w,y,engine.width-x-w,h);
      }
      baseReady=Boolean(saveBase||patch);
      if(settled && !target && preparingProfile===null){
        for(let i=0;i<presentedView.length;i++)presentedView[i]=frame[i];
        presentedSurface=engine.currentTexture;
        presentedDepth=depth;
        presentedBatches=batches;
        presentedRevision=daylight.revision;
      }else invalidatePresentation();
      if(capturedSource){
        const {indices,profile,first,count,clip,candidates,windRect}=capturedSource;
        coverage.read(gpu.getEncoder(),(winners,w,h)=>{
          if(!disposed && viewIndices===indices)indices.analyze(winners,w,h,profile,first,count,clip,candidates,windRect);
        });
      }
      return true;
    },
    dispose() {
      document.removeEventListener('visibilitychange',invalidatePresentation);
      window.removeEventListener('pageshow',invalidatePresentation);
      disposed=true;coverage?.dispose();
      if(profiles)Object.values(profiles).forEach(p=>destroy(p.batches));else destroy(batches);
      viewIndices?.dispose();shared?.destroy();palette.dispose();shadow.dispose();savedFrame?.destroy();uniform.destroy(); finishes.texture.destroy(); depth?.destroy(); color?.destroy();
    },
  };
}
