import {standard} from './tidewater/materials/Materials.js';
import {Texture} from './tidewater/engine/gpu/Texture.js';
import {GPU} from './tidewater/engine/gpu/GPU.js';
import {generateMipmaps} from './tidewater/engine/gpu/Mipmaps.js';

// Seeded, tileable surface maps. Mipmaps and anisotropic filtering keep fine
// pores, threads and grain from becoming moving high-frequency screen noise.
function surfaceMap(kind){
 const size=512,height=new Float32Array(size*size),data=new Uint8Array(size*size*4),tau=Math.PI*2;
 for(let y=0;y<size;y++)for(let x=0;x<size;x++){
  const u=x/size,v=y/size;
  const broad=Math.sin(tau*(u*3+v*2))*.35+Math.cos(tau*(u*7-v*5))*.16+Math.sin(tau*(u*13+v*11))*.08;
  const fine=Math.sin(tau*(u*79+v*83))*.07+Math.cos(tau*(u*127-v*113))*.035;
  let h;
  if(kind==='wood')h=.5+.13*Math.sin(tau*(v*23+.38*Math.sin(tau*u*2)))+.055*Math.sin(tau*(v*91+.15*Math.cos(tau*u*3)))+broad*.08;
  else if(kind==='fabric')h=.5+.14*Math.cos(tau*u*128)*Math.cos(tau*v*128)+.08*Math.sin(tau*(u*64+v*64))+broad*.035;
  else if(kind==='stone')h=.5+broad*.22+fine*.4-.15*Math.pow(Math.max(0,Math.sin(tau*(u*31+v*29))),28);
  else h=.5+broad*.13+fine*.25+.025*Math.cos(tau*(v*5+u*3+.3*Math.sin(tau*u*2)));
  height[y*size+x]=h;
 }
 for(let y=0;y<size;y++)for(let x=0;x<size;x++){
  const k=y*size+x,o=k*4,h=height[k];
  const du=height[y*size+(x+1)%size]-height[y*size+(x+size-1)%size];
  const dv=height[((y+1)%size)*size+x]-height[((y+size-1)%size)*size+x];
  data[o]=Math.round(Math.max(0,Math.min(1,h))*255);data[o+1]=Math.round(128-du*115);data[o+2]=Math.round(128-dv*115);data[o+3]=Math.round((kind==='fabric'?.92:kind==='wood'?.47:.62)*255);
 }
 const texture=new Texture({label:'Turbaco '+kind+' · filtered detail',width:size,height:size,format:'rgba8unorm',mips:true,data,sampler:'anisoRepeat'});
 if(GPU.device)generateMipmaps(texture);
 return texture;
}

export function createMaterials(){
 const maps={wood:surfaceMap('wood'),fabric:surfaceMap('fabric'),stone:surfaceMap('stone'),plaster:surfaceMap('plaster')};
 const colors={wall:0xe8dfc8,floor:0xe0d5bf,stone:0xc4b497,wood:0x92704e,terracotta:0xb87f63,cream:0xf1ead9,green:0x708167,linen:0xd8cbb7,metal:0x374139,teal:0x4d8e83,roof:0xded2b9,lawn:0x667b3e,earth:0x596c3c};
 const materials=Object.fromEntries(Object.entries(colors).map(([key,color])=>[key,standard({name:'Turbaco · '+key,color,roughness:key==='metal'?.43:.82,metalness:key==='metal'?.55:0})]));
 const mapped=(material,map,scale,bump,rough)=>{
  material.bindings.detailMap={texture:map};
  material.surface=`let n=abs(s.normal);let uv=select(select(in.P.xy,in.P.zy,n.x>n.z),in.P.xz,n.y>.65)*${scale};let d=textureSample(detailMap,smpAnisoRepeat,uv);s.albedo*=.88+d.r*.24;s.roughness=${rough};s.normal=perturbNormalByMap(in.P,s.normal,uv,normalize(vec3f((d.gb*2.0-1.0)*${bump},1.0)));`;
 };
 mapped(materials.wall,maps.plaster,'1.3','.08','.9');mapped(materials.roof,maps.stone,'.8','.08','.87');mapped(materials.wood,maps.wood,'1.8','.11','.48');mapped(materials.linen,maps.fabric,'3.0','.17','.94');
 const tile=(material,spacing,stagger)=>{
  material.bindings.detailMap={texture:maps.stone};
  material.surface=`let uv=in.P.xz;let q=uv/vec2f(${spacing});let row=floor(q.y);let cell=floor(q+vec2f(row*${stagger},0.0));let f=fract(q+vec2f(row*${stagger},0.0));let aa=max(fwidth(q),vec2f(.0001));let edge=min(f,1.0-f);let filled=smoothstep(vec2f(.003)-aa,vec2f(.003)+aa,edge);let interior=filled.x*filled.y;let tone=fract(sin(dot(cell,vec2f(12.9898,78.233)))*43758.5);let d=textureSample(detailMap,smpAnisoRepeat,uv*1.7);let veins=sin(uv.x*2.1+uv.y*1.4+d.r*1.8)*.025;s.albedo*=mix(.56,.93+tone*.09+d.r*.06+veins,interior);s.roughness=mix(.92,.48+d.r*.13,interior);s.normal=perturbNormalByMap(in.P,s.normal,uv,normalize(vec3f((d.gb*2.0-1.0)*.07,1.0)));`;
 };
 tile(materials.floor,'.60,.60','0.0');tile(materials.stone,'.80,.40','.5');tile(materials.terracotta,'.30,.30','.5');
 materials.lawn.bindings.detailMap={texture:maps.plaster};materials.lawn.surface='let p=in.P.xz;let n=sin(p.x*.81+sin(p.y*.73))*sin(p.y*.6);let d=textureSample(detailMap,smpAnisoRepeat,p*2.0);s.albedo*=.92+n*.08+(d.r-.5)*.09;s.roughness=1.0;';
 materials.earth.surface='let p=in.P.xz;s.albedo*=.93+.07*sin(p.x*.13)*sin(p.y*.1);s.roughness=1.0;';
 for(const [key,color] of Object.entries({fabricIvory:0xeee8da,fabricSand:0xc8b69c,fabricClay:0xb8836a,fabricOlive:0x82907a})){
  materials[key]=standard({name:'Turbaco · '+key,color,roughness:.95});mapped(materials[key],maps.fabric,'3.0','.15','.95');
 }
 materials.oak=standard({name:'Turbaco · oak furniture',color:0x9b7955,roughness:.43});mapped(materials.oak,maps.wood,'1.6','.10','.43');
 materials.seam=standard({name:'Turbaco · textile piping',color:0xc3b7a0,roughness:1});
 return materials;
}
