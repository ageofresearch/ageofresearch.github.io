import {aftCockpitTreads} from './aft-cockpit-stair.js?v=cockpit-risers-v1';

export const aftTeakFinish = 69;
export const plinthCorner = .111;

// Trace the caulk on the rectilinear Cockpit (Port) floorward view. Measure
// the stations as fractions of the wooden cap from port to starboard.
const plinthJoints = [.119, .181, .244, .307, .370, .434, .497, .561, .625, .689, .753, .817, .881];
const treadJoints = {first: .130, last: .899, count: 11};
const plinthNoseCuts = [.162, .781];
const timberTints = [-.02, .04, -.04, .018, -.027, .027, -.052, .041, -.018, -.014, .036, -.031, .025, -.042];
const f = n => n.toFixed(6);
const vec = a => `vec${a.length}f(${a.map(f).join(',')})`;
const row = fields => aftCockpitTreads.map(t => vec(fields(t))).join(',');
const count = aftCockpitTreads.length;

export const aftTeakWGSL = /* wgsl */ `
const aftTeakBounds = array<vec4f,${count}>(${row(t => [t.front,t.right,t.back,t.left])});
const aftTeakLevels = array<vec2f,${count}>(${row(t => [t.top,t.top-t.thickness])});

fn aftTeakIndex(height:f32)->i32{
  for(var i=0;i<${count-1};i++){
    if(height<aftTeakLevels[i].x+.03){return i;}
  }
  return ${count-1};
}

fn aftTeakSegment(p:vec2f,a:vec2f,b:vec2f)->f32{
  let edge=b-a;
  return length(p-a-edge*clamp(dot(p-a,edge)/dot(edge,edge),0.,1.));
}

fn aftTeakPaint(p:vec3f,normal:vec3f,index:i32,blur:f32)->vec3f{
  let bounds=aftTeakBounds[index];
  let level=aftTeakLevels[index];
  let depth=bounds.z-bounds.x;
  let width=bounds.y-bounds.w;
  // x follows the ascent. y runs across the flight from the port cheek.
  let q=vec2f(p.x-bounds.x,bounds.y-p.y);
  let side=min(q.y,width-q.y);
  let plinth=index==0;
  let threshold=index==${count-1};
  let horizontal=normal.y>.87 && p.z>level.x-.0015;
  let underside=normal.y<-.8;
  let frontLip=.008+select(0.,.002,plinth);
  let margins=select(vec3f(.026,.035,.030),vec3f(.071,.039,.061),plinth);
  let distance=vec3f(q.x,depth-q.x,side)-margins;
  var field=min(distance.x,distance.z);
  if(plinth){
    let round=.076;
    let corner=vec2f(round)-distance.xz;
    field=round-length(max(corner,vec2f(0.)))-min(max(corner.x,corner.y),0.);
  }
  let inside=min(field,distance.y);
  var caulkDistance=10.;
  var board=0.;
  var seam=10.;
  if(horizontal && !threshold){
    if(plinth){
      let marks=array<f32,${plinthJoints.length}>(${plinthJoints.map(f).join(',')});
      for(var i=0;i<${plinthJoints.length};i++){
        let delta=q.y-width*marks[i];
        seam=min(seam,abs(delta));
        board+=select(0.,1.,delta>0.);
      }
    }else{
      let spacing=width*${f((treadJoints.last-treadJoints.first)/(treadJoints.count-1))};
      let station=(q.y-width*${f(treadJoints.first)})/spacing;
      seam=spacing*abs(station-clamp(round(station),0.,${f(treadJoints.count-1)}));
      board=clamp(ceil(station),0.,${f(treadJoints.count)});
    }
    // A field joint stops at the frame. The end cuts belong to the frame.
    caulkDistance=min(abs(inside),max(seam,-inside));
    if(plinth){
      let shoulder=select(q.y,width-q.y,q.y>width*.5);
      caulkDistance=min(caulkDistance,aftTeakSegment(vec2f(q.x,shoulder),vec2f(depth,.095),vec2f(depth-margins.y,.128)));
      caulkDistance=min(caulkDistance,aftTeakSegment(vec2f(q.x,shoulder),vec2f(depth,.086),vec2f(depth-margins.y,.107)));
    }else{
      caulkDistance=min(caulkDistance,aftTeakSegment(vec2f(q.x,side),vec2f(frontLip,.007),vec2f(margins.x,margins.z)));
      caulkDistance=min(caulkDistance,aftTeakSegment(vec2f(q.x,side),vec2f(depth-.004,.007),vec2f(depth-margins.y,margins.z)));
    }
  }
  if(plinth && !underside && q.x<margins.x){
    let end=min(abs(q.y-width*${f(plinthNoseCuts[0])}),abs(q.y-width*${f(plinthNoseCuts[1])}));
    caulkDistance=min(caulkDistance,end);
  }
  let fieldWood=horizontal && !threshold && inside>0.;
  let sideRail=horizontal && !threshold && distance.z<min(distance.x,distance.y);
  let alongFlight=fieldWood || sideRail || (!horizontal && abs(normal.x)>.75);
  let along=select(q.y,q.x,alongFlight);
  let cross=select(select(p.z,q.x,horizontal),q.y,alongFlight);
  let seed=f32(index)*7.23+select(.6,board,fieldWood)*1.37;
  let drift=sin(along*12.+seed)+.22*sin(along*41.+seed*.36);
  let streak=.039*sin(cross*431.+drift)+.024*sin(cross*863.+drift*1.9+seed);
  let pores=.019*sin(cross*1951.+drift*2.6+along*107.);
  let grain=.055*sin(cross*131.+seed+.49*sin(along*19.))+streak+pores;
  let usable=1.-smoothstep(.001,.006,blur);
  let boardTone=array<f32,${timberTints.length}>(${timberTints.map(f).join(',')});
  let tint=select(0.,boardTone[i32(board)],fieldWood);
  let fascia=(1.-smoothstep(.0004,.0018+blur,abs(level.x-p.z-.023)))*select(0.,.066,plinth && !horizontal && normal.z<-.3);
  let shade=1.+tint+.032*sin(seed+along*9.)+grain*usable-fascia;
  let teak=mix(vec3f(.487,.360,.247),vec3f(.529,.417,.305),select(.18,.68,fieldWood));
  let joint=1.-smoothstep(select(.0008,.00115,plinth)-blur*.20,select(.00150,.00195,plinth)+blur,caulkDistance);
  return mix(teak*shade,vec3f(.036,.030,.026),joint*.96);
}

fn aftTeakCovers(p:vec2f,index:i32,up:bool)->bool{
  let bounds=aftTeakBounds[index];
  let inset=select(0.,select(.006,.008,index==0),up);
  if(!all(p>=bounds.xw+inset) || !all(p<=bounds.zy-inset)){return false;}
  if(index==0){
    let w=bounds.y-bounds.w;
    let y=bounds.y-p.y;
    let corner=${f(plinthCorner)};
    let q=vec2f(bounds.x+corner-p.x,corner-min(y,w-y));
    return length(max(q,vec2f(0.)))<=corner-inset;
  }
  return true;
}

fn aftTeakReflection(p:vec3f,up:bool,rough:f32,distance:f32,index:i32)->vec3f{
  let normal=vec3f(0.,select(-1.,1.,up),0.);
  let blur=clamp(rough*distance*.036,.0007,.007);
  return aftTeakPaint(p,normal,index,blur)*select(.18,.43,up);
}
`;
