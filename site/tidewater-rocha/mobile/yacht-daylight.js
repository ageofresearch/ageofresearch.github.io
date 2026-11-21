import probes from './daylight-probes.js?v=yacht-daylight-1';

const radians=Math.PI/180;
const clamp=(x,a,b)=>Math.max(a,Math.min(b,x));
export function createDaylight(reference,group,storage){
  const local=reference.clone().applyQuaternion(group.quaternion.clone().invert()).normalize();
  const initial={azimuth:(Math.atan2(-local.x,local.z)/radians+360)%360,elevation:Math.asin(local.y)/radians};
  let state=initial,revision=0;
  const direction=local.clone(),world=local.clone();
  // Index zero is unrestricted skylight outside the compartment volumes.
  const irradiance=new Float32Array((probes.length+1)*4);
  function set(azimuth,elevation,save=true){
    if(!Number.isFinite(azimuth)||!Number.isFinite(elevation))return;
    azimuth=((azimuth%360)+360)%360;elevation=clamp(elevation,5,90);
    if(revision&&state.azimuth===azimuth&&state.elevation===elevation)return;
    state={azimuth,elevation};revision++;
    const a=azimuth*radians,h=elevation*radians;
    direction.set(-Math.sin(a)*Math.cos(h),Math.sin(h),Math.cos(a)*Math.cos(h));
    world.copy(direction).applyQuaternion(group.quaternion);
    const angle=azimuth/45,i=Math.floor(angle),t=angle-i;
    const height=clamp((elevation-5)/40,0,2),j=Math.min(1,Math.floor(height)),u=height-j;
    irradiance.set([.035,.033,.030,1]);
    probes.forEach((p,k)=>{
      for(let c=0;c<3;c++){
        const row=r=>(p.rgb[(r*8+i)*3+c]*(1-t)+p.rgb[(r*8+(i+1)%8)*3+c]*t)/255;
        irradiance[4*(k+1)+c]=row(j)*(1-u)+row(j+1)*u;
      }
      irradiance[4*(k+1)+3]=p.sky;
    });
    if(save)try{storage?.setItem('luz-de-mar-daylight',JSON.stringify(state));}catch{}
  }
  set(initial.azimuth,initial.elevation,false);
  try{const saved=JSON.parse(storage?.getItem('luz-de-mar-daylight')||'null');if(saved)set(saved.azimuth,saved.elevation,false);}catch{}
  return {direction,world,irradiance,set,get state(){return state;},get revision(){return revision;},
    reset:()=>set(initial.azimuth,initial.elevation)};
}

export function compartment(x,y,z){
  return probes.findIndex(({box:b})=>x>=b[0]&&y>=b[1]&&z>=b[2]&&x<=b[3]&&y<=b[4]&&z<=b[5])+1;
}

// Shared compartment ranges and linear irradiance also feed the full material's
// vertex stage, through its existing material uniform block.
// Each lobe stores premultiplied surface reflectance and the fraction of rays
// that reach the sky. The unrestricted exterior has sky above and pale deck below.
export const localReflections=Float32Array.from([
  ...[[.30,.26,.21,.45],[.30,.26,.21,.45],[.30,.24,.18,.08],[0,0,0,1],[.30,.26,.21,.45],[.30,.26,.21,.45]].flat(),
  ...probes.flatMap(p=>p.reflection.map(v=>v/255))
]);
export function sampleReflectionWGSL(table,index,ray){
  const fetch=(axis,k)=>table+'['+index+'*6u+'+k+'u+select(0u,1u,'+ray+'.'+axis+'>=0.)]';
  return ['x','y','z'].map((axis,k)=>fetch(axis,2*k)+'*'+ray+'.'+axis+'*'+ray+'.'+axis).join('+');
}
export const bounceUniforms=Object.fromEntries(Array.from({length:probes.length+1},(_,i)=>['bounce'+i,['vec4f',[0,0,0,0]]]));
bounceUniforms.reflectedFittings=['vec4f['+localReflections.length/4+']',Array.from({length:localReflections.length/4},(_,i)=>localReflections.subarray(4*i,4*i+4))];
export const bounceVertex=`
let roomPoint=vec3f((v.position.z+17.615)/.9786111111,v.position.x/.9828947368,v.position.y+2.01);
var region=0u;o.vBounce=mat.bounce0;
`+probes.map(({box:b},i)=>(i?'else ':'')+'if(all(roomPoint>=vec3f('+b.slice(0,3).map(v=>v.toFixed(4))+')) && all(roomPoint<=vec3f('+b.slice(3).map(v=>v.toFixed(4))+'))){o.vBounce=mat.bounce'+(i+1)+';region='+String(i+1)+'u;}').join('\n')+`
if(v.aSurface.y>.10 && v.aSurface.z<37.){
 let modelRotation=mat3x3f(draw.model[0].xyz,draw.model[1].xyz,draw.model[2].xyz);
 let look=normalize(transpose(modelRotation)*(frame.cameraPos-(draw.model*vec4f(v.position,1.)).xyz));
 let reflected=reflect(-look,normalize(v.normal));
 o.vFittings=${sampleReflectionWGSL('mat.reflectedFittings','region','reflected')};
}
`;
export function applyFullBounce(model,light){
  const materials=new Set();
  model.group.traverse(o=>{if(o.material?.uniforms?.bounce0)materials.add(o.material);});
  for(const mat of materials)for(let i=0;i<=probes.length;i++)
    mat.uniforms['bounce'+i].value=light.irradiance.subarray(i*4,i*4+4);
}

export function mountDaylightControls(light,root){
  root?.querySelector('[data-daylight]')?.remove();
  const panel=document.createElement('details');
  panel.dataset.daylight='';panel.className='tw-interactive yacht-daylight';
  panel.innerHTML=`<summary>Luz solar</summary><div class="sun-inputs">
    <label>Dirección del sol <output></output><input type="range" min="0" max="360" step="1" aria-label="Dirección del sol"></label>
    <label>Altura del sol <output></output><input type="range" min="5" max="90" step="1" aria-label="Altura del sol"></label>
    <button type="button">Restablecer luz</button></div>`;
  const [az,el]=panel.querySelectorAll('input'),[a,h]=panel.querySelectorAll('output');
  const refresh=()=>{az.value=Math.round(light.state.azimuth);el.value=Math.round(light.state.elevation);a.value=az.value+'°';h.value=el.value+'°';};
  for(const input of [az,el])input.addEventListener('input',()=>{
    light.set(+az.value,+el.value);a.value=az.value+'°';h.value=el.value+'°';
  });
  panel.querySelector('button').onclick=()=>{light.reset();refresh();};
  for(const type of ['pointerdown','touchstart','keydown','keyup'])panel.addEventListener(type,e=>e.stopPropagation());
  refresh();(root||document.body).append(panel);return panel;
}
