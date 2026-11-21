// An inward-facing cube in yacht coordinates. Shade from the eye ray so that
// neither its seams nor its position are visible while walking.
export function yachtSky() {
  const vertices=[],indices=[];
  for(const x of [-1,1])for(const y of [-1,1])for(const z of [-1,1])
    vertices.push(18+x*145,y*145,z*145,-x/Math.sqrt(3),-y/Math.sqrt(3),-z/Math.sqrt(3));
  for(const [a,b,c,d] of [[0,2,3,1],[4,5,7,6],[0,1,5,4],[2,6,7,3],[0,4,6,2],[1,3,7,5]])
    indices.push(a,b,c,a,c,d);
  return {vertices,indices,feature:'Daylight sky',finish:[0xc8dbef,1,0,47]};
}

// Linear daylight radiance for both cameras, including rays below horizontal.
export const skyRadiance=`
fn yachtDaySky(dir:vec3f,sun:vec3f,disc:bool)->vec3f{
 let t=smoothstep(-.15,.92,dir.y);let mu=dot(dir,sun);
 let haze=vec3f(.18,.14,.085)*pow(max(mu,0.),16.);
 let solar=vec3f(1.,.89,.66)*smoothstep(.99989,.99998,mu);
 return mix(vec3f(.67,.76,.84),vec3f(.19,.41,.72),t)+haze+select(vec3f(0.),solar,disc);
}`;
