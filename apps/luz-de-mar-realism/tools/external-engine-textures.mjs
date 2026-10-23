// Keep meshopt GLB geometry intact while sharing content-addressed KTX2 images
// between LODs. Rebase only embedded-buffer offsets; fallback buffer 1 is virtual.
import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
export async function externalEngineTextures(file){
 const bytes=await fs.readFile(file),jsonLength=bytes.readUInt32LE(12),json=JSON.parse(bytes.subarray(20,20+jsonLength)),binStart=28+jsonLength,bin=bytes.subarray(binStart),removed=new Set(),ranges=[];
 if(bytes.readUInt32LE(0)!==0x46546c67||bytes.readUInt32LE(20+jsonLength)!==bin.length||bytes.readUInt32LE(24+jsonLength)!==0x004e4942)throw Error('Invalid GLB chunks');
 for(const im of json.images||[]){
  const index=im.bufferView,v=json.bufferViews[index];if(!v||v.buffer!==0||im.mimeType!=='image/ktx2')throw Error('Expected embedded KTX2 image');
  const start=v.byteOffset||0,end=start+v.byteLength,image=bin.subarray(start,end),hash=crypto.createHash('sha256').update(image).digest('hex');
  im.uri='texture-'+hash+'.ktx2';await fs.writeFile(path.join(path.dirname(file),im.uri),image);delete im.bufferView;
  if(!removed.has(index)){removed.add(index);ranges.push([start,Math.ceil(end/4)*4]);}
 }
 ranges.sort((a,b)=>a[0]-b[0]);for(let i=1;i<ranges.length;i++)if(ranges[i][0]<ranges[i-1][1])throw Error('Overlapping image buffers');
 const rebase=offset=>{if(ranges.some(([a,b])=>offset>=a&&offset<b))throw Error('Geometry references removed image bytes');return offset-ranges.reduce((n,[a,b])=>n+(b<=offset?b-a:0),0);};
 const remap=new Map(),views=[];for(const[index,v]of json.bufferViews.entries()){if(removed.has(index))continue;remap.set(index,views.length);if(v.buffer===0)v.byteOffset=rebase(v.byteOffset||0);const e=v.extensions?.EXT_meshopt_compression;if(e?.buffer===0)e.byteOffset=rebase(e.byteOffset||0);views.push(v);}json.bufferViews=views;
 function visit(o){if(!o||typeof o!=='object')return;for(const[k,v]of Object.entries(o)){if(k==='bufferView'){if(!remap.has(v))throw Error('Referenced image buffer');o[k]=remap.get(v);}else visit(v);}}visit(json);
 let cursor=0;const chunks=[];for(const[a,b]of ranges){chunks.push(bin.subarray(cursor,a));cursor=b;}chunks.push(bin.subarray(cursor));const payload=Buffer.concat(chunks);json.buffers[0].byteLength-=ranges.reduce((n,[a,b])=>n+b-a,0);
 const source=Buffer.from(JSON.stringify(json)),encoded=Buffer.alloc(Math.ceil(source.length/4)*4,0x20);source.copy(encoded);const head=Buffer.alloc(20),bh=Buffer.alloc(8);head.writeUInt32LE(0x46546c67,0);head.writeUInt32LE(2,4);head.writeUInt32LE(28+encoded.length+payload.length,8);head.writeUInt32LE(encoded.length,12);head.writeUInt32LE(0x4e4f534a,16);bh.writeUInt32LE(payload.length,0);bh.writeUInt32LE(0x004e4942,4);await fs.writeFile(file,Buffer.concat([head,encoded,bh,payload]));
 return{sharedImages:json.images.length,bytesRemovedFromGlb:bin.length-payload.length};
}
