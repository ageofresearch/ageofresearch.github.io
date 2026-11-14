// Pure helpers shared by offline extraction and the small mobile collision map.
const cross = (a, b, c) => (b[0]-a[0])*(c[1]-a[1])-(b[1]-a[1])*(c[0]-a[0]);

export function convexHull(points) {
  const sorted = [...new Map(points.map(p => [p.map(v => v.toFixed(6)).join(','), p])).values()]
    .sort((a,b) => a[0]-b[0] || a[1]-b[1]);
  function chain(points) {
    const result = [];
    for (const point of points) {
      while (result.length > 1 && cross(result.at(-2),result.at(-1),point) <= 0) result.pop();
      result.push(point);
    }
    return result.slice(0,-1);
  }
  return chain(sorted).concat(chain(sorted.toReversed()));
}

// Polygons are counterclockwise convex hulls. Zero distance means inside.
export function distanceToFootprint(x, y, polygon) {
  let inside = true, distance = Infinity;
  for (let i=0; i<polygon.length; i++) {
    const a=polygon[i], b=polygon[(i+1)%polygon.length];
    if (cross(a,b,[x,y]) < 0) inside=false;
    const dx=b[0]-a[0], dy=b[1]-a[1];
    const t=Math.max(0,Math.min(1,((x-a[0])*dx+(y-a[1])*dy)/(dx*dx+dy*dy)));
    distance=Math.min(distance,Math.hypot(x-a[0]-t*dx,y-a[1]-t*dy));
  }
  return polygon.length < 3 ? Infinity : inside ? 0 : distance;
}

export function indexFootprints(footprints) {
  const cells=new Map();
  for (const {polygon} of footprints) {
    const xs=polygon.map(p=>p[0]), ys=polygon.map(p=>p[1]);
    for(let x=Math.floor(Math.min(...xs)*2);x<=Math.floor(Math.max(...xs)*2);x++)
      for(let y=Math.floor(Math.min(...ys)*2);y<=Math.floor(Math.max(...ys)*2);y++) {
        const key=x+','+y;
        if(!cells.has(key))cells.set(key,[]);
        cells.get(key).push(polygon);
      }
  }
  return (x,y,radius) => {
    for(let cx=Math.floor((x-radius)*2);cx<=Math.floor((x+radius)*2);cx++)
      for(let cy=Math.floor((y-radius)*2);cy<=Math.floor((y+radius)*2);cy++)
        for(const polygon of cells.get(cx+','+cy) || [])
          if(distanceToFootprint(x,y,polygon) <= radius) return true;
    return false;
  };
}
