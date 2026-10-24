"""Private8px inspection sheets: source VR / published R01 / final WebGL.

Generating a sheet does not mark any patch reviewed or accepted.
"""
from pathlib import Path
import json,hashlib
from PIL import Image,ImageDraw
R=Path(__file__).resolve().parents[1];W=R/'work/electrical-lower-r02';O=W/'review/patches';O.mkdir(parents=True,exist_ok=True)
patches=[('louvre-top','b',718,1260),('louvre-body','b',916,1768),('grille-top','b',168,1656),('grille-bottom','b',232,1712),('breaker-groups','b',88,1344),('lower-mark','b',208,1792),('pedestal-left','d',352,1856),('pedestal-right','d',1624,1856),('pedestal-slot','d',992,1776),('mat-step','d',1280,1208),('checkerplate','d',160,1744),('mat-fit','d',1040,1504),('mat-holdout','d',1392,1520),('green-controls','l',208,1216),('cable-entry','l',224,1344),('pipe-elbow','l',144,1496),('side-mat','l',464,1840),('main-bottom-left','r',1728,1584),('warnings-and-latch','r',1856,1680),('under-board','r',1888,1792)]
report=json.loads((W/'review/candidate/report.json').read_text());a=json.loads((R/'public/assets/machinery/electrical-vr-r01/authoring.json').read_text());assert report['pass']and report['runtimeGeometrySHA256']==a['runtimeGeometrySHA256'],'Use completed final WebGL captures, not an older iteration'
images={};sources={};rows=[]
for index,(label,face,x,y)in enumerate(patches):
 if face not in images:
  src=R/'work/reference/machinery/cubes'/('pano_'+face+'.jpg');sources[face]=hashlib.sha256(src.read_bytes()).hexdigest();images[face]=[Image.open(src).convert('RGB'),Image.open(W/'review/baseline'/('native-'+face+'.png')).convert('RGB'),Image.open(W/'review/candidate'/('native-'+face+'.png')).convert('RGB')]
 if index%4==0:sheet=Image.new('RGB',(768,1120),'#14262c')
 top=(index%4)*280;draw=ImageDraw.Draw(sheet)
 for j,(title,im)in enumerate(zip(['VR privada','Anterior R01','WebGL R02'],images[face])):
  tile=im.crop((x,y,x+64,y+64)).resize((256,256),Image.Resampling.NEAREST);grid=ImageDraw.Draw(tile)
  for v in range(0,256,32):grid.line((v,0,v,255),fill='#4b8990');grid.line((0,v,255,v),fill='#4b8990')
  draw.text((j*256+4,top+4),f'{title} {label} {face}:{x},{y}',fill='white');sheet.paste(tile,(j*256,top+24))
 rows.append({'id':label,'face':face,'rect':[x,y,x+64,y+64],'nativeCellPixels':8,'reviewed':False,'accepted':False})
 if index%4==3 or index==len(patches)-1:sheet.save(O/('sheet-'+str(index//4+1)+'.png'))
(O/'patch-review.json').write_text(json.dumps({'runtimeGeometrySHA256':a['runtimeGeometrySHA256'],'sourceHashes':sources,'patches':rows,'allCellsAccepted':False,'note':'Private photographs; do not copy these sheets into Pages or Releases. Review and acceptance are separate.'},indent=2)+'\n');print('PRIVATE PATCH SHEETS',len(rows),len(sources))
