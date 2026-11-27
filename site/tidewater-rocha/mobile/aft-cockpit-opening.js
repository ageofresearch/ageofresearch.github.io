// Lower edge of the aperture, traced in the Cockpit (Port) panorama.
// x runs forward along the boat. The long edge with larger y is outboard.
export const aftOpeningFinish = 74;
const portSegments=9,inboardSegments=10;
const arc = (x, y, rx, ry, start, count) => Array.from({length:count+1},(_,i)=>{
  const angle=(start+i/count)*Math.PI/2;
  return [x+rx*Math.cos(angle),y+ry*Math.sin(angle)];
});

export const aftOpening = {
  underside:5.88, deck:6, portSegments, inboardSegments,
  // The two aft shoulders have different radii and meet a shallow transverse bow.
  outline:[
    [8.07,2.737], [6.41,2.701],
    ...arc(5.858,2.520,.153,.181,1,portSegments),
    [5.700,2.365],
    ...arc(5.903,2.245,.203,.212,2,inboardSegments),
    [6.680,2.033], [6.738,2.032], [6.772,2.018],
    [6.807,1.983], [6.851,1.968], [7.875,1.956], [8.07,1.965],
  ],
  radii:{port:[.153,.181],inboard:[.203,.212]},
};

const branch=[5.925,1.837];
export const aftOpeningJoints = [
  [[3.39,2.33],[5.506,2.39],[5.556,2.389],[5.589,2.374],[5.604,2.344],
    ...arc(5.938,2.141,.334,.304,2,16),branch,[6.357,1.838],[6.423,1.841],
    [6.450,1.811],[6.459,1.792],[6.481,1.766],[6.518,1.754],[6.558,1.756],
    [6.595,1.774],[6.618,1.804],[6.624,1.851],[6.619,1.886],[6.642,1.906]],
  [branch,[5.96,1.37],[6.01,.79],[6.13,-.16],[6.31,-1.45],[6.48,-2.76],[6.54,-2.975]],
  [[6.630,1.891],[6.849,1.889],[7.357,1.865],[7.449,1.820],[7.473,1.744],
    [7.195,.968],[7.145,.797],[7.145,.685],[7.26,-.32],[7.44,-1.43],[7.72,-2.90]],
  [[3.61,1.58],[3.78,.20],[3.89,-1.38],[4.28,-2.43],[5.03,-2.77],[6.11,-2.95],[8.31,-3.08]],
  [[4.82,1.27],[5.25,.23],[5.60,-.90],[6.04,-2.45],[6.11,-2.95]],
  [[8.08,1.755],[8.35,1.508],[8.458,1.403],[8.477,1.311],[8.477,-3.03]],
];

export const aftOpeningWGSL = /* wgsl */ `
fn aftOpeningReflection(pos:vec3f,n:vec3f,rough:f32,lit:f32)->vec3f{
  let eye=normalize(frame.eye.xyz-pos);
  let ray=reflect(-eye,n);
  let p=vec3f((pos.z+17.615)/.9786111111,pos.x/.9828947368,pos.y+2.01);
  let d=vec3f(ray.z/.9786111111,ray.x/.9828947368,ray.y);
  let t=(6.-p.z)/aftStairSafe(d.z);
  let hit=p+t*d;
  let solid=hit.y<1.68 || hit.y>2.74 || hit.x<5.10 || hit.x>8.05;
  let openSky=yachtDaySky(ray,frame.sun.xyz,false);
  let roof=vec3f(.225,.233,.246);
  let low=mix(vec3f(.045,.062,.088),vec3f(.22,.163,.113),(1.-smoothstep(-.74,-.18,ray.y)));
  let upper=select(openSky*.68,roof,t>.005 && solid && hit.x>3.2 && hit.x<11.5 && abs(hit.y)<3.65);
  let sky=mix(low,upper,smoothstep(-.065,.045,ray.y));
  let seam=1.-smoothstep(.004,.013,p.z-5.88);
  let outboard=smoothstep(2.56,2.67,p.y);
  let end=(1.-smoothstep(5.64,5.91,p.x));
  let mirror=select(max(outboard,end),1.,rough<.13 && p.z>5.95);
  let edge=pow(1.-abs(dot(n,eye)),4.);
  let halfWidth=.001+rough*rough*.07;
  let lobe=halfWidth/(halfWidth+1.-max(0.,dot(ray,frame.sun.xyz)));
  let sunlight=lobe*lobe*lit*max(0.,dot(n,frame.sun.xyz));
  let base=mix(vec3f(.159,.162,.174),sky*(.63+.22*edge)+.028,mirror);
  return base*(1.-(.36+.47*mirror)*seam)+sunlight*(.15+.68*mirror);
}
`;
