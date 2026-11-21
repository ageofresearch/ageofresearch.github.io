import {fittedFurniture} from './tour-furniture.js?v=port-guest-1';

// Source axes are forward, port and up. The two stair landings register the
// photographic proportions to the existing hull. These are model dimensions.
export function furnishBeachClub(add, { box, cushion, outline, post, pipe, extrude }) {
  const slab = (bounds, radius, material, name) => add(box(bounds,radius),material,name);
  const pad = (bounds, material, name, radius=.12) => {
    const [x,y,z,X,Y,Z]=bounds;
    return add(cushion(outline((x+X)/2,(y+Y)/2,X-x,Y-y,radius),z,Z),material,name);
  };
  const emit=add;
  add=(geometry,material,name)=>{
    const light=[];
    for(let i=0;i<geometry.vertices.length;i+=6){
      const [x,y,z]=geometry.vertices.slice(i,i+3);
      const depth=Math.max(0,Math.min(1,(x-.83)/1.75)),edge=Math.min(1,Math.abs(y)/2.28);
      light.push(z>4.56||x<.83?.96:.94-.39*depth-.065*edge);
    }
    return emit(geometry,material,name,{light});
  };
  const sill=.84, back=2.64, half=2.28, head=4.57;
  slab([back,-half,2.84,back+.09,half,head+.08],.009,'M89','beach club aft-facing bulkhead');
  slab([back-.024,-.87,2.84,back,.87,head],.006,'M92','beach club warm timber wall panel');
  slab([back-.032,-.87,3.52,back-.024,.22,head-.10],.003,'M90','beach club central satin inset');
  for(const side of [-1,1]) {
    // Sloping jamb narrows towards its crown, as seen from the platform.
    const outerJamb=side===1?.125:.19;
    const profile=[[sill,side*half],[back,side*half],[back,side*(half+.19)],[sill-.10,side*(half+outerJamb)]];
    const cheek=extrude(profile,2.84,head+.12,.012);
    for(let i=0;i<cheek.vertices.length;i+=6){
      const lift=(cheek.vertices[i+2]-2.84)/(head+.12-2.84);
      cheek.vertices[i]+=.30*lift;
      cheek.vertices[i+1]-=side*.21*lift;
      const nx=cheek.vertices[i+3],ny=cheek.vertices[i+4];
      const nz=cheek.vertices[i+5]-(.30*nx-side*.21*ny)/(head+.12-2.84);
      const length=Math.hypot(nx,ny,nz);
      cheek.vertices[i+3]=nx/length;cheek.vertices[i+4]=ny/length;cheek.vertices[i+5]=nz/length;
    }
    add(cheek,'M89','beach club swept jamb '+side);
    const y=side*1.65;
    slab([back-.038,y-.391,2.851,back-.027,y+.391,head-.079],.005,'M47','beach club locker reveal '+side);
    slab([back-.07,y-.38,2.86,back-.025,y+.38,head-.09],.015,'M90','beach club flush locker '+side);
    slab([back-.103,y-.07,3.64,back-.072,y+.07,3.665],.004,'M19','beach club locker handle '+side);
  }
  slab([sill+.27,-2.20,head,back+.03,2.20,head+.105],.065,'M92','beach club timber soffit');
  slab([sill+.22,-2.31,head+.105,back+.03,2.31,head+.18],.06,'M89','beach club canopy fascia');
  slab([sill+.23,-2.29,head+.18,sill+.48,2.29,head+.275],.048,'M47','beach club dark rolled canopy edge');
  for(const side of [-1,1]){
    add(pipe([[sill-.035,side*2.28,2.85],[sill+.24,side*2.09,head-.11],[sill+.29,side*2.06,head-.02],[sill+.34,side*1.96,head+.015]],.022,8),'M19','beach club polished portal trim '+side);
    add(post([1.41,side*1.48,head-.012],[1.41,side*1.48,head],.047,.047,10),'M38','beach club recessed soffit lamp '+side);
  }
  slab([sill-.045,-2.21,2.841,sill+.028,2.21,2.853],.003,'M19','beach club flush stainless sill');
  slab([1.47,-1.22,2.84,2.54,1.22,2.99],.07,'M43','beach club divan plinth');
  for(let i=0;i<3;i++){
    const y=-1.30+i*.87;
    pad([1.38,y,2.98,2.51,y+.865,3.31],'M91','beach club divan seat '+i);
    pad([2.30,y,3.26,2.57,y+.865,3.68],'M91','beach club divan back '+i);
  }
  pad([2.15,.36,3.30,2.40,.80,3.57],'M93','beach club ochre scatter cushion');
  pad([2.06,.20,3.30,2.25,.53,3.48],'M94','beach club blue scatter cushion');
  for (const side of [-1,1]) {
    const y=side*.80;
    slab([-1.73,y-.38,2.84,-.17,y+.38,2.96],.06,'M43','swim platform sun chair base '+side);
    pad([-1.78,y-.40,2.95,-.57,y+.40,3.13],'M91','swim platform sun chair seat '+side);
    const rake=cushion(outline(-.54,y,.78,.80,.055),3.02,3.15);
    const angle=.84, pivot=-.93;
    for(let i=0;i<rake.vertices.length;i+=6) {
      const x=rake.vertices[i]-pivot,z=rake.vertices[i+2]-3.02;
      rake.vertices[i]=pivot+x*Math.cos(angle)-z*Math.sin(angle);
      rake.vertices[i+2]=3.02+x*Math.sin(angle)+z*Math.cos(angle);
      const nx=rake.vertices[i+3],nz=rake.vertices[i+5];
      rake.vertices[i+3]=nx*Math.cos(angle)-nz*Math.sin(angle);
      rake.vertices[i+5]=nx*Math.sin(angle)+nz*Math.cos(angle);
    }
    add(rake,'M91','swim platform inclined sun chair back '+side);
  }
  add(post([-.89,0,2.84],[-.89,0,3.13],.05,.035,8),'M19','swim platform table pedestal');
  slab([-1.12,-.22,3.13,-.66,.22,3.165],.17,'M43','swim platform side table');
  add(pipe([[.96,-2.11,2.84],[.96,-2.11,4.59],[.95,-2.10,4.68],[.89,-2.08,4.74],[.77,-2.08,4.75],[.71,-2.08,4.70]],.023,8),'M19','swim platform stainless shower riser');
  add(post([.71,-2.08,4.695],[.71,-2.08,4.714],.09,.065,12),'M19','swim platform rain head');
  for(const side of [-1,1]){
    const y=side*3.555;
    add(pipe([[.64,y,3.14],[1.34,y,3.51],[2.42,y,4.102],[3.30,y,4.192]],.019,8),'M19','outboard stair coaming cap rail '+side);
  }
  // The opposite cockpit panoramas show a paired horn fitting and a drum
  // behind the open gunwale. All fittings bear on the same narrow ledge.
  for(const side of [-1,1]){
    const port=side===1, y=side*3.64, base=port?4.17:4.40;
    const hardware=(a,b,r,R,name)=>add(post(a,b,r,R,8),'M19','cockpit '+name+' '+side);
    // Port already has the ledge, rail, and raised cap in the boarding coaming.
    if(!port){
      slab([4.16,-3.78,3.95,5.68,-3.50,base],.012,'M89','cockpit mooring ledge '+side);
      slab([4.16,-3.78,4.76,5.68,-3.50,4.88],0,'M89','cockpit raised mooring cap '+side);
      for(const x of [4.20,5.64])hardware([x,y,base],[x,y,4.76],.020,.020,'mooring cap support '+x);
    }
    const cx=port?4.70:4.55;
    slab([cx-.21,y-.09,base,cx+.21,y+.09,base+.025],.015,'M19','cockpit cleat sole '+side);
    for(const dir of [-1,1]){
      const foot=[cx+dir*.115,y,base+.025], top=[cx+dir*.17,y,base+.183];
      hardware(foot,top,.048,.046,'cleat upright '+dir);
      hardware([top[0]-dir*.035,y,top[2]],[top[0]+dir*.061,y,top[2]+.012],.045,.030,'cleat horn '+dir);
    }
    const x=port?5.20:5.40;
    hardware([x,y,base],[x,y,base+.04],.116,.096,'mooring drum foot');
    hardware([x,y,base+.04],[x,y,base+.22],.067,.073,'mooring drum');
    hardware([x,y,base+.22],[x,y,base+.25],.094,.097,'mooring drum crown');
  }
  const bench=fittedFurniture('banquette',[2.78,-2.16,4.06,3.65,2.16,4.78]);
  // Keep one envelope for the continuous bench used by full-deck navigation.
  const vertices=[],indices=[];
  for(const piece of bench){const base=vertices.length/6;vertices.push(...piece.vertices);indices.push(...piece.indices.map(i=>base+i));}
  const seat=add({vertices,indices},'M39','covered aft seating behind transom');
  slab([2.66,-2.10,3.95,3.59,2.10,4.07],.08,'M25','cockpit banquette base');
  return seat;
}

// The open slot between the central platform and the port stair sponson is
// visible in both Beach Club views. Its edge was traced on the z=2.84 deck
// plane. Only the port edge changes; the ends keep their rounded corners.
export function swimPlatformOutline(roundedOutline, portWidth, inset) {
  const edge = x => 2.42-.085*Math.min(x,1.38)-inset;
  const outline = [];
  for (let i=0;i<roundedOutline.length;i++) {
    const [x,y] = roundedOutline[i], [nextX,nextY] = roundedOutline[(i+1)%roundedOutline.length];
    outline.push([x,y>0 ? edge(x)+(y-portWidth) : y]);
    if (y>0 && nextY>0 && x>1.38 && nextX<1.38)
      outline.push([1.38,edge(1.38)]);
  }
  return outline;
}

// Port stern, viewed from the Beach Club. The photo establishes the layered
// outline. Heights and radii are fitted to the existing platform and deck.
export function buildPortStairFoot(add, {extrude, face, withoutCap, halfWidth}) {
  // The landing field and the recessed footwell replace the rectangular
  // surfaces of the two lowest supports. Keep every original riser elevation.
  const platformZ = 2.84, deckZ = 3.95, rise = (deckZ-platformZ)/7;
  // The outboard port foot is a raised sponson over water. Its landing
  // and moulded well are higher than the traversable starboard first tread.
  const landingZ = 3.15, footwellZ = 3.405;
  const inner = 2.43, outer = 3.53, toe = 1.04, second = 1.45, top = 2.34;
  const recess = .052, revealTop = landingZ+.054;
  const weatheredTeak = {finish:[0x998c7c,.80,0,1]};
  const marginBoard = {finish:[0x887567,.80,0,0]};

  // The lower cheek sweeps forward outboard. Ease the sweep out at the
  // uppermost riser so the flight still meets the fixed boarding assembly.
  const station = ([x,y]) => [x+.30*(y-inner)*Math.min(1,(top-x)/(top-toe)),y];
  const surface = (loop,z) => face(loop,(x,y)=>({point:[x,y,z],normal:[0,0,1]}));
  const strip = (x,end,y,Y) => [[x,y],[end,y],[end,Y],[x,Y]].map(station);
  function landingOutline(inset) {
    // Registered points along the outer edge in Beach Club view B. Keep
    // the forward edge common to the field, margin, and footwell surround.
    const loop=[station([toe+recess,inner]),station([toe+recess,3.56]),
      [.77,3.56],[.55,3.52],[.32,3.37],[.093,3.176],[-.06,3.036],
      [-.132,2.939],[-.18,2.843],[-.23,2.717],[-.276,2.498]];
    if(!inset)return loop;
    const edges=loop.map(([x,y],i)=>{
      const [X,Y]=loop[(i+1)%loop.length],length=Math.hypot(X-x,Y-y);
      return [(y-Y)/length,(X-x)/length];
    });
    return loop.map(([x,y],i)=>{
      const prev=edges[(i+edges.length-1)%edges.length],next=edges[i];
      const before=i===1?0:inset,after=i===0?0:inset;
      const det=prev[0]*next[1]-prev[1]*next[0];
      return [x+(before*next[1]-after*prev[1])/det,
        y+(after*prev[0]-before*next[0])/det];
    });
  }
  const lip = landingOutline(0), timber = landingOutline(.026);
  const seam = landingOutline(.083), field = landingOutline(.089);
  // The top courses share the forward edge. Use open U-shaped bands so the
  // field, caulk, timber margin and moulding tile a single surface.
  const band = (outside,inside) => surface([...outside.slice(1),outside[0],inside[0],...inside.slice(1).reverse()],landingZ);
  add(withoutCap(extrude(lip,2.765,landingZ,0),landingZ),'M89','transom port pale step 1');
  add(band(lip,timber),'M89','port stair landing perimeter lip');
  add(band(timber,seam),'M43','port stair landing teak margin board',marginBoard);
  add(band(seam,field),'M34','port stair landing caulk seam');
  add(surface(field,landingZ),'M100','transom port teak tread 1',weatheredTeak);

  // The dark kick is set back under the first moulded nose. Its top cap is
  // owned by the underside of the projecting lip.
  const kick = strip(toe+recess,second,inner,outer);
  add(withoutCap(extrude(kick,landingZ,revealTop,0),revealTop),'M47','port stair recessed kick face',{finish:[0x121514,.65,0,0]});
  const shell = strip(toe,second,inner,outer);
  const well = [[toe+.09,inner+.095],[second,inner+.095],[second,outer-.095],
    [toe+.155,outer-.095],[toe+.108,outer-.112],[toe+.09,outer-.151]].map(station);
  add(withoutCap(extrude(shell,revealTop,footwellZ,0),footwellZ),'M89','transom port pale step 2');
  const surround = [...shell.slice(2),...shell.slice(0,2),well[1],well[0],...well.slice(2).reverse()];
  add(surface(surround,footwellZ),'M89','port stair moulded footwell surround');
  add(surface(well,footwellZ),'M100','transom port teak tread 2',weatheredTeak);

  // Continue from the footwell to the original last tread beneath the gangway.
  const run = (top-second)/4;
  for(let i=0;i<4;i++) {
    const x = second+i*run, z = footwellZ+(i+1)*(deckZ-rise-footwellZ)/4;
    const y = halfWidth(z)+.045;
    add(extrude(strip(x,x+run,y,3.45),2.82,z-.024,0),'M89','transom port pale step '+(i+3));
    add(extrude(strip(x,x+run,y+.035,3.415),z-.024,z,0),'M100','transom port teak tread '+(i+3));
  }
}
