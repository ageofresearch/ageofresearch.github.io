import {readFileSync,existsSync} from 'node:fs';
import {resolve,join,sep} from 'node:path';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
const root=resolve(import.meta.dirname,'../site/sucre/adoquin');
const read=name=>JSON.parse(readFileSync(join(root,name),'utf8'));
const sha=file=>createHash('sha256').update(readFileSync(file)).digest('hex');
const release=read('release.json'),proposal=read('proposal.json'),native=read('native-result.json'),acceptance=read('acceptance.json'),references=read('references.json');
assert.equal(acceptance.status,'passed');assert.equal(acceptance.authoringCommit,release.authoringCommit);assert.equal(acceptance.testedManifestSha256,sha(join(root,'release.json')),'Paver acceptance belongs to a different build');
for(const [name,digest]of Object.entries(release.files)){const file=resolve(root,name);assert.ok(file.startsWith(root+sep),'Release path escapes study');assert.ok(existsSync(file),'Missing paver release file '+name);assert.equal(sha(file),digest,'Changed paver release file '+name);}
assert.deepEqual(release.proposal,proposal,'Release proposal differs from the published proposal');
assert.deepEqual(proposal.dimensionsM,{length:.2,width:.1,height:.06});assert.equal(proposal.geometryFamilies,16);assert.equal(proposal.patchPieces,103);assert.equal(proposal.patchFullUnitEquivalents,96);assert.match(proposal.basis,/visual proposal/i);assert.match(proposal.composition,/illustrative/i);
function checkInstallation(metadata,{measured=false}={}){
  assert.equal(metadata.pattern,'herringbone-90');assert.equal(metadata.profile,'installed');
  assert.equal(metadata.pieceCount,103);assert.equal(metadata.fullPieces,89);assert.equal(metadata.cutPieces,14);assert.equal(metadata.fullUnitEquivalents,96);
  assert.equal(metadata.fullPieces+metadata.cutPieces,metadata.pieceCount);assert.equal(metadata.fullPieces+metadata.cutPieces/2,metadata.fullUnitEquivalents);
  assert.equal(metadata.columns,16);assert.equal(metadata.rows,12);assert.equal(metadata.cellPitchM,.102);
  assert.equal(metadata.fieldWidthM,1.632);assert.equal(metadata.fieldDepthM,1.224);assert.deepEqual(metadata.fieldSizeM,[1.632,1.224]);
  assert.deepEqual(metadata.bodyJointRangeM,[.002,.004]);assert.equal(metadata.nominalTopM,.011);assert.equal(metadata.sandTopM,.0098);
  assert.ok(metadata.nominalTopM>metadata.sandTopM&&metadata.nominalTopM-metadata.sandTopM<=.0013);assert.ok(metadata.maximumVerticalJitterM<=.00005);
  if(measured){
    assert.ok(Number.isFinite(metadata.minTopClearanceM)&&metadata.minTopClearanceM>0,'Joint fill submerges a paver top');
    assert.equal(metadata.paverMaterialCount,1);assert.equal(metadata.accessoryMaterialCount,2);
    assert.equal(metadata.cellCoverage.length,12);for(const row of metadata.cellCoverage){assert.equal(row.length,16);assert.ok(row.every(n=>n===1),'Installed cells are missing or repeated');}
    assert.equal(metadata.placements.length,103);assert.equal(metadata.placements.filter(p=>p.full).length,89);assert.equal(metadata.placements.filter(p=>!p.full).length,14);
  }
}
checkInstallation(proposal.installation);checkInstallation(native.installation,{measured:true});checkInstallation(acceptance.installation,{measured:true});
assert.equal(acceptance.runtime.summary.patchCount,103);assert.equal(acceptance.runtime.summary.variantCount,16);
assert.equal(acceptance.installation.accessoryRoles.filter(role=>role==='joint-fill').length,1);assert.ok(acceptance.installation.accessoryRoles.includes('confinement'));
assert.equal(native.status,'passed');assert.deepEqual(native.errors,[]);assert.equal(native.runtime.aa.lookupState,'ready');assert.equal(native.runtime.aa.effectiveMode,'smaa');assert.ok(native.runtime.frames>=40);assert.ok(native.runtime.redPixels>30000);assert.ok(native.runtime.changedPixels>native.runtime.redPixels*.15);assert.equal(native.runtime.materialCount,1);
for(const [name,digest]of Object.entries(native.source.files))assert.equal(release.inputs[name],digest,'Stale paver source proof '+name);
assert.deepEqual(native.sceneModes.map(m=>m.pieces),[1,16,103]);assert.deepEqual(acceptance.pageErrors,[]);assert.deepEqual(acceptance.runtime.errors,[]);assert.equal(acceptance.runtime.aa.effectiveMode,'smaa');assert.ok(acceptance.runtime.frames>6);
for(const [mode,count]of [['single',1],['variants',16],['patch',103]])assert.equal(acceptance.sceneModes[mode].pieces,count);
const coverage=native.installationCoverage;
assert.equal(coverage.status,'passed');assert.deepEqual(coverage.fieldSizeM,[1.632,1.224]);assert.equal(coverage.width,512);assert.equal(coverage.height,384);assert.ok(coverage.testedPixels>150000);
for(const name of ['testedPixels','paverPixels','sandPixels','confinementPixels','uncoveredPixels','unexpectedPixels'])assert.ok(Number.isSafeInteger(coverage[name])&&coverage[name]>=0,'Invalid installation coverage count '+name);
assert.equal(coverage.uncoveredPixels,0,'Installed field exposes the background');assert.equal(coverage.unexpectedPixels,0);assert.equal(coverage.confinementPixels,0,'Confinement intrudes into the installed field');assert.ok(coverage.sandPixels>0);
assert.equal(coverage.paverPixels+coverage.sandPixels+coverage.confinementPixels+coverage.uncoveredPixels+coverage.unexpectedPixels,coverage.testedPixels);
assert.equal(coverage.paverCoverage,coverage.paverPixels/coverage.testedPixels);assert.ok(coverage.paverCoverage>.85,'Joint fill hides too much paver area');
assert.ok(Number.isSafeInteger(coverage.negativeControl.uncoveredPixels)&&coverage.negativeControl.uncoveredPixels>0);assert.equal(coverage.negativeControl.fraction,coverage.negativeControl.uncoveredPixels/coverage.testedPixels);assert.ok(coverage.negativeControl.fraction>.005,'Removing the joint fill did not expose measurable gaps');
for(const name of ['pieceCount','fullPieces','cutPieces','fullUnitEquivalents','nominalTopM','sandTopM','minTopClearanceM','bodyJointRangeM'])assert.deepEqual(coverage.metadata[name],native.installation[name],'Coverage metadata differs from the rendered installation: '+name);
for(const prefix of ['Visible WebGPU','Compiled Rocha','100px welcome','Visible detailed','Seeded variant','Pointer orbit','Raking-light','Wetness control','All 16','Installed pavement top','Narrow-screen','All three actual-render'])assert.ok(acceptance.checks.some(s=>s.startsWith(prefix)),'Missing paver browser scenario '+prefix);
assert.ok(acceptance.seedVariation.changedPixelFraction>.002);assert.ok(acceptance.lighting.meanAbsoluteRgbError>.1);assert.ok(acceptance.wetness.meanAbsoluteRgbError>.1);assert.equal(acceptance.mobile.welcomeHeight,100);assert.ok(acceptance.mobile.scrollWidth<=acceptance.mobile.clientWidth+1);assert.equal(acceptance.fallback.length,3);assert.ok(acceptance.fallback.every(f=>f.width>100&&f.alt));
assert.equal(acceptance.referenceStudy.rows,20);assert.equal(acceptance.referenceStudy.sourceLinks,20);assert.equal(acceptance.referenceStudy.photographLinks,20);
for(const size of ['desktop','mobile']){const layout=acceptance.referenceStudy[size];assert.equal(layout.headerHeight,100);assert.ok(layout.tableFontSize>=12);assert.ok(layout.scrollWidth<=layout.clientWidth+1);}
assert.ok(acceptance.referenceStudy.mobile.tableScrollWidth>acceptance.referenceStudy.mobile.wrapperWidth);assert.ok(acceptance.checks.some(s=>s.startsWith('Working study link to all 20')));
assert.equal(acceptance.visualAcceptance.status,'passed');assert.ok(acceptance.captures.length>=8);assert.ok(acceptance.captures.every(c=>c.format==='lossless PNG'&&c.sha256));
for(const name of ['patch-top','patch-low-angle','patch-macro']){assert.ok(acceptance.captures.some(c=>c.name===name),'Missing browser installation capture '+name);assert.ok(native.captures.some(c=>c.name===name),'Missing native installation capture '+name);}
const html=readFileSync(join(root,'index.html'),'utf8');assert.ok(html.includes('welcome to sucre')&&html.includes('Adoquín rojo')&&html.includes('propuesta visual'));
assert.deepEqual(proposal.referenceStudy,{count:20,data:'references.json',page:'referencias.html'});assert.ok(release.files['references.json']&&release.files['referencias.html']);assert.match(html,/href=["'](?:\.\/)?referencias\.html["']/);
assert.equal(references.schemaVersion,1);assert.equal(references.count,20);assert.equal(references.references.length,20);assert.match(references.reviewDate,/^\d{4}-\d{2}-\d{2}$/);
assert.ok(references.scope&&references.method&&references.findings.length>=4);assert.match(references.method,/No se dedujeron medidas/i);assert.match(references.modelDecisions.numericBasis,/no una especificaci[oó]n extra[ií]da del DWG/i);assert.deepEqual(references.modelDecisions.bodyJointRangeM,[.002,.004]);
assert.equal(new Set(references.references.map(r=>r.sourcePhotoSha256)).size,20,'Duplicate reference photographs');assert.equal(new Set(references.references.map(r=>r.imageURL)).size,20,'Duplicate reference image URLs');
const provenanceLabels=['Publicada por la fuente','Inferida visualmente; no geolocalización publicada','Fabricante colombiano; ciudad de la fotografía no publicada'];
const provenanceCounts=Object.fromEntries(provenanceLabels.map(label=>[label,0]));
const referenceHtml=readFileSync(join(root,'referencias.html'),'utf8');
const escape=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function checkExternalURL(value){const url=new URL(value);assert.ok(['https:','http:'].includes(url.protocol)&&url.hostname&&!url.username&&!url.password,'Invalid reference link '+value);}
assert.equal((referenceHtml.match(/<td class="number">/g)||[]).length,20,'Reference page must contain all twenty comparisons');assert.match(referenceHtml,/<html lang="es">/);assert.ok(referenceHtml.includes('welcome to sucre'));assert.match(referenceHtml,/href="\.\/references\.json"/);assert.ok(referenceHtml.includes('no se midieron sobre las fotografías'));
for(const [index,reference]of references.references.entries()){
  assert.equal(reference.number,index+1);assert.equal(reference.viewed,true);assert.match(reference.sourcePhotoSha256,/^[a-f0-9]{64}$/);assert.ok(Number.isInteger(reference.width)&&reference.width>=300&&Number.isInteger(reference.height)&&reference.height>=200,'Reference photograph is too small');
  for(const name of ['title','sourceName','observation','location','locationBasis'])assert.ok(typeof reference[name]==='string'&&reference[name].trim(),'Missing reference '+name);
  assert.ok(provenanceLabels.includes(reference.locationBasis),'Unqualified reference location');provenanceCounts[reference.locationBasis]++;
  if(reference.locationBasis===provenanceLabels[1])assert.match(reference.location,/inferid/i,'Inferred location must be labeled in its display text');
  if(reference.locationBasis===provenanceLabels[2])assert.equal(reference.location,'Ciudad no publicada');
  for(const name of ['sourcePage','imageURL']){checkExternalURL(reference[name]);assert.ok(referenceHtml.includes('href="'+escape(reference[name])+'" target="_blank" rel="noopener noreferrer"'),'Reference page is missing its safe source link');}
  for(const name of ['title','sourceName','observation','location','locationBasis'])assert.ok(referenceHtml.includes(escape(reference[name])),'Reference page omits '+name+' for image '+reference.number);
}
assert.deepEqual(references.locationConfidenceCounts,provenanceCounts);assert.deepEqual(Object.values(provenanceCounts),[13,3,4]);
assert.ok(references.technicalSources.length>=2);for(const source of references.technicalSources){checkExternalURL(source.url);assert.ok(source.title&&source.use);assert.ok(referenceHtml.includes('href="'+escape(source.url)+'" target="_blank" rel="noopener noreferrer"'));}
console.log('Paver study validation passed: 16 unchanged display variants; 103 installed pieces (89 full + 14 cuts, 96 full-unit equivalents); filled-field GPU coverage and negative control; 20 reviewed references; accepted Rocha WebGPU build and unchanged illustrative dimensions.');
