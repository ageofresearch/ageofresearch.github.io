// Model fit approved for this release, not surveyed vessel dimensions.
export const gangwayTeak = Object.freeze({
  version: 'chair-fidelity-1',
  color: 0xb69a73,
  caulk: 0x20201c,
  roughness: 0.8,
  centerY: 3.1,
  width: 0.764,
  boards: 7,
  joint: 0.004,
  breaks: Object.freeze([-4.5, -2.89, -1.17, 2.3]),
  inset: 0.022,
  woodWidth: (0.764 - 6 * 0.004) / 7,
  landingPitch: 0.105,
  firstPanel: 37,
  longBorder: 40,
  endBorder: 41,
  landing: 42,
});

const rgb = (n) => [16, 8, 0].map((shift) => ((n >> shift) & 255) / 255);
const linear = (x) => (x <= 0.04045 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4);

export function resolvePartFinish(part, palette) {
  const finish = part.finish ?? palette?.[part.materialID];
  if (!Array.isArray(finish) || finish.length !== 4 || !finish.every(Number.isFinite))
    throw Error('Unknown yacht finish: ' + (part.id || part.materialID || 'unidentified part'));
  return finish;
}

export function prepareBoardingFinish(part, palette) {
  let finish = resolvePartFinish(part, palette);
  if (part.id?.startsWith('boarding/owner/')) {
    const name = part.feature || part.name || '';
    const panel = /^telescopic section ([1-3]) teak inset$/.exec(name);
    const border = /^section [1-3] (timber border|mitred end border) /.exec(name);
    const landing =
      /^(shaped lower boarding landing|widened upper teak boarding landing|raised teak cockpit threshold|rounded teak landing lip)$/.test(
        name,
      );
    const code = panel
      ? 36 + Number(panel[1])
      : border
        ? border[1] === 'timber border'
          ? 40
          : 41
        : landing
          ? 42
          : null;
    if (code !== null) finish = [landing ? 0x988b80 : gangwayTeak.color, gangwayTeak.roughness, 0, code];
  }
  const prepared = { ...part, finish };
  prepared.boardingUV = boardingTextureUV(prepared);
  return prepared;
}

// Periodic fine fibres; tabled once for mobile, evaluated by the full PBR shader.
export function gangwayGrain(u, v) {
  const t = 2 * Math.PI;
  return (
    0.5 +
    0.27 * Math.sin(t * (v * 5 + 0.15 * Math.sin(t * u) + 0.04 * Math.sin(t * u * 5))) +
    0.12 * Math.sin(t * (v * 17 + 0.13 * Math.sin(t * u * 2 + 0.5))) +
    0.06 * Math.sin(t * (v * 43 + 0.2 * Math.sin(t * u * 3 + 1.3)))
  );
}

export function gangwaySample(x, y, code) {
  const panel = code >= 37 && code <= 39,
    index = code - 37;
  const across = code === 41 ? x : code === 42 ? y : y - (gangwayTeak.centerY - gangwayTeak.width / 2);
  const along = code === 41 ? y : x - (panel ? gangwayTeak.breaks[index] + gangwayTeak.inset : 0);
  const pitch = panel ? gangwayTeak.woodWidth + gangwayTeak.joint : gangwayTeak.landingPitch;
  const board = panel ? Math.max(0, Math.min(6, Math.floor(across / pitch))) : Math.floor(across / pitch);
  const k = panel
    ? Math.max(1, Math.min(6, Math.floor(across / pitch + 0.5)))
    : Math.floor(across / pitch + 0.5);
  const distance = Math.abs(across - (k * pitch - (panel ? gangwayTeak.joint / 2 : 0)));
  return {
    across,
    along,
    pitch,
    board,
    distance,
    joint: code !== 40 && code !== 41 && distance < gangwayTeak.joint / 2,
    u: along / 1.7 + board * 0.173 + code * 0.113,
    v: across / pitch + code * 0.217,
  };
}

// One additional RG16-encoded multiplier layer. All joint/colour work is
// prepared here, leaving the production mobile fragment shader unchanged.
const luminance = (rgb) => rgb[0] * 0.2126 + rgb[1] * 0.7152 + rgb[2] * 0.0722;
export const gangwayCaulkFactor =
  luminance(rgb(gangwayTeak.caulk).map(linear)) / luminance(rgb(gangwayTeak.color).map(linear));
export function gangwayAtlasTexel(u, v, size = 256) {
  let tone = 0,
    seam = 0;
  for (let sample = 0; sample < 8; sample++) {
    const vv = v + (sample / 8 - 7 / 16) / size;
    let grainU, across, point;
    if (u < 0.75) {
      across = vv * gangwayTeak.width;
      point = gangwaySample(0, 2.718 + across, 37);
      grainU = u / 0.75 + point.board * 0.173;
    } else if (u < 0.875) {
      across = 2.48 + vv * 1.076;
      point = gangwaySample(2.28 + ((u - 0.75) / 0.125) * 1.52, across, 42);
      grainU = (2.28 + ((u - 0.75) / 0.125) * 1.52) / 1.7 + point.board * 0.173;
    } else {
      across = ((u - 0.875) / 0.125) * gangwayTeak.woodWidth;
      point = { board: 0, pitch: gangwayTeak.woodWidth, joint: false };
      grainU = vv;
    }
    const variation = 1 + ((((point.board + 1) * 0.61803398875 + 0.173) % 1) - 0.5) * 0.1;
    const grain = gangwayGrain(grainU, across / point.pitch + 0.217);
    const wood = variation * (1 + (grain - 0.5) * 0.16);
    tone += (point.joint ? gangwayCaulkFactor : wood) / 8;
    seam += (point.joint ? 1 : 0) / 8;
  }
  return [tone, seam];
}

// Geometry and index buffers are unchanged. These constant-matte surfaces use
// the two otherwise fixed roughness/metalness slots for UVs (codes 37..42).
export function boardingTextureUV(part) {
  const code = part.finish[3];
  if (code < 37 || code > 42) return null;
  const b = part.bounds,
    uv = [];
  for (let i = 0; i < part.vertices.length; i += 6) {
    const x = part.vertices[i],
      y = part.vertices[i + 1];
    if (code < 40) {
      let u = (x - b[0]) / (b[3] - b[0]);
      if (code === 38) u = 1 - u;
      uv.push(u * 0.75, (y - b[1]) / (b[4] - b[1]));
    } else if (code === 42) uv.push(0.75 + ((x - 2.28) / 1.52) * 0.125, (y - 2.48) / 1.076);
    else if (code === 40) uv.push(0.875 + ((y - b[1]) / (b[4] - b[1])) * 0.125, (x - b[0]) / (b[3] - b[0]));
    else uv.push(0.875 + ((x - b[0]) / (b[3] - b[0])) * 0.125, (y - b[1]) / (b[4] - b[1]));
  }
  return uv;
}

export const gangwayFullSurfaceWGSL = `
if(code==56.0){
 let grain=sin(in.P.z*31.+.78*sin(in.P.x*3.2));
 s.albedo*=1.+.045*grain;s.roughness=.19;s.clearcoat=.72;
}
if(code==57.0){
 let p=in.P.xz+vec2f(in.P.y*.62,in.P.y*.48);
 let vein=abs(sin(dot(p,vec2f(1.64,2.83))+.38*sin(p.x*4.+p.y*2.8)+.13*sin(p.y*16.)));
 s.albedo*=.98-.15*(1.-smoothstep(.015,.12+fwidth(vein),vein));
 s.roughness=.28;s.clearcoat=.22;
}
if(code==59.0){
 let q=in.vs.vLocal.xz;
 let m=sin(q.x*17.1+3.2*sin(q.y*10.8))*sin(q.y*14.7-q.x*4.6);
 let phase=q.x*104.3+q.y*46.7+4.3*m;
 let nap=sin(phase)*(1.-smoothstep(.4,2.6,fwidth(phase)));
 s.albedo*=.80+.18*m+.08*nap;
 s.roughness=.84;
}
if(code==60.0){
 let yarn=sin(in.P.x*118.+in.P.y*41.)*sin(in.P.z*152.+in.P.y*57.);
 s.albedo*=.972+.025*yarn;
}
if(code==61.0){
 let u=(in.P.z*.76+in.P.x*.65)*2430.;
 let v=(in.P.y*.88+in.P.x*.52-in.P.z*.45)*2360.;
 let weave=sin(u)*sin(v+.3*sin(u));
 let threadFade=1.-smoothstep(.55,3.14,max(fwidth(u),fwidth(v)));
 s.albedo=(s.albedo+vec3f(.030,.029,.040))*(1.+.26*weave*threadFade);
}
if(code==43.0){
 let fiber=in.P.xz;
 let warp=sin(fiber.x*2.7+sin(fiber.y*3.9))*sin(fiber.y*3.3+fiber.x);
 let nap=sin(fiber.x*23.0+warp*4.0)*sin(fiber.y*18.0+warp*7.0);
 s.albedo*=.82+.46*warp+.21*nap;
 s.roughness=.96;
}

if(code>=37.0 && code<=42.0){
 let gwUV=in.vs.vBoardingUV;
 var gwAcross=0.0;var gwPitch=${gangwayTeak.woodWidth.toFixed(12)};var gwBoard=0.0;var gwU=gwUV.y;var gwSeam=0.0;
 if(code<40.0){
  gwAcross=gwUV.y*.764;gwPitch=${(gangwayTeak.woodWidth + gangwayTeak.joint).toFixed(12)};
  gwBoard=clamp(floor(gwAcross/gwPitch),0.0,6.0);gwU=gwUV.x/.75+gwBoard*.173;
  let k=clamp(floor(gwAcross/gwPitch+.5),1.0,6.0);let aa=max(fwidth(gwAcross),.00005);
  gwSeam=1.0-smoothstep(.002-aa,.002+aa,abs(gwAcross-(k*gwPitch-.002)));
 }else if(code==42.0){
  gwAcross=2.48+gwUV.y*1.076;gwPitch=.105;gwBoard=floor(gwAcross/gwPitch);
  gwU=(2.28+(gwUV.x-.75)/.125*1.52)/1.7+gwBoard*.173;
  let k=floor(gwAcross/gwPitch+.5);let aa=max(fwidth(gwAcross),.00005);
  gwSeam=1.0-smoothstep(.002-aa,.002+aa,abs(gwAcross-k*gwPitch));
 }else{gwAcross=(gwUV.x-.875)/.125*${gangwayTeak.woodWidth.toFixed(12)};}
 let gwV=gwAcross/gwPitch+.217;let gwTau=6.28318530718;
 let gwFootprint=max(fwidth(gwU),fwidth(gwV));
 let gwCoarse=.27*sin(gwTau*(gwV*5.0+.15*sin(gwTau*gwU)+.04*sin(gwTau*gwU*5.0)))*(1.0-smoothstep(.25,.75,gwFootprint*5.0));
 let gwFine=.12*sin(gwTau*(gwV*17.0+.13*sin(gwTau*gwU*2.0+.5)))*(1.0-smoothstep(.25,.75,gwFootprint*17.0));
 let gwMicro=.06*sin(gwTau*(gwV*43.0+.20*sin(gwTau*gwU*3.0+1.3)))*(1.0-smoothstep(.25,.75,gwFootprint*43.0));
 let gwGrain=.5+gwCoarse+gwFine+gwMicro;
 let gwVariation=1.0+(fract((gwBoard+1.0)*.61803398875+.173)-.5)*.10;
 let gwFactor=gwVariation*(1.0+(gwGrain-.5)*.16);
 s.albedo*=mix(gwFactor,${gangwayCaulkFactor.toFixed(12)},gwSeam);
 s.roughness=.8;s.metalness=0.0;s.clearcoat=0.0;
 s.normal=boatBumpNormal(in.P,in.N,(gwGrain-.5)*.00006);
}
`;

// Yacht-local coordinates (starboard, up, forward). The environment sampled
// by the steel has a water horizon, the teak deck and the pale transom.
export const gangwaySteelWGSL = `
fn isGangwaySteel(pos:vec3f, rough:f32, metal:f32)->bool {
 return rough<.145 && metal>.99 && pos.z>=-22.03 && pos.z< -14.72 && pos.y>1.90 &&
        abs(abs(pos.x/.98289474-3.1)-.44)<.05;
}
fn gangwaySteel(pos:vec3f, normal:vec3f, eye:vec3f, sun:vec3f, rough:f32, lit:f32)->vec3f {
 let ray=reflect(-eye,normal);
 let x=(pos.z+17.615)/.97861111;
 let deck=2.26-.32*clamp((x+4.5)/6.8,0.,1.);
 let descent=ray.y+ray.z*(.32/(6.8*.97861111));
 let floorHit=pos+ray*max(0.,pos.y-deck)/max(.001,-descent);
 let across=1.-smoothstep(.36,.42,abs(floorHit.x/.98289474-3.1));
 let along=smoothstep(-22.06,-21.89,floorHit.z)*(1.-smoothstep(-15.40,-15.27,floorHit.z));
 let teak=across*along*smoothstep(.04,.20,-descent);
 let hullHit=pos+ray*max(0.,-14.65-pos.z)/max(.001,ray.z);
 let hull=smoothstep(.07,.20,ray.z)*smoothstep(1.43,1.90,hullHit.y)*
          (1.-smoothstep(4.88,5.18,hullHit.y))*(1.-smoothstep(3.45,3.74,abs(hullHit.x)));
 let water=mix(vec3f(.023,.037,.043),vec3f(.074,.12,.154),smoothstep(-.66,-.035,ray.y));
 let sky=yachtDaySky(ray,sun,false);
 let horizon=smoothstep(-rough*.34,rough*.65,ray.y);
 let env=mix(mix(mix(water,vec3f(.42,.28,.16),teak),sky,horizon),vec3f(.73,.73,.70),hull);
 let grazing=1.-clamp(abs(dot(normal,eye)),0.,1.);
 let reflectance=mix(vec3f(.64,.67,.71),vec3f(1.),pow(grazing,5.));
 let width=rough*rough;
 let glint=width/(width+1.-clamp(dot(ray,sun),0.,1.));
 let day=smoothstep(-.12,.16,sun.y);
 return reflectance*(env*mix(.14,.91,day)+
        vec3f(1.,.90,.74)*(lit*day*1.25*glint*glint*max(0.,dot(normal,sun))));
}`;
