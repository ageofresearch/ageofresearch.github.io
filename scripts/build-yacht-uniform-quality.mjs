import {readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import {isDeepStrictEqual} from 'node:util';
import {buildGuestAccess} from './build-yacht-guest-access.mjs';

const root=new URL('../site/tidewater-rocha/mobile/',import.meta.url);
export async function buildUniformQuality() {
  const result=await buildGuestAccess({uniform:true}),source=result.manifest.profiles.uniform;
  const chunks=[];let offset=0;
  const copy=d=>{const bytes=result.binary.subarray(d.offset,d.offset+d.length*4),out={...d,offset};chunks.push(bytes);offset+=bytes.length;return out;};
  const batches=source.batches.map(b=>({...b,attributes:Object.fromEntries(Object.entries(b.attributes).map(([k,d])=>[k,copy(d)])),indices:copy(b.indices)}));
  const binary=Buffer.concat(chunks);
  const guestManifest=await readFile(new URL('guest-access.json',root));
  const guestBinary=await readFile(new URL('guest-access.bin',root));
  const {uniform,...legacyProfiles}=result.manifest.profiles;
  if(!isDeepStrictEqual({...result.manifest,profiles:legacyProfiles},JSON.parse(guestManifest))||
    !result.binary.subarray(0,guestBinary.length).equals(guestBinary))
    throw Error('Regenerate the guest package before building uniform quality');
  return {manifest:{version:'uniform-quality-1',sourceSHA256:result.manifest.sourceSHA256,
    guestSHA256:createHash('sha256').update(guestManifest).digest('hex'),
    profiles:{uniform:{...source,batches}}},binary};
}
if(process.argv[1]===fileURLToPath(import.meta.url)) {
  const {manifest,binary}=await buildUniformQuality();
  await writeFile(new URL('uniform-quality.json',root),JSON.stringify(manifest));
  await writeFile(new URL('uniform-quality.bin',root),binary);
  console.log('Uniform',manifest.profiles.uniform.triangles,'triangles',binary.length,'bytes');
}
