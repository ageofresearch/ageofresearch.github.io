"""Verify all texture pixels, geometry byte ranges and scene data of both GLBs.

Requires Pillow and numpy. This checks encoded assets, not a rendered scene.
"""
from pathlib import Path
import argparse,hashlib,io,json,struct,zlib
from PIL import Image
import numpy as np
parser=argparse.ArgumentParser(description=__doc__);parser.add_argument('--output',required=True);args=parser.parse_args()
base=Path(__file__).resolve().parents[1]/'site/marina-casa-de-campo/marina/yacht-r110'
def read(name):
 raw=(base/name).read_bytes();magic,version,length=struct.unpack_from('<III',raw);assert magic==0x46546c67 and version==2 and length==len(raw)
 n,kind=struct.unpack_from('<II',raw,12);assert kind==0x4e4f534a;g=json.loads(raw[20:20+n]);size,kind=struct.unpack_from('<II',raw,20+n);assert kind==0x004e4942;binary=raw[28+n:];assert size==len(binary);return raw,g,binary
a,g,x=read('grande-36m.glb');b,h,y=read('grande-36m-lossless-webp-v1.glb')
assert hashlib.sha256(a).hexdigest()=='2f23f95f6746a22071beba7a1a9ddec4ccdd319e8cb70ce031075008f4376f40'
assert len(g['images'])==len(h['images'])==61
report={'scope':__doc__,'original_bytes':len(a),'delivery_bytes':len(b),'original_sha256':hashlib.sha256(a).hexdigest(),'delivery_sha256':hashlib.sha256(b).hexdigest(),'images':[],'geometry_ranges':0}
for key in ['accessors','nodes','meshes','materials','scenes','samplers','scene']:
 assert g.get(key)==h.get(key),key
for old,new in zip(g['bufferViews'],h['bufferViews']):
 for key in ['EXT_meshopt_compression','KHR_meshopt_compression']:
  e=old.get('extensions',{}).get(key);f=new.get('extensions',{}).get(key)
  if e:
   assert f and e['byteLength']==f['byteLength']
   assert x[e['byteOffset']:e['byteOffset']+e['byteLength']]==y[f['byteOffset']:f['byteOffset']+f['byteLength']]
   assert {k:v for k,v in e.items()if k!='byteOffset'}=={k:v for k,v in f.items()if k!='byteOffset'}
   report['geometry_ranges']+=1
for i,(old,new)in enumerate(zip(g['images'],h['images'])):
 av=g['bufferViews'][old['bufferView']];bv=h['bufferViews'][new['bufferView']]
 ai=Image.open(io.BytesIO(x[av.get('byteOffset',0):av.get('byteOffset',0)+av['byteLength']])).convert('RGBA');bi=Image.open(io.BytesIO(y[bv.get('byteOffset',0):bv.get('byteOffset',0)+bv['byteLength']])).convert('RGBA')
 assert ai.size==bi.size and np.array_equal(np.asarray(ai),np.asarray(bi)),i
 report['images'].append({'index':i,'size':list(ai.size),'pixels_identical':True})
for old,new in zip(g['textures'],h['textures']):
 copy=json.loads(json.dumps(new));source=copy['extensions'].pop('EXT_texture_webp')['source'];copy['source']=source
 if not copy['extensions']:del copy['extensions']
 assert old==copy
assert report['geometry_ranges']==2552
report['gzip_original_bytes']=len(zlib.compress(a,wbits=31));report['gzip_delivery_bytes']=len(zlib.compress(b,wbits=31));report['passed']=True
Path(args.output).write_text(json.dumps(report,indent=2)+'\n');print(json.dumps({k:v for k,v in report.items()if k!='images'},indent=2))
