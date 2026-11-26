import {furnishOwnerSuite} from './owner-suite.js?v=owner-suite-1';

// Registered to the Galley, Day Head, Master Cabin, Master Head and Master Shower panoramas.
export function furnishMainDeck({box,add,remove,slab,outline,circle}){
  function panel(anchor,bounds,mat,label,r=.006){add(anchor,box(bounds,Math.min(r,...bounds.slice(3).map((v,i)=>(v-bounds[i])*.35))),mat,label);}
  function oval(anchor,x,y,w,d,z,Z,mat,label){
    add(anchor,slab(outline(x,y,w,d,Math.min(w,d)*.44),z,Z,.003),mat,label);
  }
  const galley='MD_FUR_035',bath='MD_FUR_055';
  // Tile the finish between the existing partitions, beams and stair coamings.
  // Adjacent strips meet edge to edge. Every slab has a closed perimeter.
  function lining(anchor,strips,bottom,top,material,label){
    for(const [i,[x,y,X,Y]] of strips.entries())
      add(anchor,slab([[x,y],[X,y],[X,Y],[x,Y]],bottom,top,0),material,label+' '+(i+1));
  }
  // The galley entrance is visible from the dining side of the transverse bulkhead.
  remove('MD_PAR_001',p=>!p.id.endsWith('/002'));remove('MD_FUR_014',p=>p.feature==='salon port walnut bulkhead facing');
  for(const [lo,hi] of [[.39,1.7],[2.62,2.89]]){
    panel('MD_PAR_001',[17.81,lo,3.95,17.91,hi,5.86],'M96','galley entrance walnut jamb '+lo);
  }
  for(const [lo,hi] of [[.68,1.7],[2.62,2.89]])
    panel('MD_PAR_001',[17.798,lo,3.956,17.81,hi,4.012],'M08','galley jamb skirting '+lo);
  panel('MD_PAR_001',[17.81,1.7,5.72,17.91,2.62,5.86],'M96','galley entrance lintel');
  // The source cabinet already has a cut-out. Finish up to the four edges
  // of the stainless rim, leaving the original recessed bowl and drain visible.
  lining(galley,[[20.13,2.301,20.652,2.815],[21.101,2.301,21.32,2.815],
    [20.652,2.301,21.101,2.388],[20.652,2.763,21.101,2.815]],
    4.85,4.861,'M26','galley dark stone worktop');
  panel(galley,[21.53,1.59,4.85,22.29,2.69,4.879],'M26','galley return worktop');
  panel(galley,[21.525,1.72,4.14,21.545,2.29,4.65],'M19','oven brushed surround');
  panel(galley,[21.508,1.76,4.20,21.525,2.25,4.57],'M47','oven glazed door');
  panel(galley,[21.483,1.79,4.58,21.523,2.22,4.61],'M19','oven bar handle');
  for(const x of [20.17,20.55,20.93]){
    panel(galley,[x,2.281,4.03,x+.36,2.299,4.78],'M23','galley flush lower door '+x);
    panel(galley,[x,2.63,5.46,x+.36,2.815,5.80],'M23','galley overhead locker '+x);
  }
  panel(galley,[20.16,2.64,5.45,21.32,2.66,5.463],'M99','galley concealed work light');
  panel('MD_FUR_040',[20.83,-3.06,4.89,21.39,-3.045,5.57],'M20','day head mirror');
  panel('MD_FUR_040',[20.83,-3.057,5.57,21.39,-3.005,5.60],'M99','day head vanity light');

  // The stair vestibule opens into the longitudinal corridor on the dining deck.
  remove('MD_PAR_005');
  panel('MD_PAR_005',[19.59,-1.84,3.95,19.67,.39,5.86],'M39','corridor return wall');
  panel('MD_PAR_005',[19.59,1.33,3.95,19.67,1.43,5.86],'M96','corridor timber jamb');
  panel('MD_PAR_005',[19.59,.39,5.73,19.67,1.33,5.86],'M39','corridor door head');
  const galleyStrips=[[18.01,1.721,19.634,2.815],[19.634,1.49,22.36,2.815]];
  lining(galley,galleyStrips,3.951,3.958,'M47','galley charcoal floor');
  panel(galley,[20.42,.22,3.951,22.36,1.49,3.958],'M47','galley return floor');
  lining(galley,galleyStrips,5.815,5.85,'M107','galley ivory overhead');
  panel(galley,[21.53,1.62,5.45,22.30,1.93,5.80],'M39','cooker hood housing');
  panel(galley,[21.55,1.61,5.42,22.27,1.94,5.45],'M19','brushed hood underside');
  // The Crew Entrance panorama shows two front loaders beneath one timber return.
  const laundryFront=21.88, z=3.98;
  panel(galley,[laundryFront+.045,.29,3.96,22.36,1.55,4.78],'M39','service laundry cabinet');
  panel(galley,[laundryFront-.032,.28,4.78,22.36,1.56,4.83],'M96','service laundry counter');
  panel(galley,[22.13,.29,4.83,22.36,1.55,5.30],'M96','service overhead cabinet');
  for(const [i,y] of [.61,1.23].entries()){
    panel(galley,[laundryFront+.018,y-.308,z,laundryFront+.045,y+.308,z+.80],'M107','service appliance front '+i);
    function disc(cy,cz,r,x0,x1,mat,label){
      const g=slab(circle(cy,cz,r,24),x0,x1,0);
      for(let j=0;j<g.vertices.length;j+=6){
        const [v,h,x,nv,nh,nx]=g.vertices.slice(j,j+6);
        g.vertices.splice(j,6,x,v,h,nx,nv,nh);
      }
      add(galley,g,mat,label+' '+i);
    }
    disc(y,z+.345,.238,laundryFront-.004,laundryFront+.018,'M19','laundry door bezel');
    disc(y,z+.345,.203,laundryFront-.011,laundryFront-.004,'M47','laundry drum glass');
    disc(y,z+.337,.157,laundryFront-.014,laundryFront-.011,'M113','laundry inner drum');
    disc(y+.163,z+.681,.042,laundryFront-.004,laundryFront+.018,'M19','laundry selector');
    panel(galley,[laundryFront+.012,y-.22,z+.627,laundryFront+.018,y+.061,z+.72],'M47','laundry display '+i);
  }
  const dayHeadStrips=[[20.454,-3.003,20.502,-2.18],[20.502,-3.13,21.617,-2.18],[21.617,-3.13,22.13,-2.66],[21.617,-2.573,22.13,-2.18]];
  lining('MD_FUR_040',dayHeadStrips,3.951,3.962,'M115','day head stone floor');
  lining('MD_FUR_040',dayHeadStrips,5.80,5.83,'M107','day head overhead');
  // The forward dresser and aft settee cross the two photographed doorways in the schematic model.
  for(const a of ['MD_FUR_044','MD_FUR_045','MD_SOF_014','MD_FUR_054'])remove(a);
  furnishOwnerSuite({box,add,remove,slab,outline,circle});
  // One bathroom spans the beam. The separate shower sits opposite the vanity.
  for(const anchor of ['MD_PAR_019','MD_FUR_056','MD_GLA_002','MD_SAN_019','MD_SAN_020','MD_SAN_021','MD_SAN_022','MD_SAN_023','MD_SAN_024','MD_SAN_025','MD_SAN_026','MD_SAN_027'])remove(anchor);
  // Extend the original sink cabinet along the wall, leaving its recessed bowl open.
  panel(bath,[28.79,-.62,3.96,29.19,1.391,4.74],'M115','stone vanity apron',.026);
  lining(bath,[[28.71,-.65,29.23,1.41],[28.71,1.78,29.23,1.95]],
    4.74,4.798,'M115','stone vanity ledge');
  panel(bath,[29.20,-.66,4.88,29.23,1.96,5.70],'M20','mirror above stone ledge');
  panel(bath,[29.12,-.60,5.71,29.20,1.90,5.74],'M99','mirror concealed light');
  panel(bath,[27.32,-2.35,3.955,28.284,-1.32,3.966],'M115','flush shower stone tray');
  panel(bath,[27.66,-2.14,3.967,27.98,-2.11,3.972],'M19','shower linear drain');
  // The centre bay contains the modeled stair coaming. Keep its footprint exposed.
  const wings=[[27.25,-2.36,28.284,-.688],[28.313,-2.36,29.238,-.688],
    [27.25,.67,29.238,2.24],[27.25,-.688,27.258,.67],[28.434,-.688,29.238,.67]];
  lining(bath,wings,3.951,3.954,'M115','bathroom stone floor');
  lining(bath,[[27.25,-2.36,28.284,-.689],[28.313,-2.36,29.238,-.689],
    [27.25,.67,29.238,2.24],[27.25,-.689,28.35,.67],[28.434,-.689,29.238,.67]],
    5.802,5.84,'M107','bathroom ivory overhead');
  panel(bath,[29.24,-.982,3.95,29.28,.870,5.83],'M39','vanity backing infill');
  panel('MD_FUR_040',[20.55,-3.074,4.26,21.48,-3.067,5.72],'M96','day head timber vanity wall');
  for(const x of [20.34,20.82]){
    panel(galley,[x,2.264,4.65,x+.16,2.281,4.666],'M19','galley cabinet pull '+x);
  }
  panel(galley,[21.555,1.79,4.88,22.17,2.24,4.885],'M47','ceramic hob');
  for(const [x,y] of [[21.70,1.91],[22.01,1.91],[21.70,2.12],[22.01,2.12]]){
    add(galley,slab(circle(x,y,.087,24),4.885,4.887,0),'M38','hob ring '+x+' '+y);
    add(galley,slab(circle(x,y,.081,24),4.887,4.889,0),'M47','hob burner '+x+' '+y);
  }
  const shower='MD_SAN_028';
  // The original fitting is in the middle of the cubicle. Attach the new riser to the window jamb.
  remove(shower);
  panel(shower,[27.25,-2.41,3.96,29.22,-2.37,4.70],'M115','shower window lower reveal');
  panel(shower,[27.25,-2.41,5.39,29.22,-2.37,5.81],'M115','shower window upper reveal');
  for(const [a,b] of [[27.25,27.87],[28.81,29.22]])
    panel(shower,[a,-2.41,4.69,b,-2.37,5.40],'M115','shower window side reveal '+a);
  panel(shower,[27.50,-2.368,4.16,27.55,-2.33,5.59],'M19','shower mixer rail');
  panel(shower,[27.46,-2.35,4.91,27.66,-2.324,4.98],'M19','shower mixer and controls',.011);
  panel(shower,[27.47,-2.34,5.58,27.59,-2.16,5.61],'M19','shower head');

}

// The VR side passages have a polished crown over a white bulwark. Aft, the
// crown lands on the existing raised mooring caps; the openings below stay clear.
export function finishSideDecks({add,box}){
  const forward=[[11.6,3.791,3.795],[15.65,3.763,3.758],[18.05,3.739,3.709],[22.4,3.597,3.471]];
  for(const side of [-1,1]){
    const port=side===1, start=port?5.63:5.92, endCap=port?11.6:5.92;
    const sections=[[start,3.78],[8.45,3.8],
      ...forward.map(row=>[row[0],row[port?2:1]])];
    const railY=y=>side*(y-.075);
    const attach=(mesh,material,name)=>add('MD_SUP_007',mesh,material,'side deck '+name+' '+side,false);

    // Sweep shared rings along the sheer. A continuous cross-section avoids
    // overlapping segment caps, and smooth normals give the steel a highlight.
    function tube(path,ry,rz,label){
      const vertices=[],indices=[],sides=8;
      for(const [x,y,z] of path){
        for(let i=0;i<sides;i++){
          const a=i*2*Math.PI/sides, cy=Math.cos(a),sz=Math.sin(a);
          const ny=cy/ry,nz=sz/rz,len=Math.hypot(ny,nz);
          vertices.push(x,y+ry*cy,z+rz*sz,0,ny/len,nz/len);
        }
      }
      for(let k=0;k<path.length-1;k++)for(let i=0;i<sides;i++){
        const a=k*sides+i,b=k*sides+(i+1)%sides;
        indices.push(a,b,a+sides,b,b+sides,a+sides);
      }
      for(const end of [0,path.length-1]){
        const first=vertices.length/6;
        for(let i=0;i<sides;i++)vertices.push(...vertices.slice(6*(end*sides+i),6*(end*sides+i)+3),end?1:-1,0,0);
        for(let i=1;i<sides-1;i++)indices.push(first,first+(end?i:i+1),first+(end?i+1:i));
      }
      attach({vertices,indices},'M19',label);
    }
    tube(sections.map(([x,y])=>[x,railY(y),5.025]),.046,.026,'polished top rail');
    tube(sections.filter(([x])=>x>=endCap).map(([x,y])=>[x,railY(y),4.72]),.014,.014,'intermediate rail');
    for(let i=1;i<sections.length;i++){
      const [x,y]=sections[i-1],[X,Y]=sections[i];
      if(x>=endCap){
        const w=.12,g=box([x,-w/2,3.95,X,w/2,4.49],0);
        for(let k=0;k<g.vertices.length;k+=6){
          const t=(g.vertices[k]-x)/(X-x);
          g.vertices[k+1]+=railY(y+t*(Y-y));
        }
        // Adjacent bulwark runs share their end section.
        g.indices=g.indices.filter((_,k,idx)=>{
          const a=idx[k-k%3]*6;
          return !(g.vertices[a+3]<-.99&&x>endCap||g.vertices[a+3]>.99&&i<sections.length-1);
        });
        attach(g,'M06','bulwark '+i);
      }
      const bays=Math.ceil((X-x)/1.22);
      for(let j=0;j<bays+(i===sections.length-1?1:0);j++){
        const t=j/bays,px=x+(X-x)*t,py=railY(y+(Y-y)*t);
        const foot=px<=endCap?(port?4.838:4.858):4.487;
        attach(box([px-.016,py-.019,foot,px+.016,py+.019,5.006],0),'M19','stanchion '+i+' '+j);
      }
    }
  }
}
