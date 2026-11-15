// Existing grain/weave and 105 mm teak boards prepared once, with mipmaps.
// Board offsets/variation cover all 128 rows including the yacht's full beam.
const smooth=(a,b,x)=>{const t=Math.max(0,Math.min(1,(x-a)/(b-a)));return t*t*(3-2*t);};
const fract=x=>x-Math.floor(x);
export function finishPatternMips(size=256) {
 const levels=[];let data=new Float32Array(size*size*4);
 for(let y=0;y<size;y++)for(let x=0;x<size;x++){
  const u=(x+.5)/size,v=(y+.5)/size,tau=Math.PI*2,i=y*size+x;
  data[i]=.96+.035*Math.sin(v*tau+1.2*Math.sin(u*tau));
  data[size*size+i]=1+.015*Math.sin(u*tau)*Math.sin(v*tau);
  const radius=Math.hypot(u-.5,v-.5),circles=Math.min(Math.abs(radius-.17),Math.abs(radius-.30),Math.abs(radius-.42));
  data[2*size*size+i]=1-smooth(.002,.004+1/size,circles);
  data[3*size*size+i]=(1-smooth(.002,.005+1/size,Math.abs(u-.5-(v-.5)*.28)))*(v>=.5&&radius<=.42?1:0);
 }
 for(let level=0;;level++){
  const pixels=size*size,bytes=new Uint8Array(pixels*6);
  for(let layer=0;layer<2;layer++)for(let i=0;i<pixels;i++){
   let value=data[layer*pixels+i];
   if(layer===0)value=1+(value-1)*(1-smooth(5.5,7,level));
   const encoded=Math.round(Math.pow(value,1/2.4)/1.1*65535),at=(layer*pixels+i)*2;
   bytes[at]=encoded>>8;bytes[at+1]=encoded&255;
  }
  for(let i=0;i<pixels;i++){bytes[pixels*4+i*2]=Math.round(data[pixels*2+i]*255);bytes[pixels*4+i*2+1]=Math.round(data[pixels*3+i]*255);}
  levels.push({size,data:bytes});if(size===1)break;
  const half=size/2,next=new Float32Array(half*half*4);
  for(let layer=0;layer<4;layer++)for(let y=0;y<half;y++)for(let x=0;x<half;x++){
   const i=layer*pixels+2*y*size+2*x;
   next[layer*half*half+y*half+x]=(data[i]+data[i+1]+data[i+size]+data[i+size+1])/4;
  }
  data=next;size=half;
 }
 return levels;
}
export function teakPatternMips(width=512,height=4096) {
 const levels=[];let data=new Float32Array(width*height);
 for(let y=0;y<height;y++)for(let x=0;x<width;x++){
  const plank=(y+.5)/height*128,board=Math.floor(plank)-64;
  const end=fract((x+.5)/width+fract(board*.618034)*1.7/2.15);
  const seam=1-smooth(0,.035+128/height,Math.min(fract(plank),1-fract(plank)));
  const joint=1-smooth(0,.001+1/width,Math.min(end,1-end));
  data[y*width+x]=(.97+.045*Math.sin(board*17.17))*(1-.52*Math.max(seam,.6*joint));
 }
 for(let level=0;;level++){
  const bytes=Uint8Array.from(data,v=>Math.round(Math.pow(1+(v-1)*(1-smooth(2,5,level)),1/2.4)/1.1*255));
  levels.push({width,height,data:bytes});if(width===1&&height===1)break;
  const w=Math.max(1,width/2),h=Math.max(1,height/2),next=new Float32Array(w*h);
  for(let y=0;y<h;y++)for(let x=0;x<w;x++){
   const x0=Math.min(2*x,width-1),x1=Math.min(x0+1,width-1),y0=Math.min(2*y,height-1),y1=Math.min(y0+1,height-1);
   next[y*w+x]=(data[y0*width+x0]+data[y0*width+x1]+data[y1*width+x0]+data[y1*width+x1])/4;
  }
  data=next;width=w;height=h;
 }
 return levels;
}
export function createFinishPatterns(device) {
 const levels=finishPatternMips(),teakLevels=teakPatternMips(),usage=GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST;
 const texture=device.createTexture({label:'Prepared timber grain, canvas and static instruments',size:[256,256,3],format:'rg8unorm',mipLevelCount:levels.length,usage});
 let teak;
 try {
  teak=device.createTexture({label:'Prepared teak board joints',size:[512,4096],format:'r8unorm',mipLevelCount:teakLevels.length,usage});
  levels.forEach(({size,data},mipLevel)=>device.queue.writeTexture({texture,mipLevel},data,{bytesPerRow:size*2,rowsPerImage:size},[size,size,3]));
  teakLevels.forEach(({width,height,data},mipLevel)=>device.queue.writeTexture({texture:teak,mipLevel},data,{bytesPerRow:width},[width,height]));
  return {texture,teak,bytes:[...levels,...teakLevels].reduce((n,l)=>n+l.data.byteLength,0),view:texture.createView({dimension:'2d-array'}),
   sampler:device.createSampler({addressModeU:'repeat',addressModeV:'repeat',magFilter:'linear',minFilter:'linear',mipmapFilter:'linear'})};
 }catch(error){texture.destroy();teak?.destroy();throw error;}
}
