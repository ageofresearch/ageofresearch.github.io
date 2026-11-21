import {coversView, widenedView} from './view-volume.js?v=1';

export function createViewIndices(device, vertices, profiles, maxBytes) {
  const worker = new Worker(new URL('./view-worker.js?v=1', import.meta.url), {type:'module'});
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
    buffer = device.createBuffer({label:'Yacht visible opaque indices', size:Math.ceil(maxBytes/4)*4,
      usage:GPUBufferUsage.INDEX | GPUBufferUsage.COPY_DST});
    worker.onerror = dispose;
    worker.onmessage = ({data}) => {
      if (stopped) return;
      if (!data) {finishStart(); return;}
      // A stale result may arrive after a turn. Revalidate before upload.
      if (pending) pending.result = data;
    };
    worker.postMessage({vertices, profiles}, [vertices.buffer, ...Object.values(profiles).map(v=>v.buffer)]);
  } catch (error) {dispose(); throw error;}
  return {
    buffer, ready, dispose,
    select(profile, first, count, clip, camera, projection) {
      if (stopped) return null;
      const valid = entry => entry && entry.profile === profile && entry.first === first && entry.count === count
        && coversView(entry.planes, camera, projection);
      if (pending?.result) {
        if (valid(pending)) {
          const {length, output} = pending.result;
          active = {...pending, result:null, length};
          if (length && length < count)
            device.queue.writeBuffer(buffer, 0, output, 0, length + (output.BYTES_PER_ELEMENT === 2 ? length % 2 : 0));
        }
        pending = null;
      }
      if (valid(active)) return active.length < count ? active : null;
      if (!pending) {
        pending = {profile, first, count, planes:widenedView(clip)};
        worker.postMessage(pending);
      }
      return null;
    },
  };
}
