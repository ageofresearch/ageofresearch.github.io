// Model-space hoist follows the actual inclined staff. The rest mesh also
// carries material coordinates: they remain recoverable on either face.
export function flagCloth(foot, grid) {
  return grid(16, 5, (u,v) => {
    const z = 7.48 - .51*v;
    return [foot-.22*(z-6.19)/1.43, .013+.77*u, z-.095*u*u];
  }, {both:true});
}

// All displacements are in yacht-local GPU axes (transverse, up, longitudinal).
// The phase is a function of simulation time, independent of the walk profile.
export const flagUV = pos => `vec2f(clamp((${pos}.x/.982894737-.013)/.77,0.,1.),
  clamp((7.48-(${pos}.y+2.01)-.095*pow(clamp((${pos}.x/.982894737-.013)/.77,0.,1.),2.))/.51,0.,1.))`;

export function flagVertex(pos, normal, uv, time) {
  return `
  let u=${uv}.x; let vcoord=${uv}.y; let clock=${time};
  let gust=.76+.24*sin(.73*clock+.55*sin(.27*clock));
  let phase=8.1*u-2.65*clock+.84*vcoord+.42*sin(.87*clock);
  let ripple=14.*u-3.8*clock-2.4*vcoord;
  let crease=16.*u+4.4*vcoord-1.8*clock;
  let twist=.70+.55*vcoord;
  let flap=gust*twist*(.080*sin(phase)+.022*sin(ripple))+.008*sin(crease);
  let lift=.037*gust*sin(phase-.8)+.019*sin(.73*clock);
  let tuck=.033*gust*(1.-cos(phase));
  ${normal ? `let du=vec3f(.77*.982894737-u*.033*gust*8.1*sin(phase)-tuck,-.19*u+lift+u*.037*gust*8.1*cos(phase-.8),
    flap+u*(gust*twist*(.080*8.1*cos(phase)+.022*14.*cos(ripple))+.008*16.*cos(crease)));
  let dv=vec3f(-u*.033*gust*.84*sin(phase),-.51+u*.037*gust*.84*cos(phase-.8),
    .51*.22/1.43*.978611111+u*(gust*(twist*(.080*.84*cos(phase)-.022*2.4*cos(ripple))+.55*(.080*sin(phase)+.022*sin(ripple)))+.008*4.4*cos(crease)));
  let side=select(1.,-1.,${normal}.z>0.);
  ${normal}=side*normalize(cross(du,dv));` : ''}
  ${pos}+=vec3f(-u*tuck,u*lift,u*flap);
  `;
}

// A five-pointed star as ten directed edges. Reflect into a single 72°
// sector and measure distance to the tip-to-notch edge in cloth metres.
export const flagPaint = `
 let st=flagUV; let aa=max(fwidth(st),vec2f(.0001));
 let halfUV=smoothstep(vec2f(.5)-aa*.5,vec2f(.5)+aa*.5,st);
 let ivory=vec3f(.87,.85,.80); let blue=vec3f(.018,.083,.30); let red=vec3f(.66,.016,.034);
 var dye=mix(mix(ivory,red,halfUV.x),mix(blue,ivory,halfUV.x),halfUV.y);
 let starCentre=select(vec2f(.25),vec2f(.75),st.x+st.y>1.);
 let delta=(st-starCentre)*vec2f(.77,-.51);
 var folded=vec2f(abs(delta.x),delta.y);
 // Reflection about the 108°, 72° and 36° axes preserves the star outline.
 let n108=vec2f(-.30901699,-.95105652);
 let n72=vec2f(.30901699,-.95105652);
 let n36=vec2f(.80901699,-.58778525);
 folded-=2.*max(0.,dot(folded,n108))*n108;
 folded-=2.*max(0.,dot(folded,n72))*n72;
 folded-=2.*max(0.,dot(folded,n36))*n36;
 let edge=vec2f(.01465,-.04484);
 let sd=dot(folded-vec2f(0.,.065),normalize(vec2f(-edge.y,edge.x)));
 let star=1.-smoothstep(-max(fwidth(sd),.0001)*.5,max(fwidth(sd),.0001)*.5,sd);
 dye=mix(dye,select(blue,red,starCentre.x>.5),star);
 let clothEdge=min(st,1.-st)*vec2f(.77,.51);
 let seam=min(abs(min(clothEdge.x,clothEdge.y)-.008),abs(st.x-.012)*.77);
 let hem=1.-smoothstep(.0006,.0018+max(aa.x*.77,aa.y*.51),seam);
 let threads=st*vec2f(265.,175.);
 let weave=dot(cos(6.2831853*threads)*(1.-smoothstep(vec2f(.12),vec2f(.48),fwidth(threads))),vec2f(.012));
 dye*=1.+weave-.065*hem;
`;

// One atlas slice holds the anti-aliased emblem and the cloth finish. Keep
// a small border around both panels for bilinear filtering at the fly edge.
export function flagTexel(x,y) {
  const u=Math.max(0,Math.min(1,((x%256)+.5-4)/248));
  const v=Math.max(0,Math.min(1,(y+.5-4)/248));
  if(x>=256){
    const border=Math.min(u*.77,(1-u)*.77,v*.51,(1-v)*.51);
    const seam=Math.min(Math.abs(border-.008),Math.abs(u-.012)*.77);
    const hem=Math.max(0,1-seam/.0025);
    const yarn=.012*(Math.cos(u*2*Math.PI*91)+Math.cos(v*2*Math.PI*67));
    return Math.round(244*(1+yarn-.065*hem));
  }
  const centre=u+v>1?.75:.25;
  const dx=(u-centre)*.77,dy=(centre-v)*.51;
  const sector=2*Math.PI/5,angle=Math.atan2(dx,dy);
  const folded=Math.abs(angle-Math.round(angle/sector)*sector),r=Math.hypot(dx,dy);
  const sd=(r*Math.sin(folded)*.04484+(r*Math.cos(folded)-.065)*.01465)/Math.hypot(.04484,.01465);
  return Math.round(255*Math.max(0,Math.min(1,.5-sd/.0025)));
}

export const mobileFlagPaint = `
 let st=in.uv;let aa=max(fwidth(st),vec2f(.0001));
 let halves=smoothstep(vec2f(.5)-aa*.5,vec2f(.5)+aa*.5,st);
 let ivory=vec3f(.87,.85,.80);let blue=vec3f(.018,.083,.30);let red=vec3f(.66,.016,.034);
 var dye=mix(mix(ivory,red,halves.x),mix(blue,ivory,halves.x),halves.y);
 let atlasUV=(st*248.+4.)/vec2f(512.,256.);
 let emblem=textureSample(tiles,tileSampler,atlasUV,19).r;
 let fabric=textureSample(tiles,tileSampler,atlasUV+vec2f(.5,0.),19).r;
 dye=mix(dye,select(blue,red,st.x+st.y>1.),emblem)*(255./244.)*fabric;
`;

// Clip-space rectangle of the complete sweep, used by stationary coverage and
// by frame reuse. Only invoked for profiles which actually carry the cloth.
export function flagRect(m, box, width, height) {
  let left=Infinity,right=-Infinity,bottom=Infinity,top=-Infinity,front=false,behind=false;
  for(let i=0;i<8;i++){
    const x=box[i&1?3:0],y=box[i&2?4:1],z=box[i&4?5:2];
    const w=m[3]*x+m[7]*y+m[11]*z+m[15];
    if(w<=.001){behind=true;continue;}
    front=true;
    const u=(m[0]*x+m[4]*y+m[8]*z+m[12])/w,v=(m[1]*x+m[5]*y+m[9]*z+m[13])/w;
    left=Math.min(left,u);right=Math.max(right,u);bottom=Math.min(bottom,v);top=Math.max(top,v);
  }
  if(!front)return null;
  if(behind)return [-1,-1,1,1];
  const padX=4/width,padY=4/height;
  if(right < -1-padX || left > 1+padX || top < -1-padY || bottom > 1+padY)return null;
  return [left-padX,bottom-padY,right+padX,top+padY];
}

// An opaque triangle can prove that a deck or bulkhead hides the complete
// sweep. Build its shadow cone from each corner once. A viewer in all eight
// cones can reuse the stationary frame even when facing aft from indoors.
export function flagOcclusion(positions, indices, range, box, surfaces) {
  const sub=(a,b)=>a.map((v,i)=>v-b[i]);
  const cross=([x,y,z],[X,Y,Z])=>[y*Z-z*Y,z*X-x*Z,x*Y-y*X];
  const dot=(a,b)=>a[0]*b[0]+a[1]*b[1]+a[2]*b[2];
  const corners=Array.from({length:8},(_,i)=>[box[i&1?3:0],box[i&2?4:1],box[i&4?5:2]]);
  const candidates=[];
  const [start,count]=range;
  for(let i=start;i<start+count;i+=3){
    const a=indices[i],b=indices[i+1],c=indices[i+2];
    // The sky moves and the water never separates the viewer from the flag.
    const code=surfaces[a*4+2];
    if(code>=44 && code<=49 || code===54)continue;
    const A=positions.subarray(a*3,a*3+3), B=positions.subarray(b*3,b*3+3), C=positions.subarray(c*3,c*3+3);
    const normal=cross(sub(B,A),sub(C,A)),area=dot(normal,normal);
    if(area<1 || !corners.every(p=>dot(normal,sub(p,A))<-.001))continue;
    candidates.push({area,points:[A,B,C],normal});
  }
  const planes=[];
  for(const {points,normal} of candidates.sort((a,b)=>b.area-a.area).slice(0,192)){
    planes.push(...normal,-dot(normal,points[0]));
    for(let edge=0;edge<3;edge++){
      const a=points[edge],b=points[(edge+1)%3];
      for(const p of corners){
        const n=cross(sub(a,p),sub(b,p));
        planes.push(...n,-dot(n,a));
      }
    }
  }
  let lastX,lastY,lastZ,hidden=false;
  return ({x,y,z})=>{
    if(x===lastX && y===lastY && z===lastZ)return hidden;
    lastX=x;lastY=y;lastZ=z;hidden=false;
    for(let i=0;i<planes.length;i+=100){
      let j=i;
      for(;j<i+100;j+=4)
        if(planes[j]*x+planes[j+1]*y+planes[j+2]*z+planes[j+3]<.001)break;
      if(j===i+100){hidden=true;break;}
    }
    return hidden;
  };
}
