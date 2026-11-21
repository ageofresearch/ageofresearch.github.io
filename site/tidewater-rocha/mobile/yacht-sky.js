// Rings near the pole resolve the sun and its halo. The renderer aims this
// dome at the sun and centres it on the eye. Its faces share the opaque draw.
export function yachtSky() {
  const vertices = [],
    indices = [],
    sectors = 20;
  const angles = [
    0,
    0.004,
    0.009,
    0.0155,
    0.023,
    0.11,
    0.24,
    0.4,
    0.59,
    0.8,
    1.02,
    1.24,
    1.46,
    1.68,
    1.9,
    2.15,
    2.4,
    2.68,
    2.93,
    Math.PI,
  ];
  for (let r = 0; r < angles.length; r++)
    for (let j = 0; j < sectors; j++) {
      const a = (j * 2 * Math.PI) / sectors,
        h = angles[r];
      const x = Math.cos(a) * Math.sin(h),
        y = Math.sin(a) * Math.sin(h),
        z = Math.cos(h);
      vertices.push(18 + 120 * x, 120 * y, 120 * z, -x, -y, -z);
      if (!r) continue;
      const prev = (r - 1) * sectors + j,
        next = (r - 1) * sectors + ((j + 1) % sectors);
      if (r > 1) indices.push(prev, next, prev + sectors);
      if (r < angles.length - 1) indices.push(next, next + sectors, prev + sectors);
    }
  return { vertices, indices, feature: 'Daylight sky', finish: [0xc8dbef, 1, 0, 47] };
}

// Linear daylight radiance for both cameras, including rays below horizontal.
export const skyRadiance = `
fn yachtDaySky(dir:vec3f,sun:vec3f,disc:bool)->vec3f{
 let t=smoothstep(-.15,.92,dir.y);let mu=dot(dir,sun);
 let q=max(mu,0.);let q2=q*q;let q4=q2*q2;let q8=q4*q4;
 let haze=vec3f(.18,.14,.085)*q8*q8;
 let solar=vec3f(1.,.89,.66)*smoothstep(.99989,.99998,mu);
 return mix(vec3f(.67,.76,.84),vec3f(.19,.41,.72),t)+haze+select(vec3f(0.),solar,disc);
}`;
