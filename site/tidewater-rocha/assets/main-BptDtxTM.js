const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./LocalLights-BPcaAqUW.js","./LocalLights-DGrzAZBs.js","./Frame-CNet77I0.js","./GPU-CxPpnRCf.js","./common-HBn3Movl.js","./RochaApp-DbHivW1B.js","./Materials-CAztm2ge.js","./Material-tyLfv2Wn.js","./PostFX-0mW-sLoH.js","./Texture-8f_StRFj.js","./Readback-5lEJRVdK.js","./preload-helper-uBIymjUX.js","./Globals-CLsqp45h.js","./CameraVelocity-DbPmsWHs.js","./DebugViews-DVAeWhIh.js","./Vegetation-DnVtKdbc.js","./Village-C_egDSub.js","./RochaRenderPolicy-MpP0sevE.js","./RochaTerrainData-D4ZpzSkV.js","./RochaElectrical-DK0YupCi.js","./RochaOverheadNetwork-CCLyK03E.js","./RochaYachtState-P5KwIGIl.js","./PositioningMode-BlXOboEe.js","./Positioning-BfVGiJPZ.js","./Bench-CI-ryIGp.js"])))=>i.map(i=>d[i]);
import{t as e}from"./preload-helper-uBIymjUX.js";import{C as t,D as n,E as r,O as i,S as a,_ as o,a as s,b as c,f as l,h as u,i as d,j as f,k as p,m,n as h,o as g,p as _,r as v,t as y,v as b,w as x,y as S}from"./Frame-CNet77I0.js";import{a as C,i as w,n as T,r as E}from"./Materials-CAztm2ge.js";import{C as D,S as O,T as k,_ as A,b as ee,c as j,d as te,f as ne,g as re,h as M,i as ie,l as ae,n as oe,o as se,p as ce,r as le,s as ue,t as de,u as fe,v as pe,w as me,x as he,y as ge}from"./PostFX-0mW-sLoH.js";import{t as _e}from"./GPU-CxPpnRCf.js";import{n as ve,r as N}from"./Texture-8f_StRFj.js";import{t as ye}from"./Readback-5lEJRVdK.js";import"./Globals-CLsqp45h.js";import{n as be}from"./DebugViews-DVAeWhIh.js";import{A as xe,D as Se,E as Ce,O as we,S as Te,_ as Ee,b as De,d as Oe,f as ke,g as Ae,h as je,j as Me,k as Ne,l as Pe,n as Fe,o as Ie,p as Le,t as Re,u as ze,v as Be,x as Ve,y as He}from"./common-HBn3Movl.js";import{f as Ue,i as We,n as Ge,o as Ke,r as qe}from"./LocalLights-DGrzAZBs.js";import{f as Je,o as Ye,s as Xe,t as Ze,u as Qe}from"./Positioning-BfVGiJPZ.js";import{t as $e}from"./Material-tyLfv2Wn.js";import{a as et,i as tt,n as nt,t as rt}from"./CameraVelocity-DbPmsWHs.js";import{$ as it,A as at,B as ot,C as st,D as ct,E as lt,F as P,G as ut,H as dt,I as ft,J as pt,K as mt,L as ht,M as gt,N as _t,O as vt,P as yt,R as bt,S as xt,T as St,U as Ct,W as wt,X as Tt,Y as Et,_ as Dt,a as Ot,b as kt,c as At,d as jt,et as Mt,f as Nt,g as Pt,h as Ft,i as It,j as F,k as Lt,l as Rt,m as zt,n as Bt,nt as Vt,o as Ht,p as Ut,q as Wt,r as Gt,s as Kt,t as qt,tt as Jt,v as Yt,w as Xt,x as Zt,y as Qt,z as $t}from"./Vegetation-DnVtKdbc.js";import{$ as en,B as tn,C as nn,D as rn,E as an,G as on,H as sn,K as I,M as cn,N as ln,O as un,P as dn,Q as fn,S as pn,T as mn,X as hn,Y as gn,Z as _n,_ as vn,at as yn,b as bn,c as xn,et as Sn,f as Cn,g as wn,h as Tn,it as En,j as Dn,m as L,nt as On,o as kn,ot as R,p as An,q as jn,rt as Mn,s as Nn,t as Pn,tt as z,u as Fn,v as In,w as Ln,x as Rn}from"./Village-C_egDSub.js";if(typeof location<`u`&&/[?&]bench\b/.test(location.search)){let e=2654435769;Math.random=()=>{e=e+1831565813|0;let t=Math.imul(e^e>>>15,1|e);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296}}function zn(e,t,n,r){for(let r=0;r<e.count;r++){let i=r*4;e.cpu[i]=t,e.cpu[i+1]=e.cpu[i+2]=0,e.cpu[i+3]=n.heightAt(e.inputs[i],e.inputs[i+1])}e.cpuValid=!0,e.resultInputs.set(e.inputs),e.resultTime=r,e.version++}function Bn(e,t,n){if(typeof n!=`boolean`)throw TypeError(`Water mode must be a boolean`);if(e.waterEnabled===n)return n;if(e.waterEnabled=n,t.waterEnabled.value=+!!n,e.sceneRenderer.waterEnabled=n,n){for(let[t,n]of e._waterVisibility||[])t.visible=n;e._waterVisibility=null}else{e._waterVisibility=[e.ocean,e.breakers.mesh,e.spray.mesh,e.marineSnow.mesh].map(e=>[e,e.visible]);for(let[t]of e._waterVisibility)t.visible=!1}e.query.flatMode=!n,e.query.readback.invalidate(),e.query._pending=!1,e.query.cpuValid=!1,zn(e.query,t.seaLevel.value,e.terrainData,t.time.value);let r=e.wildlife?.shorebirds?.probe;return r&&(r.disabled=!n,r.readback.invalidate(),r._pending=!1,r.valid=!1),e.spray.disabled=!n,e.spray.clear(),e.post.lens.wet.value=0,e.post.lens.age.value=e.post.lens.duration,e.post.lens._wasUnder=!1,e.post.taau.restart(),e.post._hasPrev=!1,t.cameraUnderwater.value=0,t.cameraWaterHeight.value=e.cameraWaterHeight=t.seaLevel.value,e._fps&&(e._fps.acc=e._fps.n=e._fps.worst=0),e.fps=0,e.ui?.waterButton?.setLabel(n?`Remove water`:`Restore water`),e._waterGroundDirty=!0,n}var Vn=[[[-480,-360,40],[-380,-410,110],[-250,-460,150],[-120,-495,178],[-35,-510,215],[50,-495,176],[150,-470,168],[270,-430,124],[400,-360,60],[470,-320,25]],[[-250,-460,140],[-262,-340,100],[-272,-200,66],[-278,-70,48,120],[-274,60,36,100],[-264,165,20,70]],[[150,-470,155],[240,-340,108],[284,-190,70],[294,-50,50,125],[294,80,36,105],[290,190,18,70]],[[-35,-505,195],[-15,-410,138],[8,-330,80,180],[22,-275,38,110]],[[-150,-485,160],[-135,-370,104],[-118,-280,44,120]],[[105,-485,162],[140,-370,110],[162,-275,42,120]],[[-110,-500,170],[-160,-640,110],[-200,-770,38]],[[50,-495,168],[115,-630,112],[165,-765,38]],[[-380,-410,100],[-440,-560,56]],[[270,-430,115],[390,-550,52]]];for(let e of Vn)for(let t of e)t.length<4&&t.push(2.5*t[2]+50);var Hn=6,Un=.07,Wn=Math.sqrt(1.0049)-Un;function Gn(e,t){let n=0;for(let r=0;r<Vn.length;r++){let i=Vn[r],a=0;for(let n=0;n<i.length-1;n++){let r=i[n],o=i[n+1],s=o[0]-r[0],c=o[1]-r[1],l=((e-r[0])*s+(t-r[1])*c)/(s*s+c*c);l=l<0?0:l>1?1:l;let u=e-(r[0]+s*l),d=t-(r[1]+c*l),f=r[3]+(o[3]-r[3])*l,p=Math.sqrt(u*u+d*d)/f;if(p>=1)continue;let m=(Math.sqrt(p*p+Un*Un)-Un)/Wn,h=1-m,g=(r[2]+(o[2]-r[2])*l)*h*h*(1+.5*m);g>a&&(a=g)}if(a>0){let e=a*a;n+=e*e*e}}return n>0?n**(1/Hn):0}var Kn=[[-272,216,9,17],[-300,196,6,11],[-244,240,5.5,8],[-316,152,7,13],[-286,238,4,6],[298,252,10,19],[262,246,6,10],[328,228,7,12],[322,186,5,9],[280,272,4.5,7]],qn=[{w:1.1,pts:[[21,-56],[20,-68],[18.5,-80],[16.5,-92],[15.5,-100],[20,-102.5],[28,-104.5],[35.5,-108.5]]},{w:.6,pts:[[42,-116.5],[45.5,-126],[48,-138],[49,-150],[49.5,-162],[47,-175],[41,-188],[36,-199],[31,-212],[33,-224],[26,-236],[20,-247],[24,-258],[16,-270],[11,-283],[15,-296],[8,-309],[4,-322]]},{w:.9,pts:[[88,-62],[80,-72],[70,-80],[60,-86],[54.5,-90]]},{w:.8,pts:[[18,-62],[5,-68],[-12,-73],[-30,-77],[-50,-80],[-72,-84]]}];function Jn(e,t,n){let r=1/0,i=0,a=0;for(let o=0;o<e.length-1;o++){let s=e[o],c=e[o+1],l=c[0]-s[0],u=c[1]-s[1],d=l*l+u*u,f=((t-s[0])*l+(n-s[1])*u)/d;f=f<0?0:f>1?1:f;let p=t-(s[0]+l*f),m=n-(s[1]+u*f),h=p*p+m*m,g=Math.sqrt(d);h<r&&(r=h,a=i+f*g),i+=g}return[Math.sqrt(r),a]}var Yn=(e,t,n)=>{let r=Mn(.5+.5*(t-e)/n,0,1);return En(t,e,r)-n*r*(1-r)},Xn=(e,t,n,r,i,a)=>{let o=(e-n)/i,s=(t-r)/a;return(Math.sqrt(o*o+s*s)-1)*Math.min(i,a)},Zn=(e,t)=>(1-R(120,205,Math.abs(e-10)))*(1-R(40,140,t+40))*R(-260,-120,t),Qn=2048,$n=[[-42,-505,72,62],[152,-466,46,38],[-238,-458,40,26]],er=z.village.center,tr=class{constructor(e=7){this.size=z.terrainSize,this.res=Qn,this.texel=this.size/this.res,this.origin=-this.size/2,this.noise=new On(e),this.noise2=new On(e*31+5),this.noise3=new On(e*131+17);let t=this.res*this.res;this.heights=new Float32Array(t),this.rock=new Float32Array(t),this.sand=new Uint8Array(t),this.path=new Uint8Array(t),this.gully=new Uint8Array(t),this.seagrass=new Uint8Array(t),this.rubble=new Uint8Array(t),this.scarp=new Uint8Array(t),this.rockSites=[],this.pads=[],this.paths=qn,this.timings={},this._F={wx:0,wz:0,f170:0,und:0,deep:0,E:0,gx:0,gz:0},this._out={h:0,rock:0,d:0,bz:0,carve:0},this.generate(),this.buildMinMax()}coastDistance(e,t){let n=this._fields(e,t,!1),r=Zn(e,t);return{d:this._coast(e,t,n,r),beachZone:r}}heightFn(e,t){let n=this._fields(e,t,!0),r=this._base(e,t,n,this._out);return{h:r.h,rock:r.rock}}_fields(e,t,n,r=this._F){let i=this.noise,a=i.fbm(e/300,t/300,3)*60,o=i.fbm(e/300+7.1,t/300-3.3,3)*60;return r.wx=e+a,r.wz=t+o,r.f170=i.fbm(r.wx/170,r.wz/170,4),r.und=i.fbm(e/260,t/90,2),r.deep=i.fbm(e/220,t/220,4),n&&(r.E=this._envelope(e,t),r.gx=(this._envelope(e+8,t)-this._envelope(e-8,t))/16,r.gz=(this._envelope(e,t+8)-this._envelope(e,t-8))/16),r}_envelope(e,t){let n=this.noise,r=this.noise3;return Gn(e+n.fbm(e/300,t/300,3)*60+r.fbm(e/130,t/130,2)*28,t+n.fbm(e/300+7.1,t/300-3.3,3)*60+r.fbm(e/130+5.2,t/130-1.7,2)*28)}_coast(e,t,n,r){let i=Yn(Xn(e,t,0,-442,565,400),Yn(Xn(e,t,-272,-25,92,205),Xn(e,t,288,-12,108,228),40),75);return i+=n.f170*34*(1-.9*r),r<1&&(i+=this.noise.fbm(e/38,t/38,3)*7*(1-r)),i+=n.und*5*r,i}_base(e,t,n,r){let i=this.noise,a=this.noise2,o=Zn(e,t),s=this._coast(e,t,n,o),c=Math.max(1-R(60,140,Math.hypot((e+272)*.9,(t+25)*.45)),1-R(60,150,Math.hypot((e-288)*.9,(t+12)*.45))),l=Math.max(c,1-o*1.4),u=0;l>.35&&(u=R(.35,.75,Mn(l*(.55+.45*a.fbm(e/60,t/60,3)),0,1)));let d,f=0;if(s>=0){let r;r=s<70?s*.05:s<260?3.5+(s-70)*.06:s<700?14.9+(s-260)*.07:45.7+(s-700)*.05,r=Math.min(r,85),r*=En(1,2.4,u*(1-R(150,400,s)));let o=s<420?i.fbm(e/45,t/45,3)*.6*(1-R(380,420,s)):0,c=n.deep*6*R(60,400,s);d=-r+o*R(8,40,s)+c,u>0&&s<300&&(d+=u*a.ridged(e/25,t/25,4)*5*R(0,20,s)*(1-R(120,300,s)));let l=z.reef.center,f=Math.hypot(e-l.x,t-l.z),p=1-R(z.reef.radius*.35,z.reef.radius,f);if(p>0){let n=a.ridged(e/11,t/11,4)*2.8+i.fbm(e/5,t/5,2)*.5;d+=p*(1.2+n),d=Math.min(d,-1.4)}let m=z.pier.x,h=(1-R(6,16,Math.abs(e-m-4)))*R(-60,-20,t);h>0&&(d=En(d,-r+o*.3,h*.8))}else{let r=-s,c;c=r<38?r*.068:r<70?2.584+(r-38)*.03:r<230?3.544+(r-70)*.075:15.544+(r-230)*.04;let l=r>25&&r<240?R(25,60,r)*(1-R(120,240,r))*a.fbm(e/30,t/30,3)*.9:0;d=c+l;let p=u*(1-R(90,170,r));if(p>0){let n=Math.min(r*1.6,18+a.ridged(e/70,t/70,4)*22)+a.fbm(e/12,t/12,3)*2.5;d=En(d,Math.max(d,n),p)}let m=(1-R(120,230,Math.abs(e-22-(t+100)*.08+i.noise(t/120,3.7)*30)))*(1-R(70,340,r+i.noise(e/80,t/80)*30));if(n.E>.01&&m<1){let s=n.E;if(Math.sqrt(n.gx*n.gx+n.gz*n.gz)>.005){let r=e+i.noise(e/45,t/45)*14,a=t+i.noise(e/45+9.1,t/45-4.3)*14;f=hn(r,a,n.gx,n.gz,5,160,Math.min(30,.16*n.E)),s+=f}for(let[n,r,o,c]of $n){let l=e-n,u=t-r,d=l*l+u*u;if(d>o*o*1.8)continue;let f=Math.atan2(u,l),p=Math.cos(f),m=Math.sin(f),h=Math.abs(a.noise(p*4.5+n*.1,m*4.5))*.14,g=o*(1+.2*i.noise(p*1.3+n,m*1.3+r)+.08*a.noise(e/17,t/17)-h),_=Math.sqrt(d)/g,v=R(1,.72,_),y=(1-R(.9,1.3,_))*.12,b=1-.35*_*_+a.ridged(e/19,t/19,3)*.35-.15;s+=c*(v*b+y)}let c=2.4-1.9*o;s*=1-m,s-=en(s-r*c-a.fbm(e/9,t/9,2)*1.5*(1-o),3),d+=en(s-d,6)}}return r.h=d,r.rock=u,r.d=s,r.bz=o,r.carve=f,r}generate(){let e=this.timings,t=performance.now(),n=n=>{let r=performance.now();e[n]=Math.round(r-t),t=r},{origin:r}=this,i=this.noise,a=this.noise3,o=this.size/256,s=new Float32Array(65536),c=new Float32Array(65536),l=new Float32Array(65536),u=new Float32Array(65536),d=new Float32Array(65536),f=new Float32Array(65536);for(let e=0;e<256;e++){let t=r+(e+.5)*o;for(let n=0;n<256;n++){let p=r+(n+.5)*o,m=e*256+n,h=i.fbm(p/300,t/300,3)*60,g=i.fbm(p/300+7.1,t/300-3.3,3)*60,_=p+h,v=t+g;s[m]=h,c[m]=g,l[m]=i.fbm(_/170,v/170,4),u[m]=i.fbm(p/260,t/90,2),d[m]=i.fbm(p/220,t/220,4),(Xn(p,t,0,-442,640,470)<0||Xn(p,t,-272,-25,160,280)<0||Xn(p,t,288,-12,170,300)<0)&&(f[m]=Gn(_+a.fbm(p/130,t/130,2)*28,v+a.fbm(p/130+5.2,t/130-1.7,2)*28))}}let p=new Float32Array(65536),m=new Float32Array(65536);for(let e=1;e<255;e++)for(let t=1;t<255;t++){let n=e*256+t;p[n]=(f[n+1]-f[n-1])/(2*o),m[n]=(f[n+256]-f[n-256])/(2*o)}n(`gridA`);let h=Qn/2,g=this.size/h,_=new Float32Array(h*h),v=new Float32Array(h*h),y=new Float32Array(h*h),b=new Float32Array(h*h),x=new Float32Array(h*h),S={wx:0,wz:0,f170:0,und:0,deep:0,E:0,gx:0,gz:0},C={h:0,rock:0,d:0,bz:0,carve:0};for(let e=0;e<h;e++){let t=r+(e+.5)*g;for(let n=0;n<h;n++){let i=r+(n+.5)*g;S.wx=i+fn(s,256,r,o,i,t),S.wz=t+fn(c,256,r,o,i,t),S.f170=fn(l,256,r,o,i,t),S.und=fn(u,256,r,o,i,t),S.deep=fn(d,256,r,o,i,t),S.E=fn(f,256,r,o,i,t),S.E>.01&&(S.gx=fn(p,256,r,o,i,t),S.gz=fn(m,256,r,o,i,t)),this._base(i,t,S,C);let a=e*h+n;_[a]=C.h,v[a]=C.rock,y[a]=C.d,b[a]=C.bz,x[a]=C.carve}}n(`gridB`);let w=Sn(_,h,!0),T=Sn(y,h,!1),E=Sn(v,h,!1),D=Sn(b,h,!1),O=Sn(x,h,!1);this.heights=w,n(`upsample`),this._detail(w,T,E,D),n(`detail`),this._features(w,T,E,D),n(`features`),this._scarp(w,T,E,D),n(`scarp`),this._seabed(w,E),n(`seabed`),this._masks(w,T,E,D,O),this.rock=gn(this.rock,Qn,Qn,1),n(`masks`);let k=Qn;for(let e=0;e<k;e++)if(Math.min(e,2047-e)>121){for(let t=0;t<122;t++)this._fadeBorder(w,t,e);for(let t=1926;t<k;t++)this._fadeBorder(w,t,e)}else for(let t=0;t<k;t++)this._fadeBorder(w,t,e);n(`border`),e.total=Object.values(e).reduce((e,t)=>e+t,0)}_fadeBorder(e,t,n){let r=Qn,i=Math.min(t,n,2047-t,2047-n)*this.texel,a=R(0,120,i),o=n*r+t;e[o]=En(-90,e[o],a)}_detail(e,t,n,r){let i=Qn,a=this.origin,o=this.noise2,s=this.noise3;for(let c=1;c<2047;c++){let l=a+c+.5;if(!(l>320||l<-900))for(let u=1;u<2047;u++){let d=c*i+u,f=e[d];if(f<-6)continue;let p=a+u+.5,m=-t[d],h=r[d],g=Math.hypot(p-er.x,l-er.z),_=1-Math.max(h*(1-R(70,130,m)),1-R(105,150,g));if(_<=.01)continue;let v=e[d+1]-e[d-1],y=e[d+i]-e[d-i],b=Math.sqrt(v*v+y*y)*.5,x=0;m>4&&(x+=s.fbm(p/17,l/17,2)*.28*R(4,30,m));let S=n[d];if(S>.35&&m>-25&&m<40){let e=(o.ridged(p/11+1.3,l/11-4.4,3)-.45)*1.6+(s.ridged(p/4.3+8.8,l/4.3,2)-.45)*.5;x+=e*R(.35,.7,S)*R(-3,1.5,f)*(1-R(15,38,m))}let C=R(.45,.9,b)*S*(1-R(60,140,m))*R(1,5,f)*R(-.1,.35,s.noise(p/53+4.1,l/53));if(C>.02){let e=o.noise(p/41,l/41)*5+s.noise(p/17,l/17)*1.5,t=6+5*(.5+.5*s.noise(p/97,l/97)),n=(f+e)/t,r=Math.floor(n),i=n-r,a=(r+R(.25,.9,i))*t-e;x+=(a-f)*.3*C}let w=Math.max(R(.35,.8,b),S*.8);if(w>.05){let e=o.fbm(p/24+3.1,l/24-7.7,3)+s.noise(p/6.3,l/6.3)*.08,t=R(.3,.36,e);if(t>0){let n=R(.36,.6,e),r=1-R(.03,.09,Math.abs(s.noise(p/4.6+7.3,l/4.6-1.9)));x+=w*(1.5+1.5*S)*(t*.7+n*.45)*(1-.3*r*t)}}e[d]=f+x*_}}}_features(e,t,n,r){let i=Qn,a=this.origin,o=this.noise,s=this.noise2,c=this.noise3;for(let[t,r,o,l]of Kn){let u=o*2.4,d=Math.max(1,Math.floor(t-u-a)),f=Math.min(2046,Math.ceil(t+u-a)),p=Math.max(1,Math.floor(r-u-a)),m=Math.min(2046,Math.ceil(r+u-a));for(let u=p;u<=m;u++)for(let p=d;p<=f;p++){let d=a+p+.5,f=a+u+.5,m=d-t,h=f-r,g=Math.atan2(h,m),_=o*(1+.22*c.noise(Math.cos(g)*1.7+t,Math.sin(g)*1.7+r)+.08*s.noise(d/2.5,f/2.5)),v=Math.hypot(m,h)/_,y=u*i+p,b=R(1,.82,v),x=l*(1-.25*v*v)+s.ridged(d/6,f/6,3)*2.2,S=(1-R(.9,2.4,v))*(1.6+s.ridged(d/4,f/4,2)*1.4),C=e[y]+S;C=En(C,Math.max(C,x),b),e[y]=C,n[y]=Math.max(n[y],1-R(1.6,2.4,v))}this.rockSites.push({x:t,z:r,r:o,h:l,kind:`stack`})}for(let r=1;r<2047;r++){let l=a+r+.5;if(!(l>330||l<-880))for(let u=1;u<2047;u++){let d=r*i+u,f=t[d];if(f<-4||f>26)continue;let p=n[d];if(p<.3)continue;let m=a+u+.5,h=9+12*(.5+.5*c.fbm(m/45,l/45,2)),g=(1-R(h*.7,h,f))*R(.3,.6,p);if(g<=0)continue;let _=R(.2,.45,s.noise(m/3.1,l/3.1))*.35,v=-.35+.35*o.fbm(m/7,l/7,2)+s.ridged(m/3,l/3,2)*.25-_,y=e[d];v>y&&(e[d]=En(y,v,g),n[d]=Math.max(n[d],g))}}{let n=Math.floor(-200-a),l=Math.ceil(230-a),u=Math.floor(-170-a),d=Math.ceil(160-a);for(let f=u;f<=d;f++)for(let u=n;u<=l;u++){let n=f*i+u,l=r[n];if(l<.05)continue;let d=a+u+.5,p=a+f+.5,m=t[n],h=e[n],g=0;if(m<0){let e=-m,t=Math.sin((d+o.noise(d/60,3.3)*9)*(2*Math.PI/24));g+=t*.09*R(4,12,e)*(1-R(20,32,e)),g+=.14*Math.exp(-(((e-38)/5)**2));let n=Math.hypot((d-er.x)*.8,p-er.z),r=R(85,125,n)*R(14,30,Math.abs(d-z.pier.x));if(r>0&&e>40&&e<130){let t=1-Math.abs(s.noise(d/34,e/15+11.3)),n=c.fbm(d/9,p/9,2);g+=r*R(44,60,e)*(1-R(95,128,e))*(t*t*1.3+n*.35)}}else{let e=Math.exp(-(((m-44)/10)**2))*.28-Math.exp(-(((m-26)/9)**2))*.31;g+=e*(.7+.3*o.noise(d/50,7.7))*R(5,15,m)}e[n]=h+g*l}}for(let t of qn){let n=1/0,r=-1/0,o=1/0,c=-1/0;for(let[e,i]of t.pts)n=Math.min(n,e),r=Math.max(r,e),o=Math.min(o,i),c=Math.max(c,i);let l=t.w*2+2,u=Math.floor(n-l-a),d=Math.ceil(r+l-a),f=Math.floor(o-l-a),p=Math.ceil(c+l-a);for(let n=f;n<=p;n++)for(let r=u;r<=d;r++){let o=a+r+.5,c=a+n+.5,[l]=Jn(t.pts,o,c),u=t.w*(1+.25*s.noise(o/6,c/6)),d=1-R(u*.6,u*1.9,l);if(d<=0)continue;let f=n*i+r,p=Math.round(d*255);p>this.path[f]&&(this.path[f]=p);let m=.08*(1-R(u*.4,u*1.2,l))*R(1.5,3,e[f]);e[f]-=m}}}_scarp(e,t,n,r){let i=Qn,a=this.origin,o=this.noise,s=this.noise2,c=this.noise3,l=this.scarp,u=Math.floor(-200-a),d=Math.ceil(230-a),f=Math.floor(-190-a),p=Math.ceil(0-a);for(let m=f;m<=p;m++)for(let f=u;f<=d;f++){let u=m*i+f,d=r[u];if(d<.3)continue;let p=-t[u];if(p<36||p>95)continue;let h=a+f+.5,g=a+m+.5,_=Math.hypot((h-er.x)*.8,g-er.z),v=R(45,70,_)*R(10,22,Math.abs(h-z.pier.x))*(1-R(.15,.4,n[u]));for(let e of qn){let[t]=Jn(e.pts,h,g);v*=R(e.w+1.5,e.w+6,t)}let y=(.5+.7*R(-.4,.4,c.noise(h/38,4.1)))*v*R(.3,.7,d);if(y<.02)continue;let b=R(.15,.6,o.noise(h/23,9.1)),x=1.1+b*1.8,S=y*(1-b*.35),C=p-Math.max(44+x*.5,49+o.noise(h/45,1.7)*5+s.noise(h/11,g/11)*1.5),w=R(-x*.5,x*.5,C),T=1-R(6,24+s.noise(h/30,3.3)*6,C),E=R(-4.5,-2.5,C)*(1-R(-x*.5-.4,-x*.5+.3,C)),D=E*Math.max(0,c.noise(h/1.4,g/1.4)+s.noise(h/3.1,g/3.1)*.5)*.22*S;e[u]+=S*w*T+D;let O=R(-x*.5-.35,-x*.5+.25,C)*(1-R(x*.5-.1,x*.5+.7,C)),k=.55+.45*R(-x*.5,x*.5,C),A=Math.max(O*k*R(.12,.35,S),E*R(.02,.1,D)*.3);l[u]=Math.max(l[u],Math.round(Mn(A,0,1)*255))}}_seabed(e,t){let n=Qn,r=this.origin,i=this.noise,a=this.noise2,o=this.noise3,s=this.seagrass,c=this.rubble,l=z.reef.center,u=z.reef.radius,d=z.pier.x;for(let f=1;f<2047;f++){let p=r+f+.5;if(!(p<-900||p>420))for(let m=1;m<2047;m++){let h=f*n+m,g=e[h];if(g>-1.2||g<-14)continue;let _=r+m+.5,v=-g,y=t[h],b=a.noise(_/9,p/9)*5+o.noise(_/3.1,p/3.1)*1.5,x=1-R(u*.6,u*.8,Math.hypot(_-l.x,p-l.z)+b*2),S=(1-R(9,13,Math.abs(_-d-4)+b))*R(-70,-55,p)*(1-R(45,60,p+b*2)),C=(1-x)*(1-S);if(C<=0)continue;let w=_+o.fbm(_/60,p/60,2)*26,T=p+o.fbm(_/60+3.7,p/60-8.1,2)*26,E=v+i.noise(_/23+5.5,p/23)*1.1+o.noise(_/7,p/7)*.3,D=R(1.7,2.8,E)*(1-R(8.5,12.5,E))*R(1.2,1.6,v),O=i.fbm(w/85,T/85,3)+a.noise(_/17,p/17)*.22+o.noise(_/6,p/6)*.08+.12*(1-Math.abs(v-5.5)/4)-.2*y,k=R(.1,.3,O)*D*C;if(k>0){let t=R(.42,.62,a.noise(_/7.5+4.4,p/7.5)+o.noise(_/2.7,p/2.7)*.15);k*=1-t*.95,s[h]=Math.round(k*255),e[h]=g+.12*k*R(2.2,3.2,v)}let A=R(1.8,3,v)*(1-R(11,14,v))*C;if(A>0){let t=o.noise(_/13+9.1,p/13-2.2)+i.noise(_/4.3,p/4.3)*.3+y*.35,n=R(.52,.66,t)*A*(1-k*.6);if(n>0){c[h]=Math.round(n*255);let t=.5+.5*a.ridged(_/2.3,p/2.3,2);e[h]=e[h]+.38*n*t*R(2.4,3.4,v)}}}}}_masks(e,t,n,r,i){let a=Qn,o=this.origin,s=this.noise2,c=this.noise3,l=this.rock,u=this.sand,d=this.gully;for(let f=1;f<2047;f++){let p=o+f+.5;for(let m=1;m<2047;m++){let h=f*a+m,g=e[h],_=t[h],v=n[h];if(g<-14){l[h]=v*(1-R(80,260,_)),u[h]=255;continue}let y=o+m+.5,b=e[h+1]-e[h-1],x=e[h+a]-e[h-a],S=Math.sqrt(b*b+x*x)*.5,C=r[h],w=s.noise(y/23,p/23)*.5+c.noise(y/7,p/7)*.25,T=1.45-.75*(_<0?v*(1-R(6,38,-_)):0)+w*.35,E=R(T,T+.35,S);if(E>0&&f>5&&m>5&&f<2042&&m<2042){let t=(e[h+5]+e[h-5]+e[h+5*a]+e[h-5*a]-4*g)/25;E*=1-.85*R(.01,.08,t)}let D=_<0?v*(1-R(2,16+w*12,-_)):v*(1-R(80,260,_)),O=Math.max(E,D*(.75+w*.5));if(f>3&&m>3&&f<2044&&m<2044){let t=(e[h+3]+e[h-3]+e[h+3*a]+e[h-3*a]-4*g)/9;O=Math.max(O,R(.55,.9,S)*R(-.12,-.3,t)*(1-C)*.8)}l[h]=Mn(O*(1-this.scarp[h]/255),0,1);let k;if(_>=0)k=1-R(.4,.8,O);else{let e=-_,t=C*(1-R(36+w*10,50+w*14,e)),n=C*.45*(1-R(60+w*20,100+w*20,e)),r=Math.hypot((y-er.x)*.8,p-er.z),i=C*(R(80,120,r)*R(14,30,Math.abs(y-z.pier.x)))*(1-R(4.5+w*2,7+w*2,g))*(1-R(110,140,e)),a=(1-R(6,16,e))*(1-R(.25,.5,O))*(1-R(1.8,3.2,g))*(1-R(.12,.3,S));k=Math.max(t,n,i,a)*(1-R(.3,.6,S))}u[h]=Math.round(Mn(k,0,1)*255),d[h]=Math.round(R(4,18,-i[h])*255)}}}flatten(e,t,n,r,i=4){let{res:a,texel:o,origin:s}=this,c=n+i;this.pads.push({x:e,z:t,radius:n,height:r});let l=Math.max(0,Math.floor((e-c-s)/o)),u=Math.min(a-1,Math.ceil((e+c-s)/o)),d=Math.max(0,Math.floor((t-c-s)/o)),f=Math.min(a-1,Math.ceil((t+c-s)/o));for(let i=d;i<=f;i++)for(let d=l;d<=u;d++){let l=s+(d+.5)*o,u=s+(i+.5)*o,f=Math.hypot(l-e,u-t),p=1-R(n,c,f),m=i*a+d;this.heights[m]=En(this.heights[m],r,p),this.rock[m]*=1-p}}heightAt(e,t){let{res:n,texel:r,origin:i,heights:a}=this,o=(e-i)/r-.5,s=(t-i)/r-.5;if(o<0||s<0||o>=n-1||s>=n-1)return-90;let c=Math.floor(o),l=Math.floor(s),u=o-c,d=s-l,f=l*n+c,p=a[f],m=a[f+1],h=a[f+n],g=a[f+n+1];return(p*(1-u)+m*u)*(1-d)+(h*(1-u)+g*u)*d}normalAt(e,t,n){let r=this.texel,i=this.heightAt(e+r,t)-this.heightAt(e-r,t),a=this.heightAt(e,t+r)-this.heightAt(e,t-r);return n.set(-i,2*r,-a).normalize(),n}pathDistance(e,t){let n=1/0;for(let r of qn)n=Math.min(n,Jn(r.pts,e,t)[0]-r.w);return n}buildMinMax(){let e=this.res/8;this.mmTile=8,this.mmN=e;let t=new Float32Array(e*e),n=new Float32Array(e*e),r=this.heights,i=this.res;for(let a=0;a<e;a++)for(let o=0;o<e;o++){let s=1/0,c=-1/0,l=Math.min(i-1,(a+1)*8),u=Math.min(i-1,(o+1)*8);for(let e=a*8;e<=l;e++){let t=e*i;for(let e=o*8;e<=u;e++){let n=r[t+e];n<s&&(s=n),n>c&&(c=n)}}t[a*e+o]=s,n[a*e+o]=c}this.mmMin=t,this.mmMax=n,this.mmLevels=[{n:e,min:t,max:n}];let a=this.mmLevels[0];for(;a.n>1;){let e=a.n>>1,t=new Float32Array(e*e),n=new Float32Array(e*e);for(let r=0;r<e;r++)for(let i=0;i<e;i++){let o=2*r*a.n+2*i,s=o+a.n;t[r*e+i]=Math.min(a.min[o],a.min[o+1],a.min[s],a.min[s+1]),n[r*e+i]=Math.max(a.max[o],a.max[o+1],a.max[s],a.max[s+1])}a={n:e,min:t,max:n},this.mmLevels.push(a)}}boundsFor(e,t,n,r){let{origin:i,texel:a,mmTile:o}=this,s=Math.max(n-e,r-t)/(a*o),c=Math.max(0,Math.min(this.mmLevels.length-1,Math.ceil(Math.log2(Math.max(1,s/2))))),l=this.mmLevels[c],u=a*o*(1<<c),d=Math.floor((e-i)/u),f=Math.floor((n-i)/u),p=Math.floor((t-i)/u),m=Math.floor((r-i)/u),h=1/0,g=-1/0,_=!1;for(let e=p;e<=m;e++)for(let t=d;t<=f;t++){if(t<0||e<0||t>=l.n||e>=l.n){_=!0;continue}let n=e*l.n+t;l.min[n]<h&&(h=l.min[n]),l.max[n]>g&&(g=l.max[n])}return _&&(h=Math.min(h,-90),g=Math.max(g,-90)),[h-1,g+2]}},nr=class{constructor(e){this.keys=new Float64Array(e),this.vals=new Int32Array(e),this.size=0}push(e,t){let n=this.size++,r=this.keys,i=this.vals;for(;n>0;){let t=n-1>>1;if(r[t]<=e)break;r[n]=r[t],i[n]=i[t],n=t}r[n]=e,i[n]=t}pop(){let e=this.keys,t=this.vals,n=t[0],r=e[--this.size],i=t[this.size],a=0,o=this.size;for(;;){let n=2*a+1;if(n>=o||(n+1<o&&e[n+1]<e[n]&&n++,e[n]>=r))break;e[a]=e[n],t[a]=t[n],a=n}return e[a]=r,t[a]=i,n}};function rr(e,{res:t=512,swellDir:n=[0,-1],seaLevel:r=0,maxDepth:i=25,minDepth:a=.25}={}){let o=e.size,s=e.origin,c=o/t,l=t*t,u=new Float32Array(l),d=new Float32Array(l);for(let n=0;n<t;n++){let o=s+(n+.5)*c;for(let l=0;l<t;l++){let f=s+(l+.5)*c,p=r-e.heightAt(f,o);u[n*t+l]=p,d[n*t+l]=p>0?Math.sqrt(v*Math.min(Math.max(p,a),i)):0}}let f=new Float32Array(l).fill(1/0),p=new Uint8Array(l),m=new nr(l*4),[h,g]=n,_=Math.sqrt(v*i);for(let e=0;e<t;e++)for(let n=0;n<t;n++){if(n!==0&&e!==0&&n!==t-1&&e!==t-1)continue;let r=e*t+n;if(d[r]<=0)continue;let i=s+(n+.5)*c,a=s+(e+.5)*c;f[r]=(i*h+a*g)/_+o,p[r]=1,m.push(f[r],r)}let y=(e,n)=>{let r=n*t+e,i=d[r];if(i<=0)return 1/0;let a=c/i,o=Math.min(e>0&&p[r-1]===2?f[r-1]:1/0,e<t-1&&p[r+1]===2?f[r+1]:1/0),s=Math.min(n>0&&p[r-t]===2?f[r-t]:1/0,n<t-1&&p[r+t]===2?f[r+t]:1/0),l=Math.min(o,s),u=Math.max(o,s);return!isFinite(u)||u-l>=a?l+a:.5*(l+u+Math.sqrt(2*a*a-(l-u)*(l-u)))};for(;m.size>0;){let e=m.pop();if(p[e]===2)continue;p[e]=2;let n=e%t,r=e/t|0,i=[[n-1,r],[n+1,r],[n,r-1],[n,r+1]];for(let[e,n]of i){if(e<0||n<0||e>=t||n>=t)continue;let r=n*t+e;if(p[r]===2||d[r]<=0)continue;let i=y(e,n);i<f[r]&&(f[r]=i,p[r]=1,m.push(i,r))}}let b=(e,n,r)=>{let i=new Float32Array(l);for(let a=0;a<n;a++){i.set(e);let n=!1;for(let a=0;a<t;a++)for(let o=0;o<t;o++){let s=a*t+o;if(isFinite(i[s]))continue;let c=0,l=0;o>0&&isFinite(i[s-1])&&(c+=i[s-1],l++),o<t-1&&isFinite(i[s+1])&&(c+=i[s+1],l++),a>0&&isFinite(i[s-t])&&(c+=i[s-t],l++),a<t-1&&isFinite(i[s+t])&&(c+=i[s+t],l++),l>0&&(e[s]=c/l+r,n=!0)}if(!n)break}},x=new Float32Array(f);b(x,40,0);let S=new Float32Array(f);b(S,24,c/1.5);let C=S;for(let e=0;e<3;e++){let e=new Float32Array(l);for(let n=0;n<t;n++)for(let r=0;r<t;r++){let i=n*t+r;if(!isFinite(C[i])){e[i]=C[i];continue}let a=C[i]*4,o=4;for(let[e,i]of[[-1,0],[1,0],[0,-1],[0,1]]){let s=r+e,c=n+i;if(s<0||c<0||s>=t||c>=t)continue;let l=C[c*t+s];isFinite(l)&&(a+=l,o++)}e[i]=a/o}C=e}let w=new Float32Array(l*4),T=Math.hypot(h,g);for(let e=0;e<t;e++)for(let n=0;n<t;n++){let r=e*t+n,i=C[r],a=(e,t)=>isFinite(e)&&isFinite(t)?e-t:0,o=n>0?C[r-1]:i,s=n<t-1?C[r+1]:i,c=e>0?C[r-t]:i,l=e<t-1?C[r+t]:i,u=a(s,o),d=a(l,c);u===0&&isFinite(s)&&isFinite(i)&&(u=s-i),d===0&&isFinite(l)&&isFinite(i)&&(d=l-i);let f=Math.hypot(u,d)||1,p=u/f,m=d/f,_=(p*h+m*g)/T,v=Math.min(1,Math.max(.02,_*1.4+.1));w[r*4]=isFinite(i)?i:1e5,w[r*4+1]=p*v,w[r*4+2]=m*v,w[r*4+3]=isFinite(x[r])?x[r]:isFinite(i)?i:1e5}return{data:w,res:t,cellSize:c,origin:s,size:o,depth:u}}var ir=new n,ar=new n,or=new n,sr=new n(0,1,0),cr=new n(1,0,0),B=Math.PI*2,V=(e,t,n)=>t+(n-t)*e(),lr=(e,t,n)=>Math.max(t,Math.min(n,e)),ur=(e,t,n)=>{let r=lr((n-e)/(t-e),0,1);return r*r*(3-2*r)};function dr(e,t=new n){return t.crossVectors(e,Math.abs(e.y)<.9?sr:cr),t.normalize()}function fr(e,t=new n){let r=e()*2-1,i=e()*B,a=Math.sqrt(1-r*r);return t.set(a*Math.cos(i),r,a*Math.sin(i))}function pr(e,t,n,r){let i=[],a=0;for(let o=0;o<t;o++){let t=fr(e).multiplyScalar(V(e,n,r)),s=1/(1+o*.5);a+=s*s,i.push(t.x,t.y,t.z,e()*B,s)}return a=1/Math.sqrt(a*.5),(e,t,n)=>{let r=0;for(let a=0;a<i.length;a+=5)r+=Math.sin(e*i[a]+t*i[a+1]+n*i[a+2]+i[a+3])*i[a+4];return r*a}}var H=class{constructor(){this.position=[],this.normal=[],this.data=[],this.index=[]}get count(){return this.position.length/3}vertex(e,t,n=0,r=1,i=0,a=0){return this.position.push(e.x,e.y,e.z),this.normal.push(t.x,t.y,t.z),this.data.push(n,r,i,a),this.count-1}tri(e,t,n){this.index.push(e,t,n)}quad(e,t,n,r){this.index.push(e,t,n,e,n,r)}backfaces(e,t){let n=this.count,r=this.index.length,i=new Map;for(let t=e;t<n;t++){i.set(t,this.count),ir.fromArray(this.position,t*3),ar.fromArray(this.normal,t*3).negate();let e=this.data;this.vertex(ir,ar,e[t*4],e[t*4+1],e[t*4+2],e[t*4+3])}for(let e=t;e<r;e+=3)this.tri(i.get(this.index[e]),i.get(this.index[e+2]),i.get(this.index[e+1]))}build({normals:e=!1,ao:t=null}={}){let n=new Be;return n.setAttribute(`position`,new Ve(this.position,3)),n.setAttribute(`normal`,new Ve(this.normal,3)),n.setAttribute(`aData`,new Ve(this.data,4)),n.setIndex(this.index),e&&n.computeVertexNormals(),t&&mr(n,t.radius,t.strength??1,t.ground??!0),n.computeBoundingBox(),n.computeBoundingSphere(),n}};function mr(e,t,n=1,r=!0){let i=e.attributes.position.array,a=e.attributes.normal.array,o=e.index.array,s=e.attributes.aData.array,c=o.length/3,l=i.length/3,u=new Float32Array(c),d=new Float32Array(c),f=new Float32Array(c),p=new Float32Array(c),m=new Float32Array(c),h=new Float32Array(c),g=new Float32Array(c),_=t,v=new Map,y=(e,t,n)=>(e+512)*1048576+(t+512)*1024+(n+512);for(let e=0;e<c;e++){let t=o[e*3]*3,n=o[e*3+1]*3,r=o[e*3+2]*3,a=i[n]-i[t],s=i[n+1]-i[t+1],c=i[n+2]-i[t+2],l=i[r]-i[t],b=i[r+1]-i[t+1],x=i[r+2]-i[t+2],S=s*x-c*b,C=c*l-a*x,w=a*b-s*l,T=Math.hypot(S,C,w)||1e-9;g[e]=T*.5,S/=T,C/=T,w/=T,p[e]=S,m[e]=C,h[e]=w,u[e]=(i[t]+i[n]+i[r])/3,d[e]=(i[t+1]+i[n+1]+i[r+1])/3,f[e]=(i[t+2]+i[n+2]+i[r+2])/3;let E=y(Math.floor(u[e]/_),Math.floor(d[e]/_),Math.floor(f[e]/_)),D=v.get(E);D||v.set(E,D=[]),D.push(e)}let b=t*t;for(let e=0;e<l;e++){let o=i[e*3],c=i[e*3+1],l=i[e*3+2],x=a[e*3],S=a[e*3+1],C=a[e*3+2],w=o+x*t*.02,T=c+S*t*.02,E=l+C*t*.02,D=Math.floor(w/_),O=Math.floor(T/_),k=Math.floor(E/_),A=0;for(let e=D-1;e<=D+1;e++)for(let t=O-1;t<=O+1;t++)for(let n=k-1;n<=k+1;n++){let r=v.get(y(e,t,n));if(r)for(let e=0;e<r.length;e++){let t=r[e],n=u[t]-w,i=d[t]-T,a=f[t]-E,o=n*n+i*i+a*a;if(o>b||o<1e-10)continue;let s=Math.sqrt(o),c=(n*x+i*S+a*C)/s;if(c<=.05)continue;let l=Math.abs(n*p[t]+i*m[t]+a*h[t])/s,_=g[t];A+=c*Math.min(1,4*l+.25)*_/(Math.PI*o+_)*(1-o/b)}}if(r&&S<.9){let e=Math.max(c,.002);A+=Math.max(0,-S*.8+.35)*Math.exp(-e/(t*.6))*.6}s[e*4+1]*=lr(1-A*n,.05,1)}}function hr(e,t,r,i={}){let a=i.sides??6,o=t.length,s=i.ellipse??1,c=[0];for(let e=1;e<o;e++)c.push(c[e-1]+t[e].distanceTo(t[e-1]));let l=c[o-1]||1,u=[],d=[],f=[];for(let e=0;e<o;e++){let r=t[Math.max(0,e-1)],i=t[Math.min(o-1,e+1)];u.push(new n().subVectors(i,r).normalize())}let p=null;for(let e=0;e<o;e++){let t;t=i.axis?typeof i.axis==`function`?i.axis(e):i.axis:p??dr(u[e]);let r=t.clone().addScaledVector(u[e],-t.dot(u[e]));r.lengthSq()<1e-8&&dr(u[e],r),r.normalize(),d.push(r),f.push(new n().crossVectors(u[e],r)),p=r}let m=e.count,h=i.twist??0;for(let n=0;n<o;n++){let p=r[n],m=Math.max(0,n-1),g=Math.min(o-1,n+1),_=(r[m]-r[g])/Math.max(1e-5,c[g]-c[m]),v=i.data?i.data(n,c[n]/l):[c[n]/l,0,0];for(let r=0;r<a;r++){let i=r/a*B+h*n,o=Math.cos(i),c=Math.sin(i);ir.copy(t[n]).addScaledVector(d[n],o*p).addScaledVector(f[n],c*p*s),ar.copy(d[n]).multiplyScalar(o*s).addScaledVector(f[n],c).normalize().addScaledVector(u[n],_).normalize(),e.vertex(ir,ar,v[0],1,v[1],v[2])}}for(let t=0;t<o-1;t++)for(let n=0;n<a;n++){let r=m+t*a+n,i=m+t*a+(n+1)%a;e.tri(r,i,r+a),e.tri(i,i+a,r+a)}if(i.cap){let n=o-1,c=r[n],l=i.data?i.data(n,1):[1,0,0],p=m+n*a,g=e.count,_=i.capLength??.95;for(let r=0;r<a;r++){let i=r/a*B+h*n,o=Math.cos(i),p=Math.sin(i);ir.copy(t[n]).addScaledVector(u[n],c*_*.63).addScaledVector(d[n],o*c*.75).addScaledVector(f[n],p*c*.75*s),ar.copy(d[n]).multiplyScalar(o*s).addScaledVector(f[n],p).normalize().multiplyScalar(.7).addScaledVector(u[n],.72).normalize(),e.vertex(ir,ar,l[0],1,l[1],l[2])}for(let t=0;t<a;t++){let n=(t+1)%a;e.tri(p+t,p+n,g+t),e.tri(p+n,g+n,g+t)}ir.copy(t[n]).addScaledVector(u[n],c*_);let v=e.vertex(ir,u[n],l[0],1,l[1],l[2]);for(let t=0;t<a;t++)e.tri(g+t,g+(t+1)%a,v)}return{T:u,N:d,B:f,length:l}}function gr(e,t,n,r=null,i=0,a=0){let o=e.count;for(let o=0;o<t.length;o++){let{r:s,y:c,d:l=[0,0,0]}=t[o];for(let t=0;t<n;t++){let u=t/n*B,d=r?r(u,o):1;ir.set(i+s*d*Math.cos(u),c,a-s*d*Math.sin(u)),e.vertex(ir,sr,l[0],1,l[1],l[2])}}for(let r=0;r<t.length-1;r++)for(let t=0;t<n;t++){let i=o+r*n+t,a=o+r*n+(t+1)%n;e.tri(i,a,i+n),e.tri(a,a+n,i+n)}}var _r=new Map;function vr(e){if(_r.has(e))return _r.get(e);let t=(1+Math.sqrt(5))/2,r=[[-1,t,0],[1,t,0],[-1,-t,0],[1,-t,0],[0,-1,t],[0,1,t],[0,-1,-t],[0,1,-t],[t,0,-1],[t,0,1],[-t,0,-1],[-t,0,1]].map(e=>new n(e[0],e[1],e[2]).normalize()),i=[[0,11,5],[0,5,1],[0,1,7],[0,7,10],[0,10,11],[1,5,9],[5,11,4],[11,10,2],[10,7,6],[7,1,8],[3,9,4],[3,4,2],[3,2,6],[3,6,8],[3,8,9],[4,9,5],[2,4,11],[6,2,10],[8,6,7],[9,8,1]];for(let t=0;t<e;t++){let e=new Map,t=(t,n)=>{let i=t<n?t*1e5+n:n*1e5+t,a=e.get(i);return a===void 0&&(a=r.length,r.push(r[t].clone().add(r[n]).normalize()),e.set(i,a)),a},n=[];for(let[e,r,a]of i){let i=t(e,r),o=t(r,a),s=t(a,e);n.push([e,i,s],[r,o,i],[a,s,o],[i,o,s])}i=n}let a=new n,o=new n,s=new n;for(let e of i)if(a.subVectors(r[e[1]],r[e[0]]),o.subVectors(r[e[2]],r[e[0]]),s.crossVectors(a,o),s.dot(r[e[0]])<0){let t=e[1];e[1]=e[2],e[2]=t}let c={verts:r,faces:i};return _r.set(e,c),c}function yr(e,t,r){let{verts:i,faces:a}=vr(t),o=e.count,s=new n;for(let t of i){let n=r(t,s)??[0,0,0];e.vertex(s,t,n[0],1,n[1],n[2])}for(let t of a)e.tri(o+t[0],o+t[1],o+t[2])}function br(e,t,r,i,a=!0){let o=e.count,s=e.index.length,c=new n;for(let n=0;n<=r;n++)for(let a=0;a<=t;a++){let o=i(a/t,n/r,c)??[0,0,0];e.vertex(c,sr,o[0],1,o[1],o[2])}for(let n=0;n<r;n++)for(let r=0;r<t;r++){let i=o+n*(t+1)+r;e.quad(i,i+1,i+t+2,i+t+1)}let l=e.position,u=e.normal,d=(e,n)=>o+lr(n,0,r)*(t+1)+lr(e,0,t);for(let e=0;e<=r;e++)for(let n=0;n<=t;n++){let t=d(n-1,e),r=d(n+1,e),i=d(n,e-1),a=d(n,e+1);or.set(l[r*3]-l[t*3],l[r*3+1]-l[t*3+1],l[r*3+2]-l[t*3+2]),ir.set(l[a*3]-l[i*3],l[a*3+1]-l[i*3+1],l[a*3+2]-l[i*3+2]),ar.crossVectors(or,ir).normalize();let o=d(n,e);u[o*3]=ar.x,u[o*3+1]=ar.y,u[o*3+2]=ar.z}a&&e.backfaces(o,s)}function xr(e,t=0,r=0){let i=e.position,a=e.normal,o=e.index;for(let n=t;n<e.count;n++)a[n*3]=a[n*3+1]=a[n*3+2]=0;let s=new n,c=new n,l=new n;for(let e=r;e<o.length;e+=3){let t=o[e],n=o[e+1],r=o[e+2];s.fromArray(i,t*3),c.fromArray(i,n*3).sub(s),l.fromArray(i,r*3).sub(s),c.cross(l);for(let e of[t,n,r])a[e*3]+=c.x,a[e*3+1]+=c.y,a[e*3+2]+=c.z}for(let n=t;n<e.count;n++)s.fromArray(a,n*3).normalize(),a[n*3]=s.x,a[n*3+1]=s.y,a[n*3+2]=s.z}function Sr(e,t,n){let r=e.slice(),i=0;for(;r.length>0&&i<t;){let e=r.shift();i++;let t=n(e);if(t)for(let e of t)r.push(e)}}function Cr(e,t,n,r,i){let a=[e.clone()],o=t.clone().normalize(),s=n/r;for(let e=1;e<=r;e++)i&&i(e,o),o.normalize(),a.push(a[e-1].clone().addScaledVector(o,s));return a}var wr=[3,2,1];function Tr(e,t,n){let r=n;for(let n=0;n<t.length;n+=6){let i=t[n],a=t[n+1],o=t[n+2],s=t[n+3],c=t[n+4],l=t[n+5],u=e.x/s,d=e.y/c,f=e.z/l,p=i/s,m=a/c,h=o/l,g=u*u+d*d+f*f,_=-2*(u*p+d*m+f*h),v=p*p+m*m+h*h-1,y=_*_-4*g*v;if(y<0)continue;let b=(-_+Math.sqrt(y))/(2*g);b>r&&(r=b)}return r}function Er(e,t,r=`boulder`){let i={rock:{n:[4,7],spread:.24,size:[.18,.32],flat:[.55,.85],lift:.12,bumps:.1,bumpF:[5,11],fine:.04,undercut:.35,ridged:!0},slab:{n:[10,16],spread:.4,size:[.12,.22],flat:[.3,.55],lift:.02,bumps:.06,bumpF:[5,11],fine:.03,undercut:.1,ico:[4,3,2,1]},boulder:{n:[3,6],spread:.18,size:[.24,.38],flat:[.6,.9],lift:.08,bumps:.06,bumpF:[3,7],fine:.012,undercut:.25},knobby:{n:[7,12],spread:.26,size:[.12,.2],flat:[.8,1],lift:.1,bumps:.03,bumpF:[8,14],fine:.01,undercut:.1},smooth:{n:[1,2],spread:.05,size:[.45,.5],flat:[.7,.95],lift:.04,bumps:.02,bumpF:[3,5],fine:.004,undercut:.05}}[r],a=[],o=i.n[0]+Math.floor(e()*(i.n[1]-i.n[0]+1));for(let t=0;t<o;t++){let n=e()*B,r=Math.sqrt(e())*i.spread*(t===0?.3:1),o=V(e,i.size[0],i.size[1])*(t===0?1.15:1),s=V(e,i.flat[0],i.flat[1]);a.push(Math.cos(n)*r,i.lift+V(e,-.05,.06),Math.sin(n)*r,o*V(e,.85,1.2),o*s*1.6,o*V(e,.85,1.2))}let s=pr(e,7,i.bumpF[0],i.bumpF[1]),c=pr(e,8,14,26),l=new n,u=new H,d=0;yr(u,(i.ico??wr)[t],(e,n)=>{l.set(e.x,e.y>=0?e.y:e.y*.3,e.z).normalize();let r=Tr(l,a,.12),o=s(e.x,e.y,e.z);r*=1+i.bumps*(i.ridged?.6-1.6*o*o:o)+(t===0?i.fine*c(e.x,e.y,e.z):0),n.copy(l).multiplyScalar(r);let u=1-ur(0,.14,n.y);return n.x*=1-i.undercut*u*.5,n.z*=1-i.undercut*u*.5,e.y<0&&(n.y=Math.max(n.y,-.05)),d=Math.max(d,n.y),[0,0,s(e.x*.5,e.y*.5,e.z*.5)*.5+.5]});for(let e=0;e<u.count;e++)u.data[e*4]=lr(u.position[e*3+1]/d,0,1);return xr(u),u.build({ao:{radius:.16,strength:.55}})}function Dr(e,t){if(t===2)return Er(e,2,`knobby`);let n=new H,r=t===0?11:6,i=5+Math.floor(e()*5),a=[];for(let t=0;t<i*8&&a.length<i;t++){let t=e()*B,n=Math.sqrt(e())*.36,r=Math.cos(t)*n,i=Math.sin(t)*n,o=V(e,.07,.12);a.some(e=>Math.hypot(e.x-r,e.z-i)<(e.rad+o)*.8)||a.push({x:r,z:i,rad:o,h:V(e,.18,.3)+.28*(1-n/.36),w:e()})}let o=Math.max(...a.map(e=>e.h+e.rad));for(let i of a){let a=.25/Math.max(.1,Math.hypot(i.x,i.z)+.1),s=i.x*a*.3,c=i.z*a*.3,l=[],u=t===0?5:3;for(let e=0;e<=u;e++){let t=e/u;l.push({r:i.rad*(1.25-.25*ur(0,.4,t)+.12*ur(.6,.95,t)),y:-.03+t*i.h})}let d=t===0?3:2;for(let e=1;e<=d;e++){let t=e/d*Math.PI*.5;l.push({r:i.rad*1.12*Math.cos(t)+.001,y:i.h+i.rad*.9*Math.sin(t)})}let f=n.count,p=n.index.length,m=pr(e,4,8,16);gr(n,l.map(e=>({...e,d:[0,0,i.w]})),r,(e,t)=>1+.06*m(Math.cos(e),t*.3,Math.sin(e)),i.x,i.z);for(let e=f;e<n.count;e++){let t=n.position[e*3+1],r=lr(t/i.h,0,1.2);n.position[e*3]+=s*r*.3,n.position[e*3+2]+=c*r*.3,n.data[e*4]=lr(t/o,0,1)}xr(n,f,p)}let s=n.count,c=n.index.length,l=pr(e,4,2,4);return yr(n,t===0?2:1,(e,t)=>{let n=.44*(1+.12*l(e.x,e.y,e.z));return t.set(e.x*n,Math.max(e.y>=0?e.y*.16:e.y*.02,-.03),e.z*n),[t.y/o,0,0]}),xr(n,s,c),n.build({ao:{radius:.14,strength:1.3}})}function Or(e,t){let n=new H,r=[30,12,7][t],i=[10,5,2][t],a=V(e,.42,.58),o=pr(e,5,1.5,3.5),s=[{r:.5,y:-.03},{r:.515,y:0}];for(let e=1;e<=i;e++){let t=e/i*Math.PI*.5,n=Math.cos(t)**.8,r=Math.sin(t)**1.15;s.push({r:.5*n+.001,y:a*r})}let c=n.count;gr(n,s,r,e=>1+.05*o(Math.cos(e),0,Math.sin(e)));for(let e=c;e<n.count;e++){let t=n.position[e*3],r=n.position[e*3+1],i=n.position[e*3+2];n.position[e*3+1]=r*(1+.08*o(t*2,.5,i*2)),n.data[e*4]=lr(r/a,0,1)}return xr(n),n.build({ao:{radius:.1,strength:.6}})}function kr(e,t){let n=new H,r=[12,7,5][t],i=3+Math.floor(e()*4);for(let a=0;a<i;a++){let o=a/i*B+e()*.8,s=a===0?0:V(e,.1,.22),c=Math.cos(o)*s,l=Math.sin(o)*s,u=V(e,.05,.085),d=a===0?V(e,.75,1):V(e,.3,.8),f=[],p=[8,4,2][t];for(let e=0;e<=p;e++){let t=e/p;f.push({r:u*(1.3-.3*ur(0,.2,t)+.05*Math.sin(t*9+a)),y:-.02+t*d,d:[0,0,a/i]})}for(let e=1;e<=(t===2?1:3);e++){let n=e/(t===2?1:3)*Math.PI*.5;f.push({r:u*Math.cos(n)+.001,y:d+u*.8*Math.sin(n),d:[0,0,a/i]})}let m=n.count,h=n.index.length;gr(n,f,r,null,c,l);for(let e=m;e<n.count;e++)n.data[e*4]=lr(n.position[e*3+1],0,1);xr(n,m,h)}return n.build({ao:{radius:.12,strength:1}})}function Ar(e,t){let r=new H,i=[8,5,4][t],a=[4,2,1][t],o=new n(0,1,0),s=new n(V(e,-.03,.03),V(e,.12,.18),V(e,-.03,.03));hr(r,[new n(0,-.03,0),new n(0,.06,0),s],[.11,.08,.065],{sides:i,ellipse:.8,data:(e,t)=>[t*.15,0,0]});let c=[],l=3+Math.floor(e()*2),u=e()*B;for(let t=0;t<l;t++){let r=u+t/l*B+V(e,-.3,.3),i=V(e,.35,.75),a=new n(Math.cos(r)*Math.cos(i),Math.sin(i),Math.sin(r)*Math.cos(i));c.push({p:s.clone().addScaledVector(a,-.02),dir:a,w:.055,len:V(e,.2,.3),depth:0,t0:.15})}let d=t===2?1:2;return Sr(c,40,t=>{let s=new n().crossVectors(t.dir,o);s.lengthSq()<1e-4&&s.set(1,0,0),s.normalize();let c=Cr(t.p,t.dir,t.len,a,(t,n)=>{n.y-=.03,n.addScaledVector(s,(e()-.5)*.12)}),l=t.depth>=d,u=t.w*(l?1.6:1.35),f=c.map((e,n)=>t.w+(u-t.w)*(n/a)),p=lr(.55-t.depth*.12,.3,.55),m=Math.min(1,t.t0+t.len/.75),h=e();if(hr(r,c,f,{sides:i,ellipse:p,cap:l,capLength:.4,axis:s,data:(e,n)=>[t.t0+(m-t.t0)*n,l&&n>.9?1:0,h]}),l)return null;let g=c[c.length-1],_=g.clone().sub(c[c.length-2]).normalize(),v=[],y=e()<.3?3:2,b=V(e,.9,1.4);for(let n=0;n<y;n++){let r=(n/(y-1)-.5)*b,i=_.clone().applyAxisAngle(o,r).addScaledVector(o,V(e,0,.25)).normalize();v.push({p:g.clone().addScaledVector(_,-t.w*.4),dir:i,w:u*V(e,.62,.75),len:t.len*V(e,.75,1.05),depth:t.depth+1,t0:m})}return v}),xr(r),r.build({ao:{radius:.18,strength:1.1}})}function jr(e,t){let r=new H,i=[5,4,3][t],a=[3,2,1][t],o=[1,1.15,1.9][t],s=[56,30,14][t],c=new n(0,1,0),l=[],u=4+Math.floor(e()*3);for(let t=0;t<u;t++){let r=t/u*B+e()*.9,i=V(e,.55,1.2),a=new n(Math.cos(r)*Math.cos(i),Math.sin(i),Math.sin(r)*Math.cos(i)),o=V(e,0,.12);l.push({p:new n(Math.cos(r)*o,-.02,Math.sin(r)*o),dir:a,r:.016,len:V(e,.18,.3),depth:0,t0:0})}return Sr(l,s,t=>{let n=Cr(t.p,t.dir,t.len,a,(t,n)=>{n.y+=.12,n.x+=(e()-.5)*.25,n.z+=(e()-.5)*.25}),s=t.depth>=3||t.len<.07,l=Math.max(.0075,t.r*.78),u=n.map((e,n)=>(t.r+(l-t.r)*(n/a))*o),d=Math.min(1,t.t0+t.len/.55);if(hr(r,n,u,{sides:i,cap:s,data:(n,r)=>[t.t0+(d-t.t0)*r,s&&r>.8?1:0,e()]}),s)return null;let f=[],p=n[n.length-1].clone().sub(n[n.length-2]).normalize();f.push({p:n[n.length-1].clone(),dir:p,r:l,len:t.len*V(e,.7,.95),depth:t.depth+1,t0:d});let m=t.depth<2?2:1;for(let r=0;r<m;r++){let r=V(e,.35,.85),i=Math.min(a-1,Math.floor(r*a)),o=n[i].clone().lerp(n[i+1],r*a-i),s=dr(p).applyAxisAngle(p,e()*B),l=p.clone().multiplyScalar(.6).addScaledVector(s,.8).addScaledVector(c,.25).normalize();f.push({p:o,dir:l,r:t.r*.8,len:t.len*V(e,.5,.8),depth:t.depth+1,t0:t.t0+(d-t.t0)*r})}return f}),r.build({ao:{radius:.12,strength:1.4}})}function Mr(e,t){let r=new H,i=[6,4,3][t],a=[3,1,1][t],o=[28,14,7][t];for(let s=0;s<o;s++){let o=e()*B,s=Math.sqrt(e())*.15,c=1.45-s/.15*.55+V(e,-.15,.15),l=new n(Math.cos(o)*Math.cos(c),Math.sin(c),Math.sin(o)*Math.cos(c)),u=Cr(new n(Math.cos(o)*s,-.01,Math.sin(o)*s),l,V(e,.08,.17)*(1.15-s*2.5),a,(t,n)=>{n.x+=(e()-.5)*.25,n.z+=(e()-.5)*.25,n.y+=.05}),d=V(e,.012,.018)*(t===2?1.4:1),f=e();hr(r,u,u.map((e,t)=>d*(1+t/a*.3)),{sides:i,cap:!0,data:(e,t)=>[t,+(t>.75),f]})}return r.build({ao:{radius:.06,strength:1.2}})}function Nr(e,t){let r=new H,i=[9,6,4][t],a=[6,4,2][t],o=[3,1,1][t];for(let t=0;t<i;t++){let t=V(e,-.16,.16),i=V(e,-.16,.16),s=Math.floor(e()*3)/3*Math.PI+V(e,-.2,.2),c=V(e,.1,.18),l=V(e,.08,.2),u=pr(e,3,10,25),d=pr(e,2,15,30),f=V(e,-.03,.03),p=Math.cos(s),m=Math.sin(s),h=e(),g=(e,n,r,a)=>{let o=(e-.5)*c,s=Math.abs(e-.5)*2,g=n*(l*(.85+.15*u(o,0,0))*(.4+.6*Math.sqrt(Math.max(0,1-s**3)))),_=r*.011*(1-.6*n)*(1-.5*s*s)+f*s*s+.012*d(o*3,g*3,0)*n;return a.set(t+o*p-_*m,g-.01,i+o*m+_*p),[n,+(n>.8),h]},_=r.count,v=r.index.length;br(r,a,o,(e,t,n)=>g(e,t,1,n),!1),br(r,a,o,(e,t,n)=>g(1-e,t,-1,n),!1);let y=[];for(let e=0;e<=a;e++){let t=e/a,i=new n,o=new n;g(t,1,1,i),g(t,1,-1,o),y.push(r.vertex(i,sr,1,1,1,h),r.vertex(o,sr,1,1,1,h))}for(let e=0;e<a;e++)r.quad(y[e*2],y[e*2+2],y[e*2+3],y[e*2+1]);xr(r,_,v)}return r.build({ao:{radius:.05,strength:.6}})}function Pr(e,t){let r=new H,i=[4,2,1][t],a=[12,8,4][t],o=2+Math.floor(e()*2),s=e()*B,c=[.05];for(let t=1;t<o;t++)c.push(c[t-1]+V(e,.09,.13));let l=c[o-1]+.01;gr(r,[{r:.07,y:-.02,d:[0,0,0]},{r:.05,y:l*.5,d:[.2,0,0]},{r:.04,y:l,d:[.3,0,0]},{r:.002,y:l+.015,d:[.3,0,0]}],t===0?8:5);for(let t=0;t<o;t++){let o=V(e,.26,.38)*(1-t*.18),l=c[t],u=s+V(e,-.5,.5)+t*.4,d=V(e,2,3.2),f=V(e,.05,.2),p=pr(e,3,2,4),m=e(),h=(e,t,n,r)=>{let i=u+(e-.5)*d,a=1-.35*(Math.abs(e-.5)*2)**2,s=.03+t*o*a*(1+.08*p(Math.cos(i),0,Math.sin(i))),c=l+t*o*f-.06*t*t*o+.012*t*p(Math.cos(i)*2,1,Math.sin(i)*2)+n*.006*(1-t*.5);return r.set(Math.cos(i)*s,c,Math.sin(i)*s),[t,+(n>0),m]},g=r.count,_=r.index.length;br(r,a,i,(e,t,n)=>h(e,t,1,n),!1),br(r,a,i,(e,t,n)=>h(1-e,t,-1,n),!1);let v=[];for(let e=0;e<=a;e++){let t=new n,i=new n;h(e/a,1,1,t),h(e/a,1,-1,i),v.push(r.vertex(t,sr,1,1,1,m),r.vertex(i,sr,1,1,1,m))}for(let e=0;e<a;e++)r.quad(v[e*2],v[e*2+2],v[e*2+3],v[e*2+1]);xr(r,g,_)}let u=r.count,d=r.index.length;return yr(r,[2,1,0][t],(e,t)=>(t.set(e.x*.1,Math.max(e.y>=0?e.y*.12:e.y*.02,-.02),e.z*.1),[0,0,0])),xr(r,u,d),r.build({ao:{radius:.1,strength:1.1}})}function Fr(e,t){let r=new H,i=[5,4,3][t],a=[3,2,1][t],o=[1,1.2,2][t],s=.85,c=new n(0,1,0),l=V(e,0,B),u=new n(Math.cos(l),0,Math.sin(l));return Sr([{p:new n(0,-.02,0),dir:new n(V(e,-.1,.1),1,V(e,-.1,.1)),r:.02,len:V(e,.1,.16),depth:0}],[36,20,10][t],t=>{let l=Cr(t.p,t.dir,t.len,a,(t,n)=>{n.y+=.08,n.addScaledVector(u,(e()-.5)*.2)}),d=t.depth>=5||l[l.length-1].y>s*.92,f=t.r*.9,p=e();if(hr(r,l,l.map((e,n)=>(t.r+(f-t.r)*n/a)*o),{sides:i,cap:d,data:(e,t)=>[lr(l[e].y/s,0,1),0,p]}),d)return null;let m=l[l.length-1],h=m.clone().sub(l[l.length-2]).normalize(),g=[];for(let r of[-1,1]){let i=r*V(e,.3,.6),a=new n().crossVectors(h,u).normalize();a.lengthSq()<.1&&a.set(1,0,0);let o=h.clone().applyAxisAngle(a,i).applyAxisAngle(h,V(e,-.5,.5)).addScaledVector(c,.3).normalize();g.push({p:m.clone(),dir:o,r:Math.max(.011,f*.92),len:V(e,.09,.19),depth:t.depth+1})}return g}),r.build({ao:{radius:.08,strength:1}})}function Ir(e,t){let r=new H,i=[6,4,3][t],a=[10,5,3][t],o=3+Math.floor(e()*4);for(let s=0;s<o;s++){let o=e()*B,s=V(e,.05,.4),c=new n(Math.cos(o)*s,1,Math.sin(o)*s),l=V(e,-.06,.06),u=Cr(new n(0,-.02,0),c,V(e,.6,1.1),a,(e,t)=>{t.x+=l,t.y+=.02}),d=V(e,.006,.009)*(t===2?1.8:1),f=e();hr(r,u,u.map((e,t)=>d*(1-.4*t/a)),{sides:i,cap:!0,data:(e,t)=>[lr(u[e].y,0,1),0,f]})}return r.build()}function Lr(e,t){let n=new H,r=[48,24,12][t],i=9+Math.floor(e()*6),a=e()*B,o=pr(e,5,8,16),s=V(e,.65,.9),c=V(e,.28,.34),l=[[.16,-.02],[.24,.1],[.33,.3],[.35,.5],[c+.01,.75],[c,1]],u=[],d=t===2?2:1;for(let e=0;e<l.length;e+=d)u.push({r:l[e][0],y:l[e][1]*s,d:[l[e][1],0,0]});t===2&&u.push({r:c,y:s,d:[1,0,0]}),u.push({r:c-.035,y:s-.01,d:[1,1,0]}),u.push({r:c-.06,y:s*.7,d:[.7,1,0]}),t<2&&u.push({r:c-.1,y:s*.35,d:[.35,1,0]}),u.push({r:.02,y:s*.18,d:[.2,1,0]});let f=u.findIndex(e=>e.d[1]===1);return gr(n,u,r,(e,t)=>{if(t>=f)return 1;let n=u[t].y/s;return 1+(.1*Math.abs(Math.cos(e*i/2+a))**2.5-.04)*ur(.05,.3,n)+.04*o(Math.cos(e),n*2,Math.sin(e))}),xr(n),n.build({ao:{radius:.2,strength:1.2}})}function Rr(e,t,n=!1){let r=new H,i=[12,6,4][t],a=n?1+Math.floor(e()*3):2+Math.floor(e()*5);for(let o=0;o<a;o++){let a=e()*B,s=o===0?0:V(e,.03,.09),c=Math.cos(a)*s,l=Math.sin(a)*s,u=n?V(e,.25,.4):V(e,.15,.42),d=n?V(e,.05,.08):V(e,.022,.04),f=n?V(e,1.8,2.6):V(e,1,1.25),p=V(e,.05,.25),m=Math.atan2(l,c)+V(e,-.4,.4),h=e(),g=[4,2,1][t],_=[];for(let e=0;e<=g;e++){let t=e/g;_.push({r:d*(.8+(f-.8)*t**(n?1.6:1)),y:-.02+t*u,d:[t,0,h]})}let v=_[_.length-1],y=n?.006:d*.28;t<2?(_.push({r:v.r-y,y:v.y-.004,d:[1,1,h]}),_.push({r:(v.r-y)*.85,y:v.y-u*.3,d:[.7,1,h]}),_.push({r:.004,y:v.y-u*.6,d:[.4,1,h]})):_.push({r:.002,y:v.y-u*.15,d:[1,1,h]});let b=r.count,x=r.index.length,S=pr(e,3,10,20);gr(r,_,i,(e,t)=>1+.05*S(Math.cos(e),t*.4,Math.sin(e)),0,0);for(let e=b;e<r.count;e++){let t=Math.max(0,r.position[e*3+1]);r.position[e*3]+=c+Math.cos(m)*p*t,r.position[e*3+2]+=l+Math.sin(m)*p*t}xr(r,b,x)}return r.build({ao:{radius:.08,strength:1.2}})}function zr(e,t){let r=new H,i=[6,4,3][t],a=[8,4,2][t],o=2+Math.floor(e()*4);for(let t=0;t<o;t++){let t=e()*B,o=new n(Math.cos(t),V(e,.6,1.4),Math.sin(t)),s=Cr(new n(0,-.01,0),o,V(e,.3,.6),a,(t,n)=>{n.y-=.18,n.x+=(e()-.5)*.3,n.z+=(e()-.5)*.3});for(let e of s)e.y=Math.max(e.y,.01);let c=V(e,.014,.022),l=e();hr(r,s,s.map(()=>c),{sides:i,cap:!0,data:(e,t)=>[t,0,l]})}return r.build({ao:{radius:.06,strength:1}})}function Br(e,t){let r=new H;yr(r,t===0?2:1,(e,t)=>(t.set(e.x*.045,.035+e.y*(e.y>0?.035:.02),e.z*.045),[0,0,0])),xr(r);let i=t===0?56:18,a=new n,o=new n,s=new n;for(let t=0;t<i;t++){fr(e,a),a.y=Math.abs(a.y)*.9+.1,a.normalize();let t=V(e,.12,.22)*(.6+.4*a.y),i=new n(0,.035,0).addScaledVector(a,.04);dr(a,o),s.crossVectors(a,o);let c=e(),l=[];for(let e=0;e<3;e++){let t=e/3*B;ar.copy(o).multiplyScalar(Math.cos(t)).addScaledVector(s,Math.sin(t)),ir.copy(i).addScaledVector(ar,.0032),l.push(r.vertex(ir,ar,0,1,1,c))}ir.copy(i).addScaledVector(a,t);let u=r.vertex(ir,a,1,1,1,c);for(let e=0;e<3;e++)r.tri(l[e],l[(e+1)%3],u)}return r.build()}function Vr(e,t){let r=new H;gr(r,[{r:.045,y:-.01},{r:.04,y:.03},{r:.05,y:.05},{r:.03,y:.058},{r:.002,y:.06}],t===0?12:7),xr(r);let i=t===0?44:18,a=t===0?4:3,o=t===0?4:2;for(let t=0;t<i;t++){let s=t/i*B*3.1+e()*.3,c=t%3/3,l=.018+c*.025,u=V(e,.5,1.2)-c*.4,d=new n(Math.cos(s)*Math.cos(u),Math.sin(u),Math.sin(s)*Math.cos(u)),f=Cr(new n(Math.cos(s)*l,.055,Math.sin(s)*l),d,V(e,.08,.14),o,(e,t)=>{t.y-=.12,t.x+=Math.cos(s)*.1,t.z+=Math.sin(s)*.1}),p=e();hr(r,f,f.map((e,t)=>.0065*(1-.35*t/o)),{sides:a,cap:!0,data:(e,t)=>[t,1,p]})}return r.build({ao:{radius:.04,strength:.8}})}function Hr(e,t){let r=new H,i=[12,6,3][t];for(let a=0;a<i;a++){let i=e()*B,a=Math.sqrt(e())*.28,o=Math.cos(i)*a,s=Math.sin(i)*a,c=e(),l=+(e()<.4);if(e()<.55){let i=e()*B,a=V(e,.05,.14),u=V(e,.008,.014),d=new n(Math.cos(i),V(e,-.1,.25),Math.sin(i)),f=new n(o,u*.7,s);hr(r,[f,f.clone().addScaledVector(d.normalize(),a)],[u,u*.8],{sides:t===0?5:3,cap:!0,data:()=>[0,l,c]})}else{let n=V(e,.025,.07),i=pr(e,3,2,4),a=r.count,u=r.index.length;yr(r,+(t===0),(e,t)=>{let r=1+.3*i(e.x,e.y,e.z);return t.set(o+e.x*n*r,Math.max(.3*n+e.y*n*.6*r,-.01),s+e.z*n*r),[0,l*.5,c]}),xr(r,a,u)}}return r.build({ao:{radius:.05,strength:1}})}function Ur(e,t){let n=new H,r=[10,6,3][t],i=[5,3,2][t];for(let a=0;a<r;a++){let r=e()*B,a=e()*.05,o=Math.cos(r)*a,s=Math.sin(r)*a,c=e()*Math.PI,l=V(e,.15,.32),u=V(e,.008,.011)*(t===2?1.6:1),d=Math.cos(c),f=Math.sin(c),p=V(e,-.15,.15),m=e(),h=n.count,g=n.index.length;for(let e=0;e<=i;e++){let t=e/i,r=t*l,a=p*r*t,c=u*(e===i?.4:1);ar.set(-f,0,d);for(let e of[-1,1])ir.set(o+d*e*c*.5-f*a,r,s+f*e*c*.5+d*a),n.vertex(ir,ar,t,.6+.4*t,e,m)}for(let e=0;e<i;e++)n.quad(h+e*2,h+e*2+1,h+e*2+3,h+e*2+2);n.backfaces(h,g)}return n.build()}function Wr(e,t){let r=new H,i=[18,10,6][t],a=[10,5,3][t],o=V(e,1,1.25),s=pr(e,5,2,6),c=pr(e,4,3,7),l=V(e,-.25,.25),u=e();return br(r,i,a,(e,t,n)=>{let r=(e-.5)*2*o,i=.02+t*(.8*(.88+.12*s(Math.sin(r),Math.cos(r),0))*(1-.22*(Math.abs(r)/o)**3)-.02),a=Math.sin(r)*i*1.1,d=.06+Math.cos(r)*i,f=l*a*a+.03*t*c(a*2,d*2,0);return n.set(a,d,f),[t,0,u]},!1),hr(r,[new n(0,-.02,0),new n(0,.08,0)],[.018,.012],{sides:t===0?5:3,data:()=>[0,1,u]}),r.build()}function Gr(e,t){let r=new H,i=[9,5,3][t],a=[7,5,3][t]+Math.floor(e()*3),o=new n(V(e,-.02,.02),V(e,.08,.14),V(e,-.02,.02));hr(r,[new n(0,-.02,0),o],[.012,.008],{sides:4,data:()=>[0,4,0]});let s=e()*B;for(let t=0;t<a;t++){let c=s+(t/Math.max(1,a-1)-.5)*V(e,1.4,2.2)+V(e,-.2,.2)+(e()<.3?Math.PI:0),l=V(e,.2,.6),u=new n(Math.cos(c)*l,1,Math.sin(c)*l).normalize(),d=V(e,.5,.95),f=V(e,.02,.08),p=Cr(o,u,d,i,(e,t)=>{t.y-=f*e/i}),m=V(e,.05,.08),h=e(),g=e()*Math.PI;for(let e=0;e<2;e++){let t=r.count;for(let t=0;t<=i;t++){let n=t/i,a=p[t],o=p[Math.min(i,t+1)].clone().sub(p[Math.max(0,t-1)]).normalize(),s=dr(o).applyAxisAngle(o,g+e*Math.PI*.5),c=m*(e===0?1:.6)*Math.sin(Math.min(1,n*6)*Math.PI*.5)*(1-.55*n);ar.crossVectors(o,s).normalize();for(let e of[-1,1])ir.copy(a).addScaledVector(s,e*c),r.vertex(ir,ar,n,1,e,h)}for(let e=0;e<i;e++)r.quad(t+e*2,t+e*2+1,t+e*2+3,t+e*2+2)}}return r.build()}function Kr(e,t,r,i,a,o,s,c,l,u,d=.45){let f=e.count,p=e.index.length,m=new n().crossVectors(r,i).normalize(),h=[];for(let e=0;e<=c;e++){let n=e/c;h.push(t.clone().addScaledVector(r,n*a).addScaledVector(i,s*n*n))}for(let t=0;t<=c;t++){let n=t/c,r=h[Math.min(c,t+1)].clone().sub(h[Math.max(0,t-1)]).normalize();ar.crossVectors(m,r).normalize();let i=o*(t===c?.35:1-.25*n);for(let r of[-1,1])ir.copy(h[t]).addScaledVector(m,r*i*.5),e.vertex(ir,ar,n,d+(1-d)*n,r,u)}for(let t=0;t<c;t++)e.quad(f+t*2,f+t*2+1,f+t*2+3,f+t*2+2);e.backfaces(f,p)}function qr(e,t){let r=new H,i=[];for(let t=0;t<140;t++){let t=e()*B,n=Math.sqrt(e())*.97,r=e()<.2,a=2+Math.floor(e()*3),o=e()*Math.PI,s=[];for(let t=0;t<4;t++)s.push([e(),e(),e(),e()]);i.push({x:Math.cos(t)*n,z:Math.sin(t)*n,manatee:r,nb:a,yaw:o,blades:s})}let a=[140,46,16][t],o=[2,1,1][t],s=[1,1.45,2.3][t],c=[4,2,1][t],l=new n(0,1,0),u=new n,d=new n,f=new n;for(let e=0;e<a;e++){let t=i[e],n=Math.min(t.nb,c);for(let e=0;e<n;e++){let[i,a,c,p]=t.blades[e],m=t.manatee?.22+i*.26:.1+i*.26,h=(t.manatee?.0035:.008+a*.005)*s,g=e-(n-1)/2;u.set(Math.cos(t.yaw),0,Math.sin(t.yaw)),d.copy(l).addScaledVector(u,g*.14+(c-.5)*.1).normalize();let _=(p-.3)*.35*m*Math.sign(g||1);f.set(t.x+u.x*.003*g,-.01,t.z+u.z*.003*g),Kr(r,f,d,u,m,h,_,o,0,c)}}return r.build()}function Jr(e,t){let r=new H,i=3+Math.floor(e()*3),a=[28,11,4][t],o=[1,1.4,2.2][t],s=t===0?7:5,c=.25;for(let t=0;t<i;t++){let t=e()*B,i=Math.sqrt(e())*.13,l=e();Sr([{p:new n(Math.cos(t)*i,0,Math.sin(t)*i),dir:new n(V(e,-.3,.3),1,V(e,-.3,.3)).normalize(),n:0}],a,t=>{let i=V(e,.011,.016)*o*(1-.25*t.p.y/c),a=t.p.clone().addScaledVector(t.dir,i),u=new n(Math.cos(l*20+t.n),.25,Math.sin(l*20+t.n)).normalize(),d=new n().crossVectors(u,t.dir).normalize(),f=new n().crossVectors(d,u).normalize(),p=r.count,m=r.index.length,h=lr(a.y/c,0,1),g=e(),_=r.vertex(a,u,h,1,0,g);for(let e=0;e<s;e++){let t=e/s*B,n=1-.25*Math.max(0,Math.cos(t));ir.copy(a).addScaledVector(d,Math.sin(t)*i*1.15).addScaledVector(f,Math.cos(t)*i*n),r.vertex(ir,u,h,.9,0,g)}for(let e=0;e<s;e++)r.tri(_,p+1+e,p+1+(e+1)%s);if(r.backfaces(p,m),a.y>c||t.n>9)return null;let v=[],y=t.n>1&&e()<.35?2:1;for(let r=0;r<y;r++){let r=t.dir.clone().add(new n(V(e,-.35,.35),.15,V(e,-.35,.35))).normalize();v.push({p:a.clone().addScaledVector(t.dir,i*.35),dir:r,n:t.n+1})}return v})}return r.build()}function Yr(e,t){let r=new H,i=2+Math.floor(e()*4);for(let a=0;a<i;a++){let i=e()*B,o=a===0?0:V(e,.03,.1),s=Math.cos(i)*o,c=Math.sin(i)*o,l=V(e,.05,.1),u=new n(V(e,-.15,.15),1,V(e,-.15,.15)).normalize(),d=new n(s,-.01,c).addScaledVector(u,l),f=e();hr(r,[new n(s,-.01,c),d],[.004,.0035],{sides:t===0?4:3,data:()=>[.5,0,f]});let p=r.count,m=r.index.length,h=V(e,.014,.022)*(t===2?1.2:1);yr(r,+(t===0),(e,t)=>(t.set(d.x+e.x*h,d.y+h*.9+e.y*h*1.25,d.z+e.z*h),[1,1,f])),xr(r,p,m)}return r.build()}function Xr(e,t){let r=new H,i=2+Math.floor(e()*3),a=.45,o=[7,4,2][t],s=[1,.4,.15][t],c=[1,1.5,2.2][t],l=new n(0,1,0);for(let u=0;u<i;u++){let i=e()*B,u=V(e,.1,.4),d=new n(Math.cos(i)*u,1,Math.sin(i)*u),f=V(e,.3,.5),p=V(e,.1,.25),m=Cr(new n(V(e,-.02,.02),-.01,V(e,-.02,.02)),d,f,o,(t,n)=>{n.x+=(e()-.5)*p,n.z+=(e()-.5)*p}),h=e();hr(r,m,m.map((e,t)=>.0028*c*(1-.3*t/o)),{sides:3,cap:!1,data:e=>[lr(m[e].y/a,0,1),0,h]});for(let i=0;i<14;i++){let u=(.15+.85*(i+e())/14)*o,d=Math.min(o-1,Math.floor(u)),f=m[d].clone().lerp(m[d+1],u-d),p=e()*B,g=V(e,.3,1.1),_=V(e,.025,.045),v=V(e,.005,.009),y=e()<.35;if(!(e()<s))continue;let b=new n(Math.cos(p)*Math.cos(g),Math.sin(g),Math.sin(p)*Math.cos(g)),x=new n().crossVectors(b,l).normalize();x.lengthSq()<.1&&x.set(1,0,0);let S=lr(f.y/a,0,1);Kr(r,f,b,x,_,v*c,_*.3,1,1,e(),.7);for(let e=r.count-8;e<r.count;e++)r.data[e*4]=S,r.data[e*4+2]=1;if(y&&t===0){let e=r.count,t=r.index.length,n=f.clone().addScaledVector(b,-.004).addScaledVector(x,.006);yr(r,0,(e,t)=>(t.copy(n).addScaledVector(e,.0035),[S,2,h])),xr(r,e,t)}}}return r.build()}function Zr(e,t){let n=new H,r=[16,10,6][t],i=[6,3,2][t],a=[3,1,1][t];for(let t=0;t<r;t++){let t=e()*B,r=Math.sqrt(e())*.2,o=Math.cos(t)*r,s=Math.sin(t)*r,c=e()*Math.PI,l=V(e,.08,.16),u=V(e,.1,.24)*(1-r*1.5),d=pr(e,3,12,28),f=V(e,-.9,.9),p=e(),m=(e,t,n,r)=>{let i=(e-.5)*l,a=Math.abs(e-.5)*2,m=t*(u*(.8+.2*d(i,0,0))*(.45+.55*Math.sqrt(Math.max(0,1-a**2.5)))),h=c+f*t,g=n*.005*(1-.5*t)+.04*a*a*t+.01*d(i*4,m*4,0),_=Math.cos(h),v=Math.sin(h);return r.set(o+i*_-g*v,m-.01,s+i*v+g*_),[t,+(t>.8),p]},h=n.count,g=n.index.length;br(n,i,a,(e,t,n)=>m(e,t,1,n),!1),br(n,i,a,(e,t,n)=>m(1-e,t,-1,n),!1),xr(n,h,g)}return n.build({ao:{radius:.06,strength:.8}})}function Qr(e,t){let r=new H,i=[5,3,1][t],a=[16,9,6][t],o=1+ +(e()<.55);for(let t=0;t<o;t++){let o=V(e,.4,.62)*(1-t*.3),s=.1+t*V(e,.14,.22),c=e()*B,l=V(e,2.6,3.8),u=V(e,0,.12),d=pr(e,4,2,5),f=e(),p=(e,t,n,r)=>{let i=c+(e-.5)*l,a=1-.3*(Math.abs(e-.5)*2)**2,p=.03+t*o*a*(1+.1*d(Math.cos(i),0,Math.sin(i))),m=s+t*o*u-.08*t*t*t*o+.03*t*t*d(Math.cos(i)*3,2,Math.sin(i)*3)+n*.005*(1-t*.6);return r.set(Math.cos(i)*p,m,Math.sin(i)*p),[t,+(n>0),f]},m=r.count,h=r.index.length;br(r,a,i,(e,t,n)=>p(e,t,1,n),!1),br(r,a,i,(e,t,n)=>p(1-e,t,-1,n),!1);let g=[];for(let e=0;e<=a;e++){let t=new n,i=new n;p(e/a,1,1,t),p(e/a,1,-1,i),g.push(r.vertex(t,sr,1,1,1,f),r.vertex(i,sr,1,1,1,f))}for(let e=0;e<a;e++)r.quad(g[e*2],g[e*2+2],g[e*2+3],g[e*2+1]);xr(r,m,h)}let s=r.count,c=r.index.length;return gr(r,[{r:.13,y:-.03,d:[0,0,0]},{r:.1,y:.06,d:[.1,0,0]},{r:.07,y:.14+(o-1)*.16,d:[.2,0,0]},{r:.002,y:.16+(o-1)*.16,d:[.2,0,0]}],t===0?9:6),xr(r,s,c),r.build({ao:{radius:.12,strength:1}})}function $r(e,t){let r=new H,i=[4,3,3][t],a=[24,12,6][t],o=e()<.3?2:1;for(let s=0;s<o;s++){let o=e()*B,s=V(e,.3,.8),c=new n(Math.cos(o)*s,1,Math.sin(o)*s),l=V(e,1.1,1.8),u=V(e,.25,.45)*(e()<.5?1:-1),d=Cr(new n(0,-.01,0),c,l,a,(e,t)=>{let n=e/a;t.y+=.02,n>.45&&t.applyAxisAngle(sr,u*(n-.45)*2)}),f=.0045*(t===2?1.8:1),p=e();hr(r,d,d.map((e,t)=>f*(1-.5*t/a)),{sides:i,cap:!0,data:(e,t)=>[t,0,p]})}return r.build()}function ei(e,t){let r=new H,i=[4,3,3][t],a=.8,o=new n(0,1,0);return Sr([{p:new n(0,-.02,0),dir:new n(V(e,-.1,.1),1,V(e,-.1,.1)),r:.014,len:V(e,.12,.18),depth:0}],[80,34,12][t],s=>{let c=Cr(s.p,s.dir,s.len,2,(t,n)=>{n.y+=.05,n.x+=(e()-.5)*.25,n.z+=(e()-.5)*.25}),l=s.depth>=6||c[2].y>a,u=s.r*.78,d=e(),f=c.map((e,n)=>Math.max(.0025,s.r+(u-s.r)*n/2)*(t===2?1.6:1));if(hr(r,c,f,{sides:i,cap:l,data:e=>[lr(c[e].y/a,0,1),0,d]}),l)return null;let p=c[2],m=p.clone().sub(c[1]).normalize(),h=[],g=s.depth<2?2:2+ +(e()<.4);for(let t=0;t<g;t++){let t=m.clone().add(fr(e,new n).multiplyScalar(.75)).addScaledVector(o,.35).normalize();h.push({p:p.clone(),dir:t,r:u,len:s.len*V(e,.7,.95),depth:s.depth+1})}return h}),r.build({ao:{radius:.08,strength:.8}})}function ti(e,t){let r=new H,i=[12,7,4][t],a=[7,4,2][t],o=V(e,.65,.9),s=V(e,.55,.75),c=V(e,.025,.04),l=pr(e,4,3,8),u=pr(e,4,4,9),d=V(e,.3,.8),f=e(),p=(e,t,n,r)=>{let i=(e-.5)*2,a=i*(o*.5*(.18+.82*Math.sin(Math.min(1,t*1.4)*Math.PI*.5))),p=Math.abs(i),m=t*(s*(.8+.2*l(a,0,0))*(.55+.45*Math.sqrt(Math.max(0,1-p*p)))),h=d*a*a+.05*u(a*2,m*2,0)*t+n*c*.5*(1-.4*t);return r.set(a,m-.02,h),[t,0,f]},m=r.count,h=r.index.length;br(r,i,a,(e,t,n)=>p(e,t,1,n),!1),br(r,i,a,(e,t,n)=>p(1-e,t,-1,n),!1);let g=[];for(let e=0;e<=i;e++){let t=new n,a=new n;p(e/i,1,1,t),p(e/i,1,-1,a),g.push(r.vertex(t,sr,1,1,0,f),r.vertex(a,sr,1,1,0,f))}for(let e=0;e<i;e++)r.quad(g[e*2],g[e*2+2],g[e*2+3],g[e*2+1]);for(let e of[0,1]){let t=[];for(let i=0;i<=a;i++){let o=new n,s=new n;p(e,i/a,1,o),p(e,i/a,-1,s),t.push(r.vertex(o,sr,i/a,1,0,f),r.vertex(s,sr,i/a,1,0,f))}for(let n=0;n<a;n++)e===0?r.quad(t[n*2],t[n*2+1],t[n*2+3],t[n*2+2]):r.quad(t[n*2],t[n*2+2],t[n*2+3],t[n*2+1])}return xr(r,m,h),r.build({ao:{radius:.15,strength:1}})}function ni(e,t){let r=new H,i=[],a=new n(0,.03,0),o=new n(0,.002,0),s=e(),c=r.vertex(a,sr,0,1,0,s);for(let t=0;t<10;t++){let a=t/10*B+e()*.08,o=t%2?.045:.12*V(e,.9,1.05),c=t%2?.022:.008;i.push(r.vertex(new n(Math.cos(a)*o,c,Math.sin(a)*o),sr,1,1,0,s))}let l=r.vertex(o,new n(0,-1,0),0,1,0,s);for(let e=0;e<10;e++)r.tri(c,i[(e+1)%10],i[e]),r.tri(l,i[e],i[(e+1)%10]);return xr(r),r.build()}function ri(e,t){let n=new H,r=pr(e,3,3,6),i=V(e,-.3,.3);return yr(n,t===0?2:1,(t,n)=>{let a=1+.12*r(t.x,t.y,t.z);return n.set(t.x*.13,.028+t.y*.026*a,t.z*.034*a+i*t.x*t.x*.1),[0,0,e()*.2]}),xr(n),n.build()}function ii(e,t){let n=new H;return yr(n,t===0?2:1,(e,t)=>{let n=e.x,r=Math.max(0,-n),i=.05*(1-.75*r*r)*(1+.12*Math.sin(Math.atan2(e.z,e.y)*7)*r),a=Math.max(0,e.z)*Math.max(0,1-Math.abs(n+.1))*.035;return t.set(n*.1,.04+e.y*i*.9,e.z*(i+a)),[0,1,0]}),xr(n),n.build()}var ai=2.55;function oi(e=64,t=8,n=90210){let r=yn(n),i=t,a=i*i*i,o=new Uint8Array(e*e*e*4),s=e=>e*e*e*(e*(e*6-15)+10),c=new Int32Array(e),l=new Int32Array(e),u=new Float32Array(e),d=new Float32Array(e);for(let t=0;t<e;t++){let n=(t+.5)*i/e,r=Math.floor(n);c[t]=r%i,l[t]=(r+1)%i,u[t]=n-r,d[t]=s(n-r)}let f=new Float32Array(a),p=new Float32Array(a),m=new Float32Array(a);for(let t=0;t<4;t++){for(let e=0;e<a;e++){let t=r()*2-1,n=r()*Math.PI*2,i=Math.sqrt(1-t*t);f[e]=i*Math.cos(n),p[e]=i*Math.sin(n),m[e]=t}let n=(e,t,n,r,a,o)=>{let s=(n*i+t)*i+e;return f[s]*r+p[s]*a+m[s]*o};for(let r=0;r<e;r++){let i=c[r],a=l[r],s=u[r],f=d[r];for(let p=0;p<e;p++){let m=c[p],h=l[p],g=u[p],_=d[p];for(let v=0;v<e;v++){let y=c[v],b=l[v],x=u[v],S=d[v],C=n(y,m,i,x,g,s),w=n(b,m,i,x-1,g,s),T=n(y,h,i,x,g-1,s),E=n(b,h,i,x-1,g-1,s),D=n(y,m,a,x,g,s-1),O=n(b,m,a,x-1,g,s-1),k=n(y,h,a,x,g-1,s-1),A=n(b,h,a,x-1,g-1,s-1),ee=C+(w-C)*S,j=T+(E-T)*S,te=D+(O-D)*S,ne=k+(A-k)*S,re=ee+(j-ee)*_,M=re+(te+(ne-te)*_-re)*f;o[((r*e+p)*e+v)*4+t]=Math.max(0,Math.min(255,Math.round((M*.55+.5)*255)))}}}}return new N({label:`reefNoise`,width:e,height:e,depth:e,dimension:`3d`,format:`rgba8unorm`,data:o,sampler:`linearRepeat`})}var U={rock:0,star:1,brain:2,brainWide:3,porites:4,acropora:5,finger:6,fire:7,plate:8,pillar:9,gorgonian:10,sponge:11,urchin:12,anemone:13,rubble:14,grass:15,fan:16,plume:17,lettuce:18,algae:19,sargassum:20},si=new p(z.swellDir.x,z.swellDir.y).normalize(),ci=Math.PI*2,W=e=>{let t=String(e);return/[.e]/.test(t)?t:t+`.0`},li=e=>{let t=new c(e);return`vec3f( ${W(t.r)}, ${W(t.g)}, ${W(t.b)} )`},ui=e=>e.getHex(),di=new g({name:`reefCommon`,deps:[Re],code:`
fn reefUnpackColor( f: f32 ) -> vec3f {
	let u = u32( f + 0.5 ); // the value is exact, but interpolation may leave it a hair below
	let c = vec3f( f32( ( u >> 16u ) & 255u ), f32( ( u >> 8u ) & 255u ), f32( u & 255u ) ) / 255.0;
	return pow( c, vec3f( 2.2 ) );
}

fn rotateQ( q: vec4f, v: vec3f ) -> vec3f { return v + cross( q.xyz, cross( q.xyz, v ) + v * q.w ) * 2.0; }

// bump mapping from a scalar height field (Mikkelsen's surface gradient; the TSL version worked in
// view space, this one in world space: the construction is invariant under the view rotation)
fn bumpNormal( P: vec3f, N: vec3f, height: f32 ) -> vec3f {
	let dpx = dpdx( P ); let dpy = dpdy( P );
	let dhdx = dpdx( height ); let dhdy = dpdy( height );
	let r1 = cross( dpy, N ); let r2 = cross( N, dpx );
	let det = dot( dpx, r1 );
	let grad = sign( det ) * ( dhdx * r1 + dhdy * r2 );
	return normalize( abs( det ) * N - grad );
}
`});function fi(e){let t=e?e():null,n=``,r=[Re];if(t&&t.module){r.push(t.module);for(let e=0;e<Math.min(2,t.cascades);e++){let r=W(t.sizes[e]);n+=`\t{ let smp = textureSampleLevel( oceanDisplacement, smpLinearRepeat, xz / ${r}, ${e}, 3.0 ); d += vec2f( smp.x, smp.z ) * exp( depth * ( - ${W(ci)} / ${r} ) ); }\n`}}return{module:new g({name:`reefSurge`+(n?`-fft`:``),deps:r,code:`
const REEF_SWELL_DIR = vec2f( ${W(si.x)}, ${W(si.y)} );
const REEF_SWELL_SIDE = vec2f( ${W(-si.y)}, ${W(si.x)} );
fn reefSwell( xz: vec2f, t: f32 ) -> vec2f {
	let along = dot( xz, REEF_SWELL_DIR ); let across = dot( xz, REEF_SWELL_SIDE );
	let a = sin( t * ${W(ci/8.2)} - along * ${W(ci/70)} + sin( across * 0.021 ) * 1.5 ) * 0.3;
	let b = sin( t * ${W(ci/5.3)} - along * ${W(ci/34)} + across * 0.09 ) * 0.1;
	let c = sin( t * ${W(ci/11.7)} + across * ${W(ci/45)} ) * 0.07;
	return REEF_SWELL_DIR * ( a + b ) + REEF_SWELL_SIDE * c;
}
fn reefSurge( xz: vec2f, depth: f32, t: f32 ) -> vec2f {
	if ( frame.waterEnabled < 0.5 ) { return vec2f( 0.0 ); }
	var d = vec2f( 0.0 );
${n}	return reefSwell( xz, t ) + d;
}
`}),call:(e,t,n)=>`reefSurge( ${e}, ${t}, ${n} )`}}var pi={vReefColors:`vec2f`,vReefLocal:`vec3f`,vReefData:`vec4f`,vReefInfo:`vec3f`};function mi(){return new l(`ReefView`,{position:[`vec3f`],range:[`f32`,45]})}function hi(e,t,n,r=!1){let i=e.prefix,a=e.record(`index`);return`
	let kind = u32( v.aKind );
${r?`	let e = ${i}FadeEntry( kind, v.instance );
	o.vReefFade = vec2f( e.fade, e.outgoing );
	let index = e.index;`:`	let index = ${i}RecordIndex( kind, v.instance );`}
	let r0 = ${a[0]}; let q = ${a[1]}; let r2 = ${a[2]}; let r3 = ${a[3]};
	let seed = fract( r2.z ); // integer part: the instance's draw distance (m)
	let fadeEnd = min( floor( r2.z ), reefView.range );
	let grow = 1.0 - smoothstep( fadeEnd * 0.75, fadeEnd * 0.95, length( r0.xyz - reefView.position ) );
	let scale = r3.xyz * r0.w;
	var p = v.position * scale;
	o.vReefLocal = p;
	o.vReefData = v.aData;
	o.vReefColors = r2.xy;
	o.vReefInfo = vec3f( seed, r2.w, r0.w );
	let nrm = normalize( rotateQ( q, v.normal / scale ) );
	let flex = r3.w;
	if ( flex < 0.0 ) {
		// massive forms: a smooth per-colony warp so no two look cloned (the base stays put)
		let w = v.position * 3.1 + seed * 17.0;
		let off = vec3f( sin( w.y * 1.7 + w.z ), sin( w.z * 1.3 + w.x * 1.1 ) * 0.6, sin( w.x * 1.9 + w.y * 0.7 ) );
		p += off * ( - flex * r0.w * ( v.aData.x * 0.8 + 0.2 ) );
	}
	var world = rotateQ( q, p * grow ) + r0.xyz;
	var prev = world;
	if ( flex > 0.0 ) {
		// bend grows with the square of the position along the organism; tips lag behind
		let t = v.aData.x;
		let h = max( world.y - r0.y, 0.0 );
		let depth = max( frame.seaLevel - world.y, 0.0 );
		let sxz = r0.xz - REEF_SWELL_DIR * ( h * 4.0 );
		let sNow = ${t.call(`sxz`,`depth`,`frame.time`)};
		let sPrev = ${t.call(`sxz`,`depth`,`frame.time - frame.dt`)};
		let ph = frame.time * 1.7 + seed * 40.0 + v.aData.w * 12.0;
		let phPrev = ph - frame.dt * 1.7;
		let bend = flex * t * t * grow;
		let dNow = ( sNow + vec2f( sin( ph ), cos( ph * 0.77 ) ) * 0.06 ) * bend;
		let now = vec3f( dNow.x, - dot( dNow, dNow ) / ( max( h, 0.1 ) * 2.0 ), dNow.y );
		let dPrev = ( sPrev + vec2f( sin( phPrev ), cos( phPrev * 0.77 ) ) * 0.06 ) * bend;
		let before = vec3f( dPrev.x, - dot( dPrev, dPrev ) / ( max( h, 0.1 ) * 2.0 ), dPrev.y );
		world += now;
		prev = world - now + before;
	}
	v.useWorld = true;
	v.worldPos = world;
	v.worldNormal = nrm;
	v.prevWorldPos = prev;
`}var gi=new g({name:`reefFrag`,deps:[Re,di],code:`
// pixel footprint in meters (computed once per pixel as reefPixel( in.P ) at the top), and a
// 1 -> 0 fade for patterns of the given spacing
fn reefPixel( P: vec3f ) -> f32 { return length( fwidth( ( frame.view * vec4f( P, 1.0 ) ).xyz ) ) * 0.7; }
fn reefFade( spacing: f32, px: f32 ) -> f32 { return 1.0 - smoothstep( 0.25, 0.6, px / spacing ); }

fn reefHue( c: vec3f, n: f32, amount: f32 ) -> vec3f { return c * ( vec3f( 1.0 ) + vec3f( n, n * 0.5, n * -0.5 ) * amount ); }

// cheap packed polyp / corallite bumps (0..1) with about \`spacing\` meters between them
fn reefPolyps( p: vec3f, spacing: f32 ) -> f32 {
	let q = p * ( PI / spacing );
	let w = q + sin( q.yzx * 0.47 ) * 1.4 + sin( q.zxy * 0.29 + 1.7 ) * 1.1;
	return abs( sin( w.x ) * sin( w.y ) * sin( w.z ) );
}

// Round features on a jittered 3D grid of \`size\` meters (one hash per pixel): distance from
// the cell's feature point (0 .. ~0.9) and a random value per cell. The surface slices the
// cells at random heights, so the cups / pits / pores vary in size. Returns ( d, h ).
fn reefCells( p: vec3f, size: f32 ) -> vec2f {
	let q = p / size;
	let h = mx_cell_noise_float3( floor( q ) );
	let c = vec3f( h, fract( h * 7.13 ), fract( h * 3.71 ) ) * 0.3 + 0.35;
	return vec2f( length( fract( q ) - c ), h );
}

// four noise values per fetch; the tile holds 8 noise cells, so sampling at p * k gives
// features of 1 / ( 8 k ) m
fn reefVol( p: vec3f ) -> vec4f { return ( textureSample( reefNoise, smpLinearRepeat, p ) - 0.5 ) * ${W(ai)}; }
`}),_i=U,vi=`
	// everything shared by the branches is computed up front
	let c1 = reefUnpackColor( in.vs.vReefColors.x );
	let c2 = reefUnpackColor( in.vs.vReefColors.y );
	let L = in.vs.vReefLocal; let D = in.vs.vReefData;
	let seed = in.vs.vReefInfo.x; let stype = floor( in.vs.vReefInfo.y + 0.5 );
	let t = D.x; let ao = D.y; let part = D.z; let rnd = D.w;
	let px = reefPixel( in.P );
	let P = L + seed * 17.0;
	let A = reefVol( P * 0.4 ); // ~30 cm features
	let B = reefVol( P * 1.25 + 0.37 ); // ~10 cm features
	let n1 = A.x; let n2 = B.x; // colony-scale mottling, blotches
	let base = reefHue( c1, n1, 0.18 ) * ( 1.0 + n2 * 0.12 );
	var albedo = base;
	var occl = ao;
	var height = 0.0;
	var rough = 0.8;
	var spec = 0.3;
	// light passing through thin tissue (blades, fronds, rods)
	var thin = select( select( 0.0, 0.3, stype == ${W(_i.gorgonian)} || stype == ${W(_i.lettuce)} || stype == ${W(_i.algae)} ), 0.55, stype == ${W(_i.grass)} || stype == ${W(_i.sargassum)} );

	// turf-covered dead base where a colony meets the seabed
	let turf = mix( ${li(6181428)}, ${li(7494726)}, smoothstep( -0.3, 0.4, n2 ) );
	let up = sat( in.N.y );

	if ( stype == ${W(_i.rock)} ) {

		// dead coral framework: algal turf with a sediment veneer on the tops, crustose coralline
		// algae (pink / lavender) spreading over sides and edges, small encrusting colonies and
		// sponges, bio-eroded pits and cracks
		let n3 = A.y; let n4 = B.y;
		// fine speckle and grain (turf filaments, coralline bumps, pores), fetched only where
		// they are resolved (most reef pixels are distant)
		var speck = 0.0; var grainF = 0.0;
		let fs = reefFade( 0.04, px );
		if ( fs > 0.001 ) {
			speck = reefVol( P * 3.2 + 0.71 ).x * fs;
			let fg = reefFade( 0.012, px );
			if ( fg > 0.001 ) {
				let gv = reefVol( P * 12.0 + 1.7 );
				grainF = ( gv.x + gv.y * 0.5 ) * fg;
			}
		}
		let turfC = mix( ${li(6970436)}, ${li(8811598)}, smoothstep( -0.4, 0.4, n2 + speck * 0.6 ) );
		var c = mix( base, turfC, smoothstep( -0.3, 0.3, n1 + up * 0.3 ) * 0.7 );
		// sediment veneer on flat tops
		c = mix( c, ${li(11050632)}, smoothstep( 0.82, 0.97, up ) * smoothstep( -0.1, 0.3, A.z ) * 0.55 );
		// coralline crusts
		let cca = smoothstep( 0.05, 0.3, n3 * 0.7 + n4 * 0.5 ) * ( 1.0 - up * 0.5 );
		c = mix( c, c2 * ( 0.88 + speck * 0.2 + grainF * 0.25 ), cca * 0.8 );
		// small encrusting colonies (mustard / brown / olive) with corallites
		let col = smoothstep( 0.18, 0.26, B.z + A.w * 0.25 );
		let colC = mix( mix( ${li(11046984)}, ${li(9071176)}, smoothstep( -0.3, 0.3, A.w ) ), ${li(8027210)}, smoothstep( 0.2, 0.5, A.x ) );
		let colPol = reefPolyps( P, 0.006 ) * reefFade( 0.006, px ) * col;
		c = mix( c, colC * ( 0.8 + colPol * 0.35 + grainF * 0.2 ), col * 0.75 );
		// encrusting sponges on the sides
		let sp = smoothstep( 0.3, 0.38, B.w + A.z * 0.3 ) * ( 1.0 - up * 0.7 );
		let spC = mix( mix( ${li(12609068)}, ${li(11024944)}, smoothstep( -0.2, 0.2, A.y ) ), mix( ${li(8010370)}, ${li(13148204)}, smoothstep( 0.1, 0.3, B.y ) ), smoothstep( 0.2, 0.4, A.w ) );
		c = mix( c, spC, sp * 0.9 );
		// bio-eroded pits of varied size, coral recruits here and there
		let pc = reefCells( P, 0.03 );
		let pitR = pc.y * 0.16 + 0.06;
		let pit = ( 1.0 - smoothstep( pitR, pitR + 0.08, pc.x ) ) * step( 0.55, fract( pc.y * 5.3 ) ) * smoothstep( 0.0, 0.3, - A.w ) * reefFade( 0.045, px );
		let rc = reefCells( P, 0.08 );
		let recruit = ( 1.0 - smoothstep( 0.2, 0.3, rc.x ) ) * step( 0.93, rc.y );
		c = mix( c, mix( ${li(11048520)}, ${li(11565648)}, fract( rc.y * 11.3 ) ), recruit * 0.9 );
		// rugged relief: ridged creases at two scales, rough grain; crevices stay dark
		let r3 = ( 1.0 - abs( n3 ) ) * 2.0 - 1.0;
		let r4 = ( 1.0 - abs( n4 ) ) * 2.0 - 1.0;
		let grain = speck * 1.4;
		let cav = smoothstep( -0.9, 0.2, r4 + grain * 0.4 + grainF * 0.3 );
		c = c * ( 0.88 + speck * 0.25 + grainF * 0.3 ) * ( 1.0 - pit * mix( 0.35, 0.7, pc.y ) ) * mix( 0.72, 1.0, cav );
		albedo = c;
		height = n1 * 0.04 + r3 * 0.016 + r4 * 0.008 + grain * 0.003 + grainF * 0.0018 + col * 0.003
			+ colPol * 0.0008 + sp * 0.002 + recruit * 0.004 - pit * 0.008;
		occl = occl * ( 1.0 - pit * 0.5 ) * mix( 0.65, 1.0, cav );
		rough = 0.95;

	} else if ( stype == ${W(_i.star)} ) {

		// star coral: packed corallite cups with raised walls, mottled colony tissue
		let fz = reefFade( 0.006, px );
		let cup = reefCells( P, 0.0055 );
		let rim = smoothstep( 0.3, 0.55, cup.x ) * fz;
		let lump = B.z * reefFade( 0.05, px );
		let tone = mix( base, c2, smoothstep( 0.0, 0.3, n1 + n2 * 0.4 ) * 0.7 ) * ( 0.9 + lump * 0.15 );
		albedo = mix( tone * 0.7, tone * 1.12, rim + ( 1.0 - fz ) * 0.5 );
		height = rim * 0.0018 + n2 * 0.004 + lump * 0.004 + n1 * 0.01;
		rough = 0.78;

	} else if ( stype == ${W(_i.brain)} || stype == ${W(_i.brainWide)} ) {

		// brain corals: meandering valleys (the zero set of warped noise); wide-valley species
		// have a pale groove along the ridge
		let wide = stype == ${W(_i.brainWide)};
		let freq = select( 52.0, 28.0, wide ) * mix( 0.85, 1.15, fract( seed * 7.3 ) );
		let q = P * freq;
		let wq = q + reefVol( q * ${W(.31/8)} + seed ).xyz * 0.9;
		let mn = mx_noise_float3( wq );
		let aa = max( px * freq * 2.2, 1e-4 ); // ~ fwidth( mn ): no derivatives in divergent branches
		let width = select( 0.075, 0.12, wide );
		let ridge = mix( 0.55, smoothstep( width - aa, width + aa, abs( mn ) ), reefFade( 1.0 / freq, px ) );
		let valley = mix( c2, base * 0.55, 0.35 );
		let top = base * 1.15;
		let groove = smoothstep( 0.3, 0.34, abs( mn ) ) * ( 1.0 - smoothstep( 0.36, 0.4, abs( mn ) ) ) * reefFade( 0.5 / freq, px ) * select( 0.7, 1.0, wide );
		albedo = mix( valley, top, ridge ) * ( 1.0 - groove * 0.25 );
		height = ridge * select( 0.0035, 0.006, wide ) - groove * 0.001 + n1 * 0.006;
		rough = 0.7;

	} else if ( stype == ${W(_i.porites)} ) {

		// mustard hill / starlet corals: fine pitted surface, knobby, mottled
		let pit = reefPolyps( P, 0.004 ) * reefFade( 0.004, px );
		let knob = reefPolyps( P + 3.3, 0.025 ) * reefFade( 0.025, px );
		let tone = mix( base, c2, smoothstep( 0.1, 0.4, n1 ) * 0.5 );
		albedo = tone * ( 0.74 + pit * 0.22 + knob * 0.28 );
		height = pit * 0.0008 + knob * 0.006 + n2 * 0.008 + B.z * 0.004;
		rough = 0.75;

	} else if ( stype == ${W(_i.acropora)} ) {

		// elkhorn / staghorn: protruding corallites (a rough, bumpy surface), mottled
		// golden-brown tissue, a thin pale growing margin at the very tips
		let fz = reefFade( 0.005, px );
		let bump = reefPolyps( P, 0.005 ) * fz;
		let rough2 = reefVol( P * 4.75 ).x * reefFade( 0.04, px );
		let tip = smoothstep( 0.6, 1.0, part ) * smoothstep( 0.9, 1.0, t );
		let mott = mix( base, base * vec3f( 1.1, 0.95, 0.8 ), smoothstep( -0.3, 0.4, n2 ) );
		albedo = mix( mott, c2, tip * 0.8 ) * ( 0.84 + bump * 0.2 + rough2 * 0.14 );
		height = bump * 0.0016 + rough2 * 0.0025 + n2 * 0.002;
		rough = 0.8;

	} else if ( stype == ${W(_i.finger)} || stype == ${W(_i.pillar)} ) {

		// finger / pillar corals: fuzzy with extended polyps, blunt pale tips
		let fzv = reefVol( P * 18.0 );
		let fz = fzv.x * reefFade( 0.008, px ) + fzv.y * reefFade( 0.03, px ) * 0.6;
		let tip = smoothstep( 0.5, 1.0, part );
		albedo = mix( base, c2, tip * 0.6 ) * ( 0.88 + fz * 0.25 );
		height = fz * 0.002;
		rough = 0.95;

	} else if ( stype == ${W(_i.fire)} ) {

		// fire coral: smooth, finely porous, mottled mustard with white growing edges
		let edge = smoothstep( 0.86, 1.0, t ) * ( part * 0.5 + 0.5 );
		let mott = mix( base, base * vec3f( 1.1, 1.0, 0.75 ), smoothstep( -0.3, 0.3, n2 ) );
		let pore = reefPolyps( P, 0.003 ) * reefFade( 0.003, px );
		albedo = mix( mott, c2, edge * 0.85 ) * ( 0.92 + pore * 0.12 );
		height = n2 * 0.004 + B.z * 0.002 + pore * 0.0004;
		rough = 0.6;

	} else if ( stype == ${W(_i.plate)} ) {

		// plate corals: concentric ridges on top, pale growing margin, darker underside
		let r = length( L.xz );
		let ridges = sin( r * 260.0 + n1 * 3.0 ) * reefFade( 0.025, px ) * part;
		let margin = smoothstep( 0.85, 1.0, t );
		albedo = mix( base * mix( 0.55, 1.0, part ), c2, margin * 0.7 ) * ( 1.0 + ridges * 0.08 );
		height = ridges * 0.0012;
		rough = 0.7;

	} else if ( stype == ${W(_i.gorgonian)} ) {

		// sea rods / whips: fuzzy with polyps; tips a little paler
		let fz = reefVol( P * 27.0 ).x * reefFade( 0.006, px );
		albedo = mix( base, c2, smoothstep( 0.6, 1.0, t ) * 0.5 ) * ( 0.85 + fz * 0.25 );
		height = fz * 0.001;
		rough = 0.95;

	} else if ( stype == ${W(_i.sponge)} ) {

		// sponges: pores and oscula, a dark inner cavity
		let fz = reefFade( 0.008, px );
		let pc = reefCells( P, 0.009 );
		let pore = ( 1.0 - smoothstep( 0.1, 0.25, pc.x ) ) * fz;
		let inner = part;
		albedo = base * ( 1.0 - pore * 0.45 ) * mix( 1.0, 0.3, inner );
		height = pore * -0.0015 + n2 * 0.004;
		occl = ao * mix( 1.0, 0.45, inner );
		rough = 0.92;

	} else if ( stype == ${W(_i.urchin)} ) {

		// long-spined urchin: glossy black spines with faint bands, dark purple test
		let band = ( sin( t * 40.0 ) * 0.5 + 0.5 ) * part * 0.15;
		albedo = mix( c2, c1, part ) + band * 0.02;
		rough = 0.35;
		spec = 1.0;

	} else if ( stype == ${W(_i.anemone)} ) {

		// anemone: pale translucent tentacles with coloured tips
		albedo = mix( c1, c2, smoothstep( 0.6, 1.0, t ) * part );
		rough = 0.6;
		spec = 0.6;

	} else if ( stype == ${W(_i.rubble)} ) {

		// rubble: bleached fragments and turf-covered pieces
		let bleached = mix( ${li(13946044)}, ${li(12168600)}, n2 * 0.5 + 0.5 );
		let turfed = mix( turf, c2, smoothstep( 0.2, 0.6, n1 ) * 0.6 );
		albedo = mix( turfed, bleached, part );
		height = reefPolyps( P, 0.004 ) * 0.0008 * reefFade( 0.004, px );
		rough = 0.9;

	} else if ( stype == ${W(_i.lettuce)} ) {

		// lettuce coral: thin brown blades with fine ridges running up to a pale, growing edge
		let r = reefFade( 0.004, px );
		let ridges = sin( ( L.x + L.z ) * 700.0 + n1 * 4.0 ) * r;
		let edgeK = smoothstep( 0.82, 1.0, t );
		albedo = mix( base * ( 0.9 + ridges * 0.08 ), c2, edgeK * 0.75 );
		height = ridges * 0.0007 + n2 * 0.002;
		rough = 0.7;

	} else if ( stype == ${W(_i.algae)} ) {

		// calcareous green algae: segments / tufts dusted with lime, paler at the edges
		let lime = smoothstep( 0.0, 0.6, n2 + t * 0.4 ) * 0.35;
		let tuft = part;
		albedo = mix( base, c2, lime + tuft * 0.2 ) * mix( 0.85, 1.05, rnd );
		rough = 0.85;

	} else if ( stype == ${W(_i.sargassum)} ) {

		// Sargassum: olive-golden fronds, darker wiry axes, amber gas bladders
		let leaf = select( 0.0, 1.0, part > 0.5 && part < 1.5 );
		let bladder = select( 0.0, 1.0, part > 1.5 );
		let tone = base * mix( 0.8, 1.15, rnd ) * mix( 0.75, 1.05, t );
		albedo = mix( mix( tone * 0.6, tone, leaf ), ${li(11041328)}, bladder * 0.7 );
		rough = 0.55;
		spec = 0.45;

	} else {

		// seagrass: dark bases, epiphyte-covered older tips
		let aged = mix( base, ${li(9075784)}, 0.6 );
		let tip = smoothstep( 0.5, 1.0, t ) * ( fract( rnd * 13.7 ) * 0.7 + 0.3 );
		albedo = mix( base * mix( 0.55, 1.0, smoothstep( 0.0, 0.4, t ) ), aged, tip );
		rough = 0.6;

	}

	// the attached base of colonies is dead, turf-covered skeleton, with a paler growing
	// margin of living tissue just above it
	let colonyK = select( 0.0, 1.0, stype > 0.5 && stype < 9.5 );
	let edge = t + n2 * 0.03;
	let deadBase = ( 1.0 - smoothstep( 0.0, 0.06, edge ) ) * colonyK;
	let margin = smoothstep( 0.04, 0.07, edge ) * ( 1.0 - smoothstep( 0.07, 0.12, edge ) ) * colonyK;
	albedo = mix( albedo, turf, deadBase * 0.9 ) * ( 1.0 + margin * 0.25 );
	// crevices also receive less direct light
	s.albedo = albedo * mix( 0.6, 1.0, occl );
	s.normal = bumpNormal( in.P, in.N, height );
	s.roughness = rough;
	s.ao = occl;
	s.specularIntensity = spec;
	let back = sat( dot( - in.N, frame.sunDir ) ) * 0.8 + 0.2;
	s.translucency = albedo * ( thin * back );
`,yi=`
	let c1 = reefUnpackColor( in.vs.vReefColors.x );
	let c2 = reefUnpackColor( in.vs.vReefColors.y );
	let L = in.vs.vReefLocal; let D = in.vs.vReefData;
	let seed = in.vs.vReefInfo.x; let stype = floor( in.vs.vReefInfo.y + 0.5 ); let sc = in.vs.vReefInfo.z;
	let t = D.x; let part = D.z; let rnd = D.w;
	let px = reefPixel( in.P );
	let dither = interleavedGradientNoise( in.pixel + fract( frame.time * 7.3 ) * 97.0 );
	var mask = 1.0;
	var fanAlbedo = vec3f( 0.0 );
	if ( stype == ${W(_i.fan)} ) {

		// fine net of anastomosing branchlets (~7 mm mesh, cells stretched along the radial
		// veins) and main veins forking outward from the stalk. Where the mesh gets too fine
		// to resolve the holes fill in (a solid silhouette): holes cost overdraw.
		let q = L.xy + seed * 3.1;
		let cell = 0.007;
		let resolve = smoothstep( 0.3, 1.0, px / cell );
		let rel = L.xy - vec2f( 0.0, sc * 0.06 );
		let r = length( rel ) / sc;
		let th = atan2( rel.x, rel.y );
		let forks = select( select( 20.0, 10.0, r < 0.48 ), 5.0, r < 0.22 );
		let wv = reefVol( vec3f( r * 0.75, seed * 1.1, q.x * 0.5 ) );
		let vv = abs( fract( th * forks / PI + wv.x * 0.35 ) - 0.5 ) * 2.0;
		let veinW = mix( 0.12, 0.035, r );
		let vein = 1.0 - smoothstep( veinW, veinW + 0.03, vv );
		var strand = select( 0.0, 1.0, dither < 0.72 );
		if ( resolve < 0.98 ) {
			let net = mx_worley_noise_vec2_2( vec2f( q.x, q.y * 0.55 ) / cell, 0.9 );
			let edge = sqrt( net.y ) - sqrt( net.x );
			strand = select( 0.0, 1.0, edge < 0.16 || dither < resolve * 0.72 );
		}
		mask = select( 0.0, 1.0, strand > 0.5 || vein > 0.5 || part > 0.5 || t < 0.05 );
		let tone = wv.y * 0.5 + 0.5;
		// a filled-in (distant) fan is darker: holes let the background through
		let col = mix( c1 * mix( 0.8, 1.1, tone ), c2, vein * 0.35 );
		fanAlbedo = mix( col, vec3f( dot( col, vec3f( 0.3, 0.5, 0.2 ) ) ), resolve * 0.45 ) * mix( 1.0, 0.7, resolve );

	} else {

		// plume: pinnules angled toward the branch tip on both sides of the rachis, of
		// uneven length; filled in where they can't be resolved
		let a = abs( part );
		let stem = part > 3.0;
		let k = t * 150.0 - a * 2.4 + rnd * 5.0;
		let lines = fract( k );
		let reach = 0.55 + fract( floor( k ) * 0.618 + rnd ) * 0.45;
		let pin = lines < 0.32 && a < reach;
		let resolve = smoothstep( 0.3, 1.0, px / ( sc * 0.0045 ) );
		let edge = a < mix( 1.0, 0.75, resolve );
		let solid = stem || a < 0.07 || pin || ( dither < resolve && edge );
		mask = select( 0.0, 1.0, solid );
		fanAlbedo = mix( c1, c2, a * 0.5 ) * mix( 0.8, 1.1, rnd ) * mix( 1.0, 0.8, resolve );

	}
	s.alpha = mask;
	s.albedo = fanAlbedo;
	s.specularIntensity = 0.2;
	// light shining through the thin tissue
	let back = sat( dot( - in.N, frame.sunDir ) );
	s.translucency = fanAlbedo * ( back * 0.4 + 0.05 );
`;function bi({hard:e,soft:t,getOcean:n,noise:r,view:i,fade:a=!1}){let o=fi(n),s=i&&i.structName?i:i.block,c={modules:[Re,di,gi,o.module,Ln],textures:{reefNoise:r},bindings:{reefView:{uniform:s}},attributes:{aKind:`f32`,aData:`vec4f`},varyings:a?{...pi,vReefFade:`vec2f`}:{...pi},roughness:.8,metalness:0},l=a?`
	if ( ! lodFadeVisible( in.pixel, in.vs.vReefFade.x, in.vs.vReefFade.y > 0.5 ) ) { discard; }
`:``;return{hard:new $e({...c,modules:[...c.modules,e.module],name:a?`ReefFade`:`Reef`,vertex:hi(e,o,s,a),surface:l+vi}),soft:new $e({...c,modules:[...c.modules,t.module],name:a?`ReefSoftFade`:`ReefSoft`,roughness:.85,side:`double`,alphaTest:.5,vertex:hi(t,o,s,a),surface:l+yi})}}var xi=Math.PI*2,Si=class{constructor(){this.pos=[],this.dat=[],this.idx=[]}v(e,t,n,r,i,a,o){return this.pos.push(e,t,n),this.dat.push(r,i,a,o),this.pos.length/3-1}build(){let e=new Be;return e.setAttribute(`position`,new Ve(this.pos,3)),e.setAttribute(`aData`,new Ve(this.dat,4)),e.setIndex(this.idx),e.computeVertexNormals(),e.computeBoundingSphere(),e}};function Ci(e,t,r,i,a,o=!0){let s=[];for(let o=0;o<t.length;o++){let c=t[o],l=t[Math.min(o+1,t.length-1)],u=t[Math.max(o-1,0)],d=new n(l[0]-u[0],l[1]-u[1],l[2]-u[2]).normalize(),f=new n(0,1,0).cross(d);f.lengthSq()<1e-6&&f.set(1,0,0),f.normalize();let p=new n().crossVectors(d,f),m=[],h=o/(t.length-1),[g,_]=a(o,h);for(let t=0;t<r;t++){let n=t/r*xi,a=c[3];m.push(e.v(c[0]+(f.x*Math.cos(n)+p.x*Math.sin(n))*a,c[1]+(f.y*Math.cos(n)+p.y*Math.sin(n))*a*(c[4]??1),c[2]+(f.z*Math.cos(n)+p.z*Math.sin(n))*a,.5-c[2],i,g,_))}s.push(m)}for(let t=0;t<s.length-1;t++)for(let n=0;n<r;n++){let i=s[t][n],a=s[t][(n+1)%r],o=s[t+1][(n+1)%r],c=s[t+1][n];e.idx.push(i,c,a,a,c,o)}if(o){let n=s[s.length-1],o=t[t.length-1],c=e.v(o[0],o[1],o[2],.5-o[2],i,...a(t.length-1,1));for(let t=0;t<r;t++)e.idx.push(n[t],c,n[(t+1)%r])}}function wi({lod:e=0,eagle:t=!1}={}){let n=new Si,r=e?20:44,i=e?4:9,a=t?[[0,.27],[.05,.25],[.07,.19],[.2,.12],[.36,.04],[.5,-.07],[.42,-.09],[.26,-.11],[.13,-.17],[.04,-.2],[0,-.2]]:[[0,.43],[.08,.37],[.3,.17],[.47,.02],[.5,-.03],[.44,-.12],[.26,-.3],[.12,-.4],[0,-.42]],o=[...a,...a.slice(1,-1).reverse().map(e=>[-e[0],e[1]])],s=e=>{let t=Math.sin(e),n=Math.cos(e),r=0;for(let e=0;e<o.length;e++){let i=o[e],a=o[(e+1)%o.length],s=a[0]-i[0],c=a[1]-i[1],l=t*c-n*s;if(Math.abs(l)<1e-9)continue;let u=(i[0]*c-i[1]*s)/l,d=(i[0]*n-i[1]*t)/l;u>0&&d>=0&&d<=1&&(r=Math.max(r,u))}return r},c=t?.23:.07,l=t?.07:.06;for(let e of[1,-1]){let a=[],o=n.v(0,e*l*(e>0?1:.4),c,.5-c,mn.DISC,0,e);for(let o=1;o<=i;o++){let u=o/i,d=[];for(let i=0;i<r;i++){let a=i/r*xi,o=s(a)*u,f=Math.sin(a)*o,p=c+Math.cos(a)*o*1,m=e*(l*Math.exp(-(f*f)/(t?.012:.02)-((p-c)/.28)**2)*(e>0?1:.45)+.004*(1-u));d.push(n.v(f,m,p,.5-p,mn.DISC,Math.abs(f)/.5,e))}a.push(d)}for(let t=0;t<r;t++){let s=(t+1)%r;e>0?n.idx.push(o,a[0][t],a[0][s]):n.idx.push(o,a[0][s],a[0][t]);for(let r=0;r<i-1;r++){let i=a[r][t],o=a[r][s],c=a[r+1][s],l=a[r+1][t];e>0?n.idx.push(i,l,o,o,l,c):n.idx.push(i,o,l,o,c,l)}}}if(e===0)for(let e of[1,-1]){let r=e*(t?.09:.06),i=c+(t?.13:.16);Ci(n,[[r,l*.7,i+.012,.004],[r,l*.85,i,.013],[r,l*.9,i-.012,.004]],6,mn.EYE,()=>[0,0])}let u=t?1:.62,d=c-(t?.19:.4),f=[],p=e?4:10;for(let e=0;e<=p;e++){let n=e/p;f.push([0,.01-n*.01,d-n*u,(t?.014:.026)*(1-n)+.002,.8])}return Ci(n,f,e?3:5,mn.WHIP,()=>[0,1]),n.build()}function Ti({lod:e=0}={}){let t=new Si,n=.72,r=.56,i=.2,a=-.02,o=e?14:30,s=e?3:7,c=e=>{let t=Math.sin(e),i=Math.cos(e);return 1/Math.sqrt(t*t/(r*r/4)+i*i/(n*n/4))*(1-.12*Math.max(0,-i)**3)*(1+.04*Math.max(0,i))};for(let e of[!0,!1]){let l=[],u=t.v(0,e?i:-.07,a,.52,e?mn.CARAPACE:mn.SKIN,0,e?0:2);for(let u=1;u<=s;u++){let d=u/s,f=[];for(let s=0;s<o;s++){let l=s/o*xi,u=c(l)*d,p=Math.sin(l)*u,m=a+Math.cos(l)*u,h=e?i*(1-d*d)**.6*(1-.1*Math.cos(l))-.02*d*d:-.07*(1-d*d*d)-.015;f.push(t.v(p,h,m,.5-m,e?mn.CARAPACE:mn.SKIN,p/(r/2),e?(m-a)/(n/2):2))}l.push(f)}for(let n=0;n<o;n++){let r=(n+1)%o;e?t.idx.push(u,l[0][n],l[0][r]):t.idx.push(u,l[0][r],l[0][n]);for(let i=0;i<s-1;i++){let a=l[i][n],o=l[i][r],s=l[i+1][r],c=l[i+1][n];e?t.idx.push(a,c,o,o,c,s):t.idx.push(a,o,c,o,s,c)}}}if(Ci(t,[[0,0,.25999999999999995,.075,.75],[0,.01,.36,.065,.8],[0,.02,.43999999999999995,.07,.85],[0,.02,.5,.06,.8],[0,0,.54,.03,.7]],e?5:9,mn.SKIN,()=>[0,1]),e===0)for(let e of[1,-1]){let n=e*.052;Ci(t,[[n,.035,.482,.004],[n*1.08,.037,.47,.013],[n,.035,.45799999999999996,.004]],6,mn.EYE,()=>[0,0])}let l=(n,r,i,a,o,s)=>{let c=[],l=e?4:8;for(let e=0;e<=l;e++){let t=e/l,n=s*(.55+.9*Math.sin(Math.PI*Math.min(1,.15+t*.95)))*(1-.7*t*t),u=r+a[0]*o*t,d=i+a[2]*o*t-o*.25*t*t;c.push([u,-.03-t*.02,d,n,.22])}Ci(t,c,e?4:7,mn.FLIPPER,(e,t)=>[t,n])},u=Math.SQRT1_2;return l(0,.2,.18000000000000002,[u*1.2,0,u*.2],.48,.07),l(1,-.2,.18000000000000002,[-u*1.2,0,u*.2],.48,.07),l(2,.16,-.30000000000000004,[.8,0,-.6],.2,.06),l(3,-.16,-.30000000000000004,[-.8,0,-.6],.2,.06),Ci(t,[[0,-.02,-.36,.035,.6],[0,-.03,a-n/2-.08,.004,.6]],e?3:5,mn.SKIN,()=>[0,1]),t.build()}var Ei=Math.PI*2,Di=-.7,Oi=.18,ki=45,Ai=65,ji=9.81,Mi=[320,80,22],Ni=1.15,Pi={cruise:1,max:2.5,burst:6,accel:4,sep:2,nbr:5,wSep:5,wAli:1,wCoh:.8,wGoal:1,flee:3.5,depth:[.1,.5],homeRadius:6,amp:.08,freq:[1.6,.9],ceiling:Di,minDepth:1.2,band:[1.5,20]},Fi={bait:{model:`silverside`,length:[.06,.09],mode:`bait`,cruise:1.8,max:4,burst:10,accel:7,flee:3,depth:[.35,.75],amp:.1,freq:[3,1.1]},silverside:{model:`silverside`,length:[.06,.09],mode:`school`,cruise:1.6,max:3.5,burst:9,accel:6,sep:1.8,nbr:7,wSep:7,wAli:2.6,wCoh:1.4,wGoal:.7,flee:4.5,depth:[.35,.8],homeRadius:18,amp:.1,freq:[3,1.1],band:[4,20]},chromis:{model:`chromis`,length:[.08,.11],mode:`hover`,cruise:.8,max:2.5,burst:7,accel:5,sep:2.2,nbr:6,wAli:.5,wCoh:.5,flee:3,depth:[.12,.45],homeRadius:3,freq:[2.5,.9],amp:.1,band:[4,16]},grunt:{model:`grunt`,length:[.16,.24],mode:`mill`,cruise:.45,max:1.8,burst:5,accel:3,sep:1.6,nbr:4,wAli:1.8,wCoh:1,wGoal:.9,depth:[.04,.2],homeRadius:1.5,band:[2.5,10]},yellowtail:{model:`yellowtail`,length:[.25,.36],mode:`school`,cruise:.8,max:2.2,burst:5,accel:3,sep:1.8,wAli:1.6,wGoal:.7,flee:5,depth:[.15,.5],homeRadius:16,freq:[1.5,.9],band:[3,14]},tang:{model:`tang`,length:[.15,.24],mode:`forage`,cruise:.7,max:2,burst:5,accel:3,sep:1.8,wAli:1,wCoh:.7,wGoal:.9,flee:4,depth:[.03,.2],homeRadius:14,amp:.07,band:[2,9]},sergeant:{model:`sergeant`,length:[.12,.17],mode:`hover`,cruise:.6,max:2,burst:6,accel:4,wAli:.6,wCoh:.6,flee:3.2,depth:[.08,.3],homeRadius:2,amp:.09,freq:[2,.9],band:[1.5,6]},wrasse:{model:`wrasse`,length:[.07,.12],mode:`forage`,cruise:1.3,max:3,burst:7,accel:6,wAli:.5,wCoh:.6,wGoal:1.2,flee:2.5,depth:[.02,.1],homeRadius:5,amp:.1,freq:[2.5,1],band:[1.5,9]},parrot:{model:`parrot`,length:[.3,.45],mode:`forage`,cruise:.55,max:1.6,burst:4,accel:2,sep:2.2,nbr:6,wSep:4,wAli:.6,wCoh:.5,flee:4.5,depth:[.02,.1],homeRadius:18,amp:.05,freq:[1,.6],band:[2,12]},angel:{model:`angel`,length:[.25,.35],mode:`pair`,cruise:.45,max:1.4,burst:3.5,accel:2,sep:1.5,nbr:4,wSep:3,wAli:.8,wCoh:1.2,depth:[.04,.15],homeRadius:3,amp:.05,freq:[1,.6],band:[5,16]},grouper:{model:`grouper`,length:[.6,.85],mode:`lurk`,cruise:.15,max:1.2,burst:3,accel:1.5,sep:1,nbr:2,wSep:1,wAli:0,wCoh:0,wGoal:.8,flee:3,depth:[0,.05],homeRadius:2.5,amp:.04,freq:[.6,.6],band:[5,16]},barracuda:{model:`barracuda`,length:[1,1.35],mode:`solo`,cruise:.15,max:1.2,burst:3,accel:1.2,sep:1,nbr:2,wSep:1,wAli:0,wCoh:0,wGoal:.6,depth:[.3,.6],homeRadius:10,amp:.035,freq:[.5,.8],band:[4,16]},jack:{model:`jack`,length:[.4,.6],mode:`patrol`,cruise:1.1,max:2.6,burst:5,accel:3,sep:2,nbr:5,wAli:1.4,wCoh:.9,wGoal:.9,flee:4,depth:[.25,.6],homeRadius:20,amp:.07,freq:[1.6,.8],band:[6,20]},eagleRay:{model:`eagleRay`,length:[1.6,2],mode:`cruise`,cruise:.35,max:.9,burst:1.8,accel:.8,sep:1,nbr:2,wSep:1,wAli:0,wCoh:0,wGoal:.8,flee:5,depth:[.25,.55],homeRadius:30,amp:.13,freq:[.45,.2],band:[6,20]},stingray:{model:`stingray`,length:[.9,1.3],mode:`glide`,cruise:.3,max:.8,burst:1.6,accel:.8,sep:1,nbr:2,wSep:1,wAli:0,wCoh:0,wGoal:.8,flee:3.5,depth:[0,0],homeRadius:14,amp:.05,freq:[.9,.5],band:[2.5,16]},turtle:{model:`turtle`,length:[.9,1.1],mode:`turtle`,cruise:.3,max:.8,burst:1.4,accel:.6,sep:1,nbr:2,wSep:1,wAli:0,wCoh:0,wGoal:.7,flee:4,depth:[.15,.6],homeRadius:25,amp:0,freq:[.3,.25],ceiling:-.25,band:[3,12]},tarpon:{model:`tarpon`,length:[1.3,1.8],mode:`cruise`,cruise:.3,max:1.2,burst:3,accel:1,sep:1.5,nbr:3,wSep:2,wAli:.8,wCoh:.5,wGoal:.7,flee:5,depth:[.3,.7],homeRadius:25,amp:.04,freq:[.5,.7],band:[4,14]},needlefish:{model:`needlefish`,length:[.5,.8],mode:`surface`,cruise:.9,max:2.5,burst:6,accel:3,sep:3,nbr:4,wSep:3,wAli:1,wCoh:.5,wGoal:.9,flee:4,homeRadius:25,amp:.05,freq:[1.2,.7],ceiling:-.12,minDepth:1,band:[1.8,12]},mullet:{model:`mullet`,length:[.3,.4],mode:`jumper`,cruise:.8,max:2.2,burst:5,accel:3,sep:1.8,nbr:5,wAli:1.5,wCoh:1,wGoal:.8,flee:4,depth:[.3,.9],homeRadius:14,amp:.07,freq:[1.5,.9],ceiling:-.25,minDepth:1.2,band:[1.8,4.5]},fry:{model:`silverside`,length:[.045,.065],mode:`fry`,cruise:2,max:4,burst:14,accel:9,sep:1.6,nbr:8,wSep:7,wAli:2.4,wCoh:1.6,wGoal:.9,flee:3.2,depth:[.3,.8],homeRadius:6,amp:.11,freq:[3.5,1.2],ceiling:-.2,minDepth:.5,band:[.5,3.5]},pierGrunt:{model:`grunt`,length:[.16,.26],mode:`pile`,cruise:.45,max:1.8,burst:5,accel:3,sep:1.6,nbr:4,wAli:1.4,wCoh:.9,depth:[.1,.5],homeRadius:1.6,band:[2,6]},pierSnapper:{model:`yellowtail`,length:[.25,.34],mode:`pile`,cruise:.6,max:2.2,burst:5,accel:3,sep:1.8,wAli:1.4,wCoh:.8,flee:4.5,depth:[.3,.8],homeRadius:2.5,freq:[1.5,.9],band:[2,6]},pilot:{model:`jack`,length:[.25,.4],mode:`escort`,cruise:1.2,max:3.5,burst:7,accel:5,flee:2,amp:.07,freq:[1.8,.9],ceiling:-.3,minDepth:2,band:[0,1e9]},juvenile:{model:`jack`,length:[.1,.16],mode:`escort`,cruise:1.5,max:4,burst:9,accel:7,flee:1.5,amp:.1,freq:[2.5,1],ceiling:-.3,minDepth:2,band:[0,1e9]},remora:{model:`mullet`,length:[.35,.55],mode:`remora`,cruise:.5,max:3,burst:3,accel:3,flee:0,amp:.03,freq:[.8,.3],ceiling:5,minDepth:0,band:[0,1e9]},pierSergeant:{model:`sergeant`,length:[.12,.17],mode:`pile`,cruise:.6,max:2,burst:6,accel:4,wAli:.6,wCoh:.6,flee:3.2,depth:[.3,.9],homeRadius:1.2,amp:.09,freq:[2,.9],band:[2,6]}};for(let e in Fi)Fi[e]={name:e,...Pi,...Fi[e]};function Ii(e){let t=[],n={};for(let r of e){n[r]=t.length;let e;if(r===`stingray`||r===`eagleRay`){let t=r===`eagleRay`,n=wi({lod:1,eagle:t});e=[wi({lod:0,eagle:t}),n,n,n]}else if(r===`turtle`){let t=Ti({lod:1});e=[Ti({lod:0}),t,t,t]}else{let t=rn[r];e=[0,1,2,3].map(e=>an(t,{lod:e,pose:`swim`}))}for(let n=0;n<4;n++)t.push({geometry:e[n],model:r,lod:n})}return{kinds:t,first:n}}var Li=class{constructor(e,t,r,i,a){this.sp=e,this.count=t,this.offset=r,this.zone=i,this.home=new n(i.x,0,i.z),this.goal=this.home.clone(),this.center=this.home.clone(),this.heading=new n(1,0,0),this.timer=0,this.alarm=0,this.spin=a()<.5?1:-1,this.rng=a,this.active=!1,this.radius=4,this.ball=0,this.rest=0,this.breath=30+a()*40,this.jumpTimer=3+a()*6,this.pathIndex=0,this.pathDir=1}},Ri=new i,zi=new n,Bi=new n,Vi=new n,Hi=new o,Ui=new b,Wi=new x,Gi=class{constructor({parent:e,terrain:t,floorAt:n=null,center:r,radius:i,anchors:a=[],seed:o=23,bay:s=!0,shoreField:c=null}){this.terrain=t,this.floorAt=n??((e,n)=>t.heightAt(e,n)),this.center=r.clone(),this.radius=i,this.anchors=a.length?a:[[r.x,r.z]],this.shoreField=c,this.rng=yn(o),this.time=0,this.spray=null,this.group=new xe,this.group.name=`Fish`,e.add(this.group),this.groups=[],this.n=0,this.layout(s);let{kinds:l,first:u}=Ii([...new Set(this.groups.map(e=>e.sp.model))]);this.modelKind=u;let d=this.n;this.pos=new Float32Array(d*3),this.vel=new Float32Array(d*3),this.head=new Float32Array(d*3),this.roll=new Float32Array(d),this.bend=new Float32Array(d),this.phase=new Float32Array(d),this.size=new Float32Array(d),this.speedMul=new Float32Array(d),this.panic=new Float32Array(d),this.seed=new Float32Array(d),this.kind=new Uint16Array(d),this.pattern=new Uint8Array(d),this.slot=new Float32Array(d*4),this.jump=new Float32Array(d),this.floorC=new Float32Array(d).fill(-1e3),this.shallowC=new Uint8Array(d),this.prev=new Float32Array(d*3),this.tmpA=new Float32Array(d*9),this.tmpC=new Uint16Array(d);for(let e of this.groups)this.initGroup(e);this.batch=new un(`Fish`,l,{maxInstances:d,dynamic:!0,fade:!0}),this.material=pn(this.batch),this.fadeMaterial=pn(this.batch,{fade:!0}),this.mesh=this.batch.createMesh(this.material),this.group.add(this.batch.createFadeMesh(this.fadeMaterial)),this.viewHeight=1267;let f=this.mesh.onBeforeRender;this.mesh.onBeforeRender=(e,t,n,r,i,a)=>{n.isPerspectiveCamera&&(this.viewHeight=e?.domElement?.height||y.fields.resolution.value.y||this.viewHeight,this.cull(n)),f(e,t,n,r,i,a)},this.group.add(this.mesh),this._frame=0,this._cullFrame=-1,this.dt=1/60,this.warmUp()}get fishCount(){return this.n}depthAt(e,t){return-this.terrain.heightAt(e,t)}breakDepth(e,t){let n=1,r=this.shoreField;if(r){let i=Math.floor((e-r.origin)/r.cellSize),a=Math.floor((t-r.origin)/r.cellSize);if(i>=0&&a>=0&&i<r.res&&a<r.res){let e=(a*r.res+i)*4;n=Math.min(1,Math.hypot(r.data[e+1],r.data[e+2]))}}return(.546*n*3.556/.78)**.8}fits(e,t,n,r){let i=this.depthAt(n,r);return i<t.band[0]||i>t.band[1]||i<this.breakDepth(n,r)+.3?!1:-Math.max(this.terrain.heightAt(n,r),this.floorAt(n,r))>e.minDepth+.3}addGroup(e,t,n){let r=Fi[e],i=new Li(r,t,this.n,n,yn(Math.floor(this.rng()*1e9)));return this.n+=t,this.groups.push(i),i}pickSpot(e,t,n,r){let i=this.rng,a=null,o=-1/0;for(let s=0;s<160;s++){let s,c;if(r&&t.anchors&&t.anchors.length){let e=t.anchors[Math.floor(i()*t.anchors.length)],n=i()*Ei,r=i()*2;s=e[0]+Math.cos(n)*r,c=e[1]+Math.sin(n)*r}else{let e=i()*Ei,n=Math.sqrt(i())*t.r;s=t.x+Math.cos(e)*n,c=t.z+Math.sin(e)*n}if(!this.fits(e,t,s,c))continue;let l=i();for(let e of n){let t=Math.hypot(e[0]-s,e[1]-c);t<10&&(l-=(10-t)*.3)}l>o&&(o=l,a=[s,c])}return a}layout(e){let t={x:this.center.x,z:this.center.z,r:this.radius*.75,anchors:this.anchors},n=[],r=(e,t,r,i=!1)=>{let a=Fi[e],o={...r,band:r.band||a.band},s=this.pickSpot(a,o,n,i);return s?(n.push(s),this.addGroup(e,t,{...o,x:s[0],z:s[1],r:Math.min(o.r,a.homeRadius*1.5+4)})):null};for(let e of[14,12,10,12])r(`sergeant`,e,t,!0);for(let e of[26,22,20,24,18,22])r(`chromis`,e,t,!0);for(let e of[28,22,20,16,16])r(`grunt`,e,t,!0);for(let e of[16,12])r(`yellowtail`,e,t);for(let e of[18,12])r(`tang`,e,t);for(let e of[16,12,12,14])r(`wrasse`,e,t);for(let e of[4,3,3,3])r(`parrot`,e,t);for(let e=0;e<3;e++)r(`angel`,2,t,!0);for(let e=0;e<2;e++)r(`grouper`,1,t,!0);for(let e=0;e<2;e++)r(`barracuda`,1,t);for(let e of[150,120])r(`silverside`,e,t);let i=this.dropOff();this.dropPath=i;let a=i[Math.floor(i.length/2)]||[t.x,t.z+t.r],o={x:a[0],z:a[1],r:30,path:i},s=r(`bait`,900,{...o,r:14});this.baitGroups=s?[s]:[];for(let e of[9,6]){let t=r(`jack`,e,o);t&&(t.zone.path=i)}let c=r(`eagleRay`,1,o);c&&(c.zone.path=i);for(let e=0;e<2;e++)r(`stingray`,1,{...t,r:this.radius,band:[3,12],sand:!0});if(r(`turtle`,1,{...t,r:this.radius,band:[3,10]}),!e)return;let l={x:45,z:70,r:45};r(`tarpon`,3,{...l,band:[5,14]}),r(`jack`,5,{x:z.pier.x,z:z.pier.zEnd,r:20,band:[3,10]}),r(`stingray`,1,{...l,band:[3,9],sand:!0}),r(`barracuda`,1,{x:z.pier.x+6,z:z.pier.zEnd-4,r:8,band:[3,8]});for(let e of[3,2,1])r(`needlefish`,e,{x:30,z:30,r:60,band:[2,12]});for(let e of[9,7])r(`mullet`,e,{x:20,z:5,r:70});for(let[e,t]of[[90,-60],[70,-10],[80,30],[60,110],[70,150]])r(`fry`,e,{x:t,z:0,r:30});let u=[],d=z.pier,f=d.width/2+.17;for(let e=d.zStart+1.5;e<d.zEnd-d.headDepth;e+=3)for(let t of[-1,1])u.push([d.x+t*f,e]);for(let e=0;e<5;e++)for(let t of[d.zEnd-d.headDepth+.25,d.zEnd-d.headDepth/2,d.zEnd-.25])u.push([d.x-d.headWidth/2+.3+e*(d.headWidth-.6)/4,t]);this.escort=[[`pilot`,12],[`juvenile`,6],[`remora`,4]].map(([e,t])=>this.addGroup(e,t,{x:0,z:200,r:5,band:[0,1e9]}));let p=u.filter(e=>this.depthAt(e[0],e[1])>2.2),m={x:d.x,z:d.zEnd-8,r:18,anchors:p,piles:p};for(let[e,t]of[[`pierGrunt`,14],[`pierSnapper`,10],[`pierSergeant`,12]]){let n=r(e,t,m,!0);n&&(n.zone.piles=p.filter(e=>Math.hypot(e[0]-n.home.x,e[1]-n.home.z)<5)),n&&!n.zone.piles.length&&(n.zone.piles=[[n.home.x,n.home.z]])}}setWhale(e){this.whale=e}dropOff(){let e=[],t=this.center;for(let n=0;n<64;n++){let r=n/64*Ei,i=Math.cos(r),a=Math.sin(r);for(let n=10;n<this.radius*1.4;n+=2){let o=t.x+i*n,s=t.z+a*n,c=this.depthAt(o,s);if(c>=11){c<18&&e.push([o,s,r]);break}}}return e.sort((e,t)=>e[2]-t[2]),e.map(e=>[e[0],e[1]])}initGroup(e){let t=e.sp,n=e.rng,r=n()*Ei;e.heading.set(Math.cos(r),0,Math.sin(r));let i=t.mode===`school`||t.mode===`fry`||t.mode===`jumper`?1.5:t.mode===`bait`?3:[`solo`,`lurk`,`glide`,`turtle`,`cruise`].includes(t.mode)?0:1.2;e.home.y=this.depthFor(t,e.home.x,e.home.z,.5),e.goal.copy(e.home),e.center.copy(e.home);let a=this.modelKind[t.model],o=rn[t.model].pattern;for(let s=0;s<e.count;s++){let c=e.offset+s,l=e.home.x,u=e.home.z;for(let r=0;r<10;r++){let r=e.home.x+(n()-.5)*i*2,a=e.home.z+(n()-.5)*i*2;if(this.depthAt(r,a)>t.minDepth+.3){l=r,u=a;break}}let d=this.clampY(t,l,u,e.home.y+(n()-.5)*i*.5),f=t.length[0]+(t.length[1]-t.length[0])*n();this.size[c]=f,this.pos.set([l,d,u],c*3),this.prev.set([l,d,u],c*3);let p=t.cruise*f,m=r+(n()-.5)*.5;this.vel.set([Math.cos(m)*p,0,Math.sin(m)*p],c*3),this.head.set([Math.cos(m),0,Math.sin(m)],c*3),this.phase[c]=n()*Ei,this.speedMul[c]=.85+n()*.3,this.seed[c]=n(),this.kind[c]=a,this.pattern[c]=o;let h=n()*2-1,g=n()*Ei,_=Math.sqrt(1-h*h);this.slot.set([_*Math.cos(g),h,_*Math.sin(g),.45+.55*Math.cbrt(n())],c*4),t.mode===`pile`&&e.zone.piles&&(this.slot[c*4+3]=Math.floor(n()*e.zone.piles.length))}this.retarget(e,null)}depthFor(e,t,n,r){let i=Math.max(this.terrain.heightAt(t,n),this.floorAt(t,n)),a=e.ceiling;if(e.mode===`surface`)return a-.08;if(e.mode===`glide`)return i+Oi+.15;let o=e.depth[0]+(e.depth[1]-e.depth[0])*r;return Math.min(a-.2,i+Oi+.1+Math.max(0,a-i)*o)}clampY(e,t,n,r){let i=Math.max(this.terrain.heightAt(t,n),this.floorAt(t,n));return Math.min(e.ceiling-.02,Math.max(i+Oi+.02,r))}retarget(e,t){let n=e.sp,r=e.rng,i=e.zone,a=n.mode===`solo`||n.mode===`lurk`?[12,25]:n.mode===`forage`?[3,7]:n.mode===`surface`?[10,20]:[6,12];if(!t&&i.path&&i.path.length>1&&(n.mode===`patrol`||n.mode===`cruise`)){let t=e.pathIndex+e.pathDir*(2+Math.floor(r()*3));(t<0||t>=i.path.length)&&(e.pathDir=-e.pathDir,t=Math.max(0,Math.min(i.path.length-1,e.pathIndex+e.pathDir*2))),e.pathIndex=t;let o=i.path[t];e.goal.set(o[0],this.depthFor(n,o[0],o[1],r()),o[1]),e.timer=a[0]+(a[1]-a[0])*r();return}for(let o=0;o<24;o++){let s,c;if(t&&o<16){let n=Math.atan2(t.z,t.x)+(r()-.5)*(.6+o*.15),i=6+r()*6;s=e.center.x+Math.cos(n)*i,c=e.center.z+Math.sin(n)*i}else if(n.mode===`surface`){let t=Math.atan2(e.heading.z,e.heading.x)+(r()-.5)*1.6,n=15+r()*20;if(s=e.center.x+Math.cos(t)*n,c=e.center.z+Math.sin(t)*n,Math.hypot(s-i.x,c-i.z)>i.r)continue}else{let t=r()*Ei,a=Math.sqrt(r())*Math.max(n.homeRadius,i.r*.8);s=e.home.x+Math.cos(t)*a,c=e.home.z+Math.sin(t)*a}if(this.fits(n,i,s,c)&&!(i.sand&&this.floorAt(s,c)>this.terrain.heightAt(s,c)+.1)){e.goal.set(s,this.depthFor(n,s,c,r()),c),e.timer=a[0]+(a[1]-a[0])*r();return}}e.goal.copy(e.home),e.timer=4}warmUp(){let e=[this.pos.slice(),this.vel.slice(),this.head.slice(),this.panic.slice(),this.jump.slice()],t=this.groups.map(e=>[e.goal.clone(),e.timer,e.alarm,e.ball,e.rest,e.breath,e.jumpTimer]),r=new n;for(let e=0;e<40;e++)for(let t of this.groups)r.copy(t.center),r.x+=1.5,this.stepGroup(t,1/60,e%2?r:null);this.pos.set(e[0]),this.prev.set(e[0]),this.vel.set(e[1]),this.head.set(e[2]),this.panic.set(e[3]),this.jump.set(e[4]),this.groups.forEach((e,n)=>{let r=t[n];e.goal.copy(r[0]),[,e.timer,e.alarm,e.ball,e.rest,e.breath,e.jumpTimer]=r,e.center.copy(e.home)})}update(e,t){this._frame++,this.time+=e,this.dt=e||1/60,this.whale&&this.whale.ready&&(this.whaleWater||=new pt).update(this.whale,e,this.spray);let n=null;if(t){if(t.y<-.1)n=t;else{let e=this.terrain.heightAt(t.x,t.z);e<-.2&&t.y-e<2.4&&(n=Vi.set(t.x,Math.max(e+.3,Math.min(-.3,t.y-1.3)),t.z))}}let r=!1;for(let e of this.groups){let n=e.active;if(e.sp.mode===`escort`||e.sp.mode===`remora`){let r=this.whale;e.active=!!(r&&r.ready)&&(!t||r.brain.position.distanceTo(t)<85),e.active&&!n&&this.attachEscort(e)}else e.active=!t||Math.hypot(e.center.x-t.x,e.center.z-t.z)<Ai+e.radius;e.active&&!n&&this.resume(e),r||=e.active}if(this.mesh.visible=r,r||(this.batch.fadeMesh.visible=!1),!r)return;this.prev.set(this.pos);let i=e>1/30?Math.min(3,Math.ceil(e*30)):1,a=e/i;if(e>0)for(let e=0;e<i;e++)for(let e of this.groups)e.active&&this.stepGroup(e,a,n)}resume(e){for(let t=0;t<e.count;t++){let n=(e.offset+t)*3;this.prev[n]=this.pos[n],this.prev[n+1]=this.pos[n+1],this.prev[n+2]=this.pos[n+2]}}stepGroup(e,t,n){let r=e.sp,i=e.count,a=e.offset,o=this.pos,s=this.vel,c=this.tmpA,l=this.tmpC,u=0,d=0,f=0;for(let e=0;e<i;e++){let t=(a+e)*3;u+=o[t],d+=o[t+1],f+=o[t+2]}e.center.set(u/i,d/i,f/i);let p=0;for(let t=0;t<i;t+=Math.max(1,i>>4)){let n=(a+t)*3;p=Math.max(p,(o[n]-e.center.x)**2+(o[n+1]-e.center.y)**2+(o[n+2]-e.center.z)**2)}if(e.radius=Math.sqrt(p)+2,e.timer-=t,e.alarm=Math.max(0,e.alarm-t),r.mode===`bait`)return this.stepBait(e,t,n);if(r.mode===`escort`||r.mode===`remora`){this.whale&&this.whale.ready&&e.attached&&this.stepEscort(e,t);return}let m=e.goal.x-e.center.x,h=e.goal.z-e.center.z,g=r.mode!==`mill`&&r.mode!==`hover`&&r.mode!==`pile`&&r.mode!==`lurk`;(e.timer<=0||g&&m*m+h*h<1.5)&&this.retarget(e,null);let _=null;if(r.mode===`patrol`)for(let t of this.baitGroups)t.active&&Math.hypot(t.center.x-e.center.x,t.center.z-e.center.z)<30&&(_=t);r.mode===`turtle`&&(e.breath-=t,e.breath<0&&e.breath+t>=0&&(e.goal.set(e.center.x+e.heading.x*4,r.ceiling,e.center.z+e.heading.z*4),e.timer=14),e.breath<-12&&(e.breath=40+e.rng()*50,this.retarget(e,null))),r.mode===`glide`&&(e.rest>0?e.rest-=t:e.rng()<t*.02&&(e.rest=6+e.rng()*12));let v=0,y=0,b=0,x=!1;if(n){v=n.x,y=n.y,b=n.z;let t=e.center.x-v,i=e.center.y-y,a=e.center.z-b,o=t*t+i*i+a*a,s=r.flee+4;x=o<(s+20+e.radius)**2,x&&e.alarm<=0&&o<s*s&&g&&(e.alarm=4,e.rest=0,this.retarget(e,{x:t,z:a}))}let S=(r.nbr*r.length[1])**2,C=r.sep*r.length[1],w=C*C,T=a*9;if(c.fill(0,T,T+i*9),l.fill(0,a,a+i),i>1&&(r.wAli>0||r.wCoh>0||r.wSep>0)){let e=i>60?7:1;for(let t=0;t<i;t++){let n=a+t,r=o[n*3],u=o[n*3+1],d=o[n*3+2];for(let f=t+1;f<i;f+=e){let e=a+f,t=o[e*3]-r,i=o[e*3+1]-u,p=o[e*3+2]-d,m=t*t+i*i+p*p;if(m>S)continue;l[n]++,l[e]++;let h=n*9,g=e*9;if(c[h+3]+=s[e*3],c[h+4]+=s[e*3+1],c[h+5]+=s[e*3+2],c[g+3]+=s[n*3],c[g+4]+=s[n*3+1],c[g+5]+=s[n*3+2],c[h+6]+=t,c[h+7]+=i,c[h+8]+=p,c[g+6]-=t,c[g+7]-=i,c[g+8]-=p,m<w){let e=Math.sqrt(m)+1e-4,n=(C-e)/(C*e);c[h]-=t*n,c[h+1]-=i*n,c[h+2]-=p*n,c[g]+=t*n,c[g+1]+=i*n,c[g+2]+=p*n}}}}let E=this.time,D=r.flee*r.flee,O=e.zone.piles;for(let n=0;n<i;n++){let i=a+n,u=i*3,d=i*9,f=this.size[i],p=o[u],m=o[u+1],h=o[u+2],g=s[u],S=s[u+1],C=s[u+2];if(this.jump[i]>1.5){S-=ji*t,p+=g*t,m+=S*t,h+=C*t,m<-.05&&S<0&&(this.jump[i]=0,this.splash(p,h,g,C,f,1.4),g*=.5,C*=.5,S*=.3),o[u]=p,o[u+1]=m,o[u+2]=h,s[u]=g,s[u+1]=S,s[u+2]=C;continue}let w=r.cruise*f*this.speedMul[i],T=c[d]*r.wSep,k=c[d+1]*r.wSep,A=c[d+2]*r.wSep,ee=l[i];if(ee>0){let e=1/ee;T+=(c[d+3]*e-g)*r.wAli+c[d+6]*e*r.wCoh,k+=(c[d+4]*e-S)*r.wAli+c[d+7]*e*r.wCoh,A+=(c[d+5]*e-C)*r.wAli+c[d+8]*e*r.wCoh}let j=e.goal.x,te=e.goal.y,ne=e.goal.z,re=w,M=this.seed[i];if(r.mode===`mill`||r.mode===`pair`){let t=E*(r.mode===`pair`?.25:.12)*e.spin+M*.8,n=r.homeRadius*(.5+.5*M);j=e.home.x+Math.cos(t)*n,ne=e.home.z+Math.sin(t)*n,te=e.home.y+(M-.5)*.4}else if(r.mode===`hover`){let t=M*Ei+Math.sin(E*.3+M*9)*.4,n=r.homeRadius*Math.sqrt(M);j=e.home.x+Math.cos(t)*n,ne=e.home.z+Math.sin(t)*n,te=e.home.y+(M*7.3%1-.5)*.8,re=w*(.3+.7*Math.max(0,Math.sin(E*.8+M*20)))}else if(r.mode===`pile`&&O){let t=O[this.slot[i*4+3]|0]||O[0],n=E*.2*e.spin*(.7+M*.6)+M*Ei,a=.5+r.homeRadius*(.4+.6*M);j=t[0]+Math.cos(n)*a,ne=t[1]+Math.sin(n)*a;let o=this.terrain.heightAt(j,ne);te=o+Oi+.3+(r.ceiling-o)*(r.depth[0]+(r.depth[1]-r.depth[0])*(M*5.7%1))}else if(r.mode===`lurk`)j=e.home.x+Math.cos(E*.05+M*6)*r.homeRadius,ne=e.home.z+Math.sin(E*.05+M*6)*r.homeRadius,te=e.home.y,re=w*.6;else if(_){let t=E*.35*e.spin+M*Ei,n=Math.sin(E*.4+M*11)>.8,r=n?.5:5+2*M;j=_.center.x+Math.cos(t)*r,ne=_.center.z+Math.sin(t)*r,te=_.center.y+(M-.5)*2,re=w*(n?2.2:1.3)}else r.mode===`glide`&&e.rest>0&&(j=p,ne=h,te=Math.max(this.terrain.heightAt(p,h),this.floorAt(p,h))+.04,re=0);let ie=j-p,ae=te-m,oe=ne-h,se=Math.sqrt(ie*ie+ae*ae+oe*oe)+1e-6,ce=Math.min(1,se/Math.max(.3,f*4));T+=(ie/se*re*ce-g)*r.wGoal,k+=(ae/se*re*ce-S)*r.wGoal,A+=(oe/se*re*ce-C)*r.wGoal;let le=Math.max(0,this.panic[i]-t*.5);if(x){ie=p-v,ae=m-y,oe=h-b;let t=ie*ie+ae*ae+oe*oe;if(t<D){se=Math.sqrt(t)+1e-4;let n=1-se/r.flee,i=(n*n*12+n*3)*r.accel;T+=ie/se*i,k+=ae/se*i*.4,A+=oe/se*i,le=Math.max(le,Math.min(1,n*1.8)),e.rest=0}}if(this.panic[i]=le,!(this._frame+i&3)||this.floorC[i]<-999){let e=p+g*.7,t=h+C*.7;this.floorC[i]=Math.max(this.floorAt(p,h),this.floorAt(e,t));let n=-this.terrain.heightAt(e,t);this.shallowC[i]=+(n<r.minDepth||n<this.breakDepthFast(e,t))}let ue=r.mode===`glide`?.03:Oi+f*.8,de=this.floorC[i]+ue;m<de&&(k+=(de-m)*8),this.shallowC[i]&&(T-=g*3,A-=C*3);let fe=r.ceiling;m>fe-.3&&!(r.mode===`jumper`&&this.jump[i]>.5)&&(k-=(m-(fe-.3))*8),r.mode!==`turtle`&&(k-=S*1.5),this.jump[i]>.5&&(k+=6,re=w*2.5);let pe=r.accel*f*4*(1+le*3)*(this.jump[i]>.5?3:1),me=Math.sqrt(T*T+k*k+A*A);if(me>pe){let e=pe/me;T*=e,k*=e,A*=e}g+=T*t,S+=k*t,C+=A*t;let he=Math.sqrt(g*g+S*S+C*C)+1e-6,ge=(r.max+(r.burst-r.max)*le)*f*(this.jump[i]>.5?2:1),_e=r.mode===`hover`||r.mode===`solo`||r.mode===`mill`||r.mode===`lurk`||r.mode===`pile`||r.mode===`glide`?0:w*.3,ve=he>ge?ge/he:he<_e?_e/he:1;if(g*=ve,S*=ve,C*=ve,this.jump[i]<.5){let e=Math.sqrt(g*g+C*C),t=(r.mode===`turtle`?.3:.15)+e*.4;S=Math.max(-t,Math.min(t,S))}let N=p+g*t,ye=h+C*t;this.shallowC[i]&&-this.terrain.heightAt(N,ye)<r.minDepth&&(N=p,ye=h,g*=-.5,C*=-.5);let be=this.floorC[i]+(r.mode===`glide`?.02:Oi),xe=m+S*t;if(this.jump[i]>.5&&xe>-.25){this.jump[i]=2;let t=Math.sqrt(g*g+C*C)+1e-6,n=(1.8+e.rng()*.8)/t;g*=n,C*=n,S=3+e.rng()*.8,this.splash(N,ye,g,C,f,.6)}else xe>fe&&(xe=fe,S>0&&(S=0));xe<be&&(xe=be,S<0&&(S=0)),o[u]=N,o[u+1]=xe,o[u+2]=ye,s[u]=g,s[u+1]=S,s[u+2]=C}if(r.mode===`jumper`&&(e.jumpTimer-=t,e.jumpTimer<=0)){e.jumpTimer=4+e.rng()*10;let t=a+Math.floor(e.rng()*i);this.jump[t]===0&&this.pos[t*3+1]>-2.5&&(this.jump[t]=1)}let k=e.goal.x-e.center.x,A=e.goal.z-e.center.z,ee=Math.hypot(k,A);ee>.5&&e.heading.set(k/ee,0,A/ee)}breakDepthFast(e,t){if(t>=40||t<=-64)return 0;if(!this.breakGrid){let e=this.breakGrid=new Float32Array(13312);for(let t=0;t<52;t++)for(let n=0;n<256;n++)e[t*256+n]=this.breakDepth(-256+n*2+1,-64+t*2+1)}let n=Math.floor((e+256)*.5),r=Math.floor((t+64)*.5);return n<0||n>255?0:this.breakGrid[r*256+n]}stepBait(e,t,n){let r=e.sp,i=e.count,a=e.offset,o=this.pos,s=this.vel,c=this.slot,l=e.rng,u=!1,d=0,f=0,p=1/0;if(n){let t=n.distanceTo(e.center);t<14+e.radius&&(u=!0,d=n.x,n.y,f=n.z,p=t)}for(let t of this.groups)t.sp.mode===`patrol`&&t.active&&t.center.distanceTo(e.center)<12+e.radius&&(u=!0);e.ball+=(+!!u-e.ball)*Math.min(1,t*(u?.8:.15)),(e.timer<=0||e.center.distanceTo(e.goal)<3)&&this.retarget(e,u&&p<8?{x:e.center.x-d,z:e.center.z-f}:null);let m=r.length[1],h=r.cruise*m*(1-.75*e.ball)*3;zi.subVectors(e.goal,e.center);let g=zi.length();g>.1&&(zi.multiplyScalar(1/g),e.heading.lerp(zi,Math.min(1,t*.5)).normalize());let _=e.center.x+e.heading.x*h*1.5,v=e.center.y+e.heading.y*h,y=e.center.z+e.heading.z*h*1.5,b=.8+Math.cbrt(i)*.09,x=e.heading.x,S=e.heading.z,C=this.time*.9*e.spin,w=Math.cos(C),T=Math.sin(C),E=2.5,D=2.2,O=r.flee,k=-1/0;for(let e=0;e<5;e++){let t=e/5*Ei,n=e===0?0:b*2;k=Math.max(k,this.floorAt(_+Math.cos(t)*n,y+Math.sin(t)*n))}k+=.6;for(let u=0;u<i;u++){let i=a+u,d=i*3,f=i*4,p=c[f],g=c[f+1],C=c[f+2],A=c[f+3],ee=p*2.4,j=C*1.1,te=g*.55,ne=_+(x*ee-S*j)*b,re=v+te*b,M=y+(S*ee+x*j)*b,ie=(p*w-C*T)*A*b,ae=(p*T+C*w)*A*b,oe=e.center.x+ie,se=e.center.y+g*A*b*.8,ce=e.center.z+ae,le=e.ball,ue=ne+(oe-ne)*le,de=re+(se-re)*le,fe=M+(ce-M)*le,pe=.9*e.spin*A*b,me=x*h*(1-le)+-ae*pe*le/(b+.001),he=S*h*(1-le)+ie*pe*le/(b+.001),ge=o[d],_e=o[d+1],ve=o[d+2],N=s[d],ye=s[d+1],be=s[d+2],xe=Math.max(0,this.panic[i]-t);if(n){let e=ge-n.x,t=_e-n.y,i=ve-n.z,a=e*e+t*t+i*i;if(a<O*O){let n=Math.sqrt(a)+.001,o=1-n/O;ue+=e/n*o*2.2,de+=t/n*o*1.2,fe+=i/n*o*2.2,me+=e/n*o*r.burst*m,he+=i/n*o*r.burst*m,xe=Math.max(xe,o)}}this.panic[i]=xe,de=Math.min(r.ceiling-.2,Math.max(k,de));let Se=(ue-ge)*E+(me-N)*D+(l()-.5)*.6,Ce=(de-_e)*E+(0-ye)*D,we=(fe-ve)*E+(he-be)*D+(l()-.5)*.6;N+=Se*t,ye+=Ce*t,be+=we*t;let Te=(r.max+(r.burst-r.max)*xe)*m,Ee=Math.sqrt(N*N+ye*ye+be*be);Ee>Te&&(N*=Te/Ee,ye*=Te/Ee,be*=Te/Ee),o[d]=ge+N*t,o[d+1]=_e+ye*t,o[d+2]=ve+be*t,s[d]=N,s[d+1]=ye,s[d+2]=be}}attachEscort(e){let t=this.whale,n=e.rng,r=this.slot,i=t.zHead-t.manifest.notchZ,a=e=>{let n=Math.min(Math.max((t.zHead-e)/t.dz,0),t.rest.length-1.001),r=Math.floor(n),i=n-r;return t.rest[r].y+(t.rest[r+1].y-t.rest[r].y)*i},o=null;if(e.sp.mode===`remora`){let n=t.meshes[t.meshes.length-1].geometry,r=n.attributes.position,a=n.attributes.normal;o=[];for(let e=0;e<r.count;e++){let n=r.getZ(e);a.getY(e)<-.75&&n<t.zHead-.18*i&&n>t.zHead-.6*i&&o.push(e)}e.skin={P:r,N:a}}for(let s=0;s<e.count;s++){let c=(e.offset+s)*4,l=n()<.5?-1:1;if(o&&o.length){let t=o[Math.floor(n()*o.length)],{P:i,N:a}=e.skin;r[c]=i.getX(t)+a.getX(t)*.12,r[c+1]=i.getY(t)+a.getY(t)*.12,r[c+2]=i.getZ(t)+a.getZ(t)*.12,r[c+3]=-1}else if(e.sp.name===`juvenile`)r[c]=l*(.3+n()*.9),r[c+1]=a(t.zHead)+(n()-.6)*1.2,r[c+2]=t.zHead,r[c+3]=.6+n()*1.2;else if(n()<.55)r[c]=l*(.4+n()*1.8),r[c+1]=a(t.zHead)+(n()-.5)*1.6,r[c+2]=t.zHead,r[c+3]=1.2+n()*2.8;else{let e=t.zHead-i*(.24+n()*.14);r[c]=l*(4.6+n()*2.2),r[c+1]=a(e)+(n()-.5)*1.4,r[c+2]=e,r[c+3]=0}this.escortTarget(c/4,zi),this.pos.set([zi.x,zi.y,zi.z],(e.offset+s)*3),this.prev.set([zi.x,zi.y,zi.z],(e.offset+s)*3),this.vel.set([0,0,0],(e.offset+s)*3)}e.ball=0,e.attached=!0}escortTarget(e,t){let n=this.whale,r=this.slot;n.toWorld(Bi.set(r[e*4],r[e*4+1],r[e*4+2]),t);let i=r[e*4+3];return i>0&&t.add(Vi.set(0,0,i).applyQuaternion(n.rot[0])),t}stepEscort(e,t){let n=this.whale,r=n.brain,i=this.pos,a=this.vel,o=this.slot,s=e.count,c=e.offset,l=+(r.state===`surface`&&r.water-r.position.y<3);e.ball+=(l-e.ball)*Math.min(1,t*(l?1.5:.3));let u=e.sp;for(let l=0;l<s;l++){let s=c+l,d=s*3;if(this.escortTarget(s,zi),o[s*4+3]<0){a[d]=(zi.x-i[d])/Math.max(t,.001),a[d+1]=(zi.y-i[d+1])/Math.max(t,.001),a[d+2]=(zi.z-i[d+2])/Math.max(t,.001),i[d]=zi.x,i[d+1]=zi.y,i[d+2]=zi.z;continue}if(e.ball>.01){n.toWorld(Bi.set(0,o[s*4+1],o[s*4+2]),Vi);let t=zi.x-Vi.x,r=zi.z-Vi.z,i=Math.hypot(t,r)+.001,a=e.ball*(3+3*this.seed[s]);zi.x+=t/i*a,zi.z+=r/i*a,zi.y-=e.ball*(1.5+2*this.seed[s])}zi.y=Math.min(zi.y,r.water-.45);let f=this.size[s],p=a[d],m=a[d+1],h=a[d+2],g=1.8,_=1.6;p+=((zi.x-i[d])*g+(r.velocity.x-p)*_)*t,m+=((zi.y-i[d+1])*g+(r.velocity.y-m)*_)*t,h+=((zi.z-i[d+2])*g+(r.velocity.z-h)*_)*t;let v=u.burst*f+r.velocity.length(),y=Math.hypot(p,m,h);y>v&&(p*=v/y,m*=v/y,h*=v/y),i[d]+=p*t,i[d+1]=Math.min(i[d+1]+m*t,r.water-.35),i[d+2]+=h*t,a[d]=p,a[d+1]=m,a[d+2]=h}}splash(e,t,n,r,i,a){this.spray&&(zi.set(e,.02,t),Bi.set(n*.2,1.2*a,r*.2),this.spray.emit(zi,Bi,Math.round(10+18*a),.012+i*.02,0,{spread:.9,life:1.1}))}cull(e){if(this._cullFrame===this._frame)return;this._cullFrame=this._frame;let t=this.dt;e.updateMatrixWorld(),Wi.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),Hi.setFromProjectionMatrix(Wi,e.coordinateSystem,e.reversedDepth);let n=e.position,r=e.projectionMatrix.elements[5]*this.viewHeight*.5,i=this.batch,a=i.data,o=this.pos,s=this.vel,c=this.head,l=this.prev,u=1-Math.exp(-t*6),d=1-Math.exp(-t*3);i.begin();for(let e of this.groups){if(!e.active)continue;let f=e.sp;if(Math.hypot(e.center.x-n.x,e.center.y-n.y,e.center.z-n.z)>ki+e.radius||(Ui.center.copy(e.center),Ui.radius=e.radius+2,!Hi.intersectsSphere(Ui)))continue;let p=f.mode===`turtle`,m=f.model===`stingray`||f.model===`eagleRay`;for(let h=0;h<e.count;h++){let g=e.offset+h,_=g*3,v=this.size[g],y=o[_],b=o[_+1],x=o[_+2],S=s[_],C=s[_+1],w=s[_+2],T=Math.sqrt(S*S+C*C+w*w)+1e-6,E=this.jump[g]>1.5,D=E?1:u*Math.min(1,T/(v*.5)+.15),O=c[_],k=c[_+2],A=O+(S/T-O)*D,ee=c[_+1]+(C/T-c[_+1])*D,j=k+(w/T-k)*D,te=E?1.2:m||p?.3:.45;ee=Math.max(-te,Math.min(te,ee));let ne=Math.hypot(A,ee,j)||1;A/=ne,ee/=ne,j/=ne,c[_]=A,c[_+1]=ee,c[_+2]=j;let re=(k*A-O*j)/t,M=m?.45:p?.35:.12;this.roll[g]+=(Math.max(-.5,Math.min(.5,re*M))-this.roll[g])*d,this.bend[g]+=(Math.max(-.25,Math.min(.25,re*.06))-this.bend[g])*d;let ie=T/v,ae=f.mode===`glide`&&e.rest>0,oe=ae?.15:Math.min(10,f.freq[0]+f.freq[1]*ie)*(E?2.5:1),se=t*Ei*oe;this.phase[g]=(this.phase[g]+se)%(Ei*64);let ce=ae?f.amp*.2:f.amp*(.55+.45*Math.min(2.5,ie/Math.max(.2,f.cruise))+this.panic[g]*.5),le=y-n.x,ue=b-n.y,de=x-n.z,fe=Math.sqrt(le*le+ue*ue+de*de);if(fe>ki+v)continue;let pe=v*r/Math.max(fe,.1);if(pe<1.2||(Ui.center.set(y,b,x),Ui.radius=v*.7,!Hi.intersectsSphere(Ui)))continue;Ki(Math.atan2(A,j),-Math.asin(ee),this.roll[g],Ri);let me=g*16;a[me]=y,a[me+1]=b,a[me+2]=x,a[me+3]=v,a[me+4]=Ri.x,a[me+5]=Ri.y,a[me+6]=Ri.z,a[me+7]=Ri.w,a[me+8]=this.phase[g],a[me+9]=ce,a[me+10]=this.bend[g],a[me+11]=this.pattern[g]+this.seed[g]*.9,a[me+12]=y-l[_],a[me+13]=b-l[_+1],a[me+14]=x-l[_+2],a[me+15]=se;let he=pe>Mi[0]?0:pe>Mi[1]?1:pe>Mi[2]?2:3,ge=this.kind[g]+he,_e=ki*.9;if(fe>_e)i.addFade(ge,g,1-nn(fe,_e,ki+v),!1);else if(he<3&&pe<Mi[he]*Ni){let e=nn(-pe,-Mi[he]*Ni,-Mi[he]);i.addFade(ge,g,e,!0),i.addFade(ge+1,g,e,!1)}else i.add(ge,g)}}i.commit(),i.dataAttr.needsUpdate=!0}dispose(){this.batch.dispose(),this.material.dispose(),this.fadeMaterial.dispose(),this.group.removeFromParent()}};function Ki(e,t,n,r){let i=Math.sin(e*.5),a=Math.cos(e*.5),o=Math.sin(t*.5),s=Math.cos(t*.5),c=Math.sin(n*.5),l=Math.cos(n*.5),u=a*o,d=i*s,f=-i*o,p=a*s;return r.set(u*l+d*c,-u*c+d*l,p*c+f*l,p*l-f*c),r}var qi=Math.PI*2,Ji=-.6,Yi=new p(z.swellDir.x,z.swellDir.y).normalize(),Xi=8,Zi=45,Qi=35,$i=110,ea=40,ta=22,na=.6,ra=.25,ia={x0:-200,x1:135,z0:-48,z1:175},aa={rock:{gen:(e,t)=>Er(e,t,`rock`),variants:2,shadow:!0},slab:{gen:(e,t)=>Er(e,t,`slab`),variants:2,lods:4,shadow:!0},boulder:{gen:(e,t)=>Er(e,t,`boulder`),variants:1,shadow:!0},knobby:{gen:(e,t)=>Er(e,t,`knobby`),variants:1},dome:{gen:Or,variants:1,shadow:!0},lobes:{gen:Dr,variants:1,shadow:!0},pillars:{gen:kr,variants:1,shadow:!0},elkhorn:{gen:Ar,variants:2,shadow:!0},staghorn:{gen:jr,variants:2},fingers:{gen:Mr,variants:1},blades:{gen:Nr,variants:1,lods:2},plates:{gen:Pr,variants:1,shadow:!0},rod:{gen:Fr,variants:2},whip:{gen:Ir,variants:1},barrel:{gen:Lr,variants:1,shadow:!0},tubes:{gen:(e,t)=>Rr(e,t,!1),variants:1},vase:{gen:(e,t)=>Rr(e,t,!0),variants:1},rope:{gen:zr,variants:1},urchin:{gen:Br,variants:1,lods:2},anemone:{gen:Vr,variants:1,lods:2},rubble:{gen:Hr,variants:1},grass:{gen:Ur,variants:1,lods:2},fan:{gen:Wr,variants:2,soft:!0},plume:{gen:Gr,variants:2,soft:!0},lettuce:{gen:Zr,variants:2},wallPlates:{gen:Qr,variants:2,shadow:!0},wire:{gen:$r,variants:2},blackCoral:{gen:ei,variants:1},ear:{gen:ti,variants:2},meadow:{gen:qr,variants:3},halimeda:{gen:Jr,variants:2},penicillus:{gen:Yr,variants:1,lods:2},sargassum:{gen:Xr,variants:2},starfish:{gen:ni,variants:2,lods:2},cucumber:{gen:ri,variants:2,lods:2},conch:{gen:ii,variants:1,lods:2}},oa={slab:{warp:.04,model:`slab`,surface:U.rock,scale:[2.2,4.8],sy:[.6,1.1],sxz:[.75,1.3],lod:[1.5,4,10,200],solid:!0,align:.6,sink:.12,flat:.4,c1:[9337962,8811106,9863792,8285280,9205866],c2:[11565714,12224672,10776714,12883624,11038856]},rock:{warp:.05,model:`rock`,surface:U.rock,scale:[1,3.6],sy:[.6,1.1],sxz:[.8,1.25],lod:[3,10,200],solid:!0,align:.3,sink:.14,flat:.45,c1:[9206376,8548448,9731692,8022620,8942692],c2:[11565714,12356258,10513542,13146284,10779794]},boulder:{warp:.1,model:`boulder`,surface:U.star,scale:[.8,2.6],sy:[.6,1.1],sxz:[.85,1.2],lod:[3,10,200],solid:!0,align:.6,sink:.05,flat:.5,c1:[11439702,10782810,9996378,11834976,10388048,9339990],c2:[9212008,8685674,11837560]},lobes:{warp:.06,model:`lobes`,surface:U.star,scale:[.8,1.8],sy:[.8,1.3],sxz:[.85,1.2],lod:[3.5,12,200],solid:!0,align:.4,sink:.03,flat:.6,c1:[11572320,12098664,10783324,11308632],c2:[9343080,12627078]},brain:{warp:.12,model:`dome`,surface:U.brain,scale:[.35,1.3],sy:[.75,1.15],sxz:[.85,1.2],lod:[6,20,110],solid:!0,align:.7,sink:.04,flat:.55,c1:[12098656,11309656,12625e3,10523228,11834976],c2:[7237196,8022604,6580818]},brainWide:{warp:.1,model:`dome`,surface:U.brainWide,scale:[.8,2],sy:[.6,1],sxz:[.85,1.2],lod:[5,18,160],solid:!0,align:.6,sink:.05,flat:.5,c1:[10122832,11043930,9202766,10255446],c2:[8029288,9342064,11049588]},starlet:{warp:.1,model:`dome`,surface:U.porites,scale:[.25,.8],sy:[.7,1.1],sxz:[.85,1.2],lod:[6,20,80],solid:!0,align:.7,sink:.05,flat:.5,c1:[11040856,11567714,10121304,10779228],c2:[8806986]},knobby:{warp:.08,model:`knobby`,surface:U.porites,scale:[.25,.85],sy:[.6,1.1],sxz:[.8,1.25],lod:[6,20,80],solid:!0,align:.7,sink:.05,flat:.5,c1:[10256964,9730624,9207878,10651724,9468482],c2:[8287808]},pillar:{model:`pillars`,surface:U.pillar,scale:[.8,1.4],sy:[.8,1.2],sxz:[.9,1.1],lod:[5,18,200],solid:!0,align:.1,sink:.02,c1:[11572336,12098680,10783336],c2:[14207144]},elkhorn:{model:`elkhorn`,surface:U.acropora,scale:[1,2.4],sy:[.7,1],sxz:[.85,1.2],lod:[5,18,200],solid:!0,align:.2,sink:.03,c1:[11830336,11303994,10515512,12357196,11041344],c2:[14207136,14733996]},staghorn:{model:`staghorn`,surface:U.acropora,scale:[.8,1.5],sy:[.8,1.2],sxz:[.85,1.2],lod:[5,18,120],align:.15,sink:.03,c1:[12096610,11307610,12622954,10782814,11572328],c2:[15788248,14998728]},finger:{model:`fingers`,surface:U.finger,scale:[.9,1.9],sy:[.8,1.3],sxz:[.85,1.2],lod:[6,20,70],align:.5,sink:.02,c1:[11573888,12099716,10785418,11575420],c2:[14208184,13681864]},fire:{model:`blades`,surface:U.fire,scale:[.7,1.5],sy:[.8,1.2],sxz:[.85,1.2],lod:[6,20,70],align:.4,sink:.02,c1:[13674584,12885584,13938788,12622418],c2:[16051412]},plate:{warp:.05,model:`plates`,surface:U.plate,scale:[.8,1.8],sy:[.8,1.2],sxz:[.85,1.2],lod:[5,18,120],solid:!0,align:.5,sink:.02,c1:[10124376,9203792,10781790,9599572],c2:[13680804]},rod:{model:`rod`,surface:U.gorgonian,flex:.25,scale:[.65,1.6],sy:[.8,1.2],sxz:[.8,1.2],lod:[4,16,60],align:.15,sink:.01,c1:[10123878,11045472,9202800,11570274,9731168,10122374,11311208,9067148,8014974,12623970],c2:[12628128,13154452,12097728]},whip:{model:`whip`,surface:U.gorgonian,flex:.5,scale:[.6,1.3],sy:[.8,1.2],sxz:[.8,1.2],lod:[5,18,90],align:.1,sink:.01,c1:[10121800,8804414,10780234,8014424],c2:[11045984]},barrel:{warp:.06,model:`barrel`,surface:U.sponge,scale:[.7,1.5],sy:[.8,1.2],sxz:[.9,1.1],lod:[5,18,200],solid:!0,align:.2,sink:.04,c1:[9195584,10117200,8148040,9069144],c2:[6304810]},tube:{model:`tubes`,surface:U.sponge,scale:[.8,1.6],sy:[.8,1.3],sxz:[.9,1.1],lod:[6,20,70],align:.2,sink:.02,c1:[13676608,10117184,13660208,10786390,13148224,11569744,9067168],c2:[5914656]},vase:{warm:0,model:`vase`,surface:U.sponge,scale:[.8,1.5],sy:[.8,1.2],sxz:[.9,1.1],lod:[6,20,70],align:.2,sink:.02,c1:[10523340,9601728,11178168],c2:[6970008]},rope:{warm:0,model:`rope`,surface:U.sponge,scale:[.8,1.5],sy:[.9,1.1],sxz:[.9,1.1],lod:[6,20,60],align:.5,sink:0,c1:[8798330,9977920,7614054],c2:[5909072]},urchin:{warm:0,model:`urchin`,surface:U.urchin,scale:[.8,1.2],sy:[.9,1.1],sxz:[.9,1.1],lod:[8,30,60],align:.6,sink:0,c1:[1314836,1578008,1051664],c2:[2759210]},anemone:{model:`anemone`,surface:U.anemone,flex:.35,scale:[.9,1.5],sy:[.9,1.1],sxz:[.9,1.1],lod:[8,30,50],align:.7,sink:0,c1:[14470312,13680800,14207168],c2:[13136036,11035832,14192808]},rubble:{emerge:!0,model:`rubble`,surface:U.rubble,scale:[.8,1.8],sy:[.8,1.2],sxz:[.8,1.2],lod:[6,20,50],align:1,sink:0,c1:[10523780],c2:[11565714,12356258,9868384]},grass:{warm:0,model:`grass`,surface:U.grass,flex:.6,scale:[.8,1.3],sy:[.8,1.2],sxz:[.9,1.1],lod:[6,20,70],align:0,sink:0,c1:[5006892,5926962,4347946,5400110],c2:[8812618]},fan:{warm:0,model:`fan`,surface:U.fan,flex:.38,scale:[.4,1.2],sy:[.85,1.15],sxz:[.85,1.15],lod:[5,18,130],align:.1,sink:.01,fan:!0,c1:[8014464,9066640,6961762,10119826,11048024,9075272],c2:[6172256,7224944,8022592]},plume:{warm:0,model:`plume`,surface:U.plume,flex:.55,scale:[.65,1.6],sy:[.85,1.2],sxz:[.85,1.15],lod:[5,18,110],align:.1,sink:.01,c1:[9079368,8026688,10127952,9073736,7224942,8014434],c2:[11182176,10123872]},lettuce:{warp:.03,model:`lettuce`,surface:U.lettuce,scale:[.7,1.7],sy:[.8,1.25],sxz:[.85,1.2],lod:[5,16,90],align:.4,sink:.02,c1:[10123848,11045456,9204292,11572312,8155208],c2:[14208168,13154448]},wallPlate:{warp:.03,model:`wallPlates`,surface:U.plate,scale:[.8,1.9],sy:[.8,1.15],sxz:[.85,1.2],lod:[5,18,160],solid:!0,align:.7,sink:.02,c1:[9072208,8152136,9730138,8415828,10124886],c2:[13943972,13154460]},wire:{warm:.2,model:`wire`,surface:U.gorgonian,flex:.35,scale:[.7,1.3],sy:[.9,1.1],sxz:[.9,1.1],lod:[4,14,70],align:.55,sink:.01,c1:[9075280,8022596,10123850,6974024],c2:[11049064]},blackCoral:{warm:.2,model:`blackCoral`,surface:U.gorgonian,flex:.2,scale:[.6,1.4],sy:[.85,1.15],sxz:[.85,1.15],lod:[4,14,80],align:.4,sink:.01,c1:[6974010,8021046,5921336,8810556],c2:[10127952]},ear:{warm:0,model:`ear`,surface:U.sponge,scale:[.6,1.4],sy:[.85,1.2],sxz:[.9,1.1],lod:[5,18,120],align:.35,sink:.03,c1:[12607532,12079146,13135924,11028528,12085820],c2:[6957594]},barrelDeep:{warp:.06,model:`barrel`,surface:U.sponge,scale:[1.2,2.3],sy:[.85,1.25],sxz:[.9,1.1],lod:[5,18,250],solid:!0,align:.25,sink:.04,c1:[9195584,10117200,8148040,9069144,9726552],c2:[6304810]},fanDeep:{warm:0,model:`fan`,surface:U.fan,flex:.22,scale:[.9,1.7],sy:[.85,1.15],sxz:[.85,1.15],lod:[5,18,160],align:.2,sink:.01,fan:!0,c1:[8014464,9066640,10119826,11048024,11573850,10111584],c2:[6172256,7224944,8022592]},meadow:{warm:0,model:`meadow`,surface:U.grass,flex:.55,scale:[.85,1.2],sy:[.75,1.2],sxz:[.85,1.15],lod:[5,13,30],align:.8,sink:0,c1:[6982202,7902782,6192692,8558655,7243832],c2:[10127954]},halimeda:{warm:0,model:`halimeda`,surface:U.algae,flex:.12,scale:[.8,1.5],sy:[.8,1.3],sxz:[.85,1.15],lod:[6,18,50],align:.3,sink:0,c1:[9088586,8299588,10139730,7774278],c2:[14212272]},penicillus:{warm:0,model:`penicillus`,surface:U.algae,flex:.1,scale:[.8,1.4],sy:[.8,1.3],sxz:[.9,1.1],lod:[8,40],align:.2,sink:0,c1:[8034890,8953936,7245380],c2:[13684912]},bayRock:{far:!0,warp:.06,model:`rock`,surface:U.rock,scale:[.9,3.2],sy:[.5,1],sxz:[.75,1.3],lod:[3,10,400],solid:!0,align:.3,sink:.3,flat:.45,c1:[9206376,8285790,9732208,7759962,8812138],c2:[10124910,10521200,9340006]},baySlab:{far:!0,warp:.04,model:`slab`,surface:U.rock,scale:[1.8,4.2],sy:[.45,.8],sxz:[.75,1.3],lod:[1.5,4,10,400],solid:!0,align:.7,sink:.2,flat:.4,c1:[9337962,8680034,8023134,9206374],c2:[10127472,10521208,9079400]},bayBoulder:{far:!0,emerge:!0,warp:.1,model:`boulder`,surface:U.rock,scale:[.25,1.1],sy:[.55,1],sxz:[.8,1.25],lod:[3,10,300],solid:!0,align:.5,sink:.35,flat:.5,c1:[9074790,8154204,9864308,8548962],c2:[10128498,9208936]},shoreRock:{far:!0,emerge:!0,warp:.06,model:`rock`,surface:U.rock,scale:[1,2.8],sy:[.55,1],sxz:[.75,1.3],lod:[3,10,400],solid:!0,align:.3,sink:.25,flat:.45,c1:[8023134,7234132,8680548,6970962,7759962],c2:[7238736,8026712,8812634]},starfish:{emerge:!0,warm:.9,model:`starfish`,surface:U.anemone,scale:[.8,1.3],sy:[.9,1.1],sxz:[.9,1.1],lod:[10,60],align:1,sink:0,c1:[13656106,13135916,14188602,12079146,13144128],c2:[14725232]},cucumber:{warm:.3,model:`cucumber`,surface:U.sponge,scale:[.8,1.4],sy:[.9,1.1],sxz:[.8,1.2],lod:[10,60],align:1,sink:.05,c1:[3811870,4863012,3023904,5917232],c2:[2760216]},conch:{emerge:!0,warm:.5,model:`conch`,surface:U.rubble,scale:[.8,1.3],sy:[.9,1.1],sxz:[.9,1.1],lod:[10,60],align:1,sink:.15,c1:[10523780],c2:[14196880,14725272]},sargassum:{warm:0,model:`sargassum`,surface:U.sargassum,flex:.9,scale:[.7,1.5],sy:[.8,1.3],sxz:[.85,1.15],lod:[5,16,60],align:.2,sink:0,c1:[9071146,10123826,8019494,10518582,8413736],c2:[6969894]}},sa=[{mode:`structure`,occ:0,spacing:2,allow:.45,types:{slab:[1.5,1.2,1.5,1.5,.8],rock:[1.8,1.8,1.6,2,1.2],boulder:[1.2,3,.7,1.8,2],lobes:[.4,2.4,.4,1.2,1.8],brainWide:[1,1.5,.5,1,.8],elkhorn:[5,.3,0,0,0],barrel:[0,.5,0,.1,.3],barrelDeep:[0,0,0,0,1.4],pillar:[.05,.2,.02,.05,0],plate:[0,.35,0,.15,.4],wallPlate:[0,.1,0,0,1.6],ear:[0,.1,0,.05,.4]}},{mode:`colony`,occ:1,spacing:.55,allow:.25,types:{brain:[1.2,.9,.5,.8,.5],knobby:[1.4,.7,.7,.7,.3],starlet:[.3,.5,1,.5,.3],staghorn:[.8,4,.5,1.2,.3],finger:[.5,.4,2,.6,0],fire:[1.2,.15,.2,.2,0],plate:[0,.25,0,.1,.6],lobes:[.2,.8,.2,.5,.7],elkhorn:[2.5,.15,0,0,0],lettuce:[.3,.9,.9,.6,.8],wallPlate:[0,0,0,0,1],rod:[.6,1,.6,.8,.3],fan:[.8,.5,.2,.5,.2],plume:[.2,.6,.3,.4,.2],tube:[.4,1.6,.2,.7,1.4],vase:[.1,.8,0,.3,1],rope:[.2,.7,.2,.4,.8],ear:[0,.3,0,.1,.9],anemone:[.2,.2,.15,.15,.05],sargassum:[1.6,.15,.5,.2,0]}},{mode:`cover`,occ:1,spacing:.65,allow:.32,types:{brain:[1,1,.8,1,.6],brainWide:[.3,.5,.2,.4,.4],knobby:[1.2,.8,.8,.8,.4],starlet:[.3,.5,.8,.5,.4],lobes:[.3,1.2,.3,.8,1.2],lettuce:[.3,.9,.6,.6,.9],fire:[1,.2,.2,.2,0],plate:[0,.3,0,.1,.8],wallPlate:[0,0,0,0,1.4],tube:[.3,1.2,.2,.6,1.2],vase:[.1,.6,0,.3,.9],rope:[.2,.6,.2,.4,.6],ear:[0,.2,0,.1,.7],sargassum:[1.4,.1,.4,.1,0]}},{mode:`forest`,occ:4,spacing:.75,allow:.3,types:{rod:[2.2,3.6,1.4,2.4,1.2],plume:[.8,2.4,.8,1.4,1],whip:[.5,1.3,.6,1,1],fan:[2,1.2,.3,.9,.3],fanDeep:[0,.2,0,.1,2.2],wire:[0,.05,0,0,1.2],blackCoral:[0,0,0,0,.8]}},{mode:`small`,occ:2,spacing:.4,allow:.25,types:{urchin:[.3,.15,.4,.2,.05],rubble:[.5,.8,1,.7,.4],knobby:[.3,.15,.2,.15,.1],brain:[.15,.15,.1,.1,.1],rod:[.4,.6,.3,.4,.3],fan:[.3,.2,.1,.2,.2],finger:[.2,.2,.6,.2,0],starlet:[.1,.15,.3,.15,.1],plume:[.2,.3,.2,.2,.2],staghorn:[.2,.8,.1,.2,0],tube:[.1,.35,.05,.15,.4],lettuce:[.1,.3,.3,.2,.2],sargassum:[1.4,.1,.4,.1,0],halimeda:[.3,.25,1.4,.5,.2],penicillus:[.1,.05,.6,.2,0]}}],ca=(e,t,n=0)=>{let r=new c(e).offsetHSL((t()-.5)*.04,(t()-.5)*.1,(t()-.5)*.1);return r.r*=1+.35*n,r.g*=1-.08*n,r.b*=1-.2*n,r},la=new i,ua=new i,da=new n,fa=new n,pa=new n(0,1,0),ma=new x,ha=new o,ga=new S,_a=class{constructor({scene:e,terrain:t,shoreField:r=null}){let a=performance.now();this.terrain=t,this.center=z.reef.center.clone(),this.radius=z.reef.radius,this.group=new xe,this.group.name=`Reef`,e.add(this.group),this.rng=yn(20260923),this.noise=new On(4242),this.noise2=new On(977),this.fft=null,this.timings={},this.buildKinds(),this.initFields(),this.items={hard:[],soft:[]},this.placeLayers(),this.timings.place=performance.now()-a,this.buildBatches(),this.buildCells(),this.fish=new Gi({parent:this.group,terrain:t,center:this.center,radius:this.radius+10,floorAt:(e,t)=>this.floorHeightAt(e,t),anchors:this.anchors,shoreField:r}),this.camera=null,this._cullPos=new n(1/0,0,0),this._cullQuat=new i,this._cullFrame=-1,this.frame=0,this.timings.total=performance.now()-a}setOcean(e){this.fft=e}setSpray(e){this.fish.spray=e}setWhale(e){this.fish.setWhale(e)}buildKinds(){this.kinds={hard:[],soft:[]},this.models={};let e=1;for(let[t,n]of Object.entries(aa)){let r=this.kinds[n.soft?`soft`:`hard`],i=n.lods??3;this.models[t]=[];for(let a=0;a<n.variants;a++){let a=e++*7919,o=r.length,s=null,c=null;for(let e=0;e<i;e++){let i=n.gen(yn(a),e);e===0&&(s=i),c=i,r.push({geometry:i,type:t,lod:e})}s.computeBoundingBox();let l=s.boundingBox,u={kind0:o,lods:i,radius:Math.max(l.max.x,-l.min.x,l.max.z,-l.min.z,l.max.y),top:l.max.y,proxy:-1,stamp:c};n.shadow&&(u.proxy=r.length,r.push({geometry:c,type:t,lod:-1,shadow:!0,shadowOnly:!0})),this.models[t].push(u)}}}initFields(){let e=this.center;this.x0=e.x-120,this.z0=e.z-70,this.x1=e.x+120,this.z1=e.z+115,this.hx0=this.x0,this.hz0=Math.min(this.z0,ia.z0),this.hfW=Math.ceil((Math.max(this.x1,ia.x1)-this.hx0)/ra),this.hfH=Math.ceil((this.z1-this.hz0)/ra),this.hf=new Float32Array(this.hfW*this.hfH).fill(-1/0),this.occ=[new Map,new Map,new Map,new Map,new Map],this.occMax=[0,0,0,0,0],this.anchors=[],this.fields=[],this.fW=Math.ceil(this.x1-this.x0),this.fH=Math.ceil(this.z1-this.z0)}frameUV(e,t){let n=e-this.center.x,r=t-this.center.z;return[-(n*Yi.x+r*Yi.y),-n*Yi.y+r*Yi.x]}habitat(e,t,n={}){let r=this.noise,i=this.noise2,a=-this.terrain.heightAt(e,t),[o,s]=this.frameUV(e,t),c=r.fbm(e/26,t/26,3)*18+i.fbm(e/8,t/8,2)*4,l=o>0?o/72:-o/42,u=s/92,d=1-R(.5,1,Math.hypot(l,u)+c/90),f=((s+r.fbm(o/26+3.1,s/26,2)*10+i.noise(o/9,s/9)*2.5)/(12+i.noise(s/40,7.7)*3)%1+1)%1,p=.1+.07*r.noise(o/11+9,s/11),m=1-R(p,p+.07,Math.abs(f-.5)),h=R(3,14,o+c*.4),g=R(-4,-20,o+c*.4),_=R(0,.3,r.fbm(e/12+7.7,t/12-3.3,3)+.1),v=d*(1-h*m)*(1-g*(1-_)),y=R(.38,.58,i.fbm(e/16-11,t/16+5,3))*(1-d)*(1-R(95,130,Math.hypot(o*.9,s*.7)));v=Math.max(v,y*.85);let b=a+i.noise(e/9+1.3,t/9)*.35,x=R(7.5,10.5,b)*(1-g),S=1-R(1,1.4,Math.hypot(l,u*1.1)+c/90);v=Math.max(v,x*S*R(-.35,.05,r.fbm(e/14-21,t/14+4,3))*.95),v*=R(1.2,1.75,b)*(1-R(16,21,b)),v*=R(0,14,Math.min(e-this.x0,this.x1-e,t-this.z0,this.z1-t)),n.f=Math.max(0,Math.min(1,v)),n.depth=a;let C=(1-R(2.6,4.2,b))*(1-g)*d;return n.w0=C,n.w1=d*(1-C)*(1-g*.8)*(1-x),n.w2=d*g*(1-C*.5),n.w3=(1-d)*(1-x)+.001,n.w4=x,n.u=o,n.v=s,n}hfIndex(e,t){let n=Math.floor((e-this.hx0)/ra),r=Math.floor((t-this.hz0)/ra);return n<0||r<0||n>=this.hfW||r>=this.hfH?-1:r*this.hfW+n}structureAt(e,t){let n=this.hfIndex(e,t);return n<0?-1/0:this.hf[n]}groundAt(e,t){return Math.max(this.terrain.heightAt(e,t),this.structureAt(e,t))}groundNormal(e,t,n){let r=.35,i=this.groundAt(e+r,t)-this.groundAt(e-r,t),a=this.groundAt(e,t+r)-this.groundAt(e,t-r);return n.set(-i,2*r,-a).normalize()}stamp(e,t){let n=e.attributes.position.array,r=e.attributes.aData.array,i=e.index.array;ma.compose(da.set(t.x,t.y,t.z),t.q,fa.set(1,1,1));let a=ma.elements,o=n.length/3,s=this._stampX||=new Float32Array(8192),c=this._stampY||=new Float32Array(8192),l=this._stampZ||=new Float32Array(8192),u=t.flex<0?-t.flex*t.s:0,d=t.seed*17,f=t.s*t.sx,p=t.s*t.sy,m=t.s*t.sz;for(let e=0;e<o;e++){let t=n[e*3],i=n[e*3+1],o=n[e*3+2],h=t*f,g=i*p,_=o*m;if(u>0){let n=u*(r[e*4]*.8+.2),a=t*3.1+d,s=i*3.1+d,c=o*3.1+d;h+=Math.sin(s*1.7+c)*n,g+=Math.sin(c*1.3+a*1.1)*.6*n,_+=Math.sin(a*1.9+s*.7)*n}s[e]=a[0]*h+a[4]*g+a[8]*_+a[12],c[e]=a[1]*h+a[5]*g+a[9]*_+a[13],l[e]=a[2]*h+a[6]*g+a[10]*_+a[14]}let h=this.hf,g=this.hfW,_=this.hfH,v=ra,y=this.hx0,b=this.hz0;for(let e=0;e<i.length;e+=3){let t=i[e],n=i[e+1],r=i[e+2],a=s[t],o=l[t],u=s[n],d=l[n],f=s[r],p=l[r],m=Math.max(0,Math.floor((Math.min(a,u,f)-y)/v)),x=Math.min(g-1,Math.floor((Math.max(a,u,f)-y)/v)),S=Math.max(0,Math.floor((Math.min(o,d,p)-b)/v)),C=Math.min(_-1,Math.floor((Math.max(o,d,p)-b)/v)),w=(d-p)*(a-f)+(f-u)*(o-p);if(!(Math.abs(w)<1e-9))for(let e=S;e<=C;e++){let i=b+(e+.5)*v;for(let s=m;s<=x;s++){let l=y+(s+.5)*v,m=((d-p)*(l-f)+(f-u)*(i-p))/w,_=((p-o)*(l-f)+(a-f)*(i-p))/w,b=1-m-_;if(m<-1e-4||_<-1e-4||b<-1e-4)continue;let x=m*c[t]+_*c[n]+b*c[r],S=e*g+s;x>h[S]&&(h[S]=x)}}}}occupied(e,t,n,r,i){let a=this.occ[e],o=r+this.occMax[e],s=Math.floor((t-o)/2),c=Math.floor((t+o)/2),l=Math.floor((n-o)/2),u=Math.floor((n+o)/2);for(let e=s;e<=c;e++)for(let o=l;o<=u;o++){let s=a.get(e*65536+o);if(s)for(let e=0;e<s.length;e+=3){let a=s[e]-t,o=s[e+1]-n,c=(s[e+2]+r)*(1-i);if(a*a+o*o<c*c)return!0}}return!1}occupy(e,t,n,r){let i=Math.floor(t/2)*65536+Math.floor(n/2),a=this.occ[e];this.occMax[e]=Math.max(this.occMax[e],r);let o=a.get(i);o||a.set(i,o=[]),o.push(t,n,r)}place(e,t,n,r,{layer:i=1,allow:a=.25,onGround:o=!1}={}){let s=oa[e],c=this.models[s.model],l=c[Math.floor(r()*c.length)],u=s.scale[0]+(s.scale[1]-s.scale[0])*r()**1.3,d=s.sxz[0]+(s.sxz[1]-s.sxz[0])*r(),f=s.sy[0]+(s.sy[1]-s.sy[0])*r(),p=u,m=l.radius*p*.8;if(this.occupied(i,t,n,m,a)||this.terrain.heightAt(t,n)>(s.emerge?-.35:-.8999999999999999))return!1;let h=o?(e,t)=>this.terrain.heightAt(e,t):(e,t)=>this.groundAt(e,t),g=h(t,n),_=m*(.6-.45*s.align);for(let e=0;e<5;e++){let r=e*qi/5+.3;g=Math.min(g,h(t+Math.cos(r)*_,n+Math.sin(r)*_))}o?this.terrain.normalAt(t,n,fa):this.groundNormal(t,n,fa),da.copy(pa).lerp(fa,s.align).normalize(),la.setFromUnitVectors(pa,da);let v=r()*qi;s.fan&&(v=Math.atan2(Yi.x,Yi.y)+(r()-.5)*.7),ua.setFromAxisAngle(pa,v),la.multiply(ua);let y=da.y,b=g+l.top*p*f*y-s.sink*l.top*p*f;if(b>Ji&&!s.emerge){let e=(Ji-g+s.sink*l.top*p*f)/(l.top*p*f*y);if(s.flat&&f*e>=s.sy[0]*s.flat?f*=e:(s.flat&&(e=e*f/(s.sy[0]*s.flat),f=s.sy[0]*s.flat),p*=e),p<u*.4||p<s.scale[0]*.4||(b=g+l.top*p*f*y-s.sink*l.top*p*f,b>-.59))return!1}let x=g-s.sink*l.top*p*f,S=ca(s.c1[Math.floor(r()*s.c1.length)],r,s.warm??.5),C=ca(s.c2[Math.floor(r()*s.c2.length)],r,s.warm??.5),w={name:e,model:l,x:t,y:x,z:n,s:p,sx:d,sy:f,sz:1/d,q:la.clone(),c1:ui(S),c2:ui(C),seed:r(),flex:s.flex?s.flex*(.8+r()*.4):-(s.warp??0)*(.6+r()*.8),radius:l.radius*p*Math.max(d,1/d,f)};return this.items[aa[s.model].soft?`soft`:`hard`].push(w),this.occupy(i,t,n,m),s.solid&&l.stamp&&this.stamp(l.stamp,w),!0}placeFramework(e,t){let n={},r=1.9,i=0;for(let t=this.z0;t<this.z1;t+=r)for(let a=this.x0;a<this.x1;a+=r){let o=a+(e()-.5)*r,s=t+(e()-.5)*r;this.habitat(o,s,n);let c=n.f;c<.3||e()>R(.3,.7,c)||this.place(`slab`,o,s,e,{layer:0,allow:.72,onGround:!0})&&i++}t.framework=i}placeLayers(){let e=this.rng,t={},n=[`w0`,`w1`,`w2`,`w3`,`w4`],r=this.x1-this.x0,i=this.z1-this.z0,a={},o=performance.now(),s=e=>{let t=performance.now();this.timings[e]=t-o,o=t};this.buildSkipGrid(),s(`skip`),this.placeFramework(e,a),s(`framework`),sa.forEach((o,c)=>{let l=Object.keys(o.types),u=l.map(e=>o.types[e]),d=Math.floor(r*i/(o.spacing*o.spacing)*1.6),f=new Float32Array(l.length);for(let s=0;s<d;s++){let s=this.x0+e()*r,c=this.z0+e()*i;if(this.skipAt(s,c)<=.02)continue;this.habitatCached(s,c,t);let d=t.f;if(d<=.02)continue;let p=o.mode!==`structure`&&this.structureAt(s,c)>this.terrain.heightAt(s,c)+.05,m;switch(o.mode){case`structure`:m=d**.8;break;case`colony`:m=d**.6*(p?1:.7);break;case`cover`:m=p?d**.5:0;break;case`forest`:m=d**.7*Math.min(1,t.w0+t.w1+t.w4*.8+t.w3*.6+t.w2*.25);break;default:m=d**.5*.9*(p?1:.7)}if(e()>m)continue;let h=0;for(let e=0;e<l.length;e++){let r=0;for(let i=0;i<5;i++)r+=u[e][i]*t[n[i]];r*=this.clusterWeight(l[e],s,c,t),f[e]=r,h+=r}if(h<=0)continue;let g=e()*h,_=0;for(;_<l.length-1&&g>f[_];)g-=f[_++];let v=l[_];this.suits(v,t)&&this.place(v,s,c,e,{layer:o.occ,allow:v===`slab`?.6:o.allow})&&(a[v]=(a[v]||0)+1)}s(o.mode)}),this.placeBay(e,a),s(`bay`),this.placeMeadows(e,a),s(`meadows`),this.placeAnchors(),this.counts=a,this.fields=null,this.skip=null,this.hc=null}field(e,t,n){let r=this.fields[e];r||=this.fields[e]=new Float32Array(this.fW*this.fH).fill(NaN);let i=Math.min(this.fW-1,Math.max(0,Math.floor(t-this.x0))),a=Math.min(this.fH-1,Math.max(0,Math.floor(n-this.z0))),o=a*this.fW+i,s=r[o];if(s!==s){let t=this.x0+i+.5,n=this.z0+a+.5,c=this.noise;switch(e){case 0:s=c.fbm(t/13+31,n/13-7,2);break;case 1:s=c.fbm(t/15-17,n/15+2,2);break;case 2:s=c.fbm(t/10+5,n/10+9,2);break;case 3:s=c.fbm(t/7-3,n/7+13,2);break;case 4:s=c.fbm(t/9+41,n/9-17,2);break;case 5:s=c.fbm(t/6-27,n/6+31,2);break;default:s=c.fbm(t/5+13,n/5+57,2)}r[o]=s}return s}clusterWeight(e,t,n,r){switch(e){case`staghorn`:return R(.05,.35,this.field(0,t,n))*2.5+.05;case`elkhorn`:return R(-.1,.3,this.field(1,t,n))*2+.1;case`rod`:case`plume`:case`whip`:return R(-.2,.3,this.field(2,t,n))*1.6+.3;case`barrel`:return R(5,8,r.depth);case`vase`:case`tube`:return R(3,5,r.depth)+.1;case`finger`:return R(-.1,.3,this.field(3,t,n))*2+.1;case`lettuce`:return R(0,.3,this.field(4,t,n))*2.2+.05;case`sargassum`:return R(-.05,.3,this.field(5,t,n))*2.5+.02;case`halimeda`:case`penicillus`:return R(-.1,.3,this.field(6,t,n))*2+.05;case`wire`:case`blackCoral`:return R(9,13,r.depth);case`barrelDeep`:return R(8,12,r.depth);default:return 1}}buildSkipGrid(){let e=Math.ceil((this.x1-this.x0)/2)+1,t=Math.ceil((this.z1-this.z0)/2)+1,n=new Float32Array(e*t),r={};for(let i=0;i<t;i++)for(let t=0;t<e;t++)n[i*e+t]=this.habitat(this.x0+t*2,this.z0+i*2,r).f;let i=new Float32Array(e*t);for(let r=0;r<t;r++)for(let a=0;a<e;a++){let o=0;for(let i=Math.max(0,r-2);i<=Math.min(t-1,r+2);i++)for(let t=Math.max(0,a-2);t<=Math.min(e-1,a+2);t++)o=Math.max(o,n[i*e+t]);i[r*e+a]=o}this.skip={W:e,H:t,c:2,d:i}}habitatCached(e,t,n){let r=.5,i=this.hcW||=Math.ceil((this.x1-this.x0)/r),a=this.hcH||=Math.ceil((this.z1-this.z0)/r),o=this.hc||=new Float32Array(i*a*8).fill(NaN),s=Math.min(i-1,Math.max(0,Math.floor((e-this.x0)/r))),c=Math.min(a-1,Math.max(0,Math.floor((t-this.z0)/r))),l=(c*i+s)*8;return o[l]===o[l]?(n.f=o[l],n.depth=o[l+1],n.w0=o[l+2],n.w1=o[l+3],n.w2=o[l+4],n.w3=o[l+5],n.w4=o[l+6],n.u=o[l+7],n):(this.habitat(this.x0+(s+.5)*r,this.z0+(c+.5)*r,n),o[l]=n.f,o[l+1]=n.depth,o[l+2]=n.w0,o[l+3]=n.w1,o[l+4]=n.w2,o[l+5]=n.w3,o[l+6]=n.w4,o[l+7]=n.u,n)}skipAt(e,t){let n=this.skip,r=Math.round((e-this.x0)/n.c),i=Math.round((t-this.z0)/n.c);return r<0||i<0||r>=n.W||i>=n.H?0:n.d[i*n.W+r]}suits(e,t){let n=t.depth;switch(e){case`elkhorn`:return n>1.4&&n<5.5;case`fire`:return n>1.3&&n<6;case`staghorn`:return n>2;case`barrel`:return n>4.5;case`pillar`:return n>3;case`plate`:return n>4;case`vase`:return n>3;case`plume`:case`whip`:return n>1.8;case`lettuce`:return n>1.8;case`wallPlate`:case`fanDeep`:return n>7;case`wire`:case`barrelDeep`:return n>8;case`blackCoral`:return n>11;case`ear`:return n>5.5;case`sargassum`:return n<4.5;case`halimeda`:return n<13;case`penicillus`:return n<7;default:return!0}}placeBay(e,t){let n=this.terrain,r=this.noise,i=this.noise2,a=z.pier,o={},s=e=>t[e]=(t[e]||0)+1,c=(e,t)=>Math.abs(e-a.x)<3.2&&t>a.zStart-2&&t<a.zEnd+1||Math.abs(e-a.x)<a.headWidth/2+1.5&&t>a.zEnd-a.headDepth-1.5&&t<a.zEnd+1.5,l=(e,t)=>{let s=-n.heightAt(e,t);if(s<.7||c(e,t)||e>this.x0&&e<this.x1&&t>this.z0&&t<this.z1&&this.habitatCached(e,t,o).f>.1)return 0;let l=R(.5,3.2,s)*(1-R(16,22,s)),u=e-a.x,d=Math.exp(-(u*u)/512)*R(a.zStart,a.zStart+20,t);return l*R(-.12,.4,r.fbm(e/30+17.3,t/30-8.1,3)+.3*i.fbm(e/8-4.4,t/8+2.2,2))*(.55+1.3*d)},u=ia.x1-ia.x0,d=ia.z1-ia.z0,f=[`brain`,`brain`,`starlet`,`knobby`,`knobby`,`tube`,`rope`,`rod`,`rod`,`fan`,`plume`,`urchin`,`urchin`,`anemone`,`vase`,`finger`],p=(t,r,i,a,o,l,u)=>{let d=e()*qi,f=i+(a-i)*e(),p=t+Math.cos(d)*f,m=r+Math.sin(d)*f;return c(p,m)||-n.heightAt(p,m)<.45||!this.suits(o,{depth:-n.heightAt(p,m)})?!1:this.place(o,p,m,e,{layer:l,allow:u})?(s(`bay_`+o),!0):!1},m=Math.floor(u*d/7);for(let t=0;t<m;t++){let t=ia.x0+e()*u,r=ia.z0+e()*d,a=l(t,r);if(a<=0||e()>a**.7)continue;let o=-n.heightAt(t,r);if(i.fbm(t/22+3.3,r/22-5.7,2)>-.12||o<2.4){let n=e(),i=n<.45?`bayRock`:n<.65?`baySlab`:`bayBoulder`;if(!this.place(i,t,r,e,{layer:0,allow:.35,onGround:!0}))continue;s(i);let c=1+Math.floor(e()*4*a+e()*2);for(let e=0;e<c;e++)p(t,r,.8,3.5,`bayBoulder`,0,.4);for(let n=0;n<2+Math.floor(e()*3);n++)p(t,r,1,4.5,`rubble`,2,.5);let l=Math.floor((1+e()*5)*Math.min(1,o/3));for(let n=0;n<l;n++)p(t,r,0,2.2,f[Math.floor(e()*f.length)],1,.3)}else if(o>2.4){let n=3+Math.floor(e()*7);for(let e=0;e<n;e++)p(t,r,0,1.2+n*.35,`meadow`,3,.45);for(let n=0;n<2;n++)e()<.6&&p(t,r,.5,3,e()<.7?`halimeda`:`penicillus`,2,.3);e()<.5&&p(t,r,.5,3,e()<.6?`cucumber`:`conch`,2,.3)}}for(let t=0,r=Math.floor(u*d/16);t<r;t++){let t=ia.x0+e()*u,r=ia.z0+e()*d,i=l(t,r);if(i<=0||e()>i*.5)continue;let a=[`brain`,`starlet`,`knobby`,`brainWide`,`tube`,`finger`,`staghorn`][Math.floor(e()*7)];this.suits(a,{depth:-n.heightAt(t,r)})&&this.place(a,t,r,e,{layer:1,allow:.3,onGround:!0})&&s(`bay_`+a)}for(let t=0,a=Math.floor(u*d/2.5);t<a;t++){let t=ia.x0+e()*u,a=ia.z0+e()*d,l=-n.heightAt(t,a);if(l<.45||l>3.2||c(t,a)||t>this.x0&&t<this.x1&&a>this.z0&&a<this.z1&&this.habitatCached(t,a,o).f>.1)continue;let f=R(.02,.38,i.fbm(t/18-31.7,a/18+12.9,3)+.25*r.fbm(t/6+5.5,a/6-1.1,2));if(e()>f*.9)continue;let m=e();if(m<.22){if(this.place(`shoreRock`,t,a,e,{layer:0,allow:.3,onGround:!0})){s(`shoreRock`);for(let n=0;n<1+Math.floor(e()*3);n++)p(t,a,.8,2.8,`bayBoulder`,0,.4);e()<.6&&p(t,a,.6,3,`rubble`,2,.5),l>1.2&&e()<.5&&p(t,a,0,1.6,e()<.5?`urchin`:`knobby`,1,.3)}}else if(m<.45)for(let n=0;n<2+Math.floor(e()*3);n++)p(t,a,0,2.2,`bayBoulder`,0,.4);else if(m<.65){for(let n=0;n<2+Math.floor(e()*3);n++)p(t,a,0,2.5,`rubble`,2,.5);e()<.5&&p(t,a,0,2,e()<.5?`conch`:`starfish`,2,.3)}else if(m<.78)p(t,a,0,1,e()<.4?`conch`:e()<.5?`starfish`:`urchin`,2,.3);else if(m<.9){if(l>1.1)for(let n=0;n<1+Math.floor(e()*2);n++)p(t,a,0,1.4,[`brain`,`starlet`,`knobby`,`knobby`][Math.floor(e()*4)],1,.3);l>1.5&&e()<.4&&p(t,a,.5,2,e()<.6?`tube`:`rope`,1,.3)}else if(l>2.4){for(let n=0;n<3+Math.floor(e()*3);n++)p(t,a,0,1.8,`meadow`,3,.45);e()<.5&&p(t,a,.5,2,`halimeda`,2,.3)}else p(t,a,0,1.2,e()<.5?`halimeda`:`penicillus`,2,.3)}for(let t=0,n=Math.floor(u*d/4);t<n;t++){let t=ia.x0+e()*u,n=ia.z0+e()*d,r=l(t,n);if(r<=0||e()>Math.sqrt(r)*.22)continue;let i=e(),a=i<.3?`starfish`:i<.5?`cucumber`:i<.62?`conch`:i<.8?`urchin`:`rubble`;this.place(a,t,n,e,{layer:2,allow:.3,onGround:a!==`urchin`})&&s(`bay_`+a)}}placeMeadows(e,t){let n=this.terrain;if(!n.seagrass)return;let r=n.res,i=(e,t)=>{let i=Math.floor(e-n.origin),a=Math.floor(t-n.origin);return i<0||a<0||i>=r||a>=r?0:n.seagrass[a*r+i]/255},a=this._hab||={},o=1.5,s=0,c=0;for(let t=-40;t<210;t+=o)for(let r=-210;r<130;r+=o){let l=r+(e()-.5)*o,u=t+(e()-.5)*o,d=e(),f=e(),p=-n.heightAt(l,u);if(p<2||p>11)continue;let m=R(.2,.65,i(l,u))*R(2,2.8,p)*(1-R(9,11,p)),h=R(.02,.3,this.noise.fbm(l/24+5.3,u/24-9.1,3))*R(3,3.8,p)*(1-R(7,9,p)),g=Math.abs(l-z.pier.x)<4&&u<z.pier.zEnd+3?0:1;if(!(d>Math.max(m,h*.9)*g*(.75+.25*this.noise2.noise(l/5,u/5)))&&!(this.structureAt(l,u)>n.heightAt(l,u)+.05)&&!(l>this.x0&&l<this.x1&&u>this.z0&&u<this.z1&&this.habitat(l,u,a).f>.15)&&(this.place(`meadow`,l,u,e,{layer:3,allow:.45,onGround:!0})&&s++,f<.07)){let t=f<.045?`halimeda`:f<.062?`penicillus`:`urchin`;this.place(t,l+(e()-.5)*1.2,u+(e()-.5)*1.2,e,{layer:2,allow:.3,onGround:!0})&&c++}}t.meadow=s,t.meadowAlgae=c}placeAnchors(){let e=e=>Math.hypot(e.x-this.center.x,e.z-this.center.z)<42,t=this.items.hard.filter(t=>oa[t.name].solid&&t.radius>1&&e(t)).sort((e,t)=>t.radius-e.radius);for(let e of t){if(this.anchors.length>=40)break;this.anchors.some(t=>Math.hypot(t[0]-e.x,t[1]-e.z)<7)||this.anchors.push([e.x,e.z])}}buildBatches(){this.batches={};for(let e of[`hard`,`soft`]){let t=this.items[e],n=new un(`Reef.`+e,this.kinds[e],{maxInstances:t.length+1,fade:!0}),r=n.data;t.forEach((t,n)=>{let i=oa[t.name];t.range=this.drawDistance(t,e),r[n*16]=t.x,r[n*16+1]=t.y,r[n*16+2]=t.z,r[n*16+3]=t.s,r[n*16+4]=t.q.x,r[n*16+5]=t.q.y,r[n*16+6]=t.q.z,r[n*16+7]=t.q.w,r[n*16+8]=t.c1,r[n*16+9]=t.c2,r[n*16+10]=t.range+t.seed,r[n*16+11]=i.surface,r[n*16+12]=t.sx,r[n*16+13]=t.sy,r[n*16+14]=t.sz,r[n*16+15]=t.flex}),n.upload(),this.batches[e]=n}this.noise3D=oi(),this.viewBlock=mi(),this.view=this.viewBlock.fields,this.view.position.value=new n,this.view.range.value=Zi;let e=bi({hard:this.batches.hard,soft:this.batches.soft,getOcean:()=>this.fft,noise:this.noise3D,view:this.viewBlock});this.materials=e;let t=bi({hard:this.batches.hard,soft:this.batches.soft,getOcean:()=>this.fft,noise:this.noise3D,view:this.viewBlock,fade:!0});this.fadeMaterials=t,this.group.add(this.batches.hard.createFadeMesh(t.hard),this.batches.soft.createFadeMesh(t.soft));let r=this.batches.hard.createMesh(e.hard,{castShadow:!0}),i=this.batches.soft.createMesh(e.soft);for(let e of[r,i]){let t=e.onBeforeRender;e.onBeforeRender=(e,n,r,i,a,o)=>{r.isPerspectiveCamera&&(this.camera=r,this.cull(r)),t(e,n,r,i,a,o)},this.group.add(e)}}drawDistance(e,t){let n=oa[e.name].lod,r=t===`soft`?ea:oa[e.name].far||e.radius>.5?$i:Zi;return Math.floor(Math.min(r,n[n.length-1]*e.radius))}buildCells(){this.cells=new Map;for(let e of[`hard`,`soft`]){let t=this.items[e],n=t.length,r=this[e+`Cull`]={x:new Float32Array(n),y:new Float32Array(n),z:new Float32Array(n),r:new Float32Array(n),d0:new Float32Array(n),d1:new Float32Array(n),d2:new Float32Array(n),dmax:new Float32Array(n),kind0:new Uint16Array(n),lods:new Uint8Array(n),proxy:new Int16Array(n)};t.forEach((t,n)=>{let i=oa[t.name],a=t.radius;r.x[n]=t.x,r.y[n]=t.y+a*.4,r.z[n]=t.z,r.r[n]=a;let o=i.lod.length===4;r.d0[n]=i.lod[0]*a,r.d1[n]=i.lod[1]*a,r.d2[n]=o?i.lod[2]*a:1/0,r.dmax[n]=t.range,r.kind0[n]=t.model.kind0,r.lods[n]=t.model.lods,r.proxy[n]=t.model.proxy;let s=Math.floor(t.x/Xi)*4096+Math.floor(t.z/Xi),c=this.cells.get(s);c||this.cells.set(s,c={x:(Math.floor(t.x/Xi)+.5)*Xi,z:(Math.floor(t.z/Xi)+.5)*Xi,ymin:1/0,ymax:-1/0,r:0,hard:[],soft:[]}),c[e].push(n),c.ymin=Math.min(c.ymin,t.y),c.ymax=Math.max(c.ymax,t.y+a*2),c.r=Math.max(c.r,a)})}this.cellList=[...this.cells.values()],this.extent={x0:1/0,x1:-1/0,z0:1/0,z1:-1/0};for(let e of this.cellList)e.hard=Uint32Array.from(e.hard),e.soft=Uint32Array.from(e.soft),this.extent.x0=Math.min(this.extent.x0,e.x-Xi),this.extent.x1=Math.max(this.extent.x1,e.x+Xi),this.extent.z0=Math.min(this.extent.z0,e.z-Xi),this.extent.z1=Math.max(this.extent.z1,e.z+Xi)}setQualityLevel(e){this.qualityLevel=e,this._cullFrame=-1,this._cullPos.set(1/0,1/0,1/0);for(let t of[`hard`,`soft`]){let n=this[t+`Cull`];n.qualityRanks||=he(n.x.length,t===`hard`?17:31),n.qualityLimit=Math.ceil(n.x.length*e);let r=this.batches[t];r.begin(),r.commit(),r.mesh.visible=r.fadeMesh.visible=!1}}update(e,t){if(this.frame++,this.fish.update(e,t??null),!t)return;let n=t,r=this.extent,i=Math.max(r.x0-n.x,0,n.x-r.x1),a=Math.max(r.z0-n.z,0,n.z-r.z1),o=Math.hypot(i,a)<120&&n.y<100,s=this.batches.hard,c=this.batches.soft,l=this.fish,u=this.camera;this.qualityLevel===0?s.mesh.visible=c.mesh.visible=s.fadeMesh.visible=c.fadeMesh.visible=!1:o&&u?(this.cull(u),s.mesh.visible=s.visibleInstances>0,c.mesh.visible=c.visibleInstances>0,s.mesh.castShadow=s.shadowOffsets.length>0):(s.mesh.visible=o,c.mesh.visible=o,o||(s.fadeMesh.visible=c.fadeMesh.visible=!1)),u&&l.mesh.visible&&(l.cull(u),l.mesh.visible=l.batch.visibleInstances>0)}cull(e){if(this.qualityLevel===0||this._cullFrame===this.frame)return;this._cullFrame=this.frame;let t=e.position;if(t.distanceToSquared(this._cullPos)<.0025&&e.quaternion.angleTo(this._cullQuat)<.002)return;this._cullPos.copy(t),this._cullQuat.copy(e.quaternion),e.updateMatrixWorld(),ma.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),ha.setFromProjectionMatrix(ma,e.coordinateSystem,e.reversedDepth);let n=t.y<.3?Zi:Math.min($i,Qi+Math.max(0,t.y)*1.4);this.view.position.value.copy(t),this.view.range.value=n;let r=n+Xi,i=t.x,a=t.y,o=t.z,s=this.batches.hard,c=this.batches.soft;s.begin(),c.begin();for(let e of this.cellList){let t=e.x-i,l=e.z-o;if(t*t+l*l>r*r)continue;let u=e.r+1;ga.min.set(e.x-Xi*.5-u,e.ymin-.5,e.z-Xi*.5-u),ga.max.set(e.x+Xi*.5+u,e.ymax+.5,e.z+Xi*.5+u);let d=ha.intersectsBox(ga),f=t*t+l*l<900;(d||f)&&(this.cullList(e.hard,this.hardCull,s,i,a,o,n,d),d&&this.cullList(e.soft,this.softCull,c,i,a,o,n,!0))}s.commit(),c.commit()}cullList(e,t,n,r,i,a,o,s){for(let c=0;c<e.length;c++){let l=e[c];if(this.qualityLevel<1&&t.qualityRanks[l]>=t.qualityLimit)continue;let u=t.x[l]-r,d=t.y[l]-i,f=t.z[l]-a,p=Math.sqrt(u*u+d*d+f*f);t.proxy[l]>=0&&p<ta+t.r[l]&&t.r[l]>na&&n.add(t.proxy[l],l);let m=Math.min(t.dmax[l],o);if(!s||p>m)continue;let h=Math.min(p<t.d0[l]?0:p<t.d1[l]?1:p<t.d2[l]?2:3,t.lods[l]-1),g=t.kind0[l]+h;if(p>m*.9){n.addFade(g,l,1-nn(p,m*.9,m),!1);continue}let _=h===0?t.d0[l]:h===1?t.d1[l]:t.d2[l];if(h<t.lods[l]-1&&p>_*.88){let e=nn(p,_*.88,_);n.addFade(g,l,e,!0),n.addFade(g+1,l,e,!1)}else n.add(g,l)}}floorHeightAt(e,t){return this.groundAt(e,t)}get stats(){let e=this.batches;return{instances:{hard:this.items.hard.length,soft:this.items.soft.length},visible:{hard:e.hard.visibleInstances,soft:e.soft.visibleInstances},triangles:e.hard.visibleTriangles+e.soft.visibleTriangles,shadowTriangles:e.hard.shadowTriangles,drawCalls:+!!e.hard.mesh.visible+ +!!e.soft.mesh.visible+ +!!this.fish.mesh.visible,subDraws:e.hard.mainOffsets.length+e.soft.mainOffsets.length,shadowSubDraws:e.hard.shadowOffsets.length,kinds:{hard:this.kinds.hard.length,soft:this.kinds.soft.length},counts:this.counts,timings:this.timings,fish:this.fish.fishCount}}dispose(){for(let e of Object.values(this.batches))e.dispose();for(let e of[...Object.values(this.materials),...Object.values(this.fadeMaterials)])e.dispose();this.noise3D.destroy(),this.fish.dispose(),this.group.removeFromParent()}},va=new g({name:`boatMaterials`,deps:[Re,le],code:`
fn boatIsPattern( auxZ: f32, id: f32 ) -> f32 { return step( abs( auxZ - id ), 0.5 ); }
fn boatHash21( p: vec2f ) -> f32 { return fract( sin( dot( p, vec2f( 127.1, 311.7 ) ) ) * 43758.5453 ); }
// a < b always (WGSL requires ordered edges)
fn boatLstep( a: f32, b: f32, x: f32 ) -> f32 { return smoothstep( a, b, x ); }
fn boatInvstep( a: f32, b: f32, x: f32 ) -> f32 { return 1.0 - smoothstep( a, b, x ); }

// Molded non-skid: jittered pebbles on a ~1.8 cm lattice (uv in meters), faded when sub-pixel.
fn boatNonSkidHeight( uv: vec2f ) -> f32 {
	let q = uv * 55.0;
	let c = floor( q );
	let f = fract( q ) - 0.5;
	let j = ( vec2f( boatHash21( c ), boatHash21( c + 17.31 ) ) - 0.5 ) * 0.3;
	let d = length( f - j );
	let pebble = boatInvstep( 0.16, 0.36, d );
	let fade = boatInvstep( 0.3, 0.8, fwidth( q.x ) );
	return pebble * fade;
}
`}),ya=`
	o.vAux = v.aux;
	o.vLocal = v.position;
`,ba=()=>({vertexColors:!0,modules:[va],attributes:{aux:`vec4f`},varyings:{vAux:`vec4f`,vLocal:`vec3f`},vertex:ya});function xa(e){let t=e=>(e/=255,e<=.04045?e/12.92:((e+.055)/1.055)**2.4);return`vec3f( ${Sa(t(e>>16&255))}, ${Sa(t(e>>8&255))}, ${Sa(t(e&255))} )`}function Sa(e){let t=String(+e.toPrecision(9));return t.includes(`.`)||t.includes(`e`)?t:t+`.0`}var Ca=class{constructor(e){this.hull=this.createHull(e),this.gelcoat=this.createGelcoat(),this.wood=this.createWood(),this.fittings=this.createFittings(),this.glass=this.createGlass(),this.glow=this.createGlow(),this.trap=this.createTrap(),this.navOn=this.glow.uniforms.navOn,this.flagPivot=this.fittings.uniforms.flagPivot,this.flagDir=this.fittings.uniforms.flagDir,this.flagWind=this.fittings.uniforms.flagWind}createHull(e){let t=T({roughness:.25,metalness:0,clearcoat:1,clearcoatRoughness:.1,...ba()});return t.name=`boatHull`,t.surface=`
	let p = in.vs.vLocal;
	let tS = sat( ( p.z - ${Sa(e.zAft)} ) / ${Sa(e.length)} );
	let sheer = pow( tS, 2.2 ) * 0.62 + 0.98 + pow( max( 1.0 - tS / 0.2, 0.0 ), 2.0 ) * 0.04;

	// boot top sweeps up slightly toward the bow
	let boot = p.y - boatLstep( 0.8, 4.3, p.z ) * 0.06;
	let aaB = fwidth( boot ) + 1e-4;
	let aboveBottom = boatLstep( -aaB, aaB, boot - 0.05 );
	let aboveStripe = boatLstep( -aaB, aaB, boot - 0.15 );

	let below = sheer - p.y;
	let aaS = fwidth( below ) + 1e-4;
	let cove = boatLstep( -aaS, aaS, below - 0.1 ) * boatInvstep( -aaS, aaS, below - 0.122 );

	let n1 = mx_fractal_noise_float3( p * vec3f( 0.9, 2.4, 0.9 ), 3, 2.0, 0.5 );
	let streakN = mx_noise_float3( vec3f( p.z * 7.0, p.y * 0.45, p.x * 7.0 ) );
	let scuffN = mx_noise_float3( vec3f( p.z * 2.2, p.y * 34.0, p.x * 2.2 ) );

	var c = mix( ${xa(8002837)}, ${xa(989744)}, aboveBottom );
	c = mix( c, ${xa(15921126)}, aboveStripe );
	c = mix( c, ${xa(989744)}, cove );

	// waterline scum on the white, algae on the antifouling just below the boot top
	let scum = boatInvstep( 0.16, n1 * 0.09 + 0.42, boot ) * aboveStripe * sat( n1 * 0.6 + 0.7 );
	c = mix( c, ${xa(9141079)}, scum * 0.32 );
	let algae = boatLstep( -0.35, 0.03, boot ) * ( 1.0 - aboveBottom ) * sat( n1 + 0.45 );
	c = mix( c, ${xa(2898463)}, algae * 0.45 );

	// faint vertical weathering streaks under the gunwale
	let streak = boatLstep( 0.3, 0.75, streakN ) * boatLstep( 0.05, 0.2, below ) * boatInvstep( 0.4, 0.95, below ) * aboveStripe;
	c = mix( c, ${xa(10655097)}, streak * 0.2 );

	// scuffs where traps come over the rail (starboard, aft of the wheelhouse)
	let side = boatLstep( -0.2, 0.2, -p.x ) * boatInvstep( -0.6, 0.2, p.z ) * boatLstep( -3.7, -2.8, p.z );
	let scuff = boatLstep( 0.45, 0.8, scuffN ) * boatLstep( 0.13, 0.18, below ) * boatInvstep( 0.45, 0.7, below ) * ( side * 0.8 + 0.2 );
	c = mix( c, ${xa(6250073)}, scuff * 0.55 );

	s.albedo = c;
	s.roughness = mix( mix( 0.75, 0.35, aboveBottom ), 0.2, aboveStripe ) + scum * 0.25 + scuff * 0.3;
	s.clearcoat = aboveBottom * ( 1.0 - scum * 0.5 ) * ( 1.0 - scuff * 0.6 );
	s.clearcoatRoughness = 0.08 + scum * 0.3;
`,t}createGelcoat(){let e=E({roughness:.35,metalness:0,...ba()});return e.name=`boatGelcoat`,e.surface=`
	let aux = in.vs.vAux;
	let vColor = in.color.rgb;
	let grip = boatIsPattern( aux.z, 1.0 );
	let h = boatNonSkidHeight( in.uv ) * grip;
	let p = in.vs.vLocal;
	let dirtN = mx_noise_float3( p * 1.7 );
	// worked deck: trodden grime, blotchy oil / bait / water stains
	let blot = boatLstep( 0.2, 0.55, mx_fractal_noise_float3( p * vec3f( 2.2, 2.2, 2.2 ) + vec3f( 7.7, 0.0, 3.1 ), 3, 2.0, 0.5 ) );
	let dirt = ( sat( dirtN * 0.5 + 0.35 ) * 0.22 + blot * 0.2 ) * grip;
	// a little grime where walls meet the sole
	let corner = boatInvstep( 0.35, 0.5, p.y ) * 0.08 * ( 1.0 - grip );

	// old gelcoat everywhere (not the non-skid): chalky yellowed patches, grime settling low down and
	// faint rust / dirt streaks running down from fittings
	let plainK = 1.0 - grip;
	let wear = mx_fractal_noise_float3( p * vec3f( 1.1, 1.6, 1.1 ) + vec3f( 5.3, 1.1, 2.9 ), 3, 2.0, 0.5 );
	let streakN = mx_noise_float3( vec3f( p.x * 14.0, p.y * 1.2, p.z * 14.0 ) );
	let streaks = boatLstep( 0.3, 0.7, streakN ) * 0.7 * plainK;
	// (deck / sole at 0.35 m)
	let lowDirt = boatInvstep( 0.38, 1.15, p.y ) * sat( wear + 0.7 ) * 0.34 * plainK;
	var base = vColor * ( 1.0 - h * 0.07 ) * ( 1.0 - dirt - corner * 1.8 - lowDirt );
	base = mix( base, base * vec3f( 0.94, 0.89, 0.78 ), boatLstep( -0.15, 0.35, wear ) * 0.45 * plainK );
	base = mix( base, base * vec3f( 0.78, 0.7, 0.6 ), streaks * 0.25 );
	var rough = mix( aux.x, 0.72, grip ) + h * 0.1 + ( sat( wear + 0.3 ) * 0.18 + lowDirt * 0.5 ) * plainK;
	var metal = aux.y;
	var groove = 0.0;
	var interiorAO = 1.0;
	var fill = vec3f( 0.0 );
	// wheelhouse interior (2) and headliner (3) only: the rest of the gelcoat skips the noise
	if ( aux.z > 1.5 ) {
		let mottle = mx_fractal_noise_float3( p * vec3f( 2.3, 3.1, 2.3 ), 3, 2.0, 0.5 );

		// ---- painted panels with screwed seams, grime and water stains
		let panel = boatIsPattern( aux.z, 2.0 );
		// seams: vertical every 0.61 m along the boat, horizontal at the rail height and below the windows
		let sz = ( p.z + 0.13 ) / 0.61;
		let seamDz = 0.305 - abs( fract( sz ) - 0.5 ) * 0.61; // distance to the nearest vertical seam (m)
		let dyA = abs( p.y - 1.17 );
		let dyB = abs( p.y - 1.52 );
		let seamD = min( seamDz, min( dyA, dyB ) );
		let aa = fwidth( seamD ) + 1e-4;
		let seam = boatInvstep( 0.0015, 0.0015 + aa * 1.5, seamD ) * panel;
		// pan-head screws every 0.15 m along the seams, 12 mm off the joint
		let screwV = length( vec2f( ( fract( p.y / 0.15 ) - 0.5 ) * 0.15, seamDz - 0.012 ) );
		let screwH = length( vec2f( ( fract( p.z / 0.15 ) - 0.5 ) * 0.15, min( dyA, dyB ) - 0.012 ) );
		let screwD = min( screwV, screwH );
		let screw = boatInvstep( 0.0035, 0.0035 + fwidth( screwD ) + 1e-4, screwD ) * panel;
		// grime: darker toward the sole and along the seams (hands, boots, salt), mottled
		// (the panels start at the rail, 1.17 m: grime collects on their lower part and the bottom seam)
		let low = boatInvstep( 1.15, 1.6, p.y );
		let grime = sat( low * ( 0.35 + mottle * 0.3 ) + boatInvstep( 0.0, 0.035, seamD ) * 0.18 + mottle * 0.08 ) * panel;
		// years of sun and diesel: blotchy yellowing over whole panels
		let age = mx_fractal_noise_float3( p * vec3f( 0.9, 1.4, 0.9 ) + vec3f( 3.1, 0.0, 1.7 ), 3, 2.0, 0.5 );
		// hand smudges at grab height, boot scuffs (streaks along the boat) just above the sole
		let smudge = boatLstep( 0.25, 0.6, mx_noise_float3( p * vec3f( 7.0, 5.0, 7.0 ) + vec3f( 9.0 ) ) ) * boatLstep( 1.05, 1.25, p.y ) * boatInvstep( 1.5, 1.75, p.y );
		let scuffN = mx_noise_float3( vec3f( p.z * 3.0, p.y * 60.0, p.x * 3.0 ) );
		let scuff = boatLstep( 0.45, 0.7, scuffN ) * boatInvstep( 0.9, 1.15, p.y ) * boatLstep( 0.2, 0.35, mottle + 0.5 );
		// water stains running down from the window sills, brown at their ends
		let run = mx_noise_float3( vec3f( p.z * 9.0, p.y * 0.8, p.x * 9.0 ) );
		let stain = boatLstep( 0.25, 0.7, run ) * boatLstep( 0.9, 1.35, p.y ) * boatInvstep( 1.3, 1.56, p.y ) * panel;
		// warm, yellowed off-white paint
		var pc = vColor * vec3f( 0.97, 0.94, 0.87 );
		pc = mix( pc, pc * vec3f( 0.9, 0.82, 0.64 ), boatLstep( -0.1, 0.35, age ) * 0.7 );
		pc = pc * ( 1.0 - grime * 0.6 ) * ( 1.0 - smudge * 0.12 * panel ) * ( 1.0 - scuff * 0.25 * panel );
		pc = mix( pc, pc * vec3f( 0.66, 0.54, 0.4 ), stain * 0.6 );
		pc = mix( pc, pc * 0.3, seam );
		// pan-head screws, some rusted with a short streak below
		let rustK = step( 0.55, boatHash21( floor( vec2f( p.y / 0.15, p.z / 0.15 ) + 0.5 ) ) );
		let screwCol = mix( vec3f( 0.55, 0.55, 0.53 ), vec3f( 0.32, 0.17, 0.08 ), rustK );
		pc = mix( pc, screwCol, screw );

		// ---- headliner: off-white perforated vinyl, quilted between the battens
		let head = boatIsPattern( aux.z, 3.0 );
		let hq = p.xz / 0.006;
		let perf = boatInvstep( 0.12, 0.3, length( fract( hq ) - 0.5 ) ) * boatInvstep( 0.3, 0.7, fwidth( hq.x ) );
		let quilt = sin( ( p.z + 0.1 ) / 0.5 * 3.14159 ) * 0.5 + 0.5;
		let hc = vec3f( 0.72, 0.69, 0.63 ) * ( 1.0 - perf * 0.18 ) * ( quilt * 0.12 + 0.88 ) * ( mottle * 0.08 + 0.96 );

		base = mix( mix( base, pc, panel ), hc, head );
		rough = mix( mix( rough, 0.5 + grime * 0.3 + age * 0.08 - smudge * 0.12 - screw * 0.2, panel ), 0.8, head );
		metal = metal + screw * 0.8 * ( 1.0 - rustK );
		// inside an enclosed wheelhouse most of the sky and sea is hidden: dim the ambient (the sun
		// through the windows is direct light and unaffected). Darker into the corners and overhead.
		interiorAO = mix( mix( 1.0, 0.55 - low * 0.12 - boatLstep( 1.9, 2.3, p.y ) * 0.1, panel ), 0.12, head );
		// the headliner faces the sole, not the sea: its light is the sun and sky bounced off the
		// deck, the sole and the walls (warm, neutral) - a small fill in place of the hidden IBL
		let skyL = dot( frame.skyIrradiance, vec3f( 0.3, 0.5, 0.2 ) );
		let sunL = dot( frame.sunColor, vec3f( 0.3, 0.5, 0.2 ) ) * sat( frame.sunDir.y );
		fill = hc * vec3f( 1.0, 0.95, 0.86 ) * ( skyL * 0.5 + sunL * 0.004 ) * head;
		groove = seam * -0.0006 + screw * 0.0004 + ( perf * -0.0002 + quilt * 0.002 ) * head;
	}
	s.albedo = base;
	s.roughness = rough;
	s.metalness = metal;
	s.ao = interiorAO;
	s.emissive = fill;
	s.normal = boatBumpNormal( in.P, in.N, h * 0.0008 + groove );
`,e}createWood(){let e=E({roughness:.35,metalness:0,...ba()});return e.name=`boatWood`,e.surface=`
	let aux = in.vs.vAux;
	let w = in.uv;
	let g1 = mx_noise_float3( vec3f( w.x * 0.8, w.y * 30.0, 0.37 ) );
	let g2 = mx_noise_float3( vec3f( w.x * 10.0, w.y * 170.0, 5.1 ) );
	let rings = sin( w.y * 150.0 + g1 * 5.0 + w.x * 0.6 ) * 0.5 + 0.5;
	let grain = sat( rings * 0.45 + g2 * 0.22 + g1 * 0.22 + 0.28 );
	let plain = boatIsPattern( aux.z, 1.0 );
	var wood = mix( ${xa(4858639)}, ${xa(10246955)}, grain );
	var rough = aux.x + g2 * 0.04 * ( 1.0 - plain );

	// teak and holly: per-plank tone, holly strip between planks, butt joints, worn traffic lane
	let sole = boatIsPattern( aux.z, 2.0 );
	let pv = w.y / 0.1;
	let plankI = floor( pv );
	let pf = abs( fract( pv ) - 0.5 );
	let aaP = fwidth( pv ) + 1e-4;
	let holly = boatLstep( 0.5 - 0.06 - aaP, 0.5 - 0.06, pf );
	let caulk = boatLstep( 0.5 - 0.012 - aaP, 0.5 - 0.012, pf );
	let butt = boatInvstep( 0.0, 0.004 + fwidth( w.x ), abs( fract( w.x / 1.8 + boatHash21( vec2f( plankI, 3.0 ) ) ) - 0.5 ) * 1.8 );
	let tone = boatHash21( vec2f( plankI, 7.0 ) ) * 0.25 + 0.85;
	let lane = mx_noise_float3( vec3f( w.x * 1.3, w.y * 1.3, 2.0 ) ) * 0.5 + 0.5;
	var teak = mix( ${xa(7028509)}, ${xa(11039813)}, grain ) * tone;
	teak = mix( teak, teak * vec3f( 1.12, 1.08, 1.02 ), lane * 0.5 ); // worn, sun-bleached
	teak = mix( teak, ${xa(14272934)}, holly * ( 1.0 - caulk ) );
	teak = mix( teak, ${xa(1840142)}, max( caulk, butt ) );
	wood = mix( wood, teak, sole );
	rough = mix( rough, 0.45 + lane * 0.25, sole );

	s.albedo = mix( wood, vec3f( 1.0 ), plain ) * in.color.rgb;
	s.roughness = rough;
	s.metalness = aux.y;
	s.normal = boatBumpNormal( in.P, in.N, ( g2 * 0.0002 - max( caulk, butt ) * 0.0012 ) * sole );
	// the sole is inside the wheelhouse: most of the sky is hidden (ambient only)
	s.ao = mix( 1.0, 0.6, sole );
`,e}createFittings(){let e=E({roughness:.5,metalness:0,...ba(),uniforms:{flagPivot:[`vec3f`,new n],flagDir:[`vec3f`,new n(0,0,-1)],flagWind:[`f32`,.5]}});return e.name=`boatFittings`,e.surface=`
	let aux = in.vs.vAux;
	let vColor = in.color.rgb;
	let u = in.uv;

	let strand = sin( ( u.x / 0.07 + u.y ) * ( TWO_PI * 3.0 ) );
	let ropeShade = boatLstep( -0.7, 0.7, strand ) * 0.4 + 0.6;

	let stripeIdx = floor( sat( u.y ) * 12.999 );
	let red = 1.0 - ( stripeIdx - 2.0 * floor( stripeIdx / 2.0 ) );
	let canton = step( u.x, 0.4 ) * step( ${Sa(6/13)}, u.y );
	let sx = fract( u.x / 0.4 * 6.0 ) - 0.5;
	let sy = fract( ( u.y - ${Sa(6/13)} ) / ${Sa(7/13)} * 5.0 ) - 0.5;
	let star = boatInvstep( 0.16, 0.24, length( vec2f( sx, sy ) ) );
	let stripes = mix( ${xa(16052714)}, ${xa(11736874)}, red );
	let flag = mix( stripes, mix( ${xa(1845852)}, ${xa(16052714)}, star ), canton );

	var c = mix( vColor, vColor * ropeShade, boatIsPattern( aux.z, 1.0 ) );
	c = mix( c, flag, boatIsPattern( aux.z, 2.0 ) );
	var rough = aux.x;
	var bump = 0.0;
	// interior props (patterns 4..9) only: ordinary fittings skip the noise
	if ( aux.z > 3.5 ) {
		let p = in.vs.vLocal;

		// wrinkle finish: fine crinkle bump, pale scuffs on the edges people touch
		let wrinkle = boatIsPattern( aux.z, 4.0 );
		let wn = mx_noise_float3( p * 380.0 );
		let scuffN = mx_fractal_noise_float3( p * vec3f( 6.0, 14.0, 6.0 ), 3, 2.0, 0.5 );
		let scuff = boatLstep( 0.35, 0.6, scuffN ) * wrinkle;
		c = mix( c, mix( c * ( 1.0 + wn * 0.08 ), c + vec3f( 0.05 ), scuff * 0.6 ), wrinkle );
		rough = mix( rough, rough + wn * 0.08 - scuff * 0.15, wrinkle );
		bump += wn * 0.00015 * wrinkle;

		// printed page: margins, header block, rows of type, a table grid, coffee ring
		let page = boatIsPattern( aux.z, 5.0 );
		let row = fract( u.y * 34.0 );
		let word = boatHash21( floor( vec2f( u.x * 16.0, u.y * 34.0 ) ) );
		let inText = step( 0.08, u.x ) * step( u.x, 0.92 ) * step( 0.06, u.y ) * step( u.y, 0.82 );
		let typeK = boatLstep( 0.35, 0.45, row ) * boatInvstep( 0.7, 0.8, row ) * step( 0.18, word ) * inText;
		let header = step( 0.86, u.y ) * step( u.y, 0.93 ) * step( 0.08, u.x ) * step( u.x, 0.6 );
		let grid = boatLstep( 0.478, 0.49, abs( fract( u.x * 4.0 ) - 0.5 ) ) * inText;
		let ring = boatInvstep( 0.0, 0.02, abs( length( u - vec2f( 0.7, 0.3 ) ) - 0.16 ) ) * 0.5;
		let paper = mix( vec3f( 0.86, 0.84, 0.78 ), vec3f( 0.1, 0.1, 0.12 ), max( max( typeK * 0.7, header * 0.85 ), grid * 0.5 ) );
		c = mix( c, mix( paper, vec3f( 0.45, 0.3, 0.18 ), ring ), page );
		rough = mix( rough, 0.9, page );

		// folded paper chart: sea and land tints, depth contours, fold creases, pencilled course
		let chartK = boatIsPattern( aux.z, 6.0 );
		let cn = mx_fractal_noise_float3( vec3f( u * 3.0 + vec2f( 1.3, 4.2 ), 0.7 ), 4, 2.0, 0.5 );
		let shore = cn + ( u.x - 0.55 ) * 1.4;
		let landK = boatLstep( 0.0, 0.02, shore );
		let contour = boatInvstep( 0.03, 0.06, abs( fract( shore * 7.0 ) - 0.5 ) ) * ( 1.0 - landK );
		let crease = boatInvstep( 0.0, 0.006, abs( u.x - 0.5 ) ) + boatInvstep( 0.0, 0.006, abs( u.y - 0.5 ) );
		let course = boatInvstep( 0.001, 0.004, abs( u.y - 0.2 - u.x * 0.45 ) ) * step( 0.1, u.x ) * step( u.x, 0.7 );
		var chart = mix( vec3f( 0.72, 0.8, 0.84 ), vec3f( 0.86, 0.78, 0.58 ), landK );
		chart = chart * ( 1.0 - contour * 0.25 ) * ( 1.0 - crease * 0.2 );
		chart = mix( chart, vec3f( 0.2, 0.2, 0.22 ), course * 0.8 );
		c = mix( c, chart, chartK );
		rough = mix( rough, 0.85, chartK );

		// photo print: white border, a sunlit boat / sea / sky picture
		let photo = boatIsPattern( aux.z, 7.0 );
		let inPic = step( 0.07, u.x ) * step( u.x, 0.93 ) * step( 0.07, u.y ) * step( u.y, 0.8 );
		let horizon = 0.45 + sin( u.x * 3.0 + aux.w * 6.0 ) * 0.03;
		var pic = mix( vec3f( 0.08, 0.22, 0.35 ), vec3f( 0.45, 0.65, 0.85 ), step( horizon, u.y ) );
		pic = mix( pic, vec3f( 0.85, 0.25, 0.12 ), boatInvstep( 0.06, 0.08, length( ( u - vec2f( 0.4 + aux.w * 0.2, horizon ) ) * vec2f( 1.0, 3.0 ) ) ) );
		pic = mix( vec3f( 0.92, 0.9, 0.86 ), pic * ( mx_noise_float3( vec3f( u * 20.0, aux.w * 9.0 ) ) * 0.15 + 0.9 ), inPic );
		c = mix( c, pic, photo );
		rough = mix( rough, 0.3, photo );

		// label tape: white with blocks of black type
		let label = boatIsPattern( aux.z, 8.0 );
		let lt = step( 0.3, fract( u.x * 7.0 ) ) * step( 0.3, boatHash21( floor( vec2f( u.x * 28.0, 3.0 ) ) ) ) * step( 0.25, u.y ) * step( u.y, 0.75 );
		c = mix( c, mix( vec3f( 0.85, 0.85, 0.82 ), vec3f( 0.05 ), lt ), label );

		// heavy fabric: soft folds, stitched seams, grime
		let fabric = boatIsPattern( aux.z, 9.0 );
		let fold = mx_fractal_noise_float3( p * vec3f( 9.0, 4.0, 9.0 ), 2, 2.0, 0.5 );
		// stitched seams every 0.31 m (dashed)
		let stitch = boatLstep( 0.486, 0.494, abs( fract( p.y / 0.31 ) - 0.5 ) ) * step( 0.5, fract( p.x * 160.0 + p.z * 160.0 ) );
		c = mix( c, c * ( fold * 0.35 + 0.8 ) * ( 1.0 - stitch * 0.3 ), fabric );
		rough = mix( rough, 0.65 + fold * 0.1, fabric );
		bump += fold * 0.004 * fabric;
	}

	s.albedo = c;
	s.roughness = rough;
	s.metalness = aux.y;
	s.normal = boatBumpNormal( in.P, in.N, bump );
	// patterns 4..9 are wheelhouse interior pieces: most of the sky is hidden (ambient only)
	s.ao = select( 1.0, 0.6, aux.z > 3.5 );
`,e.vertex=ya+`
	let aux = v.aux;
	let p = v.position;
	let t = frame.time;
	let wA = aux.w * aux.w;
	let phase = p.x * 3.1 + p.z * 1.7;
	let gust = frame.windSpeed * 0.06 + 0.5;
	let sway = vec3f( sin( t * 1.9 + phase ), 0.0, sin( t * 1.37 + phase * 1.3 ) * 0.6 ) * ( wA * 0.12 * gust );

	let rel = p - mat.flagPivot;
	let along = max( -rel.z, 0.0 );
	let fu = aux.w; // 0 at the hoist .. 1 at the fly
	let droop = ( 1.0 - mat.flagWind ) * 1.15 * ( fu * 0.5 + 0.5 );
	let lat = vec3f( mat.flagDir.z, 0.0, -mat.flagDir.x );
	let flutter = sin( fu * 9.0 - t * ( mat.flagWind * 9.0 + 4.0 ) + rel.y * 4.0 ) * fu * ( mat.flagWind * 0.05 + 0.015 );
	let flagPos = vec3f( mat.flagPivot.x, 0.0, mat.flagPivot.z )
		+ mat.flagDir * ( along * cos( droop ) )
		+ vec3f( 0.0, rel.y - along * sin( droop ), 0.0 )
		+ lat * flutter;

	v.position = mix( p + sway * boatIsPattern( aux.z, 3.0 ), flagPos, boatIsPattern( aux.z, 2.0 ) );
`,e}createGlass(){let e=T({color:11124420,roughness:.05,metalness:0,ior:1.5,transparent:!0,opacity:.25,side:2,depthWrite:!1,velocityWeight:0,...ba()});return e.name=`boatGlass`,e.surface=`
	let u = in.uv;
	let spots = boatLstep( 0.45, 0.85, mx_noise_float3( vec3f( u * 38.0, 3.3 ) ) );
	let haze = sat( mx_noise_float3( vec3f( u * 4.0, 9.1 ) ) * 0.5 + 0.5 );
	let edge = boatInvstep( 0.0, 0.18, u.y );
	let salt = sat( ( spots * 0.6 + haze * 0.25 ) * ( edge * 0.8 + 0.35 ) );
	s.albedo = mat.color; // no vertex colours on the glass (three: vertexColors off)
	s.alpha = 0.16 + salt * 0.22;
	s.roughness = 0.03 + salt * 0.35;
`,e.output=`
	r.velocity = vec4f( 0.0 );
`,e}createGlow(){let e=E({color:0,roughness:.3,metalness:0,...ba(),uniforms:{navOn:[`f32`,1]}});return e.name=`boatGlow`,e.surface=`
	let aux = in.vs.vAux;
	let vColor = in.color.rgb;
	let mode = aux.z;
	let t = frame.time;
	let night = frame.night;
	let u = in.uv;

	// radar: head-up PPI with a 24 rpm sweep
	let q = ( u - 0.5 ) * 2.0;
	let r = length( q );
	let ang = atan2( q.x, q.y );
	let da = fract( ( t * 2.513 - ang ) / TWO_PI );
	let trail = exp( da * -5.0 );
	let beam = boatInvstep( 0.0, 0.01, da );
	let ringD = abs( fract( r * 3.0 + 0.5 ) - 0.5 );
	let ring = boatInvstep( 0.012, 0.03, ringD );
	let landN = mx_fractal_noise_float3( vec3f( q * 2.3 + vec2f( 1.7, 0.4 ), 0.5 ), 3, 2.0, 0.5 );
	let land = boatLstep( 0.18, 0.4, landN + q.x * 0.35 ) * boatLstep( 0.3, 0.45, r );
	let cell = floor( q * 7.0 );
	let blip = step( 0.93, boatHash21( cell ) ) * boatInvstep( 0.1, 0.3, length( fract( q * 7.0 ) - 0.5 ) ) * boatLstep( 0.2, 0.3, r );
	let heading = boatInvstep( 0.004, 0.012, abs( q.x ) ) * step( 0.0, q.y );
	let inside = boatInvstep( 0.96, 0.99, r );
	let echoes = sat( land + blip ) * ( trail * 0.75 + 0.25 );
	let radar = ( ( vec3f( 0.0, 0.012, 0.04 )
		+ vec3f( 0.05, 0.22, 0.28 ) * ( ring * 0.5 + heading * 0.6 )
		+ vec3f( 1.0, 0.72, 0.12 ) * echoes
		+ vec3f( 0.15, 0.9, 0.35 ) * ( beam * 0.8 + trail * 0.08 ) )
		* inside + vec3f( 0.01, 0.015, 0.02 ) ) * 1.3;

	// chart plotter
	let cp = u * vec2f( 1.35, 1.0 );
	let cn = mx_fractal_noise_float3( vec3f( cp * 2.6 + vec2f( 3.1, 1.2 ), 2.2 ), 4, 2.0, 0.5 );
	let shore = cn + ( u.x - 0.62 ) * 1.1;
	let isLand = boatLstep( 0.0, 0.015, shore );
	let shallow = boatLstep( -0.25, 0.0, shore );
	let contour = boatInvstep( 0.02, 0.05, abs( fract( shore * 9.0 ) - 0.5 ) ) * ( 1.0 - isLand );
	let water = mix( vec3f( 0.2, 0.42, 0.78 ), vec3f( 0.62, 0.82, 0.97 ), shallow );
	let track = boatInvstep( 0.003, 0.007, abs( u.x - 0.5 - ( u.y - 0.5 ) * 0.25 ) ) * step( 0.5, u.y );
	let boatIcon = boatInvstep( 0.012, 0.022, length( u - vec2f( 0.5, 0.5 ) ) );
	let chart = ( mix( water, vec3f( 0.88, 0.8, 0.55 ), isLand ) * ( 1.0 - contour * 0.35 )
		+ vec3f( 0.9, 0.1, 0.8 ) * track
		+ vec3f( 1.0, 0.35, 0.05 ) * boatIcon ) * 0.85;

	// gauge dial (backlit ticks + needle)
	let gq = ( u - 0.5 ) * 2.0;
	let gr = length( gq );
	let ga = atan2( gq.x, gq.y );
	let tickF = abs( fract( ga / TWO_PI * 24.0 ) - 0.5 );
	let ticks = boatInvstep( 0.08, 0.15, tickF ) * boatLstep( 0.72, 0.76, gr ) * boatInvstep( 0.86, 0.9, gr ) * boatInvstep( 2.3, 2.4, abs( ga ) );
	let lx = in.vs.vLocal.x; // positionLocal.x
	let needleA = sin( t * 0.7 + lx * 13.0 ) * 0.06 + lx * 3.7 + 0.3;
	let nd = vec2f( sin( needleA ), cos( needleA ) );
	let along = dot( gq, nd );
	let perp = length( gq - nd * along );
	let needle = boatInvstep( 0.025, 0.045, perp ) * step( -0.1, along ) * boatInvstep( 0.68, 0.72, along );
	let backlight = night * 1.4 + 0.25;
	let gauge = ( vec3f( 0.9, 0.95, 1.0 ) * ticks + vec3f( 1.0, 0.45, 0.08 ) * needle ) * backlight + vec3f( 0.004 );

	let nav = vColor * mat.navOn * ( night * 7.0 + 1.5 );
	let flood = vColor * ( night * 9.0 + 0.02 );
	let dome = vColor * ( night * 2.2 + 0.02 );
	let lcd = vColor * ( night * 0.5 + 0.45 );

	s.albedo = vColor * 0.06;
	s.emissive = nav * boatIsPattern( mode, 0.0 )
		+ radar * boatIsPattern( mode, 1.0 )
		+ chart * boatIsPattern( mode, 2.0 )
		+ gauge * boatIsPattern( mode, 3.0 )
		+ flood * boatIsPattern( mode, 4.0 )
		+ dome * boatIsPattern( mode, 5.0 )
		+ lcd * boatIsPattern( mode, 6.0 );
	s.roughness = aux.x;
`,e}createTrap(){let e=E({roughness:.55,metalness:0,side:2,alphaTest:.5,...ba()});return e.name=`boatTrap`,e.surface=`
	let aux = in.vs.vAux;
	let u = in.uv;
	let net = boatIsPattern( aux.z, 1.0 );
	let diag = vec2f( u.x + u.y, u.x - u.y ) * 0.7071;
	let q = mix( u / 0.038, diag / 0.05, net );
	let fr = abs( fract( q ) - 0.5 );
	let fw = fwidth( q );
	let half = mix( ${Sa(.5-.0045/.038)}, ${Sa(.5-.002/.05)}, net );
	let lineX = boatLstep( half - fw.x, half, fr.x );
	let lineY = boatLstep( half - fw.y, half, fr.y );
	let b = 0.014;
	let inner = step( b, u.x ) * step( b, u.y ) * step( u.x, aux.x - b ) * step( u.y, aux.y - b );
	let border = ( 1.0 - inner ) * ( 1.0 - net );
	s.alpha = max( max( lineX, lineY ), border );
	s.albedo = in.color.rgb * mix( 1.0, 0.8, border );
`,e}setNavLights(e){this.navOn.value=+!!e}dispose(){for(let e of[`hull`,`gelcoat`,`wood`,`fittings`,`glass`,`glow`,`trap`])this[e].dispose()}},wa=(e,t,r)=>new n(e,t,r),Ta={position:wa(0,-.53,-3.3),radius:.21,blades:4,pitch:.42},Ea={pivot:wa(0,-.52,-3.58),top:-.33,bottom:-.72,lead:.08,trail:-.27,maxAngle:.61},Da={color:13144154,rough:.3,metal:1};function Oa(){let{radius:e,blades:t,pitch:n}=Ta,r=[],i=yt([[0,-.09],[.015,-.085],[.03,-.068],[.043,-.04],[.048,0],[.047,.04],[.042,.06],[0,.06]],18);i.applyMatrix4(new x().makeRotationX(Math.PI/2)),r.push(bt(i,Da));let a=.042;for(let i=0;i<t;i++){let o=i*Math.PI*2/t,s=[];for(let t=0;t<9;t++){let r=t/8,i=a+(e-a)*r,c=.15*Math.sqrt(Math.max(0,1-r**2.4))*(.62+.38*Math.sin(Math.PI*Math.min(1,r*1.4)))+.002,l=Math.atan2(n,2*Math.PI*i),u=.32*r*r,d=[];for(let e=0;e<9;e++){let t=(-1+2*e/8)*c*.5,n=o-u+t*Math.cos(l)/i;d.push(wa(Math.cos(n)*i,Math.sin(n)*i,t*Math.sin(l)))}s.push(d)}let c=[],l=[];for(let e=0;e<9;e++){let t=e/8,n=[],r=[];for(let i=0;i<9;i++){let a=-1+2*i/8,o=s[Math.min(8,e+1)][i].clone().sub(s[Math.max(0,e-1)][i]),c=s[e][Math.min(8,i+1)].clone().sub(s[e][Math.max(0,i-1)]),l=o.cross(c).normalize(),u=.013*(1-.8*t)*Math.sqrt(Math.max(0,1-a*a))*(1-t**8);n.push(s[e][i].clone().addScaledVector(l,u*.5)),r.push(s[e][i].clone().addScaledVector(l,-u*.5))}c.push(n),l.push(r)}let u=_t(c),d=_t(l,{flip:!0}),f=c[4][4].clone().sub(l[4][4]);ht(u,f),ht(d,f.clone().negate()),u.computeVertexNormals(),d.computeVertexNormals(),r.push(bt(u,Da),bt(d,Da))}return ft(r)}function ka(){let{pivot:e,top:t,bottom:n,lead:r,trail:i}=Ea,a=t-e.y,o=n-e.y,s=(e,t)=>{let n=(r-i)*e,a=r*e,o=[];for(let e=0;e<=12;e++){let t=1-Math.cos(Math.PI*e/12)*.5-.5,r=5*.14*(.2969*Math.sqrt(t)-.126*t-.3516*t*t+.2843*t**3-.1036*t**4);o.push([a-t*n,r*n])}let s=[];for(let e=0;e<=12;e++)s.push(wa(o[e][1],t,o[e][0]));for(let e=11;e>=1;e--)s.push(wa(-o[e][1],t,o[e][0]));return s},c=s(.92,o),l=s(1,a),u=[c.concat([c[0].clone()]),l.concat([l[0].clone()])],d=_t(u),f=d.attributes.position,p=d.attributes.normal,m=0,h=wa(0,0,0),g=wa(0,0,0);for(let e=0;e<f.count;e++)h.fromBufferAttribute(f,e),g.fromBufferAttribute(p,e),m+=g.x*h.x;if(m<0){let e=Array.from(d.index.array);for(let t=0;t<e.length;t+=3){let n=e[t+1];e[t+1]=e[t+2],e[t+2]=n}d.setIndex(e),d.computeVertexNormals()}let _={color:Xt.antifouling,rough:.75},v=[bt(d,_),bt(gt(c,wa(0,-1,0)),_),bt(gt(l,wa(0,1,0)),_)],y=F(.022,.022,.3,10);y.translate(0,a+.15,0),v.push(bt(y,Da));let b=F(.012,.012,.05,8);return b.translate(0,o-.015,0),v.push(bt(b,Da)),ft(v)}var Aa=[`hull`,`gelcoat`,`wood`,`fittings`,`trap`,`glow`,`glass`],ja=.75,Ma=.6,Na=24,Pa=5,Fa=new n,Ia=new n,La=new n,Ra=new i;function za(e){let t=0,n=e.wlStart,r=(e.wlEnd-e.wlStart)/800;for(let i=0;i<800;i++)t+=2/3*e.halfBeamAt(n+(i+.5)*r)**3*r;return t}var Ba=class{constructor(){let e=this.lines=new mt,t=this.materials=new Ca(e),r=new Lt,i={};St(r,e),zt(r,e,i),xt(r,e,i),this.group=new xe,this.group.name=`LobsterBoat`,this.meshes={};for(let e of Aa){let n=r.merged(e);if(!n)continue;let i=new Ee(n,t[e]);i.name=`boat-`+e,i.castShadow=e!==`glass`,i.receiveShadow=!0,e===`glass`&&(i.renderOrder=1),this.group.add(i),this.meshes[e]=i}let a=(e,t,n,r,i=this.group)=>{let a=new Ee(t,n);return a.name=`boat-`+e,a.castShadow=!0,a.receiveShadow=!0,a.position.copy(r),i.add(a),this.meshes[e]=a,a};this.wheelPivot=new Me,this.wheelPivot.name=`boat-wheel-pivot`,this.wheelPivot.position.copy(i.wheelCenter),this.wheelPivot.quaternion.setFromUnitVectors(new n(0,0,1),i.wheelAxis),this.group.add(this.wheelPivot),this.wheelMesh=a(`wheel`,Yt(),t.wood,new n,this.wheelPivot),this.throttleMesh=a(`throttle`,Dt(),t.fittings,i.throttlePivot),this.radarMesh=a(`radar`,Ft(),t.fittings,i.radarPivot),this.propMesh=a(`propeller`,Oa(),t.fittings,Ta.position),this.rudderMesh=a(`rudder`,ka(),t.fittings,Ea.pivot),t.flagPivot.value.copy(i.flagPivot);let o=vt(e),s=e.canoeVolume+o,c=0;for(let t=0;t<=200;t++)c=Math.max(c,e.sheerX(t/200));let l=1/0;for(let t=0;t<=200;t++)l=Math.min(l,e.sheerY(t/200));this.dimensions={length:e.length,beam:c*2,draft:-st.bottom,freeboard:l,freeboardBow:e.sheerY(1),deckHeight:e.deckY,hullDepth:e.draftAt(e.centerOfFlotationZ),waterlineLength:e.wlEnd-e.wlStart,waterlineBeam:2*this._maxHalfBeam(),houseRoofHeight:Pt(0)},this.hydro={waterplaneArea:e.waterplaneArea,canoeVolume:e.canoeVolume,keelVolume:o,displacedVolume:s,suggestedMass:Math.round(Wt*e.canoeVolume),massWithKeel:Math.round(Wt*s),centerOfBuoyancy:e.centerOfBuoyancy.clone(),centerOfFlotationZ:e.centerOfFlotationZ,waterlineStart:e.wlStart,waterlineEnd:e.wlEnd,seawaterDensity:Wt};let u=this.hydro.suggestedMass,d=.36*this.dimensions.beam,f=.26*e.length,p=.27*e.length;this.hydro.centerOfMass=new n(0,.3,e.centerOfBuoyancy.z),this.hydro.inertia=new n(u*f*f,u*p*p,u*d*d),this.hydro.metacentricRadius=za(e)/e.canoeVolume,this.helmEye=new n(Ut.helmX,1.85,.3),this.boardPoint=new n(0,e.deckY,-1.75),this.exitPoints=[];for(let t of[-3,-2,-1.2]){let r=e.tAtSheerZ(t);for(let i of[1,-1])this.exitPoints.push(new n(i*(e.sheerX(r)-.035),e.sheerY(r)+.05,t))}this.propeller=Ta.position.clone(),this.rudder=Ea.pivot.clone(),this.bowSprayPoints=[];for(let t of[2,2.6,3.2,3.8]){let r=e.halfBeamAt(t);for(let e of[1,-1])this.bowSprayPoints.push(new n(e*(r+.01),.05,t))}this.hullSamples=e.buildHullSamples(8),this.colliders=this._buildColliders(),this._steer=0,this._throttle=0,this._rpm=0,this._propAngle=0,this._radarAngle=0,this._time=0,this._lastPos=new n,this._hasLastPos=!1,this._vel=new n,this._flagDir=new n(0,0,-1),this._flagWind=.5,this.setSteering(0),this.setThrottle(0)}createHullVolumeGeometry(){return lt(this.lines)}_maxHalfBeam(){let e=0;for(let t=this.lines.wlStart;t<=this.lines.wlEnd;t+=.02)e=Math.max(e,this.lines.halfBeamAt(t));return e}halfBeamAt(e){return this.lines.halfBeamAt(e)}draftAt(e){return this.lines.draftAt(e)}setSteering(e){let t=f.clamp(e,-1,1);this._steer=t,this.wheelMesh.rotation.z=-t*ja*Math.PI*2,this.rudderMesh.rotation.y=-t*Ea.maxAngle}setThrottle(e){this._throttle=f.clamp(e,-1,1),this.throttleMesh.rotation.x=this._throttle*Ma}setPropellerRPM(e){this._rpm=e}setNavLights(e){this.materials.setNavLights(e)}update(e){if(!(e>0))return;this._time+=e;let t=this._rpm/60,n=Pa*Math.tanh(t/Pa);this._propAngle=(this._propAngle+n*Math.PI*2*e)%(Math.PI*2),this.propMesh.rotation.z=this._propAngle,this._radarAngle=(this._radarAngle+Na/60*Math.PI*2*e)%(Math.PI*2),this.radarMesh.rotation.y=this._radarAngle,this.group.updateWorldMatrix(!0,!1),this.group.matrixWorld.decompose(Ia,Ra,La),this._hasLastPos&&(Fa.subVectors(Ia,this._lastPos).divideScalar(e),Fa.lengthSq()<900&&this._vel.lerp(Fa,1-Math.exp(-e*4))),this._lastPos.copy(Ia),this._hasLastPos=!0;let r=h.windDir.value,i=h.windSpeed.value;Fa.set(r.x*i,0,r.y*i).sub(this._vel).applyQuaternion(Ra.invert()),Fa.y=0;let a=Fa.length();a>.001&&(Fa.divideScalar(a),this._flagDir.lerp(Fa,1-Math.exp(-e*3)),this._flagDir.lengthSq()<1e-4&&this._flagDir.copy(Fa),this._flagDir.normalize()),this._flagWind+=(f.clamp(a/9,0,1)-this._flagWind)*(1-Math.exp(-e*2)),this.materials.flagDir.value.copy(this._flagDir),this.materials.flagWind.value=this._flagWind}dispose(){for(let e of Object.values(this.meshes))e.geometry.dispose();this.materials.dispose()}get triangleCount(){let e=0;for(let t of Object.values(this.meshes))e+=wt(t.geometry);return e}_buildColliders(){let e=this.lines,t=[],r=(e,r,i,a=!1,o=!0)=>{let s=new n().addVectors(r,i).multiplyScalar(.5),c=new n().subVectors(i,r).multiplyScalar(.5);t.push({tag:e,center:s,half:c,walkable:a,solid:o})},i=(e,t,r)=>new n(e,t,r),a=t=>e.halfBreadth(e.tAtSheerZ(t),e.deckY)-e.shell;r(`deck`,i(-a(-1.5),e.deckY-.1,e.zAft+e.shell),i(a(-1.5),e.deckY,Ut.dash.zFace),!0,!1);for(let[t,n]of[[e.zAft,-2.3],[-2.3,-.7],[-.7,e.houseFront]]){let o=e.tAtSheerZ(t),s=e.tAtSheerZ(n),c=Math.max(e.sheerY(o),e.sheerY(s))+.045,l=Math.max(e.sheerX(o),e.sheerX(s)),u=Math.min(a(t),a(n));for(let a of[1,-1])r(`bulwark`,i(Math.min(a*u,a*l),e.deckY,t),i(Math.max(a*u,a*l),c,n))}r(`transom`,i(-e.sheerX(0),e.deckY,e.zAft),i(e.sheerX(0),e.sheerY(0)+.045,e.zAft+e.shell));for(let t of[1,-1]){let n=ct(e,e.houseBack)-Ut.wallT,a=ct(e,e.houseBack);r(`houseWall`,i(Math.min(t*n,t*a),e.sheerY(e.tAtSheerZ(e.houseBack)),e.houseBack),i(Math.max(t*n,t*a),Ut.roofUnderY,e.houseFront))}let o=Ut.dash;r(`console`,i(-o.halfW,e.deckY,o.zFace),i(o.halfW,o.yTop,e.houseFront)),r(`helmSeat`,i(Ut.helmX-.23,e.deckY,Ut.seatZ-.24),i(Ut.helmX+.23,1.05,Ut.seatZ+.21)),r(`bench`,i(.65,e.deckY,.075),i(1.07,e.deckY+.47,.825),!0),r(`roof`,i(-1.25,Ut.roofUnderY,Ut.roofZ0),i(1.25,Pt(0),Ut.roofZ1),!0);for(let[t,n,a]of Zt){let o=e.deckY+.03+n*(kt.H+.035);r(`trap`,i(t-kt.W/2,o,a-kt.L/2),i(t+kt.W/2,o+kt.H,a+kt.L/2),!0)}r(`hauler`,i(Qt.x-.2,e.deckY,Qt.z-.08),i(Qt.x+.2,Qt.y+.2,Qt.z+.25)),r(`baitBarrel`,i(.6,e.deckY,-1.06),i(1.12,e.deckY+.8,-.54));for(let[t,n]of[[e.houseFront,2.4],[2.4,3.3],[3.3,4.15]]){let a=e.tAtSheerZ(t),o=e.tAtSheerZ(n),s=e.sheerX(a)-e.shell;r(`foredeck`,i(-s,e.deckY,t),i(s,(e.sheerY(a)+e.sheerY(o))/2+.06,n),!0)}return t}};function Va(e,t,n,r){return _n(e*73+n*19349663,t*31+n*83492791,r)}function Ha(e,t,n,r){let i=Math.floor(e),a=Math.floor(t),o=Math.floor(n),s=e-i,c=t-a,l=n-o,u=s*s*(3-2*s),d=c*c*(3-2*c),f=l*l*(3-2*l),p=(e,t,n)=>Va(i+e,a+t,o+n,r),m=p(0,0,0)+(p(1,0,0)-p(0,0,0))*u,h=p(0,1,0)+(p(1,1,0)-p(0,1,0))*u,g=p(0,0,1)+(p(1,0,1)-p(0,0,1))*u,_=p(0,1,1)+(p(1,1,1)-p(0,1,1))*u,v=m+(h-m)*d;return(v+(g+(_-g)*d-v)*f)*2-1}function Ua(e,t,n,r,i){let a=1,o=1,s=0,c=0;for(let l=0;l<r;l++)s+=Ha(e*o,t*o,n*o,i+l*7)*a,c+=a,a*=.5,o*=2.03;return s/c}function Wa(e){let t=(1+Math.sqrt(5))/2,n=[-1,t,0,1,t,0,-1,-t,0,1,-t,0,0,-1,t,0,1,t,0,-1,-t,0,1,-t,t,0,-1,t,0,1,-t,0,-1,-t,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1],i=e=>{let t=Math.hypot(n[e*3],n[e*3+1],n[e*3+2]);n[e*3]/=t,n[e*3+1]/=t,n[e*3+2]/=t};for(let e=0;e<n.length/3;e++)i(e);for(let t=0;t<e;t++){let e=new Map,t=(t,r)=>{let a=t<r?t*1e5+r:r*1e5+t,o=e.get(a);return o===void 0?(o=n.length/3,n.push((n[t*3]+n[r*3])/2,(n[t*3+1]+n[r*3+1])/2,(n[t*3+2]+n[r*3+2])/2),i(o),e.set(a,o),o):o},a=[];for(let e=0;e<r.length;e+=3){let n=r[e],i=r[e+1],o=r[e+2],s=t(n,i),c=t(i,o),l=t(o,n);a.push(n,s,l,i,c,s,o,l,c,s,c,l)}r=a}return{verts:new Float32Array(n),faces:r}}var Ga=[{name:`boulder`,scale:[1,.8,.9],planes:10,cut:[.62,.88],soft:.08,rough:.06},{name:`block`,scale:[1.1,.9,.95],planes:13,cut:[.58,.8],soft:.04,rough:.045},{name:`slab`,scale:[1.35,.55,1],planes:11,cut:[.6,.86],soft:.05,rough:.045},{name:`spire`,scale:[.75,1.45,.8],planes:12,cut:[.58,.84],soft:.05,rough:.05}];function Ka(e,t){let n=[];for(let r=0;r<e.planes;r++){let i=_n(t,r,1)*Math.PI*2,a=(_n(t,r,2)*2-1)*.85,o=Math.sqrt(1-a*a),s=e.cut[0]+(e.cut[1]-e.cut[0])*_n(t,r,3);n.push([Math.cos(i)*o,a,Math.sin(i)*o,s])}n.push([0,-1,0,.62+.15*_n(t,99,4)]);let[r,i,a]=e.scale;return(o,s,c)=>{let l=1.6;for(let[e,t,r,i]of n){let n=o*e+s*t+c*r;n>.001&&(l=Math.min(l,i/n))}let u=e.soft,d=Math.max(u-Math.abs(1-l),0)/u,f=Math.min(1,l)-d*d*u*.25;return f+=Ua(o*2.1+t,s*2.1,c*2.1,4,t)*e.rough,f-=Math.abs(Ha(o*5.3,s*5.3+t,c*5.3,t+3))*e.rough*.35,[o*f*r,s*f*i,c*f*a]}}function qa(e,t,n){let r=Ga[e],i=Ka(r,t),{verts:a,faces:o}=Wa(n),s=a.length/3,c=new Float32Array(s*3),l=new Float32Array(s);for(let e=0;e<s;e++){let t=i(a[e*3],a[e*3+1],a[e*3+2]);c[e*3]=t[0],c[e*3+1]=t[1],c[e*3+2]=t[2],l[e]=Math.hypot(t[0],t[1],t[2])}let u=new Float32Array(s),d=new Uint16Array(s);for(let e=0;e<o.length;e+=3)for(let t=0;t<3;t++){let n=o[e+t],r=o[e+(t+1)%3];u[n]+=l[r],d[n]++,u[r]+=l[n],d[r]++}let f=new Float32Array(s);for(let e=0;e<s;e++){let t=u[e]/d[e]-l[e];f[e]=Math.max(.35,Math.min(1,1-t*9))}let p=new Be;return p.setAttribute(`position`,new De(c,3)),p.setAttribute(`ao`,new De(f,1)),p.setIndex(o),p.computeVertexNormals(),p.computeBoundingSphere(),p}var Ja=3,Ya=2,Xa=60,Za=700,Qa=.12,$a=class{constructor({scene:e,terrain:t,village:r=null,colliders:a=null,seed:s=4242,castShadow:c=!0,sunShadow:l=!0}){this.scene=e,this.terrainData=t.data||t,this.terrainGPU=t.gpu||null,this.village=r,this.group=new xe,this.group.name=`Rocks`;let u=performance.now();this.instances=this._place(yn(s));let d=performance.now();if(a)for(let e of this.instances){let t=e.y+e.size*e.sy*.8;e.size<.9||t<-.3||a.addCylinder(e.x,e.z,e.size*.75,e.y-e.size*.5,t,{tag:`rock`})}this.material=this._createMaterial(l),this.meshes=[],this.buckets=[];for(let e=0;e<Ga.length;e++){let t=this.instances.filter(t=>t.style===e),n=qa(e,17+e*101,Ja),r=qa(e,17+e*101,Ya),i=(e,n)=>{let r=e.clone(),i=new Te(new Float32Array(Math.max(1,t.length)*2),2);i.setUsage(we),r.setAttribute(`iLod`,i);let a=new Ae(r,this.material,Math.max(1,t.length));return a.name=n,a.count=0,a.castShadow=c&&n.endsWith(`near`),a.receiveShadow=!0,a.frustumCulled=!1,a.staticVelocity=!0,a.instanceMatrix.setUsage(we),this.group.add(a),this.meshes.push(a),a};this.buckets.push({members:t,near:i(n,`rocks-${Ga[e].name}-near`),far:i(r,`rocks-${Ga[e].name}-far`),nearTris:n.index.count/3,farTris:r.index.count/3})}this.timings={place:d-u,build:performance.now()-d},this._lastCam=new n(1e9,0,0),this._frustum=new o,this._m4=new x,this._sphere=new b,this._lastQuat=new i,e.add(this.group)}_place(e){let r=this.terrainData,a=[],o=new On(913),s=2.5,c=new Map,l=(e,t)=>e*73856093^t*19349663,u=(e,t,n)=>{let r=Math.floor((e-n-6)/s),i=Math.floor((e+n+6)/s),a=Math.floor((t-n-6)/s),o=Math.floor((t+n+6)/s);for(let s=a;s<=o;s++)for(let a=r;a<=i;a++){let r=c.get(l(a,s));if(r){for(let i of r)if(Math.hypot(i.x-e,i.z-t)<(i.r+n)*.9)return!1}}return!0},d=(e,t,n)=>{let r=l(Math.floor(e/s),Math.floor(t/s)),i=c.get(r);i||c.set(r,i=[]),i.push({x:e,z:t,r:n})},f=(e,t)=>{let n=(e-r.origin)/r.texel-.5,i=(t-r.origin)/r.texel-.5,a=Math.max(0,Math.min(r.res-2,Math.floor(n))),o=Math.max(0,Math.min(r.res-2,Math.floor(i)));return r.rock[o*r.res+a]},p=new n,m=(e,t)=>{let n=1.5,i=r.heightAt(e+n,t)-r.heightAt(e-n,t),a=r.heightAt(e,t+n)-r.heightAt(e,t-n);return Math.hypot(i,a)/(2*n)},h=this.village&&this.village.getFootprints?this.village.getFootprints():[],g=z.pier,_=z.spawn.position,v=z.reef,y=[[55,-65],[54.6,-72],[52.4,-82],[48.4,-92],[44.8,-100.5],[42.6,-107.2]],b=(e,t,n)=>{let r=1/0;for(let i=0;i<e.length-1;i++){let a=e[i],o=e[i+1],s=o[0]-a[0],c=o[1]-a[1],l=Math.max(0,Math.min(1,((t-a[0])*s+(n-a[1])*c)/(s*s+c*c)));r=Math.min(r,Math.hypot(t-a[0]-s*l,n-a[1]-c*l))}return r},S=(e,t,n,i)=>{for(let r of h)if(Math.hypot(e-r.x,t-r.z)<r.r+n+2)return!0;return!!(b(y,e,t)<n+4||Math.abs(e-g.x)<n+9&&t>g.zStart-8&&t<g.zEnd+12||Math.hypot(e-_.x,t-_.z)<n+10||Math.hypot(e-v.center.x,t-v.center.z)<v.radius+n+12||r.pathDistance&&r.pathDistance(e,t)<n+1.5||e>-125&&e<155&&t>-125&&i>-1.2&&t<40)},C=(o,s,c,l,{sink:f=.3,tilt:m=.25,align:h=.5,tumble:g=0}={})=>{let _=r.heightAt(o,s);if(S(o,s,c,_)||!u(o,s,c))return!1;r.normalAt(o,s,p);let v=Ga[l].scale,y=c*(.8+.4*e()),b=c*(.75+.5*e()),C=c*(.8+.4*e()),w=_;for(let e=0;e<6;e++)w=Math.min(w,r.heightAt(o+Math.cos(e)*c*.7,s+Math.sin(e)*c*.7));let T=w-b*v[1]*f,E=new i().setFromAxisAngle(new n(0,1,0),e()*Math.PI*2),D=new i().setFromUnitVectors(new n(0,1,0),new n(0,1,0).lerp(p,h).normalize()),O=e()<g?2.2:m,k=new i().setFromEuler(new t((e()-.5)*O,0,(e()-.5)*O));E.premultiply(k).premultiply(D);let A=new x().compose(new n(o,T,s),E,new n(y,b,C));return a.push({x:o,y:T,z:s,size:c,sy:b/c,style:l,matrix:A,radius:Math.max(y,b,C)*1.5}),d(o,s,c),!0},w=t=>{let n=0;for(let e of t)n+=e;let r=e()*n;for(let e=0;e<t.length;e++)if(r-=t[e],r<=0)return e;return t.length-1};for(let t of r.rockSites||[]){if(t.kind!==`stack`)continue;let n=Math.round(6+t.r*1.2);for(let r=0;r<n*3&&r<80;r++){let n=e()*Math.PI*2,r=t.r*(.9+e()*1.4);C(t.x+Math.cos(n)*r,t.z+Math.sin(n)*r,.8+e()*e()*3.5,w([3,3,1,1]),{sink:.25,tilt:.6,tumble:.4})}}let T=2.2;for(let t=-880;t<330;t+=T)for(let n=-640;n<640;n+=T){let i=n+(e()-.5)*T,a=t+(e()-.5)*T,s=r.heightAt(i,a);if(s<-7||s>250)continue;let c=f(i,a),l=e();if(s<3.5){if(c<.45)continue;let t=R(-.05,.45,o.noise(i/23,a/23)),n=Math.abs(i-10)<210&&a>-130&&a<80?.35:1;if(l>.09*t*n*R(.45,.8,c)*(s>-2.5?1:.35))continue;C(i,a,.6+e()*e()*3.4,w([4,3,2,1]),{sink:s<0?.2:.22,tilt:.7,align:.3,tumble:.45});continue}let u=m(i,a);if(c>.35&&u<.75){if(l>.03*R(.35,.7,c)*(1-R(.5,.75,u)))continue;let t=e()<.25;C(i,a,t?1.6+e()*3.2:.4+e()*e()*1.6,w(t?[1,3,2,1]:[4,2,1,.5]),{sink:t?.45:.3,tilt:.5,align:t?.8:.4})}else if(c<.35&&u>.25&&u<.9&&s>6){if(l>.0016)continue;C(i,a,1.5+e()*3.5,w([1,2,3,.5]),{sink:.55,tilt:.3,align:.9})}}for(let t of[-1,1]){let n=[];for(let i=0;i<400&&n.length<3;i++){let i=t<0?-195+e()*60:145+e()*60,a=-70+e()*90,o=r.heightAt(i,a);o<-1.5||o>2.5||f(i,a)<.25||n.some(e=>Math.hypot(e[0]-i,e[1]-a)<14)||n.push([i,a])}for(let[t,i]of n){C(t,i,1.8+e()*1.4,w([3,2,1,0]),{sink:.3,tilt:.4,align:.4,tumble:.3});let n=3+Math.floor(e()*5);for(let a=0;a<n*3;a++){let n=e()*Math.PI*2,a=2.5+e()*5,o=t+Math.cos(n)*a,s=i+Math.sin(n)*a,c=r.heightAt(o,s);c<-2||c>3||C(o,s,.4+e()*e()*1.4,w([4,2,1,0]),{sink:.2,tilt:.6,align:.4,tumble:.5})}}}if(r.rubble){let t=r.res;for(let n=-120;n<360;n+=3)for(let i=-420;i<420;i+=3){let a=i+(e()-.5)*3,o=n+(e()-.5)*3,s=Math.floor(a-r.origin),c=Math.floor(o-r.origin);if(s<0||c<0||s>=t||c>=t||r.rubble[c*t+s]<170||e()>.12)continue;let l=r.heightAt(a,o);l>-2||l<-10||C(a,o,.45+e()*e()*1.1,w([3,3,1,0]),{sink:.4,tilt:.5,align:.6,tumble:.5})}}return a}_createMaterial(e){let t=this.terrainGPU,n=E({name:`Rocks`,roughness:.8,metalness:0});if(!t)return n;n.modules=[t.module,jn(),Ln,...e?[t.sunModulationModule]:[]],e&&(n.defines.MATERIAL_SUN_MODULATION=1),n.attributes={iLod:`vec2f`,ao:`f32`},n.varyings={vLod:`vec2f`,vCav:`f32`},n.vertex=`o.vLod = v.iLod; o.vCav = v.ao;`;let r=`if ( ! lodFadeVisible( in.pixel, in.vs.vLod.x, in.vs.vLod.y > 0.5 ) ) { discard; }`;return n.shadow=`${r}\n\treturn true;`,n.surface=`
	let p = in.P;
	let N = in.N;
	let g = terrainImplicitGrad( p );
	let mcr = textureSample( terrainDetailTex, smpAniso4Repeat, ${on(`p.xz`,.9)} / 61.0 ).w * 0.6
		+ textureSample( terrainDetailTex, smpAniso4Repeat, ${on(`p.xz`,2.3)} / 17.0 ).w * 0.4;
	let R = terrainRockSurface( p, N, p.y, mcr, 0.5, 1.0, g );
	// contact with the ground: sand / soil drifted against the base, darker crevice
	let ground = terrainHeightAt( p.xz );
	let above = p.y - ground;
	let sp = terrainSplat( p.xz );
	let contact = ( 1.0 - smoothstep( 0.0, 0.22, above + ( R.height - 0.5 ) * 0.15 ) ) * smoothstep( -0.2, 0.3, ground );
	let drift = mix( ${I(.33,.27,.18)}, ${I(.8,.72,.56)}, sp.x );
	let nb = terrainPerturbNormal( p, N, R.hd, 1.0 );
	${r}
	s.albedo = mix( R.albedo, drift, contact * 0.8 );
	s.roughness = mix( R.rough, 0.9, contact );
	s.normal = nb;
	s.ao = sat( in.vs.vCav * ( 1.0 - contact * 0.35 ) * ( smoothstep( 0.0, 0.35, R.height ) * 0.35 + 0.65 ) );
`,n}update(e){let t=e.getWorldPosition(this._tmpV||=new n);if(!(t.distanceToSquared(this._lastCam)>1||!e.quaternion.equals(this._lastQuat)))return;this._lastCam.copy(t),this._lastQuat.copy(e.quaternion),e.updateMatrixWorld(),this._m4.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(this._m4,e.coordinateSystem,e.reversedDepth);let r=this._sphere;for(let e of this.buckets){let n=0,i=0,a=e.near.geometry.attributes.iLod,o=e.far.geometry.attributes.iLod;for(let s of e.members){if(r.center.set(s.x,s.y,s.z),r.radius=s.radius,!this._frustum.intersectsSphere(r)&&(r.radius=s.radius+12,!this._frustum.intersectsSphere(r)))continue;let c=Math.hypot(s.x-t.x,s.y-t.y,s.z-t.z),l=Xa+s.size*6,u=Za+s.size*60,d=nn(c,l*(1-Qa/2),l*1.06),f=nn(c,u*.88,u);f>=1||(d<1&&(a.array[n*2]=d,a.array[n*2+1]=1,e.near.setMatrixAt(n++,s.matrix)),d>0&&(o.array[i*2]=d*(1-f),o.array[i*2+1]=0,e.far.setMatrixAt(i++,s.matrix)))}e.near.count=n,e.far.count=i;for(let[e,t]of[[a,n],[o,i]])e.clearUpdateRanges(),e.addUpdateRange(0,Math.max(1,t)*2),e.needsUpdate=!0;e.near.instanceMatrix.clearUpdateRanges(),e.near.instanceMatrix.addUpdateRange(0,n*16),e.near.instanceMatrix.needsUpdate=!0,e.far.instanceMatrix.clearUpdateRanges(),e.far.instanceMatrix.addUpdateRange(0,i*16),e.far.instanceMatrix.needsUpdate=!0}}stats(){let e=0,t=0;for(let n of this.buckets)e+=n.near.count*n.nearTris+n.far.count*n.farTris,t+=n.near.count+n.far.count;return{rocks:this.instances.length,visible:t,triangles:e,drawCalls:this.meshes.length,timings:this.timings}}dispose(){for(let e of this.meshes)e.geometry.dispose();this.material.dispose(),this.scene.remove(this.group)}},eo={STONE:0,COCONUT:1,WEED:2,SHELL:3,CORAL:4,FROND:5,DRIFT:6},to=(e,t,n=0,r=.1)=>[e,t,n,r],G=Math.PI*2;new n,new n;var no=new x;function ro(e){let t=Math.sin(e*127.1+311.7)*43758.5453;return t-Math.floor(t)}function io(e,t,n,r){let i=e*374761393+t*668265263+n*1440662683+r*2147483647|0;return i=Math.imul(i^i>>>13,1274126177),i^=i>>>16,(i>>>0)/4294967296}function ao(e,t,n,r=0){let i=Math.floor(e),a=Math.floor(t),o=Math.floor(n),s=e-i,c=t-a,l=n-o,u=s*s*(3-2*s),d=c*c*(3-2*c),f=l*l*(3-2*l),p=(e,t,n)=>e+(t-e)*n,m=(e,t,n)=>io(i+e,a+t,o+n,r);return p(p(p(m(0,0,0),m(1,0,0),u),p(m(0,1,0),m(1,1,0),u),d),p(p(m(0,0,1),m(1,0,1),u),p(m(0,1,1),m(1,1,1),u),d),f)*2-1}function oo(e,t,n,r=null){let i=e.length,a=e[0].length,o=[];for(let e=0;e<i;e++){o.push([]);for(let t=0;t<a;t++)o[e].push([0,0,0])}let s=t?a:a-1,c=(e,t)=>{e[0]+=t[0],e[1]+=t[1],e[2]+=t[2]},l=(e,t,n)=>{let r=t[0]-e[0],i=t[1]-e[1],a=t[2]-e[2],o=n[0]-e[0],s=n[1]-e[1],c=n[2]-e[2];return[i*c-a*s,a*o-r*c,r*s-i*o]};for(let t=0;t<i-1;t++)for(let n=0;n<s;n++){let r=(n+1)%a,i=e[t][n],s=e[t][r],u=e[t+1][n],d=e[t+1][r],f=l(i,u,s),p=l(s,u,d);c(o[t][n],f),c(o[t+1][n],f),c(o[t][r],f),c(o[t][r],p),c(o[t+1][n],p),c(o[t+1][r],p)}let u=0;for(let n=0;n<i;n++){let i=0,s=0,c=0;for(let t=0;t<a;t++)i+=e[n][t][0],s+=e[n][t][1],c+=e[n][t][2];i/=a,s/=a,c/=a;for(let l=0;l<a;l++){let a=e[n][l],d=o[n][l],f=r?r(n,l,a):t?[a[0]-i,a[1]-s,a[2]-c]:[0,1,0];u+=d[0]*f[0]+d[1]*f[1]+d[2]*f[2]}}let d=u<0?-1:1,f=[],p=[],m=[],h=[],g=t?a+1:a;for(let t=0;t<i;t++)for(let r=0;r<g;r++){let i=r%a,s=e[t][i],c=o[t][i],l=(Math.hypot(c[0],c[1],c[2])||1)*d;f.push(s[0],s[1],s[2]),p.push(c[0]/l,c[1]/l,c[2]/l);let u=n(r,t);m.push(u[0],u[1])}for(let e=0;e<i-1;e++)for(let t=0;t<g-1;t++){let n=e*g+t,r=n+1,i=n+g,a=i+1;h.push(n,i,r,r,i,a)}return dn(new ln(f,p,m,h))}function so(e,t,r=6,i=null,a=1){let o=e.length,s=[],c=[],l=[];for(let t=0;t<o;t++){let r=e[Math.max(0,t-1)],i=e[Math.min(o-1,t+1)];s.push(new n(i[0]-r[0],i[1]-r[1],i[2]-r[2]).normalize())}let u=Math.abs(s[0].y)<.9?new n(0,1,0):new n(1,0,0);u.sub(s[0].clone().multiplyScalar(u.dot(s[0]))).normalize(),c.push(u),l.push(s[0].clone().cross(u));for(let e=1;e<o;e++){let t=c[e-1],n=t.clone().sub(s[e].clone().multiplyScalar(t.dot(s[e])));n.lengthSq()<1e-8&&n.copy(t),n.normalize(),c.push(n),l.push(s[e].clone().cross(n))}let d=[0];for(let t=1;t<o;t++)d.push(d[t-1]+Math.hypot(e[t][0]-e[t-1][0],e[t][1]-e[t-1][1],e[t][2]-e[t-1][2]));let f=[];for(let n=0;n<o;n++){let a=[];for(let o=0;o<r;o++){let s=o/r*G,u=Math.cos(s),d=Math.sin(s),f=t[n]*(i?i(n,s):1);a.push([e[n][0]+(c[n].x*u+l[n].x*d)*f,e[n][1]+(c[n].y*u+l[n].y*d)*f,e[n][2]+(c[n].z*u+l[n].z*d)*f])}f.push(a)}let p=t.reduce((e,t)=>e+t,0)/o;return{part:oo(f,!0,(e,t)=>[d[t]*a,e/r*G*p]),rings:f,T:s,len:d}}function co(e){let t=(1+Math.sqrt(5))/2,n=[[-1,t,0],[1,t,0],[-1,-t,0],[1,-t,0],[0,-1,t],[0,1,t],[0,-1,-t],[0,1,-t],[t,0,-1],[t,0,1],[-t,0,-1],[-t,0,1]].map(e=>{let t=Math.hypot(e[0],e[1],e[2]);return[e[0]/t,e[1]/t,e[2]/t]}),r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];for(let t=0;t<e;t++){let e=new Map,t=(t,r)=>{let i=t<r?t*1e5+r:r*1e5+t,a=e.get(i);if(a===void 0){let o=[n[t][0]+n[r][0],n[t][1]+n[r][1],n[t][2]+n[r][2]],s=Math.hypot(o[0],o[1],o[2]);n.push([o[0]/s,o[1]/s,o[2]/s]),a=n.length-1,e.set(i,a)}return a},i=[];for(let e=0;e<r.length;e+=3){let n=r[e],a=r[e+1],o=r[e+2],s=t(n,a),c=t(a,o),l=t(o,n);i.push(n,s,l,a,c,s,o,l,c,s,c,l)}r=i}return{V:n,F:r}}var lo=[co(0),co(1),co(2)];function uo(e,t){let n=new Float32Array(e.length);for(let r=0;r<t.length;r+=3){let i=t[r]*3,a=t[r+1]*3,o=t[r+2]*3,s=e[a]-e[i],c=e[a+1]-e[i+1],l=e[a+2]-e[i+2],u=e[o]-e[i],d=e[o+1]-e[i+1],f=e[o+2]-e[i+2],p=c*f-l*d,m=l*u-s*f,h=s*d-c*u;for(let e of[i,a,o])n[e]+=p,n[e+1]+=m,n[e+2]+=h}for(let e=0;e<n.length;e+=3){let t=Math.hypot(n[e],n[e+1],n[e+2])||1;n[e]/=t,n[e+1]/=t,n[e+2]/=t}return n}var fo=new Map;function po(e,t=1,n=0){let r=e+`|`+t+`|`+n,i=fo.get(r);if(i)return i;let{V:a,F:o}=lo[t],s=e*17+3,c=[];for(let e=0;e<Math.round(n*6);e++){let t=ro(s+e*3.1)*2-1,n=ro(s+e*5.7)*G,r=Math.sqrt(1-t*t);c.push([r*Math.cos(n),t*.7,r*Math.sin(n),.68+ro(s+e*9.3)*.22])}let l=[];for(let e of a){let t=1+.13*ao(e[0]*1.3+s,e[1]*1.3,e[2]*1.3,s)+.05*ao(e[0]*3.1,e[1]*3.1+s,e[2]*3.1,s+1);for(let n of c){let r=e[0]*n[0]+e[1]*n[1]+e[2]*n[2];if(r>.05){let e=n[3]/r,i=.08,a=Math.max(0,Math.min(1,.5+.5*(e-t)/i));t=e+(t-e)*a-i*a*(1-a)}}l.push(e[0]*t,e[1]*t,e[2]*t)}let u=o.slice(),d=uo(l,u),f=[];for(let e=0;e<l.length;e+=3)f.push(l[e]*.5+l[e+1]*.2,l[e+2]*.5);return i=dn(new ln(l,Array.from(d),f,u)),fo.set(r,i),i}function mo(e,t,n,r,i,a,o,s,c={}){let l=(c.y??ho(t,n,r,Math.max(i,o)*.7))+a*(1-(c.sink??.35)*2),u=po(Math.floor(s()*12),c.detail??1,c.angular??0);return e.part(`nature`,u,n,l,r,{ry:s()*G,rx:(s()-.5)*(c.tilt??.3),rz:(s()-.5)*(c.tilt??.3),sx:i,sy:a,sz:o,tint:c.tint||[1,1,1],data:to(s(),eo.STONE,c.palette??s(),Math.max(i,a,o)*2)}),l+a}function ho(e,t,n,r){let i=e(t,n);for(let a=0;a<5;a++)i=Math.min(i,e(t+Math.cos(a*1.2566)*r,n+Math.sin(a*1.2566)*r));return i}function go(e,t,n,r,i,a,o,s,c={}){let l=s(),u=Math.max(3,Math.min(10,Math.round(a/.18))),d=Math.cos(i),f=-Math.sin(i),p=(s()-.5)*.6,m=[],h=[],g=n-d*a/2,_=r-f*a/2,v=i-p*.5;for(let e=0;e<=u;e++){let n=o*(1-e/u*.7);m.push([g,t(g,_)+n*.7,_]),h.push(n),v+=p/u+(s()-.5)*.25,g+=Math.cos(v)*a/u,_-=Math.sin(v)*a/u}let y=to(l,eo.DRIFT,.1,o*2),b=c.tone||[1,1,1],x=so(m,h,o>.03?6:5);e.add(`nature`,x.part,no,b,y);let S=c.twigs??Math.floor(s()*3);for(let n=0;n<S;n++){let n=1+Math.floor(s()*(u-1)),r=v+(s()<.5?1:-1)*(.4+s()*.7),i=a*(.15+s()*.3),o=m[n],c=o[0]+Math.cos(r)*i,l=o[2]-Math.sin(r)*i,d=(o[0]+c)/2,f=(o[2]+l)/2,p=h[n]*.5,g=so([o,[d,t(d,f)+p*.9,f],[c,t(c,l)+p*.4,l]],[p,p*.7,p*.3],4);e.add(`nature`,g.part,no,b,y)}return m}function _o(e,t,n,r,i,a,o,s,c,l={}){let u=c(),d=Math.cos(i),f=-Math.sin(i),p=t(n-d*a*.4,r-f*a*.4),m=t(n+d*a*.4,r+f*a*.4),h=t(n-f*o*.4,r+d*o*.4),g=t(n+f*o*.4,r-d*o*.4),_=Math.atan2(m-p,a*.8)+(l.lift??0),v=Math.atan2(h-g,o*.8),y=(l.y??(p+m)/2)+s/2-s*(l.sink??.3),b=l.paint??0;return e.pushAt(n,y,r,i,v,_),e.box(`wood`,0,0,0,a,s,o,{grain:0,tint:l.tint||[1.02,1,.96],data:Fn(u,l.weather??.95,b,0)}),e.pop(),y}var vo=new Map;function yo(e){let t=vo.get(e);if(t)return t;let n=.25,r=.098,i=ro(e*3.3)*G,a=[];for(let t=0;t<=6;t++){let o=t/6,s=.015+.97*o,c=r*Math.sin(Math.PI*s)**.62*(1.06-.22*o)*(t===0||t===6?.12:1),l=[];for(let t=0;t<8;t++){let r=t/8*G,a=1+.075*Math.cos(3*(r+i))*Math.sin(Math.PI*o),s=1+.03*ao(Math.cos(r)*2,Math.sin(r)*2,o*3,e);l.push([Math.cos(r)*c*a*s,o*n-n/2,Math.sin(r)*c*a*s])}a.push(l)}return t=oo(a,!0,(e,t)=>[t/6*n,e/8*G*r]),vo.set(e,t),t}function bo(e,t,n,r,i,a={}){let o=(a.scale??1)*(.85+i()*.3),s=t(n,r),c=a.age??i(),l=Math.PI/2+(i()-.5)*.5;e.part(`nature`,yo(Math.floor(i()*6)),n,s+.098*o*.72,r,{ry:i()*G,rz:l,rx:(i()-.5)*.3,sx:o,sy:o,sz:o,tint:[1,1,1],data:to(i(),eo.COCONUT,c,.2*o)})}var xo=new Map;function So(e){let t=xo.get(e);if(t)return t;let n=.085,r=.075,i=.022,a=[],o=[];for(let t=0;t<8;t++)o.push(.012*(ro(e*13+t)-.5));for(let e=0;e<=9;e++){let t=[];for(let a=0;a<8;a++){let s=a/8*G,c,l;if(e<=4){let t=e/4;c=n*Math.sin(t*Math.PI/2)*(1+.04*Math.cos(3*s)),l=r*(1-Math.cos(t*Math.PI/2))+(e===4?o[a]:0)}else{let t=1-(e-4-1)/4;c=.063*Math.sin(t*Math.PI/2)*(1+.04*Math.cos(3*s)),l=i*.8+(r-i*.8)*(1-Math.cos(t*Math.PI/2))+(e===5?o[a]:0)}t.push([Math.cos(s)*Math.max(c,.002),l,Math.sin(s)*Math.max(c,.002)])}a.push(t)}return t=oo(a,!0,(e,t)=>[t*.02,e/8*G*n],(e,t,n)=>e<=4?[n[0],0,n[2]]:[-n[0],.3,-n[2]]),xo.set(e,t),t}function Co(e,t,n,r,i,a={}){let o=.85+i()*.35,s=i()<.5,c=t(n,r);e.part(`nature`,So(Math.floor(i()*4)),n,c+(s?-.012:.072*o),r,{ry:i()*G,rx:(s?0:Math.PI)+(i()-.5)*.5,rz:(i()-.5)*.5,sx:o,sy:o*(.8+i()*.3),sz:o,tint:[1,1,1],data:to(i(),eo.COCONUT,1.5+i()*.5,.17*o)})}function wo(e,t,n,r,i,a,o,s={}){let c=o(),l=i>.35?10:7,u=s.aspect??1+o()*.8,d=s.rot??o()*G,f=Math.cos(d),p=Math.sin(d),m=[];for(let e=0;e<l;e++)m.push(.62+.55*ro(c*91+e*1.7));let h=[];for(let e=0;e<=3;e++){let o=e/3,s=[];for(let e=0;e<l;e++){let d=e/l*G,h=m[e]*.6+m[(e+1)%l]*.2+m[(e+l-1)%l]*.2,g=i*Math.max(o,.04)*h,_=Math.cos(d)*g*u,v=Math.sin(d)*g,y=n+_*f-v*p,b=r+_*p+v*f,x=.55+.9*(ao(y*9,b*9,c*50,7)*.5+.5),S=a*Math.max(0,1-o*o)**.6*x;s.push([y,t(y,b)+S-.012*o,b])}h.push(s)}let g=oo(h,!0,(e,t)=>[h[t][e%l][0]-n,h[t][e%l][2]-r],()=>[0,1,0]),_=s.dry??o();e.add(`nature`,g,no,s.tint||[1,1,1],to(c,eo.WEED,_,i*2)),s.fringe!==!1&&To(e,t,n,r,i*.95,o,{count:Math.round(2+i*6),dry:Math.min(1,_+.2),lift:a*.5,minLen:i*.6});let v=s.strands??Math.floor(o()*2);for(let a=0;a<v;a++){let s=o()*G,l=n+Math.cos(s)*i*.7,u=r+Math.sin(s)*i*.7,d=s+(o()-.5)*.8,f=i*(.8+o()*1.5),p=[],m=[];for(let e=0;e<=5;e++){let n=.006*(1-.5*e/5);p.push([l,t(l,u)+n*.8,u]),m.push(n),d+=(o()-.5)*.7,l+=Math.cos(d)*f/5,u+=Math.sin(d)*f/5}e.add(`nature`,so(p,m,4).part,no,[1,1,1],to(c+a,eo.WEED,_,.05))}}function To(e,t,n,r,i,a,o={}){let s=a(),c=o.count??Math.round(8+i*45),l=o.dir??a()*G,u=o.lift??0;for(let d=0;d<c;d++){let c=i*Math.sqrt(a()),f=a()*G,p=n+Math.cos(f)*c,m=r+Math.sin(f)*c,h=l+(a()-.5)*1.6+(a()<.5?Math.PI:0),g=(o.minLen??.1)+a()*.34,_=.008+a()*.007,v=.003+d%5*.003+u*Math.max(0,1-c/i)*a()+(1-c/i)*.012,y=[];for(let e=0;e<=3;e++){let e=Math.sin(h)*_*.5,n=-Math.cos(h)*_*.5,r=t(p-e,m-n)+v,i=t(p+e,m+n)+v;y.push([[p-e,r,m-n],[p+e,i,m+n]]),h+=(a()-.5)*.5,p+=Math.cos(h)*g/3,m+=Math.sin(h)*g/3}let b=oo(y,!1,(e,t)=>[t/3*g,e*_]);for(let e=0;e<b.n.length;e+=3){b.n[e]*=.2,b.n[e+1]=Math.abs(b.n[e+1])+.8,b.n[e+2]*=.2;let t=Math.hypot(b.n[e],b.n[e+1],b.n[e+2]);b.n[e]/=t,b.n[e+1]/=t,b.n[e+2]/=t}Eo(b);let x=.75+a()*.5;e.add(`nature`,b,no,[x,x,x],to(s+d*.013,eo.WEED,Math.min(1,(o.dry??.7)+(a()-.5)*.5),.03))}}function Eo(e){let{p:t,n,idx:r}=e;for(let e=0;e<n.length;e+=3)n[e+1]<0&&(n[e]=-n[e],n[e+1]=-n[e+1],n[e+2]=-n[e+2]);for(let e=0;e<r.length;e+=3){let n=r[e]*3,i=r[e+1]*3,a=r[e+2]*3,o=t[i]-t[n],s=t[i+2]-t[n+2],c=t[a]-t[n],l=t[a+2]-t[n+2];if(s*c-o*l<0){let t=r[e+1];r[e+1]=r[e+2],r[e+2]=t}}}function Do(e,t,n,r,i,a,o,s={}){let c=o(),l=s.dry??.5+o()*.5,u=to(c,eo.FROND,l,.4),d=[],f=[],p=[],m=i,h=n,g=r,_=(o()-.5)*.5;for(let e=0;e<=9;e++){let n=e/9,r=.035*(1-n*.85)+.004,i=r*.8+Math.sin(Math.PI*Math.min(1,n*1.3))*.06*(s.arch??1);d.push([h,t(h,g)+i,g]),f.push(r),p.push(m),m+=_/9+(o()-.5)*.12,h+=Math.cos(m)*a/9,g-=Math.sin(m)*a/9}e.add(`nature`,so(d,f,4).part,no,[1,1,1],to(c,eo.FROND,l,.3));{let a=n-Math.cos(i)*.25,o=r+Math.sin(i)*.25,s=[];for(let e=0;e<=2;e++){let c=e/2,l=a+(n-a)*c,u=o+(r-o)*c,d=.16*(1-c*.7),f=Math.sin(i)*d,p=Math.cos(i)*d;s.push([[l-f,t(l-f,u-p)+.012,u-p],[l,t(l,u)+.03,u],[l+f,t(l+f,u+p)+.012,u+p]])}let c=oo(s,!1,(e,t)=>[t*.12,e*.08]);Eo(c),e.add(`nature`,c,no,[.85,.8,.75],u)}let v=s.leaflets??14;for(let n=0;n<v;n++){let r=.12+.86*n/v,i=r*9,u=Math.min(8,Math.floor(i)),f=i-u,m=d[u][0]+(d[u+1][0]-d[u][0])*f,h=d[u][2]+(d[u+1][2]-d[u][2])*f,g=d[u][1]+(d[u+1][1]-d[u][1])*f,_=p[u];for(let i of[-1,1]){if(o()<(s.broken??.3))continue;let u=a*(.34-.2*Math.abs(r-.4))*(.6+o()*.5)*(o()<.15?.4:1),d=_+i*(.75+o()*.35)-.15*i,f=.028+o()*.012,p=[],v=m,y=h,b=d;for(let e=0;e<=3;e++){let r=e/3,a=f*(e===3?.15:1-r*.4),s=Math.sin(b)*a*.5,c=Math.cos(b)*a*.5,l=t(v,y)+.006+n%3*.002,d=e===0?Math.max(g,l):Math.max(l,g+(l-g)*Math.min(1,r*2.5));p.push([[v-s,d+a*.15,y-c],[v+s,d+a*.15,y+c]]),b+=i*(o()-.3)*.2,v+=Math.cos(b)*u/3,y-=Math.sin(b)*u/3}let x=oo(p,!1,(e,t)=>[t/3*u,e*f]);Eo(x),e.add(`nature`,x,no,[1,1,1],to(c+n*.07,eo.FROND,Math.min(1,l+(o()-.5)*.3),.4))}}}function Oo(e,t,n,r,i,a,o={}){let s=t(n,r),c=o.type??(a()<.65?0:1),l=a(),u=a();if(c===0){let t=a()<.55;e.lathe(`nature`,n,s+(t?.003:i*.19),r,[[0,0],[.35,.1],[.72,.26],[1,.38],[.93,.36],[.66,.24],[.3,.1],[.001,.05]],{segs:6,ry:a()*G,rx:t?(a()-.5)*.3:Math.PI+(a()-.5)*.3,sx:i*.5,sy:i*.5,sz:i*.43,tint:[1,1,1],data:to(l,eo.SHELL,u,i)})}else e.lathe(`nature`,n,s+i*.3,r,[[.001,0],[.42,.05],[.5,.22],[.4,.45],[.27,.66],[.13,.86],[.001,1]].map(([e,t])=>[e,t-.4]),{segs:7,ry:a()*G,rz:Math.PI/2-.35+(a()-.5)*.3,sx:i,sy:i,sz:i,tint:[1,1,1],data:to(l,eo.SHELL,1+u,i)})}function ko(e,t,n,r,i,a,o={}){let s=t(n,r),c=a(),l=o.bleach??.6+a()*.4;if(o.head||a()<.15){let t=po(Math.floor(a()*12),1,0);e.part(`nature`,t,n,s+i*.25,r,{ry:a()*G,sx:i*.5,sy:i*.38,sz:i*.45,tint:[1,1,1],data:to(c,eo.CORAL,l+2,i)});return}let u=a()*G,d=i,f=i*(.07+a()*.04),p=[];for(let e=0;e<=3;e++){let t=e/3-.5,i=n+Math.cos(u)*t*d,a=r-Math.sin(u)*t*d;p.push([i,s+f*.8+(e===1?f*.3:0),a])}let m=to(c,eo.CORAL,l,i);e.add(`nature`,so(p,[f,f*1.05,f*.95,f*.7],6).part,no,[1,1,1],m);let h=1+Math.floor(a()*3);for(let t=0;t<h;t++){let t=1+Math.floor(a()*2),n=u+(a()<.5?1:-1)*(.5+a()*.6),r=d*(.25+a()*.3),i=p[t],o=[i[0]+Math.cos(n)*r,i[1]+(a()-.3)*r*.4,i[2]-Math.sin(n)*r];e.rod(`nature`,i,o,f*.8,f*.5,{segs:5,capTop:!0,tint:[1,1,1],data:m})}}function Ao(e,t,n,r,i,a={}){let o=a.R??.27+i()*.05,s=a.r??.09+i()*.015,c=a.y??t(n,r),l=i(),u=a.lean??0;return e.torus(`hard`,n,c+s*.72*(1-(a.sink??.35))+Math.sin(u)*o,r,o,s,{ry:a.ry??i()*G,rz:u+(i()-.5)*.1,rx:(i()-.5)*.1,sy:.72,radial:8,tubular:18,tint:Tn(kn.rubber,1.3+i()*.6),data:Nn(l,0,0,.82)}),c+s*.72*2}function jo(e,t,n,r,i){let a=t(n,r),o=[L(14214374),L(8368328),L(7314032),L(15263454),L(10469583)],s=o[Math.floor(i()*o.length)],c=.8+i()*.5;e.lathe(`hard`,n,a+.026*c,r,[[.001,0],[.03,.002],[.034,.012],[.034,.16],[.028,.2],[.013,.235],[.013,.25],[.015,.252],[.015,.268],[.001,.27]].map(([e,t])=>[e,t-.13]),{segs:8,ry:i()*G,rz:Math.PI/2+(i()-.5)*.2,sx:c,sy:c,sz:c,tint:s,data:Nn(i(),0,0,.3)})}function Mo(e,t,r,i,a){let o=t(r,i),s=[L(3108776),L(13191738),L(14726720),L(3836522),L(3158064),L(14711456)],c=s[Math.floor(a()*s.length)],l=a()*G,u=.9+a()*.2,d=[[0,-.12],[.04,-.1],[.045,0],[.05,.08],[.03,.13],[-.02,.135],[-.045,.08],[-.04,-.02],[-.035,-.1]];e.pushAt(r,o+.012,i,l,(a()-.5)*.1,(a()-.5)*.1);let f=d.map(([e,t])=>new n(e*u,0,t*u));e.add(`hard`,tn(f,.014,new n(0,0,1),new n(0,1,0)),no,Tn(c,.8),Nn(a(),0,0,.85));let p=[new n(-.038*u,0,0),new n(-.02*u,.03,.06*u),new n(0,.012,.1*u),new n(.02*u,.03,.06*u),new n(.04*u,0,0)];e.tube(`hard`,p,.0055,{radial:4,tint:Tn(c,.9),data:Nn(a(),0,0,.7)}),e.pop()}function No(e,t,r,i,a,o={}){let s=o.r??.009+a()*.008,c=o.tint||[kn.rope,kn.ropeDark,kn.ropeBlue,L(13680752),L(4161365),L(13131820)][Math.floor(a()*6)],l=a();if(o.tangle){let u=o.R??.12+a()*.12,d=t(r,i),f=3+Math.floor(a()*3);for(let o=0;o<f;o++){let f=[],p=a()*G,m=.3+a()*.8;for(let e=0;e<=12;e++){let o=e/12*G*(.8+a()*.1),c=Math.cos(o)*u*(.7+a()*.4),l=Math.sin(o)*u*.6*Math.sin(m),h=Math.sin(o)*u*Math.cos(m),g=r+c*Math.cos(p)-h*Math.sin(p),_=i+c*Math.sin(p)+h*Math.cos(p);f.push(new n(g,Math.max(d+l+u*.45,t(g,_)+s),_))}e.tube(`rope`,f,s,{radial:4,tint:c,data:[l+o*.1,0,0,0]})}return}let u=o.len??.5+a()*1.4,d=Math.max(6,Math.round(u/.08)),f=a()*G,p=r,m=i,h=[];for(let e=0;e<=d;e++)h.push(new n(p,t(p,m)+s*.8,m)),f+=(a()-.5)*.9,p+=Math.cos(f)*u/d,m+=Math.sin(f)*u/d;e.tube(`rope`,h,s,{radial:4,tint:c,data:[l,0,0,0]})}function Po(e,t,n,r,i,a={}){let o=a.w??.8+i()*1.2,s=a.d??.5+i()*.8,c=i()*G,l=Math.cos(c),u=Math.sin(c),d=i(),f=a.tint||[L(4157279),L(3104650),L(11556154),L(6982202),L(5267568)][Math.floor(i()*5)],p=1+i()*2.5,m=[];for(let e=0;e<=5;e++){let a=[];for(let c=0;c<=7;c++){let f=c/7-.5,m=e/5-.5,h=f*o*(.75+.25*Math.cos(m*3))+(i()-.5)*.05,g=m*s+(i()-.5)*.05,_=n+h*l+g*u,v=r-h*u+g*l,y=Math.max(0,Math.sin(f*Math.PI*p*2+d*6))*.05*(1-Math.abs(m)*1.5);a.push([_,t(_,v)+.01+y+.02*(1-Math.abs(f)*2)*(1-Math.abs(m)*2),v])}m.push(a)}let h=oo(m,!1,(e,t)=>[e/7*o,t/5*s]);if(e.add(`net`,h,no,f,[d,0,.03+i()*.02,0]),i()<.5){let n=m[0][0][0],r=m[0][0][2];An(e,n,t(n,r)+.075,r,kn.orange,kn.orange,2,i(),{rz:Math.PI/2,ry:i()*G})}}var Fo=[[15229482,15921126],[15769632,15769632],[12729134,15921126],[15778362,2105376],[15921126,3108776],[15229482,15229482],[4161365,15778362],[14210248,14210248]];function Io(e,t,n,r,i,a={}){let[o,s]=Fo[Math.floor(i()*Fo.length)],c=.08+i()*.3,l=L(o).map(e=>e+(.62-e)*c),u=L(s).map(e=>e+(.62-e)*c),d=Nn(i(),.12+i()*.25,0,.45+i()*.2),f=a.kind??(i()<.5?0:i()<.6?1:2),p=t(n,r),m=.85+i()*.3;if(f===0)e.lathe(`hard`,n,p+.105*m,r,[[0,0],[.05,.008],[.092,.035],[.12,.09],[.124,.15],[.11,.22],[.075,.275],[.035,.302],[0,.31]].map(([e,t])=>[e,t-.155]),{segs:14,ry:i()*G,rz:Math.PI/2+(i()-.5)*.25,sx:m,sy:m,sz:m,tint:(e,t)=>t>0?l:u,data:d});else if(f===1){let t=[];for(let e=0;e<=8;e++){let n=-Math.PI/2+e/8*Math.PI;t.push([Math.cos(n)*.1+0,Math.sin(n)*.1])}t[0][0]=.001,t[8][0]=.001;let a=i()*G;e.lathe(`hard`,n,p+.085*m,r,t,{segs:14,ry:a,rz:Math.PI/2+(i()-.5)*.6,sx:m,sy:m,sz:m,tint:l,data:d}),e.torus(`hard`,n+Math.cos(a)*.1*m,p+.1*m,r-Math.sin(a)*.1*m,.022*m,.007*m,{ry:a,rx:Math.PI/2,radial:4,tubular:8,tint:l,data:d})}else e.lathe(`hard`,n,p+.06*m,r,[[.001,0],[.055,.004],[.07,.02],[.072,.17],[.058,.188],[.001,.19]].map(([e,t])=>[e,t-.095]),{segs:12,ry:i()*G,rz:Math.PI/2+(i()-.5)*.15,sx:m,sy:m,sz:m,tint:l,data:Nn(i(),.25+i()*.3,0,.85)})}function Lo(e,t,n,r,i,a,o={}){let s=a(),c=t(n,r),l=.4+a()*.4,u=Nn(s,l,.55,.55),d=o.tint||(a()<.5?kn.galv:L(4161365));e.pushAt(n,c,r,i),e.box(`hard`,0,.42,0,.62,.012,.46,{tint:d,data:u});for(let t of[-1,1])e.box(`hard`,.02,.55,t*.28,.78,.26,.012,{rx:t*.28,tint:d,data:u});e.box(`hard`,-.33,.56,0,.012,.28,.62,{rz:-.25,tint:d,data:u}),e.box(`hard`,.42,.53,0,.012,.3,.62,{rz:.7,tint:d,data:u});for(let t of[-1,1])e.beam(`wood`,[.55,.28,t*.12],[-1,.5,t*.27],.045,.045,{data:Fn(s+t,.8,0,0)}),e.beam(`wood`,[-.25,.36,t*.2],[-.3,0,t*.22],.04,.04,{data:Fn(s+t*2,.8,0,0)});e.torus(`hard`,.62,.17,0,.14,.045,{rx:Math.PI/2,radial:6,tubular:14,tint:kn.rubber,data:Nn(s,0,0,.85)}),e.cyl(`hard`,.62,.17,-.05,.05,.05,.1,{rx:Math.PI/2,segs:8,tint:kn.galv,data:Nn(s,l,.6,.5)}),e.pop()}function Ro(e,t,n,r,i,a,o={}){let s=ho(t,n,r,.8),c=o.n??4+Math.floor(a()*5),l=o.len??2.2+a()*1.2;e.pushAt(n,s,r,i);for(let t of[-.7,.7])e.box(`wood`,t*l*.35,.04,0,.09,.09,.9,{grain:2,data:Fn(a(),.9,0,0)});let u=.09;for(let t=0;t<c;t++){let n=.14+a()*.1,r=.025+a()*.015,i=(a()-.5)*.5,o=a()<.3?.2+a()*.3:0,s=[L(6143152),L(15502198),L(15721154),L(9224928),L(15781756)][Math.floor(a()*5)];e.box(`wood`,(a()-.5)*.3,u+r/2,i,l*(.8+a()*.25),r,n,{grain:0,ry:(a()-.5)*.12,tint:o?s:[1,1,1],data:Fn(a(),.9,o,0)}),t%2==1&&(u+=r)}return e.pop(),{h:u+.05,L:l}}var zo={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT4:16},Bo={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},Vo={5120:127,5121:255,5122:32767,5123:65535,5125:1,5126:1};function Ho(e){let t=new DataView(e);if(t.getUint32(0,!0)!==1179937895)throw Error(`GLB: bad magic`);let r=t.getUint32(8,!0),o=null,s=null;for(let n=12;n<r;){let r=t.getUint32(n,!0),i=t.getUint32(n+4,!0);i===1313821514?o=JSON.parse(new TextDecoder().decode(new Uint8Array(e,n+8,r))):i===5130562&&(s=new Uint8Array(e,n+8,r)),n+=8+r}if(!o)throw Error(`GLB: no JSON chunk`);if(o.extensionsRequired&&o.extensionsRequired.length)throw Error(`GLB: unsupported extensions `+o.extensionsRequired.join(`, `));let c=e=>{let t=o.accessors[e],n=zo[t.type],r=Bo[t.componentType],i=new r(t.count*n);if(t.bufferView===void 0)return{array:i,itemSize:n};let a=o.bufferViews[t.bufferView];if(a.buffer!==0||!s)throw Error(`GLB: external buffers are not supported`);let c=s.byteOffset+(a.byteOffset||0)+(t.byteOffset||0),l=a.byteStride||n*r.BYTES_PER_ELEMENT;if(l===n*r.BYTES_PER_ELEMENT&&c%r.BYTES_PER_ELEMENT===0)i.set(new r(s.buffer,c,t.count*n));else{let e=new DataView(s.buffer),a={5120:t=>e.getInt8(t),5121:t=>e.getUint8(t),5122:t=>e.getInt16(t,!0),5123:t=>e.getUint16(t,!0),5125:t=>e.getUint32(t,!0),5126:t=>e.getFloat32(t,!0)}[t.componentType];for(let e=0;e<t.count;e++)for(let t=0;t<n;t++)i[e*n+t]=a(c+e*l+t*r.BYTES_PER_ELEMENT)}return{array:i,itemSize:n,normalized:!!t.normalized,componentType:t.componentType}},l=e=>{let t=c(e);if(t.array instanceof Float32Array)return t;let n=new Float32Array(t.array.length),r=t.normalized?1/Vo[t.componentType]:1;for(let e=0;e<n.length;e++)n[e]=t.array[e]*r;return{array:n,itemSize:t.itemSize}},u=[],d=e=>{let t=new x;if(e.matrix)return t.fromArray(e.matrix);let r=e.translation||[0,0,0],a=e.rotation||[0,0,0,1],o=e.scale||[1,1,1];return t.compose(new n(...r),new i(...a),new n(...o))},f=(e,t)=>{let n=o.nodes[e],r=new x().multiplyMatrices(t,d(n));if(n.mesh!==void 0){let e=o.meshes[n.mesh],t=new a().getNormalMatrix(r);e.primitives.forEach((i,a)=>{if(i.mode!==void 0&&i.mode!==4)return;let o=new Be,s=i.attributes;if(s.POSITION!==void 0){let e=l(s.POSITION);o.setAttribute(`position`,new De(e.array,3).applyMatrix4(r))}if(s.NORMAL!==void 0){let e=l(s.NORMAL);o.setAttribute(`normal`,new De(e.array,3).applyNormalMatrix(t))}if(s.TEXCOORD_0!==void 0&&o.setAttribute(`uv`,new De(l(s.TEXCOORD_0).array,2)),i.indices!==void 0){let e=c(i.indices).array;o.setIndex(new De(e instanceof Uint8Array?new Uint16Array(e):e,1))}u.push({name:n.name||e.name||`mesh`+n.mesh+(a?`_`+a:``),geometry:o})})}for(let e of n.children||[])f(e,r)},p=o.scenes?o.scenes[o.scene||0]:{nodes:o.nodes.map((e,t)=>t)};for(let e of p.nodes)f(e,new x);return{meshes:u,json:o}}var Uo=[`dead_quiver_trunk`,`dead_quiver_branch_02`,`dead_quiver_branch_01`,`lambis_shell`],Wo={TRUNK:0,BRANCH_A:1,BRANCH_B:2,SHELL:3},Go=[[1.994,.306,.268],[.526,.287,.201],[.439,.255,.227],[.139,.047,.075]],Ko=[22,70,260],qo=.12,Jo=`./models/debris/`;async function Yo(e){if(globalThis.__debrisFile)return globalThis.__debrisFile(e);let t=await fetch(e);if(!t.ok)throw Error(`ScannedDebris: `+e+` `+t.status);return t.arrayBuffer()}async function Xo(e){if(globalThis.__debrisImage)return globalThis.__debrisImage(e);let t=await(await fetch(e)).blob(),n=await createImageBitmap(t),r=new OffscreenCanvas(n.width,n.height).getContext(`2d`,{willReadFrequently:!0});r.drawImage(n,0,0);let i=r.getImageData(0,0,n.width,n.height).data;return{data:new Uint8Array(i.buffer,i.byteOffset,i.byteLength),width:n.width,height:n.height}}var Zo=class{constructor({gpu:e,instances:r,parent:a}){this.gpu=e,this.instances=r,this.parent=a,this.meshes=[],this.ready=!1,this._lastCam=new n(1e9,0,0),this._lastQuat=new i,this._frustum=new o,this._m4=new x,this._sphere=new b,this._v=new n;for(let e of r){let r=new i().setFromEuler(new t(e.roll||0,e.yaw,e.pitch||0,`YXZ`));e.matrix=new x().compose(new n(e.x,e.y,e.z),r,new n(e.sx,e.sy,e.sz));let a=Go[e.asset];e.radius=Math.hypot(a[0]*e.sx,a[1]*e.sy,a[2]*e.sz)/2}this.promise=this._load().catch(e=>console.error(`ScannedDebris: load failed`,e))}async _load(){let e=performance.now(),t=await Promise.all(Uo.map(async e=>Ho(await Yo(Jo+e+`.glb`)))),n=[`albedo`,`normal`,`arm`],r={};await Promise.all(n.map(async e=>{let t=await Promise.all(Uo.map(t=>Xo(Jo+t+`_`+e+`.jpg`))),n=t[0].width,i=new Uint8Array(n*2*n*2*4);t.forEach((e,t)=>{let r=t%2*n,a=Math.floor(t/2)*n;for(let t=0;t<n;t++)i.set(e.data.subarray(t*n*4,(t+1)*n*4),((a+t)*n*2+r)*4)});let a=new N({label:`debrisScan_`+e,width:n*2,height:n*2,format:e===`albedo`?`rgba8unorm-srgb`:`rgba8unorm`,mips:!0,usage:[`sample`,`copyDst`],data:i});a.getGPU(),w(a),r[e]=a})),this.textures=r;let i=[];for(let e=0;e<3;e++){let n=[],r=[],a=[],o=[],s=[];t.forEach((t,i)=>{let c=t.meshes.find(t=>t.name.startsWith(`LOD`+e));if(!c)return;let l=c.geometry,u=l.attributes.position,d=l.attributes.normal,f=l.attributes.uv,p=n.length/3,m=i%2*.5,h=Math.floor(i/2)*.5;for(let e=0;e<u.count;e++){n.push(u.getX(e),u.getY(e),u.getZ(e)),r.push(d.getX(e),d.getY(e),d.getZ(e));let t=Math.min(.998,Math.max(.002,f.getX(e))),s=Math.min(.998,Math.max(.002,f.getY(e)));a.push(t*.5+m,s*.5+h),o.push(i)}let g=l.index;for(let e=0;e<g.count;e++)s.push(p+g.getX(e))});let c=new Be;c.setAttribute(`position`,new Ve(n,3)),c.setAttribute(`normal`,new Ve(r,3)),c.setAttribute(`uv`,new Ve(a,2)),c.setAttribute(`aAsset`,new Ve(o,1)),c.setIndex(n.length/3>65535?new Se(s,1):new Ce(s,1)),i.push(c)}this.material=this._createMaterial();let a=Math.max(1,this.instances.length);this.levels=i.map((e,t)=>{let n=new Te(new Float32Array(a*4),4);n.setUsage(we),e.setAttribute(`iData`,n);let r=new Ae(e,this.material,a);return r.name=`debris-scan-lod`+t,r.count=0,r.castShadow=t===0,r.receiveShadow=!0,r.frustumCulled=!1,r.instanceMatrix.setUsage(we),r.staticVelocity=!0,this.parent.add(r),this.meshes.push(r),{mesh:r,iData:n,tris:e.index.count/3}}),this.loadMs=performance.now()-e,this.ready=!0,this._lastCam.set(1e9,0,0)}_createMaterial(){let e=this.gpu,t=this.textures;return E({name:`DebrisScanned`,roughness:.85,metalness:0,underwaterLighting:`lite`,modules:[Re,Ln,e.module,e.sunModulationModule],defines:{MATERIAL_SUN_MODULATION:1},appliesHillShadow:!0,textures:{scanAlbedo:t.albedo,scanNormal:t.normal,scanArm:t.arm},attributes:{aAsset:`f32`,iData:`vec4f`},varyings:{vIData:`vec4f`},vertex:`
	if ( abs( v.aAsset - v.iData.x ) >= 0.5 ) { v.position = vec3f( 0.0 ); }
	o.vIData = v.iData;
`,surface:`
	let iData = in.vs.vIData;
	let st = in.uv;
	let albedo = textureSample( scanAlbedo, smpAnisoClamp, st );
	let arm = textureSample( scanArm, smpAnisoClamp, st );
	let nmap = textureSample( scanNormal, smpAnisoClamp, st ).xyz * 2.0 - 1.0;
	let rnd = iData.y;
	let isWood = iData.x < 2.5;
	if ( ! lodFadeVisible( in.pixel, iData.z, iData.w > 0.5 ) ) { discard; }
	let p = in.P;
	var c = albedo.rgb;
	// driftwood: sun-bleached toward silver-grey, per instance
	let grey = vec3f( luminance( c ) ) * vec3f( 1.04, 1.02, 0.98 ) * 1.12;
	c = mix( c, grey, select( 0.0, rnd * 0.4 + 0.45, isWood ) );
	// ground contact: dusted with sand and darker where it touches / is buried
	let ground = terrainHeightAt( p.xz );
	let contact = 1.0 - smoothstep( 0.0, 0.1, p.y - ground );
	let sandy = smoothstep( 0.6, 1.6, ground );
	c = mix( c, ${I(.8,.72,.58)}, contact * sandy * 0.45 );
	// wet below the swash line: darker (and glossier, see roughness)
	let wet = 1.0 - smoothstep( 0.4, 1.1, p.y );
	c = c * ( 1.0 - wet * 0.45 );
	s.albedo = c;
	s.roughness = mix( max( arm.g, 0.35 ), 0.22, wet * 0.85 );
	s.metalness = 0.0;
	let contactAO = 1.0 - smoothstep( 0.0, 0.12, p.y - ground );
	s.ao = sat( arm.r * ( 1.0 - contactAO * 0.4 ) );
	// tangent-space normal map (derivative TBN, as three's normalMap without tangents)
	s.normal = perturbNormalByMap( p, in.N, st, nmap );
`,shadow:`
	return lodFadeVisible( in.pixel, in.vs.vIData.z, in.vs.vIData.w > 0.5 );
`})}update(e){if(!this.ready)return;let t=e.getWorldPosition(this._v);if(t.distanceToSquared(this._lastCam)<.25&&e.quaternion.equals(this._lastQuat))return;this._lastCam.copy(t),this._lastQuat.copy(e.quaternion),e.updateMatrixWorld(),this._m4.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(this._m4,e.coordinateSystem,e.reversedDepth);let n=[0,0,0];for(let e of this.instances){if(this._sphere.center.set(e.x,e.y,e.z),this._sphere.radius=e.radius+6,!this._frustum.intersectsSphere(this._sphere))continue;let r=Math.hypot(e.x-t.x,e.y-t.y,e.z-t.z)-e.radius*6,[i,a,o]=Ko,s=nn(r,i*(1-qo/2),i*1.06),c=nn(r,a*(1-qo/2),a*1.06),l=nn(r,o*.88,o);l>=1||(s<1&&this._put(0,n,e,s,1),s>0&&c<1&&this._put(1,n,e,c>0?c:s,+(c>0)),c>0&&this._put(2,n,e,c*(1-l),0))}this.levels.forEach((e,t)=>{e.mesh.count=n[t],e.mesh.instanceMatrix.clearUpdateRanges(),e.mesh.instanceMatrix.addUpdateRange(0,Math.max(1,n[t])*16),e.mesh.instanceMatrix.needsUpdate=!0,e.iData.clearUpdateRanges(),e.iData.addUpdateRange(0,Math.max(1,n[t])*4),e.iData.needsUpdate=!0})}_put(e,t,n,r,i){let a=this.levels[e],o=t[e]++;a.mesh.setMatrixAt(o,n.matrix),a.iData.array.set([n.asset,n.rnd,r,i],o*4)}get triangles(){return this.ready?this.levels.reduce((e,t)=>e+t.mesh.count*t.tris,0):0}dispose(){for(let e of this.meshes)e.geometry.dispose(),this.parent.remove(e);if(this.material&&this.material.dispose(),this.textures)for(let e in this.textures)this.textures[e].destroy()}},Qo=Math.PI*2,$o=2;function es(e,t,n){let r=t-e.x,i=n-e.z,a=r*e.c-i*e.s,o=r*e.s+i*e.c,s=Math.abs(a)-e.hx,c=Math.abs(o)-e.hz;return Math.hypot(Math.max(s,0),Math.max(c,0))+Math.min(Math.max(s,c),0)}function ts(e,t,n){let r=e.bx-e.x,i=e.bz-e.z,a=Math.max(0,Math.min(1,((t-e.x)*r+(n-e.z)*i)/(r*r+i*i||1)));return Math.hypot(t-e.x-r*a,n-e.z-i*a)-e.r}var ns=class{constructor(e=4){this.cell=e,this.map=new Map,this.count=0}_insert(e,t,n,r,i){let a=this.cell;for(let o=Math.floor(n/a);o<=Math.floor(i/a);o++)for(let n=Math.floor(t/a);n<=Math.floor(r/a);n++){let t=n*73856093^o*19349663,r=this.map.get(t);r||this.map.set(t,r=[]),r.push(e)}this.count++}box(e,t,n,r,i,a=0,o=``){let s={t:0,x:e,z:t,hx:n,hz:r,c:Math.cos(i),s:Math.sin(i),pad:a,tag:o},c=Math.hypot(n,r)+a+2.5;return this._insert(s,e-c,t-c,e+c,t+c),s}circle(e,t,n,r=0,i=``){let a={t:1,x:e,z:t,r:n,pad:r,tag:i},o=n+r+2.5;return this._insert(a,e-o,t-o,e+o,t+o),a}capsule(e,t,n,r,i,a=0,o=``){let s={t:2,x:e,z:t,bx:n,bz:r,r:i,pad:a,tag:o},c=i+a+2.5;return this._insert(s,Math.min(e,n)-c,Math.min(t,r)-c,Math.max(e,n)+c,Math.max(t,r)+c),s}dist(e,t,n=null){let r=this.cell,i=this.map.get(Math.floor(e/r)*73856093^Math.floor(t/r)*19349663);if(!i)return 2.5;let a=2.5;for(let r of i){if(n&&n(r))continue;let i=(r.t===0?es(r,e,t):r.t===1?Math.hypot(e-r.x,t-r.z)-r.r:ts(r,e,t))-r.pad;i<a&&(a=i)}return a}},rs=class{constructor(e=2){this.cell=e,this.map=new Map}free(e,t,n,r=1){let i=this.cell,a=n+3;for(let o=Math.floor((t-a)/i);o<=Math.floor((t+a)/i);o++)for(let s=Math.floor((e-a)/i);s<=Math.floor((e+a)/i);s++){let i=this.map.get(s*73856093^o*19349663);if(i){for(let a of i)if(Math.hypot(a.x-e,a.z-t)<(a.r+n)*r)return!1}}return!0}add(e,t,n){let r=Math.floor(e/this.cell)*73856093^Math.floor(t/this.cell)*19349663,i=this.map.get(r);i||this.map.set(r,i=[]),i.push({x:e,z:t,r:n})}},is=class{constructor({B:e,inst:t,terrain:n,village:r=null,vegetation:i=null,rocks:a=null,colliders:o=null,seed:s=5150,detail:c=null}){this.B=e,this.inst=t,this.T=n,this.village=r,this.vegetation=i,this.rocks=a,this.colliders=o,this.rand=yn(s),this.noise=new On(s+1),this.detail=c,this.ground=(e,t)=>this.T.heightAt(e,t),this.obs=new ns,this.occ=new rs,this.counts={},this.log=[],this.newColliders=0,this.rockSpots=[],this.scanned=[],this._buildObstacles()}count(e,t=1,n=null,r=null){this.counts[e]=(this.counts[e]||0)+t,n!==null&&this.log&&this.log.push([e,n,r])}_idx(e,t){let n=this.T,r=Math.max(0,Math.min(n.res-1,Math.round((e-n.origin)/n.texel-.5)));return Math.max(0,Math.min(n.res-1,Math.round((t-n.origin)/n.texel-.5)))*n.res+r}sand(e,t){return this.T.sand[this._idx(e,t)]/255}rockM(e,t){return this.T.rock[this._idx(e,t)]}pathM(e,t){return this.T.path?this.T.path[this._idx(e,t)]/255:0}slope(e,t,n=.8){let r=this.ground;return Math.hypot(r(e+n,t)-r(e-n,t),r(e,t+n)-r(e,t-n))/(2*n)}downhill(e,t,n=1){let r=this.ground,i=r(e+n,t)-r(e-n,t),a=r(e,t+n)-r(e,t-n),o=Math.hypot(i,a)||1;return[-i/o,-a/o]}_buildObstacles(){let e=this.obs,t=this.colliders,n=new Set;if(this.village)for(let e of this.village.buildings)e.stilts&&n.add(e.name);let r=[];if(this.village)for(let e of this.village.buildings)e.stilts&&r.push(e);if(this.doorways=[],t){for(let n of t.boxes){let t=n.tag;if(t===`house`&&r.some(e=>Math.hypot(e.x-n.center.x,e.z-n.center.z)<.5)){e.box(n.center.x,n.center.z,n.half.x,n.half.z,n.rotY,-.6,`hutFloor`);continue}let i=.06;if(t===`stairs`||t===`stoop`||t===`porch`||t===`ladder`||t===`pierStep`?i=.9:t===`boardwalk`||t.startsWith(`pier`)?i=.4:n.walkable&&(i=.3),e.box(n.center.x,n.center.z,n.half.x,n.half.z,n.rotY,i,t),t===`stairs`||t===`stoop`){let t=Math.sin(n.rotY),r=Math.cos(n.rotY);e.capsule(n.center.x,n.center.z,n.center.x+t*3.2,n.center.z+r*3.2,.9,0,`doorway`),this.doorways.push({x:n.center.x,z:n.center.z,fx:t,fz:r})}}for(let n of t.cylinders)e.circle(n.x,n.z,n.radius,n.tag===`pile`?.25:.05,n.tag)}if(this.village){let t=[this.village.path,...this.village.sidePaths||[]].filter(Boolean);for(let n of t){let t=n.samples,r=(n.width||1.8)/2;for(let n=0;n<t.length-1;n++)e.capsule(t[n].p.x,t[n].p.z,t[n+1].p.x,t[n+1].p.z,r,.35,`boardwalk`)}}let i=z.pier;e.capsule(i.x,i.zStart-3,i.x,i.zEnd+i.headDepth,i.width/2,.6,`pier`);let a=z.spawn.position;if(e.circle(a.x,a.z,3.5,0,`spawn`),this.village)for(let t of this.village.getFootprints())t.kind===`prop`&&e.circle(t.x,t.z,t.r*.55,0,`prop`);let o=this.vegetation&&this.vegetation.records;if(o){for(let t of o.palms||[])e.circle(t.x,t.z,.3*(t.s||1),.05,`palm`);for(let t of o.trees||[])e.circle(t.x,t.z,.45*(t.s||1),.05,`tree`);for(let t of o.bananas||[])e.circle(t.x,t.z,.3,.05,`banana`);for(let t of o.youngPalms||[])e.circle(t.x,t.z,.2,.05,`youngPalm`)}if(this.rocks)for(let t of this.rocks.instances)e.circle(t.x,t.z,t.size*.8,.02,`rock`)}clear(e,t,n,{path:r=.25,spacing:i=1,ignore:a=null}={}){return this.obs.dist(e,t,a)<n||r!==null&&this.T.pathDistance(e,t)<n+r?!1:this.occ.free(e,t,n,i)}take(e,t,n){this.occ.add(e,t,n)}addBox(e,t,r,i,a,o,s,c){this.colliders&&(this.colliders.addBox(new n(e,t,r),new n(i,a,o),s,{tag:c}),this.obs.box(e,r,i,o,s,.05,c),this.newColliders++)}addCyl(e,t,n,r,i,a){this.colliders&&(this.colliders.addCylinder(e,t,n,r,i,{tag:a}),this.obs.circle(e,t,n,.05,a),this.newColliders++)}run(){let e={},t=performance.now(),n=(n,r)=>{r.call(this);let i=performance.now();e[n]=i-t,t=i};return n(`village`,this._village),n(`boats`,this._boatsAndYards),n(`logs`,this._logs),n(`palms`,this._palmLitter),n(`wrack`,this._wrack),n(`coves`,this._coves),n(`mask`,this._mask),this.timings=e,this}_buildingBoxes(){let e=[];if(!this.village||!this.colliders)return e;let t=this.colliders.boxes.filter(e=>e.tag===`house`||e.tag===`shed`);for(let n of this.village.buildings){let r=null,i=1/0;for(let e of t){let t=Math.hypot(e.center.x-n.x,e.center.z-n.z);t<i&&(i=t,r=e)}r&&i<1&&e.push({name:n.name,stilts:n.stilts,x:r.center.x,z:r.center.z,hx:r.half.x,hz:r.half.z,ry:r.rotY,floorY:n.floorY,shed:r.tag===`shed`})}return e}_hw(e,t,n){let r=Math.cos(e.ry),i=Math.sin(e.ry);return[e.x+t*r+n*i,e.z-t*i+n*r]}_village(){let e=this.rand,t=this._buildingBoxes();this.houses=t;let n={crates:3,traps:3,barrels:2,junk:2.5,stones:1,firewood:.8,boards:1},r=t=>{let r=0;for(let e in n)t.has(e)||(r+=n[e]);let i=e()*r;for(let e in n)if(!t.has(e)&&(i-=n[e],i<=0))return e;return`crates`};for(let n of t){if(n.stilts){this._underHut(n);continue}let t=[],i=.45;for(let e of[-.6,0,.6])t.push({lx:e*n.hx,lz:-n.hz-i,ry:Math.PI,wall:`back`});for(let e of[-1,1])for(let r of[-.5,.1])t.push({lx:e*(n.hx+i),lz:r*n.hz,ry:e*Math.PI/2,wall:`side`});for(let e of[-1,1])t.push({lx:e*(n.hx+.9),lz:-n.hz-.9,ry:Math.PI-e*Math.PI/4,wall:`corner`});for(let n=t.length-1;n>0;n--){let r=Math.floor(e()*(n+1));[t[n],t[r]]=[t[r],t[n]]}let a=n.shed?1+Math.floor(e()*2):2+Math.floor(e()*2),o=new Set;for(let e of t){if(a<=0)break;let[t,i]=this._hw(n,e.lx,e.lz),s=r(o);this._group(s,t,i,n.ry+e.ry,n)&&(a--,o.add(s))}}for(let[t,n,r,i]of[[`crates`,34.4,-114.4,.3],[`barrels`,47.6,-114.8,-.4],[`traps`,60.4,-63.2,.2],[`crates`,50.6,-62.5,-.2],[`traps`,76.2,-66,-.1],[`junk`,86.5,-66.5,.3],[`barrels`,42.2,-67.8,.5],[`crates`,96.8,-62.8,-.1]])for(let a=0;a<8;a++){let o=n+(e()-.5)*a*.6,s=r+(e()-.5)*a*.6;if(this._group(t,o,s,i,null))break}}_underHut(e){let t=this.rand,n=this.ground,r=e=>e.tag===`hutFloor`,i=[`traps`,`floats`,`crates`,`oars`,`coil`],a=0;for(let o=0;o<40&&a<4;o++){let o=(t()-.5)*e.hx*1.5,s=(t()-.5)*e.hz*1.5,[c,l]=this._hw(e,o,s),u=i[a%i.length],d=u===`oars`?1.2:.55;if(!this.clear(c,l,d,{ignore:r,path:.1}))continue;let f=n(c,l);if(u===`traps`)this.inst.add(`trap`,c,f-.02,l,e.ry+(t()-.5)*.3,this._tone()),t()<.7&&this.inst.add(`trap`,c+.03,f+.29,l,e.ry+(t()-.5)*.3,this._tone()),this.addBox(c,f+.3,l,.48,.3,.28,e.ry,`trap`);else if(u===`floats`)for(let e=0;e<4+Math.floor(t()*5);e++)this._float(c+(t()-.5)*.8,l+(t()-.5)*.8);else if(u===`crates`)this.inst.add(`crate`,c,f-.02,l,e.ry+(t()-.5)*.2,this._tone()),this.addBox(c,f+.2,l,.33,.21,.24,e.ry,`crate`);else if(u===`oars`){let r=e.ry+(t()-.5)*.4,i=Math.cos(r),a=Math.sin(r);for(let e of[-.12,.12]){let r=[c-i*1.1+a*e,f+.03,l+a*1.1+i*e],o=[c+i*1.1+a*e,f+.03,l-a*1.1+i*e];r[1]=n(r[0],r[2])+.025,o[1]=n(o[0],o[2])+.012,wn(this.B,r,o,t(),t()<.5?L(12729134):L(3108776))}}else vn(this.B,c,f-.01,l,.07,.26+t()*.1,4,t(),t()<.5?kn.rope:kn.ropeBlue);this.take(c,l,d),this.count(`hut:`+u),a++}}_tone(){let e=this.rand;return[.82+e()*.26,.84+e()*.18,.8+e()*.18]}_float(e,t){Io(this.B,this.ground,e,t,this.rand)}_group(e,t,n,r,i){let a=this.rand,o=this.ground,s=this.B,c={crates:.75,barrels:.75,traps:.8,junk:.9,stones:.8,firewood:.75,boards:1.6}[e]||.8;if(!this.clear(t,n,c,{path:.3})||this.slope(t,n)>.45)return!1;let l=ho(o,t,n,c*.7);if(l<1.2)return!1;let u=Math.cos(r),d=Math.sin(r),f=(e,r)=>[t+e*u+r*d,n-e*d+r*u];if(e===`crates`){let e=2+Math.floor(a()*3),i=[[-.34,0],[.34,.02],[0,.48],[.66,.5]],s=.4;for(let t=0;t<e;t++){let[e,n]=f(i[t][0]+(a()-.5)*.05,i[t][1]*.45);this.inst.add(`crate`,e,o(e,n)-.02,n,r+(a()-.5)*.15,this._tone())}if(a()<.75){let[e,t]=f((a()-.5)*.3,0);this.inst.add(`crate`,e,l+.38,t,r+(a()-.5)*.4,this._tone()),s=.8,a()<.3&&(this.inst.add(`crate`,e+.02,l+.76,t,r+(a()-.5)*.5,this._tone()),s=1.18)}this.addBox(t,l+s/2,n,.72,s/2,.36,r,`crate`)}else if(e===`barrels`){let e=2+Math.floor(a()*2);for(let t=0;t<e;t++){let[n,r]=f((t-(e-1)/2)*.58+(a()-.5)*.06,(a()-.5)*.12),i=o(n,r);this.inst.add(`barrel`,n,i-.03,r,a()*Qo,[.8+a()*.3,.85+a()*.15,.8+a()*.15]),this.addCyl(n,r,.3,i,i+.9,`barrel`)}if(a()<.4){let[e,t]=f((a()-.5)*.4,.75);if(this.clear(e,t,.5,{path:.3})){let n=o(e,t),i=r+(a()-.5)*.6,s=Math.cos(i)*.44,c=-Math.sin(i)*.44;this.inst.add(`barrel`,e-s,n+.26,t-c,i,[.8,.8,.75],0,-Math.PI/2),this.addBox(e,n+.28,t,.46,.28,.3,i,`barrel`),this.take(e,t,.5)}}}else if(e===`traps`){let e=2+Math.floor(a()*3),i=l-.02;for(let t=0;t<e;t++){let[n,s]=f(t<2?(t-.5)*.96*(e>1):(a()-.5)*.4,0),c=t<2?o(n,s)-.02:i+.31*(t-1);this.inst.add(`trap`,n,c,s,r+(a()-.5)*.2,this._tone())}let c=.3+.31*Math.max(0,e-2);this.addBox(t,l+c/2,n,1,c/2,.3,r,`trap`);for(let e=0;e<1+Math.floor(a()*4);e++){let[e,t]=f((a()-.5)*1.6,.45+a()*.35);this._float(e,t)}if(a()<.6){let[e,t]=f(1.1+a()*.3,.3);this.clear(e,t,.35,{path:.3})&&vn(s,e,o(e,t)-.01,t,.07,.24+a()*.1,4,a(),a()<.5?kn.rope:kn.ropeBlue)}}else if(e===`junk`){let[e,t]=f(-.35,.1);Ao(s,o,e,t,a),a()<.5&&Ao(s,o,e+.02,t,a,{y:o(e,t)+.1,sink:0}),this.addCyl(e,t,.36,l,l+.3,`tyre`);let[n,i]=f(.45,.2);if(Cn(s,n,o(n,i)-.01,i,[kn.blue,kn.white,L(13191738),L(4161365)][Math.floor(a()*4)],a()),a()<.6){let[e,t]=f(.1,-.2);s.pushAt(e,o(e,t),t,r),s.box(`wood`,0,.62,0,.2,1.3,.025,{grain:1,rx:-.22,data:Fn(a(),.9,a()<.3?.3:0,0),tint:[1,1,1]}),s.pop()}for(let e=0;e<2+Math.floor(a()*3);e++){let[e,t]=f((a()-.5)*1.4,.3+a()*.4),n=.05+a()*.08;mo(s,o,e,t,n*1.2,n*.7,n,a,{palette:1+a()*.6,sink:.35})}}else if(e===`stones`){let e=5+Math.floor(a()*6);for(let r=0;r<e;r++){let e=a()*Qo,i=Math.sqrt(a())*.55,c=t+Math.cos(e)*i,l=n+Math.sin(e)*i,u=.09+a()*.12,d=(1-i/.55)*.2*(r>2);mo(s,o,c,l,u*(1+a()*.4),u*.75,u,a,{palette:1.1+a()*.55,sink:.3,angular:.6,y:ho(o,c,l,u)+d})}this.addCyl(t,n,.5,l,l+.35,`stones`)}else if(e===`firewood`){let[e,t]=f(0,.05);bn(s,e,o(e,t)-.02,t,r,{range:(e,t)=>e+(t-e)*a(),next:a}),this.addBox(e,l+.3,t-0,.6,.3,.3,r,`woodpile`)}else if(e===`boards`){let[e,t]=f(0,.3),n=Ro(s,o,e,t,r+(a()-.5)*.15,a,{len:2+a()*.8});this.addBox(e,l+n.h/2,t,n.L/2,n.h/2,.45,r,`boards`)}return this.take(t,n,c),this.count(`group:`+e,1,t,n),!0}_boatsAndYards(){let e=this.rand,t=this.ground,n=this.B,r=[{at:[27,-62.5],ry:-.25,up:!0,hull:L(5214042),bottom:L(3092271)},{at:[101,-61.5],ry:.6,up:!1,hull:L(15259824),bottom:L(10108976),rz:.22}];for(let i of r)for(let r=0;r<30;r++){let a=i.at[0]+(e()-.5)*r*.5,o=i.at[1]+(e()-.5)*r*.4,s=Math.cos(i.ry),c=Math.sin(i.ry),l=!0;for(let e of[-1.8,-.9,0,.9,1.8])this.clear(a+c*e,o+s*e,.95,{path:.4})||(l=!1);if(!l)continue;let u=t(a,o);if(!(u<1.3)){In(n,a,u+(i.up?-.04:.02),o,i.ry,{upsideDown:i.up,seed:e(),hull:i.hull,bottom:i.bottom,trim:kn.white,rz:i.rz||0,oars:!i.up}),this.addBox(a,u+.4,o,.72,.45,2,i.ry,`rowboat`);for(let e of[-1.8,-.9,0,.9,1.8])this.take(a+c*e,o+s*e,.95);if(i.up){let r=a+s*1.2,i=o-c*1.2;wn(n,[r+c*1.2,t(r+c*1.2,i+s*1.2)+.025,i+s*1.2],[r-c*1.1,t(r-c*1.1,i-s*1.1)+.012,i-s*1.1],e(),L(14726720)),this._float(r+.4,i-.3)}this.count(`skiff`,1,a,o);break}}for(let[r,i,a]of[[23.8,-121.2,1.9],[70.5,-125.8,-1.2],[90.5,-143.6,2.6]])for(let o=0;o<16;o++){let s=r+(e()-.5)*o*.5,c=i+(e()-.5)*o*.5;if(!this.clear(s,c,.9,{path:.3})||this.slope(s,c)>.3)continue;let l=Math.cos(a),u=Math.sin(a);Lo(n,t,s-l*.2,c+u*.2,a,e),this.addBox(s,t(s,c)+.35,c,.85,.35,.35,a,`wheelbarrow`),this.take(s,c,.9),this.count(`wheelbarrow`,1,s,c);break}for(let r=0;r<20;r++){let i=-6+(e()-.5)*r*.8,a=-64.5+(e()-.5)*r*.5;if(!this.clear(i,a,2.6,{path:.5}))continue;let o=t(i,a);if(!(o<1.5||o>3.5)){for(let r=0;r<9;r++){let o=r/9*Qo+e()*.2,s=.1+e()*.05;mo(n,t,i+Math.cos(o)*.62,a+Math.sin(o)*.62,s*1.2,s*.8,s,e,{palette:.1+e()*.3,sink:.3,angular:.4})}for(let r=0;r<4;r++)go(n,t,i+(e()-.5)*.3,a+(e()-.5)*.3,e()*Qo,.5+e()*.3,.03,e,{tone:[.16,.14,.13],weather:.3,twigs:0});for(let t of[.4+e()*.3,Math.PI+.2+e()*.3]){let n=i+Math.cos(t)*1.75,r=a+Math.sin(t)*1.75,o=this._scanLog(Wo.TRUNK,n,r,-t+Math.PI/2,1+e()*.15,1.1,.2);this._logCollider(n,r,-t+Math.PI/2,o.len,o)}this.take(i,a,2.4),this.firePit=[i,a],this.count(`firePit`,1,i,a);break}}}_beachPoints(e,t,n=1){let r=[],i=this.ground;for(let a=-190;a<190;a+=n)for(let o=-95;o<-20;o+=.5){let s=i(a,o);s<e||s>t||this.sand(a,o)<.55||this.rockM(a,o)>.3||r.push([a+(this.rand()-.5)*n,o+(this.rand()-.5)*.5,s])}return r}_logs(){let e=this.rand;this.ground,this.B;let t=this._beachPoints(1.9,3.2,1);for(let n=t.length-1;n>0;n--){let r=Math.floor(e()*(n+1));[t[n],t[r]]=[t[r],t[n]]}let n=0,r=0;for(let[r,i]of t){if(n>=26)break;let[t,a]=this.downhill(r,i),o=r+t*$o,s=i+a*$o,c=2.6+e()*3.8,l=.16+e()*.16,[u,d]=this.downhill(o,s),f=Math.atan2(u,d)+(e()-.5)*.9;if(!this._logClear(o,s,f,c,l+.3,3.5))continue;let p=this._scanLog(Wo.TRUNK,o,s,f,c/Go[0][0],l/.14,.2+e()*.2);this._logTake(o,s,f,p.len,p.r+.2),this._logCollider(o,s,f,p.len,p),this.log.push([`bigLog`,o,s]),n++}let i=this._beachPoints(1.3,2,1.5);for(let t=i.length-1;t>0;t--){let n=Math.floor(e()*(t+1));[i[t],i[n]]=[i[n],i[t]]}for(let[t,n]of i){if(r>=36)break;let[i,a]=this.downhill(t,n),o=t+i*$o,s=n+a*$o,c=1.1+e()*2,l=.06+e()*.08,[u,d]=this.downhill(o,s),f=Math.atan2(u,d)+(e()-.5)*1.4;if(!this._logClear(o,s,f,c,l+.2,1.2))continue;let p=e()<.35?Wo.TRUNK:e()<.5?Wo.BRANCH_A:Wo.BRANCH_B,m=p===Wo.TRUNK?c/Go[0][0]:1.4+e()*1.6,h=this._scanLog(p,o,s,f,m,p===Wo.TRUNK?l/.14:m*(.8+e()*.3),.15+e()*.2);this._logTake(o,s,f,h.len,h.r+.15),h.r>.1&&this._logCollider(o,s,f,h.len,h),r++}this.count(`logs:big`,n),this.count(`logs:mid`,r)}_scanLog(e,t,n,r,i,a,o){let s=this.ground,c=this.rand,l=Go[e],u=l[0]*i,d=l[1]*a,f=Math.cos(r),p=-Math.sin(r),m=ho(s,t-f*u*.3,n-p*u*.3,d*.4),h=ho(s,t+f*u*.3,n+p*u*.3,d*.4),g=Math.atan2(h-m,u*.6),_=Math.min((m+h)/2,s(t,n)+.05)+d*(.5-o);return this.scanned.push({asset:e,x:t,y:_,z:n,yaw:r,pitch:g,roll:(c()-.5)*.6+(c()<.3?Math.PI:0),sx:i,sy:a,sz:a*(.9+c()*.2),rnd:c()}),{y:_,r:d/2,len:u}}_logClear(e,t,n,r,i,a){let o=Math.cos(n),s=-Math.sin(n);for(let n=-.5;n<=.5;n+=.25){let c=e+o*r*n,l=t+s*r*n;if(this.obs.dist(c,l)<i||this.T.pathDistance(c,l)<i+.3||!this.occ.free(c,l,i+a*(n===0?1:.3)))return!1}return!0}_logTake(e,t,n,r,i){let a=Math.cos(n),o=-Math.sin(n);for(let n=-.5;n<=.5;n+=.25)this.take(e+a*r*n,t+o*r*n,i)}_logCollider(e,t,n,r,i){let a=i.y+i.r,o=this.ground(e,t)-.1;this.addBox(e,(a+o)/2,t,r/2,(a-o)/2,i.r*.95,n,`log`)}_palmLitter(){let e=this.rand,t=this.ground,n=this.B,r=this.vegetation&&this.vegetation.records;if(!r)return;let i=z.village.center;for(let a of r.palms){let r=Math.hypot(a.x-i.x,a.z-i.z);if(r>300)continue;let o=t(a.x,a.z);if(o<.9||o>30||Math.max(this.sand(a.x,a.z),this.pathM(a.x,a.z),+(r<75))<.3)continue;let s=r<160?1:.6,[c,l]=this.downhill(a.x,a.z),u=e()<.6*s?1+Math.floor(e()*e()*5):0;for(let r=0;r<u;r++){let r=Math.atan2(l,c)+(e()-.5)*2.2,i=.45+e()*1.8,o=a.x+Math.cos(r)*i,s=a.z+Math.sin(r)*i;this.clear(o,s,.12,{path:.15,spacing:.9})&&(bo(n,t,o,s,e,{age:e()<.3?e()*.3:.35+e()*.65}),this.take(o,s,.11),this.count(`coconut`))}if(e()<.35*s){let r=e()*Qo,i=.6+e()*1.5,o=a.x+Math.cos(r)*i,s=a.z+Math.sin(r)*i;this.clear(o,s,.1,{path:.15})&&(Co(n,t,o,s,e),this.count(`husk`))}let d=e()<.45*s*s?1+Math.floor(e()*1.5):0;for(let r=0;r<d;r++){let r=e()*Qo,i=2.4+e()*1.6,o=a.x+Math.cos(r)*.5,s=a.z+Math.sin(r)*.5,c=-r+(e()-.5)*.4,l=!0;for(let e of[.3,.6,.95]){let t=o+Math.cos(r)*i*e,n=s+Math.sin(r)*i*e;(this.obs.dist(t,n,e=>e.tag===`palm`)<.3||this.T.pathDistance(t,n)<.4)&&(l=!1)}l&&(Do(n,t,o,s,c,i,e,{dry:.35+e()*.65}),this.count(`frond`,1,o,s))}}}_wrack(){let e=this.rand,t=this.ground;this.B;let n=this.noise,r=[];for(let n=-200;n<200;n+=.5)for(let i=-90;i<-25;i+=.5){let a=n+(e()-.5)*.5,o=i+(e()-.5)*.5,s=t(a,o);s<.3||s>2.6||this.sand(a,o)<.5||this.rockM(a,o)>.35||r.push([a,o,s])}this.wrackPoints=0;for(let[i,a,o]of r){let r=1.5+.22*n.noise(i/19,a/19),s=Math.max(.025,this.slope(i,a)),c=Math.abs(o-r)/s,l=Math.exp(-(c/.9)*(c/.9)),u=2.15+.25*n.noise(i/31+7,a/31),d=Math.abs(o-u)/s,f=Math.exp(-(d/1.6)*(d/1.6))*.6,p=R(-.35,.45,n.noise(i/8.5,a/8.5+3)),m=R(.35,.6,o)*R(1.15,.9,o),h=l*p,g=e();if(h<.02&&f<.02&&m<.02)continue;this.wrackPoints++;let _=[[`conch`,.004*(h+f*.5)],[`scanBranch`,.03*(h+f)],[`twig`,.05*(h+f)],[`coral`,.04*(h+f*.7)+.005*m],[`pumice`,.012*(h+f*.5)],[`shell`,.016*(h+f*.5)+.006*m],[`coconut`,.012*(h+f)],[`husk`,.008*(h+f)],[`rope`,.0045*(l+f)],[`net`,.0012*(l+f)],[`float`,.0022*(l+f)],[`litter`,.0022*(l+f)],[`plank`,.0018*(l+f)],[`stone`,.01*h]],v=0,y=null;for(let[e,t]of _)if(v+=t,g<v){y=e;break}if(!y)continue;let[b,x]=this.downhill(i,a),S=i+b*$o,C=a+x*$o;this._wrackItem(y,S,C,t(S,C),e)}}_wrackItem(e,t,n,r,i){let a=this.ground,o=this.B,s={scanBranch:.35,conch:.1,weed:.3,weedFresh:.25,grass:.22,twig:.25,coral:.08,pumice:.06,shell:.05,coconut:.12,husk:.1,rope:.3,net:.7,float:.2,litter:.15,plank:.6,stone:.12}[e];if(this.clear(t,n,s,{path:.2,spacing:e===`weed`||e===`grass`?.55:.8})){switch(e){case`weed`:{let e=.16+i()*i()*.5,[s,c]=this.downhill(t,n),l=Math.atan2(s,-c)+(i()-.5)*.5;wo(o,a,t,n,e,.015+e*.06,i,{dry:Math.min(1,R(1.2,1.9,r)*.7+.25+i()*.25),aspect:1.2+i()*.8,rot:l,strands:1+Math.floor(i()*3)}),this.take(t,n,e*1.3);break}case`weedFresh`:{let e=.1+i()*.2;wo(o,a,t,n,e,.02+e*.1,i,{dry:i()*.15,strands:2}),this.take(t,n,e);break}case`grass`:{let[e,r]=this.downhill(t,n);To(o,a,t,n,.1+i()*.22,i,{dir:Math.atan2(e,-r)}),this.take(t,n,.2);break}case`twig`:{let e=.3+i()*i()*1.4;go(o,a,t,n,i()*Qo,e,.012+i()*.02*e,i,{weather:.9+i()*.1}),this.take(t,n,e*.4);break}case`coral`:ko(o,a,t,n,.07+i()*.12,i),this.take(t,n,.08);break;case`shell`:Oo(o,a,t,n,.045+i()*i()*.1,i),this.take(t,n,.05);break;case`scanBranch`:{let e=i()<.5?Wo.BRANCH_A:Wo.BRANCH_B,r=.6+i()*1.2,[a,o]=this.downhill(t,n);this._scanLog(e,t,n,Math.atan2(a,o)+(i()-.5)*2,r,r*(.8+i()*.3),.15+i()*.2),this.take(t,n,.3*r);break}case`conch`:{let e=.8+i()*.5,r=Go[Wo.SHELL],o=a(t,n)+r[1]*e*.3;this.scanned.push({asset:Wo.SHELL,x:t,y:o,z:n,yaw:i()*Qo,pitch:(i()-.5)*.4,roll:i()<.3?Math.PI:(i()-.5)*.4,sx:e,sy:e,sz:e,rnd:i()}),this.take(t,n,.1);break}case`pumice`:{let e=.025+i()*.045;mo(o,a,t,n,e*1.25,e*.8,e,i,{palette:.6+i()*.08,sink:.25,tint:[1.08,1.06,1.02]}),this.take(t,n,e);break}case`coconut`:bo(o,a,t,n,i,{age:.4+i()*.6}),this.take(t,n,.12);break;case`husk`:Co(o,a,t,n,i),this.take(t,n,.1);break;case`rope`:No(o,a,t,n,i,{tangle:i()<.3}),this.take(t,n,.3);break;case`net`:Po(o,a,t,n,i),this.take(t,n,.7);break;case`float`:this._float(t,n),this.take(t,n,.2);break;case`litter`:(i()<.55?jo:Mo)(o,a,t,n,i),this.take(t,n,.15);break;case`plank`:{let e=.6+i()*1.4;_o(o,a,t,n,i()*Qo,e,.1+i()*.12,.02+i()*.015,i,{paint:i()<.35?.2+i()*.3:0,tint:i()<.35?[L(6143152),L(15502198),L(9224928),L(15781756)][Math.floor(i()*4)]:void 0}),this.take(t,n,e*.45);break}case`stone`:{let e=.05+i()*.09;mo(o,a,t,n,e*1.2,e*.65,e,i,{palette:.3+i()*.6,sink:.35}),this.take(t,n,e);break}}this.count(`wrack:`+e,1,t,n)}}_coves(){let e=this.rand,t=this.ground,n=this.B,r=this.noise,i=z.village.center,a=0;for(let o=-200;o<330;o+=1.2)for(let s=-520;s<520;s+=1.2){let c=s+(e()-.5)*1.2,l=o+(e()-.5)*1.2,u=t(c,l);if(u<-.35||u>2.6)continue;let d=this.rockM(c,l);if(d<.3)continue;let f=this.slope(c,l);if(f>.55)continue;let p=Math.hypot(c-i.x,l-i.z),m=p<260?1:.3,h=.2*R(-.1,.5,r.noise(c/7,l/7+11))*m*R(.3,.6,d)*(1-f)*(p<320);if(e()>h)continue;let g=.1+e()*e()*.34;this.clear(c,l,g*1.1,{path:.2,spacing:.9})&&(mo(n,t,c,l,g*(1+e()*.5),g*(.55+e()*.3),g,e,{palette:.05+e()*.45,sink:.3,tilt:.5,angular:e()*.5,detail:+(p<200)}),this.take(c,l,g),this.rockSpots.push([c,l,g]),a%10==0&&this.log.push([`cove`,c,l]),a++)}this.count(`coveStones`,a)}_mask(){let e=this.T,t=1024,n=e.size/t,r=new Uint8Array(t*t*4),i=this.noise,a=e.res,o=e.heights,s=Math.round(n/e.texel),c=z.village.center;for(let l=0;l<t;l++){let u=e.origin+(l+.5)*n,d=Math.min(a-1,l*s);for(let f=0;f<t;f++){let p=Math.min(a-1,f*s),m=d*a+p,h=o[m];if(h<-.6||h>45)continue;let g=e.origin+(f+.5)*n,_=e.sand[m]/255,v=e.rock[m],y=e.path?e.path[m]/255:0,b=i.noise(g/9,u/9),x=i.noise(g/3.1+5,u/3.1),S=R(1.05,1.35,h)*R(2.3,1.8,h)*R(.4,.7,_),C=R(.3,.6,h)*R(1.2,.95,h)*_,w=R(2,2.6,h)*_*(1-R(6,10,h)),T=R(-.4,.1,h)*R(3.5,2.2,h),E=R(120,70,Math.hypot(g-c.x,u-c.z))*R(1.5,2.5,h)*(1-_*.6),D=S*(.25+.45*R(-.3,.5,b))+C*.12+w*.06*R(.2,.7,x);D+=T*R(.25,.5,v)*.6,D+=y*.45*R(1,2,h),D+=E*.12*R(0,.6,x);let O=T*R(.3,.6,v)*(.35+.5*R(-.4,.4,b));O+=S*.06+y*.08*R(1.5,2.5,h)+E*.05;let k=S*(.35+.5*R(-.2,.6,x))+C*.25+w*.08;k+=T*R(.25,.5,v)*.1;let A=Math.max(0,Math.min(1,.22+_*.5-v*.35+x*.12+E*.1)),ee=(l*t+f)*4;r[ee]=Math.min(255,D*255),r[ee+1]=Math.min(255,O*255),r[ee+2]=Math.min(255,k*255),r[ee+3]=A*255}}let l=(i,a,o,s,c)=>{let l=Math.floor((i-o-e.origin)/n),u=Math.floor((i+o-e.origin)/n),d=Math.floor((a-o-e.origin)/n),f=Math.floor((a+o-e.origin)/n);for(let p=Math.max(0,d);p<=Math.min(1023,f);p++)for(let d=Math.max(0,l);d<=Math.min(1023,u);d++){let l=e.origin+(d+.5)*n,u=e.origin+(p+.5)*n,f=R(o,o*.4,Math.hypot(l-i,u-a)),m=(p*t+d)*4;r[m]=Math.min(255,r[m]+s*f*255),r[m+1]=Math.min(255,r[m+1]+c*f*255)}};if(this.rocks)for(let e of this.rocks.instances)e.y<4&&e.y>-1.5&&e.size>.5&&l(e.x,e.z,e.size*2.2+1,.25,.35);for(let[e,t,n]of this.rockSpots)l(e,t,n*4+.6,.15,.1);this.mask={data:r,res:t,texel:n}}},as=`tint`,os=`vdata`,ss=new g({name:`debrisStone`,deps:[Re],code:`
fn debrisHashS( s: f32, k: f32 ) -> f32 { return fract( sin( s * 91.345 + k ) * 47453.5453 ); }

struct DebrisStone {
	albedo: vec3f,
	rough: f32,
	hd: f32,
};

// Stone surface shared with the pebble field.
fn debrisStoneSurface( T: vec4f, N: vec3f, pal: f32, style: f32, seed: f32, tile: f32 ) -> DebrisStone {
	let basalt = ${I(.15,.145,.14)}; let grey = ${I(.4,.38,.35)};
	let lime = ${I(.76,.72,.63)}; let ochre = ${I(.55,.4,.28)};
	var col = mix( basalt, grey, smoothstep( 0.12, 0.42, pal ) );
	col = mix( col, lime, smoothstep( 0.5, 0.72, pal ) );
	col = mix( col, ochre, smoothstep( 0.88, 0.97, pal ) );
	// per stone tone, speckles and pits, soft blotches
	col = col * ( debrisHashS( seed, 1.7 ) * 0.3 + 0.85 );
	col = col * ( ( T.b - 0.5 ) * 0.5 + 1.0 ) * ( ( T.a - 0.5 ) * 0.6 + 1.0 );
	let pits = smoothstep( 0.62, 0.85, T.b ) * smoothstep( 0.45, 0.8, pal );
	col = mix( col, col * 0.55, pits * 0.6 );
	// quartz veins / bands in a few of the dark stones
	let vein = smoothstep( 0.03, 0.0, abs( fract( T.a * 7.0 + seed * 3.0 ) - 0.5 ) ) * step( debrisHashS( seed, 5.1 ), 0.25 ) * ( 1.0 - smoothstep( 0.3, 0.5, pal ) );
	col = mix( col, ${I(.7,.68,.62)}, vein * 0.7 );
	var rough = 0.74 + T.b * 0.12 - smoothstep( 0.0, 0.3, pal ) * 0.0;
	// field / wall stones: lichen crusts on the upper faces, soil at the bottom
	let s1 = step( 0.5, style ) * step( style, 1.5 );
	let lichen = smoothstep( 0.55, 0.68, T.a + N.y * 0.18 + debrisHashS( seed, 2.3 ) * 0.15 ) * s1;
	let lichenCol = mix( ${I(.62,.64,.55)}, ${I(.72,.52,.2)}, step( 0.72, T.g ) );
	col = mix( col, lichenCol, lichen * 0.75 );
	col = mix( col, col * 0.62, smoothstep( 0.2, -0.6, N.y ) * s1 );
	// whitewashed stones: lime wash, worn through on edges and blotches
	let s2 = step( 1.5, style );
	let wash = smoothstep( 0.5, 0.58, T.a + ( T.r - 0.45 ) * 0.4 + debrisHashS( seed, 6.6 ) * 0.12 ) * s2;
	col = mix( col, ${I(.8,.79,.75)} * ( T.b * 0.14 + 0.86 ) * ( ( T.a - 0.5 ) * 0.3 + 1.0 ), wash );
	rough = mix( rough, 0.93, wash );
	var o: DebrisStone;
	o.albedo = col;
	o.rough = rough;
	o.hd = ( T.r * 0.6 + T.b * 0.3 ) * tile * mix( 0.06, 0.02, wash );
	return o;
}
`}),cs=`
	let seed = in.vs.vData.x; let kind = in.vs.vData.y; let prm = in.vs.vData.z; let size = in.vs.vData.w;
	let p = in.P;
	// ---- distance fade: small items dissolve (Bayer screen-door, see LODFade) far away
	let fadeEnd = clamp( size * 650.0, 22.0, 450.0 );
	if ( ! lodFadeVisible( in.pixel, 1.0 - smoothstep( fadeEnd * 0.7, fadeEnd, length( p - frame.cameraPos ) ), false ) ) { discard; }
	let N = in.N;
	let uv0 = in.uv;
	let isStone = kind < 0.5;
	let isCoral = kind > 3.5 && kind < 4.5;
	let isWeed = kind > 1.5 && kind < 2.5;
	let isShell = kind > 2.5 && kind < 3.5;
	let isFrond = kind > 4.5 && kind < 5.5;
	let isDrift = kind > 5.5;
	let triK = isStone || isCoral;

	// ---- texture coordinates per kind (all three samples in uniform control flow)
	let tile = select( clamp( size * 1.1, 0.07, 0.9 ), 0.07, isCoral );
	let so = vec2f( debrisHashS( seed, 3.1 ), debrisHashS( seed, 7.9 ) );
	// fibre-aligned (coconut / frond), world xz (weed), shell uvs
	let fibA = select( select( vec2f( uv0.x * 3.0, uv0.y * 26.0 ), vec2f( uv0.x * 1.1, uv0.y * 45.0 ), isFrond ), vec2f( uv0.x * 0.3, uv0.y * 5.5 ), isDrift );
	let uvA0 = select( select( fibA, uv0 * vec2f( 0.5, 0.16 ), isShell ), p.xz / 0.42, isWeed );
	let uvB0 = select( select( uv0 * 1.3, vec2f( uv0.x * 1.4, uv0.y * 21.0 ), isDrift ), p.xz / 0.11 + 0.3, isWeed );
	let uvC0 = select( select( select( uv0 * 8.0, vec2f( uv0.x * 0.09, uv0.y * 0.9 ), isDrift ), vec2f( uv0.x * 5.0, uv0.y * 80.0 ), isFrond ), p.xz / 1.4, isWeed );
	let uvA = select( uvA0 + so, p.zy / tile, triK );
	let uvB = select( uvB0 + so.yx, p.xz / tile + 0.37, triK );
	let uvC = select( uvC0 + so * 2.0, p.xy / tile + 0.71, triK );
	let A = textureSample( terrainDetailTex, smpAniso4Repeat, uvA );
	let B = textureSample( terrainDetailTex, smpAniso4Repeat, uvB );
	let Cc = textureSample( terrainDetailTex, smpAniso4Repeat, uvC );
	let w = terrainTriWeights( N );
	let T3 = A * w.x + B * w.y + Cc * w.z;

	var col = vec3f( 0.5 );
	var rough = 0.8;
	var hd = 0.0;

	if ( isStone ) {

		let S = debrisStoneSurface( T3, N, fract( prm ), floor( prm ), seed, tile );
		col = S.albedo;
		rough = S.rough;
		hd = S.hd;

	} else if ( kind < 1.5 ) {

		// coconut: fibrous husk; green -> brown -> grey with age; split husk pieces show the
		// paler, coarser fibre
		let age = min( prm, 1.0 );
		let inner = step( 1.5, prm );
		var c = mix( ${I(.4,.42,.12)}, ${I(.37,.23,.11)}, smoothstep( 0.18, 0.55, age ) );
		c = mix( c, ${I(.36,.32,.27)}, smoothstep( 0.7, 0.95, age ) );
		c = mix( c, ${I(.52,.37,.21)}, inner );
		let fib = A.a * 0.7 + Cc.b * 0.3;
		c = c * ( ( fib - 0.5 ) * mix( 0.9, 1.4, inner ) + 1.0 );
		c = mix( c, c * 0.62, smoothstep( 0.55, 0.78, B.g ) * 0.7 );
		// the three germination pores / calyx at the stem end: dark
		col = c;
		rough = mix( 0.62, 0.86, max( smoothstep( 0.2, 0.6, age ), inner ) ) + fib * 0.08;
		hd = ( fib * 0.004 + Cc.b * 0.0015 ) * ( inner + 1.0 );

	} else if ( isWeed ) {

		// sargassum / seagrass wrack: golden and olive when fresh (wet sheen, air bladders),
		// drying to brittle black with bleached tips
		let dry = prm;
		var c = mix( ${I(.46,.3,.08)}, ${I(.26,.22,.08)}, smoothstep( 0.35, 0.7, Cc.a ) );
		c = mix( c, ${I(.12,.08,.04)}, smoothstep( 0.5, 0.7, A.a + ( Cc.a - 0.5 ) * 0.6 ) * 0.6 );
		c = mix( c, ${I(.075,.06,.045)}, smoothstep( 0.25, 0.75, dry ) );
		c = mix( c, ${I(.42,.38,.29)}, smoothstep( 0.62, 0.78, Cc.a + A.g * 0.2 ) * smoothstep( 0.5, 1.0, dry ) * 0.55 );
		let leaf = A.g;
		c = c * ( ( leaf - 0.4 ) * 0.8 + 1.0 );
		let bladder = smoothstep( 0.72, 0.82, B.b ) * ( 1.0 - dry );
		c = mix( c, ${I(.62,.5,.16)}, bladder * 0.6 );
		col = c;
		rough = mix( 0.55, 0.88, smoothstep( 0.2, 0.7, dry ) ) - bladder * 0.12;
		hd = leaf * 0.012 + B.b * 0.004 + bladder * 0.004 + Cc.a * 0.01;

	} else if ( isShell ) {

		// shells: ribbed cups with growth bands; turban shells with spiral bands
		let turban = step( 1.0, prm );
		let hue = fract( prm );
		var base = mix( ${I(.92,.9,.84)}, ${I(.9,.8,.62)}, smoothstep( 0.3, 0.5, hue ) );
		base = mix( base, ${I(.9,.64,.6)}, smoothstep( 0.62, 0.72, hue ) );
		base = mix( base, ${I(.8,.52,.3)}, smoothstep( 0.85, 0.95, hue ) );
		let dark = mix( ${I(.5,.32,.2)}, ${I(.35,.3,.32)}, step( 0.5, debrisHashS( seed, 4.4 ) ) );
		let ribs = sin( uv0.y * 19.0 ) * 0.5 + 0.5;
		let growth = sin( uv0.x * 38.0 + A.a * 6.0 ) * 0.5 + 0.5;
		let spiral = sin( uv0.x * 22.0 + uv0.y * 1.0 + A.a * 4.0 ) * 0.5 + 0.5;
		let bandK = mix( smoothstep( 0.6, 0.9, growth ) * 0.35 * step( 0.4, debrisHashS( seed, 8.8 ) ), smoothstep( 0.45, 0.75, spiral ) * 0.75, turban );
		var c = mix( base, dark, bandK );
		c = c * ( ribs * 0.12 + 0.92 ) * ( ( B.a - 0.5 ) * 0.2 + 1.0 );
		col = c;
		rough = 0.42 + A.b * 0.2;
		hd = mix( ribs * 0.0012, spiral * 0.0015, turban );

	} else if ( isCoral ) {

		// bleached coral rubble: porous (polyp cups), stained grey / algae in the older pieces;
		// coral heads: meandering grooves
		let head = step( 2.0, prm );
		let bleach = max( fract( prm ), step( 0.999, prm ) );
		let pit = smoothstep( 0.55, 0.82, T3.b );
		var c = mix( ${I(.5,.48,.42)}, ${I(.88,.86,.8)}, bleach );
		c = mix( c, ${I(.4,.42,.3)}, smoothstep( 0.6, 0.75, T3.a ) * ( 1.0 - bleach ) * 0.6 );
		let groove = ( 1.0 - smoothstep( 0.2, 0.34, T3.r ) ) * head;
		c = c * ( 1.0 - pit * 0.35 ) * ( 1.0 - groove * 0.4 );
		col = c;
		rough = 0.88;
		hd = pit * -0.0012 - groove * 0.004 + T3.a * 0.002;

	} else if ( isDrift ) {

		// driftwood: sun-bleached silver-grey with warmer, less weathered patches; open grain
		// (dark wavy lines along the wood), deep checks, flaking bark remnants in the grooves
		let bark = prm;
		let lines = smoothstep( 0.06, 0.0, abs( fract( A.a * 3.0 + Cc.a ) - 0.5 ) );
		let crack = smoothstep( 0.03, 0.0, abs( B.a - 0.5 ) ) * smoothstep( 0.35, 0.65, A.r );
		var c = mix( ${I(.63,.61,.57)}, ${I(.83,.81,.77)}, smoothstep( 0.3, 0.7, Cc.a + ( A.a - 0.5 ) * 0.5 ) );
		c = mix( c, ${I(.66,.57,.46)}, smoothstep( 0.6, 0.8, Cc.g ) * 0.45 );
		c = c * ( ( B.a - 0.5 ) * 0.5 + 1.0 ) * ( 1.0 - lines * 0.45 ) * ( 1.0 - crack * 0.75 );
		let barkM = smoothstep( 0.68, 0.72, Cc.g + ( B.g - 0.5 ) * 0.25 ) * step( 0.5, bark );
		c = mix( c, mix( ${I(.14,.1,.07)}, ${I(.27,.19,.12)}, A.a ), barkM );
		col = c;
		rough = 0.8 + crack * 0.12 - barkM * 0.08;
		hd = A.a * 0.004 + B.a * 0.0015 - lines * 0.0015 - crack * 0.004 + barkM * 0.0025;

	} else {

		// dry palm frond: parallel veins, olive-yellow drying to straw, brown and grey
		let dry = prm;
		var c = mix( ${I(.44,.42,.17)}, ${I(.6,.5,.3)}, smoothstep( 0.1, 0.45, dry ) );
		c = mix( c, ${I(.33,.24,.15)}, smoothstep( 0.45, 0.8, dry ) * ( B.g * 0.6 + 0.4 ) );
		c = mix( c, ${I(.46,.42,.36)}, smoothstep( 0.8, 1.0, dry ) * Cc.a );
		let veins = A.a * 0.6 + Cc.a * 0.4;
		c = c * ( ( veins - 0.5 ) * 0.7 + 1.0 );
		col = c;
		rough = 0.66 + dry * 0.2;
		hd = veins * 0.0015;

	}

	// ---- ground contact: occlusion and a dusting of sand on the lower parts; wet near the sea
	let ground = terrainHeightAt( p.xz );
	let above = p.y - ground;
	let contact = 1.0 - smoothstep( 0.0, max( size * 0.32, 0.012 ), above );
	let sandy = smoothstep( 0.6, 1.6, ground ) * ( 1.0 - select( 0.0, 1.0, isWeed ) );
	let sandDust = contact * sandy * smoothstep( 0.4, 0.7, T3.a + contact * 0.3 );
	col = mix( col * in.vs.vTint, ${I(.78,.7,.56)}, sandDust * 0.55 );
	let wet = 1.0 - smoothstep( 0.35, 0.9, p.y );
	col = col * ( 1.0 - wet * 0.4 );
	s.albedo = col;
	s.roughness = clamp( mix( rough, 0.28, wet * 0.8 ) + sandDust * 0.1, 0.05, 1.0 );
	s.ao = sat( 1.0 - contact * 0.45 );
	hd = hd + sandDust * 0.0015;
	// (derivatives of hd after the branches: every pixel of the quad reaches this point)
	s.normal = terrainPerturbNormal( p, N, hd, 1.0 );
`;function ls(e,{sunShadow:t=!0}={}){return E({name:`DebrisNature`,roughness:.8,metalness:0,underwaterLighting:`lite`,modules:[Re,Ln,jn(),e.module,ss,...t?[e.sunModulationModule]:[]],defines:t?{MATERIAL_SUN_MODULATION:1}:{},appliesHillShadow:t,attributes:{[as]:`vec3f`,[os]:`vec4f`},varyings:{vTint:`vec3f`,vData:`vec4f`},vertex:`\to.vTint = v.${as};\n\to.vData = v.${os};\n`,surface:cs})}var us=[8,15],ds=[15,24],fs=240,ps=18;function ms(e,t,n,r=12){let i=[];for(let a=0;a<t;a++){let t=null,o=-1;for(let s=0;s<(a===0?1:r);s++){let r=e()*n,a=e()*n,s=1/0;for(let e of i){let t=Math.abs(e[0]-r),i=Math.abs(e[1]-a);t=Math.min(t,n-t),i=Math.min(i,n-i),s=Math.min(s,t*t+i*i)}s>o&&(o=s,t=[r,a])}i.push(t)}return i}function hs(e){let t=[0,.3,0],n=[];for(let n=0;n<6;n++){let r=(n+(e*7+n*3)%5*.12)/6*Math.PI*2,i=.65+(e*13+n*7)%9/9*.45;t.push(Math.cos(r)*i,0,Math.sin(r)*i)}for(let e=0;e<6;e++)n.push(0,1+(e+1)%6,1+e);let r=Array(t.length).fill(0);for(let e=0;e<n.length;e+=3){let i=n[e]*3,a=n[e+1]*3,o=n[e+2]*3,s=t[a]-t[i],c=t[a+1]-t[i+1],l=t[a+2]-t[i+2],u=t[o]-t[i],d=t[o+1]-t[i+1],f=t[o+2]-t[i+2],p=c*f-l*d,m=l*u-s*f,h=s*d-c*u;for(let e of[i,a,o])r[e]+=p,r[e+1]+=m,r[e+2]+=h}for(let e=0;e<r.length;e+=3){r[e+1]<0&&(r[e]=-r[e],r[e+1]=-r[e+1],r[e+2]=-r[e+2]),r[e+1]+=.6;let t=Math.hypot(r[e],r[e+1],r[e+2]);r[e]/=t,r[e+1]/=t,r[e+2]/=t}for(let e=0;e<n.length;e+=3){let r=n[e]*3,i=n[e+1]*3,a=n[e+2]*3,o=t[i]-t[r],s=t[i+2]-t[r+2],c=t[a]-t[r],l=t[a+2]-t[r+2];if(s*c-o*l<0){let t=n[e+1];n[e+1]=n[e+2],n[e+2]=t}}return{p:t,n:r,idx:n}}function gs(){let e=1234567,t=()=>(e=e*16807%2147483647,(e-1)/2147483646),n=ms(t,212,4),r=[],i=[],a=[],o=[];for(let e=0;e<n.length;e++){let s=e<ps?1:e<62?2:0,c=s===2?hs(e%7):s===1?po(30+e%6,1,e%2?.5:.05):po(20+e%7,0,e%3==0?.8:.1),l=r.length/3;for(let e=0;e<c.p.length;e++)r.push(c.p[e]);for(let e=0;e<c.n.length;e++)i.push(c.n[e]);for(let r=0;r<c.p.length/3;r++)a.push(n[e][0],n[e][1],t(),s);for(let e=0;e<c.idx.length;e++)o.push(l+c.idx[e])}let s=new Be;return s.setAttribute(`position`,new Ve(r,3)),s.setAttribute(`normal`,new Ve(i,3)),s.setAttribute(`aSlot`,new Ve(a,4)),s.setIndex(new Ce(o,1)),s}var _s=new g({name:`debrisPebble`,code:`fn pebHash12( p: vec2f ) -> f32 { return fract( sin( dot( p, vec2f( 127.1, 311.7 ) ) ) * 43758.5453 ); }`}),vs=class{constructor({terrain:e,gpu:t,mask:n}){this.terrain=e,this.gpu=t;let r=e;this.maskTex=new N({label:`debrisPebbleMask`,width:n.res,height:n.res,format:`rgba8unorm`,usage:[`sample`,`copyDst`],data:n.data});let i=Math.ceil(r.size/4);this.cellsPerSide=i,this.cellFlags=new Uint8Array(i*i),this.cellMinY=new Float32Array(i*i),this.cellMaxY=new Float32Array(i*i);let a=4/n.texel,s=4/r.texel,c=0;for(let e=0;e<i;e++)for(let t=0;t<i;t++){let o=0,l=Math.max(0,Math.floor(t*a)-1),u=Math.min(n.res-1,Math.ceil((t+1)*a)),d=Math.max(0,Math.floor(e*a)-1),f=Math.min(n.res-1,Math.ceil((e+1)*a));for(let e=d;e<=f&&!o;e++)for(let t=l;t<=u;t++){let r=(e*n.res+t)*4;if(n.data[r]>6||n.data[r+1]>6||n.data[r+2]>6){o=1;break}}let p=e*i+t;if(this.cellFlags[p]=o,!o)continue;c++;let m=1/0,h=-1/0,g=Math.max(0,Math.floor(t*s)-1),_=Math.min(r.res-1,Math.ceil((t+1)*s)),v=Math.max(0,Math.floor(e*s)-1),y=Math.min(r.res-1,Math.ceil((e+1)*s));for(let e=v;e<=y;e++)for(let t=g;t<=_;t++){let n=r.heights[e*r.res+t];n<m&&(m=n),n>h&&(h=n)}this.cellMinY[p]=m,this.cellMaxY[p]=h}this.occupiedCells=c;let l=gs();this.patchTris=l.index.count/3,this.arr=new Float32Array(960),this.attr=new Te(this.arr,4),this.attr.setUsage(we),l.setAttribute(`iCell`,this.attr),l.instanceCount=0,this.geometry=l,this.material=this._createMaterial(),this.mesh=new Ee(l,this.material),this.mesh.name=`debris-pebbles`,this.mesh.frustumCulled=!1,this.mesh.castShadow=!1,this.mesh.receiveShadow=!0,this.mesh.matrixAutoUpdate=!1,this.mesh.staticVelocity=!0,this.count=0,this._frustum=new o,this._mat=new x,this._box=new S,this._last=new Float64Array(8).fill(NaN)}_createMaterial(){let e=this.gpu,t=e=>Number(e).toFixed(1);return E({name:`DebrisPebbles`,roughness:.8,metalness:0,underwaterLighting:`lite`,modules:[Re,jn(),e.module,e.sunModulationModule,ss,_s],defines:{MATERIAL_SUN_MODULATION:1},appliesHillShadow:!0,textures:{debrisPebbleMask:this.maskTex},attributes:{iCell:`vec4f`,aSlot:`vec4f`},varyings:{vPebble:`vec4f`},vertex:`
	let cell = v.iCell.xy;
	let slot = v.aSlot;
	let P = v.position;
	let N = v.normal;
	let xz = cell + slot.xy;
	let m = textureSampleLevel( debrisPebbleMask, smpLinearClamp, terrainUvOf( xz ), 0.0 );
	let ptype = slot.w;
	let isSmall = ptype < 0.5;
	let isCob = ptype > 0.5 && ptype < 1.5;
	let isChip = ptype > 1.5;
	let dens = select( select( m.z, m.y, isCob ), m.x, isSmall );
	let h1 = pebHash12( xz * 1.37 + 0.51 );
	let h2 = pebHash12( xz * 2.11 + 7.3 );
	let h3 = pebHash12( xz * 3.7 + 1.1 );
	let h4 = pebHash12( xz * 5.3 + 2.9 );
	let h5 = pebHash12( xz * 8.9 + 4.7 );
	let present = step( h1, dens );
	let d = length( xz - frame.cameraPos.xz );
	let fade = 1.0 - smoothstep( select( ${t(us[0])}, ${t(ds[0])}, isCob ), select( ${t(us[1])}, ${t(ds[1])}, isCob ), d + h4 * 2.5 );
	// size: denser patches have more but slightly smaller stones
	let r = select( select( mix( 0.008, 0.022, h2 ), mix( 0.03, 0.09, h2 * h2 ), isCob ), mix( 0.007, 0.024, h2 * h2 ), isSmall ) * ( 1.15 - dens * 0.3 );
	let sc = vec3f( r * mix( 1.0, 1.55, h3 ), r * select( mix( 0.42, 0.8, h4 ), 0.28, isChip ), r );
	let k = present * fade;
	// tilt about the local x axis (the stones don't all lie flat), then yaw
	let tilt = ( h5 - 0.5 ) * select( 0.9, 0.5, isChip );
	let ct = cos( tilt ); let st = sin( tilt );
	let q0 = P * sc * k;
	let q = vec3f( q0.x, q0.y * ct - q0.z * st, q0.y * st + q0.z * ct );
	let yaw = h3 * 6.2832;
	let c = cos( yaw ); let s = sin( yaw );
	let gy = terrainHeightAt( xz );
	let lift = sc.y * select( 0.15, 0.35, isChip ) * k;
	let n0 = N / sc;
	let nl = vec3f( n0.x, n0.y * ct - n0.z * st, n0.y * st + n0.z * ct );
	v.normal = normalize( vec3f( nl.x * c + nl.z * s, nl.y, nl.z * c - nl.x * s ) );
	// palette: dark basalt / grey / pale coral limestone in proportions set by the region
	// (mask alpha: 0 rocky shore .. 1 white coral beach)
	let dark = mix( 0.72, 0.24, m.w ); let grey = mix( 0.26, 0.3, m.w );
	let pal = select( select( mix( 0.6, 0.97, h2 ), mix( 0.32, 0.56, h2 ), h4 < dark + grey ), mix( 0.02, 0.3, h2 ), h4 < dark );
	o.vPebble = vec4f( ptype, pal, h2 + h3, r );
	v.position = vec3f( xz.x + q.x * c + q.z * s, gy + lift + q.y, xz.y + q.z * c - q.x * s );
`,surface:`
	let p = in.P;
	let N = in.N;
	let ptype = in.vs.vPebble.x; let pal = in.vs.vPebble.y; let seed = in.vs.vPebble.z; let r = in.vs.vPebble.w;
	let isChip = step( 1.5, ptype );
	let tile = clamp( r * 4.0, 0.03, 0.3 );
	let w = terrainTriWeights( N );
	let A = textureSample( terrainDetailTex, smpAniso4Repeat, p.zy / tile );
	let B = textureSample( terrainDetailTex, smpAniso4Repeat, p.xz / tile + 0.37 );
	let Cc = textureSample( terrainDetailTex, smpAniso4Repeat, p.xy / tile + 0.71 );
	let T3 = A * w.x + B * w.y + Cc * w.z;
	let S = debrisStoneSurface( T3, N, pal, 0.0, seed, tile );
	// shell and coral grit: white / cream / pink chips with growth bands
	let hue = fract( seed * 7.13 );
	var chip = mix( ${I(.94,.92,.88)}, ${I(.86,.74,.56)}, smoothstep( 0.3, 0.45, hue ) );
	chip = mix( chip, ${I(.9,.6,.56)}, smoothstep( 0.58, 0.66, hue ) );
	chip = mix( chip, ${I(.58,.4,.28)}, smoothstep( 0.76, 0.82, hue ) );
	chip = mix( chip, ${I(.36,.33,.4)}, smoothstep( 0.9, 0.95, hue ) );
	chip = chip * ( ( T3.a - 0.5 ) * 0.5 + 1.0 ) * ( sin( ( p.x + p.z ) * 900.0 ) * 0.06 + 0.97 );
	// sea glass among the grit (frosted green / brown / white, glinting) and pumice among the
	// pebbles (pale, porous)
	let glass = step( 0.955, fract( seed * 3.71 ) ) * isChip;
	let gh = fract( seed * 13.3 );
	let glassC = select( select( ${I(.8,.84,.82)}, ${I(.52,.34,.18)}, gh < 0.75 ), ${I(.42,.62,.45)}, gh < 0.45 );
	chip = mix( chip, glassC, glass );
	let pumice = step( 0.93, fract( seed * 5.17 ) ) * ( 1.0 - isChip );
	let pumiceC = ${I(.66,.64,.6)} * ( 1.0 - smoothstep( 0.55, 0.8, T3.b ) * 0.45 );
	var col = mix( mix( S.albedo, pumiceC, pumice ), chip, isChip );
	var rough = mix( mix( S.rough, 0.95, pumice ), mix( 0.5, 0.12, glass ), isChip );
	// wet near the sea, dusted with sand where they touch the ground
	let ground = terrainHeightAt( p.xz );
	let contact = 1.0 - smoothstep( 0.0, max( r * 0.7, 0.006 ), p.y - ground );
	let wet = 1.0 - smoothstep( 0.4, 1.0, p.y );
	col = mix( col, ${I(.78,.7,.56)}, contact * smoothstep( 0.8, 1.6, ground ) * 0.35 );
	col = col * ( 1.0 - wet * 0.45 );
	rough = mix( rough, 0.22, wet * 0.85 );
	s.albedo = col;
	s.roughness = clamp( rough, 0.05, 1.0 );
	s.ao = sat( 1.0 - contact * 0.5 );
	s.normal = terrainPerturbNormal( p, N, S.hd * ( 1.0 - isChip ), 1.0 );
`})}update(e){let t=e.matrixWorld.elements,n=this._last,r=e.projectionMatrix.elements;if(Math.abs(t[12]-n[0])<.05&&Math.abs(t[13]-n[1])<.05&&Math.abs(t[14]-n[2])<.05&&Math.abs(t[8]-n[3])<.001&&Math.abs(t[9]-n[4])<.001&&Math.abs(t[10]-n[5])<.001&&r[0]===n[6]&&r[5]===n[7])return!1;n[0]=t[12],n[1]=t[13],n[2]=t[14],n[3]=t[8],n[4]=t[9],n[5]=t[10],n[6]=r[0],n[7]=r[5],this._mat.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(this._mat,e.coordinateSystem,e.reversedDepth);let i=t[12],a=t[13],o=t[14],s=this.terrain,c=this.cellsPerSide,l=0;if(a-s.heightAt(i,o)<25){let e=Math.max(0,Math.floor((i-25-s.origin)/4)),t=Math.min(c-1,Math.floor((i+25-s.origin)/4)),n=Math.max(0,Math.floor((o-25-s.origin)/4)),r=Math.min(c-1,Math.floor((o+25-s.origin)/4));for(let a=n;a<=r;a++)for(let n=e;n<=t;n++){let e=a*c+n;if(!this.cellFlags[e])continue;let t=s.origin+n*4,r=s.origin+a*4,u=Math.max(t-i,0,i-t-4),d=Math.max(r-o,0,o-r-4);if(!(Math.hypot(u,d)>25)&&(this._box.min.set(t,this.cellMinY[e]-.2,r),this._box.max.set(t+4,this.cellMaxY[e]+.3,r+4),this._frustum.intersectsBox(this._box))){if(l>=fs)break;this.arr[l*4]=t,this.arr[l*4+1]=r,l++}}}return this.count=l,this.geometry.instanceCount=l,this.attr.clearUpdateRanges(),this.attr.addUpdateRange(0,Math.max(1,l)*4),this.attr.needsUpdate=!0,!0}get triangles(){return this.count*this.patchTris}dispose(){this.maskTex.destroy(),this.material.dispose(),this.geometry.dispose()}},ys=class{constructor({scene:e,terrain:t,village:n,vegetation:r=null,rocks:i=null,colliders:a=null,seed:o=5150}){this.scene=e,this.terrainData=t.data||t,this.gpu=t.gpu,this.group=new xe,this.group.name=`Debris`,this.group.matrixAutoUpdate=!1;let s=performance.now(),c=new cn,l=new is({B:c,inst:new xn(c),terrain:this.terrainData,village:n,vegetation:r,rocks:i,colliders:a,seed:o}).run();this.counts=l.counts,this.newColliders=l.newColliders;let u=performance.now();this._assemble(c,n);let d=performance.now();this.pebbles=new vs({terrain:this.terrainData,gpu:this.gpu,mask:l.mask}),this.group.add(this.pebbles.mesh),this.meshes.push(this.pebbles.mesh),this.scanned=new Zo({gpu:this.gpu,instances:l.scanned,parent:this.group}),this.timings={place:u-s,...l.timings,assemble:d-u,pebbles:performance.now()-d,total:performance.now()-s},e.add(this.group)}_assemble(e,t){let n=t=>{let n=e.batches[t];return delete e.batches[t],n},r=e.batch(`wood`),i=e.batch(`hard`),a=e.batch(`nature`),o=n(`rope`),s=n(`net`);o&&i.append(o,e=>[e[0],0,0,2+e[1]]);let c=new Dn;s&&c.append(s,e=>[e[0],e[1],Math.max(.02,e[2]),0]);for(let e of[r,i,a,c])this._bakeContact(e);{let e=[],t=[],n=a.data,r=a.idx;for(let i=0;i<r.length;i+=3){let a=r[i]*4,o=n[a+1],s=n[a+3];(o===eo.STONE&&s>=.2||o===eo.DRIFT&&s>=.1||o===eo.CORAL&&s>=.15&&n[a+2]>=2?e:t).push(r[i],r[i+1],r[i+2])}a.idx=e.concat(t),this.natureCasterTris=e.length/3}let l=new Dn,u={};for(let e of[`wood`,`hard`,`nature`]){let t=e===`wood`?r:e===`hard`?i:a;if(t.vcount===0)continue;let n=l.idx.length;l.append(t),u[e]={start:n,count:l.idx.length-n}}let d=l.build(),f=(u.wood?u.wood.count:0)+(u.hard?u.hard.count:0)+this.natureCasterTris*3,p=u.wood?u.wood.start:0,m=ls(this.gpu);this.materials={nature:m};let h={wood:t.materials.wood,hard:t.materials.hard,nature:m};this.meshes=[];let g=()=>{t.textures&&t.textures.bake&&t.textures.bake()};for(let e in u){let t=new Be;for(let e in d.attributes)t.setAttribute(e,d.attributes[e]);t.setIndex(d.index),t.boundingBox=d.boundingBox,t.boundingSphere=d.boundingSphere;let n=u[e];t.setDrawRange(n.start,n.count);let r=new Ee(t,h[e]);if(r.name=`debris_`+e,r.receiveShadow=!0,r.castShadow=e===`wood`,e===`wood`){let e=t.drawRange;r.onBeforeRender=(t,r,i)=>{g();let a=!!i&&(i.isShadowCamera===!0||i.reversedDepth===!1);e.start=a?p:n.start,e.count=a?f:n.count}}else e===`hard`&&(r.onBeforeRender=g);r.staticVelocity=!0,this.meshes.push(r)}if(this.shadowTriangles=f/3,c.vcount>0){let e=new Ee(c.build(),t.materials.fabric);e.name=`debris_fabric`,e.receiveShadow=!0,e.castShadow=!1,e.layers.set(ce.TRANSPARENT),e.staticVelocity=!0,e.onBeforeRender=g,this.meshes.push(e)}for(let e of this.meshes)e.frustumCulled=!1,e.matrixAutoUpdate=!1,e.updateMatrix(),this.group.add(e)}_bakeContact(e){let t=this.terrainData,n=e.pos,r=e.nrm,i=e.tint;for(let a=0;a<e.vcount;a++){let e=n[a*3],o=n[a*3+1],s=n[a*3+2],c=o-t.heightAt(e,s);if(c>.14)continue;let l=Math.max(0,Math.min(1,c/.14)),u=1-l*l*(3-2*l),d=Math.max(0,r[a*3+1]),f=1-.38*u*(1-.8*d);i[a*3]*=f,i[a*3+1]*=f,i[a*3+2]*=f}}update(e){this.pebbles.update(e),this.scanned.update(e)}stats(){let e=0;for(let t of this.meshes){if(t===this.pebbles.mesh)continue;let n=t.geometry.index?t.geometry.index.count:t.geometry.attributes.position.count;e+=Math.min(n,t.geometry.drawRange.count)/3}return{triangles:e,pebbleTriangles:this.pebbles.triangles,pebbleCells:this.pebbles.count,occupiedCells:this.pebbles.occupiedCells,scannedInstances:this.scanned.instances.length,scannedTriangles:this.scanned.triangles,scannedReady:this.scanned.ready,drawCalls:this.meshes.length,shadowCasters:1,shadowTriangles:this.shadowTriangles,colliders:this.newColliders,counts:this.counts,timings:this.timings}}dispose(){for(let e of this.meshes)e!==this.pebbles.mesh&&e.geometry.dispose();this.materials.nature.dispose(),this.pebbles.dispose(),this.scanned.dispose(),this.scene.remove(this.group)}},bs={GULL:0,TERN:1,PELICAN:2,FRIGATE:3,SANDERLING:4},xs=[{name:`laughing gull`,length:.42,span:1.03,body:[[-.125,.012,.017,.01,.01],[-.095,.007,.033,.024,.027],[-.045,0,.049,.038,.045],[.01,0,.054,.042,.049],[.055,.005,.049,.039,.045],[.088,.014,.036,.033,.033],[.108,.022,.029,.03,.027],[.132,.027,.028,.03,.024],[.154,.025,.021,.025,.018],[.17,.02,.012,.015,.012]],neck:[.066,.104],pivot:[0,.012,.08],bill:{z:.163,y:.018,len:.046,pitch:-.07,w:.0056,up:.0068,low:.0062,hook:.0035,gonys:.0022,pouch:0},tail:{z:-.118,y:.012,w:.017,len:[.112,.113,.115,.116],spread:.32},wing:{root:[.03,.022,.03],span:.485,elbow:.23,wrist:.47,thick:[.15,.08,.035],le:[[0,.045],[.23,.052],[.47,.046],[.7,.008],[.87,-.042],[1,-.1]],chord:[[0,.165],[.23,.165],[.47,.15],[.7,.112],[.87,.072],[1,.014]]},fold:{front:.07,tip:-.285,top:.034,h:.058,minX:.009},legs:{hip:[.022,-.03,-.004],tibia:.048,tarsus:.052,r:.0034,toe:.036,web:1},eye:[.142,.034,.0036]},{name:`royal tern`,length:.47,span:1.3,body:[[-.12,.012,.016,.009,.009],[-.09,.006,.03,.021,.023],[-.045,0,.043,.033,.037],[.01,0,.046,.036,.04],[.055,.004,.04,.033,.036],[.088,.013,.027,.027,.026],[.11,.021,.022,.03,.021],[.133,.025,.022,.028,.019],[.155,.023,.017,.02,.015],[.17,.019,.01,.012,.01]],neck:[.066,.105],pivot:[0,.012,.08],bill:{z:.162,y:.017,len:.064,pitch:-.1,w:.0058,up:.0062,low:.0058,hook:.0012,gonys:.0015,pouch:0},tail:{z:-.114,y:.012,w:.016,len:[.085,.098,.128,.168],spread:.24},wing:{root:[.028,.02,.028],span:.62,elbow:.2,wrist:.43,thick:[.14,.07,.03],le:[[0,.04],[.2,.05],[.43,.045],[.7,0],[.88,-.06],[1,-.13]],chord:[[0,.15],[.2,.15],[.43,.135],[.7,.1],[.88,.06],[1,.012]]},fold:{front:.07,tip:-.25,top:.031,h:.05,minX:.008},legs:{hip:[.02,-.028,0],tibia:.03,tarsus:.032,r:.0032,toe:.03,web:.8},eye:[.142,.031,.0034]},{name:`brown pelican`,length:1.25,span:2.1,body:[[-.31,.03,.045,.028,.028],[-.245,.02,.09,.068,.07],[-.12,0,.13,.1,.11],[.02,0,.14,.11,.12],[.12,.012,.125,.105,.11],[.19,.05,.088,.095,.09],[.225,.105,.058,.066,.068],[.255,.135,.046,.05,.042],[.28,.139,.039,.044,.034],[.302,.131,.026,.029,.024]],neck:[.13,.215],pivot:[0,.06,.16],bill:{z:.288,y:.126,len:.33,pitch:-.3,w:.027,up:.013,low:.012,hook:.013,gonys:0,pouch:.05},tail:{z:-.3,y:.03,w:.045,len:[.145,.143,.138,.128],spread:.36},wing:{root:[.1,.07,.08],span:.95,elbow:.28,wrist:.55,thick:[.14,.08,.035],le:[[0,.11],[.28,.11],[.55,.09],[.8,.035],[.93,-.02],[1,-.085]],chord:[[0,.43],[.28,.41],[.55,.38],[.8,.31],[.93,.23],[1,.11]]},fold:{front:.17,tip:-.42,top:.1,h:.15,minX:.025},legs:{hip:[.06,-.09,-.03],tibia:.085,tarsus:.075,r:.0085,toe:.095,web:1},eye:[.268,.146,.007]},{name:`magnificent frigatebird`,length:1,span:2.3,body:[[-.172,.012,.022,.015,.015],[-.12,.004,.048,.036,.038],[-.04,0,.068,.053,.058],[.045,0,.068,.053,.06],[.11,.01,.047,.043,.045],[.15,.022,.031,.033,.032],[.178,.029,.03,.033,.028],[.203,.031,.029,.032,.026],[.224,.028,.022,.025,.019],[.24,.024,.013,.015,.011]],neck:[.105,.16],pivot:[0,.02,.125],bill:{z:.233,y:.024,len:.115,pitch:-.04,w:.0075,up:.0075,low:.006,hook:.013,gonys:0,pouch:0},tail:{z:-.165,y:.012,w:.02,len:[.14,.2,.31,.42],spread:.1},wing:{root:[.05,.03,.05],span:1.1,elbow:.19,wrist:.41,thick:[.13,.07,.03],le:[[0,.07],[.19,.08],[.41,.09],[.68,.01],[.88,-.09],[1,-.19]],chord:[[0,.3],[.19,.29],[.41,.26],[.68,.17],[.88,.09],[1,.018]]},fold:{front:.11,tip:-.48,top:.05,h:.075,minX:.012},legs:{hip:[.03,-.05,0],tibia:.022,tarsus:.022,r:.005,toe:.04,web:.6},eye:[.212,.04,.0055]},{name:`sanderling`,length:.2,span:.38,body:[[-.066,.007,.011,.007,.007],[-.046,.004,.021,.017,.019],[-.016,0,.029,.025,.029],[.014,0,.03,.026,.029],[.038,.004,.025,.023,.024],[.056,.012,.017,.018,.016],[.069,.017,.016,.018,.015],[.082,.019,.015,.017,.013],[.093,.017,.011,.013,.009],[.1,.014,.006,.007,.005]],neck:[.043,.062],pivot:[0,.008,.05],bill:{z:.096,y:.0135,len:.027,pitch:-.06,w:.0026,up:.0028,low:.0024,hook:4e-4,gonys:0,pouch:0},tail:{z:-.062,y:.008,w:.01,len:[.05,.048,.045,.041],spread:.3},wing:{root:[.016,.012,.012],span:.174,elbow:.22,wrist:.46,thick:[.15,.08,.035],le:[[0,.016],[.22,.019],[.46,.017],[.7,.001],[.88,-.016],[1,-.038]],chord:[[0,.06],[.22,.058],[.46,.052],[.7,.04],[.88,.025],[1,.005]]},fold:{front:.035,tip:-.1,top:.022,h:.03,minX:.005},legs:{hip:[.011,-.021,.004],tibia:.02,tarsus:.024,r:.0019,toe:.017,web:0},eye:[.081,.025,.0024]}],Ss=12,Cs=10,ws=[0,.06,.16,.29,.43,.56,.66,.74,.81,.875,.94,1],Ts=5,Es=8,Ds=[0,.22,.48,.72,.9],Os=7,ks=9,As=[0,.18,.55,1],js=[.05,1,.62,0],Ms=[.05,.42,.22,0],Ns=[0,.05,.045,0],Ps=(e,t)=>{if(t<=e[0][0])return e[0][1];for(let n=1;n<e.length;n++)if(t<=e[n][0]){let r=e[n-1],i=e[n],a=(t-r[0])/(i[0]-r[0]),o=a*a*(3-2*a);return r[1]+(i[1]-r[1])*(.4*a+.6*o)}return e[e.length-1][1]},Fs=(e,t)=>Math.sign(e)*Math.abs(e)**+t,Is=(e,t,n)=>{let r=Math.min(1,Math.max(0,(n-e)/(t-e)));return r*r*(3-2*r)};function Ls(e){let t=e.elbow,n=e.wrist;return[0,t*.5,t,(t+n)/2,n,n+(1-n)*.3,n+(1-n)*.58,n+(1-n)*.82,1]}function Rs(e){let t=e.wing,n=e=>{let n=Ps(t.le,e),r=Ps(t.chord,e);return[t.root[0]+e*t.span,t.root[1],t.root[2]+n-r*.22]};return{S:n(0),E:n(t.elbow),W:n(t.wrist)}}function zs(e){let t=[],n=[],r=[],i=[],a=[],o=[],s=[],c=[],l=[],u=[],d=(e,s,c,l,u,d)=>(t.push(e[0],e[1],e[2]),n.push(s[0],s[1],s[2]),r.push(c),i.push(l),a.push(u),o.push(d),t.length/3-1),f=e.body,p=f[0][0],m=f[f.length-1][0],h=e=>f.map(t=>[t[0],t[e]]),g=h(1),_=h(2),v=h(3),y=h(4),b=t=>1-Is(e.neck[0],e.neck[1],t),x=t=>t<e.neck[0]?0:t<e.neck[1]?1:2,S=t.length/3;for(let e=0;e<Ss;e++){let t=ws[e],n=p+(m-p)*t,r=Ps(g,n),i=Ps(_,n),a=Ps(v,n),o=Ps(y,n);for(let e=0;e<Cs;e++){let s=e/Cs*Math.PI*2,c=Math.cos(s),l=[i*Fs(Math.sin(s),.85),r+(c>0?a:o)*Fs(c,.85),n];d(l,l,x(n),b(n),t,e/Cs)}}let C=d([0,Ps(g,p),p-Ps(_,p)*.5],[0,Ps(g,p),p-Ps(_,p)*.5],0,1,0,.5),w=m+Ps(_,m)*.6,T=d([0,Ps(g,m),w],[0,Ps(g,m),w],2,0,1,.5),E=(e,t)=>S+e*Cs+t%Cs;for(let e=0;e<11;e++)for(let t=0;t<Cs;t++)s.push(E(e,t),E(e+1,t),E(e,t+1),E(e,t+1),E(e+1,t),E(e+1,t+1));for(let e=0;e<Cs;e++)s.push(C,E(0,e),E(0,e+1)),s.push(T,E(11,e+1),E(11,e));let D=e.bill,O=t.length/3,k=e=>{let t=D.z+e*D.len*Math.cos(D.pitch),n=D.y+e*D.len*Math.sin(D.pitch)-D.hook*Is(.72,1,e)*1.3,r=1-.72*e**1.3;return{cz:t,cy:n,hw:D.w*r,up:D.up*(1-.65*e**1.2),low:D.low*(1-.7*e**1.1)+D.gonys*Math.exp(-(((e-.78)/.08)**2))+D.pouch*Math.sin(Math.PI*Math.min(1,e**.7*1.05))*(1-e*.6)}};for(let e=0;e<Ts;e++){let t=Ds[e],n=k(t);for(let e=0;e<Es;e++){let r=e/Es*Math.PI*2,i=Math.cos(r),a=Math.sin(r),o=[n.hw*Fs(a,.8),n.cy+(i>0?n.up:n.low)*Fs(i,.8),n.cz];d(o,o,3,0,t,e/Es)}}let A=k(1),ee=d([0,A.cy-A.low*.2,A.cz+.002],[0,A.cy-A.low*.2,A.cz+.002],3,0,1,.5),j=(e,t)=>O+e*Es+t%Es;for(let e=0;e<4;e++)for(let t=0;t<Es;t++)s.push(j(e,t),j(e+1,t),j(e,t+1),j(e,t+1),j(e+1,t),j(e+1,t+1));for(let e=0;e<Es;e++)s.push(ee,j(4,e+1),j(4,e));let te=e.tail,ne=t.length/3;for(let t of[1,-1])for(let n=0;n<3;n++){let r=n/2;for(let n=0;n<Os;n++){let i=n/6*2-1,a=te.len[Math.round(Math.abs(i)*3)],o=i*te.spread,s=[i*te.w+Math.sin(o)*a*r,te.y+t*.0012*(1-r*.6)*(e.length/.4)-.004*r*r*(e.length/.4),te.z-Math.cos(o)*a*r];d(s,s,4,0,n/6,r)}}let re=(e,t,n)=>ne+e*3*Os+t*Os+n;for(let e=0;e<2;e++)for(let t=0;t<6;t++)s.push(re(0,e,t),re(0,e,t+1),re(0,e+1,t),re(0,e,t+1),re(0,e+1,t+1),re(0,e+1,t)),s.push(re(1,e,t),re(1,e+1,t),re(1,e,t+1),re(1,e,t+1),re(1,e+1,t),re(1,e+1,t+1));let M=e.wing,ie=e.fold,ae=Ls(M),oe=(e,t)=>{if(t<p||t>m)return 0;let n=Ps(g,t),r=Ps(_,t),i=Ps(e>n?v:y,t),a=(e-n)/i;return a>=1?0:r*Math.sqrt(1-a*a)};for(let n of[1,-1]){let r=t.length/3;for(let t=0;t<ks;t++){let r=ae[t],i=Ps(M.le,r),a=Ps(M.chord,r),o=r<M.wrist?M.thick[0]+(M.thick[1]-M.thick[0])*r/M.wrist:M.thick[1]+(M.thick[2]-M.thick[1])*(r-M.wrist)/(1-M.wrist),s=M.root[0]+r*M.span,c,l;r<M.elbow-1e-6?(c=5,l=0):r<M.elbow+1e-6?(c=6,l=.5):r<M.wrist-1e-6?(c=6,l=0):r<M.wrist+1e-6?(c=7,l=.5):(c=7,l=0);let u=r**.85,f=ie.front+(ie.tip-ie.front)*u,h=ie.h*(1-u)**.55*(1-.25*u)+ie.h*.08,_=[[0,1],[As[1],1],[As[2],1],[1,0],[As[2],-1],[As[1],-1]];for(let[t,v]of _){let _=As.indexOf(t),y=v>=0?js[_]:-Ms[_],b=M.root[1]+(Ns[_]+y*o*1)*a,x=[n*s,b,M.root[2]+i-t*a],S=Ps(g,Math.min(Math.max(f,p),m))+ie.top*(1-.55*u)-.004*u-t*h,C=f-t*h*.35,w=v>=0?.0035:-.001;d(x,[n*(Math.max(oe(S,C)*1.06,ie.minX*(1-.3*t))+w*(e.length/.4)+.0015*(1-r)),S,C],c,l,r,v>=0?t:-t)}}let i=(e,t)=>r+e*6+t%6;for(let e=0;e<8;e++)for(let t=0;t<6;t++)n<0?s.push(i(e,t),i(e,t+1),i(e+1,t),i(e,t+1),i(e+1,t+1),i(e+1,t)):s.push(i(e,t),i(e+1,t),i(e,t+1),i(e,t+1),i(e+1,t),i(e+1,t+1))}let se=e.legs;for(let e of[1,-1]){let n=t.length/3;for(let t=0;t<3;t++)for(let n=0;n<4;n++){let r=n/4*Math.PI*2+Math.PI/4,i=d([e,t,0,8],[0,0,0],8,0,t/2,n/4);u.push(i),c[i]=[e,t,0],l[i]=[Math.cos(r),Math.sin(r),t===0?1.25:t===1?1.1:.9]}let r=(e,t)=>n+e*4+t%4;for(let e=0;e<2;e++)for(let t=0;t<4;t++)s.push(r(e,t),r(e,t+1),r(e+1,t),r(e,t+1),r(e+1,t+1),r(e+1,t));let i=se.toe,a=[-.5,0,.5],o=t.length/3,f=[[0,0,-i*.12]];for(let t=0;t<3;t++){let n=a[t]*e;if(f.push([Math.sin(n)*i,0,Math.cos(n)*i*(t===1?1.08:.92)]),t<2){let n=(a[t]+.25)*e,r=i*(.22+.55*se.web);f.push([Math.sin(n)*r,0,Math.cos(n)*r])}}for(let t of f){let n=d([e,3,0,8],t,8,0,1,0);u.push(n),c[n]=[e,3,0],l[n]=[0,0,0]}for(let t=1;t<f.length-1;t++)e>0?s.push(o,o+t+1,o+t):s.push(o,o+t,o+t+1)}let ce=t.length/3,le=e=>{let t=new Be;return t.setAttribute(`position`,new Ve(e,3)),t.setIndex(s),t.computeVertexNormals(),t.attributes.normal.array},ue=le(t),de=le(n),fe=new Float32Array(ce*4),pe=new Float32Array(ce*4),me=new Float32Array(ce*4),he=new Float32Array(ce*4);for(let e=0;e<ce;e++){let s=r[e]===8,u=c[e],d=l[e];fe.set(s?[u[0],u[1],u[2],8]:[t[e*3],t[e*3+1],t[e*3+2],r[e]],e*4),pe.set(s?[d[0],d[1],d[2],0]:[ue[e*3],ue[e*3+1],ue[e*3+2],i[e]],e*4),me.set([n[e*3],n[e*3+1],n[e*3+2],a[e]],e*4),he.set([de[e*3],de[e*3+1],de[e*3+2],o[e]],e*4)}return{count:ce,A:fe,B:pe,C:me,D:he,index:s,joints:Rs(e)}}var Bs=Math.PI*2,Vs=(e,t,n)=>e<t?t:e>n?n:e,Hs=(e,t,n)=>e+(t-e)*n,Us=(e,t,n)=>{let r=Vs((n-e)/(t-e),0,1);return r*r*(3-2*r)},Ws=(e,t)=>{let n=(e-t)%Bs;return n>Math.PI?n-=Bs:n<-Math.PI&&(n+=Bs),n},K=(e,t)=>1-Math.exp(-e*t),Gs=new g({name:`wildlifeKit`,code:`
fn rotateQ( q: vec4f, v: vec3f ) -> vec3f { return v + cross( q.xyz, cross( q.xyz, v ) + v * q.w ) * 2.0; }
`});function Ks(e,t,n,r,i){let a=Math.sin(i/2);return e[0]=t*a,e[1]=n*a,e[2]=r*a,e[3]=Math.cos(i/2),e}function qs(e,t,n){let r=t[0],i=t[1],a=t[2],o=t[3],s=n[0],c=n[1],l=n[2],u=n[3];return e[0]=r*u+o*s+i*l-a*c,e[1]=i*u+o*c+a*s-r*l,e[2]=a*u+o*l+r*c-i*s,e[3]=o*u-r*s-i*c-a*l,e}var Js=[0,0,0,1],Ys=[0,0,0,1];function Xs(e,t,n,r){return Ks(e,0,1,0,t),qs(e,e,Ks(Js,1,0,0,-n)),qs(e,e,Ks(Ys,0,0,1,r))}var Zs=new x,Qs=new i,$s=new n,ec=new n,tc=new n;function nc(e,t,n,r,i){return ec.set(n,r,i),tc.set(Math.sin(t),0,Math.cos(t)),$s.crossVectors(ec,tc).normalize(),tc.crossVectors($s,ec),Zs.makeBasis($s,ec,tc),Qs.setFromRotationMatrix(Zs),e[0]=Qs.x,e[1]=Qs.y,e[2]=Qs.z,e[3]=Qs.w,e}var rc=class{constructor(e,t,n){this.max=t,this.stride=n,this.name=e,this.data=new Float32Array(t*n*4),this.buffer=new ve({label:e,count:t*n,type:`vec4f`}),this.count=0}field(e){return`${this.name}[ v.instance * ${this.stride}u + ${e}u ]`}begin(){this.count=0}push(){return this.count>=this.max?-1:this.count++*this.stride*4}commit(){this.buffer.write(this.data.subarray(0,Math.max(1,this.count)*this.stride*4))}};function ic(e,t,r,i,{csm:a=null,castShadow:o=!1}={}){let s=new Be;s.index=t.index;for(let e in t.attributes)s.setAttribute(e,t.attributes[e]);s.instanceCount=0,s.boundingSphere=new b(new n,1e5);let c=new Ee(s,r);return c.name=e,c.frustumCulled=!1,c.matrixAutoUpdate=!1,c.castShadow=o,c.receiveShadow=!0,c.onBeforeRender=(e,t,n)=>{let r=i.count;a&&a.cascades&&n&&a.cascades.findIndex(e=>e.camera===n)>0&&(r=0),s.instanceCount=r},c}var ac=16,oc=e=>{let t=String(+e.toFixed(6));return t.includes(`.`)||t.includes(`e`)?t:t+`.0`},q=(e,t,n)=>`vec3f( ${oc(e**2.2)}, ${oc(t**2.2)}, ${oc(n**2.2)} )`,sc=class{constructor({csm:e=null,capacity:t=160}={}){let n=xs.map(e=>zs(e)),i=n[0].count;this.NV=i;let a=new Float32Array(xs.length*i*16);n.forEach((e,t)=>{for(let n=0;n<i;n++){let r=(t*i+n)*16;a.set(e.A.subarray(n*4,n*4+4),r),a.set(e.B.subarray(n*4,n*4+4),r+4),a.set(e.C.subarray(n*4,n*4+4),r+8),a.set(e.D.subarray(n*4,n*4+4),r+12)}}),this.speciesBuffer=new ve({label:`birdSpecies`,count:xs.length*i*4,type:`vec4f`,data:a});let o=[];xs.forEach((e,t)=>{let i=n[t].joints;o.push(new r(...i.S,e.legs.r)),o.push(new r(...i.E,0)),o.push(new r(...i.W,0)),o.push(new r(...e.pivot,0)),o.push(new r(0,e.tail.y,e.tail.z,0)),o.push(new r(...e.legs.hip,0)),o.push(new r(0,e.eye[1],e.eye[0],e.eye[2])),o.push(new r)}),this.joints=o,this.built=n;let s=new Be,c=new Float32Array(i*3),l=new Float32Array(i*3);for(let e=0;e<i;e++)c.set(n[0].C.subarray(e*4,e*4+3),e*3),l.set([0,1,0],e*3);s.setAttribute(`position`,new De(c,3)),s.setAttribute(`normal`,new De(l,3)),s.setIndex(n[0].index),this.records=new rc(`birdInstances`,t,ac),this.material=this.createMaterial(),this.mesh=ic(`Birds`,s,this.material,this.records,{csm:e,castShadow:!0}),this.triangles=n[0].index.length/3}begin(){this.records.begin()}write(e){let t=this.records.push();if(t<0)return;let n=this.records.data,r=(e,r,i)=>{let a=t+e*4;n[a]=r[0],n[a+1]=r[1],n[a+2]=r[2],n[a+3]=i===void 0?r[3]:i};r(0,e.pos,e.scale),r(1,e.q),r(2,e.QA),r(3,e.QB),r(4,e.QC),r(5,e.qH),r(6,e.headOff,e.fold),r(7,e.kneeL,e.tailPitch),r(8,e.footL,e.tailSpread),r(9,e.kneeR,e.species),r(10,e.footR,e.seed),r(11,e.pPos,e.pScale),r(12,e.pQ),r(13,e.pQA),r(14,e.pQB),r(15,e.pQC)}commit(){this.records.commit()}get count(){return this.records.count}createMaterial(){let e=this.records,t=this.NV,n=t=>e.field(t);return new $e({name:`Birds`,roughness:.72,metalness:0,underwaterLighting:`none`,modules:[Gs],uniforms:{birdJoints:[`vec4f[${this.joints.length}]`,this.joints]},storage:{birdInstances:e.buffer,birdSpecies:this.speciesBuffer},varyings:{vBirdRest:`vec3f`,vBirdRestN:`vec3f`,vBirdInfo:`vec4f`,vBirdFold:`f32`},vertex:`
	let r0 = ${n(0)}; let q = ${n(1)}; let QA = ${n(2)}; let QB = ${n(3)}; let QC = ${n(4)};
	let qH = ${n(5)}; let r6 = ${n(6)}; let r7 = ${n(7)}; let r8 = ${n(8)}; let r9 = ${n(9)}; let r10 = ${n(10)};
	let p11 = ${n(11)}; let pq = ${n(12)}; let pQA = ${n(13)}; let pQB = ${n(14)}; let pQC = ${n(15)};
	let si = u32( r9.w + 0.5 );
	let base = ( si * ${t}u + v.vertex ) * 4u;
	let A = birdSpecies[ base ]; let B = birdSpecies[ base + 1u ];
	let C = birdSpecies[ base + 2u ]; let D = birdSpecies[ base + 3u ];
	let jb = si * 8u;
	let part = A.w;
	let fold = r6.w;

	var pl = vec3f( 0.0 ); var pp = vec3f( 0.0 ); var nl = vec3f( 0.0, 1.0, 0.0 );

	if ( part < 3.5 ) {

		// body, neck, head and bill: the head bone turns about the neck pivot
		let piv = mat.birdJoints[ jb + 3u ].xyz;
		let hp = piv + r6.xyz + rotateQ( qH, A.xyz - piv );
		let w = select( 0.0, B.w, part < 2.5 );
		pl = mix( hp, A.xyz, w );
		nl = mix( rotateQ( qH, B.xyz ), B.xyz, w );
		pp = pl;

	} else if ( part < 4.5 ) {

		// tail: spread about the centre line, pitched about the tail base
		let T = mat.birdJoints[ jb + 4u ].xyz;
		let d = ( A.xyz - T ) * vec3f( r8.w, 1.0, 1.0 );
		let c = cos( r7.w ); let s = sin( r7.w );
		pl = T + vec3f( d.x, d.y * c + d.z * s, d.z * c - d.y * s );
		nl = vec3f( B.x, B.y * c + B.z * s, B.z * c - B.y * s );
		pp = pl;

	} else if ( part < 7.5 ) {

		// wings: three bones, mirrored for the right wing, blended at the joints, and morphed
		// into the folded shape
		let side = sign( A.x );
		let mir = vec4f( 1.0, side, side, 1.0 );
		let sx = vec3f( side, 1.0, 1.0 );
		let S = mat.birdJoints[ jb ].xyz * sx; let E = mat.birdJoints[ jb + 1u ].xyz * sx; let Wj = mat.birdJoints[ jb + 2u ].xyz * sx;
		let seg = part - 5.0;
		// current pose (with normals)
		{
			let a = QA * mir; let b = QB * mir; let c = QC * mir;
			let Ep = S + rotateQ( a, E - S );
			let Wp = Ep + rotateQ( b, Wj - E );
			let pa = S + rotateQ( a, A.xyz - S );
			let pb = Ep + rotateQ( b, A.xyz - E );
			let pc = Wp + rotateQ( c, A.xyz - Wj );
			let p = select( select( mix( pc, pb, B.w ), mix( pb, pa, B.w ), seg < 1.5 ), pa, seg < 0.5 );
			let na = rotateQ( a, B.xyz ); let nb = rotateQ( b, B.xyz ); let nc = rotateQ( c, B.xyz );
			let n = select( select( mix( nc, nb, B.w ), mix( nb, na, B.w ), seg < 1.5 ), na, seg < 0.5 );
			pl = mix( p, C.xyz, fold );
			nl = mix( n, D.xyz, fold );
		}
		// previous pose
		{
			let a = pQA * mir; let b = pQB * mir; let c = pQC * mir;
			let Ep = S + rotateQ( a, E - S );
			let Wp = Ep + rotateQ( b, Wj - E );
			let pa = S + rotateQ( a, A.xyz - S );
			let pb = Ep + rotateQ( b, A.xyz - E );
			let pc = Wp + rotateQ( c, A.xyz - Wj );
			let p = select( select( mix( pc, pb, B.w ), mix( pb, pa, B.w ), seg < 1.5 ), pa, seg < 0.5 );
			pp = mix( p, C.xyz, fold );
		}

	} else {

		// legs: tube hip -> knee -> ankle, the foot at the ankle
		let side = A.x; let seg = A.y;
		let hip = mat.birdJoints[ jb + 5u ].xyz * vec3f( side, 1.0, 1.0 );
		let left = side > 0.0;
		let knee = select( r9.xyz, r7.xyz, left );
		let foot = select( r10.xyz, r8.xyz, left );
		let c = select( select( foot, knee, seg < 1.5 ), hip, seg < 0.5 );
		let d0 = select( select( foot - knee, foot - hip, seg < 1.5 ), knee - hip, seg < 0.5 );
		let dir = d0 / max( length( d0 ), 1e-5 );
		let ax = normalize( cross( dir, vec3f( 1.0, 0.0, 0.001 ) ) );
		let ay = cross( dir, ax );
		let radial = ax * B.x + ay * B.y;
		// collapsed legs (tucked in flight) vanish: the radius follows the leg's length
		let r = mat.birdJoints[ jb ].w * B.z * smoothstep( 0.0, 0.01, length( knee - hip ) + length( foot - knee ) );
		let ring = c + radial * r;
		let isFoot = seg > 2.5;
		pl = select( ring, foot + C.xyz * smoothstep( 0.0, 0.01, length( foot - knee ) ), isFoot );
		nl = select( radial, vec3f( 0.0, 1.0, 0.0 ), isFoot );
		pp = pl;

	}

	o.vBirdRest = select( A.xyz, C.xyz, part > 7.5 );
	o.vBirdRestN = B.xyz;
	o.vBirdInfo = vec4f( part, C.w, D.w, r9.w + fract( r10.w ) * 0.9 );
	o.vBirdFold = fold;

	let world = r0.xyz + rotateQ( q, pl * r0.w );
	let prev = p11.xyz + rotateQ( pq, pp * p11.w );
	v.useWorld = true;
	v.worldPos = world;
	v.worldNormal = rotateQ( q, nl );
	v.prevWorldPos = prev;
`,surface:`
	let vInfo = in.vs.vBirdInfo;
	let part = floor( vInfo.x + 0.5 );
	let u = vInfo.y; let v = abs( vInfo.z );
	let species = floor( vInfo.w ); let seed = fract( vInfo.w ) / 0.9;
	let P = in.vs.vBirdRest; let N = in.vs.vBirdRestN;
	let fold = in.vs.vBirdFold;
	let isBody = part < 2.5; let isBill = part == 3.0; let isTail = part == 4.0;
	let isWing = part > 4.5 && part < 7.5; let isLeg = part > 7.5;
	let top = N.y > 0.0;
	var c = vec3f( 0.5 );
	var rough = 0.72;
	var trans = select( 0.0, 0.35, isWing || isTail );
	// feather texture: fine noise in the rest frame (scaled to the bird's size)
	let fnz = mx_noise_float3( P * 160.0 );

	if ( species == 0.0 ) {

		// laughing gull: slate mantle and upperwing, black primaries with a white trailing
		// edge, white body and tail; breeding birds have a black hood, winter birds a grey smudge
		let white = ${q(.93,.93,.92)}; let slate = ${q(.38,.4,.43)}; let black = ${q(.05,.05,.055)};
		let hooded = seed < 0.5;
		let mantle = smoothstep( 0.1, 0.45, N.y ) * smoothstep( -0.1, -0.07, P.z ) * smoothstep( 0.1, 0.075, P.z );
		let head = smoothstep( 0.1, 0.115, P.z );
		let eyeArc = smoothstep( 0.006, 0.004, length( vec2f( P.z - 0.139, P.y - 0.037 ) ) ) * smoothstep( 0.002, 0.004, length( vec2f( P.z - 0.141, P.y - 0.032 ) ) );
		let hood = select( head * smoothstep( 0.012, 0.004, length( vec2f( P.z - 0.126, P.y - 0.03 ) ) ) * 0.45, head * ( 1.0 - eyeArc ), hooded );
		let body = mix( mix( white, slate, mantle ), select( ${q(.45,.45,.47)}, black, hooded ), hood );
		let tipK = smoothstep( 0.68, 0.76, u );
		let edge = smoothstep( 0.9, 0.97, v ) * ( 1.0 - tipK ) * ( 1.0 - fold );
		let wingTop = mix( mix( slate, white, edge ), black, tipK );
		let wingBot = mix( mix( white, ${q(.72,.73,.75)}, smoothstep( 0.3, 0.9, u ) * 0.6 ), black, smoothstep( 0.78, 0.9, u ) );
		c = select( select( body, white, isTail ), select( wingBot, wingTop, top ), isWing );
		c = select( c, select( ${q(.12,.08,.08)}, ${q(.42,.07,.07)}, hooded ), isBill );
		c = select( c, ${q(.16,.07,.07)}, isLeg );

	} else if ( species == 1.0 ) {

		// royal tern: pale grey mantle and upperwing with a dusky primary wedge, white body,
		// shaggy black crest behind a white forehead, orange bill, black legs
		let white = ${q(.95,.95,.94)}; let grey = ${q(.74,.77,.8)};
		let mantle = smoothstep( 0.15, 0.5, N.y ) * smoothstep( -0.095, -0.07, P.z ) * smoothstep( 0.1, 0.075, P.z );
		let cap = smoothstep( 0.108, 0.12, P.z ) * smoothstep( 0.158, 0.145, P.z ) * smoothstep( 0.028, 0.033, P.y );
		let body = mix( mix( white, grey, mantle ), ${q(.04,.04,.045)}, cap );
		let wedge = smoothstep( 0.66, 0.8, u ) * ( smoothstep( 0.2, 0.0, v ) * 0.5 + 0.5 );
		let wingTop = mix( grey, ${q(.32,.33,.35)}, wedge );
		let wingBot = mix( white, ${q(.55,.56,.58)}, smoothstep( 0.82, 0.95, u ) * smoothstep( 0.4, 1.0, v ) );
		c = select( select( body, mix( white, grey, 0.3 ), isTail ), select( wingBot, wingTop, top ), isWing );
		c = select( c, ${q(.95,.45,.1)}, isBill );
		c = select( c, ${q(.05,.05,.05)}, isLeg );

	} else if ( species == 2.0 ) {

		// brown pelican: silvery grey-brown back, dark belly, cream-white head and neck
		// (chestnut hind neck in breeding birds), dark flight feathers, grey bill, dark pouch
		let back = mix( ${q(.44,.42,.38)}, ${q(.68,.67,.63)}, smoothstep( 0.0, 0.6, fnz ) * smoothstep( 0.0, 0.6, N.y ) );
		let belly = ${q(.24,.22,.2)};
		let neckZone = smoothstep( 0.12, 0.17, P.z );
		let head = mix( ${q(.92,.9,.82)}, ${q(.95,.86,.55)}, smoothstep( 0.27, 0.3, P.z ) * smoothstep( 0.13, 0.15, P.y ) );
		let hindNeck = select( ${q(.9,.88,.82)}, ${q(.28,.14,.09)}, seed < 0.4 );
		let neckCol = mix( hindNeck, head, smoothstep( 0.2, 0.235, P.z ) );
		let body = mix( mix( belly, back, smoothstep( -0.35, 0.25, N.y ) ), mix( neckCol, head, smoothstep( 0.22, 0.25, P.z ) ), neckZone );
		let flight = max( smoothstep( 0.52, 0.6, u ), smoothstep( 0.45, 0.62, v ) * ( 1.0 - fold ) );
		let wingTop = mix( mix( ${q(.56,.55,.51)}, ${q(.72,.71,.67)}, ( fnz * 0.5 + 0.5 ) * 0.6 ), ${q(.1,.09,.085)}, flight );
		let wingBot = mix( ${q(.2,.19,.18)}, ${q(.45,.44,.42)}, smoothstep( 0.2, 0.35, v ) * smoothstep( 0.6, 0.4, v ) * smoothstep( 0.6, 0.3, u ) );
		c = select( select( body, ${q(.2,.19,.18)}, isTail ), select( wingBot, wingTop, top ), isWing );
		let pouch = smoothstep( 0.3, 0.38, v ) * smoothstep( 0.7, 0.62, v );
		c = select( c, mix( mix( ${q(.58,.54,.5)}, ${q(.75,.55,.45)}, smoothstep( 0.6, 1.0, u ) ), ${q(.22,.21,.2)}, pouch ), isBill );
		c = select( c, ${q(.12,.12,.12)}, isLeg );
		trans *= 0.5;

	} else if ( species == 3.0 ) {

		// magnificent frigatebird: black with a faint gloss; females a white breast and a
		// brown bar on the upperwing, juveniles a white head and breast; males a red throat
		let black = ${q(.035,.035,.04)};
		let female = seed < 0.45; let juvenile = seed > 0.85;
		let breast = smoothstep( 0.2, -0.3, N.y ) * smoothstep( -0.06, 0.0, P.z ) * smoothstep( 0.14, 0.1, P.z );
		let headW = smoothstep( 0.13, 0.16, P.z );
		let white = ${q(.9,.9,.88)};
		let body = mix( black, white, select( select( 0.0, breast, female ), max( breast, headW ), juvenile ) );
		let throat = smoothstep( 0.13, 0.16, P.z ) * smoothstep( 0.0, -0.5, N.y ) * select( 1.0, 0.0, female || juvenile );
		let bar = smoothstep( 0.08, 0.14, u ) * smoothstep( 0.45, 0.38, u ) * smoothstep( 0.12, 0.22, v ) * smoothstep( 0.5, 0.4, v ) * select( 0.4, 1.0, female || juvenile );
		let wingTop = mix( black, ${q(.32,.25,.18)}, bar );
		c = select( select( mix( body, ${q(.55,.06,.05)}, throat ), black, isTail ), select( black, wingTop, top ), isWing );
		c = select( c, ${q(.5,.52,.56)}, isBill );
		c = select( c, ${q(.35,.28,.28)}, isLeg );
		rough = 0.55;
		trans *= 0.3;

	} else {

		// sanderling (winter): pale grey above with dark feather centres, white below, dark
		// shoulder and primaries, bold white wing bar, black bill and legs
		let white = ${q(.95,.95,.94)}; let grey = mix( ${q(.62,.62,.6)}, ${q(.48,.48,.47)}, smoothstep( 0.2, 0.7, fnz ) );
		let upper = smoothstep( -0.05, 0.35, N.y ) * max( smoothstep( 0.092, 0.08, P.z ), smoothstep( 0.2, 0.6, N.y ) );
		let body = mix( white, grey, upper );
		let bar = smoothstep( 0.18, 0.26, u ) * smoothstep( 0.78, 0.7, u ) * smoothstep( 0.42, 0.48, v ) * smoothstep( 0.66, 0.6, v ) * ( 1.0 - fold );
		let shoulder = smoothstep( 0.2, 0.3, u ) * smoothstep( 0.55, 0.45, u ) * smoothstep( 0.3, 0.1, v );
		let wingTop = mix( mix( mix( grey, ${q(.12,.12,.12)}, smoothstep( 0.62, 0.72, u ) ), white, bar ), ${q(.1,.1,.1)}, shoulder * 0.8 );
		c = select( select( body, mix( grey, ${q(.2,.2,.2)}, smoothstep( 0.25, 0.0, abs( u - 0.5 ) ) ), isTail ), select( white, wingTop, top ), isWing );
		c = select( c, ${q(.04,.04,.04)}, isBill || isLeg );

	}

	// eye: dark, with a pale iris for pelicans
	let eye = mat.birdJoints[ u32( species ) * 8u + 6u ];
	let ed = length( vec2f( P.z - eye.z, P.y - eye.y ) );
	let onHead = part < 2.5 && abs( P.x ) > 0.004;
	let iris = smoothstep( eye.w, eye.w * 0.8, ed ) * select( 0.0, 1.0, onHead );
	let pupil = smoothstep( eye.w * 0.6, eye.w * 0.45, ed ) * select( 0.0, 1.0, onHead );
	c = mix( mix( c, select( ${q(.05,.03,.02)}, ${q(.8,.75,.55)}, species == 2.0 ), iris ), ${q(.01,.01,.01)}, pupil );
	rough = mix( select( rough, 0.4, isBill || isLeg ), 0.15, iris );
	// fine feather texture, darker feather bases toward the trailing edge of the wings
	c *= ( fnz * 0.06 + 1.0 ) * select( 1.0, mix( 1.0, 0.92, smoothstep( 0.5, 1.0, v ) * ( 1.0 - fold ) ), isWing );
	s.albedo = c;
	s.roughness = rough;
	// light through the thin wing and tail feathers when they are between the sun and the eye
	let back = sat( - dot( in.N, frame.sunDir ) );
	s.translucency = c * trans * ( back * 0.8 + 0.2 );
`})}},cc={DROPLET:0,MIST:1,LIGAMENT:2,SPRAY:3,SHEET:4},lc={tau:[3,.35,5,1.8,2.5],grav:[v,.3,v,8.5,v],turb:[0,.5,0,.3,.1],grow:[0,.22,0,.3,.7],dies:[1,0,1,1,1],deposit:[1,0,3,4,2],stretch:[1/40,0,1/40,1/30,1/60],alpha:[.55,.06,.8,.66,.22],fadeIn:[.02,.2,.02,.12,.02],fadeOut:[.8,.45,.8,.7,.5]},uc=e=>{let t=String(e);return/[.e]/.test(t)?t:t+`.0`},dc=(e,t)=>`sprayByKind( ${e}, ${t.map(uc).join(`, `)} )`,fc=32,pc=new g({name:`sprayCommon`,deps:[Re],code:`
const SPRAY_DROPLET: f32 = 0.0;
const SPRAY_MIST: f32 = 1.0;
const SPRAY_LIGAMENT: f32 = 2.0;
const SPRAY_SPRAY: f32 = 3.0;
const SPRAY_SHEET: f32 = 4.0;

// PCG hash of a uint -> [0, 1)
fn sprayHash( seed: u32 ) -> f32 {
	let state = seed * 747796405u + 2891336453u;
	let word = ( ( state >> ( ( state >> 28u ) + 4u ) ) ^ state ) * 277803737u;
	return f32( ( word >> 22u ) ^ word ) * ( 1.0 / 4294967296.0 );
}

// select a per-kind constant
fn sprayByKind( kind: f32, a: f32, b: f32, c: f32, d: f32, e: f32 ) -> f32 {
	return select( select( select( select( e, d, kind < 3.5 ), c, kind < 2.5 ), b, kind < 1.5 ), a, kind < 0.5 );
}

// Henyey-Greenstein phase (1/sr)
fn sprayPhaseHG( cosT: f32, g: f32 ) -> f32 {
	let g2 = g * g;
	return ( ( 1.0 - g2 ) / ( 4.0 * PI ) ) / pow( max( 1.0 + g2 - 2.0 * g * cosT, 1e-4 ), 1.5 );
}
`}),mc=class{constructor(e,{query:t,terrain:i,sceneCopy:a,clouds:o=null,gpuCapacity:s=32768,cpuCapacity:c=8192}){this.renderer=e,this.query=t,this.terrain=i,this.clouds=o,this.shoreSim=null,this.waveShadow=null,this.NG=s,this.NC=c,this.N=s+c;let u=this.N;this.pos=new ve({label:`sprayPos`,count:u,type:`vec4f`}),this.vel=new ve({label:`sprayVel`,count:u,type:`vec4f`}),this.info=new ve({label:`sprayInfo`,count:u,type:`vec4f`}),this.head=new ve({label:`sprayHead`,count:1,type:`u32`}),this.reqData=new Float32Array(512),this.reqBuffer=new ve({label:`sprayReq`,count:128,type:`vec4f`}),this.nReq=0,this.nReqParticles=0,this.cpuHead=0,this._frame=0,this.simParams=new l(`SprayParams`,{frameSeed:[`u32`,0],cpuStart:[`u32`,0],cpuCount:[`u32`,0],reqCount:[`u32`,0],bodyMat:[`mat4x4f`,new x],bodyInv:[`mat4x4f`,new x],bodyVel:[`vec3f`,new n],bodyOn:[`f32`,0],bodyHull:[`vec4f`,new r(0,0,1,0)],bodyHullWL:[`vec4f`,new r(0,1,0,0)],bodySheer:[`vec4f`,new r(0,0,-1,0)],bodyBoxMin:[`vec3f`,new n],bodyBoxMax:[`vec3f`,new n]},{label:`spray params`});let d=this.simParams.fields;this.cpuStart=d.cpuStart,this.cpuCount=d.cpuCount,this.reqCount=d.reqCount,this.frameSeed=d.frameSeed,this.body={on:d.bodyOn,mat:d.bodyMat,inv:d.bodyInv,vel:d.bodyVel,hull:d.bodyHull,hullWL:d.bodyHullWL,sheer:d.bodySheer,boxMin:d.bodyBoxMin,boxMax:d.bodyBoxMax},this.module=new g({name:`spray`,deps:[pc],uniforms:this.simParams,uniformName:`sprayParams`,bindings:{sprayPos:{storage:this.pos,access:`read_write`},sprayVel:{storage:this.vel,access:`read_write`},sprayInfo:{storage:this.info,access:`read_write`},sprayHead:{storage:this.head,access:`read_write`,wgslType:`array<atomic<u32>>`}},code:`
const SPRAY_NG: u32 = ${this.NG}u;
const SPRAY_NC: u32 = ${this.NC}u;
const SPRAY_N: u32 = ${this.N}u;

// Reserve n ring slots of the GPU part; returns the base (pass it to spraySlot)
fn sprayReserve( n: u32 ) -> u32 { return atomicAdd( &sprayHead[ 0 ], n ); }
fn spraySlot( base: u32, i: u32 ) -> u32 { return ( base + i ) & ( SPRAY_NG - 1u ); }

fn sprayWrite( slot: u32, p: vec3f, v: vec3f, size: f32, kind: f32, life: f32, seed: f32 ) {
	sprayPos[ slot ] = vec4f( p, 0.0 );
	sprayVel[ slot ] = vec4f( v, size );
	sprayInfo[ slot ] = vec4f( kind, life, p.y, seed );
}

fn sprayRand( a: u32, b: u32 ) -> f32 {
	return sprayHash( a + b * 1664525u + sprayParams.frameSeed * 2654435761u );
}
`}),this.updateKernel=null,this._buildMesh(a)}emit(e,t,n,r=.04,i=cc.DROPLET,a={}){if(this.disabled||this.nReq>=fc||n<=0||(n=Math.min(Math.round(n),this.NC-this.nReqParticles),n<=0))return;let{spread:o=.6,jitter:s=.05,life:c=i===cc.MIST?2.5:1.6,to:l=null,sizeJitter:u=.5}=a,d=l||e,f=this.reqData,p=this.nReq*16;this.nReqParticles+=n,f[p]=e.x,f[p+1]=e.y,f[p+2]=e.z,f[p+3]=this.nReqParticles,f[p+4]=d.x,f[p+5]=d.y,f[p+6]=d.z,f[p+7]=r,f[p+8]=t.x,f[p+9]=t.y,f[p+10]=t.z,f[p+11]=i,f[p+12]=o,f[p+13]=s,f[p+14]=c,f[p+15]=u,this.nReq++}emitAlongPoints(e,t,n,r=.04,i=cc.DROPLET,a={}){let o=Object.assign(this._segOpts||={},a);for(let a=0;a+1<e.length;a++)o.to=e[a+1],this.emit(e[a],Array.isArray(t)?t[a]:t,n,r,i,o);o.to=null}setBodyShape({zAft:e,zShoulder:t,zStem:n,halfBeam:r,wlShoulder:i,wlStem:a,wlHalfBeam:o,ySheerAft:s,ySheerStem:c,yBottom:l,boxMin:u,boxMax:d}){let f=this.body;f.hull.value.set(e,t,n,r),f.hullWL.value.set(i,a,o,0),f.sheer.value.set(s,c,l,0),f.boxMin.value.copy(u),f.boxMax.value.copy(d)}setBody(e,t){let n=this.body;n.on.value=+!!e,e&&(n.mat.value.copy(e),n.inv.value.copy(e).invert(),n.vel.value.copy(t))}_hooks(){if(this._hookModule)return this._hookModule;let e=[],t=``;return this.clouds&&this.clouds.module?(e.push(this.clouds.module),t+=`fn sprayCloudShadow( xz: vec2f ) -> f32 { return cloudsShadow( xz ); }
`):t+=`fn sprayCloudShadow( xz: vec2f ) -> f32 { return 1.0; }
`,this.waveShadow?(e.push(this.waveShadow.module||this.waveShadow),t+=`fn sprayWaveShadow( p: vec3f, tag: f32 ) -> f32 { return breakersSprayShadow( p, tag ); }
`):t+=`fn sprayWaveShadow( p: vec3f, tag: f32 ) -> f32 { return 1.0; }
`,this._hookModule=new g({name:`sprayHooks`,deps:e,code:t}),this._hookModule}_buildUpdate(){let e=this.NG,t=this.NC,n=this.shoreSim,r=n&&n.depositModule,i=[this.module,this.query.module,this.terrain.module];r&&i.push(r),this.updateKernel=new C({label:`Spray Update`,modules:i,bindings:{sprayReq:{storage:this.reqBuffer,access:`read`}},workgroupSize:[64,1,1],code:`
// Push a particle out of the body (hull or box) through the nearest face; the velocity into it
// (relative to the body) is removed and the rest damped (the water runs off as a film); drops
// that hit it die soon after.
fn sprayCollideBody( p: ptr<function, vec3f>, v: ptr<function, vec3f>, age: f32, life: ptr<function, f32>, isMist: bool ) {
	if ( sprayParams.bodyOn < 0.5 ) { return; }
	var q = ( sprayParams.bodyInv * vec4f( *p, 1.0 ) ).xyz;
	let H = sprayParams.bodyHull; let W = sprayParams.bodyHullWL; let S = sprayParams.bodySheer;
	// hull: the outline at this height (waterline -> sheer), half breadth at q.z (elliptic bow)
	let sheer = mix( S.x, S.y, sat( ( q.z - H.x ) / max( H.z - H.x, 0.01 ) ) );
	let fh = sat( q.y / max( sheer, 0.1 ) );
	let zSh = mix( W.x, H.y, fh ); let zSt = mix( W.y, H.z, fh ); let HB = mix( W.z, H.w, fh );
	let bowL = max( zSt - zSh, 0.01 );
	let e = sat( ( q.z - zSh ) / bowL );
	let c = sqrt( max( 1.0 - e * e, 0.02 ) );
	let hb = HB * c;
	let inHull = q.z > H.x && q.z < zSt && abs( q.x ) < hb && q.y < sheer && q.y > S.z;
	let b0 = sprayParams.bodyBoxMin; let b1 = sprayParams.bodyBoxMax;
	let inBox = q.x > b0.x && q.x < b1.x && q.y > b0.y && q.y < b1.y && q.z > b0.z && q.z < b1.z;
	if ( inHull || inBox ) {
		var n = vec3f( 0.0, 1.0, 0.0 );
		if ( inHull ) {
			let sx = select( - 1.0, 1.0, q.x > 0.0 );
			if ( hb - abs( q.x ) < sheer - q.y ) {
				// through the side; on the bow the side faces forward too (- d hb / dz)
				n = normalize( vec3f( sx, 0.0, HB * e / ( c * bowL ) ) );
				q.x = sx * ( hb + 0.02 );
			} else {
				q.y = sheer + 0.02;
			}
		} else {
			let dx = min( q.x - b0.x, b1.x - q.x );
			let dz = min( q.z - b0.z, b1.z - q.z );
			let dy = b1.y - q.y;
			if ( dy < dx && dy < dz ) {
				q.y = b1.y + 0.02;
			} else if ( dx < dz ) {
				let right = q.x > ( b0.x + b1.x ) * 0.5;
				n = vec3f( select( - 1.0, 1.0, right ), 0.0, 0.0 );
				q.x = select( b0.x - 0.02, b1.x + 0.02, right );
			} else {
				let front = q.z > ( b0.z + b1.z ) * 0.5;
				n = vec3f( 0.0, 0.0, select( - 1.0, 1.0, front ) );
				q.z = select( b0.z - 0.02, b1.z + 0.02, front );
			}
		}
		let nw = normalize( ( sprayParams.bodyMat * vec4f( n, 0.0 ) ).xyz );
		var vr = *v - sprayParams.bodyVel;
		let vn = dot( vr, nw );
		if ( vn < 0.0 ) { vr -= nw * vn; }
		*v = sprayParams.bodyVel + vr * 0.5;
		*p = ( sprayParams.bodyMat * vec4f( q, 1.0 ) ).xyz;
		// water that hits it wets it and runs off (gone); mist flows around it and settles
		*life = min( *life, select( age, age + 0.25, isMist ) );
	}
}

@compute @workgroup_size( WG_X, 1, 1 )
fn main( @builtin( global_invocation_id ) gid: vec3u ) {
	let i = gid.x;
	if ( i >= SPRAY_N ) { return; }

	// ---- CPU-owned slots: spawn from this frame's requests
	if ( i >= ${e}u ) {
		let k = ( i - ${e}u + ${t}u - sprayParams.cpuStart ) % ${t}u;
		if ( k < sprayParams.cpuCount ) {
			var r = 0u;
			for ( var j = 0u; j < sprayParams.reqCount; j++ ) {
				r = j;
				if ( f32( k ) < sprayReq[ j * 4u ].w ) { break; }
			}
			let r0 = sprayReq[ r * 4u ];
			let r1 = sprayReq[ r * 4u + 1u ];
			let r2 = sprayReq[ r * 4u + 2u ];
			let r3 = sprayReq[ r * 4u + 3u ];
			let h0 = sprayRand( i, 11u ); let h1 = sprayRand( i, 12u ); let h2 = sprayRand( i, 13u );
			let h3 = sprayRand( i, 14u ); let h4 = sprayRand( i, 15u ); let h5 = sprayRand( i, 16u );
			let h6 = sprayRand( i, 17u );
			let along = mix( r0.xyz, r1.xyz, h0 );
			let jit = vec3f( h1 - 0.5, h2 - 0.5, h3 - 0.5 ) * ( r3.y * 2.0 );
			let vj = vec3f( h4 - 0.5, h5 - 0.5, h6 - 0.5 ) * ( r3.x * 2.0 );
			let size = r1.w * ( 1.0 + ( h2 - 0.5 ) * r3.w );
			let life = r3.z * ( h3 * 0.5 + 0.75 );
			sprayWrite( i, along + jit, r2.xyz + vj, size, r2.w, life, h5 );
		}
	}

	// ---- integrate live particles
	let P = sprayPos[ i ];
	let Vv = sprayVel[ i ];
	let info = sprayInfo[ i ];
	if ( info.y > 0.0 ) {
		let dt = frame.dt;
		var p = P.xyz;
		var v = Vv.xyz;
		let age = P.w + dt;
		let kind = info.x;

		// wind near the surface (~70% of the 10 m wind), gusty
		let gust = sin( frame.time * 0.7 + p.x * 0.05 ) * 0.25 + 0.85;
		let wind = vec3f( frame.windDir.x, 0.0, frame.windDir.y ) * ( frame.windSpeed * 0.7 * gust );
		// drag toward the wind: small drops follow the air, mist drifts with it
		// mist first keeps moving with the air the wave pushes ahead of it, then joins the wind
		let isMist = kind > 0.5 && kind < 1.5;
		let tau = ${dc(`kind`,lc.tau)} * select( 1.0, exp( age * - 1.2 ) * 4.0 + 1.0, isMist );
		let grav = ${dc(`kind`,lc.grav)};
		let turb = vec3f(
			sin( age * 2.1 + fract( info.w ) * 40.0 ),
			sin( age * 1.7 + fract( info.w ) * 17.0 ) * 0.5,
			cos( age * 1.9 + fract( info.w ) * 29.0 ) ) * ${dc(`kind`,lc.turb)};
		v += ( ( wind - v ) / tau + turb ) * dt;
		v.y -= grav * dt;
		p += v * dt;

		var life = info.y;
		sprayCollideBody( &p, &v, age, &life, isMist );

		// water surface and ground below
		let hw = waterQueryHeightAtXZ( p.xz );
		let ground = terrainHeightAt( p.xz );
		let top = max( hw, ground );

		// drops die in the water / on the sand; mist and foam skim over it
		if ( p.y < top && v.y < 0.0 && age > 0.04 ) {
			if ( ${dc(`kind`,lc.dies)} > 0.5 ) {
				life = 0.0;
${r?`				// fell into the water (not onto the sand): its bubbles add to the foam there
				if ( hw > ground + 0.02 ) {
					shoreSimDepositAt( p.xz, u32( ${dc(`kind`,lc.deposit)} ) );
				}
`:``}			} else {
				p.y = top + 0.02;
				v.y = max( v.y, 0.0 );
				v = vec3f( v.x * 0.95, v.y, v.z * 0.95 );
			}
		}

		if ( age > life ) { life = 0.0; }

		// mist and spray clouds grow as they dilute
		let size = Vv.w * ( 1.0 + dt * ${dc(`kind`,lc.grow)} );
		sprayPos[ i ] = vec4f( p, age );
		sprayVel[ i ] = vec4f( v, size );
		sprayInfo[ i ] = vec4f( info.x, life, hw, info.w );
	}
}
`})}update(){this.updateKernel||this._buildUpdate();let e=this.nReqParticles;this.cpuStart.value=this.cpuHead,this.cpuCount.value=e,this.reqCount.value=this.nReq,this.cpuHead=(this.cpuHead+e)%this.NC,this.nReq>0&&this.reqBuffer.write(this.reqData.subarray(0,this.nReq*16)),this.frameSeed.value=++this._frame>>>0,this.updateKernel.dispatch(Math.ceil(this.N/64)),this.nReq=0,this.nReqParticles=0}clear(){this.nReq=0,this.nReqParticles=0,this.cpuHead=0,this.info.write(new Float32Array(this.N*4)),this.head.write(new Uint32Array([0]))}_buildMesh(e){let t=new He;t.setAttribute(`position`,new De(new Float32Array([-1,-1,0,1,-1,0,1,1,0,-1,1,0]),3)),t.setIndex([0,1,2,0,2,3]),t.boundingSphere=new b(new n,1e7),t.instanceCount=this.N;let r=gc(),i=_c(),a=new $e({name:`Spray`,lit:!1,transparent:!0,depthWrite:!1,depthTest:!0,side:`double`,blending:`premultiplied`,modules:[pc],uniforms:{intensity:[`f32`,1],maxDistance:[`f32`,320]},storage:{sprayPosR:this.pos,sprayVelR:this.vel,sprayInfoR:this.info},textures:{sprayPuff:r,sprayDots:i,spraySceneDepth:{texture:()=>e.depthTexture}},varyings:{vUV:`vec2f`,vCol:`vec4f`,vMisc:`vec4f`,vFwd:`vec4f`},vertex:`
	let posA = sprayPosR[ v.instance ];
	let velA = sprayVelR[ v.instance ];
	let info = sprayInfoR[ v.instance ];
	let p = posA.xyz;
	let age = posA.w;
	let vel = velA.xyz;
	let kind = info.x;
	let life = info.y;
	let isDrop = kind < 0.5;
	let isLig = kind > 1.5 && kind < 2.5;
	let isMist = kind > 0.5 && kind < 1.5;
	let water = isDrop || isLig; // clear water: drops and ligaments
	let alive = life > 0.0 && age < life;

	let toCam = frame.cameraPos - p;
	let dist = max( length( toCam ), 0.05 );
	let Vd = toCam / dist;

	// pixel footprint at this distance: drops are drawn at least ~1.3 px wide
	let p11 = frame.proj[ 1 ][ 1 ];
	let pixel = dist * 2.0 / ( p11 * frame.resolution.y );
	let r0 = velA.w; // radius (m)
	// dense spray is thrown out of the splash as a compact mass and spreads (grows from ~half size)
	let tAge = age / max( life, 1e-3 );
	let r = select( r0, r0 * mix( 0.45, 1.0, smoothstep( 0.0, 0.25, tAge ) ), kind > 2.5 && kind < 3.5 );
	let size = max( r, pixel * 1.3 );

	// motion blur along the velocity projected on the view plane; ligaments are elongated anyway
	let vPerp = vel - Vd * dot( vel, Vd );
	let speed = length( vPerp );
	let stretchLen = speed * ${dc(`kind`,lc.stretch)};
	let elong = select( 0.0, r * 2.0, isLig );
	let up = select( vec3f( 0.0, 1.0, 0.0 ), vPerp / max( speed, 1e-3 ), speed > 1e-3 );
	// clouds: random rotation that slowly turns
	let rot = fract( info.w ) * 6.283 + age * ( fract( info.w ) - 0.5 );
	let camRight = normalize( cross( vec3f( 0.0, 1.0, 0.0 ), Vd ) + vec3f( 1e-5, 0.0, 0.0 ) );
	let camUp = cross( Vd, camRight );
	let mRight = camRight * cos( rot ) + camUp * sin( rot );
	let mUp = camUp * cos( rot ) - camRight * sin( rot );
	// torn sheets (dense spray) are drawn along their motion too, tilted a little at random and
	// stretched by their speed: fibrous, streaked silhouettes instead of round puffs
	let isSheet = kind > 2.5;
	let isClear = kind > 3.5; // clear sheet (bow sheet)
	let side = normalize( cross( Vd, up ) );
	let tilt = ( fract( info.w * 7.31 ) - 0.5 ) * 0.7;
	let sUp = up * cos( tilt ) + side * sin( tilt );
	let sSide = side * cos( tilt ) - up * sin( tilt );
	// mist streams with the air: drawn along its motion, stretched by its speed (wisps, not discs)
	let alongMotion = isSheet || ( isMist && speed > 0.3 );
	let axisY = select( select( mUp, sUp, alongMotion ), up, water );
	let axisX = select( select( mRight, sSide, alongMotion ), side, water );
	let sheetLen = select( 0.0, size * clamp( speed * 0.08, 0.0, 0.8 ), isSheet );
	let mistLen = select( 0.0, size * clamp( ( speed - 0.3 ) * 0.35, 0.0, 1.4 ), isMist );
	let halfY = size + stretchLen * 0.5 + elong + sheetLen + mistLen;
	let halfX = select( size, size * 1.05, isSheet );
	let corner = v.position.xy;
	let world = p + axisX * ( corner.x * halfX ) + axisY * ( corner.y * halfY );

	// coverage that conserves the water's cross-section: the drop's projected area (and the time it
	// spends on each pixel of its streak) spread over the drawn footprint. For the gaussian
	// footprint exp( -k d^2 ) the peak is k r (r + elong) / ( halfX halfY ). Clouds: lost to the clamp.
	let kShape = select( 3.5, 4.5, isLig );
	let cover = select( sat( r / size ), min( r * ( r + elong ) * kShape / ( halfX * halfY ), 1.0 ), water );

	// ---- lighting (per particle)
	let L = frame.sunDir;
	let cosT = dot( - Vd, L ); // 1 = looking toward the sun through the particle
	let cosA = dot( Vd, L );
	let sunVis = sprayCloudShadow( p.xz ) * sprayWaveShadow( p, info.w );
	let sun = frame.sunColor * sunVis;
	// clear water (drop, ligament): the bright sky it refracts and reflects, a strong forward lobe
	// (diffraction + refraction) when backlit, a small glint from any side
	let cWater = frame.skyIrradiance * 0.9 + sun * ( sprayPhaseHG( cosT, 0.85 ) * 1.2 + 0.12 );
	// dense spray: multiply scattered, white from any side (a diffuse sphere: its far side is in its
	// own shadow), plus a forward lobe
	let lambert = ( sqrt( max( 1.0 - cosA * cosA, 0.0 ) ) + ( PI - acos( clamp( cosA, -1.0, 1.0 ) ) ) * cosA ) / PI;
	// (the forward lobe is passed on separately: thin, torn parts glow with it, thick parts shade it)
	let cSpray = sun * ( ( lambert * 0.65 + 0.35 ) / PI ) + frame.skyIrradiance * 1.15;
	let fSpray = sun * ( sprayPhaseHG( cosT, 0.6 ) * 0.9 );
	// mist: a thin veil of fine drops, strongly forward scattering, tinted by the sky
	let cMist = sun * ( 0.25 / PI ) + frame.skyIrradiance * 0.9;
	let fMist = sun * sprayPhaseHG( cosT, 0.75 );
	// clear sheet: thin water, the sky it shows and a little sun off its surface; the sun shining
	// through it (forward lobe) is passed on: the thin torn parts glow when backlit
	let cClear = frame.skyIrradiance * 0.95 + sun * 0.05;
	let fClear = sun * ( sprayPhaseHG( cosT, 0.8 ) * 1.1 );
	let col = select( select( select( cSpray, cClear, isClear ), cMist, isMist ), cWater, water );
	o.vFwd = vec4f( select( select( select( fSpray, fClear, isClear ), fMist, isMist ), vec3f( 0.0 ), water ), halfX / pixel );

	// opacity over the particle's life
	let t = age / max( life, 1e-3 );
	let fadeIn = smoothstep( 0.0, ${dc(`kind`,lc.fadeIn)}, t );
	let fadeOut = 1.0 - smoothstep( ${dc(`kind`,lc.fadeOut)}, 1.0, t );
	let baseA = ${dc(`kind`,lc.alpha)};
	// far: fade out; very near the eye: sheets and mist would fill the screen (and cost a lot of overdraw)
	let distFade = smoothstep( mat.maxDistance, mat.maxDistance * 0.55, dist ) * select( smoothstep( 0.6, 3.0, dist ), 1.0, water );
	let a = baseA * fadeIn * fadeOut * cover * distFade * mat.intensity;

	o.vUV = corner;
	o.vCol = vec4f( col, a );
	// x: kind + 0.45 * life fraction (the kind tests below have 0.5 of margin)
	o.vMisc = vec4f( kind + sat( t ) * 0.45, info.z, size, fract( info.w ) );

	// dead particles collapse off-screen
	v.useWorld = true;
	v.worldPos = select( vec3f( 0.0, -1e5, 0.0 ), world, alive && a > 1e-4 );
	v.worldNormal = Vd;
`,output:`
	let uv = in.vs.vUV;
	let vMisc = in.vs.vMisc;
	let kind = vMisc.x;
	let isDrop = kind < 0.5;
	let isLig = kind > 1.5 && kind < 2.5;
	let isSheet = kind > 2.5;
	let isClear = kind > 3.5;
	let t = sat( fract( kind ) / 0.45 ); // life fraction
	let r2 = dot( uv, uv );
	let sd = vec2f( vMisc.w, vMisc.w * 1.7 );
	// drop: gaussian streak; ligament: a slightly sharper, beaded blob
	let drop = max( exp( r2 * - 3.5 ) - 0.03, 0.0 );
	let lig = max( exp( r2 * - 4.5 ) * ( sin( uv.y * 5.0 + vMisc.w * 40.0 ) * 0.2 + 0.9 ) - 0.03, 0.0 );
	// torn sheet: noise streaked along the motion (uv.y), eroded from its edges inward and more and
	// more as it ages, so it tears into strands and fragments instead of shrinking. Thick parts are
	// dense white water, the torn edges thin and translucent.
	let env = sat( 1.0 - r2 );
	let fib = textureSample( sprayPuff, smpLinearRepeat, vec2f( uv.x * 0.5, uv.y * 0.26 ) + sd ).x;
	let fine = textureSample( sprayPuff, smpLinearRepeat, vec2f( uv.x * 1.2, uv.y * 0.6 ) + sd * 2.3 ).x;
	let field = fib * 0.6 + fine * 0.4 + ( env - 0.55 ) * 0.75 - smoothstep( 0.8, 1.0, r2 );
	// a torn sheet only a few pixels across can't show its tears: a solid white dot, and a cluster of
	// them reads as cauliflower puffs. Small on screen, it is drawn thinner and more torn: a far
	// splash-up is a ragged, see-through burst
	let farK = smoothstep( 14.0, 3.0, in.vs.vFwd.w ) * select( 0.0, 1.0, isSheet && ! isClear );
	let erode = mix( 0.26, 0.7, t ) + farK * 0.16;
	let dens = sat( ( field - erode ) * 3.0 );
	// torn edges are thin, translucent water: soft and see-through, the core dense white
	let torn = smoothstep( erode - 0.04, erode + 0.2, field ) * ( dens * 0.45 + 0.55 );
	// ... which breaks up into a cluster of drops: many small dots in a ragged envelope that thins
	// out as it ages (sub-pixel drops average out through the mipmaps: never a solid blob)
	let dots = textureSample( sprayDots, smpLinearRepeat, uv * vec2f( 0.5, 0.32 ) + sd * 3.7 ).x;
	let swarm = dots * smoothstep( 0.25, 0.55, fib + env * 0.45 - t * 0.2 ) * ( 1.0 - t * 0.5 );
	let sheet = max( torn * ( 1.0 - smoothstep( 0.15, 0.6, t ) ), swarm );
	// mist: a soft veil of low-frequency noise that drifts and thins, never a disc
	let m1 = textureSample( sprayPuff, smpLinearRepeat, uv * 0.2 + sd ).x;
	let m2 = textureSample( sprayPuff, smpLinearRepeat, uv * 0.55 + sd * 3.1 ).x;
	let veil = smoothstep( 0.28, 0.8, m1 * 0.7 + m2 * 0.3 + env * 0.3 - 0.12 ) * sqrt( env ) * ( 1.0 - t * 0.4 );
	let shape = select( select( select( veil, sheet, isSheet ), lig, isLig ), drop, isDrop );
	// self-shadowing inside thick sheets; the forward-scattered sun lights up the thin parts
	let shade = select( 1.0, 1.0 - dens * 0.15, isSheet && ! isClear );
	let glow = select( select( 1.0, 1.0 - dens * 0.6, isSheet ), 1.0 - dens * 0.3, isClear );

	// soft intersections: opaque scene depth and the water surface under the particle
	// (depth via exact texel loads; reversed-Z, view z negative in front of the camera)
	let dsz = vec2f( textureDimensions( spraySceneDepth ) );
	let q = vec2i( clamp( in.pixel * frame.invResolution, vec2f( 0.0 ), vec2f( 0.9999 ) ) * dsz );
	let sceneZ = - viewDepth( textureLoad( spraySceneDepth, q, 0 ) );
	let posViewZ = ( frame.view * vec4f( in.P, 1.0 ) ).z;
	let soft = vMisc.z * 1.5 + 0.03;
	let fadeScene = sat( ( posViewZ - sceneZ ) / soft );
	let fadeWater = sat( ( in.P.y - vMisc.y ) / ( soft * 0.6 ) + 0.15 );
	let aOut = in.vs.vCol.w * shape * fadeScene * fadeWater * ( 1.0 - farK * 0.4 );
	if ( aOut < 0.002 ) { discard; }
	r.color = vec4f( ( in.vs.vCol.rgb * shade + in.vs.vFwd.xyz * glow ) * aOut, aOut );
`}),o=a.pipelineKey;a.pipelineKey=()=>(this._matHooked||(this._matHooked=!0,a.modules=[pc,this._hooks()]),o.call(a)),this.material=a,this.params={intensity:a.uniforms.intensity,maxDistance:a.uniforms.maxDistance};let s=this.mesh=new Ee(t,a);s.count=this.N,s.frustumCulled=!1,s.castShadow=!1,s.receiveShadow=!1,s.renderOrder=20,s.layers.set(ce.TRANSPARENT),s.name=`Spray`}};function hc(e,t,n){let r=new N({label:n,width:t,height:t,format:`rgba8unorm`,mips:!0,usage:[`sample`,`copyDst`,`render`],data:e,sampler:`linearRepeat`});return r.getGPU(),w(r),r}function gc(e=64){let t=new Uint8Array(e*e*4),n=(e,t,n)=>{let r=Math.sin(e%n*127.1+t%n*311.7+n*17.3)*43758.5453;return r-Math.floor(r)},r=(e,t,r)=>{let i=Math.floor(e),a=Math.floor(t),o=e-i,s=t-a,c=o*o*(3-2*o),l=s*s*(3-2*s),u=n(i,a,r),d=n(i+1,a,r),f=n(i,a+1,r),p=n(i+1,a+1,r);return(u*(1-c)+d*c)*(1-l)+(f*(1-c)+p*c)*l};for(let n=0;n<e;n++)for(let i=0;i<e;i++){let a=0,o=.5,s=0;for(let t=4;t<=32;t*=2)a+=r(i/e*t,n/e*t,t)*o,s+=o,o*=.55;let c=Math.max(0,Math.min(1,(a/s-.2)*1.6)),l=(n*e+i)*4;t[l]=t[l+1]=t[l+2]=Math.round(c*255),t[l+3]=255}return hc(t,e,`sprayPuff`)}function _c(e=128,t=150){let n=new Uint8Array(e*e*4),r=12345,i=()=>(r=r*1664525+1013904223>>>0)/4294967296,a=new Float32Array(e*e);for(let n=0;n<t;n++){let t=i()*e,n=i()*e,r=Math.min(.9*(1-i()*.97)**-.55,6),o=Math.ceil(r+1.5);for(let i=-o;i<=o;i++)for(let s=-o;s<=o;s++){let o=((Math.floor(t)+s)%e+e)%e,c=((Math.floor(n)+i)%e+e)%e,l=Math.hypot(Math.floor(t)+s+.5-t,Math.floor(n)+i+.5-n),u=Math.max(0,Math.min(1,r+.5-l));a[c*e+o]=Math.max(a[c*e+o],u)}}for(let t=0;t<e*e;t++){let e=Math.round(a[t]*255);n[t*4]=n[t*4+1]=n[t*4+2]=e,n[t*4+3]=255}return hc(n,e,`sprayDots`)}var vc=[0,0,0,1],yc=[0,0,0,1];function bc(e,t=0){return{species:e,seed:t,sp:xs[e],pos:[0,0,0],scale:1,q:[0,0,0,1],QA:[0,0,0,1],QB:[0,0,0,1],QC:[0,0,0,1],qH:[0,0,0,1],headOff:[0,0,0],fold:0,kneeL:[0,0,0],footL:[0,0,0],kneeR:[0,0,0],footR:[0,0,0],tailPitch:0,tailSpread:1,pPos:[0,0,0],pScale:1,pQ:[0,0,0,1],pQA:[0,0,0,1],pQB:[0,0,0,1],pQC:[0,0,0,1],fresh:!0}}function xc(e){for(let t=0;t<3;t++)e.pPos[t]=e.pos[t];for(let t=0;t<4;t++)e.pQ[t]=e.q[t],e.pQA[t]=e.QA[t],e.pQB[t]=e.QB[t],e.pQC[t]=e.QC[t];e.pScale=e.scale}function Sc(e){xc(e),e.fresh=!1}function Cc(e,t,n,r,i,a,o,s=0){let c=e.QA,l=e.QB,u=e.QC;Ks(c,0,0,1,t),qs(c,c,Ks(vc,0,1,0,n)),qs(c,c,Ks(vc,1,0,0,r)),qs(l,c,Ks(vc,0,1,0,i)),qs(u,l,Ks(vc,0,1,0,a)),qs(u,u,Ks(yc,0,0,1,o)),s!==0&&qs(u,u,Ks(vc,1,0,0,s))}function wc(e,t,n,r,i=0){let a=n-.12*Math.sin(n),o=Math.cos(a),s=Math.sin(a),c=r*Math.max(0,-s),l=t.elev+r*(.9*o+.12)+i,u=t.hand+r*.55*Math.cos(a-.7)-c*.25;Cc(e,l,t.sweep-r*.18*s+c*.1,t.twist+r*.22*s,t.elbow+c*.55,t.wrist+c*.9,u,-r*.15*s)}function Tc(e,t,n,r,i,a,o,s,c,l){let u=a-n,d=o-r,f=s-i,p=Math.hypot(u,d,f),m=(c+l)*.999;if(p>m){let e=m/p;u*=e,d*=e,f*=e,p=m,a=n+u,o=r+d,s=i+f}t[0]=a,t[1]=o,t[2]=s;let h=(c*c-l*l+p*p)/(2*Math.max(p,1e-6)),g=Math.sqrt(Math.max(0,c*c-h*h)),_=1/Math.max(p,1e-6),v=u*_,y=d*_,b=f*_,x=0,S=0,C=-1,w=x*v+S*y+C*b;x-=v*w,S-=y*w,C-=b*w;let T=Math.hypot(x,S,C)||1;e[0]=n+v*h+x/T*g,e[1]=r+y*h+S/T*g,e[2]=i+b*h+C/T*g}function Ec(e,t,n,r,i,a,o){let s=e.sp.legs;Tc(e.kneeL,e.footL,s.hip[0],s.hip[1],s.hip[2],t,n,r,s.tibia,s.tarsus),Tc(e.kneeR,e.footR,-s.hip[0],s.hip[1],s.hip[2],i,a,o,s.tibia,s.tarsus)}function Dc(e,t=0){let n=e.sp.legs;if(t<=.001){for(let t of[1,-1]){let r=t>0?e.kneeL:e.kneeR,i=t>0?e.footL:e.footR;r[0]=i[0]=t*n.hip[0],r[1]=i[1]=n.hip[1],r[2]=i[2]=n.hip[2]}return}let r=(n.tibia+n.tarsus)*(.55+.4*t),i=n.hip[1]-r*.85,a=n.hip[2]+r*.35*t-r*.4*(1-t);Ec(e,n.hip[0]*.9,i,a,-n.hip[0]*.9,i,a)}function Oc(e,t,n,r=0,i=0,a=0){Ks(e.qH,0,1,0,t),qs(e.qH,e.qH,Ks(vc,1,0,0,n)),e.headOff[0]=r,e.headOff[1]=i,e.headOff[2]=a}function kc(e,t=.9){let n=e.legs;return-n.hip[1]+(n.tibia+n.tarsus)*t*.93}var Ac=[0,0,0,1];function jc(e,t,n,r,i,a,o,s=0,c=0,l=0,u=1){let d=e.sp.legs;e.pos[0]=t,e.pos[1]=n+o,e.pos[2]=r,Ks(e.q,0,1,0,i),qs(e.q,e.q,Ks(Ac,1,0,0,-a));let f=Math.cos(a),p=Math.sin(a),m=d.hip[0]*.9*u,h=d.hip[2]*f+.25*d.tarsus*p;for(let t=0;t<2;t++){let n=s+t*Math.PI,r=h+Math.sin(n)*c*.5,i=-o+Math.max(0,Math.cos(n))*l,a=t===0?m:-m,u=i*f-r*p,g=i*p+r*f;t===0?Tc(e.kneeL,e.footL,d.hip[0],d.hip[1],d.hip[2],a,u,g,d.tibia,d.tarsus):Tc(e.kneeR,e.footR,-d.hip[0],d.hip[1],d.hip[2],a,u,g,d.tibia,d.tarsus)}}var Mc=9.81,Nc={[bs.GULL]:{speed:10.5,minSpeed:6,maxBank:.85,roll:2.6,climb:2.4,sink:.7,freq:3.1,amp:.85,glide:{elev:.1,sweep:-.12,twist:.02,elbow:.22,wrist:.5,hand:-.22},duty:.35},[bs.TERN]:{speed:9,minSpeed:5,maxBank:.95,roll:3,climb:2.2,sink:.8,freq:2.7,amp:.95,glide:{elev:.12,sweep:-.1,twist:.02,elbow:.25,wrist:.55,hand:-.12},duty:.85},[bs.PELICAN]:{speed:11,minSpeed:7,maxBank:.6,roll:1.4,climb:1.6,sink:.55,freq:1.6,amp:.62,glide:{elev:.02,sweep:-.05,twist:.02,elbow:.12,wrist:.12,hand:.06},duty:.2},[bs.FRIGATE]:{speed:9,minSpeed:6,maxBank:.55,roll:1.2,climb:1.2,sink:.45,freq:2,amp:.55,glide:{elev:.1,sweep:-.18,twist:.03,elbow:.42,wrist:.85,hand:-.28},duty:.02},[bs.SANDERLING]:{speed:13,minSpeed:6,maxBank:1,roll:4,climb:2.5,sink:1.2,freq:11,amp:.8,glide:{elev:.08,sweep:-.05,twist:.02,elbow:.3,wrist:.55,hand:-.15},duty:.8}},Pc={elev:0,sweep:0,twist:0,elbow:0,wrist:0,hand:0},Fc=class{constructor(e,t,n){this.species=e,this.sp=xs[e],this.cfg=Nc[e],this.rng=n,this.P=bc(e,t),this.P.scale=.92+n()*.16,this.x=0,this.y=0,this.z=0,this.vx=0,this.vy=0,this.vz=0,this.yaw=0,this.gamma=0,this.bank=0,this.pitch=0,this.speed=this.cfg.speed,this.phase=n()*Bs,this.flap=0,this.flapWant=0,this.burst=n()*3,this.bursting=!1,this.freqMul=.94+n()*.12,this.wander=n()*100,this.headYaw=0,this.headPitch=0,this.tailSpread=1,this.tailPitch=0,this.legs=0,this.flare=0,this.dive=0,this.hover=0,this.windK=.35,this.fold=0,this.extraPitch=0,this.twirl=0}place(e,t,n,r){this.x=e,this.y=t,this.z=n,this.yaw=r,this.vx=Math.sin(r)*this.speed,this.vz=Math.cos(r)*this.speed,this.vy=0,this.P.fresh=!0}steer(e,t,n,r,i,a=1,o=1,s=null){let c=this.cfg;this.wander+=e*.35;let l=Math.sin(this.wander*1.3)*.12+Math.sin(this.wander*.47+2)*.1,u=Ws(Math.atan2(t-this.x,r-this.z)+l*o,this.yaw),d=Math.max(this.speed,1),f=Mc*Math.tan(c.maxBank)/d,p=Vs(u*1.2*o,-f,f),m=Math.atan(p*d/Mc);this.bank+=Vs(m-this.bank,-c.roll*e,c.roll*e),this.yaw+=Mc*Math.tan(this.bank)/d*e;let h=Vs((n-this.y)*.6,-c.sink*3.5,c.climb*(a>1.5?1.6:1));this.vy+=(h-this.vy)*K(2.5,e),this.gamma=Math.asin(Vs(this.vy/d,-.9,.9)),this.speed+=(i-this.vy*.4-this.speed)*K(1.2,e),this.speed=Math.max(this.speed,c.minSpeed*.5);let g=Vs(this.vy/c.climb,0,1)*1.1+Vs((i-this.speed)/2,0,1)*.6;a>1.5&&(g=1.3),this.burst-=e,this.burst<=0&&(this.bursting=this.rng()<c.duty,this.burst=this.bursting?.8+this.rng()*2.2:1.5+this.rng()*4);let _=this.bursting?.75:0;this.flapWant=a<=0?0:Vs(Math.max(g,_*a),0,a>1.5?1.25:1);let v=Math.cos(this.gamma)*this.speed;this.vx=Math.sin(this.yaw)*v,this.vz=Math.cos(this.yaw)*v,s&&(this.vx+=s.x*this.windK,this.vz+=s.y*this.windK),this.x+=this.vx*e,this.y+=this.vy*e,this.z+=this.vz*e}animate(e){let t=this.cfg,n=this.P;n.fresh?Sc(n):xc(n),this.flap+=(this.flapWant-this.flap)*K(this.flapWant>this.flap?6:2.5,e);let r=t.freq*this.freqMul*(.85+.3*Math.min(this.flap,1.25));if(this.flap>.02)this.phase=(this.phase+Bs*r*e)%Bs;else{let t=Ws(Math.PI/2,this.phase);this.phase+=Vs(t,-Bs*r*e,Bs*r*e)}let i=t.glide,a=this.dive,o=this.flare;Pc.elev=Hs(i.elev,.25,a)+o*.45,Pc.sweep=Hs(i.sweep,.35,a)-o*.3,Pc.twist=i.twist-o*.2,Pc.elbow=Hs(i.elbow,1,a),Pc.wrist=Hs(i.wrist,1.4,a)+o*.2,Pc.hand=i.hand+o*.25,wc(n,Pc,this.phase,t.amp*Math.min(this.flap,1.25)*(1-a));let s=-Math.cos(this.phase)*.012*this.sp.length*this.flap,c=this.gamma*.7+o*.6+this.hover*.45+this.extraPitch-a*1.1;this.pitch+=(c-this.pitch)*K(4,e),Xs(n.q,this.yaw,this.pitch,-this.bank+this.twirl),n.pos[0]=this.x,n.pos[1]=this.y+s,n.pos[2]=this.z;let l=1+Math.abs(this.bank)*.9+o*.9+this.hover*.8;this.species===bs.FRIGATE&&(l=1+Math.abs(this.bank)*3.5+.8*Math.max(0,Math.sin(this.wander*1.7))+o*2),this.tailSpread+=(l-this.tailSpread)*K(3,e),n.tailSpread=this.tailSpread*(1-a*.6),n.tailPitch=o*.35+this.hover*.3-this.gamma*.2,n.fold=this.fold,Oc(n,this.headYaw,this.headPitch),Dc(n,this.legs)}},Ic=z.pier.deckHeight+.95+.0445,Lc=new n,Rc=new n,zc={[bs.GULL]:7,[bs.PELICAN]:5.5,[bs.TERN]:9},Bc=class{constructor({terrain:e,village:t,colliders:n,boat:r,boatModel:i,water:a,spray:o,seed:s=11}){this.terrain=e,this.boat=r,this.boatModel=i,this.water=a,this.spray=o,this.rng=yn(s),this.time=0,this.agents=[],this.perches=this.buildPerches(t,n),this.wind=new p;let c=this.rng,l=(e,t,n)=>{let r={kind:e,f:new Fc(t,c(),yn(Math.floor(c()*1e9))),state:`fly`,t:0,perch:null,id:this.agents.length,hy:0,hp:0,hyT:0,hpT:0,headT:0,visible:!0};return n(r),this.agents.push(r),r},u=this.perches.filter(e=>e.kinds.includes(`gull`)&&e.kind!==`sand`);for(let e=0;e<7;e++)l(`gull`,bs.GULL,t=>this.settle(t,u[Math.floor(e*u.length/7)]));let d=this.perches.filter(e=>e.kind===`sand`);for(let e=0;e<4&&e<d.length;e++)l(`gull`,bs.GULL,t=>this.settle(t,d[e]));for(let e=0;e<4;e++)l(`gull`,bs.GULL,e=>this.startRoam(e,-60+c()*200,10+c()*25,-40+c()*100));for(let e=0;e<4;e++)l(`tern`,bs.TERN,t=>{t.lane={x0:-150+e*30,x1:120+e*25,z:-10+e*18+c()*10,y:8+c()*4},t.f.place(Hs(t.lane.x0,t.lane.x1,c()),t.lane.y,t.lane.z,c()<.5?Math.PI/2:-Math.PI/2),t.state=`patrol`,t.t=4+c()*8});this.squad=[],this.squadPath=this.buildSquadPath(),this.squadS=c()*this.squadPath.length;for(let e=0;e<5;e++)this.squad.push(l(`pelican`,bs.PELICAN,t=>{t.state=`line`,t.slot=e}));this.squadFlap=3;for(let e=0;e<2;e++)l(`pelican`,bs.PELICAN,t=>this.startForage(t,20+e*60,35+e*20));let f=this.perches.filter(e=>e.kinds.includes(`pelican`)&&!e.bird);for(let e=0;e<2&&e<f.length;e++)l(`pelican`,bs.PELICAN,t=>this.settle(t,f[e]));for(let e of[[-70,-170,120],[90,-260,160],[170,-110,95],[10,40,75],[-160,-60,135]])l(`frigate`,bs.FRIGATE,t=>{t.state=`soar`,t.home={x:e[0],z:e[1]},t.circle={x:e[0],y:e[2],z:e[1],r:35+c()*35,dir:c()<.5?-1:1,t:c()*100},t.f.windK=.6;let n=c()*Bs;t.f.place(e[0]+Math.cos(n)*40,e[2],e[1]+Math.sin(n)*40,n)});for(let e of this.agents)e.f.P.fresh=!0}buildPerches(e,t){let r=[],i=this.rng,a=(e,t,n,a,o,s={})=>r.push({x:e,y:t,z:n,kind:a,kinds:o,bird:null,yawJitter:(i()-.5)*.8,...s});if(t){let e=t.boxes.filter(e=>e.tag===`pierRail`),n=[];for(let t of e){let e=t.half.z>t.half.x,r=(e?t.half.z:t.half.x)*2;for(let i=0;i<Math.max(1,Math.floor(r/3));i++){let o=(i+.5)/Math.max(1,Math.floor(r/3))-.5,s=t.center.x+(e?0:o*r),c=t.center.z+(e?o*r:0);n.some(e=>Math.hypot(e[0]-s,e[1]-c)<6.5)||(n.push([s,c]),a(s,Ic,c,`rail`,c>z.pier.zEnd-z.pier.headDepth-1?[`gull`,`pelican`]:[`gull`]))}}}if(e&&e.buildings)for(let t of e.buildings)t.stilts&&t.roofTop&&a(t.x,t.roofTop-.13,t.z,`roof`,[`gull`]);this.boat&&this.boatModel&&this.boatModel.dimensions&&a(0,0,0,`boat`,[`gull`],{local:new n(-.5,this.boatModel.dimensions.houseRoofHeight,.15)});let o=this.terrain;for(let e of[-38,-31,-35,-27,118,124]){let t=e+(i()-.5)*2,n=-60;for(;n<-20&&!(o.heightAt(t,n)<1.05);n+=.25);n-=1.2+i()*2.5,a(t,o.heightAt(t,n),n,`sand`,[`gull`])}return r}perchPosition(e,t){return e.kind===`boat`?(this.boat.toWorld(e.local,t),t):t.set(e.x,e.y,e.z)}settle(e,t){if(!t){this.startRoam(e,0,20,0);return}e.state=`perched`,e.perch=t,t.bird=e,e.t=20+this.rng()*120,e.fold=1,e.perchYaw=this.windYaw()+t.yawJitter,e.shuffle=0,e.stretch=0,e.f.P.fresh=!0}unperch(e){e.perch&&(e.perch.bird=null),e.perch=null}startRoam(e,t,n,r){e.state=`fly`,e.goal={x:t,y:n,z:r},e.t=10+this.rng()*20,e.f.P.fresh&&e.f.place(t,n,r,this.rng()*Bs)}startForage(e,t,n){e.state=`forage`,e.center={x:t,z:n,y:11+this.rng()*5,r:25+this.rng()*20,dir:this.rng()<.5?1:-1},e.t=15+this.rng()*25,e.f.P.fresh&&e.f.place(t+e.center.r,e.center.y,n,0)}takeOff(e,t,n){let r=e.f,i=r.P,a=Math.atan2(t,n),o=a+Vs(Ws(this.windYaw(),a),-.9,.9);r.x=i.pos[0],r.y=i.pos[1],r.z=i.pos[2],r.yaw=o,r.speed=r.cfg.minSpeed*.55,r.vy=1.6,r.bank=0,r.pitch=.5,r.flap=1,r.phase=.2,r.fold=e.fold,r.legs=1,e.state=`takeoff`,e.t=0,this.unperch(e)}windYaw(){return Math.atan2(-this.wind.x,-this.wind.y)}update(e,t,n,r){this.time+=e,this.lastViewer=t,this.wind.set(h.windDir.value.x,h.windDir.value.y).multiplyScalar(h.windSpeed.value);let i=1-h.night.value;this.updateSquad(e);for(let n of this.agents)switch(n.kind){case`gull`:this.updateGull(n,e,t,i);break;case`tern`:this.updateTern(n,e,t);break;case`pelican`:this.updatePelican(n,e,t);break;case`frigate`:this.updateFrigate(n,e)}let a=r.position;for(let e of this.agents){if(!e.visible)continue;let t=e.f.P,r=Math.hypot(t.pos[0]-a.x,t.pos[1]-a.y,t.pos[2]-a.z),i=e.kind===`frigate`?1400:e.kind===`pelican`?800:550;if(r>i)continue;let o=e.f.scale0||(e.f.scale0=t.scale);t.scale=o*Us(i,i*.8,r),n.write(t),t.scale=o}}threat(e,t,n,r){return e?Math.hypot(e.x-t,(e.y-n)*.7,e.z-r)-e.speed*.6:1e9}idleHead(e,t,n=0,r=1.1){e.headT-=t,e.headT<=0&&(e.headT=.4+this.rng()*2.2,e.hyT=(this.rng()-.5)*2*r,e.hpT=n+(this.rng()-.5)*.3),e.hy+=(e.hyT-e.hy)*K(14,t),e.hp+=(e.hpT-e.hp)*K(14,t)}perchedPose(e,t){let n=e.f,r=n.P,i=n.sp;r.fresh?Sc(r):xc(r);let a=this.perchPosition(e.perch,Lc),o=Ws(this.windYaw()+e.perch.yawJitter,e.perchYaw);e.shuffle=Math.max(0,e.shuffle-t),Math.abs(o)>.5&&e.shuffle<=0&&(e.shuffle=.6);let s=0,c=0;e.shuffle>0&&(e.perchYaw+=o*K(5,t),s=e.shuffle*18,c=i.legs.toe*.8);let l=n.species===bs.PELICAN,u=e.perch.kind===`boat`?this.boatYaw():0,d=kc(i)*(l?.92:1);jc(r,a.x,a.y,a.z,e.perchYaw+u,l?.12:.24,d,s,c,i.legs.toe*.3),this.idleHead(e,t,l?.75:-.12,l?.6:1.2);let f=i.length;Oc(r,e.hy,e.hp,0,(l?-.02:.03)*f,(l?-.04:.01)*f),e.stretch=Math.max(0,e.stretch-t),e.stretch<=0&&this.rng()<t/90&&(e.stretch=1.6);let p=Math.sin(Math.PI*Vs(e.stretch/1.6,0,1));e.fold=Math.min(1,e.fold+t*2.5),r.fold=e.fold*(1-p*.85),Cc(r,.2+p*.9,-.2*p,.1,.5-p*.3,.6-p*.4,.1),r.tailPitch=.12,r.tailSpread=.9,n.x=r.pos[0],n.y=r.pos[1],n.z=r.pos[2]}boatYaw(){let e=this.boat.quaternion;return Math.atan2(2*(e.w*e.y+e.x*e.z),1-2*(e.y*e.y+e.x*e.x))}takeoffStep(e,t,n){let r=e.f;e.t+=t,r.fold=Math.max(0,1-e.t/.18),r.legs=Math.max(0,1-e.t/.7),r.extraPitch=.35*Math.max(0,1-e.t/.9);let i=Math.sin(r.yaw),a=Math.cos(r.yaw);r.steer(t,r.x+i*30,r.y+6,r.z+a*30,r.cfg.speed,2,.2,this.wind),r.animate(t),e.t>1.1&&(r.extraPitch=0,r.legs=0,r.fold=0,n())}beginLanding(e,t){let n=e.f,r=this.perchPosition(t,Rc),i=kc(n.sp)*(n.species===bs.PELICAN?.92:1),a=Vs(Math.hypot(r.x-n.x,r.y+i-n.y,r.z-n.z)/Math.max(4,n.speed)*1.7,1.2,4);e.land={x0:n.x,y0:n.y,z0:n.z,vx:n.vx,vy:n.vy,vz:n.vz,T:a,h:i},e.state=`land`,e.t=0,e.perch=t,t.bird=e}landStep(e,t){let n=e.f,r=e.land;e.t+=t;let i=Math.min(1,e.t/r.T),a=this.perchPosition(e.perch,Rc),o=a.x,s=a.y+r.h,c=a.z,l=2*i*i*i-3*i*i+1,u=i*i*i-2*i*i+i,d=-2*i*i*i+3*i*i,f=i*i*i-i*i,p=6*i*i-6*i,m=3*i*i-4*i+1,h=-6*i*i+6*i,g=3*i*i-2*i,_=r.T,v=(o-r.x0)*.05,y=(c-r.z0)*.05;n.x=l*r.x0+u*_*r.vx+d*o+f*_*v,n.y=l*r.y0+u*_*r.vy+d*s+f*_*.2,n.z=l*r.z0+u*_*r.vz+d*c+f*_*y;let b=(p*r.x0+m*_*r.vx+h*o+g*_*v)/_,x=(p*r.y0+m*_*r.vy+h*s+g*_*.2)/_,S=(p*r.z0+m*_*r.vz+h*c+g*_*y)/_,C=Math.hypot(b,S);if(C>.3){let e=Math.atan2(b,S),r=Ws(e,n.yaw);n.bank+=(Vs(r/Math.max(t,.001)*C/9.81,-.6,.6)-n.bank)*K(6,t),n.yaw=e}if(n.vx=b,n.vy=x,n.vz=S,n.speed=Math.hypot(C,x),n.gamma=Math.atan2(x,Math.max(C,.1)),n.flare=Us(.45,.9,i),n.legs=Us(.3,.75,i),n.flapWant=i>.55?.6:.15,n.animate(t),i>=1){let t=e.perch;e.state=`perched`,e.t=25+this.rng()*120,e.fold=0,e.stretch=.8,e.perchYaw=n.yaw,n.flare=0,n.legs=0,t.bird=e}}updateGull(e,t,n,r){let i=e.f;switch(e.state){case`perched`:{this.perchedPose(e,t);let a=i.P,o=this.threat(n,a.pos[0],a.pos[1],a.pos[2]),s=zc[bs.GULL]*(e.perch.kind===`sand`?1.6:1),c=e.perch.kind===`boat`&&(this.boat.driven||this.boat.speed>.8);e.t-=t*r,o<s||c?(e.alarm=(e.alarm||0)+t,e.alarm>.15+e.id%5*.07&&this.takeOff(e,a.pos[0]-(n?n.x:a.pos[0]),a.pos[2]-(n?n.z:a.pos[2]+1))):e.t<=0?this.takeOff(e,Math.sin(e.perchYaw),Math.cos(e.perchYaw)):e.alarm=0;break}case`takeoff`:this.takeoffStep(e,t,()=>{e.state=`fly`,e.t=12+this.rng()*25,e.goal={x:i.x+Math.sin(i.yaw)*60,y:i.y+8+this.rng()*10,z:i.z+Math.cos(i.yaw)*60}});break;case`fly`:{e.t-=t;let a=e.goal;if(Math.hypot(a.x-i.x,a.z-i.z)<12||e.t<=0){let t=this.rng();if(t<.3||r<.3){let t=this.pickPerch(e,n,r<.3);if(t){e.state=`approach`,e.perch=t,t.bird=e;break}}if(t<.6){e.state=`circle`,e.circle={x:i.x+(this.rng()-.5)*30,z:i.z+(this.rng()-.5)*30,r:14+this.rng()*14,dir:this.rng()<.5?-1:1,y:i.y},e.t=10+this.rng()*20;break}this.newGullGoal(e)}this.flyTo(e,t,a.x,a.y,a.z,i.cfg.speed,1);break}case`circle`:{e.t-=t;let n=e.circle;n.x+=this.wind.x*.25*t,n.z+=this.wind.y*.25*t,n.y=Math.min(n.y+t*.5,45);let r=Math.atan2(i.z-n.z,i.x-n.x)+n.dir*.6;this.flyTo(e,t,n.x+Math.cos(r)*n.r,n.y,n.z+Math.sin(r)*n.r,i.cfg.speed*.9,0,1.6),e.t<=0&&(e.state=`fly`,e.t=15+this.rng()*20,this.newGullGoal(e));break}case`approach`:{let r=this.perchPosition(e.perch,Lc),a=-this.wind.x,o=-this.wind.y,s=Math.hypot(a,o)||1,c=r.x-a/s*16,l=r.z-o/s*16,u=Math.hypot(c-i.x,l-i.z);if(this.threat(n,r.x,r.y,r.z)<zc[bs.GULL]*2.5||e.perch.kind===`boat`&&this.boat.driven){this.unperch(e),e.state=`fly`,this.newGullGoal(e);break}u<5?this.beginLanding(e,e.perch):this.flyTo(e,t,c,r.y+2.5,l,i.cfg.speed*.85,1);break}case`land`:this.landStep(e,t)}}newGullGoal(e,t=this.lastViewer){let n=this.rng,r=n();e.goal=t&&r<.35?{x:t.x+(n()-.5)*70,y:7+n()*12,z:Math.max(t.z+(n()-.5)*50,-75)}:r<.6?{x:-120+n()*280,y:4+n()*5,z:-38+n()*12}:{x:-150+n()*380,y:8+n()*30,z:-70+n()*190},e.t=20+n()*20}pickPerch(e,t,n){let r=null,i=-1/0;for(let a of this.perches){if(a.bird||!a.kinds.includes(e.kind)||a.kind===`boat`&&(this.boat.driven||this.boat.speed>.5))continue;let o=this.perchPosition(a,Lc);if(this.threat(t,o.x,o.y,o.z)<18)continue;let s=-Math.hypot(o.x-e.f.x,o.z-e.f.z)*.01+this.rng()*2+(n&&a.kind!==`sand`?1:0);s>i&&(i=s,r=a)}return r}flyTo(e,t,n,r,i,a,o,s=1){let c=e.f,l=c.x+c.vx*2,u=c.z+c.vz*2,d=Math.max(this.terrain.heightAt(l,u),this.terrain.heightAt(c.x,c.z),0),f=d+(d>.5?6:2);c.steer(t,n,Math.max(r,f),i,a,o,s,this.wind),c.y<f-1.5&&(c.y+=(f-1.5-c.y)*K(3,t)),c.animate(t)}updateTern(e,t,n){let r=e.f,i=e.lane,a=this.water.height(e,r.x,r.z);switch(e.state){case`patrol`:e.t-=t,r.x>i.x1?e.dir=-1:r.x<i.x0&&(e.dir=1),e.dir=e.dir||1,r.headPitch+=(.7-r.headPitch)*K(3,t),this.flyTo(e,t,r.x+e.dir*40,i.y+Math.sin(this.time*.4+e.id)*1.5,i.z+Math.sin(this.time*.13+e.id*2)*12,r.cfg.speed,1,.8),e.t<=0&&(e.state=`hover`,e.t=1.5+this.rng()*2.5);break;case`hover`:{e.t-=t,r.hover+=(1-r.hover)*K(4,t);let n=this.windYaw(),i=Math.max(this.wind.length(),3),a=r.x+Math.sin(n)*10,o=r.z+Math.cos(n)*10;r.windK=1,r.steer(t,a,r.y,o,i*.95,1,1.5,this.wind),r.x-=r.vx*t*.85,r.z-=r.vz*t*.85,r.flapWant=.7,r.headPitch+=(1.1-r.headPitch)*K(5,t),r.animate(t),e.t<=0&&(r.windK=.35,this.rng()<.45?(e.state=`dive`,e.t=0):(e.state=`patrol`,e.t=5+this.rng()*10,r.hover=0));break}case`dive`:e.t+=t,r.hover=Math.max(0,r.hover-t*4),r.dive+=(1-r.dive)*K(6,t),r.flapWant=0,r.speed=Math.min(14,r.speed+15*t),r.vy=-r.speed*.85,r.gamma=-1.1,r.x+=Math.sin(r.yaw)*r.speed*.3*t,r.z+=Math.cos(r.yaw)*r.speed*.3*t,r.y+=r.vy*t,r.animate(t),r.y<a+.05&&(this.splash(r.x,a,r.z,.35),e.state=`under`,e.t=.35+this.rng()*.3,e.visible=!1);break;case`under`:e.t-=t,r.y=a-.3,e.t<=0&&(e.visible=!0,r.P.fresh=!0,r.dive=0,r.y=a+.05,r.speed=4,r.vy=2.5,r.pitch=.6,r.flap=1.2,this.splash(r.x,a,r.z,.15),e.state=`patrol`,e.t=6+this.rng()*10)}}splash(e,t,n,r){if(!this.spray)return;let i=this.spray;Lc.set(e,t+.05,n),i.emit(Lc,Rc.set(0,3.5*Math.sqrt(r),0),Math.round(110*r),.03+.02*r,cc.DROPLET,{spread:1.6+r*1.5,jitter:.12+.3*r,life:1.3}),i.emit(Lc,Rc.set(0,2.2*Math.sqrt(r),0),Math.round(35*r),.08+.1*r,cc.SPRAY,{spread:.9+r,jitter:.15+.3*r,life:1.1}),i.emit(Lc,Rc.set(0,.2,0),Math.round(18*r)+2,.12+.25*r,cc.FOAM,{spread:.5+.6*r,jitter:.1+.4*r,life:3}),r>.5&&i.emit(Lc,Rc.set(0,.8,0),10,.35,cc.MIST,{spread:.6,jitter:.5,life:2.2})}buildSquadPath(){let e=[],t=e=>5.8*Math.exp(-(((e-z.pier.x)/11)**2)),r=(n,r,i,a,o)=>{for(let s=0;s<=o;s++){let c=Hs(n,r,s/o);e.push([c,i+Math.sin(s*.9)*3,a+(i<45?t(c):0)])}};r(-210,230,16,1.1,30);for(let t=1;t<8;t++){let n=-Math.PI/2+t/8*Math.PI;e.push([230+Math.cos(n)*50,66+Math.sin(n)*50,1.1+t*.6])}r(230,-210,116,5,22);for(let t=1;t<8;t++){let n=Math.PI/2+t/8*Math.PI;e.push([-210+Math.cos(n)*50,66+Math.sin(n)*50,5-t*.55])}let i=new u(e.map(e=>new n(e[0],e[2],e[1])),!0,`centripetal`);return{curve:i,length:i.getLength(),pt:new n,tan:new n}}updateSquad(e){let t=this.squadPath;this.squadS=(this.squadS+11*e)%t.length,this.squadFlap-=e,this.squadFlap<=0&&(this.squadFlap=5+this.rng()*7,this.squadBeat=this.time,this.squadBeats=3+Math.floor(this.rng()*4))}squadMember(e,t){let n=this.squadPath,r=e.f,i=2.9+e.slot%2*.4,a=(this.squadS-e.slot*i+n.length)%n.length;n.curve.getPointAt(a/n.length,n.pt),n.curve.getTangentAt(a/n.length,n.tan);let o=(e.slot%2?1:-1)*Math.min(e.slot,1)*.9,s=n.tan.x,c=n.tan.z,l=Math.hypot(s,c)||1,u=n.pt.x-c/l*o,d=n.pt.z+s/l*o,f=this.water.height(e,u,d),p=Math.max(f,0)*.8+n.pt.y+Math.sin(this.time*.7+e.slot)*.15;r.P.fresh&&r.place(u,p,d,Math.atan2(s,c));let m=(u-r.x)/Math.max(t,1e-4),h=(d-r.z)/Math.max(t,1e-4),g=(p-r.y)/Math.max(t,1e-4),_=Math.atan2(s,c),v=Ws(_,r.yaw)/Math.max(t,1e-4);r.bank+=(Vs(v*11/9.81,-.5,.5)-r.bank)*K(3,t),r.yaw=_,r.x=u,r.y=p,r.z=d,r.vx=m,r.vz=h,r.vy=Vs(g,-3,3),r.gamma=Math.atan2(r.vy,11);let y=this.time-(this.squadBeat??-1e3)-e.slot*.38,b=this.squadBeats||0;r.flapWant=y>0&&y<b/r.cfg.freq?.8:0,y>0&&y<.1&&(r.phase=0),r.animate(t)}updatePelican(e,t,n){let r=e.f;switch(e.state){case`line`:this.squadMember(e,t);break;case`perched`:{this.perchedPose(e,t);let i=r.P,a=this.threat(n,i.pos[0],i.pos[1],i.pos[2]);e.t-=t,a<zc[bs.PELICAN]?(e.alarm=(e.alarm||0)+t,e.alarm>.3&&this.takeOff(e,i.pos[0]-n.x,i.pos[2]-n.z)):e.alarm=0,e.t<=0&&e.state===`perched`&&this.takeOff(e,Math.sin(e.perchYaw),Math.cos(e.perchYaw));break}case`takeoff`:this.takeoffStep(e,t,()=>this.startForage(e,r.x+Math.sin(r.yaw)*40,r.z+Math.cos(r.yaw)*40));break;case`forage`:{e.t-=t;let i=e.center,a=Math.atan2(r.z-i.z,r.x-i.x)+i.dir*.5;if(r.headPitch+=(.35-r.headPitch)*K(2,t),this.flyTo(e,t,i.x+Math.cos(a)*i.r,i.y,i.z+Math.sin(a)*i.r,r.cfg.speed*.9,1,1.2),e.t<=0){if(this.rng()<.6)e.state=`dive`,e.t=0,e.twist=this.rng()<.5?-1:1;else{let t=this.pickPerch(e,n,!1);t?(e.state=`approach`,e.perch=t,t.bird=e):this.startForage(e,-60+this.rng()*200,10+this.rng()*70)}}break}case`dive`:{e.t+=t;let n=this.water.height(e,r.x,r.z);r.dive+=(1-r.dive)*K(3.5,t),r.flapWant=0,r.speed=Math.min(17,r.speed+12*t),r.vy=-r.speed*Math.min(.9,.3+e.t*1.2),r.gamma=Math.asin(Vs(r.vy/r.speed,-.95,0));let i=Math.max(r.speed*Math.cos(r.gamma),0);r.x+=Math.sin(r.yaw)*i*t,r.z+=Math.cos(r.yaw)*i*t,r.y+=r.vy*t,r.twirl=e.twist*Us(3.5,1,r.y-n)*1.9,r.animate(t),r.y<n+.3&&(this.splash(r.x,n,r.z,1),e.state=`float`,e.t=0,e.floatYaw=r.yaw,r.twirl=0,r.dive=0,r.P.fresh=!0);break}case`float`:{e.t+=t;let i=r.P;i.fresh?Sc(i):xc(i);let a=this.water.height(e,r.x,r.z);r.y+=(a+.02-r.y)*K(6,t),e.floatYaw+=Ws(this.windYaw(),e.floatYaw)*K(.3,t),r.yaw=e.floatYaw,Xs(i.q,r.yaw,.08+Math.sin(this.time*1.3+e.id)*.04,Math.sin(this.time*.9+e.id)*.05),i.pos[0]=r.x,i.pos[1]=r.y,i.pos[2]=r.z;let o=e.t<3?1.1:e.t<4.5?-.9:.55;e.hp+=(o-e.hp)*K(3,t),Oc(i,0,e.hp,0,-.02,-.03),i.fold=1,Cc(i,.2,0,.1,.5,.6,.1),Dc(i),i.tailPitch=-.1,i.tailSpread=.9;let s=this.threat(n,r.x,r.y,r.z);(e.t>10+e.id%4*3||s<9)&&(e.state=`watertakeoff`,e.t=0,r.yaw=this.windYaw()+(this.rng()-.5)*.6,r.speed=1,r.vy=0,r.pitch=.3,r.fold=1,r.flap=.8,r.phase=.3);break}case`watertakeoff`:{e.t+=t;let n=this.water.height(e,r.x,r.z);r.fold=Math.max(0,1-e.t/.3),r.speed=Math.min(11,r.speed+t*4),r.legs=+(e.t<2),r.flapWant=1.25,r.x+=Math.sin(r.yaw)*r.speed*t,r.z+=Math.cos(r.yaw)*r.speed*t,r.vx=Math.sin(r.yaw)*r.speed,r.vz=Math.cos(r.yaw)*r.speed;let i=Us(1.4,2.6,e.t);r.vy=i*1.2,r.y=Math.max(r.y+r.vy*t,n+.12),r.gamma=.1*i,r.extraPitch=.25*(1-i);let a=r.phase;r.animate(t),i<.9&&r.phase<a&&this.splash(r.x,n,r.z,.12),e.t>3&&(r.extraPitch=0,r.legs=0,this.startForage(e,r.x+Math.sin(r.yaw)*50,r.z+Math.cos(r.yaw)*50));break}case`approach`:{let i=this.perchPosition(e.perch,Lc),a=-this.wind.x,o=-this.wind.y,s=Math.hypot(a,o)||1,c=i.x-a/s*22,l=i.z-o/s*22;if(this.threat(n,i.x,i.y,i.z)<12){this.unperch(e),this.startForage(e,r.x,r.z);break}Math.hypot(c-r.x,l-r.z)<6?this.beginLanding(e,e.perch):this.flyTo(e,t,c,i.y+3,l,r.cfg.speed*.85,1);break}case`land`:this.landStep(e,t)}}updateFrigate(e,t){let n=e.f,r=e.circle;r.t+=t,r.x+=(this.wind.x*.3+(e.home.x-r.x)*.01)*t,r.z+=(this.wind.y*.3+(e.home.z-r.z)*.01)*t;let i=r.y+Math.sin(r.t*.05)*20,a=Math.atan2(n.z-r.z,n.x-r.x)+r.dir*.45;n.headYaw+=(r.dir*.25-n.headYaw)*K(1,t),this.flyTo(e,t,r.x+Math.cos(a)*r.r,i,r.z+Math.sin(a)*r.r,n.cfg.speed,+(n.y<i-25),1.4)}},Vc={GHOST:0,HERMIT:1,BURROW:2},Hc=(e,t)=>Math.sign(e)*Math.abs(e)**+t;function Uc(e,t){let n=e*Math.PI*2,r=Math.cos(n),i=Math.sin(n),a=t*Math.PI,o=Math.sin(a)**.55,s=Math.cos(a),c=.43*Hc(r,.35)*o,l=.5*Hc(i,.35)*o*(1-.12*Math.max(0,-r));return c>0&&(c*=1-.05*(1-Math.abs(i))),[l,(s>0?.2*Hc(s,.6):.1*Hc(s,.8))+.02*Math.cos(n)*o,c]}function Wc(e,t){let n=e*Math.PI*2,r=qc(Gc,t),i=qc(Kc,t),a=i*Math.sin(n),o=i*Math.cos(n),s=.66,c=Math.cos(s),l=Math.sin(s);return[a,.74-r*l+o*c,.05+r*c+o*l]}var Gc=[[0,-.9],[.15,-.7],[.35,-.42],[.55,-.12],[.72,.12],[.86,.32],[.95,.46],[1,.5]],Kc=[[0,0],[.15,.2],[.35,.42],[.55,.62],[.72,.72],[.86,.66],[.95,.44],[1,.18]],qc=(e,t)=>{if(t<=e[0][0])return e[0][1];for(let n=1;n<e.length;n++)if(t<=e[n][0]){let r=e[n-1],i=e[n],a=(t-r[0])/(i[0]-r[0]);return r[1]+(i[1]-r[1])*(a*a*(3-2*a))}return e[e.length-1][1]};function Jc(e,t){let n=e*Math.PI*2,r=1+1.4*Math.max(0,Math.cos(n))**2,i=t<.34?.5*t/.34:.5+(t-.34)/.66*1.6*r,a=Math.exp(-(((t-.4)/.1)**2))*.2,o=t>.34?.12*Math.sin(Math.PI*(t-.34)/.66)*(r-.6):0,s=t<.34?-.05+.2*(t/.34)**2:a+o;return[i*Math.sin(n),Math.max(s,0)*.9+.01,i*Math.cos(n)]}var Yc=[Uc,Wc,Jc];function Xc(e){let t=[],n=(e,n,i,a)=>{let o=[.62,.2,-.18,-.6][n],s=e>0?o:Math.PI-o;t.push(new r(e*.44,.06,.2-n*.14,s),new r(i[0],i[1],i[2],a))};if(e===0){for(let e of[1,-1])for(let t=0;t<4;t++)n(e,t,[.58-t*.02,.28,.55-Math.abs(t-1.5)*.05],.045);t.push(new r(.22,.05,.38,1.25),new r(.3,.22,.34,.07)),t.push(new r(-.22,.05,.38,Math.PI-1.25),new r(.26,.18,.27,.055)),t.push(new r(.36,.17,.4,1.35),new r(.2,.18,0,.05)),t.push(new r(-.36,.17,.4,Math.PI-1.35),new r(.2,.18,0,.05))}else if(e===1){for(let e of[1,-1])for(let t=0;t<4;t++)n(e,t,t<2?[.36,.22,.34]:[0,0,0],.06);for(let e=0;e<8;e+=2)t[e].z+=.32;t.push(new r(.14,.12,.62,1.35),new r(.18,.14,.34,.1)),t.push(new r(-.14,.12,.6,Math.PI-1.35),new r(.14,.1,.2,.065)),t.push(new r(.08,.3,.66,1.45),new r(.18,.1,0,.035)),t.push(new r(-.08,.3,.66,Math.PI-1.45),new r(.18,.1,0,.035))}else for(let e=0;e<12;e++)t.push(new r,new r);return t}function Zc(){let e=[],t=Yc.length,n=new Float32Array(t*110*8),r=(e,t)=>e*12+t%12;for(let t=0;t<8;t++)for(let n=0;n<12;n++)e.push(r(t,n),r(t+1,n),r(t,n+1),r(t,n+1),r(t+1,n),r(t+1,n+1));for(let t=0;t<12;t++)e.push(108,r(0,t),r(0,t+1)),e.push(109,r(8,t+1),r(8,t));for(let i=0;i<t;i++){let t=Yc[i],a=new Float32Array(330),o=new Float32Array(110);for(let e=0;e<9;e++){let n=(e+1)/10;for(let i=0;i<12;i++)a.set(t(i/12,n),r(e,i)*3),o[r(e,i)]=n}a.set(t(0,0),324),a.set(t(0,1),327),o[108]=0,o[109]=1;let s=new Be;s.setAttribute(`position`,new De(a,3)),s.setIndex(e.slice()),s.computeVertexNormals();let c=s.attributes.normal.array;for(let e=0;e<110;e++){let t=e<108?e%12/12:0;n.set([a[e*3],a[e*3+1],a[e*3+2],t,c[e*3],c[e*3+1],c[e*3+2],o[e]],(i*110+e)*8)}}let i=[],a=[],o=110;for(let e=0;e<110;e++)i.push(-1,0,0,0),a.push(0,0);let s=(e,t,n,r,s,c)=>(i.push(e,t,n,r),a.push(s,c),o++);for(let t=0;t<12;t++){let n=t===8||t===9,r=t>=10,i=n?[[0,0,1],[1,0,1],[2,0,1.6],[2,.45,2.1],[2,1,.9]]:r?[[0,0,1],[1,0,.8],[1,.5,1.6],[1,1,1.3]]:[[0,0,1.15],[1,0,1],[2,0,.8]],a=o;for(let[e,n,r]of i)for(let i=0;i<4;i++){let a=i/4*Math.PI*2+Math.PI/4;s(t,e,n,r,Math.cos(a),Math.sin(a))}let c=s(t,r?1:2,n?1.18:r?1.12:1,0,0,0),l=i.length;for(let t=0;t<l-1;t++)for(let n=0;n<4;n++){let r=a+t*4+n,i=a+t*4+(n+1)%4;e.push(r,r+4,i,i,r+4,i+4)}for(let t=0;t<4;t++)e.push(a+(l-1)*4+t,c,a+(l-1)*4+(t+1)%4)}let c=new Be,l=new Float32Array(o*3),u=new Float32Array(o*3);for(let e=0;e<o;e++)u[e*3+1]=1;c.setAttribute(`position`,new De(l,3)),c.setAttribute(`normal`,new De(u,3)),c.setAttribute(`aLimb`,new Ve(i,4)),c.setAttribute(`aRing`,new Ve(a,2)),c.setIndex(e);let d=[];for(let e=0;e<t;e++)d.push(...Xc(e));return{geometry:c,bodyData:n,limbs:d,species:t,vertices:o,triangles:e.length/3}}var Qc=6,$c=e=>{let t=String(+e.toFixed(6));return t.includes(`.`)||t.includes(`e`)?t:t+`.0`},el=(e,t,n)=>`vec3f( ${$c(e**2.2)}, ${$c(t**2.2)}, ${$c(n**2.2)} )`,tl=[0,Math.PI,0,Math.PI,Math.PI,0,Math.PI,0],nl=class{constructor({capacity:e=160}={}){let t=Zc();this.template=t,this.bodyBuffer=new ve({label:`critterBodies`,count:t.bodyData.length/4,type:`vec4f`,data:t.bodyData}),this.limbs=t.limbs,this.records=new rc(`critterInstances`,e,Qc),this.material=this.createMaterial(),this.mesh=ic(`Critters`,t.geometry,this.material,this.records,{castShadow:!1}),this.triangles=t.triangles}begin(){this.records.begin()}write(e){let t=this.records.push();if(t<0)return;let n=this.records.data;n[t]=e.x,n[t+1]=e.y,n[t+2]=e.z,n[t+3]=e.scale,n[t+4]=e.q[0],n[t+5]=e.q[1],n[t+6]=e.q[2],n[t+7]=e.q[3],n[t+8]=e.species,n[t+9]=e.phase,n[t+10]=e.stride,n[t+11]=e.lift,n[t+12]=e.out,n[t+13]=e.eyes,n[t+14]=e.claws,n[t+15]=e.seed,n[t+16]=e.px,n[t+17]=e.py,n[t+18]=e.pz,n[t+19]=e.pPhase,n[t+20]=e.pq[0],n[t+21]=e.pq[1],n[t+22]=e.pq[2],n[t+23]=e.pq[3]}commit(){this.records.commit()}get count(){return this.records.count}createMaterial(){let e=this.records,t=t=>e.field(t),n=tl.map(e=>new r(e,0,0,0)),i=new g({name:`critterJoints`,deps:[Gs],code:`
struct CritterJoints { j0: vec3f, j1: vec3f, j2: vec3f, j3: vec3f, r: f32 };

fn critterDir( az: f32, el: f32 ) -> vec3f { return vec3f( cos( az ) * cos( el ), sin( el ), sin( az ) * cos( el ) ); }

fn critterJoints( si: u32, k: u32, ph: f32, stride: f32, lift: f32, outK: f32, eyes: f32, claws: f32 ) -> CritterJoints {
	let a = mat.critterLimbs[ si * 24u + k * 2u ];
	let L = mat.critterLimbs[ si * 24u + k * 2u + 1u ];
	let kf = f32( k );
	let isLeg = kf < 7.5; let isClaw = kf > 7.5 && kf < 9.5;
	let side = select( -1.0, 1.0, a.x > 0.0 );
	let p = ph + mat.critterGait[ min( k, 7u ) ].x;
	let swing = max( sin( p ), 0.0 ) * stride;
	let az = a.w + cos( p ) * stride * 0.28 * select( 0.0, 1.0, isLeg );
	let j0 = vec3f( a.x, a.y + lift, a.z );
	var j1 = vec3f( 0.0 ); var j2 = vec3f( 0.0 ); var j3 = vec3f( 0.0 );
	if ( isLeg ) {
		// merus up and out, carpus level, dactyl reaching down to the ground
		j1 = j0 + critterDir( az, 0.62 + swing * 0.22 ) * L.x;
		j2 = j1 + critterDir( az, -0.15 + swing * 0.15 ) * L.y;
		let e3 = asin( clamp( - j2.y / max( L.z, 1e-4 ), -0.99, -0.25 ) ) + swing * 0.25;
		j3 = j2 + critterDir( az, e3 ) * L.z;
	} else if ( isClaw ) {
		// chelipeds folded in front of the mouth, lifted when feeding / threatening
		let inward = side * 0.95;
		j1 = j0 + critterDir( az, -0.35 + claws * 0.5 ) * L.x;
		j2 = j1 + critterDir( az + inward, 0.25 + claws * 0.6 ) * L.y;
		j3 = j2 + critterDir( az + inward * 1.55, -0.25 + claws * 0.4 ) * L.z;
	} else {
		// eyestalks: up when alert, folded along the front edge when running for the burrow
		let el = mix( 0.05, 1.3, eyes );
		j1 = j0 + critterDir( az, el * 0.8 ) * L.x;
		j2 = j1 + critterDir( az, el ) * L.y;
		j3 = j2;
	}
	// hermit crabs pull everything back into the aperture
	let hole = vec3f( 0.0, lift + 0.32, 0.5 );
	let isHermit = si == ${Vc.HERMIT}u;
	let k2 = select( 1.0, outK, isHermit );
	var J: CritterJoints;
	J.j0 = mix( hole, j0, k2 ); J.j1 = mix( hole, j1, k2 ); J.j2 = mix( hole, j2, k2 ); J.j3 = mix( hole, j3, k2 );
	J.r = L.w * select( 1.0, outK * 0.7 + 0.3, isHermit );
	return J;
}

// a vertex of limb k at ( segment, t, radius ) around the segment; returns position (xyz) and
// writes the normal
fn critterLimbVertex( J: CritterJoints, seg: f32, t: f32, rs: f32, ring: vec2f, n: ptr<function, vec3f> ) -> vec3f {
	let a = select( select( J.j2, J.j1, seg < 1.5 ), J.j0, seg < 0.5 );
	let b = select( select( J.j3, J.j2, seg < 1.5 ), J.j1, seg < 0.5 );
	let d0 = b - a;
	let d = d0 / max( length( d0 ), 1e-5 );
	let rf = select( vec3f( 0.0, 1.0, 0.0 ), vec3f( 1.0, 0.0, 0.0 ), abs( d.y ) > 0.9 );
	let ax = normalize( cross( d, rf ) );
	let ay = cross( ax, d );
	let radial = ax * ring.x + ay * ring.y;
	*n = normalize( radial + d * select( 0.0, 1.0, rs < 0.01 ) );
	return mix( a, b, t ) + radial * ( J.r * rs );
}
`});return new $e({name:`Critters`,roughness:.6,metalness:0,underwaterLighting:`none`,modules:[Gs,i],uniforms:{critterLimbs:[`vec4f[${this.limbs.length}]`,this.limbs],critterGait:[`vec4f[8]`,n]},storage:{critterInstances:e.buffer,critterBodies:this.bodyBuffer},attributes:{aLimb:`vec4f`,aRing:`vec2f`},varyings:{vCritInfo:`vec4f`,vCritLocal:`vec3f`},vertex:`
	let r0 = ${t(0)}; let q = ${t(1)}; let r2 = ${t(2)}; let r3 = ${t(3)}; let p4 = ${t(4)}; let pq = ${t(5)};
	let si = u32( r2.x + 0.5 );
	let lift = r2.w; let outK = r3.x;
	var pl = vec3f( 0.0 ); var pp = vec3f( 0.0 ); var nl = vec3f( 0.0, 1.0, 0.0 );
	var info = vec4f( 0.0 );
	let k = v.aLimb.x;

	if ( k < 0.0 ) {

		// body grid: carapace / shell (lifted on the legs) or the burrow mound
		let base = ( si * 110u + v.vertex ) * 2u;
		let A = critterBodies[ base ]; let B = critterBodies[ base + 1u ];
		let up = select( lift, 0.0, si == ${Vc.BURROW}u );
		pl = A.xyz + vec3f( 0.0, up, 0.0 );
		nl = B.xyz;
		pp = pl;
		info = vec4f( 0.0, A.w, B.w, 0.0 );

	} else {

		let ki = u32( k );
		let J = critterJoints( si, ki, r2.y, r2.z, lift, outK, r3.y, r3.z );
		var n = vec3f( 0.0 );
		pl = critterLimbVertex( J, v.aLimb.y, v.aLimb.z, v.aLimb.w, v.aRing, &n );
		nl = n;
		let Jp = critterJoints( si, ki, p4.w, r2.z, lift, outK, r3.y, r3.z );
		var np = vec3f( 0.0 );
		pp = critterLimbVertex( Jp, v.aLimb.y, v.aLimb.z, v.aLimb.w, v.aRing, &np );
		let part = select( select( 3.0, 2.0, k < 9.5 ), 1.0, k < 7.5 );
		info = vec4f( part, v.aLimb.y + v.aLimb.z, v.aLimb.w, 0.0 );

	}

	// ghost crabs sink into their burrow (the sand hides what is below)
	let sink = select( 0.0, ( 1.0 - outK ) * 1.3, si == ${Vc.GHOST}u );
	pl.y -= sink;
	pp.y -= sink;
	o.vCritLocal = pl;
	o.vCritInfo = vec4f( info.xyz, r2.x + fract( r3.w ) * 0.9 );
	let world = r0.xyz + rotateQ( q, pl * r0.w );
	let prev = p4.xyz + rotateQ( pq, pp * r0.w );
	v.useWorld = true;
	v.worldPos = world;
	v.worldNormal = rotateQ( q, nl );
	v.prevWorldPos = prev;
`,surface:`
	let vInfo = in.vs.vCritInfo;
	let part = floor( vInfo.x + 0.5 );
	let u = vInfo.y; let v = vInfo.z;
	let species = floor( vInfo.w ); let seed = fract( vInfo.w ) / 0.9;
	let P = in.vs.vCritLocal;
	let n = mx_noise_float3( P * 14.0 + seed * 17.0 );
	var c = vec3f( 0.5 );
	var rough = 0.6;

	if ( species == ${$c(Vc.GHOST)} ) {

		// ghost crab: pale straw carapace with fine granules, whitish legs and claws, black
		// club-shaped eyes on the stalks
		let straw = mix( ${el(.8,.73,.58)}, ${el(.88,.83,.7)}, n * 0.5 + 0.5 );
		let body = straw * mix( 0.86, 1.04, smoothstep( 0.0, 0.18, P.y ) );
		let legs = mix( ${el(.86,.82,.72)}, ${el(.7,.62,.5)}, smoothstep( 0.8, 1.0, fract( u ) ) * 0.5 );
		let claw = mix( ${el(.9,.87,.8)}, ${el(.78,.7,.75)}, smoothstep( 1.6, 2.3, u ) );
		let eye = mix( ${el(.8,.75,.62)}, ${el(.04,.04,.045)}, smoothstep( 1.25, 1.4, u ) );
		c = select( select( select( eye, claw, part == 2.0 ), legs, part == 1.0 ), body, part == 0.0 );
		rough = select( 0.55, 0.15, part == 3.0 && u > 1.3 );

	} else if ( species == ${$c(Vc.HERMIT)} ) {

		// hermit crab: turban shell (banded / mottled / chequered by seed), red-orange legs
		// with pale tips, a purple claw; the aperture shows the crab's dark body
		let turns = u + v * 3.2; // spiral: sutures along u + v * turns
		let suture = smoothstep( 0.9, 0.97, fract( turns ) ) * smoothstep( 0.05, 0.3, v );
		let kind = floor( fract( seed * 3.7 ) * 3.0 );
		let c1 = select( select( ${el(.85,.8,.7)}, ${el(.72,.42,.2)}, kind == 1.0 ), ${el(.9,.86,.78)}, kind == 0.0 );
		let c2 = select( select( ${el(.55,.35,.22)}, ${el(.35,.18,.08)}, kind == 1.0 ), ${el(.12,.11,.1)}, kind == 0.0 );
		let bands = select(
			smoothstep( 0.2, 0.8, sin( v * 31.0 + n * 2.0 ) ),
			smoothstep( 0.3, 0.7, sin( u * ${$c(43.9824)} + sin( v * 40.0 ) * 1.5 ) ), // zigzag
			kind == 0.0 );
		let shellC = mix( c1, c2, bands * 0.8 ) * ( 1.0 - suture * 0.5 ) * ( n * 0.12 + 0.94 );
		let aperture = smoothstep( 0.86, 0.93, v );
		let body = mix( shellC, ${el(.35,.12,.08)}, aperture );
		let legs = mix( ${el(.72,.28,.12)}, ${el(.9,.78,.6)}, smoothstep( 2.6, 3.0, u ) );
		let claw = mix( ${el(.42,.14,.4)}, ${el(.85,.5,.2)}, smoothstep( 2.5, 3.1, u ) );
		c = select( select( select( ${el(.1,.08,.06)}, claw, part == 2.0 ), legs, part == 1.0 ), body, part == 0.0 );
		rough = select( 0.5, 0.45, part == 0.0 );

	} else {

		// burrow: dark shaft, damp dug-out sand around the lip, loose clumps fanned out; the
		// rim fades into the beach
		let dry = ${el(.86,.79,.64)} * ( n * 0.1 + 0.95 );
		let damp = ${el(.66,.58,.45)};
		let clumps = smoothstep( 0.35, 0.55, mx_noise_float3( P * 38.0 + seed * 5.0 ) );
		let sand = mix( mix( damp, dry, smoothstep( 0.4, 0.75, v ) ), dry * 1.06, clumps * 0.5 );
		let hole = smoothstep( 0.36, 0.2, v );
		c = mix( sand, ${el(.035,.03,.025)}, hole );
		rough = 0.9;
		// dithered fade at the outer edge (resolved by the temporal filter)
		let fade = smoothstep( 1.0, 0.72, v );
		let noise = interleavedGradientNoise( in.pixel + fract( frame.time * 7.13 ) * 97.0 );
		if ( noise > fade ) { discard; }

	}

	s.albedo = c;
	s.roughness = rough;
`})}},rl=36,il=34,al=32,ol=14,sl=12,cl=class{constructor({terrain:e,village:t=null,colliders:n=null,vegetation:r=null,seed:i=5}){this.terrain=e,this.rng=yn(i),this.burrows=this.placeBurrows(t,n),this.homes=this.placeHomes(r,n),this.grid=new Map,this.burrows.forEach((e,t)=>this.cell(e.x,e.z).push(t)),this.ghosts=[],this.hermits=[],this.time=0,this.scan=0,this.nearBurrows=[],this._rec={x:0,y:0,z:0,scale:1,q:[0,0,0,1],species:0,phase:0,stride:0,lift:0,out:1,eyes:1,claws:0,seed:0,px:0,py:0,pz:0,pPhase:0,pq:[0,0,0,1]}}cell(e,t){let n=Math.floor(e/sl)*4096+Math.floor(t/sl),r=this.grid.get(n);return r||this.grid.set(n,r=[]),r}okGround(e,t,n,r){let i=this.terrain;if(n&&n.groundHeightAt(e,t,100)>-1/0)return!1;if(r&&r.getFootprints){for(let n of r.getFootprints())if(Math.hypot(n.x-e,n.z-t)<n.r)return!1}let a=.8,o=i.heightAt(e+a,t)-i.heightAt(e-a,t),s=i.heightAt(e,t+a)-i.heightAt(e,t-a);return Math.hypot(o,s)/(2*a)<.22}sandAt(e,t){let n=this.terrain,r=Math.floor((e-n.origin)/n.texel),i=Math.floor((t-n.origin)/n.texel);return r<0||i<0||r>=n.res||i>=n.res?0:n.sand[i*n.res+r]/255}placeBurrows(e,t){let n=this.terrain,r=this.rng,i=[],a=z.beach;for(let o=a.xMin+4;o<a.xMax-4;o+=1.7)for(let a=-110;a<-40;a+=1.7){let s=o+(r()-.5)*1.6,c=a+(r()-.5)*1.6,l=n.heightAt(s,c);if(l<1||l>4.5||this.sandAt(s,c)<.75||Math.abs(s-z.pier.x)<4.5)continue;let u=.16*Us(1,1.4,l)*(1-.6*Us(2.5,4.5,l));r()>u||this.okGround(s,c,t,e)&&(i.some(e=>Math.abs(e.x-s)<2.2&&Math.abs(e.z-c)<2.2)||i.push({x:s,z:c,y:l,yaw:r()*Bs,seed:r(),size:.85+r()*.35,resident:r()<.75,crab:null,hideT:r()*30}))}return i}placeHomes(e,t){let n=this.rng,r=[],i=z.beach,a=e&&e.records?e.records.palms:[];for(let e of a){if(e.x<i.xMin||e.x>i.xMax||e.z<-130||e.z>-50||e.y<1||e.y>9||n()>.55)continue;let a=n()*Bs,o=.8+n()*2.2,s=e.x+Math.cos(a)*o,c=e.z+Math.sin(a)*o;this.okGround(s,c,t,null)&&r.push({x:s,z:c,seed:n(),crab:null})}for(let e=0;e<40&&r.length<60;e++){let e=i.xMin+10+n()*(i.xMax-i.xMin-20),a=-100;for(;a<-45&&!(this.terrain.heightAt(e,a)<3.2);a+=1);Math.abs(e-z.pier.x)<5||!this.okGround(e,a-2,t,null)||r.push({x:e,z:a-2-n()*4,seed:n(),crab:null})}return r}update(e,t,n,r,i=null){this.time+=e;let a=r.position,o=h.night.value,s=h.sunDir.value.y;this.activity=Vs(.45+.5*Math.max(o,Us(.35,.05,s)),0,.95),this.scan-=e,this.scan<=0&&(this.scan=.25,this.assign(a));for(let n of this.ghosts)this.updateGhost(n,e,t);for(let n of this.hermits)this.updateHermit(n,e,t);let c=this._rec;for(let e of this.nearBurrows){let t=Math.hypot(e.x-a.x,e.z-a.z);t>il||(this.burrowRecord(e,c,Us(il,il*.75,t)),n.write(c))}for(let e of this.ghosts)if(e.visible){if(this.crabRecord(e,c,a),c.scale<=0)continue;n.write(c),i&&i.add(e.x,e.y,e.z,c.scale*.75,c.scale*(e.lift+.12),Us(.35,.8,e.out),e.sx,e.sz)}for(let e of this.hermits)this.crabRecord(e,c,a),!(c.scale<=0)&&(n.write(c),i&&i.add(e.x,e.y,e.z,c.scale*.8,c.scale*.45,.9,e.sx,e.sz))}assign(e){let t=this.nearBurrows;t.length=0;let n=Math.ceil(rl/sl),r=Math.floor(e.x/sl),i=Math.floor(e.z/sl);for(let a=r-n;a<=r+n;a++)for(let r=i-n;r<=i+n;r++){let n=this.grid.get(a*4096+r);if(n)for(let r of n){let n=this.burrows[r];Math.hypot(n.x-e.x,n.z-e.z)<rl&&t.push(n)}}for(let t=this.ghosts.length-1;t>=0;t--){let n=this.ghosts[t];Math.hypot(n.home.x-e.x,n.home.z-e.z)>40&&(n.home.crab=null,this.ghosts.splice(t,1))}t.sort((t,n)=>Math.hypot(t.x-e.x,t.z-e.z)-Math.hypot(n.x-e.x,n.z-e.z));for(let n of t){if(this.ghosts.length>=al)break;!n.crab&&n.resident&&(n.crab=this.spawnGhost(n,Math.hypot(n.x-e.x,n.z-e.z)),this.ghosts.push(n.crab))}for(let t=this.hermits.length-1;t>=0;t--){let n=this.hermits[t];Math.hypot(n.home.x-e.x,n.home.z-e.z)>32.8&&(n.home.crab=null,this.hermits.splice(t,1))}for(let t of this.homes){if(this.hermits.length>=ol)break;t.crab||Math.hypot(t.x-e.x,t.z-e.z)>rl*.8||(t.crab=this.spawnHermit(t),this.hermits.push(t.crab))}}newCrab(e,t,n){return{species:e,home:t,seed:n,x:t.x,z:t.z,y:0,yaw:this.rng()*Bs,bodyYaw:0,speed:0,vx:0,vz:0,phase:this.rng()*Bs,pPhase:0,stride:0,lift:.3,out:1,eyes:1,claws:0,state:`idle`,t:1,tx:t.x,tz:t.z,want:0,q:[0,0,0,1],pq:[0,0,0,1],px:0,py:0,pz:0,fresh:!0,visible:!0,fade:0,alarm:0,feed:0,size:e===Vc.GHOST?(.034+n*.022)*t.size:.028+n*.016}}spawnGhost(e,t){let n=this.newCrab(Vc.GHOST,e,e.seed);if(this.rng()<this.activity&&t>12){let t=this.rng()*Bs,r=.5+this.rng()*4;n.x=e.x+Math.cos(t)*r,n.z=e.z+Math.sin(t)*r,n.state=`idle`,n.t=.5+this.rng()*3}else n.state=`hidden`,n.out=0,n.visible=!1,n.x=e.x,n.z=e.z,n.t=3+this.rng()*20;return n.bodyYaw=this.rng()*Bs,n}spawnHermit(e){let t=this.newCrab(Vc.HERMIT,e,e.seed);t.state=`idle`,t.t=this.rng()*5,t.eyes=1;let n=this.rng()*Bs;return t.x=e.x+Math.cos(n)*this.rng()*2,t.z=e.z+Math.sin(n)*this.rng()*2,t.lift=.08,t}threat(e,t){if(!t||t.mode===`boat`)return{d:1e9,closing:0};let n=e.x-t.x,r=e.z-t.z,i=Math.hypot(n,r);return Math.abs(t.y-e.y)>6?{d:1e9,closing:0}:{d:i,closing:t.speed}}moveTo(e,t,n,r=12){let i=e.tx-e.x,a=e.tz-e.z,o=Math.hypot(i,a),s=o<.02?0:Math.min(n,o*6);if(e.speed+=Vs(s-e.speed,-r*2*t,r*t),o>1e-4){let n=Math.min(e.speed*t,o);if(e.vx=i/o*e.speed,e.vz=a/o*e.speed,e.x+=i/o*n,e.z+=a/o*n,e.species===Vc.GHOST){let n=Math.atan2(i,a),r=n+Math.PI/2,o=n-Math.PI/2,s=Math.abs(Ws(r,e.bodyYaw))<Math.abs(Ws(o,e.bodyYaw))?r:o;e.bodyYaw+=Ws(s,e.bodyYaw)*K(14,t)}else e.bodyYaw+=Ws(Math.atan2(i,a),e.bodyYaw)*K(3,t)}return o}pickSpot(e,t,n,r=0){let i=this.rng()*Bs,a=t+this.rng()*(n-t);e.tx=e.home.x+Math.cos(i)*a,e.tz=e.home.z+Math.sin(i)*a+r}updateGhost(e,t,n){let r=e.home;e.pPhase=e.phase;let i=this.threat(e,n),a=i.d<6.5+i.closing*1.2,o=i.d<10+i.closing*1.5;switch(e.t-=t,e.state){case`hidden`:e.visible=!1,e.out=0,i.d<10&&(e.t=Math.max(e.t,4+this.rng()*6)),e.t<=0&&(e.state=`peek`,e.t=1.5+this.rng()*3,e.x=r.x,e.z=r.z,e.visible=!0,e.fresh=!0);break;case`peek`:e.out+=(.45-e.out)*K(3,t),e.eyes=1,o?(e.state=`enter`,e.t=.3):e.t<=0&&(e.state=`emerge`,e.t=.5);break;case`emerge`:e.out=Math.min(1,e.out+t*1.6),o?e.state=`enter`:e.out>=1&&(e.state=`idle`,e.t=1+this.rng()*3);break;case`idle`:if(e.feed+=t*4,e.claws=.25+.25*Math.max(0,Math.sin(e.feed)),this.moveTo(e,t,0),a)this.flee(e,n);else if(o)e.state=`freeze`,e.t=.8+this.rng()*1.5;else if(e.t<=0){let t=this.rng();t<.15&&this.time>2?e.state=`return`:(e.state=t<.45?`dash`:`walk`,this.pickSpot(e,.5,t<.45?5:2.5,this.rng()<.2?3:0),e.t=5)}break;case`walk`:case`dash`:{let r=e.state===`dash`?1.2+e.seed*.9:.12+e.seed*.1,i=this.moveTo(e,t,r);e.claws=.1,a?this.flee(e,n):o?(e.state=`freeze`,e.t=.6+this.rng()*1.5):(i<.05||e.t<=0)&&(e.state=`idle`,e.t=1+this.rng()*5);break}case`freeze`:this.moveTo(e,t,0,30),e.claws=.05,a?this.flee(e,n):e.t<=0&&(o?this.flee(e,n):(e.state=`idle`,e.t=1+this.rng()*2));break;case`flee`:{let n=this.moveTo(e,t,2.1+e.seed*.9,25);e.claws=0,e.eyes=e.target?.6:1,n<.08&&(e.target?(e.state=`enter`,e.t=.25):(e.state=`freeze`,e.t=2+this.rng()*3));break}case`return`:{e.tx=r.x,e.tz=r.z;let i=this.moveTo(e,t,.3+e.seed*.2);a?this.flee(e,n):i<.05&&(e.state=`enter`,e.t=.4);break}case`enter`:e.speed=0,e.x+=(e.home.x-e.x)*K(20,t),e.z+=(e.home.z-e.z)*K(20,t),e.out=Math.max(0,e.out-t/.22),e.eyes=Math.max(0,e.eyes-t*4),e.out<=0&&(e.state=`hidden`,e.visible=!1,e.t=12+this.rng()*25+(1-this.activity)*30)}let s=e.size,c=Vs(e.speed/(s*2.4),0,13);e.phase=(e.phase+Bs*c*t)%(Bs*64),e.stride+=(Vs(e.speed/(s*10),0,1)-e.stride)*K(10,t);let l=e.state===`freeze`?.26:e.speed>.6?.4:.32;e.lift+=(l-e.lift)*K(8,t),e.state!==`enter`&&e.state!==`peek`&&(e.eyes+=(1-e.eyes)*K(6,t))}flee(e,t){e.state=`flee`;let n=e.x-t.x,r=e.z-t.z,i=Math.hypot(n,r)||1,a=null,o=-1/0,s=t=>{if(t.crab&&t.crab!==e)return;let s=t.x-e.x,c=t.z-e.z,l=Math.hypot(s,c);if(l>11)return;let u=l>.01?(s*n+c*r)/(l*i):1;if(u<-.35&&l>1.2)return;let d=-l*.5+u*2+(t===e.home?1.5:0);d>o&&(o=d,a=t)};s(e.home);for(let e of this.nearBurrows)s(e);if(a)a!==e.home&&(e.home.crab=null,e.home=a,a.crab=e),e.target=a,e.tx=a.x,e.tz=a.z;else{e.target=null;let t=Math.atan2(n,r)+(this.rng()-.5)*1.2,i=4+this.rng()*5;e.tx=e.x+Math.sin(t)*i,e.tz=e.z+Math.cos(t)*i}}updateHermit(e,t,n){e.pPhase=e.phase;let r=this.threat(e,n);e.t-=t;let i=r.d<2.2+r.closing*.6;switch(e.state){case`idle`:this.moveTo(e,t,0),i?this.withdraw(e):e.t<=0&&(e.state=`walk`,this.pickSpot(e,0,3),e.t=20);break;case`walk`:{let n=this.moveTo(e,t,.035+e.seed*.03,.3);i?this.withdraw(e):(n<.03||e.t<=0)&&(e.state=`idle`,e.t=3+this.rng()*12);break}case`withdrawn`:e.speed=0,e.out=Math.max(0,e.out-t/.25),r.d<4&&(e.t=Math.max(e.t,6+this.rng()*8)),e.t<=0&&(e.state=`emerge`);break;case`emerge`:e.out=Math.min(1,e.out+t/2.5),i?this.withdraw(e):e.out>=1&&(e.state=`idle`,e.t=2+this.rng()*4)}let a=e.size;e.phase=(e.phase+Bs*Vs(e.speed/(a*1.6),0,6)*t)%(Bs*64),e.stride+=(Vs(e.speed/(a*3),0,1)-e.stride)*K(6,t),e.lift+=((e.out>.5?.14:0)*e.out-e.lift)*K(6,t),e.claws=.15,e.eyes=e.out}withdraw(e){e.state=`withdrawn`,e.t=8+this.rng()*10}crabRecord(e,t,n){let r=this.terrain,i=Math.hypot(e.x-n.x,e.z-n.z),a=e.fade=Math.min(1,e.fade+.05);if(t.scale=e.size*Us(il,il*.72,i)*a,t.scale<=0)return;let o=r.heightAt(e.x,e.z);e.y=o;let s=.15,c=r.heightAt(e.x-s,e.z)-r.heightAt(e.x+s,e.z),l=r.heightAt(e.x,e.z-s)-r.heightAt(e.x,e.z+s),u=Math.hypot(c,2*s,l);e.sx=-c/(2*s),e.sz=-l/(2*s);for(let t=0;t<4;t++)e.pq[t]=e.q[t];if(nc(e.q,e.bodyYaw,c/u,2*s/u,l/u),e.fresh){e.px=e.x,e.py=o,e.pz=e.z;for(let t=0;t<4;t++)e.pq[t]=e.q[t];e.pPhase=e.phase,e.fresh=!1}t.x=e.x,t.y=o,t.z=e.z;for(let n=0;n<4;n++)t.q[n]=e.q[n],t.pq[n]=e.pq[n];t.species=e.species,t.phase=e.phase,t.pPhase=e.pPhase,t.stride=e.stride,t.lift=e.lift,t.out=e.out,t.eyes=e.eyes,t.claws=e.claws,t.seed=e.seed,t.px=e.px,t.py=e.py,t.pz=e.pz,e.px=e.x,e.py=o,e.pz=e.z}burrowRecord(e,t,n){let r=this.terrain;if(t.x=e.x,t.y=e.y,t.z=e.z,t.scale=.05*e.size*n,!e.q){e.q=[0,0,0,1];let t=.3,n=r.heightAt(e.x-t,e.z)-r.heightAt(e.x+t,e.z),i=r.heightAt(e.x,e.z-t)-r.heightAt(e.x,e.z+t),a=Math.hypot(n,2*t,i);nc(e.q,e.yaw,n/a,2*t/a,i/a)}for(let n=0;n<4;n++)t.q[n]=t.pq[n]=e.q[n];t.species=Vc.BURROW,t.phase=t.pPhase=0,t.stride=0,t.lift=0,t.out=1,t.eyes=0,t.claws=0,t.seed=e.seed,t.px=e.x,t.py=e.y,t.pz=e.z}},ll=class{constructor({capacity:e=160}={}){this.records=new rc(`blobInstances`,e,2);let t=this.records,n=new Oe(2,2);n.rotateX(-Math.PI/2);let r=e=>t.field(e),i=new $e({name:`ContactShadows`,lit:!1,transparent:!0,blending:`premultiplied`,depthWrite:!1,velocityWeight:0,storage:{blobInstances:t.buffer},varyings:{vBlobUV:`vec2f`,vBlobInfo:`vec4f`},vertex:`
	let r0 = ${r(0)}; let r1 = ${r(1)};
	// the quad covers the blob and its sun shadow (offset away from the light, stretched)
	let L = frame.sunDir;
	let lh = max( length( L.xz ), 1e-3 );
	let dir = - L.xz / lh;
	let reach = min( r1.x * lh / max( L.y, 0.12 ), r0.w * 4.0 );
	let p = v.position;
	let side = vec2f( dir.y, - dir.x ); // (keeps the winding: the quad faces up)
	let s = r0.w * 1.6;
	let along = p.z * ( s + reach * 0.5 ) + reach * 0.5;
	let xz = r0.xz + dir * along + side * ( p.x * s );
	o.vBlobUV = vec2f( along, p.x * s );
	o.vBlobInfo = vec4f( r0.w, reach, r1.y, L.y );
	let off = xz - r0.xz;
	v.useWorld = true;
	v.worldPos = vec3f( xz.x, r0.y + off.x * r1.z + off.y * r1.w + 0.012, xz.y );
	v.worldNormal = vec3f( 0.0, 1.0, 0.0 );
`,surface:`
	let vUV = in.vs.vBlobUV; let vInfo = in.vs.vBlobInfo;
	let r = vInfo.x; let reach = vInfo.y; let dark = vInfo.z;
	let q = vUV / r;
	// occlusion right below, the sun shadow stretched along the light
	let ao = exp( dot( q, q ) * -2.2 ) * 0.55;
	let t = clamp( vUV.x / max( reach, 1e-3 ), 0.0, 1.0 );
	let c = vec2f( vUV.x - reach * t, vUV.y ) / r;
	let sun = exp( dot( c, c ) * -1.6 ) * 0.6 * select( 0.0, 1.0, vInfo.w > 0.0 );
	s.albedo = vec3f( 0.0 );
	s.emissive = vec3f( 0.0 );
	s.alpha = max( ao, sun ) * dark * ( ( 1.0 - frame.night ) * 0.6 + 0.4 );
`});this.material=i,this.mesh=ic(`ContactShadows`,n,i,t,{}),this.mesh.castShadow=!1,this.mesh.receiveShadow=!1,this.mesh.layers.set(ce.TRANSPARENT),this.mesh.renderOrder=-1}begin(){this.records.begin()}add(e,t,n,r,i,a=1,o=0,s=0){let c=this.records.push();if(c<0)return;let l=this.records.data;l[c]=e,l[c+1]=t,l[c+2]=n,l[c+3]=r,l[c+4]=i,l[c+5]=a,l[c+6]=o,l[c+7]=s}commit(){this.records.commit()}},ul=class{constructor(e,{shore:t,terrainGPU:n,count:r=32,interval:i=6}){this.renderer=e,this.shore=t,this.n=r,this.interval=i,this._frame=0,this.inputs=new Float32Array(r*4),this.inputBuffer=new ve({label:`swashProbeIn`,count:r,type:`vec4f`}),this.results=new ve({label:`swashProbe`,count:r,type:`vec4f`}),this.readback=new ye({byteLength:r*16,label:`swashProbe`}),this.cpu=new Float32Array(r*4),this.valid=!1,this.issued=new Float32Array(r*4),this.resultTime=0,this._pending=!1,this._inputsCopy=new Float32Array(r*4),this.active=!1,this.kernel=new C({label:`Swash Probe`,modules:[n.module,t.module],bindings:{swashIn:{storage:this.inputBuffer,access:`read`},swashOut:{storage:this.results,access:`read_write`}},workgroupSize:[32,1,1],code:`
@compute @workgroup_size( WG_X, WG_Y, WG_Z )
fn main( @builtin( global_invocation_id ) gid: vec3u ) {
	let i = gid.x;
	if ( i >= ${r}u ) { return; }
	let q = swashIn[ i ];
	if ( q.w > 0.5 ) {
		let p = q.xy;
		let ground = terrainHeightAt( p );
		let sw = shoreEvaluateNoNormal( p, frame.seaLevel - ground, ground );
		swashOut[ i ] = vec4f( sw.runup, sw.inland, sw.dRdt, sw.tau );
	}
}
`}),this.readback.onData=e=>{this.cpu.set(new Float32Array(e)),this.issued.set(this._inputsCopy),this.resultTime=this._issuedTime,this.valid=!0,this._pending=!1}}set(e,t,n){let r=e*4;this.inputs[r]=t,this.inputs[r+1]=n,this.inputs[r+3]=1,this.active=!0}clear(e){this.inputs[e*4+3]=0}update(){if(this.disabled){this.active=!1;return}this.active&&(this.active=!1,!(this._pending||this._frame++%this.interval!==0)&&(this.inputBuffer.write(this.inputs),this.kernel.dispatch(Math.ceil(this.n/32)),this._issuedTime=h.time.value,this._inputsCopy.set(this.inputs),this._pending=this.readback.request(this.results)))}get(e,t){if(this.disabled||!this.valid||this.issued[e*4+3]<.5)return null;let n=this.cpu,r=e*4,i=h.time.value-this.resultTime,a=n[r+3]+i/Math.max(this.shore.period.value,1);if(t.inland=n[r+1],t.x=this.issued[r],t.z=this.issued[r+1],t.age=i,a<1)t.runup=n[r]+n[r+2]*i,t.speed=n[r+2];else{let e=(a-1)*this.shore.period.value;t.speed=3.2*Math.max(.2,1-e/3),t.runup=.35+3.2*e*(1-e/6)}return t.tau=a%1,t}},dl=.066,fl=190,pl=15,ml=8,hl={runup:0,inland:0,speed:0,tau:0,x:0,z:0,age:0},gl=new n,_l=new n,vl=class{constructor({terrain:e,probe:t=null,seed:n=17}){this.terrain=e,this.probe=t,this.rng=yn(n),this.time=0,this.birds=[],this.flocks=[{x:22,range:[-135,z.pier.x-9],n:12},{x:115,range:[z.pier.x+9,z.beach.xMax-8],n:9}];for(let e of this.flocks){e.birds=[],e.state=`feed`,e.drift=this.rng()<.5?-1:1,e.alarm=0;for(let t=0;t<e.n;t++){let t=this.newBird(e,this.birds.length);e.birds.push(t),this.birds.push(t)}}}newBird(e,t){let n=this.rng,r=new Fc(bs.SANDERLING,n(),yn(Math.floor(n()*1e9)));r.windK=.25;let i={F:e,f:r,index:t,state:`feed`,x:e.x+(n()-.5)*10,z:-42,y:0,yaw:n()*Bs,v:0,vx:0,vz:0,offset:(n()-.5)*11,margin:n(),phase:n()*Bs,peck:0,peckT:n(),head:0,stop:0,hop:0,fold:1,t:0,lx:0,lz:0,form:[(n()-.5)*4,(n()-.5)*1.2,(n()-.5)*3]};return i.z=this.frontGuess(i.x)-1-n()*2,i.y=this.terrain.heightAt(i.x,i.z),i}frontGuess(e,t=.35){let n=this.terrain,r=-70;for(;r<-10&&!(n.heightAt(e,r)<t);r+=.5);return r}slopeAt(e,t,n){let r=this.terrain,i=.6,a=(r.heightAt(e+i,t)-r.heightAt(e-i,t))/(2*i),o=(r.heightAt(e,t+i)-r.heightAt(e,t-i))/(2*i),s=Math.hypot(a,o);return n.set(a/(s||1),s,o/(s||1)),n}update(e,t,n,r,i=null){this.time+=e;let a=r.position,o=h.night.value;for(let n of this.flocks){let r=0;for(let e of n.birds)r+=e.x;r/=n.birds.length,n.cx=r,!(Math.hypot(r-a.x,-40-a.z)>310)&&this.updateFlock(n,e,t,o)}for(let e of this.birds){let t=e.f.P,r=Math.hypot(t.pos[0]-a.x,t.pos[1]-a.y,t.pos[2]-a.z);if(r>fl)continue;let o=e.scale0||=t.scale;if(t.scale=o*Us(fl,fl*.8,r),n.write(t),t.scale=o,i&&e.state!==`fly`){let t=this.slopeAt(e.x,e.z,_l);i.add(e.x,e.y,e.z,.06*o,.06*o,.85,t.x*t.y,t.z*t.y)}}this.probe&&this.probe.update()}updateFlock(e,t,n,r){let i=1e9,a=!1;if(n&&n.mode!==`boat`){for(let t of e.birds)t.state!==`fly`&&(i=Math.min(i,Math.hypot(t.x-n.x,t.z-n.z)));a=n.speed>3.5}e.away=n?Math.sign(e.cx-n.x)||1:e.drift;let o=i<ml||a&&i<ml*1.7;e.state===`feed`&&o?(e.alarm+=t,e.alarm>.15&&this.flush(e,n)):e.alarm=Math.max(0,e.alarm-t),e.wary=i<pl+(a?6:0),e.x=e.x??e.cx,e.state===`feed`&&(this.rng()<t/25&&(e.drift=-e.drift),e.x+=e.drift*.25*t+(e.wary?e.away*1.4*t:0),e.x=Vs(e.x,e.range[0]+8,e.range[1]-8)),e.state===`fly`&&this.flockFlight(e,t);for(let i of e.birds)i.state===`fly`?this.flyBird(i,t):this.groundBird(i,t,n,r);e.state===`fly`&&e.birds.every(e=>e.state!==`fly`)&&(e.state=`feed`,e.x=e.cx)}groundBird(e,t,n,r){let i=e.F,a=this.terrain,o=this.slopeAt(e.x,e.z,_l),s=o.x,c=o.z,l=Math.max(o.y,.015),u=-c,d=s,f=a.heightAt(e.x,e.z),p=3,m=0,g=!1,_=this.probe?this.probe.get(e.index,hl):null;if(_&&_.age<1.5){let e=_.runup;p=(Math.max(f-h.seaLevel.value,0)/dl-e)*dl/l,m=_.speed*dl/l,g=_.speed>.05}else p=(f-.35)/l;this.probe&&this.probe.set(e.index,e.x,e.z);let v=g?1+e.margin*1.2:.15+e.margin*.55;r>.6&&(v=6+e.margin*1.5);let y=Vs((g?m:0)+(v-p)*2.2,-1.3,2.4),b=Vs((i.x+e.offset-e.x)*.6,-.9,.9);i.wary&&(b=i.away*(1.3+e.margin*.5));for(let t of i.birds){if(t===e||t.state===`fly`)continue;let n=e.x-t.x,r=e.z-t.z,i=n*n+r*r;if(i<.25&&i>1e-6){let e=Math.sqrt(i);b+=(n*u+r*d)/e*(.5-e)*3,y+=(n*s+r*c)/e*(.5-e)*3}}let x=v-p,S=p<.25&&g;e.stop=Math.max(0,e.stop-t),e.stop>0?(S||i.wary||Math.abs(x)>.8+e.margin*.5||Math.abs(b)>.7)&&(e.stop=0):Math.abs(x)<.3&&Math.abs(b)<.55&&!S&&!i.wary&&(e.stop=.5+this.rng()*1.6);let C=e.stop>0?0:1,w=(s*y+u*b)*C,T=(c*y+d*b)*C,E=K(14,t);e.vx+=(w-e.vx)*E,e.vz+=(T-e.vz)*E,e.v=Math.hypot(e.vx,e.vz),e.x+=e.vx*t,e.z+=e.vz*t,e.x=Vs(e.x,i.range[0],i.range[1]),e.v>.15&&(e.yaw+=Ws(Math.atan2(e.vx,e.vz),e.yaw)*K(16,t)),S&&p<-.35&&e.hop<=0&&(e.hop=.45),e.hop=Math.max(0,e.hop-t),e.peckT+=t*(e.stop>0?4.5:0);let D=e.stop>0?Math.max(0,Math.sin(e.peckT*Math.PI))**.6:0;e.head+=(D-e.head)*K(30,t);let O=e.v>.05?Vs(5+e.v*5,5,14):0;e.phase=(e.phase+Bs*O*t)%Bs,e.y=a.heightAt(e.x,e.z),this.groundPoseOf(e,t,O>0?e.v/O:0)}groundPoseOf(e,t,n){let r=e.f,i=r.P,a=r.sp;i.fresh?Sc(i):xc(i);let o=Math.sin(Math.PI*e.hop/.45),s=kc(a),c=n>0?.012:0;if(jc(i,e.x,e.y+o*.12,e.z,e.yaw,-.08*e.head+(n>0?-.05:.04),s,e.phase,Math.min(n,.07),c),Oc(i,0,-.1+e.head*1.15,0,-.006*e.head,.004*e.head),e.fold=Math.min(1,e.fold+t*4),o>0){let e=this.time*60;Cc(i,.4+Math.cos(e)*.7,0,0,.3,.5,0),i.fold=1-o}else Cc(i,.2,0,.1,.5,.6,.1),i.fold=e.fold;i.tailPitch=.05,i.tailSpread=1,r.x=i.pos[0],r.y=i.pos[1],r.z=i.pos[2]}flush(e,t){e.state=`fly`;let r=this.rng,i=e.cx,a=e.away,o=i+a*(55+r()*50);(o<e.range[0]+10||o>e.range[1]-10)&&(a=-a,o=Vs((t?t.x:i)+a*(50+r()*40),e.range[0]+10,e.range[1]-10));let s=this.frontGuess(i),c=this.frontGuess(o),l=(i+o)/2,d=[[i,.6,s],[i+a*10,2.2,s+7],[l-a*12,3+r()*2,s+14+r()*8],[l+a*14,2.5+r()*2,c+12+r()*8],[o-a*12,1.4,c+4],[o,.4,c-1.5]];e.path=new u(d.map(e=>new n(e[0],e[1],e[2])),!1,`centripetal`),e.len=e.path.getLength(),e.s=0,e.dest=o;for(let t of e.birds){t.state=`fly`,t.t=-r()*.3,t.lx=o+t.offset*.8,t.lz=c-.5-t.margin*2;let e=t.f;e.x=t.x,e.y=t.y+.06,e.z=t.z,e.yaw=Math.atan2(d[1][0]-t.x,d[1][2]-t.z),e.speed=3,e.vy=1.5,e.flap=0,e.bank=0,e.pitch=.3,e.fold=1}}flockFlight(e,t){e.s=Math.min(e.len,e.s+t*12.5),e.path.getPointAt(e.s/e.len,gl),e.path.getTangentAt(e.s/e.len,_l),e.px=gl.x,e.py=gl.y,e.pz=gl.z,e.hx=_l.x,e.hz=_l.z}flyBird(e,t){let n=e.F,r=e.f;if(e.t+=t,e.t<0){this.groundPoseOf(e,t,0);return}r.fold=Math.max(0,r.fold-t*8);let i=Math.hypot(n.hx,n.hz)||1,a=n.hx/i,o=n.hz/i,s=e.form,c=n.px+a*s[2]-o*s[0],l=n.py+s[1]*.6,u=n.pz+o*s[2]+a*s[0],d=n.s>=n.len-.01,f=Math.hypot(e.lx-r.x,e.lz-r.z);(d||n.s>n.len-14)&&(c=e.lx,u=e.lz,l=this.terrain.heightAt(e.lx,e.lz)+Math.min(1.2,f*.25));let p=Vs(9+(Math.hypot(c-r.x,u-r.z)-2)*1.2,5,16);r.steer(t,c,l,u,p,e.t<.6?2:1,2.2);let m=Math.max(this.terrain.heightAt(r.x,r.z),0);r.y<m+.25&&(r.y=m+.25),r.flare=Us(3,.8,f)*(d?1:.5),r.legs=Us(2.5,.8,f),r.animate(t),f<.6&&r.y<m+.45&&n.s>n.len-14&&(e.state=`feed`,e.x=r.x,e.z=r.z,e.vx=r.vx*.3,e.vz=r.vz*.3,e.yaw=r.yaw,e.fold=0,r.flare=0,r.legs=0,e.stop=0)}},yl=class{constructor(e,t=8){this.query=e,this.n=t,this.start=-1;try{e&&(this.start=e.allocate(`wildlife`,t))}catch(e){console.warn(`Wildlife: no water query slots`,e)}this.keys=Array(t).fill(null),this.used=new Int32Array(t).fill(-1e6),this.since=new Int32Array(t),this.frame=0}height(e,t,n){let r=this.query;if(this.start<0)return 0;let i=this.keys.indexOf(e);if(i<0){i=0;for(let e=1;e<this.n;e++)this.used[e]<this.used[i]&&(i=e);this.keys[i]=e,this.since[i]=this.frame}this.used[i]=this.frame;let a=this.start+i;r.setPoint(a,t,n);let o=r.cpu[a*4];return r.cpuValid&&this.frame-this.since[i]>4&&Number.isFinite(o)?o:0}endFrame(){this.frame++}},bl=class{constructor({scene:e,renderer:t,terrain:n,terrainGPU:r=null,shore:i=null,village:a=null,colliders:o=null,vegetation:s=null,boat:c=null,boatModel:l=null,query:u=null,spray:d=null,csm:f=null}){this.terrain=n,this.birdBatch=new sc({csm:f}),e.add(this.birdBatch.mesh),this.critterBatch=new nl,e.add(this.critterBatch.mesh),this.crabs=new cl({terrain:n,village:a,colliders:o,vegetation:s}),this.blobs=new ll,e.add(this.blobs.mesh);let p=null;if(i&&r)try{p=new ul(t,{shore:i,terrainGPU:r})}catch(e){console.warn(`Wildlife: swash probe unavailable`,e)}this.shorebirds=new vl({terrain:n,probe:p}),this.water=new yl(u),this.birds=new Bc({terrain:n,village:a,colliders:o,boat:c,boatModel:l,water:this.water,spray:d}),this.viewer={x:0,y:0,z:0,speed:0,mode:`walk`,px:0,pz:0,init:!1},this.test=null,this.cpuMs=0}updateViewer(e,t,n){let r=this.viewer,i,a,o;n?(i=n.position.x,a=n.position.y,o=n.position.z,r.mode=n.mode):(i=t.position.x,a=t.position.y-1.6,o=t.position.z,r.mode=`fly`),r.init||=(r.px=i,r.pz=o,!0);let s=Math.hypot(i-r.px,o-r.pz)/Math.max(e,.001);r.speed+=(Math.min(s,20)-r.speed)*(1-Math.exp(-e*4)),r.px=i,r.pz=o,r.x=i,r.y=a,r.z=o;let c=Math.max(this.terrain.heightAt(i,o),0);return r.mode===`fly`&&a-c>3?null:r}update(e,t,n=null){let r=performance.now(),i=this.updateViewer(e,t,n);this.birdBatch.begin(),this.critterBatch.begin(),this.blobs.begin(),this.test?this.test(this.birdBatch,e,this.critterBatch,this.blobs):(this.birds.update(e,i,this.birdBatch,t),this.shorebirds.update(e,i,this.birdBatch,t,this.blobs),this.crabs.update(e,i,this.critterBatch,t,this.blobs)),this.birdBatch.commit(),this.critterBatch.commit(),this.blobs.commit(),this.water.endFrame(),this.cpuMs+=(performance.now()-r-this.cpuMs)*.05}},xl=[[70,300],[60,200],[35,120],[5,88],[-25,100],[-52,128],[-75,178],[-52,262],[-10,330]],Sl=.25,Cl=2.6,wl=1.5,Tl=Math.PI*2,El=new t,Dl=new i,Ol=new n,kl=class{constructor({terrain:e,query:t=null,seed:r=1}){this.terrain=e,this.query=t,this.rand=Al(r),this._buildRoute(),this.u=this.length*.19,this.position=new n,this.quaternion=new i,this.velocity=new n,this.speed=Cl,this.yaw=0,this.pitch=0,this.roll=0,this.rollV=0,this.breachRoll=0,this.breaches=0,this.splashes=0,this.bob=0,this.y=-9,this.vy=0,this.water=0,this.wetAge=100,this.strokePhase=0,this.strokeAmp=.13,this.arch=0,this.headPitch=0,this.follow=.85,this.blow=0,this.flukeUp=0,this.flip=[0,0],this.flipV=[0,0],this.fin=[0,1].map(()=>({sweep:0,lift:0,twist:0,vs:0,vl:0,vt:0})),this.slap=null,this.slapTimer=12,this.slaps=0,this.yawRate=0,this.time=0,this.HN=2048,this.hArc=new Float64Array(this.HN),this.hQ=new Float32Array(this.HN*4),this.hHead=-1,this.hCount=0,this.arc=0,this.seq=null,this.state=`cruise`,this.lastWrap=!1,t&&(this.slot=t.allocate(`whale`,1)),this._place(0);for(let e=60;e>=0;e--)this._record(-e*.4)}_buildRoute(){let e=xl.map(e=>new n(e[0],0,e[1])),t=new u(e,!0,`centripetal`,.5);t.arcLengthDivisions=4e3,this.length=t.getLength();let r=Math.ceil(this.length/.25);this.rN=r,this.rPos=new Float64Array((r+1)*2),this.rYaw=new Float64Array(r+1);let i=new n,a=new n,o=0;for(let e=0;e<=r;e++){let n=e/r;t.getPointAt(n,i),t.getTangentAt(n,a),this.rPos[e*2]=i.x,this.rPos[e*2+1]=i.z;let s=Math.atan2(a.x,a.z);e>0&&(s=o+Math.atan2(Math.sin(s-o),Math.cos(s-o))),this.rYaw[e]=o=s}this.yawWrap=this.rYaw[r]-this.rYaw[0],this.curve=t}_routeIndex(e){let t=this.length,n=Math.floor(e/t),r=(e-n*t)/t*this.rN,i=Math.min(Math.floor(r),this.rN-1);return{i,t:r-i,loops:n}}routeAt(e,t){let{i:n,t:r}=this._routeIndex(e),i=this.rPos;return t.set(i[n*2]+(i[n*2+2]-i[n*2])*r,0,i[n*2+1]+(i[n*2+3]-i[n*2+1])*r)}routeYaw(e){let t=0;for(let n of[-2,-1,0,1,2]){let{i:r,t:i,loops:a}=this._routeIndex(e+n);t+=this.rYaw[r]+(this.rYaw[r+1]-this.rYaw[r])*i+a*this.yawWrap}return t/5}_record(e){let t=this.hHead=(this.hHead+1)%this.HN;this.hArc[t]=e;let n=this.quaternion;this.hQ[t*4]=n.x,this.hQ[t*4+1]=n.y,this.hQ[t*4+2]=n.z,this.hQ[t*4+3]=n.w,this.hCount=Math.min(this.hCount+1,this.HN)}pathRotation(e,t){let n=this.arc-e,r=this.HN,i=this.hHead,a=0,o=this.hCount-1,s=e=>this.hArc[(i-e+r)%r];if(n>=s(0))return this._q(i,t);if(n<=s(o))return this._q((i-o+r)%r,t);for(;o-a>1;){let e=a+o>>1;s(e)>n?a=e:o=e}let c=s(a),l=s(o),u=(c-n)/Math.max(c-l,1e-9);return this._q((i-a+r)%r,t),t.slerp(this._q((i-o+r)%r,Dl),u)}_q(e,t){let n=this.hQ;return t.set(n[e*4],n[e*4+1],n[e*4+2],n[e*4+3])}flipperRotation(e,t){let n=e===0?1:-1,r=this.fin[e];return El.set(r.twist,n*(.12+r.sweep),n*(-.28+r.lift),`YZX`),t.setFromEuler(El)}_flippers(e,t){let n=this.state===`surface`&&this.water-this.y<2.5,r=Math.max(-1,Math.min(1,this.yawRate*25)),i=this.time*Tl/11,a=t.breach===`air`;n&&this.water-this.y<1.35&&!this.slap&&!a&&(this.slapTimer-=e,this.slapTimer<0&&(this.slap={side:this.rand()<.5?0:1,t:0},this.slapTimer=18+this.rand()*25));for(let t=0;t<2;t++){let o=this.fin[t],s=t===0?1:-1,c=i+t*.35,l=.18*Math.sin(c)+.1+(n?.12:0),u=.1*Math.sin(c+.8)-s*r*.45+(n?.08:0),d=.3*Math.cos(c)+this.pitch*.6;l+=Math.max(0,s*r)*.25;let f=.45;if(a)l=.45,u=.7,d=.3,f=2.5;else if(this.slap&&this.slap.side===t){let e=this.slap.t;e<3.5?(u=1.55,l=.35,d=-.2,f=.9):(u=-.45,d=.35,f=9,e>3.8&&!this.slap.hit&&(this.slap.hit=!0,this.slaps++))}let p=f,m=2*Math.sqrt(f)*.9;o.vs+=((l-o.sweep)*p-o.vs*m)*e,o.vl+=((u-o.lift)*p-o.vl*m)*e,o.vt+=((d-o.twist)*p-o.vt*m)*e,o.sweep+=o.vs*e,o.lift+=o.vl*e,o.twist+=o.vt*e}this.slap&&(this.slap.t+=e,this.slap.t>6&&(this.slap=null))}floorAt(e,t){return this.terrain?this.terrain.heightAt(e,t):-50}_place(e){let t=this.routeAt(this.u,Ol),n=this.yaw;this.yaw=this.routeYaw(this.u),e>0&&(this.yawRate+=(Math.atan2(Math.sin(this.yaw-n),Math.cos(this.yaw-n))/e-this.yawRate)*Math.min(1,e*1.2));let r=(this.routeYaw(this.u+3)-this.routeYaw(this.u-3))/6,i=f.clamp(-r*this.speed*1.6,-.22,.22);this.rollV+=((i-this.roll)*.6-this.rollV*1.4)*e,this.roll+=this.rollV*e,this.position.set(t.x,this.y,t.z),El.set(-(this.pitch+this.bob),this.yaw,this.roll+this.breachRoll,`YXZ`),this.quaternion.setFromEuler(El)}_startSequence(){let e=3+Math.floor(this.rand()*4),t=[];t.push({t:9,depth:1.3,pitch:.08,arch:0,follow:.85,speed:wl,stroke:.07});for(let n=0;n<e;n++)t.push({t:3.5,depth:1.12,pitch:.1,arch:.02,follow:.85,speed:wl,stroke:.03,blow:!0}),n<e-1&&(t.push({t:4,depth:2.2,pitch:-.14,arch:-.05,follow:.92,speed:wl,stroke:.04}),t.push({t:7+this.rand()*6,depth:3.4,pitch:0,arch:0,follow:.85,speed:wl,stroke:.06}),t.push({t:5,depth:1.3,pitch:.08,arch:0,follow:.85,speed:wl,stroke:.06}));this.rand()<(this.forceBreach?1:.5)&&(t.push({t:7,depth:9,pitch:-.2,arch:0,follow:.6,speed:2.4,stroke:.1}),t.push({t:6,depth:9,pitch:.45,arch:0,follow:.3,speed:3.5,stroke:.14,breach:`launch`}),t.push({t:6,depth:2,pitch:0,arch:0,follow:.3,speed:2.5,stroke:.05,breach:`air`}),t.push({t:6,depth:2.4,pitch:.05,arch:0,follow:.85,speed:wl,stroke:.05})),t.push({t:3,depth:1.25,pitch:-.12,arch:-.14,follow:.85,speed:1.8,stroke:.02}),t.push({t:4.5,depth:5.5,pitch:-.95,arch:-.12,follow:.12,speed:1.9,stroke:0,fluke:!0}),t.push({t:6,depth:11,pitch:-.45,arch:0,follow:.6,speed:2.2,stroke:.08}),t.push({t:8,depth:10,pitch:0,arch:0,follow:.85,speed:Cl,stroke:.1}),this.seq={keys:t,i:0,t:0,blown:!1},this.state=`surface`}_nextKey(e){let t=this.seq;t&&t.keys[t.i+1]?.breach===e&&(t.i++,t.t=0,this.breaches++)}update(e){e=Math.min(e,.1),this.time+=e;let t=this.query;if(t){let n=this.position.x+Math.sin(this.yaw)*3,r=this.position.z+Math.cos(this.yaw)*3;if(t.setPoint(this.slot,n,r),t.cpuValid){let n=t.get(this.slot).height;Number.isFinite(n)&&(this.water+=(n-this.water)*Math.min(1,e*4))}}this.wetAge=this.backDepth<.05?this.wetAge+e:0;let n=(this.u/this.length%1+1)%1;this.state===`cruise`&&n>Sl&&n<.3&&!this.lastWrap&&(this._startSequence(),this.lastWrap=!0),(n<.15||n>.55)&&(this.lastWrap=!1);let r={depth:9.5,pitch:0,arch:0,follow:.85,speed:Cl,stroke:.13};if(this.blow=0,this.flukeUp=0,this.seq){let t=this.seq,n=t.keys[t.i];if(t.t+=e,r=n,n.blow){let e=t.t-.6;this.blow=e>0&&e<1.4?Math.sin(Math.PI*Math.min(e/1.4,1))**.5:0,e>0&&!t.blown&&(t.blown=!0,this.onBlow&&this.onBlow())}n.fluke&&(this.flukeUp=Math.min(1,t.t/n.t)),t.t>=n.t&&(t.i++,t.t=0,t.blown=!1,t.i>=t.keys.length&&(this.seq=null,this.state=`cruise`))}let i=this.position.x,a=this.position.z,o=Math.sin(this.yaw),s=Math.cos(this.yaw),c=-1e9;for(let e of[-9,-5,0,5,10,16,24])c=Math.max(c,this.floorAt(i+o*e,a+s*e));let l=Math.max(this.water-r.depth,c+5.2),u=r.fluke?1:.7,d=(l-this.y)*u*u-2*u*this.vy;r.breach===`launch`?(d=14,this.y>this.water-2.5&&this._nextKey(`air`)):r.breach===`air`&&(d=this.vy>0||this.y>this.water-1?-9.81:(l-this.y)*.5-1.5*this.vy,this.breachRoll+=(1.9-this.breachRoll)*Math.min(1,e*1.2),this.vy<0&&this.y<this.water-1.5&&!this.seq.splashed&&(this.seq.splashed=!0,this.splashes++)),r.breach!==`air`&&(this.breachRoll+=(0-this.breachRoll)*Math.min(1,e*.6)),this.vy+=d*e,this.y+=this.vy*e;let f=c+4.6;this.y<f&&(this.y=f,this.vy=Math.max(this.vy,0));let p=Math.min(1,e*1.2);this.speed+=(r.speed-this.speed)*Math.min(1,e*.5);let m=Math.atan2(this.vy,Math.max(this.speed,.5))*.8+(r.pitch||0);this.pitch+=(m-this.pitch)*Math.min(1,e*(r.breach?2.5:r.fluke?1.1:.9)),this.arch+=((r.arch||0)-this.arch)*p,this.follow+=((r.follow??.85)-this.follow)*Math.min(1,e*(r.fluke?1.5:.8)),this.strokeAmp+=((r.stroke??.1)-this.strokeAmp)*Math.min(1,e*.6),this.headPitch+=((r.blow?.03:0)-this.headPitch)*p,this.strokePhase+=Tl*(.09+.042*this.speed)*e,this.bob=-this.strokeAmp*.12*Math.sin(this.strokePhase+.5),this._flippers(e,r);let h=this.speed*Math.cos(this.pitch)*e;this.u+=h,this._place(e),this.arc+=h,this._record(this.arc)}get backDepth(){return this.water-(this.y+1.25)}};function Al(e){return()=>{e|=0,e=e+1831565813|0;let t=Math.imul(e^e>>>15,1|e);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296}}async function jl(e){let t=new Uint8Array(e),n=new DataView(e),r=8,i=0,a=0,o=[];for(;r<t.length;){let e=n.getUint32(r),s=String.fromCharCode(t[r+4],t[r+5],t[r+6],t[r+7]);if(s===`IHDR`){if(i=n.getUint32(r+8),a=n.getUint32(r+12),t[r+16]!==8||t[r+17]!==6||t[r+20]!==0)throw Error(`decodePNG: expects 8-bit RGBA, non-interlaced`)}else if(s===`IDAT`)o.push(t.subarray(r+8,r+8+e));else if(s===`IEND`)break;r+=12+e}let s=new Blob(o).stream().pipeThrough(new DecompressionStream(`deflate`)),c=new Uint8Array(await new Response(s).arrayBuffer()),l=i*4,u=new Uint8Array(l*a);for(let e=0;e<a;e++){let t=c[e*(l+1)],n=e*(l+1)+1,r=e*l,i=r-l;if(t===0)u.set(c.subarray(n,n+l),r);else if(t===2){if(e===0)u.set(c.subarray(n,n+l),r);else for(let e=0;e<l;e++)u[r+e]=c[n+e]+u[i+e]&255}else for(let a=0;a<l;a++){let o=a>=4?u[r+a-4]:0,s=e>0?u[i+a]:0,l=a>=4&&e>0?u[i+a-4]:0,d=c[n+a];if(t===1)d+=o;else if(t===3)d+=o+s>>1;else if(t===4){let e=o+s-l,t=Math.abs(e-o),n=Math.abs(e-s),r=Math.abs(e-l);d+=t<=n&&t<=r?o:n<=r?s:l}u[r+a]=d&255}}return{width:i,height:a,data:u}}async function Ml(e,t){let n=await jl(await fetch(e).then(e=>e.arrayBuffer())),r=new N({label:e.split(`/`).pop(),width:n.width,height:n.height,format:t?`rgba8unorm-srgb`:`rgba8unorm`,mips:!0,usage:[`sample`,`copyDst`],sampler:`anisoClamp`,data:n.data});return r.getGPU(),w(r),r}var Nl=40,Pl=[48,170],Fl=1800,Il=new i,Ll=new i,Rl=new n,zl=new n;new x;var Bl=new n(1,0,0),Vl=new n,Hl=class{constructor({scene:e,terrain:t,query:n=null,spray:r=null,url:i=`./models/whale/`}){this.scene=e,this.terrain=t,this.query=n,this.spray=r,this.url=i,this.ready=!1,this.group=new xe,this.group.name=`Whale`,this.brain=new kl({terrain:t,query:n}),this.frames=null,this.meshes=[],this.lod=-1,this._blowAcc=0,this._dropAcc=0,this._slaps=0}async load(){return this._loading||=(async()=>{let[e,t]=await Promise.all([fetch(this.url+`humpback.json`).then(e=>e.json()),fetch(this.url+`humpback.bin`).then(e=>e.arrayBuffer())]);this.manifest=e,e.textures&&([this.albedoTex,this.heightTex]=await Promise.all([Ml(this.url+e.textures.albedo,!0),Ml(this.url+e.textures.height,!1)])),this._setupRig(e),this.material=this._createMaterial(e);for(let r of e.levels){let e=new Be;e.setAttribute(`position`,new De(new Float32Array(t,r.position,r.vertices*3),3)),e.setAttribute(`normal`,new De(new Int16Array(t,r.normal,r.vertices*3),3,!0)),e.setAttribute(`uv`,new De(new Float32Array(t,r.uv,r.vertices*2),2)),e.setAttribute(`uv1`,new De(new Float32Array(t,r.uv1,r.vertices*2),2)),e.setAttribute(`rig`,new De(new Float32Array(t,r.rig,r.vertices*4),4)),e.setIndex(new De(new Uint32Array(t,r.index,r.indices),1)),e.boundingSphere=new b(new n,11),e.boundingBox=new S(new n(-11,-11,-11),new n(11,11,11));let i=new Ee(e,this.material);i.name=`Whale_`+r.name,i.castShadow=!0,i.receiveShadow=!0,i.layers.set(ce.OPAQUE),i.visible=!1,i.matrixAutoUpdate=!1,this.meshes.push(i),this.group.add(i)}this.scene.add(this.group),this.ready=!0,this.update(0,null)})(),this._loading}_setupRig(e){let t=e.snoutZ+.15,o=e.notchZ-1.2;this.zHead=t,this.dz=(t-o)/39;let s=e.centerline.z,c=e.centerline.y,l=e=>{if(e>=s[0])return c[0];for(let t=1;t<s.length;t++)if(e>=s[t])return c[t-1]+(c[t]-c[t-1])*(e-s[t-1])/(s[t]-s[t-1]);return c[c.length-1]};this.rest=[];for(let e=0;e<Nl;e++){let n=t-e*this.dz;this.rest.push({z:n,y:l(n)})}this.rootIndex=Math.round(t/this.dz),this.uPos={array:Array(80).fill(0).map(()=>new r)},this.uRot={array:Array(80).fill(0).map(()=>new r(0,0,0,1))},this.uFlip={array:[new r(1,0,0,0),new r(1,0,0,0),new r(1,0,0,0),new r(1,0,0,0)]},this.pos=[],this.rot=[];for(let e=0;e<Nl;e++)this.pos.push(new n),this.rot.push(new i);this.pecRoot=[e.pectoral.left.origin,e.pectoral.right.origin].map(e=>new n(...e)),this.pecBasis=[e.pectoral.left.basis,e.pectoral.right.basis].map(e=>new a().set(e[0][0],e[0][1],e[0][2],e[1][0],e[1][1],e[1][2],e[2][0],e[2][1],e[2][2])),this.blowLocal=new n(...e.blowhole),this._hasPrev=!1}_pose(){let e=this.brain,t=this.rest,n=this.rootIndex,r=this.uPos.array,i=this.uRot.array;for(let e=0;e<Nl;e++)r[Nl+e].copy(r[e]),i[Nl+e].copy(i[e]);let a=e.quaternion,o=this.rot;for(let n=0;n<Nl;n++){let r=t[n].z,i=o[n];if(r>=0){let t=-e.strokeAmp*.1*Math.sin(e.strokePhase+.6)*Math.min(1,r/5);i.copy(a).multiply(Il.setFromAxisAngle(Bl,t+e.headPitch*Math.min(1,r/4)))}else{let t=-r;e.pathRotation(t,Ll),i.copy(a).slerp(Ll,e.follow);let n=Math.min(t/9.6,1.15),o=n*n*1.1+.05*n,s=e.strokePhase-t*.52,c=e.strokeAmp*o*(Math.sin(s)+.22*Math.sin(2*s));t>7.6&&(c+=e.strokeAmp*2*Math.sin(s+1.35)*Math.min(1,(t-7.6)/1.2)),c+=e.arch*3*Math.min(t/6,1),i.multiply(Il.setFromAxisAngle(Bl,c))}}let s=this.pos;s[n].copy(e.position).add(Rl.set(0,t[n].y,t[n].z).applyQuaternion(o[n]));for(let e=n-1;e>=0;e--)Il.copy(o[e]).slerp(o[e+1],.5),Rl.set(0,t[e].y-t[e+1].y,t[e].z-t[e+1].z).applyQuaternion(Il),s[e].copy(s[e+1]).add(Rl);for(let e=n+1;e<Nl;e++)Il.copy(o[e]).slerp(o[e-1],.5),Rl.set(0,t[e].y-t[e-1].y,t[e].z-t[e-1].z).applyQuaternion(Il),s[e].copy(s[e-1]).add(Rl);for(let e=0;e<Nl;e++){r[e].set(s[e].x,s[e].y,s[e].z,t[e].y);let n=o[e];e>0&&n.x*i[e-1].x+n.y*i[e-1].y+n.z*i[e-1].z+n.w*i[e-1].w<0?i[e].set(-n.x,-n.y,-n.z,-n.w):i[e].set(n.x,n.y,n.z,n.w)}let c=this.uFlip.array;c[2].copy(c[0]),c[3].copy(c[1]);for(let t=0;t<2;t++){e.flipperRotation(t,Il);let n=2*Math.acos(Math.min(1,Math.abs(Il.w))),r=Il.w<0?-1:1,i=Math.sqrt(Math.max(1e-12,1-Il.w*Il.w));c[t].set(Il.x/i*r,Il.y/i*r,Il.z/i*r,n),n<1e-5&&c[t].set(1,0,0,0)}if(!this._hasPrev){for(let e=0;e<Nl;e++)r[Nl+e].copy(r[e]),i[Nl+e].copy(i[e]);c[2].copy(c[0]),c[3].copy(c[1]),this._hasPrev=!0}}toWorld(e,t){let n=f.clamp((this.zHead-e.z)/this.dz,0,38.999),r=Math.floor(n),i=n-r,a=this.rest[r],o=this.rest[r+1],s=a.y+(o.y-a.y)*i;return Il.copy(this.rot[r]).slerp(this.rot[r+1],i),t.set(e.x,e.y-s,0).applyQuaternion(Il),Vl.copy(this.pos[r]).lerp(this.pos[r+1],i),t.add(Vl)}update(e,t){if(!this.ready)return;let n=this.brain;n.update(e),this._pose(),this.uWater.value=n.water,this.uWet.value=Math.exp(-n.wetAge/12);let r=0,i=!0;if(t){let e=t.position.distanceTo(n.position),a=t.position.y<n.water,o=this._lod??0,s=e=>Pl[e]*1.08,c=e=>Pl[e]*.92;for(r=o;r<2&&e>s(r);)r++;for(;r>0&&e<c(r-1);)r--;this._lod=r,e>Fl&&(i=!1),h.waterEnabled.value>.5&&a&&e>120&&(i=!1),h.waterEnabled.value>.5&&!a&&n.backDepth>7&&e>70&&(i=!1)}for(let e=0;e<this.meshes.length;e++){let t=this.meshes[e];t.visible=i&&e===r,t.geometry.boundingSphere.center.copy(n.position)}this.lod=i?r:-1,e>0&&this._effects(e)}_effects(e){let t=this.brain,r=this.spray;if(r){if(t.slaps!==this._slaps){this._slaps=t.slaps;let e=t.slap?t.slap.side:0,i=this.pecRoot[e],a=this.toWorld(Rl.set(i.x+(e===0?3.2:-3.2),i.y,i.z-1.2),zl);a.y=t.water+.1;for(let e=0;e<4;e++){let e=new n((Math.random()-.5)*3,4.5+Math.random()*3,(Math.random()-.5)*3);r.emit(a,e,18,.25,cc.SPRAY,{spread:2.4,jitter:.6,life:2.2,sizeJitter:.8}),r.emit(a,e,30,.022,cc.DROPLET,{spread:3,jitter:.5,life:2})}}if(t.blow>0){let i=this.toWorld(this.blowLocal,zl);if(i.y>t.water-.3){i.y=Math.max(i.y,t.water)+.15;let a=Rl.set(Math.sin(t.yaw),0,Math.cos(t.yaw)),o=7.5+2.5*t.blow,s=new n(a.x*.8,o,a.z*.8);this._blowAcc+=e*60*t.blow;let c=Math.floor(this._blowAcc);this._blowAcc-=c,c>0&&(r.emit(i,s,7*c,.3,cc.SPRAY,{spread:3.2,jitter:.25,life:2.2,sizeJitter:.8}),r.emit(i,s.clone().multiplyScalar(.75),10*c,.7,cc.MIST,{spread:2.6,jitter:.35,life:5.5,sizeJitter:.6}),r.emit(i,s.clone().multiplyScalar(.9),12*c,.018,cc.DROPLET,{spread:3.5,jitter:.2,life:2.2}))}}if(t.flukeUp>.05){this._dropAcc+=e*60;let i=Math.floor(this._dropAcc);if(this._dropAcc-=i,i>0){let e=this.manifest.notchZ;for(let a of[-1.9,-1.2,-.5,.5,1.2,1.9]){let o=e-.1-.35*(Math.abs(a)/2.2)**2,s=this.toWorld(Rl.set(a,this.rest[39].y,o),zl);s.y<t.water+.2||r.emit(s,new n(0,-.5,0),5*i,.02,cc.DROPLET,{spread:.5,jitter:.12,life:1.6})}}}}}_createMaterial(e){let t=e=>{let t=String(+e.toFixed(7));return t.includes(`.`)||t.includes(`e`)?t:t+`.0`},n=!!(this.albedoTex&&this.heightTex),r=this.pecRoot[0],i=this.pecRoot[1],[a,o]=e.textures?e.textures.heightRange:[0,0],s=n?`
	let hRel = textureSampleLevel( whaleHeightTex, smpLinearClamp, v.uv, 0.0 );
	let dRel = ( hRel.r * 0.99611 + hRel.g * 0.00389 ) * ${t(o-a)} + ${t(a)};
	let p = v.position + v.normal * dRel;`:`
	let p = v.position;`,c=new $e({name:`Whale`,roughness:.62,metalness:0,underwaterLighting:`full`,uniforms:{whalePos:[`vec4f[80]`,this.uPos.array],whaleRot:[`vec4f[80]`,this.uRot.array],whaleFlip:[`vec4f[4]`,this.uFlip.array],whaleWater:[`f32`,0],whaleWet:[`f32`,0]},textures:n?{whaleAlbedoTex:this.albedoTex,whaleHeightTex:this.heightTex}:{},attributes:{rig:`vec4f`},defines:{WHALE_TEX:+!!n},modules:[this._rigModule(t,r,i)],vertex:`
${s}
	let cur = whalePose( p, v.normal, v.rig, 0 );
	v.useWorld = true;
	v.worldPos = cur.world;
	v.worldNormal = cur.normal;
#if !PASS_DEPTH
	// the shadow pass needs only this frame's pose
	v.prevWorldPos = whalePose( p, v.normal, v.rig, ${Nl} ).world;
#endif
`,surface:this._skinShading(e,n,t)});return this.uWater=c.uniforms.whaleWater,this.uWet=c.uniforms.whaleWet,c}_rigModule(e,t,n){return new g({name:`whaleRig`,code:`
struct WhalePosed { world: vec3f, normal: vec3f };

fn whaleRotateQ( q: vec4f, v: vec3f ) -> vec3f { return v + cross( q.xyz, cross( q.xyz, v ) + v * q.w ) * 2.0; }

// Rodrigues
fn whaleRotAxis( ax: vec3f, ang: f32, v: vec3f ) -> vec3f {
	let c = cos( ang ); let s = sin( ang );
	return v * c + cross( ax, v ) * s + ax * ( dot( ax, v ) * ( 1.0 - c ) );
}

fn whalePose( p: vec3f, n: vec3f, rig: vec4f, o: i32 ) -> WhalePosed {
	let part = rig.y;
	let isL = part > 0.5 && part < 1.5;
	let isR = part > 1.5 && part < 2.5;
	let isPec = isL || isR;
	let fo = select( 0, 2, o != 0 );
	let fl = select( mat.whaleFlip[ fo + 1 ], mat.whaleFlip[ fo ], isL );
	let root = select( vec3f( ${e(n.x)}, ${e(n.y)}, ${e(n.z)} ), vec3f( ${e(t.x)}, ${e(t.y)}, ${e(t.z)} ), isL );
	// flippers flex: the tip turns a little further than the root
	let ang = fl.w * ( rig.z * 0.35 + 0.8 ) * select( 0.0, 1.0, isPec );
	let pp = root + whaleRotAxis( fl.xyz, ang, p - root );
	let fi = clamp( ( ${e(this.zHead)} - rig.x ) / ${e(this.dz)}, 0.0, ${e(38.999)} );
	let i0 = i32( floor( fi ) ); let t = fract( fi );
	let P0 = mat.whalePos[ i0 + o ]; let P1 = mat.whalePos[ i0 + o + 1 ];
	let Q0 = mat.whaleRot[ i0 + o ]; let Q1 = mat.whaleRot[ i0 + o + 1 ];
	let q = normalize( mix( Q0, Q1, t ) );
	let yc = mix( P0.w, P1.w, t );
	let off = vec3f( pp.x, pp.y - yc, pp.z - rig.x );
	var r: WhalePosed;
	r.world = mix( P0.xyz, P1.xyz, t ) + whaleRotateQ( q, off );
	r.normal = whaleRotateQ( q, whaleRotAxis( fl.xyz, ang, n ) );
	return r;
}
`})}_skinShading(e,t,n){let r=e.textures?e.textures.heightRange[1]-e.textures.heightRange[0]:0;return`
	let above = smoothstep( -0.1, 0.2, in.P.y - mat.whaleWater );
	let film = above * mat.whaleWet;
	// in water the skin's Fresnel reflectance is far weaker than in air (n 1.33 vs 1.0)
	s.specularIntensity = mix( 0.45, 1.0, above );
#if !WHALE_TEX
	s.albedo = vec3f( 0.03, 0.033, 0.038 );
	s.roughness = mix( 0.62, 0.3, film );
#else
	let uvA = in.uv;
	let dux = dpdx( uvA ); let duy = dpdy( uvA );
	let dpx = dpdx( in.P ); let dpy = dpdy( in.P );
	let albedo = textureSample( whaleAlbedoTex, smpAnisoClamp, uvA );
	s.albedo = albedo.rgb;
	// matte skin (0.55-0.75) in the water; a thin glossy film only where it is out of the water
	// and freshly wet
	s.roughness = mix( albedo.a, albedo.a * 0.48, film );
	let t0 = textureSample( whaleHeightTex, smpAnisoClamp, uvA );
	let t1 = textureSample( whaleHeightTex, smpAnisoClamp, uvA + dux );
	let t2 = textureSample( whaleHeightTex, smpAnisoClamp, uvA + duy );
	let hh0 = ( t0.r * 0.99611 + t0.g * 0.00389 ) * ${n(r)};
	let dhx = ( ( t1.r * 0.99611 + t1.g * 0.00389 ) * ${n(r)} - hh0 ) * 1.6;
	let dhy = ( ( t2.r * 0.99611 + t2.g * 0.00389 ) * ${n(r)} - hh0 ) * 1.6;
	let N = in.N;
	let r1 = cross( dpy, N ); let r2 = cross( N, dpx );
	let det = dot( dpx, r1 );
	let grad = ( r1 * dhx + r2 * dhy ) * sign( det );
	s.normal = normalize( abs( det ) * N - grad );
#endif
`}},Ul=class{constructor({fft:e,cdlod:t,foamTexture:n}){this.fft=e,this.cdlod=t,this.foamTexture=n,this.shore=null,this.wake=null,this.terrain=null,this.detail=null,this.shoreSim=null,this.foamShading=null,this.params=new l(`WaterSurfaceParams`,{amplitude:[`f32`,1],slopeScale:[`f32`,1],foamCoverage:[`f32`,1],foamSharpness:[`f32`,2.2],foamScale:[`f32`,.09]},{label:`waterSurface`});let r=this.params.fields;this.amplitude=r.amplitude,this.slopeScale=r.slopeScale,this.foamCoverage=r.foamCoverage,this.foamSharpness=r.foamSharpness,this.foamScale=r.foamScale,this.foamWeights=[.35,.45,.5,.25];let i=[],a=[];for(let t=0;t<e.cascades;t++)i.push(Math.min(40,e.sizes[t]*.08)),a.push([0,.05,.25,.5][t]??.5);let o=e=>`array<f32, ${e.length}>( ${e.map(e=>e.toFixed(5)).join(`, `)} )`;this.attenuationModule=new g({name:`waterSurfaceAttenuation`,deps:[Re],code:`
fn waterSurfaceCascadeAttenuation( c: i32, depth: f32 ) -> f32 {
	let d0 = ${o(i)};
	let floorAmt = ${o(a)};
	let a = smoothstep( 0.0, d0[ c ], depth );
	return mix( floorAmt[ c ] * smoothstep( 0.0, 0.6, depth ), 1.0, a );
}
`}),this._module=null}get surfFoam(){let e=this.foamShading;if(e&&e.module)return e;if(typeof e==`function`){let t=e({});if(t&&t.isShaderModule)return{module:t};if(t&&t.module)return t}return null}get module(){return this._module||=this._buildModule(),this._module}_buildModule(){let e=this.fft,t=e.cascades,n=!!this.terrain,r=!!this.shore,i=!!this.wake,a=!!this.detail,o=this.surfFoam,s=!!this.shoreSim,c=this.cdlod.module.name,l=c[0].toUpperCase()+c.slice(1)+`Vertex`,u=e=>Number(e).toFixed(6),d=``;for(let n=0;n<t;n++){let t=e.sizes[n]/256;d+=`
	{
		// band-limit to the mesh spacing to avoid aliasing / swimming
		let level = max( log2( spacing / ${u(t)} ) + 0.7, 0.0 );
		let att = waterSurfaceCascadeAttenuation( ${n}, depth );
		let uv = worldXZ / ocean.sizes[ ${n} ].x;
		let s = textureSampleLevel( oceanDisplacement, smpLinearRepeat, uv, ${n}, level );
		disp += s.xyz * att;
		// foam coverage is smooth enough to evaluate per vertex (sampled at a fixed detail level,
		// the displacement sample itself from there on)
		var fv = s.w;
		if ( level < 1.5 ) { fv = textureSampleLevel( oceanDisplacement, smpLinearRepeat, uv, ${n}, 1.5 ).w; }
		foam += fv * ${u(this.foamWeights[n]??.25)} * att;
	}`}let f=`
const WATER_SHORE_DEEP: f32 = 26.0; // m: ShoreWaves' envelope smoothstep( 26, 13, depth ) is 0 beyond

struct WaterSurfaceVertex {
	position: vec3f,
	lagXZ: vec2f,
	height: f32,
	depth: f32,
	foam: f32,
	shoreN: vec3f,
	shoreFoam: f32,
	swash: f32,
	surfMask: vec2f, // clear plunging face, whitewater roller relief (m)
};

// depth of the sea floor below mean sea level at xz (m)
fn waterSurfaceSeaDepth( xz: vec2f ) -> f32 {
	return ${n?`frame.seaLevel - terrainHeightAt( xz )`:`500.0`};
}

fn waterSurfaceVertex( node: vec4f, grid: vec2f ) -> WaterSurfaceVertex {
	let lod: ${l} = ${c}Morph( node, grid, frame.cameraPos, 0.0 );
	let worldXZ = lod.worldXZ;
	let spacing = lod.spacing;
	let ground = ${n?`terrainHeightAt( worldXZ )`:`-500.0`};
	let depth = ${n?`frame.seaLevel - ground`:`500.0`};

	var disp = vec3f( 0.0 );
	var foam = 0.0;
${d}

	disp *= waterSurface.amplitude;

	var extra = vec3f( 0.0 );
	var shoreN = vec3f( 0.0, 1.0, 0.0 );
	var shoreFoam = 0.0;
	var swash = 0.0;
	var surfMask = vec2f( 0.0 ); // clear plunging face, whitewater roller relief (m)
${r?`
	// Offshore of WATER_SHORE_DEEP the shore waves have faded out completely (their envelope is 0 from 26 m
	// of depth, see ShoreWaves) and there is no swash: most of the sea skips their evaluation.
	let nearShore = depth < WATER_SHORE_DEEP;
	var swashLevel = -1e4;
	if ( nearShore ) {
		let sw = shoreEvaluate( worldXZ, depth, ground );
		extra += sw.disp;
		shoreN = clamp( sw.nShore, vec3f( -1.0 ), vec3f( 1.0 ) );
		// (the foam line on the swash front is added per pixel in the water shader: on this coarse mesh
		// it would end short of the front and follow the triangles)
		shoreFoam = sw.foam;
		surfMask = vec2f( sw.face, sw.roller );
		swashLevel = sw.swashLevel;
	}`:``}
${i?`	extra += wakeDisplacement( worldXZ );`:``}

	var total = disp + extra;
	var y = frame.seaLevel + total.y;
${r?`
	if ( nearShore ) {
		// thin run-up sheet on the sand: take whichever surface is higher (smooth max)
		let k = 0.04;
		// no run-up sheet on steep rock (cliffs, sea stacks): waves break against it instead
		let nr = ${n?`terrainNormalRockLevel( worldXZ, 0.0 )`:`vec4f( 0.0 )`};
		let gentle = ${n?`smoothstep( 0.45, 0.25, length( nr.xy ) )`:`1.0`};
		let hmx = sat( ( swashLevel - y ) / k * 0.5 + 0.5 ) * gentle;
		let smax = mix( y, swashLevel, hmx ) + hmx * ( 1.0 - hmx ) * k;
		swash = smoothstep( -0.02, 0.03, swashLevel - y );
		y = smax;
		// Where the sheet is the surface it is the sheet that is seen, not the wave below it: the sheet
		// lies on the sand (the sand's slope, no horizontal wave motion, no plunging face / roller).
		// Otherwise the backwash sheet over the lower beach face, exposed by the trough of the next
		// wave, keeps the trough's tilted normal and motion and reads as a separate dark strip
		// between the sea and the thin film further up.
		shoreN = normalize( mix( shoreN, vec3f( nr.x, 1.0, nr.y ), hmx ) );
		let still = 1.0 - hmx;
		total = vec3f( total.x * still, total.y, total.z * still );
		surfMask *= still;
	}`:``}
${n?`
	// hide the water sheet below dry land (beyond the swash zone)
	let below = select( ground - 0.06, min( ground - 2.0, frame.seaLevel - 1.0 ), depth < -3.0 );
	y = select( y, min( y, below ), y < ground );`:``}

	var o: WaterSurfaceVertex;
	o.position = vec3f( worldXZ.x + total.x, y, worldXZ.y + total.z );
	o.lagXZ = worldXZ;
	o.height = total.y;
	o.depth = depth;
	o.foam = foam;
	o.shoreN = shoreN;
	o.shoreFoam = shoreFoam;
	o.swash = swash;
	o.surfMask = surfMask;
	return o;
}
`,p=``;for(let e=0;e<t;e++){let n=`waterSurfaceCascadeAttenuation( ${e}, depth )`;a&&e>=t-2?n+=` * rough`:a&&e===t-3&&(n+=` * mix( 1.0, rough, 0.4 )`),p+=`\td += textureSample( oceanDerivatives, smpAniso4Repeat, lagXZ / ocean.sizes[ ${e} ].x, ${e} ) * ( ${n} );\n`}let m=t-1,h=e.sizes[m],_=7.3,v=3.1,y=h/_/256,b=h/v/256,x=(e,t)=>`vec2f( ${e}.x * ${u(Math.cos(t))} - ${e}.y * ${u(Math.sin(t))}, ${e}.x * ${u(Math.sin(t))} + ${e}.y * ${u(Math.cos(t))} )`,S=`
struct WaterSurfaceFrag {
	normal: vec3f,
	foam: f32,
	coverage: f32,
	slopes: vec2f,
	jacobian: f32,
	rough: f32,
	aeration: f32,
	gust: f32,
	slick: f32,
${o?`	foamInfo: SurfFoamInfo,`:``}
};

// extraFoam: foam carried by the water (ShoreSim); simState: ShoreSim.sample() here; surfMask
// (clear face of a plunging wave, whitewater roller relief, from the vertex stage)
fn waterSurfaceFragment( lagXZ: vec2f, footprint: f32, depth: f32, vertexFoam: f32, shoreN: vec3f, shoreFoam: f32, extraFoam: f32, simState: vec4f, surfMask: vec2f, P: vec3f ) -> WaterSurfaceFrag {
	var d = vec4f( 0.0 );
	var foamSum = 0.0;
	// the clear concave face of a plunging wave overhangs the trough: the foam carried by the
	// (depth-averaged, world-space) shore simulation below it is not on the face
	let face = ${r?`sat( surfMask.x )`:`0.0`};
	// (some of it stays: the lace of the previous wave is drawn up the face)
	let simFoam = ${s?`extraFoam * ( 1.0 - face * 0.72 )`:`0.0`};
	foamSum += simFoam;
	// bubbles mixed into the water (milky, turquoise, hides the bottom): surf and wake
	var aeration = 0.0;

	// world-space gusts / slicks modulate the short wind waves (non-repeating dark and bright patches)
${a?`	let det = seaDetailSample( lagXZ );
	let rough = det.rough;`:`	let rough = 1.0;`}

${p}
	d *= waterSurface.amplitude;
	var slopes = vec2f( d.x / max( d.z + 1.0, 0.2 ), d.y / max( d.w + 1.0, 0.2 ) );

	// Near-field capillary ripples. Within a few metres of the camera a pixel covers less than
	// the finest cascade's texel (~3 cm), so the surface looks glassy. Re-sample that cascade at
	// ~1 m and ~2.3 m tiles (rotated, so they never line up with it) wherever the footprint is
	// small. Damped in slicks with the short wind waves. Explicit LOD: this runs in a branch.
	let near = smoothstep( 0.04, 0.01, footprint ) * rough;
	if ( near > 0.002 ) {
		let c1 = textureSampleLevel( oceanDerivatives, smpLinearRepeat, ${x(`lagXZ`,.63)} * ${u(_/h)}, ${m}, max( log2( footprint / ${u(y)} ), 0.0 ) );
		let c2 = textureSampleLevel( oceanDerivatives, smpLinearRepeat, ${x(`lagXZ`,2.14)} * ${u(v/h)}, ${m}, max( log2( footprint / ${u(b)} ), 0.0 ) );
		// gradients back into world axes (transpose of the rotation)
		let g1 = c1.xy; let g2 = c2.xy;
		let g = ${x(`g1`,-.63)} * 0.55 + ${x(`g2`,-2.14)} * 0.35;
		slopes += g * near;
	}
	let jac = ( d.z + 1.0 ) * ( d.w + 1.0 );
${i?`
	{
		let w = wakeFragment( lagXZ );
		slopes += w.slopes;
		foamSum += w.foam;
		aeration += w.aeration;
	}`:``}

	// base normal: large shoreline waves (per-vertex, can overhang) perturbed by FFT detail
	var normal: vec3f;
	var baseNormal = vec3f( 0.0, 1.0, 0.0 );
${r?`
	{
		// On a coarse mesh the shore normal can flip between the vertices of a folding crest: the
		// interpolated vector then cancels out (or is NaN). Keep it finite and facing up; NaN
		// would otherwise surface as a white-hot cell after the output clamp.
		let sn = clamp( shoreN, vec3f( -1.0 ), vec3f( 1.0 ) ) + vec3f( 0.0, 1e-3, 0.0 );
		let Ns0 = sn / max( length( sn ), 1e-4 );
		let Ns = normalize( vec3f( Ns0.x, max( Ns0.y, 0.12 ), Ns0.z ) );
		baseNormal = Ns;
		// the ripples and chop ride on the wave: the detail normal is rotated onto the tilted face
		// (reoriented normal mapping) instead of being flattened by it, so a steep face keeps the
		// full texture of the sea surface rather than turning into smooth plastic
		let nd = normalize( vec3f( - slopes.x, 1.0, - slopes.y ) );
		let tq = Ns + vec3f( 0.0, 1.0, 0.0 );
		let uq = vec3f( slopes.x, 1.0, slopes.y ) * nd.y;
		normal = normalize( tq * ( dot( tq, uq ) / tq.y ) - uq );
		foamSum += shoreFoam * ${s?`0.55`:`1.0`};
		// the roller and the water behind the plunge point are full of bubbles, decaying behind the
		// bore with the foam it sheds; the clear face of a plunging wave is not
		aeration += sat( shoreFoam * 1.2 + simFoam * 0.7 ) * ( 1.0 - face ) * smoothstep( -0.1, 0.3, depth );
	}`:`
	normal = normalize( vec3f( - slopes.x, 1.0, - slopes.y ) );`}

	// whitecaps: persistent (per vertex) + fresh where the surface is compressed right now;
	// more of them inside gusts, plus windrow lines in fresh wind
	let fresh = sat( ( ocean.foamBias - 0.15 - jac ) * 2.0 );
	var whitecaps = vertexFoam + fresh;
${a?`	whitecaps = whitecaps * mix( 0.5, 1.5, det.gust ) + det.streak * 0.5;`:``}
	let coverage = sat( ( foamSum + whitecaps ) * waterSurface.foamCoverage );

	// foam pattern: an irregular bubbly mat thresholded by coverage, so foam grows, tears into
	// lace and dissolves naturally
	let fuv = lagXZ * waterSurface.foamScale;
	let p1 = textureSample( waterFoamTex, smpAniso4Repeat, fuv );
	// second layer at another scale, rotated, to break repetition
	let r2 = vec2f( fuv.x * 0.8 - fuv.y * 0.6, fuv.x * 0.6 + fuv.y * 0.8 );
	let p2 = textureSample( waterFoamTex, smpAniso4Repeat, r2 * 2.37 + vec2f( 0.31, 0.77 ) );
	let pattern = p1.x * 0.62 + p2.x * 0.38;
	let thresh = 1.05 - coverage * 1.1;
	let soft = 0.06 + footprint * 0.1;
	let detail = smoothstep( thresh - soft, thresh + soft, pattern ) * ( p1.y * 0.25 + 0.8 );
	// at distance the pattern averages out -> use coverage directly
	let far = smoothstep( 0.15, 1.2, footprint );
	var foam = mix( detail, coverage * 0.85, far );

	var o: WaterSurfaceFrag;
${o?`
	// foam look (surf zone whitewater / lace, see SurfFoam)
	var fa: SurfFoamArgs;
	fa.coverage = coverage; fa.foam = foam; fa.footprint = footprint; fa.depth = depth; fa.bubbles = p1.y;
	fa.lagXZ = lagXZ; fa.normal = normal; fa.baseNormal = baseNormal;
	fa.fresh = ${r?`shoreFoam`:`0.0`}; fa.sim = simFoam; fa.simState = simState; fa.roller = ${r?`surfMask.y`:`0.0`}; fa.P = P;
	o.foamInfo = surfFoamShading( fa );
	foam = o.foamInfo.foam;`:``}

	o.normal = normal;
	o.foam = foam;
	o.coverage = coverage;
	o.slopes = slopes;
	o.jacobian = jac;
	o.rough = rough;
	o.aeration = sat( aeration );
	o.gust = ${a?`det.gust`:`0.5`};
	o.slick = ${a?`det.slick`:`0.0`};
	return o;
}
`;return new g({name:`waterSurface`,deps:[Re,e.module,this.cdlod.module,this.attenuationModule,n&&this.terrain.module,r&&this.shore.module,i&&this.wake.module,a&&this.detail.module,o&&o.module],uniforms:this.params,uniformName:`waterSurface`,bindings:{waterFoamTex:{texture:this.foamTexture}},code:f+S})}seaDepth(e){return`waterSurfaceSeaDepth( ${e} )`}cascadeAttenuation(e,t){return`waterSurfaceCascadeAttenuation( ${e}, ${t} )`}};function Wl(e,t=1024){let n=new N({label:`foamPattern`,width:t,height:t,format:`rgba16float`,mips:!0,usage:[`sample`,`storage`,`copyDst`],sampler:`anisoRepeat`}),r=(e,t,n)=>{let r=``,i=.5,a=0;for(let o=0;o<n;o++)r+=`${r?` + `:``}vnoise( ${e}, ${(t*2**o).toFixed(1)} ) * ${i}`,a+=i,i*=.5;return`( ( ${r} ) / ${a} )`};return new C({label:`Foam Pattern`,bindings:{foamOut:{storageTexture:n,access:`write`,view:{dimension:`2d`,baseMipLevel:0,mipLevelCount:1}}},workgroupSize:[8,8,1],code:`
fn hash2( p: vec2f ) -> vec2f { return fract( sin( vec2f( dot( p, vec2f( 127.1, 311.7 ) ), dot( p, vec2f( 269.5, 183.3 ) ) ) ) * 43758.5453 ); }
// GLSL-style mod (TSL .mod): x - y * floor( x / y )
fn fmod2( x: vec2f, y: f32 ) -> vec2f { return x - y * floor( x / y ); }

// periodic worley F1 with jittered cell sizes
fn worley( uv: vec2f, cells: f32 ) -> f32 {
	let p = uv * cells;
	let ip = floor( p );
	let fp = fract( p );
	var f1 = 8.0;
	for ( var j = -1; j <= 1; j++ ) {
		for ( var i = -1; i <= 1; i++ ) {
			let o = vec2f( f32( i ), f32( j ) );
			let cell = fmod2( ip + o, cells );
			let h = hash2( cell );
			let d = length( o + h - fp );
			f1 = min( f1, d );
		}
	}
	return f1;
}

fn vnoise( uv: vec2f, cells: f32 ) -> f32 {
	let p = uv * cells;
	let i = floor( p );
	let f = fract( p );
	let u = f * f * ( 3.0 - f * 2.0 );
	let a = hash2( fmod2( i, cells ) ).x;
	let b = hash2( fmod2( i + vec2f( 1.0, 0.0 ), cells ) ).x;
	let c = hash2( fmod2( i + vec2f( 0.0, 1.0 ), cells ) ).x;
	let d = hash2( fmod2( i + vec2f( 1.0, 1.0 ), cells ) ).x;
	return mix( mix( a, b, u.x ), mix( c, d, u.x ), u.y );
}

@compute @workgroup_size( WG_X, WG_Y, WG_Z )
fn main( @builtin( global_invocation_id ) gid: vec3u ) {
	let px = gid.xy;
	let uv = ( vec2f( px ) + 0.5 ) / ${t}.0;

	// domain warp (organic, flowing shapes)
	let w1 = ( vec2f( ${r(`uv`,3,4)}, ${r(`( uv + 0.43 )`,3,4)} ) - 0.5 ) * 0.14;
	let wuv = uv + w1;

	// density: ragged rafts
	let dens = ${r(`wuv`,4,6)};

	// holes of many sizes punched through the mat (worley, radius varied by noise)
	let holeA = smoothstep( 0.28, 0.12, worley( wuv, 7.0 ) + ( ${r(`uv`,16,3)} - 0.5 ) * 0.25 );
	let holeB = smoothstep( 0.30, 0.16, worley( wuv + 0.17, 19.0 ) + ( ${r(`uv`,32,2)} - 0.5 ) * 0.3 );
	let holeC = smoothstep( 0.32, 0.18, worley( wuv + 0.61, 47.0 ) );
	let holes = clamp( holeA * 0.9 + holeB * 0.7 + holeC * 0.45, 0.0, 1.0 );

	// fine bubbles: small bright dots
	let bub = smoothstep( 0.24, 0.08, worley( uv + 0.33, 140.0 ) ) * 0.8 + smoothstep( 0.2, 0.05, worley( uv + 0.71, 260.0 ) ) * 0.5;

	// streaks (drawn out by flow)
	let suv = vec2f( uv.x * 1.0, uv.y * 1.0 ) + w1 * 2.0;
	let streak = ${r(`suv`,12,4)};

	let foam = clamp( dens * 1.35 - holes * 0.55 + bub * 0.08, 0.0, 1.0 );
	let mottle = ${r(`uv`,2,3)};

	textureStore( foamOut, px, vec4f( foam, clamp( bub, 0.0, 1.0 ), mottle, streak ) );
}`}).dispatch([t/8,t/8,1]),w(n),n}var Gl=3.5,Kl=null;function ql(e=512){if(Kl)return Kl;let t=performance.now(),n=Jl(e),r=[{data:n,width:e,height:e}],i=n,a=e;for(;a>1;){let e=a>>1,t=new Uint8Array(e*e*4);for(let n=0;n<e;n++)for(let r=0;r<e;r++)for(let o=0;o<4;o++){let s=i[(2*n*a+2*r)*4+o],c=i[(2*n*a+2*r+1)*4+o],l=i[((2*n+1)*a+2*r)*4+o],u=i[((2*n+1)*a+2*r+1)*4+o];t[(n*e+r)*4+o]=s+c+l+u+2>>2}r.push({data:t,width:e,height:e}),i=t,a=e}let o=new N({label:`surfLace`,width:e,height:e,format:`rgba8unorm`,mips:r.length,usage:[`sample`,`copyDst`]});for(let e=0;e<r.length;e++)o.upload(r[e].data,{mip:e});o.userData={ms:performance.now()-t,size:e};let s=new N({label:`surfLaceNearest`,width:e,height:e,format:`rgba8unorm`,data:n,usage:[`sample`,`copyDst`]});return o.userData.nearest=s,o.userData.mips=r,Kl=o,o}function Jl(e){let t=new Uint8Array(e*e*4),n=(e,t,n)=>{let r=e*374761393+t*668265263+n*2246822519|0;return r=Math.imul(r^r>>>13,1274126177),r^=r>>>16,(r>>>0)/4294967296},r=(e,t,r,i)=>{let a=Math.floor(e),o=Math.floor(t),s=e-a,c=t-o,l=s*s*(3-2*s),u=c*c*(3-2*c),d=e=>(e%r+r)%r,f=n(d(a),d(o),i),p=n(d(a+1),d(o),i),m=n(d(a),d(o+1),i),h=n(d(a+1),d(o+1),i);return(f*(1-l)+p*l)*(1-u)+(m*(1-l)+h*l)*u},i=(e,t,n,i,a=3)=>{let o=0,s=.5,c=0;for(let l=0;l<a;l++)o+=r(e*(1<<l),t*(1<<l),n*(1<<l),i+l*17)*s,c+=s,s*=.5;return o/c},a=(e,t,r,i)=>{let a=Math.floor(e),o=Math.floor(t),s=9,c=9,l=0;for(let u=-1;u<=1;u++)for(let d=-1;d<=1;d++){let f=a+d,p=o+u,m=(f%r+r)%r,h=(p%r+r)%r,g=f+.15+.7*n(m,h,i),_=p+.15+.7*n(m,h,i+1),v=Math.hypot(g-e,_-t);v<s?(c=s,s=v,l=n(m,h,i+2)):v<c&&(c=v)}return[s,c,l]},o=(e,t,n)=>{let r=Math.min(1,Math.max(0,(n-e)/(t-e)));return r*r*(3-2*r)},s=e*e,c=new Float32Array(s),l=new Float32Array(s),u=new Float32Array(s);for(let t=0;t<e;t++)for(let n=0;n<e;n++){let r=(n+.5)/e,a=(t+.5)/e,o=(i(r*3,a*3,3,3)-.5)*.16,s=(i(r*3+5.2,a*3+1.3,3,7)-.5)*.16,d=(i((r+o)*9,(a+s)*9,9,13)-.5)*.07,f=(i((r+o)*9+2.7,(a+s)*9,9,17)-.5)*.07,p=t*e+n;c[p]=r+o+d,l[p]=a+s+f,u[p]=i(c[p]*6,l[p]*6,6,91,3)}let d=new Float32Array(s);for(let n=0;n<e;n++)for(let r=0;r<e;r++){let s=(r+.5)/e,f=(n+.5)/e,p=n*e+r,m=c[p],h=l[p],[g,_,v]=a(m*16,h*16,16,11),y=(_-g)*.5/16,b=u[p],x=(r+e-1)%e,S=(r+1)%e,C=(n+e-1)%e,w=(n+1)%e,T=(u[n*e+S]-u[n*e+x])*e*.5,E=(u[w*e+r]-u[C*e+r])*e*.5,D=Math.max(Math.hypot(T,E),.5),O=Math.min(Math.abs(b-.5),Math.abs(b-.36),Math.abs(b-.64))/D,k=i(s*24,f*24,24,5,2),A=o(.52,.36,i(s*10+3.1,f*10,10,31)),ee=Math.min(y*1.35+.004,O)/.03125*(.75+.5*k)+A*.22,j=i(s*3,f*3,3,71,4),[te,,ne]=a(s*120,f*120,120,61),re=.1+.22*ne,M=o(re,re*.35,te)*+(ne>.45)*(.25+.75*o(.5,.1,ee));d[p]=Math.min(1,ee),t[p*4+1]=Math.round(Math.min(1,M)*255),t[p*4+2]=Math.round(j*255),t[p*4+3]=Math.round(v*255)}let f=new Float32Array(d),p=new Float32Array(s);for(let t=0;t<2;t++){for(let t=0;t<e;t++)for(let n=0;n<e;n++){let r=0;for(let i=-2;i<=2;i++)r+=d[t*e+(n+i+e)%e];p[t*e+n]=r/5}for(let t=0;t<e;t++)for(let n=0;n<e;n++){let r=0;for(let i=-2;i<=2;i++)r+=p[(t+i+e)%e*e+n];d[t*e+n]=r/5}}for(let e=0;e<s;e++)t[e*4]=Math.round((f[e]+(d[e]-f[e])*o(.12,.45,f[e]))*255);return t}var Yl=class{constructor({shoreSim:e}){this.sim=e,this.bump=.7,this.period=1.2,this.maxFlow=2.5,this.module=new g({name:`surfFoam`,deps:[Re,e.module,e.shore.module],bindings:{surfFoamLaceTex:{texture:e.lace}},code:this._code()})}_code(){let e=e=>{let t=String(e);return t.includes(`.`)||t.includes(`e`)?t:t+`.0`};return`
struct SurfFoamArgs {
	coverage: f32,
	foam: f32,
	footprint: f32,
	depth: f32,
	bubbles: f32,
	lagXZ: vec2f,
	normal: vec3f,
	baseNormal: vec3f,
	fresh: f32,
	sim: f32,
	simState: vec4f,
	roller: f32,
	P: vec3f,
};

struct SurfFoamInfo {
	foam: f32,
	density: f32,
	height: f32,
	surf: f32,
	ww: f32,
	relief: f32,
	selfShadow: f32,
	cavity: f32,
	// relief split into world-space patterns and their weights: the weights come from values
	// interpolated across the water mesh (fresh whitewater, depth, footprint), so the screen-space
	// gradient of a weight is constant per triangle; differentiating the product drew every mesh
	// triangle as a flat facet into the foam. Only the patterns are differentiated.
	reliefPat: f32, // whitewater lumps (m), relief = reliefPat * reliefK
	reliefK: f32,
	thinPat: f32, // thin foam: height = thinPat * thinK + bubPat * bubK
	thinK: f32,
	bubPat: f32,
	bubK: f32,
};

// Henyey-Greenstein phase (1/sr)
fn surfFoamPhaseHG( cosT: f32, g: f32 ) -> f32 {
	let g2 = g * g;
	return ( ( 1.0 - g2 ) / ( 4.0 * PI ) ) / pow( max( 1.0 + g2 - cosT * 2.0 * g, 1e-4 ), 1.5 );
}

fn surfFoamHash11( x: f32 ) -> f32 { return fract( sin( x * 91.7 + 17.3 ) * 43758.5453 ); }

// Lace distance (0 on a bubble strand .. 1 in a hole) at pattern coordinates q (m), carried by
// flow (m/s in the same coordinates) with the dual-phase flow map. salt decorrelates layers.
fn surfFoamFlowLace( q: vec2f, flow: vec2f, salt: f32 ) -> vec4f {
	let t = frame.time / ${e(this.period)};
	let v = clamp( flow, vec2f( - ${e(this.maxFlow)} ), vec2f( ${e(this.maxFlow)} ) ) * ${e(this.period)};
	var out = vec4f( 0.0 );
	for ( var k = 0; k < 2; k++ ) {
		let tk = t + ( f32( k ) * 0.5 + salt * 0.37 );
		let ph = fract( tk );
		let cycle = floor( tk ) + ( f32( k ) * 13.1 + salt * 5.7 );
		let jitter = vec2f( surfFoamHash11( cycle ), surfFoamHash11( cycle + 0.5 ) ) * 7.0;
		let p = ( q - v * ( ph - 0.5 ) ) / ${e(Gl)} + jitter;
		let w = 1.0 - abs( ph * 2.0 - 1.0 );
		out += textureSample( surfFoamLaceTex, smpAnisoRepeat, p ) * w;
	}
	return out; // the two weights always add up to 1
}

fn surfFoamBigAt( qq: vec2f, pflow: vec2f ) -> f32 {
	return sqrt( surfFoamFlowLace( qq / 6.0, pflow / 6.0, 2.0 ).x );
}

// coverage: total foam amount (0..1, all sources); foam: the default (offshore whitecap) foam;
// footprint: pixel size on the surface (m); depth: sea depth; bubbles: fine bubble detail;
// normal: surface normal; fresh: whitewater made by the breaking wave right here (roller,
// plunge point, swash front); sim: foam carried by the water (ShoreSim, already kept off the
// clear face of plunging waves); simState: shoreSimSample() at this pixel; roller: relief of
// the whitewater roller (m)
fn surfFoamShading( a: SurfFoamArgs ) -> SurfFoamInfo {
	// world position of the fragment (the pattern is in world space); a caller that left P unset
	// (zero) gets the rest position instead: close, but the lace then rides the horizontal wave motion
	let P = select( a.P, vec3f( a.lagXZ.x, frame.seaLevel, a.lagXZ.y ), all( a.P == vec3f( 0.0 ) ) );
	let xz = P.xz;
	let coverage = a.coverage;
	var opacity = a.foam;
	var density = sat( coverage );
	var height = 0.0;
	var wwOut = 0.0; // how much of it is whitewater (deeper crevices)
	var wwRelief = 0.0; // relief of the whitewater (m)
	var wwShadow = 1.0; // sun visibility inside the churn
	var wwCav = 1.0; // sky visibility in its crevices
	var reliefPat = 0.0; var reliefK = 0.0;
	var thinPat = 0.0; var thinK = 0.0;
	var bubPat = 0.0; var bubK = 0.0;
	// surf look near the beach, the default whitecap look offshore
	let surf = smoothstep( 7.0, 3.0, a.depth ) * shoreSimInside( shoreSimUvOf( xz ) );
	if ( surf > 0.0 && coverage > 0.04 ) {

		// flow of the water here, from the shore simulation (along the local wave direction)
		let dir = shoreDirAt( xz ).xy;
		let speed = a.simState.w;
		let flow = dir * speed;

		// --- pattern: world-space lace carried by the flow; on steep faces a vertical projection
		// (along the crest x height) rolling down the face with the roller
		// (from the normal of the wave itself: steep ripple facets must not switch the projection,
		// that drew combs of vertical streaks into the foam on flat water and on the swash)
		let steep = smoothstep( 0.82, 0.5, a.baseNormal.y );
		let ww = sat( a.fresh * 1.4 );
		// far pixels (a lace cell under a few pixels) only use the pattern's average (see "far" below):
		// skip the lace and whitewater lump lookups there
		let farOnly = a.footprint >= 0.12;
		var flat = vec4f( 0.5 );
		if ( ! farOnly ) { flat = surfFoamFlowLace( xz, flow, 0.0 ); }
		var lace = flat;
		// lumps of tumbling whitewater (~0.6 m), only where there is whitewater
		var lumps = 0.5;
		let tangent = vec2f( - dir.y, dir.x );
		// (compressed vertically: a front only a metre or two high must not show single lumps as columns)
		// (the along-crest coordinate warped by low-frequency noise: the 3.5 m lace tile must not repeat as a
		// row of identical lumps and spikes along the break)
		let al = dot( xz, tangent );
		let qv = vec2f( al + sin( al * 0.19 + 0.8 ) * 2.1 + sin( al * 0.47 + 2.9 ) * 0.6 + sin( P.y * 1.7 + al * 0.11 ) * 0.5, P.y * 1.1 );
		if ( steep > 0.01 && ! farOnly ) {
			let vert = surfFoamFlowLace( qv, vec2f( 0.0, -0.9 ), 1.0 );
			lace = mix( flat, vert, steep );
		}
		// Churning whitewater is a pile of foam lumps at several scales (tumbling masses ~1.3 m,
		// clumps ~0.5 m, bubble clusters ~0.2 m): a relief (m) for the normals, sunlit caps and
		// self-shadowed crevices (a short march toward the sun through the lump field)
		if ( ww > 0.02 && ! farOnly ) {
			let L = frame.sunDir;
			let pq = mix( xz, qv, steep );
			let pflow = mix( flow, vec2f( 0.0, -0.9 ), steep );
			let big = surfFoamBigAt( pq, pflow );
			let mid = sqrt( surfFoamFlowLace( pq / 2.2, pflow / 2.2, 3.0 ).x );
			lumps = big * 0.6 + mid * 0.4;
			let A = 0.22; // relief of the lumps (m)
			reliefPat = big * A + mid * ( A * 0.45 ) + ( 1.0 - lace.x ) * ( A * 0.12 );
			wwRelief = reliefPat * ww;
			// the sun direction in the pattern's coordinates, and its elevation above the local surface
			let Lp = mix( L.xz, vec2f( dot( L.xz, tangent ), L.y * 1.1 ), steep );
			let Ld = Lp / max( length( Lp ), 1e-3 );
			let NdL = dot( a.normal, L );
			let tanE = NdL / max( length( L - a.normal * NdL ), 0.05 );
			var occ = 0.0;
			let steps = array<f32, 3>( 0.14, 0.34, 0.7 );
			for ( var i = 0; i < 3; i++ ) {
				let d = steps[ i ];
				let hk = surfFoamBigAt( pq + Ld * d, pflow );
				occ = max( occ, smoothstep( 0.0, 0.05, ( hk - big ) * A - tanE * d ) );
			}
			wwShadow = 1.0 - occ * mix( 0.85, 0.7, steep );
			// crevices between the lumps: occluded from the sky too
			wwCav = mix( 0.5, 1.0, smoothstep( 0.05, 0.75, lumps ) );
		}

		// --- whitewater: the aerated mass of a roller / plunge / swash front. Dense and opaque, its
		// surface boiling: lumps with shaded crevices between them, bubble clusters on each; it only
		// tears (and shows water through) at its edges.
		let boil = lace.x * 0.7 + lace.z * 0.3;
		// (the edge of the churn is torn by its lumps: ragged fingers, not a clean boundary)
		let wwEdge = smoothstep( 0.25, 0.75, ww * 1.35 - boil * 0.3 - ( 1.0 - lumps ) * 0.5 );
		let whitewater = ( ww * 0.25 + wwEdge * 0.75 ) * ( ( 1.0 - boil ) * 0.12 + 0.88 );

		// --- foam carried by the water: a lacy web of bubble strands and clusters around holes. With
		// more foam the strands widen into a mat; as it spreads and thins it tears into filaments.
		// (w: strand half-width; the pattern covers 6% of the area at w = 0.1, 34% at 0.3, 82% at 0.6)
		let c = sat( ( a.sim + max( coverage - a.sim - a.fresh, 0.0 ) * 0.5 - 0.05 ) / 0.95 );
		// hole edges are ragged (bubble clusters), hole sizes vary between patches
		let w = max( pow( c, 1.4 ) * 0.9 * ( lace.z * 0.5 + 0.75 ) + ( lace.y - 0.5 ) * 0.06, 0.0 );
		let soft = 0.05 + a.footprint * 4.5;
		let mat = ( 1.0 - smoothstep( w - soft, w + soft, lace.x ) ) * smoothstep( 0.0, 0.05, c );
		// scattered bubbles in the holes next to the strands
		let bub = lace.y * smoothstep( w + 0.25, w, lace.x ) * smoothstep( 0.02, 0.2, c ) * 0.5;
		// thin foam is translucent and uneven, thick foam is opaque
		let inner = sat( ( w - lace.x ) / 0.25 );
		let laceFoam = max( mat * sat( inner * 0.35 + 0.45 + lace.z * 0.3 ), bub );

		// once a lace cell (~0.2 m) covers a few pixels, use the average of the pattern
		let far = smoothstep( 0.03, 0.12, a.footprint );
		let average = max( sat( pow( w, 1.45 ) * 1.9 ) * 0.8, ww * 0.95 );
		let near = max( laceFoam, whitewater );
		opacity = mix( a.foam, mix( near, average, far ), surf );

		// optical thickness (thin foam is translucent, thick foam scatters like snow) and a relief
		// height for the lighting: lumpy boiling whitewater, thick foam higher than its thin edges
		density = max( sat( c * 1.3 ) * ( inner * 0.5 + 0.5 ), ww );
		let reliefThin = inner * sat( c * 1.5 );
		let relief = reliefThin * ( 1.0 - ww );
		wwOut = ww * ( 1.0 - far * 0.6 );
		// far away the lumps average out: a mean shadowing of the churn instead
		wwShadow = mix( wwShadow, 0.82, far );
		wwCav = mix( wwCav, 0.8, far );
		wwRelief *= 1.0 - far;
		height = ( relief + a.bubbles * 0.15 ) * surf * ( 1.0 - far );
		reliefK = ww * ( 1.0 - far );
		thinPat = reliefThin;
		thinK = ( 1.0 - ww ) * surf * ( 1.0 - far );
		bubPat = a.bubbles * 0.15;
		bubK = surf * ( 1.0 - far );
	}

	return SurfFoamInfo( opacity, density, height, surf, wwOut, wwRelief, wwShadow, wwCav, reliefPat, reliefK, thinPat, thinK, bubPat, bubK );
}

// Foam radiance: a dense scatterer, wrapped diffuse sun (light diffuses through the bubbles),
// sky ambient, darker in the dips of the bubbly relief, glowing at thin edges when backlit.
fn surfFoamLight( info: SurfFoamInfo, N: vec3f, L: vec3f, V: vec3f, sun: vec3f, P: vec3f ) -> vec3f {
	let ww = info.ww;
	let cavity = info.cavity;
	// relief normal from the screen-space gradient of the height (Mikkelsen surface gradient): the
	// thin-foam relief (in units of ~3 cm) plus the whitewater lumps (m)
	// (gradients of the world-space patterns only, scaled by their weights: see SurfFoamInfo)
	let kb = ${e(this.bump*.04)};
	let dpx = dpdx( P );
	let dpy = dpdy( P );
	let dhdx = dpdx( info.reliefPat ) * info.reliefK + ( dpdx( info.thinPat ) * info.thinK + dpdx( info.bubPat ) * info.bubK ) * kb;
	let dhdy = dpdy( info.reliefPat ) * info.reliefK + ( dpdy( info.thinPat ) * info.thinK + dpdy( info.bubPat ) * info.bubK ) * kb;
	let r1 = cross( dpy, N );
	let r2 = cross( N, dpx );
	let det = dot( dpx, r1 );
	let grad = ( r1 * dhdx + r2 * dhdy ) * sign( det );
	let Nf = normalize( N * abs( det ) - grad + N * 1e-6 );
	let NdL = dot( Nf, L );
	// foam lets light diffuse into it (wrapped lighting); churning whitewater much less so: its sides
	// facing away from the sun are shaded grey-blue by the sky, its caps sunlit, its crevices in the
	// shadow of the lumps around them
	let wrap = mix( 0.45, 0.12, ww );
	let diff = sat( NdL * ( 1.0 - wrap ) + wrap ) * mix( 1.0, info.selfShadow, ww );
	// dips between the lumps are shaded by the lumps around them (sky occlusion)
	let ao = mix( mix( 1.0, info.height * 0.3 + 0.76, info.surf ), cavity, ww );
	// light through thin aerated water (torn edges, thin foam, spray-soaked lips): green-white,
	// strongly forward scattered
	let thin = ( 1.0 - info.density ) * 0.8 + ww * ( 1.0 - cavity ) * 0.3;
	let trans = surfFoamPhaseHG( dot( - V, L ), 0.55 ) * thin * 1.3;
	let transCol = mix( vec3f( 1.0 ), vec3f( 0.6, 0.92, 0.82 ), ww * 0.7 + 0.3 );
	// light bounced around inside the churn (from its sunlit lumps) keeps the shaded foam from going
	// as dark and as blue as the open sky alone would make it
	let sky = frame.skyIrradiance;
	let skyGrey = vec3f( dot( sky, vec3f( 0.2126, 0.7152, 0.0722 ) ) );
	let amb = mix( sky, skyGrey, ww * 0.35 ) * ao + sun * ( ww * 0.05 ) * ao;
	return ( sun * ( diff * mix( 1.0, sqrt( cavity ), ww ) / PI + transCol * trans ) + amb ) * 0.86;
}
`}shading(){return this.module}},Xl=class{constructor(e,{terrainGPU:t,shore:n,center:r=new p(10,-25),size:i=380,res:a=768}){this.renderer=e,this.terrain=t,this.shore=n,this.res=a,this.uniforms=new l(`ShoreSimParams`,{min:[`vec2f`,new p(r.x-i/2,r.y-i/2)],size:[`f32`,i],dryTime:[`f32`,28],foamLife:[`f32`,4.5],surfFoamLife:[`f32`,2.6],residueLife:[`f32`,5],foamGen:[`f32`,1],depositGain:[`f32`,.02]});let o=this.uniforms.fields;this.uMin=o.min,this.uSize=o.size,this.dryTime=o.dryTime,this.foamLife=o.foamLife,this.surfFoamLife=o.surfFoamLife,this.residueLife=o.residueLife,this.foamGen=o.foamGen,this.depositGain=o.depositGain,this.lace=ql(),n.buildDirTexture({min:new p(r.x-i/2,r.y-i/2),size:i});let s=e=>new N({label:e,width:a,height:a,format:`rgba16float`,usage:[`sample`,`storage`,`copySrc`,`copyDst`]});this.stateA=s(`shoreStateA`),this.stateB=s(`shoreStateB`),this.deposit=new ve({label:`shoreDeposit`,count:a*a,type:`u32`});let c=this.lace.userData.size;this.module=new g({name:`shoreSim`,deps:[Re],uniforms:this.uniforms,uniformName:`shoreSimP`,bindings:{shoreSimStateTex:{texture:this.stateA},shoreSimLaceNearest:{texture:this.lace.userData.nearest}},code:`
const SHORE_SIM_RES: f32 = ${a}.0;
const SHORE_SIM_LACE_TILE: f32 = ${Gl};

fn shoreSimUvOf( xz: vec2f ) -> vec2f {
	return ( xz - shoreSimP.min ) / shoreSimP.size;
}

fn shoreSimInside( uv: vec2f ) -> f32 {
	return smoothstep( 0.0, 0.02, uv.x ) * smoothstep( 1.0, 0.98, uv.x ) * smoothstep( 0.0, 0.02, uv.y ) * smoothstep( 1.0, 0.98, uv.y );
}

// bilinear state at texture coordinate uv, from 4 loads
fn shoreSimStateAt( uv: vec2f ) -> vec4f {
	let fp = clamp( uv * SHORE_SIM_RES - 0.5, vec2f( 0.0 ), vec2f( SHORE_SIM_RES - 1.001 ) );
	let i = vec2i( floor( fp ) );
	let t = fract( fp );
	let a = textureLoad( shoreSimStateTex, i, 0 );
	let b = textureLoad( shoreSimStateTex, i + vec2i( 1, 0 ), 0 );
	let c = textureLoad( shoreSimStateTex, i + vec2i( 0, 1 ), 0 );
	let d = textureLoad( shoreSimStateTex, i + vec2i( 1, 1 ), 0 );
	return mix( mix( a, b, t.x ), mix( c, d, t.x ), t.y );
}

// raw state (foam, wetness, residue amount, lace offset), faded out at the region border
fn shoreSimState( xz: vec2f ) -> vec4f {
	let uv = shoreSimUvOf( xz );
	var out = vec4f( 0.0 );
	if ( uv.x > 0.0 && uv.x < 1.0 && uv.y > 0.0 && uv.y < 1.0 ) {
		out = shoreSimStateAt( uv ) * shoreSimInside( uv );
	}
	return out;
}

// vec4( foam amount on the water, sand wetness, foam amount left on the sand, flow speed ).
// Used by the water (x, w), the underwater lighting (x) and the terrain (y, z; for the lacy look
// of the foam left on the sand use shoreSimSandFoam()). No sampler bindings.
fn shoreSimSample( xz: vec2f ) -> vec4f {
	return shoreSimState( xz );
}

// bilinear lace lookup from 4 loads of the nearest-filtered copy (no sampler binding needed)
fn shoreSimLaceLoad( q: vec2f ) -> vec4f {
	let fp = q / SHORE_SIM_LACE_TILE * ${c}.0 - 0.5;
	let i = vec2i( floor( fp ) );
	let t = fract( fp );
	let m = vec2i( ${c-1} );
	let a = textureLoad( shoreSimLaceNearest, i & m, 0 );
	let b = textureLoad( shoreSimLaceNearest, ( i + vec2i( 1, 0 ) ) & m, 0 );
	let c = textureLoad( shoreSimLaceNearest, ( i + vec2i( 0, 1 ) ) & m, 0 );
	let d = textureLoad( shoreSimLaceNearest, ( i + vec2i( 1, 1 ) ) & m, 0 );
	return mix( mix( a, b, t.x ), mix( c, d, t.x ), t.y );
}

// Foam left on the sand (0..1): thin bubble lines and single bubbles where the draining water
// left its foam, popping patch by patch as it dries. Static on the sand (world space). s:
// shoreSimSample( xz ). (h: the ground height at xz, unused.)
fn shoreSimSandFoam( xz: vec2f, s: vec4f, h: f32 ) -> f32 {
	let r = s.z;
	// (screen-space footprint first: derivatives before the branch)
	let fp = length( fwidth( xz ) ) / SHORE_SIM_LACE_TILE * ${c}.0;
	var out = 0.0;
	if ( r > 0.01 ) {
		let lace = shoreSimLaceLoad( xz + 11.3 );
		// fade to the average where a pixel covers several strands (no mipmaps on the load path)
		let near = smoothstep( 3.0, 1.2, fp );
		let keep = smoothstep( lace.w * 0.55, lace.w * 0.55 + 0.08, r ); // staggered popping
		// thin bubble lines where the strands were, a little wider where more foam was left
		let lw = r * 0.1 + 0.06;
		let strand = ( 1.0 - smoothstep( lw, lw + 0.07, lace.x ) ) * ( lace.z * 0.5 + 0.6 );
		let lines = max( strand * smoothstep( 0.02, 0.25, r ) * keep, lace.y * keep * 0.8 );
		out = mix( smoothstep( 0.08, 0.6, r ) * 0.12, lines, near ) * 0.85;
	}
	return out;
}
`}),this.depositModule=new g({name:`shoreSimDeposit`,deps:[this.module],bindings:{shoreSimDepositA:{storage:this.deposit,access:`read_write`,type:`atomic<u32>`}},code:`
fn shoreSimDepositAt( xz: vec2f, n: u32 ) {
	let uv = shoreSimUvOf( xz );
	if ( uv.x > 0.0 && uv.x < 1.0 && uv.y > 0.0 && uv.y < 1.0 ) {
		let ij = vec2u( uv * SHORE_SIM_RES );
		atomicAdd( &shoreSimDepositA[ ij.y * ${a}u + ij.x ], n );
	}
}
`}),this.kernel=new C({label:`Shore Sim`,modules:[this.module,n.module,t.module],workgroupSize:[8,8,1],bindings:{shoreSimOut:{storageTexture:this.stateB,access:`write`},shoreSimDeposit:{storage:this.deposit,access:`read_write`,type:`u32`},shoreSimLace:{texture:this.lace}},code:`
@compute @workgroup_size( WG_X, WG_Y, WG_Z )
fn main( @builtin( global_invocation_id ) gid: vec3u ) {
	if ( gid.x >= ${a}u || gid.y >= ${a}u ) { return; }
	let ij = vec2f( gid.xy );
	let uv = ( ij + 0.5 ) / SHORE_SIM_RES;
	let p = shoreSimP.min + uv * shoreSimP.size;
	let ground = terrainHeightAt( p );
	let depth = frame.seaLevel - ground;
	let dt = frame.dt;

	let here = textureLoad( shoreSimStateTex, vec2i( gid.xy ), 0 );
	let di = gid.y * ${a}u + gid.x;
	let drops = f32( shoreSimDeposit[ di ] );
	if ( drops > 0.0 ) {
		shoreSimDeposit[ di ] = 0u;
	}

	// far from the surf and swash zone nothing happens: just let everything decay
	if ( depth > 7.0 || ground > 3.2 ) {
		let k = exp( - dt / 2.0 );
		textureStore( shoreSimOut, gid.xy, vec4f( here.x * k, here.y * exp( - dt / shoreSimP.dryTime ), here.z * k, 0.0 ) );
		return;
	}

	let sw = shoreEvaluateWorld( p, depth, ground );

	// fraction of this texel covered by water: open water, or the swash sheet up to its leading
	// edge (soft over one texel, so no field stored here shows the texel grid)
	let cov = select( sat( ( sw.runup - sw.inland ) / ( shoreSimP.size / SHORE_SIM_RES ) + 0.5 ), 1.0, depth > 0.03 );
	let covered = cov > 0.5;
	let vel = select( vec2f( 0.0 ), sw.flow, covered );

	// semi-Lagrangian advection (backtrace)
	let back = uv - vel * dt / shoreSimP.size;
	let prev = shoreSimStateAt( back );

	// foam: made where the bore roller / plunge point / swash front pass, torn into patches by
	// the mottling of the lace texture, then it decays (bubbles rising and popping) and drains
	// into the sand once the water has gone
	let mott = textureSampleLevel( shoreSimLace, smpLinearRepeat, p / ( SHORE_SIM_LACE_TILE * 4.3 ), 2.0 ).z;
	let patchK = smoothstep( 0.25, 0.75, mott ) * 0.8 + 0.35;
	let swashy = smoothstep( 0.35, 0.05, depth );
	// dense foam collapses within a second or two (big bubbles burst first), the lace it leaves lingers
	let lace = mix( shoreSimP.surfFoamLife, shoreSimP.foamLife, swashy );
	let life = mix( 0.7, mix( lace, 0.8, smoothstep( 0.3, 0.8, prev.x ) ), cov );
	let gen = ( sw.foam * 2.2 + sw.swashFoam * 1.4 ) * patchK * cov;
	// the foam is diluted where the flow spreads it out (the uprush thinning as it climbs, the
	// backwash draining): d(foam)/dt = - foam * du/ds along the flow
	let h = shoreSimP.size / SHORE_SIM_RES;
	let dirH = sw.dir * ( h / shoreSimP.size );
	let uAhead = shoreSimStateAt( uv + dirH ).w;
	let uBehind = shoreSimStateAt( uv - dirH ).w;
	let spreadRate = max( ( uAhead - uBehind ) / ( 2.0 * h ), 0.0 );
	let splash = drops * shoreSimP.depositGain * cov;
	let foam = min( prev.x * exp( - dt * ( 1.0 / life + spreadRate ) ) + gen * shoreSimP.foamGen * dt + splash, 1.0 );

	// wetness: saturated while covered, then dries
	let wet = max( here.y * exp( - dt / shoreSimP.dryTime ), cov );

	// residue: foam stranded on the sand when the water leaves (the draining film gathers its
	// bubbles into lines, so it concentrates); washed away by the next uprush
	let stranded = min( here.x * 2.4, 1.0 ) * ( 1.0 - cov );
	let residue = max( here.z * mix( exp( - dt / shoreSimP.residueLife ), 0.85, cov ), stranded );

	textureStore( shoreSimOut, gid.xy, vec4f( foam, wet, residue, dot( vel, sw.dir ) ) );
}
`})}update(){this.kernel.dispatch(this.kernel.groups(this.res,this.res));let e={width:this.res,height:this.res};_e.getEncoder().copyTextureToTexture({texture:this.stateB.getGPU()},{texture:this.stateA.getGPU()},e)}},Zl=512,Ql=[128,1024];function $l({fft:e,caustics:t,clouds:n=null,terrain:r=null,shore:i=null,surface:a=null,shoreSim:o=null}){let s=new l(`UnderwaterParams`,{reach:[`f32`,3]},{label:`underwater`});s.onBeforePack=()=>{s.fields.reach.value=i&&i.amplitude?i.amplitude.value*1.5+1.2:3};let c=!!r,u=!!(i&&r),d=[Re,Ue,e.module,r&&r.module,u&&i.module,o&&o.module,t&&t.module,n&&n.module,a&&a.attenuationModule],f=Math.min(3,e.cascades),m=Math.min(2,e.cascades),h=new g({name:`underwater`,deps:d,uniforms:s,uniformName:`underwater`,code:`
struct UnderwaterLongWaves { height: f32, slope: vec2f, foam: f32 };

// long waves at xz: height, slope and foam from the coarse FFT cascades and the shore waves
// texel: the bake's texel size (m); the cascades are read no finer than it (level >= 2)
fn underwaterLongWaves( xz: vec2f, texel: f32 ) -> UnderwaterLongWaves {
	let seaDepth = ${c?`frame.seaLevel - terrainHeightAt( xz )`:`50.0`};
	var h = 0.0;
	var slope = vec2f( 0.0 );
	for ( var c = 0; c < ${f}; c++ ) {
		let uv = xz / ocean.sizes[ c ].x;
		let att = ${a?`waterSurfaceCascadeAttenuation( c, seaDepth )`:`1.0`};
		let lvl = max( 2.0, log2( texel * 256.0 / ocean.sizes[ c ].x ) );
		h += textureSampleLevel( oceanDisplacement, smpLinearRepeat, uv, c, lvl ).y * att;
		if ( c < 2 ) {
			let d = textureSampleLevel( oceanDerivatives, smpLinearRepeat, uv, c, lvl );
			slope += vec2f( d.x, d.y ) * att;
		}
	}

	var foam = 0.0;
${u?`	{
		let sw = shoreEvaluate( xz, seaDepth, terrainHeightAt( xz ) );
		h += sw.disp.y;
		let n = sw.nShore;
		slope += - vec2f( n.x, n.z ) / max( n.y, 0.25 );
		foam += sw.foam;
	}`:``}
${o?`	foam += shoreSimSample( xz ).x * 0.8;`:``}
	// waves only exist over water: none over dry land
${c?`	h = h * smoothstep( 0.0, 1.0, seaDepth ) - smoothstep( 0.0, -0.4, seaDepth ) * 10.0;`:``}
	var o: UnderwaterLongWaves;
	o.height = frame.seaLevel + h;
	o.slope = slope;
	o.foam = foam;
	return o;
}

fn underwaterSigT() -> vec3f { return frame.waterAbsorption + frame.waterScattering; }

// mean water level from the two longest FFT cascades (one texture binding)
fn underwaterMeanLevel( xz: vec2f ) -> f32 {
	var h = 0.0;
	for ( var c = 0; c < ${m}; c++ ) {
		h += textureSampleLevel( oceanDisplacement, smpLinearRepeat, xz / ocean.sizes[ c ].x, c, 3.0 ).y;
	}
${c?`	h *= smoothstep( 0.0, 3.0, frame.seaLevel - terrainHeightAt( xz ) );`:``}
	return frame.seaLevel + h;
}
`}),_=new l(`UwMapParams`,{origin0:[`vec2f`,new p],origin1:[`vec2f`,new p],reach:[`f32`,3]},{label:`uwMap`});_.onBeforePack=()=>{_.fields.reach.value=i&&i.amplitude?i.amplitude.value*1.5+1.2:3};let v=[_.fields.origin0,_.fields.origin1],y=e=>new N({label:e,width:Zl,height:Zl,format:`rgba16float`,usage:[`sample`,`storage`]}),b=Ql.map((e,n)=>{let r=e/Zl,i=y(`uwWaves`+n),a=y(`uwLevel`+n);return{extent:e,texel:r,A:i,B:a,kernel:new C({label:`Underwater Light Map `+n,modules:[h,...t&&t.module?[t.module]:[]],bindings:{uwMapParams:{uniform:_},uwOutA:{storageTexture:i,access:`write`},uwOutB:{storageTexture:a,access:`write`}},workgroupSize:[8,8,1],code:`
@compute @workgroup_size( WG_X, WG_Y, WG_Z )
fn main( @builtin( global_invocation_id ) gid: vec3u ) {
	let xz = ( vec2f( gid.xy ) + 0.5 ) * ${r} + uwMapParams.origin${n};
	let lw = underwaterLongWaves( xz, ${r} );
	textureStore( uwOutA, vec2u( gid.xy ), vec4f( lw.height - frame.seaLevel, lw.slope, sat( lw.foam ) ) );
	let dk = ${t&&t.module?`causticsDetailK( xz )`:`1.0`};
	textureStore( uwOutB, vec2u( gid.xy ), vec4f( underwaterMeanLevel( xz ) - frame.seaLevel, dk, 0.0, 1.0 ) );
}
`}),origin:v[n]}}),[x,S]=b,w=new g({name:`uwMap`,deps:[Re],uniforms:_,uniformName:`uwMapParams`,bindings:{uwWaves0:{texture:x.A},uwLevel0:{texture:x.B},uwWaves1:{texture:S.A},uwLevel1:{texture:S.B}},code:`
struct UwMapSample { height: f32, slope: vec2f, foam: f32, mean: f32, detailK: f32 };

fn uwReach() -> f32 { return uwMapParams.reach; }

// bilinear lookup of the baked maps at xz (near map first, then far; flat sea beyond).
// waves: map A (height, slope, foam) is only read for the full direct term
// (the direct, ambient and shadow position hooks look up the same point: the last lookup is
// remembered; one made with waves serves the calls without)
var<private> uwMemoXZ: vec2f = vec2f( 3.0e38 );
var<private> uwMemoWaves: bool = false;
var<private> uwMemo: UwMapSample;
fn uwMapLookup( xz: vec2f, waves: bool ) -> UwMapSample {
	if ( all( xz == uwMemoXZ ) && ( uwMemoWaves || ! waves ) ) { return uwMemo; }
	uwMemoXZ = xz;
	uwMemoWaves = waves;
	uwMemo = _uwMapLookup( xz, waves );
	return uwMemo;
}
fn _uwMapLookup( xz: vec2f, waves: bool ) -> UwMapSample {
	var a = vec4f( 0.0 );
	var b = vec4f( 0.0, 0.9, 0.0, 0.0 );
	let st0 = ( xz - uwMapParams.origin0 ) / ${x.texel};
	let st1 = ( xz - uwMapParams.origin1 ) / ${S.texel};
	if ( all( st0 > vec2f( 0.5 ) ) && all( st0 < vec2f( ${Zl}.0 - 0.5 ) ) ) {
		let uv = st0 / ${Zl}.0;
		if ( waves ) { a = textureSampleLevel( uwWaves0, smpLinearClamp, uv, 0.0 ); }
		b = textureSampleLevel( uwLevel0, smpLinearClamp, uv, 0.0 );
	} else if ( all( st1 > vec2f( 0.5 ) ) && all( st1 < vec2f( ${Zl}.0 - 0.5 ) ) ) {
		let uv = st1 / ${Zl}.0;
		if ( waves ) { a = textureSampleLevel( uwWaves1, smpLinearClamp, uv, 0.0 ); }
		b = textureSampleLevel( uwLevel1, smpLinearClamp, uv, 0.0 );
	}
	return UwMapSample( frame.seaLevel + a.x, a.yz, a.w, frame.seaLevel + b.x, b.y );
}
`}),T=e=>{for(let t of b){let n=t.extent/2;t.origin.value.set(Math.floor(e.position.x/t.texel)*t.texel-n,Math.floor(e.position.z/t.texel)*t.texel-n)}for(let e of b)e.kernel.dispatch([Zl/8,Zl/8,1])},E=[Re,Ue,w,t&&t.module,n&&n.module,r&&r.module].filter(Boolean),D=new g({name:`hook-directModulation-underwater`,deps:E,code:`
fn hookDirectModulation( P: vec3f, N: vec3f ) -> vec3f {
#if IS_WATER
	return vec3f( 1.0 );
#else
	var result = vec3f( 1.0 );
#if UNDERWATER_LIGHTING == 2
	// the pixel's footprint on the ground plane, to filter the caustics over it (screen derivatives
	// taken by shadeSurface in uniform control flow: this hook runs in its branches)
	let gdx = lightDPdx.xz;
	let gdy = lightDPdy.xz;
#endif
#if UNDERWATER_LIGHTING != 0
	// cheap reject: above anything the water reaches
	if ( frame.waterEnabled > 0.5 && P.y < frame.seaLevel + uwReach() ) {
#if UNDERWATER_LIGHTING == 2
		let lw = uwMapLookup( P.xz, true );
		let lwHeight = lw.height;
#else
		let lwHeight = uwMapLookup( P.xz, false ).mean;
#endif
		let d = max( lwHeight - P.y, 0.0 );
		if ( d > 0.0 ) {
			let under = smoothstep( 0.0, 0.08, d );
			let Ls = refract( - frame.sunDir, vec3f( 0.0, 1.0, 0.0 ), 1.0 / 1.333 );
			let mu = max( - Ls.y, 0.15 );
			let atten = exp( - ( frame.waterAbsorption + frame.waterScattering ) * d / mu );
#if UNDERWATER_LIGHTING == 2
#if REFRACTION_CLIP
			// the refraction source is half resolution and seen blurred: no dispersion
			let caust = ${t?`causticsSampleBakedMono( P, d, lw.slope, lw.foam, gdx, gdy, lw.detailK )`:`vec3f( 1.0 )`};
#else
			let caust = ${t?`causticsSampleBaked( P, d, lw.slope, lw.foam, gdx, gdy, lw.detailK )`:`vec3f( 1.0 )`};
#endif
#else
			let caust = vec3f( 1.0 );
#endif
			result = mix( vec3f( 1.0 ), atten * caust, under );
		}
	}
#endif
	let cloudShadow = ${n?`cloudsShadow( P.xz )`:`1.0`};
	// hills shadowing the island and the bay at low sun (terrain heightfield shadow; the terrain and
	// the rocks apply it in their own lighting model)
#if HILL_SHADOW_SELF
	let hill = 1.0;
#else
	let hill = ${c?`terrainSunShadowAt( P )`:`1.0`};
#endif
	return result * cloudShadow * hill;
#endif
}
`}),O=new g({name:`hook-ambientModulation-underwater`,deps:[D],code:`
fn hookAmbientModulation( P: vec3f, N: vec3f ) -> vec3f {
	var result = vec3f( 1.0 );
#if !IS_WATER
#if UNDERWATER_LIGHTING != 0
	if ( frame.waterEnabled > 0.5 && P.y < frame.seaLevel + uwReach() ) {
		// the ambient term only needs the mean water level (no shore evaluation)
		let d = max( uwMapLookup( P.xz, false ).mean - P.y, 0.0 );
		let under = smoothstep( 0.0, 0.1, d );
		// diffuse downwelling light: effective path ~1.2x depth, plus a little in-scattered blue
		let atten = exp( - ( frame.waterAbsorption + frame.waterScattering ) * d * 1.2 ) * 0.85 + vec3f( 0.0, 0.02, 0.04 ) * exp( d * -0.1 );
		result = mix( vec3f( 1.0 ), atten, under );
	}
#endif
#endif
	return result;
}
`}),k=new g({name:`hook-shadowPosition-underwater`,deps:E,code:`
fn hookShadowPosition( P: vec3f, N: vec3f, pixel: vec2f ) -> vec3f {
#if IS_WATER || UNDERWATER_LIGHTING == 0
	return P;
#else
	if ( frame.waterEnabled < 0.5 || P.y >= frame.seaLevel + uwReach() ) { return P; }
#if UNDERWATER_LIGHTING == 2
	let m = uwMapLookup( P.xz, true );
	let h = m.height;
	let n = normalize( vec3f( - m.slope.x, 1.0, - m.slope.y ) );
#else
	let h = uwMapLookup( P.xz, false ).mean;
	let n = vec3f( 0.0, 1.0, 0.0 );
#endif
	let d = h - P.y;
	if ( d <= 0.0 ) { return P; }
	let up = - refract( - frame.sunDir, n, 1.0 / 1.333 ); // toward the entry point, in the water
	let entry = P + up * ( d / max( up.y, 0.15 ) );
	let g = interleavedGradientNoise( pixel + f32( frame.frameIndex % 64u ) * 5.588238 );
	let phi = g * TWO_PI;
	let rad = sqrt( fract( g * 1.618034 + 0.31 ) ) * min( d * 0.05, 0.5 );
	return entry + vec3f( cos( phi ), 0.0, sin( phi ) ) * rad;
#endif
}
`});return Ke.set(`directModulation`,D),Ke.set(`shadowPosition`,k),Ke.set(`ambientModulation`,O),{helpers:h,direct:D,ambient:O,shadowPos:k,params:s,update:T,levels:b}}var eu=class{constructor(e,t){this.renderer=e,this.surface=t,this.inputs=new Float32Array(256),this.inputBuffer=new ve({label:`waterQueryInputs`,count:64,type:`vec4f`}),this.results=new ve({label:`waterQueryResults`,count:64,type:`vec4f`,data:new Float32Array(256)}),this.count=1,this.cpu=new Float32Array(256),this.cpuValid=!1,this._pending=!1,this.version=0,this.resultTime=0,this.resultInputs=new Float32Array(256),this._issueInputs=new Float32Array(256),this.latency=.05,this.frameLatency=0,this.slots=new Map,this.readback=new ye({byteLength:1024,ring:3,label:`waterQuery`}),this.resultsModule=new g({name:`waterQuery`,bindings:{waterQueryResults:{storage:this.results,access:`read`}},code:`
fn waterQueryResult( slot: u32 ) -> vec4f { return waterQueryResults[ slot ]; }
fn waterQueryHeightAt( slot: u32 ) -> f32 { return waterQueryResults[ slot ].x; }
fn waterQueryCameraState() -> vec4f { return waterQueryResults[ 0 ]; }
`}),this._heightModule=null,this._module=null,this.kernel=null}get module(){return this._module||=new g({name:`waterQueryAll`,deps:[this.resultsModule,this.heightModule]}),this._module}get heightModule(){if(this._heightModule)return this._heightModule;let e=this.surface,t=e.fft,n=t.cascades,r=``;for(let e=0;e<n;e++)r+=`\td += textureSampleLevel( oceanDisplacement, smpLinearRepeat, x0 / ocean.sizes[ ${e} ].x, ${e}, ${e===n-1?`2.0`:`0.0`} ).xyz * waterSurfaceCascadeAttenuation( ${e}, depth );\n`;let i=!!(e.shore&&e.terrain);return this._heightModule=new g({name:`waterQueryHeight`,deps:[Re,t.module,e.attenuationModule,e.terrain&&e.terrain.module,i&&e.shore.module,e.wake&&e.wake.module],uniforms:e.params,uniformName:`waterSurface`,code:`
fn waterQueryDispAt( x0: vec2f, depth: f32 ) -> vec3f {
	var d = vec3f( 0.0 );
${r}
	d *= waterSurface.amplitude;
${i?`	d += shoreEvaluateNoNormal( x0, depth, terrainHeightAt( x0 ) ).disp;`:``}
${e.wake?`	d += wakeDisplacement( x0 );`:``}
	return d;
}

fn waterQueryHeightAtXZ( p: vec2f ) -> f32 {
	if ( frame.waterEnabled < 0.5 ) { return frame.seaLevel; }
	let depth = ${e.terrain?`frame.seaLevel - terrainHeightAt( p )`:`500.0`};
	var x0 = p;
	for ( var i = 0; i < 2; i++ ) {
		x0 = p - waterQueryDispAt( x0, depth ).xz;
	}
	return frame.seaLevel + waterQueryDispAt( x0, depth ).y;
}
`}),this._heightModule}heightAtNode(e){return`waterQueryHeightAtXZ( ${e} )`}_build(){let e=this.surface;this.kernel=new C({label:`Water Queries`,modules:[this.heightModule],bindings:{queryInputs:{storage:this.inputBuffer,access:`read`},queryResults:{storage:this.results,access:`read_write`}},workgroupSize:[64,1,1],code:`
@compute @workgroup_size( WG_X, WG_Y, WG_Z )
fn main( @builtin( global_invocation_id ) gid: vec3u ) {
	let i = gid.x;
	if ( i >= 64u ) { return; }
	let q = queryInputs[ i ];
	let xz = q.xy;
	let h = waterQueryHeightAtXZ( xz );
	let e = 0.35;
	let hx = waterQueryHeightAtXZ( xz + vec2f( e, 0.0 ) );
	let hz = waterQueryHeightAtXZ( xz + vec2f( 0.0, e ) );
	let n = normalize( vec3f( ( h - hx ) / e, 1.0, ( h - hz ) / e ) );
	let seaFloor = ${e.terrain?`terrainHeightAt( xz )`:`-500.0`};
	queryResults[ i ] = vec4f( h, n.x, n.z, seaFloor );
}`})}setCamera(e,t){this.inputs[0]=e,this.inputs[1]=t}allocate(e,t){if(this.slots.has(e))return this.slots.get(e).start;let n=this.count;if(n+t>64)throw Error(`WaterQuery: out of slots`);return this.slots.set(e,{start:n,n:t}),this.count+=t,n}setPoint(e,t,n){this.inputs[e*4]=t,this.inputs[e*4+1]=n}get(e,t={}){let n=this.cpu;return t.height=n[e*4],t.nx=n[e*4+1],t.nz=n[e*4+2],t.floor=n[e*4+3],t}update(){if(this.flatMode){zn(this,h.seaLevel.value,this.flatTerrain,h.time.value);return}if(this.kernel||this._build(),this.inputBuffer.write(this.inputs),this.kernel.dispatch(1),!this._pending){let e=h.time.value;this._issueInputs.set(this.inputs),this.readback.onData=e=>{this.cpu.set(new Float32Array(e)),this.cpuValid=!0,this._pending=!1,this.latency+=(Math.min(h.time.value-this._issued,.25)-this.latency)*.2,this.resultTime=this._issued,this.resultInputs.set(this._issueInputs),this.version++},this.readback.request(this.results)&&(this._pending=!0,this._issued=e)}}cameraState(){let e=e=>{let t=new String(e);return t.module=this.resultsModule,t},t=e(`waterQueryCameraState()`);for(let n of`xyzw`)t[n]=e(`waterQueryCameraState().${n}`);return t}},tu=20,nu=e=>{let t=String(e);return t.includes(`.`)||t.includes(`e`)?t:t+`.0`},ru=new g({name:`breakersFresnel`,code:`
fn breakersFresnel( cosI: f32, eta: f32 ) -> f32 {
	let c = clamp( cosI, 0.0, 1.0 );
	let g2 = eta * eta - 1.0 + c * c;
	let g = sqrt( max( g2, 0.0 ) );
	let a = ( g - c ) / ( g + c );
	let b = ( c * ( g + c ) - 1.0 ) / ( c * ( g - c ) + 1.0 );
	return select( 0.5 * a * a * ( b * b + 1.0 ), 1.0, g2 < 0.0 );
}
`}),iu=class{constructor(e,{surface:t,shore:r,terrainData:i,sky:a,spray:o=null,clouds:s=null}){this.renderer=e,this.surface=t,this.shore=r,this.sky=a,this.spray=o,this.clouds=s,this.uniforms=new l(`BreakersParams`,{cameraPos:[`vec3f`,new n],spray:[`f32`,1],sheet:[`f32`,1],emitRange:[`f32`,240],amplitude:[`f32`,1],budget:[`f32`,.3]});let c=this.uniforms.fields;this.params={spray:c.spray,sheet:c.sheet,emitRange:c.emitRange},this.cameraPos=c.cameraPos;let u=performance.now(),d=au(i);this.NS=d.count,this.spacing=d.spacing,this.stationData=d.data,this.stations=new ve({label:`brkStations`,count:Math.max(1,this.NS),type:`vec4f`,data:d.data.length?d.data:new Float32Array(4)}),this.crest=new ve({label:`brkCrest`,count:Math.max(1,this.NS*6),type:`vec4f`}),this.crestRead={storage:this.crest,access:`read`},this.setupMs=performance.now()-u,this.sprayShadowModule=new g({name:`breakersSprayShadow`,deps:[Re],bindings:{breakersCrest:this.crestRead},code:`
fn breakersSprayShadow( p: vec3f, seedTag: f32 ) -> f32 {
	var out = 1.0;
	let idx = floor( seedTag ) - 1.0;
	if ( idx >= 0.0 && idx < ${nu(this.NS*2)} ) {
		let k = u32( idx ) * 3u;
		let c0 = breakersCrest[ k ];
		let c1 = breakersCrest[ k + 1u ];
		let c2 = breakersCrest[ k + 2u ];
		let L = frame.sunDir;
		let d2 = c2.xy;
		let Ld = dot( L.xz, d2 ); // < 0: the sun is on the sea side of the wave
		if ( c2.w > 0.5 && Ld < -0.02 ) {
			let root = c0.xyz;
			let b = c0.w;
			let H = c1.w;
			let q = clamp( b / 0.9, 0.0, 1.0 ) * ( 1.0 - smoothstep( 1.0, 1.3, b ) );
			// vertical plane through the crest (moved forward under the overhanging lip)
			let plane = root.xz + d2 * ( H * 0.8 * q * 0.6 );
			let s = dot( p.xz - plane, d2 ); // > 0: in front of it
			let tau = s / - Ld;
			let yRay = p.y + L.y * tau; // height of the ray toward the sun where it crosses the plane
			let top = root.y + 0.05;
			let shade = smoothstep( top, top - 0.4, yRay ) * smoothstep( -0.1, 0.1, s ) * smoothstep( 14.0, 6.0, s );
			out = 1.0 - shade * 0.55;
		}
	}
	return out;
}
`}),o&&(o.waveShadow=this.sprayShadowModule,!o.shoreSim&&t.shoreSim&&(o.shoreSim=t.shoreSim)),this.NS>1?(this._buildKernel(),this._buildMesh()):(console.warn(`Breakers: no beach stations found`),this.mesh=new Ee(new Be,new $e({name:`BreakerLip`,visible:!1})),this.mesh.visible=!1)}update(e){this.cameraPos.value.copy(e.position),this.surface&&this.surface.amplitude&&(this.uniforms.fields.amplitude.value=this.surface.amplitude.value),this.kernel&&this.kernel.dispatch(Math.ceil(this.NS/64)),this._budget()}_budget(){let e=this.spray;if(e&&e.head&&(this._rb||(this._rb=new ye({byteLength:4,ring:3,label:`breakersHead`}),this._hist=[],this._simT=new Map),this._rb.request(e.head)&&this._simT.set(_e.frame,h.time.value),this._rb.latest&&this._simT.has(this._rb.frame))){let t=new Uint32Array(this._rb.latest)[0],n=this._simT.get(this._rb.frame);for(let e of this._simT.keys())e<this._rb.frame&&this._simT.delete(e);let r=this._hist;for((!r.length||r[r.length-1].t!==n)&&r.push({head:t,t:n});r.length>2&&n-r[0].t>2.5;)r.shift();if(r.length>1){let t=r[0],n=r[r.length-1],i=n.t-t.t;if(i>1){let r=(n.head-t.head>>>0)/i,a=e.NG/2,o=this.uniforms.fields.budget,s=r>1?o.value*Math.sqrt(a/r):1;o.value=Math.min(1,Math.max(.05,o.value+(s-o.value)*.04))}}}}_buildKernel(){let e=this.surface,t=this.NS,n=e.fft,r=this.spray,i=``;for(let e=1;e<n.cascades;e++){let t=n.sizes[e],r=t/256,a=Math.max(Math.log2(.35/r)+.7,0),o=Math.min(40,t*.08),s=[0,.05,.25,.5][e]??.5;i+=`	d += textureSampleLevel( oceanDisplacement, smpLinearRepeat, p / ${nu(t)}, ${e}, ${nu(a)} ).xyz * mix( ${nu(s)} * smoothstep( 0.0, 0.6, depth ), 1.0, smoothstep( 0.0, ${nu(o)}, depth ) );\n`}let a=r?this._emitCode():``,o=`
const BRK_GRAVITY: f32 = ${nu(v)};

fn breakersFftDisp( p: vec2f, depth: f32 ) -> vec3f {
	var d = vec3f( 0.0 );
${i}	return d * breakersP.amplitude;
}

${a}

// One crest of wave m at Lagrangian point pc (station i): store the lip frame and emit spray.
fn breakersProcessCrest( i: u32, pc: vec2f, m: f32 ) {
	let ph = shorePhaseAt( pc );
	let dir = ph.dir;
	let along = ph.along;
	let ground = terrainHeightAt( pc );
	let depth = frame.seaLevel - ground;
	let A = shoreWaveAmp( m, along );
	let cr = shoreCrest( A, depth ); // ( b, H, trough, lipThrow )
	let b = cr.x;
	let env = smoothstep( 26.0, 13.0, depth ) * sat( ph.exposure * 1.4 ) * shoreP.enabled;

	// followed from before it breaks until the bore reaches the shore (the lip sheet only uses b < 1.25)
	if ( b > -0.6 && env > 0.3 && depth > 0.12 ) {
		let c = sqrt( clamp( depth, 0.3, 25.0 ) * BRK_GRAVITY );
		let lam = c * shoreP.period;
		let s0 = shoreShape( 0.0, A, depth, lam );
		let ub = 0.4 / lam;
		let s1 = shoreShape( ub, A, depth, lam );
		let fd = breakersFftDisp( pc, depth );
		let d3 = vec3f( dir.x, 0.0, dir.y );
		let root = vec3f( pc.x, frame.seaLevel, pc.y ) + d3 * ( s0.x * env ) + vec3f( 0.0, s0.y * env, 0.0 ) + fd;
		let back = vec3f( pc.x, frame.seaLevel, pc.y ) + d3 * ( s1.x * env - 0.4 ) + vec3f( 0.0, s1.y * env, 0.0 ) + fd;
		let H = cr.y * env;
		let trough = frame.seaLevel + cr.z * env + fd.y;
		// slot by wave parity (neighbouring stations agree on it), id = wave index mod 1024, + 1 (0 = none)
		let slot = u32( m - floor( m * 0.5 ) * 2.0 );
		let id = m - floor( m / 1024.0 ) * 1024.0 + 1.0;
		let k = i * 6u + slot * 3u;
		breakersCrestW[ k ] = vec4f( root, b );
		breakersCrestW[ k + 1u ] = vec4f( back, H );
		breakersCrestW[ k + 2u ] = vec4f( dir, trough, id );
${r?`		breakersEmit( i, slot, root, dir, b, H, trough, c, m, depth, shoreBore( A, depth ) );`:``}
	}
}

@compute @workgroup_size( WG_X, WG_Y, WG_Z )
fn main( @builtin( global_invocation_id ) gid: vec3u ) {
	let i = gid.x;
	if ( i >= ${t}u ) { return; }
	let st = breakersStations[ i ];
	let o = st.xy;
	let n = st.zw; // toward the sea
	let base = i * 6u;
	// clear both slots
	breakersCrestW[ base + 2u ] = vec4f( 0.0 );
	breakersCrestW[ base + 5u ] = vec4f( 0.0 );

	var sPrev = 0.0;
	for ( var k = 0; k < 64; k++ ) {
		let dist = f32( k ) * ${nu(2)};
		let s = shorePhaseAt( o + n * dist ).s;
		// s grows seaward: a crest (integer phase) lies between this sample and the previous one
		if ( k > 0 && floor( s ) > floor( sPrev ) ) {
			let m = floor( s );
			// secant refinement on the exact phase
			var lo = dist - ${nu(2)};
			var hi = dist;
			var sLo = sPrev;
			var sHi = s;
			var x = lo + ( m - sLo ) / max( sHi - sLo, 1e-5 ) * ${nu(2)};
			for ( var it = 0; it < 2; it++ ) {
				let sx = shorePhaseAt( o + n * x ).s;
				if ( sx < m ) {
					lo = x;
					sLo = sx;
				} else {
					hi = x;
					sHi = sx;
				}
				x = lo + ( m - sLo ) / max( sHi - sLo, 1e-5 ) * ( hi - lo );
			}
			let pc = o + n * x;
			breakersProcessCrest( i, pc, m );
		}
		sPrev = s;
	}
}
`;this.kernel=new C({label:`Surf Crests`,modules:[Re,this.shore.module,e.terrain&&e.terrain.module,n.module,r&&r.module].filter(Boolean),bindings:{breakersP:{uniform:this.uniforms},breakersStations:{storage:this.stations,access:`read`},breakersCrestW:{storage:this.crest,access:`read_write`}},workgroupSize:[64,1,1],code:o})}_emitCode(){return`
struct BrkCtx {
	root: vec3f,
	d3: vec3f,
	tg: vec3f,
	Yi: f32,
	Wt: f32,
	wB: f32,
	trough: f32,
	xr: f32,
	Xi: f32,
	q: f32,
};

struct BrkPN { p: vec3f, n: vec3f };

// A point on the front of the wave, on the water surface (the same curve as ShoreWaves' profile:
// concave tube face while plunging, convex roller front of the bore), and its outward normal.
// s: 0 = crest top .. 1 = foot. Everything the breaker throws starts just outside it.
fn breakersFacePoint( C: BrkCtx, sp: f32 ) -> BrkPN {
	let up = vec3f( 0.0, 1.0, 0.0 );
	let th = sp * ${nu(Math.PI/2)};
	let ct = cos( th );
	let st = sin( th );
	let fx = mix( 1.0 - ct, st, C.wB );
	let fy = mix( 1.0 - st, ct, C.wB );
	let n = normalize( C.d3 * ( C.Yi * mix( ct, st, C.wB ) ) + up * ( C.Wt * mix( st, ct, C.wB ) + 0.02 ) );
	let p = C.root + C.d3 * ( C.Wt * fx );
	return BrkPN( vec3f( p.x, C.trough + C.Yi * fy, p.z ), n );
}

// the plunge point: in the trough ahead of the face while the tube is open; once the bore front
// has formed over it, on the lower part of that front
fn breakersPlunge( C: BrkCtx, r: f32, r2: f32 ) -> BrkPN {
	let f = breakersFacePoint( C, r2 * 0.45 + 0.55 );
	let t = C.root + C.d3 * ( C.xr + ( r - 0.5 ) * 0.5 );
	let inTrough = vec3f( t.x, C.trough + 0.03, t.z );
	let open = C.xr > C.Wt + 0.1;
	return BrkPN( select( f.p + f.n * 0.04, inTrough, open ), select( f.n, vec3f( 0.0, 1.0, 0.0 ), open ) );
}

// the leading edge of the falling lip
fn breakersTipAt( C: BrkCtx, r: f32 ) -> vec3f {
	return C.root + C.d3 * ( C.Xi * C.q * ( r * 0.12 + 0.88 ) ) - vec3f( 0.0, 1.0, 0.0 ) * ( C.Yi * C.q * C.q );
}

fn breakersAlong( C: BrkCtx, r: f32 ) -> vec3f {
	return C.tg * ( ( r - 0.5 ) * ${nu(this.spacing*1.15)} );
}

fn breakersCount( rate: f32, gain: f32, seed: u32, salt: u32 ) -> u32 {
	return u32( floor( rate * gain + sprayRand( seed, salt ) ) );
}

fn breakersEmit( i: u32, slot: u32, root: vec3f, dir: vec2f, b: f32, H: f32, trough: f32, c: f32, m: f32, depth: f32, bore: vec4f ) {
	let camFade = smoothstep( breakersP.emitRange, breakersP.emitRange * 0.35, length( root - breakersP.cameraPos ) );
	let gain = breakersP.spray * camFade * frame.dt;
	// the many sub-pixel drops and ligaments take the ring budget; the few, visible spray and mist
	// sprites always get their full rate
	let gainD = gain * breakersP.budget;
	let d3 = vec3f( dir.x, 0.0, dir.y );
	let tg = vec3f( - dir.y, 0.0, dir.x );
	let up = vec3f( 0.0, 1.0, 0.0 );
	let Hc = clamp( H, 0.15, 3.0 );
	// (the energy released goes as H^2.5, but what reads on screen saturates: bigger breakers make
	// bigger, longer-lived structures, not ever more particles)
	let E = pow( Hc, 1.7 );
	let Hb = max( bore.x, 0.0 );
	let Eb = pow( min( Hb, 2.0 ) / 0.6, 1.7 );
	let Wt = bore.y;
	let q = clamp( b / 0.9, 0.0, 1.0 );
	let Xi = H * 0.8;
	let Yi = max( root.y - trough, 0.05 );
	let seed = i * 7919u + u32( m - floor( m / 64.0 ) * 64.0 ) * 31u;
	// integer part: which crest made the particle (its wave shadow, see sprayShadow); fraction: random
	let tag = f32( i * 2u + slot + 1u );
	let offshore = max( - dot( frame.windDir, dir ), 0.0 ) * frame.windSpeed;
	let wB = bore.w;
	let xr = Xi - bore.z; // horizontal distance from the crest top
	let C = BrkCtx( root, d3, tg, Yi, Wt, wB, trough, xr, Xi, q );

	// ---- stages of the breaker (weights 0..1)
	let lipShed = smoothstep( 0.5, 0.75, b ) * ( 1.0 - smoothstep( 0.86, 0.93, b ) );
	// the splash-up is a fast burst (~0.15-0.2 s) as the lip hits the trough; its mist lingers
	let impact = smoothstep( 0.87, 0.92, b ) * ( 1.0 - smoothstep( 1.0, 1.14, b ) );
	let haze = smoothstep( 0.9, 1.0, b ) * ( 1.0 - smoothstep( 1.2, 1.5, b ) );
	let spit = smoothstep( 0.98, 1.08, b ) * ( 1.0 - smoothstep( 1.15, 1.3, b ) );
	let roller = smoothstep( 1.05, 1.3, b ) * smoothstep( 0.06, 0.25, Hb );
	let clash = roller * smoothstep( 0.1, 0.2, depth ) * smoothstep( 0.7, 0.35, depth );
	let drift = smoothstep( 9.0, 15.0, offshore ) * smoothstep( -0.4, 0.1, b ) * ( 1.0 - smoothstep( 0.75, 0.9, b ) );

	// ---- drops and ligaments (ballistic)
	let n0 = breakersCount( lipShed * 9.0 * E, gainD, seed, 1u ); // drops off the lip
	let n1 = n0 + breakersCount( lipShed * 5.0 * E, gainD, seed, 2u ); // ligaments off the lip
	let n2 = n1 + breakersCount( impact * 240.0 * E, gainD, seed, 3u ); // splash-up drops
	let n3 = n2 + breakersCount( impact * 90.0 * E, gainD, seed, 4u ); // splash-up ligaments (torn strands)
	let n4 = n3 + breakersCount( roller * 45.0 * Eb, gainD, seed, 5u ); // roller front (breaks up its silhouette)
	let n5 = n4 + breakersCount( clash * 40.0 * Eb, gainD, seed, 6u ); // bore / backwash collision
	let n6 = n5 + breakersCount( drift * 24.0 * Hc, gainD, seed, 7u ); // spindrift
	if ( n6 > 0u ) {
		let base = sprayReserve( n6 );
		for ( var j = 0u; j < n6; j++ ) {
			let ring = spraySlot( base, j );
			let h = seed + j * 13u;
			let r0 = sprayRand( h, 11u );
			let r1 = sprayRand( h, 12u );
			let r2 = sprayRand( h, 13u );
			let r3 = sprayRand( h, 14u );
			let r4 = sprayRand( h, 15u );
			let isLip = j < n1;
			let isImp = j < n3;
			let isRol = j < n4;
			let isCl = j < n5;
			let lig = ( j >= n0 && j < n1 ) || ( j >= n2 && j < n3 );
			// lip: moving with the jet (thrown forward a little faster than the wave, falling)
			let vLip = d3 * ( c * ( r2 * 0.2 + 1.05 ) ) - up * ( q * sqrt( Yi * ${nu(2*v)} ) * ( r3 * 0.3 + 0.7 ) ) + tg * ( ( r4 - 0.5 ) * 0.6 );
			// splash-up: most drops stay low, some reach ~1.3 H; thrown up and forward, out of the surface
			let pl = breakersPlunge( C, r1, r2 );
			let vUp = sqrt( Hc * ( r3 * r3 * 1.0 + 0.3 ) * ${nu(2*v)} );
			let vImp = up * vUp + pl.n * ( r4 * 1.5 ) + d3 * ( c * ( r2 * 0.6 + 0.15 ) - 0.3 ) + tg * ( ( r4 - 0.5 ) * 2.0 );
			// roller: tossed forward and up by the tumbling front (from its upper part)
			let fr = breakersFacePoint( C, r1 * r1 * 0.7 ); // mostly from the tumbling top
			let vRol = d3 * ( c * ( r2 * 0.3 + 0.95 ) ) + up * ( ( r3 * 1.6 + 0.6 ) * sqrt( Hb / 0.5 ) ) + fr.n * 0.5 + tg * ( ( r4 - 0.5 ) * 1.2 );
			// bore running into the backwash: thrown straight up from its front
			let fc = breakersFacePoint( C, r1 * 0.5 + 0.3 );
			let vCl = up * ( ( r3 * 1.6 + 0.8 ) * sqrt( Hb / 0.4 ) ) + d3 * ( r2 * 2.0 - 0.6 ) + tg * ( ( r4 - 0.5 ) * 1.5 );
			// spindrift: fine drops blown back over the crest
			let vDr = d3 * ( - ( offshore * ( r2 * 0.3 + 0.35 ) ) ) + up * ( r3 * 1.5 + 0.8 ) + tg * ( ( r4 - 0.5 ) * 0.5 );
			let p = select( select( select( select( root + up * 0.04, fc.p + fc.n * 0.03, isCl ), fr.p + fr.n * 0.03, isRol ), pl.p, isImp ), breakersTipAt( C, r1 ), isLip ) + breakersAlong( C, r0 );
			let v = select( select( select( select( vDr, vCl, isCl ), vRol, isRol ), vImp, isImp ), vLip, isLip );
			// radius (m): drops of a few mm (smaller off the roller, finest in the spindrift), ligaments ~1-2 cm
			// heavy-tailed drop sizes (many fine drops, a few big ones): r = r0 (1 - u)^-0.7
			let tail = pow( 1.0 - r4 * 0.98, -0.7 );
			let rDrop = min( select( select( select( 0.0005, 0.001, isLip ), 0.0008, isRol ), 0.001, isImp || isCl ) * tail, 0.012 );
			let rLig = 0.005 + r4 * r4 * select( 0.008, 0.016, isImp );
			let kind = select( SPRAY_DROPLET, SPRAY_LIGAMENT, lig );
			sprayWrite( ring, p, v, select( rDrop, rLig, lig ), kind, 2.5, tag + r0 * 0.999 );
		}
	}

	// ---- dense spray (clouds of drops: the white of the splash-up), a puff out of the barrel
	let c0 = breakersCount( impact * 110.0 * E, gain, seed, 21u );
	let c1 = c0 + breakersCount( spit * 10.0 * E, gain, seed, 22u );
	let c2 = c1 + breakersCount( roller * 0.6 * Eb, gain, seed, 23u ); // (rare: a row of them reads as cotton puffs)
	let c3 = c2 + breakersCount( clash * 2.0 * Eb, gain, seed, 24u );
	if ( c3 > 0u ) {
		let base = sprayReserve( c3 );
		for ( var j = 0u; j < c3; j++ ) {
			let ring = spraySlot( base, j );
			let h = seed + j * 29u;
			let r0 = sprayRand( h, 41u );
			let r1 = sprayRand( h, 42u );
			let r2 = sprayRand( h, 43u );
			let r3 = sprayRand( h, 44u );
			let isImp = j < c0;
			let isSpit = j < c1;
			let isRol = j < c2;
			// torn sheets of the splash-up (half-width): many small ones, a few big
			// (heavy-tailed: many small torn sheets, a few big ones; never a row of equal puffs)
			let sz = select( select( select( 0.05 + r2 * r2 * 0.08, sqrt( Hb / 0.5 ) * ( r2 * r2 * 0.06 + 0.03 ), isRol ), sqrt( Hc ) * ( r2 * r2 * 0.14 + 0.05 ), isSpit ), sqrt( Hc ) * ( r2 * r2 * r2 * 0.18 + 0.05 ), isImp );
			// splash-up: sheets thrown up and forward out of the plunge line, rising up to ~1.3 H and
			// falling back as curtains
			let pl = breakersPlunge( C, r1, r3 );
			let pImp = pl.p + pl.n * ( sz * 0.4 ) + up * ( r2 * Hc * 0.1 );
			let vImp = up * sqrt( Hc * ( r3 * r3 * 0.95 + 0.35 ) * ${nu(2*v)} ) + pl.n * 0.8 + d3 * ( c * ( r2 * 0.5 + 0.2 ) ) + tg * ( ( r1 - 0.5 ) * 1.2 );
			// the puff blown out of the collapsing barrel: out of the middle of the front, along the crest
			let fs = breakersFacePoint( C, r1 * 0.3 + 0.35 );
			let pSpit = fs.p + fs.n * ( sz * 0.5 );
			let vSpit = d3 * ( c * 0.7 ) + fs.n * 1.2 + tg * ( ( r1 - 0.5 ) * 4.0 );
			// the tumbling top of the roller
			let fr = breakersFacePoint( C, r1 * 0.4 );
			let pRol = fr.p + fr.n * ( sz * 0.4 );
			let vRol = d3 * ( c * 0.85 ) + up * ( r3 * 0.5 + 0.3 );
			let fc = breakersFacePoint( C, r1 * 0.5 + 0.3 );
			let pCl = fc.p + fc.n * ( sz * 0.5 );
			let vCl = up * ( ( r3 * 1.2 + 0.8 ) * sqrt( Hb / 0.4 ) ) + d3 * ( r2 - 0.3 );
			let p = select( select( select( pCl, pRol, isRol ), pSpit, isSpit ), pImp, isImp ) + breakersAlong( C, r0 );
			let v = select( select( select( vCl, vRol, isRol ), vSpit, isSpit ), vImp, isImp );
			let life = select( select( r3 * 0.3 + 0.5, 0.9, isSpit ), r3 * 0.5 + 1.0, isImp );
			sprayWrite( ring, p, v, sz, SPRAY_SPRAY, life, tag + r0 * 0.999 );
		}
	}

	// ---- mist: the fine spray that drifts off with the wind (and the air pushed by the wave)
	// (few, large, faint sprites: mist is the biggest overdraw of the spray)
	let m0 = breakersCount( haze * 5.0 * E + spit * 3.0 * E, gain, seed, 31u );
	// the lip feathers as it throws: a thin wisp torn off the crest and carried by the air (with the
	// wind; the drag toward the air velocity turns it back over the crest in an offshore wind)
	let mL = breakersCount( lipShed * 1.6 * E, gain, seed, 33u );
	// the churning top of the bore smokes: a thin haze drifting off it softens its silhouette (a bore
	// front isn't a hard white edge), some of it lingering as it drifts up the beach
	let m1 = m0 + breakersCount( roller * 4.5 * Eb, gain, seed, 32u );
	if ( mL > 0u ) {
		let base = sprayReserve( mL );
		for ( var j = 0u; j < mL; j++ ) {
			let ring = spraySlot( base, j );
			let h = seed + j * 23u;
			let r0 = sprayRand( h, 61u );
			let r1 = sprayRand( h, 62u );
			let r2 = sprayRand( h, 63u );
			let p = breakersTipAt( C, r1 * 0.4 ) + up * ( r2 * 0.1 ) + breakersAlong( C, r0 );
			let v = d3 * ( c * ( r1 * 0.2 + 0.85 ) ) + up * ( r2 * 0.8 + 0.3 );
			sprayWrite( ring, p, v, ( r2 * r2 * 0.2 + 0.1 ) * sqrt( Hc ), SPRAY_MIST, r1 * 0.8 + 0.7, tag + r0 * 0.999 );
		}
	}
	if ( m1 > 0u ) {
		let base = sprayReserve( m1 );
		for ( var j = 0u; j < m1; j++ ) {
			let ring = spraySlot( base, j );
			let h = seed + j * 17u;
			let r0 = sprayRand( h, 51u );
			let r1 = sprayRand( h, 52u );
			let r2 = sprayRand( h, 53u );
			let r3 = sprayRand( h, 54u );
			let isImp = j < m0;
			let pl = breakersPlunge( C, r1, r3 );
			let ft = breakersFacePoint( C, r1 * 0.3 );
			let p = select( ft.p + ft.n * 0.15 + up * ( r2 * r2 * Hb * 0.35 ), pl.p + pl.n * 0.2 + up * ( r2 * Hc * 0.4 ), isImp ) + breakersAlong( C, r0 );
			let v = select( d3 * ( c * ( r1 * 0.3 + 0.65 ) ) + up * ( r2 * 0.4 + 0.15 ), d3 * ( c * ( r1 * 0.3 + 0.4 ) ) + up * ( r3 * 0.9 + 0.4 ), isImp );
			let size = select( ( r3 * r3 * 0.35 + 0.18 ) * sqrt( max( Hb, 0.2 ) / 0.6 ), sqrt( Hc ) * ( r3 * 0.3 + 0.45 ), isImp );
			let life = select( r3 * r3 * 3.0 + 1.2, r3 * 1.5 + 2.5, isImp );
			sprayWrite( ring, p, v, size, SPRAY_MIST, life, tag + r0 * 0.999 );
		}
	}
}
`}_buildMesh(){let e=this.NS-1,t=e*2,r=new Float32Array(t*40*4),i=new Float32Array(t*40*3),a=new Uint32Array(t*19*6),o=0,s=0;for(let t=0;t<e;t++)for(let e=0;e<2;e++){let n=(t*2+e)*40;for(let n=0;n<2;n++)for(let i=0;i<tu;i++)r[o++]=t,r[o++]=e,r[o++]=n,r[o++]=i;for(let e=0;e<19;e++){let t=n+e,r=n+e+1,i=n+tu+e,o=n+tu+e+1;a[s++]=t,a[s++]=i,a[s++]=r,a[s++]=r,a[s++]=i,a[s++]=o}}let c=new Be;c.setAttribute(`position`,new De(i,3)),c.setAttribute(`sheetId`,new De(r,4)),c.setIndex(new De(a,1)),c.boundingSphere=new b(new n,1e7);let l=this.spacing,u=ql(),d=new g({name:`breakersLip`,deps:[Re,ru,this.sky&&this.sky.module,this.clouds&&this.clouds.module],code:`
const BRK_LACE_TILE: f32 = ${nu(Gl)};
const BRK_NV: f32 = ${nu(tu)};
`}),f=new $e({name:`BreakerLip`,lit:!1,transparent:!0,depthWrite:!1,depthTest:!0,side:`double`,blending:`premultiplied`,modules:[d],uniforms:{sheet:[`f32`,1]},textures:{brkLace:u},storage:{breakersCrest:this.crest},attributes:{sheetId:`vec4f`},varyings:{vLipN:`vec3f`,vLip:`vec4f`,vLipFade:`f32`},vertex:`
	let id = v.sheetId;
	let seg = u32( id.x );
	let slot = u32( id.y );
	let side = u32( id.z );
	let k = id.w;
	let st = seg + side;
	let ot = seg + ( 1u - side );
	let e = st * 6u + slot * 3u;
	let eo = ot * 6u + slot * 3u;
	let c0 = breakersCrest[ e ];
	let c1 = breakersCrest[ e + 1u ];
	let c2 = breakersCrest[ e + 2u ];
	let mOther = breakersCrest[ eo + 2u ].w;
	let bOther = breakersCrest[ eo ].w;
	// (the crests are followed until the bore reaches the shore; the sheet is gone after the plunge)
	// (port: both ends of a segment must pass the b test, else a vertex pair collapses to one side only
	// and the quad between them draws as a long sliver down to y = -1e5 where b jumps between stations)
	let valid = c2.w > 0.5 && abs( mOther - c2.w ) < 0.5 && c0.w < 1.25 && bOther < 1.25;

	let root = c0.xyz;
	let b = c0.w;
	let back = c1.xyz;
	let H = c1.w;
	let d3 = vec3f( c2.x, 0.0, c2.y );
	let trough = c2.z;
	let q = clamp( b / 0.9, 0.0, 1.35 );
	let Xi = max( H * 0.8, 0.05 );
	let Yi = max( root.y - trough, 0.05 );
	// profile parameter: k = 0, 1 on the back of the crest (-1, -0.45), then 0..1 along the curtain
	let pv = select( select( ( k - 2.0 ) / ( BRK_NV - 3.0 ), -0.45, k < 1.5 ), -1.0, k < 0.5 );
	let xl = Xi * q * max( pv, 0.0 );
	let fl = xl / Xi;
	let yl = - Yi * ( fl * fl ); // ballistic: the jet leaves the crest horizontally
	let onLip = root + d3 * xl + vec3f( 0.0, yl, 0.0 );
	let onCap = mix( root, back, max( - pv, 0.0 ) ) + vec3f( 0.0, 0.012, 0.0 );
	let P = select( onLip, onCap, pv < 0.0 );
	// outward normal of the curtain (upper surface of the lip)
	let slope = Yi * 2.0 * xl / ( Xi * Xi );
	o.vLipN = normalize( vec3f( 0.0, 1.0, 0.0 ) + d3 * slope );
	o.vLip = vec4f( pv, b, f32( st ) * ${nu(l)}, Xi * q + Yi * q * q ); // w: curtain length (m)
	// the cap fades in over the crest; the whole lip fades out once it has become whitewater
	let capA = smoothstep( -1.0, -0.1, pv );
	// once the jet has re-entered the water the curtain is gone (the splash and the roller take over)
	o.vLipFade = capA * smoothstep( 0.02, 0.12, q ) * ( 1.0 - smoothstep( 1.0, 1.2, b ) );
	v.useWorld = true;
	v.worldPos = select( vec3f( 0.0, -1e5, 0.0 ), P, valid );
	v.worldNormal = o.vLipN;
`,output:`
	let v = in.vs.vLip.x;
	let b = in.vs.vLip.y;
	let a = in.vs.vLip.z;
	let len = in.vs.vLip.w;
	let pos = in.P;
	let V = normalize( frame.cameraPos - pos );
	let Nw = normalize( in.vs.vLipN );
	let N0 = select( - Nw, Nw, in.front );
	let t = frame.time;
	// The water of the jet is stretched along the flow: streaks and ripples running down the
	// curtain (the lace pattern stretched ~8x along the jet and moving with it) in its surface
	// (normal, from the screen-space gradient of a small relief) and in its thickness
	let flowS = v * len - t * 1.1;
	// along-crest coordinate warped by low-frequency noise (three incommensurate scales, slope kept
	// below 1 so it never folds): the streak spacing drifts along the crest, no fixed period, and the
	// tiles of every pattern below never line up into a comb
	let aw = a + sin( a * 0.23 + 1.7 ) * 1.6 + sin( a * 0.61 + 4.2 ) * 0.4 + sin( a * 1.37 + 0.4 ) * 0.12;
	let sv = textureSample( brkLace, smpAnisoRepeat, vec2f( aw / 0.83, flowS / 3.0 ) );
	// and broad bands (sections of the lip thicker or thinner than others), visible from afar
	let sbv = textureSample( brkLace, smpAnisoRepeat, vec2f( aw / 2.9, flowS / 9.0 ) + vec2f( 0.37, 0.61 ) );
	let sb = sbv.z;
	let hS = sv.x * 0.02 + sv.z * 0.012;
	let dpx = dpdx( pos );
	let dpy = dpdy( pos );
	let r1 = cross( dpy, N0 );
	let r2 = cross( N0, dpx );
	let det = dot( dpx, r1 );
	let grad = ( r1 * dpdx( hS ) + r2 * dpdy( hS ) ) * sign( det );
	let N = normalize( N0 * abs( det ) - grad + N0 * 1e-9 );
	let NdV = max( dot( N, V ), 1e-3 );
	let F = breakersFresnel( NdV, 1.333 );
	let L = frame.sunDir;
	let sun = frame.sunColor * ${this.clouds?`cloudsShadow( pos.xz )`:`1.0`};

	// reflection: sky + sun glint
	let Rr = reflect( - V, N );
	let R = normalize( vec3f( Rr.x, max( Rr.y, 0.004 ), Rr.z ) );
	let refl = ${this.sky?`skyReflectionRadiance( R )`:`frame.horizonColor`};
	let Hh = normalize( L + V );
	let spec = sun * ( pow( max( dot( N, Hh ), 0.0 ), 180.0 ) * 12.0 ) * F;

	// light through the thin sheet: turquoise when backlit
	let tint = vec3f( 0.16, 0.62, 0.56 );
	let back = pow( sat( dot( - V, L ) * 0.5 + 0.5 ), 4.0 );
	// thick and deep green at the root, thin, bright and clear toward the tip, uneven along the streaks
	let thin = mix( 1.5, 0.7, v ) * ( sv.z * 0.3 + 0.8 ) * ( sb * 0.8 + 0.6 );
	let glow = ( sun * tint * ( back * 0.9 + 0.08 ) + frame.skyIrradiance * tint * 1.4 ) * thin;
	let aW = F + min( ( 1.0 - F ) * mix( 0.42, 0.16, v ) * ( sv.x * 0.5 + 0.75 ) * ( sb * 0.7 + 0.65 ), 0.85 );
	let cW = refl * F + spec + glow * ( 1.0 - F ) * 0.42;

	// The jet stays clear, glassy water while it is in the air: only its leading edge tears into
	// aerated fingers (filaments of the lace pattern stretched along the flow, merging into a
	// ragged white rim). Sections of the lip differ a little.
	let flowM = v * len - t * 1.1; // metres down the curtain, moving with the jet
	let fuv = vec2f( aw / 1.9 + 0.53, flowM / 1.8 );
	let fl = textureSample( brkLace, smpAnisoRepeat, fuv );
	let sect = fl.z; // slowly varying along the crest
	let vary = sect - 0.5 + sin( aw * 0.29 + b * 2.1 ) * 0.15;
	let reach = v + vary * 0.3;
	// slightly irregular leading edge (sections of the lip reach a little further than others)
	let tipN = sin( aw * 1.3 + t * 0.3 ) * 0.6 + sin( aw * 4.7 + 1.3 ) * 0.4;
	let edge = v + tipN * 0.03 + vary * 0.04;
	let thrown = smoothstep( 0.35, 0.8, b );
	// a thin, translucent aerated rim along the leading edge (it tears into the drops and
	// ligaments the spray system throws off it)
	let rim = smoothstep( 0.9, 0.96, edge ) * ( fl.z * 0.2 + 0.2 ) * thrown;
	// once the lip has landed the curtain is a falling mass of whitewater that dissolves (blotchy)
	// into the splash-up and the roller within a fraction of a second
	// (in streaks: white fingers run down the curtain ahead of the rest, so along a peeling crest the
	// broken section feathers into the clear one instead of ending on a vertical line)
	// (each finger its own length and brightness: the fine strands' per-cell random, gated and grouped
	// by the broad pattern so fingers cluster, merge and leave gaps instead of a regular row)
	let fing = ( sv.w * 0.55 + sv.z * 0.2 ) * ( smoothstep( 0.25, 0.75, sbv.w * 0.6 + sb * 0.4 ) * 0.8 + 0.2 ) * 0.34;
	let wh = smoothstep( ( 1.0 - v ) * 0.18 + 0.9 - fing, ( 1.0 - v ) * 0.18 + 1.0 - fing, b ); // from the tip up
	let lc = textureSample( brkLace, smpAnisoRepeat, vec2f( aw * 0.83 + 1.9, v * len - t * 1.3 ) / ( BRK_LACE_TILE * 0.8 ) );
	let blot = lc.z * 0.7 + lc.y * 0.3;
	let gone = smoothstep( 1.0, 1.25, b );
	let clumpW = smoothstep( gone - 0.12, gone + 0.12, blot );
	let clumps = sat( ( blot - gone ) * 2.5 ); // thicker inside the blotches
	// thin aerated filaments stretched down the curtain (foam of the previous wave drawn up the
	// face and thrown out with the lip), more of them toward the tip
	let fil = ( 1.0 - smoothstep( 0.02, 0.12, sv.x ) ) * smoothstep( 0.15, 0.8, v ) * ( sv.w * 0.5 + 0.25 ) * ( sb * 0.9 + 0.3 ) * thrown;
	let aer = mix( max( rim, fil ), 0.95, wh );
	// aerated water is a dense scatterer: bright from every side, glowing when backlit
	let foamLit = ( sun * ( max( dot( N, L ), 0.0 ) * 0.5 + 0.5 + back * 1.2 ) / PI + frame.skyIrradiance ) * 0.9;

	let tip = 1.0 - smoothstep( 0.93, 1.0, edge );
	let alpha = in.vs.vLipFade * tip * mat.sheet * mix( 1.0, clumpW, wh );
	let aF = aer * 0.92;
	let col = foamLit * mix( 1.0, clumps * 0.4 + 0.75, wh ) * aF + cW * ( 1.0 - aF );
	let aOut = ( aF + aW * ( 1.0 - aF ) ) * alpha;
	(*r).color = vec4f( col * alpha, aOut );
`});this.params.sheet=f.uniforms.sheet,this.material=f;let p=this.mesh=new Ee(c,f);p.frustumCulled=!1,p.castShadow=!1,p.receiveShadow=!1,p.renderOrder=10,p.layers.set(ce.TRANSPARENT),p.name=`BreakerLips`,p.staticVelocity=!0}};function au(e,{x0:t=-175,x1:n=195,spacing:r=.6}={}){let i=[];for(let r=t;r<=n;r+=.5){if(e.heightAt(r,12)>-.3)continue;let t=12,n=null;for(;t>-110;t-=.5)if(e.heightAt(r,t)>0){let i=t,a=t+.5;for(let t=0;t<16;t++){let t=(i+a)*.5;e.heightAt(r,t)>0?i=t:a=t}n=(i+a)*.5;break}n!==null&&i.push([r,n])}let a=[],o=[];for(let e=0;e<i.length;e++)o.length&&(Math.abs(i[e][1]-o[o.length-1][1])>3||i[e][0]-o[o.length-1][0]>1.01)&&(o.length>a.length&&(a=o),o=[]),o.push(i[e]);o.length>a.length&&(a=o);let s=a.map(e=>[e[0],e[1]]);for(let e=0;e<30;e++)s=s.map((e,t)=>t===0||t===s.length-1?e:[e[0],(s[t-1][1]+2*e[1]+s[t+1][1])*.25]);let c=[],l=0,u=0;for(let e=1;e<s.length;e++){let[t,n]=s[e-1],[i,a]=s[e],o=Math.hypot(i-t,a-n);for(;u<=l+o;){let e=(u-l)/o,s=t+(i-t)*e,d=n+(a-n)*e,f=(i-t)/o,p=(a-n)/o;c.push(s,d,-p,f),u+=r}l+=o}return{data:new Float32Array(c),count:c.length/4,spacing:r}}var ou=class{constructor(e=256){this.texture=su(e),this.size=e,this.uniforms=new l(`SeaDetailParams`,{offset:[`vec2f`,new p],gustAmount:[`f32`,1],slickAmount:[`f32`,1],streakAmount:[`f32`,.3]});let t=this.uniforms.fields;this.gustAmount=t.gustAmount,this.slickAmount=t.slickAmount,this.streakAmount=t.streakAmount,this.offset=t.offset,this.module=new g({name:`seaDetail`,deps:[Re],uniforms:this.uniforms,bindings:{seaDetailNoise:{texture:this.texture}},code:`
struct SeaDetailSample { rough: f32, gust: f32, slick: f32, streak: f32 };

// hardware bilinear, repeat-wrapped (the shared sampler: no binding of its own)
fn seaDetailLoad( uv: vec2f ) -> vec4f {
	return textureSampleLevel( seaDetailNoise, smpLinearRepeat, uv, 0.0 );
}

fn seaDetailSample( xz: vec2f ) -> SeaDetailSample {
	let p = xz - seaDetailParams.offset;

	// gusts: two octaves (~600 m and ~230 m features), the second slowly morphing
	let g1 = seaDetailLoad( p / 620.0 ).x;
	let g2 = seaDetailLoad( p / 230.0 + vec2f( frame.time * 0.0009, 0.37 ) ).y;
	let gustRaw = g1 * 0.62 + g2 * 0.38;
	let gust = sat( ( gustRaw - 0.5 ) * 2.4 * seaDetailParams.gustAmount + 0.5 );

	// wind-aligned frame, lightly domain-warped so bands meander
	let w = frame.windDir;
	let along = dot( xz, w );
	let across = dot( xz, vec2f( - w.y, w.x ) ) + ( g2 - 0.5 ) * 26.0;

	// slicks: long bands, strongest in light wind, torn apart by gusts
	let sl = seaDetailLoad( vec2f( along / 1100.0, across / 70.0 ) ).z;
	let calmWind = smoothstep( 13.0, 4.0, frame.windSpeed );
	let slick = smoothstep( 0.64, 0.76, sl ) * ( 1.0 - gust * 0.8 ) * calmWind * seaDetailParams.slickAmount;

	// windrows: thin foam lines ~10 m apart that come and go along their length
	let st = seaDetailLoad( vec2f( along / 380.0, across / 11.0 ) + vec2f( 0.13, 0.71 ) ).w;
	let breakUp = seaDetailLoad( vec2f( along / 140.0, across / 40.0 ) + vec2f( 0.51, 0.29 ) ).x;
	let freshWind = smoothstep( 6.0, 12.0, frame.windSpeed );
	let streak = smoothstep( 0.68, 0.82, st ) * smoothstep( 0.4, 0.62, breakUp ) * freshWind * seaDetailParams.streakAmount;

	// windrows show mostly as smooth lanes (surfactant and debris collect in the convergence lines
	// and damp the ripples), with only a trace of foam
	let rough = mix( 0.5, 1.5, gust ) * ( 1.0 - slick * 0.8 ) * ( 1.0 - streak / max( seaDetailParams.streakAmount, 1e-3 ) * 0.45 );
	return SeaDetailSample( rough, gust, slick, streak );
}
`})}update(e){let t=h.windDir.value,n=h.windSpeed.value*.7*e;this.offset.value.x+=t.x*n,this.offset.value.y+=t.y*n}};function su(e){let t=new Uint16Array(e*e*4),n=[{seed:11,freq:4,oct:4},{seed:23,freq:5,oct:4},{seed:37,freq:4,oct:3},{seed:53,freq:6,oct:3}];for(let r=0;r<4;r++){let{seed:i,freq:a,oct:o}=n[r],s=yn(i),c=[];for(let e=0;e<o;e++){let t=a<<e,n=new Float32Array(t*t*2);for(let e=0;e<t*t;e++){let t=s()*Math.PI*2;n[e*2]=Math.cos(t),n[e*2+1]=Math.sin(t)}c.push({n:t,g:n})}let l=1/0,u=-1/0,d=new Float32Array(e*e);for(let t=0;t<e;t++)for(let n=0;n<e;n++){let r=0,i=1,a=0;for(let s=0;s<o;s++){let{n:o,g:l}=c[s],u=n/e*o,d=t/e*o,f=Math.floor(u),p=Math.floor(d),m=u-f,h=d-p,g=(e,t,n,r)=>{let i=(t%o+o)%o*o+(e%o+o)%o;return l[i*2]*n+l[i*2+1]*r},_=m*m*m*(m*(m*6-15)+10),v=h*h*h*(h*(h*6-15)+10),y=g(f,p,m,h),b=g(f+1,p,m-1,h),x=g(f,p+1,m,h-1),S=g(f+1,p+1,m-1,h-1),C=y+(b-y)*_+(x+(S-x)*_-(y+(b-y)*_))*v;r+=C*i,a+=i,i*=.5}r/=a,d[t*e+n]=r,l=Math.min(l,r),u=Math.max(u,r)}for(let n=0;n<e*e;n++)t[n*4+r]=m((d[n]-l)/(u-l))}return new N({label:`seaDetailNoise`,width:e,height:e,format:`rgba16float`,data:t,usage:[`sample`,`copyDst`]})}var cu=class{constructor({fft:t,query:r=null,count:i=12e3,box:a=8}){this.fft=t,this.box=a;let o=new Oe(1,1),s=new He;s.index=o.index,s.setAttribute(`position`,o.getAttribute(`position`)),s.setAttribute(`uv`,o.getAttribute(`uv`)),s.instanceCount=i,this.flashBlock=new l(`SnowFlash`,{pos:[`vec3f`,new n],on:[`f32`,0],dir:[`vec3f`,new n(0,0,-1)],col:[`vec3f`,new n],cone:[`vec2f`,new p(.99,.82)]},{label:`snow flash`});let c=new g({name:`snowFlash`,uniforms:this.flashBlock,uniformName:`snowFlash`,code:`
// spot profile shared by the shading, the beam and the snow: hot centre, soft edge, faint spill
// (LocalLights spotProfile)
fn snowSpotProfile( cd: f32, cosInner: f32, cosOuter: f32 ) -> f32 {
	let m = smoothstep( cosOuter, cosInner, cd );
	return max( m * m, smoothstep( cosOuter - 0.55, cosOuter, cd ) * 0.05 );
}
`}),u=``;for(let e=0;e<Math.min(2,t.cascades??2);e++)u+=`\tsway += textureSampleLevel( oceanDisplacement, smpLinearRepeat, p.xz / ocean.sizes[ ${e} ].x, ${e}, 3.0 ).xyz * exp( depth * ( - TWO_PI / ocean.sizes[ ${e} ].x ) );\n`;let d=[t.module,c];r&&r.module&&d.push(r.module);let f=new $e({name:`MarineSnow`,lit:!1,modules:d,uniforms:{camPos:[`vec3f`,new n],snowOpacity:[`f32`,1],box:[`f32`,a]},varyings:{vFade:`f32`,vDepth:`f32`,vTorch:`vec3f`},vertex:`
	let id = f32( v.instance );
	let h = snowHash3( id * 0.7131 );
	let h2 = snowHash3( id * 1.3917 + 5.1 );
	let B = mat.box;
	// slow current + sinking, wrapped into the camera box
	let drift = vec3f( 0.05, - 0.012, 0.03 ) * frame.time + ( h2 - 0.5 ) * ( frame.time * 0.02 );
	let local = ( fract( h + drift / B - mat.camPos / B ) - 0.5 ) * B;
	var p = mat.camPos + local;
	// orbital sway from the passing swell (decays ~exp(-k z) with depth)
	let depth = max( frame.seaLevel - p.y, 0.0 );
	var sway = vec3f( 0.0 );
${u}	p += vec3f( sway.x, sway.y * 0.5, sway.z ) * 0.8;

	// camera-facing quad, 3-8 mm (a few flecks larger)
	let size = mix( 0.003, 0.008, h2.x * h2.x ) + select( 0.0, 0.008, h2.y > 0.98 );
	let pv0 = frame.view * vec4f( p, 1.0 );
	// fade in the box edges and right in front of the lens (by shrinking)
	let dist = length( local );
	var fade = smoothstep( B * 0.5, B * 0.3, dist ) * smoothstep( 0.08, 0.3, - pv0.z );
${r&&r.module?`	fade *= smoothstep( 0.0, 0.04, waterQueryHeightAtXZ( p.xz ) - p.y );
`:``}	// (view-space offset: along the camera's right / up axes in world space)
	let right = vec3f( frame.view[ 0 ][ 0 ], frame.view[ 1 ][ 0 ], frame.view[ 2 ][ 0 ] );
	let up = vec3f( frame.view[ 0 ][ 1 ], frame.view[ 1 ][ 1 ], frame.view[ 2 ][ 1 ] );
	let q = v.position.xy * size * fade;
	o.vFade = fade;
	o.vDepth = depth;
	// flashlight on the speck (per vertex): the backscatter sparkle of a diver's torch; the
	// view leg is attenuated by the underwater composite
	let tv = p - snowFlash.pos;
	let tr2 = max( dot( tv, tv ), 1e-4 );
	let tr = sqrt( tr2 );
	let tspot = snowSpotProfile( dot( tv / tr, snowFlash.dir ), snowFlash.cone.x, snowFlash.cone.y );
	let sigT = frame.waterAbsorption + frame.waterScattering;
	o.vTorch = snowFlash.col * exp( - sigT * tr ) * ( tspot / ( tr2 + 0.15 ) * snowFlash.on * 0.35 );
	// nearly still in the world: camera-only motion vectors (no previous position)
	v.useWorld = true;
	v.worldPos = p + right * q.x + up * q.y;
	v.worldNormal = - normalize( vec3f( frame.view[ 0 ][ 2 ], frame.view[ 1 ][ 2 ], frame.view[ 2 ][ 2 ] ) );
`,surface:`
	let r = length( in.uv - 0.5 ) * 2.0;
	if ( r > 1.0 || in.vs.vFade < 0.02 ) { discard; }
	// lit by the light that reaches this depth, slightly greenish-white (organic matter)
	let sigT = frame.waterAbsorption + frame.waterScattering;
	let light = ( frame.sunColor * 0.1 + frame.skyIrradiance * 1.2 ) * exp( - sigT * in.vs.vDepth );
	s.albedo = ( light + in.vs.vTorch ) * vec3f( 0.9, 1.0, 0.95 ) * mix( 1.3, 0.8, r ) * mat.snowOpacity;
	s.emissive = vec3f( 0.0 );
	s.alpha = 1.0;
`});f.modules.push(new g({name:`snowHash`,code:`
fn snowHash3( n: f32 ) -> vec3f { return fract( sin( vec3f( n, n + 17.13, n + 43.71 ) ) * vec3f( 43758.5453, 22578.1459, 19642.3490 ) ); }
`})),this.material=f,this.camPos=f.uniforms.camPos,this.opacity=f.uniforms.snowOpacity,this.mesh=new Ee(s,f),this.mesh.frustumCulled=!1,this.mesh.castShadow=!1,this.mesh.layers.set(ce.OPAQUE),this.mesh.visible=!1,e(()=>import(`./LocalLights-BPcaAqUW.js`).then(e=>{e.FLASH&&this.setFlash(e.FLASH)}),__vite__mapDeps([0,1,2,3,4]),import.meta.url).catch(()=>{})}setFlash(e){let t=this.flashBlock.fields;for(let n of[`on`,`pos`,`dir`,`col`,`cone`])e[n]&&`value`in e[n]&&(t[n]=e[n])}update(e,t){this.mesh.visible=t,t&&this.camPos.value.copy(e.position)}},lu=12,uu=8,du=e=>{let t=String(e);return t.includes(`.`)||t.includes(`e`)?t:t+`.0`},fu=class{constructor({terrain:e,clouds:t=null,csm:r=null,reversedDepth:i=!0,count:a=3e3,box:o=12}){this.terrain=e,this.csm=r,this.box=o,this.reversedDepth=i,this.uniforms=new l(`AirMotesParams`,{camPos:[`vec3f`,new n],intensity:[`f32`,1],drift:[`vec2f`,new p]},{label:`airMotes`}),this.camPos=this.uniforms.fields.camPos,this.drift=this.uniforms.fields.drift,this.intensity=this.uniforms.fields.intensity,this.windScale=.25;let s=!!(e&&e.module),c=!!(t&&t.module),u=new g({name:`airMotesParams`,uniforms:this.uniforms,uniformName:`air`,code:`
fn airHash3( n: f32 ) -> vec3f { return fract( sin( vec3f( n, n + 17.13, n + 43.71 ) ) * vec3f( 43758.5453, 22578.1459, 19642.3490 ) ); }
// Henyey-Greenstein phase (1/sr)
fn airPhaseHG( cosT: f32, g: f32 ) -> f32 { return ( ( 1.0 - g * g ) / ( 4.0 * PI ) ) / pow( max( 1.0 + g * g - cosT * 2.0 * g, 1e-4 ), 1.5 ); }
`}),d=du(o),f=new $e({name:`AirMotes`,modules:[u,s&&e.module,c&&(t.shadowModule||t.module)].filter(Boolean),lit:!1,transparent:!0,depthWrite:!0,depthTest:!0,side:`double`,blending:`premultiplied`,defines:{VELOCITY_OPAQUE:1},varyings:{vAirCol:`vec4f`,vAirUV:`vec2f`},vertex:`
	let id = f32( v.instance );
	let h = airHash3( id * 0.7131 + 0.37 );
	let h2 = airHash3( id * 1.3917 + 5.1 );
	let h3 = airHash3( id * 2.1733 + 11.7 );
	let isGnat = id < ${du(48)};
	let isSeed = id >= ${du(48)} && id < ${du(96)};
	let t = frame.time;
	let L = frame.sunDir;
	let Bx = ${d};

	// ---- where: wrapped around the camera. Gnats: a swarm home fixed in the world (no drift)
	let sid = floor( id / ${du(lu)} );
	let hs = airHash3( sid * 3.917 + 1.3 );
	let home = select( h.xz, hs.xz, isGnat );
	let drift = select( air.drift, vec2f( 0.0 ), isGnat );
	let local = ( fract( home + ( drift - air.camPos.xz ) / Bx ) - 0.5 ) * Bx;
	let xz0 = air.camPos.xz + local;
	let ht = ${s?`terrainHeightAt( xz0 )`:`-90.0`};
	let hA = ht - frame.seaLevel;

	// ---- motion: slow swirl (two octaves, random phases) + wind; gnats dart in loops
	let ph = h3 * 6.2832;
	let w1 = h2 * 0.5 + 0.35; // rad/s
	let w2 = h2.zxy * 1.4 + 1.5;
	let A1 = vec3f( 0.45, 0.22, 0.45 ) * select( 1.0, 1.6, isSeed );
	let A2 = vec3f( 0.07, 0.05, 0.07 );
	let a1 = w1 * t + ph; let a2 = w2 * t + ph.zxy;
	let swirl = sin( a1 ) * A1 + sin( a2 ) * A2;
	let swirlV = cos( a1 ) * ( A1 * w1 ) + cos( a2 ) * ( A2 * w2 );
	let gw = h2 * 2.2 + 1.8;
	let gA = vec3f( 0.3, 0.2, 0.3 ) * ( h3.x * 0.6 + 0.6 );
	let g1 = gw * t + ph; let g2 = gw.zxy * ( t * 1.7 ) + ph.yzx;
	let gnatOff = ( h - 0.5 ) * vec3f( 0.9, 0.6, 0.9 ) + sin( g1 ) * gA + sin( g2 ) * ( gA * 0.45 );
	let gnatV = cos( g1 ) * ( gA * gw ) + cos( g2 ) * ( gA * 0.45 * gw.zxy * 1.7 );
	let off = select( swirl, gnatOff, isGnat );
	let windV = vec3f( frame.windDir.x, 0.0, frame.windDir.y ) * ( frame.windSpeed * ${du(this.windScale)} );
	let vel = select( swirlV + windV, gnatV, isGnat );

	// height above the ground (or the sea): mostly low down, seeds and gnats in the first metres
	let ground = max( ht, frame.seaLevel + 0.25 );
	let yMote = pow( h.y, 1.8 ) * 6.5 + 0.2;
	let ySeed = h.y * 2.5 + 0.3;
	let yGnat = hs.y * 1.4 + 0.8;
	let y = ground + select( select( yMote, ySeed, isSeed ), yGnat, isGnat );
	let p = vec3f( xz0.x, y, xz0.y ) + off;

	// ---- how many live here: most over the beach and the plants, very few far out over the sea,
	// fewer at night; gnats only inland over the vegetation, in a few places (per world tile)
	let land = smoothstep( 0.3, 1.5, hA );
	let shore = smoothstep( -7.0, -2.0, hA );
	let day = 1.0 - frame.night * 0.75;
	let tile = floor( xz0 / Bx );
	let tileHash = fract( sin( dot( tile, vec2f( 12.9898, 78.233 ) ) + sid * 7.31 ) * 43758.5453 );
	let dMote = max( max( land * 0.85, shore ), 0.06 ) * day;
	let dSeed = land * day;
	let dGnat = smoothstep( 1.5, 4.0, hA ) * select( 0.0, 1.0, tileHash < 0.3 ) * ( 1.0 - frame.night );
	let density = select( select( dMote, dSeed, isSeed ), dGnat, isGnat );
	let keep = sat( ( density - select( h3.y, 0.5, isGnat ) ) * 8.0 );

	// ---- what: salt aerosol near the surf / over the sea, dust and pollen over the land
	let salt = smoothstep( 0.8, -0.5, hA );
	// (the size of what catches the eye in film: lint, pollen clumps, bits of plant, sea salt crystals)
	let rMote = mix( 0.00015, 0.0005, h2.x * h2.x ) * mix( 1.0, 0.6, salt ) * select( 1.0, 2.2, h2.y > 0.96 );
	let r = select( select( rMote, mix( 0.0025, 0.0045, h2.x ), isSeed ), mix( 0.0008, 0.0011, h2.x ), isGnat );

	// ---- lighting (per particle): forward-scattering phase, sun visibility at the particle
	let toCam = frame.cameraPos - p;
	let dist = max( length( toCam ), 0.05 );
	let Vd = toCam / dist;
	let cosT = - dot( Vd, L ); // 1 = looking toward the sun through the particle
	var vis = select( 1.0, sunShadowCascadeHard( p, 0 ), shadowParams.enabled > 0.5 );
${c?`	vis *= cloudsShadow( p.xz );`:``}
${s?`	vis *= terrainSunShadowAt( p );`:``}
	let sun = frame.sunColor * vis;
	// diffraction + refraction: a strong forward lobe with a narrow glint core, a weak broad part
	// (the broad part keeps sunlit motes faintly visible from the side against shade)
	let phDust = airPhaseHG( cosT, 0.93 ) * 0.22 + airPhaseHG( cosT, 0.7 ) * 0.43 + airPhaseHG( cosT, 0.15 ) * 0.35;
	let phSalt = airPhaseHG( cosT, 0.93 ) * 0.35 + airPhaseHG( cosT, 0.75 ) * 0.5 + airPhaseHG( cosT, 0.2 ) * 0.15;
	let phMote = mix( phDust, phSalt, salt );
	let albMote = mix( vec3f( 0.95, 0.85, 0.66 ), vec3f( 1.0 ), salt );
	let cMote = albMote * ( sun * phMote + frame.skyIrradiance * 0.2 );
	// seed tufts: white fluff, diffuse from any side plus a forward glow
	let cSeed = sun * ( airPhaseHG( cosT, 0.55 ) * 0.8 + 0.05 ) + frame.skyIrradiance * 0.35;
	// gnats: dark bodies (specks against the sky), wings that catch the light when backlit
	let cGnat = sun * ( airPhaseHG( cosT, 0.9 ) * 0.12 ) + frame.skyIrradiance * 0.02;
	let col = select( select( cMote, cSeed, isSeed ), cGnat, isGnat );

	// ---- footprint: at least ~1.2 px wide, opacity = the real particle's coverage of it
	let p11 = frame.proj[ 1 ][ 1 ];
	let pixel = dist * 2.0 / ( p11 * frame.resolution.y );
	let size = max( r, pixel * 1.2 );
	// (x VISIBILITY: in film these read larger than they are, defocused and bloomed)
	let rs = r / size;
	let cover = min( rs * rs * ${du(3.5*uu)}, 1.0 );
	// fades: box edges (before the wrap), right in front of the lens, near the water surface
	let edge = smoothstep( Bx * 0.5, Bx * 0.36, max( abs( p.x - air.camPos.x ), abs( p.z - air.camPos.z ) ) );
	let fade = edge * smoothstep( Bx * 0.5, Bx * 0.3, dist ) * smoothstep( 0.12, 0.5, dist ) * smoothstep( 0.25, 0.9, p.y - frame.seaLevel );
	let a = cover * fade * keep * air.intensity;

	// camera-facing quad
	let right = normalize( cross( vec3f( 0.0, 1.0, 0.0 ), Vd ) + vec3f( 1e-5, 0.0, 0.0 ) );
	let up = cross( Vd, right );
	let corner = v.position.xy; // plane is 2 x 2: half-width = size
	let world = p + right * ( corner.x * size ) + up * ( corner.y * size );

	o.vAirCol = vec4f( col, a );
	o.vAirUV = corner;
	// nothing to draw: collapse the quad off-screen
	v.useWorld = true;
	v.worldPos = select( vec3f( 0.0, -1e5, 0.0 ), world, a > 2e-4 );
	v.worldNormal = Vd;
	// own motion over the last frame (the template adds the camera's)
	v.prevWorldPos = v.worldPos - vel * frame.dt;
`,surface:`
	let uvq = in.vs.vAirUV;
	let g = exp( dot( uvq, uvq ) * -3.5 );
	let a = min( in.vs.vAirCol.w * g / 0.65, 1.0 );
	if ( g < 0.35 || a < 0.003 ) { discard; }
	s.albedo = in.vs.vAirCol.rgb * a;
	s.emissive = vec3f( 0.0 );
	s.alpha = a;
`,output:`r.color = vec4f( s.albedo, s.alpha );`}),m=new Oe(2,2);m.instanceCount=a,this.material=f,this.mesh=new Ee(m,f),this.mesh.name=`AirMotes`,this.mesh.frustumCulled=!1,this.mesh.castShadow=!1,this.mesh.receiveShadow=!1,this.mesh.renderOrder=21,this.mesh.layers.set(ce.TRANSPARENT)}update(e,t,n=0){let r=this.intensity.value>0&&t.position.y>n;if(this.mesh.visible=r,!r)return;this.camPos.value.copy(t.position);let i=h.windSpeed.value*this.windScale*e,a=this.drift.value;a.x=(a.x+h.windDir.value.x*i)%this.box,a.y=(a.y+h.windDir.value.y*i)%this.box}},pu={silverside:{name:`Hardhead silverside`,sci:`Atherinomorus stipes`,lw:[.0074,3.1],model:`silverside`,habitat:{shallows:1,pier:.6,bay:.2},kg:[.02,.08],price:3,fight:.05,stamina:1.5,time:`any`,rarity:.2},mullet:{name:`Striped mullet`,sci:`Mugil cephalus`,lw:[.0112,2.98],model:`mullet`,habitat:{shallows:1,pier:.4},kg:[.4,2.2],price:5,fight:.3,stamina:5,time:`day`,rarity:.8},needlefish:{name:`Houndfish`,sci:`Tylosurus crocodilus`,lw:[.0012,3.1],model:`needlefish`,habitat:{shallows:.7,bay:.5,pier:.3},kg:[.5,2.5],price:4,fight:.45,stamina:5,time:`day`,rarity:.5},sergeant:{name:`Sergeant major`,sci:`Abudefduf saxatilis`,lw:[.0234,3],model:`sergeant`,habitat:{pier:1,reef:.8},kg:[.1,.35],price:6,fight:.15,stamina:2.5,time:`day`,rarity:1},grunt:{name:`Bluestriped grunt`,sci:`Haemulon sciurus`,lw:[.0145,3.06],model:`grunt`,habitat:{pier:1,reef:.8,bay:.2},kg:[.3,1.2],price:7,fight:.25,stamina:4,time:`any`,rarity:1},yellowtail:{name:`Yellowtail snapper`,sci:`Ocyurus chrysurus`,lw:[.0137,2.98],model:`yellowtail`,habitat:{reef:1,pier:.4,bay:.4},kg:[.4,1.6],price:12,fight:.4,stamina:5,time:`dawnDusk`,rarity:.9},chromis:{name:`Blue chromis`,sci:`Chromis cyanea`,lw:[.0209,3],model:`chromis`,habitat:{reef:1},kg:[.03,.1],price:4,fight:.05,stamina:1.5,time:`day`,rarity:.4},tang:{name:`Blue tang`,sci:`Acanthurus coeruleus`,lw:[.0282,2.95],model:`tang`,habitat:{reef:1},kg:[.2,.6],price:8,fight:.2,stamina:3,time:`day`,rarity:.6},wrasse:{name:`Hogfish`,sci:`Lachnolaimus maximus`,lw:[.0151,3.07],model:`wrasse`,habitat:{reef:.8,bay:.3},kg:[.5,4],price:16,fight:.35,stamina:6,time:`day`,rarity:.35},parrot:{name:`Stoplight parrotfish`,sci:`Sparisoma viride`,lw:[.0151,3.06],model:`parrot`,habitat:{reef:1},kg:[.8,4],price:9,fight:.35,stamina:6,time:`day`,rarity:.5},angel:{name:`Queen angelfish`,sci:`Holacanthus ciliaris`,lw:[.0302,2.94],model:`angel`,habitat:{reef:1},kg:[.4,1.6],price:14,fight:.25,stamina:4,time:`day`,rarity:.3},jack:{name:`Crevalle jack`,sci:`Caranx hippos`,lw:[.02,2.93],model:`jack`,habitat:{shallows:.5,pier:.7,bay:.8},kg:[1,9],price:6,fight:.75,stamina:12,time:`dawnDusk`,rarity:.5},barracuda:{name:`Great barracuda`,sci:`Sphyraena barracuda`,lw:[.0051,3.08],model:`barracuda`,habitat:{reef:.5,bay:.8,deep:.5},kg:[2,16],price:5,fight:.7,stamina:11,time:`any`,rarity:.45},grouper:{name:`Nassau grouper`,sci:`Epinephelus striatus`,lw:[.0107,3.07],model:`grouper`,habitat:{reef:.6,deep:.6},kg:[3,14],price:15,fight:.6,stamina:12,time:`any`,rarity:.3},redSnapper:{name:`Red snapper`,sci:`Lutjanus campechanus`,lw:[.0137,2.98],model:`redSnapper`,habitat:{deep:1,bay:.2},kg:[1.5,9],price:18,fight:.5,stamina:9,time:`any`,rarity:.7},tuna:{name:`Blackfin tuna`,sci:`Thunnus atlanticus`,lw:[.0145,3],model:`tuna`,habitat:{deep:1},kg:[3,14],price:16,fight:.85,stamina:16,time:`dawnDusk`,rarity:.5},mahi:{name:`Mahi-mahi`,sci:`Coryphaena hippurus`,lw:[.0079,3],model:`mahi`,habitat:{deep:.8},kg:[4,18],price:14,fight:.8,stamina:15,time:`day`,rarity:.4},tarpon:{name:`Tarpon`,sci:`Megalops atlanticus`,lw:[.0077,3.02],model:`tarpon`,habitat:{pier:.35,bay:.5,shallows:.15},kg:[10,45],price:4,fight:1,stamina:24,time:`night`,rarity:.2}},mu=Object.keys(pu);function hu(e,t){let n=pu[e],r=(t-n.kg[0])/Math.max(n.kg[1]-n.kg[0],1e-6);return Math.max(1,Math.round(n.price*t*(1+.25*Math.max(0,r-.7)/.3)))}function gu(e,t){let[n,r]=pu[e].lw;return(Math.max(t,.001)*1e3/n)**(1/r)}function _u({depth:e,reefDist:t,pierDist:n}){let r={shallows:0,reef:0,pier:0,bay:0,deep:0};return e<.25?r:(r.shallows=Su(3.5,1,e),r.reef=Su(12,-6,t)*Su(.8,2.5,e),r.pier=Su(9,2,n)*Su(.6,2,e),r.bay=Su(1.5,4,e)*(1-Su(18,30,e)),r.deep=Su(16,28,e),r)}function vu(e,t){let n=Math.exp(-((t-6.5)**2)/2.5),r=Math.exp(-((t-18.5)**2)/2.5),i=+(t<5.5||t>19.5),a=t>7&&t<18?1:.35;switch(e){case`day`:return .25+.75*a*(1-i);case`dawnDusk`:return .3+.7*Math.max(n,r)+.1*a;case`night`:return .15+.85*Math.max(i,r*.8);default:return .8+.2*Math.max(n,r)}}function yu(e,t,n=Math.random){let r=0,i=[];for(let n of mu){let a=pu[n],o=0;for(let t in a.habitat)o+=a.habitat[t]*e[t];let s=o*a.rarity*vu(a.time,t);i.push(s),r+=s}if(r<1e-4)return null;let a=n()*r;for(let e=0;e<i.length;e++)if(a-=i[e],a<=0)return mu[e];return mu[mu.length-1]}function bu(e,t=Math.random){let[n,r]=pu[e].kg,i=t()**2.2;return n+(r-n)*i}function xu(e,t,n=Math.random){let r=0;for(let t in e)r+=e[t];if(r<.05)return 1/0;r=Math.max(r,.35);let i=8/(Math.min(r,1.6)*(t>6&&t<19?1:.8));return 2+-Math.log(1-n()*.98)*i*.6}function Su(e,t,n){let r=Math.min(1,Math.max(0,(n-e)/(t-e)));return r*r*(3-2*r)}var Cu=class{constructor({species:e,kg:t,lineKg:n=7,reelSpeed:r=1.1,distance:i=15,rng:a=Math.random}){let o=pu[e];this.species=e,this.kg=t,this.rng=a,this.reelSpeed=r,this.power=Math.min(2.2,(.25+.75*o.fight)*(t/Math.max(n*.5,.2))**.55),this.staminaMax=o.stamina*Math.max(t/o.kg[1],.15)**.35,this.stamina=1,this.distance=i,this.maxDistance=Math.max(60,i+40),this.tension=.3,this.surge=0,this.slack=0,this.time=0,this.band=[.3,.85],this.overload=0,this._nextSurge=1.2+a()*2,this._surgeT=0,this.state=`fighting`}update(e,t){if(this.state!==`fighting`)return this.state;this.time+=e;let n=1-this.stamina;this._nextSurge-=e,this._nextSurge<=0&&this._surgeT<=0&&(this._surgeT=.8+this.rng()*1.2*(1-n*.6),this._nextSurge=(2+this.rng()*3)*(1+n)),this._surgeT-=e;let r=+(this._surgeT>0);this.surge+=(r-this.surge)*(1-Math.exp(-e*6));let i=this.power*(.35+.65*this.surge)*(1-.65*n),a=t?.25+i*.95+.25:i*.72,o=t?2.2:3;this.tension+=(a-this.tension)*(1-Math.exp(-e*o)),t?this.distance-=this.reelSpeed*e*(1.15-.6*this.surge*(1-n)):this.distance+=i*1.4*e,this.distance=Math.max(0,this.distance);let s=this.tension>=this.band[0]&&this.tension<=this.band[1];return this.stamina=Math.max(0,this.stamina-e/this.staminaMax*(s?1:.3)),this.overload=this.tension>1?this.overload+e:Math.max(0,this.overload-e*2),this.overload>.45?this.state=`snapped`:(this.slack=this.tension<.12?this.slack+e:Math.max(0,this.slack-e*2),this.slack>4||this.distance>this.maxDistance?this.state=`escaped`:this.distance<1.2&&(this.state=`caught`)),this.state}},wu={line:{name:`Fishing line`,levels:[{cost:0,label:`8 lb mono`,lineKg:7},{cost:60,label:`15 lb mono`,lineKg:13},{cost:180,label:`30 lb braid`,lineKg:26},{cost:450,label:`60 lb braid`,lineKg:50}]},reel:{name:`Reel`,levels:[{cost:0,label:`Old spinning reel`,reelSpeed:1.1},{cost:90,label:`Smooth spinning reel`,reelSpeed:1.6},{cost:320,label:`Conventional reel`,reelSpeed:2.2}]},rod:{name:`Rod`,levels:[{cost:0,label:`Hand-me-down rod`,castM:22},{cost:75,label:`7 ft graphite rod`,castM:32},{cost:260,label:`9 ft surf rod`,castM:45}]},hold:{name:`Fish hold`,levels:[{cost:0,label:`Cooler`,holdKg:30},{cost:120,label:`Ice chest`,holdKg:70},{cost:400,label:`Insulated fish hold`,holdKg:160}]},fuel:{name:`Fuel tank`,levels:[{cost:0,label:`40 L tank`,fuelL:40},{cost:150,label:`80 L tank`,fuelL:80},{cost:380,label:`150 L tank`,fuelL:150}]},engine:{name:`Engine`,levels:[{cost:0,label:`Tired diesel`,speedMul:1},{cost:300,label:`Rebuilt diesel`,speedMul:1.15},{cost:700,label:`Turbo diesel`,speedMul:1.3}]},fishFinder:{name:`Fish finder`,levels:[{cost:0,label:`None`,finder:!1},{cost:250,label:`Fish finder (depth and fish on the HUD)`,finder:!0}]},lights:{name:`Boat lights`,levels:[{cost:0,label:`Nav lights only`,deckLights:!1},{cost:140,label:`Deck floodlights for night fishing`,deckLights:!0}]}},Tu=1.5;function Eu(e){return .0025+.024*e*e}function Du(e,t){let n=wu[t].levels,r=(e[t]|0)+1;return r<n.length?{index:r,...n[r]}:null}function Ou(){let e={};for(let t in wu)e[t]=0;return e}function ku(e){let t={};for(let n in wu){let r=wu[n].levels,i=Math.max(0,Math.min(r.length-1,e[n]|0));for(let[e,n]of Object.entries(r[i]))e!==`cost`&&e!==`label`&&(t[e]=n)}return t}var Au=`tidewater.save.v1`,ju=class{constructor(e=Mu()){this.storage=e,this.money=0,this.inventory=[],this.log={},this.lastCatch=null,this.upgrades=Ou(),this.fuel=null,this._nextId=1,this.listeners=new Set}get stats(){return ku(this.upgrades)}get holdKg(){let e=0;for(let t of this.inventory)e+=t.kg;return e}get holdValue(){let e=0;for(let t of this.inventory)e+=t.value;return e}fits(e){return this.holdKg+e<=this.stats.holdKg+1e-6}addFish(e,t,n=12){t=Math.round(t*100)/100;let r=Math.round(gu(e,t)),i=this.log[e]||(this.log[e]={count:0,bestKg:0}),a=i.count===0,o=i.bestKg,s=i.bestCm??(o>0?Math.round(gu(e,o)):0),c=!a&&t>o;i.count++,t>o&&(i.bestKg=t,i.bestCm=r);let l=hu(e,t),u=this.fits(t);if(this.lastCatch={species:e,kg:t,cm:r,value:l,newSpecies:a,record:c,prevBestKg:o,prevBestCm:s,kept:u},!u)return this.save(),this.emit(),null;let d={id:this._nextId++,species:e,kg:t,cm:r,value:l,caughtAt:n,record:c};return this.inventory.push(d),this.save(),this.emit(),d}sell(e=null){let t=[],n=[];for(let r of this.inventory)(e===null||e.includes(r.id)?n:t).push(r);let r=0;for(let e of n)r+=e.value;return this.inventory=t,this.money+=r,this.save(),this.emit(),{total:r,count:n.length}}release(e){this.inventory=this.inventory.filter(t=>t.id!==e),this.save(),this.emit()}spend(e){return e>this.money?!1:(this.money-=e,this.save(),this.emit(),!0)}buy(e){if(!wu[e])return null;let t=Du(this.upgrades,e);return!t||t.cost>this.money?null:(this.money-=t.cost,this.upgrades[e]=t.index,e===`fuel`&&(this.fuel=null),this.save(),this.emit(),t)}get fuelL(){return this.fuel===null?this.stats.fuelL:Math.min(this.fuel,this.stats.fuelL)}burn(e){return this.fuel=Math.max(0,this.fuelL-e),this.fuel}refuelCost(){return Math.ceil((this.stats.fuelL-this.fuelL)*Tu)}refuel(){let e=this.stats.fuelL-this.fuelL,t=Math.min(e,Math.floor(this.money/Tu));return t<=0?0:(this.money-=Math.ceil(t*Tu),this.fuel=this.fuelL+t,this.fuel>=this.stats.fuelL-.001&&(this.fuel=null),this.save(),this.emit(),t)}onChange(e){return this.listeners.add(e),()=>this.listeners.delete(e)}emit(){for(let e of this.listeners)e(this)}toJSON(){return{v:1,money:this.money,inventory:this.inventory,log:this.log,upgrades:this.upgrades,fuel:this.fuel,nextId:this._nextId}}fromJSON(e){if(!e||e.v!==1)return!1;this.money=Number.isFinite(e.money)?e.money:0,this.inventory=Array.isArray(e.inventory)?e.inventory.filter(e=>e&&pu[e.species]&&Number.isFinite(e.kg)):[];for(let e of this.inventory)Number.isFinite(e.cm)||(e.cm=Math.round(gu(e.species,e.kg)));this.log=e.log&&typeof e.log==`object`?e.log:{};for(let[e,t]of Object.entries(this.log))pu[e]&&t&&t.bestKg>0&&!Number.isFinite(t.bestCm)&&(t.bestCm=Math.round(gu(e,t.bestKg)));return this.upgrades={...Ou(),...e.upgrades||{}},this.fuel=Number.isFinite(e.fuel)?e.fuel:null,this._nextId=Math.max(e.nextId|0,...this.inventory.map(e=>e.id+1),1),!0}save(){if(this.storage)try{this.storage.setItem(Au,JSON.stringify(this.toJSON()))}catch{}}load(){if(!this.storage)return!1;try{let e=this.storage.getItem(Au);return e?this.fromJSON(JSON.parse(e)):!1}catch{return!1}}reset(){this.money=0,this.inventory=[],this.log={},this.upgrades=Ou(),this.fuel=null,this.save(),this.emit()}};function Mu(){try{return typeof localStorage<`u`?localStorage:null}catch{return null}}var Nu={plain:0,wood:1,cloth:2,skin:3,cork:4,rusty:5,woodX:6,woodZ:7,carbon:8,thread:9,eva:10,braid:11,machined:12,knurl:13,rubber:14},Pu=new g({name:`gameProps`,deps:[Re],code:`
fn gpHash( p: vec3f ) -> f32 { return fract( sin( dot( p, vec3f( 127.1, 311.7, 74.7 ) ) ) * 43758.5453 ); }
fn gpNoise( p: vec3f ) -> f32 {
	let i = floor( p ); let f = fract( p ); let u = f * f * ( 3.0 - 2.0 * f );
	let a = mix( mix( gpHash( i ), gpHash( i + vec3f( 1, 0, 0 ) ), u.x ), mix( gpHash( i + vec3f( 0, 1, 0 ) ), gpHash( i + vec3f( 1, 1, 0 ) ), u.x ), u.y );
	let b = mix( mix( gpHash( i + vec3f( 0, 0, 1 ) ), gpHash( i + vec3f( 1, 0, 1 ) ), u.x ), mix( gpHash( i + vec3f( 0, 1, 1 ) ), gpHash( i + vec3f( 1, 1, 1 ) ), u.x ), u.y );
	return mix( a, b, u.z );
}
fn gpFbm( p: vec3f ) -> f32 { return gpNoise( p ) * 0.55 + gpNoise( p * 2.13 + 7.1 ) * 0.3 + gpNoise( p * 4.7 + 3.3 ) * 0.15; }
fn gpBump( P: vec3f, N: vec3f, height: f32 ) -> vec3f {
	let dPdx = dpdx( P ); let dPdy = dpdy( P );
	let r1 = cross( dPdy, N ); let r2 = cross( N, dPdx );
	let det = dot( dPdx, r1 );
	let grad = sign( det ) * ( dpdx( height ) * r1 + dpdy( height ) * r2 );
	return normalize( abs( det ) * N - grad + N * 1e-12 );
}
`});function Fu(e=`gameProp`,t={}){let n=E({vertexColors:!0,modules:[Pu],attributes:{aux:`vec4f`},varyings:{vAux:`vec4f`,vLocal:`vec3f`},uniforms:t.uniforms||{},vertex:`
	o.vAux = v.aux;
	o.vLocal = v.position;
`+(t.vertex||``)});return n.name=e,t.clearcoat&&n.setDefine(`CLEARCOAT`,1),n.surface=`
	let base = in.color.rgb;
	var rough = in.vs.vAux.x;
	let metal = in.vs.vAux.y;
	let pat = in.vs.vAux.z;
	let P = in.P;
	let lp = in.vs.vLocal;
	var col = base;
	var h = 0.0;
	if ( ( pat > 0.5 && pat < 1.5 ) || pat > 5.5 ) {
		// weathered, sun-bleached timber: grain along the board (local y, x or z), silvery on top,
		// dark in the cracks, grime low down
		var q = lp.xzy;
		if ( pat > 6.5 ) { q = lp.xyz; } else if ( pat > 5.5 ) { q = lp.yzx; }
		let grain = gpFbm( vec3f( q.x * 40.0, q.y * 40.0, q.z * 1.6 ) );
		let rings = sin( ( q.x * 23.0 + q.y * 17.0 + grain * 6.0 ) * 3.0 ) * 0.5 + 0.5;
		let blotch = gpFbm( P * 1.3 );
		col = base * mix( 0.72, 1.12, grain ) * mix( 0.9, 1.05, rings );
		col = mix( col, vec3f( dot( col, vec3f( 0.33 ) ) * 1.05 ), 0.35 * smoothstep( 0.2, 0.9, in.N.y ) );
		col *= mix( 1.0, 0.72, smoothstep( 0.55, 0.8, blotch ) );
		col *= mix( 0.75, 1.0, smoothstep( 0.0, 0.6, P.y - frame.seaLevel ) );
		let crack = smoothstep( 0.62, 0.7, gpNoise( vec3f( q.x * 90.0, q.y * 90.0, q.z * 3.0 ) ) );
		col *= 1.0 - crack * 0.5;
		h = grain * 0.0015 - crack * 0.0012;
		rough = clamp( rough + ( grain - 0.5 ) * 0.1, 0.6, 1.0 );
	} else if ( pat > 1.5 && pat < 2.5 ) {
		// canvas / cotton: weave, fading and grime
		let weave = sin( lp.x * 900.0 ) * sin( lp.y * 900.0 + lp.z * 900.0 ) * ( 1.0 - smoothstep( 0.002, 0.006, fwidth( lp.x + lp.y ) ) );
		let fade = gpFbm( P * 2.5 );
		col = base * mix( 0.8, 1.08, fade ) * ( 1.0 + weave * 0.04 );
		h = weave * 0.0003 + fade * 0.002;
	} else if ( pat > 2.5 && pat < 3.5 ) {
		// weathered skin: blotchy, a little ruddy
		let b = gpFbm( lp * 22.0 );
		col = base * mix( 0.85, 1.1, b ) * vec3f( 1.0, mix( 0.94, 1.0, b ), mix( 0.92, 1.0, b ) );
		rough = 0.55;
		h = b * 0.0008;
	} else if ( pat > 3.5 && pat < 4.5 ) {
		// cork grip: speckled
		let s = gpNoise( lp * 700.0 );
		col = base * mix( 0.7, 1.1, s );
		h = s * 0.0004;
	} else if ( pat > 4.5 && pat < 5.5 ) {
		// painted metal, rust at the edges and streaking down
		let r = smoothstep( 0.55, 0.75, gpFbm( P * vec3f( 3.0, 0.8, 3.0 ) ) );
		col = mix( base, vec3f( 0.23, 0.1, 0.04 ), r * 0.8 );
		rough = mix( rough, 0.85, r );
	} else if ( pat > 7.5 ) {
		// fishing tackle, in the part's local frame (+Y along the rod / reel axis)
		let ang = atan2( lp.x, lp.z );
		if ( pat < 8.5 ) {
			// carbon blank: fine woven / wrapped scrim under a glossy clear coat, faded out where the
			// weave is below a pixel
			let u = ang * 18.0; let w = lp.y * 700.0;
			let aa = 1.0 - smoothstep( 0.3, 1.2, fwidth( w ) );
			let weave = sin( u + w ) * sin( u - w );
			col = base * ( 1.0 + weave * 0.09 * aa ) * mix( 0.94, 1.04, gpNoise( vec3f( 0.0, lp.y * 3.0, 0.0 ) ) );
			h = weave * 0.00004 * aa;
			s.clearcoat = 1.0; s.clearcoatRoughness = 0.05;
		} else if ( pat < 9.5 ) {
			// nylon thread wraps sealed in epoxy: tight turns around the blank, a little uneven
			let w = lp.y * 3200.0;
			let aa = 1.0 - smoothstep( 0.3, 1.2, fwidth( w ) );
			let turns = sin( w + ang * 0.16 ) * aa;
			col = base * ( 1.0 + turns * 0.12 ) * mix( 0.92, 1.06, gpNoise( lp * 300.0 ) );
			h = turns * 0.00003;
			s.clearcoat = 1.0; s.clearcoatRoughness = 0.04;
		} else if ( pat < 10.5 ) {
			// EVA foam: closed-cell pores, darker and smoother where the hand holds it, grime
			let pore = smoothstep( 0.72, 0.9, gpNoise( lp * 2600.0 ) );
			let grime = gpFbm( lp * 60.0 );
			col = base * ( 1.0 - pore * 0.35 ) * mix( 0.85, 1.08, grime );
			rough = clamp( rough - grime * 0.12, 0.55, 1.0 );
			h = - pore * 0.0002;
		} else if ( pat < 11.5 ) {
			// braided line wound on the spool: fine crossing turns
			let w = lp.y * 1500.0; let u = ang * 60.0;
			let aa = 1.0 - smoothstep( 0.3, 1.2, fwidth( w ) );
			let b = sin( u + w ) * 0.5 + 0.5;
			col = base * mix( 0.8, 1.08, b * aa + 0.5 * ( 1.0 - aa ) );
			h = b * 0.00006 * aa;
		} else if ( pat < 12.5 ) {
			// machined / anodised metal: circumferential lathe marks, slightly uneven sheen
			let w = length( lp.xz ) * 5000.0 + lp.y * 800.0;
			let aa = 1.0 - smoothstep( 0.3, 1.2, fwidth( w ) );
			let m = sin( w ) * aa;
			col = base * ( 1.0 + m * 0.03 );
			rough = clamp( rough + m * 0.05 + ( gpNoise( lp * 150.0 ) - 0.5 ) * 0.06, 0.12, 0.9 );
		} else if ( pat < 13.5 ) {
			// knurled metal (lock nut): a diamond grip pattern in the relief
			let u = ang * 24.0; let w = lp.y * 900.0;
			let aa = 1.0 - smoothstep( 0.3, 1.2, fwidth( w ) );
			let k = abs( sin( u + w ) ) * abs( sin( u - w ) );
			col = base * ( 0.85 + k * 0.25 * aa );
			h = k * 0.00012 * aa;
		} else {
			// rubber: matte, a few scuffs
			let sc = gpFbm( lp * 250.0 );
			col = base * mix( 0.9, 1.15, sc );
			rough = clamp( rough + ( sc - 0.5 ) * 0.2, 0.6, 1.0 );
		}
	}
	s.albedo = col;
	s.roughness = rough;
	s.metalness = metal;
	if ( h != 0.0 ) { s.normal = gpBump( P, s.normal, h ); }
`,n}function Iu(e){let t=E({color:14212576,roughness:.35,side:`double`,uniforms:{lineA:[`vec3f`,new n],lineB:[`vec3f`,new n],lineCtl:[`vec3f`,new n],lineShow:[`f32`,0]},attributes:{aLine:`vec2f`},vertex:`
	let t = v.aLine.x;
	let side = v.aLine.y;
	let a = mat.lineA; let b = mat.lineB; let c = mat.lineCtl;
	let P = ( 1.0 - t ) * ( 1.0 - t ) * a + 2.0 * ( 1.0 - t ) * t * c + t * t * b;
	let T = normalize( 2.0 * ( 1.0 - t ) * ( c - a ) + 2.0 * t * ( b - c ) + vec3f( 1e-6, 0.0, 0.0 ) );
	let toCam = frame.cameraPos - P;
	let dist = length( toCam );
	let W = normalize( cross( T, toCam ) + vec3f( 0.0, 1e-6, 0.0 ) );
	// about a pixel wide at any distance (TAA resolves the sub-pixel coverage)
	let w = max( 0.0006, dist * 0.0006 ) * mat.lineShow;
	v.useWorld = true;
	v.worldPos = P + W * side * w;
	v.prevWorldPos = v.worldPos;
	v.worldNormal = normalize( toCam );
`});return t.name=`fishingLine`,t.receiveShadows=!0,t}var Lu=2.13,Ru=.535,zu=-.092,Bu=.327,Vu=.403,Hu=5.2,Uu=.8,Wu=48,Gu=9.81,Ku=[[.86,.0125,.068],[1.1,.0085,.046],[1.31,.0058,.031],[1.49,.0045,.023],[1.65,.004,.0195],[1.8,.0036,.0165],[1.93,.0034,.0145],[2.035,.0032,.0125]],qu=e=>f.lerp(.0074,.0011,f.clamp((e-Ru)/1.5949999999999998,0,1)**.85),Ju=e=>f.lerp(3.4,1.7,f.clamp(e,0,1));function Yu(e,t,n,r){let i=f.clamp((e-Ru)/1.5949999999999998,0,1),a=t*Lu*i**+n;return r.lat=a,r.drop=.5*a*a/(e-Ru+.06),r}var Xu={lat:0,drop:0},Zu=new x;new i;var Qu=new n,$u=new n,ed=new n,td=new n,nd=new n,rd=new n,id=new n(0,1,0),ad=new n,od={stowed:{elev:-.9,side:.35,hand:[.3,-.62,-.25]},idle:{elev:.46,side:.22,hand:[.15,-.05,-.45]},windup:{elev:2,side:.12,hand:[.22,-.08,-.2]},flick:{elev:.16,side:.14,hand:[.18,-.12,-.55]},follow:{elev:.24,side:.02,hand:[.17,-.1,-.56]},floating:{elev:.4,side:.18,hand:[.15,-.06,-.46]},fighting:{elev:.9,side:.12,hand:[.14,-.03,-.43]},landing:{elev:.85,side:.3,hand:[.16,-.08,-.46]}},sd=class{constructor({scene:e,camera:t,query:i,terrain:a,audio:o=null}){this.camera=t,this.query=i,this.terrain=a,this.audio=o,this.slot=i.allocate(`bobber`,1),this.state=`stowed`,this.equipped=!1,this.power=0,this.castM=22,this.reelSpeed=1.1,this.t=0,this.pose={elev:od.stowed.elev,side:od.stowed.side,hand:new n(...od.stowed.hand)},this.bend=0,this.bendDir=new n(0,0,-1),this.bobber=new n,this.bobberVel=new n,this.dip=0,this.waterY=0,this.depth=0,this.lineOut=0,this.slack=1,this.fishPos=new n,this._wander=0,this.onLand=null,this.tip=new n,this.bendVel=0,this.load=0,this.rotor=0,this.crank=0,this.spoolAng=0,this.spoolOsc=0,this.bail=0,this.bailTarget=0,this.crankRate=0,this.lineFill=1,this._lastOut=0;let s=e=>e.toFixed(4);this.rodMat=Fu(`fishingRod`,{clearcoat:!0,uniforms:{rodBend:[`vec4f`,new r],rodShape:[`vec4f`,new r(3,0,0,0)],reelAnim:[`vec4f`,new r],reelAnim2:[`vec4f`,new r(0,1,0,0)]},vertex:`
	{
		var P = v.position;
		var Nn = v.normal;
		let part = v.aux.w;
		let axisC = vec3f( 0.0, 0.0, ${s(zu)} );
		if ( part > 0.5 ) {
			if ( part < 2.5 ) {
				if ( part > 1.5 ) {
					// the bail flips back about the line through its two pivots
					let a = - mat.reelAnim.y * 1.95;
					let c = vec3f( 0.0, ${s(Vu)}, ${s(zu)} );
					let ca = cos( a ); let sa = sin( a );
					let q = P - c;
					P = c + vec3f( q.x, q.y * ca - q.z * sa, q.y * sa + q.z * ca );
					Nn = vec3f( Nn.x, Nn.y * ca - Nn.z * sa, Nn.y * sa + Nn.z * ca );
				}
				// rotor (and the bail on it) turn about the reel axis
				let a = mat.reelAnim.x;
				let ca = cos( a ); let sa = sin( a );
				let q = P - axisC;
				P = vec3f( q.x * ca + q.z * sa, P.y, - q.x * sa + q.z * ca ) + vec3f( 0.0, 0.0, axisC.z );
				Nn = vec3f( Nn.x * ca + Nn.z * sa, Nn.y, - Nn.x * sa + Nn.z * ca );
			} else if ( part < 3.5 ) {
				// crank handle about its shaft (along x)
				let a = mat.reelAnim.z;
				let c = vec3f( 0.0, ${s(Bu)}, ${s(zu)} );
				let ca = cos( a ); let sa = sin( a );
				let q = P - c;
				P = c + vec3f( q.x, q.y * ca - q.z * sa, q.y * sa + q.z * ca );
				Nn = vec3f( Nn.x, Nn.y * ca - Nn.z * sa, Nn.y * sa + Nn.z * ca );
			} else {
				// spool: in and out with the crank, turning back when the drag slips; the braid on it
				// shrinks as line goes out
				var q = P - axisC;
				if ( part > 4.5 ) {
					let r = length( q.xz );
					let r2 = mix( 0.0205, r, mat.reelAnim2.y );
					q = vec3f( q.x * r2 / max( r, 1e-5 ), q.y, q.z * r2 / max( r, 1e-5 ) );
				}
				let a = mat.reelAnim.w;
				let ca = cos( a ); let sa = sin( a );
				P = vec3f( q.x * ca + q.z * sa, P.y + mat.reelAnim2.x, - q.x * sa + q.z * ca ) + vec3f( 0.0, 0.0, axisC.z );
				Nn = vec3f( Nn.x * ca + Nn.z * sa, Nn.y, - Nn.x * sa + Nn.z * ca );
			}
		}
		// the blank bends toward the line (fast action: rodShape.x = exponent of the deflection)
		let span = ${s(1.5949999999999998)};
		let s = clamp( ( P.y - ${s(Ru)} ) / span, 0.0, 1.0 );
		let p = mat.rodShape.x;
		let lat = mat.rodBend.w * ${s(Lu)} * pow( s, p );
		let slope = mat.rodBend.w * ${s(Lu)} * p * pow( max( s, 1e-4 ), p - 1.0 ) / span;
		let drop = 0.5 * lat * lat / ( max( P.y - ${s(Ru)}, 0.0 ) + 0.06 );
		P = P + mat.rodBend.xyz * lat - vec3f( 0.0, drop, 0.0 );
		Nn = normalize( Nn - vec3f( 0.0, slope * dot( Nn, mat.rodBend.xyz ), 0.0 ) );
		v.position = P;
		v.normal = Nn;
	}
`}),this.rodMesh=new Ee(cd(),this.rodMat),this.rodMesh.name=`FishingRod`,this.rodMesh.frustumCulled=!1,this.rodMesh.castShadow=!1,this.rodMesh.matrixAutoUpdate=!1,this.rodMesh.visible=!1,this.bobberMat=Fu(`bobber`),this.bobberMesh=new Ee(ld(),this.bobberMat),this.bobberMesh.name=`Bobber`,this.bobberMesh.frustumCulled=!1,this.bobberMesh.castShadow=!1,this.bobberMesh.visible=!1,this.lineMat=Iu(Wu),this.lineMesh=new Ee(ud(Wu),this.lineMat),this.lineMesh.name=`FishingLine`,this.lineMesh.frustumCulled=!1,this.lineMesh.castShadow=!1,this.lineMesh.visible=!1,e.add(this.rodMesh,this.bobberMesh,this.lineMesh)}setGear({castM:e,reelSpeed:t}){this.castM=e,this.reelSpeed=t}equip(e){this.equipped=e,e&&this.state===`stowed`&&this.setState(`idle`),e&&this.audio&&this.audio.rodReady&&this.audio.rodReady(),e||this.setState(`stowed`)}setState(e){this.state=e,this.t=0}get lineInWater(){return this.state===`floating`||this.state===`fighting`||this.state===`retrieving`||this.state===`flying`||this.state===`landing`}startWindup(){return this.state===`idle`&&(this.setState(`windup`),this.power=0,!0)}release(){return this.state===`windup`&&(this.setState(`flick`),!0)}retrieve(){(this.state===`floating`||this.state===`flying`)&&this.setState(`retrieving`)}hook(){return this.state===`floating`&&(this.setState(`fighting`),this.fishPos.copy(this.bobber),!0)}land(){this.setState(`landing`),this._landFrom=this.bobber.clone()}endFight(){this.setState(this.lineOut>3?`retrieving`:`idle`)}update(e,{visible:t,fight:n=null}){this.t+=e;let r=this.camera,i=rd.copy(this.tip);this.state===`windup`&&(this.power=Math.min(1,this.power+e/1.1));let a=od[this.state]||od.idle;this.state===`flying`&&(a=od.follow),this.state===`retrieving`&&(a=od.floating),this.state===`flick`&&this.t<.06&&(a=od.windup);let o=this.state===`flick`?28:this.state===`windup`?7:5,s=1-Math.exp(-o*e),c=this.pose;c.elev+=(a.elev-c.elev)*s,c.side+=(a.side-c.side)*s,c.hand.x+=(a.hand[0]-c.hand.x)*s,c.hand.y+=(a.hand[1]-c.hand.y)*s,c.hand.z+=(a.hand[2]-c.hand.z)*s;let l=c.elev,u=c.side;this.state===`fighting`&&n&&(l+=-.35*n.surge+.12*Math.sin(this.t*2.3),u+=.12*Math.sin(this.t*1.1+n.surge*2)),l+=Math.sin(this.t*1.3)*.012+Math.sin(this.crank)*.006*Math.min(1,this.crankRate),u+=Math.sin(this.t*.9+1.7)*.01,td.set(0,0,-1).applyAxisAngle(ed.set(1,0,0),l).applyAxisAngle(id,u).normalize(),nd.set(0,1,0).addScaledVector(td,-td.y).normalize(),ed.crossVectors(td,nd).normalize(),Zu.makeBasis(ed,td,nd).setPosition(ad.copy(c.hand).addScaledVector(td,-.405)),r.updateMatrixWorld(),this.rodMesh.matrix.multiplyMatrices(r.matrixWorld,Zu),this.rodMesh.matrixWorldNeedsUpdate=!0,this.rodMesh.visible=t&&(this.equipped||c.elev>od.stowed.elev+.1);let d=0,f=.15;this.state===`fighting`&&n?(d=.06+.3*Math.min(n.tension,1.1)+.05*n.surge,f=Math.min(1,n.tension*1.1)):this.state===`retrieving`?d=.035:this.state===`windup`?d=.02+.03*this.power:this.state===`flick`?(d=this.t<.09?-.2*(.4+this.power):0,f=.55):this.state===`floating`?d=.012+this.dip*.07:this.state===`landing`&&(d=.14,f=.5),this.bendVel+=((d-this.bend)*250-this.bendVel*8)*e,this.bend+=this.bendVel*e,this.load+=(f-this.load)*(1-Math.exp(-e*6)),this.lineInWater&&this.state!==`flying`?(Qu.copy(this.bobber).applyMatrix4(Zu.copy(this.rodMesh.matrix).invert()).setY(0),Qu.lengthSq()>1e-6&&this.bendDir.lerp(Qu.normalize(),1-Math.exp(-e*10)).normalize()):this.bendDir.lerp($u.set(0,0,-1),1-Math.exp(-e*10)).normalize();let p=Ju(this.load);this.rodMat.uniforms.rodBend.value.set(this.bendDir.x,0,this.bendDir.z,this.bend),this.rodMat.uniforms.rodShape.value.set(p,0,0,0),Yu(Lu,this.bend,p,Xu),this.tip.set(this.bendDir.x*Xu.lat,Lu-Xu.drop,this.bendDir.z*Xu.lat).applyMatrix4(this.rodMesh.matrix),this.bailTarget=+(this.state===`windup`||this.state===`flick`||this.state===`flying`),this.bailTarget!==this._bailSnd&&(this._bailSnd!==void 0&&this.audio&&this.audio.bail&&this.audio.bail(this.bailTarget===1),this._bailSnd=this.bailTarget);let m=this.bailTarget>this.bail?6:16;this.bail+=Math.sign(this.bailTarget-this.bail)*Math.min(Math.abs(this.bailTarget-this.bail),m*e);let h=this.state===`fighting`&&n?n.distance:this.lineOut,g=this.lineInWater&&e>0?h-this._lastOut:0;this._lastOut=h;let _=0;(this.state===`fighting`||this.state===`retrieving`||this.state===`landing`)&&e>0&&(g<0?_=Math.min(1.6,-g/e/Uu):this.state===`fighting`&&(this.spoolAng-=Math.min(g,.5)/.023),this.state===`landing`&&(_=this.t<.5?1.2:0)),this.crankRate+=(_-this.crankRate)*(1-Math.exp(-e*10));let v=this.crankRate*Math.PI*2*e;if(this.crank+=v,this.rotor+=Math.min(v*Hu,3.1*Math.PI*2*e),this.spoolOsc=Math.sin(this.crank*.5)*.0035,this.lineFill=1-Math.min(1,this.lineOut/220)*.5,this.rodMat.uniforms.reelAnim.value.set(this.rotor,this.bail,this.crank,this.spoolAng),this.audio&&this.audio.rodLoop&&this.audio.rodLoop(this.crankRate,this.state===`fighting`&&g>0&&e>0?g/e:0,this.state===`fighting`&&n?n.tension:0),this.rodMat.uniforms.reelAnim2.value.set(this.spoolOsc,this.lineFill,0,0),this.state===`flick`&&this.t>.09){let e=7+13*this.power*(this.castM/22)**.5,t=r.getWorldDirection(Qu),n=Math.max(Math.hypot(t.x,t.z),.001),i=this.castM*(.35+.65*this.power),a=r.position.x+t.x/n*i-this.tip.x,o=r.position.z+t.z/n*i-this.tip.z,s=Math.max(Math.hypot(a,o),.001);t.set(a/s*n,Math.max(t.y,-.2)+.35,o/s*n).normalize(),this.bobber.copy(this.tip),this.bobberVel.copy(t).multiplyScalar(e),this.setState(`flying`),this.audio&&this.audio.whoosh&&this.audio.whoosh(this.power),this.audio&&this.audio.lineOut&&this.audio.lineOut(this.power)}if(this.query.setPoint(this.slot,this.bobber.x,this.bobber.z),this.query.cpuValid){let e=this.query.cpu[this.slot*4],t=this.query.cpu[this.slot*4+3];Number.isFinite(e)&&(this.waterY=e),Number.isFinite(t)&&(this.depth=Math.max(0,e-t))}let y=this.terrain.heightAt(this.bobber.x,this.bobber.z);if(this.state===`flying`){this.bobberVel.y-=Gu*e,this.bobberVel.multiplyScalar(Math.exp(-e*.25)),this.bobber.addScaledVector(this.bobberVel,e),Math.hypot(this.bobber.x-this.tip.x,this.bobber.z-this.tip.z)>this.castM&&(this.bobberVel.x*=.5,this.bobberVel.z*=.5);let t=Math.max(this.waterY,y);if(this.bobber.y<=t){this.bobber.y=t;let e=this.waterY>y+.05;this.setState(e?`floating`:`retrieving`),this.bobberVel.set(0,0,0),e&&this.audio&&this.audio.plop&&this.audio.plop(this.bobber),this.onLand&&this.onLand(e?`water`:`ground`)}}else if(this.state===`floating`){let t=Math.sin(this.t*2.1)*.008,n=this.waterY+.012+t-this.dip*.09;this.bobber.y+=(n-this.bobber.y)*(1-Math.exp(-e*12))}else if(this.state===`fighting`&&n){this._wander+=e*(.4+n.surge*1.5),Qu.copy(this.fishPos).sub(this.tip).setY(0);let t=Qu.length()||1;Qu.multiplyScalar(1/t);let r=ed.set(-Qu.z,0,Qu.x).multiplyScalar(Math.sin(this._wander)*.9*e*(1+n.surge)),i=Math.max(1,n.distance);this.fishPos.set(this.tip.x+Qu.x*i,0,this.tip.z+Qu.z*i).add(r),this.bobber.x+=(this.fishPos.x-this.bobber.x)*(1-Math.exp(-e*6)),this.bobber.z+=(this.fishPos.z-this.bobber.z)*(1-Math.exp(-e*6)),this.bobber.y+=(this.waterY-.05-.2*n.surge-this.bobber.y)*(1-Math.exp(-e*8))}else if(this.state===`landing`){let e=Math.min(1,this.t/.6),t=e*e*(3-2*e),n=r.getWorldDirection(ed).setY(0).normalize();Qu.copy(r.position).addScaledVector(n,1.25).add(ad.set(-n.z,0,n.x).multiplyScalar(.15)),Qu.y+=.12,this.bobber.lerpVectors(this._landFrom||this.bobber,Qu,t),this.bobber.y+=Math.sin(t*Math.PI)*.8}else if(this.state===`retrieving`){Qu.copy(this.tip).sub(this.bobber).setY(0);let t=Qu.length(),n=Math.min(t,(3+this.reelSpeed*3)*e);t>.001&&this.bobber.addScaledVector(Qu.multiplyScalar(1/t),n),this.bobber.y+=(Math.max(this.waterY+.02,y)-this.bobber.y)*(1-Math.exp(-e*10)),t<2.2&&this.setState(`idle`)}let b=this.lineInWater;this.lineOut=b?this.tip.distanceTo(this.bobber):0;let x=this.lineMat.uniforms;x.lineA.value.copy(this.tip),x.lineB.value.copy(this.bobber);let S=this.state===`fighting`?Math.min(1,(n?n.tension:0)*1.5):this.state===`retrieving`?.6:0,C=this.lineOut*(this.state===`flying`?.03:.07)*(1-S)+.02;x.lineCtl.value.copy(this.tip).lerp(this.bobber,.5).y-=C,this.state===`flying`&&x.lineCtl.value.addScaledVector(Qu.copy(this.tip).sub(i),-2),x.lineShow.value=1,this.lineMesh.visible=t&&b,this.bobberMesh.visible=t&&b&&this.state!==`landing`,this.bobberMesh.position.copy(this.bobber);let w=this.bobber.distanceTo(r.position);this.bobberMesh.scale.setScalar(Math.max(1,w/7)),this.bobberMesh.rotation.set(this.dip*.4,0,0)}};function cd(){let e=Lu,t=[],r=(e,t,n,r=0,i=0,a=0,o=1,s=o,c=o)=>P(e,t,n,r,i,a,o,s,c),i=(e,n)=>t.push(bt(e,n)),a=(e,t,r)=>new n(e,t,r),o={color:1382686,rough:.42,metal:.15,pattern:Nu.carbon},s={color:789776,rough:.35,metal:0,pattern:Nu.thread},c={color:9071146,rough:.3,metal:.4,pattern:Nu.thread},l={color:2763565,rough:.82,metal:0,pattern:Nu.eva},u={color:1381653,rough:.8,metal:0,pattern:Nu.rubber},d={color:2961460,rough:.32,metal:.85,pattern:Nu.machined},p={color:1842721,rough:.45,metal:.2,pattern:Nu.plain},m={color:3816770,rough:.35,metal:.9,pattern:Nu.knurl},h={color:2763823,rough:.25,metal:1,pattern:Nu.machined},g={color:5593438,rough:.12,metal:.3,pattern:Nu.plain},_={color:12041408,rough:.16,metal:1,pattern:Nu.machined},v={color:11046234,rough:.24,metal:1,pattern:Nu.machined},y={color:1118740,rough:.4,metal:.3,pattern:Nu.plain},b={color:8362586,rough:.7,metal:0,pattern:Nu.braid};i(yt([[0,0],[.012,.001],[.0152,.006],[.0156,.016],[.0149,.022]],24),u),i(yt([[.0147,.022],[.0151,.07],[.0152,.13],[.0144,.2],[.0131,.248]],24),l),i(yt([[.0128,.248],[.0128,.252],[.0098,.256]],20),v),i(F(.0086,.009,.074,16),{...o,matrix:r(0,.293,0)}),i(F(.0093,.0093,.006,16),{...c,matrix:r(0,.305,0)}),i(F(.0128,.0128,.024,24),{...m,matrix:r(0,.342,0)}),i(yt([[.0105,.354],[.0118,.358],[.0121,.372],[.0112,.38]],20),d),i(F(.0104,.0104,.056,20),{...p,matrix:r(0,.405,0)}),i(yt([[.0112,.43],[.0121,.438],[.0118,.448],[.0102,.452]],20),d),i(yt([[.0112,.452],[.0118,.462],[.0112,.5],[.0095,.53]],20),l),i(yt([[.0095,.53],[.0095,.533],[.0078,.536]],16),v);{let e=[];for(let t=0;t<=70;t++){let n=f.lerp(Ru,2.126,t/70);e.push([qu(n),n])}i(yt(e,12),o)}i(F(qu(.6)+4e-4,qu(.56)+4e-4,.05,12),{...s,matrix:r(0,.585,0)}),i(F(qu(.61)+6e-4,qu(.61)+6e-4,.003,12),{...c,matrix:r(0,.612,0)}),i(Ct(.0035,6e-4,5,14,Math.PI),{..._,matrix:r(0,.572,-qu(.572)-5e-4,0,Math.PI/2,Math.PI/2)}),i(F(qu(.572)+5e-4,qu(.572)+5e-4,.012,10),{...s,matrix:r(0,.572,0)});for(let e=0;e<Ku.length;e++){let[t,n,o]=Ku[e],l=qu(t),u=-o,d=n+Math.max(.0011,n*.16),f=Math.max(6e-4,n*.07);i(Ct(d,f*1.3,6,22),{...h,matrix:r(0,t,u,Math.PI/2,0,0)}),i(Ct(n+f*.6,f*.9,6,22),{...g,matrix:r(0,t,u,Math.PI/2,0,0)});let p=Math.max(.012,o*.55),m=t-p*.7;for(let e of[-1,1]){let r=a(e*d*.72,t-5e-4,u+d*.69);i($t(a(0,m,-l-8e-4),r,Math.max(7e-4,n*.09),5,Math.max(5e-4,n*.07)),h)}i(ot(.0035,p,.0012,5e-4,1),{...h,matrix:r(0,m,-l-6e-4)}),i(F(qu(m+p*.6)+7e-4,qu(m-p*.6)+7e-4,p*1.25,10),{...s,matrix:r(0,m,0)}),i(F(qu(m+p*.64)+85e-5,qu(m+p*.64)+85e-5,.0016,10),{...c,matrix:r(0,m+p*.64,0)})}i(F(.0014,.0016,.012,8),{...h,matrix:r(0,2.124,0)}),i(Ct(.0029,7e-4,6,16),{...h,matrix:r(0,e,-.004,Math.PI/2,0,0)}),i(Ct(.0023,5e-4,6,16),{...g,matrix:r(0,e,-.004,Math.PI/2,0,0)});{let t=[a(0,.425,-.07)];for(let[e,,n]of Ku)t.push(a(0,e,-n+5e-4));t.push(a(0,e,-.004));let n={color:10465406,rough:.6,metal:0};for(let e=0;e<t.length-1;e++)i($t(t[e],t[e+1],28e-5,3),n)}let x=zu;i(ot(.011,.062,.004,.0015,2),{...d,matrix:r(0,.405,-.0118)}),i(ot(.0072,.02,.08,.0032,3),{...d,matrix:r(0,.377,-.045,-.675,0,0)}),i(ot(.0082,.03,.012,.004,3),{...d,matrix:r(0,.352,-.072,-.35,0,0)}),i(yt([[0,.279],[.006,.28],[.0125,.286],[.0185,.298],[.0225,.314],[.0238,.33],[.0228,.342],[.0198,.35],[.018,.352]],32),{...d,matrix:r(0,0,x,0,0,0,.82,1,1)});for(let e of[-1,1])i(F(.0142,.0148,.0022,28),{...y,matrix:r(e*.0188,Bu,x,0,0,Math.PI/2)}),i(Ct(.0145,7e-4,6,32),{...v,matrix:r(e*.0197,Bu,x,0,Math.PI/2,0)});i(F(.0068,.0085,.011,18),{...d,matrix:r(-.025,Bu,x,0,0,Math.PI/2)}),i(F(.0045,.0045,.004,12),{...v,matrix:r(.021,Bu,x,0,0,Math.PI/2)}),i(yt([[.018,.348],[.0205,.353],[.0208,.357]],28),{...v,matrix:r(0,0,x)});let S={...y,anim:1};i(yt([[.006,.356],[.017,.358],[.0235,.362],[.0268,.37],[.0275,.381],[.0262,.386]],32),{...S,matrix:r(0,0,x)}),i(yt([[.0262,.386],[.0248,.3865]],32),{...v,anim:1,matrix:r(0,0,x)});for(let e of[-1,1])i(ot(.0065,.044,.013,.002,2),{...S,matrix:r(e*.0285,.382,x)}),i(ot(.003,.012,.008,.001,1),{..._,anim:2,matrix:r(e*.0322,Vu,x)});{let e=[];for(let t=0;t<=16;t++){let n=Math.PI*t/16;e.push(a(.0322*Math.cos(n),Vu+.006*Math.sin(n),x-.0322*Math.sin(n)))}i(ut(e,.0011,40,6),{..._,anim:2}),i(F(.0032,.0032,.006,12),{...v,anim:2,matrix:r(.0302,.4045,-.0955,Math.PI/2,0,0)})}let C=e=>({...e,anim:4,matrix:r(0,0,x)});i(yt([[.0282,.375],[.0288,.381],[.0285,.388],[.0252,.392],[.0238,.393]],36),C(v)),i(yt([[.0236,.3925],[.0238,.395],[.0238,.41],[.0236,.4125]],36),{...b,anim:5,matrix:r(0,0,x)}),i(yt([[.0205,.3922],[.0205,.4128]],24),C(v)),i(yt([[.0236,.4125],[.0262,.4135],[.0266,.4155],[.0235,.418],[.016,.4195],[.012,.42]],36),C(v)),i(yt([[.012,.42],[.0125,.422],[.0126,.431],[.0118,.434],[.009,.4355],[0,.436]],24),C({...y,pattern:Nu.knurl}));let w=(e,t)=>({...e,anim:3,matrix:t});return i(F(.0052,.0052,.008,12),w(d,r(-.0315,Bu,x,0,0,Math.PI/2))),i(ot(.0038,.058,.0075,.0018,2),w(v,r(-.036,.301,x))),i(F(.0026,.0026,.01,8),w(_,r(-.042,.275,x,0,0,Math.PI/2))),i(yt([[.003,0],[.0062,.0015],[.0071,.007],[.0068,.018],[.0048,.0225],[0,.0235]],16),w({...u,color:1908256},r(-.046,.275,x,0,0,Math.PI/2))),ft(t)}function ld(){let e=[];return e.push(bt(dt(.028,16,8,0,Math.PI*2,0,Math.PI/2),{color:13116956,rough:.35})),e.push(bt(dt(.028,16,8,0,Math.PI*2,Math.PI/2,Math.PI/2),{color:15657696,rough:.35})),e.push(bt(F(.004,.004,.07,6),{color:14275784,rough:.5,matrix:P(0,.055,0)})),e.push(bt(F(.0035,.0045,.03,6),{color:16765952,rough:.4,matrix:P(0,.1,0)})),ft(e)}function ud(e){let t=new Float32Array((e+1)*2*3),n=new Float32Array((e+1)*2*2),r=[];for(let t=0;t<=e;t++){for(let r=0;r<2;r++){let i=t*2+r;n[i*2]=t/e,n[i*2+1]=r?1:-1}if(t<e){let e=t*2;r.push(e,e+1,e+2,e+1,e+3,e+2)}}let i=new Be;return i.setAttribute(`position`,new Ve(t,3)),i.setAttribute(`aLine`,new Ve(n,2)),i.setIndex(r),i}var dd=class{constructor({name:e,kind:t=`buyer`,position:n,yaw:r=0,radius:i=2.6,greeting:a=``,idle:o=``,material:s=null,look:c={},character:l=null}){this.name=e,this.kind=t,this.greeting=a,this.idle=o,this.radius=i,this.position=n.clone(),this.yaw=r,this.group=new xe,this.group.name=`Vendor:`+e,this.group.position.copy(n),this.group.rotation.y=r,this.model=new xe,this.group.add(this.model),this.material=s||Fu(`vendor`),this.figure=new Ee(fd(c),this.material),this.figure.castShadow=!0,this.model.add(this.figure),this._t=Math.random()*10,this._yawOff=0,this.character=null,this.talking=!1,this._near=!1,l&&this.loadCharacter(l.url,l).catch(e=>console.warn(`Vendor: character failed to load`,e))}async loadCharacter(e,{idle:t=`idle_neutral_01`,talk:n=`gestic_talk_relaxed_01`,greet:r=`wave_01`,listen:i=null}={}){let a=await ae.create(await te(e));for(let e of a.materials)e.underwaterLighting=`lite`;this.clips={idle:t,talk:n,greet:r,listen:i},a.play(t,{fade:.01,from:Math.random()*a.clipDuration(t)}),a.update(0),a.onClipEnd=()=>a.play(this.talking?n:t,{fade:.5}),this.character=a,this.setModel(a.group)}setModel(e){this.model.clear(),this.model.add(e),this.figure=e}inRange(e){return Math.hypot(e.x-this.position.x,e.z-this.position.z)<this.radius&&Math.abs(e.y-this.position.y)<2.5}update(e,t=null){this._t+=e;let n=0;if(t){let e=t.x-this.position.x,r=t.z-this.position.z;e*e+r*r<64&&(n=Math.atan2(e,r)-this.yaw,n=Math.atan2(Math.sin(n),Math.cos(n)),n=Math.max(-1.1,Math.min(1.1,n)))}this._yawOff+=(n-this._yawOff)*(1-Math.exp(-e*2.5));let r=this.figure;if(this.character){let n=this.character,i=this.clips,a=t?(t.x-this.position.x)**2+(t.z-this.position.z)**2:1/0;if(a>3600){n.hold();return}let o=a<(this.radius+3)**2;if(o&&!this._near&&i.greet&&!this.talking&&n.play(i.greet,{fade:.35,loop:!1}),this._near=o,n.current!==i.greet){let e=this.talking?i.talk:i.idle;n.current!==e&&n.play(e,{fade:.6})}r.rotation.y=this._yawOff,n.update(e);return}r.rotation.y=this._yawOff+Math.sin(this._t*.37)*.05,r.rotation.z=Math.sin(this._t*.23)*.02,r.scale.y=1+Math.sin(this._t*1.6)*.006}};function fd(e={}){let t=[],r=(e,n)=>t.push(bt(e,n)),i={color:e.skin??10119754,rough:.55,pattern:Nu.skin},a={color:e.shirt??6126220,rough:.9,pattern:Nu.cloth},o={color:e.trousers??4147772,rough:.9,pattern:Nu.cloth},s={color:e.apron??14201418,rough:.45},c={color:15262416,rough:.5},l={color:e.hat??13215850,rough:.9,pattern:Nu.cloth},u={color:e.hair??12104358,rough:.9},d=(e,t,r)=>new n(e,t,r);for(let e of[-1,1])r(F(.075,.068,.36,10),{...c,matrix:P(e*.1,.18,.01)}),r(F(.068,.06,.08,10),{...c,matrix:P(e*.1,.04,.05,0,0,0,1,1,1.5)}),r(F(.085,.072,.48,10),{...o,matrix:P(e*.1,.6,0)});r(ot(.38,.52,.24,.08,3),{...a,matrix:P(0,1.1,-.01,.06)}),r(ot(.36,.14,.22,.06,2),{...o,matrix:P(0,.86,0)}),r(at(.34,.62,.012),{...s,matrix:P(0,.86,.125,.05)}),r(at(.24,.24,.012),{...s,matrix:P(0,1.2,.132,.08)});for(let e of[-1,1])r($t(d(e*.1,1.3,.13),d(e*.12,1.36,-.1),.012,4),s);for(let e of[-1,1])r($t(d(e*.22,1.3,0),d(e*.25,1.02,.05),.055,8,.05),a),r($t(d(e*.25,1.02,.05),d(e*.2,.92,.27),.045,8,.04),i),r(dt(.045,8,6),{...i,matrix:P(e*.19,.9,.31)});r(F(.055,.06,.1,10),{...i,matrix:P(0,1.41,.01)}),r(dt(.108,14,10),{...i,matrix:P(0,1.55,.02,0,0,0,1,1.12,1.02)}),r(dt(.02,6,5),{...i,matrix:P(0,1.54,.13,0,0,0,1,1.4,1)});for(let e of[-1,1])r(dt(.025,6,5),{...i,matrix:P(e*.105,1.55,0,0,0,0,.5,1,1)});r(dt(.112,12,8,0,Math.PI*2,Math.PI*.55,Math.PI*.3),{...u,matrix:P(0,1.55,.03)});for(let e of[-1,1])r(dt(.012,6,4),{color:1709330,rough:.2,matrix:P(e*.04,1.58,.115)});return r(F(.1,.115,.1,16),{...l,matrix:P(0,1.7,.01)}),r(F(.26,.25,.015,24),{...l,matrix:P(0,1.655,.01,-.05)}),r(F(.118,.118,.025,16),{color:7027242,rough:.8,matrix:P(0,1.67,.01)}),ft(t)}var pd={WALL:0,DECK:1,TIN:2,PAINTED:3,PROP:100,ICE:-1,SIGN:-2,CHALK:-3,PLAIN:-4,ROPE:-5,FLOAT:-6,DIAL:-7},md=[{name:`weathered_brown_planks`,size:1.8,grain:`u`},{name:`weathered_planks`,size:2,grain:`v`},{name:`worn_corrugated_iron`,size:1.8,grain:`v`},{name:`weathered_peeling_timber`,size:1.1,grain:`v`}],hd={joe:[0,0,1,.25],marta:[0,.25,.72,.5],prices:[0,.5,.5,1],dial:[.75,.5,1,1]},gd=16,_d=1.029,vd=.011,yd=`./models/props/`;async function bd(e){if(globalThis.__assetFile)return globalThis.__assetFile(e);let t=await fetch(e);if(!t.ok)throw Error(`StallKit: `+e+` `+t.status);return t.arrayBuffer()}async function xd(e){return fe(new Uint8Array(await bd(e)),e.endsWith(`.png`)?`image/png`:`image/jpeg`)}function Sd(e,t,n){let r=t[0].width,i=t[0].height,a=new Uint8Array(r*i*4*t.length);t.forEach((t,n)=>{if(t.width!==r||t.height!==i)throw Error(`StallKit: `+e+` layer `+n+` is `+t.width+`x`+t.height);a.set(t.data,r*i*4*n)});let o=new N({label:e,width:r,height:i,depth:t.length,dimension:`2d-array`,format:n?`rgba8unorm-srgb`:`rgba8unorm`,mips:!0,usage:[`sample`,`copyDst`],data:a});return o.getGPU(),w(o),o}var Cd=null;function wd(){return Cd||=Td()}async function Td(){let e=performance.now(),t=JSON.parse(new TextDecoder().decode(await bd(yd+`props.json`))),n=await bd(yd+`props.bin`),r=new Float32Array(n,0,t.vertexCount*t.vertexFloats),i=new Uint32Array(n,t.indexByteOffset,t.indexCount),a=(e,t)=>Promise.all([`a`,`n`,`r`].map(n=>Promise.all(e.map(e=>xd(yd+t+e+`_`+n+`.jpg`))))),[o,s,c]=await Promise.all([a(md.map(e=>e.name),`s_`),a(t.layers,`p_`),xd(yd+`signs.png`)]),l={info:t,verts:r,index:i,surf:{a:Sd(`stallSurfA`,o[0],!0),n:Sd(`stallSurfN`,o[1],!1),r:Sd(`stallSurfR`,o[2],!1)},prop:{a:Sd(`stallPropA`,s[0],!0),n:Sd(`stallPropN`,s[1],!1),r:Sd(`stallPropR`,s[2],!1)},signs:Sd(`stallSigns`,[c],!0)};return l.material=Dd(l),l.loadMs=performance.now()-e,l}var Ed=new g({name:`stallKit`,deps:[Re],code:`
fn skHash( p: vec3f ) -> f32 { return fract( sin( dot( p, vec3f( 127.1, 311.7, 74.7 ) ) ) * 43758.5453 ); }
fn skNoise( p: vec3f ) -> f32 {
	let i = floor( p ); let f = fract( p ); let u = f * f * ( 3.0 - 2.0 * f );
	let a = mix( mix( skHash( i ), skHash( i + vec3f( 1, 0, 0 ) ), u.x ), mix( skHash( i + vec3f( 0, 1, 0 ) ), skHash( i + vec3f( 1, 1, 0 ) ), u.x ), u.y );
	let b = mix( mix( skHash( i + vec3f( 0, 0, 1 ) ), skHash( i + vec3f( 1, 0, 1 ) ), u.x ), mix( skHash( i + vec3f( 0, 1, 1 ) ), skHash( i + vec3f( 1, 1, 1 ) ), u.x ), u.y );
	return mix( a, b, u.z );
}
fn skFbm( p: vec3f ) -> f32 { return skNoise( p ) * 0.55 + skNoise( p * 2.13 + 7.1 ) * 0.3 + skNoise( p * 4.7 + 3.3 ) * 0.15; }
// 2D cellular noise: ( distance to the nearest feature, to the second nearest )
fn skCells( p: vec2f ) -> vec2f {
	let i = floor( p ); let f = fract( p );
	var d1 = 8.0; var d2 = 8.0;
	for ( var y = -1; y <= 1; y++ ) {
		for ( var x = -1; x <= 1; x++ ) {
			let g = vec2f( f32( x ), f32( y ) );
			let h = vec2f( skHash( vec3f( i + g, 1.7 ) ), skHash( vec3f( i + g, 9.3 ) ) );
			let d = length( g + h - f );
			if ( d < d1 ) { d2 = d1; d1 = d; } else if ( d < d2 ) { d2 = d; }
		}
	}
	return vec2f( d1, d2 );
}
// perturbed normal from a scalar height (screen-space derivatives)
fn skBump( P: vec3f, N: vec3f, h: f32 ) -> vec3f {
	let dPdx = dpdx( P ); let dPdy = dpdy( P );
	let r1 = cross( dPdy, N ); let r2 = cross( N, dPdx );
	let det = dot( dPdx, r1 );
	let grad = sign( det ) * ( dpdx( h ) * r1 + dpdy( h ) * r2 );
	return normalize( abs( det ) * N - grad + N * 1e-12 );
}
`});function Dd(e){let t=E({vertexColors:!0,modules:[Ed],attributes:{aLayer:`f32`,aUV2:`vec2f`},varyings:{vLayer:`f32`,vUV2:`vec2f`},textures:{skSurfA:e.surf.a,skSurfN:e.surf.n,skSurfR:e.surf.r,skPropA:e.prop.a,skPropN:e.prop.n,skPropR:e.prop.r,skSigns:e.signs},vertex:`
	o.vLayer = v.aLayer;
	o.vUV2 = v.aUV2;
`});return t.name=`stall`,t.setDefine(`CLEARCOAT`,1),t.surface=`
	let L = round( in.vs.vLayer );
	let uv = in.uv;
	let uv2 = in.vs.vUV2;
	let P = in.P;
	let N0 = s.normal;
	// tangent frame from derivatives (uniform control flow): OpenGL normal maps, image v runs down
	let dp1 = dpdx( P ); let dp2 = dpdy( P ); let duv1 = dpdx( uv ); let duv2 = dpdy( uv );
	let dp2perp = cross( dp2, N0 ); let dp1perp = cross( N0, dp1 );
	let Tt = dp2perp * duv1.x + dp1perp * duv2.x;
	let Bt = dp2perp * duv1.y + dp1perp * duv2.y;
	let tInv = inverseSqrt( max( max( dot( Tt, Tt ), dot( Bt, Bt ) ), 1e-24 ) );
	let TBN = mat3x3f( Tt * tInv, - Bt * tInv, N0 );
	let g2x = dpdx( uv2 ); let g2y = dpdy( uv2 );
	let tint = in.color.rgb;
	var alb = tint;
	var rough = 0.8;
	var metal = 0.0;
	var ao = 1.0;
	var nrm = N0;
	if ( L > -0.5 ) {
		// scanned texture set: a prop (512 px) or a tiling surface (1K)
		var a: vec4f; var n: vec4f; var r: vec4f;
		if ( L > 99.5 ) {
			let li = i32( L - 100.0 );
			a = textureSampleGrad( skPropA, smpAnisoRepeat, uv, li, duv1, duv2 );
			n = textureSampleGrad( skPropN, smpAnisoRepeat, uv, li, duv1, duv2 );
			r = textureSampleGrad( skPropR, smpAnisoRepeat, uv, li, duv1, duv2 );
		} else {
			let li = i32( L );
			a = textureSampleGrad( skSurfA, smpAnisoRepeat, uv, li, duv1, duv2 );
			n = textureSampleGrad( skSurfN, smpAnisoRepeat, uv, li, duv1, duv2 );
			r = textureSampleGrad( skSurfR, smpAnisoRepeat, uv, li, duv1, duv2 );
		}
		// the corrugated sheets are corrugated in the geometry too: keep only a little of the ribs
		let strength = select( 1.0, 0.35, abs( L - 2.0 ) < 0.5 );
		var tn = n.xyz * 2.0 - 1.0;
		tn = vec3f( tn.xy * strength, max( tn.z, 0.05 ) );
		nrm = normalize( TBN * tn );
		alb = a.rgb * tint;
		ao = r.r; rough = r.g; metal = r.b;
		// the lantern's glass (prop layer 7: wooden_lantern_01_1): sooty panes that glow warm from dusk,
		// as the village lanterns do (the stall's local light switches on over the same range, App)
		if ( abs( L - 107.0 ) < 0.5 ) {
			let lum = dot( a.rgb, vec3f( 0.3, 0.55, 0.15 ) );
			let pane = smoothstep( 0.32, 0.16, lum ); // the dark panes, not the frame rims
			let nightOn = smoothstep( 0.15, 0.75, frame.night );
			let flicker = sin( frame.time * 9.0 + P.x * 40.0 ) * sin( frame.time * 5.3 + P.z * 13.0 ) * 0.12 + 0.9;
			// lit from inside: the flame shows through the soot, brighter in the middle of each pane
			// (the soot and smudges on the glass hold part of it back: a warm, uneven glow, not a light box)
			let soot = mix( 1.0, 0.35, smoothstep( 0.05, 0.22, lum ) );
			// the flame sits ~19 cm up in the middle: a hot core behind the glass, dim toward the frame
			let q = ( uv2 - vec2f( 0.0, 0.19 ) ) / vec2f( 0.05, 0.075 );
			let core = exp( - dot( q, q ) );
			let glow = vec3f( 1.0, 0.5, 0.18 ) * 0.35 + vec3f( 1.0, 0.72, 0.4 ) * 3.0 * core;
			s.emissive = glow * flicker * nightOn * pane * soot;
			// clean glass over the soot: glossy, a little lighter than the scan by day
			alb = mix( alb, alb * 1.6 + 0.02, pane );
			rough = mix( rough, 0.12, pane );
			metal = 0.0;
		}
		// sun-bleached and salty on the upward faces of the stall timber
		if ( L < 1.5 ) {
			let up = smoothstep( 0.3, 0.95, N0.y );
			let lum = dot( alb, vec3f( 0.3, 0.55, 0.15 ) );
			alb = mix( alb, vec3f( lum * 1.25 ), 0.28 * up + 0.12 );
			rough = clamp( rough + 0.06, 0.0, 1.0 );
		}
	} else if ( L > -1.5 ) {
		// crushed ice: packed chunks with glassy facets, clear meltwater in the gaps
		let c = skCells( P.xz * 34.0 + vec2f( P.y * 11.0 ) );
		let chunk = smoothstep( 0.0, 0.55, c.y - c.x );
		let frost = skFbm( P * 90.0 );
		let hgt = chunk * 0.004 + frost * 0.0008;
		nrm = skBump( P, N0, hgt );
		alb = mix( vec3f( 0.52, 0.62, 0.66 ), vec3f( 0.86, 0.92, 0.95 ), chunk * 0.8 + frost * 0.2 );
		rough = mix( 0.03, 0.28, frost * chunk );
		s.translucency = vec3f( 0.25, 0.32, 0.35 ) * chunk;
		s.clearcoat = 1.0; s.clearcoatRoughness = 0.02;
	} else if ( L > -3.5 || ( L > -7.5 && L < -6.5 ) ) {
		// painted: a sign on peeling timber, a chalkboard, or the scale's enamel dial
		let paint = textureSampleGrad( skSigns, smpLinearClamp, uv2, 0, g2x, g2y );
		if ( L > -2.5 ) {
			let a = textureSampleGrad( skSurfA, smpAnisoRepeat, uv, 3, duv1, duv2 );
			let n = textureSampleGrad( skSurfN, smpAnisoRepeat, uv, 3, duv1, duv2 );
			let r = textureSampleGrad( skSurfR, smpAnisoRepeat, uv, 3, duv1, duv2 );
			// the board was painted over: a dark ground coat, the lettering, both chipped and sun-faded
			// chipped through where the old timber shows (its own peeling paint pattern) and at random
			let wear = skFbm( vec3f( uv2 * vec2f( 90.0, 45.0 ), 3.1 ) );
			let chips = smoothstep( 0.64, 0.74, wear + ( 0.45 - dot( a.rgb, vec3f( 0.33 ) ) ) * 0.35 );
			let ground = mix( vec3f( 0.03, 0.062, 0.068 ) * mix( 0.8, 1.15, wear ), a.rgb * tint, chips );
			let letters = paint.a * ( 1.0 - chips * 0.8 ) * mix( 0.78, 1.0, skNoise( vec3f( uv2 * 400.0, 0.0 ) ) );
			alb = mix( ground, paint.rgb * 0.82, letters );
			rough = mix( r.g, 0.62, ( 1.0 - chips ) * 0.8 );
			ao = r.r;
			var tn = n.xyz * 2.0 - 1.0;
			nrm = normalize( TBN * vec3f( tn.xy * mix( 1.0, 0.45, 1.0 - chips ), tn.z ) );
		} else if ( L > -3.5 ) {
			// slate with smeared chalk dust, the prices in chalk
			let dust = skFbm( vec3f( uv2 * vec2f( 18.0, 9.0 ), 0.0 ) );
			let chalk = paint.a * mix( 0.55, 1.0, skNoise( vec3f( uv2 * 900.0, 1.0 ) ) );
			alb = mix( vec3f( 0.028, 0.034, 0.031 ) + dust * 0.035, vec3f( 0.72, 0.72, 0.68 ), chalk );
			rough = 0.9;
		} else {
			// enamel dial face, a little crazed and yellowed
			let crazing = skNoise( vec3f( uv2 * 900.0, 2.0 ) );
			alb = mix( vec3f( 0.72, 0.68, 0.58 ), paint.rgb, paint.a ) * mix( 0.92, 1.0, crazing );
			rough = 0.22;
			s.clearcoat = 1.0; s.clearcoatRoughness = 0.06;
		}
	} else if ( L > -4.5 ) {
		// plain: colour, roughness and metalness from the vertex data; a little grime and pitting
		let g = skFbm( P * 14.0 );
		alb = tint * mix( 0.78, 1.04, g );
		rough = clamp( uv2.x + ( g - 0.5 ) * 0.2, 0.05, 1.0 );
		metal = uv2.y;
		if ( metal > 0.5 ) {
			let rust = smoothstep( 0.6, 0.8, skFbm( P * 40.0 + 3.0 ) );
			alb = mix( alb, vec3f( 0.2, 0.09, 0.04 ), rust * 0.8 );
			metal = mix( metal, 0.0, rust );
			rough = mix( rough, 0.9, rust );
		}
	} else if ( L > -5.5 ) {
		// three-strand laid rope: twisted strands, fibres, grime
		let strand = sin( ( uv.y * 3.0 + uv.x * 22.0 ) * 6.2831853 ) * 0.5 + 0.5;
		let fibre = skNoise( vec3f( uv.x * 900.0, uv.y * 40.0, 0.0 ) );
		alb = tint * mix( 0.55, 1.05, strand ) * mix( 0.85, 1.05, fibre ) * mix( 0.8, 1.0, skFbm( P * 6.0 ) );
		rough = 0.95;
		nrm = skBump( P, N0, strand * 0.0025 + fibre * 0.0003 );
	} else {
		// sun-faded painted float or fender: chalky, chipped to the white foam, streaky grime
		let fade = skFbm( P * 9.0 );
		let chip = smoothstep( 0.66, 0.74, skFbm( P * 55.0 + 2.0 ) );
		let streak = skFbm( vec3f( P.x * 30.0, P.y * 3.0, P.z * 30.0 ) );
		let chalky = mix( tint, vec3f( dot( tint, vec3f( 0.33 ) ) * 1.1 + 0.08 ), 0.3 + fade * 0.2 );
		alb = mix( chalky, vec3f( 0.78, 0.76, 0.7 ), chip ) * mix( 0.62, 1.0, smoothstep( 0.35, 0.7, streak ) );
		rough = mix( 0.55, 0.85, fade );
		nrm = skBump( P, N0, - chip * 0.0015 + fade * 0.0006 );
	}
	s.albedo = alb;
	s.roughness = rough;
	s.metalness = metal;
	s.ao = ao;
	s.normal = nrm;
`,t}new x;var Od=new a,kd=new n,Ad=new n;function J(e,r,a,o=0,s=0,c=0,l=1){return new x().compose(new n(e,r,a),new i().setFromEuler(new t(s,o,c,`YXZ`)),new n(l,l,l))}var jd=class{constructor(e,t=1){this.assets=e,this.pos=[],this.nrm=[],this.uv=[],this.col=[],this.layer=[],this.uv2=[],this.idx=[],this.seed=t}rnd(){return this.seed=this.seed*16807%2147483647,this.seed/2147483647}jit(e){return(this.rnd()-.5)*e}_vert(e,t,n,r,i,a){return this.pos.push(e.x,e.y,e.z),this.nrm.push(t.x,t.y,t.z),this.uv.push(n[0],n[1]),this.col.push(r[0],r[1],r[2],1),this.layer.push(i),this.uv2.push(a[0],a[1]),this.pos.length/3-1}box(e,t,r,i,a={}){let o=a.layer??pd.WALL,s=a.color||[1,1,1],c=o>=0&&o<100?md[o]:{size:1,grain:`u`},l=a.off||[this.rnd(),this.rnd()],u=a.along||`x`;Od.getNormalMatrix(i);let d=[e/2,t/2,r/2],f=[`x`,`y`,`z`];for(let r=0;r<6;r++){let p=r>>1,m=r&1?-1:1,h=(p+1)%3,g=(p+2)%3,_=h,v=g,y=f.indexOf(u);(c.grain===`u`?v===y:_===y)&&(_=g,v=h);let b=new n;b.setComponent(p,m);let x=b.clone().applyMatrix3(Od).normalize(),S=this.pos.length/3;for(let[r,u]of[[-1,-1],[1,-1],[1,1],[-1,1]]){let f=new n;f.setComponent(p,m*d[p]),f.setComponent(_,r*d[_]),f.setComponent(v,u*d[v]);let h=(f.getComponent(_)+d[_])/c.size+l[0],g=-(f.getComponent(v)+d[v])/c.size+l[1],y=a.params||[0,0];if(a.uv2Rect&&p===2&&m>0){let n=a.uv2Rect;y=[n[0]+(n[2]-n[0])*(f.x/e+.5),n[1]+(n[3]-n[1])*(.5-f.y/t)]}else a.uv2Rect&&(y=[a.uv2Rect[0]+.001,a.uv2Rect[1]+.001]);f.applyMatrix4(i),this._vert(f,x,[h,g],s,o,y)}(_-p+3)%3==1==m>0?this.idx.push(S,S+1,S+2,S,S+2,S+3):this.idx.push(S,S+2,S+1,S,S+3,S+2)}}geometry(e,t,n={}){let r=n.layer??pd.PLAIN,i=n.color||[1,1,1],a=n.params||[.6,0],o=n.uvScale||[1,1];Od.getNormalMatrix(t);let s=e.attributes.position,c=e.attributes.normal,l=e.attributes.uv,u=this.pos.length/3;for(let e=0;e<s.count;e++){kd.fromBufferAttribute(s,e).applyMatrix4(t),Ad.fromBufferAttribute(c,e).applyMatrix3(Od).normalize();let u=l?[l.getX(e)*o[0],l.getY(e)*o[1]]:[0,0],d=n.uv2FromUV;this._vert(kd,Ad,u,i,r,d&&l?[d[0]+(d[2]-d[0])*l.getX(e),d[1]+(d[3]-d[1])*(1-l.getY(e))]:a)}if(e.index)for(let t=0;t<e.index.count;t++)this.idx.push(u+e.index.getX(t));else for(let e=0;e<s.count;e++)this.idx.push(u+e)}rope(e,t=.009,r=[.62,.53,.38],i=6){let a=this.pos.length/3,o=0,s=new n,c=new n,l=new n,u=new n(0,1,0);for(let a=0;a<e.length;a++){let d=e[a],f=e[Math.max(0,a-1)],p=e[Math.min(e.length-1,a+1)];s.subVectors(p,f).normalize(),a>0&&(o+=d.distanceTo(e[a-1])),l.crossVectors(s,Math.abs(s.y)>.9?new n(1,0,0):u).normalize(),c.crossVectors(s,l);for(let e=0;e<=i;e++){let n=e/i*Math.PI*2,a=l.clone().multiplyScalar(Math.cos(n)).addScaledVector(c,Math.sin(n));this._vert(d.clone().addScaledVector(a,t),a,[o,e/i],r,pd.ROPE,[0,0])}}for(let t=0;t<e.length-1;t++)for(let e=0;e<i;e++){let n=a+t*(i+1)+e,r=n+i+1;this.idx.push(n,n+1,r,n+1,r+1,r)}}coil(e,t,r,i=.2,a=5,o=.012,s){for(let c=0;c<a;c++){let a=[],l=i-c*o*1.6+this.jit(.01);for(let i=0;i<=28;i++){let s=i/28*Math.PI*2+c*.7;a.push(new n(e+Math.cos(s)*l,t+o+c*o*1.3+Math.sin(s*3+c)*.003,r+Math.sin(s)*l))}this.rope(a,o,s)}}corrugated(e,t,r,i=0,a=[1,1,1]){let o=Math.ceil(e/1.8*gd*8);Od.getNormalMatrix(r);let s=this.pos.length/3,c=e=>{let t=e/1.8+i;return vd*Math.cos(2*Math.PI*gd*t-_d)};for(let s=0;s<=2;s++)for(let l=0;l<=o;l++){let u=-e/2+e*l/o,d=-t/2+t*s/2,f=(c(u+.001)-c(u-.001))/.002,p=new n(u,c(u),d).applyMatrix4(r),m=new n(-f,1,0).normalize().applyMatrix3(Od).normalize();this._vert(p,m,[u/1.8+i,-d/1.8],a,pd.TIN,[0,0])}for(let e=0;e<2;e++)for(let t=0;t<o;t++){let n=s+e*(o+1)+t,r=n+o+1;this.idx.push(n,r,n+1,n+1,r,r+1)}let l=this.pos.length/3;for(let e=s;e<l;e++){let t=new n(this.pos[e*3],this.pos[e*3+1],this.pos[e*3+2]),r=new n(-this.nrm[e*3],-this.nrm[e*3+1],-this.nrm[e*3+2]);this._vert(t,r,[this.uv[e*2],this.uv[e*2+1]],[.8,.8,.8],pd.TIN,[0,0])}for(let e=0;e<2;e++)for(let t=0;t<o;t++){let n=l+e*(o+1)+t,r=n+o+1;this.idx.push(n,n+1,r,n+1,r+1,r)}}ice(e,t,r,i=.018){Od.getNormalMatrix(r);let a=[];for(let e=0;e<=22;e++)for(let t=0;t<=36;t++){let n=Math.min(t,36-t,e,22-e)===0?-.4:1;a.push((this.rnd()*.7+.3*Math.sin(t*1.7+e*2.3))*i*n)}let o=this.pos.length/3;for(let i=0;i<=22;i++)for(let o=0;o<=36;o++){let s=-e/2+e*o/36,c=-t/2+t*i/22,l=(e,t)=>a[Math.min(22,Math.max(0,t))*37+Math.min(36,Math.max(0,e))],u=new n((l(o-1,i)-l(o+1,i))/(2*e/36),1,(l(o,i-1)-l(o,i+1))/(2*t/22)).normalize(),d=new n(s,l(o,i),c).applyMatrix4(r);this._vert(d,u.applyMatrix3(Od).normalize(),[s,c],[1,1,1],pd.ICE,[0,0])}for(let e=0;e<22;e++)for(let t=0;t<36;t++){let n=o+e*37+t,r=n+36+1;this.idx.push(n,r,n+1,n+1,r,r+1)}}disc(e,t,r={}){let i=r.layer??pd.DIAL,a=r.uv2Rect||[0,0,1,1],o=r.color||[1,1,1];Od.getNormalMatrix(t);let s=new n(0,0,1).applyMatrix3(Od).normalize(),c=(t,n)=>[a[0]+(a[2]-a[0])*(t/e*.5+.5),a[1]+(a[3]-a[1])*(.5-n/e*.5)],l=this._vert(new n(0,0,0).applyMatrix4(t),s,[.5,.5],o,i,c(0,0));for(let r=0;r<=40;r++){let a=r/40*Math.PI*2,u=Math.cos(a)*e,d=Math.sin(a)*e;this._vert(new n(u,d,0).applyMatrix4(t),s,[u/e*.5+.5,.5-d/e*.5],o,i,c(u,d)),r>0&&this.idx.push(l,l+r,l+r+1)}}prop(e,t){let n=this.assets,r=n.info.props[e];if(!r)throw Error(`StallKit: no prop `+e);let i=n.verts,a=n.info.vertexFloats,o=Nd(n,e,r);Od.getNormalMatrix(t);let s=this.pos.length/3;for(let e=0;e<r.vCount;e++){let n=(r.vOff+e)*a;kd.set(i[n],i[n+1],i[n+2]).applyMatrix4(t),Ad.set(i[n+3],i[n+4],i[n+5]).applyMatrix3(Od).normalize(),this._vert(kd,Ad,[i[n+6],i[n+7]],[1,1,1],pd.PROP+(o?o.layer[e]:i[n+8]),o?[o.uv2[e*2],o.uv2[e*2+1]]:[0,0])}for(let e=0;e<r.iCount;e++)this.idx.push(s+n.index[r.iOff+e])}bounds(e){return this.assets.info.props[e]}build(){let e=new Be;return e.setAttribute(`position`,new Ve(this.pos,3)),e.setAttribute(`normal`,new Ve(this.nrm,3)),e.setAttribute(`uv`,new Ve(this.uv,2)),e.setAttribute(`color`,new Ve(this.col,4)),e.setAttribute(`aLayer`,new Ve(this.layer,1)),e.setAttribute(`aUV2`,new Ve(this.uv2,2)),e.setIndex(new Se(this.idx,1)),e.computeBoundingBox(),e.computeBoundingSphere(),e}},Md=new Map;function Nd(e,t,n){if(t!==`wooden_lantern_01`)return null;if(Md.has(t))return Md.get(t);let r=e.info.layers.indexOf(`wooden_lantern_01_1`);if(r<0)return null;let i=e.verts,a=e.info.vertexFloats,o=n.vCount,s=new Int32Array(o).map((e,t)=>t),c=e=>{for(;s[e]!==e;)e=s[e]=s[s[e]];return e},l=(e,t)=>{s[c(e)]=c(t)},u=new Map;for(let e=0;e<o;e++){let t=(n.vOff+e)*a,r=`${Math.round(i[t]*1e4)},${Math.round(i[t+1]*1e4)},${Math.round(i[t+2]*1e4)}`;u.has(r)?l(e,u.get(r)):u.set(r,e)}for(let t=0;t<n.iCount;t+=3){let r=e.index[n.iOff+t];l(r,e.index[n.iOff+t+1]),l(r,e.index[n.iOff+t+2])}let d=new Map;for(let e=0;e<o;e++){let t=c(e),r=(n.vOff+e)*a,o=d.get(t);o||d.set(t,o=[1e9,1e9,1e9,-1e9,-1e9,-1e9]);for(let e=0;e<3;e++)o[e]=Math.min(o[e],i[r+e]),o[e+3]=Math.max(o[e+3],i[r+e])}let f={layer:new Float32Array(o),uv2:new Float32Array(o*2)};for(let e=0;e<o;e++){let t=d.get(c(e)),o=(n.vOff+e)*a,s=t[3]-t[0]<t[5]-t[2],l=t[4]-t[1]>.2&&t[1]>.045&&t[4]<.3&&Math.min(t[3]-t[0],t[5]-t[2])<.015;f.layer[e]=l?r:i[o+8],f.uv2[e*2]=s?i[o+2]:i[o],f.uv2[e*2+1]=i[o+1]}return Md.set(t,f),f}var Pd={cylinder:(e,t,n,r=16,i=!1)=>new Pe(e,t,n,r,1,i),torus:(e,t,n=8,r=24)=>new Le(e,t,n,r),sphere:(e,t=14,n=10)=>new ke(e,t,n),lathe:(e,t=16)=>new ze(e.map(([e,t])=>new p(e,t)),t)},Fd={x:49.9,z:-74.6,yaw:1.45},Id=.06,Ld=1.27,Rd=class{constructor({scene:e,terrain:t,colliders:r}){let i=t.heightAt(Fd.x,Fd.z);this.material=Fu(`fishStand`),this.group=new xe,this.group.name=`FishStand`,this.group.position.set(Fd.x,i,Fd.z),this.group.rotation.y=Fd.yaw,e.add(this.group),this.ready=wd().then(e=>{let t=new Ee(Vd(e),e.material);t.name=`FishStandStall`,t.castShadow=!0,this.group.add(t)}).catch(e=>{console.error(`FishStand: stall assets failed, using the plain stall`,e);let t=new Ee(zd(),this.material);t.castShadow=!0,this.group.add(t)});let a=new n(.2,0,.12).applyAxisAngle(new n(0,1,0),Fd.yaw);if(this.vendor=new dd({name:`Joe · Fish buyer`,kind:`buyer`,position:new n(Fd.x+a.x,i+Id,Fd.z+a.z),yaw:Fd.yaw,radius:3.2,greeting:`Let's see what you caught. Fair prices, cash.`,idle:`Nothing to sell? The grunts are biting off the pier.`,material:this.material,character:{url:`./models/characters/joe.glb`,idle:`idle_neutral_01`,talk:`gestic_talk_relaxed_01`,greet:`wave_01`}}),e.add(this.vendor.group),r){r.addBox(new n(Fd.x,i+1.2,Fd.z),new n(1.45,1.2,.95),Fd.yaw,{tag:`fishStand`});for(let[e,t,a,o,s]of[[-1.85,.25,.45,.25,.35],[1.8,-.2,.3,.6,.23],[1.55,1.05,.2,.2,.28],[1.95,1.45,.35,.25,.42]]){let c=new n(e,0,t).applyAxisAngle(new n(0,1,0),Fd.yaw);r.addBox(new n(Fd.x+c.x,i+s,Fd.z+c.z),new n(a,s,o),Fd.yaw,{tag:`fishStandProps`})}}}iceFish(){let e=[],t=[[`jack`,.36],[`redSnapper`,.34],[`yellowtail`,.3],[`grunt`,.26],[`mullet`,.33]],n=new x().makeRotationY(Fd.yaw).setPosition(Fd.x,this.group.position.y,Fd.z);return t.forEach(([t,r],i)=>{let a=Rn.restHeight(pu[t].model,r),o=new x().makeRotationY(i%2?.12:-.1).setPosition(-.55+(i%2?.04:-.04),Ld+a+.006*i,.7+i*.085);e.push({species:t,frame:new x().multiplyMatrices(n,o),L:r,pose:i%2?`sideFlip`:`side`})}),e}update(e,t){this.vendor.update(e,t)}};function zd(){let e=[],t=(t,n)=>e.push(bt(t,n)),r=(e=9075302)=>({color:e,rough:.9,pattern:Nu.wood}),i=(e=9075302)=>({color:e,rough:.9,pattern:Nu.woodX}),a={color:9212566,rough:.55,metal:.7,pattern:Nu.rusty},o=(e,t,r)=>new n(e,t,r),s=7,c=()=>(s=s*16807%2147483647)/2147483647,l=e=>(c()-.5)*e;for(let[e,n,i]of[[-1.25,.75,2.45],[1.25,.75,2.42],[-1.25,-.75,2.12],[1.25,-.75,2.15]])t(at(.1,i,.1),{...r(8219736),matrix:P(e,i/2,n,l(.03),0,l(.03))});let u=.12;for(let e=0;e<7;e++){let n=.12+c()*.04;e!==1&&t(at(2.56+l(.05),n-.012,.025),{...i([9338472,8022872,10128504,7299663][e%4]),matrix:P(l(.03),u+n/2,.8,0,l(.02),l(.015))}),u+=n}for(let e=0;e<4;e++)t(at(2.7,.045,.15),{...i(e%2?10193780:9272680),matrix:P(l(.02),1.02,.66+e*.155,0,l(.015),0)});t(at(2.5,.035,.3),{...i(8022872),matrix:P(0,.7,-.63)});for(let e=0;e<9;e++)t(at(2.52,.04,.165+l(.01)),{...i([8022872,7299663,8746338][e%3]),matrix:P(l(.02),.039999999999999994,-.7+e*.172,0,l(.02),0)});for(let e of[-1,1])for(let n=0;n<11;n++){let i=-.72+n*.145;t(at(.022,1+l(.06),.13),{...r([8746338,7825487,9602160][n%3]),matrix:P(e*1.3,.52,i,0,0,l(.02))})}for(let e=0;e<18;e++){let n=-1.25+e*.147;t(at(.135,2.05+l(.05),.022),{...r([8351579,9075300,7168078][e%3]),matrix:P(n,1.03,-.8,l(.01),0,0)})}for(let e of[-1.25,0,1.25])t(at(.07,.09,2),{...r(7168078),matrix:P(e,2.33,0,-.16)});for(let e=0;e<4;e++){let n=-1.14+e*.76;t(Bd(.8,2.1,9),{...a,matrix:P(n,2.4+(e===3?.03:0),.04,-.16+(e===3?.03:0),l(.02),l(.02))})}t(at(.9,.22,.5),{color:3108751,rough:.5,matrix:P(-.55,1.15,.85)}),t(at(.84,.03,.44),{color:15199984,rough:.15,matrix:P(-.55,1.255,.85)}),t($t(o(.6,2.25,.62),o(.6,1.75,.62),.006,4),{color:5593692,rough:.4,metal:1}),t(F(.1,.1,.05,18),{color:13222576,rough:.5,metal:.4,pattern:Nu.rusty,matrix:P(.6,1.66,.62,Math.PI/2,0,0)}),t(F(.14,.11,.05,16),{color:11120819,rough:.35,metal:1,matrix:P(.6,1.45,.62)});for(let e=0;e<5;e++)t(dt(.06,10,8),{color:[14832938,15909424,15262416,3116911,14832938][e],rough:.5,matrix:P(-1.1+e*.5,2.05+l(.1),.95)});for(let e=0;e<5;e++)t($t(o(-1.1+e*.5,2.4,.95),o(-1.1+e*.5,2.1,.95),.004,3),{color:13351321,rough:.9});return t(F(.16,.13,.3,14,1,!0),{color:4025738,rough:.6,pattern:Nu.rusty,matrix:P(1.6,.15,.9)}),t(F(.15,.15,.02,14),{color:2763306,rough:.9,matrix:P(1.6,.02,.9)}),t(at(.55,.75,.03),{color:2764844,rough:.9,matrix:P(1.75,.4,1,-.28,.3,0)}),t(at(.6,.8,.02),{...r(8022872),matrix:P(1.75,.4,.985,-.28,.3,0)}),ft(e)}function Bd(e,t,n){let r=new Ie(e,.012,t,Math.max(2,n*4),1,1),i=r.attributes.position;for(let t=0;t<i.count;t++){let r=i.getX(t);i.setY(t,i.getY(t)+Math.sin((r/e+.5)*n*Math.PI*2)*.012)}return r.computeVertexNormals(),r}function Vd(e){let t=new jd(e,7),{WALL:r,DECK:i,TIN:a,SIGN:o,CHALK:s,PLAIN:c,FLOAT:l,DIAL:u}=pd,d=(e,t,r)=>new n(e,t,r),f=e=>t.jit(e),p=()=>{let e=.86+t.rnd()*.22;return[e,e*(.97+t.rnd()*.05),e*(.94+t.rnd()*.06)]};t.box(2.6,.04,1.62,J(0,.039999999999999994,-.02),{layer:i,along:`x`,color:p()});for(let[e,n,r]of[[-1.25,.75,2.45],[1.25,.75,2.42],[-1.25,-.75,2.12],[1.25,-.75,2.15]])t.box(.1,r,.1,J(e,r/2,n,f(.2),f(.03),f(.03)),{layer:i,along:`y`,color:p()});t.box(2.72,.12,.07,J(0,2.36,.8,0,0,f(.01)),{layer:i,along:`x`,color:p()}),t.box(2.72,.1,.07,J(0,2.06,-.8),{layer:i,along:`x`,color:p()}),t.box(2.6,2.05,.03,J(0,1.05,-.815),{layer:r,along:`x`,color:p()});for(let e of[-1,1])t.box(.03,1.05,1.55,J(e*1.3,.55,0),{layer:r,along:`z`,color:p()});t.box(2.6,.98,.03,J(0,.53,.815),{layer:r,along:`x`,color:p()});for(let e of[-1,1])t.box(.08,.98,.03,J(e*1.24,.53,.84),{layer:i,along:`y`,color:p()});t.box(2.72,.05,.56,J(0,1.02,.86,0,0,f(.008)),{layer:i,along:`x`,color:p()}),t.box(2.5,.035,.3,J(0,.7,-.63),{layer:i,along:`x`,color:p()});for(let e of[-1.1,0,1.1])t.box(.03,.18,.26,J(e,.6,-.66),{layer:i,along:`y`,color:p()});for(let e of[-1.25,0,1.25])t.box(.07,.09,2,J(e,2.33,0,0,-.16),{layer:i,along:`z`,color:p()});for(let e=0;e<3;e++){let n=-.9+e*.9;t.corrugated(.98,2.12,J(n,2.405+e*.006+(e===2?.02:0),.04,f(.02),-.16+(e===2?.02:0),f(.02)),t.rnd(),[1,1,1])}t.box(2.3,.32,.035,J(0,2.13,.855,0,0,f(.01)),{layer:o,along:`x`,uv2Rect:hd.joe});let m=-.55,h=.86,g=.25,_=.98,v=.54,y=.025;t.box(_,.025,v,J(m,1.0574999999999999,h),{layer:i,along:`x`,color:p()});for(let e of[-1,1])t.box(_,g,y,J(m,1.17,h+e*(v/2-y/2)),{layer:i,along:`x`,color:p()}),t.box(y,g,v-2*y,J(m+e*(_/2-y/2),1.17,h),{layer:i,along:`z`,color:p()});for(let e of[-1,1])for(let n of[-1,1])t.box(.05,.23,.05,J(m+e*(_/2-.012),1.17,h+n*(v/2-.012)),{layer:c,color:[.55,.57,.56],params:[.45,1]});t.ice(_-2*y-.01,v-2*y-.01,J(m,1.245,h),.02),t.prop(`wooden_cutting_board`,J(.32,1.045,.88,.12)),t.prop(`fish_knife`,J(.3,1.0939999999999999,.84,1.1,-Math.PI/2));let b=.62,S=.84,C={layer:c,color:[.52,.53,.52],params:[.38,1]};t.geometry(Pd.cylinder(.004,.004,.5,6),J(b,2.06,S),C),t.geometry(Pd.torus(.018,.004,6,14),J(b,1.82,S,Math.PI/2),C),t.geometry(Pd.cylinder(.1,.1,.05,28),J(b,1.7,S,0,Math.PI/2),{layer:l,color:[.55,.1,.07]}),t.geometry(Pd.torus(.093,.009,8,32),J(b,1.7,.866),{layer:c,color:[.62,.6,.56],params:[.36,1]}),t.disc(.088,J(b,1.7,.8664999999999999),{layer:u,uv2Rect:hd.dial}),t.box(.005,.075,.003,J(b,1.7,.872,0,0,-.9).multiply(new x().makeTranslation(0,.03,0)),{layer:c,color:[.08,.07,.06],params:[.4,0]}),t.geometry(Pd.cylinder(.003,.003,.1,6),J(b,1.6,S),C),t.geometry(Pd.lathe([[0,0],[.12,.008],[.15,.035],[.155,.04]],24),J(b,1.43,S),{layer:c,color:[.72,.72,.7],params:[.5,1]});for(let e=0;e<3;e++){let n=e/3*Math.PI*2;t.geometry(Wd(d(b,1.55,S),d(b+Math.cos(n)*.145,1.47,S+Math.sin(n)*.145)),new x,C)}let w=[[.75,.22,.08],[.82,.8,.74],[.78,.6,.12],[.75,.22,.08]];for(let e=0;e<4;e++){let n=d(-1.36-e%2*.07,1.95-e*.2,.82+e%2*.05);t.geometry(Ud(),J(n.x,n.y,n.z,t.rnd()*3,f(.3),f(.3)),{layer:l,color:w[e]}),t.rope([d(-1.31,2.25-e*.05,.8),d(n.x,n.y+.11,n.z)],.005)}return t.prop(`lifebuoy`,J(1.345,1.05,-.3,Math.PI/2+.03,0,.1)),t.rope([d(-.9,2.32,.1),d(-.9,2.16,.1)],.004),t.prop(`wooden_lantern_01`,J(-.9,1.64,.1,.4)),t.prop(`fishermans_hat`,J(-.4,1.72,-.73,.2,Math.PI/2-.3)),t.coil(-.95,Id,-.5,.2,5,.012,[.66,.58,.42]),Gd(t,-1.335,1.08,-.68,.62,.8),t.prop(`wooden_crate_01`,J(-1.85,0,.25,Math.PI/2+.06)),t.prop(`wooden_crate_01`,J(-1.84,.335,.28,Math.PI/2-.1)),t.prop(`wooden_crate_02`,J(1.8,0,-.2,.03)),t.prop(`wooden_bucket_01`,J(1.55,0,1.05,.7)),Hd(t,J(1.95,0,1.45,-.35),{layer:i,color:p()}),t.build()}function Hd(e,t,n){let r=(r,i)=>{let a=t.clone().multiply(J(0,0,0,i?0:Math.PI,r));e.box(.62,.035,.025,a.clone().multiply(J(0,.86,0)),{...n,along:`x`}),e.box(.62,.035,.025,a.clone().multiply(J(0,.05,0)),{...n,along:`x`});for(let t of[-1,1])e.box(.035,.88,.025,a.clone().multiply(J(t*.29,.44,0)),{...n,along:`y`});e.box(.55,.78,.012,a.clone().multiply(J(0,.455,0)),{layer:pd.CHALK,uv2Rect:i?hd.prices:[.99,.99,1,1]})};r(-.24,!0),r(-.24,!1)}function Ud(){let e=[];for(let t=0;t<=12;t++){let n=t/12,r=Math.min(n,1-n)/.25;e.push([.014+.05*Math.sqrt(Math.min(1,r)*(2-Math.min(1,r))),(n-.5)*.19])}return Pd.lathe(e,14)}function Wd(e,t){let r=t.clone().sub(e),a=r.length(),o=Math.max(2,Math.round(a/.018)),s=new i().setFromUnitVectors(new n(0,1,0),r.clone().normalize()),c=[];for(let t=0;t<o;t++){let a=Pd.torus(.006,.0015,4,8);a.scale(1,1.6,1);let l=new x().compose(e.clone().addScaledVector(r,(t+.5)/o),s.clone().multiply(new i().setFromAxisAngle(new n(0,1,0),t%2?Math.PI/2:0)),new n(1,1,1));a.applyMatrix4(l),c.push(a)}return Fe(c)}function Gd(e,t,r,i,a,o){let s=(e,t,r)=>new n(e,t,r),c=[];for(let n=0;n<=12;n++){let l=[];for(let c=0;c<=16;c++){let u=c/16,d=n/12,f=i+a+(u-.5)*2*a*(1-d*.18)+e.jit(.012),p=r-d*o-Math.sin(u*Math.PI)*.06*d+e.jit(.01);l.push(s(t-.015-Math.sin(d*Math.PI*.5)*.03-e.rnd()*.01,p,f))}c.push(l)}let l=[.33,.36,.26];for(let t=0;t<=12;t++)e.rope(c[t],.0022,l,3);for(let t=0;t<=16;t++)e.rope(c.map(e=>e[t]),.0022,l,3);e.rope(c[0].map(e=>e.clone().add(s(0,.012,0))),.006,[.6,.53,.38]);for(let t=0;t<3;t++){let n=c[0][3+t*5];e.geometry(Ud(),J(n.x-.03,n.y-.02,n.z,0,0,Math.PI/2),{layer:pd.FLOAT,color:[.8,.78,.7]})}}var Kd={x:85.5,z:-60.5,yaw:-1.9},qd=class{constructor({scene:e,terrain:t,colliders:r,material:i=null}){let a=t.heightAt(Kd.x,Kd.z);this.material=i||Fu(`chandlery`),this.group=new xe,this.group.name=`Chandlery`,this.group.position.set(Kd.x,a,Kd.z),this.group.rotation.y=Kd.yaw,e.add(this.group),this.ready=wd().then(e=>{let t=new Ee(Yd(e),e.material);t.name=`ChandleryStall`,t.castShadow=!0,this.group.add(t)}).catch(e=>{console.error(`Chandlery: stall assets failed, using the plain table`,e);let t=new Ee(Jd(),this.material);t.castShadow=!0,this.group.add(t)});let o=new n(0,0,-.75).applyAxisAngle(new n(0,1,0),Kd.yaw),s=Kd.x+o.x,c=Kd.z+o.z;if(this.vendor=new dd({name:`Marta · Chandlery`,kind:`shop`,position:new n(s,t.heightAt(s,c),c),yaw:Kd.yaw,radius:3,greeting:`Line, reels, a bigger hold, diesel. What do you need?`,material:this.material,character:{url:`./models/characters/marta.glb`,idle:`idle_neutral_01`,talk:`gestic_talk_neutral_01`,greet:`wave_01`},look:{shirt:9059122,trousers:3095370,apron:4020810,hat:2898500,hair:3812386,skin:8016438}}),e.add(this.vendor.group),r){r.addBox(new n(Kd.x,a+.45,Kd.z),new n(1,.45,.4),Kd.yaw,{tag:`chandlery`});for(let[e,t,i,o,s]of[[0,-1.4,.62,.22,.8],[1.25,.2,.3,.3,.26],[-1.35,-.9,.15,.3,.9]]){let c=new n(e,0,t).applyAxisAngle(new n(0,1,0),Kd.yaw);r.addBox(new n(Kd.x+c.x,a+s,Kd.z+c.z),new n(i,s,o),Kd.yaw,{tag:`chandleryProps`})}}}update(e,t){this.vendor.update(e,t)}};function Jd(){let e=[],t=(t,n)=>e.push(bt(t,n)),r=11,i=()=>(r=r*16807%2147483647)/2147483647,a=e=>(i()-.5)*e,o=e=>({color:e,rough:.9,pattern:Nu.woodX}),s=e=>({color:e,rough:.9,pattern:Nu.wood}),c=(e,t,r)=>new n(e,t,r);for(let e of[-.75,.75])for(let n of[-1,1])t(at(.06,.95,.06),{...s(8022872),matrix:P(e,.43,n*.22,n*.28,0,0)});for(let e=0;e<3;e++)t(at(2,.035,.26),{...o([9338472,8219994,9799280][e]),matrix:P(a(.02),.9,-.27+e*.27,0,a(.02),0)});t(at(.5,.18,.3),{color:3107402,rough:.5,pattern:Nu.rusty,matrix:P(-.55,1.01,.02)}),t(at(.5,.02,.3),{color:3107402,rough:.5,matrix:P(-.55,1.2,-.16,-1.2,0,0)});for(let e=0;e<4;e++)t(F(.045,.045,.05,14),{color:[14210248,3842248,14729280,14210248][e],rough:.5,matrix:P(.05+e*.11,.945,.12,Math.PI/2,0,0)});for(let e=0;e<2;e++)t(F(.04,.04,.05,16),{color:8227472,rough:.3,metal:1,matrix:P(.6+e*.2,.96,-.1)}),t($t(c(.6+e*.2,.99,-.1),c(.64+e*.2,.99,-.14),.004,5),{color:3355443,rough:.4,metal:1});for(let e=0;e<3;e++)t(at(.18,.34,.3),{color:e===1?2054698:11675164,rough:.55,pattern:Nu.rusty,matrix:P(1.25+a(.05),.17,-.2+e*.22,0,a(.4),0)});for(let e=0;e<4;e++)t(Ct(.2-e*.012,.018,6,20),{color:13218954,rough:.9,pattern:Nu.cloth,matrix:P(-1.3,.02+e*.035,.2,Math.PI/2,0,0)});for(let e=0;e<3;e++)t(dt(.09,10,8),{color:[14832938,15262416,15909424][e],rough:.5,matrix:P(-1.1+e*.12,.09,-.3)});return t(at(.7,.5,.025),{color:2764844,rough:.9,matrix:P(0,.5,.33,-.2,0,0)}),t(at(.76,.56,.02),{...o(8022872),matrix:P(0,.5,.315,-.2,0,0)}),ft(e)}function Yd(e){let t=new jd(e,11),{DECK:r,SIGN:i,PLAIN:a,ROPE:o,FLOAT:s}=pd,c=(e,t,r)=>new n(e,t,r),l=e=>t.jit(e),u=()=>{let e=.88+t.rnd()*.2;return[e,e,e*.97]},d=.83;t.prop(`WoodenTable_03`,J(0,0,0,.01)),t.prop(`metal_toolbox`,J(-.38,d,-.02,.12)),[[.86,.86,.8],[.18,.48,.72],[.82,.68,.16],[.16,.42,.2],[.86,.86,.8]].forEach((e,n)=>{let r=.05+n*.1,i=.12+n%2*.03;t.geometry(Pd.cylinder(.042,.042,.06,20),J(r,.875,i,0,0,Math.PI/2),{layer:o,color:e,uvScale:[.26,3]});for(let e of[-1,1])t.geometry(Pd.cylinder(.05,.05,.006,20),J(r+e*.033,.875,i,0,0,Math.PI/2),{layer:a,color:[.12,.12,.13],params:[.4,0]})});for(let e=0;e<2;e++)Zd(t,J(.18+e*.22,d,-.14,.5+e*.4));for(let e=0;e<4;e++)t.box(.09,.14,.012,J(.5+e%2*.1,.8999999999999999,-.05+(e>>1)*.02,.1,-.35),{layer:a,color:[[.8,.2,.15],[.9,.75,.2],[.2,.5,.75],[.85,.85,.82]][e],params:[.35,0]});t.coil(-.05,d,-.18,.1,4,.005,[.25,.5,.3]),t.prop(`wooden_display_shelves_01`,J(0,0,-1.4,Math.PI/2)),Xd(t.bounds(`wooden_display_shelves_01`)).forEach((e,n)=>{for(let r=0;r<3;r++){let i=-.35+r*.35;if((n+r)%3==0)t.coil(i,e,-1.4,.13,4,.011,[.7,.62,.45]);else if((n+r)%3==1)for(let r=0;r<3;r++)t.geometry(Qd(),J(i-.08+r*.08,e+.06,-1.4+l(.05),l(.4),Math.PI/2,0),{layer:s,color:[[.75,.22,.08],[.82,.8,.74],[.78,.6,.12]][(r+n)%3]});else t.geometry(Pd.cylinder(.06,.06,.12,18),J(i,e+.06,-1.4),{layer:o,color:[.88,.86,.8],uvScale:[.38,3]})}});for(let e of[-1,1])t.box(.09,2.7,.09,J(e*1.08,1.35,-1.72,l(.2),l(.02),l(.02)),{layer:r,along:`y`,color:u()});t.box(2.3,.56,.04,J(0,2.28,-1.66,0,0,l(.012)),{layer:i,along:`x`,uv2Rect:hd.marta}),t.rope([c(-1.08,1.9,-1.66),c(-1.13,1.62,-1.58)],.006),t.geometry($d(),J(-1.14,1.36,-1.57,l(1),0,-.08),{layer:s,color:[.84,.83,.8]}),t.rope([c(1.08,1.95,-1.66),c(1.08,1.86,-1.62)],.006),t.prop(`lifebuoy`,J(1.08,1.47,-1.6,.04,0,-.05)),t.rope([c(-.75,2,-1.62),c(-.75,1.86,-1.45)],.004),t.prop(`wooden_lantern_01`,J(-.75,1.36,-1.45,.3)),t.prop(`life_jacket`,J(-1.08,1.05,-1.6,.08)),t.prop(`metal_jerrycan_green`,J(1.1,0,.05,.3)),t.prop(`metal_jerrycan_green`,J(1.38,0,.32,-.25)),t.prop(`plastic_jerrycan`,J(1.2,0,.45,1.3)),t.geometry($d(),J(-.82,.1,.36,.3,0,Math.PI/2-.1),{layer:s,color:[.16,.3,.5]}),t.coil(-1.15,0,.55,.3,6,.016,[.72,.66,.5]),t.prop(`wooden_crate_01`,J(1.35,0,-.75,Math.PI/2+.2)),t.box(.06,1.2,.06,J(-1.35,.6,-1.05),{layer:r,along:`y`,color:u()}),t.box(.06,1.2,.06,J(-1.35,.6,-.6),{layer:r,along:`y`,color:u()}),t.box(.06,.05,.6,J(-1.35,1.12,-.83),{layer:r,along:`z`,color:u()}),t.box(.08,.04,.6,J(-1.35,.1,-.83),{layer:r,along:`z`,color:u()});for(let e=0;e<4;e++){let n=J(-1.35,.12,-1+e*.12,0,0,-.08-e*.02);t.geometry(Pd.cylinder(.0035,.009,2.1,8),n.clone().multiply(J(0,1.05,0)),{layer:a,color:[.03,.03,.035],params:[.2,0]}),t.geometry(Pd.cylinder(.014,.014,.3,10),n.clone().multiply(J(0,.2,0)),{layer:a,color:[.55,.42,.28],params:[.85,0]}),Zd(t,n.clone().multiply(J(0,.42,.02,0,Math.PI/2)),.7)}return t.build()}function Xd(e){let t=e.max[1];return[.08,.36,.64,.92,1.2].map(e=>e*t/1.556).filter(e=>e<t-.1)}function Zd(e,t,n=1){let r=new x().makeScale(n,n,n),i=t.clone().multiply(r),a={layer:pd.PLAIN,color:[.25,.26,.28],params:[.35,1]};e.box(.012,.03,.05,i.clone().multiply(J(0,.015,0)),a),e.geometry(Pd.cylinder(.028,.028,.045,16),i.clone().multiply(J(0,.05,0,0,Math.PI/2)),a),e.geometry(Pd.cylinder(.022,.024,.03,16),i.clone().multiply(J(0,.05,.035,0,Math.PI/2)),{layer:pd.PLAIN,color:[.7,.62,.45],params:[.3,1]}),e.box(.004,.05,.004,i.clone().multiply(J(.028,.05,-.005)),a)}function Qd(){let e=[];for(let t=0;t<=12;t++){let n=t/12,r=Math.min(1,Math.min(n,1-n)/.25);e.push([.012+.04*Math.sqrt(r*(2-r)),(n-.5)*.15])}return Pd.lathe(e,12)}function $d(){let e=[];for(let t=0;t<=14;t++){let n=t/14,r=Math.min(1,Math.min(n,1-n)/.18);e.push([.01+.075*Math.sqrt(r*(2-r)),(n-.5)*.5])}return Pd.lathe(e,16)}var ef=new n(0,-2e3,0),tf=new x().makeBasis(new n(0,0,1),new n(1,0,0),new n(0,1,0));new x().makeBasis(new n(0,1,0),new n(0,0,1),new n(1,0,0));var nf=new x,rf=new x,af=new i,of=new n,sf=new n,cf=new n;function lf(e,t){return gu(e,t)/100}var uf=class{constructor({scene:e,stall:t=[]}){let n=this.props=new Rn;this.slot={};let r=0;rf.makeTranslation(ef.x,ef.y,ef.z);for(let e of mu){let t=pu[e].model;n.add(`whole`,t,rf,`gill`,.3,{anchor:Rn.gillAnchor(t),cloudy:.1,wet:1}),this.slot[e]=r++}for(let e of t)n.add(`whole`,pu[e.species].model,e.frame,e.pose||`side`,e.L,{cloudy:.5,wet:.7});for(let e of t.filter(e=>e.ice))n.add(`ice`,null,e.ice,`flat`,.5,{seed:.3,flags:0});this.mesh=n.build(),this.mesh.name=`GameFish`,e.add(this.mesh),this.shown=null,this.t=0}show(e,t,n,r,i){let a=this.slot[e];if(a===void 0)return;this.shown!==e&&this.hide(),this.shown=e,this.t+=i;let o=pu[e].model,s=lf(e,t),c=Math.sin(this.t*11)*.9*Math.exp(-this.t*.5),l=Math.sin(this.t*2.6)*.25*Math.exp(-this.t*.4);af.setFromAxisAngle(cf.set(0,1,0),r+l),rf.makeRotationFromQuaternion(af).setPosition(n),this.place(a,rf,tf,s,Rn.gillAnchor(o),c,0,.4+.4*Math.max(0,Math.sin(this.t*7)))}hide(){this.shown!==null&&(rf.makeTranslation(ef.x,ef.y,ef.z),this.place(this.slot[this.shown],rf,tf,.3,[0,0,0],0,0,0),this.shown=null,this.t=0)}place(e,t,n,r,i,a,o,s){let c=this.props;nf.multiplyMatrices(t,n),nf.decompose(of,af,sf),of.sub(cf.set(i[0],i[1],i[2]).multiplyScalar(r).applyQuaternion(af));let l=c.batch.data,u=e*16;l[u]=of.x,l[u+1]=of.y,l[u+2]=of.z,l[u+3]=r,l[u+4]=af.x,l[u+5]=af.y,l[u+6]=af.z,l[u+7]=af.w,l[u+9]=a,l[u+10]=o,l[u+11]=s,c.pos[e*4]=of.x,c.pos[e*4+1]=of.y,c.pos[e*4+2]=of.z,c.pos[e*4+3]=r,c.batch.upload()}},df=new n(0,6e3,0),ff=new n(0,4800,0),pf=new x().makeBasis(new n(0,0,1),new n(0,1,0),new n(-1,0,0)),mf=2,hf=360,gf=170,_f=16,vf=new x,yf=new x,bf=new i,xf=new i,Sf=new n,Cf=new n,wf=new n,Tf=typeof HTMLCanvasElement<`u`&&typeof document<`u`&&typeof document.createElement==`function`,Ef=class{constructor(){let e=this.props=new Rn;this.slot={},yf.makeTranslation(ff.x,ff.y,ff.z),mu.forEach((t,n)=>{e.add(`whole`,pu[t].model,yf,`side`,.3,{cloudy:.08,wet:1,seed:.37}),this.slot[t]=n}),this.mesh=e.build(),this.mesh.name=`FishPortrait`,this.mesh.frustumCulled=!1,this.scene=new Ne,this.scene.add(this.mesh),this.scene.updateMatrixWorld(!0),this.renderer=new pe,this.camera=new je(_f,2,.05,200);let t=this.block=d(`fishPortrait`);this._dbg=new r;let i=t.onBeforePack;this.light={dir:new n(-.45,.78,.55).normalize(),color:new n(3.1,3,2.85),env:1,sweep:.4},t.onBeforePack=()=>{i();let e=t.fields;e.sunDir.value=this.light.dir,e.sunColor.value=this.light.color,e.envIntensity.value=this.light.env,e.night.value=0,this._dbg.set(this.light.sweep,0,0,0),e.debug.value=this._dbg},this.exposure=new l(`PortraitParams`,{exposure:[`f32`,1.15],ss:[`f32`,mf]},{label:`portrait`}),this.targets={},this.shown=null,this.live=null,this.canvas=null,this.context=null,this.present=null,this.toThumb=null,this.thumbs=new Map,this.queue=[],this.pending=new Map,this.busy=!1}_target(e,t,n){let r=this.targets[e];return r&&r.w===t&&r.h===n?r:(r&&(r.hdr.destroy(),r.depth.destroy()),r=this.targets[e]={w:t,h:n,hdr:new N({label:`portrait.`+e,width:t,height:n,format:`rgba16float`,usage:[`render`,`sample`]}),depth:new N({label:`portrait.`+e+`.depth`,width:t,height:n,format:`depth32float`,usage:[`render`]})},r)}_pass(e,t){return new et({label:`fish portrait `+e,bindings:{portraitSrc:{texture:t,sampleType:`unfilterable-float`},portrait:{uniform:this.exposure}},colorFormats:[e],code:oe+`
fn fragment( in: FSIn ) -> vec4f {
	let n = i32( portrait.ss );
	let base = vec2i( in.pos.xy ) * n;
	var rgb = vec3f( 0.0 );
	var a = 0.0;
	for ( var y = 0; y < n; y++ ) {
		for ( var x = 0; x < n; x++ ) {
			let c = textureLoad( portraitSrc, base + vec2i( x, y ), 0 );
			let cov = sat( c.a );
			rgb += acesFilmicToneMapping( max( c.rgb, vec3f( 0.0 ) ) / max( cov, 1e-4 ), portrait.exposure ) * cov;
			a += cov;
		}
	}
	let k = 1.0 / f32( n * n );
	rgb *= k;
	a *= k;
	// premultiplied: encode the colour, then weight by coverage
	let straight = rgb / max( a, 1e-4 );
	return vec4f( linearToSrgb( straight ) * a, a );
}
`})}_place(e,t,{yaw:n=0,pitch:r=0,roll:i=0,x:a=0,y:o=0,curl:s=0,jaw:c=.15}={}){this.shown&&this.shown!==e&&this._park(this.shown),this.shown=e;let l=gu(e,t)/100;return bf.setFromAxisAngle(wf.set(0,1,0),n),xf.setFromAxisAngle(wf.set(0,0,1),r),bf.multiply(xf),xf.setFromAxisAngle(wf.set(1,0,0),i),bf.multiply(xf),yf.makeRotationFromQuaternion(bf).setPosition(df.x+a*l,df.y+o*l,df.z),this._write(this.slot[e],yf,l,s,c),l}_park(e){yf.makeTranslation(ff.x,ff.y,ff.z),this._write(this.slot[e],yf,.3,0,0)}_write(e,t,n,r,i){let a=this.props;vf.multiplyMatrices(t,pf),vf.decompose(Sf,bf,Cf);let o=a.batch.data,s=e*16;o[s]=Sf.x,o[s+1]=Sf.y,o[s+2]=Sf.z,o[s+3]=n,o[s+4]=bf.x,o[s+5]=bf.y,o[s+6]=bf.z,o[s+7]=bf.w,o[s+9]=r,o[s+10]=0,o[s+11]=i,a.pos[e*4]=Sf.x,a.pos[e*4+1]=Sf.y,a.pos[e*4+2]=Sf.z,a.pos[e*4+3]=n,a.batch.upload()}_frame(e,t,n,r=.8){let i=this.camera;i.aspect=t/n,i.updateProjectionMatrix();let a=Math.tan(_f*Math.PI/360)*i.aspect,o=e*1.08/r/2/a;i.near=Math.max(.02,o-e*2),i.far=o+e*4,i.updateProjectionMatrix(),i.position.set(df.x,df.y+o*.06,df.z+o),i.lookAt(df.x,df.y,df.z),i.updateMatrixWorld()}_draw(e){s(this.camera,e.w,e.h,{block:this.block}),this.props.cull(this.camera,-(++this._cullToken||(this._cullToken=1))),this.renderer.render(this.scene,{camera:this.camera,frameBlock:this.block,kind:`color`,label:`fish portrait`,colorViews:[e.hdr.view()],colorFormats:[`rgba16float`],depthView:e.depth.view(),depthFormat:`depth32float`,clearColors:[[0,0,0,0]],clearDepth:0,defines:{STUDIO_LIGHTING:1}})}attach(e){return!Tf||!e||!navigator.gpu?!1:(this.canvas!==e&&(this.canvas=e,this.context=e.getContext(`webgpu`),this.format=navigator.gpu.getPreferredCanvasFormat(),this.context.configure({device:_e.device,format:this.format,alphaMode:`premultiplied`}),this.present=null),!0)}show(e,t){this.live={species:e,kg:t,t:0}}detach(){this.live=null}_liveTransform(e){let t=(e=>1-(1-Math.min(1,Math.max(0,e)))**3)(e/.7),n=Math.exp(-Math.max(0,e-.55)*4)*Math.sin(Math.max(0,e-.55)*9),r=-(1-t)*1.6+n*.05,i=(1-t)*.25,a=Math.sin(e*13)*.9*Math.exp(-e*1.6)*(e<.1?e*10:1);return{x:r,y:i,yaw:-(1-t)*.9+Math.sin(e*.55)*.2*t,roll:(1-t)*.5+Math.sin(e*.4+1)*.05,pitch:(1-t)*-.3+Math.sin(e*.7)*.03,curl:a,jaw:.12+.12*Math.max(0,Math.sin(e*5))*Math.exp(-e*.5)}}thumbnail(e){if(this.thumbs.has(e))return Promise.resolve(this.thumbs.get(e).url);if(this.pending.has(e))return this.pending.get(e);let t=new Promise(t=>this.queue.push({species:e,resolve:t}));return this.pending.set(e,t),t}thumbUrl(e){let t=this.thumbs.get(e);return t?t.url:(this.thumbnail(e),null)}_renderThumb(e){let{species:t}=e,n=this._target(`thumb`,hf*mf,340),r=pu[t].kg[0]*.4+pu[t].kg[1]*.6,i=this._place(t,r,{yaw:-.05,pitch:.02,curl:.06,jaw:.1});this.light.sweep=.45,this._frame(i,n.w,n.h,.84),this._draw(n),this.thumbTex||=new N({label:`portrait.thumb8`,width:hf,height:gf,format:`rgba8unorm`,usage:[`render`,`copySrc`]}),this.toThumb||=this._pass(`rgba8unorm`,()=>this.targets.thumb.hdr),this.toThumb.render({colorViews:[this.thumbTex.view()],clear:[0,0,0,0]});let a=hf*4,o=Math.ceil(a/256)*256,s=_e.device.createBuffer({label:`portrait.readback`,size:o*gf,usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST});_e.getEncoder().copyTextureToBuffer({texture:this.thumbTex.getGPU()},{buffer:s,bytesPerRow:o,rowsPerImage:gf},{width:hf,height:gf,depthOrArrayLayers:1}),this.busy=!0,_e.onSubmit(null,()=>{s.mapAsync(GPUMapMode.READ).then(async()=>{let n=new Uint8Array(s.getMappedRange()),r=new Uint8ClampedArray(a*gf);for(let e=0;e<gf;e++)r.set(n.subarray(e*o,e*o+a),e*a);s.unmap(),s.destroy();for(let e=0;e<r.length;e+=4){let t=r[e+3];t>0&&t<255&&(r[e]=Math.min(255,r[e]*255/t),r[e+1]=Math.min(255,r[e+1]*255/t),r[e+2]=Math.min(255,r[e+2]*255/t))}let i={url:null,pixels:r,width:hf,height:gf};i.url=await Df(r,hf,gf),this.thumbs.set(t,i),this.pending.delete(t),this.busy=!1,e.resolve(i.url),this.onThumb&&this.onThumb(t,i.url)}).catch(n=>{console.warn(`fish thumbnail failed`,n),this.busy=!1,this.pending.delete(t),e.resolve(null)})})}update(e){if(!_e.device)return;let t=this.live;if(t&&this.context){t.t+=e;let n=this.canvas,r=Math.min(2,globalThis.devicePixelRatio||1),i=Math.max(2,Math.min(1600,Math.round(n.clientWidth*r))),a=Math.max(2,Math.round(i*(n.clientHeight/Math.max(1,n.clientWidth))));(n.width!==i||n.height!==a)&&(n.width=i,n.height=a);let o=this._target(`live`,i*mf,a*mf),s=this._liveTransform(t.t),c=this._place(t.species,t.kg,s);this.light.sweep=-1.1+t.t*.32%2.6,this._frame(c,o.w,o.h,.78),this._draw(o),this.present||=this._pass(this.format,()=>this.targets.live.hdr),this.present.render({colorViews:[this.context.getCurrentTexture().createView()],clear:[0,0,0,0]});return}!this.busy&&this.queue.length&&this._renderThumb(this.queue.shift())}};async function Df(e,t,n){if(!Tf)return null;try{let r=typeof OffscreenCanvas<`u`?new OffscreenCanvas(t,n):Object.assign(document.createElement(`canvas`),{width:t,height:n});r.getContext(`2d`).putImageData(new ImageData(e,t,n),0,0);let i=r.convertToBlob?await r.convertToBlob({type:`image/png`}):await new Promise(e=>r.toBlob(e,`image/png`));return URL.createObjectURL(i)}catch{return null}}var Of=`
.gm-purse { position: absolute; top: var(--tw-edge); right: var(--tw-edge); display: flex; gap: var(--tw-3); align-items: center;
	padding: var(--tw-2) var(--tw-4); border-radius: 999px; font: 500 var(--tw-fs-lg) var(--tw-font); color: var(--tw-ink); pointer-events: none;
	transition: transform var(--tw-med) var(--tw-ease), right var(--tw-slow) var(--tw-ease); }
.tw-root[data-panel='open'] .gm-purse { right: calc(var(--tw-panel-w) + 2 * var(--tw-3)); }
.tw-root.is-photo .gm-panel { display: none; }
.gm-purse.is-bump { animation: gm-bump 420ms var(--tw-ease); }
@keyframes gm-bump { 30% { transform: scale(1.08); } }
.gm-money { font-family: var(--tw-mono); color: var(--tw-sun); font-weight: 600; }
.gm-cooler { display: flex; align-items: center; gap: var(--tw-2); color: var(--tw-ink-2); font-size: var(--tw-fs-md); }
.gm-cooler-bar { width: calc(64 * var(--tw-u)); height: calc(5 * var(--tw-u)); border-radius: 99px; background: var(--tw-fill-2); overflow: hidden; }
.gm-cooler-bar > span { display: block; height: 100%; width: 0; background: var(--tw-aqua); border-radius: inherit; transition: width var(--tw-med) var(--tw-ease); }
.gm-cooler.is-full .gm-cooler-bar > span { background: var(--tw-coral); }
.gm-fight { position: absolute; left: 50%; bottom: calc(max(calc(72 * var(--tw-u)), 13vh) + calc(58 * var(--tw-u))); transform: translateX(-50%);
	width: calc(360 * var(--tw-u)); padding: var(--tw-3) var(--tw-4); border-radius: var(--tw-r-lg); font: 500 var(--tw-fs-md) var(--tw-font); color: var(--tw-ink);
	opacity: 0; transition: opacity var(--tw-med) var(--tw-ease); pointer-events: none; }
.gm-fight.is-on { opacity: 1; }
.gm-fight-head { display: flex; justify-content: space-between; margin-bottom: var(--tw-2); }
.gm-fight-call { font-weight: 600; letter-spacing: 0.02em; }
.gm-fight-call.is-warn { color: var(--tw-coral); }
.gm-fight-call.is-good { color: var(--tw-aqua); }
.gm-fight-dist { font-family: var(--tw-mono); color: var(--tw-ink-2); }
.gm-tension { position: relative; height: calc(12 * var(--tw-u)); border-radius: 99px; background: var(--tw-fill-2); overflow: hidden; }
.gm-band { position: absolute; top: 0; bottom: 0; background: rgba(var(--tw-aqua-rgb), 0.28); border-left: 1px solid rgba(var(--tw-aqua-rgb), 0.6); border-right: 1px solid rgba(var(--tw-aqua-rgb), 0.6); }
.gm-danger { position: absolute; top: 0; bottom: 0; right: 0; width: 8%; background: rgba(255, 122, 133, 0.35); }
.gm-needle { position: absolute; top: -2px; bottom: -2px; width: 3px; margin-left: -1.5px; border-radius: 2px; background: var(--tw-ink); box-shadow: 0 0 8px rgba(255,255,255,0.6); }
.gm-needle.is-hot { background: var(--tw-coral); box-shadow: 0 0 10px var(--tw-coral); }
.gm-stamina { margin-top: var(--tw-2); display: flex; align-items: center; gap: var(--tw-2); color: var(--tw-ink-3); font-size: var(--tw-fs-sm); }
.gm-stamina-bar { flex: 1; height: calc(4 * var(--tw-u)); border-radius: 99px; background: var(--tw-fill-2); overflow: hidden; }
.gm-stamina-bar > span { display: block; height: 100%; background: var(--tw-sun); }
.gm-bite { position: absolute; left: 50%; top: 42%; transform: translate(-50%, -50%) scale(0.6); font: 800 calc(56 * var(--tw-u)) var(--tw-font);
	color: var(--tw-sun); text-shadow: 0 0 18px rgba(var(--tw-sun-rgb), 0.8), 0 2px 4px rgba(0,0,0,0.5); opacity: 0; pointer-events: none;
	transition: opacity 120ms, transform 200ms var(--tw-ease); }
.gm-bite.is-on { opacity: 1; transform: translate(-50%, -50%) scale(1); }
.gm-cast { position: absolute; left: 50%; top: 58%; transform: translateX(-50%); width: calc(140 * var(--tw-u)); height: calc(5 * var(--tw-u));
	border-radius: 99px; background: var(--tw-fill-2); overflow: hidden; opacity: 0; transition: opacity var(--tw-fast); pointer-events: none; }
.gm-cast.is-on { opacity: 1; }
.gm-cast > span { display: block; height: 100%; width: 0; background: linear-gradient(90deg, var(--tw-aqua), var(--tw-sun)); }
.gm-dot { position: absolute; left: 50%; top: 50%; width: 4px; height: 4px; margin: -2px; border-radius: 50%; background: rgba(255,255,255,0.7); box-shadow: 0 0 3px rgba(0,0,0,0.6); opacity: 0; pointer-events: none; }
.gm-dot.is-on { opacity: 1; }
.gm-panel { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -48%); width: calc(420 * var(--tw-u)); max-height: 70vh; display: flex; flex-direction: column;
	padding: var(--tw-4) var(--tw-5); border-radius: var(--tw-r-lg); font: 500 var(--tw-fs-md) var(--tw-font); color: var(--tw-ink);
	opacity: 0; pointer-events: none; transition: opacity var(--tw-med) var(--tw-ease), transform var(--tw-slow) var(--tw-ease); }
.gm-panel.is-open { opacity: 1; pointer-events: auto; transform: translate(-50%, -50%); }
.gm-panel h2 { margin: 0 0 var(--tw-1); font-size: calc(17 * var(--tw-u)); font-weight: 600; }
.gm-panel p.gm-sub { margin: 0 0 var(--tw-3); color: var(--tw-ink-3); font-size: var(--tw-fs-sm); }
.gm-list { overflow: auto; margin: 0 calc(-1 * var(--tw-2)); padding: 0 var(--tw-2); }
.gm-row { display: grid; grid-template-columns: 1fr auto auto auto; gap: var(--tw-3); align-items: center; padding: var(--tw-2) 0; border-bottom: 1px solid var(--tw-line); }
.gm-row .gm-kg, .gm-row .gm-val { font-family: var(--tw-mono); color: var(--tw-ink-2); }
.gm-row .gm-val { color: var(--tw-sun); }
.gm-row small { color: var(--tw-aqua); margin-left: var(--tw-1); }
.gm-empty { color: var(--tw-ink-3); padding: var(--tw-4) 0; text-align: center; }
.gm-foot { display: flex; justify-content: space-between; align-items: center; margin-top: var(--tw-3); gap: var(--tw-3); }
.gm-btn { font: 600 var(--tw-fs-md) var(--tw-font); color: #0b1418; background: var(--tw-aqua); border: 0; border-radius: 999px; padding: var(--tw-2) var(--tw-4); cursor: pointer; }
.gm-btn[disabled] { opacity: 0.4; cursor: default; }
.gm-btn.is-ghost { background: var(--tw-fill-2); color: var(--tw-ink); }
.gm-mini { font: 500 var(--tw-fs-sm) var(--tw-font); color: var(--tw-ink-2); background: var(--tw-fill); border: 1px solid var(--tw-line); border-radius: 999px; padding: 2px var(--tw-2); cursor: pointer; }
.gm-gauge { display: none; align-items: center; gap: var(--tw-2); color: var(--tw-ink-2); font-size: var(--tw-fs-md); }
.gm-gauge.is-on { display: flex; }
.gm-gauge b { font-family: var(--tw-mono); font-weight: 500; color: var(--tw-ink); }
.gm-fuel-bar > span { background: var(--tw-sun); }
.gm-fuel.is-low .gm-fuel-bar > span { background: var(--tw-coral); }
.gm-sonar-dots { letter-spacing: 1px; color: var(--tw-aqua); }
.gm-shop-row { display: grid; grid-template-columns: 1fr auto; gap: var(--tw-3); align-items: center; padding: var(--tw-2) 0; border-bottom: 1px solid var(--tw-line); }
.gm-shop-row small { display: block; color: var(--tw-ink-3); font-size: var(--tw-fs-sm); margin-top: 2px; }
.gm-shop-row .gm-have { color: var(--tw-ink-3); font-size: var(--tw-fs-sm); }
.gm-log { margin-top: var(--tw-3); color: var(--tw-ink-3); font-size: var(--tw-fs-sm); line-height: 1.5; }
.gm-row .gm-cm { font-family: var(--tw-mono); color: var(--tw-ink-3); }
.gm-row.has-cm { grid-template-columns: 1fr auto auto auto auto; }

/* catch card: full screen. The world dims and blurs; the fish lies side-on in its own studio light
   (FishPortrait, a WebGPU canvas) between the name above and the numbers below */
.gm-catch-scrim { position: absolute; inset: 0; pointer-events: none; opacity: 0; visibility: hidden;
	background: radial-gradient(70% 60% at 50% 50%, rgba(10, 22, 34, 0.55) 0%, rgba(4, 9, 15, 0.86) 100%);
	-webkit-backdrop-filter: blur(10px) saturate(0.8); backdrop-filter: blur(10px) saturate(0.8);
	transition: opacity 420ms var(--tw-ease), visibility 0s linear 420ms; }
.gm-catch-scrim.is-on { opacity: 1; visibility: visible; transition: opacity 420ms var(--tw-ease), visibility 0s; }
.gm-catch { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: clamp(6px, 1.4vh, 18px);
	padding: var(--tw-6) var(--tw-edge); color: #f4ead6; font: 500 var(--tw-fs-md) var(--tw-font); text-align: center;
	pointer-events: none; opacity: 0; visibility: hidden; transition: opacity 300ms var(--tw-ease), visibility 0s linear 300ms; }
.gm-catch.is-on { opacity: 1; visibility: visible; transition: opacity 300ms var(--tw-ease), visibility 0s; }
.gm-catch-top, .gm-catch-bottom { display: flex; flex-direction: column; align-items: center; opacity: 0; }
.gm-catch.is-on .gm-catch-top { animation: gm-rise 700ms var(--tw-ease) 120ms forwards; }
.gm-catch.is-on .gm-catch-bottom { animation: gm-rise 700ms var(--tw-ease) 520ms forwards; }
@keyframes gm-rise { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
.gm-catch-eyebrow { display: flex; align-items: center; justify-content: center; min-height: calc(26 * var(--tw-u)); margin-bottom: var(--tw-2);
	font-size: var(--tw-fs-sm); font-weight: 700; letter-spacing: 0.32em; text-transform: uppercase; color: rgba(244, 234, 214, 0.62); }
.gm-badge { display: inline-flex; align-items: center; gap: 0.5em; padding: calc(4 * var(--tw-u)) calc(12 * var(--tw-u)); border-radius: 4px;
	letter-spacing: 0.22em; font-weight: 800; transform: scale(2.4) rotate(-8deg); opacity: 0; }
.gm-catch.is-on .gm-badge { animation: gm-stamp 520ms cubic-bezier(0.3, 1.5, 0.5, 1) 900ms forwards; }
.gm-badge.is-record { color: #2a1604; background: linear-gradient(100deg, #f3cf8a 0%, #d9a441 40%, #fff0cf 50%, #d9a441 60%, #f3cf8a 100%); background-size: 250% 100%;
	box-shadow: 0 0 0 2px rgba(42, 22, 4, 0.35) inset, 0 0 26px rgba(217, 164, 65, 0.55); }
.gm-catch.is-on .gm-badge.is-record { animation: gm-stamp 520ms cubic-bezier(0.3, 1.5, 0.5, 1) 900ms forwards, gm-shine 2.6s var(--tw-ease-io) 1.6s infinite; }
.gm-badge.is-new { color: #062420; background: #6fd6c6; box-shadow: 0 0 0 2px rgba(6, 36, 32, 0.3) inset, 0 0 22px rgba(111, 214, 198, 0.45); }
.gm-badge.is-plain { color: rgba(244, 234, 214, 0.8); background: none; box-shadow: inset 0 0 0 1px rgba(244, 234, 214, 0.35); }
@keyframes gm-stamp { 0% { transform: scale(2.4) rotate(-8deg); opacity: 0; } 70% { transform: scale(0.94) rotate(-3deg); opacity: 1; } 100% { transform: scale(1) rotate(-3deg); opacity: 1; } }
@keyframes gm-shine { 0% { background-position: 100% 0; } 100% { background-position: -150% 0; } }
.gm-catch h2 { margin: 0; font-family: 'Caveat Brush', 'Kalam', var(--tw-font); font-weight: 400; font-size: clamp(38px, 6.2vw, 92px); line-height: 1; letter-spacing: 0.01em;
	color: #fbf1dc; text-shadow: 0 2px 0 rgba(0, 0, 0, 0.35), 0 8px 30px rgba(0, 0, 0, 0.45); }
.gm-catch-sci { margin-top: calc(4 * var(--tw-u)); font-family: 'Kalam', var(--tw-font); font-style: italic; color: rgba(244, 234, 214, 0.66); font-size: clamp(13px, 1.3vw, 19px); }
.gm-catch-stage { position: relative; width: min(94vw, 1400px, calc(46vh * 2.4)); aspect-ratio: 2.4 / 1; }
.gm-catch-stage canvas { position: absolute; inset: 0; width: 100%; height: 100%;
	-webkit-mask-image: linear-gradient(90deg, transparent 0%, #000 14%, #000 86%, transparent 100%); mask-image: linear-gradient(90deg, transparent 0%, #000 14%, #000 86%, transparent 100%); }
/* the card owns the screen: the minimap and the settings rail step aside */
.tw-root:has(.gm-catch.is-on) .gm-map, .tw-root:has(.gm-catch.is-on) .tw-rail { opacity: 0; pointer-events: none; transition: opacity 300ms; }
.gm-catch-stage::before { content: ''; position: absolute; left: 12%; right: 12%; bottom: 6%; height: 16%; border-radius: 50%;
	background: radial-gradient(closest-side, rgba(0, 0, 0, 0.5), transparent); opacity: 0; }
.gm-catch.is-on .gm-catch-stage::before { animation: gm-fade 900ms var(--tw-ease) 350ms forwards; }
@keyframes gm-fade { to { opacity: 1; } }
.gm-splash { position: absolute; left: 50%; top: 52%; width: 0; height: 0; pointer-events: none; }
.gm-splash i { position: absolute; left: 0; top: 0; width: var(--s); height: var(--s); margin: calc(var(--s) / -2); border-radius: 50%;
	background: radial-gradient(circle at 35% 35%, rgba(255, 255, 255, 0.95), rgba(190, 235, 245, 0.55) 55%, transparent 72%); opacity: 0; }
.gm-catch.is-on .gm-splash i { animation: gm-drop 1100ms cubic-bezier(0.2, 0.7, 0.3, 1) var(--d) forwards; }
@keyframes gm-drop { 0% { opacity: 0; transform: translate(0, 0) scale(0.4); } 12% { opacity: 1; }
	100% { opacity: 0; transform: translate(var(--x), var(--y)) scale(1); } }
.gm-catch-stats { display: flex; justify-content: center; gap: clamp(8px, 1.6vw, 22px); margin-top: var(--tw-2); }
.gm-stat { min-width: clamp(96px, 11vw, 150px); padding: calc(10 * var(--tw-u)) calc(16 * var(--tw-u)) calc(9 * var(--tw-u)); border-radius: 6px;
	background: linear-gradient(180deg, rgba(232, 220, 192, 0.12), rgba(232, 220, 192, 0.05)); box-shadow: inset 0 0 0 1px rgba(214, 180, 110, 0.38), 0 10px 30px rgba(0, 0, 0, 0.25); }
.gm-stat span { display: block; font-size: var(--tw-fs-xs); font-weight: 700; letter-spacing: 0.22em; text-transform: uppercase; color: rgba(222, 190, 125, 0.9); }
.gm-stat b { display: block; margin-top: calc(4 * var(--tw-u)); font: 600 clamp(20px, 2.2vw, 32px) var(--tw-mono); color: #fbf1dc; white-space: nowrap; }
.gm-stat b small { font-size: 0.55em; font-weight: 500; color: rgba(244, 234, 214, 0.7); margin-left: 0.2em; }
.gm-stat i { display: block; white-space: nowrap; font-style: normal; font-family: var(--tw-mono); font-size: var(--tw-fs-sm); color: rgba(244, 234, 214, 0.5); margin-top: 2px; }
.gm-stat.is-value b { color: #f0c46a; }
.gm-catch-note { margin-top: var(--tw-3); min-height: 1.4em; color: rgba(244, 234, 214, 0.78); font-family: 'Kalam', var(--tw-font); font-size: clamp(14px, 1.25vw, 19px); line-height: 1.4; }
.gm-catch-note b { color: #f0c46a; font-weight: 700; }
.gm-catch-note.is-warn { color: #ff9a8a; }
.gm-catch-foot { display: flex; align-items: center; justify-content: center; gap: var(--tw-2); margin-top: var(--tw-3); color: rgba(244, 234, 214, 0.5); font-size: var(--tw-fs-sm); }
.gm-catch-foot kbd { font: 600 var(--tw-fs-xs) var(--tw-mono); color: #f4ead6; padding: 2px calc(6 * var(--tw-u)); border-radius: 4px; border: 1px solid rgba(244, 234, 214, 0.3); background: rgba(244, 234, 214, 0.08); }
.gm-catch-timer { width: calc(80 * var(--tw-u)); height: 2px; margin-left: var(--tw-2); border-radius: 2px; background: rgba(244, 234, 214, 0.15); overflow: hidden; }
.gm-catch-timer > span { display: block; height: 100%; width: 100%; background: rgba(244, 234, 214, 0.55); transform-origin: 0 50%; }
.gm-catch.is-on .gm-catch-timer > span { animation: gm-timer var(--gm-catch-ms, 9000ms) linear forwards; }
@keyframes gm-timer { from { transform: scaleX(1); } to { transform: scaleX(0); } }
@media (prefers-reduced-motion: reduce) {
	.gm-catch.is-on .gm-catch-top, .gm-catch.is-on .gm-catch-bottom { animation: none; opacity: 1; }
	.gm-catch.is-on .gm-badge, .gm-catch.is-on .gm-badge.is-record { animation: none; transform: rotate(-3deg); opacity: 1; }
	.gm-catch.is-on .gm-splash i { animation: none; }
}
@media (max-width: 640px) {
	.gm-catch-stage { width: 96vw; }
	.gm-catch-stats { gap: 6px; }
	.gm-stat { min-width: 0; padding: 8px 10px; }
}
`,kf=(e,t,n)=>{let r=document.createElement(e);return t&&(r.className=t),n!==void 0&&(r.innerHTML=n),r},Af=class{constructor(e,t){this.ui=e,this.game=t;let n=kf(`style`);n.textContent=Of,document.head.append(n),this.purse=kf(`div`,`gm-purse tw-glass`,`<span class="gm-money">$0</span><span class="gm-cooler"><span class="gm-cooler-label">Cooler</span><span class="gm-cooler-bar"><span></span></span><span class="gm-cooler-kg">0 / 30 kg</span></span><span class="gm-gauge gm-fuel"><span>Fuel</span><span class="gm-cooler-bar gm-fuel-bar"><span></span></span><b class="gm-fuel-l">40 L</b></span><span class="gm-gauge gm-sonar"><span>Sonar</span><b class="gm-sonar-d">0 m</b><span class="gm-sonar-dots"></span></span>`),this.fuelEl=this.purse.querySelector(`.gm-fuel`),this.fuelBar=this.purse.querySelector(`.gm-fuel-bar > span`),this.fuelL=this.purse.querySelector(`.gm-fuel-l`),this.sonarEl=this.purse.querySelector(`.gm-sonar`),this.sonarD=this.purse.querySelector(`.gm-sonar-d`),this.sonarDots=this.purse.querySelector(`.gm-sonar-dots`),this.moneyEl=this.purse.querySelector(`.gm-money`),this.coolerEl=this.purse.querySelector(`.gm-cooler`),this.coolerBar=this.purse.querySelector(`.gm-cooler-bar > span`),this.coolerKg=this.purse.querySelector(`.gm-cooler-kg`),this.coolerLabel=this.purse.querySelector(`.gm-cooler-label`),this.fight=kf(`div`,`gm-fight tw-glass`,`
			<div class="gm-fight-head"><span class="gm-fight-call">Fish on!</span><span class="gm-fight-dist">0 m</span></div>
			<div class="gm-tension"><span class="gm-band"></span><span class="gm-danger"></span><span class="gm-needle"></span></div>
			<div class="gm-stamina"><span>Fish</span><span class="gm-stamina-bar"><span></span></span></div>`),this.fCall=this.fight.querySelector(`.gm-fight-call`),this.fDist=this.fight.querySelector(`.gm-fight-dist`),this.fBand=this.fight.querySelector(`.gm-band`),this.fNeedle=this.fight.querySelector(`.gm-needle`),this.fStam=this.fight.querySelector(`.gm-stamina-bar > span`),this.bite=kf(`div`,`gm-bite`,`!`),this.cast=kf(`div`,`gm-cast`,`<span></span>`),this.castBar=this.cast.firstChild,this.dot=kf(`div`,`gm-dot`),this.catchScrim=kf(`div`,`gm-catch-scrim`),this.catchCard=kf(`div`,`gm-catch tw-glass`),this.catchOpen=!1,(e.hud||e.root).append(this.catchScrim,this.purse,this.fight,this.bite,this.cast,this.dot,this.catchCard),this.inv=kf(`div`,`gm-panel tw-glass tw-interactive`),this.stand=kf(`div`,`gm-panel tw-glass tw-interactive`),e.root.append(this.inv,this.stand),this.invOpen=!1,this.standOpen=!1,this._last={},t.state.onChange(()=>this.refresh()),this.refresh()}toast(e,t){this.ui.toast(e,t)}refresh(){let e=this.game.state,t=e.stats;this.moneyEl.textContent=`$${e.money.toLocaleString()}`;let n=e.holdKg;this.coolerLabel.textContent=e.upgrades.hold>0?`Hold`:`Cooler`,this.coolerKg.textContent=`${n.toFixed(1)} / ${t.holdKg} kg`,this.coolerBar.style.width=`${Math.min(100,n/t.holdKg*100)}%`,this.coolerEl.classList.toggle(`is-full`,n>t.holdKg*.9),this._last.money!==void 0&&this._last.money!==e.money&&(this.purse.classList.remove(`is-bump`),this.purse.offsetWidth,this.purse.classList.add(`is-bump`)),this._last.money=e.money,this.invOpen&&this.renderInventory(),this.standOpen&&(this.vendor&&this.vendor.kind===`shop`?this.renderShop():this.renderStand())}update({fight:e,casting:t,power:n,bite:r,aiming:i,fuel:a=null,sonar:o=null}){if(this.fuelEl.classList.toggle(`is-on`,!!a),a&&(this.fuelBar.style.width=`${a.litres/a.tank*100}%`,this.fuelL.textContent=`${a.litres.toFixed(0)} L`,this.fuelEl.classList.toggle(`is-low`,a.litres<a.tank*.15)),this.sonarEl.classList.toggle(`is-on`,!!o),o){this.sonarD.textContent=`${o.depth.toFixed(1)} m`;let e=Math.round(o.fish*4);this.sonarDots.textContent=`●`.repeat(e)+`○`.repeat(4-e)}if(this.fight.classList.toggle(`is-on`,!!e),e){let t=Math.min(e.tension,1.05);this.fNeedle.style.left=`${t/1.05*100}%`,this.fNeedle.classList.toggle(`is-hot`,e.tension>e.band[1]),this.fBand.style.left=`${e.band[0]/1.05*100}%`,this.fBand.style.width=`${(e.band[1]-e.band[0])/1.05*100}%`,this.fStam.style.width=`${e.stamina*100}%`,this.fDist.textContent=`${e.distance.toFixed(1)} m`;let n=`Reel in`,r=``;e.tension>.88?(n=`Ease off!`,r=`is-warn`):e.surge>.55?(n=`It's running!`,r=`is-warn`):e.tension<.15?(n=`Slack line!`,r=`is-warn`):e.tension>=e.band[0]&&e.tension<=e.band[1]&&(n=`Good pressure`,r=`is-good`),this.fCall.textContent=n,this.fCall.className=`gm-fight-call `+r}this.bite.classList.toggle(`is-on`,!!r),this.cast.classList.toggle(`is-on`,!!t),t&&(this.castBar.style.width=`${n*100}%`),this.dot.classList.toggle(`is-on`,!!i&&!this.invOpen&&!this.standOpen)}showCatch(e,t=9e3){let n=pu[e.species],r=e.cm/2.54,i=e.kg*2.20462,a=e.record?`<span class="gm-badge is-record">★ New record</span>`:e.newSpecies?`<span class="gm-badge is-new">New species</span>`:`<span class="gm-badge is-plain">Catch</span>`,o;o=e.kept?e.record?`<div class="gm-catch-note">Previous best <b>${e.prevBestKg.toFixed(2)} kg</b> · ${e.prevBestCm} cm. Beaten by ${(e.kg-e.prevBestKg).toFixed(2)} kg.</div>`:e.newSpecies?`<div class="gm-catch-note">First one in your fish log.</div>`:`<div class="gm-catch-note">Your best: ${e.prevBestKg.toFixed(2)} kg · ${e.prevBestCm} cm</div>`:`<div class="gm-catch-note is-warn">No room in the ${this.game.state.upgrades.hold>0?`hold`:`cooler`} · you let it go</div>`;let s=``;for(let e=0;e<26;e++){let t=e/26*Math.PI*2+Math.random()*.3,n=90+Math.random()*260;s+=`<i style="--s:${(4+Math.random()*12).toFixed(1)}px;--x:${(Math.cos(t)*n*1.8).toFixed(0)}px;--y:${(Math.sin(t)*n*.55-40).toFixed(0)}px;--d:${(250+Math.random()*220).toFixed(0)}ms"></i>`}let c=this.catchCard;c.style.setProperty(`--gm-catch-ms`,`${t}ms`),c.innerHTML=`
			<div class="gm-catch-top">
				<div class="gm-catch-eyebrow">${a}</div>
				<h2>${n.name}</h2>
				<div class="gm-catch-sci">${n.sci||``}</div>
			</div>
			<div class="gm-catch-stage"><canvas></canvas><div class="gm-splash">${s}</div></div>
			<div class="gm-catch-bottom">
				<div class="gm-catch-stats">
					<div class="gm-stat"><span>Length</span><b>${e.cm}<small>cm</small></b><i>${r.toFixed(1)} in</i></div>
					<div class="gm-stat"><span>Weight</span><b>${e.kg<1?e.kg.toFixed(2):e.kg.toFixed(1)}<small>kg</small></b><i>${i.toFixed(1)} lb</i></div>
					<div class="gm-stat is-value"><span>Value</span><b>$${e.value}</b><i>${e.kept?`in the cooler`:`let go`}</i></div>
				</div>
				${o}
				<div class="gm-catch-foot"><kbd>Click</kbd> or <kbd>E</kbd> to continue<span class="gm-catch-timer"><span></span></span></div>
			</div>`,c.classList.remove(`is-on`),c.offsetWidth,c.classList.add(`is-on`),this.catchScrim.classList.add(`is-on`),this.catchOpen=!0;try{this.portrait||=new Ef,this.portrait.attach(c.querySelector(`.gm-catch-stage canvas`))&&this.portrait.show(e.species,e.kg)}catch(e){console.warn(`fish portrait unavailable`,e)}}hideCatch(){this.catchCard.classList.remove(`is-on`),this.catchScrim.classList.remove(`is-on`),this.catchOpen=!1,this.portrait&&this.portrait.detach()}toggleInventory(e){this.invOpen=e??!this.invOpen,this.invOpen&&(this.closeStand(),this.renderInventory(),jf()),this.inv.classList.toggle(`is-open`,this.invOpen)}renderInventory(){let e=this.game.state,t=e.inventory.map(e=>`<div class="gm-row has-cm"><span>${pu[e.species].name}${e.record?`<small>record</small>`:``}</span><span class="gm-cm">${e.cm??Math.round(gu(e.species,e.kg))} cm</span><span class="gm-kg">${e.kg.toFixed(2)} kg</span><span class="gm-val">$${e.value}</span><button class="gm-mini" data-release="${e.id}">Release</button></div>`).join(``),n=Object.entries(e.log).filter(([e])=>pu[e]).map(([e,t])=>`${pu[e].name}: ${t.count} caught, best ${t.bestKg.toFixed(2)} kg · ${t.bestCm??Math.round(gu(e,t.bestKg))} cm`).join(`<br>`);this.inv.innerHTML=`
			<h2>${e.upgrades.hold>0?`Fish hold`:`Cooler`}</h2>
			<p class="gm-sub">${e.inventory.length} fish · ${e.holdKg.toFixed(1)} of ${e.stats.holdKg} kg · worth $${e.holdValue}</p>
			<div class="gm-list">${t||`<div class="gm-empty">Nothing yet. Cast from the pier, the beach or the boat.</div>`}</div>
			${n?`<div class="gm-log"><b>Fish log</b><br>${n}</div>`:``}
			<div class="gm-foot"><span class="gm-sub">Sell at the fish stand by the pier</span><button class="gm-btn is-ghost" data-close>Close (I)</button></div>`,this.inv.querySelector(`[data-close]`).onclick=()=>this.toggleInventory(!1);for(let t of this.inv.querySelectorAll(`[data-release]`))t.onclick=()=>e.release(Number(t.dataset.release))}openStand(e){this.standOpen=!0,this.vendor=e,this.toggleInventory(!1),e.kind===`shop`?this.renderShop():this.renderStand(),this.stand.classList.add(`is-open`),jf()}closeStand(){this.standOpen=!1,this.stand.classList.remove(`is-open`)}renderStand(){let e=this.game.state,t=this.vendor||{name:`Fish buyer`},n=e.inventory.map(e=>`<div class="gm-row has-cm"><span>${pu[e.species].name}</span><span class="gm-cm">${e.cm??Math.round(gu(e.species,e.kg))} cm</span><span class="gm-kg">${e.kg.toFixed(2)} kg</span><span class="gm-val">$${e.value}</span><button class="gm-mini" data-sell="${e.id}">Sell</button></div>`).join(``);this.stand.innerHTML=`
			<h2>${t.name}</h2>
			<p class="gm-sub">${e.inventory.length?t.greeting||`Let's see what you caught.`:t.idle||`Come back when you've got fish.`}</p>
			<div class="gm-list">${n||`<div class="gm-empty">Your cooler is empty.</div>`}</div>
			<div class="gm-foot"><button class="gm-btn is-ghost" data-close>Leave (E)</button><button class="gm-btn" data-all ${e.inventory.length?``:`disabled`}>Sell all · $${e.holdValue}</button></div>`,this.stand.querySelector(`[data-close]`).onclick=()=>this.closeStand(),this.stand.querySelector(`[data-all]`).onclick=()=>this.game.sellAll();for(let e of this.stand.querySelectorAll(`[data-sell]`))e.onclick=()=>this.game.sell([Number(e.dataset.sell)])}};Af.prototype.renderShop=function(){let e=this.game.state,t=this.vendor,n=Object.entries(wu).map(([t,n])=>{let r=n.levels[e.upgrades[t]|0],i=Du(e.upgrades,t),a=i?`<button class="gm-btn" data-buy="${t}" ${i.cost>e.money?`disabled`:``}>$${i.cost}</button>`:`<span class="gm-have">Top of the line</span>`;return`<div class="gm-shop-row"><span>${n.name}: ${i?i.label:r.label}<small>Now: ${r.label}</small></span>${a}</div>`}).join(``),r=e.stats.fuelL-e.fuelL,i=`<div class="gm-shop-row"><span>Diesel · $${Tu.toFixed(2)} / L<small>Tank: ${e.fuelL.toFixed(0)} of ${e.stats.fuelL} L</small></span>${r>.5?`<button class="gm-btn" data-fuel ${e.money<1.5?`disabled`:``}>Fill · $${e.refuelCost()}</button>`:`<span class="gm-have">Full</span>`}</div>`;this.stand.innerHTML=`
		<h2>${t.name}</h2>
		<p class="gm-sub">${t.greeting} · You have $${e.money.toLocaleString()}</p>
		<div class="gm-list">${i}${n}</div>
		<div class="gm-foot"><span class="gm-sub">Upgrades take effect at once</span><button class="gm-btn is-ghost" data-close>Leave (E)</button></div>`,this.stand.querySelector(`[data-close]`).onclick=()=>this.closeStand();for(let e of this.stand.querySelectorAll(`[data-buy]`))e.onclick=()=>this.game.buy(e.dataset.buy);let a=this.stand.querySelector(`[data-fuel]`);a&&(a.onclick=()=>this.game.refuel())};function jf(){try{document.pointerLockElement&&document.exitPointerLock&&document.exitPointerLock()}catch{}}var Mf=640,Nf=1280,Pf=-640,Ff=-180-Nf/2,If=Mf/Nf,Lf=48,Rf=`
.gm-map { position: absolute; right: var(--tw-edge); bottom: var(--tw-edge); width: calc(184 * var(--tw-u)); height: calc(184 * var(--tw-u));
	border-radius: 50%; padding: calc(5 * var(--tw-u)); pointer-events: none;
	transition: right var(--tw-slow) var(--tw-ease), opacity var(--tw-med) var(--tw-ease); }
.tw-root[data-panel='open'] .gm-map { right: calc(var(--tw-panel-w) + 2 * var(--tw-3)); }
.gm-map-view { position: relative; width: 100%; height: 100%; border-radius: 50%; overflow: hidden; background: #0b2c48;
	box-shadow: inset 0 0 0 1px rgba(255,255,255,0.08), inset 0 0 18px rgba(0,0,0,0.45); }
.gm-map-view canvas { position: absolute; left: 0; top: 0; width: ${Mf}px; height: ${Mf}px; transform-origin: 0 0; image-rendering: auto; }
.gm-map-vig { position: absolute; inset: 0; border-radius: 50%; pointer-events: none;
	background: radial-gradient(circle at 50% 50%, transparent 58%, rgba(4, 12, 20, 0.45) 100%); }
.gm-map-marks { position: absolute; inset: 0; }
.gm-mk { position: absolute; left: 0; top: 0; width: 0; height: 0; }
.gm-mk > i { position: absolute; left: 0; top: 0; display: grid; place-items: center; width: calc(20 * var(--tw-u)); height: calc(20 * var(--tw-u));
	margin: calc(-10 * var(--tw-u)) 0 0 calc(-10 * var(--tw-u)); border-radius: 50%; font: 700 calc(10 * var(--tw-u)) var(--tw-font); font-style: normal;
	color: #0b1418; box-shadow: 0 1px 3px rgba(0,0,0,0.55), 0 0 0 1.5px rgba(255,255,255,0.85); }
.gm-mk > i svg { width: 64%; height: 64%; }
.gm-mk.is-joe > i { background: var(--tw-sun); }
.gm-mk.is-marta > i { background: var(--tw-aqua); }
.gm-mk.is-boat > i { background: #f2efe6; }
.gm-mk > b { position: absolute; left: 0; top: 0; width: 0; height: 0; border-left: calc(5 * var(--tw-u)) solid transparent; border-right: calc(5 * var(--tw-u)) solid transparent;
	border-bottom: calc(7 * var(--tw-u)) solid rgba(255,255,255,0.9); margin: calc(-19 * var(--tw-u)) 0 0 calc(-5 * var(--tw-u)); transform-origin: calc(5 * var(--tw-u)) calc(19 * var(--tw-u)); display: none; }
.gm-mk.is-edge > b { display: block; }
.gm-mk.is-edge > i { transform: scale(0.82); }
.gm-mk.is-hot > i { animation: gm-map-pulse 1.3s var(--tw-ease-io) infinite; }
@keyframes gm-map-pulse { 0%, 100% { box-shadow: 0 1px 3px rgba(0,0,0,0.55), 0 0 0 1.5px rgba(255,255,255,0.85), 0 0 0 0 rgba(255,255,255,0.6); }
	60% { box-shadow: 0 1px 3px rgba(0,0,0,0.55), 0 0 0 1.5px rgba(255,255,255,0.85), 0 0 0 calc(10 * var(--tw-u)) rgba(255,255,255,0); } }
.gm-map-me { position: absolute; left: 50%; top: 50%; width: 0; height: 0; }
.gm-map-me svg { position: absolute; width: calc(18 * var(--tw-u)); height: calc(18 * var(--tw-u)); left: calc(-9 * var(--tw-u)); top: calc(-10 * var(--tw-u));
	filter: drop-shadow(0 1px 2px rgba(0,0,0,0.6)); }
.gm-map-n { position: absolute; left: 0; top: 0; width: calc(14 * var(--tw-u)); height: calc(14 * var(--tw-u)); margin: calc(-7 * var(--tw-u)) 0 0 calc(-7 * var(--tw-u));
	border-radius: 50%; display: grid; place-items: center; font: 700 calc(9 * var(--tw-u)) var(--tw-font); color: #0b1418; background: rgba(255,255,255,0.9);
	box-shadow: 0 1px 2px rgba(0,0,0,0.5); }
.gm-map-fish { position: absolute; left: 0; top: 0; width: 0; height: 0; opacity: 0; transition: opacity 600ms var(--tw-ease); }
.gm-map-fish.is-on { opacity: 0.9; }
.gm-map-fish > i { position: absolute; left: calc(-12 * var(--tw-u)); top: calc(-12 * var(--tw-u)); width: calc(24 * var(--tw-u)); height: calc(24 * var(--tw-u));
	border-radius: 50%; border: 1.5px solid rgba(var(--tw-aqua-rgb), 0.9); animation: gm-map-ring 2.2s var(--tw-ease-io) infinite; }
.gm-map-fish > i + i { animation-delay: -1.1s; }
@keyframes gm-map-ring { 0% { transform: scale(0.45); } 100% { transform: scale(1.15); border-color: rgba(var(--tw-aqua-rgb), 0); } }
.gm-map-label { position: absolute; left: 50%; bottom: calc(-2 * var(--tw-u)); transform: translate(-50%, 100%); padding-top: calc(4 * var(--tw-u));
	font: 500 var(--tw-fs-xs) var(--tw-mono); color: var(--tw-ink-3); white-space: nowrap; text-shadow: 0 1px 2px rgba(0,0,0,0.7); display: none; }
/* short windows: the settings rail (right, vertically centred) reaches down to the corner */
@media (max-height: 860px) { .gm-map { right: calc(var(--tw-edge) + 58 * var(--tw-u)); } }
@media (max-width: 640px) { .gm-map { width: calc(128 * var(--tw-u)); height: calc(128 * var(--tw-u)); } }
@media (prefers-reduced-motion: reduce) { .gm-mk.is-hot > i, .gm-map-fish > i { animation: none; } }
`,zf={fish:`<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 12c3-4 7-6 11-6 3 0 5 2 7 4l-2 2 2 2c-2 2-4 4-7 4-4 0-8-2-11-6Zm12-1.2a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4Z"/></svg>`,anchor:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><circle cx="12" cy="5" r="2"/><path d="M12 7v13M7 11h10M4 14c1 4 4 6 8 6s7-2 8-6"/></svg>`,boat:`<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3v9H6l6-9Zm1 2 5 7h-5V5ZM3 14h18l-3 5H6l-3-5Z"/></svg>`},Bf=(e,t,n)=>{let r=document.createElement(e);return t&&(r.className=t),n!==void 0&&(r.innerHTML=n),r},Vf=(e,t,n)=>[e[0]+(t[0]-e[0])*n,e[1]+(t[1]-e[1])*n,e[2]+(t[2]-e[2])*n],Hf=e=>Math.min(1,Math.max(0,e)),Uf=(e,t,n)=>{let r=Hf((n-e)/(t-e));return r*r*(3-2*r)},Wf={deep:[12,44,78],mid:[22,104,150],shallow:[62,186,190],foam:[186,232,226],grassSea:[34,110,108],rubble:[30,84,104],sand:[232,216,172],wet:[206,190,150],grass:[128,160,88],scrub:[88,128,64],forest:[52,92,50],rock:[132,134,126],path:[205,182,136],scarp:[176,146,104],pad:[196,184,162]},Gf=class{constructor(e,t){this.game=t;let n=Bf(`style`);n.textContent=Rf,document.head.append(n),this.el=Bf(`div`,`gm-map tw-glass`,`<div class="gm-map-view"><canvas width="${Mf}" height="${Mf}"></canvas><div class="gm-map-vig"></div>
			<div class="gm-map-marks"></div>
			<div class="gm-map-me"><svg viewBox="0 0 24 24"><path d="M12 2 20 21 12 16.5 4 21Z" fill="#fff" stroke="#0b1418" stroke-width="1.4" stroke-linejoin="round"/></svg></div></div>`),this.el.setAttribute(`aria-hidden`,`true`),this.view=this.el.querySelector(`.gm-map-view`),this.canvas=this.el.querySelector(`canvas`),this.marks=this.el.querySelector(`.gm-map-marks`),e.append(this.el);let r=(e,t)=>{let n=Bf(`div`,`gm-mk is-`+e,`<b></b><i>${t}</i>`);return this.marks.append(n),{el:n,arrow:n.firstChild}};this.markers=[{id:`joe`,...r(`joe`,zf.fish),pos:()=>({x:Fd.x,z:Fd.z})},{id:`marta`,...r(`marta`,zf.anchor),pos:()=>({x:Kd.x,z:Kd.z})},{id:`boat`,...r(`boat`,zf.boat),pos:()=>{let e=t.app.boatCtl;return e?{x:e.position.x,z:e.position.z}:null},hideWhen:()=>{let e=t.app.player;return e.mode===`boat`||e.mode===`deck`}}],this.north=Bf(`div`,`gm-map-n`,`N`),this.marks.append(this.north),this.fish=[Bf(`div`,`gm-map-fish`,`<i></i><i></i>`),Bf(`div`,`gm-map-fish`,`<i></i><i></i>`)],this.fish.forEach(e=>this.marks.prepend(e)),this._fishPts=[],this._fishT=0,this.radiusM=110,this._hot=new Set,this._size=0,this._bake={row:0,ctx:this.canvas.getContext(`2d`),img:null,h:null,done:!1},this._bake.img=this._bake.ctx.createImageData(Mf,Mf),this._bake.h=new Float32Array(Mf*Mf),this._viewSize=-1,typeof ResizeObserver<`u`&&(this._ro=new ResizeObserver(()=>{this._viewSize=this.view.clientWidth}),this._ro.observe(this.view))}_setStyle(e,t,n){let r=`__gm_`+t;e[r]!==n&&(e[r]=n,e.style[t]=n)}_toggle(e,t,n){let r=`__gm_c_`+t;e[r]!==n&&(e[r]=n,e.classList.toggle(t,n))}highlight(e=[]){this._hot=new Set(e);for(let e of this.markers)this._toggle(e.el,`is-hot`,this._hot.has(e.id))}_bakeStep(){let e=this._bake;if(e.done)return;let t=this.game.app.terrainData,n=t.res,r=t.texel,i=t.origin,a=(e,t)=>{let a=Math.floor((e-i)/r),o=Math.floor((t-i)/r);return a<0||o<0||a>=n||o>=n?-1:o*n+a},o=e.img.data,s=Math.min(Mf,e.row+Lf);for(let n=e.row;n<s;n++)for(let r=0;r<Mf;r++){let i=Pf+(r+.5)/If,s=Ff+(n+.5)/If,c=t.heightAt(i,s);e.h[n*Mf+r]=c;let l=a(i,s),u;if(c<0){let e=-c;u=e<6?Vf(Wf.shallow,Wf.mid,Uf(.3,6,e)):Vf(Wf.mid,Wf.deep,Uf(6,40,e)),l>=0&&(u=Vf(u,Wf.grassSea,t.seagrass[l]/255*.55),u=Vf(u,Wf.rubble,t.rubble[l]/255*.6)),u=Vf(u,Wf.foam,Uf(.5,0,e)*.45)}else{let e=l>=0?t.rock[l]:0,n=l>=0?t.sand[l]/255:0;u=Vf(Wf.grass,Wf.scrub,Uf(4,16,c)),u=Vf(u,Wf.forest,Uf(12,40,c)),u=Vf(u,Wf.sand,Math.max(n,Uf(1.6,.4,c))),u=Vf(u,Wf.wet,Uf(.5,0,c)*.6),u=Vf(u,Wf.rock,Uf(.35,.7,e)),l>=0&&(u=Vf(u,Wf.path,t.path[l]/255*.85),u=Vf(u,Wf.scarp,t.scarp[l]/255*.5));let r=2.5,a=(t.heightAt(i+r,s)-t.heightAt(i-r,s))/(2*r),o=(t.heightAt(i,s+r)-t.heightAt(i,s-r))/(2*r),d=.7+.45*Hf((-a*-.6+-o*-.6+.53)/Math.sqrt(a*a+o*o+1)/.53);u=[u[0]*d,u[1]*d,u[2]*d]}let d=(n*Mf+r)*4;o[d]=u[0],o[d+1]=u[1],o[d+2]=u[2],o[d+3]=255}if(e.row=s,e.row<Mf)return;for(let t=1;t<639;t++)for(let n=1;n<639;n++){let r=t*Mf+n;if(e.h[r]>=0&&(e.h[r-1]<0||e.h[r+1]<0||e.h[r-Mf]<0||e.h[r+Mf]<0)){let e=r*4;o[e]=o[e]*.3+171.5,o[e+1]=o[e+1]*.3+168.7,o[e+2]=o[e+2]*.3+159.6}}let c=e.ctx;c.putImageData(e.img,0,0);let l=(e,t)=>[(e-Pf)*If,(t-Ff)*If];c.fillStyle=`rgb(${Wf.pad.join(`,`)})`;for(let e of t.pads||[]){let[t,n]=l(e.x,e.z),r=Math.max(1.5,e.radius*.8*If);c.fillRect(t-r,n-r,2*r,2*r)}let u=z.pier;c.fillStyle=`#d9c7a0`,c.strokeStyle=`rgba(40, 30, 20, 0.55)`,c.lineWidth=.6;let[d,f]=l(u.x-Math.max(u.width,3)/2,u.zStart),[p,m]=l(u.x+Math.max(u.width,3)/2,u.zEnd);c.fillRect(d,f,p-d,m-f),c.strokeRect(d,f,p-d,m-f);let[h,g]=l(u.x-u.headWidth/2,u.zEnd-u.headDepth),[_,v]=l(u.x+u.headWidth/2,u.zEnd);c.fillRect(h,g,_-h,v-g),c.strokeRect(h,g,_-h,v-g),e.done=!0,e.img=null}update(e){this._bakeStep();let t=this.game.app,n=t.camera,r=t.player;(this._viewSize<0||!this._ro)&&(this._viewSize=this.view.clientWidth);let i=this._viewSize;if(!i)return;let a=i/2,o=n.matrixWorld.elements,s=-o[8],c=-o[10],l=Math.hypot(s,c);l<1e-4?(s=0,c=-1):(s/=l,c/=l);let u=-c,d=s,f=n.position.x,p=n.position.z,m=r.mode===`boat`||r.mode===`deck`||r.mode===`swim`?240:110;this.radiusM+=(m-this.radiusM)*(1-Math.exp(-e*1.5));let h=a/this.radiusM,g=-Math.PI/2-Math.atan2(c,s),_=h/If;this._setStyle(this.canvas,`transform`,`translate(${a}px, ${a}px) rotate(${g}rad) scale(${_}) translate(${-(f-Pf)*If}px, ${-(p-Ff)*If}px)`);let v=(e,t,n,r,i)=>{let o=(t*u+n*d)*h,l=-(t*s+n*c)*h,f=Math.hypot(o,l),p=a-r,m=f>p;return m&&(o*=p/f,l*=p/f),this._setStyle(e,`transform`,`translate(${a+o}px, ${a+l}px)`),i&&m&&this._setStyle(i,`transform`,`rotate(${Math.atan2(o,-l)}rad)`),m};for(let e of this.markers){let t=e.pos(),n=!t||e.hideWhen&&e.hideWhen();if(this._setStyle(e.el,`display`,n?`none`:``),n)continue;let r=v(e.el,t.x-f,t.z-p,12,e.arrow);this._toggle(e.el,`is-edge`,r)}v(this.north,0,-1e6,9);let y=this.game.state.stats.finder;this._fishT-=e,y&&this._fishT<=0&&(this._fishT=1.5,this._fishPts=this._richest(f,p,this.radiusM*.85));for(let e=0;e<this.fish.length;e++){let t=y?this._fishPts[e]:null;this._toggle(this.fish[e],`is-on`,!!t),t&&v(this.fish[e],t.x-f,t.z-p,14)}}_richest(e,t,n){let r=this.game,i=r.app.terrainData,a=[];for(let o=1;o<=3;o++)for(let s=0;s<12;s++){let c=s/12*Math.PI*2+o*.4,l=n*o/3,u=e+Math.cos(c)*l,d=t+Math.sin(c)*l,f=-i.heightAt(u,d);if(f<1)continue;let p=r.habitatAtPoint(u,d,f),m=0;for(let e in p)m+=p[e];m>.7&&a.push({x:u,z:d,rich:m})}a.sort((e,t)=>t.rich-e.rich);let o=[];for(let e of a)if(o.every(t=>Math.hypot(t.x-e.x,t.z-e.z)>25)&&(o.push(e),o.length===2))break;return o}},Kf=`tidewater.guide`,qf=`
.gm-guide { position: absolute; inset: 0; display: grid; place-items: center; pointer-events: none; opacity: 0; visibility: hidden;
	background: radial-gradient(70% 70% at 50% 50%, rgba(4, 10, 16, 0.2), rgba(4, 10, 16, 0.55));
	transition: opacity 420ms var(--tw-ease), visibility 0s linear 420ms; }
.gm-guide.is-on { opacity: 1; visibility: visible; pointer-events: auto; transition: opacity 420ms var(--tw-ease), visibility 0s; }
.gm-guide-card { width: min(calc(480 * var(--tw-u)), calc(100vw - 2 * var(--tw-edge))); padding: var(--tw-5) var(--tw-5) var(--tw-4); border-radius: var(--tw-r-lg);
	color: var(--tw-ink); font: 500 var(--tw-fs-md) var(--tw-font); transform: translateY(calc(10 * var(--tw-u))); transition: transform 520ms var(--tw-ease); }
.gm-guide.is-on .gm-guide-card { transform: none; }
.gm-guide-eyebrow { font-size: var(--tw-fs-xs); font-weight: 600; letter-spacing: 0.22em; text-transform: uppercase; color: var(--tw-sun); }
.gm-guide-card h2 { margin: var(--tw-2) 0 var(--tw-3); font-size: calc(24 * var(--tw-u)); font-weight: 600; letter-spacing: -0.01em; line-height: 1.2; }
.gm-guide-body { color: var(--tw-ink-2); line-height: 1.55; }
.gm-guide-body p { margin: 0 0 var(--tw-3); }
.gm-guide-body b { color: var(--tw-ink); font-weight: 600; }
.gm-guide-list { display: grid; gap: calc(7 * var(--tw-u)); margin: 0 0 var(--tw-3); }
.gm-guide-row { display: grid; grid-template-columns: calc(92 * var(--tw-u)) 1fr; gap: var(--tw-3); align-items: baseline; }
.gm-guide-row .k { display: flex; flex-wrap: wrap; gap: 3px; }
.gm-guide-row kbd { font: 600 var(--tw-fs-xs) var(--tw-mono); color: var(--tw-ink); padding: 1px calc(6 * var(--tw-u)); border-radius: calc(4 * var(--tw-u));
	border: 1px solid var(--tw-line-2); background: var(--tw-fill); }
.gm-guide-where { display: grid; gap: var(--tw-2); margin: var(--tw-1) 0 var(--tw-3); }
.gm-guide-where div { display: flex; align-items: center; gap: var(--tw-3); padding: var(--tw-2) var(--tw-3); border-radius: var(--tw-r-md); background: var(--tw-fill); border: 1px solid var(--tw-line); }
.gm-guide-where i { width: calc(12 * var(--tw-u)); height: calc(12 * var(--tw-u)); border-radius: 50%; flex: none; box-shadow: 0 0 0 1.5px rgba(255,255,255,0.8); }
.gm-guide-where .is-joe i { background: var(--tw-sun); }
.gm-guide-where .is-marta i { background: var(--tw-aqua); }
.gm-guide-where span { flex: 1; }
.gm-guide-where em { font-style: normal; font-family: var(--tw-mono); font-size: var(--tw-fs-sm); color: var(--tw-ink-2); white-space: nowrap; }
.gm-guide-foot { display: flex; align-items: center; justify-content: space-between; gap: var(--tw-3); margin-top: var(--tw-4); }
.gm-guide-dots { display: flex; gap: 6px; }
.gm-guide-dots span { width: 6px; height: 6px; border-radius: 50%; background: var(--tw-fill-2); transition: background var(--tw-med), width var(--tw-med) var(--tw-ease); }
.gm-guide-dots span.is-on { width: 18px; border-radius: 3px; background: var(--tw-sun); }
.gm-guide-btns { display: flex; align-items: center; gap: var(--tw-2); }
.gm-guide-hint { color: var(--tw-ink-3); font-size: var(--tw-fs-xs); margin-right: var(--tw-2); }
.gm-coach { position: absolute; right: var(--tw-edge); bottom: calc(var(--tw-edge) + 184 * var(--tw-u) + var(--tw-3)); width: min(calc(290 * var(--tw-u)), calc(100vw - 2 * var(--tw-edge)));
	padding: var(--tw-3) var(--tw-4); border-radius: var(--tw-r-lg); color: var(--tw-ink); font: 500 var(--tw-fs-sm) var(--tw-font); line-height: 1.5;
	pointer-events: none; opacity: 0; transform: translateY(calc(8 * var(--tw-u))); visibility: hidden;
	transition: opacity 360ms var(--tw-ease), transform 480ms var(--tw-ease), visibility 0s linear 480ms, right var(--tw-slow) var(--tw-ease); }
.tw-root[data-panel='open'] .gm-coach { right: calc(var(--tw-panel-w) + 2 * var(--tw-3)); }
.gm-coach.is-on { opacity: 1; transform: none; visibility: visible; transition: opacity 360ms var(--tw-ease), transform 480ms var(--tw-ease), visibility 0s, right var(--tw-slow) var(--tw-ease); }
.gm-coach-eyebrow { display: block; margin-bottom: 3px; font-size: var(--tw-fs-xs); font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; color: var(--tw-aqua); }
.gm-coach b { color: var(--tw-ink); font-weight: 600; }
.gm-coach kbd { font: 600 var(--tw-fs-xs) var(--tw-mono); color: var(--tw-ink); padding: 0 calc(5 * var(--tw-u)); border-radius: calc(4 * var(--tw-u)); border: 1px solid var(--tw-line-2); background: var(--tw-fill); }

.tw-help-guide { display: flex; align-items: center; gap: var(--tw-4); margin-top: var(--tw-4); padding-top: var(--tw-4); border-top: 1px solid var(--tw-line);
	color: var(--tw-ink-2); font-size: var(--tw-fs-sm); line-height: 1.5; }
.tw-help-guide b { color: var(--tw-ink); }
.tw-help-guide .gm-btn { flex: none; }
@media (max-height: 860px) { .gm-coach { right: calc(var(--tw-edge) + 58 * var(--tw-u)); } }
@media (max-width: 640px) { .tw-help-guide { flex-direction: column; align-items: flex-start; } .gm-coach { bottom: calc(var(--tw-edge) + 128 * var(--tw-u) + var(--tw-3)); } .gm-guide-row { grid-template-columns: calc(78 * var(--tw-u)) 1fr; } }
@media (prefers-reduced-motion: reduce) { .gm-guide-card, .gm-coach { transform: none !important; } }
`,Jf=(...e)=>e.map(e=>`<kbd>${e}</kbd>`).join(``),Yf=(e,t)=>`<div class="gm-guide-row"><span class="k">${e}</span><span>${t}</span></div>`,Xf=[{eyebrow:`Welcome to Tidewater`,title:`Fish the island, sell your catch`,body:`<p>Catch fish from the <b>beach</b>, the <b>pier</b> or your <b>boat</b>. Different fish bite in the shallows, around the pier, over the reef and out in deep water, and they change with the time of day.</p>
			<p>Sell your catch to <b>Joe</b> at the fish stand by the pier, then spend the money on upgrades from <b>Marta</b> at the chandlery by the boathouse: stronger line, a faster reel, a bigger hold, a fish finder and lights for fishing at night.</p>`},{eyebrow:`Fishing`,title:`Cast, strike, reel`,body:`<div class="gm-guide-list">
			${Yf(Jf(`R`),`Take out the rod (by the water or on the boat)`)}
			${Yf(Jf(`Hold`,`LMB`),`Wind up, release to cast. Hold longer to cast farther`)}
			${Yf(Jf(`LMB`),`Strike when the bobber is <b>pulled under</b> (dips are only nibbles)`)}
			${Yf(Jf(`Hold`,`LMB`),`Reel in. <b>Let go when the tension turns red</b>, or the line snaps`)}
			${Yf(Jf(`RMB`),`Reel an empty line back in`)}
			${Yf(Jf(`I`),`Your cooler and fish log`)}
		</div>`},{eyebrow:`Getting around`,title:`Joe and Marta`,body:`<div class="gm-guide-list">
			${Yf(Jf(`W`,`A`,`S`,`D`),`Move, mouse to look, <kbd>Shift</kbd> to run`)}
			${Yf(Jf(`E`),`Board the boat, take the helm, talk to Joe and Marta`)}
			${Yf(Jf(`F1`),`All controls, and this guide again`)}
		</div>
		<div class="gm-guide-where">
			<div class="is-joe"><i></i><span><b>Joe</b> · fish stand by the pier</span><em data-where="joe"></em></div>
			<div class="is-marta"><i></i><span><b>Marta</b> · chandlery by the boathouse</span><em data-where="marta"></em></div>
		</div>
		<p style="margin:0;color:var(--tw-ink-3);font-size:var(--tw-fs-sm)">Both are marked on the map in the lower right.</p>`}],Zf={rodOut:`Hold the <b>left mouse button</b> to wind up and release to cast. Try deeper water, around the pier or over the reef.`,nibble:`The bobber is dipping: something is <b>nibbling</b>. Wait until it is <b>pulled under</b>, then click to strike.`,fishOn:`<b>Hold the left mouse button</b> to reel. When the tension needle nears the <b>red</b>, let go until it settles, then reel again.`,caught:`Into the cooler (<kbd>I</kbd>). Sell your catch to <b>Joe</b> at the fish stand by the pier: he is on the map.`,full:`Your cooler is <b>full</b>. Sell to Joe, or buy a bigger hold from Marta at the chandlery.`,boat:`Your boat. <kbd>E</kbd> to board, <kbd>E</kbd> again at the wheel to drive (<kbd>W</kbd><kbd>S</kbd> throttle, <kbd>A</kbd><kbd>D</kbd> steer). Diesel is sold by Marta.`,joe:`<b>Joe</b> buys your fish. <kbd>E</kbd> to see what he will pay.`,marta:`<b>Marta</b> sells upgrades and diesel. <kbd>E</kbd> to see her stock.`},Qf=(e,t,n)=>{let r=document.createElement(e);return t&&(r.className=t),n!==void 0&&(r.innerHTML=n),r};function $f(e,t,n,r){let i=Math.atan2(n-e,-(r-t));return[`north`,`north-east`,`east`,`south-east`,`south`,`south-west`,`west`,`north-west`][(Math.round(i/(Math.PI/4))%8+8)%8]}var ep=class{constructor(e,t,n=null){this.ui=e,this.game=t,this.minimap=n;let r=Qf(`style`);r.textContent=qf,document.head.append(r),this.seen=this._load(),this.el=Qf(`div`,`gm-guide tw-interactive`,`<div class="gm-guide-card tw-glass" role="dialog" aria-modal="true" aria-live="polite">
			<div class="gm-guide-eyebrow"></div><h2></h2><div class="gm-guide-body"></div>
			<div class="gm-guide-foot"><div class="gm-guide-dots">${Xf.map(()=>`<span></span>`).join(``)}</div>
			<div class="gm-guide-btns"><span class="gm-guide-hint">Enter · Esc to skip</span><button type="button" class="gm-btn is-ghost gm-guide-skip">Skip</button><button type="button" class="gm-btn gm-guide-next">Next</button></div></div></div>`),this.card=this.el.firstChild,this.eyebrow=this.el.querySelector(`.gm-guide-eyebrow`),this.title=this.el.querySelector(`h2`),this.body=this.el.querySelector(`.gm-guide-body`),this.dots=[...this.el.querySelectorAll(`.gm-guide-dots span`)],this.nextBtn=this.el.querySelector(`.gm-guide-next`),this.el.querySelector(`.gm-guide-skip`).addEventListener(`click`,e=>{e.stopPropagation(),this.close()}),this.nextBtn.addEventListener(`click`,e=>{e.stopPropagation(),this.next()}),e.root.append(this.el),this.coach=Qf(`div`,`gm-coach tw-glass`,`<span class="gm-coach-eyebrow">Tip</span><span class="gm-coach-text"></span>`),this.coachText=this.coach.lastChild,(e.hud||e.root).append(this.coach),this.open=!1,this.step=0,this._wait=this.seen.intro?-1:.8,this._coachT=0,this._queue=[],this._whereT=0,this._prev={lastCatch:t.state.lastCatch},this._onKey=e=>{if(this.open){if(e.code===`Escape`)this.close();else if(e.code===`Enter`||e.code===`Space`||e.code===`ArrowRight`)this.next();else if(e.code===`ArrowLeft`)this.show(Math.max(0,this.step-1));else if(e.code!==`F1`)return;e.preventDefault(),e.stopPropagation()}},this._onDown=e=>{this.open&&(e.target&&e.target.closest&&e.target.closest(`button`)||(e.preventDefault(),e.stopPropagation(),this.next()))},window.addEventListener(`keydown`,this._onKey,!0),window.addEventListener(`mousedown`,this._onDown,!0)}_load(){try{return JSON.parse(localStorage.getItem(Kf)||`{}`)||{}}catch{return{}}}_save(){try{localStorage.setItem(Kf,JSON.stringify(this.seen))}catch{}}show(e){this.step=e;let t=Xf[e];this.eyebrow.textContent=t.eyebrow,this.title.textContent=t.title,this.body.innerHTML=t.body,this.dots.forEach((t,n)=>t.classList.toggle(`is-on`,n===e)),this.nextBtn.textContent=e===Xf.length-1?`Let's fish`:`Next`,this.minimap&&this.minimap.highlight(e===Xf.length-1?[`joe`,`marta`]:[]),this._whereT=0,this.open||(this.open=!0,this.el.classList.add(`is-on`))}next(){this.step<Xf.length-1?this.show(this.step+1):this.close()}close(){this.open&&(this.open=!1,this.el.classList.remove(`is-on`),this.minimap&&this.minimap.highlight([]),this.seen.intro=!0,this._save())}replay(){this.seen={},this._save(),this._queue.length=0,this._hideCoach(),this.ui.toggleHelp&&this.ui.toggleHelp(!1),this.show(0)}tip(e){this.seen[e]||this._queue.includes(e)||this._current===e||this._queue.push(e)}_hideCoach(){this._current=null,this.coach.classList.remove(`is-on`)}update(e){let t=this.ui,n=this.game,r=n.app,i=r.player;if(this._wait>=0&&!t._start&&(this._wait-=e,this._wait<0&&this.show(0)),this.open){if(this._whereT-=e,this._whereT<=0&&this.step===Xf.length-1){this._whereT=.25;let e=i.position.x,t=i.position.z;for(let[n,r]of[[`joe`,Fd],[`marta`,Kd]]){let i=this.body.querySelector(`[data-where="${n}"]`);i&&(i.textContent=`${Math.round(Math.hypot(r.x-e,r.z-t))} m ${$f(e,t,r.x,r.z)}`)}}return}let a=n.rod,o=n.bite,s=this._prev;a.equipped&&!s.equipped&&this.tip(`rodOut`),o&&o.phase===`nibble`&&this.tip(`nibble`),n.fight&&!s.fight&&this.tip(`fishOn`);let c=n.state.lastCatch;c&&c!==s.lastCatch&&c.kept&&(this._afterCard=`caught`),this._afterCard&&!(n.hud&&n.hud.catchOpen)&&!n.landing&&(this.tip(this._afterCard),this._afterCard=null);let l=n.state;if(l.holdKg>=l.stats.holdKg*.92&&this.tip(`full`),i.mode===`walk`){let e=r.boatCtl;e&&Math.hypot(e.position.x-i.position.x,e.position.z-i.position.z)<9&&this.tip(`boat`);for(let e of n.vendors)e.inRange(i.position)&&this.tip(e.kind===`buyer`?`joe`:`marta`)}s.equipped=a.equipped,s.fight=!!n.fight,s.lastCatch=c;let u=n.hud&&(n.hud.catchOpen||n.hud.invOpen||n.hud.standOpen);if(this._current)this._coachT-=e,(this._coachT<=0||u)&&this._hideCoach();else if(this._queue.length&&!u){let e=this._queue.shift();this._current=e,this.seen[e]=!0,this._save(),this.coachText.innerHTML=Zf[e],this.coach.classList.add(`is-on`),this._coachT=7.5}}},tp=9e3,np=class{constructor(e){this.app=e,this.state=new ju,this.state.load(),this.rod=new sd({scene:e.scene,camera:e.camera,query:e.query,terrain:e.terrainData,audio:e.audio}),this.rod.onLand=e=>this.onBobberLanded(e),this.stand=new Rd({scene:e.scene,terrain:e.terrainData,colliders:e.colliders}),this.display=new uf({scene:e.scene,stall:this.stand.iceFish()}),this.landing=null,this.chandlery=new qd({scene:e.scene,terrain:e.terrainData,colliders:e.colliders,material:this.stand.material}),this.vendors=[this.stand.vendor,this.chandlery.vendor];let t=e.boatCtl;this._engineBase={maxThrust:t.maxThrust,pitchSpeed:t.pitchSpeed},this.floods=[],e.localLights&&this.addFloodlights(e.localLights,e.boat),this._fuelOut=!1,this._sonarT=0,this._sonar=null,this.hud=null,this.fight=null,this.bite=null,this._lmb=!1,this._rmb=!1,this._hookedSpecies=null,this._pier=z.pier,this._tmp=new n,this.applyGear(),this.state.onChange(()=>this.applyGear())}applyGear(){let e=this.state.stats;this.rod.setGear({castM:e.castM,reelSpeed:e.reelSpeed});let t=this.app.boatCtl;t&&this._engineBase&&(t.maxThrust=this._engineBase.maxThrust*e.speedMul*e.speedMul,t.pitchSpeed=this._engineBase.pitchSpeed*e.speedMul);for(let t of this.floods||[])t.scale=+!!e.deckLights}addFloodlights(e,t){let r=t.group;for(let t of[-.8,.8]){let i=new n(t,2.25,-1),a=new n(t*.25,-.75,-.62).normalize(),o={position:new n,color:new c(1,.93,.8),intensity:3.2,range:14,kind:`boatFlood`,dir:new n,cosInner:.8,cosOuter:.45,scale:0,update(){r.updateWorldMatrix(!0,!1),this.position.copy(i).applyMatrix4(r.matrixWorld),this.dir.copy(a).transformDirection(r.matrixWorld)}};o.update(),this.floods.push(o),e.add(o)}}buy(e){let t=this.state.buy(e);return t&&this.toast(`${wu[e].name}: ${t.label}`),t}refuel(){let e=this.state.refuel();return e>0&&(this._fuelOut=!1,this.toast(`Filled up · ${e.toFixed(0)} L`)),e}toast(e,t=2600){this.hud?this.hud.toast(e,t):console.log(`[game]`,e)}get canFish(){let e=this.app,t=e.player;return!e.freeCam&&(t.mode===`walk`||t.mode===`deck`)&&!(e.ui&&e.ui.ui&&e.ui.ui._photo)}update(e){let t=this.app,n=t.player,r=t.input,i=this.rod;if(this._cardDismissed=!1,!this.hud&&t.ui&&t.ui.ui&&typeof document<`u`&&document.head){let e=t.ui.ui;this.hud=new Af(e,this),this.minimap=new Gf(e.hud||e.root,this),this.guide=new ep(e,this,this.minimap),e.onReplayGuide=()=>this.guide.replay()}let a=this.canFish;r.hit(`KeyR`)&&a&&!this.fight&&(i.equip(!i.equipped),i.equipped||this.cancelLine(),this.toast(i.equipped?`Rod out · hold left mouse to cast`:`Rod away`,1600)),!a&&i.equipped&&(this.cancelLine(!0),i.equip(!1)),this.hud&&(r.hit(`KeyI`)||r.hit(`Tab`))&&this.hud.toggleInventory(),this.hud&&r.hit(`Escape`)&&(this.hud.toggleInventory(!1),this.hud.closeStand());let o=r.mouseDown&&r.enabled,s=r.rightDown&&r.enabled,c=o&&!this._lmb,l=!o&&this._lmb,u=s&&!this._rmb;this._lmb=o,this._rmb=s;let d=this.hud&&(this.hud.invOpen||this.hud.standOpen);i.equipped&&!d&&(i.state===`idle`&&c?i.startWindup():i.state===`windup`&&l?i.release():i.state===`floating`?c?this.strike():u&&(i.retrieve(),this.bite=null):i.state===`flying`&&u&&i.retrieve()),i.state===`floating`?this.updateBite(e):this.fight||(i.dip=Math.max(0,i.dip-e*4)),this.fight&&this.updateFight(e,o&&!d),i.update(e,{visible:a,fight:this.fight});let f=this.landing;if(f&&i.state===`landing`&&a){let n=t.camera.position,a=i.bobber,o=Math.atan2(n.x-a.x,n.z-a.z);f.card&&(!f.shown&&i.t>.3&&(f.shown=!0,this.hud.showCatch(f.card,tp)),f.shown&&(f.cardT+=e,o+=Math.sin(f.cardT*.7)*.55,(c||r.hit(`KeyE`)||r.hit(`Escape`)||f.cardT>tp/1e3)&&(this._cardDismissed=!0,this.endLanding()))),this.landing&&(f.card?this.display.shown&&this.display.hide():this.display.show(f.species,f.kg,a,o,e),!f.card&&i.t>2.8&&this.endLanding())}else(this.landing||this.display.shown)&&this.endLanding();n.busy=i.lineInWater||i.state===`windup`,this.updateBoat(e);for(let t of this.vendors)t.update(e,n.mode===`walk`?n.position:null);this.updateVendors(r,n),!n.prompt&&a&&(n.prompt=this.prompt());let p=n.mode===`boat`||n.mode===`deck`;this.hud&&this.hud.portrait&&this.hud.portrait.update(e),this.hud&&this.hud.update({fuel:p?{litres:this.state.fuelL,tank:this.state.stats.fuelL}:null,sonar:p&&this.state.stats.finder?this._sonar:null,fight:this.fight,casting:i.state===`windup`,power:i.power,bite:this.bite&&this.bite.phase===`take`,aiming:i.equipped}),this.minimap&&this.minimap.update(e),this.guide&&this.guide.update(e)}prompt(){let e=this.rod,t=this.app.player;if(!e.equipped)return t.mode===`deck`||t.mode===`walk`&&[`wood`,`wetsand`,`water`].includes(t.surface)?{key:`R`,text:`Take out the rod`}:null;let n=this.bite;switch(e.state){case`idle`:return{key:`LMB`,text:`Hold to wind up, release to cast   ·   R  put the rod away`};case`windup`:return{key:`LMB`,text:`Release to cast (hold longer to cast farther)`};case`flying`:return null;case`floating`:return n&&n.phase===`take`?{key:`LMB`,text:`Strike now!`}:n&&n.phase===`nibble`?{key:`…`,text:`Something's nibbling · wait until the bobber is pulled under`}:{key:`RMB`,text:`Waiting for a bite · right-click to reel the line in`};case`retrieving`:return{key:`RMB`,text:`Reeling in`};case`fighting`:return this.fight&&this.fight.tension>this.fight.band[1]?{key:`LMB`,text:`Too much tension · let go!`}:{key:`LMB`,text:`Hold to reel · let go when the tension goes red`};case`landing`:return null;default:return null}}updateBoat(e){let t=this.app,n=t.boatCtl,r=t.player,i=this.state;if(n.driven?i.burn(Eu(n.rpm)*e)<=0&&(n.throttle=0,this._fuelOut||this.toast(`Out of fuel · buy diesel at the chandlery by the boathouse`,4e3),this._fuelOut=!0):this._wasDriven&&i.save(),this._wasDriven=n.driven,(r.mode===`boat`||r.mode===`deck`)&&i.stats.finder&&(this._sonarT-=e,this._sonarT<=0)){this._sonarT=.5;let e=n.position.x,r=n.position.z,i=Math.max(0,-t.terrainData.heightAt(e,r)),a=this.habitatAtPoint(e,r,i),o=0;for(let e in a)o+=a[e];this._sonar={depth:i,fish:Math.min(1,o/1.4)}}}updateVendors(e,t){let n=this.hud,r=null;if(t.mode===`walk`)for(let e of this.vendors)e.inRange(t.position)&&(r=e);for(let e of this.vendors)e.talking=!!(n&&n.standOpen&&n.vendor===e);n&&n.standOpen&&(!r||r!==n.vendor)&&n.closeStand(),!(!r||this.fight||this._cardDismissed||n&&n.catchOpen)&&(t.prompt||={key:`E`,text:n&&n.standOpen?`Leave`:`Talk to ${r.name.split(` ·`)[0]}`},e.hit(`KeyE`)&&(n?n.standOpen?n.closeStand():n.openStand(r):r.kind===`buyer`&&this.sellAll()))}sellAll(){let e=this.state.sell();return e.count&&this.toast(`Sold ${e.count} fish for $${e.total}`),this.app.audio&&this.app.audio.coin&&this.app.audio.coin(),e}sell(e){let t=this.state.sell(e);return t.count&&this.toast(`Sold for $${t.total}`),t}habitat(){return this.habitatAtPoint(this.rod.bobber.x,this.rod.bobber.z,this.rod.depth)}habitatAtPoint(e,t,n){let r={x:e,z:t},i=z.reef,a=Math.hypot(r.x-i.center.x,r.z-i.center.z)-i.radius,o=this._pier,s=(e,t,n,i)=>Math.hypot(Math.max(e-r.x,0,r.x-t),Math.max(n-r.z,0,r.z-i)),c=s(o.x-o.width/2,o.x+o.width/2,o.zStart,o.zEnd),l=s(o.x-o.headWidth/2,o.x+o.headWidth/2,o.zEnd-o.headDepth,o.zEnd);return _u({depth:n,reefDist:a,pierDist:Math.min(c,l)})}get hour(){return this.app.settings.timeOfDay}onBobberLanded(e){if(e!==`water`){this.toast(`Landed on the sand`,1400);return}this.bite={phase:`wait`,t:xu(this.habitat(),this.hour)}}updateBite(e){let t=this.rod,n=this.bite;if(n&&(n.t-=e,n.phase===`nibble`?t.dip=Math.max(0,Math.sin(Math.min(1,n.pulse||0)*Math.PI)*.45):n.phase===`take`?t.dip+=(1.4-t.dip)*(1-Math.exp(-e*14)):t.dip=Math.max(0,t.dip-e*3),n.phase===`nibble`&&(n.pulse=(n.pulse||0)+e*3.2),!(n.t>0))){if(n.phase===`wait`){let e=yu(this.habitat(),this.hour);if(!e){n.t=8;return}n.species=e,n.kg=bu(e),n.phase=`nibble`,n.nibbles=1+Math.floor(Math.random()*3),n.t=.7+Math.random()*.8,n.pulse=0}else n.phase===`nibble`?(n.nibbles--,n.pulse=0,n.nibbles>0?n.t=.6+Math.random()*1:(n.phase=`take`,n.t=2.4-pu[n.species].fight*.5,this.app.audio&&this.app.audio.fishSplash&&this.app.audio.fishSplash(t.bobber,.35))):n.phase===`take`&&(this.toast(`It took the bait and ran`,1800),this.bite={phase:`wait`,t:xu(this.habitat(),this.hour)})}}strike(){let e=this.bite;if(!e||e.phase===`wait`||e.phase===`nibble`){e&&e.phase===`nibble`&&this.toast(`Not yet · wait for it to pull under`,1500);return}let t=this.state.stats;this.fight=new Cu({species:e.species,kg:e.kg,lineKg:t.lineKg,reelSpeed:t.reelSpeed,distance:Math.max(3,this.rod.lineOut)}),this.bite=null,this.rod.hook(),this.toast(`Fish on!`,1200)}updateFight(e,t){let n=this.fight,r=n.update(e,t),i=this.app.audio;if(n.surge>.6&&!n._splashed&&i&&i.fishSplash&&i.fishSplash(this.rod.bobber,.3+.5*Math.min(1,n.kg/8)),n._splashed=n.surge>.6?!0:n.surge<.3?!1:n._splashed,r===`fighting`)return;this.fight=null,this.rod.dip=0;let a=pu[n.species].name;if(r===`caught`){let e=this.state.addFish(n.species,n.kg,this.hour),t=this.state.lastCatch;i&&i.fishSplash&&i.fishSplash(this.rod.bobber,.8),i&&i.fishFlop&&i.fishFlop(),this.hud?this.landing={species:n.species,kg:n.kg,card:t,cardT:0}:(e?this.toast(`${t.record?`New record! `:``}${a} · ${e.kg.toFixed(2)} kg · $${e.value}`,3600):this.toast(`${a} · ${n.kg.toFixed(1)} kg · no room in the ${this.state.upgrades.hold>0?`hold`:`cooler`}, let it go`,3600),this.landing={species:n.species,kg:n.kg}),this.rod.land()}else r===`snapped`?(this.toast(`Snap! The line broke`,2400),i&&i.lineSnap&&i.lineSnap(),this.rod.setState(`idle`)):(this.toast(`It threw the hook`,2e3),this.rod.endFight())}endLanding(){this.landing=null,this.display.hide(),this.hud&&this.hud.catchOpen&&this.hud.hideCatch(),this.rod.state===`landing`&&this.rod.setState(`idle`)}cancelLine(e=!1){this.fight&&!e&&this.toast(`Lost it`,1400),this.fight=null,this.bite=null,this.rod.state!==`stowed`&&this.rod.setState(this.rod.equipped?`idle`:`stowed`)}},rp=1025,ip=9.81,ap=Math.PI/180,op=f.smoothstep,sp=f.clamp,cp=new n,lp=new n,up=new n,dp=new n,fp=new n,pp=new n,mp=new n,hp=new n,gp=new n,_p=new n,vp=new n,yp=new n,bp=new n,xp=new n,Sp=new n,Cp=new n,wp=new n,Tp=new n,Ep=new n,Dp=new n,Op=new n,kp=new i,Ap=new i,jp=class{constructor({model:e,query:t,terrain:r,colliders:a}){this.model=e,this.query=t,this.terrain=r,this.colliders=a;let o=e.hydro||{};this.mass=o.suggestedMass||3200,this.com=o.centerOfMass?new n().copy(o.centerOfMass):new n(0,.3,-.74),this.inertia=o.inertia?o.inertia.clone():new n(14600,15700,3500),this.inertia.z*=1.24,this.addedMass=new n(.6,.7,.05),this.addedInertia=new n(1,.4,.2);let s=o.centerOfBuoyancy?o.centerOfBuoyancy.z:this.com.z;this.samples=e.hullSamples.map(e=>({p:new n(e.position.x*.79,e.position.y,s+(e.position.z-s)*.9),area:e.area,bottom:e.bottomY??e.position.y}));let c=0;for(let e of this.samples)c+=e.area*(e.p.z-s)**2;this.pitchStiffness=rp*ip*c,this.slot=t.allocate(`boatHull`,this.samples.length),this.stations=[[-3.4,.73],[-2.3,.78],[-1.2,.8],[-.1,.77],[1,.62],[2.1,.33],[3.2,.14]],this.lateralY=.06,this.bank=0,this.hullLift=.5,this.rudderLift=2.8,this.position=new n().copy(z.boatDock.position),this.quaternion=new i().setFromAxisAngle(new n(0,1,0),z.boatDock.heading),this.velocity=new n,this.angular=new n,this.throttle=0,this.steer=0,this.rpm=0,this.maxThrust=26e3,this.pitchSpeed=16,this.reverseFactor=.45,this.driven=!1,this.moored=!0,this.mooring={anchor:z.boatDock.position.clone(),heading:z.boatDock.heading};let l=this.samples.length;this.waterH=new Float32Array(l),this.waterV=new Float32Array(l),this.waterOff=new Float32Array(l),this.hEff=new Float32Array(l),this.qx=new Float32Array(l),this.qz=new Float32Array(l),this.gx=new Float32Array(l),this.gz=new Float32Array(l),this.hasWater=!1,this.wetFraction=0,this.speed=0,this.forwardSpeed=0,this.thrust=0,this.slam=0,this.onSlam=null,this._acc=0,this._age=0,this.bowWorld=new n,this.sternWorld=new n,this.apply()}toWorld(e,t){return t.copy(e).applyQuaternion(this.quaternion).add(this.position)}forward(e){return e.set(0,0,1).applyQuaternion(this.quaternion)}setInput(e,t,n){this.throttleTarget=e,this.throttle+=(e-this.throttle)*(1-Math.exp(-n*2.2)),this.steer+=(t-this.steer)*(1-Math.exp(-n*1.2))}queueQueries(){let e=this.query,t=e.latency;for(let n=0;n<this.samples.length;n++)this.toWorld(this.samples[n].p,bp).addScaledVector(this.velocity,t),e.setPoint(this.slot+n,bp.x,bp.z)}readQueries(){let e=this.query;if(!e.cpuValid||e.version===this._qVersion)return;let t=e.resultTime-(this._qTime??e.resultTime);this._qVersion=e.version,this._qTime=e.resultTime;let n=e.cpu,r=e.resultInputs;for(let e=0;e<this.samples.length;e++){let i=(this.slot+e)*4,a=n[i];Number.isFinite(a)||(a=this.hasWater?this.waterH[e]:0);let o=Number.isFinite(n[i+1])?n[i+1]:0,s=Number.isFinite(n[i+2])?n[i+2]:0,c=Math.sqrt(Math.max(1-o*o-s*s,.05)),l=-o/c,u=-s/c,d=0;if(this.hasWater&&t>1e-4){let n=r[i]-this.qx[e],o=r[i+1]-this.qz[e];d=(a-this.waterH[e]-.5*((l+this.gx[e])*n+(u+this.gz[e])*o))/t}this.hasWater?this.waterOff[e]=this.hEff[e]-a:this.waterOff[e]=0,this.waterV[e]+=(sp(d,-3,3)-this.waterV[e])*.5,this.waterH[e]=a,this.hEff[e]=a+this.waterOff[e],this.qx[e]=r[i],this.qz[e]=r[i+1],this.gx[e]=l,this.gz[e]=u}this._age=0,this.hasWater=!0}update(e){if(this.readQueries(),!this.hasWater){this.apply();return}let t=this.driven?Math.abs(this.throttle):0,n=Math.max(t,this.driven?.15:0),r=n>this.rpm?.9:1.3;this.rpm+=(n-this.rpm)*(1-Math.exp(-Math.min(e,.1)/r));let i=1/120;this._acc+=Math.min(e,.1);let a=0;for(;this._acc>=i&&a<12;)this.step(i),this._acc-=i,a++;this.isFinite()||this.reset(),this.model.setThrottle(this.throttle),this.model.setSteering(this.steer),this.model.setPropellerRPM(this.rpm*2400*Math.sign(this.throttle||1)),this.apply()}step(e){let t=this.mass,n=cp.set(0,-t*ip,0),r=lp.set(0,0,0),i=this.toWorld(this.com,up),a=kp.copy(this.quaternion).invert(),o=(e,t)=>{n.add(e),r.add(fp.copy(t).sub(i).cross(e))};this._age=Math.min(this._age+e,.12);let s=Math.exp(-e/.06),c=0,l=0,u=0;for(let e=0;e<this.samples.length;e++){let t=this.samples[e];this.waterOff[e]*=s;let n=this.waterH[e]+this.waterV[e]*this._age+this.waterOff[e];this.hEff[e]=n;let r=this.toWorld(t.p,dp),a=n-r.y;if(l+=t.area,a<=0)continue;let d=Math.min(a,1.6),f=Math.min(1,a/.3);c+=t.area*f,u+=t.area*Math.min(d/Math.max(-t.p.y,.05),1.5),mp.copy(this.angular).cross(fp.copy(r).sub(i)).add(this.velocity);let p=mp.y-this.waterV[e]*.6,m=Math.min(1,d/.25)*t.area;pp.set(0,rp*ip*t.area*d-(1800*p+900*p*Math.abs(p))*m,0),o(pp,r)}let d=this.wetFraction=l>0?c/l:0,f=l>0?sp(u/l,0,1):0,p=Math.min(1,d*1.6),m=this.forward(_p),h=vp.set(1,0,0).applyQuaternion(this.quaternion),g=yp.set(0,1,0).applyQuaternion(this.quaternion);hp.copy(this.velocity).applyQuaternion(a);let _=hp.z,v=hp.x;this.speed=this.velocity.length(),this.forwardSpeed=_;let y=gp.copy(this.angular).applyQuaternion(a),b=Math.abs(_),x=(40*b+22*b*b+3e3*op(b,2.8,5.4)+55*b*b*op(b,7,11))*p;dp.set(0,-.2,this.com.z),this.toWorld(dp,dp),o(pp.copy(m).multiplyScalar(-x*Math.sign(_)),dp),n.addScaledVector(this.velocity,-3.3*this.speed);let S=0;for(let[e,t]of this.stations){let n=e-this.com.z,r=v+y.y*n-y.z*(this.lateralY-this.com.y),i=-.5*rp*t*(this.hullLift*b*r+1.1*r*Math.abs(r))*p;S+=i*r,dp.set(0,this.lateralY,e),this.toWorld(dp,dp),o(pp.copy(h).multiplyScalar(i),dp)}r.addScaledVector(m,this.bank*b*v*p);let C=this.toWorld(this.model.propeller,dp),w=sp((this.sampleWaterAt(C)-C.y)/.3+.5,0,1),T=this.driven?Math.sign(this.throttle):0,E=this.rpm*(this.driven&&Math.abs(this.throttle)>.02?1:0),D=0;T>0?D=this.maxThrust*E*E*Math.max(0,1-Math.max(_,0)/(this.pitchSpeed*Math.max(E,.2))):T<0&&(D=-this.reverseFactor*this.maxThrust*E*E*Math.max(0,1-Math.max(-_,0)/(this.pitchSpeed*.6*Math.max(E,.2)))),D*=w,this.thrust=D,o(pp.copy(m).multiplyScalar(D),C),D<0&&o(pp.copy(h).multiplyScalar(-D*.08),C);let O=this.toWorld(xp.set(0,-.15,this.model.rudder.z),xp),k=Math.max(D,0)*2/(rp*.14),A=_*Math.abs(_)+.9*k,ee=Math.sqrt(Math.abs(A))*Math.sign(A),j=v+y.y*(this.model.rudder.z-this.com.z),te=sp(this.steer*.6+(Math.abs(ee)>.3?Math.atan2(j,Math.abs(ee))*Math.sign(ee):0),-.7,.7),ne=.5*rp*.12*Math.abs(A)*this.rudderLift*Math.sin(te)*Math.cos(te)*w*Math.sign(A||1);o(pp.copy(h).multiplyScalar(-ne),O),o(pp.copy(m).multiplyScalar(-Math.abs(ne*Math.sin(te))*.8*Math.sign(_||1)),O);let re=(2.8*op(_,2.5,4.8)-.8*op(_,4.8,7.5)-.4*op(_,7.5,10.5))*ap;r.addScaledVector(h,this.pitchStiffness*re*f*-1),n.addScaledVector(g,t*ip*.15*op(_,3.5,9)*f);let M=.2+p;if(bp.set(-y.x*25e3,-y.y*2e3,-y.z*(4500+900*b)).multiplyScalar(M).applyQuaternion(this.quaternion),r.add(bp),this.moored&&!this.driven){let e=this.mooring.anchor,t=5500,i=4200,a=e.x-this.position.x,o=e.z-this.position.z;n.x+=a*t-this.velocity.x*i,n.z+=o*t-this.velocity.z*i;let s=this.mooring.heading-this.getYaw();s=Math.atan2(Math.sin(s),Math.cos(s)),r.y+=s*6e4-this.angular.y*3e4}this.contacts(n,r,i);let ie=hp.copy(n).applyQuaternion(a);ie.x/=t*(1+this.addedMass.x*p),ie.y/=t*(1+this.addedMass.y*p),ie.z/=t*(1+this.addedMass.z*p),this.velocity.addScaledVector(ie.applyQuaternion(this.quaternion),e);let ae=r.applyQuaternion(a),oe=this.inertia,se=this.addedInertia;ae.set(ae.x/(oe.x*(1+se.x*p)),ae.y/(oe.y*(1+se.y*p)),ae.z/(oe.z*(1+se.z*p))),this.angular.addScaledVector(ae.applyQuaternion(this.quaternion),e),i.addScaledVector(this.velocity,e);let ce=this.angular,le=ce.length()*e;le>1e-8&&(Ap.setFromAxisAngle(bp.copy(ce).normalize(),le),this.quaternion.premultiply(Ap).normalize()),this.position.copy(i).sub(bp.copy(this.com).applyQuaternion(this.quaternion))}isFinite(){let e=e=>Number.isFinite(e.x)&&Number.isFinite(e.y)&&Number.isFinite(e.z);return e(this.position)&&e(this.velocity)&&e(this.angular)&&Number.isFinite(this.quaternion.w)}reset(){this.position.copy(z.boatDock.position),this.quaternion.setFromAxisAngle(new n(0,1,0),z.boatDock.heading),this.velocity.set(0,0,0),this.angular.set(0,0,0),this.throttle=0,this.steer=0,this.rpm=0,this.moored=!0,this.mooring.anchor.copy(z.boatDock.position),this.mooring.heading=z.boatDock.heading}getYaw(){let e=this.forward(Sp);return Math.atan2(e.x,e.z)}sampleWaterAt(e){let t=0,n=1/0;for(let r=0;r<this.samples.length;r++){this.toWorld(this.samples[r].p,Cp);let i=(Cp.x-e.x)**2+(Cp.z-e.z)**2;i<n&&(n=i,t=this.hasWater?this.hEff[r]:0)}return t}contacts(e,t,r){let i=this.contactPoints||=[new n(0,-.7,3.2),new n(0,-.75,0),new n(0,-.72,-3.4),new n(1.1,-.4,1.5),new n(-1.1,-.4,1.5),new n(1.2,-.35,-2.5),new n(-1.2,-.35,-2.5),new n(0,.2,4.2)],a=wp,o=Tp,s=Ep,c=Dp;for(let n of i){this.toWorld(n,a);let i=this.terrain.heightAt(a.x,a.z)-a.y;if(i>0){o.copy(this.angular).cross(c.copy(a).sub(r)).add(this.velocity);let n=i*4e5-Math.min(o.y,0)*3e4;s.set(-o.x*6e3,Math.max(n,0),-o.z*6e3),e.add(s),t.add(c.copy(a).sub(r).cross(s))}}if(this.colliders){let i=this.outline||=[new n(0,.3,4.1),new n(1.2,.3,2),new n(-1.2,.3,2),new n(1.4,.3,-1),new n(-1.4,.3,-1),new n(1.2,.3,-3.8),new n(-1.2,.3,-3.8)],l=Op;for(let n of i)this.toWorld(n,a),l.copy(a),l.y-=.9,this.colliders.resolveCapsule(l,.25,1.6,0)&&(o.copy(this.angular).cross(c.copy(a).sub(r)).add(this.velocity),s.set((l.x-a.x)*26e4-o.x*8e3,0,(l.z-a.z)*26e4-o.z*8e3),e.add(s),t.add(c.copy(a).sub(r).cross(s)))}}apply(){let e=this.model.group;e.position.copy(this.position),e.quaternion.copy(this.quaternion),e.updateMatrixWorld(!0),this.toWorld(bp.set(0,0,3.9),this.bowWorld),this.toWorld(bp.set(0,0,-3.8),this.sternWorld)}},Mp=new n,Np=new n,Pp=new n;new n;var Fp=new n,Ip=new n,Lp=new n,Rp=new n,zp=new x,Bp=new n,Vp=new n(1,1,1),Hp={to:null,spread:.3,jitter:.05,life:.8,sizeJitter:.5},Up=class{constructor({speedThreshold:e,velocityScale:t,intensity:n,lifetime:r}){this.speedThreshold=e,this.velocityScale=t,this.intensity=n,this.lifetime=r}response(e){return Math.min(30,Math.max(0,e-this.speedThreshold)*this.velocityScale)}},Wp=3,Gp=300,Kp=150,qp=class{constructor({boat:e,spray:t}){this.boat=e,this.spray=t,this.velocitySource=new Up({speedThreshold:.4,velocityScale:1.6,intensity:1,lifetime:.8}),this.impactSource=new Up({speedThreshold:.6,velocityScale:1.2,intensity:3,lifetime:1.4});let r=e.model.lines,i=r.wlEnd-.02,a=0;for(let e=r.wlStart;e<=r.wlEnd;e+=.05)a=Math.max(a,r.halfBeamAt(e));let o=i;for(;o>r.wlStart&&r.halfBeamAt(o)<.92*a;)o-=.05;this.contacts=[];for(let e of[1,-1]){let t=[];for(let a=0;a<=Wp;a++){let s=(a/Wp)**1.3,c=i+(o-i)*s;t.push(new n(e*(r.halfBeamAt(c)+.03),.05,c))}for(let r=0;r<Wp;r++){let i=t[r],a=t[r+1],o=Fp.subVectors(a,i).setY(0).normalize();this.contacts.push({side:e,a:i,b:a,mid:i.clone().add(a).multiplyScalar(.5),length:i.distanceTo(a),normal:new n(-e*o.z,0,e*o.x),depth:0,rate:0,primed:!1,carry:[0,0,0,0,0]})}}let s=0;for(let e=0;e<=200;e++)s=Math.max(s,r.sheerX(e/200));let c=r.zBow;for(;c>r.zAft&&r.sheerX(r.tAtSheerZ(c))<.95*s;)c-=.05;let l=i;for(;l>r.wlStart&&r.halfBeamAt(l)<.95*a;)l-=.05;let u=new S;for(let t of e.model.colliders||[])(t.tag===`houseWall`||t.tag===`roof`)&&(u.expandByPoint(Fp.copy(t.center).sub(t.half)),u.expandByPoint(Fp.copy(t.center).add(t.half)));u.isEmpty()&&u.set(new n(0,-10,0),new n(0,-10,0)),this.shape={zAft:r.zAft,zShoulder:c,zStem:r.zBow,halfBeam:s+.02,wlShoulder:l,wlStem:r.wlEnd,wlHalfBeam:a+.01,ySheerAft:r.sheerY(0)+.04,ySheerStem:r.sheerY(1)+.04,yBottom:-.8,boxMin:u.min.clone(),boxMax:u.max.clone()},t.setBodyShape&&t.setBodyShape(this.shape),this.stern=new n(0,.05,r.wlStart+.1),this.washCarry=0,this.slamCooldown=0,this.burst=0,this.stats={particles:0,requests:0,demandV:0,demandI:0}}_halfBeam(e,t){let n=this.shape,r=f.clamp,i=f.lerp,a=i(n.ySheerAft,n.ySheerStem,r((e-n.zAft)/(n.zStem-n.zAft),0,1)),o=r(t/Math.max(a,.1),0,1),s=i(n.wlShoulder,n.zShoulder,o),c=i(n.wlStem,n.zStem,o),l=i(n.wlHalfBeam,n.halfBeam,o);if(e>=c)return 0;let u=r((e-s)/Math.max(c-s,.01),0,1);return l*Math.sqrt(Math.max(1-u*u,.02))}_emit(e,t,n,r,i,a,o,s,c){e.carry[t]+=n;let l=Math.floor(e.carry[t]);l<=0||(e.carry[t]-=l,!(this.spray.nReq>24)&&(Hp.to=Np,Hp.spread=o,Hp.jitter=s,Hp.life=a,Hp.sizeJitter=.6,this.spray.emit(Mp,c,l,i,r,Hp),this.stats.particles+=l,this.stats.requests++))}update(e){let t=this.boat,r=this.spray;if(this.stats.particles=this.stats.requests=0,r.setBody&&r.setBody(zp.compose(t.position,t.quaternion,Vp),t.velocity),e<=0||!t.hasWater)return;e=Math.min(e,1/20),t.forward(Rp);let i=Math.max(t.velocity.dot(Rp),0),a=this.velocitySource,o=this.impactSource;this.slamCooldown=Math.max(0,this.slamCooldown-e);let s=0,c=0,l=0,u=0;for(let r of this.contacts){t.toWorld(r.mid,Pp);let d=t.sampleWaterAt(Pp),p=d-Pp.y,m=r.primed?(p-r.depth)/e:0;r.rate+=(m-r.rate)*Math.min(1,e/.03),r.depth=p,r.primed=!0;let h=f.smoothstep(p,-.35,-.08)*(1-f.smoothstep(p,.7,1.1));r.wet=h,Lp.subVectors(Pp,t.position),Ip.copy(t.angular).cross(Lp).add(t.velocity),r.vel=r.vel||new n,r.vel.copy(Ip),r.n=r.n||new n,r.n.copy(r.normal).applyQuaternion(t.quaternion).setY(0).normalize(),r.hw=d;let g=Math.max(0,Ip.x*r.n.x+Ip.z*r.n.z);r.rV=a.response(g),r.rI=o.response(r.rate),r.demandV=r.length*r.rV*a.intensity*h,r.demandI=r.length*r.rI*o.intensity*h*(.15+.85*f.smoothstep(i,2,6)),l+=r.demandV,u+=r.demandI,s+=r.demandV+r.demandI,r.a.z===this.contacts[0].a.z&&h>.3&&i>2.5&&(c=Math.max(c,Math.min((r.rate-1.8)*.4+i*.02,1)))}this.stats.demandV=l,this.stats.demandI=u,c>0&&this.slamCooldown===0&&(this.slamCooldown=.4,t.onSlam&&t.onSlam(c)),this.burst=Math.max(this.burst*Math.exp(-e/.15),c);let d=this.burst,p=1+2.5*d,m=Math.min(1,Kp/Math.max(1e-6,s*Gp*e*p*1.3));f.smoothstep(i,4,10);let h=f.smoothstep(i,3,6),g=this._side||=[{best:null,n:0},{best:null,n:0}];g[0].best=g[1].best=null,g[0].n=g[1].n=0;for(let t of this.contacts){let n=t.demandV+t.demandI,r=g[t.side>0?0:1];t.nEmit=n*Gp*e*m*p,r.n+=t.nEmit,n>1e-4&&(!r.best||n>r.best.demandV+r.best.demandI)&&(r.best=t)}for(let e of this.contacts){if(e.demandV+e.demandI<=1e-4)continue;let n=e.nEmit,r=e.demandI/(e.demandV+e.demandI),i=e.rV*(1-r)+e.rI*r,s=e.vel.x*e.n.x+e.vel.z*e.n.z;Fp.copy(e.vel).addScaledVector(e.n,-s).multiplyScalar(.6),Fp.y=e.vel.y*.3;let c=e.rV*.55*(1-r)+e.rI*1.15*r+d*2.5;Fp.addScaledVector(e.n,.8*i+.4+d*1),Fp.y+=c;let l=Math.min(.5,s*s/(2*v)*.5),u=Math.min(Math.max(e.hw+l-t.position.y,-.3),.9),p=Math.min(Math.max(e.hw+l*.6-t.position.y,-.3),.9);t.toWorld(Bp.set(e.side*(this._halfBeam(e.a.z,u)+.05),u,e.a.z),Mp),t.toWorld(Bp.set(e.side*(this._halfBeam(e.b.z,p)+.05),p,e.b.z),Np),Mp.y=e.hw+l,Np.y=e.hw+l*.6;let m=(.3*Math.hypot(.65*i,c)+.15)*(1+d),_=a.lifetime*(1-r)+o.lifetime*r;this._emit(e,0,n,cc.DROPLET,.005+6e-4*i,_,m,.05,Fp);let y=g[e.side>0?0:1];if(y.best!==e)continue;let b=y.n;this._emit(e,1,b*.025*h*(1-d*.5),cc.SHEET,.12+.02*i,.45,m*.5,.06,Fp),this._emit(e,2,b*.3*f.smoothstep(i,1,5),cc.LIGAMENT,.011+.0012*i,_,m,.05,Fp),this._emit(e,3,b*(.06*r*f.smoothstep(e.rI,1.5,5)+.1*d)*h,cc.SPRAY,.04+.004*i+.03*d,.6+.4*r,m,.12,Fp),this._emit(e,4,b*(.04*r+.15*d)*h,cc.MIST,.3+.2*d,2,m*.5,.15,Ip.copy(Fp).multiplyScalar(.6))}t.toWorld(t.model.propeller,Pp);let _=t.sampleWaterAt(Pp)-Pp.y,y=t.driven&&_>-.2?Math.sqrt(Math.abs(t.thrust||0)/1e3)*Math.exp(-Math.max(_,0)/.45):0;if(y>.05&&(t.toWorld(this.stern,Mp),t.sampleWaterAt(Mp)-Mp.y>-.3)){this.washCarry+=y*45*e;let n=Math.floor(this.washCarry);this.washCarry-=n;let i=Math.sign(t.thrust||t.throttle)||1;Fp.copy(t.velocity).multiplyScalar(.6).addScaledVector(Rp,-(.8+y*.6)*i),Fp.y=.5+y*.5,n>0&&r.nReq<=24&&(Hp.to=null,Hp.spread=.8,Hp.jitter=.35,Hp.life=.8,Hp.sizeJitter=.5,r.emit(Mp,Fp,n,.005,cc.DROPLET,Hp),this.stats.particles+=n,this.stats.requests++)}}},Jp=512,Yp=9,Xp=Jp/2,Zp=511,Qp=.4,$p=Jp*Qp,em=[1/0,6,1.8,.6],tm=22,nm=32,rm=88,im=-1.6,am=-4.4,om=e=>{let t=String(e);return/[.e]/.test(t)?t:t+`.0`},sm=class{constructor(e,{terrainGPU:t,boat:i,colliders:a=null}){this.renderer=e,this.terrain=t,this.boat=i,this.lines=i.model.lines;let o=this.kernelParams=new l(`WakeKernel`,{origin:[`vec2f`,new p],prev:[`vec2f`,new p],center:[`vec2f`,new p],boatPos:[`vec2f`,new p],boatRot:[`vec2f`,new p(1,0)],dead:[`vec2f`,new p(.03,.08)],trim:[`vec3f`,new n],reset:[`f32`,1],pileBox:[`vec4f`,new r(0,0,1,1)],dt:[`f32`,1/60],amount:[`f32`,0],source:[`f32`,1],wash:[`f32`,0],bow:[`f32`,0],speed:[`f32`,0],washW:[`f32`,.6],boil:[`f32`,1.2],visc:[`f32`,.006],dyn:[`f32`,0],hollow:[`f32`,1],hollowK:[`f32`,0],amplitude:[`f32`,1],foamGain:[`f32`,.35],aerGain:[`f32`,1],aerOut:[`f32`,.3],nearRate:[`f32`,1]},{label:`wake kernel params`}),s=this.readerParams=new l(`WakeParams`,{center:`vec2f`,boatPos:`vec2f`,boatRot:`vec2f`,dead:`vec2f`,amount:`f32`,amplitude:`f32`,aerOut:`f32`},{label:`wake params`});for(let e of s.order)s.fields[e]=o.fields[e];let c=o.fields;this.uOrigin=c.origin,this.uPrev=c.prev,this.uReset=c.reset,this.uDt=c.dt,this.uCenter=c.center,this.uAmount=c.amount,this.uBoatPos=c.boatPos,this.uBoatRot=c.boatRot,this.uTrim=c.trim,this.uSource=c.source,this.uWash=c.wash,this.uBow=c.bow,this.uSpeed=c.speed,this.uWashW=c.washW,this.uBoil=c.boil,this.uVisc=c.visc,this.uDyn=c.dyn,this.dynamicPressure=.35,this.uHollow=c.hollow,this.uHollowK=c.hollowK,this.amplitude=c.amplitude,this.foamGain=c.foamGain,this.sourceGain=.72,this.state=new ve({label:`wakeState`,count:Jp*Jp,type:`vec4f`}),this.scratch=new ve({label:`wakeScratch`,count:Jp*Jp,type:`vec4f`}),this.spec=new ve({label:`wakeSpectrum`,count:Jp*Jp,type:`vec4f`}),this.aerA=new ve({label:`wakeAer`,count:Jp*Jp,type:`f32`}),this.aerB=new ve({label:`wakeAerNext`,count:Jp*Jp,type:`f32`}),this.aerGain=c.aerGain,this.aerOut=c.aerOut,this.display=new N({label:`wakeDisplay`,width:Jp,height:Jp,format:`rgba16float`,usage:[`sample`,`storage`],sampler:`linearRepeat`}),this.aerTex=new N({label:`wakeAeration`,width:Jp,height:Jp,format:`rgba16float`,usage:[`sample`,`storage`],sampler:`nearestRepeat`}),this.nearBuf=new ve({label:`wakeNearMean`,count:2816,type:`f32`}),this.nearTex=new N({label:`wakeNearField`,width:nm,height:rm,format:`rgba16float`,usage:[`sample`,`storage`],sampler:`nearestClamp`}),this.uNearRate=c.nearRate,this.uDead=c.dead,this._bakeHull(),this._bakePiles(a),this._buildKernels(),this._buildReaders(),this.center=new p,this.hasWindow=!1,this.sleeping=!0,this.idleTime=1e9,this.stepCount=0,this.primed=!1,this.settleTime=40}_bakeHull(){let e=this.lines,t=1.9,n=e.zAft-.8,r=e.wlEnd+.8,i=.55,a=new Uint16Array(2688);for(let o=0;o<112;o++)for(let s=0;s<24;s++){let c=(s+.5)/24*t,l=n+(o+.5)/112*(r-n),u=0,d=0;for(let t=-3;t<=3;t++)for(let n=-3;n<=3;n++){let r=t/3*i,a=n/3*i,o=Math.exp(-(r*r+a*a)/(i*i*.4)),s=e.bottomAt(c+r,l+a);u+=o*(Number.isFinite(s)?Math.max(0,-s):0),d+=o}a[o*24+s]=_.toHalfFloat(s===23||o===0||o===111?0:u/d)}this.hullTex=new N({label:`wakeHull`,width:24,height:112,format:`r16float`,data:a,sampler:`linearClamp`}),this.hullBox={X1:t,Z0:n,Z1:r}}_bakePiles(e){let t=e?e.cylinders.filter(e=>e.tag===`pile`&&e.yMin<-.1&&e.yMax>.2):[],n=0,r=0,i=1,a=1;t.length&&(n=Math.min(...t.map(e=>e.x-e.radius))-1,i=Math.max(...t.map(e=>e.x+e.radius))+1,r=Math.min(...t.map(e=>e.z-e.radius))-1,a=Math.max(...t.map(e=>e.z+e.radius))+1);let o=Math.max(.1,(i-n)/2048,(a-r)/2048),s=Math.max(2,Math.ceil((i-n)/o)),c=Math.max(2,Math.ceil((a-r)/o)),l=new Float32Array(s*c);for(let e of t){let t=Math.floor((e.x-e.radius-n)/o),i=Math.ceil((e.x+e.radius-n)/o),a=Math.floor((e.z-e.radius-r)/o),u=Math.ceil((e.z+e.radius-r)/o);for(let d=Math.max(0,a);d<=Math.min(c-1,u);d++)for(let a=Math.max(0,t);a<=Math.min(s-1,i);a++){let t=0;for(let i=0;i<4;i++)for(let s=0;s<4;s++){let c=n+(a+(i+.5)/4)*o,l=r+(d+(s+.5)/4)*o;(c-e.x)**2+(l-e.z)**2<e.radius*e.radius&&t++}l[d*s+a]=Math.min(1,l[d*s+a]+t/16)}}let u=Math.max(1,Math.round(Qp/o/2)),d=new Uint16Array(s*c);for(let e=0;e<c;e++)for(let t=0;t<s;t++){let n=0,r=0;for(let i=-u;i<u;i++)for(let a=-u;a<u;a++){let o=t+a,u=e+i;o>=0&&u>=0&&o<s&&u<c&&(n+=l[u*s+o]),r++}d[e*s+t]=_.toHalfFloat(n/r)}this.pileTex=new N({label:`wakePiles`,width:s,height:c,format:`r16float`,data:d,sampler:`linearClamp`}),this.pileCount=t.length,this.uPileBox=this.kernelParams.fields.pileBox,this.uPileBox.value.set(n,r,i-n,a-r)}_buildKernels(){let e=this.hullBox,t=this.lines;this.commonModule=new g({name:`wakeCommon`,deps:[Re],code:`
const WAKE_N: u32 = ${Jp}u;
const WAKE_HALF: u32 = ${Xp}u;
const WAKE_MASK: u32 = ${Zp}u;
const WAKE_CELL: f32 = ${om(Qp)};
const WAKE_SIZE: f32 = ${om($p)};
const WAKE_TW: u32 = ${nm}u;
const WAKE_TH: u32 = ${rm}u;

// integer lattice hash -> [0, 1), smooth value noise
fn wakeHash( ix: i32, iy: i32 ) -> f32 {
	var v = ( u32( ix ) * 0x8da6b343u ) ^ ( u32( iy ) * 0xd8163841u );
	v = ( v ^ ( v >> 13u ) ) * 0x5bd1e995u;
	v = v ^ ( v >> 15u );
	return f32( v >> 8u ) * ( 1.0 / 16777216.0 );
}

fn wakeNoise( q: vec2f ) -> f32 {
	let i = floor( q );
	let fr = fract( q );
	let u = fr * fr * ( 3.0 - 2.0 * fr );
	let ix = i32( i.x ); let iy = i32( i.y );
	let a = wakeHash( ix, iy ); let b = wakeHash( ix + 1, iy );
	let c = wakeHash( ix, iy + 1 ); let d = wakeHash( ix + 1, iy + 1 );
	return mix( mix( a, b, u.x ), mix( c, d, u.x ), u.y );
}
`});let n=new g({name:`wakeSim`,deps:[this.commonModule,this.terrain.module],uniforms:this.kernelParams,uniformName:`wk`,bindings:{wakeState:{storage:this.state,access:`read_write`},wakeScratch:{storage:this.scratch,access:`read_write`},wakeSpec:{storage:this.spec,access:`read_write`},wakeAerA:{storage:this.aerA,access:`read_write`},wakeAerB:{storage:this.aerB,access:`read_write`},wakeHullTex:{texture:this.hullTex}},code:`
const WAKE_LOG2N: u32 = ${Yp}u;

fn wakeBrev( v: u32 ) -> u32 { return reverseBits( v ) >> ( 32u - WAKE_LOG2N ); }

// toroidal texel -> world cell index in the window starting at o
fn wakeWorldIndex( i: i32, o: i32 ) -> i32 { return o + ( ( i - o ) & i32( WAKE_MASK ) ); }
fn wakeInWindow( I: i32, J: i32, o: vec2f ) -> bool {
	return I >= i32( o.x ) && I < i32( o.x ) + i32( WAKE_N ) && J >= i32( o.y ) && J < i32( o.y ) + i32( WAKE_N );
}

// state of texel (c, r) if it held the same world cell last step, else zero
fn wakeLoadState( c: u32, r: u32 ) -> vec4f {
	let I = wakeWorldIndex( i32( c ), i32( wk.origin.x ) );
	let J = wakeWorldIndex( i32( r ), i32( wk.origin.y ) );
	let keep = wakeInWindow( I, J, wk.prev ) && wk.reset < 0.5;
	return select( vec4f( 0.0 ), wakeState[ r * WAKE_N + c ], keep );
}

fn wakeLoadAer( c: u32, r: u32 ) -> f32 {
	let I = wakeWorldIndex( i32( c ), i32( wk.origin.x ) );
	let J = wakeWorldIndex( i32( r ), i32( wk.origin.y ) );
	let keep = wakeInWindow( I, J, wk.prev ) && wk.reset < 0.5;
	return select( 0.0, wakeAerA[ r * WAKE_N + c ], keep );
}

fn wakeCellPos( c: u32, r: u32 ) -> vec2f {
	let I = wakeWorldIndex( i32( c ), i32( wk.origin.x ) );
	let J = wakeWorldIndex( i32( r ), i32( wk.origin.y ) );
	return vec2f( f32( I ) + 0.5, f32( J ) + 0.5 ) * WAKE_CELL;
}

// sqrt of the blend weights of the four operators (deep, 6, 1.8, 0.6 m) for local depth d:
// the two levels bracketing d share the weight (fitted for <= 5 % phase-speed error over
// 1-100 m wavelengths down to 0.5 m depth); below 0.6 m the shallowest one fades out
fn wakeDepthWeights( d: f32 ) -> vec4f {
	let t0 = 1.0 - exp( ( d - 6.0 ) / - 9.0 );
	let t1 = pow( sat( ( d - 1.8 ) / 4.2 ), 0.8 );
	let t2 = pow( sat( ( d - 0.6 ) / 1.2 ), 0.85 );
	let w0 = select( 0.0, t0, d > 6.0 );
	let w1 = select( select( 0.0, t1, d > 1.8 ), 1.0 - t0, d > 6.0 );
	let w2 = select( select( select( 0.0, t2, d > 0.6 ), 1.0 - t1, d > 1.8 ), 0.0, d > 6.0 );
	let w3 = select( select( sat( d / 0.6 ), 1.0 - t2, d > 0.6 ), 0.0, d > 1.8 );
	return sqrt( vec4f( w0, w1, w2, w3 ) );
}

// hull immersion (m) at boat-frame (x, z): design immersion + scheduled heave / trim
fn wakeImmersionAt( x: f32, z: f32 ) -> f32 {
	let huv = vec2f( abs( x ) / ${om(e.X1)}, ( z - ${om(e.Z0)} ) / ${om(e.Z1-e.Z0)} );
	let D = textureSampleLevel( wakeHullTex, smpLinearClamp, huv, 0.0 ).x;
	return max( D + wk.trim.x + wk.trim.y * x + wk.trim.z * z, 0.0 ) * smoothstep( 0.0, 0.04, D );
}

// radix-2 DIT butterflies (bit-reversed in, natural order out); dir = -1 forward, +1 inverse
// (unnormalized): twiddle and pair index of thread t in stage s
fn wakeTwiddle( t: u32, s: u32, dir: f32 ) -> vec2f {
	let half = 1u << s;
	let pos = t & ( half - 1u );
	let ang = f32( pos ) * ( dir * PI / f32( half ) );
	return vec2f( cos( ang ), sin( ang ) );
}
fn wakeStageIndex( t: u32, s: u32 ) -> u32 {
	let half = 1u << s;
	return ( ( t >> s ) << ( s + 1u ) ) | ( t & ( half - 1u ) );
}
fn wakeCmul( b: vec4f, w: vec2f ) -> vec4f {
	return vec4f( b.x * w.x - b.y * w.y, b.x * w.y + b.y * w.x, b.z * w.x - b.w * w.y, b.z * w.y + b.w * w.x );
}
`}),r=(e,t,n)=>`
	for ( var s = 0u; s < WAKE_LOG2N; s++ ) {
		let half = 1u << s;
		let i0 = wakeStageIndex( t, s );
		let w = wakeTwiddle( t, s, ${om(n)} );
${t.map(t=>`		{
			let i = i0 + ${t}u;
			let j = i + half;
			let a = ${e}[ i ];
			let bw = wakeCmul( ${e}[ j ], w );
			${e}[ i ] = a + bw;
			${e}[ j ] = a - bw;
		}
`).join(``)}		workgroupBarrier();
	}
`,i=`
fn wakeCell( col: u32, row: u32 ) -> vec4f {
	let dt = wk.dt;
	let idx = row * WAKE_N + col;
	let p = wakeCellPos( col, row );
	let s = wakeLoadState( col, row );
	let cL = ( col + WAKE_MASK ) & WAKE_MASK; let cR = ( col + 1u ) & WAKE_MASK;
	let rD = ( row + WAKE_MASK ) & WAKE_MASK; let rU = ( row + 1u ) & WAKE_MASK;
	let sL = wakeLoadState( cL, row ); let sR = wakeLoadState( cR, row );
	let sD = wakeLoadState( col, rD ); let sU = wakeLoadState( col, rU );

	let d = frame.seaLevel - terrainHeightAt( p );

	// boat frame of the cell
	let rel = p - wk.boatPos;
	let cs = wk.boatRot.x; let sn = wk.boatRot.y;
	let bx = rel.x * cs - rel.y * sn;
	let bz = rel.x * sn + rel.y * cs;
	// hull pressure head (m): hydrostatic (immersion, with the speed-scheduled trim) and a
	// dynamic part where the hull enters the water: ~ K U^2/2g times the rise of the bottom
	let e = 0.7;
	let Ph = wakeImmersionAt( bx, bz );
	let entry = max( ( wakeImmersionAt( bx, bz - e ) - wakeImmersionAt( bx, bz + e ) ) / ( 2.0 * e ), 0.0 );
	// transom stern at speed: the flow separates at the transom and leaves a hollow behind it
	// (then the rooster tail and the quarter waves)
	let aft = ${om(t.zAft)} - bz;
	let hollow = wakeImmersionAt( bx, ${om(t.zAft+.25)} ) * exp( - max( aft, 0.0 ) / wk.hollow ) * smoothstep( - 0.3, 0.3, aft );
	let P = ( max( Ph, hollow * wk.hollowK ) + entry * wk.dyn ) * wk.source;

	// on a (re)start the water under the hull is already displaced: no transient
	let h = select( s.x, - P, wk.reset > 0.5 );
	let w = s.y;

	let gx = ( sR.x - sL.x ) / ( 2.0 * WAKE_CELL ); let gz = ( sU.x - sD.x ) / ( 2.0 * WAKE_CELL );
	let slope = length( vec2f( gx, gz ) );

	// obstacles: dry land, pier piles
	let puv = ( p - wk.pileBox.xy ) / wk.pileBox.zw;
	let pileIn = select( 0.0, 1.0, puv.x > 0.0 && puv.x < 1.0 && puv.y > 0.0 && puv.y < 1.0 );
	let pile = textureSampleLevel( wakePileTex, smpLinearClamp, puv, 0.0 ).x * pileIn;
	let wet = smoothstep( 0.0, 0.05, d );
	let keep = wet * sat( 1.0 - pile * 2.5 );

	// breaking: steep crests (deep water) and depth-limited (surf zone); free waves only, the
	// forced depression under the hull is steep but does not break
	let brk = sat( ( slope - 0.2 ) / 0.2 ) * ( 1.0 - smoothstep( 0.0, 0.03, P ) );
	let surf = sat( ( h - d * 0.42 ) / max( d * 0.3, 0.03 ) ) * wet;
	let turb = s.w;

	// propeller wash / transom wake (boat frame): widens behind the transom, streaky
	// (lateral noise that changes as the boat moves on) and patchy
	let time = frame.time;
	let behind = ${om(t.zAft)} - bz;
	let washW = max( behind, 0.0 ) * 0.1 + wk.washW;
	let inWash = smoothstep( - 0.6, 0.3, behind ) * smoothstep( 7.0, 1.5, behind ) * smoothstep( washW, washW * 0.3, abs( bx ) );
	let streak = wakeNoise( vec2f( bx * 1.7, time * 0.9 ) );
	let patchN = wakeNoise( p * 0.45 + time * 0.13 );
	// churning white right behind the transom (the propeller race), streaks and patches further aft
	let race = smoothstep( 7.0, 0.0, behind ) * 0.9;
	// streaks: noise stretched along the track (fixed in the water), deposited with the wash so
	// the band is laid down as long ragged streaks, not a uniform ribbon
	let along = p.x * sn + p.y * cs; let across = p.x * cs - p.y * sn;
	let streaks = wakeNoise( vec2f( along * 0.12, across * 0.9 ) ) * 0.7 + wakeNoise( vec2f( along * 0.3, across * 1.9 ) + 5.3 ) * 0.3;
	let mottle = clamp( ( streaks - 0.5 ) * 3.2, - 0.85, 0.85 ) + 1.0;
	let washGen = inWash * wk.wash * ( wk.speed + 1.5 ) * ( streak * patchN * 0.6 + race + 0.08 ) * mix( mottle, 1.0, smoothstep( 3.0, 0.0, behind ) * 0.7 );

	// bow: the spray thrown off the forward hull falls back in a band just outside the
	// waterline (up to ~1.3 m out), where the bow wave rolls away from the hull
	let outside = 1.0 - smoothstep( 0.0, 0.03, Ph );
	let nearHull = smoothstep( 0.0, 0.03, wakeImmersionAt( max( abs( bx ) - 0.9, 0.0 ), bz ) );
	let bowBand = outside * nearHull * smoothstep( - 0.5, 1.2, bz ) * smoothstep( 4.2, 3.2, bz );
	let bowGen = bowBand * wk.bow * ( wk.speed + 1.0 ) * ( wakeNoise( vec2f( bz * 1.5, time * 3.0 ) ) * 1.4 + 0.1 ) * 0.35;

	// Dissipation is a turbulent eddy viscosity acting on w in flux form: it conserves mass
	// exactly, damps short (breaking, choppy) waves ~k^2 and leaves the refilling flow behind
	// the hull alone. Breaking crests and the surf feed the turbulence; the turbulent wash
	// also stirs the surface (boils).
	let nuC = min( turb * 0.6, 1.0 ) + wk.visc;
	let flux = ( ( nuC + min( sL.w * 0.6, 1.0 ) + wk.visc ) * ( sL.y - w )
		+ ( nuC + min( sR.w * 0.6, 1.0 ) + wk.visc ) * ( sR.y - w )
		+ ( nuC + min( sD.w * 0.6, 1.0 ) + wk.visc ) * ( sD.y - w )
		+ ( nuC + min( sU.w * 0.6, 1.0 ) + wk.visc ) * ( sU.y - w ) ) * ( 0.5 / ( WAKE_CELL * WAKE_CELL ) );
	// boils: Laplacian of (turbulence x noise), so the stirring sums to zero (conserves mass)
	var boil = 0.0;
	if ( turb + sL.w + sR.w + sD.w + sU.w > 0.02 ) {
		let drift = vec2f( time * 0.5, time * - 0.35 );
		let c0 = ( wakeNoise( p * 0.45 + drift ) - 0.5 ) * min( turb, 1.5 );
		boil = ( wakeNoise( ( p - vec2f( WAKE_CELL, 0.0 ) ) * 0.45 + drift ) - 0.5 ) * min( sL.w, 1.5 )
			+ ( wakeNoise( ( p + vec2f( WAKE_CELL, 0.0 ) ) * 0.45 + drift ) - 0.5 ) * min( sR.w, 1.5 )
			+ ( wakeNoise( ( p - vec2f( 0.0, WAKE_CELL ) ) * 0.45 + drift ) - 0.5 ) * min( sD.w, 1.5 )
			+ ( wakeNoise( ( p + vec2f( 0.0, WAKE_CELL ) ) * 0.45 + drift ) - 0.5 ) * min( sU.w, 1.5 )
			- c0 * 4.0;
	}
	let w1 = ( w + flux * dt + boil * ( dt * wk.boil ) ) * exp( dt * - 0.006 ) * keep;

	// foam: thick foam thins quickly (bubbles rise and burst), the lace lingers
	let lapF = ( sL.z + sR.z + sD.z + sU.z - s.z * 4.0 ) / ( WAKE_CELL * WAKE_CELL );
	// foam streaks widen: molecular-ish spreading plus turbulent mixing in the wash
	let f0 = max( s.z + lapF * min( dt * ( turb * 0.3 + 0.04 ), 0.03 ), 0.0 );
	let gen = ( washGen + bowGen + brk * 3.0 + surf * 4.0 ) * wk.foamGain;
	// the lace breaks up as it ages: it lingers in some patches and streaks and clears fast in
	// others (a fixed noise in the water: the pattern stays put while the foam thins)
	let breakup = wakeNoise( p * 0.17 + vec2f( 13.1, 7.3 ) ) * 0.65 + wakeNoise( p * 0.55 + vec2f( 3.7, 1.9 ) ) * 0.35;
	let clr = smoothstep( 0.3, 0.72, breakup ) * 2.6 + 0.2;
	let foam = min( f0 * exp( - dt * ( f0 * f0 * 0.6 + clr / 35.0 ) ) + gen * dt, 3.0 );
	let turb1 = min( turb * exp( dt * ( - 1.0 / 6.0 ) ) + ( inWash * wk.wash * ( wk.speed + 1.5 ) * 0.5 + brk * 4.0 + surf * 6.0 ) * dt, 3.0 );

	// aeration (0..~3): injected broadly by the race (not only where the surface foam is), by
	// breaking and the surf; mixed sideways by the turbulence; the bubbles rise out over ~25 s
	let aC = wakeLoadAer( col, row );
	let lapA = wakeLoadAer( cL, row ) + wakeLoadAer( cR, row ) + wakeLoadAer( col, rD ) + wakeLoadAer( col, rU ) - aC * 4.0;
	let a0 = max( aC + lapA * min( ( turb * 0.35 + 0.07 ) * dt / ( WAKE_CELL * WAKE_CELL ), 0.2 ), 0.0 );
	// the bubble cloud is wider than the white race and its edge wanders (soft, irregular)
	let wA = washW * ( wakeNoise( p * 0.22 + time * 0.05 ) * 0.8 + 0.8 );
	let aerBand = smoothstep( - 0.6, 0.3, behind ) * smoothstep( 9.0, 2.0, behind ) * smoothstep( wA, wA * 0.2, abs( bx ) );
	let aerGen = ( aerBand * wk.wash * ( wk.speed + 1.5 ) * ( ( race * 1.2 + 0.15 ) * ( patchN * 1.3 + streak * 0.5 + 0.1 ) )
		* ( mottle * mottle * 0.55 ) + bowGen * 0.6 + brk * 1.5 + surf * 2.0 ) * wk.aerGain;
	// bubbles rise out over ~25 s, faster in some patches (mottled as it ages)
	let rise = smoothstep( 0.25, 0.75, breakup * 0.6 + patchN * 0.4 ) * 1.3 + 0.45;
	let aer = min( a0 * exp( - dt * ( a0 * 0.06 + rise / 25.0 ) ) + aerGen * dt, 3.0 ) * wet;
	wakeAerB[ idx ] = aer;
	textureStore( wakeAerOut, vec2u( col, row ), vec4f( aer, 0.0, 0.0, 0.0 ) );

	wakeScratch[ idx ] = vec4f( h, w1, foam, turb1 );
	// the free surface is h (pushed down under the hull, the hollow behind the transom)
	textureStore( wakeDisplayOut, vec2u( col, row ), vec4f( h, gx, gz, foam ) );

	return wakeDepthWeights( d ) * ( h + P );
}
`;this.rowKernel=new C({label:`Wake Rows`,modules:[n],bindings:{wakePileTex:{texture:this.pileTex},wakeDisplayOut:{storageTexture:this.display,access:`write`},wakeAerOut:{storageTexture:this.aerTex,access:`write`}},workgroupSize:[Xp,1,1],code:i+`
var<workgroup> shRow: array<vec4f, ${Jp}>;

@compute @workgroup_size( WG_X, 1, 1 )
fn main( @builtin( local_invocation_id ) lid: vec3u, @builtin( workgroup_id ) wid: vec3u ) {
	let t = lid.x;
	let row = wid.x;
	for ( var e = 0u; e < 2u; e++ ) {
		let col = t + e * WAKE_HALF;
		shRow[ wakeBrev( col ) ] = wakeCell( col, row );
	}
	workgroupBarrier();
${r(`shRow`,[0],-1)}
	for ( var e = 0u; e < 2u; e++ ) {
		let col = t + e * WAKE_HALF;
		wakeSpec[ row * WAKE_N + col ] = shRow[ col ];
	}
}
`});let a=2*Math.PI/$p,o=1/(Jp*Jp),s=em.map(e=>(e===1/0?`k`:`k * tanh( min( k * ${om(e)}, 12.0 ) )`)+` * ${om(o)}`);this.colKernel=new C({label:`Wake Columns`,modules:[n],bindings:{wakeDisplayTex:{texture:this.display},wakeNearBuf:{storage:this.nearBuf,access:`read_write`},wakeNearOut:{storageTexture:this.nearTex,access:`write`}},workgroupSize:[Xp,1,1],code:`
var<workgroup> shCol: array<vec4f, ${Jp*2}>;

// Z = FFT(a) + i FFT(b) for each packed pair of real fields (a, b) = (s_i u, s_j u);
// Y = L_i FFT(a) + i L_j FFT(b) = Z (L_i + L_j) / 2 + conj( Z(-k) ) (L_i - L_j) / 2
fn wakeApply( Z: vec4f, Zm: vec4f, p: vec2f, m: vec2f ) -> vec4f {
	return vec4f( Z.x * p.x + Zm.x * m.x, Z.y * p.x - Zm.y * m.x, Z.z * p.y + Zm.z * m.y, Z.w * p.y - Zm.w * m.y );
}

@compute @workgroup_size( WG_X, 1, 1 )
fn main( @builtin( local_invocation_id ) lid: vec3u, @builtin( workgroup_id ) wid: vec3u ) {
	let t = lid.x;
	let wg = wid.x;
	if ( wg <= WAKE_HALF ) {
		let cA = wg;
		let cB = ( WAKE_N - wg ) & WAKE_MASK;
		for ( var e = 0u; e < 2u; e++ ) {
			let r = t + e * WAKE_HALF;
			let rb = wakeBrev( r );
			shCol[ rb ] = wakeSpec[ r * WAKE_N + cA ];
			shCol[ rb + WAKE_N ] = wakeSpec[ r * WAKE_N + cB ];
		}
		workgroupBarrier();
${r(`shCol`,[0,Jp],-1)}
		let fx = f32( select( i32( cA ) - i32( WAKE_N ), i32( cA ), cA < WAKE_HALF ) ) * ${om(a)};
		var outs: array<vec4f, 4>;
		for ( var e = 0u; e < 2u; e++ ) {
			let r = t + e * WAKE_HALF;
			let rm = ( WAKE_N - r ) & WAKE_MASK;
			let fz = f32( select( i32( r ) - i32( WAKE_N ), i32( r ), r < WAKE_HALF ) ) * ${om(a)};
			let k = length( vec2f( fx, fz ) );
			let L0 = ${s[0]}; let L1 = ${s[1]}; let L2 = ${s[2]}; let L3 = ${s[3]};
			let p = vec2f( L0 + L1, L2 + L3 ) * 0.5;
			let m = vec2f( L0 - L1, L2 - L3 ) * 0.5;
			outs[ e * 2u ] = wakeApply( shCol[ r ], shCol[ rm + WAKE_N ], p, m );
			outs[ e * 2u + 1u ] = wakeApply( shCol[ r + WAKE_N ], shCol[ rm ], p, m );
		}
		workgroupBarrier();
		for ( var e = 0u; e < 2u; e++ ) {
			let rb = wakeBrev( t + e * WAKE_HALF );
			shCol[ rb ] = outs[ e * 2u ];
			shCol[ rb + WAKE_N ] = outs[ e * 2u + 1u ];
		}
		workgroupBarrier();
${r(`shCol`,[0,Jp],1)}
		for ( var e = 0u; e < 2u; e++ ) {
			let r = t + e * WAKE_HALF;
			wakeSpec[ r * WAKE_N + cA ] = shCol[ r ];
			if ( cB != cA ) {
				wakeSpec[ r * WAKE_N + cB ] = shCol[ r + WAKE_N ];
			}
		}
	} else if ( wg <= WAKE_HALF + ${Math.ceil(2816/Xp)}u ) {
		// near-field template (spare workgroups): running mean of the wake height at
		// boat-frame points
		let k = ( wg - ( WAKE_HALF + 1u ) ) * WAKE_HALF + t;
		if ( k < WAKE_TW * WAKE_TH ) {
			let tx = k % WAKE_TW; let tz = k / WAKE_TW;
			let bx = ( f32( tx ) + 0.5 ) * ${om(3.2/nm)} + ${om(im)};
			let bz = ( f32( tz ) + 0.5 ) * ${om(8.8/rm)} + ${om(am)};
			let cs = wk.boatRot.x; let sn = wk.boatRot.y;
			let pw = wk.boatPos + vec2f( bx * cs + bz * sn, bz * cs - bx * sn );
			let eta = textureSampleLevel( wakeDisplayTex, smpLinearRepeat, pw / WAKE_SIZE, 0.0 ).x;
			let prev = wakeNearBuf[ k ];
			let mean = prev + ( eta - prev ) * wk.nearRate;
			wakeNearBuf[ k ] = mean;
			let border = tx == 0u || tx == WAKE_TW - 1u || tz == 0u || tz == WAKE_TH - 1u;
			let D = textureSampleLevel( wakeHullTex, smpLinearClamp, vec2f( abs( bx ) / ${om(e.X1)}, ( bz - ${om(e.Z0)} ) / ${om(e.Z1-e.Z0)} ), 0.0 ).x;
			let m = select( smoothstep( 0.0, 0.03, D ), 0.0, border );
			textureStore( wakeNearOut, vec2u( tx, tz ), vec4f( mean, m, 0.0, 0.0 ) );
		}
	}
}
`}),this.invKernel=new C({label:`Wake Inverse`,modules:[n],workgroupSize:[Xp,1,1],code:`
var<workgroup> shRow: array<vec4f, ${Jp}>;

@compute @workgroup_size( WG_X, 1, 1 )
fn main( @builtin( local_invocation_id ) lid: vec3u, @builtin( workgroup_id ) wid: vec3u ) {
	let t = lid.x;
	let row = wid.x;
	let dt = wk.dt;
	for ( var e = 0u; e < 2u; e++ ) {
		let col = t + e * WAKE_HALF;
		shRow[ wakeBrev( col ) ] = wakeSpec[ row * WAKE_N + col ];
	}
	workgroupBarrier();
${r(`shRow`,[0],1)}
	let rl = f32( ( i32( row ) - i32( wk.origin.y ) ) & i32( WAKE_MASK ) ) + 0.5;
	let ez = min( rl, f32( WAKE_N ) - rl );
	for ( var e = 0u; e < 2u; e++ ) {
		let col = t + e * WAKE_HALF;
		let idx = row * WAKE_N + col;
		let Y = shRow[ col ];
		let sc = wakeScratch[ idx ];
		let p = wakeCellPos( col, row );
		let d = frame.seaLevel - terrainHeightAt( p );
		let Lu = dot( wakeDepthWeights( d ), Y );
		let w1 = sc.y - Lu * ( dt * ${om(v)} );
		let h1 = sc.x + w1 * dt;
		let cl = f32( ( i32( col ) - i32( wk.origin.x ) ) & i32( WAKE_MASK ) ) + 0.5;
		let edge = min( min( cl, f32( WAKE_N ) - cl ), ez );
		let sig = smoothstep( ${om(tm)}, 0.0, edge );
		let k = exp( dt * ( sig * sig * - 6.0 ) );
		wakeState[ idx ] = vec4f( h1 * k, w1 * k, sc.z, sc.w );
		wakeAerA[ idx ] = wakeAerB[ idx ];
	}
}
`})}_buildReaders(){this.module=new g({name:`wake`,deps:[this.commonModule],uniforms:this.readerParams,uniformName:`wakeParams`,bindings:{wakeDisplay:{texture:this.display},wakeNear:{texture:this.nearTex},wakeAerTex:{texture:this.aerTex}},code:`
fn wakeEdgeDist( xz: vec2f ) -> f32 {
	let rel = abs( xz - wakeParams.center );
	return WAKE_SIZE / 2.0 - max( rel.x, rel.y );
}
fn wakeFade( xz: vec2f ) -> f32 { return smoothstep( 4.0, 16.0, wakeEdgeDist( xz ) ) * wakeParams.amount; }
// foam and aeration: a long fade toward the window edge, no visible end of the track
fn wakeFadeLong( xz: vec2f ) -> f32 { return smoothstep( 4.0, 45.0, wakeEdgeDist( xz ) ) * wakeParams.amount; }

// template texel coordinates of world xz (boat frame)
fn wakeNearCoord( xz: vec2f ) -> vec2f {
	let rel = xz - wakeParams.boatPos;
	let cs = wakeParams.boatRot.x; let sn = wakeParams.boatRot.y;
	let bx = rel.x * cs - rel.y * sn; let bz = rel.x * sn + rel.y * cs;
	return vec2f( ( bx - ${om(im)} ) * ${om(nm/3.2)}, ( bz - ${om(am)} ) * ${om(rm/8.8)} ) - 0.5;
}
fn wakeInTemplate( tc: vec2f ) -> bool { return tc.x > 0.0 && tc.y > 0.0 && tc.x < ${om(31)} && tc.y < ${om(87)}; }

// (outside the simulated window, or asleep, both fades are 0: nothing to read)
fn wakeOff( xz: vec2f ) -> bool { return wakeParams.amount <= 0.0 || wakeEdgeDist( xz ) <= 4.0; }

fn wakeSample( xz: vec2f ) -> vec4f {
	if ( wakeOff( xz ) ) { return vec4f( 0.0 ); }
	var s = textureSampleLevel( wakeDisplay, smpLinearRepeat, xz / WAKE_SIZE, 0.0 ) * vec4f( vec3f( wakeFade( xz ) ), wakeFadeLong( xz ) );
	// the forced depression under the hull is covered by it: keep its edge out of the normals
	let tc = wakeNearCoord( xz );
	if ( wakeInTemplate( tc ) ) {
		let m = textureLoad( wakeNear, vec2i( tc + 0.5 ), 0 ).y;
		s = vec4f( s.x, s.yz * ( 1.0 - m ), s.w );
	}
	return s;
}

// aeration (0..aerOut): the aeration texture is read with textureLoad (bilinear by hand), then
// mottled: a noise fixed in the water sets how milky each patchN is and where the band's edge
// falls (soft, irregular), so it breaks into clouds and streaks instead of a uniform ribbon
fn wakeAeration( xz: vec2f ) -> f32 {
	var out = 0.0;
	if ( wakeOff( xz ) ) { return out; }
	let tc = xz / WAKE_CELL - 0.5;
	let i = vec2i( floor( tc ) );
	let fr = fract( tc );
	let M = vec2i( i32( WAKE_MASK ) );
	let a = mix( mix( textureLoad( wakeAerTex, i & M, 0 ).x, textureLoad( wakeAerTex, ( i + vec2i( 1, 0 ) ) & M, 0 ).x, fr.x ),
		mix( textureLoad( wakeAerTex, ( i + vec2i( 0, 1 ) ) & M, 0 ).x, textureLoad( wakeAerTex, ( i + vec2i( 1, 1 ) ) & M, 0 ).x, fr.x ), fr.y );
	if ( a > 0.01 ) {
		let m = wakeNoise( xz * 0.3 + vec2f( frame.time * 0.02, 0.0 ) ) * 0.55 + wakeNoise( xz * 0.85 + 17.3 ) * 0.45;
		let aN = ( 1.0 - exp( a * - 0.5 ) ) * ( m * 0.8 + 0.6 );
		out = smoothstep( m * 0.2 + 0.03, m * 0.2 + 0.55, aN ) * wakeParams.aerOut * wakeFadeLong( xz );
	}
	return out;
}

fn wakeHeight( xz: vec2f ) -> f32 {
	if ( wakeOff( xz ) ) { return 0.0; }
	var h = textureSampleLevel( wakeDisplay, smpLinearRepeat, xz / WAKE_SIZE, 0.0 ).x;
	let tc = wakeNearCoord( xz );
	if ( wakeInTemplate( tc ) ) {
		// under the hull only waves moving relative to it remain (an old wake being crossed);
		// small residuals are sampling jitter of the steep near field and are dropped
		// (bilinear by hand: the template has no sampler)
		let i = vec2i( floor( tc ) );
		let fr = fract( tc );
		let a = textureLoad( wakeNear, i, 0 ); let b = textureLoad( wakeNear, i + vec2i( 1, 0 ), 0 );
		let c = textureLoad( wakeNear, i + vec2i( 0, 1 ), 0 ); let d = textureLoad( wakeNear, i + vec2i( 1, 1 ), 0 );
		let t = mix( mix( a, b, fr.x ), mix( c, d, fr.x ), fr.y );
		let r = h - t.x;
		h = mix( h, r * smoothstep( wakeParams.dead.x, wakeParams.dead.y, abs( r ) ), t.y );
	}
	return h * wakeFade( xz ) * wakeParams.amplitude;
}

// Displacement (vec3) of the wake surface at world xz (Lagrangian point of the ocean grid).
fn wakeDisplacement( xz: vec2f ) -> vec3f { return vec3f( 0.0, wakeHeight( xz ), 0.0 ); }

// slopes: (dh/dx, dh/dz), foam, aeration (0..1, bubbles in the water column: the prop race and
// breaking; lingers ~25 s, widening)
struct WakeFrag { slopes: vec2f, foam: f32, aeration: f32 };
fn wakeFragment( xz: vec2f ) -> WakeFrag {
	let s = wakeSample( xz );
	var o: WakeFrag;
	o.slopes = s.yz * wakeParams.amplitude;
	o.foam = s.w;
	o.aeration = wakeAeration( xz );
	return o;
}
`})}_dispatch(){_e.computePass(`Wake`,e=>{this.rowKernel.dispatch(Jp,{pass:e}),this.colKernel.dispatch(Jp,{pass:e}),this.invKernel.dispatch(Jp,{pass:e})})}update(e){let t=this.boat,n=Math.hypot(t.velocity.x,t.velocity.z),r=n>.5||t.driven&&Math.abs(t.throttle)>.04;if(this.idleTime=r?0:this.idleTime+e,this.idleTime>this.settleTime){this.sleeping=!0,this.uAmount.value=0,this.primed||this._prime();return}this.sleeping&&(this.sleeping=!1,this.hasWindow=!1,this.uReset.value=1),this.uAmount.value=Math.min(1,(this.settleTime-this.idleTime)/4);let i=Math.min(Math.max(e,1/240),1/30);this.uDt.value=i;let a=t.position.x/Qp,o=t.position.z/Qp,s=this.center;(!this.hasWindow||Math.abs(a-s.x)>Jp||Math.abs(o-s.y)>Jp)&&(s.set(Math.round(a),Math.round(o)),this.hasWindow=!0,this.uReset.value=1),a-s.x>170&&(s.x=Math.ceil(a-170)),s.x-a>170&&(s.x=Math.floor(a+170)),o-s.y>170&&(s.y=Math.ceil(o-170)),s.y-o>170&&(s.y=Math.floor(o+170)),this.uPrev.value.copy(this.uOrigin.value),this.uOrigin.value.set(s.x-Xp,s.y-Xp),this.uReset.value>.5&&this.uPrev.value.copy(this.uOrigin.value),this.uCenter.value.set(s.x*Qp,s.y*Qp);let c=t.forward(cm),l=Math.atan2(c.x,c.z);this.uBoatPos.value.set(t.position.x,t.position.z),this.uBoatRot.value.set(Math.cos(l),Math.sin(l)),this._scheduleTrim(n),this.uSpeed.value=n,this.uDyn.value=this.dynamicPressure*n*n/(2*v);let u=f.smoothstep(n,2,9);this.uHollow.value=.35+.015*n*n,this.uHollowK.value=.3*u,this.uSource.value=this.sourceGain*(1+.2*u);let d=t.driven?Math.abs(t.throttle)*t.rpm:0;this.uWash.value=d*1+f.smoothstep(n,1.5,7)*.5,this.uWashW.value=.7+.6*f.smoothstep(n,2,9),this.uBow.value=f.smoothstep(n,3.5,9),this.uNearRate.value=this.uReset.value>.5?1:1-Math.exp(-i/.25),this._dispatch(),this.primed=!0,this.uReset.value=0,this.stepCount++}_prime(){this.primed=!0,this.uReset.value=1,this.uPrev.value.copy(this.uOrigin.value),this._dispatch()}_scheduleTrim(e){let t=f.smoothstep(e,3,10);this.uTrim.value.set(-.08*t,0,-.035*t)}},cm=new n,lm={surf_far:{file:`surf_far.ogg`,loop:!0,lufs:-23},wind:{file:`wind.ogg`,loop:!0,lufs:-23.6},palms:{file:`palms.ogg`,loop:!0,lufs:-23.3},crickets:{file:`crickets.ogg`,loop:!0,lufs:-23},pier_lap:{file:`pier_lap.ogg`,loop:!0,lufs:-30.7},under_reef:{file:`under_reef.ogg`,loop:!0,lufs:-23},boat_engine:{file:`boat_engine.ogg`,loop:!0,lufs:-23},boat_lap:{file:`boat_lap.ogg`,loop:!0,lufs:-32.2},boat_rush:{file:`boat_rush.ogg`,loop:!0,lufs:-23.4},birds_dawn:{file:`birds_dawn.ogg`,loop:!0,lufs:-23.3},whale_song:{file:`whale_song.ogg`,loop:!0,lufs:-25.5},step_sand:{file:`step_sand.ogg`,slices:[[.08,.191],[.351,.3153],[.7463,.2237],[1.05,.516],[1.646,.436]],lufs:[-25,-25.4,-27,-22.5,-19.8]},step_wetsand:{file:`step_wetsand.ogg`,slices:[[.08,.171],[.331,.376],[.787,.226],[1.093,.246],[1.419,.221]],lufs:[-27.4,-19.6,-21.7,-20.9,-20.1]},surf_crash:{file:`surf_crash.ogg`,slices:[[.08,3.254],[3.414,2.504],[5.998,2.554],[8.632,1.304],[10.016,2.804],[12.9,2.204],[15.184,2.7493]],lufs:[-13,-13.4,-14.1,-17,-13,-14,-12.7]},surf_wash:{file:`surf_wash.ogg`,slices:[[.08,1.404],[1.564,2.054],[3.698,1.504],[5.282,1.354],[6.716,1.904],[8.7,1.154]],lufs:[-12.4,-11.3,-16.5,-13.7,-14.5,-22.3]},surf_backwash:{file:`surf_backwash.ogg`,slices:[[.08,1.804],[1.964,1.904],[3.948,3.804],[7.832,2.254],[10.166,2.394],[12.64,2.404]],lufs:[-13.1,-17.7,-22.1,-16.6,-14.4,-15.9]},step_wood:{file:`step_wood.ogg`,slices:[[.08,.4267],[.5867,.424],[1.0907,.424],[1.5947,.417],[2.0917,.4326]],lufs:[-22.5,-20.9,-20.8,-20.2,-20.8]},step_water:{file:`step_water.ogg`,slices:[[.08,.854],[1.014,.704],[1.798,.624],[2.502,.624],[3.206,.854]],lufs:[-17.5,-16,-19.5,-23,-14.9]},step_grass:{file:`step_grass.ogg`,slices:[[.08,.304],[.464,.3553],[.8993,.284],[1.2633,.254],[1.5973,.2473]],lufs:[-20.7,-18,-19.3,-19.5,-18.6]},step_rock:{file:`step_rock.ogg`,slices:[[.08,.504],[.664,.504],[1.248,.504],[1.832,.504],[2.416,.504]],lufs:[-27.1,-24.8,-24.7,-24.8,-25.6]},swim:{file:`swim.ogg`,slices:[[.08,.754],[.914,.5547],[1.5487,.604],[2.2327,.804]],lufs:[-18.5,-21.2,-15.6,-23.2]},uw_swim:{file:`uw_swim.ogg`,slices:[[.08,.626],[.786,.836],[1.702,.786],[2.568,1.1053]],lufs:[-16,-23.9,-25.6,-18.6]},submerge:{file:`submerge.ogg`,slices:[[.08,.804],[.964,.754]],lufs:[-24.7,-26.6]},emerge:{file:`emerge.ogg`,slices:[[.08,.904]],lufs:[-18.8]},splash:{file:`splash.ogg`,slices:[[.08,1.604],[1.764,2.2067],[4.0507,2.2133],[6.344,1.906]],lufs:[-19,-18,-14.1,-15.5]},hull_slap:{file:`hull_slap.ogg`,slices:[[.08,.554],[.714,.754],[1.548,.404],[2.032,.5087],[2.6207,.406]],lufs:[-20.7,-18.4,-20.2,-17.7,-16.4]},gull:{file:`gull.ogg`,slices:[[.08,1.001],[1.161,1.404],[2.645,.904],[3.629,1.114],[4.823,1.044],[5.947,.5267]],lufs:[-15.9,-16.2,-18.1,-11.8,-12.8,-12.8]},bird_forest:{file:`bird_forest.ogg`,slices:[[.08,1.47],[1.63,1.45],[3.16,1.23],[4.47,1.59],[6.14,1.55],[7.77,1.38],[9.23,1.16],[10.47,1.3],[11.85,1.12],[13.05,1.45],[14.58,1.99],[16.65,1.2],[17.93,1.06]],lufs:[-12.8,-12,-10.9,-11.8,-12,-11.3,-11.9,-13.4,-13.7,-11.9,-7.7,-12.1,-11]},bird_dove:{file:`bird_dove.ogg`,slices:[[.08,3.12],[3.28,3.18],[6.54,3.13],[9.75,3.36],[13.19,3.31]],lufs:[-7.7,-7.3,-7.2,-7.4,-7.6]},tern:{file:`tern.ogg`,slices:[[.08,2.1097],[2.2697,1.85],[4.1997,2.4098],[6.6894,1.3657],[8.1351,1.02],[9.2351,1.99]],lufs:[-9.8,-10.7,-12.4,-12,-9,-12.9]},whale_blow:{file:`whale_blow.ogg`,slices:[[.08,2.0057],[2.1657,1.3331],[3.5789,1.5137]],lufs:[-13.3,-14.2,-14.4]},big_splash:{file:`big_splash.ogg`,slices:[[.08,2.1477],[2.3077,1.7777]],lufs:[-15.6,-18.7]},reel_wind:{file:`reel_wind.ogg`,loop:!0,lufs:-23},reel_drag:{file:`reel_drag.ogg`,loop:!0,lufs:-22.6},line_strain:{file:`line_strain.ogg`,loop:!0,lufs:-24.4},rod_swish:{file:`rod_swish.ogg`,slices:[[.08,.404],[.564,.4453],[1.0893,.604],[1.7733,.424],[2.2773,.604]],lufs:[-18.3,-22.1,-20.9,-18.4,-16]},bail_click:{file:`bail_click.ogg`,slices:[[.08,.164],[.324,.174],[.578,.144],[.802,.184]],lufs:[-30,-29.8,-31.1,-29.3]},line_out:{file:`line_out.ogg`,slices:[[.08,.644]],lufs:[-15.9]},plop:{file:`plop.ogg`,slices:[[.08,.624],[.784,.264]],lufs:[-21.4,-20.7]},line_snap:{file:`line_snap.ogg`,slices:[[.08,.554],[.714,.504],[1.298,.504],[1.882,.504]],lufs:[-17.9,-23.4,-20.8,-23.2]},fish_splash:{file:`fish_splash.ogg`,slices:[[.08,.464],[.624,.324],[1.028,.504],[1.612,1.204],[2.896,1.304]],lufs:[-16,-14.2,-16.6,-17,-15.8]},fish_flop:{file:`fish_flop.ogg`,slices:[[.08,1.354],[1.514,.304],[1.898,.304],[2.282,.324]],lufs:[-24.6,-23.9,-23,-17]},coins:{file:`coins.ogg`,slices:[[.08,1.604]],lufs:[-16.5]}},um=(e,t,n)=>e<t?t:e>n?n:e,dm=(e,t,n)=>e+(t-e)*n,Y=(e,t)=>typeof e==`number`&&Number.isFinite(e)?e:t,fm=(e,t,n)=>{let r=um((n-e)/(t-e),0,1);return r*r*(3-2*r)},X=e=>10**(e/20),pm=X(-3),Z={crash:-15,wash:-20,backwash:-23,surfFar:-31,wind:-36,palms:-39,crickets:-33,pierLap:-32,reef:-43,engineIdle:-30,engineRun:-22,boatRush:-27,boatLap:-34,hullSlap:-24,spray:-30,step:-56,swim:-43,uwSwim:-43,splashSoft:-38,splash:-30,submerge:-36,emerge:-38,gull:-21,tern:-25,bird:-31,dove:-34,birdChorus:-35,whaleSong:-26,whaleBlow:-20,whaleBurst:-17,whaleSplash:-11,whaleDrip:-30,whaleFluke:-22,rodSwish:-30,bail:-40,lineOut:-38,plop:-30,reelWind:-36,reelDrag:-29,lineStrain:-44,lineSnap:-24,fishSplash:-24,fishFlop:-32,coins:-30},mm=[`reel_wind`,`reel_drag`,`line_strain`,`rod_swish`,`bail_click`,`line_out`,`plop`,`line_snap`,`fish_splash`,`fish_flop`],hm=[[0,1,2,3,4,5,6],[7,8,9,10,11,12]],gm=[`whale_blow`,`big_splash`,`emerge`],_m=100,vm={sand:[`step_sand`,0],wetsand:[`step_wetsand`,0],wood:[`step_wood`,2],water:[`step_water`,0],grass:[`step_grass`,2],rock:[`step_rock`,1]},ym={step:3,swim:2,splash:3,trans:2,hull:3,gull:2,crash:7,wash:5,back:5,bird:4,tern:2,whale:4,rod:4,fish:3,coin:1},bm=[`surf_crash`,`surf_wash`,`surf_backwash`,`surf_far`,`wind`,`palms`,`step_sand`,`step_wetsand`,`step_wood`,`step_water`,`step_grass`,`splash`,`swim`],xm=9,Sm=11,Cm=110,wm=.4,Tm={},Em=class{constructor({baseUrl:e=`./audio/`,shore:t=null}={}){this.baseUrl=e,this.ctx=null,this._failed=!1,this._muted=!1,this._volume=.8,this._buffers=new Map,this._loading=new Map,this._beds=new Map,this._voices={},this._last={},this._acc=0,this._gullT=6,this._ternT=4,this._birdT=2,this._singers=[],this._wh={blow:!1,breaches:-1,splashes:-1,fluke:0,sing:1},this._slapT=0,this._engine=0,this._engineOn=!1,this._gust={v:.4,target:.6,t:0},this._shore=t,this._stations=null,this._stAt={x:1e9,z:1e9,t:-1e9},this._fakeT=3,this._warned=new Set,this.env={lx:0,ly:1.7,lz:0,fx:0,fy:0,fz:-1,ux:0,uy:1,uz:0,u:0,depth:0,surf:.5,shoreDist:60,onLand:!0,wind:7,day:1,nearPier:!1,hour:null,shoreX:0,shoreZ:1,boat:{active:!1,rpm:0,speed:0,x:0,y:0,z:0,inside:!1}};let n=z.swellDir||{x:-.12,y:-1},r=Math.hypot(n.x,n.y)||1;this._swell={x:n.x/r,z:n.y/r}}attachShore({shore:e,field:t,terrain:n}){this._shore=e&&t&&n?{shore:e,field:t,terrain:n}:null,this._stations=null}async resume(){if(this._failed)return!1;if(!this.ctx){let e=globalThis.AudioContext||globalThis.webkitAudioContext;if(typeof e!=`function`)return this._failed=!0,!1;try{this.ctx=new e({latencyHint:`balanced`}),this._build()}catch(e){return this._warn(e),this._failed=!0,!1}for(let e of bm)this._want(e)}try{this.ctx.state===`suspended`&&await Promise.race([this.ctx.resume(),new Promise(e=>setTimeout(e,1500))])}catch(e){this._warn(e)}return this.enabled}get enabled(){return!!this.ctx&&!this._failed&&this.ctx.state===`running`}get muted(){return this._muted}get volume(){return this._volume}setMuted(e){this._muted=!!e,this._applyVolume()}setMasterVolume(e){this._volume=um(Y(e,this._volume),0,1),this._applyVolume()}update(e,t){if(this.ctx&&!this._failed)try{if(this._readState(t&&typeof t==`object`?t:Tm),this.ctx.state!==`running`||(this._acc+=um(Y(e,1/60),0,.25),this._acc<1/30))return;let n=Math.min(this._acc,.25);this._acc=0;let r=this.ctx.currentTime;this._placeListener(),this._mix(r,n),this._surf(n),this._life(n),this._birds(r,n),this._whale(r,n),this._reel(r)}catch(e){this._warn(e)}}footstep(e){let[t,n]=vm[e]||vm.sand;this._shot(t,`step`,this.foot,Z.step+n+(Math.random()-.5)*3,.94+Math.random()*.12)}splash(e){let t=um(Y(e,.5),0,1);t<.6?this._shot(`swim`,`splash`,this.above,Z.splashSoft+t*6,.9+Math.random()*.1):this._shot(`splash`,`splash`,this.above,Z.splash-(1-t)*8,.95+Math.random()*.1)}swimStroke(){this.env.u>.5?this._shot(`uw_swim`,`swim`,this.under,Z.uwSwim+(Math.random()-.5)*3,.9+Math.random()*.2):this._shot(`swim`,`swim`,this.above,Z.swim+(Math.random()-.5)*3,.92+Math.random()*.16)}submerge(){this._shot(`submerge`,`trans`,this.near,Z.submerge,.95+Math.random()*.1)}emerge(){this._shot(`emerge`,`trans`,this.near,Z.emerge,.95+Math.random()*.1)}engineStart(){this._engineOn=!0;for(let e of[`boat_engine`,`boat_rush`,`boat_lap`,`hull_slap`])this._want(e)}engineStop(){this._engineOn=!1}hullSlap(e){let t=um(Y(e,.5),0,1);this._shot(`hull_slap`,`hull`,this.boatSum,Z.hullSlap-(1-t)*10,.85+Math.random()*.2),t>.45&&this._shot(`splash`,`hull`,this.boatSum,Z.spray-(1-t)*6,1.15+Math.random()*.2)}rodReady(){for(let e of mm)this._want(e)}whoosh(e=1){let t=um(Y(e,1),0,1);this._shot(`rod_swish`,`rod`,this.rod,Z.rodSwish-(1-t)*9,.9+t*.2+Math.random()*.06)}bail(e){this._shot(`bail_click`,`rod`,this.rod,Z.bail+(e?0:2),e?1.08+Math.random()*.06:.92+Math.random()*.06)}lineOut(e=1){let t=um(Y(e,1),0,1);this._shot(`line_out`,`rod`,this.rod,Z.lineOut-(1-t)*6,1.25-t*.35)}plop(e){e&&this._shotAt(`plop`,`fish`,e.x,e.y,e.z,Z.plop,.95+Math.random()*.15,0,4,1)}fishSplash(e,t=.5){if(!e)return;let n=um(Y(t,.5),0,1);this._shotAt(`fish_splash`,`fish`,e.x,e.y,e.z,Z.fishSplash-(1-n)*10,.9+Math.random()*.2+(1-n)*.15,0,6,1)}fishFlop(){this._shot(`fish_flop`,`rod`,this.near,Z.fishFlop,.9+Math.random()*.2)}lineSnap(){this._shot(`line_snap`,`rod`,this.rod,Z.lineSnap,.95+Math.random()*.1)}coin(){this._shot(`coins`,`coin`,this.near,Z.coins,.97+Math.random()*.06)}rodLoop(e,t,n){let r=this._rod||={crank:0,drag:0,tension:0};r.crank=um(Y(e,0),0,3),r.drag=um(Y(t,0),0,5),r.tension=um(Y(n,0),0,2)}_reel(e){let t=this._rod;if(!t)return;let n=fm(.05,.35,t.crank);(n>0||this._beds.has(`reel_wind`))&&this._bed(`reel_wind`,X(Z.reelWind)*n*(.8+.2*Math.min(1,t.crank))/X(lm.reel_wind.lufs),e,.08,um(t.crank/1.4,.45,1.3));let r=fm(.05,.7,t.drag);(r>0||this._beds.has(`reel_drag`))&&this._bed(`reel_drag`,X(Z.reelDrag)*r/X(lm.reel_drag.lufs),e,.06,um(.7+t.drag*.25,.7,1.25));let i=fm(.7,1,t.tension);(i>0||this._beds.has(`line_strain`))&&this._bed(`line_strain`,X(Z.lineStrain)*i/X(lm.line_strain.lufs),e,.1,.9+.2*i)}bubbles(){}waveBreak(){}dispose(){if(this.ctx){try{let e=this.ctx.close();e&&e.catch&&e.catch(()=>{})}catch{}this.ctx=null,this._failed=!0}}_build(){let e=this.ctx,t=(t,n)=>{let r=e.createGain();return r.gain.value=t,n&&r.connect(n),r},n=(t,n,r)=>{let i=e.createBiquadFilter();return i.type=`lowpass`,i.frequency.value=t,i.Q.value=n,r&&i.connect(r),i},r=(t,n,r)=>{let i=e.createPanner();return i.panningModel=`HRTF`,i.distanceModel=`inverse`,i.refDistance=n,i.rolloffFactor=r,i.maxDistance=1e4,i.connect(t),i};this._panner=r,this.limiter=e.createDynamicsCompressor(),this.limiter.threshold.value=-4,this.limiter.knee.value=4,this.limiter.ratio.value=16,this.limiter.attack.value=.003,this.limiter.release.value=.25,this.limiter.connect(e.destination),this.master=t(0,this.limiter),this._applyVolume(),this.aboveOut=t(1,this.master);let i=n(2e4,.54,this.aboveOut),a=n(2e4,.707,i);this.muffle=[a,i],this.above=t(1,a),this.under=t(0,this.master),this.near=t(1,this.master),this.foot=t(1,this.above),this.surfPan=r(this.above,1,0),this.surfFar=t(1,this.surfPan),this.boatPan=r(this.above,3,1),this.boatOut=t(1,this.boatPan),this.boatIn=t(0,this.above),this.boatSum=t(1,this.boatOut),this.boatSum.connect(this.boatIn),this.engineLP=n(1200,.6,this.boatSum),this.pierPan=r(this.above,3,1.3),this.windLP=n(1400,.5,this.above),this.rodPan=e.createStereoPanner?e.createStereoPanner():null,this.rodPan&&(this.rodPan.pan.value=.25,this.rodPan.connect(this.above)),this.rod=t(1,this.rodPan||this.above),this.songOut=t(X(-20),this.master),this.songLP=n(420,.6,this.songOut),this.songPan=r(this.songLP,30,.5),this._dest={surf_far:this.surfFar,wind:this.windLP,palms:this.above,crickets:this.above,pier_lap:this.pierPan,under_reef:this.under,birds_dawn:this.above,whale_song:this.songPan,boat_engine:this.engineLP,boat_rush:this.boatSum,boat_lap:this.boatSum,reel_wind:this.rod,reel_drag:this.rod,line_strain:this.rod}}_applyVolume(){if(!this.master)return;let e=this._muted?0:this._volume*this._volume;this._ramp(this.master.gain,e,.05)}_want(e){let t=this._buffers.get(e);if(t)return t;if(!this._loading.has(e)&&lm[e]&&this.ctx){let t=fetch(this.baseUrl+lm[e].file).then(t=>{if(!t.ok)throw Error(`audio ${e}: HTTP ${t.status}`);return t.arrayBuffer()}).then(e=>this.ctx.decodeAudioData(e)).then(t=>(this._buffers.set(e,t),t)).catch(e=>this._warn(e));this._loading.set(e,t)}return null}_bed(e,t,n,r=.25,i=1){let a=this._beds.get(e);if(!a){if(t<1e-4)return;let o=this._want(e);if(!o)return;let s=this.ctx,c=s.createBufferSource();c.buffer=o,c.loop=!0,c.playbackRate.value=i;let l=s.createGain();l.gain.value=0,c.connect(l).connect(this._dest[e]),c.start(n+.02,Math.random()*o.duration),a={src:c,gain:l,trim:o.numberOfChannels===1?pm:1},this._beds.set(e,a),this._dest[e]!==this.rod&&(r=Math.max(r,.8))}this._ramp(a.gain.gain,t*a.trim,r),this._ramp(a.src.playbackRate,i,.15)}_shot(e,t,n,r,i=1,a=0,o=-1){if(!this.enabled||!n)return null;let s=lm[e],c=this._want(e);if(!c||!s)return null;let l=s.slices.length,u=o>=0&&o<l?o:Math.floor(Math.random()*l);o<0&&l>1&&u===this._last[e]&&(u=(u+1+Math.floor(Math.random()*(l-1)))%l),this._last[e]=u;let[d,f]=s.slices[u],p=this.ctx,m=Math.max(p.currentTime+.005,a),h=p.createBufferSource();h.buffer=c,h.playbackRate.value=i;let g=p.createGain();g.gain.value=X(um(r-s.lufs[u],-80,24))*(c.numberOfChannels===1?pm:1),h.connect(g).connect(n),h.start(m,d,f);let _=this._voices[t]||(this._voices[t]=[]),v={src:h,gain:g,end:m+f/i,extra:null};for(_.push(v),h.onended=()=>{let e=_.indexOf(v);if(e>=0&&_.splice(e,1),g.disconnect(),v.extra)for(let e of v.extra)e.disconnect()};_.length>(ym[t]||3);){let e=_.shift();e.gain.gain.setTargetAtTime(0,p.currentTime,.05);try{e.src.stop(p.currentTime+.3)}catch{}}return v}_shotAt(e,t,n,r,i,a,o,s,c,l=1,u=-1){if(!this.enabled||!this._want(e))return null;let d=this.ctx,f=this.env,p=Math.hypot(n-f.lx,r-f.ly,i-f.lz),m=this._panner(this.above,c,l);m.positionX.value=n,m.positionY.value=r,m.positionZ.value=i;let h=d.createBiquadFilter();h.type=`lowpass`,h.frequency.value=um(18e3/(1+p/45),1500,18e3),h.connect(m);let g=this._shot(e,t,h,a,o,s,u);return g?(g.extra=[h,m],g):(h.disconnect(),m.disconnect(),null)}_gull(){let e=this.env,t=Math.atan2(e.shoreZ,e.shoreX)+(Math.random()-.5)*2.4,n=25+Math.random()*55;this._shotAt(`gull`,`gull`,e.lx+Math.cos(t)*n,e.ly+6+Math.random()*19,e.lz+Math.sin(t)*n,Z.gull+(Math.random()-.5)*4,.93+Math.random()*.14,0,10)}_shoreSrc(){if(this._shore)return this._shore;let e=globalThis.__app;return e&&e.shore&&e.shoreField&&e.shoreField.data&&e.terrainData&&(this._shore={shore:e.shore,field:e.shoreField,terrain:e.terrainData}),this._shore}_field(e,t,n){let{field:r,terrain:i}=this._shore,a=r.res,o=r.data,s=um((e-i.origin)/i.size*a-.5,0,a-1.001),c=um((t-i.origin)/i.size*a-.5,0,a-1.001),l=Math.floor(s),u=Math.floor(c),d=s-l,f=c-u,p=(u*a+l)*4,m=p+a*4;for(let e=0;e<4;e++){let t=o[p+e],r=o[p+4+e],i=o[m+e],a=o[m+4+e];n[e]=(t*(1-d)+r*d)*(1-f)+(i*(1-d)+a*d)*f}return n}_wobble(e){return Math.sin(e*.029+.7)*.07+Math.sin(e*.083+2.1)*.035}_waveAmp(e,t){let n=this._shore.shore,r=n.amplitude.value,i=n.variation.value,a=Math.abs(Math.sin(e*Math.PI/7))*.6+.55,o=Math.sin(e*127.1+311.7)*43758.5453,s=(o-Math.floor(o)-.5)*2,c=Math.sin(t*.016+e*.9)*1.6,l=Math.sin(t*.062+e*1.7+c),u=Math.sin(t*.13+e*4.1+1.3-c*.7),d=l*.6+u*.4;return Math.max(.02,r*a*(1+s*i*.5+d*i*.7))}_buildStations(){let e=this.env,{terrain:t}=this._shore,n=[0,0,0,0],r=(e,n)=>t.heightAt(e,n)-0;this._field(e.lx,e.lz,n);let i=Math.hypot(n[1],n[2]),a=i>.001?n[1]/i:this._swell.x,o=i>.001?n[2]/i:this._swell.z,s=r(e.lx,e.lz),c=s>0?-1:1,l=null;for(let t=1;t<400;t+=1.5){let n=e.lx+a*c*t,i=e.lz+o*c*t;if(r(n,i)>0!=s>0){l={x:n,z:i};break}}let u=[];if(l)for(let e=0;e<xm;e++){let t=(e-4)*Sm,s=l.x-o*t,c=l.z+a*t;if(this._field(s,c,n),i=Math.hypot(n[1],n[2]),i<.03)continue;let d=n[1]/i,f=n[2]/i,p=r(s,c)>0?-1:1,m=!1;for(let e=0;e<60;e+=.5){let t=s+d*p*e,n=c+f*p*e;if(r(t,n)>0!=p<0){s=t,c=n,m=!0;break}}if(!m)continue;this._field(s,c,n);let h={x:s,z:c,dx:d,dz:f,Ts:n[3],exposure:um(i*1.4,0,1),along:-s*f+c*d,depth:new Float32Array(Cm),T:new Float32Array(Cm),last:{crash:-1e9,wash:-1e9,back:-1e9}};for(let e=0;e<Cm;e++){let t=s-d*e,i=c-f*e;h.depth[e]=-r(t,i),h.T[e]=this._field(t,i,n)[0]}h.T[0]<1e4&&h.Ts<1e4&&u.push(h)}this._stations=u}_surf(e){let t=this.env,n=this._shoreSrc();if(!n||!n.shore.enabled||n.shore.enabled.value<.5){this._fakeSurf(e,+!n);return}let r=n.shore,i=Math.hypot(t.lx-this._stAt.x,t.lz-this._stAt.z);(!this._stations||i>12)&&(this._stAt.x=t.lx,this._stAt.z=t.lz,this._buildStations());let a=Math.max(1,r.period.value),o=r.time.value,s=r.gamma.value,c=this.ctx.currentTime,l=.2,u=Math.max(.05,r.amplitude.value);for(let e of this._stations){let n=Math.hypot(e.x-t.lx,e.z-t.lz);if(n>160)continue;let r=this._wobble(e.along),i=Math.floor((o-e.Ts)/a+r);for(let d=i;d<=i+2;d++){let i=this._waveAmp(d,e.along),f=i/u,p=16*Math.log10(um(f*e.exposure,.05,3)),m=(i*3.556/s)**.8*.92,h=0;for(;h<109&&e.depth[h]<m;)h++;let g=e.T[h]+(d-r)*a;if(d>e.last.crash&&g>=o-.1&&g<o+l){e.last.crash=d;let n=e.x-e.dx*h,r=e.z-e.dz*h;Math.hypot(n-t.lx,r-t.lz)<150&&i>.06&&this._shotAt(`surf_crash`,`crash`,n,.4,r,Z.crash+p+(Math.random()-.5)*3,um(1.06-.25*f,.82,1.08)*(.96+Math.random()*.08),c+Math.max(0,g-o),10,.65)}let _=e.Ts+(d-r)*a,v=_+wm*a;d>e.last.wash&&_>=o-.1&&_<o+l&&(e.last.wash=d,n<70&&this._shotAt(`surf_wash`,`wash`,e.x-e.dx,.1,e.z-e.dz,Z.wash+p+(Math.random()-.5)*3,.95+Math.random()*.1,c+Math.max(0,_-o),5,.8)),d>e.last.back&&v>=o-.1&&v<o+l&&(e.last.back=d,n<60&&this._shotAt(`surf_backwash`,`back`,e.x-e.dx*2,0,e.z-e.dz*2,Z.backwash+p+(Math.random()-.5)*3,.95+Math.random()*.1,c+Math.max(0,v-o),5,.8))}}}_fakeSurf(e,t){if(!t)return;let n=this.env;if(this._fakeT-=e,this._fakeT>0)return;this._fakeT=2.5+Math.random()*4;let r=Math.max(6,n.shoreDist),i=(Math.random()-.5)*60,a=n.lx+n.shoreX*(r+12)-n.shoreZ*i,o=n.lz+n.shoreZ*(r+12)+n.shoreX*i,s=this.ctx.currentTime;this._shotAt(`surf_crash`,`crash`,a,.4,o,Z.crash+(Math.random()-.5)*6,.92+Math.random()*.12,s,10);let c=n.lx+n.shoreX*r-n.shoreZ*i,l=n.lz+n.shoreZ*r+n.shoreX*i;r<70&&(this._shotAt(`surf_wash`,`wash`,c,.1,l,Z.wash+(Math.random()-.5)*4,1,s+3.5,5),this._shotAt(`surf_backwash`,`back`,c,0,l,Z.backwash+(Math.random()-.5)*4,1,s+7,5))}_readState(e){let t=this.env,n=e.listener||Tm,r=n.position||Tm,i=n.forward||Tm,a=n.up||Tm;t.lx=Y(r.x,t.lx),t.ly=Y(r.y,t.ly),t.lz=Y(r.z,t.lz);let o=Y(i.x,0),s=Y(i.y,0),c=Y(i.z,-1),l=Math.hypot(o,s,c)||1;o/=l,s/=l,c/=l;let u=Y(a.x,0),d=Y(a.y,1),f=Y(a.z,0),p=Math.hypot(u,d,f)||1;u/=p,d/=p,f/=p,t.fx=o,t.fy=s,t.fz=c,t.ux=u,t.uy=d,t.uz=f,t.u=um(Y(e.underwater,0),0,1),t.depth=Math.max(0,Y(e.depthBelowSurface,0)),t.surf=um(Y(e.surfIntensity,.5),0,1),t.shoreDist=Math.max(0,Y(e.distanceToShore,60)),t.wind=um(Y(e.windSpeed,7),0,40),t.day=um(Y(e.daylight,1),0,1),t.nearPier=!!e.nearPier,t.hour=typeof e.timeOfDay==`number`&&Number.isFinite(e.timeOfDay)?(e.timeOfDay%24+24)%24:null;let m=e.boat||Tm,h=m.position||Tm,g=t.boat;g.active=!!m.active,g.rpm=um(Y(m.rpm,0),0,1),g.speed=Math.abs(Y(m.speed,0)),g.x=Y(h.x,g.x),g.y=Y(h.y,g.y),g.z=Y(h.z,g.z),g.inside=!!m.listenerInside,t.onLand=typeof e.coastDistance==`number`&&Number.isFinite(e.coastDistance)?e.coastDistance<0:!0,(t.u>.01||g.active)&&(t.onLand=!1);let _=this._swell,v=t.lx*_.x+(t.lz+42)*_.z>0;t.shoreX=v?-_.x:_.x,t.shoreZ=v?-_.z:_.z}_placeListener(){let e=this.ctx.listener,t=this.env;e.positionX?(this._ramp(e.positionX,t.lx,.03),this._ramp(e.positionY,t.ly,.03),this._ramp(e.positionZ,t.lz,.03),this._ramp(e.forwardX,t.fx,.02),this._ramp(e.forwardY,t.fy,.02),this._ramp(e.forwardZ,t.fz,.02),this._ramp(e.upX,t.ux,.02),this._ramp(e.upY,t.uy,.02),this._ramp(e.upZ,t.uz,.02)):(e.setPosition(t.lx,t.ly,t.lz),e.setOrientation(t.fx,t.fy,t.fz,t.ux,t.uy,t.uz)),this._pos(this.surfPan,t.lx+t.shoreX*40,t.ly-1.5,t.lz+t.shoreZ*40),this._pos(this.boatPan,t.boat.x,t.boat.y+.3,t.boat.z),this._ramp(this.boatIn.gain,+!!t.boat.inside,.1),this._ramp(this.boatOut.gain,+!t.boat.inside,.1);let n=z.pier;this._pos(this.pierPan,n.x,0,um(t.lz,Math.max(n.zStart,-40),n.zEnd))}_mix(e,t){let n=this.env,r=n.u,i=n.shoreDist,a=n.boat,o=um(n.depth/12,0,1),s=Math.exp(dm(Math.log(2e4),Math.log(dm(520,260,o)),r));this._ramp(this.muffle[0].frequency,s,.04),this._ramp(this.muffle[1].frequency,Math.min(2e4,s*1.4),.04),this._ramp(this.aboveOut.gain,dm(1,.4/(1+n.depth/5),r),.05),this._ramp(this.under.gain,r,.06);let c=r>0||!n.onLand&&n.ly<2.5;this._bed(`under_reef`,c?X(Z.reef)*(.8+.3*o)/X(lm.under_reef.lufs):0,e,.5),c&&(this._want(`uw_swim`),this._want(`submerge`),this._want(`emerge`));let l=.6+.7*n.surf;this._bed(`surf_far`,X(Z.surfFar)*1.25/(1+i/200)*l/X(lm.surf_far.lufs),e,.5);let u=this._gust;u.t-=t,u.t<=0&&(u.target=Math.random()<.35?.03+Math.random()*.12:.3+Math.random()*.7,u.t=2+Math.random()*6),u.v+=(u.target-u.v)*(1-Math.exp(-t/1.4));let d=Math.hypot(n.wind,a.active?a.speed*.9:0),f=a.active&&a.speed>3?Math.max(u.v,.5):u.v;this._bed(`wind`,X(Z.wind)*um(d/7,0,2.5)*f/X(lm.wind.lufs),e,.3),this._ramp(this.windLP.frequency,400+(80+60*f)*d,.4);let p=n.onLand?fm(6,30,i):0;this._bed(`palms`,X(Z.palms)*p*um(n.wind/7,.2,1.8)*u.v*(.3+.7*n.day)/X(lm.palms.lufs),e,.5);let m=fm(.3,.12,n.day);this._bed(`crickets`,X(Z.crickets)*m*(n.onLand?.35+.65*fm(5,40,i):.1)/X(lm.crickets.lufs),e,1),this._bed(`pier_lap`,(n.nearPier?X(Z.pierLap):0)/X(lm.pier_lap.lufs),e,.6),this._engine+=(+!!this._engineOn-this._engine)*(1-Math.exp(-t*(this._engineOn?3:1.2)));let h=Math.hypot(a.x-n.lx,a.z-n.lz),g=a.active||h<60,_=this._engine,v=a.rpm;this._bed(`boat_engine`,X(dm(Z.engineIdle,Z.engineRun,v**.8))*_/X(lm.boat_engine.lufs),e,.12,(.8+.85*v)*dm(.75,1,_)),this._ramp(this.engineLP.frequency,900+6500*v**1.3,.12);let y=a.speed;if(this._bed(`boat_rush`,g?X(Z.boatRush)*fm(.4,9,y)/X(lm.boat_rush.lufs):0,e,.3,.85+.02*Math.min(y,12)),this._bed(`boat_lap`,g?X(Z.boatLap)*(1-fm(1.5,5,y))/X(lm.boat_lap.lufs):0,e,.5),g&&y>1.2&&n.u<.5&&(this._slapT-=t,this._slapT<=0)){let e=fm(1.2,9,y);this._slapT=.3+Math.random()*(2.2-1.6*e),this._shot(`hull_slap`,`hull`,this.boatSum,Z.hullSlap-14+8*e+(Math.random()-.5)*4,.85+Math.random()*.3)}}_life(e){let t=this.env;if(t.day<.35||t.u>.5)return;let n=this._flock();if(this._gullT-=e,this._gullT<=0){if(n){let e=this._pickBird(n,`gull`,170);if(this._gullT=e?5+Math.random()*15:3,e){let t=e.f.P.pos;this._shotAt(`gull`,`gull`,t[0],t[1],t[2],Z.gull+(Math.random()-.5)*4,.93+Math.random()*.14,0,10)}}else t.shoreDist<300&&(this._gullT=7+Math.random()*18+t.shoreDist*.05,this._want(`gull`)&&this._gull())}if(this._ternT-=e,this._ternT<=0){let e=n?this._pickBird(n,`tern`,190):null;if(this._ternT=e?7+Math.random()*18:4,e){let t=e.f.P.pos;this._shotAt(`tern`,`tern`,t[0],t[1],t[2],Z.tern+(Math.random()-.5)*4,.95+Math.random()*.1,0,10)}}}_flock(){let e=globalThis.__app,t=e&&e.wildlife,n=t&&t.birds;return n&&Array.isArray(n.agents)&&n.agents.length?n.agents:null}_pickBird(e,t,n){let r=this.env,i=this._cand||=[];i.length=0;let a=0;for(let o of e){if(o.kind!==t||o.visible===!1||!o.f||!o.f.P||!o.f.P.pos)continue;let e=o.f.P.pos,s=Math.hypot(e[0]-r.lx,e[1]-r.ly,e[2]-r.lz);if(!(s<n))continue;let c=1/(15+s);i.push(o,c),a+=c}if(a<=0)return null;let o=Math.random()*a;for(let e=0;e<i.length;e+=2)if(o-=i[e+1],o<=0)return i[e];return i[i.length-2]}_hour(){if(this.env.hour!==null)return this.env.hour;let e=globalThis.__app,t=e&&e.settings&&e.settings.timeOfDay;return typeof t==`number`&&Number.isFinite(t)?(t%24+24)%24:null}_birdActivity(){let e=this._hour();if(e===null)return{act:fm(.35,.6,this.env.day),chorus:0,lull:0};let t=fm(4.9,5.7,e)*(1-fm(18.2,19.3,e)),n=fm(5,5.8,e)*(1-fm(6.6,7.9,e)),r=fm(10.5,12,e)*(1-fm(14.5,16,e)),i=fm(17.2,18.6,e);return{act:t*Math.max(0,1+2.5*n-.6*r-.55*i),chorus:t*n,lull:r}}_perch(){let e=this.env,t=globalThis.__app,n=this._shore&&this._shore.terrain||t&&t.terrainData;for(let t=0;t<8;t++){let t=Math.random()*Math.PI*2,r=10+Math.random()*70,i=e.lx+Math.cos(t)*r,a=e.lz+Math.sin(t)*r,o,s;if(n&&n.coastDistance&&n.heightAt){let e=n.coastDistance(i,a);o=-Y(e&&e.d,1),s=Y(n.heightAt(i,a),0)}else o=e.onLand?e.shoreDist+(Math.random()-.5)*r:-1,s=e.ly-1.7;if(!(o<8||Math.random()>.25+.75*fm(8,45,o)))return{x:i,y:s+3+Math.random()*9,z:a}}return null}_birds(e,t){let n=this.env,{act:r,chorus:i,lull:a}=this._birdActivity(),o=n.onLand?fm(0,45,n.shoreDist):0,s=n.onLand?.25+.75*o:.25*(1-fm(20,90,n.shoreDist)),c=i*(n.onLand?.3+.7*o:.3*(1-fm(20,150,n.shoreDist)))*(1-n.u);this._bed(`birds_dawn`,X(Z.birdChorus)*c/X(lm.birds_dawn.lufs),e,2),this._birdT-=t;let l=r*s;if(this._birdT<=0&&(this._birdT=l>.02?(4+Math.random()*20)/l:3,l>.02&&n.u<.5&&this._singers.length<3)){let e=this._perch();if(e){let t=Math.random()<.15+.25*a,n=t?`bird_dove`:`bird_forest`,r=t?null:hm[Math.floor(Math.random()*hm.length)];this._want(n),e.bank=n,e.group=r,e.n=1+Math.floor(Math.random()*(t?2:4)),e.t=Math.random()*.5,e.rate=.93+Math.random()*.14,e.lvl=(t?Z.dove:Z.bird)+(Math.random()-.5)*6,this._singers.push(e)}}for(let e=this._singers.length-1;e>=0;e--){let i=this._singers[e];if(i.t-=t,i.t>0)continue;if(i.n<=0||n.u>.5||r<.01){this._singers.splice(e,1);continue}let a=lm[i.bank];if(!this._want(i.bank)){i.t=1;continue}let o=-1;i.group&&(o=i.group[Math.floor(Math.random()*i.group.length)],o===this._last[i.bank]&&(o=i.group[(i.group.indexOf(o)+1)%i.group.length]));let s=this._shotAt(i.bank,`bird`,i.x,i.y,i.z,i.lvl+(Math.random()-.5)*2,i.rate*(.98+Math.random()*.04),0,10,1,o)?a.slices[this._last[i.bank]][1]/i.rate:0;i.n--,i.t=s+.8+Math.random()*4.5}}_whale(e,t){let n=this.env,r=this._wh,i=globalThis.__app,a=i&&i.whale,o=a&&a.ready&&a.brain;if(!o||!o.position){this._beds.has(`whale_song`)&&this._bed(`whale_song`,0,e,1);return}let s=o.position,c=n.u,l=Math.hypot(s.x-n.lx,s.y-n.ly,s.z-n.lz);r.sing+=((o.state===`cruise`?1:.1)-r.sing)*(1-Math.exp(-t/4));let u=l<_m;(u||this._beds.has(`whale_song`))&&(this._pos(this.songPan,s.x,s.y,s.z),this._ramp(this.songLP.frequency,Math.exp(dm(Math.log(420),Math.log(16e3),c)),.08),this._ramp(this.songOut.gain,dm(X(-20),1,c),.08),this._bed(`whale_song`,u?X(Z.whaleSong)*r.sing*(1-fm(70,_m,l))/X(lm.whale_song.lufs):0,e,1.5));let d=Y(o.water,0),f=Math.sin(Y(o.yaw,0)),p=Math.cos(Y(o.yaw,0)),m=o.blow>0,h=Y(o.flukeUp,0),g=l<_m;if(l<_m*1.5)for(let e of gm)this._want(e);if(g&&r.breaches>=0){m&&!r.blow&&this._shotAt(`whale_blow`,`whale`,s.x+f*4,d+1,s.z+p*4,Z.whaleBlow+(Math.random()-.5)*3,.72+Math.random()*.12,0,10),o.breaches>r.breaches&&this._shotAt(`big_splash`,`whale`,s.x,d+1,s.z,Z.whaleBurst,.6+Math.random()*.1,0,10),o.splashes>r.splashes&&(this._shotAt(`big_splash`,`whale`,s.x,d+.5,s.z,Z.whaleSplash,.5+Math.random()*.08,0,12),this._shotAt(`surf_crash`,`whale`,s.x+f*3,d+.5,s.z+p*3,Z.whaleSplash-4,.72+Math.random()*.08,e+.06,12));let t=s.x-f*9,n=s.z-p*9;h>.05&&r.fluke<=.05&&this._shotAt(`emerge`,`whale`,t,d+2,n,Z.whaleDrip,.7+Math.random()*.1,0,8),h===0&&r.fluke>.8&&this._shotAt(`big_splash`,`whale`,t,d,n,Z.whaleFluke,.78+Math.random()*.1,0,10)}r.blow=m,r.fluke=h,r.breaches=Y(o.breaches,0),r.splashes=Y(o.splashes,0)}_ramp(e,t,n){if(!Number.isFinite(t))return;let r=e._t;r!==void 0&&Math.abs(t-r)<=Math.abs(r)*.004+1e-6||(e._t=t,e.setTargetAtTime(t,this.ctx.currentTime,n))}_pos(e,t,n,r){e.positionX?(this._ramp(e.positionX,t,.05),this._ramp(e.positionY,n,.05),this._ramp(e.positionZ,r,.05)):e.setPosition(t,n,r)}_warn(e){let t=e&&e.message||String(e);this._warned.has(t)||this._warned.size>20||(this._warned.add(t),console.warn(`[SoundScape]`,e))}},Dm=new n(0,1,0),Om=class{constructor(){if(this.settings={timeOfDay:16.2,sunAzimuth:0,timeSpeed:0,exposure:.55,renderScale:1},this.qs=new URLSearchParams(location.search),this.worldId=this.qs.get(`world`)||`tidewater`,![`tidewater`,`rocha`].includes(this.worldId))throw TypeError(`Unknown world: `+this.worldId);this.world={id:`tidewater`,name:`Tidewater`,sourceVersion:`original-island-five-story`,views:null},this.waterEnabled=!0,this.qualityLevels={...ge},h.atmosphereQuality.value=1,h.antiAliasingQuality.value=1,this.gpu=_e,h.waterEnabled.value=1}async init(t=()=>{}){if(this.worldId===`rocha`)return(await e(async()=>{let{initRocha:e}=await import(`./RochaApp-DbHivW1B.js`);return{initRocha:e}},__vite__mapDeps([5,2,3,6,7,8,9,10,11,12,4,1,13,14,15,16,17,18,19,20,21]),import.meta.url)).initRocha(this,t);let r=this.qs,i=async(e,n,r)=>{t(e,n,r),typeof requestAnimationFrame==`function`&&await new Promise(e=>requestAnimationFrame(()=>setTimeout(e,0)))};await i(.02,`Starting WebGPU…`);let a=this.engine=new A(document.getElementById(`app`));await a.init();let o=a,{scene:s,camera:l}=a;l.near=.1,l.updateProjectionMatrix(),this.renderer=o,this.scene=s,this.camera=l,this.input=new re(a.domElement),this.fly=new Gt(l,a.domElement,this.input),this.fly.setPose(new n(20,6,-20),Math.PI*.9,-.12),await i(.04,`Building the atmosphere…`),this.atmosphere=new j(o),this.sky=new se(this.atmosphere),r.has(`noClouds`)||(this.clouds=r.has(`oldClouds`)?new Mt(o,this.atmosphere):new it(o,this.atmosphere),this.clouds.ready&&await this.clouds.ready,this.sky.clouds=this.clouds),this.csm=this.shadows=new k({size:2048,splits:[10,60,400],lightMargin:200,normalBias:[.015,.06,.3],bias:2e-5}),this.shadows.layerMask=1<<ce.OPAQUE|1<<ce.TRANSPARENT,this.environment=new ie(o,s,this.sky),await i(.06,`Shaping the island…`),this.terrainData=new tr,this.colliders=new sn,await i(.12,`Building the village…`),this.village=new Pn({scene:s,terrain:this.terrainData,colliders:this.colliders}),r.has(`noVeg`)||(await i(.14,`Planting the island…`),this.vegetation=new qt({scene:s,terrain:this.terrainData,village:this.village}),nt(this.vegetation.group)),await i(.19,`Rolling in the swell…`),this.shoreField=rr(this.terrainData,{res:512,swellDir:[z.swellDir.x,z.swellDir.y]}),this.terrainGPU=new Tt(this.terrainData,this.shoreField),this.terrain=new Et({scene:s,terrainData:this.terrainData,terrainGPU:this.terrainGPU,renderer:o}),this.rocks=new $a({scene:s,terrain:this.terrain,village:this.village,colliders:this.colliders}),this.debris=new ys({scene:s,terrain:this.terrain,village:this.village,vegetation:this.vegetation,rocks:this.rocks,colliders:this.colliders}),this.terrain.mesh.material.appliesHillShadow=!0,this.rocks.material.appliesHillShadow=!0,await i(.23,`Growing the reef…`),this.reef=new _a({scene:s,terrain:this.terrainData,shoreField:this.shoreField}),this.boat=new Ba,s.add(this.boat.group),this.boat.group.position.copy(z.boatDock.position),this.boat.group.rotation.y=z.boatDock.heading,await i(.3,`Simulating the ocean…`),this.fft=new Nt(o),this.reef.setOcean&&this.reef.setOcean(this.fft),this.foamTexture=Wl(o),this.oceanLOD=new Vt({gridSize:Number(r.get(`G`)||32),leafSize:8,levels:12,minY:-25,maxY:25}),this.surface=new Ul({fft:this.fft,cdlod:this.oceanLOD,foamTexture:this.foamTexture}),this.surface.terrain=this.terrainGPU,this.seaDetail=new ou,this.surface.detail=this.seaDetail,this.shore=new At(this.terrainGPU),this.surface.shore=this.shore,this.caustics=r.has(`noCaustics`)?null:new Kt(o,this.fft),this.caustics&&(this.caustics.detail=this.seaDetail),r.has(`noSim`)||(this.shoreSim=new Xl(o,{terrainGPU:this.terrainGPU,shore:this.shore}),this.surface.shoreSim=this.shoreSim,this.terrain.wetness={modules:[this.shoreSim.module],code:`
fn terrainWetness( xz: vec2f, h: f32 ) -> vec2f {
	if ( frame.waterEnabled < 0.5 ) { return vec2f( 0.0 ); }
	let s = shoreSimSample( xz );
	let inside = shoreSimInside( shoreSimUvOf( xz ) );
	// outside the simulated region fall back to a static damp band
	let band = smoothstep( 0.45, 0.0, h );
	// foam left on the sand: the lace the water carried, stranded and popping (ShoreSim.sandFoam)
	return vec2f( max( s.y, band * ( 1.0 - inside ) ), shoreSimSandFoam( xz, s, h ) );
}`},this.terrain.finalizeMaterial(),this.surfFoam=new Yl({shoreSim:this.shoreSim}),this.surface.foamShading=e=>this.surfFoam.shading(e));let u=(e,t)=>e&&e.traverse(e=>{if(e.material)for(let n of Array.isArray(e.material)?e.material:[e.material])n.underwaterLighting=t});u(this.village.group,`lite`),u(this.boat.group,`lite`),this.vegetation&&u(this.vegetation.group,`none`),this.underwaterLighting=$l({fft:this.fft,caustics:this.caustics,clouds:this.clouds,terrain:this.terrainGPU,shore:this.shore,surface:this.surface,shoreSim:this.shoreSim}),Ht({terrain:this.terrainGPU,clouds:this.clouds}),this.sceneRenderer=new M(a.meshRenderer,s,l),this.refraction=new jt({meshRenderer:a.meshRenderer,scene:s,camera:l,sceneRenderer:this.sceneRenderer,scale:.5}),this.sceneRenderer.onBeforeWater=()=>this.refraction.render(h.seaLevel.value),this.sky.background&&(this.sceneRenderer.background=this.sky.background),this.localLights=new Ge,We(this.localLights,this.village),qe(this.localLights,this.boat);for(let e of[this.terrain.mesh,this.rocks.group,this.debris&&this.debris.group,this.vegetation&&this.vegetation.group])e&&e.traverse(e=>{if(e.material)for(let t of Array.isArray(e.material)?e.material:[e.material])t.localLightsCheap=!0});this.sceneRenderer.addHullMask(this.boat.createHullVolumeGeometry(),this.boat.group),this.waterMaterial=new Rt({surface:this.surface,sky:this.sky,sceneCopy:this.sceneRenderer.opaqueCopy,sceneDepthHalf:this.sceneRenderer.opaqueDepthHalf.texture,refraction:this.refraction,hullMask:this.sceneRenderer.hullMaskRT.texture,hullMaskActive:this.sceneRenderer.hullMaskActive}),this.waterMaterial.clouds=this.clouds,this.ocean=new Ee(this.oceanLOD.geometry,this.waterMaterial),this.ocean.frustumCulled=!1,this.ocean.receiveShadow=!0,this.ocean.layers.set(ce.WATER),this.scene.traverse(e=>{e.isMesh&&(e.name===`village_fabric`||e.name===`village_nets`||e.name===`boat-trap`||e.name===`boat-glass`)&&e.layers.set(ce.TRANSPARENT)}),nt(this.terrain.mesh),nt(this.rocks.group),s.add(this.ocean),this.query=new eu(o,this.surface),this.query.flatTerrain=this.terrainData,this.marineSnow=new cu({fft:this.fft,query:this.query}),s.add(this.marineSnow.mesh),this.spray=new mc(o,{query:this.query,terrain:this.terrainGPU,sceneCopy:this.sceneRenderer.opaqueCopy,clouds:this.clouds}),s.add(this.spray.mesh),this.reef.setSpray&&this.reef.setSpray(this.spray),this.breakers=new iu(o,{surface:this.surface,shore:this.shore,terrainData:this.terrainData,sky:this.sky,spray:this.spray,clouds:this.clouds}),s.add(this.breakers.mesh),this.airMotes=new fu({terrain:this.terrainGPU,clouds:this.clouds,csm:this.csm,reversedDepth:!0}),s.add(this.airMotes.mesh),this.boatCtl=new jp({model:this.boat,query:this.query,terrain:this.terrainData,colliders:this.colliders}),this.boatSpray=new qp({boat:this.boatCtl,spray:this.spray}),this.whale=new Hl({scene:s,terrain:this.terrainData,query:this.query,spray:this.spray});try{await this.whale.load(),this.reef&&this.reef.setWhale&&this.reef.setWhale(this.whale)}catch(e){console.warn(`whale model failed to load`,e),this.whale=null}this.wake=new sm(o,{terrainGPU:this.terrainGPU,boat:this.boatCtl,colliders:this.colliders}),this.surface.wake=this.wake,this.player=new Bt({camera:l,input:this.input,terrain:this.terrainData,colliders:this.colliders,query:this.query,boat:this.boatCtl,reef:this.reef}),this.wildlife=new bl({scene:s,renderer:o,terrain:this.terrainData,terrainGPU:this.terrainGPU,shore:this.shore,village:this.village,colliders:this.colliders,vegetation:this.vegetation,boat:this.boatCtl,boatModel:this.boat,query:this.query,spray:this.spray,csm:this.csm}),this.freeCam=r.has(`fly`),await i(.34,`Preparing the shaders…`),this.underwater=new tt({depthTexture:this.sceneRenderer.sceneRT.depthTexture,maskTexture:this.sceneRenderer.waterMaskTexture,query:this.query,caustics:this.caustics,fft:this.fft}),this.waterMaterial.cameraWaterHeightNode=this.query.cameraState().x,this.haze=r.has(`noHaze`)?null:new It({depthTexture:this.sceneRenderer.sceneRT.depthTexture,underwater:this.underwater,atmosphere:this.atmosphere,sky:this.sky,clouds:this.clouds,terrain:this.terrainGPU,csm:this.csm}),this.post=new de(o,{sceneRenderer:this.sceneRenderer,camera:l,underwater:this.underwater,clouds:this.clouds,sunDir:this.atmosphere.sunDir,haze:this.haze}),h.exposure.value=this.settings.exposure,r.has(`scale`)&&(this.settings.renderScale=Number(r.get(`scale`))||1),this.setRenderScale(this.settings.renderScale),this.audio=r.has(`noAudio`)?null:new Em,this.player.audio=this.audio,this.game=new np(this);for(let[e,t,r,i]of[[Fd,-.9,1.85,.1],[Kd,-.75,1.58,-1.45]]){let a=Math.cos(e.yaw),o=Math.sin(e.yaw),s=e.x+t*a+i*o,l=e.z-t*o+i*a;this.localLights.add({position:new n(s,this.terrainData.heightAt(e.x,e.z)+r,l),color:new c(1,.72,.42),intensity:7.5,range:11,kind:`lantern`,flicker:.08})}this.boatCtl.onSlam=e=>this.audio&&this.audio.hullSlap(e),a.domElement.addEventListener(`click`,()=>{window.__ui&&window.__ui.isPointerOverUI||(this.input.requestLock(),this.audio&&this.audio.resume())}),this.profiler=new Jt(o),this.profiler.track(`fft rows`,this.fft.rowKernel),this.profiler.track(`fft columns`,this.fft.columnKernel),this.profiler.track(`sky view`,this.atmosphere.skyViewKernel),this.updateSun(),Object.assign(this.world,{terrain:this.terrainData,layout:z,start:z.start,vegetationExclusions:this.village.getFootprints(),waterBodies:[{id:`ocean`,kind:`ocean`,level:0,unbounded:!0}],minimap:z}),be(this),window.__app=this,this.gpu=_e,await i(.36,`Compiling shaders…`,.95),await this.precompile(),this.setWaterEnabled(!r.has(`noWater`)),this.setQualityLevels(O(r)),await i(.96,`Warming up…`);for(let e=0;e<2;e++)this.frame(1/60),await _e.queue.onSubmittedWorkDone()}async precompile(){let e=this.engine.meshRenderer,t=this.refraction.enabled;this.post._built||(this.post._build(),this.post._outW=0),await _e.pipelinesReady(),e.precompiling=!0,this.refraction.enabled=!0;let n=this.sceneRenderer,r=n.hullMaskRT;n.hullMasks.length&&e.render(n.hullMaskScene,{label:`hull mask`,kind:`color`,camera:this.camera,colorViews:[r.texture.view()],colorFormats:r.formats,clearColors:[[0,0,0,0]],depthView:r.depthTexture.view(),depthFormat:ne,clearDepth:0,cull:!1});try{for(let e of[0,1])this.waterMaterial.hullOverride=e,this.frame(1/60)}catch(e){console.warn(`precompile failed`,e)}this.waterMaterial.hullOverride=null,e.precompiling=!1,this.refraction.enabled=t,await _e.pipelinesReady(),await _e.queue.onSubmittedWorkDone()}setWaterEnabled(e){return this.worldId===`rocha`?this._setRochaWaterEnabled(e):Bn(this,h,e)}updateSun(){let e=this.settings,t=ue(e.timeOfDay).applyAxisAngle(Dm,f.degToRad(e.sunAzimuth||0));this.atmosphere.sunDir.value.copy(t);let r=f.smoothstep(-t.y,.02,.18);h.night.value=r,this.sky.starIntensity.value=r;let i=new n(-t.x,Math.abs(t.y)*.8+.25,-t.z).normalize();this.sky.moonDir.value.copy(i);let a=t.y>-.07?t:i;h.sunDir.value.copy(a)}applyAtmosphereReadback(){let e=this.atmosphere;if(!e.sunTransmittance)return;let t=e.sunDir.value,n=t.y>-.07,r=e.sunTransmittance,i=f.smoothstep(t.y,-.03,.02),a;a=n?new c(r[0],r[1],r[2]).multiplyScalar(11*i):new c(.6,.7,1).multiplyScalar(.12*h.night.value),h.sunColor.value.copy(a);let o=e.skyIrradiance,s=.012*h.night.value;h.skyIrradiance.value.setRGB(o[0]+s*.6,o[1]+s*.7,o[2]+s),h.horizonColor.value.setRGB(e.horizon[0],e.horizon[1],e.horizon[2])}toggleTime(){let e=this.settings;e.timeSpeed===0?e.timeSpeed=this._timeSpeed||.05:(this._timeSpeed=e.timeSpeed,e.timeSpeed=0),this.ui&&(this.ui.s.advance=e.timeSpeed!==0,this.ui.ui.refresh(),this.ui.ui.toast(e.timeSpeed===0?`Time paused`:`Time running`))}setFreeCam(e){if(e!==this.freeCam){if(this.freeCam=e,e){let e=new t().setFromQuaternion(this.camera.quaternion,`YXZ`);this.fly.setPose(this.camera.position.clone(),e.y,e.x),this.fly.velocity.set(0,0,0)}else this.player.mode!==`boat`&&this.player.mode!==`deck`&&this.dropPlayerAtCamera()}}dropPlayerAtCamera(){let e=this.player,n=this.camera.position,r=new t().setFromQuaternion(this.camera.quaternion,`YXZ`);e.yaw=r.y,e.pitch=f.clamp(r.x,-1.5,1.5),e.velocity.set(0,0,0);let i=Math.max(this.terrainData.heightAt(n.x,n.z),this.colliders.groundHeightAt(n.x,n.z,n.y)),a=this.cameraWaterHeight??0;n.y<a?(e.mode=`swim`,e.position.set(n.x,Math.max(n.y-.16,i+.3),n.z)):(e.mode=`walk`,e.position.set(n.x,Math.max(n.y-1.62,i),n.z),e.grounded=!1),e.waterH=a,e.waterMean=a}get positioningModeActive(){return this.positioningMode?.active===!0}get positioningVersion(){return Ze}get positioningCoordinateFrame(){return this._positioningCoordinateFrame||=Ye(this.terrainData)}worldToPositioning(e){return Je(e,this.positioningCoordinateFrame)}positioningToWorld(e){return Xe(e,this.positioningCoordinateFrame)}snapPositionToMillimetres(e){return Qe(e)}async openPositioningMode(){if(this.positioningModeActive)return!0;if(this._positioningOpening)return this._positioningOpening;let t=this._positioningRequest=(this._positioningRequest||0)+1;this._positioningOpening=(async()=>{let{PositioningMode:n}=await e(async()=>{let{PositioningMode:e}=await import(`./PositioningMode-BlXOboEe.js`);return{PositioningMode:e}},__vite__mapDeps([22,2,3,12,4,23,13,9,1,7,17]),import.meta.url);if(t!==this._positioningRequest)return!1;let r=this.positioningMode=new n(this);if(this.disposeElectrical&&!this._positioningDisposalHook){this._positioningDisposalHook=!0;let e=this.disposeElectrical;this.disposeElectrical=(...t)=>(this.closePositioningMode({resume:!1}),e.apply(this,t))}try{return await r.open()}catch(e){throw r.dispose(),this.positioningMode===r&&(this.positioningMode=null),e}})();try{return await this._positioningOpening}finally{this._positioningOpening=null}}closePositioningMode(e){this._positioningRequest=(this._positioningRequest||0)+1;let t=this.positioningMode;this.positioningMode=null,t?.dispose(e)}start(){this.engine.start((e,t)=>this.frame(e,t))}updateFPS(e){this.engine?._running&&Number.isFinite(this.engine.frameInterval)&&(e=this.engine.frameInterval);let t=this._fps||={el:document.getElementById(`fps`),acc:0,n:0,worst:0};if(t.acc+=e,t.n++,t.worst=Math.max(t.worst,e),t.acc>=.5){let e=t.n/t.acc,n=`${e.toFixed(0)} fps · ${(1e3*t.acc/t.n).toFixed(1)} ms · max ${(t.worst*1e3).toFixed(1)} ms`;if(this.profiler&&this.profiler.enabled){let e=this.profiler.result;n+=` · GPU c ${e.compute.toFixed(2)} r ${e.render.toFixed(2)}`}t.el&&(t.el.textContent=n),this.fps=e,t.acc=0,t.n=0,t.worst=0}}frame(e){let t=performance.now();this._frame(e);let n=performance.now()-t;this.cpuMs=this.cpuMs===void 0?n:this.cpuMs*.95+n*.05}_frame(e){_e.beginFrame(),y.fields.frameIndex.value=_e.frame;let t=this.settings;if(this.updateFPS(e),h.dt.value=e,h.time.value+=e,t.timeSpeed!==0&&(t.timeOfDay=(t.timeOfDay+e*t.timeSpeed+24)%24),this.input.hit(`KeyF`)&&this.setFreeCam(!this.freeCam),this.input.hit(`KeyT`)&&this.toggleTime(),this.input.hit(`KeyL`)){let e=this.localLights.toggleFlashlight();this.ui&&this.ui.ui.toast(e?`Flashlight on`:`Flashlight off`)}if(this.input.hit(`KeyM`)&&this.audio&&(this.audio.setMuted(!this.audio.muted),this.ui&&this.ui.ui.toast(this.audio.muted?`Sound off`:`Sound on`)),this.boatCtl.update(e),this.waterEnabled&&this.boatSpray.update(e),this.waterEnabled&&this.wake.update(e),this.freeCam?this.fly.update(e):this.player.update(e),this.game.update(e),this.updateSun(),this.atmosphere.update(e,this.camera.position.y),this.applyAtmosphereReadback(),this.waterEnabled&&this.fft.update(e),this.waterEnabled&&this.seaDetail.update(e),this.query.setCamera(this.camera.position.x,this.camera.position.z),this.boatCtl.queueQueries(),this.query.update(),this.query.cpuValid){let e=this.query.cpu[0],t=Number.isFinite(e)?e:this.cameraWaterHeight??0;h.cameraUnderwater.value=this.waterEnabled&&this.camera.position.y<t-.35?1:0,h.cameraWaterHeight.value=t,this.cameraWaterHeight=t}this.waterEnabled&&this.caustics&&this.caustics.update(),this.marineSnow.update(this.camera,this.waterEnabled&&this.camera.position.y<(this.cameraWaterHeight??0)+.35),this.airMotes.update(e,this.camera,this.cameraWaterHeight??0),this.waterEnabled&&this.shoreSim&&this.shoreSim.update(),this.waterEnabled&&this.underwaterLighting.update(this.camera),this.waterEnabled&&this.breakers.update(this.camera),this.waterEnabled&&this.spray.update(),this.clouds&&this.qualityLevels.atmosphere>0&&this.clouds.update(e,this.camera),this.environment.update(e,this._qualityEnvironmentDirty===!0),this._qualityEnvironmentDirty=!1,this.waterEnabled&&this.oceanLOD.update(this.camera),this._waterGroundDirty&&=(this.terrainGPU.updateSunShadow(this.renderer,!0),!1),this.terrain.update(this.camera),this.rocks.update(this.camera),this.debris.update(this.camera),this.reef.update(e,this.camera.position),this.village.update(e),this.vegetation&&this.qualityLevels.sceneDetail>0&&this.vegetation.update(e,this.camera),this.whale&&this.whale.update(e,this.camera),this.boat.update(e),this.wildlife.update(e,this.camera,this.freeCam?null:this.player),this.localLights.update(this.camera,e),h.exposure.value=t.exposure,rt(this.camera),this.waterEnabled&&this.post.lens.update(e,this.camera.position.y<(this.cameraWaterHeight??0)),this.post.flare&&(this.post.flare.setDepthHeight(this.sceneRenderer.sceneRT.height),this.post.flare.update(this.camera,e,{aboveWater:!this.waterEnabled||this.camera.position.y>(this.cameraWaterHeight??0)-.02})),this.post.beginFrame(),this.underwater.updateCamera(this.camera),this.shadows.render(this.scene,this.engine.meshRenderer,this.shadows.update(this.camera,h.sunDir.value)),this.sceneRenderer.render(),this.post.flare&&this.post.flare.kernel.dispatch(1),this.post.render(),this.post.endFrame(),_e.submit(),this.profiler.update(e),this.updateAudio(e),this.ui&&this.ui.update(e),this.input.endFrame()}setQualityLevels(e){return me(this,h,e)}setRenderScale(e){let t=f.clamp(Math.round(e*20)/20,.5,1);this.settings.renderScale=t,this.post.setScale(t),this.clouds&&(this.clouds.resolutionScale=t*Math.sqrt(this.qualityLevels.atmosphere||1))}updateAudio(e){if(!this.audio||!this.audio.enabled)return;let t=this.camera,r=t.position,i=this._af||={fwd:new n,up:new n};t.getWorldDirection(i.fwd),i.up.set(0,1,0).applyQuaternion(t.quaternion);let a=this.cameraWaterHeight??0,o=this.terrainData.coastDistance(r.x,r.z).d;this.audio.update(e,{listener:{position:r,forward:i.fwd,up:i.up},underwater:+(r.y<a),depthBelowSurface:Math.max(0,a-r.y),surfIntensity:Math.min(1,this.shore.amplitude.value/.6),distanceToShore:Math.abs(o),coastDistance:o,waveHeight:this.shore.amplitude.value*2,windSpeed:h.windSpeed.value,windDir:h.windDir.value,daylight:1-h.night.value,nearPier:Math.abs(r.x-z.pier.x)<12&&r.z>z.pier.zStart-5&&r.z<z.pier.zEnd+8,boat:{active:this.boatCtl.driven,rpm:this.boatCtl.rpm,throttle:this.boatCtl.throttle,speed:this.boatCtl.velocity.length(),position:this.boat.group.position,listenerInside:this.player.mode===`boat`&&this.player.camMode===`first`}})}},km=(e,t=2)=>`<path d="M2 ${e}c1.67 0 1.67-${t} 3.33-${t}s1.67 ${t} 3.34 ${t} 1.66-${t} 3.33-${t} 1.67 ${t} 3.33 ${t} 1.67-${t} 3.34-${t} 1.66 ${t} 3.33 ${t}"/>`,Am={wave:km(7)+km(12.5)+km(18),palm:`<path d="M12.5 21c-.4-4.2.2-8 1.8-11.2"/><path d="M14.3 9.8C13 7 10 6 7 7"/><path d="M14.3 9.8c.6-3 3.3-4.6 6.2-4"/><path d="M14.3 9.8c-3 .3-5.3 2.3-6 5"/><path d="M14.3 9.8c2.6.6 4.3 2.7 4.5 5.4"/><path d="M4 21h16"/>`,sun:`<circle cx="12" cy="12" r="4"/><path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4"/>`,camera:`<path d="M4 8h3l1.5-2.5h7L17 8h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z"/><circle cx="12" cy="13.5" r="3.5"/>`,sparkles:`<path d="M11 3.5 12.6 8.4 17.5 10l-4.9 1.6L11 16.5l-1.6-4.9L4.5 10l4.9-1.6z"/><path d="M18.5 14.5l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z"/>`,gauge:`<path d="M4.5 18a9 9 0 1 1 15 0"/><path d="m12 13.5 3.5-4"/><circle cx="12" cy="13.5" r="1.2"/>`,"chevron-down":`<path d="m6 9 6 6 6-6"/>`,"chevron-right":`<path d="m9 6 6 6-6 6"/>`,"chevron-left":`<path d="m15 6-6 6 6 6"/>`,"chevrons-right":`<path d="m6 7 5 5-5 5M13 7l5 5-5 5"/>`,close:`<path d="M6 6l12 12M18 6 6 18"/>`,reset:`<path d="M3.5 12a8.5 8.5 0 1 0 2.6-6.1L3.5 8.5"/><path d="M3.5 3.5v5h5"/>`,panel:`<rect x="3" y="4.5" width="18" height="15" rx="2.5"/><path d="M14.5 4.5v15M17 8.5h1.5M17 11.5h1.5"/>`,help:`<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.6v.4"/><path d="M12 17h.01"/>`,info:`<circle cx="12" cy="12" r="9"/><path d="M12 11v5.5M12 7.8h.01"/>`,check:`<path d="m5 12.5 4.5 4.5L19 7.5"/>`,keyboard:`<rect x="2.5" y="6" width="19" height="12" rx="2"/><path d="M6 10h.01M9.5 10h.01M13 10h.01M16.5 10h.01M7 14h10"/>`,mouse:`<rect x="6.5" y="3" width="11" height="18" rx="5.5"/><path d="M12 7v3"/>`,viewfinder:`<path d="M4 8.5V6a2 2 0 0 1 2-2h2.5M15.5 4H18a2 2 0 0 1 2 2v2.5M20 15.5V18a2 2 0 0 1-2 2h-2.5M8.5 20H6a2 2 0 0 1-2-2v-2.5"/><circle cx="12" cy="12" r="3"/>`,sliders:`<path d="M4 7h9M17 7h3M4 17h3M11 17h9"/><circle cx="15" cy="7" r="2"/><circle cx="9" cy="17" r="2"/>`,play:`<path d="M7.5 4.5v15l12-7.5z"/>`,pause:`<path d="M8 5v14M16 5v14"/>`,volume:`<path d="M11 5 6.5 9H3.5v6h3L11 19z"/><path d="M15.5 9a4 4 0 0 1 0 6M18.5 6.5a8 8 0 0 1 0 11"/>`,mute:`<path d="M11 5 6.5 9H3.5v6h3L11 19z"/><path d="m16 9.5 5 5M21 9.5l-5 5"/>`,eye:`<path d="M2 12s3.6-6.5 10-6.5S22 12 22 12s-3.6 6.5-10 6.5S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>`,clock:`<circle cx="12" cy="12" r="9"/><path d="M12 7.5V12l3 2"/>`,bolt:`<path d="M13 2.5 5 13.5h6.5L11 21.5l8-11h-6.5z"/>`,grid:`<rect x="3.5" y="3.5" width="17" height="17" rx="2"/><path d="M3.5 9.2h17M3.5 14.8h17M9.2 3.5v17M14.8 3.5v17"/>`,layers:`<path d="m12 3.5 9 4.5-9 4.5-9-4.5z"/><path d="m3 12 9 4.5 9-4.5"/><path d="m3 16 9 4.5 9-4.5"/>`,cpu:`<rect x="6" y="6" width="12" height="12" rx="1.5"/><path d="M9.5 9.5h5v5h-5zM9 2.5V6M15 2.5V6M9 18v3.5M15 18v3.5M2.5 9H6M2.5 15H6M18 9h3.5M18 15h3.5"/>`,monitor:`<rect x="3" y="4" width="18" height="12.5" rx="1.8"/><path d="M9 20h6M12 16.5V20"/>`,palette:`<path d="M12 3a9 9 0 0 0 0 18c1.2 0 1.8-.8 1.8-1.7 0-1.2-1-1.6-1-2.6 0-.9.7-1.5 1.7-1.5H17a4 4 0 0 0 4-4c0-4.5-4-8.2-9-8.2z"/><circle cx="7.5" cy="11" r="1"/><circle cx="10" cy="7" r="1"/><circle cx="15" cy="7.5" r="1"/>`,shadow:`<circle cx="12" cy="12" r="8.5"/><path d="M12 3.5v17M12 7h4.5M12 10.5h8M12 14h8M12 17.5h4.5"/>`,moon:`<path d="M12 3a6.5 6.5 0 0 0 9 9 9 9 0 1 1-9-9z"/>`,sunset:`<path d="M3 17.5h18"/><path d="M7 17.5a5 5 0 0 1 10 0"/><path d="M12 5v3.5M5.6 9.1l1.4 1.4M18.4 9.1 17 10.5M8.5 21h7"/>`,cloud:`<path d="M7 18a4.5 4.5 0 1 1 .8-8.9A6 6 0 0 1 19 11a3.5 3.5 0 0 1-.5 7z"/>`,wind:`<path d="M3 8.5h10a2.5 2.5 0 1 0-2.5-2.5"/><path d="M3 12.5h14.5a3 3 0 1 1-3 3"/><path d="M3 16.5h6"/>`,droplet:`<path d="M12 3.5s6 6.2 6 10.5a6 6 0 0 1-12 0c0-4.3 6-10.5 6-10.5z"/>`,foam:`<circle cx="8.5" cy="14.5" r="4"/><circle cx="16.5" cy="9" r="2.5"/><circle cx="16" cy="17" r="1.6"/><circle cx="9.5" cy="6" r="1.4"/>`,mountain:`<path d="m3 19 6.5-11 4 6.5 2.5-3.5L21 19z"/>`,compass:`<circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2.2 4.8-4.8 2.2 2.2-4.8z"/>`,anchor:`<circle cx="12" cy="5" r="2"/><path d="M12 7v14M5 12H3a9 9 0 0 0 18 0h-2M8 10h8"/>`,fog:`<path d="M4 8h13M3 12h18M6 16h14M9 20h7"/>`,calm:`<path d="M8 13.5a4 4 0 0 1 8 0"/><path d="M3 16.5h18"/><path d="M7 20h10"/>`,breezy:`<path d="M4 9.5h9a2 2 0 1 0-2-2"/>`+km(17,2),choppy:`<path d="m2 10 2.5-3 2.5 3 2.5-3 2.5 3 2.5-3 2.5 3 2.5-3 2.5 3"/><path d="m2 16.5 2.5-3 2.5 3 2.5-3 2.5 3 2.5-3 2.5 3 2.5-3 2.5 3"/>`,storm:`<path d="M7 16.5a4.2 4.2 0 1 1 .8-8.3A5.8 5.8 0 0 1 18.8 10a3.3 3.3 0 0 1 .2 6.5"/><path d="m13 12.5-2.5 4h3l-2.5 4"/>`,walk:`<circle cx="13.5" cy="4.5" r="1.8"/><path d="M13 8 11.8 14"/><path d="M12.9 8.6 9.5 11M12.9 8.6l3.2 2.6"/><path d="M11.8 14 9.5 20.5M11.8 14l3 2.8.6 3.7"/>`,swim:`<circle cx="16.5" cy="6.5" r="1.8"/><path d="M4.5 12.5 9 9l3.2 2.3L15 9.8"/>`+km(17,1.5),dive:`<path d="M12 3v9"/><path d="m8.5 8.5 3.5 3.5 3.5-3.5"/>`+km(17,1.5)+`<path d="M6 21h12"/>`,boat:`<path d="M2.5 14.5h19l-2.6 4.5H5.4z"/><path d="M6.5 14.5v-3H14l2.5 3"/><path d="M9 11.5V9"/>`,move:`<path d="M12 3v18M3 12h18"/><path d="m9.5 5.5 2.5-2.5 2.5 2.5M9.5 18.5l2.5 2.5 2.5-2.5M5.5 9.5 3 12l2.5 2.5M18.5 9.5 21 12l-2.5 2.5"/>`,dot:`<circle cx="12" cy="12" r="3.5"/>`},jm={ocean:`wave`,waves:`wave`,water:`wave`,sea:`wave`,shore:`palm`,beach:`palm`,island:`palm`,coast:`palm`,sky:`sun`,day:`sun`,light:`sun`,lighting:`sun`,atmosphere:`sun`,effects:`sparkles`,fx:`sparkles`,sparkle:`sparkles`,post:`sparkles`,bloom:`sparkles`,quality:`sparkles`,performance:`gauge`,perf:`gauge`,speed:`gauge`,fps:`gauge`,stats:`gauge`,photo:`viewfinder`,"photo-mode":`viewfinder`,lens:`viewfinder`,aperture:`viewfinder`,settings:`sliders`,tune:`sliders`,controls:`sliders`,time:`clock`,"time-of-day":`clock`,refresh:`reset`,undo:`reset`,"rotate-ccw":`reset`,sound:`volume`,audio:`volume`,music:`volume`,terrain:`mountain`,gpu:`cpu`,display:`monitor`,screen:`monitor`,render:`monitor`,question:`help`,x:`close`,cam:`camera`,color:`palette`,colors:`palette`,grade:`palette`,walking:`walk`,swimming:`swim`,diving:`dive`,underwater:`dive`,free:`move`,"free-camera":`move`,fly:`move`,drone:`move`,bubbles:`foam`,spray:`foam`,clouds:`cloud`,weather:`cloud`,rain:`storm`,night:`moon`,dusk:`sunset`,dawn:`sunset`,sunrise:`sunset`,heading:`compass`,navigation:`compass`,harbor:`anchor`,dock:`anchor`,pier:`anchor`,haze:`fog`,mist:`fog`,shadows:`shadow`,lightning:`bolt`,energy:`bolt`};function Mm(e,t=``){if(typeof e==`string`&&e.trim().startsWith(`<svg`))return e;let n=Am[jm[e]||e]||Am.dot;return`<svg class="tw-ico${t?` `+t:``}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${n}</svg>`}var Nm=0;function Pm(e=``){let t=`tw-bm-${++Nm}`;return`<svg class="tw-mark${e?` `+e:``}" viewBox="0 0 32 32" aria-hidden="true" focusable="false">
		<defs>
			<linearGradient id="${t}-a" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#a8fbf1"/><stop offset="1" stop-color="#3fb4d6"/></linearGradient>
			<linearGradient id="${t}-s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffd8a6"/><stop offset="1" stop-color="#ff9f5a"/></linearGradient>
		</defs>
		<circle cx="16" cy="16" r="14" fill="none" stroke="url(#${t}-a)" stroke-width="1.4" opacity=".55"/>
		<circle cx="16" cy="13" r="4.2" fill="url(#${t}-s)"/>
		<path d="M5.5 18.5c2.1 0 2.9-2.6 5.2-2.6s3.1 2.6 5.3 2.6 3.1-2.6 5.3-2.6 3 2.6 5.2 2.6" fill="none" stroke="url(#${t}-a)" stroke-width="2" stroke-linecap="round"/>
		<path d="M8.5 23c1.6 0 2.2-1.8 3.9-1.8s2.3 1.8 3.9 1.8 2.3-1.8 3.9-1.8 2.2 1.8 3.8 1.8" fill="none" stroke="url(#${t}-a)" stroke-width="1.6" stroke-linecap="round" opacity=".6"/>
	</svg>`}var Fm=(e,t,n)=>e<t?t:e>n?n:e,Im=(e,t,n)=>e+(t-e)*n,Lm=Math.PI*2,Rm=0,zm=(e=`tw`)=>`${e}-${++Rm}`,Bm={"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#39;`},Vm=e=>String(e??``).replace(/[&<>"']/g,e=>Bm[e]);function Q(e,t,n){let r=document.createElement(e);if(t&&(r.className=t),n)for(let e in n){let t=n[e];t!=null&&t!==!1&&(e===`html`?r.innerHTML=t:e===`text`?r.textContent=t:r.setAttribute(e,t===!0?``:String(t)))}return r}var Hm=e=>!!e&&(e.isContentEditable||e.tagName===`TEXTAREA`||e.tagName===`SELECT`||e.tagName===`INPUT`&&!/^(checkbox|radio|range|button|color|submit|reset)$/i.test(e.type)),Um=(e,t)=>typeof e==`number`&&typeof t==`number`?Math.abs(e-t)>1e-9*Math.max(1,Math.abs(t)):e!==t;function Wm(e){if(!e||!isFinite(e))return 0;let t=String(e),n=t.indexOf(`e-`);if(n>=0)return parseInt(t.slice(n+2),10);let r=t.indexOf(`.`);return r<0?0:t.length-r-1}var Gm=e=>e<=1?3:e<=10?2:+(e<=100);function Km(e){if(typeof e==`number`&&isFinite(e))return`#`+(e&16777215).toString(16).padStart(6,`0`);let t=String(e??``).trim().replace(/^#/,``).toLowerCase();return t.length===3&&(t=t.split(``).map(e=>e+e).join(``)),/^[0-9a-f]{6}$/.test(t)?`#`+t:`#000000`}var qm=e=>{let t=parseInt(Km(e).slice(1),16);return[t>>16&255,t>>8&255,t&255]},Jm=(e,t,n)=>`#`+[e,t,n].map(e=>Fm(Math.round(e),0,255).toString(16).padStart(2,`0`)).join(``),Ym=(e,t,n)=>{let r=qm(e),i=qm(t);return Jm(Im(r[0],i[0],n),Im(r[1],i[1],n),Im(r[2],i[2],n))},Xm=[[0,`#040915`,`#0b1730`],[4.4,`#060d22`,`#18244a`],[5.3,`#18264f`,`#b0616a`],[6.1,`#35609e`,`#f2a86e`],[7.6,`#3d7cc2`,`#a8d2ec`],[12,`#2c74c6`,`#c2e4f6`],[16.3,`#3778be`,`#b6daee`],[17.4,`#3a5d9c`,`#f1a25f`],[18.1,`#262f5d`,`#dc6a4e`],[18.9,`#101a3c`,`#473358`],[19.8,`#050b1a`,`#0f1b36`],[24,`#040915`,`#0b1730`]];function Zm(e){let t=(e%24+24)%24;for(let e=0;e<Xm.length-1;e++){let n=Xm[e],r=Xm[e+1];if(t>=n[0]&&t<=r[0]){let e=(t-n[0])/(r[0]-n[0]||1),i=e*e*(3-2*e);return[Ym(n[1],r[1],i),Ym(n[2],r[2],i)]}}return[Xm[0][1],Xm[0][2]]}var Qm=[[4.8,`Night`],[5.6,`Dawn`],[6.4,`Sunrise`],[7.2,`Golden hour`],[10.5,`Morning`],[13.5,`Midday`],[16.8,`Afternoon`],[17.6,`Golden hour`],[18.4,`Sunset`],[19.3,`Dusk`],[24,`Night`]],$m=e=>{for(let[t,n]of Qm)if(e<t)return n;return`Night`},eh=e=>{let t=Math.round((e%24+24)%24*60)%1440;return`${String(Math.floor(t/60)).padStart(2,`0`)}:${String(t%60).padStart(2,`0`)}`},th=[`N`,`NE`,`E`,`SE`,`S`,`SW`,`W`,`NW`];function nh(e){let t=String(e||``).toLowerCase();return t.includes(`boat`)?`boat`:t.includes(`div`)?`dive`:t.includes(`swim`)?`swim`:t.includes(`free`)||t.includes(`fly`)?`move`:t.includes(`photo`)?`viewfinder`:t.includes(`walk`)||t.includes(`run`)?`walk`:`dot`}function rh(e,...t){let n=Array.isArray(e)?e:[e];for(let e of n)if(typeof e==`function`)try{e(...t)}catch(e){console.error(`[UI] callback failed`,e)}}var ih=class{constructor(e,t,n){this.parent=e,this.ui=e.ui,this.opts=t,this.type=n,this.label=t.label??(t.key==null?``:String(t.key)),t.object&&t.key!=null?(this.object=t.object,this.key=t.key):(this.object={value:t.value},this.key=`value`),this.onChange=t.onChange||null,this.enabled=!0,this._default=void 0,this._mod=!1,this.el=Q(`div`,`tw-ctl tw-ctl-${n}`),e._append(this.el),this.ui._controls.add(this)}get value(){return this.object[this.key]}set value(e){this.setValue(e)}setValue(e,t=!0){return this.object[this.key]=e,this.update(),t&&this._emit(),this}_emit(){if(this.onChange)try{this.onChange(this.value,this)}catch(e){console.error(`[UI] onChange failed for "${this.label}"`,e)}}update(){return this._syncModified(),this}reset(){return this._default===void 0||!this.isModified()?this:(this.setValue(this._default),this._flash(),this)}isModified(){return this._default!==void 0&&Um(this.value,this._default)}setVisible(e){return this.el.hidden=!e,this}setEnabled(e){return this.enabled=!!e,this.el.classList.toggle(`is-disabled`,!this.enabled),this.el.inert=!this.enabled,this}setLabel(e){return this.label=String(e),this.labelText&&(this.labelText.textContent=this.label),this}dispose(){this.el.remove(),this.ui._controls.delete(this)}_syncModified(){let e=this.isModified();e!==this._mod&&(this._mod=e,this.el.classList.toggle(`is-modified`,e))}_flash(){this.el.classList.remove(`is-flash`),this.el.offsetWidth,this.el.classList.add(`is-flash`)}_makeLabel(e,t){let n=Q(`span`,`tw-label`),r=Q(`span`,`tw-label-text`,{text:e});t&&(r.dataset.tip=t,r.dataset.tipHint=`Double-click to reset`);let i=Q(`button`,`tw-reset`,{type:`button`,tabindex:`-1`,"aria-label":`Reset ${e}`,"data-tip":`Reset to default`,html:Mm(`reset`)});return i.addEventListener(`click`,e=>{e.stopPropagation(),this.reset()}),n.addEventListener(`dblclick`,e=>{e.preventDefault(),e.stopPropagation(),this.reset()}),n.append(r,i),this.labelEl=n,this.labelText=r,n}_isShown(){if(this.el.hidden)return!1;let e=this.parent;for(;e;){if(e.isTab)return e===this.ui.activeTab&&this.ui._panelOpen&&!this.ui._photo;if(!e.isOpen||e.el.hidden)return!1;e=e.parent}return!1}},ah=class extends ih{constructor(e,t){super(e,t,`slider`);let n=Number(t.min??0),r=Number(t.max??1);r<n&&([n,r]=[r,n]),this.min=n,this.max=r,this.step=t.step>0?Number(t.step):0,this.stops=t.stops||null,this.log=!!t.log&&n>0,this.unit=t.unit||``,this.format=typeof t.format==`function`?t.format:null,this.onFinishChange=t.onFinishChange||null,this.decimals=t.decimals??(this.step?Wm(this.step):Gm(r-n)),this._default=this.value;let i=Q(`div`,`tw-row`);i.append(this._makeLabel(this.label,t.tooltip)),this.valueEl=Q(`button`,`tw-value`,{type:`button`,tabindex:`-1`,"data-tip":`Click to type a value`}),i.append(this.valueEl),this.track=Q(`div`,`tw-slider`,{role:`slider`,tabindex:`0`,"aria-label":this.label,"aria-valuemin":n,"aria-valuemax":r}),this.rail=Q(`div`,`tw-slider-rail`),this.fill=Q(`div`,`tw-slider-fill`),this.mark=Q(`div`,`tw-slider-mark`),this.thumb=Q(`div`,`tw-slider-thumb`),this.rail.append(this.fill,this.mark,this.thumb),this.track.append(this.rail),this.el.append(i,this.track),this._t0=!this.log&&n<0&&r>0?this._toT(0):0,typeof this._default==`number`&&(this.mark.style.left=`${this._toT(this._default)*100}%`),this._bindPointer(),this._bindKeys(),this.valueEl.addEventListener(`click`,()=>this._edit()),this.update()}_toT(e){return typeof e!=`number`||!isFinite(e)?0:this.stops?this.stops.indexOf(this._quantize(e))/(this.stops.length-1):this.log?Fm(Math.log(e/this.min)/Math.log(this.max/this.min),0,1):this.max>this.min?Fm((e-this.min)/(this.max-this.min),0,1):0}_fromT(e){if(this.stops)return this.stops[Math.round(Fm(e,0,1)*(this.stops.length-1))];let t=this.log?this.min*(this.max/this.min)**+e:this.min+(this.max-this.min)*e;return this._quantize(t)}_quantize(e){if(e=Fm(e,this.min,this.max),this.stops)return this.stops.reduce((t,n)=>Math.abs(n-e)<Math.abs(t-e)?n:t);if(this.step){let t=this.log?0:this.min;e=t+Math.round((e-t)/this.step)*this.step,e=Fm(+e.toFixed(Math.min(12,this.decimals+3)),this.min,this.max)}else this.log&&(e=+e.toPrecision(6));return e}_setFromT(e){let t=this._fromT(e);Um(t,this.value)&&this.setValue(t)}_num(e){if(e==null)return`—`;if(typeof e!=`number`||!isFinite(e))return String(e);let t=this.decimals;if(this.log&&!this.step){let n=Math.abs(e);t=n<.1?4:n<1?3:n<10?2:+(n<100)}let n=e.toFixed(t);return/^-0(\.0*)?$/.test(n)&&(n=n.slice(1)),n.replace(`-`,`−`)}_text(e){if(this.format){let t;try{t=this.format(e)}catch{t=this._num(e)}return Vm(t)}if(!this.unit)return Vm(this._num(e));let t=/^(°|%|×|x)$/.test(this.unit)?` is-tight`:``;return`${Vm(this._num(e))}<span class="tw-unit${t}">${Vm(this.unit)}</span>`}update(){let e=this.value,t=this._toT(e);if(t!==this._t){this._t=t;let e=Math.min(t,this._t0),n=Math.max(t,this._t0);this.fill.style.left=`${e*100}%`,this.fill.style.width=`${(n-e)*100}%`,this.thumb.style.left=`${t*100}%`}let n=this._text(e);return n!==this._txt&&(this._txt=n,this.valueEl.innerHTML=n,this.track.setAttribute(`aria-valuenow`,typeof e==`number`?e:0),this.track.setAttribute(`aria-valuetext`,this.format?this.valueEl.textContent:`${this._num(e)}${this.unit?` `+this.unit:``}`)),this._syncModified(),this}_bindPointer(){let e=this.track,t=0,n=0,r=!1,i=1,a=null,o=e=>{if(e.pointerId!==a)return;let o=e.shiftKey;o!==r&&(t=this._dragT,n=e.clientX,r=o);let s=Fm(t+(e.clientX-n)/i*(r?.1:1),0,1);this._dragT=s,this._setFromT(s)},s=t=>{if(t.pointerId===a&&(a=null,e.removeEventListener(`pointermove`,o),e.removeEventListener(`pointerup`,s),e.removeEventListener(`pointercancel`,s),this.el.classList.remove(`is-dragging`),this.ui._dragEnd(),this.onFinishChange))try{this.onFinishChange(this.value,this)}catch(e){console.error(e)}};e.addEventListener(`pointerdown`,c=>{if(!this.enabled||c.button!==0||a!==null)return;c.preventDefault(),e.focus({preventScroll:!0});let l=this.rail.getBoundingClientRect();i=Math.max(1,l.width),r=c.shiftKey;let u=c.target===this.thumb,d=u?this._toT(this.value):Fm((c.clientX-l.left)/i,0,1);t=d,n=c.clientX,this._dragT=d,a=c.pointerId;try{e.setPointerCapture(a)}catch{}e.addEventListener(`pointermove`,o),e.addEventListener(`pointerup`,s),e.addEventListener(`pointercancel`,s),this.el.classList.add(`is-dragging`),this.ui._dragStart(),u||this._setFromT(d)})}_bindKeys(){this.track.addEventListener(`keydown`,e=>{if(!this.enabled)return;let t=this.stops?1/(this.stops.length-1):this.log||!this.step?.01:this.step/(this.max-this.min||1);switch(t=Math.max(t,.001)*(e.shiftKey?10:1),e.key){case`ArrowRight`:case`ArrowUp`:this._nudge(1,t);break;case`ArrowLeft`:case`ArrowDown`:this._nudge(-1,t);break;case`PageUp`:this._nudge(1,.1);break;case`PageDown`:this._nudge(-1,.1);break;case`Home`:this._setFromT(0);break;case`End`:this._setFromT(1);break;case`Enter`:this._edit();break;default:return}e.preventDefault(),e.stopPropagation()})}_nudge(e,t){let n=this.value,r=this._toT(n);for(let i=0;i<200;i++){r=Fm(r+e*t,0,1);let i=this._fromT(r);if(Um(i,n)){this.setValue(i);return}if(r===0||r===1)return}}_edit(){if(!this.enabled||this._editing)return;this._editing=!0;let e=this.value,t=Q(`input`,`tw-value-input`,{type:`text`,inputmode:`decimal`,spellcheck:`false`,autocomplete:`off`,"aria-label":this.label,value:String(typeof e==`number`?+e.toFixed(Math.max(this.decimals,4)):e??``)});this.valueEl.replaceWith(t),t.focus(),t.select();let n=e=>{if(this._editing){if(this._editing=!1,e){let e=parseFloat(t.value.replace(`,`,`.`).replace(`−`,`-`));if(isFinite(e)){let t=this._quantize(e);Um(t,this.value)&&this.setValue(t)}}t.replaceWith(this.valueEl),this._txt=null,this.update()}};t.addEventListener(`keydown`,e=>{e.stopPropagation(),(e.key===`Enter`||e.key===`Escape`)&&(e.preventDefault(),n(e.key===`Enter`),this.track.focus({preventScroll:!0}))}),t.addEventListener(`blur`,()=>n(!0))}},oh=class extends ih{constructor(e,t){super(e,t,`toggle`),this._default=!!this.value,this.sw=Q(`button`,`tw-switch`,{type:`button`,role:`switch`,"aria-checked":`false`,"aria-label":this.label}),this.sw.append(Q(`span`,`tw-switch-knob`)),this.el.append(this._makeLabel(this.label,t.tooltip),this.sw),this.el.addEventListener(`click`,e=>{!this.enabled||e.detail>1||e.target.closest(`.tw-reset`)||this.setValue(!this.value)}),this.update()}isModified(){return!!this.value!==this._default}update(){let e=!!this.value;return e!==this._on&&(this._on=e,this.sw.setAttribute(`aria-checked`,String(e)),this.el.classList.toggle(`is-on`,e)),this._syncModified(),this}};function sh(e){return e?Array.isArray(e)?e.map(e=>typeof e==`object`&&e?{label:String(e.label??e.value),value:`value`in e?e.value:e.label}:{label:String(e),value:e}):Object.keys(e).map(t=>({label:t,value:e[t]})):[]}var ch=class extends ih{constructor(e,t){super(e,t,`select`),this._default=this.value,this._build(t.options)}_build(e){this.options=sh(e),this.segmented=this.opts.segmented??this.options.length<=4,this.el.replaceChildren(),this.el.classList.toggle(`is-segmented`,this.segmented),this.el.classList.toggle(`is-dropdown`,!this.segmented),this._i=void 0,this._mod=void 0,this.segmented?this._buildSegmented():this._buildDropdown(),this.update()}setOptions(e){return this._build(e),this}_buildSegmented(){let e=Q(`div`,`tw-row`);e.append(this._makeLabel(this.label,this.opts.tooltip));let t=Q(`div`,`tw-seg`,{role:`radiogroup`,"aria-label":this.label});t.style.setProperty(`--n`,Math.max(1,this.options.length)),this.ind=Q(`span`,`tw-seg-ind`),t.append(this.ind),this.btns=this.options.map((e,n)=>{let r=Q(`button`,`tw-seg-btn`,{type:`button`,role:`radio`,"aria-checked":`false`,tabindex:`-1`,text:e.label});return r.addEventListener(`click`,()=>this._pick(n)),t.append(r),r}),t.addEventListener(`keydown`,e=>{let t=e.key===`ArrowRight`||e.key===`ArrowDown`?1:e.key===`ArrowLeft`||e.key===`ArrowUp`?-1:0;if(!t)return;e.preventDefault(),e.stopPropagation();let n=this.options.length,r=((Math.max(0,this._index())+t)%n+n)%n;this._pick(r),this.btns[r].focus()}),this.el.append(e,t)}_buildDropdown(){this.btn=Q(`button`,`tw-dd`,{type:`button`,"aria-haspopup":`listbox`,"aria-expanded":`false`,"aria-label":this.label}),this.btnText=Q(`span`,`tw-dd-text`),this.btn.append(this.btnText),this.btn.insertAdjacentHTML(`beforeend`,Mm(`chevron-down`,`tw-dd-chev`));let e=()=>this.ui._openMenu(this.btn,this.options.map(e=>e.label),this._index(),e=>this._pick(e));this.btn.addEventListener(`click`,()=>{this.ui._menuAnchor===this.btn?this.ui._closeMenu():e()}),this.btn.addEventListener(`keydown`,t=>{(t.key===`ArrowDown`||t.key===`ArrowUp`)&&(t.preventDefault(),t.stopPropagation(),e())}),this.el.append(this._makeLabel(this.label,this.opts.tooltip),this.btn)}_index(){let e=this.value,t=this.options.findIndex(t=>t.value===e);return t<0&&(t=this.options.findIndex(t=>String(t.value)===String(e))),t}_pick(e){let t=this.options[e];t&&this.enabled&&t.value!==this.value&&this.setValue(t.value)}isModified(){return this.value!==this._default}update(){let e=this._index();return e!==this._i&&(this._i=e,this.segmented?(this.btns.forEach((t,n)=>{t.setAttribute(`aria-checked`,String(n===e)),t.tabIndex=n===Math.max(0,e)?0:-1}),this.ind.style.setProperty(`--i`,Math.max(0,e)),this.ind.hidden=e<0):this.btnText.textContent=e>=0?this.options[e].label:String(this.value??`—`)),this._syncModified(),this}},lh=class extends ih{constructor(e,t){super(e,t,`color`),this._default=this._read();let n=Q(`label`,`tw-color`);this.hexEl=Q(`span`,`tw-hex`),this.swatch=Q(`span`,`tw-swatch`),this.input=Q(`input`,`tw-color-input`,{type:`color`,"aria-label":this.label}),n.append(this.hexEl,this.swatch,this.input),this.input.addEventListener(`input`,()=>{this._write(this.input.value),this.update(),this._emit()}),this.el.append(this._makeLabel(this.label,t.tooltip),n),this.update()}get hex(){return this._read()}_read(){let e=this.object[this.key];if(e&&typeof e==`object`){if(typeof e.getHexString==`function`)return`#`+e.getHexString();if(`r`in e)return Jm(e.r*255,e.g*255,e.b*255)}return Km(e)}_write(e){e=Km(e);let t=this.object[this.key];if(t&&typeof t==`object`){if(typeof t.setHex==`function`)t.setHex(parseInt(e.slice(1),16));else if(`r`in t){let[n,r,i]=qm(e);t.r=n/255,t.g=r/255,t.b=i/255}}else typeof t==`number`?this.object[this.key]=parseInt(e.slice(1),16):this.object[this.key]=e}setValue(e,t=!0){return e&&typeof e==`object`&&(e=typeof e.getHexString==`function`?`#`+e.getHexString():Jm(e.r*255,e.g*255,e.b*255)),this._write(e),this.update(),t&&this._emit(),this}isModified(){return this._read()!==this._default}update(){let e=this._read();return e!==this._hex&&(this._hex=e,this.swatch.style.background=e,this.hexEl.textContent=e.slice(1).toUpperCase(),this.input.value!==e&&(this.input.value=e)),this._syncModified(),this}},uh=class extends ih{constructor(e,t){super(e,t,`button`);let n=t.variant===`primary`||t.variant===`ghost`?t.variant:`default`;this.btn=Q(`button`,`tw-btn tw-btn-${n}`,{type:`button`}),this.btn.innerHTML=(t.icon?Mm(t.icon):``)+`<span class="tw-btn-text">${Vm(this.label)}</span>`,t.tooltip&&(this.btn.dataset.tip=t.tooltip),this.btn.addEventListener(`click`,e=>{if(this.enabled)try{t.onClick?.(this,e)}catch(e){console.error(`[UI] button "${this.label}" failed`,e)}}),this.el.append(this.btn)}setLabel(e){return this.label=String(e),this.btn.querySelector(`.tw-btn-text`).textContent=this.label,this}update(){return this}},dh=class extends ih{constructor(e,t){if(super(e,t,`presets`),this.presets=t.presets||[],this.active=this._resolve(t.active),t.label){let e=Q(`div`,`tw-row`),n=Q(`span`,`tw-label`);this.labelText=Q(`span`,`tw-label-text`,{text:t.label}),n.append(this.labelText),e.append(n),this.el.append(e)}let n=Q(`div`,`tw-presets`,{role:`radiogroup`,"aria-label":t.label||`Presets`});n.style.setProperty(`--n`,Math.min(4,Math.max(1,this.presets.length))),this.chips=this.presets.map((e,t)=>{let r=Q(`button`,`tw-chip`,{type:`button`,role:`radio`,"aria-checked":`false`});return r.innerHTML=(e.icon?Mm(e.icon):``)+`<span>${Vm(e.label)}</span>`,(e.tooltip||e.description)&&(r.dataset.tip=e.tooltip||e.description),r.addEventListener(`click`,()=>this.apply(t)),n.append(r),r}),this.el.append(n),this.update()}_resolve(e){return typeof e==`number`?e:typeof e==`string`?this.presets.findIndex(t=>t.label===e||t.id===e):-1}get value(){return this.active>=0?this.presets[this.active]?.label??null:null}set value(e){this.setActive(e)}apply(e){let t=typeof e==`number`?e:this._resolve(e),n=this.presets[t];if(!n||!this.enabled)return this;this.active=t;try{n.apply?.(n,t)}catch(e){console.error(`[UI] preset "${n.label}" failed`,e)}this.ui.refresh();try{this.opts.onChange?.(n,t)}catch(e){console.error(e)}return this}setActive(e){return this.active=this._resolve(e),this.update(),this}reset(){return this}isModified(){return!1}update(){return this.active!==this._a&&(this._a=this.active,this.chips.forEach((e,t)=>{e.classList.toggle(`is-active`,t===this.active),e.setAttribute(`aria-checked`,String(t===this.active))})),this}},fh=class extends ih{constructor(e,t){super(e,t,`info`),this.getter=typeof t.get==`function`?t.get:()=>this.object[this.key];let n=Q(`span`,`tw-label`);this.labelText=Q(`span`,`tw-label-text`,{text:this.label}),t.tooltip&&(this.labelText.dataset.tip=t.tooltip),n.append(this.labelText),this.valEl=Q(`span`,`tw-info-value`),this.el.append(n,this.valEl),this.update()}reset(){return this}isModified(){return!1}update(){let e;try{e=this.getter()}catch{e=null}typeof e==`number`&&(e=Number.isInteger(e)?e.toLocaleString(`en-US`):e.toFixed(2));let t=e==null||e===``?`—`:String(e);return t!==this._s&&(this._s=t,this.valEl.textContent=t),this}},ph={w:300,h:148,cx:150,cy:100,rx:118,up:74,down:32};function mh(e){let t=Math.PI-(e-6)/12*Math.PI,n=Math.sin(t);return{x:ph.cx+ph.rx*Math.cos(t),y:ph.cy-(n>=0?ph.up:ph.down)*n,elev:n}}function hh(e,t){let n=(e-ph.cx)/ph.rx,r=ph.cy-t,i=r>=0?r/ph.up:r/ph.down;return((6+(Math.PI-Math.atan2(i,n))/Math.PI*12)%24+24)%24}function gh(e){let{w:t,h:n,cx:r,cy:i,rx:a,up:o,down:s}=ph,c=11,l=()=>(c=c*16807%2147483647)/2147483647,u=``;for(let e=0;e<26;e++)u+=`<circle cx="${(6+l()*(t-12)).toFixed(1)}" cy="${(5+l()*(i-16)).toFixed(1)}" r="${(.45+l()*.75).toFixed(2)}" opacity="${(.35+l()*.65).toFixed(2)}"/>`;let d=``;for(let e=0;e<24;e+=3){let t=mh(e);d+=`<circle cx="${t.x.toFixed(1)}" cy="${t.y.toFixed(1)}" r="${e%6?1.1:1.8}"/>`}let f=[[`06`,r-a,i+13],[`12`,r,i-o-7],[`18`,r+a,i+13],[`00`,r,i+s+11]].map(([e,t,n])=>`<text x="${t}" y="${n}">${e}</text>`).join(``);return`<svg class="tw-tod-svg" viewBox="0 0 ${t} ${n}" role="slider" tabindex="0" aria-label="Time of day" aria-valuemin="0" aria-valuemax="24">
		<defs>
			<linearGradient id="${e}-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2c74c6"/><stop offset="1" stop-color="#c2e4f6"/></linearGradient>
			<linearGradient id="${e}-sea" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0d2a3a"/><stop offset="1" stop-color="#03101a"/></linearGradient>
			<radialGradient id="${e}-glow"><stop offset="0" stop-color="#fff1d6" stop-opacity=".95"/><stop offset=".28" stop-color="#ffc98a" stop-opacity=".5"/><stop offset="1" stop-color="#ffb86b" stop-opacity="0"/></radialGradient>
			<radialGradient id="${e}-haze"><stop offset="0" stop-color="#ffb070" stop-opacity=".8"/><stop offset="1" stop-color="#ff9a5a" stop-opacity="0"/></radialGradient>
			<linearGradient id="${e}-glint" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffdcae" stop-opacity=".9"/><stop offset="1" stop-color="#ffdcae" stop-opacity="0"/></linearGradient>
			<mask id="${e}-moon"><circle r="5.4" fill="#fff"/><circle cx="2.7" cy="-1.9" r="4.5" fill="#000"/></mask>
			<clipPath id="${e}-clip"><rect width="${t}" height="${n}" rx="10"/></clipPath>
		</defs>
		<g clip-path="url(#${e}-clip)">
			<rect width="${t}" height="${i+1}" fill="url(#${e}-sky)"/>
			<g class="tw-tod-stars" fill="#fff">${u}</g>
			<ellipse class="tw-tod-haze" cx="${r}" cy="${i}" rx="96" ry="30" fill="url(#${e}-haze)"/>
			<rect y="${i}" width="${t}" height="${n-i}" fill="url(#${e}-sea)"/>
			<ellipse class="tw-tod-glint" cx="${r}" cy="${i+8}" rx="5" ry="10" fill="url(#${e}-glint)"/>
			<line class="tw-tod-horizon" x1="0" y1="${i+.5}" x2="${t}" y2="${i+.5}"/>
			<path class="tw-tod-path" d="M${r-a} ${i} A${a} ${o} 0 0 1 ${r+a} ${i}"/>
			<path class="tw-tod-path is-down" d="M${r+a} ${i} A${a} ${s} 0 0 1 ${r-a} ${i}"/>
			<g class="tw-tod-ticks">${d}</g>
			<g class="tw-tod-labels">${f}</g>
			<g class="tw-tod-moon"><circle r="5.4" fill="#e3ecff" mask="url(#${e}-moon)"/></g>
			<g class="tw-tod-sun"><circle r="24" fill="url(#${e}-glow)"/><circle class="tw-tod-disc" r="7"/></g>
		</g>
		<text class="tw-tod-phase" x="14" y="23"></text>
	</svg>`}var _h=(()=>{let e=[];for(let t=0;t<=24;t++){let[n,r]=Zm(t);e.push(`${Ym(n,r,.55)} ${(t/24*100).toFixed(2)}%`)}return`linear-gradient(90deg, ${e.join(`, `)})`})(),vh=class extends ih{constructor(e,t){super(e,Object.assign({},t,{label:t.label??`Time of day`}),`time`),this._default=Number(this.value)||0,this.onFinishChange=t.onFinishChange||null;let n=zm(`tw-tod`),r=Q(`div`,`tw-row`);r.append(this._makeLabel(this.label,t.tooltip)),this.valueEl=Q(`button`,`tw-value tw-clock`,{type:`button`,tabindex:`-1`,"data-tip":`Click to type a time`}),r.append(this.valueEl);let i=Q(`div`,`tw-tod`);i.innerHTML=gh(n),this.svg=i.firstElementChild;let a=e=>this.svg.querySelector(e);this.stopZ=a(`#${n}-sky stop:first-child`),this.stopH=a(`#${n}-sky stop:last-child`),this.stopSea=a(`#${n}-sea stop:first-child`),this.stars=a(`.tw-tod-stars`),this.haze=a(`.tw-tod-haze`),this.glint=a(`.tw-tod-glint`),this.moon=a(`.tw-tod-moon`),this.sun=a(`.tw-tod-sun`),this.sunGlow=this.sun.firstElementChild,this.disc=a(`.tw-tod-disc`),this.phase=a(`.tw-tod-phase`),this.track=Q(`div`,`tw-tod-track`),this.bar=Q(`div`,`tw-tod-bar`),this.bar.style.background=_h,this.knob=Q(`div`,`tw-tod-knob`);let o=Q(`div`,`tw-tod-scale`,{"aria-hidden":`true`});o.innerHTML=[0,6,12,18,24].map(e=>`<span style="left:${e/24*100}%">${String(e).padStart(2,`0`)}</span>`).join(``),this.track.append(this.bar,this.knob,o),this.el.append(r,i,this.track),this._bind(),this.update()}_set(e){Um(e,Number(this.value))&&this.setValue(e)}_bind(){let e=this.svg,t=(e,t)=>t.shiftKey?Math.round(e*4)/4:Math.round(e*60)/60;this._dragOn(e,n=>{let r=e.getBoundingClientRect(),i=t(hh((n.clientX-r.left)/r.width*ph.w,(n.clientY-r.top)/r.height*ph.h),n);return i>=24?0:i}),this._dragOn(this.track,e=>{let n=this.bar.getBoundingClientRect(),r=t(Fm((e.clientX-n.left)/Math.max(1,n.width),0,1)*24,e);return Math.min(r,24-1/60)}),e.addEventListener(`keydown`,e=>{let t=e.shiftKey?1:.25,n=0;switch(e.key){case`ArrowRight`:case`ArrowUp`:n=t;break;case`ArrowLeft`:case`ArrowDown`:n=-t;break;case`PageUp`:n=3;break;case`PageDown`:n=-3;break;case`Enter`:this._edit();break;default:return}e.preventDefault(),e.stopPropagation(),n&&this._set((((Number(this.value)||0)+n)%24+24)%24)}),this.valueEl.addEventListener(`click`,()=>this._edit())}_dragOn(e,t){let n=null;e.addEventListener(`pointerdown`,r=>{if(this.enabled&&r.button===0&&n===null){r.preventDefault(),this.svg.focus({preventScroll:!0}),n=r.pointerId;try{e.setPointerCapture(n)}catch{}this.el.classList.add(`is-dragging`),this.ui._dragStart(),this._set(t(r))}}),e.addEventListener(`pointermove`,e=>{e.pointerId===n&&this._set(t(e))});let r=e=>{if(e.pointerId===n&&(n=null,this.el.classList.remove(`is-dragging`),this.ui._dragEnd(),this.onFinishChange))try{this.onFinishChange(this.value,this)}catch(e){console.error(e)}};e.addEventListener(`pointerup`,r),e.addEventListener(`pointercancel`,r)}_edit(){if(!this.enabled||this._editing)return;this._editing=!0;let e=Q(`input`,`tw-value-input`,{type:`text`,spellcheck:`false`,autocomplete:`off`,"aria-label":this.label,value:eh(Number(this.value)||0)});this.valueEl.replaceWith(e),e.focus(),e.select();let t=t=>{if(this._editing){if(this._editing=!1,t){let t=e.value.trim(),n=/^(\d{1,2})\s*[:h]\s*(\d{1,2})$/i.exec(t),r=n?Number(n[1])+Number(n[2])/60:parseFloat(t.replace(`,`,`.`));isFinite(r)&&this._set((r%24+24)%24)}e.replaceWith(this.valueEl),this._h=null,this.update()}};e.addEventListener(`keydown`,e=>{e.stopPropagation(),(e.key===`Enter`||e.key===`Escape`)&&(e.preventDefault(),t(e.key===`Enter`),this.svg.focus({preventScroll:!0}))}),e.addEventListener(`blur`,()=>t(!0))}isModified(){return Um(Number(this.value)||0,this._default)}update(){let e=Number(this.value),t=isFinite(e)?(e%24+24)%24:0;return t!==this._h&&(this._h=t,this._paint(t)),this._syncModified(),this}_paint(e){let t=mh(e),n=t.elev,[r,i]=Zm(e),a=e=>e.toFixed(2);this.stopZ.setAttribute(`stop-color`,r),this.stopH.setAttribute(`stop-color`,i),this.stopSea.setAttribute(`stop-color`,Ym(i,`#04121c`,.72)),this.sun.setAttribute(`transform`,`translate(${a(t.x)} ${a(t.y)})`),this.disc.setAttribute(`fill`,n<0?`#ffd2a0`:Ym(`#ffe2b4`,`#fff8ec`,Fm(n*2.2,0,1))),this.sunGlow.setAttribute(`opacity`,Fm((n+.12)/.25,.2,1).toFixed(3)),this.el.classList.toggle(`is-night`,n<-.02);let o=Fm((.08-n)/.3,0,1);this.stars.setAttribute(`opacity`,o.toFixed(3));let s=mh(e+12);this.moon.setAttribute(`transform`,`translate(${a(s.x)} ${a(s.y)})`),this.moon.setAttribute(`opacity`,(o*.95).toFixed(3));let c=n>-.25?(1-Math.min(1,Math.abs(n)/.6))**2:0;this.haze.setAttribute(`cx`,a(t.x)),this.haze.setAttribute(`opacity`,(c*.85).toFixed(3));let l=6+(1-Fm(n,0,1))*16;this.glint.setAttribute(`cx`,a(t.x)),this.glint.setAttribute(`cy`,a(ph.cy+l*.95)),this.glint.setAttribute(`rx`,a(2.5+(1-Fm(n,0,1))*3)),this.glint.setAttribute(`ry`,a(l)),this.glint.setAttribute(`opacity`,n>0?(.85*(1-n)**1.5).toFixed(3):`0`);let u=eh(e),d=$m(e);this.valueEl.textContent=u,this.phase.textContent=d,this.knob.style.left=`${e/24*100}%`,this.svg.setAttribute(`aria-valuenow`,e.toFixed(2)),this.svg.setAttribute(`aria-valuetext`,`${u}, ${d}`)}},yh=class e{constructor(e,t=null){this.ui=e,this.parent=t,this.children=[],this.body=null}_append(e){this.body.append(e)}_add(e){return this.children.push(e),e}addFolder(e,t){return this._add(new bh(this,e,t))}addSlider(e){return this._add(new ah(this,e))}addToggle(e){return this._add(new oh(this,e))}addSelect(e){return this._add(new ch(this,e))}addColor(e){return this._add(new lh(this,e))}addButton(e){return this._add(new uh(this,e))}addPresets(e){return this._add(new dh(this,e))}addTimeOfDay(e){return this._add(new vh(this,e))}addInfo(e){return this._add(new fh(this,e))}controls(){let t=[];for(let n of this.children)n instanceof e?t.push(...n.controls()):t.push(n);return t}refresh(){for(let e of this.controls())e.update();return this}reset(){for(let e of this.controls())e.reset();return this}},bh=class e extends yh{constructor(t,n,{icon:r,open:i=!0,tooltip:a}={}){super(t.ui,t),this.label=String(n??``),this.isOpen=!0,this.el=Q(`section`,`tw-folder`+(t instanceof e?` is-nested`:``));let o=zm(`tw-fb`);this.head=Q(`button`,`tw-folder-head`,{type:`button`,"aria-expanded":`true`,"aria-controls":o}),this.head.innerHTML=(r?Mm(r,`tw-folder-ico`):``)+`<span class="tw-folder-title">${Vm(this.label)}</span>`+Mm(`chevron-down`,`tw-folder-chev`),a&&(this.head.dataset.tip=a),this.wrap=Q(`div`,`tw-folder-wrap`,{id:o}),this.body=Q(`div`,`tw-folder-body`),this.wrap.append(this.body),this.el.append(this.head,this.wrap),t._append(this.el),this.head.addEventListener(`click`,()=>this.toggle()),this.setOpen(i)}setOpen(e){return this.isOpen=!!e,this.el.classList.toggle(`is-open`,this.isOpen),this.head.setAttribute(`aria-expanded`,String(this.isOpen)),this.wrap.inert=!this.isOpen,this.isOpen&&this.refresh(),this}open(){return this.setOpen(!0)}close(){return this.setOpen(!1)}toggle(){return this.setOpen(!this.isOpen)}setVisible(e){return this.el.hidden=!e,this}setLabel(e){return this.label=String(e),this.head.querySelector(`.tw-folder-title`).textContent=this.label,this}},xh=class extends yh{constructor(e,t,n,r){super(e,null),this.isTab=!0,this.isOpen=!0,this.id=t,this.label=String(n),this.iconName=r,this._scroll=0;let i=zm(`tw-page`),a=zm(`tw-tab`);this.page=Q(`div`,`tw-page`,{role:`tabpanel`,id:i,"aria-labelledby":a,hidden:!0}),this.body=this.page,this.btn=Q(`button`,`tw-tab`,{type:`button`,role:`tab`,id:a,"aria-selected":`false`,"aria-controls":i,tabindex:`-1`,"data-tip":this.label}),this.btn.innerHTML=Mm(r)+`<span class="tw-tab-label">${Vm(this.label)}</span>`,this.railBtn=Q(`button`,`tw-rail-btn`,{type:`button`,"aria-label":this.label,"data-tip":this.label,"data-tip-side":`left`}),this.railBtn.innerHTML=Mm(r),this.btn.addEventListener(`click`,()=>e.selectTab(t)),this.railBtn.addEventListener(`click`,()=>{e.selectTab(t),e.togglePanel(!0)})}get el(){return this.page}select(){return this.ui.selectTab(this.id),this}setVisible(e){if(this.btn.hidden=!e,this.railBtn.hidden=!e,!e&&this.ui.activeTab===this){let e=[...this.ui.tabs.values()].find(e=>e!==this&&!e.btn.hidden);e&&this.ui.selectTab(e.id)}return this}},Sh=new Set([`Space`,`Enter`,`NumpadEnter`,`ArrowUp`,`ArrowDown`,`ArrowLeft`,`ArrowRight`,`Home`,`End`,`PageUp`,`PageDown`,`Tab`]),Ch=class{constructor(e=document.body){this.container=e||document.body,this.tabs=new Map,this.activeTab=null,this._controls=new Set,this._panelOpen=!1,this._photo=!1,this._help=!1,this._start=!1,this._overUI=!1,this._drag=0,this._menu=null,this._menuAnchor=null,this._toasts=[],this._spark=[],this._sparkAcc=0,this._sparkT=0,this._statsT=0,this._lvl=`good`,this._lastAct=performance.now(),this._idle=!1,this._ac=new AbortController,this.onPhotoMode=null,this.onPanelInteract=null,this.onPanelToggle=null,this.onHelpToggle=null,this.onReplayGuide=null,this.releasePointerOnPanel=!0,document.getElementById(`fps`)?.remove(),this.root=Q(`div`,`tw-root`,{"data-panel":`closed`}),this._buildHUD(),this._buildPanel(),this._buildHelp(),this._buildStart(),this.tipEl=Q(`div`,`tw-tip`,{role:`tooltip`,"aria-hidden":`true`}),this.root.append(this.tipEl),this.container.append(this.root),this._bindGlobal(),this._timer=setInterval(()=>this._tick(),250)}_buildHUD(){let e=this.hud=Q(`div`,`tw-hud`),t=Q(`div`,`tw-tl`),n=this.statsEl=Q(`div`,`tw-stats tw-glass`,{"data-level":`good`,"aria-hidden":`true`});n.innerHTML=`
			<div class="tw-stats-main"><span class="tw-fps">--</span><span class="tw-fps-unit">fps</span></div>
			<canvas class="tw-spark"></canvas>
			<div class="tw-stats-sub">
				<span class="tw-kv"><span class="tw-k">frame</span><span class="tw-v tw-ms">--</span></span>
				<span class="tw-kv tw-kv-gpu" hidden><span class="tw-k">gpu</span><span class="tw-v tw-gpu">--</span></span>
			</div>`,this.fpsEl=n.querySelector(`.tw-fps`),this.msEl=n.querySelector(`.tw-ms`),this.gpuEl=n.querySelector(`.tw-gpu`),this.gpuKv=n.querySelector(`.tw-kv-gpu`),this.sparkEl=n.querySelector(`.tw-spark`);let r=Q(`div`,`tw-brand`);r.innerHTML=`${Pm()}<span class="tw-brand-name">TIDEWATER</span>`,this.modeEl=Q(`div`,`tw-mode is-empty`,{role:`status`}),this.modeIco=Q(`span`,`tw-mode-ico`),this.modeText=Q(`span`,`tw-mode-text`),this.modeEl.append(this.modeIco,this.modeText),r.append(this.modeEl),t.append(n,r),this.toastsEl=Q(`div`,`tw-toasts`,{"aria-live":`polite`}),this.promptEl=Q(`div`,`tw-prompt tw-glass`,{"aria-live":`polite`}),this.promptKey=Q(`kbd`,`tw-prompt-key`),this.promptText=Q(`span`,`tw-prompt-text`),this.promptEl.append(this.promptKey,this.promptText),this.boatEl=this._buildBoat(),this.depthEl=Q(`div`,`tw-depth tw-glass`,{"aria-hidden":`true`}),this.depthEl.innerHTML=`
			<canvas class="tw-depth-tape"></canvas>
			<span class="tw-depth-mark"></span>
			<div class="tw-depth-read">
				<div class="tw-depth-line"><span class="tw-depth-num">0.0</span><span class="tw-unit">m</span></div>
				<span class="tw-g-lab">Depth</span>
			</div>`,this.depthCanvas=this.depthEl.querySelector(`.tw-depth-tape`),this.depthNum=this.depthEl.querySelector(`.tw-depth-num`),e.append(t,this.toastsEl,this.promptEl,this.boatEl,this.depthEl),this.photoHint=Q(`div`,`tw-photo-hint`),this.photoHint.innerHTML=`<kbd>P</kbd><span>Exit photo mode</span>`,this.root.append(e,this.photoHint)}_buildBoat(){let e=Q(`div`,`tw-boat tw-glass`,{"aria-hidden":`true`}),t=(e,t,n)=>{let r=n*Math.PI/180;return[(e+t*Math.cos(r)).toFixed(2),(e+t*Math.sin(r)).toFixed(2)]},n=`M24.64 95.36A50 50 0 1 1 95.36 95.36`,r=``;for(let e=0;e<=10;e++){let n=e%5==0,[i,a]=t(60,n?37.5:40.5,135+27*e),[o,s]=t(60,44,135+27*e);r+=`<line class="${n?`maj`:``}" x1="${i}" y1="${a}" x2="${o}" y2="${s}"/>`}let i=``;for(let e=0;e<360;e+=10){let n=e%30==0,[r,a]=t(50,n?37:40,e-90),[o,s]=t(50,44,e-90);i+=`<line class="${n?`maj`:`min`}" x1="${r}" y1="${a}" x2="${o}" y2="${s}"/>`}for(let[e,n]of[[`N`,0],[`E`,90],[`S`,180],[`W`,270]]){let[r,a]=t(50,29,n-90);i+=`<text class="${e===`N`?`is-n`:``}" x="${r}" y="${a}" transform="rotate(${n} ${r} ${a})">${e}</text>`}let a=zm(`tw-rpm`);return e.innerHTML=`
			<div class="tw-thr">
				<div class="tw-thr-bar"><span class="tw-thr-pos"></span><span class="tw-thr-neg"></span><span class="tw-thr-zero"></span></div>
				<span class="tw-thr-val">0%</span>
			</div>
			<div class="tw-dial">
				<svg viewBox="0 0 120 120">
					<defs><linearGradient id="${a}" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="#3fc0d6"/><stop offset=".62" stop-color="#5fe3d4"/><stop offset="1" stop-color="#ffb86b"/></linearGradient></defs>
					<path class="tw-dial-bg" d="${n}"/>
					<path class="tw-dial-red" d="${n}" pathLength="100" stroke-dasharray="14 100" stroke-dashoffset="-86"/>
					<path class="tw-dial-val" d="${n}" pathLength="100" stroke-dasharray="0 100" stroke="url(#${a})"/>
					<g class="tw-dial-ticks">${r}</g>
					<circle class="tw-dial-head" r="3" cx="24.64" cy="95.36"/>
					<text class="tw-dial-rpm" x="60" y="105">rpm 0%</text>
				</svg>
				<div class="tw-dial-center"><span class="tw-speed">0.0</span><span class="tw-g-unit">knots</span></div>
			</div>
			<div class="tw-compass">
				<svg viewBox="0 0 100 100">
					<circle class="tw-compass-ring" cx="50" cy="50" r="47"/>
					<g class="tw-compass-card">${i}</g>
					<path class="tw-lubber" d="M45.5 1.5h9L50 8.5z"/>
				</svg>
				<div class="tw-hdg"><span class="tw-hdg-num">000°</span><span class="tw-hdg-card">N</span></div>
			</div>`,this.bThrPos=e.querySelector(`.tw-thr-pos`),this.bThrNeg=e.querySelector(`.tw-thr-neg`),this.bThrText=e.querySelector(`.tw-thr-val`),this.bArc=e.querySelector(`.tw-dial-val`),this.bHead=e.querySelector(`.tw-dial-head`),this.bRpmText=e.querySelector(`.tw-dial-rpm`),this.bSpeed=e.querySelector(`.tw-speed`),this.bCard=e.querySelector(`.tw-compass-card`),this.bHdgText=e.querySelector(`.tw-hdg-num`),this.bHdgCard=e.querySelector(`.tw-hdg-card`),e}_buildPanel(){let e=this.panel=Q(`aside`,`tw-panel tw-glass tw-interactive`,{"aria-label":`Settings`});e.inert=!0;let t=Q(`header`,`tw-panel-head`);t.append(Q(`div`,`tw-panel-title`,{text:`Settings`}));let n=Q(`div`,`tw-panel-actions`),r=(e,t,r)=>{let i=Q(`button`,`tw-icon-btn`,{type:`button`,"aria-label":t,"data-tip":t,html:Mm(e)});i.addEventListener(`click`,r),n.append(i)};r(`viewfinder`,`Photo mode (P)`,()=>this.setPhotoMode(!0)),r(`help`,`Controls (F1)`,()=>this.toggleHelp()),r(`chevrons-right`,`Collapse (H)`,()=>this.togglePanel(!1)),t.append(n),this.tabBar=Q(`div`,`tw-tabs`,{role:`tablist`,"aria-label":`Settings sections`}),this.tabBar.addEventListener(`keydown`,e=>{let t=e.key===`ArrowRight`?1:e.key===`ArrowLeft`?-1:0;if(!t)return;e.preventDefault(),e.stopPropagation();let n=[...this.tabs.values()].filter(e=>!e.btn.hidden),r=n[(n.indexOf(this.activeTab)+t+n.length)%n.length];r&&(this.selectTab(r.id),r.btn.focus())}),this.pages=Q(`div`,`tw-pages`);let i=Q(`footer`,`tw-panel-foot`);i.innerHTML=`<span><kbd>H</kbd>Hide</span><span><kbd>F1</kbd>Controls</span><span><kbd>P</kbd>Photo mode</span>`,e.append(t,this.tabBar,this.pages,i);let a=this.rail=Q(`nav`,`tw-rail tw-glass tw-interactive`,{"aria-label":`Settings`}),o=Q(`button`,`tw-rail-btn tw-rail-open`,{type:`button`,"aria-label":`Open settings`,"data-tip":`Settings (H)`,"data-tip-side":`left`,html:Mm(`sliders`)});o.addEventListener(`click`,()=>this.togglePanel(!0)),this.railTabs=Q(`div`,`tw-rail-tabs`);let s=Q(`button`,`tw-rail-btn`,{type:`button`,"aria-label":`Controls`,"data-tip":`Controls (F1)`,"data-tip-side":`left`,html:Mm(`help`)});s.addEventListener(`click`,()=>this.toggleHelp()),a.append(o,Q(`span`,`tw-rail-sep`),this.railTabs,Q(`span`,`tw-rail-sep`),s),this.root.append(a,e)}_buildHelp(){let e=(...e)=>e.map(e=>`<kbd>${e}</kbd>`).join(``),t=(e,t)=>`<div class="tw-help-row"><span class="tw-keys">${e}</span><span class="tw-help-text">${t}</span></div>`,n=`<kbd class="tw-kbd-ico" aria-label="Mouse">${Mm(`mouse`)}</kbd>`,r=this.helpEl=Q(`div`,`tw-help tw-interactive`,{role:`dialog`,"aria-modal":`true`,"aria-labelledby":`tw-help-title`,hidden:!0});r.innerHTML=`
			<div class="tw-help-card tw-glass">
				<header class="tw-help-head">
					<div>
						<h2 id="tw-help-title">Controls</h2>
						<p>Click the view to capture the mouse. Esc releases it.</p>
					</div>
					<button type="button" class="tw-icon-btn tw-help-close" aria-label="Close" data-tip="Close (F1)">${Mm(`close`)}</button>
				</header>
				<div class="tw-help-grid">
					<section>
						<h3>Move</h3>
						${t(`<span class="tw-wasd"><kbd>W</kbd><kbd>A</kbd><kbd>S</kbd><kbd>D</kbd></span>`,`Move`)}
						${t(n,`Look around<small>Click to capture</small>`)}
						${t(e(`Shift`),`Sprint, boat boost`)}
						${t(e(`Space`),`Jump, swim up`)}
						${t(e(`C`),`Crouch, dive`)}
					</section>
					<section>
						<h3>Interact</h3>
						${t(e(`E`),`Interact<small>Board, helm, step ashore, trade</small>`)}
						${t(e(`V`),`Boat camera<small>1st / 3rd person</small>`)}
						${t(e(`R`),`Fishing rod<small>Take out / put away</small>`)}
						${t(e(`LMB`),`Cast, strike, reel<small>Hold to wind up / reel</small>`)}
						${t(e(`RMB`),`Reel in an empty line`)}
						${t(e(`I`),`Cooler and fish log`)}
						${t(e(`F`),`Free camera`)}
						${t(e(`T`),`Pause time`)}
						${t(e(`L`),`Flashlight`)}
						${t(e(`M`),`Mute`)}
					</section>
					<section>
						<h3>Interface</h3>
						${t(e(`H`),`Settings panel`)}
						${t(e(`P`),`Photo mode<small>Hides all interface</small>`)}
						${t(e(`F1`)+e(`?`),`This sheet`)}
						${t(e(`Esc`),`Release the mouse`)}
					</section>
				</div>
				<div class="tw-help-guide">
					<span><b>How to play:</b> catch fish, sell them to Joe at the fish stand by the pier, and buy upgrades from Marta at the chandlery by the boathouse. Both are on the map (lower right).</span>
					<button type="button" class="gm-btn is-ghost tw-help-replay">Replay the guide</button>
				</div>
			</div>`,r.querySelector(`.tw-help-close`).addEventListener(`click`,()=>this.toggleHelp(!1)),r.querySelector(`.tw-help-replay`).addEventListener(`click`,()=>rh(this.onReplayGuide)),r.addEventListener(`click`,e=>{e.target===r&&this.toggleHelp(!1)}),this.root.append(r)}_buildStart(){let e=this.startEl=Q(`div`,`tw-start tw-interactive`,{hidden:!0});e.innerHTML=`
			<div class="tw-start-inner">
				${Pm(`tw-start-mark`)}
				<div class="tw-start-title">TIDEWATER</div>
				<button type="button" class="tw-start-cta"><span class="tw-start-pulse" aria-hidden="true"></span>${Mm(`mouse`)}<span>Click to explore</span></button>
				<div class="tw-start-keys">
					<span><span class="tw-wasd"><kbd>W</kbd><kbd>A</kbd><kbd>S</kbd><kbd>D</kbd></span>Move</span>
					<span><kbd class="tw-kbd-ico">${Mm(`mouse`)}</kbd>Look</span>
					<span><kbd>E</kbd>Interact</span>
					<span><kbd>H</kbd>Settings</span>
					<span><kbd>F1</kbd>All controls</span>
				</div>
			</div>`,this.root.append(e)}_bindGlobal(){let e=this._ac.signal;for(let e of[this.panel,this.rail,this.helpEl,this.startEl])this._isolate(e);let t=e=>{this._activity(),rh(this.onPanelInteract,e)};this.panel.addEventListener(`pointerdown`,t),this.rail.addEventListener(`pointerdown`,t);for(let e of[this.panel,this.rail,this.helpEl])e.addEventListener(`click`,e=>{if(e.detail===0)return;let t=e.target.closest?.(`button`);t&&!t.classList.contains(`tw-dd`)&&t.blur()});window.addEventListener(`keydown`,e=>{this._activity(),this._onKey(e)},{signal:e}),window.addEventListener(`wheel`,()=>this._activity(),{passive:!0,signal:e}),document.addEventListener(`pointermove`,e=>{let t=!!document.pointerLockElement;this._overUI=!t&&!!e.target?.closest?.(`.tw-interactive`),this._activity(),this._photo&&!t&&this._pokePhotoHint()},{passive:!0,signal:e}),document.addEventListener(`pointerdown`,e=>{let t=!!e.target?.closest?.(`.tw-interactive`);if(this._overUI=t&&!document.pointerLockElement,this._menu&&!this._menu.contains(e.target)&&!this._menuAnchor?.contains(e.target)&&this._closeMenu(),!t){let e=document.activeElement;e&&e!==document.body&&this.root.contains(e)&&e.blur()}this._hideTip()},{capture:!0,signal:e}),document.addEventListener(`pointerout`,e=>{e.relatedTarget||(this._overUI=!1)},{signal:e}),document.addEventListener(`pointerlockchange`,()=>{let e=!!document.pointerLockElement;if(this.root.classList.toggle(`is-locked`,e),e){this._overUI=!1,this._closeMenu(),this._hideTip();let e=document.activeElement;e&&this.root.contains(e)&&e.blur()}else this._activity()},{signal:e}),window.addEventListener(`resize`,()=>{this._closeMenu(),this._hideTip(),this._spark.length&&this._drawSpark()},{signal:e}),window.addEventListener(`blur`,()=>{this._overUI=!1,this._hideTip()},{signal:e}),this.pages.addEventListener(`scroll`,()=>{this._closeMenu(),this._hideTip()},{passive:!0}),this.root.addEventListener(`pointerover`,e=>this._tipOver(e)),this.root.addEventListener(`pointerout`,e=>this._tipOut(e))}_isolate(e){let t=e=>e.stopPropagation();for(let n of[`pointerdown`,`mousedown`,`click`,`dblclick`,`wheel`,`touchstart`])e.addEventListener(n,t,{passive:!0});e.addEventListener(`contextmenu`,e=>{e.stopPropagation(),Hm(e.target)||e.preventDefault()}),e.addEventListener(`keydown`,t=>{Sh.has(t.code)&&t.target!==e.ownerDocument.body&&t.stopPropagation()})}_onKey(e){if(!(Hm(e.target)||e.ctrlKey||e.metaKey||e.altKey)){if(e.code===`F1`||e.key===`?`){e.preventDefault(),e.repeat||(this._photo&&this.setPhotoMode(!1),this.toggleHelp());return}if(e.code===`Escape`){this._menu?this._closeMenu(!0):this._help&&this.toggleHelp(!1);return}e.repeat||this._start||(e.code===`KeyH`?(this._photo&&this.setPhotoMode(!1),this.togglePanel()):e.code===`KeyP`&&this.setPhotoMode(!this._photo))}}_tick(){if(this._panelOpen&&!this._photo)for(let e of this._controls)e._isShown()&&e.update();let e=performance.now()-this._lastAct>5e3;e!==this._idle&&(this._idle=e,this.root.classList.toggle(`is-idle`,e))}_activity(){this._lastAct=performance.now(),this._idle&&(this._idle=!1,this.root.classList.remove(`is-idle`))}_dragStart(){this._drag++,this.root.classList.add(`is-dragging`),this._hideTip()}_dragEnd(){this._drag=Math.max(0,this._drag-1),this._drag||this.root.classList.remove(`is-dragging`)}_tipOver(e){let t=e.target.closest?.(`[data-tip]`);t!==this._tipT&&(this._hideTip(),!(!t||this._drag||document.pointerLockElement)&&(this._tipT=t,this._tipTimer=setTimeout(()=>this._showTip(t),t.closest(`.tw-rail`)?220:520)))}_tipOut(e){this._tipT&&!this._tipT.contains(e.relatedTarget)&&this._hideTip()}_showTip(e){if(!e.isConnected||e.classList.contains(`tw-tab`)&&e.classList.contains(`is-active`))return;let t=this.tipEl;t.innerHTML=Vm(e.dataset.tip)+(e.dataset.tipHint?`<small>${Vm(e.dataset.tipHint)}</small>`:``),t.classList.add(`is-on`);let n=e.getBoundingClientRect(),r=t.getBoundingClientRect(),i=e.dataset.tipSide===`left`,a,o;i?(a=n.left-r.width-10,o=n.top+n.height/2-r.height/2):(a=n.left+n.width/2-r.width/2,o=n.top-r.height-8,o<8&&(o=n.bottom+8)),a=Fm(a,8,window.innerWidth-r.width-8),o=Fm(o,8,window.innerHeight-r.height-8),t.style.transform=`translate(${Math.round(a)}px, ${Math.round(o)}px)`}_hideTip(){clearTimeout(this._tipTimer),this._tipT=null,this.tipEl.classList.remove(`is-on`)}_openMenu(e,t,n,r){this._closeMenu();let i=Q(`div`,`tw-menu tw-interactive`,{role:`listbox`});t.forEach((e,t)=>{let a=Q(`button`,`tw-menu-item`,{type:`button`,role:`option`,"aria-selected":String(t===n),tabindex:`-1`});a.innerHTML=`<span>${Vm(e)}</span>${t===n?Mm(`check`):``}`,a.addEventListener(`click`,e=>{r(t),this._closeMenu(e.detail===0)}),i.append(a)}),i.addEventListener(`keydown`,e=>{let t=[...i.children],n=t.indexOf(document.activeElement);switch(e.key){case`ArrowDown`:n=Math.min(t.length-1,n+1);break;case`ArrowUp`:n=Math.max(0,n-1);break;case`Home`:n=0;break;case`End`:n=t.length-1;break;case`Escape`:case`Tab`:e.preventDefault(),e.stopPropagation(),this._closeMenu(!0);return;default:return}e.preventDefault(),e.stopPropagation(),t[n]?.focus()}),this._isolate(i),this.root.append(i);let a=e.getBoundingClientRect();i.style.minWidth=`${Math.round(a.width)}px`;let o=i.offsetHeight,s=i.offsetWidth,c=a.bottom+6;c+o>window.innerHeight-8&&(c=Math.max(8,a.top-6-o));let l=Fm(a.right-s,8,window.innerWidth-s-8);i.style.top=`${Math.round(c)}px`,i.style.left=`${Math.round(l)}px`,e.setAttribute(`aria-expanded`,`true`),this._menu=i,this._menuAnchor=e,i.offsetWidth,i.classList.add(`is-on`);let u=i.children[Math.max(0,n)];u&&(i.scrollTop=Math.max(0,u.offsetTop-(i.clientHeight-u.offsetHeight)/2),u.focus({preventScroll:!0}))}_closeMenu(e=!1){if(!this._menu)return;let t=this._menuAnchor;this._menu.remove(),this._menu=null,this._menuAnchor=null,t?.setAttribute(`aria-expanded`,`false`),e&&t?.focus({preventScroll:!0})}addTab(e,t,n){if(e=String(e),this.tabs.has(e))return this.tabs.get(e);let r=new xh(this,e,t??e,n??e);this.tabs.set(e,r),this.tabBar.append(r.btn),this.railTabs.append(r.railBtn),this.pages.append(r.page);let i=null;try{i=localStorage.getItem(`tidewater.ui.tab`)}catch{}return(!this.activeTab||i===e)&&this.selectTab(e,!1),r}getTab(e){return this.tabs.get(String(e))||null}selectTab(e,t=!0){let n=this.tabs.get(String(e));if(!n)return null;let r=this.activeTab;if(r===n)return n;r&&(r._scroll=this.pages.scrollTop,r.btn.setAttribute(`aria-selected`,`false`),r.btn.tabIndex=-1,r.btn.classList.remove(`is-active`),r.railBtn.classList.remove(`is-active`),r.page.hidden=!0),n.btn.setAttribute(`aria-selected`,`true`),n.btn.tabIndex=0,n.btn.classList.add(`is-active`),n.railBtn.classList.add(`is-active`),n.page.hidden=!1,this.activeTab=n,this.pages.scrollTop=n._scroll||0,n.refresh(),this._closeMenu(),this._hideTip();let i=this.tabBar,a=n.btn;if(requestAnimationFrame(()=>{a.offsetLeft<i.scrollLeft?i.scrollLeft=a.offsetLeft-4:a.offsetLeft+a.offsetWidth>i.scrollLeft+i.clientWidth&&(i.scrollLeft=a.offsetLeft+a.offsetWidth-i.clientWidth+4)}),t)try{localStorage.setItem(`tidewater.ui.tab`,n.id)}catch{}return n}refresh(){for(let e of this._controls)e.update();return this}resetAll(){for(let e of this._controls)e.reset();return this}togglePanel(e){let t=e===void 0?!this._panelOpen:!!e;if(t===this._panelOpen)return t;if(this._panelOpen=t,this.root.dataset.panel=t?`open`:`closed`,this.panel.inert=!t,this.rail.inert=t,this._overUI=!1,this._closeMenu(),this._hideTip(),t)this.activeTab?.refresh(),this.releasePointerOnPanel&&document.pointerLockElement&&document.exitPointerLock?.();else{let e=document.activeElement;e&&this.panel.contains(e)&&e.blur()}return this._activity(),rh(this.onPanelToggle,t),t}get panelOpen(){return this._panelOpen}setMode(e){if(e=e==null?``:String(e),e===this._mode)return;this._mode=e,this.modeEl.classList.toggle(`is-empty`,!e),this.modeText.textContent=e;let t=nh(e);t!==this._modeIc&&(this._modeIc=t,this.modeIco.innerHTML=Mm(t)),this.modeEl.classList.remove(`is-bump`),this.modeEl.offsetWidth,this.modeEl.classList.add(`is-bump`),this._activity()}setPrompt(e,t){let n=e!=null&&e!==``;if(n){let n=String(e),r=t==null?``:String(t);(n!==this._pKey||r!==this._pText)&&(this._pKey=n,this._pText=r,this.promptKey.textContent=n,this.promptKey.classList.toggle(`is-wide`,n.length>1),this.promptText.textContent=r,this.promptEl.classList.remove(`is-bump`),this.promptEl.offsetWidth,this.promptEl.classList.add(`is-bump`))}n!==!!this._pOn&&(this._pOn=n,this.promptEl.classList.toggle(`is-on`,n),n&&this._activity())}setBoatGauges(e={}){let t=!!e.visible;if(t!==!!this._boatOn&&(this._boatOn=t,this.boatEl.classList.toggle(`is-on`,t)),!t)return;let n=Math.abs(Number(e.speedKnots)||0).toFixed(1);n!==this._bSpd&&(this._bSpd=n,this.bSpeed.textContent=n);let r=Fm(Number(e.rpm)||0,0,1),i=Math.round(r*1e3);if(i!==this._bRpm){this._bRpm=i,this.bArc.setAttribute(`stroke-dasharray`,`${(r*100).toFixed(2)} 100`);let e=(135+270*r)*Math.PI/180;this.bHead.setAttribute(`cx`,(60+50*Math.cos(e)).toFixed(2)),this.bHead.setAttribute(`cy`,(60+50*Math.sin(e)).toFixed(2)),this.boatEl.classList.toggle(`is-redline`,r>.86),this.bRpmText.textContent=`rpm ${Math.round(r*100)}%`}let a=Fm(Number(e.throttle)||0,-1,1),o=Math.round(a*100);o!==this._bThr&&(this._bThr=o,this.bThrPos.style.transform=`scaleY(${Math.max(0,a).toFixed(3)})`,this.bThrNeg.style.transform=`scaleY(${Math.max(0,-a).toFixed(3)})`,this.bThrText.textContent=o===0?`0%`:`${o>0?`+`:`−`}${Math.abs(o)}%`,this.boatEl.classList.toggle(`is-reverse`,o<0));let s=((Number(e.heading)||0)%360+360)%360,c=Math.round(s*10);c!==this._bHdg&&(this._bHdg=c,this.bCard.setAttribute(`transform`,`rotate(${(-s).toFixed(1)} 50 50)`),this.bHdgText.textContent=`${String(Math.round(s)%360).padStart(3,`0`)}°`,this.bHdgCard.textContent=th[Math.round(s/45)%8])}setDepth(e={}){let t=!!e.visible;if(t!==!!this._depthOn&&(this._depthOn=t,this.depthEl.classList.toggle(`is-on`,t),this._depthDrawn=null),!t)return;let n=Math.max(0,Number(e.meters)||0),r=n.toFixed(1);r!==this._depthTxt&&(this._depthTxt=r,this.depthNum.textContent=r),(this._depthDrawn==null||Math.abs(n-this._depthDrawn)>.004)&&(this._depthDrawn=n,this._drawDepth(n))}_ctx2d(e){let t=e.clientWidth,n=e.clientHeight;if(!t||!n)return null;let r=Math.min(2,window.devicePixelRatio||1),i=Math.round(t*r),a=Math.round(n*r);(e.width!==i||e.height!==a)&&(e.width=i,e.height=a);let o=e.getContext(`2d`);return o.setTransform(r,0,0,r,0,0),o.clearRect(0,0,t,n),{g:o,w:t,h:n}}_drawDepth(e){let t=this._ctx2d(this.depthCanvas);if(!t)return;let{g:n,w:r,h:i}=t,a=i/14,o=i/2,s=(e,t=1.6)=>(1-Math.min(1,Math.abs(e-o)/o))**t;n.font=`500 ${Math.max(8,i/21).toFixed(1)}px "JetBrains Mono", ui-monospace, monospace`,n.textAlign=`right`,n.textBaseline=`middle`,n.lineWidth=1;let c=Math.max(0,Math.floor(e-7)),l=Math.ceil(e+7);for(let t=c;t<=l;t+=.5){let i=Math.round(o+(t-e)*a)+.5,c=s(i);if(c<=.01)continue;let l=t%1==0,u=t%5==0,d=u?r*.42:l?r*.22:r*.11;n.strokeStyle=`rgba(190, 238, 244, ${(u?.9:l?.5:.28)*c})`,n.beginPath(),n.moveTo(r-d,i),n.lineTo(r,i),n.stroke(),u&&(n.fillStyle=`rgba(222, 246, 250, ${.85*c})`,n.fillText(String(t),r-d-4,i))}let u=o-e*a;if(u>=-4){n.strokeStyle=`rgba(95, 227, 212, ${.95*s(u,1.2)})`,n.lineWidth=1.5,n.beginPath();for(let e=0;e<=r;e+=2){let t=u+Math.sin(e*.45)*1.4;e?n.lineTo(e,t):n.moveTo(e,t)}n.stroke()}}setStats(e={}){let t=e=>typeof e==`number`&&isFinite(e)?e:NaN,n=t(e.fps),r=t(e.frameMs),i=t(e.gpuMs);!(n>0)&&r>0&&(n=1e3/r),!(r>0)&&n>0&&(r=1e3/n);let a=performance.now();if(r>0&&(this._sparkAcc=Math.max(this._sparkAcc,r)),a-this._sparkT>=100&&this._sparkAcc>0&&(this._sparkT=a,this._spark.push(this._sparkAcc),this._spark.length>60&&this._spark.shift(),this._sparkAcc=0,this._drawSpark()),a-this._statsT<250)return;if(this._statsT=a,n>0){let e=String(Math.round(n));e!==this._fpsTxt&&(this._fpsTxt=e,this.fpsEl.textContent=e);let t=n>=50?`good`:n>=30?`warn`:`bad`;t!==this._lvl&&(this._lvl=t,this.statsEl.dataset.level=t)}r>0&&(this.msEl.textContent=`${r.toFixed(1)} ms`);let o=i>=0;this.gpuKv.hidden===o&&(this.gpuKv.hidden=!o),o&&(this.gpuEl.textContent=`${i.toFixed(1)} ms`)}_drawSpark(){let e=this._ctx2d(this.sparkEl);if(!e)return;let{g:t,w:n,h:r}=e,i=this._spark,a=Math.max(34,...i)*1.1,o=e=>r-1.5-Math.min(e,a)/a*(r-4),s=e=>n-2-(i.length-1-e)*((n-4)/59);t.strokeStyle=`rgba(200, 230, 240, 0.18)`,t.lineWidth=1,t.setLineDash([2,3]),t.beginPath();let c=Math.round(o(1e3/60))+.5;if(t.moveTo(0,c),t.lineTo(n,c),t.stroke(),t.setLineDash([]),i.length<2)return;let l=this._lvl===`bad`?`255, 122, 133`:this._lvl===`warn`?`255, 184, 107`:`95, 227, 212`,u=()=>{t.beginPath(),i.forEach((e,n)=>n?t.lineTo(s(n),o(e)):t.moveTo(s(n),o(e)))},d=t.createLinearGradient(0,0,0,r);d.addColorStop(0,`rgba(${l}, 0.32)`),d.addColorStop(1,`rgba(${l}, 0)`),u(),t.lineTo(s(i.length-1),r),t.lineTo(s(0),r),t.closePath(),t.fillStyle=d,t.fill(),u(),t.strokeStyle=`rgba(${l}, 0.95)`,t.lineWidth=1.25,t.lineJoin=`round`,t.stroke();let f=i.length-1;t.fillStyle=`rgb(${l})`,t.beginPath(),t.arc(s(f),o(i[f]),1.8,0,Lm),t.fill()}toast(e,t=2500){if(e=String(e??``),!e)return()=>{};let n=this._toasts.find(t=>t.text===e&&!t.leaving);if(n)return clearTimeout(n.timer),n.timer=setTimeout(n.dismiss,t),n.bar.style.setProperty(`--life`,`${t}ms`),n.bar.style.animation=`none`,n.bar.offsetWidth,n.bar.style.animation=``,n.el.classList.remove(`is-bump`),n.el.offsetWidth,n.el.classList.add(`is-bump`),n.dismiss;let r=Q(`div`,`tw-toast tw-glass`,{role:`status`}),i=Q(`span`,`tw-toast-bar`);i.style.setProperty(`--life`,`${t}ms`),r.append(Q(`span`,`tw-toast-dot`),Q(`span`,`tw-toast-text`,{text:e}),i),this.toastsEl.append(r),r.offsetWidth,r.classList.add(`is-in`);let a={text:e,el:r,bar:i,timer:0,leaving:!1};for(a.dismiss=()=>{if(a.leaving)return;a.leaving=!0,clearTimeout(a.timer),r.style.setProperty(`--h`,`${r.offsetHeight}px`),r.classList.remove(`is-in`),r.classList.add(`is-out`);let e=this._toasts.indexOf(a);e>=0&&this._toasts.splice(e,1),setTimeout(()=>r.remove(),360)},a.timer=setTimeout(a.dismiss,t),this._toasts.push(a);this._toasts.length>4;)this._toasts[0].dismiss();return a.dismiss}toggleHelp(e){let t=e===void 0?!this._help:!!e;if(t===this._help)return t;this._help=t;let n=this.helpEl;if(clearTimeout(this._helpT),t)this._closeMenu(),this._hideTip(),n.hidden=!1,n.offsetWidth,n.classList.add(`is-on`),document.pointerLockElement||n.querySelector(`.tw-help-close`)?.focus({preventScroll:!0});else{n.classList.remove(`is-on`);let e=document.activeElement;e&&n.contains(e)&&e.blur(),this._helpT=setTimeout(()=>{this._help||(n.hidden=!0)},280)}return this._activity(),rh(this.onHelpToggle,t),t}get helpOpen(){return this._help}setPhotoMode(e){if(e=!!e,e!==this._photo){if(this._photo=e,this.root.classList.toggle(`is-photo`,e),e){this.toggleHelp(!1),this._closeMenu(),this._hideTip();let e=document.activeElement;e&&this.root.contains(e)&&e.blur(),this._pokePhotoHint()}else clearTimeout(this._photoT),this.photoHint.classList.remove(`is-on`),this._activity();this._overUI=!1,rh(this.onPhotoMode,e)}}get photoMode(){return this._photo}_pokePhotoHint(){this._photo&&(this.photoHint.classList.add(`is-on`),clearTimeout(this._photoT),this._photoT=setTimeout(()=>this.photoHint.classList.remove(`is-on`),2400))}showStartOverlay(e){if(this._startPromise)return this._startPromise;let t=this.startEl;return this._start=!0,this.root.classList.add(`is-starting`),t.hidden=!1,t.offsetWidth,t.classList.add(`is-on`),this._startPromise=new Promise(n=>{let r=i=>{if(i.type===`keydown`){if(i.key!==`Enter`&&i.code!==`Space`)return;i.preventDefault(),i.stopPropagation()}t.removeEventListener(`click`,r),window.removeEventListener(`keydown`,r,!0),this._start=!1,this._startPromise=null,this.root.classList.remove(`is-starting`),t.classList.remove(`is-on`);let a=document.activeElement;a&&t.contains(a)&&a.blur(),setTimeout(()=>{this._start||(t.hidden=!0)},700),this._overUI=!1,this._activity(),rh(e),n()};t.addEventListener(`click`,r),window.addEventListener(`keydown`,r,!0)}),this._startPromise}setLoading(e,t,n){let r=document.getElementById(`loader`);if(!r)return;let i=this._loaderState();if(typeof e==`number`&&isFinite(e)){let t=Fm(e,0,1);i.from=Math.max(t,i.shown),i.until=Fm(typeof n==`number`?n:t+.05,i.from,t>=1?1:.995),i.stageT=performance.now(),i.tau=typeof n==`number`?4e4:6e3,i.detail=-1,t>=1&&(i.shown=1)}t!=null&&(i.status=String(t),i.statusEl&&(i.statusEl.textContent=i.status),r.classList.toggle(`is-compiling`,/shader/i.test(i.status))),this._loaderPaint()}setLoadingDetail(e,t){let n=this._loaderState();t>0&&(n.detail=Fm(e/t,0,1),n.statusEl&&(n.statusEl.textContent=`${n.status.replace(/…$/,``)} · ${e} / ${t}`),this._loaderPaint())}setLoadingError(e){let t=document.getElementById(`loader`);if(!t)return;let n=this._loaderState();t.classList.add(`tw-error`),t.classList.remove(`is-compiling`),n.status=String(e),n.statusEl&&(n.statusEl.textContent=n.status),n.stopped=!0}_loaderState(){if(this._ld)return this._ld;let e=document.getElementById(`loader`),t=t=>e&&e.querySelector(t),n=this._ld={from:0,until:.05,shown:0,stageT:performance.now(),tau:6e3,detail:-1,status:``,t0:performance.now(),stopped:!1,fill:t(`.loader-fill`),pct:t(`.loader-pct`),time:t(`.loader-time`),statusEl:t(`.loader-status`)},r=()=>{n.stopped||(this._loaderPaint(),n.raf=requestAnimationFrame(r))};return n.raf=requestAnimationFrame(r),n}_loaderPaint(){let e=this._ld;if(!e)return;let t=performance.now(),n=e.detail>=0?e.from+(e.until-e.from)*e.detail:e.from+(e.until-e.from)*(1-Math.exp(-(t-e.stageT)/e.tau)),r=Math.min(.1,(t-(e.lastT||t))/1e3);if(e.lastT=t,e.shown+=(Math.max(n,e.shown)-e.shown)*(r>0?1-Math.exp(-r*9):0),e.fill&&(e.fill.style.transform=`scaleX(${Math.max(.02,e.shown).toFixed(4)})`),e.pct&&(e.pct.textContent=Math.floor(e.shown*100)+`%`),e.time){let n=Math.floor((t-e.t0)/1e3);e.time.textContent=Math.floor(n/60)+`:`+String(n%60).padStart(2,`0`)}}hideLoader(){let e=document.getElementById(`loader`);return e?this._loaderGone?this._loaderGone:(this.setLoading(1,`Ready`),e.classList.remove(`is-compiling`),e.classList.add(`tw-hidden`),this._loaderGone=new Promise(t=>setTimeout(()=>{this._ld&&(this._ld.stopped=!0,cancelAnimationFrame(this._ld.raf)),e.style.display=`none`,t()},920)),this._loaderGone):Promise.resolve()}get isPointerOverUI(){return this._drag>0||this._start||this._help?!0:!document.pointerLockElement&&this._overUI}dispose(){clearInterval(this._timer),this._ac.abort();for(let e of this._toasts)clearTimeout(e.timer);this._closeMenu(),this.root.remove(),this._controls.clear(),this.tabs.clear()}static demo(e){let t={windSpeed:8,windDir:210,choppiness:1.1,swell:.35,fetch:240,deepColor:`#04283a`,scatter:(e=>({r:0,g:0,b:0,setHex(e){return this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,this},getHexString(){return[this.r,this.g,this.b].map(e=>Math.round(e*255).toString(16).padStart(2,`0`)).join(``)}}).setHex(e))(3122075),turbidity:.18,clarity:22,foam:!0,foamAmount:.45,foamDecay:.92,whitecaps:.4,shoreFoam:!0,shoreBreak:1.2,wetSand:.7,sand:`#d9c29a`,caustics:.8,causticScale:1.4,time:17.4,timeScale:60,advance:!1,clouds:.35,fog:.0012,exposure:0,camMode:`third`,fov:62,lens:`standard`,sensitivity:1,smoothing:.18,invertY:!1,bloom:!0,bloomStrength:.55,godRays:!0,grade:`filmic`,vignette:.25,grain:.1,dof:!1,focus:12,lensDirt:!1,quality:`high`,renderScale:1,fftSize:256,shadows:!0,shadowRes:2048},n={fps:60,frameMs:16.7,gpuMs:7.4},r={Calm:{windSpeed:2.5,choppiness:.6,swell:.12,foamAmount:.08,whitecaps:0},Breezy:{windSpeed:8,choppiness:1.1,swell:.35,foamAmount:.45,whitecaps:.4},Choppy:{windSpeed:14,choppiness:1.5,swell:.55,foamAmount:.7,whitecaps:.75},Storm:{windSpeed:26,choppiness:1.9,swell:.9,foamAmount:1,whitecaps:1}},i=e=>t=>console.debug(`[UI demo] ${e}`,t),a=e.addTab(`ocean`,`Ocean`,`ocean`),o=a.addFolder(`Sea state`,{icon:`wind`});o.addPresets({label:`Conditions`,active:`Breezy`,presets:Object.keys(r).map(e=>({label:e,icon:e.toLowerCase(),apply:()=>Object.assign(t,r[e])}))}),o.addSlider({label:`Wind speed`,object:t,key:`windSpeed`,min:0,max:30,step:.1,unit:`m/s`,tooltip:`Wind 10 m above the sea. Drives wave height and whitecaps.`,onChange:i(`windSpeed`)}),o.addSlider({label:`Wind direction`,object:t,key:`windDir`,min:0,max:360,step:1,unit:`°`}),o.addSlider({label:`Choppiness`,object:t,key:`choppiness`,min:0,max:2,step:.01}),o.addSlider({label:`Swell`,object:t,key:`swell`,min:0,max:1,step:.01}),o.addSlider({label:`Fetch`,object:t,key:`fetch`,min:1,max:2e3,log:!0,unit:`km`,tooltip:`Distance the wind has blown over open water.`});let s=a.addFolder(`Water`,{icon:`droplet`});s.addColor({label:`Deep color`,object:t,key:`deepColor`,onChange:i(`deepColor`)}),s.addColor({label:`Scattering`,object:t,key:`scatter`}),s.addSlider({label:`Turbidity`,object:t,key:`turbidity`,min:0,max:1,step:.01}),s.addSlider({label:`Visibility`,object:t,key:`clarity`,min:1,max:60,step:.5,unit:`m`});let c=a.addFolder(`Foam`,{icon:`foam`,open:!1}),l=[];c.addToggle({label:`Foam`,object:t,key:`foam`,onChange:e=>l.forEach(t=>t.setEnabled(e))}),l.push(c.addSlider({label:`Coverage`,object:t,key:`foamAmount`,min:0,max:1,step:.01})),l.push(c.addSlider({label:`Persistence`,object:t,key:`foamDecay`,min:.5,max:.999,step:.001}));let u=c.addFolder(`Whitecaps`,{open:!1});l.push(u.addSlider({label:`Amount`,object:t,key:`whitecaps`,min:0,max:1,step:.01}));let d=e.addTab(`shore`,`Shore`,`shore`),f=d.addFolder(`Surf`,{icon:`wave`});f.addToggle({label:`Shore foam`,object:t,key:`shoreFoam`}),f.addSlider({label:`Breaking waves`,object:t,key:`shoreBreak`,min:0,max:2,step:.05});let p=d.addFolder(`Beach`,{icon:`palm`});p.addColor({label:`Sand`,object:t,key:`sand`}),p.addSlider({label:`Wet sand`,object:t,key:`wetSand`,min:0,max:1,step:.01});let m=d.addFolder(`Caustics`,{icon:`sun`,open:!1});m.addSlider({label:`Intensity`,object:t,key:`caustics`,min:0,max:2,step:.01}),m.addSlider({label:`Scale`,object:t,key:`causticScale`,min:.25,max:4,log:!0});let h=e.addTab(`sky`,`Sky`,`sky`),g=h.addFolder(`Sun`,{icon:`clock`});g.addTimeOfDay({object:t,key:`time`,onChange:i(`time`)});let _=null;g.addToggle({label:`Advance time`,object:t,key:`advance`,onChange:e=>_.setVisible(e)}),_=g.addSlider({label:`Time scale`,object:t,key:`timeScale`,min:1,max:3600,log:!0,unit:`×`}).setVisible(!1);let v=h.addFolder(`Atmosphere`,{icon:`cloud`});v.addSlider({label:`Cloud cover`,object:t,key:`clouds`,min:0,max:1,step:.01,format:e=>`${Math.round(e*100)}%`}),v.addSlider({label:`Fog density`,object:t,key:`fog`,min:1e-4,max:.02,log:!0}),v.addSlider({label:`Exposure`,object:t,key:`exposure`,min:-3,max:3,step:.1,unit:`EV`});let y=e.addTab(`camera`,`Camera`,`camera`),b=y.addFolder(`View`,{icon:`camera`});b.addSelect({label:`Boat camera`,object:t,key:`camMode`,options:[{label:`1st person`,value:`first`},{label:`3rd person`,value:`third`},{label:`Free`,value:`free`}]}),b.addSlider({label:`Field of view`,object:t,key:`fov`,min:30,max:110,step:1,unit:`°`}),b.addSelect({label:`Lens`,object:t,key:`lens`,options:{"Ultra wide 14 mm":`uw`,"Wide 24 mm":`wide`,"Standard 35 mm":`standard`,"Portrait 85 mm":`portrait`,"Telephoto 200 mm":`tele`}});let x=y.addFolder(`Mouse`,{icon:`mouse`});x.addSlider({label:`Sensitivity`,object:t,key:`sensitivity`,min:.1,max:4,log:!0,unit:`×`}),x.addSlider({label:`Smoothing`,object:t,key:`smoothing`,min:0,max:.5,step:.01,unit:`s`}),x.addToggle({label:`Invert vertical look`,object:t,key:`invertY`});let S=e.addTab(`effects`,`Effects`,`effects`),C=S.addFolder(`Post-processing`,{icon:`sparkles`});C.addToggle({label:`Bloom`,object:t,key:`bloom`}),C.addSlider({label:`Bloom strength`,object:t,key:`bloomStrength`,min:0,max:2,step:.01}),C.addToggle({label:`Sun shafts`,object:t,key:`godRays`}),C.addSelect({label:`Color grade`,object:t,key:`grade`,options:{Neutral:`neutral`,Filmic:`filmic`,"Golden hour":`golden`,Overcast:`overcast`,Tropical:`tropical`,Noir:`noir`}}),C.addSlider({label:`Vignette`,object:t,key:`vignette`,min:0,max:1,step:.01}),C.addSlider({label:`Film grain`,object:t,key:`grain`,min:0,max:.5,step:.01});let w=S.addFolder(`Lens`,{icon:`viewfinder`,open:!1});w.addToggle({label:`Depth of field`,object:t,key:`dof`}),w.addSlider({label:`Focus distance`,object:t,key:`focus`,min:.5,max:500,log:!0,unit:`m`}),w.addToggle({label:`Lens dirt`,object:t,key:`lensDirt`});let T=e.addTab(`performance`,`Performance`,`performance`),E=T.addFolder(`Live`,{icon:`gauge`});E.addInfo({label:`Frame rate`,get:()=>`${n.fps.toFixed(0)} fps`}),E.addInfo({label:`Frame time`,get:()=>`${n.frameMs.toFixed(2)} ms`}),E.addInfo({label:`GPU time`,get:()=>`${n.gpuMs.toFixed(2)} ms`}),E.addInfo({label:`Significant wave height`,get:()=>`${(.0246*t.windSpeed*t.windSpeed).toFixed(2)} m`}),E.addInfo({label:`Render size`,get:()=>`${Math.round(window.innerWidth*t.renderScale)} × ${Math.round(window.innerHeight*t.renderScale)}`});let D=T.addFolder(`Quality`,{icon:`layers`});D.addSelect({label:`Preset`,object:t,key:`quality`,options:{Low:`low`,Medium:`medium`,High:`high`,Ultra:`ultra`}}),D.addSlider({label:`Render scale`,object:t,key:`renderScale`,min:.5,max:2,step:.05,format:e=>`${Math.round(e*100)}%`}),D.addSelect({label:`Wave resolution`,object:t,key:`fftSize`,options:[64,128,256,512,1024]});let O=null;D.addToggle({label:`Shadows`,object:t,key:`shadows`,onChange:e=>O.setEnabled(e)}),O=D.addSelect({label:`Shadow map`,object:t,key:`shadowRes`,options:[1024,2048,4096]}),D.addButton({label:`Apply recommended`,icon:`check`,variant:`primary`,onClick:()=>{Object.assign(t,{quality:`high`,renderScale:1,fftSize:256,shadows:!0,shadowRes:2048}),O.setEnabled(!0),e.refresh(),e.toast(`Recommended settings applied`)}}),D.addButton({label:`Log settings to console`,icon:`info`,onClick:()=>console.table(t)}),D.addButton({label:`Reset all settings`,icon:`reset`,variant:`ghost`,onClick:()=>{e.resetAll(),e.toast(`All settings reset`)}});let k=[[`Boat · 3rd person`,`E`,`Leave boat`],[`Boat · 1st person`,`V`,`Third-person camera`],[`Walking`,`E`,`Board boat`],[`Swimming`,`Space`,`Swim up`],[`Diving`,null,null],[`Free camera`,`F`,`Leave free camera`]],A=0,ee=8,j=0;e.setMode(k[0][0]),e.setPrompt(k[0][1],k[0][2]);let te=performance.now(),ne=t=>{let r=Math.max(0,(t-te)/1e3);r>=ee&&(A=(A+1)%k.length,ee=r+8,e.setMode(k[A][0]),e.setPrompt(k[A][1],k[A][2])),n.fps=60-Math.abs(Math.sin(r*.7))*4-(Math.random()<.015?22:0),n.frameMs=1e3/n.fps,n.gpuMs=n.frameMs*(.55+Math.sin(r*.3)*.05),e.setStats(n);let i=k[A][0].startsWith(`Boat`),a=Fm(Math.sin(r*.35)*.65+.35,-1,1);e.setBoatGauges({visible:i,speedKnots:Math.max(0,a)*26,rpm:Fm(.1+Math.abs(a)*.9,0,1),throttle:a,heading:(200+r*9)%360}),e.setDepth({visible:k[A][0]===`Diving`,meters:7+Math.sin(r*.45)*5}),j=requestAnimationFrame(ne)};return j=requestAnimationFrame(ne),e.togglePanel(!0),e.toast(`UI demo: every control is filled with sample data`),setTimeout(()=>e.toast(`Press H to hide the panel, F1 for controls`,4e3),1200),()=>{cancelAnimationFrame(j),e.setBoatGauges({visible:!1}),e.setDepth({visible:!1}),e.setPrompt(null)}}},wh=`rocha-container-measurements-2`,Th=-.16,Eh=`http://www.w3.org/2000/svg`,Dh=(e,t,n)=>Math.max(t,Math.min(n,e)),Oh=e=>Th+(e.dimensions.externalHeight??2.8000000000000003);function kh(e,t,n=[0,0,0]){let r=Math.cos(e.yaw),i=Math.sin(e.yaw),a=t.x-e.position[0],o=t.z-e.position[1];return n[0]=r*a-i*o,n[1]=t.y-e.floorY,n[2]=i*a+r*o,n}function Ah(e,t){return Math.hypot(Math.max(0,Math.abs(t[0])-e.dimensions.length/2),Math.max(0,Th-t[1],t[1]-Oh(e)),Math.max(0,Math.abs(t[2])-e.dimensions.width/2))}function jh(e,t){return Math.abs(t[0])<e.dimensions.length/2&&Math.abs(t[2])<e.dimensions.width/2&&t[1]>-.16&&t[1]<Oh(e)}function Mh(e,t){return e?t*e<-1?-e:e:t<0?-1:1}function Nh(e){return Dh((45-e)/10,0,1)}function Ph(e,t,n,r=!1){let i=r?1:Math.max(0,n)/.2;return e+Dh(t-e,-i,i)}function Fh(e,t,n,r){let i=Math.cos(e.yaw),a=Math.sin(e.yaw);return[e.position[0]+i*t+a*r,e.floorY+n,e.position[1]-a*t+i*r]}function Ih(e){let t=e.dimensions.length/2,n=e.dimensions.width/2,r=Oh(e),i=[];for(let a of[-1,1]){i.push({kind:`length`,sideX:0,sideZ:a,label:e.dimensions.length.toFixed(2)+` m`,points:[Fh(e,-t,Th,a*n),Fh(e,t,Th,a*n),Fh(e,-t,Th,a*n),Fh(e,t,Th,a*n)]}),i.push({kind:`width`,sideX:a,sideZ:0,label:e.dimensions.width.toFixed(2)+` m`,points:[Fh(e,a*t,Th,-n),Fh(e,a*t,Th,n),Fh(e,a*t,Th,-n),Fh(e,a*t,Th,n)]});for(let o of[-1,1])i.push({kind:`height`,sideX:a,sideZ:o,label:(r-Th).toFixed(2)+` m`,points:[Fh(e,a*t,Th,o*n),Fh(e,a*t,r,e.variant===`large`?0:-n),Fh(e,a*t,Th,o*n),Fh(e,a*t,r,o*n)]})}return i}function Lh(e,t=new Float64Array(16)){let n=e.projectionMatrix.elements,r=e.matrixWorldInverse.elements;for(let e=0;e<4;e++)for(let i=0;i<4;i++)t[e*4+i]=n[i]*r[e*4]+n[4+i]*r[e*4+1]+n[8+i]*r[e*4+2]+n[12+i]*r[e*4+3];return t}function Rh(e,t,n,r,i=[0,0]){let a=t[0]*e[0]+t[4]*e[1]+t[8]*e[2]+t[12],o=t[1]*e[0]+t[5]*e[1]+t[9]*e[2]+t[13],s=t[2]*e[0]+t[6]*e[1]+t[10]*e[2]+t[14],c=t[3]*e[0]+t[7]*e[1]+t[11]*e[2]+t[15];return c>1e-8&&s>=0&&s<=c&&Math.abs(a)<=c&&Math.abs(o)<=c&&(i[0]=(a/c+1)*n/2,i[1]=(1-o/c)*r/2,Number.isFinite(i[0])&&Number.isFinite(i[1]))}function zh(e,t,n=6){return e[0]<t[2]+n&&e[2]>t[0]-n&&e[1]<t[3]+n&&e[3]>t[1]-n}function Bh(e,t,n){let r=0,i=1;for(let a=0;a<2;a++){let o=t[a]-e[a];if(Math.abs(o)<1e-8){if(e[a]<n[a]||e[a]>n[a+2])return!1;continue}let s=(n[a]-e[a])/o,c=(n[a+2]-e[a])/o;if(s>c){let e=s;s=c,c=e}if(r=Math.max(r,s),i=Math.min(i,c),r>i)return!1}return!0}var Vh=new WeakMap;function Hh(e,t={}){let n=document.createElementNS(Eh,e);Vh.set(n,{...t});for(let e in t)n.setAttribute(e,t[e]);return n}function Uh(e,t,n){let r=Vh.get(e);r[t]!==n&&(e.setAttribute(t,n),r[t]=n)}var $=e=>e.toFixed(2);function Wh(e,t,n){let r=t[0]-e[0],i=t[1]-e[1],a=Math.hypot(r,i)||1;return`M${$(e[0])},${$(e[1])}Q${$((e[0]+t[0])/2-i/a*n)},${$((e[1]+t[1])/2+r/a*n)} ${$(t[0])},${$(t[1])}`}function Gh(e,t,n,r){let i=e[0]+t*r*9,a=e[1]+n*r*9;return`M${$(i-n*3.4)},${$(a+t*3.4)}L${$(e[0])},${$(e[1])}L${$(i+n*3.8)},${$(a-t*3.8)}`}function Kh(e,t,n,r=[0,0],i=[0,0],a=8){let o=t[0]-e[0],s=t[1]-e[1],c=Math.hypot(o,s);if(c<1e-8)return!1;let l=-s/c,u=o/c;return l*((e[0]+t[0])/2-n[0])+u*((e[1]+t[1])/2-n[1])<0&&(l=-l,u=-u),r[0]=e[0]+l*a,r[1]=e[1]+u*a,i[0]=t[0]+l*a,i[1]=t[1]+u*a,!0}function qh(e,t){return Oh(e)-.01*(e.variant===`large`?Math.abs(t):t+e.dimensions.width/2)}function Jh(e){let t=e.dimensions.length/2,n=e.dimensions.width/2,r=[];for(let i of[-1,1])for(let a of[-1,1])r.push(Fh(e,i*t,Th,a*n));for(let i of[-1,1])for(let a of[-1,1])r.push(Fh(e,i*t,qh(e,a*n),a*n));if(e.variant===`large`)for(let n of[-1,1])r.push(Fh(e,n*t,Oh(e),0));return r}function Yh(e){let t=e.slice().sort((e,t)=>e[0]-t[0]||e[1]-t[1]),n=(e,t,n)=>(t[0]-e[0])*(n[1]-e[1])-(t[1]-e[1])*(n[0]-e[0]),r=[],i=[];for(let e of t){for(;r.length>1&&n(r.at(-2),r.at(-1),e)<=0;)r.pop();r.push(e)}for(let e=t.length-1;e>=0;e--){let r=t[e];for(;i.length>1&&n(i.at(-2),i.at(-1),r)<=0;)i.pop();i.push(r)}return r.pop(),i.pop(),r.concat(i)}function Xh(e,t){if(t.length<3)return!1;for(let n=0;n<t.length;n++)if(Bh(t[n],t[(n+1)%t.length],e))return!0;let n=(e[0]+e[2])/2,r=(e[1]+e[3])/2,i=!1,a=!1;for(let e=0;e<t.length;e++){let o=t[e],s=t[(e+1)%t.length],c=(s[0]-o[0])*(r-o[1])-(s[1]-o[1])*(n-o[0]);i||=c>0,a||=c<0}return!(i&&a)}var Zh={length:`#d9ad68`,width:`#92b7a4`,height:`#d99587`,plot:`#d9ad68`};function Qh(e,t,n=0){let r=e/2,i=t/2,a=(n%5-2)*.2;return`M${$(-r+1)},${$(-i+1)}L${$(-r+e*.23)},${$(-i+a)}L${$(r-2)},${$(-i+.5)}L${$(r)},${$(-i+t*.45)}L${$(r-1)},${$(i-1)}L${$(-r+e*.4)},${$(i+a)}L${$(-r+.5)},${$(i-1.5)}Z`}function $h(e,t,n){let r=Hh(`g`,{class:`paper-tab`}),i=Hh(`path`,{class:`paper-shadow`,transform:`translate(1.3 2)`}),a=Hh(`path`,{class:`paper`}),o=Hh(`path`,{class:`grain`}),s=Hh(`path`,{class:`watercolor`,stroke:Zh[t]}),c=Hh(`path`,{class:`direction`}),l=Hh(`text`);return l.textContent=e,r.append(i,a,o,s,c,l),{group:r,shadow:i,paper:a,grain:o,accent:s,icon:c,text:l,kind:t,seed:n,angle:(n%5-2)*.35,width:100,height:38}}function eg(e,t){e.width=t;let n=Qh(t,e.height,e.seed);Uh(e.paper,`d`,n),Uh(e.shadow,`d`,n);let r=-t/2+14,i=e.kind===`length`?`M${r-6},0h12m-9,-3l-3,3l3,3m6,-6l3,3l-3,3`:e.kind===`height`?`M${r},-7v14m-3,-11l3,-3l3,3m-6,8l3,3l3,-3`:e.kind===`width`?`M${r-5},5l10,-10m-10,4v6h6m-2,-10h6v6`:``;Uh(e.icon,`d`,i),Uh(e.text,`x`,e.kind===`plot`?`0`:`10`),Uh(e.text,`y`,`-1`),Uh(e.text,`font-size`,`28`);let a=-t/2+(e.kind===`plot`?10:28),o=t/2-10;Uh(e.accent,`d`,`M${$(a)},14Q${$((a+o)/2)},12.7 ${$(o)},13.5`),Uh(e.grain,`d`,`M${$(-t/2+8)},-10l8,-.3M${$(t/2-19)},-9l9,.5M${$(-t/2+10)},10l7,.2M${$(t/2-15)},6l6,-.3`)}function tg(e,t,n,r,i){return e[0]>=14&&e[1]>=14&&e[2]<=t-14&&e[3]<=n-14&&!r.some(t=>zh(e,t))&&!Xh(e,i)}function ng(e){return e.length?`M${e.map(e=>$(e[0])+`,`+$(e[1])).join(`L`)}Z`:``}function rg(e){let t=``;for(let n=0;n<e.length;n++){let r=e[n],i=e[(n+e.length-1)%e.length],a=e[(n+1)%e.length],o=e=>{let t=e[0]-r[0],n=e[1]-r[1],i=Math.min(9,Math.hypot(t,n)/3)/(Math.hypot(t,n)||1);return[r[0]+t*i,r[1]+n*i]},s=o(i),c=o(a);t+=`M${$(s[0])},${$(s[1])}L${$(r[0])},${$(r[1])}L${$(c[0])},${$(c[1])}`}return t}var ig=class{constructor(e,t){this.app=e,this.ui=t,this.version=wh,this.disposed=!1,this.visibleHomeIds=[],this.matrix=new Float64Array(16),this.local=[0,0,0],this.center=[0,0],this.rect={left:0,top:0,width:0,height:0},this.dirtyRect=!0,this.lastPanel=null,this.blockers=[],this.canvas=e.engine.canvas,this.abort=new AbortController,this.motion=matchMedia(`(prefers-reduced-motion: reduce)`),this.root=Hh(`svg`,{"aria-hidden":`true`,"data-container-measurements":this.version}),this.root.style.cssText=`position:fixed;pointer-events:none;overflow:hidden;z-index:90;contain:layout style paint;`,this.style=document.createElement(`style`),this.style.textContent=`@font-face{font-family:RochaCaveat;src:url('./fonts/caveat/Caveat.ttf') format('truetype');font-weight:400 700;font-style:normal;font-display:swap}.rocha-dimension path{fill:none;stroke-linecap:round;stroke-linejoin:round}.rocha-dimension text{font-family:RochaCaveat,cursive;font-weight:600;fill:#243f61;stroke:none;text-anchor:middle;dominant-baseline:middle}.rocha-dimension .ink{stroke:inherit;stroke-width:inherit}.rocha-dimension .shade{stroke:#28372d;stroke-width:3;opacity:.45}.rocha-dimension .sketch{stroke:#fff0cf;stroke-width:.7;opacity:.23}.rocha-dimension .paper{fill:#fff1d7;stroke:#e5d5b6;stroke-width:.5}.rocha-dimension .paper-shadow{fill:#202d25;stroke:none;opacity:.22}.rocha-dimension .grain{stroke:#95856c;stroke-width:.65;opacity:.12}.rocha-dimension .watercolor{stroke-width:3.7;opacity:.72}.rocha-dimension .direction{stroke:#243f61;stroke-width:1.5}.rocha-dimension .edge-ink{stroke:inherit;stroke-width:inherit;opacity:.68}.rocha-dimension .edge-halo{stroke:#fff0cf;stroke-width:3;opacity:.12}.rocha-dimension .corners{stroke:#fff0cf;stroke-width:1.7;opacity:.85}`,document.head.append(this.style),document.body.append(this.root),this.homes=e.containerHomes.map(e=>{let t=Jh(e.record),n=Hh(`g`,{class:`rocha-dimension`,"data-outline":e.record.id,stroke:`#fff0cf`,"stroke-width":`1`,opacity:`0`}),r=Hh(`path`,{class:`edge-ink`,id:`rocha-outline-`+e.record.id}),i=Hh(`use`,{class:`edge-halo`,href:`#rocha-outline-`+e.record.id}),a=Hh(`path`,{class:`corners`});n.append(i,r,a),this.root.append(n);let o={home:e,record:e.record,alpha:0,x:0,z:0,center:Fh(e.record,0,1.2,0),variants:[],badge:null,outline:n,halo:i,edge:r,corners:a,outlinePoints:t,outlineScreen:t.map(()=>[0,0]),hull:[]};for(let t of Ih(e.record)){let e=Hh(`g`,{class:`rocha-dimension`,"data-home":o.record.id,"data-dimension":t.kind,stroke:`#fff0cf`,"stroke-width":`1.6`,opacity:`0`}),n=`rocha-dimension-`+o.record.id+`-`+o.variants.length,r=Hh(`path`,{class:`ink`,id:n}),i=Hh(`use`,{class:`shade`,href:`#`+n}),a=Hh(`use`,{class:`sketch`,href:`#`+n,"stroke-dasharray":`14 62`,transform:`translate(.5 .5)`}),s=Hh(`path`,{stroke:Zh[t.kind],"stroke-width":`2.6`}),c=$h(t.label,t.kind,Number(o.record.plotId)+[`length`,`width`,`height`].indexOf(t.kind));eg(c,110),e.append(i,r,a,s,c.group),this.root.append(e),o.variants.push({...t,group:e,shade:i,ink:r,sketch:a,accent:s,tab:c,text:c.text,alpha:0,screen:[[0,0],[0,0],[0,0],[0,0]],line:[[0,0],[0,0]],box:[0,0,0,0],bend:(Number(o.record.plotId)%5-2)*.24,width:110})}return o.badge=Hh(`g`,{class:`rocha-dimension`,"data-plot":o.record.plotId,stroke:`#fff0cf`,"stroke-width":`1.6`,opacity:`0`}),o.badgeLine=Hh(`path`,{class:`ink`}),o.badgeDot=Hh(`circle`,{r:`2.5`,fill:`#fff0cf`}),o.badgeTab=$h(`Lote `+o.record.plotId,`plot`,Number(o.record.plotId)),eg(o.badgeTab,102),o.badge.append(o.badgeLine,o.badgeDot,o.badgeTab.group),this.root.append(o.badge),o}),this.fontReady=!1,this.ready=document.fonts.load(`600 28px RochaCaveat`).then(()=>{if(this.disposed)return;let e=document.createElement(`canvas`).getContext(`2d`);e.font=`600 28px RochaCaveat`;for(let t of this.homes){for(let n of t.variants)n.width=e.measureText(n.label).width+40,eg(n.tab,n.width);eg(t.badgeTab,e.measureText(`Lote `+t.record.plotId).width+20)}this.fontReady=!0}).catch(()=>{this.disposed||(this.fontReady=!0,this.fontUnavailable=!0)}),this.resize=()=>{this.dirtyRect=!0},this.observer=new ResizeObserver(this.resize),this.observer.observe(this.canvas),window.addEventListener(`resize`,this.resize,{signal:this.abort.signal}),window.addEventListener(`scroll`,this.resize,{signal:this.abort.signal,capture:!0}),e.containerMeasurementsEnabled=!0,e.setContainerMeasurementsEnabled=t=>{if(typeof t!=`boolean`)throw TypeError(`Measurements must be boolean`);e.containerMeasurementsEnabled=t},e.containerMeasurements=this}refreshRect(){if(!this.dirtyRect)return;let e=this.canvas.getBoundingClientRect();this.rect={left:e.left,top:e.top,width:e.width,height:e.height},this.root.style.left=e.left+`px`,this.root.style.top=e.top+`px`,this.root.style.width=e.width+`px`,this.root.style.height=e.height+`px`,Uh(this.root,`viewBox`,`0 0 ${e.width} ${e.height}`),this.dirtyRect=!1,this.lastPanel=null}refreshBlockers(){let e=[this.ui._panelOpen,this.ui._photo,this.ui._help,this.ui._start,this.ui.promptText?.textContent].join(`/`);if(this.lastPanel===e)return;this.lastPanel=e,this.blockers.length=0;let t=this.ui._photo?[this.ui.photoHint]:[this.ui._panelOpen?this.ui.panel:this.ui.rail,this.ui._help?this.ui.helpEl:null,this.ui._start?this.ui.startEl:null,this.ui.statsEl,this.ui.promptEl?.classList.contains(`is-on`)?this.ui.promptEl:null];for(let e of t){if(!e)continue;let t=e.getBoundingClientRect(),n=e===this.ui.panel?Math.min(t.left,innerWidth-t.width-16):t.left;this.blockers.push([n-this.rect.left,t.top-this.rect.top,n+t.width-this.rect.left,t.bottom-this.rect.top])}}hideImmediately(){this.visibleHomeIds.length=0;for(let e of this.homes){e.alpha=0,Uh(e.badge,`opacity`,`0`),Uh(e.outline,`opacity`,`0`);for(let t of e.variants)t.alpha=0,Uh(t.group,`opacity`,`0`)}this.root.style.display=`none`}update(e){if(this.disposed)return;if(document.hidden||this.app.transformerInspection?.active){this.hideImmediately();return}if(!this.app.containerMeasurementsEnabled&&this.homes.every(e=>e.alpha===0)){this.root.style.display=`none`,this.visibleHomeIds.length=0;return}let t=this.app.camera,n=this.motion.matches,r=!1,i=!1;for(let a of this.homes){kh(a.record,t.position,this.local);let o=jh(a.record,this.local);i||=o,!this.app.freeCam&&this.app.player?.position&&(kh(a.record,this.app.player.position,this.local),i||=jh(a.record,this.local),kh(a.record,t.position,this.local));let s=this.app.containerMeasurementsEnabled&&a.home.group.visible&&this.fontReady&&!o?Nh(Ah(a.record,this.local)):0;a.alpha=o?0:Ph(a.alpha,s,e,n),a.x=Mh(a.x,this.local[0]),a.z=Mh(a.z,this.local[2]),r||=a.alpha>0}if(!r||i){this.hideImmediately();return}this.root.style.display=`block`,this.refreshRect(),this.refreshBlockers();let{width:a,height:o}=this.rect;Lh(t,this.matrix),this.visibleHomeIds.length=0;let s=this.blockers.slice(),c=a<600?24:28;for(let t of this.homes){Uh(t.badge,`opacity`,`0`),Uh(t.outline,`opacity`,`0`);let r=0,i=Rh(t.center,this.matrix,a,o,this.center),l=t.outlinePoints.every((e,n)=>Rh(e,this.matrix,a,o,t.outlineScreen[n]));t.hull=l?Yh(t.outlineScreen):[];for(let l of t.variants){let u=(!l.sideX||l.sideX===t.x)&&(!l.sideZ||l.sideZ===(l.kind===`height`?-t.z:t.z));l.alpha=Ph(l.alpha,+!!u,e,n);let d=t.alpha*l.alpha;if(d===0||!i||!l.points.every((e,t)=>Rh(e,this.matrix,a,o,l.screen[t]))){Uh(l.group,`opacity`,`0`);continue}Kh(l.screen[2],l.screen[3],this.center,l.line[0],l.line[1]);let f=l.line[0],p=l.line[1],m=p[0]-f[0],h=p[1]-f[1],g=Math.hypot(m,h);if(g<32){Uh(l.group,`opacity`,`0`);continue}let _=l.kind===`height`?.85:.5,v=m/g,y=h/g,b=f[0]+m*_,x=f[1]+h*_,S=-y,C=v;S*(b-this.center[0])+C*(x-this.center[1])<0&&(S=-S,C=-C);let w=c/28,T=l.width*w,E=l.tab.height*w,D=Math.abs(S)*T/2+Math.abs(C)*E/2+9,O=0,k=0,A=!1;for(let e of[D,D+12,D+24])if(O=b+S*e,k=x+C*e,l.box[0]=O-T/2-3,l.box[1]=k-E/2-3,l.box[2]=O+T/2+3,l.box[3]=k+E/2+4,tg(l.box,a,o,s,t.hull)){A=!0;break}let ee=this.blockers.some(e=>Bh(f,p,e)||Bh(l.screen[0],f,e)||Bh(l.screen[1],p,e));if(!A||ee){Uh(l.group,`opacity`,`0`);continue}s.push(l.box);let j=Wh(f,p,l.bend)+Wh(l.screen[0],f,.3)+Wh(l.screen[1],p,-.25)+Gh(f,v,y,1)+Gh(p,v,y,-1);Uh(l.ink,`d`,j),Uh(l.accent,`d`,`M${$(f[0]-S*3)},${$(f[1]-C*3)}l${$(S*6)},${$(C*6)}M${$(p[0]-S*3)},${$(p[1]-C*3)}l${$(S*6)},${$(C*6)}`),Uh(l.tab.group,`transform`,`translate(${$(O)} ${$(k)}) rotate(${l.tab.angle}) scale(${$(w)})`),Uh(l.group,`opacity`,$(d)),r++}if(r&&(this.visibleHomeIds.push(t.record.id),l&&!t.hull.some((e,n)=>this.blockers.some(r=>Bh(e,t.hull[(n+1)%t.hull.length],r))))){let e=ng(t.hull);Uh(t.edge,`d`,e),Uh(t.corners,`d`,rg(t.hull)),Uh(t.outline,`opacity`,$(t.alpha))}}for(let e of this.homes){if(!this.visibleHomeIds.includes(e.record.id)||e.hull.length<3)continue;let t=e.outlineScreen.slice(4),n=Math.min(...t.map(e=>e[1])),r=t.filter(e=>e[1]<=n+24).sort((e,t)=>e[0]-t[0])[0],i=(c-2)/28,l=e.badgeTab.width*i,u=e.badgeTab.height*i;for(let t of[-1,1]){let n=r[0]+t*(l/2+12),c=r[1]-u/2-14,d=[n-l/2-3,c-u/2-3,n+l/2+3,c+u/2+4],f=[n-t*l*.22,c+u/2];if(tg(d,a,o,s,e.hull)&&!this.blockers.some(e=>Bh(f,r,e))){Uh(e.badgeTab.group,`transform`,`translate(${$(n)} ${$(c)}) rotate(${e.badgeTab.angle}) scale(${$(i)})`),Uh(e.badgeLine,`d`,Wh(f,r,t*-8)),Uh(e.badgeDot,`cx`,$(r[0])),Uh(e.badgeDot,`cy`,$(r[1])),Uh(e.badge,`opacity`,$(e.alpha)),e.badgeBox=d,s.push(d);break}}}}dispose(){this.disposed||(this.disposed=!0,this.abort.abort(),this.observer.disconnect(),this.root.remove(),this.style.remove(),this.visibleHomeIds.length=0,this.app.containerMeasurements===this&&(this.app.containerMeasurements=null))}},ag=`rocha-overhead-measurements-3`,og=e=>Array.isArray(e?.position)&&e.position.length===2&&e.position.every(Number.isFinite)&&Number.isFinite(e.baseY),sg=(e,t)=>[e,t].sort().join(`~`);function cg(e,t=null){let n=new Map,r=new Map,i=[],a=new Set,o=e.version===`rocha-overhead-network-5`;for(let t of e.poles||[])!t.id||n.has(t.id)||!og(t)?i.push({severity:`error`,code:`invalid-pole`,poleId:t.id??null}):n.set(t.id,t);for(let t of e.spans||[]){if(!t.id||a.has(t.id)){i.push({severity:`error`,code:`duplicate-span-id`,spanId:t.id??null});continue}if(a.add(t.id),!n.has(t.from)||!n.has(t.to)||t.from===t.to){i.push({severity:`error`,code:`invalid-endpoint`,spanId:t.id,from:t.from,to:t.to});continue}let s=sg(t.from,t.to),[c,l]=[t.from,t.to].sort(),u=n.get(c),d=n.get(l),f=Math.hypot(d.position[0]-u.position[0],d.position[1]-u.position[1]),p=r.get(s);if(!p){let t=d.baseY-u.baseY,n=Math.max(u.baseY,d.baseY)+1.5;p={id:s,from:c,to:l,fromXYZ:[u.position[0],u.baseY,u.position[1]],toXYZ:[d.position[0],d.baseY,d.position[1]],fromSurvey:u.surveyCoordinates?{...u.surveyCoordinates}:null,toSurvey:d.surveyCoordinates?{...d.surveyCoordinates}:null,horizontalM:f,elevationDifferenceM:t,straight3DM:Math.hypot(f,t),reference:[[u.position[0],n,u.position[1]],[d.position[0],n,d.position[1]]],spans:[],flags:[]},f<5&&p.flags.push(`short-span-review`);let i=e.constructionEstimates?.maximumSpanM??40;p.reviewMaximumM=i,f>i+1e-6&&p.flags.push(`over-model-span-limit`),r.set(s,p)}let m=t.lengthM-f,h={id:t.id,kind:t.kind,circuit:t.circuit,storedHorizontalM:t.lengthM,recalculatedMinusStoredM:-m};o&&(Object.assign(h,{rowId:t.rowId,spanRole:t.spanRole,crossingVerified:t.crossingVerified,shortSpanReason:t.shortSpanReason??null}),t.spanRole===`crossing`!==t.crossingVerified&&i.push({severity:`error`,code:`unverified-crossing-classification`,spanId:t.id})),p.spans.push(h),(!Number.isFinite(t.lengthM)||Math.abs(m)>1e-6)&&(p.flags.includes(`stored-length-mismatch`)||p.flags.push(`stored-length-mismatch`),i.push({severity:`error`,code:`stored-length-mismatch`,spanId:t.id,recalculatedM:f,storedM:t.lengthM}))}let s=[...r.values()].sort((e,t)=>e.id.localeCompare(t.id));for(let t of s)t.spans.sort((e,t)=>e.id.localeCompare(t.id)),o&&(t.rowIds=[...new Set(t.spans.map(e=>e.rowId))].sort(),t.spanRoles=[...new Set(t.spans.map(e=>e.spanRole))].sort(),t.shortSpanReasons=[...new Set(t.spans.map(e=>e.shortSpanReason).filter(Boolean))].sort(),t.coveredPlotIds=(e.coverage?.plots||[]).filter(e=>e.poleId===t.from||e.poleId===t.to).map(e=>e.plotId).sort((e,t)=>e-t));let c={version:o?ag:`rocha-overhead-measurements-2`,sourceVersion:e.version,sourceChecksum:t,metric:`horizontal pole-axis distance; separate signed base elevation difference and straight base-to-base 3D distance`,accuracy:`Digital-model coordinates; not field survey accuracy or sagging cable length.`,signedElevationConvention:`to minus from; pole IDs ordered lexicographically`,counts:{poles:n.size,circuitSpans:e.spans?.length??0,physicalSpans:s.length,sharedPairs:s.filter(e=>e.spans.length>1).length,shortSpans:s.filter(e=>e.horizontalM<5).length,belowOneMetre:s.filter(e=>e.horizontalM<1).length,errors:i.length},issues:i,rows:s};return o&&(c.coverage={maximumLongitudinalM:e.coverage.maximumLongitudinalM,verifiedRoadPlots:e.coverage.plots.filter(e=>e.status===`covered`).length,conditionalReservationPlots:e.coverage.plots.filter(e=>e.status===`conditional-reservation`).length,roadAccessPendingPlots:e.coverage.plots.filter(e=>e.status===`covered`&&e.accessPending).length,metric:`Distance along the associated road corridor; separate transverse and horizontal distances. Nearby MT is not a household supply.`,plots:e.coverage.plots.map(e=>({...e})).sort((e,t)=>e.plotId-t.plotId)}),c}function lg(e,t){if(![`rocha-overhead-measurements-2`,`rocha-overhead-measurements-3`].includes(e?.version)||!/^[a-f0-9]{64}$/.test(e.sourceChecksum||``))throw Error(`Invalid span audit version/checksum`);let n=cg(t,e.sourceChecksum);if(n.counts.errors||JSON.stringify(n)!==JSON.stringify(e))throw Error(`Span audit does not match the installed overhead network`);return n}function ug(e,t,n){let r=e.fromXYZ,i=e.toXYZ,a=i[0]-r[0],o=i[2]-r[2],s=a*a+o*o,c=s?Math.max(0,Math.min(1,((t-r[0])*a+(n-r[2])*o)/s)):0;return Math.hypot(t-r[0]-c*a,n-r[2]-c*o)}var dg=e=>Math.max(0,Math.min(1,(100-e)/20));function fg(e){let t=new Map;for(let n of e){let e=n.fromXYZ,r=n.toXYZ;for(let i=Math.floor(Math.min(e[0],r[0])/128);i<=Math.floor(Math.max(e[0],r[0])/128);i++)for(let a=Math.floor(Math.min(e[2],r[2])/128);a<=Math.floor(Math.max(e[2],r[2])/128);a++){let e=i+`,`+a;t.has(e)||t.set(e,[]),t.get(e).push(n)}}return t}function pg(e,t,n=null){let r=new Set,i=[];for(let n=Math.floor((t.x-100)/128);n<=Math.floor((t.x+100)/128);n++)for(let a=Math.floor((t.z-100)/128);a<=Math.floor((t.z+100)/128);a++)for(let o of e.get(n+`,`+a)||[])if(!r.has(o.id)){r.add(o.id);let e=ug(o,t.x,t.z);e<100&&i.push({row:o,distance:e})}return i.sort((e,t)=>(t.row.id===n)-(e.row.id===n)||e.distance-t.distance||e.row.id.localeCompare(t.row.id))}function mg(e,t=``,n=`id`,r=!1){let i=t.trim().toLowerCase();return e.filter(e=>(!r||e.flags.length)&&(!i||[e.id,...e.spans.flatMap(e=>[e.id,e.kind,e.circuit,e.rowId,e.spanRole,e.shortSpanReason]),...(e.coveredPlotIds||[]).map(e=>`lote `+e),...e.flags].join(` `).toLowerCase().includes(i))).sort((e,t)=>n===`horizontal-desc`?t.horizontalM-e.horizontalM||e.id.localeCompare(t.id):n===`horizontal-asc`&&e.horizontalM-t.horizontalM||e.id.localeCompare(t.id))}function hg(e,t=``,n=`id`,r=!1){let i=t.trim().toLowerCase();return e.filter(e=>(!r||e.longitudinalM>30||e.accessPending||e.status!==`covered`)&&(!i||[`lote `+e.plotId,e.rowId,e.poleId,e.status,e.accessPending?`acceso pendiente`:``].join(` `).toLowerCase().includes(i))).sort((e,t)=>n===`horizontal-desc`?t.longitudinalM-e.longitudinalM||e.plotId-t.plotId:n===`horizontal-asc`&&e.longitudinalM-t.longitudinalM||e.plotId-t.plotId)}var gg=`http://www.w3.org/2000/svg`,_g=new WeakMap,vg=e=>e.toFixed(2);function yg(e,t,n={}){let r=e.createElementNS(gg,t);_g.set(r,{});for(let e in n)bg(r,e,n[e]);return r}function bg(e,t,n){let r=_g.get(e);r[t]!==n&&(e.setAttribute(t,n),r[t]=n)}var xg=(e,t)=>`M${vg(e[0])},${vg(e[1])}L${vg(t[0])},${vg(t[1])}`,Sg=e=>(e>=0?`+`:``)+e.toFixed(3)+` m`,Cg=e=>({longitudinal:`hilera longitudinal`,crossing:`cruce transversal comprobado`,"station-connection":`conexión a estación`})[e]||e;function wg(e){let t=e.rowIds?`\nHilera: ${e.rowIds.join(`, `)}\nTrazado: ${e.spanRoles.map(Cg).join(`, `)}${e.shortSpanReasons.length?`
Vano corto: `+e.shortSpanReasons.join(`; `):``}\nFrentes asociados a sus apoyos: ${e.coveredPlotIds.length?e.coveredPlotIds.join(`, `):`ninguno`}`:``;return`${e.from} → ${e.to}\nHorizontal H: ${e.horizontalM.toFixed(3)} m\nΔY (destino − origen): ${Sg(e.elevationDifferenceM)}\nRecta 3D entre bases: ${e.straight3DM.toFixed(3)} m${t}\n${e.spans.map(e=>e.id+` · `+e.kind+` · `+e.circuit).join(`
`)}\n${e.flags.length?`Revisar: `+e.flags.join(`, `):`Sin alertas métricas; no acredita conformidad eléctrica.`}`}function Tg(e){let t=e.status===`conditional-reservation`;return`Lote ${e.plotId} · ${e.rowId}\nApoyo asociado: ${e.poleId}\nDistancia longitudinal por su corredor: ${e.longitudinalM.toFixed(3)} m / 30 m\nSeparación transversal: ${e.transverseM.toFixed(3)} m\nDistancia horizontal directa: ${e.horizontalM.toFixed(3)} m\nEstado: ${t?`Reserva propuesta; acceso y disponibilidad legal pendientes`:`Asociación geométrica con la vía`}${t?`
Ramal junto a zona común; el plano no muestra una calle frente a este lote.`:e.accessPending?`
Asociación por un punto de borde; ancho útil del acceso pendiente de verificar.`:``}\nLa cercanía a MT no es una conexión de la vivienda. Reservas y conformidad eléctrica pendientes.`}function Eg(e,t,n,r,i){let a=e=>[n[0]*e[0]+n[4]*e[1]+n[8]*e[2]+n[12],n[1]*e[0]+n[5]*e[1]+n[9]*e[2]+n[13],n[2]*e[0]+n[6]*e[1]+n[10]*e[2]+n[14],n[3]*e[0]+n[7]*e[1]+n[11]*e[2]+n[15]],o=a(e),s=a(t),c=e=>[e[3]+e[0],e[3]-e[0],e[3]+e[1],e[3]-e[1],e[2],e[3]-e[2],e[3]-1e-8],l=c(o),u=c(s),d=0,f=1;for(let e=0;e<7;e++){if(l[e]<0&&u[e]<0)return null;l[e]<0&&(d=Math.max(d,l[e]/(l[e]-u[e]))),u[e]<0&&(f=Math.min(f,l[e]/(l[e]-u[e])))}return d>f?null:[d,f].map(e=>{let t=o.map((t,n)=>t+(s[n]-t)*e);return[(t[0]/t[3]+1)*r/2,(1-t[1]/t[3])*i/2]})}function Dg(e,t,n,r=38){let i=Math.max(0,Math.floor(t/r)-3);return{start:i,end:Math.min(e,i+Math.min(40,Math.ceil(n/r)+6))}}var Og=class{constructor(e,t,{fetcher:n}={}){this.app=e,this.ui=t,this.doc=e.engine.canvas.ownerDocument||document,this.win=this.doc.defaultView||window,this.fetcher=n||this.win.fetch.bind(this.win),this.version=ag,this.disposed=!1,this.visibleSpanIds=[],this.labelBounds=[],this.matrix=new Float64Array(16),this.rect=null,this.dirtyRect=!0,this.pool=[],this.abort=new AbortController,e.overheadMeasurementsEnabled=!1,e.overheadMeasurements=this,e.setOverheadMeasurementsEnabled=e=>this.setEnabled(e)}available(){return this.app.electricalNetworkMode===`overhead`&&this.app.electricalNetwork?.visible&&!this.app.electricalNetwork?.busy}async prepare(){return this.audit?this.audit:(this.ready||=(async()=>{let e=await this.fetcher(`./rocha/overhead-span-audit.json`,{signal:this.abort.signal});if(!e.ok)throw Error(`No se pudo cargar la auditoría de vanos`);let t=await e.json();return this.disposed?null:(this.audit=lg(t,this.app.world.electricalNetworks.overhead),this.index=fg(this.audit.rows),this.byId=new Map(this.audit.rows.map(e=>[e.id,e])),this.createOverlay(),this.audit)})().catch(e=>{throw this.ready=null,this.disposed||(this.app.overheadMeasurementsEnabled=!1,this.ui.toast?.(e.message)),e}),this.ready)}async setEnabled(e){if(typeof e!=`boolean`)throw TypeError(`Overhead measurements must be boolean`);if(this.disposed)return!1;if(this.app.overheadMeasurementsEnabled=e,!e)return this.hide(),!1;try{return await this.prepare(),!this.disposed&&this.app.overheadMeasurementsEnabled}catch{return!1}}createOverlay(){let e=this.doc;this.motion=this.win.matchMedia(`(prefers-reduced-motion: reduce)`),this.style=e.createElement(`style`),this.style.textContent=`
      .rocha-span-overlay{position:fixed;pointer-events:none;overflow:hidden;z-index:89;contain:layout style paint}
      .rocha-span-overlay .line{fill:none;stroke:#fff1d7;stroke-width:1.3;stroke-linejoin:round;stroke-linecap:round}
      .rocha-span-overlay .halo{fill:none;stroke:#20342d;stroke-width:3;opacity:.55}
      .rocha-span-overlay text{font:600 13px system-ui,sans-serif;fill:#243f61;text-anchor:middle;dominant-baseline:middle}
      .rocha-span-table{position:fixed;right:18px;top:64px;z-index:105;width:min(520px,calc(100vw - 36px));max-height:calc(100vh - 82px);overflow:auto;padding:16px;box-sizing:border-box;background:#f3efe6f5;color:#243f61;border:1px solid #d3cfbe;border-radius:12px;box-shadow:0 5px 24px #17251f50;font:13px/1.45 system-ui}
      .rocha-span-table h2{font-size:19px;margin:0 0 6px}.rocha-span-table p{margin:6px 0}.rocha-span-table small{color:#59695e}.rocha-span-table button,.rocha-span-table input,.rocha-span-table select{font:inherit;border:1px solid #bbc5b6;border-radius:5px;background:#fffaf0;color:inherit;padding:6px;box-sizing:border-box}.rocha-span-table button{cursor:pointer}.rocha-span-table a{color:#2e4f73}.rocha-span-table header{display:flex;justify-content:space-between;gap:12px}.rocha-span-controls{display:flex;gap:6px;flex-wrap:wrap;margin:10px 0}.rocha-span-controls input[type=search]{flex:1;min-width:130px}.rocha-span-list{height:min(342px,36vh);overflow:auto;position:relative;border:1px solid #d0d7c6;border-radius:5px}.rocha-span-rows{position:relative}.rocha-span-row{position:absolute;left:0;width:100%;height:38px;text-align:left;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;border:0!important;border-bottom:1px solid #dddace!important;border-radius:0!important;padding:6px!important}.rocha-span-row[aria-pressed=true]{background:#d8e4d7}.rocha-span-detail{white-space:pre-line;margin:10px 0;padding:10px;background:#fffaf0;border-radius:6px;font-variant-numeric:tabular-nums}.rocha-span-table button:focus-visible,.rocha-span-table input:focus-visible{outline:2px solid #b69b58}`,e.head.append(this.style),this.root=yg(e,`svg`,{"aria-hidden":`true`,class:`rocha-span-overlay`,"data-overhead-measurements":this.version}),this.root.style.display=`none`,e.body.append(this.root);for(let t=0;t<24;t++){let t=yg(e,`g`,{opacity:`0`}),n=yg(e,`path`,{class:`halo`}),r=yg(e,`path`,{class:`line`}),i=yg(e,`rect`,{rx:`4`,fill:`#fff1d7`,stroke:`#d2cbb6`,"stroke-width":`.5`}),a=yg(e,`text`);t.append(n,r,i,a),this.root.append(t),this.pool.push({group:t,halo:n,line:r,paper:i,text:a,alpha:0})}this.resize=()=>{this.dirtyRect=!0},this.observer=new this.win.ResizeObserver(this.resize),this.observer.observe(this.app.engine.canvas),this.win.addEventListener(`resize`,this.resize,{signal:this.abort.signal}),this.win.addEventListener(`scroll`,this.resize,{signal:this.abort.signal,capture:!0}),this.doc.addEventListener(`keydown`,e=>{e.code===`Escape`&&this.table&&!this.table.hidden&&(e.preventDefault(),e.stopImmediatePropagation(),this.closeTable())},{signal:this.abort.signal,capture:!0})}syncAvailability(){let e=this.available();this.app.ui?.overheadMeasurementsControl?.setEnabled(e),this.app.ui?.overheadSpanTableButton?.setEnabled(e),this.app.ui?.overheadCoverageTableButton?.setEnabled(e&&!!this.app.world.electricalNetworks.overhead.coverage),e||(this.hide(),this.closeTable())}hide(){if(this.visibleSpanIds.length=0,this.labelBounds.length=0,this.root&&this.root.style.display!==`none`){this.root.style.display=`none`;for(let e of this.pool)e.alpha=0,bg(e.group,`opacity`,`0`)}}refreshRect(){if(!this.dirtyRect)return;let e=this.app.engine.canvas.getBoundingClientRect();this.rect={left:e.left,top:e.top,width:e.width,height:e.height},this.dirtyRect=!1,Object.assign(this.root.style,{left:e.left+`px`,top:e.top+`px`,width:e.width+`px`,height:e.height+`px`}),bg(this.root,`viewBox`,`0 0 ${e.width} ${e.height}`),this.blockerKey=null}blockers(){let e=this.ui,t=this.rect,n=[],r=e._photo?[e.photoHint]:[e._panelOpen?e.panel:e.rail,e._help?e.helpEl:null,e._start?e.startEl:null,e.statsEl,e.promptEl?.classList.contains(`is-on`)?e.promptEl:null];this.table&&!this.table.hidden&&r.push(this.table);let i=[this.dirtyRect,e._photo,e._panelOpen,e._help,e._start,e.promptText?.textContent,this.table?.hidden,t.width,t.height].join(`/`);if(this.blockerKey!==i){this.blockerKey=i,this.controlBounds=[];for(let n of r){if(!n)continue;let r=n.getBoundingClientRect(),i=n===e.panel?Math.min(r.left,this.win.innerWidth-r.width-16):r.left;this.controlBounds.push([i-t.left,r.top-t.top,i+r.width-t.left,r.bottom-t.top])}}n.push(...this.controlBounds);for(let e of this.app.containerMeasurements?.homes||[]){for(let t of e.variants)t.alpha>0&&n.push(t.box);e.badge?.getAttribute(`opacity`)!==`0`&&e.badgeBox&&n.push(e.badgeBox)}return n}update(e){if(this.disposed)return;if(!this.app.overheadMeasurementsEnabled||!this.audit||!this.available()||this.doc.hidden||this.app.transformerInspection?.active||this.app.positioningModeActive){this.hide();return}this.refreshRect();let{width:t,height:n}=this.rect;if(t<80||n<80){this.hide();return}this.root.style.display=`block`,Lh(this.app.camera,this.matrix);let r=this.blockers(),i=[];for(let{row:e,distance:a}of pg(this.index,this.app.camera.position,this.selectedId).slice(0,96)){if(i.length===24)break;let o=Eg(...e.reference,this.matrix,t,n);if(!o)continue;let s=o[0],c=o[1],l=Math.hypot(c[0]-s[0],c[1]-s[1]);if(l<(e.id===this.selectedId?4:60))continue;let u=`H `+e.horizontalM.toFixed(3)+` m`,d=Math.max(98,u.length*7.6+16),f=[],p=[],m=null;for(let i of[-1,1]){let o=c[0]-s[0],h=c[1]-s[1],g=(s[0]+c[0])/2,_=(s[1]+c[1])/2;Kh(s,c,[g-i*-h/l*30,_-i*o/l*30],f,p,8);let v=(f[0]-s[0])/8,y=(f[1]-s[1])/8,b=(f[0]+p[0])/2+v*18,x=(f[1]+p[1])/2+y*18,S=[b-d/2,x-13,b+d/2,x+13];if(S[0]<8||S[1]<8||S[2]>t-8||S[3]>n-8||r.some(e=>zh(S,e)||Bh(f,p,e)))continue;let C=xg(f,p)+xg(s,f)+xg(c,p),w=(p[0]-f[0])/l,T=(p[1]-f[1])/l,E=(e,t)=>`M${vg(e[0]+w*t*6-T*3)},${vg(e[1]+T*t*6+w*3)}L${vg(e[0])},${vg(e[1])}L${vg(e[0]+w*t*6+T*3)},${vg(e[1]+T*t*6-w*3)}`,D=``;for(let r=0;r<2;r++){let i=[],a=[];Rh(r?e.toXYZ:e.fromXYZ,this.matrix,t,n,i)&&Rh(e.reference[r],this.matrix,t,n,a)&&(D+=xg(i,a))}m={row:e,label:u,w:d,tx:b,ty:x,box:S,d:C+E(f,1)+E(p,-1)+D,target:dg(a)};break}m&&(r.push(m.box),i.push(m))}this.visibleSpanIds.length=0,this.labelBounds.length=0;for(let t=0;t<this.pool.length;t++){let n=this.pool[t],r=i[t];if(!r){n.alpha=0,bg(n.group,`opacity`,`0`);continue}n.id!==r.row.id&&(n.alpha=0),n.id=r.row.id,n.alpha=this.motion.matches?r.target:Math.min(r.target,n.alpha+Math.max(0,e)/.2),bg(n.group,`data-span`,n.id),bg(n.group,`opacity`,vg(n.alpha)),bg(n.halo,`d`,r.d),bg(n.line,`d`,r.d),bg(n.paper,`x`,vg(r.tx-r.w/2)),bg(n.paper,`y`,vg(r.ty-13)),bg(n.paper,`width`,r.w),bg(n.paper,`height`,26),bg(n.text,`x`,vg(r.tx)),bg(n.text,`y`,vg(r.ty)),n.label!==r.label&&(n.text.textContent=r.label,n.label=r.label),n.alpha>0&&(this.visibleSpanIds.push(n.id),this.labelBounds.push(r.box))}}async openTable(e=`spans`){if(!this.available()||this.disposed)return!1;try{await this.prepare()}catch{return!1}return this.disposed||!this.available()?!1:(this.table||this.createTable(),this.tableMode.value=e===`coverage`&&this.audit.coverage?`coverage`:`spans`,this.table.hidden=!1,this.tableFocus=this.doc.activeElement,this.doc.exitPointerLock?.(),this.renderTable(!0),this.search.focus(),!0)}createTable(){let e=this.table=this.doc.createElement(`section`);e.className=`rocha-span-table`,e.setAttribute(`aria-label`,`Tabla de vanos de la red aérea`);let t=this.app.world.electricalNetworks.overhead.constructionEstimates.maximumSpanM;e.innerHTML=`<header><h2>Vanos entre postes</h2><button data-close aria-label="Cerrar tabla de vanos">✕</button></header><small>Medidas del modelo digital. Tres decimales no acreditan precisión topográfica. H: horizontal entre ejes; no es longitud de cable.</small><p data-count></p><div class="rocha-span-controls"><select data-mode aria-label="Contenido de la tabla"><option value="spans">Vanos</option>${this.audit.coverage?`<option value="coverage">Frentes de lotes</option>`:``}</select><input type="search" aria-label="Buscar poste, hilera, vano, circuito o lote" placeholder="Poste, hilera, vano o lote"><select data-sort aria-label="Ordenar distancias"><option value="id">Identificadores</option><option value="horizontal-asc">Distancia menor primero</option><option value="horizontal-desc">Distancia mayor primero</option></select><label><input type="checkbox" data-review> Sólo revisar</label></div><div class="rocha-span-list" aria-label="Lista de vanos"><div class="rocha-span-rows"></div></div><div class="rocha-span-detail" aria-live="polite">Selecciona un vano para encuadrarlo y ver sus medidas.</div><small>ΔY = cota de destino − cota de origen, con IDs ordenados. Menos de 5 m: revisar; no demuestra un error de diseño. ${t} m: límite del modelo condicionado, no permiso reglamentario universal.</small><p><a href="./rocha/overhead-span-audit.csv" download>CSV de vanos</a> · ${this.audit.coverage?`<a href="./rocha/overhead-frontage-audit.csv" download>CSV de frentes</a> · `:``}<a href="./rocha/overhead-span-audit.json" download>JSON completo</a></p>`,this.doc.body.append(e),this.search=e.querySelector(`input[type=search]`),this.sort=e.querySelector(`[data-sort]`),this.tableMode=e.querySelector(`[data-mode]`),this.review=e.querySelector(`[data-review]`),this.list=e.querySelector(`.rocha-span-list`),this.rowsEl=e.querySelector(`.rocha-span-rows`),this.detail=e.querySelector(`.rocha-span-detail`);let n={signal:this.abort.signal};e.querySelector(`[data-close]`).addEventListener(`click`,()=>this.closeTable(),n);for(let e of[this.search,this.sort,this.review,this.tableMode])e.addEventListener(`input`,()=>this.renderTable(!0),n);this.list.addEventListener(`scroll`,()=>this.renderTable(!1),n),this.rowsEl.addEventListener(`click`,e=>{let t=e.target.closest(`[data-span], [data-plot]`);t?.dataset.span?this.selectSpan(t.dataset.span):t?.dataset.plot&&this.selectPlot(Number(t.dataset.plot))},n),e.addEventListener(`focusin`,()=>{this.savedInput===void 0&&(this.savedInput=this.app.input.enabled,this.app.input.enabled=!1)},n),e.addEventListener(`focusout`,t=>{e.contains(t.relatedTarget)||this.restoreInput()},n)}restoreInput(){this.savedInput!==void 0&&(this.app.input.enabled=this.savedInput,this.savedInput=void 0)}renderTable(e=!1){let t=this.tableMode.value===`coverage`,n=t?this.audit.coverage?.plots||[]:this.audit.rows;e&&(this.filtered=(t?hg:mg)(n,this.search.value,this.sort.value,this.review.checked),this.list.scrollTop=0);let r=this.filtered||n,{start:i,end:a}=Dg(r.length,this.list.scrollTop,this.list.clientHeight||342);this.table.querySelector(`[data-count]`).textContent=t?`${r.length} / ${n.length} frentes · ${this.audit.coverage.verifiedRoadPlots} asociados a vía · ${this.audit.coverage.conditionalReservationPlots} reservas pendientes · ${this.audit.coverage.roadAccessPendingPlots} accesos por verificar · máximo 30 m longitudinales · MT no equivale a suministro`:`${r.length} / ${this.audit.counts.physicalSpans} vanos · ${this.audit.counts.poles} postes · ${this.audit.counts.shortSpans} vanos a revisar (<5 m)`,this.rowsEl.style.height=r.length*38+`px`,this.rowsEl.replaceChildren();for(let e=i;e<a;e++){let n=r[e],i=this.doc.createElement(`button`);i.className=`rocha-span-row`,i.style.top=e*38+`px`,t?(i.dataset.plot=n.plotId,i.setAttribute(`aria-pressed`,n.plotId===this.selectedPlotId?`true`:`false`),i.textContent=`Lote ${n.plotId} · ${n.rowId} · ${n.poleId} · L ${n.longitudinalM.toFixed(3)} m${n.status===`conditional-reservation`?` · Reserva pendiente`:n.accessPending?` · Acceso pendiente`:``}`):(i.dataset.span=n.id,i.setAttribute(`aria-pressed`,n.id===this.selectedId?`true`:`false`),i.textContent=`${n.from} → ${n.to} · H ${n.horizontalM.toFixed(3)} m${n.rowIds?` · `+n.rowIds.join(`, `):``}${n.flags.length?` · Revisar`:``}`),this.rowsEl.append(i)}}selectPlot(e){let t=this.audit.coverage?.plots.find(t=>t.plotId===e);if(!t||!this.available()||this.app.transformerInspection?.active||this.app.positioningModeActive)return!1;let n=this.audit.rows.filter(e=>e.from===t.poleId||e.to===t.poleId),r=n.find(e=>e.rowIds?.includes(t.rowId))||n[0];return!r||!this.selectSpan(r.id)?!1:(this.selectedPlotId=e,this.detail&&(this.detail.textContent=Tg(t)),this.table&&!this.table.hidden&&this.renderTable(!1),!0)}selectSpan(e){let t=this.byId?.get(e);if(!t||!this.available()||this.app.transformerInspection?.active||this.app.positioningModeActive)return!1;this.selectedId=e,this.app.overheadMeasurementsEnabled=!0;let[n,r]=t.reference,i=(n[0]+r[0])/2,a=(n[2]+r[2])/2,o=Math.max(12,t.horizontalM*.85),s=r[0]-n[0],c=r[2]-n[2],l=t.horizontalM||1,u=this.app.camera.position.clone().set(i-c/l*o,n[1]+14+t.horizontalM*.2,a+s/l*o);return this.app.setFreeCam(!0),this.app.fly.setPose(u,Math.atan2(u.x-i,u.z-a),Math.atan2(n[1]+2-u.y,o)),this.app.fly.velocity.set(0,0,0),this.detail&&(this.detail.textContent=wg(t)),this.table&&!this.table.hidden&&this.renderTable(!1),!0}closeTable(){this.table&&!this.table.hidden&&(this.table.hidden=!0,this.restoreInput(),this.tableFocus?.focus?.(),this.blockerKey=null)}dispose(){this.disposed||(this.disposed=!0,this.restoreInput(),this.abort.abort(),this.observer?.disconnect(),this.root?.remove(),this.style?.remove(),this.table?.remove(),this.visibleSpanIds.length=0,this.labelBounds.length=0,this.audit=null,this.index=null,this.app.overheadMeasurements===this&&(this.app.overheadMeasurements=null,this.app.overheadMeasurementsEnabled=!1,delete this.app.setOverheadMeasurementsEnabled))}},kg={Calm:{wind:3.5,fetch:40,chop:.75,swell:.28,surf:.18,period:11,whitecaps:.2},Breezy:{wind:7,fetch:120,chop:.9,swell:.48,surf:.34,period:9,whitecaps:.5},Choppy:{wind:12,fetch:300,chop:1.05,swell:.68,surf:.56,period:8.5,whitecaps:.75},Storm:{wind:20,fetch:900,chop:1.2,swell:1,surf:.9,period:12,whitecaps:1}},Ag=class{constructor(e,t=new Ch){this.app=e,this.ui=t,e.worldId===`rocha`&&(t.startEl.querySelector(`.tw-start-title`).textContent=`ROCHA · TIDEWATER`,t.startEl.querySelector(`.tw-start-keys`).innerHTML=`<span>WASD · Move</span><span>Mouse · Look</span><span>F · Walk / fly</span><span>H · Settings</span>`,t.helpEl.querySelector(`.tw-help-guide`).textContent=`Explore Rocha with WASD and the mouse. F switches walking and flying; Shift moves faster. Maps contains review cameras and the immutable Surveyed terrain inspection. Facilities are exterior scenery; the homes on lots 775 and 776 have walkable interiors. Look at a nearby door and press E to open it.`);let n=e.fft,r=e.shore,i=this.s={wind:n.local.windSpeed,windDir:n.local.windDirection,fetch:n.local.fetch,chop:n.choppiness.value,swell:n.swell.scale,whitecaps:.5,clarity:1,surf:r.amplitude.value,period:r.period.value,gamma:r.gamma.value,curl:r.curl.value,caustics:e.caustics?e.caustics.strength.value:1,time:e.settings.timeOfDay,advance:e.settings.timeSpeed!==0,timeSpeed:e.settings.timeSpeed||.05,clouds:e.clouds?e.clouds.coverage.value:.45,cirrus:e.clouds&&e.clouds.cirrus?e.clouds.cirrus.value:.5,exposure:0,fov:e.camera.fov,camMode:`third`,ao:e.post.params.aoStrength.value,bloom:e.post.params.bloom.value,flare:e.post.flare?e.post.flare.strength.value:1,vignette:e.post.params.vignette.value,saturation:e.post.params.saturation.value,contrast:e.post.params.contrast.value,grain:e.post.params.grain.value,renderScale:e.settings.renderScale,shadows:!0},a=()=>{n.local.windSpeed=i.wind,n.local.windDirection=i.windDir,n.local.fetch=i.fetch,n.swell.scale=i.swell,n.updateSpectrumUniforms();let e=f.degToRad(i.windDir);h.windDir.value.set(Math.cos(e),Math.sin(e)),h.windSpeed.value=i.wind},o=()=>{n.foamBias.value=.5+.16*i.whitecaps+.01*f.clamp(i.wind-7,-5,12),n.foamDecay.value=.6-.35*i.whitecaps},s=()=>{let e=1/Math.max(.2,i.clarity);h.waterAbsorption.value.set(.42,.075,.035).multiplyScalar(.6+.4*e),h.waterScattering.value.set(.012,.018,.024).multiplyScalar(e*e)},c=t.addTab(`maps`,`Maps`,`layers`),l=c.addFolder(`Posicionamiento 1 mm`,{icon:`layers`}),u=document.createElement(`p`);u.textContent=`Vista pausada · referencia XYZ de sólo lectura. Paso de 1 mm; no acredita precisión del levantamiento.`,u.style.cssText=`font:inherit;line-height:1.5;margin:6px 12px;opacity:.8`,l.body.append(u),l.addButton({label:`Abrir vista de precisión`,onClick:()=>e.openPositioningMode().catch(e=>t.toast(e.message))});let d=c.addFolder(`Environment`,{icon:`layers`});if(i.world=e.worldId,d.addSelect({label:`Map`,object:i,key:`world`,options:[{label:`Tidewater island`,value:`tidewater`},{label:`Rocha · measured layout`,value:`rocha`}],onChange:e=>{let t=new URLSearchParams(location.search);t.set(`world`,e),t.delete(`bench`),location.search=t.toString()}}),e.worldId===`rocha`){d.addButton({label:`Ver yate en el lago grande`,onClick:()=>window.__view(`lakeYacht`)});let n=c.addFolder(`Luz de Mar · entrance lake`,{icon:`boat`});if(n.addInfo({label:`Azimut Grande 36M`,get:()=>`35.23 × 7.47 m · 2.01 m draft`}),n.addButton({label:`View Luz de Mar`,onClick:()=>window.__view(`luzDeMar`)}),n.addButton({label:`Walk aboard · main saloon`,onClick:()=>e.boardLuzDeMar()}),n.addButton({label:`Leave yacht`,onClick:()=>e.leaveLuzDeMar()}),i.surveyed=e.terrainData.surveyed,d.addToggle({label:`Surveyed terrain`,object:i,key:`surveyed`,onChange:t=>{e.rainfall?.close(),e.setSurveyedTerrain(t)},tooltip:`Original CAD elevations: removes proposed water beds and water previews.`}),d.addInfo({label:`Layout`,get:()=>e.containerHomes?.length?`776 lotes · viviendas de muestra en 775 y 776`:`776 undeveloped plots · metres`}),d.addInfo({label:`Registration`,get:()=>(e.world.metadata.registration.maxBoundaryErrorM*100).toFixed(1)+` cm maximum boundary error`}),d.addInfo({label:`Elevations`,get:()=>`14.964–60 m · source datum unidentified`}),d.addInfo({label:`Water beds & buildings`,get:()=>`Proposed vertical dimensions are visual estimates`}),e.world.data.electricalInfrastructure){let t=c.addFolder(`Electrical infrastructure`,{icon:`layers`});t.addInfo({label:`Placement`,get:()=>`Illustrative · 100 m north of the main entrance`}),t.addInfo({label:`Equipment`,get:()=>`Rymel 150 kVA exterior · 3 cutouts · 3 arresters`}),t.addInfo({label:`Feed`,get:()=>`13.8 kV visual reference · underground conduits`}),t.addInfo({label:`Reality`,get:()=>`Fictional installation · visual rating only; supply unspecified`}),t.addInfo({label:`Ground support`,get:()=>`Estimated elevation · excluded from rainfall model`}),t.addButton({label:`Pole · 100 m north`,onClick:()=>window.__view(`electricalPole`)}),t.addButton({label:`Inspect transformer interior`,onClick:()=>e.transformerInspection.open()}),t.addInfo({label:`Interior`,get:()=>`Documented parts · estimated internal arrangement`})}if(e.world.electricalNetwork){let n=c.addFolder(`Red eléctrica propuesta`,{icon:`layers`}),r=e.electricalNetwork,a=()=>e.activeElectricalNetwork.record;i.electricalNetworkVisible=r.visible,i.undergroundRoutes=r.technicalVisible,i.networkStation=`T37`,n.addInfo({label:`Modo activo`,get:()=>e.electricalNetworkMode===`underground`?`Subterránea`:`Aérea`}),this.networkModeButton=n.addButton({label:e.electricalNetworkMode===`underground`?`Cambiar a aérea`:`Cambiar a subterránea`,onClick:()=>e.setElectricalNetworkMode(e.electricalNetworkMode===`underground`?`overhead`:`underground`)}),n.addToggle({label:`Mostrar red`,object:i,key:`electricalNetworkVisible`,onChange:t=>e.setElectricalNetworkVisible(t)}),new Og(e,t),this.overheadMeasurementsControl=n.addToggle({label:`Mostrar distancias entre postes`,object:e,key:`overheadMeasurementsEnabled`,onChange:t=>e.setOverheadMeasurementsEnabled(t),tooltip:`Distancia horizontal entre ejes del modelo; no es longitud de cable ni precisión de levantamiento.`}),this.overheadSpanTableButton=n.addButton({label:`Tabla de vanos`,onClick:()=>e.overheadMeasurements.openTable()}),this.overheadCoverageTableButton=n.addButton({label:`Frentes de lotes · MT`,onClick:()=>e.overheadMeasurements.openTable(`coverage`)}),this.overheadMeasurementsControl.setEnabled(e.electricalNetworkMode===`overhead`&&r.visible),this.overheadSpanTableButton.setEnabled(e.electricalNetworkMode===`overhead`&&r.visible),this.overheadCoverageTableButton.setEnabled(e.electricalNetworkMode===`overhead`&&r.visible&&!!e.world.electricalNetworks.overhead.coverage),e.overheadMeasurements.syncAvailability(),this.undergroundRoutesControl=n.addToggle({label:`Mostrar recorridos enterrados`,object:i,key:`undergroundRoutes`,onChange:t=>e.setUndergroundRoutesVisible(t)}),this.undergroundRoutesControl.setEnabled(e.electricalNetworkMode===`underground`),n.addInfo({label:`Estado`,get:()=>r.message||`Alternativa propuesta · conexión pendiente de Afinia`}),n.addInfo({label:`Cobertura`,get:()=>a().stations.length+` estaciones · 776 lotes · 17 locales · zonas comunes`}),n.addInfo({label:`Alcance`,get:()=>e.electricalNetworkMode===`overhead`?`Sólo MT · asignaciones de carga previstas; BT y acometidas no instaladas`:`MT, BT y acometidas propuestas`}),n.addInfo({label:`Elementos visibles`,get:()=>e.electricalNetworkMode===`overhead`?a().counts.poles+` apoyos MT · vanos hasta `+a().constructionEstimates.maximumSpanM+` m`:a().counts.accessCovers+` tapas compartidas · cables enterrados`}),n.addInfo({label:`Hileras de MT`,get:()=>e.electricalNetworkMode===`overhead`&&a().coverage?a().rows.length+` hileras · objetivo 55 m; extremos, curvas y cruces justificados`:`Consultar la alternativa aérea`}),n.addInfo({label:`Proximidad por corredor`,get:()=>e.electricalNetworkMode===`overhead`&&a().coverage?a().coverage.coveredPlots+` frentes asociados a vía · `+a().coverage.conditionalReservationPlots+` reservas pendientes · `+(e.overheadNetwork?.stats.roadAccessPendingFrontages??0)+` accesos de borde por verificar · hasta 30 m longitudinales; no acredita suministro`:`No aplica a la red subterránea`}),this.networkStationControl=n.addSelect({label:`Estación`,object:i,key:`networkStation`,options:a().stations.map(e=>({label:e.id+` · `+e.ratingKVA+` kVA`,value:e.id}))}),this.syncNetworkStations=()=>{a().stations.some(e=>e.id===i.networkStation)||(i.networkStation=a().stations[0].id),this.networkStationControl.setOptions(a().stations.map(e=>({label:e.id+` · `+e.ratingKVA+` kVA`,value:e.id})))};let o=()=>a().stations.find(e=>e.id===i.networkStation)||a().stations[0];n.addInfo({label:`Carga asignada`,get:()=>{let e=o();return e.plots+` lotes · `+e.shops+` locales · `+e.baselineKVA+` kVA de estudio`}}),n.addInfo({label:`Reservas legales`,get:()=>a().stations.length+` ubicaciones pendientes de acreditación`}),n.addInfo({label:`Ubicación`,get:()=>o().legalAvailability||o().reservationStatus}),n.addInfo({label:`Espacio reservado`,get:()=>e.electricalNetworkMode===`underground`?o().placement.baseAreaM2.toFixed(2)+` m² de base · `+o().placement.serviceAreaM2.toFixed(2)+` m² con acceso estimado`:`Montaje MT condicionado · `+o().poleTotalM+` m totales de poste`}),n.addInfo({label:`Reubicación`,get:()=>e.electricalNetworkMode===`underground`?o().placement.displacementM.toFixed(1)+` m · base y acceso fuera de lotes y pavimento`:`Envolvente junto al borde, fuera de circulación · reservas pendientes`}),n.addInfo({label:`Drenaje exploratorio`,get:()=>e.electricalNetworkMode===`underground`?Number.isFinite(o().placement.hydraulicAudit?.maxDepthM)?(o().placement.hydraulicAudit.maxDepthM*100).toFixed(1)+` cm en nueva reserva · escenario exploratorio`:o().placement.placementAudit.hydraulicStatus:`Cribado hipotético; revisar antes del diseño definitivo`}),n.addInfo({label:`Diseño pendiente`,get:()=>e.electricalNetworkMode===`underground`?`Profundidad, ductos, cámaras, protecciones y reservas sin aprobar`:`Tensiones, gálibos, protecciones y reservas sin aprobar`}),n.addButton({label:`Ver estación seleccionada`,onClick:()=>{let t=o(),[n,r]=t.position,i=e.electricalNetworkMode===`underground`,a=i?4:12;e.debugViews.networkSelected={p:[n+Math.sin(t.yaw||0)*-a,t.baseY+(i?2.5:8),r+Math.cos(t.yaw||0)*-a],yaw:(t.yaw||0)+Math.PI,pitch:-.18,time:e.settings.timeOfDay},window.__view(`networkSelected`)}}),n.addButton({label:`Inspeccionar transformador`,onClick:()=>{r.busy||(r.visible||e.setElectricalNetworkVisible(!0),e.transformerInspection.open(i.networkStation))}}),n.addButton({label:`Vista general`,onClick:()=>window.__view(e.electricalNetworkMode===`underground`?`undergroundNetwork`:`overheadNetwork`)}),n.addInfo({label:`Interior`,get:()=>`Reconstrucción representativa · dimensiones estimadas`})}if(e.containerHomes?.length){let n=c.addFolder(`Viviendas contenedor`,{icon:`camera`});new ig(e,t),n.addToggle({label:`Mostrar medidas`,object:e,key:`containerMeasurementsEnabled`,onChange:t=>e.setContainerMeasurementsEnabled(t),tooltip:`Cotas exteriores dibujadas a mano; aparecen cerca de ambas viviendas.`}),i.containerHomeId=e.containerHomes.find(e=>e.record.variant===`large`)?.record.id||e.containerHomes[0].record.id;let r=()=>e.containerHomes.find(e=>e.record.id===i.containerHomeId),a=e=>window.__view((r().record.variant===`large`?`containerLarge`:`container`)+e),o;n.addSelect({label:`Vivienda`,object:i,key:`containerHomeId`,options:e.containerHomes.map(e=>({label:(e.record.variant===`large`?`Grande`:`Original`)+` · lote `+e.record.plotId,value:e.record.id})),onChange:()=>{o&&(o.src=`./rocha/solar-single-line-`+r().record.plotId+`.svg`)}}),n.addInfo({label:`Ubicación`,get:()=>{let e=r().record;return`Lote `+e.plotId+` · `+e.position.join(` / `)+` m`}}),n.addInfo({label:`Planta`,get:()=>{let e=r().record.dimensions;return e.length.toFixed(2)+` × `+e.width.toFixed(2)+` m`}}),n.addInfo({label:`Altura estimada`,get:()=>`2,80 m del módulo, sin apoyos · 2,54 m interior`}),n.addInfo({label:`Puertas y correderas`,get:()=>`Mira la puerta a ≤1,5 m y pulsa E`});let s=(t,n=!1)=>{r().setCutaway(!1),a(t),n&&e.setFreeCam(!1)};if(n.addButton({label:`Ver vivienda`,onClick:()=>s(`Front`)}),n.addButton({label:`Ir al acceso`,onClick:()=>s(`Entrance`,!0)}),n.addButton({label:`Sala`,onClick:()=>s(`Living`)}),n.addButton({label:`Cocina`,onClick:()=>s(`Kitchen`)}),n.addButton({label:`Dormitorio 1`,onClick:()=>s(r().record.variant===`large`?`Bedroom1`:`Bedroom`)}),n.addButton({label:`Dormitorio 2`,onClick:()=>s(r().record.variant===`large`?`Bedroom2`:`Bedroom`)}),n.addButton({label:`Noche`,onClick:()=>s(`Night`)}),n.addButton({label:`Planta sin cubierta`,onClick:()=>{r().setCutaway(!0),a(`Plan`)}}),n.addButton({label:`Restaurar cubierta`,onClick:()=>r().setCutaway(!1)}),e.solarSystems?.length){let i=n.addFolder(`Sistema solar`,{icon:`sun`}),a=()=>e.solarSystems.find(e=>e.record.homeId===r().record.id);i.addToggle({label:`Mostrar kits solares`,object:e,key:`containerSolarVisible`,onChange:t=>e.setContainerSolarVisible(t)}),i.addInfo({label:`Paneles`,get:()=>`4 × 620 W · 2,48 kWp DC por vivienda`}),i.addInfo({label:`Microinversor`,get:()=>`HMS-2000-4T-NA · 1,918 kVA continuo · pico 2 kVA`}),i.addInfo({label:`Picos solares`,get:()=>`La potencia DC puede superar la salida AC; posible recorte`}),i.addInfo({label:`Conexión`,get:()=>{let e=a().record;return e.serviceId+` → `+e.stationId+` · `+e.phasePair+` · lateral privado `+e.lateral.lengthM.toFixed(1)+` m`}}),i.addInfo({label:`Equipos`,get:()=>`Rieles, fijaciones, 4 entradas MPPT, desconectador, SPD, interruptor, medidor bidireccional, tablero y monitor`}),i.addInfo({label:`Sin baterías`,get:()=>`Sin respaldo: la generación se detiene si falla la red`}),i.addInfo({label:`Puesta a tierra`,get:()=>`Marcos, rieles, inversor y vivienda unidos a tierra común`}),i.addInfo({label:`Estado`,get:()=>`Propuesto · 208/120 V de estudio · aprobación Afinia, RETIE, estructura y exportación pendientes`}),i.addInfo({label:`Altura del módulo`,get:()=>`Las medidas de 2,80 m excluyen paneles y soportes`});for(let[e,t]of[[`Roof`,`Ver paneles`],[`Equipment`,`Ver equipos`],[`Connection`,`Ver conexión`]])i.addButton({label:t,onClick:()=>{r().setCutaway(!1),window.__view(`solar`+r().record.plotId+e)}});o=document.createElement(`img`),o.src=`./rocha/solar-single-line-`+r().record.plotId+`.svg`,o.alt=`Esquema unifilar propuesto: cuatro entradas independientes, inversor, protecciones, bus de vivienda después del medidor, servicio propio y tierra común`,o.style.cssText=`width:100%;height:auto;margin-top:10px;border-radius:6px`,i.body.append(o);let s=document.createElement(`dialog`);s.className=`tw-interactive`,s.style.cssText=`padding:12px;border:1px solid #819383;border-radius:12px;background:#fcf8ed;max-height:90vh;max-width:90vw;overflow:auto`;let c=document.createElement(`button`);c.textContent=`Cerrar esquema`,c.style.cssText=`display:block;margin:0 0 8px auto;padding:8px 14px`,c.onclick=()=>s.close();let l=document.createElement(`img`);l.alt=o.alt,l.style.cssText=`display:block;width:min(580px,78vw);height:auto`,s.append(c,l),t.root.append(s),e.solarDiagram=s,i.addButton({label:`Ampliar esquema unifilar`,onClick:()=>{l.src=o.src,s.showModal()}})}}let r=c.addFolder(`Explore Rocha`,{icon:`camera`}),a=document.createElement(`img`);a.src=`./rocha/minimap.svg`,a.alt=`Rocha map: 776 plot boundaries, roads, 17 locales, 91 parking spaces, facilities, landscaping, water bodies and illustrative pole marker; north is up`,a.style.cssText=`width:100%;height:auto;border-radius:6px`,r.body.append(a),e.world.electricalNetwork&&(this.networkMap=a,a.src=e.electricalNetwork.visible?e.electricalNetworkMode===`underground`?`./rocha/underground-minimap.svg`:`./rocha/overhead-minimap.svg`:`./rocha/minimap.svg`,a.alt+=`; proposed alternative network and 38 station markers`),e.electricalNetwork?.publish();for(let t of Object.keys(e.world.views))r.addButton({label:e.world.viewLabels[t]||t,onClick:()=>window.__view(t)});e.rainfall?.addUI(c)}let p=t.addTab(`ocean`,`Ocean`,`ocean`),m=p.addFolder(`Sea state`,{icon:`wind`});m.addPresets({label:`Conditions`,active:`Breezy`,presets:Object.keys(kg).map(e=>({label:e,icon:e.toLowerCase(),apply:()=>{let t=kg[e];Object.assign(i,t),a(),o(),n.choppiness.value=i.chop,r.amplitude.value=i.surf,r.period.value=i.period}}))}),m.addSlider({label:`Wind speed`,object:i,key:`wind`,min:.5,max:30,step:.1,unit:`m/s`,tooltip:`Wind 10 m above the sea. Drives the local wind waves, whitecaps and spray.`,onChange:()=>{a(),o()}}),m.addSlider({label:`Wind direction`,object:i,key:`windDir`,min:0,max:360,step:1,unit:`°`,onChange:a}),m.addSlider({label:`Fetch`,object:i,key:`fetch`,min:5,max:2e3,log:!0,unit:`km`,tooltip:`Distance the wind has blown over open water: longer fetch, longer and higher waves.`,onChange:a}),m.addSlider({label:`Choppiness`,object:i,key:`chop`,min:0,max:1.6,step:.01,tooltip:`Horizontal displacement: sharp crests, wide troughs.`,onChange:e=>{n.choppiness.value=e}}),m.addSlider({label:`Ocean swell`,object:i,key:`swell`,min:0,max:2,step:.01,onChange:a}),m.addSlider({label:`Whitecaps`,object:i,key:`whitecaps`,min:0,max:1,step:.01,onChange:o}),p.addFolder(`Water`,{icon:`droplet`}).addSlider({label:`Clarity`,object:i,key:`clarity`,min:.3,max:2,step:.01,tooltip:`Lower = more suspended sediment and plankton (greener, murkier).`,onChange:s});let g=t.addTab(`shore`,`Shore`,`shore`),_=g.addFolder(`Surf`,{icon:`wave`});if(_.addSlider({label:`Wave height`,object:i,key:`surf`,min:0,max:1.4,step:.01,unit:`m`,format:e=>`${(e*2).toFixed(2)} m`,onChange:e=>{r.amplitude.value=e}}),_.addSlider({label:`Wave period`,object:i,key:`period`,min:5,max:16,step:.1,unit:`s`,onChange:e=>{r.period.value=e}}),_.addSlider({label:`Breaking depth ratio`,object:i,key:`gamma`,min:.5,max:1.1,step:.01,tooltip:`Waves break when height exceeds this fraction of the depth.`,onChange:e=>{r.gamma.value=e}}),_.addSlider({label:`Curl`,object:i,key:`curl`,min:0,max:1.5,step:.01,onChange:e=>{r.curl.value=e}}),e.breakers&&(i.spray=e.breakers.params.spray.value,i.lip=e.breakers.params.sheet.value,_.addSlider({label:`Spray`,object:i,key:`spray`,min:0,max:2,step:.01,tooltip:`Droplets and mist thrown off breaking crests.`,onChange:t=>{e.breakers.params.spray.value=t}}),_.addSlider({label:`Lip sheet`,object:i,key:`lip`,min:0,max:1.5,step:.01,tooltip:`The thin sheet of water thrown forward by plunging breakers.`,onChange:t=>{e.breakers.params.sheet.value=t}})),e.wake){let t=g.addFolder(`Boat wake`,{icon:`wave`,open:!1});i.wakeHeight=e.wake.amplitude.value,i.wakeFoam=e.wake.foamGain.value,t.addSlider({label:`Wake height`,object:i,key:`wakeHeight`,min:0,max:2,step:.01,onChange:t=>{e.wake.amplitude.value=t}}),t.addSlider({label:`Wake foam`,object:i,key:`wakeFoam`,min:0,max:1.5,step:.01,onChange:t=>{e.wake.foamGain.value=t}})}e.caustics&&g.addFolder(`Caustics`,{icon:`sun`,open:!1}).addSlider({label:`Intensity`,object:i,key:`caustics`,min:0,max:2,step:.01,onChange:t=>{e.caustics.strength.value=t}});let v=t.addTab(`sky`,`Sky`,`sky`),y=v.addFolder(`Sun`,{icon:`clock`});y.addTimeOfDay({object:e.settings,key:`timeOfDay`}),y.addSlider({label:`Sun azimuth`,object:e.settings,key:`sunAzimuth`,min:-180,max:180,step:1,format:e=>`${Math.round(e)}°`,tooltip:`Turns the sun's path around the island (0 = the real path: rises in the east, sets in the west).`});let b=null;y.addToggle({label:`Advance time`,object:i,key:`advance`,onChange:t=>{e.settings.timeSpeed=t?i.timeSpeed:0,b.setVisible(t)}}),b=y.addSlider({label:`Time speed`,object:i,key:`timeSpeed`,min:.002,max:1,log:!0,unit:`h/s`,onChange:t=>{i.advance&&(e.settings.timeSpeed=t)}}).setVisible(i.advance);let x=v.addFolder(`Atmosphere`,{icon:`cloud`});e.clouds&&x.addSlider({label:`Cloud cover`,object:i,key:`clouds`,min:0,max:1,step:.01,format:e=>`${Math.round(e*100)}%`,onChange:t=>{e.clouds.coverage.value=t}}),e.clouds&&e.clouds.cirrus&&x.addSlider({label:`Cirrus`,object:i,key:`cirrus`,min:0,max:1,step:.01,format:e=>`${Math.round(e*100)}%`,onChange:t=>{e.clouds.cirrus.value=t}}),e.haze&&(i.haze=e.haze.density.value,i.shafts=e.haze.shafts.value,x.addSlider({label:`Haze`,object:i,key:`haze`,min:0,max:4,step:.05,tooltip:`Aerial perspective and marine haze density (1 = about 20 km visibility at sea level, 0 = clear air).`,onChange:t=>{e.haze.density.value=t}}),x.addSlider({label:`Sun shafts`,object:i,key:`shafts`,min:0,max:3,step:.05,tooltip:`Volumetric light shafts and crepuscular rays in the haze (shadows of palms, the pier, hills and clouds). 0 turns them off.`,onChange:t=>{e.haze.shafts.value=t}})),e.airMotes&&(i.air=e.airMotes.intensity.value,x.addSlider({label:`Air particles`,object:i,key:`air`,min:0,max:2,step:.01,tooltip:`Dust, pollen, salt haze, seed fluff and the odd gnat drifting in the air: they catch the light when backlit by the sun. 0 turns them off.`,onChange:t=>{e.airMotes.intensity.value=t}})),x.addSlider({label:`Exposure`,object:i,key:`exposure`,min:-3,max:3,step:.1,unit:`EV`,onChange:t=>{e.settings.exposure=.55*2**t}});let S=t.addTab(`camera`,`Camera`,`camera`).addFolder(`View`,{icon:`camera`});S.addSelect({label:`Boat camera`,object:i,key:`camMode`,options:[{label:`1st person`,value:`first`},{label:`3rd person`,value:`third`}],onChange:t=>{e.player.camMode=t}}),S.addSlider({label:`Field of view`,object:i,key:`fov`,min:35,max:100,step:1,unit:`°`,onChange:t=>{e.camera.fov=t,e.camera.updateProjectionMatrix()}}),S.addButton({label:`Free camera (F)`,icon:`camera`,onClick:()=>e.setFreeCam(!e.freeCam)});let C=t.addTab(`effects`,`Effects`,`effects`).addFolder(`Post-processing`,{icon:`sparkles`}),w=e.post.params;if(C.addSlider({label:`Ambient occlusion`,object:i,key:`ao`,min:0,max:1.5,step:.01,onChange:e=>{w.aoStrength.value=e}}),i.bounce=Ot.strength.value,C.addSlider({label:`Bounce light`,object:i,key:`bounce`,min:0,max:2,step:.01,tooltip:`Sunlight reflected off the ground (bright sand) onto undersides and shaded faces: pier, eaves, hulls, trunks. 0 = off.`,onChange:e=>{Ot.strength.value=e}}),i.sharpen=w.sharpen.value,C.addSlider({label:`Sharpen`,object:i,key:`sharpen`,min:0,max:1,step:.01,tooltip:`Contrast-adaptive sharpening after the temporal anti-aliasing.`,onChange:e=>{w.sharpen.value=e}}),e.post.motionBlur){let t=e.post.motionBlur.shutter;i.motionBlur=t.value,C.addSlider({label:`Motion blur`,object:i,key:`motionBlur`,min:0,max:1,step:.05,format:e=>e>0?`${Math.round(e*360)}°`:`Off`,tooltip:`Camera and object motion blur, as a shutter angle (180° = film look). 0 turns it off.`,onChange:e=>{t.value=e}})}C.addSlider({label:`Bloom`,object:i,key:`bloom`,min:0,max:.3,step:.005,onChange:e=>{w.bloom.value=e}}),e.post.flare&&C.addSlider({label:`Lens flare`,object:i,key:`flare`,min:0,max:2,step:.05,onChange:t=>{e.post.flare.strength.value=t}}),C.addSlider({label:`Saturation`,object:i,key:`saturation`,min:.5,max:1.5,step:.01,onChange:e=>{w.saturation.value=e}}),C.addSlider({label:`Contrast`,object:i,key:`contrast`,min:.8,max:1.3,step:.01,onChange:e=>{w.contrast.value=e}}),C.addSlider({label:`Vignette`,object:i,key:`vignette`,min:0,max:1,step:.01,onChange:e=>{w.vignette.value=e}}),C.addSlider({label:`Film grain`,object:i,key:`grain`,min:0,max:.06,step:.001,onChange:e=>{w.grain.value=e}});let T=t.addTab(`performance`,`Performance`,`performance`),E=T.addFolder(`Live`,{icon:`gauge`});E.addInfo({label:`Frame rate`,get:()=>`${(e.fps||0).toFixed(0)} fps`}),E.addInfo({label:`Water`,get:()=>e.waterEnabled?`On`:e.worldId===`rocha`?`Off · bounded flat water for physics`:`Off · invisible flat sea for physics`}),this.waterButton=E.addButton({label:e.waterEnabled?`Remove water`:`Restore water`,icon:`droplet`,onClick:()=>e.setWaterEnabled(!e.waterEnabled),tooltip:`Diagnostic comparison: removes water and its effects; gameplay keeps a flat sea for physics.`}),e.worldId===`rocha`&&(this.fastWaterButton=E.addButton({label:e.fastWater?`Use detailed water`:`Enable fast water`,icon:`droplet`,onClick:()=>{e.setFastWater(!e.fastWater);let t=new URL(location.href);t.searchParams.set(`fastWater`,e.fastWater?`1`:`0`),history.replaceState(history.state,``,t)},tooltip:`Lighter animated water with a yacht reflection. Detailed water returns automatically underwater.`}),E.addInfo({label:`Water renderer`,get:()=>e.sceneRenderer.waterEnabled?e.fastWaterActive?`Fast water`:e.fastWater?`Detailed · waterline / underwater`:`Detailed water`:`Hidden`})),E.addInfo({label:`CPU per frame`,get:()=>`${(e.cpuMs||0).toFixed(2)} ms`}),E.addInfo({label:`Render size`,get:()=>`${e.sceneRenderer.width} × ${e.sceneRenderer.height}`});let O=T.addFolder(`Diagnostic quality`,{icon:`layers`});this.qualitySliders={},this.qualityState={};for(let[t,n]of[[`atmosphere`,`Atmosphere`],[`antiAliasing`,`Anti-aliasing quality`],[`sceneDetail`,`Vegetation & reef detail`]])this.qualityState[t]=e.qualityLevels[t]*100,this.qualitySliders[t]=O.addSlider({label:n,object:this.qualityState,key:t,min:0,max:100,stops:ee.map(e=>e*100),step:1,format:e=>D(e/100),tooltip:t===`antiAliasing`?`Full: temporal AA. Half: 6-step FXAA. 5%, 10%, 20%: 1-, 2-, 3-step FXAA. Off: unfiltered. Percentages are budgets, not guaranteed GPU cost.`:t===`sceneDetail`?`Visual diagnostic: changes decorative rendering; gameplay and collision data remain.`:`Reduces sampling work while preserving cloud cover and haze density.`,onChange:n=>e.setQualityLevels({[t]:n/100})});O.addButton({label:`Reset to Full`,onClick:()=>e.setQualityLevels({atmosphere:1,antiAliasing:1,sceneDetail:1})});let k=T.addFolder(`Quality`,{icon:`layers`});k.addSlider({label:`Render scale`,object:i,key:`renderScale`,min:.5,max:1,step:.05,format:e=>`${Math.round(e*100)}%`,tooltip:`Internal resolution; the temporal upscaler reconstructs the full output resolution.`,onChange:t=>e.setRenderScale(t)}),i.aa=e.post.taau.jitterPhaseOverride,this.temporalSamples=k.addSelect({label:`Temporal samples`,object:i,key:`aa`,tooltip:`Temporal anti-aliasing: each pixel averages this many sub-pixel sample positions over successive frames (it also smooths dithered fades and shadow noise). More samples cost nothing per frame but take a few more frames to settle.`,options:[{label:`2x`,value:2},{label:`4x`,value:4},{label:`8x`,value:8},{label:`16x`,value:16}],onChange:t=>{let n=Number(t);e.post.aaMode=`taa`,n>0&&(e.post.taau.jitterPhaseOverride=n)}}),k.addToggle({label:`Shadows`,object:i,key:`shadows`,onChange:t=>{e.shadows.enabled=t}}),i.ssr=!0,k.addToggle({label:`Water reflections`,object:i,key:`ssr`,tooltip:`Screen-space reflections of the pier, boats and hills on the water.`,onChange:t=>{e.waterMaterial.params.ssr.value=+!!t}}),this.syncQualityLevels(),this._t=0,e.worldId===`rocha`&&e.qs.has(`rainfall`)&&e.rainfall?.model.status===`ready`&&(e.rainfall.folder?.open(),t.selectTab(`maps`,!1),t.togglePanel(!0),requestAnimationFrame(()=>e.rainfall.folder?.head.scrollIntoView({block:`nearest`})))}syncQualityLevels(){for(let[e,t]of Object.entries(this.qualitySliders))t.setValue(this.app.qualityLevels[e]*100,!1);this.temporalSamples?.setEnabled(this.app.qualityLevels.antiAliasing===1)}update(e){let t=this.app,r=this.ui;t.containerMeasurements?.update(e),t.overheadMeasurements?.update(e),r.setStats({fps:t.fps,frameMs:e*1e3}),this.s.renderScale=t.post.scale;let i=t.player;if(t.yachtWalk?.active){r.setMode(null),r.setPrompt(null),r.setBoatGauges({visible:!1}),r.setDepth({visible:!1});return}if(t.transformerInspection?.active){r.setMode(`Transformer interior`),r.setPrompt(`Esc`,`Return to map`),r.setBoatGauges({visible:!1}),r.setDepth({visible:!1});return}if(t.freeCam){r.setMode(`Free camera`),r.setPrompt(`F`,`Walk`),r.setBoatGauges({visible:!1}),r.setDepth({visible:!1});return}let a=i.mode===`boat`?`Boat · ${i.camMode===`first`?`1st`:`3rd`} person`:i.mode===`deck`?`On deck`:i.mode===`swim`?t.camera.position.y<(t.cameraWaterHeight??0)-.3?`Diving`:`Swimming`:`Walking`;r.setMode(a),i.prompt?r.setPrompt(i.prompt.key,i.prompt.text):r.setPrompt(null);let o=t.boatCtl;if(i.mode===`boat`){let e=o.forward(new n);r.setBoatGauges({visible:!0,throttle:o.throttle,rpm:o.rpm,speedKnots:o.speed*1.94384,heading:(f.radToDeg(Math.atan2(e.x,-e.z))+360)%360})}else r.setBoatGauges({visible:!1});let s=(t.cameraWaterHeight??0)-t.camera.position.y;r.setDepth({visible:i.mode===`swim`&&s>.3,meters:s})}};if(/[?&]bench\b/.test(location.search)){let e=window.requestAnimationFrame.bind(window),t=window.cancelAnimationFrame.bind(window);window.requestAnimationFrame=t=>document.visibilityState===`hidden`?setTimeout(()=>t(performance.now()),16):e(t),window.cancelAnimationFrame=e=>(clearTimeout(e),t(e))}var jg=new Ch,Mg=new Om;window.__app=Mg,window.__ui=jg,Mg.init((e,t,n)=>jg.setLoading(e,t,n)).then(async()=>{Mg.ui=new Ag(Mg,jg),jg.setLoading(1,`Ready`),await jg.hideLoader(),Mg.qs.has(`bench`)?(window.__bench=new(await(e(async()=>{let{Bench:e}=await import(`./Bench-CI-ryIGp.js`);return{Bench:e}},__vite__mapDeps([24,11,2,3,9,10,12,14]),import.meta.url))).Bench(Mg),Mg.qs.has(`auto`)&&(window.__job=window.__bench.auto(Mg.qs.get(`auto`),{runs:Number(Mg.qs.get(`runs`))||1})),Mg.qs.has(`wdbg`)&&Mg.waterMaterial&&(Mg.waterMaterial.debugMode.value=Number(Mg.qs.get(`wdbg`))),Mg.qs.has(`shots`)&&(window.__job=window.__bench.shots(Mg.qs.get(`shots`).split(`,`),{tag:Mg.qs.get(`tag`)||`shot`,dt:Number(Mg.qs.get(`dt`))||0,seq:Number(Mg.qs.get(`seq`))||1,every:Number(Mg.qs.get(`every`))||1}))):Mg.start(),Mg.worldId===`rocha`&&Mg.yachtWalk?.active||jg.showStartOverlay(()=>{(Mg.rainfall?.model.status!==`ready`||!jg.panelOpen)&&Mg.input.requestLock(),Mg.audio&&Mg.audio.resume()})}).catch(e=>{window.__localSetupError=e.message,console.error(e),jg.setLoadingError(`Something went wrong: `+e.message)});