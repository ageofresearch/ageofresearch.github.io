// These helpers use yacht coordinates (beam, elevation, length) and operate
// on linear radiance. Window strength comes from the baked skylight lobes.
const mainApertures = [
  [10.05, 2.90, 3.00],
  [13.30, 3.40, 3.01],
  [16.50, 2.80, 3.05],
];
const ownerApertures = [
  [23.825, 2.35, 2.82],
  [26.13, 2.06, 2.57],
];
const lengthScale = 35.23 / 36;
const beamScale = 7.47 / 7.6;
const centre = 35.23 / 2;
const windowHeight = 5.02 - 2.01;
export const windowSky = [.36, .48, .60];
const vector = xyz => `vec3f(${xyz.map(v => v.toFixed(8)).join(',')})`;
const clamp = (x, low, high) => Math.max(low, Math.min(high, x));
function smooth(start, end, x) {
  const t = clamp((x - start) / (end - start), 0, 1);
  return t * t * (3 - 2 * t);
}
const mix = (a, b, q) => a.map((v, i) => v + (b[i] - v) * q);

// The mobile palette prepares this static term once along with the contact
// factor. The full renderer uses the same apertures in its vertex program.
export function windowFill(beam, vertical, length, nx, ny, nz) {
  const x = (length + centre) / lengthScale, z = vertical + 2.01;
  if (z < 3.93 || z > 5.88) return 0;
  let aperture, weight;
  if (x > 8.45 && x < 17.9) {
    const [aft, middle, forward] = mainApertures;
    aperture = mix(mix(aft, middle, smooth(11, 12.1, x)), forward, smooth(14.5, 15.6, x));
    weight = smooth(8.45, 9.20, x) * (1 - smooth(17.30, 17.90, x));
  } else if (x > 22.59 && x < 27.16) {
    aperture = mix(...ownerApertures, smooth(24.55, 25.55, x));
    weight = smooth(22.59, 23.02, x) * (1 - smooth(26.72, 27.16, x));
  } else {
    return 0;
  }
  const [offset, width, side] = aperture, edge = side * beamScale;
  if (Math.abs(beam) > edge) return 0;
  const along = (offset * lengthScale - centre) - length;
  const rz = clamp(along, -.28 * width, .28 * width);
  // The closest point within the window span is the lighting sample.
  const dy = windowHeight - vertical;
  const dz = along - rz;
  const area = width * 1.46;
  let fill = 0;
  for (const dx of [-edge - beam, edge - beam]) {
    const distance2 = dx * dx + dy * dy + dz * dz + .12;
    const normalDot = Math.max(0, nx * dx + ny * dy + nz * dz);
    fill += normalDot * Math.abs(dx) / distance2 * area / (area + 3.142 * distance2);
  }
  return fill * weight;
}

export const surfaceLightWGSL = `
struct YachtWindowLight { direction: vec3f, strength: f32 }

fn yachtWindowLight(beam: f32, port: f32, starboard: f32) -> YachtWindowLight {
  let side = clamp(beam / 3., -.9, .9);
  let left = port * (1.-side);
  let right = starboard * (1.+side);
  let direction = normalize(vec3f(2.4*(right-left), .08 + .4*(left+right), 0.));
  let strength = clamp((left+right) * 2.5, 0., 1.);
  return YachtWindowLight(direction, strength);
}

fn yachtAperture(p:vec3f, normal:vec3f, edge:f32, x:f32, width:f32) -> f32 {
  let ray = vec3f(edge-p.x, ${windowHeight.toFixed(8)}-p.y, x-p.z);
  let distance2 = dot(ray,ray)+.12;
  let direction = ray*inverseSqrt(distance2);
  let area = width*1.46;
  return max(dot(normal,direction),0.) * abs(direction.x) * area/(area+3.142*distance2);
}

fn yachtWindowFill(p:vec3f, normal:vec3f) -> f32 {
  // Coordinates use the glazing apertures of the main saloon and suite.
  // Each paired panel contributes diffuse sky in proportion to its solid angle.
  let x=(p.z+${centre})/${lengthScale.toFixed(10)};
  let z=p.y+2.01;
  if(z<3.93 || z>5.88){return 0.;}
  var aperture:vec3f;
  var roomWeight:f32;
  if(x>8.45 && x<17.9){
    aperture=mix(${vector(mainApertures[0])},${vector(mainApertures[1])},smoothstep(11.,12.1,x));
    aperture=mix(aperture,${vector(mainApertures[2])},smoothstep(14.5,15.6,x));
    roomWeight=smoothstep(8.45,9.20,x)*(1.-smoothstep(17.30,17.9,x));
  }else if(x>22.59 && x<27.16){
    aperture=mix(${vector(ownerApertures[0])},${vector(ownerApertures[1])},smoothstep(24.55,25.55,x));
    roomWeight=smoothstep(22.59,23.02,x)*(1.-smoothstep(26.72,27.16,x));
  }else{return 0.;}
  let beam=aperture.z*${beamScale.toFixed(10)};
  if(abs(p.x)>beam){return 0.;}
  let offset=aperture.x*${lengthScale.toFixed(10)}-${centre};
  let atl=clamp(p.z,offset-aperture.y*.28,offset+aperture.y*.28);
  return roomWeight*(yachtAperture(p,normal,-beam,atl,aperture.y)+
    yachtAperture(p,normal,beam,atl,aperture.y));
}

fn yachtPile(light:vec3f, view:vec3f) -> f32 {
  // The nap runs along the length of the yacht. Look and light both contribute
  // to the angle at which the fibres return light.
  return smoothstep(-.86,.86,view.z+light.z+.33*view.x*light.x);
}

fn yachtFibreEdge(normal:vec3f, view:vec3f, light:vec3f) -> f32 {
  let grazing = 1.-clamp(abs(dot(normal,view)),0.,1.);
  let lit = .28+.72*max(dot(normal,light),0.);
  return grazing*grazing*lit;
}

fn yachtWindowIrradiance(visibility:f32) -> vec3f {
  return ${vector(windowSky)}*visibility;
}
`;

export const mobileOutputWGSL = `
fn yachtDisplay(value:vec3f) -> vec3f {
  let v=clamp(value,vec3f(0.),vec3f(.83))+.54*clamp(value-.83,vec3f(0.),vec3f(.3148));
  let root=sqrt(v);
  let srgb=-.07690366+.83375405*root+.29810790*sqrt(root)-.05531760*v;
  return select(srgb,12.92*v,v<=vec3f(.0031308));
}
`;
