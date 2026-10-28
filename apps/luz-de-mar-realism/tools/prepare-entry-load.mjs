import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
const root=path.resolve(import.meta.dirname,'../public'),read=async name=>JSON.parse(await fs.readFile(path.join(root,name))),manifest=await read('assets/manifest.json'),room=await read('assets/machinery/room.json');
const files={},groups={},labels={};
async function group(id,label,names){
 const found=new Set();
 async function add(name){
  name=path.posix.normalize(name.replace(/^\.\//,''));if(found.has(name))return;found.add(name);
  const bytes=await fs.readFile(path.join(root,name));files[name]??={bytes:bytes.length,sha256:crypto.createHash('sha256').update(bytes).digest('hex')};
  if(name.endsWith('.glb')){const size=bytes.readUInt32LE(12),json=JSON.parse(bytes.subarray(20,20+size));for(const item of[...(json.images||[]),...(json.buffers||[])])if(item.uri&&!/^(data:|blob:)/.test(item.uri)){if(/^[a-z]+:/i.test(item.uri))throw Error('External origin in entry dependency');await add(path.posix.join(path.posix.dirname(name),item.uri));}}
 }
 for(const n of names)await add(n);groups[id]=[...found].sort();labels[id]=label;
}
const asset=n=>'assets/'+n,at=(base,n)=>path.posix.normalize(base.replace(/^\.\//,'')+n);
await group('bootstrap','Aplicación y entorno compartido',['assets/manifest.json','assets/saloon/room.json',asset(manifest.navigation),...(manifest.structure?[asset(manifest.structure)]:[]),'assets/saloon/exterior.jpg',asset(manifest.context),...manifest.proxies.map(p=>asset(p.asset))]);
await group('decoders','Decodificadores de texturas',['decoders/basis_transcoder.js','decoders/basis_transcoder.wasm']);
for(const entry of manifest.rooms){const meta=await read(`assets/${entry.id}/room.json`),base=`assets/${entry.id}/`;await group('room/'+entry.id,meta.label,[base+'room.json',base+'room.glb',...meta.atlases.map(a=>base+a.asset),...meta.probes.map(a=>base+a.asset),...(meta.supplementGeometry?[base+meta.supplementGeometry.asset]:[])]);}
async function native(folder,kind){const name=`assets/mechanics/${folder}/${kind}.json`,m=await read(name);return[name,`assets/mechanics/${folder}/${m.binary}`];}
await group('machinery-native','Exteriores de maquinaria',[...await native('mtu-r03','exterior'),...await native('sea-strainers','exterior')]);
const choices={engines:{},electrical:room.electricalAppearance?{promoted:!!room.electricalAppearance.promoted}:null,bulkhead:room.bulkheadAppearance?{promoted:!!room.bulkheadAppearance.promoted}:null,well:!!room.filterAppearance};
for(const [side,s]of Object.entries(manifest.mechanics.mtu.appearance||{})){choices.engines[side]={previewQuery:s.previewQuery,previewAliases:s.previewAliases};await group('engine/'+side,'Motor de '+(side==='port'?'babor':'estribor'),[...Object.values(s.lods).map(l=>at(s.base,l.asset)),at(s.base,s.irradiance.asset),...s.probes.map(p=>at(s.base,p.asset)),at(s.base,s.receiver.asset)]);}
for(const [id,s]of[['bulkhead',room.bulkheadAppearance],['electrical',room.electricalAppearance]])if(s){const names=[...(s.geometries||[{asset:s.geometry}]).map(g=>g.asset),...Object.values(s.irradiances||{bulkhead:s.irradiance}),...s.probes.map(p=>p.asset),...Object.values(s.engineLighting).flatMap(e=>[e.irradiance,...e.probes.map(p=>p.asset)])];await group(id,id==='electrical'?'Frente eléctrico y mamparo':'Mamparo',[...new Set(names)].map(n=>at(s.base,n)));}
if(room.filterAppearance){const s=room.filterAppearance;await group('well','Foso e instalación de filtros',[at(s.base,s.asset),at(s.base,s.lightmap.asset)]);}
const selection=await read('assets/selection-r01/catalog.json'),sidecars={};await group('selection','Selección de equipos',['assets/selection-r01/catalog.json']);
for(const s of Object.values(selection.assets)){const name='assets/selection-r01/'+s.asset;await group('identity/'+s.geometry,'Identidad de equipos',[name]);sidecars['assets/'+s.geometry]=name;}
await group('inspection/motor','Corte y animación interna',await native('mtu-r03','inspection'));
await group('inspection/filter','Extracción de filtros',[...await native('sea-strainers','inspection'),'assets/mechanics/sea-strainers/motion.json']);
const output={version:1,rooms:Object.fromEntries(manifest.rooms.map(r=>[r.id,r.label])),choices,groups,labels,files,sidecars};await fs.writeFile(path.join(root,'assets/entry-load-r01.json'),JSON.stringify(output));console.log('Entry inventory:',Object.keys(files).length,'files; no inspection in entry profiles');
