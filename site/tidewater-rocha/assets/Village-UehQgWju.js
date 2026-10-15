import{C as e,D as t,E as n,O as r,S as i,_ as a,b as o,c as s,f as c,h as l,k as u,l as d,n as f,o as p,v as m,w as h,x as g}from"./Frame-CNet77I0.js";import{t as _}from"./GPU-CxPpnRCf.js";import{n as v,r as y}from"./Texture-8f_StRFj.js";import{A as b,D as x,E as S,_ as C,b as w,t as T,v as E,x as D}from"./common-HBn3Movl.js";import{t as ee}from"./Material-tyLfv2Wn.js";function O(e){let t=e.length,n=0;for(let r=t-1,i=0;i<t;r=i++)n+=e[r].x*e[i].y-e[i].x*e[r].y;return n*.5}var k=e=>O(e)<0;function A(e){let t=e.length;t>2&&e[t-1].x===e[0].x&&e[t-1].y===e[0].y&&e.pop()}var j=(e,t,n)=>(t.x-e.x)*(n.y-t.y)-(t.y-e.y)*(n.x-t.x),M=(e,t)=>e.x===t.x&&e.y===t.y;function te(e,t,n,r){return(n.x-r.x)*(e.y-r.y)>=(e.x-r.x)*(n.y-r.y)&&(e.x-r.x)*(t.y-r.y)>=(t.x-r.x)*(e.y-r.y)&&(t.x-r.x)*(n.y-r.y)>=(n.x-r.x)*(t.y-r.y)}function N(e,t){let n=0;for(let r=0,i=e.length-1;r<e.length;i=r++)n+=t[e[i]].x*t[e[r]].y-t[e[r]].x*t[e[i]].y;return n}function P(e,t,n){let r=0;for(let e=1;e<t.length;e++)n[t[e]].x>n[t[r]].x&&(r=e);let i=n[t[r]],a=1/0,o=-1,s=e.length;for(let t=0;t<s;t++){let r=n[e[t]],c=n[e[(t+1)%s]];if(r.y<=i.y&&i.y<=c.y||c.y<=i.y&&i.y<=r.y){if(r.y===c.y)continue;let e=r.x+(i.y-r.y)*(c.x-r.x)/(c.y-r.y);e>=i.x&&e<a&&(a=e,o=r.x>c.x?t:(t+1)%s)}}if(o<0)return e;let c={x:a,y:i.y},l=n[e[o]];if(a!==l.x||i.y!==l.y){let t=1/0,r=l.y<i.y?[i,l,c]:[i,c,l],a=o;for(let c=0;c<s;c++){let u=(a+c)%s,d=n[e[u]];if(d.x<i.x||u===a)continue;let f=n[e[(u+s-1)%s]],p=n[e[(u+1)%s]];if(!(j(f,d,p)<0)&&(d.x!==i.x||d.y!==i.y)||!ne(r,d))continue;let m=Math.abs(i.y-d.y)/(d.x-i.x||1e-12);(m<t||m===t&&d.x<l.x)&&(t=m,o=u,l=d)}}for(let t=0;t<s;t++){if(!M(n[e[t]],l))continue;let r=n[e[(t+s-1)%s]],a=n[e[(t+1)%s]],c=j(r,l,i)>=0,u=j(l,a,i)>=0;if(j(r,l,a)>=0?c&&u:c||u){o=t;break}}let u=t.slice(r).concat(t.slice(0,r));return e.slice(0,o+1).concat(u,[t[r],e[o]],e.slice(o+1))}function ne(e,t){let[n,r,i]=j(e[0],e[1],e[2])>=0?e:[e[0],e[2],e[1]];return te(n,r,i,t)}function re(e,t,n){let r=e.slice(),i=0;for(;r.length>3&&i++<1e5;){let e=r.length,i=!1;for(let a=0;a<2&&!i;a++)for(let o=0;o<e;o++){let s=r[(o+e-1)%e],c=r[o],l=r[(o+1)%e],u=t[s],d=t[c],f=t[l],p=j(u,d,f);if(a===0?p<=0:p<0)continue;let m=!0;if(p>0)for(let n=0;n<e;n++){let e=t[r[n]];if(!(M(e,u)||M(e,d)||M(e,f))&&te(u,d,f,e)){m=!1;break}}if(m){n.push([s,c,l]),r.splice(o,1),i=!0;break}}if(!i){let i=0,a=-1/0;for(let n=0;n<e;n++){let o=j(t[r[(n+e-1)%e]],t[r[n]],t[r[(n+1)%e]]);o>a&&(a=o,i=n)}n.push([r[(i+e-1)%e],r[i],r[(i+1)%e]]),r.splice(i,1)}}return r.length===3&&n.push([r[0],r[1],r[2]]),n}function ie(e,t=[]){A(e),t.forEach(A);let n=e.concat(...t),r=e.map((e,t)=>t),i=N(r,n)<0;i&&r.reverse();let a=e.length,o=t.map(e=>{let t=e.map((e,t)=>a+t);return a+=e.length,N(t,n)>0&&t.reverse(),t}).filter(e=>e.length>=3);o.sort((e,t)=>Math.max(...t.map(e=>n[e].x))-Math.max(...e.map(e=>n[e].x)));for(let e of o)r=P(r,e,n);let s=re(r,n,[]);if(i)for(let e of s){let t=e[0];e[0]=e[2],e[2]=t}return s}var ae={area:O,isClockWise:k,triangulateShape:ie},oe=class{constructor({label:e=`kernel`,modules:t=[],bindings:n={},code:r,workgroupSize:i=[64,1,1],defines:a={},entryPoint:o=`main`}){this.label=e,this.workgroupSize=i;let[c,l=1,u=1]=i,f=r.replace(/\bWG_X\b/g,c).replace(/\bWG_Y\b/g,l).replace(/\bWG_Z\b/g,u),p=s({modules:t,bindings:n,code:f,defines:a,stage:`compute`,label:e});this.source=p.code,this.bindings=p.bindings,this.group0=p.group0;let m=d(p.code,e);this.handle=_.computePipeline({label:e,layout:_.device.createPipelineLayout({bindGroupLayouts:[p.group0.layout,p.bindings.layout]}),compute:{module:m,entryPoint:o}}),this.timestampWrites=null}get pipeline(){return _.ready(this.handle)}dispatch(e,{pass:t=null,indirect:n=null}={}){let[r,i=1,a=1]=Array.isArray(e)?e:[e];if(!n&&(r===0||i===0||a===0))return;let o=e=>{e.setPipeline(_.ready(this.handle)),e.setBindGroup(0,this.group0.getBindGroup()),e.setBindGroup(1,this.bindings.getBindGroup()),n?e.dispatchWorkgroupsIndirect(n.buffer.getGPU?n.buffer.getGPU():n.buffer,n.offset||0):e.dispatchWorkgroups(r,i,a)};t?o(t):_.computePass(this.label,o,this.timestampWrites||void 0)}groups(e,t=1,n=1){let[r,i=1,a=1]=this.workgroupSize;return[Math.ceil(e/r),Math.ceil(t/i),Math.ceil(n/a)]}},se=new Map,F=null;function I(e){let t=se.get(e);return t||(F||=_.device.createShaderModule({label:`mipmap`,code:`
		struct VSOut { @builtin( position ) pos: vec4f, @location( 0 ) uv: vec2f };
		@vertex fn vs( @builtin( vertex_index ) i: u32 ) -> VSOut {
			let p = vec2f( f32( ( i << 1u ) & 2u ), f32( i & 2u ) );
			var o: VSOut;
			o.pos = vec4f( p * 2.0 - 1.0, 0.0, 1.0 );
			o.uv = vec2f( p.x, 1.0 - p.y );
			return o;
		}
		@group( 0 ) @binding( 0 ) var src: texture_2d<f32>;
		@group( 0 ) @binding( 1 ) var smp: sampler;
		@fragment fn fs( in: VSOut ) -> @location( 0 ) vec4f {
			return textureSampleLevel( src, smp, in.uv, 0.0 );
		}
	`}),t=_.device.createRenderPipeline({label:`mipmap `+e,layout:`auto`,vertex:{module:F,entryPoint:`vs`},fragment:{module:F,entryPoint:`fs`,targets:[{format:e}]},primitive:{topology:`triangle-list`}}),se.set(e,t),t)}var L=new WeakMap;function R(e,t,n){let r=L.get(e);if(r&&r.gpu===t)return r;let i=e.mipLevelCount,a=e.dimension===`3d`?1:e.depth,o=[],s=n.getBindGroupLayout(0);for(let n=0;n<a;n++)for(let r=1;r<i;r++){let i=t.createView({dimension:`2d`,baseMipLevel:r-1,mipLevelCount:1,baseArrayLayer:n,arrayLayerCount:1}),a=t.createView({dimension:`2d`,baseMipLevel:r,mipLevelCount:1,baseArrayLayer:n,arrayLayerCount:1}),c=_.device.createBindGroup({label:`mipmap `+e.label,layout:s,entries:[{binding:0,resource:i},{binding:1,resource:_.samplers.linearClamp}]});o.push({bg:c,desc:{label:`mipmap`,colorAttachments:[{view:a,loadOp:`clear`,storeOp:`store`,clearValue:[0,0,0,0]}]}})}return r={gpu:t,pipeline:n,steps:o},L.set(e,r),r}function ce(e,t=_.getEncoder()){if(e.mipLevelCount<2)return;let n=e.getGPU(),r=I(e.format),{steps:i}=R(e,n,r);for(let e=0;e<i.length;e++){let n=t.beginRenderPass(i[e].desc);n.setPipeline(r),n.setBindGroup(0,i[e].bg),n.draw(3),n.end()}}function z(e){let t=e>>>0;return function(){t=t+1831565813>>>0;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}var le=class{constructor(e=1){let t=z(e),n=new Uint8Array(256);for(let e=0;e<256;e++)n[e]=e;for(let e=255;e>0;e--){let r=Math.floor(t()*(e+1)),i=n[e];n[e]=n[r],n[r]=i}this.perm=new Uint8Array(512);for(let e=0;e<512;e++)this.perm[e]=n[e&255];this.grad=new Float32Array(512);for(let e=0;e<256;e++){let n=t()*Math.PI*2;this.grad[e*2]=Math.cos(n),this.grad[e*2+1]=Math.sin(n)}}noise(e,t){let n=Math.floor(e),r=Math.floor(t),i=e-n,a=t-r,o=n&255,s=r&255,c=this.perm,l=this.grad,u=c[o+c[s]],d=c[o+1+c[s]],f=c[o+c[s+1]],p=c[o+1+c[s+1]],m=l[u*2]*i+l[u*2+1]*a,h=l[d*2]*(i-1)+l[d*2+1]*a,g=l[f*2]*i+l[f*2+1]*(a-1),_=l[p*2]*(i-1)+l[p*2+1]*(a-1),v=i*i*i*(i*(i*6-15)+10),y=a*a*a*(a*(a*6-15)+10),b=m+(h-m)*v;return(b+(g+(_-g)*v-b)*y)*1.414}fbm(e,t,n=5,r=2,i=.5){let a=0,o=1,s=1,c=0;for(let l=0;l<n;l++)a+=this.noise(e*s+l*17.13,t*s-l*9.71)*o,c+=o,o*=i,s*=r;return a/c}ridged(e,t,n=5){let r=0,i=.5,a=1,o=1;for(let s=0;s<n;s++){let n=1-Math.abs(this.noise(e*a+s*31.7,t*a+s*11.3));n*=n,r+=n*i*o,o=n,i*=.5,a*=2.03}return r}},ue=(e,t,n)=>{let r=Math.min(1,Math.max(0,(n-e)/(t-e)));return r*r*(3-2*r)},de=(e,t,n)=>Math.min(n,Math.max(t,e)),fe=(e,t,n)=>e+(t-e)*n,pe={terrainSize:2048,terrainRes:2048,beach:{xMin:-150,xMax:170},pier:{x:55,zStart:-64,zEnd:40,deckHeight:2.3,width:2.6,headWidth:14,headDepth:7},boatDock:{position:new t(64.5,0,36.5),heading:0},village:{center:new t(40,0,-118),radius:95},reef:{center:new t(-78,0,58),radius:58},spawn:{position:new t(18,0,-60),yaw:Math.PI},start:{position:new t(53.6,0,-77),yaw:Math.PI},swellDir:new u(-.12,-1).normalize()};function me(e,t,n){let r=Math.imul(e,374761393)+Math.imul(t,668265263)+Math.imul(n,1274126177);return r=Math.imul(r^r>>>13,1274126177),r^=r>>>16,(r>>>0)/4294967296}var he=(e,t)=>e<=0?0:e<2*t?e*e/(4*t):e-t,B=Math.PI*2,ge=new Float64Array(2);function _e(e){e-=B*Math.round(e/B);let t=e*.5,n=t*t,r=t*(1-n*(1/6-n*(1/120-n*(1/5040-n/362880)))),i=1-n*(.5-n*(1/24-n*(1/720-n/40320)));ge[0]=1-2*r*r,ge[1]=2*r*i}var ve={octaves:5,cell:160,amp:36,gain:.5,lac:2,slope:1.1,branch:1,maxSlope:.9};function ye(e,t,n,r,i=ve.octaves,a=ve.cell,o=ve.amp){let s=0,c=0,l=0,u=o,d=a,f=1.5625;for(let a=0;a<i;a++){let i=n+c*ve.branch,o=r+l*ve.branch,p=Math.sqrt(i*i+o*o);p>ve.maxSlope&&(i*=ve.maxSlope/p,o*=ve.maxSlope/p);let m=o*ve.slope,h=-i*ve.slope,g=e/d,_=t/d,v=Math.floor(g),y=Math.floor(_),b=g-v,x=_-y,S=0,C=0,w=0,T=0;for(let e=-1;e<=1;e++)for(let t=-1;t<=1;t++){let n=v+t,r=y+e,i=b-t-.25-me(n,r,11+a)*.5,o=x-e-.25-me(n,r,57+a)*.5,s=i*i+o*o;if(s>=f)continue;let c=1-s/f,l=c*c*c;_e((i*m+o*h)*B),S+=ge[0]*l,C-=ge[1]*m*l,w-=ge[1]*h*l,T+=l}T>1e-6?(S/=T,C/=T,w/=T):S=1;let E=Math.exp(-3.4*(m*m+h*h));s+=u*(S-E),c+=u*C*B/d,l+=u*w*B/d,u*=ve.gain,d/=ve.lac}return s*.5}function be(e,t,n,r,i,a){let o=(i-n)/r-.5,s=(a-n)/r-.5;o=o<0?0:o>t-1.001?t-1.001:o,s=s<0?0:s>t-1.001?t-1.001:s;let c=o|0,l=s|0,u=o-c,d=s-l,f=l*t+c;return(e[f]*(1-u)+e[f+1]*u)*(1-d)+(e[f+t]*(1-u)+e[f+t+1]*u)*d}function xe(e,t,n=!0){let r=t*2,i=new Float32Array(r*t),a=new Float32Array(r*r),o=n?Se:Ce,s=o(.75),c=o(.25),l=e=>e<0?0:e>=t?t-1:e;for(let n=0;n<t;n++){let a=n*t;for(let t=0;t<r;t++){let o=t&1?t-1>>1:(t>>1)-1,u=t&1?c:s;i[n*r+t]=e[a+l(o-1)]*u[0]+e[a+l(o)]*u[1]+e[a+l(o+1)]*u[2]+e[a+l(o+2)]*u[3]}}for(let e=0;e<r;e++){let t=e&1?e-1>>1:(e>>1)-1,n=e&1?c:s,o=l(t-1)*r,u=l(t)*r,d=l(t+1)*r,f=l(t+2)*r,p=e*r;for(let e=0;e<r;e++)a[p+e]=i[o+e]*n[0]+i[u+e]*n[1]+i[d+e]*n[2]+i[f+e]*n[3]}return a}function Se(e){let t=e*e,n=t*e;return[-.5*n+t-.5*e,1.5*n-2.5*t+1,-1.5*n+2*t+.5*e,.5*n-.5*t]}function Ce(e){return[0,1-e,e,0]}function we(e,t,n,r,i=new Float32Array(t*n)){let a=new Float32Array(t*n),o=1/(2*r+1);for(let i=0;i<n;i++){let n=i*t,s=0;for(let i=-r;i<=r;i++)s+=e[n+Math.min(t-1,Math.max(0,i))];for(let i=0;i<t;i++)a[n+i]=s*o,s+=e[n+Math.min(t-1,i+r+1)]-e[n+Math.max(0,i-r)]}for(let e=0;e<t;e++){let s=0;for(let i=-r;i<=r;i++)s+=a[Math.min(n-1,Math.max(0,i))*t+e];for(let c=0;c<n;c++)i[c*t+e]=s*o,s+=a[Math.min(n-1,c+r+1)*t+e]-a[Math.max(0,c-r)*t+e]}return i}var Te=512;function Ee(e,t){let n=new Float32Array(e*e),r=new Float32Array(e*e);for(let i=0;i<e;i++)for(let a=0;a<e;a++){let o=me(a,i,t)*6.2831853;n[i*e+a]=Math.cos(o),r[i*e+a]=Math.sin(o)}return(t,i)=>{let a=Math.floor(t),o=Math.floor(i),s=t-a,c=i-o,l=(a%e+e)%e,u=(o%e+e)%e,d=l+1===e?0:l+1,f=u+1===e?0:u+1,p=u*e+l,m=u*e+d,h=f*e+l,g=f*e+d,_=n[p]*s+r[p]*c,v=n[m]*(s-1)+r[m]*c,y=n[h]*s+r[h]*(c-1),b=n[g]*(s-1)+r[g]*(c-1),x=s*s*s*(s*(s*6-15)+10),S=c*c*c*(c*(c*6-15)+10);return(_+(v-_)*x+(y-_+(_-v-y+b)*x)*S)*1.414}}function De(e,t,n){let r=[];for(let i=0;i<t;i++)r.push(Ee(e<<i,n+i*17));return(e,n)=>{let i=0,a=1,o=0,s=1;for(let c=0;c<t;c++)i+=r[c](e*s,n*s)*a,o+=a,a*=.5,s*=2;return i/o}}function Oe(e,t){let n=e+4,r=new Float32Array(n*n),i=new Float32Array(n*n),a=new Float32Array(n*n);for(let o=0;o<n;o++)for(let s=0;s<n;s++){let c=(s-2+e)%e,l=(o-2+e)%e;r[o*n+s]=me(c,l,t)+s-2,i[o*n+s]=me(c,l,t+1)+o-2,a[o*n+s]=me(c,l,t+2)}let o={f1:0,edge:0,id:0};return(e,t,s=2)=>{let c=Math.floor(e),l=Math.floor(t),u=99,d=0,f=0;for(let o=-1;o<=1;o++){let s=(l+o+2)*n+2+c;for(let n=-1;n<=1;n++){let o=s+n,c=r[o]-e,l=i[o]-t,p=c*c+l*l;p<u&&(u=p,d=a[o],f=o)}}let p=99;if(s>1){let a=r[f],o=i[f];for(let s=-2;s<=2;s++){let u=(l+s+2)*n+2+c;for(let n=-2;n<=2;n++){let s=u+n;if(s===f)continue;let c=r[s],l=i[s],d=c-a,m=l-o,h=Math.sqrt(d*d+m*m),g=((a+c)*.5-e)*d/h+((o+l)*.5-t)*m/h;g<p&&(p=g)}}}return o.f1=Math.sqrt(u),o.edge=p,o.id=d,o.dx=e-r[f],o.dy=t-i[f],o}}var ke=(e,t,n)=>{let r=Math.min(1,Math.max(0,(n-e)/(t-e)));return r*r*(3-2*r)},Ae=null;function je(){if(Ae)return Ae;let e=performance.now(),t=De(4,2,11),n=De(4,2,23),r=Oe(7,101),i=Oe(23,211),a=De(16,3,307),o=Oe(26,401),s=Oe(12,601),c=De(10,3,503),l=Ee(180,701),u=Ee(90,709),d=Oe(18,801),f=De(4,5,907),p=new Uint8Array(Te*Te*4);for(let e=0;e<Te;e++){let m=e/Te;for(let h=0;h<Te;h++){let g=h/Te,_=(e*Te+h)*4,v=g+t(g*4,m*4)*.035,y=m+n(g*4,m*4)*.035;v-=Math.floor(v),y-=Math.floor(y);let b=r(v*7,y*7),x=b.id*40,S=ke(0,.2,b.edge),C=((b.dx*Math.cos(x)+b.dy*Math.sin(x))*.5+(b.id-.5)*.22)*S,w=ke(0,.1+.08*b.id,b.edge),T=i(v*23,y*23,2),E=T.id*40,D=ke(0,.14,T.edge),ee=((T.dx*Math.cos(E)+T.dy*Math.sin(E))*.22+(T.id-.5)*.1)*D,O=a(g*16,m*16),k=(.45+C+ee*.6+.16*O)*(.66+.34*w)*(.94+.06*D);b=o(g*26,m*26,1);let A=b.id<.6?(1-ke(.1+.15*b.id,.45,b.f1))*(.4+.6*b.id):0,j=c(g*10,m*10),M=s(g*12,m*12,1),te=M.id<.15?1-ke(.06,.28,M.f1):0,N=.34+.3*j+.26*A+.45*te,P=l(g*180,m*180)*.55+u(g*90,m*90)*.45,ne=d(g*18,m*18,1),re=ne.id<.2?Math.max(0,1-(ne.f1/(.14+.12*ne.id*5))**2):0,ie=.45+.2*P+.5*Math.sqrt(re),ae=.5+.55*f(g*4,m*4);k=k<0?0:k>1?1:k,N=N<0?0:N>1?1:N,ie=ie<0?0:ie>1?1:ie,ae=ae<0?0:ae>1?1:ae,p[_]=k*255,p[_+1]=N*255,p[_+2]=ie*255,p[_+3]=ae*255}}let m=new y({label:`terrainDetail`,width:Te,height:Te,format:`rgba8unorm`,mips:!0,usage:[`sample`,`copyDst`],sampler:`aniso4Repeat`,data:p});return m.getGPU(),ce(m),m.userData={},m.image={width:Te,height:Te,data:p},m.userData.ms=performance.now()-e,Ae=m,m}var V=(e,t,n)=>{let r=new o().setRGB(e,t,n,g);return`vec3f( ${Ne(r.r)}, ${Ne(r.g)}, ${Ne(r.b)} )`},Me=(e,t)=>{let n=Math.cos(t),r=Math.sin(t);return`( mat2x2f( ${Ne(n)}, ${Ne(r)}, ${Ne(-r)}, ${Ne(n)} ) * ( ${e} ) )`};function Ne(e){let t=Number(e).toPrecision(9);return t.includes(`.`)||t.includes(`e`)?t:t+`.0`}var Pe={rockDark:V(.15,.145,.135),rockMid:V(.3,.285,.265),rockLight:V(.48,.455,.42),rockWarm:V(.44,.37,.3),lichenPale:V(.7,.7,.64),lichenOrange:V(.78,.5,.2),blackZone:V(.075,.075,.07),barnacle:V(.78,.76,.7),algae:V(.2,.27,.1),coralline:V(.62,.44,.46),moss:V(.19,.29,.08),mossDry:V(.3,.34,.14)},Fe={lush:V(.13,.2,.05),green:V(.25,.32,.1),olive:V(.36,.37,.14),yellow:V(.5,.46,.2),straw:V(.62,.54,.33),soil:V(.17,.13,.08)},Ie=(e,t)=>Object.entries(t).map(([t,n])=>`const ${e}${t}: vec3f = ${n};`).join(`
`),Le=`
${Ie(`PAL_`,Pe)}
${Ie(`MEADOW_`,Fe)}

struct RockGrad {
	dpdx: vec3f,
	dpdy: vec3f,
	fwY: f32,
	useGrad: bool,
};

// implicit-derivative RockGrad for a world position (call in uniform control flow)
fn terrainImplicitGrad( p: vec3f ) -> RockGrad {
	var g: RockGrad;
	g.dpdx = dpdx( p ); g.dpdy = dpdy( p ); g.fwY = 0.0; g.useGrad = false;
	return g;
}

// Mikkelsen surface-gradient bump: perturb world normal N by the scalar height field hd
// (screen-space derivatives, so any mix of projections / scales works). Robustness for terrain:
//  - the tilt is limited to ~55 degrees (at grazing angles |det| collapses and the unclamped
//    gradient would swing the normal into the tangent plane: 'chrome' patches on steep faces)
//  - the bump fades out where the screen-space frame is degenerate (the thin sliver triangles
//    of CDLOD geomorphing, which otherwise light up as bright lines along the grid) or where the
//    rendered facet disagrees with N (sub-texel crags)
fn terrainPerturbNormal( p: vec3f, N: vec3f, hd: f32, scale: f32 ) -> vec3f {
	let dpx = dpdx( p ); let dpy = dpdy( p );
	let dhdx = dpdx( hd ) * scale; let dhdy = dpdy( hd ) * scale;
	let r1 = cross( dpy, N );
	let r2 = cross( N, dpx );
	let det = dot( dpx, r1 );
	let ad = abs( det );
	let grad = ( r1 * dhdx + r2 * dhdy ) * sign( det );
	let area = length( cross( dpx, dpy ) );
	let fr = area / max( length( dpx ) * length( dpy ), 1e-20 ); // sin of the footprint angle
	let facet = ad / max( area, 1e-20 ); // cos between the facet and N
	let k = smoothstep( 0.12, 0.35, fr ) * smoothstep( 0.3, 0.6, facet );
	let g = grad * min( 1.0, ad * 1.4 / max( length( grad ), 1e-20 ) ) * k;
	return normalize( N * max( ad, 1e-20 ) - g );
}

// triplanar blend weights (sharp)
fn terrainTriWeights( N: vec3f ) -> vec3f {
	let a = abs( N );
	let w = a * a * ( a * a );
	return w / ( w.x + w.y + w.z );
}

fn terrainDetailGrad( uv: vec2f, gx: vec2f, gy: vec2f ) -> vec4f {
	return textureSampleGrad( terrainDetailTex, smpAniso4Repeat, uv, gx, gy );
}

// one channel-set of the detail texture, triplanar. The samples use explicit gradients (the
// derivatives of the world position in g), so they may run in non-uniform control flow.
fn terrainTriplanar( p: vec3f, w: vec3f, tile: f32, g: RockGrad ) -> vec4f {
	let s = 1.0 / tile;
	let x = terrainDetailGrad( p.zy * s, g.dpdx.zy * s, g.dpdy.zy * s );
	let y = terrainDetailGrad( p.xz * s + 0.37, g.dpdx.xz * s, g.dpdy.xz * s );
	let z = terrainDetailGrad( p.xy * s + 0.71, g.dpdx.xy * s, g.dpdy.xy * s );
	return x * w.x + y * w.y + z * w.z;
}

struct RockSurface {
	albedo: vec3f,
	rough: f32,
	hd: f32,     // bump height (m)
	moss: f32,   // 0..1
	wet: f32,
	height: f32,
};

// Weathered volcanic rock seen on the headlands, sea stacks and boulders.
//   p world position, N world normal (geometric / mcr), h height above sea level
//   mcr: 0..1 large scale variation, seed: per object variation (0..1)
// With g.useGrad every sample uses the gradients in g (branch safe).
fn terrainRockSurface( p: vec3f, N: vec3f, h: f32, mcr: f32, seed: f32, mossAmount: f32, g: RockGrad ) -> RockSurface {
	let w = terrainTriWeights( N );
	// big blocks (4 m cells), plates (0.9 m) and grain / chips
	let big = terrainTriplanar( p, w, 27.0, g );
	let mid = terrainTriplanar( p, w, 6.1, g );
	let fine = terrainTriplanar( p, w, 1.3, g );
	// pixel footprint (m): features smaller than a few pixels fade out instead of sparkling
	let px = select( length( abs( g.dpdx ) + abs( g.dpdy ) ), max( length( g.dpdx ), length( g.dpdy ) ), g.useGrad );
	let fineK = 1.0 - smoothstep( 0.006, 0.02, px );
	let midK = 1.0 - smoothstep( 0.03, 0.1, px );
	let hr = big.x * 0.45 + mid.x * 0.35 + ( ( fine.x - 0.5 ) * fineK + 0.5 ) * 0.2;

	// layered lava flows / bedding on steep faces: irregular bands (1D lookup of the fbm channel
	// along the height, warped), faded out once a band gets thinner than a few pixels
	let steep = 1.0 - smoothstep( 0.55, 0.85, N.y );
	let bandY = p.y + mid.w * 2.5 + mcr * 6.0;
	var fwY = g.fwY;
	if ( ! g.useGrad ) { fwY = fwidth( bandY ); }
	let bandUV = vec2f( bandY / 14.0, seed * 0.37 + 0.13 );
	var strata: f32;
	if ( g.useGrad ) {
		strata = terrainDetailGrad( bandUV, vec2f( fwY / 14.0, 0.0 ), vec2f( 0.0 ) ).w;
	} else {
		strata = textureSample( terrainDetailTex, smpAniso4Repeat, bandUV ).w;
	}
	let strataAA = 1.0 - smoothstep( 0.15, 0.6, fwY );
	let tone = hr * 0.9 + ( mcr - 0.5 ) * 0.7 + ( strata - 0.5 ) * 0.8 * steep * strataAA + ( seed - 0.5 ) * 0.3;
	var col = mix( PAL_rockDark, PAL_rockMid, smoothstep( 0.1, 0.5, tone ) );
	col = mix( col, PAL_rockLight, smoothstep( 0.5, 0.85, tone ) );
	// iron staining / warm weathering in patches
	col = mix( col, PAL_rockWarm, smoothstep( 0.62, 0.8, mid.w + mcr * 0.3 ) * 0.18 );
	// joints between the big blocks, fainter between plates
	col = col * ( smoothstep( 0.05, 0.25, big.x ) * 0.35 + 0.65 ) * ( smoothstep( 0.05, 0.25, mid.x ) * 0.15 + 0.85 );
	// rain streaks: dark stains running down steep faces, paler bands between (the fbm channel
	// stretched vertically on the two vertical projection planes)
	let sUVa = vec2f( p.z / 3.1, p.y / 41.0 );
	let sUVb = vec2f( p.x / 3.1 + 0.5, p.y / 41.0 + 0.3 );
	let sa = terrainDetailGrad( sUVa, vec2f( g.dpdx.z / 3.1, g.dpdx.y / 41.0 ), vec2f( g.dpdy.z / 3.1, g.dpdy.y / 41.0 ) );
	let sb = terrainDetailGrad( sUVb, vec2f( g.dpdx.x / 3.1, g.dpdx.y / 41.0 ), vec2f( g.dpdy.x / 3.1, g.dpdy.y / 41.0 ) );
	let sw4 = pow( abs( N.xz ), vec2f( 4.0 ) );
	let stainS = ( sa.w * sw4.x + sb.w * sw4.y ) / ( sw4.x + sw4.y + 1e-5 );
	let stain = smoothstep( 0.52, 0.72, stainS ) * steep;
	col = col * ( 1.0 - stain * 0.4 ) * ( smoothstep( 0.35, 0.2, stainS ) * steep * 0.12 + 1.0 );

	// lichens on the dry upper faces
	let dry = smoothstep( 2.6, 4.0, h );
	let lichen = smoothstep( 0.6, 0.78, mid.y ) * smoothstep( 0.2, 0.7, N.y ) * dry * smoothstep( 0.45, 0.65, mcr );
	col = mix( col, PAL_lichenPale, lichen * 0.45 );
	col = mix( col, PAL_lichenOrange, smoothstep( 0.8, 0.88, mid.y ) * dry * smoothstep( 0.5, 0.8, N.y ) * 0.3 );

	// moss / grass on ledges and tops, ferns hanging along the bedding planes of steep faces
	let ledge = smoothstep( 0.55, 0.7, strata ) * steep * strataAA * smoothstep( 0.4, 0.6, mid.w + ( mcr - 0.5 ) * 0.4 );
	let moss = max( smoothstep( 0.62, 0.9, N.y + ( big.x - 0.5 ) * 0.5 + ( mcr - 0.5 ) * 0.3 ), ledge * 0.8 )
		* smoothstep( 2.5, 5.0, h ) * mossAmount;
	col = mix( col, mix( PAL_moss, PAL_mossDry, mid.w ), moss * 0.9 );

	// shoreline zonation: black lichen band (splash zone), barnacles and algae in the intertidal
	let splash = smoothstep( 0.5, 1.0, h ) * smoothstep( 2.8, 1.8, h + mid.w * 1.2 ) * smoothstep( 0.35, 0.6, mcr + mid.w * 0.3 );
	col = mix( col, PAL_blackZone, splash * 0.55 );
	// sun-bleached, weathered upper faces
	col = mix( col, PAL_rockLight, smoothstep( 0.35, 0.95, N.y ) * smoothstep( 1.5, 3.0, h ) * 0.3 );
	let inter = smoothstep( -0.7, -0.2, h ) * smoothstep( 0.7, 0.2, h );
	let barn = smoothstep( 0.62, 0.72, fine.z ) * inter * fineK;
	col = mix( col, PAL_algae, inter * smoothstep( 0.4, 0.6, mid.y ) * 0.6 );
	col = mix( col, PAL_barnacle, barn * 0.8 );
	// below the water: algae films and pink coralline crusts
	let sub = smoothstep( -0.3, -1.2, h );
	col = mix( col, mix( PAL_algae, PAL_coralline, smoothstep( 0.45, 0.7, mid.w ) ), sub * 0.55 );

	// wet below the swash line (dark, glossy)
	let wet = smoothstep( 1.0, 0.25, h + mid.w * 0.3 );
	col = col * mix( 1.0, 0.55, wet );

	var r: RockSurface;
	r.albedo = col;
	r.rough = mix( mix( 0.88, 0.8, steep ), 0.45, wet ) + moss * 0.06;
	// relief (m): tilted blocks and plates with bevelled joints, then grain
	r.hd = big.x * 0.25 + mid.x * 0.07 * ( midK * 0.6 + 0.4 ) + fine.x * 0.012 * fineK * ( 1.0 - wet * 0.6 ) + barn * 0.005;
	r.moss = moss;
	r.wet = wet;
	r.height = hr;
	return r;
}

// saturation helper
fn terrainSaturation( c: vec3f, s: f32 ) -> vec3f {
	return mix( vec3f( luminance( c ) ), c, s );
}

struct MeadowTone {
	tone: vec3f,
	dry: f32,
	lush: f32,
};

//   mA, mB: detail fbm channel at the 173 m / 47 m scales (~0.5 +- 0.1): the samples at
//   rot2( xz, 0.7 ) / 173 and rot2( xz, 2.1 ) / 47 that the terrain takes anyway; slope: 1 - N.y;
//   south: N.z (the sun side); detail: optional finer fbm (~0.5 +- 0.1) that breaks up the patches
//   (hasDetail = false: none)
// Returns { tone, dry, lush }: mostly fresh green grass with olive, sun-bleached yellow and a few
// straw-dry patches (more on exposed slopes), darker lush grass in the damp patches (the hollows
// are darkened further by the AO).
fn terrainMeadowTone( mA: f32, mB: f32, slope: f32, south: f32, detail: f32, hasDetail: bool ) -> MeadowTone {
	var m = mA * 0.55 + mB * 0.45 + slope * 0.25 + south * 0.04;
	let dd = select( 0.0, detail - 0.5, hasDetail );
	m += dd * 0.28;
	let olive = smoothstep( 0.52, 0.6, m );
	let yellow = smoothstep( 0.6, 0.67, m );
	let straw = smoothstep( 0.66, 0.73, m + ( mB - 0.5 ) * 0.2 );
	let lush = smoothstep( 0.46, 0.37, mB * 0.7 + mA * 0.3 + slope * 0.2 + dd * 0.2 );
	var c = mix( MEADOW_green, MEADOW_olive, olive );
	c = mix( c, MEADOW_yellow, yellow * 0.8 );
	c = mix( c, MEADOW_straw, straw * 0.55 );
	c = mix( c, MEADOW_lush, lush * 0.75 );
	var o: MeadowTone;
	o.tone = c;
	o.dry = olive * 0.4 + yellow * 0.6;
	o.lush = lush;
	return o;
}
`,Re=null,ze=null;function Be(){return ze||={texture:je()}}function Ve(){return Re||(Re=new p({name:`terrainShading`,deps:[T],bindings:{terrainDetailTex:Be()},code:Le}),Re)}var He={0:`front`,1:`back`,2:`double`,front:`front`,back:`back`,double:`double`};function Ue(e){let t={...e};return t.side!==void 0&&(t.side=He[t.side]||`front`),t}var We=class extends ee{constructor(e={},t=null){let n=Ue(e),r={...n.uniforms||{}};r.envMapIntensity=[`f32`,n.envMapIntensity??1],r.emissiveIntensity=[`f32`,n.emissiveIntensity??1],t&&Object.assign(r,t),super({...n,uniforms:r}),this.isSceneMaterial=!0,this.isMeshStandardMaterial=!0}get side(){return this._side}set side(e){let t=He[e]||`front`;t!==this._side&&this._side!==void 0&&this.version++,this._side=t}get emissiveIntensity(){return this.uniforms.emissiveIntensity.value}set emissiveIntensity(e){this.uniforms.emissiveIntensity.value=e}get envMapIntensity(){return this.uniforms.envMapIntensity.value}set envMapIntensity(e){this.uniforms.envMapIntensity.value=e}get surface(){return this._prelude()+(this._surface||``)}set surface(e){this._surface=e}_prelude(){return`	s.emissive = s.emissive * mat.emissiveIntensity;
	s.envIntensity = mat.envMapIntensity;
`}},Ge=class extends We{constructor(e={}){let t=e.clearcoat??0,n=e.sheen??0;super(e,{clearcoat:[`f32`,t],clearcoatRoughness:[`f32`,e.clearcoatRoughness??0],specularIntensity:[`f32`,e.specularIntensity??1],sheen:[`f32`,n],sheenColor:[`vec3f`,null],sheenRoughness:[`f32`,e.sheenRoughness??1],ior:[`f32`,e.ior??1.5]}),this.isMeshPhysicalMaterial=!0,e.sheenColor===void 0?this.uniforms.sheenColor.value=Ke(0):this.uniforms.sheenColor.value=Ke(e.sheenColor),t>0&&(this.defines.CLEARCOAT=1),n>0&&(this.defines.SHEEN=1)}get clearcoat(){return this.uniforms.clearcoat.value}set clearcoat(e){e>0!=!!this.defines.CLEARCOAT&&this.setDefine(`CLEARCOAT`,+(e>0)),this.uniforms.clearcoat.value=e}get clearcoatRoughness(){return this.uniforms.clearcoatRoughness.value}set clearcoatRoughness(e){this.uniforms.clearcoatRoughness.value=e}get specularIntensity(){return this.uniforms.specularIntensity.value}set specularIntensity(e){this.uniforms.specularIntensity.value=e}get sheen(){return this.uniforms.sheen.value}set sheen(e){e>0!=!!this.defines.SHEEN&&this.setDefine(`SHEEN`,+(e>0)),this.uniforms.sheen.value=e}get sheenColor(){return this.uniforms.sheenColor.value}get sheenRoughness(){return this.uniforms.sheenRoughness.value}set sheenRoughness(e){this.uniforms.sheenRoughness.value=e}get ior(){return this.uniforms.ior.value}set ior(e){this.uniforms.ior.value=e}_prelude(){return super._prelude()+`	s.clearcoat = mat.clearcoat;
	s.clearcoatRoughness = mat.clearcoatRoughness;
	s.specularIntensity = mat.specularIntensity;
	s.sheenColor = mat.sheenColor * mat.sheen;
	s.sheenRoughness = mat.sheenRoughness;
	s.ior = mat.ior;
`}};function Ke(e){return e&&e.isColor?e.clone():new o().set(e)}var qe=(e={})=>new We(e),Je=(e={})=>new Ge(e),Ye=class{constructor(){this.boxes=[],this.cylinders=[],this.staticGroups=[],this._v=new t}addBox(e,t,n=0,{walkable:r=!1,solid:i=!0,tag:a=``}={}){let o={center:e.clone(),half:t.clone(),rotY:n,cos:Math.cos(n),sin:Math.sin(n),walkable:r,solid:i,tag:a,top:e.y+t.y,bottom:e.y-t.y,radius:Math.hypot(t.x,t.z)};return this.boxes.push(o),o}addCylinder(e,t,n,r,i,{tag:a=``}={}){let o={x:e,z:t,radius:n,yMin:r,yMax:i,tag:a};return this.cylinders.push(o),o}_toLocal(e,t,n){let r=t-e.center.x,i=n-e.center.z;return[r*e.cos-i*e.sin,r*e.sin+i*e.cos]}_toWorldDir(e,t,n){return[t*e.cos+n*e.sin,-t*e.sin+n*e.cos]}groundHeightAt(e,t,n,r=0){let i=-1/0;for(let a of this.boxes){if(!a.walkable||a.top>n||Math.abs(e-a.center.x)>a.radius+r+.01||Math.abs(t-a.center.z)>a.radius+r+.01)continue;let[o,s]=this._toLocal(a,e,t);Math.abs(o)<=a.half.x+r&&Math.abs(s)<=a.half.z+r&&(i=Math.max(i,a.top))}for(let a of this.staticGroups)a.enabled&&(i=Math.max(i,a.groundHeightAt(e,t,n,r)));return i}resolveCapsule(e,t,n,r=.35){let i=!1;for(let a of this.boxes){if(!a.solid||e.y+n<a.bottom||e.y+r>a.top||Math.abs(e.x-a.center.x)>a.radius+t||Math.abs(e.z-a.center.z)>a.radius+t)continue;let[o,s]=this._toLocal(a,e.x,e.z),c=Math.max(-a.half.x,Math.min(a.half.x,o)),l=Math.max(-a.half.z,Math.min(a.half.z,s)),u=o-c,d=s-l,f=u*u+d*d;if(f>=t*t)continue;let p,m,h;if(f>1e-8){let e=Math.sqrt(f);p=u/e,m=d/e,h=t-e}else{let e=a.half.x-Math.abs(o),n=a.half.z-Math.abs(s);e<n?(p=Math.sign(o)||1,m=0,h=e+t):(p=0,m=Math.sign(s)||1,h=n+t)}let[g,_]=this._toWorldDir(a,p,m);e.x+=g*h,e.z+=_*h,i=!0}for(let a of this.cylinders){if(e.y+n<a.yMin||e.y+r>a.yMax)continue;let o=e.x-a.x,s=e.z-a.z,c=a.radius+t,l=o*o+s*s;if(l>=c*c)continue;let u=Math.sqrt(l)||1e-4;e.x=a.x+o/u*c,e.z=a.z+s/u*c,i=!0}for(let a of this.staticGroups)a.enabled&&(i=a.resolveCapsule(e,t,n,r)||i);return i}raycast(e,t,n){let r=n;for(let n of this.boxes){if(!n.solid)continue;let i=e.x-n.center.x,a=e.z-n.center.z,o=e.y-n.center.y,s=i*n.cos-a*n.sin,c=i*n.sin+a*n.cos,l=t.x*n.cos-t.z*n.sin,u=t.x*n.sin+t.z*n.cos,d=0,f=r,p=(e,t,n)=>{if(Math.abs(t)<1e-8)return Math.abs(e)<=n;let r=(-n-e)/t,i=(n-e)/t;if(r>i){let e=r;r=i,i=e}return d=Math.max(d,r),f=Math.min(f,i),d<=f};p(s,l,n.half.x)&&p(o,t.y,n.half.y)&&p(c,u,n.half.z)&&(r=Math.min(r,d))}for(let n of this.staticGroups)n.enabled&&(r=Math.min(r,n.raycast(e,t,r)));return r}},Xe=class extends Ye{constructor(e,t=32){super(),this.enabled=!0,this.cellSize=t,this.cells=new Map,this.source=e;for(let[n,r]of[[`boxes`,e.boxes],[`cylinders`,e.cylinders]])for(let[e,i]of r.entries()){let r=i.x??i.center.x,a=i.z??i.center.z,o=i.radius;for(let i=Math.floor((r-o)/t);i<=Math.floor((r+o)/t);i++)for(let r=Math.floor((a-o)/t);r<=Math.floor((a+o)/t);r++){let t=i+`,`+r;this.cells.has(t)||this.cells.set(t,{boxes:new Set,cylinders:new Set}),this.cells.get(t)[n].add(e)}}}select(e,t,n,r){let i={boxes:new Set,cylinders:new Set},a=this.cellSize;for(let o=Math.floor(e/a);o<=Math.floor(n/a);o++)for(let e=Math.floor(t/a);e<=Math.floor(r/a);e++){let t=this.cells.get(o+`,`+e);if(t)for(let e of[`boxes`,`cylinders`])for(let n of t[e])i[e].add(n)}for(let e of[`boxes`,`cylinders`])this[e]=[...i[e]].sort((e,t)=>e-t).map(t=>this.source[e][t]);this.lastCandidates=this.boxes.length+this.cylinders.length}groundHeightAt(e,t,n,r=0){return this.enabled?(this.select(e-r,t-r,e+r,t+r),super.groundHeightAt(e,t,n,r)):-1/0}resolveCapsule(e,t,n,r=.35){return this.enabled?(this.select(e.x-t-1,e.z-t-1,e.x+t+1,e.z+t+1),super.resolveCapsule(e,t,n,r)):!1}raycast(e,t,n){if(!this.enabled)return n;let r=e.x+t.x*n,i=e.z+t.z*n;this.select(Math.min(e.x,r),Math.min(e.z,i),Math.max(e.x,r),Math.max(e.z,i));let a=super.raycast(e,t,n);for(let n of this.cylinders){let r=e.x-n.x,i=e.z-n.z,o=t.x*t.x+t.z*t.z,s=2*(r*t.x+i*t.z),c=r*r+i*i-n.radius*n.radius;if(c<=0&&e.y>=n.yMin&&e.y<=n.yMax){a=0;continue}let l=s*s-4*o*c;if(o>1e-12&&l>=0)for(let r of[(-s-Math.sqrt(l))/(2*o),(-s+Math.sqrt(l))/(2*o)])r>=0&&r<a&&e.y+t.y*r>=n.yMin&&e.y+t.y*r<=n.yMax&&(a=r);if(Math.abs(t.y)>1e-12)for(let o of[n.yMin,n.yMax]){let s=(o-e.y)/t.y;s>=0&&s<a&&(r+t.x*s)**2+(i+t.z*s)**2<=n.radius*n.radius&&(a=s)}}return a}dispose(){this.enabled=!1,this.cells.clear(),this.source.boxes.length=this.source.cylinders.length=0,this.boxes=[],this.cylinders=[]}},Ze=new h,Qe=new i,$e=new r,et=new e(0,0,0,`YXZ`),tt=new t,nt=new t(1,1,1),rt=new t,it=new t,at=new t,ot=new t,st=new t(1,0,0),ct=new t(0,1,0),lt=1e3,ut=2e3,dt={wood:1,hard:1,stone:2,thatch:1,roofMetal:.84,roofMetalSwap:1.68},ft=(e,t)=>t>0?Math.max(1,Math.round(e/t))*t/e:1,pt=class{constructor(e,t,n,r){this.p=e instanceof Float32Array?e:new Float32Array(e),this.n=t instanceof Float32Array?t:new Float32Array(t),this.uv=n instanceof Float32Array?n:new Float32Array(n),this.idx=r}get vertexCount(){return this.p.length/3}},mt=new Map;function ht(e,t){let n=mt.get(e);return n===void 0&&(n=t(),mt.set(e,n)),n}function gt(e,t,n,r=-1,i=0){return ht(`b${e.toFixed(4)},${t.toFixed(4)},${n.toFixed(4)},${r},${i}`,()=>{let a=[e,t,n],o=r;o<0&&(o=e>=t&&e>=n?0:t>=n?1:2);let s=[],c=[],l=[],u=[],d=[[-1,-1],[1,-1],[1,1],[-1,1]];for(let e=0;e<3;e++)for(let t=0;t<2;t++){let n=t===0?1:-1;if(i&1<<e*2+t)continue;let r=(e+1)%3,f=(e+2)%3,p=r,m=f;o===f&&(p=f,m=r);let h=s.length/3,g=e===o?lt:0;for(let[t,i]of d){let o=[0,0,0];o[e]=n*a[e]/2,o[r]=t*a[r]/2,o[f]=i*a[f]/2,s.push(o[0],o[1],o[2]);let u=[0,0,0];u[e]=n,c.push(u[0],u[1],u[2]),l.push(o[p]+a[p]/2+g,o[m]+a[m]/2)}n>0?u.push(h,h+1,h+2,h,h+2,h+3):u.push(h,h+2,h+1,h,h+3,h+2)}return new pt(s,c,l,u)})}function _t(e,t,n){let r=[],i=[],a=[],o=[];for(let o=0;o<=t;o++)for(let t=0;t<=e;t++){let e=n(t,o);r.push(e.p[0],e.p[1],e.p[2]),i.push(e.n[0],e.n[1],e.n[2]),a.push(e.uv[0],e.uv[1])}let s=e+1;for(let n=0;n<t;n++)for(let t=0;t<e;t++){let e=n*s+t,a=e+1,c=e+s,l=c+1;rt.fromArray(r,e*3),it.fromArray(r,a*3),at.fromArray(r,l*3),ot.fromArray(r,c*3);let u=it.clone().sub(rt),d=at.clone().sub(rt),f=ot.clone().sub(rt),p=u.clone().cross(d).add(d.clone().cross(f)),m=i[e*3]+i[a*3]+i[c*3]+i[l*3],h=i[e*3+1]+i[a*3+1]+i[c*3+1]+i[l*3+1],g=i[e*3+2]+i[a*3+2]+i[c*3+2]+i[l*3+2];p.x*m+p.y*h+p.z*g>=0?o.push(e,a,l,e,l,c):o.push(e,l,a,e,c,l)}return new pt(r,i,a,o)}function vt(e,t,n,r=8,i=!0,a=!1,o=!1,s=0){return ht(`c${e.toFixed(4)},${t.toFixed(4)},${n.toFixed(4)},${r},${i},${a},${o},${s}`,()=>{let c=[],l=[],u=[],d=[],f=(t-e)/n,p=Math.hypot(1,f),m=(e+t)/2,h=ft(Math.PI*2*m,s);for(let i=0;i<=r;i++){let a=i/r*Math.PI*2,s=Math.cos(a),d=Math.sin(a);for(let r=0;r<2;r++){let i=r?e:t,g=r?n:0;c.push(s*i,g,d*i),l.push(s/p,f/p,d/p);let _=g,v=a*m*h;o?u.push(v,_):u.push(_,v)}}for(let e=0;e<r;e++){let t=e*2,n=t+1,r=t+2,i=t+3;d.push(t,n,r,n,i,r)}let g=(e,t,n)=>{if(t<=0)return;let i=c.length/3;c.push(0,e,0),l.push(0,n?1:-1,0),u.push(ut,0);for(let i=0;i<=r;i++){let a=i/r*Math.PI*2;c.push(Math.cos(a)*t,e,Math.sin(a)*t),l.push(0,n?1:-1,0),u.push(Math.cos(a)*t+ut,Math.sin(a)*t)}for(let e=0;e<r;e++)n?d.push(i,i+2+e,i+1+e):d.push(i,i+1+e,i+2+e)};return i&&g(n,e,!0),a&&g(0,t,!1),new pt(c,l,u,d)})}function yt(e,t=12,n=null,r=0){return ht(`l`+e.map(e=>e[0].toFixed(3)+`:`+e[1].toFixed(3)).join(`,`)+`|`+t+`|`+n+`|`+r,()=>{let i=e.length,a=n??Math.max(...e.map(e=>e[0])),o=a*ft(Math.PI*2*a,r),s=[],c=t=>{let n=e[t+1][0]-e[t][0],r=e[t+1][1]-e[t][1],i=Math.hypot(n,r)||1;return[r/i,-n/i]},l=(t,n)=>t>=0&&n<i&&e[t][0]===e[n][0]&&e[t][1]===e[n][1];for(let e=0;e<i;e++){let t=0,n=0;if(l(e,e+1)){if(e>0){let r=c(e-1);t=r[0],n=r[1]}}else if(l(e-1,e)){if(e<i-1){let r=c(e);t=r[0],n=r[1]}}else{if(e<i-1){let r=c(e);t+=r[0],n+=r[1]}if(e>0){let r=c(e-1);t+=r[0],n+=r[1]}}let r=Math.hypot(t,n)||1;s.push([t/r,n/r])}let u=[0];for(let t=1;t<i;t++)u.push(u[t-1]+Math.hypot(e[t][0]-e[t-1][0],e[t][1]-e[t-1][1]));return _t(i-1,t,(n,r)=>{let i=r/t*Math.PI*2,a=Math.cos(i),c=Math.sin(i),[l,d]=e[n],[f,p]=s[n];return{p:[a*l,d,c*l],n:[a*f,p,c*f],uv:[u[n],i*o]}})})}function bt(e,t,n=6,r=16,i=Math.PI*2){return ht(`t${e.toFixed(4)},${t.toFixed(4)},${n},${r},${i.toFixed(3)}`,()=>_t(r,n,(a,o)=>{let s=a/r*i,c=o/n*Math.PI*2,l=Math.cos(s),u=Math.sin(s),d=Math.cos(c),f=Math.sin(c);return{p:[(e+t*d)*l,t*f,(e+t*d)*u],n:[d*l,f,d*u],uv:[s*e,c*t]}}))}function xt(e,n,r=5){let i=e.length,a=[],o=[],s=[];for(let t=0;t<i;t++){let n=e[Math.max(0,t-1)],r=e[Math.min(i-1,t+1)];a.push(r.clone().sub(n).normalize())}let c=Math.abs(a[0].y)<.9?new t(0,1,0):new t(1,0,0);c=c.sub(a[0].clone().multiplyScalar(c.dot(a[0]))).normalize(),o.push(c),s.push(a[0].clone().cross(c));for(let e=1;e<i;e++){let t=o[e-1],n=t.clone().sub(a[e].clone().multiplyScalar(t.dot(a[e])));n.lengthSq()<1e-8&&n.copy(t),n.normalize(),o.push(n),s.push(a[e].clone().cross(n))}let l=[0];for(let t=1;t<i;t++)l.push(l[t-1]+e[t].distanceTo(e[t-1]));return _t(r,i-1,(t,i)=>{let a=t/r*Math.PI*2,c=Math.cos(a),u=Math.sin(a),d=o[i].x*c+s[i].x*u,f=o[i].y*c+s[i].y*u,p=o[i].z*c+s[i].z*u,m=e[i];return{p:[m.x+d*n,m.y+f*n,m.z+p*n],n:[d,f,p],uv:[l[i],a*n]}})}function St(e,t,n=1,r=1,i=!1){return ht(`p${e.toFixed(3)},${t.toFixed(3)},${n},${r},${i}`,()=>_t(n,r,(a,o)=>{let s=(a/n-.5)*e,c=i?-o/r*t:(o/r-.5)*t;return{p:[s,c,0],n:[0,0,1],uv:[s+e/2,i?t+c:c+t/2]}}))}function Ct(e,t){return ht(`q${e.toFixed(3)},${t.toFixed(3)}`,()=>new pt([-e/2,-t/2,0,e/2,-t/2,0,e/2,t/2,0,-e/2,t/2,0],[0,0,1,0,0,1,0,0,1,0,0,1],[0,0,1,0,1,1,0,1],[0,1,2,0,2,3]))}function wt(e,n,r=null,i=null){let a=e.length,o=new t;for(let t=0;t<a;t++){let n=e[t],r=e[(t+1)%a];o.x+=(n.y-r.y)*(n.z+r.z),o.y+=(n.z-r.z)*(n.x+r.x),o.z+=(n.x-r.x)*(n.y+r.y)}o.normalize(),i&&o.dot(i)<0&&(e=e.slice().reverse(),o.negate());let s=r?r.clone():e[1].clone().sub(e[0]);s.sub(o.clone().multiplyScalar(s.dot(o))).normalize();let c=o.clone().cross(s),l=o.clone().multiplyScalar(-n),u=[],d=[],f=[],p=[],m=1/0,h=1/0;for(let t of e)m=Math.min(m,t.dot(s)),h=Math.min(h,t.dot(c));let g=s.clone().multiplyScalar(m).add(c.clone().multiplyScalar(h)),_=0;for(let t of e)u.push(t.x,t.y,t.z),d.push(o.x,o.y,o.z),tt.copy(t).sub(g),f.push(tt.dot(s),tt.dot(c));for(let e=1;e<a-1;e++)p.push(_,_+e,_+e+1);if(n>0){_=u.length/3;for(let t of e)u.push(t.x+l.x,t.y+l.y,t.z+l.z),d.push(-o.x,-o.y,-o.z),tt.copy(t).sub(g),f.push(tt.dot(s),tt.dot(c));for(let e=1;e<a-1;e++)p.push(_,_+e+1,_+e)}if(n>0)for(let t=0;t<a;t++){let r=e[t],i=e[(t+1)%a],s=i.clone().sub(r),c=s.length(),m=s.clone().cross(o).normalize();_=u.length/3,u.push(r.x,r.y,r.z,i.x,i.y,i.z,i.x+l.x,i.y+l.y,i.z+l.z,r.x+l.x,r.y+l.y,r.z+l.z);for(let e=0;e<4;e++)d.push(m.x,m.y,m.z);f.push(0,0,0,c,n,c,n,0),p.push(_,_+2,_+1,_,_+3,_+2)}let v=new pt(u,d,f,p);return Tt(v),v}function Tt(e){let{p:t,n,idx:r}=e;for(let e=0;e<r.length;e+=3){let i=r[e],a=r[e+1],o=r[e+2];rt.fromArray(t,i*3),it.fromArray(t,a*3),at.fromArray(t,o*3),it.sub(rt),at.sub(rt),it.cross(at);let s=n[i*3]+n[a*3]+n[o*3],c=n[i*3+1]+n[a*3+1]+n[o*3+1],l=n[i*3+2]+n[a*3+2]+n[o*3+2];it.x*s+it.y*c+it.z*l<0&&(r[e+1]=o,r[e+2]=a)}return e}var Et=class{constructor(){this.pos=[],this.nrm=[],this.uv=[],this.tint=[],this.data=[],this.idx=[],this.vcount=0}get triangles(){return this.idx.length/3}add(e,t,n,r){Qe.getNormalMatrix(t);let i=t.elements,a=Qe.elements,o=e.p,s=e.n,c=e.uv,l=this.vcount,u=typeof n==`function`,d=typeof r==`function`,f=o.length/3;for(let e=0;e<f;e++){let t=o[e*3],l=o[e*3+1],f=o[e*3+2];this.pos.push(i[0]*t+i[4]*l+i[8]*f+i[12],i[1]*t+i[5]*l+i[9]*f+i[13],i[2]*t+i[6]*l+i[10]*f+i[14]);let p=s[e*3],m=s[e*3+1],h=s[e*3+2],g=a[0]*p+a[3]*m+a[6]*h,_=a[1]*p+a[4]*m+a[7]*h,v=a[2]*p+a[5]*m+a[8]*h,y=Math.hypot(g,_,v)||1;this.nrm.push(g/y,_/y,v/y),this.uv.push(c[e*2],c[e*2+1]);let b=u?n(t,l,f,e):n;this.tint.push(b[0],b[1],b[2]);let x=d?r(t,l,f,e):r;this.data.push(x[0],x[1],x[2],x[3])}let p=t.determinant()<0,m=e.idx;for(let e=0;e<m.length;e+=3)p?this.idx.push(l+m[e],l+m[e+2],l+m[e+1]):this.idx.push(l+m[e],l+m[e+1],l+m[e+2]);this.vcount+=f}addBatch(e,t,n=null,r=0){Qe.getNormalMatrix(t);let i=t.elements,a=Qe.elements,o=this.vcount,s=e.pos,c=e.nrm,l=e.vcount;for(let t=0;t<l;t++){let o=s[t*3],l=s[t*3+1],u=s[t*3+2];this.pos.push(i[0]*o+i[4]*l+i[8]*u+i[12],i[1]*o+i[5]*l+i[9]*u+i[13],i[2]*o+i[6]*l+i[10]*u+i[14]);let d=c[t*3],f=c[t*3+1],p=c[t*3+2],m=a[0]*d+a[3]*f+a[6]*p,h=a[1]*d+a[4]*f+a[7]*p,g=a[2]*d+a[5]*f+a[8]*p,_=Math.hypot(m,h,g)||1;this.nrm.push(m/_,h/_,g/_),this.uv.push(e.uv[t*2],e.uv[t*2+1]);let v=e.tint;n?this.tint.push(v[t*3]*n[0],v[t*3+1]*n[1],v[t*3+2]*n[2]):this.tint.push(v[t*3],v[t*3+1],v[t*3+2]);let y=e.data;this.data.push(y[t*4]+r,y[t*4+1],y[t*4+2],y[t*4+3])}let u=t.determinant()<0,d=e.idx;for(let e=0;e<d.length;e+=3)u?this.idx.push(o+d[e],o+d[e+2],o+d[e+1]):this.idx.push(o+d[e],o+d[e+1],o+d[e+2]);this.vcount+=l}append(e,t=null){let n=this.vcount;for(let t=0;t<e.pos.length;t++)this.pos.push(e.pos[t]);for(let t=0;t<e.nrm.length;t++)this.nrm.push(e.nrm[t]);for(let t=0;t<e.uv.length;t++)this.uv.push(e.uv[t]);for(let t=0;t<e.tint.length;t++)this.tint.push(e.tint[t]);for(let n=0;n<e.vcount;n++){let r=[e.data[n*4],e.data[n*4+1],e.data[n*4+2],e.data[n*4+3]],i=t?t(r):r;this.data.push(i[0],i[1],i[2],i[3])}for(let t=0;t<e.idx.length;t++)this.idx.push(n+e.idx[t]);this.vcount+=e.vcount}build(){let e=new E;e.setAttribute(`position`,new D(this.pos,3)),e.setAttribute(`normal`,new D(this.nrm,3)),e.setAttribute(`uv`,new D(this.uv,2)),e.setAttribute(`tint`,new D(this.tint,3)),e.setAttribute(`vdata`,new D(this.data,4));let t=this.vcount>65535?x:S;return e.setIndex(new t(this.idx,1)),e.computeBoundingBox(),e.computeBoundingSphere(),e}},Dt=(e,t)=>{let n=Array.isArray(e)?e:[0,0,0,0];return[n[0],t,n[2],n[3]]},Ot=e=>e==null?[1,1,1]:Array.isArray(e)||typeof e==`function`?e:[e.r,e.g,e.b];function kt(e=0,t=0,n=0,r=0,i=0,a=0,o=new h){return et.set(i,r,a,`YXZ`),$e.setFromEuler(et),tt.set(e,t,n),o.compose(tt,$e,nt)}function At(e,t,n,r){return et.set(r.rx||0,r.ry||0,r.rz||0,`YXZ`),$e.setFromEuler(et),tt.set(e,t,n),ot.set(r.sx??1,r.sy??1,r.sz??1),new h().compose(tt,$e,ot)}var jt=class{constructor(){this.batches={},this.frame=new h,this.stack=[]}batch(e){return this.batches[e]||(this.batches[e]=new Et)}push(e){return this.stack.push(this.frame),this.frame=this.frame.clone().multiply(e),this}pushAt(e,t,n,r=0,i=0,a=0){return this.push(kt(e,t,n,r,i,a))}pop(){return this.frame=this.stack.pop(),this}toWorld(e,n,r,i=new t){return i.set(e,n,r).applyMatrix4(this.frame)}add(e,t,n,r,i){Ze.multiplyMatrices(this.frame,n),this.batch(e).add(t,Ze,Ot(r),i||[0,0,0,0])}box(e,t,n,r,i,a,o,s={}){let c=gt(i,a,o,s.grain??-1,s.skip??0);this.add(e,c,At(t,n,r,s),s.tint,s.data)}cyl(e,t,n,r,i,a,o,s={}){let c=s.swapUV??!1,l=dt[e===`roofMetal`&&c?`roofMetalSwap`:e]??0,u=vt(i,a,o,s.segs??8,s.capTop??!0,s.capBot??!1,c,l);this.add(e,u,At(t,n,r,s),s.tint,s.data)}lathe(e,t,n,r,i,a={}){let o=yt(i,a.segs??12,a.rRef??null,dt[e]??0);this.add(e,o,At(t,n,r,a),a.tint,a.data)}torus(e,t,n,r,i,a,o={}){let s=bt(i,a,o.radial??6,o.tubular??16,o.arc??Math.PI*2);this.add(e,s,At(t,n,r,o),o.tint,e===`rope`?Dt(o.data,a):o.data)}part(e,t,n,r,i,a={}){this.add(e,t,At(n,r,i,a),a.tint,a.data)}beam(e,t,n,r,i,a={}){rt.set(n[0]-t[0],n[1]-t[1],n[2]-t[2]);let o=rt.length();if(o<1e-5)return;rt.divideScalar(o);let s=Math.abs(rt.y)>.98?st:ct;if(at.crossVectors(rt,s).normalize(),it.crossVectors(at,rt).normalize(),a.roll){let e=Math.cos(a.roll),t=Math.sin(a.roll),n=it.clone(),r=at.clone();it.copy(n).multiplyScalar(e).addScaledVector(r,t),at.copy(r).multiplyScalar(e).addScaledVector(n,-t)}let c=new h().makeBasis(rt,it,at);c.setPosition((t[0]+n[0])/2,(t[1]+n[1])/2,(t[2]+n[2])/2);let l=gt(o+(a.extend||0),i,r,0,a.skip??0);this.add(e,l,c,a.tint,a.data)}rod(e,t,n,r,i=r,a={}){rt.set(n[0]-t[0],n[1]-t[1],n[2]-t[2]);let o=rt.length();if(o<1e-5)return;rt.divideScalar(o),$e.setFromUnitVectors(ct,rt);let s=new h().compose(tt.set(t[0],t[1],t[2]),$e,nt),c=vt(i,r,o,a.segs??6,a.capTop??!0,a.capBot??!1,!1,dt[e]??0);this.add(e,c,s,a.tint,a.data)}tube(e,t,n,r={}){let i=xt(t,n,r.radial??5);this.add(e,i,new h,r.tint,e===`rope`?Dt(r.data,n):r.data)}slab(e,t,n,r={}){let i=wt(t,n,r.uDir||null,r.up||null);this.add(e,i,new h,r.tint,r.data)}get triangles(){let e=0;for(let t in this.batches)e+=this.batches[t].triangles;return e}};function Mt(e,n,r,i=8){let a=[];for(let o=0;o<=i;o++){let s=o/i;a.push(new t(e[0]+(n[0]-e[0])*s,e[1]+(n[1]-e[1])*s-r*4*s*(1-s),e[2]+(n[2]-e[2])*s))}return a}var Nt=Math.PI*2,Pt=new p({name:`villageBakeNoise`,code:`
const VLG_TAU: f32 = ${Nt};

fn vlgHashU( x: f32, y: f32, s: f32 ) -> u32 {
	return ( u32( x ) * 1597334677u ) ^ ( u32( y ) * 3812015801u ) ^ ( u32( s ) * 2654435761u + 1013904223u );
}

// three.js TSL hash() (pcg), [0, 1)
fn vlgPcg( seed: u32 ) -> f32 {
	let state = seed * 747796405u + 2891336453u;
	let word = ( ( state >> ( ( state >> 28u ) + 4u ) ) ^ state ) * 277803737u;
	return f32( ( word >> 22u ) ^ word ) * ( 1.0 / 4294967296.0 );
}

// three independent 10-bit randoms from one hash
fn vlgHash3( x: f32, y: f32, s: f32 ) -> vec3f {
	let h = u32( vlgPcg( vlgHashU( x, y, s ) ) * 1073741823.0 );
	return vec3f( f32( h & 1023u ), f32( ( h >> 10u ) & 1023u ), f32( ( h >> 20u ) & 1023u ) ) / 1023.0;
}

fn vlgWrapP( i: vec2f, per: vec2f ) -> vec2f { return i - per * floor( i / per ); }

fn vlgGrad( gx: f32, gy: f32, s: f32, f: vec2f, ox: f32, oy: f32 ) -> f32 {
	let h = vlgHash3( gx, gy, s ).xy - 0.5;
	return h.x * ( f.x - ox ) + h.y * ( f.y - oy );
}

// periodic 2D gradient noise, roughly in [-1, 1]
fn vlgPNoise( p: vec2f, per: vec2f, s: f32 ) -> f32 {
	let i = floor( p );
	let f = fract( p );
	let u = f * f * f * ( f * ( f * 6.0 - 15.0 ) + 10.0 );
	let i0 = vlgWrapP( i, per );
	let i1 = vlgWrapP( i + 1.0, per );
	let n00 = vlgGrad( i0.x, i0.y, s, f, 0.0, 0.0 );
	let n10 = vlgGrad( i1.x, i0.y, s, f, 1.0, 0.0 );
	let n01 = vlgGrad( i0.x, i1.y, s, f, 0.0, 1.0 );
	let n11 = vlgGrad( i1.x, i1.y, s, f, 1.0, 1.0 );
	return mix( mix( n00, n10, u.x ), mix( n01, n11, u.x ), u.y ) * 3.4;
}

// periodic fBm (octave loop inside the shader)
fn vlgPFbm( p: vec2f, per: vec2f, oct: i32, s: f32, gain: f32 ) -> f32 {
	var sum = 0.0;
	var amp = 1.0;
	var norm = 0.0;
	var q = p;
	var pp = per;
	for ( var o = 0; o < oct; o++ ) {
		sum += vlgPNoise( q, pp, s + f32( o ) * 17.0 ) * amp;
		norm += amp;
		amp *= gain;
		q *= 2.0;
		pp *= 2.0;
	}
	return sum / norm;
}

// periodic cellular noise: returns vec4( F1, F2, cellId, 0 )
fn vlgPWorley( p: vec2f, per: vec2f, s: f32, jit: f32 ) -> vec4f {
	let i = floor( p );
	let f = fract( p );
	var d1 = 9.0;
	var d2 = 9.0;
	var id = 0.0;
	for ( var cy = -1; cy < 2; cy++ ) {
		for ( var cx = -1; cx < 2; cx++ ) {
			let o = vec2f( f32( cx ), f32( cy ) );
			let c = vlgWrapP( i + o, per );
			let h = vlgHash3( c.x, c.y, s );
			let d = length( o + ( h.xy - 0.5 ) * jit + 0.5 - f );
			if ( d < d1 ) {
				d2 = d1;
				d1 = d;
				id = h.z;
			} else if ( d < d2 ) {
				d2 = d;
			}
		}
	}
	return vec4f( d1, d2, id, 0.0 );
}

// periodic cellular noise returning the offset to the nearest feature: vec4( rel.x, rel.y, F1, cellId )
fn vlgPWorleyRel( p: vec2f, per: vec2f, s: f32, jit: f32 ) -> vec4f {
	let i = floor( p );
	let f = fract( p );
	var d1 = 9.0;
	var rel = vec2f( 0.0 );
	var id = 0.0;
	for ( var cy = -1; cy < 2; cy++ ) {
		for ( var cx = -1; cx < 2; cx++ ) {
			let o = vec2f( f32( cx ), f32( cy ) );
			let c = vlgWrapP( i + o, per );
			let h = vlgHash3( c.x, c.y, s );
			let dv = f - ( o + ( h.xy - 0.5 ) * jit + 0.5 );
			let d = length( dv );
			if ( d < d1 ) {
				d1 = d;
				rel = dv;
				id = h.z;
			}
		}
	}
	return vec4f( rel, d1, id );
}

// convenience wrappers (fx, fy: integer frequencies over the tile)
fn vlgPn( X: f32, Y: f32, fx: f32, fy: f32, s: f32 ) -> f32 { return vlgPNoise( vec2f( X * fx, Y * fy ), vec2f( fx, fy ), s ); }
fn vlgPf( X: f32, Y: f32, fx: f32, fy: f32, oct: i32, s: f32, gain: f32 ) -> f32 { return vlgPFbm( vec2f( X * fx, Y * fy ), vec2f( fx, fy ), oct, s, gain ); }
fn vlgPw( X: f32, Y: f32, fx: f32, fy: f32, s: f32, jit: f32 ) -> vec4f { return vlgPWorley( vec2f( X * fx, Y * fy ), vec2f( fx, fy ), s, jit ); }
fn vlgPwr( X: f32, Y: f32, fx: f32, fy: f32, s: f32, jit: f32 ) -> vec4f { return vlgPWorleyRel( vec2f( X * fx, Y * fy ), vec2f( fx, fy ), s, jit ); }
fn vlgN01( n: f32 ) -> f32 { return n * 0.5 + 0.5; }
fn vlgHf( a: f32, b: f32 ) -> f32 { return fract( sin( a * 12.9898 + b * 78.233 ) * 43758.5453 ); }
fn vlgBand( x: f32, a: f32, b: f32, c: f32, d: f32 ) -> f32 { return smoothstep( a, b, x ) * ( 1.0 - smoothstep( c, d, x ) ); }

struct VlgOut {
	fields: vec4f,  // height, roughness, occlusion, 0
	albedo: vec4f,  // albedo / mask map
};
`}),Ft={wood:`
fn vlgGen( X: f32, Y: f32 ) -> VlgOut {
	// knots with grain flowing around them
	let kw = vlgPwr( X, Y, 6.0, 10.0, 11.0, 0.7 );
	let kHas = step( 0.9, kw.w );
	let kRad = 0.01 + vlgHf( kw.w, 3.3 ) * 0.013;
	let kdm = length( vec2f( kw.x * ( 2.0 / 6.0 ), kw.y * ( 1.0 / 10.0 ) ) );
	let kInfl = exp( - ( kdm / ( kRad * 2.4 ) ) ) * kHas;

	// growth rings with uneven spacing and per-ring width / contrast
	let warpA = vlgPf( X, Y, 2.0, 4.0, 3, 21.0, 0.5 );
	let warpB = vlgPf( X, Y, 1.0, 2.0, 2, 23.0, 0.5 );
	let r = Y * 110.0 + warpA * 5.0 + warpB * 14.0 + kInfl * 14.0;
	let ringId = floor( r );
	let ringIdW = ringId - floor( ringId / 110.0 ) * 110.0;
	let w = fract( r );
	let lw = mix( 0.09, 0.32, vlgHf( ringIdW, 5.1 ) );
	let late = smoothstep( 0.93 - lw, 1.0 - lw, w ) * ( 1.0 - smoothstep( 0.9, 0.995, w ) );
	let ringDark = mix( 0.65, 1.15, vlgHf( ringIdW, 9.7 ) );

	// dense fibre streaks along the grain (the signature of sun-weathered timber)
	let fA = vlgN01( vlgPn( X, Y, 12.0, 300.0, 53.0 ) );
	let fB = vlgN01( vlgPn( X, Y, 5.0, 140.0, 55.0 ) );
	let fC = vlgN01( vlgPn( X, Y, 16.0, 400.0, 57.0 ) );
	let streak = fA * 0.5 + fB * 0.3 + fC * 0.2;
	let erosion = ( 1.0 - late ) * ( fB * 0.6 + 0.4 );

	// checks / cracks along the grain, tapering at the ends
	let crN = abs( vlgPn( X, Y, 6.0, 60.0, 71.0 ) );
	let crMask = smoothstep( 0.1, 0.45, vlgPf( X, Y, 3.0, 4.0, 2, 73.0, 0.5 ) );
	let crack = ( 1.0 - smoothstep( 0.012, 0.055, crN / ( crMask + 0.05 ) ) ) * step( 0.05, crMask );

	let kCore = ( 1.0 - smoothstep( kRad * 0.72, kRad, kdm ) ) * kHas;
	let kRing = vlgBand( kdm, kRad * 0.92, kRad * 1.02, kRad * 1.05, kRad * 1.3 ) * kHas;

	let height = 0.46 + late * 0.22 * ringDark - erosion * 0.09 + ( streak - 0.5 ) * 0.14
		- crack * 0.36 + kCore * 0.08 - kRing * 0.22;

	// silver grey surface, brown-grey eroded grooves, fibre streaks, stains and bleaching
	let blotch = vlgN01( vlgPf( X, Y, 2.0, 3.0, 3, 81.0, 0.5 ) );
	let bleach = smoothstep( 0.5, 0.82, vlgN01( vlgPf( X, Y, 3.0, 2.0, 3, 83.0, 0.5 ) ) );
	let stain = smoothstep( 0.58, 0.86, vlgN01( vlgPf( X, Y, 4.0, 5.0, 3, 85.0, 0.5 ) ) );
	// sun-bleached driftwood grey (linear albedo ~0.2 in the grooves, ~0.45 on the latewood)
	let grooveC = vec3f( 0.2, 0.186, 0.168 );
	let silverC = vec3f( 0.45, 0.445, 0.428 );
	var col = mix( grooveC, silverC, clamp( late * ringDark * 0.55 + streak * 0.75 - 0.12, 0.0, 1.0 ) );
	col = col * ( fA * 0.34 + 0.83 );
	col = col * ( 1.0 - smoothstep( 0.7, 0.95, fC ) * 0.3 );
	col = col * ( blotch * 0.24 + 0.88 );
	col = mix( col, vec3f( 0.55, 0.54, 0.51 ), bleach * 0.3 );
	col = mix( col, col * vec3f( 0.8, 0.68, 0.54 ), stain * 0.6 );
	col = mix( col, vec3f( 0.035, 0.03, 0.026 ), crack * 0.92 );
	col = mix( col, mix( vec3f( 0.13, 0.085, 0.05 ), vec3f( 0.07, 0.045, 0.03 ), fract( kdm * 900.0 ) ), kCore );
	col = mix( col, vec3f( 0.05, 0.04, 0.03 ), kRing * 0.8 );

	// paint chip field (A): paint lets go in grain-aligned flakes, first at cracks, knots and eroded grain
	let flake = vlgPw( X, Y, 30.0, 80.0, 91.0, 0.9 );
	let chipLarge = vlgN01( vlgPf( X, Y, 4.0, 8.0, 4, 97.0, 0.5 ) );
	let chip = chipLarge * 0.62 + flake.z * 0.3 + late * 0.06 - erosion * 0.04
		- crack * 0.4 - kCore * 0.1;

	let rough = clamp( 0.82 + erosion * 0.1 + fA * 0.04 + crack * 0.08 - kCore * 0.15, 0.0, 1.0 );
	let occ = 1.0 - crack * 0.65 - kRing * 0.4 - erosion * 0.08;
	return VlgOut( vec4f( height, rough, occ, 0.0 ), vec4f( col, clamp( chip, 0.0, 1.0 ) ) );
}
`,paint:`
fn vlgGen( X: f32, Y: f32 ) -> VlgOut {
	let strokes = vlgPn( X, Y, 4.0, 60.0, 701.0 ) * 0.25 + vlgPn( X, Y, 16.0, 160.0, 703.0 ) * 0.12 + vlgPn( X, Y, 2.0, 12.0, 704.0 ) * 0.2;
	let cz = vlgPw( X, Y, 34.0, 40.0, 705.0, 1.0 );
	let crazeMask = smoothstep( 0.62, 0.85, vlgN01( vlgPf( X, Y, 3.0, 2.0, 3, 707.0, 0.5 ) ) );
	let craze = ( 1.0 - smoothstep( 0.015, 0.04, cz.y - cz.x ) ) * crazeMask;
	let height = 0.5 + strokes - craze * 0.12;
	let rough = clamp( 0.5 + strokes * 0.35 + craze * 0.15, 0.0, 1.0 );
	let occ = 1.0 - craze * 0.18;
	return VlgOut( vec4f( height, rough, occ, 0.0 ), vec4f( 0.0 ) );
}
`,grime:`
fn vlgGen( X: f32, Y: f32 ) -> VlgOut {
	let streak = smoothstep( 0.55, 0.9, vlgN01( vlgPn( X, Y, 26.0, 2.0, 601.0 ) ) ) * smoothstep( 0.35, 0.7, vlgN01( vlgPf( X, Y, 4.0, 3.0, 2, 603.0, 0.5 ) ) );
	let drip = smoothstep( 0.6, 0.95, vlgN01( vlgPn( X, Y, 70.0, 4.0, 604.0 ) ) ) * 0.5;
	let salt = smoothstep( 0.52, 0.8, vlgN01( vlgPf( X, Y, 4.0, 4.0, 5, 605.0, 0.5 ) ) ) * ( vlgN01( vlgPn( X, Y, 120.0, 120.0, 607.0 ) ) * 0.5 + 0.5 );
	let mw = vlgPw( X, Y, 60.0, 60.0, 609.0, 1.0 );
	let mildew = ( 1.0 - smoothstep( 0.05, 0.22, mw.x ) ) * step( 0.6, vlgN01( vlgPf( X, Y, 3.0, 3.0, 3, 611.0, 0.5 ) ) );
	let macroV = vlgN01( vlgPf( X, Y, 2.0, 2.0, 3, 613.0, 0.5 ) );
	return VlgOut( vec4f( 0.0 ), vec4f( clamp( streak + drip, 0.0, 1.0 ), salt, mildew, macroV ) );
}
`,roof:`
fn vlgGen( X: f32, Y: f32 ) -> VlgOut {
	let corr = sin( ( X * 8.0 - 0.25 ) * VLG_TAU ) * 0.5 + 0.5;
	let valley = 1.0 - corr;
	// screws with washers on every second crest at each purlin
	let sx = ( fract( X * 4.0 - 0.25 + 0.5 ) - 0.5 ) * ( 0.84 / 4.0 );
	let sy = ( fract( Y * 3.0 - 0.5 + 0.5 ) - 0.5 ) * ( 1.68 / 3.0 );
	let ds = length( vec2f( sx, sy ) );
	let washer = 1.0 - smoothstep( 0.0095, 0.0115, ds );
	let hq = ds / 0.0065;
	let head = sqrt( max( 1.0 - hq * hq, 0.0 ) );
	// dents, rust pitting
	let dw = vlgPw( X, Y, 5.0, 10.0, 13.0, 0.9 );
	let dent = step( 0.7, dw.z ) * ( 1.0 - smoothstep( 0.0, 0.5, dw.x ) );
	let blot = vlgN01( vlgPf( X, Y, 3.0, 5.0, 5, 31.0, 0.5 ) );
	let vstreak = vlgN01( vlgPn( X, Y, 48.0, 3.0, 33.0 ) );
	let sq = sx / 0.007;
	let screwStreak = exp( - ( sq * sq ) ) * smoothstep( - 0.35, - 0.01, sy ) * step( sy, 0.004 )
		* ( vlgN01( vlgPn( X, Y, 16.0, 6.0, 35.0 ) ) * 0.8 + 0.2 );
	let edge = 1.0 - smoothstep( 0.0, 0.05, min( X, 1.0 - X ) * 0.84 );
	let streakLong = smoothstep( 0.55, 0.85, vlgN01( vlgPn( X, Y, 64.0, 2.0, 39.0 ) ) ) * vlgN01( vlgPf( X, Y, 4.0, 6.0, 2, 45.0, 0.5 ) );
	let rust = clamp( blot * 0.42 + vstreak * valley * 0.25 + streakLong * 0.35 + screwStreak * 0.7 + washer * 0.45 + edge * 0.3 + dent * 0.15 - 0.05, 0.0, 1.0 );
	let pit = vlgPn( X, Y, 150.0, 300.0, 37.0 ) * smoothstep( 0.45, 0.8, rust );
	let lapLine = 1.0 - smoothstep( 0.0012, 0.0028, abs( X * 0.84 - 0.028 ) );
	let lapTop = 1.0 - smoothstep( 0.026, 0.03, X * 0.84 );
	let height = corr * 0.9 + washer * 0.035 + head * 0.05 - dent * 0.1 + pit * 0.012 + lapTop * 0.012;

	let rustVar = vlgN01( vlgPf( X, Y, 10.0, 20.0, 3, 41.0, 0.5 ) );
	let fade = clamp( vlgN01( vlgPf( X, Y, 2.0, 4.0, 4, 43.0, 0.5 ) ) * 0.8 + corr * 0.25, 0.0, 1.0 );
	let grime = clamp( valley * vlgN01( vlgPn( X, Y, 32.0, 2.0, 47.0 ) ) * 0.8 + blot * 0.2, 0.0, 1.0 );
	let rough = clamp( 0.5 + ( vlgN01( vlgPn( X, Y, 20.0, 40.0, 49.0 ) ) - 0.5 ) * 0.25 + fade * 0.1, 0.0, 1.0 );
	let occ = 1.0 - lapLine * 0.7 - vlgBand( ds, 0.0095, 0.011, 0.012, 0.016 ) * 0.35;
	return VlgOut( vec4f( height, rough, occ, 0.0 ), vec4f( rust, rustVar, fade, grime ) );
}
`,thatch:`
struct VlgRow { tip: f32, sf: f32, rnd: f32 };

const VLG_R: f32 = 5.0;

fn vlgRow( X: f32, rowF: f32, k: f32 ) -> VlgRow {
	let kk = k - floor( k / VLG_R ) * VLG_R;
	let warp = vlgPNoise( vec2f( X * 7.0, kk * 3.1 ), vec2f( 7.0, 1000.0 ), 131.0 );
	// strands lean a little, in coherent groups, so they are not perfectly parallel
	let lean = vlgPNoise( vec2f( X * 9.0, kk * 5.3 ), vec2f( 9.0, 1000.0 ), 133.0 );
	let s = max( rowF - k, - 0.5 );
	let sc = X * 110.0 + warp * 1.3 + lean * s * 2.2;
	let sid = floor( sc );
	let sidW = sid - floor( sid / 110.0 ) * 110.0;
	let sf = fract( sc );
	let rnd = vlgHf( sidW + kk * 211.0, kk * 7.3 + 1.0 );
	let lump = vlgN01( vlgPNoise( vec2f( X * 5.0, kk * 2.3 ), vec2f( 5.0, 1000.0 ), 137.0 ) );
	let lump2 = vlgN01( vlgPNoise( vec2f( X * 2.0, kk * 1.7 ), vec2f( 2.0, 1000.0 ), 139.0 ) );
	let hang = 0.06 + lump * 0.14 + lump2 * 0.16 + rnd * rnd * 0.22;
	return VlgRow( k - hang, sf, rnd );
}

fn vlgGen( X: f32, Y: f32 ) -> VlgOut {
	// rows wave up and down along the eave and are unevenly spaced
	let rowWarp = vlgPn( X, Y, 3.0, 1.0, 143.0 ) * 0.22 + vlgPn( X, Y, 7.0, 2.0, 145.0 ) * 0.1;
	let rowF = Y * VLG_R + rowWarp;
	let k0 = floor( rowF );

	let r0 = vlgRow( X, rowF, k0 );
	let r1 = vlgRow( X, rowF, k0 + 1.0 );
	let r2 = vlgRow( X, rowF, k0 + 2.0 );
	let in1 = step( r1.tip, rowF );
	let tip = mix( r0.tip, r1.tip, in1 );
	let nextTip = mix( r1.tip, r2.tip, in1 );
	let sf = mix( r0.sf, r1.sf, in1 );
	let rnd = mix( r0.rnd, r1.rnd, in1 );
	let s = rowF - tip;
	let dNext = nextTip - rowF;

	let bulge = sin( sf * ${Math.PI} );
	let tipZone = 1.0 - smoothstep( 0.0, 0.16, s );
	// frayed tips and gaps between strands reveal the darker layer underneath
	let gapW = mix( 0.43, 0.3, tipZone ) - vlgHf( rnd, 2.2 ) * 0.06;
	let gap = smoothstep( gapW, gapW + 0.05, abs( sf - 0.5 ) );
	let fibre = vlgPn( X, Y, 330.0, 6.0, 139.0 );
	let fibre2 = vlgPn( X, Y, 160.0, 3.0, 141.0 );
	let height = 0.92 - min( s, 1.3 ) / 1.3 * 0.55 + bulge * 0.08 + fibre * 0.03 - gap * 0.32;

	let golden = vec3f( 0.42, 0.3, 0.13 );
	let pale = vec3f( 0.5, 0.43, 0.27 );
	let brown = vec3f( 0.24, 0.165, 0.09 );
	let grey = vec3f( 0.34, 0.31, 0.26 );
	var col = mix( golden, pale, smoothstep( 0.25, 0.75, rnd ) );
	col = mix( col, brown, step( 0.85, rnd ) * 0.75 );
	col = mix( col, grey, smoothstep( 0.1, 0.5, vlgHf( rnd, 9.1 ) ) * 0.4 );
	col = col * ( vlgN01( fibre ) * 0.38 + 0.8 ) * ( vlgN01( fibre2 ) * 0.2 + 0.9 );
	col = mix( col, grey * 1.18, tipZone * 0.4 );
	col = col * ( 1.0 - smoothstep( 0.55, 1.25, s ) * 0.3 );
	col = mix( col, vec3f( 0.07, 0.055, 0.035 ), gap * 0.85 );
	let occ = ( smoothstep( 0.0, 0.32, dNext ) * 0.7 + 0.3 ) * ( bulge * 0.25 + 0.75 ) * ( 1.0 - gap * 0.6 );
	let rough = 0.88 + fibre * 0.05;
	return VlgOut( vec4f( height, rough, occ, 0.0 ), vec4f( col, tipZone ) );
}
`,stone:`
fn vlgGen( X: f32, Y: f32 ) -> VlgOut {
	let wx = vlgPf( X, Y, 4.0, 4.0, 2, 213.0, 0.5 ) * 0.45;
	let wy = vlgPf( X, Y, 4.0, 4.0, 2, 215.0, 0.5 ) * 0.45;
	let W = vlgPWorley( vec2f( X * 7.0 + wx, Y * 12.0 + wy ), vec2f( 7.0, 12.0 ), 201.0, 0.85 );
	let edge = W.y - W.x;
	let mortar = 1.0 - smoothstep( 0.035, 0.085, edge );
	let dome = pow( smoothstep( 0.02, 0.5, edge ), 0.7 );
	let surf = vlgPf( X, Y, 24.0, 24.0, 4, 203.0, 0.5 );
	let pits = vlgPw( X, Y, 70.0, 70.0, 207.0, 1.0 );
	let porous = step( 0.55, vlgHf( W.z, 4.2 ) );
	let pitSize = mix( 0.1, 0.19, vlgHf( pits.z, 1.7 ) );
	let pit = ( 1.0 - smoothstep( pitSize * 0.6, pitSize, pits.x ) ) * step( 0.4, pits.z ) * ( porous * 0.75 + 0.25 );
	let sandy = vlgPn( X, Y, 140.0, 140.0, 209.0 );
	let height = 0.2 + dome * 0.46 + surf * 0.11 + vlgPn( X, Y, 200.0, 200.0, 229.0 ) * 0.025 - pit * 0.16 - mortar * 0.12 + sandy * 0.02;

	let id = W.z;
	// coral stone / limestone: warm beiges with the odd darker basalt and pale block
	let c0 = vec3f( 0.55, 0.5, 0.41 );
	let c1 = vec3f( 0.47, 0.45, 0.41 );
	let c2 = vec3f( 0.42, 0.37, 0.3 );
	let c3 = vec3f( 0.3, 0.29, 0.27 );
	let c4 = vec3f( 0.64, 0.6, 0.52 );
	var col = mix( c0, c1, smoothstep( 0.2, 0.4, id ) );
	col = mix( col, c2, smoothstep( 0.5, 0.62, id ) );
	col = mix( col, c3, smoothstep( 0.8, 0.86, id ) * 0.8 );
	col = mix( col, c4, smoothstep( 0.9, 0.97, id ) );
	// mottling, veins and weathering inside each stone
	let mott = vlgN01( vlgPf( X, Y, 10.0, 10.0, 4, 217.0, 0.5 ) );
	let vein = ( 1.0 - smoothstep( 0.0, 0.035, abs( vlgPf( X, Y, 6.0, 6.0, 3, 219.0, 0.5 ) ) ) ) * step( 0.6, vlgHf( id, 6.6 ) );
	let speck = vlgN01( vlgPn( X, Y, 300.0, 300.0, 225.0 ) );
	let grain = vlgN01( vlgPn( X, Y, 120.0, 120.0, 227.0 ) );
	col = col * ( mott * 0.6 + 0.68 ) * ( vlgN01( surf ) * 0.3 + 0.85 ) * ( speck * 0.34 + 0.83 ) * ( grain * 0.22 + 0.89 );
	col = col * mix( 0.66, 1.0, smoothstep( 0.04, 0.28, edge ) );
	col = mix( col, col * 1.25, vein * 0.5 );
	// lichen: pale grey-green and dark specks
	let lich = smoothstep( 0.62, 0.8, vlgN01( vlgPf( X, Y, 8.0, 8.0, 3, 221.0, 0.5 ) ) ) * smoothstep( 0.4, 0.6, vlgN01( vlgPn( X, Y, 60.0, 60.0, 223.0 ) ) );
	col = mix( col, vec3f( 0.42, 0.44, 0.36 ), lich * 0.45 );
	col = col * ( 1.0 - pit * 0.5 );
	col = mix( col, vec3f( 0.5, 0.47, 0.41 ) * ( vlgN01( sandy ) * 0.3 + 0.85 ), mortar );
	col = col * ( 1.0 - vlgBand( edge, 0.03, 0.06, 0.08, 0.16 ) * 0.3 );
	let plaster = clamp( vlgN01( vlgPf( X, Y, 3.0, 3.0, 5, 211.0, 0.5 ) ) - mortar * 0.08, 0.0, 1.0 );
	let rough = 0.84 + surf * 0.06 + mortar * 0.1 - lich * 0.05;
	let occ = 1.0 - pit * 0.55 - mortar * 0.3;
	return VlgOut( vec4f( height, rough, occ, 0.0 ), vec4f( col, plaster ) );
}
`,hard:`
fn vlgGen( X: f32, Y: f32 ) -> VlgOut {
	let base = vlgN01( vlgPf( X, Y, 4.0, 4.0, 5, 401.0, 0.5 ) );
	let sp = vlgPw( X, Y, 16.0, 16.0, 403.0, 1.0 );
	let spots = ( 1.0 - smoothstep( 0.1, 0.38, sp.x ) ) * step( 0.5, sp.z );
	let rust = clamp( base * 0.8 + spots * 0.35 - 0.08, 0.0, 1.0 );
	let sMask = smoothstep( 0.2, 0.6, vlgN01( vlgPf( X, Y, 3.0, 3.0, 2, 413.0, 0.5 ) ) );
	let s1 = 1.0 - smoothstep( 0.008, 0.03, abs( vlgPn( X, Y, 3.0, 90.0, 405.0 ) ) );
	let s2 = 1.0 - smoothstep( 0.008, 0.03, abs( vlgPn( X, Y, 90.0, 3.0, 407.0 ) ) );
	let scratch = max( s1, s2 ) * sMask;
	let grime = vlgN01( vlgPf( X, Y, 3.0, 3.0, 3, 409.0, 0.5 ) );
	let pw2 = vlgPw( X, Y, 90.0, 90.0, 411.0, 1.0 );
	let pit = ( 1.0 - smoothstep( 0.1, 0.28, pw2.x ) ) * smoothstep( 0.4, 0.8, rust );
	let bump = vlgPn( X, Y, 40.0, 40.0, 415.0 ) * 0.04 * rust;
	let height = 0.5 - pit * 0.3 - scratch * 0.12 + bump;
	let rough = clamp( 0.5 + rust * 0.3 - scratch * 0.25 + grime * 0.08, 0.0, 1.0 );
	let occ = 1.0 - pit * 0.5;
	return VlgOut( vec4f( height, rough, occ, 0.0 ), vec4f( rust, scratch, grime, 0.0 ) );
}
`,rope:`
fn vlgRopeH( q: vec2f ) -> f32 {
	let phi = ( q.x + q.y ) * 3.0;
	let sf = fract( phi );
	let a = sf * 2.0 - 1.0;
	let prof = sqrt( max( 1.0 - a * a, 0.0 ) );
	let yarn = fract( sf * 3.0 + ( q.x - q.y ) * 6.0 );
	let b = yarn * 2.0 - 1.0;
	let yprof = sqrt( max( 1.0 - b * b, 0.0 ) );
	let fuzz = vlgPNoise( q * 64.0, vec2f( 64.0 ), 801.0 );
	return prof * 0.8 + yprof * prof * 0.2 + fuzz * 0.03;
}

fn vlgGen( X: f32, Y: f32 ) -> VlgOut {
	let q = vec2f( X, Y );
	let e = 1.0 / 256.0;
	let hx = vlgRopeH( q + vec2f( e, 0.0 ) ) - vlgRopeH( q - vec2f( e, 0.0 ) );
	let hy = vlgRopeH( q + vec2f( 0.0, e ) ) - vlgRopeH( q - vec2f( 0.0, e ) );
	let n = normalize( vec3f( hx * ( - 0.09 / ( 2.0 * e ) ), hy * ( - 0.09 / ( 2.0 * e ) ), 1.0 ) );
	let h = vlgRopeH( q );
	let fib = vlgN01( vlgPNoise( vec2f( ( X + Y ) * 40.0, ( X - Y ) * 160.0 ), vec2f( 40.0, 160.0 ), 803.0 ) );
	let lum = 0.45 + h * 0.4 + fib * 0.15;
	let ao = 0.3 + smoothstep( 0.0, 0.7, h ) * 0.7;
	return VlgOut( vec4f( 0.0 ), vec4f( lum, ao, n.x * 0.5 + 0.5, n.y * 0.5 + 0.5 ) );
}
`,net:`
fn vlgNetH( q: vec2f ) -> f32 {
	let a = ( q.x + q.y ) * 4.0;
	let b = ( q.x - q.y ) * 4.0;
	let da = 0.5 - abs( fract( a ) - 0.5 );
	let db = 0.5 - abs( fract( b ) - 0.5 );
	let w = 0.055;
	let qa = da / w;
	let qb = db / w;
	let la = sqrt( max( 1.0 - qa * qa, 0.0 ) ) * ( abs( fract( b * 14.0 ) - 0.5 ) * 0.25 + 0.8 );
	let lb = sqrt( max( 1.0 - qb * qb, 0.0 ) ) * ( abs( fract( a * 14.0 ) - 0.5 ) * 0.25 + 0.8 );
	let qk = length( vec2f( da, db ) ) / 0.1;
	let knot = sqrt( max( 1.0 - qk * qk, 0.0 ) ) * 1.35;
	return max( max( la, lb ), knot );
}

fn vlgGen( X: f32, Y: f32 ) -> VlgOut {
	let q = vec2f( X, Y );
	let e = 1.0 / 256.0;
	let h = vlgNetH( q );
	let hx = vlgNetH( q + vec2f( e, 0.0 ) ) - vlgNetH( q - vec2f( e, 0.0 ) );
	let hy = vlgNetH( q + vec2f( 0.0, e ) ) - vlgNetH( q - vec2f( 0.0, e ) );
	let n = normalize( vec3f( hx * ( - 0.012 / ( 2.0 * e ) ), hy * ( - 0.012 / ( 2.0 * e ) ), 1.0 ) );
	let alpha = smoothstep( 0.0, 0.18, h );
	let shade = 0.45 + min( h, 1.0 ) * 0.55;
	return VlgOut( vec4f( 0.0 ), vec4f( alpha, shade, n.x * 0.5 + 0.5, n.y * 0.5 + 0.5 ) );
}
`};function It(e){let t=e=>{let t=Number(e).toPrecision(9);return t.includes(`.`)||t.includes(`e`)?t:t+`.0`},n=[e.hs/(e.mx/e.w),e.hs/(e.my/e.h)],r=[e.ao,e.hs/((e.mx/e.w+e.my/e.h)*.5)],i=``;for(let e=0;e<8;e++){let n=e/8*Nt+.3;for(let e of[3,9])i+=`\tocc += clamp( ( vlgTap( px, vec2f( ${t(Math.cos(n)*e)}, ${t(Math.sin(n)*e)} ) ).x - c.x ) * AO.y / ${t(e)} * 1.6, 0.0, 1.0 );\n`}return`
const SLOPE = vec2f( ${t(n[0])}, ${t(n[1])} );
const AO = vec2f( ${t(r[0])}, ${t(r[1])} );

fn vlgTap( px: vec2f, o: vec2f ) -> vec4f {
	let dim = vec2i( textureDimensions( vlgFields ) );
	let p = vec2i( floor( px + o ) );
	return textureLoad( vlgFields, ( ( p % dim ) + dim ) % dim, 0 );
}

@compute @workgroup_size( WG_X, WG_Y, 1 )
fn main( @builtin( global_invocation_id ) gid: vec3u ) {
	let dim = textureDimensions( vlgFields );
	if ( gid.x >= dim.x || gid.y >= dim.y ) { return; }
	let px = vec2f( gid.xy ) + 0.5;
	let tl = vlgTap( px, vec2f( -1.0, 1.0 ) ).x;
	let t = vlgTap( px, vec2f( 0.0, 1.0 ) ).x;
	let tr = vlgTap( px, vec2f( 1.0, 1.0 ) ).x;
	let l = vlgTap( px, vec2f( -1.0, 0.0 ) ).x;
	let r = vlgTap( px, vec2f( 1.0, 0.0 ) ).x;
	let bl = vlgTap( px, vec2f( -1.0, -1.0 ) ).x;
	let b = vlgTap( px, vec2f( 0.0, -1.0 ) ).x;
	let br = vlgTap( px, vec2f( 1.0, -1.0 ) ).x;
	let c = vlgTap( px, vec2f( 0.0 ) );
	let dX = ( tr + r * 2.0 + br - ( tl + l * 2.0 + bl ) ) / 8.0;
	let dY = ( tl + t * 2.0 + tr - ( bl + b * 2.0 + br ) ) / 8.0;
	let n = normalize( vec3f( - dX * SLOPE.x, - dY * SLOPE.y, 1.0 ) );
	// horizon based occlusion: 8 directions x 2 radii
	var occ = 0.0;
${i}
	let ao = clamp( 1.0 - occ / 16.0 * AO.x, 0.0, 1.0 ) * c.z;
	textureStore( vlgNRA, vec2i( gid.xy ), vec4f( n.x * 0.5 + 0.5, n.y * 0.5 + 0.5, c.y, ao ) );
}
`}var Lt=[{name:`wood`,w:1024,h:1024,mx:2,my:1,hs:.0022,ao:1.2,out:`woodA`,nra:`woodN`},{name:`paint`,w:512,h:512,mx:1,my:.5,hs:.0016,ao:.6,out:null,nra:`paintN`},{name:`roof`,w:512,h:1024,mx:.84,my:1.68,hs:.022,ao:.9,out:`roofA`,nra:`roofN`},{name:`thatch`,w:1024,h:1024,mx:1,my:1,hs:.035,ao:1.3,out:`thatchA`,nra:`thatchN`},{name:`stone`,w:1024,h:1024,mx:2,my:2,hs:.02,ao:1.1,out:`stoneA`,nra:`stoneN`},{name:`hard`,w:512,h:512,mx:1,my:1,hs:.0012,ao:.8,out:`hardA`,nra:`hardN`},{name:`grime`,w:512,h:512,out:`grime`,nra:null},{name:`rope`,w:256,h:256,out:`rope`,nra:null},{name:`net`,w:256,h:256,out:`net`,nra:null}];function Rt(e,t,n){return new y({label:e,width:t,height:n,format:`rgba8unorm`,mips:!0,usage:[`sample`,`storage`,`copyDst`],sampler:`anisoRepeat`})}var zt=class{constructor(){this.baked=!1,this.bakeMs=0,this.textures={},this.jobs=[],this._bytes=0;for(let e of Lt){let t={set:e,fields:null,albedo:null,nra:null};e.nra&&(t.fields=new y({label:`vlgFields_`+e.name,width:e.w,height:e.h,format:`rgba16float`,usage:[`sample`,`storage`]})),e.out&&(t.albedo=Rt(e.out,e.w,e.h),this.textures[e.out]=t.albedo,this._bytes+=e.w*e.h*4*4/3),e.nra&&(t.nra=Rt(e.nra,e.w,e.h),this.textures[e.nra]=t.nra,this._bytes+=e.w*e.h*4*4/3),this.jobs.push(t)}this.trigger=null}get bytes(){return this._bytes}bake(){if(this.baked)return;this.baked=!0;let e=performance.now(),t=[];for(let e of this.jobs){let{set:n}=e,r={};e.fields&&(r.vlgOutFields={storageTexture:e.fields,access:`write`}),e.albedo&&(r.vlgOutAlbedo={storageTexture:e.albedo,access:`write`});let i=new oe({label:`VillageBakeFields `+n.name,modules:[Pt],bindings:r,workgroupSize:[8,8,1],code:Ft[n.name]+`
@compute @workgroup_size( WG_X, WG_Y, 1 )
fn main( @builtin( global_invocation_id ) gid: vec3u ) {
	let dim = vec2u( ${n.w}u, ${n.h}u );
	if ( gid.x >= dim.x || gid.y >= dim.y ) { return; }
	let t = ( vec2f( gid.xy ) + 0.5 ) / vec2f( dim );
	let r = vlgGen( t.x, t.y );
	${e.fields?`textureStore( vlgOutFields, vec2i( gid.xy ), r.fields );`:``}
	${e.albedo?`textureStore( vlgOutAlbedo, vec2i( gid.xy ), r.albedo );`:``}
}
`});if(i.dispatch(i.groups(n.w,n.h)),e.nra){let r=new oe({label:`VillageBakeDerive `+n.name,bindings:{vlgFields:{texture:e.fields,sampleType:`unfilterable-float`},vlgNRA:{storageTexture:e.nra,access:`write`}},workgroupSize:[8,8,1],code:It(n)});r.dispatch(r.groups(n.w,n.h)),ce(e.nra),t.push(e.fields),e.fields=null}e.albedo&&ce(e.albedo)}_.onSubmit(null,()=>{for(let e of t)e.destroy()}),this.bakeMs=performance.now()-e}dispose(){for(let e of this.jobs)e.albedo&&e.albedo.destroy(),e.nra&&e.nra.destroy(),e.fields&&e.fields.destroy()}},Bt=new p({name:`villageMaterials`,deps:[T],code:`
const VLM_TAU: f32 = ${Math.PI*2};

fn vlmHash21( x: f32, y: f32 ) -> f32 { return fract( sin( x * 12.9898 + y * 78.233 ) * 43758.5453 ); }
fn vlmN01( n: f32 ) -> f32 { return n * 0.5 + 0.5; }

// baked normal (RG = xy of a unit normal) -> surface slope ( -dh/du, -dh/dv )
fn vlmSlopeOf( t: vec4f ) -> vec2f {
	let xy = t.xy * 2.0 - 1.0;
	return xy / sqrt( max( 1.0 - dot( xy, xy ), 0.04 ) );
}

fn vlmBand01( p: f32, k: f32 ) -> f32 { return step( k - 0.5, p ) * step( p, k + 0.5 ); }

// three normalMap( packN( vec3( s, 1 ) ) ): tangent frame from the mesh uv derivatives
fn vlmNormalFromSlope( P: vec3f, N: vec3f, uv: vec2f, s: vec2f ) -> vec3f {
	return perturbNormalByMap( P, N, uv, normalize( vec3f( s, 1.0 ) ) );
}

`}),Vt=new p({name:`villageTidal`,deps:[Bt],code:`
struct VlmTidal { col: vec3f, rough: f32, wet: f32 };

// Tidal zone: algae / barnacles / wet darkening driven by world height above sea level.
fn vlmTidal( pw: vec3f, col: vec3f, rough: f32 ) -> VlmTidal {
	let q = vec2f( pw.x + pw.z * 0.7, pw.y );
	let Gt = textureSample( vlgGrime, smpAnisoRepeat, q * vec2f( 0.6, 1.2 ) );
	let y = pw.y + ( Gt.a - 0.5 ) * 0.3;
	let wet = 1.0 - smoothstep( 0.3, 0.75, y );
	let damp = ( 1.0 - smoothstep( 0.7, 1.5, y ) ) * 0.4;
	let algae = mix( vec3f( 0.028, 0.042, 0.02 ), vec3f( 0.11, 0.105, 0.05 ), Gt.a * 0.6 + Gt.r * 0.4 );
	let Gb = textureSample( vlgGrime, smpAnisoRepeat, q * 3.1 );
	let barn = Gb.b * smoothstep( - 1.6, - 0.35, y ) * ( 1.0 - smoothstep( 0.25, 0.6, y ) );
	var c = col * ( 1.0 - damp );
	c = mix( c, algae, wet );
	c = mix( c, vec3f( 0.52, 0.5, 0.44 ), barn * 0.9 );
	var r = mix( rough, 0.3, wet * 0.9 );
	r = mix( r, 0.55, damp );
	r = mix( r, 0.9, barn );
	return VlmTidal( c, r, wet );
}
`}),Ht={vTint:`vec3f`,vData:`vec4f`},Ut={tint:`vec3f`,vdata:`vec4f`},Wt=`	o.vTint = v.tint;
	o.vData = v.vdata;
`;function Gt(e,t,n,{surface:r,vertex:i=``}){let a={};for(let e of n)a[`vlg`+e[0].toUpperCase()+e.slice(1)]=t[e];let o=qe({...e,modules:[T,Bt],attributes:Ut,varyings:Ht,textures:a,vertex:Wt+i});return o.surface=r,o}function Kt(e){let t=Gt({roughness:.85,metalness:0},e,[`woodA`,`woodN`,`paintN`,`grime`],{surface:`
	let aTint = in.vs.vTint;
	let aData = in.vs.vData;
	let seed = aData.x;
	let paint = aData.y;
	let pattern = aData.z;
	let weather = aData.w;
	let uv0 = in.uv;
	let isCap = step( 1500.0, uv0.x );
	let isEnd = step( 500.0, uv0.x ) * ( 1.0 - isCap );
	let endAny = max( isCap, isEnd );
	let uvS = uv0 - vec2f( isCap * 2000.0 + isEnd * 1000.0, 0.0 );
	let fw = fwidth( uvS );
	let px = max( fw.x, fw.y );
	let near = 1.0 - smoothstep( 0.0012, 0.005, px );

	let mLap = vlmBand01( pattern, 1.0 );
	let mBB = vlmBand01( pattern, 2.0 );
	let mTG = vlmBand01( pattern, 3.0 );
	let mLv = vlmBand01( pattern, 4.0 );
	let mPk = vlmBand01( pattern, 5.0 );
	let mHz = vlmBand01( pattern, 6.0 );
	let mNail = step( 6.5, pattern );
	let isVert = mBB + mTG;
	let g = mix( uvS, uvS.yx, isVert ); // g.x along the grain

	// every board of siding / planking gets its own piece of the wood texture
	let boardIdx = floor( uvS.y / 0.2 ) * mLap + floor( uvS.y / 0.16 ) * mHz
		+ floor( uvS.x / 0.42 ) * mBB + floor( uvS.x / 0.14 ) * mTG + floor( uvS.y / 0.105 ) * mPk;
	let pieceSeed = seed * 131.0 + boardIdx * 7.13;
	let off = vec2f( vlmHash21( pieceSeed, 1.7 ), vlmHash21( pieceSeed, 9.2 ) );
	let tuv = g * vec2f( 0.5, 1.0 ) + off;
	let A = textureSample( vlgWoodA, smpAnisoRepeat, tuv );
	let N = textureSample( vlgWoodN, smpAnisoRepeat, tuv );
	let D = textureSample( vlgWoodN, smpAnisoRepeat, tuv * vec2f( 3.0, 4.0 ) + vec2f( 0.37, 0.61 ) );

	// grime / salt / macro variation in mesh space
	let Gm = textureSample( vlgGrime, smpAnisoRepeat, uvS * 0.5 + off.yx * 0.5 );
	let macroV = textureSample( vlgGrime, smpAnisoRepeat, uvS * 0.07 + vec2f( seed * 0.37, seed * 0.71 ) ).a;
	let hasPaint = step( 0.001, paint );
	// raw timber weathers along the grain: the same grime map stretched ~15x along the board, so
	// dirt, salt and tone vary in long streaks and change gradually from one end to the other
	let Gs = textureSample( vlgGrime, smpAnisoRepeat, g * vec2f( 0.035, 0.55 ) + off * 0.5 );
	let rawK = 1.0 - hasPaint;

	// end grain: polar remap of the side-grain texture -> growth rings become arcs (plank ends) or circles (post tops)
	let pith = mix(
		vec2f( vlmHash21( seed, 5.3 ) * 0.4 - 0.6, vlmHash21( seed, 6.1 ) * 0.3 + 0.25 ),
		vec2f( ( vlmHash21( seed, 3.1 ) - 0.5 ) * 0.02, ( vlmHash21( seed, 4.7 ) - 0.5 ) * 0.02 ),
		isCap
	);
	let ev = uvS - pith;
	let er = length( ev );
	let eUV = vec2f( atan2( ev.y, ev.x ) / VLM_TAU * 3.0 + off.x, er + off.y );
	let eLod = log2( max( fwidth( er ) * 1024.0, 1.0 ) );
	let E = textureSampleLevel( vlgWoodA, smpAnisoRepeat, eUV, eLod );

	// raw timber colour: the baked map is fully weathered silver; less weathered pieces shift to warm brown
	let wW = clamp( weather + ( macroV - 0.5 ) * 0.35, 0.0, 1.0 );
	// wood exposed under chipped paint was protected until recently: lighter and warmer
	let wWx = wW * mix( 1.0, 0.6, hasPaint );
	let sideCol = mix( A.rgb * vec3f( 1.26, 1.02, 0.78 ) * 1.04, A.rgb, smoothstep( 0.12, 0.6, wWx ) );
	let endCol = mix( E.rgb * vec3f( 1.3, 1.0, 0.7 ), E.rgb, wW ) * 0.66;
	let woodTone = mix( aTint, vec3f( 1.2 ), hasPaint );
	let boardTone = ( vlmHash21( pieceSeed, 3.3 ) - 0.5 ) * 0.16 + ( Gs.a - 0.5 ) * 0.14;
	let wood = mix( sideCol, endCol, endAny ) * woodTone * ( macroV * 0.2 + 0.9 ) * ( 1.0 + boardTone * rawK );

	// paint film: chips follow the baked chip field; the film has thickness at the chip edges
	// chip field quantiles: 5% 0.26, 10% 0.31, 20% 0.35, 30% 0.39 -> paint 0.7 leaves ~8% bare wood,
	// 0.6 ~14%, 0.5 ~22%; lap drip edges and the splash zone near wall bottoms wear faster
	let chip = A.a;
	let lapEdge = ( 1.0 - smoothstep( 0.0, 0.18, fract( uvS.y / 0.2 ) ) ) * mLap;
	let lowWall = ( 1.0 - smoothstep( 0.0, 0.7, uvS.y ) ) * ( mLap + mBB + mTG );
	let thr = clamp( 0.395 - ( paint - 0.4 ) * 0.32 + lapEdge * 0.05 + lowWall * 0.05, 0.15, 0.55 );
	let painted = smoothstep( thr - 0.012, thr + 0.012, chip ) * hasPaint * ( 1.0 - endAny );
	let e = 1.0 / 1024.0;
	let cX = textureSample( vlgWoodA, smpAnisoRepeat, tuv + vec2f( e, 0.0 ) ).a - textureSample( vlgWoodA, smpAnisoRepeat, tuv - vec2f( e, 0.0 ) ).a;
	let cY = textureSample( vlgWoodA, smpAnisoRepeat, tuv + vec2f( 0.0, e ) ).a - textureSample( vlgWoodA, smpAnisoRepeat, tuv - vec2f( 0.0, e ) ).a;
	let edge = ( 1.0 - smoothstep( 0.0, 0.025, abs( chip - thr ) ) ) * hasPaint * near;
	let edgeSlope = vec2f( cX, cY ) * edge * - 9.0;
	let P = textureSample( vlgPaintN, smpAnisoRepeat, g * vec2f( 1.0, 2.0 ) + off * 3.7 );

	let fade = clamp( Gm.a * 0.55 + wW * 0.25 + macroV * 0.2, 0.0, 1.0 );
	let chalk = aTint * 0.64 + vec3f( 0.27, 0.265, 0.25 );
	// bright paints (white trim, cream siding) never stay white out here: dusty, yellowed, grey
	let aged = mix( aTint, aTint * vec3f( 0.86, 0.84, 0.77 ), smoothstep( 0.45, 0.8, luminance( aTint ) ) * ( 0.6 + Gm.a * 0.4 ) );
	let paintCol = mix( aged, chalk, fade * 0.5 ) * ( ( P.b - 0.5 ) * 0.16 + 1.0 );

	// siding / plank patterns (shading and slope in mesh space)
	let fvLap = fract( uvS.y / 0.2 );
	let lapFade = 1.0 - smoothstep( 0.02, 0.07, fw.y );
	let lapShade = mix( 0.92, mix( 0.45, 1.03, smoothstep( 0.0, 0.09, fvLap ) ) - fvLap * 0.07, lapFade );
	let lapSy = mix( 0.0, select( - 0.14, - 2.4, fvLap < 0.07 ), lapFade );

	let fuBB = fract( uvS.x / 0.42 );
	let bbFade = 1.0 - smoothstep( 0.03, 0.09, fw.x );
	let inBatten = step( fuBB, 0.12 );
	let bbShade = mix( 0.95, mix( 1.0, 0.7, ( 1.0 - smoothstep( 0.12, 0.2, fuBB ) ) * ( 1.0 - inBatten ) ) * ( inBatten * 0.06 + 1.0 ), bbFade );
	let bbSx = select( select( 0.0, 2.0, abs( fuBB - 0.112 ) < 0.012 ), - 2.0, fuBB < 0.015 ) * bbFade;

	let fuTG = fract( uvS.x / 0.14 );
	let tgFade = 1.0 - smoothstep( 0.015, 0.05, fw.x );
	let tgShade = mix( 0.96, mix( 0.6, 1.0, smoothstep( 0.0, 0.06, fuTG ) ), tgFade );
	let tgSx = select( select( 0.0, 1.0, fuTG < 0.06 ), - 1.0, fuTG < 0.03 ) * tgFade;

	let fvLv = fract( uvS.y / 0.07 );
	let lvFade = 1.0 - smoothstep( 0.008, 0.03, fw.y );
	let lvShade = mix( 0.8, mix( 0.42, 1.05, smoothstep( 0.0, 0.8, fvLv ) ), lvFade );
	let lvSy = mix( 0.0, select( - 1.0, 1.2, fvLv > 0.85 ), lvFade );

	let fvPk = fract( uvS.y / 0.105 );
	let pkFade = 1.0 - smoothstep( 0.012, 0.04, fw.y );
	let pkShade = mix( 0.95, mix( 0.58, 1.0, smoothstep( 0.0, 0.07, fvPk ) ), pkFade );
	let pkSy = select( select( 0.0, 1.0, fvPk < 0.07 ), - 1.0, fvPk < 0.035 ) * pkFade;

	let fvHz = fract( uvS.y / 0.16 );
	let hzFade = 1.0 - smoothstep( 0.015, 0.05, fw.y );
	let hzShade = mix( 0.95, mix( 0.5, 1.0, smoothstep( 0.0, 0.05, fvHz ) ), hzFade );

	let shade = 1.0
		+ mLap * ( lapShade - 1.0 ) + mBB * ( bbShade - 1.0 ) + mTG * ( tgShade - 1.0 )
		+ mLv * ( lvShade - 1.0 ) + mPk * ( pkShade - 1.0 ) + mHz * ( hzShade - 1.0 );

	// nail heads with rust bleed on deck planks
	let nu = ( fract( ( uvS.x - 0.1 ) / 0.8 + 0.5 ) - 0.5 ) * 0.8;
	let nv = min( abs( uvS.y - 0.045 ), abs( uvS.y - 0.155 ) );
	let nearN = 1.0 - smoothstep( 0.0015, 0.004, px );
	let nail = ( 1.0 - smoothstep( 0.0045, 0.0075, length( vec2f( nu, nv ) ) ) ) * mNail * nearN;
	let stain = ( 1.0 - smoothstep( 0.0, 0.05, length( vec2f( nu * 0.3, nv * 1.4 ) ) ) ) * mNail;

	// ---- colour
	var col = mix( wood * ( stain * - 0.4 + 1.0 ), paintCol, painted );
	col = mix( col, vec3f( 0.04, 0.032, 0.028 ), nail );
	let dirt = mix( 0.22, 0.5, wW );
	let Gd = mix( Gm, Gs, rawK );
	col = col * ( 1.0 - Gd.r * dirt * mix( 0.75, 0.35, rawK ) );
	col = mix( col, vec3f( 0.62, 0.61, 0.57 ), Gd.g * mix( 0.28, 0.16, rawK ) * ( painted * 0.5 + 0.5 ) );
	col = col * ( 1.0 - Gm.b * 0.3 * hasPaint );
	let isWall = mLap + mBB + mTG;
	// splash-back along the bottom of walls: rain throws sand and soil up the boards, and green
	// mildew grows where they stay damp; a ragged upper edge
	let splashH = 0.55 + ( Gm.a - 0.5 ) * 0.5 + ( macroV - 0.5 ) * 0.3;
	let splash = ( 1.0 - smoothstep( 0.0, splashH, uvS.y ) ) * isWall;
	col = col * ( 1.0 - splash * 0.5 );
	col = mix( col, col * vec3f( 0.78, 0.9, 0.62 ), splash * smoothstep( 0.4, 0.7, Gm.a + Gm.b * 0.5 ) * 0.7 );
	let ao = mix( N.a, mix( 1.0, N.a, 0.35 ) * P.a, painted );
	col = col * shade * mix( 1.0, ao, 0.5 );

	// ---- world-space weathering
	let Ng = in.N;
	let upF = sat( Ng.y );
	let sideF = 1.0 - abs( Ng.y );
	// worn walking path down the middle of deck boards: fibres worn off (paler, warmer, smoother),
	// grey dirt ground into the grain and dark scuffs
	let walkC = - paint - 1.0;
	let wd = ( uvS.x - walkC + ( macroV - 0.5 ) * 0.5 ) / 0.6;
	let walkK = step( paint, - 0.5 ) * smoothstep( 0.6, 0.9, upF ) * exp( - wd * wd ) * ( 1.0 - endAny );
	// the path is worn brown-grey: the silver skin scuffed off, grime trodden into the grain
	let trodden = col * vec3f( 0.8, 0.76, 0.72 );
	col = mix( col, trodden, walkK * 0.55 );
	// grit and dirt packed along the edges of deck boards (the gaps collect it)
	let bev = min( uvS.y, 0.18 - uvS.y );
	let edgeDirt = mNail * smoothstep( 0.6, 0.9, upF ) * ( 1.0 - smoothstep( 0.004, 0.03, bev ) ) * ( 1.0 - endAny );
	col = col * ( 1.0 - edgeDirt * ( 0.18 + Gs.r * 0.15 ) );
	// water that pools along the board edges keeps them damp and darker in broad, gradual bands
	// (no blotches: it follows the boards); sun and salt bleach the open middle of the deck
	let damp = smoothstep( 0.6, 0.9, upF ) * rawK * ( 1.0 - endAny ) * smoothstep( 0.45, 0.75, macroV );
	col = col * ( 1.0 - damp * ( 1.0 - smoothstep( 0.0, 0.06, bev ) ) * 0.18 );
	// rain and rust streaks running down vertical faces (from nails, bolts, sills and roof edges)
	let sqA = textureSample( vlgGrime, smpAnisoRepeat, vec2f( ( in.P.x + in.P.z ) * 2.3 + seed * 5.0, in.P.y * 0.12 ) );
	let sqB = textureSample( vlgGrime, smpAnisoRepeat, vec2f( ( in.P.x - in.P.z ) * 5.1, in.P.y * 0.3 + 0.37 ) );
	let streak = sideF * sideF * clamp( smoothstep( 0.45, 0.85, sqB.r ) + smoothstep( 0.6, 0.7, sqA.a ) * 0.35, 0.0, 1.0 ) * ( 0.45 + wW * 0.55 ) * ( 1.0 - endAny );
	let rustS = streak * smoothstep( 0.5, 0.6, sqA.a );
	col = col * ( 1.0 - streak * 0.24 );
	col = mix( col, col * vec3f( 1.04, 0.78, 0.6 ), rustS * 0.6 );
	// bird droppings: sparse splats on upward faces above head height (rails, posts, cap beams, sills)
	let bq = in.P.xz / 0.3;
	let bc = floor( bq );
	let bh = vlmHash21( bc.x + seed, bc.y );
	let bo = fract( bq ) - 0.5 - ( vec2f( vlmHash21( bc.x + 3.1, bc.y ), vlmHash21( bc.x, bc.y + 7.7 ) ) - 0.5 ) * 0.45;
	let bd = length( bo * vec2f( 1.0, 1.35 ) ) + ( Gm.a - 0.5 ) * 0.08;
	let dropK = step( 0.93, bh ) * smoothstep( 0.75, 0.95, upF ) * step( 2.6, in.P.y ) * ( 1.0 - smoothstep( 0.1, 0.15, bd ) );
	let dropCore = dropK * ( 1.0 - smoothstep( 0.02, 0.07, bd ) );
	col = mix( col, mix( vec3f( 0.62, 0.61, 0.56 ), vec3f( 0.8, 0.79, 0.74 ), dropCore ), dropK * 0.6 );

	// ---- normal (grain space -> mesh space) + analytic pattern relief
	let sWood = vlmSlopeOf( N ) + vlmSlopeOf( D ) * near * 0.5;
	let sPaint = vlmSlopeOf( N ) * 0.3 + vlmSlopeOf( P );
	let sG = ( mix( sWood, sPaint, painted ) + edgeSlope ) * ( 1.0 - endAny * 0.6 ) * ( 1.0 - walkK * 0.45 ) * ( 1.0 - dropK * 0.7 );
	let sM = mix( sG, sG.yx, isVert );
	let sPat = vec2f(
		mBB * bbSx + mTG * tgSx,
		mLap * lapSy + mLv * lvSy + mPk * pkSy
	);
	// ---- roughness: satin-ish paint vs dry raw timber; grime and salt dull it
	let roughRaw = N.b + wW * 0.03;
	let roughPaint = mix( 0.4, 0.7, P.b ) + fade * 0.12;
	let rough = mix( roughRaw, roughPaint, painted ) + Gm.r * 0.06 + Gm.g * 0.08 - nail * 0.3 - walkK * 0.1 + streak * 0.05 - dropCore * 0.2;
	let res = vlmTidal( in.P, col, rough );

	// ---- glass mode (windows and lanterns share this material to save a draw call)
	let isGlass = step( 8.5, pattern );
	let glass = vlmGlass( in.uv, aTint, seed, paint, weather );
	s.albedo = mix( res.col, glass.color, isGlass );
	s.roughness = clamp( mix( res.rough, glass.rough, isGlass ), 0.03, 1.0 );
	s.ao = mix( ao, 1.0, isGlass );
	s.emissive = glass.emissive * isGlass;
	s.normal = vlmNormalFromSlope( in.P, in.N, in.uv, ( sM + sPat ) * ( 1.0 - isGlass ) );
`});return t.name=`VillageWood`,t.modules.push(Vt,Xt),t}function qt(e){let t=Gt({roughness:.5,metalness:.2},e,[`roofA`,`roofN`,`hardN`],{surface:`
	let aTint = in.vs.vTint;
	let aData = in.vs.vData;
	let seed = aData.x;
	let rustAmt = aData.y;
	let galv = aData.z;
	let uvm = in.uv;
	let fw = fwidth( uvm );
	let near = 1.0 - smoothstep( 0.0015, 0.006, max( fw.x, fw.y ) );
	let sheetF = uvm.y / 0.84 + floor( seed * 13.0 );
	let sheetId = floor( sheetF );
	let sheetR = vlmHash21( sheetId, seed * 91.0 );
	let tuv = vec2f( sheetF, uvm.x / 1.68 + sheetR * 5.37 );
	let M = textureSample( vlgRoofA, smpAnisoRepeat, tuv );
	let N = textureSample( vlgRoofN, smpAnisoRepeat, tuv );
	let macroV = textureSample( vlgRoofA, smpAnisoRepeat, tuv * vec2f( 0.13, 0.09 ) + vec2f( seed, seed * 1.7 ) );

	let eave = 1.0 - smoothstep( 0.0, 0.9, uvm.x );
	let replaced = step( 0.86, sheetR );
	let rustIn = clamp( rustAmt + 0.15 + replaced * 0.2 + ( macroV.r - 0.4 ) * 0.5, 0.0, 1.0 );
	// rust channel quantiles: 50% 0.25, 70% 0.31, 90% 0.42 -> rust 0.4 ~10%, 0.6 ~25%, 0.8 ~45%
	let thr = mix( 0.62, 0.23, rustIn ) - eave * 0.2;
	let rust = smoothstep( thr - 0.04, thr + 0.04, M.r );
	let fade = clamp( M.b * 0.7 + macroV.b * 0.3, 0.0, 1.0 );

	let paintCol = mix( aTint, aTint * 0.7 + vec3f( 0.12, 0.1, 0.085 ), fade * 0.55 ) * ( sheetR * 0.16 + 0.9 );
	let patchCol = paintCol * vec3f( 0.72, 0.68, 0.66 ) + vec3f( 0.03, 0.025, 0.02 );
	let galvCol = vec3f( 0.34, 0.35, 0.35 ) * ( fade * 0.35 + 0.78 );
	let base = mix( mix( paintCol, patchCol, replaced ), galvCol, galv );
	let rustCol = mix( vec3f( 0.12, 0.045, 0.02 ), vec3f( 0.4, 0.17, 0.065 ), M.g );
	var col = mix( base, rustCol, rust );
	col = col * ( 1.0 - M.a * 0.45 );
	col = col * mix( 1.0, N.a, 0.55 );

	// texture X runs along the eave (mesh v), texture Y up the slope (mesh u)
	let sT = vlmSlopeOf( N );
	let Hd = textureSample( vlgHardN, smpAnisoRepeat, uvm * 1.7 );
	let sl = vec2f( sT.y, sT.x ) + vlmSlopeOf( Hd ) * ( rust * 0.8 + 0.2 ) * near;
	s.normal = vlmNormalFromSlope( in.P, in.N, in.uv, sl );

	s.albedo = col;
	s.metalness = mix( mix( 0.04, 0.5, galv ), 0.0, rust );
	s.roughness = clamp( mix( mix( 0.55, 0.42, galv ) + ( N.b - 0.5 ) * 0.4 + fade * 0.15, 0.9, rust ) + M.a * 0.08, 0.05, 1.0 );
	s.ao = N.a;
`});return t.name=`VillageRoofMetal`,t}function Jt(e){let t=Gt({roughness:.95,metalness:0},e,[`thatchA`,`thatchN`,`grime`],{surface:`
	let aData = in.vs.vData;
	let seed = aData.x;
	let age = aData.y;
	let uvm = in.uv;
	let tuv = vec2f( uvm.y + vlmHash21( seed, 1.3 ) * 7.0, uvm.x );
	let A = textureSample( vlgThatchA, smpAnisoRepeat, tuv );
	let N = textureSample( vlgThatchN, smpAnisoRepeat, tuv );
	// macro variation: patches of newer / older thatch and rain streaks down the slope
	let Gm = textureSample( vlgGrime, smpAnisoRepeat, vec2f( tuv.x * 0.23, tuv.y * 0.19 ) + seed );
	let Gs = textureSample( vlgGrime, smpAnisoRepeat, vec2f( tuv.x * 0.5, tuv.y * 0.25 ) + seed * 1.7 );

	let lum = dot( A.rgb, vec3f( 0.3, 0.59, 0.11 ) );
	let greyed = vec3f( lum ) * vec3f( 0.95, 0.9, 0.8 );
	let ageL = clamp( age + ( Gm.a - 0.5 ) * 0.9, 0.0, 1.0 );
	var col = mix( A.rgb, greyed, ageL * 0.8 ) * ( Gm.a * 0.35 + 0.82 ) * ( 1.0 - ageL * 0.2 );
	col = col * ( 1.0 - Gs.r * 0.25 ) * ( 1.0 - Gs.b * 0.35 );
	col = col * mix( 1.0, N.a, 0.55 );
	let sT = vlmSlopeOf( N );
	s.normal = vlmNormalFromSlope( in.P, in.N, in.uv, vec2f( sT.y, sT.x ) );
	s.albedo = col;
	s.roughness = N.b;
	s.ao = N.a;
`});return t.name=`VillageThatch`,t}function Yt(e){let t=Gt({roughness:.5,metalness:.5},e,[`hardA`,`hardN`,`rope`,`grime`],{surface:`
	let aTint = in.vs.vTint;
	let aData = in.vs.vData;
	let seed = aData.x;
	let rustAmt = aData.y;
	let isRope = step( 1.5, aData.w );
	let uv0 = in.uv;
	let off = vec2f( vlmHash21( seed, 2.3 ), vlmHash21( seed, 8.9 ) );
	let tuv = uv0 + off;
	let HA = textureSample( vlgHardA, smpAnisoRepeat, tuv );
	let HN = textureSample( vlgHardN, smpAnisoRepeat, tuv );
	let hasRust = step( 0.001, rustAmt );
	let thr = mix( 0.95, 0.3, rustAmt );
	let rust = smoothstep( thr - 0.06, thr + 0.06, HA.r ) * hasRust;
	var base = aTint * ( 1.0 - HA.b * 0.2 ) * ( ( HA.r - 0.5 ) * 0.1 + 1.0 );
	base = mix( base, vec3f( 0.3, 0.3, 0.29 ), HA.g * 0.55 * hasRust * ( 1.0 - rust ) );
	let rustCol = mix( vec3f( 0.12, 0.045, 0.02 ), vec3f( 0.4, 0.17, 0.06 ), smoothstep( 0.3, 0.9, HA.r ) );
	let hardCol = mix( base, rustCol, rust ) * mix( 1.0, HN.a, 0.5 );
	let hardRough = mix( clamp( aData.w + ( HN.b - 0.5 ) * 0.35 - HA.g * 0.15 * hasRust, 0.04, 1.0 ), 0.88, rust );
	let hardS = vlmSlopeOf( HN ) * ( rust * 0.8 + 0.25 );

	// rope: uvs normalised by the circumference so the three strands wrap seamlessly
	let ropeR = max( aData.w - 2.0, 0.004 );
	let R = textureSample( vlgRope, smpAnisoRepeat, uv0 / ( ropeR * VLM_TAU ) + vec2f( aData.x * 3.1, 0.0 ) );
	let ropeCol = aTint * mix( 0.45, 1.25, R.r ) * mix( 1.0, R.g, 0.6 );
	let rn = R.ba * 2.0 - 1.0;
	let ropeS = rn / sqrt( max( 1.0 - dot( rn, rn ), 0.04 ) );

	let res = vlmTidal( in.P, mix( hardCol, ropeCol, isRope ), mix( hardRough, 0.93, isRope ) );
	s.normal = vlmNormalFromSlope( in.P, in.N, in.uv, mix( hardS, ropeS, isRope ) );
	s.albedo = res.col;
	s.roughness = res.rough;
	s.metalness = aData.z * ( 1.0 - max( rust, res.wet ) ) * ( 1.0 - isRope );
	s.ao = mix( HN.a, R.g, isRope );
`});return t.name=`VillageHard`,t.modules.push(Vt),t}var Xt=new p({name:`villageGlass`,deps:[Bt],code:`
struct VlmGlass { color: vec3f, rough: f32, emissive: vec3f };

fn vlmGlass( uvm: vec2f, aTint: vec3f, seed: f32, kind: f32, lit: f32 ) -> VlmGlass {
	// grime map channels: R streaks, G salt, B spots, A macro
	let Gl = textureSample( vlgGrime, smpAnisoRepeat, uvm * 0.45 + vec2f( seed * 3.7, seed * 1.3 ) );
	let edgeD = min( min( uvm.x, 1.0 - uvm.x ), min( uvm.y, 1.0 - uvm.y ) );
	let frameDirt = 1.0 - smoothstep( 0.0, 0.07, edgeD );
	let curtain = ( 1.0 - smoothstep( 0.18, 0.3, uvm.x ) + smoothstep( 0.7, 0.82, uvm.x ) ) * step( 0.35, seed );
	let folds = vlmN01( sin( uvm.x * 70.0 + seed * 20.0 ) );
	let interior = vec3f( 0.012, 0.014, 0.017 ) * ( Gl.a * 0.8 + 0.6 );
	var winCol = mix( interior, aTint * 0.16 * ( folds * 0.4 + 0.6 ), curtain );
	winCol = winCol + vec3f( 0.05, 0.05, 0.045 ) * Gl.g + vec3f( 0.03, 0.026, 0.02 ) * ( Gl.b + frameDirt );
	let lanternCol = aTint * 0.55 * ( 1.0 - Gl.b * 0.25 );
	let isLantern = step( 0.5, kind );
	let color = mix( winCol, lanternCol, isLantern );
	let rough = mix( 0.035 + Gl.r * 0.22 + Gl.g * 0.18 + Gl.b * 0.1 + frameDirt * 0.25, 0.32 + Gl.r * 0.15, isLantern );

	let nightOn = smoothstep( 0.15, 0.75, frame.night );
	let warm = vec3f( 1.0, 0.56, 0.24 );
	let center = 1.0 - smoothstep( 0.1, 0.75, abs( uvm.x - 0.5 ) * 1.4 + abs( uvm.y - 0.62 ) );
	let winGlow = mix( warm * ( center * 0.6 + 0.5 ), ( aTint * 0.5 + warm * 0.5 ) * ( folds * 0.3 + 0.45 ), curtain )
		* ( vlmHash21( seed, 3.1 ) * 0.5 + 0.75 ) * 3.2 * ( 1.0 - Gl.r * 0.25 );
	let flicker = sin( frame.time * 9.0 + seed * 40.0 ) * sin( frame.time * 5.3 + seed * 13.0 ) * 0.12 + 0.9;
	let lanternGlow = vec3f( 1.0, 0.64, 0.3 ) * 6.0 * flicker;
	let emissive = mix( winGlow, lanternGlow, isLantern ) * nightOn * max( lit, isLantern );
	return VlmGlass( color, rough, emissive );
}
`});function Zt(e){let t=Gt({roughness:.92,metalness:0},e,[`stoneA`,`stoneN`,`paintN`,`grime`],{surface:`
	let aTint = in.vs.vTint;
	let aData = in.vs.vData;
	let seed = aData.x;
	let style = aData.y;
	let uv0 = in.uv;
	let isCap = step( 1500.0, uv0.x );
	let isEnd = step( 500.0, uv0.x ) * ( 1.0 - isCap );
	let uvS = uv0 - vec2f( isCap * 2000.0 + isEnd * 1000.0, 0.0 );
	let isRubble = step( 1.5, style );
	let isPlaster = vlmBand01( style, 1.0 );
	let off = vec2f( vlmHash21( seed, 4.1 ), vlmHash21( seed, 7.7 ) );
	let tuv = uvS * mix( 0.5, 0.8, isRubble ) + off;
	let A = textureSample( vlgStoneA, smpAnisoRepeat, tuv );
	let N = textureSample( vlgStoneN, smpAnisoRepeat, tuv );
	// lime plaster: trowel marks from the paint film set, stains / dust from the grime map
	let puv = uvS + off * 3.0;
	let PN = textureSample( vlgPaintN, smpAnisoRepeat, puv * vec2f( 0.7, 1.4 ) );
	let PA = textureSample( vlgGrime, smpAnisoRepeat, puv * 0.5 );

	// plaster survives where the baked plaster field is high; the plaster edge has thickness
	let pf = A.a + ( PA.a - 0.5 ) * 0.12;
	let pm = smoothstep( 0.3, 0.33, pf ) * isPlaster;
	let e = 1.0 / 1024.0;
	let gX = textureSample( vlgStoneA, smpAnisoRepeat, tuv + vec2f( e, 0.0 ) ).a - textureSample( vlgStoneA, smpAnisoRepeat, tuv - vec2f( e, 0.0 ) ).a;
	let gY = textureSample( vlgStoneA, smpAnisoRepeat, tuv + vec2f( 0.0, e ) ).a - textureSample( vlgStoneA, smpAnisoRepeat, tuv - vec2f( 0.0, e ) ).a;
	let pEdge = ( 1.0 - smoothstep( 0.0, 0.03, abs( pf - 0.315 ) ) ) * isPlaster;

	let stoneCol = A.rgb * mix( vec3f( 1.0 ), aTint * 1.1, 0.15 );
	var plasterCol = aTint * ( 1.0 - PA.r * 0.3 ) * ( 1.0 - PA.b * 0.25 ) * ( ( PA.a - 0.5 ) * 0.16 + 1.0 );
	plasterCol = plasterCol * mix( 1.0, PN.a, 0.6 ) * ( ( PN.b - 0.5 ) * 0.12 + 1.0 );
	var col = mix( stoneCol * mix( 1.0, N.a, 0.5 ), plasterCol, pm );
	// sand dust and splash dirt near the ground
	let low = 1.0 - smoothstep( 0.05, 0.75, uvS.y );
	let dust = low * smoothstep( 0.25, 0.7, PA.a ) * 0.8;
	col = mix( col, vec3f( 0.46, 0.4, 0.3 ), dust );
	col = col * ( 1.0 - low * 0.18 );

	let sl = mix( vlmSlopeOf( N ), vlmSlopeOf( PN ) * 2.5, pm ) + vec2f( gX, gY ) * pEdge * - 6.0;
	s.normal = vlmNormalFromSlope( in.P, in.N, in.uv, sl );
	s.albedo = col;
	s.roughness = clamp( mix( N.b, PN.b * 0.3 + 0.66, pm ) + dust * 0.05, 0.05, 1.0 );
	s.ao = mix( N.a, PN.a, pm );
`});return t.name=`VillageStone`,t}var Qt=`
	let w = v.vdata.y;
	let ph = frame.time * 1.7 + v.position.x * 0.6 + v.position.z * 0.45 + v.vdata.x * 20.0;
	let gust = sin( ph ) * 0.6 + sin( ph * 2.3 + 1.7 ) * 0.3 + 0.55;
	let flutter = sin( frame.time * 7.0 + v.position.y * 9.0 + v.vdata.x * 50.0 ) * 0.25;
	let swayPos = v.position + vec3f( frame.windDir.x, flutter * 0.3, frame.windDir.y ) * ( ( gust + flutter ) * ( frame.windSpeed * 0.011 * w ) );
`;function $t(e){let t=Gt({roughness:.88,metalness:0,side:2,alphaTest:.5},e,[`net`,`grime`],{vertex:Qt+`
	let aData = v.vdata;
	let isFlag = step( 5000.0, aData.z );
	// flag: oriented downwind around its pole
	let a = aData.y;
	let dir = normalize( vec3f( frame.windDir.x, 0.0, frame.windDir.y ) );
	let perp = vec3f( - dir.z, 0.0, dir.x );
	let strength = smoothstep( 0.5, 9.0, frame.windSpeed );
	let phase = frame.time * 7.5 - a * 5.0 + aData.x * 30.0;
	let wave = sin( phase ) * ( a * 0.09 ) * ( strength * 0.7 + 0.3 );
	let droop = ( 1.0 - strength ) * a * 0.55;
	let flagPos = vec3f( aData.z - 10000.0, v.position.y - droop, aData.w ) + dir * ( a * ( 1.0 - droop * 0.4 ) ) + perp * wave;
	v.position = mix( swayPos, flagPos, isFlag );
`,surface:`
	let aTint = in.vs.vTint;
	let aData = in.vs.vData;
	let isFlag = step( 5000.0, aData.z );
	let isNet = step( 0.001, aData.z ) * ( 1.0 - isFlag );
	let uvm = in.uv;

	// net
	let tile = max( aData.z, 0.02 ) * 4.0;
	let nuv = uvm / tile;
	let Nt = textureSample( vlgNet, smpAnisoRepeat, nuv );
	let fwn = fwidth( nuv );
	let far = smoothstep( 0.05, 0.1, max( fwn.x, fwn.y ) );
	let sc = in.pixel;
	let ign = fract( fract( sc.x * 0.06711056 + sc.y * 0.00583715 ) * 52.9829189 );
	let netAlpha = mix( Nt.r, step( ign, 0.55 ), far );
	let netCol = aTint * mix( 0.5, 1.05, Nt.g ) * mix( 1.0, 0.8, far );
	let nn = Nt.ba * 2.0 - 1.0;
	let netS = nn / sqrt( max( 1.0 - dot( nn, nn ), 0.04 ) ) * ( 1.0 - far );

	// cloth: woven canvas, sun faded
	let weave = vlmN01( sin( uvm.x * 900.0 ) ) * vlmN01( sin( uvm.y * 900.0 ) );
	let wf = 1.0 - smoothstep( 0.0005, 0.002, fwidth( uvm.x ) );
	let fadeN = textureSample( vlgGrime, smpAnisoRepeat, uvm * 0.8 + aData.x ).a;
	let clothCol = mix( aTint, aTint * 0.6 + vec3f( 0.3 ), fadeN * 0.5 ) * ( weave * 0.12 * wf + 0.94 );

	// flag normal (the cloth swings downwind around its pole, see the vertex snippet)
	let a = aData.y;
	let dir = normalize( vec3f( frame.windDir.x, 0.0, frame.windDir.y ) );
	let perp = vec3f( - dir.z, 0.0, dir.x );
	let strength = smoothstep( 0.5, 9.0, frame.windSpeed );
	let phase = frame.time * 7.5 - a * 5.0 + aData.x * 30.0;
	let slopeW = cos( phase ) * 0.45 * ( a + 0.2 ) * ( strength * 0.7 + 0.3 );
	let flagN = normalize( perp - dir * slopeW ) * select( - 1.0, 1.0, in.front );

	s.normal = normalize( mix( vlmNormalFromSlope( in.P, in.N, in.uv, netS * isNet ), flagN, isFlag ) );
	s.alpha = mix( 1.0, netAlpha, isNet );
	s.albedo = mix( mix( clothCol, netCol, isNet ), aTint * ( fadeN * 0.15 + 0.88 ), isFlag );
`});return t.name=`VillageFabric`,t}function en(e){let t=Gt({roughness:.9,metalness:0,side:2,transparent:!0,depthWrite:!1},e,[`net`],{vertex:Qt+`	v.position = swayPos;
`,surface:`
	let aTint = in.vs.vTint;
	let aData = in.vs.vData;
	let uvm = in.uv;
	let tile = max( aData.z, 0.02 ) * 4.0;
	let nuv = uvm / tile;
	let Nt = textureSample( vlgNet, smpAnisoRepeat, nuv );
	let fwn = fwidth( nuv );
	let far = smoothstep( 0.05, 0.1, max( fwn.x, fwn.y ) );
	let nn = Nt.ba * 2.0 - 1.0;
	let netS = nn / sqrt( max( 1.0 - dot( nn, nn ), 0.04 ) ) * ( 1.0 - far );

	s.normal = normalize( vlmNormalFromSlope( in.P, in.N, in.uv, netS ) );
	// strands up close; average coverage of the knotted mesh (~0.4) once they are sub-pixel
	s.alpha = mix( Nt.r, 0.4, far ) * 0.95;
	s.albedo = aTint * mix( 0.5, 1.05, Nt.g ) * mix( 1.0, 0.85, far );
`});return t.name=`VillageNet`,t}function tn(e=new zt){let t=e.textures;return{wood:Kt(t),roofMetal:qt(t),thatch:Jt(t),hard:Yt(t),stone:Zt(t),fabric:$t(t),net:en(t)}}function nn(e){return e.split(/[^A-Za-z0-9]+/).filter(Boolean).map((e,t)=>t===0?e[0].toLowerCase()+e.slice(1):e[0].toUpperCase()+e.slice(1)).join(``)}var rn=class{constructor(e,t,{maxInstances:n,dynamic:r=!1,fade:i=!1}){this.name=e,this.kinds=t;let a=t.length;this.maxInstances=n,this.dynamic=r;let o=this.prefix=nn(e),s=0,c=0;for(let e of t)s+=e.geometry.attributes.position.count,c+=e.geometry.index.count;let l=new Float32Array(s*3),u=new Float32Array(s*3),d=new Float32Array(s*4),f=new Float32Array(s),m=new Uint32Array(c);this.firstIndex=new Uint32Array(a),this.indexCount=new Uint32Array(a),this.baseVertex=new Uint32Array(a);let h=0,g=0;t.forEach((e,t)=>{let n=e.geometry,r=n.attributes.position.count;l.set(n.attributes.position.array,h*3),u.set(n.attributes.normal.array,h*3),n.attributes.aData&&d.set(n.attributes.aData.array,h*4),f.fill(t,h,h+r),m.set(n.index.array,g),this.firstIndex[t]=g,this.indexCount[t]=n.index.count,this.baseVertex[t]=h,e.triangles=n.index.count/3,e.vertices=r,h+=r,g+=n.index.count});let _=new E;_.setAttribute(`position`,new w(l,3)),_.setAttribute(`normal`,new w(u,3)),_.setAttribute(`aData`,new w(d,4)),_.setAttribute(`aKind`,new w(f,1)),_.setIndex(new w(m,1)),this.vertexCount=s,this.data=new Float32Array(n*16),this.instanceBuffer=new v({label:e+`.instances`,count:n*4,type:`vec4f`});let y=this;this.dataAttr={set needsUpdate(e){e&&y.upload()}};let b=n*2;this.list=new Uint32Array(b),this.listBuffer=new v({label:e+`.list`,count:b,type:`u32`}),this.baseArray=new Uint32Array(Math.max(a,4)),this.baseBuffer=new v({label:e+`.base`,count:this.baseArray.length,type:`u32`}),this.commands=new Uint32Array(a*5),this.indirectBuffer=new v({label:e+`.indirect`,count:a*5,type:`u32`,usage:[`indirect`]}),this.offsetPool=[[],[]],this.mainOffsets=[],this.shadowOffsets=[],_.indirect={buffer:this.indirectBuffer,offsets:this.mainOffsets},this.geometry=_,this.pairKind=new Uint16Array(b),this.pairId=new Uint32Array(b),this.pairs=0,this.counts=new Uint32Array(a),this.cursor=new Uint32Array(a),this.visibleInstances=0,this.visibleTriangles=0,this.shadowTriangles=0,this.mesh=null,this.fadeMesh=null,this.fadeOffsets=[],this.fadeInstances=0;let x={[o+`Instances`]:{storage:this.instanceBuffer,access:`read`},[o+`List`]:{storage:this.listBuffer,access:`read`},[o+`Base`]:{storage:this.baseBuffer,access:`read`}},S=`
fn ${o}RecordIndex( kind: u32, instance: u32 ) -> u32 { return ${o}List[ ${o}Base[ kind ] + instance ]; }
fn ${o}Record( index: u32, k: u32 ) -> vec4f { return ${o}Instances[ index * 4u + k ]; }
`;if(i){this.fadeList=new Uint32Array(b),this.fadeListBuffer=new v({label:e+`.fadeList`,count:b,type:`u32`}),this.fadeBaseArray=new Uint32Array(Math.max(a,4)),this.fadeBaseBuffer=new v({label:e+`.fadeBase`,count:this.fadeBaseArray.length,type:`u32`}),this.fadeCommands=new Uint32Array(a*5),this.fadeIndirectBuffer=new v({label:e+`.fadeIndirect`,count:a*5,type:`u32`,usage:[`indirect`]});let t=new E;for(let e in _.attributes)t.setAttribute(e,_.attributes[e]);t.setIndex(_.index),t.indirect={buffer:this.fadeIndirectBuffer,offsets:this.fadeOffsets},this.fadeGeometry=t,this.fadeKind=new Uint16Array(b),this.fadeVal=new Uint32Array(b),this.fadePairs=0,this.fadeCounts=new Uint32Array(a),this.fadeCursor=new Uint32Array(a),this.fadePool=[],x[o+`FadeList`]={storage:this.fadeListBuffer,access:`read`},x[o+`FadeBase`]={storage:this.fadeBaseBuffer,access:`read`},S+=`
struct ${o}FadeInfo { index: u32, fade: f32, outgoing: f32 };
// fade channel: the instance record index, its fade (0..1) and whether this draw is the
// outgoing level (1) or the incoming one (0)
fn ${o}FadeEntry( kind: u32, instance: u32 ) -> ${o}FadeInfo {
	let e = ${o}FadeList[ ${o}FadeBase[ kind ] + instance ];
	return ${o}FadeInfo( e & 0xffffffu, f32( ( e >> 24u ) & 127u ) / 127.0, f32( e >> 31u ) );
}
`}this.module=new p({name:`batch-`+o,bindings:x,code:S})}fadeEntry(){return`${this.prefix}FadeEntry( u32( v.aKind ), v.instance )`}addFade(e,t,n,r){let i=this.fadePairs++;this.fadeKind[i]=e;let a=Math.round(Math.min(1,Math.max(0,n))*127);this.fadeVal[i]=(t&16777215|a<<24|(r?2147483648:0))>>>0,this.fadeCounts[e]++}createFadeMesh(e){let t=new C(this.fadeGeometry,e);t.name=this.name+`.fade`,t.frustumCulled=!1,t.castShadow=!1,t.receiveShadow=!0,t.matrixAutoUpdate=!1;let n=this.fadeGeometry;return t.onBeforeRender=()=>{n.indirect.offsets=this.fadeOffsets},this.fadeMesh=t,t}recordIndex(){return`${this.prefix}RecordIndex( u32( v.aKind ), v.instance )`}record(e){return[0,1,2,3].map(t=>`${this.prefix}Record( ${e}, ${t}u )`)}createMesh(e,{castShadow:t=!1,receiveShadow:n=!0}={}){let r=new C(this.geometry,e);r.name=this.name,r.frustumCulled=!1,r.castShadow=t,r.receiveShadow=n,r.matrixAutoUpdate=!1;let i=this.geometry;return r.onBeforeRender=(e,t,n)=>{let r=n&&(n.isOrthographicCamera||n.reversedDepth===!1);i.indirect.offsets=r?this.shadowOffsets:this.mainOffsets},this.mesh=r,r}upload(){this.instanceBuffer.write(this.data)}begin(){this.pairs=0,this.counts.fill(0),this.fadeList&&(this.fadePairs=0,this.fadeCounts.fill(0))}add(e,t){let n=this.pairs++;this.pairKind[n]=e,this.pairId[n]=t,this.counts[e]++}offsets(e,t){let n=this.offsetPool[e];return n[t]||(n[t]=Array(t).fill(0))}commit(){let e=this.kinds.length,t=this.commands,n=this.baseArray,r=this.counts,i=this.cursor,a=0,o=0,s=0,c=0,l=0;for(let c=0;c<e;c++){let e=r[c];n[c]=a,i[c]=a;let l=c*5;t[l]=this.indexCount[c],t[l+1]=e,t[l+2]=this.firstIndex[c],t[l+3]=this.baseVertex[c],t[l+4]=0,e>0&&(this.kinds[c].shadow&&s++,this.kinds[c].shadowOnly||o++),a+=e}let u=this.list,d=this.pairKind,f=this.pairId;for(let e=0;e<this.pairs;e++)u[i[d[e]]++]=f[e];let p=this.offsets(0,o),m=this.offsets(1,s),h=0,g=0;for(let t=0;t<e;t++){let e=r[t];if(e===0)continue;let n=this.kinds[t];n.shadowOnly||(p[h++]=t*20,c+=e*n.triangles),n.shadow&&(m[g++]=t*20,l+=e*n.triangles)}this.mainOffsets=p,this.shadowOffsets=m,this.geometry.indirect.offsets=p,this.fadeList&&this.commitFade(),this.visibleInstances=a,this.visibleTriangles=c,this.shadowTriangles=l,a>0&&this.listBuffer.write(u.subarray(0,a)),this.baseBuffer.write(n),this.indirectBuffer.write(t)}commitFade(){let e=this.kinds.length,t=this.fadeCommands,n=this.fadeBaseArray,r=this.fadeCounts,i=this.fadeCursor,a=0,o=0;for(let s=0;s<e;s++){let e=r[s];n[s]=a,i[s]=a;let c=s*5;t[c]=this.indexCount[s],t[c+1]=e,t[c+2]=this.firstIndex[s],t[c+3]=this.baseVertex[s],t[c+4]=0,e>0&&!this.kinds[s].shadowOnly&&o++,a+=e}let s=this.fadeList,c=this.fadeKind,l=this.fadeVal;for(let e=0;e<this.fadePairs;e++)s[i[c[e]]++]=l[e];let u=this.fadePool[o]||(this.fadePool[o]=Array(o).fill(0)),d=0,f=0;for(let t=0;t<e;t++)r[t]===0||this.kinds[t].shadowOnly||(u[d++]=t*20,f+=r[t]*this.kinds[t].triangles);this.fadeOffsets=u,this.fadeGeometry.indirect.offsets=u,this.fadeInstances=a,this.visibleTriangles+=f,a>0&&this.fadeListBuffer.write(s.subarray(0,a)),this.fadeBaseBuffer.write(n),this.fadeIndirectBuffer.write(t),this.fadeMesh&&(this.fadeMesh.visible=o>0)}dispose(){this.geometry.dispose(),this.fadeGeometry&&this.fadeGeometry.dispose();for(let e of[this.instanceBuffer,this.listBuffer,this.baseBuffer,this.indirectBuffer,this.fadeListBuffer,this.fadeBaseBuffer,this.fadeIndirectBuffer])e&&e.destroy();this.mesh&&this.mesh.removeFromParent()}},H={silverside:0,chromis:1,grunt:2,yellowtail:3,tang:4,sergeant:5,wrasse:6,parrot:7,angel:8,barracuda:9,redSnapper:10,grouper:11,tuna:12,mahi:13,mullet:14,needlefish:15,jack:16,tarpon:17,stingray:18,eagleRay:19,turtle:20},U=(e,t,n,r,i,a=.16)=>({from:e,to:t,rays:n,spiny:!0,h:r,rake:i,notch:a}),W=(e,t,n,r,i,a=.015)=>({from:e,to:t,rays:n,spiny:!1,h:r,rake:i,notch:a}),an={silverside:{pattern:H.silverside,body:.83,sec:2,top:[[0,.003],[.03,.016],[.1,.035],[.25,.058],[.45,.068],[.65,.056],[.85,.034],[1,.026]],bot:[[0,.003],[.03,.014],[.1,.032],[.25,.055],[.45,.064],[.65,.05],[.85,.03],[1,.024]],wid:[[0,.003],[.05,.016],[.2,.032],[.4,.036],[.7,.026],[1,.013]],mouth:{corner:.07,y:.004,tip:.006,protrude:0},eye:{u:.1,y:.014,r:.03},opercle:.22,scales:.02,scaleVis:.35,lateral:.05,arch:.1,dorsal:[U(.47,.53,5,[[0,.035],[1,.02]],[.5,.7],.125),W(.63,.74,9,[[0,.04],[1,.02]],[.6,.9])],anal:[W(.58,.78,12,[[0,.035],[1,.018]],[.6,.9])],pectoral:{u:.2,y:.02,len:.1,base:.018,rays:10,shape:`pointed`,spread:.4},pelvic:{u:.45,len:.05,rays:5},caudal:{shape:`forked`,len:.17,span:.1,fork:.5,rays:13},iris:14211264,irid:.8,metal:.65},chromis:{pattern:H.chromis,body:.76,sec:2.1,top:[[0,.005],[.03,.03],[.08,.07],[.16,.12],[.28,.158],[.42,.168],[.56,.153],[.7,.118],[.84,.074],[1,.05]],bot:[[0,.005],[.03,.024],[.08,.054],[.16,.09],[.28,.123],[.42,.133],[.56,.123],[.7,.098],[.84,.064],[1,.045]],wid:[[0,.005],[.05,.03],[.15,.05],[.3,.058],[.5,.053],[.7,.04],[.9,.024],[1,.02]],mouth:{corner:.06,y:0,tip:.004,protrude:0},eye:{u:.15,y:.05,r:.033},opercle:.27,scales:.028,scaleVis:.6,lateral:.55,arch:.15,dorsal:[U(.3,.6,12,[[0,.05],[.3,.075],[1,.07]],[.35,.5]),W(.6,.87,11,[[0,.08],[.5,.085],[1,.035]],[.6,1.1])],anal:[U(.56,.62,2,[[0,.04],[1,.06]],[.4,.5],.1),W(.62,.86,11,[[0,.08],[.4,.085],[1,.035]],[.6,1.1])],pectoral:{u:.3,y:-.01,len:.17,base:.035,rays:17,shape:`pointed`,spread:.45},pelvic:{u:.33,len:.12,rays:6},caudal:{shape:`forked`,len:.24,span:.19,fork:.35,rays:17},iris:4876952,irid:.15,metal:.15},grunt:{pattern:H.grunt,body:.81,sec:2.2,top:[[0,.005],[.03,.026],[.08,.055],[.16,.093],[.28,.13],[.42,.143],[.56,.135],[.7,.105],[.84,.068],[1,.048]],bot:[[0,.005],[.03,.02],[.08,.042],[.16,.072],[.28,.1],[.42,.11],[.56,.103],[.7,.083],[.84,.058],[1,.045]],wid:[[0,.005],[.05,.028],[.15,.05],[.3,.06],[.5,.056],[.7,.042],[.9,.026],[1,.021]],mouth:{corner:.1,y:-.012,tip:-.006,protrude:0},eye:{u:.14,y:.048,r:.026},opercle:.28,scales:.02,scaleVis:.5,lateral:.45,arch:.15,dorsal:[U(.31,.6,12,[[0,.05],[.25,.085],[1,.045]],[.3,.55],.175),W(.6,.84,15,[[0,.055],[.5,.06],[1,.03]],[.6,.95])],anal:[U(.62,.67,3,[[0,.03],[1,.055]],[.4,.5],.1),W(.67,.84,8,[[0,.065],[1,.03]],[.6,.9])],pectoral:{u:.31,y:-.02,len:.16,base:.03,rays:16,shape:`pointed`,spread:.4},pelvic:{u:.34,len:.1,rays:6},caudal:{shape:`forked`,len:.19,span:.14,fork:.55,rays:17},iris:13148224,irid:.25,metal:.25},yellowtail:{pattern:H.yellowtail,body:.77,sec:2.1,top:[[0,.004],[.03,.02],[.08,.045],[.16,.074],[.28,.099],[.42,.108],[.56,.099],[.7,.077],[.85,.051],[1,.037]],bot:[[0,.004],[.03,.016],[.08,.035],[.16,.058],[.28,.079],[.42,.089],[.56,.082],[.7,.063],[.85,.044],[1,.034]],wid:[[0,.004],[.05,.02],[.14,.036],[.28,.047],[.45,.047],[.65,.038],[.85,.026],[1,.017]],mouth:{corner:.1,y:-.008,tip:-.003,protrude:.003},eye:{u:.12,y:.038,r:.022},opercle:.26,scales:.016,scaleVis:.45,lateral:.42,arch:.12,dorsal:[U(.33,.6,10,[[0,.04],[.3,.06],[1,.04]],[.35,.55],.15),W(.6,.83,13,[[0,.045],[1,.025]],[.6,.95])],anal:[U(.62,.66,3,[[0,.025],[1,.04]],[.4,.5],.1),W(.66,.82,9,[[0,.05],[1,.025]],[.6,.9])],pectoral:{u:.3,y:-.015,len:.15,base:.025,rays:15,shape:`pointed`,spread:.4},pelvic:{u:.34,len:.09,rays:6},caudal:{shape:`forked`,len:.23,span:.165,fork:.36,rays:17},iris:14198832,irid:.35,metal:.3},tang:{pattern:H.tang,body:.8,sec:2,top:[[0,.006],[.03,.04],[.08,.1],[.16,.16],[.28,.21],[.42,.232],[.56,.22],[.7,.17],[.84,.095],[1,.042]],bot:[[0,.006],[.03,.035],[.08,.085],[.16,.14],[.28,.19],[.42,.215],[.56,.205],[.7,.16],[.84,.09],[1,.04]],wid:[[0,.005],[.05,.025],[.15,.04],[.3,.046],[.5,.043],[.7,.033],[.9,.02],[1,.015]],mouth:{corner:.04,y:.006,tip:.006,protrude:0},eye:{u:.17,y:.085,r:.026},opercle:.27,scales:0,scaleVis:0,lateral:.75,arch:.1,dorsal:[U(.22,.4,9,[[0,.04],[1,.07]],[.4,.5],.125),W(.4,.9,26,[[0,.07],[.6,.085],[1,.045]],[.55,.95])],anal:[U(.45,.52,3,[[0,.03],[1,.06]],[.4,.5],.1),W(.52,.9,24,[[0,.07],[.6,.08],[1,.045]],[.55,.95])],pectoral:{u:.3,y:0,len:.15,base:.03,rays:16,shape:`pointed`,spread:.45},pelvic:{u:.3,len:.07,rays:5},caudal:{shape:`lunate`,len:.2,span:.19,fork:.55,rays:16},iris:2767480,irid:.1,metal:.05},sergeant:{pattern:H.sergeant,body:.79,sec:2.1,top:[[0,.005],[.03,.032],[.08,.075],[.16,.13],[.28,.175],[.42,.19],[.56,.176],[.7,.138],[.84,.085],[1,.055]],bot:[[0,.005],[.03,.026],[.08,.06],[.16,.103],[.28,.143],[.42,.155],[.56,.143],[.7,.113],[.84,.073],[1,.05]],wid:[[0,.005],[.05,.03],[.15,.05],[.3,.057],[.5,.052],[.7,.04],[.9,.024],[1,.02]],mouth:{corner:.06,y:-.004,tip:0,protrude:0},eye:{u:.15,y:.055,r:.03},opercle:.28,scales:.026,scaleVis:.55,lateral:.6,arch:.15,dorsal:[U(.3,.6,13,[[0,.05],[.3,.07],[1,.065]],[.35,.5]),W(.6,.86,13,[[0,.075],[.5,.08],[1,.035]],[.6,1])],anal:[U(.56,.62,2,[[0,.04],[1,.06]],[.4,.5],.1),W(.62,.85,12,[[0,.075],[.5,.078],[1,.035]],[.6,1])],pectoral:{u:.3,y:-.01,len:.16,base:.035,rays:18,shape:`rounded`,spread:.45},pelvic:{u:.33,len:.11,rays:6},caudal:{shape:`forked`,len:.21,span:.17,fork:.6,rays:17},iris:12628064,irid:.1,metal:.15},wrasse:{pattern:H.wrasse,body:.84,sec:2,top:[[0,.004],[.03,.02],[.08,.042],[.18,.07],[.32,.088],[.5,.09],[.68,.075],[.85,.05],[1,.042]],bot:[[0,.004],[.03,.018],[.08,.038],[.18,.063],[.32,.08],[.5,.082],[.68,.068],[.85,.046],[1,.04]],wid:[[0,.004],[.05,.022],[.15,.038],[.3,.045],[.5,.043],[.7,.034],[.9,.022],[1,.018]],mouth:{corner:.07,y:-.004,tip:0,protrude:0},eye:{u:.13,y:.03,r:.02},opercle:.25,scales:.02,scaleVis:.35,lateral:.55,arch:.25,dorsal:[U(.28,.5,8,[[0,.03],[1,.035]],[.5,.6],.075),W(.5,.85,13,[[0,.038],[1,.03]],[.6,.8])],anal:[W(.56,.84,14,[[0,.03],[1,.028]],[.6,.8])],pectoral:{u:.24,y:0,len:.12,base:.024,rays:13,shape:`rounded`,spread:.5},pelvic:{u:.28,len:.06,rays:5},caudal:{shape:`truncate`,len:.16,span:.1,fork:.88,rays:13},iris:13658688,irid:.15,metal:.1},parrot:{pattern:H.parrot,body:.82,sec:2.2,top:[[0,.012],[.02,.035],[.06,.068],[.12,.098],[.22,.128],[.36,.143],[.5,.14],[.64,.118],[.78,.088],[.9,.066],[1,.058]],bot:[[0,.012],[.02,.03],[.06,.055],[.12,.083],[.22,.108],[.36,.123],[.5,.12],[.64,.103],[.78,.078],[.9,.06],[1,.055]],wid:[[0,.01],[.04,.038],[.12,.062],[.25,.077],[.45,.075],[.65,.06],[.85,.04],[1,.029]],mouth:{corner:.06,y:-.018,tip:-.012,protrude:0},eye:{u:.13,y:.052,r:.018},opercle:.27,scales:.034,scaleVis:.75,lateral:.55,arch:.3,dorsal:[U(.28,.55,9,[[0,.035],[1,.04]],[.5,.6],.075),W(.55,.84,10,[[0,.045],[1,.035]],[.6,.8])],anal:[U(.6,.64,2,[[0,.025],[1,.035]],[.5,.6],.075),W(.64,.83,9,[[0,.04],[1,.032]],[.6,.8])],pectoral:{u:.26,y:0,len:.13,base:.03,rays:13,shape:`rounded`,spread:.5},pelvic:{u:.3,len:.07,rays:5},caudal:{shape:`lunate`,len:.18,span:.14,fork:.62,rays:15},iris:13668400,irid:.1,metal:.05},angel:{pattern:H.angel,body:.82,sec:2,top:[[0,.006],[.03,.045],[.08,.11],[.16,.18],[.28,.24],[.42,.262],[.56,.25],[.7,.205],[.84,.13],[1,.06]],bot:[[0,.006],[.03,.04],[.08,.1],[.16,.165],[.28,.225],[.42,.25],[.56,.24],[.7,.198],[.84,.125],[1,.058]],wid:[[0,.005],[.05,.025],[.15,.04],[.3,.046],[.5,.043],[.7,.034],[.9,.02],[1,.016]],mouth:{corner:.05,y:.004,tip:.006,protrude:0},eye:{u:.18,y:.075,r:.026},opercle:.3,scales:.03,scaleVis:.9,lateral:.7,arch:.1,dorsal:[U(.34,.5,9,[[0,.035],[1,.07]],[.4,.55],.1),W(.5,.95,20,[[0,.09],[.7,.16],[.85,.2],[1,.06]],[.7,1.2])],anal:[U(.5,.58,3,[[0,.03],[1,.06]],[.4,.55],.1),W(.58,.95,18,[[0,.09],[.7,.15],[.85,.19],[1,.06]],[.7,1.2])],pectoral:{u:.33,y:0,len:.15,base:.035,rays:18,shape:`rounded`,spread:.4},pelvic:{u:.32,len:.14,rays:6},caudal:{shape:`rounded`,len:.18,span:.14,fork:1,rays:17},iris:13672480,irid:.05,metal:.05},barracuda:{pattern:H.barracuda,body:.87,sec:2,top:[[0,.002],[.03,.012],[.08,.025],[.16,.041],[.28,.057],[.42,.064],[.58,.063],[.72,.054],[.85,.04],[.95,.03],[1,.028]],bot:[[0,.002],[.03,.014],[.08,.028],[.16,.044],[.28,.057],[.42,.063],[.58,.061],[.72,.051],[.85,.038],[.95,.028],[1,.026]],wid:[[0,.002],[.04,.014],[.12,.028],[.25,.039],[.45,.044],[.65,.039],[.85,.028],[1,.018]],mouth:{corner:.14,y:-.006,tip:-.002,protrude:.012},eye:{u:.12,y:.018,r:.012},opercle:.24,scales:.008,scaleVis:.25,lateral:.2,arch:.05,dorsal:[U(.44,.5,5,[[0,.055],[1,.03]],[.35,.6],.1),W(.74,.8,9,[[0,.05],[1,.02]],[.55,.9])],anal:[W(.75,.81,9,[[0,.045],[1,.02]],[.55,.9])],pectoral:{u:.3,y:-.015,len:.08,base:.016,rays:12,shape:`pointed`,spread:.35},pelvic:{u:.47,len:.05,rays:6},caudal:{shape:`forked`,len:.13,span:.1,fork:.55,rays:17},iris:12107952,irid:.5,metal:.55},redSnapper:{pattern:H.redSnapper,body:.82,sec:2.15,top:[[0,.004],[.02,.02],[.06,.045],[.12,.075],[.2,.11],[.3,.145],[.42,.162],[.55,.155],[.68,.125],[.8,.09],[.9,.062],[1,.05]],bot:[[0,.004],[.02,.018],[.06,.035],[.12,.06],[.2,.09],[.3,.115],[.42,.132],[.55,.128],[.68,.1],[.8,.07],[.9,.054],[1,.048]],wid:[[0,.004],[.03,.02],[.1,.042],[.2,.058],[.35,.066],[.5,.062],[.65,.05],[.8,.034],[.92,.024],[1,.02]],mouth:{corner:.11,y:-.012,tip:-.004,protrude:.004},eye:{u:.135,y:.058,r:.022},opercle:.29,scales:.018,scaleVis:.7,lateral:.45,arch:.15,dorsal:[U(.34,.62,10,[[0,.045],[.3,.085],[1,.065]],[.3,.5],.175),W(.62,.86,14,[[0,.075],[.4,.078],[1,.035]],[.6,.95])],anal:[U(.64,.68,3,[[0,.03],[1,.05]],[.4,.5],.1),W(.68,.84,8,[[0,.075],[1,.035]],[.6,.9])],pectoral:{u:.34,y:-.02,len:.19,base:.034,rays:16,shape:`pointed`,spread:.35},pelvic:{u:.38,len:.11,rays:6},caudal:{shape:`forked`,len:.18,span:.13,fork:.78,rays:17},iris:13119520,irid:.3,metal:.25},grouper:{pattern:H.grouper,body:.84,sec:2.2,top:[[0,.006],[.03,.03],[.08,.06],[.15,.094],[.25,.128],[.38,.148],[.52,.146],[.66,.126],[.8,.094],[.92,.07],[1,.06]],bot:[[0,.006],[.03,.03],[.08,.06],[.15,.09],[.25,.12],[.38,.137],[.52,.134],[.66,.11],[.8,.08],[.92,.063],[1,.058]],wid:[[0,.006],[.04,.035],[.12,.064],[.25,.079],[.4,.081],[.6,.07],[.8,.05],[1,.03]],mouth:{corner:.16,y:-.022,tip:-.01,protrude:.008},eye:{u:.14,y:.07,r:.019},opercle:.33,scales:.011,scaleVis:.4,lateral:.55,arch:.2,dorsal:[U(.3,.6,11,[[0,.04],[.3,.07],[1,.055]],[.3,.45],.21),W(.6,.85,17,[[0,.065],[.5,.075],[1,.03]],[.55,.9])],anal:[U(.64,.68,3,[[0,.025],[1,.04]],[.4,.5],.125),W(.68,.84,8,[[0,.065],[.5,.07],[1,.035]],[.55,.9])],pectoral:{u:.33,y:-.02,len:.16,base:.04,rays:17,shape:`rounded`,spread:.4},pelvic:{u:.35,len:.12,rays:6},caudal:{shape:`rounded`,len:.16,span:.11,fork:1,rays:15},iris:10127968,irid:.05,metal:0},tuna:{pattern:H.tuna,body:.84,sec:2,top:[[0,.003],[.03,.02],[.08,.045],[.15,.075],[.26,.105],[.38,.118],[.5,.115],[.62,.095],[.74,.065],[.86,.035],[.95,.02],[1,.018]],bot:[[0,.003],[.03,.018],[.08,.04],[.15,.065],[.26,.092],[.38,.105],[.5,.102],[.62,.085],[.74,.058],[.86,.032],[.95,.018],[1,.016]],wid:[[0,.003],[.04,.025],[.12,.055],[.25,.08],[.4,.088],[.55,.08],[.7,.058],[.85,.035],[.95,.03],[1,.02]],mouth:{corner:.085,y:-.008,tip:-.003,protrude:.003},eye:{u:.1,y:.03,r:.022},opercle:.26,scales:0,scaleVis:0,lateral:.3,arch:.2,dorsal:[U(.3,.47,13,[[0,.07],[.3,.06],[1,.015]],[.45,.8],.1),W(.52,.6,12,[[0,.1],[.5,.05],[1,.015]],[.75,1.1])],anal:[W(.56,.63,12,[[0,.09],[.5,.045],[1,.012]],[.75,1.1])],pectoral:{u:.3,y:0,len:.2,base:.03,rays:12,shape:`falcate`,spread:.3},pelvic:{u:.32,len:.06,rays:5},caudal:{shape:`lunate`,len:.16,span:.25,fork:.25,rays:19},finlets:{from:.64,to:.95,dorsal:8,ventral:7},iris:12623936,irid:.9,metal:.55},mahi:{pattern:H.mahi,body:.83,sec:2,top:[[0,.016],[.005,.075],[.013,.12],[.03,.148],[.07,.16],[.18,.154],[.32,.134],[.48,.112],[.64,.088],[.8,.06],[.92,.036],[1,.026]],bot:[[0,.01],[.03,.045],[.08,.072],[.15,.09],[.3,.096],[.45,.09],[.6,.078],[.75,.06],[.9,.035],[1,.022]],wid:[[0,.008],[.04,.034],[.15,.05],[.3,.052],[.5,.045],[.7,.035],[.9,.02],[1,.015]],mouth:{corner:.075,y:-.03,tip:-.02,protrude:.004},eye:{u:.085,y:.012,r:.017},opercle:.22,scales:.007,scaleVis:.2,lateral:.25,arch:.25,dorsal:[W(.07,.97,44,[[0,.075],[.08,.105],[.3,.08],[.8,.055],[1,.03]],[.35,.9])],anal:[W(.5,.97,24,[[0,.055],[.2,.06],[1,.03]],[.5,.9])],pectoral:{u:.2,y:-.02,len:.11,base:.022,rays:16,shape:`pointed`,spread:.4},pelvic:{u:.22,len:.08,rays:6},caudal:{shape:`forked`,len:.17,span:.17,fork:.3,rays:17},iris:9079376,irid:.6,metal:.25},mullet:{pattern:H.mullet,body:.82,sec:2.15,top:[[0,.008],[.03,.03],[.08,.055],[.16,.08],[.28,.1],[.42,.107],[.56,.1],[.7,.082],[.84,.058],[1,.044]],bot:[[0,.008],[.03,.028],[.08,.05],[.16,.072],[.28,.088],[.42,.093],[.56,.086],[.7,.07],[.84,.05],[1,.04]],wid:[[0,.008],[.04,.036],[.12,.06],[.25,.072],[.42,.072],[.6,.06],[.8,.04],[1,.024]],mouth:{corner:.055,y:-.004,tip:0,protrude:0},eye:{u:.1,y:.024,r:.02},opercle:.25,scales:.024,scaleVis:.6,lateral:.3,arch:0,dorsal:[U(.44,.52,4,[[0,.06],[1,.035]],[.35,.6],.125),W(.66,.74,9,[[0,.06],[1,.025]],[.55,.9])],anal:[W(.62,.72,11,[[0,.055],[1,.025]],[.55,.9])],pectoral:{u:.27,y:.03,len:.13,base:.022,rays:16,shape:`pointed`,spread:.45},pelvic:{u:.4,len:.08,rays:6},caudal:{shape:`forked`,len:.18,span:.13,fork:.6,rays:15},iris:13154448,irid:.5,metal:.55},needlefish:{pattern:H.needlefish,body:.9,sec:2,top:[[0,.0015],[.1,.0035],[.17,.007],[.22,.017],[.28,.026],[.4,.032],[.6,.034],[.78,.03],[.9,.02],[1,.014]],bot:[[0,.0015],[.1,.0035],[.17,.007],[.22,.016],[.28,.024],[.4,.03],[.6,.032],[.78,.028],[.9,.019],[1,.013]],wid:[[0,.0015],[.1,.003],[.18,.008],[.24,.02],[.4,.026],[.7,.024],[.9,.016],[1,.012]],mouth:{corner:.2,y:0,tip:0,protrude:.006},eye:{u:.235,y:.008,r:.012},opercle:.3,scales:0,scaleVis:0,lateral:-.7,arch:0,dorsal:[W(.76,.9,14,[[0,.04],[.2,.035],[1,.018]],[.6,.95])],anal:[W(.73,.89,18,[[0,.04],[.2,.035],[1,.018]],[.6,.95])],pectoral:{u:.33,y:.006,len:.06,base:.01,rays:12,shape:`pointed`,spread:.35},pelvic:{u:.62,len:.04,rays:6},caudal:{shape:`forked`,len:.1,span:.06,fork:.75,rays:15},iris:13686984,irid:.6,metal:.55},jack:{pattern:H.jack,body:.78,sec:2,top:[[0,.004],[.03,.024],[.08,.055],[.16,.088],[.28,.114],[.42,.12],[.56,.107],[.7,.078],[.84,.042],[.94,.024],[1,.02]],bot:[[0,.004],[.03,.02],[.08,.046],[.16,.074],[.28,.098],[.42,.105],[.56,.094],[.7,.068],[.84,.037],[.94,.022],[1,.019]],wid:[[0,.004],[.05,.022],[.15,.04],[.3,.048],[.5,.044],[.7,.032],[.88,.02],[1,.016]],mouth:{corner:.09,y:-.006,tip:-.002,protrude:.002},eye:{u:.12,y:.03,r:.024},opercle:.26,scales:.008,scaleVis:.2,lateral:.35,arch:.45,dorsal:[U(.34,.46,8,[[0,.045],[.3,.05],[1,.02]],[.4,.7],.15),W(.47,.84,27,[[0,.075],[.15,.06],[1,.025]],[.55,1.05])],anal:[U(.54,.57,2,[[0,.02],[1,.03]],[.5,.6],.15),W(.58,.84,24,[[0,.065],[.15,.05],[1,.022]],[.55,1.05])],pectoral:{u:.29,y:0,len:.2,base:.024,rays:19,shape:`falcate`,spread:.35},pelvic:{u:.31,len:.07,rays:6},caudal:{shape:`forked`,len:.22,span:.19,fork:.25,rays:17},iris:13156512,irid:.7,metal:.5},tarpon:{pattern:H.tarpon,body:.8,sec:2.05,top:[[0,.004],[.03,.02],[.08,.045],[.16,.075],[.28,.1],[.42,.11],[.56,.102],[.7,.08],[.84,.052],[1,.036]],bot:[[0,.004],[.03,.022],[.08,.05],[.16,.078],[.28,.098],[.42,.105],[.56,.098],[.7,.077],[.84,.05],[1,.034]],wid:[[0,.004],[.05,.025],[.15,.044],[.3,.052],[.5,.05],[.7,.04],[.88,.026],[1,.018]],mouth:{corner:.13,y:.004,tip:.018,protrude:.014},eye:{u:.09,y:.028,r:.022},opercle:.22,scales:.05,scaleVis:1,lateral:.05,arch:.05,dorsal:[W(.45,.56,13,[[0,.07],[.6,.06],[.93,.05],[1,.2]],[.45,.95])],anal:[W(.64,.78,20,[[0,.07],[.3,.05],[1,.02]],[.5,.95])],pectoral:{u:.24,y:-.06,len:.13,base:.02,rays:13,shape:`pointed`,spread:.5},pelvic:{u:.43,len:.08,rays:9},caudal:{shape:`forked`,len:.2,span:.17,fork:.35,rays:19},iris:12632240,irid:.3,metal:.8},stingray:{pattern:H.stingray,body:1,eye:{u:.3,y:.05,r:.012},opercle:.4,mouth:{corner:.1,y:-.03,tip:-.03},lateral:0,arch:0,scales:0,scaleVis:0,iris:6316096,irid:0,metal:0},eagleRay:{pattern:H.eagleRay,body:1,eye:{u:.2,y:.05,r:.014},opercle:.3,mouth:{corner:.1,y:-.03,tip:-.03},lateral:0,arch:0,scales:0,scaleVis:0,iris:4210752,irid:0,metal:0},turtle:{pattern:H.turtle,body:1,eye:{u:.1,y:.04,r:.013},opercle:.2,mouth:{corner:.05,y:0,tip:0},lateral:0,arch:0,scales:0,scaleVis:0,iris:3153936,irid:0,metal:0}},on={silverside:{back:7178874,flank:12897486,belly:15133418,fin:11056302,edge:10003616,rough:.3},chromis:{back:1522296,flank:2581688,belly:5605572,fin:2974384,edge:791588,rough:.4},grunt:{back:11045420,flank:14466106,belly:15130032,fin:14199856,edge:13146660,rough:.4},yellowtail:{back:5663378,flank:10397374,belly:15722212,fin:14468726,edge:14860352,rough:.35},tang:{back:1190252,flank:2245280,belly:2771624,fin:2375574,edge:6988508,rough:.45},sergeant:{back:12889148,flank:13028028,belly:15132380,fin:11184792,edge:9079424,rough:.4},wrasse:{back:13941790,flank:14994492,belly:15658708,fin:14469782,edge:13152368,rough:.4},parrot:{back:1927756,flank:3054202,belly:7126172,fin:3971706,edge:13400666,rough:.4},angel:{back:921106,flank:1184278,belly:1447450,fin:921106,edge:2892816,rough:.45},barracuda:{back:3556940,flank:11844800,belly:15133420,fin:5923940,edge:2896948,rough:.3},redSnapper:{back:12073532,flank:14183018,belly:15649988,fin:13384756,edge:12069924,rough:.33},grouper:{back:8020552,flank:11836540,belly:14208180,fin:7232064,edge:3944484,rough:.4},tuna:{back:923176,flank:6714506,belly:14080734,fin:1975856,edge:1448482,rough:.28},mahi:{back:1203306,flank:13481258,belly:15721114,fin:2907292,edge:1854620,rough:.3},mullet:{back:4741206,flank:11844798,belly:15133418,fin:8686732,edge:7107700,rough:.33},needlefish:{back:3569260,flank:11848908,belly:15659762,fin:7771790,edge:4613740,rough:.3},jack:{back:5666444,flank:12372176,belly:15133934,fin:8819868,edge:3949644,rough:.3},tarpon:{back:3558492,flank:13949660,belly:15659250,fin:8819868,edge:5002844,rough:.28},stingray:{back:7102540,flank:8023126,belly:14210768,fin:4997686,edge:9075814,rough:.5},eagleRay:{back:1316894,flank:1843240,belly:14738146,fin:1053720,edge:2764342,rough:.35},turtle:{back:4076064,flank:8808506,belly:13154436,fin:4866616,edge:10130048,rough:.45}},G={BODY:0,DORSAL1:1,DORSAL2:2,ANAL:3,CAUDAL:4,PECTORAL:5,PELVIC:6,FINLET:7,EYE:8,MOUTH:9,FLESH:10,ICE:11,LEAF:12,SHELL:13,FILLET:14,DISC:15,WHIP:16,CARAPACE:17,SKIN:18,FLIPPER:19},sn=Math.PI*2,cn=(e,t)=>{if(t<=e[0][0])return e[0][1];for(let n=1;n<e.length;n++)if(t<=e[n][0]){let r=e[n-1],i=e[n],a=(t-r[0])/(i[0]-r[0]),o=a*a*(3-2*a);return r[1]+(i[1]-r[1])*(.5*a+.5*o)}return e[e.length-1][1]},ln=(e,t,n)=>e+(t-e)*n,un=(e,t,n)=>Math.max(t,Math.min(n,e)),dn=(e,t,n)=>{let r=un((n-e)/(t-e),0,1);return r*r*(3-2*r)},fn=class{constructor(){this.pos=[],this.dat=[],this.idx=[],this.seams=[]}v(e,t,n,r,i,a,o){return this.pos.push(e,t,n),this.dat.push(r,i,a,o),this.pos.length/3-1}tri(e,t,n){this.idx.push(e,t,n)}quad(e,t,n,r){this.idx.push(e,t,r,t,n,r)}build(){let e=new E;e.setAttribute(`position`,new D(this.pos,3)),e.setAttribute(`aData`,new D(this.dat,4)),e.setIndex(this.idx),e.computeVertexNormals();let t=e.attributes.normal.array;for(let[e,n]of this.seams){let r=t[e*3]+t[n*3],i=t[e*3+1]+t[n*3+1],a=t[e*3+2]+t[n*3+2],o=Math.hypot(r,i,a)||1;r/=o,i/=o,a/=o,t[e*3]=t[n*3]=r,t[e*3+1]=t[n*3+1]=i,t[e*3+2]=t[n*3+2]=a}return e.computeBoundingSphere(),e}};function pn(e,t){return{T:cn(e.top,t),B:cn(e.bot,t),W:cn(e.wid,t),e:2/e.sec}}function mn(e,t,n){let r=Math.sin(t),i=Math.cos(t);return n[0]=e.W*Math.sign(r)*Math.abs(r)**+e.e,n[1]=(i>=0?e.T:e.B)*Math.sign(i)*Math.abs(i)**+e.e,n}function hn(e,t){let n=[0,0],r=[0,0];mn(e,0,n);let i=0;for(let a=1;a<=24;a++)mn(e,t*a/24,r),i+=Math.hypot(r[0]-n[0],r[1]-n[1]),n[0]=r[0],n[1]=r[1];return i}function gn(e,t){let n=t>=0?e.T:e.B,r=Math.min(1,Math.abs(t)/Math.max(n,1e-4)),i=2/e.e;return e.W*Math.max(0,1-r**+i)**(1/i)}function _n(e,t){let n=e.e,r=t>=0?un(t/Math.max(e.T,1e-4),0,.97)**(1/n):-(un(-t/Math.max(e.B,1e-4),0,.97)**(1/n));return Math.acos(r)}function vn(e,t,n,r){let i=[34,16,7,4][t],a=[];for(let e=0;e<=i;e++){let t=e/i;a.push(.6*t**1.55+.4*t)}a[0]=[.006,.014,.03,.05][t],t<2&&(e=>{let t=1,n=1/0;for(let r=1;r<a.length-1;r++){let i=Math.abs(a[r]-e);i<n&&(n=i,t=r)}a[t]=e})(e.mouth.corner);let o=a.filter(e=>e>=n-1e-6&&e<=r+1e-6);return o[0]>n+1e-4&&n>0&&o.unshift(n),o[o.length-1]<r-1e-4&&o.push(r),o}function yn(e,t,n){let r=n.lod,i=t.body,a=e=>.5-e*i,o=n.u0??0,s=n.u1??1,c=[26,14,7,5][r],l=vn(t,r,o,s),u=n.mouth&&o===0,d=t.mouth,f=d.corner,p=e=>ln(d.tip,d.y,Math.min(1,e/f)),m=pn(t,f),h=_n(m,d.y),g=un(Math.round(c*h/Math.PI),3,c-3),_=c-g,v=e=>u?1-dn(f*.8,f*1.3,e):0,y=[],b=[0,0];for(let n of l){let r=pn(t,n),o=n<f?_n(r,p(n)):_n(r,d.y*(r.T+r.B)/(m.T+m.B)),s=a(n),c={u:n,upper:[],lower:[]},l=v(n),u=hn(r,Math.PI);for(let t=0;t<=g;t++){let a=-o+2*o*t/g;mn(r,a,b);let l=hn(r,Math.abs(a)),u=b[1]>=0?b[1]/Math.max(r.T,1e-4):b[1]/Math.max(r.B,1e-4);c.upper.push(e.v(b[0],b[1],s,n*i,G.BODY,l,u))}for(let t=0;t<=_;t++){let a=o+(sn-2*o)*t/_;mn(r,a,b);let d=a>Math.PI?sn-a:a,p=Math.min(u,hn(r,d)),m=b[1]>=0?b[1]/Math.max(r.T,1e-4):b[1]/Math.max(r.B,1e-4),h=(t===0||t===_)&&n>=f?0:l;c.lower.push(e.v(b[0],b[1],s,n*i,G.BODY+.9*h,p,m))}e.seams.push([c.upper[g],c.lower[0]],[c.upper[0],c.lower[_]]),c.c=r,c.z=s,c.phiM=o,c.wj=l,c.jawFwd=0,y.push(c)}for(let t=0;t<y.length-1;t++){let n=y[t],r=y[t+1];for(let t=0;t<g;t++)e.quad(n.upper[t],n.upper[t+1],r.upper[t+1],r.upper[t]);for(let t=0;t<_;t++)e.quad(n.lower[t],n.lower[t+1],r.lower[t+1],r.lower[t])}let x=y[0],S=y[y.length-1];if(o===0){let t=.5,n=p(0),r=Math.min(x.c.T,x.c.B)*.3,a=e.v(0,n+r*.5,t,0,G.BODY,0,0),o=e.v(0,n-r*.5,t+(u?d.protrude:0),0,G.BODY+.9*!!u,0,0);for(let t=0;t<g;t++)e.tri(a,x.upper[t+1],x.upper[t]);for(let t=0;t<_;t++)e.tri(o,x.lower[t+1],x.lower[t]);if(u||(e.tri(a,x.upper[0],o),e.tri(a,o,x.upper[g])),u){let t=[],n=[],r=y.filter(e=>e.u<=f+1e-6),s=e=>Math.min(1,e/f);for(let a of r){let r=.45*(1-s(a.u)),o=p(a.u),c=a.upper[g],l=a.upper[0],u=e.pos[c*3],d=e.pos[l*3],f=e.pos[c*3+1],m=a.c.T,h=a.c.B,_=s(a.u);t.push([e.v(u*.97,f,a.z,a.u*i,G.MOUTH,_,0),e.v(0,o+r*(m-o)*.8,a.z-.004,a.u*i,G.MOUTH,_,0),e.v(d*.97,f,a.z,a.u*i,G.MOUTH,_,0)]);let v=a.wj,y=a.z+a.jawFwd;n.push([e.v(u*.97,f,y,a.u*i,G.MOUTH+.9*v,_,0),e.v(0,o-r*(o+h)*.8,y-.004,a.u*i,G.MOUTH+.9*v,_,0),e.v(d*.97,f,y,a.u*i,G.MOUTH+.9*v,_,0)])}for(let r=0;r<t.length-1;r++){let i=t[r],a=t[r+1];e.quad(i[0],i[1],a[1],a[0]),e.quad(i[1],i[2],a[2],a[1]);let o=n[r],s=n[r+1];e.quad(o[1],o[0],s[0],s[1]),e.quad(o[2],o[1],s[1],s[2])}let c=t[0],l=n[0];e.tri(a,c[1],c[0]),e.tri(a,c[2],c[1]),e.tri(o,l[0],l[1]),e.tri(o,l[1],l[2])}}else bn(e,x,g,_,i,!0);if(s>=1){let t=e.v(0,0,S.z-.004,i,G.BODY,0,0);for(let n=0;n<g;n++)e.tri(t,S.upper[n],S.upper[n+1]);for(let n=0;n<_;n++)e.tri(t,S.lower[n],S.lower[n+1])}else bn(e,S,g,_,i,!1);return y}function bn(e,t,n,r,i,a){let o=[...t.upper,...t.lower.slice(1,r)].map(n=>{let r=e.pos[n*3],a=e.pos[n*3+1];return e.v(r,a,t.z,t.u*i,G.FLESH,r,a)}),s=e.v(0,(t.c.T-t.c.B)*.3,t.z,t.u*i,G.FLESH,0,(t.c.T-t.c.B)*.3);for(let t=0;t<o.length;t++){let n=o[t],r=o[(t+1)%o.length];a?e.tri(s,r,n):e.tri(s,n,r)}}function xn(e,t,n,r,i,a,o){let s=[];for(let e=0;e<n.length;e++)if(s.push({...n[e],dip:0,id:a[e]}),e<n.length-1){let t=n[e],i=n[e+1],o=(e,t)=>[(e[0]+t[0])/2,(e[1]+t[1])/2,(e[2]+t[2])/2];s.push({b:o(t.b,i.b),t:o(t.t,i.t),ub:(t.ub+i.ub)/2,ut:(t.ut+i.ut)/2,dip:r,id:(a[e]+a[e+1])/2})}for(let n of[!1,!0]){let r=[];for(let n of s){let a=[],o=1-n.dip;for(let r=0;r<=i;r++){let s=r/i*o;a.push(e.v(ln(n.b[0],n.t[0],s),ln(n.b[1],n.t[1],s),ln(n.b[2],n.t[2],s),ln(n.ub,n.ut,s),t,s,n.id))}r.push(a)}for(let t=0;t<r.length-1;t++)for(let a=0;a<i;a++){let i=r[t][a],s=r[t+1][a],c=r[t+1][a+1],l=r[t][a+1];n===o?e.quad(i,s,c,l):e.quad(s,i,l,c)}}}function Sn(e,t){if(e<=t)return[...Array(e).keys()];let n=[];for(let r=0;r<t;r++)n.push(Math.round(r*(e-1)/(t-1)));return n}function Cn(e,t,n,r,i){let a=t.body,o=e=>.5-e*a,s=i.pose===`dead`,c=[3,1,1,1][i.lod];n.forEach((n,l)=>{let u=r>0?n.spiny?G.DORSAL1:G.DORSAL2:G.ANAL,d=Sn(n.rays,[40,7,3,2][i.lod]),f=s?n.spiny?.42:.22:0;xn(e,u,d.map(e=>{let i=n.rays>1?e/(n.rays-1):0,c=ln(n.from,n.to,i),l=pn(t,c),u=r>0?l.T*.9:-l.B*.9,d=cn(n.h,i)+(r>0?l.T:l.B)*.1,p=ln(n.rake[0],n.rake[1],i);p=ln(p,1.45,f),d*=s?n.rays>30?.85:.95:1;let m=[0,u+r*d*Math.cos(p),o(c)-d*Math.sin(p)];return{b:[0,u,o(c)],t:m,ub:c*a,ut:c*a+d*Math.sin(p)}}),i.lod>=2?0:n.notch,c,d.map(e=>e+l*40),r<0)})}function wn(e,t,n){let r=t.caudal,i=t.body,a=.5-i+.014,o=pn(t,1),s=Math.min(o.T,o.B)*.9,c=n.pose===`dead`,l=r.rays,u=Sn(l,[40,9,5,3][n.lod]),d=r.span*(c?.93:1),f=u.map(e=>{let t=-1+2*e/(l-1),n=Math.abs(t),o,c;return r.shape===`rounded`?(o=d*t*.95,c=r.len*(1-.3*t*t)):r.shape===`truncate`?(o=d*t,c=r.len*(1-.05*t*t)*ln(r.fork,1,n)):r.shape===`lunate`?(o=d*t*(.75+.25*n),c=r.len*(r.fork+(1-r.fork)*n**1.8)):(o=d*t,c=r.len*(r.fork+(1-r.fork)*n**1.3)),{b:[0,s*t,a],t:[0,o,a-.014-c],ub:i-.014,ut:i+c}});xn(e,G.CAUDAL,f,n.lod>=2?0:.05,[3,1,1,1][n.lod],u,!1)}function Tn(e,t,n,r,i){let a=t.body,o=e=>.5-e*a,s=i.pose===`dead`,c=pn(t,n.u),l=n.rays,u=Sn(l,[24,5,3,2][i.lod]),d=[2,1,1,1][i.lod],f=r===G.PELVIC;for(let p of[1,-1]){let m=u.map(e=>{let t=l>1?e/(l-1):0,r,i,u,d,m;if(f)r=-c.B*.88,i=p*(c.W*.22+t*c.W*.12),u=ln(-.35,-.75,t),d=n.len*(1-.45*t),m=s?.14:.35;else{r=n.y+n.base*(.5-t),i=p*gn(c,r)*.94;let e=n.shape;u=e===`falcate`?ln(.05,-.55,t):e===`pointed`?ln(.1,-.85,t):ln(.25,-1.1,t),d=n.len*(e===`falcate`?1-.85*t**.55:e===`pointed`?1-.62*t**.9:.62+.38*Math.sin(Math.PI*(.15+.85*t))),m=s?.16:n.spread,s&&(u=u*.6-.08)}let h=[p*Math.sin(m)*Math.cos(u),Math.sin(u),-Math.cos(m)*Math.cos(u)],g=o(n.u);return{b:[i,r,g],t:[i+h[0]*d,r+h[1]*d,g+h[2]*d],ub:n.u*a,ut:n.u*a-h[2]*d}}),h=e.pos.length/3;xn(e,r,m,i.lod>=2?0:.035,d,u,p<0);for(let n=h;n<e.pos.length/3;n++){let r=e.pos[n*3],i=e.pos[n*3+1],o=e.pos[n*3+2],s=gn(pn(t,un((.5-o)/a,0,1)),i)+.004;Math.abs(r)<s&&(e.pos[n*3]=p*s)}}}function En(e,t,n){let r=t.finlets,i=t.body,a=e=>.5-e*i;for(let[n,o]of[[r.dorsal,1],[r.ventral,-1]])for(let s=0;s<n;s++){let c=ln(r.from,r.to,(s+.5)/n),l=pn(t,c),u=o>0?l.T*.85:-l.B*.85,d=(r.to-r.from)/n*.75,f=.006+(o>0?l.T:l.B)*.12;for(let t of[!1,!0]){let n=e.v(0,u,a(c),c*i,G.FINLET,0,0),r=e.v(0,u,a(c+d),(c+d)*i,G.FINLET,0,1),s=e.v(0,u+o*f,a(c+d*1.6),(c+d*1.6)*i,G.FINLET,1,.5);o>0===t?e.tri(n,r,s):e.tri(n,s,r)}}}function Dn(e,n,r){let i=n.eye,a=n.body,o=i.u,s=.5-o*a,c=pn(n,o),l=i.r,u=r.lod===0?18:10,d=r.lod===0?5:2,f=.34*l;for(let n of[1,-1]){let r=gn(c,i.y),p=new t(n,.06,.22).normalize(),m=new t(0,1,0).addScaledVector(p,-p.y).normalize(),h=new t().crossVectors(p,m),g=new t(n*(r-l*.12),i.y,s),_=[];for(let t=0;t<=d;t++){let r=t/d,i=[],s=t===0?1:u;for(let t=0;t<s;t++){let s=t/u*sn,c=Math.cos(s)*r,d=Math.sin(s)*r,_=f*(1-r*r)+l*.12,v=g.x+m.x*d*l+h.x*c*l+p.x*_,y=g.y+m.y*d*l+h.y*c*l+p.y*_,b=g.z+m.z*d*l+h.z*c*l+p.z*_;i.push(e.v(v,y,b,o*a,G.EYE,c*n,d))}_.push(i)}for(let t=0;t<d;t++)for(let r=0;r<u;r++){let i=(r+1)%u;if(t===0)n>0?e.tri(_[0][0],_[1][r],_[1][i]):e.tri(_[0][0],_[1][i],_[1][r]);else{let a=_[t][r],o=_[t][i],s=_[t+1][i],c=_[t+1][r];n>0?e.quad(a,c,s,o):e.quad(a,o,s,c)}}}}function On(e,t={}){let n={lod:0,pose:`swim`,...t},r=n.lod;n.mouth=n.mouth??(r<2&&n.pose===`dead`);let i=new fn,a=n.u0??0,o=n.u1??1;yn(i,e,n);let s=e=>e>=a&&e<=o;return n.fins!==!1&&(Cn(i,e,(e=>r<3?e:e.slice(-1))(e.dorsal.filter(e=>s(e.from))),1,n),r<3&&Cn(i,e,e.anal.filter(e=>s(e.from)),-1,n),o>=1&&wn(i,e,n),s(e.pectoral.u)&&r<3&&Tn(i,e,e.pectoral,G.PECTORAL,n),e.pelvic&&s(e.pelvic.u)&&r<2&&Tn(i,e,e.pelvic,G.PELVIC,n),e.finlets&&r<2&&o>=1&&En(i,e,n)),(n.eyes??r===0)&&s(e.eye.u)&&Dn(i,e,n),i.build()}function kn(e,{lod:t=0}={}){let n=new fn,r=e.body,i=e=>.5-e*r,a=e.opercle+.02,o=[16,7][t],s=[8,4][t],c=(pn(e,a).T+pn(e,a).B)*.8,l=t=>{let n=(t-a)/(1-a),r=pn(e,t);return Math.max((r.T+r.B)*.55,c*(1-.72*n**1.1)*(1-.15*(1-n)*(1-n)))},u=(t,n)=>{let r=pn(e,t);return Math.max(.004,r.W*.5*(1-.75*n*n))},d=(e,t)=>.012*t*t*(1-.5*e),f=[],p=[];for(let e=0;e<=o;e++){let t=ln(a,1,(e/o)**.85),c=l(t),m=i(t),h=[],g=[];for(let i=-s;i<=s;i++){let a=Math.abs(i/s),o=i/s*c,l=m-(e===0?.04*a*a:0),f=d(t,a),p=u(t,a);h.push(n.v(o,f+p*.5,l,t*r,G.FILLET,i/s,l)),g.push(n.v(o,f-p*.5,l,t*r,G.BODY,Math.abs(o),1-2*a))}f.push(h),p.push(g)}let m=2*s;for(let e=0;e<o;e++)for(let t=0;t<m;t++)n.quad(f[e][t],f[e][t+1],f[e+1][t+1],f[e+1][t]),n.quad(p[e][t+1],p[e][t],p[e+1][t],p[e+1][t+1]);let h=(e,t,r)=>{for(let i=0;i<e.length-1;i++)r?n.quad(e[i+1],e[i],t[i],t[i+1]):n.quad(e[i],e[i+1],t[i+1],t[i])},g=(e,t)=>e.map(e=>e[t]);h(f[0],p[0],!1),h(g(f,0),g(p,0),!1),h(g(f,m),g(p,m),!0);let _=e.caudal,v=[13,5][t],y=i(1)+.01,b=l(1)*.9,x=[],S=[];for(let e=0;e<v;e++){let t=-1+2*e/(v-1),n=Math.abs(t),i=_.len*(_.shape===`rounded`||_.shape===`truncate`?1-.2*t*t:ln(_.fork,1,n**1.3))*.9;x.push({b:[b*t,d(1,n),y],t:[_.span*.8*t,d(1,n)+.004,y-i],ub:r,ut:r+i}),S.push(e)}return xn(n,G.CAUDAL,x,.08,1,S,!0),n.build()}var An=new p({name:`lodFade`,code:`
// Bayer 4x4 threshold in (0, 1): bit-interleaved formula of
//   0  8  2 10 / 12  4 14  6 / 3 11  1  9 / 15  7 13  5
fn bayer4( pixel: vec2f ) -> f32 {
	let f = frame.frameIndex;
	// shift the pattern by a different offset every frame (all 16 over 16 frames)
	let p = vec2u( pixel ) + vec2u( f * 3u, ( f >> 2u ) * 1u );
	let x0 = p.x & 1u; let x1 = ( p.x >> 1u ) & 1u;
	let y0 = p.y & 1u; let y1 = ( p.y >> 1u ) & 1u;
	let v = ( ( x0 ^ y0 ) << 3u ) | ( y0 << 2u ) | ( ( x1 ^ y1 ) << 1u ) | y1;
	return ( f32( v ) + 0.5 ) / 16.0;
}

fn lodFadeVisible( pixel: vec2f, fade: f32, outgoing: bool ) -> bool {
	let t = bayer4( pixel );
	return select( ( t < fade ), ( t >= fade ), outgoing );
}
`});function jn(e,t,n){let r=(e-t)/Math.max(n-t,1e-6);return r<=0?0:r>=1?1:r*r*(3-2*r)}var Mn=8,Nn=Object.keys(H).sort((e,t)=>H[e]-H[t]);function Pn(){let e=[],t=e=>new o(e);for(let r of Nn){let i=an[r],a=on[r],o=t(a.back),s=t(a.flank),c=t(a.belly),l=t(a.fin),u=t(a.edge),d=t(i.iris),f=i.body;e.push(new n(o.r,o.g,o.b,i.metal*.55),new n(s.r,s.g,s.b,i.irid),new n(c.r,c.g,c.b,a.rough),new n(l.r,l.g,l.b,i.mouth.tip),new n(u.r,u.g,u.b,i.scales),new n(d.r,d.g,d.b,i.scaleVis),new n(.5-i.eye.u*f,i.eye.y,i.eye.r,.5-i.opercle*f),new n(i.lateral,i.arch,.5-i.mouth.corner*f,i.mouth.y))}return new c(`FishSkin`,{rows:[`vec4f[${e.length}]`,e]},{label:`fishSkin`})}var Fn=null,In=()=>Fn||=Pn(),Ln=e=>{let t=String(e);return t.includes(`.`)||t.includes(`e`)?t:t+`.0`},K=e=>Ln(H[e]),q=e=>Ln(G[e]),Rn=null;function zn(){return Rn||(Rn=new p({name:`fish`,deps:[T,An],uniforms:In(),uniformName:`fishSkin`,code:`
fn fishRotateQ( q: vec4f, v: vec3f ) -> vec3f { return v + cross( q.xyz, cross( q.xyz, v ) + v * q.w ) * 2.0; }
fn fishRow( pattern: f32, k: i32 ) -> vec4f { return fishSkin.rows[ clamp( i32( pattern ), 0, ${Nn.length-1} ) * ${Mn} + k ]; }
fn fishPartOf( d: vec4f ) -> f32 { return floor( d.y + 0.01 ); }
fn fishJawOf( d: vec4f ) -> f32 { return max( fract( d.y + 0.01 ) - 0.01, 0.0 ) / 0.9; }

fn fishHash( p: vec2f ) -> f32 { return fract( sin( dot( p, vec2f( 127.1, 311.7 ) ) ) * 43758.5453 ); }

// value noise 2D (cheap, for blotches and skin variation)
fn fishVnoise( p: vec2f ) -> f32 {
	let i = floor( p ); let f = fract( p );
	let w = f * f * ( 3.0 - f * 2.0 );
	let a = fishHash( i ); let b = fishHash( i + vec2f( 1.0, 0.0 ) ); let c = fishHash( i + vec2f( 0.0, 1.0 ) ); let d = fishHash( i + vec2f( 1.0, 1.0 ) );
	return mix( mix( a, b, w.x ), mix( c, d, w.x ), w.y );
}

// posterior edge of the gill cover (local z) at height fraction h: convex backward, sweeping
// forward under the throat
fn fishOpercleEdge( zOp: f32, h: f32 ) -> f32 { return zOp - 0.028 * ( 1.0 - h * h ) + smoothstep( -0.35, -1.0, h ) * 0.07; }
fn fishOpercleMask( h: f32 ) -> f32 { return smoothstep( -0.98, -0.9, h ) * ( 1.0 - smoothstep( 0.45, 0.62, h ) ); }

fn fishBand( x: f32, center: f32, width: f32, soft: f32 ) -> f32 { return 1.0 - smoothstep( width, width + soft, abs( x - center ) ); }

// Deformation as a function of the phase (evaluated for this and the previous frame):
// fish: travelling body wave (amplitude grows toward the tail) plus the turning bend,
// sculling pectorals; rays: the disc margins undulate (stingray) or flap (eagle ray);
// turtle: the front flippers stroke, the hind ones paddle.
// d = aData, p = rest position, amp = wave amplitude, bend = turning bend at this vertex
fn fishSwimOffset( ph: f32, d: vec4f, p: vec3f, env: f32, amp: f32, bend: f32, eagle: bool ) -> vec3f {
	let u = d.x;
	let part = fishPartOf( d );
	let isDisc = part == ${q(`DISC`)};
	let isFlip = part == ${q(`FLIPPER`)};
	let turtle = part > ${Ln(G.WHIP+.5)};
	let side = d.z; // rays: distance from the midline; flippers: along the flipper
	let lat = sin( ph - u * 5.6 ) * env * amp + bend;
	let flap = select( 0.0, sin( ph * 0.7 + 1.3 ) * d.z * 0.035, part == ${q(`PECTORAL`)} );
	let fish = vec3f( lat + flap * sign( p.x ), 0.0, 0.0 );
	let k = select( 8.0, 1.2, eagle );
	let disc = vec3f( 0.0, sin( ph - u * k ) * pow( side, 1.6 ) * amp, 0.0 );
	let front = d.w < 1.5;
	let stroke = vec3f( 0.0, sin( ph ) * select( 0.07, 0.3, front ), cos( ph ) * select( 0.0, 0.14, front ) ) * side;
	return select( select( select( fish, vec3f( 0.0 ), turtle ), stroke, isFlip ), disc, isDisc );
}

// eye colour: pupil, iris with radial streaks, dark rim
fn fishEyeCol( r: f32, ang: f32, irisC: vec3f, cloudy: f32 ) -> vec3f {
	let streak = sin( ang * 26.0 ) * 0.5 + 0.5;
	let irisL = dot( irisC, vec3f( 0.3, 0.59, 0.11 ) );
	let iris = irisC * min( 1.0, 0.36 / max( irisL, 1e-3 ) ) * mix( 0.6, 1.05, streak ) * ( smoothstep( 0.55, 0.72, r ) * 0.45 + 0.5 );
	let ring = smoothstep( 0.8, 0.97, r );
	var e = mix( iris, vec3f( 0.025, 0.025, 0.028 ), ring );
	e = mix( e, vec3f( 0.004, 0.005, 0.007 ), 1.0 - smoothstep( 0.5, 0.56, r ) );
	// cloudy eyes of fish out of the water for a while
	e = mix( e, vec3f( 0.42, 0.44, 0.46 ), cloudy * 0.55 * ( 1.0 - smoothstep( 0.7, 1.0, r ) ) );
	return e;
}
`}),Rn)}var Bn={vFishLocal:`vec3f`,vFishData:`vec4f`,vFishInfo:`vec4f`,vFishFlags:`vec4f`,vFishFade:`vec2f`};function Vn(e,t){let n;n=t?`let fe = ${e.fadeEntry()};\n\tlet ri = fe.index;\n\to.vFishFade = vec2f( fe.fade, fe.outgoing );`:`let ri = ${e.recordIndex()};\n\to.vFishFade = vec2f( 1.0, 0.0 );`;let r=e.record(`ri`);return`
	${n}
	let r0 = ${r[0]}; let q = ${r[1]}; let r2 = ${r[2]}; let r3 = ${r[3]};`}function Hn(e,t){return`
	${Vn(e,t)}
	let d = v.aData;
	let u = d.x;
	var p = v.position;
	o.vFishLocal = p;
	o.vFishData = d;
	o.vFishInfo = vec4f( floor( r2.w ), fract( r2.w ), r0.w, 0.0 );
	o.vFishFlags = vec4f( 0.0 );
	let pattern = floor( r2.w );
	let env = ( u * u * 0.85 + 0.08 ) * ( smoothstep( 0.0, 0.25, u ) * 0.7 + 0.3 );
	let bend = r2.z * ( u * u );
	let eagle = pattern == ${K(`eagleRay`)};
	let off = fishSwimOffset( r2.x, d, p, env, r2.y, bend, eagle );
	p += off;
	// the fish's own motion since the last frame (position change + swimming wave): motion vectors
	let delta = fishRotateQ( q, off - fishSwimOffset( r2.x - r3.w, d, v.position, env, r2.y, bend, eagle ) ) * r0.w + r3.xyz;
	v.useWorld = true;
	v.worldNormal = fishRotateQ( q, v.normal );
	v.worldPos = fishRotateQ( q, p * r0.w ) + r0.xyz;
	v.prevWorldPos = v.worldPos - delta;`}function Un(e,t){return`
	${Vn(e,t)}
	let d = v.aData;
	let pattern = floor( r2.x );
	var p = v.position;
	var n = v.normal;
	o.vFishLocal = p;
	o.vFishData = d;
	o.vFishInfo = vec4f( pattern, fract( r2.x ), r0.w, 0.0 );
	o.vFishFlags = r3;

	// lower jaw: rotates down about the hinge at the corner of the mouth
	let hinge = fishRow( pattern, 7 ).zw;
	let a = r2.w * fishJawOf( d );
	let ca = cos( a ); let sa = sin( a );
	let dy = p.y - hinge.y; let dz = p.z - hinge.x;
	p.y = hinge.y + dy * ca - dz * sa;
	p.z = hinge.x + dy * sa + dz * ca;
	let ny = n.y * ca - n.z * sa; let nz = n.y * sa + n.z * ca;
	n.y = ny;
	n.z = nz;

	// body bent along circular arcs about its middle: sideways (curl), then up / down (sag)
	let k1 = r2.y + select( -1e-4, 1e-4, r2.y >= 0.0 );
	let t1 = k1 * p.z;
	let c1 = cos( t1 ); let s1 = sin( t1 ); let h1 = sin( t1 * 0.5 );
	let x1 = h1 * h1 * 2.0 / k1 + p.x * c1;
	let z1 = s1 / k1 - p.x * s1;
	let nx1 = n.x * c1 + n.z * s1; let nz1 = n.z * c1 - n.x * s1;
	let k2 = r2.z + select( -1e-4, 1e-4, r2.z >= 0.0 );
	let t2 = k2 * z1;
	let c2 = cos( t2 ); let s2 = sin( t2 ); let h2 = sin( t2 * 0.5 );
	let y2 = h2 * h2 * 2.0 / k2 + p.y * c2;
	let z2 = s2 / k2 - p.y * s2;
	let ny2 = n.y * c2 + nz1 * s2; let nz2 = nz1 * c2 - n.y * s2;
	v.useWorld = true;
	v.worldNormal = fishRotateQ( q, vec3f( nx1, ny2, nz2 ) );
	v.worldPos = fishRotateQ( q, vec3f( x1, y2, z2 ) * r0.w ) + r0.xyz;
	v.prevWorldPos = v.worldPos;`}var Wn=`
	if ( ! lodFadeVisible( in.pixel, in.vs.vFishFade.x, in.vs.vFishFade.y > 0.5 ) ) { discard; }`,Gn=`
	let D = in.vs.vFishData; let Lp = in.vs.vFishLocal; let I = in.vs.vFishInfo;
	let pattern = floor( I.x + 0.5 );
	let part = fishPartOf( D );
	let scaleSize = fishRow( pattern, 4 ).w; let scaleVis = fishRow( pattern, 5 ).w;
	// scale rows: posterior margins are arcs, rows offset by half a scale
	let ss = max( scaleSize, 0.004 );
	// gentle waviness of the scale rows (in scale units: big scales stay in orderly rows)
	let warp = ( sin( Lp.z * 23.0 + D.z * 31.0 ) * 0.35 + sin( Lp.z * 41.0 - D.z * 17.0 ) * 0.25 ) * mix( 1.0, 0.3, smoothstep( 0.015, 0.045, scaleSize ) );
	let sa = ( 0.5 - Lp.z ) / ss + warp; let sb = D.z / ( ss * 0.8 ) + warp * 0.6;
	let rowI = floor( sb );
	let fb = fract( sb ) * 2.0 - 1.0;
	let sf = fract( sa + rowI * 0.5 + fb * fb * 0.32 );
	// pixel footprint (m) against the scale size (m): fade out sub-pixel detail
	let Pv = ( frame.view * vec4f( in.P, 1.0 ) ).xyz;
	let px = length( fwidth( Pv ) );
	let sfade = ( 1.0 - smoothstep( 0.25, 0.7, px / ( ss * I.z ) ) ) * select( 0.0, 1.0, scaleSize > 0.001 );

	// ---- relief
	var bumpH = 0.0;
	{
		let isBody = part == ${q(`BODY`)};
		let L = I.z;
		// scales: each rises toward its free posterior margin
		let sc = smoothstep( 0.0, 0.9, sf ) * ( 1.0 - smoothstep( 0.9, 1.0, sf ) ) * sfade * scaleVis;
		// gill cover: raised in front of its edge
		let eyeOp = fishRow( pattern, 6 );
		let h = D.w;
		let zE = fishOpercleEdge( eyeOp.w, h );
		let onOp = fishOpercleMask( h );
		let op = smoothstep( -0.004, 0.004, Lp.z - zE ) * onOp;
		let grainFade = 1.0 - smoothstep( 0.3, 0.8, px / ( 0.004 * I.z ) );
		let grain = ( fishVnoise( vec2f( Lp.z, D.z ) * 420.0 ) - 0.5 ) * 0.00022 * grainFade;
		let bodyH = sc * 0.0016 + op * 0.0025 + grain;
		// fin rays: ridges
		let isFin = part > 0.5 && part < 7.5;
		let rd = abs( fract( D.w + 0.5 ) - 0.5 );
		let ray = ( 1.0 - smoothstep( 0.0, 0.25, rd ) ) * 0.0004;
		bumpH = select( select( 0.0, ray, isFin ), bodyH, isBody ) * L;
	}
	let dhdx = dpdx( bumpH ); let dhdy = dpdy( bumpH );`;function Kn(e,t){return`
	${Gn}
	${t?Wn:``}
	var rough = 0.4;
	var metal = 0.0;
	var transl = 0.0;
	var coat = 0.0;
	var spec = 0.5;
	let seed = I.y; let L = I.z;
	let pat = pattern;
	let P = part;
	let u = D.x; let h = D.w; let sd = D.z;
	let z = Lp.z; let y = Lp.y;
	let t = D.z; let w = D.w; // fins: along / across the rays
	let isBody = P == ${q(`BODY`)};
	let isFin = P > 0.5 && P < 7.5;
	let bodyK = select( 0.0, 1.0, isBody );
	let r0 = fishRow( pat, 0 ); let r1 = fishRow( pat, 1 ); let r2 = fishRow( pat, 2 ); let r3 = fishRow( pat, 3 );
	let r4 = fishRow( pat, 4 ); let r5 = fishRow( pat, 5 ); let r6 = fishRow( pat, 6 ); let r7 = fishRow( pat, 7 );
	let back = r0.xyz; let flank = r1.xyz; let belly = r2.xyz;
	let finC = r3.xyz; let edgeC = r4.xyz; let irisC = r5.xyz;
	let eye = r6; let lat = r7;
	let flags = in.vs.vFishFlags;
	let n1 = fishVnoise( vec2f( z, y ) * 38.0 + seed * 17.0 );
	let n2 = fishVnoise( vec2f( z, sd ) * 11.0 + seed * 5.0 );
	let fwW = fwidth( w ); let fwH = fwidth( h );

	// ---- counter-shading
	let tBack = smoothstep( 0.2, 0.75, h );
	let tBelly = 1.0 - smoothstep( -0.7, -0.1, h );
	var c = mix( mix( flank, back, tBack ), belly, tBelly );
	let silver = 1.0 - tBack * 0.75; // guanine reflection weight
	metal = r0.w * silver * bodyK;
	rough = r2.w;
	// scales: a thin shadow line under each free margin, the exposed field slightly brighter
	// toward the margin
	let scaleShade = smoothstep( 0.3, 0.9, sf ) * sfade * scaleVis;
	let pocket = smoothstep( 0.88, 0.97, sf ) * ( 1.0 - smoothstep( 0.97, 1.0, sf ) ) * sfade * scaleVis;
	let cellK = ( fishHash( vec2f( floor( sa + floor( sb ) * 0.5 ), floor( sb ) ) ) - 0.5 ) * 0.1 * sfade * scaleVis;
	// (on silvery skin the pocket is a thin line: the mirror-like scale reflects its own light)
	c *= mix( 1.0, 0.96 + scaleShade * 0.07 - pocket * mix( 0.14, 0.06, r0.w ) + cellK, bodyK );
	c *= mix( 1.0, n1 * 0.14 + 0.93, bodyK );
	c *= mix( 1.0, n2 * 0.2 + 0.9, bodyK );
	rough = mix( rough, rough * mix( 0.8, 1.25, n2 ), bodyK );

	// ---- fins: ray-striped membranes, darker and thinner toward the edge
	if ( isFin && P != ${q(`FINLET`)} ) {
		var fin = mix( finC, edgeC, smoothstep( 0.4, 1.0, t ) );
		let rd = abs( fract( w + 0.5 ) - 0.5 );
		let rayW = select( 0.06, 0.1, P == ${q(`DORSAL1`)} );
		let ray = ( 1.0 - smoothstep( rayW, fwW * 1.2 + rayW + 0.04, rd ) ) * ( 1.0 - smoothstep( 0.2, 0.6, fwW ) );
		fin *= mix( 0.9, 1.06, ray );
		// thicker and darker where the fin joins the body, thinnest at the edge
		fin *= smoothstep( 0.0, 0.15, t ) * 0.2 + 0.8;
		c = fin;
		transl = mix( 0.8, 0.55, ray ) * ( smoothstep( 0.0, 0.3, t ) * 0.4 + 0.6 );
		// paired fins: the fin colour, a little lighter toward the edge (thin membrane)
		let paired = P == ${q(`PECTORAL`)} || P == ${q(`PELVIC`)};
		c = select( c, c * mix( 0.85, 1.1, smoothstep( 0.2, 1.0, t ) ), paired );
		transl *= select( 1.0, 0.45, paired );
		rough = 0.4;
	}

	// ---- species markings (body; some on fins)
	if ( pat == ${K(`silverside`)} ) {
		// silver lateral band with a dark upper edge; translucent green back
		let bandK = fishBand( h, 0.02, 0.1, fwH + 0.05 ) * bodyK;
		c = mix( c, vec3f( 0.78, 0.82, 0.84 ), bandK * 0.8 );
		c = mix( c, vec3f( 0.12, 0.2, 0.2 ), fishBand( h, 0.14, 0.015, fwH + 0.02 ) * bodyK * 0.6 );
		metal += bandK * 0.25;
	} else if ( pat == ${K(`chromis`)} ) {
		// dark margins on the tail lobes, azure line from the snout through the eye
		let lobe = select( 0.0, smoothstep( 5.5, 7.5, abs( w - 8.0 ) ), P == ${q(`CAUDAL`)} );
		c = mix( c, vec3f( 0.01, 0.015, 0.03 ), lobe );
		let lineK = fishBand( y - ( z - eye.x ) * 0.35, eye.y + 0.015, 0.004, 0.003 ) * smoothstep( eye.x - 0.02, eye.x + 0.05, z ) * bodyK;
		c = mix( c, vec3f( 0.3, 0.6, 0.95 ), lineK * 0.7 );
	} else if ( pat == ${K(`grunt`)} ) {
		// French grunt: yellow with oblique blue-silver stripes (straight above the lateral
		// line); bluestriped grunt: straight blue stripes. Red mouth.
		let blue = fract( seed * 3.7 ) < 0.4;
		let above = smoothstep( 0.35, 0.45, h );
		let slope = select( mix( 0.45, 0.0, above ), 0.0, blue );
		let sv = sin( ( y - z * slope ) * select( 150.0, 190.0, blue ) );
		let stripe = smoothstep( 0.45, 0.8, sv ) * bodyK * ( 1.0 - tBelly * 0.7 );
		let lineC = select( vec3f( 0.52, 0.6, 0.7 ), vec3f( 0.12, 0.26, 0.55 ), blue );
		c = mix( c, lineC, stripe * select( 0.7, 0.9, blue ) );
	} else if ( pat == ${K(`yellowtail`)} ) {
		// yellow stripe from the snout widening into the yellow tail; yellow spots on the back
		let wS = mix( 0.006, 0.035, smoothstep( 0.1, -0.25, z ) );
		let stripe = fishBand( y - 0.004, 0.0, wS, 0.004 ) * bodyK;
		let qq = vec2f( z, y ) * 70.0;
		let cell = floor( qq );
		let j = ( vec2f( fishHash( cell + 3.1 ), fishHash( cell + 7.7 ) ) - 0.5 ) * 0.5;
		let rr = fishHash( cell + 1.3 ) * 0.14 + 0.1;
		let spots = ( 1.0 - smoothstep( rr, rr + 0.12, length( fract( qq ) - 0.5 - j ) ) ) * step( 0.4, fishHash( cell + seed ) ) * tBack * bodyK;
		c = mix( c, vec3f( 0.85, 0.62, 0.05 ), max( stripe, spots * 0.8 ) );
		c = mix( c, vec3f( 0.86, 0.66, 0.06 ), select( 0.0, 1.0, P == ${q(`CAUDAL`)} ) );
	} else if ( pat == ${K(`tang`)} ) {
		// fine dark wavy lines, pale scalpel at the tail base
		let lines = smoothstep( 0.75, 0.95, sin( y * 170.0 + z * 30.0 + n1 * 3.0 ) ) * 0.3 * bodyK;
		c *= 1.0 - lines;
		let spine = ( 1.0 - smoothstep( 0.01, 0.02, length( vec2f( z + 0.27, y * 1.5 ) ) ) ) * bodyK;
		c = mix( c, vec3f( 0.85, 0.8, 0.55 ), spine );
		c = mix( c, edgeC, select( 0.0, smoothstep( 0.8, 1.0, t ), isFin ) );
	} else if ( pat == ${K(`sergeant`)} ) {
		// five black bars from behind the head to the tail stalk (a faint sixth on the peduncle), a dark
		// spot at the base of the pectoral fin
		let barsP = smoothstep( 0.45, 0.7, sin( ( z - 0.215 ) * 52.0 + 1.57 ) ) * smoothstep( -0.29, -0.24, z ) * ( 1.0 - smoothstep( 0.225, 0.26, z ) );
		let sixth = fishBand( z, -0.33, 0.012, 0.01 ) * 0.4;
		let bars = max( barsP, sixth ) * ( 1.0 - tBelly * 0.8 );
		c = mix( c, vec3f( 0.02, 0.02, 0.03 ), bars * select( select( 0.0, 0.4, isFin ), 0.92, isBody ) );
		let pecSpot = ( 1.0 - smoothstep( 0.012, 0.02, length( vec2f( z - eye.w + 0.03, y + 0.005 ) ) ) ) * bodyK;
		c = mix( c, vec3f( 0.03, 0.035, 0.05 ), pecSpot * 0.8 );
	} else if ( pat == ${K(`wrasse`)} ) {
		// bluehead wrasse: yellow initial phase with a dark midlateral stripe; blue-headed males
		let male = fract( seed * 7.1 ) < 0.15;
		let stripe = fishBand( h, 0.05, 0.1, fwH + 0.04 ) * bodyK * smoothstep( 0.25, 0.1, z );
		let female = mix( c, vec3f( 0.04, 0.04, 0.03 ), stripe * 0.9 );
		let head = smoothstep( 0.12, 0.17, z );
		let collar = fishBand( z, 0.13, 0.012, 0.006 );
		let maleC = mix( mix( vec3f( 0.1, 0.42, 0.28 ), vec3f( 0.05, 0.14, 0.62 ), head ), vec3f( 0.02, 0.02, 0.02 ), collar * bodyK );
		c = select( female, maleC, male );
	} else if ( pat == ${K(`parrot`)} ) {
		// stoplight (terminal phase: green, pink / orange marks, yellow spot on the gill cover)
		// or queen parrotfish (blue-green, orange-pink marks around the mouth)
		let queen = fract( seed * 4.3 ) < 0.4;
		let base = select( vec3f( 0.1, 0.42, 0.26 ), vec3f( 0.06, 0.34, 0.42 ), queen );
		c = mix( c, base * mix( 0.8, 1.1, scaleShade ), bodyK * 0.75 );
		let mark = fishBand( y - ( z - 0.3 ) * 0.4, -0.03, 0.008, 0.008 ) * smoothstep( 0.18, 0.35, z ) * bodyK;
		c = mix( c, select( vec3f( 0.85, 0.45, 0.32 ), vec3f( 0.75, 0.42, 0.28 ), queen ), mark );
		let spot = ( 1.0 - smoothstep( 0.01, 0.02, length( vec2f( z - eye.w - 0.02, y - 0.05 ) ) ) ) * bodyK;
		c = mix( c, vec3f( 0.88, 0.72, 0.12 ), spot * select( 1.0, 0.0, queen ) );
	} else if ( pat == ${K(`angel`)} ) {
		// French angelfish: black, yellow rims on the scales, yellow face and eye ring
		let rims = smoothstep( 0.72, 0.95, sf ) * max( sfade, 0.35 ) * bodyK;
		c = mix( c, vec3f( 0.62, 0.48, 0.06 ), rims * 0.6 );
		let face = smoothstep( 0.4, 0.43, z ) * bodyK;
		c = mix( c, vec3f( 0.55, 0.45, 0.2 ), face * 0.6 );
		let er0 = length( vec2f( z - eye.x, y - eye.y ) ) / eye.z;
		let ringA = smoothstep( 1.05, 1.2, er0 ) * ( 1.0 - smoothstep( 1.45, 1.65, er0 ) ) * bodyK;
		c = mix( c, vec3f( 0.7, 0.52, 0.06 ), ringA * 0.85 );
	} else if ( pat == ${K(`barracuda`)} ) {
		// dark oblique bars on the upper flank, black blotches on the lower rear flank
		let bars = smoothstep( 0.35, 0.8, sin( z * 58.0 + h * 1.5 + n1 ) ) * smoothstep( 0.2, 0.55, h ) * bodyK;
		c *= 1.0 - bars * 0.45;
		let bl = smoothstep( 0.6, 0.78, n2 ) * smoothstep( 0.1, -0.25, z ) * ( 1.0 - smoothstep( -0.3, 0.2, h ) ) * bodyK;
		c = mix( c, vec3f( 0.03, 0.03, 0.035 ), bl * 0.9 );
		c = mix( c, vec3f( 0.75, 0.78, 0.8 ), select( 0.0, smoothstep( 0.85, 1.0, t ) * smoothstep( 5.0, 7.0, abs( w - 8.0 ) ), P == ${q(`CAUDAL`)} ) );
	} else if ( pat == ${K(`redSnapper`)} ) {
		// rose red back fading to a silvery pink belly; rows of scales show as fine oblique lines
		let rows = smoothstep( 0.6, 0.95, sin( y * 210.0 + z * 120.0 ) ) * max( sfade, 0.3 ) * bodyK * 0.15;
		c *= 1.0 - rows;
	} else if ( pat == ${K(`grouper`)} ) {
		// Nassau grouper: dark brown bars, a band from the snout through the eye, a black saddle
		// on the tail stalk, dark spots around the eye
		let zz = 0.5 - z;
		let wob = ( n2 - 0.5 ) * 0.03;
		let bars = smoothstep( 0.2, 0.6, sin( ( zz + wob ) * 34.0 - 1.2 ) ) * smoothstep( 0.3, 0.38, zz ) * smoothstep( 0.86, 0.78, zz ) * ( 1.0 - tBelly * 0.85 );
		let stripe = fishBand( y - eye.y - ( z - eye.x ) * 0.25, 0.0, 0.008, 0.006 ) * smoothstep( eye.x - 0.08, eye.x, z ) * smoothstep( 0.5, 0.45, z );
		let saddle = smoothstep( 0.4, 0.7, h ) * fishBand( zz, 0.8, 0.025, 0.01 );
		let spots = smoothstep( 0.72, 0.85, fishVnoise( vec2f( z, y ) * 160.0 + seed * 3.0 ) ) * smoothstep( eye.x - 0.12, eye.x, z );
		let dark = max( max( bars * 0.85, stripe * 0.85 ), max( saddle, spots * 0.7 ) ) * bodyK;
		c = mix( c, vec3f( 0.13, 0.085, 0.05 ), dark );
		let pale = smoothstep( 0.86, 0.93, fishVnoise( vec2f( z, y ) * 150.0 + 9.0 ) ) * bodyK * 0.2;
		c = mix( c, vec3f( 0.85, 0.8, 0.72 ), pale );
	} else if ( pat == ${K(`tuna`)} ) {
		// blackfin tuna: sharp dark back, bronze band, pale bars on the belly, dusky yellow finlets
		let bronze = fishBand( h, 0.28, 0.05, fwH + 0.06 ) * smoothstep( 0.3, 0.2, z ) * bodyK;
		c = mix( c, vec3f( 0.42, 0.34, 0.14 ), bronze * 0.6 );
		c = mix( c, back, smoothstep( 0.28, 0.4, h ) * bodyK );
		let bars = smoothstep( 0.6, 0.9, sin( z * 95.0 ) ) * smoothstep( 0.0, -0.3, h ) * smoothstep( 0.2, 0.1, z ) * bodyK;
		c = mix( c, vec3f( 0.85, 0.88, 0.9 ), bars * 0.35 );
		c = mix( c, vec3f( 0.55, 0.48, 0.16 ), select( 0.0, 0.85, P == ${q(`FINLET`)} ) );
	} else if ( pat == ${K(`mahi`)} ) {
		// mahi-mahi: blue-green back, golden flanks with scattered blue spots
		let cell = floor( vec2f( z, y ) * 55.0 );
		let jit = vec2f( fishHash( cell + 3.1 ), fishHash( cell + 7.7 ) ) - 0.5;
		let fc = fract( vec2f( z, y ) * 55.0 ) - 0.5 - jit * 0.55;
		let rs = mix( 0.1, 0.24, fishHash( cell + 1.3 ) );
		let spots = ( 1.0 - smoothstep( rs, rs + 0.1, length( fc * vec2f( 1.0, 1.25 ) ) ) ) * step( 0.45, fishHash( cell + seed * 7.0 ) ) * bodyK * ( 1.0 - tBelly );
		c = mix( c, vec3f( 0.08, 0.22, 0.5 ), spots * 0.75 );
		c = mix( c, vec3f( 0.2, 0.5, 0.3 ), smoothstep( 0.0, 0.5, h ) * bodyK * 0.35 );
	} else if ( pat == ${K(`mullet`)} ) {
		// faint dark stripes along the scale rows of the upper flank
		let lines = smoothstep( 0.7, 0.95, sin( sd * 280.0 ) ) * smoothstep( -0.1, 0.3, h ) * bodyK * 0.25;
		c *= 1.0 - lines;
	} else if ( pat == ${K(`needlefish`)} ) {
		// dark blue lateral stripe, dark beak
		let stripe = fishBand( h, 0.0, 0.06, fwH + 0.05 ) * bodyK;
		c = mix( c, vec3f( 0.12, 0.25, 0.45 ), stripe * 0.6 );
		c = mix( c, vec3f( 0.12, 0.16, 0.16 ), smoothstep( 0.32, 0.36, z ) * bodyK * 0.7 );
	} else if ( pat == ${K(`jack`)} ) {
		// bar jack: black stripe along the base of the dorsal fin into the lower tail lobe,
		// electric blue below it
		let top = fishBand( h, 0.82, 0.06, fwH + 0.05 ) * smoothstep( 0.2, 0.05, z ) * bodyK;
		let blue = fishBand( h, 0.68, 0.05, fwH + 0.05 ) * smoothstep( 0.2, 0.05, z ) * bodyK;
		c = mix( c, vec3f( 0.15, 0.45, 0.9 ), blue * 0.5 );
		c = mix( c, vec3f( 0.02, 0.03, 0.05 ), top * 0.85 );
		let lobe = select( 0.0, smoothstep( 7.5, 5.5, w ) * smoothstep( 0.1, 0.3, t ), P == ${q(`CAUDAL`)} );
		c = mix( c, vec3f( 0.02, 0.03, 0.05 ), lobe * 0.8 );
	} else if ( pat == ${K(`tarpon`)} ) {
		// huge scales with dark edges
		let rims = smoothstep( 0.8, 0.97, sf ) * sfade * bodyK;
		c *= 1.0 - rims * 0.35;
	}

	// ---- lateral line (a row of pores along a dark line)
	let hl = lat.x + lat.y * ( 1.0 - smoothstep( 0.12, 0.55, u ) );
	let lineK = fishBand( h, hl, fwH * 0.5 + 0.012, fwH + 0.008 ) * bodyK * smoothstep( 0.18, 0.25, u ) * smoothstep( 0.9, 0.8, u );
	c *= 1.0 - lineK * 0.3;

	// ---- gill cover edge and the preopercle (dark creases); gills show red on dead fish
	let zE = fishOpercleEdge( eye.w, h );
	let dOp = z - zE;
	let onOp = fishOpercleMask( h ) * bodyK;
	let crease = ( 1.0 - smoothstep( 0.0015, 0.004, abs( dOp ) ) ) * onOp;
	c *= 1.0 - crease * 0.45;
	let pre = ( 1.0 - smoothstep( 0.001, 0.003, abs( dOp - 0.04 ) ) ) * onOp * smoothstep( 0.6, 0.2, h );
	c *= 1.0 - pre * 0.2;
	let gill = smoothstep( 0.0, -0.0015, dOp ) * smoothstep( -0.007, -0.003, dOp ) * onOp * smoothstep( 0.0, -0.5, h ) * flags.w;
	c = mix( c, vec3f( 0.3, 0.03, 0.035 ), gill * 0.8 );

	// ---- lips (the mouth line from the snout to the corner), the edge of the upper jaw bone
	// and the nostrils
	let hz = lat.z; let hy = lat.w; let tipY = r3.w;
	let mt = clamp( ( z - hz ) / ( 0.5 - hz ), 0.0, 1.0 );
	let yLip = mix( hy, tipY, mt );
	let lips = ( 1.0 - smoothstep( 0.0015, 0.0035, abs( y - yLip ) ) ) * step( hz - 0.004, z ) * bodyK;
	c *= 1.0 - lips * 0.55;
	let maxZ = hz + 0.006 - ( y - hy ) * 0.35;
	let maxilla = ( 1.0 - smoothstep( 0.001, 0.0025, abs( z - maxZ ) ) ) * smoothstep( hy - 0.002, hy + 0.002, y ) * smoothstep( hy + 0.04, hy + 0.025, y ) * bodyK;
	c *= 1.0 - maxilla * 0.3;
	let nostril = ( 1.0 - smoothstep( 0.1, 0.2, length( vec2f( z - eye.x - eye.z * 1.7, y - eye.y - eye.z * 0.25 ) ) / eye.z ) ) * bodyK;
	c *= 1.0 - nostril * 0.6;

	// ---- painted eye (under the dome where there is one)
	let er = length( vec2f( z - eye.x, y - eye.y ) ) / eye.z;
	let painted = ( 1.0 - smoothstep( 0.95, 1.1, er ) ) * bodyK;
	c = mix( c, fishEyeCol( er, atan2( y - eye.y, z - eye.x ), irisC, flags.x ), painted );
	metal *= 1.0 - painted;

	// ---- eye dome: pupil, iris, glossy cornea
	if ( P == ${q(`EYE`)} ) {
		let r = length( vec2f( t, w ) );
		c = fishEyeCol( r, atan2( w, t ), irisC, flags.x );
		c = mix( c, flank * 0.6, smoothstep( 0.93, 1.0, r ) );
		rough = mix( 0.04, 0.3, flags.x );
		spec = 1.0;
		metal = 0.0;
	} else if ( P == ${q(`MOUTH`)} ) {
		// inside of the mouth: pale pink lips to a dark throat (grunts are red inside)
		let lip = select( vec3f( 0.5, 0.3, 0.3 ), vec3f( 0.6, 0.08, 0.06 ), pat == ${K(`grunt`)} );
		c = mix( lip, vec3f( 0.03, 0.012, 0.012 ), smoothstep( 0.05, 0.85, t ) );
		metal = 0.0;
		rough = 0.35;
	} else if ( P == ${q(`FLESH`)} ) {
		// cut face: muscle rings around the backbone, bone and blood at the centre
		let r = length( vec2f( t, w * 1.2 ) );
		let dark = select( 0.0, 1.0, pat == ${K(`tuna`)} );
		let meat = mix( vec3f( 0.62, 0.36, 0.32 ), vec3f( 0.3, 0.035, 0.035 ), dark );
		let rings = smoothstep( 0.6, 0.95, sin( r * 520.0 + atan2( w, abs( t ) ) * 2.0 ) ) * 0.12;
		var m = meat * ( 1.0 - rings );
		let bone = 1.0 - smoothstep( 0.006, 0.009, length( vec2f( t, w - 0.004 ) ) );
		m = mix( m, vec3f( 0.75, 0.68, 0.58 ), bone );
		m = mix( m, vec3f( 0.3, 0.02, 0.02 ), ( 1.0 - smoothstep( 0.01, 0.03, r ) ) * 0.5 * ( 1.0 - bone ) );
		// skin rim
		c = m;
		metal = 0.0;
		rough = 0.3;
		transl = 0.3;
	} else if ( P == ${q(`FILLET`)} ) {
		// salted, sun dried flesh: pale and translucent at the thin edges, muscle chevrons,
		// salt crystals
		let ax = abs( t );
		let chev = smoothstep( 0.55, 0.9, sin( ( w + ax * 0.35 ) * 160.0 ) ) * 0.1;
		var m = mix( vec3f( 0.36, 0.26, 0.13 ), vec3f( 0.52, 0.42, 0.26 ), smoothstep( 0.35, 1.0, ax ) ) * ( 1.0 - chev );
		let salt = step( 0.94, fishHash( floor( vec2f( t, w ) * 900.0 ) ) );
		m = mix( m, vec3f( 0.8, 0.8, 0.78 ), salt * 0.6 );
		m *= mix( 0.9, 1.05, n1 );
		c = m;
		metal = 0.0;
		rough = 0.6;
		transl = mix( 0.25, 0.8, smoothstep( 0.5, 1.0, ax ) );
	} else if ( P == ${q(`ICE`)} ) {
		// glassy crushed ice: dim albedo (light passes into it), sharp glints
		c = vec3f( 0.3, 0.4, 0.46 ) * mix( 0.8, 1.15, fract( t * 7.3 ) );
		rough = mix( 0.04, 0.2, fract( w * 5.1 ) );
		metal = 0.0;
		transl = 0.9;
		spec = 1.0;
	} else if ( P == ${q(`LEAF`)} ) {
		// banana leaf: glossy green, pale midrib, fine parallel veins
		let ax = abs( t );
		let veins = smoothstep( 0.6, 0.95, sin( w * 420.0 + ax * 60.0 ) ) * 0.12;
		var lc = mix( vec3f( 0.025, 0.08, 0.015 ), vec3f( 0.05, 0.13, 0.025 ), n2 ) * ( 1.0 - veins );
		lc = mix( lc, vec3f( 0.25, 0.3, 0.1 ), 1.0 - smoothstep( 0.015, 0.03, ax ) );
		lc = mix( lc, vec3f( 0.25, 0.22, 0.08 ), smoothstep( 0.9, 1.0, ax ) * 0.6 );
		c = lc;
		metal = 0.0;
		rough = 0.28;
		transl = 0.25;
	} else if ( P == ${q(`DISC`)} || P == ${q(`WHIP`)} ) {
		// rays: sandy, finely mottled back (stingray) or black with white rings (eagle ray);
		// white belly
		let top = w > 0.0;
		let eagleK = select( 0.0, 1.0, pat == ${K(`eagleRay`)} );
		let qq = vec2f( Lp.x, Lp.z ) * 20.0;
		let cell = floor( qq );
		let jit = ( vec2f( fishHash( cell + 1.7 ), fishHash( cell + 5.3 ) ) - 0.5 ) * 0.4;
		let rad = fishHash( cell + 9.1 ) * 0.14 + 0.12;
		let ring = abs( length( fract( qq ) - 0.5 - jit ) - rad );
		let spots = ( 1.0 - smoothstep( 0.035, 0.075, ring ) ) * step( 0.45, fishHash( cell ) );
		let mottle = fishVnoise( vec2f( Lp.x, Lp.z ) * 60.0 ) * 0.25 + n2 * 0.2 + 0.7;
		var dorsal = mix( back * mottle, mix( back, vec3f( 0.75, 0.78, 0.8 ), spots * 0.85 ), eagleK );
		dorsal = mix( dorsal, edgeC, smoothstep( 0.8, 1.0, t ) * 0.4 * ( 1.0 - eagleK ) );
		c = select( belly, dorsal, top );
		c = select( c, finC, P == ${q(`WHIP`)} );
		metal = 0.0;
		rough = r2.w;
	} else if ( P == ${q(`CARAPACE`)} ) {
		// green turtle shell: scutes (vertebral row, costals, marginals) with dark seams and
		// radiating olive / brown / amber streaks
		let X = t; let Y = w;
		let ax = abs( X );
		let rr = length( vec2f( X, Y ) );
		let vert = ax < 0.3;
		let ySeams = select( vec4f( -0.42, -0.02, 0.36, 2.0 ), vec4f( -0.58, -0.22, 0.14, 0.5 ), vert );
		let yc = Y + ax * ax * 0.25;
		let dY = min( min( abs( yc - ySeams.x ), abs( yc - ySeams.y ) ), min( abs( yc - ySeams.z ), abs( yc - ySeams.w ) ) );
		let dX = abs( ax - 0.3 );
		let marg = rr > 0.84;
		let angle = atan2( Y, X );
		let dM = min( abs( rr - 0.84 ), abs( fract( angle * ${Ln(12/Math.PI)} ) - 0.5 ) * 0.25 );
		let seam = min( select( min( dY, dX ), dM, marg ), abs( rr - 0.84 ) );
		let streak = sin( atan2( yc - ( floor( yc * 2.8 ) + 0.5 ) / 2.8, X - sign( X ) * 0.55 ) * 11.0 + n2 * 6.0 ) * 0.5 + 0.5;
		let blotch = smoothstep( 0.45, 0.8, fishVnoise( vec2f( X, Y ) * 9.0 ) );
		var shell = mix( back, flank, streak * 0.55 + blotch * 0.45 );
		shell = mix( shell, vec3f( 0.2, 0.14, 0.06 ), smoothstep( 0.6, 0.9, n1 ) * 0.4 );
		shell *= mix( 0.45, 1.0, smoothstep( 0.003, 0.012, seam ) );
		c = shell;
		metal = 0.0;
		rough = 0.35;
	} else if ( P == ${q(`SKIN`)} || P == ${q(`FLIPPER`)} ) {
		// scaly grey-brown skin with pale scale margins; pale yellow plastron
		let qq = vec2f( Lp.x + Lp.y, Lp.z ) * 55.0;
		let rowS = floor( qq.y );
		let q2 = qq + vec2f( rowS * 0.5, 0.0 );
		let ff = fract( q2 ) - 0.5;
		let scale = smoothstep( 0.32, 0.47, max( abs( ff.x ), abs( ff.y ) ) );
		let tone = fishHash( floor( q2 ) ) * 0.35 + 0.8;
		let skin = mix( finC * tone, edgeC, scale * 0.45 );
		c = select( skin, belly * mix( 0.85, 1.05, n1 ), w > 1.5 && P == ${q(`SKIN`)} );
		metal = 0.0;
		rough = 0.5;
	} else if ( P == ${q(`SHELL`)} ) {
		// spiny lobster: red-brown carapace with cream spots, banded legs
		let sp = vec2f( t, w ) * 12.0;
		let spots = ( 1.0 - smoothstep( 0.18, 0.3, length( fract( sp ) - 0.5 ) ) ) * step( 0.6, fishHash( floor( sp ) ) );
		var sh = mix( vec3f( 0.16, 0.045, 0.03 ), vec3f( 0.32, 0.1, 0.04 ), n1 );
		sh = mix( sh, vec3f( 0.7, 0.55, 0.22 ), spots * 0.85 );
		c = sh;
		metal = 0.0;
		rough = 0.35;
	}
${e?`
	// ---- props: dull, drying skin; wet sheen; salted skin
	c = mix( c, vec3f( luminance( c ) ), flags.z * 0.55 * bodyK );
	c *= mix( 1.0, 0.85, flags.z * bodyK );
	metal *= 1.0 - flags.z;
	rough = mix( rough, rough * 0.55, flags.y );
	coat = flags.y * select( select( 0.0, 0.25, isFin ), 0.6, isBody );
`:``}
	// iridescent sheen on silvery skin at grazing angles
	let cosV = abs( dot( in.N, in.V ) );
	let irid = r1.w * bodyK * silver * ( 1.0 - cosV );
	let hueA = vec3f( 0.55, 0.95, 0.8 ); let hueB = vec3f( 0.95, 0.6, 1.0 );
	c = mix( c, c * mix( hueA, hueB, cosV ) * 1.25, irid * 0.6 );

	s.albedo = c;
	s.roughness = rough;
	s.metalness = metal;
	// The reference (three r186) reads specularIntensityNode (the 'fishSpec' var) before the colour
	// function assigns it, so the var reads its zero default there: the fish have no dielectric
	// specular in the reference (only metal / grazing reflections; verified headless against the
	// original: with a constant 0.5 it gains exactly the port's highlights). FISH_SPECULAR selects: 'reference' (look of the three.js app) or 'intended' (0.5,
	// 1.0 on eyes and ice, as the code was written).
	s.specularIntensity = spec;
	s.normal = perturbNormalByHeight( in.P, in.N, dhdx, dhdy, 1.0 );
	// translucencyNode: lightColor * albedo * transl * 0.5 (the engine multiplies by the light)
	s.translucency = c * ( transl * 0.5 );
${e?`	s.clearcoat = coat;
	s.clearcoatRoughness = 0.2;
`:``}`}var qn=`
	{
		let Dm = in.vs.vFishData;
		let partM = fishPartOf( Dm );
		let finM = partM > 0.5 && partM < 6.5;
		let rayM = 1.0 - smoothstep( 0.07, 0.14, abs( fract( Dm.w + 0.5 ) - 0.5 ) );
		let alphaM = select( 1.0, max( mix( 0.9, 0.55, smoothstep( 0.25, 1.0, Dm.z ) ), rayM ), finM );
		let dither = interleavedGradientNoise( in.pixel + fract( frame.time * 7.3 ) * 97.0 );
		if ( ! ( dither < alphaM ) ) { discard; }
	}`;function Jn(e,t,n){return new ee({name:t,roughness:.4,metalness:0,modules:[zn(),e.module],attributes:{aData:`vec4f`,aKind:`f32`},varyings:Bn,...n})}function Yn(e,{fade:t=!1}={}){return Jn(e,t?`FishFade`:`Fish`,{vertex:Hn(e,t),surface:Kn(!1,t)})}function Xn(e,{fade:t=!1}={}){return Jn(e,t?`FishPropsFade`:`FishProps`,{vertex:Un(e,t),surface:qn+Kn(!0,t),shadow:qn+`
	return true;`,defines:{CLEARCOAT:1}})}var Zn=90,Qn=22,$n=new h,er=new t,tr=new r,nr=new t,rr=new a,ir=new m;function ar(e,t,n){let r=new E;return r.setAttribute(`position`,new D(e,3)),r.setAttribute(`aData`,new D(t,4)),r.setIndex(n),r.computeVertexNormals(),r.computeBoundingSphere(),r}function or(e){let t=e>>>0;return()=>{t=t+1831565813>>>0;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}function sr(n){let i=[],a=[],o=[],s=or(17),c=(e,t,n,r,o)=>(i.push(e,t,n),a.push(0,G.ICE,r,o),i.length/3-1),l=n?3:6,u=n?12:24,d=(e,t)=>.16*(1-e*e)+.025*Math.sin(t*5+e*7)*e+.02,f=c(0,d(0,0),0,.5,.5),p=[];for(let e=1;e<=l;e++){let t=e/l,n=[];for(let e=0;e<u;e++){let r=e/u*Math.PI*2;n.push(c(Math.cos(r)*t,d(t,r),Math.sin(r)*t,s(),s()))}p.push(n)}let m=[];for(let e=0;e<u;e++){let t=e/u*Math.PI*2;m.push(c(Math.cos(t)*.8,-.35,Math.sin(t)*.8,s(),s()))}p.push(m);for(let e=0;e<u;e++)o.push(f,p[0][(e+1)%u],p[0][e]);for(let e=0;e<l;e++)for(let t=0;t<u;t++){let n=p[e][t],r=p[e][(t+1)%u],i=p[e+1][(t+1)%u],a=p[e+1][t];o.push(n,r,a,r,i,a)}let h=n?50:170;for(let n=0;n<h;n++){let n=Math.sqrt(s())*.92,i=s()*Math.PI*2,a=Math.cos(i)*n,l=Math.sin(i)*n,u=d(n,i),f=.06+s()*.09,p=new r().setFromEuler(new e(s()*6,s()*6,s()*6)),m=[[1,.2,.1],[-.6,.9,.2],[-.5,-.4,.9],[.1,-.6,-.9],[.3,.8,-.5]].map(e=>new t(e[0]*(.7+s()*.6),e[1]*(.7+s()*.6),e[2]*(.7+s()*.6)).multiplyScalar(f).applyQuaternion(p)),h=[[0,1,2],[0,2,3],[0,3,4],[0,4,1],[1,4,3],[1,3,2]],g=s(),_=s();for(let e of h){let n=m[e[0]],r=m[e[1]],i=m[e[2]],s=new t().subVectors(r,n).cross(new t().subVectors(i,n)),d=new t().add(n).add(r).add(i),f=s.dot(d)<0,p=[n,r,i].map(e=>c(a+e.x,u+e.y*.8,l+e.z,g,_));f?o.push(p[0],p[2],p[1]):o.push(p[0],p[1],p[2])}}return ar(i,a,o)}function cr(e){let t=[],n=[],r=[],i=e?8:20,a=e?3:7,o=or(5),s=[];for(let e=0;e<6;e++)s.push([.3+o()*.6,o()<.5?-1:1]);for(let e of[!1,!0]){let o=t.length/3;for(let e=0;e<=i;e++){let r=e/i,o=.19*Math.sin(Math.PI*Math.min(1,.08+r*.95))+.012;for(let e=-a;e<=a;e++){let i=e/a,c=i*o;for(let[e,t]of s)Math.sign(i)===t&&Math.abs(i)>.45&&r>e&&(c+=t*.01*Math.abs(i));let l=Math.abs(i)*o*.25,u=i*i*.04*(1-r);t.push(c,l+u+.01*Math.sin(r*9)*i,r),n.push(r,G.LEAF,i,r)}}let c=2*a+1;for(let t=0;t<i;t++)for(let n=0;n<2*a;n++){let i=o+t*c+n,a=i+1,s=i+c+1,l=i+c;e?r.push(i,a,l,a,s,l):r.push(i,l,a,a,l,s)}}return ar(t,n,r)}function lr(e){let n=[],r=[],i=[],a=(e,t,i,a,o)=>(n.push(e,t,i),r.push(.5-i,G.SHELL,a,o),n.length/3-1),o=e?6:12,s=(e,t)=>{let n=[];for(let[r,i,s]of e){let e=[];for(let n=0;n<=o;n++){let c=Math.PI*n/o,l=Math.cos(c)*i,u=Math.sin(c)*s;e.push(a(l,u*(u<0?t:1),r,l*3,r*3))}n.push(e)}for(let e=0;e<n.length-1;e++)for(let t=0;t<o;t++){let r=n[e][t],a=n[e][t+1],o=n[e+1][t+1],s=n[e+1][t];i.push(r,s,a,a,s,o)}for(let e=0;e<n.length-1;e++){let t=n[e][0],r=n[e][o],a=n[e+1][o],s=n[e+1][0];i.push(t,r,s,r,a,s)}};s([[.5,.03,.03],[.47,.09,.075],[.4,.125,.105],[.28,.135,.115],[.15,.125,.11],[.1,.115,.1]],.25);for(let e of[1,-1]){let t=a(e*.035,.07,.47,.5,.5),n=a(e*.075,.06,.46,.5,.5),r=a(e*.05,.03,.47,.5,.5),o=a(e*.075,.1,.55,.5,.5);i.push(t,n,o,n,r,o,r,t,o),e<0&&i.splice(i.length-9,9,t,o,n,n,o,r,r,o,t)}let c=[];for(let e=0;e<6;e++){let t=.1-e*.075,n=.115-e*.009,r=-e*e*.002;c.push([t,n,n*.8,r])}for(let[e,t,r,i]of c){let a=n.length/3;s([[e+.005,t*.95,r*.95],[e-.02,t,r],[e-.08,t*.96,r*.92]],.3);for(let e=a;e<n.length/3;e++)n[e*3+1]+=i}for(let e=-2;e<=2;e++){let t=e*.32,n=-.36,r=.13-Math.abs(e)*.012,o=a(0,-.05,n,0,0),s=a(Math.sin(t-.13)*r,-.060000000000000005,n-Math.cos(t-.13)*r,1,0),c=a(Math.sin(t+.13)*r,-.060000000000000005,n-Math.cos(t+.13)*r,1,1);i.push(o,c,s,o,s,c)}let l=(n,r,o,s)=>{let c=[],l=e?3:5;for(let e=0;e<n.length;e++){let i=n[e],u=n[Math.min(e+1,n.length-1)],d=n[Math.max(e-1,0)],f=new t(u[0]-d[0],u[1]-d[1],u[2]-d[2]).normalize(),p=new t(0,1,0).cross(f).normalize();p.lengthSq()<1e-6&&p.set(1,0,0);let m=new t().crossVectors(f,p),h=r+(o-r)*e/(n.length-1),g=[];for(let t=0;t<l;t++){let r=t/l*Math.PI*2;g.push(a(i[0]+(p.x*Math.cos(r)+m.x*Math.sin(r))*h,i[1]+(p.y*Math.cos(r)+m.y*Math.sin(r))*h,i[2]+(p.z*Math.cos(r)+m.z*Math.sin(r))*h,s,e/n.length))}c.push(g)}for(let e=0;e<c.length-1;e++)for(let t=0;t<l;t++){let n=c[e][t],r=c[e][(t+1)%l],a=c[e+1][(t+1)%l],o=c[e+1][t];i.push(n,r,o,r,a,o)}};for(let t of[1,-1]){let n=[];for(let r=0;r<=(e?5:10);r++){let i=r/(e?5:10);n.push([t*(.05+Math.sin(i*2.2)*.28),.05+i*.06-i*i*.1,.48+Math.sin(i*2.6)*.25-i*i*.75])}l(n,.042,.005,2);for(let e=0;e<5;e++){let n=.36-e*.055;l([[t*.09,-.01,n],[t*.19,.025,n-.01],[t*.26,-.01,n-.04],[t*.29,-.07,n-.07]],.013,.005,3)}l([[t*.03,.05,.47],[t*.05,.08,.5]],.012,.01,4)}return ar(n,r,i)}function ur(e,t,n,r,i,a){let o=r+(r>=0?1e-4:-1e-4),s=o*n,c=Math.sin(s*.5),l=2*c*c/o+e*Math.cos(s),u=Math.sin(s)/o-e*Math.sin(s),d=i+(i>=0?1e-4:-1e-4),f=d*u,p=Math.sin(f*.5);return a.set(l,2*p*p/d+t*Math.cos(f),Math.sin(f)/d-t*Math.sin(f))}var dr={side:new h().makeBasis(new t(0,1,0),new t(0,0,1),new t(1,0,0)),sideFlip:new h().makeBasis(new t(0,-1,0),new t(0,0,-1),new t(1,0,0)),tail:new h().makeBasis(new t(0,0,1),new t(-1,0,0),new t(0,-1,0)),tailFlat:new h().makeBasis(new t(1,0,0),new t(0,0,1),new t(0,-1,0)),gill:new h().makeBasis(new t(0,0,1),new t(1,0,0),new t(0,1,0)),flat:new h().makeBasis(new t(0,0,-1),new t(0,1,0),new t(1,0,0))},fr=class{constructor(){this.items=[],this.mesh=null}add(e,n,r,i,a,o={}){let s=n?an[n]:null,c=o.curl??0,l=o.sag??0;$n.multiplyMatrices(r,dr[i]),$n.decompose(er,tr,nr);let u=o.anchor||[0,0,0],d=ur(u[0],u[1],u[2],c,l,new t).multiplyScalar(a).applyQuaternion(tr);er.sub(d),this.items.push({kind:e,species:n,L:a,x:er.x,y:er.y,z:er.z,q:tr.toArray(),pattern:s?s.pattern:0,seed:o.seed??Math.random(),curl:c,sag:l,jaw:o.jaw??0,flags:[o.cloudy??.4,o.wet??1,o.dried??0,o.blood??0]})}static restHeight(e,t){let n=an[e],r=0;for(let e=.1;e<.9;e+=.05)r=Math.max(r,pn(n,e).W);return r*t*.85}static tailAnchor(e){return[0,0,.5-an[e].body*.985]}static gillAnchor(e){let t=an[e];return[0,t.mouth.y*.5,.5-t.body*(t.mouth.corner+.03)]}build(){let e=new Map;for(let t of this.items){let n=t.kind+`:`+(t.species||``);e.has(n)||e.set(n,{kind:t.kind,species:t.species})}let t=[],n=new Map;for(let[r,i]of e){let e=i.species?an[i.species]:null,a=t=>{switch(i.kind){case`split`:return kn(e,{lod:t});case`head`:return On(e,{lod:t,pose:`dead`,u1:e.opercle+.02,eyes:t===0});case`trunk`:return On(e,{lod:t,pose:`dead`,u0:e.opercle+.02});case`ice`:return sr(t);case`leaf`:return cr(t);case`lobster`:return lr(t);default:return On(e,{lod:t,pose:`dead`,eyes:t===0})}};n.set(r,t.length);let o=a(1);t.push({geometry:a(0)},{geometry:o},{geometry:o,shadow:!0,shadowOnly:!0})}let r=this.items.length,i=new rn(`FishProps`,t,{maxInstances:Math.max(1,r),fade:!0}),a=i.data;this.kind0=new Uint16Array(r),this.pos=new Float32Array(r*4),this.items.forEach((e,t)=>{let r=t*16;a.set([e.x,e.y,e.z,e.L],r),a.set(e.q,r+4),a.set([e.pattern+e.seed%1*.9,e.curl,e.sag,e.jaw],r+8),a.set(e.flags,r+12),this.kind0[t]=n.get(e.kind+`:`+(e.species||``)),this.pos.set([e.x,e.y,e.z,e.L],t*4)}),i.upload(),this.batch=i,this.material=Xn(i);let o=i.createMesh(this.material,{castShadow:!0,receiveShadow:!0});o.name=`village_fish`,this.fadeMaterial=Xn(i,{fade:!0}),o.add(i.createFadeMesh(this.fadeMaterial));let s=o.onBeforeRender;return this._frame=-1,o.onBeforeRender=(e,t,n,r,i,a)=>{n.isPerspectiveCamera&&this.cull(n,_.frame),s(e,t,n,r,i,a)},this.mesh=o,this.items=null,o}cull(e,t){if(t===this._frame)return;this._frame=t,e.updateMatrixWorld(),$n.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),rr.setFromProjectionMatrix($n,e.coordinateSystem,e.reversedDepth);let n=e.position,r=this.pos,i=this.batch,a=this.kind0.length;i.begin();for(let e=0;e<a;e++){let t=r[e*4]-n.x,a=r[e*4+1]-n.y,o=r[e*4+2]-n.z,s=r[e*4+3],c=Math.sqrt(t*t+a*a+o*o);if(c>Zn)continue;let l=this.kind0[e];if(c<Qn&&i.add(l+2,e),ir.center.set(r[e*4],r[e*4+1],r[e*4+2]),ir.radius=s*.8,!rr.intersectsSphere(ir))continue;let u=s*28,d=Zn*.9;if(c>d)i.addFade(l+(c<u?0:1),e,1-jn(c,d,Zn),!1);else if(c>u*.88&&c<u){let t=jn(c,u*.88,u);i.addFade(l,e,t,!0),i.addFade(l+1,e,t,!1)}else i.add(l+(c<u?0:1),e)}i.commit()}},pr=new o,mr=new t,J=e=>(pr.setHex(e),[pr.r,pr.g,pr.b]),hr=(e,t)=>[e[0]*t,e[1]*t,e[2]*t],Y=(e,t=.7,n=0,r=0)=>[e,n,r,t],X=(e,t=0,n=0,r=.5)=>[e,t,n,r],Z={iron:J(1907739),galv:J(10133666),rubber:J(1315860),brass:J(11570506),rope:J(11836012),ropeDark:J(8219210),ropeBlue:J(4091790),white:J(15921126),orange:J(15229482),red:J(12729134),yellow:J(15778362),green:J(4161365),blue:J(3108776),black:J(2105376),fishSilver:J(10135213),fishDry:J(9071173),glassWarm:J(16773328),straw:J(13218426)},gr=class{constructor(e){this.fn=e}next(){return this.fn()}range(e,t){return e+(t-e)*this.fn()}int(e,t){return Math.floor(this.range(e,t+1))}pick(e){return e[Math.floor(this.fn()*e.length)%e.length]}chance(e){return this.fn()<e}};function _r(e,t,n,r,i=.5){e.lathe(`hard`,t,n,r,[[0,0],[.21,0],[.21,.045],[.21,.045],[.14,.075],[.115,.14],[.11,.3],[.125,.37],[.175,.41],[.18,.45],[.14,.49],[0,.5]],{segs:14,tint:Z.iron,data:X(i,.3,.35,.5)});for(let a=0;a<4;a++){let o=a/4*Math.PI*2+Math.PI/4;e.cyl(`hard`,t+Math.cos(o)*.17,n+.045,r+Math.sin(o)*.17,.018,.022,.025,{segs:6,tint:Z.iron,data:X(i,.8,.4,.6)})}}function vr(e,t,n,r,i=0,a=.5){let o=Z.iron,s=X(a,.5,.4,.5);e.pushAt(t,n,r,i),e.box(`hard`,0,.012,0,.26,.024,.09,{tint:o,data:s}),e.box(`hard`,-.065,.055,0,.05,.07,.055,{tint:o,data:s}),e.box(`hard`,.065,.055,0,.05,.07,.055,{tint:o,data:s}),e.rod(`hard`,[0,.1,0],[.2,.1,0],.026,.013,{segs:8,tint:o,data:s}),e.rod(`hard`,[0,.1,0],[-.2,.1,0],.026,.013,{segs:8,tint:o,data:s}),e.pop()}function yr(e,t,n,r,i=0,a=.7,o=.5){e.pushAt(t,0,r,i);let s=n-a;e.torus(`hard`,.12,s,0,.27,.1,{rz:Math.PI/2,radial:7,tubular:16,tint:Z.rubber,data:X(o,0,0,.82)}),e.tube(`rope`,Mt([-.05,n+.02,0],[.12,s+.33,0],.02,4),.016,{tint:Z.rope,data:[o,0,0,0]}),e.pop()}function br(e,n,r,i,a=.09,o=.32,s=5,c=.5,l=Z.rope){let u=[],d=s*12;for(let e=0;e<=d;e++){let c=e/d,l=c*s*Math.PI*2,f=a+(o-a)*c;u.push(new t(n+Math.cos(l)*f,r+.02+Math.sin(l*3.1)*.004,i+Math.sin(l)*f))}let f=u[u.length-1];u.push(new t(f.x+.25,r+.02,f.z+.3)),e.tube(`rope`,u,.02,{radial:4,tint:l,data:[c,0,0,0]});let p=[];for(let e=0;e<=24;e++){let s=e/24*Math.PI*4+1.3,c=a+.05+(o-a-.1)*e/24;p.push(new t(n+Math.cos(s)*c,r+.055,i+Math.sin(s)*c))}e.tube(`rope`,p,.02,{radial:4,tint:l,data:[c+.3,0,0,0]})}function xr(e,t,n,r,i,a=null,o=.5){e.torus(`rope`,t,n,r,i,.022,{rx:.18,rz:.1,radial:5,tubular:14,tint:Z.rope,data:[o,0,0,0]}),a&&e.tube(`rope`,Mt([t+i*.8,n-.02,r],a,.15,8),.022,{tint:Z.rope,data:[o,0,0,0]})}function Sr(e,t,n,r,i=0,a=.5){let o=Z.orange,s=Z.white;e.pushAt(t,n,r,i),e.torus(`hard`,0,0,0,.29,.06,{rx:Math.PI/2,radial:8,tubular:24,tint:(e,t,n)=>Math.floor((Math.atan2(n,e)+Math.PI)/(Math.PI/4)+.5)%2?s:o,data:X(a,0,0,.55)}),e.torus(`rope`,0,0,0,.345,.012,{rx:Math.PI/2,radial:4,tubular:24,tint:Z.white,data:[a,0,0,0]}),e.pop()}function Cr(e,t,n,r,i=.5,a=1){let o=a,s=Z.iron,c=X(i,.35,.5,.45);e.torus(`hard`,t,n-.02*o,r,.02*o,.005*o,{rx:Math.PI/2,radial:3,tubular:6,tint:s,data:c}),e.cyl(`hard`,t,n-.13*o,r,.02*o,.12*o,.1*o,{segs:6,capTop:!0,capBot:!0,tint:s,data:c}),e.cyl(`hard`,t,n-.155*o,r,.125*o,.125*o,.025*o,{segs:6,capBot:!0,tint:s,data:c});let l=n-.355*o;e.cyl(`glass`,t,l,r,.085*o,.075*o,.2*o,{segs:6,capTop:!1,tint:Z.glassWarm,data:[i,1,1,0]});for(let n=0;n<4;n++){let i=n/4*Math.PI*2+Math.PI/4;e.box(`hard`,t+Math.cos(i)*.085*o,l+.1*o,r+Math.sin(i)*.085*o,.014*o,.2*o,.014*o,{skip:12,tint:s,data:c})}return e.cyl(`hard`,t,l-.04*o,r,.1*o,.07*o,.04*o,{segs:6,capBot:!0,tint:s,data:c}),[t,l+.1*o,r]}function wr(e,t,n,r,i=.5){let a=Z.iron,o=X(i,.3,.5,.45);e.box(`hard`,t,n,r+.01,.08,.16,.02,{tint:a,data:o}),e.rod(`hard`,[t,n+.02,r+.01],[t,n+.05,r+.2],.01,.01,{segs:5,tint:a,data:o});let s=Cr(e,t,n+.05,r+.2,i,.75);return e.toWorld(s[0],s[1],s[2])}function Tr(e,t,n,r,i,a=3.2,o=.5){let s=Y(o,.75,.62,0),c=J(14077885);e.box(`wood`,t,n+a/2,r,.14,a,.14,{grain:1,tint:c,data:s}),e.box(`wood`,t,n+a+.03,r,.18,.06,.18,{grain:0,tint:c,data:s}),e.pushAt(t,n,r,i);let l=Z.iron,u=X(o,.35,.5,.45),d=a-.18;e.box(`hard`,0,d,.35,.035,.035,.62,{tint:l,data:u}),e.rod(`hard`,[0,d-.35,.075],[0,d-.01,.4],.012,.012,{segs:5,tint:l,data:u}),e.torus(`hard`,0,d-.08,.2,.08,.008,{ry:Math.PI/2,rz:Math.PI/2,radial:3,tubular:8,tint:l,data:u});let f=Cr(e,0,d-.02,.6,o),p=e.toWorld(f[0],f[1],f[2]);return e.pop(),p}function Er(e,t,n,r,i=.5){let a=Y(i,.8,0,0);e.box(`wood`,t,n+.55,r,.12,1.1,.12,{grain:1,tint:[1,1,1],data:a}),e.box(`wood`,t,n+1.12,r,.16,.04,.16,{grain:0,tint:[1,1,1],data:a});let o=Z.iron,s=X(i,.35,.5,.45),c=n+1.14;return e.cyl(`hard`,t,c,r,.07,.07,.03,{segs:8,capBot:!0,tint:o,data:s}),e.cyl(`glass`,t,c+.03,r,.06,.06,.15,{segs:8,capTop:!1,tint:Z.glassWarm,data:[i,1,1,0]}),e.cyl(`hard`,t,c+.18,r,.015,.1,.07,{segs:8,capBot:!0,tint:o,data:s}),e.toWorld(t,c+.1,r)}function Dr(e,t,n,r,i=0,a=1.6,o=.5,s=null){e.pushAt(t,n,r,i);let c=s||[1,1,1],l=e=>Y(e,.8,s?.55:0,0);for(let t=0;t<3;t++)e.box(`wood`,0,.44,-.13+t*.13,a,.04,.11,{grain:0,tint:c,data:l(o+t*.1)});for(let t of[-a/2+.15,a/2-.15])e.box(`wood`,t,.21,-.13,.07,.42,.07,{grain:1,tint:c,data:l(o+.5)}),e.box(`wood`,t,.21,.13,.07,.42,.07,{grain:1,tint:c,data:l(o+.6)}),e.box(`wood`,t,.4,0,.06,.05,.4,{grain:2,tint:c,data:l(o+.7)}),e.beam(`wood`,[t,.42,-.2],[t,.9,-.28],.06,.05,{tint:c,data:l(o+.8)});e.box(`wood`,0,.68,-.245,a,.1,.03,{grain:0,rx:-.16,tint:c,data:l(o+.3)}),e.box(`wood`,0,.84,-.27,a,.1,.03,{grain:0,rx:-.16,tint:c,data:l(o+.4)}),e.pop()}function Or(e,t,n,r,i=Z.blue,a=.5){e.lathe(`hard`,t,n,r,[[0,0],[.1,0],[.1,0],[.135,.28],[.142,.295],[.13,.29],[.095,.03],[0,.03]],{segs:12,tint:i,data:X(a,0,0,.5)}),e.torus(`hard`,t,n+.29,r,.14,.006,{rz:Math.PI/2,arc:Math.PI,radial:4,tubular:10,tint:Z.galv,data:X(a,.2,.8,.4)})}var kr=new h,Ar=e=>e.fishProps||=new fr;function jr(e,t,n,r,i={}){let a=i.species||`redSnapper`,o=i.len||.4,s=i.kind||`whole`,c=i.pose||`side`,l=[0,0,0],u=n;c===`tail`?(l=fr.tailAnchor(a),s===`split`&&(c=`tailFlat`)):c===`gill`?l=fr.gillAnchor(a):(u+=s===`split`?.012:fr.restHeight(a,o),i.flip&&(c=`sideFlip`)),kt(t,u,r,i.ry||0,i.rx||0,i.rz||0,kr),kr.premultiply(e.frame),Ar(e).add(s,a,kr,c,o,{...i,anchor:l})}function Mr(e,t,n,r,i,a=.5){kt(t,n,r,a*6.28,0,0,kr),kr.premultiply(e.frame),Ar(e).add(`ice`,null,kr,`flat`,i,{seed:a,flags:0})}function Nr(e,t,n,r,i=0,a=.9,o=.5,s=0){kt(t,n,r,i,0,s,kr),kr.premultiply(e.frame),Ar(e).add(`leaf`,null,kr,`flat`,a,{seed:o,anchor:[0,0,0]})}function Pr(e,t,n,r,i=0,a=.3,o=.5,s=0){kt(t,n+a*.035,r,i,s,0,kr),kr.premultiply(e.frame),Ar(e).add(`lobster`,null,kr,`flat`,a,{seed:o})}function Fr(e,n,r,i=.5,a=.018){e.tube(`rope`,[new t(n[0],n[1],n[2]),new t(r[0],r[1]+a*.5,r[2])],.0035,{radial:3,tint:Z.rope,data:[i,0,0,0]});let o=[];for(let e=0;e<=8;e++){let n=e/8*Math.PI*2;o.push(new t(r[0]+Math.cos(n)*a,r[1]+Math.sin(n*2)*.003,r[2]+Math.sin(n)*a*.6))}e.tube(`rope`,o,.003,{radial:3,tint:Z.rope,data:[i,0,0,0]})}function Ir(e,t,n,r,i=.06,a=.5){let o=X(a,.35,.85,.35),s=i+.012;e.torus(`hard`,t,n,r,s,.0045,{ry:Math.PI/2,arc:Math.PI*1.25,rz:-Math.PI*.1,radial:4,tubular:8,tint:Z.galv,data:o});let c=n-s;return e.rod(`hard`,[t,c+.004,r-.004],[t,c-.08,r],.0045,.0045,{segs:4,tint:Z.galv,data:o}),e.torus(`hard`,t,c-.1,r,.022,.0045,{ry:Math.PI/2,rz:Math.PI,arc:Math.PI*1.2,radial:4,tubular:8,tint:Z.galv,data:o}),c-.12}function Lr(e,n,r,i,a=0,o=.5){e.pushAt(n,r,i,a);let s=e=>Y(e,.75,0,0);for(let t=0;t<5;t++)e.box(`wood`,0,.88,-.26+t*.13,1.35,.045,.12,{grain:0,data:s(o+t*.13)});for(let t of[-.6,.6])for(let n of[-.27,.27])e.box(`wood`,t,.43,n,.07,.86,.07,{grain:1,data:s(o+t+n)});e.box(`wood`,0,.25,0,1.25,.03,.5,{grain:0,data:s(o+.9)}),e.box(`wood`,0,.8,-.28,1.25,.1,.03,{grain:0,data:s(o+.4)}),e.box(`wood`,.2,.915,.02,.56,.025,.34,{grain:0,tint:[1.25,1.2,1.1],data:Y(o+.2,.25,0,0)});let c=.928,l={species:`redSnapper`,len:.44,ry:.12,sag:.08,blood:1,cloudy:.5,seed:o,jaw:.25};jr(e,.17,c,.02,{...l,kind:`trunk`}),jr(e,.21,c,.035,{...l,kind:`head`,ry:.4}),e.pushAt(.26,.93,.13,-.45);let u=[[0,.011],[.13,.009],[.175,.002],[.19,-.004],[.12,-.009],[0,-.01]].map(e=>new t(e[0],0,e[1]));e.slab(`hard`,u,.0016,{up:new t(0,1,0),tint:J(13159632),data:X(o,.05,.95,.18)}),e.box(`wood`,-.055,.009,0,.11,.018,.024,{grain:0,tint:Z.black,data:Y(o,.2,.8,0)});for(let t of[-.085,-.03])e.cyl(`hard`,t,.0175,0,.0035,.0035,.002,{segs:5,tint:J(11570490),data:X(o,.1,.9,.3)});e.pop();let d=[];for(let e=0;e<9;e++){let n=e/9*Math.PI*2;d.push(new t(.215+Math.cos(n)*.05*(1+.25*Math.sin(n*3+o*9)),.9285,.04+Math.sin(n)*.028))}e.slab(`hard`,d,8e-4,{up:new t(0,1,0),tint:J(4851720),data:X(o,0,0,.15)}),jr(e,-.33,.9025,-.06,{species:`tuna`,len:.52,ry:2.75,sag:-.12,curl:.05,jaw:.3,seed:o+.3}),Or(e,-.3,.265,.05,Z.white,o),e.pop()}function Rr(e,t,n,r,i,a,o=0,s=.5,c={}){e.pushAt(t,n,r,c.ry||0,c.rx||0,c.rz||0);let l=X(s,0,0,.42);o===0?(e.lathe(`hard`,0,0,0,[[0,0],[.08,.025],[.125,.12],[.1,.25],[.04,.305],[0,.31]],{segs:8,tint:(e,t)=>t>.15?i:a,data:l}),e.torus(`hard`,0,.335,0,.025,.008,{rx:Math.PI/2,radial:3,tubular:6,tint:Z.black,data:l})):o===1?(e.lathe(`hard`,0,0,0,[[0,0],[.05,0],[.09,.08],[.09,.32],[.05,.4],[0,.4]],{segs:8,tint:(e,t)=>t>.14&&t<.26?a:i,data:l}),e.cyl(`wood`,0,.38,0,.012,.014,.5,{segs:5,data:Y(s,.8,0,0)}),e.cyl(`wood`,0,-.12,0,.014,.012,.14,{segs:5,data:Y(s,.8,0,0)})):e.lathe(`hard`,0,0,0,[[0,0],[.08,.03],[.09,.12],[0,.2]],{segs:7,tint:i,data:l}),e.pop()}function zr(e,t,n,r,i,a=.25){let o=Mt(t,n,a,10);e.tube(`rope`,o,.01,{radial:4,tint:Z.rope,data:[i.next(),0,0,0]});let s=[[Z.orange,Z.white],[Z.red,Z.white],[Z.yellow,Z.black],[Z.white,Z.blue],[Z.green,Z.yellow],[Z.orange,Z.orange]];for(let t=0;t<r;t++){let n=(t+.5)/r,a=o[Math.round(n*10)],[c,l]=i.pick(s),u=i.chance(.5)?0:2;Rr(e,a.x,a.y-.34,a.z,c,l,u,i.next(),{rz:i.range(-.15,.15)})}}function Br(e,t,n,r=.5,i=null){mr.set(n[0]-t[0],n[1]-t[1],n[2]-t[2]);let a=mr.length();mr.divideScalar(a);let o=a-.55,s=[t[0]+mr.x*o,t[1]+mr.y*o,t[2]+mr.z*o];e.rod(`wood`,t,s,.022,.024,{segs:6,data:Y(r,.55,0,0)}),e.beam(`wood`,s,n,.14,.018,{tint:i||[1,1,1],data:Y(r+.2,.5,i?.6:0,0)})}function Vr(e,t,n,r){let i=e<.42?.7+.3*Math.sin(Math.PI/2*e/.42):Math.cos(Math.PI/2*(e-.42)/.58)**.85;return{halfB:n/2*i,sheer:r+.09*(2*e-1)**2+.1*e*e,keel:.05*(Math.max(0,.45-e)/.45)**2+.42*(Math.max(0,e-.62)/.38)**2.2,z:(e-.5)*t}}function Hr(e,n,r,i,a=0,o={}){let s=o.length??4.1,c=o.beam??1.38,l=o.depth??.52,u=o.seed??.5,d=o.hull??J(3112847),f=o.bottom??J(9386538),p=o.trim??Z.white,m=!!o.upsideDown;e.pushAt(n,r,i,a,o.rx||0,(m?Math.PI:0)+(o.rz||0)),m&&e.push(kt(0,-(l+.035),0));let g=(e,t)=>{let n=Vr(e,s,c,l),r=Math.abs(t)*Math.PI/2;return[n.halfB*Math.sign(t)*Math.sin(r)**.85,n.keel+(n.sheer-n.keel)*(1-Math.cos(r)**1.25),n.z]},_=[],v=[],y=.001,b=(e,n)=>{for(let r=0;r<=10;r++)for(let i=0;i<=16;i++){let a=.02+.96*i/16,o=-1+2*r/10,s=g(a,o),c=g(Math.min(1,a+y),o),u=g(Math.max(0,a-y),o),d=g(a,Math.min(1,o+y)),f=g(a,Math.max(-1,o-y)),p=new t(c[0]-u[0],c[1]-u[1],c[2]-u[2]),m=new t(d[0]-f[0],d[1]-f[1],d[2]-f[2]),h=p.clone().cross(m).normalize(),_=s[0],v=s[1]-l*.9;h.x*_+h.y*v<0&&h.negate(),n.push({p:[s[0]-h.x*e,s[1]-h.y*e,s[2]-h.z*e],n:h.toArray(),s:o,t:a})}};b(0,_);let x=e=>Math.abs(-1+2*e/10)*(c*.5+l)*.9,S=(e,t)=>_t(16,10,(n,r)=>{let i=e[r*17+n];return{p:i.p,n:t?[-i.n[0],-i.n[1],-i.n[2]]:i.n,uv:[i.t*s,x(r)]}}),C=l*.42;e.add(`wood`,S(_,!1),new h,(e,t)=>t<C?f:d,Y(u,.5,.7,1)),(!m||o.interior!==!1)&&(b(.03,v),e.add(`wood`,S(v,!0),new h,J(14209728),Y(u+.3,.55,.6,5)));for(let n of[-1,1]){let r=[];for(let e=0;e<=16;e++){let i=g(.02+.96*e/16,n);r.push(new t(i[0]-n*.012,i[1]+.01,i[2]))}e.tube(`wood`,r,.028,{radial:4,tint:p,data:Y(u+.1,.6,.65,0)})}let w=[];for(let e=0;e<=16;e++){let n=g(.02+.96*e/16,0);w.push(new t(0,n[1]-.015,n[2]))}e.tube(`wood`,w,.028,{radial:4,tint:f,data:Y(u+.2,.6,.6,0)});let T=[];for(let e=0;e<=10;e++){let n=g(.02,-1+2*e/10);T.push(new t(n[0],n[1],n[2]))}if(e.add(`wood`,wt(T,.035,new t(1,0,0),new t(0,0,-1)),new h,d,Y(u+.4,.55,.7,6)),!m){for(let t of[.3,.62]){let n=Vr(t,s,c,l);e.box(`wood`,0,n.sheer-.17,n.z,n.halfB*1.85,.035,.22,{grain:0,tint:p,data:Y(u+t,.6,.6,0)})}o.oars!==!1&&(Br(e,[-.3,l*.55,-1.2],[-.35,l*.4,1.35],u+.1),Br(e,[.32,l*.55,-1.1],[.28,l*.45,1.4],u+.7))}m&&e.pop(),e.pop()}function Ur(e,n,r,i,a,o,s={}){let c=s.length??7.5,l=s.beam??2.6,u=s.depth??1.3;e.pushAt(n,r,i,a,s.rx||0,s.rz||0);let d=()=>Y(o.next(),o.range(.9,1)),f=[.78,.74,.7],p=[];for(let e=0;e<=10;e++){let n=e/10;p.push(new t(0,.12*(2*n-1)**4+(n>.85?(n-.85)*3.5:0),(n-.5)*c))}e.tube(`wood`,p,.1,{radial:5,tint:f,data:d()});for(let n=1;n<11;n++){let r=n/11,i=l/2*Math.sin(Math.PI*(.08+.84*r))**.7,a=(r-.5)*c;for(let n of[-1,1]){if(o.chance(.18))continue;let r=o.chance(.35)?o.range(.35,.8):1,s=[];for(let e=0;e<=6;e++){let c=e/6*r*Math.PI/2;s.push(new t(n*i*Math.sin(c),u*(1-Math.cos(c))*1.05+.05,a+o.range(-.02,.02)))}e.tube(`wood`,s,.055,{radial:4,tint:f,data:d()})}}for(let t=0;t<3;t++){let n=(.25+t*.14)*Math.PI/2,r=.2+o.range(0,.1),i=.55+o.range(0,.2),a=[l/2*.95*Math.sin(n)+.05,u*(1-Math.cos(n))+.05,(r-.5)*c],s=[l/2*.95*Math.sin(n)+.05,u*(1-Math.cos(n))+.05,(i-.5)*c];e.beam(`wood`,a,s,.035,.2,{roll:-n,tint:f,data:d()})}e.pop()}function Wr(e,t,n,r,i,a=3.2,o=J(4157279),s=.5,c=null){e.pushAt(t,0,r,i);let l=1.95,u=Y(s,.85,0,0);for(let t of[-a/2,a/2]){let r=c?c(t,0):n;e.cyl(`wood`,t,r-.4,0,.055,.065,2.4,{segs:6,data:u}),e.box(`wood`,t,r+l-.02,0,.08,.08,.6,{grain:2,data:u})}let d=c?(c(-a/2,0)+c(a/2,0))/2:n;e.rod(`wood`,[-a/2-.2,d+l+.05,0],[a/2+.2,d+l+.05,0],.04,.04,{segs:6,data:Y(s+.3,.8,0,0)});let f=d+l+.09,p=1.6,m=_t(18,12,(e,t)=>{let n=e/18,r=t/12,i=(n-.5)*(a-.3),o=r<.5?1:-1,s=Math.abs(r-.5)*2,c=Math.sin(n*23+r*3)*.04+Math.sin(n*7.3)*.05;return{p:[i,f-s*p+Math.sin(n*Math.PI)*s*.1,o*(.04+s*.22+c*s)],n:[0,.2,o],uv:[i,r*p*2]}});e.add(`net`,m,new h,o,(e,t)=>[s,Math.min(1,Math.max(0,(f-t)/p))*.8,.045,0]);for(let t of[-1,1])for(let n=0;n<5;n++)Rr(e,((n+.5)/5-.5)*(a-.4),f-p-.06,t*.27,Z.orange,Z.orange,2,s+n*.1,{rx:t*.2});e.pop()}function Gr(e,t,n,r,i,a=2.6,o=.5,s=null){e.pushAt(t,n,r,i);let c=Y(o,.9,0,0);for(let t of[-a/2,a/2])e.rod(`wood`,[t,-.2,-.7],[t,2.05,.05],.035,.03,{segs:5,data:c}),e.rod(`wood`,[t,-.2,.7],[t,2.05,-.05],.035,.03,{segs:5,data:c});let l=[`jack`,`mullet`,`redSnapper`,`mullet`],u=new gr(z(Math.floor(o*4294967296)));for(let[t,n]of[[1.95,0],[1.25,-.36],[1.25,.36]]){e.rod(`wood`,[-a/2-.15,t,n],[a/2+.15,t,n],.025,.025,{segs:5,data:Y(o+t,.85,0,0)});let r=Math.floor(a/.22);for(let i=0;i<r;i++){if(s&&s.chance(.4))continue;let c=(s?s.range(.3,.42):.36)*1.35,d=-a/2+.15+i*(a-.3)/(r-1)+u.range(-.03,.03),f=u.range(.05,.1),p=o+i*.07+t,m=n<0||n===0&&i%2?Math.PI:0;Fr(e,[d,t-.02,n],[d,t-f,n],p,.012),jr(e,d,t-f,n,{species:l[(i+Math.round(t*3))%l.length],kind:`split`,pose:`tail`,len:c,ry:m+u.range(-.25,.25),sag:u.range(-.25,.25),curl:u.range(-.35,.1),dried:1,wet:0,seed:p%1})}}e.pop()}function Kr(e,n,r,i=`picket`,a=Z.white,o=.5,s=null,c=null){let l=i===`picket`;for(let i=0;i<n.length-1;i++){let[u,d]=n[i],[f,p]=n[i+1],m=Math.hypot(f-u,p-d),h=Math.max(1,Math.round(m/2)),g=Math.atan2(f-u,p-d);for(let t=0;t<=h;t++){if(i>0&&t===0)continue;let n=t/h,s=u+(f-u)*n,c=d+(p-d)*n,m=r(s,c);e.box(`wood`,s,m+.42,c,.09,1.1,.09,{grain:1,tint:l?a:[1,1,1],data:Y(o+t*.1,.8,l?.5:0,0)})}for(let t=0;t<h;t++){let n=t/h,i=(t+1)/h,s=u+(f-u)*n,c=d+(p-d)*n,m=u+(f-u)*i,_=d+(p-d)*i,v=r(s,c),y=r(m,_);for(let n of l?[.25,.7]:[.35,.78])e.beam(`wood`,[s,v+n,c],[m,y+n,_],.03,.08,{tint:l?a:[1,1,1],data:Y(o+n+t,.8,l?.45:0,0)});if(l){let n=Math.hypot(m-s,_-c),r=Math.floor(n/.14);for(let n=0;n<r;n++){let i=(n+.5)/r,l=s+(m-s)*i,u=c+(_-c)*i,d=v+(y-v)*i,f=.9+(n*7+t*3)%5*.012;e.box(`wood`,l,d+f/2-.05,u,.075,f,.022,{grain:1,ry:g+Math.PI/2,tint:a,data:Y(o+n*.37,.8,.45,0)}),e.box(`wood`,l,d+f-.03,u,.053,.053,.022,{grain:1,ry:g+Math.PI/2,rz:Math.PI/4,tint:a,data:Y(o+n*.37,.8,.45,0)})}}}if(s&&c){let e=c(u,d),n=c(f,p),i=(e.x+n.x)/2,a=(e.z+n.z)/2,o=Math.max(r(u,d),r(f,p));s.addBox(new t(i,o+.5,a),new t(.06,.6,m/2),Math.atan2(n.x-e.x,n.z-e.z),{tag:`fence`})}}}function qr(e,t,n,r,i=.5,a=!0){let o=Y(i,.85,0,0),s=1.7,c=.62;for(let i of[-.62,c])for(let a of[-.62,c])e.box(`wood`,t+i,n+s/2-.2,r+a,.12,2.1,.12,{grain:1,data:o});for(let i of[-.62,c])e.beam(`wood`,[t-c,n+.3,r+i],[t+c,n+s-.2,r+i],.04,.12,{data:o});for(let a=0;a<9;a++)e.box(`wood`,t,n+s+.02,r-.7+a*.175,1.5,.045,.16,{grain:0,data:Y(i+a*.1,.85,0,0)});let l=n+s+.045;return a?(e.cyl(`roofMetal`,t,l,r,.6,.6,1.25,{segs:20,capTop:!1,swapUV:!0,tint:Z.galv,data:[i,.55,1,0]}),e.cyl(`roofMetal`,t,l+1.25,r,.08,.62,.22,{segs:20,swapUV:!1,tint:Z.galv,data:[i+.5,.6,1,0]})):(e.cyl(`hard`,t,l,r,.6,.6,1.25,{segs:20,capTop:!1,tint:J(2764332),data:X(i,0,0,.55)}),e.cyl(`hard`,t,l+1.25,r,.1,.6,.15,{segs:20,tint:J(2764332),data:X(i,0,0,.55)})),e.rod(`hard`,[t+.5,l+.1,r],[t+.8,l+.1,r],.03,.03,{segs:6,tint:Z.galv,data:X(i,.4,.8,.4)}),e.rod(`hard`,[t+.8,l+.1,r],[t+.8,n+.6,r],.03,.03,{segs:6,tint:Z.galv,data:X(i,.4,.8,.4)}),l}function Jr(e,t,n,r,i=0,a){e.pushAt(t,n,r,i);for(let t=0;t<4;t++){let n=6-(t>2);for(let r=0;r<n;r++){let n=a.range(.055,.075),i=-.5+r*.16+t%2*.08;e.cyl(`wood`,i,n+t*.13,-.25,n,n,.5+a.range(-.05,.05),{segs:7,capTop:!0,capBot:!0,rx:Math.PI/2,ry:a.range(-.05,.05),tint:[1.05,.95,.85],data:Y(a.next(),.35,0,0)})}}e.pop()}function Yr(e,t,n,r,i=5,a=Z.red,o=.5){e.cyl(`wood`,t,n-.3,r,.035,.06,i+.3,{segs:7,tint:Z.white,data:Y(o,.6,.6,0)}),e.lathe(`hard`,t,n+i,r,[[0,0],[.05,.02],[.05,.06],[0,.09]],{segs:8,tint:Z.brass,data:X(o,.2,.9,.35)});let s=e.toWorld(t,0,r),c=.55,l=_t(10,3,(e,t)=>{let r=e/10*1.3,a=c*(1-.75*e/10);return{p:[r,n+i-.1-(t/3-.5)*a-c/2,0],n:[0,0,1],uv:[r,t/3*a]}}),u=e.frame.clone().invert().multiply(new h().makeTranslation(s.x,0,s.z));e.add(`flag`,l,u,a,e=>[o,e,s.x,s.z])}function Xr(e,n,r,i,a){let o=Mt(n,r,.18,10);e.tube(`rope`,o,.006,{radial:3,tint:Z.white,data:[i.next(),0,0,0]});let s=new t(r[0]-n[0],0,r[2]-n[2]).normalize(),c=Math.atan2(s.x,s.z)-Math.PI/2,l=i.int(3,5);for(let t=0;t<l;t++){let n=(t+.7)/(l+.6),r=o[Math.round(n*10)],s=i.range(.4,.75),u=i.range(.45,.8),d=_t(3,4,(e,t)=>{let n=(e/3-.5)*s,r=-t/4*u;return{p:[n,r,Math.sin(e*1.9+t)*.02],n:[0,0,1],uv:[n+s/2,-r]}}),f=kt(r.x,r.y+.01,r.z,c),p=i.next();e.add(`cloth`,d,f,i.pick(a),(e,t)=>[p,Math.min(1,-t/.8),0,0])}}function Zr(e){let t=[];for(let e=0;e<=6;e++){let n=e/6*.88;t.push([.25+.035*Math.sin(Math.PI*n/.88),n])}e.lathe(`wood`,0,0,0,t,{segs:14,rRef:.27,tint:[1,1,1],data:Y(.3,.55,0,5)}),e.cyl(`wood`,0,.82,0,.255,.255,.01,{segs:14,capTop:!0,tint:[.95,.9,.85],data:Y(.7,.6,0,6)});for(let t of[.08,.26,.62,.8]){let n=.25+.035*Math.sin(Math.PI*t/.88)+.004;e.cyl(`hard`,0,t-.025,0,n,n,.05,{segs:14,capTop:!1,tint:Z.iron,data:X(.4,.45,.45,.55)})}}function Qr(e){let t=.62,n=.42,r=.4,i=e=>Y(e,.65,0,0);for(let a of[-1,1])for(let o of[-1,1])e.box(`wood`,a*(t/2-.02),r/2,o*(n/2-.02),.04,r,.04,{grain:1,data:i(.1+a*.2+o*.3)});for(let r=0;r<3;r++){let a=.07+r*.13;for(let t of[-1,1])e.box(`wood`,0,a,t*(n/2-.005),.6,.09,.012,{grain:0,data:i(.2+r*.1+t*.05)});for(let n of[-1,1])e.box(`wood`,n*(t/2-.005),a,0,.012,.09,.39999999999999997,{grain:2,data:i(.5+r*.1+n*.05)})}e.box(`wood`,0,.015,0,.59,.02,.39,{grain:0,data:i(.8)});for(let n=0;n<3;n++)e.box(`wood`,0,.39,-.13+n*.13,t,.018,.09,{grain:0,skip:8,data:i(.9+n*.1)})}function $r(e){let n=.9,r=e=>Y(e,.8,0,0);for(let t of[-1,1])e.box(`wood`,0,.025,t*(.5/2-.02),n,.05,.04,{grain:0,data:r(.1+t*.1)});for(let t=0;t<5;t++)e.box(`wood`,0,.052,-.19+t*.095,.86,.012,.06,{grain:0,data:r(.3+t*.05)});for(let t of[-.9/2+.03,0,n/2-.03])e.torus(`wood`,t,.05,0,.24,.014,{rx:-Math.PI/2,rz:Math.PI/2,arc:Math.PI,radial:3,tubular:8,tint:[.9,.85,.8],data:r(.6+t)});for(let t=0;t<7;t++){let n=(t+.5)/7*Math.PI,i=.05+Math.sin(n)*.245,a=Math.cos(n)*.245;e.box(`wood`,0,i,a,.88,.012,.045,{grain:0,rx:-(n-Math.PI/2),data:r(.7+t*.05)})}for(let r of[-.9/2+.03,n/2-.03]){let n=[];for(let e=0;e<=10;e++){let i=e/10*Math.PI;n.push(new t(r,.05+Math.sin(i)*.24,Math.cos(i)*.24))}e.add(`net`,wt(n,0,new t(0,0,1),new t(1,0,0)),new h,J(4876888),[.5,0,.035,0])}e.tube(`rope`,Mt([-.1,.3,0],[.1,.3,0],-.12,6),.01,{radial:4,tint:Z.ropeBlue,data:[.3,0,0,0]})}var ei=class{constructor(e){this.target=e,this.protos={barrel:this._proto(Zr),crate:this._proto(Qr),trap:this._proto($r)},this.counts={barrel:0,crate:0,trap:0},this._m=new h}_proto(e){let t=new jt;return e(t),t}add(e,t,n,r,i=0,a=null,o=0,s=0){let c=this.protos[e],l=(this.counts[e]++*.6180339887+e.length*.137)%1*7;kt(t,n,r,i,o,s,this._m);for(let e in c.batches)this.target.batch(e).addBatch(c.batches[e],this._m,a,l)}get count(){let e=0;for(let t in this.counts)e+=this.counts[t];return e}build(){return[]}},ti=new t(0,1,0),Q=(e,n,r)=>new t(e,n,r),ni=new t,ri=new t,ii=new o(1,.68,.38);function ai(e,t,n,r){let i=Math.cos(r),a=Math.sin(r),o=(e,r)=>({x:t+e*i+r*a,z:n-e*a+r*i});return{toW:o,gAt:(t,n)=>{let r=o(t,n);return e.heightAt(r.x,r.z)}}}function oi(e,t,n){let r=[];if(n<=1)return[(e+t)/2];for(let i=0;i<n;i++)r.push(e+(t-e)*i/(n-1));return r}function si(e,t,n,r){return wt([Q(-e/2,0,r/2),Q(e/2,0,r/2),Q(e/2,t,r/2),Q(0,n,r/2),Q(-e/2,t,r/2)],r,Q(1,0,0),Q(0,0,1))}function ci(e,t,n,r,i,a,o){let s=.085,c=.035,l=o.trim,u=()=>[t.next(),o.trimPaint,0,o.weather];if(e.box(`wood`,n-i/2-s/2,r+a/2,c/2,s,a+.02,c,{grain:1,skip:44,tint:l,data:u()}),e.box(`wood`,n+i/2+s/2,r+a/2,c/2,s,a+.02,c,{grain:1,skip:44,tint:l,data:u()}),e.box(`wood`,n,r+a+.06,.021500000000000002,i+2*s+.05,.12,.043000000000000003,{grain:0,skip:32,tint:l,data:u()}),e.box(`wood`,n,r+a+.13,.04,i+2*s+.1,.025,.075,{grain:0,tint:l,data:u()}),e.box(`wood`,n,r-.025,.045,i+2*s+.08,.045,.09,{grain:0,rx:.1,tint:l,data:u()}),o.closed){for(let s of[-1,1])e.box(`wood`,n+s*i/4,r+a/2,.018,i/2-.006,a,.03,{grain:0,tint:o.accent,data:[t.next(),o.paint,o.closedPattern??3,o.weather]});return null}e.box(`wood`,n,r+.03,.012,i,.06,.024,{grain:0,skip:35,tint:l,data:u()}),e.box(`wood`,n,r+a-.03,.012,i,.06,.024,{grain:0,skip:35,tint:l,data:u()}),e.box(`wood`,n,r+a/2,.016,i,.045,.03,{grain:0,skip:35,tint:l,data:u()}),e.box(`wood`,n-i/2+.025,r+a/2,.012,.05,a,.024,{grain:1,skip:44,tint:l,data:u()}),e.box(`wood`,n+i/2-.025,r+a/2,.012,.05,a,.024,{grain:1,skip:44,tint:l,data:u()}),e.box(`wood`,n,r+a/2,.01,.022,a-.1,.018,{grain:1,skip:44,tint:l,data:u()});let d=+!!t.chance(o.litChance??.6);if(e.part(`glass`,Ct(i-.05,a-.05),n,r+a/2,.004,{tint:o.curtain,data:[t.next(),0,d,0]}),o.shutters===`louver`||o.shutters===`board`){let c=i/2+.03,l=a+.05,u=o.shutters===`louver`?4:3;for(let d of[-1,1]){let f=n+d*(i/2+s),p=t.range(.02,.45);if(e.pushAt(f,0,.03,-d*p),e.box(`wood`,d*(c/2+.01),r+a/2,.016,c,l,.028,{grain:0,tint:o.accent,data:[t.next(),o.paint,u,o.weather]}),u===4){for(let n of[r+a/2-l/2+.035,r+a/2+l/2-.035])e.box(`wood`,d*(c/2+.01),n,.033,c,.06,.012,{grain:0,skip:32,tint:o.accent,data:[t.next(),o.paint,0,o.weather]});for(let n of[.03,c-.03])e.box(`wood`,d*(n+.01),r+a/2,.033,.055,l-.12,.012,{grain:1,skip:44,tint:o.accent,data:[t.next(),o.paint,0,o.weather]})}e.pop()}}else if(o.shutters===`bahama`){let c=i+2*s+.08,l=a+.12,u=r+a+.14,d=t.range(.45,.75);e.pushAt(n,u,.05,0,-d),e.box(`wood`,0,-l/2,.015,c,l,.03,{grain:0,tint:o.accent,data:[t.next(),o.paint,4,o.weather]}),e.box(`wood`,0,-l+.03,.035,c,.06,.015,{grain:0,tint:o.accent,data:[t.next(),o.paint,0,o.weather]}),e.pop();let f=u-Math.cos(d)*l,p=.05+Math.sin(d)*l;for(let i of[-1,1])e.rod(`wood`,[n+i*(c/2-.08),r-.02,.07],[n+i*(c/2-.08),f+.02,p-.02],.012,.012,{segs:4,data:Y(t.next(),.8)})}return d?{x:n,y:r+a/2}:null}function li(e,t,n,r,i){let a=.92,o=2.08,s=.09,c=i.trim,l=()=>[t.next(),i.trimPaint,0,i.weather];e.box(`wood`,n,r+o/2,.012,a,o,.045,{grain:1,tint:i.accent,data:[t.next(),i.paint,i.doorPattern??3,i.weather]}),e.box(`wood`,n-a/2-s/2,r+o/2+.02,.02,s,2.12,.04,{grain:1,tint:c,data:l()}),e.box(`wood`,n+a/2+s/2,r+o/2+.02,.02,s,2.12,.04,{grain:1,tint:c,data:l()}),e.box(`wood`,n,r+o+.1,.024,1.1+.06,.14,.048,{grain:0,tint:c,data:l()}),e.box(`wood`,n,r+o+.18,.045,1.1+.12,.025,.09,{grain:0,tint:c,data:l()}),e.box(`wood`,n,r+.015,.05,1.04,.03,.1,{grain:0,data:Y(t.next(),.7)}),i.doorGlass&&(e.box(`wood`,n,r+1.55,.04,.56,.5,.012,{grain:0,tint:c,data:l()}),e.part(`glass`,Ct(.46,.4),n,r+1.55,.047,{tint:i.curtain,data:[t.next(),0,+!!t.chance(.5),0]}),e.box(`wood`,n,r+1.55,.049,.02,.4,.006,{grain:1,tint:c,data:l()})),e.lathe(`hard`,n+a/2-.1,r+.98,.035,[[0,0],[.012,0],[.012,.03],[.028,.045],[0,.065]],{segs:8,rx:Math.PI/2,tint:Z.brass,data:X(t.next(),.1,.9,.35)})}function ui(e,t,n,r,i,a,o){let{B:s,colliders:c,rand:l}=e,u=.28,d=.2,f=t.gAt(n,r+.8),p=Math.max(1,Math.ceil((i-f)/d));f=t.gAt(n,r+p*u),p=Math.max(1,Math.ceil((i-f)/d)),f=Math.min(f,t.gAt(n,r+p*u));let m=(i-f)/p;for(let e=1;e<p;e++){let c=i-e*m,d=r+(e-.5)*u;s.box(`wood`,n,c-.02,d,a,.04,.30000000000000004,{grain:0,tint:o.stepTint||[1,1,1],data:Y(l.next(),.75,o.stepPaint||0,0)});let f=Math.min(t.gAt(n,d),c-.1);t.addBoxL(n,(c+f-.4)/2,d,a/2,(c-f+.4)/2,.14500000000000002,{walkable:!0,solid:!0,tag:`stairs`})}let h=p*u;for(let e of[-1,1]){let c=n+e*(a/2+.025);s.beam(`wood`,[c,i-.1,r-.02],[c,f-.02,r+h+.05],.05,.24,{tint:o.trim,data:Y(l.next(),.75,o.trimPaint*.8,0)}),p>=5&&(s.box(`wood`,c,f+.5,r+h-.1,.07,1.3,.07,{grain:1,tint:o.trim,data:Y(l.next(),.75,o.trimPaint,0)}),s.beam(`wood`,[c,i+.9,r+.05],[c,f+.95,r+h-.1],.06,.05,{tint:o.trim,data:Y(l.next(),.75,o.trimPaint,0)})),t.checks.push(t.worldPt(c,f-.02,r+h))}return{g:f,run:h,n:p}}function di(e,t){let{B:n,terrain:r,colliders:i,rand:a,lights:s,checks:c}=e,{x:l,z:u,yaw:d,w:f,d:p}=t,{toW:m,gAt:g}=ai(r,l,u,d),_={toW:m,gAt:g,checks:c,worldPt:(e,t,n)=>{let r=m(e,n);return{x:r.x,y:t,z:r.z}},addBoxL:(e,t,n,r,a,o,s)=>{let c=m(e,n);return i.addBox(ni.set(c.x,t,c.z),ri.set(r,a,o),d,s)}},v=t.stories||1,y=t.storyH||(v>1?2.75:2.95),b=v*y,x=.14,S=t.porch||null,C=S?S.depth:0,w=S?Math.min(f,S.width||f):0,T=S&&S.offset||0,E=t.annex?t.annex.d??2.2:0,D=1/0,ee=-1/0;for(let e=0;e<=4;e++)for(let t=0;t<=6;t++){let n=g((e/4-.5)*f,-p/2-E+t/6*(p+C+E));D=Math.min(D,n),ee=Math.max(ee,n)}let O=t.floorY??ee+(t.clearance??.55),k=O+b,A={trim:t.trim,accent:t.accent,curtain:t.curtain||J(14207144),paint:t.paint??.7,trimPaint:Math.min(1,(t.paint??.7)+.16),weather:t.weather??.6,shutters:t.shutters||`louver`,doorGlass:!!t.doorGlass,litChance:t.litChance??.6,stepTint:t.porchPaint||null,stepPaint:t.porchPaint?.5:0},j=()=>[a.next(),A.paint,t.siding??1,A.weather],M=()=>[a.next(),A.trimPaint,0,A.weather],te=(t.siding??1)===1?2:1;n.pushAt(l,0,u,d);let N=.24,P=t.foundation||`posts`;if(P===`stone`){let e=D-.35,r=O-N+.03-e,i=.32,o=t.plaster||J(15130575),s=()=>[a.next(),t.stoneStyle??1,0,0];n.box(`stone`,0,e+r/2,p/2-i/2+.03,f+.06,r,i,{grain:0,tint:o,data:s()}),n.box(`stone`,0,e+r/2,-p/2+i/2-.03,f+.06,r,i,{grain:0,tint:o,data:s()}),n.box(`stone`,f/2-i/2+.03,e+r/2,0,i,r,p-2*i+.06,{grain:2,tint:o,data:s()}),n.box(`stone`,-f/2+i/2-.03,e+r/2,0,i,r,p-2*i+.06,{grain:2,tint:o,data:s()});for(let[t,n]of[[-f/2,-p/2],[f/2,-p/2],[f/2,p/2],[-f/2,p/2],[0,p/2],[0,-p/2]])c.push(_.worldPt(t,e,n))}else{let e=P===`stilts`,r=Math.max(2,Math.ceil(f/2.1)+1),o=Math.max(2,Math.ceil(p/2.1)+1),s=oi(-f/2+.14,f/2-.14,r),l=oi(-p/2+.14,p/2-.14,o),u=[];for(let t=0;t<r;t++)for(let n=0;n<o;n++){let i=t===0||n===0||t===r-1||n===o-1;!i&&!e&&(t+n)%2||u.push([s[t],l[n],i])}for(let[r,o,s]of u){let l=g(r,o),u=O-N+.02;if(e){let e=l-.9;n.cyl(`wood`,r,e,o,.1,.12,u-e,{segs:8,rx:a.range(-.015,.015),rz:a.range(-.015,.015),tint:[.95,.92,.9],data:Y(a.next(),a.range(.75,1))});let t=m(r,o);i.addCylinder(t.x,t.z,.14,e,u,{tag:`stilt`}),c.push({x:t.x,y:e,z:t.z})}else if(s||(t.clearance??.55)>.3){let e=l-.3;n.box(`wood`,r,(e+u)/2,o,.16,u-e,.16,{grain:1,data:Y(a.next(),.85)}),n.box(`stone`,r,l-.06,o,.34,.26,.34,{grain:0,tint:J(13617336),data:[a.next(),0,0,0]}),c.push(_.worldPt(r,l-.19,o))}}if(e&&O-D>1.2){let e=O-N-.15;for(let[t,i,c,u]of[[s[0],l[0],s[r-1],l[0]],[s[0],l[o-1],s[r-1],l[o-1]],[s[0],l[0],s[0],l[o-1]],[s[r-1],l[0],s[r-1],l[o-1]]]){let r=g(t,i),o=g(c,u),s=Math.max(r,o)+.35;if(e-s<.8)continue;let l=i===u?0:t<0?-1:1,d=i===u?i<0?-1:1:0,f=.13;n.beam(`wood`,[t+l*f,e,i+d*f],[c+l*f,s,u+d*f],.045,.16,{data:Y(a.next(),.9)}),n.beam(`wood`,[t+l*f*1.4,s,i+d*f*1.4],[c+l*f*1.4,e,u+d*f*1.4],.045,.16,{data:Y(a.next(),.9)})}}}let ne=O-N/2,re=t.rimRaw?[1,1,1]:A.trim,ie=()=>[a.next(),t.rimRaw?0:A.trimPaint,0,A.weather];n.box(`wood`,0,ne,p/2+.01,f+.08,N,.06,{grain:0,tint:re,data:ie()}),n.box(`wood`,0,ne,-p/2-.01,f+.08,N,.06,{grain:0,tint:re,data:ie()}),n.box(`wood`,f/2+.01,ne,0,.06,N,p+.02,{grain:2,tint:re,data:ie()}),n.box(`wood`,-f/2-.01,ne,0,.06,N,p+.02,{grain:2,tint:re,data:ie()});let ae=O+b/2;n.box(`wood`,0,ae,p/2-x/2,f,b,x,{grain:0,tint:t.wall,data:j()}),n.box(`wood`,0,ae,-p/2+x/2,f,b,x,{grain:0,tint:t.wall,data:j()}),n.box(`wood`,f/2-x/2,ae,0,x,b,p-2*x,{grain:2,tint:t.wall,data:j()}),n.box(`wood`,-f/2+x/2,ae,0,x,b,p-2*x,{grain:2,tint:t.wall,data:j()});for(let e of[-1,1])for(let t of[-1,1])n.box(`wood`,e*(f/2-.05),ae,t*(p/2-.05),.135,b+.01,.135,{grain:1,tint:A.trim,data:M()});let oe=(e,t,r)=>{n.box(`wood`,0,e,p/2+r/2,f+.02,t,r,{grain:0,tint:A.trim,data:M()}),n.box(`wood`,0,e,-p/2-r/2,f+.02,t,r,{grain:0,tint:A.trim,data:M()}),n.box(`wood`,f/2+r/2,e,0,r,t,p+.02,{grain:2,tint:A.trim,data:M()}),n.box(`wood`,-f/2-r/2,e,0,r,t,p+.02,{grain:2,tint:A.trim,data:M()})};oe(k-.1,.2,.025);for(let e=1;e<v;e++)oe(O+e*y,.16,.03);let se=t.roof||`gable`,F=t.roofMat===`thatch`,I=t.pitch??(F?.68:.44),L=Math.tan(I),R=.12,ce=F?.28:.06,z=t.ovE??(F?.6:.45),le=t.ovR??(F?.45:.32),ue=F?`thatch`:`roofMetal`,de=F?[1,1,1]:t.roofColor||J(10831151),fe=()=>F?[a.next(),t.thatchAge??.4,0,0]:[a.next(),t.rust??.4,+!!t.galv,0],pe=(e,t)=>n.slab(ue,e,ce,{uDir:t.normalize(),up:ti,tint:de,data:fe()}),me=ce/Math.cos(I),he=k,B=null,ge=(e,t,r,i,a,o)=>{F||n.beam(`wood`,[e,t-.1,r],[i,a-.1,o],.032,.2,{tint:A.trim,data:M()})},_e=(e,t,r,i,o,s,c)=>{let l=Math.floor((c-s)/.6);for(let u=0;u<=l;u++){let d=s+(c-s)*u/Math.max(1,l);n.beam(`wood`,[d,i-me-.055,e-r*.08],[d,o-me-.055,t-r*.05],.05,.1,{data:Y(a.next(),.7)})}},ve=(e,r,i,o)=>{let s=R+o/2*L-.03;return n.part(`wood`,si(o,.09,s,x),e,k,r,{ry:i,tint:t.wall,data:[a.next(),A.paint,te,A.weather]}),s},ye=(e,t,r,i)=>{n.pushAt(0,0,e,i);let o=r+.45;n.box(`wood`,0,o,.02,.5,.5,.04,{grain:0,tint:A.trim,data:M()}),n.box(`wood`,0,o,.03,.38,.38,.03,{grain:0,tint:A.accent,data:[a.next(),A.paint,4,A.weather]}),n.pop()},be=(e,r,i)=>{if(F){n.rod(`thatch`,[e.x,e.y-.06,e.z],[r.x,r.y-.06,r.z],.2,.2,{segs:8,tint:[.9,.88,.85],data:[a.next(),(t.thatchAge??.4)+.2,0,0]});return}let o=.2,s=o*Math.tan(I*.85);for(let c of[-1,1]){let l=i.clone().multiplyScalar(c*o),u=[Q(e.x,e.y+.02,e.z),Q(r.x,r.y+.02,r.z),Q(r.x+l.x,r.y+.02-s,r.z+l.z),Q(e.x+l.x,e.y+.02-s,e.z+l.z)];n.slab(`roofMetal`,u,.01,{up:ti,uDir:l.clone().normalize().negate().setY(.3),tint:de,data:[a.next(),(t.rust??.4)+.2,+!!t.galv,0]})}},xe=S&&v===1&&se!==`gableFront`;if(se===`gable`){let e=f/2+le,t=k+R+p/2*L,n=p/2+z,r=k+R-z*L;pe([Q(-e,r,n),Q(e,r,n),Q(e,t,0),Q(-e,t,0)],Q(0,t-r,-n)),pe([Q(e,r,-n),Q(-e,r,-n),Q(-e,t,0),Q(e,t,0)],Q(0,t-r,n)),be(Q(-e,t,0),Q(e,t,0),Q(0,0,1));for(let i of[-1,1])ve(i*(f/2-x/2),0,Math.PI/2,p),ge(i*(e-.016),r,n,i*(e-.016),t,0),ge(i*(e-.016),r,-n,i*(e-.016),t,0);ge(-e,r,n-.016,e,r,n-.016),ge(-e,r,-n+.016,e,r,-n+.016),F||(_e(p/2,n,1,k+R,r,-f/2+.1,f/2-.1),_e(-p/2,-n,-1,k+R,r,-f/2+.1,f/2-.1)),he=t+.2,B={y:t,axis:`x`,ta:L,yF:r,zf:n}}else if(se===`gableFront`){let e=p/2+le,n=k+R+f/2*L,r=f/2+z,i=k+R-z*L;pe([Q(r,i,e),Q(r,i,-e),Q(0,n,-e),Q(0,n,e)],Q(-r,n-i,0)),pe([Q(-r,i,-e),Q(-r,i,e),Q(0,n,e),Q(0,n,-e)],Q(r,n-i,0)),be(Q(0,n,-e),Q(0,n,e),Q(1,0,0));for(let a of[-1,1])ve(0,a*(p/2-x/2),a>0?0:Math.PI,f)>1&&!t.noVent&&ye(p/2*a,a,k,a>0?0:Math.PI),ge(r,i,a*(e-.016),0,n,a*(e-.016)),ge(-r,i,a*(e-.016),0,n,a*(e-.016));ge(r-.016,i,-e,r-.016,i,e),ge(-r+.016,i,-e,-r+.016,i,e),he=n+.2,B={y:n,axis:`z`,ta:L,yF:i,xe:r}}else{let e=z,r=k+R+p/2*L,i=k+R-e*L,o=f/2+e,s=p/2+e,c=Math.max(0,(f-p)/2);c>.02?(pe([Q(-o,i,s),Q(o,i,s),Q(c,r,0),Q(-c,r,0)],Q(0,r-i,-s)),pe([Q(o,i,-s),Q(-o,i,-s),Q(-c,r,0),Q(c,r,0)],Q(0,r-i,s)),be(Q(-c,r,0),Q(c,r,0),Q(0,0,1))):(pe([Q(-o,i,s),Q(o,i,s),Q(0,r,0)],Q(0,r-i,-s)),pe([Q(o,i,-s),Q(-o,i,-s),Q(0,r,0)],Q(0,r-i,s))),pe([Q(o,i,s),Q(o,i,-s),Q(c,r,0)],Q(-o+c,r-i,0)),pe([Q(-o,i,-s),Q(-o,i,s),Q(-c,r,0)],Q(o-c,r-i,0));for(let e of[-1,1])for(let l of[-1,1]){let u=[e*o,i+.02,l*s],d=[e*c,r+.02,0];F?n.rod(`thatch`,[u[0],u[1]-.05,u[2]],[d[0],d[1]-.05,d[2]],.14,.17,{segs:6,tint:[.9,.88,.85],data:[a.next(),(t.thatchAge??.4)+.2,0,0]}):n.rod(`roofMetal`,u,d,.045,.045,{segs:6,tint:de,data:[a.next(),(t.rust??.4)+.2,+!!t.galv,0]})}ge(-o,i,s-.016,o,i,s-.016),ge(-o,i,-s+.016,o,i,-s+.016),ge(o-.016,i,-s,o-.016,i,s),ge(-o+.016,i,-s,-o+.016,i,s),F||(_e(p/2,s,1,k+R,i,-f/2+.1,f/2-.1),_e(-p/2,-s,-1,k+R,i,-f/2+.1,f/2-.1)),he=r+.2,B={y:r,axis:`x`,ta:L,yF:i,zf:s}}if(F){let e=(e,r,i,o,s,c,l)=>{let u=Math.hypot(i-e,o-r),d=Math.max(4,Math.round(u/.05)),f=_t(d,1,(t,n)=>{let a=t/d,f=Math.abs(Math.sin(t*12.9898+e*78.233+r*37.719)*43758.5453)%1,p=.04+.16*f*f*(t%2?1:.6),m=e+(i-e)*a,h=r+(o-r)*a,g=n===0?s-ce*.95-p:s-ce*.3,_=n===0?.05:0;return{p:[m+c*_,g,h+l*_],n:[c,.2,l],uv:[n===0?-p:.2,a*u]}});n.add(`thatch`,f,new h,[.95,.92,.88],[a.next(),(t.thatchAge??.4)+.1,0,0])};if(se===`gable`){let t=f/2+le,n=p/2+z,r=k+R-z*L;e(-t,n,t,n,r,0,1),e(t,-n,-t,-n,r,0,-1)}else if(se===`gableFront`){let t=p/2+le,n=f/2+z,r=k+R-z*L;e(n,t,n,-t,r,1,0),e(-n,-t,-n,t,r,-1,0)}else{let t=f/2+z,n=p/2+z,r=k+R-z*L;e(-t,n,t,n,r,0,1),e(t,-n,-t,-n,r,0,-1),e(t,n,t,-n,r,1,0),e(-t,-n,-t,n,r,-1,0)}}let Se=t.winW??.86,Ce=t.winH??1.2,we=t.doorX??0,Te=[],Ee=(e,t,n=1.9)=>{let r=Math.max(1,Math.floor((e-.9)/n)),i=[];for(let n=0;n<r;n++){let a=-e/2+e*(n+.5)/r;t.every(e=>Math.abs(a-e)>1.05)&&i.push(a)}return i},De=[{L:f,fx:0,fz:p/2,ry:0,front:!0},{L:f,fx:0,fz:-p/2,ry:Math.PI},{L:p,fx:f/2,fz:0,ry:Math.PI/2},{L:p,fx:-f/2,fz:0,ry:-Math.PI/2}],Oe=(t.roof||`gable`)===`gableFront`?-p*.25:0;for(let e=0;e<4;e++){let r=De[e];n.pushAt(r.fx,0,r.fz,r.ry);for(let i=0;i<v;i++){let o=O+i*y,s;s=r.front?i===0?Ee(r.L,[we]):Ee(r.L,[]):e===1?Ee(r.L,[],2.3):Ee(r.L,e===2&&t.chimney===1?[-Oe]:e===3&&t.chimney===-1?[Oe]:[],2.2),!r.front&&t.fewWindows&&s.length>1&&(s=[s[Math.floor(a.next()*s.length)]]);for(let e of s){let i=a.chance(t.closedChance??.12),s=ci(n,a,e,o+.88,Se,Ce,{...A,closed:i,closedPattern:A.shutters===`louver`?4:3});s&&r.front&&Te.push(n.toWorld(s.x,s.y,.35))}}if(r.front&&(li(n,a,we,O,A),t.lantern!==!1)){let e=wr(n,we+.78,O+1.95,0,a.next());s.push({position:e,color:ii.clone(),intensity:3.5,kind:`lantern`})}n.pop()}Te.length&&s.push({position:Te[0],color:new o(1,.62,.32),intensity:1.6,kind:`window`});let ke=t.porchPaint||null;if(S){let r=O-.05,i=p/2,o=p/2+C,s=T-w/2,l=T+w/2,u=Math.max(2,Math.floor(C/.145));for(let e=0;e<u;e++){let t=i+.01+(e+.5)*(C-.01)/u;n.box(`wood`,T+a.range(-.012,.012),r-.02,t,w+.06,.04,.13,{grain:0,ry:a.range(-.004,.004),tint:ke||[1,1,1],data:Y(a.next(),a.range(.55,.9),ke?.68:0,0)})}n.box(`wood`,T,r-.15,o-.03,w+.08,.22,.06,{grain:0,tint:re,data:ie()});for(let e of[s,l])n.box(`wood`,e+(e<T?.03:-.03),r-.15,(i+o)/2,.06,.22,C,{grain:2,tint:re,data:ie()});for(let e of oi(s+.1,l-.1,Math.max(2,Math.ceil(w/2.2)+1))){let t=g(e,o-.12),i=r-.26;i-t>.05&&(n.box(`wood`,e,(i+t-.3)/2,o-.12,.14,i-t+.3,.14,{grain:1,data:Y(a.next(),.85)}),c.push(_.worldPt(e,t-.3,o-.12)))}let d=t.porchPitch??.26,f=F?.24:.06,m;if(v>1)m=O+y-.02;else if(!xe)m=k-.03;else{let e=z,t=k+R-e*L-(F?ce/Math.cos(I)+.16:.22);m=Math.min(k-.03,t-.03+e*Math.tan(d))}let b=o+.32,x=m-(b-i)*Math.tan(d),E=o-.12,ee=m-(E-i)*Math.tan(d)-f/Math.cos(d)-.005,j=.18,te=ee-j,N=s-.22,P=l+.22,ne=F?`thatch`:`roofMetal`;if(n.slab(ne,[Q(N,x,b),Q(P,x,b),Q(P,m,i),Q(N,m,i)],f,{up:ti,uDir:Q(0,m-x,i-b).normalize(),tint:de,data:fe()}),!F)n.box(`wood`,T,x-.1,b-.016,P-N,.18,.032,{grain:0,tint:A.trim,data:M()}),n.box(`wood`,T,m-.02,i+.03,P-N,.06,.05,{grain:0,tint:A.trim,data:M()});else{let e=Math.round((P-N)/.07),r=_t(e,1,(t,n)=>{let r=t/e,i=Math.abs(Math.sin(t*12.9898+N*78.233)*43758.5453)%1,a=.04+.13*i*i*(t%2?1:.6),o=N+(P-N)*r;return{p:[o,n===0?x-f-a:x-f*.3,b+(n===0?.04:0)],n:[0,.2,1],uv:[n===0?-a:.2,o]}});n.add(`thatch`,r,new h,[.95,.92,.88],[a.next(),(t.thatchAge??.4)+.1,0,0])}n.box(`wood`,T,ee-j/2,E,w+.1,j,.12,{grain:0,tint:A.trim,data:M()});let ae=oi(s+.08,l-.08,Math.max(2,Math.ceil(w/2.6)+1));for(let e of ae){n.box(`wood`,e,(r+te)/2,E,.12,te-r,.12,{grain:1,tint:A.trim,data:M()}),n.box(`wood`,e,r+.05,E,.16,.1,.16,{grain:0,tint:A.trim,data:M()}),n.box(`wood`,e,te-.03,E,.16,.06,.16,{grain:0,tint:A.trim,data:M()});for(let t of[-1,1])e<=s+.1&&t<0||e>=l-.1&&t>0||n.beam(`wood`,[e+t*.04,te-.34,E],[e+t*.36,te-.02,E],.05,.06,{tint:A.trim,data:M()})}let oe=S.stairX??we,se=S.rail||`balusters`,le=(e,t,i,a)=>{let o=Math.hypot(i-e,a-t);if(o<.2)return;n.beam(`wood`,[e,r+.86,t],[i,r+.86,a],.1,.045,{tint:A.trim,data:M()}),n.beam(`wood`,[e,r+.13,t],[i,r+.13,a],.07,.045,{tint:A.trim,data:M()});let s=(i-e)/o,c=(a-t)/o;if(se===`balusters`){let i=Math.floor(o/.12);for(let a=1;a<i;a++){let l=a/i;n.box(`wood`,e+s*o*l,r+.495,t+c*o*l,.034,.71,.034,{grain:1,skip:12,tint:A.trim,data:M()})}}else{let i=Math.max(1,Math.round(o/1.1));for(let a=0;a<i;a++){let l=a/i,u=(a+1)/i,d=[e+s*o*l,t+c*o*l],f=[e+s*o*u,t+c*o*u];n.beam(`wood`,[d[0],r+.16,d[1]],[f[0],r+.83,f[1]],.035,.07,{tint:A.trim,data:M()}),n.beam(`wood`,[d[0],r+.83,d[1]],[f[0],r+.16,f[1]],.03,.07,{tint:A.trim,data:M()})}}_.addBoxL((e+i)/2,r+.55,(t+a)/2,Math.abs(s)>.5?o/2:.06,.55,Math.abs(s)>.5?.06:o/2,{tag:`porchRail`})},ue=oe-.68,pe=oe+.68;if(t.railNet&&ue-s>1){let e=s+.2,i=ue-.12-e,o=_t(10,8,(t,n)=>{let a=t/10,o=n/8,s=e+a*i,c=Math.sin(a*17+o*2)*.035,l=o<.35,u=l?(.35-o)/.35:(o-.35)/.65;return{p:[s,r+.9-u*(l?.35:.78)-Math.sin(a*Math.PI)*.06*u,E+(l?-.05-u*.05:.06+u*.1)+c*u],n:[0,.3,l?-1:1],uv:[a*i,o*1.2]}}),c=a.next();n.add(`net`,o,new h,t.railNet,(e,t)=>[c,Math.min(1,Math.max(0,r+.9-t))*.5,.04,0])}le(s+.08,E,ue,E),le(pe,E,l-.08,E),le(s+.08,i+.08,s+.08,E),le(l-.08,i+.08,l-.08,E);for(let e of[ue,pe])n.box(`wood`,e,r+.5,E,.1,1,.1,{grain:1,tint:A.trim,data:M()});let me=ui(e,_,oe,o,r,1.2,{...A,trim:A.trim}),B=Math.min(D,me.g);_.addBoxL(T,(r+B-.5)/2,(i+o)/2,w/2,(r-B+.5)/2,C/2,{walkable:!0,solid:!0,tag:`porch`}),he=Math.max(he,m),t.porchBench!==!1&&fi(n,a,oe>T?s+1.1:l-1.1,r,i+.45,A)}else{let t=O-.04,r=1.5;for(let e=0;e<7;e++)n.box(`wood`,we,t-.02,p/2+.02+(e+.5)*1/7,r,.04,1/7-.012,{grain:0,data:Y(a.next(),.8)});let i=g(we,p/2+1);for(let e of[-1,1])n.box(`wood`,we+e*(r/2-.06),(t+i-.3)/2,p/2+1-.06,.12,t-i+.3,.12,{grain:1,data:Y(a.next(),.85)}),c.push(_.worldPt(we+e*(r/2-.06),i-.3,p/2+1-.06));let o=ui(e,_,we,p/2+1,t,1.1,A);_.addBoxL(we,(t+Math.min(i,o.g)-.4)/2,p/2+1/2,r/2,(t-Math.min(i,o.g)+.4)/2,1/2,{walkable:!0,solid:!0,tag:`stoop`});let s=O+2.5;n.slab(ue,[Q(we-.85,s-.22,p/2+.75),Q(we+.85,s-.22,p/2+.75),Q(we+.85,s,p/2),Q(we-.85,s,p/2)],F?.14:.04,{up:ti,uDir:Q(0,.22,-.75).normalize(),tint:de,data:fe()});for(let e of[-1,1])n.beam(`wood`,[we+e*.75,s-.5,p/2+.02],[we+e*.75,s-.2,p/2+.65],.05,.07,{tint:A.trim,data:M()})}if(t.stovepipe&&B){let e=B.axis===`x`?f*.22:-f*.22,t=B.axis===`x`?-p*.22:p*.18,r=B.axis===`x`?B.y-Math.abs(t)*L:B.y-Math.abs(e)*L,i=X(a.next(),.75,.6,.55);n.cyl(`hard`,e,r-.3,t,.08,.08,B.y-r+1,{segs:10,capTop:!1,tint:J(3814962),data:i}),n.cyl(`hard`,e,B.y+.72,t,.02,.2,.14,{segs:10,capBot:!0,tint:J(3814962),data:i}),n.cyl(`hard`,e,r-.02,t,.1,.2,.08,{segs:10,tint:J(3814962),data:i})}if(t.chimney){let e=t.chimney*(f/2+.36),r=se===`gableFront`?-p*.25:0,i=g(e,r),o=se===`gable`?B.y+.7:B.y+.3,s=o-(i-.3);n.box(`stone`,e,i-.3+s/2,r,.72,s,.82,{grain:0,tint:J(14209216),data:[a.next(),2,0,0]}),n.box(`stone`,e,o+.04,r,.84,.08,.94,{grain:0,tint:J(13156528),data:[a.next(),0,0,0]}),n.cyl(`stone`,e,o+.08,r,.1,.12,.3,{segs:8,tint:J(11037258),data:[a.next(),1,0,0]}),c.push(_.worldPt(e,i-.3,r)),_.addBoxL(e,i+s/2-.3,r,.36,s/2,.41,{tag:`chimney`})}if(t.antenna&&B){let e=B.axis===`x`?-f*.3:0,t=B.axis===`x`?0:-p*.3,r=X(a.next(),.5,.8,.4);n.rod(`hard`,[e,B.y-.1,t],[e,B.y+2.4,t],.025,.02,{segs:6,tint:Z.galv,data:r});for(let[i,a]of[[2.2,1.2],[1.9,1],[1.6,.8]])n.rod(`hard`,[e,B.y+i,t-a/2],[e,B.y+i,t+a/2],.008,.008,{segs:4,tint:Z.galv,data:r});n.rod(`hard`,[e,B.y+2.25,t],[e+.9,B.y+2.25,t],.012,.012,{segs:4,tint:Z.galv,data:r})}if(t.gutter&&!F&&B&&B.axis===`x`){let t=B.zf+.06,r=B.yF-.12,o=f/2+le,s=X(a.next(),.55,.8,.4);n.rod(`hard`,[-o+.1,r,-t],[o-.1,r,-t],.06,.06,{segs:8,capTop:!0,tint:Z.galv,data:s});let c=o-.25;n.rod(`hard`,[c,r,-t],[c,g(c,-t)+.95,-t],.04,.04,{segs:6,tint:Z.galv,data:s});let l=m(c,-t-.05);e.inst.add(`barrel`,l.x,g(c,-t-.05)-.02,l.z,a.range(0,6),[.9,.85,.8]),i.addCylinder(l.x,l.z,.32,g(c,-t)-.1,g(c,-t)+.9,{tag:`barrel`})}if(t.annex){let e=t.annex,r=Math.min(f-.6,e.w??f*.62),i=E,o=e.x??0,s=-p/2,l=-p/2-i,u=.3,d=F?.22:.05,m;if(v>1)m=O+y-.02;else if(se===`gableFront`)m=k-.03;else{let e=k+R-z*L-(F?ce/Math.cos(I)+.16:.22);m=Math.min(k-.03,e-.03+z*Math.tan(u))}let h=l-.3,b=m-(s-h)*Math.tan(u),S=d/Math.cos(u)+.01,C=m-(s-l)*Math.tan(u)-S,w=C-O,T=e.wall||t.wall,ee=Math.max(.3,A.paint-.12),j=()=>[a.next(),ee,t.siding??1,Math.min(1,A.weather+.1)];n.box(`wood`,o,O+w/2,l+x/2,r,w,x,{grain:0,tint:T,data:j()});for(let e of[-1,1]){let t=o+e*r/2,u=[Q(t,O,s-.01),Q(t,O,l),Q(t,C,l),Q(t,m-S,s-.01)];n.slab(`wood`,u,x,{up:Q(e,0,0),uDir:Q(0,0,-e),tint:T,data:j()}),n.box(`wood`,t-e*.05,O+w/2,l+.05,.13,w+.01,.13,{grain:1,tint:A.trim,data:M()});let d=o+e*(r/2-.12),f=l+.12,p=g(d,f);n.box(`wood`,d,(p-.3+O-N)/2,f,.15,O-N-p+.3,.15,{grain:1,data:Y(a.next(),.85)}),c.push(_.worldPt(d,p-.3,f)),n.box(`wood`,t+e*.02,ne,(s+l)/2,.06,N,i,{grain:2,tint:re,data:ie()})}n.box(`wood`,o,ne,l-.02,r+.08,N,.06,{grain:0,tint:re,data:ie()}),n.box(`wood`,o,C-.08,l-.012,r,.16,.025,{grain:0,tint:A.trim,data:M()});let te=o-r/2-.22,P=o+r/2+.22;n.slab(ue,[Q(te,b,h),Q(P,b,h),Q(P,m,s),Q(te,m,s)],d,{up:ti,uDir:Q(0,m-b,s-h).normalize(),tint:de,data:fe()}),F||n.box(`wood`,o,b-.09,h+.016,P-te,.16,.03,{grain:0,tint:A.trim,data:M()}),n.pushAt(o,0,l,Math.PI),ci(n,a,0,O+1,.7,.85,{...A,closed:a.chance(.25),closedPattern:3}),n.pop(),_.addBoxL(o,(D-.3+m)/2,(s+l)/2,r/2+.05,(m-D+.3)/2,i/2,{tag:`house`})}if(t.buoys){let e=t.buoys;n.pushAt(e*(f/2+.02),0,0,e*Math.PI/2),zr(n,[-p/2+.5,O+2.3,.05],[p/2-.9,O+2.3,.05],Math.max(3,Math.floor(p/.8)),a,.3),n.pop()}if(n.pop(),t.tank){let e=m(t.tank*(f/2+1.25),-p/4),o=r.heightAt(e.x,e.z);qr(n,e.x,o,e.z,a.next(),a.chance(.6)),i.addBox(ni.set(e.x,o+1.5,e.z),ri.set(.75,1.5,.75),0,{tag:`tank`}),c.push({x:e.x,y:o-.2,z:e.z})}if(t.woodpile){let e=m(-t.woodpile*(f/2+.45),-p/4);Jr(n,e.x,r.heightAt(e.x,e.z),e.z,d+Math.PI/2,a),i.addBox(ni.set(e.x,r.heightAt(e.x,e.z)+.3,e.z),ri.set(.3,.3,.6),d,{tag:`woodpile`})}let Ae=D-.3;return _.addBoxL(0,(Ae+he)/2,0,f/2+.06,(he-Ae)/2,p/2+.06,{tag:`house`}),{floorY:O,roofTop:he,footprint:{x:l,z:u,r:Math.hypot(f,p+Math.max(C,E)*2)/2+.8,kind:`building`}}}function fi(e,t,n,r,i,a){let o=()=>Y(t.next(),.8,a.trimPaint*.8,0);for(let t=0;t<2;t++)e.box(`wood`,n,r+.43,i-.06+t*.13,1.3,.035,.11,{grain:0,tint:a.accent,data:o()});for(let t of[-.55,.55])e.box(`wood`,n+t,r+.21,i,.06,.42,.3,{grain:1,tint:a.accent,data:o()});e.box(`wood`,n,r+.72,i-.17,1.3,.12,.03,{grain:0,rx:-.12,tint:a.accent,data:o()});for(let t of[-.55,.55])e.box(`wood`,n+t,r+.6,i-.15,.05,.36,.03,{grain:1,rx:-.12,tint:a.accent,data:o()})}function pi(e,t){let{B:n,terrain:r,colliders:i,rand:a,lights:o,checks:s}=e,{x:c,z:l,yaw:u}=t,d=t.w??5.4,f=t.d??7.2,{toW:p,gAt:m}=ai(r,c,l,u),g=(e,t,n,r,a,o,s)=>{let c=p(e,n);i.addBox(ni.set(c.x,t,c.z),ri.set(r,a,o),u,s)},_=1/0,v=-1/0;for(let e=0;e<=4;e++)for(let t=0;t<=4;t++){let n=m((e/4-.5)*d,(t/4-.5)*f);_=Math.min(_,n),v=Math.max(v,n)}let y=v+2.7,b=t.wall||J(10467760),x=t.paint??.55,S=e=>[a.next(),x,e,.8];n.pushAt(c,0,l,u);let C=[-d/2+.09,d/2-.09],w=oi(-f/2+.09,f/2-.09,4);for(let e of C)for(let t of w){let r=m(e,t);n.box(`wood`,e,(r-.5+y)/2,t,.18,y-r+.5,.18,{grain:1,data:Y(a.next(),.9)}),s.push({...p(e,t),y:r-.5})}let T=_-.15,E=y-T;n.box(`wood`,0,T+E/2,-f/2+.05,d,E,.08,{grain:0,tint:b,data:S(2)});for(let e of[-1,1])n.box(`wood`,e*(d/2-.05),T+E/2,0,.08,E,f-.1,{grain:2,tint:b,data:S(2)});g(0,T+E/2,-f/2+.05,d/2,E/2,.08,{tag:`boathouse`});for(let e of[-1,1])g(e*(d/2-.05),T+E/2,0,.08,E/2,f/2,{tag:`boathouse`});n.box(`wood`,0,y-.14,f/2-.09,d,.28,.16,{grain:0,data:Y(a.next(),.85)});let D=Math.tan(.5),ee=.1,O=y+ee+d/2*D,k=.4,A=f/2+.45,j=d/2+k,M=y+ee-k*D,te=()=>[a.next(),.75,0,0],N=t.roofColor||J(7176070);n.slab(`roofMetal`,[Q(j,M,A),Q(j,M,-A),Q(0,O,-A),Q(0,O,A)],.05,{up:ti,uDir:Q(-j,O-M,0).normalize(),tint:N,data:te()}),n.slab(`roofMetal`,[Q(-j,M,-A),Q(-j,M,A),Q(0,O,A),Q(0,O,-A)],.05,{up:ti,uDir:Q(j,O-M,0).normalize(),tint:N,data:te()});for(let e of[-1,1])n.part(`wood`,si(d,.07,ee+d/2*D-.03,.08),0,y,e*(f/2-.05),{ry:e>0?0:Math.PI,tint:b,data:S(2)});n.box(`wood`,0,O-.14,0,.1,.18,f+.8,{grain:2,data:Y(a.next(),.8)});for(let e of oi(-f/2+.3,f/2-.3,5)){for(let t of[-1,1])n.beam(`wood`,[0,O-.12,e],[t*(d/2+k-.05),M-.1,e],.05,.12,{data:Y(a.next(),.75)});n.box(`wood`,0,y-.05,e,d-.1,.1,.07,{grain:0,data:Y(a.next(),.8)})}let P=m(.3,0);Hr(n,.35,P+.28,.1,0,{seed:a.next(),hull:J(14275263),bottom:J(3104634),trim:J(3104634),length:4.2});for(let e of[-1.1,1.2])n.box(`wood`,.35,P+.12,e,1.1,.24,.14,{grain:0,data:Y(a.next(),.9)});g(.35,P+.5,.1,.8,.5,2.2,{tag:`boat`}),Br(n,[-d/2+.12,m(-d/2+.2,-1.5)+.4,-1.6],[-d/2+.12,m(-d/2+.2,-1.5)+2.55,-1.35],a.next(),J(12729134)),Br(n,[-d/2+.12,m(-d/2+.2,-1)+.4,-.9],[-d/2+.12,m(-d/2+.2,-1)+2.55,-.7],a.next(),J(12729134));let ne=d/2-.45,re=m(ne,-1.5);for(let e=0;e<3;e++)n.box(`wood`,ne-.2+e*.2,re+.9,-1.5,.19,.05,2,{grain:2,data:Y(a.next(),.7)});for(let e of[-2.4,-.6])for(let t of[ne-.25,ne+.25])n.box(`wood`,t,re+.43,e,.07,.9,.07,{grain:1,data:Y(a.next(),.8)});Or(n,ne,re+.925,-2.1,J(14211280),a.next()),jr(n,ne,re+.925,-1.2,{species:`mullet`,len:.4,ry:1.9,sag:.15,jaw:.2,wet:.6,cloudy:.6,seed:a.next()}),g(ne,re+.45,-1.5,.35,.45,1,{tag:`bench`});let ie=_t(10,8,(e,t)=>{let n=e/10,r=t/8,i=-.2+n*2.4,a=Math.sin(n*Math.PI)*.35*r;return{p:[-d/2+.16+Math.sin(n*12+r*3)*.03,y-.35-r*1.6+a*.3,i+Math.sin(r*5)*.05],n:[1,0,0],uv:[n*2.4,r*1.6]}});n.add(`net`,ie,new h,J(5208682),(e,t)=>[.3,Math.min(1,Math.max(0,(y-.35-t)/1.6))*.4,.04,0]);let ae=Cr(n,0,O-.25,.8,a.next());o.push({position:n.toWorld(ae[0],ae[1],ae[2]),color:ii.clone(),intensity:3,kind:`lantern`});for(let e of[-.55,1.25]){let t=f/2-.3,r=f/2+6.5,i=m(e,t),o=m(e,r);n.beam(`wood`,[e,i+.04,t],[e,o+.02,r],.14,.12,{data:Y(a.next(),.95)});for(let i of oi(t+.5,r-.3,5)){let t=m(e,i);n.box(`wood`,e+.35,t-.02,i,1.1,.09,.16,{grain:0,data:Y(a.next(),.95)})}}n.pop(),Yr(n,p(-d/2-.6,f/2-.3).x,m(-d/2-.6,f/2-.3),p(-d/2-.6,f/2-.3).z,5.5,J(3108784),a.next());{let e=p(-d/2-.6,f/2-.3);i.addCylinder(e.x,e.z,.08,m(-d/2-.6,f/2-.3)-.3,m(-d/2-.6,f/2-.3)+5.5,{tag:`flagpole`})}return{footprint:{x:c,z:l,r:Math.hypot(d,f)/2+1,kind:`building`}}}function mi(e,t){let{B:n,terrain:r,colliders:i,rand:a,lights:o,checks:s}=e,{x:c,z:l,yaw:u}=t,d=3.4,f=2.4,{toW:p,gAt:m}=ai(r,c,l,u),h=(e,t,n,r,a,o,s)=>{let c=p(e,n);i.addBox(ni.set(c.x,t,c.z),ri.set(r,a,o),u,s)};n.pushAt(c,0,l,u);let g=m(0,0),_=g+2.55;for(let e of[-3.4/2,d/2])for(let t of[-2.4/2,f/2]){let r=m(e,t);n.cyl(`wood`,e,r-.4,t,.065,.075,_-r+.45,{segs:7,data:Y(a.next(),.9)});let o=p(e,t);i.addCylinder(o.x,o.z,.1,r-.4,_,{tag:`stall`}),s.push({x:o.x,y:r-.4,z:o.z})}for(let e of[-2.4/2,f/2])n.rod(`wood`,[-3.4/2-.2,_,e],[1.9,_,e],.06,.06,{segs:6,data:Y(a.next(),.85)});let v=Math.tan(.62),y=2.2,b=1.7,x=1/2,S=_+.08,C=S+b*v,w=()=>[a.next(),.5,0,0],T=.2;n.slab(`thatch`,[Q(-2.2,S,b),Q(y,S,b),Q(x,C,0),Q(-.5,C,0)],T,{up:ti,uDir:Q(0,C-S,-1.7).normalize(),data:w()}),n.slab(`thatch`,[Q(y,S,-1.7),Q(-2.2,S,-1.7),Q(-.5,C,0),Q(x,C,0)],T,{up:ti,uDir:Q(0,C-S,b).normalize(),data:w()}),n.slab(`thatch`,[Q(y,S,b),Q(y,S,-1.7),Q(x,C,0)],T,{up:ti,uDir:Q(-1.7000000000000002,C-S,0).normalize(),data:w()}),n.slab(`thatch`,[Q(-2.2,S,-1.7),Q(-2.2,S,b),Q(-.5,C,0)],T,{up:ti,uDir:Q(1.7000000000000002,C-S,0).normalize(),data:w()}),n.rod(`thatch`,[-.55,C-.04,0],[.55,C-.04,0],.15,.15,{segs:7,data:[a.next(),.7,0,0]});let E=g+.92;for(let e=0;e<4;e++)n.box(`wood`,0,E,f/2-.55+e*.13-.2,3.1999999999999997,.045,.12,{grain:0,data:Y(a.next(),.75)});for(let e of[-1.45,d/2-.25])for(let t of[f/2-.3,f/2-.85])n.box(`wood`,e,g+.45,t,.07,.9,.07,{grain:1,data:Y(a.next(),.8)});n.box(`wood`,0,g+.5,f/2-.26,3.1,.6,.03,{grain:0,tint:J(5941152),data:[a.next(),.55,3,.7]}),h(0,g+.5,f/2-.55,d/2-.05,.5,.35,{tag:`stall`});let D=new gr(z(Math.floor(a.next()*4294967296)));for(let e=1;e<58;e++)a.next();let ee=[{bx:-1.05,bed:`ice`,fish:[[`redSnapper`,.4],[`redSnapper`,.36],[`yellowtail`,.36],[`redSnapper`,.38],[`yellowtail`,.34]]},{bx:0,bed:`leaf`,fish:[[`parrot`,.42],[`grunt`,.3],[`grunt`,.28],[`parrot`,.38],[`grunt`,.3]]},{bx:1.05,bed:`ice`,fish:[[`jack`,.4],[`mullet`,.36],[`jack`,.38]],lobsters:2}],O=f/2-.58;for(let e of ee){let{bx:t}=e;n.lathe(`wood`,t,E+.02,O,[[0,0],[.21,0],[.21,0],[.3,.16],[.315,.17],[.29,.165],[.2,.03],[0,.03]],{segs:14,tint:J(13215338),data:Y(D.next(),.2,0,5)});let r=E+.05,i=r;if(e.bed===`ice`)Mr(n,t,E+.12,O,.25,D.next()),i=E+.15;else{for(let e=0;e<4;e++){let i=e*Math.PI/2+D.range(-.3,.3);Nr(n,t+Math.cos(i)*.02,r+.004+e*.002,O+Math.sin(i)*.02,-i,.36,D.next(),.5)}i=r+.02}e.fish.forEach(([e,r],a)=>{let o=a*2.4+D.range(-.4,.4),s=D.range(0,.07);jr(n,t+Math.cos(o)*s,i+Math.floor(a/2)*.04,O+Math.sin(o)*s,{species:e,len:r,ry:o+(a%2?Math.PI:0)+D.range(-.3,.3),rx:D.range(-.12,.12),rz:D.range(-.1,.1),flip:D.chance(.3),sag:D.range(.35,.8)*(D.chance(.5)?1:-1),curl:D.range(-.25,.15),jaw:D.range(.15,.5),cloudy:D.range(.2,.6),blood:D.range(.3,1),seed:D.next()})});for(let r=0;r<(e.lobsters||0);r++){let e=r*Math.PI+.6;Pr(n,t+Math.cos(e)*.09,i+.07,O+Math.sin(e)*.1,e+Math.PI*.5,.26,D.next(),D.range(-.15,.15))}}for(let e of[-.52,.52]){Nr(n,e-.22,E+.025,.6,D.range(-.12,.12),.44,D.next());for(let t=0;t<3;t++)jr(n,e+D.range(-.04,.04),E+.035+t*.012,.56+t*.05,{species:D.pick([`grunt`,`yellowtail`,`mullet`]),len:D.range(.2,.26),ry:D.range(-.4,.4)+(t%2?Math.PI:0),sag:D.range(-.4,.4),jaw:D.range(.1,.4),seed:D.next()})}for(let[e,t,r,i]of[[-1.42,`mahi`,.9,`tail`],[-.9,`redSnapper`,.46,`gill`],[-.45,`grouper`,.62,`tail`],[.05,`barracuda`,.95,`tail`],[.52,`tuna`,.58,`tail`],[.95,`redSnapper`,.42,`gill`],[1.4,`yellowtail`,.4,`gill`]]){let a={species:t,len:r,pose:i,ry:D.range(-.15,.15),sag:D.range(-.2,.2),curl:D.range(-.25,.25),jaw:i===`tail`?D.range(.35,.6):D.range(.1,.3),cloudy:D.range(.2,.5),blood:D.range(.4,1),seed:D.next()};if(i===`tail`){let t=_-.2-D.range(0,.08);Fr(n,[e,_-.05,f/2],[e,t,f/2],D.next(),.012+r*.01),jr(n,e,t,f/2,a)}else jr(n,e,Ir(n,e,_,f/2,.06,D.next()),f/2,a)}let k=Cr(n,0,_-.02,-2.4/2,a.next());o.push({position:n.toWorld(k[0],k[1],k[2]),color:ii.clone(),intensity:3,kind:`lantern`}),n.pop();for(let[t,n]of[[-1.3,-.4],[-.7,-.6],[1.2,-.5]]){let r=p(t,n);e.inst.add(`crate`,r.x,m(t,n),r.z,u+a.range(-.3,.3),[a.range(.85,1.05),.95,.9])}return{footprint:{x:c,z:l,r:Math.hypot(d,f)/2+1.2,kind:`building`}}}function hi(e,t){let{B:n,terrain:r,colliders:i,rand:a,checks:o}=e,{x:s,z:c,yaw:l}=t,u=t.w??1.9,d=t.d??1.7,{toW:f,gAt:p}=ai(r,s,c,l),m=1/0,h=-1/0;for(let[e,t]of[[-1,-1],[1,-1],[1,1],[-1,1],[0,0]]){let n=p(e*u/2,t*d/2);m=Math.min(m,n),h=Math.max(h,n)}let g=h+.22,_=2.3,v=1.95,y=.05,b=t.wall||J(10135456),x=t.paint??.45,S=e=>[a.next(),x,e,.9];n.pushAt(s,0,c,l);for(let e of[-1,1])for(let t of[-1,1]){let r=e*(u/2-.05),i=t*(d/2-.05),s=p(r,i),c=g+(t>0?_:v);n.box(`wood`,r,(s-.3+c)/2,i,.1,c-s+.3,.1,{grain:1,data:Y(a.next(),.9)}),o.push({...f(r,i),y:s-.3})}let C=g-m+.1;n.box(`wood`,0,g-C/2+_/2,d/2-y/2,u,_+C,y,{grain:0,tint:b,data:S(2)}),n.box(`wood`,0,g-C/2+v/2,-d/2+y/2,u,v+C,y,{grain:0,tint:b,data:S(2)});for(let e of[-1,1]){let t=e*u/2,r=[Q(t,g-C,d/2-y),Q(t,g-C,-d/2+y),Q(t,g+v,-d/2+y),Q(t,g+_,d/2-y)];n.slab(`wood`,r,y,{up:Q(e,0,0),uDir:Q(0,0,-e),tint:b,data:S(2)})}let w=t.door||J(2981754);n.box(`wood`,.15,g+.92,d/2+.012,.8,1.8,.03,{grain:1,tint:w,data:[a.next(),.55,3,.8]}),n.beam(`wood`,[-.2,g+.25,d/2+.035],[.5,g+1.55,d/2+.035],.02,.1,{tint:w,data:[a.next(),.55,0,.8]});for(let e of[.3,1.5])n.box(`hard`,-.13,g+e,d/2+.03,.25,.04,.01,{tint:Z.iron,data:X(a.next(),.8,.5,.6)});let T=[Q(-u/2-.2,g+v+.02,-d/2-.25),Q(u/2+.2,g+v+.02,-d/2-.25),Q(u/2+.2,g+_+.08,d/2+.3),Q(-u/2-.2,g+_+.08,d/2+.3)];n.slab(`roofMetal`,T,.04,{up:ti,uDir:Q(0,.34999999999999987,d+.55).normalize(),tint:t.roof||J(9067072),data:[a.next(),.8,+!!t.galv,0]}),n.pop();let E=f(0,0);return i.addBox(ni.set(E.x,(m-.3+g+_)/2,E.z),ri.set(u/2+.05,(g+_-m+.3)/2,d/2+.05),l,{tag:`shed`}),{floorY:g,roofTop:g+_+.1,footprint:{x:s,z:c,r:Math.hypot(u,d)/2+.6,kind:`building`}}}var gi=new t,_i=new t;function vi(e,n,r={}){let{B:i,terrain:a,colliders:s,rand:c,lights:u,checks:d}=e,f=r.width??1.8,p=r.lift??.26,m=new l(n.map(e=>new t(e[0],0,e[1])),!1,`centripetal`),h=m.getLength(),g=.2,_=Math.floor(h/g),v=[];for(let e=0;e<=_;e++){let t=e/_,n=m.getPointAt(t),r=m.getTangentAt(t);r.y=0,r.normalize();let i=-r.z,o=r.x,s=-1/0,c=1/0;for(let e of[-f/2-.1,-f/4,0,f/4,f/2+.1]){let t=a.heightAt(n.x+i*e,n.z+o*e);s=Math.max(s,t),c=Math.min(c,t)}v.push({p:n,tan:r,nx:i,nz:o,g:s,gLow:c,yaw:Math.atan2(r.x,r.z)})}let y=v.map((e,t)=>{let n=-1/0;for(let e=Math.max(0,t-4);e<=Math.min(_,t+4);e++)n=Math.max(n,v[e].g);return n+p}).slice();for(let e=0;e<3;e++){let e=y.slice();for(let t=0;t<=_;t++){let n=0,r=0;for(let e=Math.max(0,t-6);e<=Math.min(_,t+6);e++)n+=y[e],r++;e[t]=Math.max(n/r,v[t].g+.12)}y=e}if(r.startY!==void 0)for(let e=0;e<=Math.min(_,12);e++){let t=e/12;y[e]=Math.max(v[e].g+.1,r.startY*(1-t)+y[e]*t)}for(let e=0;e<=_;e++){let t=v[e],n=y[Math.max(0,e-1)],r=(y[Math.min(_,e+1)]-n)/(g*(Math.min(_,e+1)-Math.max(0,e-1))),a=c.chance(.05);i.box(`wood`,t.p.x+c.range(-.02,.02)*t.nx,y[e]-.021-c.range(0,.005),t.p.z+c.range(-.02,.02)*t.nz,f+c.range(-.04,.03),.042,.182,{grain:0,skip:8,ry:t.yaw+c.range(-.01,.01),rx:-Math.atan(r),tint:a?[1.06,1,.93]:((e,t)=>[e*(1+t),e,e*(1-t)])(c.range(.86,1.08),c.range(-.01,.04)),data:Y(c.next(),a?.35:c.range(.6,1),0,7)})}for(let e=0;e<_;e+=6){let t=Math.min(_,e+6);for(let n of[-f/2+.18,f/2-.18]){let r=v[e],a=v[t];i.beam(`wood`,[r.p.x+r.nx*n,y[e]-.042-.07,r.p.z+r.nz*n],[a.p.x+a.nx*n,y[t]-.042-.07,a.p.z+a.nz*n],.08,.14,{extend:.06,data:Y(c.next(),.85)})}}for(let e=0;e<=_;e+=9){let t=v[e];for(let n of[-f/2+.18,f/2-.18]){let r=t.p.x+t.nx*n,o=t.p.z+t.nz*n,s=a.heightAt(r,o),l=y[e]-.18;l-s>-.05&&(i.box(`wood`,r,(l+s-.3)/2,o,.11,l-s+.3,.11,{grain:1,ry:t.yaw,data:Y(c.next(),.9)}),d.push({x:r,y:s-.3,z:o}))}}for(let e=0;e<_;e+=6){let t=Math.min(_,e+6);for(let n of[-1,1]){let r=n*(f/2+.01),a=v[e],o=v[t];i.beam(`wood`,[a.p.x+a.nx*r,y[e]-.1,a.p.z+a.nz*r],[o.p.x+o.nx*r,y[t]-.1,o.p.z+o.nz*r],.03,.12,{extend:.03,data:Y(c.next(),.8)})}}for(let e=0;e<_;e+=5){let t=Math.min(_,e+5),n=v[e],r=v[t],i=-1/0,a=1/0;for(let n=e;n<=t;n++)i=Math.max(i,y[n]),a=Math.min(a,v[n].gLow);let o=(n.p.x+r.p.x)/2,c=(n.p.z+r.p.z)/2,l=Math.hypot(r.p.x-n.p.x,r.p.z-n.p.z),u=a-.3;s.addBox(gi.set(o,(i+u)/2,c),_i.set(f/2,(i-u)/2,l/2+.02),Math.atan2(r.p.x-n.p.x,r.p.z-n.p.z),{walkable:!0,solid:!0,tag:`boardwalk`})}let b=r.lightEvery??60,x=1;for(let e=Math.floor(b*.4);e<_-10;e+=b){let t=v[e],n=x*(f/2+.2),r=t.p.x+t.nx*n,l=t.p.z+t.nz*n,p=a.heightAt(r,l),m=Er(i,r,p-.25,l,c.next());u.push({position:m,color:new o(1,.7,.4),intensity:2.5,kind:`pathLight`}),s.addCylinder(r,l,.1,p-.25,p+.95,{tag:`pathLight`}),d.push({x:r,y:p-.25,z:l}),x=-x}return{samples:v,deck:y,length:h,width:f}}var yi=pe.pier,bi=2.75,$={x:yi.x,zStart:yi.zStart,zEnd:yi.zEnd,deck:yi.deckHeight,width:yi.width,halfW:yi.width/2,headZ0:yi.zEnd-yi.headDepth,headX0:yi.x-yi.headWidth/2,headX1:yi.x+yi.headWidth/2,plankT:.055,pileR:.15,pileOff:yi.width/2+.17,stringerH:.22,capH:.26},xi=new t,Si=new t;function Ci({B:e,terrain:n,colliders:r,rand:i,lights:a,inst:s,signB:c=null,hang:l=null}){let u=$.x,d=$.deck,f=$.halfW,p=$.zStart,m=$.headZ0,h=$.zEnd,g=$.headX0,_=$.headX1,v=$.plankT,y=d-v,b=y-$.stringerH,x=b-$.capH,S=(e,t)=>n.heightAt(e,t),C=(e=.6,t=.95)=>Y(i.next(),i.range(e,t),0,0),w=()=>{let e=i.range(.84,1.1),t=i.next();t<.1?e*=i.range(.7,.82):t>.94&&(e*=i.range(1.1,1.2));let n=i.range(-.02,.06);return[e*(1+n),e,e*(1-n*1.2)]},T=()=>[i.range(1.04,1.1),i.range(.98,1.02),i.range(.9,.95)],E={lamps:[],bollards:[],hung:[]},D=(e,t,n,i,a,o,s)=>r.addBox(xi.set(e,t,n),Si.set(i,a,o),0,s),ee=(t,n,a,o={})=>{let s=S(t,n),c=s-1.5,l=o.r??$.pileR*i.range(.84,1.16),u=a>d,f=a-c,p=u?.008:.028,m=Y(i.next(),i.range(.8,1),0,0),h=i.range(-p,p),g=i.range(-p,p);if(e.cyl(`wood`,t,c,n,l*i.range(.86,.95),l*1.06,f,{segs:10,capTop:!u||!!o.flatTop,rx:h,rz:g,tint:w(),data:m}),!u&&i.chance(.18)&&a-s>2.5){let r=i.range(0,Math.PI*2),o=l+.08,u=t+Math.cos(r)*o,d=n+Math.sin(r)*o,f=Math.max(s-.5,c),p=a-i.range(.05,.4);e.cyl(`wood`,u,f,d,.075,.085,p-f,{segs:7,rx:i.range(-.01,.01),rz:i.range(-.01,.01),tint:T(),data:Y(i.next(),i.range(.2,.45),0,0)});for(let a of[.6,p-.3])a<f+.2||e.cyl(`hard`,(t+u)/2,a,(n+d)/2,.012,.012,o+.1,{segs:5,rx:Math.PI/2,ry:-r+Math.PI/2,tint:Z.iron,data:X(i.next(),.95,.4,.7)})}if(!u&&i.chance(.1)){let r=0+i.range(.7,1.4);for(let a=0;a<3;a++)e.torus(`rope`,t,r+a*.035,n,l+.02,.018,{rx:i.range(-.08,.08),radial:5,tubular:14,tint:i.chance(.5)?Z.rope:Z.ropeDark,data:[i.next(),.8,0,0]})}else!u&&i.chance(.05)&&e.torus(`hard`,t,0+i.range(.3,.9),n,l+.2,.1,{rx:i.range(-.25,.25),rz:i.range(-.2,.2),radial:6,tubular:14,tint:Z.rubber,data:X(i.next(),0,0,.85)});return u&&!o.flatTop&&e.cyl(`wood`,t,a,n,l*.5,l*.93,.07,{segs:10,tint:w(),data:m}),r.addCylinder(t,n,l+.02,c,a,{tag:`pile`}),{bottom:c,g:s}},O=(t,n,r,a)=>{e.cyl(`hard`,t,n,r,.022,.026,.022,{segs:5,rx:a*Math.PI/2,tint:Z.iron,data:X(i.next(),.85,.4,.6)})},k=(t,n,r,i)=>{let a=$.pileR+.05;for(let o of[-1,1]){e.box(`wood`,(n+r)/2,x+$.capH/2,t+o*a,r-n,$.capH,.09,{grain:0,tint:w(),data:C(.7,.95)});for(let e of i)O(e,x+$.capH/2,t+o*(a+.045),o)}D((n+r)/2,x+$.capH/2,t,(r-n)/2,$.capH/2,a+.05,{tag:`pierCap`})},A=(t,n,r,a)=>{let o=x-.12,s=Math.max(a+.35,o-4.2);if(o-s<.9)return;let c=$.pileR+.035,l=i.next(),u=()=>i.range(-.18,.18),d=()=>i.chance(.2)?{tint:T(),data:Y(i.next(),i.range(.25,.5),0,0)}:{tint:w(),data:C(.8,1)};l>.12&&e.beam(`wood`,[t,o+u(),r+c],[n,s+u(),r+c],.05,i.range(.17,.22),d()),l<.84&&e.beam(`wood`,[t,s+u(),r-c],[n,o+u(),r-c],.05,i.range(.17,.22),d()),i.chance(.25)&&e.beam(`wood`,[t-.1,s+.3,r+c+.05],[n+.1,s+.3+i.range(-.06,.06),r+c+.05],.05,.18,{tint:w(),data:C(.85,1)})},j=[],M=p+.35,te=m+.25,N=Math.round((te-M)/3);for(let e=0;e<=N;e++)j.push(M+e*(te-M)/N);let P=j.length-1,ne={"-1":[9,10,20],1:[14,15,26]},re=(e,t)=>t>=1&&t<P&&!ne[e].includes(t);for(let t=0;t<j.length;t++){let n=j[t];for(let e of[-1,1]){let r=u+e*$.pileOff,i=re(e,t)||re(e,t-1)||t===0||t===P,a=b;i?a=d+(t===0?3:.95):t%3==1&&(a=d+.45),ee(r,n,a,{flatTop:i&&t!==0,r:t===0?.17:void 0})}if(t!==P){k(n,u-$.pileOff-.3,u+$.pileOff+.3,[u-$.pileOff,u+$.pileOff]);let e=Math.min(S(u-$.pileOff,n),S(u+$.pileOff,n));A(u-$.pileOff,u+$.pileOff,n,e)}if(t<P&&t%2==0){let r=j[t+1];for(let t of[-1,1]){let a=u+t*($.pileOff+$.pileR+.03),o=Math.max(S(u+t*$.pileOff,n),S(u+t*$.pileOff,r)),s=x-.2,c=Math.max(o+.4,s-3.2);if(s-c>.9&&i.chance(.85)){let t=i.chance(.3);e.beam(`wood`,[a,t?c:s,n+.25+i.range(0,.2)],[a,t?s:c,r-.25-i.range(0,.2)],.05,i.range(.17,.22),{tint:w(),data:C(.8,1)})}}}}let ie=[-1.2,-.42,.42,1.2];for(let t=0;t<P;t++){let n=t===0?p+.02:j[t],r=j[t+1];for(let t of ie)e.box(`wood`,u+t,y-$.stringerH/2,(n+r)/2,.1,$.stringerH,r-n+.04,{grain:2,tint:w(),data:C(.7,.95)})}function ae(t,n,r,a){if(i.chance(a?.006:.012))return;let o=i.chance(.07),s=o?i.range(.25,.45):i.range(.55,1),c=o?T():w(),l=i.range(.198,.206),f=i.range(0,.014)+(i.chance(.08)?i.range(.006,.016):0),p=i.range(-.06,.05),m=i.range(-.05,.06),h=t-r/2+p,g=t+r/2+m,_=()=>({grain:0,ry:i.range(-.012,.012),rx:i.range(-.022,.022),rz:i.range(-.006,.006),tint:c}),y=e=>a?0:-(1+(u-e)),b=n+i.range(-.004,.004);if(!o&&i.chance(.05)){let t=i.range(h+.4,g-.4);e.box(`wood`,(h+t-.01)/2,d-v/2-f,b,t-h-.01,v,l,{..._(),data:Y(i.next(),s,y(h),7)}),e.box(`wood`,(t+.012+g)/2,d-v/2-f-.004,b+i.range(-.004,.004),g-t-.012,v,l*i.range(.92,1),{..._(),data:Y(i.next(),s,y(t+.012),7)});return}e.box(`wood`,(h+g)/2,d-v/2-f,b,g-h,v,l,{..._(),data:Y(i.next(),s,y(h),7)})}let oe=.215,se=Math.floor((m-p)/oe);for(let e=0;e<se;e++)ae(u,p+(e+.5)*(m-p)/se,$.width,!1);D(u,d-.04,(p+m)/2,f,.04,(m-p)/2,{walkable:!0,solid:!0,tag:`pierDeck`});let F=d+.95;for(let t=0;t<P;t++)for(let n of[-1,1]){if(!re(n,t))continue;let r=j[t],a=j[t+1],o=u+n*$.pileOff,s=a-r,c=i.chance(.12);e.box(`wood`,o+i.range(-.01,.01),F+.022+i.range(-.012,.01),(r+a)/2,.2,.045,s+.16,{grain:2,rx:i.range(-.006,.006),rz:i.range(-.01,.01),tint:c?T():w(),data:c?Y(i.next(),.3,0,0):C(.7,1)});let l=o-n*($.pileR+.03),f=i.next();if(f>.04){let t=f<.1?i.range(.15,.35):0,n=i.chance(.5);e.beam(`wood`,[l,d+.48+i.range(-.012,.012)-(n?t:0),r-.05],[l,d+.48+i.range(-.012,.012)-(n?0:t),a+.05],.05,.14,{tint:w(),data:C(.7,1)})}D(o,d+.55,(r+a)/2,.09,.55,s/2,{tag:`pierRail`})}for(let[t,n]of[[3,-1],[8,1],[13,-1],[18,1],[23,-1],[28,1]]){if(t>=P)continue;let s=u+n*(f-.1),c=j[t]+.32,p=l?wi(e,l,E,s,d,c,-n*Math.PI/2,3.1,i.next()):Tr(e,s,d,c,-n*Math.PI/2,3.1,i.next());a.push({position:p,color:new o(1,.72,.42),intensity:5,kind:`lantern`}),E.lamps.push(p),r.addCylinder(s,c,.1,d,d+3.2,{tag:`lampPost`})}{let n=j[0],r=d+bi,s=()=>Y(i.next(),.7,.6,0),f=J(15722972),p=J(3116940),m=J(14711391);e.box(`wood`,u,r,n,$.width+1.1,.24,.16,{grain:0,tint:f,data:s()}),e.box(`wood`,u,r+.2,n,$.width+1.35,.06,.22,{grain:0,tint:f,data:s()});for(let t of[-1,1])e.beam(`wood`,[u+t*($.pileOff-.12),r-.62,n],[u+t*($.pileOff-.62),r-.1,n],.1,.09,{tint:f,data:s()});let h=c||e,g=r-.52;E.signPivot=new t(u,r-.12,n+.02),h.box(`wood`,u,g,n+.02,1.9,.52,.05,{grain:0,tint:p,data:Y(i.next(),.6,.72,6)}),h.box(`wood`,u,g,n+.02,1.98,.6,.03,{grain:0,tint:f,data:s()});for(let e of[-.7,.7])h.rod(`hard`,[u+e,g+.26,n+.02],[u+e,r-.12,n+.02],.008,.008,{segs:4,tint:Z.iron,data:X(i.next(),.6,.6,.5)});for(let e of[1,-1]){let r=n+.02+e*.032,a=[];for(let e=0;e<14;e++){let n=e/14*Math.PI*2;a.push(new t(u-.1+Math.cos(n)*.5,g+Math.sin(n)*.17,r))}h.slab(`wood`,a,.01,{up:new t(0,0,e),uDir:new t(1,0,0),tint:m,data:Y(i.next(),.6,.75,0)}),h.slab(`wood`,[new t(u+.36,g,r),new t(u+.72,g+.2,r),new t(u+.66,g,r),new t(u+.72,g-.2,r)].slice(0,3),.01,{up:new t(0,0,e),tint:m,data:Y(i.next(),.6,.75,0)}),h.slab(`wood`,[new t(u+.36,g,r),new t(u+.66,g,r),new t(u+.72,g-.2,r)],.01,{up:new t(0,0,e),tint:m,data:Y(i.next(),.6,.75,0)}),h.cyl(`hard`,u-.42,g+.04,r+e*.006,.035,.035,.008,{segs:8,rx:e*Math.PI/2,tint:Z.black,data:X(i.next(),0,0,.4)})}for(let s of[-1,1]){let c=u+s*($.pileOff+.3),d=n-.07,f;if(l)e.torus(`hard`,c,r-.125,d,.02,.005,{rx:Math.PI/2,radial:3,tubular:6,tint:Z.iron,data:X(.5,.35,.5,.45)}),f=Ti(l,E,new t(c,r-.12,d),i.next(),.9,.1);else{let n=Cr(e,c,r-.12,d,i.next(),.9);f=new t(n[0],n[1],n[2])}a.push({position:f,color:new o(1,.72,.42),intensity:4,kind:`lantern`})}D(u,r,n,$.width/2+.6,.15,.1,{tag:`pierArch`})}{let n=d-S(u,p-.7),r=Math.max(2,Math.ceil(n/.22)),i=n/r,a=.32,o=(r-1)*a;for(let t=1;t<r;t++){let n=d-t*i,r=p-(t-.5)*a;for(let t of[-.078,.078])e.box(`wood`,u,n-.024,r+t,$.width-.1,.048,.15,{grain:0,tint:w(),data:C(.5,.9)});let o=S(u,r);D(u,(n+o-.4)/2,r,f,(n-o+.4)/2,.165,{walkable:!0,solid:!0,tag:`pierStep`})}for(let t of[-1,1]){let n=u+t*(f-.04),r=S(n,p-o-.2);e.beam(`wood`,[n,d-.12,p+.15],[n,r-.05,p-o-.25],.07,.26,{tint:w(),data:C(.7,.95)})}E.stepFoot=new t(u,S(u,p-o-.3),p-o-.3)}let I=[m+.25,(m+h)/2,h-.25],L=[];for(let e=0;e<5;e++)L.push(g+.3+e*(_-g-.6)/4);for(let e=0;e<3;e++){let t=I[e],n=[];for(let r=0;r<5;r++){let i=L[r];if(e===0&&r===2)continue;let a=(e===0||e===2||r===0)&&(r!==4||e!==1);ee(i,t,a?d+.95:b,{flatTop:a}),n.push(i)}e===0&&n.push(u-$.pileOff,u+$.pileOff),k(t,g-.08,_+.08,n);for(let n=0;n<4;n++){if(e===0&&(n===1||n===2))continue;let r=Math.min(S(L[n],t),S(L[n+1],t));A(L[n],L[n+1],t,r)}}for(let t=g+.25;t<_-.1;t+=.78)e.box(`wood`,t,y-$.stringerH/2,(m+h)/2,.1,$.stringerH,h-m-.05,{grain:2,tint:w(),data:C(.7,.95)});let R=Math.floor((h-m)/oe);for(let e=0;e<R;e++){let t=m+(e+.5)*(h-m)/R,n=[g],r=g+2.1+e%3*1.45;for(;r<_-1.2;)n.push(r),r+=4.35;n.push(_);for(let e=0;e<n.length-1;e++){let r=n[e]+.004,i=n[e+1]-.004;ae((r+i)/2,t,i-r-.1,!0)}}D(u,d-.04,(m+h)/2,(_-g)/2,.04,(h-m)/2,{walkable:!0,solid:!0,tag:`pierDeck`});let ce=(t,n,r,i)=>{let a=Math.hypot(r-t,i-n),o=Math.abs(r-t)>Math.abs(i-n),s=(t+r)/2,c=(n+i)/2;e.box(`wood`,s,F+.022,c,o?a+.16:.2,.045,o?.2:a+.16,{grain:o?0:2,tint:w(),data:C(.65,.9)}),e.box(`wood`,s,d+.48,c,o?a:.05,.14,o?.05:a,{grain:o?0:2,tint:w(),data:C(.65,.95)}),D(s,d+.55,c,o?a/2:.09,.55,o?.09:a/2,{tag:`pierRail`})};for(let e=0;e<4;e++)ce(L[e],I[2],L[e+1],I[2]);ce(L[0],I[0],L[0],I[1]),ce(L[0],I[1],L[0],I[2]),ce(L[0],I[0],L[1],I[0]),ce(L[1],I[0],u-$.pileOff,I[0]),ce(u+$.pileOff,I[0],L[3],I[0]),ce(L[3],I[0],L[4],I[0]);let z=_;for(let n of[34.3,38.7]){let a=z-.45;_r(e,a,d,n,i.next()),xr(e,a,d+.36,n,.155,null,i.next()),br(e,a-.75,d,n+(n<36?.35:-.35),.08,.3,4,i.next()),r.addCylinder(a,n,.22,d,d+.5,{tag:`bollard`}),E.bollards.push(new t(a,d+.45,n))}vr(e,z-.22,d,36.5,Math.PI/2,i.next()),E.bollards.push(new t(z-.22,d+.1,36.5));for(let t of[33.75,36,37.35,39.25])yr(e,z,d-.04,t,0,i.range(.65,.85),i.next());{let n=35.1,a=z+.07,o=d+.85,s=Z.galv,c=X(i.next(),.45,.85,.4);for(let r of[-1,1]){let i=n+r*.24;e.rod(`hard`,[a,-2.2,i],[a,o-.15,i],.024,.024,{segs:7,tint:s,data:c});let l=[];for(let e=0;e<=6;e++){let n=e/6*Math.PI;l.push(new t(a-.25+Math.cos(n)*.25,o-.15+Math.sin(n)*.15,i))}e.tube(`hard`,l,.024,{radial:6,tint:s,data:c}),e.rod(`hard`,[a-.5,o-.15,i],[a-.5,d,i],.024,.024,{segs:7,tint:s,data:c}),e.box(`hard`,a-.5,d+.004,i,.12,.008,.12,{tint:s,data:c}),e.box(`hard`,a-.1,x+.12,i,.2,.05,.03,{tint:s,data:c})}let l=[];for(let t=-1.9500000000000002;t<d-.1;t+=.3)e.rod(`hard`,[a,t,34.86],[a,t,35.34],.018,.018,{segs:6,tint:s,data:c}),l.push(t);for(let e of l)e<-.4||r.addBox(xi.set(a+.25,e-.15,n),Si.set(.27,.15,.3),0,{walkable:!0,solid:!1,tag:`ladder`});E.ladder=new t(a,d,n)}Dr(e,52.4,d,h-.95,0,1.7,i.next()),D(52.4,d+.45,h-1,.85,.45,.3,{tag:`bench`}),Sr(e,55.8,d+.58,I[2]+.12,0,i.next()),Lr(e,58.3,d,h-.9,0,i.next()),D(58.3,d+.45,h-.9,.7,.45,.35,{tag:`table`}),Or(e,59.3,d,h-.75,Z.blue,i.next());for(let[t,n]of[[56.55,.35],[56.9,.28]]){let r=[t,d+.01,I[2]-.25],a=[t+.25,d+2.6,I[2]+2.6*Math.tan(n)];e.rod(`hard`,r,a,.016,.005,{segs:5,tint:J(2763306),data:X(i.next(),0,.3,.35)}),e.cyl(`hard`,t+.02,d+.35,I[2]-.18,.04,.04,.05,{segs:8,rz:Math.PI/2,capBot:!0,tint:Z.galv,data:X(i.next(),0,.8,.35)})}let le=(e,t,n,r)=>s.add(`crate`,e,t,n,r,[i.range(.85,1.1),i.range(.85,1.05),i.range(.82,1)]);le(49.25,d,34.35,.05),le(49.25,d,34.8,-.04),le(49.95,d,34.55,1.57),le(49.3,d+.4,34.55,.2),D(49.55,d+.4,34.6,.55,.4,.45,{tag:`crates`});let ue=(e,t,n,r)=>s.add(`trap`,e,t,n,r,[i.range(.85,1.05),i.range(.85,1),i.range(.8,.95)]);ue(50.1,d,38.55,.02),ue(50.1,d,39.1,-.03),ue(51.05,d,38.6,.05),ue(50.3,d+.31,38.8,.12),ue(50.5,d+.31,38.75,1.2),D(50.55,d+.35,38.8,.75,.35,.5,{tag:`traps`}),s.add(`barrel`,48.75,d,36.1,.3,[.9,.85,.8]),s.add(`barrel`,49.4,d,36.75,1.1,[1.05,1,.95]),r.addCylinder(48.75,36.1,.32,d,d+.9,{tag:`barrel`}),r.addCylinder(49.4,36.75,.32,d,d+.9,{tag:`barrel`}),zr(e,[g+.12,F+.02,34],[g+.12,F+.02,35.9],4,i,.22),zr(e,[g+.12,F+.02,37.1],[g+.12,F+.02,38.9],3,i,.18);for(let[t,n,s]of[[g+.55,h-.55,3*Math.PI/4],[_-.6,h-.55,-3*Math.PI/4],[g+.55,m+.6,Math.PI/4]]){let c=l?wi(e,l,E,t,d,n,s,3.1,i.next()):Tr(e,t,d,n,s,3.1,i.next());a.push({position:c,color:new o(1,.72,.42),intensity:5,kind:`lantern`}),E.lamps.push(c),r.addCylinder(t,n,.1,d,d+3.2,{tag:`lampPost`})}Or(e,u+.9,d,-21.3,Z.white,i.next()),Or(e,u-.95,d,12.6,Z.orange,i.next()),br(e,u+.85,d,-33,.07,.24,3,i.next(),Z.ropeDark),br(e,u-.85,d,21.5,.06,.22,4,i.next());for(let[t,n]of[[-47.3,1],[-15.4,-1],[27.8,1]]){let r=u+n*(f-.18);vr(e,r,d,t,0,i.next()),xr(e,r,d+.06,t,.08,[u+n*(f+.35),d-1.4,t+i.range(-.4,.4)],i.next())}return s.add(`crate`,u-.95,d,-3.1,1.4,[.9,.85,.8]),s.add(`crate`,u-.92,d+.4,-3.05,1.2,[1,.95,.9]),r.addBox(xi.set(u-.95,d+.4,-3.1),Si.set(.3,.4,.35),0,{tag:`crate`}),s.add(`trap`,u+.8,d,30.4,.05,[.9,.9,.85]),r.addBox(xi.set(u+.8,d+.25,30.4),Si.set(.48,.3,.28),.05,{tag:`trap`}),br(e,u-.8,d,4.5,.07,.26,4,i.next(),Z.ropeBlue),s.add(`crate`,u+.95,d,-40.2,.1,[1,.95,.9]),r.addBox(xi.set(u+.95,d+.2,-40.2),Si.set(.33,.2,.24),.1,{tag:`crate`}),E}function wi(e,t,n,r,i,a,o,s,c){let l=Y(c,.75,.62,0),u=J(14077885);e.box(`wood`,r,i+s/2,a,.14,s,.14,{grain:1,tint:u,data:l}),e.box(`wood`,r,i+s+.03,a,.18,.06,.18,{grain:0,tint:u,data:l}),e.pushAt(r,i,a,o);let d=Z.iron,f=X(c,.35,.5,.45),p=s-.18;e.box(`hard`,0,p,.35,.035,.035,.62,{tint:d,data:f}),e.rod(`hard`,[0,p-.35,.075],[0,p-.01,.4],.012,.012,{segs:5,tint:d,data:f}),e.torus(`hard`,0,p-.08,.2,.08,.008,{ry:Math.PI/2,rz:Math.PI/2,radial:3,tubular:8,tint:d,data:f}),e.torus(`hard`,0,p-.03,.6,.014,.004,{ry:Math.PI/2,radial:3,tubular:6,tint:d,data:f});let m=e.toWorld(0,p-.04,.6);return e.pop(),Ti(t,n,m,c,1,.16)}function Ti(e,n,r,i,a,o){let s=e(),c=Z.iron,l=X(i,.3,.55,.45),u=.03,d=Math.max(2,Math.round(o/u));for(let e=0;e<d;e++)s.torus(`hard`,r.x,r.y-.012-e*u,r.z,.012,.0032,{ry:e%2?Math.PI/2:0,radial:3,tubular:6,tint:c,data:l});let f=Cr(s,r.x,r.y-d*u,r.z,i,a),p=new t(f[0],f[1],f[2]);return n.hung.push({B:s,pivot:r.clone(),rest:p.clone(),live:p}),p}var Ei={turquoise:J(6143152),coral:J(15502198),cream:J(15721154),sky:J(9224928),yellow:J(15781756),mint:J(11132095),pink:J(15905706),white:J(15855074),lavender:J(12432346),sea:J(6989496)},Di={white:J(15986662),cream:J(15327174),navy:J(3034995),teal:J(2981754),red:J(11028026),green:J(5012812),yellow:J(14726469),blue:J(4159918)},Oi={red:J(10897973),green:J(6261354),blue:J(5208216),teal:J(4164230),rust:J(9067072),grey:J(9212566)},ki=[J(15259312),J(14257274),J(10272984),J(15788248),J(13228186)],Ai=new e,ji=class{constructor({scene:e,terrain:t,colliders:n}){this.scene=e,this.terrain=t,this.colliders=n,this.lights=[],this.footprints=[],this.foundationChecks=[],this.buildings=[],this.group=new b,this.group.name=`Village`;let r=new gr(z(90210));this.rand=r,this.textures=new zt,this.materials=tn(this.textures),this.B=new jt,this.harbor=this.B,this.town=this.B,this.inst=new ei(this.B);let i=this._layout(r);this._flattenPads(i);let a=e=>({B:e,terrain:t,colliders:n,rand:r,lights:this.lights,inst:this.inst,checks:this.foundationChecks});this.signB=new jt,this.pierInfo=Ci({B:this.harbor,terrain:t,colliders:n,rand:r,lights:this.lights,inst:this.inst,signB:this.signB,hang:()=>new jt});let o=this.pierInfo.stepFoot;this.path=vi(a(this.harbor),[[o.x,o.z+.05],[54.6,-72],[52.4,-82],[48.4,-92],[44.8,-100.5],[42.6,-107.2]],{width:1.8,startY:o.y+.24,lightEvery:70}),this._plaza(a(this.town));for(let e of i.houses){let t=a(e.harbor?this.harbor:this.town);e.seed!==void 0&&(t.rand=new gr(z(e.seed)));let n=di(t,e);this.buildings.push({name:e.name,stories:e.stories||1,x:e.x,z:e.z,floorY:n.floorY,roofTop:n.roofTop,stilts:e.foundation===`stilts`,footprint:n.footprint}),this.footprints.push(n.footprint)}for(let e of i.sheds){let t=hi(a(this.town),e);this.buildings.push({name:e.name,x:e.x,z:e.z,floorY:t.floorY,roofTop:t.roofTop,stilts:!1,footprint:t.footprint}),this.footprints.push(t.footprint)}this.sidePaths=[vi(a(this.town),[[36.8,-110.6],[32,-109.3],[27.4,-107.6]],{width:1.1,lift:.2,lightEvery:1e9}),vi(a(this.town),[[46.8,-97.8],[53.5,-98.5],[61.7,-99.1]],{width:1.1,lift:.2,lightEvery:1e9})],this.footprints.push(pi(a(this.harbor),i.boathouse).footprint),this.footprints.push(mi(a(this.town),i.stall).footprint),this._beachProps(a(this.harbor)),this._villageProps(a(this.town)),this._assemble(),this._buildSign(),this._buildLanterns(),e.add(this.group)}_layout(e){let t=Ei,n=Di,r=Oi,i=()=>e.pick(ki),a=[{name:`A`,x:13.5,z:-106.5,yaw:.12,w:6.2,d:5,roof:`gable`,roofMat:`metal`,roofColor:r.red,wall:t.turquoise,trim:n.white,accent:n.navy,siding:1,porch:{depth:2.1,rail:`balusters`},paint:.62,stovepipe:!0,buoys:-1,porchPaint:J(9083552)},{name:`B`,x:26.5,z:-112,yaw:-.08,w:5.2,d:4.5,roof:`hip`,roofMat:`thatch`,wall:t.coral,trim:n.cream,accent:n.teal,siding:2,shutters:`bahama`,paint:.55,thatchAge:.35,annex:{w:3,d:2,wall:J(15721154)}},{name:`C`,x:62.5,z:-106,yaw:-.1,w:7,d:5.8,stories:2,roof:`gableFront`,roofMat:`metal`,galv:!0,rust:.55,wall:t.cream,trim:n.white,accent:n.blue,siding:1,porch:{depth:2.2,rail:`x`},paint:.7,antenna:!0,tank:1,doorGlass:!0},{name:`D`,x:79,z:-110.5,yaw:-.18,w:6,d:5,roof:`gable`,roofMat:`metal`,roofColor:r.green,wall:t.sky,trim:n.white,accent:n.yellow,siding:2,porch:{depth:1.9,width:4.4,offset:-.6,rail:`balusters`},doorX:-.6,paint:.66,gutter:!0,woodpile:1},{name:`E`,x:96,z:-115.5,yaw:-.3,w:5.4,d:4.6,roof:`hip`,roofMat:`metal`,roofColor:r.teal,wall:t.yellow,trim:n.white,accent:n.green,siding:1,shutters:`louver`,paint:.58,buoys:1,annex:{w:3.2,d:2}},{name:`F`,x:-3,z:-125,yaw:.22,w:5.6,d:5,roof:`gableFront`,roofMat:`thatch`,wall:t.mint,trim:n.white,accent:n.red,siding:2,porch:{depth:1.9,rail:`x`},paint:.5,thatchAge:.55,shutters:`board`},{name:`G`,x:16.5,z:-130,yaw:.1,w:6.6,d:5.6,stories:2,roof:`gable`,roofMat:`metal`,roofColor:r.blue,wall:t.pink,trim:n.white,accent:n.teal,siding:1,porch:{depth:2.2,rail:`balusters`},paint:.72,chimney:-1,doorGlass:!0},{name:`H`,x:57.5,z:-128.5,yaw:-.05,w:6,d:5.2,roof:`gableFront`,roofMat:`thatch`,wall:t.turquoise,trim:n.cream,accent:n.yellow,siding:2,porch:{depth:2,rail:`x`},paint:.55,thatchAge:.3,shutters:`board`,woodpile:-1,annex:{w:3.4,d:2.2,x:.6,wall:J(9224928)}},{name:`I`,x:75.5,z:-132.5,yaw:-.2,w:5.4,d:4.6,roof:`gable`,roofMat:`metal`,roofColor:r.red,rust:.6,wall:t.cream,trim:n.red,accent:n.red,siding:1,paint:.6,tank:-1,stovepipe:!0},{name:`J`,x:96.5,z:-135,yaw:-.32,w:6.2,d:5,roof:`hip`,roofMat:`metal`,roofColor:r.grey,galv:!0,rust:.7,wall:t.sky,trim:n.white,accent:n.navy,siding:2,porch:{depth:1.9,rail:`balusters`},paint:.6,annex:{w:3.6,d:2,x:-.8}},{name:`K`,x:3.5,z:-151,yaw:.18,w:6,d:5.2,roof:`gable`,roofMat:`metal`,roofColor:r.green,wall:t.yellow,trim:n.white,accent:n.blue,siding:1,porch:{depth:2,rail:`x`},paint:.64,gutter:!0},{name:`L`,x:30.5,z:-149,yaw:.04,w:7.4,d:5.6,stories:2,roof:`hip`,roofMat:`metal`,roofColor:r.red,wall:t.white,trim:n.white,accent:n.green,siding:1,porch:{depth:2.3,rail:`balusters`},paint:.78,antenna:!0,chimney:1,doorGlass:!0},{name:`M`,x:55,z:-152.5,yaw:-.06,w:5.2,d:4.8,roof:`gableFront`,roofMat:`thatch`,wall:t.coral,trim:n.white,accent:n.teal,siding:1,paint:.52,thatchAge:.45,shutters:`bahama`,annex:{w:3,d:1.8}},{name:`N`,x:78.5,z:-156,yaw:-.22,w:6,d:5,roof:`gable`,roofMat:`metal`,roofColor:r.teal,wall:t.lavender,trim:n.white,accent:n.navy,siding:2,porch:{depth:1.9,rail:`balusters`},paint:.62,tank:1}],o=[{name:`S1`,harbor:!0,x:67.8,z:-64.6,yaw:.05,w:4,d:4.2,floorY:3,foundation:`stilts`,roof:`gableFront`,roofMat:`metal`,roofColor:Oi.rust,rust:.8,wall:t.sea,trim:n.white,accent:n.red,siding:2,paint:.52,weather:.85,porch:{depth:1.6,rail:`x`},shutters:`board`,closedChance:.3,fewWindows:!0,rimRaw:!0,buoys:1,porchBench:!1,railNet:J(4157279)},{name:`S2`,harbor:!0,x:79.8,z:-70.4,yaw:-.12,w:4.4,d:4,floorY:3.05,foundation:`stilts`,roof:`gableFront`,roofMat:`thatch`,thatchAge:.6,wall:t.coral,trim:n.cream,accent:n.teal,siding:2,paint:.48,weather:.9,porch:{depth:1.6,rail:`x`},shutters:`board`,closedChance:.25,fewWindows:!0,rimRaw:!0,porchBench:!1,railNet:J(10111544)},{name:`S3`,harbor:!0,x:37.2,z:-72.4,yaw:.18,w:4,d:4,floorY:3.15,foundation:`stilts`,roof:`gable`,roofMat:`thatch`,thatchAge:.5,wall:t.yellow,trim:n.white,accent:n.blue,siding:2,paint:.5,weather:.85,porch:{depth:1.6,rail:`x`},shutters:`board`,closedChance:.2,fewWindows:!0,rimRaw:!0,buoys:-1,porchBench:!1}];for(let t of[...a,...o])t.curtain=t.curtain||i(),t.foundation===void 0&&(t.foundation=e.chance(.5)?`stone`:`posts`),t.foundation===`stone`&&(t.stoneStyle=+!!e.chance(.6));let s=[{name:`shed1`,x:21.5,z:-119.5,yaw:.1,wall:J(12175792),door:Di.red},{name:`shed2`,x:68,z:-124,yaw:-.2,wall:J(14203040),door:Di.teal,galv:!0},{name:`shed3`,x:89,z:-146,yaw:-.3,wall:J(11060436),door:Di.yellow},{name:`shed4`,x:43.5,z:-155.5,yaw:0,wall:J(15259816),door:Di.blue}],c={name:`fiveStory`,seed:90211,x:62,z:-178,yaw:-.06,w:10,d:8,stories:5,storyH:2.75,clearance:.55,foundation:`stone`,stoneStyle:1,wall:t.turquoise,trim:n.white,accent:n.navy,curtain:ki[0],siding:1,shutters:`louver`,roof:`hip`,roofMat:`metal`,roofColor:r.red,rust:.4,paint:.68,weather:.65,doorGlass:!0,porch:{depth:2.2,width:10,rail:`balusters`}};return{houses:[...a,...o,c],sheds:s,boathouse:{x:92.5,z:-57.5,yaw:-.08,wall:J(9417640),paint:.58},stall:{x:40.2,z:-113.2,yaw:.05}}}_flattenPads(e){let t=this.terrain;if(typeof t.flatten==`function`){for(let n of e.houses){if(n.foundation===`stilts`)continue;let e=n.porch?n.porch.depth:1,r=Math.cos(n.yaw),i=Math.sin(n.yaw),a=e/2,o=n.x+a*i,s=n.z+a*r,c=0,l=0;for(let r=-2;r<=2;r++)for(let i=-2;i<=2;i++)c+=t.heightAt(o+r*n.w/5,s+i*(n.d+e)/5),l++;let u=Math.hypot(n.w,n.d+e)/2+.3;t.flatten(o,s,u,c/l,3.5)}{let e=41.5,n=-111,r=0,i=0;for(let a=-2;a<=2;a++)for(let o=-2;o<=2;o++)r+=t.heightAt(e+a,n+o),i++;t.flatten(e,n,5.5,r/i,4)}typeof t.buildMinMax==`function`&&t.buildMinMax()}}_plaza(e){let{B:n,terrain:r,colliders:i,rand:a,lights:s}=e,c=(e,t)=>r.heightAt(e,t);Dr(n,36.2,c(36.2,-108.2),-108.2,.9,1.6,a.next(),J(5214112)),i.addBox(new t(36.2,c(36.2,-108.2)+.45,-108.2),new t(.85,.45,.3),.9,{tag:`bench`}),Dr(n,45.8,c(45.8,-108.6),-108.6,-.85,1.6,a.next(),J(11557445)),i.addBox(new t(45.8,c(45.8,-108.6)+.45,-108.6),new t(.85,.45,.3),-.85,{tag:`bench`});let l=Tr(n,44.3,c(44.3,-106.2),-106.2,-2.4,3.3,a.next());s.push({position:l,color:new o(1,.72,.42),intensity:5,kind:`lantern`}),i.addCylinder(44.3,-106.2,.1,c(44.3,-106.2),c(44.3,-106.2)+3.4,{tag:`lampPost`}),this.foundationChecks.push({x:44.3,y:c(44.3,-106.2),z:-106.2});for(let[e,t]of[[37.4,-115.6],[38.1,-116.1]])this.inst.add(`barrel`,e,c(e,t)-.02,t,a.range(0,6),[a.range(.85,1.05),.92,.85]),i.addCylinder(e,t,.32,c(e,t),c(e,t)+.9,{tag:`barrel`});this.footprints.push({x:41.5,z:-111,r:6,kind:`plaza`})}_beachProps(e){let{B:n,terrain:r,colliders:i,rand:a}=e,o=(e,t)=>r.heightAt(e,t),s=(e,n,r,a,o,s,c,l)=>i.addBox(new t(e,n,r),new t(a,o,s),c,{tag:l}),c=[{x:20.799999999999997,z:-57.2,ry:.35,up:!0,hull:J(3116954),bottom:J(10502190)},{x:17.9,z:-59.8,ry:.55,up:!0,hull:J(15328470),bottom:J(3039110)},{x:63.5,z:-55.6,ry:-.35,up:!1,hull:J(14205786),bottom:J(4091738),rz:.14}];for(let e of c){let t=o(e.x,e.z);Hr(n,e.x,t+(e.up?0:.05),e.z,e.ry,{upsideDown:e.up,seed:a.next(),hull:e.hull,bottom:e.bottom,trim:Z.white,rz:e.rz||0}),s(e.x,t+.4,e.z,.72,.45,2,e.ry,`rowboat`),this.footprints.push({x:e.x,z:e.z,r:2.4,kind:`prop`})}{let e=84.6,t=-53.2,r=o(e,t);Hr(n,e,r+.03,t,.45,{seed:a.next(),hull:J(13690090),bottom:J(11553328),trim:J(3104634),rz:-.16,oars:!1}),s(e,r+.4,t,.72,.45,2,.45,`rowboat`),this.footprints.push({x:e,z:t,r:2.4,kind:`prop`});let i=102.5,c=-49.8;Ur(n,i,o(i,c)-.12,c,.95,a,{rz:.22,beam:3.1,depth:1.05}),s(i,o(i,c)+.4,c,1.3,.6,3.6,.95,`wreck`),this.footprints.push({x:i,z:c,r:4,kind:`prop`})}Br(n,[22.1,o(22.1,-55.7)+.03,-55.7],[23.6,o(23.6,-57.9)+.05,-57.9],a.next(),J(12729134)),Br(n,[22.4,o(22.4,-55.4)+.03,-55.4],[23.9,o(23.9,-57.6)+.06,-57.6],a.next(),J(12729134));let l=[[41.8,-64.2,.25,J(4157279)],[74.6,-58.6,-.12,J(3104650)],[86.4,-64,.3,J(11556154)]];for(let[e,t,r,s]of l){let c=Math.cos(r),l=Math.sin(r);Wr(n,e,o(e,t),t,r,3.2,s,a.next(),(n,r)=>o(e+n*c+r*l,t-n*l+r*c));for(let n of[-1.6,1.6]){let r=e+n*c,a=t-n*l;i.addCylinder(r,a,.1,o(r,a)-.4,o(r,a)+2,{tag:`rack`}),this.foundationChecks.push({x:r,y:o(r,a)-.4,z:a})}this.footprints.push({x:e,z:t,r:2.2,kind:`prop`})}Gr(n,73.8,o(73.8,-69.5),-69.5,.2,2.6,a.next(),a),s(73.8,o(73.8,-69.5)+1,-69.5,1.45,1,.75,.2,`rack`),this.foundationChecks.push({x:73.8,y:o(73.8,-69.5)-.2,z:-69.5});let u=$.x;(e=>{for(let[t,n,r,c,l]of e){let e=o(n,r),u=e+(l||0)-.02,d=[a.range(.82,1.08),a.range(.84,1.02),a.range(.8,.98)];this.inst.add(t,n,u,r,c,d),l||(t===`barrel`?i.addCylinder(n,r,.32,e,e+.9,{tag:`barrel`}):s(n,e+.25,r,t===`trap`?.48:.33,.3,t===`trap`?.28:.24,c,t))}})([[`barrel`,u+2.4,-62.4,.4],[`barrel`,u+3.05,-62.9,1.9],[`crate`,u+2.6,-61.2,.1],[`crate`,u+2.65,-61.25,.4,.4],[`trap`,u-2.6,-61,.05],[`trap`,u-2.65,-61.6,.08],[`trap`,u-2.6,-61.3,.2,.31],[`crate`,u-3.4,-62.4,.6],[`trap`,64.5,-61.6,.3],[`trap`,65.3,-61.2,.15],[`trap`,64.9,-61.4,.5,.31],[`trap`,64.6,-61.5,1.9,.62],[`barrel`,71.3,-62.3,.1],[`crate`,71.1,-61.2,.3],[`crate`,71.9,-61.4,1.3],[`trap`,83.2,-67.4,.4],[`trap`,83.9,-67.9,.2],[`barrel`,82.6,-68.9,.7],[`crate`,88,-53,.2],[`crate`,88.1,-53,.6,.4],[`barrel`,89,-52.2,.3],[`trap`,34.6,-68.6,.3],[`trap`,35.3,-68.2,.1],[`crate`,39.6,-68.9,.5]]);let d=[[Z.orange,Z.white],[Z.red,Z.white],[Z.yellow,Z.black],[Z.white,Z.blue]];for(let[e,t]of[[60.8,-60.3],[61.3,-60.9],[66.2,-58.4],[89.6,-51.2],[45.2,-62.3]]){let[r,i]=a.pick(d);Rr(n,e,o(e,t)-.02,t,r,i,a.chance(.5)?0:2,a.next(),{rz:1.4,ry:a.range(0,6)})}br(n,59.6,o(59.6,-59.2),-59.2,.08,.34,5,a.next()),br(n,90.4,o(90.4,-52.4),-52.4,.08,.28,4,a.next(),Z.ropeBlue);for(let e=0;e<5;e++){let r=57.8+e*1.6,s=-67.8-e*.25;if(n.cyl(`wood`,r,o(r,s)-.4,s,.06,.07,1.65,{segs:6,data:Y(a.next(),.95)}),i.addCylinder(r,s,.08,o(r,s)-.4,o(r,s)+1.25,{tag:`post`}),this.foundationChecks.push({x:r,y:o(r,s)-.4,z:s}),e>0){let i=57.8+(e-1)*1.6,c=-67.8-(e-1)*.25;n.tube(`rope`,[new t(i,o(i,c)+1.15,c),new t((i+r)/2,(o(i,c)+o(r,s))/2+.95,(c+s)/2),new t(r,o(r,s)+1.15,s)],.014,{radial:4,tint:Z.rope,data:[a.next(),0,0,0]})}}}_villageProps(e){let{B:n,terrain:r,colliders:i,rand:a,lights:s}=e,c=(e,t)=>r.heightAt(e,t),l=(e,r,o)=>{Kr(n,e,c,r,o,a.next(),i,(e,n)=>new t(e,0,n));for(let[t,n]of e)this.foundationChecks.push({x:t,y:c(t,n)-.13,z:n})};l([[5.2,-101.5],[5.6,-108.5],[9,-111.2]],`picket`,Di.white),l([[21.5,-124],[23.6,-131.5],[22.8,-135.5]],`rail`),l([[70,-102.5],[72.5,-106]],`picket`,Di.cream),l([[86.5,-150],[87.8,-158.5]],`rail`);let u=[J(15921386),J(14242634),J(5214144),J(15779920),J(8372127),J(15243952)],d=(e,t)=>(n.cyl(`wood`,e,c(e,t)-.3,t,.04,.05,2.5,{segs:6,data:Y(a.next(),.9)}),i.addCylinder(e,t,.06,c(e,t)-.3,c(e,t)+2.2,{tag:`pole`}),this.foundationChecks.push({x:e,y:c(e,t)-.3,z:t}),[e,c(e,t)+2.1,t]);Xr(n,d(7.8,-112.8),d(12.6,-114.6),a,u),Xr(n,d(21,-136.8),d(25.2,-137.6),a,u),Xr(n,d(83.2,-138.2),d(87.4,-140),a,u),Gr(n,67,c(67,-118.5),-118.5,-.25,2.4,a.next(),a),i.addBox(new t(67,c(67,-118.5)+1,-118.5),new t(1.35,1,.75),-.25,{tag:`rack`}),this.foundationChecks.push({x:67,y:c(67,-118.5)-.2,z:-118.5}),Wr(n,5.5,c(5.5,-136.5),-136.5,.35,3,J(6969994),a.next(),(e,t)=>c(5.5+e*Math.cos(.35)+t*Math.sin(.35),-136.5-e*Math.sin(.35)+t*Math.cos(.35)));for(let e of[-1.5,1.5]){let t=5.5+e*Math.cos(.35),n=-136.5-e*Math.sin(.35);i.addCylinder(t,n,.1,c(t,n)-.4,c(t,n)+2,{tag:`rack`}),this.foundationChecks.push({x:t,y:c(t,n)-.4,z:n})}for(let[e,n,r,o,s]of[[`barrel`,20.4,-105.2,.3],[`crate`,21.2,-104.6,.8],[`crate`,21.25,-104.65,1.1,.4],[`trap`,69.2,-110.8,.2],[`trap`,69.3,-111.4,.1],[`trap`,69.25,-111.1,.3,.31],[`barrel`,86.6,-118.8,.2],[`crate`,85.9,-119.6,.4],[`crate`,64.6,-134.2,.3],[`barrel`,63.9,-133.4,1],[`trap`,47.9,-150.2,.6],[`trap`,48.2,-150.8,.4],[`barrel`,25.4,-157.4,.5],[`barrel`,26.1,-157.8,1.5],[`crate`,9.8,-145.4,.2],[`crate`,91.6,-128.5,.9]]){let l=c(n,r);this.inst.add(e,n,l+(s||0)-.02,r,o,[a.range(.82,1.08),a.range(.84,1.02),a.range(.8,.98)]),s||(e===`barrel`?i.addCylinder(n,r,.32,l,l+.9,{tag:`barrel`}):i.addBox(new t(n,l+.25,r),new t(e===`trap`?.48:.33,.3,e===`trap`?.28:.24),o,{tag:e}))}Hr(n,88.2,c(88.2,-124.5)+.55,-124.5,1.2,{upsideDown:!0,seed:a.next(),hull:J(13190714),bottom:J(2960685),trim:Z.white});for(let e of[-1.2,1.2]){let t=88.2+e*Math.sin(1.2),r=-124.5+e*Math.cos(1.2);n.box(`wood`,t,c(t,r)+.26,r,1.1,.07,.09,{grain:0,ry:1.2+Math.PI/2,data:Y(a.next(),.85)});for(let e of[-.4,.4]){let i=t+e*Math.cos(1.2+Math.PI/2),o=r-e*Math.sin(1.2+Math.PI/2);n.box(`wood`,i,c(i,o)+.08,o,.07,.5,.07,{grain:1,data:Y(a.next(),.85)})}}i.addBox(new t(88.2,c(88.2,-124.5)+.6,-124.5),new t(.75,.6,2),1.2,{tag:`rowboat`}),this.foundationChecks.push({x:88.2,y:c(88.2,-124.5)-.17,z:-124.5}),Or(n,86.9,c(86.9,-122.6),-122.6,Z.blue,a.next());for(let[e,t]of[[33.5,-125.5],[48,-130.5],[42,-142]]){let r=Er(n,e,c(e,t)-.25,t,a.next());s.push({position:r,color:new o(1,.7,.4),intensity:2.5,kind:`pathLight`}),i.addCylinder(e,t,.1,c(e,t)-.25,c(e,t)+.95,{tag:`pathLight`}),this.foundationChecks.push({x:e,y:c(e,t)-.25,z:t})}}_assemble(){let e=this.B,t=this.materials,n=t=>{let n=e.batches[t];return delete e.batches[t],n},r=e.batch(`wood`),i=e.batch(`hard`),a=e.batch(`fabric`),o=n(`glass`),s=n(`rope`),c=n(`cloth`),l=n(`net`),u=n(`flag`);o&&r.append(o,e=>[e[0],e[1],9,e[2]]),s&&i.append(s,e=>[e[0],0,0,2+e[1]]),c&&a.append(c,e=>[e[0],e[1],0,0]);let d=new Et;l&&d.append(l,e=>[e[0],e[1],Math.max(.02,e[2]),0]),u&&a.append(u,e=>[e[0],e[1],e[2]+1e4,e[3]]);let f=new Et,p={};for(let t of[`wood`,`hard`,`roofMetal`,`thatch`,`stone`]){let n=e.batches[t];if(!n||n.vcount===0)continue;let r=f.idx.length;f.append(n),p[t]={start:r,count:f.idx.length-r}}let m=f.build(),h=m.index.count;this.meshes=[];for(let e in p){let n=new E;for(let e in m.attributes)n.setAttribute(e,m.attributes[e]);n.setIndex(m.index),n.boundingBox=m.boundingBox,n.boundingSphere=m.boundingSphere;let r=p[e];n.setDrawRange(r.start,r.count);let i=new C(n,t[e]);if(i.name=`village_`+e,i.receiveShadow=!0,i.castShadow=e===`wood`,e===`wood`){let e=n.drawRange;i.onBeforeRender=(t,n,i)=>{this.textures.bake();let a=!!i&&(i.isShadowCamera===!0||i.reversedDepth===!1);e.start=a?0:r.start,e.count=a?h:r.count}}this.meshes.push(i)}if(this.shadowTriangles=h/3,a.vcount>0){let e=new C(a.build(),t.fabric);e.name=`village_fabric`,e.receiveShadow=!0,e.castShadow=!1,this.meshes.push(e)}if(d.vcount>0){let e=new C(d.build(),t.net);e.name=`village_nets`,e.receiveShadow=!0,e.castShadow=!1,this.meshes.push(e)}e.fishProps&&this.group.add(e.fishProps.build());let g=()=>this.textures.bake();for(let e of this.meshes)e.onBeforeRender||=g;for(let e of this.meshes)e.frustumCulled=!1,e.matrixAutoUpdate=!1,e.updateMatrix(),this.group.add(e);this.B=this.harbor=this.town=null,this.inst=null}_buildSign(){let e=this.signB,t=this.pierInfo.signPivot;if(this.signB=null,e&&t){this.sign=new b,this.sign.name=`village_sign`,this.sign.position.copy(t),this.sign.rotation.order=`YXZ`;for(let n of[`wood`,`hard`]){let r=e.batches[n];if(!r||r.vcount===0)continue;let i=r.build();i.translate(-t.x,-t.y,-t.z);let a=new C(i,this.materials[n]);a.name=`village_sign_`+n,a.castShadow=!0,a.receiveShadow=!0,this.sign.add(a)}this.group.add(this.sign),this._swing={t:0,a:0,av:0,b:0,bv:0}}}_buildLanterns(){let e=this.pierInfo.hung||[];this.lanterns=[];let t=this.materials;for(let n of e){let e=n.B;n.B=null;let r=new b;r.name=`village_lantern`,r.position.copy(n.pivot);let i=e.batches.glass;delete e.batches.glass,i&&e.batch(`wood`).append(i,e=>[e[0],e[1],9,e[2]]);for(let i of[`wood`,`hard`]){let a=e.batches[i];if(!a||a.vcount===0)continue;let o=a.build();o.translate(-n.pivot.x,-n.pivot.y,-n.pivot.z),o.computeBoundingSphere();let s=new C(o,t[i]);s.name=`village_lantern_`+i,s.castShadow=!1,s.receiveShadow=!0,r.add(s)}this.group.add(r),this.lanterns.push({obj:r,pivot:n.pivot,rest:n.rest,live:n.live,t:Math.random()*50,ph:Math.random()*6.28,x:0,z:0,vx:0,vz:0})}}_updateLanterns(e){if(!this.lanterns||!this.lanterns.length)return;let t=f.windSpeed.value,n=f.windDir.value.x,r=f.windDir.value.y,i=Math.max(1,Math.ceil(Math.min(e,.1)/(1/120))),a=Math.min(e,.1)/i,o=5.4,s=.05;for(let e of this.lanterns){for(let c=0;c<i;c++){let i=e.t+=a,c=e.ph,l=1+.4*Math.sin(i*.73+c)*Math.sin(i*.31+c*.5)+.25*Math.sin(i*2.3+Math.sin(i*.9+c)*1.5),u=.0011*t*t*l*n+.0012*t*Math.sin(i*1.9+c+Math.sin(i*.53)*2),d=.0011*t*t*l*r+.0012*t*Math.sin(i*1.6+c*1.7+Math.sin(i*.41)*2);e.vx+=(o*o*(u-e.x)-2*s*o*e.vx)*a,e.x+=e.vx*a,e.vz+=(o*o*(d-e.z)-2*s*o*e.vz)*a,e.z+=e.vz*a}e.obj.rotation.set(e.z,0,-e.x),Ai.set(e.z,0,-e.x),e.live.copy(e.rest).sub(e.pivot).applyEuler(Ai).add(e.pivot)}}update(e=1/60){this._updateLanterns(e);let t=this._swing;if(!t)return;let n=f.windSpeed.value,r=f.windDir.value.x,i=f.windDir.value.y,a=Math.max(1,Math.ceil(Math.min(e,.1)/(1/120))),o=Math.min(e,.1)/a,s=4.9,c=10.5;for(let e=0;e<a;e++){let e=t.t+=o,a=1+.35*Math.sin(e*.73+1.3)*Math.sin(e*.31)+.22*Math.sin(e*2.1+Math.sin(e*.9))+.1*Math.sin(e*5.3+2),l=-.0033*n*n*a*i*Math.abs(i)-9e-4*n*Math.sin(e*1.7+Math.sin(e*.43)*2);t.av+=(s*s*(l*Math.cos(t.a)-Math.sin(t.a))-.14*s*t.av)*o,t.a+=t.av*o;let u=.004*n*n*r*i*a+.0015*n*Math.sin(e*2.9+1.1);t.bv+=(c*c*(u-t.b)-.24*c*t.bv)*o,t.b+=t.bv*o}this.sign.rotation.set(t.a,t.b,0)}getLightSources(){return this.lights}getFootprints(){return this.footprints}getStats(){let e=0,t=0;for(let n of this.meshes){let r=n.geometry.index?n.geometry.index.count:n.geometry.attributes.position.count;e+=Math.min(r,n.geometry.drawRange.count)/3,t++}let n=this.meshes.filter(e=>e.castShadow).length;return{triangles:e,drawCalls:t,shadowCasters:n,shadowTriangles:this.shadowTriangles,lights:this.lights.length,textureMB:this.textures.bytes/1048576,bakeMs:this.textures.bakeMs,baked:this.textures.baked}}dispose(){for(let e of this.meshes)e.geometry.dispose();for(let e in this.materials)this.materials[e].dispose();this.textures.dispose(),this.scene.remove(this.group)}};export{me as $,zt as A,wt as B,jn as C,an as D,On as E,_t as F,qe as G,Ye as H,kt as I,V as J,Be as K,St as L,jt as M,pt as N,rn as O,Tt as P,ye as Q,Ct as R,Yn as S,G as T,Xe as U,xt as V,Je as W,je as X,Ve as Y,we as Z,br as _,ci as a,de as at,Jr as b,ei as c,ue as ct,Dr as d,ae as dt,be as et,Or as f,Br as g,hr as h,ui as i,le as it,Et as j,tn as k,gr as l,ce as lt,J as m,di as n,xe as nt,Z as o,fe as ot,Rr as p,Me as q,li as r,pe as rt,X as s,z as st,ji as t,he as tt,Y as u,oe as ut,Hr as v,An as w,fr as x,wr as y,Mt as z};