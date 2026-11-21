import {filterRoomCell, roomCellOffset} from './room-visibility.js?v=5';
import {coversView, widenedView, viewRadius} from './view-volume.js?v=2';

export function createViewIndices(device, vertices, profiles, glazing, maxBytes, maxGlassBytes, cells = null) {
  let worker;
  try {worker = new Worker(new URL('./view-worker.js?v=2', import.meta.url), {type:'module'});}
  catch {return null;} // A browser can disable workers while still supporting WebGPU.
  const glassOffset=Math.ceil(maxBytes/4)*4;
  let buffer, exactBuffer,exact=null,serial=0, active, pending, stopped = false, finishStart;
  const waiting=new Set();
  function wake(){
    if(!stopped && (pending&&!pending.result || exact?.analyzing))return;
    for(const resolve of waiting)resolve();
    waiting.clear();
  }
  function matches(profile,clip,width,height){
    if(!exact || exact.profile!==profile || exact.width!==width || exact.height!==height)return false;
    for(let i=0;i<16;i++)if(exact.clip[i]!==clip[i])return false;
    return true;
  }
  const scratch = new ArrayBuffer(glassOffset);
  const compact16 = new Uint16Array(scratch), compact32 = new Uint32Array(scratch);
  function uploadOpaque(entry, camera, projection, width, height, sunRevision) {
    const region = cells?.range(entry.profile, entry.first, entry.count, camera);
    const offset = roomCellOffset(region, camera, projection, width, height);
    // Sun changes invalidate only the sky exclusions. The camera and room can
    // immediately reuse the full sky from the same prepared index list.
    const trimSky = entry.skyRuns?.length > 0 && entry.sunRevision === sunRevision &&
      Math.min(width*projection[0], height*projection[5]) >= 100;
    if (entry.offset === offset && entry.trimSky === trimSky) return;
    let indices = entry.output, length = entry.rawLength;
    if (offset >= 0 || trimSky) {
      const compact = indices.BYTES_PER_ELEMENT === 2 ? compact16 : compact32;
      length = filterRoomCell(cells?.bits, offset, region?.count, indices, length, entry.slots, compact, trimSky && entry.skyRuns);
      indices = compact;
    }
    if (length && length < entry.count)
      device.queue.writeBuffer(buffer, 0, indices, 0, length + (indices.BYTES_PER_ELEMENT === 2 ? length % 2 : 0));
    entry.trimSky = trimSky;
    entry.offset = offset;
    entry.length = length;
  }
  const ready = new Promise(resolve => {finishStart = resolve;});
  function dispose() {
    stopped = true;
    worker.terminate();
    buffer?.destroy();exactBuffer?.destroy();
    active = pending = exact = null;wake();
    finishStart();
  }
  try {
    buffer = device.createBuffer({label:'Yacht visible opaque indices', size:glassOffset+maxGlassBytes,
      usage:GPUBufferUsage.INDEX | GPUBufferUsage.COPY_DST});
    exactBuffer=device.createBuffer({label:'Fixed camera opaque indices',size:glassOffset,usage:GPUBufferUsage.INDEX|GPUBufferUsage.COPY_DST});
    worker.onerror = worker.onmessageerror = dispose;
    worker.onmessage = ({data}) => {
      if (stopped) return;
      if (!data) {finishStart(); return;}
      if(data.key!==undefined){
        if(exact?.key===data.key){exact.analyzing=false;exact.result=data;}wake();
        return;
      }
      // A stale result may arrive after a turn. Revalidate before upload.
      if (pending) pending.result = data;wake();
    };
    worker.postMessage({vertices, profiles, glazing}, [vertices.buffer, ...Object.values(profiles).map(v=>v.buffer),
      ...Object.values(glazing).flatMap(g=>[g.vertices.buffer,g.indices.buffer])]);
  } catch (error) {dispose(); throw error;}
  return {
    buffer, exactBuffer,glassOffset, ready, dispose,
    matches,
    idle(){
      if(stopped || ((!pending||pending.result)&&!exact?.analyzing))return Promise.resolve();
      return new Promise(resolve=>waiting.add(resolve));
    },
    analyze(pixels,width,height,stride,profile,first,count,clip){
      if(stopped)return;
      exact={key:++serial,analyzing:true,profile,first,count,width,height,clip:Float32Array.from(clip)};
      worker.postMessage({...exact,pixels,stride},[pixels.buffer]);
    },
    fixed(profile,first,count,clip,width,height){
      if(!matches(profile,clip,width,height)||exact.first!==first||exact.count!==count)return null;
      if(exact.result){
        const {output,length}=exact.result;
        if(length)device.queue.writeBuffer(exactBuffer,0,output,0,length+(output.BYTES_PER_ELEMENT===2?length%2:0));
        exact.length=length;exact.result=null;
      }
      return exact.length??null;
    },
    select(profile, first, count, clip, camera, projection, width, height, sunRevision, frame) {
      if (stopped) return null;
      const valid = entry => entry && entry.profile === profile && entry.first === first && entry.count === count
        && (entry.eye[0]-camera[12])**2+(entry.eye[1]-camera[13])**2+(entry.eye[2]-camera[14])**2 <= viewRadius**2
        && coversView(entry.planes, camera, projection);
      if (pending?.result) {
        if (valid(pending)) {
          const {length, output, glass, slots, skyRuns} = pending.result;
          active = {...pending, result:null, rawLength:length, output, slots, skyRuns, glassLength:glass.length};
          if(glass.trimmed && glass.length)
            device.queue.writeBuffer(buffer, glassOffset, glass.output, 0, glass.length + (glass.output.BYTES_PER_ELEMENT===2 ? glass.length%2 : 0));
        }
        pending = null;
      }
      const current=valid(active);
      if (current) uploadOpaque(active, camera, projection, width, height, sunRevision);
      const distance=current?Math.hypot(active.eye[0]-camera[12],active.eye[1]-camera[13],active.eye[2]-camera[14]):Infinity;
      // A turn can leave the angular guard without moving the eye. Request the
      // next list while the outer frustum still covers the visible frame.
      if(current && distance<viewRadius*.55 && coversView(active.inner, camera, projection))return active;
      if (!pending) {
        pending = {profile, first, count, sunRevision, basis:frame.slice(19,24), eye:[camera[12],camera[13],camera[14]],
          planes:widenedView(clip), inner:widenedView(clip,1.12)};
        worker.postMessage({...pending, trackFaces:Boolean(cells?.range(profile, first, count))});
      }
      return current?active:null;
    },
  };
}
