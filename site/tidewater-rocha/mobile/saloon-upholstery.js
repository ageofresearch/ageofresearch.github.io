// Closed padded volumes following a centreline in deck coordinates. Rounded
// ends share one pole, so the upholstery remains solid from the aft doorway.
function cushion(path, halfWidth, halfHeight, rows, sides) {
  const vertices=[],indices=[];
  function centre(t){
    const n=path.length-1,i=Math.min(n-1,Math.floor(t*n)),u=t*n-i;
    const a=path[Math.max(0,i-1)],b=path[i],c=path[i+1],d=path[Math.min(n,i+2)];
    return b.map((v,k)=>.5*(2*v+(c[k]-a[k])*u+
      (2*a[k]-5*v+4*c[k]-d[k])*u*u+(3*v-a[k]-3*c[k]+d[k])*u*u*u));
  }
  function point(t,angle){
    const [x,y,z]=centre(t);
    const a=centre(Math.max(0,t-.001)),b=centre(Math.min(1,t+.001));
    const dx=b[0]-a[0],dy=b[1]-a[1],length=Math.hypot(dx,dy);
    const envelope=Math.pow(Math.max(0,1-Math.pow(Math.abs(2*t-1),4)),.40);
    const soft=v=>Math.sign(v)*Math.pow(Math.abs(v),.83);
    const width=halfWidth*envelope*soft(Math.cos(angle));
    return [x-dy/length*width,y+dx/length*width,z+halfHeight*envelope*soft(Math.sin(angle))];
  }
  // Cosine spacing gives the rounded tips the same sampling density as the sides.
  vertices.push(...centre(0),0,0,0);
  for(let row=1;row<rows;row++){
    const t=(1-Math.cos(Math.PI*row/rows))/2;
    for(let j=0;j<sides;j++)vertices.push(...point(t,2*Math.PI*j/sides),0,0,0);
  }
  const end=vertices.length/6;
  vertices.push(...centre(1),0,0,0);
  for(let j=0;j<sides;j++){
    const k=(j+1)%sides;
    indices.push(0,1+k,1+j);
    for(let row=0;row<rows-2;row++){
      const a=1+row*sides;
      indices.push(a+j,a+k,a+j+sides,a+k,a+k+sides,a+j+sides);
    }
    indices.push(end-sides+j,end-sides+k,end);
  }
  for(let i=0;i<indices.length;i+=3){
    const [a,b,c]=indices.slice(i,i+3).map(k=>6*k);
    const ab=[0,1,2].map(k=>vertices[b+k]-vertices[a+k]);
    const ac=[0,1,2].map(k=>vertices[c+k]-vertices[a+k]);
    for(let k=0;k<3;k++){
      const n=ab[(k+1)%3]*ac[(k+2)%3]-ab[(k+2)%3]*ac[(k+1)%3];
      for(const v of [a,b,c])vertices[v+3+k]+=n;
    }
  }
  for(let i=3;i<vertices.length;i+=6){
    const length=Math.hypot(...vertices.slice(i,i+3));
    for(let k=0;k<3;k++)vertices[i+k]/=length;
  }
  // Fractional powers can differ by an ulp between JS engines. Fix the source
  // precision before the shared geometry becomes collision polygons and bounds.
  return {vertices:vertices.map(v=>Number(v.toFixed(10))),indices};
}

// The photographic lounge chairs open towards the centre table. The forward
// and aft tips of each wrap are lower than the crown against the windows.
export function saloonChairShells(x,close){
  const path=[[.13,-1.26,4.32],[.23,-1.46,4.45],[.49,-1.55,4.50],
    [.73,-1.45,4.45],[.83,-1.23,4.32]].map(([u,y,z])=>[x+u,y,z]);
  return [
    cushion(path,.135,.235,close?22:9,close?14:8),
    cushion([[x+.035,-1.23,4.21],[x+.46,-1.21,4.23],[x+.895,-1.23,4.21]],
      .335,.202,close?18:8,close?14:8)
  ];
}

export function saloonBack(close){
  return cushion([[11.10,1.35,4.48],[11.64,1.49,4.51],[12.38,1.50,4.52],
    [13.10,1.35,4.52],[13.64,1.01,4.52],[13.90,.40,4.51],
    [13.92,-.32,4.50],[13.68,-.96,4.44]],.165,.245,close?34:12,close?14:6);
}

// An arm-free chaise rounds off the aft end of the sectional on the carpet.
export function saloonChaise(close){
  return cushion([[10.55,.92,4.18],[10.91,.98,4.19],[11.22,1.10,4.18],[11.53,1.26,4.17]],
    .365,.215,close?19:9,close?16:8);
}
