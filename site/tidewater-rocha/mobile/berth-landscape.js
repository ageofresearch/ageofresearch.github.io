import {waterline,hullWaterline} from './rocha-waterline.js?v=tour-fidelity-1';

// Shared by the prepared views. Sky, lake and two bank strips occupy the same
// indexed opaque batch as the yacht. The original world owns its own terrain.
export function berthLandscape() {
  const ranges=[],sides=waterline.length,center=18,sea=2.01;
  const point=(i,r,z)=>{
    const a=i/sides*2*Math.PI;
    return [center+Math.cos(a)*r/(35.23/36),Math.sin(a)*r/(7.47/7.6),z];
  };
  function band(feature,code,color,low,high){
    const vertices=[],indices=[];
    for(let i=0;i<sides;i++){
      const a=2*Math.PI*i/sides;
      for(const row of [low(i,a),high(i,a)])vertices.push(...point(i,...row),-Math.cos(a),-Math.sin(a),.1);
    }
    for(let i=0;i<sides;i++){const n=(i+1)%sides,j=2*i,k=2*n;indices.push(j,j+1,k+1,j,k+1,k);}
    ranges.push({vertices,indices,feature,finish:[color,1,0,code]});
  }
  const level=i=>[Math.min(210,waterline[i]),sea-.035];
  const ridge=(i,a)=>[Math.min(210,waterline[i])+8,sea+1.2+.65*Math.sin(3*a+.5)+.49*Math.cos(7*a)];
  const hills=(i,a)=>[Math.min(210,waterline[i])+30,sea+2.3+1.65*Math.sin(3*a+.2)+.8*Math.sin(5*a)];
  band('Rocha wooded shoreline',45,0x697d69,level,ridge);
  const bushes={vertices:[],indices:[],feature:'Rocha lakeside foliage',finish:[0x61794d,1,0,45]};
  for(let j=0;j<sides*3;j++){
    const i=Math.floor(j/3),t=j%3/3,a=j/(sides*3)*2*Math.PI;
    const shore=waterline[i]*(1-t)+waterline[(i+1)%sides]*t;
    const canopy=1.15+.51*Math.sin(a*9)+.27*Math.cos(a*33)+.22*Math.sin(a*77);
    for(const [r,z] of [[shore+.9,sea+.04],[shore+2.4,sea+canopy]]){
      bushes.vertices.push(...point(j/3,r,z),-Math.cos(a),-Math.sin(a),.35);
    }
    const k=2*j,n=2*((j+1)%(sides*3));bushes.indices.push(k,k+1,n+1,k,n+1,n);
  }
  ranges.push(bushes);
  band('Rocha distant bank',46,0x909d88,ridge,hills);
  band('Rocha sky',47,0xabcfe8,()=>[246,-12],()=>[246,105]);
  const water={vertices:[],indices:[],feature:'Rocha lake',finish:[0x56838b,.24,.1,44]};
  for(let i=0;i<sides;i++){
    water.vertices.push(...point(i,hullWaterline[i],sea),0,0,1,...point(i,level(i)[0]+.25,sea),0,0,1);
    const k=2*i,n=2*((i+1)%sides);
    water.indices.push(k,k+1,n+1,k,n+1,n);
  }
  return [water,...ranges];
}
