import {sampleReflectionWGSL} from './yacht-daylight.js?v=yacht-daylight-1';
import {skyRadiance} from './yacht-sky.js?v=yacht-daylight-1';
// Prepared materials are linear. Diffuse sky, reflected light and direct sun
// meet before the one display conversion. Visibility modulates direct light only.
export const shader=`
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
  let v=max(c,vec3f(0.));return select(1.055*pow(v,vec3f(1./2.4))-.055,12.92*v,v<=vec3f(.0031308));
}
${skyRadiance}
fn sky(dir:vec3f)->vec3f{return yachtDaySky(dir,frame.sun.xyz,true);}
struct V {
 @builtin(position) clip:vec4f,@location(0) indirect:vec3f,@location(1) direct:vec3f,
 @location(2) uv:vec2f,@location(3) @interpolate(flat) layer:i32,@location(4) light:vec3f
}
@vertex fn vertex(@location(0) pos:vec3f,@location(1) n:vec4f,@location(2) color:vec4f,
 @location(3) uv:vec2f,@location(4) finish:vec2i)->V {
 var o:V;o.clip=frame.clip*vec4f(pos,1.);o.uv=uv;o.layer=finish.x;
 if(o.layer==-2){o.indirect=pos-frame.eye.xyz;return o;}
 if(o.layer==-3){o.indirect=color.rgb;return o;}
 let normal=normalize(n.xyz);let rough=n.w;let metal=f32(finish.y & 255)/255.;
 let probe=frame.bounce[u32(finish.y)>>8u];
 let hemi=normal.y*.5+.5;
 let ambient=mix(vec3f(.43,.35,.29),vec3f(.80,.83,.86),hemi)*(.86+.14*probe.w);
 o.indirect=color.rgb*(ambient+2.4*probe.rgb)*color.a;
 let nl=max(dot(normal,frame.sun.xyz),0.);
 let sunlight=mix(vec3f(1.06,.73,.49),vec3f(1.04,.98,.89),smoothstep(.09,.65,frame.sun.y));
 o.direct=color.rgb*sunlight*nl*(1.-metal);
 if(rough<.63 || metal>.05){
   let eye=normalize(frame.eye.xyz-pos);let reflected=reflect(-eye,normal);
   let f0=mix(vec3f(.044),color.rgb,metal);
   let fresnel=f0+(vec3f(1.)-f0)*pow(1.-abs(dot(eye,normal)),5.);
   let region=u32(finish.y)>>8u;
   let fittings=${sampleReflectionWGSL('frame.fittings','region','reflected')};
   let reflectedLight=fittings.rgb*(.78+probe.rgb)+fittings.w*yachtDaySky(reflected,frame.sun.xyz,false);
   let gloss=1.-rough;
   o.indirect=o.indirect*(1.-metal)+fresnel*reflectedLight*gloss;
   o.direct+=sunlight*fresnel*gloss*pow(max(dot(reflected,frame.sun.xyz),0.),mix(12.,110.,gloss));
 }
 o.light=(frame.light*vec4f(pos+normal*.009,1.)).xyz;return o;
}
@diagnostic(off, derivative_uniformity)
@fragment fn fragment(in:V)->@location(0) vec4f{
 if(in.layer==-2){return vec4f(display(sky(normalize(in.indirect))),1.);}
 if(in.layer==-3){return vec4f(display(in.indirect),1.);}
 let visibility=textureSampleCompareLevel(shadow,shadowSampler,in.light.xy*vec2f(.5,-.5)+.5,in.light.z-.00030);
 var radiance=in.indirect+in.direct*visibility;
 if(in.layer>=0){
   let layer=select(in.layer-1,5+clamp(i32(floor(in.uv.y))-1,0,12),in.layer==0);
   let tile=textureSample(tiles,tileSampler,in.uv,select(layer,18,in.layer==20)).r*1.1;
   radiance*=tile*tile;
 }
 return vec4f(display(radiance),1.);
}
struct Glass { @builtin(position) clip:vec4f,@location(0) rgba:vec4f }
@vertex fn glassVertex(@location(0) pos:vec3f,@location(1) normal:vec4f,@location(2) tint:vec4f,@location(4) finish:vec2i)->Glass{
 let eye=normalize(frame.eye.xyz-pos);let n=normalize(normal.xyz);
 let grazing=pow(1.-abs(dot(n,eye)),5.);
 let r=reflect(-eye,n);let reflected=sky(r);
 return Glass(frame.clip*vec4f(pos,1.),vec4f(display(mix(tint.rgb,reflected,.48+.45*grazing)),select(.06+.30*grazing,.24+.37*grazing,finish.x==26)));
}
@fragment fn glassFragment(in:Glass)->@location(0) vec4f{return in.rgba;}
`;
