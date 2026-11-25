import radiance from './gangway-radiance-data.js?v=vr-rails-3';

const size = [64, 32, 3];

export function uploadGangwayRadiance(device) {
  // A 3D texture blends the adjacent probe stations in the same filtered read.
  const data = Uint8Array.from(atob(radiance), c => c.charCodeAt(0));
  const texture = device.createTexture({
    label: 'Boarding steel reflection probes',
    dimension: '3d',
    format: 'rgba8unorm-srgb',
    size,
    usage: GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.COPY_DST,
  });
  try {
    device.queue.writeTexture({ texture }, data, { bytesPerRow: size[0] * 4, rowsPerImage: size[1] }, size);
    return { texture, bytes: data.byteLength };
  } catch (error) {
    texture.destroy();
    throw error;
  }
}

export const gangwayRadianceWGSL = `
@group(0) @binding(6) var gangwayProbes:texture_3d<f32>;

fn polishedGangway(pos:vec3f, normal:vec3f, rough:f32, lit:f32)->vec3f {
 let eye=normalize(frame.eye.xyz-pos);
 let ray=reflect(-eye,normal);
 let longitude=atan2(ray.z,ray.x)*.159154943+.5;
 let latitude=clamp(.5-asin(clamp(ray.y,-1.,1.))*.318309886,.015625,.984375);
 let x=(pos.z+17.615)/.97861111;
 let station=(.5+2.*clamp((x+4.5)/7.2,0.,1.))/3.;
 let environment=textureSampleLevel(gangwayProbes,tileSampler,vec3f(longitude,latitude,station),0.).rgb;
 let width=rough*rough;
 let solar=width/(width+1.-max(0.,dot(ray,frame.sun.xyz)));
 let day=smoothstep(-.12,.16,frame.sun.y);
 let edge=1.-clamp(abs(dot(normal,eye)),0.,1.);
 let edge2=edge*edge;
 let reflectance=.71+.29*edge2*edge2*edge;
 return reflectance*(mix(.14,1.,day)*environment+
        vec3f(1.,.91,.79)*(.82*lit*day*solar*solar*max(0.,dot(normal,frame.sun.xyz))));
}
`;
