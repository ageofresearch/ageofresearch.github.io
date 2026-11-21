// Fixed to the hull, independent of camera/profile culling. Clip depth increases
// away from the sun. A tight, rectangular fit preserves detail on narrow rails.
export function lightMatrix(sun,azimuth,out){
  const a=azimuth*Math.PI/180;
  const right=[Math.cos(a),0,Math.sin(a)],up=[sun.y*right[2],sun.z*right[0]-sun.x*right[2],-sun.y*right[0]];
  const forward=[-sun.x,-sun.y,-sun.z],half=[5.1,6.8,23],center=[0,3,-2];
  const extent=v=>half.reduce((sum,h,i)=>sum+h*Math.abs(v[i]),.2);
  const axes=[right,up,forward],scales=[1/extent(right),1/extent(up),.5/extent(forward)];
  for(let row=0;row<3;row++){
    const v=axes[row],s=scales[row];for(let col=0;col<3;col++)out[col*4+row]=v[col]*s;
    out[12+row]=(row===2?.5:0)-s*v.reduce((sum,x,i)=>sum+x*center[i],0);
  }
  out[3]=out[7]=out[11]=0;out[15]=1;
}
export async function createDaylightShadow(device,uniform,upload){
  const response=await fetch(new URL('./daylight-casters.bin?v=yacht-daylight-1',import.meta.url));
  if(!response.ok)throw Error('No se pudo cargar la geometría de sombra');
  const data=await response.arrayBuffer();
  if(data.byteLength<16)throw Error('Geometría de sombra incompleta');
  const [magic,n,count,stride]=new Uint32Array(data,0,4),offset=16+12*n;
  if(magic!==0x594c4954||!n||!count||count%3||![2,4].includes(stride)||offset+count*stride!==data.byteLength)throw Error('Geometría de sombra inválida');
  const module=device.createShaderModule({code:`
    struct Frame {clip:mat4x4f,eye:vec4f,sun:vec4f,light:mat4x4f}
    @group(0) @binding(0) var<uniform> frame:Frame;
    @vertex fn vs(@location(0) pos:vec3f)->@builtin(position) vec4f{return frame.light*vec4f(pos,1);}
  `});
  const pipeline=await device.createRenderPipelineAsync({label:'Yacht sun depth',layout:'auto',
    vertex:{module,entryPoint:'vs',buffers:[{arrayStride:12,attributes:[{shaderLocation:0,offset:0,format:'float32x3'}]}]},
    primitive:{topology:'triangle-list',cullMode:'none'},depthStencil:{format:'depth16unorm',depthCompare:'less',depthWriteEnabled:true,depthBias:1,depthBiasSlopeScale:1}});
  const bind=device.createBindGroup({layout:pipeline.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:uniform}}]});
  const texture=device.createTexture({label:'Cached yacht sun depth',size:[1024,1024],format:'depth16unorm',usage:GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.TEXTURE_BINDING});
  const view=texture.createView(),sampler=device.createSampler({compare:'less-equal',magFilter:'linear',minFilter:'linear'});
  const vertices=upload(new Float32Array(data,16,n*3),GPUBufferUsage.VERTEX);
  const indices=upload(new Uint8Array(data,offset),GPUBufferUsage.INDEX);
  return {view,sampler,draw(encoder){
    const pass=encoder.beginRenderPass({label:'Yacht moving sun',colorAttachments:[],depthStencilAttachment:{view,depthLoadOp:'clear',depthStoreOp:'store',depthClearValue:1}});
    pass.setPipeline(pipeline);pass.setBindGroup(0,bind);pass.setVertexBuffer(0,vertices);pass.setIndexBuffer(indices,stride===2?'uint16':'uint32');pass.drawIndexed(count);pass.end();
  },dispose(){vertices.destroy();indices.destroy();texture.destroy();}};
}
