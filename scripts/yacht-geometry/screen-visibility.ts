// AssemblyScript. Rebuild with npm run screen-visibility in this directory.
// Coordinates increase upwards inside the filter. Each sample offset below is
// the WebGPU 4× standard pattern reflected about the horizontal pixel center.
@inline function point(base: usize, id: u16): usize { return base + (<usize>id << 4); }
@inline function facePoint(base: usize, face: usize, corner: usize): usize {
  return point(base, load<u16>(face + corner * 2));
}

export function collectVertices(indices: usize, count: i32, unique: usize, seen: usize, vertices: i32): i32 {
  memory.fill(seen, 0, vertices);
  let length = 0;
  for (let i = 0; i < count; i++) {
    const vertex = load<u16>(indices + i * 2);
    if (!load<u8>(seen + vertex)) {
      store<u8>(seen + vertex, 1);
      store<u16>(unique + length++ * 2, vertex);
    }
  }
  return length;
}

// Each center is in thirty-seconds of a pixel. The radius encloses all vertex
// positions allowed by transform error and the calibrated raster precision.
function project(source: usize, unique: usize, count: i32, matrix: usize, projected: usize, grid: usize,
                 width: i32, height: i32, precision: i32): void {
  const x0=load<f32>(matrix), x1=load<f32>(matrix+16), x2=load<f32>(matrix+32), xt=load<f32>(matrix+48);
  const y0=load<f32>(matrix+4), y1=load<f32>(matrix+20), y2=load<f32>(matrix+36), yt=load<f32>(matrix+52);
  const w0=load<f32>(matrix+12), w1=load<f32>(matrix+28), w2=load<f32>(matrix+44), wt=load<f32>(matrix+60);
  for (let i=0; i<count; i++) {
    const id=load<u16>(unique+i*2), p=point(source,id), g=point(grid,id);
    const x=load<f32>(p), y=load<f32>(p+4), z=load<f32>(p+8);
    const w=w0*x+w1*y+w2*z+wt;
    // Keep sky, near-plane crossings and distant clipped triangles untouched.
    if (w<.065 || w>80 || load<u32>(p+12)) { store<i32>(g+12,16); continue; }
    const sx=(x0*x+x1*y+x2*z+xt)/w, sy=(y0*x+y1*y+y2*z+yt)/w;
    const px:f32=(1+sx)*(<f32>width*.5), py:f32=(1+sy)*(<f32>height*.5);
    let mask=(px< -1?1:0)|(px > <f32>width+1?2:0)|(py< -1?4:0)|(py > <f32>height+1?8:0);
    if (px<=1 || py<=1 || px >= <f32>width-1 || py >= <f32>height-1) mask|=32;
    store<i32>(g+12,mask);
    const at=point(projected,id);
    store<f32>(at,px); store<f32>(at+4,py); store<f32>(at+8,1/w);
    const wa=abs(w0*x)+abs(w1*y)+abs(w2*z)+abs(wt);
    const dx:f32=.0005+(abs(x0*x)+abs(x1*y)+abs(x2*z)+abs(xt)+abs(sx)*wa)*<f32>width*.0000006/w;
    const dy:f32=.0005+(abs(y0*x)+abs(y1*y)+abs(y2*z)+abs(yt)+abs(sy)*wa)*<f32>height*.0000006/w;
    // The occluder erosion assumes at most one eighth of a pixel of total
    // projection and snapping error. Preserve numerically unstable edges.
    if (dx>.06 || dy>.06) { store<i32>(g+12,64); continue; }
    if (mask) continue;
    const xl=precision==16?nearest((px-dx)*16):floor((px-dx)*16);
    const xh=precision==16?nearest((px+dx)*16):ceil((px+dx)*16);
    const yl=precision==16?nearest((py-dy)*16):floor((py-dy)*16);
    const yh=precision==16?nearest((py+dy)*16):ceil((py+dy)*16);
    store<i32>(g,<i32>(xl+xh)); store<i32>(g+4,<i32>(yl+yh));
    store<i32>(g+8,<i32>max(xh-xl,yh-yl));
  }
}

// Store a conservative minimum inverse depth for whole 8×8 pixel tiles.
// A second table can certify an individual sample near an occluder's edge.
function buildOccluders(indices: usize, count: i32, projected: usize, grid: usize,
                        partial: usize, full: usize, faces: usize, cols: i32, rows: i32): void {
  memory.fill(partial,0,cols*rows*8);
  for (let i=0; i<count; i+=3) {
    const face=indices+i*2, ia=load<u16>(face), ib=load<u16>(face+2), ic=load<u16>(face+4);
    const ma=load<i32>(point(grid,ia)+12), mb=load<i32>(point(grid,ib)+12), mc=load<i32>(point(grid,ic)+12);
    if (((ma|mb|mc)&80) || (ma&mb&mc&15)) continue;
    const a=point(projected,ia), b=point(projected,ib), c=point(projected,ic);
    const ax=load<f32>(a), ay=load<f32>(a+4), bx=load<f32>(b), by=load<f32>(b+4), cx=load<f32>(c), cy=load<f32>(c+4);
    const ux=bx-ax, uy=by-ay, vx=cx-ax, vy=cy-ay, det=ux*vy-uy*vx;
    if (det<128) continue;
    const denom=det-.18*(abs(ux)+abs(uy)+abs(vx)+abs(vy)+.4);
    if (denom<=0) continue;
    const za=load<f32>(a+8), db=load<f32>(b+8)-za, dc=load<f32>(c+8)-za;
    const nx=db*vy-dc*uy, ny=ux*dc-vx*db, gx=nx/det, gy=ny/det;
    const guard:f32=.0004+7*(abs(nx)+abs(ny)+.36*(abs(db)+abs(dc)))/denom;
    const left=max(0,<i32>ceil(min(ax,min(bx,cx))*.125-.5)), right=min(cols-1,<i32>floor(max(ax,max(bx,cx))*.125-.5));
    const bottom=max(0,<i32>ceil(min(ay,min(by,cy))*.125-.5)), top=min(rows-1,<i32>floor(max(ay,max(by,cy))*.125-.5));
    for (let y=bottom; y<=top; y++) {
      const py=<f32>y*8+4, e1=ux*(py-ay), e2=(vx-ux)*(py-by), e3=-vx*(py-cy);
      for (let x=left; x<=right; x++) {
        const px=<f32>x*8+4, at=((y*cols+x)<<2);
        const m1=e1-uy*(px-ax), m2=e2-(vy-uy)*(px-bx), m3=e3+vy*(px-cx);
        if (m1<=0 || m2<=0 || m3<=0) continue;
        const depth=za+gx*(px-ax)+gy*(py-ay)-guard;
        if (depth>load<f32>(partial+at)) { store<f32>(partial+at,depth); store<usize>(faces+at,face); }
        if (depth<=load<f32>(full+at)) continue;
        const ra=abs(px-ax)+abs(py-ay), rb=abs(px-bx)+abs(py-by), rc=abs(px-cx)+abs(py-cy);
        if (m1>4.25*(abs(ux)+abs(uy))+.1*(ra+rb) && m2>4.25*(abs(vx-ux)+abs(vy-uy))+.1*(rb+rc) &&
            m3>4.25*(abs(vx)+abs(vy))+.1*(ra+rc)) store<f32>(full+at,depth);
      }
    }
  }
}

function insideOccluder(face: usize, projected: usize, px: f32, py: f32): bool {
  for (let i=0; i<3; i++) {
    const a=facePoint(projected,face,i), b=facePoint(projected,face,(i+1)%3);
    const ax=load<f32>(a), ay=load<f32>(a+4), bx=load<f32>(b), by=load<f32>(b+4);
    const dx=bx-ax, dy=by-ay, edge=dx*(py-ay)-dy*(px-ax);
    if (edge<=.13*(abs(px-ax)+abs(py-ay)+abs(px-bx)+abs(py-by)+abs(dx)+abs(dy))+.02) return false;
  }
  return true;
}

function upperDepth(face: usize, projected: usize, ux: i32, uy: i32, vx: i32, vy: i32, h: i32, snapped: i32): f32 {
  if (snapped<=0) return 1e30;
  const a=facePoint(projected,face,0), b=facePoint(projected,face,1), c=facePoint(projected,face,2);
  const za=load<f32>(a+8), zb=load<f32>(b+8), zc=load<f32>(c+8);
  const dx=load<f32>(b)-load<f32>(a), dy=load<f32>(b+4)-load<f32>(a+4);
  const ex=load<f32>(c)-load<f32>(a), ey=load<f32>(c+4)-load<f32>(a+4), det=abs(dx*ey-dy*ex);
  if (det<=.00001) return 1e30;
  // A nearly edge-on face can acquire a much steeper depth slope after
  // vertex rounding. Bound both planes before hiding any of its samples.
  const db=zb-za, dc=zc-za;
  const smooth=(abs(db*ey-dc*dy)+abs(dx*dc-ex*db))/det;
  const rounded=(abs(db*<f32>vy-dc*<f32>uy)+abs(<f32>ux*dc-<f32>vx*db)+
    <f32>h*4*(abs(db)+abs(dc)))*32/<f32>snapped;
  return max(za,max(zb,zc))+.0003+2.1*max(smooth,rounded);
}

function keepFace(face: usize, projected: usize, grid: usize, partial: usize, full: usize, faces: usize, cols: i32, depthTest: bool): bool {
  const a=facePoint(grid,face,0), b=facePoint(grid,face,1), c=facePoint(grid,face,2);
  const ma=load<i32>(a+12), mb=load<i32>(b+12), mc=load<i32>(c+12);
  if (ma&mb&mc&15) return false;
  if (ma|mb|mc) return true;
  const ax=load<i32>(a), ay=load<i32>(a+4), bx=load<i32>(b), by=load<i32>(b+4), cx=load<i32>(c), cy=load<i32>(c+4);
  const ux=bx-ax, uy=by-ay, vx=cx-ax, vy=cy-ay, ex=vx-ux, ey=vy-uy;
  const ha=load<i32>(a+8), hb=load<i32>(b+8), hc=load<i32>(c+8), h=max(ha,max(hb,hc));
  const area=ux*vy-uy*vx, perimeter=abs(ux)+abs(uy)+abs(vx)+abs(vy)+abs(ex)+abs(ey), error=h*(perimeter+6*h);
  if (area < -error) return false;
  const left=min(ax,min(bx,cx))-h, right=max(ax,max(bx,cx))+h, bottom=min(ay,min(by,cy))-h, top=max(ay,max(by,cy))+h;
  const large=area>=perimeter*24 || (right-left)*(top-bottom)>=1024*140 || right-left>=2048 || top-bottom>=2048;
  if (!depthTest && large) return true;
  let upper:f32=0;
  if (depthTest) {
    const tx0=left>>8, tx1=right>>8, ty0=bottom>>8, ty1=top>>8;
    upper=upperDepth(face,projected,ux,uy,vx,vy,h,abs(area)-error);
    let covered=tx1-tx0<12 && ty1-ty0<12;
    for (let y=ty0; covered && y<=ty1; y++) for (let x=tx0; x<=tx1; x++) {
      if (load<f32>(full+((y*cols+x)<<2))<=upper) { covered=false; break; }
    }
    if (covered) return false;
    if (large) {
      if (tx0!=tx1 || ty0!=ty1) return true;
      const at=((ty0*cols+tx0)<<2);
      if (load<f32>(partial+at)<=upper) return true;
      const occ=load<usize>(faces+at);
      return !(insideOccluder(occ,projected,<f32>ax/32,<f32>ay/32) && insideOccluder(occ,projected,<f32>bx/32,<f32>by/32) &&
               insideOccluder(occ,projected,<f32>cx/32,<f32>cy/32));
    }
  }
  for (let sample=0; sample<4; sample++) {
    const ox=sample==0?12:sample==1?28:sample==2?4:20, oy=28-8*sample;
    const xMin=(left-ox+31)>>5, xMax=(right-ox)>>5, yMin=(bottom-oy+31)>>5, yMax=(top-oy)>>5;
    for (let y=yMin; y<=yMax; y++) for (let x=xMin; x<=xMax; x++) {
      const dx=(x<<5)+ox-ax, dy=(y<<5)+oy-ay, dbx=dx-ux, dby=dy-uy, dcx=dx-vx, dcy=dy-vy;
      const ea=ux*dy-uy*dx, eb=ex*dby-ey*dbx, ec=vy*dcx-vx*dcy;
      if (!h) { if (ea<0 || eb<0 || ec<0) continue; }
      else {
        const pa=abs(dx)+abs(dy), pb=abs(dbx)+abs(dby), pc=abs(dcx)+abs(dcy);
        if (ea< -(ha*pb+hb*pa+2*ha*hb) || eb< -(hb*pc+hc*pb+2*hb*hc) || ec< -(hc*pa+ha*pc+2*hc*ha)) continue;
      }
      if (!depthTest) return true;
      const at=(((y>>3)*cols+(x>>3))<<2);
      if (load<f32>(full+at)>upper) continue;
      if (load<f32>(partial+at)<=upper ||
          !insideOccluder(load<usize>(faces+at),projected,<f32>x+<f32>ox/32,<f32>y+<f32>oy/32)) return true;
    }
  }
  return false;
}

export function filter(source: usize, unique: usize, vertexCount: i32, indices: usize, count: i32,
                       matrix: usize, projected: usize, grid: usize, tiles: usize, output: usize,
                       width: i32, height: i32, precision: i32, depthTest: bool): i32 {
  project(source,unique,vertexCount,matrix,projected,grid,width,height,precision);
  const cols=(width+7)>>3, rows=(height+7)>>3, bytes=cols*rows*4;
  const full=tiles+bytes, faces=full+bytes;
  if (depthTest) buildOccluders(indices,count,projected,grid,tiles,full,faces,cols,rows);
  let length=0;
  for (let i=0; i<count; i+=3) {
    const face=indices+i*2;
    if (keepFace(face,projected,grid,tiles,full,faces,cols,depthTest)) {
      store<u32>(output+length*2,load<u32>(face));
      store<u16>(output+length*2+4,load<u16>(face+4)); length+=3;
    }
  }
  return length;
}

// Project the transparent panes into the opaque pass's existing depth grid.
// Only opaque triangles can prove occlusion. The surviving panes keep their
// original indices and blend order, including panes in front of other glass.
export function filterGlass(source: usize, unique: usize, vertexCount: i32, indices: usize, count: i32,
                            matrix: usize, projected: usize, grid: usize, tiles: usize, output: usize,
                            width: i32, height: i32, precision: i32, base: i32): i32 {
  project(source,unique,vertexCount,matrix,projected,grid,width,height,precision);
  const cols=(width+7)>>3, bytes=cols*((height+7)>>3)*4;
  let length=0;
  for(let i=0;i<count;i+=3){
    const face=indices+i*2;
    if(keepFace(face,projected,grid,tiles,tiles+bytes,tiles+bytes*2,cols,true)){
      for(let j=0;j<3;j++)store<u16>(output+2*length++,load<u16>(face+2*j)-base);
    }
  }
  return length;
}
