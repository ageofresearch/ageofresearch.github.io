import{a as e,i as t,n,r,t as i}from"./cotendo-AJ-bNteK.js";var a=Math.PI/180,o=180/Math.PI,s=[];for(let e=0;e<256;e++)s[e]=(e<16?`0`:``)+e.toString(16);function c(){let e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0,r=Math.random()*4294967295|0;return(s[e&255]+s[e>>8&255]+s[e>>16&255]+s[e>>24&255]+`-`+s[t&255]+s[t>>8&255]+`-`+s[t>>16&15|64]+s[t>>24&255]+`-`+s[n&63|128]+s[n>>8&255]+`-`+s[n>>16&255]+s[n>>24&255]+s[r&255]+s[r>>8&255]+s[r>>16&255]+s[r>>24&255]).toLowerCase()}var l=(e,t,n)=>Math.max(t,Math.min(n,e)),u=(e,t)=>(e%t+t)%t,d=(e,t,n,r,i)=>r+(e-t)*(i-r)/(n-t),f=(e,t,n)=>e===t?0:(n-e)/(t-e),p=(e,t,n)=>(1-n)*e+n*t,m=(e,t,n,r)=>p(e,t,1-Math.exp(-n*r)),h=(e,t=1)=>t-Math.abs(u(e,t*2)-t);function g(e,t,n){return e<=t?0:e>=n?1:(e=(e-t)/(n-t),e*e*(3-2*e))}function _(e,t,n){return e<=t?0:e>=n?1:(e=(e-t)/(n-t),e*e*e*(e*(e*6-15)+10))}var v=(e,t)=>e+Math.floor(Math.random()*(t-e+1)),y=(e,t)=>e+Math.random()*(t-e),b=e=>e*(.5-Math.random()),x=1234567;function S(e){e!==void 0&&(x=e);let t=x+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}var C=e=>e*a,w=e=>e*o,T=e=>!(e&e-1)&&e!==0,E=e=>2**Math.ceil(Math.log(e)/Math.LN2),D=e=>2**Math.floor(Math.log(e)/Math.LN2);function O(e,t){switch(t.constructor){case Float32Array:case Float64Array:return e;case Uint32Array:return e/4294967295;case Uint16Array:return e/65535;case Uint8Array:case Uint8ClampedArray:return e/255;case Int32Array:return Math.max(e/2147483647,-1);case Int16Array:return Math.max(e/32767,-1);case Int8Array:return Math.max(e/127,-1);default:return e}}function k(e,t){switch(t.constructor){case Float32Array:case Float64Array:return e;case Uint32Array:return Math.round(e*4294967295);case Uint16Array:return Math.round(e*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(e*255);case Int32Array:return Math.round(e*2147483647);case Int16Array:return Math.round(e*32767);case Int8Array:return Math.round(e*127);default:return e}}var A={normalize:k,denormalize:O,DEG2RAD:a,RAD2DEG:o,generateUUID:c,clamp:l,euclideanModulo:u,mapLinear:d,inverseLerp:f,lerp:p,damp:m,pingpong:h,smoothstep:g,smootherstep:_,randInt:v,randFloat:y,randFloatSpread:b,seededRandom:S,degToRad:C,radToDeg:w,isPowerOfTwo:T,ceilPowerOfTwo:E,floorPowerOfTwo:D},j=class e{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){return e===0?this.x=t:this.y=t,this}getComponent(e){return e===0?this.x:this.y}clone(){return new e(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());return t===0?Math.PI/2:Math.acos(Math.max(-1,Math.min(1,this.dot(e)/t)))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),r=Math.sin(t),i=this.x-e.x,a=this.y-e.y;return this.x=i*n-a*r+e.x,this.y=i*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};j.prototype.isVector2=!0;var M=class e{constructor(e=0,t=0,n=0,r=1){this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback=ee}static slerpFlat(t,n,r,i,a,o,s){let c=new e().fromArray(r,i),l=new e().fromArray(a,o);c.slerp(l,s).toArray(t,n)}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new e(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}identity(){return this.set(0,0,0,1)}setFromEuler(e,t=!0){let n=e._x,r=e._y,i=e._z,a=e._order,o=Math.cos(n/2),s=Math.cos(r/2),c=Math.cos(i/2),l=Math.sin(n/2),u=Math.sin(r/2),d=Math.sin(i/2);switch(a){case`XYZ`:this._x=l*s*c+o*u*d,this._y=o*u*c-l*s*d,this._z=o*s*d+l*u*c,this._w=o*s*c-l*u*d;break;case`YXZ`:this._x=l*s*c+o*u*d,this._y=o*u*c-l*s*d,this._z=o*s*d-l*u*c,this._w=o*s*c+l*u*d;break;case`ZXY`:this._x=l*s*c-o*u*d,this._y=o*u*c+l*s*d,this._z=o*s*d+l*u*c,this._w=o*s*c-l*u*d;break;case`ZYX`:this._x=l*s*c-o*u*d,this._y=o*u*c+l*s*d,this._z=o*s*d-l*u*c,this._w=o*s*c+l*u*d;break;case`YZX`:this._x=l*s*c+o*u*d,this._y=o*u*c+l*s*d,this._z=o*s*d-l*u*c,this._w=o*s*c-l*u*d;break;case`XZY`:this._x=l*s*c-o*u*d,this._y=o*u*c-l*s*d,this._z=o*s*d+l*u*c,this._w=o*s*c+l*u*d;break;default:throw Error(`Quaternion.setFromEuler: unknown order `+a)}return t&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],r=t[4],i=t[8],a=t[1],o=t[5],s=t[9],c=t[2],l=t[6],u=t[10],d=n+o+u;if(d>0){let e=.5/Math.sqrt(d+1);this._w=.25/e,this._x=(l-s)*e,this._y=(i-c)*e,this._z=(a-r)*e}else if(n>o&&n>u){let e=2*Math.sqrt(1+n-o-u);this._w=(l-s)/e,this._x=.25*e,this._y=(r+a)/e,this._z=(i+c)/e}else if(o>u){let e=2*Math.sqrt(1+o-n-u);this._w=(i-c)/e,this._x=(r+a)/e,this._y=.25*e,this._z=(s+l)/e}else{let e=2*Math.sqrt(1+u-n-o);this._w=(a-r)/e,this._x=(i+c)/e,this._y=(s+l)/e,this._z=.25*e}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.x*t.x+e.y*t.y+e.z*t.z+1;return n<2**-52?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Math.max(-1,Math.min(1,this.dot(e)))))}rotateTowards(e,t){let n=this.angleTo(e);return n===0?this:this.slerp(e,Math.min(1,t/n))}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this.lengthSq())}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x*=e,this._y*=e,this._z*=e,this._w*=e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=t._x,s=t._y,c=t._z,l=t._w;return this._x=n*l+a*o+r*c-i*s,this._y=r*l+a*s+i*o-n*c,this._z=i*l+a*c+n*s-r*o,this._w=a*l-n*o-r*s-i*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);let n=this._x,r=this._y,i=this._z,a=this._w,o=a*e._w+n*e._x+r*e._y+i*e._z,s=e._x,c=e._y,l=e._z,u=e._w;if(o<0&&(s=-s,c=-c,l=-l,u=-u,o=-o),o>=1)return this;let d=1-o*o;if(d<=2**-52){let e=1-t;return this._w=e*a+t*u,this._x=e*n+t*s,this._y=e*r+t*c,this._z=e*i+t*l,this.normalize()}let f=Math.sqrt(d),p=Math.atan2(f,o),m=Math.sin((1-t)*p)/f,h=Math.sin(t*p)/f;return this._w=a*m+u*h,this._x=n*m+s*h,this._y=r*m+c*h,this._z=i*m+l*h,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),i=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),i*Math.sin(t),i*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this.set(e.getX(t),e.getY(t),e.getZ(t),e.getW(t))}_onChange(e){return this._onChangeCallback=e,this}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}};function ee(){}M.prototype.isQuaternion=!0;var te=new M,N=class e{constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){return e===0?this.x=t:e===1?this.y=t:this.z=t,this}getComponent(e){return e===0?this.x:e===1?this.y:this.z}clone(){return new e(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}applyEuler(e){return this.applyQuaternion(te.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(te.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6]*r,this.y=i[1]*t+i[4]*n+i[7]*r,this.z=i[2]*t+i[5]*n+i[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=e.elements,a=1/(i[3]*t+i[7]*n+i[11]*r+i[15]);return this.x=(i[0]*t+i[4]*n+i[8]*r+i[12])*a,this.y=(i[1]*t+i[5]*n+i[9]*r+i[13])*a,this.z=(i[2]*t+i[6]*n+i[10]*r+i[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,r=this.z,i=e.x,a=e.y,o=e.z,s=e.w,c=2*(a*r-o*n),l=2*(o*t-i*r),u=2*(i*n-a*t);return this.x=t+s*c+a*u-o*l,this.y=n+s*l+o*c-i*u,this.z=r+s*u+i*l-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[4]*n+i[8]*r,this.y=i[1]*t+i[5]*n+i[9]*r,this.z=i[2]*t+i[6]*n+i[10]*r,this.normalize()}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,r=e.y,i=e.z,a=t.x,o=t.y,s=t.z;return this.x=r*s-i*o,this.y=i*a-n*s,this.z=n*o-r*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){let t=this.dot(e)/(e.lengthSq()||1);return this.addScaledVector(e,-t)}reflect(e){return this.addScaledVector(e,-2*this.dot(e))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());return t===0?Math.PI/2:Math.acos(Math.max(-1,Math.min(1,this.dot(e)/t)))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.set(t,n,r)}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};N.prototype.isVector3=!0;var P=class e{constructor(e=0,t=0,n=0,r=1){this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){return this[`xyzw`[e]]=t,this}getComponent(e){return this[`xyzw`[e]]}clone(){return new e(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w===void 0?1:e.w,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*i,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*i,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*i,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*i,this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.dot(this)}length(){return Math.sqrt(this.dot(this))}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};P.prototype.isVector4=!0;var ne=2001,re=new N,ie=new N,ae=new N,oe=new N,se=new M,ce=new N(1,1,1),le=new N,F=class e{constructor(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h)}set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){let g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=r,g[1]=i,g[5]=a,g[9]=o,g[13]=s,g[2]=c,g[6]=l,g[10]=u,g[14]=d,g[3]=f,g[7]=p,g[11]=m,g[15]=h,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1)}clone(){return new e().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;for(let e=0;e<16;e++)t[e]=n[e];return this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1)}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1)}extractRotation(e){let t=this.elements,n=e.elements,r=1/re.setFromMatrixColumn(e,0).length(),i=1/re.setFromMatrixColumn(e,1).length(),a=1/re.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*i,t[5]=n[5]*i,t[6]=n[6]*i,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){return this.compose(le,se.setFromEuler(e,!1),ce)}makeRotationFromQuaternion(e){return this.compose(le,e,ce)}lookAt(e,t,n){let r=this.elements;return oe.subVectors(e,t),oe.lengthSq()===0&&(oe.z=1),oe.normalize(),ie.crossVectors(n,oe),ie.lengthSq()===0&&(Math.abs(n.z)===1?oe.x+=1e-4:oe.z+=1e-4,oe.normalize(),ie.crossVectors(n,oe)),ie.normalize(),ae.crossVectors(oe,ie),r[0]=ie.x,r[4]=ae.x,r[8]=oe.x,r[1]=ie.y,r[5]=ae.y,r[9]=oe.y,r[2]=ie.z,r[6]=ae.z,r[10]=oe.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[4],s=n[8],c=n[12],l=n[1],u=n[5],d=n[9],f=n[13],p=n[2],m=n[6],h=n[10],g=n[14],_=n[3],v=n[7],y=n[11],b=n[15],x=r[0],S=r[4],C=r[8],w=r[12],T=r[1],E=r[5],D=r[9],O=r[13],k=r[2],A=r[6],j=r[10],M=r[14],ee=r[3],te=r[7],N=r[11],P=r[15];return i[0]=a*x+o*T+s*k+c*ee,i[4]=a*S+o*E+s*A+c*te,i[8]=a*C+o*D+s*j+c*N,i[12]=a*w+o*O+s*M+c*P,i[1]=l*x+u*T+d*k+f*ee,i[5]=l*S+u*E+d*A+f*te,i[9]=l*C+u*D+d*j+f*N,i[13]=l*w+u*O+d*M+f*P,i[2]=p*x+m*T+h*k+g*ee,i[6]=p*S+m*E+h*A+g*te,i[10]=p*C+m*D+h*j+g*N,i[14]=p*w+m*O+h*M+g*P,i[3]=_*x+v*T+y*k+b*ee,i[7]=_*S+v*E+y*A+b*te,i[11]=_*C+v*D+y*j+b*N,i[15]=_*w+v*O+y*M+b*P,this}multiplyScalar(e){let t=this.elements;for(let n=0;n<16;n++)t[n]*=e;return this}determinant(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[12],a=e[1],o=e[5],s=e[9],c=e[13],l=e[2],u=e[6],d=e[10],f=e[14],p=e[3],m=e[7],h=e[11],g=e[15],_=d*g-f*h,v=u*g-f*m,y=u*h-d*m,b=l*g-f*p,x=l*h-d*p,S=l*m-u*p;return t*(o*_-s*v+c*y)-n*(a*_-s*b+c*x)+r*(a*v-o*b+c*S)-i*(a*y-o*x+s*S)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=e[9],d=e[10],f=e[11],p=e[12],m=e[13],h=e[14],g=e[15],_=t*o-n*a,v=t*s-r*a,y=t*c-i*a,b=n*s-r*o,x=n*c-i*o,S=r*c-i*s,C=l*m-u*p,w=l*h-d*p,T=l*g-f*p,E=u*h-d*m,D=u*g-f*m,O=d*g-f*h,k=_*O-v*D+y*E+b*T-x*w+S*C;if(k===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let A=1/k;return e[0]=(o*O-s*D+c*E)*A,e[1]=(r*D-n*O-i*E)*A,e[2]=(m*S-h*x+g*b)*A,e[3]=(d*x-u*S-f*b)*A,e[4]=(s*T-a*O-c*w)*A,e[5]=(t*O-r*T+i*w)*A,e[6]=(h*y-p*S-g*v)*A,e[7]=(l*S-d*y+f*v)*A,e[8]=(a*D-o*T+c*C)*A,e[9]=(n*T-t*D-i*C)*A,e[10]=(p*x-m*y+g*_)*A,e[11]=(u*y-l*x-f*_)*A,e[12]=(o*w-a*E-s*C)*A,e[13]=(t*E-n*w+r*C)*A,e[14]=(m*v-p*b-h*_)*A,e[15]=(l*b-u*v+d*_)*A,this}scale(e){let t=this.elements;return t[0]*=e.x,t[4]*=e.y,t[8]*=e.z,t[1]*=e.x,t[5]*=e.y,t[9]*=e.z,t[2]*=e.x,t[6]*=e.y,t[10]*=e.z,t[3]*=e.x,t[7]*=e.y,t[11]*=e.z,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1)}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1)}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1)}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1)}makeRotationAxis(e,t){let n=Math.cos(t),r=Math.sin(t),i=1-n,a=e.x,o=e.y,s=e.z,c=i*a,l=i*o;return this.set(c*a+n,c*o-r*s,c*s+r*o,0,c*o+r*s,l*o+n,l*s-r*a,0,c*s-r*o,l*s+r*a,i*s*s+n,0,0,0,0,1)}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1)}makeShear(e,t,n,r,i,a){return this.set(1,n,i,0,e,1,a,0,t,r,1,0,0,0,0,1)}compose(e,t,n){let r=this.elements,i=t._x,a=t._y,o=t._z,s=t._w,c=i+i,l=a+a,u=o+o,d=i*c,f=i*l,p=i*u,m=a*l,h=a*u,g=o*u,_=s*c,v=s*l,y=s*u,b=n.x,x=n.y,S=n.z;return r[0]=(1-(m+g))*b,r[1]=(f+y)*b,r[2]=(p-v)*b,r[3]=0,r[4]=(f-y)*x,r[5]=(1-(d+g))*x,r[6]=(h+_)*x,r[7]=0,r[8]=(p+v)*S,r[9]=(h-_)*S,r[10]=(1-(d+m))*S,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){let r=this.elements,i=Math.hypot(r[0],r[1],r[2]),a=Math.hypot(r[4],r[5],r[6]),o=Math.hypot(r[8],r[9],r[10]);this.determinant()<0&&(i=-i),e.x=r[12],e.y=r[13],e.z=r[14];let s=ue.copy(this),c=s.elements,l=1/i,u=1/a,d=1/o;return c[0]*=l,c[1]*=l,c[2]*=l,c[4]*=u,c[5]*=u,c[6]*=u,c[8]*=d,c[9]*=d,c[10]*=d,t.setFromRotationMatrix(s),n.x=i,n.y=a,n.z=o,this}makePerspective(e,t,n,r,i,a,o=ne,s=!0){let c=this.elements,l=2*i/(t-e),u=2*i/(n-r),d=(t+e)/(t-e),f=(n+r)/(n-r),p,m,h=a===1/0;if(s){if(o!==2001)throw Error(`Matrix4.makePerspective: reversed depth requires WebGPU clip space`);p=h?0:i/(a-i),m=h?i:a*i/(a-i)}else o===2001?(p=h?-1:-a/(a-i),m=h?-i:-a*i/(a-i)):(p=h?-1:-(a+i)/(a-i),m=h?-2*i:-2*a*i/(a-i));return c[0]=l,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,r,i,a,o=ne,s=!0){let c=this.elements,l=1/(t-e),u=1/(n-r),d=1/(a-i),f=(t+e)*l,p=(n+r)*u,m,h;return s?(m=a*d,h=d):o===2001?(m=-i*d,h=-d):(m=-(a+i)*d,h=-2*d),c[0]=2*l,c[4]=0,c[8]=0,c[12]=-f,c[1]=0,c[5]=2*u,c[9]=0,c[13]=-p,c[2]=0,c[6]=0,c[10]=h,c[14]=m,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){for(let t=0;t<16;t++)if(this.elements[t]!==e.elements[t])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;for(let r=0;r<16;r++)e[t+r]=n[r];return e}};F.prototype.isMatrix4=!0;var ue=new F,de=new F,fe=new M,pe=e=>Math.max(-1,Math.min(1,e)),me=class e{constructor(t=0,n=0,r=0,i=e.DEFAULT_ORDER){this._x=t,this._y=n,this._z=r,this._order=i,this._onChangeCallback=he}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new e(this._x,this._y,this._z,this._order)}copy(e){return this.set(e._x,e._y,e._z,e._order)}setFromRotationMatrix(e,t=this._order,n=!0){let r=e.elements,i=r[0],a=r[4],o=r[8],s=r[1],c=r[5],l=r[9],u=r[2],d=r[6],f=r[10],p=.9999999;switch(t){case`XYZ`:this._y=Math.asin(pe(o)),Math.abs(o)<p?(this._x=Math.atan2(-l,f),this._z=Math.atan2(-a,i)):(this._x=Math.atan2(d,c),this._z=0);break;case`YXZ`:this._x=Math.asin(-pe(l)),Math.abs(l)<p?(this._y=Math.atan2(o,f),this._z=Math.atan2(s,c)):(this._y=Math.atan2(-u,i),this._z=0);break;case`ZXY`:this._x=Math.asin(pe(d)),Math.abs(d)<p?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(s,i));break;case`ZYX`:this._y=Math.asin(-pe(u)),Math.abs(u)<p?(this._x=Math.atan2(d,f),this._z=Math.atan2(s,i)):(this._x=0,this._z=Math.atan2(-a,c));break;case`YZX`:this._z=Math.asin(pe(s)),Math.abs(s)<p?(this._x=Math.atan2(-l,c),this._y=Math.atan2(-u,i)):(this._x=0,this._y=Math.atan2(o,f));break;case`XZY`:this._z=Math.asin(-pe(a)),Math.abs(a)<p?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,i)):(this._x=Math.atan2(-l,f),this._y=0);break;default:throw Error(`Euler.setFromRotationMatrix: unknown order `+t)}return this._order=t,n&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return de.makeRotationFromQuaternion(e),this.setFromRotationMatrix(de,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return fe.setFromEuler(this),this.setFromQuaternion(fe,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};function he(){}me.DEFAULT_ORDER=`XYZ`,me.prototype.isEuler=!0;var ge=class e{constructor(e,t,n,r,i,a,o,s,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c)}set(e,t,n,r,i,a,o,s,c){let l=this.elements;return l[0]=e,l[1]=r,l[2]=o,l[3]=t,l[4]=i,l[5]=s,l[6]=n,l[7]=a,l[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1)}copy(e){let t=this.elements,n=e.elements;for(let e=0;e<9;e++)t[e]=n[e];return this}clone(){return new e().fromArray(this.elements)}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10])}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[3],s=n[6],c=n[1],l=n[4],u=n[7],d=n[2],f=n[5],p=n[8],m=r[0],h=r[3],g=r[6],_=r[1],v=r[4],y=r[7],b=r[2],x=r[5],S=r[8];return i[0]=a*m+o*_+s*b,i[3]=a*h+o*v+s*x,i[6]=a*g+o*y+s*S,i[1]=c*m+l*_+u*b,i[4]=c*h+l*v+u*x,i[7]=c*g+l*y+u*S,i[2]=d*m+f*_+p*b,i[5]=d*h+f*v+p*x,i[8]=d*g+f*y+p*S,this}multiplyScalar(e){let t=this.elements;for(let n=0;n<9;n++)t[n]*=e;return this}determinant(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8];return t*a*l-t*o*c-n*i*l+n*o*s+r*i*c-r*a*s}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=l*a-o*c,d=o*s-l*i,f=c*i-a*s,p=t*u+n*d+r*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let m=1/p;return e[0]=u*m,e[1]=(r*c-l*n)*m,e[2]=(o*n-r*a)*m,e[3]=d*m,e[4]=(l*t-r*s)*m,e[5]=(r*i-o*t)*m,e[6]=f*m,e[7]=(n*s-c*t)*m,e[8]=(a*t-n*i)*m,this}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}makeTranslation(e,t){return e.isVector2&&(t=e.y,e=e.x),this.set(1,0,e,0,1,t,0,0,1)}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1)}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1)}setUvTransform(e,t,n,r,i,a,o){let s=Math.cos(i),c=Math.sin(i);return this.set(n*s,n*c,-n*(s*a+c*o)+a+e,-r*c,r*s,-r*(-c*a+s*o)+o+t,0,0,1)}scale(e,t){return this.premultiply(_e.makeScale(e,t))}rotate(e){return this.premultiply(_e.makeRotation(-e))}translate(e,t){return this.premultiply(_e.makeTranslation(e,t))}equals(e){for(let t=0;t<9;t++)if(this.elements[t]!==e.elements[t])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){for(let n=0;n<9;n++)e[t+n]=this.elements[n];return e}};ge.prototype.isMatrix3=!0;var _e=new ge,ve=`srgb`,ye=`srgb-linear`,be=e=>e<.04045?e*.0773993808:(e*.9478672986+.0521327014)**2.4,xe=e=>e<.0031308?e*12.92:1.055*e**.41666-.055,Se=e=>Math.max(0,Math.min(1,e)),Ce=(e,t)=>(e%t+t)%t;function we(e,t,n){return n<0&&(n+=1),n>1&&--n,n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*6*(2/3-n):e}var Te={h:0,s:0,l:0},Ee=class e{constructor(e,t,n){this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){if(e===void 0)return this;e&&e.isColor?this.copy(e):typeof e==`number`?this.setHex(e):typeof e==`string`&&this.setStyle(e)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=ve){return e=Math.floor(e),this.setRGB((e>>16&255)/255,(e>>8&255)/255,(e&255)/255,t)}setRGB(e,t,n,r=ye){return r===`srgb`&&(e=be(e),t=be(t),n=be(n)),this.r=e,this.g=t,this.b=n,this}setHSL(e,t,n,r=ye){if(e=Ce(e,1),t=Se(t),n=Se(n),t===0)return this.setRGB(n,n,n,r);let i=n<=.5?n*(1+t):n+t-n*t,a=2*n-i;return this.setRGB(we(a,i,e+1/3),we(a,i,e),we(a,i,e-1/3),r)}setStyle(e,t=ve){let n;if(n=/^#([A-Fa-f\d]+)$/.exec(e)){let e=n[1];if(e.length===3)return this.setRGB(parseInt(e[0],16)/15,parseInt(e[1],16)/15,parseInt(e[2],16)/15,t);if(e.length===6)return this.setHex(parseInt(e,16),t)}else if(n=/^rgba?\(\s*([\d.]+)(%?)\s*,\s*([\d.]+)%?\s*,\s*([\d.]+)%?\s*(?:,\s*[\d.]+\s*)?\)$/.exec(e)){let e=n[2]===`%`?100:255;return this.setRGB(Math.min(1,n[1]/e),Math.min(1,n[3]/e),Math.min(1,n[4]/e),t)}else if(n=/^hsla?\(\s*([\d.]+)\s*,\s*([\d.]+)%\s*,\s*([\d.]+)%\s*(?:,\s*[\d.]+\s*)?\)$/.exec(e))return this.setHSL(n[1]/360,n[2]/100,n[3]/100,t);else if(De[e.toLowerCase()]!==void 0)return this.setHex(De[e.toLowerCase()],t);return console.warn(`Color: unknown color `+e),this}clone(){return new e(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=be(e.r),this.g=be(e.g),this.b=be(e.b),this}copyLinearToSRGB(e){return this.r=xe(e.r),this.g=xe(e.g),this.b=xe(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this)}convertLinearToSRGB(){return this.copyLinearToSRGB(this)}getHex(e=ve){let t=this.r,n=this.g,r=this.b;return e===`srgb`&&(t=xe(t),n=xe(n),r=xe(r)),Math.round(Se(t)*255)*65536+Math.round(Se(n)*255)*256+Math.round(Se(r)*255)}getHexString(e=ve){return(`000000`+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=ye){let n=this.r,r=this.g,i=this.b;t===`srgb`&&(n=xe(n),r=xe(r),i=xe(i));let a=Math.max(n,r,i),o=Math.min(n,r,i),s=0,c=0,l=(o+a)/2;if(o!==a){let e=a-o;c=l<=.5?e/(a+o):e/(2-a-o),s=a===n?(r-i)/e+(r<i?6:0):a===r?(i-n)/e+2:(n-r)/e+4,s/=6}return e.h=s,e.s=c,e.l=l,e}getRGB(e,t=ye){return e.r=this.r,e.g=this.g,e.b=this.b,t===`srgb`&&(e.r=xe(e.r),e.g=xe(e.g),e.b=xe(e.b)),e}getStyle(e=ve){let t=this.getRGB({},e);return`rgb(${Math.round(t.r*255)},${Math.round(t.g*255)},${Math.round(t.b*255)})`}offsetHSL(e,t,n){return this.getHSL(Te),this.setHSL(Te.h+e,Te.s+t,Te.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}};Ee.prototype.isColor=!0;var De={black:0,white:16777215,red:16711680,green:32768,lime:65280,blue:255,yellow:16776960,cyan:65535,magenta:16711935,gray:8421504,grey:8421504,orange:16753920};Ee.NAMES=De;var Oe=new N,ke=Array.from({length:8},()=>new N),Ae=class e{constructor(e=new N(1/0,1/0,1/0),t=new N(-1/0,-1/0,-1/0)){this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0;t<e.length;t+=3)this.expandByPoint(Oe.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0;t<e.count;t++)this.expandByPoint(Oe.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t of e)this.expandByPoint(t);return this}setFromCenterAndSize(e,t){return Oe.copy(t).multiplyScalar(.5),this.min.copy(e).sub(Oe),this.max.copy(e).add(Oe),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new e().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute(`position`);if(t&&r!==void 0)for(let t=0;t<r.count;t++)this.expandByPoint(Oe.fromBufferAttribute(r,t).applyMatrix4(e.matrixWorld));else n.boundingBox===null&&n.computeBoundingBox(),je.copy(n.boundingBox).applyMatrix4(e.matrixWorld),this.union(je)}for(let n of e.children)this.expandByObject(n,t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,Oe),Oe.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n,r=e.normal;return r.x>0?(t=r.x*this.min.x,n=r.x*this.max.x):(t=r.x*this.max.x,n=r.x*this.min.x),r.y>0?(t+=r.y*this.min.y,n+=r.y*this.max.y):(t+=r.y*this.max.y,n+=r.y*this.min.y),r.z>0?(t+=r.z*this.min.z,n+=r.z*this.max.z):(t+=r.z*this.max.z,n+=r.z*this.min.z),t<=-e.constant&&n>=-e.constant}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Oe).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?(e.makeEmpty(),e):(this.getCenter(e.center),e.radius=this.getSize(Oe).length()*.5,e)}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){if(this.isEmpty())return this;let t=this.min,n=this.max;return ke[0].set(t.x,t.y,t.z).applyMatrix4(e),ke[1].set(t.x,t.y,n.z).applyMatrix4(e),ke[2].set(t.x,n.y,t.z).applyMatrix4(e),ke[3].set(t.x,n.y,n.z).applyMatrix4(e),ke[4].set(n.x,t.y,t.z).applyMatrix4(e),ke[5].set(n.x,t.y,n.z).applyMatrix4(e),ke[6].set(n.x,n.y,t.z).applyMatrix4(e),ke[7].set(n.x,n.y,n.z).applyMatrix4(e),this.setFromPoints(ke)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}};Ae.prototype.isBox3=!0;var je=new Ae,Me=new Ae,Ne=new N,Pe=class e{constructor(e=new N,t=-1){this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){t===void 0?Me.setFromPoints(e).getCenter(this.center):this.center.copy(t);let n=0;for(let t of e)n=Math.max(n,this.center.distanceToSquared(t));return this.radius=Math.sqrt(n),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}clone(){return new e().copy(this)}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&t.sub(this.center).normalize().multiplyScalar(this.radius).add(this.center),t}getBoundingBox(e){return this.isEmpty()?e.makeEmpty():(e.set(this.center,this.center),e.expandByScalar(this.radius))}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius*=e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Ne.subVectors(e,this.center);let t=Ne.lengthSq();if(t>this.radius*this.radius){let e=Math.sqrt(t),n=(e-this.radius)*.5;this.center.addScaledVector(Ne,n/e),this.radius+=n}return this}union(e){if(e.isEmpty())return this;if(this.isEmpty())return this.copy(e);let t=this.center.distanceTo(e.center);if(t+e.radius<=this.radius)return this;if(t+this.radius<=e.radius)return this.copy(e);let n=(t+this.radius+e.radius)*.5;return this.center.lerp(e.center,(n-this.radius)/t),this.radius=n,this}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}};Pe.prototype.isSphere=!0;var Fe=new N,Ie=new N,Le=new ge,Re=class e{constructor(e=new N(1,0,0),t=0){this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(e),this}setFromCoplanarPoints(e,t,n){let r=Fe.subVectors(n,t).cross(Ie.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e)}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}clone(){return new e().copy(this)}normalize(){let e=this.normal.length();if(e===0)return this;let t=1/e;return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}applyMatrix4(e,t){let n=t||Le.getNormalMatrix(e),r=this.coplanarPoint(Fe).applyMatrix4(e),i=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(i),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}};Re.prototype.isPlane=!0;var ze=new Pe,Be=new N,Ve=class e{constructor(e=new Re,t=new Re,n=new Re,r=new Re,i=new Re,a=new Re){this.planes=[e,t,n,r,i,a]}set(e,t,n,r,i,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(i),o[5].copy(a),this}copy(e){for(let t=0;t<6;t++)this.planes[t].copy(e.planes[t]);return this}clone(){return new e().copy(this)}setFromProjectionMatrix(e,t=ne,n=!0){let r=this.planes,i=e.elements,a=i[0],o=i[4],s=i[8],c=i[12],l=i[1],u=i[5],d=i[9],f=i[13],p=i[2],m=i[6],h=i[10],g=i[14],_=i[3],v=i[7],y=i[11],b=i[15];return r[0].setComponents(_+a,v+o,y+s,b+c).normalize(),r[1].setComponents(_-a,v-o,y-s,b-c).normalize(),r[2].setComponents(_+l,v+u,y+d,b+f).normalize(),r[3].setComponents(_-l,v-u,y-d,b-f).normalize(),n?(r[4].setComponents(_-p,v-m,y-h,b-g).normalize(),r[5].setComponents(p,m,h,g).normalize()):t===2e3?(r[4].setComponents(_+p,v+m,y+h,b+g).normalize(),r[5].setComponents(_-p,v-m,y-h,b-g).normalize()):(r[4].setComponents(p,m,h,g).normalize(),r[5].setComponents(_-p,v-m,y-h,b-g).normalize()),this}intersectsObject(e){let t=e.geometry;return t.boundingSphere===null&&t.computeBoundingSphere(),ze.copy(t.boundingSphere).applyMatrix4(e.matrixWorld),this.intersectsSphere(ze)}intersectsSphere(e){let t=this.planes,n=e.center,r=-e.radius;for(let e=0;e<6;e++)if(t[e].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let r=t[n].normal;if(Be.x=r.x>0?e.max.x:e.min.x,Be.y=r.y>0?e.max.y:e.min.y,Be.z=r.z>0?e.max.z:e.min.z,t[n].distanceToPoint(Be)<0)return!1}return!0}containsPoint(e){for(let t=0;t<6;t++)if(this.planes[t].distanceToPoint(e)<0)return!1;return!0}},He=class{constructor(){this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}getPoint(){throw Error(`Curve.getPoint() not implemented`)}getPointAt(e,t){return this.getPoint(this.getUtoTmapping(e),t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[0],n=this.getPoint(0),r=0;for(let i=1;i<=e;i++){let a=this.getPoint(i/e);r+=a.distanceTo(n),t.push(r),n=a}return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),r=n.length,i=t===null?e*n[r-1]:t,a=0,o=r-1;for(;a<=o;){let e=Math.floor(a+(o-a)/2),t=n[e]-i;if(t<0)a=e+1;else if(t>0)o=e-1;else{o=e;break}}let s=o;if(n[s]===i)return s/(r-1);let c=n[s],l=n[s+1];return(s+(i-c)/(l-c))/(r-1)}getTangent(e,t=new N){let n=1e-4,r=Math.max(0,e-n),i=Math.min(1,e+n),a=this.getPoint(r),o=this.getPoint(i);return t.copy(o).sub(a).normalize()}getTangentAt(e,t){return this.getTangent(this.getUtoTmapping(e),t)}computeFrenetFrames(e,t){let n=new N,r=[],i=[],a=[],o=new N,s=new F;for(let t=0;t<=e;t++)r[t]=this.getTangentAt(t/e,new N);i[0]=new N,a[0]=new N;let c=Number.MAX_VALUE,l=Math.abs(r[0].x),u=Math.abs(r[0].y),d=Math.abs(r[0].z);l<=c&&(c=l,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),d<=c&&n.set(0,0,1),o.crossVectors(r[0],n).normalize(),i[0].crossVectors(r[0],o),a[0].crossVectors(r[0],i[0]);for(let t=1;t<=e;t++){if(i[t]=i[t-1].clone(),a[t]=a[t-1].clone(),o.crossVectors(r[t-1],r[t]),o.length()>2**-52){o.normalize();let e=Math.acos(Math.max(-1,Math.min(1,r[t-1].dot(r[t]))));i[t].applyMatrix4(s.makeRotationAxis(o,e))}a[t].crossVectors(r[t],i[t])}if(t===!0){let t=Math.acos(Math.max(-1,Math.min(1,i[0].dot(i[e]))))/e;r[0].dot(o.crossVectors(i[0],i[e]))>0&&(t=-t);for(let n=1;n<=e;n++)i[n].applyMatrix4(s.makeRotationAxis(r[n],t*n)),a[n].crossVectors(r[n],i[n])}return{tangents:r,normals:i,binormals:a}}};function Ue(e,t,n,r,i){e[0]=t,e[1]=r,e[2]=-3*t+3*n-2*r-i,e[3]=2*t-2*n+r+i}function We(e,t,n,r,i,a){Ue(e,n,r,a*(r-t),a*(i-n))}function Ge(e,t,n,r,i,a,o,s){let c=(n-t)/a-(r-t)/(a+o)+(r-n)/o,l=(r-n)/o-(i-n)/(o+s)+(i-r)/s;c*=o,l*=o,Ue(e,n,r,c,l)}var Ke=(e,t)=>e[0]+t*(e[1]+t*(e[2]+t*e[3])),qe=[0,0,0,0],Je=[0,0,0,0],Ye=[0,0,0,0],Xe=new N,Ze=new N,Qe=class e extends He{constructor(e=[],t=!1,n=`centripetal`,r=.5){super(),this.type=`CatmullRomCurve3`,this.points=e,this.closed=t,this.curveType=n,this.tension=r}getPoint(e,t=new N){let n=this.points,r=n.length,i=(r-+!this.closed)*e,a=Math.floor(i),o=i-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:o===0&&a===r-1&&(a=r-2,o=1);let s,c;s=this.closed||a>0?n[(a-1)%r]:Xe.subVectors(n[0],n[1]).add(n[0]);let l=n[a%r],u=n[(a+1)%r];if(c=this.closed||a+2<r?n[(a+2)%r]:Ze.subVectors(n[r-1],n[r-2]).add(n[r-1]),this.curveType===`centripetal`||this.curveType===`chordal`){let e=this.curveType===`chordal`?.5:.25,t=s.distanceToSquared(l)**+e,n=l.distanceToSquared(u)**+e,r=u.distanceToSquared(c)**+e;n<1e-4&&(n=1),t<1e-4&&(t=n),r<1e-4&&(r=n),Ge(qe,s.x,l.x,u.x,c.x,t,n,r),Ge(Je,s.y,l.y,u.y,c.y,t,n,r),Ge(Ye,s.z,l.z,u.z,c.z,t,n,r)}else We(qe,s.x,l.x,u.x,c.x,this.tension),We(Je,s.y,l.y,u.y,c.y,this.tension),We(Ye,s.z,l.z,u.z,c.z,this.tension);return t.set(Ke(qe,o),Ke(Je,o),Ke(Ye,o))}copy(e){return super.copy(e),this.points=e.points.map(e=>e.clone()),this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}clone(){return new e().copy(this)}};Qe.prototype.isCatmullRomCurve3=!0;function $e(e){let t=e.length,n=0;for(let r=t-1,i=0;i<t;r=i++)n+=e[r].x*e[i].y-e[i].x*e[r].y;return n*.5}var et=e=>$e(e)<0;function tt(e){let t=e.length;t>2&&e[t-1].x===e[0].x&&e[t-1].y===e[0].y&&e.pop()}var nt=(e,t,n)=>(t.x-e.x)*(n.y-t.y)-(t.y-e.y)*(n.x-t.x),rt=(e,t)=>e.x===t.x&&e.y===t.y;function it(e,t,n,r){return(n.x-r.x)*(e.y-r.y)>=(e.x-r.x)*(n.y-r.y)&&(e.x-r.x)*(t.y-r.y)>=(t.x-r.x)*(e.y-r.y)&&(t.x-r.x)*(n.y-r.y)>=(n.x-r.x)*(t.y-r.y)}function at(e,t){let n=0;for(let r=0,i=e.length-1;r<e.length;i=r++)n+=t[e[i]].x*t[e[r]].y-t[e[r]].x*t[e[i]].y;return n}function ot(e,t,n){let r=0;for(let e=1;e<t.length;e++)n[t[e]].x>n[t[r]].x&&(r=e);let i=n[t[r]],a=1/0,o=-1,s=e.length;for(let t=0;t<s;t++){let r=n[e[t]],c=n[e[(t+1)%s]];if(r.y<=i.y&&i.y<=c.y||c.y<=i.y&&i.y<=r.y){if(r.y===c.y)continue;let e=r.x+(i.y-r.y)*(c.x-r.x)/(c.y-r.y);e>=i.x&&e<a&&(a=e,o=r.x>c.x?t:(t+1)%s)}}if(o<0)return e;let c={x:a,y:i.y},l=n[e[o]];if(a!==l.x||i.y!==l.y){let t=1/0,r=l.y<i.y?[i,l,c]:[i,c,l],a=o;for(let c=0;c<s;c++){let u=(a+c)%s,d=n[e[u]];if(d.x<i.x||u===a)continue;let f=n[e[(u+s-1)%s]],p=n[e[(u+1)%s]];if(!(nt(f,d,p)<0)&&(d.x!==i.x||d.y!==i.y)||!st(r,d))continue;let m=Math.abs(i.y-d.y)/(d.x-i.x||1e-12);(m<t||m===t&&d.x<l.x)&&(t=m,o=u,l=d)}}for(let t=0;t<s;t++){if(!rt(n[e[t]],l))continue;let r=n[e[(t+s-1)%s]],a=n[e[(t+1)%s]],c=nt(r,l,i)>=0,u=nt(l,a,i)>=0;if(nt(r,l,a)>=0?c&&u:c||u){o=t;break}}let u=t.slice(r).concat(t.slice(0,r));return e.slice(0,o+1).concat(u,[t[r],e[o]],e.slice(o+1))}function st(e,t){let[n,r,i]=nt(e[0],e[1],e[2])>=0?e:[e[0],e[2],e[1]];return it(n,r,i,t)}function ct(e,t,n){let r=e.slice(),i=0;for(;r.length>3&&i++<1e5;){let e=r.length,i=!1;for(let a=0;a<2&&!i;a++)for(let o=0;o<e;o++){let s=r[(o+e-1)%e],c=r[o],l=r[(o+1)%e],u=t[s],d=t[c],f=t[l],p=nt(u,d,f);if(a===0?p<=0:p<0)continue;let m=!0;if(p>0)for(let n=0;n<e;n++){let e=t[r[n]];if(!(rt(e,u)||rt(e,d)||rt(e,f))&&it(u,d,f,e)){m=!1;break}}if(m){n.push([s,c,l]),r.splice(o,1),i=!0;break}}if(!i){let i=0,a=-1/0;for(let n=0;n<e;n++){let o=nt(t[r[(n+e-1)%e]],t[r[n]],t[r[(n+1)%e]]);o>a&&(a=o,i=n)}n.push([r[(i+e-1)%e],r[i],r[(i+1)%e]]),r.splice(i,1)}}return r.length===3&&n.push([r[0],r[1],r[2]]),n}function lt(e,t=[]){tt(e),t.forEach(tt);let n=e.concat(...t),r=e.map((e,t)=>t),i=at(r,n)<0;i&&r.reverse();let a=e.length,o=t.map(e=>{let t=e.map((e,t)=>a+t);return a+=e.length,at(t,n)>0&&t.reverse(),t}).filter(e=>e.length>=3);o.sort((e,t)=>Math.max(...t.map(e=>n[e].x))-Math.max(...e.map(e=>n[e].x)));for(let e of o)r=ot(r,e,n);let s=ct(r,n,[]);if(i)for(let e of s){let t=e[0];e[0]=e[2],e[2]=t}return s}var ut={area:$e,isClockWise:et,triangulateShape:lt},dt=()=>typeof performance<`u`?performance.now():Date.now(),ft=class{constructor(){this._startTime=dt(),this._previousTime=0,this._currentTime=0,this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(e){this._document=e,e.hidden!==void 0&&(this._pageVisibilityHandler=()=>{e.hidden===!1&&this.reset()},e.addEventListener(`visibilitychange`,this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener(`visibilitychange`,this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(e){return this._timescale=e,this}reset(){return this._currentTime=dt()-this._startTime,this}dispose(){this.disconnect()}update(e){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(e===void 0?dt():e)-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}};new Uint32Array(new Float32Array(1).buffer);var pt=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].includes(t)||n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n!==void 0&&n[e]!==void 0&&n[e].includes(t)}removeEventListener(e,t){let n=this._listeners&&this._listeners[e];if(n===void 0)return;let r=n.indexOf(t);r!==-1&&n.splice(r,1)}dispatchEvent(e){let t=this._listeners&&this._listeners[e.type];if(t!==void 0){e.target=this;for(let n of t.slice())n.call(this,e);e.target=null}}},mt=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return!!(this.mask&(1<<e|0))}},ht=0,gt=new N,_t=new M,vt=new F,yt=new N,bt=new N,xt=new N,St=new M,Ct=new N(1,0,0),wt=new N(0,1,0),Tt=new N(0,0,1),Et={type:`added`},Dt={type:`removed`},Ot={type:`childadded`,child:null},kt={type:`childremoved`,child:null},At=class e extends pt{constructor(){super(),Object.defineProperty(this,"id",{value:ht++}),this.uuid=c(),this.name=``,this.type=`Object3D`,this.parent=null,this.children=[],this.up=e.DEFAULT_UP.clone();let t=new N,n=new me,r=new M,i=new N(1,1,1);n._onChange(()=>r.setFromEuler(n,!1)),r._onChange(()=>n.setFromQuaternion(r,void 0,!1)),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new F},normalMatrix:{value:new ge}}),this.matrix=new F,this.matrixWorld=new F,this.matrixAutoUpdate=e.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new mt,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.userData={}}onBeforeRender(){}onAfterRender(){}onBeforeShadow(){}onAfterShadow(){}dispose(){this.dispatchEvent({type:`dispose`})}applyMatrix4(e){return this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale),this}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return _t.setFromAxisAngle(e,t),this.quaternion.multiply(_t),this}rotateOnWorldAxis(e,t){return _t.setFromAxisAngle(e,t),this.quaternion.premultiply(_t),this}rotateX(e){return this.rotateOnAxis(Ct,e)}rotateY(e){return this.rotateOnAxis(wt,e)}rotateZ(e){return this.rotateOnAxis(Tt,e)}translateOnAxis(e,t){return gt.copy(e).applyQuaternion(this.quaternion),this.position.add(gt.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Ct,e)}translateY(e){return this.translateOnAxis(wt,e)}translateZ(e){return this.translateOnAxis(Tt,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(vt.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?yt.copy(e):yt.set(e,t,n);let r=this.parent;this.updateWorldMatrix(!0,!1),bt.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?vt.lookAt(bt,yt,this.up):vt.lookAt(yt,bt,this.up),this.quaternion.setFromRotationMatrix(vt),r&&(vt.extractRotation(r.matrixWorld),_t.setFromRotationMatrix(vt),this.quaternion.premultiply(_t.invert()))}add(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return e===this||e&&e.isObject3D&&(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Et),Ot.child=e,this.dispatchEvent(Ot),Ot.child=null),this}remove(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.remove(arguments[e]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Dt),kt.child=e,this.dispatchEvent(kt),kt.child=null),this}removeFromParent(){return this.parent!==null&&this.parent.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),vt.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),vt.multiply(e.parent.matrixWorld)),e.applyMatrix4(vt),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Et),this}getObjectById(e){return this.getObjectByProperty(`id`,e)}getObjectByName(e){return this.getObjectByProperty(`name`,e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n of this.children){let r=n.getObjectByProperty(e,t);if(r!==void 0)return r}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);for(let r of this.children)r.getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(bt,e,xt),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(bt,St,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}traverse(e){e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,r=t.length;n<r;n++){let r=t[n];(r.matrixWorldAutoUpdate===!0||e===!0)&&r.updateMatrixWorld(e)}}updateWorldMatrix(e,t){let n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(n===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(n.matrixWorld,this.matrix)),t===!0){let e=this.children;for(let t=0,n=e.length;t<n;t++)e[t].matrixWorldAutoUpdate===!0&&e[t].updateWorldMatrix(!1,!0)}}clone(e){return new this.constructor().copy(this,e)}copy(t,n=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,t.onBeforeRender!==e.prototype.onBeforeRender&&(this.onBeforeRender=t.onBeforeRender),this.userData=JSON.parse(JSON.stringify(t.userData)),n===!0)for(let e of t.children)this.add(e.clone());return this}};At.DEFAULT_UP=new N(0,1,0),At.DEFAULT_MATRIX_AUTO_UPDATE=!0,At.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0,At.prototype.isObject3D=!0;var jt=class extends At{constructor(){super(),this.type=`Group`}};jt.prototype.isGroup=!0;var Mt=class extends At{constructor(){super(),this.type=`Scene`,this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new me,this.environmentIntensity=1,this.environmentRotation=new me,this.overrideMaterial=null}copy(e,t){return super.copy(e,t),this.background=e.background,this.environment=e.environment,this.fog=e.fog,this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentRotation.copy(e.environmentRotation),this.environmentIntensity=e.environmentIntensity,this.overrideMaterial=e.overrideMaterial,this.matrixAutoUpdate=e.matrixAutoUpdate,this}};Mt.prototype.isScene=!0;var Nt=35044,Pt=35048,Ft=new N,It=new j,Lt={getComponent(e,t){let n=this.array[this._idx(e,t)];return this.normalized?O(n,this.array):n},setComponent(e,t,n){return this.array[this._idx(e,t)]=this.normalized?k(n,this.array):n,this},getX(e){return this.getComponent(e,0)},getY(e){return this.getComponent(e,1)},getZ(e){return this.getComponent(e,2)},getW(e){return this.getComponent(e,3)},setX(e,t){return this.setComponent(e,0,t)},setY(e,t){return this.setComponent(e,1,t)},setZ(e,t){return this.setComponent(e,2,t)},setW(e,t){return this.setComponent(e,3,t)},setXY(e,t,n){return this.setComponent(e,0,t),this.setComponent(e,1,n)},setXYZ(e,t,n,r){return this.setComponent(e,0,t),this.setComponent(e,1,n),this.setComponent(e,2,r)},setXYZW(e,t,n,r,i){return this.setComponent(e,0,t),this.setComponent(e,1,n),this.setComponent(e,2,r),this.setComponent(e,3,i)},applyMatrix3(e){if(this.itemSize===2)for(let t=0;t<this.count;t++)It.fromBufferAttribute(this,t).applyMatrix3(e),this.setXY(t,It.x,It.y);else if(this.itemSize===3)for(let t=0;t<this.count;t++)Ft.fromBufferAttribute(this,t).applyMatrix3(e),this.setXYZ(t,Ft.x,Ft.y,Ft.z);return this},applyMatrix4(e){for(let t=0;t<this.count;t++)Ft.fromBufferAttribute(this,t).applyMatrix4(e),this.setXYZ(t,Ft.x,Ft.y,Ft.z);return this},applyNormalMatrix(e){for(let t=0;t<this.count;t++)Ft.fromBufferAttribute(this,t).applyNormalMatrix(e),this.setXYZ(t,Ft.x,Ft.y,Ft.z);return this},transformDirection(e){for(let t=0;t<this.count;t++)Ft.fromBufferAttribute(this,t).transformDirection(e),this.setXYZ(t,Ft.x,Ft.y,Ft.z);return this}},Rt=class extends pt{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw TypeError(`BufferAttribute: array should be a Typed Array.`);this.name=``,this.array=e,this.itemSize=t,this.count=e===void 0?0:e.length/t,this.normalized=n,this.usage=Nt,this.updateRanges=[],this.gpuType=1015,this.version=0,this.onUploadCallback=zt}set needsUpdate(e){e===!0&&this.version++}_idx(e,t){return e*this.itemSize+t}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}onUpload(e){return this.onUploadCallback=e,this}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){let r=this.itemSize;e*=r,n*=t.itemSize;for(let i=0;i<r;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}set(e,t=0){return this.array.set(e,t),this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}dispose(){this.dispatchEvent({type:`dispose`})}};Object.assign(Rt.prototype,Lt),Rt.prototype.isBufferAttribute=!0;function zt(){}var Bt=class extends Rt{constructor(e,t,n){super(new Uint16Array(e),t,n)}},Vt=class extends Rt{constructor(e,t,n){super(new Uint32Array(e),t,n)}},Ht=class extends Rt{constructor(e,t,n){super(new Float32Array(e),t,n)}},Ut=class e extends Rt{constructor(e,t,n,r=1){super(e,t,n),this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}clone(){return new e(this.array,this.itemSize).copy(this)}};Ut.prototype.isInstancedBufferAttribute=!0;var Wt=class extends pt{constructor(e,t){super(),this.array=e,this.stride=t,this.count=e===void 0?0:e.length/t,this.usage=Nt,this.updateRanges=[],this.version=0,this.uuid=c(),this.onUploadCallback=zt}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}set(e,t=0){return this.array.set(e,t),this}onUpload(e){return this.onUploadCallback=e,this}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let r=0;r<this.stride;r++)this.array[e+r]=t.array[n+r];return this}clone(){return new this.constructor(new this.array.constructor(this.array),this.stride).copy(this)}dispose(){this.dispatchEvent({type:`dispose`})}};Wt.prototype.isInterleavedBuffer=!0;var Gt=class e extends Wt{constructor(e,t,n=1){super(e,t),this.meshPerAttribute=n}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}clone(){return new e(new this.array.constructor(this.array),this.stride,this.meshPerAttribute)}};Gt.prototype.isInstancedInterleavedBuffer=!0;var Kt=class{constructor(e,t,n,r=!1){this.name=``,this.data=e,this.itemSize=t,this.offset=n,this.normalized=r}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}_idx(e,t){return e*this.data.stride+this.offset+t}clone(){let e=new this.array.constructor(this.count*this.itemSize);for(let t=0;t<this.count;t++)for(let n=0;n<this.itemSize;n++)e[t*this.itemSize+n]=this.array[this._idx(t,n)];return new Rt(e,this.itemSize,this.normalized)}};Object.assign(Kt.prototype,Lt),Kt.prototype.isInterleavedBufferAttribute=!0;var qt=0,Jt=new F,Yt=new ge,Xt=new M,Zt=new Ae,Qt=new N,$t=new N;function en(e){for(let t=e.length-1;t>=0;--t)if(e[t]>=65535)return!0;return!1}var tn=class e extends pt{constructor(){super(),Object.defineProperty(this,"id",{value:qt++}),this.uuid=c(),this.name=``,this.type=`BufferGeometry`,this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return this.index=Array.isArray(e)?new(en(e)?Vt:Bt)(e,1):e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this.attributesVersion=(this.attributesVersion||0)+1,this}deleteAttribute(e){return delete this.attributes[e],this.attributesVersion=(this.attributesVersion||0)+1,this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;n!==void 0&&(n.applyNormalMatrix(Yt.getNormalMatrix(e)),n.needsUpdate=!0);let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return this.applyMatrix4(Jt.makeRotationFromQuaternion(e))}rotateX(e){return this.applyMatrix4(Jt.makeRotationX(e))}rotateY(e){return this.applyMatrix4(Jt.makeRotationY(e))}rotateZ(e){return this.applyMatrix4(Jt.makeRotationZ(e))}translate(e,t,n){return this.applyMatrix4(Jt.makeTranslation(e,t,n))}scale(e,t,n){return this.applyMatrix4(Jt.makeScale(e,t,n))}lookAt(e){return Jt.lookAt(e,Qt.set(0,0,0),new N(0,1,0)),Xt.setFromRotationMatrix(Jt),this.applyQuaternion(Xt)}center(){return this.computeBoundingBox(),this.boundingBox.getCenter($t).negate(),this.translate($t.x,$t.y,$t.z)}setFromPoints(e){let t=[];for(let n of e)t.push(n.x,n.y,n.z||0);return this.setAttribute(`position`,new Ht(t,3))}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ae);let e=this.attributes.position;if(e===void 0){this.boundingBox.makeEmpty();return}this.boundingBox.setFromBufferAttribute(e)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Pe);let e=this.attributes.position;if(e===void 0){this.boundingSphere.makeEmpty();return}let t=this.boundingSphere.center;Zt.setFromBufferAttribute(e).getCenter(t);let n=0;for(let r=0;r<e.count;r++)n=Math.max(n,t.distanceToSquared(Qt.fromBufferAttribute(e,r)));this.boundingSphere.radius=Math.sqrt(n)}computeTangents(){let e=this.index,t=this.attributes.position,n=this.attributes.normal,r=this.attributes.uv;if(e===null||t===void 0||n===void 0||r===void 0){console.error(`BufferGeometry.computeTangents(): missing required attributes (index, position, normal or uv)`);return}let i=t.count;this.hasAttribute(`tangent`)===!1&&this.setAttribute(`tangent`,new Rt(new Float32Array(4*i),4));let a=this.getAttribute(`tangent`),o=[],s=[];for(let e=0;e<i;e++)o[e]=new N,s[e]=new N;let c=new N,l=new N,u=new N,d=new j,f=new j,p=new j,m=new N,h=new N,g=(e,n,i)=>{c.fromBufferAttribute(t,e),l.fromBufferAttribute(t,n),u.fromBufferAttribute(t,i),d.fromBufferAttribute(r,e),f.fromBufferAttribute(r,n),p.fromBufferAttribute(r,i),l.sub(c),u.sub(c),f.sub(d),p.sub(d);let a=1/(f.x*p.y-p.x*f.y);isFinite(a)&&(m.copy(l).multiplyScalar(p.y).addScaledVector(u,-f.y).multiplyScalar(a),h.copy(u).multiplyScalar(f.x).addScaledVector(l,-p.x).multiplyScalar(a),o[e].add(m),o[n].add(m),o[i].add(m),s[e].add(h),s[n].add(h),s[i].add(h))},_=this.groups.length?this.groups:[{start:0,count:e.count}];for(let t of _)for(let n=t.start;n<t.start+t.count;n+=3)g(e.getX(n),e.getX(n+1),e.getX(n+2));let v=new N,y=new N,b=new N,x=new N,S=e=>{y.fromBufferAttribute(n,e),b.copy(y);let t=o[e];v.copy(t).sub(y.multiplyScalar(y.dot(t))).normalize(),x.crossVectors(b,t);let r=x.dot(s[e])<0?-1:1;a.setXYZW(e,v.x,v.y,v.z,r)};for(let t of _)for(let n=t.start;n<t.start+t.count;n++)S(e.getX(n))}computeVertexNormals(){let e=this.index,t=this.getAttribute(`position`);if(t===void 0)return;let n=this.getAttribute(`normal`);if(n===void 0||n.count!==t.count)n=new Rt(new Float32Array(t.count*3),3),this.setAttribute(`normal`,n);else for(let e=0;e<n.count;e++)n.setXYZ(e,0,0,0);let r=new N,i=new N,a=new N,o=new N,s=new N,c=new N,l=new N,u=new N;if(e)for(let d=0,f=e.count;d<f;d+=3){let f=e.getX(d),p=e.getX(d+1),m=e.getX(d+2);r.fromBufferAttribute(t,f),i.fromBufferAttribute(t,p),a.fromBufferAttribute(t,m),o.subVectors(a,i),s.subVectors(r,i),o.cross(s),c.fromBufferAttribute(n,f),l.fromBufferAttribute(n,p),u.fromBufferAttribute(n,m),c.add(o),l.add(o),u.add(o),n.setXYZ(f,c.x,c.y,c.z),n.setXYZ(p,l.x,l.y,l.z),n.setXYZ(m,u.x,u.y,u.z)}else for(let e=0,c=t.count;e<c;e+=3)r.fromBufferAttribute(t,e),i.fromBufferAttribute(t,e+1),a.fromBufferAttribute(t,e+2),o.subVectors(a,i),s.subVectors(r,i),o.cross(s),n.setXYZ(e,o.x,o.y,o.z),n.setXYZ(e+1,o.x,o.y,o.z),n.setXYZ(e+2,o.x,o.y,o.z);this.normalizeNormals(),n.needsUpdate=!0}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Qt.fromBufferAttribute(e,t).normalize(),e.setXYZ(t,Qt.x,Qt.y,Qt.z)}toNonIndexed(){if(this.index===null)return console.warn(`BufferGeometry.toNonIndexed(): geometry is already non-indexed.`),this;let t=new e,n=this.index,r=e=>{let t=e.itemSize,r=new e.array.constructor(n.count*t);for(let i=0;i<n.count;i++){let a=n.getX(i);for(let n=0;n<t;n++)r[i*t+n]=e.array[e._idx(a,n)]}return new Rt(r,t,e.normalized)};for(let e in this.attributes)t.setAttribute(e,r(this.attributes[e]));for(let e in this.morphAttributes)t.morphAttributes[e]=this.morphAttributes[e].map(r);t.morphTargetsRelative=this.morphTargetsRelative;for(let e of this.groups)t.addGroup(e.start,e.count,e.materialIndex);return t}clone(){return new e().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.name=e.name,e.index!==null&&this.setIndex(e.index.clone());for(let t in e.attributes)this.setAttribute(t,e.attributes[t].clone());for(let t in e.morphAttributes)this.morphAttributes[t]=e.morphAttributes[t].map(e=>e.clone());this.morphTargetsRelative=e.morphTargetsRelative;for(let t of e.groups)this.addGroup(t.start,t.count,t.materialIndex);return e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:`dispose`})}};tn.prototype.isBufferGeometry=!0;var nn=class e extends tn{constructor(){super(),this.type=`InstancedBufferGeometry`,this.instanceCount=1/0}copy(e){return super.copy(e),this.instanceCount=e.instanceCount,this}clone(){return new e().copy(this)}};nn.prototype.isInstancedBufferGeometry=!0;var rn=class extends At{constructor(e=new tn,t=null){super(),this.type=`Mesh`,this.geometry=e,this.material=t,this.count=1}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this.count=e.count,this}};rn.prototype.isMesh=!0;var an=new F,on=new Ae,sn=new Pe,cn=class e extends rn{constructor(e,t,n){super(e,t),this.type=`InstancedMesh`,this.instanceMatrix=new Ut(new Float32Array(n*16),16),this.instanceColor=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let e=0;e<n;e++)this.setMatrixAt(e,an.identity())}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}getColorAt(e,t){return t.fromArray(this.instanceColor.array,e*3)}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Ut(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}computeBoundingBox(){let e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Ae),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let t=0;t<this.count;t++)this.getMatrixAt(t,an),on.copy(e.boundingBox).applyMatrix4(an),this.boundingBox.union(on)}computeBoundingSphere(){let e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Pe),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let t=0;t<this.count;t++)this.getMatrixAt(t,an),sn.copy(e.boundingSphere).applyMatrix4(an),this.boundingSphere.union(sn)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}clone(t){return new e(this.geometry,this.material,this.count).copy(this,t)}dispose(){this.dispatchEvent({type:`dispose`})}};cn.prototype.isInstancedMesh=!0;var ln=new N,un=new j,dn=new j,fn=class extends At{constructor(){super(),this.type=`Camera`,this.matrixWorldInverse=new F,this.projectionMatrix=new F,this.projectionMatrixInverse=new F,this.coordinateSystem=ne,this.reversedDepth=!0}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this.reversedDepth=e.reversedDepth,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}};fn.prototype.isCamera=!0;function pn(e,t,n,r,i,a,o){e.view===null&&(e.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1});let s=e.view;s.enabled=!0,s.fullWidth=t,s.fullHeight=n,s.offsetX=r,s.offsetY=i,s.width=a,s.height=o,e.updateProjectionMatrix()}var mn=class extends fn{constructor(e=50,t=1,n=.1,r=2e3){super(),this.type=`PerspectiveCamera`,this.fov=e,this.zoom=1,this.near=n,this.far=r,this.infiniteFar=!1,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.infiniteFar=e.infiniteFar,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=o*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){return .5*this.getFilmHeight()/Math.tan(a*.5*this.fov)}getEffectiveFOV(){return o*2*Math.atan(Math.tan(a*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){ln.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(ln.x,ln.y).multiplyScalar(-e/ln.z),ln.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(ln.x,ln.y).multiplyScalar(-e/ln.z)}getViewSize(e,t){return this.getViewBounds(e,un,dn),t.subVectors(dn,un)}setViewOffset(e,t,n,r,i,a){this.aspect=e/t,pn(this,e,t,n,r,i,a)}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(a*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,i=-.5*r,o=this.view;if(o!==null&&o.enabled){let e=o.fullWidth,a=o.fullHeight;i+=o.offsetX*r/e,t-=o.offsetY*n/a,r*=o.width/e,n*=o.height/a}let s=this.filmOffset;s!==0&&(i+=e*s/this.getFilmWidth());let c=this.infiniteFar?1/0:this.far;this.projectionMatrix.makePerspective(i,i+r,t,t-n,e,c,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}};mn.prototype.isPerspectiveCamera=!0;var hn=class extends fn{constructor(e=-1,t=1,n=1,r=-1,i=.1,a=2e3){super(),this.type=`OrthographicCamera`,this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=i,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,i,a){pn(this,e,t,n,r,i,a)}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2,i=n-e,a=n+e,o=r+t,s=r-t,c=this.view;if(c!==null&&c.enabled){let e=(this.right-this.left)/c.fullWidth/this.zoom,t=(this.top-this.bottom)/c.fullHeight/this.zoom;i+=e*c.offsetX,a=i+e*c.width,o-=t*c.offsetY,s=o-t*c.height}this.projectionMatrix.makeOrthographic(i,a,o,s,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}};hn.prototype.isOrthographicCamera=!0;var gn=e=>Math.atan2(e.z,-e.x),_n=e=>Math.atan2(-e.y,Math.sqrt(e.x*e.x+e.z*e.z)),vn=class extends tn{constructor(e=[],t=[],n=1,r=0){super(),this.type=`PolyhedronGeometry`,this.parameters={vertices:e,indices:t,radius:n,detail:r};let i=[],a=[],o=e=>i.push(e.x,e.y,e.z),s=(t,n)=>n.set(e[t*3],e[t*3+1],e[t*3+2]),c=(e,t,n,r)=>{let i=r+1,a=[];for(let r=0;r<=i;r++){a[r]=[];let o=e.clone().lerp(n,r/i),s=t.clone().lerp(n,r/i),c=i-r;for(let e=0;e<=c;e++)a[r][e]=e===0&&r===i?o:o.clone().lerp(s,e/c)}for(let e=0;e<i;e++)for(let t=0;t<2*(i-e)-1;t++){let n=Math.floor(t/2);t%2==0?(o(a[e][n+1]),o(a[e+1][n]),o(a[e][n])):(o(a[e][n+1]),o(a[e+1][n+1]),o(a[e+1][n]))}},l=new N,u=new N,d=new N;for(let e=0;e<t.length;e+=3)s(t[e],l),s(t[e+1],u),s(t[e+2],d),c(l,u,d,r);let f=new N;for(let e=0;e<i.length;e+=3)f.fromArray(i,e).normalize().multiplyScalar(n),i[e]=f.x,i[e+1]=f.y,i[e+2]=f.z;for(let e=0;e<i.length;e+=3)f.fromArray(i,e),a.push(gn(f)/2/Math.PI+.5,1-(_n(f)/Math.PI+.5));let p=new N,m=new N,h=new N,g=new N,_=new j,v=new j,y=new j,b=(e,t,n,r)=>{r<0&&e.x===1&&(a[t]=e.x-1),n.x===0&&n.z===0&&(a[t]=r/2/Math.PI+.5)};for(let e=0,t=0;e<i.length;e+=9,t+=6){p.fromArray(i,e),m.fromArray(i,e+3),h.fromArray(i,e+6),_.fromArray(a,t),v.fromArray(a,t+2),y.fromArray(a,t+4),g.copy(p).add(m).add(h).divideScalar(3);let n=gn(g);b(_,t,p,n),b(v,t+2,m,n),b(y,t+4,h,n)}for(let e=0;e<a.length;e+=6){let t=a[e],n=a[e+2],r=a[e+4];Math.max(t,n,r)>.9&&Math.min(t,n,r)<.1&&(t<.2&&(a[e]+=1),n<.2&&(a[e+2]+=1),r<.2&&(a[e+4]+=1))}this.setAttribute(`position`,new Ht(i,3)),this.setAttribute(`normal`,new Ht(i.slice(),3)),this.setAttribute(`uv`,new Ht(a,2)),r===0?this.computeVertexNormals():this.normalizeNormals()}},yn=(1+Math.sqrt(5))/2,bn=[-1,yn,0,1,yn,0,-1,-yn,0,1,-yn,0,0,-1,yn,0,1,yn,0,-1,-yn,0,1,-yn,yn,0,-1,yn,0,1,-yn,0,-1,-yn,0,1],xn=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1],Sn=class extends vn{constructor(e=1,t=0){super(bn,xn,e,t),this.type=`IcosahedronGeometry`,this.parameters={radius:e,detail:t}}};new N;function Cn(e=globalThis.location?.search||``){let t=new URLSearchParams(e),n=t.has(`renderReference`),r=t.get(`world`)===`rocha`;return{reference:n,bindingReuse:r&&!n&&!t.has(`noRenderV2`)&&!t.has(`noBindingReuse`),framePacing:r&&!n&&!t.has(`noRenderV2`)&&!t.has(`noFramePacing`),compactTargets:!n&&!t.has(`noCompactSceneTargets`)&&(r||t.has(`compactSceneTargets`)),depthRotation:!n&&!t.has(`noDepthRotation`)&&(r||t.has(`depthRotation`)),tiledTAA:!n&&t.has(`tiledTAA`)&&!t.has(`noTiledTAA`)}}function wn(e){return[`rgba16float`,e?`rg16float`:`rgba16float`,e?`rg8unorm`:`rgba8unorm`]}function Tn(e,t,n=!0){if(e===t||e.format!==t.format||e.width!==t.width||e.height!==t.height)throw Error(`Depth rotation requires distinct, matching depth textures`);let r=e.getGPU();e.gpu=t.getGPU(),t.gpu=r,n&&([e._views,t._views]=[t._views,e._views]);for(let r of[e,t])r.version++,n||r._views.clear()}var I={device:null,queue:null,adapter:null,context:null,canvas:null,format:`bgra8unorm`,features:new Set,limits:null,hasTimestamp:!1,hasFloat32Filterable:!1,encoder:null,frame:0,samplers:null,_submitHooks:[],async init({canvas:e=null,requiredLimits:t={},headless:n=!1}={}){if(!navigator.gpu)throw Error(`WebGPU is not available in this browser.`);let r=await navigator.gpu.requestAdapter({powerPreference:`high-performance`});if(!r)throw Error(`No WebGPU adapter found.`);this.adapter=r;let i=r.limits,a={maxSampledTexturesPerShaderStage:32,maxSamplersPerShaderStage:16,maxStorageBuffersPerShaderStage:10,maxStorageTexturesPerShaderStage:8,maxComputeWorkgroupStorageSize:32768,maxColorAttachmentBytesPerSample:64,maxStorageBuffersInVertexStage:4,maxStorageBuffersInFragmentStage:8,maxStorageTexturesInFragmentStage:4,maxBindingsPerBindGroup:1e3,maxBufferSize:1073741824,maxStorageBufferBindingSize:536870912,...t},o={};for(let e in a)i[e]!==void 0&&(o[e]=Math.min(a[e],i[e]));let s=[`float32-filterable`,`timestamp-query`,`rg11b10ufloat-renderable`,`float32-blendable`,`shader-f16`,`clip-distances`].filter(e=>r.features.has(e));this.features=new Set(s),this.hasTimestamp=this.features.has(`timestamp-query`),this.hasFloat32Filterable=this.features.has(`float32-filterable`);let c=await r.requestDevice({requiredFeatures:s,requiredLimits:o});return this.device=c,this.queue=c.queue,this.limits=c.limits,c.lost.then(e=>console.error(`WebGPU device lost:`,e.message)),c.addEventListener&&c.addEventListener(`uncapturederror`,e=>console.error(`WebGPU:`,e.error.message.split(`
`).slice(0,6).join(`
`))),e&&!n&&(this.canvas=e,this.context=e.getContext(`webgpu`),this.format=navigator.gpu.getPreferredCanvasFormat(),this.context.configure({device:c,format:this.format,alphaMode:`opaque`,usage:GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.COPY_DST})),this._createSamplers(),this},_createSamplers(){let e=this.device,t=t=>e.createSampler(t),n={magFilter:`linear`,minFilter:`linear`,mipmapFilter:`linear`};this.samplers={linearRepeat:t({...n,addressModeU:`repeat`,addressModeV:`repeat`,addressModeW:`repeat`}),linearClamp:t({...n,addressModeU:`clamp-to-edge`,addressModeV:`clamp-to-edge`,addressModeW:`clamp-to-edge`}),linearMirror:t({...n,addressModeU:`mirror-repeat`,addressModeV:`mirror-repeat`,addressModeW:`mirror-repeat`}),anisoRepeat:t({...n,addressModeU:`repeat`,addressModeV:`repeat`,addressModeW:`repeat`,maxAnisotropy:8}),aniso4Repeat:t({...n,addressModeU:`repeat`,addressModeV:`repeat`,addressModeW:`repeat`,maxAnisotropy:4}),anisoClamp:t({...n,addressModeU:`clamp-to-edge`,addressModeV:`clamp-to-edge`,maxAnisotropy:8}),nearestClamp:t({magFilter:`nearest`,minFilter:`nearest`,mipmapFilter:`nearest`,addressModeU:`clamp-to-edge`,addressModeV:`clamp-to-edge`,addressModeW:`clamp-to-edge`}),nearestRepeat:t({magFilter:`nearest`,minFilter:`nearest`,mipmapFilter:`nearest`,addressModeU:`repeat`,addressModeV:`repeat`,addressModeW:`repeat`}),shadow:t({magFilter:`linear`,minFilter:`linear`,compare:`less`,addressModeU:`clamp-to-edge`,addressModeV:`clamp-to-edge`})}},beginFrame(){return this.frame++,this.getEncoder()},getEncoder(){return this.encoder||=this.device.createCommandEncoder(),this.encoder},submit(){if(!this.encoder)return;let e=this._submitHooks;this._submitHooks=[];for(let t of e)t.before&&t.before(this.encoder);this.queue.submit([this.encoder.finish()]),this.encoder=null;for(let t of e)t.after&&t.after()},onSubmit(e,t){this._submitHooks.push({before:e,after:t})},_pending:new Set,syncCompiles:[],renderPipeline(e){return this._async(e,`render`)},computePipeline(e){return this._async(e,`compute`)},_async(e,t){let n={pipeline:null,label:e.label,desc:e,kind:t,failed:!1},r=Promise.resolve().then(()=>{if(!n.pipeline)return(t===`render`?this.device.createRenderPipelineAsync:this.device.createComputePipelineAsync).call(this.device,e).then(e=>{n.pipeline||=e,n.desc=null},t=>{n.failed=!0,console.error(`WebGPU: pipeline "${e.label}" failed: ${t.message.split(`
`).slice(0,6).join(`
`)}`)})}).finally(()=>this._pending.delete(r));return this._pending.add(r),n},ready(e){return e.pipeline||e.failed?e.pipeline:(this.syncCompiles.push(e.label),e.pipeline=e.kind===`render`?this.device.createRenderPipeline(e.desc):this.device.createComputePipeline(e.desc),e.pipeline)},async pipelinesReady(){for(;this._pending.size;)await Promise.all([...this._pending])},computePass(e,t,n){let r=this.getEncoder().beginComputePass({label:e,timestampWrites:n});t(r),r.end()}},En={r8unorm:{bytes:1,sample:`float`},rg8unorm:{bytes:2,sample:`float`},rgba8unorm:{bytes:4,sample:`float`},"rgba8unorm-srgb":{bytes:4,sample:`float`},bgra8unorm:{bytes:4,sample:`float`},r16float:{bytes:2,sample:`float`},rg16float:{bytes:4,sample:`float`},rgba16float:{bytes:8,sample:`float`},rg11b10ufloat:{bytes:4,sample:`float`},r32float:{bytes:4,sample:`unfilterable-float`},rg32float:{bytes:8,sample:`unfilterable-float`},rgba32float:{bytes:16,sample:`unfilterable-float`},r32uint:{bytes:4,sample:`uint`},rg32uint:{bytes:8,sample:`uint`},rgba32uint:{bytes:16,sample:`uint`},r32sint:{bytes:4,sample:`sint`},r8uint:{bytes:1,sample:`uint`},rgba8uint:{bytes:4,sample:`uint`},depth32float:{bytes:4,sample:`depth`},depth24plus:{bytes:4,sample:`depth`},"depth24plus-stencil8":{bytes:4,sample:`depth`}};function Dn(e){let t=En[e];if(!t)throw Error(`Unknown texture format `+e);return t}function On(e){let t=Dn(e).sample;return t===`unfilterable-float`&&I.hasFloat32Filterable?`float`:t}var kn=class{constructor(e){this.pass=e,this.vertices=[],this.indexBuffer=null,this.indexFormat=null,this.drawGroup=null,this.drawOffset=-1,this.offsets=new Uint32Array(1)}bindObject(e,t){(e!==this.drawGroup||t!==this.drawOffset)&&(this.offsets[0]=t,this.pass.setBindGroup(2,e,this.offsets,0,1),this.drawGroup=e,this.drawOffset=t)}bindVertex(e,t){this.vertices[e]!==t&&(this.pass.setVertexBuffer(e,t),this.vertices[e]=t)}bindIndex(e,t){(this.indexBuffer!==e||this.indexFormat!==t)&&(this.pass.setIndexBuffer(e,t),this.indexBuffer=e,this.indexFormat=t)}},An={f32:{size:4,align:4,n:1},i32:{size:4,align:4,n:1,int:!0},u32:{size:4,align:4,n:1,uint:!0},vec2f:{size:8,align:8,n:2},vec3f:{size:12,align:16,n:3},vec4f:{size:16,align:16,n:4},vec2i:{size:8,align:8,n:2,int:!0},vec4i:{size:16,align:16,n:4,int:!0},vec2u:{size:8,align:8,n:2,uint:!0},vec4u:{size:16,align:16,n:4,uint:!0},mat3x3f:{size:48,align:16,n:12,mat3:!0},mat4x4f:{size:64,align:16,n:16}};function jn(e){let t=/^(\w+)(?:\[(\d+)\])?$/.exec(e);if(!t||!An[t[1]])throw Error(`Unsupported uniform type `+e);let n=An[t[1]],r=t[2]?Number(t[2]):0;if(r&&n.align<16)throw Error(`uniform array ${e}: element must be 16-byte aligned (use vec4f)`);return{name:t[1],base:n,count:r}}function Mn(e,t,n,r,i,a){let{base:o}=i,s=o.int?n:o.uint?t:e;if(typeof a==`number`||typeof a==`boolean`){s[r]=Number(a);return}if(a!=null){if(a.isMatrix4||a.isMatrix3){let t=a.elements;if(o.mat3){if(t.length===9)for(let n=0;n<3;n++)for(let i=0;i<3;i++)e[r+n*4+i]=t[n*3+i];else for(let n=0;n<3;n++)for(let i=0;i<3;i++)e[r+n*4+i]=t[n*4+i]}else for(let n=0;n<16;n++)e[r+n]=t[n];return}if(a.isColor){s[r]=a.r,s[r+1]=a.g,s[r+2]=a.b,o.n===4&&(s[r+3]=1);return}if(a.isVector2){s[r]=a.x,s[r+1]=a.y;return}if(a.isVector3){s[r]=a.x,s[r+1]=a.y,s[r+2]=a.z;return}if(a.isVector4||a.isQuaternion){s[r]=a.x,s[r+1]=a.y,s[r+2]=a.z,s[r+3]=a.w;return}if(ArrayBuffer.isView(a)||Array.isArray(a)){for(let e=0;e<Math.min(a.length,o.n);e++)s[r+e]=a[e];return}throw Error(`Cannot write uniform value `+a)}}var Nn=0,L=class{constructor(e,t,{label:n}={}){this.structName=e,this.label=n||e,this.id=Nn++,this.layout={},this.fields={},this.order=[];let r=0,i=16;for(let e in t){let n=t[e],a=Array.isArray(n)?n[0]:n,o=Array.isArray(n)?n[1]:void 0,s=jn(a),c=s.base.align;i=Math.max(i,c),r=Math.ceil(r/c)*c;let l=s.count?Math.ceil(s.base.size/16)*16:s.base.size,u=s.count?l*s.count:s.base.size;this.layout[e]={offset:r,type:s,typeStr:a,stride:l,size:u},this.order.push(e),this.fields[e]={value:o===void 0?Pn(s):o},r+=u}this.byteLength=Math.max(16,Math.ceil(r/i)*i),this.data=new ArrayBuffer(this.byteLength),this.f32=new Float32Array(this.data),this.u32=new Uint32Array(this.data),this.i32=new Int32Array(this.data),this.buffer=null,this.version=0;let a=this;this.values=new Proxy({},{get:(e,t)=>a.fields[t]&&a.fields[t].value,set:(e,t,n)=>(a.set(t,n),!0)})}get wgsl(){let e=`struct ${this.structName} {\n`;for(let t of this.order){let{type:n}=this.layout[t];e+=n.count?`\t${t}: array<${n.name}, ${n.count}>,\n`:`\t${t}: ${n.name},\n`}return e+`};
`}set(e,t){let n=this.fields[e];if(!n)throw Error(`${this.structName}: no uniform ${e}`);n.value&&typeof n.value==`object`&&!Array.isArray(n.value)&&n.value.copy&&t&&t.constructor===n.value.constructor?n.value.copy(t):n.value=t}get(e){return this.fields[e].value}_pack(){this.onBeforePack&&this.onBeforePack(this);let{f32:e,u32:t,i32:n,fields:r}=this,i=this._plan||this._makePlan();for(let a=0;a<i.length;a++){let{name:o,o:s,type:c,stride:l,count:u,n:d}=i[a],f=r[o].value;if(typeof f==`number`){(c.base.int?n:c.base.uint?t:e)[s]=f;continue}if(u){if(!f)continue;if(typeof f[0]==`number`){let r=c.base.int?n:c.base.uint?t:e,i=Math.min(u,f.length/d);for(let e=0;e<i;e++){let t=s+e*l,n=e*d,i=Math.min(d,f.length-n);for(let e=0;e<i;e++)r[t+e]=f[n+e]}}else{let r=Math.min(u,f.length);for(let i=0;i<r;i++)Mn(e,t,n,s+i*l,c,f[i])}}else Mn(e,t,n,s,c,f)}}_makePlan(){return this._plan=this.order.map(e=>{let{offset:t,type:n,stride:r}=this.layout[e];return{name:e,o:t/4,type:n,stride:r/4,count:n.count,n:n.base.n}}),this._plan}getBuffer(){return this.buffer||(this.buffer=I.device.createBuffer({label:this.label,size:this.byteLength,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST}),this._last=new Uint32Array(this.byteLength/4),this._last.fill(4294967295),this._hasUploaded=!1),this.buffer}upload(e){if(e!==void 0&&e===this._token&&this.buffer)return this.buffer;this._token=e;let t=this.getBuffer();this._pack();let n=this.u32,r=this._last;if(!this._hasUploaded)return I.queue.writeBuffer(t,0,this.data),r.set(n),this._hasUploaded=!0,t;let i=0;for(;i<n.length&&n[i]===r[i];)i++;if(i<n.length){let e=n.length;if(n.length>=64)for(;e>i+1&&n[e-1]===r[e-1];)e--;else i=0;I.queue.writeBuffer(t,i*4,this.data,i*4,(e-i)*4),r.set(n)}return t}};function Pn(e){return e.count?null:e.base.n===1?0:Array(e.base.n).fill(0)}var Fn=[[`smpLinearRepeat`,`linearRepeat`,`filtering`],[`smpLinearClamp`,`linearClamp`,`filtering`],[`smpLinearMirror`,`linearMirror`,`filtering`],[`smpAnisoRepeat`,`anisoRepeat`,`filtering`],[`smpAnisoClamp`,`anisoClamp`,`filtering`],[`smpAniso4Repeat`,`aniso4Repeat`,`filtering`],[`smpNearestClamp`,`nearestClamp`,`non-filtering`],[`smpNearestRepeat`,`nearestRepeat`,`non-filtering`],[`smpShadow`,`shadow`,`comparison`]],In=0,R=class{constructor({name:e,deps:t=[],code:n=``,bindings:r={},uniforms:i=null,uniformName:a=null}){this.id=In++,this.name=e||`module`+this.id,this.deps=t.filter(Boolean),this.code=n,this.bindings={...r},i&&(this.bindings[a||Ln(i.structName)]={uniform:i}),this.isShaderModule=!0}};function Ln(e){return e[0].toLowerCase()+e.slice(1)}function Rn(e){let t=[],n=new Set,r=e=>{if(e&&!n.has(e)){n.add(e);for(let t of e.deps)r(t);t.push(e)}};for(let t of e)r(t);return t}function zn(e,t={}){let n=e.split(`
`),r=[],i=[],a=()=>i.length===0||i[i.length-1].active,o=e=>{e=e.trim();let n;if(n=/^!\s*(\w+)$/.exec(e))return!Bn(t[n[1]]);if(n=/^(\w+)\s*(==|!=|>=|<=|>|<)\s*([\w.'"-]+)$/.exec(e)){let e=t[n[1]],r=n[3].replace(/^['"]|['"]$/g,``);switch(!isNaN(Number(r))&&typeof e==`number`&&(r=Number(r)),n[2]){case`==`:return e==r;case`!=`:return e!=r;case`>=`:return e>=r;case`<=`:return e<=r;case`>`:return e>r;case`<`:return e<r}}return/\|\|/.test(e)?e.split(`||`).some(e=>o(e)):/&&/.test(e)?e.split(`&&`).every(e=>o(e)):Bn(t[e])};for(let e of n){let n=e.trim(),s;if(s=/^#(if|ifdef|ifndef)\s+(.*)$/.exec(n)){let e=a(),n;n=s[1]===`ifdef`?t[s[2].trim()]!==void 0:s[1]===`ifndef`?t[s[2].trim()]===void 0:o(s[2]),i.push({active:e&&n,taken:n,parent:e});continue}if(s=/^#elif\s+(.*)$/.exec(n)){let e=i[i.length-1],t=!e.taken&&o(s[1]);e.active=e.parent&&t,e.taken=e.taken||t;continue}if(n===`#else`){let e=i[i.length-1];e.active=e.parent&&!e.taken,e.taken=!0;continue}if(n===`#endif`){i.pop();continue}a()&&r.push(e)}if(i.length)throw Error(`preprocess: unterminated #if`);return r.join(`
`)}function Bn(e){return e!=null&&e!==!1&&e!==0&&e!==`0`}function Vn(e){return typeof e==`function`?e():e}function Hn(e,t,n){let r=GPUShaderStage.VERTEX|GPUShaderStage.FRAGMENT,i=n===`compute`?GPUShaderStage.COMPUTE:r;if(t.uniform){let n=t.uniform;return{layout:{visibility:i,buffer:{type:`uniform`}},decl:`var<uniform> ${e}: ${n.structName};`,struct:n}}if(t.uniformBuffer)return{layout:{visibility:i,buffer:{type:`uniform`}},decl:`var<uniform> ${e}: ${t.wgslType};`};if(t.storage){let a=Vn(t.storage),o=t.access||`read`,s=t.wgslType||`array<${t.type||a.type}>`;return{layout:{visibility:n===`compute`?i:o===`read`?r:GPUShaderStage.FRAGMENT,buffer:{type:o===`read`?`read-only-storage`:`storage`}},decl:`var<storage, ${o===`read`?`read`:`read_write`}> ${e}: ${s};`}}if(t.storageTexture){let r=Vn(t.storageTexture),a=t.access||`write`,o=t.viewDimension||t.view?.dimension||r.defaultViewDimension;return{layout:{visibility:n===`compute`?i:GPUShaderStage.FRAGMENT,storageTexture:{access:a===`write`?`write-only`:a===`read`?`read-only`:`read-write`,format:r.format,viewDimension:o}},decl:`var ${e}: texture_storage_${o.replace(`-`,`_`)}<${r.format}, ${a}>;`}}if(t.texture){let n=Vn(t.texture),r=t.viewDimension||t.view?.dimension||n.defaultViewDimension,a=t.sampleType||n.sampleType,o=t.wgslType||n.wgslType(r);return t.sampleType===`unfilterable-float`&&n.isDepth&&(o=`texture_${r.replace(`-`,`_`)}<f32>`),{layout:{visibility:i,texture:{sampleType:a,viewDimension:r,multisampled:n.sampleCount>1}},decl:`var ${e}: ${o};`}}if(t.sampler)return{layout:{visibility:i,sampler:{type:t.samplerType||`filtering`}},decl:`var ${e}: ${t.samplerType===`comparison`?`sampler_comparison`:`sampler`};`};throw Error(`binding ${e}: unknown spec`)}function Un(e){if(e.uniform)return{buffer:e.uniform.getBuffer()};if(e.uniformBuffer)return{buffer:Vn(e.uniformBuffer)};if(e.storage){let t=Vn(e.storage),n=t.getGPU?t.getGPU():t;return e.offset===void 0?{buffer:n}:{buffer:n,offset:e.offset,size:e.size}}if(e.storageTexture)return Vn(e.storageTexture).view(e.view||{dimension:e.viewDimension||Vn(e.storageTexture).defaultViewDimension,mipLevelCount:1,baseMipLevel:e.mip||0});if(e.texture){let t=Vn(e.texture);return e.view||e.viewDimension?t.view({...e.view||{},dimension:e.viewDimension||e.view.dimension}):t.view()}if(e.sampler)return typeof e.sampler==`string`?I.samplers[e.sampler]:e.sampler;throw Error(`unknown binding`)}var Wn=0,Gn=1,Kn=2,qn=3,Jn=4;function Yn(e){return e.uniform?Wn:e.uniformBuffer?Gn:e.storage?Kn:e.storageTexture||e.texture?qn:Jn}var Xn=4,Zn=new WeakMap;function Qn(e,t){let n=JSON.stringify(e),r=Zn.get(I.device);r||(r=new Map,Zn.set(I.device,r));let i=r.get(n);return i||(i=I.device.createBindGroupLayout({label:t,entries:e}),r.set(n,i)),i}var $n=class{constructor(e,t,n=`bindings`,r=null,i=null){if(this.label=n,this.stage=t,this.names=Object.keys(e),this.specs=e,this.described=this.names.map(n=>Hn(n,e[n],t)),r)for(let e=0;e<this.names.length;e++){let t=this.described[e].layout,n=r[this.names[e]];n===`fragment`&&t.visibility&GPUShaderStage.FRAGMENT&&(t.visibility=GPUShaderStage.FRAGMENT),n===`vertex`&&t.visibility&GPUShaderStage.VERTEX&&(t.visibility=GPUShaderStage.VERTEX)}if(i)for(let e=0;e<this.names.length;e++){let t=this.described[e];i.has(this.names[e])&&(t.layout.buffer={type:`read-only-storage`},t.decl=t.decl.replace(/^var<uniform>/,`var<storage, read>`))}this.layout=Qn(this.described.map((e,t)=>({binding:t,...e.layout})),n),this._device=I.device,this.group=null;let a=this.names.length;this._specs=this.names.map(t=>e[t]),this._kinds=this._specs.map(Yn),this._blocks=this._specs.filter(e=>e.uniform).map(e=>e.uniform),this._objs=Array(a).fill(null),this._vers=Array(a).fill(0),this._entry=null,this._cache=[],this._token=null}declarations(e){return this.described.map((t,n)=>`@group(${e}) @binding(${n}) ${t.decl}`).join(`
`)}structs(){let e=[];for(let t of this.described)t.struct&&!e.includes(t.struct)&&e.push(t.struct);return e}getBindGroup(e){if(this._device!==I.device&&(this._device=I.device,this.layout=Qn(this.described.map((e,t)=>({binding:t,...e.layout})),this.label),this.group=this._entry=this._token=null,this._cache.length=0),e!==void 0&&e===this._token&&this.group)return this.group;this._token=e;let t=this._specs,n=this._kinds,r=this._objs,i=this._vers,a=t.length;for(let e=0;e<a;e++){let a=t[e],o=null,s=0;if(I.reuseAllocationBindings){let e=Un(a);o=e.buffer||e,e.buffer&&(e.offset!==void 0||e.size!==void 0)&&(s=`${e.offset??0}:${e.size??`all`}`)}else switch(n[e]){case Wn:o=a.uniform;break;case Gn:o=Vn(a.uniformBuffer);break;case Kn:o=Vn(a.storage),o.getGPU&&(o.getGPU(),s=o.version);break;case qn:o=Vn(a.storageTexture||a.texture),o&&o.getGPU&&(o.getGPU(),s=o.version);break;default:o=a.sampler}r[e]=o,i[e]=s}let o=this._blocks;for(let t=0;t<o.length;t++)o[t].upload(e);if(this._entry&&this._matches(this._entry))return this.group;let s=this._cache;for(let e=0;e<s.length;e++){let t=s[e];if(t!==this._entry&&this._matches(t))return this._entry=t,this.group=t.group,this.group}let c=Array(a);for(let e=0;e<a;e++)c[e]={binding:e,resource:Un(t[e])};return this.group=I.device.createBindGroup({label:this.label,layout:this.layout,entries:c}),this._entry={objs:r.slice(),vers:i.slice(),group:this.group},s.unshift(this._entry),s.length>Xn&&s.pop(),this.group}_matches(e){let t=this._objs,n=this._vers,r=e.objs,i=e.vers;for(let e=0;e<t.length;e++)if(t[e]!==r[e]||n[e]!==i[e])return!1;return!0}},er=null,tr=null;function nr(e){er=e,tr=null}function rr(e){if(tr||={},!tr[e]){let t={frame:{uniform:er}};for(let[e,n,r]of Fn)t[e]={sampler:n,samplerType:r};tr[e]=new $n(t,e,`group0-`+e)}return tr[e]}var ir=new WeakMap;function ar(e,t=`render`){if(e===er)return rr(t);let n=ir.get(e);if(n||ir.set(e,n={}),!n[t]){let r={frame:{uniform:e}};for(let[e,t,n]of Fn)r[e]={sampler:t,samplerType:n};n[t]=new $n(r,t,`group0-`+e.label)}return n[t]}function or({modules:e=[],bindings:t={},code:n=``,defines:r={},stage:i=`render`,label:a=`shader`,header:o=``}){let s=Rn(e),c={};for(let e of s)for(let t in e.bindings){if(c[t]&&c[t]!==e.bindings[t]&&!cr(c[t],e.bindings[t]))throw Error(`${a}: binding ${t} declared twice (${e.name})`);c[t]=e.bindings[t]}for(let e in t)c[e]=t[e];let l=null,u=null;if(i===`render`&&/@vertex\s+fn\s+vs\b/.test(n)){let e=``;for(let t of s)e+=t.code+`
`;let t=zn(e+n,r),i=sr(t,`vs`),a=/@fragment\s+fn\s+fs\b/.test(t)?sr(t,`fs`):null;l={};for(let e in c)!i.has(e)&&(!a||a.has(e))?l[e]=`fragment`:a&&!a.has(e)&&i.has(e)&&(l[e]=`vertex`);u=new Set;let o=I.limits||{},d=(o.maxUniformBuffersPerShaderStage||12)-2,f={vertex:o.maxStorageBuffersInVertexStage??4,fragment:o.maxStorageBuffersInFragmentStage??o.maxStorageBuffersPerShaderStage??8},p=(e,t)=>!l[e]||l[e]===t;for(let e of[`fragment`,`vertex`]){let t=Object.keys(c).filter(t=>c[t].uniform&&p(t,e)&&!u.has(t)),n=Object.keys(c).filter(t=>(c[t].storage||u.has(t))&&p(t,e)).length;t.sort((t,n)=>(l[t]===e?0:1)-(l[n]===e?0:1));let r=t.length;for(let i of t){if(r<=d||n>=f[e])break;u.add(i),n++,r--}}}let d=new $n(c,i,a+`.g1`,l,u),f=rr(i),p=[...new Set([...f.structs(),...d.structs()])],m=``;I.features.has(`shader-f16`)&&r.F16&&(m+=`enable f16;
`),r.CLIP_DISTANCES&&(m+=`enable clip_distances;
`),/diagnostic\s*\(\s*off\s*,\s*derivative_uniformity/.test(o)||(m+=`diagnostic( off, derivative_uniformity );
`),m+=o,m+=p.map(e=>e.wgsl).join(`
`)+`
`,m+=f.declarations(0)+`
`,m+=d.declarations(1)+`
`;for(let e of s)m+=`// ---- ${e.name}\n${e.code}\n`;return m+=n,{code:zn(m,r),bindings:d,group0:f,modules:s}}function sr(e,t){let n=new Map,r=/\bfn\s+([A-Za-z_]\w*)\s*\(/g,i;for(;i=r.exec(e);){let a=e.indexOf(`{`,i.index);if(a<0)break;let o=0,s=a;for(;s<e.length;s++){let t=e[s];if(t===`{`)o++;else if(t===`}`&&--o===0)break}(!/@(vertex|fragment|compute)[^;{}]*$/.test(e.slice(Math.max(0,i.index-80),i.index))||i[1]===t)&&n.set(i[1],e.slice(i.index,s+1)),r.lastIndex=s+1}let a=new Set,o=[t],s=new Set;for(;o.length;){let e=o.pop();if(!s.has(e)&&n.has(e)){s.add(e);for(let t of n.get(e).match(/[A-Za-z_]\w*/g)||[])a.add(t),n.has(t)&&!s.has(t)&&o.push(t)}}return a}function cr(e,t){let n=Object.keys(e),r=Object.keys(t);return n.length===r.length&&n.every(n=>e[n]===t[n])}var lr=new Map;function ur(e,t){let n=lr.get(e);return n||(n=I.device.createShaderModule({label:t,code:e}),lr.set(e,n),n.getCompilationInfo&&n.getCompilationInfo().then(n=>{let r=n.messages.filter(e=>e.type===`error`);if(!r.length)return;let i=e.split(`
`);for(let e of r){let n=Math.max(0,e.lineNum-4),r=Math.min(i.length,e.lineNum+2),a=i.slice(n,r).map((t,r)=>`${n+r+1}${n+r+1===e.lineNum?`>`:` `} ${t}`).join(`
`);console.error(`WGSL error in ${t} (${e.lineNum}:${e.linePos}): ${e.message}\n${a}`)}}),n)}var z=new R({name:`common`,code:`
const PI: f32 = 3.141592653589793;
const TWO_PI: f32 = 6.283185307179586;
const INV_PI: f32 = 0.3183098861837907;
const EPS: f32 = 1e-5;

fn sat( x: f32 ) -> f32 { return clamp( x, 0.0, 1.0 ); }
fn sat3( x: vec3f ) -> vec3f { return clamp( x, vec3f( 0.0 ), vec3f( 1.0 ) ); }
fn pow2( x: f32 ) -> f32 { return x * x; }
fn pow4( x: f32 ) -> f32 { let y = x * x; return y * y; }
fn pow5( x: f32 ) -> f32 { let y = x * x; return y * y * x; }
fn luminance( c: vec3f ) -> f32 { return dot( c, vec3f( 0.2126, 0.7152, 0.0722 ) ); }
fn remap( x: f32, a: f32, b: f32, c: f32, d: f32 ) -> f32 { return c + ( x - a ) * ( d - c ) / ( b - a ); }
fn remapClamp( x: f32, a: f32, b: f32, c: f32, d: f32 ) -> f32 { return mix( c, d, sat( ( x - a ) / ( b - a ) ) ); }
fn rotate2( v: vec2f, a: f32 ) -> vec2f { let c = cos( a ); let s = sin( a ); return vec2f( c * v.x - s * v.y, s * v.x + c * v.y ); }

// ---- depth (reversed-Z: 1 at the near plane, 0 at far / infinity)

// positive view-space distance along the view axis from a depth-buffer value
fn viewDepth( d: f32 ) -> f32 {
	let v = frame.invProj * vec4f( 0.0, 0.0, d, 1.0 );
	return - v.z / v.w;
}

// uv (0..1, y down) + depth -> world / view position
fn ndcFromUv( uv: vec2f, d: f32 ) -> vec4f { return vec4f( uv.x * 2.0 - 1.0, 1.0 - uv.y * 2.0, d, 1.0 ); }
fn worldFromDepth( uv: vec2f, d: f32 ) -> vec3f {
	let p = frame.invViewProj * ndcFromUv( uv, d );
	return p.xyz / p.w;
}
fn viewFromDepth( uv: vec2f, d: f32 ) -> vec3f {
	let p = frame.invProj * ndcFromUv( uv, d );
	return p.xyz / p.w;
}
// world direction of the camera ray through uv
fn viewRay( uv: vec2f ) -> vec3f {
	let p = frame.invViewProj * ndcFromUv( uv, 0.5 );
	return normalize( p.xyz / p.w - frame.cameraPos );
}
// world position -> uv (y down) and depth
fn projectToUv( P: vec3f ) -> vec3f {
	let c = frame.viewProjNoJitter * vec4f( P, 1.0 );
	let n = c.xyz / c.w;
	return vec3f( n.x * 0.5 + 0.5, 0.5 - n.y * 0.5, n.z );
}
fn isSky( d: f32 ) -> bool { return d <= 0.0; }

// ---- hashes

fn pcg( v: u32 ) -> u32 {
	let state = v * 747796405u + 2891336453u;
	let word = ( ( state >> ( ( state >> 28u ) + 4u ) ) ^ state ) * 277803737u;
	return ( word >> 22u ) ^ word;
}
fn pcg3( v0: vec3u ) -> vec3u {
	var v = v0 * 1664525u + 1013904223u;
	v.x += v.y * v.z; v.y += v.z * v.x; v.z += v.x * v.y;
	v ^= v >> vec3u( 16u );
	v.x += v.y * v.z; v.y += v.z * v.x; v.z += v.x * v.y;
	return v;
}
fn u32ToUnit( h: u32 ) -> f32 { return f32( h >> 8u ) * ( 1.0 / 16777216.0 ) + ( 0.5 / 16777216.0 ); }
// float hash in [0, 1) of a float seed (TSL hash())
fn hash11( p: f32 ) -> f32 { return u32ToUnit( pcg( bitcast<u32>( p ) ^ 0x9e3779b9u ) ); }
fn hash21( p: vec2f ) -> f32 { return u32ToUnit( pcg( bitcast<u32>( p.x ) ^ pcg( bitcast<u32>( p.y ) ) ) ); }
fn hash31( p: vec3f ) -> f32 { return u32ToUnit( pcg3( bitcast<vec3u>( p ) ).x ); }
fn hash22( p: vec2f ) -> vec2f {
	let h = pcg3( vec3u( bitcast<vec2u>( p ), 0x51ed270bu ) );
	return vec2f( u32ToUnit( h.x ), u32ToUnit( h.y ) );
}
fn hash33( p: vec3f ) -> vec3f {
	let h = pcg3( bitcast<vec3u>( p ) );
	return vec3f( u32ToUnit( h.x ), u32ToUnit( h.y ), u32ToUnit( h.z ) );
}
fn hashU( a: u32, b: u32 ) -> f32 { return u32ToUnit( pcg( a ^ pcg( b ) ) ); }
fn ihash3( p: vec3i ) -> vec3u { return pcg3( bitcast<vec3u>( p ) ); }

// Jimenez interleaved gradient noise at a pixel (0..1)
fn interleavedGradientNoise( px: vec2f ) -> f32 { return fract( 52.9829189 * fract( dot( px, vec2f( 0.06711056, 0.00583715 ) ) ) ); }

// i-th of n points of a Vogel disc (unit radius), rotated by phi
fn vogelDiskSample( i: i32, n: i32, phi: f32 ) -> vec2f {
	let r = sqrt( ( f32( i ) + 0.5 ) / f32( n ) );
	let theta = f32( i ) * 2.399963229728653 + phi;
	return vec2f( cos( theta ), sin( theta ) ) * r;
}

// ---- gradient noise: MaterialX (three's MaterialXNoise.js) bit for bit — the same Jenkins
// lookup3 hash, gradients, quintic fade and gradient scales (0.6616 in 2D, 0.982 in 3D), so the
// procedural patterns land where they did in the three.js version.

fn _mxRotl( x: u32, k: u32 ) -> u32 { return ( x << k ) | ( x >> ( 32u - k ) ); }
fn _mxFinal( a0: u32, b0: u32, c0: u32 ) -> u32 {
	var a = a0; var b = b0; var c = c0;
	c ^= b; c -= _mxRotl( b, 14u );
	a ^= c; a -= _mxRotl( c, 11u );
	b ^= a; b -= _mxRotl( a, 25u );
	c ^= b; c -= _mxRotl( b, 16u );
	a ^= c; a -= _mxRotl( c, 4u );
	b ^= a; b -= _mxRotl( a, 14u );
	c ^= b; c -= _mxRotl( b, 24u );
	return c;
}
fn mxHash2( x: i32, y: i32 ) -> u32 { let s = 0xdeadbeefu + ( 2u << 2u ) + 13u; return _mxFinal( s + u32( x ), s + u32( y ), s ); }
fn mxHash3( x: i32, y: i32, z: i32 ) -> u32 { let s = 0xdeadbeefu + ( 3u << 2u ) + 13u; return _mxFinal( s + u32( x ), s + u32( y ), s + u32( z ) ); }
fn _mxGrad2( hash: u32, x: f32, y: f32 ) -> f32 {
	let h = hash & 7u;
	let u = select( y, x, h < 4u );
	let v = 2.0 * select( x, y, h < 4u );
	return select( u, - u, ( h & 1u ) != 0u ) + select( v, - v, ( h & 2u ) != 0u );
}
fn _gradDot3( h: u32, p: vec3f ) -> f32 {
	let hh = h & 15u;
	let u = select( p.y, p.x, hh < 8u );
	let v = select( select( p.z, p.x, hh == 12u || hh == 14u ), p.y, hh < 4u );
	return select( u, - u, ( hh & 1u ) != 0u ) + select( v, - v, ( hh & 2u ) != 0u );
}
fn _fade3( t: vec3f ) -> vec3f { return t * t * t * ( t * ( t * 6.0 - 15.0 ) + 10.0 ); }
fn _h3( i: vec3i ) -> u32 { return mxHash3( i.x, i.y, i.z ); }

fn perlin3( p: vec3f ) -> f32 {
	let fl = floor( p );
	let i = vec3i( fl );
	let f = p - fl;
	let u = _fade3( f );
	let n000 = _gradDot3( _h3( i ), f );
	let n100 = _gradDot3( _h3( i + vec3i( 1, 0, 0 ) ), f - vec3f( 1.0, 0.0, 0.0 ) );
	let n010 = _gradDot3( _h3( i + vec3i( 0, 1, 0 ) ), f - vec3f( 0.0, 1.0, 0.0 ) );
	let n110 = _gradDot3( _h3( i + vec3i( 1, 1, 0 ) ), f - vec3f( 1.0, 1.0, 0.0 ) );
	let n001 = _gradDot3( _h3( i + vec3i( 0, 0, 1 ) ), f - vec3f( 0.0, 0.0, 1.0 ) );
	let n101 = _gradDot3( _h3( i + vec3i( 1, 0, 1 ) ), f - vec3f( 1.0, 0.0, 1.0 ) );
	let n011 = _gradDot3( _h3( i + vec3i( 0, 1, 1 ) ), f - vec3f( 0.0, 1.0, 1.0 ) );
	let n111 = _gradDot3( _h3( i + vec3i( 1, 1, 1 ) ), f - vec3f( 1.0, 1.0, 1.0 ) );
	let x0 = mix( mix( n000, n100, u.x ), mix( n010, n110, u.x ), u.y );
	let x1 = mix( mix( n001, n101, u.x ), mix( n011, n111, u.x ), u.y );
	return mix( x0, x1, u.z ) * 0.982;
}
fn perlin2( p: vec2f ) -> f32 {
	let fl = floor( p );
	let X = i32( fl.x ); let Y = i32( fl.y );
	let fx = p.x - fl.x; let fy = p.y - fl.y;
	let u = _fade3( vec3f( fx, fy, 0.0 ) );
	let v0 = _mxGrad2( mxHash2( X, Y ), fx, fy );
	let v1 = _mxGrad2( mxHash2( X + 1, Y ), fx - 1.0, fy );
	let v2 = _mxGrad2( mxHash2( X, Y + 1 ), fx, fy - 1.0 );
	let v3 = _mxGrad2( mxHash2( X + 1, Y + 1 ), fx - 1.0, fy - 1.0 );
	let s1 = 1.0 - u.x;
	return ( ( 1.0 - u.y ) * ( v0 * s1 + v1 * u.x ) + u.y * ( v2 * s1 + v3 * u.x ) ) * 0.6616;
}
fn mx_noise_float3( p: vec3f ) -> f32 { return perlin3( p ); }
fn mx_noise_float2( p: vec2f ) -> f32 { return perlin2( p ); }
// MaterialX vec3 noise: one hash per corner, its three low bytes pick the gradients
fn _mxGrad3v( h: u32, p: vec3f ) -> vec3f { return vec3f( _gradDot3( h & 0xffu, p ), _gradDot3( ( h >> 8u ) & 0xffu, p ), _gradDot3( ( h >> 16u ) & 0xffu, p ) ); }
fn mx_noise_vec3( p: vec3f ) -> vec3f {
	let fl = floor( p );
	let i = vec3i( fl );
	let f = p - fl;
	let u = _fade3( f );
	let n000 = _mxGrad3v( _h3( i ), f );
	let n100 = _mxGrad3v( _h3( i + vec3i( 1, 0, 0 ) ), f - vec3f( 1.0, 0.0, 0.0 ) );
	let n010 = _mxGrad3v( _h3( i + vec3i( 0, 1, 0 ) ), f - vec3f( 0.0, 1.0, 0.0 ) );
	let n110 = _mxGrad3v( _h3( i + vec3i( 1, 1, 0 ) ), f - vec3f( 1.0, 1.0, 0.0 ) );
	let n001 = _mxGrad3v( _h3( i + vec3i( 0, 0, 1 ) ), f - vec3f( 0.0, 0.0, 1.0 ) );
	let n101 = _mxGrad3v( _h3( i + vec3i( 1, 0, 1 ) ), f - vec3f( 1.0, 0.0, 1.0 ) );
	let n011 = _mxGrad3v( _h3( i + vec3i( 0, 1, 1 ) ), f - vec3f( 0.0, 1.0, 1.0 ) );
	let n111 = _mxGrad3v( _h3( i + vec3i( 1, 1, 1 ) ), f - vec3f( 1.0, 1.0, 1.0 ) );
	let x0 = mix( mix( n000, n100, u.x ), mix( n010, n110, u.x ), u.y );
	let x1 = mix( mix( n001, n101, u.x ), mix( n011, n111, u.x ), u.y );
	return mix( x0, x1, u.z ) * 0.982;
}
fn mx_fractal_noise_float3( p: vec3f, octaves: i32, lacunarity: f32, diminish: f32 ) -> f32 {
	var r = 0.0; var amp = 1.0; var q = p;
	for ( var i = 0; i < octaves; i++ ) { r += amp * perlin3( q ); amp *= diminish; q *= lacunarity; }
	return r;
}
fn mx_cell_noise_float3( p: vec3f ) -> f32 { let i = vec3i( floor( p ) ); return f32( mxHash3( i.x, i.y, i.z ) ) / f32( 0xffffffffu ); }
fn mx_cell_noise_float2( p: vec2f ) -> f32 { let i = vec2i( floor( p ) ); return f32( mxHash2( i.x, i.y ) ) / f32( 0xffffffffu ); }
// distances to the nearest two feature points (F1, F2), jitter 0..1
fn mx_worley_noise_vec2_3( p: vec3f, jitter: f32 ) -> vec2f {
	let i = vec3i( floor( p ) );
	let f = fract( p );
	var d1 = 1e9; var d2 = 1e9;
	for ( var z = -1; z <= 1; z++ ) { for ( var y = -1; y <= 1; y++ ) { for ( var x = -1; x <= 1; x++ ) {
		let c = vec3i( x, y, z );
		let h = ihash3( i + c );
		let o = vec3f( f32( c.x ), f32( c.y ), f32( c.z ) ) + ( vec3f( u32ToUnit( h.x ), u32ToUnit( h.y ), u32ToUnit( h.z ) ) - 0.5 ) * jitter + 0.5 - f;
		let d = dot( o, o );
		if ( d < d1 ) { d2 = d1; d1 = d; } else if ( d < d2 ) { d2 = d; }
	} } }
	return sqrt( vec2f( d1, d2 ) );
}
fn mx_worley_noise_vec2_2( p: vec2f, jitter: f32 ) -> vec2f {
	let i = vec2i( floor( p ) );
	let f = fract( p );
	var d1 = 1e9; var d2 = 1e9;
	for ( var y = -1; y <= 1; y++ ) { for ( var x = -1; x <= 1; x++ ) {
		let c = vec2i( x, y );
		let h = ihash3( vec3i( i + c, 0 ) );
		let o = vec2f( f32( c.x ), f32( c.y ) ) + ( vec2f( u32ToUnit( h.x ), u32ToUnit( h.y ) ) - 0.5 ) * jitter + 0.5 - f;
		let d = dot( o, o );
		if ( d < d1 ) { d2 = d1; d1 = d; } else if ( d < d2 ) { d2 = d; }
	} }
	return sqrt( vec2f( d1, d2 ) );
}

// ---- normals

// orthonormal basis around n (Frisvad / Duff et al.)
fn basis( n: vec3f ) -> mat3x3f {
	let s = select( -1.0, 1.0, n.z >= 0.0 );
	let a = -1.0 / ( s + n.z );
	let b = n.x * n.y * a;
	let t = vec3f( 1.0 + s * n.x * n.x * a, s * b, -s * n.x );
	let bt = vec3f( b, s + n.y * n.y * a, -n.y );
	return mat3x3f( t, bt, n );
}

// Perturb a world-space normal by a height field sampled with screen-space derivatives
// (Mikkelsen, "Bump Mapping Unparametrized Surfaces"; TSL perturbNormal equivalent).
// dhdx / dhdy: dpdx / dpdy of the height (in metres) at this pixel.
fn perturbNormalByHeight( P: vec3f, N: vec3f, dhdx: f32, dhdy: f32, strength: f32 ) -> vec3f {
	let dPdx = dpdx( P );
	let dPdy = dpdy( P );
	let r1 = cross( dPdy, N );
	let r2 = cross( N, dPdx );
	let det = dot( dPdx, r1 );
	let grad = sign( det ) * ( dhdx * r1 + dhdy * r2 ) * strength;
	return normalize( abs( det ) * N - grad );
}

// tangent-space normal map sample (xy in -1..1) applied with a derivative-based TBN
fn perturbNormalByMap( P: vec3f, N: vec3f, uv: vec2f, mapN: vec3f ) -> vec3f {
	let dp1 = dpdx( P ); let dp2 = dpdy( P );
	let duv1 = dpdx( uv ); let duv2 = dpdy( uv );
	let dp2perp = cross( dp2, N ); let dp1perp = cross( N, dp1 );
	let T = dp2perp * duv1.x + dp1perp * duv2.x;
	let B = dp2perp * duv1.y + dp1perp * duv2.y;
	let invmax = inverseSqrt( max( max( dot( T, T ), dot( B, B ) ), 1e-20 ) );
	return normalize( mat3x3f( T * invmax, B * invmax, N ) * mapN );
}

// ---- color

fn srgbToLinear( c: vec3f ) -> vec3f {
	return select( pow( ( c + 0.055 ) / 1.055, vec3f( 2.4 ) ), c / 12.92, c <= vec3f( 0.04045 ) );
}
fn linearToSrgb( c: vec3f ) -> vec3f {
	return select( 1.055 * pow( c, vec3f( 1.0 / 2.4 ) ) - 0.055, c * 12.92, c <= vec3f( 0.0031308 ) );
}
`}),dr={hooks:{},version:0,set(e,t){this.hooks[e]=t,this.version++},modules(){return Object.values(this.hooks).filter(Boolean)}},fr={directModulation:`fn hookDirectModulation( P: vec3f, N: vec3f ) -> vec3f { return vec3f( 1.0 ); }`,ambientModulation:`fn hookAmbientModulation( P: vec3f, N: vec3f ) -> vec3f { return vec3f( 1.0 ); }`,shadowPosition:`fn hookShadowPosition( P: vec3f, N: vec3f, pixel: vec2f ) -> vec3f { return P; }`,bounce:`fn hookBounce( P: vec3f, N: vec3f ) -> vec3f { return vec3f( 0.0 ); }`,localLights:`fn hookLocalLights( s: Surface, P: vec3f, N: vec3f, V: vec3f, acc: ptr<function, LightAccum> ) {}`,envSpecular:`fn hookEnvSpecular( R: vec3f, roughness: f32 ) -> vec3f { let t = sat( R.y * 0.5 + 0.5 ); return mix( frame.horizonColor * 0.6, frame.skyIrradiance * PI, t ) * frame.envIntensity; }`,envDiffuse:`fn hookEnvDiffuse( N: vec3f ) -> vec3f { return mix( frame.horizonColor * 0.25, frame.skyIrradiance, N.y * 0.5 + 0.5 ) * frame.envIntensity; }`};function pr(){let e=[];for(let t in fr){let n=dr.hooks[t];n?e.push(n):e.push(hr(t))}return e}var mr={};function hr(e){return mr[e]||(mr[e]=new R({name:`hook-`+e+`-default`,deps:[br],code:fr[e]}))}var gr=new L(`SunShadow`,{matrices:[`mat4x4f[4]`,[new F,new F,new F,new F]],cascades:[`vec4f[4]`,[new P,new P,new P,new P]],count:[`u32`,0],mapSize:[`f32`,2048],bias:[`f32`,2e-5],fade:[`f32`,1],pcssCascades:[`u32`,1],sunAngularDiameter:[`f32`,.00925],enabled:[`f32`,0],pad:[`f32`,0],blend:[`vec4f[4]`,[new P,new P,new P,new P]]}),_r=null;function vr(e){_r=e}var yr=new R({name:`sunShadow`,deps:[z],uniforms:gr,uniformName:`shadowParams`,bindings:{sunShadowMap:{texture:()=>_r,viewDimension:`2d-array`}},code:`
fn shadowCascadeOf( viewDist: f32 ) -> i32 {
	for ( var i = 0; i < i32( shadowParams.count ); i++ ) { if ( viewDist < shadowParams.cascades[ i ].x ) { return i; } }
	return -1;
}

fn _shadowTap( uv: vec2f, layer: i32, z: f32 ) -> f32 {
	return textureSampleCompareLevel( sunShadowMap, smpShadow, uv, layer, z );
}

// shadow map depth (0 near .. 1 far, standard Z) at uv
fn _shadowDepth( uv: vec2f, layer: i32 ) -> f32 {
	let dim = vec2f( textureDimensions( sunShadowMap ) );
	let px = vec2i( clamp( uv * dim, vec2f( 0.0 ), dim - 1.0 ) );
	return textureLoad( sunShadowMap, px, layer, 0 );
}

// Contact-hardening sun shadows (PCSS, the former SunShadowFilter) on the near cascades. The penumbra of a
// real sun shadow grows with the distance from the occluder to the receiver (the sun is a 0.53 deg disc):
// sharp where an object touches the ground, soft under a palm crown 10 m up. Per pixel:
//  1. blocker search: average depth of the occluders around the pixel (raw depth loads, no sampler)
//  2. penumbra width = occluder-receiver distance * sun diameter, converted to this cascade's texels
//  3. percentage-closer filtering over that width
// Both sample sets are Vogel disks rotated per pixel and per frame (interleaved gradient noise): the
// TAA resolves the noise into a smooth gradient. Farther cascades: three's PCFShadowFilter (5 Vogel taps
// of hardware comparisons over one texel, rotated per pixel).
const SHADOW_MAX_OCCLUDER_HEIGHT: f32 = 30.0; // m: search radius covers penumbrae of occluders up to this far above
const SHADOW_SEARCH_TAPS: i32 = 8;
const SHADOW_FILTER_TAPS: i32 = 12;

fn sunShadowCascade( P: vec3f, N: vec3f, c: i32, noise: f32, pcfNoise: f32 ) -> f32 {
	return _sunShadowCascade( P, N, c, noise, pcfNoise, true );
}

// pcss = false: the 5-tap PCF filter in every cascade (no blocker search)
fn _sunShadowCascade( P: vec3f, N: vec3f, c: i32, noise: f32, pcfNoise: f32, pcss: bool ) -> f32 {
	let info = shadowParams.cascades[ c ];
	let Pb = P + N * info.z;
	let sc = shadowParams.matrices[ c ] * vec4f( Pb, 1.0 );
	let uvz = vec3f( sc.x * 0.5 + 0.5, 0.5 - sc.y * 0.5, sc.z );
	if ( any( uvz.xy < vec2f( 0.0 ) ) || any( uvz.xy > vec2f( 1.0 ) ) || uvz.z > 1.0 ) { return 1.0; }
	let z = uvz.z - shadowParams.bias;
	let texel = 1.0 / shadowParams.mapSize;
	if ( pcss && u32( c ) < shadowParams.pcssCascades ) {
		// moved every frame (Jimenez 2014): a noise pattern fixed on screen would never average out
		let phi = noise * TWO_PI;
		let width = info.y * shadowParams.mapSize; // cascade width (m)
		let range = info.w; // depth range (m)
		let SD = shadowParams.sunAngularDiameter;
		// 1. blockers within the widest penumbra this cascade can show. The texel straight along the light
		// ray comes first: a thin occluder (a log, a rope, a rail) can fall between the disk taps, which
		// left lit dots inside its umbra.
		let searchUV = max( min( SHADOW_MAX_OCCLUDER_HEIGHT * SD / width, texel * 24.0 ), texel * 1.5 );
		let d0 = _shadowDepth( uvz.xy, c );
		var blockSum = select( 0.0, d0, d0 < z );
		var blockCount = select( 0.0, 1.0, d0 < z );
		for ( var i = 0; i < SHADOW_SEARCH_TAPS; i++ ) {
			let d = _shadowDepth( uvz.xy + vogelDiskSample( i, SHADOW_SEARCH_TAPS, phi ) * searchUV, c );
			// standard depth: an occluder is closer to the light = smaller depth
			if ( d < z ) { blockSum += d; blockCount += 1.0; }
		}
		if ( blockCount < 0.5 ) { return 1.0; }
		// 2. occluder-receiver distance (orthographic: depth is linear over the camera range)
		let dz = abs( blockSum / blockCount - z ) * range;
		let penumbraUV = clamp( dz * SD / width, texel * 1.2, texel * 32.0 );
		// 3. PCF over the penumbra
		var sum = 0.0;
		for ( var i = 0; i < SHADOW_FILTER_TAPS; i++ ) {
			let d = _shadowDepth( uvz.xy + vogelDiskSample( i, SHADOW_FILTER_TAPS, phi + 1.7 ) * penumbraUV, c );
			sum += select( 0.0, 1.0, z <= d );
		}
		return sum / f32( SHADOW_FILTER_TAPS );
	}
	// three's PCFShadowFilter: 5 samples on a Vogel disk of one texel, rotated per pixel
	let phiP = pcfNoise * TWO_PI;
	var sum = 0.0;
	for ( var i = 0; i < 5; i++ ) {
		sum += _shadowTap( uvz.xy + vogelDiskSample( i, 5, phiP ) * texel, c, z );
	}
	return sum / 5.0;
}

// visibility of the sun at P (1 = lit); pixel = fragment coordinate for the dither.
// Cascade seams blended over a band that grows with their distance (SoftCSMShadowNode: a quarter of it,
// 2.5 m at the 10 m seam, 15 m at 60 m, and the last cascade fades out over its final 100 m); each
// cascade's map is widened to cover its part of the overlap.
fn sunShadow( P: vec3f, N: vec3f, pixel: vec2f ) -> f32 {
	return _sunShadow( P, N, pixel, true );
}

// sunShadow with the plain 5-tap PCF filter everywhere (surfaces whose own detail hides penumbrae: water)
fn sunShadowPCF( P: vec3f, N: vec3f, pixel: vec2f ) -> f32 {
	return _sunShadow( P, N, pixel, false );
}

fn _sunShadow( P: vec3f, N: vec3f, pixel: vec2f, pcss: bool ) -> f32 {
	if ( shadowParams.enabled < 0.5 ) { return 1.0; }
	let dist = dot( P - frame.cameraPos, - vec3f( frame.view[ 0 ][ 2 ], frame.view[ 1 ][ 2 ], frame.view[ 2 ][ 2 ] ) );
	let noise = interleavedGradientNoise( pixel + f32( frame.frameIndex % 64u ) * 5.588238 );
	let pcfNoise = interleavedGradientNoise( pixel );
	if ( shadowParams.fade < 0.5 ) {
		let c = shadowCascadeOf( dist );
		if ( c < 0 ) { return 1.0; }
		return _sunShadowCascade( P, N, c, noise, pcfNoise, pcss );
	}
	var ret = 1.0;
	let last = i32( shadowParams.count ) - 1;
	for ( var i = 0; i <= last; i++ ) {
		let b = shadowParams.blend[ i ]; // x, y: cascade range, z / w: blend margin at its near / far seam
		let center = ( b.x + b.y ) * 0.5;
		let margin = max( select( b.w, b.z, dist < center ), 1e-5 );
		let csmX = b.x - margin * 0.5;
		let csmY = select( b.y + margin * 0.5, b.y, i == last );
		if ( dist >= csmX && dist <= csmY ) {
			var ratio = clamp( min( dist - csmX, csmY - dist ) / margin, 0.0, 1.0 );
			// no fade at the near edge of the first cascade
			if ( i == 0 && dist <= center ) { ratio = 1.0; }
			ret -= ( 1.0 - _sunShadowCascade( P, N, i, noise, pcfNoise, pcss ) ) * ratio;
		}
	}
	return max( ret, 0.0 );
}

// one depth comparison in cascade c (1 = lit; outside the map: lit). For volumetric marches (haze shafts,
// motes) where the jitter and the temporal resolve do the filtering.
fn sunShadowCascadeHard( P: vec3f, c: i32 ) -> f32 {
	let sc = shadowParams.matrices[ c ] * vec4f( P, 1.0 );
	let uv = vec2f( sc.x * 0.5 + 0.5, 0.5 - sc.y * 0.5 );
	if ( any( uv <= vec2f( 0.0 ) ) || any( uv >= vec2f( 1.0 ) ) || sc.z > 1.0 ) { return 1.0; }
	return select( 0.0, 1.0, sc.z - 2e-5 <= _shadowDepth( uv, c ) );
}
// same in the cascade covering P (by view distance), 1 beyond the last one or with shadows off
fn sunShadowHard( P: vec3f ) -> f32 {
	if ( shadowParams.enabled < 0.5 ) { return 1.0; }
	let dist = dot( P - frame.cameraPos, - vec3f( frame.view[ 0 ][ 2 ], frame.view[ 1 ][ 2 ], frame.view[ 2 ][ 2 ] ) );
	let c = shadowCascadeOf( dist );
	if ( c < 0 ) { return 1.0; }
	return sunShadowCascadeHard( P, c );
}
`}),br=new R({name:`surface`,deps:[z],code:`
struct Surface {
	albedo: vec3f,
	alpha: f32,
	normal: vec3f,      // world space, shading normal
	roughness: f32,
	emissive: vec3f,
	metalness: f32,
	translucency: vec3f, // fraction of the direct light transmitted through thin foliage (x lightColor)
	ao: f32,
	sheenColor: vec3f,
	specularIntensity: f32,
	clearcoat: f32,
	clearcoatRoughness: f32,
	sheenRoughness: f32,
	ior: f32,
	clearcoatNormal: vec3f,
	envIntensity: f32,
};

fn defaultSurface( N: vec3f ) -> Surface {
	var s: Surface;
	s.albedo = vec3f( 1.0 ); s.alpha = 1.0; s.normal = N; s.roughness = 1.0; s.metalness = 0.0;
	s.emissive = vec3f( 0.0 ); s.translucency = vec3f( 0.0 ); s.ao = 1.0; s.sheenColor = vec3f( 0.0 );
	s.specularIntensity = 1.0; s.clearcoat = 0.0; s.clearcoatRoughness = 0.0; s.sheenRoughness = 1.0;
	s.ior = 1.5; s.clearcoatNormal = N; s.envIntensity = 1.0;
	return s;
}

// screen derivatives of the lit position, taken at the top of shadeSurface (every lane of the quad
// is live there; the sun hooks run in a branch, where derivatives are undefined)
var<private> lightDPdx: vec3f = vec3f( 0.0 );
var<private> lightDPdy: vec3f = vec3f( 0.0 );

struct LightAccum {
	directDiffuse: vec3f,
	directSpecular: vec3f,
	indirectDiffuse: vec3f,
	indirectSpecular: vec3f,
};

fn F_Schlick( f0: vec3f, f90: f32, dotVH: f32 ) -> vec3f {
	let fresnel = exp2( ( -5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + f90 * fresnel;
}
fn V_GGX_SmithCorrelated( alpha: f32, dotNL: f32, dotNV: f32 ) -> f32 {
	let a2 = alpha * alpha;
	let gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * dotNV * dotNV );
	let gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * dotNL * dotNL );
	return 0.5 / max( gv + gl, EPS );
}
fn D_GGX( alpha: f32, dotNH: f32 ) -> f32 {
	let a2 = alpha * alpha;
	let d = dotNH * dotNH * ( a2 - 1.0 ) + 1.0;
	return INV_PI * a2 / ( d * d );
}
fn BRDF_GGX( L: vec3f, V: vec3f, N: vec3f, f0: vec3f, f90: f32, roughness: f32 ) -> vec3f {
	let alpha = roughness * roughness;
	let H = normalize( L + V );
	let dotNL = sat( dot( N, L ) ); let dotNV = sat( dot( N, V ) );
	let dotNH = sat( dot( N, H ) ); let dotVH = sat( dot( V, H ) );
	return F_Schlick( f0, f90, dotVH ) * V_GGX_SmithCorrelated( alpha, dotNL, dotNV ) * D_GGX( alpha, dotNH );
}
// Charlie sheen (Estevez & Kulla)
fn D_Charlie( roughness: f32, dotNH: f32 ) -> f32 {
	let a = roughness * roughness;
	let invA = 1.0 / a;
	let cos2h = dotNH * dotNH;
	let sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invA ) * pow( sin2h, invA * 0.5 ) / ( 2.0 * PI );
}
fn V_Neubelt( dotNV: f32, dotNL: f32 ) -> f32 { return sat( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) ); }
fn BRDF_Sheen( L: vec3f, V: vec3f, N: vec3f, color: vec3f, roughness: f32 ) -> vec3f {
	let H = normalize( L + V );
	return color * D_Charlie( roughness, sat( dot( N, H ) ) ) * V_Neubelt( sat( dot( N, V ) ), sat( dot( N, L ) ) );
}
// analytical approximation of the split-sum DFG term (Karis)
fn DFGApprox( dotNV: f32, roughness: f32 ) -> vec2f {
	let c0 = vec4f( -1.0, -0.0275, -0.572, 0.022 );
	let c1 = vec4f( 1.0, 0.0425, 1.04, -0.04 );
	let r = roughness * c0 + c1;
	let a004 = min( r.x * r.x, exp2( -9.28 * dotNV ) ) * r.x + r.y;
	return vec2f( -1.04, 1.04 ) * a004 + r.zw;
}
// multi-scattering specular energy compensation (Fdez-Aguera), as three's computeMultiscattering
fn multiscatter( N: vec3f, V: vec3f, specColor: vec3f, specF90: f32, roughness: f32, single: ptr<function, vec3f>, multi: ptr<function, vec3f> ) {
	let fab = DFGApprox( sat( dot( N, V ) ), roughness );
	let Fr = specColor;
	let FssEss = Fr * fab.x + specF90 * fab.y;
	let Ess = fab.x + fab.y;
	let Ems = 1.0 - Ess;
	let Favg = Fr + ( 1.0 - Fr ) * 0.047619;
	let Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	*single += FssEss;
	*multi += Fms * Ems;
}
`}),xr=new R({name:`lighting`,deps:[z,br,yr],code:`
// STUDIO_LIGHTING (a pass define, e.g. the fish portraits of the catch card): the world hooks are
// skipped (no shadows, caustics, cloud / hill shadow, bounce, local lights, underwater tint) and the
// environment is a neutral photo studio: a grey sweep lit from above plus one large softbox whose
// azimuth is frame.debug.x (radians, animatable). The key light is frame.sunDir / frame.sunColor of
// the view's own frame block.
fn studioEnvSpecular( R: vec3f, roughness: f32 ) -> vec3f {
	let sweep = mix( vec3f( 0.035, 0.04, 0.045 ), vec3f( 0.55, 0.57, 0.6 ), smoothstep( -0.35, 0.85, R.y ) );
	let az = atan2( R.x, R.z ) - frame.debug.x;
	let w = 0.35 + roughness * 1.6;
	let box = exp( - az * az / ( w * w ) ) * smoothstep( -0.05, 0.3, R.y ) * smoothstep( 0.98, 0.55, R.y );
	return ( sweep + box * vec3f( 2.4, 2.35, 2.25 ) / ( 1.0 + roughness * 3.0 ) ) * frame.envIntensity;
}
fn studioEnvDiffuse( N: vec3f ) -> vec3f {
	return mix( vec3f( 0.05, 0.055, 0.06 ), vec3f( 0.3, 0.31, 0.33 ), N.y * 0.5 + 0.5 ) * frame.envIntensity;
}

fn shadeSurface( s: Surface, P: vec3f, V: vec3f, pixel: vec2f ) -> vec3f {
	let N = s.normal;
	let rough = clamp( s.roughness, 0.03, 1.0 );
	let diffuseColor = s.albedo * ( 1.0 - s.metalness );
	let specF0 = mix( vec3f( 0.04 ) * s.specularIntensity, s.albedo, s.metalness );
	let specF90 = mix( s.specularIntensity, 1.0, s.metalness );
	var acc: LightAccum;
	acc.directDiffuse = vec3f( 0.0 ); acc.directSpecular = vec3f( 0.0 );
	acc.indirectDiffuse = vec3f( 0.0 ); acc.indirectSpecular = vec3f( 0.0 );

	lightDPdx = dpdx( P );
	lightDPdy = dpdy( P );

	// ---- sun / moon
	let L = frame.sunDir;
	let dotNL = sat( dot( N, L ) );
#if STUDIO_LIGHTING
	let lightColor = frame.sunColor;
#else
	// Faces turned away from the sun with no transmission get nothing from it: the modulation hooks
	// (clouds, hill shadow, caustics) and the shadow filters only run for the rest, and the filters
	// only where the hooks left light (their derivatives are taken ahead: lightDPdx / lightDPdy)
	var lightColor = vec3f( 0.0 );
	if ( dotNL > 0.0 || any( s.translucency > vec3f( 0.0 ) ) ) {
		lightColor = frame.sunColor * hookDirectModulation( P, N );
#if MATERIAL_SUN_MODULATION
		// per-material key-light multiplier (the former TerrainLightingModel: heightfield hill shadow)
		lightColor *= materialSunModulation( P, N );
#endif
		let geomN = N;
		var shadow = 0.0;
		if ( any( lightColor > vec3f( 0.0 ) ) ) {
#if REFRACTION_CLIP
			// the water's refraction source (seen blurred through the water): one hard shadow tap
			shadow = sunShadowHard( hookShadowPosition( P, geomN, pixel ) );
#else
			shadow = sunShadow( hookShadowPosition( P, geomN, pixel ), geomN, pixel );
#endif
		}
		lightColor *= shadow;
	}
#endif
	let irradiance = dotNL * lightColor;
	acc.directDiffuse += irradiance * diffuseColor * INV_PI;
	acc.directSpecular += irradiance * BRDF_GGX( L, V, N, specF0, specF90, rough );
#if SHEEN
	acc.directSpecular += irradiance * BRDF_Sheen( L, V, N, s.sheenColor, max( s.sheenRoughness, 0.07 ) );
#endif
	// thin-surface transmission (foliage): lit from behind as well
	acc.directDiffuse += s.translucency * lightColor;
#if CLEARCOAT
	let ccN = s.clearcoatNormal;
	let ccNL = sat( dot( ccN, L ) );
	let ccSpec = ccNL * lightColor * BRDF_GGX( L, V, ccN, vec3f( 0.04 ), 1.0, clamp( s.clearcoatRoughness, 0.03, 1.0 ) );
#endif

	// ---- local lights (lanterns, windows, boat lights, flashlight)
#if !STUDIO_LIGHTING
	hookLocalLights( s, P, N, V, &acc );
#endif

	// ---- indirect: environment + ground bounce
	// (three's PhysicalLightingModel: env irradiance goes through the multiscatter-compensated
	// diffuse; the ground bounce is plain Lambert)
	let R = reflect( -V, N );
	let Rr = normalize( mix( R, N, rough * rough ) );
#if STUDIO_LIGHTING
	let envIrr = studioEnvDiffuse( N ) * PI * s.envIntensity;
	let radiance = studioEnvSpecular( Rr, rough ) * s.envIntensity;
#else
	let envIrr = hookEnvDiffuse( N ) * PI * s.envIntensity;
	let radiance = hookEnvSpecular( Rr, rough ) * s.envIntensity;
#endif
	var single = vec3f( 0.0 ); var multi = vec3f( 0.0 );
	multiscatter( N, V, specF0, specF90, rough, &single, &multi );
	let totalScatter = single + multi;
	let diffuseMS = diffuseColor * ( 1.0 - max( max( totalScatter.r, totalScatter.g ), totalScatter.b ) );
	acc.indirectSpecular += radiance * single + multi * envIrr * INV_PI;
#if STUDIO_LIGHTING
	acc.indirectDiffuse += diffuseMS * envIrr * INV_PI;
#else
	acc.indirectDiffuse += diffuseMS * envIrr * INV_PI + hookBounce( P, N ) * diffuseColor;
#endif

	// ambient occlusion (specular occlusion after Lagarde)
	let dotNV = sat( dot( N, V ) );
	let specAO = sat( pow( dotNV + s.ao, exp2( -16.0 * rough - 1.0 ) ) - 1.0 + s.ao );
	acc.indirectDiffuse *= s.ao;
	acc.indirectSpecular *= specAO;
#if STUDIO_LIGHTING
	let amb = vec3f( 1.0 );
#else
	let amb = hookAmbientModulation( P, N );
#endif
	acc.indirectDiffuse *= amb;
	acc.indirectSpecular *= amb;

	var color = acc.directDiffuse + acc.directSpecular + acc.indirectDiffuse + acc.indirectSpecular;
#if SHEEN
	color += s.sheenColor * envIrr * INV_PI * 0.5 * s.ao * amb;
#endif
#if CLEARCOAT
	let ccNV = sat( dot( ccN, V ) );
	let Fcc = F_Schlick( vec3f( 0.04 ), 1.0, ccNV ) * s.clearcoat;
#if STUDIO_LIGHTING
	let ccRad = studioEnvSpecular( reflect( -V, ccN ), clamp( s.clearcoatRoughness, 0.03, 1.0 ) ) * amb * specAO;
#else
	let ccRad = hookEnvSpecular( reflect( -V, ccN ), clamp( s.clearcoatRoughness, 0.03, 1.0 ) ) * amb * specAO;
#endif
	color = color * ( 1.0 - Fcc ) + ( ccSpec * s.clearcoat + ccRad * Fcc );
#endif
	return color + s.emissive;
}
`}),Sr={position:`vec3f`,normal:`vec3f`,uv:`vec2f`,color:`vec4f`},Cr={normal:`vec3f( 0.0, 1.0, 0.0 )`,uv:`vec2f( 0.0 )`,color:`vec4f( 1.0 )`},wr=/^(u32|i32|vec[234][ui])$/;function Tr(e){return e===`f32`?`0.0`:e===`u32`?`0u`:e===`i32`?`0i`:`${e}()`}function Er(e,t,n){let r=n.kind,i=new Set(t.map(e=>e.name)),a=e.allDefines();a.PASS_MAIN=+(r===`main`||r===`visibility`),a.PASS_VISIBILITY=+(r===`visibility`),a.PASS_DEPTH=+(r===`depth`),a.PASS_COLOR=+(r===`color`),a.PASS_LATE=+!!n.late,a.LIT=+!!e.lit,a.INSTANCED=+!!i.has(`instanceMatrix0`),a.INSTANCE_COLOR=+!!i.has(`instanceColor`),Object.assign(a,n.defines||{}),a.CLIP_DISTANCES=a.REFRACTION_CLIP&&I.features.has(`clip-distances`)?1:0;let o=`struct VertexIn {
`;for(let e of t)o+=`\t@location( ${e.location} ) ${e.name}: ${e.wgsl},\n`;o+=`	@builtin( instance_index ) instance: u32,
	@builtin( vertex_index ) vertex: u32,
};
`;let s=`struct VertexData {
	position: vec3f,
	normal: vec3f,
	uv: vec2f,
	color: vec4f,
	model: mat4x4f,
	prevModel: mat4x4f,
	instance: u32,
	vertex: u32,
	worldOffset: vec3f,
	prevWorldOffset: vec3f,
	useWorld: bool,
	worldPos: vec3f,
	worldNormal: vec3f,
	prevWorldPos: vec3f,
`;for(let t in e.attributes)s+=`\t${t}: ${e.attributes[t]},\n`;s+=`};
`;let c=r===`main`||r===`visibility`,l=0,u=`struct VSOut {
	@builtin( position ) clip: vec4f,
`;u+=`\t@location( ${l++} ) worldPos: vec3f,\n`,u+=`\t@location( ${l++} ) normal: vec3f,\n`,u+=`\t@location( ${l++} ) uv: vec2f,\n`,u+=`\t@location( ${l++} ) color: vec4f,\n`,c&&(u+=`\t@location( ${l++} ) curClip: vec4f,\n`,u+=`\t@location( ${l++} ) prevClip: vec4f,\n`);for(let t in e.varyings){let n=e.varyings[t];u+=`\t@location( ${l++} )${wr.test(n)?` @interpolate( flat )`:``} ${t}: ${n},\n`}if(u+=`};
`,a.CLIP_DISTANCES){let e=[...u.matchAll(/\s(\w+): [^,]+,\n/g)].map(e=>e[1]);u+=u.replace(`struct VSOut {`,`struct VSOutClip {`).replace(/};\n$/,`	@builtin( clip_distances ) clipDistances: array<f32, 1>,
};
`),u+=`fn vsClip( o: VSOut, d: f32 ) -> VSOutClip {\n\tvar c: VSOutClip;\n${e.map(e=>`\tc.${e} = o.${e};\n`).join(``)}\tc.clipDistances[ 0 ] = d;\n\treturn c;\n}\n`}let d=``;for(let e in Sr)if(i.has(e)){let n=t.find(t=>t.name===e);e===`color`&&n.wgsl===`vec3f`?d+=`	v.color = vec4f( i.color, 1.0 );
`:d+=`\tv.${e} = i.${e};\n`}else e!==`position`&&(d+=`\tv.${e} = ${Cr[e]};\n`);for(let t in e.attributes)d+=i.has(t)?`\tv.${t} = i.${t};\n`:`\tv.${t} = ${Tr(e.attributes[t])};\n`;let f=`
struct Draw {
	model: mat4x4f,
	prevModel: mat4x4f,
	params: vec4f,  // x: object id, y: user, z: user, w: user
	params2: vec4f,
};
@group( 2 ) @binding( 0 ) var<uniform> draw: Draw;

${o}
${s}
${u}

struct FragInput {
	vs: VSOut,
	P: vec3f,
	N: vec3f,
	V: vec3f,
	uv: vec2f,
	color: vec4f,
	front: bool,
	pixel: vec2f,
};

struct FragResult {
	color: vec4f,
	velocity: vec4f,
	mask: vec4f,
};

fn cofactor3( m: mat4x4f ) -> mat3x3f {
	let a = m[ 0 ].xyz; let b = m[ 1 ].xyz; let c = m[ 2 ].xyz;
	return mat3x3f( cross( b, c ), cross( c, a ), cross( a, b ) );
}

fn materialVertex( v: ptr<function, VertexData>, o: ptr<function, VSOut> ) {
${e.vertex}
}

fn materialSurface( in: FragInput, s: ptr<function, Surface> ) {
${e.surface}
}

fn materialOutput( in: FragInput, s: Surface, r: ptr<function, FragResult> ) {
${e.output}
}

#if CLIP_DISTANCES
@vertex fn vs( i: VertexIn ) -> VSOutClip {
#else
@vertex fn vs( i: VertexIn ) -> VSOut {
#endif
	var v: VertexData;
${d}#if !HAS_POSITION
	v.position = vec3f( 0.0 );
#endif
	v.instance = i.instance;
	v.vertex = i.vertex;
#if INSTANCED
	let im = mat4x4f( i.instanceMatrix0, i.instanceMatrix1, i.instanceMatrix2, i.instanceMatrix3 );
	v.model = draw.model * im;
	v.prevModel = draw.prevModel * im;
#else
	v.model = draw.model;
	v.prevModel = draw.prevModel;
#endif
#if INSTANCE_COLOR
	v.color = vec4f( v.color.rgb * i.instanceColor, v.color.a );
#endif
	v.worldOffset = vec3f( 0.0 );
	v.prevWorldOffset = vec3f( 1e30 );
	v.useWorld = false;
	v.prevWorldPos = vec3f( 1e30 );
	var o: VSOut;
	materialVertex( &v, &o );
	var wp: vec3f;
	var wn: vec3f;
	var pwp: vec3f;
	if ( v.useWorld ) {
		wp = v.worldPos;
		wn = v.worldNormal;
		pwp = select( v.prevWorldPos, wp, v.prevWorldPos.x > 1e29 );
	} else {
		let lp = vec4f( v.position, 1.0 );
		wp = ( v.model * lp ).xyz + v.worldOffset;
		wn = cofactor3( v.model ) * v.normal;
		pwp = ( v.prevModel * lp ).xyz + select( v.prevWorldOffset, v.worldOffset, v.prevWorldOffset.x > 1e29 );
	}
	o.worldPos = wp;
	o.normal = wn;
	o.uv = v.uv;
	o.color = v.color;
	o.clip = frame.viewProj * vec4f( wp, 1.0 );
#if PASS_MAIN
	o.curClip = frame.viewProjNoJitter * vec4f( wp, 1.0 );
	o.prevClip = frame.prevViewProjNoJitter * vec4f( pwp, 1.0 );
#endif
#if CLIP_DISTANCES
	return vsClip( o, frame.seaLevel + REFRACTION_CLIP_MARGIN - wp.y );
#else
	return o;
#endif
}

#if PASS_MAIN && !PASS_LATE && LIT && !IS_WATER && !ALPHA_TEST && !STUDIO_LIGHTING
// Deep under the water, seen from above it: the water drawn over this pixel shows the refraction
// pass (ocean/RefractionPass.js) at its refracted end point, never this pixel's own colour. The end
// point is predicted as the water shader traces it (flat surface, the seabed at P's depth, a margin
// for the wave slopes); where it would leave the screen the water takes the refraction pass' edge.
const SUBMERGED_DEPTH: f32 = 2.5; // m below sea level: below the deepest wave troughs
fn submergedHidden( P: vec3f ) -> bool {
#if ROCHA_WORLD
	// Inland bodies have independent elevations and boundaries; shade their beds normally.
	return false;
#else
	if ( frame.waterEnabled < 0.5 ) { return false; }
	let sea = frame.seaLevel;
	if ( P.y > sea - SUBMERGED_DEPTH || frame.cameraPos.y < sea + 1.0 ) { return false; }
	let V = normalize( P - frame.cameraPos );
	let pos = frame.cameraPos + V * ( ( frame.cameraPos.y - sea ) / max( - V.y, 1e-4 ) );
	let Tr = refract( V, vec3f( 0.0, 1.0, 0.0 ), 1.0 / 1.333 );
	let Tv = normalize( vec3f( Tr.x, min( Tr.y, -0.08 ), Tr.z ) );
	let L = ( sea - P.y ) / max( - Tv.y, 0.04 );
	let c = frame.viewProj * vec4f( pos + Tv * min( L, 80.0 ), 1.0 );
	let uv = c.xy / max( c.w, 1e-4 ) * vec2f( 0.5, -0.5 ) + 0.5;
	return all( uv > vec2f( 0.1 ) ) && all( uv < vec2f( 0.9 ) ) && c.w > 0.0;
#endif
}
#endif

fn fragInput( vs: VSOut, front: bool ) -> FragInput {
	var in: FragInput;
	in.vs = vs;
	in.P = vs.worldPos;
	var N = normalize( vs.normal );
#if DOUBLE_SIDED
	N = select( -N, N, front );
#endif
#if BACK_SIDE
	N = -N;
#endif
	in.N = N;
	in.V = normalize( frame.cameraPos - vs.worldPos );
	in.uv = vs.uv;
	in.color = vs.color;
	in.front = front;
	in.pixel = vs.clip.xy;
	return in;
}

fn surfaceOf( in: FragInput ) -> Surface {
	var s = defaultSurface( in.N );
	s.albedo = mat.color * in.color.rgb;
	s.alpha = mat.opacity * in.color.a;
	s.roughness = mat.roughness;
	s.metalness = mat.metalness;
	s.emissive = mat.emissive;
	materialSurface( in, &s );
	return s;
}

#if PASS_VISIBILITY
// Main-camera coverage, never the cheaper/different shadow silhouette.
@fragment fn fs( vs: VSOut, @builtin( front_facing ) front: bool ) {
	let in = fragInput( vs, front );
	let s = surfaceOf( in );
#if ALPHA_TEST
	if ( s.alpha < mat.alphaTest ) { discard; }
#endif
}
#elif PASS_DEPTH
#if NEEDS_DEPTH_FRAGMENT
@fragment fn fs( vs: VSOut, @builtin( front_facing ) front: bool ) {
	let in = fragInput( vs, front );
#if HAS_SHADOW_HOOK
	if ( ! materialShadow( in ) ) { discard; }
#else
	let s = surfaceOf( in );
	if ( s.alpha < mat.alphaTest ) { discard; }
#endif
}
#endif
#else

#if PASS_MAIN
struct FragOut {
	@location( 0 ) color: vec4f,
	@location( 1 ) velocity: vec4f,
	@location( 2 ) mask: vec4f,
};
#else
struct FragOut {
	@location( 0 ) color: vec4f,
};
#endif

@fragment fn fs( vs: VSOut, @builtin( front_facing ) front: bool ) -> FragOut {
	let in = fragInput( vs, front );
#if ROCHA_EARLY_REFRACTION && REFRACTION_CLIP && LIT && !IS_WATER && !STUDIO_LIGHTING
	// The original Rocha lighting hooks reject these same fragments after material shading.
	// Classify once before the material; surviving boundary quads still execute derivatives.
	let rochaRefrWater = rochaWaterAt( in.P.xz );
	if ( rochaRefrWater.z < 0.5 || in.P.y > rochaRefrWater.x + 0.4 ) { discard; }
#endif
#if REFRACTION_CLIP
#if !CLIP_DISTANCES
	// the water's refraction source only holds what is under the water (pass.defines)
	if ( in.P.y > frame.seaLevel + REFRACTION_CLIP_MARGIN ) { discard; }
#endif
#endif
#if PASS_MAIN && !PASS_LATE && LIT && !IS_WATER && !ALPHA_TEST && !STUDIO_LIGHTING
	// hidden under the water (see submergedHidden): an ambient colour, keeping depth and motion
	if ( submergedHidden( in.P ) ) {
		var so: FragOut;
		so.color = vec4f( mat.color * in.color.rgb * hookEnvDiffuse( in.N ) * hookAmbientModulation( in.P, in.N ), 1.0 );
		let cur0 = vs.curClip.xy / vs.curClip.w;
		let prev0 = vs.prevClip.xy / vs.prevClip.w;
		so.velocity = vec4f( ( cur0 - prev0 ) * vec2f( 0.5, -0.5 ), 0.0, 1.0 );
		so.mask = vec4f( 0.0 );
		return so;
	}
#endif
	var s = surfaceOf( in );
#if ALPHA_TEST
	if ( s.alpha < mat.alphaTest ) { discard; }
#endif
	s.normal = normalize( s.normal );
	s.clearcoatNormal = normalize( s.clearcoatNormal );
	var r: FragResult;
#if LIT
	r.color = vec4f( shadeSurface( s, in.P, in.V, in.pixel ), s.alpha );
#else
	r.color = vec4f( s.albedo + s.emissive, s.alpha );
#endif
#if PASS_MAIN
	let cur = vs.curClip.xy / vs.curClip.w;
	let prev = vs.prevClip.xy / vs.prevClip.w;
	r.velocity = vec4f( ( cur - prev ) * vec2f( 0.5, -0.5 ), 0.0, 1.0 );
#else
	r.velocity = vec4f( 0.0 );
#endif
	r.mask = vec4f( 0.0 );
	materialOutput( in, s, &r );
	var out: FragOut;
	out.color = r.color;
#if PASS_MAIN
#if PASS_LATE
	// premultiplied: opaque outputs overwrite, blended ones weight their motion by coverage
#if VELOCITY_OPAQUE
	// the fragment owns the motion of its pixel even when its colour is blended (AirMotes specks)
	let a = VELOCITY_WEIGHT;
#else
	let a = select( 1.0, r.color.a, TRANSPARENT_F ) * VELOCITY_WEIGHT;
#endif
	out.velocity = vec4f( r.velocity.xy * a, 0.0, a );
#else
	out.velocity = r.velocity;
#endif
	out.mask = r.mask;
#endif
	return out;
}
#endif
`,p=e.shadow?`fn materialShadow( in: FragInput ) -> bool {\n${e.shadow}\n}\n`:``;a.HAS_SHADOW_HOOK=+!!e.shadow,a.NEEDS_DEPTH_FRAGMENT=r===`depth`&&(e.alphaTest>0||e.shadow)?1:0,a.HAS_POSITION=+!!i.has(`position`);let m=f.replace(`fn fragInput(`,p+`fn fragInput(`).replace(/\bTRANSPARENT_F\b/g,e.transparent?`true`:`false`).replace(/\bVELOCITY_WEIGHT\b/g,Dr(e.velocityWeight)).replace(/\bREFRACTION_CLIP_MARGIN\b/g,Dr((n.defines&&n.defines.REFRACTION_CLIP_MARGIN)??0)),h=[z,br,...e.modules];return(r!==`depth`||Rn(e.modules).includes(xr))&&(h=[z,br,...pr(),xr,...e.modules]),e.lightingHooks===!1&&!Rn(e.modules).includes(xr)&&(h=[z,br,yr,...e.modules]),{code:m,modules:h,defines:a,bindings:{mat:{uniform:e.uniformBlock},...e.bindings},hasFragment:r!==`depth`||a.NEEDS_DEPTH_FRAGMENT===1}}function Dr(e){let t=String(e);return t.includes(`.`)||t.includes(`e`)?t:t+`.0`}var Or=0,kr={color:[`vec3f`,null],opacity:[`f32`,1],emissive:[`vec3f`,null],roughness:[`f32`,1],metalness:[`f32`,0],alphaTest:[`f32`,0]},Ar=class{constructor(e={}){this.id=Or++,this.isMaterial=!0,this.name=e.name||`material`+this.id,this.version=0,this.modules=e.modules||[],this.varyings=e.varyings||{},this.attributes=e.attributes||{},this.vertex=e.vertex||``,this.surface=e.surface||``,this.output=e.output||``,this.shadow=e.shadow||``,this.defines={...e.defines||{}},this.lit=e.lit!==!1,this.side=e.side||`front`,this.transparent=!!e.transparent,this.blending=e.blending||(this.transparent?`normal`:`none`),this.depthWrite=e.depthWrite??!this.transparent,this.depthTest=e.depthTest??!0,this.depthCompare=e.depthCompare||null,this.depthBias=e.depthBias||0,this.depthBiasSlopeScale=e.depthBiasSlopeScale||0,this.colorWrite=e.colorWrite??!0,this.topology=e.topology||`triangle-list`,this.visible=e.visible??!0,this.vertexColors=!!e.vertexColors,this.velocityWeight=e.velocityWeight??1,this.underwaterLighting=e.underwaterLighting||`full`,this.appliesHillShadow=!!e.appliesHillShadow,this.localLightsCheap=!!e.localLightsCheap,this.receiveShadows=e.receiveShadows??!0,this.userData=e.userData||{};let t={...kr};for(let n in e.uniforms||{})t[n]=e.uniforms[n];this.uniformBlock=new L(`MaterialParams`+this.id,t,{label:this.name}),this.uniforms=this.uniformBlock.fields;let n=this.uniforms;n.color.value=Mr(e.color,new Ee(1,1,1)),n.emissive.value=Mr(e.emissive,new Ee(0,0,0)),e.roughness!==void 0&&(n.roughness.value=e.roughness),e.metalness!==void 0&&(n.metalness.value=e.metalness),e.opacity!==void 0&&(n.opacity.value=e.opacity),e.alphaTest!==void 0&&(n.alphaTest.value=e.alphaTest),this.bindings={};for(let t in e.textures||{}){let n=e.textures[t];this.bindings[t]=n&&n.isTexture||typeof n==`function`?{texture:n}:n}for(let t in e.storage||{}){let n=e.storage[t];this.bindings[t]=n&&n.isStorageBuffer?{storage:n,access:`read`}:n}Object.assign(this.bindings,e.bindings||{}),this._listeners=[]}get color(){return this.uniforms.color.value}set color(e){this.uniforms.color.value=Mr(e,this.uniforms.color.value)}get emissive(){return this.uniforms.emissive.value}set emissive(e){this.uniforms.emissive.value=Mr(e,this.uniforms.emissive.value)}get roughness(){return this.uniforms.roughness.value}set roughness(e){this.uniforms.roughness.value=e}get metalness(){return this.uniforms.metalness.value}set metalness(e){this.uniforms.metalness.value=e}get opacity(){return this.uniforms.opacity.value}set opacity(e){this.uniforms.opacity.value=e}get alphaTest(){return this.uniforms.alphaTest.value}set alphaTest(e){e>0!=this.uniforms.alphaTest.value>0&&(this.needsUpdate=!0),this.uniforms.alphaTest.value=e}set(e,t){this.uniformBlock.set(e,t)}set needsUpdate(e){e&&this.version++}setDefine(e,t){this.defines[e]!==t&&(this.defines[e]=t,this.version++)}pipelineKey(){return`${this.id}.${this.version}.${this.side}.${this.transparent}.${typeof this.blending==`string`?this.blending:JSON.stringify(this.blending)}.${this.depthWrite}.${this.depthTest}.${this.depthCompare}.${this.colorWrite}.${this.topology}.${this.alphaTest>0}.${this.underwaterLighting}.${this.appliesHillShadow}.${this.localLightsCheap}.${this.receiveShadows}.${this.depthBias}.${this.depthBiasSlopeScale}.${this.vertexColors}`}allDefines(){return{...this.defines,UNDERWATER_LIGHTING:{none:0,lite:1,full:2}[this.underwaterLighting]??2,HILL_SHADOW_SELF:+!!this.appliesHillShadow,LOCAL_LIGHTS_CHEAP:+!!this.localLightsCheap,ALPHA_TEST:+(this.alphaTest>0),DOUBLE_SIDED:+(this.side===`double`),BACK_SIDE:+(this.side===`back`),TRANSPARENT:+!!this.transparent,RECEIVE_SHADOWS:+!!this.receiveShadows}}addEventListener(e,t){e===`dispose`&&this._listeners.push(t)}dispose(){for(let e of this._listeners)e({target:this})}clone(){let e=Object.create(Object.getPrototypeOf(this));return Object.assign(e,this),e.id=Or++,e.version=0,e.defines={...this.defines},e.bindings={...this.bindings},e.uniformBlock=new L(`MaterialParams`+e.id,Object.fromEntries(this.uniformBlock.order.map(e=>[e,[this.uniformBlock.layout[e].typeStr,jr(this.uniforms[e].value)]])),{label:e.name}),e.uniforms=e.uniformBlock.fields,e._listeners=[],e}};function jr(e){return e&&typeof e==`object`&&e.clone?e.clone():Array.isArray(e)?e.map(jr):e}function Mr(e,t){return e==null?t:e.isColor?t.copy?t.copy(e):e.clone():typeof e==`number`||typeof e==`string`?t.set(e):Array.isArray(e)?t.setRGB(e[0],e[1],e[2]):e.isVector3?t.setRGB(e.x,e.y,e.z):t}function Nr(e){if(!e||e===`none`)return;if(typeof e==`object`)return e;let t=(e,t,n=`add`)=>({srcFactor:e,dstFactor:t,operation:n});switch(e){case`normal`:return{color:t(`src-alpha`,`one-minus-src-alpha`),alpha:t(`one`,`one-minus-src-alpha`)};case`premultiplied`:return{color:t(`one`,`one-minus-src-alpha`),alpha:t(`one`,`one-minus-src-alpha`)};case`additive`:return{color:t(`src-alpha`,`one`),alpha:t(`zero`,`one`)};case`add`:return{color:t(`one`,`one`),alpha:t(`one`,`one`)};case`multiply`:return{color:t(`dst`,`zero`),alpha:t(`zero`,`one`)};case`min`:return{color:t(`one`,`one`,`min`),alpha:t(`one`,`one`,`min`)};case`max`:return{color:t(`one`,`one`,`max`),alpha:t(`one`,`one`,`max`)}}throw Error(`unknown blending `+e)}var Pr={view:`mat4x4f`,proj:`mat4x4f`,viewProj:`mat4x4f`,invView:`mat4x4f`,invProj:`mat4x4f`,invViewProj:`mat4x4f`,viewProjNoJitter:`mat4x4f`,prevViewProjNoJitter:`mat4x4f`,cameraPos:[`vec3f`,new N],near:[`f32`,.1],prevCameraPos:[`vec3f`,new N],far:[`f32`,6e4],resolution:[`vec2f`,new j(1,1)],invResolution:[`vec2f`,new j(1,1)],outputResolution:[`vec2f`,new j(1,1)],jitter:[`vec2f`,new j],prevJitter:[`vec2f`,new j],frameIndex:[`u32`,0],time:[`f32`,0],dt:[`f32`,1/60],seaLevel:[`f32`,0],waterEnabled:[`f32`,1],atmosphereQuality:[`f32`,1],antiAliasingQuality:[`f32`,1],sunDir:[`vec3f`,new N(.3,.6,-.7).normalize()],night:[`f32`,0],sunColor:[`vec3f`,new Ee(1,1,1)],exposure:[`f32`,1],skyIrradiance:[`vec3f`,new Ee(.3,.4,.6)],cameraUnderwater:[`f32`,0],horizonColor:[`vec3f`,new Ee(.6,.7,.8)],cameraWaterHeight:[`f32`,0],waterAbsorption:[`vec3f`,new N(.42,.075,.035)],windSpeed:[`f32`,7],waterScattering:[`vec3f`,new N(.012,.018,.024)],envIntensity:[`f32`,1],windDir:[`vec2f`,new j(.35,.94).normalize()],reversedDepth:[`f32`,1],pad0:[`f32`,0],debug:[`vec4f`,new P]},Fr=[`view`,`proj`,`viewProj`,`invView`,`invProj`,`invViewProj`,`viewProjNoJitter`,`prevViewProjNoJitter`,`cameraPos`,`near`,`prevCameraPos`,`far`,`resolution`,`invResolution`,`jitter`,`prevJitter`,`reversedDepth`],Ir=new L(`Frame`,Pr,{label:`frame`});nr(Ir);function Lr(e){let t=new L(`Frame`,Pr,{label:e});return t.onBeforePack=()=>{for(let e of Ir.order)Fr.includes(e)||(t.fields[e].value=Ir.fields[e].value)},t}var B=Ir.fields,V={time:B.time,dt:B.dt,seaLevel:B.seaLevel,waterEnabled:B.waterEnabled,atmosphereQuality:B.atmosphereQuality,antiAliasingQuality:B.antiAliasingQuality,sunDir:B.sunDir,sunColor:B.sunColor,skyIrradiance:B.skyIrradiance,horizonColor:B.horizonColor,waterAbsorption:B.waterAbsorption,waterScattering:B.waterScattering,cameraUnderwater:B.cameraUnderwater,cameraWaterHeight:B.cameraWaterHeight,exposure:B.exposure,windDir:B.windDir,windSpeed:B.windSpeed,night:B.night,envIntensity:B.envIntensity},Rr=9.81,zr=new F;function Br(e,t,n,{jitterX:r=0,jitterY:i=0,prevViewProj:a=null,prevCameraPos:o=null,block:s=Ir}={}){let c=s.fields;e.updateMatrixWorld(),e.matrixWorldInverse&&e.matrixWorldInverse.copy(e.matrixWorld).invert();let l=e.matrixWorldInverse,u=e.projectionMatrix;c.view.value=l.clone(),c.proj.value=u.clone();let d=new F().multiplyMatrices(u,l);c.viewProjNoJitter.value=d.clone();let f=2*r/t,p=2*i/n;zr.makeTranslation(f,p,0);let m=new F().multiplyMatrices(zr,d);c.viewProj.value=m,c.invView.value=e.matrixWorld.clone(),c.invProj.value=u.clone().invert(),c.invViewProj.value=m.clone().invert(),c.prevViewProjNoJitter.value=a?a.clone():d.clone(),c.cameraPos.value=new N().setFromMatrixPosition(e.matrixWorld),c.prevCameraPos.value=o?o.clone():c.cameraPos.value.clone(),c.near.value=e.near,c.far.value=e.far,c.resolution.value=new j(t,n),c.invResolution.value=new j(1/t,1/n),c.prevJitter.value=c.jitter.value?c.jitter.value.clone():new j,c.jitter.value=new j(f,p),c.reversedDepth.value=e.reversedDepth===!1?0:1}var Vr=new Pe,Hr=new Ve,Ur=new F,Wr=new N,Gr=new N,Kr=new Ae,qr=2**-23;function Jr(e,t){let n=t.elements.map(Math.fround),r=1/0,i=-1/0,a=1/0,o=-1/0;for(let t of[e.min.x,e.max.x])for(let s of[e.min.y,e.max.y])for(let c of[e.min.z,e.max.z])for(let e of[2,3]){let l=[n[e]*t,n[e+4]*s,n[e+8]*c,n[e+12]],u=l.reduce((e,t)=>e+t,0),d=16*qr*l.reduce((e,t)=>e+Math.abs(t),0)+1e-37;e===2?(r=Math.min(r,u-d),i=Math.max(i,u+d)):(a=Math.min(a,u-d),o=Math.max(o,u+d))}if(!(a>0))return null;let s=[r/a,r/o,i/a,i/o],c=Math.min(...s),l=Math.max(...s),u=16*qr*Math.max(Math.abs(c),Math.abs(l))+1e-37;return Number.isFinite(u)?[c-u,l+u]:null}function Yr(e,t){return e&&t&&(e[1]<t[0]||t[1]<e[0])}var Xr=new WeakMap,Zr=0,Qr=256,$r=class{constructor(){this.pipelines=new Map,this.geometries=new WeakMap,this.sharedAttributes=new WeakMap,this.sharedIndices=new WeakMap,this.resourceStats={vertexBuffers:0,indexBuffers:0,vertexBytes:0,indexBytes:0,attributeOwners:0,indexOwners:0,bufferUploadBytes:0},this.spatialSortEnabled=!0,this.capacity=8192,this.drawBuffer=null,this.drawData=null,this.drawCount=0,this.frame=-1,this.stats={draws:0,triangles:0,pipelines:0},this.drawLayout=null,this.drawBindGroup=null,this.syncPipelines=!0}_ensureDrawBuffer(){this.drawBuffer&&this.drawData.byteLength>=this.capacity*Qr||(this.drawBuffer&&this.drawBuffer.destroy(),this.drawBuffer=I.device.createBuffer({label:`draws`,size:this.capacity*Qr,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),this.drawData=new Float32Array(this.capacity*Qr/4),this.drawLayout=Qn([{binding:0,visibility:GPUShaderStage.VERTEX|GPUShaderStage.FRAGMENT,buffer:{type:`uniform`,hasDynamicOffset:!0,minBindingSize:160}}],`draw`),this.drawBindGroup=I.device.createBindGroup({label:`draws`,layout:this.drawLayout,entries:[{binding:0,resource:{buffer:this.drawBuffer,size:160}}]}))}_beginFrame(){this.frame!==I.frame&&(this.frame=I.frame,this._ensureDrawBuffer(),this.drawCount>this.capacity*.75&&(this.capacity*=2,this._ensureDrawBuffer()),this.drawCount=0,I.onSubmit(()=>{this.drawCount&&I.queue.writeBuffer(this.drawBuffer,0,this.drawData.buffer,0,this.drawCount*Qr)}),this.stats.draws=0,this.stats.triangles=0)}_slot(e){let t=e.__draw;if(t||=e.__draw={frame:-1,slot:0,cur:new Float32Array(16),prev:new Float32Array(16),has:!1},t.frame===I.frame)return t.slot;if(this.drawCount>=this.capacity)throw Error(`MeshRenderer: draw buffer full`);t.frame=I.frame,t.slot=this.drawCount++;let n=e.matrixWorld.elements;t.has&&!e.resetVelocity?t.prev.set(t.cur):t.prev.set(n),t.cur.set(n),t.has=!0,e.resetVelocity=!1;let r=t.slot*Qr/4,i=this.drawData;i.set(t.cur,r),i.set(e.staticVelocity?t.cur:t.prev,r+16);let a=e.drawParams;if(i[r+32]=e.id??0,i[r+33]=a?a[0]:0,i[r+34]=a?a[1]:0,i[r+35]=a?a[2]:0,a&&a.length>3)for(let e=0;e<4;e++)i[r+36+e]=a[3+e]??0;return t.slot}_geometryGPU(e){let t=this.geometries.get(e);return t||(t={buffers:new Map,index:null,indexVersion:-1},this.geometries.set(e,t),e.addEventListener&&e.addEventListener(`dispose`,()=>{if(!t.disposed){t.disposed=!0;for(let[e,n]of t.buffers)this._releaseShared(this.sharedAttributes,e,n);t.index&&this._releaseShared(this.sharedIndices,t.indexAttribute,t.index),this.geometries.delete(e)}})),t}_releaseShared(e,t,n){this.resourceStats[n.kind===`index`?`indexOwners`:`attributeOwners`]--,--n.owners===0&&(n.buffer?.destroy(),n.buffer&&this.resourceStats[n.kind===`index`?`indexBuffers`:`vertexBuffers`]--,this.resourceStats[n.kind===`index`?`indexBytes`:`vertexBytes`]-=n.allocationBytes||0,e.delete(t))}_attributeBuffer(e,t){let n=this._geometryGPU(e),r=t.isInterleavedBufferAttribute?t.data:t;if(r.gpuBuffer)return r.gpuBuffer.getGPU?r.gpuBuffer.getGPU():r.gpuBuffer;let i=n.buffers.get(r);i||(i=this.sharedAttributes.get(r),i||(i={buffer:null,size:0,version:-1,owners:0,kind:`attribute`,allocationBytes:0},this.sharedAttributes.set(r,i)),i.owners++,this.resourceStats.attributeOwners++,n.buffers.set(r,i));let a=r.version??0;if(i&&i.version===a&&i.array===r.array)return i.buffer;let o=ri(t);if((!i.buffer||i.size<o.byteLength)&&(i.buffer?i.buffer.destroy():this.resourceStats.vertexBuffers++,this.resourceStats.vertexBytes-=i.allocationBytes,i.allocationBytes=Math.max(16,ei(o.byteLength)),this.resourceStats.vertexBytes+=i.allocationBytes,i.buffer=I.device.createBuffer({label:t.name||`attribute`,size:Math.max(16,ei(o.byteLength)),usage:GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST}),i.size=o.byteLength,i.version=-1),i.version!==a||i.array!==r.array){let e=r.updateRanges&&r.updateRanges.length&&i.version>=0&&i.array===r.array?r.updateRanges:null;if(e&&o===r.array){let t=r.array.BYTES_PER_ELEMENT;for(let n of e)I.queue.writeBuffer(i.buffer,n.start*t,r.array.buffer,r.array.byteOffset+n.start*t,ei(n.count*t)),this.resourceStats.bufferUploadBytes+=ei(n.count*t);r.clearUpdateRanges?r.clearUpdateRanges():r.updateRanges.length=0}else ti(i.buffer,o),this.resourceStats.bufferUploadBytes+=ei(o.byteLength);i.version=a}return i.array=r.array,i.buffer}_indexBuffer(e){let t=e.index;if(!t)return null;let n=this._geometryGPU(e);if(n.index&&n.indexAttribute!==t&&(this._releaseShared(this.sharedIndices,n.indexAttribute,n.index),n.index=null),!n.index){let e=this.sharedIndices.get(t);e||(e={buffer:null,size:0,version:-1,owners:0,array:null,ref:null,kind:`index`,allocationBytes:0},this.sharedIndices.set(t,e)),e.owners++,this.resourceStats.indexOwners++,n.index=e,n.indexAttribute=t}let r=n.index;if(r.ref&&r.array===t.array&&r.version===(t.version??0))return r.ref;let i=t.array instanceof Uint16Array||t.array instanceof Uint32Array?t.array:new Uint32Array(t.array);return(!r.buffer||r.size<i.byteLength)&&(r.buffer?r.buffer.destroy():this.resourceStats.indexBuffers++,this.resourceStats.indexBytes-=r.allocationBytes,r.allocationBytes=Math.max(16,ei(i.byteLength)),this.resourceStats.indexBytes+=r.allocationBytes,r.buffer=I.device.createBuffer({label:`index`,size:Math.max(16,ei(i.byteLength)),usage:GPUBufferUsage.INDEX|GPUBufferUsage.COPY_DST}),r.size=i.byteLength,r.version=-1),(r.version!==(t.version??0)||r.array!==t.array)&&(ti(r.buffer,i),this.resourceStats.bufferUploadBytes+=ei(i.byteLength),r.version=t.version??0),r.array=t.array,r.ref={buffer:r.buffer,format:i instanceof Uint16Array?`uint16`:`uint32`},r.ref}_cachedLayout(e,t,n){let r=Xr.get(t);r||Xr.set(t,r=new Map);let i=e.isInstancedMesh?e.instanceColor?2:1:0,a=i?n.id+`:`+i:n.id,o=r.get(a);if(o&&o.version===n.version&&o.attrsVersion===t.attributesVersion&&(!i||o.instanceMatrix===e.instanceMatrix)){let e=o.refs,n=o.names,r=t.attributes,i=!0;for(let t=0;t<n.length;t++)if(r[n[t]]!==e[t]){i=!1;break}if(i)return o.vl}let s=this._layout(e,t,n),c=s.layout.filter(e=>!e.name.startsWith(`instance`)).map(e=>e.name);return o={version:n.version,attrsVersion:t.attributesVersion,instanceMatrix:e.instanceMatrix,names:c,refs:c.map(e=>t.attributes[e]),vl:s},s.pipelines=new Map,r.set(a,o),s}_layout(e,t,n){let r=[],i=[`position`,`normal`,`uv`,`color`,...Object.keys(n.attributes)];for(let e of i){let i=t.attributes[e];i&&(e!==`color`||n.vertexColors||n.attributes.color)&&r.push({name:e,attr:i})}if(e.isInstancedMesh){for(let t=0;t<4;t++)r.push({name:`instanceMatrix`+t,attr:e.instanceMatrix,column:t});e.instanceColor&&r.push({name:`instanceColor`,attr:e.instanceColor})}let a=[],o=[],s=new Map,c=0;for(let e of r){let t=e.attr,r=t.isInterleavedBufferAttribute?t.data:t,i=!!(t.isInstancedBufferAttribute||r.isInstancedInterleavedBuffer||t.meshPerAttribute||r.meshPerAttribute)||e.name.startsWith(`instance`),l=ai(t),u=s.get(r);if(u===void 0){u=a.length,s.set(r,u);let e=t.isInterleavedBufferAttribute?t.data.stride*l.bytesPerComponent:t.itemSize*l.bytesPerComponent;a.push({src:r,attr:t,layout:{arrayStride:l.converted?l.itemSize*4:e,stepMode:i?`instance`:`vertex`,attributes:[]}})}let d=t.isInterleavedBufferAttribute?t.offset*l.bytesPerComponent:0,f=l.format,p=l.wgsl;e.column!==void 0&&(d=e.column*16,f=`float32x4`,p=`vec4f`),a[u].layout.attributes.push({shaderLocation:c,offset:d,format:f}),(e.name===`position`||e.name===`normal`)&&(p=`vec3f`),e.name===`uv`&&(p=`vec2f`),e.name===`color`&&(p=t.itemSize===4?`vec4f`:`vec3f`),e.name===`instanceColor`&&(p=`vec3f`),n.attributes[e.name]&&(p=n.attributes[e.name]),o.push({name:e.name,wgsl:p,location:c,instanced:i}),c++}return{key:o.map(e=>`${e.name}:${e.wgsl}`).join(`,`)+`|`+a.map(e=>`${e.layout.arrayStride}/${e.layout.stepMode}/${e.layout.attributes.map(e=>e.format+`@`+e.offset).join(`;`)}`).join(`,`),layout:o,buffers:a}}_pipeline(e,t,n){e.__pkFrame!==I.frame&&(e.__pk=e.pipelineKey()+`|`+dr.version,e.__pkFrame=I.frame);let r=n.passKey,i=t.pipelines&&t.pipelines.get(r);if(i&&i.materialKey===e.__pk)return i.p;let a=`${e.__pk}|${t.key}|${r}`,o=this.pipelines.get(a);return o||=this._createPipeline(e,t,n,a),t.pipelines&&t.pipelines.set(r,{materialKey:e.__pk,p:o}),o}_createPipeline(e,t,n,r){let i=Er(e,t.layout,n),a=or({modules:i.modules,bindings:i.bindings,code:i.code,defines:i.defines,stage:`render`,label:e.name}),o=ur(a.code,e.name);this._ensureDrawBuffer();let s=I.device.createPipelineLayout({bindGroupLayouts:[a.group0.layout,a.bindings.layout,this.drawLayout]}),c=Nr(e.blending),l=[];n.kind===`main`?l=[{format:n.colorFormats[0],blend:e.transparent||n.late?c:void 0,writeMask:e.colorWrite?GPUColorWrite.ALL:0},{format:n.colorFormats[1],blend:n.late?Nr(`premultiplied`):void 0,writeMask:e.colorWrite?GPUColorWrite.ALL:0},{format:n.colorFormats[2],blend:Nr(`normal`),writeMask:e.colorWrite?GPUColorWrite.ALL:0}]:n.kind===`color`&&(l=n.colorFormats.map(t=>({format:t,blend:c,writeMask:e.colorWrite?GPUColorWrite.ALL:0})));let u=e.side,d=n.cullOverride||(u===`double`?`none`:u===`back`?`front`:`back`),f=e.depthTest?e.depthCompare||n.depthCompare:`always`,p={label:e.name+` `+n.kind,layout:s,vertex:{module:o,entryPoint:`vs`,buffers:t.buffers.map(e=>e.layout)},primitive:{topology:e.topology,cullMode:d,frontFace:`ccw`}};i.hasFragment&&(p.fragment={module:o,entryPoint:`fs`,targets:l}),n.depthFormat&&(p.depthStencil={format:n.depthFormat,depthWriteEnabled:e.depthWrite,depthCompare:f,depthBias:n.kind===`depth`?n.depthBias||0:e.depthBias,depthBiasSlopeScale:n.kind===`depth`?n.depthBiasSlopeScale||0:e.depthBiasSlopeScale});let m={handle:I.renderPipeline(p),bindings:a.bindings,label:p.label};return this.pipelines.set(r,m),this.stats.pipelines=this.pipelines.size,m}collect(e,{camera:t,layerMask:n=4294967295,filter:r=null,kind:i=`main`,cull:a=!0,frameBlock:o=Ir}){let s=[],c=[];t&&(t.updateMatrixWorld(),Ur.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse.copy(t.matrixWorld).invert()),Hr.setFromProjectionMatrix(Ur,t.reversedDepth!==!1),Gr.setFromMatrixPosition(t.matrixWorld));let l=this.precompiling,u=e=>{if(e.visible||l){e.isMesh&&e.material&&e.geometry&&(e.layers.mask&n)!==0&&(!r||r(e))&&(i!==`depth`||e.castShadow)&&(l||!a||!t||e.frustumCulled===!1||this._inFrustum(e,t,o,i))&&(e.onBeforeRender&&e.onBeforeRender(null,null,t,e.geometry,e.material,null),(e.visible||l)&&this._addItems(e,s,c));for(let t of e.children)u(t)}};e.updateMatrixWorld(),u(e),s.sort((e,t)=>e.renderOrder-t.renderOrder||e.pipeKey-t.pipeKey||e.z-t.z);for(let e=1;e<s.length;e++){let t=e;for(;t>0;){let e=s[t-1],n=s[t];if(!e.sortBounds||!n.sortBounds||e.renderOrder!==n.renderOrder||e.pipeKey!==n.pipeKey||e.spatialDepth<=n.spatialDepth||e.sortBounds.intersectsBox(n.sortBounds)||!Yr(e.sortDepthRange,n.sortDepthRange))break;s[t-1]=n,s[t]=e,t--}}return c.sort((e,t)=>e.renderOrder-t.renderOrder||t.z-e.z),{opaque:s,transparent:c}}_inFrustum(e,t,n,r){let i=null;if(e.isInstancedMesh?(!e.boundingSphere&&e.computeBoundingSphere&&e.computeBoundingSphere(),i=e.boundingSphere):(e.geometry.boundingSphere||e.geometry.computeBoundingSphere(),i=e.geometry.boundingSphere),!i||i.radius<0||!Number.isFinite(i.radius))return!0;if(Vr.copy(i).applyMatrix4(e.matrixWorld),e.userData?.spatialSort&&t){let e=Vr.center.distanceTo(Gr)+Vr.radius,i=Math.max(.001,e*1e-6);if(r!==`depth`){let r=n?.fields,a=r?.resolution?.value,o=r?.jitter?.value,s=Math.max(1,a?.x||1),c=Math.max(1,a?.y||1),l=Math.max(2,Math.abs(o?.x||0)*s/2+1),u=Math.max(2,Math.abs(o?.y||0)*c/2+1),d=t.projectionMatrix.elements,f=d[15]===0?e:1;i+=Math.max(2*l/(s*Math.abs(d[0])),2*u/(c*Math.abs(d[5])))*f}Vr.radius+=i}return Hr.intersectsSphere(Vr)}_addItems(e,t,n){let r=e.geometry,i=Array.isArray(e.material)?e.material:null,a=Wr.setFromMatrixPosition(e.matrixWorld).distanceToSquared(Gr),o=this.spatialSortEnabled&&e.userData?.spatialSort&&r.boundingBox?Kr.copy(r.boundingBox).applyMatrix4(e.matrixWorld).expandByScalar(.001).clone():null,s=o?o.distanceToPoint(Gr)**2:a,c=o?Jr(o,Ur):null,l=(i,l,u)=>{if(!i||!i.visible&&!this.precompiling)return;let d=i.depthTest&&i.depthWrite&&i.blending===`none`,f={object:e,geometry:r,material:i,start:l,count:u,z:a,spatialDepth:s,sortBounds:d?o:null,sortDepthRange:c,renderOrder:e.renderOrder||0,pipeKey:i.id};(i.transparent?n:t).push(f)},u=r.drawRange||{start:0,count:1/0};if(i&&r.groups&&r.groups.length)for(let e of r.groups){let t=Math.max(e.start,u.start),n=Math.min(e.start+e.count,u.start+u.count);n>t&&l(i[e.materialIndex],t,n-t)}else l(i?i[0]:e.material,u.start,u.count)}async prepareMeshes(e,t,{cancelled:n=()=>!1}={}){let r=new Set,i=globalThis.performance?.now()??Date.now();for(let a of t){let t={kind:`main`,late:!1,colorFormats:[],depthFormat:null,depthCompare:`greater-equal`,frameBlock:Ir,layerMask:4294967295,...a};t.passKey=`${t.kind}.${+!!t.late}.${t.colorFormats.join(`,`)}.${t.depthFormat}.${t.depthCompare}.${t.cullOverride||``}.${t.defines?JSON.stringify(t.defines):``}`;for(let a of e){if(n())return;if(!(a.layers.mask&t.layerMask)||t.kind===`depth`&&!a.castShadow)continue;let e=this._cachedLayout(a,a.geometry,a.material);this._indexBuffer(a.geometry),r.add(this._pipeline(a.material,e,t).handle),(globalThis.performance?.now()??Date.now())-i>=8&&typeof requestAnimationFrame==`function`&&(await new Promise(e=>requestAnimationFrame(e)),i=globalThis.performance?.now()??Date.now())}}if(await I.pipelinesReady(),!n()){for(let e of r)if(e.failed||!e.pipeline)throw Error(`Could not prepare `+e.label)}}render(e,t){this._beginFrame(),t={kind:`main`,late:!1,colorFormats:[],depthFormat:null,depthCompare:`greater-equal`,frameBlock:Ir,layerMask:4294967295,...t},t.passKey=`${t.kind}.${+!!t.late}.${t.colorFormats.join(`,`)}.${t.depthFormat}.${t.depthCompare}.${t.cullOverride||``}.${t.defines?JSON.stringify(t.defines):``}`;let n=t.items||this.collect(e,t),r=I.getEncoder(),i=(t.colorViews||[]).map((e,n)=>{let r=t.clearColors?t.clearColors[n]:null;return{view:e,loadOp:r?`clear`:`load`,storeOp:`store`,clearValue:r||[0,0,0,0]}}),a={label:t.label||t.kind,colorAttachments:i};t.depthView&&(a.depthStencilAttachment={view:t.depthView,depthLoadOp:t.clearDepth===null||t.clearDepth===void 0?`load`:`clear`,depthStoreOp:`store`,depthClearValue:t.clearDepth??0}),t.timestampWrites&&(a.timestampWrites=t.timestampWrites);let o=r.beginRenderPass(a);t.viewport&&o.setViewport(...t.viewport),o.setBindGroup(0,ar(t.frameBlock,`render`).getBindGroup()),this.drawItems(o,n.opaque,t),t.betweenLists&&t.betweenLists(o),this.drawItems(o,n.transparent,t),t.after&&t.after(o),o.end()}drawItems(e,t,n){let r=null,i=null,a=new kn(e),o=++Zr;for(let s of t){let{object:t,geometry:c,material:l}=s;if(!c.attributes.position&&!c.vertexCount&&!c.indirect)continue;let u,d;if(this.precompiling){try{u=this._cachedLayout(t,c,l),d=this._pipeline(l,u,n)}catch{continue}continue}u=this._cachedLayout(t,c,l),d=this._pipeline(l,u,n);let f=d.handle.pipeline||(this.syncPipelines?I.ready(d.handle):null);if(!f)continue;d!==r&&(e.setPipeline(f),r=d);let p=d.bindings.getBindGroup(o);p!==i&&(e.setBindGroup(1,p),i=p),a.bindObject(this.drawBindGroup,this._slot(t)*Qr);for(let e=0;e<u.buffers.length;e++)a.bindVertex(e,this._attributeBuffer(c,u.buffers[e].attr));let m=t.isInstancedMesh?t.count:c.instanceCount??1;if(m===0)continue;let h=this._indexBuffer(c);if(c.indirect){let t=c.indirect.buffer.getGPU?c.indirect.buffer.getGPU():c.indirect.buffer,n=c.indirect.offsets||[c.indirect.offset||0];h&&a.bindIndex(h.buffer,h.format);for(let r of n)h?e.drawIndexedIndirect(t,r):e.drawIndirect(t,r),this.stats.draws++;continue}if(h){let t=Math.min(s.count,c.index.count-s.start);if(t<=0)continue;a.bindIndex(h.buffer,h.format),e.drawIndexed(t,m===1/0?1:m,s.start,0,0),this.stats.triangles+=t/3*m}else{let t=c.attributes.position?c.attributes.position.count:c.vertexCount,n=Math.min(s.count,t-s.start);if(n<=0)continue;e.draw(n,m,s.start,0),this.stats.triangles+=n/3*m}this.stats.draws++}}};function ei(e){return Math.ceil(e/4)*4}function ti(e,t){if(t.byteLength%4==0){I.queue.writeBuffer(e,0,t.buffer,t.byteOffset,t.byteLength);return}let n=new Uint8Array(ei(t.byteLength));n.set(new Uint8Array(t.buffer,t.byteOffset,t.byteLength)),I.queue.writeBuffer(e,0,n)}var ni=new WeakMap;function ri(e){let t=e.isInterleavedBufferAttribute?e.data:e;if(!ai(e).converted)return t.array;let n=ni.get(t);if(n&&n.version===t.version)return n.array;let r=e.count,i=e.itemSize,a=new Float32Array(r*i),o=e.normalized?ii(t.array):1;for(let e=0;e<r*i;e++)a[e]=t.array[e]/o;return ni.set(t,{version:t.version,array:a}),a}function ii(e){return e instanceof Uint8Array?255:e instanceof Int8Array?127:e instanceof Uint16Array?65535:e instanceof Int16Array?32767:1}function ai(e){let t=(e.isInterleavedBufferAttribute?e.data:e).array,n=e.itemSize,r=e.normalized,i=e=>n===1?e:`vec${n}${e===`f32`?`f`:e===`u32`?`u`:`i`}`;if(t instanceof Float32Array)return{format:n===1?`float32`:`float32x${n}`,wgsl:i(`f32`),bytesPerComponent:4,itemSize:n};if(t instanceof Uint32Array)return{format:n===1?`uint32`:`uint32x${n}`,wgsl:i(`u32`),bytesPerComponent:4,itemSize:n};if(t instanceof Int32Array)return{format:n===1?`sint32`:`sint32x${n}`,wgsl:i(`i32`),bytesPerComponent:4,itemSize:n};let a={Uint8Array:[`uint8`,`unorm8`,1],Int8Array:[`sint8`,`snorm8`,1],Uint16Array:[`uint16`,`unorm16`,2],Int16Array:[`sint16`,`snorm16`,2]}[t.constructor.name];return a&&(n===2||n===4)&&!e.isInterleavedBufferAttribute?{format:(r?a[1]:a[0])+`x`+n,wgsl:i(r?`f32`:t instanceof Uint8Array||t instanceof Uint16Array?`u32`:`i32`),bytesPerComponent:a[2],itemSize:n}:{format:n===1?`float32`:`float32x${n}`,wgsl:i(`f32`),bytesPerComponent:4,itemSize:n,converted:!0}}var oi=class{constructor(e){this.container=e,this.renderScale=1,this.clock=new ft,this.frame=0,this.onResize=[],this.renderOptimizations=Cn(),this.pacingStats={callbacks:0,submitted:0,completed:0,skipped:0,inFlight:0,maxInFlight:0}}async init(){let e=document.createElement(`canvas`);e.tabIndex=0,this.container.appendChild(e),this.canvas=e,this.domElement=e,await I.init({canvas:e}),I.reuseAllocationBindings=this.renderOptimizations.bindingReuse,this.meshRenderer=new $r,this.meshRenderer.syncPipelines=!1,this.camera=new mn(62,window.innerWidth/window.innerHeight,.06,6e4),this.scene=new Mt,window.addEventListener(`resize`,()=>this.resize()),this.resize()}setRenderScale(e){this.renderScale=e,this.resize()}get width(){return this.canvas.width}get height(){return this.canvas.height}resize(){let e=window.innerWidth,t=window.innerHeight,n=this.renderScale;this.canvas.width=Math.max(1,Math.floor(e*n)),this.canvas.height=Math.max(1,Math.floor(t*n)),this.canvas.style.width=e+`px`,this.canvas.style.height=t+`px`,this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),Ir.fields.outputResolution.value.set(this.canvas.width,this.canvas.height);for(let n of this.onResize)n(e,t)}currentTexture(){return I.context.getCurrentTexture()}start(e){this.stop(),this._running=!0;let t=this._loopGeneration,n=I.queue,r=this.renderOptimizations.framePacing;(!this._flight||this._flight.queue!==n)&&(this._flight={queue:n,count:0});let i=this._flight,a=this.pacingStats;r&&this.clock.reset();let o=s=>{if(this._running&&t===this._loopGeneration){if(a.callbacks++,r&&i.count>=2)a.skipped++;else{this.clock.update(s),this.frameInterval=this.clock.getDelta();let t=Math.min(.1,this.frameInterval);this.frame++,e(t,this.clock.getElapsed()),a.submitted++,r&&(i.count++,a.inFlight=i.count,a.maxInFlight=Math.max(a.maxInFlight,i.count),n.onSubmittedWorkDone().then(()=>{i.count--,a.completed++,i===this._flight&&(a.inFlight=i.count)},e=>{i.count--,i===this._flight&&(a.inFlight=i.count,a.error=String(e),this.stop(),console.error(`Frame queue failed:`,e))}))}this._running&&t===this._loopGeneration&&(this._raf=requestAnimationFrame(o))}};this._raf=requestAnimationFrame(o)}stop(){this._running=!1,this._loopGeneration=(this._loopGeneration||0)+1,cancelAnimationFrame(this._raf)}},si=0,H=class{constructor(e={}){this.id=si++,this.label=e.label||e.name||`texture`+this.id,this.width=Math.max(1,e.width||1),this.height=Math.max(1,e.height||1),this.depth=Math.max(1,e.depth||(e.dimension===`cube`?6:1)),this.dimension=e.dimension||`2d`,this.format=e.format||`rgba8unorm`,this.mipsOption=e.mips??!1,this.sampleCount=e.sampleCount||1;let t=e.usage||[`sample`,`copyDst`];this.usageList=t,this.sampler=e.sampler||`linearClamp`,this.gpu=null,this.version=0,this._views=new Map,this.isTexture=!0,e.data&&(this.pendingData=e.data)}get mipLevelCount(){return this.mipsOption===!0?Math.floor(Math.log2(Math.max(this.width,this.height,this.dimension===`3d`?this.depth:1)))+1:typeof this.mipsOption==`number`?this.mipsOption:1}get usage(){let e=0;for(let t of this.usageList)e|={sample:GPUTextureUsage.TEXTURE_BINDING,render:GPUTextureUsage.RENDER_ATTACHMENT,storage:GPUTextureUsage.STORAGE_BINDING,copySrc:GPUTextureUsage.COPY_SRC,copyDst:GPUTextureUsage.COPY_DST}[t];return this.mipLevelCount>1&&(e|=GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.TEXTURE_BINDING),e}get isDepth(){return this.format.startsWith(`depth`)}get sampleType(){return On(this.format)}wgslType(e=this.defaultViewDimension){let t=this.sampleType;if(t===`depth`)return{"2d":`texture_depth_2d`,"2d-array":`texture_depth_2d_array`,cube:`texture_depth_cube`}[e];let n=t===`uint`?`u32`:t===`sint`?`i32`:`f32`;return`texture_${e.replace(`-`,`_`)}<${n}>`}get defaultViewDimension(){return this.dimension}getGPU(){return this.gpu||this._create(),this.gpu}_create(){let e=this.dimension===`3d`?`3d`:`2d`;if(this.gpu=I.device.createTexture({label:this.label,size:{width:this.width,height:this.height,depthOrArrayLayers:this.depth},dimension:e,format:this.format,mipLevelCount:this.mipLevelCount,sampleCount:this.sampleCount,usage:this.usage}),this._views.clear(),this.version++,this.pendingData){let e=this.pendingData;this.pendingData=null,this.upload(e)}}view(e=null){let t=this.getGPU(),n=e?JSON.stringify(e):``,r=this._views.get(n);return r||(r=t.createView({label:this.label+n,dimension:e?.dimension||this.defaultViewDimension,...e||{}}),this._views.set(n,r)),r}resize(e,t,n=this.depth){if(e=Math.max(1,Math.floor(e)),t=Math.max(1,Math.floor(t)),e===this.width&&t===this.height&&n===this.depth&&this.gpu)return!1;if(this.width=e,this.height=t,this.depth=n,this.gpu){let e=this.gpu;I.onSubmit(null,()=>e.destroy()),this.gpu=null}return this._create(),!0}upload(e,{mip:t=0,layer:n=0,layers:r=null,width:i=null,height:a=null,x:o=0,y:s=0}={}){if(!this.gpu){if(t===0&&n===0&&!i){this.pendingData=e,this.getGPU();return}this.getGPU()}let c=Dn(this.format).bytes,l=i||Math.max(1,this.width>>t),u=a||Math.max(1,this.height>>t),d=r||(this.dimension===`3d`?Math.max(1,this.depth>>t):this.depth-n),f=e instanceof ArrayBuffer?e:e.buffer,p=e instanceof ArrayBuffer?0:e.byteOffset;I.queue.writeTexture({texture:this.gpu,mipLevel:t,origin:{x:o,y:s,z:n}},f,{offset:p,bytesPerRow:l*c,rowsPerImage:u},{width:l,height:u,depthOrArrayLayers:d})}destroy(){this.gpu&&this.gpu.destroy(),this.gpu=null,this.version++}},U=class{constructor(e,t,{colors:n=[`rgba16float`],depth:r=null,label:i=`rt`,mips:a=!1,usage:o=[`sample`,`render`,`copySrc`,`copyDst`],depthUsage:s=[`sample`,`render`,`copySrc`,`copyDst`],scale:c=1}={}){this.label=i,this.width=Math.max(1,e|0),this.height=Math.max(1,t|0),this.scale=c,this.textures=n.map((e,t)=>{let n=typeof e==`string`?{format:e}:e;return new H({label:`${i}.${n.name||t}`,width:this.width,height:this.height,format:n.format,mips:n.mips??a,usage:n.usage||o})}),this.depthTexture=r?new H({label:i+`.depth`,width:this.width,height:this.height,format:r,usage:s}):null}get texture(){return this.textures[0]}get formats(){return this.textures.map(e=>e.format)}setSize(e,t){if(e=Math.max(1,e|0),t=Math.max(1,t|0),e===this.width&&t===this.height)return!1;this.width=e,this.height=t;for(let n of this.textures)n.resize(e,t);return this.depthTexture&&this.depthTexture.resize(e,t),!0}},ci=0,li=class{constructor({label:e,count:t,type:n=`vec4f`,stride:r=null,data:i=null,usage:a=[]}){if(this.id=ci++,this.label=e||`buffer`+this.id,this.count=t,this.type=n,this.stride=r||{f32:4,u32:4,i32:4,"atomic<u32>":4,"atomic<i32>":4,vec2f:8,vec2u:8,vec3f:16,vec4f:16,vec4u:16,vec4i:16,mat4x4f:64}[n],!this.stride)throw Error(`StorageBuffer ${this.label}: pass a stride for ${n}`);this.byteLength=Math.max(16,t*this.stride),this.extraUsage=a,this.gpu=null,this.version=0,this.pendingData=i,this.isStorageBuffer=!0}getGPU(){if(!this.gpu){let e=GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST|GPUBufferUsage.COPY_SRC;for(let t of this.extraUsage)e|={vertex:GPUBufferUsage.VERTEX,index:GPUBufferUsage.INDEX,indirect:GPUBufferUsage.INDIRECT,uniform:GPUBufferUsage.UNIFORM}[t];if(this.gpu=I.device.createBuffer({label:this.label,size:Math.ceil(this.byteLength/4)*4,usage:e}),this.version++,this.pendingData){let e=this.pendingData;this.pendingData=null,this.write(e)}}return this.gpu}write(e,t=0){if(!this.gpu){if(t===0){this.pendingData=e,this.getGPU();return}this.getGPU()}I.queue.writeBuffer(this.gpu,t,e.buffer||e,e.byteOffset||0,e.byteLength??void 0)}destroy(){this.gpu&&this.gpu.destroy(),this.gpu=null}},ui=[];for(let e=0;e<8;e++)ui.push(new N);var di=new N,fi=new N(0,1,0),pi=new F,mi=new N,hi=new P,gi=new WeakMap,_i=0;function vi(e){return!e||typeof e!=`object`?String(e):(gi.has(e)||gi.set(e,++_i),gi.get(e))}var yi=class{constructor({size:e=2048,splits:t=[10,60,400],lightMargin:n=200,normalBias:r=[.015,.06,.3],bias:i=2e-5,pcssCascades:a=1,cacheStatic:o=!1,skipUnused:s=o}={}){this.size=e,this.splits=t,this.count=t.length,this.lightMargin=n,this.normalBias=r,this.periods=t.map((e,t)=>t===0?1:t===1?2:4),this.cacheStatic=o,this.skipUnused=s,this._samplingEnabled=!1,this.staticTexture=null,this.texture=new H({label:`sunShadowMap`,width:e,height:e,depth:this.count,dimension:`2d-array`,format:`depth32float`,usage:[`sample`,`render`,`copyDst`]}),vr(this.texture),this.cascades=t.map((e,t)=>({camera:{matrixWorld:new F,matrixWorldInverse:new F,projectionMatrix:new F,near:0,far:1,reversedDepth:!1,updateMatrixWorld(){},isCamera:!0,isShadowCamera:!0},block:Lr(`shadowView`+t),viewProj:new F,radius:0,dirty:!0})),this.enabled=!0,this.layerMask=4294967295,this.frame=0,this.lastSun=new N(0,-2,0);let c=gr.fields;c.count.value=this.count,c.mapSize.value=e,c.bias.value=i,c.pcssCascades.value=a,c.enabled.value=1}invalidateStatic(){for(let e of this.cascades)e.staticKey=null,e.dirty=!0}_margin(e){let t=this.splits[this.count-1],n=e/t;return Math.max(.25*n*n,.25*n)*t}_fit(e,t,n){let r=this.cascades[e],i=e===0?0:this.splits[e-1],a=this.splits[e],o=this._margin(i),s=this._margin(a),c=Math.max(t.near,i-o*.5),l=e===this.count-1?a:a+s*.5;gr.fields.blend.value[e]=new P(i,a,o,s);let u=Math.tan(t.fov*Math.PI/360),d=u*t.aspect,f=0;for(let e of[c,l])for(let n of[-1,1])for(let r of[-1,1])ui[f++].set(n*d*e,r*u*e,-e).applyMatrix4(t.matrixWorld);let p=Math.min(l,(c+l)/2*(1+d*d+u*u));di.set(0,0,-p).applyMatrix4(t.matrixWorld);let m=0;for(let e of ui)m=Math.max(m,e.distanceTo(di));m=Math.ceil(m*16)/16,r.radius=m;let h=r.camera,g=n,_=Math.abs(g.y)>.99?mi.set(1,0,0):fi;h.matrixWorld.lookAt(g,new N(0,0,0),_),pi.copy(h.matrixWorld).invert();let v=2*m/this.size,y=hi.set(di.x,di.y,di.z,1).applyMatrix4(pi);y.x=Math.round(y.x/v)*v,y.y=Math.round(y.y/v)*v;let b=m+this.lightMargin,x=new N(y.x,y.y,y.z+b).applyMatrix4(h.matrixWorld);h.matrixWorld.setPosition(x),h.matrixWorldInverse.copy(h.matrixWorld).invert();let S=.1,C=b+m;h.near=S,h.far=C,xi(h.projectionMatrix,-m,m,m,-m,S,C),r.viewProj.multiplyMatrices(h.projectionMatrix,h.matrixWorldInverse);let w=gr.fields;w.matrices.value[e]=r.viewProj.clone(),w.cascades.value[e]=new P(l,v,this.normalBias[e]??.05,C-S)}update(e,t){this.frame++;let n=this.enabled&&t.y>-.05;if(gr.fields.enabled.value=+!!n,this.skipUnused&&n&&!this._samplingEnabled&&this.invalidateStatic(),this._samplingEnabled=n,!this.enabled||this.skipUnused&&!n)return[];e.updateMatrixWorld();let r=this.lastSun.angleTo(t)>1e-4;this.lastSun.copy(t);let i=[];for(let n=0;n<this.count;n++)(r||this.cascades[n].dirty||(this.frame+n)%this.periods[n]===0)&&(this._fit(n,e,t),this.cascades[n].dirty=!1,i.push(n));return i}render(e,t,n){for(let r of n){let n=this.cascades[r];Br(n.camera,this.size,this.size,{block:n.block});let i={label:`shadow cascade `+r,kind:`depth`,camera:n.camera,frameBlock:n.block,depthView:this.texture.view({dimension:`2d`,baseArrayLayer:r,arrayLayerCount:1}),depthFormat:`depth32float`,clearDepth:1,depthCompare:`less-equal`,layerMask:this.layerMask,depthBias:2,depthBiasSlopeScale:1.5};if(!this.cacheStatic){t.render(e,i);continue}this.staticTexture||=new H({label:`staticShadowCache`,width:this.size,height:this.size,depth:this.count,dimension:`2d-array`,format:`depth32float`,usage:[`render`,`copySrc`]});let a=t.collect(e,{...i,filter:e=>e.shadowStatic===!0}),o=bi(n,a);n.staticKey!==o&&(t.render(e,{...i,label:`shadow static cascade `+r,items:a,depthView:this.staticTexture.view({dimension:`2d`,baseArrayLayer:r,arrayLayerCount:1})}),n.staticKey=!t.precompiling&&[...t.pipelines.values()].every(e=>e.handle.pipeline)?o:null),I.getEncoder().copyTextureToTexture({texture:this.staticTexture.getGPU(),origin:{x:0,y:0,z:r}},{texture:this.texture.getGPU(),origin:{x:0,y:0,z:r}},{width:this.size,height:this.size,depthOrArrayLayers:1}),t.render(e,{...i,clearDepth:null,filter:e=>e.shadowStatic!==!0})}}};function bi(e,t){let n=[...e.viewProj.elements.map(Math.fround),Math.fround(e.camera.near),Math.fround(e.camera.far)];for(let e of[...t.opaque,...t.transparent]){let t=e.object,r=e.geometry,i=e.material;n.push(t.id,r.id,i.id,i.version,e.start,e.count,t.count??1,t.shadowRevision??0,i.side,i.alphaTest,i.depthWrite,i.shadow,...t.matrixWorld.elements),t.drawParams&&n.push(...t.drawParams);for(let[e,t]of Object.entries(r.attributes)){let r=t.data||t;n.push(e,vi(t),vi(r.array),r.version,t.count)}r.index&&n.push(vi(r.index),vi(r.index.array),r.index.version,r.index.count),t.instanceMatrix&&n.push(vi(t.instanceMatrix),vi(t.instanceMatrix.array),t.instanceMatrix.version);for(let e of Object.values(i.uniforms||{})){let t=e.value;typeof t==`number`||typeof t==`boolean`?n.push(t):t?.elements?n.push(...t.elements):Array.isArray(t)||ArrayBuffer.isView(t)?n.push(...t):t&&typeof t==`object`&&n.push(t.x,t.y,t.z,t.w,t.r,t.g,t.b)}}return n.join(`|`)}function xi(e,t,n,r,i,a,o){let s=1/(n-t),c=1/(r-i),l=1/(o-a);return e.set(2*s,0,0,-(n+t)*s,0,2*c,0,-(r+i)*c,0,0,-l,-a*l,0,0,0,1),e}var Si=`
struct FSIn { @builtin( position ) pos: vec4f, @location( 0 ) uv: vec2f };
@vertex fn vs( @builtin( vertex_index ) i: u32 ) -> FSIn {
	let p = vec2f( f32( ( i << 1u ) & 2u ), f32( i & 2u ) );
	var o: FSIn;
	o.pos = vec4f( p * 2.0 - 1.0, FS_DEPTH, 1.0 );
	o.uv = vec2f( p.x, 1.0 - p.y );
	return o;
}
`,W=class{constructor({label:e=`fullscreen`,modules:t=[],bindings:n={},code:r,colorFormats:i=[`rgba16float`],blend:a=`none`,defines:o={},depthFormat:s=null,depthCompare:c=`always`,depthWrite:l=!1,depth:u=0,writeMasks:d=null,blends:f=null}){this.label=e,this.colorFormats=i;let p=r.includes(`@fragment`)?r:`${r}\n@fragment fn fs( in: FSIn ) -> @location( 0 ) vec4f { return fragment( in ); }\n`,m=or({modules:[z,...t],bindings:n,code:Si.replace(`FS_DEPTH`,u.toFixed(6))+p,defines:o,stage:`render`,label:e});this.source=m.code,this.bindings=m.bindings;let h=ur(m.code,e),g={label:e,layout:I.device.createPipelineLayout({bindGroupLayouts:[m.group0.layout,m.bindings.layout]}),vertex:{module:h,entryPoint:`vs`},fragment:{module:h,entryPoint:`fs`,targets:i.map((e,t)=>({format:e,blend:Nr(f?f[t]:t===0?a:`none`),writeMask:d?d[t]:GPUColorWrite.ALL}))},primitive:{topology:`triangle-list`}};s&&(g.depthStencil={format:s,depthCompare:c,depthWriteEnabled:l}),this.handle=I.renderPipeline(g),this.timestampWrites=null}get pipeline(){return I.ready(this.handle)}draw(e,t=Ir){e.setPipeline(I.ready(this.handle)),e.setBindGroup(0,ar(t,`render`).getBindGroup()),e.setBindGroup(1,this.bindings.getBindGroup()),e.draw(3)}render({colorViews:e,clear:t=null,viewport:n=null,frameBlock:r=Ir,depthView:i=null,encoder:a=I.getEncoder()}={}){let o=e.map(e=>e.isTexture?e.view({dimension:`2d`,mipLevelCount:1}):e),s={label:this.label,colorAttachments:o.map(e=>({view:e,loadOp:t?`clear`:`load`,storeOp:`store`,clearValue:t||[0,0,0,0]}))};i&&(s.depthStencilAttachment={view:i,depthLoadOp:`load`,depthStoreOp:`store`}),this.timestampWrites&&(s.timestampWrites=this.timestampWrites);let c=a.beginRenderPass(s);n&&c.setViewport(...n),this.draw(c,r),c.end()}},Ci=new N,wi=new Pe,Ti=new Ve,Ei=new F,Di=new F,Oi={OPAQUE:0,WATER:1,TRANSPARENT:2,REFLECT_ONLY:3},ki=wn(Cn().compactTargets),Ai=`depth32float`,ji=class{constructor(e,t,n){this.meshRenderer=e,this.scene=t,this.camera=n,this.scale=1,this.waterEnabled=!0,this.refractionEnabled=!0,this.renderOptimizations=Cn(),this.visibilityDepth=!this.renderOptimizations.reference&&new URLSearchParams(globalThis.location?.search||``).has(`visibilityDepth`),this.width=1,this.height=1,this.sceneRT=new U(1,1,{colors:ki.map((e,t)=>({format:e,name:[`color`,`velocity`,`waterMask`][t]})),depth:Ai,label:`scene`}),this.velocityTexture=this.sceneRT.textures[1],this.waterMaskTexture=this.sceneRT.textures[2],this.opaqueCopy=new U(1,1,{colors:[`rgba16float`],depth:Ai,label:`opaqueCopy`}),this.opaqueDepthHalf=new U(1,1,{colors:[`r16float`],label:`opaqueDepthHalf`}),this._depthHalfPass=null,this.hullMaskRT=new U(1,1,{colors:[`r16float`],depth:Ai,label:`hullMask`}),this.hullMaskScene=new Mt,this.hullMaskMaterial=new Ar({name:`hullMask`,lit:!1,side:`double`,surface:`s.albedo = vec3f( length( in.P - frame.cameraPos ), 0.0, 0.0 ); s.emissive = vec3f( 0.0 );`}),this.hullMasks=[],this.hullMaskActive={value:0},this.background=null,this.clearColor=[0,0,0,1],this.onBeforeWater=null}setSize(e,t){this.width=e,this.height=t,this.sceneRT.setSize(e,t),this.opaqueCopy.setSize(e,t),this.opaqueDepthHalf.setSize(e,t),this.hullMaskRT.setSize(e,t)}addHullMask(e,t){e.computeBoundingBox(),e.computeBoundingSphere();let n=new rn(e,this.hullMaskMaterial);return n.matrixAutoUpdate=!1,n.frustumCulled=!1,this.hullMaskScene.add(n),this.hullMasks.push({mesh:n,object:t,box:e.boundingBox.clone().expandByScalar(.05),sphere:e.boundingSphere}),n}_renderHullMasks(e){let t=0;Ti.setFromProjectionMatrix(Ei.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse));for(let n of this.hullMasks){n.object.updateWorldMatrix(!0,!1),n.mesh.matrix.copy(n.object.matrixWorld),n.mesh.matrixWorld.copy(n.object.matrixWorld),Ci.setFromMatrixPosition(e.matrixWorld).applyMatrix4(Di.copy(n.object.matrixWorld).invert());let r=!n.box.containsPoint(Ci)&&Ti.intersectsSphere(wi.copy(n.sphere).applyMatrix4(n.object.matrixWorld));n.mesh.visible=r,r&&t++}if(this.hullMaskActive.value=+(t>0),!t)return;let n=this.hullMaskRT;this.meshRenderer.render(this.hullMaskScene,{label:`hull mask`,kind:`color`,camera:e,colorViews:[n.texture.view()],colorFormats:n.formats,clearColors:[[0,0,0,0]],depthView:n.depthTexture.view(),depthFormat:Ai,clearDepth:0,cull:!1})}render(){let{scene:e,camera:t,meshRenderer:n}=this,r=this.sceneRT,i={camera:t,colorViews:r.textures.map(e=>e.view()),colorFormats:r.formats,depthView:r.depthTexture.view(),depthFormat:Ai,kind:`main`};this.visibilityDepth&&n.render(e,{label:`opaque visibility depth`,kind:`visibility`,camera:t,depthView:i.depthView,depthFormat:Ai,clearDepth:0,layerMask:1<<Oi.OPAQUE,filter:e=>!Array.isArray(e.material)&&!e.material.transparent&&e.material.colorWrite&&e.material.depthWrite&&e.material.depthTest&&(e.material.depthCompare===null||e.material.depthCompare===`greater-equal`)&&e.material.blending===`none`&&!e.material.output}),n.render(e,{...i,label:`opaque`,layerMask:1<<Oi.OPAQUE,clearColors:[this.clearColor,[0,0,0,0],[0,0,0,0]],clearDepth:this.visibilityDepth?null:0,after:this.background?e=>this.background.draw(e):null});let a=I.getEncoder(),o={width:r.width,height:r.height};this.waterEnabled&&a.copyTextureToTexture({texture:r.texture.getGPU()},{texture:this.opaqueCopy.texture.getGPU()},o),a.copyTextureToTexture({texture:r.depthTexture.getGPU()},{texture:this.opaqueCopy.depthTexture.getGPU()},o),this.waterEnabled&&this.refractionEnabled&&!this._depthHalfPass&&(this._depthHalfPass=new W({label:`opaque depth half`,colorFormats:[`r16float`],bindings:{srcDepth:{texture:()=>this.opaqueCopy.depthTexture}},code:`fn fragment( in: FSIn ) -> vec4f { return vec4f( textureLoad( srcDepth, vec2i( in.pos.xy ), 0 ), 0.0, 0.0, 1.0 ); }`})),this.waterEnabled&&this.refractionEnabled&&this._depthHalfPass.render({colorViews:[this.opaqueDepthHalf.texture],clear:[0,0,0,0]}),this.waterEnabled&&this.hullMasks.length>0&&this._renderHullMasks(t),this.waterEnabled&&this.refractionEnabled&&this.onBeforeWater&&this.onBeforeWater(),n.render(e,{...i,label:`water + transparent`,late:!0,layerMask:(this.waterEnabled?1<<Oi.WATER:0)|1<<Oi.TRANSPARENT})}},Mi=class{constructor({label:e=`kernel`,modules:t=[],bindings:n={},code:r,workgroupSize:i=[64,1,1],defines:a={},entryPoint:o=`main`}){this.label=e,this.workgroupSize=i;let[s,c=1,l=1]=i,u=or({modules:t,bindings:n,code:r.replace(/\bWG_X\b/g,s).replace(/\bWG_Y\b/g,c).replace(/\bWG_Z\b/g,l),defines:a,stage:`compute`,label:e});this.source=u.code,this.bindings=u.bindings,this.group0=u.group0;let d=ur(u.code,e);this.handle=I.computePipeline({label:e,layout:I.device.createPipelineLayout({bindGroupLayouts:[u.group0.layout,u.bindings.layout]}),compute:{module:d,entryPoint:o}}),this.timestampWrites=null}get pipeline(){return I.ready(this.handle)}dispatch(e,{pass:t=null,indirect:n=null}={}){let[r,i=1,a=1]=Array.isArray(e)?e:[e];if(!n&&(r===0||i===0||a===0))return;let o=e=>{e.setPipeline(I.ready(this.handle)),e.setBindGroup(0,this.group0.getBindGroup()),e.setBindGroup(1,this.bindings.getBindGroup()),n?e.dispatchWorkgroupsIndirect(n.buffer.getGPU?n.buffer.getGPU():n.buffer,n.offset||0):e.dispatchWorkgroups(r,i,a)};t?o(t):I.computePass(this.label,o,this.timestampWrites||void 0)}groups(e,t=1,n=1){let[r,i=1,a=1]=this.workgroupSize;return[Math.ceil(e/r),Math.ceil(t/i),Math.ceil(n/a)]}},Ni=class{constructor({byteLength:e,ring:t=3,label:n=`readback`}){this.byteLength=Math.ceil(e/4)*4,this.label=n,this.ring=[];for(let e=0;e<t;e++)this.ring.push({buffer:null,busy:!1,frame:0});this.latest=null,this.frame=-1,this.onData=null,this._generation=0}invalidate(){this._generation++,this.latest=null,this.frame=-1}_slot(){for(let e of this.ring)if(!e.busy)return e.buffer||=I.device.createBuffer({label:this.label,size:this.byteLength,usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST}),e;return null}request(e,t=0){let n=this._slot();if(!n)return!1;let r=this._generation,i=this.onData;n.busy=!0,n.frame=I.frame;let a=e.getGPU?e.getGPU():e;return I.getEncoder().copyBufferToBuffer(a,t,n.buffer,0,this.byteLength),I.onSubmit(null,()=>{n.buffer.mapAsync(GPUMapMode.READ).then(()=>{let e=n.buffer.getMappedRange().slice(0);n.buffer.unmap(),n.busy=!1,r===this._generation&&n.frame>=this.frame&&(this.latest=e,this.frame=n.frame,i&&i(e,n.frame))}).catch(()=>{n.busy=!1})}),!0}},Pi=6360,Fi=6460,Ii=.00537625,Li=256,Ri=64,zi=32,Bi=192,Vi=108,Hi=Math.log(1.02),G=e=>{let t=String(e);return t.includes(`.`)||t.includes(`e`)?t:t+`.0`};function Ui(e,t,n){return new H({label:n,width:e,height:t,format:`rgba16float`,usage:[`sample`,`storage`]})}function Wi(){return`
const ATMO_RG: f32 = ${G(Pi)};
const ATMO_RT: f32 = ${G(Fi)};

struct AtmosphereMedium {
	rayScat: vec3f,
	mieScat: f32,
	extinction: vec3f,
	scattering: vec3f,
};

fn atmosphereMedium( hKm: f32 ) -> AtmosphereMedium {
	let rayDensity = exp( - hKm / 8.0 );
	let mieDensity = exp( - hKm / 1.2 );
	let ozoneDensity = max( 0.0, 1.0 - abs( hKm - 25.0 ) / 15.0 );
	var m: AtmosphereMedium;
	m.rayScat = vec3f( 5.802e-3, 13.558e-3, 33.1e-3 ) * rayDensity * atmosphereParams.rayleighScale;
	m.mieScat = 3.996e-3 * mieDensity * atmosphereParams.mieScale;
	let mieExt = 4.440e-3 * mieDensity * atmosphereParams.mieScale;
	let ozoneAbs = vec3f( 0.650e-3, 1.881e-3, 0.085e-3 ) * ozoneDensity * atmosphereParams.ozoneScale;
	m.extinction = m.rayScat + mieExt + ozoneAbs;
	m.scattering = m.rayScat + m.mieScat;
	return m;
}

// (r, mu) -> transmittance LUT uv
fn atmosphereTransmittanceUV( r: f32, mu: f32 ) -> vec2f {
	let H = sqrt( ATMO_RT * ATMO_RT - ATMO_RG * ATMO_RG );
	let rho = sqrt( max( r * r - ATMO_RG * ATMO_RG, 0.0 ) );
	let disc = r * r * ( mu * mu - 1.0 ) + ATMO_RT * ATMO_RT;
	let d = max( 0.0, - r * mu + sqrt( max( disc, 0.0 ) ) );
	let dMin = ATMO_RT - r;
	let dMax = rho + H;
	let xMu = ( d - dMin ) / ( dMax - dMin );
	let xR = rho / H;
	// unit -> sub-uv
	return vec2f( ( xMu + ${G(.5/Li)} ) * ${G(Li/257)}, ( xR + ${G(.5/Ri)} ) * ${G(Ri/65)} );
}

// nearest positive ray-sphere intersection from ro (km, planet centered), -1 if none
fn atmosphereRaySphereNearest( ro: vec3f, rd: vec3f, radius: f32 ) -> f32 {
	let b = dot( ro, rd );
	let c = dot( ro, ro ) - radius * radius;
	let disc = b * b - c;
	let sq = sqrt( max( disc, 0.0 ) );
	let t0 = - b - sq;
	let t1 = - b + sq;
	return select( select( select( -1.0, t1, t1 > 0.0 ), t0, t0 > 0.0 ), -1.0, disc < 0.0 );
}
`}var Gi=class{constructor(e=null){this.renderer=e,this.transmittanceLUT=Ui(Li,Ri,`atmoTransmittance`),this.multiScatLUT=Ui(zi,zi,`atmoMultiScat`),this.skyViewLUT=Ui(Bi,Vi,`atmoSkyView`),this.params=new L(`AtmosphereParams`,{rayleighScale:[`f32`,1],mieScale:[`f32`,1],mieG:[`f32`,.8],ozoneScale:[`f32`,1],groundAlbedo:[`vec3f`,new Ee(.06,.08,.1)],viewHeight:[`f32`,6360.002],sunIlluminance:[`vec3f`,new Ee(11,11,11)],pad0:[`f32`,0],sunDir:[`vec3f`,new N(.3,.6,-.7).normalize()],pad1:[`f32`,0]},{label:`atmosphere`});let t=this.params.fields;this.rayleighScale=t.rayleighScale,this.mieScale=t.mieScale,this.mieG=t.mieG,this.ozoneScale=t.ozoneScale,this.groundAlbedo=t.groundAlbedo,this.viewHeight=t.viewHeight,this.sunIlluminance=t.sunIlluminance,this.sunDir=t.sunDir,this.irrBuffer=new li({label:`atmoIrr`,count:4,type:`vec4f`}),this.readback=new Ni({byteLength:48,label:`atmoIrrReadback`}),this.readback.onData=e=>this._onIrradiance(e),this._buildModules(),this._build(),this.needsStatic=!0,this._irrPending=!1,this._irrTimer=0,this.skyIrradiance=null,this.sunTransmittance=null,this.horizon=null,this.onIrradiance=null}_buildModules(){this.coreModule=new R({name:`atmosphereCore`,deps:[z],uniforms:this.params,uniformName:`atmosphereParams`,code:Wi()}),this.transmittanceModule=new R({name:`atmosphereTransmittance`,deps:[this.coreModule],bindings:{atmosphereTransmittanceLUT:{texture:this.transmittanceLUT}},code:`
fn atmosphereSampleTransmittance( r: f32, mu: f32 ) -> vec3f {
	return textureSampleLevel( atmosphereTransmittanceLUT, smpLinearClamp, atmosphereTransmittanceUV( r, mu ), 0.0 ).rgb;
}
// Transmittance from the viewer toward direction dir (for sun disk / sun light color).
fn atmosphereTransmittanceToSpace( dir: vec3f ) -> vec3f {
	return atmosphereSampleTransmittance( atmosphereParams.viewHeight, dir.y );
}
`}),this.multiScatModule=new R({name:`atmosphereMultiScat`,deps:[this.coreModule],bindings:{atmosphereMultiScatLUT:{texture:this.multiScatLUT}},code:`
fn atmosphereSampleMultiScat( r: f32, cosSun: f32 ) -> vec3f {
	let uv = vec2f( cosSun * 0.5 + 0.5, ( r - ATMO_RG ) / ( ATMO_RT - ATMO_RG ) );
	let suv = uv * ${G(31/zi)} + ${G(.5/zi)};
	return textureSampleLevel( atmosphereMultiScatLUT, smpLinearClamp, suv, 0.0 ).rgb;
}
`}),this.module=new R({name:`atmosphere`,deps:[this.transmittanceModule],bindings:{atmosphereSkyViewLUT:{texture:this.skyViewLUT}},code:`
// Sky luminance (no sun disk) for world direction dir (normalized).
fn atmosphereSkyLuminance( dir: vec3f ) -> vec3f {
	let viewH = atmosphereParams.viewHeight;
	let vHorizon = sqrt( max( viewH * viewH - ATMO_RG * ATMO_RG, 0.0 ) );
	let beta = acos( vHorizon / viewH );
	let zenithHorizonAngle = PI - beta;
	let viewZenithAngle = acos( clamp( dir.y, -1.0, 1.0 ) );

	let vCoordA = ( 1.0 - sqrt( max( 1.0 - viewZenithAngle / zenithHorizonAngle, 0.0 ) ) ) * 0.5;
	let vCoordB = sqrt( max( ( viewZenithAngle - zenithHorizonAngle ) / beta, 0.0 ) ) * 0.5 + 0.5;
	let v = select( vCoordB, vCoordA, viewZenithAngle < zenithHorizonAngle );

	// azimuth relative to sun
	let sunH = normalize( vec2f( atmosphereParams.sunDir.x, atmosphereParams.sunDir.z ) + vec2f( 1e-5, 0.0 ) );
	let dirH = normalize( vec2f( dir.x, dir.z ) + vec2f( 1e-5, 0.0 ) );
	let lightViewCos = dot( sunH, dirH );
	let u = sqrt( clamp( lightViewCos * -0.5 + 0.5, 0.0, 1.0 ) );

	let suv = vec2f( u * ${G(191/Bi)} + ${G(.5/Bi)}, v * ${G(107/Vi)} + ${G(.5/Vi)} );
	return textureSampleLevel( atmosphereSkyViewLUT, smpLinearClamp, suv, 0.0 ).rgb;
}
`})}_build(){this.transmittanceKernel=new Mi({label:`Atmosphere Transmittance`,modules:[this.coreModule],bindings:{outLUT:{storageTexture:this.transmittanceLUT}},workgroupSize:[8,8,1],code:`
@compute @workgroup_size( WG_X, WG_Y, WG_Z )
fn main( @builtin( global_invocation_id ) gid: vec3u ) {
	let px = gid.xy;
	let uv = ( vec2f( px ) + 0.5 ) / vec2f( ${G(Li)}, ${G(Ri)} );
	let xMu = ( uv.x - ${G(.5/Li)} ) * ${G(Li/255)};
	let xR = ( uv.y - ${G(.5/Ri)} ) * ${G(Ri/63)};
	let H = sqrt( ATMO_RT * ATMO_RT - ATMO_RG * ATMO_RG );
	let rho = xR * H;
	let r = sqrt( rho * rho + ATMO_RG * ATMO_RG );
	let dMin = ATMO_RT - r;
	let dMax = rho + H;
	let d = dMin + xMu * ( dMax - dMin );
	let mu = clamp( select( ( H * H - rho * rho - d * d ) / ( 2.0 * r * d ), 1.0, d == 0.0 ), -1.0, 1.0 );

	let ro = vec3f( 0.0, r, 0.0 );
	let rd = vec3f( sqrt( max( 1.0 - mu * mu, 0.0 ) ), mu, 0.0 );
	let tMax = atmosphereRaySphereNearest( ro, rd, ATMO_RT );
	let steps = 40;
	let dt = tMax / f32( steps );
	var od = vec3f( 0.0 );
	for ( var i = 0; i < steps; i++ ) {
		let t = ( f32( i ) + 0.5 ) * dt;
		let p = ro + rd * t;
		let h = length( p ) - ATMO_RG;
		od += atmosphereMedium( h ).extinction * dt;
	}
	textureStore( outLUT, px, vec4f( exp( - od ), 1.0 ) );
}
`}),this.multiScatKernel=new Mi({label:`Atmosphere MultiScat`,modules:[this.transmittanceModule],bindings:{outLUT:{storageTexture:this.multiScatLUT}},workgroupSize:[8,8,1],code:`
@compute @workgroup_size( WG_X, WG_Y, WG_Z )
fn main( @builtin( global_invocation_id ) gid: vec3u ) {
	let px = gid.xy;
	let uv = ( ( vec2f( px ) + 0.5 ) / ${G(zi)} - ${G(.5/zi)} ) * ${G(zi/31)};
	let cosSun = uv.x * 2.0 - 1.0;
	let r = ATMO_RG + clamp( uv.y, 0.001, 0.999 ) * ( ATMO_RT - ATMO_RG );
	let sunDir = normalize( vec3f( 0.0, cosSun, - sqrt( max( 1.0 - cosSun * cosSun, 0.0 ) ) ) );
	let ro = vec3f( 0.0, r, 0.0 );

	var Lsum = vec3f( 0.0 );
	var fmsSum = vec3f( 0.0 );
	const SQ = 8;
	let isoPhase = 1.0 / ( 4.0 * PI );

	for ( var i = 0; i < SQ * SQ; i++ ) {
		let ii = ( f32( i % SQ ) + 0.5 ) / f32( SQ );
		let jj = ( f32( i / SQ ) + 0.5 ) / f32( SQ );
		let theta = ii * 2.0 * PI;
		let phi = acos( 1.0 - jj * 2.0 );
		let rd = vec3f( cos( theta ) * sin( phi ), cos( phi ), sin( theta ) * sin( phi ) );

		let tBottom = atmosphereRaySphereNearest( ro, rd, ATMO_RG );
		let tTop = atmosphereRaySphereNearest( ro, rd, ATMO_RT );
		let hitGround = tBottom > 0.0;
		let tMax = select( tTop, tBottom, hitGround );
		let steps = 20;
		let dt = tMax / f32( steps );
		var throughput = vec3f( 1.0 );
		var L = vec3f( 0.0 );
		var fms = vec3f( 0.0 );

		for ( var s = 0; s < steps; s++ ) {
			let t = ( f32( s ) + 0.3 ) * dt;
			let p = ro + rd * t;
			let pr = length( p );
			let m = atmosphereMedium( pr - ATMO_RG );
			let up = p / pr;
			let cosSunP = dot( up, sunDir );
			let Tsun = atmosphereSampleTransmittance( pr, cosSunP );
			let shadowT = atmosphereRaySphereNearest( p, sunDir, ATMO_RG );
			let earthShadow = select( 1.0, 0.0, shadowT > 0.0 );
			let S = Tsun * earthShadow * m.scattering * isoPhase;
			let Tstep = exp( - m.extinction * dt );
			let ext = max( m.extinction, vec3f( 1e-6 ) );
			L += throughput * ( S - S * Tstep ) / ext;
			fms += throughput * ( m.scattering - m.scattering * Tstep ) / ext;
			throughput *= Tstep;
		}

		if ( hitGround ) {
			let p = ro + rd * tMax;
			let up = normalize( p );
			let cosS = dot( up, sunDir );
			let Tsun = atmosphereSampleTransmittance( ATMO_RG, cosS );
			L += Tsun * throughput * max( cosS, 0.0 ) * atmosphereParams.groundAlbedo / PI;
		}

		Lsum += L * ( 4.0 * PI / f32( SQ * SQ ) );
		fmsSum += fms * ( 4.0 * PI / f32( SQ * SQ ) );
	}

	let Lin = Lsum * isoPhase;
	let fmsAvg = fmsSum * isoPhase;
	let Lms = Lin / ( vec3f( 1.0 ) - fmsAvg );
	textureStore( outLUT, px, vec4f( Lms, 1.0 ) );
}
`}),this.skyViewKernel=new Mi({label:`Atmosphere SkyView`,modules:[this.transmittanceModule,this.multiScatModule],bindings:{outLUT:{storageTexture:this.skyViewLUT}},workgroupSize:[8,8,1],code:`
@compute @workgroup_size( WG_X, WG_Y, WG_Z )
fn main( @builtin( global_invocation_id ) gid: vec3u ) {
	let px = gid.xy;
	if ( px.x >= ${Bi}u || px.y >= ${Vi}u ) { return; }
	let uv = ( vec2f( px ) + 0.5 ) / vec2f( ${G(Bi)}, ${G(Vi)} );
	let u = ( uv.x - ${G(.5/Bi)} ) * ${G(Bi/191)};
	let v = ( uv.y - ${G(.5/Vi)} ) * ${G(Vi/107)};

	let viewH = atmosphereParams.viewHeight;
	let vHorizon = sqrt( max( viewH * viewH - ATMO_RG * ATMO_RG, 0.0 ) );
	let beta = acos( vHorizon / viewH );
	let zenithHorizonAngle = PI - beta;

	var vzA = 0.0;
	if ( v < 0.5 ) {
		var c = v * 2.0;
		c = 1.0 - c;
		c = c * c;
		c = 1.0 - c;
		vzA = zenithHorizonAngle * c;
	} else {
		var c = v * 2.0 - 1.0;
		c = c * c;
		vzA = zenithHorizonAngle + beta * c;
	}

	let cosViewZenith = cos( vzA );
	let sinViewZenith = sin( vzA );
	let cu = u * u;
	let lightViewCos = - ( cu * 2.0 - 1.0 );
	let lightViewSin = sqrt( max( 1.0 - lightViewCos * lightViewCos, 0.0 ) );

	// local frame: up = +y, sun azimuth along +x
	let sunCosZ = atmosphereParams.sunDir.y;
	let sunSinZ = sqrt( max( 1.0 - sunCosZ * sunCosZ, 0.0 ) );
	let sunDir = vec3f( sunSinZ, sunCosZ, 0.0 );
	let rd = vec3f( sinViewZenith * lightViewCos, cosViewZenith, sinViewZenith * lightViewSin );
	let ro = vec3f( 0.0, viewH, 0.0 );

	let tBottom = atmosphereRaySphereNearest( ro, rd, ATMO_RG );
	let tTop = atmosphereRaySphereNearest( ro, rd, ATMO_RT );
	let tMax = select( tTop, tBottom, tBottom > 0.0 );
	let steps = 32;
	let cosTheta = dot( rd, sunDir );
	let rayPhase = ${G(3/(16*Math.PI))} * ( cosTheta * cosTheta + 1.0 );
	let g = atmosphereParams.mieG;
	let g2 = g * g;
	// Cornette-Shanks
	let miePhase = ${G(3/(8*Math.PI))} * ( ( 1.0 - g2 ) * ( cosTheta * cosTheta + 1.0 ) )
		/ ( ( g2 + 2.0 ) * pow( max( g2 + 1.0 - g * cosTheta * 2.0, 1e-4 ), 1.5 ) );

	var throughput = vec3f( 1.0 );
	var L = vec3f( 0.0 );

	for ( var i = 0; i < steps; i++ ) {
		// quadratic step distribution
		let t0 = f32( i ) / f32( steps );
		let t1 = ( f32( i ) + 1.0 ) / f32( steps );
		let ta = t0 * t0 * tMax;
		let tb = t1 * t1 * tMax;
		let t = mix( ta, tb, 0.3 );
		let dt = tb - ta;
		let p = ro + rd * t;
		let pr = length( p );
		let m = atmosphereMedium( pr - ATMO_RG );
		let up = p / pr;
		let cosSunP = dot( up, sunDir );
		let Tsun = atmosphereSampleTransmittance( pr, cosSunP );
		let shadowT = atmosphereRaySphereNearest( p, sunDir, ATMO_RG );
		let earthShadow = select( 1.0, 0.0, shadowT > 0.0 );
		let ms = atmosphereSampleMultiScat( pr, cosSunP );
		let phaseScat = m.rayScat * rayPhase + vec3f( m.mieScat * miePhase );
		let S = Tsun * earthShadow * phaseScat + ms * m.scattering;
		let Tstep = exp( - m.extinction * dt );
		let ext = max( m.extinction, vec3f( 1e-6 ) );
		L += throughput * ( S - S * Tstep ) / ext;
		throughput *= Tstep;
	}

	textureStore( outLUT, px, vec4f( L * atmosphereParams.sunIlluminance, 1.0 ) );
}
`}),this.irradianceKernel=new Mi({label:`Atmosphere Irradiance`,modules:[this.module],bindings:{irr:{storage:this.irrBuffer,access:`read_write`}},workgroupSize:[1,1,1],code:`
@compute @workgroup_size( 1 )
fn main() {
	var sum = vec3f( 0.0 );
	const N = 16;
	for ( var i = 0; i < N * N; i++ ) {
		let a = ( f32( i % N ) + 0.5 ) / f32( N );
		let b = ( f32( i / N ) + 0.5 ) / f32( N );
		// cosine-weighted hemisphere
		let r = sqrt( b );
		let phi = a * 2.0 * PI;
		let dir = vec3f( r * cos( phi ), sqrt( max( 1.0 - b, 0.0 ) ), r * sin( phi ) );
		sum += atmosphereSkyLuminance( dir );
	}
	// E = PI * mean(L) for cosine-weighted samples; store E/PI (radiance-equivalent irradiance)
	irr[ 0 ] = vec4f( sum / f32( N * N ), 1.0 );
	// sun transmittance at sea level for the current sun direction
	let Ts = atmosphereSampleTransmittance( ATMO_RG + 0.001, atmosphereParams.sunDir.y );
	irr[ 1 ] = vec4f( Ts, 1.0 );
	// horizon color (average around the horizon)
	var hs = vec3f( 0.0 );
	for ( var i = 0; i < 16; i++ ) {
		let phi = f32( i ) * ( 2.0 * PI / 16.0 );
		hs += atmosphereSkyLuminance( normalize( vec3f( cos( phi ), 0.03, sin( phi ) ) ) );
	}
	irr[ 2 ] = vec4f( hs / 16.0, 1.0 );
}
`})}update(e,t){let n=Math.max(.5,t+.5),r=n<100?Math.round(n/2)*2:Math.exp(Math.round(Math.log(n)/Hi)*Hi);this.viewHeight.value=Pi+Math.max(.001,r/1e3);let i=!1;this.needsStatic&&(this.needsStatic=!1,i=!0,this.transmittanceKernel.dispatch([Li/8,Ri/8,1]),this.multiScatKernel.dispatch([zi/8,zi/8,1])),this.params._pack();let a=this.params.u32,o=this._svLast||=new Uint32Array(a.length);for(let e=0;e<a.length&&!i;e++)i=a[e]!==o[e];(i||!this._svValid)&&(o.set(a),this._svValid=!0,this.skyViewKernel.dispatch([Bi/8,Math.ceil(Vi/8),1])),this._irrTimer-=e,this._irrTimer<=0&&!this._irrPending&&(this._irrTimer=.25,this.irradianceKernel.dispatch(1),this.readback.request(this.irrBuffer)&&(this._irrPending=!0))}_onIrradiance(e){let t=new Float32Array(e);this.skyIrradiance=[t[0],t[1],t[2]],this.sunTransmittance=[t[4],t[5],t[6]],this.horizon=[t[8],t[9],t[10]],this._irrPending=!1,this.onIrradiance&&this.onIrradiance(this)}invalidate(){this.needsStatic=!0,this._svValid=!1}},Ki=160,qi=.1,Ji=new N(.3,.2,1).normalize(),Yi=.08,Xi=e=>{let t=String(e);return t.includes(`.`)||t.includes(`e`)?t:t+`.0`},Zi=class{constructor(e){this.atmosphere=e,this.clouds=null,this.params=new L(`SkyParams`,{moonDir:[`vec3f`,new N(-.3,.5,.8).normalize()],sunDiskIntensity:[`f32`,1],starIntensity:[`f32`,0]},{label:`sky`}),this.sunDiskIntensity=this.params.fields.sunDiskIntensity,this.moonDir=this.params.fields.moonDir,this.starIntensity=this.params.fields.starIntensity,this._module=null,this._background=null}get module(){return this._module||=this._buildModule(),this._module}_buildModule(){let e=this.clouds,t=[z,this.atmosphere.module];e&&t.push(e.module);let n=t=>e?`let c = ${t}( dir );\n\treturn base * c.a + c.rgb;`:`return base;`;return new R({name:`sky`,deps:t,uniforms:this.params,uniformName:`skyParams`,code:`
// hash without sine (D. Hoskins): keeps full precision for large integer coordinates
fn skyHash13( p: vec3f ) -> f32 {
	var p3 = fract( p * vec3f( 0.1031, 0.1030, 0.0973 ) );
	p3 += dot( p3, p3.yzx + 33.33 );
	return fract( ( p3.x + p3.y ) * p3.z );
}

// Sun disk radiance along dir (already includes atmospheric transmittance).
fn skySunDisk( dir: vec3f ) -> vec3f {
	let cosA = dot( dir, atmosphereParams.sunDir ); // the real sun (frame.sunDir is the moon at night)
	let ang = acos( clamp( cosA, -1.0, 1.0 ) );
	let r = ang / ${Xi(Ii)};
	let mask = smoothstep( 1.0, 0.9, r );
	let mu = sqrt( max( 1.0 - r * r, 0.0 ) );
	let limb = 1.0 - 0.6 * ( 1.0 - mu );
	let T = atmosphereTransmittanceToSpace( dir );
	// physically the disk radiance is E / solid angle (~1.6e5); clamp for fp16 targets
	return T * mask * limb * 2500.0 * skyParams.sunDiskIntensity * smoothstep( -0.02, 0.0, dir.y );
}

// Stars: one candidate per cell of a cube-face grid, jittered inside it, with a power law
// magnitude distribution (few bright stars, many faint ones), denser along the Milky Way. They
// come out after civil twilight: the brightest first, the faintest once the sky is fully dark.
fn skyStars( dir: vec3f ) -> vec3f {
	// cube face coordinates
	let a = abs( dir );
	let onX = a.x > a.y && a.x > a.z;
	let onY = a.y > a.z;
	let face = select( select( sign( dir.z ) + 8.0, sign( dir.y ) + 5.0, onY ), sign( dir.x ) + 2.0, onX );
	let uv = select( select( dir.xy / a.z, dir.xz / a.y, onY ), dir.yz / a.x, onX ) * ${Xi(Ki)};
	let cell = vec3f( floor( uv ), face );
	let h = skyHash13( cell );
	let bx = dot( dir, vec3f( ${Xi(Ji.x)}, ${Xi(Ji.y)}, ${Xi(Ji.z)} ) ) * 4.0;
	let band = exp( - bx * bx );
	// the cell holds a star with probability P (higher along the Milky Way); an independent
	// uniform u ranks its brightness: N( < m ) ~ 10^( m / 2 ), brightest about magnitude -1
	let has = h < band * 0.035 + 0.025;
	let uc = max( skyHash13( cell + 7.7 ), 2e-4 );
	let m = log2( uc ) * 0.602 + 6.5;
	// limiting magnitude: -1 when the sun is 6 deg below the horizon, 6.5 below 16 deg
	let dark = 1.0 - smoothstep( -0.28, -0.1, atmosphereParams.sunDir.y );
	let vis = smoothstep( m - 0.6, m + 0.6, dark * 7.5 - 1.0 ) * select( 0.0, 1.0, has );
	// angular distance to the star (isotropic whatever the cube face distortion), in cells
	let sp = ( floor( uv ) + vec2f( skyHash13( cell + 3.1 ), skyHash13( cell + 5.7 ) ) * 0.4 + 0.3 ) / ${Xi(Ki)};
	let sdir = normalize( select( select( vec3f( sp, sign( dir.z ) ), vec3f( sp.x, sign( dir.y ), sp.y ), onY ), vec3f( sign( dir.x ), sp ), onX ) );
	let d = length( dir - sdir ) * ${Xi(Ki)};
	// flux relative to a magnitude 6.5 star; bright stars look bigger (glare), not just clipped
	let flux = pow( uc, -0.8 );
	let size = log2( flux ) * 0.08 + 1.0;
	let psf = exp( d * d / ( size * size ) * ${Xi(-.5/(qi*qi))} ) / ( size * size );
	// subtle scintillation, stronger low in the sky
	let tw = sin( frame.time * ( skyHash13( cell + 13.3 ) * 9.0 + 5.0 ) + h * 60.0 ) * mix( 0.18, 0.06, sat( dir.y * 2.0 ) ) + 1.0;
	let col = mix( vec3f( 1.0, 0.8, 0.6 ), vec3f( 0.75, 0.85, 1.0 ), skyHash13( cell + 17.0 ) ) * 0.5 + 0.5;
	let star = col * ( psf * flux * vis * tw * 0.0075 );
	// diffuse glow of the Milky Way
	let glow = vec3f( 0.55, 0.6, 0.75 ) * ( band * dark * 0.0035 );
	// atmospheric extinction toward the horizon
	return ( star + glow ) * skyParams.starIntensity * smoothstep( 0.0, 0.2, dir.y );
}

fn skyMoon( dir: vec3f ) -> vec3f {
	let cosA = dot( dir, skyParams.moonDir );
	let ang = acos( clamp( cosA, -1.0, 1.0 ) );
	let r = ang / 0.0048;
	let mask = smoothstep( 1.0, 0.92, r );
	return vec3f( 0.9, 0.92, 1.0 ) * mask * 3.0 * skyParams.starIntensity * smoothstep( -0.02, 0.02, dir.y );
}

// Faint blue-grey moonlit sky (a little brighter toward the horizon) and the moon's aureole.
// Physically dim: about the level of the app's night ambient light.
fn skyMoonSky( dir: vec3f ) -> vec3f {
	let cosA = dot( dir, skyParams.moonDir );
	let ang = acos( clamp( cosA, -1.0, 1.0 ) );
	let aureole = exp( ang * -14.0 ) * 2.4 + exp( ang * -2.5 ) * 0.9;
	let grad = mix( 1.7, 1.0, sat( dir.y * 3.0 ) );
	let up = smoothstep( -0.05, 0.15, skyParams.moonDir.y );
	return vec3f( 0.005, 0.0068, 0.0105 ) * ( grad + aureole ) * frame.night * up;
}

// Everything behind the clouds except the sun and moon disks. The night terms are only
// evaluated at night (uniform branch).
fn skyBackground( dir: vec3f, starK: f32 ) -> vec3f {
	var L = atmosphereSkyLuminance( dir );
	if ( skyParams.starIntensity > 0.001 ) {
		L += skyMoonSky( dir ) + skyStars( dir ) * starK;
	}
	return L;
}

// Full sky radiance for a direction (no clouds).
fn skyRadiance( dir: vec3f, withSun: bool ) -> vec3f {
	var L = skyBackground( dir, 1.0 ) + skyMoon( dir );
	if ( withSun ) { L += skySunDisk( dir ); }
	return L;
}

// Sky with clouds composited (low resolution cloud panorama). withSun = false (environment
// map): no sun or moon disk, the key light is lit directly.
fn skyRadianceWithClouds( dir: vec3f, withSun: bool ) -> vec3f {
	var base: vec3f;
	if ( withSun ) { base = skyBackground( dir, 1.0 ) + skyMoon( dir ) + skySunDisk( dir ); }
	else { base = skyBackground( dir, ${Xi(Yi)} ); }
	${n(`cloudsSample`)}
}

// Water reflections: no moon disk (the water's specular lobe reflects the key light) and only a
// trace of the stars, which rough water would spread into flickering sparkles.
fn skyReflectionRadiance( dir: vec3f ) -> vec3f {
	let base = skyBackground( dir, ${Xi(Yi)} );
	${n(`cloudsSample`)}
}

// Main view background: full resolution clouds for the camera's view (the sun's disc behind them
// with cloudsSunTransmittance: no sun through the cut-off remainder of thick cloud)
fn skyViewRadiance( dir: vec3f ) -> vec3f {
	let base = skyBackground( dir, 1.0 ) + skyMoon( dir );
	let sun = skySunDisk( dir );
	${e?`let c = cloudsSampleView( dir );
	return base * c.a + sun * cloudsSunTransmittance( c.a ) + c.rgb;`:`return base + sun;`}
}
`})}get background(){if(!this._background){let e=new W({label:`sky background`,modules:[this.module],colorFormats:ki,depthFormat:Ai,depthCompare:`equal`,depthWrite:!1,depth:0,code:`
struct SkyOut {
	@location( 0 ) color: vec4f,
	@location( 1 ) velocity: vec4f,
	@location( 2 ) mask: vec4f,
};
@fragment fn fs( in: FSIn ) -> SkyOut {
	let uv = in.pos.xy * frame.invResolution;
	let dir = viewRay( uv );
	var o: SkyOut;
	o.color = vec4f( skyViewRadiance( dir ), 1.0 );
	// a direction at infinity: only the camera rotation moves it
	let c = frame.viewProjNoJitter * vec4f( dir, 0.0 );
	let p = frame.prevViewProjNoJitter * vec4f( dir, 0.0 );
	let cur = c.xy / max( abs( c.w ), 1e-6 ) * sign( c.w );
	let prev = p.xy / max( abs( p.w ), 1e-6 ) * sign( p.w );
	o.velocity = vec4f( select( vec2f( 0.0 ), ( cur - prev ) * vec2f( 0.5, -0.5 ), c.w > 1e-6 && p.w > 1e-6 ), 0.0, 1.0 );
	o.mask = vec4f( 0.0 );
	return o;
}
`});this._background={pass:e,draw:t=>e.draw(t)}}return this._background}backgroundNode(){return this.background}};function Qi(e,t=24,n=6,r=new N){let i=A.degToRad(t),a=A.degToRad(n),o=A.degToRad((e-12)*15),s=-Math.cos(a)*Math.sin(o),c=Math.cos(i)*Math.sin(a)-Math.sin(i)*Math.cos(a)*Math.cos(o),l=Math.sin(i)*Math.sin(a)+Math.cos(i)*Math.cos(a)*Math.cos(o);return r.set(s,l,-c).normalize()}var $i=new Map,ea=null;function ta(e){let t=$i.get(e);return t||(ea||=I.device.createShaderModule({label:`mipmap`,code:`
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
	`}),t=I.device.createRenderPipeline({label:`mipmap `+e,layout:`auto`,vertex:{module:ea,entryPoint:`vs`},fragment:{module:ea,entryPoint:`fs`,targets:[{format:e}]},primitive:{topology:`triangle-list`}}),$i.set(e,t),t)}var na=new WeakMap;function ra(e,t,n){let r=na.get(e);if(r&&r.gpu===t)return r;let i=e.mipLevelCount,a=e.dimension===`3d`?1:e.depth,o=[],s=n.getBindGroupLayout(0);for(let n=0;n<a;n++)for(let r=1;r<i;r++){let i=t.createView({dimension:`2d`,baseMipLevel:r-1,mipLevelCount:1,baseArrayLayer:n,arrayLayerCount:1}),a=t.createView({dimension:`2d`,baseMipLevel:r,mipLevelCount:1,baseArrayLayer:n,arrayLayerCount:1}),c=I.device.createBindGroup({label:`mipmap `+e.label,layout:s,entries:[{binding:0,resource:i},{binding:1,resource:I.samplers.linearClamp}]});o.push({bg:c,desc:{label:`mipmap`,colorAttachments:[{view:a,loadOp:`clear`,storeOp:`store`,clearValue:[0,0,0,0]}]}})}return r={gpu:t,pipeline:n,steps:o},na.set(e,r),r}function ia(e,t=I.getEncoder()){if(e.mipLevelCount<2)return;let n=e.getGPU(),r=ta(e.format),{steps:i}=ra(e,n,r);for(let e=0;e<i.length;e++){let n=t.beginRenderPass(i[e].desc);n.setPipeline(r),n.setBindGroup(0,i[e].bg),n.draw(3),n.end()}}async function aa(e,t){if(globalThis.__assetImage)return globalThis.__assetImage(e,t);let n=await createImageBitmap(new Blob([e],{type:t}),{colorSpaceConversion:`none`,premultiplyAlpha:`none`}),r=new OffscreenCanvas(n.width,n.height).getContext(`2d`,{willReadFrequently:!0});r.drawImage(n,0,0);let i=n.width,a=n.height,o=r.getImageData(0,0,i,a).data;return n.close&&n.close(),{data:new Uint8Array(o.buffer,o.byteOffset,o.byteLength),width:i,height:a}}var oa=e=>{let t=Number(e).toString();return/[.eE]/.test(t)?t:t+`.0`},sa=Math.PI/180,ca={atmosphere:{multipleScattering:.99},shape:{altitude:4e3,thickness:5200,density:.019,coverage:.49,horizonCoverageStart:2e4,horizonCoverageRamp:45e3,horizonCoverageAmount:.12,edgeSoftness:.095,edgeSoftnessFalloff:1,weatherScale:29e3,baseScale:7500,baseStrength:.69,erosionScaleBaseMultiplier:.13,erosionStrengthBase:.24,erosionStrengthPeak:2.15,erosionShape:1,baseWeatherStrength:.54,baseWeatherHeightStart:0,baseWeatherHeightEnd:.13},lighting:{scatteringAlbedo:1,powderStrength:.7,ambientIntensity:.7,groundBounceAlbedo:[.009134058699157796,.015208514418949472,.018500220124016652],baseShadowStrength:.88,baseShadowHeight:.13,moonGain:.65},wind:{speed:12,evolutionSpeed:60.8*12/89,skew:1750},fade:{hazeDensityScale:.62,horizonMeltStart:25e3,horizonMeltEnd:45e3},weather:{resolution:1024,mainMass:[4,5,0,1.32],detail:[6,6,1,.13],coverage:.26}},la={historyDivisor:2,lattice:4,maxSteps:256,lightTaps:6,stepMeters:25,fullLightingAlpha:.5,lightReuseSteps:3,historyWeight:.9},ua=512,da=160,fa=4,pa=256,ma=3e4,ha=()=>[0,0,0,0],ga=`
const SC_EARTH: f32 = 6371.0;
const SC_FAR: f32 = 250000.0;
const SC_AP_DIST: f32 = ${oa(ma)};

fn scRay( uv: vec2f ) -> vec3f {
	let ndc = vec2f( uv.x * 2.0 - 1.0, 1.0 - uv.y * 2.0 );
	return normalize( scf.forward.xyz + scf.right.xyz * ( ndc.x * scf.right.w * scf.position.w )
		+ scf.up.xyz * ( ndc.y * scf.position.w ) );
}
fn scSourceUV( pixel: vec2f ) -> vec2f {
	return ( pixel * scf.sampling.z + scf.sampling.xy + 0.5 ) / scf.viewport.zw;
}
fn scProjectPrevious( p: vec3f ) -> vec3f {
	let v = p - scf.previousPosition.xyz;
	let z = dot( v, scf.previousForward.xyz );
	let denom = max( z, 0.001 ) * scf.previousPosition.w;
	return vec3f( vec2f( dot( v, scf.previousRight.xyz ) / ( denom * scf.previousRight.w ),
		-dot( v, scf.previousUp.xyz ) / denom ) * 0.5 + 0.5, z );
}
fn scHG( mu: f32, g: f32 ) -> f32 {
	let d = max( 1.0 + g * g - 2.0 * g * mu, 0.001 );
	return ( 1.0 - g * g ) / ( 4.0 * PI * d * sqrt( d ) );
}
// normalized droplet phase: 80% forward / 20% backscatter; each higher order halves the asymmetry
fn scPhases( mu: f32 ) -> vec3f {
	return vec3f( scHG( mu, 0.8 ), scHG( mu, 0.4 ), scHG( mu, 0.2 ) ) * 0.8
		+ vec3f( scHG( mu, -0.2 ), scHG( mu, -0.1 ), scHG( mu, -0.05 ) ) * 0.2;
}

// ---- density (sky-pro density.wgsl)
struct ScCandidate {
	conservative: f32, edge: f32, top: f32, floorMask: f32,
	shellHeight: f32, localHeight: f32, coverage: f32, position: vec3f,
};
fn scShellHeight( p: vec3f ) -> f32 {
	let horizontal = p.xz - scf.position.xz;
	// parabolic radial height avoids subtracting two ~6,371,000 m f32 values
	let altitude = p.y + dot( horizontal, horizontal ) / ( 2.0 * SC_EARTH * 1000.0 );
	return ( altitude - scs.shell.x ) / scs.shell.y;
}
fn scConeLod( footprint: f32, scale: f32 ) -> f32 { return max( 0.0, log2( max( footprint * 64.0 / scale, 1.0 ) ) ); }
fn scCandidate( p: vec3f, coverage: f32, lod: f32 ) -> ScCandidate {
	let h = scShellHeight( p );
	var result: ScCandidate;
	result.conservative = 0.0;
	if ( h < -0.1 || h > 1.3 || coverage <= 0.0 ) { return result; }
	let windDirection = scs.wind.xy;
	let shapePosition = p - vec3f( scf.wind.x, 0.0, scf.wind.y )
		- vec3f( windDirection.x, 0.0, windDirection.y ) * ( scs.wind.z * max( h, 0.0 ) - scf.wind.z );
	let weather = textureSampleLevel( scWeatherMap, smpLinearRepeat, ( p.xz - scf.wind.xy ) / scs.shape.x, 0.0 ).r;
	let edge = max( scs.base.y * exp2( -max( h, 0.0 ) * scs.base.z ), 0.0001 );
	// an all-one noise sample bounds top dilation; a failed bound avoids the volume fetch
	let maximumTop = weather + coverage - 1.0 + 1.34 * scs.shape.z * coverage;
	if ( maximumTop < h - edge ) { return result; }
	let required = ( 1.0 - smoothstep( scs.base.w, max( scs.erosion.w, scs.base.w + 0.001 ), h ) ) * scs.base.x;
	let floorMask = smoothstep( required - 0.1, required, weather );
	if ( floorMask <= 0.0 ) { return result; }
	let baseSample = textureSampleLevel( scNoise, smpLinearRepeat, shapePosition / scs.shape.y, lod ).rgb;
	let dilation = dot( baseSample, vec3f( 0.7, 0.41, 0.23 ) ) * scs.shape.z;
	let top = weather + coverage - 1.0 + dilation * coverage;
	result.conservative = smoothstep( -edge, edge, top - h ) * smoothstep( -edge, edge, h ) * floorMask;
	result.edge = edge; result.top = top; result.floorMask = floorMask;
	result.shellHeight = h; result.localHeight = clamp( h / max( top, 0.001 ), 0.0, 1.0 );
	result.coverage = coverage; result.position = shapePosition;
	return result;
}
fn scErodedDensity( c: ScCandidate, lod: f32 ) -> f32 {
	if ( c.conservative <= 0.0 ) { return 0.0; }
	let strength = mix( scs.erosion.x, scs.erosion.y, c.localHeight );
	let maximumErosion = 0.173 * strength * c.coverage;
	if ( min( c.top - c.shellHeight, c.shellHeight ) >= maximumErosion + c.edge ) { return c.floorMask; }
	let s = textureSampleLevel( scNoise, smpLinearRepeat, c.position / ( scs.shape.y * scs.shape.w ), lod ).rgb;
	let field = mix( 1.0 - s, s, scs.erosion.z );
	let erosion = dot( field, vec3f( 0.113, 0.04, 0.02 ) ) * strength * c.coverage;
	return smoothstep( -c.edge, c.edge, c.top - erosion - c.shellHeight )
		* smoothstep( -c.edge, c.edge, c.shellHeight - erosion ) * c.floorMask;
}
fn scLightDensity( p: vec3f, coverage: f32, lods: vec2f, cheap: bool ) -> f32 {
	let c = scCandidate( p, coverage, lods.x );
	if ( cheap ) { return c.conservative; }
	return scErodedDensity( c, lods.y );
}
fn scShellRoots( direction: vec3f, altitude: f32, originHeight: f32 ) -> vec2f {
	let radius = SC_EARTH * 1000.0;
	let b = ( radius + originHeight ) * direction.y;
	let c = ( originHeight - altitude ) * ( 2.0 * radius + originHeight + altitude );
	let h = b * b - c;
	if ( h < 0.0 ) { return vec2f( -1.0 ); }
	let q = -b - select( -sqrt( h ), sqrt( h ), b >= 0.0 );
	let other = c / select( -0.0001, q, abs( q ) > 0.0001 );
	return vec2f( min( q, other ), max( q, other ) );
}
fn scCloudInterval( dir: vec3f, originHeight: f32 ) -> vec2f {
	let inner = scShellRoots( dir, scs.shell.x, originHeight );
	let outer = scShellRoots( dir, scs.shell.x + scs.shell.y, originHeight );
	var start = 0.0; var end = min( outer.y, SC_FAR );
	if ( outer.y <= 0.0 ) { return vec2f( 0.0 ); }
	if ( originHeight < scs.shell.x ) { start = max( inner.y, 0.0 ); }
	else {
		if ( originHeight > scs.shell.x + scs.shell.y ) { start = max( outer.x, 0.0 ); }
		if ( inner.x >= 0.0 ) { end = min( end, inner.x ); }
	}
	let ground = scShellRoots( dir, 0.0, originHeight );
	if ( ground.x > 0.0 ) { end = min( end, ground.x ); }
	return vec2f( start, end );
}
`,_a=`
fn scCoverageAt( t: f32 ) -> f32 {
	return scs.shell.w + scs.horizon.z * smoothstep( scs.horizon.x, scs.horizon.x + max( scs.horizon.y, 1.0 ), t );
}
fn scHeightAlongRay( t: f32, dir: vec3f, originHeight: f32 ) -> f32 {
	let altitude = originHeight + dir.y * t + dot( dir.xz, dir.xz ) * t * t / ( 2.0 * SC_EARTH * 1000.0 );
	return ( altitude - scs.shell.x ) / scs.shell.y;
}
fn scCellIsEmpty( t: f32, end: f32, dir: vec3f, originHeight: f32, maximumWeather: f32 ) -> bool {
	let turningPoint = -dir.y * SC_EARTH * 1000.0 / max( dot( dir.xz, dir.xz ), 0.000001 );
	let minHeight = scHeightAlongRay( clamp( turningPoint, t, end ), dir, originHeight );
	let maxHeight = max( scHeightAlongRay( t, dir, originHeight ), scHeightAlongRay( end, dir, originHeight ) );
	let coverage = scCoverageAt( end );
	let maximumTop = maximumWeather + coverage - 1.0 + 1.34 * scs.shape.z * coverage;
	let edgeHeight = select( maxHeight, minHeight, scs.base.z >= 0.0 );
	let edge = max( scs.base.y * exp2( -max( edgeHeight, 0.0 ) * scs.base.z ), 0.0001 );
	let required = ( 1.0 - smoothstep( scs.base.w, max( scs.erosion.w, scs.base.w + 0.001 ), maxHeight ) ) * scs.base.x;
	return maximumTop < minHeight - edge || maximumWeather <= required - 0.1;
}
fn scLightOpticalDepth( p: vec3f, coverage: f32, lods: vec2f, cheap: bool ) -> f32 {
	var opticalDepth = 0.0;
	for ( var i = 1u; i < 8u; i++ ) {
		if ( i >= u32( scf.march.z ) ) { break; }
		let tap = scf.lightOffsets[ i ];
		opticalDepth += scLightDensity( p + tap.xyz, coverage, max( lods, scf.lightLods[ i ].xy ), cheap ) * tap.w * scs.shell.z;
		if ( opticalDepth >= 32.0 ) { break; }
	}
	return opticalDepth;
}
fn scLightEnergy( opticalDepth: f32, phase: vec3f ) -> f32 {
	let quarter = exp( -opticalDepth * 0.25 );
	let halfT = quarter * quarter;
	return dot( vec3f( halfT * halfT, halfT * 0.5, quarter * 0.25 ), phase );
}

// Tidewater's sky (the atmosphere's sky view LUT; the night sky's ambient)
fn scSky( dir: vec3f ) -> vec3f {
	return atmosphereSkyLuminance( dir ) + frame.skyIrradiance * frame.night;
}
// key light: the sun while it is the app's key light, seen from cloud altitude, else the moon
fn scDirect() -> vec3f {
	let isMoon = dot( frame.sunDir, atmosphereParams.sunDir ) < 0.9999;
	let sunE = atmosphereSampleTransmittance( 6360.0 + scs.shell.x * 0.001, frame.sunDir.y ) * atmosphereParams.sunIlluminance;
	return select( sunE, frame.sunColor, isMoon );
}

struct ScMarch { color: vec3f, alpha: f32, depth: f32, steps: u32 };

fn scMarch( origin: vec3f, dir: vec3f, dither: f32, pixelConeAngle: f32, stepConeAngle: f32, maxSteps: u32, useBounds: bool ) -> ScMarch {
	var out: ScMarch;
	out.color = vec3f( 0.0 ); out.alpha = 0.0; out.depth = SC_FAR; out.steps = 0u;
	let interval = scCloudInterval( dir, origin.y );
	var color = vec3f( 0.0 ); var transmission = 1.0; var weightedDepth = 0.0;
	var steps = 0u;
	if ( interval.y > interval.x && scs.shell.w > 0.0 && scs.shell.z > 0.0 ) {
		let L = frame.sunDir;
		let lightCosine = dot( dir, L );
		let phase = scPhases( lightCosine );
		let direct = scDirect();
		let zenith = scSky( vec3f( 0.0, 1.0, 0.0 ) );
		let horizon = scSky( normalize( vec3f( L.x, 0.03, L.z ) + vec3f( 1e-5, 0.0, 0.0 ) ) );
		let bounce = scs.bounce.rgb * direct * max( L.y, 0.0 );
		var t = interval.x + dither * scf.march.x;
		var coarse = true; var emptyRun = 0u; var accumulatedDepth = 0.0;
		var refineEnd = -1.0;
		var cellEnd = -1.0; var cellStart = -1.0; var maximumWeather = 1.0;
		var shadowAt = -SC_FAR; var shadowDensity = -1.0; var shadowTau = 0.0; var skyTau = 0.0; var shadowCheap = false;
		let hasDirectLight = max( direct.x, max( direct.y, direct.z ) ) > 0.00001;
		for ( var i = 0u; i < maxSteps; i++ ) {
			if ( t >= interval.y || transmission < 0.003 ) { break; }
			steps++;
			if ( coarse && useBounds ) {
				if ( t >= cellEnd || t < cellStart ) {
					let size = vec2i( textureDimensions( scWeatherBounds ) );
					let grid = ( origin.xz + dir.xz * t - scf.wind.xy ) / scs.shape.x * vec2f( size );
					let cell = vec2i( floor( grid ) );
					maximumWeather = textureLoad( scWeatherBounds, ( ( cell % size ) + size ) % size, 0 ).r;
					let distance = select( fract( grid ), 1.0 - fract( grid ), dir.xz >= vec2f( 0.0 ) )
						/ max( abs( dir.xz ) * vec2f( size ) / scs.shape.x, vec2f( 0.0000001 ) );
					cellStart = t; cellEnd = min( interval.y, t + max( min( distance.x, distance.y ), 0.05 ) );
				}
				if ( scCellIsEmpty( t, cellEnd, dir, origin.y, maximumWeather ) ) { t = cellEnd + 0.05; continue; }
			}
			let footprint = t * pixelConeAngle;
			let fineStep = max( scf.march.x, t * stepConeAngle * 1.5 );
			let p = origin + dir * t;
			let coverage = scCoverageAt( t );
			let baseLod = scConeLod( footprint, scs.shape.y );
			let c = scCandidate( p, coverage, baseLod );
			let erosionLod = scConeLod( footprint, scs.shape.y * scs.shape.w );
			if ( coarse ) {
				if ( c.conservative > 0.0 ) {
					if ( scErodedDensity( c, erosionLod ) > 0.0 ) {
						refineEnd = t;
						t = max( interval.x, t - fineStep * 4.0 ) + fineStep;
						t = min( t, refineEnd );
						coarse = false; emptyRun = 0u;
						continue;
					}
				}
				t += fineStep * 4.0;
				continue;
			}
			let density = scErodedDensity( c, erosionLod );
			if ( density <= 0.0 ) {
				shadowAt = -SC_FAR;
				emptyRun++;
				if ( t < refineEnd ) { t = min( t + fineStep, refineEnd ); continue; }
				if ( emptyRun >= 4u ) { coarse = true; }
				t += select( fineStep, fineStep * 4.0, coarse ); continue;
			}
			emptyRun = 0u; refineEnd = -1.0;
			let sigmaT = density * scs.shell.z;
			let surfaceStep = clamp( 0.5 / max( sigmaT, 0.000001 ), fineStep * 0.15, fineStep );
			let stepLength = min( mix( surfaceStep, fineStep * 3.0, smoothstep( 1.0, 3.0, accumulatedDepth ) ), interval.y - t );
			let height = clamp( c.shellHeight, 0.0, 1.0 );
			let baseShadow = mix( 1.0, mix( 0.15, 1.0, smoothstep( 0.0, max( scs.shadow.y, 0.001 ), height ) ), scs.shadow.x );
			// darken thin margins away from the sun; keep the forward scattered silver linings
			let powderWeight = scs.cloudLight.y * ( 1.0 - smoothstep( 0.2, 0.95, lightCosine ) );
			let powder = mix( 1.0, 1.0 - exp( -density * 2.0 ), powderWeight );
			var energy = 0.0;
			let cheap = ( 1.0 - transmission ) >= scf.march.w;
			let reuseDistance = min( fineStep * scf.display.y, max( 20.0, scs.shape.y * scs.shape.w * 0.03 ) );
			if ( abs( t - shadowAt ) >= reuseDistance || abs( density - shadowDensity ) > 0.08 || cheap != shadowCheap ) {
				let lods = vec2f( baseLod, erosionLod );
				if ( hasDirectLight ) { shadowTau = scLightOpticalDepth( p, coverage, lods, cheap ); }
				let skyLods = lods + vec2f( 1.0 );
				skyTau = ( scLightDensity( p + vec3f( 0.0, 125.0, 0.0 ), coverage, skyLods, true ) * 250.0
					+ scLightDensity( p + vec3f( 0.0, 600.0, 0.0 ), coverage, skyLods, true ) * 700.0 ) * scs.shell.z;
				shadowAt = t; shadowDensity = density; shadowCheap = cheap;
			}
			if ( hasDirectLight ) {
				energy = scLightEnergy( shadowTau + sigmaT * scf.lightOffsets[ 0 ].w, phase );
			}
			let skyVisibility = 0.2 + 0.8 / ( 1.0 + ( skyTau + sigmaT * 25.0 ) * 0.35 );
			let ambient = ( mix( mix( zenith, horizon, 0.55 ), zenith, sqrt( height ) ) * skyVisibility + bounce * ( 1.0 - height ) )
				* scs.cloudLight.z * ( 1.0 + scs.cloudLight.w );
			let light = ( direct * energy * powder * baseShadow + ambient ) * scs.cloudLight.x;
			let stepT = exp( -sigmaT * stepLength );
			let alpha = transmission * ( 1.0 - stepT );
			color += alpha * light; weightedDepth += alpha * t;
			transmission *= stepT; accumulatedDepth += sigmaT * stepLength; t += stepLength;
		}
	}
	let alpha = 1.0 - transmission;
	var depth = SC_FAR;
	if ( alpha > 0.0 ) {
		depth = weightedDepth / alpha;
		// aerial perspective (distance toward the sky behind), then the far melt into the sky
		let sky = scSky( dir );
		let ap = exp( -depth / SC_AP_DIST );
		color = color * ap + sky * alpha * ( 1.0 - ap );
		let melt = smoothstep( scs.fade.y, max( scs.fade.z, scs.fade.y + 1.0 ), depth );
		color = mix( color, sky * alpha, melt );
	}
	out.color = color; out.alpha = alpha; out.depth = depth; out.steps = steps;
	return out;
}
`,va=`
fn scHash33( cell: vec3u ) -> vec3u {
	var p = cell * 1664525u + 1013904223u;
	p.x += p.y * p.z; p.y += p.z * p.x; p.z += p.x * p.y;
	p = p ^ ( p >> vec3u( 16u ) );
	p.x += p.y * p.z; p.y += p.z * p.x; p.z += p.x * p.y;
	return p;
}
fn scGradient( cell: vec3i, period: i32, offset: vec3f ) -> f32 {
	let wrapped = vec3u( ( ( cell % vec3i( period ) ) + vec3i( period ) ) % vec3i( period ) );
	let h = ( scHash33( wrapped ).x >> 24u ) & 15u;
	let u = select( offset.y, offset.x, h < 8u );
	let v = select( select( offset.z, offset.x, h == 12u || h == 14u ), offset.y, h < 4u );
	return select( -u, u, ( h & 1u ) == 0u ) + select( -v, v, ( h & 2u ) == 0u );
}
fn scPerlin( p: vec3f, period: i32 ) -> f32 {
	let cell = vec3i( floor( p ) ); let fr = fract( p ); let w = fr * fr * fr * ( fr * ( fr * 6.0 - 15.0 ) + 10.0 );
	return mix( mix( mix( scGradient( cell, period, fr ), scGradient( cell + vec3i( 1, 0, 0 ), period, fr - vec3f( 1, 0, 0 ) ), w.x ),
		mix( scGradient( cell + vec3i( 0, 1, 0 ), period, fr - vec3f( 0, 1, 0 ) ), scGradient( cell + vec3i( 1, 1, 0 ), period, fr - vec3f( 1, 1, 0 ) ), w.x ), w.y ),
		mix( mix( scGradient( cell + vec3i( 0, 0, 1 ), period, fr - vec3f( 0, 0, 1 ) ), scGradient( cell + vec3i( 1, 0, 1 ), period, fr - vec3f( 1, 0, 1 ) ), w.x ),
		mix( scGradient( cell + vec3i( 0, 1, 1 ), period, fr - vec3f( 0, 1, 1 ) ), scGradient( cell + vec3i( 1, 1, 1 ), period, fr - vec3f( 1, 1, 1 ) ), w.x ), w.y ), w.z );
}
fn scFbm( uv: vec2f, profile: vec4f ) -> f32 {
	var frequency = max( 1.0, round( profile.x ) ); var weight = 0.5;
	var sum = 0.0; var weights = 0.0;
	for ( var i = 0u; i < u32( profile.y ); i++ ) {
		sum += scPerlin( vec3f( uv, profile.z * 13.37 + 0.5 ) * frequency, i32( frequency ) ) * weight;
		weights += weight; weight *= 0.5; frequency *= 2.0;
	}
	return sum / max( weights, 0.001 ) * 0.5 + 0.5;
}
`,ya=class{constructor(e,t){this.renderer=e,this.atmosphere=t;let n=ca,r=n.shape,i=n.lighting;this.frameBlock=new L(`SkyCloudFrame`,{position:[`vec4f`,ha()],right:[`vec4f`,ha()],up:[`vec4f`,ha()],forward:[`vec4f`,ha()],previousPosition:[`vec4f`,ha()],previousRight:[`vec4f`,ha()],previousUp:[`vec4f`,ha()],previousForward:[`vec4f`,ha()],viewport:[`vec4f`,ha()],sampling:[`vec4f`,ha()],clock:[`vec4f`,ha()],wind:[`vec4f`,ha()],windDelta:[`vec4f`,ha()],march:[`vec4f`,ha()],temporal:[`vec4f`,ha()],display:[`vec4f`,ha()],pano:[`vec4f`,ha()],shadow:[`vec4f`,ha()],lightOffsets:[`vec4f[8]`,new Float32Array(32)],lightLods:[`vec4f[8]`,new Float32Array(32)]},{label:`sky clouds frame`}),this.settingsBlock=new L(`SkyCloudSettings`,{shell:[`vec4f`,[r.altitude,r.thickness,r.density,r.coverage]],shape:[`vec4f`,[r.weatherScale,r.baseScale,r.baseStrength,r.erosionScaleBaseMultiplier]],erosion:[`vec4f`,[r.erosionStrengthBase,r.erosionStrengthPeak,r.erosionShape,r.baseWeatherHeightEnd]],base:[`vec4f`,[r.baseWeatherStrength,r.edgeSoftness,Math.log2(Math.max(r.edgeSoftnessFalloff,.001))*r.thickness*.001,r.baseWeatherHeightStart]],horizon:[`vec4f`,[r.horizonCoverageStart,r.horizonCoverageRamp,r.horizonCoverageAmount,0]],cloudLight:[`vec4f`,[i.scatteringAlbedo,i.powderStrength,i.ambientIntensity,n.atmosphere.multipleScattering]],shadow:[`vec4f`,[i.baseShadowStrength,i.baseShadowHeight,i.moonGain,0]],bounce:[`vec4f`,[...i.groundBounceAlbedo,0]],wind:[`vec4f`,[0,1,n.wind.skew,0]],fade:[`vec4f`,[n.fade.hazeDensityScale,n.fade.horizonMeltStart,n.fade.horizonMeltEnd,0]],weatherMass:[`vec4f`,n.weather.mainMass.slice()],weatherDetail:[`vec4f`,n.weather.detail.slice()],weather:[`vec4f`,[n.weather.coverage,0,0,0]]},{label:`sky clouds settings`}),this.F=this.frameBlock.fields,this.S=this.settingsBlock.fields,this.coverage={value:r.coverage},this.resolutionScale=1,this.outputSize=null,this.noise=new H({label:`cloud shape noise 64³`,width:64,height:64,depth:64,dimension:`3d`,format:`rgba8unorm`,usage:[`sample`,`copyDst`]}),this.blue=new H({label:`cloud blue noise`,width:64,height:64,format:`r8unorm`,usage:[`sample`,`copyDst`]});let a=n.weather.resolution;this.weatherMap=new H({label:`cloud weather`,width:a,height:a,format:`rgba8unorm`,usage:[`sample`,`storage`]}),this.weatherBounds=new H({label:`cloud weather bounds`,width:64,height:64,format:`rgba8unorm`,usage:[`sample`,`storage`]});let o=(e,t=4,n=4,r=`rgba16float`)=>new H({label:e,width:t,height:n,format:r,usage:[`sample`,`storage`]});this.source=o(`cloud radiance`),this.sourceMeta=o(`cloud depth + cost`),this.colors=[o(`cloud history A`),o(`cloud history B`)],this.metas=[o(`cloud history meta A`),o(`cloud history meta B`)],this.panorama=o(`cloud panorama`,ua,da),this.shadowMap=o(`cloud shadow`,pa,pa,`r32float`),this._pp=0,this.viewTex=this.colors[0],this.ready=this._loadNoise(),this._buildModules(),this._buildKernels(),this._w=0,this._h=0,this._scale=1,this.sourceWidth=1,this.sourceHeight=1,this.historyWidth=1,this.historyHeight=1,this.frameIndex=0,this.historyValid=!1,this.weatherDirty=!0,this.panoWarm=!0,this._windX=0,this._windZ=0,this._evolution=0,this._elapsed=0,this._prevCam=null,this._prevLight=new N,this._lastCoverage=-1}async _loadNoise(){let e=async e=>{let t=await fetch(`./clouds/`+e);if(!t.ok)throw Error(`clouds: ${e} HTTP ${t.status}`);return t},[t,n]=await Promise.all([e(`baseShape64.bin`),e(`blueNoise.bin`)]),r=new Uint8Array(await new Response(t.body.pipeThrough(new DecompressionStream(`gzip`))).arrayBuffer()),i=new DataView(r.buffer,r.byteOffset,r.byteLength);if(i.getUint32(0,!0)!==828004942)throw Error(`clouds: bad noise blob`);let a=[i.getUint16(6,!0),i.getUint16(8,!0),i.getUint16(10,!0)],o=i.getUint8(12),s=this.noise;s.gpu=I.device.createTexture({label:s.label,dimension:`3d`,size:a,mipLevelCount:o,format:`rgba8unorm`,usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST}),s.mipsOption=o,s._views.clear(),s.version++;let c=16;for(let e=0;e<o;e++){let t=a.map(t=>Math.max(1,t>>e)),n=t[0]*t[1]*t[2]*4;I.queue.writeTexture({texture:s.gpu,mipLevel:e},r,{offset:c,bytesPerRow:t[0]*4,rowsPerImage:t[1]},t),c+=n}this.blue.upload(new Uint8Array(await n.arrayBuffer()))}_buildModules(){let e=this.atmosphere;this.uniformModule=new R({name:`skyCloudsUniforms`,deps:[z],bindings:{scf:{uniform:this.frameBlock},scs:{uniform:this.settingsBlock}}}),this.coreModule=new R({name:`skyCloudsCore`,deps:[this.uniformModule],bindings:{scNoise:{texture:this.noise},scWeatherMap:{texture:this.weatherMap}},code:ga}),this.marchModule=new R({name:`skyCloudsMarch`,deps:[this.coreModule,e.module,e.transmittanceModule],bindings:{scWeatherBounds:{texture:this.weatherBounds}},code:_a}),this.params=new L(`CloudsParams`,{viewRight:[`vec3f`,new N(1,0,0)],viewUp:[`vec3f`,new N(0,1,0)],viewFwd:[`vec3f`,new N(0,0,-1)],viewTan:[`vec2f`,new j(1,1)],viewValid:[`f32`,0],shadowCenter:[`vec2f`,new j],shadowSize:[`f32`,12e3],shadowStrength:[`f32`,.85]},{label:`clouds`});let t=this.params.fields;this.viewCam={right:t.viewRight,up:t.viewUp,fwd:t.viewFwd,tan:t.viewTan},this.viewValid=t.viewValid,this.shadowCenter=t.shadowCenter,this.shadowSize=t.shadowSize,this.shadowStrength=t.shadowStrength,this.shadowModule=new R({name:`cloudsShadow`,deps:[z],uniforms:this.params,uniformName:`cloudsParams`,bindings:{cloudsShadowMap:{texture:this.shadowMap}},code:`
// cloud shadow transmittance (1 = clear) at a world position. Manual bilinear filtering of an
// unfilterable texture: costs no sampler in the (sampler hungry) scene materials.
fn cloudsShadowTap( i: vec2i ) -> f32 { return textureLoad( cloudsShadowMap, clamp( i, vec2i( 0 ), vec2i( 255 ) ), 0 ).x; }
// (the last lookup is remembered: the scene lighting hooks ask for the same point several times)
var<private> cloudsShadowMemoXZ: vec2f = vec2f( 3.0e38 );
var<private> cloudsShadowMemo: f32 = 1.0;
fn cloudsShadow( worldXZ: vec2f ) -> f32 {
	if ( frame.atmosphereQuality <= 0.0 ) { return 1.0; }
	if ( all( worldXZ == cloudsShadowMemoXZ ) ) { return cloudsShadowMemo; }
	cloudsShadowMemoXZ = worldXZ;
	cloudsShadowMemo = _cloudsShadow( worldXZ );
	return cloudsShadowMemo;
}
fn _cloudsShadow( worldXZ: vec2f ) -> f32 {
	let uv = ( worldXZ - cloudsParams.shadowCenter ) / cloudsParams.shadowSize + 0.5;
	let st = uv * ${oa(pa)} - 0.5;
	let i0 = vec2i( floor( st ) );
	let fr = fract( st );
	let s = mix( mix( cloudsShadowTap( i0 ), cloudsShadowTap( i0 + vec2i( 1, 0 ) ), fr.x ), mix( cloudsShadowTap( i0 + vec2i( 0, 1 ) ), cloudsShadowTap( i0 + vec2i( 1, 1 ) ), fr.x ), fr.y );
	let e = abs( uv - 0.5 );
	let inside = smoothstep( 0.5, 0.42, max( e.x, e.y ) );
	return mix( 1.0, s, cloudsParams.shadowStrength * inside );
}
`}),this.module=new R({name:`clouds`,deps:[z,this.shadowModule],uniforms:this.params,uniformName:`cloudsParams`,bindings:{cloudsPanorama:{texture:this.panorama},cloudsView:{texture:()=>this.viewTex}},code:`
// vec4( rgb in-scattered radiance, a transmittance ) for a view direction (panorama)
fn cloudsSample( dir: vec3f ) -> vec4f {
	if ( frame.atmosphereQuality <= 0.0 ) { return vec4f( 0.0, 0.0, 0.0, 1.0 ); }
	let az = atan2( dir.z, dir.x );
	let u = fract( az / ${oa(2*Math.PI)} );
	let elev = - acos( clamp( dir.y, -1.0, 1.0 ) ) + ${oa(Math.PI/2)};
	let t = clamp( ( elev + ${oa(4*sa)} ) / ${oa(94*sa)}, 0.0, 1.0 );
	let s = textureSampleLevel( cloudsPanorama, smpLinearRepeat, vec2f( u, sqrt( t ) ), 0.0 );
	let below = smoothstep( -0.07, -0.03, dir.y );
	return vec4f( s.rgb * below, mix( 1.0, s.a, below ) );
}

// Transmittance for the sun's disc behind the clouds. The cloud march stops once less than 0.3 % of
// the light gets through and reports that remainder, which (noisy from frame to frame) let a
// clamped sun disc of 2500x the sky shine and sparkle through thick cloud: below ~0.4 % it is dark.
fn cloudsSunTransmittance( T: f32 ) -> f32 { return T * smoothstep( 0.004, 0.04, T ); }

// The main view's clouds: the temporally reconstructed half resolution history, looked up with the
// camera it was resolved for; outside it (or before any trace) the panorama
fn cloudsSampleView( dir: vec3f ) -> vec4f {
	if ( frame.atmosphereQuality <= 0.0 ) { return vec4f( 0.0, 0.0, 0.0, 1.0 ); }
	let x = dot( dir, cloudsParams.viewRight );
	let y = dot( dir, cloudsParams.viewUp );
	let z = dot( dir, cloudsParams.viewFwd );
	let uv = vec2f( x / max( z, 1e-4 ) / cloudsParams.viewTan.x * 0.5 + 0.5, 0.5 - y / max( z, 1e-4 ) / cloudsParams.viewTan.y * 0.5 );
	let inside = cloudsParams.viewValid > 0.5 && z > 0.01 && all( uv >= vec2f( 0.0 ) ) && all( uv <= vec2f( 1.0 ) );
	if ( inside ) {
		let v = max( textureSampleLevel( cloudsView, smpLinearClamp, uv, 0.0 ), vec4f( 0.0 ) );
		let above = smoothstep( -0.05, -0.03, dir.y );
		return vec4f( v.rgb * above, 1.0 - min( v.a, 1.0 ) * above );
	}
	return cloudsSample( dir );
}
`})}_buildKernels(){let e=`@compute @workgroup_size( WG_X, WG_Y, WG_Z ) fn main( @builtin( global_invocation_id ) id: vec3u )`,t=(e,t,n,r)=>new Mi({label:e,modules:t,bindings:n,code:r,workgroupSize:[8,8,1]});this.weatherKernel=t(`Cloud Weather`,[this.uniformModule],{scOut:{storageTexture:this.weatherMap}},va+`
${e} {
	let size = textureDimensions( scOut );
	if ( any( id.xy >= size ) ) { return; }
	let uv = vec2f( id.xy ) / vec2f( size );
	let mass = clamp( ( scFbm( uv, scs.weatherMass ) - 0.5 ) * scs.weatherMass.w + 0.5, 0.0, 1.0 );
	let detail = ( scFbm( uv, scs.weatherDetail ) * 2.0 - 1.0 ) * scs.weatherDetail.w;
	textureStore( scOut, id.xy, vec4f( clamp( mass + detail + scs.weather.x - 0.5, 0.0, 1.0 ), 0.0, 0.0, 1.0 ) );
}`),this.boundsKernel=t(`Cloud Weather Bounds`,[this.coreModule],{scOut:{storageTexture:this.weatherBounds}},`
${e} {
	let size = textureDimensions( scOut );
	if ( any( id.xy >= size ) ) { return; }
	let sourceSize = vec2i( textureDimensions( scWeatherMap ) );
	let scale = vec2f( sourceSize ) / vec2f( size );
	// both bilinear neighbours at cell boundaries, including the repeat seam
	let lo = vec2i( floor( vec2f( id.xy ) * scale - 0.5 ) );
	let hi = vec2i( ceil( vec2f( id.xy + 1u ) * scale - 0.5 ) );
	var maximum = 0.0;
	for ( var y = lo.y; y <= hi.y; y++ ) {
		for ( var x = lo.x; x <= hi.x; x++ ) {
			let p = ( ( vec2i( x, y ) % sourceSize ) + sourceSize ) % sourceSize;
			maximum = max( maximum, textureLoad( scWeatherMap, p, 0 ).r );
		}
	}
	textureStore( scOut, id.xy, vec4f( min( 1.0, maximum + 1.0 / 255.0 ), 0.0, 0.0, 1.0 ) );
}`),this.traceKernel=t(`Clouds Trace`,[this.marchModule],{scBlue:{texture:this.blue},scOutColor:{storageTexture:this.source},scOutMeta:{storageTexture:this.sourceMeta}},`
${e} {
	let size = textureDimensions( scOutColor );
	if ( any( id.xy >= size ) ) { return; }
	let uv = scSourceUV( vec2f( id.xy ) );
	let dir = scRay( uv );
	let noise = textureLoad( scBlue, vec2i( id.xy % 64u ), 0 ).r;
	let dither = select( 0.5, fract( noise + scf.clock.x * 0.61803398875 ), scf.temporal.x > 0.0 );
	let pixelConeAngle = 2.0 * scf.position.w / scf.viewport.y;
	let stepConeAngle = 2.0 * scf.position.w / scf.viewport.w;
	let m = scMarch( scf.position.xyz, dir, dither, pixelConeAngle, stepConeAngle, u32( scf.march.y ), scf.display.y > 0.0 );
	textureStore( scOutColor, id.xy, vec4f( m.color, m.alpha ) );
	// km depth fits half float; the metadata also records the normalized primary sample cost
	textureStore( scOutMeta, id.xy, vec4f( m.depth * 0.001, 1.0, f32( m.steps ) / scf.march.y, 0.0 ) );
}`);let n=()=>this.colors[this._pp],r=()=>this.metas[this._pp],i=()=>this.colors[1-this._pp],a=()=>this.metas[1-this._pp];this.temporalKernel=new Mi({label:`Clouds Resolve`,modules:[this.coreModule],workgroupSize:[8,8,1],bindings:{scCurrentColor:{texture:this.source},scCurrentMeta:{texture:this.sourceMeta},scPreviousColor:{texture:i},scPreviousMeta:{texture:a},scOutputColor:{storageTexture:n},scOutputMeta:{storageTexture:r}},code:`
var<workgroup> scTileColor: array<vec4f, 121>;
var<workgroup> scTileMeta: array<vec4f, 121>;
fn scSourceClamp( p: vec2i ) -> vec2i { return clamp( p, vec2i( 0 ), vec2i( textureDimensions( scCurrentColor ) ) - 1 ); }
fn scTileIndex( p: vec2i, origin: vec2i, width: u32 ) -> u32 {
	let local = vec2u( scSourceClamp( p ) - origin );
	return local.y * width + local.x;
}
fn scHistoryAt( uv: vec2f, size: vec2f ) -> vec4f {
	// five tap Catmull-Rom: detail survives repeated history warps
	let position = uv * size;
	let center = floor( position - 0.5 ) + 0.5;
	let fr = position - center;
	let w0 = fr * ( fr * ( -0.5 * fr + 1.0 ) - 0.5 );
	let w1 = fr * fr * ( 1.5 * fr - 2.5 ) + 1.0;
	let w2 = fr * ( fr * ( -1.5 * fr + 2.0 ) + 0.5 );
	let w3 = fr * fr * ( 0.5 * fr - 0.5 );
	let w12 = w1 + w2;
	let uv0 = ( center - 1.0 ) / size;
	let uv3 = ( center + 2.0 ) / size;
	let uv12 = ( center + w2 / w12 ) / size;
	let weights = vec4f( w12.x * w0.y, w0.x * w12.y, w12.x * w12.y, w3.x * w12.y );
	let bottomWeight = w12.x * w3.y;
	let value = textureSampleLevel( scPreviousColor, smpLinearClamp, vec2f( uv12.x, uv0.y ), 0.0 ) * weights.x
		+ textureSampleLevel( scPreviousColor, smpLinearClamp, vec2f( uv0.x, uv12.y ), 0.0 ) * weights.y
		+ textureSampleLevel( scPreviousColor, smpLinearClamp, uv12, 0.0 ) * weights.z
		+ textureSampleLevel( scPreviousColor, smpLinearClamp, vec2f( uv3.x, uv12.y ), 0.0 ) * weights.w
		+ textureSampleLevel( scPreviousColor, smpLinearClamp, vec2f( uv12.x, uv3.y ), 0.0 ) * bottomWeight;
	return value / ( dot( weights, vec4f( 1.0 ) ) + bottomWeight );
}
fn scFreshHistoryWeight( color: vec4f, depth: f32 ) -> f32 {
	let retain = select( mix( 0.25, 0.65, smoothstep( 8.0, 30.0, depth ) ), 0.25, color.a < 0.0001 );
	return min( scf.temporal.x, retain ) * ( 1.0 - scf.temporal.y );
}
fn scResolve( pixel: vec2u, color: vec4f, depth: f32, carriedDepth: f32, cost: f32, weight: f32 ) {
	textureStore( scOutputColor, pixel, vec4f( max( color.rgb, vec3f( 0.0 ) ), clamp( color.a, 0.0, 1.0 ) ) );
	textureStore( scOutputMeta, pixel, vec4f( depth, carriedDepth, cost, weight ) );
}
@compute @workgroup_size( WG_X, WG_Y, WG_Z )
fn main( @builtin( global_invocation_id ) id: vec3u, @builtin( local_invocation_index ) thread: u32, @builtin( workgroup_id ) group: vec3u ) {
	let size = textureDimensions( scOutputColor );
	let tileWidth = u32( ceil( 8.0 / scf.sampling.z ) ) + 3u;
	let tileOrigin = vec2i( floor( ( vec2f( group.xy * 8u ) - scf.sampling.xy ) / scf.sampling.z ) ) - 1;
	for ( var index = thread; index < tileWidth * tileWidth; index += 64u ) {
		let p = scSourceClamp( tileOrigin + vec2i( i32( index % tileWidth ), i32( index / tileWidth ) ) );
		scTileColor[ index ] = textureLoad( scCurrentColor, p, 0 );
		scTileMeta[ index ] = textureLoad( scCurrentMeta, p, 0 );
	}
	workgroupBarrier();
	if ( any( id.xy >= size ) ) { return; }
	let uv = ( vec2f( id.xy ) + 0.5 ) / vec2f( size );
	let lattice = u32( scf.sampling.z );
	let fresh = all( id.xy % lattice == vec2u( scf.sampling.xy ) );
	let source = ( vec2f( id.xy ) - scf.sampling.xy ) / scf.sampling.z;
	let center = scSourceClamp( vec2i( round( source ) ) );
	let metadata = scTileMeta[ scTileIndex( center, tileOrigin, tileWidth ) ];
	let central = scTileColor[ scTileIndex( center, tileOrigin, tileWidth ) ];
	let currentDepth = max( metadata.x, 0.001 );
	let stored = textureLoad( scPreviousMeta, vec2i( id.xy ), 0 );
	let historyValid = scf.sampling.w > 0.5 && scf.temporal.x > 0.0;

	// a still view: untouched slots keep their colour and depth exactly
	if ( scf.temporal.z > 0.5 && historyValid && stored.y >= 0.001 ) {
		let history = textureLoad( scPreviousColor, vec2i( id.xy ), 0 );
		if ( fresh ) {
			let weight = scFreshHistoryWeight( central, currentDepth );
			scResolve( id.xy, mix( central, history, weight ), currentDepth, currentDepth, metadata.z, weight );
		} else {
			scResolve( id.xy, history, stored.x, stored.y, stored.z, 1.0 );
		}
		return;
	}

	var color = vec4f( 0.0 ); var weightSum = 0.0;
	let base = vec2i( floor( source ) ); let fraction = fract( source );
	for ( var y = 0; y < 2; y++ ) {
		for ( var x = 0; x < 2; x++ ) {
			let pos = scSourceClamp( base + vec2i( x, y ) );
			let index = scTileIndex( pos, tileOrigin, tileWidth );
			let tap = scTileColor[ index ]; let depth = scTileMeta[ index ].x;
			let bilinear = select( 1.0 - fraction.x, fraction.x, x == 1 ) * select( 1.0 - fraction.y, fraction.y, y == 1 );
			let weight = bilinear * exp( -abs( depth - metadata.x ) / max( 0.1, metadata.x * 0.1 ) - abs( tap.a - central.a ) * 4.0 );
			color += tap * weight; weightSum += weight;
		}
	}
	color = select( central, color / max( weightSum, 0.00001 ), weightSum > 0.00001 );
	if ( fresh ) { color = central; }
	if ( ! historyValid ) {
		scResolve( id.xy, color, currentDepth, currentDepth, metadata.z, 0.0 );
		return;
	}

	var low = color; var high = color;
	var reprojectionDepth = select( SC_FAR * 0.001, stored.y, stored.y >= 0.001 );
	for ( var y = -1; y <= 1; y++ ) {
		for ( var x = -1; x <= 1; x++ ) {
			let tap = scTileColor[ scTileIndex( center + vec2i( x, y ), tileOrigin, tileWidth ) ];
			low = min( low, tap ); high = max( high, tap );
			let neighbor = clamp( vec2i( id.xy ) + vec2i( x, y ), vec2i( 0 ), vec2i( size ) - 1 );
			let depth = textureLoad( scPreviousMeta, neighbor, 0 ).y;
			if ( depth >= 0.001 ) { reprojectionDepth = min( reprojectionDepth, depth ); }
		}
	}
	if ( stored.y < 0.001 ) { reprojectionDepth = min( reprojectionDepth, currentDepth ); }
	var world = scf.position.xyz + scRay( uv ) * ( reprojectionDepth * 1000.0 );
	world -= vec3f( scf.windDelta.x, 0.0, scf.windDelta.y );
	let previous = scProjectPrevious( world );
	let previousPixel = clamp( vec2i( previous.xy * vec2f( size ) ), vec2i( 0 ), vec2i( size ) - 1 );
	let oldMeta = textureLoad( scPreviousMeta, previousPixel, 0 );
	let valid = previous.z > 0.0 && all( previous.xy >= vec2f( 0.0 ) ) && all( previous.xy <= vec2f( 1.0 ) ) && oldMeta.y >= 0.001;
	var carriedDepth = currentDepth; var historyFraction = 0.0;
	if ( valid ) {
		let history = clamp( scHistoryAt( previous.xy, vec2f( size ) ), low, high );
		let motionPixels = length( ( previous.xy - uv ) * vec2f( size ) );
		historyFraction = select( 1.0, scFreshHistoryWeight( central, currentDepth ), fresh );
		color = mix( color, history, historyFraction );
		let expectedDepth = length( world - scf.previousPosition.xyz ) * 0.001;
		if ( ! fresh && ( motionPixels <= 0.5 || abs( oldMeta.y - expectedDepth ) < max( 0.001, expectedDepth * 0.15 ) ) ) {
			carriedDepth = oldMeta.y;
		}
	}
	scResolve( id.xy, color, currentDepth, carriedDepth, metadata.z, historyFraction );
}`}),this.panoKernel=t(`Clouds Panorama`,[this.marchModule],{scPano:{storageTexture:this.panorama}},`
${e} {
	let size = textureDimensions( scPano );
	let texel = id.xy * u32( scf.pano.z ) + vec2u( scf.pano.xy );
	if ( any( texel >= size ) ) { return; }
	let uv = ( vec2f( texel ) + 0.5 ) / vec2f( size );
	let elev = uv.y * uv.y * ${oa(94*sa)} - ${oa(4*sa)};
	let az = uv.x * ${oa(2*Math.PI)};
	let dir = vec3f( cos( elev ) * cos( az ), sin( elev ), cos( elev ) * sin( az ) );
	let cone = ${oa(2*Math.PI/ua)} / max( frame.atmosphereQuality, 0.05 );
	let m = scMarch( scf.position.xyz, dir, 0.5, cone, cone, max( 1u, u32( ceil( 128.0 * frame.atmosphereQuality ) ) ), true );
	textureStore( scPano, texel, vec4f( m.color, 1.0 - m.alpha ) );
}`),this.shadowKernel=t(`Clouds Shadow`,[this.marchModule],{scShadow:{storageTexture:this.shadowMap}},`
${e} {
	let size = textureDimensions( scShadow );
	// a quarter of the rows per frame (w = phase), or all of them (w < 0)
	let full = scf.shadow.w < 0.0;
	let texel = select( vec2u( id.x, id.y * 4u + u32( max( scf.shadow.w, 0.0 ) ) ), id.xy, full );
	if ( any( texel >= size ) ) { return; }
	let xz = scf.shadow.xy + ( ( vec2f( texel ) + 0.5 ) / vec2f( size ) - 0.5 ) * scf.shadow.z;
	let L = frame.sunDir;
	let ly = max( L.y, 0.08 );
	let t0 = scs.shell.x / ly;
	let t1 = ( scs.shell.x + scs.shell.y ) / ly;
	let n = max( 1, i32( ceil( 16.0 * frame.atmosphereQuality ) ) );
	let dt = ( t1 - t0 ) / f32( n );
	var tau = 0.0;
	for ( var i = 0; i < n; i++ ) {
		let t = t0 + ( f32( i ) + 0.5 ) * dt;
		let p = vec3f( xz.x, 0.0, xz.y ) + vec3f( L.x, ly, L.z ) * t;
		tau += scLightDensity( p, scs.shell.w, vec2f( 2.0, 2.0 ), false ) * scs.shell.z * dt;
		if ( tau > 12.0 ) { break; }
	}
	// multiple scattering lets some light through even thick cloud (as the view's octaves do)
	let T = exp( -tau ) * 0.8 + exp( -tau * 0.25 ) * 0.2;
	textureStore( scShadow, texel, vec4f( T, 0.0, 0.0, 1.0 ) );
}`)}_drawingBufferSize(){if(this.outputSize)return this.outputSize;let e=Ir.fields.outputResolution.value;if(e&&e.x>0)return e;let t=I.canvas;return{x:t?t.width:1280,y:t?t.height:720}}_allocate(e,t){let n=la,r=this.resolutionScale;this.sourceWidth=Math.max(1,Math.ceil(e*r/n.historyDivisor/n.lattice)),this.sourceHeight=Math.max(1,Math.ceil(t*r/n.historyDivisor/n.lattice)),this.historyWidth=this.sourceWidth*n.lattice,this.historyHeight=this.sourceHeight*n.lattice,this.source.resize(this.sourceWidth,this.sourceHeight),this.sourceMeta.resize(this.sourceWidth,this.sourceHeight);for(let e of[...this.colors,...this.metas])e.resize(this.historyWidth,this.historyHeight);this.historyValid=!1}update(e,t){if(V.atmosphereQuality.value<=0)return;let n=la,r=ca,i=this.F,a=this.S;e=Math.min(.1,Math.max(0,e));let o=this._drawingBufferSize();(o.x!==this._w||o.y!==this._h||this.resolutionScale!==this._scale)&&(this._w=o.x,this._h=o.y,this._scale=this.resolutionScale,this._allocate(o.x,o.y));let s=this.coverage.value;s!==this._lastCoverage&&(a.shell.value[3]=s,this._lastCoverage=s,this.historyValid=!1,this.panoWarm=!0);let c=V.windDir.value,l=Math.hypot(c.x,c.y)||1,u=c.x/l,d=c.y/l;if(a.wind.value[0]=u,a.wind.value[1]=d,this.weatherDirty){let e=this.weatherMap.width;this.weatherKernel.dispatch([e/8,e/8,1]),this.boundsKernel.dispatch([8,8,1]),this.weatherDirty=!1}t.updateMatrixWorld();let f=t.matrixWorld.elements,p=t.position,m=Math.tan(A.degToRad(t.fov*.5))/(t.zoom||1),h=t.aspect,g=[f[0],f[1],f[2]],_=[f[4],f[5],f[6]],v=[-f[8],-f[9],-f[10]],y=e=>{let t=Math.hypot(e[0],e[1],e[2])||1;return[e[0]/t,e[1]/t,e[2]/t]},b=y(g),x=y(_),S=y(v),C={position:[p.x,p.y,p.z,m],right:[...b,h],up:[...x,0],forward:[...S,0]},w=this._prevCam;(!w||Math.hypot(p.x-w.position[0],p.y-w.position[1],p.z-w.position[2])>1e3||S[0]*w.forward[0]+S[1]*w.forward[1]+S[2]*w.forward[2]<.7||Math.abs(m-w.position[3])>.01)&&(this.historyValid=!1);let T=V.sunDir.value;T.dot(this._prevLight)<.999&&(this.historyValid=!1,this.panoWarm=!0),this._prevLight.copy(T);let E=this.historyValid&&w?w:C;i.position.value=C.position,i.right.value=C.right,i.up.value=C.up,i.forward.value=C.forward,i.previousPosition.value=E.position,i.previousRight.value=E.right,i.previousUp.value=E.up,i.previousForward.value=E.forward,this._prevCam=C;let D=n.lattice,O=this.frameIndex%(D*D),k=0,j=0;for(let e=0;1<<e<D;e++){let t=O>>e*2&3;k|=(t>>1^t&1)<<Math.log2(D)-e-1,j|=(t&1)<<Math.log2(D)-e-1}i.viewport.value=[o.x*this.resolutionScale,o.y*this.resolutionScale,this.historyWidth,this.historyHeight],i.sampling.value=[k,j,D,+!!this.historyValid],this._elapsed+=e;let M=r.wind.speed,ee=u*M*e,te=d*M*e;this._windX+=ee,this._windZ+=te,this._evolution+=r.wind.evolutionSpeed*e,i.clock.value=[this.frameIndex%4096,this._elapsed,e,0],i.wind.value=[this._windX,this._windZ,this._evolution,0],i.windDelta.value=[ee,te,0,0],i.march.value=[n.stepMeters,n.maxSteps,n.lightTaps,n.fullLightingAlpha],i.temporal.value=[n.historyWeight,Math.min(1,r.wind.evolutionSpeed*e/100),0,0],i.display.value=[0,n.lightReuseSteps,0,0];let N=T.x,P=T.y,ne=T.z,re=ne,ie=0,ae=-N;Math.abs(P)>.99&&(re=0,ie=-ne,ae=P);let oe=1/Math.hypot(re,ie,ae);re*=oe,ie*=oe,ae*=oe;let se=P*ae-ne*ie,ce=ne*re-N*ae,le=N*ie-P*re,F=i.lightOffsets.value,ue=i.lightLods.value;F[0]=0,F[1]=0,F[2]=0,F[3]=25;let de=r.shape;for(let e=1;e<8;e++){let t=1.7**e,r=25*((t-1)/.7+t*.5),i=e*2.399963,a=Math.sqrt((e+.5)/n.lightTaps),o=Math.cos(i)*a*.05*r,s=Math.sin(i)*a*.05*r,c=e*4;F[c]=N*r+re*o+se*s,F[c+1]=P*r+ie*o+ce*s,F[c+2]=ne*r+ae*o+le*s,F[c+3]=25*t;let l=r*.1;ue[c]=Math.max(0,Math.log2(l*64/de.baseScale)),ue[c+1]=Math.max(0,Math.log2(l*64/(de.baseScale*de.erosionScaleBaseMultiplier)))}let fe=this.frameIndex%4;if(fe===0||!this._shadowInit){let e=this.shadowSize.value/pa*4;this.shadowCenter.value.set(Math.round(p.x/e)*e,Math.round(p.z/e)*e)}i.shadow.value=[this.shadowCenter.value.x,this.shadowCenter.value.y,this.shadowSize.value,fe];let pe=V.cameraUnderwater&&V.cameraUnderwater.value>.5;if(this._shadowInit?this.shadowKernel.dispatch([pa/8,pa/32,1]):(i.shadow.value=[this.shadowCenter.value.x,this.shadowCenter.value.y,this.shadowSize.value,-1],this.shadowKernel.dispatch([pa/8,pa/8,1]),this._shadowInit=!0),this.panoWarm)i.pano.value=[0,0,1,0],this.panoKernel.dispatch([ua/8,da/8,1]),this.panoWarm=!1;else{let e=this.frameIndex%16;i.pano.value=[e%fa,Math.floor(e/fa),fa,0],this.panoKernel.dispatch([Math.ceil(ua/fa/8),Math.ceil(da/fa/8),1])}if(pe)this.viewValid.value=0,this.historyValid=!1;else{this.traceKernel.dispatch([Math.ceil(this.sourceWidth/8),Math.ceil(this.sourceHeight/8),1]),this.temporalKernel.dispatch([Math.ceil(this.historyWidth/8),Math.ceil(this.historyHeight/8),1]),this.viewTex=this.colors[this._pp],this._pp=1-this._pp;let e=this.viewCam;e.right.value.set(b[0],b[1],b[2]),e.up.value.set(x[0],x[1],x[2]),e.fwd.value.set(S[0],S[1],S[2]),e.tan.value.set(m*h,m),this.viewValid.value=1,this.historyValid=!0}this.frameIndex++}resetHistory(){this.historyValid=!1}invalidate(){this.panoWarm=!0,this.resetHistory()}},ba=class{constructor(e,t=e.label){let n=e.width;if(e.height!==n||n&n-1||n<32||n>512)throw Error(`ComputeMips: square power-of-two 32..512 only`);this.res=n,this.layers=e.dimension===`3d`?1:e.depth;let r=e.mipLevelCount,i=Math.min(5,r-1),a=t=>({storageTexture:e,access:`write`,view:{dimension:`2d-array`,baseMipLevel:t,mipLevelCount:1}}),o=t=>({texture:e,view:{dimension:`2d-array`,baseMipLevel:t,mipLevelCount:1}}),s=(e,t,n,r)=>`
	if ( lx < ${n}u && ly < ${n}u ) {
		let i = ly * ${4*n}u + lx * 2u;
		let v = ( ${e}[ i ] + ${e}[ i + 1u ] + ${e}[ i + ${2*n}u ] + ${e}[ i + ${2*n+1}u ] ) * 0.25;
		textureStore( out${r}, vec2u( gx * ${n}u + lx, gy * ${n}u + ly ), layer, v );
		${t?`${t}[ ly * ${n}u + lx ] = v;`:``}
	}
	workgroupBarrier();`,c={src0:o(0)},l=``;for(let e=1;e<=i;e++)c[`out`+e]=a(e);for(let e=2,t=8;e<=i;e++,t>>=1)l+=s(`s`+(e-1),e<i?`s`+e:null,t,e);this.kernelA=new Mi({label:t+` mips A`,bindings:c,workgroupSize:[16,16,1],code:`
var<workgroup> s1: array<vec4f, 256>;
var<workgroup> s2: array<vec4f, 64>;
var<workgroup> s3: array<vec4f, 16>;
var<workgroup> s4: array<vec4f, 4>;
@compute @workgroup_size( WG_X, WG_Y, WG_Z )
fn main( @builtin( local_invocation_id ) lid: vec3u, @builtin( workgroup_id ) wid: vec3u ) {
	let lx = lid.x; let ly = lid.y;
	let gx = wid.x; let gy = wid.y; let layer = wid.z;
	let x1 = gx * 16u + lx; let y1 = gy * 16u + ly;
	let p = vec2u( x1, y1 ) * 2u;
	let v1 = ( textureLoad( src0, p, layer, 0 ) + textureLoad( src0, p + vec2u( 1u, 0u ), layer, 0 ) + textureLoad( src0, p + vec2u( 0u, 1u ), layer, 0 ) + textureLoad( src0, p + vec2u( 1u, 1u ), layer, 0 ) ) * 0.25;
	textureStore( out1, vec2u( x1, y1 ), layer, v1 );
	s1[ ly * 16u + lx ] = v1;
	workgroupBarrier();
${l}
}`}),this.kernelB=null;let u=n>>5;if(r>6&&u>1){let e={src5:o(5)},n=``,i=``,c=`s5`;for(let t=6,o=u>>1;t<r&&o>=1;t++,o>>=1){e[`out`+t]=a(t);let l=o>1&&t<r-1?`s`+t:null;l&&(i+=`var<workgroup> ${l}: array<vec4f, ${o*o}>;\n`),n+=s(c,l,o,t),c=l}this.kernelB=new Mi({label:t+` mips B`,bindings:e,workgroupSize:[u,u,1],code:`
var<workgroup> s5: array<vec4f, ${u*u}>;
${i}
@compute @workgroup_size( WG_X, WG_Y, WG_Z )
fn main( @builtin( local_invocation_id ) lid: vec3u, @builtin( workgroup_id ) wid: vec3u ) {
	let lx = lid.x; let ly = lid.y; let layer = wid.z;
	let gx = 0u; let gy = 0u;
	s5[ ly * ${u}u + lx ] = textureLoad( src5, vec2u( lx, ly ), layer, 0 );
	workgroupBarrier();
${n}
}`})}}dispatch(e=null){let t=e?{pass:e}:void 0;this.kernelA.dispatch([this.res/32,this.res/32,this.layers],t),this.kernelB&&this.kernelB.dispatch([1,1,this.layers],t)}},xa=class{constructor(e,t=e.label){if(I.limits.maxStorageTexturesPerShaderStage>=5)return new ba(e,t);this.layers=e.dimension===`3d`?1:e.depth,this.kernels=[];for(let n=1;n<e.mipLevelCount;n++){let r=Math.max(1,e.width>>n),i=new Mi({label:t+` compatible mip `+n,bindings:{source:{texture:e,view:{dimension:`2d-array`,baseMipLevel:n-1,mipLevelCount:1}},mipOut:{storageTexture:e,access:`write`,view:{dimension:`2d-array`,baseMipLevel:n,mipLevelCount:1}}},workgroupSize:[8,8,1],code:`
@compute @workgroup_size(8,8,1) fn main(@builtin(global_invocation_id) gid:vec3u){
 if(gid.x>=${r}u||gid.y>=${r}u){return;}
 let p=gid.xy*2u;let layer=gid.z;
 let value=(textureLoad(source,p,layer,0)+textureLoad(source,p+vec2u(1u,0u),layer,0)+textureLoad(source,p+vec2u(0u,1u),layer,0)+textureLoad(source,p+vec2u(1u,1u),layer,0))*0.25;
 textureStore(mipOut,gid.xy,layer,value);
}`});this.kernels.push({kernel:i,size:r})}}dispatch(e=null){for(let{kernel:t,size:n}of this.kernels)t.dispatch([Math.ceil(n/8),Math.ceil(n/8),this.layers],e?{pass:e}:void 0)}},Sa=6,Ca=32,wa=e=>{let t=String(e);return t.includes(`.`)||t.includes(`e`)?t:t+`.0`},Ta=`
fn envCubeDir( face: u32, x: u32, y: u32, size: u32 ) -> vec3f {
	let u = ( f32( x ) + 0.5 ) / f32( size ) * 2.0 - 1.0;
	let v = ( f32( y ) + 0.5 ) / f32( size ) * 2.0 - 1.0;
	var d: vec3f;
	switch ( face ) {
		case 0u: { d = vec3f( 1.0, -v, -u ); }
		case 1u: { d = vec3f( -1.0, -v, u ); }
		case 2u: { d = vec3f( u, 1.0, v ); }
		case 3u: { d = vec3f( u, -1.0, -v ); }
		case 4u: { d = vec3f( u, -v, 1.0 ); }
		default: { d = vec3f( -u, -v, -1.0 ); }
	}
	return normalize( d );
}
`,Ea=class{constructor(e,t,n,r=128){this.renderer=e,this.scene=t,this.sky=n,this.size=r,t&&(t.environmentIntensity=1),this.source=new H({label:`envSource`,width:r,height:r,dimension:`cube`,format:`rgba16float`,mips:!0,usage:[`sample`,`storage`,`render`]});let i=e=>new H({label:e,width:r,height:r,dimension:`cube`,format:`rgba16float`,mips:Sa,usage:[`sample`,`storage`]});this.targets=[i(`envSpecularA`),i(`envSpecularB`)],this.front=0,this.sh=[new li({label:`envSH_A`,count:9,type:`vec4f`,data:Da()}),new li({label:`envSH_B`,count:9,type:`vec4f`})],this.lastSun=new N(0,-2,0),this.timer=0,this.interval=3,this.step=-1,this.primed=!1,this._build(),this.steps=this._buildSteps()}_build(){let e=this.sky,t=this.size;this.faceParams=[],this.faceKernels=[];for(let n=0;n<6;n++)this.faceKernels.push(new Mi({label:`Env Face `+n,modules:[z,e.module],bindings:{outCube:{storageTexture:this.source,viewDimension:`2d-array`}},workgroupSize:[8,8,1],code:`${Ta}
@compute @workgroup_size( WG_X, WG_Y, WG_Z ) fn main( @builtin( global_invocation_id ) gid: vec3u ) {
	if ( gid.x >= ${t}u || gid.y >= ${t}u ) { return; }
	let dir = envCubeDir( ${n}u, gid.x, gid.y, ${t}u );
	// no sun or moon disk: the key light is lit directly
	textureStore( outCube, gid.xy, ${n}, vec4f( skyRadianceWithClouds( dir, false ), 1.0 ) );
}`}));this.filterKernels=[[],[]];for(let e=0;e<2;e++)for(let n=0;n<Sa;n++){let r=n/5,i=t>>n;this.filterKernels[e].push(new Mi({label:`Env GGX `+n,modules:[z],bindings:{srcCube:{texture:this.source,viewDimension:`cube`},outCube:{storageTexture:this.targets[e],view:{dimension:`2d-array`,baseMipLevel:n,mipLevelCount:1}}},workgroupSize:[8,8,1],code:`${Ta}
fn hammersley( i: u32, n: u32 ) -> vec2f {
	var b = i;
	b = ( b << 16u ) | ( b >> 16u );
	b = ( ( b & 0x55555555u ) << 1u ) | ( ( b & 0xAAAAAAAAu ) >> 1u );
	b = ( ( b & 0x33333333u ) << 2u ) | ( ( b & 0xCCCCCCCCu ) >> 2u );
	b = ( ( b & 0x0F0F0F0Fu ) << 4u ) | ( ( b & 0xF0F0F0F0u ) >> 4u );
	b = ( ( b & 0x00FF00FFu ) << 8u ) | ( ( b & 0xFF00FF00u ) >> 8u );
	return vec2f( f32( i ) / f32( n ), f32( b ) * 2.3283064365386963e-10 );
}
@compute @workgroup_size( WG_X, WG_Y, WG_Z ) fn main( @builtin( global_invocation_id ) gid: vec3u ) {
	if ( gid.x >= ${i}u || gid.y >= ${i}u ) { return; }
	let N = envCubeDir( gid.z, gid.x, gid.y, ${i}u );
${n===0?`
	textureStore( outCube, gid.xy, gid.z, vec4f( textureSampleLevel( srcCube, smpLinearClamp, N, 0.0 ).rgb, 1.0 ) );
}`:`
	// filtered importance sampling (Karis 2013 / GPU Gems 3 ch. 20), N = V = R
	let alpha = ${wa(r*r)};
	let a2 = alpha * alpha;
	let tb = basis( N );
	const COUNT = 96u;
	let saTexel = ${wa(4*Math.PI/(6*t*t))};
	var sum = vec3f( 0.0 );
	var wsum = 0.0;
	for ( var i = 0u; i < COUNT; i++ ) {
		let xi = hammersley( i, COUNT );
		let phi = TWO_PI * xi.x;
		let cosT = sqrt( ( 1.0 - xi.y ) / ( 1.0 + ( a2 - 1.0 ) * xi.y ) );
		let sinT = sqrt( 1.0 - cosT * cosT );
		let H = tb * vec3f( sinT * cos( phi ), sinT * sin( phi ), cosT );
		let L = 2.0 * dot( N, H ) * H - N;
		let NdotL = dot( N, L );
		if ( NdotL > 0.0 ) {
			let NdotH = cosT;
			let d = NdotH * NdotH * ( a2 - 1.0 ) + 1.0;
			let D = a2 / ( PI * d * d );
			let pdf = D * 0.25; // D * NdotH / ( 4 VdotH ), N = V
			let saSample = 1.0 / ( f32( COUNT ) * pdf + 1e-4 );
			let lod = clamp( 0.5 * log2( saSample / saTexel ) + 1.0, 0.0, ${wa(Math.log2(t))} );
			sum += textureSampleLevel( srcCube, smpLinearClamp, L, lod ).rgb * NdotL;
			wsum += NdotL;
		}
	}
	textureStore( outCube, gid.xy, gid.z, vec4f( sum / max( wsum, 1e-4 ), 1.0 ) );
}`}`}))}let n=Math.max(0,Math.log2(t/Ca));this.shKernels=[0,1].map(e=>new Mi({label:`Env SH`,modules:[z],bindings:{srcCube:{texture:this.source,viewDimension:`2d-array`},shOut:{storage:this.sh[e],access:`read_write`}},workgroupSize:[128,1,1],code:`${Ta}
var<workgroup> acc: array<array<vec3f, 9>, 128>;
@compute @workgroup_size( 128 ) fn main( @builtin( local_invocation_index ) li: u32 ) {
	var c: array<vec3f, 9>;
	for ( var k = 0; k < 9; k++ ) { c[ k ] = vec3f( 0.0 ); }
	let total = 6144u;
	for ( var idx = li; idx < total; idx += 128u ) {
		let face = idx / 1024u;
		let r = idx % 1024u;
		let x = r % ${Ca}u; let y = r / ${Ca}u;
		let d = envCubeDir( face, x, y, ${Ca}u );
		// solid angle of the texel
		let u = ( f32( x ) + 0.5 ) / ${wa(Ca)} * 2.0 - 1.0;
		let v = ( f32( y ) + 0.5 ) / ${wa(Ca)} * 2.0 - 1.0;
		let tmp = 1.0 + u * u + v * v;
		let w = 4.0 / ( sqrt( tmp ) * tmp ) * ${wa(1/1024)};
		let L = textureLoad( srcCube, vec2u( x, y ), face, ${n} ).rgb * w;
		c[ 0 ] += L * 0.282095;
		c[ 1 ] += L * 0.488603 * d.y;
		c[ 2 ] += L * 0.488603 * d.z;
		c[ 3 ] += L * 0.488603 * d.x;
		c[ 4 ] += L * 1.092548 * d.x * d.y;
		c[ 5 ] += L * 1.092548 * d.y * d.z;
		c[ 6 ] += L * 0.315392 * ( 3.0 * d.z * d.z - 1.0 );
		c[ 7 ] += L * 1.092548 * d.x * d.z;
		c[ 8 ] += L * 0.546274 * ( d.x * d.x - d.y * d.y );
	}
	acc[ li ] = c;
	workgroupBarrier();
	for ( var s = 64u; s > 0u; s >>= 1u ) {
		if ( li < s ) { for ( var k = 0; k < 9; k++ ) { acc[ li ][ k ] += acc[ li + s ][ k ]; } }
		workgroupBarrier();
	}
	if ( li == 0u ) {
		// cosine lobe convolution (A0 = PI, A1 = 2 PI / 3, A2 = PI / 4), stored as irradiance / PI
		let A = array<f32, 9>( 1.0, 0.6666667, 0.6666667, 0.6666667, 0.25, 0.25, 0.25, 0.25, 0.25 );
		for ( var k = 0; k < 9; k++ ) { shOut[ k ] = vec4f( acc[ 0 ][ k ] * A[ k ], 0.0 ); }
	}
}`})),this.envUniforms=new L(`EnvParams`,{levels:[`f32`,5]},{label:`env`}),dr.set(`envSpecular`,new R({name:`hook-envSpecular`,deps:[z],uniforms:this.envUniforms,uniformName:`envParams`,bindings:{envSpecularCube:{texture:()=>this.targets[this.front],viewDimension:`cube`}},code:`
fn hookEnvSpecular( R: vec3f, roughness: f32 ) -> vec3f {
	return textureSampleLevel( envSpecularCube, smpLinearClamp, R, roughness * envParams.levels ).rgb * frame.envIntensity;
}
`})),dr.set(`envDiffuse`,new R({name:`hook-envDiffuse`,deps:[z],bindings:{envSH:{storage:()=>this.sh[this.front],access:`read`,type:`vec4f`}},code:`
fn hookEnvDiffuse( N: vec3f ) -> vec3f {
	let d = N;
	var e = envSH[ 0 ].rgb * 0.282095
		+ envSH[ 1 ].rgb * 0.488603 * d.y + envSH[ 2 ].rgb * 0.488603 * d.z + envSH[ 3 ].rgb * 0.488603 * d.x
		+ envSH[ 4 ].rgb * 1.092548 * d.x * d.y + envSH[ 5 ].rgb * 1.092548 * d.y * d.z
		+ envSH[ 6 ].rgb * 0.315392 * ( 3.0 * d.z * d.z - 1.0 ) + envSH[ 7 ].rgb * 1.092548 * d.x * d.z
		+ envSH[ 8 ].rgb * 0.546274 * ( d.x * d.x - d.y * d.y );
	return max( e, vec3f( 0.0 ) ) * frame.envIntensity;
}
`}))}_buildSteps(){let e=[],t=this.size;for(let n=0;n<6;n++)e.push(()=>this.faceKernels[n].dispatch([t/8,t/8,1]));let n=this._mips||=new xa(this.source,`envSource`);e.push(()=>n.dispatch());for(let n=0;n<Sa;n++){let r=Math.max(1,Math.ceil((t>>n)/8));e.push(()=>this.filterKernels[1-this.front][n].dispatch([r,r,6]))}return e.push(()=>this.shKernels[1-this.front].dispatch(1)),e.push(()=>{this.front=1-this.front}),e}update(e,t=!1){this.timer-=e;let n=this.sky.atmosphere.sunDir.value;if(t||!this.primed){this.primed=!0,this.timer=this.interval,this.lastSun.copy(n);for(let e of this.steps)e();this.step=-1;return}if(this.step<0){if(!(n.angleTo(this.lastSun)>.004)&&this.timer>0)return;this.timer=this.interval,this.lastSun.copy(n),this.step=0}this.steps[this.step++](),this.step===this.steps.length&&(this.step=-1)}get texture(){return this.targets[this.front]}};function Da(){let e=new Float32Array(36),t=[.3,.4,.6];for(let n=0;n<3;n++)e[n]=t[n]/.282095;return e}var Oa=8,ka=()=>Array.from({length:Oa},()=>new P),Aa=new L(`LocalLightParams`,{pos:[`vec4f[${Oa}]`,ka()],col:[`vec4f[${Oa}]`,ka()],dir:[`vec4f[${Oa}]`,ka()],count:[`i32`,0],flashOn:[`f32`,0],flashCone:[`vec2f`,new j(.99,.82)],flashPos:[`vec3f`,new N],flashDir:[`vec3f`,new N(0,0,-1)],flashCol:[`vec3f`,new N]},{label:`localLights`}),ja=Aa.fields,Ma={array:ja.pos.value},Na={array:ja.col.value},Pa={array:ja.dir.value},Fa=ja.count,Ia={on:ja.flashOn,pos:ja.flashPos,dir:ja.flashDir,col:ja.flashCol,cone:ja.flashCone},La=new R({name:`localLights`,deps:[z,br],uniforms:Aa,uniformName:`localLights`,code:`
// spot profile shared by the shading, the beam and the snow: hot centre, soft edge, faint spill
fn localLightsSpotProfile( cd: f32, cosInner: f32, cosOuter: f32 ) -> f32 {
	let m = smoothstep( cosOuter, cosInner, cd );
	return max( m * m, smoothstep( cosOuter - 0.55, cosOuter, cd ) * 0.05 );
}

fn hookLocalLights( s: Surface, P: vec3f, N: vec3f, V: vec3f, acc: ptr<function, LightAccum> ) {
#if !IS_WATER && !NO_LOCAL_LIGHTS
	let diffuseColor = s.albedo * ( 1.0 - s.metalness );
	let specF0 = mix( vec3f( 0.04 ) * s.specularIntensity, s.albedo, s.metalness );
	let specF90 = mix( s.specularIntensity, 1.0, s.metalness );
	let rough = clamp( s.roughness, 0.03, 1.0 );
	for ( var i = 0; i < localLights.count; i++ ) {
		let p = localLights.pos[ i ];
		let d = p.xyz - P;
		let d2 = dot( d, d );
		if ( d2 < p.w ) {
			let c = localLights.col[ i ];
			let sd = localLights.dir[ i ];
			let L = d * inverseSqrt( max( d2, 1e-6 ) );
			// smooth range window (1 - (d/r)^4)^2 on the inverse-square law
			let x = d2 / p.w;
			let win = sat( 1.0 - x * x );
			// spot: hot centre, soft edge at the outer cone, faint wide spill
			let spot = localLightsSpotProfile( dot( -L, sd.xyz ), c.w, sd.w );
			// Beer-Lambert over the underwater part of the path (straight, mean sea level): red dies
			// within metres, so what the torch lights far away under water is dim and blue-green
			let r = d2 * inverseSqrt( max( d2, 1e-6 ) );
			let under = select( 0.0, sat( ( frame.seaLevel - min( P.y, p.y ) ) / max( abs( p.y - P.y ), 1e-3 ) ), frame.waterEnabled > 0.5 );
			let Tw = exp( -( frame.waterAbsorption + frame.waterScattering ) * ( r * under ) );
			// the + 0.15 m^2 softens the near field of a lamp's finite size (no hot spot on the post)
			let lightColor = c.xyz * Tw * ( win * win * spot / ( d2 + 0.15 ) );
			let irradiance = max( dot( N, L ), 0.0 ) * lightColor;
#if LOCAL_LIGHTS_CHEAP
			// foliage (heavy overdraw): Lambert only
			( *acc ).directDiffuse += irradiance * diffuseColor * INV_PI;
#else
			( *acc ).directDiffuse += irradiance * diffuseColor * INV_PI;
			( *acc ).directSpecular += irradiance * BRDF_GGX( L, V, N, specF0, specF90, rough );
#if SHEEN
			( *acc ).directSpecular += irradiance * BRDF_Sheen( L, V, N, s.sheenColor, max( s.sheenRoughness, 0.07 ) );
#endif
#endif
		}
	}
#endif
}
`});dr.set(`localLights`,La),new N;var Ra=new N,za=new N,Ba=new N,Va=(e,t,n)=>{let r=Math.min(1,Math.max(0,(e-t)/(n-t)));return r*r*(3-2*r)},Ha=class{constructor(){this.sources=[],this.enabled=!0,this.strength=1,this.flashlight={on:!1,intensity:55,range:30,color:new Ee(1,.71,.49),cosInner:Math.cos(A.degToRad(9)),cosOuter:Math.cos(A.degToRad(35)),position:new N,dir:new N(0,0,-1),primed:!1},this._list=[],this.time=0,this.active=0}add(e){return e.phase=e.phase??Math.random()*100,this.sources.push(e),e}toggleFlashlight(e=!this.flashlight.on){return this.flashlight.on=e,this.flashlight.primed=!1,e}update(e,t){this.time+=t;let n=0;Ia.on.value=this.flashlight.on&&this.enabled?1:0;let r=Ma.array,i=Na.array,a=Pa.array,o=this.flashlight;if(o.on&&this.enabled){e.updateMatrixWorld();let s=e.matrixWorld.elements;za.set(s[0],s[1],s[2]).normalize(),Ba.set(s[4],s[5],s[6]).normalize(),Ra.set(-s[8],-s[9],-s[10]).normalize(),o.primed||=(o.dir.copy(Ra),!0),o.dir.lerp(Ra,1-Math.exp(-t/.06)).normalize(),o.position.setFromMatrixPosition(e.matrixWorld).addScaledVector(za,.2).addScaledVector(Ba,-.22).addScaledVector(Ra,.15);let c=o.intensity*(.08+.92*Va(V.night.value,0,.6));r[0].set(o.position.x,o.position.y,o.position.z,o.range*o.range),i[0].set(o.color.r*c,o.color.g*c,o.color.b*c,o.cosInner),a[0].set(o.dir.x,o.dir.y,o.dir.z,o.cosOuter),n=1,Ia.pos.value.copy(o.position),Ia.dir.value.copy(o.dir),Ia.col.value.set(o.color.r*c,o.color.g*c,o.color.b*c),Ia.cone.value.set(o.cosInner,o.cosOuter)}let s=Va(V.night.value,.15,.75)*this.strength;if(s>.002&&this.enabled){let t=e.position,o=this._list;o.length=0;for(let e of this.sources)e.enabled!==!1&&(e.update&&e.update(),e.d2=e.position.distanceToSquared(t),o.push(e));o.sort((e,t)=>e.d2-t.d2);let c=Oa-n,l=o.length>c?Math.sqrt(o[c].d2):1/0;for(let e=0;e<Math.min(c,o.length);e++){let t=o[e],c=Number.isFinite(l)?Va(Math.sqrt(t.d2),l,l*.8):1,u=t.flicker?1+t.flicker*Math.sin(this.time*9+t.phase)*Math.sin(this.time*5.3+t.phase*.37):1,d=t.intensity*s*c*u*(t.scale??1);if(d<=1e-4)continue;let f=t.range;r[n].set(t.position.x,t.position.y,t.position.z,f*f),i[n].set(t.color.r*d,t.color.g*d,t.color.b*d,t.cosInner??-1.5),t.dir?a[n].set(t.dir.x,t.dir.y,t.dir.z,t.cosOuter??-2):a[n].set(0,-1,0,-2),n++}}Fa.value=n,this.active=n}},Ua={0:`front`,1:`back`,2:`double`,front:`front`,back:`back`,double:`double`};function Wa(e){let t={...e};return t.side!==void 0&&(t.side=Ua[t.side]||`front`),t}var Ga=class extends Ar{constructor(e={},t=null){let n=Wa(e),r={...n.uniforms||{}};r.envMapIntensity=[`f32`,n.envMapIntensity??1],r.emissiveIntensity=[`f32`,n.emissiveIntensity??1],t&&Object.assign(r,t),super({...n,uniforms:r}),this.isSceneMaterial=!0,this.isMeshStandardMaterial=!0}get side(){return this._side}set side(e){let t=Ua[e]||`front`;t!==this._side&&this._side!==void 0&&this.version++,this._side=t}get emissiveIntensity(){return this.uniforms.emissiveIntensity.value}set emissiveIntensity(e){this.uniforms.emissiveIntensity.value=e}get envMapIntensity(){return this.uniforms.envMapIntensity.value}set envMapIntensity(e){this.uniforms.envMapIntensity.value=e}get surface(){return this._prelude()+(this._surface||``)}set surface(e){this._surface=e}_prelude(){return`	s.emissive = s.emissive * mat.emissiveIntensity;
	s.envIntensity = mat.envMapIntensity;
`}},Ka=(e={})=>new Ga(e),qa=1.333,Ja=.35,Ya=16,Xa=new R({name:`underwater-flash`,deps:[La],code:`
fn uwFlashOn() -> f32 { return localLights.flashOn; }
fn uwFlashPos() -> vec3f { return localLights.flashPos; }
fn uwFlashDir() -> vec3f { return localLights.flashDir; }
fn uwFlashCol() -> vec3f { return localLights.flashCol; }
fn uwFlashCone() -> vec2f { return localLights.flashCone; }
`}),Za=e=>{let t=String(e);return t.includes(`.`)||t.includes(`e`)?t:t+`.0`},Qa=class{constructor({depthTexture:e,maskTexture:t,query:n,caustics:r,fft:i}){this.depthTexture=e,this.maskTexture=t,this.query=n,this.caustics=r,this.fft=i,this.mediumTexture=null,this.uniforms=new L(`UnderwaterParams`,{camWorld:[`mat4x4f`,new F],camPos:[`vec3f`,new N],lensDistance:[`f32`,.1],proj:[`vec4f`,new P(1,1,.1,1e3)],shafts:[`f32`,1],band:[`f32`,9],enabled:[`f32`,1],torchBeam:[`f32`,3],hasShafts:[`f32`,0]},{label:`underwater`});let a=this.uniforms.fields;this.lensDistance=a.lensDistance,this.shafts=a.shafts,this.band=a.band,this.enabled=a.enabled,this.torchBeam=a.torchBeam,this.camPos=a.camPos,this.camWorld=a.camWorld,this.proj=a.proj,this._module=null,this.shaftTarget=new U(1,1,{colors:[`rgba16float`],label:`uwShafts`}),this._shaftPass=null}setSize(e,t){this.shaftTarget.setSize(Math.max(1,Math.ceil(e/2)),Math.max(1,Math.ceil(t/2)))}get shaftPass(){return this._shaftPass||=new W({label:`underwater shafts`,colorFormats:[`rgba16float`],modules:[this.module],code:this._shaftCode()}),this._shaftPass}renderShafts(e){this.uniforms.fields.hasShafts.value=+!!e,e&&this.shaftPass.render({colorViews:[this.shaftTarget.texture],clear:[0,0,0,0]})}updateCamera(e){e.updateMatrixWorld(),this.camPos.value.setFromMatrixPosition(e.matrixWorld),this.camWorld.value.copy(e.matrixWorld);let t=e.projectionMatrix.elements;this.proj.value.set(t[0],t[5],e.near,e.far),this.lensDistance.value=e.near}get module(){return this._module||=new R({name:`underwater`,deps:[z,this.query&&this.query.module,this.caustics&&this.caustics.module,Xa],uniforms:this.uniforms,uniformName:`underwaterParams`,bindings:{underwaterDepth:{texture:()=>this.depthTexture},underwaterMask:{texture:()=>this.maskTexture}},code:this._code()}),this._module}get compositeModule(){return this._compositeModule||=new R({name:`underwater-composite`,deps:[this.module],bindings:{underwaterMediumTex:{texture:()=>this.mediumTexture},underwaterShaftTex:{texture:()=>this.shaftTarget.texture}},code:this._compositeCode()}),this._compositeModule}_code(){return`
const UW_STRADDLE: f32 = ${Za(Ja)};
const UW_BAND: i32 = ${Ya};
const UW_IOR: f32 = ${Za(qa)};

// reversed-Z depth -> view Z (negative)
fn underwaterViewZ( d: f32 ) -> f32 {
	let n = underwaterParams.proj.z; let f = underwaterParams.proj.w;
	return n * f / ( ( n - f ) * d - n );
}

// view-space ray for screen uv (unnormalized, z = -1)
fn underwaterViewRay( uv: vec2f ) -> vec3f {
	let ndc = vec2f( uv.x * 2.0 - 1.0, ( 1.0 - uv.y ) * 2.0 - 1.0 );
	return vec3f( ndc.x / underwaterParams.proj.x, ndc.y / underwaterParams.proj.y, -1.0 );
}

fn underwaterWorldDir( uv: vec2f ) -> vec3f {
	return normalize( ( underwaterParams.camWorld * vec4f( underwaterViewRay( uv ), 0.0 ) ).xyz );
}

fn _uwDepthAt( uv: vec2f ) -> f32 {
	let size = vec2f( textureDimensions( underwaterDepth ) );
	return textureLoad( underwaterDepth, vec2i( clamp( uv, vec2f( 0.0 ), vec2f( 0.9999 ) ) * size ), 0 );
}

// Medium at the near clip plane for each pixel (1: water, 0: air).
//  - a water surface in view: the side it is seen from (written by the water material) is the
//    medium between the lens and the surface
//  - no surface in view: the ray never crosses the surface beyond the lens, so it is in the medium
//    of its far end: an object hit below the surface is in water; the sky is air (a downward ray
//    that reaches nothing is in water)
// The waterline on the lens is then exactly where the rendered surface crosses the near plane:
// the surface fragments on one side end right there, and the far ends on the other side agree.
// Farther than STRADDLE from the surface the near plane can't reach it: the camera's medium.
fn underwaterMedium( uv: vec2f ) -> f32 {
	if ( frame.waterEnabled < 0.5 ) { return 0.0; }
	let size = vec2f( textureDimensions( underwaterMask ) );
	let px = vec2i( clamp( uv, vec2f( 0.0 ), vec2f( 0.9999 ) ) * size );
	let m = textureLoad( underwaterMask, px, 0 );
	let camH = underwaterParams.camPos.y - waterQueryCameraState().x;
	var water = select( 0.0, 1.0, camH < 0.0 );
	if ( m.y > 0.5 ) {
		water = m.x;
	} else if ( abs( camH ) < UW_STRADDLE ) {
		let d = _uwDepthAt( uv );
		let ray = underwaterViewRay( uv );
		let dirW = ( underwaterParams.camWorld * vec4f( ray, 0.0 ) ).xyz;
		if ( d < 1e-7 ) {
			water = select( 0.0, 1.0, dirW.y < 0.0 );
		} else {
			let q = underwaterParams.camPos + dirW * ( - underwaterViewZ( d ) );
			water = select( 0.0, 1.0, q.y < waterQueryHeightAtXZ( q.xz ) );
		}
	}
	return water;
}

`}_shaftCode(){return`
fn _uwIgn( px: vec2f ) -> f32 { return fract( fract( dot( px, vec2f( 0.06711056, 0.00583715 ) ) ) * 52.9829189 ); }

fn fragment( in: FSIn ) -> vec4f {
	let uv = in.uv;
	let pixel = in.pos.xy;
	let d = _uwDepthAt( uv );
	let vz = underwaterViewZ( d );
	let ray = underwaterViewRay( uv );
	let dist = max( min( length( ray * ( - vz ) ), 600.0 ) - underwaterParams.lensDistance * length( ray ), 0.0 );
	let dir = underwaterWorldDir( uv );
	let st = waterQueryCameraState();
	let sigS = frame.waterScattering;
	let sigT = frame.waterAbsorption + sigS;

	let Ls = - refract( - frame.sunDir, vec3f( 0.0, 1.0, 0.0 ), 1.0 / UW_IOR ); // toward the sun, underwater
	let mu = max( Ls.y, 0.15 );
	let cosPh = dot( dir, Ls );
	let g = 0.85;
	let phase = ( 1.0 - g * g ) / ( 4.0 * PI ) / pow( max( 1.0 + g * g - cosPh * 2.0 * g, 1e-4 ), 1.5 ) * 0.75 + 0.25 / ( 4.0 * PI );

	let sunE = frame.sunColor * 0.96;

	var shafts = vec3f( 0.0 );
${this.caustics&&this.caustics.module?`
		{
			let steps = 20;
			let maxD = min( dist, 22.0 );
			let ds = maxD / f32( steps );
			// interleaved gradient noise on the pixel grid, moved every frame (Jimenez 2014) so the
			// temporal resolve integrates the steps instead of freezing a noise pattern on screen
			let fragPx = pixel + f32( frame.frameIndex % 64u ) * 5.588238;
			let jitter = _uwIgn( fragPx );
			// gusts / slicks vary over hundreds of metres: one sample for the whole march
			let detK = causticsDetailK( underwaterParams.camPos.xz + dir.xz * ( maxD * 0.5 ) );
			for ( var i = 0; i < steps; i++ ) {
				let s = ( f32( i ) + jitter ) * ds;
				let p = underwaterParams.camPos + dir * s;
				let z = max( st.x - p.y, 0.01 );
				let caus = causticsSampleShaft( p, z, 1.5, detK );
				let Tl = exp( - sigT * ( s + z / mu ) );
				shafts += ( caus - 1.0 ) * Tl * ds;
			}
			shafts = shafts * sunE * sigS * phase * underwaterParams.shafts * 2.5;
		}`:``}
	// diver's torch: single scattering of the flashlight cone along the view ray (the torch sits
	// beside the eye, so the beam is a shaft slightly off the view axis), extinction on the light
	// and the view legs, same phase function, up to the scene depth
	var torch = vec3f( 0.0 );
	if ( uwFlashOn() > 0.5 ) {
		let tSteps = 8;
		let tMax = min( dist, 25.0 );
		let tds = tMax / f32( tSteps );
		let tPx = pixel + f32( frame.frameIndex % 64u ) * 5.588238 + 17.3;
		let tJit = _uwIgn( tPx );
		let fpos = uwFlashPos(); let fdir = uwFlashDir(); let cone = uwFlashCone();
		for ( var i = 0; i < tSteps; i++ ) {
			let s = ( f32( i ) + tJit ) * tds;
			let v = underwaterParams.camPos + dir * s - fpos;
			let r2 = max( dot( v, v ), 1e-4 );
			let r = sqrt( r2 );
			let Lr = v / r;
			let spot = localLightsSpotProfile( dot( Lr, fdir ), cone.x, cone.y );
			// same lobe as the sun in-scatter (0.75 forward g = 0.85 + 0.25 isotropic), Schlick's form
			let sk = 1.55 * g - 0.55 * g * g * g;
			let sd = 1.0 - dot( dir, - Lr ) * sk;
			let ph = ( 1.0 - sk * sk ) / ( 4.0 * PI ) * 0.75 / ( sd * sd ) + 0.25 / ( 4.0 * PI );
			torch += exp( - sigT * ( r + s ) ) * ( spot * ph / ( r2 + 0.15 ) );
		}
		// x3: the suspended particles scatter more than the clear-water coefficient (the beam reads)
		torch = torch * uwFlashCol() * sigS * tds * underwaterParams.torchBeam;
	}

	return vec4f( max( shafts, vec3f( 0.0 ) ) + torch, dist );
}
`}_compositeCode(){return`
fn _uwMed( pc: vec2i, dy: i32, mSize: vec2i ) -> f32 {
	return textureLoad( underwaterMediumTex, vec2i( pc.x, clamp( pc.y + dy, 0, mSize.y - 1 ) ), 0 ).r;
}

fn _uwLit( m: f32, sigT: vec3f, zc: f32, dirY: f32, dist: f32 ) -> vec3f {
	let a = sigT * zc / m;
	let kk = sigT * ( 1.0 - dirY / m );
	let e0 = exp( - a );
	let e1 = exp( - max( a + kk * dist, vec3f( 0.0 ) ) );
	return select( ( e0 - e1 ) / kk, e0 * dist, abs( kk ) < vec3f( 1e-4 ) );
}

// pixel: fragment coordinate of the composite (screenCoordinate)
fn underwaterComposite( uv: vec2f, pixel: vec2f ) -> vec4f {
	if ( frame.waterEnabled < 0.5 ) { return vec4f( postSceneSample( uv ), 1.0 ); }
	let mSize = vec2i( textureDimensions( underwaterMediumTex ) );
	let pc = clamp( vec2i( uv * vec2f( mSize ) ), vec2i( 0 ), mSize - 1 );
	let here = _uwMed( pc, 0, mSize );
	let under = here > 0.5;

	// distance to the waterline on the lens in pixels, searched vertically (the line runs roughly
	// across the screen: no camera roll, and over the few cm of the lens the surface is a plane)
	var lineDist = 1e4;
	var lineDir = 0.0; // uv.y direction toward the other medium
	let camH = underwaterParams.camPos.y - waterQueryCameraState().x;
	if ( abs( camH ) < UW_STRADDLE ) {
		let flips = abs( _uwMed( pc, -8, mSize ) - here ) + abs( _uwMed( pc, 8, mSize ) - here ) + abs( _uwMed( pc, -UW_BAND, mSize ) - here ) + abs( _uwMed( pc, UW_BAND, mSize ) - here );
		if ( flips > 0.5 ) {
			for ( var i = 1; i < UW_BAND + 1; i++ ) {
				let up = abs( _uwMed( pc, -i, mSize ) - here ) > 0.5;
				let down = abs( _uwMed( pc, i, mSize ) - here ) > 0.5;
				if ( lineDist > 1e3 && ( up || down ) ) {
					lineDist = f32( i ) - 0.5;
					lineDir = select( 1.0, -1.0, up );
				}
			}
		}
	}

	// ---- meniscus band: rounded water edge acting like a cylindrical lens; samples are pushed
	// away from the line on both sides
	let bandW = underwaterParams.band;
	let tBand = clamp( lineDist / bandW, 0.0, 1.0 );
	let bendPx = tBand * sqrt( max( 1.0 - tBand * tBand, 0.0 ) ) * bandW * 0.8;
	let uvB = uv - vec2f( 0.0, lineDir * bendPx / f32( mSize.y ) );
	let base = postSceneSample( uvB );

	var result = base;

	if ( under && underwaterParams.enabled > 0.5 ) {
		// scene distance along this pixel
		let d = _uwDepthAt( uv );
		let vz = underwaterViewZ( d );
		let ray = underwaterViewRay( uv );
		// the water between the eye and the lens is clipped away: the medium starts at the lens
		let dist = max( min( length( ray * ( - vz ) ), 600.0 ) - underwaterParams.lensDistance * length( ray ), 0.0 );
		let dir = underwaterWorldDir( uv );

		let st = waterQueryCameraState();
		let zc = max( st.x - underwaterParams.camPos.y, 0.0 ); // camera depth below the surface
		let sigA = frame.waterAbsorption;
		let sigS = frame.waterScattering;
		let sigT = sigA + sigS;

		let Ls = - refract( - frame.sunDir, vec3f( 0.0, 1.0, 0.0 ), 1.0 / UW_IOR ); // toward the sun, underwater
		let mu = max( Ls.y, 0.15 );
		let cosPh = dot( dir, Ls );
		let g = 0.85;
		let phase = ( 1.0 - g * g ) / ( 4.0 * PI ) / pow( max( 1.0 + g * g - cosPh * 2.0 * g, 1e-4 ), 1.5 ) * 0.75 + 0.25 / ( 4.0 * PI );

		// light arriving at depth z: E0 exp(-sigT z / m); along the ray z(s) = zc - dir.y s, seen through
		// exp(-sigT s). The in-scatter integral is (exp(-a) - exp(-(a + k d))) / k with a = sigT zc / m
		// and k = sigT (1 - dir.y / m): both exponents stay <= 0 while the ray is in the water, so it
		// can't overflow looking up through deep water (exp(-a) (1 - exp(-k d)) / k does, and the
		// Inf / NaN would stick in the TAA history)
		let sunE = frame.sunColor * 0.96;
		let ambE = frame.skyIrradiance * PI * 0.9;

		let bb = sigS * 0.035;
		let msAlb = bb * 1.3 / ( sigA + bb );
		let inSun = sunE * ( sigS * phase + msAlb * sigT * ( 1.0 / PI ) ) * _uwLit( mu, sigT, zc, dir.y, dist );
		let inAmb = ambE * ( sigS * ( 1.0 / ( 4.0 * PI ) ) + msAlb * sigT * ( 1.0 / PI ) ) * _uwLit( 0.8, sigT, zc, dir.y, dist );

		// caustic light shafts and the torch beam: the half resolution march (underwaterShafts), depth-aware
		// upsampled (bilinear weights times the view distance similarity)
		var extra = vec3f( 0.0 );
		if ( underwaterParams.hasShafts > 0.5 ) {
			let ls = vec2i( textureDimensions( underwaterShaftTex ) );
			let pa = uv * vec2f( ls ) - 0.5;
			let q0 = floor( pa );
			let fr = pa - q0;
			var acc = vec3f( 0.0 );
			var wSum = 1e-6;
			for ( var k = 0; k < 4; k++ ) {
				let o = vec2i( k & 1, k >> 1u );
				let sm = textureLoad( underwaterShaftTex, clamp( vec2i( q0 ) + o, vec2i( 0 ), ls - 1 ), 0 );
				let wb = select( 1.0 - fr.x, fr.x, o.x == 1 ) * select( 1.0 - fr.y, fr.y, o.y == 1 );
				let rel = abs( sm.w - dist ) / max( dist, 0.5 );
				let wt = wb / pow2( rel * 10.0 + 1.0 ) + 1e-5;
				acc += sm.rgb * wt;
				wSum += wt;
			}
			extra = acc / wSum;
		}

		let T = exp( - sigT * dist );
		result = base * T + inSun + inAmb + extra;
	}

	// meniscus contact line and bright rim
	let line = smoothstep( 2.0, 0.0, lineDist );
	let rim = smoothstep( bandW, bandW * 0.4, lineDist ) * smoothstep( 0.5, 2.5, lineDist );
	let withLine = result * ( 1.0 - line * 0.55 ) + rim * 0.15 * ( frame.skyIrradiance * 2.5 + frame.sunColor * 0.02 );
	return vec4f( withLine, 1.0 );
}
`}},$a=[60,300,180,240,120,0],eo=[0,.5,.25,.75],to=class{constructor(e,t,{samples:n=16,depthIsColor:r=!1}={}){this.depthTexture=e,this.depthIsColor=r,this.camera=t,this.resolutionScale=1,this.useTemporalFiltering=!1,this.uniforms=new L(`GTAOParams`,{proj:[`mat4x4f`,new F],invProj:[`mat4x4f`,new F],resolution:[`vec2f`,new j],radius:[`f32`,.25],thickness:[`f32`,1],distanceExponent:[`f32`,1],distanceFallOff:[`f32`,1],scale:[`f32`,1],temporalDirection:[`f32`,0],temporalOffset:[`f32`,0],resolutionScaleU:[`f32`,0]},{label:`gtao`});let i=this.uniforms.fields;this.radius=i.radius,this.thickness=i.thickness,this.distanceExponent=i.distanceExponent,this.distanceFallOff=i.distanceFallOff,this.scale=i.scale,this.samples={value:n},this.target=new U(1,1,{colors:[`r8unorm`],label:`GTAO.AO`}),this.noiseTexture=no(),this._currentSamples=-1,this._pass=null,this._frame=0,this._jp=new F}get texture(){return this.target.texture}getTextureNode(){return this.target.texture}setSize(e,t){e=Math.round(this.resolutionScale*e),t=Math.round(this.resolutionScale*t),this.uniforms.fields.resolutionScaleU.value=this.resolutionScale,this.uniforms.fields.resolution.value.set(e,t),this.target.setSize(e,t)}_build(){let e=this.samples.value,t=e<30?3:5,n=Math.ceil(e/t);this._pass=new W({label:`GTAO`,colorFormats:[`r8unorm`],bindings:{gtao:{uniform:this.uniforms},gtaoDepth:{texture:()=>this.depthTexture},gtaoNoise:{texture:this.noiseTexture}},code:`
const GTAO_DIRECTIONS: i32 = ${t};
const GTAO_STEPS: i32 = ${n};

// (a colour depth copy may mark texels negative: under the water, no AO wanted; see PostFX)
fn gtaoSampleDepthRaw( uv: vec2f ) -> f32 {
	let s = vec2i( textureDimensions( gtaoDepth ) );
	return textureLoad( gtaoDepth, clamp( vec2i( floor( uv * vec2f( s ) ) ), vec2i( 0 ), s - 1 ), 0 )${this.depthIsColor?`.x`:``};
}
fn gtaoSampleDepth( uv: vec2f ) -> f32 { return abs( gtaoSampleDepthRaw( uv ) ); }
fn gtaoLoad( p: vec2i ) -> f32 {
	let s = vec2i( textureDimensions( gtaoDepth ) );
	return abs( textureLoad( gtaoDepth, clamp( p, vec2i( 0 ), s - 1 ), 0 )${this.depthIsColor?`.x`:``} );
}
// three's getViewPosition (WebGPU coordinate system)
fn gtaoViewPosition( uv: vec2f, depth: f32 ) -> vec3f {
	let sp = vec2f( uv.x, 1.0 - uv.y ) * 2.0 - 1.0;
	let v = gtao.invProj * vec4f( sp, depth, 1.0 );
	return v.xyz / v.w;
}
fn gtaoScreenFromClip( c: vec4f ) -> vec2f {
	let s = c.xy / c.w * 0.5 + 0.5;
	return vec2f( s.x, 1.0 - s.y );
}
// three's getNormalFromDepth
fn gtaoNormalFromDepth( uv: vec2f ) -> vec3f {
	let size = vec2f( textureDimensions( gtaoDepth ) );
	let p = vec2i( uv * size );
	let c0 = gtaoLoad( p );
	let l2 = gtaoLoad( p - vec2i( 2, 0 ) ); let l1 = gtaoLoad( p - vec2i( 1, 0 ) );
	let r1 = gtaoLoad( p + vec2i( 1, 0 ) ); let r2 = gtaoLoad( p + vec2i( 2, 0 ) );
	let b2 = gtaoLoad( p + vec2i( 0, 2 ) ); let b1 = gtaoLoad( p + vec2i( 0, 1 ) );
	let t1 = gtaoLoad( p - vec2i( 0, 1 ) ); let t2 = gtaoLoad( p - vec2i( 0, 2 ) );
	let dl = abs( ( 2.0 * l1 - l2 ) - c0 );
	let dr = abs( ( 2.0 * r1 - r2 ) - c0 );
	let db = abs( ( 2.0 * b1 - b2 ) - c0 );
	let dt = abs( ( 2.0 * t1 - t2 ) - c0 );
	let ce = gtaoViewPosition( uv, c0 );
	let dpdx = select( - ce + gtaoViewPosition( uv + vec2f( 1.0 / size.x, 0.0 ), r1 ), ce - gtaoViewPosition( uv - vec2f( 1.0 / size.x, 0.0 ), l1 ), dl < dr );
	let dpdy = select( - ce + gtaoViewPosition( uv - vec2f( 0.0, 1.0 / size.y ), t1 ), ce - gtaoViewPosition( uv + vec2f( 0.0, 1.0 / size.y ), b1 ), db < dt );
	return normalize( cross( dpdx, dpdy ) );
}
fn gtaoRand( uv: vec2f ) -> f32 {
	let dt = dot( uv, vec2f( 12.9898, 78.233 ) );
	let sn = dt - PI * floor( dt / PI );
	return fract( sin( sn ) * 43758.5453 );
}

fn fragment( in: FSIn ) -> vec4f {
	let uvNode = in.uv;
	// Sidestep the nearest-rounding during depth access for the unjittered center pixel to avoid banding
	var depth: f32;
	if ( gtao.resolutionScaleU < 1.0 ) {
		let g = abs( textureGather( ${this.depthIsColor?`0, `:``}gtaoDepth, smpNearestClamp, uvNode ) );
		depth = min( min( g.x, g.y ), min( g.z, g.w ) );
	} else {
		depth = gtaoSampleDepth( uvNode );
	}
	// nothing there (sky: the depth is reversed-Z, 0 at infinity): unoccluded, and never shown
	if ( depth <= 0.0 || gtaoSampleDepthRaw( uvNode ) < 0.0 ) { return vec4f( 1.0 ); }
	let viewPosition = gtaoViewPosition( uvNode, depth );
	let viewNormal = gtaoNormalFromDepth( uvNode );
	let radius = gtao.radius;
	let invRadius = 1.0 / radius;
	let viewDir = normalize( - viewPosition );
	let clipPosition = gtao.proj * vec4f( viewPosition, 1.0 );

	// 5x5 magic square rotation noise (nearest, repeat)
	let noiseRes = vec2f( textureDimensions( gtaoNoise ) );
	let noiseUv = vec2f( uvNode.x, 1.0 - uvNode.y ) * ( gtao.resolution / noiseRes );
	let nt = vec2i( floor( fract( noiseUv ) * noiseRes ) );
	let noiseTexel = textureLoad( gtaoNoise, nt, 0 );
	let randomVec = noiseTexel.xyz * 2.0 - 1.0;
	let tangent = normalize( vec3f( randomVec.xy, 0.0 ) );
	let bitangent = vec3f( - tangent.y, tangent.x, 0.0 );
	let kernelMatrix = mat3x3f( tangent, bitangent, vec3f( 0.0, 0.0, 1.0 ) );

	let invSteps = 1.0 / f32( GTAO_STEPS );
	var ao = 0.0;
	// Per-step phase jitter for spatio-temporal decorrelation.
	let noiseJitterIdx = gtao.temporalDirection * 0.02;
	let stepJitter = interleavedGradientNoise( in.pos.xy + gtao.temporalOffset ) + gtaoRand( ( uvNode + noiseJitterIdx ) * 2.0 - 1.0 );

	// Each iteration analyzes one vertical "slice" of the 3D space around the fragment.
	for ( var i = 0; i < GTAO_DIRECTIONS; i++ ) {
		let angle = f32( i ) / f32( GTAO_DIRECTIONS ) * PI + gtao.temporalDirection;
		let sampleDir = kernelMatrix * vec3f( cos( angle ), sin( angle ), 0.0 );
		let clipDirRadius = gtao.proj * vec4f( sampleDir, 0.0 ) * radius;
		let sliceBitangent = normalize( cross( sampleDir, viewDir ) );
		let sliceTangent = cross( sliceBitangent, viewDir );
		// Project the view normal onto the slice plane (remove component along sliceBitangent).
		// The unnormalized length is the foreshortening weight applied at slice integration.
		// (Activision GTAO paper, Section 3.2 "Per-pixel sampling".)
		let projNRaw = viewNormal - sliceBitangent * dot( viewNormal, sliceBitangent );
		let projNLen = length( projNRaw );
		let projN = projNRaw / max( projNLen, 0.0001 );
		// gamma: angle of projN within the slice plane, signed by the tangent direction.
		let nSin = dot( projN, sliceTangent );
		let nCos = clamp( dot( projN, viewDir ), 0.0, 1.0 );
		let signNSin = select( -1.0, 1.0, nSin >= 0.0 );
		let angleN = signNSin * acos( nCos );
		let tangentToNormalInSlice = cross( projN, sliceBitangent );
		let cosHorizon = dot( viewDir, tangentToNormalInSlice );
		var cosHorizons = vec2f( cosHorizon, - cosHorizon );
		// For each slice, the inner loop performs ray marching to find the horizons.
		for ( var j = 0; j < GTAO_STEPS; j++ ) {
			// Quadratic step distribution ( sampleDist = t^2 ) concentrates samples in the
			// near-field. (Blender's Eevee adaptation)
			let t = ( f32( j ) + 1.0 + stepJitter ) * invSteps;
			let sampleDist = t * t;
			let clipOffset = clipDirRadius * sampleDist;
			// The loop marches in two opposite directions (x and y) along the slice's line to find the horizon on both sides.
			// x
			let sampleScreenPositionX = gtaoScreenFromClip( clipPosition + clipOffset );
			let sampleDepthX = gtaoSampleDepth( sampleScreenPositionX );
			let viewDeltaX = gtaoViewPosition( sampleScreenPositionX, sampleDepthX ) - viewPosition;
			let lenX = length( viewDeltaX );
			// Manual normalize guards against zero-length delta.
			let sHX = dot( viewDir, viewDeltaX ) / max( lenX, 0.0001 );
			// Sphere falloff: ( dist / radius )^2 fades the sample's horizon contribution
			// back toward the prior horizon as it approaches the radius boundary.
			// (squared variant of the paper's near-field attenuation;
			// Activision GTAO paper, Section 4.3 "Bounding the sampling area")
			let distFacX = min( lenX * invRadius, 1.0 );
			let distFacSqX = distFacX * distFacX;
			if ( abs( viewDeltaX.z ) < gtao.thickness ) {
				cosHorizons.x = mix( max( cosHorizons.x, sHX ), cosHorizons.x, distFacSqX );
			}
			// y
			let sampleScreenPositionY = gtaoScreenFromClip( clipPosition - clipOffset );
			let sampleDepthY = gtaoSampleDepth( sampleScreenPositionY );
			let viewDeltaY = gtaoViewPosition( sampleScreenPositionY, sampleDepthY ) - viewPosition;
			let lenY = length( viewDeltaY );
			let sHY = dot( viewDir, viewDeltaY ) / max( lenY, 0.0001 );
			let distFacY = min( lenY * invRadius, 1.0 );
			let distFacSqY = distFacY * distFacY;
			if ( abs( viewDeltaY.z ) < gtao.thickness ) {
				cosHorizons.y = mix( max( cosHorizons.y, sHY ), cosHorizons.y, distFacSqY );
			}
		}
		// Cosine-weighted inner integral, closed-form (Activision GTAO paper, Eq. 7).
		// Per horizon h_i:    term_i = -cos( 2 h_i - gamma ) + cos( gamma ) + 2 h_i sin( gamma )
		// The 0.25 factor is 1/2 (integral normalization) x 1/2 (averaging the two horizons).
		// In this slice setup sliceTangent = cross( sliceBitangent, viewDir ) works out
		// opposite to sampleDir, so the +sampleDir samples (cosHorizons.x) live on the
		// -T side of the slice and -sampleDir samples (cosHorizons.y) on the +T side.
		// gamma is signed by +T (sliceTangent), so hPos must read from cosHorizons.y.
		let hPos = acos( clamp( cosHorizons.y, -1.0, 1.0 ) );
		let hNeg = - acos( clamp( cosHorizons.x, -1.0, 1.0 ) );
		let termPos = - cos( hPos * 2.0 - angleN ) + nCos + hPos * 2.0 * nSin;
		let termNeg = - cos( hNeg * 2.0 - angleN ) + nCos + hNeg * 2.0 * nSin;
		let a = ( termPos + termNeg ) * 0.25;
		// |projN| is the foreshortening weight from the per-slice normal projection.
		ao += projNLen * a;
	}
	ao = clamp( ao / f32( GTAO_DIRECTIONS ), 0.0, 1.0 );
	ao = pow( ao, gtao.scale );
	return vec4f( ao, 0.0, 0.0, 1.0 );
}
`}),this._currentSamples=e}render(){let e=this.uniforms.fields;if(this.useTemporalFiltering===!0){let t=this._frame++;e.temporalDirection.value=$a[t%6]/360,e.temporalOffset.value=eo[t%4]}else e.temporalDirection.value=0,e.temporalOffset.value=1;this.samples.value!==this._currentSamples&&this._build();let t=Ir.fields,n=t.jitter.value;this._jp.makeTranslation(n.x,n.y,0).multiply(t.proj.value),e.proj.value.copy(this._jp),e.invProj.value.copy(this._jp).invert(),this._pass.render({colorViews:[this.target.texture],clear:[1,1,1,1]})}};function no(e=5){let t=Math.floor(e)%2==0?Math.floor(e)+1:Math.floor(e),n=ro(t),r=n.length,i=new Uint8Array(r*4);for(let e=0;e<r;++e){let t=n[e],a=2*Math.PI*t/r,o=new N(Math.cos(a),Math.sin(a),0).normalize();i[e*4]=(o.x*.5+.5)*255,i[e*4+1]=(o.y*.5+.5)*255,i[e*4+2]=127,i[e*4+3]=255}return new H({label:`GTAO.noise`,width:t,height:t,format:`rgba8unorm`,data:i,sampler:`nearestRepeat`})}function ro(e){let t=Math.floor(e)%2==0?Math.floor(e)+1:Math.floor(e),n=t*t,r=Array(n).fill(0),i=Math.floor(t/2),a=t-1;for(let e=1;e<=n;){if(i===-1&&a===t?(a=t-2,i=0):(a===t&&(a=0),i<0&&(i=t-1)),r[i*t+a]!==0){a-=2,i++;continue}r[i*t+a]=e++,a++,i--}return r}Object.freeze({atmosphere:1,antiAliasing:1,sceneDetail:1}),Object.freeze({atmosphere:.5,antiAliasing:.5,sceneDetail:.5});var io=Object.freeze([0,.05,.1,.2,.5,1]);Object.freeze([`Off`,`5%`,`10%`,`20%`,`Half (50%)`,`Full (100%)`]);var ao=e=>Math.max(1,Math.min(6,Math.ceil(12*e)));Object.freeze({atmosphere:`atmosphereQuality`,antiAliasing:`aaQuality`,sceneDetail:`detailQuality`});function oo(e,t=0){let n=e=>{let n=e+t+2654435769|0;return n=Math.imul(n^n>>>16,569420461),n=Math.imul(n^n>>>15,1935289751),(n^n>>>15)>>>0},r=Array.from({length:e},(e,t)=>t).sort((e,t)=>n(e)-n(t)||e-t),i=new Uint32Array(e);for(let t=0;t<e;t++)i[r[t]]=t;return i}var so=[0,0,0,0],co=`
fn aaIn( uv: vec2f ) -> vec3f { return textureSampleLevel( aaSrc, smpLinearClamp, uv, 0.0 ).rgb; }
// display-like value for edge detection: exposed, Reinhard on the max channel, square root
fn aaP( c: vec3f ) -> vec3f {
	let e = max( c, vec3f( 0.0 ) ) * aaExposure[ 0 ] * frame.exposure;
	return sqrt( e / ( 1.0 + max( e.r, max( e.g, e.b ) ) ) );
}
fn aaLuma( uv: vec2f ) -> f32 { return dot( aaP( aaIn( uv ) ), vec3f( 0.3, 0.59, 0.11 ) ); }
`,lo=class{constructor({src:e,exposure:t}){this.src=e,this.exposure=t,this.edges=new U(1,1,{colors:[`rgba8unorm`],label:`smaaEdges`}),this.weights=new U(1,1,{colors:[`rgba8unorm`],label:`smaaWeights`}),this.area=null,this.search=null,this._passes=null,this._load()}get searchStepsPerDirection(){return ao(V.antiAliasingQuality.value)}async _load(){let e=async(e,t)=>{let n=await aa(new Uint8Array(await(await fetch(`./textures/smaa/`+e)).arrayBuffer()),`image/png`);return new H({label:t,width:n.width,height:n.height,format:`rgba8unorm`,data:n.data})};try{[this.area,this.search]=await Promise.all([e(`area.png`,`smaaArea`),e(`search.png`,`smaaSearch`)])}catch(e){console.warn(`SMAA textures failed to load`,e)}}_build(){let e={aaSrc:{texture:this.src},aaExposure:{storage:this.exposure,access:`read`}},t=new W({label:`AA none`,colorFormats:[`rgba16float`],bindings:{aaSrc:{texture:this.src}},code:`fn fragment( in: FSIn ) -> vec4f { return textureSampleLevel( aaSrc, smpLinearClamp, in.uv, 0.0 ); }`}),n=new W({label:`FXAA`,colorFormats:[`rgba16float`],bindings:e,code:co+`
fn fragment( in: FSIn ) -> vec4f {
	var FXAA_STEPS = array<f32, 6>( 1.0, 1.5, 2.0, 2.0, 2.0, 4.0 );
	let searchSteps = clamp( i32( ceil( 12.0 * frame.antiAliasingQuality ) ), 1, 6 );
	let uv = in.uv;
	let ts = 1.0 / vec2f( textureDimensions( aaSrc ) );
	let m = aaLuma( uv );
	let n = aaLuma( uv + ts * vec2f( 0.0, -1.0 ) ); let e = aaLuma( uv + ts * vec2f( 1.0, 0.0 ) );
	let s = aaLuma( uv + ts * vec2f( 0.0, 1.0 ) ); let w = aaLuma( uv + ts * vec2f( -1.0, 0.0 ) );
	let ne = aaLuma( uv + ts * vec2f( 1.0, -1.0 ) ); let nw = aaLuma( uv + ts * vec2f( -1.0, -1.0 ) );
	let se = aaLuma( uv + ts * vec2f( 1.0, 1.0 ) ); let sw = aaLuma( uv + ts * vec2f( -1.0, 1.0 ) );
	let highest = max( max( max( s, e ), max( n, w ) ), m );
	let lowest = min( min( min( s, e ), min( n, w ) ), m );
	let contrast = highest - lowest;
	if ( contrast < max( 0.0312, 0.063 * highest ) ) { return vec4f( aaIn( uv ), 1.0 ); }

	// sub-pixel blend
	var f = ( 2.0 * ( s + e + n + w ) + ( se + sw + ne + nw ) ) / 12.0;
	f = clamp( abs( f - m ) / max( contrast, 1e-6 ), 0.0, 1.0 );
	let bf = smoothstep( 0.0, 1.0, f );
	let pixelBlend = bf * bf;

	// edge orientation and the side the edge lies on
	let horizontal = abs( s + n - 2.0 * m ) * 2.0 + abs( se + ne - 2.0 * e ) + abs( sw + nw - 2.0 * w );
	let vertical = abs( e + w - 2.0 * m ) * 2.0 + abs( se + sw - 2.0 * s ) + abs( ne + nw - 2.0 * n );
	let isH = horizontal >= vertical;
	let pL = select( e, s, isH ); let nL = select( w, n, isH );
	let pG = abs( pL - m ); let nG = abs( nL - m );
	var pixelStep = select( ts.x, ts.y, isH );
	var oppL = pL; var grad = pG;
	if ( pG < nG ) { pixelStep = - pixelStep; oppL = nL; grad = nG; }

	// walk along the edge both ways to its ends
	var uvEdge = uv;
	var edgeStep = vec2f( 0.0, ts.y );
	if ( isH ) { uvEdge.y += pixelStep * 0.5; edgeStep = vec2f( ts.x, 0.0 ); } else { uvEdge.x += pixelStep * 0.5; }
	let edgeL = ( m + oppL ) * 0.5;
	let gt = grad * 0.25;
	var puv = uvEdge + edgeStep * FXAA_STEPS[ 0 ];
	var pD = aaLuma( puv ) - edgeL;
	var pEnd = abs( pD ) >= gt;
	for ( var i = 1; i < searchSteps && ! pEnd; i++ ) { puv += edgeStep * FXAA_STEPS[ i ]; pD = aaLuma( puv ) - edgeL; pEnd = abs( pD ) >= gt; }
	if ( ! pEnd ) { puv += edgeStep * 8.0; }
	var nuv = uvEdge - edgeStep * FXAA_STEPS[ 0 ];
	var nD = aaLuma( nuv ) - edgeL;
	var nEnd = abs( nD ) >= gt;
	for ( var i = 1; i < searchSteps && ! nEnd; i++ ) { nuv -= edgeStep * FXAA_STEPS[ i ]; nD = aaLuma( nuv ) - edgeL; nEnd = abs( nD ) >= gt; }
	if ( ! nEnd ) { nuv -= edgeStep * 8.0; }
	let pDist = select( puv.y - uv.y, puv.x - uv.x, isH );
	let nDist = select( uv.y - nuv.y, uv.x - nuv.x, isH );
	let shortest = min( pDist, nDist );
	let deltaSign = select( nD >= 0.0, pD >= 0.0, pDist <= nDist );
	let edgeBlend = select( 0.5 - shortest / ( pDist + nDist ), 0.0, deltaSign == ( m - edgeL >= 0.0 ) );

	let fb = max( pixelBlend, edgeBlend );
	var fuv = uv;
	if ( isH ) { fuv.y += pixelStep * fb; } else { fuv.x += pixelStep * fb; }
	return vec4f( aaIn( fuv ), 1.0 );
}
`});this._passes={none:t,fxaa:n}}_buildSMAA(){let e=new W({label:`SMAA edges`,colorFormats:[`rgba8unorm`],bindings:{aaSrc:{texture:this.src},aaExposure:{storage:this.exposure,access:`read`}},code:co+`
fn smaaDelta( a: vec3f, b: vec3f ) -> f32 { let t = abs( a - b ); return max( t.r, max( t.g, t.b ) ); }
fn fragment( in: FSIn ) -> vec4f {
	let uv = in.uv;
	let px = 1.0 / vec2f( textureDimensions( aaSrc ) );
	let C = aaP( aaIn( uv ) );
	var delta = vec4f( smaaDelta( C, aaP( aaIn( uv + vec2f( - px.x, 0.0 ) ) ) ), smaaDelta( C, aaP( aaIn( uv + vec2f( 0.0, - px.y ) ) ) ), 0.0, 0.0 );
	var edges = step( vec2f( 0.1 ), delta.xy );
	if ( dot( edges, vec2f( 1.0 ) ) == 0.0 ) { return vec4f( 0.0 ); }
	delta.z = smaaDelta( C, aaP( aaIn( uv + vec2f( px.x, 0.0 ) ) ) );
	delta.w = smaaDelta( C, aaP( aaIn( uv + vec2f( 0.0, px.y ) ) ) );
	var maxDelta = max( max( delta.x, delta.y ), max( delta.z, delta.w ) );
	let dLL = smaaDelta( C, aaP( aaIn( uv + vec2f( - 2.0 * px.x, 0.0 ) ) ) );
	let dTT = smaaDelta( C, aaP( aaIn( uv + vec2f( 0.0, - 2.0 * px.y ) ) ) );
	maxDelta = max( maxDelta, max( dLL, dTT ) );
	// local contrast adaptation
	edges *= step( vec2f( 0.5 * maxDelta ), delta.xy );
	return vec4f( edges, 0.0, 0.0 );
}
`}),t=new W({label:`SMAA weights`,colorFormats:[`rgba8unorm`],bindings:{aaEdges:{texture:()=>this.edges.texture},aaArea:{texture:()=>this.area},aaSearch:{texture:()=>this.search}},code:`
const SMAA_STEPS: i32 = 8;
fn smaaE( uv: vec2f ) -> vec2f { return textureSampleLevel( aaEdges, smpLinearClamp, uv, 0.0 ).rg; }
fn smaaSearchLength( e: vec2f, bias: f32, scale: f32 ) -> f32 {
	return 255.0 * textureSampleLevel( aaSearch, smpNearestClamp, vec2f( bias + e.x * scale, e.y ), 0.0 ).r;
}
fn smaaArea( dist: vec2f, e1: f32, e2: f32, offset: f32 ) -> vec2f {
	let ps = vec2f( 1.0 / 160.0, 1.0 / 560.0 );
	var tc = ps * ( 16.0 * round( 4.0 * vec2f( e1, e2 ) ) + dist ) + 0.5 * ps;
	tc.y += offset / 7.0;
	return textureSampleLevel( aaArea, smpLinearClamp, tc, 0.0 ).rg;
}
fn smaaXLeft( tc: vec2f, end: f32, inv: vec2f ) -> f32 {
	var e = vec2f( 0.0, 1.0 ); var c = tc;
	for ( var i = 0; i < SMAA_STEPS; i++ ) {
		e = smaaE( c ); c.x -= 2.0 * inv.x;
		if ( c.x <= end || e.y <= 0.8281 || e.x != 0.0 ) { break; }
	}
	c.x += 0.25 * inv.x + inv.x + 2.0 * inv.x;
	return c.x - inv.x * smaaSearchLength( e, 0.0, 0.5 );
}
fn smaaXRight( tc: vec2f, end: f32, inv: vec2f ) -> f32 {
	var e = vec2f( 0.0, 1.0 ); var c = tc;
	for ( var i = 0; i < SMAA_STEPS; i++ ) {
		e = smaaE( c ); c.x += 2.0 * inv.x;
		if ( c.x >= end || e.y <= 0.8281 || e.x != 0.0 ) { break; }
	}
	c.x -= 0.25 * inv.x + inv.x + 2.0 * inv.x;
	return c.x + inv.x * smaaSearchLength( e, 0.5, 0.5 );
}
fn smaaYUp( tc: vec2f, end: f32, inv: vec2f ) -> f32 {
	var e = vec2f( 1.0, 0.0 ); var c = tc;
	for ( var i = 0; i < SMAA_STEPS; i++ ) {
		e = smaaE( c ); c.y -= 2.0 * inv.y;
		if ( c.y <= end || e.x <= 0.8281 || e.y != 0.0 ) { break; }
	}
	c.y += 0.25 * inv.y + inv.y + 2.0 * inv.y;
	return c.y - inv.y * smaaSearchLength( e.yx, 0.0, 0.5 );
}
fn smaaYDown( tc: vec2f, end: f32, inv: vec2f ) -> f32 {
	var e = vec2f( 1.0, 0.0 ); var c = tc;
	for ( var i = 0; i < SMAA_STEPS; i++ ) {
		e = smaaE( c ); c.y += 2.0 * inv.y;
		if ( c.y >= end || e.x <= 0.8281 || e.y != 0.0 ) { break; }
	}
	c.y -= 0.25 * inv.y + inv.y + 2.0 * inv.y;
	return c.y + inv.y * smaaSearchLength( e.yx, 0.5, 0.5 );
}
fn fragment( in: FSIn ) -> vec4f {
	let uv = in.uv;
	let inv = 1.0 / vec2f( textureDimensions( aaEdges ) );
	let pix = uv / inv;
	let o0 = vec4f( uv, uv ) + vec4f( inv, inv ) * vec4f( -0.25, -0.125, 1.25, -0.125 );
	let o1 = vec4f( uv, uv ) + vec4f( inv, inv ) * vec4f( -0.125, -0.25, -0.125, 1.25 );
	let o2 = vec4f( o0.xz, o1.yw ) + vec4f( -2.0, 2.0, -2.0, 2.0 ) * vec4f( inv.xx, inv.yy ) * f32( SMAA_STEPS );
	var w = vec4f( 0.0 );
	let e = smaaE( uv );
	if ( e.y > 0.0 ) {
		// edge at north: distances to its ends left and right, and the crossing edges there
		let xl = smaaXLeft( o0.xy, o2.x, inv );
		let e1 = textureSampleLevel( aaEdges, smpLinearClamp, vec2f( xl, o1.y ), 0.0 ).r;
		let xr = smaaXRight( o0.zw, o2.y, inv );
		let d = vec2f( xl, xr ) / inv.x - pix.x;
		let e2 = textureSampleLevel( aaEdges, smpLinearClamp, vec2f( xr + inv.x, o1.y ), 0.0 ).r;
		let a = smaaArea( sqrt( abs( d ) ), e1, e2, 0.0 );
		w = vec4f( a, w.zw );
	}
	if ( e.x > 0.0 ) {
		// edge at west: up and down
		let yu = smaaYUp( o1.xy, o2.z, inv );
		let e1 = textureSampleLevel( aaEdges, smpLinearClamp, vec2f( o0.x, yu ), 0.0 ).g;
		let yd = smaaYDown( o1.zw, o2.w, inv );
		let d = vec2f( yu, yd ) / inv.y - pix.y;
		let e2 = textureSampleLevel( aaEdges, smpLinearClamp, vec2f( o0.x, yd + inv.y ), 0.0 ).g;
		let a = smaaArea( sqrt( abs( d ) ), e1, e2, 0.0 );
		w = vec4f( w.xy, a );
	}
	return w;
}
`}),n=new W({label:`SMAA blend`,colorFormats:[`rgba16float`],bindings:{aaSrc:{texture:this.src},aaWeights:{texture:()=>this.weights.texture}},code:`
fn fragment( in: FSIn ) -> vec4f {
	let uv = in.uv;
	let inv = 1.0 / vec2f( textureDimensions( aaWeights ) );
	let w0 = textureSampleLevel( aaWeights, smpLinearClamp, uv, 0.0 );
	let a = vec4f( w0.x, textureSampleLevel( aaWeights, smpLinearClamp, uv + vec2f( 0.0, inv.y ), 0.0 ).y,
		w0.z, textureSampleLevel( aaWeights, smpLinearClamp, uv + vec2f( inv.x, 0.0 ), 0.0 ).w );
	let C = textureSampleLevel( aaSrc, smpLinearClamp, uv, 0.0 );
	if ( dot( a, vec4f( 1.0 ) ) < 1e-5 ) { return C; }
	// the line with the largest weight through each direction; the stronger direction wins
	var off = vec2f( select( - a.z, a.w, a.w > a.z ), select( - a.x, a.y, a.y > a.x ) );
	if ( abs( off.x ) > abs( off.y ) ) { off.y = 0.0; } else { off.x = 0.0; }
	let Cop = textureSampleLevel( aaSrc, smpLinearClamp, uv + sign( off ) * inv, 0.0 );
	return mix( C, Cop, max( abs( off.x ), abs( off.y ) ) );
}
`});Object.assign(this._passes,{edges:e,weights:t,blend:n}),this._smaa=!0}render(e,t){this._passes||this._build();let n=this._passes;if(e===`smaa`&&this.area&&this.search){this._smaa||this._buildSMAA();let e=typeof this.src==`function`?this.src():this.src;this.edges.setSize(e.width,e.height),this.weights.setSize(e.width,e.height),n.edges.render({colorViews:[this.edges.texture],clear:so}),n.weights.render({colorViews:[this.weights.texture],clear:so}),n.blend.render({colorViews:[t],clear:so})}else e===`fxaa`||e===`smaa`?n.fxaa.render({colorViews:[t],clear:so}):n.none.render({colorViews:[t],clear:so})}};function uo({enabled:e,debugView:t,inputWidth:n,inputHeight:r,outputWidth:i,outputHeight:a,jitterX:o,jitterY:s}){return e&&t===0&&n===i&&r===a&&n>0&&r>0&&Math.abs(o)<.49&&Math.abs(s)<.49}function fo(e){let t=/fn taauDepthAt\( p: vec2i \) -> f32 \{[\s\S]*?\n\}/,n=`		let rgb = min( max( taauLoadBeauty( tap ).rgb, vec3f( 0.0 ) ) * exposure, vec3f( 65504.0 ) );
		samples[ i ] = taauToYCoCg( rgb );
		lumas[ i ] = taauLockLuma( rgb );`;if(!t.test(e)||!e.includes(n)||!e.includes(`@fragment fn fs( in: FSIn ) -> TaauOut`))throw Error(`The temporal resolve changed: review the tiled adaptation before enabling it`);return`
struct FSIn { pos: vec4f, uv: vec2f };
var<workgroup> taauTilePrepared: array<vec4f, 100>;
var<workgroup> taauTileDepth: array<f32, 100>;
var<private> taauTileOrigin: vec2i;
fn taauTileIndex(p:vec2i)->u32 {
	let q=p-taauTileOrigin;
	return u32(q.y*10+q.x);
}
${e.replace(t,`fn taauDepthAt( p: vec2i ) -> f32 { return taauTileDepth[ taauTileIndex( p ) ]; }`).replace(n,`		let prepared = taauTilePrepared[ taauTileIndex( tap ) ];
		samples[ i ] = prepared.xyz;
		lumas[ i ] = prepared.w;`).replace(`@fragment fn fs( in: FSIn ) -> TaauOut`,`fn taauResolvePixel( in: FSIn ) -> TaauOut`).replace(/@location\(\s*\d+\s*\)\s*/g,``)}
@compute @workgroup_size(8, 8, 1)
fn main(@builtin(global_invocation_id) gid:vec3u, @builtin(local_invocation_index) index:u32, @builtin(workgroup_id) group:vec3u) {
	let size=vec2i(textureDimensions(taauBeauty));
	taauTileOrigin=vec2i(group.xy)*8-vec2i(1);
	let exposure=taauExposure[0]*frame.exposure;
	for(var i=index;i<100u;i+=64u) {
		let p=clamp(taauTileOrigin+vec2i(i32(i%10u),i32(i/10u)),vec2i(0),size-1);
		let rgb=min(max(textureLoad(taauBeauty,p,0).rgb,vec3f(0.0))*exposure,vec3f(65504.0));
		taauTilePrepared[i]=vec4f(taauToYCoCg(rgb),taauLockLuma(rgb));
		taauTileDepth[i]=1.0-textureLoad(taauDepth,p,0);
	}
	workgroupBarrier();
	if(any(gid.xy>=vec2u(size))) { return; }
	let pixel=vec2f(gid.xy)+vec2f(0.5);
	let value=taauResolvePixel(FSIn(vec4f(pixel,0.0,1.0),pixel/vec2f(size)));
	textureStore(taauOutColor,vec2i(gid.xy),value.color);
	textureStore(taauOutLock,vec2i(gid.xy),value.lock);
	textureStore(taauOutLuma,vec2i(gid.xy),value.lumaHistory);
}`}var po=[0,0,0,0];function mo(e,t){let n=1,r=0;for(;e>0;)n/=t,r+=e%t*n,e=Math.floor(e/t);return r}var ho=class{static DEBUG_VIEWS=[`Off`,`Locks (green: holding, blue: new)`,`Luma instability (red)`,`Clamped (red) / kept (green)`,`New frame weight`,`Motion (px / frame)`,`Resampling blur (blue)`,`Still pixels kept (yellow)`];constructor(e,t,n,r,i=null,a=null){this.beauty=e,this.depthTexture=t,this.velocityTexture=n,this.waterMaskTexture=i,this.camera=r,this.renderOptimizations=Cn(),this.optimizationStats={tiledFrames:0,fragmentFrames:0,depthRotations:0,depthCopies:0},this._depthReady=!1,this.exposure=a||new li({label:`taauExposure`,count:1,type:`f32`,data:new Float32Array([1])}),this.uniforms=new L(`TAAUParams`,{prevInvViewProj:[`mat4x4f`,new F],jitterOffset:[`vec2f`,new j],cameraNearFar:[`vec2f`,new j(.1,1e3)],depthThreshold:[`f32`,5e-4],edgeDepthDiff:[`f32`,.001],hasWaterMask:[`f32`,+!!i],jitterPhases:[`f32`,8],reset:[`f32`,1],debugView:[`f32`,0],boxStill:[`f32`,3],boxMotion:[`f32`,1],maxAccumulation:[`f32`,2],motionAccumulation:[`f32`,10],blurComp:[`f32`,.5],locks:[`f32`,1],instability:[`f32`,1],lockThreshold:[`f32`,1.05],staticKeep:[`f32`,1]},{label:`taau`}),this.settings=this.uniforms.fields,this.jitterPhaseOverride=4,this.jitterScale=.5,this.jitterMoving=.35,this._camMotion=0,this._camPrev=null,this.debugView=0;let o=this.uniforms.fields;this._jitterOffset=o.jitterOffset,this._jitterIndex=0,this._outW=1;let s=()=>({colors:[{format:`rgba16float`,name:`color`},{format:`rgba16float`,name:`lock`},{format:`rgba8unorm`,name:`lumaHistory`}],label:`taauHistory`,usage:this.renderOptimizations.tiledTAA?[`sample`,`render`,`copySrc`,`copyDst`,`storage`]:[`sample`,`render`,`copySrc`,`copyDst`]});this.history=[new U(1,1,s()),new U(1,1,s())],this._cur=0,this._prevDepth=new H({label:`taauPrevDepth`,width:1,height:1,format:`depth32float`,usage:this.renderOptimizations.depthRotation?[`sample`,`render`,`copySrc`,`copyDst`]:[`sample`,`copyDst`]}),this._hasPrevInvVP=!1,this._needsRestart=!0,this._build()}get texture(){return this.history[this._cur].textures[0]}get output(){return this.debugView>0&&this._debugTarget?this._debugTarget.texture:this.texture}getTextureNode(){return this.texture}setSize(e,t){let n=this.history[0].setSize(e,t);this.history[1].setSize(e,t),this._outW=e,n&&(this._needsRestart=!0)}restart(){this._needsRestart=!0,this._hasPrevInvVP=!1}_beautyTexture(){return typeof this.beauty==`function`?this.beauty():this.beauty}jitter(){let e=this._beautyTexture(),t=e&&e.width?this._outW/e.width:1,n=this.jitterPhaseOverride||Math.max(1,Math.ceil(8*t*t));this.uniforms.fields.jitterPhases.value=n;let r=this._jitterIndex%n,i=this.jitterScale*(1+(this.jitterMoving-1)*this._cameraMotion());this.jitterNow=i;let a=(mo(r+1,2)-.5)*i,o=(mo(r+1,3)-.5)*i;return this._jitterOffset.value.set(a,o),[a,o]}_cameraMotion(){let e=this.camera&&this.camera.matrixWorld;if(!e)return 0;let t=e.elements,n=[t[12],t[13],t[14],t[8],t[9],t[10]],r=0;if(this._camPrev){let e=this._camPrev,t=Math.hypot(n[0]-e[0],n[1]-e[1],n[2]-e[2]),i=Math.hypot(n[3]-e[3],n[4]-e[4],n[5]-e[5]);r=Math.min(1,Math.max((t-.002)/.008,(i-5e-4)/.0015)),r=Math.max(0,r)}return this._camPrev=n,this._camMotion=r>this._camMotion?r:this._camMotion+(r-this._camMotion)*.15,this._camMotion}clearViewOffset(){this._jitterIndex=(this._jitterIndex+1)%1024}_build(){let e=()=>this._beautyTexture(),t=t=>({taau:{uniform:this.uniforms},taauBeauty:{texture:e},taauDepth:{texture:()=>this.depthTexture},taauPrevDepth:{texture:()=>this._prevDepth},taauVelocity:{texture:()=>this.velocityTexture},taauMask:{texture:()=>this.waterMaskTexture||this.velocityTexture},taauHistory:{texture:()=>this.history[t].textures[0]},taauLock:{texture:()=>this.history[t].textures[1]},taauLumaHistory:{texture:()=>this.history[t].textures[2]},taauExposure:{storage:this.exposure,access:`read`}}),n=`
const TAAU_EPS = 1e-3;
const TAAU_LANCZOS_WEIGHT_SCALE = 1.0 / 12.0;
const TAAU_AVG_LANCZOS_WEIGHT_PER_FRAME = 0.74 / 12.0;

fn taauToYCoCg( c: vec3f ) -> vec3f {
	return vec3f( dot( c, vec3f( 0.25, 0.5, 0.25 ) ), dot( c, vec3f( 0.5, 0.0, -0.5 ) ), dot( c, vec3f( -0.25, 0.5, -0.25 ) ) );
}
fn taauFromYCoCg( c: vec3f ) -> vec3f { return vec3f( c.x + c.y - c.z, c.x + c.z, c.x - c.y - c.z ); }
// FSR2 Tonemap / InverseTonemap (max channel Reinhard)
fn taauTonemap( c: vec3f ) -> vec3f { return c / ( max( max( 0.0, c.r ), max( c.g, c.b ) ) + 1.0 ); }
fn taauTonemapInverse( c: vec3f ) -> vec3f { return c / max( 1e-4, 1.0 - max( c.r, max( c.g, c.b ) ) ); }
fn taauMinDivMax( a: f32, b: f32 ) -> f32 { let m = max( a, b ); return select( 0.0, min( a, b ) / m, m != 0.0 ); }
// Lanczos-2 of the squared distance (FSR2 Lanczos2ApproxSq)
fn taauLanczos2Sq( x2In: f32 ) -> f32 {
	let x2 = min( x2In, 4.0 );
	let a = 0.4 * x2 - 1.0;
	let b = 0.25 * x2 - 1.0;
	return ( 1.5625 * a * a - 0.5625 ) * ( b * b );
}
// luma for the lock logic (FSR2 ComputeLockInputLuma: perceived lightness of the tone mapped colour, ^1/6)
fn taauLockLuma( rgb: vec3f ) -> f32 {
	let l = luminance( taauTonemap( rgb ) );
	let p = select( pow( l, 1.0 / 3.0 ) * 116.0 - 16.0, l * ( 24389.0 / 27.0 ), l <= 216.0 / 24389.0 ) * 0.01;
	return pow( max( p, 0.0 ), 1.0 / 6.0 );
}

// Catmull-Rom history lookup with 5 bilinear taps (the 4 corner taps are dropped)
fn taauSampleHistory( uvIn: vec2f ) -> vec4f {
	let size = vec2f( textureDimensions( taauHistory ) );
	let samplePos = uvIn * size;
	let texPos1 = floor( samplePos - 0.5 ) + 0.5;
	let f = samplePos - texPos1;
	let w0 = f * ( f * ( f * -0.5 + 1.0 ) - 0.5 );
	let w1 = f * f * ( f * 1.5 - 2.5 ) + 1.0;
	let w2 = f * ( f * ( f * -1.5 + 2.0 ) + 0.5 );
	let w3 = f * f * ( f * 0.5 - 0.5 );
	let w12 = w1 + w2;
	let tp0 = ( texPos1 - 1.0 ) / size;
	let tp3 = ( texPos1 + 2.0 ) / size;
	let tp12 = ( texPos1 + w2 / w12 ) / size;
	let wa = w12.x * w0.y; let wb = w0.x * w12.y; let wc = w12.x * w12.y; let wd = w3.x * w12.y; let we = w12.x * w3.y;
	let sum = textureSampleLevel( taauHistory, smpLinearClamp, vec2f( tp12.x, tp0.y ), 0.0 ) * wa
		+ textureSampleLevel( taauHistory, smpLinearClamp, vec2f( tp0.x, tp12.y ), 0.0 ) * wb
		+ textureSampleLevel( taauHistory, smpLinearClamp, vec2f( tp12.x, tp12.y ), 0.0 ) * wc
		+ textureSampleLevel( taauHistory, smpLinearClamp, vec2f( tp3.x, tp12.y ), 0.0 ) * wd
		+ textureSampleLevel( taauHistory, smpLinearClamp, vec2f( tp12.x, tp3.y ), 0.0 ) * we;
	return max( sum / ( wa + wb + wc + wd + we ), vec4f( 0.0 ) );
}

fn taauLoadBeauty( p: vec2i ) -> vec4f {
	let s = vec2i( textureDimensions( taauBeauty ) );
	return textureLoad( taauBeauty, clamp( p, vec2i( 0 ), s - 1 ), 0 );
}

// standard (0 near .. 1 far) perspective depth of the reversed-Z buffer at p (clamped)
fn taauDepthAt( p: vec2i ) -> f32 {
	let s = vec2i( textureDimensions( taauDepth ) );
	return 1.0 - textureLoad( taauDepth, clamp( p, vec2i( 0 ), s - 1 ), 0 );
}

// last frame's depth at uv, reprojected into this frame's camera (standard perspective depth)
fn taauPreviousDepth( uv: vec2f ) -> f32 {
	let s = vec2i( textureDimensions( taauPrevDepth ) );
	let d = textureLoad( taauPrevDepth, clamp( vec2i( uv * vec2f( s ) ), vec2i( 0 ), s - 1 ), 0 );
	let pw = taau.prevInvViewProj * vec4f( uv.x * 2.0 - 1.0, 1.0 - uv.y * 2.0, d, 1.0 );
	let world = pw.xyz / pw.w;
	let viewZ = ( frame.view * vec4f( world, 1.0 ) ).z;
	let near = taau.cameraNearFar.x; let far = taau.cameraNearFar.y;
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}

fn taauInside( uv: vec2f ) -> bool { return all( uv >= vec2f( 0.0 ) ) && all( uv <= vec2f( 1.0 ) ); }

struct TaauOut { @location( 0 ) color: vec4f, @location( 1 ) lock: vec4f, @location( 2 ) lumaHistory: vec4f, DEBUG_FIELD };
@fragment fn fs( in: FSIn ) -> TaauOut {
	let uv = in.uv;
	let inSize = vec2f( textureDimensions( taauBeauty ) );
	let outSize = vec2f( textureDimensions( taauHistory ) );
	let downscale = inSize / outSize; // FSR2 DownscaleFactor (render / display)
	let exposure = taauExposure[ 0 ] * frame.exposure;

	// output pixel centre in input pixels; the input tap whose jittered sample is closest
	let pIn = uv * inSize;
	let closestTap = vec2i( round( pIn - ( vec2f( 0.5 ) + taau.jitterOffset ) ) );

	// ---- reprojection (three's TAAUNode): velocity of the nearest depth in the 3x3, disocclusion
	var closestDepth = 2.0;
	var closestPositionTexel = vec2i( 0 );
	var farthestDepth = -1.0;
	for ( var y = -1; y <= 1; y++ ) {
		for ( var x = -1; x <= 1; x++ ) {
			let neighbor = closestTap + vec2i( x, y );
			let depth = taauDepthAt( neighbor );
			if ( depth < closestDepth ) {
				closestDepth = depth;
				closestPositionTexel = neighbor;
			}
			farthestDepth = max( farthestDepth, depth );
		}
	}
	let vs = vec2i( textureDimensions( taauVelocity ) );
	let velocity = textureLoad( taauVelocity, clamp( closestPositionTexel, vec2i( 0 ), vs - 1 ), 0 ).xy;
	let historyUV = uv - velocity;
	let hrVelocity = length( velocity * outSize ); // output pixels per frame
	let isEdge = farthestDepth - closestDepth > taau.edgeDepthDiff;
	let isDisocclusion = closestDepth - taauPreviousDepth( historyUV ) > taau.depthThreshold;
	// the water surface keeps its history (its depth changes with the waves, not with occlusion)
	let ms = vec2i( textureDimensions( taauMask ) );
	let isWater = taau.hasWaterMask > 0.5 && textureLoad( taauMask, clamp( closestTap, vec2i( 0 ), ms - 1 ), 0 ).g > 0.5;
	let isExistingSample = taauInside( historyUV );
	let depthClip = select( 0.0, 1.0, isDisocclusion && ! isEdge && ! isWater );
	let isNewSample = ! isExistingSample || taau.reset > 0.5;

	// ---- history (FSR2 ReprojectHistoryColor / ReprojectHistoryLockStatus)
	var historyColor = vec3f( 0.0 );
	var lockStatus = vec2f( 0.0 );
	var temporalReactive = 0.0;
	var inMotionLastFrame = false;
	var blurPrev = 0.0;
	if ( ! isNewSample ) {
		historyColor = taauToYCoCg( min( taauSampleHistory( historyUV ).rgb * exposure, vec3f( 65504.0 ) ) );
		let ls = textureSampleLevel( taauLock, smpLinearClamp, historyUV, 0.0 );
		lockStatus = ls.xy;
		temporalReactive = sat( abs( ls.z ) );
		inMotionLastFrame = ls.z < 0.0;
		blurPrev = ls.w;
	}

	// ---- the 3x3 input taps: prepared (exposed) YCoCg colour, lock luma
	var samples: array<vec3f, 9>;
	var lumas: array<f32, 9>;
	var lumaSum = 0.0;
	for ( var i = 0; i < 9; i++ ) {
		let tap = closestTap + vec2i( i % 3 - 1, i / 3 - 1 );
		let rgb = min( max( taauLoadBeauty( tap ).rgb, vec3f( 0.0 ) ) * exposure, vec3f( 65504.0 ) );
		samples[ i ] = taauToYCoCg( rgb );
		lumas[ i ] = taauLockLuma( rgb );
		lumaSum += lumas[ i ];
	}

	// ---- new lock: the centre tap is a thin feature (FSR2 ComputeThinFeatureConfidence)
	var newLock = false;
	{
		let nucleus = lumas[ 4 ];
		var mask = 1u << 4u;
		var dMin = 3.4e38;
		var dMax = 0.0;
		for ( var i = 0; i < 9; i++ ) {
			if ( i == 4 ) { continue; }
			let l = lumas[ i ];
			let diff = max( l, nucleus ) / min( l, nucleus );
			if ( diff > 0.0 && diff < taau.lockThreshold ) { mask |= 1u << u32( i ); } else { dMin = min( dMin, l ); dMax = max( dMax, l ); }
		}
		let isRidge = nucleus > dMax || nucleus < dMin;
		let q0 = ( 1u << 0u ) | ( 1u << 1u ) | ( 1u << 3u ) | ( 1u << 4u );
		let q1 = ( 1u << 1u ) | ( 1u << 2u ) | ( 1u << 4u ) | ( 1u << 5u );
		let q2 = ( 1u << 3u ) | ( 1u << 4u ) | ( 1u << 6u ) | ( 1u << 7u );
		let q3 = ( 1u << 4u ) | ( 1u << 5u ) | ( 1u << 7u ) | ( 1u << 8u );
		newLock = isRidge && ( mask & q0 ) != q0 && ( mask & q1 ) != q1 && ( mask & q2 ) != q2 && ( mask & q3 ) != q3;
	}

	// ---- lock status (FSR2 UpdateLockStatus). The shading change luma is the local mean lock luma
	// (FSR2 reads a coarse mip of the luma)
	var thisFrameReactive = temporalReactive;
	let shadingLuma = lumaSum / 9.0;
	if ( lockStatus.y == 0.0 ) { lockStatus.y = shadingLuma; }
	let luminanceDiff = 1.0 - taauMinDivMax( lockStatus.y, shadingLuma );
	if ( newLock ) {
		lockStatus.y = shadingLuma;
		lockStatus.x = select( 1.0, 2.0, lockStatus.x != 0.0 );
	} else if ( lockStatus.x <= 1.0 ) {
		lockStatus.y = mix( lockStatus.y, shadingLuma, 0.5 );
	} else if ( luminanceDiff > 0.1 ) {
		lockStatus.x = 0.0;
	}
	thisFrameReactive = max( thisFrameReactive, sat( ( luminanceDiff - 0.1 ) * 10.0 ) );
	lockStatus.x *= 1.0 - thisFrameReactive;
	lockStatus.x *= select( 0.0, 1.0, depthClip < 0.1 );
	let lockContribution = sat( sat( sat( lockStatus.x - 1.0 ) * 4.0 ) * sat( taauMinDivMax( lockStatus.y, shadingLuma ) ) ) * taau.locks;

	// ---- this frame at the output pixel: Lanczos-2 over the 3x3 taps, and the rectification box
	// (FSR2 ComputeUpsampledColorAndWeight)
	let kernelReactive = max( thisFrameReactive, select( 0.0, 1.0, isNewSample ) );
	let maxKernelWeight = min( 1.99, 1.0 + ( 1.0 / downscale.x - 1.0 ) );
	let kernelBiasMax = maxKernelWeight * ( 1.0 - kernelReactive );
	let kernelBiasMin = max( 1.0, ( 1.0 + kernelBiasMax ) * 0.3 );
	let kernelBias = mix( kernelBiasMax, kernelBiasMin, max( 0.25 * depthClip, kernelReactive ) );
	let rectCurveBias = mix( -2.0, -3.0, sat( hrVelocity / 50.0 ) );
	var colorSum = vec3f( 0.0 );
	var weightSum = 0.0;
	var boxCenter = vec3f( 0.0 );
	var boxVec = vec3f( 0.0 );
	var boxWeight = 0.0;
	var aabbMin = vec3f( 3.4e38 );
	var aabbMax = vec3f( -3.4e38 );
	let iSize = vec2i( inSize );
	for ( var i = 0; i < 9; i++ ) {
		let tap = closestTap + vec2i( i % 3 - 1, i / 3 - 1 );
		let offset = vec2f( tap ) + vec2f( 0.5 ) + taau.jitterOffset - pIn; // sample position - output position
		let onScreen = all( tap >= vec2i( 0 ) ) && all( tap < iSize );
		let ob = offset * kernelBias;
		let w = select( 0.0, taauLanczos2Sq( dot( ob, ob ) ), onScreen );
		let c = samples[ i ];
		colorSum += c * w;
		weightSum += w;
		let bw = exp( rectCurveBias * dot( offset, offset ) );
		boxCenter += c * bw;
		boxVec += c * c * bw;
		boxWeight += bw;
		aabbMin = min( aabbMin, c );
		aabbMax = max( aabbMax, c );
	}
	boxCenter /= boxWeight;
	boxVec = sqrt( abs( boxVec / boxWeight - boxCenter * boxCenter ) );
	var upsampledWeight = select( 0.0, weightSum, weightSum > TAAU_EPS );
	var upsampled = vec3f( 0.0 );
	if ( upsampledWeight > TAAU_EPS ) {
		// deringing: the Lanczos lobes can't leave the neighbourhood's range
		upsampled = clamp( colorSum / upsampledWeight, aabbMin, aabbMax );
		upsampledWeight *= TAAU_LANCZOS_WEIGHT_SCALE;
	}

	// ---- luma instability (FSR2 ComputeLumaInstabilityFactor): the local luma returning to an older
	// value instead of the last one
	var lumaInstability = 0.0;
	var lumaHist = vec4f( 0.0 );
	var staticKeep = 0.0;
	{
		var curLuma = boxCenter.x / ( 1.0 + max( 0.0, boxCenter.x ) );
		curLuma = round( curLuma * 255.0 ) / 255.0;
		let sampleHist = max( depthClip, luminanceDiff ) < 0.1 && ! isNewSample;
		if ( sampleHist ) { lumaHist = textureSampleLevel( taauLumaHistory, smpLinearClamp, historyUV, 0.0 ); }
		let d0 = curLuma - lumaHist.x;
		var dmin = abs( d0 );
		if ( dmin >= 1.0 / 255.0 ) {
			for ( var i = 1; i < 4; i++ ) {
				let d1 = curLuma - lumaHist[ i ];
				if ( sign( d0 ) == sign( d1 ) ) { dmin = min( dmin, abs( d1 ) ); }
			}
			let boxSizeFactor = pow( sat( boxVec.x / 0.1 ), 6.0 );
			lumaInstability = select( 0.0, 1.0, dmin != abs( d0 ) ) * boxSizeFactor;
			lumaInstability = select( 0.0, 1.0, lumaInstability > 1.0 / 255.0 );
		}
		lumaInstability *= select( 0.0, 1.0, lumaHist.w != 0.0 ) * taau.instability;
		// Still pixels (not in FSR2): with the camera and the surface still, a clamp can only be the
		// jitter's doing (a sub-pixel plank gap that the 3x3 misses in this frame's samples), unless the
		// lighting changed. A real change (a shadow moving in) leaves the local luma away from all of
		// the last 4 frames'; the jitter brings it back to one of them. Such pixels keep their history.
		let dAll = min( min( abs( curLuma - lumaHist.x ), abs( curLuma - lumaHist.y ) ), min( abs( curLuma - lumaHist.z ), abs( curLuma - lumaHist.w ) ) );
		staticKeep = taau.staticKeep * select( 0.0, 1.0, hrVelocity < 0.05 && lumaHist.w != 0.0 && ! isWater ) * sat( 1.0 - ( dAll - 0.01 ) / 0.03 );
		lumaHist = vec4f( curLuma, lumaHist.xyz );
	}

	// ---- accumulation weight (FSR2 ComputeBaseAccumulationWeight)
	var accumulation = taau.maxAccumulation * select( 0.0, 1.0, isExistingSample ) * ( 1.0 - thisFrameReactive ) * ( 1.0 - depthClip );
	accumulation = min( accumulation, mix( accumulation, upsampledWeight * taau.motionAccumulation, max( select( 0.0, 1.0, inMotionLastFrame ), sat( hrVelocity * 10.0 ) ) ) );
	accumulation = min( accumulation, mix( accumulation, upsampledWeight, sat( hrVelocity / 20.0 ) ) );

	// Resampling blur (not in FSR2): even the Catmull-Rom loses fine detail when it samples between
	// texels, and in motion the history is resampled that way every frame (at 0.2 px ~80% of the
	// finest detail survives a resample). The blur the history has gathered (the variance its
	// resamples added, f (1 - f) per axis, decayed by the blend) caps the accumulation, so a blurred
	// history takes a larger share of the sharp new frame; a still camera resamples at texel centres.
	let hf = fract( historyUV * outSize - 0.5 );
	let hv = hf * ( 1.0 - hf );
	let blurAcc = blurPrev + hv.x + hv.y;
	let blurAlpha = min( blurAcc * taau.blurComp, select( 1.0, 0.15, isWater ) );
	accumulation = min( accumulation, upsampledWeight * ( 1.0 - blurAlpha ) / max( blurAlpha, 1e-3 ) );

	var outColor: vec3f;
	var alphaOut = 1.0;
	var dbgClamp = vec2f( 0.0 );
	if ( isNewSample ) {
		outColor = taauFromYCoCg( upsampled );
	} else {
		// rectify (FSR2 RectifyHistory): clamp to the variance box, but keep locked and oscillating
		// pixels' history; a clamp drops the accumulated weight
		// FSR2 widens the box while still by the upscale factor (1 at native: a 1 sigma box that clamped
		// the sub-pixel plank gaps out of the history, frame after frame); at least 3 sigma here
		let scaleInfluence = max( taau.boxStill, min( 20.0, pow( 1.0 / abs( downscale.x * downscale.y ), 3.0 ) ) );
		let boxScaleT = max( depthClip, sat( hrVelocity / 20.0 ) );
		let boxScale = mix( scaleInfluence, taau.boxMotion, boxScaleT );
		let boxMin = max( aabbMin, boxCenter - boxVec * boxScale );
		let boxMax = min( aabbMax, boxCenter + boxVec * boxScale );
		if ( any( boxMin > historyColor ) || any( historyColor > boxMax ) ) {
			let clamped = clamp( historyColor, boxMin, boxMax );
			// (not on the water: its glints move on their own and would leave trails)
			let contribution = select( sat( max( max( lumaInstability, lockContribution ), staticKeep ) ), 0.0, isWater );
			dbgClamp = vec2f( length( clamped - historyColor ) / max( boxVec.x * 2.0, 0.02 ), contribution );
			historyColor = mix( clamped, historyColor, contribution );
			accumulation = mix( min( accumulation, 0.1 ), accumulation, contribution );
		}
		// accumulate (FSR2 Accumulate), blending tone mapped colours
		let acc = max( TAAU_EPS, accumulation + upsampledWeight );
		let alpha = upsampledWeight / acc;
		alphaOut = alpha;
		let up = taauToYCoCg( taauTonemap( taauFromYCoCg( upsampled ) ) );
		let hi = taauToYCoCg( taauTonemap( taauFromYCoCg( historyColor ) ) );
		outColor = taauTonemapInverse( taauFromYCoCg( mix( hi, up, alpha ) ) );
	}

	// ---- lock lifetime (FSR2 FinalizeLockStatus)
	if ( ! taauInside( uv + velocity ) ) {
		lockStatus.x = 0.0;
	} else {
		lockStatus.x = max( 0.0, lockStatus.x - upsampledWeight / ( taau.jitterPhases * TAAU_AVG_LANCZOS_WEIGHT_PER_FRAME ) );
	}

	// ---- temporal reactive factor for the next frame (FSR2 ComputeTemporalReactiveFactor)
	var newReactive = min( 0.99, thisFrameReactive );
	newReactive = max( newReactive, mix( newReactive, 0.4, sat( hrVelocity ) ) );
	newReactive = max( newReactive * newReactive, depthClip * 0.1 );
	newReactive = select( newReactive, 1.0, isNewSample );
	if ( sat( hrVelocity * 10.0 ) >= 1.0 ) { newReactive = -max( TAAU_EPS, newReactive ); }

	var out: TaauOut;
	out.color = vec4f( max( outColor, vec3f( 0.0 ) ) / exposure, 1.0 );
	out.lock = vec4f( lockStatus, newReactive, select( blurAcc * ( 1.0 - alphaOut ), 0.0, isNewSample ) );
	out.lumaHistory = lumaHist;
DEBUG_OUTPUT
	return out;
}
`,r=[`rgba16float`,`rgba16float`,`rgba8unorm`],i=n.replace(`, DEBUG_FIELD`,``).replace(`DEBUG_OUTPUT
`,``);if(this._resolve=[0,1].map(e=>new W({label:`TAAU`,bindings:t(e),colorFormats:r,code:i})),this.renderOptimizations.tiledTAA){let e=fo(i);this._tiledResolve=[0,1].map(n=>new Mi({label:`TAAU tiled`,modules:[z],workgroupSize:[8,8,1],bindings:{...t(n),taauOutColor:{storageTexture:()=>this.history[1-n].textures[0]},taauOutLock:{storageTexture:()=>this.history[1-n].textures[1]},taauOutLuma:{storageTexture:()=>this.history[1-n].textures[2]}},code:e}))}this._buildDebug=()=>{let e=n.replace(`DEBUG_FIELD`,`@location( 3 ) debug: vec4f`).replace(`DEBUG_OUTPUT`,`
	// grey image, the chosen quantity over it (colours are divided by the exposure: the final pass
	// multiplies them back)
	let gray = vec3f( luminance( taauTonemap( outColor * exposure ) ) * 0.35 );
	let view = u32( taau.debugView );
	var v = gray;
	if ( view == 1u ) { v = gray + vec3f( 0.0, lockContribution, select( 0.0, 1.0, newLock ) ); }
	else if ( view == 2u ) { v = gray + vec3f( lumaInstability, 0.0, 0.0 ); }
	else if ( view == 3u ) { v = gray + vec3f( sat( dbgClamp.x ) * ( 1.0 - dbgClamp.y ), sat( dbgClamp.x ) * dbgClamp.y, 0.0 ); }
	else if ( view == 7u ) { v = gray + vec3f( staticKeep * 0.8, staticKeep * 0.8, 0.0 ); }
	else if ( view == 4u ) { v = vec3f( sat( alphaOut * 3.0 ) ); }
	else if ( view == 5u ) { v = gray + vec3f( sat( hrVelocity / 4.0 ), sat( hrVelocity / 16.0 ), 0.0 ); }
	else if ( view == 6u ) { v = gray + vec3f( 0.0, 0.0, sat( blurAlpha * 2.0 ) ); }
	out.debug = vec4f( v / max( exposure, 1e-4 ), 1.0 );`),i=[...r,`rgba16float`];this._resolveDebug=[0,1].map(n=>new W({label:`TAAU debug`,bindings:t(n),colorFormats:i,code:e})),this._debugTarget=new U(1,1,{colors:[`rgba16float`],label:`taauDebug`})}}render(){let e=Ir.fields,t=this.uniforms.fields;t.cameraNearFar.value.set(e.near.value,e.far.value),this._hasPrevInvVP||t.prevInvViewProj.value.copy(e.invViewProj.value),this._hasPrevInvVP=!0;let n=this.depthTexture;(this._prevDepth.width!==n.width||this._prevDepth.height!==n.height)&&(this._prevDepth.resize(n.width,n.height),this._needsRestart=!0),t.reset.value=+!!this._needsRestart,this._needsRestart=!1;let r=1-this._cur;if(this.debugView>0){this._resolveDebug||this._buildDebug();let e=this.history[r];this._debugTarget.setSize(e.textures[0].width,e.textures[0].height),t.debugView.value=this.debugView,this._resolveDebug[this._cur].render({colorViews:[...e.textures,this._debugTarget.texture],clear:po})}else this._tiledResolve&&uo({enabled:this.renderOptimizations.tiledTAA,debugView:this.debugView,inputWidth:this._beautyTexture().width,inputHeight:this._beautyTexture().height,outputWidth:this.history[r].width,outputHeight:this.history[r].height,jitterX:this._jitterOffset.value.x,jitterY:this._jitterOffset.value.y})?(this._tiledResolve[this._cur].dispatch([Math.ceil(this.history[r].width/8),Math.ceil(this.history[r].height/8),1]),this.optimizationStats.tiledFrames++):(this._resolve[this._cur].render({colorViews:this.history[r].textures,clear:po}),this.optimizationStats.fragmentFrames++);this._cur=r;let i=this.depthTexture;this.renderOptimizations.depthRotation||(I.getEncoder().copyTextureToTexture({texture:i.getGPU()},{texture:this._prevDepth.getGPU()},{width:i.width,height:i.height}),this.optimizationStats.depthCopies++),this._depthReady=!0}endFrame(){this._nextPrev=this._nextPrev||new F,this._nextPrev.copy(Ir.fields.invViewProj.value)}advance(){if(this.renderOptimizations.depthRotation){let e=this.depthTexture,t=this._prevDepth;(t.width!==e.width||t.height!==e.height)&&(t.resize(e.width,e.height),this._needsRestart=!0,this._depthReady=!1),this._depthReady&&(Tn(e,t,this.renderOptimizations.bindingReuse),this.optimizationStats.depthRotations++),this._depthReady=!1}this._nextPrev&&this.uniforms.fields.prevInvViewProj.value.copy(this._nextPrev)}},go=class{constructor(){this.uniforms=new L(`LensParams`,{wet:[`f32`,0],age:[`f32`,100],seed:[`f32`,0],aspect:[`f32`,16/9]},{label:`lens`});let e=this.uniforms.fields;this.wet=e.wet,this.age=e.age,this.seed=e.seed,this.aspect=e.aspect,this.duration=9,this._wasUnder=!1,this.module=new R({name:`lens`,uniforms:this.uniforms,uniformName:`lensParams`,code:_o})}update(e,t){t?this.wet.value=0:(this._wasUnder&&(this.wet.value=1,this.age.value=0,this.seed.value=Math.random()*97),this.age.value+=e,this.wet.value=Math.max(0,this.wet.value-e/this.duration)),this._wasUnder=t}build(){return this.module}},_o=`
// integer hash (pcg2d) of the float bits: no transcendentals (18 cells x 2 hashes per pixel)
fn lensHash2( p: vec2f ) -> vec2f {
	var v = bitcast<vec2u>( p ) * 1664525u + 1013904223u;
	v.x += v.y * 1664525u; v.y += v.x * 1664525u;
	v = v ^ ( v >> vec2u( 16u ) );
	v.x += v.y * 1664525u; v.y += v.x * 1664525u;
	v = v ^ ( v >> vec2u( 16u ) );
	return vec2f( v >> vec2u( 8u ) ) / 16777216.0;
}

struct LensAcc { n2: vec2f, cover: f32, trail: f32 };

// one layer of droplets (clinging, or sliding: heavy drops that start sliding after a delay)
fn lensLayer( p: vec2f, cell: f32, rMin: f32, rMax: f32, density: f32, slide: bool, acc: ptr<function, LensAcc> ) {
	let wet = lensParams.wet; let age = lensParams.age; let seed = lensParams.seed;
	let c0 = floor( p / cell );
	for ( var j = -1; j <= 1; j++ ) {
		for ( var i = -1; i <= 1; i++ ) {
			let c = c0 + vec2f( f32( i ), f32( j ) );
			let h = lensHash2( c + seed );
			// no drop in this cell: it adds nothing (skip the outline math, most cells are empty)
			if ( h.x >= density ) { continue; }
			let h2 = lensHash2( c + seed + 17.3 );
			var center = ( c + ( vec2f( 0.2 ) + h2 * 0.6 ) ) * cell;
			// evaporation shrinks drops; big ones last longer
			let life = clamp( wet * 1.6 - h2.y * 0.6, 0.0, 1.0 );
			let r = mix( rMin, rMax, h.y * h.y ) * sqrt( life );
			if ( slide ) {
				// heavy drops start sliding after a delay and accelerate
				let t0 = h2.x * 3.0 + 0.4;
				let s = max( age - t0, 0.0 );
				let dy = s * s * ( r * 3.5 );
				center.y += dy;
				// wet streak above a sliding drop
				let dxT = abs( p.x - center.x );
				let above = center.y - p.y;
				let tr = smoothstep( r * 0.45, 0.0, dxT ) * smoothstep( 0.0, 0.01, above ) * smoothstep( dy + 0.01, 0.0, above );
				( *acc ).trail = max( ( *acc ).trail, tr * life );
			}
			// irregular outline: a few lobes, sliding drops stretched vertically
			let d = ( p - center ) * vec2f( 1.0, select( 1.0, 0.8, slide ) );
			// outside the largest outline (wobble <= 1.18): no coverage, skip the lobes
			let rB = max( r * 1.18, 1e-4 );
			if ( dot( d, d ) >= rB * rB ) { continue; }
			let ang = atan2( d.y, d.x );
			let wobble = 1.0 + sin( ang * 3.0 + h.x * 40.0 ) * 0.12 + sin( ang * 5.0 + h2.y * 30.0 ) * 0.06;
			let q = d / max( r * wobble, 1e-4 );
			let rq = dot( q, q );
			let a = smoothstep( 1.0, 0.7, rq );
			if ( a > ( *acc ).cover ) {
				( *acc ).n2 = q;
				( *acc ).cover = a;
			}
		}
	}
}

fn lensDroplets( uv: vec2f ) -> vec3f {
	var col = lensSharp( uv );
	let wet = lensParams.wet;
	if ( wet > 0.001 ) {
		let aspect = lensParams.aspect;
		let p = vec2f( uv.x * aspect, uv.y ); // y grows downward on screen

		// ---- droplets (two layers: clinging small drops, sliding large drops)
		var acc: LensAcc;
		acc.n2 = vec2f( 0.0 ); // droplet normal (xy) of the drop covering this pixel
		acc.cover = 0.0; // soft coverage (drops are out of focus)
		acc.trail = 0.0;
		lensLayer( p, 0.05, 0.003, 0.011, wet * 0.5, false, &acc );
		lensLayer( p, 0.13, 0.01, 0.026, wet * 0.22, true, &acc );

		if ( acc.cover > 0.001 ) {
			let n2 = acc.n2;
			let r2 = min( dot( n2, n2 ), 1.0 );
			let nz = sqrt( max( 1.0 - r2, 0.0 ) );
			// a drop is a strong fisheye lens: the image inside is inverted and blurred
			let off = n2 * -0.05 * ( 1.0 - nz * 0.5 );
			let inside = lensBlurred( uv + vec2f( off.x / aspect, off.y ) );
			let edge = smoothstep( 0.45, 1.0, r2 );
			let highlight = smoothstep( 0.3, 0.0, length( n2 - vec2f( -0.3, -0.4 ) ) ) * 0.35;
			let dropCol = inside * mix( 1.04, 0.7, edge ) + inside * highlight;
			col = mix( col, dropCol, acc.cover );
		}

		// wet trails: slight blur and darkening
		col = mix( col, lensBlurred( uv ) * 0.9, acc.trail * 0.6 );
	}
	return col;
}
`,vo=7,yo=.3,bo=[{a:.72,r:.018,tint:[1,.85,.6],k:.55},{a:.44,r:.045,tint:[.55,.9,1],k:.35},{a:.16,r:.022,tint:[.8,1,.7],k:.45},{a:-.18,r:.07,tint:[.6,.75,1],k:.22},{a:-.42,r:.03,tint:[1,.7,.9],k:.4},{a:-.75,r:.11,tint:[.7,1,.85],k:.14},{a:-1.15,r:.05,tint:[1,.8,.55],k:.28}],xo=24,K=e=>{let t=String(e);return t.includes(`.`)||t.includes(`e`)?t:t+`.0`},So=class{constructor({depthTexture:e,clouds:t=null,sunDir:n}){this.sunDir=n,this.uniforms=new L(`FlareParams`,{sunDir:[`vec3f`,new N(0,1,0)],strength:[`f32`,1],sunUV:[`vec2f`,new j(.5,.5)],inView:[`f32`,0],aboveWater:[`f32`,1],aspect:[`f32`,16/9],discPx:[`f32`,6],dt:[`f32`,1/60]},{label:`flare`});let r=this.uniforms.fields;this.strength=r.strength,this.sunUV=r.sunUV,this.inView=r.inView,this.aboveWater=r.aboveWater,this.aspect=r.aspect,this.discPx=r.discPx,this.dt=r.dt,this.visibility=new li({label:`flareVisibility`,count:1,type:`f32`,data:new Float32Array([0])}),this.depthTexture=e,this.clouds=t;let i=``;for(let e=0;e<xo;e++){let t=Math.sqrt((e+.5)/xo),n=e*2.39996323;i+=`\tsky += flareSkyTap( c + vec2f( ${K(Math.cos(n)*t)}, ${K(Math.sin(n)*t)} ) * flareParams.discPx, size );\n`}let a=!!(t&&t.module);this.kernel=new Mi({label:`Lens Flare Visibility`,modules:[z,a?t.module:null].filter(Boolean),bindings:{flareParams:{uniform:this.uniforms},flareDepth:{texture:()=>this.depthTexture},flareVisRW:{storage:this.visibility,access:`read_write`}},workgroupSize:[1,1,1],code:`
fn flareSkyTap( p: vec2f, size: vec2i ) -> f32 {
	let q = clamp( vec2i( p ), vec2i( 0 ), size - 1 );
	// reversed depth: the sky is at 0
	return select( 0.0, 1.0, textureLoad( flareDepth, q, 0 ) < 1e-7 );
}
@compute @workgroup_size( 1 )
fn main() {
	let size = vec2i( textureDimensions( flareDepth ) );
	let c = flareParams.sunUV * vec2f( size );
	var sky = 0.0;
${i}
	let cloudT = ${a?`cloudsSunTransmittance( cloudsSampleView( flareParams.sunDir ).a )`:`1.0`};
	let up = smoothstep( -0.02, 0.04, flareParams.sunDir.y );
	let tgt = sky / ${K(xo)} * cloudT * up * flareParams.inView * flareParams.aboveWater;
	let v = flareVisRW[ 0 ];
	flareVisRW[ 0 ] = mix( v, tgt, 1.0 - exp( flareParams.dt * -14.0 ) );
}
`});let o=``;for(let e of bo)o+=`
	{
		let pd = flarePolyDist( p - s * ${K(e.a)} );
		let body = vec3f( smoothstep( ${K(e.r*.975)}, ${K(e.r*.975*.9)}, pd ), smoothstep( ${K(e.r)}, ${K(e.r*.9)}, pd ), smoothstep( ${K(e.r*1.025)}, ${K(e.r*1.025*.9)}, pd ) );
		let rim = smoothstep( ${K(e.r*.55)}, ${K(e.r)}, pd ) * 0.7 + 0.3;
		// smaller ghosts concentrate the same reflected energy: brighter
		ghosts += body * rim * vec3f( ${e.tint.map(K).join(`, `)} ) * ${K(e.k*.0028/(e.r*e.r))};
	}`;this.module=new R({name:`flare`,deps:[z],uniforms:this.uniforms,uniformName:`flareParams`,bindings:{flareVis:{storage:this.visibility,access:`read`}},code:`
const FLARE_SEG: f32 = ${K(2*Math.PI/vo)};

// aperture polygon: distance scaled so the polygon edge sits at the given radius
fn flarePolyDist( d: vec2f ) -> f32 {
	let a = atan2( d.y, d.x ) + ${K(yo)};
	return length( d ) * cos( floor( a / FLARE_SEG + 0.5 ) * FLARE_SEG - a );
}

// HDR flare light for this screen position (added before exposure / tone mapping)
fn flareLight( uv: vec2f ) -> vec3f {
	let asp = vec2f( flareParams.aspect, 1.0 );
	let p = ( uv - 0.5 ) * asp * vec2f( 1.0, -1.0 );
	let s = ( flareParams.sunUV - 0.5 ) * asp * vec2f( 1.0, -1.0 );
	let vis = flareVis[ 0 ];
	// light arriving from the sun disc (the key light colour follows the atmosphere's
	// transmittance; at night the moon is the key light and flares only faintly)
	let light = frame.sunColor * vis * flareParams.strength * 0.02;
	if ( vis <= 0.0 ) { return vec3f( 0.0 ); }

	var ghosts = vec3f( 0.0 );
${o}

	// fade the ghosts as the sun nears the centre (they collapse onto it and vanish)
	let offAxis = smoothstep( 0.02, 0.2, length( s ) );

	// halo: dispersive ring about the image centre
	let rc = length( p );
	let halo = vec3f( smoothstep( 0.03, 0.0, abs( rc - 0.43 ) ), smoothstep( 0.03, 0.0, abs( rc - 0.445 ) ), smoothstep( 0.03, 0.0, abs( rc - 0.46 ) ) ) * smoothstep( 0.25, 0.8, length( s ) ) * 0.12;

	// starburst and veiling glare around the sun (distances in image heights)
	let q = p - s;
	let rq = max( length( q ), 1e-4 );
	let aq = atan2( q.y, q.x ) + ${K(yo)};
	let px = 1.0 / max( frame.outputResolution.y, 1.0 );
	// the nearest spike (two per blade) and this pixel's distance from its line
	let seg = ${K(Math.PI/vo)};
	let k = floor( aq / seg + 0.5 );
	let perp = abs( sin( aq - k * seg ) ) * rq;
	let ki = k - ${K(14)} * floor( k / ${K(14)} ); // same spike across the atan2 seam
	let h1 = fract( sin( ki * 12.9898 + 4.1 ) * 43758.5453 );
	let h2 = fract( sin( ki * 78.233 + 1.7 ) * 43758.5453 );
	// thin at the disc, a little softer outward (same energy across the line: dimmer as it widens)
	let width = px * 0.8 + rq * 0.003;
	let line = exp( - ( perp * perp ) / ( width * width ) ) * ( px * 0.8 / width );
	let len = 0.05 + 0.08 * h1;
	let lenC = vec3f( len * 1.12, len, len * 0.88 );
	let taper = exp( - rq / lenC - ( rq * rq ) / ( lenC * lenC * 4.0 ) );
	let spikes = line * taper * ( 0.45 + 0.55 * h2 ) * 1.4;
	// fine streaks around the disc: smooth angular noise, short
	let t = ( aq * ${K(1/(2*Math.PI))} + 0.5 ) * 48.0;
	let ti = floor( t );
	let hA = fract( sin( ( ti - 48.0 * floor( ti / 48.0 ) ) * 91.345 ) * 43758.5453 );
	let hB = fract( sin( ( ti + 1.0 - 48.0 * floor( ( ti + 1.0 ) / 48.0 ) ) * 91.345 ) * 43758.5453 );
	let n = mix( hA, hB, smoothstep( 0.0, 1.0, t - ti ) );
	let fine = pow( n, 5.0 ) * exp( - rq / 0.03 ) * 0.3;
	let glow = exp( rq * -5.0 ) * 0.05 + exp( rq * -40.0 ) * 0.4;
	let burst = spikes + vec3f( fine + glow );

	return light * ( ghosts * offAxis + halo + burst );
}
`})}update(e,t,{aboveWater:n=!0}={}){let r=this.uniforms.fields.sunDir.value.copy(this.sunDir.value||this.sunDir);e.updateMatrixWorld();let i=Co.copy(e.position).addScaledVector(r,1e3).project(e),a=wo.set(0,0,-1).applyQuaternion(e.quaternion).dot(r)>.05;this.sunUV.value.set(i.x*.5+.5,.5-i.y*.5);let o=Math.max(Math.abs(i.x),Math.abs(i.y));this.inView.value=a?A.clamp((1-o)/.1,0,1):0,this.aboveWater.value=+!!n,this.aspect.value=e.aspect,this.dt.value=Math.min(t,.1);let s=this._depthH||1080;this.discPx.value=Math.max(1.5,.004625/Math.tan(A.degToRad(e.fov)*.5)*s*.5)}setDepthHeight(e){this._depthH=e}},Co=new N,wo=new N,To=20,Eo=10,Do=400,Oo=224,ko=`
const MB_TILE: f32 = ${To}.0;
const MB_MAX_TILES_X: i32 = ${Do};

// uv motion (current - previous) of the pixel at uv with reversed-Z depth d (sky = 0): sky pixels
// reproject their far-plane points with last frame's unjittered camera
fn mbUvVelocity( vel: vec4f, uv: vec2f, d: f32 ) -> vec2f {
	let ndc = ( uv * 2.0 - 1.0 ) * vec2f( 1.0, -1.0 );
	let prev = mbParams.skyReproj * vec4f( ndc, 0.0, 1.0 );
	return select( ( ndc - prev.xy / prev.w ) * vec2f( 0.5, -0.5 ), vel.xy, d > 1e-7 );
}

// uv velocity -> half streak vector in output pixels (shutter applied, capped at one tile)
fn mbToPx( vel: vec2f ) -> vec2f {
	let v = vel * mbParams.outSize * ( mbParams.shutter * 0.5 );
	let l = length( v );
	return v * min( 1.0, MB_TILE / max( l, 1e-6 ) );
}
`,Ao=class{constructor({velocityTexture:e,depthTexture:t,color:n}){this.uniforms=new L(`MotionBlurParams`,{skyReproj:[`mat4x4f`,new F],outSize:[`vec2f`,new j(1,1)],tileCount:[`vec2f`,new j(1,1)],shutter:[`f32`,.5],frameIndex:[`f32`,0]},{label:`motionBlur`});let r=this.uniforms.fields;this.shutter=r.shutter,this.outSize=r.outSize,this.tileCount=r.tileCount,this.frameIndex=r.frameIndex,this.skyReproj=r.skyReproj,this._vp=new F,this._prevVP=new F,this._hasPrev=!1,this.color=n,this.velocityTexture=e,this.depthTexture=t,this.tileMax=new li({label:`mbTileMax`,count:Do*Oo,type:`vec4f`}),this.neighborMax=new li({label:`mbNeighborMax`,count:Do*Oo,type:`vec4f`}),this._frame=0,this._buildKernels();let i=()=>typeof this.color==`function`?this.color():this.color;this.module=new R({name:`motionBlur`,deps:[z],uniforms:this.uniforms,uniformName:`mbParams`,bindings:{mbVelocity:{texture:()=>this.velocityTexture},mbDepth:{texture:()=>this.depthTexture},mbColor:{texture:i},mbNeighbor:{storage:this.neighborMax,access:`read`}},code:ko+`
fn mbTexel( uv: vec2f, inSize: vec2f ) -> vec2i { return clamp( vec2i( uv * inSize ), vec2i( 0 ), vec2i( inSize ) - 1 ); }
fn mbSample( uv: vec2f ) -> vec3f { return textureSampleLevel( mbColor, smpLinearClamp, uv, 0.0 ).rgb; }

// Motion-blurred colour at uv. sharpColor = the (sharpened) unblurred colour at uv, returned
// unchanged where nothing moves; the blur itself reads the unsharpened resolved image, so
// sharpening never acts on blurred pixels.
fn mbApply( sharpColor: vec3f, uvIn: vec2f ) -> vec3f {
	var out = sharpColor;
	if ( mbParams.shutter > 0.0 ) {
		let pix = uvIn * mbParams.outSize;
		let tile = clamp( vec2i( floor( pix / MB_TILE ) ), vec2i( 0 ), vec2i( mbParams.tileCount ) - 1 );
		let nm = mbNeighbor[ tile.y * MB_MAX_TILES_X + tile.x ];
		let nmLen = nm.z;
		if ( nmLen >= 0.5 ) {
			let inSize = vec2f( textureDimensions( mbVelocity ) );
			let cX = mbTexel( uvIn, inSize );
			let dX = textureLoad( mbDepth, cX, 0 );
			let vX = mbToPx( mbUvVelocity( textureLoad( mbVelocity, cX, 0 ), uvIn, dX ) );
			let lenX = length( vX );
			// interleaved gradient noise, shifted every frame
			let pn = floor( pix ) + mbParams.frameIndex * 5.588238;
			let jitter = fract( fract( dot( pn, vec2f( 0.06711056, 0.00583715 ) ) ) * 52.9829189 ) - 0.5;
			// sample pairs: ~3 px apart along the streak, 2..6 pairs
			let pairs = i32( clamp( ceil( nmLen / 3.0 ), 2.0, 6.0 ) );
			let invSize = 1.0 / mbParams.outSize;
			var acc = vec3f( 0.0 );
			let fade = sat( nmLen - 0.5 ); // continuous with the early-out below 0.5 px

			if ( nm.w > nmLen * 0.75 ) {
				// fast path: all streaks in the neighbourhood alike (camera rotation, distant scenery):
				// a plain directional average along the pixel's own motion
				for ( var i = 0; i < pairs; i++ ) {
					let tt = ( f32( i ) + 0.5 + jitter ) / f32( pairs );
					let o = vX * tt * invSize;
					acc += mbSample( uvIn + o );
					acc += mbSample( uvIn - o );
				}
				out = mix( sharpColor, acc / ( f32( pairs ) * 2.0 ), fade );
			} else {
				// full reconstruction: soft depth classification of each sample against the centre
				var wSum = 0.0;
				let dirX = select( nm.xy, vX, lenX > 0.5 );
				for ( var i = 0; i < pairs; i++ ) {
					let tt = ( f32( i ) + 0.5 + jitter ) / f32( pairs );
					// alternate between the neighbourhood's dominant direction and the pixel's own (Jimenez 2014)
					let dir = select( nm.xy, dirX, ( i & 1 ) == 1 );
					let off = dir * tt;
					let offLen = length( off );
					for ( var k = 0; k < 2; k++ ) {
						let sgn = select( -1.0, 1.0, k == 0 );
						let uvY = uvIn + off * invSize * sgn;
						let tY = mbTexel( uvY, inSize );
						let dY = textureLoad( mbDepth, tY, 0 );
						let lenY = length( mbToPx( mbUvVelocity( textureLoad( mbVelocity, tY, 0 ), uvY, dY ) ) );
						// reversed-Z depth ~ 1/distance: q > 0 when the sample is farther than the centre
						let q = ( dX - dY ) / max( max( dX, dY ), 1e-12 );
						let behind = sat( q * 40.0 + 0.5 );
						// a sample behind the centre shows through the centre's own streak; one in front
						// covers the centre when its streak reaches it (1 px soft cylinders)
						let spreadX = sat( lenX - max( offLen - 1.0, 0.0 ) );
						let spreadY = sat( lenY - max( offLen - 1.0, 0.0 ) );
						let w = behind * spreadX + ( 1.0 - behind ) * spreadY;
						acc += mbSample( uvY ) * w;
						wSum += w;
					}
				}
				// whatever the samples don't cover is this pixel's own (sharpened) colour
				let n = f32( pairs ) * 2.0;
				let res = acc / n + sharpColor * max( 1.0 - wSum / n, 0.0 );
				out = mix( sharpColor, res, fade );
			}
		}
	}
	return out;
}
`})}_buildKernels(){let e=``;for(let t=64;t>0;t>>=1)e+=`
	if ( t < ${t}u && t + ${t}u < 100u ) {
		let a = mbShared[ t ];
		let b = mbShared[ t + ${t}u ];
		let m = select( a, b, b.z > a.z );
		mbShared[ t ] = vec4f( m.xyz, min( a.w, b.w ) );
	}
	workgroupBarrier();`;let t={mbParams:{uniform:this.uniforms}};this.tileKernel=new Mi({label:`Motion Blur Tiles`,modules:[z],bindings:{...t,mbVelocity:{texture:()=>this.velocityTexture},mbDepth:{texture:()=>this.depthTexture},mbTileMaxRW:{storage:this.tileMax,access:`read_write`}},workgroupSize:[Eo,Eo,1],code:ko+`
var<workgroup> mbShared: array<vec4f, 100>;
@compute @workgroup_size( WG_X, WG_Y, 1 )
fn main( @builtin( local_invocation_id ) lid: vec3u, @builtin( workgroup_id ) wid: vec3u ) {
	let t = lid.y * ${Eo}u + lid.x;
	let inSize = vec2i( textureDimensions( mbVelocity ) );
	var best = vec2f( 0.0 ); var bestL = 0.0; var minL = 1e8;
	for ( var k = 0; k < 4; k++ ) {
		let o = vec2u( u32( k & 1 ), u32( k >> 1u ) );
		let p = vec2f( wid.xy * ${To}u + lid.xy * 2u + o ) + 0.5;
		let q = min( vec2i( p / mbParams.outSize * vec2f( inSize ) ), inSize - 1 );
		let v = mbToPx( mbUvVelocity( textureLoad( mbVelocity, q, 0 ), p / mbParams.outSize, textureLoad( mbDepth, q, 0 ) ) );
		let l = dot( v, v );
		if ( l > bestL ) {
			bestL = l;
			best = v;
		}
		minL = min( minL, l );
	}
	mbShared[ t ] = vec4f( best, bestL, minL );
	workgroupBarrier();
${e}
	if ( t == 0u ) {
		let r = mbShared[ 0 ];
		let idx = i32( wid.y ) * MB_MAX_TILES_X + i32( wid.x );
		// xy = longest half streak (px), z = its length, w = shortest length in the tile
		mbTileMaxRW[ idx ] = vec4f( r.xy, sqrt( r.z ), sqrt( r.w ) );
	}
}
`});let n=``;for(let e=-1;e<=1;e++)for(let t=-1;t<=1;t++){let r=`m.z > best.z`;if(t!==0&&e!==0){let n=[-t*Math.SQRT1_2,-e*Math.SQRT1_2];r+=` && abs( dot( m.xy, vec2f( ${n[0]}, ${n[1]} ) ) ) > m.z * 0.7`}n+=`
		{
			let x = clamp( tx + ${t}, 0, nx - 1 ); let y = clamp( ty + ${e}, 0, ny - 1 );
			let m = mbTileMaxR[ y * MB_MAX_TILES_X + x ];
			if ( ${r} ) { best = m; }
			minL = min( minL, m.w );
		}`}this.neighborKernel=new Mi({label:`Motion Blur Neighbourhood`,modules:[z],bindings:{...t,mbTileMaxR:{storage:this.tileMax,access:`read`},mbNeighborRW:{storage:this.neighborMax,access:`read_write`}},workgroupSize:[8,8,1],code:`
const MB_MAX_TILES_X: i32 = ${Do};
@compute @workgroup_size( WG_X, WG_Y, 1 )
fn main( @builtin( global_invocation_id ) gid: vec3u ) {
	let tx = i32( gid.x ); let ty = i32( gid.y );
	let nx = i32( mbParams.tileCount.x ); let ny = i32( mbParams.tileCount.y );
	if ( tx < nx && ty < ny ) {
		var best = vec4f( 0.0 ); var minL = 1e8;
${n}
		// xy = dominant half streak (px), z = its length, w = shortest streak in the neighbourhood
		mbNeighborRW[ ty * MB_MAX_TILES_X + tx ] = vec4f( best.xyz, minL );
	}
}
`})}updateCamera(e){e.updateMatrixWorld(),e.matrixWorldInverse&&e.matrixWorldInverse.copy(e.matrixWorld).invert(),this._vp.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._hasPrev||this._prevVP.copy(this._vp),this._hasPrev=!0,this.skyReproj.value.copy(this._vp).invert().premultiply(this._prevVP),this._prevVP.copy(this._vp)}compute(e,t){if(this.shutter.value<=0)return;let n=Math.min(Do,Math.ceil(e/To)),r=Math.min(Oo,Math.ceil(t/To));this.outSize.value.set(e,t),this.tileCount.value.set(n,r),this._frame=(this._frame+1)%64,this.frameIndex.value=this._frame,this.tileKernel.dispatch([n,r,1]),this.neighborKernel.dispatch([Math.ceil(n/8),Math.ceil(r/8),1])}},jo=[0,0,0,0],Mo=`
fn RRTAndODTFit( v: vec3f ) -> vec3f {
	let a = v * ( v + 0.0245786 ) - 0.000090537;
	let b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
fn acesFilmicToneMapping( colorIn: vec3f, exposure: f32 ) -> vec3f {
	let ACESInputMat = transpose( mat3x3f(
		0.59719, 0.35458, 0.04823,
		0.07600, 0.90834, 0.01566,
		0.02840, 0.13383, 0.83777 ) );
	let ACESOutputMat = transpose( mat3x3f(
		1.60475, -0.53108, -0.07367,
		-0.10208, 1.10813, -0.00605,
		-0.00327, -0.07276, 1.07602 ) );
	var color = colorIn * exposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return clamp( color, vec3f( 0.0 ), vec3f( 1.0 ) );
}
`,No=class{constructor(e,{sceneRenderer:t,camera:n,underwater:r,clouds:i=null,sunDir:a=null,haze:o=null}){this.renderer=e,this.camera=n,this.sceneRenderer=t,this.underwater=r,this.scale=1,this.outputTexture=null,this.outputSize=null,this.outputFormat=I.context?I.format:`rgba8unorm`,this.uniforms=new L(`PostParams`,{aoStrength:[`f32`,1],bloom:[`f32`,.05],vignette:[`f32`,.28],saturation:[`f32`,1.06],contrast:[`f32`,1.04],warmth:[`f32`,.02],grain:[`f32`,.012],sharpen:[`f32`,.45]},{label:`post`}),this.params=this.uniforms.fields,this.aeUniforms=new L(`AutoExposureParams`,{enabled:[`f32`,1],refLum:[`f32`,.25],min:[`f32`,.6],max:[`f32`,6],up:[`f32`,1.6],down:[`f32`,1.1]},{label:`autoExposure`}),this.autoExposure={...this.aeUniforms.fields,ref:this.aeUniforms.fields.refLum},this.exposure=new li({label:`autoExposure`,count:1,type:`f32`,data:new Float32Array([1])});let s=t.sceneRT,c=t.opaqueCopy;this.sceneColor=s.texture,this.opaqueDepth=c.depthTexture,this.finalDepth=s.depthTexture,this.aoDepth=new U(1,1,{colors:[`r16float`],label:`aoDepth`}),this._aoDepthPass=new W({label:`AO depth`,colorFormats:[`r16float`],bindings:{aoFullDepth:{texture:()=>this.opaqueDepth},aoFinalDepth:{texture:()=>this.finalDepth}},code:`
// negative where the water covers the opaque surface: its AO is never shown (the beauty pass skips
// covered pixels), so GTAO leaves those texels alone; everything else reads the magnitude
fn fragment( in: FSIn ) -> vec4f {
	let s = vec2i( textureDimensions( aoFullDepth ) );
	let p = min( vec2i( in.pos.xy ) * 2, s - 1 );
	let d = textureLoad( aoFullDepth, p, 0 );
	let covered = textureLoad( aoFinalDepth, p, 0 ) > d + 1e-7;
	return vec4f( select( d, - d, covered ), 0.0, 0.0, 1.0 );
}
`}),this.aoPass=new to(this.aoDepth.texture,n,{samples:12,depthIsColor:!0}),this.aoPass.resolutionScale=.5,this.aoPass.radius.value=2.2,this.aoPass.thickness.value=2,this.aoPass.distanceExponent.value=1.4,this.aoPass.scale.value=1.6,this.aoPass.samples.value=12,this.aoPass.useTemporalFiltering=!0,this.aoBlurX=new U(1,1,{colors:[`r16float`],label:`aoBlurX`}),this.aoBlurY=new U(1,1,{colors:[`r16float`],label:`aoBlurY`});let l=(e,t,n)=>{let r=``;for(let e=-2;e<=2;e++)r+=`
	{
		let uvK = in.uv + vec2f( ${t*e}.0, ${n*e}.0 ) / size;
		let rel = abs( postDepthOpaque( uvK ) - dC ) / max( dC, 1e-7 );
		let w = 1.0 / pow2( rel * 40.0 + 1.0 );
		sum += textureSampleLevel( aoSrc, smpLinearClamp, uvK, 0.0 ).r * w;
		wSum += w;
	}`;return new W({label:`AO blur `+(t?`x`:`y`),colorFormats:[`r16float`],bindings:{aoSrc:{texture:e},postAODepth:{texture:()=>this.aoDepth.texture}},code:`
fn postDepthOpaque( uv: vec2f ) -> f32 {
	let s = vec2i( textureDimensions( postAODepth ) );
	return abs( textureLoad( postAODepth, clamp( vec2i( floor( uv * vec2f( s ) ) ), vec2i( 0 ), s - 1 ), 0 ).r );
}
fn fragment( in: FSIn ) -> vec4f {
	let size = vec2f( textureDimensions( aoSrc ) );
	let dC = postDepthOpaque( in.uv );
	var sum = 0.0; var wSum = 0.0;
${r}
	return vec4f( sum / wSum, 0.0, 0.0, 1.0 );
}
`})};this._aoBlurXPass=l(()=>this.aoPass.texture,1,0),this._aoBlurYPass=l(()=>this.aoBlurX.texture,0,1),this.medium=new U(1,1,{colors:[`r8unorm`],label:`medium`}),r.mediumTexture=this.medium.texture,this.haze=o,o&&(o.mediumTexture=this.medium.texture),this.beauty=new U(1,1,{colors:[`rgba16float`],label:`beauty`}),this.smaaIn=new U(1,1,{colors:[`rgba16float`],label:`smaaBeforeTAA`}),this.taau=new ho(()=>this.aaMode===`smaataa`?this.smaaIn.texture:this.beauty.texture,this.finalDepth,t.velocityTexture,n,t.waterMaskTexture,this.exposure),this.aaMode=`taa`,this.aa=new lo({src:()=>this.beauty.texture,exposure:this.exposure}),this.motionBlur=new Ao({velocityTexture:t.velocityTexture,depthTexture:s.depthTexture,color:()=>this.taau.output}),this.flare=a?new So({depthTexture:s.depthTexture,clouds:i,sunDir:a}):null,this.lens=new go,this._outW=0,this._outH=0,this._inW=0,this._inH=0,this._prevVP=new F,this._prevCamPos=new N,this._hasPrev=!1,this._size=new j,this._built=!1,this.profiler=null}_build(){this._built=!0;let e=this.underwater,t=this.haze;if(this._mediumPass=new W({label:`medium`,colorFormats:[`r8unorm`],modules:[e.module],code:`fn fragment( in: FSIn ) -> vec4f { return vec4f( underwaterMedium( in.uv ), 0.0, 0.0, 1.0 ); }`}),this._beautyPass=new W({label:`beauty (AO + haze + underwater)`,colorFormats:[`rgba16float`],modules:[e.compositeModule,t?t.compositeModule:null].filter(Boolean),defines:t?t._defines():{},bindings:{post:{uniform:this.uniforms},postScene:{texture:()=>this.sceneColor},postOpaqueDepth:{texture:()=>this.opaqueDepth},postFinalDepth:{texture:()=>this.finalDepth},postAO:{texture:()=>this.aoBlurY.texture},postAODepth:{texture:()=>this.aoDepth.texture}},code:`
fn postDepthLoad( uv: vec2f, which: i32 ) -> f32 {
	if ( which == 0 ) {
		let s = vec2i( textureDimensions( postOpaqueDepth ) );
		return textureLoad( postOpaqueDepth, clamp( vec2i( floor( uv * vec2f( s ) ) ), vec2i( 0 ), s - 1 ), 0 );
	}
	let s = vec2i( textureDimensions( postFinalDepth ) );
	return textureLoad( postFinalDepth, clamp( vec2i( floor( uv * vec2f( s ) ) ), vec2i( 0 ), s - 1 ), 0 );
}

fn postColorAO( uv: vec2f ) -> vec3f {
	let c = textureSampleLevel( postScene, smpLinearClamp, uv, 0.0 ).rgb;
	let dO = postDepthLoad( uv, 0 );
	let dF = postDepthLoad( uv, 1 );
	// reversed depth: sky = 0; water in front of the opaque surface has a larger depth value
	let isSky = dO < 1e-7;
	let covered = dF > dO + 1e-7;
	// no AO there (k = 0 below): skip the upsample
	if ( isSky || covered ) { return c; }
	// depth-aware upsample of the half-res AO: the 4 nearest AO texels, weighted by how close
	// their depth is to this pixel's (no dark halos bleeding across depth edges)
	// (the AO texels' depths: the half resolution copy the AO was computed from)
	let aoSizeI = vec2i( textureDimensions( postAO ) );
	let pa = uv * vec2f( aoSizeI ) - 0.5;
	let i0 = floor( pa );
	let fr = pa - i0;
	var aSum = 0.0; var wSum = 1e-4;
	for ( var k = 0; k < 4; k++ ) {
		let o = vec2i( k & 1, k >> 1u );
		let pT = clamp( vec2i( i0 ) + o, vec2i( 0 ), aoSizeI - 1 );
		let dT = abs( textureLoad( postAODepth, pT, 0 ).r );
		let wBil = select( 1.0 - fr.x, fr.x, o.x == 1 ) * select( 1.0 - fr.y, fr.y, o.y == 1 );
		// reversed-Z depth ~ near / z, so the relative depth difference ~ |dT - dO| / dO
		let rel = abs( dT - dO ) / max( dO, 1e-7 );
		let wDepth = 1.0 / pow2( rel * 40.0 + 1.0 );
		let wt = wBil * wDepth + 1e-5;
		aSum += textureLoad( postAO, pT, 0 ).r * wt;
		wSum += wt;
	}
	let a = aSum / wSum;
	// multi-bounce approximation (Jimenez 2016) for a typical outdoor albedo of ~0.35
	let aMB = max( a, ( ( a * 0.382 - 1.036 ) * a + 1.654 ) * a );
	// AO only removes ambient light: full effect where the pixel is lit by the sky alone,
	// a third of it on sunlit surfaces (still grounds objects without dirty halos)
	let ambientOnly = 1.0 - smoothstep( 0.12, 0.9, luminance( c ) );
	let k = select( post.aoStrength * mix( 0.35, 1.0, ambientOnly ), 0.0, isSky || covered );
	return c * mix( 1.0, aMB, k );
}

fn postSceneSample( uv: vec2f ) -> vec3f {
	${t?`return hazeApply( uv, vec4f( postColorAO( uv ), 1.0 ) ).rgb;`:`return postColorAO( uv );`}
}

fn fragment( in: FSIn ) -> vec4f {
	return underwaterComposite( in.uv, in.pos.xy );
}
`}),this.aoPass._pass||this.aoPass._build(),t&&!t._passes&&t._build(),e.renderShafts&&e.shaftPass,this._buildBloom(),this._buildMeter(),this._buildFinal(),this.profiler)for(let[e,t]of this.passes())this.profiler.track(`post `+e,t)}_buildBloom(){let e=e=>new U(1,1,{colors:[`rgba16float`],label:e});this.bloomScales=[.5,.25,.125,.0625,.03125],this.bloomDown=this.bloomScales.map((t,n)=>e(`bloomDown`+(n+1))),this.bloomUp=this.bloomScales.slice(0,4).map((t,n)=>e(`bloomUp`+(n+1)));let t=(e,t)=>new W({label:`bloom down`,colorFormats:[`rgba16float`],bindings:{bSrc:{texture:e}},code:`
fn bTap( uv: vec2f, texel: vec2f, x: f32, y: f32 ) -> vec3f { return textureSampleLevel( bSrc, smpLinearClamp, uv + texel * vec2f( x, y ), 0.0 ).rgb; }
fn karis( c: vec3f ) -> vec3f { return c / ( luminance( c ) + 1.0 ); }

fn fragment( in: FSIn ) -> vec4f {
	let uv = in.uv;
	let texel = 1.0 / vec2f( textureDimensions( bSrc ) );
	let a = bTap( uv, texel, -2.0, -2.0 ); let b = bTap( uv, texel, 0.0, -2.0 ); let c = bTap( uv, texel, 2.0, -2.0 );
	let d = bTap( uv, texel, -2.0, 0.0 ); let e = bTap( uv, texel, 0.0, 0.0 ); let f = bTap( uv, texel, 2.0, 0.0 );
	let g = bTap( uv, texel, -2.0, 2.0 ); let h = bTap( uv, texel, 0.0, 2.0 ); let i = bTap( uv, texel, 2.0, 2.0 );
	let j = bTap( uv, texel, -1.0, -1.0 ); let k = bTap( uv, texel, 1.0, -1.0 ); let l = bTap( uv, texel, -1.0, 1.0 ); let m = bTap( uv, texel, 1.0, 1.0 );
${t?`
	// weighted groups of four (Karis average) suppress fireflies
	let g0 = karis( ( j + k + l + m ) * 0.25 ) * 0.5;
	let g1 = karis( ( a + b + d + e ) * 0.25 ) * 0.125;
	let g2 = karis( ( b + c + e + f ) * 0.25 ) * 0.125;
	let g3 = karis( ( d + e + g + h ) * 0.25 ) * 0.125;
	let g4 = karis( ( e + f + h + i ) * 0.25 ) * 0.125;
	let s = g0 + g1 + g2 + g3 + g4;
	// undo the Karis tonemap on the result
	return vec4f( s / max( 1.0 - luminance( s ), 0.02 ), 1.0 );`:`
	let s = e * 0.125 + ( a + c + g + i ) * 0.03125 + ( b + d + f + h ) * 0.0625 + ( j + k + l + m ) * 0.125;
	return vec4f( s, 1.0 );`}
}
`}),n=(e,t)=>new W({label:`bloom up`,colorFormats:[`rgba16float`],bindings:{bSrc:{texture:e},bBase:{texture:t}},code:`
fn bTap( uv: vec2f, texel: vec2f, x: f32, y: f32 ) -> vec3f { return textureSampleLevel( bSrc, smpLinearClamp, uv + texel * vec2f( x, y ), 0.0 ).rgb; }
fn karis( c: vec3f ) -> vec3f { return c / ( luminance( c ) + 1.0 ); }

fn fragment( in: FSIn ) -> vec4f {
	let uv = in.uv;
	let texel = 1.0 / vec2f( textureDimensions( bSrc ) );
	let s = ( bTap( uv, texel, 0.0, 0.0 ) * 4.0
		+ ( bTap( uv, texel, -1.0, 0.0 ) + bTap( uv, texel, 1.0, 0.0 ) + bTap( uv, texel, 0.0, -1.0 ) + bTap( uv, texel, 0.0, 1.0 ) ) * 2.0
		+ ( bTap( uv, texel, -1.0, -1.0 ) + bTap( uv, texel, 1.0, -1.0 ) + bTap( uv, texel, -1.0, 1.0 ) + bTap( uv, texel, 1.0, 1.0 ) ) ) / 16.0;
	return vec4f( textureSampleLevel( bBase, smpLinearClamp, uv, 0.0 ).rgb + s, 1.0 );
}
`}),r=this.bloomDown,i=this.bloomUp;this._bloomPasses=[[t(()=>this.taau.texture,!0),r[0]],[t(()=>r[0].texture,!1),r[1]],[t(()=>r[1].texture,!1),r[2]],[t(()=>r[2].texture,!1),r[3]],[t(()=>r[3].texture,!1),r[4]],[n(()=>r[4].texture,()=>r[3].texture),i[3]],[n(()=>i[3].texture,()=>r[2].texture),i[2]],[n(()=>i[2].texture,()=>r[1].texture),i[1]],[n(()=>i[1].texture,()=>r[0].texture),i[0]]],this.bloomTex=i[0],this.half=r[0],this.meterRT=r[3]}_buildMeter(){let e=``;for(let t=128;t>0;t>>=1)e+=`
	if ( t < ${t}u ) {
		sumL[ t ] += sumL[ t + ${t}u ];
		sumW[ t ] += sumW[ t + ${t}u ];
	}
	workgroupBarrier();`;this.meterKernel=new Mi({label:`Auto Exposure`,modules:[z],bindings:{ae:{uniform:this.aeUniforms},aeTex:{texture:()=>this.meterRT.texture},aeExposure:{storage:this.exposure,access:`read_write`}},workgroupSize:[256,1,1],code:`
var<workgroup> sumL: array<f32, 256>;
var<workgroup> sumW: array<f32, 256>;
@compute @workgroup_size( WG_X, 1, 1 )
fn main( @builtin( local_invocation_id ) lid: vec3u ) {
	let t = lid.x;
	let size = textureDimensions( aeTex );
	let n = size.x * size.y;
	var accL = 0.0; var accW = 0.0;
	for ( var i = 0u; i < 160u; i++ ) {
		let idx = t + i * 256u;
		if ( idx < n ) {
			let x = idx % size.x; let y = idx / size.x;
			let c = textureLoad( aeTex, vec2i( i32( x ), i32( y ) ), 0 ).rgb;
			let l = log2( max( luminance( c ), 1e-4 ) );
			let uvc = vec2f( ( f32( x ) + 0.5 ) / f32( size.x ), ( f32( y ) + 0.5 ) / f32( size.y ) ) - 0.5;
			let w = max( 1.0 - length( uvc * vec2f( 1.0, 1.4 ) ) * 1.2, 0.15 );
			accL += l * w;
			accW += w;
		}
	}
	sumL[ t ] = accL;
	sumW[ t ] = accW;
	workgroupBarrier();
${e}
	if ( t == 0u ) {
		let avg = exp2( sumL[ 0 ] / max( sumW[ 0 ], 1e-4 ) );
		// the eye only partly compensates: dark scenes stay darker (dusk and night must not
		// look like day), and at night at most one extra stop
		let ratio = ae.refLum / avg;
		let partial = select( ratio, pow( ratio, 0.8 ), ratio > 1.0 );
		let tgt = clamp( partial, ae.min, mix( ae.max, 2.0, frame.night ) );
		let cur = aeExposure[ 0 ];
		let rate = select( ae.down, ae.up, tgt > cur );
		let k = 1.0 - exp( - frame.dt * rate );
		let next = exp2( mix( log2( max( cur, 1e-3 ) ), log2( tgt ), k ) );
		aeExposure[ 0 ] = select( 1.0, next, ae.enabled > 0.5 );
	}
}
`})}_buildFinal(){let e=[z,this.motionBlur.module,this.lens.module];this.flare&&e.push(this.flare.module),this._finalPass=new W({label:`final (grade + tonemap)`,colorFormats:[this.outputFormat],modules:e,bindings:{post:{uniform:this.uniforms},postResolved:{texture:()=>this.taau.output},postBloom:{texture:()=>this.bloomTex.texture},postHalf:{texture:()=>this.half.texture},postExposure:{storage:this.exposure,access:`read`}},code:Mo+`
fn tm( c: vec3f ) -> vec3f { return c / ( max( c.r, max( c.g, c.b ) ) + 1.0 ); }
fn loadResolved( p: vec2i ) -> vec3f { return textureLoad( postResolved, p, 0 ).rgb; }

// RCAS (AMD FSR1 robust contrast-adaptive sharpening) on the resolved image: TAA converges to a
// slightly soft image, RCAS restores the detail without halos (the lobe is limited by local
// contrast). Done on a tonemapped proxy of the HDR values and inverted afterwards.
fn rcas( uvIn: vec2f ) -> vec3f {
	let size = vec2i( textureDimensions( postResolved ) );
	let pc = clamp( vec2i( uvIn * vec2f( size ) ), vec2i( 1 ), size - 2 );
	let e = tm( loadResolved( pc ) );
	let b = tm( loadResolved( pc + vec2i( 0, -1 ) ) ); let d = tm( loadResolved( pc + vec2i( -1, 0 ) ) );
	let f = tm( loadResolved( pc + vec2i( 1, 0 ) ) ); let h = tm( loadResolved( pc + vec2i( 0, 1 ) ) );
	let mn4 = min( min( b, d ), min( f, h ) );
	let mx4 = max( max( b, d ), max( f, h ) );
	let hitMin = min( mn4, e ) / ( mx4 * 4.0 + 1e-5 );
	let hitMax = ( vec3f( 1.0 ) - max( mx4, e ) ) / ( mn4 * 4.0 - 4.0 );
	let lobeRGB = max( - hitMin, hitMax );
	// the sky (depth 0) is only sharpened lightly: clouds and cirrus are soft by nature, and the lobe
	// turned their sampling noise into fine grain (mbDepth: the scene depth, bound by the blur module)
	let dS = textureLoad( mbDepth, clamp( vec2i( uvIn * vec2f( textureDimensions( mbDepth ) ) ), vec2i( 0 ), vec2i( textureDimensions( mbDepth ) ) - 1 ), 0 );
	let skyK = select( 1.0, 0.3, dS < 1e-7 );
	let lobe = max( -0.1875, min( max( lobeRGB.r, max( lobeRGB.g, lobeRGB.b ) ), 0.0 ) ) * post.sharpen * skyK;
	let r = max( ( ( b + d + f + h ) * lobe + e ) / ( lobe * 4.0 + 1.0 ), vec3f( 0.0 ) );
	// back to HDR (inverse of the max-channel Reinhard)
	return r / max( 1.0 - max( r.r, max( r.g, r.b ) ), 1e-3 );
}

// integer hash (per pixel and frame) -> [0, 1)
fn postHash( p: vec2u, f: u32 ) -> f32 {
	var x = p.x * 1664525u + p.y * 1013904223u + f * 2654435761u;
	x ^= x >> 16u; x *= 0x7feb352du; x ^= x >> 15u; x *= 0x846ca68bu; x ^= x >> 16u;
	return f32( x >> 8u ) / 16777216.0;
}

fn bloomAt( uv: vec2f ) -> vec3f { return textureSampleLevel( postBloom, smpLinearClamp, uv, 0.0 ).rgb * post.bloom; }

fn lensSharp( uv: vec2f ) -> vec3f {
	var c = mbApply( rcas( uv ), uv ) + bloomAt( uv );
${this.flare?`	c += flareLight( uv );`:``}
	return c;
}
fn lensBlurred( uv: vec2f ) -> vec3f { return textureSampleLevel( postHalf, smpLinearClamp, uv, 0.0 ).rgb + bloomAt( uv ); }

fn fragment( in: FSIn ) -> vec4f {
	let uv = in.uv;
	var c = lensDroplets( uv ) * postExposure[ 0 ];
	// white balance nudge + saturation + contrast around mid grey (in linear HDR)
	c = c * vec3f( 1.0 + post.warmth, 1.0, 1.0 - post.warmth );
	let l = luminance( c );
	c = mix( vec3f( l ), c, post.saturation );
	c = pow( max( c, vec3f( 0.0 ) ) / 0.18, vec3f( post.contrast ) ) * 0.18;
	// vignette (elliptical, soft)
	let dv = ( uv - 0.5 ) * vec2f( 1.0, 0.8 );
	let v = 1.0 - smoothstep( 0.25, 0.75, length( dv ) ) * post.vignette;
	c = c * v;
	// fine film grain (luminance-weighted): triangular white noise on the real pixel grid, new every
	// frame (a fixed pattern on a fixed grid showed as diagonal hatching in dark gradients)
	let px = vec2u( in.pos.xy );
	let fi = frame.frameIndex;
	let n = ( postHash( px, fi ) + postHash( px + vec2u( 7919u, 104729u ), fi ) - 1.0 ) * 0.5;
	c = c + c * ( n * post.grain );
	// renderOutput: ACES filmic tone mapping with the exposure, sRGB transfer
	let t = acesFilmicToneMapping( c, frame.exposure );
	// +-1 LSB triangular dither before the 8-bit output: no banding in the sky gradients
	let dq = ( postHash( px + vec2u( 31337u, 271u ), fi ) + postHash( px + vec2u( 1013u, 65537u ), fi ) - 1.0 ) / 255.0;
	return vec4f( linearToSrgb( t ) + vec3f( dq ), 1.0 );
}
`})}_outputSize(){if(this.outputSize)return this.outputSize;let e=this.renderer;return e&&e.width?{width:e.width,height:e.height}:I.canvas?{width:I.canvas.width,height:I.canvas.height}:{width:1,height:1}}_resize(){let{width:e,height:t}=this._outputSize(),n=Math.max(1,Math.round(e*this.scale)),r=Math.max(1,Math.round(t*this.scale));if(e===this._outW&&t===this._outH&&n===this._inW&&r===this._inH)return;this._outW=e,this._outH=t,this._inW=n,this._inH=r,this.sceneRenderer.setSize(n,r),this.beauty.setSize(n,r),this.smaaIn.setSize(n,r),this.medium.setSize(n,r),this.underwater.setSize&&this.underwater.setSize(n,r),this.aoPass.resolutionScale=.5*this.scale,this.aoPass.setSize(e,t);let i=Math.round(e*.5*this.scale),a=Math.round(t*.5*this.scale);this.aoDepth.setSize(i,a),this.aoBlurX.setSize(i,a),this.aoBlurY.setSize(i,a),this.haze&&this.haze.setSize(e,t),this.taau.setSize(e,t),this.bloomDown&&(this.bloomScales.forEach((n,r)=>this.bloomDown[r].setSize(Math.round(e*n),Math.round(t*n))),this.bloomScales.slice(0,4).forEach((n,r)=>this.bloomUp[r].setSize(Math.round(e*n),Math.round(t*n)))),this.flare&&this.flare.setDepthHeight(r),this.lens.aspect.value=e/t}setScale(e){e!==this.scale&&(this.scale=e,this.sceneRenderer.scale=e,this.haze&&this.haze.setScale(e))}setBloom(e){this.params.bloom.value=e}internalSize(e=new j){return e.set(this._inW,this._inH)}beginFrame(){this._built||(this._build(),this._outW=0),this._resize();let e=this.camera;e.updateMatrixWorld(),e.matrixWorldInverse&&e.matrixWorldInverse.copy(e.matrixWorld).invert(),this.motionBlur.updateCamera(e),this.taau.advance();let[t,n]=this.aaMode===`taa`||this.aaMode===`smaataa`?this.taau.jitter():[0,0];Br(e,this._inW,this._inH,{jitterX:-t,jitterY:n,prevViewProj:this._hasPrev?this._prevVP:null,prevCameraPos:this._hasPrev?this._prevCamPos:null});let r=Ir.fields;r.outputResolution.value.set(this._outW,this._outH),this._prevVP.copy(r.viewProjNoJitter.value),this._prevCamPos.copy(r.cameraPos.value),this._hasPrev=!0}render(){if(this._built||this.beginFrame(),this._timers,this.motionBlur.compute(this._outW,this._outH),this._aoDepthPass.render({colorViews:[this.aoDepth.texture],clear:jo}),this.aoPass.render(),this._aoBlurXPass.render({colorViews:[this.aoBlurX.texture],clear:jo}),this._aoBlurYPass.render({colorViews:[this.aoBlurY.texture],clear:jo}),V.waterEnabled.value>.5&&this._mediumPass.render({colorViews:[this.medium.texture],clear:jo}),this.underwater.renderShafts&&this.underwater.renderShafts(V.waterEnabled.value>.5&&this.camera.position.y<V.cameraWaterHeight.value+.35+1),this.haze&&V.atmosphereQuality.value>0&&(this.haze.update(),this.haze.render()),this._beautyPass.render({colorViews:[this.beauty.texture],clear:jo}),this.aaMode===`taa`||this.aaMode===`smaataa`)this.aaMode===`smaataa`&&this.aa.render(`smaa`,this.smaaIn.texture),this.taau.render();else{let e=this.taau,t=1-e._cur;this.aa.render(this.aaMode,e.history[t].textures[0]),e._cur=t,e._needsRestart=!0}for(let[e,t]of this._bloomPasses)e.render({colorViews:[t.texture],clear:jo});let e=this.outputTexture?this.outputTexture.view({dimension:`2d`,mipLevelCount:1}):I.context.getCurrentTexture().createView();this._finalPass.render({colorViews:[e],clear:jo}),this.meterKernel.dispatch([1,1,1])}endFrame(){this.taau.clearViewOffset(),this.taau.endFrame()}passes(){let e=[[`motion blur tiles`,this.motionBlur.tileKernel],[`motion blur neighbours`,this.motionBlur.neighborKernel],[`GTAO`,this.aoPass._pass],[`AO blur x`,this._aoBlurXPass],[`AO blur y`,this._aoBlurYPass],[`medium`,this._mediumPass]];return this.haze&&this.haze._passes&&(e.push([`haze march`,this.haze._passes.march],[`haze sun mask`,this.haze._passes.mask]),this.haze._passes.blur.forEach((t,n)=>e.push([`haze god rays `+n,t]))),this.underwater._shaftPass&&e.push([`underwater shafts`,this.underwater._shaftPass]),e.push([`beauty`,this._beautyPass],[`TAAU`,this.taau._resolve[0]],[`TAAU `,this.taau._resolve[1]]),this.taau._tiledResolve&&this.taau._tiledResolve.forEach((t,n)=>e.push([`TAAU tiled `+n,t])),this._bloomPasses.forEach(([t],n)=>e.push([`bloom `+n,t])),e.push([`final`,this._finalPass],[`auto exposure`,this.meterKernel]),this.flare&&e.push([`flare visibility`,this.flare.kernel]),e}},Po=[0,0,0,0],Fo=16,Io=2500,Lo=900,Ro=6e4,zo=8,Bo=[.9,.97,1],Vo=3.5,Ho={sigma:15e-5,H:110},Uo={sigma:32e-6,H:1400},Wo=e=>{let t=String(e);return t.includes(`.`)||t.includes(`e`)?t:t+`.0`},Go=new R({name:`haze-shadow-hard`,deps:[yr],code:`
fn sunShadowHard( P: vec3f ) -> f32 {
	if ( shadowParams.enabled < 0.5 ) { return 1.0; }
	let dist = dot( P - frame.cameraPos, - vec3f( frame.view[ 0 ][ 2 ], frame.view[ 1 ][ 2 ], frame.view[ 2 ][ 2 ] ) );
	let c = shadowCascadeOf( dist );
	if ( c < 0 ) { return 1.0; }
	let sc = shadowParams.matrices[ c ] * vec4f( P, 1.0 );
	let uvz = vec3f( sc.x * 0.5 + 0.5, 0.5 - sc.y * 0.5, sc.z );
	if ( any( uvz.xy < vec2f( 0.0 ) ) || any( uvz.xy > vec2f( 1.0 ) ) || uvz.z > 1.0 ) { return 1.0; }
	return select( 1.0, 0.0, _shadowDepth( uvz.xy, c ) < uvz.z - 2e-5 );
}
`}),Ko=class{constructor({depthTexture:e,underwater:t,atmosphere:n,sky:r=null,clouds:i=null,terrain:a=null,csm:o=null,flatExterior:s=!1}){this.depthTexture=e,this.uw=t,this.atmosphere=n,this.sky=r,this.clouds=i,this.terrain=a,this.csm=o,this.flatExterior=s,this.uniforms=new L(`HazeParams`,{density:[`f32`,1.6],shafts:[`f32`,1],enabled:[`f32`,1],frame:[`f32`,0],sunUV:[`vec2f`,new j(.5,.5)],ssFade:[`f32`,0],hasMedium:[`f32`,0],histValid:[`f32`,0]},{label:`haze`});let c=this.uniforms.fields;this.density=c.density,this.shafts=c.shafts,this.enabled=c.enabled,this.frame=c.frame,this.sunUV=c.sunUV,this.ssFade=c.ssFade,this.mediumTexture=null,this.low=new U(1,1,{colors:[`rgba16float`],label:`hazeShafts`}),this.hist=[0,1].map(e=>new U(1,1,{colors:[`rgba16float`],label:`hazeShaftsHistory`+e})),this._hc=0,this._histValid=!1,this.ssTargets=[0,1,2,3].map(e=>new U(1,1,{colors:[`r16float`],label:`hazeSS`+e})),this.ssShafts=this.ssTargets[3],this.godRays=!0,this.scale=1,this._module=null,this._passes=null}setScale(e){this.scale=e}setSize(e,t){let n=this.scale*Math.sqrt(this.qualityLevel||1);this.low.setSize(Math.round(e*.5*n),Math.round(t*.5*n));for(let r of this.hist)r.setSize(Math.round(e*.5*n),Math.round(t*.5*n));this._histValid=!1;for(let r of this.ssTargets)r.setSize(Math.round(e*.25*n),Math.round(t*.25*n))}update(){this.frame.value=(this.frame.value+1)%1024;let e=this.uw.camWorld.value.elements,t=V.sunDir.value,n=this.uw.proj.value,r=e[0]*t.x+e[1]*t.y+e[2]*t.z,i=e[4]*t.x+e[5]*t.y+e[6]*t.z,a=e[8]*t.x+e[9]*t.y+e[10]*t.z,o=A.smoothstep,s=0;if(a<-.02){let e=.5+.5*(r/-a)*n.x,c=.5-.5*(i/-a)*n.y;this.sunUV.value.set(e,c),s=(1-o(Math.max(Math.abs(e-.5),Math.abs(c-.5)),.6,1.15))*o(-a,.02,.25)*(1-o(t.y,.3,.75))}(V.cameraUnderwater.value>.5||this.enabled.value<.5||this.shafts.value<=0||!this.godRays)&&(s=0),this.ssFade.value=s,this.uniforms.fields.hasMedium.value=this.mediumTexture&&V.waterEnabled.value>.5?1:0}render(){this._passes||this._build();let e=this._passes;e.march.render({colorViews:[this.low.texture],clear:Po});let t=this.enabled.value>.5&&this.shafts.value>0;if(this.uniforms.fields.histValid.value=this._histValid&&t?1:0,e.temporal[this._hc].render({colorViews:[this.hist[1-this._hc].texture],clear:Po}),this._hc=1-this._hc,this._histValid=t,this.ssFade.value>.001){e.mask.render({colorViews:[this.ssTargets[0].texture],clear:Po});for(let t=0;t<3;t++)e.blur[t].render({colorViews:[this.ssTargets[t+1].texture],clear:Po})}}_deps(){let e=yr.code.includes(`fn sunShadowHard`)?yr:Go;return[z,this.uw.module,this.atmosphere&&this.atmosphere.module,this.sky&&this.sky.module,this.clouds&&this.clouds.module,this.terrain&&this.terrain.module,e]}_defines(){return{HZ_CLOUDS:this.clouds&&this.clouds.module?1:0,HZ_TERRAIN:this.terrain&&this.terrain.module?1:0,HZ_MOON:this.sky&&this.sky.module?1:0}}get module(){return this._module||=new R({name:`haze`,deps:this._deps(),uniforms:this.uniforms,uniformName:`hazeParams`,bindings:{hazeDepth:{texture:()=>this.depthTexture}},code:`
const HZ_MARINE_SIGMA: f32 = ${Wo(Ho.sigma)};
const HZ_MARINE_H: f32 = ${Wo(Ho.H)};
const HZ_AEROSOL_SIGMA: f32 = ${Wo(Uo.sigma)};
const HZ_AEROSOL_H: f32 = ${Wo(Uo.H)};
const HZ_FAR_CLAMP: f32 = ${Wo(Ro)};
const HZ_NEAR: f32 = ${Wo(Lo)};

// optical depth of one exponential layer from height hc along a ray with direction y component
// vy over distance d
fn hazeLayerDepth( sigma: f32, H: f32, hc: f32, vy: f32, d: f32 ) -> f32 {
	let base = exp( hc / - H ) * sigma;
	let k = vy * d / H;
	let fk = select( H * ( 1.0 - exp( - k ) ) / vy, d, abs( k ) < 1e-3 );
	return base * fk;
}

// unshadowed in-scatter depth of both layers from height hc along a ray (direction y component vy)
// over distance d: 1 - their transmittance
fn hazeInScatter( hc: f32, vy: f32, d: f32 ) -> f32 {
	return 1.0 - exp( - ( hazeLayerDepth( HZ_MARINE_SIGMA, HZ_MARINE_H, hc, vy, d ) + hazeLayerDepth( HZ_AEROSOL_SIGMA, HZ_AEROSOL_H, hc, vy, d ) ) * hazeParams.density );
}

// Cornette-Shanks (strong forward lobe) plus a little isotropic scattering
// (a softer lobe than coastal aerosol's ~0.76: toward the sun the haze glared over everything
// in front of it and washed distant foliage out to white)
fn hazePhase( cosT: f32 ) -> f32 {
	let g = 0.62; let g2 = g * g;
	let cs = 3.0 * ( 1.0 - g2 ) / ( 8.0 * PI * ( 2.0 + g2 ) ) * ( cosT * cosT + 1.0 ) / pow( max( 1.0 + g2 - cosT * 2.0 * g, 1e-4 ), 1.5 );
	return cs * 0.7 + 0.3 / ( 4.0 * PI );
}

struct HazeRay { dist: f32, dir: vec3f, sky: bool, rayLen: f32 };

// view distance of the pixel (reversed-Z depth, sky = 0) and its world direction
fn hazeRay( uv: vec2f ) -> HazeRay {
	let size = vec2f( textureDimensions( hazeDepth ) );
	let d = textureLoad( hazeDepth, vec2i( clamp( uv, vec2f( 0.0 ), vec2f( 0.9999 ) ) * size ), 0 );
	let ray = underwaterViewRay( uv );
	var r: HazeRay;
	r.rayLen = length( ray );
	r.sky = d < 1e-7;
	r.dist = select( min( - underwaterViewZ( max( d, 1e-9 ) ) * r.rayLen, HZ_FAR_CLAMP ), HZ_FAR_CLAMP, r.sky );
	r.dir = normalize( ( underwaterParams.camWorld * vec4f( ray, 0.0 ) ).xyz );
	return r;
}

// the march's hill shadow: terrainSunShadowAt with one filtered fetch instead of four loads (the
// texture is half float, filterable; the materials keep the loads: they are short of samplers)
fn hazeTerrainSun( P: vec3f ) -> f32 {
#if HZ_TERRAIN
	let s = textureSampleLevel( terrainSunShadowTex, smpLinearClamp, terrainUvOf( P.xz ), 0.0 );
	let w = s.y * 0.012 + 0.35;
	return mix( 1.0, smoothstep( -w, w, P.y - s.x ), terrainParams.sunBaked );
#else
	return 1.0;
#endif
}

// the march's sun visibility after the shadow map (hills, clouds), only where light is left
fn hazeVisibilityRest( P: vec3f, v0: f32 ) -> f32 {
	var v = v0;
#if HZ_TERRAIN
	if ( v > 0.0 ) { v *= hazeTerrainSun( P ); }
#endif
#if HZ_CLOUDS
	if ( v > 0.0 ) {
		let L = frame.sunDir;
		let g = P.xz - L.xz * ( max( P.y, 0.0 ) / max( L.y, 0.08 ) );
		v *= cloudsShadow( g );
	}
#endif
	return v;
}

// sun visibility at world position P: shadow cascades, hills, clouds
fn hazeVisibility( P: vec3f ) -> f32 {
	// (each lookup only where the ones before left some light)
	var v = sunShadowHard( P );
#if HZ_TERRAIN
	if ( v > 0.0 ) { v *= terrainSunShadowAt( P ); }
#endif
#if HZ_CLOUDS
	if ( v > 0.0 ) {
		// the cloud shadow map is the ground's shadow along the key light: follow the light down
		let L = frame.sunDir;
		let g = P.xz - L.xz * ( max( P.y, 0.0 ) / max( L.y, 0.08 ) );
		v *= cloudsShadow( g );
	}
#endif
	return v;
}

`}),this._module}get compositeModule(){return this._compositeModule||=new R({name:`haze-composite`,deps:[this.module],bindings:{hazeLow:{texture:()=>this.hist[this._hc].texture},hazeSS:{texture:()=>this.ssShafts.texture},hazeMedium:{texture:()=>this.mediumTexture||this.low.texture}},code:`
// c: the scene colour at uv. Returns the hazed colour.
//   geometry: c T + (1 - T) fog (1 - fSun (1 - h)) + (1 - h) E p(θ) lit - h fSun fog (all - lit)
//   sky:      c - fSun fog (all - lit)
// fog: sky radiance just above the horizon in the view direction; fSun: its sunlit share (phase
// weighted); lit / all: shadowed / unshadowed in-scatter depth from the march; h: 0 near the
// camera (explicit, shadowed sun single scattering: bright shafts) -> 1 far away and for the sky
// (only the shadowed share of the sky-coloured haze is removed: consistent with the sky)
fn hazeApply( uv: vec2f, c: vec4f ) -> vec4f {
	var out = c.rgb;
	${this.flatExterior?`var backdropBlend = 1.0;`:``}
	let isActive = frame.atmosphereQuality > 0.0 && hazeParams.enabled > 0.5 && frame.cameraUnderwater < 0.5;
	if ( isActive ) {
		var inAir = 1.0;
		if ( hazeParams.hasMedium > 0.5 ) {
			let ms = vec2i( textureDimensions( hazeMedium ) );
			inAir = select( 1.0, 0.0, textureLoad( hazeMedium, clamp( vec2i( uv * vec2f( ms ) ), vec2i( 0 ), ms - 1 ), 0 ).r > 0.5 );
		}
		if ( inAir > 0.5 ) {
			let R = hazeRay( uv );
			let dist = R.dist; let dir = R.dir; let sky = R.sky;
			${this.flatExterior?`if (sky) { backdropBlend = smoothstep(0.025, 0.06, dir.y); if (backdropBlend <= 0.0) { return c; } }`:``}
			let camH = max( underwaterParams.camPos.y - frame.seaLevel, 0.0 );

			// the haze looks like the sky just above the horizon in this direction
			let vh = normalize( vec3f( dir.x, max( dir.y, 0.02 ), dir.z ) );
			var fog = atmosphereSkyLuminance( vh );
#if HZ_MOON
			fog += skyMoonSky( vh );
#endif

			// sun (moon) light scattered toward the eye, and its share of the haze radiance
			let Ep = frame.sunColor * hazePhase( dot( dir, frame.sunDir ) );
			let eL = luminance( Ep );
			let fSun = eL / ( eL + luminance( frame.skyIrradiance ) + 1e-5 ) * min( hazeParams.shafts, 1.0 );
			let h = select( smoothstep( 0.0, HZ_NEAR, dist ), 1.0, sky );

			// ---- aerial perspective / marine haze on geometry (the water surface included)
			if ( ! sky ) {
				let tau = ( hazeLayerDepth( HZ_MARINE_SIGMA, HZ_MARINE_H, camH, dir.y, dist ) + hazeLayerDepth( HZ_AEROSOL_SIGMA, HZ_AEROSOL_H, camH, dir.y, dist ) ) * hazeParams.density;
				let T = exp( - tau );
				out = out * T + fog * ( 1.0 - T ) * ( 1.0 - fSun * ( 1.0 - h ) );
			}

			// ---- sun shafts: depth-aware upsample of the half resolution march
			if ( hazeParams.shafts > 0.0 ) {
				let ls = vec2i( textureDimensions( hazeLow ) );
				let pa = uv * vec2f( ls ) - 0.5;
				let i0 = floor( pa );
				let fr = pa - i0;
				var acc = vec2f( 0.0 );
				var wSum = 1e-6;
				for ( var k = 0; k < 4; k++ ) {
					let o = vec2i( k & 1, k >> 1u );
					let s = textureLoad( hazeLow, clamp( vec2i( i0 ) + o, vec2i( 0 ), ls - 1 ), 0 );
					let wb = select( 1.0 - fr.x, fr.x, o.x == 1 ) * select( 1.0 - fr.y, fr.y, o.y == 1 );
					let rel = abs( s.z - dist ) / max( dist, 0.5 );
					let wd = 1.0 / pow2( rel * 10.0 + 1.0 );
					let wt = wb * wd + 1e-5;
					acc += s.xy * wt;
					wSum += wt;
				}
				// The upsample carries the lit share of the in-scatter and the march's ratio to the exact
				// in-scatter; the exact in-scatter is then taken over this pixel's own ray. Upsampling the
				// in-scatter itself gave a thin frond in front of the low sun, whose half resolution
				// neighbours all lie far behind it, their long rays' in-scatter: bright, flickering specks.
				let sh = acc / wSum;
				let all = sh.y * hazeInScatter( camH, dir.y, min( dist, ${Wo(Io)} ) );
				let lit = sat( sh.x ) * all;
				let near = Ep * lit * ( 1.0 - h ) * hazeParams.shafts;
				let deficit = fog * fSun * ( all - lit ) * h;
				out = max( out + near - deficit, vec3f( 0.0 ) );
			}

			// ---- screen-space god rays: sun colour x phase x the near air's haze depth
			if ( hazeParams.ssFade > 0.001 ) {
				let rays = textureSampleLevel( hazeSS, smpLinearClamp, uv, 0.0 ).r;
				let k = 1.0 - exp( - HZ_MARINE_SIGMA * 300.0 * hazeParams.density );
				out += Ep * rays * k * hazeParams.shafts * hazeParams.ssFade * ${Wo(Vo)};
			}
		}
	}
	return vec4f( ${this.flatExterior?`mix(c.rgb, out, backdropBlend)`:`out`}, c.a );
}
`}),this._compositeModule}_build(){let e=this.module,t=this._defines(),n=new W({label:`haze march`,modules:[e],defines:t,colorFormats:[`rgba16float`],code:`
fn fragment( in: FSIn ) -> vec4f {
	let uv = in.uv;
	let R = hazeRay( uv );
	var out = vec4f( 0.0, 0.0, R.dist, 1.0 );
	${this.flatExterior?`if (R.sky && R.dir.y <= 0.025) { return out; }`:``}
	if ( hazeParams.enabled > 0.5 && frame.cameraUnderwater < 0.5 && hazeParams.shafts > 0.0 ) {
		let cam = underwaterParams.camPos;
		let tMax = min( R.dist, ${Wo(Io)} );
		// interleaved gradient noise, decorrelated per frame (golden ratio sequence)
		let jitter = fract( interleavedGradientNoise( in.pos.xy ) + hazeParams.frame * 0.61803398875 );
		let sigM = HZ_MARINE_SIGMA * hazeParams.density;
		let sigA = HZ_AEROSOL_SIGMA * hazeParams.density;
		var lit = 0.0; var all = 0.0; var tau = 0.0; var tPrev = 0.0;
		// the ray in each cascade's light space is linear in t: its end points, once
		let fwd = - vec3f( frame.view[ 0 ][ 2 ], frame.view[ 1 ][ 2 ], frame.view[ 2 ][ 2 ] );
		var sc0: array<vec4f, 4>; var scd: array<vec4f, 4>;
		for ( var c = 0; c < i32( shadowParams.count ); c++ ) {
			sc0[ c ] = shadowParams.matrices[ c ] * vec4f( cam, 1.0 );
			scd[ c ] = shadowParams.matrices[ c ] * vec4f( R.dir, 0.0 );
		}
		for ( var i = 0; i < ${Fo}; i++ ) {
			// quadratic spacing: dense near the camera (palm and pier shafts), sparse far out (clouds, hills)
			let u = ( f32( i ) + jitter ) / ${Wo(Fo)};
			let t = u * u * tMax;
			let dt = u * ${Wo(2/Fo)} * tMax;
			let P = cam + R.dir * t;
			let h = max( P.y - frame.seaLevel, 0.0 );
			let sig = exp( h / - HZ_MARINE_H ) * sigM + exp( h / - HZ_AEROSOL_H ) * sigA;
			tau += sig * ( t - tPrev );
			tPrev = t;
			let Tr = exp( - tau );
			let w = sig * Tr * dt;
			// sunShadowHard( P ) with the hoisted light-space ray
			var v = 1.0;
			if ( shadowParams.enabled > 0.5 ) {
				let c = shadowCascadeOf( dot( P - frame.cameraPos, fwd ) );
				if ( c >= 0 ) {
					let sc = sc0[ c ] + scd[ c ] * t;
					let suv = vec2f( sc.x * 0.5 + 0.5, 0.5 - sc.y * 0.5 );
					if ( ! ( any( suv <= vec2f( 0.0 ) ) || any( suv >= vec2f( 1.0 ) ) || sc.z > 1.0 ) ) {
						v = select( 0.0, 1.0, sc.z - 2e-5 <= _shadowDepth( suv, c ) );
					}
				}
			}
			lit += w * hazeVisibilityRest( P, v );
			all += w;
		}
		// The lit share of the in-scatter (0..1) and the ratio of the marched in-scatter to its exact
		// value over this ray: both smooth across depth edges, unlike the in-scatter itself, which
		// grows with the distance (see the composite)
		let exact = hazeInScatter( max( cam.y - frame.seaLevel, 0.0 ), R.dir.y, tMax );
		out = vec4f( lit / max( all, 1e-12 ), all / max( exact, 1e-12 ), R.dist, 1.0 );
	}
	return out;
}
`}),r=new W({label:`haze sun mask`,modules:[e],defines:t,colorFormats:[`r16float`],code:`
fn fragment( in: FSIn ) -> vec4f {
	var out = vec4f( 0.0 );
	if ( hazeParams.ssFade > 0.001 ) {
		let uv = in.uv;
		let dir = underwaterWorldDir( uv );
		${this.flatExterior?`if (dir.y <= 0.025) { return out; }`:``}
#if HZ_CLOUDS
		let cloudT = cloudsSunTransmittance( cloudsSampleView( dir ).a );
#else
		let cloudT = 1.0;
#endif
		let size = vec2f( textureDimensions( hazeDepth ) );
		let d = textureLoad( hazeDepth, vec2i( clamp( uv, vec2f( 0.0 ), vec2f( 0.9999 ) ) * size ), 0 );
		let c = dot( dir, frame.sunDir );
		let glow = exp( ( c - 1.0 ) * 600.0 ) + exp( ( c - 1.0 ) * 50.0 ) * 0.25;
		out = vec4f( select( 0.0, glow * cloudT, d < 1e-7 ), 0.0, 0.0, 1.0 );
	}
	return out;
}
`}),i=[0,1,2].map(t=>{let n=.95/zo**+t,r=Bo[t],i=``,a=0;for(let e=0;e<zo;e++){let t=r**+e;i+=`\t\tacc += textureSampleLevel( hzSrc, smpLinearClamp, uv + step * ( ${Wo(e)} + jit ), 0.0 ).r * ${Wo(t)};\n`,a+=t}return new W({label:`haze god rays `+t,modules:[e],bindings:{hzSrc:{texture:()=>this.ssTargets[t].texture}},colorFormats:[`r16float`],code:`
fn fragment( in: FSIn ) -> vec4f {
	var out = vec4f( 0.0 );
	if ( hazeParams.ssFade > 0.001 ) {
		let uv = in.uv;
		let step = ( hazeParams.sunUV - uv ) * ${Wo(n/zo)};
		// taps shifted by a per pixel, per frame fraction of a step: the fixed taps drew hard radial
		// streaks through cloud gaps and foliage; jittered, the temporal resolve blends them
		// (centred on 0: the average over frames keeps the fixed taps' result)
		let jit = fract( interleavedGradientNoise( in.pos.xy ) + hazeParams.frame * 0.61803398875 + ${Wo(t*.37)} ) - 0.5;
		var acc = 0.0;
${i}
		out = vec4f( acc / ${Wo(a)}, 0.0, 0.0, 1.0 );
	}
	return out;
}
`})}),a=[0,1].map(n=>new W({label:`haze shafts temporal`,modules:[e],defines:t,bindings:{hzCur:{texture:()=>this.low.texture},hzPrev:{texture:()=>this.hist[n].texture}},colorFormats:[`rgba16float`],code:`
fn fragment( in: FSIn ) -> vec4f {
	let size = vec2i( textureDimensions( hzCur ) );
	let p = vec2i( in.pos.xy );
	let cur = textureLoad( hzCur, p, 0 );
	var out = cur;
	if ( hazeParams.histValid > 0.5 ) {
		var lo = cur.xy; var hi = cur.xy;
		for ( var k = 0; k < 9; k++ ) {
			let s = textureLoad( hzCur, clamp( p + vec2i( k % 3 - 1, k / 3 - 1 ), vec2i( 0 ), size - 1 ), 0 ).xy;
			lo = min( lo, s ); hi = max( hi, s );
		}
		let R = hazeRay( in.uv );
		let world = underwaterParams.camPos + R.dir * cur.z;
		let clip = frame.prevViewProjNoJitter * vec4f( world, 1.0 );
		if ( clip.w > 1e-4 ) {
			let puv = clip.xy / clip.w * vec2f( 0.5, -0.5 ) + 0.5;
			if ( all( puv >= vec2f( 0.0 ) ) && all( puv <= vec2f( 1.0 ) ) ) {
				let prev = textureSampleLevel( hzPrev, smpLinearClamp, puv, 0.0 );
				let expect = length( world - frame.prevCameraPos );
				if ( abs( prev.z - expect ) < expect * 0.05 + 0.3 ) {
					out = vec4f( mix( clamp( prev.xy, lo, hi ), cur.xy, 0.12 ), cur.z, 1.0 );
				}
			}
		}
	}
	return out;
}
`}));this._passes={march:n,mask:r,blur:i,temporal:a}}},qo={value:new F},Jo=new F,Yo=new F,Xo=!1;function Zo(e){e.updateMatrixWorld(),e.matrixWorldInverse&&e.matrixWorldInverse.copy(e.matrixWorld).invert(),Yo.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),Xo?qo.value.copy(Jo):qo.value.copy(Yo),Jo.copy(Yo),Xo=!0}var Qo=class{constructor(e,t,n){this.camera=e,this.dom=t,this.input=n,this.yaw=0,this.pitch=0,this.speed=8,this.enabled=!0,this.velocity=new N,this._fwd=new N,this._right=new N}setPose(e,t,n){this.camera.position.copy(e),this.yaw=t,this.pitch=n,this.apply()}apply(){this.camera.rotation.set(this.pitch,this.yaw,0,`YXZ`)}update(e){if(!this.enabled)return;let t=this.input,n=t.consumeLook();this.yaw-=n.x*.0022,this.pitch-=n.y*.0022,this.pitch=Math.max(-1.55,Math.min(1.55,this.pitch)),this.apply();let r=t.down(`ShiftLeft`)||t.down(`ShiftRight`),i=this.speed*(r?6:1);this.camera.getWorldDirection(this._fwd),this._right.crossVectors(this._fwd,this.camera.up).normalize();let a=new N;t.down(`KeyW`)&&a.add(this._fwd),t.down(`KeyS`)&&a.sub(this._fwd),t.down(`KeyD`)&&a.add(this._right),t.down(`KeyA`)&&a.sub(this._right),(t.down(`KeyE`)||t.down(`Space`))&&(a.y+=1),(t.down(`KeyQ`)||t.down(`KeyC`))&&--a.y,a.lengthSq()>0&&a.normalize().multiplyScalar(i),this.velocity.lerp(a,1-Math.exp(-e*8)),this.camera.position.addScaledVector(this.velocity,e)}};function $o(e){return!!e&&e.maxComputeWorkgroupStorageSize>=16384&&e.maxComputeInvocationsPerWorkgroup>=256&&e.maxComputeWorkgroupSizeX>=256&&e.maxStorageTexturesPerShaderStage>=4&&e.maxStorageBuffersPerShaderStage>=3}function es(e){let t=``;for(let e=0;e<8;e++){let n=1<<e;t+=`
  {
    let pos = t & ${n-1}u;
    let i = ((t >> ${e}u) << ${e+1}u) | pos;
    let j = i + ${n}u;
    let ang = f32(pos) * ${(Math.PI/n).toFixed(12)};
    let w = vec2f(cos(ang), sin(ang));
    let i2 = (i * 2u + lane) * 2u;
    let j2 = (j * 2u + lane) * 2u;
    let a0 = fftShared[i2]; let a1 = fftShared[i2 + 1u];
    let b0 = fftCmul2(fftShared[j2], w);
    let b1 = fftCmul2(fftShared[j2 + 1u], w);
    fftShared[i2] = a0 + b0;
    fftShared[i2 + 1u] = a1 + b1;
    fftShared[j2] = a0 - b0;
    fftShared[j2 + 1u] = a1 - b1;
    workgroupBarrier();
  }`}return e+`
var<workgroup> fftShared: array<vec4f, 1024>;
@compute @workgroup_size(256, 1, 1)
fn main(@builtin(local_invocation_id) lid: vec3u, @builtin(workgroup_id) wid: vec3u) {
  let lane = lid.x & 1u;
  let t = lid.x >> 1u;
  let col = wid.x * 2u + lane;
  let c = wid.y;
  let base = c * 65536u;
  for (var e = 0u; e < 2u; e++) {
    let y = t + e * 128u;
    let idx = base + y * 256u + col;
    let r = (fftBitReverse8(y) * 2u + lane) * 2u;
    fftShared[r] = tmp[idx * 2u];
    fftShared[r + 1u] = tmp[idx * 2u + 1u];
  }
  workgroupBarrier();
${t}
  let lambda = ocean.choppiness;
  for (var e = 0u; e < 2u; e++) {
    let y = t + e * 128u;
    let idx = base + y * 256u + col;
    let k = (y * 2u + lane) * 2u;
    let sign = select(-1.0, 1.0, ((col + y) & 1u) == 0u);
    let A = fftShared[k] * sign;
    let B = fftShared[k + 1u] * sign;
    let Dx = A.x; let Dz = A.y; let Dy = A.z; let Dxz = A.w;
    let Dyx = B.x; let Dyz = B.y; let Dxx = B.z; let Dzz = B.w;
    let jxx = lambda * Dxx + 1.0;
    let jzz = lambda * Dzz + 1.0;
    let jxz = lambda * Dxz;
    let J = jxx * jzz - jxz * jxz;
    let prev = foam[idx];
    let gen = sat((ocean.foamBias - J) * ocean.foamGain);
    let f = prev * exp(-ocean.foamDecay * frame.dt) + gen * ocean.foamAdd * frame.dt;
    let fNew = clamp(max(f, gen * 0.5), 0.0, 1.5);
    foam[idx] = fNew;
    let uv = vec2u(col, y);
    let vDisp = vec4f(lambda * Dx, Dy, lambda * Dz, fNew);
    let vDeriv = vec4f(Dyx, Dyz, lambda * Dxx, lambda * Dzz);
    textureStore(dispOut, uv, c, vDisp);
    textureStore(derivOut, uv, c, vDeriv);
    // Each invocation owns these two entries: all FFT stages have finished.
    fftShared[k] = vDisp;
    fftShared[k + 1u] = vDeriv;
  }
  // Both columns' postprocessed values must be visible before forming mip 1.
  workgroupBarrier();
  if (lane == 0u) {
    let a = t * 8u;
    // Exactly baseline's left-to-right ((a+b)+c)+d order; not (a+c)+(b+d).
    let vd = (fftShared[a] + fftShared[a + 2u] + fftShared[a + 4u] + fftShared[a + 6u]) * 0.25;
    let vn = (fftShared[a + 1u] + fftShared[a + 3u] + fftShared[a + 5u] + fftShared[a + 7u]) * 0.25;
    textureStore(dispMip1, vec2u(wid.x, t), c, vd);
    textureStore(derivMip1, vec2u(wid.x, t), c, vn);
    let dst = (c * 16384u + t * 128u + wid.x) * 2u;
    // Preserve full precision for subsequent mips, even though output textures are rgba16float.
    mipSrc[dst] = vd;
    mipSrc[dst + 1u] = vn;
  }
}`}function ts(e,t,n,r,i,a,o=!1){let s=r*2,c=n?`${n}[ly * ${r}u + lx] = v;`:o?`mipMid[(c * 64u + gy * 8u + gx) * 2u + ${a}u] = v;`:``;return`
  if (lx < ${r}u && ly < ${r}u) {
    let i = ly * ${s*2}u + lx * 2u;
    let v = (${t}[i] + ${t}[i + 1u] + ${t}[i + ${s}u] + ${t}[i + ${s+1}u]) * 0.25;
    textureStore(${e}${i}, vec2u(gx * ${r}u + lx, gy * ${r}u + ly), c, v);
    ${c}
  }`}function ns(e){if(e===null)return[[`d`,0],[`n`,1]];if(e!==0&&e!==1)throw RangeError(`Field channel must be 0, 1, or null`);return[[e===0?`d`:`n`,e]]}function rs(e=null){let t=ns(e),n=``;for(let[e]of t)n+=`var<workgroup> ${e}2: array<vec4f, 64>;
var<workgroup> ${e}3: array<vec4f, 16>;
var<workgroup> ${e}4: array<vec4f, 4>;
`;n+=`fn src(c: u32, x: u32, y: u32, channel: u32) -> vec4f {
  return mipSrc[(c * 16384u + y * 128u + x) * 2u + channel];
}
@compute @workgroup_size(8, 8, 1)
fn main(@builtin(local_invocation_id) lid: vec3u, @builtin(workgroup_id) wid: vec3u) {
  let lx = lid.x; let ly = lid.y;
  let gx = wid.x; let gy = wid.y; let c = wid.z;
  let x2 = gx * 8u + lx; let y2 = gy * 8u + ly;
  let x = x2 * 2u; let y = y2 * 2u;
`;for(let[e,r]of t)n+=`  {
    let v = (src(c, x, y, ${r}u) + src(c, x + 1u, y, ${r}u) + src(c, x, y + 1u, ${r}u) + src(c, x + 1u, y + 1u, ${r}u)) * 0.25;
    textureStore(${e}Out2, vec2u(x2, y2), c, v);
    ${e}2[ly * 8u + lx] = v;
  }
`;n+=`  workgroupBarrier();
`;for(let[e,r]of[[3,4],[4,2],[5,1]]){for(let[i,a]of t)n+=ts(`${i}Out`,`${i}${e-1}`,e<5?`${i}${e}`:null,r,e,a,e===5);e<5&&(n+=`
  workgroupBarrier();
`)}return n+`
}`}function is(e=null){let t=ns(e),n=``;for(let[e]of t)n+=`var<workgroup> ${e}5: array<vec4f, 64>;
var<workgroup> ${e}6: array<vec4f, 16>;
var<workgroup> ${e}7: array<vec4f, 4>;
`;n+=`@compute @workgroup_size(8, 8, 1)
fn main(@builtin(local_invocation_id) lid: vec3u, @builtin(workgroup_id) wid: vec3u) {
  let lx = lid.x; let ly = lid.y; let c = wid.z;
  let gx = 0u; let gy = 0u;
  let i = (c * 64u + ly * 8u + lx) * 2u;
`;for(let[e,r]of t)n+=`  ${e}5[ly * 8u + lx] = mipMid[i + ${r}u];\n`;n+=`  workgroupBarrier();
`;for(let[e,r]of[[6,4],[7,2],[8,1]]){for(let[i,a]of t)n+=ts(`${i}Out`,`${i}${e-1}`,e<8?`${i}${e}`:null,r,e,a);e<8&&(n+=`
  workgroupBarrier();
`)}return n+`
}`}function as(e,{ComputeKernel:t,commonModule:n,fftCommon:r,oceanU:i,limits:a}){if(!$o(a))throw Error(`Insufficient negotiated limits for paired columns`);let o=e=>({storage:e,access:`read_write`}),s=(e,t)=>({storageTexture:e,access:`write`,view:{dimension:`2d-array`,baseMipLevel:t,mipLevelCount:1}}),c=e.displacementTexture,l=e.derivativeTexture;e.columnKernel=new t({label:`Ocean Paired Columns + Mip1`,modules:[n],bindings:{...i,tmp:o(e.tmp),foam:o(e.foam),mipSrc:o(e.mipSrc),dispOut:s(c,0),derivOut:s(l,0),dispMip1:s(c,1),derivMip1:s(l,1)},workgroupSize:[256,1,1],code:es(r)}),e.fusedMipFields=a.maxStorageTexturesPerShaderStage>=8;let u=e.derivativeOnly?[1]:e.fusedMipFields?[null]:[0,1];e.mipKernelsA=u.map(n=>{let r={mipSrc:o(e.mipSrc),mipMid:o(e.mipMid)};for(let[e,t]of ns(n))for(let n=2;n<=5;n++)r[`${e}Out${n}`]=s(t===0?c:l,n);return new t({label:`Ocean Paired Mips 2-5`+(n===null?``:` field${n}`),bindings:r,workgroupSize:[8,8,1],code:rs(n)})}),e.mipKernelsB=u.map(n=>{let r={mipMid:o(e.mipMid)};for(let[e,t]of ns(n))for(let n=6;n<=8;n++)r[`${e}Out${n}`]=s(t===0?c:l,n);return new t({label:`Ocean Paired Mips 6-8`+(n===null?``:` field${n}`),bindings:r,workgroupSize:[8,8,1],code:is(n)})})}function os(e,t){let n=e===`Ocean FFT Rows`,r=e===`Ocean FFT Columns`,i=e===`Ocean Paired Columns + Mip1`;return t=t.replaceAll(`let c = i32( gid.z );`,`let c = i32( gid.z ) + 2;`).replaceAll(`let c = wid.y;`,`let c = wid.y + 2u;`).replaceAll(`let c = wid.z;`,`let c = wid.z + 2u;`).replace(`let idx = gid.z *`,`let idx = ( gid.z + 2u ) *`),e===`Ocean Copy H0`&&(t=t.replace(/\s*foam\[ idx \] = 0\.0;/,``)),n?t:((n||r)&&(t=t.replace(/let a0 = fftShared\[ i2 \]; /g,``).replace(/let b0 = fftCmul2\( fftShared\[ j2 \], w \); /g,``),t=t.replace(/^\s*fftShared\[ (?:i2|j2) \] = a0 [+-] b0;\n/gm,``),n&&(t=t.replace(/\s*\/\/ Dx_hat[\s\S]*?(?=\s*\/\/ c2 =)/,`
`),t=t.replace(/^\s*fftShared\[ r \] = vec4f\( c0, c1 \);\n/gm,``).replace(/^\s*tmp\[ o \] = fftShared\[ x \* 2u \];\n/gm,``)),r&&(t=t.replace(/^\s*fftShared\[ r \] = tmp\[ idx \* 2u \];\n/gm,``).replace(/^\s*let A = fftShared\[ y \* 2u \] \* sign;\n/gm,``).replace(/^\s*let Dx = A.x;[^\n]*\n/gm,``).replace(/\s*let jxx = lambda \* Dxx \+ 1\.0;[\s\S]*?(?=\s*let uv =)/,`
`).replace(/^\s*let vDisp = [^;]+;\n/gm,``).replace(/^\s*textureStore\( dispOut,[^\n]+\n/gm,``).replace(/^\s*mipSrc\[ idx \* 2u \] = vDisp;\n/gm,``))),i&&(t=t.replace(/let a0 = fftShared\[i2\]; /g,``).replace(/\s*let b0 = fftCmul2\(fftShared\[j2\], w\);/g,``),t=t.replace(/^\s*fftShared\[(?:i2|j2)\] = a0 [+-] b0;\n/gm,``).replace(/^\s*fftShared\[r\] = tmp\[idx \* 2u\];\n/gm,``).replace(/^\s*let A = fftShared\[k\] \* sign;\n/gm,``).replace(/^\s*let Dx = A.x;[^\n]*\n/gm,``).replace(/\s*let jxx = lambda \* Dxx \+ 1\.0;[\s\S]*?(?=\s*let uv =)/,`
`).replace(/^\s*let vDisp = [^;]+;\n/gm,``).replace(/^\s*textureStore\(dispOut,[^\n]+\n/gm,``).replace(/^\s*fftShared\[k\] = vDisp;\n/gm,``).replace(/^\s*let vd = [^;]+;\n/gm,``).replace(/^\s*textureStore\(dispMip1,[^\n]+\n/gm,``).replace(/^\s*mipSrc\[dst\] = vd;\n/gm,``)),t)}var q=256,ss=8,cs=q/2,ls=[733,157,33.3,7.1],us=Math.PI*2,ds=class{constructor(e={}){this.scale=e.scale??1,this.windSpeed=e.windSpeed??8,this.windDirection=e.windDirection??20,this.fetch=e.fetch??200,this.spreadBlend=e.spreadBlend??.9,this.swell=e.swell??.2,this.peakEnhancement=e.peakEnhancement??3.3,this.shortWavesFade=e.shortWavesFade??.01}},fs=`
const FFT_N: u32 = ${q}u;
const FFT_HALF: u32 = ${cs}u;
const FFT_G: f32 = ${Rr};

fn fftBitReverse8( v: u32 ) -> u32 {
	var r = v;
	r = ( ( r & 0x55u ) << 1u ) | ( ( r >> 1u ) & 0x55u );
	r = ( ( r & 0x33u ) << 2u ) | ( ( r >> 2u ) & 0x33u );
	r = ( ( r & 0x0Fu ) << 4u ) | ( ( r >> 4u ) & 0x0Fu );
	return r;
}

// complex multiply of two packed complex numbers (v.xy, v.zw) by scalar complex w
fn fftCmul2( v: vec4f, w: vec2f ) -> vec4f {
	return vec4f( v.x * w.x - v.y * w.y, v.x * w.y + v.y * w.x, v.z * w.x - v.w * w.y, v.z * w.y + v.w * w.x );
}

// PCG hash
fn fftPcg( v: u32 ) -> u32 {
	let state = v * 747796405u + 2891336453u;
	let word = ( ( state >> ( ( state >> 28u ) + 4u ) ) ^ state ) * 277803737u;
	return ( word >> 22u ) ^ word;
}
fn fftToUnit( h: u32 ) -> f32 { return f32( h >> 8u ) * ( 1.0 / 16777216.0 ) + ( 0.5 / 16777216.0 ); }
`,ps=class{constructor(e,t={}){if(this.renderer=e,this.cascades=t.cascades??4,this.derivativeOnly=t.derivativeOnly===!0,this.mipFactory=t.mipFactory??null,this.derivativeOnly&&this.cascades!==4)throw Error(`Rocha derivatives retain logical cascades 2 and 3 of four`);this.fusedMips=t.fusedMips??new URLSearchParams(globalThis.location?.search||``).has(`fusedOcean`),this.fusedMips&&!$o(I.limits)&&(console.warn(`Fused ocean unsupported by negotiated limits; retaining original kernels.`),this.fusedMips=!1),this.sizes=(t.sizes??ls).slice(0,this.cascades),this.depth=t.depth??500,this.local=new ds(t.local??{windSpeed:7,windDirection:25,fetch:120,spreadBlend:.85,swell:.05}),this.swell=new ds(t.swell??{scale:.48,windSpeed:6,windDirection:5,fetch:1200,spreadBlend:1,swell:.9,shortWavesFade:.1});let n=this.cascades;this.params=new L(`OceanParams`,{sizes:[`vec4f[4]`,[0,1,2,3].map(e=>new P(this.sizes[e]??1,0,0,0))],cuts:[`vec4f[4]`,[0,1,2,3].map(()=>new P)],sysA:[`vec4f[2]`,[new P,new P]],sysB:[`vec4f[2]`,[new P,new P]],choppiness:[`f32`,t.choppiness??.9],foamBias:[`f32`,.58],foamGain:[`f32`,3],foamDecay:[`f32`,.35],foamAdd:[`f32`,2.5],time:[`f32`,0],depth:[`f32`,this.depth],seed:[`u32`,1337]},{label:`ocean`});let r=this.params.fields;this.choppiness=r.choppiness,this.foamBias=r.foamBias,this.foamGain=r.foamGain,this.foamDecay=r.foamDecay,this.foamAdd=r.foamAdd,this.time=r.time,this.uDepth=r.depth,this.uSeed=r.seed,this.timeScale=1;let i=q*q*n;this.h0=new li({label:`fftH0`,count:i,type:`vec4f`}),this.waveData=new li({label:`fftWave`,count:i,type:`vec4f`}),this.tmp=new li({label:`fftTmp`,count:i*2,type:`vec4f`}),this.foam=new li({label:`fftFoam`,count:i,type:`f32`}),this.mipSrc=new li({label:`fftMipSrc`,count:this.fusedMips?i/2:i*2,type:`vec4f`}),this.mipMid=new li({label:`fftMipMid`,count:64*n*2,type:`vec4f`});let a=e=>new H({label:e,width:q,height:q,depth:n,dimension:`2d-array`,format:`rgba16float`,mips:!0,usage:[`sample`,`storage`,`copyDst`,`copySrc`],sampler:`linearRepeat`});this.displacementTexture=a(`oceanDisplacement`),this.derivativeTexture=a(`oceanDerivatives`),this.module=new R({name:`ocean`,deps:[z],uniforms:this.params,uniformName:`ocean`,bindings:{oceanDisplacement:{texture:this.displacementTexture,viewDimension:`2d-array`},oceanDerivatives:{texture:this.derivativeTexture,viewDimension:`2d-array`}},code:`
const OCEAN_CASCADES: i32 = ${n};
const OCEAN_FFT_SIZE: f32 = ${q}.0;

// Sample all cascades' displacement at world xz (explicit mip level).
fn oceanSampleDisplacement( xz: vec2f, level: f32 ) -> vec3f {
	var sum = vec3f( 0.0 );
	for ( var c = 0; c < OCEAN_CASCADES; c++ ) {
		sum += textureSampleLevel( oceanDisplacement, smpLinearRepeat, xz / ocean.sizes[ c ].x, c, level ).xyz;
	}
	return sum;
}

// ... with a weight per cascade
fn oceanSampleDisplacementWeighted( xz: vec2f, level: f32, w: vec4f ) -> vec3f {
	var sum = vec3f( 0.0 );
	for ( var c = 0; c < OCEAN_CASCADES; c++ ) {
		sum += textureSampleLevel( oceanDisplacement, smpLinearRepeat, xz / ocean.sizes[ c ].x, c, level ).xyz * w[ c ];
	}
	return sum;
}
`}),this._buildKernels(),this.updateSpectrumUniforms(),this.needsSpectrum=!0}get uSizes(){return{array:this.sizes}}setCascadeSizes(e){this.sizes=e.slice(0,this.cascades),this.updateSpectrumUniforms()}updateSpectrumUniforms(){let e=this.cascades,t=this.params.fields;for(let n=0;n<e;n++){let r=n===0?1e-4:us/this.sizes[n]*6,i=n===e-1?9999:us/this.sizes[n+1]*6;t.cuts.value[n].set(r,i,0,0),t.sizes.value[n].set(this.sizes[n],0,0,0)}t.depth.value=this.depth;let n=[this.local,this.swell];for(let e=0;e<2;e++){let r=n[e],i=Math.max(1,r.fetch)*1e3,a=Math.max(.1,r.windSpeed),o=.076*(Rr*i/(a*a))**-.22,s=22*(a*i/(Rr*Rr))**-.33;t.sysA.value[e].set(r.scale,A.degToRad(r.windDirection),r.spreadBlend,r.swell),t.sysB.value[e].set(o,s,r.peakEnhancement,r.shortWavesFade)}this.params.set(`cuts`,t.cuts.value),this.params.set(`sizes`,t.sizes.value),this.params.set(`sysA`,t.sysA.value),this.params.set(`sysB`,t.sysB.value),this.needsSpectrum=!0}_buildKernels(){this.cascades;let e={ocean:{uniform:this.params}},t=e=>({storage:e,access:`read_write`}),n=this.derivativeOnly,r=class extends Mi{constructor(e){super(n?{...e,code:os(e.label,e.code)}:e)}};this.initSpectrumKernel=new r({label:`Ocean Init Spectrum`,modules:[z],bindings:{...e,h0:t(this.h0),waveData:t(this.waveData)},workgroupSize:[16,16,1],code:fs+`
fn dispersion( k: f32 ) -> f32 { return sqrt( k * FFT_G * tanh( min( k * ocean.depth, 20.0 ) ) ); }

fn dispersionDerivative( k: f32 ) -> f32 {
	let kd = min( k * ocean.depth, 20.0 );
	let th = tanh( kd );
	let ch = cosh( kd );
	return FFT_G * ( ocean.depth * k / ( ch * ch ) + th ) / dispersion( k ) * 0.5;
}

fn tmaCorrection( omega: f32 ) -> f32 {
	let omegaH = omega * sqrt( ocean.depth / FFT_G );
	let a = omegaH * omegaH * 0.5;
	let b = 1.0 - pow( 2.0 - omegaH, 2.0 ) * 0.5;
	return select( select( 1.0, b, omegaH < 2.0 ), a, omegaH <= 1.0 );
}

fn jonswap( omega: f32, sysA: vec4f, sysB: vec4f ) -> f32 {
	let alpha = sysB.x; let peakOmega = sysB.y; let gamma = sysB.z;
	let sigma = select( 0.09, 0.07, omega <= peakOmega );
	let d = omega - peakOmega;
	let r = exp( - d * d / ( sigma * sigma * peakOmega * peakOmega * 2.0 ) );
	let inv = 1.0 / omega;
	let po = peakOmega * inv;
	return sysA.x * tmaCorrection( omega ) * alpha * ( FFT_G * FFT_G )
		* pow( inv, 5.0 )
		* exp( pow( po, 4.0 ) * -1.25 )
		* pow( abs( gamma ), r );
}

fn normalisationFactor( s: f32 ) -> f32 {
	let s2 = s * s; let s3 = s2 * s; let s4 = s3 * s;
	let lo = s4 * -0.000564 + s3 * 0.00776 - s2 * 0.044 + s * 0.192 + 0.163;
	let hi = s4 * -4.80e-08 + s3 * 1.07e-05 - s2 * 9.53e-04 + s * 5.90e-02 + 3.93e-01;
	return select( hi, lo, s < 5.0 );
}

fn directionSpectrum( theta: f32, omega: f32, sysA: vec4f, sysB: vec4f ) -> f32 {
	let peakOmega = sysB.y;
	let ratio = omega / peakOmega;
	let spreadPower = select( pow( abs( ratio ), 5.0 ) * 6.97, pow( abs( ratio ), -2.5 ) * 9.77, omega > peakOmega );
	let s = spreadPower + tanh( min( ratio, 20.0 ) ) * 16.0 * sysA.w * sysA.w;
	let dTheta = theta - sysA.y;
	let cos2s = normalisationFactor( s ) * pow( abs( cos( dTheta * 0.5 ) ), s * 2.0 );
	let cosT = cos( dTheta );
	let base = cosT * cosT * ( 2.0 / PI ) * select( 0.0, 1.0, cosT > 0.0 );
	return mix( base, cos2s, sysA.z );
}

fn shortWavesFade( k: f32, sysB: vec4f ) -> f32 { return exp( - sysB.w * sysB.w * k * k ); }

@compute @workgroup_size( WG_X, WG_Y, WG_Z )
fn main( @builtin( global_invocation_id ) gid: vec3u ) {
	let x = i32( gid.x ); let y = i32( gid.y ); let c = i32( gid.z );
	let idx = c * ${q*q} + y * ${q} + x;

	let L = ocean.sizes[ c ].x;
	let dk = TWO_PI / L;
	let kx = f32( x - ${cs} ) * dk;
	let kz = f32( y - ${cs} ) * dk;
	let kLen = length( vec2f( kx, kz ) );

	var outH = vec4f( 0.0 );
	var outW = vec4f( kx, kz, 0.0, 0.0 );

	if ( kLen >= ocean.cuts[ c ].x && kLen <= ocean.cuts[ c ].y ) {
		let omega = dispersion( kLen );
		let dOmega = dispersionDerivative( kLen );
		let theta = atan2( kz, kx );

		let sa0 = ocean.sysA[ 0 ]; let sb0 = ocean.sysB[ 0 ];
		let sa1 = ocean.sysA[ 1 ]; let sb1 = ocean.sysB[ 1 ];

		let S0 = jonswap( omega, sa0, sb0 ) * directionSpectrum( theta, omega, sa0, sb0 ) * shortWavesFade( kLen, sb0 );
		let S1 = jonswap( omega, sa1, sb1 ) * directionSpectrum( theta, omega, sa1, sb1 ) * shortWavesFade( kLen, sb1 );
		let S = max( S0 + S1, 0.0 );

		// E|h0|^2 = S(k) dk^2 / 2 so that var(height) = sum S(k) dk^2 (h has both +k and -k terms)
		let amp = sqrt( S * abs( dOmega ) / kLen * dk * dk ) * 0.5;

		// gaussian random pair (Box-Muller)
		let seed = u32( idx ) * 4u + ocean.seed * 7919u;
		let u1 = fftToUnit( fftPcg( seed ) );
		let u2 = fftToUnit( fftPcg( seed + 1u ) );
		let r = sqrt( log( u1 ) * -2.0 );
		let g0 = r * cos( u2 * TWO_PI );
		let g1 = r * sin( u2 * TWO_PI );

		outH = vec4f( g0 * amp, g1 * amp, 0.0, 0.0 );
		outW = vec4f( kx, kz, 1.0 / kLen, omega );
	}

	h0[ idx ] = outH;
	waveData[ idx ] = outW;
}`}),this.conjugateKernel=new r({label:`Ocean Conjugate`,bindings:{h0:t(this.h0),tmp:t(this.tmp)},workgroupSize:[16,16,1],code:`
@compute @workgroup_size( WG_X, WG_Y, WG_Z )
fn main( @builtin( global_invocation_id ) gid: vec3u ) {
	let x = i32( gid.x ); let y = i32( gid.y ); let c = i32( gid.z );
	let base = c * ${q*q};
	let idx = base + y * ${q} + x;
	let xm = ( ${q} - x ) % ${q};
	let ym = ( ${q} - y ) % ${q};
	let idxm = base + ym * ${q} + xm;
	let hm = h0[ idxm ].xy;
	let cur = h0[ idx ].xy;
	tmp[ idx ] = vec4f( cur.x, cur.y, hm.x, - hm.y );
}`}),this.copyH0Kernel=new r({label:`Ocean Copy H0`,bindings:{h0:t(this.h0),tmp:t(this.tmp),foam:t(this.foam)},workgroupSize:[16,16,1],code:`
@compute @workgroup_size( WG_X, WG_Y, WG_Z )
fn main( @builtin( global_invocation_id ) gid: vec3u ) {
	let idx = gid.z * ${q*q}u + gid.y * ${q}u + gid.x;
	h0[ idx ] = tmp[ idx ];
	foam[ idx ] = 0.0;
}`});let i=``;for(let e=0;e<ss;e++){let t=1<<e;i+=`
	{
		let pos = t & ${t-1}u;
		let i = ( ( t >> ${e}u ) << ${e+1}u ) | pos;
		let j = i + ${t}u;
		let ang = f32( pos ) * ${(Math.PI/t).toFixed(12)};
		let w = vec2f( cos( ang ), sin( ang ) );
		let i2 = i * 2u; let j2 = j * 2u;
		let a0 = fftShared[ i2 ]; let a1 = fftShared[ i2 + 1u ];
		let b0 = fftCmul2( fftShared[ j2 ], w ); let b1 = fftCmul2( fftShared[ j2 + 1u ], w );
		fftShared[ i2 ] = a0 + b0;
		fftShared[ i2 + 1u ] = a1 + b1;
		fftShared[ j2 ] = a0 - b0;
		fftShared[ j2 + 1u ] = a1 - b1;
		workgroupBarrier();
	}`}let a=`var<workgroup> fftShared: array<vec4f, ${q*2}>;\n`;if(this.rowKernel=new r({label:`Ocean FFT Rows`,modules:[z],bindings:{...e,h0:t(this.h0),waveData:t(this.waveData),tmp:t(this.tmp)},workgroupSize:[cs,1,1],code:fs+a+`
@compute @workgroup_size( WG_X, WG_Y, WG_Z )
fn main( @builtin( local_invocation_id ) lid: vec3u, @builtin( workgroup_id ) wid: vec3u ) {
	let t = lid.x;
	let row = wid.x;
	let c = wid.y;
	let base = c * ${q*q}u + row * ${q}u;
	let time = ocean.time;

	for ( var e = 0u; e < 2u; e++ ) {
		let x = t + e * FFT_HALF;
		let idx = base + x;
		let w = waveData[ idx ];
		let hv = h0[ idx ];
		let ph = w.w * time;
		let cs = cos( ph ); let sn = sin( ph );

		// h = h0 * e^{i w t} + conj(h0(-k)) * e^{-i w t}
		let hr = hv.x * cs - hv.y * sn + hv.z * cs + hv.w * sn;
		let hi = hv.x * sn + hv.y * cs - hv.z * sn + hv.w * cs;

		let kx = w.x; let kz = w.y; let ik = w.z;
		let fx = kx * ik; let fz = kz * ik;

		// Dx_hat = i kx/k h, Dz_hat = i kz/k h  ->  c0 = Dx + i Dz
		let c0 = vec2f( - ( fx * hi + fz * hr ), fx * hr - fz * hi );
		// c1 = Dy + i dDx/dz,  dDx/dz_hat = -kx kz / k h
		let q = - ( kx * kz * ik );
		let c1 = vec2f( hr - q * hi, hi + q * hr );
		// c2 = dDy/dx + i dDy/dz
		let c2 = vec2f( - ( kx * hi + kz * hr ), kx * hr - kz * hi );
		// c3 = dDx/dx + i dDz/dz
		let a = - ( kx * kx * ik ); let b = - ( kz * kz * ik );
		let c3 = vec2f( a * hr - b * hi, a * hi + b * hr );

		let r = fftBitReverse8( x ) * 2u;
		fftShared[ r ] = vec4f( c0, c1 );
		fftShared[ r + 1u ] = vec4f( c2, c3 );
	}

	workgroupBarrier();
${i}

	for ( var e = 0u; e < 2u; e++ ) {
		let x = t + e * FFT_HALF;
		let o = ( base + x ) * 2u;
		tmp[ o ] = fftShared[ x * 2u ];
		tmp[ o + 1u ] = fftShared[ x * 2u + 1u ];
	}
}`}),this.fusedMips){as(this,{ComputeKernel:r,commonModule:z,fftCommon:fs,oceanU:e,limits:I.limits});return}let o=(e,t)=>({storageTexture:e,access:`write`,view:{dimension:`2d-array`,baseMipLevel:t,mipLevelCount:1}});if(this.columnKernel=new r({label:`Ocean FFT Columns`,modules:[z],bindings:{...e,tmp:t(this.tmp),foam:t(this.foam),mipSrc:t(this.mipSrc),dispOut:o(this.displacementTexture,0),derivOut:o(this.derivativeTexture,0)},workgroupSize:[cs,1,1],code:fs+a+`
@compute @workgroup_size( WG_X, WG_Y, WG_Z )
fn main( @builtin( local_invocation_id ) lid: vec3u, @builtin( workgroup_id ) wid: vec3u ) {
	let t = lid.x;
	let col = wid.x;
	let c = wid.y;
	let base = c * ${q*q}u;

	for ( var e = 0u; e < 2u; e++ ) {
		let y = t + e * FFT_HALF;
		let idx = base + y * ${q}u + col;
		let r = fftBitReverse8( y ) * 2u;
		fftShared[ r ] = tmp[ idx * 2u ];
		fftShared[ r + 1u ] = tmp[ idx * 2u + 1u ];
	}

	workgroupBarrier();
${i}

	let lambda = ocean.choppiness;
	for ( var e = 0u; e < 2u; e++ ) {
		let y = t + e * FFT_HALF;
		let idx = base + y * ${q}u + col;
		let sign = select( -1.0, 1.0, ( ( col + y ) & 1u ) == 0u );
		let A = fftShared[ y * 2u ] * sign;
		let B = fftShared[ y * 2u + 1u ] * sign;

		let Dx = A.x; let Dz = A.y; let Dy = A.z; let Dxz = A.w;
		let Dyx = B.x; let Dyz = B.y; let Dxx = B.z; let Dzz = B.w;

		let jxx = lambda * Dxx + 1.0;
		let jzz = lambda * Dzz + 1.0;
		let jxz = lambda * Dxz;
		let J = jxx * jzz - jxz * jxz;

		// Persistent foam: generated where the surface compresses (J < bias),
		// then slowly decays so whitecaps leave trailing foam patches.
		let prev = foam[ idx ];
		let gen = sat( ( ocean.foamBias - J ) * ocean.foamGain );
		let f = prev * exp( - ocean.foamDecay * frame.dt ) + gen * ocean.foamAdd * frame.dt;
		let fNew = clamp( max( f, gen * 0.5 ), 0.0, 1.5 );
		foam[ idx ] = fNew;

		let uv = vec2u( col, y );
		let vDisp = vec4f( lambda * Dx, Dy, lambda * Dz, fNew );
		let vDeriv = vec4f( Dyx, Dyz, lambda * Dxx, lambda * Dzz );
		textureStore( dispOut, uv, c, vDisp );
		textureStore( derivOut, uv, c, vDeriv );
		mipSrc[ idx * 2u ] = vDisp;
		mipSrc[ idx * 2u + 1u ] = vDeriv;
	}
}`}),this.mipFactory){this.customMips=(this.derivativeOnly?[this.derivativeTexture]:[this.displacementTexture,this.derivativeTexture]).map(this.mipFactory),this.mipKernelsA=[],this.mipKernelsB=[];return}let s=(e,t,n,r,i)=>{let a=n*2,o=``;return t?o=`${t}[ ly * ${n}u + lx ] = v;`:r===5&&(o=`mipMid[ ( c * 64u + gy * 8u + gx ) * 2u + ${i}u ] = v;`),`
	if ( lx < ${n}u && ly < ${n}u ) {
		let i = ly * ${2*a}u + lx * 2u;
		let v = ( ${e}[ i ] + ${e}[ i + 1u ] + ${e}[ i + ${a}u ] + ${e}[ i + ${a+1}u ] ) * 0.25;
		textureStore( out${r}, vec2u( gx * ${n}u + lx, gy * ${n}u + ly ), c, v );
		${o}
	}`},c=(e,n)=>new r({label:`Ocean Mips A`,bindings:{mipSrc:t(this.mipSrc),mipMid:t(this.mipMid),out1:o(e,1),out2:o(e,2),out3:o(e,3),out4:o(e,4),out5:o(e,5)},workgroupSize:[16,16,1],code:`
var<workgroup> s1: array<vec4f, 256>;
var<workgroup> s2: array<vec4f, 64>;
var<workgroup> s3: array<vec4f, 16>;
var<workgroup> s4: array<vec4f, 4>;
fn src( c: u32, x: u32, y: u32 ) -> vec4f { return mipSrc[ ( c * ${q*q}u + y * ${q}u + x ) * 2u + ${n}u ]; }
@compute @workgroup_size( WG_X, WG_Y, WG_Z )
fn main( @builtin( local_invocation_id ) lid: vec3u, @builtin( workgroup_id ) wid: vec3u ) {
	let lx = lid.x; let ly = lid.y;
	let gx = wid.x; let gy = wid.y; let c = wid.z;
	let x1 = gx * 16u + lx; let y1 = gy * 16u + ly;
	let x0 = x1 * 2u; let y0 = y1 * 2u;
	let v1 = ( src( c, x0, y0 ) + src( c, x0 + 1u, y0 ) + src( c, x0, y0 + 1u ) + src( c, x0 + 1u, y0 + 1u ) ) * 0.25;
	textureStore( out1, vec2u( x1, y1 ), c, v1 );
	s1[ ly * 16u + lx ] = v1;
	workgroupBarrier();
${s(`s1`,`s2`,8,2,n)}
	workgroupBarrier();
${s(`s2`,`s3`,4,3,n)}
	workgroupBarrier();
${s(`s3`,`s4`,2,4,n)}
	workgroupBarrier();
${s(`s4`,null,1,5,n)}
}`}),l=(e,n)=>new r({label:`Ocean Mips B`,bindings:{mipMid:t(this.mipMid),out6:o(e,6),out7:o(e,7),out8:o(e,8)},workgroupSize:[8,8,1],code:`
var<workgroup> s5: array<vec4f, 64>;
var<workgroup> s6: array<vec4f, 16>;
var<workgroup> s7: array<vec4f, 4>;
@compute @workgroup_size( WG_X, WG_Y, WG_Z )
fn main( @builtin( local_invocation_id ) lid: vec3u, @builtin( workgroup_id ) wid: vec3u ) {
	let lx = lid.x; let ly = lid.y; let c = wid.z;
	let gx = 0u; let gy = 0u;
	s5[ ly * 8u + lx ] = mipMid[ ( c * 64u + ly * 8u + lx ) * 2u + ${n}u ];
	workgroupBarrier();
${s(`s5`,`s6`,4,6,n)}
	workgroupBarrier();
${s(`s6`,`s7`,2,7,n)}
	workgroupBarrier();
${s(`s7`,null,1,8,n)}
}`});this.mipKernelsA=this.derivativeOnly?[c(this.derivativeTexture,1)]:[c(this.displacementTexture,0),c(this.derivativeTexture,1)],this.mipKernelsB=this.derivativeOnly?[l(this.derivativeTexture,1)]:[l(this.displacementTexture,0),l(this.derivativeTexture,1)]}update(e){let t=this.derivativeOnly?2:this.cascades;if(this.needsSpectrum){this.needsSpectrum=!1;let e=[q/16,q/16,t];this.initSpectrumKernel.dispatch(e),this.conjugateKernel.dispatch(e),this.copyH0Kernel.dispatch(e)}this.time.value+=e*this.timeScale,I.computePass(`Ocean FFT`,e=>{this.rowKernel.dispatch([q,t,1],{pass:e}),this.columnKernel.dispatch([this.fusedMips?q/2:q,t,1],{pass:e});for(let n of this.mipKernelsA)n.dispatch([q/32,q/32,t],{pass:e});for(let n of this.mipKernelsB)n.dispatch([1,1,t],{pass:e});for(let t of this.customMips||[])t.dispatch(e)})}sampleDisplacement(e,t=null,n=null){let r=[];for(let i=0;i<this.cascades;i++){let a=`textureSampleLevel( oceanDisplacement, smpLinearRepeat, ( ${e} ) / ocean.sizes[ ${i} ].x, ${i}, ${t??`0.0`} ).xyz`;n&&(a+=` * ( ${n[i]} )`),r.push(a)}return`( `+r.join(` + `)+` )`}},ms=6,hs=new R({name:`whaleWater`,uniforms:new L(`WhaleMarks`,{marks:[`vec4f[${ms}]`,Array(ms).fill(0).map(()=>new P(0,0,1,0))]},{label:`whaleMarks`}),uniformName:`whaleMarks`,code:`
fn whaleWater( xz: vec2f ) -> vec2f {
	var foam = 0.0; var slick = 0.0;
	for ( var i = 0; i < ${ms}; i++ ) {
		let e = whaleMarks.marks[ i ];
		let d = length( xz - e.xy ) / e.z;
		// (outside a mark, or an unused one, core or the amounts are 0)
		if ( d >= 1.0 || e.w == 0.0 ) { continue; }
		let core = 1.0 - smoothstep( 0.2, 1.0, d );
		// churned water breaks up into lumps and streaks with dark water between them, denser
		// toward the middle
		let q = xz * 0.8; let q2 = xz * 2.9;
		let n1 = sin( q.x + sin( q.y * 1.3 ) * 1.7 ) * sin( q.y * 1.1 + sin( q.x * 1.7 ) * 1.4 );
		let n2 = sin( q2.x * 1.1 + sin( q2.y ) * 1.3 ) * sin( q2.y * 0.9 + sin( q2.x * 1.2 ) );
		let lumps = smoothstep( -0.25, 0.55, n1 * 0.7 + n2 * 0.45 + ( 1.0 - d ) * 0.5 );
		foam = max( foam, core * max( e.w, 0.0 ) * lumps * 0.85 );
		slick = max( slick, core * max( - e.w, 0.0 ) );
	}
	return vec2f( foam, slick );
}
`});new N,new N;var gs={left:.15,right:.15,bottom:.6,top:0},_s={cx:(gs.right-gs.left)/2,cy:(gs.top-gs.bottom)/2,sx:1+(gs.left+gs.right)/2,sy:1+(gs.top+gs.bottom)/2};new F().set(1/_s.sx,0,0,-_s.cx/_s.sx,0,1/_s.sy,0,-_s.cy/_s.sy,0,0,1,0,0,0,0,1),new F,new Ae,new N;var vs=1.333,ys=new R({name:`waterFresnel`,deps:[z],code:`
fn fresnelDielectric( cosI: f32, eta: f32 ) -> f32 {
	let c = clamp( cosI, 0.0, 1.0 );
	let g2 = eta * eta - 1.0 + c * c;
	let tir = g2 < 0.0;
	let g = sqrt( max( g2, 0.0 ) );
	let a = ( g - c ) / ( g + c );
	let b = ( c * ( g + c ) - 1.0 ) / ( c * ( g - c ) + 1.0 );
	return select( 0.5 * ( a * a ) * ( b * b + 1.0 ), 1.0, tir );
}

fn waterPhaseHG( cosT: f32, g: f32 ) -> f32 {
	let g2 = g * g;
	return ( ( 1.0 - g2 ) / ( 4.0 * PI ) ) / pow( max( 1.0 + g2 - cosT * 2.0 * g, 1e-4 ), 1.5 );
}

fn viewPositionFromViewZ( uv: vec2f, viewZ: f32 ) -> vec3f {
	let ndc = vec2f( uv.x * 2.0 - 1.0, ( 1.0 - uv.y ) * 2.0 - 1.0 );
	let p00 = frame.proj[ 0 ][ 0 ];
	let p11 = frame.proj[ 1 ][ 1 ];
	return vec3f( ndc.x / p00, ndc.y / p11, -1.0 ) * ( - viewZ );
}
`}),bs=class extends Ar{constructor({surface:e,sky:t,sceneCopy:n,sceneDepthHalf:r=null,refraction:i=null,reflection:a=null,hullMask:o=null,hullMaskActive:s=null}){super({name:`water`,lit:!1,side:`double`,transparent:!1,blending:`none`,depthWrite:!0,defines:{IS_WATER:1},attributes:{nodeData:`vec4f`},varyings:{vLagXZ:`vec2f`,vWaveH:`f32`,vSeaDepth:`f32`,vFoam:`f32`,vShoreN:`vec3f`,vShoreFoam:`f32`,vSurfMask:`vec2f`},uniforms:{backscatter:[`f32`,.035],sss:[`f32`,1],refraction:[`f32`,.06],foamIntensity:[`f32`,1],waterRoughness:[`f32`,.035],reflectionStrength:[`f32`,1],ssr:[`f32`,1],debugMode:[`i32`,0],hullActive:[`f32`,0]}}),this.isWaterMaterial=!0,this.lightingHooks=!1,this.waterSurface=e,this.sky=t,this.reflection=a,this.clouds=null,this.cheap=!1,this.cameraWaterHeightNode=null;let c=this.uniforms;this.params={absorption:V.waterAbsorption,scattering:V.waterScattering,backscatter:c.backscatter,sss:c.sss,refraction:c.refraction,foamIntensity:c.foamIntensity,roughness:c.waterRoughness,reflectionStrength:c.reflectionStrength,ssr:c.ssr},this.debugMode=c.debugMode,this.sceneDepthTexture=n.depthTexture,this.sceneColorTexture=n.texture,this.sceneDepthHalfTexture=r,this.refraction=i,this.hullMaskTexture=o,this.hullMaskActive=s,s&&(this.uniformBlock.fields.hullActive=s),this._built=!1}get _hullOn(){return this._hull?this.hullOverride!==void 0&&this.hullOverride!==null?!!this.hullOverride:this.hullMaskActive.value>.5:!1}pipelineKey(){return this._built||this._build(),super.pipelineKey()+(this._hullOn?`.hull`:``)}allDefines(){return{...super.allDefines(),WATER_HULL:+!!this._hullOn}}_build(){this._built=!0;let e=this.waterSurface,t=this.sky,n=!!e.terrain,r=!!e.shore,i=!!e.shoreSim,a=!!e.surfFoam,o=!!(this.clouds&&this.clouds.module),s=!!(this.hullMaskTexture&&this.hullMaskActive),c=!!(this.reflection&&this.reflection.module);this.modules=[z,ys,ws,hs,e.module,t&&t.module,o&&this.clouds.module,i&&e.shoreSim.module,c&&this.reflection.module,this.cameraWaterHeightNode&&this.cameraWaterHeightNode.module].filter(Boolean),this.bindings.waterSceneColor={texture:this.sceneColorTexture},this.bindings.waterSceneDepth={texture:this.sceneDepthTexture,sampleType:`unfilterable-float`},this.sceneDepthHalfTexture&&(this.bindings.waterSceneDepthHalf={texture:this.sceneDepthHalfTexture}),this.setDefine(`WATER_DEPTH_HALF`,+!!this.sceneDepthHalfTexture);let l=!!this.refraction;l&&(this.bindings.waterRefrColor={texture:this.refraction.texture},this.bindings.waterRefrDepth={texture:this.refraction.depthTexture,sampleType:`unfilterable-float`}),this.setDefine(`WATER_REFRACTION`,+!!l),s&&(this.bindings.waterHullMask={texture:this.hullMaskTexture,sampleType:`unfilterable-float`}),this._hull=s,this.vertex=`
	let r = waterSurfaceVertex( v.nodeData, v.position.xz );
	v.useWorld = true;
	v.worldPos = r.position;
	v.worldNormal = vec3f( 0.0, 1.0, 0.0 );
	o.vLagXZ = r.lagXZ;
	o.vWaveH = r.height;
	o.vSeaDepth = r.depth;
	o.vFoam = r.foam;
	o.vShoreN = r.shoreN;
	o.vShoreFoam = r.shoreFoam;
	o.vSurfMask = r.surfMask;
`,this.output=this.cheap?`r.color = vec4f( 0.02, 0.05, 0.1, 1.0 ); r.mask = vec4f( 0.0, 1.0, 0.0, 1.0 );`:this._shadeWGSL({T:n,SH:r,SIM:i,SF:a,CL:o,HULL:s,REFL:c}),this.needsUpdate=!0}_shadeWGSL({T:e,SH:t,SIM:n,SF:r,CL:i,HULL:a,REFL:o}){this.waterSurface;let s=t,c=t,l=e&&t,u=this.cameraWaterHeightNode?String(this.cameraWaterHeightNode):`frame.cameraWaterHeight`;return`
	let pos = in.P;
	let screenUV = in.pixel * frame.invResolution;
	let posV = ( frame.view * vec4f( pos, 1.0 ) ).xyz;
	let lagXZ = in.vs.vLagXZ;
	let vDepth = in.vs.vSeaDepth;
	let vHeight = in.vs.vWaveH;
	// footprint of this pixel on the surface (m) — for filtering / roughness (uniform control flow)
	let footprint = max( length( fwidth( lagXZ ) ), 1e-4 );

#if WATER_HULL
	// No sea inside a hull: the surface behind the nearest face of the hull volume is water the hull
	// keeps out (without this it shows through the cockpit sole when the stern squats or the boat heels)
	if ( mat.hullActive > 0.5 && in.front ) {
		let mSize = vec2f( textureDimensions( waterHullMask ) );
		let hullDist = textureLoad( waterHullMask, vec2i( clamp( screenUV, vec2f( 0.0 ), vec2f( 0.9999 ) ) * mSize ), 0 ).x;
		if ( hullDist > 0.01 && length( pos - frame.cameraPos ) > hullDist - 0.02 ) { discard; }
	}
#endif

	let toCam = frame.cameraPos - pos;
	let dist = length( toCam );
	let V = toCam / dist;
	let L = frame.sunDir;
	// the sun light reaching the surface: sun colour x shadow maps (three's direct light), x clouds,
	// x the island's own shadow (heightfield horizon: the shadow map's range is too short to hold it)
	// (5-tap PCF: the waves break up any penumbra detail the contact-hardening filter would add)
	var sunLight = frame.sunColor * sunShadowPCF( pos, vec3f( 0.0, 1.0, 0.0 ), in.pixel );
${i?`	sunLight *= cloudsShadow( pos.xz );`:``}
${e?`	sunLight *= terrainSunShadowAt( pos );`:``}

	// water film thickness at this pixel and the distance to the swash front (ShoreWaves.swashEdge):
	// the sheet ends exactly on its analytic leading edge, not on the mesh triangles
	let groundH = ${e?`terrainHeightAt( pos.xz )`:`-500.0`};
	var thickness = ${e?`pos.y - groundH`:`10.0`};
	var frontD = 1e3;
	var swTau = 0.0;
	var swRt = 0.0;
${l?`	if ( vDepth < 1.0 ) {
		let tRaw = thickness;
		let se = shoreSwashEdge( pos.xz, thickness );
		thickness = se.x; frontD = se.y; swTau = se.z; swRt = se.w;
		// The draining sheet has no rounded front: it thins out over decimetres and breaks up where the
		// sand drains faster. The analytic front runs parallel to the shoreline; kept as a hard, smooth
		// edge (with the uprush's meniscus, rim and contact shadow) it read as a dark line ruled along
		// the beach between the foam and the wet sand.
		let backwash = smoothstep( 0.32, 0.46, swTau );
		if ( backwash > 0.0 && swRt > 0.0 && frontD < 3.0 ) {
			frontD += ( perlin2( pos.xz * 1.1 ) * 0.35 + perlin2( pos.xz * 3.7 + vec2f( 5.3, 1.9 ) ) * 0.15 ) * backwash;
			thickness = min( tRaw, frontD * mix( 0.08, 0.025, backwash ) );
		}
	}`:``}
	// the foam line riding the swash front, per pixel: a dense bubbly bead right at the edge while
	// the sheet runs up, a thinning lace behind it; weaker in the backwash (it sinks into the sand)
	let uprush = smoothstep( 0.46, 0.32, swTau );
	let bead = smoothstep( -0.01, 0.05, frontD ) * smoothstep( 0.6, 0.12, frontD );
	let trail = smoothstep( -0.01, 0.25, frontD ) * smoothstep( 2.2, 0.3, frontD );
	// patchy along the front (dense bunches and thin stretches), not an even white rope (only where
	// the edge foam below can be non-zero: it is weighted by the run-up and the shallow depth)
	var edgePatch = 1.0;
${l?`	if ( swRt > 0.0 && vDepth < 0.4 ) {
		edgePatch = smoothstep( -0.45, 0.55, perlin2( pos.xz * 0.42 ) ) * 0.7 + smoothstep( -0.3, 0.6, perlin2( pos.xz * 1.7 + vec2f( 3.1, 7.7 ) ) ) * 0.3;
	}`:``}
	let edgeFoam = ( bead * mix( 0.45, 1.1, uprush ) * mix( 0.35, 1.0, edgePatch ) + trail * mix( 0.12, 0.4, uprush ) * edgePatch ) * smoothstep( 0.0, 1.0, swRt ) * smoothstep( 0.4, -0.2, vDepth );
	// the meniscus: the last decimetre of the advancing sheet bends down to the sand
	let lipW = ( 1.0 - smoothstep( 0.0, 0.14, frontD ) ) * uprush;

	let simState = ${n?`shoreSimSample( pos.xz )`:`vec4f( 0.0 )`};
	let surf = waterSurfaceFragment( lagXZ, footprint, vDepth, in.vs.vFoam, in.vs.vShoreN, in.vs.vShoreFoam + edgeFoam, simState.x, simState, in.vs.vSurfMask, pos );
	var foam = surf.foam;
	// the whale's churned white water and flat fluke-print slick (WhaleWater.js)
	let whaleW = whaleWater( pos.xz );
	foam = max( foam, whaleW.x );

	// Which medium is the view ray in before it reaches this fragment? The water surface is a closed
	// interface: a front face (its air side towards the camera) is seen from the air, a back face from
	// the water. For the visible (nearest) fragment this is the medium the ray starts in at the near
	// clip plane, which is exactly how the clip plane slices the water. The winding can't be trusted
	// in folds of the choppy / breaking surface: there, and well above or below the surface, the
	// camera's own medium decides.
	let camH = frame.cameraPos.y - ${u};
${t?`	let folded = surf.jacobian < 0.1 || normalize( in.vs.vShoreN ).y < 0.35;`:`	let folded = surf.jacobian < 0.1;`}
	let nearSurface = abs( camH ) < 1.5;
	let viewFromBelow = select( camH < 0.0, ! in.front, nearSurface && ! folded );
	let seenFromBelow = select( 0.0, 1.0, viewFromBelow );
	// shading normal on the viewer's side of the interface. Triangle winding can't be trusted
	// (tiny self-intersections of the choppy FFT surface render as back faces seen from above),
	// so pick the side from the camera and bend facets that face away to grazing instead of
	// flipping them (a flipped normal turns a fold into a white sky-mirror patch).
	let Nup = normalize( mix( surf.normal, vec3f( 0.0, 1.0, 0.0 ), whaleW.y * 0.75 ) );
	let Nside = select( Nup, - Nup, viewFromBelow );
	let Nview = normalize( Nside + V * max( - dot( Nside, V ) + 0.03, 0.0 ) );

	// roughness from unresolved slope variance (Cox-Munk: mss = 0.003 + 0.00512 U)
	let mss = ( 0.003 + frame.windSpeed * 0.00512 ) * waterSurface.slopeScale;
	let kpx = PI / footprint;
	let unresolved = sat( log2( 110.0 / kpx ) / 9.0 );
	let roughVar = surf.rough * surf.rough;
	let alpha2 = ( mat.waterRoughness * mat.waterRoughness + mss * 2.0 * unresolved * roughVar + foam * 0.2 + surf.aeration * 0.03 ) * ( 1.0 - whaleW.y * 0.6 );
	// slope spread the mesh / normal maps can't show at this distance (for the reflection)
	let sigmaUnres = sqrt( mss * unresolved * roughVar );

	var outCol = vec3f( 0.0 );
	var ssrW = 0.0;
	var dbgPath = 0.0;
	var dbgScene = vec3f( 0.0 );
	var dbgSrc = vec3f( 0.0 ); // which image the seabed came from (debug view 12)
	var dbgRefr = vec3f( 0.0 ); // refraction image at the end point: coverage, depth > 0, behind (13)

	if ( ! viewFromBelow ) {

		// ================= ABOVE WATER =================
		// near the leading edge the surface bends down to meet the sand like a rounded bead
		// (meniscus), tilting the normal toward dry land
		let edgeW = max( ( 1.0 - smoothstep( 0.0, 0.006, thickness ) ) * uprush, lipW );
		let nr = ${e?`terrainNormalRock( pos.xz )`:`vec4f( 0.0 )`};
		let uphill = normalize( - vec2f( nr.x, nr.y ) + vec2f( 1e-5, 0.0 ) );
		let N = normalize( Nview + vec3f( uphill.x, 0.0, uphill.y ) * ( edgeW * edgeW * 0.7 ) );
		let NdV = max( dot( N, V ), 1e-4 );
		let F = fresnelDielectric( NdV, ${vs} );

		// ---- reflection
		let Rraw = reflect( - V, N );
		// unresolved facets tilt the average reflection toward the higher, darker sky: rough
		// patches (gusts) darken toward the horizon, slicks stay bright and mirror-like
		let Rup = max( Rraw.y, 0.004 ) + sigmaUnres * 1.3 * ( 1.0 - max( Rraw.y, 0.0 ) );
		let R = normalize( vec3f( Rraw.x, Rup, Rraw.z ) );
		// reflections pointing below the horizon hit other waves: fade toward a dark sea color
		let horizonOcc = max( smoothstep( -0.12, 0.08, Rraw.y ), smoothstep( 0.25, 0.06, thickness ) );
		// (unused where both its weights are 0: horizonOcc here, the rim at the swash front below)
		var skyRefl = vec3f( 0.0 );
		if ( horizonOcc > 0.0 || frontD < 0.1 ) { skyRefl = skyReflectionRadiance( R ); }
		var reflCol = mix( frame.horizonColor * 0.35, skyRefl, horizonOcc );

		// objects (pier, boat, hills, village) reflected from the screen; only rays close to the
		// horizon can hit anything, so steep reflections skip the march entirely
		// (looking down, F is tiny: the reflection can't be seen, skip the march)
		if ( Rraw.y < 0.45 && F > 0.05 && mat.ssr > 0.5 ) {
			let Rv = normalize( ( frame.view * vec4f( Rraw, 0.0 ) ).xyz );
			// (rays toward the camera get no weight: see facing in _waterSSR)
			if ( Rv.z < 0.5 ) {
				let r = _waterSSR( posV, Rv, pos.y, Rraw.y );
				reflCol = mix( reflCol, r.rgb, r.a );
				ssrW = r.a;
			}
		}
${o?`
		// planar reflection of scene objects (alpha = coverage)
		let rOffset = N.xz * 0.8 / max( dist, 1.0 ) * 4.0;
		let rs = reflectionSample( screenUV, rOffset );
		reflCol = mix( reflCol, rs.rgb, rs.a );`:``}

		reflCol *= mat.reflectionStrength;

		// ---- sun specular (GGX), sun light already includes shadowing
		let H = normalize( L + V );
		let NdL = max( dot( N, L ), 0.0 );
		let NdH = max( dot( N, H ), 0.0 );
		let VdH = max( dot( V, H ), 0.0 );
		let Fs = fresnelDielectric( VdH, ${vs} );
		let spec = _waterDGGX( NdH, alpha2 ) * _waterVSmithGGX( NdL, NdV, alpha2 ) * Fs * NdL;
		// physically the glint is ~1e5x brighter than the sky; clamp to stay inside fp16 range
		let sunSpec = sunLight * min( spec, 400.0 );

		// ---- refraction / water volume
		// Trace the refracted view ray (Snell) to the sea floor instead of using the straight
		// screen ray: at grazing angles the straight ray overestimates the water path ~10x.
		// view ray inside the water (unit, downward). Facets of a curling crest can refract it
		// upward on a coarse mesh; keep it heading down into the water body.
		let Tr = refract( - V, N, 1.0 / ${vs} );
		let Tv = normalize( vec3f( Tr.x, min( Tr.y, -0.08 ), Tr.z ) );
		let tDown = max( - Tv.y, 0.04 );
		let surfViewZ = posV.z;

		// water column below the surface along the refracted ray (terrain, 2 refinements)
${e?`		let L0 = max( pos.y - groundH, 0.0 ) / tDown;
		// deep water: the end point is capped at 80 m and the column is opaque long before, so the
		// refinements can't change the result
		var Lt = L0;
		if ( L0 < 100.0 ) {
			let L1 = max( pos.y - terrainHeightAt( pos.xz + Tv.xz * min( L0, 200.0 ) ), 0.0 ) / tDown;
			Lt = max( pos.y - terrainHeightAt( pos.xz + Tv.xz * min( L1 * 0.5 + L0 * 0.5, 200.0 ) ), 0.0 ) / tDown;
		}`:`		let Lt = 400.0;`}
		let Lter = clamp( Lt, 0.0, 400.0 );
		// thin breaking crests: the refracted ray leaves through the back of the wave into the sky
		let crestT = ${s?`shoreCrestPath( lagXZ, vDepth, Tv )`:`1e4`};
		let thruCrest = crestT < Lter;

		// project the refracted end point to the screen
		let pEnd = pos + Tv * min( Lter, 80.0 );
		let clipEnd = frame.proj * ( frame.view * vec4f( pEnd, 1.0 ) );
		let ndcEnd = clipEnd.xy / max( clipEnd.w, 1e-4 );
		let uvR = vec2f( ndcEnd.x * 0.5 + 0.5, ndcEnd.y * -0.5 + 0.5 );
		let onScreen = all( uvR > vec2f( 0.0 ) ) && all( uvR < vec2f( 1.0 ) );
		var uvF = screenUV;
		var dR = 0.0;
		var sceneCol = vec3f( 0.0 );
		var found = false;
#if WATER_REFRACTION
		// the scene below the water only (RefractionPass): nothing above the water (pier, rails, posts,
		// the boat) can hide the refracted end point. Coverage in alpha: bilinear across its edge, then
		// un-premultiplied, so the clip boundary blends instead of darkening.
		// The image extends past the screen (RefractionPass guard band): the refracted end points of the
		// pixels near the bottom edge land below the screen (light bends down into the water), and the
		// seabed there is drawn. Lookups project with this frame's jittered camera, as the image was.
		{
			let cj = frame.viewProj * vec4f( pEnd, 1.0 );
			let uvRc = _waterRefrUV( cj.xy / max( cj.w, 1e-4 ) );
			let rc = textureSampleLevel( waterRefrColor, smpLinearClamp, uvRc, 0.0 );
			let rSize = vec2f( textureDimensions( waterRefrDepth ) );
			let rd = textureLoad( waterRefrDepth, vec2i( min( uvRc * rSize, rSize - 1.0 ) ), 0 ).x;
			// only what lies behind this surface point can be seen through it: submerged parts of
			// objects in front of it (the hull of the boat you stand in, pier piles) would otherwise be
			// pasted onto the sea far out, wherever the end point lands on them (or off screen next to
			// them: the edge texel)
			dbgRefr = vec3f( rc.a, select( 0.0, 1.0, rd > 0.0 ), select( 0.0, 1.0, surfViewZ + viewDepth( rd ) > WATER_BEHIND ) );
			if ( rc.a > 0.5 && rd > 0.0 && surfViewZ + viewDepth( rd ) > WATER_BEHIND ) {
				sceneCol = rc.rgb / rc.a;
				uvF = uvR;
				dR = rd;
				found = true;
			} else if ( rc.a > 0.5 && rd > 0.0 ) {
				// the end point lies on something in front (a pile, a hull): what lies straight behind
				// this pixel, from the same (lit) source. The opaque copy shades deep seabed cheaply and
				// flickered against it as the piles passed in front while walking the pier.
				let uvS = _waterRefrUV( vec2f( screenUV.x * 2.0 - 1.0, 1.0 - screenUV.y * 2.0 ) );
				let rcS = textureSampleLevel( waterRefrColor, smpLinearClamp, uvS, 0.0 );
				let rdS = textureLoad( waterRefrDepth, vec2i( min( uvS * rSize, rSize - 1.0 ) ), 0 ).x;
				if ( rcS.a > 0.5 && rdS > 0.0 && surfViewZ + viewDepth( rdS ) > WATER_BEHIND ) {
					sceneCol = rcS.rgb / rcS.a;
					uvF = screenUV;
					dR = rdS;
					found = true;
				}
			}
		}
#endif
		if ( ! found ) {
			// nothing under the water there (shallows above the clip height, off screen): the opaque copy,
			// where the refracted sample lies behind the water surface, else the unrefracted pixel
			let dO = _waterSceneDepthAt( uvR );
			let valid = onScreen && surfViewZ + viewDepth( dO ) > WATER_BEHIND;
			uvF = select( screenUV, uvR, valid );
			dR = select( _waterSceneDepthAt( screenUV ), dO, valid );
			sceneCol = textureSampleLevel( waterSceneColor, smpLinearClamp, uvF, 0.0 ).rgb;
		} else {
			// Thin water (the swash film on the sand): the refraction offset is a few pixels at most and
			// nothing can stand between the film and the sand, so the opaque pass's own image of the sand
			// is the right one: it has the wet swash sand and its ripples, which the refraction image
			// draws as plain seabed and leaves out altogether above its clip height (0.4 m). Switching
			// between the two there drew a hard straight line across the wet sand along that height.
			let filmW = 1.0 - smoothstep( 0.04, 0.3, thickness );
			if ( filmW > 0.0 ) {
				let dO = _waterSceneDepthAt( uvR );
				let uvO = select( screenUV, uvR, onScreen && surfViewZ + viewDepth( dO ) > WATER_BEHIND );
				sceneCol = mix( sceneCol, textureSampleLevel( waterSceneColor, smpLinearClamp, uvO, 0.0 ).rgb, filmW );
			}
		}
		// (a branch: select() would evaluate the sky for every pixel)
		if ( thruCrest ) { sceneCol = skyReflectionRadiance( normalize( vec3f( Tv.x, max( abs( Tv.y ), 0.03 ), Tv.z ) ) ); }

		// objects in front of the sea floor (pylons, rocks, reef) shorten the path
		let qView = viewPositionFromViewZ( uvF, - viewDepth( dR ) );
		let qDist = length( qView - posV );
		var pathLen = clamp( min( Lter, qDist ), 0.0, 400.0 );
		pathLen = min( pathLen, crestT );
		dbgPath = pathLen;
		dbgScene = sceneCol;
		dbgSrc = select( vec3f( 1.0, 0.0, 0.0 ), vec3f( 0.0, 1.0, 0.0 ), found );

		// bubbles mixed into the water (the surf behind breakers, wakes): a strong scatterer, the water
		// turns milky turquoise and the bottom disappears (WaterSurface.fragment aeration)
		let aer = surf.aeration;
		// sand stirred up where the bores have just passed (the foam they left marks that water):
		// clouds of sediment, not a uniform tint
		let sandK = ${n?`sat( simState.x * 2.5 ) * 1.8 + 0.45`:`1.0`};
${c?`		// surf zone: sand and bubbles stirred up by the breakers (see ShoreWaves.surfMedium)
		let surfMed = shoreSurfMedium( pos.xz, vDepth );
		let sigA = frame.waterAbsorption + surfMed.absorb * sandK;
		// (bubble plumes are shallow and patchy: a moderate scatterer, milky turquoise rather than a glow)
		let sigS = frame.waterScattering + surfMed.scatter * sandK + aer * 1.6;`:`		let sigA = frame.waterAbsorption;
		let sigS = frame.waterScattering + aer * 1.6;`}
		let sigT = sigA + sigS;

		// refracted sun direction
		let Ls = - refract( - L, vec3f( 0.0, 1.0, 0.0 ), 1.0 / ${vs} ); // toward the sun from underwater
		let muS = max( Ls.y, 0.1 );
		let muV = max( - Tv.y, 0.15 );

		let Tview = exp( - sigT * pathLen );

		// in-scattered light along the view ray (single scattering sun + ambient), analytic
		// light at depth z: E0 * exp(-sigT * z / mu). Along the view ray z = s * muV.
		let sunIn = sunLight * ( 1.0 - fresnelDielectric( max( L.y, 0.02 ), ${vs} ) );
		let kSun = sigT * ( 1.0 + muV / muS );
		let kAmb = sigT * ( 1.0 + muV / 0.75 );
		let cosPh = dot( Tv, Ls );
		let phase = waterPhaseHG( cosPh, 0.86 ) * 0.7 + ${(.3/(4*Math.PI)).toFixed(8)};
		let bb = sigS * mix( mat.backscatter, 0.06, sat( aer * 2.0 ) );
		// multiple-scattering boosted backscatter (Gordon R = 0.33 bb/(a+bb))
		let albedoMS = bb * ( 0.33 * 4.0 ) / ( sigA + bb );
		let inSun = sunIn * ( sigS * phase + albedoMS * sigT * INV_PI ) * ( 1.0 - exp( - kSun * pathLen ) ) / kSun;
		let inAmb = frame.skyIrradiance * ( sigS * 0.25 + albedoMS * sigT ) * ( 1.0 - exp( - kAmb * pathLen ) ) / kAmb;

		// crest translucency (sun shining through thin wave tips)
		let vH = normalize( vec2f( V.x, V.z ) );
		let lH = normalize( vec2f( L.x, L.z ) + 1e-5 );
		// (light entering the top and back of a thin crest scatters out of the face over a broad lobe:
		// side-lit waves glow green too, not only when looking straight into the sun)
		let back = pow( sat( dot( vH, - lH ) * 0.6 + 0.4 ), 2.5 );
		let crest = sat( vHeight * 0.9 + 0.1 ) * ( sat( ( 1.0 - N.y ) * 4.0 ) + 0.25 );
		let sssCol = vec3f( 0.12, 0.55, 0.45 ) * 0.06;
		let sss = sunLight * sssCol * back * crest * mat.sss * smoothstep( 0.0, 0.25, L.y );

		// the bead of the meniscus shades the sand right under it
		let transmitted = sceneCol * Tview * ( 1.0 - 0.3 * lipW ) + inSun + inAmb + sss;

		// ---- foam
		// foam: bright diffuse scatterer (albedo ~0.85), wrapped sun + sky irradiance (skyIrradiance = E/PI)
${r?`		let foamLit = surfFoamLight( surf.foamInfo, N, L, V, sunLight, pos );`:`		let foamLit = ( sunLight * ( max( dot( N, L ), 0.0 ) * 0.75 + 0.25 ) * INV_PI + frame.skyIrradiance * 0.95 ) * 0.85;`}
		let foamCol = foamLit * mat.foamIntensity;

		// a thin bright rim just behind the edge: the rounded bead catches the sky
		let rim = smoothstep( 0.0, 0.025, frontD ) * smoothstep( 0.1, 0.035, frontD ) * uprush;
		let water = mix( transmitted, reflCol, F ) + sunSpec + skyRefl * ( 0.22 * rim );
		let shaded = mix( water, foamCol + sunSpec * 0.05, sat( foam ) );
		// fade into the sand right at the leading edge (anti-aliased by the film thickness)
		let edgeAA = smoothstep( 0.0, max( fwidth( thickness ) * 1.5, 0.004 ), thickness );
		// contact shadow: the sand just ahead of the advancing edge is darkened (the bead's
		// shadow and the wetting front), fading within ~15 cm
		outCol = shaded;
		if ( edgeAA < 1.0 ) {
			let contact = smoothstep( -0.16, -0.005, frontD ) * ( 1.0 - edgeAA ) * uprush;
			let sandC = textureSampleLevel( waterSceneColor, smpLinearClamp, screenUV, 0.0 ).rgb * ( 1.0 - 0.3 * contact );
			outCol = mix( sandC, shaded, edgeAA );
		}

	} else {

		// ================= BELOW WATER (looking up at the surface) =================
		let N = Nview;
		let NdV = max( dot( N, V ), 1e-4 );
		// from water (n=1.333) into air: eta = 1/1.333
		let F = fresnelDielectric( NdV, ${(1/vs).toFixed(8)} );
		let Tt = refract( - V, N, ${vs} );
		let tValid = dot( Tt, Tt ) > 0.5;
		let Td = normalize( select( vec3f( 0.0, 1.0, 0.0 ), Tt, tValid ) );
		// sky through Snell's window; the sun disk is bounded so grazing refractions of it far
		// away cannot bloom through the fog
		let skyT = min( skyRadianceWithClouds( Td, true ), vec3f( 60.0 ) );

		// total internal reflection mirrors the lit water body below: the radiance of an
		// infinitely long view ray through the medium in the reflected direction
		let sigA = frame.waterAbsorption; let sigS = frame.waterScattering; let sigT = sigA + sigS;
		let bb = sigS * mat.backscatter;
		let albedoMS = bb * ( 0.33 * 4.0 ) / ( sigA + bb );
		let Rr = reflect( - V, N );
		let LsU = - refract( - L, vec3f( 0.0, 1.0, 0.0 ), 1.0 / ${vs} );
		let muU = max( LsU.y, 0.15 );
		let phR = waterPhaseHG( dot( Rr, LsU ), 0.86 ) * 0.7 + ${(.3/(4*Math.PI)).toFixed(8)};
		let kS = sigT * ( 1.0 - min( Rr.y, 0.0 ) / muU );
		let kA = sigT * ( 1.0 - min( Rr.y, 0.0 ) / 0.8 );
		let eSunU = sunLight * ( 1.0 - fresnelDielectric( max( L.y, 0.02 ), ${vs} ) );
		let deepCol = eSunU * ( sigS * phR + albedoMS * sigT * INV_PI ) / kS
			+ frame.skyIrradiance * PI * ( sigS * ( 1.0 / ( 4.0 * PI ) ) + albedoMS * sigT * INV_PI ) / kA;

		// objects above the water seen through Snell's window (from the viewport)
		let sceneDepthC = _waterSceneDepthAt( screenUV );
		let sceneZ = - viewDepth( sceneDepthC );
		let hasObj = posV.z - sceneZ > 0.0 && sceneZ > - frame.far * 0.9;
		let objCol = textureSampleLevel( waterSceneColor, smpLinearClamp, screenUV, 0.0 ).rgb;
		let transmittedU = select( skyT, objCol, hasObj );

		let foamUnder = ( frame.skyIrradiance + sunLight * 0.5 ) * 0.25;
		outCol = mix( transmittedU * ( 1.0 - F ) + deepCol * F, foamUnder, sat( foam ) * 0.7 );

	}

	// debug views: 1 = back faces red, 2 = normals, 3 = foam, 7 = the seabed seen through, 12 = its source
	let dbg = mat.debugMode;
	var res = min( outCol, vec3f( 16000.0 ) );
	if ( dbg == 1 ) {
		res = select( vec3f( 50.0, 0.0, 0.0 ), res, in.front );
	} else if ( dbg == 2 ) {
		res = Nview * 0.5 + 0.5;
	} else if ( dbg == 3 ) {
		res = vec3f( foam );
	} else if ( dbg == 4 ) {
		let nanN = Nup.x != Nup.x || Nup.y != Nup.y || Nup.z != Nup.z;
		let nanL = lagXZ.x != lagXZ.x || lagXZ.y != lagXZ.y;
		let big = length( surf.slopes ) > 4.0;
		res = vec3f( select( 0.0, 1.0, nanN ), select( 0.0, 1.0, nanL ), select( 0.0, 1.0, big ) ) + 0.05;
	} else if ( dbg == 10 ) {
		res = vec3f( ssrW );
	} else if ( dbg == 6 ) {
		res = vec3f( dbgPath * 0.02, 0.0, 0.0 );
	} else if ( dbg == 9 ) {
		let sceneDepthC = _waterSceneDepthAt( screenUV );
		let dz = - viewDepth( sceneDepthC );
		res = vec3f( sceneDepthC * 100.0, - dz * 0.02, - posV.z * 0.02 );
	} else if ( dbg == 8 ) {
		res = vec3f( 0.0, vDepth * 0.02, 0.0 );
	} else if ( dbg == 7 ) {
		res = dbgScene;
	} else if ( dbg == 13 ) {
		res = dbgRefr;
	} else if ( dbg == 12 ) {
		// green: the refraction image, red: the opaque copy (nothing below the water there in the image)
		res = dbgSrc;
	} else if ( dbg == 11 ) {
		// surf foam sources: whitewater of the breaking wave (r), foam carried by the shore sim (g), clear plunging face (b)
		res = vec3f( in.vs.vShoreFoam, simState.x, in.vs.vSurfMask.x );
	} else if ( dbg == 5 ) {
		res = vec3f( fract( lagXZ.x * 0.1 ), fract( vHeight ), fract( lagXZ.y * 0.1 ) );
	}
	r.color = vec4f( res, 1.0 );
	// camera velocity for TAA (default: static), plus the water mask (SceneRenderer) for the
	// underwater pass: whether the visible surface is seen from below
	r.mask = vec4f( seenFromBelow, 1.0, 0.0, 1.0 );
`}},xs=_s,Ss=e=>e.toFixed(6),Cs=`
// a refracted sample is usable when it lies this far behind the water surface (view depth, m): objects in
// front of it (the hull you stand in, pier piles) are rejected
const WATER_BEHIND: f32 = 0.05;
// screen NDC -> uv in the refraction image, which extends past the screen (RefractionPass guard band)
fn _waterRefrUV( ndc: vec2f ) -> vec2f {
	let n = ( ndc - vec2f( ${Ss(xs.cx)}, ${Ss(xs.cy)} ) ) / vec2f( ${Ss(xs.sx)}, ${Ss(xs.sy)} );
	return clamp( vec2f( n.x * 0.5 + 0.5, 0.5 - n.y * 0.5 ), vec2f( 0.0005 ), vec2f( 0.9995 ) );
}
fn _waterDGGX( NdH: f32, a2: f32 ) -> f32 {
	let d = NdH * NdH * ( a2 - 1.0 ) + 1.0;
	return a2 / ( d * d * PI );
}
fn _waterVSmithGGX( NdL: f32, NdV: f32, a2: f32 ) -> f32 {
	let gv = NdL * sqrt( NdV * NdV * ( 1.0 - a2 ) + a2 );
	let gl = NdV * sqrt( NdL * NdL * ( 1.0 - a2 ) + a2 );
	return 0.5 / max( gv + gl, 1e-5 );
}
// depth via exact texel loads (float depth textures + filtering samplers are unreliable)
fn _waterSceneDepthAt( uv: vec2f ) -> f32 {
	let size = vec2f( textureDimensions( waterSceneDepth ) );
	let p = vec2i( clamp( uv, vec2f( 0.0 ), vec2f( 0.9999 ) ) * size );
	return textureLoad( waterSceneDepth, p, 0 ).x;
}
// linear view Z of the opaque scene for the reflection march (half float copy: the march is
// bandwidth bound and its thickness tests allow centimetres)
fn _waterSceneZAt( uv: vec2f ) -> f32 {
#if WATER_DEPTH_HALF
	let size = vec2f( textureDimensions( waterSceneDepthHalf ) );
	return - viewDepth( textureLoad( waterSceneDepthHalf, vec2i( clamp( uv, vec2f( 0.0 ), vec2f( 0.9999 ) ) * size ), 0 ).x );
#else
	return - viewDepth( _waterSceneDepthAt( uv ) );
#endif
}
fn _waterProject( p: vec3f ) -> vec2f {
	let clip = frame.proj * vec4f( p, 1.0 );
	let ndc = clip.xy / max( clip.w, 1e-4 );
	return vec2f( ndc.x * 0.5 + 0.5, ndc.y * -0.5 + 0.5 );
}

// --------------------------------------------------------------- screen-space reflection
// March the reflected ray through the opaque depth copy (view space, geometric steps, then a
// short bisection). Returns ( color, weight ): weight fades at screen edges, for rays heading
// back toward the camera and at the end of the search range.
// y0, ry: world height of the start and the ray's rise per metre. A hit beyond 260 m, or below the
// water on a descending ray, is weighted 0, so the march stops once the last miss is there.
fn _waterSSR( posV: vec3f, Rv: vec3f, y0: f32, ry: f32 ) -> vec4f {
	var hit = false;
	// steps grow with the distance: far away the first ones would all land in the same pixel
	let stepScale = max( - posV.z / 60.0, 1.0 );
	var t = 0.15 * stepScale;
	var dt = 0.25 * stepScale;
	var prevT = 0.0;
	for ( var i = 0; i < 11; i++ ) {
		prevT = t;
		if ( prevT >= 260.0 || ( ry <= 0.0 && y0 + ry * prevT < frame.seaLevel - 0.2 ) ) { break; }
		t += dt;
		dt *= 1.7;
		let p = posV + Rv * t;
		let uv = _waterProject( p );
		if ( uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0 || p.z > -0.1 ) { break; }
		let sz = _waterSceneZAt( uv );
		// behind the visible surface, within a thickness covering the last step
		if ( p.z < sz && sz - p.z < max( dt * 1.3, max( t * 0.08, 0.3 ) ) ) {
			hit = true;
			break;
		}
	}

	var color = vec3f( 0.0 );
	var weight = 0.0;
	if ( hit ) {
		// refine between the last miss and the hit
		var a = prevT; var b = t;
		for ( var k = 0; k < 3; k++ ) {
			let m = ( a + b ) * 0.5;
			let p = posV + Rv * m;
			let behind = p.z < _waterSceneZAt( _waterProject( p ) );
			b = select( b, m, behind );
			a = select( m, a, behind );
		}
		let hitT = b;
		let hitV = posV + Rv * b;
		let uv = _waterProject( hitV );
		// after refining, the ray must really touch the surface there (a ray that only passed far
		// behind a thin or distant object is a false hit)
		let gap = abs( _waterSceneZAt( uv ) - hitV.z );
		let touch = smoothstep( max( b * 0.04, 0.4 ), max( b * 0.02, 0.2 ), gap );
		// anything under the surface (seabed seen through the water, submerged hull) is not
		// visible to a reflected ray: those rays run into the next wave instead
		let hitY = ( frame.invView * vec4f( hitV, 1.0 ) ).y;
		color = textureSampleLevel( waterSceneColor, smpLinearClamp, uv, 0.0 ).rgb;
		let edge = smoothstep( 0.0, 0.06, uv.x ) * smoothstep( 1.0, 0.94, uv.x ) * smoothstep( 0.0, 0.06, uv.y ) * smoothstep( 1.0, 0.94, uv.y );
		let facing = smoothstep( 0.5, 0.1, Rv.z ); // rays toward the camera leave the screen
		weight = edge * facing * touch * smoothstep( 260.0, 120.0, hitT ) * smoothstep( frame.seaLevel - 0.15, frame.seaLevel + 0.35, hitY );
	}
	return vec4f( color, weight );
}
`,ws=new R({name:`waterHelpers`,deps:[z],code:Cs}),Ts=Math.fround,Es=e=>Ts(Number(Number(e).toFixed(6)));function Ds(e,t,n,r){t=Ts(t),n=Ts(n);let i=e.boxes[r].map(Es),a=e.info[r];if(t<i[0]||t>i[2]||n<i[1]||n>i[3])return!1;let o=a[0]+Math.max(0,Math.min(a[1]-1,Math.floor(Ts(Ts(n-i[1])/e.step)))),{pixels:s,width:c}=e,l=!1;for(let e=1;e<=s[o*c*4];e++){let r=(o*c+e)*4,[i,a,u,d]=s.subarray(r,r+4);a>n!=d>n&&t<Ts(i+Ts(Ts(Ts(u-i)*Ts(n-a))/Ts(d-a)))&&(l=!l)}return l}function Os(e,t,n){let r=0,i=1;for(let a=0;a<2;a++){let o=t[a]-e[a];if(o===0){if(e[a]<n[a]||e[a]>n[a+2])return!1;continue}let s=(n[a]-e[a])/o,c=(n[a+2]-e[a])/o;if(s>c&&([s,c]=[c,s]),r=Math.max(r,s),i=Math.min(i,c),r>i)return!1}return!0}function ks(e,{cell:t=2,halo:n=2}={}){if(t!==2||n<2||!Number.isFinite(n)||e.boxes.length>254)throw Error(`Unsafe water classification grid parameters`);if(e.boxes.flat().some(e=>!Number.isFinite(e)||Math.abs(e)>8192))throw Error(`Water classification requires bounded local coordinates`);let r=e.boxes.map(e=>e.map(Es)),i=[Math.floor(Math.min(...r.map(e=>e[0]))/t)*t-t,Math.floor(Math.min(...r.map(e=>e[1]))/t)*t-t],a=Math.ceil((Math.max(...r.map(e=>e[2]))-i[0])/t)+2,o=Math.ceil((Math.max(...r.map(e=>e[3]))-i[1])/t)+2,s=new Uint8Array(a*o),c=(e,n)=>{let r=Math.max(0,Math.floor((e[0]-i[0])/t)),s=Math.max(0,Math.floor((e[1]-i[1])/t)),c=Math.min(a-1,Math.floor((e[2]-i[0])/t)),l=Math.min(o-1,Math.floor((e[3]-i[1])/t));for(let e=s;e<=l;e++)for(let t=r;t<=c;t++)n(t,e,e*a+t)},l=(e,r)=>c([Math.min(e[0],r[0])-n,Math.min(e[1],r[1])-n,Math.max(e[0],r[0])+n,Math.max(e[1],r[1])+n],(a,o,c)=>{let l=i[0]+a*t,u=i[1]+o*t;Os(e,r,[l-n,u-n,l+t+n,u+t+n])&&(s[c]=255)});r.forEach((n,r)=>{let a=[[n[0],n[1]],[n[2],n[1]],[n[2],n[3]],[n[0],n[3]]];a.forEach((e,t)=>l(e,a[(t+1)%4]));let[o,u]=e.info[r],d=new Map;for(let t=o;t<o+u;t++)for(let n=1;n<=e.pixels[t*e.width*4];n++){let r=(t*e.width+n)*4,i=Array.from(e.pixels.subarray(r,r+4)),a=i.join(`,`),s=d.get(a);s||(s={e:i,rows:new Set},d.set(a,s),l(i.slice(0,2),i.slice(2))),s.rows.add(t-o)}for(let{e:t,rows:r}of d.values()){let i=Math.max(0,Math.floor(Ts(Ts(Math.min(t[1],t[3])-n[1])/e.step))),a=Math.min(u-1,Math.floor(Ts(Ts(Math.max(t[1],t[3])-n[1])/e.step)));for(let t=i;t<=a;t++)r.has(t)||c([n[0],n[1]+t*e.step-.01,n[2],n[1]+(t+1)*e.step+.01],(e,t,n)=>{s[n]=255})}c(n,(n,a,o)=>{s[o]!==255&&s[o]===0&&Ds(e,i[0]+(n+.5)*t,i[1]+(a+.5)*t,r)&&(s[o]=r+1)})});let u=s.reduce((e,t)=>e+(t===255),0);return{origin:i,cell:t,halo:n,width:a,height:o,pixels:s,stats:{bytes:s.byteLength,cells:s.length,uncertainCells:u,uniformCells:s.length-u}}}function As(e,t=.1){return e.map(e=>[Math.min(...e.outer.map(e=>e[0]))-t,Math.min(...e.outer.map(e=>e[1]))-t,Math.max(...e.outer.map(e=>e[0]))+t,Math.max(...e.outer.map(e=>e[1]))+t])}function js(e,t){let n=0;return t.forEach((t,r)=>{e[0]<=t[2]&&e[2]>=t[0]&&e[1]<=t[3]&&e[3]>=t[1]&&(n|=1<<r)}),n>>>0}function Ms(e,t=32){let n=As(e),r=[Math.floor(Math.min(...n.map(e=>e[0]))/t)*t,Math.floor(Math.min(...n.map(e=>e[1]))/t)*t],i=Math.ceil((Math.max(...n.map(e=>e[2]))-r[0])/t)+1,a=Math.ceil((Math.max(...n.map(e=>e[3]))-r[1])/t)+1,o=new Float32Array(i*a*4);for(let e=0;e<a;e++)for(let a=0;a<i;a++)o[(e*i+a)*4]=js([r[0]+a*t,r[1]+e*t,r[0]+(a+1)*t,r[1]+(e+1)*t],n);if(e.length>24)throw Error(`Rocha candidate texture requires at most 24 bodies`);return{origin:r,cell:t,width:i,height:a,pixels:o}}var Ns=e=>Number(e).toFixed(6),Ps=class{constructor(e,t,n,r,{optimized:i=!1,classification:a=!1}={}){this.data=e,this.terrainData=t,this.terrain=n,this.fft=r,this.params=new L(`RochaWaterSurface`,{amplitude:[`f32`,.025],slopeScale:[`f32`,.14],foamCoverage:[`f32`,0]},{label:`waterSurface`}),this.amplitude=this.params.fields.amplitude,this.state=new L(`RochaWaterState`,{design:[`f32`,1],camera:[`vec4f`,new P(-1e5,0,0,0)]},{label:`rochaWater`});let o=e.waterBodies,s=[],c=[],l=[];for(let e of o){let t=e.outer.map(e=>e[0]),n=e.outer.map(e=>e[1]),r=[Math.min(...t),Math.min(...n),Math.max(...t),Math.max(...n)],i=Math.max(1,Math.ceil((r[3]-r[1])/4)+1),a=s.length;for(let e=0;e<i;e++)s.push([]);for(let t of[e.outer,...e.holes||[]])for(let e=0,n=t.length-1;e<t.length;n=e++){let o=t[n],c=t[e],l=Math.max(0,Math.floor((Math.min(o[1],c[1])-r[1])/4)),u=Math.min(i-1,Math.floor((Math.max(o[1],c[1])-r[1])/4));for(let e=l;e<=u;e++)s[a+e].push([o[0],o[1],c[0],c[1]])}c.push(r),l.push([a,i,e.level||0,e.maxDepth||0])}let u=Math.max(...s.map(e=>e.length))+1,d=new Float32Array(u*s.length*4);if(s.forEach((e,t)=>{d[t*u*4]=e.length,e.forEach((e,n)=>d.set(e,(t*u+n+1)*4))}),this.edgeBands={boxes:c,info:l,width:u,pixels:d,step:4},this.edgeTexture=new H({label:`Rocha exact polygon edge bands`,width:u,height:s.length,format:`rgba32float`,usage:[`sample`,`copyDst`],data:d}),i){this.candidateGrid=Ms(e.waterBodies);let t=this.candidateGrid;this.candidateTexture=new H({label:`Rocha conservative water candidates`,width:t.width,height:t.height,format:`rgba32float`,usage:[`sample`,`copyDst`],data:t.pixels})}if(i&&a){this.classificationGrid=ks(this.edgeBands);let e=this.classificationGrid;this.classificationTexture=new H({label:`Rocha certified water cells`,width:e.width,height:e.height,format:`r8uint`,usage:[`sample`,`copyDst`],data:e.pixels})}let f=e=>e.map(e=>`vec4f(`+e.map(Ns).join(`,`)+`)`).join(`,`),p=`const rochaBoxes=array<vec4f,${o.length}>(${f(c)});
const rochaInfo=array<vec4f,${o.length}>(${f(l)});
fn rochaContains(p:vec2f,id:u32)->bool {
 let b=rochaBoxes[id];if(p.x<b.x||p.x>b.z||p.y<b.y||p.y>b.w){return false;}
 let bandInfo=rochaInfo[id];let row=i32(bandInfo.x)+clamp(i32(floor((p.y-b.y)/4.0)),0,i32(bandInfo.y)-1);
 let count=i32(textureLoad(rochaEdges,vec2i(0,row),0).x);var inside=false;
 for(var i=1;i<=count;i++){let e=textureLoad(rochaEdges,vec2i(i,row),0);if((e.y>p.y)!=(e.w>p.y)){if(p.x<e.x+(e.z-e.x)*(p.y-e.y)/(e.w-e.y)){inside=!inside;}}}
 return inside;
}
fn rochaWaterAt(p:vec2f)->vec4f {
 if(rochaWater.design<0.5){return vec4f(-100000.0,0.0,0.0,0.0);}
 for(var i=0u;i<${e.waterBodies.length}u;i++){if(rochaContains(p,i)){return vec4f(rochaInfo[i].z,rochaInfo[i].w,f32(i+1u),0.025);}}
 return vec4f(-100000.0,0.0,0.0,0.0);}
`;if(i){let t=this.candidateGrid;if(p=p.replace(`fn rochaWaterAt(p:vec2f)->vec4f {`,`fn rochaWaterUncached(p:vec2f)->vec4f {`),p=p.replace(` for(var i=0u;i<${e.waterBodies.length}u;i++){if(rochaContains(p,i)){`,`#if ROCHA_DRY_SURVEY
 return vec4f(-100000.0,0.0,0.0,0.0);
#else
#if ROCHA_KNOWN_BODY
 let id=ROCHA_KNOWN_BODY_ID;
 if(rochaContains(p,id)){return vec4f(rochaInfo[id].z,rochaInfo[id].w,f32(id+1u),0.025);}
 return vec4f(-100000.0,0.0,0.0,0.0);
#else
#if ROCHA_CANDIDATE_MASK
 let candidates=ROCHA_CANDIDATE_MASK_VALUE;
#else
 let cell=vec2i(floor((p-vec2f(${t.origin.map(Ns).join(`,`)}))/${Ns(t.cell)}));
 if(any(cell<vec2i(0))||any(cell>=vec2i(${t.width},${t.height}))){return vec4f(-100000.0,0.0,0.0,0.0);}
 let candidates=u32(textureLoad(rochaCandidates,cell,0).x);
#endif
 for(var i=0u;i<${e.waterBodies.length}u;i++){if((candidates&(1u<<i))!=0u&&rochaContains(p,i)){`),p=p.replace(` return vec4f(-100000.0,0.0,0.0,0.0);}`,` return vec4f(-100000.0,0.0,0.0,0.0);
#endif
#endif
}`),this.classificationGrid){let e=this.classificationGrid;p=p.replace(`#else
#if ROCHA_KNOWN_BODY`,`#else
 let certifiedCell=vec2i(floor((p-vec2f(${e.origin.map(Ns).join(`,`)}))/${Ns(e.cell)}));
 if(all(certifiedCell>=vec2i(0))&&all(certifiedCell<vec2i(${e.width},${e.height}))){
   let bodyCode=textureLoad(rochaClassification,certifiedCell,0).x;
   if(bodyCode==0u){return vec4f(-100000.0,0.0,0.0,0.0);}
   if(bodyCode!=255u){let certifiedId=bodyCode-1u;
#if ROCHA_KNOWN_BODY
     if(certifiedId==ROCHA_KNOWN_BODY_ID){return vec4f(rochaInfo[certifiedId].z,rochaInfo[certifiedId].w,f32(bodyCode),0.025);}
#else
#if ROCHA_CANDIDATE_MASK
     if((ROCHA_CANDIDATE_MASK_VALUE&(1u<<certifiedId))!=0u){return vec4f(rochaInfo[certifiedId].z,rochaInfo[certifiedId].w,f32(bodyCode),0.025);}
#else
     return vec4f(rochaInfo[certifiedId].z,rochaInfo[certifiedId].w,f32(bodyCode),0.025);
#endif
#endif
   }
 }
#if ROCHA_KNOWN_BODY`)}p+=`
var<private> rochaCached:bool=false;
var<private> rochaCachedPosition:vec2f;
var<private> rochaCachedWater:vec4f;
fn rochaWaterAt(p:vec2f)->vec4f {
 if(rochaCached&&all(p==rochaCachedPosition)){return rochaCachedWater;}
 rochaCachedPosition=p;rochaCachedWater=rochaWaterUncached(p);rochaCached=true;return rochaCachedWater;
}
`}p+=`fn waterQueryHeightAtXZ(p:vec2f)->f32 {return rochaWaterAt(p).x;}
fn waterQueryCameraState()->vec4f{return rochaWater.camera;}
fn waterQueryResult(slot:u32)->vec4f{return rochaWater.camera;}
fn waterQueryHeightAt(slot:u32)->f32{return rochaWater.camera.x;}
`,this.boundaryModule=new R({name:`rochaWaterBoundaries`,uniforms:this.state,uniformName:`rochaWater`,bindings:{rochaEdges:{texture:this.edgeTexture,sampleType:`unfilterable-float`},...i?{rochaCandidates:{texture:this.candidateTexture,sampleType:`unfilterable-float`}}:{},...this.classificationTexture?{rochaClassification:{texture:this.classificationTexture}}:{}},code:p}),this.module=new R({name:`rochaWaterSurface`,deps:[z,this.boundaryModule,n.module,r.module],uniforms:this.params,uniformName:`waterSurface`,code:`
struct WaterSurfaceVertex {position:vec3f,lagXZ:vec2f,height:f32,depth:f32,foam:f32,shoreN:vec3f,shoreFoam:f32,swash:f32,surfMask:vec2f};
struct WaterSurfaceFrag {normal:vec3f,foam:f32,coverage:f32,slopes:vec2f,jacobian:f32,rough:f32,aeration:f32,gust:f32,slick:f32};
fn waterSurfaceSeaDepth(p:vec2f)->f32{return max(0.0,rochaWaterAt(p).x-terrainHeightAt(p));}
fn waterSurfaceVertex(node:vec4f,p:vec2f)->WaterSurfaceVertex {
 let body=rochaWaterAt(p);let level=node.x;
 // Keep boundary vertices fixed; normals carry the fine ripples over the whole surface.
 return WaterSurfaceVertex(vec3f(p.x,level,p.y),p,level,max(.05,level-terrainHeightAt(p)),0.0,vec3f(0.0,1.0,0.0),0.0,0.0,vec2f(0.0));
}
fn waterSurfaceFragment(p:vec2f,footprint:f32,depth:f32,vertexFoam:f32,shoreN:vec3f,shoreFoam:f32,extraFoam:f32,sim:vec4f,surf:vec2f,P:vec3f)->WaterSurfaceFrag {
 var d=vec4f(0.0);
 for(var c=2;c<4;c++){d+=textureSample(oceanDerivatives,smpAniso4Repeat,p/ocean.sizes[c].x,c);}
 let slopes=d.xy*waterSurface.amplitude;
 let n=normalize(vec3f(-slopes.x,1.0,-slopes.y));
 return WaterSurfaceFrag(n,0.0,1.0,slopes,1.0,0.35,0.0,0.0,0.0);
}
`}),this.count=1,this.inputs=new Float32Array(256),this.cpu=new Float32Array(256),this.resultInputs=new Float32Array(256),this.cpuValid=!0,this.version=0,this.resultTime=0,this.flatMode=!1,this.slots=new Map,this.epoch=0,this.readback={invalidate:()=>{this.epoch++}}}allocate(e,t){if(this.slots.has(e))return this.slots.get(e);let n=this.count;if(this.count+=t,this.count>64)throw Error(`Too many inland queries`);return this.slots.set(e,n),n}setPoint(e,t,n){this.inputs[e*4]=t,this.inputs[e*4+1]=n}setCamera(e,t){this.setPoint(0,e,t)}update(){for(let e=0;e<this.count;e++){let t=e*4,n=this.inputs[t],r=this.inputs[t+1],i=this.terrainData.surveyed?null:this.terrainData.waterBodyAt(n,r);this.cpu[t]=i?i.level:-1e5,this.cpu[t+1]=this.cpu[t+2]=0,this.cpu[t+3]=this.terrainData.heightAt(n,r)}this.resultInputs.set(this.inputs),this.cpuValid=!0,this.resultTime=V.time.value,this.version++,this.state.fields.camera.value.fromArray(this.cpu),this.state.fields.design.value=+!this.terrainData.surveyed}cameraState(){let e=e=>{let t=new String(e);return t.module=this.boundaryModule,t},t=e(`waterQueryCameraState()`);for(let n of`xyzw`)t[n]=e(`waterQueryCameraState().`+n);return t}get resultsModule(){return this.boundaryModule}get heightModule(){return this.boundaryModule}};function Fs(e,t,n={}){let r=new tn;r.setAttribute(`position`,new Ht(e,3)),r.setIndex(t);for(let[e,t]of Object.entries(n))r.setAttribute(e,new Ht(t.data,t.size));return r.computeVertexNormals(),r.computeBoundingBox(),r.computeBoundingSphere(),r}function Is(e,t,{spacing:n=8,nodeLevel:r=!1,optimizeFlat:i=!1,bodyData:a=!1}={}){let o=[],s=[],c=[],l=[],u=[],d=0,f=0,p=0,m,h=(e,n)=>{if(!i)return t(e[0],e[1],n);let r=e[0]+`,`+e[1];return m.has(r)||m.set(r,t(e[0],e[1],n)),m.get(r)},g=(e,t,n,r,i=null)=>{let d=o.length/3;for(let s of[e,t,n])o.push(s[0],i??h(s,r),s[1]),c.push(r.level||0,0,0,0),a&&(l.push(p+1),u.push(r.level||0));let f=(t[1]-e[1])*(n[0]-e[0])-(t[0]-e[0])*(n[1]-e[1])>0;s.push(d,d+(f?1:2),d+(f?2:1))},_=(e,t,r,i,a=0)=>{let o=(e,t)=>Math.hypot(e[0]-t[0],e[1]-t[1]),s=[o(e,t),o(t,r),o(r,e)],c=Math.max(...s);if(a<28&&c>n){let n=[e,t,r],o=s.indexOf(c),l=n[o],u=n[(o+1)%3],d=n[(o+2)%3],f=[(l[0]+u[0])/2,(l[1]+u[1])/2],p=_(l,f,d,i,a+1),m=_(f,u,d,i,a+1),h=[];h[o]=p.edges[0].slice(0,-1).concat(m.edges[0]),h[(o+1)%3]=m.edges[1],h[(o+2)%3]=p.edges[2];let g=p.count+m.count,v=p.flat&&m.flat&&p.y===m.y,y=v?h.flatMap(e=>e.slice(0,-1)):null;return v&&y.length<g?{edges:h,count:g,flat:v,y:p.y,patches:[{boundary:y,center:[(e[0]+t[0]+r[0])/3,(e[1]+t[1]+r[1])/3],y:p.y,parent:[e,t,r],depth:a}]}:{edges:h,count:g,flat:v,y:p.y,patches:p.patches.concat(m.patches)}}let l=[e,t,r].map(e=>Math.fround(h(e,i)));return{edges:[[e,t],[t,r],[r,e]],count:1,flat:l[0]===l[1]&&l[0]===l[2],y:l[0],patches:[{triangle:[e,t,r]}]}},v=(e,t,r,i,a=0,o=!0)=>{let s=[e,t,r],c=s.map((e,t)=>Math.hypot(e[0]-s[(t+1)%3][0],e[1]-s[(t+1)%3][1])),l=Math.max(...c);if(a<28&&l>n){let e=c.indexOf(l),t=s[e],n=s[(e+1)%3],r=s[(e+2)%3],u=[(t[0]+n[0])/2,(t[1]+n[1])/2];v(t,u,r,i,a+1,o),v(u,n,r,i,a+1,o);return}o&&d++,g(e,t,r,i)};for(let[t,n]of e.entries()){p=t,m=new Map;let e=n.outer.map(e=>new j(...e)),r=(n.holes||[]).map(e=>e.map(e=>new j(...e))),a=ut.triangulateShape(e,r),o=[e,...r].flat().map(e=>[e.x,e.y]);for(let e of a){if(!i){v(...e.map(e=>o[e]),n);continue}let t=_(...e.map(e=>o[e]),n);d+=t.count;for(let e of t.patches){if(e.triangle){g(...e.triangle,n);continue}let t=(e,t,n)=>(t[1]-e[1])*(n[0]-e[0])-(t[0]-e[0])*(n[1]-e[1]),r=e.center.map(Math.fround);if(!e.boundary.every((n,i)=>{let a=e.boundary[(i+1)%e.boundary.length];return t(r,n.map(Math.fround),a.map(Math.fround))*t(e.center,n,a)>0})){v(...e.parent,n,e.depth,!1);continue}f++;for(let t=0;t<e.boundary.length;t++)g(e.center,e.boundary[t],e.boundary[(t+1)%e.boundary.length],n,e.y)}}}let y=Fs(o,s,r?{nodeData:{size:4,data:c}}:{});return a&&(y.setAttribute(`waterBodyId`,new Vt(l,1)),y.setAttribute(`waterLevel`,new Ht(u,1))),i&&(y=Ls(y)),y.userData.renderOptimization={originalTriangles:d,triangles:y.index.count/3,flatPatches:f,vertices:y.attributes.position.count},y}function Ls(e,{removeDuplicateTriangles:t=!1}={}){let n=Object.entries(e.attributes);if(n.some(([,e])=>e.isInterleavedBufferAttribute||e.isInstancedBufferAttribute))throw Error(`Exact deduplication requires non-interleaved vertex attributes`);let r=n.map(([,e])=>new Uint8Array(e.array.buffer,e.array.byteOffset,e.array.byteLength)),i=e.attributes.position.count,a=new Uint32Array(i),o=[],s=new Map;for(let e=0;e<i;e++){let t=``;for(let i=0;i<n.length;i++){let a=n[i][1],o=a.itemSize*a.array.BYTES_PER_ELEMENT;t+=String.fromCharCode(...r[i].subarray(e*o,(e+1)*o))}let i=s.get(t);i===void 0&&(i=o.length,s.set(t,i),o.push(e)),a[e]=i}let c=new tn;for(let[e,t]of n){let n=new t.array.constructor(o.length*t.itemSize);o.forEach((e,r)=>n.set(t.array.subarray(e*t.itemSize,(e+1)*t.itemSize),r*t.itemSize)),c.setAttribute(e,new Rt(n,t.itemSize,t.normalized))}let l=e.index?.array??Uint32Array.from({length:i},(e,t)=>t),u=[],d=new Set,f=e.drawRange.start,p=Math.min(l.length,f+e.drawRange.count);for(let e=t?p-3:f;t?e>=f:e<p;e+=t?-3:3){let n=a[l[e]],r=a[l[e+1]],i=a[l[e+2]],o=[`${n},${r},${i}`,`${r},${i},${n}`,`${i},${n},${r}`].sort()[0];t&&d.has(o)||(d.add(o),t?u.push(i,r,n):u.push(n,r,i))}return t&&u.reverse(),c.setIndex(u),c.computeBoundingBox(),c.computeBoundingSphere(),c.userData={...e.userData,deduplication:{originalVertices:i,vertices:o.length,removedTriangles:(p-f-u.length)/3}},c}function Rs(e,t,{width:n=.12,lift:r=.05}={}){let i=[],a=[];for(let o of e)for(let e=1;e<o.length;e++){let s=o[e-1],c=o[e],l=c[0]-s[0],u=c[1]-s[1],d=Math.hypot(l,u);if(d<.001)continue;let f=Math.max(1,Math.ceil(d/3));for(let e=0;e<f;e++){let o=s[0]+l*e/f,c=s[1]+u*e/f,p=s[0]+l*(e+1)/f,m=s[1]+u*(e+1)/f,h=-u/d*n/2,g=l/d*n/2,_=[[o-h,c-g],[o+h,c+g],[p+h,m+g],[p-h,m-g]],v=i.length/3;for(let[e,n]of _)i.push(e,t.heightAt(e,n)+r,n);a.push(v,v+1,v+2,v,v+2,v+3)}}return Fs(i,a)}var zs=class{constructor(e){this.canvas=e,this.keys=new Set,this.look={x:0,y:0},this.enabled=!1,this.drag=null,e.addEventListener(`keydown`,e=>{this.enabled&&[`KeyW`,`KeyA`,`KeyS`,`KeyD`,`KeyQ`,`KeyE`,`KeyC`,`Space`,`ShiftLeft`,`ShiftRight`].includes(e.code)&&(this.keys.add(e.code),e.preventDefault())}),window.addEventListener(`keyup`,e=>this.keys.delete(e.code)),window.addEventListener(`blur`,()=>this.clear()),e.addEventListener(`blur`,()=>{document.pointerLockElement!==e&&this.clear()}),document.addEventListener(`mousemove`,t=>{this.enabled&&document.pointerLockElement===e&&(this.look.x+=t.movementX,this.look.y+=t.movementY)}),e.addEventListener(`pointerdown`,t=>{this.enabled&&(e.focus({preventScroll:!0}),this.drag={x:t.clientX,y:t.clientY},e.setPointerCapture(t.pointerId))}),e.addEventListener(`pointermove`,t=>{this.enabled&&this.drag&&document.pointerLockElement!==e&&(this.look.x+=t.clientX-this.drag.x,this.look.y+=t.clientY-this.drag.y,this.drag={x:t.clientX,y:t.clientY})});for(let t of[`pointerup`,`pointercancel`])e.addEventListener(t,()=>this.drag=null)}clear(){this.keys.clear(),this.look.x=this.look.y=0,this.drag=null}down(e){return this.enabled&&this.keys.has(e)}consumeLook(){let e={...this.look};return this.look.x=this.look.y=0,e}};function J(e){let t=e>>>0;return function(){t=t+1831565813>>>0;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}var Bs=class{constructor(e=1){let t=J(e),n=new Uint8Array(256);for(let e=0;e<256;e++)n[e]=e;for(let e=255;e>0;e--){let r=Math.floor(t()*(e+1)),i=n[e];n[e]=n[r],n[r]=i}this.perm=new Uint8Array(512);for(let e=0;e<512;e++)this.perm[e]=n[e&255];this.grad=new Float32Array(512);for(let e=0;e<256;e++){let n=t()*Math.PI*2;this.grad[e*2]=Math.cos(n),this.grad[e*2+1]=Math.sin(n)}}noise(e,t){let n=Math.floor(e),r=Math.floor(t),i=e-n,a=t-r,o=n&255,s=r&255,c=this.perm,l=this.grad,u=c[o+c[s]],d=c[o+1+c[s]],f=c[o+c[s+1]],p=c[o+1+c[s+1]],m=l[u*2]*i+l[u*2+1]*a,h=l[d*2]*(i-1)+l[d*2+1]*a,g=l[f*2]*i+l[f*2+1]*(a-1),_=l[p*2]*(i-1)+l[p*2+1]*(a-1),v=i*i*i*(i*(i*6-15)+10),y=a*a*a*(a*(a*6-15)+10),b=m+(h-m)*v;return(b+(g+(_-g)*v-b)*y)*1.414}fbm(e,t,n=5,r=2,i=.5){let a=0,o=1,s=1,c=0;for(let l=0;l<n;l++)a+=this.noise(e*s+l*17.13,t*s-l*9.71)*o,c+=o,o*=i,s*=r;return a/c}ridged(e,t,n=5){let r=0,i=.5,a=1,o=1;for(let s=0;s<n;s++){let n=1-Math.abs(this.noise(e*a+s*31.7,t*a+s*11.3));n*=n,r+=n*i*o,o=n,i*=.5,a*=2.03}return r}},Y=(e,t,n)=>{let r=Math.min(1,Math.max(0,(n-e)/(t-e)));return r*r*(3-2*r)},Vs=(e,t,n)=>Math.min(n,Math.max(t,e)),Hs={terrainSize:2048,terrainRes:2048,beach:{xMin:-150,xMax:170},pier:{x:55,zStart:-64,zEnd:40,deckHeight:2.3,width:2.6,headWidth:14,headDepth:7},boatDock:{position:new N(64.5,0,36.5),heading:0},village:{center:new N(40,0,-118),radius:95},reef:{center:new N(-78,0,58),radius:58},spawn:{position:new N(18,0,-60),yaw:Math.PI},start:{position:new N(53.6,0,-77),yaw:Math.PI},swellDir:new j(-.12,-1).normalize()};function Us(e,t,n){let r=Math.imul(e,374761393)+Math.imul(t,668265263)+Math.imul(n,1274126177);return r=Math.imul(r^r>>>13,1274126177),r^=r>>>16,(r>>>0)/4294967296}var Ws=512;function Gs(e,t){let n=new Float32Array(e*e),r=new Float32Array(e*e);for(let i=0;i<e;i++)for(let a=0;a<e;a++){let o=Us(a,i,t)*6.2831853;n[i*e+a]=Math.cos(o),r[i*e+a]=Math.sin(o)}return(t,i)=>{let a=Math.floor(t),o=Math.floor(i),s=t-a,c=i-o,l=(a%e+e)%e,u=(o%e+e)%e,d=l+1===e?0:l+1,f=u+1===e?0:u+1,p=u*e+l,m=u*e+d,h=f*e+l,g=f*e+d,_=n[p]*s+r[p]*c,v=n[m]*(s-1)+r[m]*c,y=n[h]*s+r[h]*(c-1),b=n[g]*(s-1)+r[g]*(c-1),x=s*s*s*(s*(s*6-15)+10),S=c*c*c*(c*(c*6-15)+10);return(_+(v-_)*x+(y-_+(_-v-y+b)*x)*S)*1.414}}function Ks(e,t,n){let r=[];for(let i=0;i<t;i++)r.push(Gs(e<<i,n+i*17));return(e,n)=>{let i=0,a=1,o=0,s=1;for(let c=0;c<t;c++)i+=r[c](e*s,n*s)*a,o+=a,a*=.5,s*=2;return i/o}}function qs(e,t){let n=e+4,r=new Float32Array(n*n),i=new Float32Array(n*n),a=new Float32Array(n*n);for(let o=0;o<n;o++)for(let s=0;s<n;s++){let c=(s-2+e)%e,l=(o-2+e)%e;r[o*n+s]=Us(c,l,t)+s-2,i[o*n+s]=Us(c,l,t+1)+o-2,a[o*n+s]=Us(c,l,t+2)}let o={f1:0,edge:0,id:0};return(e,t,s=2)=>{let c=Math.floor(e),l=Math.floor(t),u=99,d=0,f=0;for(let o=-1;o<=1;o++){let s=(l+o+2)*n+2+c;for(let n=-1;n<=1;n++){let o=s+n,c=r[o]-e,l=i[o]-t,p=c*c+l*l;p<u&&(u=p,d=a[o],f=o)}}let p=99;if(s>1){let a=r[f],o=i[f];for(let s=-2;s<=2;s++){let u=(l+s+2)*n+2+c;for(let n=-2;n<=2;n++){let s=u+n;if(s===f)continue;let c=r[s],l=i[s],d=c-a,m=l-o,h=Math.sqrt(d*d+m*m),g=((a+c)*.5-e)*d/h+((o+l)*.5-t)*m/h;g<p&&(p=g)}}}return o.f1=Math.sqrt(u),o.edge=p,o.id=d,o.dx=e-r[f],o.dy=t-i[f],o}}var Js=(e,t,n)=>{let r=Math.min(1,Math.max(0,(n-e)/(t-e)));return r*r*(3-2*r)},Ys=null;function Xs(){if(Ys)return Ys;let e=performance.now(),t=Ks(4,2,11),n=Ks(4,2,23),r=qs(7,101),i=qs(23,211),a=Ks(16,3,307),o=qs(26,401),s=qs(12,601),c=Ks(10,3,503),l=Gs(180,701),u=Gs(90,709),d=qs(18,801),f=Ks(4,5,907),p=new Uint8Array(Ws*Ws*4);for(let e=0;e<Ws;e++){let m=e/Ws;for(let h=0;h<Ws;h++){let g=h/Ws,_=(e*Ws+h)*4,v=g+t(g*4,m*4)*.035,y=m+n(g*4,m*4)*.035;v-=Math.floor(v),y-=Math.floor(y);let b=r(v*7,y*7),x=b.id*40,S=Js(0,.2,b.edge),C=((b.dx*Math.cos(x)+b.dy*Math.sin(x))*.5+(b.id-.5)*.22)*S,w=Js(0,.1+.08*b.id,b.edge),T=i(v*23,y*23,2),E=T.id*40,D=Js(0,.14,T.edge),O=((T.dx*Math.cos(E)+T.dy*Math.sin(E))*.22+(T.id-.5)*.1)*D,k=a(g*16,m*16),A=(.45+C+O*.6+.16*k)*(.66+.34*w)*(.94+.06*D);b=o(g*26,m*26,1);let j=b.id<.6?(1-Js(.1+.15*b.id,.45,b.f1))*(.4+.6*b.id):0,M=c(g*10,m*10),ee=s(g*12,m*12,1),te=ee.id<.15?1-Js(.06,.28,ee.f1):0,N=.34+.3*M+.26*j+.45*te,P=l(g*180,m*180)*.55+u(g*90,m*90)*.45,ne=d(g*18,m*18,1),re=ne.id<.2?Math.max(0,1-(ne.f1/(.14+.12*ne.id*5))**2):0,ie=.45+.2*P+.5*Math.sqrt(re),ae=.5+.55*f(g*4,m*4);A=A<0?0:A>1?1:A,N=N<0?0:N>1?1:N,ie=ie<0?0:ie>1?1:ie,ae=ae<0?0:ae>1?1:ae,p[_]=A*255,p[_+1]=N*255,p[_+2]=ie*255,p[_+3]=ae*255}}let m=new H({label:`terrainDetail`,width:Ws,height:Ws,format:`rgba8unorm`,mips:!0,usage:[`sample`,`copyDst`],sampler:`aniso4Repeat`,data:p});return m.getGPU(),ia(m),m.userData={},m.image={width:Ws,height:Ws,data:p},m.userData.ms=performance.now()-e,Ys=m,m}var X={minHeight:1.8,villageRadius:100,villagePalms:10,pathClear:12,path:{x:Hs.pier.x,z0:-130,z1:-40},spawnClear:5,obstacleClear:2,boardwalk:[[55,-65],[54.6,-72],[52.4,-82],[48.4,-92],[44.8,-100.5],[42.6,-107.2]],boardwalkWidth:1.8};function Zs(){let e=Xs(),t=e.image.width,n=e.image.data;return(e,r,i)=>{let a=e*t-.5,o=r*t-.5,s=Math.floor(a),c=Math.floor(o),l=a-s,u=o-c,d=(s%t+t)%t,f=(c%t+t)%t,p=(d+1)%t,m=(f+1)%t,h=n[(f*t+d)*4+i],g=n[(f*t+p)*4+i],_=n[(m*t+d)*4+i],v=n[(m*t+p)*4+i];return((h*(1-l)+g*l)*(1-u)+(_*(1-l)+v*l)*u)/255}}var Qs=(e,t,n)=>[e*Math.cos(n)-t*Math.sin(n),e*Math.sin(n)+t*Math.cos(n)],$s=class{constructor(e,{seed:t=1234,footprints:n=[],paths:r=null}={}){this.terrain=e,this.noise=new Bs(t),this.noise2=new Bs(t*7+3),this.n=new N,this.village=Hs.village.center,this.spawn=Hs.spawn.position,this.detail=Zs(),this.hasVillage=n.length>0,this.setObstacles(n,r??[{points:X.boardwalk,width:X.boardwalkWidth}])}setObstacles(e,t){this.footprints=e.map(e=>({x:e.x,z:e.z,r:e.r})),this.segments=[];for(let e of t){let t=e.points;for(let n=0;n<t.length-1;n++)this.segments.push([t[n][0],t[n][1],t[n+1][0],t[n+1][1],(e.width??1.8)*.5])}let n=this.obstacleBounds={x0:1/0,z0:1/0,x1:-1/0,z1:-1/0},r=(e,t,r)=>{n.x0=Math.min(n.x0,e-r),n.x1=Math.max(n.x1,e+r),n.z0=Math.min(n.z0,t-r),n.z1=Math.max(n.z1,t+r)};for(let e of this.footprints)r(e.x,e.z,e.r);for(let e of this.segments)r(e[0],e[1],e[4]),r(e[2],e[3],e[4])}obstacleDist(e,t){let n=this.obstacleBounds;if(e<n.x0-25||e>n.x1+25||t<n.z0-25||t>n.z1+25)return 1e9;let r=1e9;for(let n of this.footprints)r=Math.min(r,Math.hypot(e-n.x,t-n.z)-n.r);for(let[n,i,a,o,s]of this.segments){let c=a-n,l=o-i,u=c*c+l*l||1,d=Vs(((e-n)*c+(t-i)*l)/u,0,1);r=Math.min(r,Math.hypot(e-n-c*d,t-i-l*d)-s)}return r}height(e,t){return this.terrain.heightAt(e,t)}_mask(e,t,n,r=1){let i=this.terrain,a=(t-i.origin)/i.texel-.5,o=(n-i.origin)/i.texel-.5;if(a<0||o<0||a>=i.res-1||o>=i.res-1)return 0;let s=Math.floor(a),c=Math.floor(o),l=a-s,u=o-c,d=c*i.res+s;return((e[d]*(1-l)+e[d+1]*l)*(1-u)+(e[d+i.res]*(1-l)+e[d+i.res+1]*l)*u)*r}rock(e,t){return this._mask(this.terrain.rock,e,t)}normalY(e,t){return this.terrain.normalAt(e,t,this.n).y}villageDist(e,t){return Math.hypot(e-this.village.x,t-this.village.z)}pathDist(e,t){let n=X.path,r=Vs(t,n.z0,n.z1);return Math.hypot(e-n.x,t-r)}spawnDist(e,t){return Math.hypot(e-this.spawn.x,t-this.spawn.z)}inBay(e,t){return Math.abs(e-10)<235&&t>-245&&t<-30}cover(e,t,n={}){let r=this.terrain,i=this.height(e,t),a=this.normalY(e,t),o=1-a,[s,c]=Qs(e,t,.7),[l,u]=Qs(e,t,2.1),d=this.detail(s/173,c/173,3),f=this.detail(l/47,u/47,3),p=d*.6+f*.4,m=this._mask(r.gully,e,t,1/255)*Y(-.5,.5,i),h=Vs(Y(9,24,i+(p-.5)*18)+Y(.18,.36,o)+m*.6,0,1),g=this.rock(e,t);return n.h=i,n.ny=a,n.slope=o,n.macro=p,n.mA=d,n.mB=f,n.gully=m,n.forest=h,n.rock=g,n.bare=Math.max(g*1.4,Y(.42,.55,o)),n.sand=this._mask(r.sand,e,t,1/255),n.path=this._mask(r.path,e,t,1/255),n.scarp=r.scarp?this._mask(r.scarp,e,t,1/255):0,n}allowed(e,t,n,{minH:r=X.minHeight,maxBare:i=.35,clear:a=0,big:o=!1,maxSand:s=.5,maxPath:c=.3}={}){return!(n.h<r||n.bare>i||n.sand>s||n.path>c||n.scarp>.3||this.spawnDist(e,t)<X.spawnClear+a||this.pathDist(e,t)<(o?X.pathClear:X.pathClear*.5)||this.obstacleDist(e,t)<X.obstacleClear+a||this.terrain.pathDistance&&this.terrain.pathDistance(e,t)<.6+a*.5)}groundY(e,t,n){let r=this.height(e,t);return n>0&&(r=Math.min(r,this.height(e+n,t),this.height(e-n,t),this.height(e,t+n),this.height(e,t-n))),r}downhill(e,t){this.terrain.normalAt(e,t,this.n);let n=Math.hypot(this.n.x,this.n.z);return n>1e-4?[this.n.x/n,this.n.z/n]:[0,1]}},ec=class{constructor(e=4){this.cell=e,this.map=new Map}_key(e,t){return(e+32768)*65536+(t+32768)}add(e,t,n,r){let i=this._key(Math.floor(e/this.cell),Math.floor(t/this.cell)),a=this.map.get(i);a||this.map.set(i,a=[]),a.push(e,t,n,r)}free(e,t,n,r=1){let i=n+8,a=this.cell,o=Math.floor((e-i)/a),s=Math.floor((e+i)/a),c=Math.floor((t-i)/a),l=Math.floor((t+i)/a);for(let i=c;i<=l;i++)for(let a=o;a<=s;a++){let o=this.map.get(this._key(a,i));if(o)for(let i=0;i<o.length;i+=4){let a=o[i]-e,s=o[i+1]-t,c=(o[i+2]+n)*r;if(a*a+s*s<c*c)return!1}}return!0}},tc={PALM:1,TREE:2,BANANA:3,SHRUB:4,YOUNG:5,FERN:6,BROAD:7};function nc(e,t,n,r,i,a,o){for(let s=n;s<i;s+=a)for(let n=t;n<r;n+=a)o(n+e()*a,s+e()*a)}var rc=null;function ic(e,t,n,r=!1){let i=rc;if(n.h<2.3||n.h>80||n.bare>.45||n.path>.3)return 0;let a=i.villageDist(e,t),o=Y(X.villageRadius+5,X.villageRadius+40,a);return o<=0?0:o*(1-.6*(Y(18,55,n.h)*(1-n.gully))+.5*n.gully)*(r?1:1-Y(.35,.7,n.sand))*(1-Y(.25,.45,n.rock))}function ac(e,t=99){rc=e;let n=J(t),r=new ec(4),i=new ec(6),a=e.noise,o=e.noise2,s={palms:[],trees:[],bananas:[],shrubs:[],youngPalms:[],ferns:[],monsteras:[],elephantEars:[],heliconias:[],strelitzias:[]},c=Math.PI*2,l={},u=-660,d=-900;nc(n,u,d,660,320,4.6,(t,u)=>{if(e.cover(t,u,l),l.h<3)return;let d=a.fbm(t/60,u/60,3)*.6+o.fbm(t/17,u/17,2)*.4,f=l.forest>.5?.9:Y(.15,.5,l.forest)*.38*Y(-.25,.2,d)+.008;if(u>-20&&(f=l.forest>.5?.45*Y(-.2,.2,d):f),l.forest<=.5&&(f+=ic(t,u,l)*(.9*Y(-.2,.2,d)+.1)),n()>f||!e.allowed(t,u,l,{minH:3,maxBare:.3,clear:5,big:!0}))return;let p=(l.forest>.5&&n()<.3?.55+n()*.2:.8+n()*.5)*(l.forest>.5?1:.85)*(n()<.08?1.3:1),m=.78+n()*.34+(n()<.1?.25:0),h=2.5*p;if(!i.free(t,u,h,1))return;i.add(t,u,h,tc.TREE),r.add(t,u,.5*p,tc.TREE);let g=n()*c;s.trees.push({x:t,y:e.groundY(t,u,.6)-.15,z:u,s:p,sy:m,yaw:g,la:g,l:m,H:12.5*p*m,seed:n()})});let f=(t,r,i)=>{let[a,o]=e.downhill(t,r),s=a*.35,l=1+o*.35,u=Math.atan2(l,s)+(n()-.5)*1.1,d=(.1+.32*(1-Y(2.3,5.5,i)))*(.55+.75*n()),f=.85+n()*.32,p=(7+n()*6.5)*(.9+.2*f);return{x:t,y:e.groundY(t,r,.35)-.05,z:r,s:f,yaw:n()*c,la:u,l:d,H:p,seed:n()}};nc(n,-240,-230,250,-40,3.4,(t,c)=>{if(!e.inBay(t,c)||e.villageDist(t,c)<X.villageRadius)return;e.cover(t,c,l);let u=a.fbm(t/48,c/48,3)+.4*o.fbm(t/17,c/17,2),d=Y(1.95,2.35,l.h)*(1-Y(5.2,7.2,l.h)),p=.5*Y(-.28,.22,u)*d;n()>p||!e.allowed(t,c,l,{minH:2,maxBare:.2,clear:3,big:!0,maxSand:1.01,maxPath:.5})||l.ny<.9||r.free(t,c,1.95,1)&&i.free(t,c,1.5,1)&&(r.add(t,c,1.95,tc.PALM),s.palms.push(f(t,c,l.h)))});let p=[];nc(n,-70,-220,150,-60,3.5,(t,r)=>{if(e.villageDist(t,r)>=X.villageRadius||!e.hasVillage&&r<-106||(e.cover(t,r,l),l.h<2.05||l.h>14||l.bare>.2||l.ny<.9)||e.pathDist(t,r)<X.pathClear||e.spawnDist(t,r)<X.spawnClear+3)return;let i=e.obstacleDist(t,r);if(i<3.5)return;let a=e.hasVillage?Y(4.5,6,i)*(1-Y(10,16,i)):0,o=Y(2,2.3,l.h)*(1-Y(3.6,4.4,l.h));p.push({x:t,z:r,h:l.h,r:n()*(.25+Math.max(a,o))})}),p.sort((e,t)=>t.r-e.r);let m=0;for(let e of p){if(m>=X.villagePalms)break;r.free(e.x,e.z,5.5,1)&&i.free(e.x,e.z,3,1)&&(r.add(e.x,e.z,5.5,tc.PALM),s.palms.push(f(e.x,e.z,e.h)),m++)}s.villagePalms=m,nc(n,u,d,660,-20,12,(t,a)=>{e.cover(t,a,l);let u=(.04+.4*Y(0,.45,o.fbm(t/110+3.3,a/110-1.7,3)))*(1-Y(60,160,l.h));if(n()>u||e.villageDist(t,a)<X.villageRadius||!e.allowed(t,a,l,{minH:6,maxBare:.2,clear:3,big:!0})||l.ny<.8||!r.free(t,a,2,1)||!i.free(t,a,1.2,1))return;r.add(t,a,2,tc.PALM);let[d,f]=e.downhill(t,a),p=.8+n()*.35;s.palms.push({x:t,y:e.groundY(t,a,.35)-.05,z:a,s:p,yaw:n()*c,la:Math.atan2(f,d)+(n()-.5)*1.5,l:.03+n()*.12,H:(8+n()*7)*p,seed:n()})});for(let e of s.palms){let t=0,n=0;for(let r of s.palms){if(r===e)continue;let i=e.x-r.x,a=e.z-r.z,o=i*i+a*a;if(o<25&&o>1e-6){let e=Math.sqrt(o);t+=i/e*(5-e),n+=a/e*(5-e)}}if(t!==0||n!==0){let r=Math.cos(e.la),i=Math.sin(e.la),a=Math.min(1,Math.hypot(t,n)/3);e.la=Math.atan2(i*(1-a)+n/Math.hypot(t,n)*a,r*(1-a)+t/Math.hypot(t,n)*a),e.l=Math.max(e.l,.14+.1*a)}}return nc(n,u,d,660,320,3,(t,i)=>{if(e.cover(t,i,l),l.h<2.3)return;let u=a.fbm(t/26+11.3,i/26-4.1,3)*.7+o.fbm(t/9,i/9,2)*.3,d=Y(.2,.45,l.forest)*(1-Y(.75,.95,l.forest)),f=e.inBay(t,i)&&l.h<5.5,p=d*.75+l.gully*.5+(l.forest>.9?.12:0)+(f?.08:.03),m=ic(t,i,l,!0);if(p+=m*(.32+.45*(1-Y(3.5,9,l.h)))*(1-Y(.5,.8,l.forest)),p*=Y(-.2,.25,u),e.villageDist(t,i)<X.villageRadius&&(p*=.35),n()>p||!e.allowed(t,i,l,{minH:2.3,maxBare:.4,clear:1.2}))return;let h=(.75+n()*.8)*(m>.3?1.35:1),g=.65+n()*.65;if(!r.free(t,i,.85*h,1))return;r.add(t,i,.85*h,tc.SHRUB);let _=n()*c;s.shrubs.push({x:t,y:e.groundY(t,i,.3)-.08*h,z:i,s:h,sy:g,yaw:_,la:_,l:-g,H:1.6*h*g,seed:n()})}),nc(n,-280,-420,360,-40,4.2,(t,i)=>{let a=e.villageDist(t,i);if(a>330)return;e.cover(t,i,l);let u=.75*Y(.12,.38,o.fbm(t/38-5.1,i/38+2.2,3))*(1-Y(220,330,a))*(1-Y(.8,1,l.forest)*.6);if(n()>u||!e.allowed(t,i,l,{minH:3.4,maxBare:.2,clear:1.5})||l.ny<.82)return;let d=.8+n()*.45;r.free(t,i,1.1*d,1)&&(r.add(t,i,1.1*d,tc.BANANA),s.bananas.push({x:t,y:e.groundY(t,i,.2)-.05,z:i,s:d,yaw:n()*c,la:n()*c,l:n()*.08,H:1.8*d*(.8+n()*.5),seed:n()}))}),nc(n,u,d,660,-20,6.5,(t,i)=>{if(e.cover(t,i,l),l.h<2.3||l.h>120)return;let o=a.fbm(t/48,i/48,3),u=(e.inBay(t,i)?.22:.1)*Y(-.3,.2,o)*(1-l.forest*.6);if(n()>u||!e.allowed(t,i,l,{minH:2.3,maxBare:.2,clear:1.5}))return;let d=.7+n()*.6;r.free(t,i,1.1*d,1)&&(r.add(t,i,1.1*d,tc.YOUNG),s.youngPalms.push({x:t,y:l.h-.05,z:i,s:d,yaw:n()*c,la:n()*c,l:n()*.1,H:.35*d,seed:n()}))}),nc(n,u,d,660,-20,2.2,(t,i)=>{if(e.cover(t,i,l),l.h<4)return;let a=o.fbm(t/28-9.9,i/28+3.7,3),u=(.08+.72*Y(.3,.8,l.forest)+l.gully*.4)*Y(-.35,.2,a);if(n()>u||!e.allowed(t,i,l,{minH:4,maxBare:.45,clear:.5}))return;let d=.75+n()*.7;r.free(t,i,.5*d,1)&&(r.add(t,i,.5*d,tc.FERN),s.ferns.push({x:t,y:l.h-.03,z:i,s:d,yaw:n()*c,la:0,l:0,H:.05,seed:n()}))}),nc(n,u,d,660,-20,3.2,(t,i)=>{if(e.cover(t,i,l),l.h<3.5)return;let a=o.fbm(t/22+7.7,i/22-1.3,3),u=e.villageDist(t,i)<95?.18*Y(.3,.7,l.forest+.4):0,d=(.5*Y(.35,.75,l.forest)+l.gully*.35+u)*Y(0,.35,a);if(n()>d||!e.allowed(t,i,l,{minH:3.5,maxBare:.35,clear:1,maxSand:.15})||l.ny<.75)return;let f=.8+n()*.6;r.free(t,i,.9*f,1)&&(r.add(t,i,.9*f,tc.BROAD),s.monsteras.push({x:t,y:l.h-.04,z:i,s:f,yaw:n()*c,la:n()*c,l:n()*.05,H:.02,seed:n()}))}),nc(n,u,d,660,-20,3.6,(t,i)=>{if(e.cover(t,i,l),l.h<2.6)return;let o=a.fbm(t/30-3.1,i/30+8.4,3),u=(l.gully*.8+Y(7,3,l.h)*.25+Y(.25,.5,l.forest)*(1-Y(.7,.95,l.forest))*.25)*Y(.05,.4,o);if(n()>u||!e.allowed(t,i,l,{minH:2.6,maxBare:.3,clear:1,maxSand:.15})||l.ny<.8)return;let d=.95+n()*.55;r.free(t,i,1.1*d,1)&&(r.add(t,i,1.1*d,tc.BROAD),s.elephantEars.push({x:t,y:l.h-.04,z:i,s:d,yaw:n()*c,la:n()*c,l:n()*.05,H:.02,seed:n()}))}),nc(n,u,d,660,-20,3.4,(t,i)=>{let a=e.villageDist(t,i);if(e.cover(t,i,l),l.h<3)return;let u=Y(.2,.45,l.forest)*(1-Y(.7,.9,l.forest)),d=e.obstacleDist(t,i),f=a<110?Y(16,4,d)*.45+.04:0,p=(u*.12+f)*Y(-.1,.3,o.fbm(t/18+2.2,i/18-6.6,2));if(n()>p||!e.allowed(t,i,l,{minH:3,maxBare:.3,clear:1.2,maxSand:.25})||l.ny<.8)return;let m=.85+n()*.35;r.free(t,i,.9*m,1)&&(r.add(t,i,.9*m,tc.BROAD),s.heliconias.push({x:t,y:l.h-.04,z:i,s:m,yaw:n()*c,la:n()*c,l:n()*.04,H:.02,seed:n()}))}),nc(n,u,d,660,-20,3,(t,i)=>{if(e.villageDist(t,i)>105||(e.cover(t,i,l),l.h<3))return;let o=Y(10,3.5,e.obstacleDist(t,i))*.35*Y(-.2,.3,a.fbm(t/14-4.4,i/14+6.6,2));if(n()>o||!e.allowed(t,i,l,{minH:3,maxBare:.3,clear:.8,maxSand:.25})||l.ny<.85)return;let u=.85+n()*.3;r.free(t,i,.7*u,1)&&(r.add(t,i,.7*u,tc.BROAD),s.strelitzias.push({x:t,y:l.h-.03,z:i,s:u,yaw:n()*c,la:n()*c,l:n()*.03,H:.02,seed:n()}))}),s}function oc(e){let t=e.terrain,n=Math.round(t.size/2),r=t.size/n,i=new Uint8Array(n*n*4),a=e.noise,o=e.noise2,s={};for(let c=1;c<n-1;c++){let l=t.origin+(c+.5)*r;if(!(l>0||l<-950))for(let u=1;u<n-1;u++){let d=c*n+u,f=t.origin+(u+.5)*r;if(t.heightAt(f,l)<1.7||e.rock(f,l)>.45||(e.cover(f,l,s),s.bare>.5))continue;let p=e.spawnDist(f,l);if(p<X.spawnClear+2)continue;let m=e.obstacleDist(f,l);if(m<X.obstacleClear+1)continue;let h=Y(X.spawnClear+2,X.spawnClear+4,p)*Y(X.obstacleClear+1,X.obstacleClear+3.5,m)*(1-Y(.2,.5,s.path))*(1-Y(.25,.45,s.bare)),g=e.inBay(f,l),_=a.noise(f/7.5,l/7.5)*.65+o.noise(f/19,l/19)*.35,v=e.hasVillage?1-.55*(1-Y(3,9,m)):1-.85*(1-Y(X.villageRadius-6,X.villageRadius+4,e.villageDist(f,l))),y=Y(2.5,4.5,s.h)*(1-Y(.45,.85,s.forest))*(1-Y(.3,.7,s.sand))*v*(.75+.25*Y(-.4,.3,_)),b=0,x=0,S=0;if(g){let n=a.noise(f/16+4.4,l/16-2.2)*.6+o.noise(f/6-1.7,l/6+8.1)*.4,r=s.h-(2.15-n*.4),i=0;if(s.scarp<.3&&t.scarp){let n=e.height(f+8,l)-e.height(f-8,l),r=e.height(f,l+8)-e.height(f,l-8),a=Math.hypot(n,r);if(a>.001){n/=a,r/=a;for(let a=1;a<=34;a+=1.5)i=Math.max(i,e._mask(t.scarp,f+n*a,l+r*a,1/255))}i=Y(.3,.5,i)}let c=Y(.3,.5,s.scarp);r=r*(1-i)-2*i;let u=Y(0,.35,r),d=Y(-.45,-.1,r)*(1-u)*Y(.35,.6,a.noise(f/2.6+9.3,l/2.6-4.1)),p=1-Y(4.8,6.5,s.h),m=o.noise(f/4.2+5.5,l/4.2-3.3)*.6+a.noise(f/11-7.1,l/11+1.9)*.4,h=(.3+.7*Y(-.45,.25,m))*(.6+.4*Y(-.35,.35,_));b=Math.max(u*h,d*.85)*p*(1-Y(.4,.8,s.forest)),b=b*(1-c)+c*.18*Y(.7,1,s.scarp)*Y(0,.4,m),x=Y(0,.25,r)*(1-Y(1.4,2.2,r))*Y(0,.45,a.noise(f/13+3.1,l/13-7.7)),S=Y(-.6,-.15,r)*(1-Y(1.2,2,r))*Y(-.15,.3,o.noise(f/9-2.3,l/9+5.3)),S=Math.max(S*(1-c),c*.6*Y(0,.35,o.noise(f/3.5+1.1,l/3.5-2.9)))}let C=d*4;i[C]=Math.round(255*Vs(b*h,0,1)),i[C+1]=Math.round(255*Vs(y*h*(1-b),0,1)),i[C+2]=Math.round(255*Vs(x*h,0,1)),i[C+3]=Math.round(255*Vs(S*h,0,1))}}return{data:i,res:n}}var sc=1100,cc=new F,lc=new M,uc=new N,dc=new N,fc=new N(0,1,0),pc=class{constructor(e,t=32){let n=e.length;this.count=n,this.qualityLevel=1,this.qualityRanks=oo(n),this.qualityLimit=n,this.px=new Float32Array(n),this.py=new Float32Array(n),this.pz=new Float32Array(n),this.matrices=new Float32Array(n*16),this.qr2=new Float32Array(n),this.iPos=new Float32Array(n*4),this.iDat=new Float32Array(n*4);for(let t=0;t<n;t++){let n=e[t];this.px[t]=n.x,this.py[t]=n.y,this.pz[t]=n.z,uc.set(n.x,n.y,n.z),lc.setFromAxisAngle(fc,n.yaw),n.msx===void 0?dc.set(n.s,n.s*Math.abs(n.sy||1),n.s):dc.set(n.msx,n.msy,n.msz),cc.compose(uc,lc,dc).toArray(this.matrices,t*16),this.iPos.set([n.x,n.y,n.z,n.s],t*4),this.iDat.set([n.la||0,n.l||0,n.H||1,n.seed],t*4),this.qr2[t]=n.qr?n.qr*n.qr:0}this.cellSize=t;let r=new Map;for(let e=0;e<n;e++){let n=this._key(Math.floor(this.px[e]/t),Math.floor(this.pz[e]/t)),i=r.get(n);i||r.set(n,i=[]),i.push(e)}this.cells=new Map;for(let[e,t]of r)this.cells.set(e,Int32Array.from(t))}_key(e,t){return(e+4096)*8192+(t+4096)}queryNear(e,t,n,r){let i=this.cellSize,a=Math.floor((e-n)/i),o=Math.floor((e+n)/i),s=Math.floor((t-n)/i),c=Math.floor((t+n)/i),l=n*n,u=0;for(let n=s;n<=c;n++)for(let i=a;i<=o;i++){let a=this.cells.get(this._key(i,n));if(a)for(let n=0;n<a.length;n++){let i=a[n],o=this.px[i]-e,s=this.pz[i]-t,c=this.qr2[i]||l;o*o+s*s<c&&u<r.length&&(r[u++]=i)}}return u}},mc=class{constructor(e,t,n){this.capacity=Math.max(t,sc);let r=this.capacity;this.instanceMatrix=new Ut(new Float32Array(r*16),16),this.iBuffer=new Gt(new Float32Array(r*8),8),this.iPos=new Kt(this.iBuffer,4,0),this.iDat=new Kt(this.iBuffer,4,4),this.lodRange=n.clone(),this.meshes=[],this.count=0,this.trianglesPerInstance=0;for(let{geometry:t,material:n,castShadow:i=!1,name:a=``}of e){t.setAttribute(`iPos`,this.iPos),t.setAttribute(`iDat`,this.iDat);let e=new cn(t,n,r);e.instanceMatrix=this.instanceMatrix,e.count=0,e.name=a,e.castShadow=i,e.receiveShadow=!0,e.frustumCulled=!1,e.userData.lodRange=this.lodRange,e.drawParams=[this.lodRange.x,this.lodRange.y,this.lodRange.z],e.matrixAutoUpdate=!1,e.updateMatrix(),this.meshes.push(e),this.trianglesPerInstance+=(t.index?t.index.count:t.attributes.position.count)/3}}setDynamic(){this.instanceMatrix.setUsage(Pt),this.iBuffer.setUsage(Pt)}fill(e,t=null,n=e.count,r=!0){n=Math.min(n,t===null?e.count:t.length);let i=0,a=this.instanceMatrix.array,o=this.iBuffer.array,s=e.matrices,c=e.iPos,l=e.iDat;for(let u=0;u<n&&i<this.capacity;u++){let n=t===null?u:t[u];if(e.qualityLevel===0||e.qualityLevel<1&&e.qualityRanks[n]>=e.qualityLimit)continue;if(r){let e=n*16,t=i*16;for(let n=0;n<16;n++)a[t+n]=s[e+n]}let d=n*4,f=i*8;o[f]=c[d],o[f+1]=c[d+1],o[f+2]=c[d+2],o[f+3]=c[d+3],o[f+4]=l[d],o[f+5]=l[d+1],o[f+6]=l[d+2],o[f+7]=l[d+3],i++}n=i,r&&(this.instanceMatrix.clearUpdateRanges(),this.instanceMatrix.addUpdateRange(0,n*16),this.instanceMatrix.needsUpdate=!0),this.iBuffer.clearUpdateRanges(),this.iBuffer.addUpdateRange(0,n*8),this.iBuffer.needsUpdate=!0,this.count=n;for(let e of this.meshes)e.count=n}get triangles(){return this.count*this.trianglesPerInstance}},hc=class{constructor(e,t,{near:n=null,far:r=null,nearRange:i=100,fade:a=null,margin:o=14,refreshDistance:s=6,farExcludeNear:c=!1,sortNear:l=!1,sortFar:u=!1,farRefresh:d=16}={}){this.name=e,this.sortNear=l,this.sortFar=u&&!!r&&!c,this.farRefresh=d,this.farX=1/0,this.farZ=1/0,this.inst=new pc(t),this.nearRange=i,this.margin=o,this.refreshDistance=s,this.lastX=1/0,this.lastY=1/0,this.lastZ=1/0,this.levels=[];let f=r?new N(0,i,i+.01):new N(0,a[0],a[1]);this.queryRadius=(r?i:a[1])+o,n&&(this.nearIds=new Int32Array(Math.max(1,this.inst.count)),this.near=new mc(n,Math.min(this.inst.count,6e3),f),this.near.setDynamic(),this.levels.push(this.near)),r&&(this.far=new mc(r.parts,this.inst.count,new N(i,r.fade[0],r.fade[1])),this.far.fill(this.inst),this.levels.push(this.far),this.sortFar&&(this.far.setDynamic(),this.farIds=new Int32Array(Math.max(1,this.inst.count))),this.farExcludeNear=c,c&&(this.far.setDynamic(),this.farIds=new Int32Array(Math.max(1,this.inst.count))))}get meshes(){return this.levels.flatMap(e=>e.meshes)}overdue(e){if(!this.near)return-1;let t=e.x-this.lastX,n=e.y-this.lastY,r=e.z-this.lastZ,i=t*t+n*n+r*r,a=Number.isFinite(i)?Math.sqrt(i)-this.refreshDistance:1e9;if(!this.sortFar)return a;let o=Math.hypot(e.x-this.farX,e.z-this.farZ);return Math.max(a,Number.isFinite(o)?o-this.farRefresh:1e9)}_sortFar(e){this.farX=e.x,this.farZ=e.z;let{px:t,pz:n,count:r}=this.inst,i=this._bucket||=new Uint16Array(r),a=this._bstart||=new Int32Array(1025);a.fill(0);for(let o=0;o<r;o++){let r=Math.min(1023,Math.floor(Math.hypot(t[o]-e.x,n[o]-e.z)/6));i[o]=r,a[r+1]++}for(let e=0;e<1024;e++)a[e+1]+=a[e];for(let e=0;e<r;e++)this.farIds[a[i[e]]++]=e;this.far.fill(this.inst,this.farIds,r,!1)}update(e,t=!1){if(!this.near||!t&&this.overdue(e)<0)return!1;this.sortFar&&!(Math.hypot(e.x-this.farX,e.z-this.farZ)<this.farRefresh)&&this._sortFar(e),this.lastX=e.x,this.lastY=e.y,this.lastZ=e.z;let n=this.inst.queryNear(e.x,e.z,this.queryRadius,this.nearIds);if(this.sortNear){let{px:t,pz:r}=this.inst,i=this.nearIds.subarray(0,n),a=this._sortKey||=new Float32Array(this.nearIds.length);for(let o=0;o<n;o++){let n=i[o];a[n]=(t[n]-e.x)**2+(r[n]-e.z)**2}i.sort((e,t)=>a[e]-a[t])}if(this.near.fill(this.inst,this.nearIds,n),this.farExcludeNear){let t=Math.max(0,this.nearRange-this.refreshDistance-2),n=t*t,{px:r,py:i,pz:a}=this.inst,o=0;for(let t=0;t<this.inst.count;t++){let s=r[t]-e.x,c=i[t]-e.y,l=a[t]-e.z;s*s+c*c+l*l>=n&&(this.farIds[o++]=t)}this.far.fill(this.inst,this.farIds,o)}return!0}},gc=new R({name:`lodFade`,code:`
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
`}),_c=class{constructor(){this.pos=[],this.nor=[],this.uv=[],this.veg=[],this.mat=[],this.lobe=[],this.kind=0,this.idx=[]}get count(){return this.pos.length/3}vertex(e,t,n,r,i,a,o=null){return o?this.lobe.push(o[0],o[1],o[2],o[3]):this.lobe.push(0,0,0,-1-this.kind),this.pos.push(e.x,e.y,e.z),this.nor.push(t.x,t.y,t.z),this.uv.push(n,r),this.veg.push(i[0],i[1],i[2],i[3]),this.mat.push(a[0],a[1],a[2],a[3]),this.count-1}tri(e,t,n){this.idx.push(e,t,n)}quad(e,t,n,r){this.idx.push(e,t,n,e,n,r)}build(e=0,t=null){let n=this.count,r=[[`position`,this.pos,3],[`normal`,this.nor,3],[`uv`,this.uv,2],[`aVeg`,this.veg,4],[`aMat`,this.mat,4],[`aLobe`,this.lobe,4]],i=r.reduce((e,t)=>e+t[2],0),a=new Float32Array(n*i),o=0;for(let[,e,t]of r){for(let r=0;r<n;r++)for(let n=0;n<t;n++)a[r*i+o+n]=e[r*t+n];o+=t}let s=new Wt(a,i),c=new tn;o=0;for(let[e,,t]of r)c.setAttribute(e,new Kt(s,t,o)),o+=t;return c.setIndex(n>65535?new Vt(this.idx,1):new Bt(this.idx,1)),c.computeBoundingBox(),c.computeBoundingSphere(),e>0&&(c.boundingSphere.radius=Math.max(c.boundingSphere.radius,e),t&&c.boundingSphere.center.copy(t)),c}get triangles(){return this.idx.length/3}},Z={STEM:0,FROND:1,FERN:2,BANANA:3,COCONUT:5,MONSTERA:6,ELEPHANT:7,HELICONIA:8,BRACT:9,STRELITZIA:10,BIRD:11},vc=new N(0,1,0),yc=new N,bc=new N,xc=new N,Sc=new N,Cc=(e,t,n)=>{let r=Math.min(1,Math.max(0,(n-e)/(t-e)));return r*r*(3-2*r)};function wc(e,{radial:t,rows:n,radius:r,Hgeo:i,mat:a=[0,0,0,0],cap:o=!0,texU:s=1,lumps:c=null}){let l=e.count;for(let o=0;o<n.length;o++){let l=n[o],u=r(l),d=.01,f=(r(l+d)-r(l-d))/(2*d*i);for(let n=0;n<=t;n++){let r=n/t*Math.PI*2,o=Math.cos(r),d=Math.sin(r),p=c?u*(1+c(l,r)):u;yc.set(o*p,l*i,d*p),bc.set(o,-f,d).normalize(),e.vertex(yc,bc,n/t*s,l,[l,0,0,0],a)}}for(let r=0;r<n.length-1;r++)for(let n=0;n<t;n++){let i=l+r*(t+1)+n,a=i+t+1;e.quad(i,a,a+1,i+1)}if(o){let r=n[n.length-1],o=e.vertex(yc.set(0,r*i,0),vc,.5,r,[r+.015,0,0,0],a),s=l+(n.length-1)*(t+1);for(let n=0;n<t;n++)e.tri(s+n,o,s+n+1)}}function Tc(e,t){let{origin:n,azimuth:r,elevation:i,bend:a,twist:o=0,length:s,segs:c=8,cross:l=2,leafLen:u,leafAngle:d,droop:f,curl:p=.2,part:m=Z.FROND,age:h=0,seed:g=0,phase:_=0,flutter:v=1,minWidth:y=.035,bendPow:b=1.4,stemU:x=1,roll:S=0,sBase:C=0}=t,w=[],T=n.clone();for(let e=0;e<=c;e++){w.push(T.clone());let t=(e+.5)/c,n=i-a*t**+b,l=r+o*t;yc.set(Math.cos(n)*Math.cos(l),Math.sin(n),Math.cos(n)*Math.sin(l)),T.addScaledVector(yc,s/c)}let E=new N(-Math.sin(r),0,Math.cos(r)),D=new N,O=new N,k=new N,A=new N,j=new N;for(let t of[-1,1]){let n=[];for(let e=0;e<=c;e++){let r=e/c;D.subVectors(w[Math.min(c,e+1)],w[Math.max(0,e-1)]).normalize(),O.crossVectors(D,vc),O.lengthSq()<.04&&O.copy(E),O.normalize(),k.crossVectors(O,D).normalize();let i=Math.max(u(r),y),a=d(r),o=f(r)+t*S*r*r;A.copy(O).multiplyScalar(t*Math.cos(o)).addScaledVector(k,-Math.sin(o)),j.copy(D).multiplyScalar(Math.cos(a)).addScaledVector(A,Math.sin(a)).normalize();let s=[];for(let t=0;t<=l;t++){let n=t/l,a=w[e].clone().addScaledVector(j,i*n).addScaledVector(k,-i*p*n*n);s.push({q:a,s:r,t:n,Ll:i,nup:k.clone()})}n.push(s)}let r=[];for(let t=0;t<=c;t++){let i=[];for(let r=0;r<=l;r++){let a=n[t][r],o=Math.max(0,t-1),s=Math.min(c,t+1),u=Math.max(0,r-1),d=Math.min(l,r+1);bc.subVectors(n[s][r].q,n[o][r].q),xc.subVectors(n[t][d].q,n[t][u].q),Sc.crossVectors(bc,xc),Sc.lengthSq()<1e-12&&Sc.copy(a.nup),Sc.normalize(),Sc.dot(a.nup)<0&&Sc.negate();let f=a.t*Cc(.05,.3,a.s)*v;i.push(e.vertex(a.q,Sc,a.s,a.t,[x,C+(1-C)*a.s,f,_],[m,h,a.Ll,g]))}r.push(i)}for(let n=0;n<c;n++)for(let i=0;i<l;i++){let a=r[n][i],o=r[n+1][i],s=r[n+1][i+1],c=r[n][i+1];t>0?e.quad(a,c,s,o):e.quad(a,o,s,c)}}}function Ec(e,t,n,r,i){let a=new Sn(1,0),o=a.attributes.position,s=new Map,c=[];for(let a=0;a<o.count;a++){yc.fromBufferAttribute(o,a);let l=yc.x.toFixed(3)+`,`+yc.y.toFixed(3)+`,`+yc.z.toFixed(3),u=s.get(l);u===void 0&&(bc.copy(yc).multiply(n).add(t),xc.copy(yc).divide(n).normalize(),u=e.vertex(bc,xc,.5,.5,i,r),s.set(l,u)),c.push(u)}for(let t=0;t<c.length;t+=3)e.tri(c[t],c[t+1],c[t+2]);a.dispose()}var Dc=10,Oc=e=>{let t=e*Dc,n=.155+.045*(1-e)+.19*Math.exp(-Math.max(t,0)/.42);return n*=1+.05*Math.sin(t*1.7)*(1-e),n+=.07*Cc(.955,.99,e)-.1*Cc(.995,1.02,e),n},kc=(e,t)=>{let n=Math.max(e*Dc,0);return Math.exp(-n/.3)*(.16*Math.max(0,Math.sin(t*5+.7))+.08*Math.sin(t*11+2.1))};function Ac(e,t){let n=[];for(let r=0;r<t;r++){let i=t>1?r/(t-1):.5,a=t>10&&r>=t-2,o=(3.8+1.5*Cc(0,.45,i))*(.88+.24*e());n.push({a:i,dead:a,azimuth:r*2.39996+(e()-.5)*.4,elevation:a?-1.05-(r-(t-2))*.25:1-1.25*i**.8+(e()-.5)*.3,bend:a?.35:.55+1.15*i+e()*.4,bendPow:a?1.2:1.9+e()*.5,twist:(e()-.5)*.45,roll:(e()-.5)*(a?.4:.9),length:a?o*.9:o,attachY:.32-.5*i,seed:e(),phase:e()})}return n}function jc(e,t,{segs:n,cross:r,leafScale:i=1}){for(let a of t){let t=new N(Math.cos(a.azimuth)*.14,a.attachY,Math.sin(a.azimuth)*.14),o=a.length;Tc(e,{origin:t,azimuth:a.azimuth,elevation:a.elevation,bend:a.bend,bendPow:a.bendPow,twist:a.twist,roll:a.roll,length:o,segs:n,cross:r,leafLen:e=>i*.23*o*(Cc(.14,.3,e)*(1-.68*Cc(.35,1,e))),leafAngle:e=>1.1-.5*e,droop:e=>(a.dead?1.3:.88+.35*a.a)+.45*e,curl:a.dead?.15:.45,part:Z.FROND,age:a.dead?1:a.a*.55,seed:a.seed,phase:a.phase,flutter:a.dead?.3:1,minWidth:.045})}}function Mc(e=11){let t=J(e),n=new _c;wc(n,{radial:10,rows:[-.03,0,.015,.04,.08,.14,.22,.32,.43,.54,.65,.76,.86,.94,.975,.992,1.005],radius:Oc,Hgeo:Dc,mat:[Z.STEM,0,0,0],lumps:kc});for(let e=0;e<6;e++){let r=e*2.39996+t()*.5,i=.2+t()*.1,a=new N(Math.cos(r)*i,-.3-t()*.35,Math.sin(r)*i),o=.12+t()*.035;Ec(n,a,new N(o,o*1.12,o),[Z.COCONUT,t(),0,e/6],[1,0,0,0])}return jc(n,Ac(t,18),{segs:8,cross:2}),{geometry:n.build(16,new N(0,6,0)),triangles:n.triangles}}function Nc(e=11){let t=J(e),n=new _c;return wc(n,{radial:5,rows:[-.03,.03,.2,.6,1],radius:Oc,Hgeo:Dc,mat:[Z.STEM,0,0,0],cap:!1}),jc(n,Ac(t,18).filter((e,t)=>t!==1&&t!==5&&t!==9&&t!==13),{segs:3,cross:1,leafScale:1.15}),{geometry:n.build(16,new N(0,6,0)),triangles:n.triangles}}function Pc(e=5,t=new _c){let n=J(e);wc(t,{radial:5,rows:[-.2,.3,1],radius:e=>.16-.07*e,Hgeo:.6,mat:[Z.STEM,.35,0,0],cap:!1});for(let e=0;e<8;e++){let r=e/7,i=e*2.39996+n()*.4,a=(1.7+.9*r)*(.85+.3*n());Tc(t,{origin:new N(0,.1-.15*r,0),azimuth:i,elevation:1.35-.8*r+(n()-.5)*.2,bend:.6+.7*r,twist:(n()-.5)*.3,length:a,segs:5,cross:1,leafLen:e=>.21*a*(Cc(.04,.25,e)*(1-.6*Cc(.3,1,e))),leafAngle:e=>1-.4*e,droop:e=>.25+.4*r+.2*e,curl:.15,part:Z.FROND,age:r*.4,seed:n(),phase:n(),minWidth:.03})}return{geometry:t.build(4,new N(0,1,0)),triangles:t.triangles}}function Fc(e=3,t=new _c){let n=J(e);for(let e=0;e<9;e++){let r=e/8,i=e*2.39996+n()*.5,a=(.75+.5*r)*(.85+.3*n());Tc(t,{origin:new N(0,.05,0),azimuth:i,elevation:1.3-.55*r+(n()-.5)*.2,bend:1.3+.8*r,twist:(n()-.5)*.5,length:a,segs:4,cross:1,bendPow:1.2,leafLen:e=>.2*a*(Cc(.02,.2,e)*(1-.8*Cc(.35,1,e))),leafAngle:()=>1.35,droop:e=>.12+.2*e,curl:.08,part:Z.FERN,age:0,seed:n(),phase:n(),minWidth:.012,flutter:.6})}return{geometry:t.build(1.6,new N(0,.4,0)),triangles:t.triangles}}function Ic(e=9,t=new _c){let n=J(e),r=[{h:2.1+n()*.5,r:.12,leaves:8,dead:3,off:0},{h:1.3+n()*.4,r:.085,leaves:6,dead:1,off:.32},{h:.55+n()*.25,r:.05,leaves:3,dead:0,off:.3,sucker:!0},{h:.35+n()*.2,r:.04,leaves:3,dead:0,off:.28,sucker:!0}],i=new N,a=n()*Math.PI*2;for(let e of r){a+=2.1+n()*.8;let r=new N(Math.cos(a)*e.off,0,Math.sin(a)*e.off),o=e.off>0?a:n()*Math.PI*2,s=new N(Math.cos(o),0,Math.sin(o)).multiplyScalar((e.off>0?.1:.04)+n()*.05),c=[];for(let t=0;t<=3;t++){let n=t/3;c.push(r.clone().add(new N(0,e.h*n,0)).addScaledVector(s,e.h*n*n))}let l=c[3],u=Math.min(.55,.2+e.h*.15),d=n();nl(t,c,{radius:t=>e.r*(1-.35*t)*(1+.25*Math.exp(-t*7)),radial:e.sucker?4:6,part:Z.BANANA,age:0,seed:d,phase:n(),s0:0,s1:u});let f=e.leaves+e.dead;for(let r=0;r<f;r++){let a=r>=e.leaves,o=r/Math.max(1,e.leaves-1),s=r*2.39996+n()*.6;i.set(Math.cos(s),0,Math.sin(s));let c=e.sucker?.35+n()*.15:e.h/2.4,d=(1.9+.8*n())*c*(a?.85:1),f=(e.sucker?.14:.3+.08*n())*(e.sucker?1:Math.max(.6,c));Tc(t,{origin:l.clone().add(new N(i.x*e.r*.5,-(a?.15+n()*.35:o*.2)*e.h,i.z*e.r*.5)),azimuth:s,elevation:a?-.9-n()*.5:(e.sucker?1.25:1.2-.85*o)+(n()-.5)*.25,bend:a?.35:e.sucker?.5:1+1.3*o+n()*.4,twist:(n()-.5)*.5,length:d,segs:a||e.sucker?3:5,cross:1,bendPow:1.6,roll:(n()-.5)*.8,leafLen:e=>f*Math.max(0,Math.sin(Math.PI*Math.min(1,Math.max(0,(e-.1)/.9))))**.5*(a?.6:1),leafAngle:()=>1.45,droop:e=>a?.9:.2+.45*e+.2*o,curl:a?.5:.15,part:Z.BANANA,age:a?.92+n()*.06:o*.45+n()*.15,seed:n(),phase:n(),minWidth:.03,flutter:a?.3:.8,sBase:u})}}return{geometry:t.build(4,new N(0,1.5,0)),triangles:t.triangles}}var Lc=12.5,Rc=[[.4,9.9,-.3,2.9],[-2,8.3,1.6,2.6],[3,7.7,1.2,2.4],[1.7,6.8,-3,2.5],[-3.2,6.3,-1.8,2.3],[.4,5.6,3.4,2.2],[-1.1,11.2,-1.7,1.8],[3.7,5.2,-.9,1.9]],zc=[.15,3.7,-.05],Bc=1.6,Vc=[[0,.85,0,.8],[.75,.6,.35,.6],[-.6,.55,.55,.6],[-.25,.65,-.75,.62],[.35,1.25,-.25,.48]];function Hc(e,t,n,r,i,a,o,s,c,l,u=null){let d=new N().subVectors(n,t),f=d.length();d.normalize();let p=Math.abs(d.y)<.9?vc:new N(1,0,0),m=new N().crossVectors(d,p).normalize(),h=new N().crossVectors(m,d).normalize(),g=e.count;for(let n=0;n<=o;n++){let p=n/o,g=new N().copy(t).addScaledVector(d,f*p);for(let t=0;t<=a;t++){let n=t/a*Math.PI*2,o=u?u(p,n,g):r+(i-r)*p,d=new N().copy(m).multiplyScalar(Math.cos(n)).addScaledVector(h,Math.sin(n)),_=g.clone().addScaledVector(d,o);e.vertex(_,d,t/a,p*f,[Math.max(0,_.y/c),l(_),0,0],s)}}for(let t=0;t<o;t++)for(let n=0;n<a;n++){let r=g+t*(a+1)+n,i=r+a+1;e.quad(r,i,i+1,r+1)}}function Uc(e,t,n,r,i,a,o,s,c,l,u){let d=e.count,f=e=>new N().copy(t).multiplyScalar((1-e)*(1-e)).addScaledVector(n,2*(1-e)*e).addScaledVector(r,e*e),p=e=>new N().subVectors(n,t).multiplyScalar(2*(1-e)).addScaledVector(new N().subVectors(r,n),2*e).normalize(),m=p(0),h=new N().crossVectors(m,Math.abs(m.y)<.9?vc:new N(1,0,0)).normalize(),g=0,_=f(0);for(let t=0;t<=s;t++){let n=t/s,r=f(n);g+=r.distanceTo(_),_=r;let d=p(n);h.addScaledVector(d,-h.dot(d)).normalize(),m=d;let v=new N().crossVectors(h,m).normalize(),y=i+(a-i)*n**.8;for(let t=0;t<=o;t++){let n=t/o*Math.PI*2,i=new N().copy(h).multiplyScalar(Math.cos(n)).addScaledVector(v,Math.sin(n)),a=r.clone().addScaledVector(i,y);e.vertex(a,i,t/o,g,[Math.max(0,a.y/l),u(a),0,0],c)}}for(let t=0;t<s;t++)for(let n=0;n<o;n++){let r=d+t*(o+1)+n,i=r+o+1;e.quad(r,i,i+1,r+1)}}function Wc(e,{center:t,size:n,normal:r,yaw:i,lobeC:a,lobeR:o,lobeId:s,crownC:c,crownR:l,rand:u,flexFn:d,hScale:f,part:p,clumpC:m=null,clumpR:h=1}){let g=r.clone().normalize(),_=Math.abs(g.y)<.95?vc:new N(1,0,0),v=new N().crossVectors(_,g).normalize(),y=new N().crossVectors(g,v).normalize(),b=Math.cos(i),x=Math.sin(i),S=v.clone().multiplyScalar(b).addScaledVector(y,x),C=y.clone().multiplyScalar(b).addScaledVector(v,-x),w=u(),T=u(),E=u(),D=[];for(let[r,i,u,_]of[[-.5,-.5,0,0],[.5,-.5,1,0],[.5,.5,1,1],[-.5,.5,0,1]]){let v=t.clone().addScaledVector(S,r*n).addScaledVector(C,i*n),y=m?v.clone().sub(m).divideScalar(h):v.clone().sub(a).divideScalar(o),b=v.clone().sub(c).divide(l),x=y.clone().normalize().multiplyScalar(.5).addScaledVector(b.clone().normalize(),.4).addScaledVector(g,.2).normalize(),O=Math.min(1,.5*Math.min(1,y.length())+.4*Math.min(1,b.length())+.25*Math.max(0,b.y)),k=Math.max(0,v.y/f);D.push(e.vertex(v,x,u,_,[k,d(v),1,E],[p,.2+.8*O*O,w,T],[a.x-v.x,a.y-v.y,a.z-v.z,s]))}e.quad(D[0],D[1],D[2],D[3])}function Gc(e,t,{count:n,size:r,crownC:i,crownR:a,rand:o,flexFn:s,hScale:c,part:l,flatten:u=.6}){let d=new N(e[0],e[1],e[2]),f=e[3],p=[];for(let e=0;e<n;e++){let e,n,m;do e=o()*2-1,n=o()*2-1,m=o()*2-1;while(e*e+n*n+m*m>1||n<-.75);let h=Math.hypot(e,n,m)||1,g=.45+.55*Math.sqrt(h),_=new N(e/h*g*f*.85,n/h*g*f*.85*u,m/h*g*f*.85).add(d),v=_.clone().sub(d).normalize().lerp(vc,.35+o()*.35).normalize();p.push({center:_,size:r*(.8+o()*.45),normal:v,yaw:o()*6.283,lobeC:d,lobeR:f,lobeId:t,crownC:i,crownR:a,rand:o,flexFn:s,hScale:c,part:l})}return p}function Kc(e,t,{clumps:n,clumpR:r,cardsPer:i,size:a,crownC:o,crownR:s,rand:c,flexFn:l,hScale:u,part:d,flatten:f=.7}){let p=new N(e[0],e[1],e[2]),m=e[3],h=[],g=[];for(let e=0;e<n;e++){let e,n,_;do e=c()*2-1,n=c()*2-1,_=c()*2-1;while(e*e+n*n+_*_>1||n<-.55);let v=Math.hypot(e,n,_)||1,y=.3+.7*Math.sqrt(c()),b=new N(e/v,n/v*f,_/v).multiplyScalar(y*m*.85).add(p),x=r*(.65+c()*.7);g.push({c:b,rc:x});let S=b.clone().sub(p).normalize();for(let e=0;e<i;e++){let e=new N(c()*2-1,c()*2-1,c()*2-1).normalize().addScaledVector(S,.9).addScaledVector(vc,.55).normalize(),n=b.clone().addScaledVector(e,x*(.1+.3*c())).add(new N(c()-.5,(c()-.5)*.6,c()-.5).multiplyScalar(x*.5));h.push({center:n,size:a*x/r*(.8+c()*.4),normal:e,yaw:c()*6.283,lobeC:p,lobeR:m,lobeId:t,crownC:o,crownR:s,rand:c,flexFn:l,hScale:u,part:d,clumpC:b,clumpR:x})}}return{cards:h,tips:g}}function qc(e,t,n){t.sort((e,t)=>t.center.distanceToSquared(n)-e.center.distanceToSquared(n));for(let n of t)Wc(e,n)}function Jc(e=21,t=new _c){let n=J(e),r=Lc,i=new N(0,7.8,0),a=new N(5.2,3.7,5.2),o=e=>Math.min(1,Math.hypot(e.x,e.z)/5)*Cc(3.2,6.5,e.y),s=new N(...zc);Hc(t,new N(0,-.5,0),s,.34,.24,10,7,[0,0,0,0],r,o,(e,t,n)=>{let r=n.y;return(.34-.1*e)*(1+.9*(Math.max(0,Math.cos(4*t+.4))**4*Math.exp(-Math.max(r,0)/.8))+.25*Math.exp(-Math.max(r+.3,0)/.5))});let c=[];Rc.forEach((e,a)=>{let l=new N(e[0],e[1],e[2]),u=l.clone().addScaledVector(l.clone().sub(i).setY(0).normalize(),-e[3]*.2).setY(e[1]-e[3]*.25),d=(e,t,r)=>{let i=e.clone().lerp(t,.5),a=t.clone().sub(e),o=new N(a.x,0,a.z);return i.addScaledVector(o,-.28*r).add(new N(0,a.length()*.16*r,0)).add(new N((n()-.5)*.5,(n()-.5)*.3,(n()-.5)*.5).multiplyScalar(a.length()*.25))};if(a<5){let e=s.clone().add(new N((n()-.5)*.2,-.2-n()*.3,(n()-.5)*.2)),i=d(e,u,1);Uc(t,e,i,u,.18,.05,6,5,[0,0,0,0],r,o),c.push(e.clone().multiplyScalar(.25).addScaledVector(i,.5).addScaledVector(u,.25))}else{let e=c[0];for(let t of c)t.distanceTo(l)<e.distanceTo(l)&&(e=t);Uc(t,e,d(e,u,.6),u,.085,.03,4,3,[0,0,0,0],r,o)}});let l=[];return Rc.forEach((e,s)=>{let{cards:c,tips:u}=Kc(e,s,{clumps:Math.round(3.9*e[3]),clumpR:.82,cardsPer:3,size:1.45,crownC:i,crownR:a,rand:n,flexFn:o,hScale:r,part:1,flatten:.72});l.push(...c);let d=new N(e[0],e[1]-e[3]*.3,e[2]);if(s<2)for(let e of u){let i=d.clone().lerp(e.c,.4+n()*.25).add(new N(n()-.5,(n()-.5)*.4,n()-.5).multiplyScalar(.5));Hc(t,i,i.clone().lerp(e.c,.7),.035,.014,3,1,[0,0,0,0],r,o)}}),qc(t,l,i),{geometry:t.build(14,new N(0,6.5,0)),triangles:t.triangles}}function Yc(e=31,t=new _c){let n=J(e),r=new N(0,.7,0),i=new N(1.1,.75,1.1),a=e=>Math.min(1,e.y/1.3);for(let e=0;e<3;e++){let n=Vc[e+1];Hc(t,new N(0,-.1,0),new N(n[0]*.6,n[1]*.7,n[2]*.6),.035,.015,3,1,[5,0,0,0],Bc,a)}let o=[];return Vc.forEach((e,t)=>o.push(...Gc(e,t,{count:Math.round(15*e[3]),size:.85,crownC:r,crownR:i,rand:n,flexFn:a,hScale:Bc,part:4,flatten:.8}))),qc(t,o,r),{geometry:t.build(2.2,new N(0,.7,0)),triangles:t.triangles}}var Xc=(()=>{let e=J(4711),t=new Float32Array(40);for(let n=0;n<5;n++){let r=n>=3,i=r?Vc.length:Rc.length,a=0;for(let o=0;o<8;o++){if(o>=i)continue;let s=o>=2&&e()<.3&&a<(r?1:3);s&&a++,t[n*8+o]=s?0:.74+.44*e()}}return t})();function Zc(e,t,n){let r=e.attributes.position,i=e.attributes.aLobe,a=r.data.array,o=r.data.stride,s=new Float32Array(a);for(let e=0;e<r.count;e++){let c=e*o,l=a[c+i.offset+3];if(l<0)continue;let u=1-t[n+l];s[c+r.offset]+=a[c+i.offset]*u,s[c+r.offset+1]+=a[c+i.offset+1]*u,s[c+r.offset+2]+=a[c+i.offset+2]*u}let c=new Wt(s,o),l=new tn;for(let t of Object.keys(e.attributes)){let n=e.attributes[t];l.setAttribute(t,new Kt(c,n.itemSize,n.offset))}return l.setIndex(e.index),l.boundingSphere=e.boundingSphere.clone(),l}function Qc(){let e=new _c;Jc(21,e);let t=e.triangles;return Yc(31,e),{geometry:e.build(14,new N(0,6.5,0)),triangles:e.triangles,treeTriangles:t,shrubTriangles:e.triangles-t}}var $c={YOUNG:1,BANANA:2,FERN:3,BANANA_B:4};function el(){let e=new _c,t={},n=0;return e.kind=$c.YOUNG,Pc(5,e),t.young=e.triangles-n,n=e.triangles,e.kind=$c.FERN,Fc(3,e),t.fern=e.triangles-n,{geometry:e.build(4,new N(0,1.5,0)),triangles:e.triangles,perKind:t}}function tl(){let e=new _c,t={},n=0;return e.kind=$c.BANANA,Ic(9,e),t.banana=e.triangles-n,n=e.triangles,e.kind=$c.BANANA_B,Ic(23,e),t.bananaB=e.triangles-n,{geometry:e.build(4,new N(0,1.5,0)),triangles:e.triangles,perKind:t}}function nl(e,t,{radius:n,radial:r=4,part:i,age:a=0,seed:o=0,phase:s=0,s0:c=0,s1:l=.5,W:u=.1}){let d=e.count,f=t.length,p=new N,m=new N,h=new N;for(let d=0;d<f;d++){p.subVectors(t[Math.min(f-1,d+1)],t[Math.max(0,d-1)]).normalize(),m.crossVectors(p,vc),m.lengthSq()<1e-4&&m.set(1,0,0),m.normalize(),h.crossVectors(m,p).normalize();let g=d/(f-1),_=n(g);for(let n=0;n<=r;n++){let f=n/r*Math.PI*2;bc.copy(m).multiplyScalar(Math.cos(f)).addScaledVector(h,Math.sin(f)),yc.copy(t[d]).addScaledVector(bc,_),e.vertex(yc,bc,-1+.5*g,n/r,[1,c+(l-c)*g,0,s],[i,a,u,o])}}for(let t=0;t<f-1;t++)for(let n=0;n<r;n++){let i=d+t*(r+1)+n,a=i+r+1;e.quad(i,i+1,a+1,a)}}function rl(e,t,n,r,i,a=6){let o=[e.clone()],s=e.clone();for(let e=0;e<a;e++){let c=(e+.5)/a,l=r+(i-r)*c*c;yc.copy(t).multiplyScalar(Math.cos(l)).addScaledVector(vc,Math.sin(l)),s.addScaledVector(yc,n/a),o.push(s.clone())}return o}function il(e,t){let{attach:n,dirH:r,pitch:i,bend:a,L:o,W:s,yBack:c=0,env:l,cup:u=0,roll:d=0,wave:f=0,segsY:p=8,segsX:m=2,part:h,age:g=0,seed:_=0,phase:v=0,s0:y=.5,flutter:b=.6}=t,x=new N(-r.z,0,r.x).normalize(),S=new M,C=new N,w=new N,T=new N,E=[],D=[],O=n.clone().addScaledVector(yc.copy(r).multiplyScalar(Math.cos(i)).addScaledVector(vc,Math.sin(i)),-c*o).clone();for(let e=0;e<=p;e++){let t=e/p,n=Math.max(0,(t-c)/(1-c)),s=i-a*n**1.4;C.copy(r).multiplyScalar(Math.cos(s)).addScaledVector(vc,Math.sin(s)).normalize(),S.setFromAxisAngle(C,d*(.4+.6*n)),T.copy(x).applyQuaternion(S),w.crossVectors(T,C).normalize(),D.push({p:O.clone(),T:C.clone(),S:T.clone(),N:w.clone(),y:t}),e<p&&O.addScaledVector(C,o/p)}for(let e=0;e<=p;e++){let t=D[e],n=Math.max(l(t.y),.02),r=[];for(let e=-m;e<=m;e++){let i=e/m,a=Math.abs(i),o=f*Math.sin(t.y*23+_*40+(i>0?1.7:0))*a,c=t.p.clone().addScaledVector(t.S,i*n*s).addScaledVector(t.N,(u*a*a+o)*n*s);r.push({q:c,x:i*n,y:t.y,n:t.N})}E.push(r)}let k=2*m,A=[];for(let t=0;t<=p;t++){let n=[];for(let r=0;r<=k;r++){let i=E[t][r],a=Math.max(0,t-1),o=Math.min(p,t+1),c=Math.max(0,r-1),l=Math.min(k,r+1);bc.subVectors(E[o][r].q,E[a][r].q),xc.subVectors(E[t][l].q,E[t][c].q),Sc.crossVectors(xc,bc),Sc.lengthSq()<1e-12&&Sc.copy(i.n),Sc.normalize(),Sc.dot(i.n)<0&&Sc.negate();let u=b*Math.abs(i.x)*Cc(0,.6,i.y);n.push(e.vertex(i.q,Sc,i.y,i.x,[1,y+(1-y)*i.y,u,v],[h,g,s,_]))}A.push(n)}for(let t=0;t<p;t++)for(let n=0;n<k;n++)e.quad(A[t][n],A[t][n+1],A[t+1][n+1],A[t+1][n])}var al=e=>t=>t<e?.75+t/e*.3:Math.sin(Math.PI*Math.min(1,.5+.5*(t-e)/(1-e)))**.75*1.02+.02,ol=e=>Math.max(0,Math.sin(Math.PI*Math.min(1,e*1.02)))**.55*1.02+.02;function sl(e=41,t=new _c){let n=J(e),r=new N;for(let e=0;e<8;e++){let i=e*2.39996+n()*.5;r.set(Math.cos(i),0,Math.sin(i));let a=e===1||e===5?.1:e===6?.95:.4+n()*.4,o=a>.3,s=(o?.65+n()*.45:.35+n()*.2)*(a>.9?.8:1),c=rl(new N(r.x*.06,.02,r.z*.06),r,s,1.35-n()*.2,(a>.9?0:.55)+n()*.25,6),l=o?.55+n()*.35:.28+n()*.1,u=l*.47,d=n();nl(t,c,{radius:e=>.016-.005*e,part:Z.MONSTERA,age:a,seed:n(),phase:d,s0:0,s1:.45}),il(t,{attach:c[c.length-1],dirH:r,pitch:a>.9?-.9:-.15-n()*.35,bend:.35+n()*.35,L:l,W:u,yBack:.16,env:al(.16),cup:.12,roll:(n()-.5)*.5,wave:.03,segsY:10,segsX:4,part:Z.MONSTERA,age:a,seed:n(),phase:d,s0:.45,flutter:.35})}return{geometry:t.build(2.2,new N(0,.6,0)),triangles:t.triangles}}function cl(e=43,t=new _c){let n=J(e),r=new N;for(let e=0;e<8;e++){let i=e*2.39996+n()*.4;r.set(Math.cos(i),0,Math.sin(i));let a=e===6?.95:e===7?.1:.2+n()*.5,o=(.8+n()*.6)*(a>.9?.75:1),s=rl(new N(r.x*.05,.02,r.z*.05),r,o,1.45,(a>.9?.5:1.05)+n()*.25,6),c=(.75+n()*.5)*(a<.15?.6:1),l=c*.42,u=n();nl(t,s,{radius:e=>.03-.014*e,radial:5,part:Z.ELEPHANT,age:a,seed:n(),phase:u,s0:0,s1:.5}),il(t,{attach:s[s.length-1],dirH:r,pitch:-.45-n()*.45-(a>.9?.5:0),bend:.3+n()*.25,L:c,W:l,yBack:.3,env:al(.3),cup:-.1,roll:(n()-.5)*.4,wave:.05,segsY:9,segsX:3,part:Z.ELEPHANT,age:a,seed:n(),phase:u,s0:.5,flutter:.3})}return{geometry:t.build(2.4,new N(0,.8,0)),triangles:t.triangles}}function ll(e=47,t=new _c){let n=J(e),r=new N;for(let e=0;e<5;e++){let i=e*2.39996+n()*.6,a=.05+n()*.22,o=new N(Math.cos(i)*a,0,Math.sin(i)*a),s=1.1+n()*1,c=new N(Math.cos(i),0,Math.sin(i)).multiplyScalar(.08+n()*.1),l=o.clone().add(new N(0,s,0)).addScaledVector(c,s),u=n(),d=n(),f=[];for(let e=0;e<=4;e++)f.push(o.clone().lerp(l,e/4));nl(t,f,{radius:e=>.028-.012*e,radial:5,part:Z.HELICONIA,age:.3,seed:d,phase:u,s0:0,s1:.55});let p=n()*Math.PI,m=3+Math.floor(n()*2);for(let e=0;e<m;e++){let i=p+((e%2?1:-1)>0?0:Math.PI)+(n()-.5)*.3;r.set(Math.cos(i),0,Math.sin(i));let a=o.clone().lerp(l,.45+e/m*.5),s=e===0&&n()<.5?.95:.2+n()*.4,c=rl(a,r,.15+n()*.15,1.2,1,3);nl(t,c,{radius:()=>.01,radial:3,part:Z.HELICONIA,age:s,seed:d,phase:u,s0:.5,s1:.6});let f=.8+n()*.5;il(t,{attach:c[c.length-1],dirH:r,pitch:s>.9?-.4:.85+n()*.3,bend:s>.9?1.4:.9+n()*.5,L:f,W:f*.15,yBack:0,env:ol,cup:.25,roll:(n()-.5)*.6,wave:.02,segsY:7,segsX:1,part:Z.HELICONIA,age:s,seed:n(),phase:u,s0:.6,flutter:.6})}if(n()<.6){let e=6+Math.floor(n()*3),i=l.clone(),a=.45+n()*.15,o=p+Math.PI*.5;for(let s=0;s<e;s++){let c=s/(e-1),l=i.clone().add(new N(0,a*c*.9+.04,0)),d=o+(s%2?0:Math.PI);r.set(Math.cos(d),0,Math.sin(d));let f=.22*(1-.45*c);il(t,{attach:l,dirH:r,pitch:.5,bend:-.35,L:f,W:f*.3,yBack:0,env:e=>Math.sin(Math.PI*Math.min(1,.15+e*.9))*1.02+.05,cup:1.2,segsY:3,segsX:1,part:Z.BRACT,age:c,seed:n(),phase:u,s0:.62,flutter:.05})}nl(t,[i.clone(),i.clone().add(new N(0,a,0))],{radius:()=>.009,radial:3,part:Z.BRACT,age:0,seed:d,phase:u,s0:.6,s1:.65})}}return{geometry:t.build(2.8,new N(0,1.2,0)),triangles:t.triangles}}function ul(e=53,t=new _c){let n=J(e),r=new N;for(let e=0;e<11;e++){let i=.3+((e%2?1:-1)>0?0:Math.PI)+(n()-.5)*.9;r.set(Math.cos(i),0,Math.sin(i));let a=e===9?.95:.2+n()*.5,o=.55+n()*.45,s=rl(new N((n()-.5)*.12,.02,(n()-.5)*.12),r,o,1.45,(a>.9?.6:1.15)+n()*.2,4),c=.45+n()*.2,l=n();nl(t,s,{radius:e=>.012-.004*e,radial:3,part:Z.STRELITZIA,age:a,seed:n(),phase:l,s0:0,s1:.5}),il(t,{attach:s[s.length-1],dirH:r,pitch:a>.9?.2:1+n()*.3,bend:.25+n()*.2,L:c,W:c*.2,yBack:0,env:ol,cup:.2,roll:(n()-.5)*.5,wave:.02,segsY:5,segsX:1,part:Z.STRELITZIA,age:a,seed:n(),phase:l,s0:.5,flutter:.2})}let i=2+Math.floor(n()*2);for(let e=0;e<i;e++){let e=n()*Math.PI*2;r.set(Math.cos(e),0,Math.sin(e));let i=new N((n()-.5)*.15,.02,(n()-.5)*.15),a=i.clone().add(new N(r.x*.08,.85+n()*.3,r.z*.08)),o=n();nl(t,[i,i.clone().lerp(a,.5),a],{radius:()=>.01,radial:3,part:Z.STRELITZIA,age:.3,seed:n(),phase:o,s0:0,s1:.55}),il(t,{attach:a,dirH:r,pitch:.12,bend:.15,L:.19,W:.022,yBack:.1,env:e=>Math.sin(Math.PI*Math.min(1,.1+e*.95))*1.05+.08,cup:1.5,segsY:4,segsX:1,part:Z.BIRD,age:0,seed:n(),phase:o,s0:.55,flutter:.02});let s=a.clone().addScaledVector(r,.05).add(new N(0,.02,0));for(let r=0;r<3;r++){let i=e+(r-1)*.35;il(t,{attach:s,dirH:new N(Math.cos(i),0,Math.sin(i)),pitch:1+(n()-.5)*.3,bend:-.3,L:.11+n()*.03,W:.012,yBack:0,env:e=>Math.sin(Math.PI*Math.min(1,.2+e*.8))+.1,cup:.3,segsY:2,segsX:1,part:Z.BIRD,age:.5,seed:n(),phase:o,s0:.6,flutter:.05})}il(t,{attach:s,dirH:r,pitch:.55,bend:.1,L:.09,W:.008,yBack:0,env:()=>.9,cup:.4,segsY:2,segsX:1,part:Z.BIRD,age:1,seed:n(),phase:o,s0:.6,flutter:.05})}return{geometry:t.build(1.8,new N(0,.7,0)),triangles:t.triangles}}var dl={MONSTERA:11,ELEPHANT:12,HELICONIA:13,STRELITZIA:14};function fl(){let e=new _c;return e.kind=dl.MONSTERA,sl(41,e),{geometry:e.build(2.2,new N(0,.6,0)),triangles:e.triangles}}function pl(){let e=new _c,t={},n=0;return e.kind=dl.ELEPHANT,cl(43,e),t.elephant=e.triangles-n,n=e.triangles,e.kind=dl.HELICONIA,ll(47,e),t.heliconia=e.triangles-n,n=e.triangles,e.kind=dl.STRELITZIA,ul(53,e),t.strelitzia=e.triangles-n,{geometry:e.build(3,new N(0,1,0)),triangles:e.triangles,perKind:t}}var ml=Math.ceil(Xc.length/4),hl=new L(`VegParams`,{camPos:[`vec3f`,new N(0,10,0)],pad0:[`f32`,0],gustOffset:[`vec2f`,new j],canopyNear:[`vec2f`,new j(75,45)],lobeTable:[`vec4f[${ml}]`,Array.from({length:ml},(e,t)=>[0,1,2,3].map(e=>Xc[t*4+e]??0))]},{label:`vegParams`}),gl=hl.fields.camPos,_l=hl.fields.gustOffset,vl=.12,yl=[42,58],Q=e=>{let t=String(e);return t.includes(`.`)||t.includes(`e`)?t:t+`.0`},bl=new R({name:`veg`,deps:[z,gc],uniforms:hl,bindings:{vegDetail:{texture:()=>Xs()}},code:`
const VEG_UP = vec3f( 0.0, 1.0, 0.0 );
const VEG_LOD_BAND: f32 = ${Q(vl)};

// Dave Hoskins' sine-free hash, [0, 1)
fn vegHash12( p: vec2f ) -> f32 {
	var p3 = fract( vec3f( p.x, p.y, p.x ) * 0.1031 );
	p3 += dot( p3, p3.yzx + 33.33 );
	return fract( ( p3.x + p3.y ) * p3.z );
}

fn vegNoise( p: vec2f ) -> f32 {
	let i = floor( p );
	let fr = fract( p );
	let u = fr * fr * ( fr * -2.0 + 3.0 );
	let a = vegHash12( i );
	let b = vegHash12( i + vec2f( 1.0, 0.0 ) );
	let c = vegHash12( i + vec2f( 0.0, 1.0 ) );
	let d = vegHash12( i + vec2f( 1.0, 1.0 ) );
	return mix( mix( a, b, u.x ), mix( c, d, u.x ), u.y );
}

// Wind ---------------------------------------------------------------------------------

// 0 (calm) .. 2.5 (storm). Tiny floor so nothing is ever perfectly frozen.
fn vegWindStrength() -> f32 { return max( frame.windSpeed * 0.1, 0.03 ); }
fn vegWindDir3() -> vec3f { return vec3f( frame.windDir.x, 0.0, frame.windDir.y ); }
fn vegWindPerp3() -> vec3f { return vec3f( -frame.windDir.y, 0.0, frame.windDir.x ); }

// Travelling gust field in [0, 1]: noise of (worldXZ - windDir * t * speed), where the
// time-integrated offset comes from vegParams.gustOffset. Two fetches of the detail texture's fbm
// channel (~35 m and ~15 m gust cells); the terrain uses the same function for its wind sheen.
fn vegGustAt( xz: vec2f ) -> f32 {
	let p = xz - vegParams.gustOffset;
	let n = textureSampleLevel( vegDetail, smpLinearRepeat, p / 140.0, 0.0 ).w * 0.62
		+ textureSampleLevel( vegDetail, smpLinearRepeat, p / 61.0 + 0.37, 0.0 ).w * 0.38;
	return smoothstep( 0.46, 0.6, n );
}

// Rotation taking +Y to the unit vector T, applied to v.
fn vegRotUpTo( v: vec3f, T: vec3f ) -> vec3f {
	let k = vec3f( T.z, 0.0, -T.x );
	let c1 = cross( k, v );
	return v + c1 + cross( k, c1 ) / ( T.y + 1.0 );
}

// normal through the instance matrix as three's instance node does it (not normalised: its
// length scales the leaf flutter the same way)
fn vegInstanceNormal( m: mat4x4f, n: vec3f ) -> vec3f {
	let a = m[ 0 ].xyz; let b = m[ 1 ].xyz; let c = m[ 2 ].xyz;
	let t = n / vec3f( dot( a, a ), dot( b, b ), dot( c, c ) );
	return mat3x3f( a, b, c ) * t;
}

// Crown variants: the per-instance variant picks a row of the lobe table (per-lobe size, 0 =
// dropped). Shared by the near canopy geometry and the impostor bake, so near and far crowns match.
fn vegVariantOf( seed: f32, isShrub: bool ) -> f32 {
	return floor( fract( seed * 7.77 ) * select( ${Q(3)}, ${Q(2)}, isShrub ) );
}
fn vegLobeScale( seed: f32, li: f32, isShrub: bool ) -> f32 {
	let row = vegVariantOf( seed, isShrub ) + select( 0.0, ${Q(3)}, isShrub );
	let i = i32( row * 8.0 + max( li, 0.0 ) );
	return vegParams.lobeTable[ i / 4 ][ i % 4 ];
}

// LOD window factor for an instance at base (0 = hidden, 1 = full size); lodRange = (visible from,
// fade-out start, fade-out end)
fn vegLodScale( base: vec3f, lodRange: vec3f ) -> f32 {
	let d = length( vegParams.camPos - base );
	let inside = d >= lodRange.x * ( 1.0 - VEG_LOD_BAND / 2.0 );
	let hardEnd = lodRange.z - lodRange.y < 0.05;
	let endK = select( 1.0 - smoothstep( lodRange.y, lodRange.z, d ), select( 0.0, 1.0, d < lodRange.y * ( 1.0 + VEG_LOD_BAND / 2.0 ) ), hardEnd );
	return select( 0.0, endK, inside );
}

// Fragment-stage keep test of the LOD cross-fade for an instance at base (true: keep the pixel)
fn vegLodDither( base: vec3f, lodRange: vec3f, pixel: vec2f ) -> bool {
	let d = length( vegParams.camPos - base );
	let t = bayer4( pixel );
	let x = lodRange.x; let y = lodRange.y;
	let fadeIn = select( 1.0, smoothstep( x * ( 1.0 - VEG_LOD_BAND / 2.0 ), x * ( 1.0 + VEG_LOD_BAND / 2.0 ), d ), x > 0.0 );
	let fadeOut = select( 0.0, smoothstep( y * ( 1.0 - VEG_LOD_BAND / 2.0 ), y * ( 1.0 + VEG_LOD_BAND / 2.0 ), d ), lodRange.z - y < 0.05 );
	return t < fadeIn && t >= fadeOut;
}

// Leaf translucency: sunlight transmitted through the leaf when it is lit from behind (relative
// to the viewer). The lighting model multiplies it by the shadowed light colour, so leaves in
// shadow (behind a hill at sunset, inside the canopy) don't glow.
fn vegTranslucency( albedo: vec3f, N: vec3f, strength: f32, P: vec3f ) -> vec3f {
	let V = normalize( frame.cameraPos - P );
	let L = frame.sunDir;
	let back = sat( dot( -N, L ) );
	let forward = pow( sat( dot( -V, L ) ), 3.0 ) * 0.7 + 0.3;
	let tint = albedo * vec3f( 1.25, 1.45, 0.55 ) + vec3f( 0.012, 0.018, 0.0 );
	return tint * ( back * forward * strength ) * ( 1.0 - frame.night );
}

struct VegPlant {
	pos: vec3f,
	normal: vec3f,
	trunkY: f32,  // height along the stem (m)
	trunkT: vec3f, // stem axis (world)
};

// Plant deformation shared by palms / young palms / bananas / ferns.
//
// Geometry conventions (local space, applied after the instance matrix = T * Ry * S):
//   aMat.x == 0  -> stem vertex: aVeg.x = height fraction u, x/z = radial offset.
//   aMat.x >= 1  -> crown vertex: position is relative to the crown centre.
//   aVeg = (u, s along frond, flutter weight, phase)
// Per instance:
//   iPos = (base.xyz, scale), iDat = (lean azimuth, lean (fraction of H), stem height H (m), seed)
// P / N0: the vertex through the instance matrix (three's positionLocal / normalLocal after the
// instance node).
fn vegPlantDeform( P: vec3f, N0: vec3f, iPos: vec4f, iDat: vec4f, veg: vec4f, aMat: vec4f, aLobe: vec4f, lodRange: vec3f ) -> VegPlant {
	let part = aMat.x;
	let base = iPos.xyz;
	let sc = iPos.w;
	let leanDir = vec3f( cos( iDat.x ), 0.0, sin( iDat.x ) );
	let lean = iDat.y;
	let H = iDat.z;
	// merged geometries (understory): the instance's plant kind is the integer part of the seed;
	// vertices of the other plants collapse onto the base
	let seed = fract( iDat.w );
	let kindI = floor( iDat.w );
	let kindV = -aLobe.w - 1.0;
	let keepKind = kindV < 0.5 || abs( kindV - kindI ) < 0.5;

	let u = veg.x;
	let s = veg.y;
	let flut = veg.z;
	let ph = veg.w;

	let t = frame.time;
	let w = vegWindStrength();
	let g = vegGustAt( base.xz );
	let ph0 = seed * 6.2832;
	let windDir3 = vegWindDir3();
	let windPerp3 = vegWindPerp3();

	// stem sway: horizontal offset of the top as a fraction of H
	let sway = w * w * 0.014 * ( g * 0.9 + 0.3 ) + sin( t * 0.83 + ph0 ) * w * 0.0065 * ( g + 0.45 );
	let swayP = sin( t * 0.61 + ph0 * 1.7 ) * w * 0.0028;
	let windOff = windDir3 * sway + windPerp3 * swayP;

	// stem curve: mix of a straight tilt and a "banana" curve (vertical at the top)
	let c = fract( seed * 7.31 );
	let fc = mix( u, u * ( ( 1.0 - u ) + 1.0 ), c );
	let df = mix( 1.0, ( 1.0 - u ) * 2.0, c );
	let off = leanDir * ( lean * fc ) + windOff * ( u * u );
	let T = normalize( VEG_UP + leanDir * ( lean * df ) + windOff * ( u * 2.0 ) );

	let radial = vec3f( P.x - base.x, 0.0, P.z - base.z );
	let axisPt = base + vec3f( 0.0, u * H, 0.0 ) + off * H;
	let stemPos = axisPt + vegRotUpTo( radial, T );
	let stemN = vegRotUpTo( N0, T );

	// crown: follows the stem top, tilted half as much as the stem tip
	let Ttop = normalize( VEG_UP + leanDir * ( lean * ( 1.0 - c ) ) + windOff * 2.0 );
	let Ttilt = normalize( VEG_UP + Ttop );
	let C = base + vec3f( 0.0, H, 0.0 ) + ( leanDir * lean + windOff ) * H;
	let o1 = vegRotUpTo( P - base, Ttilt );
	let N1 = vegRotUpTo( N0, Ttilt );

	// frond / leaf motion: gust bending + slow bounce + leaflet flutter, applied as a
	// length preserving rotation about the crown centre so fronds stream downwind in storms.
	let s2 = s * s;
	let bend = s2 * sc * 4.5 * ( w * w * 0.16 * ( g * 0.8 + 0.35 )
		+ sin( t * ( ph * 0.5 + 1.3 ) + ph * 23.0 + ph0 ) * w * 0.075 * ( g + 0.3 ) );
	let bounce = sin( t * ( ph + 2.1 ) + ph * 41.0 ) * s2 * w * sc * 0.1;
	let flutter = flut * sc * ( sin( t * ( ph * 5.0 + 11.0 ) + ph * 60.0 + s * 9.0 ) * ( w * 0.045 + 0.008 )
		+ sin( t * 23.0 + ph * 13.0 + s * 17.0 ) * ( max( w - 1.0, 0.0 ) * 0.05 ) );
	let disp = windDir3 * bend + VEG_UP * ( bounce - bend * 0.3 ) + N1 * flutter;
	let L = length( o1 );
	let o2 = normalize( o1 + disp + vec3f( 0.0, 1e-5, 0.0 ) ) * L;
	let crownPos = C + o2;

	// the dead (hanging) frond is only kept on some palms
	let hideDead = part > 0.5 && part < 1.5 && aMat.y > 0.95 && fract( seed * 13.7 ) > 0.4;
	let crownPos2 = select( crownPos, C, hideDead );

	let isStem = part < 0.5;
	let pos = select( crownPos2, stemPos, isStem );

	var out: VegPlant;
	out.normal = select( N1, stemN, isStem );
	out.trunkY = u * H;
	out.trunkT = T;

	// LOD window / distance fade: shrink around the base (ferns fade out earlier)
	let dCam = length( vegParams.camPos - base );
	let fernFade = select( 1.0, 1.0 - smoothstep( ${Q(yl[0])}, ${Q(yl[1])}, dCam ), kindI > 2.5 && kindI < 3.5 );
	let k = vegLodScale( base, lodRange ) * fernFade * select( 0.0, 1.0, keepKind );
	out.pos = base + ( pos - base ) * k;
	return out;
}
`}),xl=e=>e<.04045?e*.0773993808:(e*.9478672986+.0521327014)**2.4,$=e=>{let t=xl((e>>16&255)/255),n=xl((e>>8&255)/255),r=xl((e&255)/255);return`vec3f( ${t.toFixed(6)}, ${n.toFixed(6)}, ${r.toFixed(6)} )`},Sl=[11,17],Cl=[36,45],wl=[62,87],Tl=48,El=160,Dl=420,Ol=384,kl=7,Al=[0,0,1,1,2,2,2],jl=[2,2,3],Ml=12,Nl=28,Pl={GRASS:0,OAT_STALK:1,OAT_HEAD:2,CREEPER:3,FLOWER:4};function Fl(e,t,n,r=10){let i=[];for(let a=0;a<t;a++){let t=null,o=-1;for(let s=0;s<(a===0?1:r);s++){let r=e()*n,a=e()*n,s=1/0;for(let e of i){let t=Math.abs(e[0]-r),i=Math.abs(e[1]-a);t=Math.min(t,n-t),i=Math.min(i,n-i),s=Math.min(s,t*t+i*i)}s>o&&(o=s,t=[r,a])}i.push(t)}return i}var Il=class{constructor(){this.pos=[],this.nor=[],this.side=[],this.slot=[],this.bladeData=[],this.idx=[]}get count(){return this.pos.length/3}v(e,t,n,r,i){return this.pos.push(e[0],e[1],e[2]),this.nor.push(t[0],t[1],t[2]),this.side.push(n[0],n[1],n[2],n[3]??0),this.slot.push(r[0],r[1],r[2],r[3]),this.bladeData.push(i[0],i[1],i[2],i[3]),this.count-1}blade(e,t,n,r,i,a,o,s,c,l,u=[0,0],d=0){let f=-a,p=i,m=[];for(let h=0;h<n.length;h++){let g=n[h],_=(Math.sin(o)*g+c*g*g)*s,v=(Math.cos(o)*g-c*.35*g*g)*s,y=[u[0]+i*_,v,u[1]+a*_],b=Math.sin(o)+2*c*g,x=Math.cos(o)-.7*c*g,S=Math.hypot(b,x),C=i*b/S,w=x/S,T=a*b/S,E=-p*w,D=p*C-f*T,O=f*w,k=Math.hypot(E,D,O)||1,A=[E/k,D/k,O/k],j=r*(1-g**1.6)*(.75+.25*(1-g)),M=[g,t,l,d];h===n.length-1?m.push([this.v(y,A,[0,0,0,0],e,M)]):m.push([this.v(y,A,[-f*j,0,-p*j,-1],e,M),this.v(y,A,[f*j,0,p*j,1],e,M)])}for(let e=0;e<m.length-1;e++){let t=m[e],n=m[e+1];n.length===1?this.idx.push(t[0],t[1],n[0]):this.idx.push(t[0],t[1],n[1],t[0],n[1],n[0])}}fan(e,t,n,r,i,a,o,s,c,l,u,d=.1){let f=this.v([n[0],u,n[1]],[0,1,0],[0,0,0,0],e,[d,t,l,1]),p=[];for(let f=0;f<s;f++){let m=f/s*Math.PI*2,h=r*c(m),g=Math.cos(m)*h,_=Math.sin(m)*h*.85,v=n[0]+g*i-_*a,y=n[1]+g*a+_*i,b=g/r,x=u+(b+.6)*r*o;p.push(this.v([v,x,y],[0,1,0],[0,0,0,0],e,[d+.05*Math.max(0,b),t,l,0]))}for(let e=0;e<s;e++)this.idx.push(f,p[(e+1)%s],p[e])}ribbon(e,t,n,r,i){let a=[];for(let o=0;o<n.length;o++){let s=n[o],c=n[Math.min(n.length-1,o+1)],l=n[Math.max(0,o-1)],u=c[0]-l[0],d=c[2]-l[2],f=Math.hypot(u,d)||1;u/=f,d/=f;let p=-d*r,m=u*r;a.push([this.v([s[0]-p,s[1],s[2]-m],[0,1,0],[0,0,0,0],e,[.05,t,i,0]),this.v([s[0]+p,s[1],s[2]+m],[0,1,0],[0,0,0,0],e,[.05,t,i,0])])}for(let e=0;e<a.length-1;e++){let t=a[e],n=a[e+1];this.idx.push(t[0],n[1],t[1],t[0],n[0],n[1])}}build(){let e=new nn;return e.setAttribute(`position`,new Ht(this.pos,3)),e.setAttribute(`normal`,new Ht(this.nor,3)),e.setAttribute(`aSide`,new Ht(this.side,4)),e.setAttribute(`aSlot`,new Ht(this.slot,4)),e.setAttribute(`aBlade`,new Ht(this.bladeData,4)),e.setIndex(this.count>65535?new Vt(this.idx,1):new Bt(this.idx,1)),e.boundingSphere=new Pe(new N,1e7),e.boundingBox=new Ae(new N(-1e7,-1e7,-1e7),new N(1e7,1e7,1e7)),e}get triangles(){return this.idx.length/3}};function Ll(e){let t=J(e);return Fl(J(e+1),Ol,8).map(([e,n])=>{let r=t(),i=t()*Math.PI*2,a=[];for(let e=0;e<kl;e++){let n=i+e*2.39996+(t()-.5)*.5,r=e===0?.1+.3*t():e===1?.35+.4*t():t();a.push({dx:Math.cos(n),dz:Math.sin(n),lean:.06+.55*r*(.6+.8*t()),h:(.7+.5*t())*(1.06-.22*r),curve:.12+.5*r*(.5+t()),rnd:t(),base:[Math.cos(n)*.09*t(),Math.sin(n)*.09*t()],tier:Al[e]})}return{x:e,z:n,slotRand:r,blades:a}})}function Rl(e,t,n=7,r=1){let i=new Il,a=[[0,.3,.62,1],[0,.55,1],[0,1]][e],o=2-e;for(let e of t.slice(0,Math.ceil(t.length*r))){let t=[e.x,e.z,e.slotRand,0];for(let n of e.blades)n.tier>o||i.blade(t,Pl.GRASS,a,.012,n.dx,n.dz,n.lean,n.h,n.curve,n.rnd,n.base,n.tier)}if(e===2)return i;let s=Fl(J(n+2),Ml,8),c=e===0;if(s.slice(0,Math.ceil(s.length*r)).forEach(([e,t],r)=>{let a=J(n*7919+r*131+17),o=[e,t,a(),1],s=c?3:1;for(let e=0;e<3;e++){let t=a()*Math.PI*2,n=Math.cos(t),r=Math.sin(t),l=.06+.14*a(),u=.8+.3*a(),d=a(),f=e===0?0:(a()-.5)*.22,p=e===0?0:(a()-.5)*.22,m=[a(),a(),a(),a(),a(),a(),a(),a()];if(e>=s)continue;let h=e===0?0:2;i.blade(o,Pl.OAT_STALK,c?[0,.3,.6,.85,1]:[0,.6,1],c?.0075:.014,n,r,l,u,.2,d,[f,p],h);let g=c?8:3;for(let e=0;e<g;e++){let a=.7+.3*(e/Math.max(1,g-1)),s=(Math.sin(l)*a+.2*a*a)*u,_=(Math.cos(l)*a-.07*a*a)*u,v=t+(e%2?1:-1)*(.45+.6*m[e]),y=Math.cos(v),b=Math.sin(v),x=f+n*s+y*.02,S=p+r*s+b*.02,C=c?.085:.13,w=c?.022:.04,T=[0,1,0],E=[a,Pl.OAT_HEAD,d,h],D=i.v([x,_+.01,S],T,[0,0,0,0],o,E),O=i.v([x+y*C*.45-b*w,_-C*.4,S+b*C*.45+y*w],T,[0,0,0,0],o,E),k=i.v([x+y*C*.45+b*w,_-C*.4,S+b*C*.45-y*w],T,[0,0,0,0],o,E),A=i.v([x+y*C*.8,_-C*.95,S+b*C*.8],T,[0,0,0,0],o,E);i.idx.push(D,O,A,D,A,k)}}if(c)for(let e=0;e<4;e++){let t=e/4*Math.PI*2+a();i.blade(o,Pl.GRASS,[0,.45,.8,1],.01,Math.cos(t),Math.sin(t),.55+.4*a(),.45,.35,a(),[0,0],2)}}),!c)return i;let l=e=>{let t=Math.min(Math.abs(e),Math.abs(e-Math.PI*2));return 1-.38*Math.exp(-(t*t)/.12)-.15*Math.sin(e*.5)**8},u=e=>.82+.18*Math.cos(e*5),d=Fl(J(n+3),Nl,8);return d.slice(0,Math.ceil(d.length*r)).forEach(([e,t],r)=>{let a=J(n*3571+r*197+5),o=[e,t,a(),2],s=a()*Math.PI*2,c=[],d=-Math.cos(s)*1.1,f=-Math.sin(s)*1.1;for(let e=0;e<12;e++)c.push([d,.01,f]),s+=(a()-.5)*.5,d+=Math.cos(s)*.19,f+=Math.sin(s)*.19;i.ribbon(o,Pl.CREEPER,c,.011,a());for(let e=1;e<c.length;e++){let t=e%2?1:-1,n=c[e-1],r=c[e],s=r[0]-n[0],u=r[2]-n[2],d=Math.hypot(s,u)||1;s/=d,u/=d;let f=Math.atan2(u,s)+t*(.7+.5*a()),p=Math.cos(f),m=Math.sin(f),h=(.07+.04*a())*(.6+.4*Math.sin(Math.PI*e/12));i.fan(o,Pl.CREEPER,[r[0]+p*h*.9,r[2]+m*h*.9],h,p,m,.3+.3*a(),7,l,a(),.015)}let p=c[3+Math.floor(a()*4)];i.fan(o,Pl.FLOWER,[p[0]+.03,p[2]+.03],.036,1,0,1.4,10,u,a(),.07,.2)}),i}var zl=class{constructor({terrain:e,mask:t}){this.terrain=e;let n=e.res,r=t.data,i=t.res;this.heightTex=new H({label:`grassHeights`,width:n,height:n,format:`r32float`,data:e.heights}),Object.defineProperty(this.heightTex,"needsUpdate",{set:t=>{t&&this.heightTex.upload(e.heights)}}),this.maskTex=new H({label:`grassMask`,width:i,height:i,format:`rgba8unorm`,data:r,sampler:`linearClamp`});let a=Math.ceil(e.size/8);this.cellsPerSide=a,this.cellFlags=new Uint8Array(a*a),this.cellMinY=new Float32Array(a*a),this.cellMaxY=new Float32Array(a*a);let o=8/(e.size/i),s=8/e.texel;for(let t=0;t<a;t++)for(let c=0;c<a;c++){let l=0,u=1/0,d=-1/0,f=Math.max(0,Math.floor(c*o)-1),p=Math.min(i-1,Math.ceil((c+1)*o)+1),m=Math.max(0,Math.floor(t*o)-1),h=Math.min(i-1,Math.ceil((t+1)*o)+1);for(let e=m;e<=h&&!l;e++)for(let t=f;t<=p;t++){let n=(e*i+t)*4;if(r[n]>8||r[n+1]>8||r[n+2]>8||r[n+3]>8){l=1;break}}let g=t*a+c;if(this.cellFlags[g]=l,!l)continue;let _=Math.max(0,Math.floor(c*s)-1),v=Math.min(n-1,Math.ceil((c+1)*s)+1),y=Math.max(0,Math.floor(t*s)-1),b=Math.min(n-1,Math.ceil((t+1)*s)+1);for(let t=y;t<=b;t++)for(let r=_;r<=v;r++){let i=e.heights[t*n+r];i<u&&(u=i),i>d&&(d=i)}this.cellMinY[g]=u,this.cellMaxY[g]=d}this.material=this._createMaterial();let c=Ll(7),l=[Rl(0,c),Rl(1,c),Rl(2,c)];this.patchTris=l.map(e=>e.triangles),this.levels=[this._createMesh(l[0].build(),Tl,`veg-grass-near`),this._createMesh(l[1].build(),El,`veg-grass-mid`),this._createMesh(l[2].build(),Dl,`veg-grass-far`)],this.meshes=this.levels.map(e=>e.mesh);for(let[e,t]of this.levels.entries()){t.qualityGeometries=new Map([[1,{geometry:t.geometry,triangles:this.patchTris[e]}]]);for(let n of io.filter(e=>e>0&&e<1)){let r=Rl(e,c,7,n),i=r.build();i.setAttribute(`iCell`,t.attr),t.qualityGeometries.set(n,{geometry:i,triangles:r.triangles})}}this._frustum=new Ve,this._mat=new F,this._box=new Ae,this._last=new Float64Array(8).fill(NaN)}get near(){return this.levels[0]}get far(){return this.levels[2]}get nearTris(){return this.patchTris[0]}get farTris(){return this.patchTris[2]}_createMesh(e,t,n){let r=new Float32Array(t*4),i=new Ut(r,4);i.setUsage(Pt),e.setAttribute(`iCell`,i),e.instanceCount=0;let a=new rn(e,this.material);return a.name=n,a.frustumCulled=!1,a.castShadow=!1,a.receiveShadow=!0,a.matrixAutoUpdate=!1,{mesh:a,geometry:e,attr:i,arr:r,max:t,count:0}}_createMaterial(){return Gl(this)}setQualityLevel(e){this.patchTris=this.levels.map(t=>t.qualityGeometries.get(e||1).triangles);for(let t of this.levels)t.mesh.geometry=t.geometry=t.qualityGeometries.get(e||1).geometry,t.count=t.geometry.instanceCount=0;this._last.fill(NaN)}update(e){let t=e.matrixWorld.elements,n=this._last,r=e.projectionMatrix.elements;if(Math.abs(t[12]-n[0])<.05&&Math.abs(t[13]-n[1])<.05&&Math.abs(t[14]-n[2])<.05&&Math.abs(t[8]-n[3])<.001&&Math.abs(t[9]-n[4])<.001&&Math.abs(t[10]-n[5])<.001&&r[0]===n[6]&&r[5]===n[7])return!1;n[0]=t[12],n[1]=t[13],n[2]=t[14],n[3]=t[8],n[4]=t[9],n[5]=t[10],n[6]=r[0],n[7]=r[5],this._mat.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(this._mat,e.coordinateSystem,e.reversedDepth);let i=t[12];t[13];let a=t[14],o=this.terrain,s=this.cellsPerSide,c=Math.max(0,Math.floor((i-88-o.origin)/8)),l=Math.min(s-1,Math.floor((i+88-o.origin)/8)),u=Math.max(0,Math.floor((a-88-o.origin)/8)),d=Math.min(s-1,Math.floor((a+88-o.origin)/8)),[f,p,m]=this.levels,h=0,g=0,_=0;for(let e=u;e<=d;e++)for(let t=c;t<=l;t++){let n=e*s+t;if(!this.cellFlags[n])continue;let r=o.origin+t*8,c=o.origin+e*8,l=Math.max(r-i,0,i-r-8),u=Math.max(c-a,0,a-c-8),d=Math.hypot(l,u);d>88||(this._box.min.set(r,this.cellMinY[n]-.5,c),this._box.max.set(r+8,this.cellMaxY[n]+1.8,c+8),this._frustum.intersectsBox(this._box)&&(d<18&&h<f.max?(f.arr[h*4]=r,f.arr[h*4+1]=c,h++):d<46&&g<p.max?(p.arr[g*4]=r,p.arr[g*4+1]=c,g++):d>=46&&_<m.max&&(m.arr[_*4]=r,m.arr[_*4+1]=c,_++)))}for(let[e,t]of[[f,h],[p,g],[m,_]])e.count=t,e.geometry.instanceCount=t,e.attr.clearUpdateRanges(),e.attr.addUpdateRange(0,Math.max(1,t)*4),e.attr.needsUpdate=!0;return!0}get triangles(){return this.levels.reduce((e,t,n)=>e+t.count*this.patchTris[n],0)}dispose(){this.heightTex.destroy(),this.maskTex.destroy(),this.material.dispose();for(let e of this.levels)for(let{geometry:t}of e.qualityGeometries.values())t.dispose()}},Bl=e=>e<.04045?e*.0773993808:(e*.9478672986+.0521327014)**2.4,Vl=(e,t,n)=>`vec3f( ${Bl(e).toFixed(6)}, ${Bl(t).toFixed(6)}, ${Bl(n).toFixed(6)} )`,Hl={lush:Vl(.13,.2,.05),green:Vl(.25,.32,.1),olive:Vl(.36,.37,.14),yellow:Vl(.5,.46,.2),straw:Vl(.62,.54,.33),soil:Vl(.17,.13,.08)},Ul=(e,t)=>{let n=Math.cos(t),r=Math.sin(t);return`vec2f( ${e}.x * ${Q(n)} - ${e}.y * ${Q(r)}, ${e}.x * ${Q(r)} + ${e}.y * ${Q(n)} )`},Wl=new R({name:`vegGrass`,deps:[bl],code:`
const VEG_MEADOW_LUSH = ${Hl.lush};
const VEG_MEADOW_GREEN = ${Hl.green};
const VEG_MEADOW_OLIVE = ${Hl.olive};
const VEG_MEADOW_YELLOW = ${Hl.yellow};
const VEG_MEADOW_STRAW = ${Hl.straw};
const VEG_MEADOW_SOIL = ${Hl.soil};

struct VegMeadow { tone: vec3f, dry: f32, lush: f32 };

//   mA, mB: detail fbm channel at the 173 m / 47 m scales (~0.5 +- 0.1): the samples at
//   rot2( xz, 0.7 ) / 173 and rot2( xz, 2.1 ) / 47 that the terrain takes anyway; slope: 1 - N.y;
//   south: N.z (the sun side). Mostly fresh green grass with olive, sun-bleached yellow and a few
// straw-dry patches (more on exposed slopes), darker lush grass in the damp patches.
// (TerrainShading's optional finer 'detail' input is not used by the grass.)
fn vegMeadowTone( mA: f32, mB: f32, slope: f32, south: f32 ) -> VegMeadow {
	let m = mA * 0.55 + mB * 0.45 + slope * 0.25 + south * 0.04;
	let olive = smoothstep( 0.52, 0.6, m );
	let yellow = smoothstep( 0.6, 0.67, m );
	let straw = smoothstep( 0.66, 0.73, m + ( mB - 0.5 ) * 0.2 );
	let lush = smoothstep( 0.46, 0.37, mB * 0.7 + mA * 0.3 + slope * 0.2 );
	var c = mix( VEG_MEADOW_GREEN, VEG_MEADOW_OLIVE, olive );
	c = mix( c, VEG_MEADOW_YELLOW, yellow * 0.8 );
	c = mix( c, VEG_MEADOW_STRAW, straw * 0.55 );
	c = mix( c, VEG_MEADOW_LUSH, lush * 0.75 );
	return VegMeadow( c, olive * 0.4 + yellow * 0.6, lush );
}

// per-tier visibility at camera distance d (1 = full width, 0 = gone); tier 0 thins out per blade
fn vegGrassTierFade( tier: f32, d: f32, cut: f32 ) -> f32 {
	let f2 = 1.0 - smoothstep( ${Q(Sl[0])}, ${Q(Sl[1])}, d );
	let f1 = 1.0 - smoothstep( ${Q(Cl[0])}, ${Q(Cl[1])}, d );
	let f0 = 1.0 - smoothstep( cut - 5.0, cut, d );
	return select( select( f0, f1, tier > 0.5 ), f2, tier > 1.5 );
}
`});function Gl(e){let t=e.terrain,n=t.res;return new Ar({name:`veg-grass`,side:`double`,roughness:.8,metalness:0,modules:[bl,Wl],textures:{grassHeights:e.heightTex,grassMask:e.maskTex},attributes:{iCell:`vec4f`,aSlot:`vec4f`,aBlade:`vec4f`,aSide:`vec4f`},varyings:{vVegGrass:`vec4f`,vVegGrassTone:`vec4f`,vVegGrass2:`vec4f`,vVegGust:`f32`},vertex:`
	let cell = v.iCell.xy;
	let slot = v.aSlot;
	let blade = v.aBlade;
	let side4 = v.aSide;
	let side = side4.xyz;
	let P = v.position;
	let N = v.normal;

	let xz = cell + slot.xy;
	let hf = blade.x;
	let kind = blade.y;
	let bRnd = blade.z;

	let m = textureSampleLevel( grassMask, smpLinearClamp, ( xz - ${Q(t.origin)} ) / ${Q(t.size)}, 0.0 );
	let isGrass = kind < 0.5;
	let isOat = kind > 0.5 && kind < 2.5;
	let lush = m.g;
	let dune = m.r;
	// the backshore grass is dense in its clumps (the mask carries the clumping and the edge)
	let duneF = dune / ( dune + lush + 1e-3 );
	let grassP = mix( lush, min( dune * 1.1, 1.0 ), duneF );
	let density = select( select( m.a, m.b, isOat ), grassP, isGrass );
	let r = vegHash12( xz * 1.37 + 0.51 );
	let r2 = vegHash12( xz * 2.11 + 7.3 );
	let flowerOk = select( 1.0, select( 0.0, 1.0, r2 < 0.35 ), kind > 3.5 );
	let present = select( 0.0, 1.0, r < density ) * flowerOk;


#if GRASS_REJECT_ABSENT
	// terrain height (float texels loaded and bilinearly filtered manually)
	let hfp = ( xz - ${Q(t.origin)} ) / ${Q(t.texel)} - 0.5;
	let hfi = floor( hfp );
	let hfr = hfp - hfi;
	let ij = vec2i( clamp( hfi, vec2f( 0.0 ), vec2f( ${Q(n-2)} ) ) );
	let ha = textureLoad( grassHeights, ij, 0 ).x;
	let hb = textureLoad( grassHeights, ij + vec2i( 1, 0 ), 0 ).x;
	let hc = textureLoad( grassHeights, ij + vec2i( 0, 1 ), 0 ).x;
	let hd = textureLoad( grassHeights, ij + vec2i( 1, 1 ), 0 ).x;
	let ground = mix( mix( ha, hb, hfr.x ), mix( hc, hd, hfr.x ), hfr.y );
	let base = vec3f( xz.x, ground - 0.03, xz.y );
	// Absent blades already collapse to this exact point with zero coverage.
	// Skip tone, noise, trigonometry and wind without rejecting any visible blade.
	if ( present == 0.0 ) {

		v.useWorld = true; v.worldPos = base; v.worldNormal = VEG_UP;
		o.vVegGrass = vec4f( 0.0 ); o.vVegGrassTone = vec4f( 0.0 );
		o.vVegGrass2 = vec4f( 0.0 ); o.vVegGust = 0.0;
		return;
	}
#endif

	// meadow tone at the clump: the same function and inputs as the terrain's meadow shading
	let mA = textureSampleLevel( vegDetail, smpLinearRepeat, ${Ul(`xz`,.7)} / 173.0, 0.0 ).w;
	let mB = textureSampleLevel( vegDetail, smpLinearRepeat, ${Ul(`xz`,2.1)} / 47.0, 0.0 ).w;
	let mt = vegMeadowTone( mA, mB, 0.0, 0.0 );
	// size: tall meadow grass, knee to waist high: swathes of taller grass in the lush patches,
	// lower where it is dry; wiry dune tufts
	let patchN = vegNoise( xz * ${Q(1/6.5)} + 17.3 ) * 0.7 + vegNoise( xz * ${Q(1/2.3)} ) * 0.3;
	let lushH = mix( 0.7, 1.3, patchN ) * ( mt.lush * 0.25 + 1.0 ) * ( 1.0 - mt.dry * 0.25 );
	// dune tufts vary a lot in size (young shoots to big old clumps)
	let grassH = mix( lushH, 0.62, duneF ) * mix( r2 * 0.35 + 0.83, r2 * r2 * 0.9 + 0.5, duneF ) * ( density * 0.35 + 0.65 );
	let oatH = r2 * 0.55 + 1.0;
	let vineS = r2 * 0.4 + 0.8;
	let hScale = select( select( vineS, oatH, isOat ), grassH, isGrass );
	// meadow clumps fan out wider than the wiry dune tufts
	let spread = select( 1.0, mix( 1.35, 1.3, duneF ), isGrass );

	// distance LOD: tiers fade out (narrow to nothing), the remaining blades widen so the
	// coverage (blade density x width) stays constant; tier 0 thins out per blade near R_FAR
	let dist = length( xz - vegParams.camPos.xz );
	// tier: grass blades and oats carry their own (aBlade.w), otherwise the slot's
	let tier = max( select( 0.0, blade.w, kind < 2.5 ), slot.w );
	let cutK = bRnd * 7.13 + r2;
	let cut = mix( ${Q(wl[0]+5)}, ${Q(wl[1])}, cutK - floor( cutK ) );
	let own = vegGrassTierFade( tier, dist, cut );
	let f2 = 1.0 - smoothstep( ${Q(Sl[0])}, ${Q(Sl[1])}, dist );
	let f1 = 1.0 - smoothstep( ${Q(Cl[0])}, ${Q(Cl[1])}, dist );
	let comp = ${Q(jl[0]+jl[1]+jl[2])} / ( f2 * ${Q(jl[2])} + f1 * ${Q(jl[1])} + ${Q(jl[0])} );
	// oats and creeper simply shrink out
	let widthK = select( 1.0, comp * own, isGrass );
	let sizeK = select( own, 1.0, isGrass );
	let scale = hScale * present * sizeK;

	// per-slot random yaw
	let yaw = vegHash12( xz * 0.73 + 3.3 ) * 6.2832;
	let cy = cos( yaw ); let sy = sin( yaw );


#if !GRASS_REJECT_ABSENT
	// terrain height (float texels loaded and bilinearly filtered manually)
	let hfp = ( xz - ${Q(t.origin)} ) / ${Q(t.texel)} - 0.5;
	let hfi = floor( hfp );
	let hfr = hfp - hfi;
	let ij = vec2i( clamp( hfi, vec2f( 0.0 ), vec2f( ${Q(n-2)} ) ) );
	let ha = textureLoad( grassHeights, ij, 0 ).x;
	let hb = textureLoad( grassHeights, ij + vec2i( 1, 0 ), 0 ).x;
	let hc = textureLoad( grassHeights, ij + vec2i( 0, 1 ), 0 ).x;
	let hd = textureLoad( grassHeights, ij + vec2i( 1, 1 ), 0 ).x;
	let ground = mix( mix( ha, hb, hfr.x ), mix( hc, hd, hfr.x ), hfr.y );
	let base = vec3f( xz.x, ground - 0.03, xz.y );
#endif
	let pl = vec3f( P.x * spread, P.y, P.z * spread );
	let o0 = vec3f( pl.x * cy - pl.z * sy, pl.y, pl.x * sy + pl.z * cy ) * scale;

	// wind: travelling gusts bend blades downwind (length preserving), plus flutter
	let w = vegWindStrength();
	let g = vegGustAt( xz );
	let tm = frame.time;
	let ph = r * 6.2832;
	let bendAmt = w * ( g * 0.55 + 0.22 ) + sin( tm * 1.9 + ph + xz.x * 0.2 ) * w * 0.1;
	let flut = sin( tm * 7.3 + ph * 3.0 + bRnd * 20.0 ) * ( w * 0.06 + 0.015 );
	let stiff = select( select( 0.08, 0.8, isOat ), 1.0, isGrass );
	let hf2 = hf * hf;
	let disp = ( vegWindDir3() * ( bendAmt * hf2 * stiff ) + vegWindPerp3() * ( flut * hf2 * stiff ) ) * ( length( o0 ) + 1e-4 );
	let oL = length( o0 );
	let ob = normalize( o0 + disp + vec3f( 0.0, 1e-5, 0.0 ) ) * oL;

	let wScale = select( 1.0, mix( 1.5, 1.55, duneF ), isGrass );
	let wide = wScale * widthK * min( scale * 2.0, max( scale, 0.5 ) );
	let sideR = vec3f( side.x * cy - side.z * sy, side.y, side.x * sy + side.z * cy );
	let pos = base + ob + sideR * wide;

	// lighting normal: blade normal bent towards up (soft, grass-like shading), rounded across
	// the blade (a folded leaf is lit differently on its two halves)
	let across = side4.w;
	let sideDir = normalize( sideR + vec3f( 1e-5, 0.0, 0.0 ) );
	let nR = vec3f( N.x * cy - N.z * sy, N.y, N.x * sy + N.z * cy );

	// a share of the blades is dead / straw coloured (more in the dry patches)
	let dk = bRnd * 13.7 + r * 3.1;
	let dryBlade = select( 0.0, 1.0, dk - floor( dk ) < mt.dry * 0.3 + 0.07 );
	o.vVegGrass = vec4f( hf, kind, duneF, bRnd );
	o.vVegGrassTone = vec4f( mt.tone, mt.dry );
	o.vVegGrass2 = vec4f( density, select( blade.w, 0.0, kind < 2.5 ), across, dryBlade );
	o.vVegGust = sat( g * w * 0.6 ) * stiff;

	v.useWorld = true;
	v.worldPos = pos;
	v.worldNormal = normalize( nR * 0.5 + VEG_UP + sideDir * ( across * 0.35 ) );
`,surface:`
	let hf = in.vs.vVegGrass.x;
	let kind = in.vs.vVegGrass.y;
	let duneF = in.vs.vVegGrass.z;
	let rnd = in.vs.vVegGrass.w;
	let across = in.vs.vVegGrass2.z;
	let dryBlade = in.vs.vVegGrass2.w;
	// self-shadowing of the sward: dark at the base of the clump
	let ao = mix( 0.32, 1.0, smoothstep( 0.0, 0.75, hf ) );
	// dune grass: olive base, straw tips; meadow: the terrain's meadow tone, dark and brownish
	// (dead leaf sheaths) at the base, lighter / sun-bleached towards the tips
	let duneBase = mix( ${$(6119986)}, ${$(8358464)}, rnd );
	let duneTip = mix( ${$(12102508)}, ${$(10134610)}, rnd );
	let tone = in.vs.vVegGrassTone.xyz * ( rnd * 0.34 + 0.83 );
	let lushBase = mix( tone * 0.5, VEG_MEADOW_SOIL, 0.3 );
	let tipDry = in.vs.vVegGrassTone.w * 0.4 + smoothstep( 0.8, 1.0, rnd ) * 0.35;
	let lushTip = mix( tone * vec3f( 1.25, 1.25, 1.05 ), VEG_MEADOW_STRAW, tipDry * smoothstep( 0.55, 1.0, hf ) );
	let gBase = mix( lushBase, duneBase, duneF );
	let gTip = mix( lushTip, duneTip, duneF );
	var grass0 = mix( gBase, gTip, smoothstep( 0.05, 0.95, hf ) );
	// dead blades: straw to brown
	grass0 = mix( grass0, mix( VEG_MEADOW_STRAW, VEG_MEADOW_SOIL * 1.8, rnd * 0.6 ) * ( smoothstep( 0.0, 0.5, hf ) * 0.4 + 0.6 ), dryBlade * ( 1.0 - duneF ) );
	// pale midrib
	grass0 = grass0 * ( pow( 1.0 - abs( across ), 6.0 ) * smoothstep( 0.05, 0.4, hf ) * 0.18 + 1.0 );
	// wind sheen: blades flattened by a gust show their paler undersides, so gusts read
	// as bright waves rolling across the grass
	let grass = mix( grass0, grass0 * vec3f( 1.3, 1.28, 1.1 ) + vec3f( 0.03, 0.03, 0.015 ), in.vs.vVegGust * smoothstep( 0.15, 0.9, hf ) * 0.6 );
	let oatStalk = mix( ${$(10263138)}, ${$(12759674)}, hf );
	let oatHead = mix( ${$(13218426)}, ${$(11047002)}, rnd );
	let centre = in.vs.vVegGrass2.y; // 1 at leaf / flower centre
	let vine = mix( mix( ${$(3035673)}, ${$(4879144)}, rnd ), ${$(8032074)}, centre * 0.3 ) * select( vec3f( 1.0 ), vec3f( 1.25, 1.05, 0.8 ), hf < 0.075 );
	let flower = mix( ${$(12076956)}, ${$(15919342)}, smoothstep( 0.35, 0.9, centre ) );
	let c = select( select( select( select( flower, vine, kind < 3.5 ), oatHead, kind < 2.5 ), oatStalk, kind < 1.5 ), grass, kind < 0.5 );
	let albedo = c * select( 1.0, ao, kind < 2.5 );
	s.albedo = albedo;
	s.roughness = select( 0.8, 0.45, kind > 2.5 && kind < 3.5 );
	s.metalness = 0.0;
	s.specularIntensity = 0.4;
	s.normal = normalize( normalize( in.vs.normal ) + in.V * 0.4 );
	// back-lit thin blades glow (evaluated in the lighting model with the shadowed light, so
	// grass in shadow does not)
	let back = pow( sat( dot( - in.V, frame.sunDir ) ), 4.0 );
	s.translucency = albedo * vec3f( 1.1, 1.3, 0.6 ) * ( back * 0.3 * smoothstep( 0.2, 1.0, hf ) ) * ( 1.0 - frame.night );
`})}var Kl=`
struct VegBark { bark: vec3f, hd: f32 };
// (the last evaluation is remembered: the albedo and the trunk bump both ask for the same point)
var<private> vegBarkMemoKey: vec4f = vec4f( 3.0e38 );
var<private> vegBarkMemoIv: f32 = 3.0e38;
var<private> vegBarkMemo: VegBark;
fn vegPalmBark( y: f32, a: f32, H: f32, seed: f32, iv: f32 ) -> VegBark {
	let key = vec4f( y, a, H, seed );
	if ( all( key == vegBarkMemoKey ) && iv == vegBarkMemoIv ) { return vegBarkMemo; }
	vegBarkMemoKey = key;
	vegBarkMemoIv = iv;
	vegBarkMemo = _vegPalmBark( y, a, H, seed, iv );
	return vegBarkMemo;
}
fn _vegPalmBark( y: f32, a: f32, H: f32, seed: f32, iv: f32 ) -> VegBark {
	let A = a * 6.2832;
	let ca = cos( A ); let sa = sin( A );
	let yn = y / H;
	// rings: phase grows faster toward the crown, jittered per ring band and around the trunk
	let wob = ( vegNoise( vec2f( ca * 1.3 + y * 0.35, sa * 1.3 + seed * 9.0 ) ) - 0.5 ) * 0.7
		+ sin( A * 2.0 + y * 1.1 + seed * 5.0 ) * 0.1;
	let phase = y * mix( 8.5, 11.0, iv ) + pow( yn, 2.2 ) * H * 5.5 + vegNoise( vec2f( y * 0.8, seed * 7.3 ) ) * 3.2
		+ vegNoise( vec2f( y * 3.1, seed * 2.9 ) ) * 0.9 + wob;
	let k0 = floor( phase );
	// ragged ring edges: the scar line wanders a little around the trunk
	let phaseR = phase + ( vegNoise( vec2f( a * 38.0, k0 * 2.3 + seed * 5.0 ) ) - 0.5 ) * 0.22;
	let k = floor( phaseR );
	let fr = phaseR - k;
	// each ring scar has its own width and depth
	let rk = vegHash12( vec2f( k, seed * 13.7 ) );
	let gw = mix( 0.05, 0.14, rk );
	let groove = ( smoothstep( gw, 0.0, fr ) + smoothstep( 1.0 - gw * 0.6, 1.0, fr ) ) * mix( 0.45, 1.0, vegHash12( vec2f( k * 1.3, seed * 3.1 ) ) );
	let ridge = smoothstep( 0.07, 0.15, fr ) * smoothstep( 0.45, 0.16, fr );
	// partial rings: each ring fades out around part of the circumference
	let amp = smoothstep( 0.28, 0.6, vegNoise( vec2f( ca * 1.8 + k * 3.17, sa * 1.8 + k * 1.71 + seed * 11.0 ) ) ) * 0.75 + 0.25;
	// fine vertical fissures (level set of a vertically stretched noise) and bark plates
	let nf = vegNoise( vec2f( a * 54.0, y * 1.6 + seed * 41.0 ) );
	let nf2 = vegNoise( vec2f( a * 110.0, y * 3.4 + seed * 29.0 ) );
	// fissures: short, broken vertical splits (not continuous grain lines)
	let segA = smoothstep( 0.45, 0.62, vegNoise( vec2f( a * 30.0, y * 4.5 + seed * 9.0 ) ) );
	let segB = smoothstep( 0.5, 0.66, vegNoise( vec2f( a * 60.0 + 3.7, y * 9.0 + seed * 21.0 ) ) );
	let crack = max( smoothstep( 0.09, 0.0, abs( nf - 0.5 ) ) * segA, smoothstep( 0.06, 0.0, abs( nf2 - 0.5 ) ) * segB * 0.7 );
	let plate = vegNoise( vec2f( a * 24.0, y * 3.5 + seed * 17.0 ) );
	let blotch = vegNoise( vec2f( a * 6.0, y * 0.4 + seed * 13.0 ) );
	// grey-brown bark weathering to silver-grey, per palm
	var bark = mix( ${$(6182218)}, ${$(10787464)}, sat( blotch * 0.55 + plate * 0.25 + ( iv - 0.5 ) * 0.5 + yn * 0.15 ) );
	// warmer tan on some trees and in patches, dark weathered (rain-soaked) blotches
	bark = mix( bark, bark * vec3f( 1.12, 1.0, 0.82 ), sat( ( vegNoise( vec2f( a * 4.0, y * 0.25 + seed * 31.0 ) ) - 0.4 ) * 2.0 ) * iv );
	bark = bark * mix( 1.0, 0.72, smoothstep( 0.6, 0.8, vegNoise( vec2f( a * 5.0, y * 0.7 + seed * 43.0 ) ) ) );
	// fine mottling (rough, fibrous surface) and pale sun-bleached patches
	let mott = vegNoise( vec2f( a * 90.0, y * 80.0 + seed * 7.0 ) ) * 0.6 + vegNoise( vec2f( a * 35.0, y * 30.0 + seed * 3.0 ) ) * 0.4;
	bark = bark * ( mott * 0.45 + 0.78 ) * ( plate * 0.25 + 0.88 );
	bark = mix( bark, ${$(11775391)}, smoothstep( 0.55, 0.75, vegNoise( vec2f( a * 8.0, y * 1.3 + seed * 61.0 ) ) ) * 0.35 * ( 1.0 - yn * 0.5 ) );
	bark = bark * mix( 1.0, 0.7, groove * amp ) * ( ridge * amp * 0.1 + 1.0 ) * mix( 1.0, 0.5, crack );
	// lichen: pale grey-green crusts and white spots, a little orange; darker rain streaks
	let lic = smoothstep( 0.6, 0.72, vegNoise( vec2f( a * 9.0, y * 2.1 + seed * 23.0 ) ) + ( vegNoise( vec2f( a * 31.0, y * 7.0 ) ) - 0.5 ) * 0.3 ) * smoothstep( 0.9, 0.2, yn );
	let licC = mix( ${$(9343359)}, ${$(11118489)}, plate );
	bark = mix( bark, licC, lic * 0.5 );
	let streak = smoothstep( 0.62, 0.8, vegNoise( vec2f( a * 16.0, y * 0.12 + seed * 5.0 ) ) ) * smoothstep( 1.0, 0.6, yn );
	bark = bark * ( 1.0 - streak * 0.28 );
	// damp, dark base (splash of sand and soil) and the mass of exposed roots at the ground
	let baseK = smoothstep( 1.4, 0.2, y + ( blotch - 0.5 ) * 0.8 );
	bark = mix( bark, bark * vec3f( 0.62, 0.56, 0.48 ), baseK );
	let rootN = vegNoise( vec2f( a * 26.0, y * 2.2 + seed * 19.0 ) );
	let roots = smoothstep( 0.42, 0.05, y ) * smoothstep( 0.35, 0.6, rootN );
	bark = mix( bark, mix( ${$(3812898)}, ${$(6179382)}, rootN ), smoothstep( 0.5, 0.0, y ) * 0.85 );
	// fibrous old frond bases (boot) under the crown: criss-cross fibre mat, brown
	let boot = smoothstep( H - 1.0, H - 0.35, y + ( blotch - 0.5 ) * 0.3 );
	let fib = sin( A * 34.0 + y * 30.0 ) * sin( A * 34.0 - y * 30.0 ) * 0.5 + 0.5;
	bark = mix( bark, mix( ${$(5060386)}, ${$(9073740)}, fib * 0.6 + plate * 0.4 ), boot );
	var o: VegBark;
	o.bark = bark;
	o.hd = ( ridge * amp * 0.004 - groove * amp * 0.008 - crack * 0.006 + plate * 0.004 + mott * 0.004 + roots * 0.01 ) * ( 1.0 - boot ) + boot * fib * 0.004;
	return o;
}
`,ql=`
// Broadleaf plants (parts 6 monstera, 7 elephant ear, 8 heliconia leaf, 9 heliconia bract). Blade
// coordinates: y along the midrib (0 back of the basal lobes .. 1 tip), x across in units of the
// half-width W (m). Returns the outline half-width (x units) at y and whether a hole / slit / tear is
// cut at (y, x).
struct VegBroad { w: f32, cut: bool };
fn vegBroadShape( part: f32, y: f32, x: f32, age: f32, W: f32, fseed: f32, seed: f32 ) -> VegBroad {
	let ax = abs( x );
	var w = 0.0;
	var cut = false;
	// ragged, slightly irregular margin on every leaf (more on old ones)
	let rag = 1.0 - ( vegNoise( vec2f( y * 38.0 + select( 0.0, 17.0, x > 0.0 ), fseed * 31.0 ) ) * 0.05 + age * age * 0.12 * vegNoise( vec2f( y * 11.0, fseed * 7.0 + x ) ) );
	if ( part < 6.5 ) {
		// monstera: cordate blade, basal lobes behind the petiole, V sinus; mature leaves are split
		// from the margin between the primary veins, with a row of holes (fenestrations) inside
		let yb = 0.16;
		let g = ( y - yb ) / ( 1.0 - yb );
		if ( y >= yb ) {
			w = pow( max( sin( 3.14159 * min( 1.0, 0.4 + 0.6 * g ) ), 0.0 ), 0.8 ) * ( 1.0 - 0.15 * smoothstep( 0.8, 1.0, g ) );
		} else {
			let q = ( yb - y ) / yb;
			w = sqrt( max( 1.0 - q * q * q, 0.0 ) ) * 0.96;
			cut = ax < 0.3 * ( 1.0 - y / yb );
		}
		w *= rag;
		let matK = smoothstep( 0.28, 0.45, age );
		if ( matK > 0.0 && y > yb * 0.4 && y < 0.93 ) {
			let L = W / 0.47;
			let X = ax * W;
			let Y = ( y - yb ) * L;
			let p = ( Y - 0.55 * X ) / ( L * 0.8 / 5.5 ) + fseed * 0.37;
			let k = floor( p + 0.5 );
			let e = abs( p - k ); // 0 on the gap between two primary veins
			let hk = vegHash12( vec2f( k + select( 0.0, 50.0, x > 0.0 ), fseed * 19.3 ) );
			let r = ax / max( w, 0.05 );
			let depth = mix( 0.42, 0.75, hk ) + ( 1.0 - matK ) * 0.4;
			// slits widen toward the margin, their inner end rounded
			let slit = e < 0.035 + 0.1 * smoothstep( depth, 1.0, r ) && r > depth - 0.03;
			// fenestrations: one or two elongated holes along the gap line, inside the slit
			let r0 = 0.14; let r1 = depth - 0.1;
			let qh = ( r - r0 ) / max( r1 - r0, 0.05 );
			let nh = select( 1.0, 2.0, hk > 0.45 );
			let qq = fract( qh * nh );
			let hole = qh > 0.0 && qh < 1.0 && e < 0.16 * pow( sin( 3.14159 * qq ), 0.6 ) * matK && hk > 0.12;
			cut = cut || slit || hole;
		}
	} else if ( part < 7.5 ) {
		// elephant ear: peltate blade (petiole joins inside it), rounded basal lobes, acute tip
		let yb = 0.3;
		let g = ( y - yb ) / ( 1.0 - yb );
		if ( y >= yb ) {
			w = pow( max( sin( 3.14159 * min( 1.0, 0.5 + 0.5 * g ) ), 0.0 ), 0.85 );
		} else {
			let q = ( yb - y ) / yb;
			w = sqrt( max( 1.0 - pow( q, 1.6 ), 0.0 ) ) * 0.98;
			cut = y < 0.1 && ax < 0.2 * ( 1.0 - y / 0.1 );
		}
		w *= rag;
	} else if ( part < 8.5 || ( part > 9.5 && part < 10.5 ) ) {
		// heliconia / bird of paradise: paddle blade, torn along the lateral veins (more on old leaves)
		w = pow( max( sin( 3.14159 * min( y * 1.02, 1.0 ) ), 0.0 ), 0.5 ) * ( 1.0 - 0.3 * smoothstep( 0.75, 1.0, y ) ) * rag;
		let xl = y * 22.0 + ax * 1.2 + sin( y * 31.0 + fseed * 10.0 ) * 0.3;
		let k = floor( xl );
		let r1 = vegHash12( vec2f( k + select( 0.0, 40.0, x > 0.0 ), fseed * 7.7 ) );
		let r2 = vegHash12( vec2f( k + 0.5, fseed * 3.3 + seed ) );
		let fx = abs( fract( xl ) - 0.5 );
		cut = r1 < select( 0.12, 0.2, part > 9.5 ) + age * 0.45 && ax / max( w, 0.05 ) > mix( 0.25, 0.8, r2 ) && fx > 0.44;
	} else if ( part < 9.5 ) {
		// bract: boat-shaped, pointed
		w = sin( 3.14159 * min( 1.0, 0.15 + y * 0.9 ) ) * ( 1.0 - 0.4 * smoothstep( 0.7, 1.0, y ) );
	} else {
		// bird of paradise flower pieces: pointed
		w = sin( 3.14159 * min( 1.0, 0.1 + y * 0.9 ) ) * ( 1.0 - 0.5 * smoothstep( 0.6, 1.0, y ) );
	}
	if ( part < 7.5 ) {
		let dmg = vegNoise( vec2f( y * 26.0 + fseed * 17.0, x * 11.0 + seed * 9.0 ) );
		cut = cut || dmg > 0.95 - age * 0.08;
	}
	var o: VegBroad;
	o.w = w;
	o.cut = cut;
	return o;
}

fn vegBroadAlbedo( part: f32, y: f32, x: f32, age: f32, W: f32, fseed: f32, seed: f32, iv: f32, hGround: f32 ) -> vec3f {
	let ax = abs( x );
	let fr = vegHash12( vec2f( fseed * 51.3, seed * 17.9 ) );
	let n1 = vegNoise( vec2f( y * 9.0 + fseed * 13.0, x * 4.0 ) );
	let n2 = vegNoise( vec2f( y * 37.0 + fseed * 3.0, x * 17.0 + seed * 5.0 ) );
	var c = vec3f( 0.0 );
	if ( part < 6.5 ) {
		// monstera: deep glossy green, juvenile leaves lighter yellow-green, old ones yellowing
		var g = mix( ${$(2243349)}, ${$(3297053)}, iv * 0.6 + fr * 0.4 );
		g = mix( ${$(5205800)}, g, smoothstep( 0.1, 0.35, age ) );
		g = mix( g, ${$(10129726)}, smoothstep( 0.85, 0.97, age ) * ( 0.6 + 0.4 * n1 ) );
		c = g * ( n1 * 0.16 + 0.92 );
		// primary veins a touch paler, midrib pale
		let L = W / 0.47;
		let p = ( ( y - 0.16 ) * L - 0.55 * ax * W ) / ( L * 0.8 / 5.5 ) + fseed * 0.37;
		let rib = smoothstep( 0.1, 0.0, abs( fract( p ) - 0.5 ) ) * step( 0.16, y );
		c = c * ( 1.0 + rib * 0.12 );
		c = mix( c, ${$(8427850)}, smoothstep( 0.03, 0.0, ax * W ) * 0.7 );
	} else if ( part < 7.5 ) {
		// elephant ear: mid green, pale veins radiating from where the petiole joins
		var g = mix( ${$(3364894)}, ${$(4878632)}, iv * 0.6 + fr * 0.4 );
		g = mix( g, ${$(9998655)}, smoothstep( 0.85, 0.97, age ) * ( 0.6 + 0.4 * n1 ) );
		let ang = atan2( ax * W, ( y - 0.3 ) * W / 0.4 );
		let vein = smoothstep( 0.1, 0.0, abs( fract( ang * 2.6 ) - 0.5 ) - 0.38 ) * 0.7;
		c = g * ( n1 * 0.14 + 0.93 );
		c = mix( c, ${$(8361560)}, vein * 0.35 + smoothstep( 0.025, 0.0, ax * W ) * step( 0.3, y ) * 0.5 );
	} else if ( part > 10.5 ) {
		// bird of paradise flower: beak green-grey with a purple-red keel, orange sepals, blue tongue
		let beak = mix( mix( ${$(5991242)}, ${$(7024442)}, smoothstep( 0.3, 0.9, ax ) * 0.7 ), ${$(12611642)}, smoothstep( 0.8, 1.0, y ) * 0.4 );
		let sepal = mix( ${$(14709788)}, ${$(15768106)}, n1 );
		let tongue = mix( ${$(2899866)}, ${$(4217016)}, n1 );
		return select( select( beak, sepal, age > 0.25 ), tongue, age > 0.75 );
	} else if ( part > 9.5 ) {
		// bird of paradise leaf: glaucous grey-green, pale midrib
		var g = mix( ${$(4086326)}, ${$(5204547)}, iv * 0.6 + fr * 0.4 );
		g = mix( g, ${$(9407050)}, smoothstep( 0.8, 0.95, age ) );
		c = g * ( n1 * 0.1 + 0.95 );
		c = mix( c, ${$(10725496)}, smoothstep( 0.015, 0.0, ax * W ) * 0.6 );
	} else if ( part < 8.5 ) {
		var g = mix( ${$(3562784)}, ${$(4944425)}, iv * 0.6 + fr * 0.4 );
		g = mix( g, ${$(9407034)}, smoothstep( 0.8, 0.95, age ) );
		c = g * ( ( sin( y * 180.0 + ax * 30.0 ) * 0.5 + 0.5 ) * 0.06 + 0.95 ) * ( n1 * 0.12 + 0.94 );
		c = mix( c, ${$(11188334)}, smoothstep( 0.02, 0.0, ax * W ) * 0.7 );
	} else {
		// heliconia bract: scarlet, yellow lip, green tip on the youngest (top) bracts
		c = mix( ${$(9312786)}, ${$(12397082)}, n1 * 0.6 + fr * 0.4 );
		c = mix( c, ${$(14925112)}, smoothstep( 0.62, 0.9, ax ) );
		c = mix( c, ${$(7113262)}, smoothstep( 0.8, 1.0, y ) * smoothstep( 0.6, 1.0, age ) * 0.7 );
		return c;
	}
	// weathering: browned dry margins and tips, fungal spots, splashed soil on low leaves
	let edge = smoothstep( 0.8, 1.0, ax + n2 * 0.25 - 0.1 ) * ( 0.25 + age * 0.9 );
	c = mix( c, mix( ${$(8087097)}, ${$(5915944)}, n2 ), sat( edge ) * 0.85 );
	let spot = vegNoise( vec2f( y * 14.0 + fseed * 9.0, x * 6.0 + seed * 3.0 ) );
	c = mix( c, ${$(6181939)}, smoothstep( 0.86, 0.93, spot ) * 0.5 * ( 0.4 + age ) );
	c = mix( c, ${$(7101509)}, smoothstep( 0.55, 0.0, hGround ) * smoothstep( 0.5, 0.75, n2 ) * 0.5 );
	// dead leaves: brown and papery
	c = mix( c, mix( ${$(7231028)}, ${$(9402958)}, n1 ), smoothstep( 0.93, 0.99, age ) );
	return c;
}

fn vegBroadStem( part: f32, a: f32, f: f32, seed: f32, age: f32 ) -> vec3f {
	let n = vegNoise( vec2f( a * 6.0, f * 30.0 + seed * 11.0 ) );
	if ( part < 6.5 ) { return mix( ${$(4876842)}, ${$(6061107)}, n ) * mix( 1.0, 0.8, smoothstep( 0.7, 1.0, age ) ); }
	if ( part < 7.5 ) { return mix( ${$(5663284)}, ${$(6113852)}, n * 0.5 ); }
	if ( part < 8.5 ) { return mix( mix( ${$(4877102)}, ${$(6387514)}, n ), ${$(5917232)}, smoothstep( 0.6, 0.8, vegNoise( vec2f( a * 3.0, f * 8.0 + seed * 5.0 ) ) ) * 0.6 ); }
	if ( part > 9.5 ) { return mix( ${$(5596746)}, ${$(7173720)}, n ); }
	return ${$(9312786)};
}
`,Jl=new R({name:`vegPlant`,deps:[bl],code:Kl+ql+`
// alpha mask (fronds / pinnae / torn banana blades) + the LOD cross-fade of the instance
fn vegPlantMask( in: FragInput ) -> bool {
	let st = in.uv;
	let s = st.x;
	let t = st.y;
	let fwS = fwidth( s ); // evaluated in uniform control flow, before the branches
	let aMat = in.vs.vMat;
	let part = aMat.x; let age = aMat.y; let Ll = aMat.z; let fseed = aMat.w;
	let seed = in.vs.vIDat.w;
	var m = 1.0;
	if ( part > 0.5 && part < 1.5 ) {
		// coconut frond: ~95 narrow leaflets per side (100-125 on a real frond), separated by gaps
		// that show the sky; leaflets bunch and spread irregularly, some are short, split or torn
		// away (runs of missing leaflets, more on old fronds)
		let N = 95.0;
		let x = s * N + ( vegNoise( vec2f( s * 7.0, fseed * 23.0 + seed * 3.0 ) ) - 0.5 ) * 2.2;
		let k = floor( x );
		let r1 = vegHash12( vec2f( k, fseed * 91.7 ) );
		let r2 = vegHash12( vec2f( k * 1.37 + 3.1, fseed * 17.3 + seed * 5.0 ) );
		let fx = fract( x ) - 0.5 - ( r1 - 0.5 ) * 0.35;
		let tEnd = mix( 0.72, 1.0, r2 ) * select( 1.0, 0.45, r1 < 0.06 );
		let tt = t / tEnd;
		let hw = pow( max( 1.0 - tt, 0.0 ), 0.6 ) * 0.22 * ( smoothstep( 0.0, 0.1, tt ) * 0.4 + 0.6 );
		// split leaflets: a slit from the tip back along the midvein
		let split = r2 > 0.9 && tt > mix( 0.35, 0.7, r1 ) && abs( fx ) < hw * 0.3;
		// torn-out runs of leaflets
		let torn = vegNoise( vec2f( k * 0.21 + seed * 17.0, fseed * 37.0 ) ) > 0.83 - age * 0.2 && s > 0.3;
		// sub-pixel leaflets widen instead of aliasing (fronds turn solid in the distance)
		let hwE = max( hw, min( fwS * ( N * 0.6 ), 0.5 ) * select( 0.0, 1.0, tt < 1.0 ) );
		let leaf = abs( fx ) < hwE && tt < 1.0 && s > 0.06 && ! split && ! torn;
		let rachis = t * Ll < 0.026;
		m = select( 0.0, 1.0, leaf || rachis );
	} else if ( part > 1.5 && part < 2.5 ) {
		// fern: rounded pinnae
		let N = 26.0;
		let x = s * N;
		let k = floor( x );
		let r2 = vegHash12( vec2f( k, fseed * 31.1 ) );
		let fx = fract( x ) - 0.5;
		let tt = t / mix( 0.8, 1.0, r2 );
		let hw = sqrt( max( 1.0 - tt * tt, 0.0 ) ) * 0.34;
		let hwE = max( hw, min( fwS * ( N * 0.6 ), 0.5 ) * select( 0.0, 1.0, tt < 1.0 ) );
		let leaf = abs( fx ) < hwE && tt < 1.0 && s > 0.04;
		let rachis = t * Ll < 0.006;
		m = select( 0.0, 1.0, leaf || rachis );
	} else if ( part > 2.5 && part < 3.5 && s >= 0.0 ) {
		// banana: full blade, torn along lateral veins, ragged edge
		let x = s * 13.0 + sin( s * 31.0 + fseed * 10.0 ) * 0.35;
		let k = floor( x );
		let r1 = vegHash12( vec2f( k, fseed * 7.7 ) );
		let r2 = vegHash12( vec2f( k + 0.5, fseed * 3.3 + seed ) );
		let fx = abs( fract( x ) - 0.5 );
		// dead leaves are shredded
		let dead = step( 0.8, age );
		// wind-torn strips: most tears start at the margin and run in along the veins, more on older
		// leaves; dead leaves are shredded
		let tear = r1 < mix( 0.45 + age * 0.6, 0.95, dead ) && t > mix( 0.12, 0.75, r2 ) * mix( 1.0, 0.4, dead ) && fx > mix( 0.45, 0.37, r2 ) - dead * 0.12;
		let edge = t < 0.985 - vegNoise( vec2f( s * 60.0, fseed * 9.0 ) ) * 0.07;
		m = select( 0.0, 1.0, ! tear && edge );
	} else if ( part > 5.5 && s >= 0.0 ) {
		// broadleaf blades (petioles, s < 0, are kept whole)
		let sh = vegBroadShape( part, s, t, age, Ll, fseed, seed );
		m = select( 0.0, 1.0, abs( t ) < sh.w && ! sh.cut );
	}
	return m > 0.5 && vegLodDither( in.vs.vIPos, draw.params.yzw, in.pixel );
}

fn vegPlantAlbedo( in: FragInput ) -> vec3f {
	let st = in.uv;
	let s = st.x;
	let t = st.y;
	let aMat = in.vs.vMat;
	let part = aMat.x; let age = aMat.y; let Ll = aMat.z; let fseed = aMat.w;
	let seed = in.vs.vIDat.w;
	let H = in.vs.vIDat.z;
	var col = vec3f( 0.0 );
	let iv = vegHash12( vec2f( seed * 37.1, 1.7 ) );
	if ( part < 0.5 ) {
		// stems: age 0 -> weathered, ringed palm trunk; 1 -> green banana pseudostem
		let y = in.vs.vTrunkY;
		let a = st.x;
		let bark = vegPalmBark( y, a, H, seed, iv ).bark;
		// (palm trunks have age 0: the pseudostem colour only where it is mixed in)
		var green = vec3f( 0.0 );
		if ( age > 0.0 ) {
			let fiss = vegNoise( vec2f( a * 46.0, y * 1.1 + seed * 50.0 ) );
			let blotch = vegNoise( vec2f( a * 7.0, y * 0.45 + seed * 13.0 ) );
			// banana pseudostem: overlapping sheaths (vertical streaks), dark blotches, dry brown
			// sheath strips peeling off low down (no leaf-scar rings)
			let streakS = vegNoise( vec2f( a * 24.0, y * 0.35 + seed * 7.0 ) );
			green = mix( ${$(5138986)}, ${$(7046200)}, streakS * 0.7 + fiss * 0.3 );
			green = mix( green, ${$(3879714)}, smoothstep( 0.62, 0.82, blotch ) * 0.55 );
			green = mix( green, mix( ${$(7230772)}, ${$(9402962)}, fiss ), smoothstep( 0.55, 0.75, streakS ) * smoothstep( 1.1, 0.3, y ) );
		}
		col = mix( bark, green, age );
	} else if ( part < 1.5 ) {
		// age (aMat.y): 0 young upper fronds (lighter yellow-green) .. 0.55 old lower fronds (olive,
		// yellowing); 1 = the two hanging fronds, whose state is picked per tree and frond (one crown
		// mesh is shared): still olive, yellowing or dead brown
		let fr = vegHash12( vec2f( fseed * 51.3, seed * 17.9 ) );
		let a = sat( age / 0.55 );
		var g = mix( ${$(7506995)}, ${$(4480807)}, smoothstep( 0.0, 0.35, a ) );
		g = mix( g, ${$(6909999)}, smoothstep( 0.55, 1.0, a ) );
		// per tree: yellower or bluer greens; per frond: value
		g = mix( g, g * vec3f( 1.12, 1.02, 0.78 ), iv * 0.8 );
		g = mix( g, g * vec3f( 0.86, 0.98, 1.08 ), ( 1.0 - iv ) * 0.5 );
		g = g * mix( 0.82, 1.1, fr );
		// leaflets: darker toward their tips, paler at the base, each a little different
		let kL = floor( s * 95.0 );
		let perLeaf = vegHash12( vec2f( kL, fseed * 13.1 ) );
		var c = g * mix( 1.08, 0.86, smoothstep( 0.2, 1.0, t ) ) * ( perLeaf * 0.22 + 0.9 );
		// browned, dried tips on some leaflets (more on old fronds)
		let tipK = smoothstep( 0.72, 0.97, t ) * step( 0.55 - a * 0.35, vegHash12( vec2f( kL * 1.7, fseed * 5.3 + seed ) ) );
		c = mix( c, mix( ${$(9206346)}, ${$(7232313)}, perLeaf ), tipK * 0.85 );
		// hanging fronds
		let hangK = smoothstep( 0.8, 0.95, age );
		let state = vegHash12( vec2f( fseed * 7.1, seed * 29.3 ) );
		let yellowing = mix( ${$(9407036)}, ${$(10521157)}, perLeaf );
		let deadC = mix( ${$(8021056)}, ${$(6048304)}, perLeaf );
		let hangC = select( select( c * 0.9, yellowing, state > 0.35 ), deadC, state > 0.62 );
		c = mix( c, hangC, hangK );
		// midrib: pale yellow on young fronds, straw on old, brown when dead
		let rachis = t * Ll < 0.026;
		let rib = mix( mix( ${$(11773536)}, ${$(9996622)}, a ), ${$(7297594)}, hangK * step( 0.62, state ) );
		col = select( c, rib, rachis );
	} else if ( part < 2.5 ) {
		let c = mix( ${$(3431456)}, ${$(5603372)}, smoothstep( 0.1, 1.0, s ) * 0.6 + iv * 0.4 );
		col = c * mix( 0.85, 1.1, vegHash12( vec2f( floor( s * 26.0 ), fseed ) ) );
	} else if ( part < 3.5 ) {
		if ( s < 0.0 ) {
			// banana pseudostem: overlapping sheaths (vertical streaks), brown / purple-black blotches,
			// dry brown sheath fibre peeling low down
			let f = ( s + 1.0 ) * 2.0;
			let a = t;
			let streakS = vegNoise( vec2f( a * 26.0, f * 3.0 + fseed * 7.0 ) );
			let blotch = vegNoise( vec2f( a * 9.0, f * 6.0 + fseed * 13.0 ) );
			var gS = mix( ${$(5596974)}, ${$(7241018)}, streakS * 0.7 + iv * 0.3 );
			gS = mix( gS, ${$(3811880)}, smoothstep( 0.6, 0.8, blotch ) * 0.6 );
			let dry = smoothstep( 0.45, 0.7, vegNoise( vec2f( a * 14.0 + 3.0, f * 2.5 + fseed * 19.0 ) ) ) * smoothstep( 0.8, 0.2, f );
			col = mix( gS, mix( ${$(6967859)}, ${$(9337426)}, streakS ), dry * 0.9 );
		} else {
			// blade: muted green (per plant and leaf), paler midrib, faint lateral veins; dried, browned
			// margins and torn strip edges; old leaves yellowing; dead ones brown and papery
			let lf = vegHash12( vec2f( fseed * 23.1, seed * 3.7 ) );
			var base = mix( ${$(4153124)}, ${$(5600301)}, iv * 0.55 + lf * 0.45 );
			base = mix( base, ${$(8158517)}, smoothstep( 0.35, 0.6, age ) * 0.55 );
			let vein = ( sin( s * 260.0 ) * 0.5 + 0.5 ) * 0.07;
			let mott = vegNoise( vec2f( s * 11.0 + fseed * 3.0, t * 4.0 ) );
			var c = base * ( vein + 0.94 ) * ( mott * 0.14 + 0.93 );
			c = mix( c, ${$(11120750)}, smoothstep( 0.05, 0.0, t ) * 0.75 ); // midrib
			let xs = s * 13.0 + sin( s * 31.0 + fseed * 10.0 ) * 0.35;
			let stripEdge = smoothstep( 0.36, 0.47, abs( fract( xs ) - 0.5 ) ) * smoothstep( 0.4, 0.8, t ) * ( 0.3 + age );
			let dryEdge = smoothstep( 0.72, 1.0, t + ( vegNoise( vec2f( s * 25.0, fseed * 4.0 ) ) - 0.5 ) * 0.3 ) * ( 0.45 + age * 0.8 );
			let brownC = mix( ${$(7034161)}, ${$(9402952)}, mott );
			c = mix( c, brownC, sat( max( dryEdge, stripEdge * 0.6 ) ) * 0.85 );
			let deadC = mix( ${$(6179372)}, ${$(8810570)}, vegNoise( vec2f( s * 18.0, t * 3.0 + fseed * 5.0 ) ) );
			c = mix( c, deadC, smoothstep( 0.85, 0.95, age ) );
			col = c;
		}
	} else if ( part > 5.5 ) {
		let hGround = in.P.y - in.vs.vIPos.y;
		if ( s < 0.0 ) {
			col = vegBroadStem( part, t, ( s + 1.0 ) * 2.0, fseed, age );
		} else {
			col = vegBroadAlbedo( part, s, t, age, Ll, fseed, seed, iv, hGround );
		}
	} else {
		// coconuts: green -> yellow -> brown
		col = mix( mix( ${$(6845994)}, ${$(10258996)}, smoothstep( 0.3, 0.7, age ) ), ${$(6045986)}, smoothstep( 0.82, 0.95, age ) );
	}
	return col;
}
`}),Yl={iPos:`vec4f`,iDat:`vec4f`,aVeg:`vec4f`,aMat:`vec4f`,aLobe:`vec4f`};function Xl(){return new Ar({name:`veg-plant-leaf`,side:`double`,modules:[bl,Jl],attributes:Yl,varyings:{vTrunkY:`f32`,vTrunkT:`vec3f`,vMat:`vec4f`,vIDat:`vec4f`,vIPos:`vec3f`},vertex:`
	let pl = vegPlantDeform( ( v.model * vec4f( v.position, 1.0 ) ).xyz, vegInstanceNormal( v.model, v.normal ), v.iPos, v.iDat, v.aVeg, v.aMat, v.aLobe, draw.params.yzw );
	v.useWorld = true;
	v.worldPos = pl.pos;
	v.worldNormal = pl.normal;
	o.vTrunkY = pl.trunkY;
	o.vTrunkT = pl.trunkT;
	o.vMat = v.aMat;
	o.vIDat = v.iDat;
	o.vIPos = v.iPos.xyz;`,surface:`
	if ( ! vegPlantMask( in ) ) { discard; }
	let aMat = in.vs.vMat;
	let part = aMat.x;
	let age = aMat.y;
	let isStem = part < 0.5;
	let isNut = part > 4.5 && part < 5.5;
	let isLeaf = ! isStem && ! isNut;
	let isBroad = part > 5.5;
	var albedo = vegPlantAlbedo( in );
	// the underside of fronds and leaves is duller and a little bluer than the waxy upper side
	let upper = in.front;
	albedo = select( albedo * vec3f( 0.74, 0.8, 0.84 ), albedo, upper || ! isLeaf );
	s.albedo = albedo;
	// stems: leaf-scar ring bump along the trunk axis; leaves: normals bent slightly towards
	// the viewer to soften grazing-angle Fresnel
	// palm trunks: bark relief (rings, fissures, roots, fibres) along the trunk axis (finite
	// difference of the bark height, faded with distance); leaves: normals bent towards the viewer
	var d = 0.0;
	var dA = 0.0;
	let fadeB = 1.0 - smoothstep( 10.0, 32.0, length( frame.cameraPos - in.P ) );
	if ( isStem && fadeB > 0.0 ) {
		let seed = in.vs.vIDat.w;
		let H = in.vs.vIDat.z;
		let y = in.vs.vTrunkY;
		let a = in.uv.x;
		let ivN = vegHash12( vec2f( seed * 37.1, 1.7 ) );
		let e = 0.004;
		let ea = 0.0015; // around the trunk (a: 0..1 over a ~1.1 m circumference)
		let h0 = vegPalmBark( y, a, H, seed, ivN ).hd;
		let slope = ( vegPalmBark( y + e, a, H, seed, ivN ).hd - h0 ) / e;
		let slopeA = ( vegPalmBark( y, a + ea, H, seed, ivN ).hd - h0 ) / ( ea * 1.1 );
		d = slope * fadeB * ( 1.0 - age );
		dA = slopeA * fadeB * ( 1.0 - age );
	}
	s.normal = normalize( in.N - in.vs.vTrunkT * d - cross( in.N, in.vs.vTrunkT ) * dA + in.V * select( 0.0, 0.15, isLeaf ) );
	// waxy but not glossy: a sharper, stronger sheen mirrored the bright sky near the sun and read as a
	// white film over backlit foliage
	// broadleaf: monstera glossy, elephant ear waxy-matte, heliconia satin, bracts glossy; dead
	// leaves dull
	let broadR = select( select( select( 0.45, 0.42, part > 7.5 ), 0.58, part > 6.5 && part < 7.5 ), 0.46, part < 6.5 );
	s.roughness = select( select( select( 0.7, 0.62, part < 1.5 || isNut ), 0.92, isStem ), mix( broadR, 0.85, smoothstep( 0.9, 0.98, age ) ), isBroad );
	s.metalness = 0.0;
	s.specularIntensity = select( select( 0.4, 0.3, isStem ), 0.42, isBroad );
	s.translucency = vec3f( 0.0 );
	if ( isLeaf ) { s.translucency = vegTranslucency( albedo, in.N, select( 0.3, 0.2, isBroad ), in.P ); }`,shadow:`return vegPlantMask( in );`})}var Zl=e=>`
	let iPos = v.iPos;
	let iDat = v.iDat;
	let veg = v.aVeg;
	let base = iPos.xyz;
	let sc = iPos.w;
	let Hh = iDat.z;
	let seed = iDat.w;
	let hf = veg.x;
	let flex = veg.y;
	let flut = veg.z;
	let ph = veg.w;
	var P = ( v.model * vec4f( v.position, 1.0 ) ).xyz;
	let isShrubI = iDat.y < 0.0;
	var keep = 1.0;
${e?`
	// merged tree + shrub geometry: keep the parts of this instance's plant type
	let isShrubPart = v.aMat.x > 3.5;
	keep = select( 0.0, 1.0, isShrubPart == isShrubI );
	// leaf cards move towards their lobe centre by the variant's lobe scale (0: dropped lobe)
	let lobe = v.aLobe;
	let lk = select( 0.0, 1.0 - vegLobeScale( seed, lobe.w, isShrubI ), lobe.w >= 0.0 );
	let ld = lobe.xyz * lk;
	let yaw = iDat.x; let cy = cos( yaw ); let sy = sin( yaw );
	let sv = abs( iDat.y );
	P += vec3f( ld.x * cy + ld.z * sy, ld.y * sv, ld.z * cy - ld.x * sy ) * sc;
`:``}
	let N = vegInstanceNormal( v.model, v.normal );
	let w = vegWindStrength();
	let g = vegGustAt( base.xz );
	let t = frame.time;
	let ph0 = seed * 6.2832;
	let h2 = hf * hf;
	let sway = ( w * w * 0.009 * ( g * 0.8 + 0.3 ) + sin( t * 0.9 + ph0 ) * w * 0.0045 * ( g + 0.4 ) ) * Hh * h2;
	let swayP = sin( t * 0.67 + ph0 * 1.3 ) * w * 0.002 * Hh * h2;
	let branch = sin( t * ( ph + 1.7 ) + ph * 20.0 + ph0 ) * flex * w * sc * 0.07 * ( g + 0.5 )
		- flex * w * w * sc * 0.04 * ( g + 0.3 ); // branches sag / stream in strong gusts
	let flutter = sin( t * 9.5 + ph * 50.0 + P.x * 1.9 + P.z * 2.3 ) * flut * sc * ( w * 0.035 + 0.005 );
	let pos = P + vegWindDir3() * sway + vegWindPerp3() * swayP + VEG_UP * branch + N * flutter;
	// near LOD: trees and shrubs hand over to the impostors at their own distance
	let dCam = length( vegParams.camPos - base );
	let nearK = select( 0.0, 1.0, dCam < select( vegParams.canopyNear.x, vegParams.canopyNear.y, isShrubI ) * ( 1.0 + VEG_LOD_BAND / 2.0 ) );
	v.useWorld = true;
	v.worldPos = base + ( pos - base ) * ( keep * nearK );
	v.worldNormal = N;
`,Ql=hl.fields.canopyNear,$l=new R({name:`vegCanopy`,deps:[bl],code:`
fn vegPick4( s4: f32, a: vec3f, b: vec3f, c: vec3f, d: vec3f ) -> vec3f { return select( select( select( d, c, s4 < 2.5 ), b, s4 < 1.5 ), a, s4 < 0.5 ); }
fn vegPick3( s3: f32, a: vec3f, b: vec3f, c: vec3f ) -> vec3f { return select( select( c, b, s3 < 1.5 ), a, s3 < 0.5 ); }
fn vegTreeSpecies( seed: f32 ) -> f32 { return floor( fract( seed * 5.31 ) * 4.0 ); }
// shrubs: 0 sea grape 45 %, 1 croton 15 %, 2 hibiscus 40 %
fn vegShrubSpecies( seed: f32 ) -> f32 {
	let h = fract( seed * 3.17 );
	return select( select( 2.0, 1.0, h < 0.6 ), 0.0, h < 0.45 );
}

// base leaf colour of an instance (species, per-card random cr, per-instance tint)
fn vegCanopyLeafColor( seed: f32, cr: f32, isShrub: bool ) -> vec3f {
	let spT = vegTreeSpecies( seed ); let spS = vegShrubSpecies( seed );
	// tree species: dark glossy (bronze flush), fresh mid green, yellow-green, blue-green
	// (Caribbean hillside forest: deep, olive and yellow-greens, muted, with a few dry / bronze
	// and flowering crowns)
	let t0 = mix( mix( ${$(2636315)}, ${$(3557923)}, cr ), ${$(6179374)}, smoothstep( 0.96, 0.995, cr ) * 0.5 );
	let t1 = mix( ${$(3426591)}, ${$(4742183)}, cr );
	let t2 = mix( ${$(5200423)}, ${$(6580785)}, cr );
	let t3 = mix( ${$(2767658)}, ${$(3820086)}, cr );
	let s0 = mix( ${$(4150562)}, ${$(5400106)}, cr );
	let s1 = mix( ${$(2900510)}, ${$(4478495)}, cr );
	let s2 = mix( ${$(3428892)}, ${$(4613668)}, cr );
	let iv = vegHash12( vec2f( seed * 17.3, 4.1 ) );
	let iv2 = vegHash12( vec2f( seed * 5.9, 8.3 ) );
	var c = select( vegPick4( spT, t0, t1, t2, t3 ), vegPick3( spS, s0, s1, s2 ), isShrub ) * ( iv * 0.36 + 0.74 );
	// a few trees dry / dropping leaves (brown-olive), or flowering (flamboyant, orange-red)
	let treeK = select( 1.0, 0.0, isShrub );
	let dry = step( iv2, 0.035 ) * treeK;
	c = mix( c, mix( ${$(6050356)}, ${$(7232058)}, cr ), dry * 0.5 );
	let flower = step( 0.988, iv2 ) * treeK * step( 0.5, cr );
	c = mix( c, ${$(9062956)}, flower * 0.5 );
	return mix( vec3f( luminance( c ) ), c, 0.85 );
}

fn vegBarkColor( n: f32, n2: f32 ) -> vec3f {
	return mix( mix( ${$(3156514)}, ${$(6051145)}, n * 0.6 + n2 * 0.4 ), ${$(8092522)}, smoothstep( 0.64, 0.8, n2 ) * 0.3 );
}

// leaf-cluster tile of a card: trees broad / narrow leaves by species, shrubs round / narrow
fn vegLeafTile( seed: f32, isShrub: bool ) -> f32 {
	let spT = vegTreeSpecies( seed ); let spS = vegShrubSpecies( seed );
	return select( select( 0.0, 1.0, fract( spT * 0.5 ) > 0.25 ), select( 2.0, 3.0, spS == 1.0 ), isShrub );
}

// alpha-test threshold compensating the coverage loss of the minified (mipmapped) leaf texture
fn vegCoverageThreshold( st: vec2f ) -> f32 {
	let lod = log2( max( max( fwidth( st.x ), fwidth( st.y ) ) * 256.0, 1e-4 ) );
	return mix( 0.5, 0.3, sat( lod / 4.0 ) );
}

// Runtime colour of an impostor fragment (same palette as the near canopy)
fn vegImpostorColor( seed: f32, cr: f32, leaf: f32, bright: f32, isGroup1: bool ) -> vec3f {
	let leafC = vegCanopyLeafColor( seed, cr, isGroup1 ) * ( bright * 1.4 );
	// limbs and twigs seen through the crown gaps are in the crown's shade: dark and a little
	// green-brown, and the leaves dominate the blend (grey limbs made far crowns read grey-beige)
	let barkC = mix( ${$(1841683)}, ${$(3025696)}, ( bright - 0.4 ) / 0.5 );
	let c = mix( barkC, leafC, smoothstep( 0.05, 0.55, leaf ) );
	// far crowns keep their green through the haze (a little more saturated than the near canopy)
	return max( mix( vec3f( luminance( c ) ), c, 1.25 ), vec3f( 0.0 ) );
}
`}),eu=`
fn vegCanopyMask( in: FragInput, L: vec4f ) -> bool {
	let part = in.vs.vMat.x;
	let isBark = part < 0.5 || part > 4.5;
	// cross-fade into the impostors (outgoing level of the band around uCanopyNear)
	let nearD = select( vegParams.canopyNear.x, vegParams.canopyNear.y, in.vs.vIDat.y < 0.0 );
	let fade = smoothstep( nearD * ( 1.0 - VEG_LOD_BAND / 2.0 ), nearD * ( 1.0 + VEG_LOD_BAND / 2.0 ), length( vegParams.camPos - in.vs.vIPos ) );
	// cards seen edge-on thin out (no sliver lines through the crown)
	let facing = abs( dot( normalize( cross( dpdx( in.P ), dpdy( in.P ) ) ), in.V ) );
	let thr = vegCoverageThreshold( in.uv ) + ( 1.0 - smoothstep( 0.08, 0.35, facing ) ) * 0.45;
	return ( isBark || L.x > thr ) && bayer4( in.pixel ) >= fade;
}
fn vegCanopyLeaf( in: FragInput ) -> vec4f {
	let part = in.vs.vMat.x;
	return vegLeafSample( in.uv, vegLeafTile( in.vs.vIDat.w, part > 2.5 ) );
}
`;function tu(e){let t=new R({name:`vegCanopyMask`,deps:[$l,e.module],code:eu});return new Ar({name:`veg-canopy`,side:`double`,modules:[bl,$l,e.module,t],attributes:Yl,varyings:{vMat:`vec4f`,vIDat:`vec4f`,vIPos:`vec3f`,vHf:`f32`},vertex:Zl(!0)+`
	o.vMat = v.aMat;
	o.vIDat = v.iDat;
	o.vIPos = v.iPos.xyz;
	o.vHf = v.aVeg.x;`,surface:`
	let aMat = in.vs.vMat;
	let part = aMat.x;
	let ao = aMat.y;
	let cr = aMat.z;
	let seed = in.vs.vIDat.w;
	let isBark = part < 0.5 || part > 4.5;
	let isShrub = part > 2.5;
	let spT = vegTreeSpecies( seed ); let spS = vegShrubSpecies( seed );
	// leaf cluster sampled once (first in the fragment shader), shared by the mask and the colour
	let L = vegCanopyLeaf( in );
	if ( ! vegCanopyMask( in, L ) ) { discard; }
	let bright = L.y * 1.4;
	let cell = L.z;
	var c = vegCanopyLeafColor( seed, cr, isShrub ) * bright;
	// species details: red-veined old leaves (sea grape), variegation (croton), flowers (hibiscus)
	let shrub0 = isShrub && spS < 0.5; let shrub1 = isShrub && spS == 1.0; let shrub2 = isShrub && spS > 1.5;
	c = mix( c, ${$(8010274)}, smoothstep( 0.86, 0.98, cell ) * 0.55 * select( 0.0, 1.0, shrub0 ) );
	let vari = select( ${$(8010274)}, ${$(10127920)}, fract( cell * 7.3 ) > 0.5 );
	c = mix( c, vari, smoothstep( 0.72, 0.9, cell ) * 0.55 * select( 0.0, 1.0, shrub1 ) );
	c = select( c, ${$(11740702)}, shrub2 && cell > 0.92 );
	// trees: a few old leaves turning red / yellow before they drop (sea almond)
	let treeK = select( 1.0, 0.0, isShrub );
	c = mix( c, mix( ${$(9075258)}, ${$(8273442)}, step( 0.992, fract( cell * 3.7 ) ) ), step( 0.984, fract( cell * 3.7 ) ) * treeK * 0.6 );
	// sunlit outer / upper leaves brighter and a little yellow-green; shaded interior kept for contrast
	let outer = smoothstep( 0.62, 1.0, ao );
	c = mix( c, c * vec3f( 1.16, 1.22, 0.92 ), outer * 0.7 );
	let leaf = c * mix( 0.55, 1.0, ao );
	// bark: grey-brown with vertical streaks, lichen patches
	let hfB = in.vs.vHf;
	var albedo = leaf;
	if ( isBark ) {
		let st = in.uv;
		let n2 = vegNoise( vec2f( st.x * 6.0, st.y * 0.7 ) );
		var bark = vegBarkColor( vegNoise( vec2f( st.x * 30.0, st.y * 2.5 + seed * 40.0 ) ), n2 );
		// moss and epiphytes on the humid lower trunk and the upper sides of the limbs
		bark = mix( bark, mix( ${$(2898456)}, ${$(4478250)}, n2 ), smoothstep( 0.45, 0.7, vegNoise( vec2f( st.x * 9.0, st.y * 1.3 + seed * 11.0 ) ) + ( 0.35 - hfB ) * 0.6 ) * 0.7 );
		albedo = bark;
	}
	s.albedo = albedo;
	// bark: the trunk under the crown sees little of the sky
	s.ao = select( mix( 0.35, 1.0, ao ), smoothstep( 0.0, 0.75, hfB ) * 0.45 + 0.4, isBark );
	s.roughness = select( select( 0.82, 0.65, ( isShrub && spS < 0.5 ) || ( ! isShrub && spT < 0.5 ) ), 0.92, isBark );
	s.metalness = 0.0;
	s.specularIntensity = 0.15;
	// leaves: canopy (spherical) normals, not flipped on back faces, bent towards the viewer
	// so they are never shaded at grazing angles (avoids a white Fresnel sheen when backlit)
	let geoN = normalize( in.vs.normal );
	s.normal = select( normalize( geoN + in.V * 0.7 ), in.N, isBark );
	s.translucency = vec3f( 0.0 );
	if ( ! isBark ) { s.translucency = vegTranslucency( albedo, geoN, 0.5, in.P ) * ( ao * 0.6 + 0.4 ); }`,shadow:`return vegCanopyMask( in, vegCanopyLeaf( in ) );`})}function nu(e){let t=t=>new Ar({name:`veg-impostor-bake-`+t,side:`double`,lit:!1,modules:[bl,e.module],attributes:{aMat:`vec4f`},varyings:{vMat:`vec4f`,vLocalN:`vec3f`},vertex:`o.vMat = v.aMat; o.vLocalN = v.normal;`,surface:`
	let aMat = in.vs.vMat;
	let part = aMat.x;
	let isBark = part < 0.5 || part > 4.5;
	let isShrub = part > 2.5;
	let st = in.uv;
	let L = vegLeafSample( st, select( 0.0, 2.0, isShrub ) );
	if ( ! ( isBark || L.x > 0.5 ) ) { discard; }`,output:t===`albedo`?`
	let aMat = in.vs.vMat;
	let part = aMat.x;
	let isBark = part < 0.5 || part > 4.5;
	let isShrub = part > 2.5;
	let st = in.uv;
	let vBright = vegLeafSample( st, select( 0.0, 2.0, isShrub ) ).y * 1.4;
	let barkN = vegNoise( vec2f( st.x * 30.0, st.y * 2.5 ) ) * 0.6 + vegNoise( vec2f( st.x * 6.0, st.y * 0.7 ) ) * 0.4;
	let bright = select( vBright / 1.4, barkN * 0.5 + 0.4, isBark );
	r.color = vec4f( bright, select( 1.0, 0.0, isBark ), aMat.z, 1.0 );`:`
	let aMat = in.vs.vMat;
	let part = aMat.x;
	let isBark = part < 0.5 || part > 4.5;
	r.color = vec4f( normalize( in.vs.vLocalN ) * 0.5 + 0.5, select( aMat.y, 0.6, isBark ) );`});return{albedo:t(`albedo`),normal:t(`normal`)}}var ru=`vegImpostorColor`,iu=100,au=[140,320],ou=.5,su=180,cu=128;function lu(e,t,n=new N){let r=(e-t)*.5,i=(e+t)*.5;return n.set(r,1-Math.abs(r)-Math.abs(i),i).normalize()}function uu(e){let t=new N().crossVectors(new N(0,1,0),e);return t.lengthSq()<1e-8&&t.set(1,0,0),t.normalize(),{right:t,up:new N().crossVectors(e,t).normalize()}}var du=`
fn vegOctDecode( u: f32, v: f32 ) -> vec3f {
	let x = ( u - v ) * 0.5; let z = ( u + v ) * 0.5;
	return normalize( vec3f( x, 1.0 - abs( x ) - abs( z ), z ) );
}
fn vegOctEncode( d: vec3f ) -> vec2f {
	let p = d / ( abs( d.x ) + abs( d.y ) + abs( d.z ) );
	return vec2f( p.x + p.z, p.z - p.x );
}
`,fu=class{constructor(e,t){this.groups=e,this.bakeMaterials=t;let n=0;for(let t of e)t.variantBase=n,n+=t.variants.length;this.variantCount=n;let r=n*6*cu,i=e=>{let t=new H({label:e,width:r,height:768,format:`rgba8unorm`,mips:!0,usage:[`sample`,`render`,`copyDst`,`copySrc`],sampler:`linearClamp`});return{texture:t,dispose:()=>t.destroy()}};this.rtA=i(`vegImpostorA`),this.rtB=i(`vegImpostorB`),this.depth=new H({label:`vegImpostorDepth`,width:r,height:768,format:`depth32float`,usage:[`render`]}),this.width=r,this.height=768,this.baked=!1}_frameMatrices(e,t){let n=[],r=e.radius,i=e.center;for(let a=0;a<6;a++)for(let o=0;o<6;o++){let s=lu(-1+2*o/5,-1+2*a/5),{right:c,up:l}=uu(s),u=((e.variantBase+t)*6+o+.5)*2*r,d=(a+.5)*2*r,f=new F().set(c.x,c.y,c.z,-i.dot(c)+u,l.x,l.y,l.z,-i.dot(l)+d,s.x,s.y,s.z,-i.dot(s),0,0,0,1);n.push(f)}return n}bake(e=null){let t=performance.now(),n=e&&e.render&&e.collect?e:this._mr||=new $r,r=this.depth.view(),i=!0;for(let[e,t]of[[this.rtA,this.bakeMaterials.albedo],[this.rtB,this.bakeMaterials.normal]]){i=!0;let a=e.texture.view({dimension:`2d`,baseMipLevel:0,mipLevelCount:1});this.groups.forEach((e,o)=>{let s=e.radius,c=new hn(0,this.variantCount*6*2*s,12*s,0,.1,6*s+10);c.position.set(0,0,3*s+2),c.lookAt(0,0,-1),c.updateMatrixWorld(),c.updateProjectionMatrix();let l=(this._blocks||=[])[o]||(this._blocks[o]=Lr(`vegImpostorBake`+o));Br(c,this.width,this.height,{block:l});let u=new Mt;e.variants.forEach((n,r)=>{let i=this._frameMatrices(e,r),a=new cn(n,t,i.length);i.forEach((e,t)=>a.setMatrixAt(t,e)),a.frustumCulled=!1,u.add(a)}),u.updateMatrixWorld(!0),n.render(u,{camera:c,frameBlock:l,kind:`color`,label:`veg impostor bake`,colorViews:[a],colorFormats:[`rgba8unorm`],depthView:r,depthFormat:`depth32float`,clearColors:[i?[0,0,0,0]:null],clearDepth:0}),i=!1}),ia(e.texture)}this.baked=!0,this.bakeMs=performance.now()-t}createMaterial({isGroup1:e,variantOf:t,colorOf:n,nearDist:r}){let[i,a]=this.groups,o=this.variantCount*6,s=(e,t)=>`select( ${Q(e)}, ${Q(t)}, g1Flag )`,c=`
	let g1Flag = ${e(`iDat`)};
	let R = ${s(i.radius,a.radius)};
	let Rh = ${s(i.rh,a.rh)};
	let Hv = ${s(i.hv,a.hv)};
	let Cy = ${s(i.center.y,a.center.y)};
	let vBase = ${s(i.variantBase,a.variantBase)};`,l=new Ar({name:`veg-impostor`,side:`double`,modules:[bl,$l],textures:{vegImpA:this.rtA.texture,vegImpB:this.rtB.texture},attributes:{iPos:`vec4f`,iDat:`vec4f`},varyings:{vImp:`vec4f`,vIPos4:`vec4f`,vIDat:`vec4f`},vertex:`
	let iPos = v.iPos;
	let iDat = v.iDat;
${c}
	let base = iPos.xyz;
	let sy = abs( iDat.y );
	// LOD window: from the near plant's hand-over distance to the fade-out, else collapsed
	let d = length( vegParams.camPos - base );
	let vis = select( 0.0, 1.0, d >= ( ${r(`g1Flag`)} ) * ( 1.0 - VEG_LOD_BAND / 2.0 ) && d < select( draw.params.w, ${Q(su)}, g1Flag ) );
	// far away the forest is thinned out: fewer, proportionally larger crowns (grown about
	// the base) keep the canopy closed
	let thin = smoothstep( ${Q(au[0])}, ${Q(au[1])}, d );
	let keep = select( 1.0, 0.0, fract( iDat.w * 91.7 ) < thin * ${Q(ou)} );
	let grow = thin * ${Q(1/Math.sqrt(.5)-1)} + 1.0;
	let s = iPos.w * grow;
	let C = base + vec3f( 0.0, Cy * s * sy, 0.0 );
	// sway of the whole crown (matches the near plants' trunk sway amplitude)
	let w = vegWindStrength();
	let g = vegGustAt( base.xz );
	let ph0 = iDat.w * 6.2832;
	let sway = ( w * w * 0.009 * ( g * 0.8 + 0.3 ) + sin( frame.time * 0.9 + ph0 ) * w * 0.0045 * ( g + 0.4 ) ) * iDat.z * 0.45;
	let swayV = vegWindDir3() * sway;
	let Cs = C + swayV;
	o.vImp = vec4f( swayV, s );
	o.vIPos4 = iPos;
	o.vIDat = iDat;
	let toCam = normalize( frame.cameraPos - Cs );
	let right = normalize( cross( VEG_UP, toCam ) + vec3f( 1e-4, 0.0, 0.0 ) );
	let up = cross( toCam, right );
	// quad fitted to the plant's projected extent: its horizontal radius across, from above
	// the crown disc, from the side the (stretched) height
	let k = s * vis * keep;
	let ty = abs( toCam.y );
	let halfW = Rh * k;
	let halfH = ( Hv * sy * sqrt( max( 1.0 - ty * ty, 0.0 ) ) + Rh * ty ) * k;
	let p = v.position;
	v.useWorld = true;
	v.worldPos = Cs + right * ( p.x * halfW ) + up * ( p.y * halfH );
	// (three: the geometry normal is left as is, +Z of the quad)
	v.worldNormal = v.normal;`,surface:`
	let iPos = in.vs.vIPos4;
	let iDat = in.vs.vIDat;
${c}
	let base = iPos.xyz;
	let si = in.vs.vImp.w;
	let sy = abs( iDat.y );
	let yaw = iDat.x;
	let cyw = cos( yaw ); let syw = sin( yaw );
	let C = base + vec3f( 0.0, Cy * si * sy, 0.0 ) + in.vs.vImp.xyz;
	// world -> plant-local (unstretched, centred): rotate by -yaw, divide by the scale
	let Ow = frame.cameraPos - C;
	let Dw = in.P - frame.cameraPos;
	let scl = vec3f( si, si * sy, si );
	let O = vec3f( Ow.x * cyw - Ow.z * syw, Ow.y, Ow.x * syw + Ow.z * cyw ) / scl;
	let D = vec3f( Dw.x * cyw - Dw.z * syw, Dw.y, Dw.x * syw + Dw.z * cyw ) / scl;
	let vdir = normalize( O );
	let vd = normalize( vec3f( vdir.x, max( vdir.y, 0.02 ), vdir.z ) );
	let gg = ( vegOctEncode( vd ) * 0.5 + 0.5 ) * ${Q(5)};
	let gi = floor( clamp( gg, vec2f( 0.0 ), vec2f( ${Q(4.9990000000000006)} ) ) );
	let fr = gg - gi;
	let upper = fr.x + fr.y > 1.0;
	// triangle of the cell containing g, barycentric weights
	let i0 = select( gi, gi + 1.0, upper );
	let i1 = select( gi + vec2f( 1.0, 0.0 ), gi + vec2f( 0.0, 1.0 ), upper );
	let i2 = select( gi + vec2f( 0.0, 1.0 ), gi + vec2f( 1.0, 0.0 ), upper );
	let w0 = select( 1.0 - fr.x - fr.y, fr.x + fr.y - 1.0, upper );
	let w1 = select( fr.x, 1.0 - fr.x, upper );
	let w2 = select( fr.y, 1.0 - fr.y, upper );
	let variant = vBase + ${t(`iDat.w`,`g1Flag`)};
	var vA = vec4f( 0.0 ); var vB = vec4f( 0.0 );
	// near: blend the three frames around the view direction; far: the dominant frame only
	let blend = length( vegParams.camPos - base ) < ${Q(iu)};
	if ( blend ) {
		let s0 = vegImpSample( i0, O, D, variant, R );
		let s1 = vegImpSample( i1, O, D, variant, R );
		let s2 = vegImpSample( i2, O, D, variant, R );
		vA = s0[ 0 ] * w0 + s1[ 0 ] * w1 + s2[ 0 ] * w2;
		vB = s0[ 1 ] * w0 + s1[ 1 ] * w1 + s2[ 1 ] * w2;
	} else {
		let iMax = select( select( i2, i1, w1 >= w2 ), i0, w0 >= max( w1, w2 ) );
		let sm = vegImpSample( iMax, O, D, variant, R );
		vA = sm[ 0 ];
		vB = sm[ 1 ];
	}
	// cross-fade from the near geometry (incoming level of the band around nearDist)
	let nd = ${r(`g1Flag`)};
	let fade = smoothstep( nd * ( 1.0 - VEG_LOD_BAND / 2.0 ), nd * ( 1.0 + VEG_LOD_BAND / 2.0 ), length( vegParams.camPos - base ) );
	if ( ! ( vA.w > 0.42 && bayer4( in.pixel ) < fade ) ) { discard; }

	let cov = max( vA.w, 1e-3 );
	let bright = vA.x / cov; let leaf = vA.y / cov; let cr = vA.z / cov;
	// exposure (baked crown AO): the inside and underside of the crown in deep shade
	let ex = vB.w / cov;
	let albedo = ${n({seed:`iDat.w`,cr:`cr`,leaf:`leaf`,bright:`bright`,isGroup1:`g1Flag`})} * mix( 0.26, 1.0, ex * ex ) * ( bright * 0.6 + 0.7 );
	s.albedo = albedo;
	// B is written where A has coverage: un-premultiply the filtered edges by A's coverage
	let nl = vB.xyz / max( vA.w, 1e-3 ) * 2.0 - 1.0;
	// local -> world: inverse-transpose of the stretch, then the yaw rotation
	let ns = vec3f( nl.x, nl.y / sy, nl.z );
	let nw = normalize( vec3f( ns.x * cyw + ns.z * syw, ns.y, ns.z * cyw - ns.x * syw ) );
	s.normal = normalize( nw + in.V * 0.12 );
	s.roughness = 0.85;
	s.metalness = 0.0;
	s.specularIntensity = 0.12;
	// backlit crowns glow at the edges (light through the leaves), like the near canopy
	s.translucency = vegTranslucency( albedo, in.N, 0.35, in.P );`});return l.modules.push(new bl.constructor({name:`vegImpostorSample`,deps:[bl],code:du+`
fn vegImpSample( ij: vec2f, O: vec3f, D: vec3f, variant: f32, Rf: f32 ) -> array<vec4f, 2> {
	let d = vegOctDecode( ij.x / ${Q(5)} * 2.0 - 1.0, ij.y / ${Q(5)} * 2.0 - 1.0 );
	let right = normalize( cross( VEG_UP, d ) );
	let up = cross( d, right );
	let t = - dot( O, d ) / dot( D, d );
	let P = O + D * t;
	let a = dot( P, right ) / Rf; let b = dot( P, up ) / Rf;
	let cu = variant * ${Q(6)} + ij.x + ( a * 0.5 + 0.5 );
	let cv = ij.y + ( b * 0.5 + 0.5 );
	let inCell = abs( a ) < 1.0 && abs( b ) < 1.0;
	// render targets are stored top row first: flip v
	let st = vec2f( cu / ${Q(o)}, 1.0 - cv / ${Q(6)} );
	let k = select( 0.0, 1.0, inCell );
	return array<vec4f, 2>( textureSample( vegImpA, smpLinearClamp, st ) * k, textureSample( vegImpB, smpLinearClamp, st ) * k );
}
`})),l}};function pu(){let e=new tn;return e.setAttribute(`position`,new Ht([-1,-1,0,1,-1,0,1,1,0,-1,1,0],3)),e.setAttribute(`normal`,new Ht([0,0,1,0,0,1,0,0,1,0,0,1],3)),e.setIndex([0,1,2,0,2,3]),e.boundingSphere=new Pe(new N,1e7),e}var mu=[{grid:4,leaves:6,width:.34},{grid:4,leaves:8,width:.2},{grid:3,leaves:6,width:.45},{grid:3,leaves:8,width:.22}],hu=1024,gu=`
struct VegRosette { d: f32, bright: f32, cell: f32 };
fn vegRosette( st: vec2f, G: f32, nLeaves: f32, width: f32, rot: f32 ) -> VegRosette {
	let cuv = st * G;
	let cell = floor( cuv );
	let h1 = vegHash12( cell + rot * 17.3 );
	let h2 = vegHash12( cell * 1.7 + rot * 31.1 + 5.2 );
	let h3 = vegHash12( cell * 2.3 + rot * 7.7 + 1.9 );
	// whorls of different sizes, off the cell centres; some cells stay empty (sky holes)
	let sc = mix( 0.62, 1.05, h2 ) * select( 1.0, 0.001, h3 < 0.2 );
	let off = vec2f( h1 - 0.5, h3 - 0.5 ) * 0.34;
	let p = ( fract( cuv ) - 0.5 - off ) * 2.0 / sc;
	let r = length( p );
	let ang = atan2( p.y, p.x ) + rot + h1 * 6.2832;
	let sector = ang * ( nLeaves / 6.2832 );
	let k = floor( sector + 0.5 );
	// irregular leaf spacing and lengths so clusters don't read as flowers
	let lr = vegHash12( vec2f( k, h1 * 13.7 ) );
	let jit = ( lr - 0.5 ) * 0.8;
	let L = mix( 0.5, 1.0, fract( lr * 7.13 ) );
	// each blade curves a little to one side (leaves, not a star)
	let curve = ( fract( lr * 3.31 ) - 0.5 ) * 0.9;
	let da = ( sector - k - jit ) * ( 6.2832 / nLeaves ) - curve * ( r / L ) * ( r / L ) * 0.35;
	let along = r * cos( da );
	let across = abs( r * sin( da ) );
	let x = along / L;
	let bx = clamp( ( x - 0.18 ) / 0.82, 0.0, 1.0 ); // blade after a short petiole
	// obovate (widest beyond the middle) with a short pointed tip
	let shape = pow( max( sin( pow( bx, 0.62 ) * 3.14159 ), 0.0 ), 0.8 ) * ( smoothstep( 1.0, 0.86, bx ) * 0.25 + 0.75 );
	let hw = shape * width * L;
	let inBlade = x > 0.16 && x < 1.0;
	let dBlade = select( -1.0, hw - across, inBlade );
	let dPet = select( -1.0, 0.012 - across, x < 0.2 );
	var o: VegRosette;
	o.d = max( dBlade, dPet );
	let vein = smoothstep( 0.03, 0.0, across ) * smoothstep( 0.05, 0.25, bx ) * smoothstep( 1.0, 0.7, bx );
	o.bright = ( ( h1 * 0.7 + lr * 0.3 ) * 0.22 + 0.88 ) * mix( 0.82, 1.08, bx ) * ( vein * 0.09 + 1.0 );
	o.cell = h1 * 0.7 + lr * 0.3;
	return o;
}
`,_u=class{constructor(){this.texture=new H({label:`vegLeafClusters`,width:hu,height:hu,format:`rgba8unorm`,mips:!0,usage:[`sample`,`render`,`copyDst`,`copySrc`],sampler:`anisoRepeat`}),this.rt={dispose:()=>this.texture.destroy()},this.baked=!1;let e=this;this.module=new R({name:`vegLeafAtlas`,deps:[bl],bindings:{vegLeafTex:{texture:()=>e.texture}},code:`
// sample tile ( 0..3 ) at card uv st -> ( coverage, bright, cell, 1 )
fn vegLeafSample( st: vec2f, tile: f32 ) -> vec4f {
	let tuv = ( vec2f( fract( tile * 0.5 ) * 2.0, floor( tile * 0.5 ) ) + clamp( st, vec2f( 0.004 ), vec2f( 0.996 ) ) ) * 0.5;
	return textureSample( vegLeafTex, smpAnisoRepeat, vec2f( tuv.x, 1.0 - tuv.y ) );
}
`})}bake(){let e=``;for(let t=0;t<4;t++){let n=mu[t];e+=`\tif ( tid == ${t}.0 ) {\n`;for(let t=0;t<4;t++){let r=(t%2-.5)*vu*.5,i=(Math.floor(t/2)-.5)*vu*.5;e+=`\t\t{
			let q = local + vec2f( ${Q(r)}, ${Q(i)} );
			let A = vegRosette( q, ${Q(n.grid)}, ${Q(n.leaves)}, ${Q(n.width)}, 0.0 );
			let B = vegRosette( q + ${Q(.5/n.grid)}, ${Q(n.grid)}, ${Q(n.leaves)}, ${Q(n.width)}, 2.1 );
			let inA = A.d > 0.0; let inB = B.d > 0.0;
			if ( inA || inB ) {
				cov += 0.25;
				bright += select( B.bright, A.bright, inA ) * 0.25;
				cellR += select( B.cell, A.cell, inA ) * 0.25;
			}
		}\n`}e+=`	}
`}new W({label:`veg leaf atlas bake`,modules:[bl],colorFormats:[`rgba8unorm`],code:gu+`
fn fragment( in: FSIn ) -> vec4f {
	// three's quad uv: v up
	let st = vec2f( in.uv.x, 1.0 - in.uv.y );
	let tile = floor( st * 2.0 );
	let tid = tile.x + tile.y * 2.0;
	let local = fract( st * 2.0 );
	var cov = 0.0; var bright = 0.0; var cellR = 0.0;
${e}
	// colour channels are stored un-premultiplied (valid where covered)
	let inv = 1.0 / max( cov, 1e-3 );
	return vec4f( cov, bright * inv / 1.4, cellR * inv, 1.0 );
}
`}).render({colorViews:[this.texture],clear:[0,0,0,0]}),ia(this.texture),this.baked=!0}},vu=1/(hu/2),yu=(e,t)=>`vegVariantOf( ${e}, ${t} )`;function bu(e){if(!e)return{};let t=typeof e.getFootprints==`function`?e.getFootprints():[],n=[];for(let t of[e.path,...e.sidePaths||[]]){if(!t||!t.samples)continue;let e=[];for(let n=0;n<t.samples.length;n+=5)e.push([t.samples[n].p.x,t.samples[n].p.z]);let r=t.samples[t.samples.length-1];e.push([r.p.x,r.p.z]),n.push({points:e,width:t.width??1.8})}return{footprints:t,paths:n.length?n:null}}function xu(e){let t=e.attributes.position,n=new N,r=1/0,i=-1/0;for(let e=0;e<t.count;e++)n.fromBufferAttribute(t,e),r=Math.min(r,n.y),i=Math.max(i,n.y);let a=new N(0,(r+i)*.5,0),o=0,s=0;for(let e=0;e<t.count;e++)n.fromBufferAttribute(t,e),o=Math.max(o,n.distanceTo(a)),s=Math.max(s,Math.hypot(n.x,n.z));return{center:a,radius:o*1.02,rh:s*1.03,hv:(i-r)*.5*1.03}}var Su=120,Cu=65,wu=45,Tu=[120,140],Eu=[85,105],Du=[100,120],Ou=[2600,2800],ku=class{constructor({scene:e,terrain:t,village:n=null,records:r=null,grassMask:i=null}){this.scene=e,this.terrain=t,this.group=new jt,this.group.name=`Vegetation`,this.group.matrixAutoUpdate=!1;let a=performance.now(),o=new $s(t,bu(n));this.site=o;let s=r||ac(o);this.records=s;let c=performance.now(),l=i||oc(o);this.timings={scatter:c-a,mask:performance.now()-c};let u=Xl();this.leafAtlas=new _u;let d=tu(this.leafAtlas);Ql.value.set(Cu,wu);let f=Mc(),p=Nc(),m=el(),h=pl(),g=fl(),_=tl(),v=Qc(),y=Jc().geometry,b=Yc().geometry,x=[],S=[];for(let e=0;e<3;e++)x.push(Zc(y,Xc,e*8));for(let e=0;e<2;e++)S.push(Zc(b,Xc,(3+e)*8));this.atlas=new fu([{variants:x,...xu(y)},{variants:S,...xu(b)}],nu(this.leafAtlas));let C=this.atlas.createMaterial({isGroup1:e=>`${e}.y < 0.0`,variantOf:(e,t)=>yu(e,t),colorOf:({seed:e,cr:t,leaf:n,bright:r,isGroup1:i})=>`${ru}( ${e}, ${t}, ${n}, ${r}, ${i} )`,nearDist:e=>`select( vegParams.canopyNear.x, vegParams.canopyNear.y, ${e} )`});this.materials=[u,d,C],this.types=[];let w=e=>{this.types.push(e);for(let t of e.meshes)this.group.add(t);return e};this.palms=w(new hc(`palms`,s.palms,{nearRange:Su,margin:10,refreshDistance:6,farExcludeNear:!0,sortNear:!0,near:[{geometry:f.geometry,material:u,castShadow:!0,name:`veg-palm`}],far:{parts:[{geometry:p.geometry,material:u,name:`veg-palm-far`}],fade:Ou}}));let T=[...s.youngPalms.map(e=>({...e,seed:$c.YOUNG+e.seed*.999,qr:Tu[1]+10})),...s.ferns.map(e=>({...e,seed:$c.FERN+e.seed*.999,qr:yl[1]+8}))],E=s.bananas.map(e=>({...e,H:.02,seed:(e.seed<.5?$c.BANANA:$c.BANANA_B)+e.seed*.999,qr:Du[1]+10}));this.bananas=w(new hc(`bananas`,E,{fade:Du,margin:10,sortNear:!0,near:[{geometry:_.geometry,material:u,castShadow:!0,name:`veg-banana`}]})),this.understory=w(new hc(`understory`,T,{fade:Tu,margin:10,sortNear:!0,near:[{geometry:m.geometry,material:u,castShadow:!1,name:`veg-understory`}]}));let D=s.monsteras.map(e=>({...e,seed:dl.MONSTERA+e.seed*.999,qr:Eu[1]+10}));this.monsteras=w(new hc(`monsteras`,D,{fade:Eu,margin:10,sortNear:!0,near:[{geometry:g.geometry,material:u,castShadow:!0,name:`veg-monstera`}]}));let O=[...s.elephantEars.map(e=>({...e,seed:dl.ELEPHANT+e.seed*.999,qr:Eu[1]+10})),...s.heliconias.map(e=>({...e,seed:dl.HELICONIA+e.seed*.999,qr:Eu[1]+10})),...s.strelitzias.map(e=>({...e,seed:dl.STRELITZIA+e.seed*.999,qr:Eu[1]+10}))];this.broadleaf=w(new hc(`broadleaf`,O,{fade:Eu,margin:10,sortNear:!0,near:[{geometry:h.geometry,material:u,castShadow:!0,name:`veg-broadleaf`}]}));let k=[...s.trees.map(e=>({...e,qr:75})),...s.shrubs.map(e=>({...e,qr:55}))];this.canopy=w(new hc(`canopy`,k,{nearRange:Cu,margin:10,sortNear:!0,sortFar:!0,farRefresh:16,near:[{geometry:v.geometry,material:d,castShadow:!0,name:`veg-canopy`}],far:{parts:[{geometry:pu(),material:C,name:`veg-canopy-far`}],fade:Ou}}));for(let e of[this.palms,this.understory,this.bananas,this.monsteras,this.broadleaf,this.canopy])for(let t of e.meshes)t.renderOrder=1;for(let e of this.canopy.far.meshes)e.renderOrder=2;this.renderer=!0,this.grass=new zl({terrain:t,mask:l});for(let e of this.grass.meshes)this.group.add(e);this.geometryTriangles={palmNear:f.triangles,palmFar:p.triangles,understory:m.triangles,understoryPerKind:m.perKind,broadleaf:h.triangles,broadleafPerKind:h.perKind,monstera:g.triangles,bananas:_.triangles,canopy:v.triangles,tree:v.treeTriangles,shrub:v.shrubTriangles,impostor:2,grassNearPatch:this.grass.patchTris[0],grassMidPatch:this.grass.patchTris[1],grassFarPatch:this.grass.patchTris[2]},this.group.updateMatrixWorld(!0),e.add(this.group),this._camPos=new N,this.timings.total=performance.now()-a}setQualityLevel(e){this.group.visible=e>0;for(let t of this.types)t.inst.qualityLevel=e,t.inst.qualityLimit=Math.ceil(t.inst.count*e),t.lastX=t.farX=1/0,t.near&&t.near.fill(t.inst,null,0),t.far&&t.far.fill(t.inst);this.grass.setQualityLevel(e)}update(e,t){if(this.renderer&&!this.atlas.baked){let e=performance.now();this.leafAtlas.bake(this.renderer),this.atlas.bake(this.renderer),this.timings.bake=performance.now()-e}t.updateMatrixWorld();let n=t.getWorldPosition(this._camPos);gl.value.copy(n);let r=V.windDir.value,i=.7*V.windSpeed.value+1.5;_l.value.x+=r.x*i*e,_l.value.y+=r.y*i*e;let a=null,o=null,s=0,c=0;for(let e of this.types){let t=e.overdue(n);t>e.margin-e.refreshDistance?e.update(n,!0):t>s?(o=a,c=s,a=e,s=t):t>c&&(o=e,c=t)}a&&a.update(n,!0),o&&o.update(n,!0),this.grass.update(t)}refreshTerrain(){this.grass.heightTex.needsUpdate=!0}stats(){let e={},t=0,n=0;for(let r of this.types){let i={};for(let[e,a]of[[`near`,r.near],[`far`,r.far]])a&&(i[e]={instances:a.count,triangles:a.triangles,meshes:a.meshes.length},t+=a.triangles,a.count>0&&(n+=a.meshes.length));e[r.name]={total:r.inst.count,...i}}let r=this.grass;return e.grass={nearCells:r.levels[0].count,midCells:r.levels[1].count,farCells:r.levels[2].count,triangles:r.triangles},t+=r.triangles,n+=r.levels.filter(e=>e.count>0).length,{types:e,triangles:t,drawCalls:n,villagePalms:this.records.villagePalms,rules:X}}dispose(){this.scene.remove(this.group);for(let e of this.types)for(let t of e.meshes)t.geometry.dispose();for(let e of this.materials)e.dispose();this.atlas.rtA.dispose(),this.leafAtlas.rt.dispose(),this.atlas.rtB.dispose(),this.atlas.depth.destroy(),this.grass.dispose()}},Au=e=>new Ee(e).convertSRGBToLinear(),ju=e=>e.reduce((t,n,r)=>{let i=e[(r+1)%e.length];return t+n[0]*i[1]-i[0]*n[1]},0)/2;function Mu(e){let n=e.filter(e=>e.length>=3).map(i).sort((e,t)=>Math.abs(ju(t))-Math.abs(ju(e))),r=[],a=[];for(let e of n){let n=a.filter(n=>t(e[0],n.r)).at(-1),i=n?n.depth+1:0;if(i%2){let t=n.depth%2?n.outer:n;t.poly.holes.push(e),a.push({r:e,depth:i,outer:t})}else{let t={outer:e,holes:[]},n={r:e,depth:i,poly:t};a.push(n),r.push(t)}}return r}function Nu(r,a){let{toLocal:o}=e(a),s=new Map(a.features.map(e=>[e.id,e])),c=new Map,l=[],u={surfaceVertices:0,sourceHatches:0},d=new Map;function f(e){if(!c.has(e)){let t=new jt;t.name=e,r.add(t),c.set(e,t)}return c.get(e)}function p(e,t,n,r,i=!1){let a=new rn(e,t);return a.name=r,a.receiveShadow=!0,a.castShadow=i,a.shadowStatic=i,a.staticVelocity=!0,f(n).add(a),a}let m=e=>e.polygons.map(e=>({outer:e.outer.map(o),holes:e.holes.map(e=>e.map(o))})),h={heightAt:()=>0},g=s.get(`PROPERTY`),_=a.features.filter(e=>[`LAKE`,`SOC02A`,`SOC02N`].includes(e.id)).flatMap(m);p(Is(m(g).map(e=>({...e,holes:[...e.holes,..._.filter(n=>t(n.outer[0],e.outer)).map(e=>e.outer)]})),()=>0,{spacing:1/0}),Ka({name:`COTENDO ground`,color:Au(14016446),roughness:1}),`Common and landscape areas`,`Property ground`),p(Is(_,()=>-1.2,{spacing:1/0}),Ka({name:`Illustrative cyan water bed`,color:Au(5019814),roughness:.9}),`Water and pools`,`Illustrative lake and pool beds`);let v=new Map;for(let[e,t]of a.hatches.entries()){if(!t.visible)continue;let n=s.get(t.featureId);if(!n)throw Error(`Unmapped source hatch `+t.handle);let r=n.category,i=n.layer,a=.015;if(r===`Residential parcels`&&(a=.035),r===`Commercial parcels`&&(a=.04),r===`Roads`&&(a=.05),i.includes(`ANDEN`)&&(a=.075),i.includes(`CUNETA`)&&(a=.08),(i.includes(`CALZADA`)||i===`COT_COL_COM_VIAS`)&&(a=.09),r===`Parking and loading`&&(a=.105),r===`Facilities and details`&&(a=.13),n.basis===`drawn symbol`&&(a=.15),i.includes(`CEBRAS`)&&(a=.115),a+=e*1e-6,[`LAKE`,`SOC02A`,`SOC02N`].includes(n.id))continue;let c=r+`:`+t.color+`:`+Math.floor(a*1e3),l=Mu(t.rings.map(e=>e.map(o)));if(l.length){v.has(c)||v.set(c,{cat:r,color:t.color,polygons:[],y:a,road:r===`Roads`});for(let e of l)v.get(c).polygons.push({...e,level:a});u.sourceHatches++}}for(let e of v.values()){let t=Is(e.polygons,(e,t,n)=>n.level,{spacing:1/0}),n=e.color+`:`+e.road;if(!d.has(n)){let t=Ka({name:`DWG surface `+e.color,color:Au(e.color),roughness:.96});e.road&&(t.surface+=`
let paving=step(.94,fract(in.P.x*4.5))*0.045+step(.94,fract(in.P.z*2.8))*0.045; s.albedo*=1.0-paving;`),d.set(n,t)}p(t,d.get(n),e.cat,`Measured design surfaces`),u.surfaceVertices+=t.attributes.position.count}let y=new Map;for(let e of a.features){if(e.reference)continue;let t=e.id===`PROPERTY`?`Property`:e.category;y.has(t)||y.set(t,[]);for(let n of e.rings){let e=n.vertices.map(o);n.closed&&e.push(e[0]),y.get(t).push(e)}}for(let[e,t]of y){let n=new Set,r=[];for(let e of t)for(let t=1;t<e.length;t++){let i=e[t-1],a=e[t],o=[i.map(Math.fround).join(`,`),a.map(Math.fround).join(`,`)].sort().join(`|`);n.has(o)||(n.add(o),r.push([i,a]))}p(Rs(r,h,{width:e===`Property`?.48:[`Residential parcels`,`Commercial parcels`].includes(e)?.24:.055,lift:e===`Property`?.19:.17}),Ka({name:`Design boundary `+e,color:Au(e===`Property`?2972480:7439460),roughness:1}),e,`Measured boundary centerlines`)}let b=Ka({name:`Warm plaster`,color:Au(14868171),roughness:.85}),x=Ka({name:`Light roof`,color:Au(13159098),roughness:.9}),S=Ka({name:`Illustrative shaded glazing`,color:Au(4549488),roughness:.2,metalness:.25}),C=[15132895,12108476,7375753,14407107].map((e,t)=>Ka({name:`Vehicle finish `+t,color:Au(e),roughness:.35,metalness:.2}));function w(e,t,n=b,r=.14){let i=[],a=[];for(let n of m(e))for(let e of[n.outer,...n.holes])for(let n=0;n<e.length;n++){let o=e[n],s=e[(n+1)%e.length],c=i.length/3;i.push(o[0],r,o[1],s[0],r,s[1],s[0],t,s[1],o[0],t,o[1]),a.push(c,c+1,c+2,c,c+2,c+3)}let o=n;o.side=`double`,p(Fs(i,a),o,e.category,e.name+` · illustrative walls`,!0)}function T(e,t,n=x){return p(Is(m(e),()=>t,{spacing:1/0}),n,e.category,e.name+` · illustrative roof`,!0)}function E(e,t){let n=[],r=[];for(let i of m(e))for(let e=0;e<i.outer.length;e++){let a=i.outer[e],o=i.outer[(e+1)%i.outer.length],s=Math.hypot(o[0]-a[0],o[1]-a[1]);if(s<2)continue;let c=Math.min(.12,.4/s),l=[a[0]+(o[0]-a[0])*c,a[1]+(o[1]-a[1])*c],u=[o[0]+(a[0]-o[0])*c,o[1]+(a[1]-o[1])*c],d=o[0]-a[0],f=[-(o[1]-a[1])/s*.006,d/s*.006],p=n.length/3;n.push(l[0]+f[0],.85,l[1]+f[1],u[0]+f[0],.85,u[1]+f[1],u[0]+f[0],t-.65,u[1]+f[1],l[0]+f[0],t-.65,l[1]+f[1]),r.push(p,p+1,p+2,p,p+2,p+3)}S.side=`double`,n.length&&p(Fs(n,r),S,e.category,e.name+` · illustrative glazing`)}for(let e of a.features){if(e.reference)continue;let t=n(e);if(t&&e.id!==`SOC04`)w(e,t),T(e,t),E(e,t),l.push({feature:e,height:t});else if(e.id===`SOC04`){T(e,3);let t=a.features.filter(e=>e.layer===`COT_P3_SALON`&&e.measurements.areaM2>.04&&e.measurements.areaM2<.12);for(let e of t)w(e,3),T(e,3);l.push({feature:e,height:3})}else if(e.id.startsWith(`CAR-`)){let t=C[e.id.slice(4)%4];w(e,1.15,t,.18),T(e,1.15,t);let n={...e,polygons:e.rings.slice(1,3).map(e=>({outer:i(e.vertices),holes:[]}))};w(n,1.55,S,1.15),T(n,1.55,S),l.push({feature:e,height:1.55})}}let D=a.features.find(e=>e.layer===`COT_P3_PORTERIA`);D&&(w(D,3),T(D,3),E(D,3),l.push({feature:D,height:3}));let O=new jt;O.name=`Source reference geometry`,r.add(O);let k=[],A=Ka({name:`Reference lines`,color:Au(10852017),roughness:1});for(let e of a.features.filter(e=>e.reference)){let t=new rn(Rs(e.rings.map(e=>{let t=e.vertices.map(o);return e.closed?[...t,t[0]]:t}),h,{width:.13,lift:.27}),A);t.visible=!1,O.add(t),k.push({feature:e,mesh:t})}let j=new jt;j.name=`Selected measured boundary`,r.add(j);let M=Ka({name:`Selected boundary`,color:Au(15113027),emissive:Au(12154657),emissiveIntensity:.2,roughness:.8});function ee(e){for(let e of[...j.children])j.remove(e),e.geometry?.dispose?.();if(!e)return;let t=e.rings.map(e=>{let t=e.vertices.map(o);return e.closed?[...t,t[0]]:t}),r=n(e),i=new rn(Rs(t,{heightAt:()=>r},{width:.28,lift:.24}),M);j.add(i)}let te=a.features.filter(e=>e.id.startsWith(`TREE-`)),N={size:768,res:65,texel:12,origin:-384,heights:new Float32Array(4225),heightAt:()=>0,normalAt:(e,t,n)=>n.set(0,1,0)},P=Object.fromEntries([`palms`,`trees`,`shrubs`,`youngPalms`,`ferns`,`bananas`,`monsteras`,`elephantEars`,`heliconias`,`strelitzias`].map(e=>[e,[]]));for(let[e,t]of te.entries()){let[n,r]=o(t.center),i=e*2.399963;P.trees.push({x:n,y:.04,z:r,H:6,s:.3,sy:1,yaw:i,la:i,l:1,seed:e*.618034%1,qr:300})}let ne=new ku({scene:r,terrain:N,records:P,grassMask:{data:new Uint8Array(1024),res:16}});return r.add(ne.group),{groups:c,picks:l,stats:u,vegetation:ne,select:ee,localPolys:m,applyLayers(e){for(let[t,n]of c)n.visible=a.features.some(n=>n.category===t&&!n.reference&&e(n));for(let t of k)t.mesh.visible=e(t.feature);ne.group.visible=te.some(e)}}}var Pu=class extends oi{resize(){if(!this.canvas)return;let e=this.container.getBoundingClientRect();if(e.width<=0||e.height<=0)return;let t=e.width,n=e.height;this.canvas.width=Math.floor(t*this.renderScale),this.canvas.height=Math.floor(n*this.renderScale),this.canvas.style.width=t+`px`,this.canvas.style.height=n+`px`,this.camera.aspect=t/n,this.camera.updateProjectionMatrix(),Ir.fields.outputResolution.value.set(this.canvas.width,this.canvas.height);for(let e of this.onResize)e(t,n)}},Fu=class extends bs{_build(){super._build(),this.output=this.output.replaceAll(`frame.seaLevel`,`vHeight`)}},Iu=class{constructor(t,n,r){this.container=t,this.data=n,this.callbacks=r,Object.assign(this,e(n)),this.flight=!1,this.frames=0,this.gpuErrors=[],this.orbit={az:.1,el:.92,distance:700,target:new N}}async init(){this.container.replaceChildren();let e=this.engine=new Pu(this.container);await e.init(),e.renderOptimizations.framePacing=!0,this.camera=e.camera,this.scene=e.scene,this.camera.fov=50,this.camera.near=.12,this.camera.far=5e3,this.camera.updateProjectionMatrix(),e.canvas.setAttribute(`aria-label`,`COTENDO 3D map. Drag to orbit, scroll to zoom. Use Fly for WASD flight.`),I.device.addEventListener(`uncapturederror`,e=>this.gpuErrors.push(e.error.message)),I.device.lost.then(t=>{e.stop(),this.callbacks.status(`The graphics device was lost. Use the 2D plan or reload to restart 3D.`),this.gpuErrors.push(t.message)}),this.resizeObserver=new ResizeObserver(()=>{e.resize(),this.ready&&!this.flight&&this.fitFeature&&this.fit(this.fitFeature,this.fitMargin)}),this.resizeObserver.observe(this.container),V.exposure.value=.55,V.waterEnabled.value=1,V.seaLevel.value=.21,V.cameraWaterHeight.value=-1e3,V.windSpeed.value=3;let t=this.atmosphere=new Gi(e),n=this.sky=new Zi(t),i=this.clouds=new ya(e,t);i.ready&&await i.ready,n.clouds=i,this.shadows=new yi({size:2048,splits:[20,120,700],lightMargin:180,normalBias:[.015,.06,.25],bias:2e-5,cacheStatic:!0,skipUnused:!0}),this.shadows.layerMask=1<<Oi.OPAQUE|1<<Oi.TRANSPARENT,this.environment=new Ea(e,this.scene,n),this.lights=new Ha,dr.set(`directModulation`,new R({name:`CotendoCloudShadows`,deps:[i.shadowModule],code:`fn hookDirectModulation(P:vec3f,N:vec3f)->vec3f{return vec3f(cloudsShadow(P.xz));}`})),dr.set(`bounce`,new R({name:`CotendoGroundBounce`,code:`fn hookBounce(P:vec3f,N:vec3f)->vec3f{return frame.sunColor*vec3f(.025,.030,.016)*max(0.0,.4-N.y*.4)*max(frame.sunDir.y,0.0);}`})),this.callbacks.status(`Building the measured landscape…`),await new Promise(e=>requestAnimationFrame(e)),this.map=Nu(this.scene,this.data),this.map.applyLayers(this.callbacks.visible);let a=new rn(Is([{outer:[[-2500,-2500],[2500,-2500],[2500,2500],[-2500,2500]],holes:this.map.localPolys(this.data.features.find(e=>e.id===`PROPERTY`)).map(e=>e.outer)}],()=>-.06,{spacing:1/0}),Ka({name:`Illustrative neutral exterior`,color:new Ee(13884098).convertSRGBToLinear(),roughness:1}));a.name=`Illustrative exterior context`,a.receiveShadow=!0,this.scene.add(a);let o=this.sr=new ji(e.meshRenderer,this.scene,this.camera);o.background=n.background;let s=this.data.features.filter(e=>[`LAKE`,`SOC02A`,`SOC02N`].includes(e.id)).flatMap(e=>this.map.localPolys(e).map(t=>({...t,id:e.id,level:.21,maxDepth:1.2})));this.fft=new ps(e,{derivativeOnly:!0,mipFactory:I.limits.maxStorageTexturesPerShaderStage<5?e=>new xa(e,`COTENDO water`):null}),this.fft.local.windSpeed=2,this.fft.swell.scale=0,this.fft.updateSpectrumUniforms();let c={module:new R({name:`CotendoIllustrativeWaterBed`,code:`fn terrainHeightAt(p:vec2f)->f32{return -1.2;} fn terrainSunShadowAt(p:vec3f)->f32{return 1.0;} fn terrainNormalRock(p:vec2f)->vec4f{return vec4f(0.0,1.0,0.0,0.0);}`})},l=this.waterSurface=new Ps({waterBodies:s},{surveyed:!1,heightAt:()=>0,waterBodyAt:(e,t)=>s.find(n=>r([e,t],{polygons:[n]}))},c,this.fft),u=this.waterMaterial=new Fu({surface:l,sky:n,sceneCopy:o.opaqueCopy,sceneDepthHalf:o.opaqueDepthHalf.texture});u.clouds=i,u.params.ssr.value=0,this.waterMeshes=[];for(let e of s){let t=new rn(Is([e],()=>e.level,{spacing:1/0,nodeLevel:!0}),u);t.name=`Measured water footprint `+e.id,t.layers.set(Oi.WATER),this.scene.add(t),this.waterMeshes.push({mesh:t,feature:this.data.features.find(t=>t.id===e.id)})}this.applyLayers(this.callbacks.visible);let d={module:new R({name:`CotendoAirQuery`,code:`fn waterQueryCameraState()->vec4f{return vec4f(-30.0,0.0,0.0,0.0);} fn waterQueryHeightAtXZ(xz:vec2f)->f32{return -30.0;}`})},f=this.underwater=new Qa({depthTexture:o.sceneRT.depthTexture,maskTexture:o.waterMaskTexture,query:d,caustics:null});f.enabled.value=0,f.shafts.value=0,f._module=new R({name:`CotendoAirCamera`,uniforms:f.uniforms,uniformName:`underwaterParams`,code:`fn underwaterViewZ(d:f32)->f32{return -underwaterParams.proj.z/max(d,1e-9);} fn underwaterViewRay(uv:vec2f)->vec3f{return vec3f((uv.x*2.0-1.0)/underwaterParams.proj.x,(1.0-uv.y*2.0)/underwaterParams.proj.y,-1.0);} fn underwaterWorldDir(uv:vec2f)->vec3f{return normalize((underwaterParams.camWorld*vec4f(underwaterViewRay(uv),0.0)).xyz);} fn underwaterMedium(uv:vec2f)->f32{return 0.0;}`}),f._compositeModule=new R({name:`CotendoAirComposite`,deps:[f._module],code:`fn underwaterComposite(uv:vec2f,pixel:vec2f)->vec4f{return vec4f(postSceneSample(uv),1.0);}`}),f.renderShafts=null,this.haze=new Ko({depthTexture:o.sceneRT.depthTexture,underwater:f,atmosphere:t,sky:n,clouds:i,csm:this.shadows}),this.haze.density.value=.5;let p=this.post=new No(e,{sceneRenderer:o,camera:this.camera,underwater:f,clouds:i,sunDir:t.sunDir,haze:this.haze});if(p.params.vignette.value=.12,p.params.grain.value=0,p.params.bloom.value=.04,p.motionBlur.shutter.value=0,p.aaMode=`smaa`,p.aoPass.useTemporalFiltering=!1,p.setScale(1),this.input=new zs(e.canvas),this.fly=new Qo(this.camera,e.canvas,this.input),this.installControls(),this.overview(),this.updateOrbit(1),p._build(),p._outW=0,this.callbacks.status(`Compiling the scene’s lighting and water shaders…`),await I.pipelinesReady(),e.meshRenderer.precompiling=!0,this.frame(1/60),e.meshRenderer.precompiling=!1,await I.pipelinesReady(),await I.queue.onSubmittedWorkDone(),this.frame(1/60),await I.pipelinesReady(),await I.queue.onSubmittedWorkDone(),this.gpuErrors.length)throw Error(`Graphics validation failed: `+this.gpuErrors[0]);this.ready=!0,this.resume()}applyLayers(e){this.map?.applyLayers(e);for(let t of this.waterMeshes||[])t.mesh.visible=e(t.feature);this.visible=e}select(e){this.map?.select(e)}overview(){this.setFlight(!1),this.orbit.az=.1,this.orbit.el=this.camera.aspect<.8?1.35:1.1,this.fit(this.data.features.find(e=>e.id===`PROPERTY`),1.12),this.updateOrbit(100)}fit(e,t=1.6){this.fitFeature=e,this.fitMargin=t;let r=e.rings.flatMap(e=>e.vertices.map(this.toLocal)),i=r.map(e=>e[0]),a=r.map(e=>e[1]),o=n(e),s=this.orbit;s.target.set((Math.min(...i)+Math.max(...i))/2,o/2,(Math.min(...a)+Math.max(...a))/2);let c=new N(Math.sin(s.az)*Math.cos(s.el),Math.sin(s.el),Math.cos(s.az)*Math.cos(s.el)),l=new N,u=2,d=2500,f=1/t;for(let e=0;e<30;e++){let e=(u+d)/2;this.camera.position.copy(s.target).addScaledVector(c,e),this.camera.lookAt(s.target),this.camera.updateMatrixWorld();let t=!0;for(let e of r){for(let n of o?[0,o]:[0])if(l.set(e[0],n,e[1]).project(this.camera),Math.abs(l.x)>f||Math.abs(l.y)>f||l.z<0||l.z>1){t=!1;break}if(!t)break}t?d=e:u=e}s.distance=d,this.camera.position.copy(s.target).addScaledVector(c,d),this.camera.lookAt(s.target)}frameFeature(e){this.setFlight(!1),this.fit(e,1.4),this.updateOrbit(100)}updateOrbit(e){let t=this.orbit,n=new N(t.target.x+Math.sin(t.az)*Math.cos(t.el)*t.distance,t.target.y+Math.sin(t.el)*t.distance,t.target.z+Math.cos(t.az)*Math.cos(t.el)*t.distance);!this.ready||matchMedia(`(prefers-reduced-motion: reduce)`).matches?this.camera.position.copy(n):this.camera.position.lerp(n,1-Math.exp(-e*7)),this.camera.lookAt(t.target)}setFlight(e){if(this.input){if(this.flight=e,this.input.enabled=e,this.input.clear(),this.fly.velocity.set(0,0,0),e){let e=this.camera.getWorldDirection(new N);this.fly.setPose(this.camera.position.clone(),Math.atan2(-e.x,-e.z),Math.asin(Math.max(-1,Math.min(1,e.y)))),this.engine.canvas.focus({preventScroll:!0}),matchMedia(`(pointer:coarse)`).matches||this.engine.canvas.requestPointerLock?.()?.catch?.(()=>{})}else{document.pointerLockElement===this.engine.canvas&&document.exitPointerLock();let e=this.camera.getWorldDirection(new N),t=Math.min(400,Math.max(15,(this.camera.position.y-this.orbit.target.y)/Math.max(.05,-e.y)));this.orbit.target.copy(this.camera.position).addScaledVector(e,t),this.orbit.target.y=Math.max(0,this.orbit.target.y);let n=this.camera.position.clone().sub(this.orbit.target);this.orbit.distance=n.length(),this.orbit.az=Math.atan2(n.x,n.z),this.orbit.el=Math.asin(n.y/Math.max(1,this.orbit.distance))}this.callbacks.onFlightChange(e)}}installControls(){let e=this.engine.canvas,t=null,n=!1;e.addEventListener(`pointerdown`,r=>{this.flight||(e.focus({preventScroll:!0}),t={x:r.clientX,y:r.clientY},n=!1,e.setPointerCapture(r.pointerId))}),e.addEventListener(`pointermove`,e=>{if(!t||this.flight)return;let r=e.clientX-t.x,i=e.clientY-t.y;Math.abs(r)+Math.abs(i)>2&&(n=!0),this.orbit.az-=r*.006,this.orbit.el=Math.max(.16,Math.min(1.54,this.orbit.el+i*.004)),t={x:e.clientX,y:e.clientY}}),e.addEventListener(`pointerup`,e=>{!this.flight&&!n&&this.pick(e.clientX,e.clientY),t=null}),e.addEventListener(`pointercancel`,()=>t=null),e.addEventListener(`wheel`,e=>{e.preventDefault(),this.flight||(this.orbit.distance=Math.max(6,Math.min(2500,this.orbit.distance*Math.exp(e.deltaY*.001))))},{passive:!1}),e.addEventListener(`keydown`,e=>{e.code===`KeyF`&&(e.preventDefault(),this.setFlight(!this.flight)),e.code===`Escape`&&this.setFlight(!1),!this.flight&&e.code===`Home`&&this.overview()}),document.addEventListener(`pointerlockchange`,()=>{this.flight&&document.pointerLockElement!==e&&!matchMedia(`(pointer:coarse)`).matches&&this.setFlight(!1)})}pick(e,t){let i=this.engine.canvas.getBoundingClientRect(),a=new N((e-i.left)/i.width*2-1,1-(t-i.top)/i.height*2,.5);this.camera.updateMatrixWorld(),a.unproject(this.camera);let o=a.sub(this.camera.position).normalize();if(o.y>=-.001)return;let s=null;for(let e of this.data.features){if(!this.visible(e)||!e.polygons.length)continue;let t=((n(e)||.17)-this.camera.position.y)/o.y;if(t<=0)continue;let i=this.camera.position.clone().addScaledVector(o,t),a=this.toSource([i.x,i.z]);if(!r(a,e))continue;let c=e.measurements.areaM2||1/0;(!s||t<s.t-.05||Math.abs(t-s.t)<.05&&c<s.area)&&(s={feature:e,t,area:c})}s&&this.callbacks.select(s.feature.id)}frame(e){I.beginFrame(),Ir.fields.frameIndex.value=I.frame,V.time.value+=e,V.dt.value=e,this.flight?(this.fly.update(e),this.camera.position.y=Math.max(1.4,Math.min(1800,this.camera.position.y))):this.updateOrbit(e);let t=Qi(16.2);this.atmosphere.sunDir.value.copy(t),V.sunDir.value.copy(t),V.night.value=0,this.atmosphere.update(e,this.camera.position.y);let n=this.atmosphere;n.sunTransmittance&&(V.sunColor.value.setRGB(...n.sunTransmittance).multiplyScalar(11),V.skyIrradiance.value.setRGB(...n.skyIrradiance),V.horizonColor.value.setRGB(...n.horizon)),this.clouds.update(e,this.camera),this.environment.update(e),this.map.vegetation.update(e,this.camera),this.lights.update(this.camera,e),this.fft.update(e),this.waterSurface.setCamera(this.camera.position.x,this.camera.position.z),this.waterSurface.update(),V.cameraWaterHeight.value=-1e3,V.cameraUnderwater.value=0,Zo(this.camera),this.underwater.updateCamera(this.camera),this.post.flare.setDepthHeight(this.sr.sceneRT.height),this.post.flare.update(this.camera,e,{aboveWater:!0}),this.post.beginFrame(),this.shadows.render(this.scene,this.engine.meshRenderer,this.shadows.update(this.camera,V.sunDir.value)),this.sr.render(),this.post.flare.kernel.dispatch(1),this.post.render(),this.post.endFrame(),I.submit(),this.frames++}pause(){this.engine?.stop(),this.input?.clear()}resume(){this.ready&&this.engine.start(e=>{try{this.frame(e)}catch(e){this.engine.stop(),this.gpuErrors.push(e.message),this.callbacks.status(`The 3D scene stopped. The 2D plan and measurements remain available.`),console.error(e)}})}};export{Iu as CotendoApp};