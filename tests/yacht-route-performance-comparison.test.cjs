const test=require('node:test'),assert=require('node:assert/strict');
const {compareRoute}=require('./yacht-route-performance-comparison.cjs');
const {assertBowBudget}=require('./yacht-bow-performance.cjs');
const {assertAccessBudget}=require('./yacht-bridge-access-performance.cjs');
const runs=(p95,fps=60,p95Upper95=p95)=>Array.from({length:3},()=>({legs:Array.from({length:4},()=>({p95,fps,p95Upper95}))}));
test('both standalone route checks retain their absolute 25 ms limits',()=>{
 for(const check of [assertAccessBudget,assertBowBudget]){
  assert.doesNotThrow(()=>check(runs(25)));
  assert.throws(()=>check(runs(25.01)),/exceeds 25/);
 }
});
test('a qualified runner must retain the absolute access P95 budget',()=>{
 assert.ok(compareRoute(runs(20),runs(24)).every(v=>v.absoluteBudgetQualified));
 assert.throws(()=>compareRoute(runs(24),runs(25.01)),/P95 regressed/);
});
test('an unqualified software runner must still preserve reference performance',()=>{
 assert.ok(compareRoute(runs(33,55),runs(33.2,55)).every(v=>!v.absoluteBudgetQualified));
 assert.throws(()=>compareRoute(runs(33,55),runs(35,55)),/P95 regressed/);
});
test('the access comparison rejects throughput regressions even with equal P95',()=>{
 assert.throws(()=>compareRoute(runs(33,60),runs(33,55)),/Mean access/);
});
test('the access comparison always requires at least 40 FPS',()=>{
 assert.throws(()=>compareRoute(runs(33,39),runs(33,39)),/Reference runner/);
 assert.throws(()=>compareRoute(runs(33,40),runs(33,39)),/Candidate access FPS/);
});

const {quantileUpper95}=require('./yacht-performance-statistics.cjs');
test('quantile rank bounds expose uncertainty at a refresh-interval boundary',()=>{
 const frames=[...Array(480).fill(16.7),...Array(20).fill(33.3)];
 assert.equal(frames[Math.floor(frames.length*.95)],16.7);
 assert.equal(quantileUpper95(frames),33.3);
 assert.equal(quantileUpper95(Array(500).fill(16.7)),16.7);
 assert.throws(()=>quantileUpper95(Array(20).fill(16.7)),/Too few/);
});
test('quantized P95 stays visible without misclassifying an unstable reference as 25 ms',()=>{
 const views=compareRoute(runs(17.6,57.5,33.3),runs(31.8,57));
 assert.ok(views.every(v=>!v.absoluteBudgetQualified));
 assert.ok(views.every(v=>v.reference.p95===17.6&&v.candidate.p95===31.8));
 assert.throws(()=>compareRoute(runs(17.6,57.5,17.9),runs(31.8,57)),/P95 regressed/);
});
