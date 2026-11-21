import {coversView, widenedView, viewRadius} from './view-volume.js?v=1';

export function createViewIndices(device, vertices, profiles, glazing, maxBytes, maxGlassBytes) {
  let worker;
  try {worker = new Worker(new URL('./view-worker.js?v=1', import.meta.url), {type:'module'});}
  catch {return null;} // A browser can disable workers while still supporting WebGPU.
  const glassOffset=Math.ceil(maxBytes/4)*4;
  let buffer, active, pending, stopped = false, finishStart;
  const ready = new Promise(resolve => {finishStart = resolve;});
  function dispose() {
    stopped = true;
    worker.terminate();
    buffer?.destroy();
    active = pending = null;
    finishStart();
  }
  try {
    buffer = device.createBuffer({label:'Yacht visible opaque indices', size:glassOffset+maxGlassBytes,
      usage:GPUBufferUsage.INDEX | GPUBufferUsage.COPY_DST});
    worker.onerror = worker.onmessageerror = dispose;
    worker.onmessage = ({data}) => {
      if (stopped) return;
      if (!data) {finishStart(); return;}
      // A stale result may arrive after a turn. Revalidate before upload.
      if (pending) pending.result = data;
    };
    worker.postMessage({vertices, profiles, glazing}, [vertices.buffer, ...Object.values(profiles).map(v=>v.buffer),
      ...Object.values(glazing).flatMap(g=>[g.vertices.buffer,g.indices.buffer])]);
  } catch (error) {dispose(); throw error;}
  return {
    buffer, glassOffset, ready, dispose,
    select(profile, first, count, clip, camera, projection) {
      if (stopped) return null;
      const valid = entry => entry && entry.profile === profile && entry.first === first && entry.count === count
        && (entry.eye[0]-camera[12])**2+(entry.eye[1]-camera[13])**2+(entry.eye[2]-camera[14])**2 <= viewRadius**2
        && coversView(entry.planes, camera, projection);
      if (pending?.result) {
        if (valid(pending)) {
          const {length, output, glass} = pending.result;
          active = {...pending, result:null, length, glassLength:glass.length};
          if (length && length < count)
            device.queue.writeBuffer(buffer, 0, output, 0, length + (output.BYTES_PER_ELEMENT === 2 ? length % 2 : 0));
          if(glass.trimmed && glass.length)
            device.queue.writeBuffer(buffer, glassOffset, glass.output, 0, glass.length + (glass.output.BYTES_PER_ELEMENT===2 ? glass.length%2 : 0));
        }
        pending = null;
      }
      if (valid(active)) return active;
      if (!pending) {
        pending = {profile, first, count, planes:widenedView(clip),eye:[camera[12],camera[13],camera[14]]};
        worker.postMessage(pending);
      }
      return null;
    },
  };
}
