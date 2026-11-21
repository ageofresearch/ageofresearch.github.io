import { sampleReflectionWGSL } from './yacht-daylight.js?v=yacht-daylight-1';
import { skyRadiance } from './yacht-sky.js?v=yacht-daylight-1';
// Prepared materials are linear. Diffuse sky, reflected light and direct sun
// meet before the one display conversion. Visibility modulates direct light only.
function program(tagged) {
return `
struct Frame {
  clip:mat4x4f, eye:vec4f, sun:vec4f, light:mat4x4f,
  bounce:array<vec4f,32>, fittings:array<vec4f,192>,
}
@group(0) @binding(0) var<uniform> frame:Frame;
@group(0) @binding(1) var tileSampler:sampler;
@group(0) @binding(2) var tiles:texture_2d_array<f32>;
@group(0) @binding(3) var shadow:texture_depth_2d;
@group(0) @binding(4) var shadowSampler:sampler_comparison;

fn display(c:vec3f)->vec3f{
  // Minimax fit on the displayable interval. Maximum sRGB error < 0.00037.
  let v=clamp(c,vec3f(0.),vec3f(1.));let root=sqrt(v);
  let srgb=-.07690366+.83375405*root+.29810790*sqrt(root)-.05531760*v;
  return select(srgb,12.92*v,v<=vec3f(.0031308));
}
${skyRadiance}
fn sky(dir:vec3f)->vec3f{return yachtDaySky(dir,frame.sun.xyz,true);}
struct V {
 ${tagged?'@location(5) @interpolate(flat) tag:u32,':''}
 @builtin(position) clip:vec4f,@location(0) indirect:vec3f,@location(1) direct:vec3f,
 @location(2) uv:vec2f,@location(3) @interpolate(flat) layer:i32,@location(4) light:vec3f
}
@vertex fn vertex(${tagged?'@builtin(vertex_index) id:u32,':''}@location(0) pos:vec3f,@location(1) n:vec4f,@location(2) color:vec4f,
 @location(3) uv:vec2f,@location(4) finish:vec2i,@location(5) shade:vec4f,@location(6) direct:vec4f)->V {
 var o:V;${tagged?'o.tag=id%251u;':''}o.clip=frame.clip*vec4f(pos,1.);o.uv=uv;o.layer=finish.x;
 if(o.layer==-2){
   let dome=normalize((pos-vec3f(0.,-2.01,0.))/vec3f(.98289474,1.,.97861111));
   let east=normalize(vec3f(frame.sun.w,0.,frame.eye.w));
   let ray=east*dome.x+cross(east,frame.sun.xyz)*dome.z+frame.sun.xyz*dome.y;
   o.clip=frame.clip*vec4f(frame.eye.xyz+120.*ray,1.);
   o.indirect=display(sky(ray));return o;
 }
 if(o.layer==-3){o.indirect=display(color.rgb);return o;}
 let normal=normalize(n.xyz);let rough=n.w;let metal=f32(finish.y & 255)/255.;
 o.indirect=shade.rgb;o.direct=direct.rgb;
 if(rough<.32 || metal>.05){
   o.indirect*=2.*shade.rgb;o.direct*=2.*direct.rgb;
   let probe=frame.bounce[u32(finish.y)>>8u];
   let sunlight=mix(vec3f(1.06,.73,.49),vec3f(1.04,.98,.89),smoothstep(.09,.65,frame.sun.y));
   let eye=normalize(frame.eye.xyz-pos);let reflected=reflect(-eye,normal);
   let f0=mix(vec3f(.044),color.rgb,metal);
   let edge=1.-clamp(abs(dot(eye,normal)),0.,1.);let edge2=edge*edge;
   let fresnel=f0+(vec3f(1.)-f0)*edge2*edge2*edge;
   let region=u32(finish.y)>>8u;
   let fittings=${sampleReflectionWGSL('frame.fittings', 'region', 'reflected')};
   let reflectedLight=fittings.rgb*(.78+probe.rgb)+fittings.w*yachtDaySky(reflected,frame.sun.xyz,false);
   let gloss=1.-rough;
   o.indirect+=fresnel*reflectedLight*gloss;
   let alignment=max(0.,dot(reflected,frame.sun.xyz));
   let width=mix(.13,.016,gloss);
   let lobe=width/(width+1.-alignment);
   o.direct+=sunlight*fresnel*gloss*lobe*lobe*alignment;

 // The visibility endpoints vary smoothly across a face. Transform each once at
 // its vertices; the shadow map interpolates between them across the penumbra.
 let sunlit=display(o.indirect+o.direct);
 o.indirect=display(o.indirect);o.direct=sunlit-o.indirect;
 }
 o.light=(frame.light*vec4f(pos+normal*.009,1.)).xyz;
 if(o.layer>=63){
   o.layer-=64;
   if(any(o.direct>vec3f(.001))){
   let lit=textureSampleCompareLevel(shadow,shadowSampler,o.light.xy*vec2f(.5,-.5)+.5,o.light.z-.00030);
   o.indirect+=o.direct*lit;}o.direct=vec3f(0.);
 }
 return o;
}
@diagnostic(off, derivative_uniformity)
fn shade(in:V)->vec4f{
 if(in.layer<=-2){return vec4f(in.indirect,1.);}
 var radiance=in.indirect;
 if(any(in.direct>vec3f(.001))){
   let lit=textureSampleCompareLevel(shadow,shadowSampler,in.light.xy*vec2f(.5,-.5)+.5,in.light.z-.00030);
   radiance+=in.direct*lit;
 }
 if(in.layer>=0){
   let layer=select(in.layer-1,5+clamp(i32(floor(in.uv.y))-1,0,12),in.layer==0);
   let tile=textureSample(tiles,tileSampler,in.uv,select(layer,18,in.layer==20)).r*1.1;
   radiance=(radiance+.055)*tile-.055;
 }
 return vec4f(radiance,1.);
}
@fragment fn fragment(in:V)->@location(0) vec4f{return shade(in);}
${tagged?`
struct Tagged { @location(0) color:vec4f, @location(1) powers:vec4f }
@fragment fn tagged(in:V)->Tagged {
 let x=in.tag;let b=(x*x)%251u;let c=(b*x)%251u;let d=(c*x)%251u;
 return Tagged(shade(in),vec4f(vec4u(x,b,c,d)));
}`:''}
struct Glass { @builtin(position) clip:vec4f,@location(0) rgba:vec4f }
@vertex fn glassVertex(@location(0) pos:vec3f,@location(1) normal:vec4f,@location(2) tint:vec4f,@location(4) finish:vec2i)->Glass{
 let eye=normalize(frame.eye.xyz-pos);let n=normalize(normal.xyz);
 let grazing=pow(1.-abs(dot(n,eye)),5.);
 let r=reflect(-eye,n);let reflected=sky(r);
 return Glass(frame.clip*vec4f(pos,1.),vec4f(display(mix(tint.rgb,reflected,.48+.45*grazing)),select(.06+.30*grazing,.24+.37*grazing,finish.x==26)));
}
@fragment fn glassFragment(in:Glass)->@location(0) vec4f{return in.rgba;}
`;
}
export const shader=program(false);
export const visibilityShader=program(true);
