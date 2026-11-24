import {flagTexel} from './stern-flag.js?v=stern-flag-1';
import {gangwayAtlasTexel} from './gangway-finish.js?v=chair-fidelity-1';
// Existing finishes plus a dedicated boarding grain layer, prepared once.
// Board offsets/variation cover all 128 rows including the yacht's full beam.
const smooth=(a,b,x)=>{const t=Math.max(0,Math.min(1,(x-a)/(b-a)));return t*t*(3-2*t);};
const fract=x=>x-Math.floor(x);
// Periodic value noise remains continuous across repeated tiles and is filtered
// together with the weave. The fabric layer's second channel carries mottling.
function field(u,v,grid) {
 const wrap=k=>(k%grid+grid)%grid;
 const hash=(x,y)=>fract(Math.sin(wrap(x)*127.1+wrap(y)*311.7)*43758.5453);
 const x=u*grid,y=v*grid,i=Math.floor(x),j=Math.floor(y),a=smooth(0,1,x-i),b=smooth(0,1,y-j);
 return (hash(i,j)*(1-a)+hash(i+1,j)*a)*(1-b)+(hash(i,j+1)*(1-a)+hash(i+1,j+1)*a)*b;
}
export function finishPatternMips(size=256) {
 const levels=[];let data=new Float32Array(size*size*7);
 for(let y=0;y<size;y++)for(let x=0;x<size;x++){
  const u=(x+.5)/size,v=(y+.5)/size,tau=Math.PI*2,i=y*size+x;
  const grain=v+.055*Math.sin(u*tau)+.021*Math.sin(3*u*tau+v*tau);
  data[i]=.96+.084*Math.sin(3*tau*grain)+.042*Math.sin(23*tau*grain+.8*Math.sin(u*tau))
    +.030*Math.sin(51*tau*grain)+.055*(field(u,v,9)-.5);
  data[size*size+i]=.985+.046*Math.sin(u*tau)*Math.sin(v*tau)+.012*Math.cos(tau*3*v);
  const curl=field(u,v,4)*.21;
  data[6*size*size+i]=.41*field(u,v,7)+.36*field(u+curl,v-curl,28)+.23*field(u,v,110);
  const radius=Math.hypot(u-.5,v-.5),circles=Math.min(Math.abs(radius-.17),Math.abs(radius-.30),Math.abs(radius-.42));
  data[2*size*size+i]=1-smooth(.002,.004+1/size,circles);
  data[3*size*size+i]=(1-smooth(.002,.005+1/size,Math.abs(u-.5-(v-.5)*.28)))*(v>=.5&&radius<=.42?1:0);
  const boarding=gangwayAtlasTexel(u,v,size);
  data[4*size*size+i]=boarding[0];data[5*size*size+i]=boarding[1];
 }
 for(let level=0;;level++){
  const pixels=size*size,bytes=new Uint8Array(pixels*8);
  for(let layer=0;layer<2;layer++)for(let i=0;i<pixels;i++){
   let value=data[layer*pixels+i];
   if(layer===0)value=1+(value-1)*(1-smooth(5.5,7,level));
   const encoded=Math.round(Math.pow(value,1/2.4)/1.1*65535),at=(layer*pixels+i)*2;
   bytes[at]=encoded>>8;bytes[at+1]=layer===1?Math.round(data[6*pixels+i]*255):encoded&255;
  }
  for(let i=0;i<pixels;i++){bytes[pixels*4+i*2]=Math.round(data[pixels*2+i]*255);bytes[pixels*4+i*2+1]=Math.round(data[pixels*3+i]*255);}
  for(let i=0;i<pixels;i++){const encoded=Math.round(Math.pow(data[pixels*4+i],1/2.4)/1.1*65535);bytes[pixels*6+i*2]=encoded>>8;bytes[pixels*6+i*2+1]=encoded&255;}
  levels.push({size,data:bytes});if(size===1)break;
  const half=size/2,next=new Float32Array(half*half*7);
  for(let layer=0;layer<7;layer++)for(let y=0;y<half;y++)for(let x=0;x<half;x++){
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
  data[y*width+x]=(.97+.045*Math.sin(board*17.17)+.024*Math.sin(plank*53.4+.9*Math.sin(2*Math.PI*(x+.5)/width)+board))*(1-.52*Math.max(seam,.6*joint));
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
// Yarn pairs alternate over and under. Average the same periodic tile at every
// mip so the receding chair backs converge to a stable charcoal value.
function surfaceMips(finish) {
 const levels=[];
 let w=512,h=256,data=new Uint8Array(w*h);
 for(let y=0;y<h;y++) for(let x=0;x<w;x++){
   if(finish==='flag'){data[y*w+x]=flagTexel(x,y);continue;}
   if(finish==='suite-pile'||finish==='suite-linen'){
     const u=(x+.5)/w,v=(y+.5)/h;
     if(finish==='suite-pile'){
       const drift=field(u,v,9)-.5;
       const patch=.26*field(u,v,13)+.41*field(u+drift*.043,v-drift*.049,32)
         +.22*field(u,v,73)+.11*field(u,v,133);
       // Narrow brushed strands ride over the larger crushed-velour patches.
       const tuft=field(u*2.1+drift*.028,v*.51,89)-.5;
       const fibres=field(u*.62,v*1.4,131)-.5;
       const tone=.29+.73*smooth(.23,.71,patch)+.176*smooth(.48,.76,patch)+.22*tuft+.094*fibres;
       data[y*w+x]=Math.round(Math.max(0,Math.min(1,tone/1.1))*255);
     }else{
       const warp=Math.sin(u*Math.PI*2*107),weft=Math.sin(v*Math.PI*2*101);
       const crease=field(u,v,13),soft=field(u+.023*crease,v,27);
       data[y*w+x]=Math.round((.947+.026*warp*weft+.043*soft)/1.1*255);
     }
     continue;
   }
   if(finish==='stone'){
     const u=x/w,v=y/h;
     const phase=2*Math.PI*(u+v+.20*field(u,v,4)+.055*field(u,v,16));
     const vein=Math.abs(Math.sin(phase)),branch=Math.abs(Math.sin(phase*2+.4*field(v,u,8)));
     data[y*w+x]=Math.round(255*(.986-.15*(1-smooth(.012,.12,vein))-.065*(1-smooth(.015,.09,branch)))/1.1);
     continue;
   }
   const u=(x+.5)/8, v=(y+.5)/4;
   const over=(Math.floor(u)+Math.floor(v))%2===0;
   const warp=Math.sin(Math.PI*u)**2, weft=Math.sin(Math.PI*v)**2;
   const fleck=field(x/512,y/256,32);
   // The low-frequency folds modulate both yarn directions. Their frequencies
   // wrap exactly at the tile boundary and are filtered with the weave.
   const fold=Math.cos(2*Math.PI*(y/256*3+.15*Math.sin(2*Math.PI*x/512)));
   const tone=.578+.098*(over?warp:weft)+.048*warp*weft+.098*fleck+.012*fold;
   data[y*w+x]=Math.round(255*tone/1.1);
 }
 for(;;){
   levels.push(data);
   if(w===1&&h===1)return levels;
   const W=Math.max(1,w/2),H=Math.max(1,h/2),next=new Uint8Array(W*H);
   for(let y=0;y<H;y++)for(let x=0;x<W;x++){
     const i=2*y*w+2*x,dx=w>1?1:0;
     const k=h>1?i+w:i;
     next[y*W+x]=Math.round((data[i]+data[i+dx]+data[k]+data[k+dx])/4);
   }
   w=W;h=H;data=next;
 }
}
// One filtered sample supplies every opaque finish. A slice is eight teak
// planks high at the original 32 texels per plank. Thirteen contiguous
// slices cover rows 8 through 111. The last two carry cockpit fabric and the flag.
export function createFinishPatterns(device) {
 const source=finishPatternMips(),deck=teakPatternMips();
 const cloth=surfaceMips('cloth'),flag=surfaceMips('flag'),stone=surfaceMips('stone');
 // The yacht's teak starts at row 27. Rows 8–23 are outside the hull
 // and their two pages can store the owner's finishes at no memory cost.
 const roomPile=surfaceMips('suite-pile'),roomLinen=surfaceMips('suite-linen');
 const width=512,height=256,layers=20,mipLevelCount=10;
 const texture=device.createTexture({label:'Prepared yacht finish atlas',size:[width,height,layers],format:'r8unorm',
   mipLevelCount,usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST});
 let bytes=0;
 try{
   for(let mip=0;mip<mipLevelCount;mip++){
     const w=Math.max(1,width>>mip),h=Math.max(1,height>>mip),n=w*h;
     const data=new Uint8Array(n*layers),tile=source[Math.min(mip,source.length-1)],size=tile.size;
     const teak=deck[mip];
     for(let y=0;y<h;y++)for(let x=0;x<w;x++){
       const i=y*w+x,t=(y%size)*size+x%size,channel=layer=>tile.data[(layer*size*size+t)*2];
       const grain=tile.data[(size*size+t)*2+1]/255;
       data[i]=channel(0);                               // wood
       data[n+i]=channel(1);                             // canvas
       // The six bounded instrument faces use the left half. The right
       // half carries stone, filtered from its own source at every mip.
       data[2*n+i]=x<w/2?Math.max(channel(2)*.58,tile.data[(2*size*size+t)*2+1]):
         stone[mip][y*w+Math.min(w-1,(x-Math.floor(w/2))*2)];
       data[3*n+i]=channel(3);                           // gangway caulking
       data[4*n+i]=Math.round(255*(.33+.65*grain));      // woven rug
       // Teak rows 112–119 lie outside every mobile deck. The last slice
       // holds the sling weave with the same sampler and fragment pipeline.
       data[18*n+i]=cloth[mip][i];
       data[19*n+i]=flag[mip][i];
       data[5*n+i]=roomPile[mip][i];
       data[6*n+i]=roomLinen[mip][i];
       for(let page=2;page<13;page++){
         const row=Math.min(teak.height-1,Math.floor(((page+1)*256+.5*(1<<mip))/(1<<mip))+y);
         data[(5+page)*n+i]=teak.data[row*teak.width+x];
       }
     }
     bytes+=data.byteLength;
     device.queue.writeTexture({texture,mipLevel:mip},data,{bytesPerRow:w,rowsPerImage:h},[w,h,layers]);
   }
   return {texture,bytes,view:texture.createView({dimension:'2d-array'}),
     sampler:device.createSampler({addressModeU:'repeat',addressModeV:'repeat',magFilter:'linear',minFilter:'linear',mipmapFilter:'linear'})};
 }catch(error){texture.destroy();throw error;}
}
