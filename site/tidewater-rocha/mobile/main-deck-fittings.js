// Registered to the Galley, Day Head, Master Cabin, Master Head and Master Shower panoramas.
export function furnishMainDeck({box,add,remove,slab,outline,circle}){
  function panel(anchor,bounds,mat,label,r=.006){add(anchor,box(bounds,Math.min(r,...bounds.slice(3).map((v,i)=>(v-bounds[i])*.35))),mat,label);}
  function oval(anchor,x,y,w,d,z,Z,mat,label){
    add(anchor,slab(outline(x,y,w,d,Math.min(w,d)*.44),z,Z,.003),mat,label);
  }
  const galley='MD_FUR_035',suite='MD_FUR_041',bath='MD_FUR_055';
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
  panel(galley,[20.13,2.42,4.85,21.32,2.815,4.879],'M26','galley dark stone worktop');
  panel(galley,[21.53,1.59,4.85,22.29,2.69,4.879],'M26','galley return worktop');
  panel(galley,[21.525,1.72,4.14,21.545,2.29,4.65],'M19','oven brushed surround');
  panel(galley,[21.508,1.76,4.20,21.525,2.25,4.57],'M47','oven glazed door');
  panel(galley,[21.483,1.79,4.58,21.523,2.22,4.61],'M19','oven bar handle');
  for(const x of [20.17,20.55,20.93]){
    panel(galley,[x,2.407,4.03,x+.36,2.426,4.78],'M23','galley flush lower door '+x);
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
  // A service door and the stacked laundry fronts are visible from Crew Entrance.
  panel(galley,[21.94,.64,3.96,22.36,1.29,5.68],'M39','service laundry cabinet');
  for(const z of [4.02,4.84]){
    panel(galley,[21.92,.66,z,21.943,1.27,z+.76],'M107','service appliance front '+z);
    const drum=slab(circle(.965,z+.35,.218,32),0,.014,.003);
    for(let i=0;i<drum.vertices.length;i+=6){
      const [y,h,x,ny,nh,nx]=drum.vertices.slice(i,i+6);
      drum.vertices.splice(i,6,21.904+x,y,h,nx,ny,nh);
    }
    add(galley,drum,'M47','laundry drum glass '+z);
    panel(galley,[21.902,.71,z+.61,21.920,.98,z+.69],'M19','laundry control strip '+z);
    panel(galley,[21.899,.74,z+.628,21.903,.84,z+.672],'M47','laundry display '+z);
  }
  const dayHeadStrips=[[20.454,-3.003,20.502,-2.18],[20.502,-3.13,21.617,-2.18],[21.617,-3.13,22.13,-2.66],[21.617,-2.573,22.13,-2.18]];
  lining('MD_FUR_040',dayHeadStrips,3.951,3.962,'M37','day head stone floor');
  lining('MD_FUR_040',dayHeadStrips,5.80,5.83,'M107','day head overhead');
  // The forward dresser and aft settee cross the two photographed doorways in the schematic model.
  for(const a of ['MD_FUR_044','MD_FUR_045','MD_SOF_014','MD_FUR_054'])remove(a);
  panel(suite,[26.76,1.15,3.96,27.12,2.32,4.82],'M96','suite fitted forward cabinetry',.025);
  oval(suite,24.95,0,3.48,3.39,3.951,3.961,'M95','suite deep blue rug');
  panel(suite,[24.07,-.94,4.51,24.14,.94,5.16],'M39','suite upholstered headboard',.047);
  panel(suite,[25.39,-.9,4.486,25.94,.91,4.543],'M94','suite blue bed runner',.024);
  panel(suite,[26.33,-2.40,3.95,26.65,-2.12,4.65],'M96','window desk pedestal',.04);
  oval(suite,26.40,-2.16,1.06,.57,4.65,4.70,'M37','window writing surface');
  for(const y of [-1.31,1.32]){
    panel(suite,[23.77,y-.045,5.05,23.84,y+.045,5.41],'M21','suite brass reading lamp '+y,.022);
    panel(suite,[23.83,y-.026,5.10,23.85,y+.026,5.36],'M99','suite lamp diffuser '+y,.01);
  }
  // One bathroom spans the beam. The separate shower sits opposite the vanity.
  for(const anchor of ['MD_PAR_019','MD_FUR_056','MD_GLA_002','MD_SAN_019','MD_SAN_020','MD_SAN_021','MD_SAN_022','MD_SAN_023','MD_SAN_024','MD_SAN_025','MD_SAN_026','MD_SAN_027'])remove(anchor);
  // Extend the original sink cabinet along the wall, leaving its recessed bowl open.
  panel(bath,[28.79,-.62,3.96,29.19,1.391,4.74],'M37','stone vanity apron',.026);
  lining(bath,[[28.71,-.65,29.23,1.41],[28.71,1.78,29.23,1.95]],
    4.74,4.798,'M37','stone vanity ledge');
  panel(bath,[29.20,-.66,4.88,29.23,1.96,5.70],'M20','mirror above stone ledge');
  panel(bath,[29.12,-.60,5.71,29.20,1.90,5.74],'M99','mirror concealed light');
  panel(bath,[27.32,-2.35,3.955,28.284,-1.32,3.966],'M37','flush shower stone tray');
  panel(bath,[27.66,-2.14,3.967,27.98,-2.11,3.972],'M19','shower linear drain');
  // The centre bay contains the modeled stair coaming. Keep its footprint exposed.
  const wings=[[27.25,-2.36,28.284,-.688],[28.313,-2.36,29.238,-.688],
    [27.25,.67,29.238,2.24],[27.25,-.688,27.258,.67],[28.434,-.688,29.238,.67]];
  lining(bath,wings,3.951,3.954,'M37','bathroom stone floor');
  lining(bath,[[27.25,-2.36,28.284,-.689],[28.313,-2.36,29.238,-.689],
    [27.25,.67,29.238,2.24],[27.25,-.689,28.35,.67],[28.434,-.689,29.238,.67]],
    5.802,5.84,'M107','bathroom ivory overhead');
  panel(bath,[29.24,-.982,3.95,29.28,.870,5.83],'M39','vanity backing infill');
  panel(suite,[22.663,-2.50,5.81,27.162,2.531,5.85],'M107','suite overhead');
  for(const y of [-2.15,2.15]){
    panel(suite,[22.94,y,5.795,26.85,y+.035,5.811],'M99','suite ceiling reveal '+y);
  }
  panel('MD_FUR_040',[20.55,-3.074,4.26,21.48,-3.067,5.72],'M96','day head timber vanity wall');
  for(const x of [20.34,20.82]){
    panel(galley,[x,2.392,4.65,x+.16,2.407,4.666],'M19','galley cabinet pull '+x);
  }
  panel(galley,[21.555,1.79,4.88,22.17,2.24,4.885],'M47','ceramic hob');
  for(const [x,y] of [[21.70,1.91],[22.01,1.91],[21.70,2.12],[22.01,2.12]]){
    add(galley,slab(circle(x,y,.087,24),4.885,4.887,0),'M38','hob ring '+x+' '+y);
    add(galley,slab(circle(x,y,.081,24),4.887,4.889,0),'M47','hob burner '+x+' '+y);
  }
  const shower='MD_SAN_028';
  // The original fitting is in the middle of the cubicle. Attach the new riser to the window jamb.
  remove(shower);
  panel(shower,[27.25,-2.41,3.96,29.22,-2.37,4.70],'M37','shower window lower reveal');
  panel(shower,[27.25,-2.41,5.39,29.22,-2.37,5.81],'M37','shower window upper reveal');
  for(const [a,b] of [[27.25,27.87],[28.81,29.22]])
    panel(shower,[a,-2.41,4.69,b,-2.37,5.40],'M37','shower window side reveal '+a);
  panel(shower,[27.50,-2.368,4.16,27.55,-2.33,5.59],'M19','shower mixer rail');
  panel(shower,[27.46,-2.35,4.91,27.66,-2.324,4.98],'M19','shower mixer and controls',.011);
  panel(shower,[27.47,-2.34,5.58,27.59,-2.16,5.61],'M19','shower head');

}

// Cross sections sampled on the modeled outside edge of MD_DCK_001.
export function finishSideDecks({add,box}){
  const sections=[[8.45,3.8,3.8],[11.6,3.791,3.795],[15.65,3.763,3.758],[18.05,3.739,3.709],[22.4,3.597,3.471]];
  const anchor='MD_SUP_007';
  for(const side of [-1,1]){
    for(let i=1;i<sections.length;i++){
      const a=sections[i-1],b=sections[i],k=side>0?2:1;
      function beam(lo,hi,inset,width,label){
        const mesh=box([a[0],-width/2,lo,b[0],width/2,hi],Math.min(.004,width*.23));
        for(let j=0;j<mesh.vertices.length;j+=6){
          const t=(mesh.vertices[j]-a[0])/(b[0]-a[0]);
          mesh.vertices[j+1]+=side*(a[k]+t*(b[k]-a[k])-inset);
        }
        add(anchor,mesh,label==='bulwark'?'M06':'M19','side deck '+label+' '+side+' '+i,false);
      }
      const existing=side>0&&i===1;
      if(!existing)beam(3.95,4.43,.065,.10,'bulwark');
      beam(4.95,4.985,.064,.047,'polished top rail');
      if(!existing)beam(4.65,4.667,.064,.018,'intermediate rail');
      const posts=Math.ceil((b[0]-a[0])/1.13);
      for(let j=0;j<posts+(i===sections.length-1?1:0);j++){
        const t=j/posts,x=a[0]+(b[0]-a[0])*t,y=side*(a[k]+t*(b[k]-a[k])-.064);
        add(anchor,box([x-.014,y-.014,existing?4.835:4.42,x+.014,y+.014,4.955],.004),'M19','side deck stanchion '+side+' '+i+' '+j,false);
      }
    }
  }
}
