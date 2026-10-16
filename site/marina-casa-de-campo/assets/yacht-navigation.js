// Navigation is expressed in the exported yacht's metre-based local coordinates.
// Door/deck destinations bridge closed decorative doors in the reference model.
export const DECKS = ['Main deck','Upper deck','Sundeck','Lower deck','Crew & service'];
const r=(id,label,deck,position,forward,bounds,group,floor)=>({id,label,deck,position,forward,bounds,group,floor});
export const ROOMS = [
 r('cockpit','Aft cockpit','Main deck',[-13.8,4.12,0],[1,-.05,0],[-14.35,-9.2,-3.0,3.0],['21'],2.76),
 r('salon','Main salon','Main deck',[-6,4.10,2.7],[.5825,-.1008,-.8065],[-8.65,1.25,-2.98,2.98],['10'],2.74),
 r('dining','Dining room','Main deck',[-.65,4.1,2.6],[-.25,-.08,-.96],[-8.65,1.25,-2.98,2.98],['10'],2.74),
 r('owner','Owner suite','Main deck',[9.6,4.06,2.55],[-.746,-.111,-.656],[5.75,9.88,-2.55,2.65],['12'],2.72),
 r('owner-bath','Owner bathroom','Main deck',[11.2,4.10,1.5],[.15,-.08,-.99],[10.28,12.03,-1.65,1.65],['13'],2.72),
 r('galley','Galley & laundry','Main deck',[4.7,4.1,-1.0],[-1,-.10,-.15],[1.7,5.0,-3.0,-.85],['11'],2.72),
 r('day-head','Day head','Main deck',[4.93,4.1,2.83],[-.65,-.15,-.75],[3.93,4.96,1.85,2.93],['14'],2.72),
 r('skylounge','Skylounge','Upper deck',[-1.6,6.78,2.45],[.376,-.168,-.911],[-5.35,1.35,-2.4,2.5],['20'],5.48),
 r('bridge','Wheelhouse','Upper deck',[2.3,6.95,1.4],[.95,-.12,-.3],[1.9,5.8,-2.3,2.3],['20'],5.46),
 r('upper-aft','Aft terrace','Upper deck',[-8.8,6.9,1.8],[1,-.1,-.2],[-10.8,-5.6,-2.9,2.9],['22'],5.49),
 r('foredeck','Foredeck & plunge pool','Upper deck',[8.1,6.85,2.25],[.88,-.08,-.48],[6.5,15.5,-2.6,2.6],['23'],5.48),
 r('sundeck','Sundeck lounge & bar','Sundeck',[-6.65,9.5,0],[.9897,-.1428,0],[-6.85,2.55,-2.5,2.5],['24'],8.12),
 r('lower-lobby','Guest lobby','Lower deck',[.6,1.85,0],[1,-.12,0],[-.2,2.05,-.30,.30],['34'],.30),
 r('port-double','Port double cabin','Lower deck',[-.45,1.85,-.85],[-.712,-.438,-.548],[-3.30,-.20,-2.98,-.60],['30 | Port','31 | Port'],.31),
 r('starboard-double','Starboard double cabin','Lower deck',[-.45,1.85,.85],[-.712,-.438,.548],[-3.30,-.20,.60,2.98],['30 | Starboard','31 | Starboard'],.31),
 r('port-twin','Port twin cabin','Lower deck',[5.45,1.85,-1.78],[-1,-.14,0],[2.5,5.7,-2.98,-.60],['32 | Port','33 | Port'],.31),
 r('starboard-twin','Starboard twin cabin','Lower deck',[5.45,1.85,1.78],[-1,-.14,0],[2.5,5.7,.60,2.98],['32 | Starboard','33 | Starboard'],.31),
 r('port-guest-bath','Port guest bathroom','Lower deck',[2.65,1.75,-2.06],[-.45,-.12,-.89],[1.88,2.76,-2.96,-2.02],['33 | Port'],.29),
 r('starboard-guest-bath','Starboard guest bathroom','Lower deck',[2.65,1.75,2.94],[-.45,-.12,-.89],[1.88,2.76,2.02,2.96],['33 | Starboard'],.29),
 r('crew-mess','Crew mess','Crew & service',[7.5,1.75,.8],[.45,-.15,-.88],[7.3,8.9,-.85,.9],['35'],.30),
 r('captain','Captain cabin','Crew & service',[10.1,1.65,-1.9],[-.8,-.55,.25],[8.55,10.45,-2.25,-.75],['36 | Captain','37 | Captain'],.30),
 r('port-crew','Port crew cabin','Crew & service',[11.7,1.12,-.5],[-.8,-.3,-.5],[10.2,11.8,-1.75,-.50],['36 | Port','37 | Port'],.30),
 r('starboard-crew','Starboard crew cabin','Crew & service',[11.7,1.12,1.65],[-.8,-.3,-.5],[10.2,11.8,.50,1.75],['36 | Starboard','37 | Starboard'],.30),
 r('middle-crew','Middle crew cabin','Crew & service',[10.0,1.12,2.15],[-.8,-.3,-.4],[8.55,10.45,.75,2.25],['36 | Middle','37 | Middle'],.30),
 r('engine','Engine room','Crew & service',[-8.6,1.85,0],[.9908,-.135,0],[-8.78,-4.1,-2.75,2.75],['40'],.34),
 r('garage','Tender garage','Crew & service',[-12.2,1.85,1.7],[1,-.14,-.4],[-12.7,-9.3,-2.5,2.5],['41'],.30),
 r('lazarette','Lazarette','Crew & service',[-13.25,1.85,0],[-.4,-.15,.9],[-14.05,-13.1,-2.5,2.5],['41'],.30),
];
export function clampRoom(room,x,z,radius=.14){
 const [x0,x1,z0,z1]=room.bounds;
 return [Math.max(x0+radius,Math.min(x1-radius,x)),Math.max(z0+radius,Math.min(z1-radius,z))];
}
export function blocksAt(colliders,room,x,z,radius=.14){
 return colliders.some(c=>c.min[1]<room.floor+1.15&&c.max[1]>room.floor+.3&&
  x>c.min[0]-radius&&x<c.max[0]+radius&&z>c.min[2]-radius&&z<c.max[2]+radius);
}
