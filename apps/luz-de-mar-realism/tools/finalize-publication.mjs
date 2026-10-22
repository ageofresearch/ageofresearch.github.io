import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
const app=path.resolve(import.meta.dirname,'..'),repo=path.resolve(app,'../..'),site=path.join(repo,'site/luz-de-mar-realism'),pub=path.join(app,'public'),guard=JSON.parse(await fs.readFile(process.argv[2],'utf8'));
async function walk(dir){const files=[];for(const entry of await fs.readdir(dir,{withFileTypes:true})){const p=path.join(dir,entry.name);if(entry.isDirectory())files.push(...await walk(p));else files.push(p);}return files;}
const sha=b=>crypto.createHash('sha256').update(b).digest('hex'),original=path.join(repo,'site/tidewater-rocha'),oldFiles=await walk(original),oldNames=oldFiles.map(p=>path.relative(original,p).split(path.sep).join('/')).sort();
if(JSON.stringify(oldNames)!==JSON.stringify(Object.keys(guard.files).sort()))throw Error('Original yacht file inventory changed');
for(const name of oldNames)if(sha(await fs.readFile(path.join(original,name)))!==guard.files[name])throw Error('Original yacht modified: '+name);
for(const dir of [pub,site]){await fs.mkdir(path.join(dir,'review'),{recursive:true});await fs.writeFile(path.join(dir,'review/original-yacht-hashes.json'),JSON.stringify(guard,null,2)+'\n');}
const hashes={version:1,algorithm:'SHA-256',scope:'Published new-page subtree, excluding this manifest and publication.json to avoid circular hashes.',files:{}};
for(const file of (await walk(site)).sort()){const name=path.relative(site,file).split(path.sep).join('/');if(['assets/hashes.json','publication.json'].includes(name))continue;const bytes=await fs.readFile(file);hashes.files[name]={bytes:bytes.length,sha256:sha(bytes)};}
const encoded=JSON.stringify(hashes,null,2)+'\n';await fs.mkdir(path.join(site,'assets'),{recursive:true});await fs.writeFile(path.join(site,'assets/hashes.json'),encoded);await fs.writeFile(path.join(pub,'assets/hashes.json'),encoded);
const meta=JSON.parse(await fs.readFile(path.join(pub,'assets/saloon/authoring.json'),'utf8')),browser=JSON.parse(await fs.readFile(path.join(pub,'review/performance.json'),'utf8'));
if(!browser.pass||browser.authoringRevision!==meta.revision)throw Error('Missing browser validation for this authoring revision');
const publication={version:1,build:'main-saloon-r'+meta.revision,scope:'Main saloon and adjoining dining area only',sourceBaseCommit:guard.commit,authoringRevision:meta.revision,assetManifestSHA256:sha(encoded),originalYacht:{filesVerified:oldNames.length,allOriginalSHA256Match:true},functionalBrowserChecks:browser.pass,renderer:'Three.js 0.180.0 / WebGL2',visualStatus:'Reference-led work in progress; no photographic-parity or hardware-FPS claim.'};
for(const dir of [pub,site])await fs.writeFile(path.join(dir,'publication.json'),JSON.stringify(publication,null,2)+'\n');
console.log('Verified',oldNames.length,'original yacht files; hashed',Object.keys(hashes.files).length,'new-page files');
