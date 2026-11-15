// Static front-to-back buckets improve early depth rejection without changing
// any triangle, vertex, material or the two-batch rendering contract. Keep the
// original order inside each bucket for vertex-cache locality. Transparent
// geometry must never use this order.
export function orderOpaqueTriangles(positions, indices, eye, bucketSize=.5) {
  const rows=[];
  for(let i=0;i<indices.length;i+=3) {
    const triangle=Array.from(indices.slice(i,i+3));
    const center=eye.map((_,axis)=>triangle.reduce((sum,index)=>sum+positions[index*3+axis],0)/3);
    rows.push({triangle,bucket:Math.floor(Math.hypot(...center.map((v,k)=>v-eye[k]))/bucketSize)});
  }
  rows.sort((a,b)=>a.bucket-b.bucket);
  return Uint32Array.from(rows.flatMap(row=>row.triangle));
}
