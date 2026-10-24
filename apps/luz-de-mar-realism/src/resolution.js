export const MACHINERY_RESOLUTION_KEY='luz-machinery-resolution';
export const resolutionMode=value=>value==='performance'?'performance':'sharp';

// Movement never changes the sampling density in machinery. Keep the old
// adaptive policy confined to the other rooms, including its original floor.
export function resolveResolution({zone,mode='sharp',width,height,dpr=1,fixedRatio=null,moving=false,quality=1,limits={}}){
 width=Math.max(1,Math.floor(width));height=Math.max(1,Math.floor(height));
 dpr=Number.isFinite(dpr)&&dpr>0?dpr:1;
 const fixed=Number.isFinite(fixedRatio)&&fixedRatio>0;
 const policy=zone==='machinery'?resolutionMode(mode):'adaptive';
 let requestedDPR;
 if(fixed)requestedDPR=Math.max(.5,Math.min(2,fixedRatio));
 else if(policy==='sharp')requestedDPR=Math.min(dpr,2);
 else if(policy==='performance')requestedDPR=Math.min(dpr,1,Math.sqrt(1.5e6/(width*height)));
 else requestedDPR=Math.max(.5,moving?Math.min(dpr,2,Math.sqrt(1.5e6/(width*height)))*quality:Math.min(dpr,2));
 const effectiveDPR=Math.min(requestedDPR,(limits.width??Infinity)/width,(limits.height??Infinity)/height);
 return{mode:policy,source:fixed?'fixed':policy==='adaptive'?'adaptive':'machinery',requestedDPR,effectiveDPR,hardwareLimited:effectiveDPR<requestedDPR,canvas:[Math.floor(width*effectiveDPR),Math.floor(height*effectiveDPR)]};
}

export function resolutionLimits(gl){
 const maximum=Math.min(gl.getParameter(gl.MAX_RENDERBUFFER_SIZE),gl.getParameter(gl.MAX_TEXTURE_SIZE)),viewport=gl.getParameter(gl.MAX_VIEWPORT_DIMS);
 return{width:Math.min(maximum,viewport[0]),height:Math.min(maximum,viewport[1])};
}

export function storedResolutionMode(storage){
 try{return resolutionMode(storage.getItem(MACHINERY_RESOLUTION_KEY));}catch{return'sharp';}
}
