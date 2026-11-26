import packed, { layout } from './sleeve-reflection-data.js?v=stbd-cockpit-1';

const depth = layout.bands.length * layout.stations * 2;

export async function uploadSleeveReflections(device) {
  const encoded = Uint8Array.from(atob(packed), c => c.charCodeAt(0));
  const stream = new Blob([encoded]).stream().pipeThrough(new DecompressionStream('gzip'));
  const data = await new Response(stream).arrayBuffer();
  const size = [layout.size, layout.size, depth];
  if (data.byteLength !== size[0] * size[1] * size[2] * 4) throw Error('Incomplete sleeve reflection geometry');
  const texture = device.createTexture({
    label: 'Stainless sleeve reflection geometry',
    dimension: '3d',
    size,
    format: 'rgba8unorm',
    usage: GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.COPY_DST,
  });
  try {
    device.queue.writeTexture({ texture }, data, { bytesPerRow: size[0] * 4, rowsPerImage: size[1] }, size);
    return { texture, bytes: data.byteLength };
  } catch (error) {
    texture.destroy();
    throw error;
  }
}

const bandOffsets = layout.bands.map(values => 'vec4f(' + values.join(',') + ')').join(',');

export const sleeveReflectionWGSL = `
@group(0) @binding(7) var sleeveScene:texture_3d<f32>;

fn sleeveDirection(ray:vec3f)->vec2f {
 let planar=ray.xz/max(.0001,dot(abs(ray),vec3f(1.)));
 let side=select(vec2f(-1.),vec2f(1.),planar>=vec2f(0.));
 let folded=(1.-abs(planar.yx))*side;
 let uv=select(folded,planar,ray.y>=0.)*.5+.5;
 return clamp(uv,vec2f(.5/${layout.size}.),vec2f(1.-.5/${layout.size}.));
}

fn sleeveEnvironment(pos:vec3f, ray:vec3f, rough:f32)->vec3f {
 let towardBow=smoothstep(-.66,.65,ray.z);
 let skyTint=mix(vec3f(.43,.52,.79),vec3f(.84,.84,.92),towardBow);
 let sky=yachtDaySky(ray,frame.sun.xyz,false)*skyTint;
 let lake=vec3f(.048,.094,.126)*(.6+.4*smoothstep(.02,.5,frame.sun.y));
 let distant=mix(lake,sky,smoothstep(-.12-rough*.2,.02,ray.y));

 let x=(pos.z+17.615)/.97861111;
 let section=select(select(0u,1u,x>=-2.89),2u,x>=-1.17);
 let cuts=array<f32,4>(-4.5,-2.89,-1.17,2.3);
 let part=select(0u,3u,pos.x>3.047)+section;
 let bands=array<vec4f,6>(${bandOffsets});
 let band=bands[part];
 let fraction=clamp((x-cuts[section])/(cuts[section+1u]-cuts[section]),0.,1.);
 let station=(.5+f32(part)*${layout.stations}.+fraction*${layout.stations - 1}.)/${depth}.;
 let center=vec3f(band.x,mix(band.y,band.z,fraction),band.w+
                  fraction*(cuts[section+1u]-cuts[section])*.97861111);
 let original=textureSampleLevel(sleeveScene,tileSampler,vec3f(sleeveDirection(ray),station+.5),0.);
 let normal=original.xyz*(255./127.)-vec3f(128./127.);
 let along=dot(ray,normal);
 let offset=dot(center-pos,normal);
 let distance=exp2(original.w*5.357552)-1.;
 // Reproject the stored intersection plane from the actual point on the
 // sleeve. Off-screen geometry moves with the yacht as the viewer walks.
 let adjust=offset*along/max(.008,along*along);
 let reach=clamp(select(3.,distance+adjust,original.w>.01),.14,40.);
 let coords=sleeveDirection(ray*reach+pos-center);
 let surface=textureSampleLevel(sleeveScene,tileSampler,vec3f(coords,station),0.);
 if(surface.a<.01){return distant;}
 let depthNormal=textureSampleLevel(sleeveScene,tileSampler,vec3f(coords,station+.5),0.);
 let hitNormal=depthNormal.xyz*(255./127.)-vec3f(128./127.);
 let face=hitNormal*inverseSqrt(max(.01,dot(hitNormal,hitNormal)));
 let point=pos+ray*reach;
 let skyFill=.18+.36*smoothstep(-.9,.9,face.y);
 var sun=0.;
 let cosine=dot(face,frame.sun.xyz);
 if(cosine>.01){
   let light=(frame.light*vec4f(point+face*.014,1.)).xyz;
   let shadowUV=light.xy*vec2f(.5,-.5)+.5;
   sun=cosine*textureSampleCompareLevel(shadow,shadowSampler,shadowUV,light.z-.00030);
 }
 return distant*(1.-surface.a)+surface.rgb*(skyFill+vec3f(1.04,.97,.87)*sun*.67);
}

fn sleeveChrome(pos:vec3f, normal:vec3f, rough:f32)->vec3f {
 let eye=normalize(frame.eye.xyz-pos);
 // The formed face on the distal nose rolls into the broad side.
 var opticalNormal=normal;
 if(pos.z< -20.43 && normal.y<-.30 && abs(normal.x)>.25){
   opticalNormal=normalize(vec3f(normal.x,-.022,normal.z*.16));
 }
 if(pos.z>= -18.761 && normal.y>-.22 && normal.y<-.10 && abs(normal.x)>.90){
   // The pressed cheek has a shallow crown across its broad face. Keep
   // the folded lips sharp and bend the reflected lines across the face.
   let along=clamp((pos.z+18.761)/3.40,0.,1.);
   let centre=mix(2.017,1.854,along);
   let height=clamp((pos.y-centre)/.0775,-1.,1.);
   let roll=.007*sin(along*18.+height*1.6);
   opticalNormal=normalize(normal+vec3f(0.,-.032*height+roll,.014*height*(1.-2.*along)));
 }
 let ray=reflect(-eye,opticalNormal);
 let env=sleeveEnvironment(pos+normal*.006,ray,rough);
 let grazing=1.-clamp(abs(dot(normal,eye)),0.,1.);
 let tint=mix(vec3f(.72,.76,.81),vec3f(.99),pow(grazing,5.));
 let width=rough*rough*.24;
 let solar=width/(width+1.-clamp(dot(ray,frame.sun.xyz),0.,1.));
 let cosine=max(0.,dot(opticalNormal,frame.sun.xyz));
 var glint=vec3f(0.);
 if(cosine*solar*solar>.0003){
   let light=(frame.light*vec4f(pos+normal*.009,1.)).xyz;
   let lit=textureSampleCompareLevel(shadow,shadowSampler,light.xy*vec2f(.5,-.5)+.5,light.z-.00030);
   glint=vec3f(1.,.91,.8)*(lit*solar*solar*cosine);
 }
 return tint*env+glint;
}
`;
