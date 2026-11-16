// Software CI can miss a 60 Hz refresh even when both versions exceed 40 FPS.
// Keep the standalone 25 ms test; compare this identical route on the same CI
// runner, just as the existing upper-interior return-view check does.
const assert=require('node:assert/strict');
const median=values=>values.toSorted((a,b)=>a-b)[Math.floor(values.length/2)];
function compareRoute(reference,candidate,label='access') {
 assert.equal(reference.length,3);assert.equal(candidate.length,3);
 const views=[0,1,2,3].map(leg=>{
  const summarize=runs=>({p95:median(runs.map(r=>r.legs[leg].p95)),
   p95Upper95:median(runs.map(r=>r.legs[leg].p95Upper95)),
   meanFrame:median(runs.map(r=>1000/r.legs[leg].fps)),fps:median(runs.map(r=>r.legs[leg].fps))});
  const r=summarize(reference),c=summarize(candidate),absoluteBudgetQualified=r.p95Upper95<=25;
  assert.ok(r.fps>=40,'Reference runner cannot sustain 40 FPS on '+label+' leg '+leg);
  assert.ok(c.fps>=40,'Candidate '+label+' FPS below 40 on leg '+leg);
  assert.ok(c.meanFrame<=r.meanFrame*1.05,'Mean '+label+' frame time regressed >5% on leg '+leg);
  assert.ok(c.p95<=(absoluteBudgetQualified?25:r.p95Upper95*1.05),label+' P95 regressed on leg '+leg);
  return {leg,reference:r,candidate:c,absoluteBudgetQualified};
 });
 return views;
}
module.exports={compareRoute};
if(require.main===module)(async()=>{
 const kind=process.argv[2]||'access';assert.ok(['bow','access'].includes(kind),'Unknown comparison route');
 const measure=kind==='bow'?require('./yacht-bow-performance.cjs').measureBow:require('./yacht-bridge-access-performance.cjs').measureAccess;
 const {mkdirSync,writeFileSync}=require('node:fs');
 const base=process.env.YACHT_BASE||'http://127.0.0.1:8764/tidewater-rocha/',referenceBase=process.env.YACHT_REFERENCE_BASE;
 const out=process.env.YACHT_OUTPUT||'/tmp/yacht-mobile-parity';
 assert.ok(referenceBase,'An immutable reference checkout is required');
 const reference=await measure(referenceBase,out+'/'+kind+'-reference');
 const candidate=await measure(base,out);
 const views=compareRoute(reference,candidate,kind);
 mkdirSync(out,{recursive:true});writeFileSync(out+'/'+kind+'-comparison.json',JSON.stringify({referenceBase,reference:reference.map(({rows,...r})=>r),candidate:candidate.map(({rows,...r})=>r),views},null,2));
 console.log('Same-runner '+kind+'-route comparison:',views);
})().catch(e=>{console.error(e);process.exitCode=1});
