import {BufferGeometry,Float32BufferAttribute} from './tidewater/engine/index.js';

// Construct the boundary of overlapping architectural boxes, not the six faces
// of every box. Door openings and exact elevations remain in metres. In
// particular, coincident roof/floor faces are emitted exactly once.
export class SolidUnion {
 constructor(){this.boxes=[];this.stats={boxes:0,overlappingCells:0,quads:0};}
 add(center,size,material,group){
  const snap=v=>Math.round(v*10000)/10000;
  this.boxes.push({min:center.map((v,i)=>snap(v-size[i]/2)),max:center.map((v,i)=>snap(v+size[i]/2)),material,group});
 }
 build(){
  if(!this.boxes.length)return [];
  const coordinates=[0,1,2].map(a=>[...new Set(this.boxes.flatMap(b=>[b.min[a],b.max[a]]))].sort((a,b)=>a-b));
  const [nx,ny,nz]=coordinates.map(a=>a.length-1),n=[nx,ny,nz];
  const lookups=coordinates.map(c=>new Map(c.map((v,i)=>[v,i])));
  const cells=new Uint16Array(nx*ny*nz),index=(x,y,z)=>(y*nz+z)*nx+x;
  const owners=[null],ownerIds=new Map();
  for(const box of this.boxes){
   const key=box.group.id+':'+box.material.id;let id=ownerIds.get(key);
   if(!id){id=owners.length;owners.push({material:box.material,group:box.group});ownerIds.set(key,id);}
   const lo=box.min.map((v,i)=>lookups[i].get(v)),hi=box.max.map((v,i)=>lookups[i].get(v));
   for(let y=lo[1];y<hi[1];y++)for(let z=lo[2];z<hi[2];z++)for(let x=lo[0];x<hi[0];x++){
    const k=index(x,y,z);if(cells[k])this.stats.overlappingCells++;cells[k]=id;
   }
  }
  const output=new Map();
  const emit=(id,axis,sign,plane,u0,v0,u1,v1)=>{
   let out=output.get(id);if(!out){out={...owners[id],positions:[],normals:[],uvs:[],indices:[]};output.set(id,out);}
   const u=(axis+1)%3,v=(axis+2)%3,start=out.positions.length/3;
   for(const [a,b] of [[u0,v0],[u1,v0],[u1,v1],[u0,v1]]){
    const p=[0,0,0],normal=[0,0,0];p[axis]=plane;p[u]=a;p[v]=b;normal[axis]=sign;
    out.positions.push(...p);out.normals.push(...normal);out.uvs.push(a,b);
   }
   const face=sign>0?[0,1,2,0,2,3]:[0,2,1,0,3,2];out.indices.push(...face.map(i=>i+start));this.stats.quads++;
  };
  // Greedily merge exposed cells on each coordinate plane. Hidden faces between
  // adjacent boxes are removed even when their materials are different.
  for(let axis=0;axis<3;axis++){
   const u=(axis+1)%3,v=(axis+2)%3,nu=n[u],nv=n[v],mask=new Int32Array(nu*nv);
   for(let slice=0;slice<=n[axis];slice++){
    for(let j=0;j<nv;j++)for(let i=0;i<nu;i++){
     const p=[0,0,0];p[u]=i;p[v]=j;p[axis]=slice-1;
     const a=slice>0?cells[index(...p)]:0;p[axis]=slice;
     const b=slice<n[axis]?cells[index(...p)]:0;
     mask[j*nu+i]=a&&!b?a:!a&&b?-b:0;
    }
    for(let j=0;j<nv;j++)for(let i=0;i<nu;){
     const tag=mask[j*nu+i];if(!tag){i++;continue;}
     let w=1,h=1;while(i+w<nu&&mask[j*nu+i+w]===tag)w++;
     outer:while(j+h<nv){for(let k=0;k<w;k++)if(mask[(j+h)*nu+i+k]!==tag)break outer;h++;}
     emit(Math.abs(tag),axis,tag>0?1:-1,coordinates[axis][slice],coordinates[u][i],coordinates[v][j],coordinates[u][i+w],coordinates[v][j+h]);
     for(let y=0;y<h;y++)mask.fill(0,(j+y)*nu+i,(j+y)*nu+i+w);i+=w;
    }
   }
  }
  this.stats.boxes=this.boxes.length;this.stats.grid=[nx,ny,nz];
  return [...output.values()].map(out=>{
   const geometry=new BufferGeometry();geometry.setAttribute('position',new Float32BufferAttribute(out.positions,3));
   geometry.setAttribute('normal',new Float32BufferAttribute(out.normals,3));geometry.setAttribute('uv',new Float32BufferAttribute(out.uvs,2));geometry.setIndex(out.indices);
   return {geometry,material:out.material,group:out.group};
  });
 }
}
