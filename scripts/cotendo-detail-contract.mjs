import assert from 'node:assert/strict';

// Standalone evidence contract: no browser, native GPU or private app imports.
const support=Math.hypot(.816/2+.204,.816/2+.204);
export const DETAIL_EXPECTED={version:'cotendo-road-detail-2',fullDistance:7,endDistance:8,minProjectedPixels:8,
  tileSupportRadius:support,candidateDistance:8+support,domainMargin:9,scanRadius:12,residencySide:24,residencyOriginOffset:11,
  transitionSeconds:.2,maxPending:4,geometryByteLimit:24*1024*1024,combinedByteLimit:32*1024*1024,
  desktop:{resident:64,desired:60,pieces:2048,cached:128,triangles:630000,coverage:.97,reserved:4},
  mobile:{resident:32,desired:30,pieces:1024,cached:64,triangles:160000,coverage:.94,reserved:2}};
export function validateRoadDetail(detail){assert.deepEqual(detail,DETAIL_EXPECTED,'Missing/stale seven-metre detail policy');}
export const FORWARD_LIMITS={minResolvedSamples:120,minBandSamples:80,shadowContrastLSB:2,minDarkenedFraction:.005,maxDarkenedFraction:.45,maxBrightenedFraction:.02,aliasEdgeLSB:8,maxAliasedEdgeFraction:.02};
export const ROAD_FIXTURES=[{name:'residential',id:'COT_P3_CALZADA:road_pavement',origin:[-21,-57.5876978337]},{name:'commercial',id:'COT_COL_COM_VIAS:commercial_drive',origin:[120,-129.5876978337]}];
export const FORWARD_POSES=[{kind:'ordinary',eye:1.4},{kind:'ordinary',eye:2.4},{kind:'transition',range:7.5},{kind:'far',range:8.5}];
export const forwardFixtureName=(road,profile,pose)=>`${road}-${profile}-${pose.kind==='ordinary'?'eye'+pose.eye:pose.kind+pose.range}`;
export function expectedForwardFixtures(){return ROAD_FIXTURES.flatMap(road=>['wide','narrow'].flatMap(profile=>FORWARD_POSES.map(pose=>({name:forwardFixtureName(road.name,profile,pose),road:road.id,origin:road.origin,profile,...pose}))));}
export function expectedForwardCaptures(){return expectedForwardFixtures().flatMap(f=>['production','fixed-shadow-on','fixed-shadow-off','shadow-visibility','unfogged-shadow-on','unfogged-shadow-off'].map(s=>f.name+'-'+s)).concat(['residential-wide-eye1.4-no-god-rays','residential-wide-eye1.4-no-flare'],Array.from({length:8},(_,i)=>'motion-'+String(i).padStart(2,'0')),['fixed-beauty','no-god-rays','no-flare','unfogged','diffuse','directSpecular','environmentSpecular','original-brdf'].map(s=>'toward-sun-'+s));}
export function shadowEvidenceRequirements(metrics,kind='ordinary'){
 assert.ok(['ordinary','transition','far'].includes(kind));const s=metrics.source;
 for(const key of['resolved','fullResolved','transitionResolved','farResolved','unresolved'])assert.ok(Number.isInteger(s[key])&&s[key]>=0,'Missing independent source sample count '+key);
 assert.equal(s.resolved,s.fullResolved+s.transitionResolved+s.farResolved);
 const filteringOnly=kind==='ordinary'&&s.resolved<FORWARD_LIMITS.minResolvedSamples;
 const requiredBands=filteringOnly?[]:['resolved',...['fullResolved','transitionResolved','farResolved'].filter(k=>s[k]>=FORWARD_LIMITS.minBandSamples)];
 const mandatory=kind==='transition'?'transitionResolved':kind==='far'?'farResolved':null;
 if(mandatory&&!requiredBands.includes(mandatory))requiredBands.push(mandatory);
 return{filteringOnly,requiredBands,filteringRequired:kind==='ordinary'||s.unresolved>=40};
}
export function validateShadowMetrics(metrics,kind='ordinary'){
 const req=shadowEvidenceRequirements(metrics,kind),failures=[];
 for(const name of req.requiredBands){const s=metrics[name],minimum=name==='resolved'?120:80;
  if(!s||s.samples<minimum)failures.push(`${name}: insufficient independently resolved source samples`);
  if(!s||s.darkenedFraction<.005)failures.push(`${name}: no readable localized solar shadow`);
  if(!s||s.darkenedFraction>.45)failures.push(`${name}: whole-road darkening`);
  if(!s||s.brightenedFraction>.02)failures.push(`${name}: unexpected brightening`);
 }
 if(req.filteringRequired&&metrics.filtering.samples<40)failures.push('insufficient unresolved source samples for filtering');
 if(metrics.filtering.aliasedEdgeFraction>.02)failures.push('unresolved shadows contain oversized one-pixel edges');
 return{passed:!failures.length,...req,failures};
}
export function validateForwardEvidence(forward,digest){
 assert.equal(forward.status,'passed');assert.equal(forward.captureOnly,false);assert.equal(forward.washOnly,false);
 assert.equal(forward.analysisVersion,2);validateRoadDetail(forward.detail);assert.equal(forward.testedManifestSha256,digest);
 assert.deepEqual(forward.failures,[]);assert.deepEqual(forward.thresholds,FORWARD_LIMITS);
 for(const k of['selfShadow','matte','shadowVisibility'])assert.equal(forward.capabilities[k],true);
 assert.equal(forward.diagnostics.shadowVisibility,9);assert.equal(forward.diagnostics.fixedExposure,.55);assert.equal(forward.diagnostics.automaticExposureMultiplier,1);
 const expected=expectedForwardFixtures();assert.equal(forward.fixtures.length,16);assert.deepEqual(forward.fixtures.map(f=>f.name).sort(),expected.map(f=>f.name).sort());
 for(const f of forward.fixtures){const e=expected.find(e=>e.name===f.name);assert.equal(f.kind,e.kind);assert.equal(f.road,e.road);assert.equal(f.profile,e.profile);
  assert.equal(f.state.autoExposure,1);assert.equal(f.state.frozen,false);assert.equal(f.state.matte,true);assert.equal(f.state.near,.12);assert.equal(f.state.fov,50);
  assert.deepEqual([f.state.width,f.state.height],e.profile==='wide'?[1540,980]:[390,744]);
  if(e.kind==='ordinary'){assert.equal(f.eye,e.eye);assert.ok(Math.abs(f.state.position[1]-e.eye)<1e-9);assert.ok(f.downwardPitchDegrees>3.7&&f.downwardPitchDegrees<6.7);}
  else{assert.equal(f.range,e.range);assert.equal(f.inclinationRad,1.48);assert.ok(Math.abs(f.downwardPitchDegrees-1.48*180/Math.PI)<1e-9);assert.deepEqual(f.state.target,[e.origin[0],.09,e.origin[1]]);assert.ok(Math.abs(f.state.position[1]-(.09+e.range*Math.sin(1.48)))<1e-9);if(e.kind==='far')assert.equal(f.state.activeTiles,0);else assert.ok(f.state.activeTiles>0);}
  assert.ok(f.mask.samples>120);assert.equal(f.mask.bandSamples.resolved,f.mask.resolved8px);
  for(const mode of['productionPipeline','unfogged']){const metrics=f[mode];assert.deepEqual(metrics.source,f.mask.bandSamples);const check=validateShadowMetrics(metrics,e.kind);assert.deepEqual(f.acceptance[mode],check);assert.equal(check.passed,true,f.name+'/'+mode+': '+check.failures.join('; '));}
 }
 const names=expectedForwardCaptures();assert.equal(names.length,114);assert.deepEqual(forward.captures.map(c=>c.name).sort(),names.sort());
 for(const c of forward.captures){assert.equal(c.file,'forward/'+c.name+'.png');assert.match(c.sha256,/^[a-f0-9]{64}$/);assert.ok(c.width>0&&c.height>0);}
 assert.equal(forward.motion.length,8);assert.ok(forward.motion.every(f=>f.eye===1.4&&f.automaticExposure===true));
 const wash=forward.washProbe,suffixes=['fixed-beauty','no-god-rays','no-flare','unfogged','diffuse','directSpecular','environmentSpecular','original-brdf'];
 assert.equal(wash.status,'captured-for-review');assert.equal(wash.cameraOverRoad,true);assert.ok(wash.sourceRoadSamples>=120);assert.equal(wash.downwardPitchDegrees,5.3);assert.equal(wash.near,.12);assert.ok(Math.abs(wash.position[1]-1.4)<1e-9);assert.deepEqual(wash.origin,[-21,-57.5876978337]);
 const horizontal=[wash.sun[0],wash.sun[2]];assert.ok(wash.heading.reduce((n,v,i)=>n+v*horizontal[i],0)/Math.hypot(...horizontal)>.999999);
 assert.deepEqual(wash.captures.toSorted(),suffixes.map(s=>'forward/toward-sun-'+s+'.png').sort());
 assert.deepEqual(wash.brdfComparison,{matteProduction:true,originalControl:false,otherConditionsMatched:true,matteCapture:'forward/toward-sun-fixed-beauty.png',originalCapture:'forward/toward-sun-original-brdf.png'});
 const{matte:matteProduction,...a}=wash.conditions['fixed-beauty'],{matte:originalControl,...b}=wash.conditions['original-brdf'];assert.equal(matteProduction,true);assert.equal(originalControl,false);assert.deepEqual(a,b);assert.equal(a.haze,1);assert.equal(a.diagnostic,'beauty');assert.equal(a.automaticExposure,0);
 const{capabilities,...initial}=forward.initial;assert.deepEqual(forward.restoration,initial,'Capture suite did not restore production state');
}
