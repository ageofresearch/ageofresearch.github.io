// The cockpit and port panoramas constrain the four backs, the tabletop and
// the visible feet. Dimensions are a photographic fit in Rocha model units.
const floor = 3.95;
// Rear cap centreline (x, y) and rotation about the deck normal.
const placements = [
  [5.3467, -1.6422, -.01302], [5.3597, -1.0304, .00263],
  [5.3570, -.4407, .00173], [5.3522, .1485, -.02152],
];

export function furnishCockpitChairs({add, obstacle, tube, patch, merge}) {
  for (const [i,[x0,y0,angle]] of placements.entries()) {
    const cos = Math.cos(angle), sin = Math.sin(angle);
    const point = (x,y,z) => [x0+x*cos-y*sin, y0+x*sin+y*cos, floor+z];
    const bounds = [Infinity,Infinity,0,-Infinity,-Infinity,0];
    const textile = [], wood = [], rivets = [];
    const part = (geom, material, label) => {
      for(let j=0;j<geom.vertices.length;j+=6){
        for(let axis=0;axis<2;axis++){
          bounds[axis]=Math.min(bounds[axis],geom.vertices[j+axis]);
          bounds[axis+3]=Math.max(bounds[axis+3],geom.vertices[j+axis]);
        }
      }
      add('MD_FUR_007', geom, material, 'director chair ' + (i + 1) + ' ' + label);
    };
    function cylinder(a, b, radius, sides, caps = []) {
      const g = tube(point(...a), point(...b), radius, radius, sides);
      const rim = sides*6;
      g.indices = g.indices.slice(0,rim);
      for (const i of caps) {
        const hub = 2*sides+i, start = g.vertices.length/6;
        const normal=g.vertices.slice(hub*6+3,hub*6+6);
        for(let j=0;j<sides;j++) {
          const at=(i*sides+j)*6;
          g.vertices.push(...g.vertices.slice(at,at+3),...normal);
          const next=(j+1)%sides;
          g.indices.push(hub,start+(i?j:next),start+(i?next:j));
        }
      }
      return g;
    }
    function button(x,y,z,radius) {
      const vertices = [...point(x,y,z),cos,sin,0], indices = [];
      for (let k=0;k<6;k++) {
        const angle = k*Math.PI/3;
        vertices.push(...point(x,y+radius*Math.cos(angle),z+radius*Math.sin(angle)),cos,sin,0);
        indices.push(0,k+1,(k+1)%6+1);
      }
      return {vertices,indices};
    }
    // A flat folding slat, offset from its mate by one thickness at the pivot.
    function slat(x, y0, z0, y1, z1) {
      const length = Math.hypot(y1-y0, z1-z0);
      const dy = -(z1-z0) / length * .019, dz = (y1-y0) / length * .019;
      const corners = [[y0+dy,z0+dz], [y0-dy,z0-dz], [y1-dy,z1-dz], [y1+dy,z1+dz]];
      const at = (j,k) => point(x + (j ? .009 : -.009), ...corners[k]);
      const faces = [];
      function face(a,b,d) {
        faces.push(patch(1,1,(u,v) => a.map((n,k) => n+(b[k]-n)*u+(d[k]-n)*v)));
      }
      face(at(1,0),at(1,1),at(1,3));
      face(at(0,3),at(0,2),at(0,0));
      for (let k=0;k<4;k++) {
        const next=(k+1)%4;
        face(at(0,k),at(0,next),at(1,k));
      }
      return merge(faces);
    }
    for (const side of [-1,1]) {
      const y = side*.2690;
      textile.push(cylinder([-.05945,y,0],[.0023,y,.835],.022,10));
      wood.push(cylinder([.0023,y,.835],[.0031,y,.84445],.022,10,[1]));
      textile.push(cylinder([-.5001,y,0],[-.494,y,.465],.018,6));
      // The fabric side returns run fore-and-aft from the wrapped uprights.
      textile.push(patch(2,1,(u,v) => point(-.495+.438*u+.020*u*v,
        y-side*.008*Math.sin(Math.PI*u), .015+v*(.448-.009*Math.sin(Math.PI*u))),{both:true}));
      wood.push(cylinder([-.5082,side*.2198,.4603],[-.01484,side*.2198,.4603],.021,8,[0,1]));
    }
    for (const x of [-.0462,-.4682]) {
      for (const side of [-1,1]) {
        const plane=x+side*.010;
        wood.push(slat(plane,side*.2401,.033,-side*.2198,.454));
        for (const t of [.035,.956]) {
          const y=side*(.2401-.4599*t), z=.033+.421*t;
          rivets.push(button(plane+.0095,y,z,.007));
        }
      }
      rivets.push(button(x+.0195,0,.252,.008));
    }
    const sling=patch(5,1,(u,v) => point(-.5117+.473*v,.4842*(u-.5),
      .477-.021*Math.sin(Math.PI*u)-.004*Math.sin(Math.PI*v)),{both:true});
    // Turn the fabric over its upper hem. The narrow upward-facing fold catches
    // skylight; the free bottom edge bows slightly between the two sleeves.
    const backAt = (u,h,depth) => point(depth+.011*Math.sin(Math.PI*u),
      .538*(u-.5),h-.0045*Math.sin(Math.PI*u));
    const back = merge([[.6256,.8001,-.0366,-.0083],[.8001,.8278,-.0083,-.0096],
      [.8278,.8417,-.0096,-.021]].map(([low,high,x0,x1]) =>
      patch(5,1,(u,v) => backAt(u,low+(high-low)*v,x0+(x1-x0)*v),{both:true})));
    part(merge(textile),'M101','wrapped canvas legs and sides');
    part(merge(wood),'M102','timber cross braces and rail ends');
    part(merge(rivets),'M19','inset fasteners');
    part(sling,'M103','canvas sling seat');
    part(back,'M104','canvas back');
    obstacle('MD',bounds);
  }
}
