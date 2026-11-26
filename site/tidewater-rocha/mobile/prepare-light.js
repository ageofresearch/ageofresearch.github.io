import {walkLight} from './walk-light.js?v=yacht-daylight-1';
import {compartment} from './yacht-daylight.js?v=yacht-daylight-1';
import {cockpitOverheadFinish} from './cockpit-overhead.js?v=cockpit-ceiling-vr-1';
import {aftStairMirrorFinish} from './aft-cockpit-stair.js?v=cockpit-risers-v1';
import {aftTeakFinish} from './aft-cockpit-teak.js?v=cockpit-teak-v2';
import {aftCheekFinish,aftCheekToeFinish,aftHandrailFinish} from './aft-cockpit-cheeks.js?v=cockpit-handrail-v1';

const elevations=[1.55,2.84,3.95,6,8.2];
const clamp=x=>Math.max(0,Math.min(1,x));


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

// Encode invariant material inputs once. The sun and camera remain live uniforms.
function smallReceivers(position,indices) {
  const small=new Uint8Array(position.length/3).fill(1);
  const lengthSquared=(i,j)=>{
    const a=i*3,b=j*3,x=position[a]-position[b],y=position[a+1]-position[b+1],z=position[a+2]-position[b+2];
    return x*x+y*y+z*z;
  };
  for(let i=0;i<indices.length;i+=3){
    const a=indices[i],b=indices[i+1],c=indices[i+2];
    if(!small[a]&&!small[b]&&!small[c])continue;
    if(Math.max(lengthSquared(a,b),lengthSquared(b,c),lengthSquared(c,a))>.22**2)small[a]=small[b]=small[c]=0;
  }
  return small;
}

export function prepareOpaque(source,map,indices) {
  const {position,normal}=source,color=new Float32Array(source.color),surface=new Float32Array(source.aSurface.length);
  const small=indices&&smallReceivers(position,indices);
  const count=position.length/3,roughness=new Float32Array(count),contact=new Float32Array(count),room=new Uint8Array(count);
  for(let j=0,k=0;j<position.length;j+=3,k+=4) {
    const x=position[j],y=position[j+1],z=position[j+2],nx=normal[j],ny=normal[j+1],nz=normal[j+2];
    const localX=(z+17.615)/(35.23/36),localY=x/(7.47/7.6),elevation=y+2.01;
    const code=source.aSurface[k+2],boarding=code>=37&&code<=42;
    let layer=-1,u=0,v=0;
    const index=j/3;
    contact[index]=Math.min(
      contactAt(map,localX,localY,elevation,ny), .78+.22*clamp(source.aSurface[k+3]),
    );
    roughness[index]=boarding?.82:source.aSurface[k];
    room[index]=compartment(localX,localY,elevation);
    if(code===aftStairMirrorFinish)layer=-10;
    else if(code===aftTeakFinish)layer=-11;
    else if(code===aftCheekFinish || code===aftCheekToeFinish)layer=code===aftCheekFinish?-12:-13;
    else if(code===aftHandrailFinish)layer=-14;
    else if(code===65)layer=-8;
    else if(code===62 || code===63)layer=code===62?-6:-7;
    else if(code===47)layer=-2;
    else{
      surface[k+3]=boarding?0:source.aSurface[k+1];
      if(code===9)color.set([.72,.69,.61],j);
      const fu=x+y*.73,fv=z+y*.51;
      if(code===43){layer=5;u=localX*.44;v=localY*.44;}
      else if(code===59){layer=6;u=(localX-24.08)/2.77;v=(localY+2.08)/4.20;}
      else if(code===60){
        layer=7;u=localX*.81+elevation*.63;v=localY*.76+elevation*.49;
      }
      else if(code===61){
        layer=24;
        u=(localX*.76+localY*.65)*6;
        v=(elevation*.88+localY*.52-localX*.45)*6;
      }
      else if(code===2){
        layer=1;
        if(Math.abs(ny)<.74){u=y*.65;v=(Math.abs(nx)>.70?z:x)*1.7;}
        else {u=z*.60;v=x*1.7;}
      }
      else if(code===50 || code===51){
        layer=20;u=(localY+localX*.72)*3.2;v=(elevation+localX*.81)*5.0;
        if(code===51){
          const hem=clamp((elevation-4.744)/.028);
          for(let c=0;c<3;c++)color[j+c]*=1.08+.18*hem;
        }
      }
      else if(code===3){layer=2;u=fu*430/(2*Math.PI);v=fv*410/(2*Math.PI);}
      else if(code===1){layer=0;u=localX/2.15;v=(localY/.105+64)/8;}
      else if(code===7){
        const [cx,cy]=localY>.9?[22.03368,1.21617]:localY>.25?[22.27016,.59119]:localY< -1?[21.949225,-1.31751]:localY< -.35?[22.18570,-.69254]:[22.354615,-.05067];
        layer=3;u=(localY-cy)/.48+.5;v=((localX-cx)*.659983+(elevation-7.01)*.75128)/.36+.5;
      }else if(boarding){layer=4;u=source.aSurface[k];v=source.aSurface[k+1];}
    }
    // Store model-space horizontal coordinates in the existing UV pair.
    // Reconstruct the six saloon window reflections for the two polished planes.
    if(code===56 && ny>.9 || code===9 && ny<-.9 && Math.abs(elevation-5.88)<.03){
      layer=code===56?22:21;u=localX;v=localY;
    }
    if(code===57){
      const top=Math.abs(ny)>.7,along=Math.abs(nx)>.7;
      layer=23;u=(top||along?localX:localY)*.39;v=(top?localY:elevation)*.78;
    }
    if(code===54){layer=-4;u=clamp((localY-.013)/.77);v=clamp((7.48-elevation-.095*u*u)/.51);}
    if(code===48){color.set([1,.94,.82],j);surface[k+3]=0;layer=-3;}
    if(code===cockpitOverheadFinish){layer=-9;u=localX;v=localY;}
    if(layer>0 && layer<20 && code!==59 && code!==60)u*=.5; // other patterned slices repeat twice
    if(layer===5 && color[j+2]>color[j]*1.06){
      // Slate-blue pile with pale highlights from the mottled fibre field.
      for(let c=0;c<3;c++)color[j+c]*=[.92,1.20,1.42][c];
    }else if(layer===3){color.set([.34,.55,.48],j);}
    surface[k]=u;surface[k+1]=v;surface[k+2]=layer+(small?.[index]&&layer>=-1?64:0);
  }
  return {position,normal,color,aSurface:surface,contact,roughness,room};
}

// Keep positions and finish coordinates at full precision. The remaining GPU
// inputs are bounded directions, linear colors, a small layer index and a
// metal weight. Pack them together for one aligned fetch per vertex.
export function packRenderVertices(source){
  const count=source.position.length/3,buffer=new ArrayBuffer(count*32);
  const floats=new Float32Array(buffer),signed=new Int8Array(buffer),bytes=new Uint8Array(buffer),shorts=new Int16Array(buffer);
  for(let i=0;i<count;i++){
    const a=i*3,s=i*4,f=i*8,b=i*32;
    floats[f]=source.position[a];floats[f+1]=source.position[a+1];floats[f+2]=source.position[a+2];
    for(let c=0;c<3;c++){
      signed[b+12+c]=Math.round(Math.max(-1,Math.min(1,source.normal[a+c]))*127);
      bytes[b+16+c]=Math.round(clamp(source.color[a+c])*255);
    }
    signed[b+15]=Math.round(clamp(source.roughness?.[i]??1)*127);
    bytes[b+19]=Math.round(clamp(source.contact?.[i]??1)*255);
    floats[f+5]=source.aSurface[s];floats[f+6]=source.aSurface[s+1];
    shorts[i*16+14]=source.aSurface[s+2];shorts[i*16+15]=((source.room?.[i]??0)<<8)|Math.round(clamp(source.aSurface[s+3])*255);
  }
  return bytes;
}
