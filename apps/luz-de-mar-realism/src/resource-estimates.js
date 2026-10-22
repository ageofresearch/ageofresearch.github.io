import{HalfFloatType,FloatType}from'three';
// WebGL exposes resource counts, not driver byte allocations. Count resident
// vertex/index data and texture payloads; canvas/MSAA/program caches are excluded.
export function estimateGpuMemory(scene,rooms,sun){
 const attributes=new Set(),textures=new Set();scene.traverse(o=>{if(o.geometry){for(const a of Object.values(o.geometry.attributes))attributes.add(a.isInterleavedBufferAttribute?a.data:a);if(o.geometry.index)attributes.add(o.geometry.index);}if(o.material)for(const m of Array.isArray(o.material)?o.material:[o.material]){for(const v of Object.values(m))if(v?.isTexture)textures.add(v);for(const u of Object.values(m.uniforms||{}))if(u.value?.isTexture)textures.add(u.value);}});if(scene.environment)textures.add(scene.environment);for(const room of rooms)for(const env of room.environments||[])textures.add(env.texture);if(sun.shadow.map)textures.add(sun.shadow.map.texture);
 let geometryBytes=0,textureBytes=0;for(const a of attributes)geometryBytes+=a.array?.byteLength||0;
 for(const t of textures){if(t.mipmaps?.length&&t.mipmaps[0].data){textureBytes+=t.mipmaps.reduce((n,m)=>n+(m.data?.byteLength||0),0);continue;}const im=t.image;if(!im)continue;const base=im.data?.byteLength||(im.width||0)*(im.height||0)*4*(t.type===HalfFloatType?2:t.type===FloatType?4:1);textureBytes+=Math.ceil(base*(t.generateMipmaps?4/3:1));}
 const shadowDepthBytes=sun.shadow.map?.depthBuffer?sun.shadow.map.width*sun.shadow.map.height*4:0;return{geometryBytes,textureBytes,shadowDepthBytes,totalBytes:geometryBytes+textureBytes+shadowDepthBytes,method:'Resident buffer and texture payload estimate; excludes canvas/MSAA, programs and driver caches.'};
}
