import {prepareScreenVisibility, usableScreen} from './screen-visibility.js?v=stern-flag-1';
import {filterRoomCell, roomCellOffset} from './room-visibility.js?v=8';
import {prepareSkyVisibility} from './sky-visibility.js?v=1';
import {coversView, widenedView, viewRadius} from './view-volume.js?v=3';

export function createViewIndices(device, vertices, profiles, glazing, maxBytes, maxGlassBytes, cells = null, immediate = {}, screenConfig = null) {
  let worker;
  try {worker = new Worker(new URL('./view-worker.js?v=stern-flag-region-1', import.meta.url), {type:'module'});}
  catch {return null;} // A browser can disable workers while still supporting WebGPU.
  const glassOffset=Math.ceil(maxBytes/4)*4;
  let buffer, exactBuffer,patchBuffer,exact=null,serial=0, active, pending, stopped = false, finishStart;
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
  // The worker takes ownership of the remapped indices and glass arrays.
  const profileFormats = Object.fromEntries(Object.entries(profiles).map(([name, indices]) =>
    [name, { short: indices.BYTES_PER_ELEMENT === 2, glassLength: glazing[name].indices.length }]));
  const filterSky = prepareSkyVisibility(vertices);
  const screen = prepareScreenVisibility(screenConfig, vertices, maxBytes);
  const scratch = new ArrayBuffer(glassOffset);
  const compact16 = new Uint16Array(scratch), compact32 = new Uint32Array(scratch);
  function uploadOpaque(entry, camera, projection, width, height, sunRevision, frame, samples, refinement) {
    const region = cells?.range(entry.profile, entry.first, entry.count, camera);
    const offset = roomCellOffset(region, camera, projection, width, height);
    // Sun changes invalidate only the sky exclusions. The camera and room can
    // immediately reuse the full sky from the same prepared index list.
    const trimSky = entry.skyRuns?.length > 0 && entry.sunRevision === sunRevision &&
      Math.min(width*projection[0], height*projection[5]) >= 100;
    const depthTest = refinement === 'occlusion' || refinement === 'cloth';
    const useScreen = refinement !== 'off' && Boolean(screen) && entry.output.BYTES_PER_ELEMENT === 2 &&
      usableScreen(width, height, samples, projection);
    const changed = entry.offset !== offset || entry.trimSky !== trimSky || entry.useScreen !== useScreen || entry.depthTest !== depthTest;
    if (!changed && !entry.filtered) return;
    let indices = entry.output, length = entry.rawLength;
    if (changed) {
      if (offset >= 0 || trimSky) {
        const compact = indices.BYTES_PER_ELEMENT === 2 ? compact16 : compact32;
        length = filterRoomCell(cells?.bits, offset, region?.count, indices, length, entry.slots, compact, trimSky && entry.skyRuns);
        indices = compact;
      }
      entry.baseLength = length;
      entry.useScreen = useScreen;
      entry.depthTest = depthTest;
      // Small ranges already render cheaply. Reuse the broader worker list.
      const minFaces = entry.profile === 'main' ? 1400 : depthTest ? 3500 : 1800;
      entry.filtered = useScreen && length >= minFaces * 3;
    } else length = entry.baseLength;
    if (entry.filtered) {
      length = screen.filter(indices, length, frame, width, height, changed, depthTest);
      if (length === null) return;
      indices = screen.output;
    }
    if (length && length < entry.count)
      device.queue.writeBuffer(buffer, 0, indices, 0, length + (indices.BYTES_PER_ELEMENT === 2 ? length % 2 : 0));
    entry.trimSky = trimSky;
    entry.offset = offset;
    entry.regionCount = region?.count;
    entry.length = length;
  }
  const ready = new Promise(resolve => {finishStart = resolve;});
  function dispose() {
    stopped = true;
    worker.terminate();
    buffer?.destroy();exactBuffer?.destroy();patchBuffer?.destroy();
    active = pending = exact = null;wake();
    finishStart();
  }
  try {
    buffer = device.createBuffer({label:'Yacht visible opaque indices', size:glassOffset+maxGlassBytes,
      usage:GPUBufferUsage.INDEX | GPUBufferUsage.COPY_DST});
    exactBuffer=device.createBuffer({label:'Fixed camera opaque indices',size:glassOffset,usage:GPUBufferUsage.INDEX|GPUBufferUsage.COPY_DST});
    patchBuffer=device.createBuffer({label:'Waving cloth and its surroundings',size:glassOffset+maxGlassBytes,
      usage:GPUBufferUsage.INDEX|GPUBufferUsage.COPY_DST});
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
    buffer, exactBuffer,patchBuffer,glassOffset, ready, dispose,
    matches,
    invalidateFixed(){exact=null;wake();},
    idle(){
      if(stopped || ((!pending||pending.result)&&!exact?.analyzing))return Promise.resolve();
      return new Promise(resolve=>waiting.add(resolve));
    },
    captureCandidates(entry){
      if(!entry || entry.immediate || (entry.rawLength===entry.count && entry.offset<0))return null;
      // Snapshot the actual room and frustum while capture readback is pending.
      // A later sun angle can reveal another part of the rotating sky.
      const source=entry.output, copy=new source.constructor(entry.rawLength);
      const length=filterRoomCell(cells?.bits,entry.offset,entry.regionCount,source,entry.rawLength,entry.slots,copy);
      return copy.subarray(0,length);
    },
    analyze(winners,width,height,profile,first,count,clip,candidates,windRect){
      if(stopped)return;
      exact={key:++serial,analyzing:true,profile,first,count,width,height,clip:Float32Array.from(clip)};
      // Include every sample touched by rounding the scissor out to whole pixels.
      const region=windRect && [windRect[0]-4/width,windRect[1]-4/height,windRect[2]+4/width,windRect[3]+4/height];
      worker.postMessage({...exact,winners,candidates,windRect:region},candidates?[winners.buffer,candidates.buffer]:[winners.buffer]);
    },
    patch(profile,frame,width,height,sunRevision){
      if(!matches(profile,frame,width,height) || exact.patchRevision!==sunRevision)return null;
      return exact.patchCounts;
    },
    fixed(profile,first,count,frame,width,height,sunRevision){
      if(!matches(profile,frame,width,height)||exact.first!==first||exact.count!==count)return null;
      if(exact.result){
        const {output,length,skyStart}=exact.result;
        if(skyStart){
          const padded=skyStart+(output.BYTES_PER_ELEMENT===2 ? skyStart%2 : 0);
          device.queue.writeBuffer(exactBuffer,0,output,0,padded);
        }
        const {patch,patchLength,patchSky,patchGlass}=exact.result;
        if(patch){
          const short=patch.BYTES_PER_ELEMENT===2;
          const kept=filterSky(patch,patchSky,patchLength,frame,width,height,patch.subarray(patchSky));
          const size=patchSky+kept;
          if(size)device.queue.writeBuffer(patchBuffer,0,patch,0,size+(short?size%2:0));
          if(patchGlass.length)device.queue.writeBuffer(patchBuffer,glassOffset,patchGlass.output);
          exact.patchRevision=sunRevision;exact.patchCounts=[size,patchGlass.length];
        }
        Object.assign(exact,{output,skyStart,fullLength:length,length:skyStart,result:null});
      }
      if(exact.output && exact.skyStart<exact.fullLength && exact.sunRevision!==sunRevision){
        const {output,skyStart,fullLength}=exact;
        const short=output.BYTES_PER_ELEMENT===2;
        const tail=short?compact16:compact32;
        // A 16-bit index boundary can share a word with the last hull index.
        const pad=short?skyStart%2:0;
        if(pad)tail[0]=output[skyStart-1];
        const kept=filterSky(output,skyStart,fullLength,frame,width,height,tail.subarray(pad));
        const size=kept+pad;
        if(size)device.queue.writeBuffer(exactBuffer,(skyStart-pad)*output.BYTES_PER_ELEMENT,tail,0,size+(short?size%2:0));
        exact.sunRevision=sunRevision;
        exact.length=skyStart+kept;
      }
      return exact.length??null;
    },
    select(profile, first, count, clip, camera, projection, width, height, sunRevision, frame, samples, refinement) {
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
      if (current) uploadOpaque(active, camera, projection, width, height, sunRevision, frame, samples, refinement);
      const distance=current?Math.hypot(active.eye[0]-camera[12],active.eye[1]-camera[13],active.eye[2]-camera[14]):Infinity;
      // A turn can leave the angular guard without moving the eye. Request the
      // next list while the outer frustum still covers the visible frame.
      if(current && distance<viewRadius*.55 && coversView(active.inner, camera, projection))return active;
      if (!pending) {
        pending = {profile, first, count, sunRevision, basis:frame.slice(19,24), eye:[camera[12],camera[13],camera[14]],
          planes:widenedView(clip), inner:widenedView(clip,1.12)};
        worker.postMessage({...pending, trackFaces:Boolean(cells?.range(profile, first, count))});
      }
      if (current) return active;
      // On this frame a previous worker result may exclude newly visible
      // geometry. Use the current frustum and eye cell while its replacement runs.
      const filter = immediate[profile];
      if (!filter) return null;
      const region = cells?.range(profile, first, count, camera);
      const offset = roomCellOffset(region, camera, projection, width, height);
      const {short, glassLength} = profileFormats[profile];
      const output = short ? compact16 : compact32;
      const length = filter(first, count, clip, width, height, cells?.bits, offset, region?.count, output);
      if (length && length < count) {
        device.queue.writeBuffer(buffer, 0, output, 0, length + (short ? length % 2 : 0));
        // Turning back can make the old worker list valid again. Its indices
        // must be restored after this write to the same opaque buffer.
        if (active) active.offset = undefined;
      }
      return {length, glassLength, immediate:true};
    },
  };
}
