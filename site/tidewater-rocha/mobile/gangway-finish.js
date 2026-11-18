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
  breaks: Object.freeze([-4.5, -1.94, 0.36, 2.3]),
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
    if (code !== null) finish = [gangwayTeak.color, gangwayTeak.roughness, 0, code];
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
