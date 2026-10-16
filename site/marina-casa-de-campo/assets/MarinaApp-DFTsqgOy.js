var e,t,n,r,i,a,o,s,c,l=1e3,u=1001,d=1002,f=1003,p=1006,m=1008,h=1009,g=1012,_=1014,v=1015,y=1016,b=1017,x=1018,S=1020,C=1023,w=1026,T=1027,E=1028,D=1029,O=1030,k=1031,A=1033,j=2300,M=2301,N=2302,P=2303,F=2400,I=2401,ee=2402,te=`srgb`,L=`srgb-linear`,ne=`linear`,re=`srgb`,ie=7680,ae=2e3;function oe(e){for(let t=e.length-1;t>=0;--t)if(e[t]>=65535)return!0;return!1}function se(e){return ArrayBuffer.isView(e)&&!(e instanceof DataView)}function R(e){return document.createElementNS(`http://www.w3.org/1999/xhtml`,e)}function ce(){let e=R(`canvas`);return e.style.display=`block`,e}var le={};function ue(...e){let t=`THREE.`+e.shift();console.log(t,...e)}function de(e){let t=e[0];if(typeof t==`string`&&t.startsWith(`TSL:`)){let t=e[1];t&&t.isStackTrace?e[0]+=` `+t.getLocation():e[1]=`Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.`}return e}function z(...e){e=de(e);let t=`THREE.`+e.shift();{let n=e[0];n&&n.isStackTrace?console.warn(n.getError(t)):console.warn(t,...e)}}function B(...e){e=de(e);let t=`THREE.`+e.shift();{let n=e[0];n&&n.isStackTrace?console.error(n.getError(t)):console.error(t,...e)}}function fe(...e){let t=e.join(` `);t in le||(le[t]=!0,z(...e))}function pe(e,t,n){return new Promise(function(r,i){function a(){switch(e.clientWaitSync(t,e.SYNC_FLUSH_COMMANDS_BIT,0)){case e.WAIT_FAILED:i();break;case e.TIMEOUT_EXPIRED:setTimeout(a,n);break;default:r()}}setTimeout(a,n)})}var me={0:1,2:6,4:7,3:5,1:0,6:2,7:4,5:3},he=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n!==void 0&&n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let r=n[e];if(r!==void 0){let e=r.indexOf(t);e!==-1&&r.splice(e,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let t=n.slice(0);for(let n=0,r=t.length;n<r;n++)t[n].call(this,e);e.target=null}}},ge=`00.01.02.03.04.05.06.07.08.09.0a.0b.0c.0d.0e.0f.10.11.12.13.14.15.16.17.18.19.1a.1b.1c.1d.1e.1f.20.21.22.23.24.25.26.27.28.29.2a.2b.2c.2d.2e.2f.30.31.32.33.34.35.36.37.38.39.3a.3b.3c.3d.3e.3f.40.41.42.43.44.45.46.47.48.49.4a.4b.4c.4d.4e.4f.50.51.52.53.54.55.56.57.58.59.5a.5b.5c.5d.5e.5f.60.61.62.63.64.65.66.67.68.69.6a.6b.6c.6d.6e.6f.70.71.72.73.74.75.76.77.78.79.7a.7b.7c.7d.7e.7f.80.81.82.83.84.85.86.87.88.89.8a.8b.8c.8d.8e.8f.90.91.92.93.94.95.96.97.98.99.9a.9b.9c.9d.9e.9f.a0.a1.a2.a3.a4.a5.a6.a7.a8.a9.aa.ab.ac.ad.ae.af.b0.b1.b2.b3.b4.b5.b6.b7.b8.b9.ba.bb.bc.bd.be.bf.c0.c1.c2.c3.c4.c5.c6.c7.c8.c9.ca.cb.cc.cd.ce.cf.d0.d1.d2.d3.d4.d5.d6.d7.d8.d9.da.db.dc.dd.de.df.e0.e1.e2.e3.e4.e5.e6.e7.e8.e9.ea.eb.ec.ed.ee.ef.f0.f1.f2.f3.f4.f5.f6.f7.f8.f9.fa.fb.fc.fd.fe.ff`.split(`.`),_e=Math.PI/180,ve=180/Math.PI;function ye(){let e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0,r=Math.random()*4294967295|0;return(ge[e&255]+ge[e>>8&255]+ge[e>>16&255]+ge[e>>24&255]+`-`+ge[t&255]+ge[t>>8&255]+`-`+ge[t>>16&15|64]+ge[t>>24&255]+`-`+ge[n&63|128]+ge[n>>8&255]+`-`+ge[n>>16&255]+ge[n>>24&255]+ge[r&255]+ge[r>>8&255]+ge[r>>16&255]+ge[r>>24&255]).toLowerCase()}function V(e,t,n){return Math.max(t,Math.min(n,e))}function be(e,t){return(e%t+t)%t}function xe(e,t,n){return(1-n)*e+n*t}function Se(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return e/4294967295;case Uint16Array:return e/65535;case Uint8Array:case Uint8ClampedArray:return e/255;case Int32Array:return Math.max(e/2147483647,-1);case Int16Array:return Math.max(e/32767,-1);case Int8Array:return Math.max(e/127,-1);default:throw Error(`THREE.MathUtils: Invalid component type.`)}}function Ce(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return Math.round(e*4294967295);case Uint16Array:return Math.round(e*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(e*255);case Int32Array:return Math.round(e*2147483647);case Int16Array:return Math.round(e*32767);case Int8Array:return Math.round(e*127);default:throw Error(`THREE.MathUtils: Invalid component type.`)}}o=Symbol.iterator;var H=class{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw Error(`THREE.Vector2: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw Error(`THREE.Vector2: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=V(this.x,e.x,t.x),this.y=V(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=V(this.x,e,t),this.y=V(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(V(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(V(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),r=Math.sin(t),i=this.x-e.x,a=this.y-e.y;return this.x=i*n-a*r+e.x,this.y=i*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[o](){yield this.x,yield this.y}};e=H,e.prototype.isVector2=!0;var we=class{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,i,a,o){let s=n[r+0],c=n[r+1],l=n[r+2],u=n[r+3],d=i[a+0],f=i[a+1],p=i[a+2],m=i[a+3];if(u!==m||s!==d||c!==f||l!==p){let e=s*d+c*f+l*p+u*m;e<0&&(d=-d,f=-f,p=-p,m=-m,e=-e);let t=1-o;if(e<.9995){let n=Math.acos(e),r=Math.sin(n);t=Math.sin(t*n)/r,o=Math.sin(o*n)/r,s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o}else{s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o;let e=1/Math.sqrt(s*s+c*c+l*l+u*u);s*=e,c*=e,l*=e,u*=e}}e[t]=s,e[t+1]=c,e[t+2]=l,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,r,i,a){let o=n[r],s=n[r+1],c=n[r+2],l=n[r+3],u=i[a],d=i[a+1],f=i[a+2],p=i[a+3];return e[t]=o*p+l*u+s*f-c*d,e[t+1]=s*p+l*d+c*u-o*f,e[t+2]=c*p+l*f+o*d-s*u,e[t+3]=l*p-o*u-s*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,r=e._y,i=e._z,a=e._order,o=Math.cos,s=Math.sin,c=o(n/2),l=o(r/2),u=o(i/2),d=s(n/2),f=s(r/2),p=s(i/2);switch(a){case`XYZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`YXZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`ZXY`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`ZYX`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`YZX`:this._x=d*l*u+c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u-d*f*p;break;case`XZY`:this._x=d*l*u-c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u+d*f*p;break;default:z(`Quaternion: .setFromEuler() encountered an unknown order: `+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],r=t[4],i=t[8],a=t[1],o=t[5],s=t[9],c=t[2],l=t[6],u=t[10],d=n+o+u;if(d>0){let e=.5/Math.sqrt(d+1);this._w=.25/e,this._x=(l-s)*e,this._y=(i-c)*e,this._z=(a-r)*e}else if(n>o&&n>u){let e=2*Math.sqrt(1+n-o-u);this._w=(l-s)/e,this._x=.25*e,this._y=(r+a)/e,this._z=(i+c)/e}else if(o>u){let e=2*Math.sqrt(1+o-n-u);this._w=(i-c)/e,this._x=(r+a)/e,this._y=.25*e,this._z=(s+l)/e}else{let e=2*Math.sqrt(1+u-n-o);this._w=(a-r)/e,this._x=(i+c)/e,this._y=(s+l)/e,this._z=.25*e}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(V(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x*=e,this._y*=e,this._z*=e,this._w*=e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=t._x,s=t._y,c=t._z,l=t._w;return this._x=n*l+a*o+r*c-i*s,this._y=r*l+a*s+i*o-n*c,this._z=i*l+a*c+n*s-r*o,this._w=a*l-n*o-r*s-i*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,r=-r,i=-i,a=-a,o=-o);let s=1-t;if(o<.9995){let e=Math.acos(o),c=Math.sin(e);s=Math.sin(s*e)/c,t=Math.sin(t*e)/c,this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this._onChangeCallback()}else this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),i=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),i*Math.sin(t),i*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}};s=Symbol.iterator;var U=class{constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw Error(`THREE.Vector3: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw Error(`THREE.Vector3: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Ee.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Ee.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6]*r,this.y=i[1]*t+i[4]*n+i[7]*r,this.z=i[2]*t+i[5]*n+i[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=e.elements,a=1/(i[3]*t+i[7]*n+i[11]*r+i[15]);return this.x=(i[0]*t+i[4]*n+i[8]*r+i[12])*a,this.y=(i[1]*t+i[5]*n+i[9]*r+i[13])*a,this.z=(i[2]*t+i[6]*n+i[10]*r+i[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,r=this.z,i=e.x,a=e.y,o=e.z,s=e.w,c=2*(a*r-o*n),l=2*(o*t-i*r),u=2*(i*n-a*t);return this.x=t+s*c+a*u-o*l,this.y=n+s*l+o*c-i*u,this.z=r+s*u+i*l-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[4]*n+i[8]*r,this.y=i[1]*t+i[5]*n+i[9]*r,this.z=i[2]*t+i[6]*n+i[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=V(this.x,e.x,t.x),this.y=V(this.y,e.y,t.y),this.z=V(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=V(this.x,e,t),this.y=V(this.y,e,t),this.z=V(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(V(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,r=e.y,i=e.z,a=t.x,o=t.y,s=t.z;return this.x=r*s-i*o,this.y=i*a-n*s,this.z=n*o-r*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Te.copy(this).projectOnVector(e),this.sub(Te)}reflect(e){return this.sub(Te.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(V(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[s](){yield this.x,yield this.y,yield this.z}};t=U,t.prototype.isVector3=!0;var Te=new U,Ee=new we,W=class{constructor(e,t,n,r,i,a,o,s,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c)}set(e,t,n,r,i,a,o,s,c){let l=this.elements;return l[0]=e,l[1]=r,l[2]=o,l[3]=t,l[4]=i,l[5]=s,l[6]=n,l[7]=a,l[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[3],s=n[6],c=n[1],l=n[4],u=n[7],d=n[2],f=n[5],p=n[8],m=r[0],h=r[3],g=r[6],_=r[1],v=r[4],y=r[7],b=r[2],x=r[5],S=r[8];return i[0]=a*m+o*_+s*b,i[3]=a*h+o*v+s*x,i[6]=a*g+o*y+s*S,i[1]=c*m+l*_+u*b,i[4]=c*h+l*v+u*x,i[7]=c*g+l*y+u*S,i[2]=d*m+f*_+p*b,i[5]=d*h+f*v+p*x,i[8]=d*g+f*y+p*S,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8];return t*a*l-t*o*c-n*i*l+n*o*s+r*i*c-r*a*s}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=l*a-o*c,d=o*s-l*i,f=c*i-a*s,p=t*u+n*d+r*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let m=1/p;return e[0]=u*m,e[1]=(r*c-l*n)*m,e[2]=(o*n-r*a)*m,e[3]=d*m,e[4]=(l*t-r*s)*m,e[5]=(r*i-o*t)*m,e[6]=f*m,e[7]=(n*s-c*t)*m,e[8]=(a*t-n*i)*m,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,i,a,o){let s=Math.cos(i),c=Math.sin(i);return this.set(n*s,n*c,-n*(s*a+c*o)+a+e,-r*c,r*s,-r*(-c*a+s*o)+o+t,0,0,1),this}scale(e,t){return fe(`Matrix3: .scale() is deprecated. Use .makeScale() instead.`),this.premultiply(De.makeScale(e,t)),this}rotate(e){return fe(`Matrix3: .rotate() is deprecated. Use .makeRotation() instead.`),this.premultiply(De.makeRotation(-e)),this}translate(e,t){return fe(`Matrix3: .translate() is deprecated. Use .makeTranslation() instead.`),this.premultiply(De.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<9;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}};n=W,n.prototype.isMatrix3=!0;var De=new W,Oe=new W().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),ke=new W().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Ae(){let e={enabled:!0,workingColorSpace:L,spaces:{},convert:function(e,t,n){return this.enabled===!1||t===n||!t||!n?e:(this.spaces[t].transfer===`srgb`&&(e.r=je(e.r),e.g=je(e.g),e.b=je(e.b)),this.spaces[t].primaries!==this.spaces[n].primaries&&(e.applyMatrix3(this.spaces[t].toXYZ),e.applyMatrix3(this.spaces[n].fromXYZ)),this.spaces[n].transfer===`srgb`&&(e.r=K(e.r),e.g=K(e.g),e.b=K(e.b)),e)},workingToColorSpace:function(e,t){return this.convert(e,this.workingColorSpace,t)},colorSpaceToWorking:function(e,t){return this.convert(e,t,this.workingColorSpace)},getPrimaries:function(e){return this.spaces[e].primaries},getTransfer:function(e){return e===``?ne:this.spaces[e].transfer},getToneMappingMode:function(e){return this.spaces[e].outputColorSpaceConfig.toneMappingMode||`standard`},getLuminanceCoefficients:function(e,t=this.workingColorSpace){return e.fromArray(this.spaces[t].luminanceCoefficients)},define:function(e){Object.assign(this.spaces,e)},_getMatrix:function(e,t,n){return e.copy(this.spaces[t].toXYZ).multiply(this.spaces[n].fromXYZ)},_getDrawingBufferColorSpace:function(e){return this.spaces[e].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(e=this.workingColorSpace){return this.spaces[e].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(t,n){return fe(`ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace().`),e.workingToColorSpace(t,n)},toWorkingColorSpace:function(t,n){return fe(`ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking().`),e.colorSpaceToWorking(t,n)}},t=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],r=[.3127,.329];return e.define({[L]:{primaries:t,whitePoint:r,transfer:ne,toXYZ:Oe,fromXYZ:ke,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:te},outputColorSpaceConfig:{drawingBufferColorSpace:te}},[te]:{primaries:t,whitePoint:r,transfer:re,toXYZ:Oe,fromXYZ:ke,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:te}}}),e}var G=Ae();function je(e){return e<.04045?e*.0773993808:(e*.9478672986+.0521327014)**2.4}function K(e){return e<.0031308?e*12.92:1.055*e**.41666-.055}var Me,Ne=class{static getDataURL(e,t=`image/png`){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>`u`)return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Me===void 0&&(Me=R(`canvas`)),Me.width=e.width,Me.height=e.height;let t=Me.getContext(`2d`);e instanceof ImageData?t.putImageData(e,0,0):t.drawImage(e,0,0,e.width,e.height),n=Me}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap){let t=R(`canvas`);t.width=e.width,t.height=e.height;let n=t.getContext(`2d`);n.drawImage(e,0,0,e.width,e.height);let r=n.getImageData(0,0,e.width,e.height),i=r.data;for(let e=0;e<i.length;e++)i[e]=je(i[e]/255)*255;return n.putImageData(r,0,0),t}if(e.data){let t=e.data.slice(0);for(let e=0;e<t.length;e++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[e]=Math.floor(je(t[e]/255)*255):t[e]=je(t[e]);return{data:t,width:e.width,height:e.height}}return z(`ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied.`),e}},Pe=0,q=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Pe++}),this.uuid=ye(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<`u`&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<`u`&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t===null?e.set(0,0,0):e.set(t.width,t.height,t.depth||0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:``},r=this.data;if(r!==null){let e;if(Array.isArray(r)){e=[];for(let t=0,n=r.length;t<n;t++)r[t].isDataTexture?e.push(Fe(r[t].image)):e.push(Fe(r[t]))}else e=Fe(r);n.url=e}return t||(e.images[this.uuid]=n),n}};function Fe(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap?Ne.getDataURL(e):e.data?{data:Array.from(e.data),width:e.width,height:e.height,type:e.data.constructor.name}:(z(`Texture: Unable to serialize Texture.`),{})}var J=0,Y=new U,Ie=class e extends he{constructor(t=e.DEFAULT_IMAGE,n=e.DEFAULT_MAPPING,r=u,i=u,a=p,o=m,s=C,c=h,l=e.DEFAULT_ANISOTROPY,d=``){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:J++}),this.uuid=ye(),this.name=``,this.source=new q(t),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=r,this.wrapT=i,this.magFilter=a,this.minFilter=o,this.anisotropy=l,this.format=s,this.internalFormat=null,this.type=c,this.offset=new H(0,0),this.repeat=new H(1,1),this.center=new H(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new W,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=d,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Y).x}get height(){return this.source.getSize(Y).y}get depth(){return this.source.getSize(Y).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){z(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){z(`Texture.setValues(): property '${t}' does not exist.`);continue}r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:`Texture`,generator:`Texture.toJSON`},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:`dispose`})}transformUv(e){if(this.mapping!==300)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case l:e.x-=Math.floor(e.x);break;case u:e.x=e.x<0?0:1;break;case d:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x-=Math.floor(e.x)}if(e.y<0||e.y>1)switch(this.wrapT){case l:e.y-=Math.floor(e.y);break;case u:e.y=e.y<0?0:1;break;case d:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y-=Math.floor(e.y)}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};Ie.DEFAULT_IMAGE=null,Ie.DEFAULT_MAPPING=300,Ie.DEFAULT_ANISOTROPY=1,c=Symbol.iterator;var Le=class{constructor(e=0,t=0,n=0,r=1){this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw Error(`THREE.Vector4: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw Error(`THREE.Vector4: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w===void 0?1:e.w,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*i,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*i,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*i,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*i,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,i,a=.01,o=.1,s=e.elements,c=s[0],l=s[4],u=s[8],d=s[1],f=s[5],p=s[9],m=s[2],h=s[6],g=s[10];if(Math.abs(l-d)<a&&Math.abs(u-m)<a&&Math.abs(p-h)<a){if(Math.abs(l+d)<o&&Math.abs(u+m)<o&&Math.abs(p+h)<o&&Math.abs(c+f+g-3)<o)return this.set(1,0,0,0),this;t=Math.PI;let e=(c+1)/2,s=(f+1)/2,_=(g+1)/2,v=(l+d)/4,y=(u+m)/4,b=(p+h)/4;return e>s&&e>_?e<a?(n=0,r=.707106781,i=.707106781):(n=Math.sqrt(e),r=v/n,i=y/n):s>_?s<a?(n=.707106781,r=0,i=.707106781):(r=Math.sqrt(s),n=v/r,i=b/r):_<a?(n=.707106781,r=.707106781,i=0):(i=Math.sqrt(_),n=y/i,r=b/i),this.set(n,r,i,t),this}let _=Math.sqrt((h-p)*(h-p)+(u-m)*(u-m)+(d-l)*(d-l));return Math.abs(_)<.001&&(_=1),this.x=(h-p)/_,this.y=(u-m)/_,this.z=(d-l)/_,this.w=Math.acos((c+f+g-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=V(this.x,e.x,t.x),this.y=V(this.y,e.y,t.y),this.z=V(this.z,e.z,t.z),this.w=V(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=V(this.x,e,t),this.y=V(this.y,e,t),this.z=V(this.z,e,t),this.w=V(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(V(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[c](){yield this.x,yield this.y,yield this.z,yield this.w}};r=Le,r.prototype.isVector4=!0;var Re=class extends he{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:p,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new Le(0,0,e,t),this.scissorTest=!1,this.viewport=new Le(0,0,e,t),this.textures=[];let r=new Ie({width:e,height:t,depth:n.depth}),i=n.count;for(let e=0;e<i;e++)this.textures[e]=r.clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:p,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let e=0;e<this.textures.length;e++)this.textures[e].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,i=this.textures.length;r<i;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let n=Object.assign({},e.textures[t].image);this.textures[t].source=new q(n)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null){if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture}return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:`dispose`})}},ze=class extends Re{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},Be=class extends Ie{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=f,this.minFilter=f,this.wrapR=u,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}},Ve=class extends Ie{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=f,this.minFilter=f,this.wrapR=u,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}},He=class e{constructor(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h)}set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){let g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=r,g[1]=i,g[5]=a,g[9]=o,g[13]=s,g[2]=c,g[6]=l,g[10]=u,g[14]=d,g[3]=f,g[7]=p,g[11]=m,g[15]=h,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new e().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,r=1/Ue.setFromMatrixColumn(e,0).length(),i=1/Ue.setFromMatrixColumn(e,1).length(),a=1/Ue.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*i,t[5]=n[5]*i,t[6]=n[6]*i,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,r=e.y,i=e.z,a=Math.cos(n),o=Math.sin(n),s=Math.cos(r),c=Math.sin(r),l=Math.cos(i),u=Math.sin(i);if(e.order===`XYZ`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=-s*u,t[8]=c,t[1]=n+r*c,t[5]=e-i*c,t[9]=-o*s,t[2]=i-e*c,t[6]=r+n*c,t[10]=a*s}else if(e.order===`YXZ`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e+i*o,t[4]=r*o-n,t[8]=a*c,t[1]=a*u,t[5]=a*l,t[9]=-o,t[2]=n*o-r,t[6]=i+e*o,t[10]=a*s}else if(e.order===`ZXY`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e-i*o,t[4]=-a*u,t[8]=r+n*o,t[1]=n+r*o,t[5]=a*l,t[9]=i-e*o,t[2]=-a*c,t[6]=o,t[10]=a*s}else if(e.order===`ZYX`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=r*c-n,t[8]=e*c+i,t[1]=s*u,t[5]=i*c+e,t[9]=n*c-r,t[2]=-c,t[6]=o*s,t[10]=a*s}else if(e.order===`YZX`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=i-e*u,t[8]=r*u+n,t[1]=u,t[5]=a*l,t[9]=-o*l,t[2]=-c*l,t[6]=n*u+r,t[10]=e-i*u}else if(e.order===`XZY`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=-u,t[8]=c*l,t[1]=e*u+i,t[5]=a*l,t[9]=n*u-r,t[2]=r*u-n,t[6]=o*l,t[10]=i*u+e}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Ge,e,Ke)}lookAt(e,t,n){let r=this.elements;return Ye.subVectors(e,t),Ye.lengthSq()===0&&(Ye.z=1),Ye.normalize(),qe.crossVectors(n,Ye),qe.lengthSq()===0&&(Math.abs(n.z)===1?Ye.x+=1e-4:Ye.z+=1e-4,Ye.normalize(),qe.crossVectors(n,Ye)),qe.normalize(),Je.crossVectors(Ye,qe),r[0]=qe.x,r[4]=Je.x,r[8]=Ye.x,r[1]=qe.y,r[5]=Je.y,r[9]=Ye.y,r[2]=qe.z,r[6]=Je.z,r[10]=Ye.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[4],s=n[8],c=n[12],l=n[1],u=n[5],d=n[9],f=n[13],p=n[2],m=n[6],h=n[10],g=n[14],_=n[3],v=n[7],y=n[11],b=n[15],x=r[0],S=r[4],C=r[8],w=r[12],T=r[1],E=r[5],D=r[9],O=r[13],k=r[2],A=r[6],j=r[10],M=r[14],N=r[3],P=r[7],F=r[11],I=r[15];return i[0]=a*x+o*T+s*k+c*N,i[4]=a*S+o*E+s*A+c*P,i[8]=a*C+o*D+s*j+c*F,i[12]=a*w+o*O+s*M+c*I,i[1]=l*x+u*T+d*k+f*N,i[5]=l*S+u*E+d*A+f*P,i[9]=l*C+u*D+d*j+f*F,i[13]=l*w+u*O+d*M+f*I,i[2]=p*x+m*T+h*k+g*N,i[6]=p*S+m*E+h*A+g*P,i[10]=p*C+m*D+h*j+g*F,i[14]=p*w+m*O+h*M+g*I,i[3]=_*x+v*T+y*k+b*N,i[7]=_*S+v*E+y*A+b*P,i[11]=_*C+v*D+y*j+b*F,i[15]=_*w+v*O+y*M+b*I,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[12],a=e[1],o=e[5],s=e[9],c=e[13],l=e[2],u=e[6],d=e[10],f=e[14],p=e[3],m=e[7],h=e[11],g=e[15],_=s*f-c*d,v=o*f-c*u,y=o*d-s*u,b=a*f-c*l,x=a*d-s*l,S=a*u-o*l;return t*(m*_-h*v+g*y)-n*(p*_-h*b+g*x)+r*(p*v-m*b+g*S)-i*(p*y-m*x+h*S)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[1],a=e[5],o=e[9],s=e[2],c=e[6],l=e[10];return t*(a*l-o*c)-n*(i*l-o*s)+r*(i*c-a*s)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=e[9],d=e[10],f=e[11],p=e[12],m=e[13],h=e[14],g=e[15],_=t*o-n*a,v=t*s-r*a,y=t*c-i*a,b=n*s-r*o,x=n*c-i*o,S=r*c-i*s,C=l*m-u*p,w=l*h-d*p,T=l*g-f*p,E=u*h-d*m,D=u*g-f*m,O=d*g-f*h,k=_*O-v*D+y*E+b*T-x*w+S*C;if(k===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let A=1/k;return e[0]=(o*O-s*D+c*E)*A,e[1]=(r*D-n*O-i*E)*A,e[2]=(m*S-h*x+g*b)*A,e[3]=(d*x-u*S-f*b)*A,e[4]=(s*T-a*O-c*w)*A,e[5]=(t*O-r*T+i*w)*A,e[6]=(h*y-p*S-g*v)*A,e[7]=(l*S-d*y+f*v)*A,e[8]=(a*D-o*T+c*C)*A,e[9]=(n*T-t*D-i*C)*A,e[10]=(p*x-m*y+g*_)*A,e[11]=(u*y-l*x-f*_)*A,e[12]=(o*w-a*E-s*C)*A,e[13]=(t*E-n*w+r*C)*A,e[14]=(m*v-p*b-h*_)*A,e[15]=(l*b-u*v+d*_)*A,this}scale(e){let t=this.elements,n=e.x,r=e.y,i=e.z;return t[0]*=n,t[4]*=r,t[8]*=i,t[1]*=n,t[5]*=r,t[9]*=i,t[2]*=n,t[6]*=r,t[10]*=i,t[3]*=n,t[7]*=r,t[11]*=i,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),r=Math.sin(t),i=1-n,a=e.x,o=e.y,s=e.z,c=i*a,l=i*o;return this.set(c*a+n,c*o-r*s,c*s+r*o,0,c*o+r*s,l*o+n,l*s-r*a,0,c*s-r*o,l*s+r*a,i*s*s+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,i,a){return this.set(1,n,i,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){let r=this.elements,i=t._x,a=t._y,o=t._z,s=t._w,c=i+i,l=a+a,u=o+o,d=i*c,f=i*l,p=i*u,m=a*l,h=a*u,g=o*u,_=s*c,v=s*l,y=s*u,b=n.x,x=n.y,S=n.z;return r[0]=(1-(m+g))*b,r[1]=(f+y)*b,r[2]=(p-v)*b,r[3]=0,r[4]=(f-y)*x,r[5]=(1-(d+g))*x,r[6]=(h+_)*x,r[7]=0,r[8]=(p+v)*S,r[9]=(h-_)*S,r[10]=(1-(d+m))*S,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){let r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];let i=this.determinantAffine();if(i===0)return n.set(1,1,1),t.identity(),this;let a=Ue.set(r[0],r[1],r[2]).length(),o=Ue.set(r[4],r[5],r[6]).length(),s=Ue.set(r[8],r[9],r[10]).length();i<0&&(a=-a),We.copy(this);let c=1/a,l=1/o,u=1/s;return We.elements[0]*=c,We.elements[1]*=c,We.elements[2]*=c,We.elements[4]*=l,We.elements[5]*=l,We.elements[6]*=l,We.elements[8]*=u,We.elements[9]*=u,We.elements[10]*=u,t.setFromRotationMatrix(We),n.x=a,n.y=o,n.z=s,this}makePerspective(e,t,n,r,i,a,o=ae,s=!1){let c=this.elements,l=2*i/(t-e),u=2*i/(n-r),d=(t+e)/(t-e),f=(n+r)/(n-r),p,m;if(s)p=i/(a-i),m=a*i/(a-i);else if(o===2e3)p=-(a+i)/(a-i),m=-2*a*i/(a-i);else if(o===2001)p=-a/(a-i),m=-a*i/(a-i);else throw Error(`THREE.Matrix4.makePerspective(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,r,i,a,o=ae,s=!1){let c=this.elements,l=2/(t-e),u=2/(n-r),d=-(t+e)/(t-e),f=-(n+r)/(n-r),p,m;if(s)p=1/(a-i),m=a/(a-i);else if(o===2e3)p=-2/(a-i),m=-(a+i)/(a-i);else if(o===2001)p=-1/(a-i),m=-i/(a-i);else throw Error(`THREE.Matrix4.makeOrthographic(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=u,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<16;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}};i=He,i.prototype.isMatrix4=!0;var Ue=new U,We=new He,Ge=new U(0,0,0),Ke=new U(1,1,1),qe=new U,Je=new U,Ye=new U,Xe=new He,Ze=new we,Qe=class e{constructor(t=0,n=0,r=0,i=e.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=n,this._z=r,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let r=e.elements,i=r[0],a=r[4],o=r[8],s=r[1],c=r[5],l=r[9],u=r[2],d=r[6],f=r[10];switch(t){case`XYZ`:this._y=Math.asin(V(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-l,f),this._z=Math.atan2(-a,i)):(this._x=Math.atan2(d,c),this._z=0);break;case`YXZ`:this._x=Math.asin(-V(l,-1,1)),Math.abs(l)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(s,c)):(this._y=Math.atan2(-u,i),this._z=0);break;case`ZXY`:this._x=Math.asin(V(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(s,i));break;case`ZYX`:this._y=Math.asin(-V(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(s,i)):(this._x=0,this._z=Math.atan2(-a,c));break;case`YZX`:this._z=Math.asin(V(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(-l,c),this._y=Math.atan2(-u,i)):(this._x=0,this._y=Math.atan2(o,f));break;case`XZY`:this._z=Math.asin(-V(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,i)):(this._x=Math.atan2(-l,f),this._y=0);break;default:z(`Euler: .setFromRotationMatrix() encountered an unknown order: `+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Xe.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Xe,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Ze.setFromEuler(this),this.setFromQuaternion(Ze,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Qe.DEFAULT_ORDER=`XYZ`;var $e=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return!!(this.mask&(1<<e|0))}},et=0,tt=new U,nt=new we,rt=new He,it=new U,at=new U,ot=new U,st=new we,ct=new U(1,0,0),lt=new U(0,1,0),ut=new U(0,0,1),dt={type:`added`},ft={type:`removed`},pt={type:`childadded`,child:null},mt={type:`childremoved`,child:null},ht=class e extends he{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:et++}),this.uuid=ye(),this.name=``,this.type=`Object3D`,this.parent=null,this.children=[],this.up=e.DEFAULT_UP.clone();let t=new U,n=new Qe,r=new we,i=new U(1,1,1);function a(){r.setFromEuler(n,!1)}function o(){n.setFromQuaternion(r,void 0,!1)}n._onChange(a),r._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new He},normalMatrix:{value:new W}}),this.matrix=new He,this.matrixWorld=new He,this.matrixAutoUpdate=e.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new $e,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return nt.setFromAxisAngle(e,t),this.quaternion.multiply(nt),this}rotateOnWorldAxis(e,t){return nt.setFromAxisAngle(e,t),this.quaternion.premultiply(nt),this}rotateX(e){return this.rotateOnAxis(ct,e)}rotateY(e){return this.rotateOnAxis(lt,e)}rotateZ(e){return this.rotateOnAxis(ut,e)}translateOnAxis(e,t){return tt.copy(e).applyQuaternion(this.quaternion),this.position.add(tt.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(ct,e)}translateY(e){return this.translateOnAxis(lt,e)}translateZ(e){return this.translateOnAxis(ut,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(rt.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?it.copy(e):it.set(e,t,n);let r=this.parent;this.updateWorldMatrix(!0,!1),at.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?rt.lookAt(at,it,this.up):rt.lookAt(it,at,this.up),this.quaternion.setFromRotationMatrix(rt),r&&(rt.extractRotation(r.matrixWorld),nt.setFromRotationMatrix(rt),this.quaternion.premultiply(nt.invert()))}add(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return e===this?(B(`Object3D.add: object can't be added as a child of itself.`,e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(dt),pt.child=e,this.dispatchEvent(pt),pt.child=null):B(`Object3D.add: object not an instance of THREE.Object3D.`,e),this)}remove(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.remove(arguments[e]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(ft),mt.child=e,this.dispatchEvent(mt),mt.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),rt.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),rt.multiply(e.parent.matrixWorld)),e.applyMatrix4(rt),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(dt),pt.child=e,this.dispatchEvent(pt),pt.child=null,this}getObjectById(e){return this.getObjectByProperty(`id`,e)}getObjectByName(e){return this.getObjectByProperty(`name`,e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){let r=this.children[n].getObjectByProperty(e,t);if(r!==void 0)return r}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let r=this.children;for(let i=0,a=r.length;i<a;i++)r[i].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(at,e,ot),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(at,st,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,r=e.z,i=this.matrix.elements;i[12]+=t-i[0]*t-i[4]*n-i[8]*r,i[13]+=n-i[1]*t-i[5]*n-i[9]*r,i[14]+=r-i[2]*t-i[6]*n-i[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let e=this.children;for(let t=0,r=e.length;t<r;t++)e[t].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e==`string`,n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:`Object`,generator:`Object3D.toJSON`});let r={};r.uuid=this.uuid,r.type=this.type,r.name=this.name,r.castShadow=this.castShadow,r.receiveShadow=this.receiveShadow,r.visible=this.visible,r.frustumCulled=this.frustumCulled,r.renderOrder=this.renderOrder,r.static=this.static,r.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type=`InstancedMesh`,r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type=`BatchedMesh`,r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(e=>({...e,boundingBox:e.boundingBox?e.boundingBox.toJSON():void 0,boundingSphere:e.boundingSphere?e.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(e=>({...e})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function i(t,n){return t[n.uuid]===void 0&&(t[n.uuid]=n.toJSON(e)),n.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=i(e.geometries,this.geometry);let t=this.geometry.parameters;if(t!==void 0&&t.shapes!==void 0){let n=t.shapes;if(Array.isArray(n))for(let t=0,r=n.length;t<r;t++){let r=n[t];i(e.shapes,r)}else i(e.shapes,n)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(i(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0){if(Array.isArray(this.material)){let t=[];for(let n=0,r=this.material.length;n<r;n++)t.push(i(e.materials,this.material[n]));r.material=t}else r.material=i(e.materials,this.material)}if(this.children.length>0){r.children=[];for(let t=0;t<this.children.length;t++)r.children.push(this.children[t].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let t=0;t<this.animations.length;t++){let n=this.animations[t];r.animations.push(i(e.animations,n))}}if(t){let t=a(e.geometries),r=a(e.materials),i=a(e.textures),o=a(e.images),s=a(e.shapes),c=a(e.skeletons),l=a(e.animations),u=a(e.nodes);t.length>0&&(n.geometries=t),r.length>0&&(n.materials=r),i.length>0&&(n.textures=i),o.length>0&&(n.images=o),s.length>0&&(n.shapes=s),c.length>0&&(n.skeletons=c),l.length>0&&(n.animations=l),u.length>0&&(n.nodes=u)}return n.object=r,n;function a(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot===null?null:e.pivot.clone(),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let t=0;t<e.children.length;t++){let n=e.children[t];this.add(n.clone())}return this}dispose(){this.dispatchEvent({type:`dispose`})}};ht.DEFAULT_UP=new U(0,1,0),ht.DEFAULT_MATRIX_AUTO_UPDATE=!0,ht.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var gt=class extends ht{constructor(){super(),this.isGroup=!0,this.type=`Group`}},_t={type:`move`},vt=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new gt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new gt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new U,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new U),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new gt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new U,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new U,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:`connected`,data:e}),this}disconnect(e){return this.dispatchEvent({type:`disconnected`,data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,i=null,a=null,o=this._targetRay,s=this._grip,c=this._hand;if(e&&t.session.visibilityState!==`visible-blurred`){if(c&&e.hand){a=!0;for(let r of e.hand.values()){let e=t.getJointPose(r,n),i=this._getHandJoint(c,r);e!==null&&(i.matrix.fromArray(e.transform.matrix),i.matrix.decompose(i.position,i.rotation,i.scale),i.matrixWorldNeedsUpdate=!0,i.jointRadius=e.radius),i.visible=e!==null}let r=c.joints[`index-finger-tip`],i=c.joints[`thumb-tip`],o=r.position.distanceTo(i.position);c.inputState.pinching&&o>.025?(c.inputState.pinching=!1,this.dispatchEvent({type:`pinchend`,handedness:e.handedness,target:this})):!c.inputState.pinching&&o<=.015&&(c.inputState.pinching=!0,this.dispatchEvent({type:`pinchstart`,handedness:e.handedness,target:this}))}else s!==null&&e.gripSpace&&(i=t.getPose(e.gripSpace,n),i!==null&&(s.matrix.fromArray(i.transform.matrix),s.matrix.decompose(s.position,s.rotation,s.scale),s.matrixWorldNeedsUpdate=!0,i.linearVelocity?(s.hasLinearVelocity=!0,s.linearVelocity.copy(i.linearVelocity)):s.hasLinearVelocity=!1,i.angularVelocity?(s.hasAngularVelocity=!0,s.angularVelocity.copy(i.angularVelocity)):s.hasAngularVelocity=!1,s.eventsEnabled&&s.dispatchEvent({type:`gripUpdated`,data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&i!==null&&(r=i),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(_t)))}return o!==null&&(o.visible=r!==null),s!==null&&(s.visible=i!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new gt;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},yt={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},bt={h:0,s:0,l:0},xt={h:0,s:0,l:0};function St(e,t,n){return n<0&&(n+=1),n>1&&--n,n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*6*(2/3-n):e}var X=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let t=e;t&&t.isColor?this.copy(t):typeof t==`number`?this.setHex(t):typeof t==`string`&&this.setStyle(t)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=te){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,G.colorSpaceToWorking(this,t),this}setRGB(e,t,n,r=G.workingColorSpace){return this.r=e,this.g=t,this.b=n,G.colorSpaceToWorking(this,r),this}setHSL(e,t,n,r=G.workingColorSpace){if(e=be(e,1),t=V(t,0,1),n=V(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,i=2*n-r;this.r=St(i,r,e+1/3),this.g=St(i,r,e),this.b=St(i,r,e-1/3)}return G.colorSpaceToWorking(this,r),this}setStyle(e,t=te){function n(t){t!==void 0&&parseFloat(t)<1&&z(`Color: Alpha component of `+e+` will be ignored.`)}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let i,a=r[1],o=r[2];switch(a){case`rgb`:case`rgba`:if(i=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(255,parseInt(i[1],10))/255,Math.min(255,parseInt(i[2],10))/255,Math.min(255,parseInt(i[3],10))/255,t);if(i=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(100,parseInt(i[1],10))/100,Math.min(100,parseInt(i[2],10))/100,Math.min(100,parseInt(i[3],10))/100,t);break;case`hsl`:case`hsla`:if(i=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setHSL(parseFloat(i[1])/360,parseFloat(i[2])/100,parseFloat(i[3])/100,t);break;default:z(`Color: Unknown color model `+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let n=r[1],i=n.length;if(i===3)return this.setRGB(parseInt(n.charAt(0),16)/15,parseInt(n.charAt(1),16)/15,parseInt(n.charAt(2),16)/15,t);if(i===6)return this.setHex(parseInt(n,16),t);z(`Color: Invalid hex color `+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=te){let n=yt[e.toLowerCase()];return n===void 0?z(`Color: Unknown color `+e):this.setHex(n,t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=je(e.r),this.g=je(e.g),this.b=je(e.b),this}copyLinearToSRGB(e){return this.r=K(e.r),this.g=K(e.g),this.b=K(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=te){return G.workingToColorSpace(Ct.copy(this),e),Math.round(V(Ct.r*255,0,255))*65536+Math.round(V(Ct.g*255,0,255))*256+Math.round(V(Ct.b*255,0,255))}getHexString(e=te){return(`000000`+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=G.workingColorSpace){G.workingToColorSpace(Ct.copy(this),t);let n=Ct.r,r=Ct.g,i=Ct.b,a=Math.max(n,r,i),o=Math.min(n,r,i),s,c,l=(o+a)/2;if(o===a)s=0,c=0;else{let e=a-o;switch(c=l<=.5?e/(a+o):e/(2-a-o),a){case n:s=(r-i)/e+(r<i?6:0);break;case r:s=(i-n)/e+2;break;case i:s=(n-r)/e+4}s/=6}return e.h=s,e.s=c,e.l=l,e}getRGB(e,t=G.workingColorSpace){return G.workingToColorSpace(Ct.copy(this),t),e.r=Ct.r,e.g=Ct.g,e.b=Ct.b,e}getStyle(e=te){G.workingToColorSpace(Ct.copy(this),e);let t=Ct.r,n=Ct.g,r=Ct.b;return e===`srgb`?`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`:`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`}offsetHSL(e,t,n){return this.getHSL(bt),this.setHSL(bt.h+e,bt.s+t,bt.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(bt),e.getHSL(xt);let n=xe(bt.h,xt.h,t),r=xe(bt.s,xt.s,t),i=xe(bt.l,xt.l,t);return this.setHSL(n,r,i),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,r=this.b,i=e.elements;return this.r=i[0]*t+i[3]*n+i[6]*r,this.g=i[1]*t+i[4]*n+i[7]*r,this.b=i[2]*t+i[5]*n+i[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Ct=new X;X.NAMES=yt;var wt=class e{constructor(e,t=1,n=1e3){this.isFog=!0,this.name=``,this.color=new X(e),this.near=t,this.far=n}clone(){return new e(this.color,this.near,this.far)}toJSON(){return{type:`Fog`,name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},Tt=class extends ht{constructor(){super(),this.isScene=!0,this.type=`Scene`,this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Qe,this.environmentIntensity=1,this.environmentRotation=new Qe,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},Et=new U,Dt=new U,Ot=new U,kt=new U,At=new U,jt=new U,Mt=new U,Nt=new U,Pt=new U,Ft=new U,It=new Le,Lt=new Le,Rt=new Le,zt=class e{constructor(e=new U,t=new U,n=new U){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),Et.subVectors(e,t),r.cross(Et);let i=r.lengthSq();return i>0?r.multiplyScalar(1/Math.sqrt(i)):r.set(0,0,0)}static getBarycoord(e,t,n,r,i){Et.subVectors(r,t),Dt.subVectors(n,t),Ot.subVectors(e,t);let a=Et.dot(Et),o=Et.dot(Dt),s=Et.dot(Ot),c=Dt.dot(Dt),l=Dt.dot(Ot),u=a*c-o*o;if(u===0)return i.set(0,0,0),null;let d=1/u,f=(c*s-o*l)*d,p=(a*l-o*s)*d;return i.set(1-f-p,p,f)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,kt)!==null&&kt.x>=0&&kt.y>=0&&kt.x+kt.y<=1}static getInterpolation(e,t,n,r,i,a,o,s){return this.getBarycoord(e,t,n,r,kt)===null?(s.x=0,s.y=0,`z`in s&&(s.z=0),`w`in s&&(s.w=0),null):(s.setScalar(0),s.addScaledVector(i,kt.x),s.addScaledVector(a,kt.y),s.addScaledVector(o,kt.z),s)}static getInterpolatedAttribute(e,t,n,r,i,a){return It.setScalar(0),Lt.setScalar(0),Rt.setScalar(0),It.fromBufferAttribute(e,t),Lt.fromBufferAttribute(e,n),Rt.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(It,i.x),a.addScaledVector(Lt,i.y),a.addScaledVector(Rt,i.z),a}static isFrontFacing(e,t,n,r){return Et.subVectors(n,t),Dt.subVectors(e,t),Et.cross(Dt).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Et.subVectors(this.c,this.b),Dt.subVectors(this.a,this.b),Et.cross(Dt).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return e.getNormal(this.a,this.b,this.c,t)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,n){return e.getBarycoord(t,this.a,this.b,this.c,n)}getInterpolation(t,n,r,i,a){return e.getInterpolation(t,this.a,this.b,this.c,n,r,i,a)}containsPoint(t){return e.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return e.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,r=this.b,i=this.c,a,o;At.subVectors(r,n),jt.subVectors(i,n),Nt.subVectors(e,n);let s=At.dot(Nt),c=jt.dot(Nt);if(s<=0&&c<=0)return t.copy(n);Pt.subVectors(e,r);let l=At.dot(Pt),u=jt.dot(Pt);if(l>=0&&u<=l)return t.copy(r);let d=s*u-l*c;if(d<=0&&s>=0&&l<=0)return a=s/(s-l),t.copy(n).addScaledVector(At,a);Ft.subVectors(e,i);let f=At.dot(Ft),p=jt.dot(Ft);if(p>=0&&f<=p)return t.copy(i);let m=f*c-s*p;if(m<=0&&c>=0&&p<=0)return o=c/(c-p),t.copy(n).addScaledVector(jt,o);let h=l*p-f*u;if(h<=0&&u-l>=0&&f-p>=0)return Mt.subVectors(i,r),o=(u-l)/(u-l+(f-p)),t.copy(r).addScaledVector(Mt,o);let g=1/(h+m+d);return a=m*g,o=d*g,t.copy(n).addScaledVector(At,a).addScaledVector(jt,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Bt=class{constructor(e=new U(1/0,1/0,1/0),t=new U(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Ht.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Ht.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=Ht.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute(`position`);if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let t=0,n=r.count;t<n;t++)e.isMesh===!0?e.getVertexPosition(t,Ht):Ht.fromBufferAttribute(r,t),Ht.applyMatrix4(e.matrixWorld),this.expandByPoint(Ht);else e.boundingBox===void 0?(n.boundingBox===null&&n.computeBoundingBox(),Ut.copy(n.boundingBox)):(e.boundingBox===null&&e.computeBoundingBox(),Ut.copy(e.boundingBox)),Ut.applyMatrix4(e.matrixWorld),this.union(Ut)}let r=e.children;for(let e=0,n=r.length;e<n;e++)this.expandByObject(r[e],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Ht),Ht.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Xt),Zt.subVectors(this.max,Xt),Wt.subVectors(e.a,Xt),Gt.subVectors(e.b,Xt),Kt.subVectors(e.c,Xt),qt.subVectors(Gt,Wt),Jt.subVectors(Kt,Gt),Yt.subVectors(Wt,Kt);let t=[0,-qt.z,qt.y,0,-Jt.z,Jt.y,0,-Yt.z,Yt.y,qt.z,0,-qt.x,Jt.z,0,-Jt.x,Yt.z,0,-Yt.x,-qt.y,qt.x,0,-Jt.y,Jt.x,0,-Yt.y,Yt.x,0];return!en(t,Wt,Gt,Kt,Zt)||(t=[1,0,0,0,1,0,0,0,1],!en(t,Wt,Gt,Kt,Zt))?!1:(Qt.crossVectors(qt,Jt),t=[Qt.x,Qt.y,Qt.z],en(t,Wt,Gt,Kt,Zt))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Ht).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Ht).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Vt[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Vt[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Vt[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Vt[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Vt[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Vt[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Vt[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Vt[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Vt),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},Vt=[new U,new U,new U,new U,new U,new U,new U,new U],Ht=new U,Ut=new Bt,Wt=new U,Gt=new U,Kt=new U,qt=new U,Jt=new U,Yt=new U,Xt=new U,Zt=new U,Qt=new U,$t=new U;function en(e,t,n,r,i){for(let a=0,o=e.length-3;a<=o;a+=3){$t.fromArray(e,a);let o=i.x*Math.abs($t.x)+i.y*Math.abs($t.y)+i.z*Math.abs($t.z),s=t.dot($t),c=n.dot($t),l=r.dot($t);if(Math.max(-Math.max(s,c,l),Math.min(s,c,l))>o)return!1}return!0}var tn=new U,nn=new H,rn=0,an=class extends he{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw TypeError(`THREE.BufferAttribute: array should be a Typed Array.`);this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:rn++}),this.name=``,this.array=e,this.itemSize=t,this.count=e===void 0?0:e.length/t,this.normalized=n,this.usage=35044,this.updateRanges=[],this.gpuType=v,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,i=this.itemSize;r<i;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)nn.fromBufferAttribute(this,t),nn.applyMatrix3(e),this.setXY(t,nn.x,nn.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)tn.fromBufferAttribute(this,t),tn.applyMatrix3(e),this.setXYZ(t,tn.x,tn.y,tn.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)tn.fromBufferAttribute(this,t),tn.applyMatrix4(e),this.setXYZ(t,tn.x,tn.y,tn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)tn.fromBufferAttribute(this,t),tn.applyNormalMatrix(e),this.setXYZ(t,tn.x,tn.y,tn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)tn.fromBufferAttribute(this,t),tn.transformDirection(e),this.setXYZ(t,tn.x,tn.y,tn.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Se(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Ce(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Se(t,this.array)),t}setX(e,t){return this.normalized&&(t=Ce(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Se(t,this.array)),t}setY(e,t){return this.normalized&&(t=Ce(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Se(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Ce(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Se(t,this.array)),t}setW(e,t){return this.normalized&&(t=Ce(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Ce(t,this.array),n=Ce(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=Ce(t,this.array),n=Ce(n,this.array),r=Ce(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,i){return e*=this.itemSize,this.normalized&&(t=Ce(t,this.array),n=Ce(n,this.array),r=Ce(r,this.array),i=Ce(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=i,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:`dispose`})}},on=class extends an{constructor(e,t,n){super(new Uint16Array(e),t,n)}},sn=class extends an{constructor(e,t,n){super(new Uint32Array(e),t,n)}},cn=class extends an{constructor(e,t,n){super(new Float32Array(e),t,n)}},ln=new Bt,un=new U,dn=new U,fn=class{constructor(e=new U,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t===void 0?ln.setFromPoints(e).getCenter(n):n.copy(t);let r=0;for(let t=0,i=e.length;t<i;t++)r=Math.max(r,n.distanceToSquared(e[t]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius*=e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;un.subVectors(e,this.center);let t=un.lengthSq();if(t>this.radius*this.radius){let e=Math.sqrt(t),n=(e-this.radius)*.5;this.center.addScaledVector(un,n/e),this.radius+=n}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(dn.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(un.copy(e.center).add(dn)),this.expandByPoint(un.copy(e.center).sub(dn))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},pn=0,mn=new He,hn=new ht,gn=new U,_n=new Bt,vn=new Bt,yn=new U,bn=class e extends he{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:pn++}),this.uuid=ye(),this.name=``,this.type=`BufferGeometry`,this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return this.index=Array.isArray(e)?new(oe(e)?sn:on)(e,1):e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let t=new W().getNormalMatrix(e);n.applyNormalMatrix(t),n.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return mn.makeRotationFromQuaternion(e),this.applyMatrix4(mn),this}rotateX(e){return mn.makeRotationX(e),this.applyMatrix4(mn),this}rotateY(e){return mn.makeRotationY(e),this.applyMatrix4(mn),this}rotateZ(e){return mn.makeRotationZ(e),this.applyMatrix4(mn),this}translate(e,t,n){return mn.makeTranslation(e,t,n),this.applyMatrix4(mn),this}scale(e,t,n){return mn.makeScale(e,t,n),this.applyMatrix4(mn),this}lookAt(e){return hn.lookAt(e),hn.updateMatrix(),this.applyMatrix4(hn.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(gn).negate(),this.translate(gn.x,gn.y,gn.z),this}setFromPoints(e){let t=this.getAttribute(`position`);if(t===void 0){let t=[];for(let n=0,r=e.length;n<r;n++){let r=e[n];t.push(r.x,r.y,r.z||0)}this.setAttribute(`position`,new cn(t,3))}else{let n=Math.min(e.length,t.count);for(let r=0;r<n;r++){let n=e[r];t.setXYZ(r,n.x,n.y,n.z||0)}e.length>t.count&&z(`BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry.`),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Bt);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){B(`BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.`,this),this.boundingBox.set(new U(-1/0,-1/0,-1/0),new U(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];_n.setFromBufferAttribute(n),this.morphTargetsRelative?(yn.addVectors(this.boundingBox.min,_n.min),this.boundingBox.expandByPoint(yn),yn.addVectors(this.boundingBox.max,_n.max),this.boundingBox.expandByPoint(yn)):(this.boundingBox.expandByPoint(_n.min),this.boundingBox.expandByPoint(_n.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&B(`BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.`,this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new fn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){B(`BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.`,this),this.boundingSphere.set(new U,1/0);return}if(e){let n=this.boundingSphere.center;if(_n.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];vn.setFromBufferAttribute(n),this.morphTargetsRelative?(yn.addVectors(_n.min,vn.min),_n.expandByPoint(yn),yn.addVectors(_n.max,vn.max),_n.expandByPoint(yn)):(_n.expandByPoint(vn.min),_n.expandByPoint(vn.max))}_n.getCenter(n);let r=0;for(let t=0,i=e.count;t<i;t++)yn.fromBufferAttribute(e,t),r=Math.max(r,n.distanceToSquared(yn));if(t)for(let i=0,a=t.length;i<a;i++){let a=t[i],o=this.morphTargetsRelative;for(let t=0,i=a.count;t<i;t++)yn.fromBufferAttribute(a,t),o&&(gn.fromBufferAttribute(e,t),yn.add(gn)),r=Math.max(r,n.distanceToSquared(yn))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&B(`BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.`,this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){B(`BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)`);return}let n=t.position,r=t.normal,i=t.uv,a=this.getAttribute(`tangent`);(a===void 0||a.count!==n.count)&&(a=new an(new Float32Array(4*n.count),4),this.setAttribute(`tangent`,a));let o=[],s=[];for(let e=0;e<n.count;e++)o[e]=new U,s[e]=new U;let c=new U,l=new U,u=new U,d=new H,f=new H,p=new H,m=new U,h=new U;function g(e,t,r){c.fromBufferAttribute(n,e),l.fromBufferAttribute(n,t),u.fromBufferAttribute(n,r),d.fromBufferAttribute(i,e),f.fromBufferAttribute(i,t),p.fromBufferAttribute(i,r),l.sub(c),u.sub(c),f.sub(d),p.sub(d);let a=1/(f.x*p.y-p.x*f.y);isFinite(a)&&(m.copy(l).multiplyScalar(p.y).addScaledVector(u,-f.y).multiplyScalar(a),h.copy(u).multiplyScalar(f.x).addScaledVector(l,-p.x).multiplyScalar(a),o[e].add(m),o[t].add(m),o[r].add(m),s[e].add(h),s[t].add(h),s[r].add(h))}let _=this.groups;_.length===0&&(_=[{start:0,count:e.count}]);for(let t=0,n=_.length;t<n;++t){let n=_[t],r=n.start,i=n.count;for(let t=r,n=r+i;t<n;t+=3)g(e.getX(t+0),e.getX(t+1),e.getX(t+2))}let v=new U,y=new U,b=new U,x=new U;function S(e){b.fromBufferAttribute(r,e),x.copy(b);let t=o[e];v.copy(t),v.sub(b.multiplyScalar(b.dot(t))).normalize(),y.crossVectors(x,t);let n=y.dot(s[e])<0?-1:1;a.setXYZW(e,v.x,v.y,v.z,n)}for(let t=0,n=_.length;t<n;++t){let n=_[t],r=n.start,i=n.count;for(let t=r,n=r+i;t<n;t+=3)S(e.getX(t+0)),S(e.getX(t+1)),S(e.getX(t+2))}this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute(`position`);if(t!==void 0){let n=this.getAttribute(`normal`);if(n===void 0||n.count!==t.count)n=new an(new Float32Array(t.count*3),3),this.setAttribute(`normal`,n);else for(let e=0,t=n.count;e<t;e++)n.setXYZ(e,0,0,0);let r=new U,i=new U,a=new U,o=new U,s=new U,c=new U,l=new U,u=new U;if(e)for(let d=0,f=e.count;d<f;d+=3){let f=e.getX(d+0),p=e.getX(d+1),m=e.getX(d+2);r.fromBufferAttribute(t,f),i.fromBufferAttribute(t,p),a.fromBufferAttribute(t,m),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),o.fromBufferAttribute(n,f),s.fromBufferAttribute(n,p),c.fromBufferAttribute(n,m),o.add(l),s.add(l),c.add(l),n.setXYZ(f,o.x,o.y,o.z),n.setXYZ(p,s.x,s.y,s.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let e=0,o=t.count;e<o;e+=3)r.fromBufferAttribute(t,e+0),i.fromBufferAttribute(t,e+1),a.fromBufferAttribute(t,e+2),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),n.setXYZ(e+0,l.x,l.y,l.z),n.setXYZ(e+1,l.x,l.y,l.z),n.setXYZ(e+2,l.x,l.y,l.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)yn.fromBufferAttribute(e,t),yn.normalize(),e.setXYZ(t,yn.x,yn.y,yn.z)}toNonIndexed(){function t(e,t){let n=e.array,r=e.itemSize,i=e.normalized,a=new n.constructor(t.length*r),o=0,s=0;for(let i=0,c=t.length;i<c;i++){o=e.isInterleavedBufferAttribute?t[i]*e.data.stride+e.offset:t[i]*r;for(let e=0;e<r;e++)a[s++]=n[o++]}return new an(a,r,i)}if(this.index===null)return z(`BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed.`),this;let n=new e,r=this.index.array,i=this.attributes;for(let e in i){let a=i[e],o=t(a,r);n.setAttribute(e,o)}let a=this.morphAttributes;for(let e in a){let i=[],o=a[e];for(let e=0,n=o.length;e<n;e++){let n=o[e],a=t(n,r);i.push(a)}n.morphAttributes[e]=i}n.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let e=0,t=o.length;e<t;e++){let t=o[e];n.addGroup(t.start,t.count,t.materialIndex)}return n}toJSON(){let e={metadata:{version:4.7,type:`BufferGeometry`,generator:`BufferGeometry.toJSON`}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?`BufferGeometry`:this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let t=this.parameters;for(let n in t)t[n]!==void 0&&(e[n]=t[n]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let t in n){let r=n[t];e.data.attributes[t]=r.toJSON(e.data)}let r={},i=!1;for(let t in this.morphAttributes){let n=this.morphAttributes[t],a=[];for(let t=0,r=n.length;t<r;t++){let r=n[t];a.push(r.toJSON(e.data))}a.length>0&&(r[t]=a,i=!0)}i&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let r=e.attributes;for(let e in r){let n=r[e];this.setAttribute(e,n.clone(t))}let i=e.morphAttributes;for(let e in i){let n=[],r=i[e];for(let e=0,i=r.length;e<i;e++)n.push(r[e].clone(t));this.morphAttributes[e]=n}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let e=0,t=a.length;e<t;e++){let t=a[e];this.addGroup(t.start,t.count,t.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let s=e.boundingSphere;return s!==null&&(this.boundingSphere=s.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:`dispose`})}},xn=new U,Sn=new U,Cn=new W,wn=class{constructor(e=new U(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let r=xn.subVectors(n,t).cross(Sn.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let r=e.delta(xn),i=this.normal.dot(r);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/i;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(r,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||Cn.getNormalMatrix(e),r=this.coplanarPoint(xn).applyMatrix4(e),i=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(i),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},Tn=0,En=class extends he{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Tn++}),this.uuid=ye(),this.name=``,this.type=`Material`,this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new X(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ie,this.stencilZFail=ie,this.stencilZPass=ie,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){z(`Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){z(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector2&&n&&n.isVector2||r&&r.isEuler&&n&&n.isEuler||r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:`Material`,generator:`Material.toJSON`}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(e=>e.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}if(t){let t=r(e.textures),i=r(e.images);t.length>0&&(n.textures=t),i.length>0&&(n.images=i)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new X().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(e=>new wn().fromJSON(e))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(this.vertexColors=typeof e.vertexColors==`number`?e.vertexColors>0:e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let t=e.normalScale;Array.isArray(t)===!1&&(t=[t,t]),this.normalScale=new H().fromArray(t)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new H().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let e=t.length;n=Array(e);for(let r=0;r!==e;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:`dispose`})}set needsUpdate(e){e===!0&&this.version++}},Dn=new U,On=new U,kn=new U,An=new U,jn=class{constructor(e=new U,t=new U(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Dn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Dn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Dn.copy(this.origin).addScaledVector(this.direction,t),Dn.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){On.copy(e).add(t).multiplyScalar(.5),kn.copy(t).sub(e).normalize(),An.copy(this.origin).sub(On);let i=e.distanceTo(t)*.5,a=-this.direction.dot(kn),o=An.dot(this.direction),s=-An.dot(kn),c=An.lengthSq(),l=Math.abs(1-a*a),u,d,f,p;if(l>0){if(u=a*s-o,d=a*o-s,p=i*l,u>=0){if(d>=-p){if(d<=p){let e=1/l;u*=e,d*=e,f=u*(u+a*d+2*o)+d*(a*u+d+2*s)+c}else d=i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c}else d=-i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c}else d<=-p?(u=Math.max(0,-(-a*i+o)),d=u>0?-i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c):d<=p?(u=0,d=Math.min(Math.max(-i,-s),i),f=d*(d+2*s)+c):(u=Math.max(0,-(a*i+o)),d=u>0?i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c)}else d=a>0?-i:i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),r&&r.copy(On).addScaledVector(kn,d),f}intersectSphere(e,t){if(e.radius<0)return null;Dn.subVectors(e.center,this.origin);let n=Dn.dot(this.direction),r=Dn.dot(Dn)-n*n,i=e.radius*e.radius;if(r>i)return null;let a=Math.sqrt(i-r),o=n-a,s=n+a;return s<0?null:o<0?this.at(s,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,i,a,o,s,c=1/this.direction.x,l=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,r=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,r=(e.min.x-d.x)*c),l>=0?(i=(e.min.y-d.y)*l,a=(e.max.y-d.y)*l):(i=(e.max.y-d.y)*l,a=(e.min.y-d.y)*l),n>a||i>r||((i>n||isNaN(n))&&(n=i),(a<r||isNaN(r))&&(r=a),u>=0?(o=(e.min.z-d.z)*u,s=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,s=(e.min.z-d.z)*u),n>s||o>r)||((o>n||n!==n)&&(n=o),(s<r||r!==r)&&(r=s),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,Dn)!==null}intersectTriangle(e,t,n,r,i){let a=this.origin,o=this.direction,s=o.x,c=o.y,l=o.z,u=e.x-a.x,d=e.y-a.y,f=e.z-a.z,p=t.x-a.x,m=t.y-a.y,h=t.z-a.z,g=n.x-a.x,_=n.y-a.y,v=n.z-a.z,y=Math.abs(s),b=Math.abs(c),x=Math.abs(l),S,C,w,T,E,D,O,k,A,j,M,N;if(y>=b&&y>=x?(w=s,D=u,A=p,N=g,s>=0?(S=c,C=l,T=d,E=f,O=m,k=h,j=_,M=v):(S=l,C=c,T=f,E=d,O=h,k=m,j=v,M=_)):b>=x?(w=c,D=d,A=m,N=_,c>=0?(S=l,C=s,T=f,E=u,O=h,k=p,j=v,M=g):(S=s,C=l,T=u,E=f,O=p,k=h,j=g,M=v)):(w=l,D=f,A=h,N=v,l>=0?(S=s,C=c,T=u,E=d,O=p,k=m,j=g,M=_):(S=c,C=s,T=d,E=u,O=m,k=p,j=_,M=g)),w===0)return null;let P=S/w,F=C/w,I=1/w,ee=T-P*D,te=E-F*D,L=O-P*A,ne=k-F*A,re=j-P*N,ie=M-F*N,ae=re*ne-ie*L,oe=ee*ie-te*re,se=L*te-ne*ee;if(r){if(ae<0||oe<0||se<0)return null}else if((ae<0||oe<0||se<0)&&(ae>0||oe>0||se>0))return null;let R=ae+oe+se;if(R===0)return null;let ce=I*(ae*D+oe*A+se*N);return(R>0?ce<0:ce>0)?null:this.at(ce/R,i)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Mn=class extends En{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type=`MeshBasicMaterial`,this.color=new X(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Qe,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},Nn=new He,Pn=new jn,Fn=new fn,In=new U,Ln=new U,Rn=new U,zn=new U,Bn=new U,Vn=new U,Hn=new U,Un=new U,Wn=class extends ht{constructor(e=new bn,t=new Mn){super(),this.isMesh=!0,this.type=`Mesh`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}getVertexPosition(e,t){let n=this.geometry,r=n.attributes.position,i=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);let o=this.morphTargetInfluences;if(i&&o){Vn.set(0,0,0);for(let n=0,r=i.length;n<r;n++){let r=o[n],s=i[n];r!==0&&(Bn.fromBufferAttribute(s,e),a?Vn.addScaledVector(Bn,r):Vn.addScaledVector(Bn.sub(t),r))}t.add(Vn)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.material,i=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Fn.copy(n.boundingSphere),Fn.applyMatrix4(i),Pn.copy(e.ray).recast(e.near),!(Fn.containsPoint(Pn.origin)===!1&&(Pn.intersectSphere(Fn,In)===null||Pn.origin.distanceToSquared(In)>(e.far-e.near)**2))&&(Nn.copy(i).invert(),Pn.copy(e.ray).applyMatrix4(Nn),(n.boundingBox===null||Pn.intersectsBox(n.boundingBox)!==!1)&&this._computeIntersections(e,t,Pn)))}_computeIntersections(e,t,n){let r,i=this.geometry,a=this.material,o=i.index,s=i.attributes.position,c=i.attributes.uv,l=i.attributes.uv1,u=i.attributes.normal,d=i.groups,f=i.drawRange;if(o!==null){if(Array.isArray(a))for(let i=0,s=d.length;i<s;i++){let s=d[i],p=a[s.materialIndex],m=Math.max(s.start,f.start),h=Math.min(o.count,Math.min(s.start+s.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=o.getX(i),d=o.getX(i+1),f=o.getX(i+2);r=Kn(this,p,e,n,c,l,u,a,d,f),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=s.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),s=Math.min(o.count,f.start+f.count);for(let d=i,f=s;d<f;d+=3){let i=o.getX(d),s=o.getX(d+1),f=o.getX(d+2);r=Kn(this,a,e,n,c,l,u,i,s,f),r&&(r.faceIndex=Math.floor(d/3),t.push(r))}}}else if(s!==void 0){if(Array.isArray(a))for(let i=0,o=d.length;i<o;i++){let o=d[i],p=a[o.materialIndex],m=Math.max(o.start,f.start),h=Math.min(s.count,Math.min(o.start+o.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=i,s=i+1,d=i+2;r=Kn(this,p,e,n,c,l,u,a,s,d),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=o.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),o=Math.min(s.count,f.start+f.count);for(let s=i,d=o;s<d;s+=3){let i=s,o=s+1,d=s+2;r=Kn(this,a,e,n,c,l,u,i,o,d),r&&(r.faceIndex=Math.floor(s/3),t.push(r))}}}}};function Gn(e,t,n,r,i,a,o,s){let c;if(c=t.side===1?r.intersectTriangle(o,a,i,!0,s):r.intersectTriangle(i,a,o,t.side===0,s),c===null)return null;Un.copy(s),Un.applyMatrix4(e.matrixWorld);let l=n.ray.origin.distanceTo(Un);return l<n.near||l>n.far?null:{distance:l,point:Un.clone(),object:e}}function Kn(e,t,n,r,i,a,o,s,c,l){e.getVertexPosition(s,Ln),e.getVertexPosition(c,Rn),e.getVertexPosition(l,zn);let u=Gn(e,t,n,r,Ln,Rn,zn,Hn);if(u){let e=new U;zt.getBarycoord(Hn,Ln,Rn,zn,e),i&&(u.uv=zt.getInterpolatedAttribute(i,s,c,l,e,new H)),a&&(u.uv1=zt.getInterpolatedAttribute(a,s,c,l,e,new H)),o&&(u.normal=zt.getInterpolatedAttribute(o,s,c,l,e,new U),u.normal.dot(r.direction)>0&&u.normal.multiplyScalar(-1));let t={a:s,b:c,c:l,normal:new U,materialIndex:0};zt.getNormal(Ln,Rn,zn,t.normal),u.face=t,u.barycoord=e}return u}var qn=class extends Ie{constructor(e=null,t=1,n=1,r,i,a,o,s,c=f,l=f,u,d){super(null,a,o,s,c,l,r,i,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},Jn=class extends an{constructor(e,t,n,r=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},Yn=new He,Xn=new He,Zn=[],Qn=new Bt,$n=new He,er=new Wn,tr=new fn,nr=class extends Wn{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Jn(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let e=0;e<n;e++)this.setMatrixAt(e,$n)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Bt),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Yn),Qn.copy(e.boundingBox).applyMatrix4(Yn),this.boundingBox.union(Qn)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new fn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Yn),tr.copy(e.boundingSphere).applyMatrix4(Yn),this.boundingSphere.union(tr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,r=this.morphTexture.source.data.data,i=e*(n.length+1)+1;for(let e=0;e<n.length;e++)n[e]=r[i+e]}raycast(e,t){let n=this.matrixWorld,r=this.count;if(er.geometry=this.geometry,er.material=this.material,er.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),tr.copy(this.boundingSphere),tr.applyMatrix4(n),e.ray.intersectsSphere(tr)!==!1))for(let i=0;i<r;i++){this.getMatrixAt(i,Yn),Xn.multiplyMatrices(n,Yn),er.matrixWorld=Xn,er.raycast(e,Zn);for(let e=0,n=Zn.length;e<n;e++){let n=Zn[e];n.instanceId=i,n.object=this,t.push(n)}Zn.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new Jn(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){let n=t.morphTargetInfluences,r=n.length+1;this.morphTexture===null&&(this.morphTexture=new qn(new Float32Array(r*this.count),r,this.count,E,v));let i=this.morphTexture.source.data.data,a=0;for(let e=0;e<n.length;e++)a+=n[e];let o=this.geometry.morphTargetsRelative?1:1-a,s=r*e;return i[s]=o,i.set(n,s+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},rr=new fn,ir=new H(.5,.5),ar=new U,or=class{constructor(e=new wn,t=new wn,n=new wn,r=new wn,i=new wn,a=new wn){this.planes=[e,t,n,r,i,a]}set(e,t,n,r,i,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(i),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=ae,n=!1){let r=this.planes,i=e.elements,a=i[0],o=i[1],s=i[2],c=i[3],l=i[4],u=i[5],d=i[6],f=i[7],p=i[8],m=i[9],h=i[10],g=i[11],_=i[12],v=i[13],y=i[14],b=i[15];if(r[0].setComponents(c-a,f-l,g-p,b-_).normalize(),r[1].setComponents(c+a,f+l,g+p,b+_).normalize(),r[2].setComponents(c+o,f+u,g+m,b+v).normalize(),r[3].setComponents(c-o,f-u,g-m,b-v).normalize(),n)r[4].setComponents(s,d,h,y).normalize(),r[5].setComponents(c-s,f-d,g-h,b-y).normalize();else if(r[4].setComponents(c-s,f-d,g-h,b-y).normalize(),t===2e3)r[5].setComponents(c+s,f+d,g+h,b+y).normalize();else if(t===2001)r[5].setComponents(s,d,h,y).normalize();else throw Error(`THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: `+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),rr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),rr.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(rr)}intersectsSprite(e){return rr.center.set(0,0,0),rr.radius=.7071067811865476+ir.distanceTo(e.center),rr.applyMatrix4(e.matrixWorld),this.intersectsSphere(rr)}intersectsSphere(e){let t=this.planes,n=e.center,r=-e.radius;for(let e=0;e<6;e++)if(t[e].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let r=t[n];if(ar.x=r.normal.x>0?e.max.x:e.min.x,ar.y=r.normal.y>0?e.max.y:e.min.y,ar.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(ar)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},sr=class extends Ie{constructor(e=[],t=301,n,r,i,a,o,s,c,l){super(e,t,n,r,i,a,o,s,c,l),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},cr=class extends Ie{constructor(e,t,n=_,r,i,a,o=f,s=f,c,l=w,u=1){if(l!==1026&&l!==1027)throw Error(`THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat`);super({width:e,height:t,depth:u},r,i,a,o,s,l,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new q(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},lr=class extends cr{constructor(e,t=_,n=301,r,i,a=f,o=f,s,c=w){let l={width:e,height:e,depth:1},u=[l,l,l,l,l,l];super(e,e,t,n,r,i,a,o,s,c),this.image=u,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},ur=class extends Ie{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},dr=class e extends bn{constructor(e=1,t=1,n=1,r=1,i=1,a=1){super(),this.type=`BoxGeometry`,this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:i,depthSegments:a};let o=this;r=Math.floor(r),i=Math.floor(i),a=Math.floor(a);let s=[],c=[],l=[],u=[],d=0,f=0;p(`z`,`y`,`x`,-1,-1,n,t,e,a,i,0),p(`z`,`y`,`x`,1,-1,n,t,-e,a,i,1),p(`x`,`z`,`y`,1,1,e,n,t,r,a,2),p(`x`,`z`,`y`,1,-1,e,n,-t,r,a,3),p(`x`,`y`,`z`,1,-1,e,t,n,r,i,4),p(`x`,`y`,`z`,-1,-1,e,t,-n,r,i,5),this.setIndex(s),this.setAttribute(`position`,new cn(c,3)),this.setAttribute(`normal`,new cn(l,3)),this.setAttribute(`uv`,new cn(u,2));function p(e,t,n,r,i,a,p,m,h,g,_){let v=a/h,y=p/g,b=a/2,x=p/2,S=m/2,C=h+1,w=g+1,T=0,E=0,D=new U;for(let a=0;a<w;a++){let o=a*y-x;for(let s=0;s<C;s++)D[e]=(s*v-b)*r,D[t]=o*i,D[n]=S,c.push(D.x,D.y,D.z),D[e]=0,D[t]=0,D[n]=m>0?1:-1,l.push(D.x,D.y,D.z),u.push(s/h),u.push(1-a/g),T+=1}for(let e=0;e<g;e++)for(let t=0;t<h;t++){let n=d+t+C*e,r=d+t+C*(e+1),i=d+(t+1)+C*(e+1),a=d+(t+1)+C*e;s.push(n,r,a),s.push(r,i,a),E+=6}o.addGroup(f,E,_),f+=E,d+=T}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}},fr=class e extends bn{constructor(e=1,t=1,n=1,r=32,i=1,a=!1,o=0,s=Math.PI*2){super(),this.type=`CylinderGeometry`,this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:r,heightSegments:i,openEnded:a,thetaStart:o,thetaLength:s};let c=this;r=Math.floor(r),i=Math.floor(i);let l=[],u=[],d=[],f=[],p=0,m=[],h=n/2,g=0;_(),a===!1&&(e>0&&v(!0),t>0&&v(!1)),this.setIndex(l),this.setAttribute(`position`,new cn(u,3)),this.setAttribute(`normal`,new cn(d,3)),this.setAttribute(`uv`,new cn(f,2));function _(){let a=new U,_=new U,v=0,y=(t-e)/n;for(let c=0;c<=i;c++){let l=[],g=c/i,v=g*(t-e)+e;for(let e=0;e<=r;e++){let t=e/r,i=t*s+o,c=Math.sin(i),m=Math.cos(i);_.x=v*c,_.y=-g*n+h,_.z=v*m,u.push(_.x,_.y,_.z),a.set(c,y,m).normalize(),d.push(a.x,a.y,a.z),f.push(t,1-g),l.push(p++)}m.push(l)}for(let n=0;n<r;n++)for(let r=0;r<i;r++){let a=m[r][n],o=m[r+1][n],s=m[r+1][n+1],c=m[r][n+1];(e>0||r!==0)&&(l.push(a,o,c),v+=3),(t>0||r!==i-1)&&(l.push(o,s,c),v+=3)}c.addGroup(g,v,0),g+=v}function v(n){let i=p,a=new H,m=new U,_=0,v=n===!0?e:t,y=n===!0?1:-1;for(let e=1;e<=r;e++)u.push(0,h*y,0),d.push(0,y,0),f.push(.5,.5),p++;let b=p;for(let e=0;e<=r;e++){let t=e/r*s+o,n=Math.cos(t),i=Math.sin(t);m.x=v*i,m.y=h*y,m.z=v*n,u.push(m.x,m.y,m.z),d.push(0,y,0),a.x=n*.5+.5,a.y=i*.5*y+.5,f.push(a.x,a.y),p++}for(let e=0;e<r;e++){let t=i+e,r=b+e;n===!0?l.push(r,r+1,t):l.push(r+1,r,t),_+=3}c.addGroup(g,_,n===!0?1:2),g+=_}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},pr=class e extends bn{constructor(e=1,t=1,n=1,r=1){super(),this.type=`PlaneGeometry`,this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};let i=e/2,a=t/2,o=Math.floor(n),s=Math.floor(r),c=o+1,l=s+1,u=e/o,d=t/s,f=[],p=[],m=[],h=[];for(let e=0;e<l;e++){let t=e*d-a;for(let n=0;n<c;n++){let r=n*u-i;p.push(r,-t,0),m.push(0,0,1),h.push(n/o),h.push(1-e/s)}}for(let e=0;e<s;e++)for(let t=0;t<o;t++){let n=t+c*e,r=t+c*(e+1),i=t+1+c*(e+1),a=t+1+c*e;f.push(n,r,a),f.push(r,i,a)}this.setIndex(f),this.setAttribute(`position`,new cn(p,3)),this.setAttribute(`normal`,new cn(m,3)),this.setAttribute(`uv`,new cn(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.widthSegments,t.heightSegments)}};function mr(e){let t={};for(let n in e){t[n]={};for(let r in e[n]){let i=e[n][r];if(gr(i))i.isRenderTargetTexture?(z(`UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms().`),t[n][r]=null):t[n][r]=i.clone();else if(Array.isArray(i)){if(gr(i[0])){let e=[];for(let t=0,n=i.length;t<n;t++)e[t]=i[t].clone();t[n][r]=e}else t[n][r]=i.slice()}else t[n][r]=i}}return t}function hr(e){let t={};for(let n=0;n<e.length;n++){let r=mr(e[n]);for(let e in r)t[e]=r[e]}return t}function gr(e){return e&&(e.isColor||e.isMatrix3||e.isMatrix4||e.isVector2||e.isVector3||e.isVector4||e.isTexture||e.isQuaternion)}function _r(e){let t=[];for(let n=0;n<e.length;n++)t.push(e[n].clone());return t}function vr(e){let t=e.getRenderTarget();return t===null?e.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:G.workingColorSpace}var yr={clone:mr,merge:hr},br=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,xr=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Sr=class extends En{constructor(e){super(),this.isShaderMaterial=!0,this.type=`ShaderMaterial`,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=br,this.fragmentShader=xr,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=mr(e.uniforms),this.uniformsGroups=_r(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let n in this.uniforms){let r=this.uniforms[n].value;r&&r.isTexture?t.uniforms[n]={type:`t`,value:r.toJSON(e).uuid}:r&&r.isColor?t.uniforms[n]={type:`c`,value:r.getHex()}:r&&r.isVector2?t.uniforms[n]={type:`v2`,value:r.toArray()}:r&&r.isVector3?t.uniforms[n]={type:`v3`,value:r.toArray()}:r&&r.isVector4?t.uniforms[n]={type:`v4`,value:r.toArray()}:r&&r.isMatrix3?t.uniforms[n]={type:`m3`,value:r.toArray()}:r&&r.isMatrix4?t.uniforms[n]={type:`m4`,value:r.toArray()}:t.uniforms[n]={value:r}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let e in this.extensions)this.extensions[e]===!0&&(n[e]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let r=e.uniforms[n];switch(this.uniforms[n]={},r.type){case`t`:this.uniforms[n].value=t[r.value]||null;break;case`c`:this.uniforms[n].value=new X().setHex(r.value);break;case`v2`:this.uniforms[n].value=new H().fromArray(r.value);break;case`v3`:this.uniforms[n].value=new U().fromArray(r.value);break;case`v4`:this.uniforms[n].value=new Le().fromArray(r.value);break;case`m3`:this.uniforms[n].value=new W().fromArray(r.value);break;case`m4`:this.uniforms[n].value=new He().fromArray(r.value);break;default:this.uniforms[n].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let t in e.extensions)this.extensions[t]=e.extensions[t];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},Cr=class extends Sr{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type=`RawShaderMaterial`}},wr=class extends En{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type=`MeshStandardMaterial`,this.defines={STANDARD:``},this.color=new X(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new X(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new H(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Qe,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:``},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},Tr=class extends En{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type=`MeshDepthMaterial`,this.depthPacking=3200,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Er=class extends En{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type=`MeshDistanceMaterial`,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function Dr(e,t){return!e||e.constructor===t?e:typeof t.BYTES_PER_ELEMENT==`number`?new t(e):Array.prototype.slice.call(e)}function Or(e){return e!==void 0&&e.inTangents!==void 0&&e.outTangents!==void 0}var kr=class{constructor(e,t,n,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r===void 0?new t.constructor(n):r,this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,r=t[n],i=t[n-1];validate_interval:{seek:{let a;linear_scan:{forward_scan:if(!(e<r)){for(let a=n+2;;){if(r===void 0){if(e<i)break forward_scan;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(i=r,r=t[++n],e<r)break seek}a=t.length;break linear_scan}if(!(e>=i)){let o=t[1];e<o&&(n=2,i=o);for(let a=n-2;;){if(i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===a)break;if(r=i,i=t[--n-1],e>=i)break seek}a=n,n=0;break linear_scan}break validate_interval}for(;n<a;){let r=n+a>>>1;e<t[r]?a=r:n=r+1}if(r=t[n],i=t[n-1],i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,i,r)}return this.interpolate_(n,i,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,i=e*r;for(let e=0;e!==r;++e)t[e]=n[i+e];return t}interpolate_(){throw Error(`THREE.Interpolant: Call to abstract method.`)}intervalChanged_(){}},Ar=class extends kr{constructor(e,t,n,r){super(e,t,n,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:F,endingEnd:F}}intervalChanged_(e,t,n){let r=this.parameterPositions,i=e-2,a=e+1,o=r[i],s=r[a];if(o===void 0)switch(this.getSettings_().endingStart){case I:i=e,o=2*t-n;break;case ee:i=r.length-2,o=t+r[i]-r[i+1];break;default:i=e,o=n}if(s===void 0)switch(this.getSettings_().endingEnd){case I:a=e,s=2*n-t;break;case ee:a=1,s=n+r[1]-r[0];break;default:a=e-1,s=t}let c=(n-t)*.5,l=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(s-n),this._offsetPrev=i*l,this._offsetNext=a*l}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,p=(n-t)/(r-t),m=p*p,h=m*p,g=-d*h+2*d*m-d*p,_=(1+d)*h+(-1.5-2*d)*m+(-.5+d)*p+1,v=(-1-f)*h+(1.5+f)*m+.5*p,y=f*h-f*m;for(let e=0;e!==o;++e)i[e]=g*a[l+e]+_*a[c+e]+v*a[s+e]+y*a[u+e];return i}},jr=class extends kr{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=(n-t)/(r-t),u=1-l;for(let e=0;e!==o;++e)i[e]=a[c+e]*u+a[s+e]*l;return i}},Mr=class extends kr{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e){return this.copySampleValue_(e-1)}},Nr=class extends kr{interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this.inTangents,u=this.outTangents;if(!l||!u){let e=(n-t)/(r-t),l=1-e;for(let t=0;t!==o;++t)i[t]=a[c+t]*l+a[s+t]*e;return i}let d=o*2,f=e-1;for(let p=0;p!==o;++p){let o=a[c+p],m=a[s+p],h=f*d+p*2,g=u[h],_=u[h+1],v=e*d+p*2,y=l[v],b=l[v+1],x=Ir(n,t,g,y,r);i[p]=Pr(x,o,_,b,m)}return i}};function Pr(e,t,n,r,i){let a=1-e;return a*a*a*t+3*a*a*e*n+3*a*e*e*r+e*e*e*i}function Fr(e,t,n,r,i){let a=1-e;return 3*a*a*(n-t)+6*a*e*(r-n)+3*e*e*(i-r)}function Ir(e,t,n,r,i){let a=(e-t)/(i-t);for(let o=0;o<8;o++){let o=Pr(a,t,n,r,i)-e;if(Math.abs(o)<1e-10)break;let s=Fr(a,t,n,r,i);if(Math.abs(s)<1e-10)break;a=Math.max(0,Math.min(1,a-o/s))}return a}var Lr=class{constructor(e,t,n,r){if(e===void 0)throw Error(`THREE.KeyframeTrack: track name is undefined`);if(t===void 0||t.length===0)throw Error(`THREE.KeyframeTrack: no keyframes in track named `+e);this.name=e,this.times=Dr(t,this.TimeBufferType),this.values=Dr(n,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Dr(e.times,Array),values:Dr(e.values,Array)};let t=e.getInterpolation();t!==e.DefaultInterpolation&&(n.interpolation=t),Or(e.settings)&&(n.settings={inTangents:Dr(e.settings.inTangents,Array),outTangents:Dr(e.settings.outTangents,Array)})}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Mr(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new jr(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Ar(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new Nr(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case j:t=this.InterpolantFactoryMethodDiscrete;break;case M:t=this.InterpolantFactoryMethodLinear;break;case N:t=this.InterpolantFactoryMethodSmooth;break;case P:t=this.InterpolantFactoryMethodBezier}if(t===void 0){let t=`unsupported interpolation for `+this.ValueTypeName+` keyframe track named `+this.name;if(this.createInterpolant===void 0){if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw Error(t)}return z(`KeyframeTrack:`,t),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return j;case this.InterpolantFactoryMethodLinear:return M;case this.InterpolantFactoryMethodSmooth:return N;case this.InterpolantFactoryMethodBezier:return P}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]*=e;Or(this.settings)&&(Rr(this.settings.inTangents,e),Rr(this.settings.outTangents,e))}return this}trim(e,t){let n=this.times,r=n.length,i=0,a=r-1;for(;i!==r&&n[i]<e;)++i;for(;a!==-1&&n[a]>t;)--a;if(++a,i!==0||a!==r){i>=a&&(a=Math.max(a,1),i=a-1);let e=this.getValueSize();this.times=n.slice(i,a),this.values=this.values.slice(i*e,a*e)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(B(`KeyframeTrack: Invalid value size in track.`,this),e=!1);let n=this.times,r=this.values,i=n.length;i===0&&(B(`KeyframeTrack: Track is empty.`,this),e=!1);let a=null;for(let t=0;t!==i;t++){let r=n[t];if(typeof r==`number`&&isNaN(r)){B(`KeyframeTrack: Time is not a valid number.`,this,t,r),e=!1;break}if(a!==null&&a>r){B(`KeyframeTrack: Out of order keys.`,this,t,r,a),e=!1;break}a=r}if(r!==void 0&&se(r))for(let t=0,n=r.length;t!==n;++t){let n=r[t];if(isNaN(n)){B(`KeyframeTrack: Value is not a valid number.`,this,t,n),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),r=this.getInterpolation()===N,i=e.length-1,a=1;for(let o=1;o<i;++o){let i=!1,s=e[o];if(s!==e[o+1]&&(o!==1||s!==e[0])){if(r)i=!0;else{let e=o*n,r=e-n,a=e+n;for(let o=0;o!==n;++o){let n=t[e+o];if(n!==t[r+o]||n!==t[a+o]){i=!0;break}}}}if(i){if(o!==a){e[a]=e[o];let r=o*n,i=a*n;for(let e=0;e!==n;++e)t[i+e]=t[r+e]}++a}}if(i>0){e[a]=e[i];for(let e=i*n,r=a*n,o=0;o!==n;++o)t[r+o]=t[e+o];++a}return a===e.length?(this.times=e,this.values=t):(this.times=e.slice(0,a),this.values=t.slice(0,a*n)),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,r=new n(this.name,e,t);return r.createInterpolant=this.createInterpolant,Or(this.settings)&&(r.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),r}};function Rr(e,t){for(let n=0,r=e.length;n!==r;n+=2)e[n]*=t}Lr.prototype.ValueTypeName=``,Lr.prototype.TimeBufferType=Float32Array,Lr.prototype.ValueBufferType=Float32Array,Lr.prototype.DefaultInterpolation=M;var zr=class extends Lr{constructor(e,t,n){super(e,t,n)}};zr.prototype.ValueTypeName=`bool`,zr.prototype.ValueBufferType=Array,zr.prototype.DefaultInterpolation=j,zr.prototype.InterpolantFactoryMethodLinear=void 0,zr.prototype.InterpolantFactoryMethodSmooth=void 0;var Br=class extends Lr{constructor(e,t,n,r){super(e,t,n,r)}};Br.prototype.ValueTypeName=`color`;var Vr=class extends Lr{constructor(e,t,n,r){super(e,t,n,r)}};Vr.prototype.ValueTypeName=`number`;var Hr=class extends kr{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=(n-t)/(r-t),c=e*o;for(let e=c+o;c!==e;c+=4)we.slerpFlat(i,0,a,c-o,a,c,s);return i}},Ur=class extends Lr{constructor(e,t,n,r){super(e,t,n,r)}InterpolantFactoryMethodLinear(e){return new Hr(this.times,this.values,this.getValueSize(),e)}};Ur.prototype.ValueTypeName=`quaternion`,Ur.prototype.InterpolantFactoryMethodSmooth=void 0;var Wr=class extends Lr{constructor(e,t,n){super(e,t,n)}};Wr.prototype.ValueTypeName=`string`,Wr.prototype.ValueBufferType=Array,Wr.prototype.DefaultInterpolation=j,Wr.prototype.InterpolantFactoryMethodLinear=void 0,Wr.prototype.InterpolantFactoryMethodSmooth=void 0;var Gr=class extends Lr{constructor(e,t,n,r){super(e,t,n,r)}};Gr.prototype.ValueTypeName=`vector`;var Kr=class extends ht{constructor(e,t=1){super(),this.isLight=!0,this.type=`Light`,this.color=new X(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},qr=class extends Kr{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type=`HemisphereLight`,this.position.copy(ht.DEFAULT_UP),this.updateMatrix(),this.groundColor=new X(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},Jr=new He,Yr=new U,Xr=new U,Zr=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new H(512,512),this.mapType=h,this.map=null,this.mapPass=null,this.matrix=new He,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new or,this._frameExtents=new H(1,1),this._viewportCount=1,this._viewports=[new Le(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera;Yr.setFromMatrixPosition(e.matrixWorld),t.position.copy(Yr),Xr.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Xr),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,n,r){Jr.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),n.setFromProjectionMatrix(Jr,e.coordinateSystem,e.reversedDepth);let i=this._frameExtents,a=r?r.z/i.x:1,o=r?r.w/i.y:1,s=r?r.x/i.x:0,c=r?r.y/i.y:0;e.coordinateSystem===2001||e.reversedDepth?t.set(.5*a,0,0,.5*a+s,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):t.set(.5*a,0,0,.5*a+s,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),t.multiply(Jr)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},Qr=new U,$r=new we,ei=new U,ti=class extends ht{constructor(){super(),this.isCamera=!0,this.type=`Camera`,this.matrixWorldInverse=new He,this.projectionMatrix=new He,this.projectionMatrixInverse=new He,this.coordinateSystem=ae,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Qr,$r,ei),ei.x===1&&ei.y===1&&ei.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Qr,$r,ei.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(Qr,$r,ei),ei.x===1&&ei.y===1&&ei.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Qr,$r,ei.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},ni=new U,ri=new H,ii=new H,ai=class extends ti{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type=`PerspectiveCamera`,this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=ve*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(_e*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return ve*2*Math.atan(Math.tan(_e*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){ni.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(ni.x,ni.y).multiplyScalar(-e/ni.z),ni.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(ni.x,ni.y).multiplyScalar(-e/ni.z)}getViewSize(e,t){return this.getViewBounds(e,ri,ii),t.subVectors(ii,ri)}setViewOffset(e,t,n,r,i,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(_e*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,i=-.5*r,a=this.view;if(this.view!==null&&this.view.enabled){let e=a.fullWidth,o=a.fullHeight;i+=a.offsetX*r/e,t-=a.offsetY*n/o,r*=a.width/e,n*=a.height/o}let o=this.filmOffset;o!==0&&(i+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(i,i+r,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},oi=class extends ti{constructor(e=-1,t=1,n=1,r=-1,i=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type=`OrthographicCamera`,this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=i,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,i,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2,i=n-e,a=n+e,o=r+t,s=r-t;if(this.view!==null&&this.view.enabled){let e=(this.right-this.left)/this.view.fullWidth/this.zoom,t=(this.top-this.bottom)/this.view.fullHeight/this.zoom;i+=e*this.view.offsetX,a=i+e*this.view.width,o-=t*this.view.offsetY,s=o-t*this.view.height}this.projectionMatrix.makeOrthographic(i,a,o,s,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},si=class extends Zr{constructor(){super(new oi(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},ci=class extends Kr{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type=`DirectionalLight`,this.position.copy(ht.DEFAULT_UP),this.updateMatrix(),this.target=new ht,this.shadow=new si}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}},li=-90,ui=1,di=class extends ht{constructor(e,t,n){super(),this.type=`CubeCamera`,this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new ai(li,ui,e,t);r.layers=this.layers,this.add(r);let i=new ai(li,ui,e,t);i.layers=this.layers,this.add(i);let a=new ai(li,ui,e,t);a.layers=this.layers,this.add(a);let o=new ai(li,ui,e,t);o.layers=this.layers,this.add(o);let s=new ai(li,ui,e,t);s.layers=this.layers,this.add(s);let c=new ai(li,ui,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,r,i,a,o,s]=t;for(let e of t)this.remove(e);if(e===2e3)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),i.up.set(0,0,-1),i.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),s.up.set(0,1,0),s.lookAt(0,0,-1);else if(e===2001)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),i.up.set(0,0,1),i.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),s.up.set(0,-1,0),s.lookAt(0,0,-1);else throw Error(`THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: `+e);for(let e of t)this.add(e),e.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[i,a,o,s,c,l]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;let m=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let h=!1;h=e.isWebGLRenderer===!0?e.state.buffers.depth.getReversed():e.reversedDepthBuffer,e.setRenderTarget(n,0,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,i),e.setRenderTarget(n,1,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(n,4,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.generateMipmaps=m,e.setRenderTarget(n,5,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(u,d,f),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}},fi=class extends ai{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}},pi=class{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(e){this._document=e,e.hidden!==void 0&&(this._pageVisibilityHandler=mi.bind(this),e.addEventListener(`visibilitychange`,this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener(`visibilitychange`,this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(e){return this._timescale=e,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(e){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(e===void 0?performance.now():e)-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}};function mi(){this._document.hidden===!1&&this.reset()}var hi=`\\[\\]\\.:\\/`,gi=RegExp(`[\\[\\]\\.:\\/]`,`g`),_i=`[^\\[\\]\\.:\\/]`,vi=`[^`+hi.replace(`\\.`,``)+`]`,yi=`((?:WC+[\\/:])*)`.replace(`WC`,_i),bi=`(WCOD+)?`.replace(`WCOD`,vi),xi=`(?:\\.(WC+)(?:\\[(.+)\\])?)?`.replace(`WC`,_i),Si=`\\.(WC+)(?:\\[(.+)\\])?`.replace(`WC`,_i),Ci=RegExp(`^`+yi+bi+xi+Si+`$`),wi=[`material`,`materials`,`bones`,`map`],Ti=class{constructor(e,t,n){let r=n||Ei.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,r=this._bindings[n];r!==void 0&&r.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let r=this._targetGroup.nCachedObjects_,i=n.length;r!==i;++r)n[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},Ei=class e{constructor(t,n,r){this.path=n,this.parsedPath=r||e.parseTrackName(n),this.node=e.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,n,r){return t&&t.isAnimationObjectGroup?new e.Composite(t,n,r):new e(t,n,r)}static sanitizeNodeName(e){return e.replace(/\s/g,`_`).replace(gi,``)}static parseTrackName(e){let t=Ci.exec(e);if(t===null)throw Error(`THREE.PropertyBinding: Cannot parse trackName: `+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=n.nodeName&&n.nodeName.lastIndexOf(`.`);if(r!==void 0&&r!==-1){let e=n.nodeName.substring(r+1);wi.indexOf(e)!==-1&&(n.nodeName=n.nodeName.substring(0,r),n.objectName=e)}if(n.propertyName===null||n.propertyName.length===0)throw Error(`THREE.PropertyBinding: can not parse propertyName from trackName: `+e);return n}static findNode(e,t){if(t===void 0||t===``||t===`.`||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(e){for(let r=0;r<e.length;r++){let i=e[r];if(i.name===t||i.uuid===t)return i;let a=n(i.children);if(a)return a}return null},r=n(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)e[t++]=n[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let t=this.node,n=this.parsedPath,r=n.objectName,i=n.propertyName,a=n.propertyIndex;if(t||(t=e.findNode(this.rootNode,n.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){z(`PropertyBinding: No target node found for track: `+this.path+`.`);return}if(r){let e=n.objectIndex;switch(r){case`materials`:if(!t.material){B(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.materials){B(`PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.`,this);return}t=t.material.materials;break;case`bones`:if(!t.skeleton){B(`PropertyBinding: Can not bind to bones as node does not have a skeleton.`,this);return}t=t.skeleton.bones;for(let n=0;n<t.length;n++)if(t[n].name===e){e=n;break}break;case`map`:if(`map`in t){t=t.map;break}if(!t.material){B(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.map){B(`PropertyBinding: Can not bind to material.map as node.material does not have a map.`,this);return}t=t.material.map;break;default:if(t[r]===void 0){B(`PropertyBinding: Can not bind to objectName of node undefined.`,this);return}t=t[r]}if(e!==void 0){if(t[e]===void 0){B(`PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.`,this,t);return}t=t[e]}}let o=t[i];if(o===void 0){let e=n.nodeName;B(`PropertyBinding: Trying to update property for track: `+e+`.`+i+` but it wasn't found.`,t);return}let s=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?s=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(s=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(a!==void 0){if(i===`morphTargetInfluences`){if(!t.geometry){B(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.`,this);return}if(!t.geometry.morphAttributes){B(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.`,this);return}t.morphTargetDictionary[a]!==void 0&&(a=t.morphTargetDictionary[a])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=a}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][s]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Ei.Composite=Ti,Ei.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3},Ei.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2},Ei.prototype.GetterByBindingType=[Ei.prototype._getValue_direct,Ei.prototype._getValue_array,Ei.prototype._getValue_arrayElement,Ei.prototype._getValue_toArray],Ei.prototype.SetterByBindingTypeAndVersioning=[[Ei.prototype._setValue_direct,Ei.prototype._setValue_direct_setNeedsUpdate,Ei.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Ei.prototype._setValue_array,Ei.prototype._setValue_array_setNeedsUpdate,Ei.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Ei.prototype._setValue_arrayElement,Ei.prototype._setValue_arrayElement_setNeedsUpdate,Ei.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Ei.prototype._setValue_fromArray,Ei.prototype._setValue_fromArray_setNeedsUpdate,Ei.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]],a=class{constructor(e,t,n,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,r){let i=this.elements;return i[0]=e,i[2]=t,i[1]=n,i[3]=r,this}},a.prototype.isMatrix2=!0;function Di(e,t,n,r){let i=Oi(r);switch(n){case 1021:return e*t;case E:return e*t/i.components*i.byteLength;case D:return e*t/i.components*i.byteLength;case O:return e*t*2/i.components*i.byteLength;case k:return e*t*2/i.components*i.byteLength;case 1022:return e*t*3/i.components*i.byteLength;case C:return e*t*4/i.components*i.byteLength;case A:return e*t*4/i.components*i.byteLength;case 33776:case 33777:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case 33778:case 33779:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case 35841:case 35843:return Math.max(e,16)*Math.max(t,8)/4;case 35840:case 35842:return Math.max(e,8)*Math.max(t,8)/2;case 36196:case 37492:case 37488:case 37489:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case 37496:case 37490:case 37491:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case 37808:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case 37809:return Math.floor((e+4)/5)*Math.floor((t+3)/4)*16;case 37810:return Math.floor((e+4)/5)*Math.floor((t+4)/5)*16;case 37811:return Math.floor((e+5)/6)*Math.floor((t+4)/5)*16;case 37812:return Math.floor((e+5)/6)*Math.floor((t+5)/6)*16;case 37813:return Math.floor((e+7)/8)*Math.floor((t+4)/5)*16;case 37814:return Math.floor((e+7)/8)*Math.floor((t+5)/6)*16;case 37815:return Math.floor((e+7)/8)*Math.floor((t+7)/8)*16;case 37816:return Math.floor((e+9)/10)*Math.floor((t+4)/5)*16;case 37817:return Math.floor((e+9)/10)*Math.floor((t+5)/6)*16;case 37818:return Math.floor((e+9)/10)*Math.floor((t+7)/8)*16;case 37819:return Math.floor((e+9)/10)*Math.floor((t+9)/10)*16;case 37820:return Math.floor((e+11)/12)*Math.floor((t+9)/10)*16;case 37821:return Math.floor((e+11)/12)*Math.floor((t+11)/12)*16;case 36492:case 36494:case 36495:return Math.ceil(e/4)*Math.ceil(t/4)*16;case 36283:case 36284:return Math.ceil(e/4)*Math.ceil(t/4)*8;case 36285:case 36286:return Math.ceil(e/4)*Math.ceil(t/4)*16}throw Error(`Unable to determine texture byte length for ${n} format.`)}function Oi(e){switch(e){case h:case 1010:return{byteLength:1,components:1};case g:case 1011:case y:return{byteLength:2,components:1};case b:case x:return{byteLength:2,components:4};case _:case 1013:case v:return{byteLength:4,components:1};case 35902:case 35899:return{byteLength:4,components:3}}throw Error(`THREE.TextureUtils: Unknown texture type ${e}.`)}typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`register`,{detail:{revision:`186`}})),typeof window<`u`&&(window.__THREE__?z(`WARNING: Multiple instances of Three.js being imported.`):window.__THREE__=`186`);function ki(){let e=null,t=!1,n=null,r=null;function i(t,a){r=e.requestAnimationFrame(i),n(t,a)}return{start:function(){t!==!0&&n!==null&&e!==null&&(r=e.requestAnimationFrame(i),t=!0)},stop:function(){e!==null&&e.cancelAnimationFrame(r),t=!1},setAnimationLoop:function(e){n=e},setContext:function(t){e=t}}}function Ai(e){let t=new WeakMap;function n(t,n){let r=t.array,i=t.usage,a=r.byteLength,o=e.createBuffer();e.bindBuffer(n,o),e.bufferData(n,r,i),t.onUploadCallback();let s;if(r instanceof Float32Array)s=e.FLOAT;else if(typeof Float16Array<`u`&&r instanceof Float16Array)s=e.HALF_FLOAT;else if(r instanceof Uint16Array)s=t.isFloat16BufferAttribute?e.HALF_FLOAT:e.UNSIGNED_SHORT;else if(r instanceof Int16Array)s=e.SHORT;else if(r instanceof Uint32Array)s=e.UNSIGNED_INT;else if(r instanceof Int32Array)s=e.INT;else if(r instanceof Int8Array)s=e.BYTE;else if(r instanceof Uint8Array)s=e.UNSIGNED_BYTE;else if(r instanceof Uint8ClampedArray)s=e.UNSIGNED_BYTE;else throw Error(`THREE.WebGLAttributes: Unsupported buffer data format: `+r);return{buffer:o,type:s,bytesPerElement:r.BYTES_PER_ELEMENT,version:t.version,size:a}}function r(t,n,r){let i=n.array,a=n.updateRanges;if(e.bindBuffer(r,t),a.length===0)e.bufferSubData(r,0,i);else{a.sort((e,t)=>e.start-t.start);let t=0;for(let e=1;e<a.length;e++){let n=a[t],r=a[e];r.start<=n.start+n.count+1?n.count=Math.max(n.count,r.start+r.count-n.start):(++t,a[t]=r)}a.length=t+1;for(let t=0,n=a.length;t<n;t++){let n=a[t];e.bufferSubData(r,n.start*i.BYTES_PER_ELEMENT,i,n.start,n.count)}n.clearUpdateRanges()}n.onUploadCallback()}function i(e){return e.isInterleavedBufferAttribute&&(e=e.data),t.get(e)}function a(n){n.isInterleavedBufferAttribute&&(n=n.data);let r=t.get(n);r&&(e.deleteBuffer(r.buffer),t.delete(n))}function o(e,i){if(e.isInterleavedBufferAttribute&&(e=e.data),e.isGLBufferAttribute){let n=t.get(e);(!n||n.version<e.version)&&t.set(e,{buffer:e.buffer,type:e.type,bytesPerElement:e.elementSize,version:e.version});return}let a=t.get(e);if(a===void 0)t.set(e,n(e,i));else if(a.version<e.version){if(a.size!==e.array.byteLength)throw Error(`THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.`);r(a.buffer,e,i),a.version=e.version}}return{get:i,remove:a,update:o}}var Z={alphahash_fragment:`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,alphahash_pars_fragment:`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,alphamap_fragment:`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,alphamap_pars_fragment:`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,alphatest_fragment:`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,alphatest_pars_fragment:`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,aomap_fragment:`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,aomap_pars_fragment:`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,batching_pars_vertex:`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,batching_vertex:`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,begin_vertex:`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,beginnormal_vertex:`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,bsdfs:`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,iridescence_fragment:`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,bumpmap_pars_fragment:`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,clipping_planes_fragment:`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,clipping_planes_pars_fragment:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,clipping_planes_pars_vertex:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,clipping_planes_vertex:`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,color_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,color_pars_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,color_pars_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,color_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,common:`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,cube_uv_reflection_fragment:`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,defaultnormal_vertex:`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,displacementmap_pars_vertex:`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,displacementmap_vertex:`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,emissivemap_fragment:`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,emissivemap_pars_fragment:`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,colorspace_fragment:`gl_FragColor = linearToOutputTexel( gl_FragColor );`,colorspace_pars_fragment:`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,envmap_fragment:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,envmap_common_pars_fragment:`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,envmap_pars_fragment:`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,envmap_pars_vertex:`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,envmap_physical_pars_fragment:`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,envmap_vertex:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,fog_vertex:`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,fog_pars_vertex:`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,fog_fragment:`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,fog_pars_fragment:`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,gradientmap_pars_fragment:`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,lightmap_pars_fragment:`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,lights_lambert_fragment:`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,lights_lambert_pars_fragment:`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,lights_pars_begin:`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,lights_toon_fragment:`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,lights_toon_pars_fragment:`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,lights_phong_fragment:`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,lights_phong_pars_fragment:`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,lights_physical_fragment:`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,lights_physical_pars_fragment:`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,lights_fragment_begin:`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,lights_fragment_maps:`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,lights_fragment_end:`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,lightprobes_pars_fragment:`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,logdepthbuf_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,logdepthbuf_pars_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_pars_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,map_fragment:`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,map_pars_fragment:`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,map_particle_fragment:`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,map_particle_pars_fragment:`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,metalnessmap_fragment:`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,metalnessmap_pars_fragment:`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,morphinstance_vertex:`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,morphcolor_vertex:`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,morphnormal_vertex:`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,morphtarget_pars_vertex:`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,morphtarget_vertex:`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,normal_fragment_begin:`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,normal_fragment_maps:`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,normal_pars_fragment:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_pars_vertex:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_vertex:`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,normalmap_pars_fragment:`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,clearcoat_normal_fragment_begin:`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,clearcoat_normal_fragment_maps:`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,clearcoat_pars_fragment:`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,iridescence_pars_fragment:`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,opaque_fragment:`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,packing:`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,premultiplied_alpha_fragment:`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,project_vertex:`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,dithering_fragment:`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,dithering_pars_fragment:`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,roughnessmap_fragment:`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,roughnessmap_pars_fragment:`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,shadowmap_pars_fragment:`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,shadowmap_pars_vertex:`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,shadowmap_vertex:`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,shadowmask_pars_fragment:`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,skinbase_vertex:`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,skinning_pars_vertex:`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,skinning_vertex:`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,skinnormal_vertex:`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,specularmap_fragment:`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,specularmap_pars_fragment:`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,tonemapping_fragment:`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,tonemapping_pars_fragment:`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,transmission_fragment:`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,transmission_pars_fragment:`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,uv_pars_fragment:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_pars_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,worldpos_vertex:`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,background_vert:`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,background_frag:`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,backgroundCube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,backgroundCube_frag:`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cube_frag:`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,depth_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,depth_frag:`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,distance_vert:`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,distance_frag:`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,equirect_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,equirect_frag:`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,linedashed_vert:`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,linedashed_frag:`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,meshbasic_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,meshbasic_frag:`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshlambert_vert:`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshlambert_frag:`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshmatcap_vert:`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,meshmatcap_frag:`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshnormal_vert:`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,meshnormal_frag:`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,meshphong_vert:`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshphong_frag:`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshphysical_vert:`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,meshphysical_frag:`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshtoon_vert:`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshtoon_frag:`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,points_vert:`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,points_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,shadow_vert:`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,shadow_frag:`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,sprite_vert:`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,sprite_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`},Q={common:{diffuse:{value:new X(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new W},alphaMap:{value:null},alphaMapTransform:{value:new W},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new W}},envmap:{envMap:{value:null},envMapRotation:{value:new W},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new W}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new W}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new W},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new W},normalScale:{value:new H(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new W},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new W}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new W}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new W}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new X(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new U},probesMax:{value:new U},probesResolution:{value:new U}},points:{diffuse:{value:new X(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new W},alphaTest:{value:0},uvTransform:{value:new W}},sprite:{diffuse:{value:new X(16777215)},opacity:{value:1},center:{value:new H(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new W},alphaMap:{value:null},alphaMapTransform:{value:new W},alphaTest:{value:0}}},ji={basic:{uniforms:hr([Q.common,Q.specularmap,Q.envmap,Q.aomap,Q.lightmap,Q.fog]),vertexShader:Z.meshbasic_vert,fragmentShader:Z.meshbasic_frag},lambert:{uniforms:hr([Q.common,Q.specularmap,Q.envmap,Q.aomap,Q.lightmap,Q.emissivemap,Q.bumpmap,Q.normalmap,Q.displacementmap,Q.fog,Q.lights,{emissive:{value:new X(0)},envMapIntensity:{value:1}}]),vertexShader:Z.meshlambert_vert,fragmentShader:Z.meshlambert_frag},phong:{uniforms:hr([Q.common,Q.specularmap,Q.envmap,Q.aomap,Q.lightmap,Q.emissivemap,Q.bumpmap,Q.normalmap,Q.displacementmap,Q.fog,Q.lights,{emissive:{value:new X(0)},specular:{value:new X(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Z.meshphong_vert,fragmentShader:Z.meshphong_frag},standard:{uniforms:hr([Q.common,Q.envmap,Q.aomap,Q.lightmap,Q.emissivemap,Q.bumpmap,Q.normalmap,Q.displacementmap,Q.roughnessmap,Q.metalnessmap,Q.fog,Q.lights,{emissive:{value:new X(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Z.meshphysical_vert,fragmentShader:Z.meshphysical_frag},toon:{uniforms:hr([Q.common,Q.aomap,Q.lightmap,Q.emissivemap,Q.bumpmap,Q.normalmap,Q.displacementmap,Q.gradientmap,Q.fog,Q.lights,{emissive:{value:new X(0)}}]),vertexShader:Z.meshtoon_vert,fragmentShader:Z.meshtoon_frag},matcap:{uniforms:hr([Q.common,Q.bumpmap,Q.normalmap,Q.displacementmap,Q.fog,{matcap:{value:null}}]),vertexShader:Z.meshmatcap_vert,fragmentShader:Z.meshmatcap_frag},points:{uniforms:hr([Q.points,Q.fog]),vertexShader:Z.points_vert,fragmentShader:Z.points_frag},dashed:{uniforms:hr([Q.common,Q.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Z.linedashed_vert,fragmentShader:Z.linedashed_frag},depth:{uniforms:hr([Q.common,Q.displacementmap]),vertexShader:Z.depth_vert,fragmentShader:Z.depth_frag},normal:{uniforms:hr([Q.common,Q.bumpmap,Q.normalmap,Q.displacementmap,{opacity:{value:1}}]),vertexShader:Z.meshnormal_vert,fragmentShader:Z.meshnormal_frag},sprite:{uniforms:hr([Q.sprite,Q.fog]),vertexShader:Z.sprite_vert,fragmentShader:Z.sprite_frag},background:{uniforms:{uvTransform:{value:new W},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Z.background_vert,fragmentShader:Z.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new W}},vertexShader:Z.backgroundCube_vert,fragmentShader:Z.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Z.cube_vert,fragmentShader:Z.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Z.equirect_vert,fragmentShader:Z.equirect_frag},distance:{uniforms:hr([Q.common,Q.displacementmap,{referencePosition:{value:new U},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Z.distance_vert,fragmentShader:Z.distance_frag},shadow:{uniforms:hr([Q.lights,Q.fog,{color:{value:new X(0)},opacity:{value:1}}]),vertexShader:Z.shadow_vert,fragmentShader:Z.shadow_frag}};ji.physical={uniforms:hr([ji.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new W},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new W},clearcoatNormalScale:{value:new H(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new W},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new W},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new W},sheen:{value:0},sheenColor:{value:new X(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new W},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new W},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new W},transmissionSamplerSize:{value:new H},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new W},attenuationDistance:{value:0},attenuationColor:{value:new X(0)},specularColor:{value:new X(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new W},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new W},anisotropyVector:{value:new H},anisotropyMap:{value:null},anisotropyMapTransform:{value:new W}}]),vertexShader:Z.meshphysical_vert,fragmentShader:Z.meshphysical_frag};var Mi={r:0,b:0,g:0},Ni=new He,Pi=new W;Pi.set(-1,0,0,0,1,0,0,0,1);function Fi(e,t,n,r,i,a){let o=new X(0),s=i===!0?0:1,c,l,u=null,d=0,f=null;function p(e){let n=e.isScene===!0?e.background:null;if(n&&n.isTexture){let r=e.backgroundBlurriness>0;n=t.get(n,r)}return n}function m(t){let r=!1,i=p(t);i===null?g(o,s):i&&i.isColor&&(g(i,1),r=!0);let c=e.xr.getEnvironmentBlendMode();c===`additive`?n.buffers.color.setClear(0,0,0,1,a):c===`alpha-blend`&&n.buffers.color.setClear(0,0,0,0,a),(e.autoClear||r)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function h(t,n){let i=p(n);i&&(i.isCubeTexture||i.mapping===306)?(l===void 0&&(l=new Wn(new dr(1,1,1),new Sr({name:`BackgroundCubeMaterial`,uniforms:mr(ji.backgroundCube.uniforms),vertexShader:ji.backgroundCube.vertexShader,fragmentShader:ji.backgroundCube.fragmentShader,side:1,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute(`normal`),l.geometry.deleteAttribute(`uv`),l.onBeforeRender=function(e,t,n){this.matrixWorld.copyPosition(n.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(l)),l.material.uniforms.envMap.value=i,l.material.uniforms.backgroundBlurriness.value=n.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(Ni.makeRotationFromEuler(n.backgroundRotation)).transpose(),i.isCubeTexture&&i.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(Pi),l.material.toneMapped=G.getTransfer(i.colorSpace)!==re,(u!==i||d!==i.version||f!==e.toneMapping)&&(l.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),l.layers.enableAll(),t.unshift(l,l.geometry,l.material,0,0,null)):i&&i.isTexture&&(c===void 0&&(c=new Wn(new pr(2,2),new Sr({name:`BackgroundMaterial`,uniforms:mr(ji.background.uniforms),vertexShader:ji.background.vertexShader,fragmentShader:ji.background.fragmentShader,side:0,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute(`normal`),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=i,c.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,c.material.toneMapped=G.getTransfer(i.colorSpace)!==re,i.matrixAutoUpdate===!0&&i.updateMatrix(),c.material.uniforms.uvTransform.value.copy(i.matrix),(u!==i||d!==i.version||f!==e.toneMapping)&&(c.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),c.layers.enableAll(),t.unshift(c,c.geometry,c.material,0,0,null))}function g(t,r){t.getRGB(Mi,vr(e)),n.buffers.color.setClear(Mi.r,Mi.g,Mi.b,r,a)}function _(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(e,t=1){o.set(e),s=t,g(o,s)},getClearAlpha:function(){return s},setClearAlpha:function(e){s=e,g(o,s)},render:m,addToRenderList:h,dispose:_}}function Ii(e,t){let n=e.getParameter(e.MAX_VERTEX_ATTRIBS),r={},i=f(null),a=i,o=!1;function s(n,r,i,s,c){let u=!1,f=d(n,s,i,r);a!==f&&(a=f,l(a.object)),u=p(n,s,i,c),u&&m(n,s,i,c),c!==null&&t.update(c,e.ELEMENT_ARRAY_BUFFER),(u||o)&&(o=!1,b(n,r,i,s),c!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t.get(c).buffer))}function c(){return e.createVertexArray()}function l(t){return e.bindVertexArray(t)}function u(t){return e.deleteVertexArray(t)}function d(e,t,n,i){let a=i.wireframe===!0,o=r[t.id];o===void 0&&(o={},r[t.id]=o);let s=e.isInstancedMesh===!0?e.id:0,l=o[s];l===void 0&&(l={},o[s]=l);let u=l[n.id];u===void 0&&(u={},l[n.id]=u);let d=u[a];return d===void 0&&(d=f(c()),u[a]=d),d}function f(e){let t=[],r=[],i=[];for(let e=0;e<n;e++)t[e]=0,r[e]=0,i[e]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:t,enabledAttributes:r,attributeDivisors:i,object:e,attributes:{},index:null}}function p(e,t,n,r){let i=a.attributes,o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=i[t],r=o[t];if(r===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(r=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(r=e.instanceColor)),n===void 0||n.attribute!==r||r&&n.data!==r.data)return!0;s++}return a.attributesNum!==s||a.index!==r}function m(e,t,n,r){let i={},o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=o[t];n===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(n=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(n=e.instanceColor));let r={};r.attribute=n,n&&n.data&&(r.data=n.data),i[t]=r,s++}a.attributes=i,a.attributesNum=s,a.index=r}function h(){let e=a.newAttributes;for(let t=0,n=e.length;t<n;t++)e[t]=0}function g(e){_(e,0)}function _(t,n){let r=a.newAttributes,i=a.enabledAttributes,o=a.attributeDivisors;r[t]=1,i[t]===0&&(e.enableVertexAttribArray(t),i[t]=1),o[t]!==n&&(e.vertexAttribDivisor(t,n),o[t]=n)}function v(){let t=a.newAttributes,n=a.enabledAttributes;for(let r=0,i=n.length;r<i;r++)n[r]!==t[r]&&(e.disableVertexAttribArray(r),n[r]=0)}function y(t,n,r,i,a,o,s){s===!0?e.vertexAttribIPointer(t,n,r,a,o):e.vertexAttribPointer(t,n,r,i,a,o)}function b(n,r,i,a){h();let o=a.attributes,s=i.getAttributes(),c=r.defaultAttributeValues;for(let r in s){let i=s[r];if(i.location>=0){let s=o[r];if(s===void 0&&(r===`instanceMatrix`&&n.instanceMatrix&&(s=n.instanceMatrix),r===`instanceColor`&&n.instanceColor&&(s=n.instanceColor)),s!==void 0){let r=s.normalized,o=s.itemSize,c=t.get(s);if(c===void 0)continue;let l=c.buffer,u=c.type,d=c.bytesPerElement,f=u===e.INT||u===e.UNSIGNED_INT||s.gpuType===1013;if(s.isInterleavedBufferAttribute){let t=s.data,c=t.stride,p=s.offset;if(t.isInstancedInterleavedBuffer){for(let e=0;e<i.locationSize;e++)_(i.location+e,t.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=t.meshPerAttribute*t.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,c*d,(p+o/i.locationSize*e)*d,f)}else{if(s.isInstancedBufferAttribute){for(let e=0;e<i.locationSize;e++)_(i.location+e,s.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=s.meshPerAttribute*s.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,o*d,o/i.locationSize*e*d,f)}}else if(c!==void 0){let t=c[r];if(t!==void 0)switch(t.length){case 2:e.vertexAttrib2fv(i.location,t);break;case 3:e.vertexAttrib3fv(i.location,t);break;case 4:e.vertexAttrib4fv(i.location,t);break;default:e.vertexAttrib1fv(i.location,t)}}}}v()}function x(){T();for(let e in r){let t=r[e];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e]}}function S(e){if(r[e.id]===void 0)return;let t=r[e.id];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e.id]}function C(e){for(let t in r){let n=r[t];for(let t in n){let r=n[t];if(r[e.id]===void 0)continue;let i=r[e.id];for(let e in i)u(i[e].object),delete i[e];delete r[e.id]}}}function w(e){for(let t in r){let n=r[t],i=e.isInstancedMesh===!0?e.id:0,a=n[i];if(a!==void 0){for(let e in a){let t=a[e];for(let e in t)u(t[e].object),delete t[e];delete a[e]}delete n[i],Object.keys(n).length===0&&delete r[t]}}}function T(){E(),o=!0,a!==i&&(a=i,l(a.object))}function E(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:s,reset:T,resetDefaultState:E,dispose:x,releaseStatesOfGeometry:S,releaseStatesOfObject:w,releaseStatesOfProgram:C,initAttributes:h,enableAttribute:g,disableUnusedAttributes:v}}function Li(e,t,n){let r;function i(e){r=e}function a(t,i){e.drawArrays(r,t,i),n.update(i,r,1)}function o(t,i,a){a!==0&&(e.drawArraysInstanced(r,t,i,a),n.update(i,r,a))}function s(e,i,a){if(a===0)return;t.get(`WEBGL_multi_draw`).multiDrawArraysWEBGL(r,e,0,i,0,a);let o=0;for(let e=0;e<a;e++)o+=i[e];n.update(o,r,1)}this.setMode=i,this.render=a,this.renderInstances=o,this.renderMultiDraw=s}function Ri(e,t,n,r){let i;function a(){if(i!==void 0)return i;if(t.has(`EXT_texture_filter_anisotropic`)===!0){let n=t.get(`EXT_texture_filter_anisotropic`);i=e.getParameter(n.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(t){return t===1023||r.convert(t)===e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT)}function s(n){let i=n===1016&&(t.has(`EXT_color_buffer_half_float`)||t.has(`EXT_color_buffer_float`));return!(n!==1009&&n!==1015&&!i&&r.convert(n)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE))}function c(t){if(t===`highp`){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return`highp`;t=`mediump`}return t===`mediump`&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?`mediump`:`lowp`}let l=n.precision===void 0?`highp`:n.precision,u=c(l);u!==l&&(z(`WebGLRenderer:`,l,`not supported, using`,u,`instead.`),l=u);let d=n.logarithmicDepthBuffer===!0,f=n.reversedDepthBuffer===!0&&t.has(`EXT_clip_control`);n.reversedDepthBuffer===!0&&f===!1&&z(`WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.`);let p=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),m=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),h=e.getParameter(e.MAX_TEXTURE_SIZE),g=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),_=e.getParameter(e.MAX_VERTEX_ATTRIBS),v=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),y=e.getParameter(e.MAX_VARYING_VECTORS),b=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),x=e.getParameter(e.MAX_SAMPLES),S=e.getParameter(e.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:s,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:f,maxTextures:p,maxVertexTextures:m,maxTextureSize:h,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:v,maxVaryings:y,maxFragmentUniforms:b,maxSamples:x,samples:S}}function zi(e){let t=this,n=null,r=0,i=!1,a=!1,o=new wn,s=new W,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(e,t){let n=e.length!==0||t||r!==0||i;return i=t,r=e.length,n},this.beginShadows=function(){a=!0,u(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(e,t){n=u(e,t,0)},this.setState=function(t,o,s){let d=t.clippingPlanes,f=t.clipIntersection,p=t.clipShadows,m=e.get(t);if(!i||d===null||d.length===0||a&&!p)a?u(null):l();else{let e=a?0:r,t=e*4,i=m.clippingState||null;c.value=i,i=u(d,o,t,s);for(let e=0;e!==t;++e)i[e]=n[e];m.clippingState=i,this.numIntersection=f?this.numPlanes:0,this.numPlanes+=e}};function l(){c.value!==n&&(c.value=n,c.needsUpdate=r>0),t.numPlanes=r,t.numIntersection=0}function u(e,n,r,i){let a=e===null?0:e.length,l=null;if(a!==0){if(l=c.value,i!==!0||l===null){let t=r+a*4,i=n.matrixWorldInverse;s.getNormalMatrix(i),(l===null||l.length<t)&&(l=new Float32Array(t));for(let t=0,n=r;t!==a;++t,n+=4)o.copy(e[t]).applyMatrix4(i,s),o.normal.toArray(l,n),l[n+3]=o.constant}c.value=l,c.needsUpdate=!0}return t.numPlanes=a,t.numIntersection=0,l}}var Bi=4,Vi=6,Hi=20,Ui=256,Wi=new oi,Gi=new X,Ki=null,qi=0,Ji=0,Yi=!1,Xi=new U,Zi=new U,Qi=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,r=100,i={}){let{size:a=256,position:o=Xi}=i;Ki=this._renderer.getRenderTarget(),qi=this._renderer.getActiveCubeFace(),Ji=this._renderer.getActiveMipmapLevel(),Yi=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,n,r,s,o),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=aa(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=ia(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=2**this._lodMax}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Ki,qi,Ji),this._renderer.xr.enabled=Yi,e.scissorTest=!1,ta(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===301||e.mapping===302?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Ki=this._renderer.getRenderTarget(),qi=this._renderer.getActiveCubeFace(),Ji=this._renderer.getActiveMipmapLevel(),Yi=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:p,minFilter:p,generateMipmaps:!1,type:y,format:C,colorSpace:L,depthBuffer:!1},r=ea(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=ea(e,t,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=$i(r)),this._blurMaterial=ra(r,e,t),this._ggxMaterial=na(r,e,t)}return r}_compileMaterial(e){let t=new Wn(new bn,e);this._renderer.compile(t,Wi)}_sceneToCubeUV(e,t,n,r,i){let a=new ai(90,1,t,n),o=[1,-1,1,1,1,1],s=[1,1,1,-1,-1,-1],c=this._renderer,l=c.autoClear,u=c.toneMapping;c.getClearColor(Gi),c.toneMapping=0,c.autoClear=!1,c.state.buffers.depth.getReversed()&&(c.setRenderTarget(r),c.clearDepth(),c.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Wn(new dr,new Mn({name:`PMREM.Background`,side:1,depthWrite:!1,depthTest:!1})));let d=this._backgroundBox,f=d.material,p=!1,m=e.background;m?m.isColor&&(f.color.copy(m),e.background=null,p=!0):(f.color.copy(Gi),p=!0);for(let t=0;t<6;t++){let n=t%3;n===0?(a.up.set(0,o[t],0),a.position.set(i.x,i.y,i.z),a.lookAt(i.x+s[t],i.y,i.z)):n===1?(a.up.set(0,0,o[t]),a.position.set(i.x,i.y,i.z),a.lookAt(i.x,i.y+s[t],i.z)):(a.up.set(0,o[t],0),a.position.set(i.x,i.y,i.z),a.lookAt(i.x,i.y,i.z+s[t]));let l=this._cubeSize;ta(r,n*l,t>2?l:0,l,l),c.setRenderTarget(r),p&&c.render(d,a),c.render(e,a)}c.toneMapping=u,c.autoClear=l,e.background=m}_textureToCubeUV(e,t){let n=this._renderer,r=e.mapping===301||e.mapping===302;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=aa()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=ia());let i=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=i;let o=i.uniforms;o.envMap.value=e;let s=this._cubeSize;ta(t,0,0,3*s,2*s),n.setRenderTarget(t),n.render(a,Wi)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let r=this._lodMeshes.length;for(let t=1;t<r;t++)this._applyGGXFilter(e,t-1,t);t.autoClear=n}_applyGGXFilter(e,t,n){let r=this._renderer,i=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;let s=a.uniforms,c=n/(this._lodMeshes.length-1),l=t/(this._lodMeshes.length-1),u=Math.sqrt(c*c-l*l)*(c*1.25),{_lodMax:d}=this,f=this._sizeLods[n],p=3*f*(n>d-Bi?n-d+Bi:0),m=4*(this._cubeSize-f);s.envMap.value=e.texture,s.roughness.value=u,s.mipInt.value=d-t,ta(i,p,m,3*f,2*f),r.setRenderTarget(i),r.render(o,Wi),s.envMap.value=i.texture,s.roughness.value=0,s.mipInt.value=d-n,ta(e,p,m,3*f,2*f),r.setRenderTarget(e),r.render(o,Wi)}_blur(e,t,n,r){let i=this._pingPongRenderTarget,a=Math.min(r,Math.PI)/Math.SQRT2;this._blurPass(e,i,t,n,a),this._blurPass(i,e,n,n,a)}_blurPass(e,t,n,r,i){let a=this._renderer,o=this._blurMaterial,s=this._lodMeshes[r];s.material=o;let c=o.uniforms;c.envMap.value=e.texture,c.sigma.value=i,c.mipInt.value=this._lodMax-n;let l=this._sizeLods[r];ta(t,3*l*(r>this._lodMax-Bi?r-this._lodMax+Bi:0),4*(this._cubeSize-l),3*l,2*l),a.setRenderTarget(t),a.render(s,Wi)}};function $i(e){let t=[],n=[],r=e,i=e-Bi+1+Vi;for(let e=0;e<i;e++){let e=2**r;t.push(e);let i=1/(e-2),a=-i,o=1+i,s=[a,a,o,a,o,o,a,a,o,o,a,o],c=new Float32Array(108),l=new Float32Array(108);for(let e=0;e<6;e++){let t=e%3*2/3-1,n=e>2?0:-1,r=[t,n,0,t+2/3,n,0,t+2/3,n+1,0,t,n,0,t+2/3,n+1,0,t,n+1,0];c.set(r,18*e);for(let t=0;t<6;t++){let n=s[t*2]*2-1,r=s[t*2+1]*2-1;e===0?Zi.set(1,r,n):e===1?Zi.set(-n,1,-r):e===2?Zi.set(-n,r,1):e===3?Zi.set(-1,r,-n):e===4?Zi.set(-n,-1,r):Zi.set(n,r,-1),Zi.toArray(l,(e*6+t)*3)}}let u=new bn;u.setAttribute(`position`,new an(c,3)),u.setAttribute(`outputDirection`,new an(l,3)),n.push(new Wn(u,null)),r>Bi&&r--}return{lodMeshes:n,sizeLods:t}}function ea(e,t,n){let r=new ze(e,t,n);return r.texture.mapping=306,r.texture.name=`PMREM.cubeUv`,r.scissorTest=!0,r}function ta(e,t,n,r,i){e.viewport.set(t,n,r,i),e.scissor.set(t,n,r,i)}function na(e,t,n){return new Sr({name:`PMREMGGXConvolution`,defines:{GGX_SAMPLES:Ui,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:oa(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function ra(e,t,n){return new Sr({name:`SphericalGaussianBlur`,defines:{SAMPLES:Hi,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:oa(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function ia(){return new Sr({name:`EquirectangularToCubeUV`,uniforms:{envMap:{value:null}},vertexShader:oa(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function aa(){return new Sr({name:`CubemapToCubeUV`,uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:oa(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function oa(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var sa=class extends ze{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new sr(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new dr(5,5,5),i=new Sr({name:`CubemapFromEquirect`,uniforms:mr(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:1,blending:0});i.uniforms.tEquirect.value=t;let a=new Wn(r,i),o=t.minFilter;return t.minFilter===1008&&(t.minFilter=p),new di(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){let i=e.getRenderTarget();for(let i=0;i<6;i++)e.setRenderTarget(this,i),e.clear(t,n,r);e.setRenderTarget(i)}};function ca(e){let t=new WeakMap,n=new WeakMap,r=null;function i(e,t=!1){return e==null?null:t?o(e):a(e)}function a(n){if(n&&n.isTexture){let r=n.mapping;if(r===303||r===304){if(t.has(n)){let e=t.get(n).texture;return s(e,n.mapping)}{let r=n.image;if(r&&r.height>0){let i=new sa(r.height);return i.fromEquirectangularTexture(e,n),t.set(n,i),n.addEventListener(`dispose`,l),s(i.texture,n.mapping)}return null}}}return n}function o(t){if(t&&t.isTexture){let i=t.mapping,a=i===303||i===304,o=i===301||i===302;if(a||o){let i=n.get(t),s=i===void 0?0:i.texture.pmremVersion;if(t.isRenderTargetTexture&&t.pmremVersion!==s)return r===null&&(r=new Qi(e)),i=a?r.fromEquirectangular(t,i):r.fromCubemap(t,i),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),i.texture;if(i!==void 0)return i.texture;{let s=t.image;return a&&s&&s.height>0||o&&s&&c(s)?(r===null&&(r=new Qi(e)),i=a?r.fromEquirectangular(t):r.fromCubemap(t),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),t.addEventListener(`dispose`,u),i.texture):null}}}return t}function s(e,t){return t===303?e.mapping=301:t===304&&(e.mapping=302),e}function c(e){let t=0;for(let n=0;n<6;n++)e[n]!==void 0&&t++;return t===6}function l(e){let n=e.target;n.removeEventListener(`dispose`,l);let r=t.get(n);r!==void 0&&(t.delete(n),r.dispose())}function u(e){let t=e.target;t.removeEventListener(`dispose`,u);let r=n.get(t);r!==void 0&&(n.delete(t),r.dispose())}function d(){t=new WeakMap,n=new WeakMap,r!==null&&(r.dispose(),r=null)}return{get:i,dispose:d}}function la(e){let t={};function n(n){if(t[n]!==void 0)return t[n];let r=e.getExtension(n);return t[n]=r,r}return{has:function(e){return n(e)!==null},init:function(){n(`EXT_color_buffer_float`),n(`WEBGL_clip_cull_distance`),n(`OES_texture_float_linear`),n(`EXT_color_buffer_half_float`),n(`WEBGL_multisampled_render_to_texture`),n(`WEBGL_render_shared_exponent`)},get:function(e){let t=n(e);return t===null&&fe(`WebGLRenderer: `+e+` extension not supported.`),t}}}function ua(e,t,n,r){let i={},a=new WeakMap;function o(e){let s=e.target;s.index!==null&&t.remove(s.index);for(let e in s.attributes)t.remove(s.attributes[e]);s.removeEventListener(`dispose`,o),delete i[s.id];let c=a.get(s);c&&(t.remove(c),a.delete(s)),r.releaseStatesOfGeometry(s),s.isInstancedBufferGeometry===!0&&delete s._maxInstanceCount,n.memory.geometries--}function s(e,t){return i[t.id]===!0?t:(t.addEventListener(`dispose`,o),i[t.id]=!0,n.memory.geometries++,t)}function c(n){let r=n.attributes;for(let n in r)t.update(r[n],e.ARRAY_BUFFER)}function l(e){let n=[],r=e.index,i=e.attributes.position,o=0;if(i===void 0)return;if(r!==null){let e=r.array;o=r.version;for(let t=0,r=e.length;t<r;t+=3){let r=e[t+0],i=e[t+1],a=e[t+2];n.push(r,i,i,a,a,r)}}else{let e=i.array;o=i.version;for(let t=0,r=e.length/3-1;t<r;t+=3){let e=t+0,r=t+1,i=t+2;n.push(e,r,r,i,i,e)}}let s=new(i.count>=65535?sn:on)(n,1);s.version=o;let c=a.get(e);c&&t.remove(c),a.set(e,s)}function u(e){let t=a.get(e);if(t){let n=e.index;n!==null&&t.version<n.version&&l(e)}else l(e);return a.get(e)}return{get:s,update:c,getWireframeAttribute:u}}function da(e,t,n){let r;function i(e){r=e}let a,o;function s(e){a=e.type,o=e.bytesPerElement}function c(t,i){e.drawElements(r,i,a,t*o),n.update(i,r,1)}function l(t,i,s){s!==0&&(e.drawElementsInstanced(r,i,a,t*o,s),n.update(i,r,s))}function u(e,i,o){if(o===0)return;t.get(`WEBGL_multi_draw`).multiDrawElementsWEBGL(r,i,0,a,e,0,o);let s=0;for(let e=0;e<o;e++)s+=i[e];n.update(s,r,1)}this.setMode=i,this.setIndex=s,this.render=c,this.renderInstances=l,this.renderMultiDraw=u}function fa(e){let t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function r(t,r,i){switch(n.calls++,r){case e.TRIANGLES:n.triangles+=t/3*i;break;case e.LINES:n.lines+=t/2*i;break;case e.LINE_STRIP:n.lines+=i*(t-1);break;case e.LINE_LOOP:n.lines+=i*t;break;case e.POINTS:n.points+=i*t;break;default:B(`WebGLInfo: Unknown draw mode:`,r)}}function i(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:i,update:r}}function pa(e,t,n){let r=new WeakMap,i=new Le;function a(a,o,s){let c=a.morphTargetInfluences,l=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=l===void 0?0:l.length,d=r.get(o);if(d===void 0||d.count!==u){d!==void 0&&d.texture.dispose();let e=o.morphAttributes.position!==void 0,n=o.morphAttributes.normal!==void 0,a=o.morphAttributes.color!==void 0,s=o.morphAttributes.position||[],c=o.morphAttributes.normal||[],l=o.morphAttributes.color||[],f=0;e===!0&&(f=1),n===!0&&(f=2),a===!0&&(f=3);let p=o.attributes.position.count*f,m=1;p>t.maxTextureSize&&(m=Math.ceil(p/t.maxTextureSize),p=t.maxTextureSize);let h=new Float32Array(p*m*4*u),g=new Be(h,p,m,u);g.type=v,g.needsUpdate=!0;let _=f*4;for(let t=0;t<u;t++){let r=s[t],o=c[t],u=l[t],d=p*m*4*t;for(let t=0;t<r.count;t++){let s=t*_;e===!0&&(i.fromBufferAttribute(r,t),h[d+s+0]=i.x,h[d+s+1]=i.y,h[d+s+2]=i.z,h[d+s+3]=0),n===!0&&(i.fromBufferAttribute(o,t),h[d+s+4]=i.x,h[d+s+5]=i.y,h[d+s+6]=i.z,h[d+s+7]=0),a===!0&&(i.fromBufferAttribute(u,t),h[d+s+8]=i.x,h[d+s+9]=i.y,h[d+s+10]=i.z,h[d+s+11]=u.itemSize===4?i.w:1)}}d={count:u,texture:g,size:new H(p,m)},r.set(o,d);function y(){g.dispose(),r.delete(o),o.removeEventListener(`dispose`,y)}o.addEventListener(`dispose`,y)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)s.getUniforms().setValue(e,`morphTexture`,a.morphTexture,n);else{let t=0;for(let e=0;e<c.length;e++)t+=c[e];let n=o.morphTargetsRelative?1:1-t;s.getUniforms().setValue(e,`morphTargetBaseInfluence`,n),s.getUniforms().setValue(e,`morphTargetInfluences`,c)}s.getUniforms().setValue(e,`morphTargetsTexture`,d.texture,n),s.getUniforms().setValue(e,`morphTargetsTextureSize`,d.size)}return{update:a}}function ma(e,t,n,r,i){let a=new WeakMap;function o(r){let o=i.render.frame,s=r.geometry,l=t.get(r,s);if(a.get(l)!==o&&(t.update(l),a.set(l,o)),r.isInstancedMesh&&(r.hasEventListener(`dispose`,c)===!1&&r.addEventListener(`dispose`,c),a.get(r)!==o&&(n.update(r.instanceMatrix,e.ARRAY_BUFFER),r.instanceColor!==null&&n.update(r.instanceColor,e.ARRAY_BUFFER),a.set(r,o))),r.isSkinnedMesh){let e=r.skeleton;a.get(e)!==o&&(e.update(),a.set(e,o))}return l}function s(){a=new WeakMap}function c(e){let t=e.target;t.removeEventListener(`dispose`,c),r.releaseStatesOfObject(t),n.remove(t.instanceMatrix),t.instanceColor!==null&&n.remove(t.instanceColor)}return{update:o,dispose:s}}var ha={1:`LINEAR_TONE_MAPPING`,2:`REINHARD_TONE_MAPPING`,3:`CINEON_TONE_MAPPING`,4:`ACES_FILMIC_TONE_MAPPING`,6:`AGX_TONE_MAPPING`,7:`NEUTRAL_TONE_MAPPING`,5:`CUSTOM_TONE_MAPPING`};function ga(e,t,n,r,i,a){let o=new ze(t,n,{type:e,depthBuffer:i,stencilBuffer:a,samples:r?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),s=null,c=null,l=new bn;l.setAttribute(`position`,new cn([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute(`uv`,new cn([0,2,0,0,2,0],2));let u=new Cr({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),d=new Wn(l,u),f=new oi(-1,1,1,-1,0,1),p=null,m=null,h=!1,g,_=null,v=[],b=!1;this.setSize=function(e,t){o.setSize(e,t),s!==null&&s.setSize(e,t),c!==null&&c.setSize(e,t);for(let n=0;n<v.length;n++){let r=v[n];r.setSize&&r.setSize(e,t)}},this.setEffects=function(e){v=e,b=v.length>0&&v[0].isRenderPass===!0;let t=o.width,n=o.height;v.length>0&&s===null&&(s=new ze(t,n,{type:y,depthBuffer:!1,stencilBuffer:!1}),c=new ze(t,n,{type:y,depthBuffer:!1,stencilBuffer:!1}));for(let e=0;e<v.length;e++){let r=v[e];r.setSize&&r.setSize(t,n)}},this.begin=function(e,t){if(h||e.toneMapping===0&&v.length===0)return!1;if(_=t,t!==null){let e=t.width,n=t.height;(o.width!==e||o.height!==n)&&this.setSize(e,n)}return b===!1&&e.setRenderTarget(o),g=e.toneMapping,e.toneMapping=0,!0},this.hasRenderPass=function(){return b},this.end=function(e,t){e.toneMapping=g,h=!0;let n=o,r=s;for(let i=0;i<v.length;i++){let a=v[i];a.enabled!==!1&&(a.render(e,r,n,t),a.needsSwap!==!1&&(n=r,r=r===s?c:s))}if(p!==e.outputColorSpace||m!==e.toneMapping){p=e.outputColorSpace,m=e.toneMapping,u.defines={},G.getTransfer(p)===`srgb`&&(u.defines.SRGB_TRANSFER=``);let t=ha[m];t&&(u.defines[t]=``),u.needsUpdate=!0}u.uniforms.tDiffuse.value=n.texture,e.setRenderTarget(_),e.render(d,f),_=null,h=!1},this.isCompositing=function(){return h},this.dispose=function(){o.dispose(),s!==null&&s.dispose(),c!==null&&c.dispose(),l.dispose(),u.dispose()}}var _a=new Ie,va=new cr(1,1),ya=new Be,ba=new Ve,xa=new sr,Sa=[],Ca=[],wa=new Float32Array(16),Ta=new Float32Array(9),Ea=new Float32Array(4);function Da(e,t,n){let r=e[0];if(r<=0||r>0)return e;let i=t*n,a=Sa[i];if(a===void 0&&(a=new Float32Array(i),Sa[i]=a),t!==0){r.toArray(a,0);for(let r=1,i=0;r!==t;++r)i+=n,e[r].toArray(a,i)}return a}function Oa(e,t){if(e.length!==t.length)return!1;for(let n=0,r=e.length;n<r;n++)if(e[n]!==t[n])return!1;return!0}function ka(e,t){for(let n=0,r=t.length;n<r;n++)e[n]=t[n]}function Aa(e,t){let n=Ca[t];n===void 0&&(n=new Int32Array(t),Ca[t]=n);for(let r=0;r!==t;++r)n[r]=e.allocateTextureUnit();return n}function ja(e,t){let n=this.cache;n[0]!==t&&(e.uniform1f(this.addr,t),n[0]=t)}function Ma(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Oa(n,t))return;e.uniform2fv(this.addr,t),ka(n,t)}}function Na(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(e.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(Oa(n,t))return;e.uniform3fv(this.addr,t),ka(n,t)}}function Pa(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Oa(n,t))return;e.uniform4fv(this.addr,t),ka(n,t)}}function Fa(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Oa(n,t))return;e.uniformMatrix2fv(this.addr,!1,t),ka(n,t)}else{if(Oa(n,r))return;Ea.set(r),e.uniformMatrix2fv(this.addr,!1,Ea),ka(n,r)}}function Ia(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Oa(n,t))return;e.uniformMatrix3fv(this.addr,!1,t),ka(n,t)}else{if(Oa(n,r))return;Ta.set(r),e.uniformMatrix3fv(this.addr,!1,Ta),ka(n,r)}}function La(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Oa(n,t))return;e.uniformMatrix4fv(this.addr,!1,t),ka(n,t)}else{if(Oa(n,r))return;wa.set(r),e.uniformMatrix4fv(this.addr,!1,wa),ka(n,r)}}function Ra(e,t){let n=this.cache;n[0]!==t&&(e.uniform1i(this.addr,t),n[0]=t)}function za(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Oa(n,t))return;e.uniform2iv(this.addr,t),ka(n,t)}}function Ba(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Oa(n,t))return;e.uniform3iv(this.addr,t),ka(n,t)}}function Va(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Oa(n,t))return;e.uniform4iv(this.addr,t),ka(n,t)}}function Ha(e,t){let n=this.cache;n[0]!==t&&(e.uniform1ui(this.addr,t),n[0]=t)}function Ua(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Oa(n,t))return;e.uniform2uiv(this.addr,t),ka(n,t)}}function Wa(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Oa(n,t))return;e.uniform3uiv(this.addr,t),ka(n,t)}}function Ga(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Oa(n,t))return;e.uniform4uiv(this.addr,t),ka(n,t)}}function Ka(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i);let a;this.type===e.SAMPLER_2D_SHADOW?(va.compareFunction=n.isReversedDepthBuffer()?518:515,a=va):a=_a,n.setTexture2D(t||a,i)}function qa(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture3D(t||ba,i)}function Ja(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTextureCube(t||xa,i)}function Ya(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture2DArray(t||ya,i)}function Xa(e){switch(e){case 5126:return ja;case 35664:return Ma;case 35665:return Na;case 35666:return Pa;case 35674:return Fa;case 35675:return Ia;case 35676:return La;case 5124:case 35670:return Ra;case 35667:case 35671:return za;case 35668:case 35672:return Ba;case 35669:case 35673:return Va;case 5125:return Ha;case 36294:return Ua;case 36295:return Wa;case 36296:return Ga;case 35678:case 36198:case 36298:case 36306:case 35682:return Ka;case 35679:case 36299:case 36307:return qa;case 35680:case 36300:case 36308:case 36293:return Ja;case 36289:case 36303:case 36311:case 36292:return Ya}}function Za(e,t){e.uniform1fv(this.addr,t)}function Qa(e,t){let n=Da(t,this.size,2);e.uniform2fv(this.addr,n)}function $a(e,t){let n=Da(t,this.size,3);e.uniform3fv(this.addr,n)}function eo(e,t){let n=Da(t,this.size,4);e.uniform4fv(this.addr,n)}function to(e,t){let n=Da(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,n)}function no(e,t){let n=Da(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,n)}function ro(e,t){let n=Da(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,n)}function io(e,t){e.uniform1iv(this.addr,t)}function ao(e,t){e.uniform2iv(this.addr,t)}function oo(e,t){e.uniform3iv(this.addr,t)}function so(e,t){e.uniform4iv(this.addr,t)}function co(e,t){e.uniform1uiv(this.addr,t)}function lo(e,t){e.uniform2uiv(this.addr,t)}function uo(e,t){e.uniform3uiv(this.addr,t)}function fo(e,t){e.uniform4uiv(this.addr,t)}function po(e,t,n){let r=this.cache,i=t.length,a=Aa(n,i);Oa(r,a)||(e.uniform1iv(this.addr,a),ka(r,a));let o;o=this.type===e.SAMPLER_2D_SHADOW?va:_a;for(let e=0;e!==i;++e)n.setTexture2D(t[e]||o,a[e])}function mo(e,t,n){let r=this.cache,i=t.length,a=Aa(n,i);Oa(r,a)||(e.uniform1iv(this.addr,a),ka(r,a));for(let e=0;e!==i;++e)n.setTexture3D(t[e]||ba,a[e])}function ho(e,t,n){let r=this.cache,i=t.length,a=Aa(n,i);Oa(r,a)||(e.uniform1iv(this.addr,a),ka(r,a));for(let e=0;e!==i;++e)n.setTextureCube(t[e]||xa,a[e])}function go(e,t,n){let r=this.cache,i=t.length,a=Aa(n,i);Oa(r,a)||(e.uniform1iv(this.addr,a),ka(r,a));for(let e=0;e!==i;++e)n.setTexture2DArray(t[e]||ya,a[e])}function _o(e){switch(e){case 5126:return Za;case 35664:return Qa;case 35665:return $a;case 35666:return eo;case 35674:return to;case 35675:return no;case 35676:return ro;case 5124:case 35670:return io;case 35667:case 35671:return ao;case 35668:case 35672:return oo;case 35669:case 35673:return so;case 5125:return co;case 36294:return lo;case 36295:return uo;case 36296:return fo;case 35678:case 36198:case 36298:case 36306:case 35682:return po;case 35679:case 36299:case 36307:return mo;case 35680:case 36300:case 36308:case 36293:return ho;case 36289:case 36303:case 36311:case 36292:return go}}var vo=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Xa(t.type)}},yo=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=_o(t.type)}},bo=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let r=this.seq;for(let i=0,a=r.length;i!==a;++i){let a=r[i];a.setValue(e,t[a.id],n)}}},xo=/(\w+)(\])?(\[|\.)?/g;function So(e,t){e.seq.push(t),e.map[t.id]=t}function Co(e,t,n){let r=e.name,i=r.length;for(xo.lastIndex=0;;){let a=xo.exec(r),o=xo.lastIndex,s=a[1],c=a[2]===`]`,l=a[3];if(c&&(s|=0),l===void 0||l===`[`&&o+2===i){So(n,l===void 0?new vo(s,e,t):new yo(s,e,t));break}{let e=n.map[s];e===void 0&&(e=new bo(s),So(n,e)),n=e}}}var wo=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){let n=e.getActiveUniform(t,r);Co(n,e.getUniformLocation(t,n.name),this)}let r=[],i=[];for(let t of this.seq)t.type===e.SAMPLER_2D_SHADOW||t.type===e.SAMPLER_CUBE_SHADOW||t.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(t):i.push(t);r.length>0&&(this.seq=r.concat(i))}setValue(e,t,n,r){let i=this.map[t];i!==void 0&&i.setValue(e,n,r)}setOptional(e,t,n){let r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let i=0,a=t.length;i!==a;++i){let a=t[i],o=n[a.id];o.needsUpdate!==!1&&a.setValue(e,o.value,r)}}static seqWithValue(e,t){let n=[];for(let r=0,i=e.length;r!==i;++r){let i=e[r];i.id in t&&n.push(i)}return n}};function To(e,t,n){let r=e.createShader(t);return e.shaderSource(r,n),e.compileShader(r),r}var Eo=37297,Do=0;function Oo(e,t){let n=e.split(`
`),r=[],i=Math.max(t-6,0),a=Math.min(t+6,n.length);for(let e=i;e<a;e++){let i=e+1;r.push(`${i===t?`>`:` `} ${i}: ${n[e]}`)}return r.join(`
`)}var ko=new W;function Ao(e){G._getMatrix(ko,G.workingColorSpace,e);let t=`mat3( ${ko.elements.map(e=>e.toFixed(4))} )`;switch(G.getTransfer(e)){case ne:return[t,`LinearTransferOETF`];case re:return[t,`sRGBTransferOETF`];default:return z(`WebGLProgram: Unsupported color space: `,e),[t,`LinearTransferOETF`]}}function jo(e,t,n){let r=e.getShaderParameter(t,e.COMPILE_STATUS),i=(e.getShaderInfoLog(t)||``).trim();if(r&&i===``)return``;let a=/ERROR: 0:(\d+)/.exec(i);if(a){let r=parseInt(a[1]);return n.toUpperCase()+`

`+i+`

`+Oo(e.getShaderSource(t),r)}return i}function Mo(e,t){let n=Ao(t);return[`vec4 ${e}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,`}`].join(`
`)}var No={1:`Linear`,2:`Reinhard`,3:`Cineon`,4:`ACESFilmic`,6:`AgX`,7:`Neutral`,5:`Custom`};function Po(e,t){let n=No[t];return n===void 0?(z(`WebGLProgram: Unsupported toneMapping:`,t),`vec3 `+e+`( vec3 color ) { return LinearToneMapping( color ); }`):`vec3 `+e+`( vec3 color ) { return `+n+`ToneMapping( color ); }`}var Fo=new U;function Io(){return G.getLuminanceCoefficients(Fo),[`float luminance( const in vec3 rgb ) {`,`	const vec3 weights = vec3( ${Fo.x.toFixed(4)}, ${Fo.y.toFixed(4)}, ${Fo.z.toFixed(4)} );`,`	return dot( weights, rgb );`,`}`].join(`
`)}function Lo(e){return[e.extensionClipCullDistance?`#extension GL_ANGLE_clip_cull_distance : require`:``,e.extensionMultiDraw?`#extension GL_ANGLE_multi_draw : require`:``].filter(Bo).join(`
`)}function Ro(e){let t=[];for(let n in e){let r=e[n];r!==!1&&t.push(`#define `+n+` `+r)}return t.join(`
`)}function zo(e,t){let n={},r=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let i=0;i<r;i++){let r=e.getActiveAttrib(t,i),a=r.name,o=1;r.type===e.FLOAT_MAT2&&(o=2),r.type===e.FLOAT_MAT3&&(o=3),r.type===e.FLOAT_MAT4&&(o=4),n[a]={type:r.type,location:e.getAttribLocation(t,a),locationSize:o}}return n}function Bo(e){return e!==``}function Vo(e,t){let n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return e.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Ho(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var Uo=/^[ \t]*#include +<([\w\d./]+)>/gm;function Wo(e){return e.replace(Uo,Ko)}var Go=new Map;function Ko(e,t){let n=Z[t];if(n===void 0){let e=Go.get(t);if(e!==void 0)n=Z[e],z(`WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.`,t,e);else throw Error(`THREE.WebGLProgram: Can not resolve #include <`+t+`>`)}return Wo(n)}var qo=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Jo(e){return e.replace(qo,Yo)}function Yo(e,t,n,r){let i=``;for(let e=parseInt(t);e<parseInt(n);e++)i+=r.replace(/\[\s*i\s*\]/g,`[ `+e+` ]`).replace(/UNROLLED_LOOP_INDEX/g,e);return i}function Xo(e){let t=`precision ${e.precision} float;
	precision ${e.precision} int;
	precision ${e.precision} sampler2D;
	precision ${e.precision} samplerCube;
	precision ${e.precision} sampler3D;
	precision ${e.precision} sampler2DArray;
	precision ${e.precision} sampler2DShadow;
	precision ${e.precision} samplerCubeShadow;
	precision ${e.precision} sampler2DArrayShadow;
	precision ${e.precision} isampler2D;
	precision ${e.precision} isampler3D;
	precision ${e.precision} isamplerCube;
	precision ${e.precision} isampler2DArray;
	precision ${e.precision} usampler2D;
	precision ${e.precision} usampler3D;
	precision ${e.precision} usamplerCube;
	precision ${e.precision} usampler2DArray;
	`;return e.precision===`highp`?t+=`
#define HIGH_PRECISION`:e.precision===`mediump`?t+=`
#define MEDIUM_PRECISION`:e.precision===`lowp`&&(t+=`
#define LOW_PRECISION`),t}var Zo={1:`SHADOWMAP_TYPE_PCF`,3:`SHADOWMAP_TYPE_VSM`};function Qo(e){return Zo[e.shadowMapType]||`SHADOWMAP_TYPE_BASIC`}var $o={301:`ENVMAP_TYPE_CUBE`,302:`ENVMAP_TYPE_CUBE`,306:`ENVMAP_TYPE_CUBE_UV`};function es(e){return e.envMap===!1?`ENVMAP_TYPE_CUBE`:$o[e.envMapMode]||`ENVMAP_TYPE_CUBE`}var ts={302:`ENVMAP_MODE_REFRACTION`};function ns(e){return e.envMap===!1?`ENVMAP_MODE_REFLECTION`:ts[e.envMapMode]||`ENVMAP_MODE_REFLECTION`}var rs={0:`ENVMAP_BLENDING_MULTIPLY`,1:`ENVMAP_BLENDING_MIX`,2:`ENVMAP_BLENDING_ADD`};function is(e){return e.envMap===!1?`ENVMAP_BLENDING_NONE`:rs[e.combine]||`ENVMAP_BLENDING_NONE`}function as(e){let t=e.envMapCubeUVHeight;if(t===null)return null;let n=Math.log2(t)-2,r=1/t;return{texelWidth:1/(3*Math.max(2**n,112)),texelHeight:r,maxMip:n}}function os(e,t,n,r){let i=e.getContext(),a=n.defines,o=n.vertexShader,s=n.fragmentShader,c=Qo(n),l=es(n),u=ns(n),d=is(n),f=as(n),p=Lo(n),m=Ro(a),h=i.createProgram(),g,_,v=n.glslVersion?`#version `+n.glslVersion+`
`:``;n.isRawShaderMaterial?(g=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m].filter(Bo).join(`
`),g.length>0&&(g+=`
`),_=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m].filter(Bo).join(`
`),_.length>0&&(_+=`
`)):(g=[Xo(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m,n.extensionClipCullDistance?`#define USE_CLIP_DISTANCE`:``,n.batching?`#define USE_BATCHING`:``,n.batchingColor?`#define USE_BATCHING_COLOR`:``,n.instancing?`#define USE_INSTANCING`:``,n.instancingColor?`#define USE_INSTANCING_COLOR`:``,n.instancingMorph?`#define USE_INSTANCING_MORPH`:``,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.map?`#define USE_MAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+u:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.displacementMap?`#define USE_DISPLACEMENTMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.mapUv?`#define MAP_UV `+n.mapUv:``,n.alphaMapUv?`#define ALPHAMAP_UV `+n.alphaMapUv:``,n.lightMapUv?`#define LIGHTMAP_UV `+n.lightMapUv:``,n.aoMapUv?`#define AOMAP_UV `+n.aoMapUv:``,n.emissiveMapUv?`#define EMISSIVEMAP_UV `+n.emissiveMapUv:``,n.bumpMapUv?`#define BUMPMAP_UV `+n.bumpMapUv:``,n.normalMapUv?`#define NORMALMAP_UV `+n.normalMapUv:``,n.displacementMapUv?`#define DISPLACEMENTMAP_UV `+n.displacementMapUv:``,n.metalnessMapUv?`#define METALNESSMAP_UV `+n.metalnessMapUv:``,n.roughnessMapUv?`#define ROUGHNESSMAP_UV `+n.roughnessMapUv:``,n.anisotropyMapUv?`#define ANISOTROPYMAP_UV `+n.anisotropyMapUv:``,n.clearcoatMapUv?`#define CLEARCOATMAP_UV `+n.clearcoatMapUv:``,n.clearcoatNormalMapUv?`#define CLEARCOAT_NORMALMAP_UV `+n.clearcoatNormalMapUv:``,n.clearcoatRoughnessMapUv?`#define CLEARCOAT_ROUGHNESSMAP_UV `+n.clearcoatRoughnessMapUv:``,n.iridescenceMapUv?`#define IRIDESCENCEMAP_UV `+n.iridescenceMapUv:``,n.iridescenceThicknessMapUv?`#define IRIDESCENCE_THICKNESSMAP_UV `+n.iridescenceThicknessMapUv:``,n.sheenColorMapUv?`#define SHEEN_COLORMAP_UV `+n.sheenColorMapUv:``,n.sheenRoughnessMapUv?`#define SHEEN_ROUGHNESSMAP_UV `+n.sheenRoughnessMapUv:``,n.specularMapUv?`#define SPECULARMAP_UV `+n.specularMapUv:``,n.specularColorMapUv?`#define SPECULAR_COLORMAP_UV `+n.specularColorMapUv:``,n.specularIntensityMapUv?`#define SPECULAR_INTENSITYMAP_UV `+n.specularIntensityMapUv:``,n.transmissionMapUv?`#define TRANSMISSIONMAP_UV `+n.transmissionMapUv:``,n.thicknessMapUv?`#define THICKNESSMAP_UV `+n.thicknessMapUv:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexNormals?`#define HAS_NORMAL`:``,n.vertexColors?`#define USE_COLOR`:``,n.vertexAlphas?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.flatShading?`#define FLAT_SHADED`:``,n.skinning?`#define USE_SKINNING`:``,n.morphTargets?`#define USE_MORPHTARGETS`:``,n.morphNormals&&n.flatShading===!1?`#define USE_MORPHNORMALS`:``,n.morphColors?`#define USE_MORPHCOLORS`:``,n.morphTargetsCount>0?`#define MORPHTARGETS_TEXTURE_STRIDE `+n.morphTextureStride:``,n.morphTargetsCount>0?`#define MORPHTARGETS_COUNT `+n.morphTargetsCount:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.sizeAttenuation?`#define USE_SIZEATTENUATION`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 modelMatrix;`,`uniform mat4 modelViewMatrix;`,`uniform mat4 projectionMatrix;`,`uniform mat4 viewMatrix;`,`uniform mat3 normalMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,`#ifdef USE_INSTANCING`,`	attribute mat4 instanceMatrix;`,`#endif`,`#ifdef USE_INSTANCING_COLOR`,`	attribute vec3 instanceColor;`,`#endif`,`#ifdef USE_INSTANCING_MORPH`,`	uniform sampler2D morphTexture;`,`#endif`,`attribute vec3 position;`,`attribute vec3 normal;`,`attribute vec2 uv;`,`#ifdef USE_UV1`,`	attribute vec2 uv1;`,`#endif`,`#ifdef USE_UV2`,`	attribute vec2 uv2;`,`#endif`,`#ifdef USE_UV3`,`	attribute vec2 uv3;`,`#endif`,`#ifdef USE_TANGENT`,`	attribute vec4 tangent;`,`#endif`,`#if defined( USE_COLOR_ALPHA )`,`	attribute vec4 color;`,`#elif defined( USE_COLOR )`,`	attribute vec3 color;`,`#endif`,`#ifdef USE_SKINNING`,`	attribute vec4 skinIndex;`,`	attribute vec4 skinWeight;`,`#endif`,`
`].filter(Bo).join(`
`),_=[Xo(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.alphaToCoverage?`#define ALPHA_TO_COVERAGE`:``,n.map?`#define USE_MAP`:``,n.matcap?`#define USE_MATCAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+l:``,n.envMap?`#define `+u:``,n.envMap?`#define `+d:``,f?`#define CUBEUV_TEXEL_WIDTH `+f.texelWidth:``,f?`#define CUBEUV_TEXEL_HEIGHT `+f.texelHeight:``,f?`#define CUBEUV_MAX_MIP `+f.maxMip+`.0`:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.packedNormalMap?`#define USE_PACKED_NORMALMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoat?`#define USE_CLEARCOAT`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.dispersion?`#define USE_DISPERSION`:``,n.retroreflection?`#define USE_RETROREFLECTION`:``,n.iridescence?`#define USE_IRIDESCENCE`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaTest?`#define USE_ALPHATEST`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.sheen?`#define USE_SHEEN`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexColors||n.instancingColor?`#define USE_COLOR`:``,n.vertexAlphas||n.batchingColor?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.gradientMap?`#define USE_GRADIENTMAP`:``,n.flatShading?`#define FLAT_SHADED`:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.premultipliedAlpha?`#define PREMULTIPLIED_ALPHA`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.numLightProbeGrids>0?`#define USE_LIGHT_PROBES_GRID`:``,n.decodeVideoTexture?`#define DECODE_VIDEO_TEXTURE`:``,n.decodeVideoTextureEmissive?`#define DECODE_VIDEO_TEXTURE_EMISSIVE`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 viewMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,n.toneMapping===0?``:`#define TONE_MAPPING`,n.toneMapping===0?``:Z.tonemapping_pars_fragment,n.toneMapping===0?``:Po(`toneMapping`,n.toneMapping),n.dithering?`#define DITHERING`:``,n.opaque?`#define OPAQUE`:``,Z.colorspace_pars_fragment,Mo(`linearToOutputTexel`,n.outputColorSpace),Io(),n.useDepthPacking?`#define DEPTH_PACKING `+n.depthPacking:``,`
`].filter(Bo).join(`
`)),o=Wo(o),o=Vo(o,n),o=Ho(o,n),s=Wo(s),s=Vo(s,n),s=Ho(s,n),o=Jo(o),s=Jo(s),n.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,g=[p,`#define attribute in`,`#define varying out`,`#define texture2D texture`].join(`
`)+`
`+g,_=[`#define varying in`,n.glslVersion===`300 es`?``:`layout(location = 0) out highp vec4 pc_fragColor;`,n.glslVersion===`300 es`?``:`#define gl_FragColor pc_fragColor`,`#define gl_FragDepthEXT gl_FragDepth`,`#define texture2D texture`,`#define textureCube texture`,`#define texture2DProj textureProj`,`#define texture2DLodEXT textureLod`,`#define texture2DProjLodEXT textureProjLod`,`#define textureCubeLodEXT textureLod`,`#define texture2DGradEXT textureGrad`,`#define texture2DProjGradEXT textureProjGrad`,`#define textureCubeGradEXT textureGrad`].join(`
`)+`
`+_);let y=v+g+o,b=v+_+s,x=To(i,i.VERTEX_SHADER,y),S=To(i,i.FRAGMENT_SHADER,b);i.attachShader(h,x),i.attachShader(h,S),n.index0AttributeName===void 0?n.hasPositionAttribute===!0&&i.bindAttribLocation(h,0,`position`):i.bindAttribLocation(h,0,n.index0AttributeName),i.linkProgram(h);function C(t){if(e.debug.checkShaderErrors){let n=i.getProgramInfoLog(h)||``,r=i.getShaderInfoLog(x)||``,a=i.getShaderInfoLog(S)||``,o=n.trim(),s=r.trim(),c=a.trim(),l=!0,u=!0;if(i.getProgramParameter(h,i.LINK_STATUS)===!1){if(l=!1,typeof e.debug.onShaderError==`function`)e.debug.onShaderError(i,h,x,S);else{let e=jo(i,x,`vertex`),n=jo(i,S,`fragment`);B(`WebGLProgram: Shader Error `+i.getError()+` - VALIDATE_STATUS `+i.getProgramParameter(h,i.VALIDATE_STATUS)+`

Material Name: `+t.name+`
Material Type: `+t.type+`

Program Info Log: `+o+`
`+e+`
`+n)}}else o===``?(s===``||c===``)&&(u=!1):z(`WebGLProgram: Program Info Log:`,o);u&&(t.diagnostics={runnable:l,programLog:o,vertexShader:{log:s,prefix:g},fragmentShader:{log:c,prefix:_}})}i.deleteShader(x),i.deleteShader(S),w=new wo(i,h),T=zo(i,h)}let w;this.getUniforms=function(){return w===void 0&&C(this),w};let T;this.getAttributes=function(){return T===void 0&&C(this),T};let E=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return E===!1&&(E=i.getProgramParameter(h,Eo)),E},this.destroy=function(){r.releaseStatesOfProgram(this),i.deleteProgram(h),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=Do++,this.cacheKey=t,this.usedTimes=1,this.program=h,this.vertexShader=x,this.fragmentShader=S,this}var ss=0,cs=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(n)===!1&&(r.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let e of t)e.usedTimes--,e.usedTimes===0&&this.shaderCache.delete(e.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new ls(e),t.set(e,n)),n}},ls=class{constructor(e){this.id=ss++,this.code=e,this.usedTimes=0}};function us(e){return e===1030||e===37490||e===36285}function ds(e,t,n,r,i,a){let o=new $e,s=new cs,c=new Set,l=[],u=new Map,d=r.logarithmicDepthBuffer,f=r.precision,p={MeshDepthMaterial:`depth`,MeshDistanceMaterial:`distance`,MeshNormalMaterial:`normal`,MeshBasicMaterial:`basic`,MeshLambertMaterial:`lambert`,MeshPhongMaterial:`phong`,MeshToonMaterial:`toon`,MeshStandardMaterial:`physical`,MeshPhysicalMaterial:`physical`,MeshMatcapMaterial:`matcap`,LineBasicMaterial:`basic`,LineDashedMaterial:`dashed`,PointsMaterial:`points`,ShadowMaterial:`shadow`,SpriteMaterial:`sprite`};function m(e){return c.add(e),e===0?`uv`:`uv${e}`}function h(i,o,l,u,h,g){let _=u.fog,v=h.geometry,y=i.isMeshStandardMaterial||i.isMeshLambertMaterial||i.isMeshPhongMaterial?u.environment:null,b=i.isMeshStandardMaterial||i.isMeshLambertMaterial&&!i.envMap||i.isMeshPhongMaterial&&!i.envMap,x=t.get(i.envMap||y,b),S=x&&x.mapping===306?x.image.height:null,C=p[i.type];i.precision!==null&&(f=r.getMaxPrecision(i.precision),f!==i.precision&&z(`WebGLProgram.getParameters:`,i.precision,`not supported, using`,f,`instead.`));let w=v.morphAttributes.position||v.morphAttributes.normal||v.morphAttributes.color,T=w===void 0?0:w.length,E=0;v.morphAttributes.position!==void 0&&(E=1),v.morphAttributes.normal!==void 0&&(E=2),v.morphAttributes.color!==void 0&&(E=3);let D,O,k,A;if(C){let e=ji[C];D=e.vertexShader,O=e.fragmentShader}else{D=i.vertexShader,O=i.fragmentShader;let e=s.getVertexShaderStage(i),t=s.getFragmentShaderStage(i);s.update(i,e,t),k=e.id,A=t.id}let j=e.getRenderTarget(),M=e.state.buffers.depth.getReversed(),N=h.isInstancedMesh===!0,P=h.isBatchedMesh===!0,F=!!i.map,I=!!i.matcap,ee=!!x,te=!!i.aoMap,L=!!i.lightMap,ne=!!i.bumpMap&&i.wireframe===!1,re=!!i.normalMap,ie=!!i.displacementMap,ae=!!i.emissiveMap,oe=!!i.metalnessMap,se=!!i.roughnessMap,R=i.anisotropy>0,ce=i.clearcoat>0,le=i.dispersion>0,ue=i.retroreflectivity>0,de=i.iridescence>0,B=i.sheen>0,fe=i.transmission>0,pe=R&&!!i.anisotropyMap,me=ce&&!!i.clearcoatMap,he=ce&&!!i.clearcoatNormalMap,ge=ce&&!!i.clearcoatRoughnessMap,_e=de&&!!i.iridescenceMap,ve=de&&!!i.iridescenceThicknessMap,ye=B&&!!i.sheenColorMap,V=B&&!!i.sheenRoughnessMap,be=!!i.specularMap,xe=!!i.specularColorMap,Se=!!i.specularIntensityMap,Ce=fe&&!!i.transmissionMap,H=fe&&!!i.thicknessMap,we=!!i.gradientMap,U=!!i.alphaMap,Te=i.alphaTest>0,Ee=!!i.alphaHash,W=!!i.extensions,De=0;i.toneMapped&&(j===null||j.isXRRenderTarget===!0)&&(De=e.toneMapping);let Oe={shaderID:C,shaderType:i.type,shaderName:i.name,vertexShader:D,fragmentShader:O,defines:i.defines,customVertexShaderID:k,customFragmentShaderID:A,isRawShaderMaterial:i.isRawShaderMaterial===!0,glslVersion:i.glslVersion,precision:f,batching:P,batchingColor:P&&h._colorsTexture!==null,instancing:N,instancingColor:N&&h.instanceColor!==null,instancingMorph:N&&h.morphTexture!==null,outputColorSpace:j===null?e.outputColorSpace:j.isXRRenderTarget===!0?j.texture.colorSpace:G.workingColorSpace,alphaToCoverage:!!i.alphaToCoverage,map:F,matcap:I,envMap:ee,envMapMode:ee&&x.mapping,envMapCubeUVHeight:S,aoMap:te,lightMap:L,bumpMap:ne,normalMap:re,displacementMap:ie,emissiveMap:ae,normalMapObjectSpace:re&&i.normalMapType===1,normalMapTangentSpace:re&&i.normalMapType===0,packedNormalMap:re&&i.normalMapType===0&&us(i.normalMap.format),metalnessMap:oe,roughnessMap:se,anisotropy:R,anisotropyMap:pe,clearcoat:ce,clearcoatMap:me,clearcoatNormalMap:he,clearcoatRoughnessMap:ge,dispersion:le,retroreflection:ue,iridescence:de,iridescenceMap:_e,iridescenceThicknessMap:ve,sheen:B,sheenColorMap:ye,sheenRoughnessMap:V,specularMap:be,specularColorMap:xe,specularIntensityMap:Se,transmission:fe,transmissionMap:Ce,thicknessMap:H,gradientMap:we,opaque:i.transparent===!1&&i.blending===1&&i.alphaToCoverage===!1,alphaMap:U,alphaTest:Te,alphaHash:Ee,combine:i.combine,mapUv:F&&m(i.map.channel),aoMapUv:te&&m(i.aoMap.channel),lightMapUv:L&&m(i.lightMap.channel),bumpMapUv:ne&&m(i.bumpMap.channel),normalMapUv:re&&m(i.normalMap.channel),displacementMapUv:ie&&m(i.displacementMap.channel),emissiveMapUv:ae&&m(i.emissiveMap.channel),metalnessMapUv:oe&&m(i.metalnessMap.channel),roughnessMapUv:se&&m(i.roughnessMap.channel),anisotropyMapUv:pe&&m(i.anisotropyMap.channel),clearcoatMapUv:me&&m(i.clearcoatMap.channel),clearcoatNormalMapUv:he&&m(i.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ge&&m(i.clearcoatRoughnessMap.channel),iridescenceMapUv:_e&&m(i.iridescenceMap.channel),iridescenceThicknessMapUv:ve&&m(i.iridescenceThicknessMap.channel),sheenColorMapUv:ye&&m(i.sheenColorMap.channel),sheenRoughnessMapUv:V&&m(i.sheenRoughnessMap.channel),specularMapUv:be&&m(i.specularMap.channel),specularColorMapUv:xe&&m(i.specularColorMap.channel),specularIntensityMapUv:Se&&m(i.specularIntensityMap.channel),transmissionMapUv:Ce&&m(i.transmissionMap.channel),thicknessMapUv:H&&m(i.thicknessMap.channel),alphaMapUv:U&&m(i.alphaMap.channel),vertexTangents:!!v.attributes.tangent&&(re||R),vertexNormals:!!v.attributes.normal,vertexColors:i.vertexColors,vertexAlphas:i.vertexColors===!0&&!!v.attributes.color&&v.attributes.color.itemSize===4,pointsUvs:h.isPoints===!0&&!!v.attributes.uv&&(F||U),fog:!!_,useFog:i.fog===!0,fogExp2:!!_&&_.isFogExp2,flatShading:i.wireframe===!1&&(i.flatShading===!0||v.attributes.normal===void 0&&re===!1&&(i.isMeshLambertMaterial||i.isMeshPhongMaterial||i.isMeshStandardMaterial||i.isMeshPhysicalMaterial)),sizeAttenuation:i.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:M,skinning:h.isSkinnedMesh===!0,hasPositionAttribute:v.attributes.position!==void 0,morphTargets:v.morphAttributes.position!==void 0,morphNormals:v.morphAttributes.normal!==void 0,morphColors:v.morphAttributes.color!==void 0,morphTargetsCount:T,morphTextureStride:E,numSunLights:o.sun.length,numDirLights:o.directional.length,numPointLights:o.point.length,numSpotLights:o.spot.length,numSpotLightMaps:o.spotLightMap.length,numRectAreaLights:o.rectArea.length,numHemiLights:o.hemi.length,numSunLightShadows:o.sunShadowMap.length,numDirLightShadows:o.directionalShadowMap.length,numPointLightShadows:o.pointShadowMap.length,numSpotLightShadows:o.spotShadowMap.length,numSpotLightShadowsWithMaps:o.numSpotLightShadowsWithMaps,numLightProbes:o.numLightProbes,numLightProbeGrids:g.length,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:i.dithering,shadowMapEnabled:e.shadowMap.enabled&&l.length>0,shadowMapType:e.shadowMap.type,toneMapping:De,decodeVideoTexture:F&&i.map.isVideoTexture===!0&&G.getTransfer(i.map.colorSpace)===`srgb`,decodeVideoTextureEmissive:ae&&i.emissiveMap.isVideoTexture===!0&&G.getTransfer(i.emissiveMap.colorSpace)===`srgb`,premultipliedAlpha:i.premultipliedAlpha,doubleSided:i.side===2,flipSided:i.side===1,useDepthPacking:i.depthPacking>=0,depthPacking:i.depthPacking||0,index0AttributeName:i.index0AttributeName,extensionClipCullDistance:W&&i.extensions.clipCullDistance===!0&&n.has(`WEBGL_clip_cull_distance`),extensionMultiDraw:(W&&i.extensions.multiDraw===!0||P)&&n.has(`WEBGL_multi_draw`),rendererExtensionParallelShaderCompile:n.has(`KHR_parallel_shader_compile`),customProgramCacheKey:i.customProgramCacheKey()};return Oe.vertexUv1s=c.has(1),Oe.vertexUv2s=c.has(2),Oe.vertexUv3s=c.has(3),c.clear(),Oe}function g(t){let n=[];if(t.shaderID?n.push(t.shaderID):(n.push(t.customVertexShaderID),n.push(t.customFragmentShaderID)),t.defines!==void 0)for(let e in t.defines)n.push(e),n.push(t.defines[e]);return t.isRawShaderMaterial===!1&&(_(n,t),v(n,t),n.push(e.outputColorSpace)),n.push(t.customProgramCacheKey),n.join()}function _(e,t){e.push(t.precision),e.push(t.outputColorSpace),e.push(t.envMapMode),e.push(t.envMapCubeUVHeight),e.push(t.mapUv),e.push(t.alphaMapUv),e.push(t.lightMapUv),e.push(t.aoMapUv),e.push(t.bumpMapUv),e.push(t.normalMapUv),e.push(t.displacementMapUv),e.push(t.emissiveMapUv),e.push(t.metalnessMapUv),e.push(t.roughnessMapUv),e.push(t.anisotropyMapUv),e.push(t.clearcoatMapUv),e.push(t.clearcoatNormalMapUv),e.push(t.clearcoatRoughnessMapUv),e.push(t.iridescenceMapUv),e.push(t.iridescenceThicknessMapUv),e.push(t.sheenColorMapUv),e.push(t.sheenRoughnessMapUv),e.push(t.specularMapUv),e.push(t.specularColorMapUv),e.push(t.specularIntensityMapUv),e.push(t.transmissionMapUv),e.push(t.thicknessMapUv),e.push(t.combine),e.push(t.fogExp2),e.push(t.sizeAttenuation),e.push(t.morphTargetsCount),e.push(t.morphAttributeCount),e.push(t.numSunLights),e.push(t.numDirLights),e.push(t.numPointLights),e.push(t.numSpotLights),e.push(t.numSpotLightMaps),e.push(t.numHemiLights),e.push(t.numRectAreaLights),e.push(t.numSunLightShadows),e.push(t.numDirLightShadows),e.push(t.numPointLightShadows),e.push(t.numSpotLightShadows),e.push(t.numSpotLightShadowsWithMaps),e.push(t.numLightProbes),e.push(t.shadowMapType),e.push(t.toneMapping),e.push(t.numClippingPlanes),e.push(t.numClipIntersection),e.push(t.depthPacking)}function v(e,t){o.disableAll(),t.instancing&&o.enable(0),t.instancingColor&&o.enable(1),t.instancingMorph&&o.enable(2),t.matcap&&o.enable(3),t.envMap&&o.enable(4),t.normalMapObjectSpace&&o.enable(5),t.normalMapTangentSpace&&o.enable(6),t.clearcoat&&o.enable(7),t.iridescence&&o.enable(8),t.alphaTest&&o.enable(9),t.vertexColors&&o.enable(10),t.vertexAlphas&&o.enable(11),t.vertexUv1s&&o.enable(12),t.vertexUv2s&&o.enable(13),t.vertexUv3s&&o.enable(14),t.vertexTangents&&o.enable(15),t.anisotropy&&o.enable(16),t.alphaHash&&o.enable(17),t.batching&&o.enable(18),t.dispersion&&o.enable(19),t.retroreflection&&o.enable(24),t.batchingColor&&o.enable(20),t.gradientMap&&o.enable(21),t.packedNormalMap&&o.enable(22),t.vertexNormals&&o.enable(23),e.push(o.mask),o.disableAll(),t.fog&&o.enable(0),t.useFog&&o.enable(1),t.flatShading&&o.enable(2),t.logarithmicDepthBuffer&&o.enable(3),t.reversedDepthBuffer&&o.enable(4),t.skinning&&o.enable(5),t.morphTargets&&o.enable(6),t.morphNormals&&o.enable(7),t.morphColors&&o.enable(8),t.premultipliedAlpha&&o.enable(9),t.shadowMapEnabled&&o.enable(10),t.doubleSided&&o.enable(11),t.flipSided&&o.enable(12),t.useDepthPacking&&o.enable(13),t.dithering&&o.enable(14),t.transmission&&o.enable(15),t.sheen&&o.enable(16),t.opaque&&o.enable(17),t.pointsUvs&&o.enable(18),t.decodeVideoTexture&&o.enable(19),t.decodeVideoTextureEmissive&&o.enable(20),t.alphaToCoverage&&o.enable(21),t.numLightProbeGrids>0&&o.enable(22),t.hasPositionAttribute&&o.enable(23),e.push(o.mask)}function y(e){let t=p[e.type],n;if(t){let e=ji[t];n=yr.clone(e.uniforms)}else n=e.uniforms;return n}function b(t,n){let r=u.get(n);return r===void 0?(r=new os(e,n,t,i),l.push(r),u.set(n,r)):++r.usedTimes,r}function x(e){if(--e.usedTimes===0){let t=l.indexOf(e);l[t]=l[l.length-1],l.pop(),u.delete(e.cacheKey),e.destroy()}}function S(e){s.remove(e)}function C(){s.dispose()}return{getParameters:h,getProgramCacheKey:g,getUniforms:y,acquireProgram:b,releaseProgram:x,releaseShaderCache:S,programs:l,dispose:C}}function fs(){let e=new WeakMap;function t(t){return e.has(t)}function n(t){let n=e.get(t);return n===void 0&&(n={},e.set(t,n)),n}function r(t){e.delete(t)}function i(t,n,r){e.get(t)[n]=r}function a(){e=new WeakMap}return{has:t,get:n,remove:r,update:i,dispose:a}}function ps(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.material.id===t.material.id?e.materialVariant===t.materialVariant?e.z===t.z?e.id-t.id:e.z-t.z:e.materialVariant-t.materialVariant:e.material.id-t.material.id:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function ms(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.z===t.z?e.id-t.id:t.z-e.z:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function hs(){let e=[],t=0,n=[],r=[],i=[];function a(){t=0,n.length=0,r.length=0,i.length=0}function o(e){let t=0;return e.isInstancedMesh&&(t+=2),e.isSkinnedMesh&&(t+=1),t}function s(n,r,i,a,s,c){let l=e[t];return l===void 0?(l={id:n.id,object:n,geometry:r,material:i,materialVariant:o(n),groupOrder:a,renderOrder:n.renderOrder,z:s,group:c},e[t]=l):(l.id=n.id,l.object=n,l.geometry=r,l.material=i,l.materialVariant=o(n),l.groupOrder=a,l.renderOrder=n.renderOrder,l.z=s,l.group=c),t++,l}function c(e,t,a,o,c,l,u){u.reversedDepth===!0&&(c=-c);let d=s(e,t,a,o,c,l);a.transmission>0?r.push(d):a.transparent===!0?i.push(d):n.push(d)}function l(e,t,a,o,c,l){let u=s(e,t,a,o,c,l);a.transmission>0?r.unshift(u):a.transparent===!0?i.unshift(u):n.unshift(u)}function u(e,t){n.length>1&&n.sort(e||ps),r.length>1&&r.sort(t||ms),i.length>1&&i.sort(t||ms)}function d(){for(let n=t,r=e.length;n<r;n++){let t=e[n];if(t.id===null)break;t.id=null,t.object=null,t.geometry=null,t.material=null,t.group=null}}return{opaque:n,transmissive:r,transparent:i,init:a,push:c,unshift:l,finish:d,sort:u}}function gs(){let e=new WeakMap;function t(t,n){let r=e.get(t),i;return r===void 0?(i=new hs,e.set(t,[i])):n>=r.length?(i=new hs,r.push(i)):i=r[n],i}function n(){e=new WeakMap}return{get:t,dispose:n}}function _s(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`SunLight`:case`DirectionalLight`:n={direction:new U,color:new X};break;case`SpotLight`:n={position:new U,direction:new U,color:new X,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case`PointLight`:n={position:new U,color:new X,distance:0,decay:0};break;case`HemisphereLight`:n={direction:new U,skyColor:new X,groundColor:new X};break;case`RectAreaLight`:n={color:new X,position:new U,halfWidth:new U,halfHeight:new U}}return e[t.id]=n,n}}}function vs(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`SunLight`:case`DirectionalLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new H};break;case`SpotLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new H};break;case`PointLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new H,shadowCameraNear:1,shadowCameraFar:1e3}}return e[t.id]=n,n}}}var ys=0;function bs(e,t){return(t.castShadow?2:0)-(e.castShadow?2:0)+ +!!t.map-!!e.map}function xs(e){let t=new _s,n=vs(),r={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let e=0;e<9;e++)r.probe.push(new U);let i=new U,a=new He,o=new He;function s(i){let a=0,o=0,s=0;for(let e=0;e<9;e++)r.probe[e].set(0,0,0);let c=0,l=0,u=0,d=0,f=0,p=0,m=0,h=0,g=0,_=0,v=0,y=0,b=0,x=0;i.sort(bs);for(let e=0,S=i.length;e<S;e++){let S=i[e],C=S.color,w=S.intensity,T=S.distance,E=null;if(S.shadow&&S.shadow.map&&(E=S.shadow.map.texture.format===1030?S.shadow.map.texture:S.shadow.map.depthTexture||S.shadow.map.texture),S.isAmbientLight)a+=C.r*w,o+=C.g*w,s+=C.b*w;else if(S.isLightProbe){for(let e=0;e<9;e++)r.probe[e].addScaledVector(S.sh.coefficients[e],w);x++}else if(S.isSunLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize.copy(e.mapSize).multiply(e.getFrameExtents()),r.sunShadow[l]=t,r.sunShadowMap[l]=E;let i=e.getViewportCount();for(let t=0;t<i;t++)r.sunShadowMatrix[u+t]=e.getMatrix(t),r.sunShadowCascade[u+t]=e._cascadeData[t];u+=i,l++}r.sun[c]=e,c++}else if(S.isDirectionalLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,r.directionalShadow[d]=t,r.directionalShadowMap[d]=E,r.directionalShadowMatrix[d]=S.shadow.matrix,g++}r.directional[d]=e,d++}else if(S.isSpotLight){let e=t.get(S);e.position.setFromMatrixPosition(S.matrixWorld),e.color.copy(C).multiplyScalar(w),e.distance=T,e.coneCos=Math.cos(S.angle),e.penumbraCos=Math.cos(S.angle*(1-S.penumbra)),e.decay=S.decay,r.spot[p]=e;let i=S.shadow;if(S.map&&(r.spotLightMap[y]=S.map,y++,i.updateMatrices(S),S.castShadow&&b++),r.spotLightMatrix[p]=i.matrix,S.castShadow){let e=n.get(S);e.shadowIntensity=i.intensity,e.shadowBias=i.bias,e.shadowNormalBias=i.normalBias,e.shadowRadius=i.radius,e.shadowMapSize=i.mapSize,r.spotShadow[p]=e,r.spotShadowMap[p]=E,v++}p++}else if(S.isRectAreaLight){let e=t.get(S);e.color.copy(C).multiplyScalar(w),e.halfWidth.set(S.width*.5,0,0),e.halfHeight.set(0,S.height*.5,0),r.rectArea[m]=e,m++}else if(S.isPointLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),e.distance=S.distance,e.decay=S.decay,S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,t.shadowCameraNear=e.camera.near,t.shadowCameraFar=e.camera.far,r.pointShadow[f]=t,r.pointShadowMap[f]=E,r.pointShadowMatrix[f]=S.shadow.matrix,_++}r.point[f]=e,f++}else if(S.isHemisphereLight){let e=t.get(S);e.skyColor.copy(S.color).multiplyScalar(w),e.groundColor.copy(S.groundColor).multiplyScalar(w),r.hemi[h]=e,h++}}m>0&&(e.has(`OES_texture_float_linear`)===!0?(r.rectAreaLTC1=Q.LTC_FLOAT_1,r.rectAreaLTC2=Q.LTC_FLOAT_2):(r.rectAreaLTC1=Q.LTC_HALF_1,r.rectAreaLTC2=Q.LTC_HALF_2)),r.ambient[0]=a,r.ambient[1]=o,r.ambient[2]=s;let S=r.hash;(S.sunLength!==c||S.directionalLength!==d||S.pointLength!==f||S.spotLength!==p||S.rectAreaLength!==m||S.hemiLength!==h||S.numSunShadows!==l||S.numDirectionalShadows!==g||S.numPointShadows!==_||S.numSpotShadows!==v||S.numSpotMaps!==y||S.numLightProbes!==x)&&(r.sun.length=c,r.directional.length=d,r.spot.length=p,r.rectArea.length=m,r.point.length=f,r.hemi.length=h,r.sunShadow.length=l,r.sunShadowMap.length=l,r.sunShadowMatrix.length=u,r.sunShadowCascade.length=u,r.directionalShadow.length=g,r.directionalShadowMap.length=g,r.directionalShadowMatrix.length=g,r.pointShadow.length=_,r.pointShadowMap.length=_,r.pointShadowMatrix.length=_,r.spotShadow.length=v,r.spotShadowMap.length=v,r.spotLightMatrix.length=v+y-b,r.spotLightMap.length=y,r.numSpotLightShadowsWithMaps=b,r.numLightProbes=x,S.sunLength=c,S.directionalLength=d,S.pointLength=f,S.spotLength=p,S.rectAreaLength=m,S.hemiLength=h,S.numSunShadows=l,S.numDirectionalShadows=g,S.numPointShadows=_,S.numSpotShadows=v,S.numSpotMaps=y,S.numLightProbes=x,r.version=ys++)}function c(e,t){let n=0,s=0,c=0,l=0,u=0,d=0,f=t.matrixWorldInverse;for(let t=0,p=e.length;t<p;t++){let p=e[t];if(p.isSunLight){let e=r.sun[n];e.direction.setFromMatrixPosition(p.matrixWorld),e.direction.transformDirection(f),n++}else if(p.isDirectionalLight){let e=r.directional[s];e.direction.setFromMatrixPosition(p.matrixWorld),i.setFromMatrixPosition(p.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(f),s++}else if(p.isSpotLight){let e=r.spot[l];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),e.direction.setFromMatrixPosition(p.matrixWorld),i.setFromMatrixPosition(p.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(f),l++}else if(p.isRectAreaLight){let e=r.rectArea[u];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),o.identity(),a.copy(p.matrixWorld),a.premultiply(f),o.extractRotation(a),e.halfWidth.set(p.width*.5,0,0),e.halfHeight.set(0,p.height*.5,0),e.halfWidth.applyMatrix4(o),e.halfHeight.applyMatrix4(o),u++}else if(p.isPointLight){let e=r.point[c];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),c++}else if(p.isHemisphereLight){let e=r.hemi[d];e.direction.setFromMatrixPosition(p.matrixWorld),e.direction.transformDirection(f),d++}}}return{setup:s,setupView:c,state:r}}function Ss(e){let t=new xs(e),n=[],r=[],i=[];function a(e){d.camera=e,n.length=0,r.length=0,i.length=0}function o(e){n.push(e)}function s(e){r.push(e)}function c(e){i.push(e)}function l(){t.setup(n)}function u(e){t.setupView(n,e)}let d={lightsArray:n,shadowsArray:r,lightProbeGridArray:i,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:a,state:d,setupLights:l,setupLightsView:u,pushLight:o,pushShadow:s,pushLightProbeGrid:c}}function Cs(e){let t=new WeakMap;function n(n,r=0){let i=t.get(n),a;return i===void 0?(a=new Ss(e),t.set(n,[a])):r>=i.length?(a=new Ss(e),i.push(a)):a=i[r],a}function r(){t=new WeakMap}return{get:n,dispose:r}}var ws=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Ts=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,Es=[new U(1,0,0),new U(-1,0,0),new U(0,1,0),new U(0,-1,0),new U(0,0,1),new U(0,0,-1)],Ds=[new U(0,-1,0),new U(0,-1,0),new U(0,0,1),new U(0,0,-1),new U(0,-1,0),new U(0,-1,0)],Os=new He,ks=new U,As=new U;function js(e,t,n){let r=new or,i=new H,a=new H,o=new Le,s=new Tr,c=new Er,l={},u=n.maxTextureSize,d={0:1,1:0,2:2},m=new Sr({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new H},radius:{value:4}},vertexShader:ws,fragmentShader:Ts}),h=m.clone();h.defines.HORIZONTAL_PASS=1;let g=new bn;g.setAttribute(`position`,new an(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let b=new Wn(g,m),x=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=1;let S=this.type;this.render=function(t,n,s){if(x.enabled===!1||x.autoUpdate===!1&&x.needsUpdate===!1||t.length===0)return;this.type===2&&(z(`WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead.`),this.type=1);let c=e.getRenderTarget(),l=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),m=e.state;m.setBlending(0),m.buffers.depth.getReversed()===!0?m.buffers.color.setClear(0,0,0,0):m.buffers.color.setClear(1,1,1,1),m.buffers.depth.setTest(!0),m.setScissorTest(!1);let h=S!==this.type;h&&n.traverse(function(e){e.material&&(Array.isArray(e.material)?e.material.forEach(e=>e.needsUpdate=!0):e.material.needsUpdate=!0)});for(let c=0,l=t.length;c<l;c++){let l=t[c],d=l.shadow;if(d===void 0){z(`WebGLShadowMap:`,l,`has no shadow.`);continue}if(d.autoUpdate===!1&&d.needsUpdate===!1)continue;i.copy(d.mapSize);let g=d.getFrameExtents();i.multiply(g),a.copy(d.mapSize),(i.x>u||i.y>u)&&(i.x>u&&(a.x=Math.floor(u/g.x),i.x=a.x*g.x,d.mapSize.x=a.x),i.y>u&&(a.y=Math.floor(u/g.y),i.y=a.y*g.y,d.mapSize.y=a.y));let b=e.state.buffers.depth.getReversed();if(d.camera._reversedDepth=b,d.map===null||h===!0){if(d.map!==null&&(d.map.depthTexture!==null&&(d.map.depthTexture.dispose(),d.map.depthTexture=null),d.map.dispose()),this.type===3){if(l.isPointLight){z(`WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.`);continue}d.map=new ze(i.x,i.y,{format:O,type:y,minFilter:p,magFilter:p,generateMipmaps:!1}),d.map.texture.name=l.name+`.shadowMap`,d.map.depthTexture=new cr(i.x,i.y,v),d.map.depthTexture.name=l.name+`.shadowMapDepth`,d.map.depthTexture.format=w,d.map.depthTexture.compareFunction=null,d.map.depthTexture.minFilter=f,d.map.depthTexture.magFilter=f}else l.isPointLight?(d.map=new sa(i.x),d.map.depthTexture=new lr(i.x,_)):(d.map=new ze(i.x,i.y),d.map.depthTexture=new cr(i.x,i.y,_)),d.map.depthTexture.name=l.name+`.shadowMap`,d.map.depthTexture.format=w,this.type===1?(d.map.depthTexture.compareFunction=b?518:515,d.map.depthTexture.minFilter=p,d.map.depthTexture.magFilter=p):(d.map.depthTexture.compareFunction=null,d.map.depthTexture.minFilter=f,d.map.depthTexture.magFilter=f);d.camera.updateProjectionMatrix()}d.map.isWebGLCubeRenderTarget!==!0&&(d.map.width!==i.x||d.map.height!==i.y)&&d.map.setSize(i.x,i.y);let x=d.map.isWebGLCubeRenderTarget?6:d.getViewportCount();l.isPointLight!==!0&&d.updateMatrices(l,s);for(let t=0;t<x;t++){let i=d.getCamera(t);if(l.isPointLight){let e=d.camera,n=d.matrix,r=l.distance||e.far;r!==e.far&&(e.far=r,e.updateProjectionMatrix()),ks.setFromMatrixPosition(l.matrixWorld),e.position.copy(ks),As.copy(e.position),As.add(Es[t]),e.up.copy(Ds[t]),e.lookAt(As),e.updateMatrixWorld(),n.makeTranslation(-ks.x,-ks.y,-ks.z),Os.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),d._frustum.setFromProjectionMatrix(Os,e.coordinateSystem,e.reversedDepth)}if(d.map.isWebGLCubeRenderTarget)e.setRenderTarget(d.map,t),e.clear();else{t===0&&(e.setRenderTarget(d.map),e.clear());let n=d.getViewport(t);o.set(a.x*n.x,a.y*n.y,a.x*n.z,a.y*n.w),m.viewport(o)}r=d.getFrustum(t),E(n,s,i,l,this.type)}d.isPointLightShadow!==!0&&this.type===3&&C(d,s),d.needsUpdate=!1}S=this.type,x.needsUpdate=!1,e.setRenderTarget(c,l,d)};function C(n,r){let a=t.update(b);m.defines.VSM_SAMPLES!==n.blurSamples&&(m.defines.VSM_SAMPLES=n.blurSamples,h.defines.VSM_SAMPLES=n.blurSamples,m.needsUpdate=!0,h.needsUpdate=!0),n.mapPass===null?n.mapPass=new ze(i.x,i.y,{format:O,type:y}):(n.mapPass.width!==n.map.width||n.mapPass.height!==n.map.height)&&n.mapPass.setSize(n.map.width,n.map.height),m.uniforms.shadow_pass.value=n.map.depthTexture,m.uniforms.resolution.value.set(n.map.width,n.map.height),m.uniforms.radius.value=n.radius,e.setRenderTarget(n.mapPass),e.clear(),e.renderBufferDirect(r,null,a,m,b,null),h.uniforms.shadow_pass.value=n.mapPass.texture,h.uniforms.resolution.value.set(n.map.width,n.map.height),h.uniforms.radius.value=n.radius,e.setRenderTarget(n.map),e.clear(),e.renderBufferDirect(r,null,a,h,b,null)}function T(t,n,r,i){let a=null,o=r.isPointLight===!0?t.customDistanceMaterial:t.customDepthMaterial;if(o!==void 0)a=o;else if(a=r.isPointLight===!0?c:s,e.localClippingEnabled&&n.clipShadows===!0&&Array.isArray(n.clippingPlanes)&&n.clippingPlanes.length!==0||n.displacementMap&&n.displacementScale!==0||n.alphaMap&&n.alphaTest>0||n.map&&n.alphaTest>0||n.alphaToCoverage===!0){let e=a.uuid,t=n.uuid,r=l[e];r===void 0&&(r={},l[e]=r);let i=r[t];i===void 0&&(i=a.clone(),r[t]=i,n.addEventListener(`dispose`,D)),a=i}if(a.visible=n.visible,a.wireframe=n.wireframe,i===3?a.side=n.shadowSide===null?n.side:n.shadowSide:a.side=n.shadowSide===null?d[n.side]:n.shadowSide,a.alphaMap=n.alphaMap,a.alphaTest=n.alphaToCoverage===!0?.5:n.alphaTest,a.map=n.map,a.clipShadows=n.clipShadows,a.clippingPlanes=n.clippingPlanes,a.clipIntersection=n.clipIntersection,a.displacementMap=n.displacementMap,a.displacementScale=n.displacementScale,a.displacementBias=n.displacementBias,a.wireframeLinewidth=n.wireframeLinewidth,a.linewidth=n.linewidth,r.isPointLight===!0&&a.isMeshDistanceMaterial===!0){let t=e.properties.get(a);t.light=r}return a}function E(n,i,a,o,s){if(n.visible===!1)return;if(n.layers.test(i.layers)&&(n.isMesh||n.isLine||n.isPoints)&&(n.castShadow||n.receiveShadow&&s===3)&&(!n.frustumCulled||n.intersectsFrustum(r))){n.modelViewMatrix.multiplyMatrices(a.matrixWorldInverse,n.matrixWorld);let r=t.update(n),c=n.material;if(Array.isArray(c)){let t=r.groups;for(let l=0,u=t.length;l<u;l++){let u=t[l],d=c[u.materialIndex];if(d&&d.visible){let t=T(n,d,o,s);n.onBeforeShadow(e,n,i,a,r,t,u),e.renderBufferDirect(a,null,r,t,n,u),n.onAfterShadow(e,n,i,a,r,t,u)}}}else if(c.visible){let t=T(n,c,o,s);n.onBeforeShadow(e,n,i,a,r,t,null),e.renderBufferDirect(a,null,r,t,n,null),n.onAfterShadow(e,n,i,a,r,t,null)}}let c=n.children;for(let e=0,t=c.length;e<t;e++)E(c[e],i,a,o,s)}function D(e){e.target.removeEventListener(`dispose`,D);for(let t in l){let n=l[t],r=e.target.uuid;r in n&&(n[r].dispose(),delete n[r])}}}function Ms(e,t){function n(){let t=!1,n=new Le,r=null,i=new Le(0,0,0,0);return{setMask:function(n){r!==n&&!t&&(e.colorMask(n,n,n,n),r=n)},setLocked:function(e){t=e},setClear:function(t,r,a,o,s){s===!0&&(t*=o,r*=o,a*=o),n.set(t,r,a,o),i.equals(n)===!1&&(e.clearColor(t,r,a,o),i.copy(n))},reset:function(){t=!1,r=null,i.set(-1,0,0,0)}}}function r(){let n=!1,r=!1,i=null,a=null,o=null;return{setReversed:function(e){if(r!==e){let n=t.get(`EXT_clip_control`);e?n.clipControlEXT(n.LOWER_LEFT_EXT,n.ZERO_TO_ONE_EXT):n.clipControlEXT(n.LOWER_LEFT_EXT,n.NEGATIVE_ONE_TO_ONE_EXT),r=e;let i=o;o=null,this.setClear(i)}},getReversed:function(){return r},setTest:function(t){t?oe(e.DEPTH_TEST):se(e.DEPTH_TEST)},setMask:function(t){i!==t&&!n&&(e.depthMask(t),i=t)},setFunc:function(t){if(r&&(t=me[t]),a!==t){switch(t){case 0:e.depthFunc(e.NEVER);break;case 1:e.depthFunc(e.ALWAYS);break;case 2:e.depthFunc(e.LESS);break;case 3:e.depthFunc(e.LEQUAL);break;case 4:e.depthFunc(e.EQUAL);break;case 5:e.depthFunc(e.GEQUAL);break;case 6:e.depthFunc(e.GREATER);break;case 7:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}a=t}},setLocked:function(e){n=e},setClear:function(t){o!==t&&(o=t,r&&(t=1-t),e.clearDepth(t))},reset:function(){n=!1,i=null,a=null,o=null,r=!1}}}function i(){let t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null;return{setTest:function(n){t||(n?oe(e.STENCIL_TEST):se(e.STENCIL_TEST))},setMask:function(r){n!==r&&!t&&(e.stencilMask(r),n=r)},setFunc:function(t,n,o){(r!==t||i!==n||a!==o)&&(e.stencilFunc(t,n,o),r=t,i=n,a=o)},setOp:function(t,n,r){(o!==t||s!==n||c!==r)&&(e.stencilOp(t,n,r),o=t,s=n,c=r)},setLocked:function(e){t=e},setClear:function(t){l!==t&&(e.clearStencil(t),l=t)},reset:function(){t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null}}}let a=new n,o=new r,s=new i,c=new WeakMap,l=new WeakMap,u={},d={},f={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new X(0,0,0),T=0,E=!1,D=null,O=null,k=null,A=null,j=null,M=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS),N=!1,P=0,F=e.getParameter(e.VERSION);F.indexOf(`WebGL`)===-1?F.indexOf(`OpenGL ES`)!==-1&&(P=parseFloat(/^OpenGL ES (\d)/.exec(F)[1]),N=P>=2):(P=parseFloat(/^WebGL (\d)/.exec(F)[1]),N=P>=1);let I=null,ee={},te=e.getParameter(e.SCISSOR_BOX),L=e.getParameter(e.VIEWPORT),ne=new Le().fromArray(te),re=new Le().fromArray(L);function ie(t,n,r,i){let a=new Uint8Array(4),o=e.createTexture();e.bindTexture(t,o),e.texParameteri(t,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(t,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let o=0;o<r;o++)t===e.TEXTURE_3D||t===e.TEXTURE_2D_ARRAY?e.texImage3D(n,0,e.RGBA,1,1,i,0,e.RGBA,e.UNSIGNED_BYTE,a):e.texImage2D(n+o,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,a);return o}let ae={};ae[e.TEXTURE_2D]=ie(e.TEXTURE_2D,e.TEXTURE_2D,1),ae[e.TEXTURE_CUBE_MAP]=ie(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),ae[e.TEXTURE_2D_ARRAY]=ie(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),ae[e.TEXTURE_3D]=ie(e.TEXTURE_3D,e.TEXTURE_3D,1,1),a.setClear(0,0,0,1),o.setClear(1),s.setClear(0),oe(e.DEPTH_TEST),o.setFunc(3),pe(!1),he(1),oe(e.CULL_FACE),z(0);function oe(t){u[t]!==!0&&(e.enable(t),u[t]=!0)}function se(t){u[t]!==!1&&(e.disable(t),u[t]=!1)}function R(t,n){return f[t]!==n&&(e.bindFramebuffer(t,n),f[t]=n,t===e.DRAW_FRAMEBUFFER&&(f[e.FRAMEBUFFER]=n),t===e.FRAMEBUFFER&&(f[e.DRAW_FRAMEBUFFER]=n),!0)}function ce(t,n){let r=m,i=!1;if(t){r=p.get(n),r===void 0&&(r=[],p.set(n,r));let a=t.textures;if(r.length!==a.length||r[0]!==e.COLOR_ATTACHMENT0){for(let t=0,n=a.length;t<n;t++)r[t]=e.COLOR_ATTACHMENT0+t;r.length=a.length,i=!0}}else r[0]!==e.BACK&&(r[0]=e.BACK,i=!0);i&&e.drawBuffers(r)}function le(t){return h!==t&&(e.useProgram(t),h=t,!0)}let ue={100:e.FUNC_ADD,101:e.FUNC_SUBTRACT,102:e.FUNC_REVERSE_SUBTRACT};ue[103]=e.MIN,ue[104]=e.MAX;let de={200:e.ZERO,201:e.ONE,202:e.SRC_COLOR,204:e.SRC_ALPHA,210:e.SRC_ALPHA_SATURATE,208:e.DST_COLOR,206:e.DST_ALPHA,203:e.ONE_MINUS_SRC_COLOR,205:e.ONE_MINUS_SRC_ALPHA,209:e.ONE_MINUS_DST_COLOR,207:e.ONE_MINUS_DST_ALPHA,211:e.CONSTANT_COLOR,212:e.ONE_MINUS_CONSTANT_COLOR,213:e.CONSTANT_ALPHA,214:e.ONE_MINUS_CONSTANT_ALPHA};function z(t,n,r,i,a,o,s,c,l,u){if(t===0){g===!0&&(se(e.BLEND),g=!1);return}if(g===!1&&(oe(e.BLEND),g=!0),t!==5){if(t!==_||u!==E){if((v!==100||x!==100)&&(e.blendEquation(e.FUNC_ADD),v=100,x=100),u)switch(t){case 1:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFunc(e.ONE,e.ONE);break;case 3:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case 4:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:B(`WebGLState: Invalid blending: `,t)}else switch(t){case 1:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case 3:B(`WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true`);break;case 4:B(`WebGLState: MultiplyBlending requires material.premultipliedAlpha = true`);break;default:B(`WebGLState: Invalid blending: `,t)}y=null,b=null,S=null,C=null,w.set(0,0,0),T=0,_=t,E=u}return}a=a||n,o=o||r,s=s||i,(n!==v||a!==x)&&(e.blendEquationSeparate(ue[n],ue[a]),v=n,x=a),(r!==y||i!==b||o!==S||s!==C)&&(e.blendFuncSeparate(de[r],de[i],de[o],de[s]),y=r,b=i,S=o,C=s),(c.equals(w)===!1||l!==T)&&(e.blendColor(c.r,c.g,c.b,l),w.copy(c),T=l),_=t,E=!1}function fe(t,n){t.side===2?se(e.CULL_FACE):oe(e.CULL_FACE);let r=t.side===1;n&&(r=!r),pe(r),t.blending===1&&t.transparent===!1?z(0):z(t.blending,t.blendEquation,t.blendSrc,t.blendDst,t.blendEquationAlpha,t.blendSrcAlpha,t.blendDstAlpha,t.blendColor,t.blendAlpha,t.premultipliedAlpha),o.setFunc(t.depthFunc),o.setTest(t.depthTest),o.setMask(t.depthWrite),a.setMask(t.colorWrite);let i=t.stencilWrite;s.setTest(i),i&&(s.setMask(t.stencilWriteMask),s.setFunc(t.stencilFunc,t.stencilRef,t.stencilFuncMask),s.setOp(t.stencilFail,t.stencilZFail,t.stencilZPass)),_e(t.polygonOffset,t.polygonOffsetFactor,t.polygonOffsetUnits),t.alphaToCoverage===!0?oe(e.SAMPLE_ALPHA_TO_COVERAGE):se(e.SAMPLE_ALPHA_TO_COVERAGE)}function pe(t){D!==t&&(t?e.frontFace(e.CW):e.frontFace(e.CCW),D=t)}function he(t){t===0?se(e.CULL_FACE):(oe(e.CULL_FACE),t!==O&&(t===1?e.cullFace(e.BACK):t===2?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))),O=t}function ge(t){t!==k&&(N&&e.lineWidth(t),k=t)}function _e(t,n,r){t?(oe(e.POLYGON_OFFSET_FILL),(A!==n||j!==r)&&(A=n,j=r,o.getReversed()&&(n=-n),e.polygonOffset(n,r))):se(e.POLYGON_OFFSET_FILL)}function ve(t){t?oe(e.SCISSOR_TEST):se(e.SCISSOR_TEST)}function ye(t){t===void 0&&(t=e.TEXTURE0+M-1),I!==t&&(e.activeTexture(t),I=t)}function V(t,n,r){r===void 0&&(r=I===null?e.TEXTURE0+M-1:I);let i=ee[r];i===void 0&&(i={type:void 0,texture:void 0},ee[r]=i),(i.type!==t||i.texture!==n)&&(I!==r&&(e.activeTexture(r),I=r),e.bindTexture(t,n||ae[t]),i.type=t,i.texture=n)}function be(){let t=ee[I];t!==void 0&&t.type!==void 0&&(e.bindTexture(t.type,null),t.type=void 0,t.texture=void 0)}function xe(){try{e.compressedTexImage2D(...arguments)}catch(e){B(`WebGLState:`,e)}}function Se(){try{e.compressedTexImage3D(...arguments)}catch(e){B(`WebGLState:`,e)}}function Ce(){try{e.texSubImage2D(...arguments)}catch(e){B(`WebGLState:`,e)}}function H(){try{e.texSubImage3D(...arguments)}catch(e){B(`WebGLState:`,e)}}function we(){try{e.compressedTexSubImage2D(...arguments)}catch(e){B(`WebGLState:`,e)}}function U(){try{e.compressedTexSubImage3D(...arguments)}catch(e){B(`WebGLState:`,e)}}function Te(){try{e.texStorage2D(...arguments)}catch(e){B(`WebGLState:`,e)}}function Ee(){try{e.texStorage3D(...arguments)}catch(e){B(`WebGLState:`,e)}}function W(){try{e.texImage2D(...arguments)}catch(e){B(`WebGLState:`,e)}}function De(){try{e.texImage3D(...arguments)}catch(e){B(`WebGLState:`,e)}}function Oe(t){return d[t]===void 0?e.getParameter(t):d[t]}function ke(t,n){d[t]!==n&&(e.pixelStorei(t,n),d[t]=n)}function Ae(t){ne.equals(t)===!1&&(e.scissor(t.x,t.y,t.z,t.w),ne.copy(t))}function G(t){re.equals(t)===!1&&(e.viewport(t.x,t.y,t.z,t.w),re.copy(t))}function je(t,n){let r=l.get(n);r===void 0&&(r=new WeakMap,l.set(n,r));let i=r.get(t);i===void 0&&(i=e.getUniformBlockIndex(n,t.name),r.set(t,i))}function K(t,n){let r=l.get(n).get(t);c.get(n)!==r&&(e.uniformBlockBinding(n,r,t.__bindingPointIndex),c.set(n,r))}function Me(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),o.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),e.pixelStorei(e.PACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,e.BROWSER_DEFAULT_WEBGL),e.pixelStorei(e.PACK_ROW_LENGTH,0),e.pixelStorei(e.PACK_SKIP_PIXELS,0),e.pixelStorei(e.PACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_ROW_LENGTH,0),e.pixelStorei(e.UNPACK_IMAGE_HEIGHT,0),e.pixelStorei(e.UNPACK_SKIP_PIXELS,0),e.pixelStorei(e.UNPACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_SKIP_IMAGES,0),u={},d={},I=null,ee={},f={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new X(0,0,0),T=0,E=!1,D=null,O=null,k=null,A=null,j=null,ne.set(0,0,e.canvas.width,e.canvas.height),re.set(0,0,e.canvas.width,e.canvas.height),a.reset(),o.reset(),s.reset()}return{buffers:{color:a,depth:o,stencil:s},enable:oe,disable:se,bindFramebuffer:R,drawBuffers:ce,useProgram:le,setBlending:z,setMaterial:fe,setFlipSided:pe,setCullFace:he,setLineWidth:ge,setPolygonOffset:_e,setScissorTest:ve,activeTexture:ye,bindTexture:V,unbindTexture:be,compressedTexImage2D:xe,compressedTexImage3D:Se,texImage2D:W,texImage3D:De,pixelStorei:ke,getParameter:Oe,updateUBOMapping:je,uniformBlockBinding:K,texStorage2D:Te,texStorage3D:Ee,texSubImage2D:Ce,texSubImage3D:H,compressedTexSubImage2D:we,compressedTexSubImage3D:U,scissor:Ae,viewport:G,reset:Me}}function Ns(e,t,n,r,i,a,o){let s=t.has(`WEBGL_multisampled_render_to_texture`)?t.get(`WEBGL_multisampled_render_to_texture`):null,c=typeof navigator>`u`?!1:/OculusBrowser/g.test(navigator.userAgent),h=new H,g=new WeakMap,_=new Set,v,y=new WeakMap,b=!1;try{b=typeof OffscreenCanvas<`u`&&new OffscreenCanvas(1,1).getContext(`2d`)!==null}catch{}function x(e,t){return b?new OffscreenCanvas(e,t):R(`canvas`)}function S(e,t,n){let r=1,i=Oe(e);if((i.width>n||i.height>n)&&(r=n/Math.max(i.width,i.height)),r<1){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap||typeof VideoFrame<`u`&&e instanceof VideoFrame){let n=Math.floor(r*i.width),a=Math.floor(r*i.height);v===void 0&&(v=x(n,a));let o=t?x(n,a):v;return o.width=n,o.height=a,o.getContext(`2d`).drawImage(e,0,0,n,a),z(`WebGLRenderer: Texture has been resized from (`+i.width+`x`+i.height+`) to (`+n+`x`+a+`).`),o}return`data`in e&&z(`WebGLRenderer: Image in DataTexture is too big (`+i.width+`x`+i.height+`).`),e}return e}function C(e){return e.generateMipmaps}function w(t){e.generateMipmap(t)}function E(t){return t.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:t.isWebGL3DRenderTarget?e.TEXTURE_3D:t.isWebGLArrayRenderTarget||t.isCompressedArrayTexture?e.TEXTURE_2D_ARRAY:e.TEXTURE_2D}function D(n,r,i,a,o,s=!1){if(n!==null){if(e[n]!==void 0)return e[n];z(`WebGLRenderer: Attempt to use non-existing WebGL internal format '`+n+`'`)}let c;a&&(c=t.get(`EXT_texture_norm16`),c||z(`WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension`));let l=r;if(r===e.RED&&(i===e.FLOAT&&(l=e.R32F),i===e.HALF_FLOAT&&(l=e.R16F),i===e.UNSIGNED_BYTE&&(l=e.R8),i===e.UNSIGNED_SHORT&&c&&(l=c.R16_EXT),i===e.SHORT&&c&&(l=c.R16_SNORM_EXT)),r===e.RED_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.R8UI),i===e.UNSIGNED_SHORT&&(l=e.R16UI),i===e.UNSIGNED_INT&&(l=e.R32UI),i===e.BYTE&&(l=e.R8I),i===e.SHORT&&(l=e.R16I),i===e.INT&&(l=e.R32I)),r===e.RG&&(i===e.FLOAT&&(l=e.RG32F),i===e.HALF_FLOAT&&(l=e.RG16F),i===e.UNSIGNED_BYTE&&(l=e.RG8),i===e.UNSIGNED_SHORT&&c&&(l=c.RG16_EXT),i===e.SHORT&&c&&(l=c.RG16_SNORM_EXT)),r===e.RG_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RG8UI),i===e.UNSIGNED_SHORT&&(l=e.RG16UI),i===e.UNSIGNED_INT&&(l=e.RG32UI),i===e.BYTE&&(l=e.RG8I),i===e.SHORT&&(l=e.RG16I),i===e.INT&&(l=e.RG32I)),r===e.RGB_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RGB8UI),i===e.UNSIGNED_SHORT&&(l=e.RGB16UI),i===e.UNSIGNED_INT&&(l=e.RGB32UI),i===e.BYTE&&(l=e.RGB8I),i===e.SHORT&&(l=e.RGB16I),i===e.INT&&(l=e.RGB32I)),r===e.RGBA_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RGBA8UI),i===e.UNSIGNED_SHORT&&(l=e.RGBA16UI),i===e.UNSIGNED_INT&&(l=e.RGBA32UI),i===e.BYTE&&(l=e.RGBA8I),i===e.SHORT&&(l=e.RGBA16I),i===e.INT&&(l=e.RGBA32I)),r===e.RGB&&(i===e.UNSIGNED_SHORT&&c&&(l=c.RGB16_EXT),i===e.SHORT&&c&&(l=c.RGB16_SNORM_EXT),i===e.UNSIGNED_INT_5_9_9_9_REV&&(l=e.RGB9_E5),i===e.UNSIGNED_INT_10F_11F_11F_REV&&(l=e.R11F_G11F_B10F)),r===e.RGBA){let t=s?ne:G.getTransfer(o);i===e.FLOAT&&(l=e.RGBA32F),i===e.HALF_FLOAT&&(l=e.RGBA16F),i===e.UNSIGNED_BYTE&&(l=t===`srgb`?e.SRGB8_ALPHA8:e.RGBA8),i===e.UNSIGNED_SHORT&&c&&(l=c.RGBA16_EXT),i===e.SHORT&&c&&(l=c.RGBA16_SNORM_EXT),i===e.UNSIGNED_SHORT_4_4_4_4&&(l=e.RGBA4),i===e.UNSIGNED_SHORT_5_5_5_1&&(l=e.RGB5_A1)}return(l===e.R16F||l===e.R32F||l===e.RG16F||l===e.RG32F||l===e.RGBA16F||l===e.RGBA32F)&&t.get(`EXT_color_buffer_float`),l}function O(t,n){let r;return t?n===null||n===1014||n===1020?r=e.DEPTH24_STENCIL8:n===1015?r=e.DEPTH32F_STENCIL8:n===1012&&(r=e.DEPTH24_STENCIL8,z(`DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.`)):n===null||n===1014||n===1020?r=e.DEPTH_COMPONENT24:n===1015?r=e.DEPTH_COMPONENT32F:n===1012&&(r=e.DEPTH_COMPONENT16),r}function k(e,t){return C(e)===!0||e.isFramebufferTexture&&e.minFilter!==1003&&e.minFilter!==1006?Math.log2(Math.max(t.width,t.height))+1:e.mipmaps!==void 0&&e.mipmaps.length>0?e.mipmaps.length:e.isCompressedTexture&&Array.isArray(e.image)?t.mipmaps.length:1}function A(e){let t=e.target;t.removeEventListener(`dispose`,A),M(t),t.isVideoTexture&&g.delete(t),t.isHTMLTexture&&_.delete(t)}function j(e){let t=e.target;t.removeEventListener(`dispose`,j),P(t)}function M(e){let t=r.get(e);if(t.__webglInit===void 0)return;let n=e.source,i=y.get(n);if(i){let r=i[t.__cacheKey];r.usedTimes--,r.usedTimes===0&&N(e),Object.keys(i).length===0&&y.delete(n)}r.remove(e)}function N(t){let n=r.get(t);e.deleteTexture(n.__webglTexture);let i=t.source,a=y.get(i);delete a[n.__cacheKey],o.memory.textures--}function P(t){let n=r.get(t);if(t.depthTexture&&(t.depthTexture.dispose(),r.remove(t.depthTexture)),t.isWebGLCubeRenderTarget)for(let t=0;t<6;t++){if(Array.isArray(n.__webglFramebuffer[t]))for(let r=0;r<n.__webglFramebuffer[t].length;r++)e.deleteFramebuffer(n.__webglFramebuffer[t][r]);else e.deleteFramebuffer(n.__webglFramebuffer[t]);n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer[t])}else{if(Array.isArray(n.__webglFramebuffer))for(let t=0;t<n.__webglFramebuffer.length;t++)e.deleteFramebuffer(n.__webglFramebuffer[t]);else e.deleteFramebuffer(n.__webglFramebuffer);if(n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer),n.__webglMultisampledFramebuffer&&e.deleteFramebuffer(n.__webglMultisampledFramebuffer),n.__webglColorRenderbuffer)for(let t=0;t<n.__webglColorRenderbuffer.length;t++)n.__webglColorRenderbuffer[t]&&e.deleteRenderbuffer(n.__webglColorRenderbuffer[t]);n.__webglDepthRenderbuffer&&e.deleteRenderbuffer(n.__webglDepthRenderbuffer)}let i=t.textures;for(let t=0,n=i.length;t<n;t++){let n=r.get(i[t]);n.__webglTexture&&(e.deleteTexture(n.__webglTexture),o.memory.textures--),r.remove(i[t])}r.remove(t)}let F=0;function I(){F=0}function ee(){return F}function te(e){F=e}function L(){let e=F;return e>=i.maxTextures&&z(`WebGLTextures: Trying to use `+(e+1)+` texture units while this GPU supports only `+i.maxTextures),F+=1,e}function re(e){let t=[];return t.push(e.wrapS),t.push(e.wrapT),t.push(e.wrapR||0),t.push(e.magFilter),t.push(e.minFilter),t.push(e.anisotropy),t.push(e.internalFormat),t.push(e.format),t.push(e.type),t.push(e.generateMipmaps),t.push(e.premultiplyAlpha),t.push(e.flipY),t.push(e.unpackAlignment),t.push(e.colorSpace),t.join()}function ie(t,i){let a=r.get(t);if(t.isVideoTexture&&W(t),t.isRenderTargetTexture===!1&&t.isExternalTexture!==!0&&t.version>0&&a.__version!==t.version){let e=t.image;if(e===null)z(`WebGLRenderer: Texture marked for update but no image data found.`);else if(e.complete===!1)z(`WebGLRenderer: Texture marked for update but image is incomplete`);else{he(a,t,i);return}}else t.isExternalTexture&&(a.__webglTexture=t.sourceTexture?t.sourceTexture:null);n.bindTexture(e.TEXTURE_2D,a.__webglTexture,e.TEXTURE0+i)}function ae(t,i){let a=r.get(t);if(t.isRenderTargetTexture===!1&&t.version>0&&a.__version!==t.version){he(a,t,i);return}t.isExternalTexture&&(a.__webglTexture=t.sourceTexture?t.sourceTexture:null),n.bindTexture(e.TEXTURE_2D_ARRAY,a.__webglTexture,e.TEXTURE0+i)}function oe(t,i){let a=r.get(t);if(t.isRenderTargetTexture===!1&&t.version>0&&a.__version!==t.version){he(a,t,i);return}n.bindTexture(e.TEXTURE_3D,a.__webglTexture,e.TEXTURE0+i)}function se(t,i){let a=r.get(t);if(t.isCubeDepthTexture!==!0&&t.version>0&&a.__version!==t.version){ge(a,t,i);return}n.bindTexture(e.TEXTURE_CUBE_MAP,a.__webglTexture,e.TEXTURE0+i)}let ce={[l]:e.REPEAT,[u]:e.CLAMP_TO_EDGE,[d]:e.MIRRORED_REPEAT},le={[f]:e.NEAREST,1004:e.NEAREST_MIPMAP_NEAREST,1005:e.NEAREST_MIPMAP_LINEAR,[p]:e.LINEAR,1007:e.LINEAR_MIPMAP_NEAREST,[m]:e.LINEAR_MIPMAP_LINEAR},ue={512:e.NEVER,519:e.ALWAYS,513:e.LESS,515:e.LEQUAL,514:e.EQUAL,518:e.GEQUAL,516:e.GREATER,517:e.NOTEQUAL};function de(n,a){if(a.type===1015&&t.has(`OES_texture_float_linear`)===!1&&(a.magFilter===1006||a.magFilter===1007||a.magFilter===1005||a.magFilter===1008||a.minFilter===1006||a.minFilter===1007||a.minFilter===1005||a.minFilter===1008)&&z(`WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device.`),e.texParameteri(n,e.TEXTURE_WRAP_S,ce[a.wrapS]),e.texParameteri(n,e.TEXTURE_WRAP_T,ce[a.wrapT]),(n===e.TEXTURE_3D||n===e.TEXTURE_2D_ARRAY)&&e.texParameteri(n,e.TEXTURE_WRAP_R,ce[a.wrapR]),e.texParameteri(n,e.TEXTURE_MAG_FILTER,le[a.magFilter]),e.texParameteri(n,e.TEXTURE_MIN_FILTER,le[a.minFilter]),a.compareFunction&&(e.texParameteri(n,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(n,e.TEXTURE_COMPARE_FUNC,ue[a.compareFunction])),t.has(`EXT_texture_filter_anisotropic`)===!0){if(a.magFilter===1003||a.minFilter!==1005&&a.minFilter!==1008||a.type===1015&&t.has(`OES_texture_float_linear`)===!1)return;if(a.anisotropy>1||r.get(a).__currentAnisotropy){let o=t.get(`EXT_texture_filter_anisotropic`);e.texParameterf(n,o.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(a.anisotropy,i.getMaxAnisotropy())),r.get(a).__currentAnisotropy=a.anisotropy}}}function fe(t,n){let r=!1;t.__webglInit===void 0&&(t.__webglInit=!0,n.addEventListener(`dispose`,A));let i=n.source,a=y.get(i);a===void 0&&(a={},y.set(i,a));let s=re(n);if(s!==t.__cacheKey){a[s]===void 0&&(a[s]={texture:e.createTexture(),usedTimes:0},o.memory.textures++,r=!0),a[s].usedTimes++;let i=a[t.__cacheKey];i!==void 0&&(a[t.__cacheKey].usedTimes--,i.usedTimes===0&&N(n)),t.__cacheKey=s,t.__webglTexture=a[s].texture}return r}function pe(e,t,n){return Math.floor(Math.floor(e/n)/t)}function me(t,r,i,a){let o=t.updateRanges;if(o.length===0)n.texSubImage2D(e.TEXTURE_2D,0,0,0,r.width,r.height,i,a,r.data);else{o.sort((e,t)=>e.start-t.start);let s=0;for(let e=1;e<o.length;e++){let t=o[s],n=o[e],i=t.start+t.count,a=pe(n.start,r.width,4),c=pe(t.start,r.width,4);n.start<=i+1&&a===c&&pe(n.start+n.count-1,r.width,4)===a?t.count=Math.max(t.count,n.start+n.count-t.start):(++s,o[s]=n)}o.length=s+1;let c=n.getParameter(e.UNPACK_ROW_LENGTH),l=n.getParameter(e.UNPACK_SKIP_PIXELS),u=n.getParameter(e.UNPACK_SKIP_ROWS);n.pixelStorei(e.UNPACK_ROW_LENGTH,r.width);for(let t=0,s=o.length;t<s;t++){let s=o[t],c=Math.floor(s.start/4),l=Math.ceil(s.count/4),u=c%r.width,d=Math.floor(c/r.width),f=l;n.pixelStorei(e.UNPACK_SKIP_PIXELS,u),n.pixelStorei(e.UNPACK_SKIP_ROWS,d),n.texSubImage2D(e.TEXTURE_2D,0,u,d,f,1,i,a,r.data)}t.clearUpdateRanges(),n.pixelStorei(e.UNPACK_ROW_LENGTH,c),n.pixelStorei(e.UNPACK_SKIP_PIXELS,l),n.pixelStorei(e.UNPACK_SKIP_ROWS,u)}}function he(t,o,s){let c=e.TEXTURE_2D;(o.isDataArrayTexture||o.isCompressedArrayTexture)&&(c=e.TEXTURE_2D_ARRAY),o.isData3DTexture&&(c=e.TEXTURE_3D);let l=fe(t,o),u=o.source;n.bindTexture(c,t.__webglTexture,e.TEXTURE0+s);let d=r.get(u);if(u.version!==d.__version||l===!0){if(n.activeTexture(e.TEXTURE0+s),!(typeof ImageBitmap<`u`&&o.image instanceof ImageBitmap)){let t=G.getPrimaries(G.workingColorSpace),r=o.colorSpace===``?null:G.getPrimaries(o.colorSpace),i=o.colorSpace===``||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,o.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,o.premultiplyAlpha),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,i)}n.pixelStorei(e.UNPACK_ALIGNMENT,o.unpackAlignment);let t=S(o.image,!1,i.maxTextureSize);t=De(o,t);let r=a.convert(o.format,o.colorSpace),f=a.convert(o.type),p=D(o.internalFormat,r,f,o.normalized,o.colorSpace,o.isVideoTexture);de(c,o);let m,h=o.mipmaps,g=o.isVideoTexture!==!0,v=d.__version===void 0||l===!0,y=u.dataReady,b=k(o,t);if(o.isDepthTexture)p=O(o.format===T,o.type),v&&(g?n.texStorage2D(e.TEXTURE_2D,1,p,t.width,t.height):n.texImage2D(e.TEXTURE_2D,0,p,t.width,t.height,0,r,f,null));else if(o.isDataTexture){if(h.length>0){g&&v&&n.texStorage2D(e.TEXTURE_2D,b,p,h[0].width,h[0].height);for(let t=0,i=h.length;t<i;t++)m=h[t],g?y&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,m.width,m.height,r,f,m.data):n.texImage2D(e.TEXTURE_2D,t,p,m.width,m.height,0,r,f,m.data);o.generateMipmaps=!1}else g?(v&&n.texStorage2D(e.TEXTURE_2D,b,p,t.width,t.height),y&&me(o,t,r,f)):n.texImage2D(e.TEXTURE_2D,0,p,t.width,t.height,0,r,f,t.data)}else if(o.isCompressedTexture){if(o.isCompressedArrayTexture){g&&v&&n.texStorage3D(e.TEXTURE_2D_ARRAY,b,p,h[0].width,h[0].height,t.depth);for(let i=0,a=h.length;i<a;i++)if(m=h[i],o.format!==1023){if(r!==null){if(g){if(y){if(o.layerUpdates.size>0){let t=Di(m.width,m.height,o.format,o.type);for(let a of o.layerUpdates){let o=m.data.subarray(a*t/m.data.BYTES_PER_ELEMENT,(a+1)*t/m.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,a,m.width,m.height,1,r,o)}}else n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,0,m.width,m.height,t.depth,r,m.data)}}else n.compressedTexImage3D(e.TEXTURE_2D_ARRAY,i,p,m.width,m.height,t.depth,0,m.data,0,0)}else z(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`)}else g?y&&n.texSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,0,m.width,m.height,t.depth,r,f,m.data):n.texImage3D(e.TEXTURE_2D_ARRAY,i,p,m.width,m.height,t.depth,0,r,f,m.data);o.layerUpdates.size>0&&o.clearLayerUpdates()}else{g&&v&&n.texStorage2D(e.TEXTURE_2D,b,p,h[0].width,h[0].height);for(let t=0,i=h.length;t<i;t++)m=h[t],o.format===1023?g?y&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,m.width,m.height,r,f,m.data):n.texImage2D(e.TEXTURE_2D,t,p,m.width,m.height,0,r,f,m.data):r===null?z(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`):g?y&&n.compressedTexSubImage2D(e.TEXTURE_2D,t,0,0,m.width,m.height,r,m.data):n.compressedTexImage2D(e.TEXTURE_2D,t,p,m.width,m.height,0,m.data)}}else if(o.isDataArrayTexture){if(g){if(v&&n.texStorage3D(e.TEXTURE_2D_ARRAY,b,p,t.width,t.height,t.depth),y){if(o.layerUpdates.size>0){let i=Di(t.width,t.height,o.format,o.type);for(let a of o.layerUpdates){let o=t.data.subarray(a*i/t.data.BYTES_PER_ELEMENT,(a+1)*i/t.data.BYTES_PER_ELEMENT);n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,a,t.width,t.height,1,r,f,o)}o.clearLayerUpdates()}else n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,t.width,t.height,t.depth,r,f,t.data)}}else n.texImage3D(e.TEXTURE_2D_ARRAY,0,p,t.width,t.height,t.depth,0,r,f,t.data)}else if(o.isData3DTexture)g?(v&&n.texStorage3D(e.TEXTURE_3D,b,p,t.width,t.height,t.depth),y&&n.texSubImage3D(e.TEXTURE_3D,0,0,0,0,t.width,t.height,t.depth,r,f,t.data)):n.texImage3D(e.TEXTURE_3D,0,p,t.width,t.height,t.depth,0,r,f,t.data);else if(o.isFramebufferTexture){if(v){if(g)n.texStorage2D(e.TEXTURE_2D,b,p,t.width,t.height);else{let i=t.width,a=t.height;for(let t=0;t<b;t++)n.texImage2D(e.TEXTURE_2D,t,p,i,a,0,r,f,null),i>>=1,a>>=1}}}else if(o.isHTMLTexture){if(`texElementImage2D`in e){let n=e.canvas;if(n.hasAttribute(`layoutsubtree`)||n.setAttribute(`layoutsubtree`,`true`),t.parentNode!==n){n.appendChild(t),_.add(o),n.onpaint=e=>{let t=e.changedElements;for(let e of _)t.includes(e.image)&&(e.needsUpdate=!0)},n.requestPaint();return}if(e.texElementImage2D.length===3)e.texElementImage2D(e.TEXTURE_2D,e.RGBA8,t);else{let n=e.RGBA,r=e.RGBA,i=e.UNSIGNED_BYTE;e.texElementImage2D(e.TEXTURE_2D,0,n,r,i,t)}e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE)}}else if(h.length>0){if(g&&v){let t=Oe(h[0]);n.texStorage2D(e.TEXTURE_2D,b,p,t.width,t.height)}for(let t=0,i=h.length;t<i;t++)m=h[t],g?y&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,r,f,m):n.texImage2D(e.TEXTURE_2D,t,p,r,f,m);o.generateMipmaps=!1}else if(g){if(v){let r=Oe(t);n.texStorage2D(e.TEXTURE_2D,b,p,r.width,r.height)}y&&n.texSubImage2D(e.TEXTURE_2D,0,0,0,r,f,t)}else n.texImage2D(e.TEXTURE_2D,0,p,r,f,t);C(o)&&w(c),d.__version=u.version,o.onUpdate&&o.onUpdate(o)}t.__version=o.version}function ge(t,o,s){if(o.image.length!==6)return;let c=fe(t,o),l=o.source;n.bindTexture(e.TEXTURE_CUBE_MAP,t.__webglTexture,e.TEXTURE0+s);let u=r.get(l);if(l.version!==u.__version||c===!0){n.activeTexture(e.TEXTURE0+s);let t=G.getPrimaries(G.workingColorSpace),r=o.colorSpace===``?null:G.getPrimaries(o.colorSpace),d=o.colorSpace===``||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,o.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,o.premultiplyAlpha),n.pixelStorei(e.UNPACK_ALIGNMENT,o.unpackAlignment),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,d);let f=o.isCompressedTexture||o.image[0].isCompressedTexture,p=o.image[0]&&o.image[0].isDataTexture,m=[];for(let e=0;e<6;e++)!f&&!p?m[e]=S(o.image[e],!0,i.maxCubemapSize):m[e]=p?o.image[e].image:o.image[e],m[e]=De(o,m[e]);let h=m[0],g=a.convert(o.format,o.colorSpace),_=a.convert(o.type),v=D(o.internalFormat,g,_,o.normalized,o.colorSpace),y=o.isVideoTexture!==!0,b=u.__version===void 0||c===!0,x=l.dataReady,T=k(o,h);de(e.TEXTURE_CUBE_MAP,o);let E;if(f){y&&b&&n.texStorage2D(e.TEXTURE_CUBE_MAP,T,v,h.width,h.height);for(let t=0;t<6;t++){E=m[t].mipmaps;for(let r=0;r<E.length;r++){let i=E[r];o.format===1023?y?x&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,g,_,i.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,v,i.width,i.height,0,g,_,i.data):g===null?z(`WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()`):y?x&&n.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,g,i.data):n.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,v,i.width,i.height,0,i.data)}}}else{if(E=o.mipmaps,y&&b){E.length>0&&T++;let t=Oe(m[0]);n.texStorage2D(e.TEXTURE_CUBE_MAP,T,v,t.width,t.height)}for(let t=0;t<6;t++)if(p){y?x&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,m[t].width,m[t].height,g,_,m[t].data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,v,m[t].width,m[t].height,0,g,_,m[t].data);for(let r=0;r<E.length;r++){let i=E[r].image[t].image;y?x&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,0,0,i.width,i.height,g,_,i.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,v,i.width,i.height,0,g,_,i.data)}}else{y?x&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,g,_,m[t]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,v,g,_,m[t]);for(let r=0;r<E.length;r++){let i=E[r];y?x&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,0,0,g,_,i.image[t]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,v,g,_,i.image[t])}}}C(o)&&w(e.TEXTURE_CUBE_MAP),u.__version=l.version,o.onUpdate&&o.onUpdate(o)}t.__version=o.version}function _e(t,i,o,c,l,u){let d=a.convert(o.format,o.colorSpace),f=a.convert(o.type),p=D(o.internalFormat,d,f,o.normalized,o.colorSpace),m=r.get(i),h=r.get(o);if(h.__renderTarget=i,!m.__hasExternalTextures){let t=Math.max(1,i.width>>u),r=Math.max(1,i.height>>u);l===e.TEXTURE_3D||l===e.TEXTURE_2D_ARRAY?n.texImage3D(l,u,p,t,r,i.depth,0,d,f,null):n.texImage2D(l,u,p,t,r,0,d,f,null)}n.bindFramebuffer(e.FRAMEBUFFER,t),Ee(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,c,l,h.__webglTexture,0,Te(i)):(l===e.TEXTURE_2D||l>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&l<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,c,l,h.__webglTexture,u),n.bindFramebuffer(e.FRAMEBUFFER,null)}function ve(t,n,r){if(e.bindRenderbuffer(e.RENDERBUFFER,t),n.depthBuffer){let i=n.depthTexture,a=i&&i.isDepthTexture?i.type:null,o=O(n.stencilBuffer,a),c=n.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;Ee(n)?s.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,Te(n),o,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,Te(n),o,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,o,n.width,n.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,c,e.RENDERBUFFER,t)}else{let t=n.textures;for(let i=0;i<t.length;i++){let o=t[i],c=a.convert(o.format,o.colorSpace),l=a.convert(o.type),u=D(o.internalFormat,c,l,o.normalized,o.colorSpace);Ee(n)?s.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,Te(n),u,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,Te(n),u,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,u,n.width,n.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function ye(t,i,o){let c=i.isWebGLCubeRenderTarget===!0;if(n.bindFramebuffer(e.FRAMEBUFFER,t),!(i.depthTexture&&i.depthTexture.isDepthTexture))throw Error(`THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.`);let l=r.get(i.depthTexture);if(l.__renderTarget=i,(!l.__webglTexture||i.depthTexture.image.width!==i.width||i.depthTexture.image.height!==i.height)&&(i.depthTexture.image.width=i.width,i.depthTexture.image.height=i.height,i.depthTexture.needsUpdate=!0),c){if(l.__webglInit===void 0&&(l.__webglInit=!0,i.depthTexture.addEventListener(`dispose`,A)),l.__webglTexture===void 0){l.__webglTexture=e.createTexture(),n.bindTexture(e.TEXTURE_CUBE_MAP,l.__webglTexture),de(e.TEXTURE_CUBE_MAP,i.depthTexture);let t=a.convert(i.depthTexture.format),r=a.convert(i.depthTexture.type),o;i.depthTexture.format===1026?o=e.DEPTH_COMPONENT24:i.depthTexture.format===1027&&(o=e.DEPTH24_STENCIL8);for(let n=0;n<6;n++)e.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+n,0,o,i.width,i.height,0,t,r,null)}}else ie(i.depthTexture,0);let u=l.__webglTexture,d=Te(i),f=c?e.TEXTURE_CUBE_MAP_POSITIVE_X+o:e.TEXTURE_2D,p=i.depthTexture.format===1027?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;if(i.depthTexture.format===1026)Ee(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,p,f,u,0,d):e.framebufferTexture2D(e.FRAMEBUFFER,p,f,u,0);else if(i.depthTexture.format===1027)Ee(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,p,f,u,0,d):e.framebufferTexture2D(e.FRAMEBUFFER,p,f,u,0);else throw Error(`THREE.WebGLTextures: Unknown depthTexture format.`)}function V(t){let i=r.get(t),a=t.isWebGLCubeRenderTarget===!0;if(i.__boundDepthTexture!==t.depthTexture){let e=t.depthTexture;if(i.__depthDisposeCallback&&i.__depthDisposeCallback(),e){let t=()=>{delete i.__boundDepthTexture,delete i.__depthDisposeCallback,e.removeEventListener(`dispose`,t)};e.addEventListener(`dispose`,t),i.__depthDisposeCallback=t}i.__boundDepthTexture=e}if(t.depthTexture&&!i.__autoAllocateDepthBuffer){if(a)for(let e=0;e<6;e++)ye(i.__webglFramebuffer[e],t,e);else{let e=t.texture.mipmaps;e&&e.length>0?ye(i.__webglFramebuffer[0],t,0):ye(i.__webglFramebuffer,t,0)}}else if(a){i.__webglDepthbuffer=[];for(let r=0;r<6;r++)if(n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer[r]),i.__webglDepthbuffer[r]===void 0)i.__webglDepthbuffer[r]=e.createRenderbuffer(),ve(i.__webglDepthbuffer[r],t,!1);else{let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,a=i.__webglDepthbuffer[r];e.bindRenderbuffer(e.RENDERBUFFER,a),e.framebufferRenderbuffer(e.FRAMEBUFFER,n,e.RENDERBUFFER,a)}}else{let r=t.texture.mipmaps;if(r&&r.length>0?n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer[0]):n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer),i.__webglDepthbuffer===void 0)i.__webglDepthbuffer=e.createRenderbuffer(),ve(i.__webglDepthbuffer,t,!1);else{let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,r=i.__webglDepthbuffer;e.bindRenderbuffer(e.RENDERBUFFER,r),e.framebufferRenderbuffer(e.FRAMEBUFFER,n,e.RENDERBUFFER,r)}}n.bindFramebuffer(e.FRAMEBUFFER,null)}function be(t,n,i){let a=r.get(t);n!==void 0&&_e(a.__webglFramebuffer,t,t.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),i!==void 0&&V(t)}function xe(t){let i=t.texture,s=r.get(t),c=r.get(i);t.addEventListener(`dispose`,j);let l=t.textures,u=t.isWebGLCubeRenderTarget===!0,d=l.length>1;if(d||(c.__webglTexture===void 0&&(c.__webglTexture=e.createTexture()),c.__version=i.version,o.memory.textures++),u){s.__webglFramebuffer=[];for(let t=0;t<6;t++)if(i.mipmaps&&i.mipmaps.length>0){s.__webglFramebuffer[t]=[];for(let n=0;n<i.mipmaps.length;n++)s.__webglFramebuffer[t][n]=e.createFramebuffer()}else s.__webglFramebuffer[t]=e.createFramebuffer()}else{if(i.mipmaps&&i.mipmaps.length>0){s.__webglFramebuffer=[];for(let t=0;t<i.mipmaps.length;t++)s.__webglFramebuffer[t]=e.createFramebuffer()}else s.__webglFramebuffer=e.createFramebuffer();if(d)for(let t=0,n=l.length;t<n;t++){let n=r.get(l[t]);n.__webglTexture===void 0&&(n.__webglTexture=e.createTexture(),o.memory.textures++)}if(t.samples>0&&Ee(t)===!1){s.__webglMultisampledFramebuffer=e.createFramebuffer(),s.__webglColorRenderbuffer=[],n.bindFramebuffer(e.FRAMEBUFFER,s.__webglMultisampledFramebuffer);for(let n=0;n<l.length;n++){let r=l[n];s.__webglColorRenderbuffer[n]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,s.__webglColorRenderbuffer[n]);let i=a.convert(r.format,r.colorSpace),o=a.convert(r.type),c=D(r.internalFormat,i,o,r.normalized,r.colorSpace,t.isXRRenderTarget===!0),u=Te(t);e.renderbufferStorageMultisample(e.RENDERBUFFER,u,c,t.width,t.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+n,e.RENDERBUFFER,s.__webglColorRenderbuffer[n])}e.bindRenderbuffer(e.RENDERBUFFER,null),t.depthBuffer&&(s.__webglDepthRenderbuffer=e.createRenderbuffer(),ve(s.__webglDepthRenderbuffer,t,!0)),n.bindFramebuffer(e.FRAMEBUFFER,null)}}if(u){n.bindTexture(e.TEXTURE_CUBE_MAP,c.__webglTexture),de(e.TEXTURE_CUBE_MAP,i);for(let n=0;n<6;n++)if(i.mipmaps&&i.mipmaps.length>0)for(let r=0;r<i.mipmaps.length;r++)_e(s.__webglFramebuffer[n][r],t,i,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+n,r);else _e(s.__webglFramebuffer[n],t,i,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+n,0);C(i)&&w(e.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(d){for(let i=0,a=l.length;i<a;i++){let a=l[i],o=r.get(a),c=e.TEXTURE_2D;(t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(c=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(c,o.__webglTexture),de(c,a),_e(s.__webglFramebuffer,t,a,e.COLOR_ATTACHMENT0+i,c,0),C(a)&&w(c)}n.unbindTexture()}else{let r=e.TEXTURE_2D;if((t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(r=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(r,c.__webglTexture),de(r,i),i.mipmaps&&i.mipmaps.length>0)for(let n=0;n<i.mipmaps.length;n++)_e(s.__webglFramebuffer[n],t,i,e.COLOR_ATTACHMENT0,r,n);else _e(s.__webglFramebuffer,t,i,e.COLOR_ATTACHMENT0,r,0);C(i)&&w(r),n.unbindTexture()}t.depthBuffer&&V(t)}function Se(e){let t=e.textures;for(let i=0,a=t.length;i<a;i++){let a=t[i];if(C(a)){let t=E(e),i=r.get(a).__webglTexture;n.bindTexture(t,i),w(t),n.unbindTexture()}}}let Ce=[],we=[];function U(t){if(t.samples>0){if(Ee(t)===!1){let i=t.textures,a=t.width,o=t.height,s=e.COLOR_BUFFER_BIT,l=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,u=r.get(t),d=i.length>1;if(d)for(let t=0;t<i.length;t++)n.bindFramebuffer(e.FRAMEBUFFER,u.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,null),n.bindFramebuffer(e.FRAMEBUFFER,u.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,null,0);n.bindFramebuffer(e.READ_FRAMEBUFFER,u.__webglMultisampledFramebuffer);let f=t.texture.mipmaps;f&&f.length>0?n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglFramebuffer[0]):n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglFramebuffer);for(let n=0;n<i.length;n++){if(t.resolveDepthBuffer&&(t.depthBuffer&&(s|=e.DEPTH_BUFFER_BIT),t.stencilBuffer&&t.resolveStencilBuffer&&(s|=e.STENCIL_BUFFER_BIT)),d){e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,u.__webglColorRenderbuffer[n]);let t=r.get(i[n]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,t,0)}e.blitFramebuffer(0,0,a,o,0,0,a,o,s,e.NEAREST),c===!0&&(Ce.length=0,we.length=0,Ce.push(e.COLOR_ATTACHMENT0+n),t.depthBuffer&&t.storeMultisampledDepthBuffer===!1&&(Ce.push(l),we.push(l),e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,we)),e.invalidateFramebuffer(e.READ_FRAMEBUFFER,Ce))}if(n.bindFramebuffer(e.READ_FRAMEBUFFER,null),n.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),d)for(let t=0;t<i.length;t++){n.bindFramebuffer(e.FRAMEBUFFER,u.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,u.__webglColorRenderbuffer[t]);let a=r.get(i[t]).__webglTexture;n.bindFramebuffer(e.FRAMEBUFFER,u.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,a,0)}n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglMultisampledFramebuffer)}else if(t.depthBuffer&&t.storeMultisampledDepthBuffer===!1&&c){let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[n])}}}function Te(e){return Math.min(i.maxSamples,e.samples)}function Ee(e){let n=r.get(e);return e.samples>0&&t.has(`WEBGL_multisampled_render_to_texture`)===!0&&n.__useRenderToTexture!==!1}function W(e){let t=o.render.frame;g.get(e)!==t&&(g.set(e,t),e.update())}function De(e,t){let n=e.colorSpace,r=e.format,i=e.type;return e.isCompressedTexture===!0||e.isVideoTexture===!0||n!==`srgb-linear`&&n!==``&&(G.getTransfer(n)===`srgb`?(r!==1023||i!==1009)&&z(`WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.`):B(`WebGLTextures: Unsupported texture color space:`,n)),t}function Oe(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement?(h.width=e.naturalWidth||e.width,h.height=e.naturalHeight||e.height):typeof VideoFrame<`u`&&e instanceof VideoFrame?(h.width=e.displayWidth,h.height=e.displayHeight):(h.width=e.width,h.height=e.height),h}this.allocateTextureUnit=L,this.resetTextureUnits=I,this.getTextureUnits=ee,this.setTextureUnits=te,this.setTexture2D=ie,this.setTexture2DArray=ae,this.setTexture3D=oe,this.setTextureCube=se,this.rebindTextures=be,this.setupRenderTarget=xe,this.updateRenderTargetMipmap=Se,this.updateMultisampleRenderTarget=U,this.setupDepthRenderbuffer=V,this.setupFrameBufferTexture=_e,this.useMultisampledRTT=Ee,this.isReversedDepthBuffer=function(){return n.buffers.depth.getReversed()}}function Ps(e,t){function n(n,r=``){let i,a=G.getTransfer(r);if(n===1009)return e.UNSIGNED_BYTE;if(n===1017)return e.UNSIGNED_SHORT_4_4_4_4;if(n===1018)return e.UNSIGNED_SHORT_5_5_5_1;if(n===35902)return e.UNSIGNED_INT_5_9_9_9_REV;if(n===35899)return e.UNSIGNED_INT_10F_11F_11F_REV;if(n===1010)return e.BYTE;if(n===1011)return e.SHORT;if(n===1012)return e.UNSIGNED_SHORT;if(n===1013)return e.INT;if(n===1014)return e.UNSIGNED_INT;if(n===1015)return e.FLOAT;if(n===1016)return e.HALF_FLOAT;if(n===1021)return e.ALPHA;if(n===1022)return e.RGB;if(n===1023)return e.RGBA;if(n===1026)return e.DEPTH_COMPONENT;if(n===1027)return e.DEPTH_STENCIL;if(n===1028)return e.RED;if(n===1029)return e.RED_INTEGER;if(n===1030)return e.RG;if(n===1031)return e.RG_INTEGER;if(n===1033)return e.RGBA_INTEGER;if(n===33776||n===33777||n===33778||n===33779){if(a===`srgb`){if(i=t.get(`WEBGL_compressed_texture_s3tc_srgb`),i!==null){if(n===33776)return i.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null}else if(i=t.get(`WEBGL_compressed_texture_s3tc`),i!==null){if(n===33776)return i.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null}if(n===35840||n===35841||n===35842||n===35843){if(i=t.get(`WEBGL_compressed_texture_pvrtc`),i!==null){if(n===35840)return i.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===35841)return i.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===35842)return i.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===35843)return i.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null}if(n===36196||n===37492||n===37496||n===37488||n===37489||n===37490||n===37491){if(i=t.get(`WEBGL_compressed_texture_etc`),i!==null){if(n===36196||n===37492)return a===`srgb`?i.COMPRESSED_SRGB8_ETC2:i.COMPRESSED_RGB8_ETC2;if(n===37496)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:i.COMPRESSED_RGBA8_ETC2_EAC;if(n===37488)return i.COMPRESSED_R11_EAC;if(n===37489)return i.COMPRESSED_SIGNED_R11_EAC;if(n===37490)return i.COMPRESSED_RG11_EAC;if(n===37491)return i.COMPRESSED_SIGNED_RG11_EAC}else return null}if(n===37808||n===37809||n===37810||n===37811||n===37812||n===37813||n===37814||n===37815||n===37816||n===37817||n===37818||n===37819||n===37820||n===37821){if(i=t.get(`WEBGL_compressed_texture_astc`),i!==null){if(n===37808)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:i.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===37809)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:i.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===37810)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:i.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===37811)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:i.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===37812)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:i.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===37813)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:i.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===37814)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:i.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===37815)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:i.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===37816)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:i.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===37817)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:i.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===37818)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:i.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===37819)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:i.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===37820)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:i.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===37821)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:i.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null}if(n===36492||n===36494||n===36495){if(i=t.get(`EXT_texture_compression_bptc`),i!==null){if(n===36492)return a===`srgb`?i.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:i.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===36494)return i.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===36495)return i.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null}if(n===36283||n===36284||n===36285||n===36286){if(i=t.get(`EXT_texture_compression_rgtc`),i!==null){if(n===36283)return i.COMPRESSED_RED_RGTC1_EXT;if(n===36284)return i.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===36285)return i.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===36286)return i.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null}return n===1020?e.UNSIGNED_INT_24_8:e[n]===void 0?null:e[n]}return{convert:n}}var Fs=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Is=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,Ls=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new ur(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new Sr({vertexShader:Fs,fragmentShader:Is,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Wn(new pr(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Rs=class extends he{constructor(e,t){super();let n=this,r=null,i=1,a=null,o=`local-floor`,s=1,c=null,l=null,u=null,d=null,f=null,p=null,m=typeof XRWebGLBinding<`u`,g=new Ls,v={},y=t.getContextAttributes(),b=null,x=null,E=[],D=[],O=new H,k=null,A=null,j=new ai;j.viewport=new Le;let M=new ai;M.viewport=new Le;let N=[j,M],P=new fi,F=null,I=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(e){let t=E[e];return t===void 0&&(t=new vt,E[e]=t),t.getTargetRaySpace()},this.getControllerGrip=function(e){let t=E[e];return t===void 0&&(t=new vt,E[e]=t),t.getGripSpace()},this.getHand=function(e){let t=E[e];return t===void 0&&(t=new vt,E[e]=t),t.getHandSpace()};function ee(e){let t=D.indexOf(e.inputSource);if(t===-1)return;let n=E[t];n!==void 0&&(n.update(e.inputSource,e.frame,c||a),n.dispatchEvent({type:e.type,data:e.inputSource}))}function te(){r.removeEventListener(`select`,ee),r.removeEventListener(`selectstart`,ee),r.removeEventListener(`selectend`,ee),r.removeEventListener(`squeeze`,ee),r.removeEventListener(`squeezestart`,ee),r.removeEventListener(`squeezeend`,ee),r.removeEventListener(`end`,te),r.removeEventListener(`inputsourceschange`,L);for(let e=0;e<E.length;e++){let t=D[e];t!==null&&(D[e]=null,E[e].disconnect(t))}F=null,I=null,g.reset();for(let e in v)delete v[e];if(e.setRenderTarget(b),f=null,d=null,u=null,r=null,x=null,ce.stop(),n.isPresenting=!1,e.setPixelRatio(k),e.setSize(O.width,O.height,!1),A!==null){let e=A.camera;e.fov=A.fov,e.zoom=A.zoom,e.updateProjectionMatrix(),A=null}n.dispatchEvent({type:`sessionend`})}this.setFramebufferScaleFactor=function(e){i=e,n.isPresenting===!0&&z(`WebXRManager: Cannot change framebuffer scale while presenting.`)},this.setReferenceSpaceType=function(e){o=e,n.isPresenting===!0&&z(`WebXRManager: Cannot change reference space type while presenting.`)},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(e){c=e},this.getBaseLayer=function(){return d===null?f:d},this.getBinding=function(){return u===null&&m&&(u=new XRWebGLBinding(r,t)),u},this.getFrame=function(){return p},this.getSession=function(){return r},this.setSession=async function(l){if(r=l,r!==null){if(b=e.getRenderTarget(),r.addEventListener(`select`,ee),r.addEventListener(`selectstart`,ee),r.addEventListener(`selectend`,ee),r.addEventListener(`squeeze`,ee),r.addEventListener(`squeezestart`,ee),r.addEventListener(`squeezeend`,ee),r.addEventListener(`end`,te),r.addEventListener(`inputsourceschange`,L),y.xrCompatible!==!0&&await t.makeXRCompatible(),k=e.getPixelRatio(),e.getSize(O),m&&`createProjectionLayer`in XRWebGLBinding.prototype){let n=null,a=null,o=null;y.depth&&(o=y.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,n=y.stencil?T:w,a=y.stencil?S:_);let s={colorFormat:t.RGBA8,depthFormat:o,scaleFactor:i};u=this.getBinding(),d=u.createProjectionLayer(s),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),x=new ze(d.textureWidth,d.textureHeight,{format:C,type:h,depthTexture:new cr(d.textureWidth,d.textureHeight,a,void 0,void 0,void 0,void 0,void 0,void 0,n),stencilBuffer:y.stencil,colorSpace:e.outputColorSpace,samples:y.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}else{let n={antialias:y.antialias,alpha:!0,depth:y.depth,stencil:y.stencil,framebufferScaleFactor:i};f=new XRWebGLLayer(r,t,n),r.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),x=new ze(f.framebufferWidth,f.framebufferHeight,{format:C,type:h,colorSpace:e.outputColorSpace,stencilBuffer:y.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(s),c=null,a=await r.requestReferenceSpace(o),ce.setContext(r),ce.start(),n.isPresenting=!0,n.dispatchEvent({type:`sessionstart`})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function L(e){for(let t=0;t<e.removed.length;t++){let n=e.removed[t],r=D.indexOf(n);r>=0&&(D[r]=null,E[r].disconnect(n))}for(let t=0;t<e.added.length;t++){let n=e.added[t],r=D.indexOf(n);if(r===-1){for(let e=0;e<E.length;e++)if(e>=D.length){D.push(n),r=e;break}else if(D[e]===null){D[e]=n,r=e;break}if(r===-1)break}let i=E[r];i&&i.connect(n)}}let ne=new U,re=new U;function ie(e,t,n){ne.setFromMatrixPosition(t.matrixWorld),re.setFromMatrixPosition(n.matrixWorld);let r=ne.distanceTo(re),i=t.projectionMatrix.elements,a=n.projectionMatrix.elements,o=i[14]/(i[10]-1),s=i[14]/(i[10]+1),c=(i[9]+1)/i[5],l=(i[9]-1)/i[5],u=(i[8]-1)/i[0],d=(a[8]+1)/a[0],f=o*u,p=o*d,m=r/(-u+d),h=m*-u;if(t.matrixWorld.decompose(e.position,e.quaternion,e.scale),e.translateX(h),e.translateZ(m),e.matrixWorld.compose(e.position,e.quaternion,e.scale),e.matrixWorldInverse.copy(e.matrixWorld).invert(),i[10]===-1)e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse);else{let t=o+m,n=s+m,i=f-h,a=p+(r-h),u=c*s/n*t,d=l*s/n*t;e.projectionMatrix.makePerspective(i,a,u,d,t,n),e.projectionMatrixInverse.copy(e.projectionMatrix).invert()}}function ae(e,t){t===null?e.matrixWorld.copy(e.matrix):e.matrixWorld.multiplyMatrices(t.matrixWorld,e.matrix),e.matrixWorldInverse.copy(e.matrixWorld).invert()}this.updateCamera=function(e){if(r===null)return;let t=e.near,n=e.far;g.texture!==null&&(g.depthNear>0&&(t=g.depthNear),g.depthFar>0&&(n=g.depthFar)),P.near=M.near=j.near=t,P.far=M.far=j.far=n,(F!==P.near||I!==P.far)&&(r.updateRenderState({depthNear:P.near,depthFar:P.far}),F=P.near,I=P.far),P.layers.mask=e.layers.mask|6,j.layers.mask=P.layers.mask&-5,M.layers.mask=P.layers.mask&-3;let i=e.parent,a=P.cameras;ae(P,i);for(let e=0;e<a.length;e++)ae(a[e],i);a.length===2?ie(P,j,M):P.projectionMatrix.copy(j.projectionMatrix),A===null&&e.isPerspectiveCamera&&(A={camera:e,fov:e.fov,zoom:e.zoom}),oe(e,P,i)};function oe(e,t,n){n===null?e.matrix.copy(t.matrixWorld):(e.matrix.copy(n.matrixWorld),e.matrix.invert(),e.matrix.multiply(t.matrixWorld)),e.matrix.decompose(e.position,e.quaternion,e.scale),e.updateMatrixWorld(!0),e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse),e.isPerspectiveCamera&&(e.fov=ve*2*Math.atan(1/e.projectionMatrix.elements[5]),e.zoom=1)}this.getCamera=function(){return P},this.getFoveation=function(){if(d!==null||f!==null)return s},this.setFoveation=function(e){s=e,d!==null&&(d.fixedFoveation=e),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=e)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(P)},this.getCameraTexture=function(e){return v[e]};let se=null;function R(t,i){if(l=i.getViewerPose(c||a),p=i,l!==null){let t=l.views;f!==null&&(e.setRenderTargetFramebuffer(x,f.framebuffer),e.setRenderTarget(x));let i=!1;t.length!==P.cameras.length&&(P.cameras.length=0,i=!0);for(let n=0;n<t.length;n++){let r=t[n],a=null;if(f!==null)a=f.getViewport(r);else{let t=u.getViewSubImage(d,r);a=t.viewport,n===0&&(e.setRenderTargetTextures(x,t.colorTexture,t.depthStencilTexture),e.setRenderTarget(x))}let o=N[n];o===void 0&&(o=new ai,o.layers.enable(n),o.viewport=new Le,N[n]=o),o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.projectionMatrix.fromArray(r.projectionMatrix),o.projectionMatrixInverse.copy(o.projectionMatrix).invert(),o.viewport.set(a.x,a.y,a.width,a.height),n===0&&(P.matrix.copy(o.matrix),P.matrix.decompose(P.position,P.quaternion,P.scale)),i===!0&&P.cameras.push(o)}let a=r.enabledFeatures;if(a&&a.includes(`depth-sensing`)&&r.depthUsage==`gpu-optimized`&&m){u=n.getBinding();let e=u.getDepthInformation(t[0]);e&&e.isValid&&e.texture&&g.init(e,r.renderState)}if(a&&a.includes(`camera-access`)&&m){e.state.unbindTexture(),u=n.getBinding();for(let e=0;e<t.length;e++){let n=t[e].camera;if(n){let e=v[n];e||(e=new ur,v[n]=e);let t=u.getCameraImage(n);e.sourceTexture=t}}}}for(let e=0;e<E.length;e++){let t=D[e],n=E[e];t!==null&&n!==void 0&&n.update(t,i,c||a)}se&&se(t,i),i.detectedPlanes&&n.dispatchEvent({type:`planesdetected`,data:i}),p=null}let ce=new ki;ce.setAnimationLoop(R),this.setAnimationLoop=function(e){se=e},this.dispose=function(){}}},zs=new He,Bs=new W;Bs.set(-1,0,0,0,1,0,0,0,1);function Vs(e,t){function n(e,t){e.matrixAutoUpdate===!0&&e.updateMatrix(),t.value.copy(e.matrix)}function r(t,n){n.color.getRGB(t.fogColor.value,vr(e)),n.isFog?(t.fogNear.value=n.near,t.fogFar.value=n.far):n.isFogExp2&&(t.fogDensity.value=n.density)}function i(e,t,n,r,i){t.isNodeMaterial?t.uniformsNeedUpdate=!1:t.isMeshBasicMaterial?a(e,t):t.isMeshLambertMaterial?(a(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshToonMaterial?(a(e,t),d(e,t)):t.isMeshPhongMaterial?(a(e,t),u(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshStandardMaterial?(a(e,t),f(e,t),t.isMeshPhysicalMaterial&&p(e,t,i)):t.isMeshMatcapMaterial?(a(e,t),m(e,t)):t.isMeshDepthMaterial?a(e,t):t.isMeshDistanceMaterial?(a(e,t),h(e,t)):t.isMeshNormalMaterial?a(e,t):t.isLineBasicMaterial?(o(e,t),t.isLineDashedMaterial&&s(e,t)):t.isPointsMaterial?c(e,t,n,r):t.isSpriteMaterial?l(e,t):t.isShadowMaterial?(e.color.value.copy(t.color),e.opacity.value=t.opacity):t.isShaderMaterial&&(t.uniformsNeedUpdate=!1)}function a(e,r){e.opacity.value=r.opacity,r.color&&e.diffuse.value.copy(r.color),r.emissive&&e.emissive.value.copy(r.emissive).multiplyScalar(r.emissiveIntensity),r.map&&(e.map.value=r.map,n(r.map,e.mapTransform)),r.alphaMap&&(e.alphaMap.value=r.alphaMap,n(r.alphaMap,e.alphaMapTransform)),r.bumpMap&&(e.bumpMap.value=r.bumpMap,n(r.bumpMap,e.bumpMapTransform),e.bumpScale.value=r.bumpScale,r.side===1&&(e.bumpScale.value*=-1)),r.normalMap&&(e.normalMap.value=r.normalMap,n(r.normalMap,e.normalMapTransform),e.normalScale.value.copy(r.normalScale),r.side===1&&e.normalScale.value.negate()),r.displacementMap&&(e.displacementMap.value=r.displacementMap,n(r.displacementMap,e.displacementMapTransform),e.displacementScale.value=r.displacementScale,e.displacementBias.value=r.displacementBias),r.emissiveMap&&(e.emissiveMap.value=r.emissiveMap,n(r.emissiveMap,e.emissiveMapTransform)),r.specularMap&&(e.specularMap.value=r.specularMap,n(r.specularMap,e.specularMapTransform)),r.alphaTest>0&&(e.alphaTest.value=r.alphaTest);let i=t.get(r),a=i.envMap,o=i.envMapRotation;a&&(e.envMap.value=a,e.envMapRotation.value.setFromMatrix4(zs.makeRotationFromEuler(o)).transpose(),a.isCubeTexture&&a.isRenderTargetTexture===!1&&e.envMapRotation.value.premultiply(Bs),e.reflectivity.value=r.reflectivity,e.ior.value=r.ior,e.refractionRatio.value=r.refractionRatio),r.lightMap&&(e.lightMap.value=r.lightMap,e.lightMapIntensity.value=r.lightMapIntensity,n(r.lightMap,e.lightMapTransform)),r.aoMap&&(e.aoMap.value=r.aoMap,e.aoMapIntensity.value=r.aoMapIntensity,n(r.aoMap,e.aoMapTransform))}function o(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform))}function s(e,t){e.dashSize.value=t.dashSize,e.totalSize.value=t.dashSize+t.gapSize,e.scale.value=t.scale}function c(e,t,r,i){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.size.value=t.size*r,e.scale.value=i*.5,t.map&&(e.map.value=t.map,n(t.map,e.uvTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function l(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.rotation.value=t.rotation,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function u(e,t){e.specular.value.copy(t.specular),e.shininess.value=Math.max(t.shininess,1e-4)}function d(e,t){t.gradientMap&&(e.gradientMap.value=t.gradientMap)}function f(e,t){e.metalness.value=t.metalness,t.metalnessMap&&(e.metalnessMap.value=t.metalnessMap,n(t.metalnessMap,e.metalnessMapTransform)),e.roughness.value=t.roughness,t.roughnessMap&&(e.roughnessMap.value=t.roughnessMap,n(t.roughnessMap,e.roughnessMapTransform)),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)}function p(e,t,r){e.ior.value=t.ior,t.sheen>0&&(e.sheenColor.value.copy(t.sheenColor).multiplyScalar(t.sheen),e.sheenRoughness.value=t.sheenRoughness,t.sheenColorMap&&(e.sheenColorMap.value=t.sheenColorMap,n(t.sheenColorMap,e.sheenColorMapTransform)),t.sheenRoughnessMap&&(e.sheenRoughnessMap.value=t.sheenRoughnessMap,n(t.sheenRoughnessMap,e.sheenRoughnessMapTransform))),t.clearcoat>0&&(e.clearcoat.value=t.clearcoat,e.clearcoatRoughness.value=t.clearcoatRoughness,t.clearcoatMap&&(e.clearcoatMap.value=t.clearcoatMap,n(t.clearcoatMap,e.clearcoatMapTransform)),t.clearcoatRoughnessMap&&(e.clearcoatRoughnessMap.value=t.clearcoatRoughnessMap,n(t.clearcoatRoughnessMap,e.clearcoatRoughnessMapTransform)),t.clearcoatNormalMap&&(e.clearcoatNormalMap.value=t.clearcoatNormalMap,n(t.clearcoatNormalMap,e.clearcoatNormalMapTransform),e.clearcoatNormalScale.value.copy(t.clearcoatNormalScale),t.side===1&&e.clearcoatNormalScale.value.negate())),t.dispersion>0&&(e.dispersion.value=t.dispersion),t.retroreflectivity>0&&(e.retroreflectivity.value=t.retroreflectivity),t.iridescence>0&&(e.iridescence.value=t.iridescence,e.iridescenceIOR.value=t.iridescenceIOR,e.iridescenceThicknessMinimum.value=t.iridescenceThicknessRange[0],e.iridescenceThicknessMaximum.value=t.iridescenceThicknessRange[1],t.iridescenceMap&&(e.iridescenceMap.value=t.iridescenceMap,n(t.iridescenceMap,e.iridescenceMapTransform)),t.iridescenceThicknessMap&&(e.iridescenceThicknessMap.value=t.iridescenceThicknessMap,n(t.iridescenceThicknessMap,e.iridescenceThicknessMapTransform))),t.transmission>0&&(e.transmission.value=t.transmission,e.transmissionSamplerMap.value=r.texture,e.transmissionSamplerSize.value.set(r.width,r.height),t.transmissionMap&&(e.transmissionMap.value=t.transmissionMap,n(t.transmissionMap,e.transmissionMapTransform)),e.thickness.value=t.thickness,t.thicknessMap&&(e.thicknessMap.value=t.thicknessMap,n(t.thicknessMap,e.thicknessMapTransform)),e.attenuationDistance.value=t.attenuationDistance,e.attenuationColor.value.copy(t.attenuationColor)),t.anisotropy>0&&(e.anisotropyVector.value.set(t.anisotropy*Math.cos(t.anisotropyRotation),t.anisotropy*Math.sin(t.anisotropyRotation)),t.anisotropyMap&&(e.anisotropyMap.value=t.anisotropyMap,n(t.anisotropyMap,e.anisotropyMapTransform))),e.specularIntensity.value=t.specularIntensity,e.specularColor.value.copy(t.specularColor),t.specularColorMap&&(e.specularColorMap.value=t.specularColorMap,n(t.specularColorMap,e.specularColorMapTransform)),t.specularIntensityMap&&(e.specularIntensityMap.value=t.specularIntensityMap,n(t.specularIntensityMap,e.specularIntensityMapTransform))}function m(e,t){t.matcap&&(e.matcap.value=t.matcap)}function h(e,n){let r=t.get(n).light;e.referencePosition.value.setFromMatrixPosition(r.matrixWorld),e.nearDistance.value=r.shadow.camera.near,e.farDistance.value=r.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:i}}function Hs(e,t,n,r){let i={},a={},o=[],s=e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);function c(e,t){let n=t.program;r.uniformBlockBinding(e,n)}function l(e,n){let o=i[e.id];o===void 0&&(g(e),o=u(e),i[e.id]=o,e.addEventListener(`dispose`,v));let s=n.program;r.updateUBOMapping(e,s);let c=t.render.frame;a[e.id]!==c&&(f(e),a[e.id]=c)}function u(t){let n=d();t.__bindingPointIndex=n;let r=e.createBuffer(),i=t.__size,a=t.usage;return e.bindBuffer(e.UNIFORM_BUFFER,r),e.bufferData(e.UNIFORM_BUFFER,i,a),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,n,r),r}function d(){for(let e=0;e<s;e++)if(o.indexOf(e)===-1)return o.push(e),e;return B(`WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached.`),0}function f(t){let n=i[t.id],r=t.uniforms,a=t.__cache;e.bindBuffer(e.UNIFORM_BUFFER,n);for(let e=0,t=r.length;e<t;e++){let t=r[e];if(Array.isArray(t))for(let n=0,r=t.length;n<r;n++)p(t[n],e,n,a);else p(t,e,0,a)}e.bindBuffer(e.UNIFORM_BUFFER,null)}function p(t,n,r,i){if(h(t,n,r,i)===!0){let n=t.__offset,r=t.value;if(Array.isArray(r)){let e=0;for(let n=0;n<r.length;n++){let i=r[n],a=_(i);m(i,t.__data,e),typeof i!=`number`&&typeof i!=`boolean`&&!i.isMatrix3&&!ArrayBuffer.isView(i)&&(e+=a.storage/Float32Array.BYTES_PER_ELEMENT)}}else m(r,t.__data,0);e.bufferSubData(e.UNIFORM_BUFFER,n,t.__data)}}function m(e,t,n){typeof e==`number`||typeof e==`boolean`?t[0]=e:e.isMatrix3?(t[0]=e.elements[0],t[1]=e.elements[1],t[2]=e.elements[2],t[3]=0,t[4]=e.elements[3],t[5]=e.elements[4],t[6]=e.elements[5],t[7]=0,t[8]=e.elements[6],t[9]=e.elements[7],t[10]=e.elements[8],t[11]=0):ArrayBuffer.isView(e)?t.set(new e.constructor(e.buffer,e.byteOffset,t.length)):e.toArray(t,n)}function h(e,t,n,r){let i=e.value,a=t+`_`+n;if(r[a]===void 0)return r[a]=typeof i==`number`||typeof i==`boolean`?i:ArrayBuffer.isView(i)?i.slice():i.clone(),!0;{let e=r[a];if(typeof i==`number`||typeof i==`boolean`){if(e!==i)return r[a]=i,!0}else if(ArrayBuffer.isView(i))return!0;else if(e.equals(i)===!1)return e.copy(i),!0}return!1}function g(e){let t=e.uniforms,n=0;for(let e=0,r=t.length;e<r;e++){let r=Array.isArray(t[e])?t[e]:[t[e]];for(let e=0,t=r.length;e<t;e++){let t=r[e],i=Array.isArray(t.value)?t.value:[t.value];for(let e=0,r=i.length;e<r;e++){let r=i[e],a=_(r),o=n%16,s=o%a.boundary,c=o+s;n+=s,c!==0&&16-c<a.storage&&(n+=16-c),t.__data=new Float32Array(a.storage/Float32Array.BYTES_PER_ELEMENT),t.__offset=n,n+=a.storage}}}let r=n%16;return r>0&&(n+=16-r),e.__size=n,e.__cache={},this}function _(e){let t={boundary:0,storage:0};return typeof e==`number`||typeof e==`boolean`?(t.boundary=4,t.storage=4):e.isVector2?(t.boundary=8,t.storage=8):e.isVector3||e.isColor?(t.boundary=16,t.storage=12):e.isVector4?(t.boundary=16,t.storage=16):e.isMatrix3?(t.boundary=48,t.storage=48):e.isMatrix4?(t.boundary=64,t.storage=64):e.isTexture?z(`WebGLRenderer: Texture samplers can not be part of an uniforms group.`):ArrayBuffer.isView(e)?(t.boundary=16,t.storage=e.byteLength):z(`WebGLRenderer: Unsupported uniform value type.`,e),t}function v(t){let n=t.target;n.removeEventListener(`dispose`,v);let r=o.indexOf(n.__bindingPointIndex);o.splice(r,1),e.deleteBuffer(i[n.id]),delete i[n.id],delete a[n.id]}function y(){for(let t in i)e.deleteBuffer(i[t]);o=[],i={},a={}}return{bind:c,update:l,dispose:y}}var Us=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Ws=null;function Gs(){return Ws===null&&(Ws=new qn(Us,16,16,O,y),Ws.name=`DFG_LUT`,Ws.minFilter=p,Ws.magFilter=p,Ws.wrapS=u,Ws.wrapT=u,Ws.generateMipmaps=!1,Ws.needsUpdate=!0),Ws}var Ks=class{constructor(e={}){let{canvas:t=ce(),context:n=null,depth:r=!0,stencil:i=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:s=!0,preserveDrawingBuffer:c=!1,powerPreference:l=`default`,failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1,outputBufferType:f=h}=e;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<`u`&&n instanceof WebGLRenderingContext)throw Error(`THREE.WebGLRenderer: WebGL 1 is not supported since r163.`);p=n.getContextAttributes().alpha}else p=a;let v=f,C=new Set([A,k,D]),w=new Set([h,_,g,S,b,x]),T=new Uint32Array(4),E=new Int32Array(4),O=new U,j=null,M=null,N=[],P=[],F=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=0,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let I=this,ee=!1,L=null,ne=null,re=null,ie=null;this._outputColorSpace=te;let oe=0,se=0,R=null,le=-1,de=null,fe=new Le,me=new Le,he=null,ge=new X(0),_e=0,ve=t.width,ye=t.height,V=1,be=null,xe=null,Se=new Le(0,0,ve,ye),Ce=new Le(0,0,ve,ye),H=!1,we=new or,Te=!1,Ee=!1,W=new He,De=new U,Oe=new Le,ke={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Ae=!1;function je(){return R===null?V:1}let K=n;function Me(e,n){return t.getContext(e,n)}let Ne,Pe,q,Fe,J,Y,Ie,Re,Be,Ve,Ue,We,Ge,Ke,qe,Je,Ye,Xe,Ze,Qe,$e,et,tt;try{let e={alpha:!0,depth:r,stencil:i,antialias:o,premultipliedAlpha:s,preserveDrawingBuffer:c,powerPreference:l,failIfMajorPerformanceCaveat:u};if(`setAttribute`in t&&t.setAttribute(`data-engine`,`three.js r186`),t.addEventListener(`webglcontextlost`,it,!1),t.addEventListener(`webglcontextrestored`,at,!1),t.addEventListener(`webglcontextcreationerror`,ot,!1),K===null){let t=`webgl2`;if(K=Me(t,e),K===null)throw Me(t)?Error(`THREE.WebGLRenderer: Error creating WebGL context with your selected attributes.`):Error(`THREE.WebGLRenderer: Error creating WebGL context.`)}nt()}catch(e){throw t.removeEventListener(`webglcontextlost`,it,!1),t.removeEventListener(`webglcontextrestored`,at,!1),t.removeEventListener(`webglcontextcreationerror`,ot,!1),B(`WebGLRenderer: `+e.message),e}function nt(){Ne=new la(K),Ne.init(),$e=new Ps(K,Ne),Pe=new Ri(K,Ne,e,$e),q=new Ms(K,Ne),Pe.reversedDepthBuffer&&d&&q.buffers.depth.setReversed(!0),ne=K.createFramebuffer(),re=K.createFramebuffer(),ie=K.createFramebuffer(),Fe=new fa(K),J=new fs,Y=new Ns(K,Ne,q,J,Pe,$e,Fe),Ie=new ca(I),Re=new Ai(K),et=new Ii(K,Re),Be=new ua(K,Re,Fe,et),Ve=new ma(K,Be,Re,et,Fe),Xe=new pa(K,Pe,Y),qe=new zi(J),Ue=new ds(I,Ie,Ne,Pe,et,qe),We=new Vs(I,J),Ge=new gs,Ke=new Cs(Ne),Ye=new Fi(I,Ie,q,Ve,p,s),Je=new js(I,Ve,Pe),tt=new Hs(K,Fe,Pe,q),Ze=new Li(K,Ne,Fe),Qe=new da(K,Ne,Fe),Fe.programs=Ue.programs,I.capabilities=Pe,I.extensions=Ne,I.properties=J,I.renderLists=Ge,I.shadowMap=Je,I.state=q,I.info=Fe}v!==1009&&(F=new ga(v,t.width,t.height,o,r,i));let rt=new Rs(I,K);this.xr=rt,this.getContext=function(){return K},this.getContextAttributes=function(){return K.getContextAttributes()},this.forceContextLoss=function(){let e=Ne.get(`WEBGL_lose_context`);e&&e.loseContext()},this.forceContextRestore=function(){let e=Ne.get(`WEBGL_lose_context`);e&&e.restoreContext()},this.getPixelRatio=function(){return V},this.setPixelRatio=function(e){e!==void 0&&(V=e,this.setSize(ve,ye,!1))},this.getSize=function(e){return e.set(ve,ye)},this.setSize=function(e,n,r=!0){if(rt.isPresenting){z(`WebGLRenderer: Can't change size while VR device is presenting.`);return}ve=e,ye=n,t.width=Math.floor(e*V),t.height=Math.floor(n*V),r===!0&&(t.style.width=e+`px`,t.style.height=n+`px`),F!==null&&F.setSize(t.width,t.height),this.setViewport(0,0,e,n)},this.getDrawingBufferSize=function(e){return e.set(ve*V,ye*V).floor()},this.setDrawingBufferSize=function(e,n,r){ve=e,ye=n,V=r,t.width=Math.floor(e*r),t.height=Math.floor(n*r),this.setViewport(0,0,e,n)},this.setEffects=function(e){if(v===1009){B(`WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.`);return}if(e){for(let t=0;t<e.length;t++)if(e[t].isOutputPass===!0){z(`WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.`);break}}F.setEffects(e||[])},this.getCurrentViewport=function(e){return e.copy(fe)},this.getViewport=function(e){return e.copy(Se)},this.setViewport=function(e,t,n,r){e.isVector4?Se.set(e.x,e.y,e.z,e.w):Se.set(e,t,n,r),q.viewport(fe.copy(Se).multiplyScalar(V).round())},this.getScissor=function(e){return e.copy(Ce)},this.setScissor=function(e,t,n,r){e.isVector4?Ce.set(e.x,e.y,e.z,e.w):Ce.set(e,t,n,r),q.scissor(me.copy(Ce).multiplyScalar(V).round())},this.getScissorTest=function(){return H},this.setScissorTest=function(e){q.setScissorTest(H=e)},this.setOpaqueSort=function(e){be=e},this.setTransparentSort=function(e){xe=e},this.getClearColor=function(e){return e.copy(Ye.getClearColor())},this.setClearColor=function(){Ye.setClearColor(...arguments)},this.getClearAlpha=function(){return Ye.getClearAlpha()},this.setClearAlpha=function(){Ye.setClearAlpha(...arguments)},this.clear=function(e=!0,t=!0,n=!0){let r=0;if(e){let e=!1;if(R!==null){let t=R.texture.format;e=C.has(t)}if(e){let e=R.texture.type,t=w.has(e),n=Ye.getClearColor(),r=Ye.getClearAlpha(),i=n.r,a=n.g,o=n.b;t?(T[0]=i,T[1]=a,T[2]=o,T[3]=r,K.clearBufferuiv(K.COLOR,0,T)):(E[0]=i,E[1]=a,E[2]=o,E[3]=r,K.clearBufferiv(K.COLOR,0,E))}else r|=K.COLOR_BUFFER_BIT}t&&(r|=K.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),n&&(r|=K.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),r!==0&&K.clear(r)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(e){e.setRenderer(this),L=e},this.dispose=function(){t.removeEventListener(`webglcontextlost`,it,!1),t.removeEventListener(`webglcontextrestored`,at,!1),t.removeEventListener(`webglcontextcreationerror`,ot,!1),Ye.dispose(),Ge.dispose(),Ke.dispose(),J.dispose(),Ie.dispose(),Ve.dispose(),et.dispose(),tt.dispose(),Ue.dispose(),rt.dispose(),rt.removeEventListener(`sessionstart`,pt),rt.removeEventListener(`sessionend`,mt),ht.stop()};function it(e){e.preventDefault(),ue(`WebGLRenderer: Context Lost.`),ee=!0}function at(){ue(`WebGLRenderer: Context Restored.`),ee=!1;let e=Fe.autoReset,t=Je.enabled,n=Je.autoUpdate,r=Je.needsUpdate,i=Je.type;nt(),Fe.autoReset=e,Je.enabled=t,Je.autoUpdate=n,Je.needsUpdate=r,Je.type=i}function ot(e){B(`WebGLRenderer: A WebGL context could not be created. Reason: `,e.statusMessage)}function st(e){let t=e.target;t.removeEventListener(`dispose`,st),ct(t)}function ct(e){lt(e),J.remove(e)}function lt(e){let t=J.get(e).programs;t!==void 0&&(t.forEach(function(e){Ue.releaseProgram(e)}),e.isShaderMaterial&&Ue.releaseShaderCache(e))}this.renderBufferDirect=function(e,t,n,r,i,a){t===null&&(t=ke);let o=i.isMesh&&i.matrixWorld.determinantAffine()<0,s=Tt(e,t,n,r,i);q.setMaterial(r,o);let c=n.index,l=1;if(r.wireframe===!0){if(c=Be.getWireframeAttribute(n),c===void 0)return;l=2}let u=n.drawRange,d=n.attributes.position,f=u.start*l,p=(u.start+u.count)*l;a!==null&&(f=Math.max(f,a.start*l),p=Math.min(p,(a.start+a.count)*l)),c===null?d!=null&&(f=Math.max(f,0),p=Math.min(p,d.count)):(f=Math.max(f,0),p=Math.min(p,c.count));let m=p-f;if(m<0||m===1/0)return;et.setup(i,r,s,n,c);let h,g=Ze;if(c!==null&&(h=Re.get(c),g=Qe,g.setIndex(h)),i.isMesh)r.wireframe===!0?(q.setLineWidth(r.wireframeLinewidth*je()),g.setMode(K.LINES)):g.setMode(K.TRIANGLES);else if(i.isLine){let e=r.linewidth;e===void 0&&(e=1),q.setLineWidth(e*je()),i.isLineSegments?g.setMode(K.LINES):i.isLineLoop?g.setMode(K.LINE_LOOP):g.setMode(K.LINE_STRIP)}else i.isPoints?g.setMode(K.POINTS):i.isSprite&&g.setMode(K.TRIANGLES);if(i.isBatchedMesh){if(Ne.get(`WEBGL_multi_draw`))g.renderMultiDraw(i._multiDrawStarts,i._multiDrawCounts,i._multiDrawCount);else{let e=i._multiDrawStarts,t=i._multiDrawCounts,n=i._multiDrawCount,a=c?Re.get(c).bytesPerElement:1,o=J.get(r).currentProgram.getUniforms();for(let r=0;r<n;r++)o.setValue(K,`_gl_DrawID`,r),g.render(e[r]/a,t[r])}}else if(i.isInstancedMesh)g.renderInstances(f,m,i.count);else if(n.isInstancedBufferGeometry){let e=n._maxInstanceCount===void 0?1/0:n._maxInstanceCount,t=Math.min(n.instanceCount,e);g.renderInstances(f,m,t)}else g.render(f,m)};function ut(e,t,n,r){L!==null&&e.isNodeMaterial&&L.setObject(r,e),Te===!0&&qe.setState(e,n,!1),e.transparent===!0&&e.side===2&&e.forceSinglePass===!1?(e.side=1,e.needsUpdate=!0,xt(e,t,r),e.side=0,e.needsUpdate=!0,xt(e,t,r),e.side=2):xt(e,t,r)}this.compile=function(e,t,n=null){n===null&&(n=e),L!==null&&L.renderStart(e,t,n),M=Ke.get(n),M.init(t),P.push(M),n.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(M.pushLight(e),e.castShadow&&M.pushShadow(e))}),e!==n&&e.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(M.pushLight(e),e.castShadow&&M.pushShadow(e))}),M.setupLights(),L!==null&&L.updateLights(M.state.lightsArray),Ee=this.localClippingEnabled,Te=qe.init(this.clippingPlanes,Ee),Te===!0&&qe.setGlobalState(this.clippingPlanes,t),L!==null&&Je.render(M.state.shadowsArray,n,t);let r=new Set;return e.traverse(function(e){if(!(e.isMesh||e.isPoints||e.isLine||e.isSprite))return;let i=e.material;if(i){if(Array.isArray(i))for(let a=0;a<i.length;a++){let o=i[a];ut(o,n,t,e),r.add(o)}else ut(i,n,t,e),r.add(i)}}),M=P.pop(),L!==null&&L.renderEnd(),r},this.compileAsync=function(e,t,n=null){let r=this.compile(e,t,n);return new Promise(t=>{function n(){if(r.forEach(function(e){let t=J.get(e).currentProgram;(t===void 0||t.isReady())&&r.delete(e)}),r.size===0){t(e);return}setTimeout(n,10)}Ne.get(`KHR_parallel_shader_compile`)===null?setTimeout(n,10):n()})};let dt=null;function ft(e){dt&&dt(e)}function pt(){ht.stop()}function mt(){ht.start()}let ht=new ki;ht.setAnimationLoop(ft),typeof self<`u`&&ht.setContext(self),this.setAnimationLoop=function(e){dt=e,rt.setAnimationLoop(e),e===null?ht.stop():ht.start()},rt.addEventListener(`sessionstart`,pt),rt.addEventListener(`sessionend`,mt),this.render=function(e,t){if(t!==void 0&&t.isCamera!==!0){B(`WebGLRenderer.render: camera is not an instance of THREE.Camera.`);return}if(ee===!0)return;L!==null&&L.renderStart(e,t);let n=rt.enabled===!0&&rt.isPresenting===!0,r=F!==null&&(R===null||n)&&F.begin(I,R);if(e.matrixWorldAutoUpdate===!0&&e.updateMatrixWorld(),t.parent===null&&t.matrixWorldAutoUpdate===!0&&t.updateMatrixWorld(),rt.enabled===!0&&rt.isPresenting===!0&&(F===null||F.isCompositing()===!1)&&(rt.cameraAutoUpdate===!0&&rt.updateCamera(t),t=rt.getCamera()),e.isScene===!0&&e.onBeforeRender(I,e,t,R),M=Ke.get(e,P.length),M.init(t),M.state.textureUnits=Y.getTextureUnits(),P.push(M),W.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),we.setFromProjectionMatrix(W,ae,t.reversedDepth),Ee=this.localClippingEnabled,Te=qe.init(this.clippingPlanes,Ee),j=Ge.get(e,N.length),j.init(),N.push(j),rt.enabled===!0&&rt.isPresenting===!0){let e=I.xr.getDepthSensingMesh();e!==null&&gt(e,t,-1/0,I.sortObjects)}gt(e,t,0,I.sortObjects),j.finish(),L!==null&&L.updateLights(M.state.lightsArray),I.sortObjects===!0&&j.sort(be,xe),Ae=rt.enabled===!1||rt.isPresenting===!1||rt.hasDepthSensing()===!1,Ae&&Ye.addToRenderList(j,e),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),Te===!0&&qe.beginShadows();let i=M.state.shadowsArray;if(Je.render(i,e,t),Te===!0&&qe.endShadows(),(r&&F.hasRenderPass())===!1){let n=j.opaque,r=j.transmissive;if(M.setupLights(),t.isArrayCamera){let i=t.cameras;if(r.length>0)for(let t=0,a=i.length;t<a;t++){let a=i[t];vt(n,r,e,a)}Ae&&Ye.render(e);for(let t=0,n=i.length;t<n;t++){let n=i[t];_t(j,e,n,n.viewport)}}else r.length>0&&vt(n,r,e,t),Ae&&Ye.render(e),_t(j,e,t)}R!==null&&se===0&&(Y.updateMultisampleRenderTarget(R),Y.updateRenderTargetMipmap(R)),r&&F.end(I),e.isScene===!0&&e.onAfterRender(I,e,t),et.resetDefaultState(),le=-1,de=null,P.pop(),P.length>0?(M=P[P.length-1],Y.setTextureUnits(M.state.textureUnits),Te===!0&&qe.setGlobalState(I.clippingPlanes,M.state.camera)):M=null,N.pop(),j=N.length>0?N[N.length-1]:null,L!==null&&L.renderEnd()};function gt(e,t,n,r){if(e.visible===!1)return;if(e.layers.test(t.layers)){if(e.isGroup)n=e.renderOrder;else if(e.isLOD)e.autoUpdate===!0&&e.update(t);else if(e.isLightProbeGrid)M.pushLightProbeGrid(e);else if(e.isLight)M.pushLight(e),e.castShadow&&M.pushShadow(e);else if(e.isSprite){if(!e.frustumCulled||e.intersectsFrustum(we)){r&&Oe.setFromMatrixPosition(e.matrixWorld).applyMatrix4(W);let i=Ve.update(e),a=e.material;a.visible&&j.push(e,i,a,n,Oe.z,null,t)}}else if((e.isMesh||e.isLine||e.isPoints)&&(!e.frustumCulled||e.intersectsFrustum(we))){let i=Ve.update(e),a=e.material;if(r&&(e.boundingSphere===void 0?(i.boundingSphere===null&&i.computeBoundingSphere(),Oe.copy(i.boundingSphere.center)):(e.boundingSphere===null&&e.computeBoundingSphere(),Oe.copy(e.boundingSphere.center)),Oe.applyMatrix4(e.matrixWorld).applyMatrix4(W)),Array.isArray(a)){let r=i.groups;for(let o=0,s=r.length;o<s;o++){let s=r[o],c=a[s.materialIndex];c&&c.visible&&j.push(e,i,c,n,Oe.z,s,t)}}else a.visible&&j.push(e,i,a,n,Oe.z,null,t)}}let i=e.children;for(let e=0,a=i.length;e<a;e++)gt(i[e],t,n,r)}function _t(e,t,n,r){let{opaque:i,transmissive:a,transparent:o}=e;M.setupLightsView(n),Te===!0&&qe.setGlobalState(I.clippingPlanes,n),r&&q.viewport(fe.copy(r)),i.length>0&&yt(i,t,n),a.length>0&&yt(a,t,n),o.length>0&&yt(o,t,n),q.buffers.depth.setTest(!0),q.buffers.depth.setMask(!0),q.buffers.color.setMask(!0),q.setPolygonOffset(!1)}function vt(e,t,n,r){if((n.isScene===!0?n.overrideMaterial:null)!==null)return;if(M.state.transmissionRenderTarget[r.id]===void 0){let e=Ne.has(`EXT_color_buffer_half_float`)||Ne.has(`EXT_color_buffer_float`);M.state.transmissionRenderTarget[r.id]=new ze(1,1,{generateMipmaps:!0,type:e?y:h,minFilter:m,samples:Math.max(4,Pe.samples),stencilBuffer:i,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:G.workingColorSpace})}let a=M.state.transmissionRenderTarget[r.id],o=r.viewport||fe;a.setSize(o.z*I.transmissionResolutionScale,o.w*I.transmissionResolutionScale);let s=I.getRenderTarget(),c=I.getActiveCubeFace(),l=I.getActiveMipmapLevel();I.setRenderTarget(a),I.getClearColor(ge),_e=I.getClearAlpha(),_e<1&&I.setClearColor(16777215,.5),I.clear(),Ae&&Ye.render(n);let u=I.toneMapping;I.toneMapping=0;let d=r.viewport;if(r.viewport!==void 0&&(r.viewport=void 0),M.setupLightsView(r),Te===!0&&qe.setGlobalState(I.clippingPlanes,r),yt(e,n,r),Y.updateMultisampleRenderTarget(a),Y.updateRenderTargetMipmap(a),Ne.has(`WEBGL_multisampled_render_to_texture`)===!1){let e=!1;for(let i=0,a=t.length;i<a;i++){let{object:a,geometry:o,material:s,group:c}=t[i];if(s.side===2&&a.layers.test(r.layers)){let t=s.side;s.side=1,s.needsUpdate=!0,bt(a,n,r,o,s,c),s.side=t,s.needsUpdate=!0,e=!0}}e===!0&&(Y.updateMultisampleRenderTarget(a),Y.updateRenderTargetMipmap(a))}I.setRenderTarget(s,c,l),I.setClearColor(ge,_e),d!==void 0&&(r.viewport=d),I.toneMapping=u}function yt(e,t,n){let r=t.isScene===!0?t.overrideMaterial:null;for(let i=0,a=e.length;i<a;i++){let a=e[i],{object:o,geometry:s,group:c}=a,l=a.material;l.allowOverride===!0&&r!==null&&(l=r),o.layers.test(n.layers)&&bt(o,t,n,s,l,c)}}function bt(e,t,n,r,i,a){L!==null&&i.isNodeMaterial&&L.setObject(e,i),e.onBeforeRender(I,t,n,r,i,a),e.modelViewMatrix.multiplyMatrices(n.matrixWorldInverse,e.matrixWorld),e.normalMatrix.getNormalMatrix(e.modelViewMatrix),i.onBeforeRender(I,t,n,r,e,a),i.transparent===!0&&i.side===2&&i.forceSinglePass===!1?(i.side=1,i.needsUpdate=!0,I.renderBufferDirect(n,t,r,i,e,a),i.side=0,i.needsUpdate=!0,I.renderBufferDirect(n,t,r,i,e,a),i.side=2):I.renderBufferDirect(n,t,r,i,e,a),e.onAfterRender(I,t,n,r,i,a)}function xt(e,t,n){t.isScene!==!0&&(t=ke);let r=J.get(e),i=M.state.lights,a=M.state.shadowsArray,o=i.state.version,s=Ue.getParameters(e,i.state,a,t,n,M.state.lightProbeGridArray),c=Ue.getProgramCacheKey(s),l=r.programs;r.environment=e.isMeshStandardMaterial||e.isMeshLambertMaterial||e.isMeshPhongMaterial?t.environment:null,r.fog=t.fog;let u=e.isMeshStandardMaterial||e.isMeshLambertMaterial&&!e.envMap||e.isMeshPhongMaterial&&!e.envMap;r.envMap=Ie.get(e.envMap||r.environment,u),r.envMapRotation=r.environment!==null&&e.envMap===null?t.environmentRotation:e.envMapRotation,l===void 0&&(e.addEventListener(`dispose`,st),l=new Map,r.programs=l);let d=l.get(c);if(d!==void 0){if(r.currentProgram===d&&r.lightsStateVersion===o)return Ct(e,s),d}else s.uniforms=Ue.getUniforms(e),L!==null&&e.isNodeMaterial&&L.build(e,n,s),e.onBeforeCompile(s,I),d=Ue.acquireProgram(s,c),l.set(c,d),r.uniforms=s.uniforms;let f=r.uniforms;return(!e.isShaderMaterial&&!e.isRawShaderMaterial||e.clipping===!0)&&(f.clippingPlanes=qe.uniform),Ct(e,s),r.needsLights=Dt(e),r.lightsStateVersion=o,r.needsLights&&(f.ambientLightColor.value=i.state.ambient,f.lightProbe.value=i.state.probe,f.sunLights.value=i.state.sun,f.sunLightShadows.value=i.state.sunShadow,f.directionalLights.value=i.state.directional,f.directionalLightShadows.value=i.state.directionalShadow,f.spotLights.value=i.state.spot,f.spotLightShadows.value=i.state.spotShadow,f.rectAreaLights.value=i.state.rectArea,f.ltc_1.value=i.state.rectAreaLTC1,f.ltc_2.value=i.state.rectAreaLTC2,f.pointLights.value=i.state.point,f.pointLightShadows.value=i.state.pointShadow,f.hemisphereLights.value=i.state.hemi,f.sunShadowMatrix.value=i.state.sunShadowMatrix,f.sunShadowCascade.value=i.state.sunShadowCascade,f.directionalShadowMatrix.value=i.state.directionalShadowMatrix,f.spotLightMatrix.value=i.state.spotLightMatrix,f.spotLightMap.value=i.state.spotLightMap,f.pointShadowMatrix.value=i.state.pointShadowMatrix),r.lightProbeGrid=M.state.lightProbeGridArray.length>0,r.currentProgram=d,r.uniformsList=null,d}function St(e){if(e.uniformsList===null){let t=e.currentProgram.getUniforms();e.uniformsList=wo.seqWithValue(t.seq,e.uniforms)}return e.uniformsList}function Ct(e,t){let n=J.get(e);n.outputColorSpace=t.outputColorSpace,n.batching=t.batching,n.batchingColor=t.batchingColor,n.instancing=t.instancing,n.instancingColor=t.instancingColor,n.instancingMorph=t.instancingMorph,n.skinning=t.skinning,n.morphTargets=t.morphTargets,n.morphNormals=t.morphNormals,n.morphColors=t.morphColors,n.morphTargetsCount=t.morphTargetsCount,n.numClippingPlanes=t.numClippingPlanes,n.numIntersection=t.numClipIntersection,n.vertexAlphas=t.vertexAlphas,n.vertexTangents=t.vertexTangents,n.toneMapping=t.toneMapping}function wt(e,t){if(e.length===0)return null;if(e.length===1)return e[0].texture===null?null:e[0];O.setFromMatrixPosition(t.matrixWorld);for(let t=0,n=e.length;t<n;t++){let n=e[t];if(n.texture!==null&&n.boundingBox.containsPoint(O))return n}return null}function Tt(e,t,n,r,i){t.isScene!==!0&&(t=ke),Y.resetTextureUnits();let a=t.fog,o=r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial?t.environment:null,s=R===null?I.outputColorSpace:R.isXRRenderTarget===!0?R.texture.colorSpace:G.workingColorSpace,c=r.isMeshStandardMaterial||r.isMeshLambertMaterial&&!r.envMap||r.isMeshPhongMaterial&&!r.envMap,l=Ie.get(r.envMap||o,c),u=r.vertexColors===!0&&!!n.attributes.color&&n.attributes.color.itemSize===4,d=!!n.attributes.tangent&&(!!r.normalMap||r.anisotropy>0),f=!!n.morphAttributes.position,p=!!n.morphAttributes.normal,m=!!n.morphAttributes.color,h=0;r.toneMapped&&(R===null||R.isXRRenderTarget===!0)&&(h=I.toneMapping);let g=n.morphAttributes.position||n.morphAttributes.normal||n.morphAttributes.color,_=g===void 0?0:g.length,v=J.get(r),y=M.state.lights;if(Te===!0&&(Ee===!0||e!==de)){let t=e===de&&r.id===le;qe.setState(r,e,t)}let b=!1;r.version===v.__version?v.needsLights&&v.lightsStateVersion!==y.state.version?b=!0:v.outputColorSpace===s?i.isBatchedMesh&&v.batching===!1||!i.isBatchedMesh&&v.batching===!0||i.isBatchedMesh&&v.batchingColor===!0&&i._colorsTexture===null||i.isBatchedMesh&&v.batchingColor===!1&&i._colorsTexture!==null||i.isInstancedMesh&&v.instancing===!1||!i.isInstancedMesh&&v.instancing===!0||i.isSkinnedMesh&&v.skinning===!1||!i.isSkinnedMesh&&v.skinning===!0||i.isInstancedMesh&&v.instancingColor===!0&&i.instanceColor===null||i.isInstancedMesh&&v.instancingColor===!1&&i.instanceColor!==null||i.isInstancedMesh&&v.instancingMorph===!0&&i.morphTexture===null||i.isInstancedMesh&&v.instancingMorph===!1&&i.morphTexture!==null?b=!0:v.envMap===l?r.fog===!0&&v.fog!==a||v.numClippingPlanes!==void 0&&(v.numClippingPlanes!==qe.numPlanes||v.numIntersection!==qe.numIntersection)?b=!0:v.vertexAlphas===u&&v.vertexTangents===d&&v.morphTargets===f&&v.morphNormals===p&&v.morphColors===m&&v.toneMapping===h&&v.morphTargetsCount===_?!!v.lightProbeGrid!=M.state.lightProbeGridArray.length>0&&(b=!0):b=!0:b=!0:b=!0:(b=!0,v.__version=r.version);let x=v.currentProgram;b===!0&&(x=xt(r,t,i),L&&r.isNodeMaterial&&L.onUpdateProgram(r,x,v));let S=!1,C=!1,w=!1,T=x.getUniforms(),E=v.uniforms;if(q.useProgram(x.program)&&(S=!0,C=!0,w=!0),r.id!==le&&(le=r.id,C=!0),v.needsLights){let e=wt(M.state.lightProbeGridArray,i);v.lightProbeGrid!==e&&(v.lightProbeGrid=e,C=!0)}if(S||de!==e){q.buffers.depth.getReversed()&&e.reversedDepth!==!0&&(e._reversedDepth=!0,e.updateProjectionMatrix()),T.setValue(K,`projectionMatrix`,e.projectionMatrix),T.setValue(K,`viewMatrix`,e.matrixWorldInverse);let t=T.map.cameraPosition;t!==void 0&&t.setValue(K,De.setFromMatrixPosition(e.matrixWorld)),Pe.logarithmicDepthBuffer&&T.setValue(K,`logDepthBufFC`,2/(Math.log(e.far+1)/Math.LN2)),(r.isMeshPhongMaterial||r.isMeshToonMaterial||r.isMeshLambertMaterial||r.isMeshBasicMaterial||r.isMeshStandardMaterial||r.isShaderMaterial)&&T.setValue(K,`isOrthographic`,e.isOrthographicCamera===!0),de!==e&&(de=e,C=!0,w=!0)}if(v.needsLights&&(y.state.sunShadowMap.length>0&&T.setValue(K,`sunShadowMap`,y.state.sunShadowMap,Y),y.state.directionalShadowMap.length>0&&T.setValue(K,`directionalShadowMap`,y.state.directionalShadowMap,Y),y.state.spotShadowMap.length>0&&T.setValue(K,`spotShadowMap`,y.state.spotShadowMap,Y),y.state.pointShadowMap.length>0&&T.setValue(K,`pointShadowMap`,y.state.pointShadowMap,Y)),i.isSkinnedMesh){T.setOptional(K,i,`bindMatrix`),T.setOptional(K,i,`bindMatrixInverse`);let e=i.skeleton;e&&(e.boneTexture===null&&e.computeBoneTexture(),T.setValue(K,`boneTexture`,e.boneTexture,Y))}i.isBatchedMesh&&(T.setOptional(K,i,`batchingTexture`),T.setValue(K,`batchingTexture`,i._matricesTexture,Y),T.setOptional(K,i,`batchingIdTexture`),T.setValue(K,`batchingIdTexture`,i._indirectTexture,Y),T.setOptional(K,i,`batchingColorTexture`),i._colorsTexture!==null&&T.setValue(K,`batchingColorTexture`,i._colorsTexture,Y));let D=n.morphAttributes;if((D.position!==void 0||D.normal!==void 0||D.color!==void 0)&&Xe.update(i,n,x),(C||v.receiveShadow!==i.receiveShadow)&&(v.receiveShadow=i.receiveShadow,T.setValue(K,`receiveShadow`,i.receiveShadow)),(r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial)&&r.envMap===null&&t.environment!==null&&(E.envMapIntensity.value=t.environmentIntensity),E.dfgLUT!==void 0&&(E.dfgLUT.value=Gs()),C){if(T.setValue(K,`toneMappingExposure`,I.toneMappingExposure),v.needsLights&&Et(E,w),a&&r.fog===!0&&We.refreshFogUniforms(E,a),We.refreshMaterialUniforms(E,r,V,ye,M.state.transmissionRenderTarget[e.id]),v.needsLights&&v.lightProbeGrid){let e=v.lightProbeGrid;E.probesSH.value=e.texture,E.probesMin.value.copy(e.boundingBox.min),E.probesMax.value.copy(e.boundingBox.max),E.probesResolution.value.copy(e.resolution)}wo.upload(K,St(v),E,Y)}if(r.isShaderMaterial&&r.uniformsNeedUpdate===!0&&(wo.upload(K,St(v),E,Y),r.uniformsNeedUpdate=!1),r.isSpriteMaterial&&T.setValue(K,`center`,i.center),T.setValue(K,`modelViewMatrix`,i.modelViewMatrix),T.setValue(K,`normalMatrix`,i.normalMatrix),T.setValue(K,`modelMatrix`,i.matrixWorld),r.uniformsGroups!==void 0){let e=r.uniformsGroups;for(let t=0,n=e.length;t<n;t++){let n=e[t];tt.update(n,x),tt.bind(n,x)}}return x}function Et(e,t){e.ambientLightColor.needsUpdate=t,e.lightProbe.needsUpdate=t,e.sunLights.needsUpdate=t,e.sunLightShadows.needsUpdate=t,e.directionalLights.needsUpdate=t,e.directionalLightShadows.needsUpdate=t,e.pointLights.needsUpdate=t,e.pointLightShadows.needsUpdate=t,e.spotLights.needsUpdate=t,e.spotLightShadows.needsUpdate=t,e.rectAreaLights.needsUpdate=t,e.hemisphereLights.needsUpdate=t}function Dt(e){return e.isMeshLambertMaterial||e.isMeshToonMaterial||e.isMeshPhongMaterial||e.isMeshStandardMaterial||e.isShadowMaterial||e.isShaderMaterial&&e.lights===!0}this.getActiveCubeFace=function(){return oe},this.getActiveMipmapLevel=function(){return se},this.getRenderTarget=function(){return R},this.setRenderTargetTextures=function(e,t,n){let r=J.get(e);r.__autoAllocateDepthBuffer=e.resolveDepthBuffer===!1,r.__autoAllocateDepthBuffer===!1&&(r.__useRenderToTexture=!1),J.get(e.texture).__webglTexture=t,J.get(e.depthTexture).__webglTexture=r.__autoAllocateDepthBuffer?void 0:n,r.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(e,t){let n=J.get(e);n.__webglFramebuffer=t,n.__useDefaultFramebuffer=t===void 0},this.setRenderTarget=function(e,t=0,n=0){R=e,oe=t,se=n;let r=null,i=!1,a=!1;if(e){let o=J.get(e);if(o.__useDefaultFramebuffer!==void 0){q.bindFramebuffer(K.FRAMEBUFFER,o.__webglFramebuffer),fe.copy(e.viewport),me.copy(e.scissor),he=e.scissorTest,q.viewport(fe),q.scissor(me),q.setScissorTest(he),le=-1;return}if(o.__webglFramebuffer===void 0)Y.setupRenderTarget(e);else if(o.__hasExternalTextures)Y.rebindTextures(e,J.get(e.texture).__webglTexture,J.get(e.depthTexture).__webglTexture);else if(e.depthBuffer){let t=e.depthTexture;if(o.__boundDepthTexture!==t){if(t!==null&&J.has(t)&&(e.width!==t.image.width||e.height!==t.image.height))throw Error(`THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.`);Y.setupDepthRenderbuffer(e)}}let s=e.texture;(s.isData3DTexture||s.isDataArrayTexture||s.isCompressedArrayTexture)&&(a=!0);let c=J.get(e).__webglFramebuffer;e.isWebGLCubeRenderTarget?(r=Array.isArray(c[t])?c[t][n]:c[t],i=!0):r=e.samples>0&&Y.useMultisampledRTT(e)===!1?J.get(e).__webglMultisampledFramebuffer:Array.isArray(c)?c[n]:c,fe.copy(e.viewport),me.copy(e.scissor),he=e.scissorTest}else fe.copy(Se).multiplyScalar(V).floor(),me.copy(Ce).multiplyScalar(V).floor(),he=H;if(n!==0&&(r=ne),q.bindFramebuffer(K.FRAMEBUFFER,r)&&q.drawBuffers(e,r),q.viewport(fe),q.scissor(me),q.setScissorTest(he),i){let r=J.get(e.texture);K.framebufferTexture2D(K.FRAMEBUFFER,K.COLOR_ATTACHMENT0,K.TEXTURE_CUBE_MAP_POSITIVE_X+t,r.__webglTexture,n)}else if(a){let r=t;for(let t=0;t<e.textures.length;t++){let i=J.get(e.textures[t]);K.framebufferTextureLayer(K.FRAMEBUFFER,K.COLOR_ATTACHMENT0+t,i.__webglTexture,n,r)}}else if(e!==null&&n!==0){let t=J.get(e.texture);K.framebufferTexture2D(K.FRAMEBUFFER,K.COLOR_ATTACHMENT0,K.TEXTURE_2D,t.__webglTexture,n)}le=-1};function Ot(e){let t=J.get(e);return(t.__readFormat!==e.format||t.__readType!==e.type)&&(t.__readFormat=e.format,t.__readType=e.type,t.__formatReadable=Pe.textureFormatReadable(e.format),t.__typeReadable=Pe.textureTypeReadable(e.type)),t}this.readRenderTargetPixels=function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget)){B(`WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);return}let c=J.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o]),c){q.bindFramebuffer(K.FRAMEBUFFER,c);try{let o=e.textures[s],c=o.format,l=o.type;e.textures.length>1&&K.readBuffer(K.COLOR_ATTACHMENT0+s);let u=Ot(o);if(u.__formatReadable===!1){B(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.`);return}if(u.__typeReadable===!1){B(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.`);return}t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i&&K.readPixels(t,n,r,i,$e.convert(c),$e.convert(l),a)}finally{let e=R===null?null:J.get(R).__webglFramebuffer;q.bindFramebuffer(K.FRAMEBUFFER,e)}}},this.readRenderTargetPixelsAsync=async function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget))throw Error(`THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);let c=J.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o]),c){if(t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i){q.bindFramebuffer(K.FRAMEBUFFER,c);let o=e.textures[s],l=o.format,u=o.type;e.textures.length>1&&K.readBuffer(K.COLOR_ATTACHMENT0+s);let d=Ot(o);if(d.__formatReadable===!1)throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.`);if(d.__typeReadable===!1)throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.`);let f=K.createBuffer();K.bindBuffer(K.PIXEL_PACK_BUFFER,f),K.bufferData(K.PIXEL_PACK_BUFFER,a.byteLength,K.STREAM_READ),K.readPixels(t,n,r,i,$e.convert(l),$e.convert(u),0),K.bindBuffer(K.PIXEL_PACK_BUFFER,null);let p=R===null?null:J.get(R).__webglFramebuffer;q.bindFramebuffer(K.FRAMEBUFFER,p);let m=K.fenceSync(K.SYNC_GPU_COMMANDS_COMPLETE,0);return K.flush(),await pe(K,m,4),K.bindBuffer(K.PIXEL_PACK_BUFFER,f),K.getBufferSubData(K.PIXEL_PACK_BUFFER,0,a),K.bindBuffer(K.PIXEL_PACK_BUFFER,null),K.deleteBuffer(f),K.deleteSync(m),a}throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.`)}},this.copyFramebufferToTexture=function(e,t=null,n=0){let r=2**-n,i=Math.floor(e.image.width*r),a=Math.floor(e.image.height*r),o=t===null?0:t.x,s=t===null?0:t.y;Y.setTexture2D(e,0),K.copyTexSubImage2D(K.TEXTURE_2D,n,0,0,o,s,i,a),q.unbindTexture()},this.copyTextureToTexture=function(e,t,n=null,r=null,i=0,a=0){let o,s,c,l,u,d,f,p,m,h=e.isCompressedTexture?e.mipmaps[a]:e.image;if(n!==null)o=n.max.x-n.min.x,s=n.max.y-n.min.y,c=n.isBox3?n.max.z-n.min.z:1,l=n.min.x,u=n.min.y,d=n.isBox3?n.min.z:0;else{let t=2**-i;o=Math.floor(h.width*t),s=Math.floor(h.height*t),c=e.isDataArrayTexture?h.depth:e.isData3DTexture?Math.floor(h.depth*t):1,l=0,u=0,d=0}r===null?(f=0,p=0,m=0):(f=r.x,p=r.y,m=r.z);let g=$e.convert(t.format),_=$e.convert(t.type),v;t.isData3DTexture?(Y.setTexture3D(t,0),v=K.TEXTURE_3D):t.isDataArrayTexture||t.isCompressedArrayTexture?(Y.setTexture2DArray(t,0),v=K.TEXTURE_2D_ARRAY):(Y.setTexture2D(t,0),v=K.TEXTURE_2D),q.activeTexture(K.TEXTURE0),q.pixelStorei(K.UNPACK_FLIP_Y_WEBGL,t.flipY),q.pixelStorei(K.UNPACK_PREMULTIPLY_ALPHA_WEBGL,t.premultiplyAlpha),q.pixelStorei(K.UNPACK_ALIGNMENT,t.unpackAlignment);let y=q.getParameter(K.UNPACK_ROW_LENGTH),b=q.getParameter(K.UNPACK_IMAGE_HEIGHT),x=q.getParameter(K.UNPACK_SKIP_PIXELS),S=q.getParameter(K.UNPACK_SKIP_ROWS),C=q.getParameter(K.UNPACK_SKIP_IMAGES);q.pixelStorei(K.UNPACK_ROW_LENGTH,h.width),q.pixelStorei(K.UNPACK_IMAGE_HEIGHT,h.height),q.pixelStorei(K.UNPACK_SKIP_PIXELS,l),q.pixelStorei(K.UNPACK_SKIP_ROWS,u),q.pixelStorei(K.UNPACK_SKIP_IMAGES,d);let w=e.isDataArrayTexture||e.isData3DTexture,T=t.isDataArrayTexture||t.isData3DTexture;if(e.isDepthTexture){let n=J.get(e),r=J.get(t),h=J.get(n.__renderTarget),g=J.get(r.__renderTarget);q.bindFramebuffer(K.READ_FRAMEBUFFER,h.__webglFramebuffer),q.bindFramebuffer(K.DRAW_FRAMEBUFFER,g.__webglFramebuffer);for(let n=0;n<c;n++)w&&(K.framebufferTextureLayer(K.READ_FRAMEBUFFER,K.COLOR_ATTACHMENT0,J.get(e).__webglTexture,i,d+n),K.framebufferTextureLayer(K.DRAW_FRAMEBUFFER,K.COLOR_ATTACHMENT0,J.get(t).__webglTexture,a,m+n)),K.blitFramebuffer(l,u,o,s,f,p,o,s,K.DEPTH_BUFFER_BIT,K.NEAREST);q.bindFramebuffer(K.READ_FRAMEBUFFER,null),q.bindFramebuffer(K.DRAW_FRAMEBUFFER,null)}else if(i!==0||e.isRenderTargetTexture||J.has(e)){let n=J.get(e),r=J.get(t);q.bindFramebuffer(K.READ_FRAMEBUFFER,re),q.bindFramebuffer(K.DRAW_FRAMEBUFFER,ie);for(let e=0;e<c;e++)w?K.framebufferTextureLayer(K.READ_FRAMEBUFFER,K.COLOR_ATTACHMENT0,n.__webglTexture,i,d+e):K.framebufferTexture2D(K.READ_FRAMEBUFFER,K.COLOR_ATTACHMENT0,K.TEXTURE_2D,n.__webglTexture,i),T?K.framebufferTextureLayer(K.DRAW_FRAMEBUFFER,K.COLOR_ATTACHMENT0,r.__webglTexture,a,m+e):K.framebufferTexture2D(K.DRAW_FRAMEBUFFER,K.COLOR_ATTACHMENT0,K.TEXTURE_2D,r.__webglTexture,a),i===0?T?K.copyTexSubImage3D(v,a,f,p,m+e,l,u,o,s):K.copyTexSubImage2D(v,a,f,p,l,u,o,s):K.blitFramebuffer(l,u,o,s,f,p,o,s,K.COLOR_BUFFER_BIT,K.NEAREST);q.bindFramebuffer(K.READ_FRAMEBUFFER,null),q.bindFramebuffer(K.DRAW_FRAMEBUFFER,null)}else T?e.isDataTexture||e.isData3DTexture?K.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h.data):t.isCompressedArrayTexture?K.compressedTexSubImage3D(v,a,f,p,m,o,s,c,g,h.data):K.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h):e.isDataTexture?K.texSubImage2D(K.TEXTURE_2D,a,f,p,o,s,g,_,h.data):e.isCompressedTexture?K.compressedTexSubImage2D(K.TEXTURE_2D,a,f,p,h.width,h.height,g,h.data):K.texSubImage2D(K.TEXTURE_2D,a,f,p,o,s,g,_,h);q.pixelStorei(K.UNPACK_ROW_LENGTH,y),q.pixelStorei(K.UNPACK_IMAGE_HEIGHT,b),q.pixelStorei(K.UNPACK_SKIP_PIXELS,x),q.pixelStorei(K.UNPACK_SKIP_ROWS,S),q.pixelStorei(K.UNPACK_SKIP_IMAGES,C),a===0&&t.generateMipmaps&&K.generateMipmap(v),q.unbindTexture()},this.initRenderTarget=function(e){J.get(e).__webglFramebuffer===void 0&&Y.setupRenderTarget(e)},this.initTexture=function(e){e.isCubeTexture?Y.setTextureCube(e,0):e.isData3DTexture?Y.setTexture3D(e,0):e.isDataArrayTexture||e.isCompressedArrayTexture?Y.setTexture2DArray(e,0):Y.setTexture2D(e,0),q.unbindTexture()},this.resetState=function(){oe=0,se=0,R=null,q.reset(),et.reset()},typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}get coordinateSystem(){return ae}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=G._getDrawingBufferColorSpace(e),t.unpackColorSpace=G._getUnpackColorSpace()}},qs=Object.freeze({id:`marina`,name:`Marina Casa de Campo`,version:`casa-de-campo-foundation-1`,origin:{lat:18.400767,lon:-68.902414},crs:`EPSG:32619`,unitsPerMetre:1,axes:{x:`east`,y:`up`,z:`south`},meanWater:0,horizontalUncertaintyMetres:3,targetFrameMilliseconds:1e3/45}),Js=6378137,Ys=.0066943799901413165,Xs=.9996,Zs=Math.PI/180;function Qs(e,t){if(!Number.isFinite(e)||!Number.isFinite(t)||e<0||e>84||t<-72||t>-66)throw RangeError(`Expected WGS84 in northern UTM zone 19`);let n=e*Zs,r=(t+69)*Zs,i=Math.sin(n),a=Math.cos(n),o=Math.tan(n),s=Ys/.9933056200098587,c=Js/Math.sqrt(1-Ys*i*i),l=o*o,u=s*a*a,d=a*r,f=Js*((1-Ys/4-3*Ys**2/64-5*Ys**3/256)*n-(3*Ys/8+3*Ys**2/32+45*Ys**3/1024)*Math.sin(2*n)+(15*Ys**2/256+45*Ys**3/1024)*Math.sin(4*n)-35*Ys**3/3072*Math.sin(6*n));return[5e5+Xs*c*(d+(1-l+u)*d**3/6+(5-18*l+l*l+72*u-58*s)*d**5/120),Xs*(f+c*o*(d*d/2+(5-l+9*u+4*u*u)*d**4/24+(61-58*l+l*l+600*u-330*s)*d**6/720))]}Object.freeze(Qs(qs.origin.lat,qs.origin.lon));function $s(e,t){return[e[0]*t[0][0]+e[1]*t[1][0]+t[2][0],e[0]*t[0][1]+e[1]*t[1][1]+t[2][1]]}Object.freeze([[`quay`,`Quay`],[`overhead`,`Overhead`],[`entrance`,`Entrance`],[`pier`,`Pier`],[`river`,`River`]]);function ec(e,t,n){let r=!1;for(let i=0,a=e.length-1;i<e.length;a=i++){let o=e[a],s=e[i],c=s[0]-o[0],l=s[1]-o[1],u=((t-o[0])*c+(n-o[1])*l)/(c*c+l*l||1),d=Math.max(0,Math.min(1,u));if(Math.hypot(t-o[0]-d*c,n-o[1]-d*l)<1e-6)return!0;o[1]>n!=s[1]>n&&t<(s[0]-o[0])*(n-o[1])/(s[1]-o[1])+o[0]&&(r=!r)}return r}function tc(e,t,n){return ec(e.outer,t,n)&&!e.holes?.some(e=>ec(e,t,n))}function nc(e,t,n){let r={distance:1/0,x:t,z:n};for(let i=0;i<e.length;i++){let a=e[i],o=e[(i+1)%e.length],s=o[0]-a[0],c=o[1]-a[1],l=Math.max(0,Math.min(1,((t-a[0])*s+(n-a[1])*c)/(s*s+c*c||1))),u=a[0]+l*s,d=a[1]+l*c,f=Math.hypot(t-u,n-d);f<r.distance&&(r={distance:f,x:u,z:d,dx:s,dz:c})}return r}var rc=class{constructor(e,t=32){this.cell=t,this.cells=new Map,this.triangles=[];for(let n of e){let e=n.mesh,r=Float32Array.from(e.positions),i=e.waterFields?Float32Array.from(e.waterFields):null;for(let a=0;a<e.indices.length;a+=3){let o=e.indices.slice(a,a+3),s=o.map(e=>[r[e*3],r[e*3+1],r[e*3+2]]),c=(s[1][2]-s[2][2])*(s[0][0]-s[2][0])+(s[2][0]-s[1][0])*(s[0][2]-s[2][2]);if(Math.abs(c)<1e-10)continue;let l={id:n.id,kind:n.kind,positions:r,ids:o,den:c,fields:i,index:a/3},u=this.triangles.push(l)-1,d=Math.floor(Math.min(...s.map(e=>e[0]))/t),f=Math.floor(Math.max(...s.map(e=>e[0]))/t),p=Math.floor(Math.min(...s.map(e=>e[2]))/t),m=Math.floor(Math.max(...s.map(e=>e[2]))/t);for(let e=d;e<=f;e++)for(let t=p;t<=m;t++){let n=e+`,`+t;this.cells.has(n)||this.cells.set(n,[]),this.cells.get(n).push(u)}}}}at(e,t,n=1/0,r=null){let i=null;for(let a of this.cells.get(Math.floor(e/this.cell)+`,`+Math.floor(t/this.cell))||[]){let o=this.triangles[a];if(r&&!r(o))continue;let s=o.ids.map(e=>[o.positions[e*3],o.positions[e*3+1],o.positions[e*3+2]]),c=((s[1][2]-s[2][2])*(e-s[2][0])+(s[2][0]-s[1][0])*(t-s[2][2]))/o.den,l=((s[2][2]-s[0][2])*(e-s[2][0])+(s[0][0]-s[2][0])*(t-s[2][2]))/o.den,u=1-c-l;if(c<-1e-6||l<-1e-6||u<-1e-6)continue;let d=c*s[0][1]+l*s[1][1]+u*s[2][1];if(!(d>n+1e-6||i&&d<=i.height)&&(i={height:d,id:o.id,kind:o.kind,triangle:a,weights:[c,l,u]},o.fields)){let[e,t,n]=o.ids;i.fields=[c*o.fields[e*2]+l*o.fields[t*2]+u*o.fields[n*2],c*o.fields[e*2+1]+l*o.fields[t*2+1]+u*o.fields[n*2+1]]}}return i}},ic=class{constructor(e){this.data=e,this.surfaceIndex=new rc(e.patches),this.landIndex={at:(e,t)=>this.surfaceIndex.at(e,t,1/0,e=>e.kind===`land`||e.kind===`rock`)},this.waterIndex=new rc([{id:`CONNECTED-WATER`,kind:`water`,mesh:e.water.mesh}]),this.coast=e.features.filter(e=>e.kind===`land`||e.kind===`rock`).flatMap(e=>e.polygons.flatMap(e=>[e.outer,...e.holes]))}surfaceAt(e,t,n=1/0){return this.surfaceIndex.at(e,t,n)}bedHeightAt(e,t){let n=40;for(let r of this.coast)n=Math.min(n,nc(r,e,t).distance);return-.2-5.3*Math.min(1,n/38)}heightAt(e,t){return this.landIndex.at(e,t)?.height??this.bedHeightAt(e,t)}waterAt(e,t){return this.waterIndex.at(e,t)}},ac={device:null,queue:null,adapter:null,context:null,canvas:null,format:`bgra8unorm`,features:new Set,limits:null,hasTimestamp:!1,hasFloat32Filterable:!1,encoder:null,frame:0,samplers:null,_submitHooks:[],async init({canvas:e=null,requiredLimits:t={},headless:n=!1}={}){if(!navigator.gpu)throw Error(`WebGPU is not available in this browser.`);let r=await navigator.gpu.requestAdapter({powerPreference:`high-performance`});if(!r)throw Error(`No WebGPU adapter found.`);this.adapter=r;let i=r.limits,a={maxSampledTexturesPerShaderStage:32,maxSamplersPerShaderStage:16,maxStorageBuffersPerShaderStage:10,maxStorageTexturesPerShaderStage:8,maxComputeWorkgroupStorageSize:32768,maxColorAttachmentBytesPerSample:64,maxStorageBuffersInVertexStage:4,maxStorageBuffersInFragmentStage:8,maxStorageTexturesInFragmentStage:4,maxBindingsPerBindGroup:1e3,maxBufferSize:1073741824,maxStorageBufferBindingSize:536870912,...t},o={};for(let e in a)i[e]!==void 0&&(o[e]=Math.min(a[e],i[e]));let s=[`float32-filterable`,`timestamp-query`,`rg11b10ufloat-renderable`,`float32-blendable`,`shader-f16`,`clip-distances`].filter(e=>r.features.has(e));this.features=new Set(s),this.hasTimestamp=this.features.has(`timestamp-query`),this.hasFloat32Filterable=this.features.has(`float32-filterable`);let c=await r.requestDevice({requiredFeatures:s,requiredLimits:o});return this.device=c,this.queue=c.queue,this.limits=c.limits,c.lost.then(e=>console.error(`WebGPU device lost:`,e.message)),c.addEventListener&&c.addEventListener(`uncapturederror`,e=>console.error(`WebGPU:`,e.error.message.split(`
`).slice(0,6).join(`
`))),e&&!n&&(this.canvas=e,this.context=e.getContext(`webgpu`),this.format=navigator.gpu.getPreferredCanvasFormat(),this.context.configure({device:c,format:this.format,alphaMode:`opaque`,usage:GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.COPY_DST})),this._createSamplers(),this},_createSamplers(){let e=this.device,t=t=>e.createSampler(t),n={magFilter:`linear`,minFilter:`linear`,mipmapFilter:`linear`};this.samplers={linearRepeat:t({...n,addressModeU:`repeat`,addressModeV:`repeat`,addressModeW:`repeat`}),linearClamp:t({...n,addressModeU:`clamp-to-edge`,addressModeV:`clamp-to-edge`,addressModeW:`clamp-to-edge`}),linearMirror:t({...n,addressModeU:`mirror-repeat`,addressModeV:`mirror-repeat`,addressModeW:`mirror-repeat`}),anisoRepeat:t({...n,addressModeU:`repeat`,addressModeV:`repeat`,addressModeW:`repeat`,maxAnisotropy:8}),aniso4Repeat:t({...n,addressModeU:`repeat`,addressModeV:`repeat`,addressModeW:`repeat`,maxAnisotropy:4}),anisoClamp:t({...n,addressModeU:`clamp-to-edge`,addressModeV:`clamp-to-edge`,maxAnisotropy:8}),nearestClamp:t({magFilter:`nearest`,minFilter:`nearest`,mipmapFilter:`nearest`,addressModeU:`clamp-to-edge`,addressModeV:`clamp-to-edge`,addressModeW:`clamp-to-edge`}),nearestRepeat:t({magFilter:`nearest`,minFilter:`nearest`,mipmapFilter:`nearest`,addressModeU:`repeat`,addressModeV:`repeat`,addressModeW:`repeat`}),shadow:t({magFilter:`linear`,minFilter:`linear`,compare:`less`,addressModeU:`clamp-to-edge`,addressModeV:`clamp-to-edge`})}},beginFrame(){return this.frame++,this.getEncoder()},getEncoder(){return this.encoder||(this.encoder=this.device.createCommandEncoder()),this.encoder},submit(){if(!this.encoder)return;let e=this._submitHooks;this._submitHooks=[];for(let t of e)t.before&&t.before(this.encoder);this.queue.submit([this.encoder.finish()]),this.encoder=null;for(let t of e)t.after&&t.after()},onSubmit(e,t){this._submitHooks.push({before:e,after:t})},_pending:new Set,syncCompiles:[],renderPipeline(e){return this._async(e,`render`)},computePipeline(e){return this._async(e,`compute`)},_async(e,t){let n={pipeline:null,label:e.label,desc:e,kind:t,failed:!1},r=Promise.resolve().then(()=>{if(!n.pipeline)return(t===`render`?this.device.createRenderPipelineAsync:this.device.createComputePipelineAsync).call(this.device,e).then(e=>{n.pipeline||(n.pipeline=e),n.desc=null},t=>{n.failed=!0,console.error(`WebGPU: pipeline "${e.label}" failed: ${t.message.split(`
`).slice(0,6).join(`
`)}`)})}).finally(()=>this._pending.delete(r));return this._pending.add(r),n},ready(e){return e.pipeline||e.failed?e.pipeline:(this.syncCompiles.push(e.label),e.pipeline=e.kind===`render`?this.device.createRenderPipeline(e.desc):this.device.createComputePipeline(e.desc),e.pipeline)},async pipelinesReady(){for(;this._pending.size;)await Promise.all([...this._pending])},computePass(e,t,n){let r=this.getEncoder().beginComputePass({label:e,timestampWrites:n});t(r),r.end()}},oc=2*Math.PI,sc=950148868,cc=e=>Math.max(0,Math.min(255,Math.round((e*.5+.5)*255)));function lc(e){let t=e>>>0;return()=>{t=t+1831565813>>>0;let e=Math.imul(t^t>>>15,t|1);return e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}function uc(e,t){let n=lc(t),r=Math.floor(e*.23),i=[],a=new Set,o=[{name:`broad`,count:10,minimum:5,maximum:Math.min(16,Math.floor(r*.38)),strength:.14,direction:.28},{name:`fine`,count:18,minimum:Math.min(22,Math.floor(r*.72)),maximum:r,strength:.12,direction:.92}];for(let e of o)for(let t=0;t<e.count;t++){let t,r,o;do{let i=e.minimum+n()*(e.maximum-e.minimum),a=e.direction+(n()-.5)*2.2;t=Math.round(Math.cos(a)*i),r=Math.round(Math.sin(a)*i),o=`${t},${r}`}while(t===0&&r===0||a.has(o));a.add(o),i.push(Object.freeze({x:t,z:r,phase:n()*oc,amplitude:e.strength/Math.sqrt(e.count)*(.8+n()*.4),band:e.name}))}return Object.freeze(i)}function dc({size:e=256,worldSize:t=8,seed:n=sc}={}){if(e!==128&&e!==256)throw RangeError(`Water normal texture size must be 128 or 256`);if(!Number.isFinite(t)||t<=0)throw RangeError(`Water normal texture world size must be positive and finite`);if(!Number.isInteger(n)||n<0||n>4294967295)throw RangeError(`Water normal texture seed must be an unsigned 32-bit integer`);let r=uc(e,n),i=new Float64Array(e*e),a=new Float64Array(e*e),o=new Float64Array(e),s=new Float64Array(e),c=new Float64Array(e),l=new Float64Array(e);for(let t of r){for(let n=0;n<e;n++){let r=(n+.5)/e,i=oc*t.x*r+t.phase,a=oc*t.z*r;o[n]=Math.cos(i),s[n]=Math.sin(i),c[n]=Math.cos(a),l[n]=Math.sin(a)}let n=t.amplitude/Math.hypot(t.x,t.z),r=n*t.x,u=n*t.z;for(let t=0;t<e;t++)for(let n=0;n<e;n++){let d=t*e+n,f=o[n]*c[t]-s[n]*l[t];i[d]+=f*r,a[d]+=f*u}}let u=new Uint8Array(e*e*4),d=0;for(let t=0;t<e*e;t++){let e=i[t],n=a[t],r=1/Math.hypot(e,n,1),o=t*4;u[o]=cc(-e*r),u[o+1]=cc(-n*r),u[o+2]=cc(r),u[o+3]=255,d=Math.max(d,Math.hypot(e,n))}let f=Math.log2(e)+1,p=Array.from({length:f},(t,n)=>(e>>n)**2*4).reduce((e,t)=>e+t,0),m=[`broad`,`fine`].map(e=>{let n=r.filter(t=>t.band===e).map(e=>Math.hypot(e.x,e.z));return Object.freeze({name:e,waves:n.length,wavelengthMetres:[t/Math.max(...n),t/Math.min(...n)]})}),h=`Seamless directional water ripples in two spatial bands, baked once on the CPU and filtered with mipmaps.`;return{data:u,size:e,worldSize:t,spectrum:r,metadata:Object.freeze({size:e,worldSize:t,seed:n,format:`rgba8unorm`,encoding:`RGB tangent normal [world X, world Z, upward Y], mapped from -1..1 to 0..1; alpha is 1`,mipLevels:f,textureBytes:p,maximumSlope:d,bands:Object.freeze(m),description:h}),description:h}}var fc=Object.freeze([{a:.18,k:2*Math.PI/100,x:.84,z:.54,w:.78,p:.3},{a:.09,k:2*Math.PI/55,x:.34,z:.94,w:1.06,p:1.7},{a:.025,k:2*Math.PI/30,x:-.45,z:.89,w:1.43,p:3.2}]);function pc(e,t,n,r,i=1){if(!r)return{height:0,wet:!1};let a=r[0]*r[1]*i,o=0;for(let r of fc)o+=r.a*Math.cos(r.k*(r.x*e+r.z*t)-r.w*n+r.p);return{height:o*a,wet:!0,envelope:a}}var mc=class{constructor(e){this.terrain=e,this.time=0,this.strength=1,this.paused=!1,this.visible=!0,this.updates=0}sample(e,t){let n=this.terrain.waterAt(e,t);if(!n)return{height:0,wet:!1};let r=this.terrain.waterIndex.triangles[n.triangle],i=0;for(let e=0;e<3;e++){let t=r.ids[e];i+=pc(r.positions[t*3],r.positions[t*3+2],this.time,[r.fields[t*2],r.fields[t*2+1]],this.strength).height*n.weights[e]}return{height:i,wet:!0,envelope:n.fields[0]*n.fields[1]*this.strength}}update(e){!this.paused&&this.visible&&(this.time+=e,this.updates++)}normalAsset(){return dc({size:256,worldSize:8})}},hc=class{constructor(e){this.dom=e,this.keys=new Set,this.pressed=new Set,this.look={x:0,y:0},this.wheel=0,this.mouseDown=!1,this.rightDown=!1,this.locked=!1,this.enabled=!0,window.addEventListener(`keydown`,e=>{(!e.target||e.target.tagName!==`INPUT`&&e.target.tagName!==`SELECT`&&e.target.tagName!==`TEXTAREA`)&&(this.keys.has(e.code)||this.pressed.add(e.code),this.keys.add(e.code),[`Space`,`ArrowUp`,`ArrowDown`,`Tab`].includes(e.code)&&e.preventDefault())}),window.addEventListener(`keyup`,e=>this.keys.delete(e.code)),window.addEventListener(`blur`,()=>this.keys.clear()),e.addEventListener(`mousedown`,e=>{e.button===0&&(this.mouseDown=!0),e.button===2&&(this.rightDown=!0)}),window.addEventListener(`mouseup`,e=>{e.button===0&&(this.mouseDown=!1),e.button===2&&(this.rightDown=!1)}),e.addEventListener(`contextmenu`,e=>e.preventDefault()),window.addEventListener(`mousemove`,e=>{(this.locked||this.mouseDown||this.rightDown)&&(this.look.x+=e.movementX,this.look.y+=e.movementY)}),e.addEventListener(`wheel`,e=>{this.wheel+=Math.sign(e.deltaY),e.preventDefault()},{passive:!1}),document.addEventListener(`pointerlockchange`,()=>{this.locked=document.pointerLockElement===e})}requestLock(){this.locked||this.dom.requestPointerLock?.()?.catch?.(()=>{})}down(e){return this.enabled&&this.keys.has(e)}hit(e){return this.enabled&&this.pressed.has(e)}consumeLook(){let e={x:this.look.x,y:this.look.y};return this.look.x=0,this.look.y=0,e}consumeWheel(){let e=this.wheel;return this.wheel=0,e}endFrame(){this.pressed.clear()}},gc=Math.PI/180,_c=180/Math.PI,vc=[];for(let e=0;e<256;e++)vc[e]=(e<16?`0`:``)+e.toString(16);function yc(){let e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0,r=Math.random()*4294967295|0;return(vc[e&255]+vc[e>>8&255]+vc[e>>16&255]+vc[e>>24&255]+`-`+vc[t&255]+vc[t>>8&255]+`-`+vc[t>>16&15|64]+vc[t>>24&255]+`-`+vc[n&63|128]+vc[n>>8&255]+`-`+vc[n>>16&255]+vc[n>>24&255]+vc[r&255]+vc[r>>8&255]+vc[r>>16&255]+vc[r>>24&255]).toLowerCase()}var bc=(e,t,n)=>Math.max(t,Math.min(n,e)),xc=(e,t)=>(e%t+t)%t,Sc=(e,t,n,r,i)=>r+(e-t)*(i-r)/(n-t),Cc=(e,t,n)=>e===t?0:(n-e)/(t-e),wc=(e,t,n)=>(1-n)*e+n*t,Tc=(e,t,n,r)=>wc(e,t,1-Math.exp(-n*r)),Ec=(e,t=1)=>t-Math.abs(xc(e,t*2)-t);function Dc(e,t,n){return e<=t?0:e>=n?1:(e=(e-t)/(n-t),e*e*(3-2*e))}function Oc(e,t,n){return e<=t?0:e>=n?1:(e=(e-t)/(n-t),e*e*e*(e*(e*6-15)+10))}var kc=(e,t)=>e+Math.floor(Math.random()*(t-e+1)),Ac=(e,t)=>e+Math.random()*(t-e),jc=e=>e*(.5-Math.random()),Mc=1234567;function Nc(e){e!==void 0&&(Mc=e);let t=Mc+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}var Pc=e=>e*gc,Fc=e=>e*_c,Ic=e=>!(e&e-1)&&e!==0,Lc=e=>2**Math.ceil(Math.log(e)/Math.LN2),Rc=e=>2**Math.floor(Math.log(e)/Math.LN2);function zc(e,t){switch(t.constructor){case Float32Array:case Float64Array:return e;case Uint32Array:return e/4294967295;case Uint16Array:return e/65535;case Uint8Array:case Uint8ClampedArray:return e/255;case Int32Array:return Math.max(e/2147483647,-1);case Int16Array:return Math.max(e/32767,-1);case Int8Array:return Math.max(e/127,-1);default:return e}}function Bc(e,t){switch(t.constructor){case Float32Array:case Float64Array:return e;case Uint32Array:return Math.round(e*4294967295);case Uint16Array:return Math.round(e*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(e*255);case Int32Array:return Math.round(e*2147483647);case Int16Array:return Math.round(e*32767);case Int8Array:return Math.round(e*127);default:return e}}var Vc={normalize:Bc,denormalize:zc,DEG2RAD:gc,RAD2DEG:_c,generateUUID:yc,clamp:bc,euclideanModulo:xc,mapLinear:Sc,inverseLerp:Cc,lerp:wc,damp:Tc,pingpong:Ec,smoothstep:Dc,smootherstep:Oc,randInt:kc,randFloat:Ac,randFloatSpread:jc,seededRandom:Nc,degToRad:Pc,radToDeg:Fc,isPowerOfTwo:Ic,ceilPowerOfTwo:Lc,floorPowerOfTwo:Rc},Hc=class e{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){return e===0?this.x=t:this.y=t,this}getComponent(e){return e===0?this.x:this.y}clone(){return new e(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());return t===0?Math.PI/2:Math.acos(Math.max(-1,Math.min(1,this.dot(e)/t)))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),r=Math.sin(t),i=this.x-e.x,a=this.y-e.y;return this.x=i*n-a*r+e.x,this.y=i*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};Hc.prototype.isVector2=!0;var Uc=class e{constructor(e=0,t=0,n=0,r=1){this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback=Wc}static slerpFlat(t,n,r,i,a,o,s){let c=new e().fromArray(r,i),l=new e().fromArray(a,o);c.slerp(l,s).toArray(t,n)}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new e(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}identity(){return this.set(0,0,0,1)}setFromEuler(e,t=!0){let n=e._x,r=e._y,i=e._z,a=e._order,o=Math.cos(n/2),s=Math.cos(r/2),c=Math.cos(i/2),l=Math.sin(n/2),u=Math.sin(r/2),d=Math.sin(i/2);switch(a){case`XYZ`:this._x=l*s*c+o*u*d,this._y=o*u*c-l*s*d,this._z=o*s*d+l*u*c,this._w=o*s*c-l*u*d;break;case`YXZ`:this._x=l*s*c+o*u*d,this._y=o*u*c-l*s*d,this._z=o*s*d-l*u*c,this._w=o*s*c+l*u*d;break;case`ZXY`:this._x=l*s*c-o*u*d,this._y=o*u*c+l*s*d,this._z=o*s*d+l*u*c,this._w=o*s*c-l*u*d;break;case`ZYX`:this._x=l*s*c-o*u*d,this._y=o*u*c+l*s*d,this._z=o*s*d-l*u*c,this._w=o*s*c+l*u*d;break;case`YZX`:this._x=l*s*c+o*u*d,this._y=o*u*c+l*s*d,this._z=o*s*d-l*u*c,this._w=o*s*c-l*u*d;break;case`XZY`:this._x=l*s*c-o*u*d,this._y=o*u*c-l*s*d,this._z=o*s*d+l*u*c,this._w=o*s*c+l*u*d;break;default:throw Error(`Quaternion.setFromEuler: unknown order `+a)}return t&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],r=t[4],i=t[8],a=t[1],o=t[5],s=t[9],c=t[2],l=t[6],u=t[10],d=n+o+u;if(d>0){let e=.5/Math.sqrt(d+1);this._w=.25/e,this._x=(l-s)*e,this._y=(i-c)*e,this._z=(a-r)*e}else if(n>o&&n>u){let e=2*Math.sqrt(1+n-o-u);this._w=(l-s)/e,this._x=.25*e,this._y=(r+a)/e,this._z=(i+c)/e}else if(o>u){let e=2*Math.sqrt(1+o-n-u);this._w=(i-c)/e,this._x=(r+a)/e,this._y=.25*e,this._z=(s+l)/e}else{let e=2*Math.sqrt(1+u-n-o);this._w=(a-r)/e,this._x=(i+c)/e,this._y=(s+l)/e,this._z=.25*e}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.x*t.x+e.y*t.y+e.z*t.z+1;return n<2**-52?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Math.max(-1,Math.min(1,this.dot(e)))))}rotateTowards(e,t){let n=this.angleTo(e);return n===0?this:this.slerp(e,Math.min(1,t/n))}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this.lengthSq())}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x*=e,this._y*=e,this._z*=e,this._w*=e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=t._x,s=t._y,c=t._z,l=t._w;return this._x=n*l+a*o+r*c-i*s,this._y=r*l+a*s+i*o-n*c,this._z=i*l+a*c+n*s-r*o,this._w=a*l-n*o-r*s-i*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);let n=this._x,r=this._y,i=this._z,a=this._w,o=a*e._w+n*e._x+r*e._y+i*e._z,s=e._x,c=e._y,l=e._z,u=e._w;if(o<0&&(s=-s,c=-c,l=-l,u=-u,o=-o),o>=1)return this;let d=1-o*o;if(d<=2**-52){let e=1-t;return this._w=e*a+t*u,this._x=e*n+t*s,this._y=e*r+t*c,this._z=e*i+t*l,this.normalize()}let f=Math.sqrt(d),p=Math.atan2(f,o),m=Math.sin((1-t)*p)/f,h=Math.sin(t*p)/f;return this._w=a*m+u*h,this._x=n*m+s*h,this._y=r*m+c*h,this._z=i*m+l*h,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),i=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),i*Math.sin(t),i*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this.set(e.getX(t),e.getY(t),e.getZ(t),e.getW(t))}_onChange(e){return this._onChangeCallback=e,this}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}};function Wc(){}Uc.prototype.isQuaternion=!0;var Gc=new Uc,$=class e{constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){return e===0?this.x=t:e===1?this.y=t:this.z=t,this}getComponent(e){return e===0?this.x:e===1?this.y:this.z}clone(){return new e(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}applyEuler(e){return this.applyQuaternion(Gc.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Gc.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6]*r,this.y=i[1]*t+i[4]*n+i[7]*r,this.z=i[2]*t+i[5]*n+i[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=e.elements,a=1/(i[3]*t+i[7]*n+i[11]*r+i[15]);return this.x=(i[0]*t+i[4]*n+i[8]*r+i[12])*a,this.y=(i[1]*t+i[5]*n+i[9]*r+i[13])*a,this.z=(i[2]*t+i[6]*n+i[10]*r+i[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,r=this.z,i=e.x,a=e.y,o=e.z,s=e.w,c=2*(a*r-o*n),l=2*(o*t-i*r),u=2*(i*n-a*t);return this.x=t+s*c+a*u-o*l,this.y=n+s*l+o*c-i*u,this.z=r+s*u+i*l-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[4]*n+i[8]*r,this.y=i[1]*t+i[5]*n+i[9]*r,this.z=i[2]*t+i[6]*n+i[10]*r,this.normalize()}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,r=e.y,i=e.z,a=t.x,o=t.y,s=t.z;return this.x=r*s-i*o,this.y=i*a-n*s,this.z=n*o-r*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){let t=this.dot(e)/(e.lengthSq()||1);return this.addScaledVector(e,-t)}reflect(e){return this.addScaledVector(e,-2*this.dot(e))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());return t===0?Math.PI/2:Math.acos(Math.max(-1,Math.min(1,this.dot(e)/t)))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.set(t,n,r)}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};$.prototype.isVector3=!0;var Kc=class e{constructor(e=0,t=0,n=0,r=1){this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){return this[`xyzw`[e]]=t,this}getComponent(e){return this[`xyzw`[e]]}clone(){return new e(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w===void 0?1:e.w,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*i,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*i,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*i,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*i,this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.dot(this)}length(){return Math.sqrt(this.dot(this))}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};Kc.prototype.isVector4=!0;var qc=2001,Jc=new $,Yc=new $,Xc=new $,Zc=new $,Qc=new Uc,$c=new $(1,1,1),el=new $,tl=class e{constructor(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h)}set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){let g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=r,g[1]=i,g[5]=a,g[9]=o,g[13]=s,g[2]=c,g[6]=l,g[10]=u,g[14]=d,g[3]=f,g[7]=p,g[11]=m,g[15]=h,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1)}clone(){return new e().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;for(let e=0;e<16;e++)t[e]=n[e];return this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1)}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1)}extractRotation(e){let t=this.elements,n=e.elements,r=1/Jc.setFromMatrixColumn(e,0).length(),i=1/Jc.setFromMatrixColumn(e,1).length(),a=1/Jc.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*i,t[5]=n[5]*i,t[6]=n[6]*i,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){return this.compose(el,Qc.setFromEuler(e,!1),$c)}makeRotationFromQuaternion(e){return this.compose(el,e,$c)}lookAt(e,t,n){let r=this.elements;return Zc.subVectors(e,t),Zc.lengthSq()===0&&(Zc.z=1),Zc.normalize(),Yc.crossVectors(n,Zc),Yc.lengthSq()===0&&(Math.abs(n.z)===1?Zc.x+=1e-4:Zc.z+=1e-4,Zc.normalize(),Yc.crossVectors(n,Zc)),Yc.normalize(),Xc.crossVectors(Zc,Yc),r[0]=Yc.x,r[4]=Xc.x,r[8]=Zc.x,r[1]=Yc.y,r[5]=Xc.y,r[9]=Zc.y,r[2]=Yc.z,r[6]=Xc.z,r[10]=Zc.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[4],s=n[8],c=n[12],l=n[1],u=n[5],d=n[9],f=n[13],p=n[2],m=n[6],h=n[10],g=n[14],_=n[3],v=n[7],y=n[11],b=n[15],x=r[0],S=r[4],C=r[8],w=r[12],T=r[1],E=r[5],D=r[9],O=r[13],k=r[2],A=r[6],j=r[10],M=r[14],N=r[3],P=r[7],F=r[11],I=r[15];return i[0]=a*x+o*T+s*k+c*N,i[4]=a*S+o*E+s*A+c*P,i[8]=a*C+o*D+s*j+c*F,i[12]=a*w+o*O+s*M+c*I,i[1]=l*x+u*T+d*k+f*N,i[5]=l*S+u*E+d*A+f*P,i[9]=l*C+u*D+d*j+f*F,i[13]=l*w+u*O+d*M+f*I,i[2]=p*x+m*T+h*k+g*N,i[6]=p*S+m*E+h*A+g*P,i[10]=p*C+m*D+h*j+g*F,i[14]=p*w+m*O+h*M+g*I,i[3]=_*x+v*T+y*k+b*N,i[7]=_*S+v*E+y*A+b*P,i[11]=_*C+v*D+y*j+b*F,i[15]=_*w+v*O+y*M+b*I,this}multiplyScalar(e){let t=this.elements;for(let n=0;n<16;n++)t[n]*=e;return this}determinant(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[12],a=e[1],o=e[5],s=e[9],c=e[13],l=e[2],u=e[6],d=e[10],f=e[14],p=e[3],m=e[7],h=e[11],g=e[15],_=d*g-f*h,v=u*g-f*m,y=u*h-d*m,b=l*g-f*p,x=l*h-d*p,S=l*m-u*p;return t*(o*_-s*v+c*y)-n*(a*_-s*b+c*x)+r*(a*v-o*b+c*S)-i*(a*y-o*x+s*S)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=e[9],d=e[10],f=e[11],p=e[12],m=e[13],h=e[14],g=e[15],_=t*o-n*a,v=t*s-r*a,y=t*c-i*a,b=n*s-r*o,x=n*c-i*o,S=r*c-i*s,C=l*m-u*p,w=l*h-d*p,T=l*g-f*p,E=u*h-d*m,D=u*g-f*m,O=d*g-f*h,k=_*O-v*D+y*E+b*T-x*w+S*C;if(k===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let A=1/k;return e[0]=(o*O-s*D+c*E)*A,e[1]=(r*D-n*O-i*E)*A,e[2]=(m*S-h*x+g*b)*A,e[3]=(d*x-u*S-f*b)*A,e[4]=(s*T-a*O-c*w)*A,e[5]=(t*O-r*T+i*w)*A,e[6]=(h*y-p*S-g*v)*A,e[7]=(l*S-d*y+f*v)*A,e[8]=(a*D-o*T+c*C)*A,e[9]=(n*T-t*D-i*C)*A,e[10]=(p*x-m*y+g*_)*A,e[11]=(u*y-l*x-f*_)*A,e[12]=(o*w-a*E-s*C)*A,e[13]=(t*E-n*w+r*C)*A,e[14]=(m*v-p*b-h*_)*A,e[15]=(l*b-u*v+d*_)*A,this}scale(e){let t=this.elements;return t[0]*=e.x,t[4]*=e.y,t[8]*=e.z,t[1]*=e.x,t[5]*=e.y,t[9]*=e.z,t[2]*=e.x,t[6]*=e.y,t[10]*=e.z,t[3]*=e.x,t[7]*=e.y,t[11]*=e.z,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1)}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1)}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1)}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1)}makeRotationAxis(e,t){let n=Math.cos(t),r=Math.sin(t),i=1-n,a=e.x,o=e.y,s=e.z,c=i*a,l=i*o;return this.set(c*a+n,c*o-r*s,c*s+r*o,0,c*o+r*s,l*o+n,l*s-r*a,0,c*s-r*o,l*s+r*a,i*s*s+n,0,0,0,0,1)}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1)}makeShear(e,t,n,r,i,a){return this.set(1,n,i,0,e,1,a,0,t,r,1,0,0,0,0,1)}compose(e,t,n){let r=this.elements,i=t._x,a=t._y,o=t._z,s=t._w,c=i+i,l=a+a,u=o+o,d=i*c,f=i*l,p=i*u,m=a*l,h=a*u,g=o*u,_=s*c,v=s*l,y=s*u,b=n.x,x=n.y,S=n.z;return r[0]=(1-(m+g))*b,r[1]=(f+y)*b,r[2]=(p-v)*b,r[3]=0,r[4]=(f-y)*x,r[5]=(1-(d+g))*x,r[6]=(h+_)*x,r[7]=0,r[8]=(p+v)*S,r[9]=(h-_)*S,r[10]=(1-(d+m))*S,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){let r=this.elements,i=Math.hypot(r[0],r[1],r[2]),a=Math.hypot(r[4],r[5],r[6]),o=Math.hypot(r[8],r[9],r[10]);this.determinant()<0&&(i=-i),e.x=r[12],e.y=r[13],e.z=r[14];let s=nl.copy(this),c=s.elements,l=1/i,u=1/a,d=1/o;return c[0]*=l,c[1]*=l,c[2]*=l,c[4]*=u,c[5]*=u,c[6]*=u,c[8]*=d,c[9]*=d,c[10]*=d,t.setFromRotationMatrix(s),n.x=i,n.y=a,n.z=o,this}makePerspective(e,t,n,r,i,a,o=qc,s=!0){let c=this.elements,l=2*i/(t-e),u=2*i/(n-r),d=(t+e)/(t-e),f=(n+r)/(n-r),p,m,h=a===1/0;if(s){if(o!==2001)throw Error(`Matrix4.makePerspective: reversed depth requires WebGPU clip space`);p=h?0:i/(a-i),m=h?i:a*i/(a-i)}else o===2001?(p=h?-1:-a/(a-i),m=h?-i:-a*i/(a-i)):(p=h?-1:-(a+i)/(a-i),m=h?-2*i:-2*a*i/(a-i));return c[0]=l,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,r,i,a,o=qc,s=!0){let c=this.elements,l=1/(t-e),u=1/(n-r),d=1/(a-i),f=(t+e)*l,p=(n+r)*u,m,h;return s?(m=a*d,h=d):o===2001?(m=-i*d,h=-d):(m=-(a+i)*d,h=-2*d),c[0]=2*l,c[4]=0,c[8]=0,c[12]=-f,c[1]=0,c[5]=2*u,c[9]=0,c[13]=-p,c[2]=0,c[6]=0,c[10]=h,c[14]=m,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){for(let t=0;t<16;t++)if(this.elements[t]!==e.elements[t])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;for(let r=0;r<16;r++)e[t+r]=n[r];return e}};tl.prototype.isMatrix4=!0;var nl=new tl,rl=new tl,il=new Uc,al=e=>Math.max(-1,Math.min(1,e)),ol=class e{constructor(t=0,n=0,r=0,i=e.DEFAULT_ORDER){this._x=t,this._y=n,this._z=r,this._order=i,this._onChangeCallback=sl}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new e(this._x,this._y,this._z,this._order)}copy(e){return this.set(e._x,e._y,e._z,e._order)}setFromRotationMatrix(e,t=this._order,n=!0){let r=e.elements,i=r[0],a=r[4],o=r[8],s=r[1],c=r[5],l=r[9],u=r[2],d=r[6],f=r[10],p=.9999999;switch(t){case`XYZ`:this._y=Math.asin(al(o)),Math.abs(o)<p?(this._x=Math.atan2(-l,f),this._z=Math.atan2(-a,i)):(this._x=Math.atan2(d,c),this._z=0);break;case`YXZ`:this._x=Math.asin(-al(l)),Math.abs(l)<p?(this._y=Math.atan2(o,f),this._z=Math.atan2(s,c)):(this._y=Math.atan2(-u,i),this._z=0);break;case`ZXY`:this._x=Math.asin(al(d)),Math.abs(d)<p?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(s,i));break;case`ZYX`:this._y=Math.asin(-al(u)),Math.abs(u)<p?(this._x=Math.atan2(d,f),this._z=Math.atan2(s,i)):(this._x=0,this._z=Math.atan2(-a,c));break;case`YZX`:this._z=Math.asin(al(s)),Math.abs(s)<p?(this._x=Math.atan2(-l,c),this._y=Math.atan2(-u,i)):(this._x=0,this._y=Math.atan2(o,f));break;case`XZY`:this._z=Math.asin(-al(a)),Math.abs(a)<p?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,i)):(this._x=Math.atan2(-l,f),this._y=0);break;default:throw Error(`Euler.setFromRotationMatrix: unknown order `+t)}return this._order=t,n&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return rl.makeRotationFromQuaternion(e),this.setFromRotationMatrix(rl,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return il.setFromEuler(this),this.setFromQuaternion(il,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};function sl(){}ol.DEFAULT_ORDER=`XYZ`,ol.prototype.isEuler=!0;var cl=class e{constructor(e,t,n,r,i,a,o,s,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c)}set(e,t,n,r,i,a,o,s,c){let l=this.elements;return l[0]=e,l[1]=r,l[2]=o,l[3]=t,l[4]=i,l[5]=s,l[6]=n,l[7]=a,l[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1)}copy(e){let t=this.elements,n=e.elements;for(let e=0;e<9;e++)t[e]=n[e];return this}clone(){return new e().fromArray(this.elements)}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10])}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[3],s=n[6],c=n[1],l=n[4],u=n[7],d=n[2],f=n[5],p=n[8],m=r[0],h=r[3],g=r[6],_=r[1],v=r[4],y=r[7],b=r[2],x=r[5],S=r[8];return i[0]=a*m+o*_+s*b,i[3]=a*h+o*v+s*x,i[6]=a*g+o*y+s*S,i[1]=c*m+l*_+u*b,i[4]=c*h+l*v+u*x,i[7]=c*g+l*y+u*S,i[2]=d*m+f*_+p*b,i[5]=d*h+f*v+p*x,i[8]=d*g+f*y+p*S,this}multiplyScalar(e){let t=this.elements;for(let n=0;n<9;n++)t[n]*=e;return this}determinant(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8];return t*a*l-t*o*c-n*i*l+n*o*s+r*i*c-r*a*s}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=l*a-o*c,d=o*s-l*i,f=c*i-a*s,p=t*u+n*d+r*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let m=1/p;return e[0]=u*m,e[1]=(r*c-l*n)*m,e[2]=(o*n-r*a)*m,e[3]=d*m,e[4]=(l*t-r*s)*m,e[5]=(r*i-o*t)*m,e[6]=f*m,e[7]=(n*s-c*t)*m,e[8]=(a*t-n*i)*m,this}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}makeTranslation(e,t){return e.isVector2&&(t=e.y,e=e.x),this.set(1,0,e,0,1,t,0,0,1)}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1)}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1)}setUvTransform(e,t,n,r,i,a,o){let s=Math.cos(i),c=Math.sin(i);return this.set(n*s,n*c,-n*(s*a+c*o)+a+e,-r*c,r*s,-r*(-c*a+s*o)+o+t,0,0,1)}scale(e,t){return this.premultiply(ll.makeScale(e,t))}rotate(e){return this.premultiply(ll.makeRotation(-e))}translate(e,t){return this.premultiply(ll.makeTranslation(e,t))}equals(e){for(let t=0;t<9;t++)if(this.elements[t]!==e.elements[t])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){for(let n=0;n<9;n++)e[t+n]=this.elements[n];return e}};cl.prototype.isMatrix3=!0;var ll=new cl,ul=`srgb`,dl=`srgb-linear`,fl=e=>e<.04045?e*.0773993808:(e*.9478672986+.0521327014)**2.4,pl=e=>e<.0031308?e*12.92:1.055*e**.41666-.055,ml=e=>Math.max(0,Math.min(1,e)),hl=(e,t)=>(e%t+t)%t;function gl(e,t,n){return n<0&&(n+=1),n>1&&--n,n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*6*(2/3-n):e}var _l={h:0,s:0,l:0},vl=class e{constructor(e,t,n){this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){if(e===void 0)return this;e&&e.isColor?this.copy(e):typeof e==`number`?this.setHex(e):typeof e==`string`&&this.setStyle(e)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=ul){return e=Math.floor(e),this.setRGB((e>>16&255)/255,(e>>8&255)/255,(e&255)/255,t)}setRGB(e,t,n,r=dl){return r===`srgb`&&(e=fl(e),t=fl(t),n=fl(n)),this.r=e,this.g=t,this.b=n,this}setHSL(e,t,n,r=dl){if(e=hl(e,1),t=ml(t),n=ml(n),t===0)return this.setRGB(n,n,n,r);let i=n<=.5?n*(1+t):n+t-n*t,a=2*n-i;return this.setRGB(gl(a,i,e+1/3),gl(a,i,e),gl(a,i,e-1/3),r)}setStyle(e,t=ul){let n;if(n=/^#([A-Fa-f\d]+)$/.exec(e)){let e=n[1];if(e.length===3)return this.setRGB(parseInt(e[0],16)/15,parseInt(e[1],16)/15,parseInt(e[2],16)/15,t);if(e.length===6)return this.setHex(parseInt(e,16),t)}else if(n=/^rgba?\(\s*([\d.]+)(%?)\s*,\s*([\d.]+)%?\s*,\s*([\d.]+)%?\s*(?:,\s*[\d.]+\s*)?\)$/.exec(e)){let e=n[2]===`%`?100:255;return this.setRGB(Math.min(1,n[1]/e),Math.min(1,n[3]/e),Math.min(1,n[4]/e),t)}else if(n=/^hsla?\(\s*([\d.]+)\s*,\s*([\d.]+)%\s*,\s*([\d.]+)%\s*(?:,\s*[\d.]+\s*)?\)$/.exec(e))return this.setHSL(n[1]/360,n[2]/100,n[3]/100,t);else if(yl[e.toLowerCase()]!==void 0)return this.setHex(yl[e.toLowerCase()],t);return console.warn(`Color: unknown color `+e),this}clone(){return new e(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=fl(e.r),this.g=fl(e.g),this.b=fl(e.b),this}copyLinearToSRGB(e){return this.r=pl(e.r),this.g=pl(e.g),this.b=pl(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this)}convertLinearToSRGB(){return this.copyLinearToSRGB(this)}getHex(e=ul){let t=this.r,n=this.g,r=this.b;return e===`srgb`&&(t=pl(t),n=pl(n),r=pl(r)),Math.round(ml(t)*255)*65536+Math.round(ml(n)*255)*256+Math.round(ml(r)*255)}getHexString(e=ul){return(`000000`+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=dl){let n=this.r,r=this.g,i=this.b;t===`srgb`&&(n=pl(n),r=pl(r),i=pl(i));let a=Math.max(n,r,i),o=Math.min(n,r,i),s=0,c=0,l=(o+a)/2;if(o!==a){let e=a-o;c=l<=.5?e/(a+o):e/(2-a-o),s=a===n?(r-i)/e+(r<i?6:0):a===r?(i-n)/e+2:(n-r)/e+4,s/=6}return e.h=s,e.s=c,e.l=l,e}getRGB(e,t=dl){return e.r=this.r,e.g=this.g,e.b=this.b,t===`srgb`&&(e.r=pl(e.r),e.g=pl(e.g),e.b=pl(e.b)),e}getStyle(e=ul){let t=this.getRGB({},e);return`rgb(${Math.round(t.r*255)},${Math.round(t.g*255)},${Math.round(t.b*255)})`}offsetHSL(e,t,n){return this.getHSL(_l),this.setHSL(_l.h+e,_l.s+t,_l.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}};vl.prototype.isColor=!0;var yl={black:0,white:16777215,red:16711680,green:32768,lime:65280,blue:255,yellow:16776960,cyan:65535,magenta:16711935,gray:8421504,grey:8421504,orange:16753920};vl.NAMES=yl;var bl=new $,xl=Array.from({length:8},()=>new $),Sl=class e{constructor(e=new $(1/0,1/0,1/0),t=new $(-1/0,-1/0,-1/0)){this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0;t<e.length;t+=3)this.expandByPoint(bl.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0;t<e.count;t++)this.expandByPoint(bl.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t of e)this.expandByPoint(t);return this}setFromCenterAndSize(e,t){return bl.copy(t).multiplyScalar(.5),this.min.copy(e).sub(bl),this.max.copy(e).add(bl),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new e().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute(`position`);if(t&&r!==void 0)for(let t=0;t<r.count;t++)this.expandByPoint(bl.fromBufferAttribute(r,t).applyMatrix4(e.matrixWorld));else n.boundingBox===null&&n.computeBoundingBox(),Cl.copy(n.boundingBox).applyMatrix4(e.matrixWorld),this.union(Cl)}for(let n of e.children)this.expandByObject(n,t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,bl),bl.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n,r=e.normal;return r.x>0?(t=r.x*this.min.x,n=r.x*this.max.x):(t=r.x*this.max.x,n=r.x*this.min.x),r.y>0?(t+=r.y*this.min.y,n+=r.y*this.max.y):(t+=r.y*this.max.y,n+=r.y*this.min.y),r.z>0?(t+=r.z*this.min.z,n+=r.z*this.max.z):(t+=r.z*this.max.z,n+=r.z*this.min.z),t<=-e.constant&&n>=-e.constant}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,bl).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?(e.makeEmpty(),e):(this.getCenter(e.center),e.radius=this.getSize(bl).length()*.5,e)}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){if(this.isEmpty())return this;let t=this.min,n=this.max;return xl[0].set(t.x,t.y,t.z).applyMatrix4(e),xl[1].set(t.x,t.y,n.z).applyMatrix4(e),xl[2].set(t.x,n.y,t.z).applyMatrix4(e),xl[3].set(t.x,n.y,n.z).applyMatrix4(e),xl[4].set(n.x,t.y,t.z).applyMatrix4(e),xl[5].set(n.x,t.y,n.z).applyMatrix4(e),xl[6].set(n.x,n.y,t.z).applyMatrix4(e),xl[7].set(n.x,n.y,n.z).applyMatrix4(e),this.setFromPoints(xl)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}};Sl.prototype.isBox3=!0;var Cl=new Sl,wl=new Sl,Tl=new $,El=class e{constructor(e=new $,t=-1){this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){t===void 0?wl.setFromPoints(e).getCenter(this.center):this.center.copy(t);let n=0;for(let t of e)n=Math.max(n,this.center.distanceToSquared(t));return this.radius=Math.sqrt(n),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}clone(){return new e().copy(this)}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&t.sub(this.center).normalize().multiplyScalar(this.radius).add(this.center),t}getBoundingBox(e){return this.isEmpty()?e.makeEmpty():(e.set(this.center,this.center),e.expandByScalar(this.radius))}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius*=e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Tl.subVectors(e,this.center);let t=Tl.lengthSq();if(t>this.radius*this.radius){let e=Math.sqrt(t),n=(e-this.radius)*.5;this.center.addScaledVector(Tl,n/e),this.radius+=n}return this}union(e){if(e.isEmpty())return this;if(this.isEmpty())return this.copy(e);let t=this.center.distanceTo(e.center);if(t+e.radius<=this.radius)return this;if(t+this.radius<=e.radius)return this.copy(e);let n=(t+this.radius+e.radius)*.5;return this.center.lerp(e.center,(n-this.radius)/t),this.radius=n,this}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}};El.prototype.isSphere=!0;var Dl=new $,Ol=new $,kl=new cl,Al=class e{constructor(e=new $(1,0,0),t=0){this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(e),this}setFromCoplanarPoints(e,t,n){let r=Dl.subVectors(n,t).cross(Ol.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e)}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}clone(){return new e().copy(this)}normalize(){let e=this.normal.length();if(e===0)return this;let t=1/e;return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}applyMatrix4(e,t){let n=t||kl.getNormalMatrix(e),r=this.coplanarPoint(Dl).applyMatrix4(e),i=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(i),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}};Al.prototype.isPlane=!0;var jl=class{constructor(){this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}getPoint(){throw Error(`Curve.getPoint() not implemented`)}getPointAt(e,t){return this.getPoint(this.getUtoTmapping(e),t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[0],n=this.getPoint(0),r=0;for(let i=1;i<=e;i++){let a=this.getPoint(i/e);r+=a.distanceTo(n),t.push(r),n=a}return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),r=n.length,i=t===null?e*n[r-1]:t,a=0,o=r-1;for(;a<=o;){let e=Math.floor(a+(o-a)/2),t=n[e]-i;if(t<0)a=e+1;else if(t>0)o=e-1;else{o=e;break}}let s=o;if(n[s]===i)return s/(r-1);let c=n[s],l=n[s+1];return(s+(i-c)/(l-c))/(r-1)}getTangent(e,t=new $){let n=1e-4,r=Math.max(0,e-n),i=Math.min(1,e+n),a=this.getPoint(r),o=this.getPoint(i);return t.copy(o).sub(a).normalize()}getTangentAt(e,t){return this.getTangent(this.getUtoTmapping(e),t)}computeFrenetFrames(e,t){let n=new $,r=[],i=[],a=[],o=new $,s=new tl;for(let t=0;t<=e;t++)r[t]=this.getTangentAt(t/e,new $);i[0]=new $,a[0]=new $;let c=Number.MAX_VALUE,l=Math.abs(r[0].x),u=Math.abs(r[0].y),d=Math.abs(r[0].z);l<=c&&(c=l,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),d<=c&&n.set(0,0,1),o.crossVectors(r[0],n).normalize(),i[0].crossVectors(r[0],o),a[0].crossVectors(r[0],i[0]);for(let t=1;t<=e;t++){if(i[t]=i[t-1].clone(),a[t]=a[t-1].clone(),o.crossVectors(r[t-1],r[t]),o.length()>2**-52){o.normalize();let e=Math.acos(Math.max(-1,Math.min(1,r[t-1].dot(r[t]))));i[t].applyMatrix4(s.makeRotationAxis(o,e))}a[t].crossVectors(r[t],i[t])}if(t===!0){let t=Math.acos(Math.max(-1,Math.min(1,i[0].dot(i[e]))))/e;r[0].dot(o.crossVectors(i[0],i[e]))>0&&(t=-t);for(let n=1;n<=e;n++)i[n].applyMatrix4(s.makeRotationAxis(r[n],t*n)),a[n].crossVectors(r[n],i[n])}return{tangents:r,normals:i,binormals:a}}};function Ml(e,t,n,r,i){e[0]=t,e[1]=r,e[2]=-3*t+3*n-2*r-i,e[3]=2*t-2*n+r+i}function Nl(e,t,n,r,i,a){Ml(e,n,r,a*(r-t),a*(i-n))}function Pl(e,t,n,r,i,a,o,s){let c=(n-t)/a-(r-t)/(a+o)+(r-n)/o,l=(r-n)/o-(i-n)/(o+s)+(i-r)/s;c*=o,l*=o,Ml(e,n,r,c,l)}var Fl=(e,t)=>e[0]+t*(e[1]+t*(e[2]+t*e[3])),Il=[0,0,0,0],Ll=[0,0,0,0],Rl=[0,0,0,0],zl=new $,Bl=new $,Vl=class e extends jl{constructor(e=[],t=!1,n=`centripetal`,r=.5){super(),this.type=`CatmullRomCurve3`,this.points=e,this.closed=t,this.curveType=n,this.tension=r}getPoint(e,t=new $){let n=this.points,r=n.length,i=(r-+!this.closed)*e,a=Math.floor(i),o=i-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:o===0&&a===r-1&&(a=r-2,o=1);let s,c;s=this.closed||a>0?n[(a-1)%r]:zl.subVectors(n[0],n[1]).add(n[0]);let l=n[a%r],u=n[(a+1)%r];if(c=this.closed||a+2<r?n[(a+2)%r]:Bl.subVectors(n[r-1],n[r-2]).add(n[r-1]),this.curveType===`centripetal`||this.curveType===`chordal`){let e=this.curveType===`chordal`?.5:.25,t=s.distanceToSquared(l)**+e,n=l.distanceToSquared(u)**+e,r=u.distanceToSquared(c)**+e;n<1e-4&&(n=1),t<1e-4&&(t=n),r<1e-4&&(r=n),Pl(Il,s.x,l.x,u.x,c.x,t,n,r),Pl(Ll,s.y,l.y,u.y,c.y,t,n,r),Pl(Rl,s.z,l.z,u.z,c.z,t,n,r)}else Nl(Il,s.x,l.x,u.x,c.x,this.tension),Nl(Ll,s.y,l.y,u.y,c.y,this.tension),Nl(Rl,s.z,l.z,u.z,c.z,this.tension);return t.set(Fl(Il,o),Fl(Ll,o),Fl(Rl,o))}copy(e){return super.copy(e),this.points=e.points.map(e=>e.clone()),this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}clone(){return new e().copy(this)}};Vl.prototype.isCatmullRomCurve3=!0;var Hl=new Float32Array(1),Ul=new Uint32Array(Hl.buffer);function Wl(e){Math.abs(e)>65504&&console.warn(`DataUtils.toHalfFloat(): value out of range.`),e=Math.max(-65504,Math.min(65504,e)),Hl[0]=e;let t=Ul[0],n=t>>>16&32768,r=t>>>23&255,i=t&8388607;if(r===255)return n|31744|i>>>13;let a=r-127+15;return a>=31?n|31744:a<=0?a<-10?n:n|(i|8388608)>>>14-a:n|a<<10|i>>>13}function Gl(e){let t=e&32768?-1:1,n=e>>>10&31,r=e&1023;return n===0?t*2**-14*(r/1024):n===31?r?NaN:t*(1/0):t*2**(n-15)*(1+r/1024)}var Kl=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].includes(t)||n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n!==void 0&&n[e]!==void 0&&n[e].includes(t)}removeEventListener(e,t){let n=this._listeners&&this._listeners[e];if(n===void 0)return;let r=n.indexOf(t);r!==-1&&n.splice(r,1)}dispatchEvent(e){let t=this._listeners&&this._listeners[e.type];if(t!==void 0){e.target=this;for(let n of t.slice())n.call(this,e);e.target=null}}},ql=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return!!(this.mask&(1<<e|0))}},Jl=0,Yl=new $,Xl=new Uc,Zl=new tl,Ql=new $,$l=new $,eu=new $,tu=new Uc,nu=new $(1,0,0),ru=new $(0,1,0),iu=new $(0,0,1),au={type:`added`},ou={type:`removed`},su={type:`childadded`,child:null},cu={type:`childremoved`,child:null},lu=class e extends Kl{constructor(){super(),Object.defineProperty(this,"id",{value:Jl++}),this.uuid=yc(),this.name=``,this.type=`Object3D`,this.parent=null,this.children=[],this.up=e.DEFAULT_UP.clone();let t=new $,n=new ol,r=new Uc,i=new $(1,1,1);n._onChange(()=>r.setFromEuler(n,!1)),r._onChange(()=>n.setFromQuaternion(r,void 0,!1)),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new tl},normalMatrix:{value:new cl}}),this.matrix=new tl,this.matrixWorld=new tl,this.matrixAutoUpdate=e.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new ql,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.userData={}}onBeforeRender(){}onAfterRender(){}onBeforeShadow(){}onAfterShadow(){}dispose(){this.dispatchEvent({type:`dispose`})}applyMatrix4(e){return this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale),this}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Xl.setFromAxisAngle(e,t),this.quaternion.multiply(Xl),this}rotateOnWorldAxis(e,t){return Xl.setFromAxisAngle(e,t),this.quaternion.premultiply(Xl),this}rotateX(e){return this.rotateOnAxis(nu,e)}rotateY(e){return this.rotateOnAxis(ru,e)}rotateZ(e){return this.rotateOnAxis(iu,e)}translateOnAxis(e,t){return Yl.copy(e).applyQuaternion(this.quaternion),this.position.add(Yl.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(nu,e)}translateY(e){return this.translateOnAxis(ru,e)}translateZ(e){return this.translateOnAxis(iu,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Zl.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Ql.copy(e):Ql.set(e,t,n);let r=this.parent;this.updateWorldMatrix(!0,!1),$l.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Zl.lookAt($l,Ql,this.up):Zl.lookAt(Ql,$l,this.up),this.quaternion.setFromRotationMatrix(Zl),r&&(Zl.extractRotation(r.matrixWorld),Xl.setFromRotationMatrix(Zl),this.quaternion.premultiply(Xl.invert()))}add(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return e===this||e&&e.isObject3D&&(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(au),su.child=e,this.dispatchEvent(su),su.child=null),this}remove(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.remove(arguments[e]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(ou),cu.child=e,this.dispatchEvent(cu),cu.child=null),this}removeFromParent(){return this.parent!==null&&this.parent.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Zl.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Zl.multiply(e.parent.matrixWorld)),e.applyMatrix4(Zl),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(au),this}getObjectById(e){return this.getObjectByProperty(`id`,e)}getObjectByName(e){return this.getObjectByProperty(`name`,e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n of this.children){let r=n.getObjectByProperty(e,t);if(r!==void 0)return r}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);for(let r of this.children)r.getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose($l,e,eu),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose($l,tu,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}traverse(e){e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,r=t.length;n<r;n++){let r=t[n];(r.matrixWorldAutoUpdate===!0||e===!0)&&r.updateMatrixWorld(e)}}updateWorldMatrix(e,t){let n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(n===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(n.matrixWorld,this.matrix)),t===!0){let e=this.children;for(let t=0,n=e.length;t<n;t++)e[t].matrixWorldAutoUpdate===!0&&e[t].updateWorldMatrix(!1,!0)}}clone(e){return new this.constructor().copy(this,e)}copy(t,n=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,t.onBeforeRender!==e.prototype.onBeforeRender&&(this.onBeforeRender=t.onBeforeRender),this.userData=JSON.parse(JSON.stringify(t.userData)),n===!0)for(let e of t.children)this.add(e.clone());return this}};lu.DEFAULT_UP=new $(0,1,0),lu.DEFAULT_MATRIX_AUTO_UPDATE=!0,lu.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0,lu.prototype.isObject3D=!0;var uu=class extends lu{constructor(){super(),this.type=`Group`}};uu.prototype.isGroup=!0;var du=class extends lu{constructor(){super(),this.type=`Scene`,this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ol,this.environmentIntensity=1,this.environmentRotation=new ol,this.overrideMaterial=null}copy(e,t){return super.copy(e,t),this.background=e.background,this.environment=e.environment,this.fog=e.fog,this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentRotation.copy(e.environmentRotation),this.environmentIntensity=e.environmentIntensity,this.overrideMaterial=e.overrideMaterial,this.matrixAutoUpdate=e.matrixAutoUpdate,this}};du.prototype.isScene=!0;var fu=35044,pu=new $,mu=new Hc,hu={getComponent(e,t){let n=this.array[this._idx(e,t)];return this.normalized?zc(n,this.array):n},setComponent(e,t,n){return this.array[this._idx(e,t)]=this.normalized?Bc(n,this.array):n,this},getX(e){return this.getComponent(e,0)},getY(e){return this.getComponent(e,1)},getZ(e){return this.getComponent(e,2)},getW(e){return this.getComponent(e,3)},setX(e,t){return this.setComponent(e,0,t)},setY(e,t){return this.setComponent(e,1,t)},setZ(e,t){return this.setComponent(e,2,t)},setW(e,t){return this.setComponent(e,3,t)},setXY(e,t,n){return this.setComponent(e,0,t),this.setComponent(e,1,n)},setXYZ(e,t,n,r){return this.setComponent(e,0,t),this.setComponent(e,1,n),this.setComponent(e,2,r)},setXYZW(e,t,n,r,i){return this.setComponent(e,0,t),this.setComponent(e,1,n),this.setComponent(e,2,r),this.setComponent(e,3,i)},applyMatrix3(e){if(this.itemSize===2)for(let t=0;t<this.count;t++)mu.fromBufferAttribute(this,t).applyMatrix3(e),this.setXY(t,mu.x,mu.y);else if(this.itemSize===3)for(let t=0;t<this.count;t++)pu.fromBufferAttribute(this,t).applyMatrix3(e),this.setXYZ(t,pu.x,pu.y,pu.z);return this},applyMatrix4(e){for(let t=0;t<this.count;t++)pu.fromBufferAttribute(this,t).applyMatrix4(e),this.setXYZ(t,pu.x,pu.y,pu.z);return this},applyNormalMatrix(e){for(let t=0;t<this.count;t++)pu.fromBufferAttribute(this,t).applyNormalMatrix(e),this.setXYZ(t,pu.x,pu.y,pu.z);return this},transformDirection(e){for(let t=0;t<this.count;t++)pu.fromBufferAttribute(this,t).transformDirection(e),this.setXYZ(t,pu.x,pu.y,pu.z);return this}},gu=class extends Kl{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw TypeError(`BufferAttribute: array should be a Typed Array.`);this.name=``,this.array=e,this.itemSize=t,this.count=e===void 0?0:e.length/t,this.normalized=n,this.usage=fu,this.updateRanges=[],this.gpuType=1015,this.version=0,this.onUploadCallback=_u}set needsUpdate(e){e===!0&&this.version++}_idx(e,t){return e*this.itemSize+t}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}onUpload(e){return this.onUploadCallback=e,this}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){let r=this.itemSize;e*=r,n*=t.itemSize;for(let i=0;i<r;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}set(e,t=0){return this.array.set(e,t),this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}dispose(){this.dispatchEvent({type:`dispose`})}};Object.assign(gu.prototype,hu),gu.prototype.isBufferAttribute=!0;function _u(){}var vu=class extends gu{constructor(e,t,n){super(new Uint16Array(e),t,n)}},yu=class extends gu{constructor(e,t,n){super(new Uint32Array(e),t,n)}},bu=class extends gu{constructor(e,t,n){super(new Float32Array(e),t,n)}},xu=class e extends gu{constructor(e,t,n,r=1){super(e,t,n),this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}clone(){return new e(this.array,this.itemSize).copy(this)}};xu.prototype.isInstancedBufferAttribute=!0;var Su=class extends Kl{constructor(e,t){super(),this.array=e,this.stride=t,this.count=e===void 0?0:e.length/t,this.usage=fu,this.updateRanges=[],this.version=0,this.uuid=yc(),this.onUploadCallback=_u}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}set(e,t=0){return this.array.set(e,t),this}onUpload(e){return this.onUploadCallback=e,this}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let r=0;r<this.stride;r++)this.array[e+r]=t.array[n+r];return this}clone(){return new this.constructor(new this.array.constructor(this.array),this.stride).copy(this)}dispose(){this.dispatchEvent({type:`dispose`})}};Su.prototype.isInterleavedBuffer=!0;var Cu=class e extends Su{constructor(e,t,n=1){super(e,t),this.meshPerAttribute=n}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}clone(){return new e(new this.array.constructor(this.array),this.stride,this.meshPerAttribute)}};Cu.prototype.isInstancedInterleavedBuffer=!0;var wu=class{constructor(e,t,n,r=!1){this.name=``,this.data=e,this.itemSize=t,this.offset=n,this.normalized=r}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}_idx(e,t){return e*this.data.stride+this.offset+t}clone(){let e=new this.array.constructor(this.count*this.itemSize);for(let t=0;t<this.count;t++)for(let n=0;n<this.itemSize;n++)e[t*this.itemSize+n]=this.array[this._idx(t,n)];return new gu(e,this.itemSize,this.normalized)}};Object.assign(wu.prototype,hu),wu.prototype.isInterleavedBufferAttribute=!0;var Tu=0,Eu=new tl,Du=new cl,Ou=new Uc,ku=new Sl,Au=new $,ju=new $;function Mu(e){for(let t=e.length-1;t>=0;--t)if(e[t]>=65535)return!0;return!1}var Nu=class e extends Kl{constructor(){super(),Object.defineProperty(this,"id",{value:Tu++}),this.uuid=yc(),this.name=``,this.type=`BufferGeometry`,this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return this.index=Array.isArray(e)?new(Mu(e)?yu:vu)(e,1):e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this.attributesVersion=(this.attributesVersion||0)+1,this}deleteAttribute(e){return delete this.attributes[e],this.attributesVersion=(this.attributesVersion||0)+1,this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;n!==void 0&&(n.applyNormalMatrix(Du.getNormalMatrix(e)),n.needsUpdate=!0);let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return this.applyMatrix4(Eu.makeRotationFromQuaternion(e))}rotateX(e){return this.applyMatrix4(Eu.makeRotationX(e))}rotateY(e){return this.applyMatrix4(Eu.makeRotationY(e))}rotateZ(e){return this.applyMatrix4(Eu.makeRotationZ(e))}translate(e,t,n){return this.applyMatrix4(Eu.makeTranslation(e,t,n))}scale(e,t,n){return this.applyMatrix4(Eu.makeScale(e,t,n))}lookAt(e){return Eu.lookAt(e,Au.set(0,0,0),new $(0,1,0)),Ou.setFromRotationMatrix(Eu),this.applyQuaternion(Ou)}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ju).negate(),this.translate(ju.x,ju.y,ju.z)}setFromPoints(e){let t=[];for(let n of e)t.push(n.x,n.y,n.z||0);return this.setAttribute(`position`,new bu(t,3))}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Sl);let e=this.attributes.position;if(e===void 0){this.boundingBox.makeEmpty();return}this.boundingBox.setFromBufferAttribute(e)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new El);let e=this.attributes.position;if(e===void 0){this.boundingSphere.makeEmpty();return}let t=this.boundingSphere.center;ku.setFromBufferAttribute(e).getCenter(t);let n=0;for(let r=0;r<e.count;r++)n=Math.max(n,t.distanceToSquared(Au.fromBufferAttribute(e,r)));this.boundingSphere.radius=Math.sqrt(n)}computeTangents(){let e=this.index,t=this.attributes.position,n=this.attributes.normal,r=this.attributes.uv;if(e===null||t===void 0||n===void 0||r===void 0){console.error(`BufferGeometry.computeTangents(): missing required attributes (index, position, normal or uv)`);return}let i=t.count;this.hasAttribute(`tangent`)===!1&&this.setAttribute(`tangent`,new gu(new Float32Array(4*i),4));let a=this.getAttribute(`tangent`),o=[],s=[];for(let e=0;e<i;e++)o[e]=new $,s[e]=new $;let c=new $,l=new $,u=new $,d=new Hc,f=new Hc,p=new Hc,m=new $,h=new $,g=(e,n,i)=>{c.fromBufferAttribute(t,e),l.fromBufferAttribute(t,n),u.fromBufferAttribute(t,i),d.fromBufferAttribute(r,e),f.fromBufferAttribute(r,n),p.fromBufferAttribute(r,i),l.sub(c),u.sub(c),f.sub(d),p.sub(d);let a=1/(f.x*p.y-p.x*f.y);isFinite(a)&&(m.copy(l).multiplyScalar(p.y).addScaledVector(u,-f.y).multiplyScalar(a),h.copy(u).multiplyScalar(f.x).addScaledVector(l,-p.x).multiplyScalar(a),o[e].add(m),o[n].add(m),o[i].add(m),s[e].add(h),s[n].add(h),s[i].add(h))},_=this.groups.length?this.groups:[{start:0,count:e.count}];for(let t of _)for(let n=t.start;n<t.start+t.count;n+=3)g(e.getX(n),e.getX(n+1),e.getX(n+2));let v=new $,y=new $,b=new $,x=new $,S=e=>{y.fromBufferAttribute(n,e),b.copy(y);let t=o[e];v.copy(t).sub(y.multiplyScalar(y.dot(t))).normalize(),x.crossVectors(b,t);let r=x.dot(s[e])<0?-1:1;a.setXYZW(e,v.x,v.y,v.z,r)};for(let t of _)for(let n=t.start;n<t.start+t.count;n++)S(e.getX(n))}computeVertexNormals(){let e=this.index,t=this.getAttribute(`position`);if(t===void 0)return;let n=this.getAttribute(`normal`);if(n===void 0||n.count!==t.count)n=new gu(new Float32Array(t.count*3),3),this.setAttribute(`normal`,n);else for(let e=0;e<n.count;e++)n.setXYZ(e,0,0,0);let r=new $,i=new $,a=new $,o=new $,s=new $,c=new $,l=new $,u=new $;if(e)for(let d=0,f=e.count;d<f;d+=3){let f=e.getX(d),p=e.getX(d+1),m=e.getX(d+2);r.fromBufferAttribute(t,f),i.fromBufferAttribute(t,p),a.fromBufferAttribute(t,m),o.subVectors(a,i),s.subVectors(r,i),o.cross(s),c.fromBufferAttribute(n,f),l.fromBufferAttribute(n,p),u.fromBufferAttribute(n,m),c.add(o),l.add(o),u.add(o),n.setXYZ(f,c.x,c.y,c.z),n.setXYZ(p,l.x,l.y,l.z),n.setXYZ(m,u.x,u.y,u.z)}else for(let e=0,c=t.count;e<c;e+=3)r.fromBufferAttribute(t,e),i.fromBufferAttribute(t,e+1),a.fromBufferAttribute(t,e+2),o.subVectors(a,i),s.subVectors(r,i),o.cross(s),n.setXYZ(e,o.x,o.y,o.z),n.setXYZ(e+1,o.x,o.y,o.z),n.setXYZ(e+2,o.x,o.y,o.z);this.normalizeNormals(),n.needsUpdate=!0}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Au.fromBufferAttribute(e,t).normalize(),e.setXYZ(t,Au.x,Au.y,Au.z)}toNonIndexed(){if(this.index===null)return console.warn(`BufferGeometry.toNonIndexed(): geometry is already non-indexed.`),this;let t=new e,n=this.index,r=e=>{let t=e.itemSize,r=new e.array.constructor(n.count*t);for(let i=0;i<n.count;i++){let a=n.getX(i);for(let n=0;n<t;n++)r[i*t+n]=e.array[e._idx(a,n)]}return new gu(r,t,e.normalized)};for(let e in this.attributes)t.setAttribute(e,r(this.attributes[e]));for(let e in this.morphAttributes)t.morphAttributes[e]=this.morphAttributes[e].map(r);t.morphTargetsRelative=this.morphTargetsRelative;for(let e of this.groups)t.addGroup(e.start,e.count,e.materialIndex);return t}clone(){return new e().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.name=e.name,e.index!==null&&this.setIndex(e.index.clone());for(let t in e.attributes)this.setAttribute(t,e.attributes[t].clone());for(let t in e.morphAttributes)this.morphAttributes[t]=e.morphAttributes[t].map(e=>e.clone());this.morphTargetsRelative=e.morphTargetsRelative;for(let t of e.groups)this.addGroup(t.start,t.count,t.materialIndex);return e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:`dispose`})}};Nu.prototype.isBufferGeometry=!0;var Pu=class e extends Nu{constructor(){super(),this.type=`InstancedBufferGeometry`,this.instanceCount=1/0}copy(e){return super.copy(e),this.instanceCount=e.instanceCount,this}clone(){return new e().copy(this)}};Pu.prototype.isInstancedBufferGeometry=!0;var Fu=class extends lu{constructor(e=new Nu,t=null){super(),this.type=`Mesh`,this.geometry=e,this.material=t,this.count=1}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this.count=e.count,this}};Fu.prototype.isMesh=!0;var Iu=new tl,Lu=new Sl,Ru=new El,zu=class e extends Fu{constructor(e,t,n){super(e,t),this.type=`InstancedMesh`,this.instanceMatrix=new xu(new Float32Array(n*16),16),this.instanceColor=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let e=0;e<n;e++)this.setMatrixAt(e,Iu.identity())}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}getColorAt(e,t){return t.fromArray(this.instanceColor.array,e*3)}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new xu(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}computeBoundingBox(){let e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Sl),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let t=0;t<this.count;t++)this.getMatrixAt(t,Iu),Lu.copy(e.boundingBox).applyMatrix4(Iu),this.boundingBox.union(Lu)}computeBoundingSphere(){let e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new El),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let t=0;t<this.count;t++)this.getMatrixAt(t,Iu),Ru.copy(e.boundingSphere).applyMatrix4(Iu),this.boundingSphere.union(Ru)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}clone(t){return new e(this.geometry,this.material,this.count).copy(this,t)}dispose(){this.dispatchEvent({type:`dispose`})}};zu.prototype.isInstancedMesh=!0;var Bu=new $,Vu=new Hc,Hu=new Hc,Uu=class extends lu{constructor(){super(),this.type=`Camera`,this.matrixWorldInverse=new tl,this.projectionMatrix=new tl,this.projectionMatrixInverse=new tl,this.coordinateSystem=qc,this.reversedDepth=!0}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this.reversedDepth=e.reversedDepth,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}};Uu.prototype.isCamera=!0;function Wu(e,t,n,r,i,a,o){e.view===null&&(e.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1});let s=e.view;s.enabled=!0,s.fullWidth=t,s.fullHeight=n,s.offsetX=r,s.offsetY=i,s.width=a,s.height=o,e.updateProjectionMatrix()}var Gu=class extends Uu{constructor(e=50,t=1,n=.1,r=2e3){super(),this.type=`PerspectiveCamera`,this.fov=e,this.zoom=1,this.near=n,this.far=r,this.infiniteFar=!1,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.infiniteFar=e.infiniteFar,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=_c*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){return .5*this.getFilmHeight()/Math.tan(gc*.5*this.fov)}getEffectiveFOV(){return _c*2*Math.atan(Math.tan(gc*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Bu.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Bu.x,Bu.y).multiplyScalar(-e/Bu.z),Bu.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Bu.x,Bu.y).multiplyScalar(-e/Bu.z)}getViewSize(e,t){return this.getViewBounds(e,Vu,Hu),t.subVectors(Hu,Vu)}setViewOffset(e,t,n,r,i,a){this.aspect=e/t,Wu(this,e,t,n,r,i,a)}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(gc*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,i=-.5*r,a=this.view;if(a!==null&&a.enabled){let e=a.fullWidth,o=a.fullHeight;i+=a.offsetX*r/e,t-=a.offsetY*n/o,r*=a.width/e,n*=a.height/o}let o=this.filmOffset;o!==0&&(i+=e*o/this.getFilmWidth());let s=this.infiniteFar?1/0:this.far;this.projectionMatrix.makePerspective(i,i+r,t,t-n,e,s,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}};Gu.prototype.isPerspectiveCamera=!0;var Ku=class extends Uu{constructor(e=-1,t=1,n=1,r=-1,i=.1,a=2e3){super(),this.type=`OrthographicCamera`,this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=i,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,i,a){Wu(this,e,t,n,r,i,a)}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2,i=n-e,a=n+e,o=r+t,s=r-t,c=this.view;if(c!==null&&c.enabled){let e=(this.right-this.left)/c.fullWidth/this.zoom,t=(this.top-this.bottom)/c.fullHeight/this.zoom;i+=e*c.offsetX,a=i+e*c.width,o-=t*c.offsetY,s=o-t*c.height}this.projectionMatrix.makeOrthographic(i,a,o,s,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}};Ku.prototype.isOrthographicCamera=!0;var qu=(1+Math.sqrt(5))/2;-qu,-qu,-qu,-qu,-qu,-qu,new $;var Ju={terrainSize:2048,terrainRes:2048,beach:{xMin:-150,xMax:170},pier:{x:55,zStart:-64,zEnd:40,deckHeight:2.3,width:2.6,headWidth:14,headDepth:7},boatDock:{position:new $(64.5,0,36.5),heading:0},village:{center:new $(40,0,-118),radius:95},reef:{center:new $(-78,0,58),radius:58},spawn:{position:new $(18,0,-60),yaw:Math.PI},start:{position:new $(53.6,0,-77),yaw:Math.PI},swellDir:new Hc(-.12,-1).normalize()};new vl,new $,new Uc,new ol,new $;var Yu={gelcoat:15855334,lining:15328988,deck:14867919,antifouling:8002837,stainless:13685718};Yu.stainless;var Xu={wallT:.045,wsBottomY:1.48,wsTopY:2.24,roofUnderY:2.31,roofZ0:-.95,roofZ1:1.34,winBottom:1.56,winTop:2.12,dash:{zFace:.98,yKnee:1.08,zTop:1.16,yTop:1.4,zBack:1.41,halfW:1.1},helmX:-.55,seatZ:.22};Yu.stainless;var Zu={x:Xu.helmX,z:Xu.seatZ},Qu=1.62,$u=Qu*.1,ed=.3,td=1.75,nd=1.35,rd=1.1,id=new $,ad=new $,od=new $,sd=new $,cd=new Uc,ld=new ol(0,0,0,`YXZ`),ud=new $(0,1,0),dd=new Uc,fd=new Uc,pd=new Uc,md=new $,hd=.24,gd=.36,_d=.75,vd=class{constructor({camera:e,input:t,terrain:n,colliders:r,query:i,boat:a,reef:o=null,audio:s=null,world:c=Ju}){this.camera=e,this.input=t,this.terrain=n,this.colliders=r,this.query=i,this.boat=a,this.reef=o,this.audio=s,this.mode=`walk`,this.camMode=`third`;let l=c.start||c.spawn;this.position=new $().copy(l.position),this.position.y=Math.max(n.heightAt(this.position.x,this.position.z),r?r.groundHeightAt(this.position.x,this.position.z,50):-1/0),this.velocity=new $,this.yaw=l.yaw,this.pitch=-.05,this.grounded=!1,this.bob=0,this.stepDist=0,this.waterH=0,this.waterMean=null,this.wade=0,this.camOff=0,this.camOffV=0,this._camY=null,this.floating=!0,this.slot=i.allocate(`player`,1),this.prompt=null,this.surface=`sand`,this.orbitYaw=0,this.orbitPitch=.22,this.orbitDist=13,this.helmYaw=0,this.helmPitch=-.05,this.camPos=new $,this.camInit=!1,this.wasUnder=!1,this.deckPos=new $,this.deckVel=new $,this.deckYaw=0,this.deckGrounded=!0,this._ashore=null,this._ashoreT=0,this.busy=!1}getViewDir(e){return e.set(0,0,-1).applyQuaternion(this.camera.quaternion)}waterHeight(){let e=this.query;if(!e.cpuValid)return 0;let t=e.cpu[this.slot*4];return Number.isFinite(t)?t:this.waterH||0}groundAt(e,t,n){let r=this.terrain.heightAt(e,t),i=this.colliders.groundHeightAt(e,t,n);return i>r&&(r=i),this.reef&&this.reef.floorHeightAt&&(r=Math.max(r,this.reef.floorHeightAt(e,t))),r}nearBoat(){if(!this.boat)return!1;let e=this.boat.toWorld(this.boat.model.boardPoint,id),t=Math.hypot(e.x-this.position.x,e.z-this.position.z),n=Math.abs(e.y-this.position.y);return t<4.2&&n<3.2}update(e){let t=this.input;if(this.query.setPoint(this.slot,this.position.x,this.position.z),this.waterH=this.waterHeight(),this.waterMean=this.waterMean===null?this.waterH:this.waterMean+(this.waterH-this.waterMean)*(1-Math.exp(-e/4)),this.prompt=null,this.mode===`boat`){this.updateBoat(e);return}if(this.mode===`deck`){this.updateDeck(e);return}let n=t.consumeLook();if(this.yaw-=n.x*.0022,this.pitch=Vc.clamp(this.pitch-n.y*.0022,-1.5,1.5),this.nearBoat()&&!this.busy&&(this.prompt={key:`E`,text:`Board boat`},t.hit(`KeyE`))){this.boardBoat();return}let r=this.mode;this.mode===`walk`?this.updateWalk(e):this.updateSwim(e);let i=this.position.clone();this.mode===`walk`?i.y+=Qu+Math.sin(this.bob)*.035*(1-.6*this.wade):i.y+=$u,this._camY===null||this.camera.position.y!==this._camY?(this.camOff=0,this.camOffV=0):this.mode!==r&&(this.camOff=this._camY-i.y);let a=Math.exp(-6*e),o=(this.camOffV+6*this.camOff)*e;this.camOff=(this.camOff+o)*a,this.camOffV=(this.camOffV-6*o)*a,i.y+=this.camOff,this.camera.position.copy(i),this._camY=this.camera.position.y,this.camera.quaternion.setFromEuler(ld.set(this.pitch,this.yaw,0))}updateWalk(e){let t=this.input;od.set(-Math.sin(this.yaw),0,-Math.cos(this.yaw)),sd.set(-od.z,0,od.x);let n=new $;t.down(`KeyW`)&&n.add(od),t.down(`KeyS`)&&n.sub(od),t.down(`KeyD`)&&n.add(sd),t.down(`KeyA`)&&n.sub(sd),n.lengthSq()>0&&n.normalize();let r=this.waterH-this.position.y,i=Vc.clamp(r/1.2,0,1);this.wade=i;let a=t.down(`ShiftLeft`)||t.down(`ShiftRight`),o=(a?6.2:3)*Vc.lerp(1,.42,i),s=this.grounded?14:2.5,c=1-Math.exp(-s*e);this.velocity.x+=(n.x*o-this.velocity.x)*c,this.velocity.z+=(n.z*o-this.velocity.z)*c,this.grounded&&t.hit(`Space`)&&r<.9&&(this.velocity.y=4.6,this.grounded=!1),this.velocity.y-=9.81*e,r>0&&this.velocity.multiplyScalar(Math.exp(-e*r*.8));let l=this.position,u=l.clone();l.addScaledVector(this.velocity,e),this.colliders.resolveCapsule(l,ed,td,.4);let d=this.groundAt(l.x,l.z,l.y+.45);l.y<=d?(l.y=d,this.velocity.y<0&&(this.velocity.y=0),this.grounded=!0):this.grounded=l.y-d<.06;let f=Math.hypot(l.x-u.x,l.z-u.z);if(this.grounded){this.bob+=f*2.4,this.stepDist+=f;let e=a?.9:.62;this.stepDist>e&&(this.stepDist=0,this.surface=this.surfaceType(r),this.audio&&this.audio.footstep(this.surface))}if(this.waterMean-l.y>nd){let e=this.grounded;this.mode=`swim`,e&&(l.y=Math.max(l.y,this.waterH-$u+.1)),this.velocity.y=e?0:Math.max(this.velocity.y*.3,-2.5),this.audio&&this.audio.splash(e?.2:.5,l)}}surfaceType(e){let t=this.position;if(e>.12)return`water`;if(this.colliders.groundHeightAt(t.x,t.z,t.y+.1)>this.terrain.heightAt(t.x,t.z)+.05)return`wood`;let n=this.terrain.heightAt(t.x,t.z);return n<.6?`wetsand`:n>3.6?`grass`:`sand`}updateSwim(e){let t=this.input,n=this.position,r=this.waterH;od.set(0,0,-1).applyEuler(ld.set(this.pitch,this.yaw,0)),sd.set(-Math.cos(this.yaw),0,Math.sin(this.yaw)).negate();let i=new $;t.down(`KeyW`)&&i.add(od),t.down(`KeyS`)&&i.sub(od),t.down(`KeyD`)&&i.add(sd),t.down(`KeyA`)&&i.sub(sd),t.down(`Space`)&&(i.y+=1),(t.down(`KeyC`)||t.down(`ControlLeft`))&&--i.y,i.lengthSq()>0&&i.normalize(),this.floating&&n.y>r-.45&&i.y>-.25&&!t.down(`KeyC`)&&(i.y=Math.max(i.y,0));let a=t.down(`ShiftLeft`)||t.down(`ShiftRight`)?2.5:1.5,o=1-Math.exp(-e*3);this.velocity.lerp(i.multiplyScalar(a),o);let s=r-$u+.1;t.down(`KeyC`)||t.down(`KeyW`)&&this.pitch<-.35||i.y<-.1?this.floating=!1:n.y>s-.15&&(this.floating=!0),this.floating&&(n.y+=(s-n.y)*(1-Math.exp(-e*5)),this.velocity.y>0&&(this.velocity.y*=.5)),n.addScaledVector(this.velocity,e),n.y=Math.min(n.y,r+.05),this.colliders.resolveCapsule(n,ed,1,0);let c=this.groundAt(n.x,n.z,n.y+.3);n.y<c+.25&&(n.y=c+.25),this.stepDist+=this.velocity.length()*e,this.stepDist>1.3&&(this.stepDist=0,this.audio&&this.audio.swimStroke());let l=this.camera.position.y<r-.05;if(l!==this.wasUnder&&this.audio&&(l?this.audio.submerge():this.audio.emerge()),this.wasUnder=l,this.waterMean-c<rd&&(this.mode=`walk`,n.y=c,this.velocity.set(this.velocity.x,0,this.velocity.z)),this.colliders.boxes){for(let r of this.colliders.boxes)if(r.tag===`ladder`&&Math.hypot(r.center.x-n.x,r.center.z-n.z)<1.1){if(this.prompt={key:`Space`,text:`Climb ladder`},t.down(`Space`)||t.down(`KeyW`)){let t=this.colliders.groundHeightAt(r.center.x,r.center.z,10);if(t>n.y&&(n.y+=e*1.6,n.y>t-1)){let e=Ju.pier.deckHeight;n.set(r.center.x-Math.sign(r.center.x-Ju.pier.x)*1.2,e,r.center.z),this.mode=`walk`,this.velocity.set(0,0,0)}}break}}}boardBoat(){let e=this.boat;this.mode=`deck`,this.deckPos.copy(e.model.boardPoint),this.deckVel.set(0,0,0),this.deckYaw=this.yaw-(e.getYaw()+Math.PI),this.deckGrounded=!0,this._ashore=null,this._ashoreT=0,this.velocity.set(0,0,0),this._camY=null,this.deckToWorld()}takeHelm(){this.mode=`boat`,this.boat.driven=!0,this.boat.moored=!1,this.helmYaw=0,this.helmPitch=-.05,this.orbitYaw=this.boat.getYaw()+Math.PI,this.camInit=!1,this.audio&&this.audio.engineStart()}leaveHelm(){let e=this.boat;e.driven=!1,e.throttle=0,this.mode=`deck`,this.deckPos.set(Zu.x+.45,e.model.lines.deckY,Zu.z-.1),this.deckVel.set(0,0,0),this.deckYaw=this.helmYaw,this.pitch=this.helmPitch,this.deckGrounded=!0,this._camY=null,this.audio&&this.audio.engineStop(),this.deckToWorld()}enterBoat(){this.boardBoat(),this.takeHelm()}exitBoat(e=null,t=0){let n=this.boat,r=n.driven;n.driven=!1,n.throttle=0;let i=t?null:this.ashoreTarget(),a=Ju.boatDock.position;if(n.position.distanceTo(a)<14&&n.speed<1.5&&(n.moored=!0,n.mooring.anchor.set(n.position.x,0,n.position.z),n.mooring.heading=n.getYaw()),e&&(i=e),i)this.position.set(i.out.x,i.g,i.out.z),this.mode=`walk`;else{let e=n.toWorld(new $(2.2*(t||1),0,0),new $);this.waterH=this.waterMean=n.position.y,this.position.set(e.x,n.position.y-.2,e.z),this.mode=`swim`,this.audio&&this.audio.splash(.8,this.position)}this.velocity.set(0,0,0),this.yaw=n.getYaw()+Math.PI,this._camY=null,this.audio&&r&&this.audio.engineStop()}ashoreTarget(){let e=this.boat,t=this.query.cpuValid?this.query.cpu[0]:0,n=ad.set(1,0,0).applyQuaternion(e.quaternion).setY(0).normalize(),r=n.x,i=n.z,a=null,o=1/0;for(let n of e.model.exitPoints){let s=e.toWorld(n,new $),c=Math.sign(n.x)||1;for(let e of[.9,1.4,2]){let l=new $(s.x+r*c*e,s.y,s.z+i*c*e),u=this.groundAt(l.x,l.z,s.y+2.5),d=u-s.y;if(d>1.7||d<-1.2||u<t-.3)continue;let f=Math.abs(d)+e*.2;f<o&&(o=f,a={out:l,g:u,ep:n})}}return a}deckBase(e){let t=this.boat;return dd.setFromAxisAngle(ud,t.getYaw()+Math.PI),fd.copy(t.quaternion).multiply(pd.setFromAxisAngle(ud,Math.PI)),e.slerpQuaternions(fd,dd,.55)}deckToWorld(){let e=this.boat;e.toWorld(this.deckPos,this.position),this.yaw=e.getYaw()+Math.PI+this.deckYaw}deckGroundAt(e,t,n){let r=this.boat.model.lines.deckY;for(let i of this.boat.model.colliders){if(!i.walkable||Math.abs(e-i.center.x)>i.half.x||Math.abs(t-i.center.z)>i.half.z)continue;let a=i.center.y+i.half.y;a<=n&&a>r&&(r=a)}return r}updateDeck(e){let t=this.input,n=this.boat,r=n.model.lines,i=t.consumeLook();this.deckYaw-=i.x*.0022,this.pitch=Vc.clamp(this.pitch-i.y*.0022,-1.5,1.5);let a=Math.sin(this.deckYaw),o=Math.cos(this.deckYaw);od.set(a,0,o),sd.set(-o,0,a),md.set(0,0,0),t.down(`KeyW`)&&md.add(od),t.down(`KeyS`)&&md.sub(od),t.down(`KeyD`)&&md.add(sd),t.down(`KeyA`)&&md.sub(sd),md.lengthSq()>0&&md.normalize();let s=t.down(`ShiftLeft`)?2.6:1.6,c=1-Math.exp(-12*e),l=this.deckVel;l.x+=(md.x*s-l.x)*c,l.z+=(md.z*s-l.z)*c,this.deckGrounded&&t.hit(`Space`)&&(l.y=3.2,this.deckGrounded=!1),l.y-=9.81*e;let u=this.deckPos,d=u.x,f=u.z;u.addScaledVector(l,e);for(let e=0;e<2;e++)for(let e of n.model.colliders){if(!e.solid)continue;let t=e.center.y+e.half.y,n=e.center.y-e.half.y;if(t<=u.y+gd||n>=u.y+td)continue;let r=e.half.x+hd,i=e.half.z+hd,a=u.x-e.center.x,o=u.z-e.center.z;if(Math.abs(a)>=r||Math.abs(o)>=i)continue;let s=r-Math.abs(a),c=i-Math.abs(o);s<c?(u.x+=Math.sign(a||d-e.center.x||1)*s,l.x=0):(u.z+=Math.sign(o||f-e.center.z||1)*c,l.z=0)}u.z=Vc.clamp(u.z,r.zAft+r.shell+hd,4);let p=Math.max(.15,r.halfBreadth(r.tAtSheerZ(u.z),Math.max(u.y,r.deckY))-r.shell-hd);u.x=Vc.clamp(u.x,-p,p);let m=this.deckGroundAt(u.x,u.z,u.y+gd);u.y<=m?(u.y=m,l.y<0&&(l.y=0),this.deckGrounded=!0):this.deckGrounded=u.y-m<.04;let h=Math.hypot(u.x-d,u.z-f);this.deckGrounded&&(this.bob+=h*2.4,this.stepDist+=h,this.stepDist>.6&&(this.stepDist=0,this.audio&&this.audio.footstep(`wood`))),this.deckToWorld();let g=Zu.x,_=Zu.z,v=Math.hypot(u.x-g,u.z-_)<_d&&!this.busy;if(this._ashoreT-=e,this._ashoreT<=0&&(this._ashoreT=.25,this._ashore=n.speed<2.5?this.ashoreTarget():null),v){if(this.prompt={key:`E`,text:`Take the helm`},t.hit(`KeyE`)){this.takeHelm();return}}else if(!this.busy){let e=this._ashore&&this._ashore.ep,r=n.model.exitPoints.some(e=>Math.hypot(u.x-e.x,u.z-e.z)<1.3);if(e&&Math.hypot(u.x-e.x,u.z-e.z)<1.3){if(this.prompt={key:`E`,text:`Step ashore`},t.hit(`KeyE`)){this.exitBoat(this._ashore);return}}else if(r&&(this.prompt={key:`E`,text:`Jump overboard`},t.hit(`KeyE`))){this.exitBoat(null,Math.sign(u.x)||1);return}}let y=id.set(u.x,u.y+Qu+Math.sin(this.bob)*.02,u.z);n.toWorld(y,this.camera.position),this._camY=this.camera.position.y,this.deckBase(cd),this.camera.quaternion.copy(cd).multiply(dd.setFromEuler(ld.set(this.pitch,this.deckYaw,0)))}updateBoat(e){let t=this.input,n=this.boat,r=t.consumeLook(),i=t.consumeWheel();if(t.hit(`KeyV`)&&(this.camMode=this.camMode===`first`?`third`:`first`),t.hit(`KeyE`)){this.leaveHelm();return}let a=0;t.down(`KeyW`)&&(a=t.down(`ShiftLeft`)?1:.7),t.down(`KeyS`)&&(a=-.6);let o=0;if(t.down(`KeyA`)&&(o+=1),t.down(`KeyD`)&&--o,n.setInput(a,o,e),this.prompt={key:`E`,text:`Leave helm   ·   V  camera`},n.toWorld(n.model.helmEye,this.position),this.position.y-=Qu,this.camMode===`first`){this.helmYaw=Vc.clamp(this.helmYaw-r.x*.0022,-2.2,2.2),this.helmPitch=Vc.clamp(this.helmPitch-r.y*.0022,-1.2,1);let e=n.toWorld(n.model.helmEye,new $);this.camera.position.copy(e);let t=n.quaternion,i=new Uc().setFromAxisAngle(new $(0,1,0),n.getYaw()+Math.PI),a=new Uc().slerpQuaternions(t.clone().multiply(new Uc().setFromAxisAngle(new $(0,1,0),Math.PI)),i,.55),o=new Uc().setFromEuler(ld.set(this.helmPitch,this.helmYaw,0));this.camera.quaternion.copy(a).multiply(o)}else{if(this.orbitYaw-=r.x*.003,this.orbitPitch=Vc.clamp(this.orbitPitch+r.y*.003,-.05,1.2),this.orbitDist=Vc.clamp(this.orbitDist*(1+i*.08),6,40),n.speed>2&&Math.abs(r.x)<.5){let t=n.getYaw()+Math.PI-this.orbitYaw;t=Math.atan2(Math.sin(t),Math.cos(t)),this.orbitYaw+=t*(1-Math.exp(-e*.8))}let t=n.toWorld(new $(0,1.4,0),new $),a=new $(Math.sin(this.orbitYaw)*Math.cos(this.orbitPitch),Math.sin(this.orbitPitch),Math.cos(this.orbitYaw)*Math.cos(this.orbitPitch)).multiplyScalar(this.orbitDist),o=t.clone().add(a);o.y=Math.max(o.y,this.waterH+.7),this.camInit||(this.camPos.copy(o),this.camInit=!0),this.camPos.lerp(o,1-Math.exp(-e*6)),this.camera.position.copy(this.camPos),this.camera.lookAt(t)}}},yd=class{constructor(e,t,n){this.camera=e,this.dom=t,this.input=n,this.yaw=0,this.pitch=0,this.speed=8,this.enabled=!0,this.velocity=new $,this._fwd=new $,this._right=new $}setPose(e,t,n){this.camera.position.copy(e),this.yaw=t,this.pitch=n,this.apply()}apply(){this.camera.rotation.set(this.pitch,this.yaw,0,`YXZ`)}update(e){if(!this.enabled)return;let t=this.input,n=t.consumeLook();this.yaw-=n.x*.0022,this.pitch-=n.y*.0022,this.pitch=Math.max(-1.55,Math.min(1.55,this.pitch)),this.apply();let r=t.down(`ShiftLeft`)||t.down(`ShiftRight`),i=this.speed*(r?6:1);this.camera.getWorldDirection(this._fwd),this._right.crossVectors(this._fwd,this.camera.up).normalize();let a=new $;t.down(`KeyW`)&&a.add(this._fwd),t.down(`KeyS`)&&a.sub(this._fwd),t.down(`KeyD`)&&a.add(this._right),t.down(`KeyA`)&&a.sub(this._right),(t.down(`KeyE`)||t.down(`Space`))&&(a.y+=1),(t.down(`KeyQ`)||t.down(`KeyC`))&&--a.y,a.lengthSq()>0&&a.normalize().multiplyScalar(i),this.velocity.lerp(a,1-Math.exp(-e*8)),this.camera.position.addScaledVector(this.velocity,e)}},bd=class{constructor(){this.boxes=[],this.cylinders=[],this.staticGroups=[],this._v=new $}addBox(e,t,n=0,{walkable:r=!1,solid:i=!0,tag:a=``}={}){let o={center:e.clone(),half:t.clone(),rotY:n,cos:Math.cos(n),sin:Math.sin(n),walkable:r,solid:i,tag:a,top:e.y+t.y,bottom:e.y-t.y,radius:Math.hypot(t.x,t.z)};return this.boxes.push(o),o}addCylinder(e,t,n,r,i,{tag:a=``}={}){let o={x:e,z:t,radius:n,yMin:r,yMax:i,tag:a};return this.cylinders.push(o),o}_toLocal(e,t,n){let r=t-e.center.x,i=n-e.center.z;return[r*e.cos-i*e.sin,r*e.sin+i*e.cos]}_toWorldDir(e,t,n){return[t*e.cos+n*e.sin,-t*e.sin+n*e.cos]}groundHeightAt(e,t,n,r=0){let i=-1/0;for(let a of this.boxes){if(!a.walkable||a.top>n||Math.abs(e-a.center.x)>a.radius+r+.01||Math.abs(t-a.center.z)>a.radius+r+.01)continue;let[o,s]=this._toLocal(a,e,t);Math.abs(o)<=a.half.x+r&&Math.abs(s)<=a.half.z+r&&(i=Math.max(i,a.top))}for(let a of this.staticGroups)a.enabled&&(i=Math.max(i,a.groundHeightAt(e,t,n,r)));return i}resolveCapsule(e,t,n,r=.35){let i=!1;for(let a of this.boxes){if(!a.solid||e.y+n<a.bottom||e.y+r>a.top||Math.abs(e.x-a.center.x)>a.radius+t||Math.abs(e.z-a.center.z)>a.radius+t)continue;let[o,s]=this._toLocal(a,e.x,e.z),c=Math.max(-a.half.x,Math.min(a.half.x,o)),l=Math.max(-a.half.z,Math.min(a.half.z,s)),u=o-c,d=s-l,f=u*u+d*d;if(f>=t*t)continue;let p,m,h;if(f>1e-8){let e=Math.sqrt(f);p=u/e,m=d/e,h=t-e}else{let e=a.half.x-Math.abs(o),n=a.half.z-Math.abs(s);e<n?(p=Math.sign(o)||1,m=0,h=e+t):(p=0,m=Math.sign(s)||1,h=n+t)}let[g,_]=this._toWorldDir(a,p,m);e.x+=g*h,e.z+=_*h,i=!0}for(let a of this.cylinders){if(e.y+n<a.yMin||e.y+r>a.yMax)continue;let o=e.x-a.x,s=e.z-a.z,c=a.radius+t,l=o*o+s*s;if(l>=c*c)continue;let u=Math.sqrt(l)||1e-4;e.x=a.x+o/u*c,e.z=a.z+s/u*c,i=!0}for(let a of this.staticGroups)a.enabled&&(i=a.resolveCapsule(e,t,n,r)||i);return i}raycast(e,t,n){let r=n;for(let n of this.boxes){if(!n.solid)continue;let i=e.x-n.center.x,a=e.z-n.center.z,o=e.y-n.center.y,s=i*n.cos-a*n.sin,c=i*n.sin+a*n.cos,l=t.x*n.cos-t.z*n.sin,u=t.x*n.sin+t.z*n.cos,d=0,f=r,p=(e,t,n)=>{if(Math.abs(t)<1e-8)return Math.abs(e)<=n;let r=(-n-e)/t,i=(n-e)/t;if(r>i){let e=r;r=i,i=e}return d=Math.max(d,r),f=Math.min(f,i),d<=f};p(s,l,n.half.x)&&p(o,t.y,n.half.y)&&p(c,u,n.half.z)&&(r=Math.min(r,d))}for(let n of this.staticGroups)n.enabled&&(r=Math.min(r,n.raycast(e,t,r)));return r}};function xd(e,t){let n=new bd,r=e.buildings.map(e=>({id:e.id,polygons:[{outer:e.outer}],bottom:e.base,top:e.base+e.eaves+e.roof,building:!0}));for(let t of e.features)[`quay`,`pier`,`catwalk`].includes(t.kind)&&r.push({id:t.id,polygons:t.polygons,bottom:t.kind===`quay`?-1.2:1.48,top:1.8,building:!1});return n.staticGroups.push({enabled:!0,groundHeightAt(e,n,r){return t.surfaceAt(e,n,r)?.height??-1/0},resolveCapsule(e,n,i,a){let o=!1;for(let s of r)if(!(s.building&&(e.y+i<s.bottom||e.y+a>s.top)))for(let r of s.polygons){let c=tc(r,e.x,e.z),l=nc(r.outer,e.x,e.z);if(!c&&l.distance>=n)continue;if(!s.building){let n=t.surfaceAt(c?e.x:l.x,c?e.z:l.z)?.height??s.top,r=s.id.startsWith(`Q-`)?-1.2:n-.32;if(e.y+i<r||e.y+a>n)continue}let u=c?l.x-e.x:e.x-l.x,d=c?l.z-e.z:e.z-l.z,f=Math.hypot(u,d);f<1e-7&&(u=l.dz,d=-l.dx,f=Math.hypot(u,d)||1);let p=c?l.distance+n:n-l.distance;e.x+=u/f*p,e.z+=d/f*p,o=!0}return o},raycast(){return 1/0}}),n}var Sd=class{constructor(e,t,n,r){this.engine=e,this.data=t,this.terrain=n,this.hydro=r,this.input=new hc(e.canvas),this.colliders=xd(t,n);let i={cpuValid:!0,cpu:new Float32Array(4),allocate:()=>0,setPoint:(e,t,n)=>{i.cpu[0]=r.sample(t,n).height}},[a,o]=t.inspection.spawn;this.player=new vd({camera:e.camera,input:this.input,terrain:n,colliders:this.colliders,query:i,boat:null,world:{start:{position:{x:a,y:1.8,z:o},yaw:-.7}}}),this.fly=new yd(e.camera,e.canvas,this.input),this.fly.enabled=!1,this.fly.speed=18,this.mode=`walk`,this.touchKeys=new Set,this.touches=new Map,e.canvas.addEventListener(`click`,()=>{this.touches.size||this.input.requestLock()}),e.canvas.addEventListener(`pointerdown`,e=>this.touchStart(e)),e.canvas.addEventListener(`pointermove`,e=>this.touchMove(e));for(let t of[`pointerup`,`pointercancel`,`lostpointercapture`])e.canvas.addEventListener(t,e=>this.touchEnd(e))}touchStart(e){e.pointerType!==`mouse`&&(this.engine.canvas.setPointerCapture(e.pointerId),this.touches.set(e.pointerId,{x:e.clientX,y:e.clientY,startX:e.clientX,startY:e.clientY,move:e.clientX<innerWidth*.45}),e.preventDefault())}touchMove(e){let t=this.touches.get(e.pointerId);if(t){if(t.move){for(let e of this.touchKeys)this.input.keys.delete(e);this.touchKeys.clear();let n=e.clientX-t.startX,r=e.clientY-t.startY;for(let[e,t]of[[n>16,`KeyD`],[n<-16,`KeyA`],[r>16,`KeyS`],[r<-16,`KeyW`]])e&&(this.input.keys.add(t),this.touchKeys.add(t))}else this.input.look.x+=e.clientX-t.x,this.input.look.y+=e.clientY-t.y;t.x=e.clientX,t.y=e.clientY,e.preventDefault()}}touchEnd(e){if(this.touches.get(e.pointerId)?.move){for(let e of this.touchKeys)this.input.keys.delete(e);this.touchKeys.clear()}this.touches.delete(e.pointerId)}setMode(e){if(e!==this.mode){if(e===`fly`)this.fly.setPose(this.engine.camera.position,this.player.yaw,this.player.pitch),this.fly.enabled=!0;else{let e=this.engine.camera.position;this.player.position.copy(e),this.player.position.y=e.y-1.62,this.player.yaw=this.fly.yaw,this.player.pitch=this.fly.pitch,this.player.velocity.set(0,0,0),this.player.mode=`walk`,this.player._camY=null}this.mode=e}}spawn(){let[e,t]=this.data.inspection.spawn;this.player.position.set(e,this.terrain.surfaceAt(e,t)?.height??1.8,t),this.player.velocity.set(0,0,0),this.player.mode=`walk`,this.player.yaw=-.7,this.player.pitch=-.05,this.player._camY=null,this.mode=`walk`,this.player.update(0)}update(e){this.mode===`walk`?this.player.update(e):this.mode===`fly`&&this.fly.update(e),this.player.position.y<-40&&this.spawn(),this.input.endFrame()}},Cd={name:`CopyShader`,uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`},wd=class{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error(`THREE.Pass: .render() must be implemented in derived pass.`)}dispose(){}},Td=new oi(-1,1,1,-1,0,1),Ed=new class extends bn{constructor(){super(),this.setAttribute(`position`,new cn([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute(`uv`,new cn([0,2,0,0,2,0],2))}},Dd=class{constructor(e){this._mesh=new Wn(Ed,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,Td)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}},Od=class extends wd{constructor(e,t=`tDiffuse`){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof Sr?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=yr.clone(e.uniforms),this.material=new Sr({name:e.name===void 0?`unspecified`:e.name,defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new Dd(this.material)}render(e,t,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}},kd=class extends wd{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,n){let r=e.getContext(),i=e.state;i.buffers.color.setMask(!1),i.buffers.depth.setMask(!1),i.buffers.color.setLocked(!0),i.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),i.buffers.stencil.setTest(!0),i.buffers.stencil.setOp(r.REPLACE,r.REPLACE,r.REPLACE),i.buffers.stencil.setFunc(r.ALWAYS,a,4294967295),i.buffers.stencil.setClear(o),i.buffers.stencil.setLocked(!0),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),i.buffers.color.setLocked(!1),i.buffers.depth.setLocked(!1),i.buffers.color.setMask(!0),i.buffers.depth.setMask(!0),i.buffers.stencil.setLocked(!1),i.buffers.stencil.setFunc(r.EQUAL,1,4294967295),i.buffers.stencil.setOp(r.KEEP,r.KEEP,r.KEEP),i.buffers.stencil.setLocked(!0)}},Ad=class extends wd{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}},jd=class{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){let n=e.getSize(new H);this._width=n.width,this._height=n.height,t=new ze(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:y}),t.texture.name=`EffectComposer.rt1`}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name=`EffectComposer.rt2`,this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new Od(Cd),this.copyPass.material.blending=0,this.timer=new pi}swapBuffers(){let e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){let t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){this.timer.update(),e===void 0&&(e=this.timer.getDelta());let t=this.renderer.getRenderTarget(),n=!1;for(let t=0,r=this.passes.length;t<r;t++){let r=this.passes[t];if(r.enabled!==!1){if(r.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(t),r.render(this.renderer,this.writeBuffer,this.readBuffer,e,n),r.needsSwap){if(n){let t=this.renderer.getContext(),n=this.renderer.state.buffers.stencil;n.setFunc(t.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),n.setFunc(t.EQUAL,1,4294967295)}this.swapBuffers()}kd!==void 0&&(r instanceof kd?n=!0:r instanceof Ad&&(n=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){let t=this.renderer.getSize(new H);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;let n=this._width*this._pixelRatio,r=this._height*this._pixelRatio;this.renderTarget1.setSize(n,r),this.renderTarget2.setSize(n,r);for(let e=0;e<this.passes.length;e++)this.passes[e].setSize(n,r)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}},Md=class extends wd{constructor(e,t,n=null,r=null,i=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=n,this.clearColor=r,this.clearAlpha=i,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new X}render(e,t,n){let r=e.autoClear;e.autoClear=!1;let i,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(i=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==1&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(i),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),e.autoClear=r}},Nd={name:`OutputShader`,uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#elif defined( CUSTOM_TONE_MAPPING )

				gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`},Pd=class extends wd{constructor(){super(),this.isOutputPass=!0,this.uniforms=yr.clone(Nd.uniforms),this.material=new Cr({name:Nd.name,uniforms:this.uniforms,vertexShader:Nd.vertexShader,fragmentShader:Nd.fragmentShader}),this._fsQuad=new Dd(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},G.getTransfer(this._outputColorSpace)===`srgb`&&(this.material.defines.SRGB_TRANSFER=``),this._toneMapping===1?this.material.defines.LINEAR_TONE_MAPPING=``:this._toneMapping===2?this.material.defines.REINHARD_TONE_MAPPING=``:this._toneMapping===3?this.material.defines.CINEON_TONE_MAPPING=``:this._toneMapping===4?this.material.defines.ACES_FILMIC_TONE_MAPPING=``:this._toneMapping===6?this.material.defines.AGX_TONE_MAPPING=``:this._toneMapping===7?this.material.defines.NEUTRAL_TONE_MAPPING=``:this._toneMapping===5&&(this.material.defines.CUSTOM_TONE_MAPPING=``),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}},Fd={name:`FXAAShader`,uniforms:{tDiffuse:{value:null},resolution:{value:new H(1/1024,1/512)}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec2 resolution;
		varying vec2 vUv;

		#define EDGE_STEP_COUNT 6
		#define EDGE_GUESS 8.0
		#define EDGE_STEPS 1.0, 1.5, 2.0, 2.0, 2.0, 4.0
		const float edgeSteps[EDGE_STEP_COUNT] = float[EDGE_STEP_COUNT]( EDGE_STEPS );

		float _ContrastThreshold = 0.0312;
		float _RelativeThreshold = 0.063;
		float _SubpixelBlending = 1.0;

		vec4 Sample( sampler2D  tex2D, vec2 uv ) {

			return texture( tex2D, uv );

		}

		float SampleLuminance( sampler2D tex2D, vec2 uv ) {

			return dot( Sample( tex2D, uv ).rgb, vec3( 0.3, 0.59, 0.11 ) );

		}

		float SampleLuminance( sampler2D tex2D, vec2 texSize, vec2 uv, float uOffset, float vOffset ) {

			uv += texSize * vec2(uOffset, vOffset);
			return SampleLuminance(tex2D, uv);

		}

		struct LuminanceData {

			float m, n, e, s, w;
			float ne, nw, se, sw;
			float highest, lowest, contrast;

		};

		LuminanceData SampleLuminanceNeighborhood( sampler2D tex2D, vec2 texSize, vec2 uv ) {

			LuminanceData l;
			l.m = SampleLuminance( tex2D, uv );
			l.n = SampleLuminance( tex2D, texSize, uv,  0.0,  1.0 );
			l.e = SampleLuminance( tex2D, texSize, uv,  1.0,  0.0 );
			l.s = SampleLuminance( tex2D, texSize, uv,  0.0, -1.0 );
			l.w = SampleLuminance( tex2D, texSize, uv, -1.0,  0.0 );

			l.ne = SampleLuminance( tex2D, texSize, uv,  1.0,  1.0 );
			l.nw = SampleLuminance( tex2D, texSize, uv, -1.0,  1.0 );
			l.se = SampleLuminance( tex2D, texSize, uv,  1.0, -1.0 );
			l.sw = SampleLuminance( tex2D, texSize, uv, -1.0, -1.0 );

			l.highest = max( max( max( max( l.n, l.e ), l.s ), l.w ), l.m );
			l.lowest = min( min( min( min( l.n, l.e ), l.s ), l.w ), l.m );
			l.contrast = l.highest - l.lowest;
			return l;

		}

		bool ShouldSkipPixel( LuminanceData l ) {

			float threshold = max( _ContrastThreshold, _RelativeThreshold * l.highest );
			return l.contrast < threshold;

		}

		float DeterminePixelBlendFactor( LuminanceData l ) {

			float f = 2.0 * ( l.n + l.e + l.s + l.w );
			f += l.ne + l.nw + l.se + l.sw;
			f *= 1.0 / 12.0;
			f = abs( f - l.m );
			f = clamp( f / l.contrast, 0.0, 1.0 );

			float blendFactor = smoothstep( 0.0, 1.0, f );
			return blendFactor * blendFactor * _SubpixelBlending;

		}

		struct EdgeData {

			bool isHorizontal;
			float pixelStep;
			float oppositeLuminance, gradient;

		};

		EdgeData DetermineEdge( vec2 texSize, LuminanceData l ) {

			EdgeData e;
			float horizontal =
				abs( l.n + l.s - 2.0 * l.m ) * 2.0 +
				abs( l.ne + l.se - 2.0 * l.e ) +
				abs( l.nw + l.sw - 2.0 * l.w );
			float vertical =
				abs( l.e + l.w - 2.0 * l.m ) * 2.0 +
				abs( l.ne + l.nw - 2.0 * l.n ) +
				abs( l.se + l.sw - 2.0 * l.s );
			e.isHorizontal = horizontal >= vertical;

			float pLuminance = e.isHorizontal ? l.n : l.e;
			float nLuminance = e.isHorizontal ? l.s : l.w;
			float pGradient = abs( pLuminance - l.m );
			float nGradient = abs( nLuminance - l.m );

			e.pixelStep = e.isHorizontal ? texSize.y : texSize.x;

			if (pGradient < nGradient) {

				e.pixelStep = -e.pixelStep;
				e.oppositeLuminance = nLuminance;
				e.gradient = nGradient;

			} else {

				e.oppositeLuminance = pLuminance;
				e.gradient = pGradient;

			}

			return e;

		}

		float DetermineEdgeBlendFactor( sampler2D  tex2D, vec2 texSize, LuminanceData l, EdgeData e, vec2 uv ) {

			vec2 uvEdge = uv;
			vec2 edgeStep;
			if (e.isHorizontal) {

				uvEdge.y += e.pixelStep * 0.5;
				edgeStep = vec2( texSize.x, 0.0 );

			} else {

				uvEdge.x += e.pixelStep * 0.5;
				edgeStep = vec2( 0.0, texSize.y );

			}

			float edgeLuminance = ( l.m + e.oppositeLuminance ) * 0.5;
			float gradientThreshold = e.gradient * 0.25;

			vec2 puv = uvEdge + edgeStep * edgeSteps[0];
			float pLuminanceDelta = SampleLuminance( tex2D, puv ) - edgeLuminance;
			bool pAtEnd = abs( pLuminanceDelta ) >= gradientThreshold;

			for ( int i = 1; i < EDGE_STEP_COUNT && !pAtEnd; i++ ) {

				puv += edgeStep * edgeSteps[i];
				pLuminanceDelta = SampleLuminance( tex2D, puv ) - edgeLuminance;
				pAtEnd = abs( pLuminanceDelta ) >= gradientThreshold;

			}

			if ( !pAtEnd ) {

				puv += edgeStep * EDGE_GUESS;

			}

			vec2 nuv = uvEdge - edgeStep * edgeSteps[0];
			float nLuminanceDelta = SampleLuminance( tex2D, nuv ) - edgeLuminance;
			bool nAtEnd = abs( nLuminanceDelta ) >= gradientThreshold;

			for ( int i = 1; i < EDGE_STEP_COUNT && !nAtEnd; i++ ) {

				nuv -= edgeStep * edgeSteps[i];
				nLuminanceDelta = SampleLuminance( tex2D, nuv ) - edgeLuminance;
				nAtEnd = abs( nLuminanceDelta ) >= gradientThreshold;

			}

			if ( !nAtEnd ) {

				nuv -= edgeStep * EDGE_GUESS;

			}

			float pDistance, nDistance;
			if ( e.isHorizontal ) {

				pDistance = puv.x - uv.x;
				nDistance = uv.x - nuv.x;

			} else {

				pDistance = puv.y - uv.y;
				nDistance = uv.y - nuv.y;

			}

			float shortestDistance;
			bool deltaSign;
			if ( pDistance <= nDistance ) {

				shortestDistance = pDistance;
				deltaSign = pLuminanceDelta >= 0.0;

			} else {

				shortestDistance = nDistance;
				deltaSign = nLuminanceDelta >= 0.0;

			}

			if ( deltaSign == ( l.m - edgeLuminance >= 0.0 ) ) {

				return 0.0;

			}

			return 0.5 - shortestDistance / ( pDistance + nDistance );

		}

		vec4 ApplyFXAA( sampler2D  tex2D, vec2 texSize, vec2 uv ) {

			LuminanceData luminance = SampleLuminanceNeighborhood( tex2D, texSize, uv );
			if ( ShouldSkipPixel( luminance ) ) {

				return Sample( tex2D, uv );

			}

			float pixelBlend = DeterminePixelBlendFactor( luminance );
			EdgeData edge = DetermineEdge( texSize, luminance );
			float edgeBlend = DetermineEdgeBlendFactor( tex2D, texSize, luminance, edge, uv );
			float finalBlend = max( pixelBlend, edgeBlend );

			if (edge.isHorizontal) {

				uv.y += edge.pixelStep * finalBlend;

			} else {

				uv.x += edge.pixelStep * finalBlend;

			}

			return Sample( tex2D, uv );

		}

		void main() {

			gl_FragColor = ApplyFXAA( tDiffuse, resolution.xy, vUv );

		}`},Id=Object.freeze({id:`water`,name:`Water`,width:50,length:50,depth:10,surface:0,bottom:-10,halfSize:25,beige:`#e8dfd0`}),Ld=9.81,Rd=3,zd=Object.freeze([[.18,11,.55,.3],[.1,7.3,.95,1.7],[.065,4.6,-.35,3.2],[.035,2.8,1.4,4.1]].map(([e,t,n,r])=>{let i=2*Math.PI/t,a=Math.exp(-2*i*Id.depth);return Object.freeze({amplitude:e,k:i,x:Math.cos(n),z:Math.sin(n),phase:r,mirrorDepth:a,inverseDepth:1/(1-a),omega:Math.sqrt(Ld*i*Math.tanh(i*Id.depth))})})),Bd=e=>Number(e).toFixed(9);`${Bd(Id.halfSize)}${Bd(Rd)}${Bd(Rd)}${zd.map(e=>`{
    let phase = ${Bd(e.k)} * dot(p, vec2f(${Bd(e.x)}, ${Bd(e.z)})) - ${Bd(e.omega)} * time + ${Bd(e.phase)};
    let a = ${Bd(e.amplitude)} * waves.strength;
    sum += vec4f(a * cos(phase), -a * ${Bd(e.k*e.x)} * sin(phase), -a * ${Bd(e.k*e.z)} * sin(phase), a * ${Bd(e.omega)} * sin(phase));
  }`).join(`
`)}${Bd(Id.halfSize)}${Bd(Id.halfSize)}${Bd(Id.width)}${(256/257).toPrecision(17)}${(.5/257).toPrecision(17)}`;var Vd={f32:{size:4,align:4,n:1},i32:{size:4,align:4,n:1,int:!0},u32:{size:4,align:4,n:1,uint:!0},vec2f:{size:8,align:8,n:2},vec3f:{size:12,align:16,n:3},vec4f:{size:16,align:16,n:4},vec2i:{size:8,align:8,n:2,int:!0},vec4i:{size:16,align:16,n:4,int:!0},vec2u:{size:8,align:8,n:2,uint:!0},vec4u:{size:16,align:16,n:4,uint:!0},mat3x3f:{size:48,align:16,n:12,mat3:!0},mat4x4f:{size:64,align:16,n:16}};function Hd(e){let t=/^(\w+)(?:\[(\d+)\])?$/.exec(e);if(!t||!Vd[t[1]])throw Error(`Unsupported uniform type `+e);let n=Vd[t[1]],r=t[2]?Number(t[2]):0;if(r&&n.align<16)throw Error(`uniform array ${e}: element must be 16-byte aligned (use vec4f)`);return{name:t[1],base:n,count:r}}function Ud(e,t,n,r,i,a){let{base:o}=i,s=o.int?n:o.uint?t:e;if(typeof a==`number`||typeof a==`boolean`){s[r]=Number(a);return}if(a!=null){if(a.isMatrix4||a.isMatrix3){let t=a.elements;if(o.mat3){if(t.length===9)for(let n=0;n<3;n++)for(let i=0;i<3;i++)e[r+n*4+i]=t[n*3+i];else for(let n=0;n<3;n++)for(let i=0;i<3;i++)e[r+n*4+i]=t[n*4+i]}else for(let n=0;n<16;n++)e[r+n]=t[n];return}if(a.isColor){s[r]=a.r,s[r+1]=a.g,s[r+2]=a.b,o.n===4&&(s[r+3]=1);return}if(a.isVector2){s[r]=a.x,s[r+1]=a.y;return}if(a.isVector3){s[r]=a.x,s[r+1]=a.y,s[r+2]=a.z;return}if(a.isVector4||a.isQuaternion){s[r]=a.x,s[r+1]=a.y,s[r+2]=a.z,s[r+3]=a.w;return}if(ArrayBuffer.isView(a)||Array.isArray(a)){for(let e=0;e<Math.min(a.length,o.n);e++)s[r+e]=a[e];return}throw Error(`Cannot write uniform value `+a)}}var Wd=0,Gd=class{constructor(e,t,{label:n}={}){this.structName=e,this.label=n||e,this.id=Wd++,this.layout={},this.fields={},this.order=[];let r=0,i=16;for(let e in t){let n=t[e],a=Array.isArray(n)?n[0]:n,o=Array.isArray(n)?n[1]:void 0,s=Hd(a),c=s.base.align;i=Math.max(i,c),r=Math.ceil(r/c)*c;let l=s.count?Math.ceil(s.base.size/16)*16:s.base.size,u=s.count?l*s.count:s.base.size;this.layout[e]={offset:r,type:s,typeStr:a,stride:l,size:u},this.order.push(e),this.fields[e]={value:o===void 0?Kd(s):o},r+=u}this.byteLength=Math.max(16,Math.ceil(r/i)*i),this.data=new ArrayBuffer(this.byteLength),this.f32=new Float32Array(this.data),this.u32=new Uint32Array(this.data),this.i32=new Int32Array(this.data),this.buffer=null,this.version=0;let a=this;this.values=new Proxy({},{get:(e,t)=>a.fields[t]&&a.fields[t].value,set:(e,t,n)=>(a.set(t,n),!0)})}get wgsl(){let e=`struct ${this.structName} {\n`;for(let t of this.order){let{type:n}=this.layout[t];e+=n.count?`\t${t}: array<${n.name}, ${n.count}>,\n`:`\t${t}: ${n.name},\n`}return e+`};
`}set(e,t){let n=this.fields[e];if(!n)throw Error(`${this.structName}: no uniform ${e}`);n.value&&typeof n.value==`object`&&!Array.isArray(n.value)&&n.value.copy&&t&&t.constructor===n.value.constructor?n.value.copy(t):n.value=t}get(e){return this.fields[e].value}_pack(){this.onBeforePack&&this.onBeforePack(this);let{f32:e,u32:t,i32:n,fields:r}=this,i=this._plan||this._makePlan();for(let a=0;a<i.length;a++){let{name:o,o:s,type:c,stride:l,count:u,n:d}=i[a],f=r[o].value;if(typeof f==`number`){(c.base.int?n:c.base.uint?t:e)[s]=f;continue}if(u){if(!f)continue;if(typeof f[0]==`number`){let r=c.base.int?n:c.base.uint?t:e,i=Math.min(u,f.length/d);for(let e=0;e<i;e++){let t=s+e*l,n=e*d,i=Math.min(d,f.length-n);for(let e=0;e<i;e++)r[t+e]=f[n+e]}}else{let r=Math.min(u,f.length);for(let i=0;i<r;i++)Ud(e,t,n,s+i*l,c,f[i])}}else Ud(e,t,n,s,c,f)}}_makePlan(){return this._plan=this.order.map(e=>{let{offset:t,type:n,stride:r}=this.layout[e];return{name:e,o:t/4,type:n,stride:r/4,count:n.count,n:n.base.n}}),this._plan}getBuffer(){return this.buffer||(this.buffer=ac.device.createBuffer({label:this.label,size:this.byteLength,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST}),this._last=new Uint32Array(this.byteLength/4),this._last.fill(4294967295),this._hasUploaded=!1),this.buffer}upload(e){if(e!==void 0&&e===this._token&&this.buffer)return this.buffer;this._token=e;let t=this.getBuffer();this._pack();let n=this.u32,r=this._last;if(!this._hasUploaded)return ac.queue.writeBuffer(t,0,this.data),r.set(n),this._hasUploaded=!0,t;let i=0;for(;i<n.length&&n[i]===r[i];)i++;if(i<n.length){let e=n.length;if(n.length>=64)for(;e>i+1&&n[e-1]===r[e-1];)e--;else i=0;ac.queue.writeBuffer(t,i*4,this.data,i*4,(e-i)*4),r.set(n)}return t}};function Kd(e){return e.count?null:e.base.n===1?0:Array(e.base.n).fill(0)}var qd=0,Jd=class{constructor({name:e,deps:t=[],code:n=``,bindings:r={},uniforms:i=null,uniformName:a=null}){this.id=qd++,this.name=e||`module`+this.id,this.deps=t.filter(Boolean),this.code=n,this.bindings={...r},i&&(this.bindings[a||Yd(i.structName)]={uniform:i}),this.isShaderModule=!0}};function Yd(e){return e[0].toLowerCase()+e.slice(1)}var Xd=new Jd({name:`common`,code:`
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
`}),Zd=new Gd(`SunShadow`,{matrices:[`mat4x4f[4]`,[new tl,new tl,new tl,new tl]],cascades:[`vec4f[4]`,[new Kc,new Kc,new Kc,new Kc]],count:[`u32`,0],mapSize:[`f32`,2048],bias:[`f32`,2e-5],fade:[`f32`,1],pcssCascades:[`u32`,1],sunAngularDiameter:[`f32`,.00925],enabled:[`f32`,0],pad:[`f32`,0],blend:[`vec4f[4]`,[new Kc,new Kc,new Kc,new Kc]]}),Qd=null,$d=Object.freeze(Array.from({length:5},(e,t)=>{let n=Math.fround(t*Math.fround(2.399963229728653)),r=Math.fround(Math.sqrt(Math.fround((t+.5)/5)));return Object.freeze([Math.fround(Math.fround(Math.cos(n))*r),Math.fround(Math.fround(Math.sin(n))*r)])})),ef=e=>{let t=String(e);return t.includes(`.`)||t.includes(`e`)?t:t+`.0`},tf=$d.map(([e,t])=>`\tsum += _shadowTap( uvz.xy + _waterPcf5Rotate( vec2f( ${ef(e)}, ${ef(t)} ), rotation ) * texel, c, z );`).join(`
`),nf=new Jd({name:`sunShadow`,deps:[Xd],uniforms:Zd,uniformName:`shadowParams`,bindings:{sunShadowMap:{texture:()=>Qd,viewDimension:`2d-array`}},code:`
#if WATER_SHADOW_ROTATION
fn _waterPcf5Rotate( v: vec2f, r: vec2f ) -> vec2f {
	return vec2f( v.x * r.x - v.y * r.y, v.x * r.y + v.y * r.x );
}
#endif
fn shadowCascadeOf( viewDist: f32 ) -> i32 {
#if WATER_SINGLE_CASCADE
	if ( shadowParams.count == 1u ) {
		return select( -1, 0, viewDist < shadowParams.cascades[ 0 ].x );
	}
#endif
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
#if WATER_SHADOW_ROTATION
	let rotation = vec2f( cos( phiP ), sin( phiP ) );
${tf}
#else
	for ( var i = 0; i < 5; i++ ) {
		sum += _shadowTap( uvz.xy + vogelDiskSample( i, 5, phiP ) * texel, c, z );
	}
#endif
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
#if WATER_SINGLE_CASCADE
	// Keep the original selection/fade gates while making its only live map
	// index literal. A changed scene count retains the generic cascade path.
	if ( shadowParams.count == 1u ) {
		if ( shadowParams.fade < 0.5 ) {
			if ( dist < shadowParams.cascades[ 0 ].x ) {
				return _sunShadowCascade( P, N, 0, noise, pcfNoise, pcss );
			}
			return 1.0;
		}
		let b = shadowParams.blend[ 0 ];
		let center = ( b.x + b.y ) * 0.5;
		let margin = max( select( b.w, b.z, dist < center ), 1e-5 );
		let csmX = b.x - margin * 0.5;
		let csmY = b.y;
		var ret = 1.0;
		if ( dist >= csmX && dist <= csmY ) {
			var ratio = clamp( min( dist - csmX, csmY - dist ) / margin, 0.0, 1.0 );
			if ( dist <= center ) { ratio = 1.0; }
			ret -= ( 1.0 - _sunShadowCascade( P, N, 0, noise, pcfNoise, pcss ) ) * ratio;
		}
		return max( ret, 0.0 );
	}
#endif
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
`});new Jd({name:`lighting`,deps:[Xd,new Jd({name:`surface`,deps:[Xd],code:`
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
#if YACHT_DIELECTRIC_SCALAR || YACHT_SHARED_GGX_ANGLES
// The ordinary BRDF remains untouched. Authored yacht draws may share only
// their view/light half-vector and scalar Fresnel factor, never normal fields.
fn yachtDirectGgx( L: vec3f, V: vec3f, N: vec3f, f0: vec3f, f90: f32, roughness: f32, sharedH: vec3f, sharedFresnel: f32, dielectric: bool ) -> vec3f {
	let alpha = roughness * roughness;
#if YACHT_SHARED_GGX_ANGLES
	let H = sharedH;
	let fresnel = sharedFresnel;
#else
	let H = normalize( L + V );
	let dotVH = sat( dot( V, H ) );
	let fresnel = exp2( ( -5.55473 * dotVH - 6.98316 ) * dotVH );
#endif
	let dotNL = sat( dot( N, L ) ); let dotNV = sat( dot( N, V ) );
	let dotNH = sat( dot( N, H ) );
#if YACHT_DIELECTRIC_SCALAR
	if ( dielectric ) {
		let F = 0.04 * ( 1.0 - fresnel ) + 1.0 * fresnel;
		return vec3f( F * V_GGX_SmithCorrelated( alpha, dotNL, dotNV ) * D_GGX( alpha, dotNH ) );
	}
#endif
	return ( f0 * ( 1.0 - fresnel ) + f90 * fresnel ) * V_GGX_SmithCorrelated( alpha, dotNL, dotNV ) * D_GGX( alpha, dotNH );
}
#endif
#if YACHT_DIELECTRIC_SCALAR
// With metalness zero and unit specular intensity, all three original
// multiscatter components are identical. Keep their operation tree scalar.
fn yachtDielectricMultiscatter( N: vec3f, V: vec3f, roughness: f32 ) -> vec2f {
	let fab = DFGApprox( sat( dot( N, V ) ), roughness );
	let Fr = 0.04;
	let FssEss = Fr * fab.x + 1.0 * fab.y;
	let Ess = fab.x + fab.y;
	let Ems = 1.0 - Ess;
	let Favg = Fr + ( 1.0 - Fr ) * 0.047619;
	let Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	return vec2f( FssEss, Fms * Ems );
}
#endif
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
`}),nf],code:`
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

#if WATER_YACHT_PBR_PREPARED && PASS_MAIN
var<private> waterYachtBaseVariance: f32 = 0.0;
var<private> waterYachtCoatVariance: f32 = 0.0;

// Called unconditionally before a cache/occlusion branch. A mixed quad must
// never take a PBR derivative inside its divergent fresh-shading branch.
fn waterYachtPbrPrepare( s: Surface, P: vec3f ) {
	let N = s.normal;
	lightDPdx = dpdx( P );
	lightDPdy = dpdy( P );
#if WATER_SPECULAR_AA
	let specularPixelScale = max( vec2f( 1.0 ), frame.resolution / max( frame.outputResolution, vec2f( 1.0 ) ) );
	let nx = dpdx( N ) * specularPixelScale.x; let ny = dpdy( N ) * specularPixelScale.y;
	waterYachtBaseVariance = min( .18, max( dot( nx, nx ), dot( ny, ny ) ) );
#if CLEARCOAT
#if YACHT_COINCIDENT_COAT_NORMAL
	waterYachtCoatVariance = waterYachtBaseVariance;
#else
	let cx = dpdx( s.clearcoatNormal ) * specularPixelScale.x; let cy = dpdy( s.clearcoatNormal ) * specularPixelScale.y;
	waterYachtCoatVariance = min( .18, max( dot( cx, cx ), dot( cy, cy ) ) );
#endif
#endif
#endif
}
#endif

#if WATER_YACHT_SHADING_CACHE && PASS_MAIN
var<private> waterYachtLightColor: vec3f = vec3f( 0.0 );

// The unconditional PBR preparation above precedes this shadow work. A fresh
// cache miss consumes the same modulation and visibility without a second tap.
fn waterYachtCachePrepare( s: Surface, P: vec3f, V: vec3f, pixel: vec2f ) -> f32 {
	let N = s.normal;
	let dotNL = sat( dot( N, frame.sunDir ) );
	waterYachtLightColor = vec3f( 0.0 );
	var visibility = 1.0;
	if ( dotNL > 0.0 || any( s.translucency > vec3f( 0.0 ) ) ) {
		waterYachtLightColor = frame.sunColor * hookDirectModulation( P, N );
#if MATERIAL_SUN_MODULATION
		waterYachtLightColor *= materialSunModulation( P, N );
#endif
		let geomN = N;
		var shadow = 0.0;
		if ( any( waterYachtLightColor > vec3f( 0.0 ) ) ) {
#if REFRACTION_CLIP
			shadow = sunShadowHard( hookShadowPosition( P, geomN, pixel ) );
#else
			shadow = sunShadow( hookShadowPosition( P, geomN, pixel ), geomN, pixel );
#endif
		}
		visibility = shadow;
		waterYachtLightColor *= shadow;
	}
	return visibility;
}
#endif

fn shadeSurface( s: Surface, P: vec3f, V: vec3f, pixel: vec2f ) -> vec3f {
	let N = s.normal;
	var rough = clamp( s.roughness, 0.03, 1.0 );
#if WATER_SPECULAR_AA
	// Convolve a subpixel normal footprint with the GGX lobe. Smooth panels
	// retain their authored gloss; tiny curved rails and hull glints broaden
	// before they become isolated flashing pixels. Keep the filter in radiance.
#if WATER_YACHT_PBR_PREPARED && PASS_MAIN
	let variance = waterYachtBaseVariance;
#else
	let specularPixelScale = max( vec2f( 1.0 ), frame.resolution / max( frame.outputResolution, vec2f( 1.0 ) ) );
	let nx = dpdx( N ) * specularPixelScale.x; let ny = dpdy( N ) * specularPixelScale.y;
	let variance = min( .18, max( dot( nx, nx ), dot( ny, ny ) ) );
#endif
	rough = sqrt( sqrt( min( 1.0, rough * rough * rough * rough + variance ) ) );
#endif
#if CLEARCOAT
	var coatRough = clamp( s.clearcoatRoughness, 0.03, 1.0 );
#if WATER_SPECULAR_AA
#if WATER_YACHT_PBR_PREPARED && PASS_MAIN
	let coatVariance = waterYachtCoatVariance;
#else
#if YACHT_COINCIDENT_COAT_NORMAL
	// Only an entire draw with identical shading and coat normals can share
	// this kernel. A per-pixel equality check is unsafe at bumped-wood edges.
	let coatVariance = variance;
#else
	let cx = dpdx( s.clearcoatNormal ) * specularPixelScale.x; let cy = dpdy( s.clearcoatNormal ) * specularPixelScale.y;
	let coatVariance = min( .18, max( dot( cx, cx ), dot( cy, cy ) ) );
#endif
#endif
#if YACHT_PBR_FAST
	// Derivatives above remain unconditional; only unused scalar coat work
	// moves into the branch. Zero-coat cloth, steel and teak retain base PBR.
	if ( s.clearcoat != 0.0 ) {
		coatRough = sqrt( sqrt( min( 1.0, coatRough * coatRough * coatRough * coatRough + coatVariance ) ) );
	}
#else
	coatRough = sqrt( sqrt( min( 1.0, coatRough * coatRough * coatRough * coatRough + coatVariance ) ) );
#endif
#endif
#endif
	let diffuseColor = s.albedo * ( 1.0 - s.metalness );
	let specF0 = mix( vec3f( 0.04 ) * s.specularIntensity, s.albedo, s.metalness );
	let specF90 = mix( s.specularIntensity, 1.0, s.metalness );
#if YACHT_DIELECTRIC_SCALAR
	let yachtDielectric = s.metalness == 0.0 && s.specularIntensity == 1.0;
#else
#if YACHT_SHARED_GGX_ANGLES
	let yachtDielectric = false;
#endif
#endif
	var acc: LightAccum;
	acc.directDiffuse = vec3f( 0.0 ); acc.directSpecular = vec3f( 0.0 );
	acc.indirectDiffuse = vec3f( 0.0 ); acc.indirectSpecular = vec3f( 0.0 );

#if !WATER_YACHT_PBR_PREPARED || !PASS_MAIN
	lightDPdx = dpdx( P );
	lightDPdy = dpdy( P );
#endif

	// ---- sun / moon
	let L = frame.sunDir;
	let dotNL = sat( dot( N, L ) );
#if WATER_YACHT_SHADING_CACHE && PASS_MAIN
	let lightColor = waterYachtLightColor;
#else
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
#endif
	let irradiance = dotNL * lightColor;
#if YACHT_HALF_COLOR
	// Geometric factors remain f32; round only the bounded RGB diffuse work.
	// Direct glossy lobes stay f32: grazing GGX can exceed the f16 range before
	// clearcoat attenuation even though the final color target is rgba16float.
	acc.directDiffuse += vec3f( vec3h( irradiance ) * vec3h( diffuseColor ) * f16( INV_PI ) );
#else
	acc.directDiffuse += irradiance * diffuseColor * INV_PI;
#endif
#if YACHT_SHARED_GGX_ANGLES
	var sharedH = vec3f( 0.0 );
	var sharedFresnel = 0.0;
	var sharedDirectActive = any( irradiance != vec3f( 0.0 ) );
#if CLEARCOAT
#if !YACHT_ALIAS_COAT_NORMAL || !YACHT_COINCIDENT_COAT_NORMAL
	if ( s.clearcoat != 0.0 ) {
		sharedDirectActive = sharedDirectActive || any( sat( dot( s.clearcoatNormal, L ) ) * lightColor != vec3f( 0.0 ) );
	}
#endif
#endif
	if ( sharedDirectActive ) {
		sharedH = normalize( L + V );
		let sharedDotVH = sat( dot( V, sharedH ) );
		sharedFresnel = exp2( ( -5.55473 * sharedDotVH - 6.98316 ) * sharedDotVH );
	}
#else
#if YACHT_DIELECTRIC_SCALAR
	let sharedH = vec3f( 0.0 );
	let sharedFresnel = 0.0;
#endif
#endif
#if YACHT_DIRECT_ZERO_FAST || YACHT_SHARED_GGX_ANGLES
	// All derivatives and shadow work stay above this branch. A finite GGX
	// lobe multiplied by exact-zero irradiance cannot contribute direct light.
	if ( any( irradiance != vec3f( 0.0 ) ) ) {
#if YACHT_DIELECTRIC_SCALAR || YACHT_SHARED_GGX_ANGLES
		acc.directSpecular += irradiance * yachtDirectGgx( L, V, N, specF0, specF90, rough, sharedH, sharedFresnel, yachtDielectric );
#else
		acc.directSpecular += irradiance * BRDF_GGX( L, V, N, specF0, specF90, rough );
#endif
	}
#else
#if YACHT_DIELECTRIC_SCALAR
	acc.directSpecular += irradiance * yachtDirectGgx( L, V, N, specF0, specF90, rough, sharedH, sharedFresnel, yachtDielectric );
#else
	acc.directSpecular += irradiance * BRDF_GGX( L, V, N, specF0, specF90, rough );
#endif
#endif
#if SHEEN
	acc.directSpecular += irradiance * BRDF_Sheen( L, V, N, s.sheenColor, max( s.sheenRoughness, 0.07 ) );
#endif
	// thin-surface transmission (foliage): lit from behind as well
	acc.directDiffuse += s.translucency * lightColor;
#if CLEARCOAT
#if YACHT_ALIAS_COAT_NORMAL && YACHT_COINCIDENT_COAT_NORMAL
	// The certified draw promises coincident normals wherever coat contributes.
	// Aliasing exposes identical GGX dot/reflection operands to the compiler;
	// zero-coat primitives retain their base normal and all derivative work.
	let ccN = N;
#else
	let ccN = s.clearcoatNormal;
#endif
#if YACHT_PBR_FAST || YACHT_DIRECT_ZERO_FAST || YACHT_SHARED_GGX_ANGLES || YACHT_DIELECTRIC_SCALAR
	var ccSpec = vec3f( 0.0 );
#if YACHT_PBR_FAST || YACHT_SHARED_GGX_ANGLES
	if ( s.clearcoat != 0.0 ) {
#endif
		let ccNL = sat( dot( ccN, L ) );
#if YACHT_DIRECT_ZERO_FAST || YACHT_SHARED_GGX_ANGLES
		if ( any( ccNL * lightColor != vec3f( 0.0 ) ) ) {
#if YACHT_DIELECTRIC_SCALAR || YACHT_SHARED_GGX_ANGLES
			ccSpec = ccNL * lightColor * yachtDirectGgx( L, V, ccN, vec3f( 0.04 ), 1.0, coatRough, sharedH, sharedFresnel, true );
#else
			ccSpec = ccNL * lightColor * BRDF_GGX( L, V, ccN, vec3f( 0.04 ), 1.0, coatRough );
#endif
		}
#else
#if YACHT_DIELECTRIC_SCALAR
		ccSpec = ccNL * lightColor * yachtDirectGgx( L, V, ccN, vec3f( 0.04 ), 1.0, coatRough, sharedH, sharedFresnel, true );
#else
		ccSpec = ccNL * lightColor * BRDF_GGX( L, V, ccN, vec3f( 0.04 ), 1.0, coatRough );
#endif
#endif
#if YACHT_PBR_FAST || YACHT_SHARED_GGX_ANGLES
	}
#endif
#else
	let ccNL = sat( dot( ccN, L ) );
	let ccSpec = ccNL * lightColor * BRDF_GGX( L, V, ccN, vec3f( 0.04 ), 1.0, coatRough );
#endif
#endif

	// ---- local lights (lanterns, windows, boat lights, flashlight)
#if !STUDIO_LIGHTING
	hookLocalLights( s, P, N, V, &acc );
#endif

#if YACHT_HALF_COLOR && !STUDIO_LIGHTING && !SHEEN
	// Keep direct GGX peaks, scalar energy compensation, and the final
	// accumulator f32. Only bounded diffuse/IBL RGB intermediates use f16.
	var color = vec3f( vec3h( acc.directDiffuse ) ) + acc.directSpecular;
	let envIrrH = vec3h( hookEnvDiffuse( N ) * PI * s.envIntensity );
	var single = vec3f( 0.0 ); var multi = vec3f( 0.0 );
#if YACHT_DIELECTRIC_SCALAR
	var diffuseMS = vec3f( 0.0 );
	if ( yachtDielectric ) {
		let scatter = yachtDielectricMultiscatter( N, V, rough );
		single += vec3f( scatter.x ); multi += vec3f( scatter.y );
		let totalScatter = single.x + multi.x;
		diffuseMS = diffuseColor * ( 1.0 - totalScatter );
	} else {
		multiscatter( N, V, specF0, specF90, rough, &single, &multi );
		let totalScatter = single + multi;
		diffuseMS = diffuseColor * ( 1.0 - max( max( totalScatter.r, totalScatter.g ), totalScatter.b ) );
	}
#else
	multiscatter( N, V, specF0, specF90, rough, &single, &multi );
	let totalScatter = single + multi;
	let diffuseMS = diffuseColor * ( 1.0 - max( max( totalScatter.r, totalScatter.g ), totalScatter.b ) );
#endif
	var indirectDiffuseH = vec3h( acc.indirectDiffuse );
	indirectDiffuseH += vec3h( diffuseMS ) * envIrrH * f16( INV_PI ) + vec3h( hookBounce( P, N ) ) * vec3h( diffuseColor );
	let dotNV = sat( dot( N, V ) );
#if WATER_PBR_EXACT
	var specAO = 1.0;
	if ( s.ao != 1.0 ) {
		specAO = sat( pow( dotNV + s.ao, exp2( -16.0 * rough - 1.0 ) ) - 1.0 + s.ao );
	}
#else
	let specAO = sat( pow( dotNV + s.ao, exp2( -16.0 * rough - 1.0 ) ) - 1.0 + s.ao );
#endif
	let amb = hookAmbientModulation( P, N );
	let ambH = vec3h( amb );
	indirectDiffuseH *= f16( s.ao );
	indirectDiffuseH *= ambH;
	color += vec3f( indirectDiffuseH );
	let R = reflect( -V, N );
#if YACHT_ENV_HOMOGENEOUS
	let Rr = mix( R, N, rough * rough );
#else
	let Rr = normalize( mix( R, N, rough * rough ) );
#endif
	let radianceH = vec3h( hookEnvSpecular( Rr, rough ) * s.envIntensity );
	var indirectSpecularH = vec3h( acc.indirectSpecular );
	indirectSpecularH += radianceH * vec3h( single ) + vec3h( multi ) * envIrrH * f16( INV_PI );
	indirectSpecularH *= f16( specAO );
	indirectSpecularH *= ambH;
	color += vec3f( indirectSpecularH );
#else
#if YACHT_COMPACT_PBR && !STUDIO_LIGHTING && !SHEEN
	// Preserve the original left-to-right final adds, while finishing each
	// contribution before the next expensive texture sample. This schedule
	// is installed only with the yacht's pure baked-environment hooks.
	var color = acc.directDiffuse + acc.directSpecular;
	let envIrr = hookEnvDiffuse( N ) * PI * s.envIntensity;
	var single = vec3f( 0.0 ); var multi = vec3f( 0.0 );
#if YACHT_DIELECTRIC_SCALAR
	var diffuseMS = vec3f( 0.0 );
	if ( yachtDielectric ) {
		let scatter = yachtDielectricMultiscatter( N, V, rough );
		single += vec3f( scatter.x ); multi += vec3f( scatter.y );
		let totalScatter = single.x + multi.x;
		diffuseMS = diffuseColor * ( 1.0 - totalScatter );
	} else {
		multiscatter( N, V, specF0, specF90, rough, &single, &multi );
		let totalScatter = single + multi;
		diffuseMS = diffuseColor * ( 1.0 - max( max( totalScatter.r, totalScatter.g ), totalScatter.b ) );
	}
#else
	multiscatter( N, V, specF0, specF90, rough, &single, &multi );
	let totalScatter = single + multi;
	let diffuseMS = diffuseColor * ( 1.0 - max( max( totalScatter.r, totalScatter.g ), totalScatter.b ) );
#endif
	acc.indirectDiffuse += diffuseMS * envIrr * INV_PI + hookBounce( P, N ) * diffuseColor;
	let dotNV = sat( dot( N, V ) );
#if WATER_PBR_EXACT
	var specAO = 1.0;
	if ( s.ao != 1.0 ) {
		specAO = sat( pow( dotNV + s.ao, exp2( -16.0 * rough - 1.0 ) ) - 1.0 + s.ao );
	}
#else
	let specAO = sat( pow( dotNV + s.ao, exp2( -16.0 * rough - 1.0 ) ) - 1.0 + s.ao );
#endif
	let amb = hookAmbientModulation( P, N );
	acc.indirectDiffuse *= s.ao;
	acc.indirectDiffuse *= amb;
	color += acc.indirectDiffuse;
	let R = reflect( -V, N );
#if YACHT_ENV_HOMOGENEOUS
	let Rr = mix( R, N, rough * rough );
#else
	let Rr = normalize( mix( R, N, rough * rough ) );
#endif
	let radiance = hookEnvSpecular( Rr, rough ) * s.envIntensity;
	acc.indirectSpecular += radiance * single + multi * envIrr * INV_PI;
	acc.indirectSpecular *= specAO;
	acc.indirectSpecular *= amb;
	color += acc.indirectSpecular;
#else
	// ---- indirect: environment + ground bounce
	// (three's PhysicalLightingModel: env irradiance goes through the multiscatter-compensated
	// diffuse; the ground bounce is plain Lambert)
	let R = reflect( -V, N );
#if YACHT_ENV_HOMOGENEOUS && !STUDIO_LIGHTING
	// The water-map environment hook applies a linear yaw rotation then an
	// explicit-LOD cube sample: scaling its nonzero direction changes neither
	// the face nor the sample coordinates. Other environment hooks retain
	// their original normalized direction.
	let Rr = mix( R, N, rough * rough );
#else
	let Rr = normalize( mix( R, N, rough * rough ) );
#endif
#if STUDIO_LIGHTING
	let envIrr = studioEnvDiffuse( N ) * PI * s.envIntensity;
	let radiance = studioEnvSpecular( Rr, rough ) * s.envIntensity;
#else
	let envIrr = hookEnvDiffuse( N ) * PI * s.envIntensity;
	let radiance = hookEnvSpecular( Rr, rough ) * s.envIntensity;
#endif
	var single = vec3f( 0.0 ); var multi = vec3f( 0.0 );
#if YACHT_DIELECTRIC_SCALAR
	var diffuseMS = vec3f( 0.0 );
	if ( yachtDielectric ) {
		let scatter = yachtDielectricMultiscatter( N, V, rough );
		single += vec3f( scatter.x ); multi += vec3f( scatter.y );
		let totalScatter = single.x + multi.x;
		diffuseMS = diffuseColor * ( 1.0 - totalScatter );
	} else {
		multiscatter( N, V, specF0, specF90, rough, &single, &multi );
		let totalScatter = single + multi;
		diffuseMS = diffuseColor * ( 1.0 - max( max( totalScatter.r, totalScatter.g ), totalScatter.b ) );
	}
#else
	multiscatter( N, V, specF0, specF90, rough, &single, &multi );
	let totalScatter = single + multi;
	let diffuseMS = diffuseColor * ( 1.0 - max( max( totalScatter.r, totalScatter.g ), totalScatter.b ) );
#endif
	acc.indirectSpecular += radiance * single + multi * envIrr * INV_PI;
#if STUDIO_LIGHTING
	acc.indirectDiffuse += diffuseMS * envIrr * INV_PI;
#else
	acc.indirectDiffuse += diffuseMS * envIrr * INV_PI + hookBounce( P, N ) * diffuseColor;
#endif

	// ambient occlusion (specular occlusion after Lagarde)
	let dotNV = sat( dot( N, V ) );
#if WATER_PBR_EXACT
	// With unit AO, dotNV + AO is at least one and the exponent is
	// positive. The original expression therefore saturates to exactly one.
	// Keep the original computation for every non-unit material AO value.
	var specAO = 1.0;
	if ( s.ao != 1.0 ) {
		specAO = sat( pow( dotNV + s.ao, exp2( -16.0 * rough - 1.0 ) ) - 1.0 + s.ao );
	}
#else
	let specAO = sat( pow( dotNV + s.ao, exp2( -16.0 * rough - 1.0 ) ) - 1.0 + s.ao );
#endif
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
#endif
#endif
#if CLEARCOAT
#if YACHT_PBR_FAST
	// With a finite PBR result and zero coat, the original blend is exactly
	// color*1 + 0. Skip its unused environment sample and specular lobe.
	if ( s.clearcoat != 0.0 ) {
#endif
	let ccNV = sat( dot( ccN, V ) );
	let Fcc = F_Schlick( vec3f( 0.04 ), 1.0, ccNV ) * s.clearcoat;
#if STUDIO_LIGHTING
	let ccRad = studioEnvSpecular( reflect( -V, ccN ), coatRough ) * amb * specAO;
#else
#if YACHT_HALF_COLOR
	let ccRad = vec3f( vec3h( hookEnvSpecular( reflect( -V, ccN ), coatRough ) ) * vec3h( amb ) * f16( specAO ) );
#else
	let ccRad = hookEnvSpecular( reflect( -V, ccN ), coatRough ) * amb * specAO;
#endif
#endif
	color = color * ( 1.0 - Fcc ) + ( ccSpec * s.clearcoat + ccRad * Fcc );
#if YACHT_PBR_FAST
	}
#endif
#endif
	return color + s.emissive;
}
`}),Object.freeze(zd.map(e=>Object.freeze({amplitude:Math.fround(Number(e.amplitude.toFixed(9))),x:Math.fround(Number((e.k*e.x).toFixed(9))),z:Math.fround(Number((e.k*e.z).toFixed(9)))}))),new Uint32Array(new Float32Array(1).buffer);var rf={version:1,size:32,levels:6,format:`rgba16float`,cubeBytes:65520,encoding:`base64 little-endian binary16, mip-major then +X/-X/+Y/-Y/+Z/-Z faces`,azimuth:0,observerHeightMeters:2,sunIlluminance:11,clouds:!1,sunDisk:!1,shConvention:`Original Environment SH9, cosine-convolved irradiance / PI, vec4f coefficients`,sourceHashes:{"../src/sky/Atmosphere.js":`e39678028b8e1022b7b1372a8046bb8749334e7674fb5c90b38132e990454777`,"../src/sky/Sky.js":`d235d337d8a287803543e32d932c19030cd9f907d1887e1735fbf178207a50ee`,"../src/sky/Environment.js":`4d98dc1ea613673c97ce2062ac8bb9e07e145d4e6c4520b15ca0b17c89420195`,"../src/ocean/ComputeMips.js":`7afb698431dcfb4afeaebbd6e627cf3a4ac6d3c4d7c1a966e3d9491ea692c933`},probes:[{elevation:8,dataBase64:`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QTAAPLMoQixaMAA81ShgLHUwADz5KH8skDAAPB4pnyysMAA8MSmuLLcwADwMKY4snDAAPOgobyyBMAA8xihSLGgwADymKDYsTjAAPIgoHCw2MAA8bCgDLCAwADxRKNgrCzAAPDkorivvLwA8JCiJK80vADwRKGcrri8APAEoSyuULwA86Cc0K34vADzVJyMrbi8APMgnFytjLwA8wicSK14vADzCJxIrXi8APMgnFytjLwA81ScjK24vADzoJzQrfi8APAEoSyuULwA8EShnK64vADwkKIkrzS8APDkorivvLwA8USjYKwswADxsKAMsIDAAPIgoHCw2MAA8pig2LE4wADzGKFIsaDAAPOgobyyBMAA8DCmOLJwwADwxKa4stzAAPEopwizHMAA8JimjLK0wADwDKYUskjAAPOIoaCx5MAA8wyhNLGEwADymKDQsSjAAPIooHCw0MAA8cSgFLCAwADxZKOErDTAAPEUovSv5LwA8MyidK9svADwjKIIrwi8APBcobCutLwA8DShbK50vADwHKE8rky8APAQoSyuOLwA8BChLK44vADwHKE8rky8APA0oWyudLwA8FyhsK60vADwjKIIrwi8APDMonSvbLwA8RSi9K/kvADxZKOErDTAAPHEoBSwgMAA8iigcLDQwADymKDQsSjAAPMMoTSxhMAA84ihoLHkwADwDKYUskjAAPCYpoyytMAA8SinCLMcwADxqKdss3DAAPEcpvSzCMAA8JSmgLKkwADwGKYQskDAAPOgoaix5MAA8yyhSLGMwADyxKDosTjAAPJgoJSw6MAA8gSgRLCgwADxtKP8rGDAAPFwo4SsKMAA8TijHK/wvADxDKLIr6S8APDoooyvaLwA8MyiYK88vADwwKJIryy8APDAokivLLwA8MyiYK88vADw6KKMr2i8APEMosivpLwA8TijHK/wvADxcKOErCjAAPG0o/ysYMAA8gSgRLCgwADyYKCUsOjAAPLEoOixOMAA8yyhSLGMwADzoKGoseTAAPAYphCyQMAA8JSmgLKkwADxHKb0swjAAPGop2yzcMAA8kCn6LPUwADxuKdws2zAAPE8pwSzDMAA8MCmnLKwwADwTKY0sljAAPPgodSyAMAA83yhfLG0wADzHKEssWjAAPLIoOCxJMAA8oCgoLDowADyQKBksLTAAPIIoDSwhMAA8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riq6LX8xADysKrgtfTEAPKsqty17MQA8qyq3LXsxADysKrgtfTEAPK4qui1/MQA8sSq+LYIxADy1KsMthzEAPLkqyC2MMQA8wCrQLZQxADzIKtktnDEAPNEq4y2lMQA83CruLa8xADzpKvstuzEAPPcqCC7HMQA8CSsYLtQxADwZKyku4jEAPC4rOy7yMQA8QitNLgEyADyVK40uMTIAPIErey4jMgA8cStrLhUyADxgK1suCDIAPFMrTi79MQA8RitBLvExADw8KzYu5zEAPDIrKy7eMQA8KyskLtYxADwlKxsuzjEAPCErFS7JMQA8HisRLsQxADwbKw0uwDEAPBkrCS68MQA8GCsILrsxADwYKwcuuTEAPBgrBy65MQA8GCsILrsxADwZKwkuvDEAPBsrDS7AMQA8HisRLsQxADwhKxUuyTEAPCUrGy7OMQA8KyskLtYxADwyKysu3jEAPDwrNi7nMQA8RitBLvExADxTK04u/TEAPGArWy4IMgA8cStrLhUyADyBK3suIzIAPJUrjS4xMgA86ivOLmMyADzaK74uVjIAPMsrry5JMgA8viuiLj4yADyyK5UuMzIAPKkriy4qMgA8nyuALiEyADyZK3guGTIAPJQrcC4SMgA8kCtqLgsyADyOK2UuBjIAPIwrYS4CMgA8iitdLv4xADyKK1su/DEAPIorWi76MQA8iytaLvkxADyLK1ou+TEAPIorWi76MQA8iitbLvwxADyKK10u/jEAPIwrYS4CMgA8jitlLgYyADyQK2ouCzIAPJQrcC4SMgA8mSt4LhkyADyfK4AuITIAPKkriy4qMgA8siuVLjMyADy+K6IuPjIAPMsrry5JMgA82iu+LlYyADzqK84uYzIAPCIsES+WMgA8HCwDL4oyADwVLPYufzIAPA8s6i51MgA8CyzgLmwyADwHLNUuYjIAPAQszS5cMgA8AizGLlUyADwALMAuTjIAPAAsvC5JMgA8/yu3LkQyADz+K7MuQTIAPAAssi49MgA8ASywLjwyADwCLK8uOzIAPAIsry46MgA8AiyvLjoyADwCLK8uOzIAPAEssC48MgA8ACyyLj0yADz+K7MuQTIAPP8rty5EMgA8ACy8LkkyADwALMAuTjIAPAIsxi5VMgA8BCzNLlwyADwHLNUuYjIAPAss4C5sMgA8DyzqLnUyADwVLPYu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VDYUNww4ADyANZI21TcAPPM0OjaiNwA8lTT+NXk3ADxUNNM1VzcAPCY0tDU6NwA8BzSdNR83ADzgM4w1BjcAPL4zfjXvNgA8pjNzNdo2ADyWM2s1xDYAPIszZTWwNgA8wzRfNtE2ADzNNG427zYAPN00fzYONwA88TSTNi43ADwKNas2UTcAPCw1yDZ3NwA8WzXsNp43ADydNRs3xzcAPPo1Wjf4NwA8gTayNxk4ADxNNxk4PTgAPEQ4eThuOAA8OzkMObE4ADylOuM5DjkAPDU87jp/OQA86TzDO9k5ADzpPMM72TkAPDU87jp/OQA8pTrjOQ45ADw7OQw5sTgAPEQ4eThuOAA8TTcZOD04ADyBNrI3GTgAPPo1Wjf4NwA8nTUbN8c3ADxbNew2njcAPCw1yDZ3NwA8CjWrNlE3ADzxNJM2LjcAPN00fzYONwA8zTRuNu82ADzDNF820TYAPFs2jTdrNgA8dDasN5E2ADySNtA3uTYAPLg29zfiNgA86DYSOA43ADwkNyw4PjcAPHM3SzhyNwA82zdyOK03ADw2OKQ48DcAPKA46DgeOAA8PTlJOU84ADwtOtg5kDgAPJ87sDrqOAA83DznO2g5ADwqPrM8/jkAPDE/ST1yOgA8MT9JPXI6ADwqPrM8/jkAPNw85ztoOQA8nzuwOuo4ADwtOtg5kDgAPD05STlPOAA8oDjoOB44ADw2OKQ48DcAPNs3cjitNwA8czdLOHI3ADwkNyw4PjcAPOg2EjgONwA8uDb3N+I2ADySNtA3uTYAPHQ2rDeRNgA8WzaNN2s2ADxvOCQ4OjUAPJE4QDhYNQA8ujhhOHk1ADzpOIU4nTUAPCM5rzjENQA8ajngOPE1ADzEORs5JDYAPDk6ZDlgNgA81jrCOag2ADyzO0A6AjcAPHg87zp6NwA8YT3pOw84ADy5Pqk8gzgAPEpAnz0eOQA8XEG8Ps85ADwpQpE/UjoAPClCkT9SOgA8XEG8Ps85ADxKQJ89HjkAPLk+qTyDOAA8YT3pOw84ADx4PO86ejcAPLM7QDoCNwA81jrCOag2ADw5OmQ5YDYAPMQ5GzkkNgA8ajngOPE1ADwjOa84xTUAPOk4hTidNQA8ujhhOHk1ADyROEA4WDUAPG84JDg6NQA8hBCaEQITADyYEJUR4BIAPLQQlhHAEgA86hCtEbcSADw0EdIR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3iheLGIwADwVKYosgjAAPPoocyxuMAA8xChILE8wADyTKCEsMTAAPGIo7ysOMAA8HSiCK8cvADz7J0orlS8APM8nJCtyLwA8tycPK18vADy2Jw4rXi8APNAnJStzLwA8AChPK5ovADwrKJYr1S8APFso5ysNMAA8iCgZLC0wADy3KD4sSDAAPPcocSxuMAA89ChtLGgwADy+KEIsSTAAPI4oGiwrMAA8WyjhKwgwADwXKHQrui8APO0nPCuHLwA8wScWK2MvADypJwArUC8APKcn/ypPLwA8wCcVK2MvADzxJ0Ariy8APCQoiCvILwA8VCjZKwcwADyCKBMsKDAAPLMoOSxDMAA88yhtLGowADwHKXssczAAPMgoSixSMAA8oigsLDswADxsKPsrEzAAPDgopyvhLwA8FihsK6wvADz5J0Erhy8APOMnLSt0LwA84icsK3QvADz7J0MriC8APBoocSuvLwA8PSiuK+YvADxrKPkrEjAAPKMoLCw8MAA81ihSLFYwADwGKXssdDAAPDUpnyyRMAA8+ihyLHIwADzYKFcsXjAAPKgoLiw7MAA8digELBkwADxWKNMrATAAPD8oqyvfLwA8NCiYK84vADw0KJgrzS8APEAorSvhLwA8WyjZKwMwADyHKA0sHDAAPLIoMSw6MAA85yhfLGIwADwQKYAsejAAPEIppyyWMAA8eynXLL4wADxFKa0soTAAPCgpliySMAA8AClzLHQwADzSKE4sVjAAPLcoNixBMAA8qygoLDIwADykKCEsKzAAPKUoISwrMAA8sigsLDQwADzMKEEsRTAAPOgoWixbMAA8Dyl6LHYwADxAKaQsmjAAPGYpwiywMAA8kSnkLMcwADzUKR0t9TAAPLcpBC3kMAA8oSnxLNgwADxuKcssuzAAPEUpqSygMAA8OSmaLJIwADwtKY4shjAAPCgpiCyAMAA8KimJLIAwADw0KZIsiDAAPEwppSyXMAA8Yim5LKkwADyHKdkswzAAPK4p+izfMAA80ikXLfMwADz2KTMtBDEAPFUqfS0+MQA8OypoLTIxADwoKlgtKDEAPA4qPy0UMQA86SkhLfwwADzmKRkt8zAAPN0pDy3qMAA82ikLLeYwADzbKQst5TAAPOIpES3rMAA88SkfLfYwADz7KSstATEAPAcqOy0RMQA8JCpVLSYxADxIKnEt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XSvXLfMwADxIKiItmDAAPCMqEi2VMAA8ayvjLf0wADwyLFUuNzEAPEwrly3XMAA8LCuCLcswADwNLCkuHDEAPOYt9S/uMQA8Ji7+L/IxADwULugv5zEAPPktBTD6MQA83yIeJAIlADxPIewh6yIAPH4hHCIdIwA8vCIRJPkkADy/HnIg4iEAPEgavxvvHAA8dRr5GxYdADzDHn4g9yEAPLMdCiCPIQA88Bj3GskcADzGGLQalxwAPOMdKyC6IQA8yiDLIoskADxSHoAgFCIAPG4elCAsIgA8uSCwInokADwZMAgxtDIAPLowczENMwA8wzB+MRYzADwOMP4wqzIAPJwwTjFBMgA8wjLWMk8zADzEMtIyRDMAPKYwVTFCMgA8ly0uLswuADwxLxIvDy8APDcvFC8NLwA8dS0LLqouADwyKK8oSikAPAYoKih0KAA8CigtKHYoADwUKJcoOCkAPGYtCDD8MQA8XC0IMBQyADxuLRQwIDIAPFkt/i/zMQA8Ai44MI8xADynLqgwGTIAPJMunDAPMgA87S0rMIAxADzxKsIs9C0APOYqtCzOLQA85yq1LNEtADzlKros6S0APCQlKCebKAA8PSTmJZUnADw6JOEljScAPDklRCerKAA8VC0bL/kwADxSLGMutDAAPBgpiio3LAA8Lyj6KREsADxeLHEuuTAAPH0tTC8PMQA8DCjLKewrADxRKcQqUywAPC8sZy4cMQA8GyxZLh0xADxQLS8vYjEAPFQtOC9oMQA84iOtJLclADy/I58kriUAPGAhqyM3JQA8TiGSIyQlADyNL2ownDEAPKcvdzClMQA8tytALN8sADzJK08s9ywAPOAsIC8aMQA8tizoLvowADyRKHQqSiwAPJsogipTLAA8myqbLIsuADx8KpAsgy4APJMspS4wMQA8uRwvHhYgADwxLSAuuy8APHYquCy3LgA8`,sh:[.263230562210083,.337173193693161,.4469378888607025,0,.07504018396139145,.11731740087270737,.20015046000480652,0,.06246493011713028,.04090368375182152,.023904766887426376,0,-4.869847316513187e-7,-9.813811630010605e-8,-4.673687215017708e-7,0,-4.190951585769653e-8,-4.186586011201143e-8,-1.544831320643425e-7,0,.007520599290728569,.006055969744920731,.005356060341000557,0,.0523485466837883,.04828864336013794,.03812560811638832,0,2.9602961149066687e-7,4.729372449219227e-8,3.713939804583788e-7,0,.024064360186457634,.029256783425807953,.025775644928216934,0],skyIrradiance:[.0699908658862114,.11236829310655594,.19566239416599274],sunTransmittance:[.6652321219444275,.3903648853302002,.159500390291214],horizon:[.6711634397506714,.579150915145874,.35389846563339233]},{elevation:38,dataBase64:`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iDZwOXY7ADxPNk45XjsAPBg2KjlEOwA84TUHOSk7ADyqNeQ4DTsAPHY1wjjyOgA8RDWhONY6ADwVNYE4ujoAPOs0YzifOgA8xTRIOIY6ADylNDE4cDoAPIo0HjhdOgA8djQPOE86ADxoNAU4RToAPGI0ADg/OgA8YjQBOD46ADxqNAY4QjoAPHg0EThLOgA8jDQfOFc6ADylNDI4ZzoAPMM0SDh6OgA85jRgOI86ADwNNXo4pDoAPDU1lji5OgA8YDWzOM86ADyMNdA45joAPLg17jj7OgA85TULORE7ADwTNic5IzsAPEA2Qzk1OwA8zjiHOj07ADyyOGw6LDsAPJY4UToaOwA8eDg1OgY7ADxbOBk68ToAPD04+zncOgA8IDjeOcc6ADwEOME5sToAPNI3pDmbOgA8njeJOYY6ADxvN285czoAPEM3WDlgOgA8HjdDOVA6ADwANzI5QzoAPOk2Jjk5OgA82jYeOTM6ADzVNhs5MDoAPNg2HTkyOgA84zYjOTc6ADz2Ni45PzoAPBA3PjlLOgA8LzdPOVk6ADxSN2M5aDoAPHk3eDl6OgA8ojePOYs6ADzNN6c5nToAPPk3vjmvOgA8EjjVOcE6ADwoOOw50ToAPD04AjrhOgA8UjgYOvA6ADxmOCw6/zoAPN0Q3RR6GQA8lhCdFDkZADxQEF8U+BgAPBgQLRTHGAA8yA//E5gYADxkD6cTaxgAPAUPUhNAGAA8qw4AExYYADxYDrQS3RcAPAwObhKUFwA8yA0wElMXADyPDfoRGxcAPF4NzxHtFgA8OQ2sEcoWADwfDZURshYAPA8NiBGmFgA8DA2IEacWADwTDZMRtBYAPCcNqBHNFgA8Qg3JEfIWADxoDfIRIRcAPJYNJBJZFwA8yw1dEpoXADwGDp0S4RcAPEYO4hIXGAA8ig4rE0AYADzRDncTaxgAPBkPxhOWGAA8ZA8KFMIYADyyDzUU8hgAPAwQbBQvGQA8PxCiFG0ZADxFClQOLBMAPPEJCQ7fEgA8nwm+DZMSADxQCXYNSBIAPAwJOg0KEgA8ywgADc0RADyPCMcMkxEAPFUIkgxbEQA8HwhgDCcRADzfBzMM9xAAPJUHEAzTEAA8UgfkC7QQADwdB7ILmxAAPPUGkAuIEAA82gZ4C3wQADzNBm4LeBAAPM4Gcwt6EAA83AaDC4QQADz2BqIL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ESxRMBU1ADwULFAwEjUAPBcsUDAQNQA8FyxQMA41ADwXLFAwDjUAPBcsUDAQNQA8FCxQMBI1ADwRLFEwFTUAPA8sUzAaNQA8DSxWMB81ADwNLFowJzUAPA0sYDAvNQA8ECxmMDo1ADwTLG8wRTUAPBoseTBTNQA8ISyFMGI1ADwqLJEwcjUAPDUsoDCDNQA8QSyvMJY1ADxPLMAwqTUAPHYs5TDNNQA8ayzWMLs1ADxhLMgwqjUAPFcsuzCaNQA8UCyvMIs1ADxMLKYwfjUAPEgsnjBzNQA8RyyXMGg1ADxILJIwXzUAPEssjjBYNQA8TyyMMFI1ADxWLIwwTTUAPFwsjDBKNQA8YiyNMEg1ADxnLI4wRjUAPGgsjjBFNQA8aCyOMEU1ADxnLI4wRjUAPGIsjTBINQA8XCyMMEo1ADxVLIwwTTUAPE8sjDBSNQA8SyyOMFg1ADxILJIwXzUAPEcslzBoNQA8SCyeMHM1ADxMLKYwfjUAPFAsrzCLNQA8Vyy7MJo1ADxhLMgwqjUAPGss1jC7NQA8dizlMM01ADyiLA0x9DUAPJcsADHjNQA8jyzzMNM1ADyJLOgwxTUAPIQs3zC4NQA8gizWMKw1ADyCLNAwojUAPIQsyzCZNQA8iSzJMJE1ADyRLMgwjDUAPJssyDCHNQA8pyzKMIQ1ADyyLM0wgjUAPL8s0TCCNQA8xyzTMII1ADzLLNUwgTUAPMss1TCBNQA8xyzTMII1ADy/LNEwgjUAPLIszTCCNQA8pyzKMIQ1ADybLMgwhzUAPJEsyDCMNQA8iSzJMJE1ADyELMswmTUAPIIs0DCiNQA8gizWMKw1ADyELN8wuDUAPIks6DDFNQA8jyzzMNM1ADyXLAAx4zUAPKIsDTH0NQA8zyw4MRw2ADzHLCsxDTYAPMEsITH/NQA8vSwXMfI1ADy8LA8x5zUAPL0sCjHcNQA8wSwGMdM1ADzILAMxzDUAPNMsAzHGNQA84SwGMcM1ADzyLAoxwDUAPAUtEDG/NQA8GS0XMb81ADwuLR4xwDUAPDwtIzHCNQA8Qy0mMcI1ADxDLSYxwjUAPDwtIzHCNQA8Li0eMcA1ADwZLRcxvzUAPAUtEDG/NQA88iwKMcA1ADzhLAYxwzUAPNMsAzHGNQA8yCwDMcw1ADzBLAYx0zUAPL0sCjHcNQA8vCwPMec1ADy9LBcx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2wDWAVQEADzbANYBVAQAPNsA1gFUBAA82wDWAVQEADzbANYBVAQAPNsA1QFUBAA82wDWAVUEADzbANYBVAQAPNsA1gFUBAA85gDtAY0EADz3ABEC4AQAPAYBMQItBQA8BgExAi0FADwGATECLQUAPAYBMQItBQA8BgExAi0FADwNAUACUwUAPBcBVQKJBQA8DQFCAloFADwFATACLQUAPAQBLwItBQA8BQEwAi0FADwEAS8CLQUAPAIBKQIcBQA87gD+AbYEADzbANUBVAQAPNsA1QFUBAA82wDVAVQEADzbANUBVAQAPNsA1QFUBAA82wDUAVQEADzbANUBVAQAPNsA1QFUBAA82wDVAVQEADzbANUBVAQAPNsA1QFUBAA82wDVAVQEADzbANQBVAQAPNsA1QFUBAA82wDVAVQEADzbANUBVAQAPNsA1QFUBAA82wDVAVQEADzuAP4BtgQAPAIBKQIcBQA8BAEvAi0FADwFATACLQUAPAQBLwItBQA8BQEwAi0FADwNAUICWgUAPAQBLwItBQA8BAEwAi0FADwEAS8CLQUAPAQBLwItBQA8/wAkAhIFADzqAPUBoQQAPNsA1AFUBAA82wDVAVQEADzbANQBVAQAPNsA1QFUBAA82wDUAVQEADzbANQBVAQAPNsA1QFUBAA82wDVAVQEADzbANQBVAQAPNsA1AFUBAA82wDUAVQEADzbANQBVAQAPNsA1QFUBAA82wDVAVQEADzbANQBVAQAPNsA1AFUBAA82wDVAVQEADzbANQBVAQAPNsA1QFUBAA82wDUAVQEADzqAPUBoQQAPP8AJAISBQA8BAEvAi0FADwEAS8CLQUAPAQBMAItBQA8BAEvAi0FADwEATACLgUAPAQBMAItBQA8BAEwAi8FADwBASkCHQUAPOoA9QGiBAA82wDVAVUEADzbANUBVwQAPNsA1QFVBAA82wDVAVcEADzbANUBVgQAPNsA1QFYBAA82wDVAVUEADzbANUBVgQAPNsA1gFXBAA82wDVAVgEADzbANUBWQQAPNsA1QFZBAA82wDVAVgEADzbANYBVwQAPNsA1QFWBAA82wDVAVUEADzbANUBWAQAPNsA1QFWBAA82wDVAVcEADzbANUBVQQAPNsA1QFXBAA82wDVAVUEADzqAPUBogQAPAEBKQIdBQA8BAEwAi8FADwEATAC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0TRROJQ7ADy2NEU4hTsAPJ80Ojh2OwA8ijQxOGg7ADx6NCo4WzsAPG00IzhPOwA8ZTQgOEM7ADxfNB04OTsAPFs0HDgwOwA8WTQbOCg7ADxbNB04HzsAPF00HjgYOwA8ZzXXOIg7ADxlNdg4ljsAPGY12jilOwA8aTXeOLQ7ADxuNeI4xTsAPHQ15jjXOwA8fjXtOOk7ADyMNfU4/DsAPJw1/jgHPAA8sDUJORE8ADzFNRQ5GjwAPN41IDkkPAA89zUtOSw8ADwPNjg5MzwAPCE2QTk4PAA8KzZGOTs8ADwrNkY5OzwAPCE2QTk4PAA8DzY4OTM8ADz3NS05LDwAPN41IDkkPAA8xTUUORo8ADywNQk5ETwAPJw1/jgHPAA8jDX1OPw7ADx+Ne046TsAPHQ15jjXOwA8bjXiOMU7ADxpNd44tDsAPGY12jilOwA8ZTXYOJY7ADxnNdc4iDsAPBg3xzm2OwA8HjfQOc07ADwkN9o55TsAPC835Tn+OwA8PDfwOQs8ADxKN/05GDwAPFw3CzomPAA8bzcbOjU8ADyGNys6QzwAPKA3PDpRPAA8vDdNOl48ADzaN146ajwAPPY3bjp0PAA8Bzh7On48ADwQOIY6hDwAPBY4izqIPAA8FjiLOog8ADwQOIY6hDwAPAc4ezp+PAA89jduOnQ8ADzaN146ajwAPLw3TTpePAA8oDc8OlE8ADyGNys6QzwAPG83Gzo1PAA8XDcLOiY8ADxKN/05GDwAPDw38DkLPAA8LzflOf47ADwkN9o55TsAPB430DnNOwA8GDfHObY7ADzkOJ46UjsAPPU4tTppOwA8BznOOoI7ADwbOeg6nTsAPDE5BTu6OwA8STkiO9c7ADxjOUI79jsAPH45YzsLPAA8mzmGOxs8ADy6Oak7KzwAPNg5yzs7PAA89jnrO0k8ADwROgQ8VjwAPCg6EDxgPAA8OToYPGc8ADxCOhw8azwAPEI6HDxrPAA8OToYPGc8ADwoOhA8YDwAPBE6BDxWPAA89jnrO0k8ADzYOcs7OzwAPLo5qTsrPAA8mzmGOxs8ADx+OWM7CzwAPGM5Qjv2OwA8STkiO9c7ADwxOQU7ujsAPBs56DqdOwA8BznOOoI7ADz1OLU6aTsAPOQ4njpSOwA8+RDwFIkZADznENYUZRkAPNYQuxRBGQA81RCxFCwZADzYEKkUHBkAPN4QoRQLGQA85RCbFPsYADzvEJYU7BgAPPoQkxTeGAA8CBGRFNIYADwXEZEUxxgAPCgRkRS9GAA8OBGTFLcYADxFEZUUsRgAPE8RlhStGAA8VhGYFKwYADxWEZgUrBgAPE8RlhStGAA8RRGVFLEYADw4EZMUtxgAPCgRkRS9GAA8FxGRFMcYADwIEZEU0hgAPPoQkxTeGAA87xCWFOwYADzlEJsU+xgAPN4QoRQLGQA82BCpFBwZADzVELEULBkAPNcQuxRBGQA85xDWFGUZADz5EPAUiRkAPGYKag4+EwA8UgpNDhYTADw/CjAO7BIAPC4KFQ7FEgA8KgoDDqoSADwnCvUNjxIAPCYK5g12EgA8JwrYDV0SADwpCswNRRIAPC4Kwg0wEgA8OwrADSQSADxKCsANGhIAPFgKwA0SEgA8YwrBDQwSADxtCsINCBIAPHAKwg0GEgA8cArCDQYSADxtCsINCBIAPGMKwQ0MEgA8WArADRISADxKCsANGhIAPDsKwA0kEgA8LgrCDTASADwpCswNRRIAPCcK2A1dEgA8JgrmDXYSADwnCvUNjxIAPCoKAw6qEgA8LgoVDsUSADw/CjAO7BIAPFIKTQ4WEwA8ZgpqDj4TADx0B4sLSRAAPFgHYgsvEAA8QQdDCxgQADwzBygLBRAAPCAHCwvgDwA8EQfwCrgPADwEB9YKkw8APAEHyQp5DwA8/wa5CmAPADz+BqwKSQ8APP8GoQo0DwA8BAeZCiEPADwJB5MKFA8APBEHkAoLDwA8FAeQCgcPADwYB48KBA8APBgHjwoEDwA8FAeQCgcPADwRB5AKCw8APAkHkwoUDwA8BAeZCiEPADz/BqEKNA8APP4GrApJDwA8/wa5CmAPADwBB8kKeQ8APAQH1gqTDwA8EQfwCrgPADwgBwsL4A8APDMHKAsFEAA8QQdDCxgQADxYB2MLLxAAPHQHiwtJEAA8MgVNCRAOADwfBTMJ7A0APAoFFwnIDQA8+gT/CKcNADzvBO4Ijg0APOME3gh2DQA82QTNCF0NADzPBL4IRQ0APMgErQgvDQA8wASeCBsNADy6BJMIBw0APLEEhQj3DAA8sQR+COsMADyyBHsI5AwAPLYEeAjgDAA8tAR3CN0MADy0BHcI3QwAPLYEeAjgDAA8sgR7COQMADyxBH4I6wwAPLEEhQj3DAA8ugSTCAcNADzABJ4IGw0APMgErQgvDQA8zwS+CEUNADzZBM0IXQ0APOME3gh2DQA87wTuCI4NADz6BP8Ipw0APAoFFwnIDQA8HwUzCewNADwyBU0JEA4APPcDEwiuDAA84QPyB40MADzPA8IHbwwAPMADnQdXDAA8tAN6Bz8MADymA1UHJwwAPJkDOQcUDAA8kgMgBwMMADyMAwgH4gsAPIUD8gbCCwA8ggPkBq0LADx+A9YGmgsAPH0DzgaKCwA8egPGBn4LADx6A78GdAsAPHgDvQZxCwA8eAO9BnELADx6A78GdAsAPHoDxgZ+CwA8fQPOBooLADx+A9YGmgsAPIID5AatCwA8hQPyBsILADyMAwgH4gsAPJIDIAcDDAA8mQM5BxQMADymA1UHJwwAPLQDegc/DAA8wAOdB1cMADzPA8IHbwwAPOED8geNDAA89wMTCK4MADwrA40GkgsAPB0DaAZjCwA8EANGBjULADwDAyoGDwsAPPUCCwbqCgA87ALyBcQKADziAtQFoAoAPNgCuAV9CgA8zAKeBV0KADzKAo0FSQoAPMcChwU9CgA8xQJ+BTIKADzBAncFKQoAPMECcQUiCgA8wQJwBRwKADzBAmwFGQoAPMECbAUZCgA8wQJwBRwKADzBAnEFIgoAPMECdwUpCgA8xQJ+BTIKADzHAocFPQoAPMoCjQVJCgA8zAKeBV0KADzYArgFfQoAPOIC1AWgCgA87ALyBcQKADz1AgsG6goAPAMDKgYPCwA8EANGBjULADwdA2gGYwsAPCsDjQaSCwA8qAKDBWUKADyYAmIFOgoAPIoCPgUOCgA8gQImBfIJADx7AhQF3AkAPHQCAwXHCQA8agLsBKoJADxfAtYEiwkAPFUCvwRrCQA8TgKvBFUJADxOAqkETQkAPE0CpQRFCQA8TQKgBEAJADxLAp4EOgkAPEsCmgQ3CQA8SQKZBDQJADxJApkENAkAPEsCmgQ3CQA8SwKeBDoJADxNAqAEQAkAPE0CpQRFCQA8TgKpBE0JADxOAq8EVQkAPFUCvwRrCQA8XwLWBIsJADxqAuwEqgkAPHQCAwXHCQA8ewIUBdwJADyBAiYF8gkAPIoCPgUOCgA8mAJiBToKADyoAoMFZQoAPEwCyQSbCQA8QgKyBHwJADw0ApQEVgkAPCsCeQQxCQA8IQJlBBgJADwdAlsECgkAPBgCUAT8CAA8DgI6BN4IADwGAiEEwAgAPPoBCgSiCAA88QH3A4wIADztAfEDgQgAPO0B7AN5CAA86wHoA3IIADzpAecDbwgAPOgB5ANsCAA86AHkA2wIADzpAecDbwgAPOsB6ANyCAA87QHsA3kIADztAfEDgQgAPPEB9wOMCAA8+gEKBKIIADwGAiEEwAgAPA4COgTeCAA8GAJQBPwIADwdAlsECgkAPCECZQQYCQA8KwJ5BDEJADw0ApQEVgkAPEICsgR8CQA8TALJBJsJADwGAjsE9QgAPP8BLwTlCAA8/AEhBNIIADztAQIEqggAPN4B4wOECAA80gHGA2IIADzLAbwDUggAPMQBsANBCAA8vgGkAzEIADy7AZgDIwgAPLcBjgMZCAA8sQGEAwwIADywAXcDAggAPK4BcQP3BwA8qwFtA+4HADytAW4D6gcAPK0BbgPqBwA8qwFtA+4HADyuAXED9wcAPLABdwMCCAA8sQGEAwwIADy3AY4DGQgAPLsBmAMjCAA8vgGkAzEIADzEAbADQQgAPMsBvANSCAA80gHGA2IIADzeAeMDhAgAPO0BAgSqCAA8/AEhBNIIADz/AS8E5QgAPAYCOwT1CAA80QHQA3sIADzDAa8DUQgAPLgBnwM8CAA8sQGTAykIADyqAYMDFQgAPKYBcwMCCAA8nAFjA+EHADyYAVMDvgcAPJQBRQOgBwA8jgE4A4EHADyIASsDZwcAPIQBJwNNBwA8gQEfAzsHADx/ARgDKgcAPH0BEwMhBwA8fAETAxsHADx8ARMDGwcAPH0BEwMhBwA8fwEYAyoHADyBAR8DOwcAPIQBJwNNBwA8iAErA2cHADyOATgDgQcAPJQBRQOgBwA8mAFTA74HADycAWMD4QcAPKYBcwMCCAA8qgGDAxUIADyxAZMDKQgAPLgBnwM8CAA8wwGvA1EIADzRAdADewgAPKEBeQMSCAA8mgFnA/wHADyQAVgD0wcAPIwBRgOqBwA8hAE1A4IHADx9ASUDXAcAPHcBFgM1BwA8cwEGAxIHADxtAfcC8AYAPGgB6wLSBgA8YgHjArUGADxeAdkCoAYAPFsB0gKMBgA8WAHLAnwGADxXAcoCcQYAPFYBxwJrBgA8VgHHAmsGADxXAcoCcQYAPFgBywJ8BgA8WwHSAowGADxeAdkCoAYAPGIB4wK1BgA8aAHrAtIGADxtAfcC8AYAPHMBBgMSBwA8dwEWAzUHADx9ASUDXAcAPIQBNQOCBwA8jAFGA6oHADyQAVgD0wcAPJoBZwP8BwA8oQF5AxIIADyBATcDkAcAPHoBJgNnBwA8dAEVA0EHADxsAQMDGAcAPGQB8ALsBgA8WwHiAsUGADxVAdQCngYAPFABxQJ7BgA8RwG4AlkGADxDAasCOgYAPD8BngIcBgA8OgGTAgQGADw3AYsC8QUAPDYBhQLjBQA8NwGFAuMFADw2AYUC4wUAPDYBhQLjBQA8NwGFAuMFADw2AYUC4wUAPDcBiwLxBQA8OgGTAgQGADw/AZ4CHAYAPEMBqwI6BgA8RwG4AlkGADxQAcUCewYAPFUB1AKeBgA8WwHiAsUGADxkAfAC7AYAPGwBAwMYBwA8dAEVA0EHADx6ASYDZwcAPIEBNwOQBwA8agH7AhAHADxkAeoC4wYAPFkB1QK8BgA8UwHFAo8GADxJAbgCZgYAPEUBqAI9BgA8PAGbAhgGADw2AYkC8QUAPC8BegLPBQA8LgF5As4FADwvAXsCzgUAPC8BewLRBQA8LwF6AtEFADwtAXcCxgUAPCoBcgK7BQA8KQFxArUFADwpAXECtQUAPCoBcgK7BQA8LQF3AsYFADwvAXoC0QUAPC8BewLRBQA8LwF7As4FADwuAXkCzgUAPC8BegLPBQA8NgGJAvEFADw8AZsCGAYAPEUBqAI9BgA8SQG4AmYGADxTAcUCjwYAPFkB1QK8BgA8ZAHqAuMGADxqAfsCEAcAPFABxwKWBgA8SQG2AmwGADxCAacCQgYAPDoBlwIYBgA8MwGGAu0FADwsAXUCxAUAPCoBcwK+BQA8LAFzAr4FADwrAXMCwAUAPCYBZwKjBQA8IAFcAoYFADwZAVECbgUAPBQBSwJWBQA8FwFHAkwFADwWAUcCTQUAPBYBRwJOBQA8FgFHAk4FADwWAUcCTQUAPBcBRwJMBQA8FAFLAlYFADwZAVECbgUAPCABXAKGBQA8JgFnAqMFADwrAXMCwAUAPCwBcwK+BQA8KgFzAr4FADwsAXUCxAUAPDMBhgLtBQA8OgGXAhgGADxCAacCQgYAPEkBtgJsBgA8UAHHApYGADw5AZwCKgYAPDIBiwL+BQA8KgF4AtMFADwlAWwCsgUAPCYBbAKzBQA8JgFuArQFADwiAWMCnAUAPBoBUwJ2BQA8EwFDAlEFADwRAT8CQwUAPBABPwJGBQA8EAE+AkUFADwRAT8CRAUAPBIBQAJEBQA8EgFBAkYFADwRAUECRwUAPBEBQQJHBQA8EgFBAkYFADwSAUACRAUAPBEBPwJEBQA8EAE+AkUFADwQAT8CRgUAPBEBPwJDBQA8EwFDAlEFADwaAVMCdgUAPCIBYwKcBQA8JgFuArQFADwmAWwCswUAPCUBbAKyBQA8KgF4AtMFADwyAYsC/gUAPDkBnAIqBgA8JgFvAsQFADwiAWUCqQUAPCIBZQKrBQA8IgFmAqkFADwaAVcChgUAPBEBRgJcBQA8CwE5AjwFADwLATkCPAUAPAsBOQI8BQA8DAE6Aj4FADwMAToCPgUAPAwBOQI9BQA8DQE6Aj0FADwMAToCPgUAPA0BOwI/BQA8DAE7Aj8FADwMATsCPwUAPA0BOwI/BQA8DAE6Aj4FADwNAToCPQUAPAwBOQI9BQA8DAE6Aj4FADwMAToCPgUAPAsBOQI8BQA8CwE5AjwFADwLATkCPAUAPBEBRgJcBQA8GgFXAoYFADwiAWYCqQUAPCIBZQKrBQA8IgFlAqkFADwmAW8CxAUAPAIskjCSNQA83it9MHw1ADy5K2kwZzUAPJQrVTBSNQA8dCtDMEA1ADxVKzIwLTUAPDcrIjAdNQA8HisVMA41ADwGKwgw/zQAPO8q9y/yNAA83irkL+g0ADzPKtMv3zQAPMIqxi/YNAA8uCq7L9I0ADyyKrQvzjQAPK4qsC/MNAA8riqwL8w0ADyyKrQvzjQAPLgquy/SNAA8wirGL9g0ADzPKtMv3zQAPN4q5C/oNAA87yr3L/I0ADwGKwgw/zQAPB4rFTAONQA8NysiMB01ADxVKzIwLTUAPHQrQzBANQA8lCtVMFI1ADy5K2kwZzUAPN4rfTB8NQA8AiySMJI1ADw0LMcwyTUAPCAssTCyNQA8DCybMJs1ADzxK4YwhjUAPM4rdDByNQA8qythMF41ADyMK1AwTTUAPHArQTA9NQA8VSsyMC01ADw+KyYwIDUAPCsrGzAUNQA8GisSMAo1ADwMKwswAjUAPAErBTD8NAA8+ioBMPg0ADz3Kv8v9jQAPPcq/y/2NAA8+ioBMPg0ADwBKwUw/DQAPAwrCzACNQA8GisSMAo1ADwrKxswFDUAPD4rJjAgNQA8VSsyMC01ADxwK0EwPTUAPIwrUDBNNQA8qythMF41ADzOK3QwcjUAPPErhjCGNQA8DCybMJs1ADwgLLEwsjUAPDQsxzDJNQA8cCwGMQg2ADxaLO8w8TUAPEQs1zDZNQA8LyzBMMI1ADwcLK0wrTUAPAksmDCYNQA88SuHMIU1ADzTK3YwdDUAPLUrZjBjNQA8nStZMFY1ADyIK00wSTUAPHUrRDA+NQA8ZSs7MDU1ADxbKzUwLzUAPFQrMTArNQA8UCsvMCk1ADxQKy8wKTUAPFQrMTArNQA8Wys1MC81ADxlKzswNTUAPHUrRDA+NQA8iCtNMEk1ADydK1kwVjUAPLUrZjBjNQA80yt2MHQ1ADzxK4cwhTUAPAksmDCYNQA8HCytMK01ADwvLMEwwjUAPEQs1zDZNQA8WizvMPE1ADxwLAYxCDYAPLgsUTFTNgA8oCw4MTo2ADyILB8xITYAPHEsBzEJNgA8XCzxMPM1ADxILNsw3DUAPDYsyDDJNQA8JSy2MLY1ADwWLKUwpDUAPAkslzCWNQA8+iuKMIg1ADzlK38wfDUAPNQrdjBzNQA8yCtwMGw1ADzBK2swaDUAPL0raTBmNQA8vStpMGY1ADzBK2swaDUAPMgrcDBsNQA81Ct2MHM1ADzlK38wfDUAPPorijCINQA8CSyXMJY1ADwWLKUwpDUAPCUstjC2NQA8NizIMMk1ADxILNsw3DUAPFws8TDzNQA8cSwHMQk2ADyILB8xITYAPKAsODE6NgA8uCxRMVM2ADwNLaoxqjYAPPQskDGQNgA82ix1MXY2ADzBLFsxXTYAPKssQzFFNgA8lSwsMS02ADyBLBcxGDYAPG8sAzEFNgA8XizxMPI1ADxPLOIw4jUAPEMs1DDUNQA8OCzJMMg1ADwvLL8wvjUAPCgsuDC2NQA8JCyzMLI1ADwhLLEwrzUAPCEssTCvNQA8JCyzMLI1ADwoLLgwtjUAPC8svzC+NQA8OCzJMMg1ADxDLNQw1DUAPE8s4jDiNQA8XizxMPI1ADxvLAMxBTYAPIEsFzEYNgA8lSwsMS02ADyrLEMxRTYAPMEsWzFdNgA82ix1MXY2ADz0LJAxkDYAPA0tqjGqNgA8di0XMhE3ADxaLfkx9TYAPD4t3THaNgA8Iy3AMb42ADwLLacxpjYAPPQsjjGONgA83Sx3MXc2ADzKLGIx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OjoAPH8ykzY3OgA8cjKJNjU6ADxnMoE2NDoAPF8yezYyOgA8WjJ3NjE6ADxXMnQ2MDoAPFUycjYwOgA8VTJyNjA6ADxXMnQ2MDoAPFoydzYxOgA8XzJ7NjI6ADxnMoE2NDoAPHIyiTY1OgA8fzKTNjc6ADyNMp02OjoAPJsyqDY9OgA8rDK1NkA6ADzBMsQ2QzoAPNYy0zZGOgA86zLjNko6ADwBM/Q2TjoAPBwzBjdSOgA8NTMZN1Y6ADylNFA46joAPJc0SjjvOgA8jTREOPI6ADyCND849zoAPHg0OTj8OgA8bjQ0OAE7ADxlNDA4BjsAPF40LDgKOwA8VzQoOA87ADxQNCU4EzsAPEo0IjgXOwA8RjQgOBs7ADxDNB44HjsAPEA0HTghOwA8PjQdOCI7ADw+NBw4IzsAPD40HDgjOwA8PjQdOCI7ADxANB04ITsAPEM0HjgeOwA8RjQgOBs7ADxKNCI4FzsAPFA0JTgTOwA8VzQoOA87ADxeNCw4CjsAPGU0MDgGOwA8bjQ0OAE7ADx4NDk4/DoAPII0Pzj3OgA8jTREOPI6ADyYNEo47zoAPKU0UDjqOgA8UzZSOUQ7ADxNNlQ5VDsAPEc2VjlkOwA8QjZZOXM7ADw+Nls5gzsAPDo2XTmTOwA8NzZgOaQ7ADwzNmQ5tTsAPDA2ZznFOwA8MDZqOdM7ADwvNm054TsAPC82cDntOwA8LjZzOfc7ADwuNnU5/zsAPC02djkCPAA8LTZ3OQQ8ADwtNnc5BDwAPC02djkCPAA8LjZ1Of87ADwuNnM59zsAPC82cDntOwA8LzZtOeE7ADwwNmo50zsAPDA2ZznFOwA8MzZkObU7ADw3NmA5pDsAPDo2XTmTOwA8PjZbOYM7ADxCNlk5czsAPEc2VjlkOwA8TTZUOVQ7ADxTNlI5RDsAPHQ4PToPOwA8fDhMOiI7ADyFOF06NjsAPI44bjpKOwA8mDiBOmA7ADyjOJQ6djsAPK04pzqNOwA8uDi7OqM7ADzDOM46ujsAPM444TrPOwA81zjyOuM7ADzgOAE79TsAPOg4DjsCPAA87TgYOwg8ADzxOB47DDwAPPM4IjsOPAA88zgiOw48ADzxOB47DDwAPO04GDsIPAA86DgOOwI8ADzgOAE79TsAPNc48jrjOwA8zjjhOs87ADzDOM46ujsAPLg4uzqjOwA8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`,sh:[.28046995401382446,.5108294486999512,.9437533020973206,0,.10005746781826019,.19689488410949707,.42202815413475037,0,.04247172921895981,.05414622649550438,.07363062351942062,0,2.5060339226001815e-7,-3.383805591283817e-8,-3.1882277085060196e-7,0,2.7794158086180687e-8,4.17057890444994e-8,6.949994713068008e-8,0,.014749713242053986,.019393589347600937,.028128914535045624,0,.03364991024136543,.05016634240746498,.06522612273693085,0,2.7795613277703524e-7,1.8834543880075216e-7,3.630848368629813e-7,0,.025100305676460266,.04347427189350128,.059231050312519073,0],skyIrradiance:[.09498874843120575,.18924234807491302,.41096678376197815],sunTransmittance:[.9069068431854248,.7963363528251648,.6462550759315491],horizon:[.5587837100028992,.794365644454956,.9104742407798767]},{elevation:75,dataBase64:`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uTUiOb87ADyfNRM5uDsAPIY1AzmxOwA8bDX0OKo7ADxTNeQ4ozsAPDs11TibOwA8IzXGOJQ7ADwONbg4izsAPPs0qziDOwA86jSfOHs7ADzbNJU4czsAPM80jDhtOwA8xTSFOGc7ADy/NIE4YzsAPLs0fjhgOwA8uzR+OF47ADy+NIA4XjsAPMU0hDheOwA8zzSKOGE7ADzaNJI4ZDsAPOk0mzhpOwA8+TSnOG47ADwMNbI4cjsAPCE1vzh2OwA8NjXLOHs7ADxMNdo4gTsAPGM15ziGOwA8ejX2OIw7ADySNQM5jzsAPKs1EDmTOwA8FzgVOpE7ADwPOBA6kDsAPAg4CjqPOwA8/zcFOo87ADzvN/85jTsAPN83+TmMOwA8zzfzOYs7ADy/N+45iTsAPLA36DmIOwA8oTfiOYY7ADyUN905hDsAPIc32DmCOwA8ezfTOYA7ADxyN845fjsAPGo3yzl8OwA8ZjfIOXo7ADxjN8c5eTsAPGM3xzl5OwA8ZjfIOXc7ADxrN8o5eDsAPHI3zDl3OwA8ezfPOXc7ADyEN9I5eDsAPI831jl4OwA8mzfaOXg7ADyoN985eDsAPLU34zl5OwA8wjfnOXk7ADzRN+w5eTsAPN838Tl6OwA87Tf1OXo7ADz6N/o5ejsAPBAQmRTYGQA80g9tFKEZADyDD0EUahkAPEkPIRRDGQA8FQ8EFB8ZADziDtAT/BgAPLAOmhPZGAA8fw5kE7gYADxRDjITmBgAPCcOAxN8GAA8AA7aEmEYADzfDbUSShgAPMMNlhI3GAA8rQ1+EikYADyeDW8SHxgAPJYNZxIbGAA8lQ1nEhsYADycDW8SIBgAPKkNfxIqGAA8vQ2XEjoYADzXDbYSTRgAPPYN2xJkGAA8Gw4EE38YADxDDjITnRgAPG4OZRO8GAA8mw6YE94YADzLDs8TABkAPPwOBBQkGQA8LA8gFEgZADxjDz8UcBkAPK0PahSnGQA8+A+WFN4ZADxYCRAOuhMAPCoJ3Q16EwA8/QirDTsTADzQCHsN/BIAPK0IUg3LEgA8iggrDZoSADxoCAYNaxIAPEgI4gw9EgA8KQi/DBMSADwNCJ8M6xEAPPIHiQzPEQA8zAd2DLcRADyvB2YMoxEAPJkHWgyUEQA8igdSDIoRADyDB08MhhEAPIUHUQyIEQA8kAdXDJARADyiB2IM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9DoAPIcznzcEOwA8sDO/NxM7ADzbM+E3JDsAPAQ0Ajg0OwA8HTQVOEI7ADw1NCc4UTsAPE00OThgOwA8ZTRLOG07ADx+NF44ejsAPKs1EDmTOwA8kjUDOY87ADx6NfY4jDsAPGM15ziGOwA8TDXaOIE7ADw2Ncs4ezsAPCE1vzh2OwA8DDWyOHI7ADz5NKc4bjsAPOk0mzhpOwA82jSSOGQ7ADzPNIo4YTsAPMU0hDheOwA8vjSAOF47ADy7NH44XjsAPLs0fjhgOwA8vzSBOGM7ADzFNIU4ZzsAPM80jDhtOwA82zSVOHM7ADzqNJ84ezsAPPs0qziDOwA8DjW4OIs7ADwjNcY4lDsAPDs11TibOwA8UzXkOKM7ADxsNfQ4qjsAPIY1AzmxOwA8nzUTObg7ADy5NSI5vzsAPNM1MTnDOwA87TU/Occ7ADz6N/o5ejsAPO039Tl6OwA83zfxOXo7ADzRN+w5eTsAPMI35zl5OwA8tTfjOXk7ADyoN985eDsAPJs32jl4OwA8jzfWOXg7ADyEN9I5eDsAPHs3zzl3OwA8cjfMOXc7ADxrN8o5eDsAPGY3yDl3OwA8YzfHOXk7ADxjN8c5eTsAPGY3yDl6OwA8ajfLOXw7ADxyN845fjsAPHs30zmAOwA8hzfYOYI7ADyUN905hDsAPKE34jmGOwA8sDfoOYg7ADy/N+45iTsAPM838zmLOwA83zf5OYw7ADzvN/85jTsAPP83BTqPOwA8CDgKOo87ADwPOBA6kDsAPBc4FTqROwA8+A+WFN4ZADytD2oUpxkAPGMPPxRwGQA8LA8gFEgZADz8DgQUJBkAPMsOzxMAGQA8mw6YE94YADxuDmUTvBgAPEMOMhOdGAA8Gw4EE38YADz2DdsSZBgAPNcNthJNGAA8vQ2XEjoYADypDX8SKhgAPJwNbxIgGAA8lQ1nEhsYADyWDWcSGxgAPJ4NbxIfGAA8rQ1+EikYADzDDZYSNxgAPN8NtRJKGAA8AA7aEmEYADwnDgMTfBgAPFEOMhOYGAA8fw5kE7gYADywDpoT2RgAPOIO0BP8GAA8FQ8EFB8ZADxJDyEUQxkAPIMPQRRqGQA80g9tFKEZADwQEJkU2BkAPF8JKw7hEwA8Mwn3DaATADwECcQNXxMAPNgIkw0fEwA8tghqDewSADyVCEMNuRIAPHIIHA2IEgA8UQj1DFgSADwyCNMMKxIAPBcIsQwCEgA8AQiYDOIRADzcB4MMxhEAPLwHcAywEQA8ogdiDJ0RADyQB1cMkBEAPIUHUQyIEQA8gwdPDIYRADyKB1IMihEAPJkHWgyUEQA8rwdmDKMRADzMB3YMtxEAPPIHiQzPEQA8DQifDOsRADwpCL8MExIAPEgI4gw9EgA8aAgGDWsSADyKCCoNmhIAPK0IUg3LEgA80Ah7DfwSADz9CKsNOxMAPCoJ3Q16EwA8WAkQDroTADyMBoMLyhAAPFQGQwuhEAA8JAYKC30QADz1BdYKXBAAPMgFogo6EAA8mQVrChgQADxvBTwK8Q8APEkFEgq9DwA8JgXoCYsPADwGBcMJXQ8APOgEoQkzDwA8zASECQwPADy4BGsJ7g4APKsEWQnYDgA8oQRKCcYOADyZBEMJvA4APJUEQAm4DgA8lQRBCbwOADyaBEkJxQ4APKUEVAnUDgA8tQRnCesOADzMBIEJCg8APOYEngkvDwA8BAW9CVcPADwkBeAJhA8APEUFBgqzDwA8bwUzCu4PADycBWQKFhAAPMwFlwo3EAA8+gXKClcQADwqBv8KeRAAPF8GPAufEAA8xwR5CfYOADyhBE8JwA4APH0EJAmJDgA8WgT8CFYOADw9BNoIKg4APBwEuQj/DQA8AgSXCNUNADzmA3gIrA0APMkDWAiGDQA8rgM5CGANADyYAyAIPg0APIQDCAggDQA8dAPkBwkNADxmA8sH9wwAPFwDtQfqDAA8VgOnB+IMADxUA58H3wwAPFMDnwffDAA8VwOmB+QMADxfA7YH7gwAPGkDzAf/DAA8eAP1BxYNADyMAxAIMQ0APKEDKAhQDQA8uQNDCHINADzSA18Ilg0APOwDfQi7DQA8CASbCOINADwkBLoICg4APEUE3wg5DgA8agQHCW0OADyOBC8JoA4APNEDXgiHDQA8rgM2CFgNADyQAxMILA0APHYD6wcGDQA8WwOxB+AMADxCA3gHuwwAPC0DQgebDAA8GAMRB3wMADwEA+MGXgwAPPECuAZDDAA84wKVBi0MADzVAnUGGQwAPMcCWwYIDAA8vQJCBvULADy2AjAG3gsAPLICJAbPCwA8rgIcBscLADysAhsGyAsAPK0CIgbOCwA8sgItBtwLADy5AjoG8AsAPMMCTQYFDAA8zQJjBhUMADzaAoQGKgwAPOoCpwZCDAA8/ALQBlwMADwQA/gGdgwAPCYDLQeYDAA8PQNjB7oMADxVA5oH2wwAPHED2wcEDQA8kAMRCDENADwwA0cHmQwAPBkDEQd2DAA8AgPeBlYMADztAq8GOAwAPNkCgQYaDAA8wgJUBvkLADyuAiUGwQsAPJ0C9wWJCwA8jALMBVYLADx/Aq8FMAsAPHQClgUUCwA8agJ+BfkKADxhAm0F4goAPFgCWQXOCgA8UgJNBb4KADxNAkMFrwoAPEoCOgWoCgA8SAI2BacKADxIAjUFqAoAPEoCOQWtCgA8TwJCBbYKADxTAk4FxAoAPFgCXAXUCgA8YQJtBe4KADxvAowFFwsAPH4CrwVDCwA8jwLWBXMLADyfAvsFpQsAPLACIwbYCwA8wQJLBgYMADzVAnkGIwwAPOwCqwZEDAA8yQJYBvwLADy0AiYGvwsAPJ8C8gWBCwA8kALQBVULADyCArAFMAsAPHQCkgULCwA8ZQJwBd0KADxUAkgFrAoAPEQCKgV9CgA8NwILBVgKADwvAvYEQgoAPCkC5wQvCgA8IALYBB0KADwbAsoEDQoAPBYCvwQACgA8EwK2BPYJADwQAq8E7QkAPA4CqQTpCQA8DAKmBOcJADwKAqkE6AkAPAsCqgTtCQA8DQKvBPQJADwRArQE/gkAPBgCyAQXCgA8JALhBDoKADwwAvwEYAoAPDsCFgWFCgA8RQIsBaAKADxPAkUFvQoAPFoCYwXkCgA8bgKPBRoLADyCArsFUAsAPIQCtQUxCwA8dAKSBQQLADxiAmYFzgoAPE4CPAWYCgA8QgIlBXUKADw5AhAFWwoAPDAC+QRACgA8IwLaBBYKADwTArIE5gkAPAMCjQS6CQA89AFzBJUJADzsAWEEgQkAPOcBVARuCQA84QFGBF0JADzcATwEUAkAPNcBMgRGCQA81QErBDwJADzTAScEOgkAPNEBJAQ5CQA80QEiBDsJADzSASAEPwkAPNUBJgRHCQA83QE6BGAJADzoAVQEgAkAPPUBbwSjCQA8/gGHBMIJADwDApQE1AkAPAgCogTlCQA8EgK2BAIKADwgAtcELwoAPC4C+AReCgA8OwIXBYUKADxLAjQFhgoAPEMCIAVsCgA8OgIMBVIKADwnAuMEGwoAPBUCtgTlCQA8BQKSBLUJADz7AX4EmgkAPPEBaAR/CQA85QFVBGUJADzeAUIETQkAPNYBLgQ2CQA8zQEZBCIJADzHAQoEDgkAPMAB/gP+CAA8uwHyA/EIADy3AeYD5wgAPLUB4QPfCAA8sgHdA9sIADyxAd0D2wgAPLEB4APcCAA8sgHhA+EIADyzAeYD6AgAPLYB7QP0CAA8ugH4AwAJADzBAQEEEAkAPMcBCwQhCQA8zAEVBDIJADzaATMEWgkAPOkBVgSGCQA89wF4BLMJADz+AYkEyAkAPAQCmQTeCQA8JALWBAsKADwRAqwE0wkAPAYClQS0CQA8/AGBBJgJADzxAWsEfAkAPOYBVQRgCQA83QE9BEUJADzTASIEKgkAPMsBEQQQCQA8xAH9A/gIADy8AeoD4QgAPLUB2QPMCAA8rQHJA7gIADynAbwDqAgAPKEBsAObCAA8nAGlA5AIADyaAZ4DiQgAPJgBmQOFCAA8mAGbA4UIADyXAZoDhwgAPJgBoQOOCAA8mgGkA5cIADydAasDoQgAPJ8BtQOuCAA8owG/A7wIADyqAcsDzggAPK8B2wPfCAA8tgHoA/EIADy9AfcDBwkAPMQBBwQbCQA8zQEYBDQJADzcAT0EZAkAPAAChgSfCQA88wFyBIMJADzrAVsEaAkAPOIBQgRLCQA82gErBC0JADzPARcEEgkAPMYB/AP4CAA8vAHnA9wIADyyAdMDwQgAPKwBvgOnCAA8ogGuA5AIADybAZ4DfAgAPJIBjwNpCAA8jgGDA1oIADyJAXgDTAgAPIUBcANCCAA8ggFoAzwIADx/AWUDOQgAPIABYgM4CAA8fwFiAzsIADyBAWUDQAgAPIMBaQNICAA8ggFyA1QIADyIAXsDYAgAPI0BhQNwCAA8kQGRA4IIADyWAZ0DlAgAPJ0BrQOkCAA8pAG8A7UIADyrAc4DzQgAPLIB3wPlCAA8ugHvA/sIADznAVEEWAkAPN4BOgQ8CQA81QEjBCAJADzLAQ0EAwkAPMIB9APlCAA8tgHcA8kIADyuAccDrQgAPKUBswORCAA8nAGfA3cIADyUAYoDXggAPIwBdwNHCAA8hAFlAzEIADx+AVQDHQgAPHkBRgMQCAA8eQFBAwsIADxzAT0DBQgAPHEBOAP+BwA8bwEyA+4HADxrASgD4QcAPGgBKQPjBwA8awEvA+8HADxtATUDAggAPG4BPQMNCAA8cwFKAxsIADx3AVIDKggAPHsBXAM6CAA8ggFpA00IADyHAXcDYAgAPI0BhwN1CAA8lAGXA4oIADybAagDnwgAPKIBuQO2CAA81QEfBBcJADzJAQQE+ggAPL8B7APbCAA8tAHWA74IADyrAbwDoggAPKEBqQOECAA8mgGWA2cIADyPAX8DTAgAPIYBYwMxCAA8hgFkAy4IADyEAV8DLAgAPIMBXgMqCAA8gQFaAyUIADx9AVMDGAgAPHcBRgMLCAA8cwE8AwEIADxxATUD9QcAPG0BMgPuBwA8bwEzA/AHADxvATED7gcAPGsBKQPhBwA8ZwEhA9IHADxiARoDvgcAPF4BFAOyBwA8ZAEfA9AHADxnAS0D9AcAPG0BOwMOCAA8cwFJAyAIADx5AVUDNQgAPIABZANKCAA8hgF1A2AIADyMAYgDdwgAPL4B5gPXCAA8tAHVA7oIADysAcIDnQgAPKABrgN+CAA8lwGOA2EIADyPAXgDQggAPI8BdgM+CAA8jAF3Az8IADyOAXUDPggAPIQBZgMnCAA8eQFMAw4IADxzAT4D8gcAPG0BMgPLBwA8aAEkA7kHADxlASADrgcAPGMBHAOiBwA8XgEXA5YHADxbAQ8DhwcAPFkBBwN6BwA8VQEIA3YHADxZAQwDhAcAPF0BDwOZBwA8YQEWA7AHADxmAR8DyAcAPGEBFwO4BwA8XAENA6gHADxbAQsDoQcAPGEBHAPJBwA8ZwEsA/UHADxuATsDDwgAPHQBSQMlCAA8ewFXAzoIADyqAcMDnAgAPKIBqgN+CAA8mAGPA18IADyQAX0DSQgAPJEBgQNLCAA8kwGAA0wIADyMAXEDOggAPIABXgMdCAA8dgFHAwAIADxwAT4D6gcAPHABPQPmBwA8cAE6A+IHADxtATgD2gcAPG0BNAPRBwA8bAEzA8gHADxpASYDvQcAPGcBIwOvBwA8YgEdA6MHADxdARcDkwcAPFoBDwOCBwA8WAEGA3QHADxUAf4CYwcAPFEB9gJUBwA8UQH1AlYHADxXAQEDeAcAPFwBDwOdBwA8XwEUA68HADxcAQwDoQcAPFkBBAOQBwA8WwEQA60HADxiASID2gcAPGsBMgMECAA8mQGTA2IIADyVAYUDUQgAPJYBiANUCAA8lgGMA1YIADyNAXUDOwgAPIIBXwMbCAA8eAFMAwMIADx4AUsDAwgAPHkBTAMDCAA8eAFKAwIIADx2AUgD/wcAPHYBRgP7BwA8cwFDA/QHADxxAT4D6wcAPG8BOgPgBwA8bQE3A9UHADxtATEDyQcAPGoBKgO6BwA8ZQEgA64HADxhARkDnQcAPF0BEAONBwA8WgEJA3sHADxTAQUDbAcAPFIB/AJbBwA8TwHyAkkHADxLAeoCOQcAPFEB9QJXBwA8WAEDA4IHADxeAQ8DpQcAPFkBBQOXBwA8VAEBA4gHADxYAQkDnwcAPMMsgTHKNgA8sixuMbU2ADyiLFwxoTYAPJQsSzGONgA8hSw6MXs2ADx4LCsxajYAPGwsHTFaNgA8YiwQMUs2ADxYLAUxPzYAPFAs+zA0NgA8SCzyMCk2ADxCLOswITYAPD0s5TAaNgA8OSzhMBU2ADw3LN4wEjYAPDYs3TAQNgA8NizdMBA2ADw3LN4wEjYAPDks4TAVNgA8PSzlMBo2ADxCLOswITYAPEgs8jApNgA8UCz7MDQ2ADxYLAUxPzYAPGIsEDFLNgA8bCwdMVo2ADx4LCsxajYAPIUsOjF7NgA8lCxLMY42ADyiLFwxoTYAPLIsbjG1NgA8xCyBMco2ADy6LHUxvDYAPKksYjGnNgA8mSxQMZI2ADyKLD4xfjYAPHwsLjFsNgA8byweMVo2ADxjLBExSzYAPFksBDE8NgA8Tyz4MC82ADxHLO8wJDYAPD8s5jAZNgA8OSzeMBA2ADw0LNkwCjYAPDEs1DAFNgA8LyzSMAE2ADwuLNAwADYAPC4s0DAANgA8LyzSMAE2ADwxLNQwBTYAPDQs2TAKNgA8OSzeMBA2ADw/LOYwGTYAPEcs7zAkNgA8Tyz4MC82ADxZLAQxPDYAPGMsETFLNgA8byweMVo2ADx8LC4xbDYAPIosPjF/NgA8mSxQMZI2ADypLGIxpzYAPLosdTG8NgA8sixrMbA2ADyiLFgxmjYAPJEsRTGFNgA8gyw0MXE2ADx1LCMxXjYAPGgsFDFNNgA8WywGMT02ADxSLPkwLjYAPEgs7jAhNgA8PyzkMBU2ADw5LNswCzYAPDMs1DACNgA8LizOMPs1ADwrLMow9jUAPCksxzDzNQA8KCzGMPE1ADwoLMYw8TUAPCksxzDzNQA8KyzKMPY1ADwuLM4w+zUAPDMs1DACNgA8OSzbMAs2ADw/LOQwFTYAPEgs7jAhNgA8Uiz5MC42ADxbLAYxPTYAPGgsFDFNNgA8dSwjMV42ADyDLDQxcTYAPJEsRTGFNgA8oixYMZo2ADyyLGsxsDYAPKwsYjGlNgA8myxOMY82ADyMLDwxejYAPHwsKzFmNgA8bywbMVM2ADxiLAsxQTYAPFcs/TAxNgA8TCzwMCI2ADxELOYwFTYAPDss3DAJNgA8NCzTMP41ADwvLMww9jUAPCssxjDvNQA8JyzCMOk1ADwlLL8w5jUAPCQsvjDkNQA8JCy+MOQ1ADwlLL8w5jUAPCcswjDpNQA8KyzGMO81ADwvLMww9jUAPDQs0zD+NQA8OyzcMAk2ADxELOYwFTYAPEws8DAiNgA8Vyz9MDE2ADxiLAsxQTYAPG8sGzFTNgA8fCwrMWY2ADyMLDwxejYAPJssTjGPNgA8rCxiMaU2ADyoLFsxmzYAPJcsSDGGNgA8hyw1MXA2ADx5LCQxXDYAPGssFDFJNgA8XywFMTg2ADxULPcwJzYAPEos6jAYNgA8QSzfMAs2ADw5LNYw/zUAPDIszTD1NQA8LizGMOw1ADwqLMEw5TUAPCYsvTDgNQA8JCy5MN01ADwjLLgw2zUAPCMsuDDbNQA8JCy5MN01ADwmLL0w4DUAPCoswTDlNQA8LizGMOw1ADwyLM0w9TUAPDks1jD/NQA8QSzfMAs2ADxKLOowGDYAPFQs9zAnNgA8XywFMTg2ADxrLBQxSTYAPHksJDFcNgA8hyw1MXA2ADyXLEgxhjYAPKgsWzGbNgA8pSxWMZQ2ADyULEMxfjYAPIUsMDFpNgA8diwfMVQ2ADxqLA8xQjYAPF4sADEwNgA8UyzzMCA2ADxKLOYwETYAPEEs2zADNgA8OyzSMPc1ADw1LMow7jUAPC8swzDlNQA8LCy+MN41ADwpLLow2TUAPCcstzDVNQA8Jiy1MNM1ADwmLLUw0zUAPCcstzDVNQA8KSy6MNk1ADwsLL4w3jUAPC8swzDlNQA8NSzKMO41ADw7LNIw9zUAPEEs2zADNgA8SizmMBE2ADxTLPMwIDYAPF4sADEwNgA8aiwPMUI2ADx2LB8xVDYAPIUsMDFpNgA8lCxDMX42ADylLFYxlDYAPKQsUjGONgA8lCw/MXg2ADyELCwxYzYAPHcsHDFPNgA8aiwMMTw2ADxfLP4wKzYAPFUs8DAbNgA8TCzkMAs2ADxFLNow/jUAPD4s0DDyNQA8OizJMOk1ADw1LMMw4DUAPDMsvjDaNQA8MCy6MNQ1ADwuLLgw0TUAPC4stjDPNQA8Liy2MM81ADwuLLgw0TUAPDAsujDUNQA8Myy+MNo1ADw1LMMw4DUAPDosyTDpNQA8PizQMPI1ADxFLNow/jUAPEws5DALNgA8VSzwMBs2ADxfLP4wKzYAPGosDDE8NgA8dywcMU82ADyELCwxYzYAPJQsPzF4NgA8pCxSMY42ADykLFExizYAPJUsPjF1NgA8hiwsMWA2ADx5LBoxSzYAPG0sCzE5NgA8Yiz9MCc2ADxZLPAwFzYAPFIs5TAJNgA8SyzbMPw1ADxGLNMw8DUAPEIszDDnNQA8PyzGMN81ADw9LMIw2DUAPDwsvzDTNQA8Oiy8MNA1ADw6LLswzjUAPDosuzDONQA8Oiy8MNA1ADw8LL8w0zUAPD0swjDYNQA8PyzGMN81ADxCLMww5zUAPEYs0zDwNQA8SyzbMPw1ADxSLOUwCTYAPFks8DAXNgA8Yiz9MCc2ADxtLAsxOTYAPHksGjFLNgA8hiwsMWA2ADyVLD4xdTYAPKQsUTGLNgA8pyxRMYo2ADyXLD4xczYAPIosLTFeNgA8fiwcMUo2ADxzLA0xODYAPGks/zAmNgA8YSz0MBc2ADxaLOkwCTYAPFUs3zD8NQA8UizYMPE1ADxPLNIw6DUAPE4szTDgNQA8TSzJMNo1ADxNLMcw1jUAPE0sxTDSNQA8TSzEMNE1ADxNLMQw0TUAPE0sxTDSNQA8TSzHMNY1ADxNLMkw2jUAPE4szTDgNQA8TyzSMOg1ADxSLNgw8TUAPFUs4DD8NQA8WizpMAk2ADxhLPQwFzYAPGks/zAmNgA8cywNMTg2ADx+LBwxSjYAPIosLTFeNgA8lyw+MXM2ADynLFExijYAPKssUzGJNgA8nSxBMXM2ADyQLC8xXjYAPIQsIDFLNgA8eiwRMTg2ADxyLAQxKDYAPGss+TAZNgA8ZizvMAs2ADxjLOcw/zUAPGEs4TD1NQA8YSzbMOw1ADxiLNgw5TUAPGMs1TDgNQA8ZizUMNw1ADxnLNMw2TUAPGcs0jDYNQA8ZyzSMNg1ADxnLNMw2TUAPGYs1DDcNQA8YyzVMOA1ADxiLNgw5TUAPGEs2zDsNQA8YSzhMPU1ADxjLOcw/zUAPGYs7zALNgA8ayz5MBk2ADxyLAQx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MDKENpE6ADxAMpE2mDoAPFEyoTagOgA8ZTKyNqk6ADx5MsQ2sjoAPJEy2Da9OgA8rDLvNsc6ADzIMgc30joAPOQyHzfeOgA8AjM4N+g6ADwkM1I38zoAPEQzbTf/OgA8gjRgOH07ADxvNFM4eDsAPF00RzhxOwA8TDQ6OGs7ADw6NC44ZTsAPCk0IThfOwA8GjQWOFg7ADwMNAs4UjsAPP4zAjhLOwA85jPxN0Y7ADzPM+A3QTsAPL0z0jc8OwA8sDPHNzk7ADylM783NTsAPJ4zuTc0OwA8mjO2NzI7ADyaM7Y3MjsAPJ4zuTc0OwA8pTO/NzU7ADywM8c3OTsAPL0z0jc8OwA8zzPgN0E7ADzmM/E3RjsAPP4zAjhLOwA8DDQLOFI7ADwaNBY4WDsAPCk0IThfOwA8OjQuOGU7ADxMNDo4azsAPF00RzhxOwA8bzRTOHg7ADyCNGA4fTsAPPE1QjnKOwA83jU5Ocw7ADzLNTA5zzsAPLo1JznPOwA8qTUdOdA7ADyXNRU50TsAPIc1DDnTOwA8eDUEOdQ7ADxoNfw41TsAPFw19TjVOwA8UTXuONU7ADxHNeg41TsAPD814zjVOwA8OTXgONU7ADw0Nd041TsAPDI13DjVOwA8MjXcONU7ADw0Nd041TsAPDk14DjVOwA8PzXjONU7ADxHNeg41TsAPFE17jjVOwA8XDX1ONU7ADxoNfw41TsAPHg1BDnUOwA8hzUMOdM7ADyXNRU50TsAPKk1HTnQOwA8ujUnOc87ADzLNTA5zzsAPN41OTnMOwA88TVCOco7ADwaOBg6kzsAPBY4GDqYOwA8EzgYOp07ADwQOBk6ojsAPA04GjqmOwA8CjgbOqw7ADwIOBw6sjsAPAU4HTq3OwA8AzgeOrw7ADwBOB86wDsAPP43IDrFOwA8+zciOsk7ADz4NyI6zDsAPPU3IjrPOwA89DciOtE7ADz0NyI60jsAPPQ3IjrSOwA89DciOtE7ADz1NyI6zzsAPPg3IjrMOwA8+zciOsk7ADz+NyA6xTsAPAE4HzrAOwA8AzgeOrw7ADwFOB06tzsAPAg4HDqyOwA8CjgbOqw7ADwNOBo6pjsAPBA4GTqiOwA8EzgYOp07ADwWOBg6mDsAPBo4GDqTOwA8EhCaFNoZADzeD3IUphkAPJgPSRRxGQA8Zg8tFE0ZADw6DxMU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FDoAPHYx3jUGOgA8XzHKNfo5ADxLMbc17jkAPDwxqTXlOQA8MTGfNd45ADwpMZg12TkAPCUxlDXXOQA8JTGUNdc5ADwpMZg12TkAPDExnzXeOQA8PDGpNeU5ADxLMbc17jkAPF8xyjX6OQA8djHeNQY6ADyPMfQ1FDoAPKoxDTYkOgA8xzEnNjQ6ADzpMUU2RDoAPAwyYjZVOgA8LjKANmY6ADxTMp82dzoAPHoywDaHOgA8oDLhNpg6ADw0NCI4LDsAPB40EjgiOwA8CjQDOBY7ADzqM+c3CzsAPMEzyDcAOwA8mDOqN/U6ADx0M4036ToAPFIzcTfeOgA8MTNYN9I6ADwTM0A3yDoAPPgyKje+OgA84DIYN7Y6ADzPMgk3rzoAPMIy/japOgA8uDL2NqY6ADyzMvI2pDoAPLMy8jakOgA8uDL2NqY6ADzCMv42qToAPM8yCTevOgA84DIYN7Y6ADz4Mio3vjoAPBMzQDfIOgA8MTNYN9I6ADxSM3E33joAPHQzjTfpOgA8mDOqN/U6ADzBM8g3ADsAPOoz5zcLOwA8CjQDOBY7ADweNBI4IjsAPDQ0IjgsOwA8rDUSOZQ7ADyWNQY5kzsAPIE1+ziSOwA8bDXvOJA7ADxYNeM4jTsAPEQ11ziKOwA8MDXMOIc7ADweNcE4hTsAPAw1tziCOwA8/TStOH87ADzvNKQ4ezsAPOM0nDh4OwA82TSWOHY7ADzRNJE4dDsAPMs0jThzOwA8yTSMOHM7ADzJNIw4czsAPMs0jThzOwA80TSROHQ7ADzZNJY4djsAPOM0nDh4OwA87zSkOHs7ADz9NK04fzsAPAw1tziCOwA8HjXBOIU7ADwwNcw4hzsAPEQ11ziKOwA8WDXjOI07ADxsNe84kDsAPIE1+ziSOwA8ljUGOZM7ADysNRI5lDsAPP03/Dl8OwA89Df6OX87ADzrN/o5gzsAPOM3+TmGOwA82zf4OYo7ADzTN/g5jjsAPMw39zmSOwA8xDf2OZY7ADy9N/Y5mTsAPLc39jmdOwA8sTf2OaA7ADysN/Y5ojsAPKg39TmlOwA8pDf1Oac7ADyiN/Q5qDsAPKA39DmpOwA8oDf0Oak7ADyiN/Q5qDsAPKQ39TmnOwA8qDf1OaU7ADysN/Y5ojsAPLE39jmgOwA8tzf2OZ07ADy9N/Y5mTsAPMQ39jmWOwA8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`,sh:[.26094889640808105,.5150265097618103,1.032456874847412,0,.10768532007932663,.22091135382652283,.49413102865219116,0,.014073493890464306,.0221560075879097,.03581251949071884,0,3.396999090909958e-7,8.364829113816086e-7,17432806771466858e-22,0,1.7143611330538988e-7,2.864398993551731e-7,7.116468623280525e-7,0,.00619027204811573,.00914362445473671,.014727044850587845,0,.013352008536458015,.02489926852285862,.03580249845981598,0,4.6795321395620704e-8,1.2478994904085994e-7,4.6119384933263063e-7,0,.02009074203670025,.038700103759765625,.05597875267267227,0],skyIrradiance:[.1032891571521759,.2133454531431198,.48157060146331787],sunTransmittance:[.9393250346183777,.8645803332328796,.7566995620727539],horizon:[.47889190912246704,.7417253255844116,.9497601985931396]}]},af=Math.fround;Object.freeze([.282095,.488603,.488603,.488603,1.092548,1.092548,.315392,1.092548,.546274].map(af));var of=new Map,sf=(e,t)=>Number.isFinite(e)?e:t,cf=e=>Math.max(rf.probes[0].elevation,Math.min(rf.probes.at(-1).elevation,sf(e,38)));function lf(e){let t=rf.probes,n=cf(e);for(let e=0;e<t.length-1;e++){let r=t[e],i=t[e+1];if(n<=i.elevation)return{elevation:n,first:e,second:e+1,weight:(n-r.elevation)/(i.elevation-r.elevation)}}return{elevation:n,first:t.length-1,second:t.length-1,weight:0}}function uf(e){if(of.has(e))return of.get(e);let t=rf.probes[e];if(!t)throw RangeError(`Unknown baked water environment probe `+e);let n=atob(t.dataBase64),r=new Uint16Array(n.length/2);for(let e=0;e<r.length;e++)r[e]=n.charCodeAt(e*2)|n.charCodeAt(e*2+1)<<8;let i=Float32Array.from(r,Gl),a={...t,data:r,linearData:i,sh:new Float32Array(t.sh)};return of.set(e,a),a}function df(e){let t=lf(e),n=rf.probes[t.first],r=rf.probes[t.second],i={elevation:t.elevation,sunIlluminance:rf.sunIlluminance};for(let e of[`skyIrradiance`,`sunTransmittance`,`horizon`])i[e]=n[e].map((n,i)=>n+(r[e][i]-n)*t.weight);return i}var ff=class{constructor(){this.elevation=null,this.current=null,this.blends=0}get(e){let t=cf(e);if(this.elevation===t)return this.current;let n=lf(t),r,i;if(n.weight===0||n.first===n.second){let e=uf(n.first);r=e.data,i=e.sh}else if(n.weight===1){let e=uf(n.second);r=e.data,i=e.sh}else{let e=uf(n.first),t=uf(n.second);r=new Uint16Array(e.data.length);for(let i=0;i<r.length;i++)r[i]=Wl(e.linearData[i]+(t.linearData[i]-e.linearData[i])*n.weight);i=new Float32Array(36);for(let r=0;r<i.length;r++)i[r]=e.sh[r]+(t.sh[r]-e.sh[r])*n.weight}return this.elevation=n.elevation,this.current={...n,data:r,sh:i,lighting:df(n.elevation)},this.blends++,this.current}},pf=.55,mf=[[.59719,.35458,.04823],[.076,.90834,.01566],[.0284,.13383,.83777]],hf=[[1.60475,-.53108,-.07367],[-.10208,1.10813,-.00605],[-.00327,-.07276,1.07602]];function gf(e){let[[t,n,r],[i,a,o],[s,c,l]]=e,u=[[a*l-o*c,r*c-n*l,n*o-r*a],[o*s-i*l,t*l-r*s,r*i-t*o],[i*c-a*s,n*s-t*c,t*a-n*i]],d=t*u[0][0]+n*u[1][0]+r*u[2][0];return u.map(e=>e.map(e=>e/d))}gf(mf),gf(hf);function _f(e){let t=new Ks({antialias:!0,alpha:!1,powerPreference:`high-performance`}),n=t.domElement,r=t.getContext();n.tabIndex=0,e.appendChild(n),t.setPixelRatio(1),t.toneMapping=4,t.toneMappingExposure=pf,t.outputColorSpace=te,t.shadowMap.enabled=!0,t.shadowMap.type=2,t.shadowMap.autoUpdate=!1,t.debug.onShaderError=(e,t,n,r)=>{throw Error(`WebGL shader could not compile: `+e.getProgramInfoLog(t)+` `+e.getShaderInfoLog(n)+` `+e.getShaderInfoLog(r))};let i={backend:`webgl2`,glRenderer:t,canvas:n,renderScale:1,onResize:[],onContextRestore:[],camera:new ai(48,innerWidth/innerHeight,.06,1e3),renderOptimizations:{framePacing:!0},pacingStats:{callbacks:0,submitted:0,completed:0,skipped:0,inFlight:0,maxInFlight:0},fences:[],_running:!1,get width(){return n.width},get height(){return n.height},resize(){let e=innerWidth,r=innerHeight;t.setSize(Math.max(1,Math.floor(e*this.renderScale)),Math.max(1,Math.floor(r*this.renderScale)),!1),n.style.width=e+`px`,n.style.height=r+`px`,this.camera.aspect=e/r,this.camera.updateProjectionMatrix();for(let t of this.onResize)t(e,r)},setRenderScale(e){this.renderScale=e,this.resize()},pollGPU(){for(;this.fences.length;){let e=r.clientWaitSync(this.fences[0],0,0);if(e===r.TIMEOUT_EXPIRED)break;r.deleteSync(this.fences.shift()),e!==r.WAIT_FAILED&&this.pacingStats.completed++}this.pacingStats.inFlight=this.fences.length},start(e){if(this._running)return;this._running=!0,this.callback=e;let t=null,n=i=>{if(!this._running)return;if(this.frameRequest=requestAnimationFrame(n),this.pacingStats.callbacks++,this.pollGPU(),this.fences.length>=2){this.pacingStats.skipped++;return}let a=t===null?0:Math.max(0,Math.min(.1,(i-t)/1e3));t=i,e(a),this.pacingStats.submitted++;let o=r.fenceSync(r.SYNC_GPU_COMMANDS_COMPLETE,0);o?(this.fences.push(o),r.flush()):r.isContextLost()||(r.finish(),this.pacingStats.completed++),this.pacingStats.inFlight=this.fences.length,this.pacingStats.maxInFlight=Math.max(this.pacingStats.maxInFlight,this.fences.length)};this.frameRequest=requestAnimationFrame(n)},stop(){this._running=!1,cancelAnimationFrame(this.frameRequest)},async waitForGPU(){r.finish(),this.pollGPU()}};return window.addEventListener(`resize`,()=>i.resize()),n.addEventListener(`webglcontextlost`,e=>{e.preventDefault(),i.restartAfterRestore=i._running,i.stop(),i.fences.length=0,i.pacingStats.inFlight=0}),n.addEventListener(`webglcontextrestored`,()=>{for(let e of i.onContextRestore)e();i.restartAfterRestore&&!document.hidden&&i.start(i.callback)}),i.resize(),i}`${zd.map((e,t)=>`sum+=vec3(${e.amplitude.toFixed(9)}*cosine[${t}],${(-e.amplitude*e.k*e.x).toFixed(9)}*sine[${t}],${(-e.amplitude*e.k*e.z).toFixed(9)}*sine[${t}])*waveStrength;`).join(`
`)}`;var vf={land:[.28,.36,.18],rock:[.52,.49,.4],quay:[.67,.59,.45],pier:[.62,.57,.46],catwalk:[.43,.33,.2],road:[.37,.39,.34],parking:[.37,.39,.34],path:[.68,.61,.46]},yf=e=>[...e].reduce((e,t)=>Math.imul(e^t.charCodeAt(0),16777619),2166136261)>>>0;function bf(e){let t=new bn;return t.setAttribute(`position`,new cn(e.positions,3)),t.setIndex(e.indices),t.computeVertexNormals(),t}function xf(e,t,n,r){let i=(vf[e]||vf.quay).slice(),a=.96+.04*Math.sin(t*.13+Math.cos(r*.087))+.025*Math.sin(t*.63+r*.4);if(e===`land`){let e=Math.max(0,Math.min(1,(1.15-n)/.9));for(let t=0;t<3;t++)i[t]=i[t]*(1-e)+[.57,.51,.35][t]*e}return i.map(e=>e*a)}var Sf=class{constructor(e,t,n=256){this.scene=e,this.material=t,this.cell=n,this.buckets=new Map,this.sourceCount=0}add(e,t){let n=e.attributes.position,r=e.attributes.normal,i=e.index,a=this.sourceCount++;for(let e=0;e<i.count;e+=3){let o=[i.getX(e),i.getX(e+1),i.getX(e+2)],s=o.reduce((e,t)=>e+n.getX(t),0)/3,c=o.reduce((e,t)=>e+n.getZ(t),0)/3,l=Math.floor(s/this.cell)+`,`+Math.floor(c/this.cell);this.buckets.has(l)||this.buckets.set(l,{p:[],n:[],c:[],i:[],map:new Map});let u=this.buckets.get(l);for(let e of o){let i=a+`:`+e;if(!u.map.has(i)){let a=u.p.length/3;u.map.set(i,a),u.p.push(n.getX(e),n.getY(e),n.getZ(e)),u.n.push(r.getX(e),r.getY(e),r.getZ(e)),u.c.push(...typeof t==`function`?t(n.getX(e),n.getY(e),n.getZ(e)):t)}u.i.push(u.map.get(i))}}e.dispose()}finish(){let e=[];for(let[t,n]of this.buckets){let r=new bn;r.setAttribute(`position`,new cn(n.p,3)),r.setAttribute(`normal`,new cn(n.n,3)),r.setAttribute(`color`,new cn(n.c,3)),r.setIndex(n.i),r.computeBoundingSphere();let i=new Wn(r,this.material);i.name=`Marina solid chunk `+t,i.castShadow=!0,i.receiveShadow=!0,this.scene.add(i),e.push(i)}return e}};function Cf(e){let t=[],n=[],r=[],i=[],a=e.outer.length,o=e.outer.reduce((e,t)=>e+t[0],0)/a,s=e.outer.reduce((e,t)=>e+t[1],0)/a,c=e.outer.reduce((t,n,r)=>{let i=e.outer[(r+1)%a];return t+n[0]*i[1]-i[0]*n[1]},0)>0?e.outer.slice():e.outer.slice().reverse();for(let l=0;l<a;l++){let u=c[l],d=c[(l+1)%a],f=e.outer.findIndex(e=>e===u),p=e.outer.findIndex(e=>e===d),m=t.length/3,h=e.base+e.eaves;t.push(u[0],e.ground?.[f]??e.base,u[1],u[0],h,u[1],d[0],h,d[1],d[0],e.ground?.[p]??e.base,d[1]),n.push(m,m+1,m+2,m,m+2,m+3);let g=r.length/3;r.push(o,h+e.roof,s,u[0],h,u[1],d[0],h,d[1]),i.push(g,g+2,g+1)}return[bf({positions:t,indices:n}),bf({positions:r,indices:i})]}function wf(e,t,{slice:n=!1}={}){let r=new wr({vertexColors:!0,roughness:.91,metalness:0}),i=new Sf(e,r);for(let e of t.patches)(!n||[`Q-MAIN`,`P-S02`,`ROAD-QUAY`,`WALK-QUAY`,`L-WEST`].includes(e.id))&&i.add(bf(e.mesh),(t,n,r)=>xf(e.kind,t,n,r));if(!n){i.add(bf(t.walls),[.43,.43,.36]);for(let e of t.buildings){let[t,n]=Cf(e),r=.94+yf(e.id)%100/1e3;i.add(t,[.81*r,.74*r,.6*r]),i.add(n,[.43*r,.19*r,.105*r])}}let a=i.finish(),o=null;if(!n){o=new nr(new fr(.19,.24,1,6,1),new wr({color:7829870,roughness:1}),t.supports.length);let n=new He;t.supports.forEach(([e,t,r],i)=>{n.makeScale(1,r+.8,1),n.setPosition(e,(r-.8)/2,t),o.setMatrixAt(i,n)}),o.instanceMatrix.needsUpdate=!0,o.castShadow=!0,o.receiveShadow=!0,e.add(o)}return{meshes:a,supports:o,material:r}}function Tf(e,t,n){let r=t.water.mesh,i=r.positions,a=r.waterFields,o=new Map;for(let e=0;e<r.indices.length;e+=3){let t=r.indices.slice(e,e+3),n=t.reduce((e,t)=>e+i[t*3],0)/3,s=t.reduce((e,t)=>e+i[t*3+2],0)/3,c=Math.floor(n/256)+`,`+Math.floor(s/256);o.has(c)||o.set(c,{positions:[],fields:[],indices:[],map:new Map});let l=o.get(c);for(let e of t)l.map.has(e)||(l.map.set(e,l.positions.length/3),l.positions.push(...i.slice(e*3,e*3+3)),l.fields.push(...a.slice(e*2,e*2+2))),l.indices.push(l.map.get(e))}let s=[];for(let[t,r]of o){let i=new bn;i.setAttribute(`position`,new cn(r.positions,3)),i.setAttribute(`waterFields`,new cn(r.fields,2)),i.setIndex(r.indices),i.computeBoundingSphere(),i.boundingSphere.radius+=.4;let a=new Wn(i,n);a.name=`Marina water chunk `+t,e.add(a),s.push(a)}return s}var Ef=e=>e.toFixed(9),Df=fc.map(e=>`h+=${Ef(e.a)}*cos(${Ef(e.k)}*dot(p.xz,vec2(${Ef(e.x)},${Ef(e.z)}))-${Ef(e.w)}*waterTime+${Ef(e.p)});`).join(`
`);function Of(e){let t=_f(e),n=t.glRenderer.getContext();if(!t.glRenderer.capabilities.isWebGL2&&typeof n.texStorage2D!=`function`)throw Error(`WebGL 2 is required. Update the browser and enable hardware acceleration.`);if(n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS)<4)throw Error(`This graphics device has too few texture units. Try another graphics-enabled browser.`);return t.camera.near=.08,t.camera.far=4e3,t.camera.fov=58,t.camera.rotation.order=`YXZ`,t.camera.updateProjectionMatrix(),t.waitForGPU=async()=>{if(n.isContextLost())throw Error(`The graphics context is unavailable.`);let e=n.fenceSync(n.SYNC_GPU_COMMANDS_COMPLETE,0);if(!e)throw Error(`Could not create a graphics completion fence.`);n.flush();let r=performance.now();try{for(;;){let t=n.clientWaitSync(e,0,0);if(t===n.ALREADY_SIGNALED||t===n.CONDITION_SATISFIED)break;if(t===n.WAIT_FAILED||n.isContextLost())throw Error(`Graphics completion failed.`);if(performance.now()-r>3e4)throw Error(`The graphics device did not complete the frame.`);await new Promise(e=>setTimeout(e,4))}}finally{n.deleteSync(e)}t.pollGPU()},t.glRenderer.toneMappingExposure=pf,t}var kf=class{constructor(e,t,n,{slice:r=!1}={}){this.engine=e,this.data=t,this.hydro=n;let i=e.glRenderer;this.scene=new Tt,this.scene.fog=new wt(`#c8dde1`,900,2600);let a=new ff().get(38),o=rf.size,s=o*o*4;this.sky=new sr(Array.from({length:6},(e,t)=>new qn(a.data.subarray(t*s,(t+1)*s),o,o,C,y))),this.sky.type=y,this.sky.colorSpace=L,this.sky.generateMipmaps=!0,this.sky.minFilter=m,this.sky.needsUpdate=!0,this.scene.background=this.sky,this.scene.backgroundRotation.y=Math.atan2(-160,110),this.scene.add(new qr(14216703,9008470,1.2)),this.sun=new ci(16772560,3.2),this.sun.position.set(-160,240,110),this.sun.castShadow=!0,this.sun.shadow.mapSize.set(1024,1024),Object.assign(this.sun.shadow.camera,{left:-145,right:145,top:145,bottom:-145,near:10,far:700}),this.sun.shadow.bias=-15e-5,this.sun.shadow.normalBias=.04,this.scene.add(this.sun,this.sun.target),this.shadowCentre=null,this.structures=wf(this.scene,t,{slice:r});let c=n.normalAsset();this.normalAssetMetadata=c.metadata,this.normal=new qn(c.data,c.size,c.size),this.normal.wrapS=this.normal.wrapT=l,this.normal.generateMipmaps=!0,this.normal.minFilter=m,this.normal.magFilter=p,this.normal.anisotropy=Math.min(4,i.capabilities.getMaxAnisotropy()),this.normal.needsUpdate=!0,this.waterMaterial=new Sr({uniforms:{waterTime:{value:0},strength:{value:1},ripples:{value:this.normal},skyEnvironment:{value:this.sky},sunDirection:{value:new U(-160,240,110).normalize()}},vertexShader:`uniform float waterTime;uniform float strength;attribute vec2 waterFields;varying vec3 worldPosition;varying vec2 field;
      void main(){vec3 p=position;float h=0.0;${Df}p.y+=h*waterFields.x*waterFields.y*strength;field=waterFields;worldPosition=p;gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.0);}`,fragmentShader:`uniform float waterTime;uniform float strength;uniform sampler2D ripples;uniform samplerCube skyEnvironment;uniform vec3 sunDirection;varying vec3 worldPosition;varying vec2 field;
      void main(){vec2 p=worldPosition.xz;vec3 a=texture2D(ripples,(p-vec2(.12,.035)*waterTime)/8.0).xyz*2.0-1.0;vec3 b=texture2D(ripples,(p-vec2(-.055,.1)*waterTime)/12.56).xyz*2.0-1.0;
      vec2 slopes=.45*(a.xy/max(a.z,.2)+b.xy/max(b.z,.2))*(.35+.65*field.x);vec3 N=normalize(vec3(slopes.x,1.0,slopes.y));vec3 V=normalize(cameraPosition-worldPosition);vec3 R=reflect(-V,N);
      float fresnel=.025+.975*pow(1.0-clamp(dot(V,N),0.0,1.0),5.0);float yaw=-.96850898;vec3 envDirection=vec3(cos(yaw)*R.x-sin(yaw)*R.z,R.y,sin(yaw)*R.x+cos(yaw)*R.z);vec3 reflected=textureCube(skyEnvironment,envDirection).rgb;
      vec3 base=mix(vec3(.035,.18,.19),vec3(.028,.13,.18),field.x);float variance=dot(dFdx(N),dFdx(N))+dot(dFdy(N),dFdy(N));float power=1.0/(.018+variance*4.0);float spec=pow(max(dot(reflect(-sunDirection,N),V),0.0),power)*.24;
      gl_FragColor=vec4(mix(base,reflected,fresnel)+vec3(1.0,.87,.62)*spec,1.0);
      #include <tonemapping_fragment>
      #include <colorspace_fragment>
      }`,side:0}),this.water=Tf(this.scene,t,this.waterMaterial);let u=i.getContext();this.samples=Math.min(4,u.getParameter(u.MAX_SAMPLES));let d=new ze(e.width,e.height,{samples:this.samples,depthBuffer:!0,type:h});this.composer=new jd(i,d),this.renderPass=new Md(this.scene,e.camera),this.fxaa=new Od(Fd),this.composer.addPass(this.renderPass),this.composer.addPass(this.fxaa),this.composer.addPass(new Pd),this.composer.renderTarget1.samples=0,this.composer.renderTarget1.depthBuffer=!1,i.info.autoReset=!1,e.onResize.push(()=>this.resize()),this.resize(),e.onContextRestore.push(()=>{this.shadowCentre=null,this.normal.needsUpdate=!0})}resize(){let e=this.engine;this.composer.setSize(e.width,e.height),this.fxaa.uniforms.resolution.value.set(1/e.width,1/e.height)}async prepare(e){let t=this.engine.glRenderer,n=t.getRenderTarget();t.setRenderTarget(this.composer.renderTarget2);try{t.compileAsync&&await t.compileAsync(this.scene,e)}finally{t.setRenderTarget(n)}for(let t=0;t<2;t++)this.render(e),await this.engine.waitForGPU()}render(e=this.engine.camera){let t=this.engine.glRenderer;for(let e of this.water)e.visible=this.hydro.visible;if(this.hydro.visible&&(this.waterMaterial.uniforms.waterTime.value=this.hydro.time,this.waterMaterial.uniforms.strength.value=this.hydro.strength),!e.isOrthographicCamera){let n=Math.round(e.position.x/32)*32,r=Math.round(e.position.z/32)*32,i=n+`,`+r;i!==this.shadowCentre&&(this.sun.position.set(n-160,240,r+110),this.sun.target.position.set(n,0,r),this.sun.target.updateMatrixWorld(),t.shadowMap.needsUpdate=!0,this.shadowCentre=i)}this.renderPass.camera=e,this.composer.readBuffer=this.composer.renderTarget2,this.composer.writeBuffer=this.composer.renderTarget1,t.info.reset(),this.composer.render()}report(){let e=this.engine,t=e.glRenderer,n=t.getContext(),r=0,i=0,a=0;this.scene.traverse(e=>{if(e.geometry){a++;let t=e.geometry;for(let e of Object.values(t.attributes))r+=e.array.byteLength;r+=t.index?.array.byteLength||0,i+=(t.index?.count||t.attributes.position.count)/3*(e.isInstancedMesh?e.count:1)}});let o=n.getExtension(`WEBGL_debug_renderer_info`);return{backend:`webgl2`,renderer:o?n.getParameter(o.UNMASKED_RENDERER_WEBGL):n.getParameter(n.RENDERER),maxFragmentTextureUnits:n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),requiredWaterTextureUnits:2,output:[e.width,e.height],css:[innerWidth,innerHeight],devicePixelRatio,renderScale:e.renderScale,antiAliasing:{method:`MSAA + FXAA`,samples:this.samples,sceneTargetSamples:this.composer.renderTarget2.samples,postTargetSamples:this.composer.renderTarget1.samples},water:{mode:this.hydro.visible?`surface`:`off`,paused:this.hydro.paused,time:this.hydro.time,drawsEnabled:this.hydro.visible,fftPasses:0,volumePasses:0,reflectionPasses:0,normalTextureBytes:this.normalAssetMetadata.textureBytes,updates:this.hydro.updates},environment:{source:`Original Tidewater baked clear sky`,cubeBytes:65520,dynamicPasses:0},render:{calls:t.info.render.calls,triangles:t.info.render.triangles,allocatedTriangles:i,geometries:a,geometryBufferPayloadBytes:r,textureObjects:t.info.memory.textures,solidChunks:this.structures.meshes.length,waterChunks:this.water.length},shadow:{maps:1,size:1024,refresh:`32 metre snapped camera region; static scene`},renderTargetPayloadEstimateBytes:e.width*e.height*(8*(this.samples+1)+4),memoryCaveat:`Composer color/depth payloads plus estimated multisample storage; excludes canvas buffers, driver overhead and measured process/GPU memory.`}}},Af=(e,t)=>{let n=e.slice().sort((e,t)=>e-t);return n[Math.min(n.length-1,Math.floor(n.length*t))]??null},jf=class{async init(){let e=new URLSearchParams(location.search);this.slice=e.has(`slice`),this.view=`quay`,this.engine=Of(document.querySelector(`#app`)),this.walkCamera=this.engine.camera;let t=await fetch(new URL(`./marina/foundation.json`,location.href));if(!t.ok)throw Error(`The marina data could not load. Serve the built folder with a local web server and reload.`);return this.data=await t.json(),this.terrain=new ic(this.data),this.hydro=new mc(this.terrain),this.renderer=new kf(this.engine,this.data,this.hydro,{slice:this.slice}),this.navigation=new Sd(this.engine,this.data,this.terrain,this.hydro),this.navigation.spawn(),await this.renderer.prepare(this.walkCamera),this.overhead=new oi,this.overhead.near=.1,this.overhead.far=4e3,this.engine.onResize.push(()=>this.fitOverhead()),this.fitOverhead(),this.intervals=[],this.cpuTimes=[],this.frames=0,this.lastFrame=null,this.bindUI(),this.setView(e.get(`view`)||`quay`),document.querySelector(`#status`).hidden=!0,document.documentElement.dataset.ready=`true`,this.engine.start(e=>this.tick(e)),document.addEventListener(`visibilitychange`,()=>{document.hidden?(this.engine.stop(),this.lastFrame=null):this.engine.start(e=>this.tick(e))}),this.engine.canvas.addEventListener(`webglcontextlost`,()=>{let e=document.querySelector(`#status`);e.hidden=!1,e.textContent=`Graphics paused. Waiting for the browser to restore the graphics device…`}),this.engine.onContextRestore.push(async()=>{let e=this.engine.restartAfterRestore;this.engine.restartAfterRestore=!1;try{await this.renderer.prepare(this.walkCamera),this.render(),await this.engine.waitForGPU(),document.querySelector(`#status`).hidden=!0,this.lastFrame=null,e&&!document.hidden&&this.engine.start(e=>this.tick(e))}catch(e){let t=document.querySelector(`#status`);t.hidden=!1,t.textContent=`Graphics could not recover. Reload the marina to reconnect the graphics device. `+e.message}}),this}pixel(e){return $s(e,this.data.registration.pixel_to_local_xz)}fitOverhead(){let e=this.data.registration.pixel_to_local_xz,t=Math.hypot(...e[0]),[n,r]=this.pixel([781,654]),i=Math.max(1308*t/2,1562*t/(2*innerWidth/innerHeight));Object.assign(this.overhead,{left:-i*innerWidth/innerHeight,right:i*innerWidth/innerHeight,top:i,bottom:-i}),this.overhead.position.set(n,1400,r),this.overhead.up.set(-e[1][0],0,-e[1][1]).normalize(),this.overhead.lookAt(n,0,r),this.overhead.updateProjectionMatrix()}placeWalker(e,t){let[n,r]=e,[i,a]=t,o=this.navigation.player,s=this.walkCamera;o.position.set(n,this.terrain.surfaceAt(n,r)?.height??1.8,r),o.velocity.set(0,0,0),o.mode=`walk`,o._camY=null,s.position.set(n,o.position.y+1.62,r),s.lookAt(i,o.position.y+1.1,a),o.yaw=s.rotation.y,o.pitch=s.rotation.x,this.navigation.mode=`walk`,o.update(0)}setView(e){if([`quay`,`overhead`,`entrance`,`pier`,`river`].includes(e)||(e=`quay`),this.view=e,this.lastFrame=null,this.intervals.length=0,this.cpuTimes.length=0,e===`overhead`)this.camera=this.overhead,this.navigation.mode=`inspect`;else if(this.camera=this.walkCamera,e===`quay`&&this.placeWalker(this.data.inspection.spawn,this.data.inspection.quayTarget),e===`pier`&&this.placeWalker(this.data.inspection.pier,this.data.inspection.pierTarget),e===`entrance`||e===`river`){let[t,n]=this.data.inspection[e===`entrance`?`entrance`:`river`];this.walkCamera.position.set(t-35,e===`entrance`?7:15,n+75),this.walkCamera.lookAt(t+35,1,n-80),this.navigation.fly.setPose(this.walkCamera.position,this.walkCamera.rotation.y,this.walkCamera.rotation.x),this.navigation.mode=`fly`}for(let t of document.querySelectorAll(`[data-view]`))t.setAttribute(`aria-pressed`,String(t.dataset.view===e));document.querySelector(`#movement`).textContent=this.navigation.mode===`walk`?`Fly · F`:`Walk · F`,this.render()}toggleMovement(){if(this.navigation.mode===`inspect`){let[e,t]=this.pixel([781,654]);this.walkCamera.position.set(e,350,t+350),this.walkCamera.lookAt(e,0,t),this.camera=this.walkCamera,this.navigation.mode=`walk`,this.navigation.player.yaw=this.walkCamera.rotation.y,this.navigation.player.pitch=this.walkCamera.rotation.x,this.navigation.setMode(`fly`)}else this.navigation.setMode(this.navigation.mode===`walk`?`fly`:`walk`);this.view=`free`;for(let e of document.querySelectorAll(`[data-view]`))e.setAttribute(`aria-pressed`,`false`);document.querySelector(`#movement`).textContent=this.navigation.mode===`walk`?`Fly · F`:`Walk · F`}bindUI(){for(let e of document.querySelectorAll(`[data-view]`))e.addEventListener(`click`,()=>this.setView(e.dataset.view));document.querySelector(`#movement`).onclick=()=>this.toggleMovement(),document.querySelector(`#spawn`).onclick=()=>this.setView(`quay`),document.querySelector(`#water`).onclick=()=>{this.hydro.visible=!this.hydro.visible,document.querySelector(`#water`).textContent=this.hydro.visible?`Water on`:`Water off`,document.querySelector(`#water`).setAttribute(`aria-pressed`,String(this.hydro.visible)),this.intervals.length=0,this.cpuTimes.length=0,this.render()},document.querySelector(`#pause`).onclick=()=>{this.hydro.paused=!this.hydro.paused,document.querySelector(`#pause`).textContent=this.hydro.paused?`Resume water`:`Pause water`,this.render()},document.querySelector(`#waves`).oninput=e=>{this.hydro.strength=Number(e.target.value),this.render()};let e=document.querySelector(`#jump`);e.onpointerdown=t=>{this.navigation.input.keys.add(`Space`),this.navigation.input.pressed.add(`Space`),e.setPointerCapture(t.pointerId)};for(let t of[`pointerup`,`pointercancel`,`lostpointercapture`])e.addEventListener(t,()=>this.navigation.input.keys.delete(`Space`));navigator.maxTouchPoints>0&&(document.documentElement.dataset.touch=`true`),document.querySelector(`#download-report`).onclick=()=>{let e=new Blob([JSON.stringify(this.performanceReport(),null,2)],{type:`application/json`}),t=URL.createObjectURL(e),n=document.createElement(`a`);n.href=t,n.download=`marina-performance.json`,n.click(),setTimeout(()=>URL.revokeObjectURL(t),1e3)}}tick(e){let t=performance.now();if(this.frames>40&&this.lastFrame!==null&&(this.intervals.push(t-this.lastFrame),this.intervals.length>360&&this.intervals.shift()),this.lastFrame=t,this.navigation.input.hit(`KeyF`)&&this.toggleMovement(),this.navigation.mode!==`inspect`){let t=Math.max(1,Math.ceil(e/(1/60)));for(let n=0;n<t;n++)this.navigation.update(e/t)}else this.navigation.input.endFrame();this.hydro.update(e);let n=performance.now();if(this.render(),this.cpuTimes.push(performance.now()-n),this.cpuTimes.length>360&&this.cpuTimes.shift(),this.frames++,this.frames%30==0){let e=this.intervals,t=Af(e,.5);document.querySelector(`#fps`).textContent=t?Math.round(1e3/t)+` FPS`:`Measuring…`,document.querySelector(`#performance`).open&&(document.querySelector(`#performance-detail`).textContent=JSON.stringify(this.performanceReport(),null,2))}}render(){this.renderer.render(this.camera||this.walkCamera)}performanceReport(){return{build:qs.version,slice:this.slice,view:this.view,mode:this.navigation.mode,position:this.navigation.player.position.toArray(),camera:this.camera.position.toArray(),...this.renderer.report(),frames:this.frames,frameIntervals:{samples:this.intervals.length,p50:Af(this.intervals,.5),p95:Af(this.intervals,.95),p99:Af(this.intervals,.99),unit:`ms`,meaning:`Wall intervals between submitted-frame callbacks after 40 warm-up frames; includes pacing and software/hardware GPU workload.`},cpuEncode:{samples:this.cpuTimes.length,p50:Af(this.cpuTimes,.5),p95:Af(this.cpuTimes,.95),unit:`ms`,meaning:`JavaScript render/composer submission wall time, not asynchronous GPU duration.`},pacing:{...this.engine.pacingStats},geography:{origin:qs.origin,unitsPerMetre:1,horizontalUncertaintyMetres:3,heights:`Provisional local datum; no survey or sounding claim.`},deviceCaveat:`Browser/GPU identification and viewport are recorded. Cloud software rendering or mobile emulation does not establish phone FPS.`}}};export{jf as MarinaApp};