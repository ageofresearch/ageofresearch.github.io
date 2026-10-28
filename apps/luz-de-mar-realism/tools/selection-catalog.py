"""Compile semantic membership from authored component IDs, never runtime filenames/materials."""
import json,re
from pathlib import Path
R=Path(__file__).resolve().parents[1]
objects={};members={};pending=[]
def obj(id,label):
 if id not in objects:objects[id]={'selectableId':id,'label':label,'components':[]}
 return id
def own(component,id,label):
 obj(id,label)
 if component in members and members[component]!=id:raise RuntimeError('Ambiguous '+component)
 members[component]=id;objects[id]['components'].append(component)
def engine(item,side):
 id=item['id'];group=item['assembly'];suffix='babor'if side=='port'else'estribor'
 if 'inferred seated engine bed'in id or 'inferred gearbox seated support'in id:return
 if group=='rails':own(id,'rail-'+side,'Barandilla de '+suffix)
 elif group=='extinguisher':own(id,'extinguisher-'+side,'Extintor de '+suffix)
 elif group=='gearbox':own(id,'gearbox-'+side,'Reductora de '+suffix)
 else:own(id,'engine-'+side,'Motor de '+suffix)
for side,folder in [('port','left-vr-r01'),('starboard','right-vr-r01')]:
 for item in json.loads((R/'public/assets/mechanics'/folder/'component-inventory.json').read_text())['items']:engine(item,side)
# Source assemblies are semantic authoring tags, expanded into explicit membership below.
for item in json.loads((R/'public/assets/machinery/electrical-vr-r01/component-inventory.json').read_text()):
 id=item['id'];group=item['assembly']
 ids={'distribution':('main-switchboard','Cuadro principal EURO EL'),'shore':('shore-power','SHORE POWER SYSTEM'),'battery':('battery-switchboard','Columna de seccionadores de baterías')}
 if group in ids:own(id,*ids[group])
 elif group=='vented' and not any(x in id for x in ['pedestal','slot upright','plate screw']):own(id,'vented-cabinet','Armario ventilado')
 elif group=='generator':
  region=item.get('evidenceID')or''
  if region.startswith('G'):own(id,'generator-port','Generador de babor')
  elif region.startswith('C01'):own(id,'generator-control-upper','Cuadro auxiliar superior')
  elif region.startswith('C02'):own(id,'generator-junction-upper','Caja de conexiones superior')
  elif region.startswith('V01'):own(id,'ventilator','Conjunto de ventilación')
  elif region.startswith('A'):own(id,'generator-auxiliary','Cuadro auxiliar del generador')
  elif region=='B01':own(id,'generator-rear-control','Armario de control posterior')
  elif region=='I01':own(id,'intercom','Intercomunicador')
  elif region=='I02':own(id,'hearing-protection','Protección auditiva')
  elif not region and id.startswith('GVR/auxiliary '):own(id,'generator-auxiliary','Cuadro auxiliar del generador')
  elif not region and id.startswith('GVR/intercom '):own(id,'intercom','Intercomunicador')
  elif not region and any(id.startswith('GVR/'+p)for p in ['circular ventilation','riser flange','flange stud','fan ']):own(id,'ventilator','Conjunto de ventilación')
  else:pending.append({'componentID':id,'reason':'External routing, local structure or accessory boundary not established; occluder only'})
# R02 introduced this separate editable door after the first electrical inventory.
# Its appearanceDoor authoring tag survives export and the live door pivot.
own('EVR/white service access appearance','service-door','Puerta de acceso')
for item in json.loads((R/'public/assets/machinery/bulkhead-vr-r01/component-inventory.json').read_text()):
 id=item['id'];g=item['assembly'];name=id.split('/',1)[1]
 if g=='central':
  # Explicit independent valve assemblies; other continuous headers stay a collector.
  valve=re.search(r'^(upper|middle) (?:valve|black handle|white handle).*? (\d)(?: |$)',name)
  if valve:own(id,'bulkhead-valve-'+valve[1]+'-'+valve[2],'Válvula '+valve[1]+' '+str(int(valve[2])+1))
  elif any(x in name for x in ['motor ','motor-','pump white','pump formed','pump shaft','pump mounting','pump volute']):own(id,'bulkhead-pump','Bomba y motor del mamparo')
  elif 'manual 'in name:own(id,'bulkhead-manual-pump','Bomba manual del mamparo')
  else:own(id,'bulkhead-manifold','Colector del mamparo')
 elif g in ('panels','fasteners'):
  match=re.search(r'(port-operating|starboard-operating|port-local|starboard-local|epu|eco|scu)',name)
  if match:own(id,'control-'+match[1],'Armario de control '+match[1].upper())
  else:pending.append({'componentID':id,'reason':'Panel fixing ownership not established'})
# Filter hardware is independent from shared pipes and supporting structure.
for item in json.loads((R/'public/assets/machinery/filter-well-r01/inventory.json').read_text()):
 id=item['id'];side=item.get('side');name=id.split('/',1)[1]
 if side and any(w in name for w in ['housing barrel','annular upper flange',' lid','lid ','small hex plug','raised lid fitting','fitting top','red lid lever','housing foot']):own(id,'filter-'+side,'Filtro de agua de mar de '+('babor'if side=='port'else'estribor'))
 elif side and any(w in name for w in ['front teal butterfly','front actuator','front long lever','rear valve','rear black actuator','rear upright lever']):own(id,'well-valve-'+side+('-front'if'front'in name else'-rear'),'Válvula del foso '+side+(' delantera'if'front'in name else' trasera'))
 elif any(w in name for w in ['bridge','crossover','cross-over','header','manifold']):own(id,'well-manifold','Colector del foso')
# Inherited source records retain authored feature IDs. Only unambiguous equipment groups are included.
snapshot=json.loads((R/'work/machinery-r11/snapshot/machinery.json').read_text())
for p in snapshot['parts']:
 id=p['id'];match=re.search(r'/(generator-(?:port|starboard)|climma-[012]|watermaker|asea-[01])/\d+$',id)
 if match:
  key=match[1];label={'generator-port':'Generador de babor','generator-starboard':'Generador de estribor','watermaker':'Desalinizadora','climma-0':'Climatización 1','climma-1':'Climatización 2','climma-2':'Climatización 3','asea-0':'Módulo ASEA 1','asea-1':'Módulo ASEA 2'}[key];own(id,key,label)
 elif p.get('dynamic')=='register':own(id,'floor-register','Registro del piso')
 elif p.get('dynamic')=='door':own(id,'service-door','Puerta de acceso')
 elif '/charging/'in id:
  n=int(id.rsplit('/',1)[1]);unit=None
  # Pinned authored call order: two 8-part chargers, two isolators and Phoenix.
  # Craft derivative: two 35-part charger fronts, 4 isolator fin/keyline parts,
  # 6 isolator terminal parts and 6 Phoenix front parts. No spatial grouping.
  if '/machinery/charging/'in id:
   unit=0 if n<=7 else 1 if n<=15 else 3 if n==16 or 18<=n<=23 else 4 if n==17 or 24<=n<=29 else 2 if n==30 else None
  elif '/machinery-craft/charging/'in id:
   unit=0 if 292<=n<=326 else 1 if 327<=n<=361 else 3 if n in (362,363,366,367,368) else 4 if n in (364,365,369,370,371) else 2 if 372<=n<=377 else None
  if unit is not None:own(id,'charger-'+str(unit),('Cargador '+str(unit+1))if unit<3 else 'Aislador de baterías '+str(unit-2))
  else:pending.append({'componentID':id,'reason':'Shared charger support or routing; not part of an individual unit'})
# Stable numeric palette is deterministic; zero is reserved for unassigned/structural surfaces.
registry=R/'public/assets/selection-r01/catalog.json'
previous={o['selectableId']:o['value']for o in json.loads(registry.read_text())['objects']}if registry.exists()else{}
next_value=max(previous.values(),default=0)+1
for id in sorted(objects):
 if id not in previous:previous[id]=next_value;next_value+=1
 objects[id]['value']=previous[id];objects[id]['components']=sorted(set(objects[id]['components']))
result={'version':'equipment-r01','color':'#32E65A','opacity':.35,'objects':list(objects.values()),'membership':members,'pending':pending,'zeroMeaning':'Unassigned physical occluder or structure; never highlighted','provenance':'Explicit authored component IDs; no runtime spatial or material grouping'}
if __name__=='__main__':
 out=R/'work/selection-r01/catalog-source.json';out.parent.mkdir(exist_ok=True,parents=True);out.write_text(json.dumps(result,ensure_ascii=False,indent=2));print('CATALOG',len(objects),'objects',len(members),'members',len(pending),'pending')
