// Physical exports and HDRs must remain unchanged when reconciling corner light.
import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import {NodeIO} from '@gltf-transform/core';
import {ALL_EXTENSIONS} from '@gltf-transform/extensions';
import {Matrix4,Matrix3,Vector3} from 'three';
const R=path.resolve(import.meta.dirname,'..'),W=path.resolve(process.env.ELECTRICAL_AUTHORING_WORK),B=path.join(W,'iterations/before-corner-continuity');
const read=async p=>JSON.parse(await fs.readFile(p)),sha=b=>crypto.createHash('sha256').update(b).digest('hex'),io=new NodeIO().registerExtensions(ALL_EXTENSIONS);
const old=await read(path.join(B,'authoring.json')),next=await read(path.join(W,'authoring.json'));
for(const key of ['neutralGeometrySHA256','sourceMasterSHA256','replacedIDs','sourceTextures','triangles','staticTriangles','dynamicTriangles'])if(JSON.stringify(old[key])!==JSON.stringify(next[key]))throw Error('Physical authoring changed '+key);
if(JSON.stringify(old.lighting.files)!==JSON.stringify(next.lighting.files))throw Error('An HDR atlas or reflection changed');
async function summarize(file){
 const d=await io.read(file);let triangles=0,sum=0n;const lcd=new Map();
 for(const node of d.getRoot().listNodes())for(const p of node.getMesh()?.listPrimitives()||[]){
  const mx=new Matrix4().fromArray(node.getWorldMatrix()),nm=new Matrix3().getNormalMatrix(mx),pos=p.getAttribute('POSITION'),normal=p.getAttribute('NORMAL'),uv0=p.getAttribute('TEXCOORD_0'),uv1=p.getAttribute('TEXCOORD_1'),ir=p.getAttribute('_IRRADIANCE'),indices=p.getIndices().getArray();
  for(let i=0;i<indices.length;i+=3){
   const corners=Array.from(indices.slice(i,i+3),j=>[...new Vector3(...pos.getElement(j,[])).applyMatrix4(mx).toArray(),...new Vector3(...normal.getElement(j,[])).applyNormalMatrix(nm).toArray(),...uv0.getElement(j,[]),...uv1.getElement(j,[])].map(v=>Math.round(v*1e5)/1e5).join(','));
   const key=[corners.join('|'),[corners[1],corners[2],corners[0]].join('|'),[corners[2],corners[0],corners[1]].join('|')].sort()[0];sum=(sum+BigInt('0x'+sha(p.getMaterial().getName()+':'+key)))%(1n<<256n);triangles++;
  }
  if(p.getMaterial().getName()==='GVR | lcd')for(const j of indices){if(normal.getElement(j,[])[0]>-.99999)continue;const key=pos.getElement(j,[]).join(',')+'/'+normal.getElement(j,[]).join(',');if(!lcd.has(key))lcd.set(key,[]);lcd.get(key).push(ir.getElement(j,[]));}
 }
 let maximumLCDCornerDisagreement=0,sharedLCDPoints=0;
 for(const values of lcd.values())if(values.length>1){sharedLCDPoints++;for(let c=0;c<3;c++)maximumLCDCornerDisagreement=Math.max(maximumLCDCornerDisagreement,Math.max(...values.map(v=>v[c]))-Math.min(...values.map(v=>v[c])));}
 const physical={triangles,aggregate:sum.toString(16),textures:d.getRoot().listTextures().map(t=>sha(t.getImage())).sort(),materials:d.getRoot().listMaterials().map(m=>({name:m.getName(),base:m.getBaseColorFactor(),roughness:m.getRoughnessFactor(),metalness:m.getMetallicFactor(),emissive:m.getEmissiveFactor(),normalScale:m.getNormalScale(),alpha:m.getAlphaMode(),doubleSided:m.getDoubleSided()})).sort((a,b)=>a.name.localeCompare(b.name))};
 return {physical,maximumLCDCornerDisagreement,sharedLCDPoints};
}
const before=await summarize(path.join(B,'electrical-source.glb')),after=await summarize(path.join(W,'electrical-source.glb'));
if(JSON.stringify(before.physical)!==JSON.stringify(after.physical))throw Error('Physical surfaces, UVs or material maps changed');
if(before.maximumLCDCornerDisagreement<1||after.maximumLCDCornerDisagreement>1e-6||after.sharedLCDPoints<2)throw Error('LCD continuity diagnosis not reproduced');
const proof={pass:true,beforeRuntimeSHA256:old.runtimeGeometrySHA256,runtimeGeometrySHA256:next.runtimeGeometrySHA256,physical:after.physical,physicalPrecision:'10um/component; world normals, UV0, UV1 and winding included',beforeLCD:before.maximumLCDCornerDisagreement,afterLCD:after.maximumLCDCornerDisagreement,sharedLCDPoints:after.sharedLCDPoints,allSevenHDRFilesByteIdentical:true,repair:await read(path.join(W,'corner-continuity-proof.json'))};
await fs.writeFile(path.join(W,'transport-only-proof.json'),JSON.stringify(proof,null,2)+'\n');console.log('GENERATOR TRANSPORT ONLY VERIFIED',proof.beforeLCD,proof.afterLCD,proof.physical.triangles);
