// A shared provoking vertex or a collision in its low 16 bits keeps all
// corresponding triangles, in the order used for the original depth test.
export const coverageWords = 65536 / 32;

// The four homogeneous clip planes are valid even for triangles crossing
// the near plane. A shared outside bit proves the triangle misses the patch.
function sweepMasks(vertices,windRect,clip) {
  const points=new Float32Array(vertices.buffer,vertices.byteOffset,vertices.byteLength/4);
  const outside=new Uint8Array(vertices.byteLength/32);
  const [left,bottom,right,top]=windRect;
  for(let i=0;i<outside.length;i++){
    const j=i*8,x=points[j],y=points[j+1],z=points[j+2];
    const w=clip[3]*x+clip[7]*y+clip[11]*z+clip[15];
    const px=clip[0]*x+clip[4]*y+clip[8]*z+clip[12];
    const py=clip[1]*x+clip[5]*y+clip[9]*z+clip[13];
    outside[i]=(px<left*w?1:0)|(px>right*w?2:0)|(py<bottom*w?4:0)|(py>top*w?8:0);
  }
  return outside;
}

export function patchGlass(vertices,indices,rect,clip){
  const outside=sweepMasks(vertices,rect,clip),list=[];
  for(let i=0;i<indices.length;i+=3){
    const a=indices[i],b=indices[i+1],c=indices[i+2];
    if(!(outside[a]&outside[b]&outside[c]))list.push(a,b,c);
  }
  const result=new indices.constructor(list.length+(indices.BYTES_PER_ELEMENT===2?list.length%2:0));
  result.set(list);return {output:result,length:list.length};
}

export function filterSamples(winners, vertices, indices, first, count, windRect=null, clip=null) {
  const layers = new Int16Array(vertices.buffer, vertices.byteOffset, vertices.byteLength / 2);
  const outside=windRect && sweepMasks(vertices,windRect,clip);
  const padding = indices.BYTES_PER_ELEMENT === 2 ? count % 2 : 0;
  const output = new indices.constructor(count + padding);
  const patch=outside && new indices.constructor(count+padding);
  let length=0,skyStart=0,patchLength=0,patchSky=0;
  for (let i = first; i < first + count; i += 3) {
    const a = indices[i], tag = a & 0xffff;
    const sky = layers[a * 16 + 14] === -2;
    const sweep=outside && (layers[a*16+14]===-4 || !(outside[a]&outside[indices[i+1]]&outside[indices[i+2]]));
    if(patch && (sky||sweep)){
      patch[patchLength++]=a;patch[patchLength++]=indices[i+1];patch[patchLength++]=indices[i+2];
      if(!sky)patchSky=patchLength;
    }
    if (!sky && !sweep && !(winners[tag >>> 5] & (1 << (tag & 31)))) continue;
    output[length++] = a;
    output[length++] = indices[i + 1];
    output[length++] = indices[i + 2];
    // The sky rotates when the sun moves at this camera pose.
    if (!sky) skyStart = length;
  }
  return {output,length,skyStart,patch,patchLength,patchSky};
}
