import radiance from './gangway-radiance-data.js?v=vr-rails-4';

const size = [56, 56, 3];

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

fn gangwayProbe(ray:vec3f, x:f32)->vec3f {
 let projected=ray.xz/dot(abs(ray),vec3f(1.));
 let side=select(vec2f(-1.),vec2f(1.),projected>=vec2f(0.));
 let unfolded=(1.-abs(projected.yx))*side;
 let uv=clamp(select(unfolded,projected,ray.y>=0.)*.5+.5,vec2f(.5/56.),vec2f(55.5/56.));
 let station=(.5+2.*clamp((x+4.5)/7.2,0.,1.))/3.;
 return textureSampleLevel(gangwayProbes,tileSampler,vec3f(uv,station),0.).rgb;
}

fn sleeveChrome(pos:vec3f, normal:vec3f, guide:bool)->vec3f {
 let x=(pos.z+17.615)/.97861111;
 // Keep the reflection continuous across the shallow folds of the distal
 // cheek. Its beveled silhouette and the normals of the guides stay sharp.
 var finishNormal=normal;
 if(!guide && x< -2.88 && normal.y<-.30 && abs(normal.x)>.25){
   finishNormal=normalize(vec3f(normal.x,-.022,normal.z*.16));
 }
 let ray=reflect(normalize(pos-frame.eye.xyz),finishNormal);
 let environment=gangwayProbe(ray,x);
 let sky=smoothstep(-.18,.21,ray.y);
 let skyBand=mix(vec3f(.132,.228,.505),vec3f(.295,.414,.602),smoothstep(-.52,.52,ray.z));
 let cool=mix(vec3f(.029,.052,.094),skyBand,sky);
 let cheek=mix(cool,environment,.22+.67*smoothstep(-1.18,-.94,x));
 let lowerGuide=mix(vec3f(.017,.021,.029),environment,.48)*mix(.79,1.,sky);
 let day=smoothstep(-.12,.17,frame.sun.y);
 return select(cheek,lowerGuide,guide)*mix(.14,1.,day);
}

fn polishedGangway(pos:vec3f, normal:vec3f, rough:f32, lit:f32)->vec3f {
 let eye=normalize(frame.eye.xyz-pos);
 let ray=reflect(-eye,normal);
 let x=(pos.z+17.615)/.97861111;
 let environment=gangwayProbe(ray,x);
 let width=rough*rough;
 let solar=width/(width+1.-max(0.,dot(ray,frame.sun.xyz)));
 let day=smoothstep(-.12,.16,frame.sun.y);
 let edge=1.-clamp(abs(dot(normal,eye)),0.,1.);
 let edge2=edge*edge;
 let reflectance=.71+.29*edge2*edge2*edge;
 // The curved contour reflects the bright sky at a grazing angle, seen
 // as a narrow highlight beside the darker body of the polished tube.
 let rim=vec3f(.55,.72,.92)*(edge2*edge)*smoothstep(-.03,.28,ray.y);
 return reflectance*(mix(.14,1.,day)*(environment+rim)+
        vec3f(1.,.91,.79)*(.82*lit*day*solar*solar*max(0.,dot(normal,frame.sun.xyz))));
}
`;
