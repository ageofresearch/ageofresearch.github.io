import {readFile} from 'node:fs/promises';
import {fixture} from './yacht-saloon-fixture.mjs';
import {decodeUpper,connectUpper} from '../site/tidewater-rocha/mobile/upper-terrace.js';
import {decodeSun,connectSun} from '../site/tidewater-rocha/mobile/sun-deck.js';
import {decodeUpperInterior,connectUpperInterior} from '../site/tidewater-rocha/mobile/upper-interior.js';
import {decodeBridge,connectBridge} from '../site/tidewater-rocha/mobile/bridge-helm.js';
import {decodeBow,connectBow} from '../site/tidewater-rocha/mobile/bow-deck.js';
import {decodeBridgeAccess,connectBridgeAccess} from '../site/tidewater-rocha/mobile/bridge-access.js';
import {decodeGuestAccess,connectGuestAccess} from '../site/tidewater-rocha/mobile/guest-access.js';
import {buildYachtGeometry,i as Walk,l as basis} from '../site/tidewater-rocha/assets/RochaYachtState-P5KwIGIl.js';
const root=new URL('../site/tidewater-rocha/',import.meta.url);
export const array=b=>b.buffer.slice(b.byteOffset,b.byteOffset+b.byteLength);
async function load(name,decode) {
  const manifest=JSON.parse(await readFile(new URL('mobile/'+name+'.json',root)));
  const binary=await readFile(new URL('mobile/'+name+'.bin',root));
  return {manifest,binary,decoded:decode(manifest,array(binary))};
}
export const {manifest,binary,decoded:guest}=await load('guest-access',decodeGuestAccess);
const stages=await Promise.all([
  ['upper-terrace',decodeUpper,connectUpper],['sun-deck',decodeSun,connectSun],
  ['upper-interior',decodeUpperInterior,connectUpperInterior],['bridge-helm',decodeBridge,connectBridge],
  ['bow-deck',decodeBow,connectBow],['bridge-access',decodeBridgeAccess,connectBridgeAccess]
].map(async([name,decode,connect])=>({...(await load(name,decode)),connect})));
export function mobile(ready=true) {
  const f=fixture();for(const s of stages)s.connect(f.walk,s.decoded);
  if(ready)connectGuestAccess(f.walk,guest);return f;
}
export async function full() {
  const data=JSON.parse(await readFile(new URL('rocha/luz-de-mar/model.json',root))),b=await readFile(new URL('rocha/luz-de-mar/model.bin',root));
  const asset={data,binary:array(b),nav:Object.fromEntries(Object.entries(data.nav).map(([id,n])=>[id,{...n,bits:Uint8Array.from(atob(n.mask),c=>c.charCodeAt(0))}]))};
  const model=buildYachtGeometry(asset,0,{mtuEngines:false,seaStrainers:false});model.asset=asset;model.group.userData={yacht:basis};
  const walk=new Walk({camera:{position:model.group.position.clone()},player:{position:model.group.position.clone()}},model,{document:null});
  return {model,walk};
}
