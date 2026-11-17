import {createHash} from 'node:crypto';

// Two different floor fragments share an ID. Match provenance AND the actual
// source region/attributes, before any profile-specific clipping or LOD.
export function uniformPartKey(part) {
  const hash=createHash('sha256');
  hash.update(JSON.stringify([part.id,part.sourceID,part.role,part.materialID,part.finish]));
  for(const name of ['vertices','indices','light','surfaceTypes']) {
    const values=part[name]||[];
    hash.update(name+':'+values.length+':');
    hash.update(Buffer.from(Float64Array.from(values).buffer));
  }
  return part.id+':'+hash.digest('hex');
}

export function createUniformSelection() {
  const entries=new Map();
  return {
    consider(source,geometry,audit) {
      const key=uniformPartKey(source),previous=entries.get(key);
      // Omission is never higher quality than an existing representation.
      const rank=a=>[a.triangles>0?1:0,a.complete?1:0,-a.error,a.triangles];
      const higher=(a,b)=>{const ar=rank(a),br=rank(b);for(let i=0;i<ar.length;i++)if(ar[i]!==br[i])return ar[i]>br[i];return false;};
      if(!previous||higher(audit,previous.audit))entries.set(key,{geometry,audit:{...audit,key}});
    },
    get(source) {
      const result=entries.get(uniformPartKey(source));
      if(!result)throw Error('Missing uniform source: '+source.id);
      return result;
    },
  };
}
