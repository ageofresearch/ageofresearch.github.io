import {flagVertex,mobileFlagPaint} from './stern-flag.js?v=stern-flag-1';
import { sampleReflectionWGSL } from './yacht-daylight.js?v=yacht-daylight-1';
import { skyRadiance } from './yacht-sky.js?v=yacht-daylight-1';
import { packedRadianceScale } from './daylight-materials.js?v=yacht-daylight-2';
import { ownerContactBounds, ownerContactWGSL } from './owner-contact-layout.js?v=owner-contact-1';
import { gangwaySteelWGSL } from './gangway-finish.js?v=vr-rails-2';
import { gangwayRadianceWGSL } from './gangway-radiance.js?v=vr-rails-5';
// Diffuse finishes receive prepared shadow and sunlit endpoints. Glossy
// finishes add reflections in linear light before preparing those endpoints.
function program(tagged) {
return `
override animateCloth:bool=false;
struct Frame {
  clip:mat4x4f, eye:vec4f, sun:vec4f, light:mat4x4f,
  bounce:array<vec4f,32>, fittings:array<vec4f,192>, wind:vec4f,
}
@group(0) @binding(0) var<uniform> frame:Frame;
@group(0) @binding(1) var tileSampler:sampler;
@group(0) @binding(2) var tiles:texture_2d_array<f32>;
@group(0) @binding(3) var shadow:texture_depth_2d;
@group(0) @binding(4) var shadowSampler:sampler_comparison;
@group(0) @binding(5) var ownerContactMap:texture_2d<f32>;
${ownerContactWGSL}

fn display(c:vec3f)->vec3f{
  // Minimax fit on the displayable interval. Maximum sRGB error < 0.00037.
  let v=clamp(c,vec3f(0.),vec3f(1.));let root=sqrt(v);
  let srgb=-.07690366+.83375405*root+.29810790*sqrt(root)-.05531760*v;
  return select(srgb,12.92*v,v<=vec3f(.0031308));
}
${skyRadiance}
${gangwaySteelWGSL}
${gangwayRadianceWGSL}
fn sky(dir:vec3f)->vec3f{return yachtDaySky(dir,frame.sun.xyz,true);}
struct V {
 ${tagged?'@location(5) @interpolate(flat) tag:u32,':''}
 @builtin(position) clip:vec4f,@location(0) @interpolate(perspective,centroid) indirect:vec3f,@location(1) @interpolate(perspective,centroid) direct:vec3f,
 @location(2) uv:vec2f,@location(3) @interpolate(flat) layer:i32,@location(4) light:vec3f
}
@vertex fn vertex(${tagged?'@builtin(vertex_index) id:u32,':''}@location(0) pos:vec3f,@location(1) n:vec4f,@location(2) color:vec4f,
 @location(3) uv:vec2f,@location(4) finish:vec2i,@location(5) shade:vec4f,@location(6) direct:vec4f)->V {
 var o:V;${tagged?'o.tag=id&65535u;':''}o.clip=frame.clip*vec4f(pos,1.);o.uv=uv;o.layer=finish.x;
 if(animateCloth && o.layer==-4){
   var cloth=pos;var normal=n.xyz;
   ${flagVertex('cloth','normal','uv','frame.wind.x')}
   o.clip=frame.clip*vec4f(cloth,1.);
   let sunlight=mix(vec3f(1.02,.76,.57),vec3f(1.02,.97,.90),smoothstep(.05,.63,frame.sun.y));
   let cosine=dot(normal,frame.sun.xyz);
   let sideLight=.5+.5*dot(normal,normalize(vec3f(-.84,.49,.23)));
   o.indirect=vec3f(.88,.94,1.)*(.16+.49*sideLight*sideLight)+.13*frame.bounce[0].rgb;
   o.direct=sunlight*(.14+.55*max(cosine,0.)+.14*max(-cosine,0.))*smoothstep(-.05,.18,frame.sun.y);
   let light=(frame.light*vec4f(cloth+normal*.007,1.)).xyz;
   let lit=textureSampleCompareLevel(shadow,shadowSampler,light.xy*vec2f(.5,-.5)+.5,light.z-.00030);
   o.indirect+=o.direct*lit;return o;
 }
 if(o.layer==-2){
   let dome=normalize((pos-vec3f(0.,-2.01,0.))/vec3f(.98289474,1.,.97861111));
   let east=normalize(vec3f(frame.sun.w,0.,frame.eye.w));
   let ray=east*dome.x+cross(east,frame.sun.xyz)*dome.z+frame.sun.xyz*dome.y;
   o.clip=frame.clip*vec4f(frame.eye.xyz+120.*ray,1.);
   o.indirect=display(sky(ray));return o;
 }
 if(o.layer==-3){o.indirect=display(color.rgb);return o;}
 let normal=normalize(n.xyz);let rough=n.w;let metal=f32(finish.y & 255)/255.;
 if(o.layer==-6 || o.layer==-7){
   o.indirect=display(sleeveChrome(pos,normal,o.layer==-7));return o;
 }
 if(isGangwaySteel(pos,rough,metal)){
   let light=(frame.light*vec4f(pos+normal*.009,1.)).xyz;
   let lit=textureSampleCompareLevel(shadow,shadowSampler,light.xy*vec2f(.5,-.5)+.5,light.z-.00030);
   // For these tubes the fragment reads the smooth cylinder normal before
   // reflection. Interpolating a finished color would erase the mirror band.
   o.layer=-5;o.indirect=pos;o.direct=normal;o.uv=vec2f(rough,lit);
   return o;
 }
 o.indirect=shade.rgb;o.direct=direct.rgb;
 if(rough<.32 || metal>.05){
   o.indirect*=${packedRadianceScale}.*shade.rgb;o.direct*=${packedRadianceScale}.*direct.rgb;
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
   o.indirect+=fresnel*reflectedLight*gloss*mix(.15,1.,color.a);
   let alignment=max(0.,dot(reflected,frame.sun.xyz));
   let width=mix(.13,.016,gloss);
   let lobe=width/(width+1.-alignment);
   o.direct+=sunlight*fresnel*gloss*lobe*lobe*alignment*max(0.,dot(normal,frame.sun.xyz));

 // The visibility endpoints vary smoothly across a face. Transform each once at
 // its vertices; the shadow map interpolates between them across the penumbra.
 let sunlit=display(o.indirect+o.direct);
 o.indirect=display(o.indirect);o.direct=sunlit-o.indirect;
 }
 if(o.layer==6 || o.layer==70){
   let view=normalize(frame.eye.xyz-pos);
   let across=.33*view.x*(shade.a*2.-1.);
   let nap=smoothstep(-.86,.86,view.z+across);
   o.indirect*=1.+direct.a*.10*(nap-.5);
   o.direct*=1.+.11*(smoothstep(-.86,.86,view.z+frame.sun.z)-.5);
 }
 if(o.layer==20 || o.layer==84 || o.layer==24 || o.layer==88){
   if(o.layer==24 || o.layer==88){o.uv*=1.35;}
   let view=normalize(frame.eye.xyz-pos);
   let beam=shade.a*2.-1.;
   let edge=1.-clamp(abs(dot(normal,view)),0.,1.);
   let sky=direct.a*(.25+.75*max(.0,dot(normal,vec3f(beam,.45,0.))));
   o.indirect*=1.+vec3f(.13,.17,.21)*sky*edge*edge;
 }
 o.light=(frame.light*vec4f(pos+normal*.009,1.)).xyz;
 if(o.layer==21 || o.layer==22 || o.layer==85 || o.layer==86){
   let table=o.layer==22 || o.layer==86;
   let compact=o.layer>=64;
   // Fold the rough window response into the lighting at the receiving
   // vertices. The standard wood sample still supplies the close grain.
   o.layer=select(-1,1,table)+select(0,64,compact);
   o.uv=vec2f(uv.x*.52,uv.y*1.7);
   let surface=vec3f(uv.x,uv.y,select(5.88,4.69,table));
   if(surface.x>8.48 && surface.x<17.90 && abs(surface.y)<3.04){
     let eye=vec3f((frame.eye.z+17.615)/.978611,frame.eye.x/.982895,frame.eye.y+2.01);
     let ray=(surface-eye)*vec3f(1.,1.,-1.);
     let distance=(select(-3.01,3.01,ray.y>=0.)-surface.y)/max(abs(ray.y),.001)*sign(ray.y);
     let hit=surface+distance*ray;
     let span=min(hit.x-8.60,17.9-hit.x);
     let mullion=min(abs(hit.x-11.55),abs(hit.x-15.05))-.05;
     let frameEdge=min(min(span,mullion),min(hit.z-4.24,5.80-hit.z));
     let window=smoothstep(-.30,.20,frameEdge);
     let horizon=smoothstep(-.32,.26,ray.z/max(length(ray.xy),.001));
     o.indirect+=window*mix(vec3f(.026,.032,.040),vec3f(.16,.18,.20),horizon)*select(.74,1.,table);
   }
 }
 if(o.layer==23 || o.layer==87){
   // Use the bounded second half of the instrument slice. Coordinates are
   // continuous across adjoining panels of the same stone installation.
   let modelX=(pos.z+17.615)/.978611;
   let modelY=pos.x/.982895;
   let upright=abs(normal.y)<.7;
   let along=abs(normal.x)>.7;
   let start=select(20.4,27.1,modelX>26.);
   let across=select((modelX-start)/2.3,(modelY+3.2)/6.4,upright&&!along);
   let up=select((modelY+3.2)/6.4,(pos.y+2.01-3.94)/1.93,upright);
   o.uv=vec2f(.502+.496*clamp(across,0.,1.),.003+.994*clamp(up,0.,1.));
   o.layer-=20;
 }else if(o.layer==3 || o.layer==67){o.uv=clamp(o.uv,vec2f(.001,.002),vec2f(.499,.998));}
 // The sole and rug already carry model-space coordinates in their UVs.
 let compact=o.layer>=63;
 if(compact){o.layer-=64;}
 var contactReceiver=false;
 if((o.layer==0 || o.layer==6) && n.y>.78 && abs(pos.y-1.94)<.022){
   let modelX=(pos.z+17.615)/.9786111111;
   contactReceiver=modelX>=${ownerContactBounds[0]} && modelX<=${ownerContactBounds[2]} && abs(pos.x)<2.56;
 }
 if(compact){
   if(any(o.direct>vec3f(.001))){
     let lit=textureSampleCompareLevel(shadow,shadowSampler,o.light.xy*vec2f(.5,-.5)+.5,o.light.z-.00030);
     o.direct*=lit;
   }else{o.direct=vec3f(0.);}
   if(!contactReceiver){o.indirect+=o.direct;o.direct=vec3f(0.);}
 }
 if(contactReceiver){o.layer+=select(64,128,compact);}
 return o;
}
@diagnostic(off, derivative_uniformity)
fn shade(in:V)->vec4f{
 if(animateCloth && in.layer==-4){
   ${mobileFlagPaint}
   return vec4f(display(dye*in.indirect),1.);
 }
 if(in.layer==-5){
   return vec4f(display(polishedGangway(in.indirect,normalize(in.direct),in.uv.x,in.uv.y)),1.);
 }
 if(in.layer<=-2){return vec4f(in.indirect,1.);}
 var radiance=in.indirect;
 let finish=in.layer & 63;
 if(in.layer>=64){
   let sole=vec2f(in.uv.x*2.15,(in.uv.y*8.-64.)*.105);
   let rug=in.uv*vec2f(2.77,4.20)+vec2f(24.08,-2.08);
   let contact=suiteContactVisibility(select(sole,rug,finish==6),ownerContactMap,tileSampler);
   // The ambient endpoint is in the sRGB power domain. Sunlight is added below.
   radiance=max(vec3f(0.),(radiance+.055)*sqrt(contact)-.055);
 }
 if(in.layer>=128){radiance+=in.direct;}
 else if(any(in.direct>vec3f(.001))){
   let lit=textureSampleCompareLevel(shadow,shadowSampler,in.light.xy*vec2f(.5,-.5)+.5,in.light.z-.00030);
   radiance+=in.direct*lit;
 }
 if(in.layer>=0){
   let layer=select(finish-1,5+clamp(i32(floor(in.uv.y))-1,0,12),finish==0);
   let upholstery=finish==24;
   let weaveValue=textureSample(tiles,tileSampler,in.uv,select(layer,18,finish==20 || upholstery)).r;
   var tile=weaveValue*1.1;
   if(upholstery){tile=.94+(weaveValue-.615)*2.05;}
   radiance=(radiance+.055)*tile-.055;
 }
 return vec4f(radiance,1.);
}
@fragment fn fragment(in:V)->@location(0) vec4f{return shade(in);}
${tagged?`
struct Tagged { @location(0) color:vec4f, @location(1) powers:vec4f }
@fragment fn tagged(in:V)->Tagged {
 let tag=in.tag;
 return Tagged(shade(in),vec4f(f32(tag&255u)/255., f32(tag>>8u)/255., 1., 1.));
}`:''}
struct Glass { @builtin(position) clip:vec4f,@location(0) rgba:vec4f,@location(1) railRay:vec3f }
@vertex fn glassVertex(@location(0) pos:vec3f,@location(1) normal:vec4f,@location(2) tint:vec4f,@location(4) finish:vec2i)->Glass{
 let eye=normalize(frame.eye.xyz-pos);let n=normalize(normal.xyz);
 let grazing=pow(1.-abs(dot(n,eye)),5.);
 let r=reflect(-eye,n);let reflected=sky(r);
 if(finish.x==52 || finish.x==53){
   // Transmitted daylight remains visible from inside. From the cockpit the
   // fixed leaves read as dark smoked glass beside the actual open doorway.
   let door=finish.x==52;
   let outside=select(smoothstep(2.8,3.12,abs(frame.eye.x)),1.-smoothstep(-9.60,-9.16,frame.eye.z),door);
   let opacity=mix(select(.26,.60,door),select(.62,.90,door),outside);
   let reflection=mix(vec3f(.018,.023,.029),reflected,.045+.24*grazing);
   // Bake the sea/sky tint into the vertex color. The hardware interpolates
   // across each fixed light without shading the overlapping glass per pixel.
   let horizon=(smoothstep(-.04,.04,r.y)-.60)*.16*outside;
   // Project the fixed outer rail onto the side glass. Homogeneous interpolation
   // keeps the reflected rail continuous across large, differently split panes.
   var railRay=vec3f(0.);
   if(!door){
     let point=vec3f((pos.z+17.615)/.978611,pos.x/.982895,pos.y+2.01);
     let delta=vec3f((pos.z-frame.eye.z)/.978611,-(pos.x-frame.eye.x)/.982895,pos.y-frame.eye.y);
     let side=sign(point.y);let divisor=side*delta.y;let gap=3.70-abs(point.y);
     railRay=vec3f(point.x*divisor+gap*delta.x,point.z*divisor+gap*delta.z,divisor);
   }
   return Glass(frame.clip*vec4f(pos,1.),vec4f(display(reflection)+vec3f(horizon),mix(opacity,.94,grazing)),railRay);
 }
 return Glass(frame.clip*vec4f(pos,1.),vec4f(display(mix(tint.rgb,reflected,.48+.45*grazing)),select(.06+.30*grazing,.24+.37*grazing,finish.x==26)),vec3f(0.));
}
@diagnostic(off, derivative_uniformity)
@fragment fn glassFragment(in:Glass)->@location(0) vec4f{
 if(in.railRay.z<=.02){return in.rgba;}
 let p=in.railRay.xy/in.railRay.z;
 let feather=max(fwidth(p.y),.008);
 let stripe=1.-smoothstep(.014,.014+feather,abs(p.y-5.005));
 let span=smoothstep(6.,8.5,p.x)*(1.-smoothstep(17.9,20.,p.x));
 return vec4f(in.rgba.rgb+vec3f(.16,.17,.17)*stripe*span,in.rgba.a);
}
`;
}
export const shader=program(false);
export const visibilityShader=program(true);
