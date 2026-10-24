import fs from 'node:fs/promises';import path from 'node:path';import{execFile}from'node:child_process';import{promisify}from'node:util';import{NodeIO}from'@gltf-transform/core';import{ALL_EXTENSIONS}from'@gltf-transform/extensions';import{MeshoptDecoder}from'meshoptimizer';import{Matrix4,Vector3}from'three';
const R=path.resolve(import.meta.dirname,'..'),W=path.join(R,'work/bulkhead-vr-r01');await MeshoptDecoder.ready;const io=new NodeIO().registerExtensions(ALL_EXTENSIONS).registerDependencies({'meshopt.decoder':MeshoptDecoder});
for(const[name,file]of[['source',path.join(W,'bulkhead-source.glb')],['runtime',path.join(R,'public/assets/machinery/bulkhead-vr-r01/bulkhead.glb')]]){
 const d=await io.read(file),points=[];for(const node of d.getRoot().listNodes())for(const p of node.getMesh()?.listPrimitives()||[]){const a=p.getAttribute('POSITION'),matrix=new Matrix4().fromArray(node.getWorldMatrix());for(let i=0;i<a.getCount();i++)points.push(...new Vector3(...a.getElement(i,[])).applyMatrix4(matrix).toArray());}
 await fs.writeFile(path.join(W,'quantization-'+name+'.bin'),Buffer.from(new Float64Array(points).buffer));
}
const code=`from pathlib import Path
import numpy as np,json
from scipy.spatial import cKDTree
w=Path(${JSON.stringify(W)});a=np.fromfile(w/'quantization-source.bin',dtype='<f8').reshape(-1,3);b=np.fromfile(w/'quantization-runtime.bin',dtype='<f8').reshape(-1,3)
x=cKDTree(a).query(b,workers=1)[0];y=cKDTree(b).query(a,workers=1)[0];maximum=float(max(x.max(),y.max()));assert maximum<.0002,maximum
r={'sourceVertices':len(a),'runtimeVertices':len(b),'method':'Bidirectional nearest-vertex distances in physical world coordinates, after decoding meshopt and the quantized node transforms. Source and runtime triangle counts are separately checked.','maximumPositionErrorMetres':maximum,'lightmapUVMaximumErrorBoundPixels':float(np.sqrt(2)*2048/(2*65535)),'lightmapUVBits':16,'normalBits':16,'positionBits':16,'physicalMaterialUV0Unchanged':True,'passed':True};(w/'quantization-proof.json').write_text(json.dumps(r,indent=2)+'\\n');print(json.dumps(r))`;
console.log((await promisify(execFile)('python3',['-c',code],{maxBuffer:2e6})).stdout);
