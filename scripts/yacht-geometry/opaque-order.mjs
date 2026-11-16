// Static front-to-back buckets improve early depth rejection without changing
// any triangle, vertex, material or the two-batch rendering contract. Keep the
// original order inside each bucket for vertex-cache locality. Transparent
// geometry must never use this order.
export function orderOpaqueTriangles(positions, indices, eye, bucketSize=.5, boundsDistance=false) {
  const rows=[];
  for(let i=0;i<indices.length;i+=3) {
    const triangle=Array.from(indices.slice(i,i+3));
    const center=eye.map((_,axis)=>triangle.reduce((sum,index)=>sum+positions[index*3+axis],0)/3);
    // Wide deck/wall triangles can cover the eye while their centroid is far
    // away. Their bounds are a conservative near-distance for early coverage.
    const distance=boundsDistance?Math.hypot(...eye.map((v,k)=>{
      const axis=triangle.map(i=>positions[i*3+k]);
      return Math.max(Math.min(...axis)-v,0,v-Math.max(...axis));
    })):Math.hypot(...center.map((v,k)=>v-eye[k]));
    rows.push({triangle,bucket:Math.floor(distance/bucketSize)});
  }
  rows.sort((a,b)=>a.bucket-b.bucket);
  return Uint32Array.from(rows.flatMap(row=>row.triangle));
}
