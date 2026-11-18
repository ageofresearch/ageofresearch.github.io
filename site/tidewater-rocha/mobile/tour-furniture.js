import catalog from './tour-furniture-data.js?v=chair-fidelity-1';

// Fit the offline r110 shell to an assembly in Rocha coordinates. Normals use
// the inverse transpose of the same map, including any reflection.
export function fittedFurniture(key,bounds,{turn=false,mirrorX=false,mirrorY=false}={}) {
  const asset=catalog[key],axes=turn?[2,0,1]:[0,2,1];
  const signs=[mirrorX?-1:1,(turn?1:-1)*(mirrorY?-1:1),1];
  const lengths=bounds.slice(3).map((x,k)=>x-bounds[k]);
  const scale=axes.map((axis,k)=>asset.size[axis]/lengths[k]*signs[k]);
  const read=s=>new Uint8Array(Array.from(atob(s),c=>c.charCodeAt(0))).buffer;
  return asset.pieces.map(([v,f])=>{
    const source=new Int16Array(read(v)),indices=Array.from(new Uint16Array(read(f))),vertices=[];
    for(let i=0;i<source.length;i+=6) {
      for(let k=0;k<3;k++) {
        const t=source[i+axes[k]]/32767;
        vertices.push(bounds[k]+(signs[k]>0?t:1-t)*lengths[k]);
      }
      const n=axes.map((axis,k)=>source[i+3+axis]*scale[k]),length=Math.hypot(...n)||1;
      vertices.push(...n.map(x=>x/length));
    }
    if(mirrorX!==mirrorY)for(let i=0;i<indices.length;i+=3)[indices[i+1],indices[i+2]]=[indices[i+2],indices[i+1]];
    return {vertices,indices};
  });
}

export function furnishTourRooms(detail,exterior,asset,{box,slab,outline,bounds,materials}) {
  if(!detail||!exterior)return;
  const source=new Map(asset.data.meshes.map(m=>[m.id,m]));
  const parts=()=>[...new Set([...detail.replacements.values()].flat().concat(detail.additions,exterior.parts))];
  function remove(anchor,match=()=>true) {
    const keep=p=>p.anchor!==anchor||!match(p);
    for(const owner of [detail,exterior]){
      owner.replacements.set(anchor,(owner.replacements.get(anchor)||[]).filter(keep));
      owner.additions=owner.additions.filter(keep);
    }
    exterior.parts=exterior.parts.filter(keep);
  }
  function add(anchor,geometry,material,feature,inside=true){
    const b=bounds(geometry);
    const part={...geometry,id:anchor+'/tour/'+feature.replaceAll(' ','-'),anchor,deck:source.get(anchor).deck,
      interior:inside,feature,bounds:b,assemblyEnvelope:b,semanticParent:'tour-furniture',sourceIDs:[anchor],
      materialID:material,finish:materials[material],triangles:geometry.indices.length/3,
      evidence:'VRCloud Grande 36M, photo-estimated fit in Rocha model coordinates'};
    detail.additions.push(part);
    if(!inside)exterior.parts.push(part);
  }
  function fit(anchor,key,b,mat,label,options,inside=true){
    fittedFurniture(key,b,options).forEach((g,i)=>add(anchor,g,mat,label+' '+(i+1),inside));
  }
  function floorMat(anchor,b,label){
    const [x,y,z,X,Y,Z]=b;
    add(anchor,slab(outline((x+X)/2,(y+Y)/2,X-x,Y-y,Math.min(.48,(Y-y)/4)),z,Z,0),'M95',label);
  }
  // The saloon opens on a curved sofa and two individual lounge chairs.
  // Keep the coffer and lights, which share an anchor with the old sofa.
  for(const anchor of ['MD_FUR_014','MD_FUR_016'])
    remove(anchor,p=>/base|shell|seat module|loose sofa cushion/.test(p.feature));
  fit('MD_FUR_014','salonSofa',[10.55,-1.15,3.955,14.11,1.69,4.78],'M39','salon curved boucle module');
  for(const [i,x] of [10.90,12.00].entries()){
    fit('MD_FUR_016','salonChair',[x,-1.69,4.01,x+.93,-.87,4.78],'M39','salon lounge chair '+(i+1));
    add('MD_FUR_016',box([x+.17,-1.55,3.95,x+.76,-1.02,4.06],.045),'M38','salon chair plinth '+i);
  }
  fit('MD_FUR_014','scatter',[11.25,1.21,4.36,11.64,1.42,4.65],'M94','salon blue scatter');
  fit('MD_FUR_014','scatter',[12.38,1.32,4.34,12.76,1.55,4.62],'M93','salon ochre scatter');
  add('MD_FUR_014',box([10.83,1.08,3.95,13.44,1.44,4.06],.04),'M38','salon recessed sofa feet');
  remove('MD_FUR_018');remove('MD_FUR_019');
  add('MD_FUR_018',box([11.58,-.40,3.95,12.35,-.11,4.25],.12),'M38','salon bronze table foot');
  add('MD_FUR_018',slab(outline(11.98,-.20,1.39,.83,.40),4.25,4.31,.012),'M37','salon ivory low table');
  add('MD_FUR_019',slab(outline(11.98,-.20,.59,.36,.17),4.31,4.335,.005),'M53','salon brass tray');
  // Bind the curtain to the inside of each side window with vertically folded
  // linen. The narrow stack leaves the glazing and the side aisle clear.
  for(const side of [-1,1]){
    for(const x of [11.61,17.13]){
      const vertices=[],indices=[];
      for(let j=0;j<=16;j++){
        const a=j*Math.PI/2,y=side*(2.865+.046*Math.cos(a));
        const ny=-side,nx=-side*1.9*Math.sin(a),length=Math.hypot(nx,ny);
        for(const z of [4.27,5.805])vertices.push(x+j*.026,y,z,nx/length,ny/length,0);
        if(j){const k=j*2;indices.push(k-2,k-1,k+1,k-2,k+1,k);}
      }
      add('MD_FUR_014',{vertices,indices},'M39','salon gathered linen at '+x+' side '+side);
    }
  }
  // Finish the real forward mamparo on either side of the existing lobby
  // opening. The broad starboard sightline continues into the stair enclosure.
  add('MD_FUR_014',box([17.808,.73,3.963,17.829,2.82,5.78],.005),'M96','salon port walnut bulkhead facing');
  add('MD_FUR_014',box([17.808,-2.65,3.963,17.829,-1.91,5.78],.005),'M96','salon starboard walnut bulkhead facing');
  remove('UD_FUR_001');
  add('UD_FUR_001',box([4.89,-1.09,6,7.52,1.09,6.18],.12),'M43','upper lounge teak plinth',false);
  fit('UD_FUR_001','upperIsland',[4.75,-1.24,6.16,7.65,1.24,6.91],'M39','upper terrace island upholstery',{},false);
  remove('UD_FUR_016',p=>p.feature.startsWith('exterior dining'));
  for(const [i,y] of [-1.18,.44].entries()){
    const anchor='UD_FUR_016',x=11.72;
    add(anchor,box([x+.12,y-.33,6,x+.72,y+.33,6.16],.075),'M38','upper club chair recessed foot '+i,false);
    fit(anchor,'upperChair',[x,y-.45,6.11,x+.90,y+.45,6.86],'M39','upper club chair '+i,{mirrorX:true},false);
  }
  // The port-side passage to the wheelhouse remains open around this seating.
  const upper='UD_FUR_037';
  fit(upper,'skylounge',[15.27,-2.18,6.07,18.05,-.81,6.86],'M39','skylounge swept settee',{turn:true,mirrorY:true});
  add(upper,box([15.55,-2.01,6,17.78,-1.68,6.16],.075),'M43','skylounge recessed sofa plinth');
  const coffee=[16.16,-.71,6,16.82,-.27,6.42];
  add(upper,slab(outline(16.49,-.49,.60,.38,.18),6,6.38,.04),'M94','skylounge lacquered table foot');
  add(upper,slab(outline(16.49,-.49,coffee[3]-coffee[0],coffee[4]-coffee[1],.19),6.38,6.42,.007),'M43','skylounge timber table top');
  floorMat(upper,[15.03,-2.3,6.001,18.15,-.06,6.012],'skylounge cloud pile rug');
  for(const [i,x] of [15.88,17.14].entries())
    fit(upper,'scatter',[x,-1.96,6.44,x+.34,-1.76,6.72],i?'M94':'M93','skylounge scatter '+i);
  const bowAnchors=['043','044','045','046','047','048','049','050'];
  for(const n of bowAnchors)remove('UD_FUR_'+n);
  for(let n=19;n<=22;n++)remove('UD_SOF_0'+n);
  for(const [port,minY,maxY,anchor] of [[true,.57,1.93,'UD_FUR_043'],[false,-1.93,-.57,'UD_FUR_047']]){
    add(anchor,box([24.57,minY+.13,6,26.08,maxY-.13,6.21],.12),'M25','bow curved lounge plinth',false);
    fit(anchor,'bowPort',[24.42,minY,6.18,26.28,maxY,6.91],'M39','bow swept sofa',{mirrorY:port},false);
    const side=port?1:-1,cy=.58*side;
    add(anchor,box([25.40,cy-.042,6,25.52,cy+.042,6.48],.01),'M19','bow lounge table pedestal',false);
    add(anchor,slab(outline(25.48,cy,1.12,.57,.10),6.48,6.52,.008),'M96','bow lounge teak table top',false);
  }
  for(const [seat,pillow,y] of [['001','002',.16],['003','004',-1.09]]){
    remove('SD_SOF_'+seat);remove('SD_SOF_'+pillow);
    fit('SD_SOF_'+seat,'sunLounger',[11.36,y,8.574,13.37,y+.62,8.98],'M39','solarium reclining lounger',{mirrorX:true},false);
  }
  for(const id of ['005','006'])remove('SD_SOF_'+id);
  fit('SD_SOF_005','sunCorner',[14.42,.29,8.54,17.07,2.12,9.16],'M39','solarium corner sofa',{mirrorY:true},false);
  // Floor finishes belong to the existing slabs. The guest mat covers only the
  // distributor and stops before the first stair tread.
  floorMat('LD_DCK_001',[13.36,-.545,1.551,17.09,.33,1.56],'lower lobby cloud pile runner');
  // The solid transverse end of the lower passage receives flush joinery.
  // Keep the trim outside the lower stair landing and the walking radius.
  for(const [i,y] of [-.535,-.104].entries()){
    add('LD_DCK_001',box([13.345,y,1.56,13.37,y+.427,3.53],.004),'M96','lower lobby bookmatched door '+i);
    add('LD_DCK_001',box([13.371,y+(i?.035:.34),2.47,13.398,y+(i?.08:.385),2.51],.003),'M19','lower lobby door pull '+i);
  }
  add('LD_DCK_001',box([13.342,-.548,3.539,13.369,.343,3.817],.004),'M96','lower lobby joinery transom');
  // The overheads fit between the partition faces. Their warm wash is
  // sampled on the surrounding finishes while the guest package is built.
  for(const x of [13.97,15.27,16.57]){
    const aperture=outline(x,-.10,.135,.135,.064);
    add('LD_DCK_001',slab(aperture,3.804,3.830,.003),'M38','lower lobby ceiling lamp trim '+x);
    add('LD_DCK_001',slab(outline(x,-.10,.106,.106,.052),3.802,3.804,0),'M99','lower lobby frosted lens '+x);
  }
  for(const p of parts()){
    const id=p.anchor||p.id.split('/')[0];
    let material;
    if(id==='MD_SOF_004'&&p.feature?.includes('rug'))material='M95';
    if(id==='MD_SOF_006'&&p.feature?.includes('rug'))material='M37';
    if(p.feature==='inclined instrument display')material='M98';
    if(id==='UD_FUR_038'&&p.feature==='continuous dark instrument bank')material='M47';
    if(id==='UD_SOF_017'&&p.finish?.[3]===3)material='M69';
    if(material){p.materialID=material;p.finish=materials[material];}
  }
  detail.objects=[...detail.replacements.values()].flat().concat(detail.additions);
}
