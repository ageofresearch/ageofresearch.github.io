import {Texture} from './tidewater/engine/gpu/Texture.js';
import {GPU} from './tidewater/engine/gpu/GPU.js';
import {generateMipmaps} from './tidewater/engine/gpu/Mipmaps.js';

// Local CC0 scans; no third-party requests are made by the published scene.
// Color is sampled as linear light, while normals and roughness stay linear data.
export const furnitureTextures={};
export async function loadFurnitureTextures(){
 if(!GPU.device)return;
 await Promise.all(['wood','linen'].map(async kind=>{
  const maps=await Promise.all(['color','normal','roughness'].map(async channel=>{
   const response=await fetch(new URL(`assets/materials/${kind}-${channel}.jpg`,import.meta.url));
   if(!response.ok)throw Error(`No se pudo cargar el acabado ${kind}/${channel}`);
   const bitmap=await createImageBitmap(await response.blob(),{colorSpaceConversion:'none'});
   const texture=new Texture({label:`Turbaco · scanned ${kind} ${channel}`,width:bitmap.width,height:bitmap.height,format:channel==='color'?'rgba8unorm-srgb':'rgba8unorm',mips:true,sampler:'anisoRepeat'});
   GPU.queue.copyExternalImageToTexture({source:bitmap},{texture:texture.getGPU()},{width:bitmap.width,height:bitmap.height});
   bitmap.close();generateMipmaps(texture);return texture;
  }));
  furnitureTextures[kind]=Object.fromEntries(['color','normal','roughness'].map((key,i)=>[key,maps[i]]));
 }));
}
