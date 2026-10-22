// Room lifetime is independent of the renderer, so slow/error/race paths can be
// exercised deterministically. At most two complete zones are attached at once.
export class ZoneStreamer {
 constructor({load,attach,detach,dispose,onChange=()=>{},limit=2}){Object.assign(this,{load,attach,detach,dispose,onChange,limit});this.residents=new Map();this.pending=new Map();this.active=null;this.serial=0;this.clock=0;this.disposed=false;}
 async ensure(id){
  if(this.disposed)throw new Error('El recorrido está cerrado');
  if(this.residents.has(id)){const r=this.residents.get(id);r.used=++this.clock;return r.value;}
  if(this.pending.has(id))return this.pending.get(id).promise;
  const controller=new AbortController(),record={controller};this.pending.set(id,record);
  record.promise=(async()=>{
   let value;try{
    value=await this.load(id,controller.signal);
    if(controller.signal.aborted||this.disposed)throw new DOMException('Carga cancelada','AbortError');
    while(this.residents.size>=this.limit){const candidate=[...this.residents].filter(([key])=>key!==this.active).sort((a,b)=>a[1].used-b[1].used)[0];if(!candidate)throw new Error('No hay una zona que se pueda liberar');this.evict(candidate[0]);}
    this.attach(value);this.residents.set(id,{value,used:++this.clock});this.onChange();return value;
   }catch(error){if(value&&this.residents.get(id)?.value!==value)this.dispose(value);throw error;}
   finally{if(this.pending.get(id)===record)this.pending.delete(id);}
  })();return record.promise;
 }
 async select(id){const ticket=++this.serial;this.cancelExcept(id);const value=await this.ensure(id);if(ticket!==this.serial||this.disposed)return null;this.activate(id);return value;}
 activate(id){if(!this.residents.has(id))return false;this.active=id;this.residents.get(id).used=++this.clock;this.onChange();return true;}
 cancelExcept(id){for(const[key,record]of this.pending)if(key!==id){record.controller.abort();this.pending.delete(key);}}
 evict(id){const room=this.residents.get(id);if(!room)return;this.detach(room.value);this.residents.delete(id);this.dispose(room.value);}
 close(){this.disposed=true;this.serial++;for(const record of this.pending.values())record.controller.abort();this.pending.clear();for(const id of [...this.residents.keys()])this.evict(id);this.onChange();}
}

export class TexturePool {
 constructor(){this.entries=new Map();}
 acquire(key,texture,lease){
  let entry=this.entries.get(key);if(!entry){entry={texture,refs:0};this.entries.set(key,entry);}else if(entry.texture!==texture)texture.dispose();
  if(!lease.has(key)){entry.refs++;lease.add(key);}return entry.texture;
 }
 release(lease){for(const key of lease){const entry=this.entries.get(key);if(entry&&!--entry.refs){entry.texture.dispose();this.entries.delete(key);}}lease.clear();}
 get stats(){return{textures:this.entries.size,references:[...this.entries.values()].reduce((n,e)=>n+e.refs,0)};}
}
