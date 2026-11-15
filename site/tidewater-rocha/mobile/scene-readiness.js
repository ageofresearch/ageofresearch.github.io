// Ordinary walking must not start downloads or compile equipment materials.
// Inspection animations remain on demand; the existing schematic equipment is
// retained if its optional detailed exterior cannot be fetched.
export async function preloadYachtExteriors(model,{timeoutMs=45000}={}) {
  const abort=new AbortController(),timer=setTimeout(()=>abort.abort(),timeoutMs);
  try {
    await Promise.all([model.mtu,model.strainers].filter(Boolean).map(async controller=>{
      const previous=controller.fetcher,fetcher=previous??globalThis.fetch.bind(globalThis);
      controller.fetcher=(url,options)=>fetcher(url,{...options,signal:abort.signal});
      try { await controller.loadExterior(); }
      finally { controller.fetcher=previous; }
    }));
  } finally { clearTimeout(timer); }
}

export async function prepareYachtMeshes(app) {
  const meshes=[];
  app.entranceYacht.group.traverse(mesh=>{if(mesh.isMesh&&mesh.geometry&&mesh.material)meshes.push(mesh);});
  const main={kind:'main',colorFormats:app.sceneRenderer.sceneRT.formats,depthFormat:'depth32float'};
  // Match the normal, transparent and shadow passes, including hidden decks.
  await app.engine.meshRenderer.prepareMeshes(meshes,[
    {...main,layerMask:1},
    {...main,late:true,layerMask:4},
    {kind:'depth',depthFormat:'depth32float',depthCompare:'less-equal',depthBias:2,depthBiasSlopeScale:1.5},
  ]);
  await app.gpu.queue.onSubmittedWorkDone();
}

export async function warmYachtViews(app) {
  const walk=app.yachtWalk,nav=walk.nav,model=walk.model,b=model.group.userData.yacht;
  const saved={deck:nav.deck,position:nav.position,elevation:nav.elevation,stair:nav.stair,room:nav.room};
  const yaw=walk.yaw,pitch=walk.pitch,sun=model.optionalSunDeck;
  // Pipeline creation alone does not execute shaders on the GPU. Exercise the
  // machinery materials and the optional upper deck while the loader is up.
  const views=[{deck:'LD',position:[4.575,1.7],height:1.58,target:[9,0,2.7]}];
  const room=model.asset.data.rooms.find(r=>r.deck==='SD');
  if(room)views.push({deck:'SD',position:room.spawn.slice(0,2),height:model.asset.data.levels.SD,target:room.look});
  try {
    for(const view of views) {
      if(view.deck==='SD')model.setSunDeck(true);
      Object.assign(nav,{deck:view.deck,position:view.position,elevation:view.height,stair:null});
      walk.cameraElevation=view.height;walk.applyPosition();
      const [x,y,z]=view.target;
      const direction=app.camera.position.clone().set(y*b.sy,z-b.seaReference,x*b.sx-b.length/2);
      model.group.localToWorld(direction).sub(app.camera.position).normalize();
      walk.yaw=Math.atan2(-direction.x,-direction.z);walk.pitch=Math.asin(direction.y);
      app.frame(0);await app.gpu.queue.onSubmittedWorkDone();
    }
  } finally {
    Object.assign(nav,saved);walk.yaw=yaw;walk.pitch=pitch;walk.cameraElevation=saved.elevation;
    model.setSunDeck(sun);walk.applyPosition();model.updateVisibility(app.camera,true);walk.resetHistory();
  }
}
