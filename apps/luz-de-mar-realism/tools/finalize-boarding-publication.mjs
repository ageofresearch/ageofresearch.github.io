import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import {spawn} from 'node:child_process';

const root=path.resolve(import.meta.dirname,'..');
const repo=path.resolve(root,'../..');
const work=path.join(root,'work/boarding-vr-r01');
const source=path.join(root,'public');
const output=path.join(repo,'site/luz-de-mar-realism');
const read=async p=>JSON.parse(await fs.readFile(p));
const sha=bytes=>crypto.createHash('sha256').update(bytes).digest('hex');
const preservation=await read(path.join(work,'preservation.json'));
const loading=await read(path.join(work,'loading-validation.json'));
const browser=await read(path.join(work,'browser-validation.json'));
const authoring=await read(path.join(work,'release/release-verification.json'));
const review=await read(path.join(source,'review/boarding-vr-r01/validation.json'));
if(!preservation.pass||!loading.pass||browser.errors.length)throw Error('Incomplete operational verification');
if(!authoring.pass&&authoring.status!=='pending-upload')throw Error('Authoring must be verified or explicitly reported as pending');
if(review.referenceAssessment.accepted)throw Error('This candidate has not passed independent visual acceptance');
const tests=await fs.readFile(path.join(work,'unit-tests.log'),'utf8');
if(!/(?:#|ℹ)\s+fail\s+0/.test(tests)||!/(?:#|ℹ)\s+pass\s+22/.test(tests))throw Error('Complete current unit checks required');

async function list(directory){
 const result=[];
 for(const e of await fs.readdir(directory,{withFileTypes:true})){
  const p=path.join(directory,e.name);
  if(e.isDirectory())result.push(...await list(p));else result.push(p);
 }
 return result;
}
const hashes={version:11,algorithm:'SHA-256',scope:'New page subtree excluding hashes.json and publication.json',files:{}};
for(const f of(await list(output)).sort()){
 const relative=path.relative(output,f);
 if(['assets/hashes.json','publication.json'].includes(relative))continue;
 const data=await fs.readFile(f);
 hashes.files[relative]={bytes:data.length,sha256:sha(data)};
}
const encoded=JSON.stringify(hashes,null,2)+'\n';
const publication=await read(path.join(source,'publication.json'));
if(publication.build!=='boarding-vr-r01')publication.previousBuild=publication.build;
Object.assign(publication,{
 version:11,build:'boarding-vr-r01',candidateURL:'?room=beach-club&release=boarding-vr-r01',
 strictVisualAcceptance:false,
 visualStatus:'Opt-in boarding candidate. Independent registration, stair/landing alignment and native-cell acceptance remain incomplete.',
 assetManifestSHA256:sha(encoded),
 boarding:{promoted:false,defaultGeometryUnchanged:true,review:'review/boarding-vr-r01/',authoring,
  resources:review.resources,preservation,referenceFaces:24,grid:[8,4],acceptedCells:0},
});
async function save(){for(const p of[source,output]){
 await fs.writeFile(path.join(p,'assets/hashes.json'),encoded);
 await fs.writeFile(path.join(p,'publication.json'),JSON.stringify(publication,null,2)+'\n');
}}
async function pagesSize(){return new Promise((resolve,reject)=>{
 let bytes=0;const p=spawn('tar',['--dereference','--hard-dereference','--directory',path.join(repo,'site'),'-cf','-','.']);
 p.stdout.on('data',b=>bytes+=b.length);p.stderr.on('data',b=>process.stderr.write(b));
 p.on('error',reject);p.on('close',code=>code?reject(Error('Cannot measure Pages artifact')):resolve(bytes));
});}
await save();
for(let i=0;i<3;i++){
 const bytes=await pagesSize(),previous=publication.pagesArtifact.bytes;
 publication.pagesArtifact={bytes,limit:1073741824,headroomBytes:1073741824-bytes,
  preferredHeadroomBytes:33554432,preferredHeadroomMet:1073741824-bytes>=33554432,
  note:'Entire Pages artifact measured. Existing unrelated content retained. Candidate replaces affected bundles. Authoring is excluded from Pages; Release upload remains pending.'};
 if(bytes>=1073741824)throw Error('Pages exceeds 1 GiB');
 await save();if(bytes===previous)break;
}
await fs.writeFile(path.join(work,'publication-proof.json'),JSON.stringify(publication,null,2)+'\n');
console.log(JSON.stringify({files:Object.keys(hashes.files).length,pages:publication.pagesArtifact,candidate:true}));
