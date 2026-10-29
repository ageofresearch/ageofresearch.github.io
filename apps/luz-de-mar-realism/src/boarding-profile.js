// Keep the unaccepted visual reconstruction explicitly opt-in.
export function boardingEnabled(params=new URLSearchParams(globalThis.location?.search||'')){
 return params.get('boarding')==='vr-r01'||params.get('release')==='boarding-vr-r01';
}
export function applyBoardingVisibility(root,enabled){
 root.traverse(o=>{if(o.userData.boardingVariant)o.visible=o.userData.boardingVariant===(enabled?'candidate':'baseline');});
}
