// Probe the lossless codec before requesting the large model. Keep the
// original PNG model for unsupported or blocked decoders. Model/network errors
// still reach the existing Retry yacht UI rather than downloading twice.
const sample="data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQuEY0vf+BiOh/AAA=";
let supported;
export function supportsLosslessWebP(){
 return supported??=(async()=>{
  try{
   if(typeof createImageBitmap==='function'){
    const bytes=Uint8Array.from(atob(sample.split(',')[1]),c=>c.charCodeAt(0));
    const image=await createImageBitmap(new Blob([bytes],{type:'image/webp'}));
    const ok=image.width===1&&image.height===1;image.close();return ok;
   }
   return await new Promise(resolve=>{
    const image=new Image();image.onload=()=>resolve(image.naturalWidth===1&&image.naturalHeight===1);image.onerror=()=>resolve(false);image.src=sample;
   });
  }catch{return false;}
 })();
}
export async function selectYachtModelURL(base){
 return new URL(await supportsLosslessWebP()?'grande-36m-lossless-webp-v1.glb':'grande-36m.glb',base);
}
