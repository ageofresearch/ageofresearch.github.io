import {createMaterialPalette} from './daylight-materials.js?v=yacht-daylight-1';
import {localReflections} from './yacht-daylight.js?v=yacht-daylight-1';
import {shader} from './daylight-shader.js?v=yacht-daylight-1';
import {createDaylightShadow,lightMatrix} from './daylight-shadow.js?v=yacht-daylight-1';
import {loadDeckLight,prepareOpaque,packRenderVertices} from './prepare-light.js?v=chair-fidelity-1';
import {createFinishPatterns} from './finish-patterns.js?v=chair-fidelity-1';
import { nextProfile } from './main-saloon.js?v=port-guest-1';

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
  function makePipeline(count, glass) {
    return device.createRenderPipelineAsync({
      label:(glass ? 'Boarding glass ' : 'Boarding finishes ')+count+'×', layout, multisample:{count},
      vertex:{module,entryPoint:glass ? 'glassVertex' : 'vertex',buffers:[{arrayStride:32,attributes:[
        {shaderLocation:0,offset:0,format:'float32x3'}, {shaderLocation:1,offset:12,format:'snorm8x4'},
        {shaderLocation:2,offset:16,format:'unorm8x4'}, {shaderLocation:3,offset:20,format:'float32x2'},
        {shaderLocation:4,offset:28,format:'sint16x2'},
      ]},...glass?[]:[{arrayStride:8,attributes:[
        {shaderLocation:5,offset:0,format:'unorm8x4'},{shaderLocation:6,offset:4,format:'unorm8x4'}
      ]}]]},
      fragment:{module,entryPoint:glass ? 'glassFragment' : 'fragment',targets:[{format,blend:glass ? blend : undefined}]},
      // The gate is a closed beveled pane, so its outward faces cover both viewing sides.
      primitive:{topology:'triangle-list',cullMode:'back'},
      depthStencil:{format:'depth24plus',depthWriteEnabled:!glass,depthCompare:'greater'},
    });
  }
  function makePipelines(count) {
    return Promise.all(model.meshes.map(mesh => makePipeline(count,mesh.material.transparent)));
  }
  const [single, smooth] = await Promise.all([makePipelines(1), makePipelines(4).catch(error => {
    console.warn('Gangway MSAA unavailable', error);
    return null;
  })]);
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
  function uploadBatch(source,glass,indices,table=palette) {
    const prepared=glass?source:prepareOpaque(source,deckLight,indices);
    const packed=packRenderVertices(prepared),count=packed.length/32;
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
  let profiles=null, activeProfile='exterior', disposed=false;
  const destroy=batches=>batches.forEach(batch=>{
    batch.vertices.destroy();batch.indices.destroy();
  });
  function selectProfile(name) {
    if(!profiles)return;
    activeProfile=name;batches=profiles[name].batches;
    Object.assign(model.stats,{triangles:profiles[name].triangles,geometryBytes:profiles[name].geometryBytes,
      residentGeometryBytes:Object.values(profiles).reduce((n,p)=>n+p.geometryBytes,0),profile:name});
  }
  const frame = new Float32Array(40+daylight.irradiance.length+localReflections.length);
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
  let depth, depthView, color, colorView;
  return {
    get activeProfile() { return activeProfile; },
    async installProfiles(source,{prepare=false,activate=()=>{}}={}) {
      if(disposed)throw Error('Renderer disposed');
      const uploaded={},stagedPalette=createMaterialPalette(device);
      device.pushErrorScope('out-of-memory');device.pushErrorScope('validation');
      let failure;
      try {
        for(const [name,p] of Object.entries(source)) {
          const result=uploaded[name]={...p,batches:[],geometryBytes:0};
          for(const b of p.batches) {
            const batch={...uploadBatch(b.attributes,result.batches.length===1,b.indices,stagedPalette),ranges:b.ranges,localView:b.localView,views:b.views,cone:b.cone};
            result.batches.push(batch);
            result.geometryBytes+=batch.vertices.size+batch.indices.size+batch.lightingBytes;
          }
        }
        stagedPalette.prepare();
      }catch(error){failure=error;}
      const validation=await device.popErrorScope(),memory=await device.popErrorScope();
      if(failure||validation||memory||disposed) {
        Object.values(uploaded).forEach(p=>p.batches.forEach(b=>{
          b.vertices?.destroy();b.indices?.destroy();
        }));
        stagedPalette.dispose();
        throw failure||validation||memory||Error('Renderer disposed');
      }
      const previous={profiles,batches,palette,name:activeProfile,stats:{...model.stats}};
      palette=stagedPalette;
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
        stagedPalette.dispose();
        if(disposed){previous.palette.dispose();if(previous.profiles)Object.values(previous.profiles).forEach(p=>destroy(p.batches));else destroy(previous.batches);profiles=null;batches=[];}
        else {palette=previous.palette;profiles=previous.profiles;batches=previous.batches;activeProfile=previous.name;Object.assign(model.stats,previous.stats);}
        throw error;
      }
      previous.palette.dispose();
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
        for(const name of Object.keys(profiles)) {
          if(disposed)return;
          // First and last ranges together touch the complete resident index buffer.
          const ranges=profiles[name].batches[0].ranges;
          const warmBands=ranges?[0,ranges.length-1]:[0];
          if(profiles[name].batches[0].localView)warmBands.push('local');
          warmBands.push(...(profiles[name].batches[0].views??[]));
          for(const band of warmBands){
            app.gpu.beginFrame();this.render(name,target.createView(),band);app.gpu.submit();
            await app.gpu.queue.onSubmittedWorkDone();
          }
        }
      } finally { target.destroy();if(!disposed)selectProfile(previous); }
    },
    render(preparingProfile=null,target=null,preparedBand=null) {
      const {engine, gpu, camera} = app;
      if(profiles) {
        const nav=app.yachtWalk.nav,guest=app.entranceYacht.guestAccess;
        const guestApproach=!!guest&&(nav.deck==='LD'||nav.deck==='MD'&&guest.profileContains(...nav.position,activeProfile)&&nav.floorSafe(...nav.position,'MD'));
        const name=preparingProfile??nextProfile(activeProfile,nav.position[0],nav.deck,nav.stair?.route.id,!!app.entranceYacht.bow?.contains(...nav.position),!!app.entranceYacht.bridgeAccess?.profileContains(...nav.position),guestApproach);
        if(name!==activeProfile)selectProfile(name);
      }
      if (depth?.width !== engine.width || depth.height !== engine.height || depth.sampleCount !== samples) {
        depth?.destroy();
        color?.destroy();
        const attachment = {size:[engine.width,engine.height],sampleCount:samples,usage:GPUTextureUsage.RENDER_ATTACHMENT};
        depth = device.createTexture({...attachment,label:'Gangway depth',format:'depth24plus'});
        depthView = depth.createView();
        color = samples > 1 ? device.createTexture({...attachment,label:'Gangway multisample color',format}) : null;
        colorView = color?.createView();
      }
      camera.updateMatrixWorld();
      clip.multiplyMatrices(camera.projectionMatrix,camera.matrixWorldInverse).multiply(mesh.matrixWorld).toArray(frame);
      eye.copy(camera.position).applyMatrix4(localFromWorld).toArray(frame,16);
      daylight.flush();palette.update(daylight);
      const moved=litRevision!==daylight.revision;
      if(moved){
        const bearing=daylight.state.azimuth*Math.PI/180;frame[23]=Math.cos(bearing);frame[19]=Math.sin(bearing);
        daylight.direction.toArray(frame,20);lightMatrix(daylight.direction,daylight.state.azimuth,shadowMatrix);
        frame.set(daylight.irradiance,40);litRevision=daylight.revision;
      }
      gpu.queue.writeBuffer(uniform,0,frame,0,moved?40+daylight.irradiance.length:20);
      if(moved)shadow.draw(gpu.getEncoder(),daylight.state);
      const screen = target??engine.currentTexture().createView();
      const pass = gpu.getEncoder().beginRenderPass({
        label:'Gangway to screen',
        colorAttachments:[{view:colorView ?? screen,resolveTarget:colorView ? screen : undefined,
          loadOp:'clear',storeOp:colorView ? 'discard' : 'store',
          clearValue:{r:.40,g:.64,b:.84,a:1}}],
        depthStencilAttachment:{view:depthView,depthClearValue:0,depthLoadOp:'clear',depthStoreOp:'discard'},
      });
      pass.setBindGroup(0,bindings);
      const pipelines = samples === 4 ? smooth : single;
      for (let i=0; i<batches.length; i++) {
        const batch = batches[i];
        pass.setPipeline(pipelines[i]);
        pass.setVertexBuffer(0,batch.vertices);
        if(i===0)pass.setVertexBuffer(1,palette.storage,batch.lightOffset,batch.lightingBytes);
        pass.setIndexBuffer(batch.indices,batch.indexFormat);
        if (batch.ranges) {
          const {start,step}=profiles[activeProfile].visibility;
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
            const band=preparedBand??Math.max(0,Math.min(batch.ranges.length-1,Math.floor((eye.z-start)/step)));
            [first,count]=batch.ranges[band];
          }
          pass.drawIndexed(count,1,first);
          model.stats.triangles=(count+batches[1].count)/3;
        } else pass.drawIndexed(batch.count);
      }
      pass.end();
    },
    dispose() {
      disposed=true;
      if(profiles)Object.values(profiles).forEach(p=>destroy(p.batches));else destroy(batches);
      palette.dispose();shadow.dispose();uniform.destroy(); finishes.texture.destroy(); depth?.destroy(); color?.destroy();
    },
  };
}
