// Compare old return views on the same runner, against the immutable PR base.
// The controlled local reference still uses yacht-bridge-performance.cjs and its
// absolute 25 ms gate. The new bow route also retains its absolute gate in CI.
const assert=require('node:assert/strict');
const {mkdirSync,writeFileSync}=require('node:fs');
const {measureReturnViews}=require('./yacht-bridge-performance.cjs');
const base=process.env.YACHT_BASE||'http://127.0.0.1:8764/tidewater-rocha/';
const referenceBase=process.env.YACHT_REFERENCE_BASE;
const out=process.env.YACHT_OUTPUT||'/tmp/yacht-mobile-parity';
const median=values=>values.toSorted((a,b)=>a-b)[Math.floor(values.length/2)];
(async()=>{
 assert.ok(referenceBase,'An immutable reference checkout is required');
 const reference=await measureReturnViews(referenceBase,out+'/reference');
 const candidate=await measureReturnViews(base,out);
 const views=[14.8,17.4].map(x=>{
  const summarize=runs=>({p95:median(runs.filter(r=>r.x===x).map(r=>r.p95)),
   meanFrame:median(runs.filter(r=>r.x===x).map(r=>1000/r.fps))});
  return {x,reference:summarize(reference),candidate:summarize(candidate)};
 });
 mkdirSync(out,{recursive:true});writeFileSync(out+'/bridge-comparison.json',JSON.stringify({referenceBase,reference,candidate,views},null,2));
 console.log('Same-runner return-view comparison:',views);
 for(const {x,reference:r,candidate:c}of views){
  assert.ok(c.meanFrame<=r.meanFrame*1.05,'Mean return-view frame time regressed >5% at '+x);
  assert.ok(c.p95<=Math.max(25,r.p95*1.05),'Return-view P95 regressed at '+x);
 }
})().catch(e=>{console.error(e);process.exitCode=1});
