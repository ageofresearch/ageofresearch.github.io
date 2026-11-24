export const ownerContactBounds = [22.65, -2.52, 27.17, 2.54];
export const ownerContactSize = 256;

const [x0, y0, x1, y1] = ownerContactBounds;
export const ownerContactWGSL = `
fn suiteContactVisibility(p:vec2f, map:texture_2d<f32>, smp:sampler) -> f32 {
  let uv=(p-vec2f(${x0},${y0}))/vec2f(${(x1-x0).toFixed(3)},${(y1-y0).toFixed(3)});
  if(any(uv<=vec2f(0.)) || any(uv>=vec2f(1.))){return 1.;}
  return textureSampleLevel(map,smp,uv,0.).r;
}
`;
