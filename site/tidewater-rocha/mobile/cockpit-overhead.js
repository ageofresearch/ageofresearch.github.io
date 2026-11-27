import {convexHull} from './terrace-geometry.js?v=chair-fidelity-1';

export const cockpitOverheadJoin = 8.5;
export const cockpitOverheadFinish = 67;
const underside = 5.88;
export const cockpitOverheadOpening = Object.freeze([5.10,1.68,8.05,2.74]);
export const cockpitPortColumn = Object.freeze([5.46,1.48]);
const entry = cockpitOverheadOpening;
const portColumn = cockpitPortColumn;
const starboardColumn = [6.820,-2.548];
const speakers = [[5.08,-1.44],[4.47,.48],[7.89,-.42],[7.38,1.06]];
const lamps = [[7.03,-1.79,.087,.091],[6.28,-1.90,.047,.033],[6.53,-1.39,.027,.021]];
export const mobileCockpitFitting = name => !/round grille|column socket|(?:flared luminaire|warm lens) 3$/.test(name);
const recesses = [[3.83,.89],[4.32,-1.08],[4.96,-1.90],[5.61,-2.91],[5.20,.92],
  [5.80,.38],[5.98,-.07],[6.26,-.62],[6.84,1.00],[7.32,-.73],[7.79,-1.44],[8.19,.48]];
const seams = [
  [[3.61,1.58],[3.78,.20],[3.89,-1.38],[4.28,-2.43],[5.03,-2.77],[6.11,-2.95],[8.31,-3.08]],
  [[4.82,1.27],[5.25,.23],[5.60,-.90],[6.04,-2.45],[6.11,-2.95]],
  [[6.24,1.15],[6.39,.93],[6.76,-.42],[7.01,-1.24],[7.25,-1.36],[7.53,-2.05],[8.32,-2.24]],
  [[6.24,1.15],[6.43,1.50],[7.98,1.52],[8.19,1.36],[8.20,-.10],[8.31,-3.08]],
];

function onSide(triangle, positive) {
  const output=[];
  for(let i=0;i<triangle.length;i++){
    const a=triangle[i],b=triangle[(i+1)%triangle.length];
    const da=(a[0]-cockpitOverheadJoin)*(positive?1:-1);
    const db=(b[0]-cockpitOverheadJoin)*(positive?1:-1);
    if(da>=0)output.push(a);
    if((da>=0)!==(db>=0))output.push(a.map((v,k)=>v+(b[k]-v)*da/(da-db)));
  }
  return output;
}

function triangles(part,callback) {
  for(let i=0;i<part.indices.length;i+=3){
    const ids=Array.from(part.indices.slice(i,i+3));
    callback(ids,ids.map(k=>Array.from(part.vertices.slice(k*6,k*6+6))));
  }
}

function appendFace(geometry,polygon) {
  if(polygon.length<3)return;
  const base=geometry.vertices.length/6;
  geometry.vertices.push(...polygon.flat());
  for(let i=1;i+1<polygon.length;i++){
    const a=polygon[i].map((v,k)=>v-polygon[0][k]),b=polygon[i+1].map((v,k)=>v-polygon[0][k]);
    if(Math.hypot(a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0])>1e-10)
      geometry.indices.push(base,base+i,base+i+1);
  }
}

function captureDeck(deck,reveal) {
  const hull=[],top=[];
  for(const part of [deck,reveal]){
    const kept={vertices:Array.from(part.vertices),indices:[]};
    triangles(part,(ids,triangle)=>{
      const upper=part===deck&&triangle.every(v=>v[5]>.98&&Math.abs(v[2]-6)<.001);
      if(upper)top.push(...onSide(triangle,false).map(v=>v.slice(0,2)));
      if(upper||triangle.every(v=>v[0]>=cockpitOverheadJoin))kept.indices.push(...ids);
      else if(triangle.some(v=>v[0]>cockpitOverheadJoin))appendFace(kept,onSide(triangle,true));
    });
    Object.assign(part,kept,{triangles:kept.indices.length/3});
  }
  hull.push(...convexHull(top));
  return hull;
}

const unit=(x,y)=>{const d=Math.hypot(x,y)||1;return [x/d,y/d];};
const lerp=(a,b,t)=>a.map((v,i)=>v+(b[i]-v)*t);

function rim(outline, inset) {
  return outline.flatMap((p,i)=>{
    const a=outline[(i+outline.length-1)%outline.length],b=outline[(i+1)%outline.length];
    const outer=unit(p[1]-a[1]+b[1]-p[1],a[0]-p[0]+p[0]-b[0]);
    if(p[0]>=cockpitOverheadJoin-1e-6)return [p];
    const move=q=>q.map((v,k)=>v-outer[k]*inset*Math.min(1,(cockpitOverheadJoin-q[0])/.4));
    const [ax,ay]=unit(p[0]-a[0],p[1]-a[1]),[bx,by]=unit(b[0]-p[0],b[1]-p[1]);
    // The nearly straight sheer segments already meet tangentially.
    if(ax*bx+ay*by>.946)return [move(p)];
    const start=move(lerp(p,a,Math.min(.28/Math.hypot(a[0]-p[0],a[1]-p[1]),.28)));
    const end=move(lerp(p,b,Math.min(.28/Math.hypot(b[0]-p[0],b[1]-p[1]),.28)));
    const mid=inset ? lerp(move(p),lerp(start,end,.5),Math.min(.5,inset*3.7)) : p;
    return [start,mid,end];
  });
}

function aperture(padding,radius) {
  const [x,y,X,Y]=entry;
  const centers=[[X+padding-radius,Y+padding-radius],[x-padding+radius,Y+padding-radius],
    [x-padding+radius,y-padding+radius],[X+padding-radius,y-padding+radius]];
  return centers.flatMap(([u,v],i)=>Array.from({length:4},(_,k)=>{
    const a=(i+k/3)*Math.PI/2;
    return [u+radius*Math.cos(a),v+radius*Math.sin(a)];
  }));
}

function ringStrip(levels,{inside=false,smooth=.55,skipJoin=false}={}) {
  const count=levels[0].points.length,geometry={vertices:[],indices:[]};
  for(const {points,z} of levels){
    for(let i=0;i<count;i++){
      // The top of the stair reveal ends at square corners.
      let before=i,after=i;
      do{before=(before+count-1)%count;}while(Math.hypot(...points[before].map((v,k)=>v-points[i][k]))<1e-8);
      do{after=(after+1)%count;}while(Math.hypot(...points[after].map((v,k)=>v-points[i][k]))<1e-8);
      const [nx,ny]=unit(points[after][1]-points[before][1],points[before][0]-points[after][0]);
      const d=Math.hypot(1,smooth);
      geometry.vertices.push(...points[i],z,(inside?-nx:nx)/d,(inside?-ny:ny)/d,-smooth/d);
    }
  }
  for(let r=1;r<levels.length;r++)for(let i=0;i<count;i++){
    const j=(i+1)%count,A=(r-1)*count+i,B=(r-1)*count+j,C=r*count+i,D=r*count+j;
    if(skipJoin&&[A,B].every(k=>geometry.vertices[k*6]>=cockpitOverheadJoin-1e-6))continue;
    geometry.indices.push(...(inside?[A,C,B,B,C,D]:[A,B,C,B,D,C]));
  }
  return geometry;
}

function roundFixture(x,y,profile,count=10) {
  const geometry={vertices:[],indices:[]};
  for(const [i,[r,z]] of profile.entries()){
    const low=profile[Math.max(i-1,0)],high=profile[Math.min(i+1,profile.length-1)];
    const [nz,nr]=unit(low[0]-high[0],high[1]-low[1]);
    for(let k=0;k<count;k++){
      const a=k*Math.PI*2/count,c=Math.cos(a),s=Math.sin(a);
      geometry.vertices.push(x+r*c,y+r*s,z,c*nr,s*nr,nz);
      if(i){
        const next=(k+1)%count,A=(i-1)*count+k,B=(i-1)*count+next,C=i*count+k,D=i*count+next;
        geometry.indices.push(A,B,C,B,D,C);
      }
    }
  }
  return geometry;
}

const circle=(x,y,r,count)=>Array.from({length:count},(_,i)=>[x+r*Math.cos(2*Math.PI*i/count),y+r*Math.sin(2*Math.PI*i/count)]);

export function furnishCockpitOverhead({decks,parts,face,add,remove}) {
  const deck=decks.find(p=>p.feature==='stair opening');
  const reveal=decks.find(p=>p.feature==='single white opening reveal');
  if(!deck||!reveal)return;
  const outline=captureDeck(deck,reveal);
  if(outline.length<4)throw Error('The cockpit ceiling needs a source perimeter');
  const landing=5.88;
  const outside=rim(outline,.080);
  const opening=aperture(.155,.222);
  function piece(g,material,label,finish){
    const part=add('UD_DCK_001',g,material,'cockpit ceiling '+label,false);
    if(finish)part.finish=finish;
  }
  const lowerFace=(polygon,z,holes=[])=>face(polygon,(x,y)=>({point:[x,y,z],normal:[0,0,-1]}),holes);
  piece(lowerFace(outside,landing,[opening]),'M60','satin panel field',[0xb7bdc7,.45,0,cockpitOverheadFinish]);
  piece(ringStrip([{points:outside,z:landing},{points:rim(outline,.025),z:5.946},
    {points:rim(outline,0),z:6}],{skipJoin:true}),
    'M37','rounded exterior fascia',[0xcdd4df,.31,0,0]);
  piece(ringStrip([{points:opening,z:landing},{points:aperture(.083,.116),z:5.928},
    {points:aperture(0,0),z:6}],{inside:true,smooth:.4}),
    'M60','moulded stair reveal',[0xaeb6c4,.37,0,0]);

  for(const p of parts.filter(p=>/^MD exterior flush downlight /.test(p.feature||'')))remove(p.anchor,q=>p===q);
  function plate(x,y,r,z,label,finish){
    piece(lowerFace(circle(x,y,r,12),z),'M60',label,finish);
  }
  for(const [i,[x,y]] of speakers.entries()){
    const r=.101;
    piece(roundFixture(x,y,[[r-.009,5.859],[r,landing]],12),
      'M60','round grille bevel '+(i+1),[0xc4cad3,.48,0,0]);
    plate(x,y,r-.009,5.859,'round grille face '+(i+1),[0x999faa,.62,0,0]);
  }
  for(const [i,[x,y,r,h]] of lamps.entries()){
    piece(roundFixture(x,y,[[r*.70,landing-h],[r*.79,landing-h+.013],[r,landing]],i?7:8),
      'M60','flared luminaire '+(i+1),[0xced2db,.38,0,0]);
    plate(x,y,r*.70,landing-h,'warm lens '+(i+1),[0xffe6bf,.52,0,48]);
  }
  for(const [i,[x,y]] of [portColumn,starboardColumn].entries()){
    const r=i?.062:.089;
    piece(roundFixture(x,y,[[r,5.87],[r+.016,landing]],8),
      'M19','polished column collar '+(i+1),[0xc4cad4,.16,.91,65]);
    plate(x,y,r,5.87,'column socket '+(i+1),[0x262c35,.28,.12,0]);
  }
  const [x,y]=portColumn;
  piece(roundFixture(x,y,[[.081,3.95],[.081,3.962],[.058,3.995],[.055,5.87]],10),
    'M19','port support column',[0xbfc9d8,.14,.97,65]);
}

const f=v=>v.toFixed(5), v2=p=>'vec2f('+p.map(f).join(',')+')';
const paths=seams.flatMap(line=>line.slice(1).map((p,i)=>[line[i],p]));
const darkRecesses=recesses.map(p=>`distance(uv,${v2(p)})`).reduce((a,b)=>`min(${a},${b})`);
const light=lamps.map(([x,y,r])=>`exp(-distance(uv,${v2([x,y])})/${f(r*1.2)})`).join('+');
const speakerDistance=speakers.map(p=>`distance(faceUV,${v2(p)})`).reduce((a,b)=>`min(${a},${b})`);

export function makeCockpitOverheadWGSL({portLip=[...portColumn,.105],portSocket=true}={}) {
 const rings=[...speakers.map(([x,y])=>[x,y,.102]),...lamps.map(([x,y,r])=>[x,y,r]),portLip,[...starboardColumn,.078]];
 const contact=rings.map(([x,y,r])=>`abs(distance(uv,${v2([x,y])})-${f(r)})`).reduce((a,b)=>`min(${a},${b})`);
 const wells=portSocket?[[portColumn,.089],[starboardColumn,.062]]:[[starboardColumn,.062]];
 const sockets=wells.map(([p,r])=>`(distance(uv,${v2(p)})-${f(r)})`).reduce((a,b)=>`min(${a},${b})`);
 return `
fn cockpitSegment(uv:vec2f,a:vec2f,b:vec2f)->f32{
  let d=b-a;
  return length(uv-a-d*clamp(dot(uv-a,d)/dot(d,d),0.,1.));
}
@diagnostic(off,derivative_uniformity)
fn cockpitPanelFinish(uv:vec2f,eye:vec3f,compact:bool)->vec2f{
  var joint=12.;
  ${paths.map(([a,b])=>`joint=min(joint,cockpitSegment(uv,${v2(a)},${v2(b)}));`).join('\n  ')}
  // Rounded gasket around the actual stair cut. Each family is measured in
  // the same deck coordinates, so highlights stay anchored during a walk.
  let edge=abs(uv-vec2f(6.575,2.21))-vec2f(1.56,.61);
  let surround=abs(length(max(edge,vec2f(0.)))+min(max(edge.x,edge.y),0.)-.28);
  joint=min(joint,surround);
  let aa=max(min(length(fwidth(uv))*.55,.024),.001);
  let groove=1.-smoothstep(.0025,.0025+aa,joint);
  let bevel=1.-smoothstep(.0025,.0025+aa,abs(joint-.0065));
  let screw=${darkRecesses};
  let opening=1.-smoothstep(.005,.005+aa,screw);
  let metal=1.-smoothstep(.004,.004+aa,abs(screw-.011));
  let contact=${contact};
  let shade=1.-.24*exp(-contact/.021);
  // The shallow transducer and optical pod occupy only a few pixels along
  // this route. Model their rounded edge, seating and recesses on the panel.
  let dome=distance(uv,vec2f(4.79,-.47));
  let domeLip=smoothstep(.033,.037,dome)*(1.-smoothstep(.043,.043+aa,dome));
  let podDelta=(uv-vec2f(4.332,-.640))/vec2f(.051,.033);
  let pod=length(podDelta);
  let podCoverage=1.-smoothstep(.90,1.+aa*21.,pod);
  let lens=min(distance(uv,vec2f(4.339,-.653)),distance(uv,vec2f(4.339,-.626)));
  let lensCoverage=1.-smoothstep(.007,.009+aa,lens);
  var warm=${light};
  let hardware=.37*domeLip*select(1.,-.7,uv.y<-.47);
  var value=(1.-.50*groove+.16*bevel-.81*opening+.16*metal)*shade+hardware+
    podCoverage*(.18-.40*podDelta.y)-.78*lensCoverage;
  if(compact){
    // Intersect the same sight ray with the faces below the panel. This
    // retains the shallow relief and changing silhouette without extra
    // indexed vertices for the small inset discs.
    let ray=(uv-eye.xy)/max(.12,5.88-eye.z);
    let faceUV=uv-ray*.021;
    let disc=${speakerDistance};
    let foot=${speakers.map(p=>`distance(uv,${v2(p)})`).reduce((a,b)=>`min(${a},${b})`)};
    let cap=1.-smoothstep(.090,.090+aa,disc);
    let ring=1.-smoothstep(.096,.103+aa,min(disc,foot));
    value=mix(value,mix(.99,.78,cap),ring);
    let socket=1.-smoothstep(-.001,aa,${sockets});
    value=mix(value,.22,socket);
    let lamp=distance(uv-ray*.021,${v2(lamps[2].slice(0,2))});
    value=mix(value,.87,1.-smoothstep(.025,.025+aa,lamp));
    warm+=4.0*(1.-smoothstep(.017,.017+aa,lamp));
  }
  return vec2f(value,warm);
}
`;
}

export const cockpitOverheadWGSL=makeCockpitOverheadWGSL();
