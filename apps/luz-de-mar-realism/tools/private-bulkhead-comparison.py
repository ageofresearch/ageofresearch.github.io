"""Local-only three-way evidence. Never copy this directory into public output."""
from pathlib import Path
import json,hashlib
from PIL import Image
R=Path(__file__).resolve().parents[1];W=R/'work/bulkhead-vr-r01';C=json.loads((W/'review/candidate/report.json').read_text());B=json.loads((W/'review/baseline/report.json').read_text());E=json.loads((W/'evidence-frozen.json').read_text());sections=[];proof=[]
assert C['pass']and B['pass']and len(C['views'])==8 and C.get('native',{}).get('readWithinRenderTurn')
for p in C['views']:
 old=next(v for v in B['views']if v['id']==p['id'])
 for key in ['position','target','hfov','vfov']:assert p[key]==old[key],(p['id'],key)
 name=p['id'];paths=[W/'reference'/(name+'.png'),W/'review/baseline'/(name+'.png'),W/'review/candidate'/(name+'.png')]
 for f in paths:assert Image.open(f).size==(1200,800),(f,Image.open(f).size)
 proof.append({'id':name,'position':p['position'],'target':p['target'],'hfov':p['hfov'],'vfov':p['vfov'],'files':{str(f.relative_to(W)):hashlib.sha256(f.read_bytes()).hexdigest()for f in paths}})
 sections.append('<section><h2>'+name+'</h2><p>Estación única [9.15, 0, 3.18]; FOV '+str(p['hfov'])+'° × '+str(p['vfov'])+'°.</p><div class="triple">'+''.join('<figure><img loading="lazy" src="'+src+'"><figcaption>'+label+'</figcaption></figure>'for src,label in[('../reference/'+name+'.png','VR original · privada'),('baseline/'+name+'.png','r11 / motores VR existentes'),('candidate/'+name+'.png','Mamparo candidato R01')])+'</div></section>')
html='''<!doctype html><html lang="es"><meta charset="utf-8"><title>Mamparo · evidencia privada</title><style>body{background:#14212a;color:#e6edf1;font:16px system-ui;margin:24px}a{color:#8ad7ff}.triple{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}figure{margin:0}img{width:100%}section{margin:36px 0}@media(max-width:900px){.triple{grid-template-columns:1fr}}</style><h1>Mamparo · comparación privada</h1><p>Ocho encuadres a 1200 × 800, misma cámara/proyección. Fotografías VR privadas; no publicadas en Pages ni Releases. <a href="fine/index.html">Comparador nativo por cuadros de 16/8 px, superposición y contornos</a>.</p>'''+''.join(sections)+'</html>'
(W/'review/three-way.html').write_text(html);(W/'matched-view-proof.json').write_text(json.dumps({'camera':E['camera'],'views':proof,'originalVRPhotosPrivate':True},indent=2)+'\n')
print('PRIVATE MATCHED VIEWS',len(proof))
