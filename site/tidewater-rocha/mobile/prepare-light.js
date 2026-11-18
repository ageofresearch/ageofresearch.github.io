import {walkLight} from './walk-light.js?v=tour-fidelity-1';

const elevations=[1.55,2.84,3.95,6,8.2];
const clamp=x=>Math.max(0,Math.min(1,x));
const srgb=x=>x<=.0031308?12.92*x:1.055*Math.pow(Math.min(1,x),1/2.4)-.055;

export async function loadDeckLight() {
  const packed=Uint8Array.from(atob(walkLight),c=>c.charCodeAt(0));
  const bytes=new Uint8Array(await new Response(new Blob([packed]).stream().pipeThrough(new DecompressionStream('gzip'))).arrayBuffer());
  if(bytes.length!==320*64*5)throw Error('Mapa de iluminación incompleto');
  return bytes;
}

function contactAt(map,x,y,z,up) {
  if(up<.74)return 1;
  const level=elevations.findIndex(f=>Math.abs(z-f)<.032);
  if(level<0)return 1;
  const u=Math.max(0,Math.min(319,(x+3)*8-.5)),v=Math.max(0,Math.min(63,(y+4)*8-.5));
  const i=Math.floor(u),j=Math.floor(v),a=u-i,b=v-j,offset=level*20480;
  const row=(j)=>map[offset+j*320+i]*(1-a)+map[offset+j*320+Math.min(i+1,319)]*a;
  return .48+.52*(row(j)*(1-b)+row(Math.min(j+1,63))*b)/255;
}

// All five profiles share fixed geometry and a fixed sun. Bake the diffuse
// response, finish coordinates and contact field once when uploading each batch.
// Only polished metal and glass need the eye direction during the walk.
export function prepareOpaque(source,sun,map) {
  const {position,normal}=source,color=new Float32Array(source.color.length),surface=new Float32Array(source.aSurface.length);
  const ground=[.19,.16,.13],sky=[.62,.67,.73],direct=[.82,.72,.59],panel=[.72,.69,.61],fill=[.23,.22,.20];
  for(let j=0,k=0;j<position.length;j+=3,k+=4) {
    const x=position[j],y=position[j+1],z=position[j+2],nx=normal[j],ny=normal[j+1],nz=normal[j+2];
    const localX=(z+17.615)/(35.23/36),localY=x/(7.47/7.6),elevation=y+2.01;
    const code=source.aSurface[k+2],boarding=code>=37&&code<=42;
    let layer=-1,u=0,v=0;
    if(code>=44 && code<=47) {
      if(code===44){color.set([.29,.48,.53],j);layer=6;u=x*.055;v=z*.13;}
      else if(code===47){
        const t=clamp((y+3)/88),h=t*t*(3-2*t);
        color.set([.78-.38*h,.85-.21*h,.88-.04*h],j);
      }else{
        const f=.91+.09*nx;
        color.set((code===46?[.51,.57,.43]:[.36,.43,.31]).map(c=>c*f),j);
      }
    }else{
      const ambient=source.aSurface[k+3],hemi=ny*.5+.5,diffuse=Math.max(0,nx*sun.x+ny*sun.y+nz*sun.z);
      const shade=contactAt(map,localX,localY,elevation,ny);
      const metal=boarding?0:source.aSurface[k+1];
      for(let c=0;c<3;c++){
        const base=code===9?panel[c]:source.color[j+c];
        const diffuseLight=(ground[c]+(sky[c]-ground[c])*hemi+direct[c]*diffuse)*ambient;
        color[j+c]=srgb(base*(diffuseLight+(code===9?fill[c]:0)))*shade;
      }
      surface[k+3]=metal;
      const fu=x+y*.73,fv=z+y*.51;
      if(code===43){layer=5;u=localX*.44;v=localY*.44;}
      else if(code===2){layer=1;u=fu*310/(2*Math.PI);v=fv*37/(2*Math.PI);}
      else if(code===3){layer=2;u=fu*430/(2*Math.PI);v=fv*410/(2*Math.PI);}
      else if(code===1){layer=0;u=localX/2.15;v=(localY/.105+64)/8;}
      else if(code===7){
        const [cx,cy]=localY>.9?[22.03368,1.21617]:localY>.25?[22.27016,.59119]:localY< -1?[21.949225,-1.31751]:localY< -.35?[22.18570,-.69254]:[22.354615,-.05067];
        layer=3;u=(localY-cy)/.48+.5;v=((localX-cx)*.659983+(elevation-7.01)*.75128)/.36+.5;
      }else if(boarding){layer=4;u=source.aSurface[k];v=source.aSurface[k+1];}
    }
    if(layer>0)u*=.5; // two identical 256-wide tiles share each 512-wide slice
    if(layer===5){
      // Slate-blue pile with pale highlights from the mottled fibre field.
      for(let c=0;c<3;c++)color[j+c]*=[.92,1.20,1.42][c];
    }else if(layer===3){color.set([.34,.55,.48],j);}
    surface[k]=u;surface[k+1]=v;surface[k+2]=layer;
  }
  return {position,normal,color,aSurface:surface};
}
