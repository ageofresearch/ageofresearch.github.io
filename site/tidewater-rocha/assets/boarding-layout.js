// Source-model coordinates: x is forward, y is port, z is height.
// Keep the gangway outside the swim stairs, then return to the existing deck.
export const boardingOffset = 1.15;
const bend = 2.34, join = 3.75;
export function offsetAt(x) {
  return boardingOffset * Math.max(0, Math.min(1, (join-x)/(join-bend)));
}
export function boardingPoint(point) {
  const result = [...point];
  result[1] += offsetAt(result[0]);
  return result;
}
export function boardingSource(x, y) { return [x,y-offsetAt(x)]; }

function clip(polygon, plane, sign) {
  const result = [];
  for (let i=0;i<polygon.length;i++) {
    const a=polygon[i], b=polygon[(i+1)%polygon.length];
    const da=sign*(a[0]-plane), db=sign*(b[0]-plane);
    if (da>=0) result.push(a);
    if ((da>0 && db<0)||(da<0 && db>0)) {
      const t=da/(da-db);
      result.push(a.map((v,k)=>v+(b[k]-v)*t));
    }
  }
  return result;
}

// Split at the two bends before shearing. Otherwise a large triangle would
// bridge the bend while navigation followed the intended landing outline.
export function adaptBoardingGeometry(part) {
  const vertices=[], indices=[];
  for (let i=0;i<part.indices.length;i+=3) {
    const triangle=part.indices.slice(i,i+3).map(k=>Array.from(part.vertices.slice(k*6,k*6+6)));
    const min=Math.min(...triangle.map(p=>p[0])), max=Math.max(...triangle.map(p=>p[0]));
    let pieces=[triangle];
    for (const plane of [bend,join]) if(min<plane && max>plane)
      pieces=pieces.flatMap(p=>[clip(p,plane,-1),clip(p,plane,1)]).filter(p=>p.length>=3);
    for (const polygon of pieces) {
      const x=polygon.reduce((s,p)=>s+p[0],0)/polygon.length;
      const slope=x>bend && x<join ? -boardingOffset/(join-bend) : 0;
      for(let j=1;j<polygon.length-1;j++) {
        const t=[polygon[0],polygon[j],polygon[j+1]];
        const u=t[1].slice(0,3).map((v,k)=>v-t[0][k]),v=t[2].slice(0,3).map((v,k)=>v-t[0][k]);
        if(Math.hypot(u[1]*v[2]-u[2]*v[1],u[2]*v[0]-u[0]*v[2],u[0]*v[1]-u[1]*v[0])<1e-12)continue;
        const start=vertices.length/6;
        for(const p of t) {
          const nx=p[3]-slope*p[4],length=Math.hypot(nx,p[4],p[5]);
          vertices.push(p[0],p[1]+offsetAt(p[0]),p[2],nx/length,p[4]/length,p[5]/length);
        }
        indices.push(start,start+1,start+2);
      }
    }
  }
  return {vertices,indices};
}

export function boardingGateCollision(x,y,radius,layout) {
  const points=[layout.end,layout.stepX,layout.gateEnd]
    .map(x=>boardingPoint([x,layout.y-layout.railOffset]));
  return points.slice(1).some((b,i)=>{
    const a=points[i],dx=b[0]-a[0],dy=b[1]-a[1];
    const t=Math.max(0,Math.min(1,((x-a[0])*dx+(y-a[1])*dy)/(dx*dx+dy*dy)));
    return Math.hypot(x-a[0]-t*dx,y-a[1]-t*dy)<=radius+.032;
  });
}
