import fs from 'node:fs/promises';
const base=new URL('../work/boarding-vr-r01/baseline/navigation.json',import.meta.url),target=new URL('../public/assets/navigation.json',import.meta.url);
const d=JSON.parse(await fs.readFile(base));const rect=(a,b,c,e)=>[[a,b],[c,b],[c,e],[a,e]];
d.baseline=structuredClone(d);d.version=2;d.boardingRevision='boarding-vr-r01';
d.regions=d.regions.filter(r=>r.id!=='beach-club-5');
// The platform is not a second usable floor inside the enclosed stair skin.
d.regions.find(r=>r.id==='beach-club-2').polygon=[[-.15,-3.28],[2.6,-3.28],[2.6,2.0],[1.2,2.0],[1.2,3.28],[-.15,3.28]];
for(let i=0;i<7;i++)d.regions.push({id:'boarding-port-stair-'+i,zone:'beach-club',layer:'port-stair',polygon:rect(1.2+2.2*i/7,2.18,1.2+2.2*(i+1)/7,2.82),height:{plane:[0,0,2.12+1.83*(i+1)/7+.008]},maxStep:.28});
d.regions.push({id:'boarding-walkway',zone:'beach-club',layer:'gangway',polygon:[[-.30,3.052],[.97,3.052],[.97,3.032],[2.20,3.032],[2.20,3.012],[3.39,3.012],[3.39,3.01],[3.98,3.01],[3.98,3.78],[3.39,3.78],[3.39,3.788],[2.20,3.788],[2.20,3.768],[.97,3.768],[.97,3.748],[-.30,3.748]],height:{plane:[0,0,3.952]},solidUnderside:true,thickness:.20});
d.layerConnections=[{id:'stair-foot',layers:['deck','port-stair'],polygon:rect(.95,2.10,1.55,2.90)},{id:'stair-head',layers:['deck','port-stair'],polygon:rect(3.15,2.10,3.62,2.90)},{id:'boarding-landing',layers:['deck','gangway'],polygon:rect(3.50,2.98,3.99,3.80)}];
d.obstacles=d.obstacles.filter(o=>o.id!=='beach-club-5 guard');
for(const y of[2.10,2.90])d.obstacles.push({id:'boarding-moulded-stair-shoulder',zone:'beach-club',bounds:[1.2,y-.055,3.45,y+.055],minZ:2.1,maxZ:4.5});
// Explicit top edges prevent lateral exits even where deck and stair elevations meet.
for(const [a,b,y]of[[-.3,3.39,3.00],[-.3,3.39,3.80]])d.obstacles.push({id:'boarding-guard',zone:'beach-club',bounds:[a,y-.025,b,y+.025],minZ:3.96,maxZ:4.98});
for(const c of d.connections)if(c.zones.includes('beach-club')&&c.at[1]>0)c.at=[3.4,2.5];
d.connections.push({zones:['cockpit','beach-club'],at:[3.8,3.4]});
await fs.writeFile(target,JSON.stringify(d,null,2)+'\n');
