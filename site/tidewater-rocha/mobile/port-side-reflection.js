import {sideDeckSections,sideDeckBays,sideDeckRail as rail,portSideLights,portSideSoffit as roof} from './side-deck-layout.js?v=port-passage-vr-1';

const number = n => Number(n).toFixed(7);
const stations = sideDeckSections(1);
const segments = stations.slice(1).map(([end,Y],i)=>{
  const [start,y]=stations[i];
  return {start,end,offset:y-rail.inset,slope:(Y-y)/(end-start),spacing:(end-start)/sideDeckBays(start,end)};
});
const leg = ({start,offset,slope,spacing}) => 'vec4f('+[start,offset,slope,spacing].map(number).join(',')+')';
const fixtures = portSideLights.map(x=>`distance(p,vec2f(${number(x)},${number(roof.lightY)}))`)
  .reduce((a,b)=>`min(${a},${b})`);

// Inputs use yacht-local renderer axes, with X transverse and Y up.
// The guard is intersected in the same source metres used to build its tubes.
export const portSideReflectionWGSL = `
fn portSideOptics(cosine:f32)->vec2f {
  let edge=1.-clamp(abs(cosine),0.,1.);
  let reflectance=.16+.84*edge*edge*edge*edge;
  return vec2f(mix(.226,.47,reflectance),mix(.90,.985,reflectance));
}
fn portRailSegment(x:f32)->vec4f{
  var row=${leg(segments[0])};
  ${segments.slice(1).map(s=>`if(x>=${number(s.start)}){row=${leg(s)};}`).join('\n  ')}
  return row;
}
fn portRailIntersection(p:vec3f,ray:vec3f,row:vec4f)->f32 {
  let divisor=ray.y-row.z*ray.x;
  let safe=select(min(-.0001,divisor),max(.0001,divisor),divisor>=0.);
  return (row.y+(p.x-row.x)*row.z-p.y)/safe;
}
fn portSpan(x:f32,lo:f32,hi:f32,aa:f32)->f32{
  return smoothstep(lo-aa,lo+aa,x)*(1.-smoothstep(hi-aa,hi+aa,x));
}
fn portFixtureDistance(p:vec2f)->f32{return ${fixtures};}
@diagnostic(off,derivative_uniformity)
fn portSideRadiance(position:vec3f,reflected:vec3f,sun:vec3f)->vec3f{
  let p=vec3f((position.z+17.615)/.9786111111,position.x/.9828947368,position.y+2.01);
  let ray=vec3f(reflected.z/.9786111111,reflected.x/.9828947368,reflected.y);
  let estimate=p.x+ray.x*(3.70-p.y)/max(ray.y,.0001);
  let coarse=portRailIntersection(p,ray,portRailSegment(estimate));
  let row=portRailSegment(p.x+ray.x*clamp(coarse,0.,80.));
  let t=portRailIntersection(p,ray,row);
  let hit=p+ray*clamp(t,0.,80.);
  let aa=clamp(fwidth(hit.x)*.67,.002,.038);
  let aaZ=clamp(fwidth(hit.z)*.67,.001,.036);
  let guardMask=portSpan(hit.x,${number(stations[0][0])},${number(stations.at(-1)[0])},aa)*
    step(.0,t)*step(t,80.)*step(.0001,ray.y);

  let sea=vec3f(.065,.118,.161)*mix(.50,1.,smoothstep(-.10,.22,sun.y));
  let horizon=max(fwidth(reflected.y)*.65,.0009);
  var light=mix(sea,yachtDaySky(reflected,sun,false),
    smoothstep(-horizon,horizon,reflected.y));
  let sunLobe=smoothstep(.9990,.99985,dot(reflected,sun));
  light+=vec3f(1.,.86,.62)*(.9*sunLobe);

  let low=select(${number(rail.bulwarkTop)},${number(rail.portAftCap)},hit.x<11.6);
  let bulwark=portSpan(hit.z,${number(rail.floor)},low,aaZ)*guardMask;
  let cap=portSpan(hit.z,low-.044,low,aaZ)*guardMask;
  let sideLit=max(-sun.x,0.);
  light=mix(light,vec3f(.122,.124,.118)*(.76+sideLit*.56),bulwark);
  light=mix(light,vec3f(.29,.31,.32)*(.82+sideLit*.54),cap);

  let offset=(hit.x-row.x)/row.w;
  let postDistance=abs(offset-round(offset))*row.w;
  let post=1.-smoothstep(${number(rail.postHalfWidth)}-aa,${number(rail.postHalfWidth)}+aa,postDistance);
  let middle=portSpan(hit.z,${number(rail.middle-rail.middleRadius)},${number(rail.middle+rail.middleRadius)},aaZ)*
    smoothstep(11.6-aa,11.6+aa,hit.x);
  let high=clamp((hit.z-${number(rail.top)})/${number(rail.topRadius)},-1.,1.);
  let crown=portSpan(hit.z,${number(rail.top-rail.topRadius)},${number(rail.top+rail.topRadius)},aaZ);
  let postSpan=portSpan(hit.z,low,${number(rail.postTop)},aaZ);
  let railNormal=vec3f(-sqrt(max(0.,1.-high*high)),high,0.);
  let steelRay=reflect(reflected,railNormal);
  let skyStripe=smoothstep(-.12,.24,steelRay.y);
  let steel=vec3f(.012,.016,.021)+vec3f(.50,.56,.60)*skyStripe*.64;
  light=mix(light,vec3f(.36,.40,.44),middle*guardMask);
  light=mix(light,mix(vec3f(.018,.024,.031),vec3f(.51,.54,.55),smoothstep(-.012,.012,offset-round(offset))),
    post*postSpan*guardMask);
  light=mix(light,steel,crown*guardMask);

  // Rays that meet the physical passage floor or roof first reflect the
  // lining. The planes share the deck heights and lamp centres of the mesh.
  let up=ray.z>0.;
  let liningZ=select(${number(rail.floor)},${number(roof.z)},up);
  let deckT=(liningZ-p.z)/select(min(-.0001,ray.z),max(.0001,ray.z),up);
  let deck=p+ray*clamp(deckT,0.,80.);
  let edge=portRailSegment(deck.x);
  let railY=edge.y+(deck.x-edge.x)*edge.z;
  let liningMask=portSpan(deck.x,${number(roof.start)},${number(roof.end)},.045)*
     portSpan(deck.y,3.02,railY+.012,.024)*step(.0,deckT)*step(deckT,80.);
  let plank=deck.y/.105;
  let seams=1.-smoothstep(.017,.034+min(fwidth(plank),.23),min(fract(plank),1.-fract(plank)));
  let teak=vec3f(.29,.223,.158)*(1.-.40*seams);
  let lamp=1.-smoothstep(.019,.031+min(fwidth(deck.y),.031),portFixtureDistance(deck.xy));
  let head=vec3f(.28,.30,.33)+vec3f(.73,.56,.36)*lamp;
  return mix(light,select(teak,head,up),liningMask);
}
`;
