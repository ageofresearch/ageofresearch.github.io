// Finalize only the independent viewer, with the original-yacht byte guard.
import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import {execFile}from'node:child_process';
import{promisify}from'node:util';
const R=path.resolve(import.meta.dirname,'..'),repo=path.resolve(R,'../..'),P=path.join(R,'public'),S=path.join(repo,'site/luz-de-mar-realism'),W=path.join(R,'work/electrical-no-stairs-r04'),baseline=path.join(W,'baseline/luz-de-mar-realism'),read=async p=>JSON.parse(await fs.readFile(p)),sha=b=>crypto.createHash('sha256').update(b).digest('hex'),run=promisify(execFile);
const proof=await read(path.join(W,'removal-proof.json')),physical=await read(path.join(W,'physical-components-proof.json')),browser=await read(path.join(W,'public-smoke/report.json'));
if(!proof.pass||!physical.pass||!browser.pass||proof.headroom.afterLowCells)throw Error('Incomplete removal validation');
const strategy='/workspace/documents/luz-de-mar-estrategia-vr-v1.0/Luz-de-Mar_Estrategia-de-reconstruccion-y-realismo-VR_v1.0.pdf',strategySHA='023852c67153ab6ff0f76cad934e8c38bb28f5f3105f1451a282bc3f4ed09b0c';
if(sha(await fs.readFile(strategy))!==strategySHA||(await fs.stat(strategy)).mode&0o222)throw Error('Immutable strategy changed');
const original=await read(path.join(R,'work/left-engine-r13/original-629.json'));for(const[n,h]of Object.entries(original))if(sha(await fs.readFile(path.join(repo,'site',n)))!==h)throw Error('Original yacht changed '+n);
const guard=await read(path.join(W,'baseline-hashes.json'));for(const[n,h]of Object.entries(guard.files))if(sha(await fs.readFile(path.join(R,n)))!==h)throw Error('Protected mechanics changed '+n);
const old=await read(path.join(baseline,'assets/hashes.json'));let unchanged=0;
for(const[n,item]of Object.entries(old.files))if(/^assets\/(saloon|cockpit|beach-club|port-side|starboard-side|bow|context)\//.test(n)){if(sha(await fs.readFile(path.join(S,n)))!==item.sha256)throw Error('Unrelated room changed '+n);unchanged++;}
for(const f of await fs.readdir(path.join(baseline,'assets')))if(/\.(js|css)$/.test(f)){const target=path.join(S,'assets',f);try{await fs.access(target);}catch{await fs.copyFile(path.join(baseline,'assets',f),target);}}
const manifest=await read(path.join(S,'assets/manifest.json'));for(const room of manifest.rooms)if(sha(await fs.readFile(path.join(S,'assets',room.geometry)))!==room.sha256)throw Error('Room hash mismatch '+room.id);
async function files(dir){const a=[];for(const e of await fs.readdir(dir,{withFileTypes:true})){const p=path.join(dir,e.name);if(e.isDirectory())a.push(...await files(p));else a.push(p);}return a;}
const hashes={version:6,algorithm:'SHA-256',scope:'Independent viewer; hashes.json/publication.json excluded to avoid circular hashes',files:{}};
for(const f of(await files(S)).sort()){const name=path.relative(S,f);if(['assets/hashes.json','publication.json'].includes(name))continue;const b=await fs.readFile(f);hashes.files[name]={bytes:b.length,sha256:sha(b)};}
const encoded=JSON.stringify(hashes,null,2)+'\n',publication={version:6,build:'electrical-no-stairs-r04',candidateURL:'?room=machinery&engine=right-vr-r01&bulkhead=vr-r01&electrical=vr-r04',scope:manifest.rooms.map(r=>r.id),stairRemoval:{...proof,defaultAndCandidate:true,relocated:false},originalYacht:{filesVerified:629,allOriginalSHA256Match:true},originalEngineAssetsUnchanged:true,strategy:{id:'LDM-VR-EST-001 v1.0',sha256:strategySHA,unchanged:true},existingRoomAssets:{verified:unchanged,allUnchanged:true},functionalBrowserChecks:true,assetManifestSHA256:sha(encoded),authoringRelease:'https://github.com/ageofresearch/ageofresearch.github.io/releases/tag/luz-electrical-no-stairs-r04',renderer:'Three.js 0.180.0 / WebGL2',strictVisualAcceptance:false,visualStatus:'Misplaced service stairs removed; relocation deferred. Wider room reconstruction remains a candidate.',pagesArtifact:{bytes:0,limit:1073741824,minimumHeadroomBytes:33554432,headroomBytes:0}};
for(const d of[P,S])await fs.writeFile(path.join(d,'assets/hashes.json'),encoded);
let last=0;for(let attempt=0;attempt<3;attempt++){
 for(const d of[P,S])await fs.writeFile(path.join(d,'publication.json'),JSON.stringify(publication,null,2)+'\n');
 const tar='/tmp/luz-no-stairs-pages-check.tar';await run('tar',['--dereference','--hard-dereference','--directory',path.join(repo,'site'),'-cf',tar,'.']);const size=(await fs.stat(tar)).size;publication.pagesArtifact.bytes=size;publication.pagesArtifact.headroomBytes=1073741824-size;if(size===last)break;last=size;
}
if(publication.pagesArtifact.headroomBytes<33554432)throw Error('Insufficient Pages margin');
for(const d of[P,S])await fs.writeFile(path.join(d,'publication.json'),JSON.stringify(publication,null,2)+'\n');
console.log('R04 PUBLICATION READY',JSON.stringify(publication.pagesArtifact));
