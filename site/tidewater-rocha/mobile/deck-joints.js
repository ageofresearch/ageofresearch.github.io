// Remove only the overlapping portion of a coplanar triangle. The owner may
// have a different triangulation, stair cut-outs or a tapered outside edge.
function planeFaces(part,axis,level){
  const faces=[];
  for(let i=0;i<part.indices.length;i+=3){
    const tri=Array.from(part.indices.slice(i,i+3),k=>Array.from(part.vertices.slice(6*k,6*k+6)));
    if(tri.every(v=>Math.abs(v[axis]-level)<1e-6))faces.push(tri);
  }
  return faces;
}

function trimCovered(part,axis,level,owners){
  const u=(axis+1)%3,v=(axis+2)%3;
  const area=(a,b,c)=>(b[u]-a[u])*(c[v]-a[v])-(b[v]-a[v])*(c[u]-a[u]);
  const bounds=poly=>[Math.min(...poly.map(p=>p[u])),Math.min(...poly.map(p=>p[v])),
    Math.max(...poly.map(p=>p[u])),Math.max(...poly.map(p=>p[v]))];
  const covers=owners.map(tri=>({tri,box:bounds(tri),sign:Math.sign(area(...tri))}));
  const vertices=Array.from(part.vertices),indices=[];
  for(let i=0;i<part.indices.length;i+=3){
    const ids=Array.from(part.indices.slice(i,i+3)),tri=ids.map(k=>vertices.slice(6*k,6*k+6));
    if(!tri.every(p=>Math.abs(p[axis]-level)<1e-6)){indices.push(...ids);continue;}
    const box=bounds(tri),sign=Math.sign(area(...tri));
    let fragments=[tri];
    for(const cover of covers){
      if(cover.sign!==sign||cover.box[0]>=box[2]||cover.box[2]<=box[0]||
        cover.box[1]>=box[3]||cover.box[3]<=box[1])continue;
      fragments=fragments.flatMap(poly=>{
        let inside=poly;
        const outside=[];
        for(let edge=0;edge<3;edge++){
          const a=cover.tri[edge],b=cover.tri[(edge+1)%3];
          const d=inside.map(p=>sign*area(a,b,p));
          if(d.every(n=>n<=1e-10))return [poly];
          if(d.every(n=>n>=-1e-10))continue;
          const keep=[],cut=[];
          for(let j=0;j<inside.length;j++){
            const k=(j+1)%inside.length,p=inside[j],q=inside[k];
            if(d[j]>=0)keep.push(p);
            if(d[j]<=0)cut.push(p);
            if(d[j]*d[k]<0){
              const t=d[j]/(d[j]-d[k]),hit=p.map((n,h)=>n+t*(q[h]-n));
              keep.push(hit);cut.push(hit);
            }
          }
          inside=keep;outside.push(cut);
        }
        return outside;
      });
    }
    if(fragments.length===1&&fragments[0]===tri){indices.push(...ids);continue;}
    for(const poly of fragments)for(let j=1;j+1<poly.length;j++){
      if(Math.abs(area(poly[0],poly[j],poly[j+1]))<1e-10)continue;
      for(const p of [poly[0],poly[j],poly[j+1]]){indices.push(vertices.length/6);vertices.push(...p);}
    }
  }
  Object.assign(part,{vertices,indices,triangles:indices.length/3});
}

export function fitHullToMainDeck(detail){
  const hull=detail.replacements.get('HULL_HUL_001')?.find(p=>p.feature==='retained hull with open above-water stern stair bays');
  const deck=detail.replacements.get('MD_DCK_001');
  if(!hull||!deck)return;
  trimCovered(hull,2,3.95,deck.flatMap(p=>planeFaces(p,2,3.95)));
  for(const side of [-3.8,3.8]){
    const skin=planeFaces(hull,1,side);
    for(const p of deck)trimCovered(p,1,side,skin);
  }
}
