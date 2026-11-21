import {localReflections} from './yacht-daylight.js?v=yacht-daylight-1';
// Diffuse light depends on the sun, material, normal and compartment. Most
// vertices repeat those inputs. Refresh each distinct result once when the sun
// moves, and leave only camera-dependent reflection and shadow visibility live.
const display=new Float32Array(4097);
for(let i=0;i<display.length;i++){
  const x=i/4096;display[i]=x<=.0031308?12.92*x:1.055*x**(1/2.4)-.055;
}
const encode=x=>display[Math.max(0,Math.min(4096,Math.round(x*4096)))];
export function createMaterialPalette(device){
  const existing=new Map(),records=[];
  let inputs,lit,storage,revision=-1;
  function register(bytes,offset){
    const key=String.fromCharCode(...bytes.subarray(offset+12,offset+20),bytes[offset+30],bytes[offset+31]);
    let index=existing.get(key);if(index!==undefined)return index;
    index=records.length;existing.set(key,index);
    const signed=c=>(bytes[offset+12+c]<<24)>>24;
    const norm=Math.hypot(signed(0),signed(1),signed(2))||1;
    const nx=signed(0)/norm,ny=signed(1)/norm,nz=signed(2)/norm;
    const hemi=ny*.5+.5,metal=bytes[offset+30]/255;
    const rough=signed(3)/127,region=bytes[offset+31];
    // Satin paint and varnish reflect a broad patch of the room. Prefilter the
    // six measured lobes with the material normal; polished fittings stay live.
    const broad=rough>=.32&&rough<.63&&metal<=.05;
    const diffuseReflection=[0,0,0];
    if(broad){
      for(const [axis,v] of [nx,ny,nz].entries()){
        const k=(region*6+2*axis+Number(v>=0))*4;
        for(let c=0;c<3;c++)diffuseReflection[c]+=(v*v*.55+.15)*
          (localReflections[k+c]*.86+localReflections[k+3]*[.54,.67,.81][c])*.044*(1-rough);
      }
    }
    records.push([nx,ny,nz,region*4,
      bytes[offset+16]/255,bytes[offset+17]/255,bytes[offset+18]/255,bytes[offset+19]/255,
      .43+.37*hemi,.35+.48*hemi,.29+.57*hemi,1-metal,
      rough<.32||metal>.05?1:0,...diffuseReflection]);
    return index;
  }
  function prepare(){
    inputs=new Float32Array(records.flat());
    lit=new Float32Array(Math.max(1,records.length)*8);
    storage=device.createBuffer({label:'Prepared yacht material lighting',size:lit.byteLength,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST});
    existing.clear();records.length=0;
  }
  function update(light){
    if(revision===light.revision)return;
    const {x,y,z}=light.direction,probe=light.irradiance;
    const t=Math.max(0,Math.min(1,(y-.09)/.56)),blend=t*t*(3-2*t);
    const sun=[1.06-.02*blend,.73+.25*blend,.49+.40*blend];
    for(let k=0,o=0;k<inputs.length;k+=16,o+=8){
      const nl=Math.max(0,inputs[k]*x+inputs[k+1]*y+inputs[k+2]*z);
      const r=inputs[k+3],coverage=.86+.14*probe[r+3],metalDiffuse=inputs[k+11];
      for(let c=0;c<3;c++){
        const base=inputs[k+4+c];
        const ambient=base*(inputs[k+8+c]*coverage+2.4*probe[r+c])*inputs[k+7]*metalDiffuse+inputs[k+13+c];
        const direct=base*sun[c]*nl*metalDiffuse;
        if(inputs[k+12]){lit[o+c]=ambient;lit[o+4+c]=direct;}
        else {const shade=encode(ambient);lit[o+c]=shade;lit[o+4+c]=encode(ambient+direct)-shade;}
      }
    }
    device.queue.writeBuffer(storage,0,lit);revision=light.revision;
  }
  return {register,prepare,update,get storage(){return storage;},dispose(){storage?.destroy();}};
}
