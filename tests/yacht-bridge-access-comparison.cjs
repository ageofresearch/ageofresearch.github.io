// Software CI can miss a 60 Hz refresh even when both versions exceed 40 FPS.
// Keep the standalone 25 ms test; compare this identical route on the same CI
// runner, just as the existing upper-interior return-view check does.
const assert=require('node:assert/strict');
const median=values=>values.toSorted((a,b)=>a-b)[Math.floor(values.length/2)];
function compareAccess(reference,candidate) {
 assert.equal(reference.length,3);assert.equal(candidate.length,3);
 const views=[0,1,2,3].map(leg=>{
  const summarize=runs=>({p95:median(runs.map(r=>r.legs[leg].p95)),
   meanFrame:median(runs.map(r=>1000/r.legs[leg].fps)),fps:median(runs.map(r=>r.legs[leg].fps))});
  const r=summarize(reference),c=summarize(candidate),absoluteBudgetQualified=r.p95<=25;
  assert.ok(r.fps>=40,'Reference runner cannot sustain 40 FPS on access leg '+leg);
  assert.ok(c.fps>=40,'Candidate access FPS below 40 on leg '+leg);
  assert.ok(c.meanFrame<=r.meanFrame*1.05,'Mean access frame time regressed >5% on leg '+leg);
  assert.ok(c.p95<=(absoluteBudgetQualified?25:r.p95*1.05),'Access P95 regressed on leg '+leg);
  return {leg,reference:r,candidate:c,absoluteBudgetQualified};
 });
 return views;
}
module.exports={compareAccess};
if(require.main===module)(async()=>{
 const {measureAccess}=require('./yacht-bridge-access-performance.cjs');
 const {mkdirSync,writeFileSync}=require('node:fs');
 const base=process.env.YACHT_BASE||'http://127.0.0.1:8764/tidewater-rocha/',referenceBase=process.env.YACHT_REFERENCE_BASE;
 const out=process.env.YACHT_OUTPUT||'/tmp/yacht-mobile-parity';
 assert.ok(referenceBase,'An immutable reference checkout is required');
 const reference=await measureAccess(referenceBase,out+'/access-reference');
 const candidate=await measureAccess(base,out);
 const views=compareAccess(reference,candidate);
 mkdirSync(out,{recursive:true});writeFileSync(out+'/access-comparison.json',JSON.stringify({referenceBase,reference:reference.map(({rows,...r})=>r),candidate:candidate.map(({rows,...r})=>r),views},null,2));
 console.log('Same-runner access-route comparison:',views);
})().catch(e=>{console.error(e);process.exitCode=1});
