const test=require('node:test'),assert=require('node:assert/strict');
const {compareAccess}=require('./yacht-bridge-access-comparison.cjs');
const {assertAccessBudget}=require('./yacht-bridge-access-performance.cjs');
const runs=(p95,fps=60)=>Array.from({length:3},()=>({legs:Array.from({length:4},()=>({p95,fps}))}));
test('the standalone access check retains its absolute 25 ms limit',()=>{
 assert.doesNotThrow(()=>assertAccessBudget(runs(25)));
 assert.throws(()=>assertAccessBudget(runs(25.01)),/exceeds 25/);
});
test('a qualified runner must retain the absolute access P95 budget',()=>{
 assert.ok(compareAccess(runs(20),runs(24)).every(v=>v.absoluteBudgetQualified));
 assert.throws(()=>compareAccess(runs(24),runs(25.01)),/P95 regressed/);
});
test('an unqualified software runner must still preserve reference performance',()=>{
 assert.ok(compareAccess(runs(33,55),runs(33.2,55)).every(v=>!v.absoluteBudgetQualified));
 assert.throws(()=>compareAccess(runs(33,55),runs(35,55)),/P95 regressed/);
});
test('the access comparison rejects throughput regressions even with equal P95',()=>{
 assert.throws(()=>compareAccess(runs(33,60),runs(33,55)),/Mean access/);
});
test('the access comparison always requires at least 40 FPS',()=>{
 assert.throws(()=>compareAccess(runs(33,39),runs(33,39)),/Reference runner/);
 assert.throws(()=>compareAccess(runs(33,40),runs(33,39)),/Candidate access FPS/);
});
