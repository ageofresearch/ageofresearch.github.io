const attributes={position:3,normal:3,color:3,aSurface:4};

// Limits are supplied by trusted callers, never by the downloaded manifest.
export function decodeRenderProfiles(manifest,buffer,names,limits={}) {
  function array(descriptor,Type=Float32Array) {
    if(!descriptor||!Number.isInteger(descriptor.offset)||descriptor.offset<0||descriptor.offset%4||
      !Number.isInteger(descriptor.length)||descriptor.length<=0||descriptor.offset+descriptor.length*4>buffer.byteLength)
      throw Error('Archivo del salón incompleto');
    return new Type(buffer,descriptor.offset,descriptor.length);
  }
  const profiles={};
  for(const name of names) {
    const p=manifest.profiles?.[name];
    if(!p||p.batches?.length!==2||(!Number.isInteger(p.triangles)||p.triangles<=0||p.triangles>(limits[name]??25000)))throw Error('Perfil del salón inválido');
    const batches=p.batches.map((batch,i)=>{
      if(Boolean(batch.glass)!==Boolean(i))throw Error('Materiales del salón inválidos');
      const attrs=Object.fromEntries(Object.entries(attributes).map(([name,size])=>{
        const d=batch.attributes[name];
        if(d?.itemSize!==size)throw Error('Atributos del salón inválidos');
        return [name,array(d)];
      }));
      const count=attrs.position.length/3,indices=array(batch.indices,Uint32Array);
      if(indices.length%3||Object.entries(attributes).some(([name,size])=>attrs[name].length!==count*size)||
        indices.some(i=>i>=count)||Object.values(attrs).some(a=>a.some(v=>!Number.isFinite(v))))throw Error('Geometría del salón inválida');
      return {attributes:attrs,indices};
    });
    const triangles=batches.reduce((n,b)=>n+b.indices.length/3,0);
    if(triangles!==p.triangles)throw Error('Recuento del salón inválido');
    profiles[name]={...p,batches,triangles,geometryBytes:batches.reduce((n,b)=>n+b.indices.byteLength+
      Object.values(b.attributes).reduce((sum,a)=>sum+a.byteLength,0),0)};
  }
  return profiles;
}
