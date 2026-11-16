const assert=require('node:assert/strict');

// Upper endpoint of a two-sided 95% order-statistic rank interval, using the
// binomial distribution.
// A 60 Hz presentation stream has a discontinuity at 16.7/33.3 ms: a handful
// of refresh misses can move a point P95 across that gap. Keep the raw P95;
// use this upper bound only to qualify the reference worker and its tolerance.
// The rank model assumes independent samples; it is not phone certification.
function quantileUpper95(sorted,p=.95) {
 const n=sorted.length;assert.ok(n>=100,'Too few timing samples to qualify the reference');
 const mode=Math.min(n,Math.floor((n+1)*p)),weights=new Float64Array(n+1);
 weights[mode]=1;
 for(let k=mode;k>0;k--)weights[k-1]=weights[k]*k/(n-k+1)*(1-p)/p;
 for(let k=mode;k<n;k++)weights[k+1]=weights[k]*(n-k)/(k+1)*p/(1-p);
 const total=weights.reduce((a,b)=>a+b,0);let cumulative=0,rank=n;
 for(let k=0;k<=n;k++){cumulative+=weights[k]/total;if(cumulative>=.975){rank=k;break;}}
 // Upper order statistic is X_(rank+1), with one-based order statistics.
 return rank<n?sorted[rank]:Infinity;
}
module.exports={quantileUpper95};
