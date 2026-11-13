import * as T from './renderer.js';

export async function loadExterior() {
  const response = await fetch(new URL('./gangway.bin.gz', import.meta.url));
  if (!response.ok) throw Error('No se pudo cargar la geometría.');
  const compressed = new Uint8Array(await response.arrayBuffer());
  // Some hosts transparently decode .gz files via Content-Encoding.
  const buffer = compressed[0] === 31 && compressed[1] === 139
    ? await new Response(new Blob([compressed]).stream().pipeThrough(new DecompressionStream('gzip'))).arrayBuffer()
    : compressed.buffer;
  const view = new DataView(buffer);
  const headerSize = view.getUint32(0, true);
  const meta = JSON.parse(new TextDecoder().decode(new Uint8Array(buffer, 4, headerSize)));
  if (meta.version !== 1) throw Error('Versión de geometría incompatible.');
  const groups = [];
  for (const group of meta.groups) {
    const start = 4 + headerSize + group.offset;
    const position = new Float32Array(group.vertices*3);
    const normal = new Float32Array(position.length);
    const color = new Float32Array(position.length);
    const uv = new Float32Array(group.vertices*2);
    for (let i = 0; i < group.vertices; i++) {
      const o = start + i*16;
      const ambient = view.getUint8(o+12)/255;
      for (let axis = 0; axis < 3; axis++) {
        const k = 3*i+axis;
        position[k] = view.getInt16(o+2*axis,true) / 500;
        normal[k] = view.getInt8(o+6+axis) / 127;
        color[k] = view.getUint8(o+9+axis) / 255 * ambient;
      }
      const k = 3*i;
      uv[2*i] = (Math.abs(normal[k+1]) > .45 ? position[k] : position[k]+position[k+1]) / .40;
      uv[2*i+1] = position[k+2] / 2.3;
    }
    const indices = new Uint16Array(group.indices);
    const at = start + 16*group.vertices;
    for (let i = 0; i < indices.length; i++) indices[i] = view.getUint16(at+i*2, true);
    const geometry = new T.BufferGeometry();
    geometry.setIndex(new T.BufferAttribute(indices, 1));
    for (const [name, data, size] of [['position',position,3], ['normal',normal,3], ['color',color,3], ['uv',uv,2]]) {
      geometry.setAttribute(name, new T.BufferAttribute(data, size));
    }
    groups.push({name: group.name, geometry});
  }
  return {groups, nav: meta.navigation};
}

function makeWater(coast, clock, sun) {
  const p = T.positionWorld;
  const swell = T.sin(p.z.mul(.47).add(p.x.mul(.31)).add(clock.mul(.23)));
  const cross = T.sin(p.x.mul(.72).sub(p.z.mul(.18)).sub(clock.mul(.32)));
  const wave = (x,z,speed) => p.x.mul(x).add(p.z.mul(z)).add(clock.mul(speed)).add(swell.mul(1.8)).add(cross.mul(1.3));
  const ripple = T.normalize(T.vec3(T.sin(wave(1.8,2.3,1.1)).mul(.042).add(T.cos(wave(3.7,-4.1,.8)).mul(.025)),
    1, T.cos(wave(.9,2.6,.7)).mul(.052).add(T.sin(wave(5.1,-2.3,1.2)).mul(.02))));
  const eye = T.normalize(T.cameraPosition.sub(p));
  const ray = T.reflect(eye.negate(),ripple);
  const edge = T.pow(T.float(1).sub(T.max(T.dot(eye,ripple),0)),4);
  const reflection = T.texture(coast, T.equirectUV(ray)).rgb;
  const specular = T.pow(T.max(T.dot(ray,T.vec3(sun.x,sun.y,sun.z)),0),128).mul(.48);
  const deep = T.vec3(.027,.105,.116);
  const near = T.mix(deep, reflection, edge.mul(.48).add(.18)).add(T.vec3(.9,.77,.52).mul(specular));
  const distant = T.smoothstep(12,70, p.xz.sub(T.cameraPosition.xz).length());
  const material = new T.MeshBasicNodeMaterial();
  material.colorNode = T.mix(near,T.texture(coast,T.equirectUV(eye.negate())).rgb,distant);
  const mesh = new T.Mesh(new T.PlaneGeometry(400,400), material);
  mesh.rotation.x = -Math.PI/2;
  mesh.position.y = -.01;
  return mesh;
}

export async function createScene(exterior) {
  const scene = new T.Scene();
  const loader = new T.TextureLoader();
  const [coast, wood] = await Promise.all(['coast.jpg','teak.jpg'].map(file => loader.loadAsync(new URL(file,import.meta.url).href)));
  coast.colorSpace = wood.colorSpace = T.SRGBColorSpace;
  const environment = coast.clone();
  environment.mapping = T.EquirectangularReflectionMapping;
  environment.needsUpdate = true;
  wood.wrapS = wood.wrapT = T.RepeatWrapping;
  wood.anisotropy = 4;
  const skyMaterial = new T.MeshBasicNodeMaterial({side:T.BackSide,depthWrite:false,toneMapped:false});
  const skyDirection = T.normalize(T.positionWorld.sub(T.cameraPosition));
  skyMaterial.colorNode = T.texture(coast,T.equirectUV(skyDirection)).rgb;
  const sky = new T.Mesh(new T.SphereGeometry(230,32,16),skyMaterial);
  sky.renderOrder = -10;
  scene.add(sky);
  scene.environment = environment;
  scene.environmentIntensity = .72;
  const settings = {
    paint: {roughness:.37, metalness:.04}, teak:{roughness:.73, map:wood},
    steel:{roughness:.18,metalness:1}, fabric:{roughness:.93},
    glass:{color:0x38545d, roughness:.13,metalness:.45}
  };
  for (const {name,geometry} of exterior.groups) {
    const material = new T.MeshStandardMaterial({side:T.DoubleSide, vertexColors:true,...settings[name]});
    const mesh = new T.Mesh(geometry,material);
    mesh.name = name;
    mesh.castShadow = name !== 'glass';
    mesh.receiveShadow = true;
    scene.add(mesh);
  }
  const sunlight = new T.DirectionalLight(0xfff2dd,2.45);
  sunlight.target.position.set(2,1,-17);
  sunlight.position.copy(sunlight.target.position).add(new T.Vector3(9,12,-7));
  sunlight.castShadow = true;
  sunlight.shadow.mapSize.set(1024,1024);
  Object.assign(sunlight.shadow.camera, {left:-14,right:14,top:15,bottom:-15,near:.1,far:48});
  sunlight.shadow.camera.updateProjectionMatrix();
  sunlight.shadow.bias = -.00016;
  sunlight.shadow.normalBias = .016;
  const fill = new T.DirectionalLight(0xc3d9f0,.82);
  fill.position.set(-5,8,3);
  scene.add(fill,sunlight,sunlight.target,new T.HemisphereLight(0xd8edff,0xabb9bc,1.0));
  const clock = T.uniform(0);
  scene.add(makeWater(coast,clock,sunlight.position.clone().sub(sunlight.target.position).normalize()));
  return {scene, clock};
}
