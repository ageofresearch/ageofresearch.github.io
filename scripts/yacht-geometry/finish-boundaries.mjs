// Split only triangles crossing a timber finish boundary after LOD. Positions,
// normals and baked illumination are interpolated; physical floor stays unchanged.
export function splitFinishBoundaries(part, bounds) {
  if(!part.surfaceTypes?.some(t=>bounds[t]))return part;
  const vertices=[],indices=[],light=[],surfaceTypes=[];
  const emit=(polygon,type)=>{
    for(let j=1;j<polygon.length-1;j++){
      const tri=[polygon[0],polygon[j],polygon[j+1]],u=tri[1].map((v,k)=>v-tri[0][k]),v=tri[2].map((v,k)=>v-tri[0][k]);
      if(Math.hypot(u[1]*v[2]-u[2]*v[1],u[2]*v[0]-u[0]*v[2],u[0]*v[1]-u[1]*v[0])<1e-10)continue;
      for(const p of tri){indices.push(vertices.length/6);vertices.push(...p.slice(0,6));light.push(p[6]);surfaceTypes.push(type);}
    }
  };
  const clip=(polygon,axis,plane,sign)=>{
    const out=[];
    for(let i=0;i<polygon.length;i++){
      const a=polygon[i],b=polygon[(i+1)%polygon.length],da=sign*(a[axis]-plane),db=sign*(b[axis]-plane);
      if(da>=0)out.push(a);
      if((da>=0)!==(db>=0)){const t=da/(da-db);out.push(a.map((v,k)=>v+(b[k]-v)*t));}
    }
    return out;
  };
  for(let i=0;i<part.indices.length;i+=3){
    const ids=part.indices.slice(i,i+3),type=part.surfaceTypes[ids[0]],b=bounds[type];
    let polygon=ids.map(id=>[...part.vertices.slice(id*6,id*6+6),part.light?.[id]??.96]);
    if(!b){emit(polygon,type);continue;}
    for(const [axis,plane,sign]of [[0,b.start,1],[0,b.end,-1],[1,b.minY,1],[1,b.maxY,-1]]){
      // Emit each outside slice once; carry only the inside into the next plane.
      emit(clip(polygon,axis,plane,-sign),1);polygon=clip(polygon,axis,plane,sign);
      if(!polygon.length)break;
    }
    emit(polygon,2);
  }
  return {...part,vertices,indices,light,surfaceTypes};
}
