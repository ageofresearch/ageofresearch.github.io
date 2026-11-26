import { wetBarOutline } from './cockpit-fittings.js?v=wet-bar-vr-1';

const shellFinish = {finish:[0xe3e6eb,.34,.04,4]};
const trayFinish = {finish:[0xe3e5ea,.29,.04,4]};
const seamFinish = {finish:[0xbcc0c6,.58,0,4]};
const shelfFinish = {finish:[0xae9175,.67,0,2]};
const coverLevel = 4.961;
const basinLevel = 4.78;
const centre = [6.66,-2.13];

function roundedRectangle(x,y,width,depth,radius,divisions=2) {
  return Array.from({length:4},(_,i)=>{
    const a=i*Math.PI/2;
    const cx=x+Math.sign(Math.cos(a+Math.PI/4))*(width/2-radius);
    const cy=y+Math.sign(Math.sin(a+Math.PI/4))*(depth/2-radius);
    return Array.from({length:divisions+1},(_,j)=>{
      const t=a+j*Math.PI/(2*divisions);
      return [cx+radius*Math.cos(t),cy+radius*Math.sin(t)];
    });
  }).flat();
}

function ring(points,z,scale=1,origin=centre) {
  return points.map(([x,y])=>[
    origin[0]+(x-origin[0])*scale,origin[1]+(y-origin[1])*scale,z,
  ]);
}

function sweep(rings) {
  const n=rings[0].length,vertices=[],indices=[];
  const sign=Math.sign(rings[0].reduce((area,[x,y],i)=>{
    const [X,Y]=rings[0][(i+1)%n];
    return area+x*Y-y*X;
  },0));
  for(const [a,row] of rings.entries()){
    const below=rings[Math.max(a-1,0)],above=rings[Math.min(a+1,rings.length-1)];
    for(const [i,p] of row.entries()){
      const q=row[(i+1)%n],r=row[(i+n-1)%n];
      const tx=q[0]-r[0],ty=q[1]-r[1];
      const dx=above[i][0]-below[i][0],dy=above[i][1]-below[i][1],dz=above[i][2]-below[i][2];
      const normal=[ty*dz,-tx*dz,tx*dy-ty*dx];
      const scale=sign/Math.hypot(...normal);
      vertices.push(...p,...normal.map(x=>x*scale));
    }
    if(a===rings.length-1)continue;
    for(let i=0;i<n;i++){
      const j=a*n+i,k=a*n+(i+1)%n;
      if(sign>0)indices.push(j,k,j+n,k,k+n,j+n);
      else indices.push(j,j+n,k,k,j+n,k+n);
    }
  }
  return {vertices,indices};
}

export function buildCockpitWetBar({face,post,pipe}) {
  const parts=[];
  const add=(geometry,material,feature,finish)=>parts.push([geometry,material,feature,finish]);
  const horizontal=(points,z,holes=[],up=1)=>{
    const mesh=face(points,(x,y)=>({point:[x,y,z],normal:[0,0,up]}),holes);
    if(up<0)for(let i=0;i<mesh.indices.length;i+=3)
      [mesh.indices[i+1],mesh.indices[i+2]]=[mesh.indices[i+2],mesh.indices[i+1]];
    return mesh;
  };
  const body=wetBarOutline();
  const at=(z,s)=>ring(body,z,s);
  const plane=(points,z,s)=>ring(points,z,s).map(([x,y])=>[x,y]);

  // The casing and the raised tray are divided by a narrow continuous reveal.
  // The toe narrows towards the floor and the warm band is recessed into it.
  add(sweep([at(3.952,.942),at(3.970,.942)]),'M43','cockpit wet bar recessed warm toe',
    {finish:[0xa87951,.59,0,2]});
  add(sweep([at(3.968,.938),at(3.983,.958),at(4.843,1),at(4.850,.997)]),
    'M25','rounded molded cockpit wet bar',shellFinish);
  add(sweep([at(4.843,.985),at(4.858,.985)]),'M25','cockpit wet bar horizontal reveal',seamFinish);
  add(sweep([at(4.852,.994),at(4.861,1),at(4.974,1),at(4.990,.988),at(4.989,.967),at(coverLevel,.948)]),
    'M25','cockpit wet bar rolled tray rim',trayFinish);

  // The service door follows the curved face and floor rake. Sample the
  // actual shell so the reveal stays seated across its perimeter segments.
  const shellPoint=(u,z)=>{
    const i=Math.floor(u),t=u-i;
    const [x,y]=body[i],[X,Y]=body[(i+1)%body.length];
    const length=Math.hypot(X-x,Y-y),offset=.0016;
    const scale=.958+(1-.958)*Math.min(1,Math.max(0,(z-3.983)/(4.843-3.983)));
    return [centre[0]+(x+(X-x)*t-centre[0])*scale-(Y-y)*offset/length,
      centre[1]+(y+(Y-y)*t-centre[1])*scale+(X-x)*offset/length,z];
  };
  const path=[[2.8,4.843],[2.26,4.821],[2.03,4.804],[1.92,4.773],[1.86,4.724],
    [1.74,4.58],[1.53,4.30],[1.25,3.979]];
  add(pipe(path.map(([u,z])=>shellPoint(u,z)),.0024,4,{startCap:false,endCap:false}),
    'M25','cockpit wet bar curved service-door reveal',seamFinish);

  // The photographed work area is closed flush. Retain the recessed sink
  // under the lid and leave the opening in the tray geometry itself.
  const rim=plane(body,coverLevel,.948);
  const hole=roundedRectangle(6.829,-2.21,.40,.37,.041);
  const basin=roundedRectangle(6.829,-2.21,.34,.31,.037);
  const lid=roundedRectangle(6.829,-2.21,.394,.364,.040);
  add(horizontal(rim,coverLevel,[hole]),'M25','cockpit wet bar inset white worktop',trayFinish);
  add(sweep([ring(hole,coverLevel),ring(basin,basinLevel)]),'M19','cockpit wet bar recessed metal basin walls');
  add(horizontal(basin,basinLevel),'M20','cockpit wet bar recessed basin bottom');
  const drain=roundedRectangle(6.829,-2.21,.028,.028,.013,1);
  add(horizontal(drain,basinLevel+.001),'M34','cockpit wet bar dark circular drain');
  add(horizontal(lid,coverLevel+.0005),'M25','cockpit wet bar flush service lid',trayFinish);

  // Thin shelf with white, swept supports. Its width and projection leave
  // the original approach envelope and the worktop perimeter clear.
  const shelfCentre=[6.667,-1.968];
  const shelf=roundedRectangle(...shelfCentre,.38,.82,.073,2);
  const underside=ring(shelf,5.176,.917,shelfCentre);
  const shelfEdge=sweep([underside,ring(shelf,5.188,1,shelfCentre),ring(shelf,5.204,.996,shelfCentre)]);
  const bottom=horizontal(underside.map(([x,y])=>[x,y]),5.176,[],-1);
  const start=shelfEdge.vertices.length/6;
  shelfEdge.vertices.push(...bottom.vertices);
  shelfEdge.indices.push(...bottom.indices.map(i=>i+start));
  add(shelfEdge,'M25','cockpit wet bar raised shelf white edge',shellFinish);
  add(horizontal(ring(shelf,5.204,.996,shelfCentre).map(([x,y])=>[x,y]),5.204),
    'M43','cockpit wet bar raised shelf teak top',shelfFinish);
  for(const [i,y] of [-2.182,-1.827].entries()){
    const section=(x,y,z,w,d)=>ring(roundedRectangle(x,y,w,d,.014,1),z);
    add(sweep([
      section(6.645,y,coverLevel-.001,.19,.094),
      section(6.664,y+.006,5.006,.146,.070),
      section(6.702,y+.016,5.092,.084,.042),
      section(6.738,y+.028,5.188,.108,.054),
    ]),'M25','cockpit wet bar swept shelf support '+(i+1),shellFinish);
  }

  const column=[6.820,-2.548];
  add(post([...column,coverLevel],[...column,5.022],.071,.054,8),
    'M25','cockpit wet bar polished column seat',shellFinish);
  add(post([...column,5.022],[...column,5.88],.049,.049,10),
    'M19','cockpit polished support post above wet bar',{finish:[0xd1d6e1,.14,.92,5]});
  return parts;
}
