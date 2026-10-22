"""Fetch only the recorded CC0 source maps and verify exact hashes."""
import json,hashlib,urllib.request
from pathlib import Path
root=Path(__file__).resolve().parents[1];folder=root/'work/material-sources';manifests=[json.loads((folder/f).read_text())for f in ['sources.json','exterior-source.json']];assert all(m['license']=='CC0-1.0'for m in manifests)
for record in [r for m in manifests for r in m['files']]:
 path=folder/record['file']
 if path.exists()and hashlib.sha256(path.read_bytes()).hexdigest()==record['sha256']:continue
 request=urllib.request.Request(record['url'],headers={'User-Agent':'Luz-de-Mar-visual-reconstruction/1.0'})
 data=urllib.request.urlopen(request,timeout=90).read();assert hashlib.sha256(data).hexdigest()==record['sha256'],record['file'];path.write_bytes(data);print('Verified',record['file'])
