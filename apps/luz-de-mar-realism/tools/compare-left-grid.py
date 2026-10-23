"""Private, reproducible grid/contour comparisons; no photo pixels published."""
from pathlib import Path
import json, numpy as np
from PIL import Image,ImageDraw
from scipy.ndimage import binary_erosion,distance_transform_edt
R=Path(__file__).resolve().parents[1];W=R/'work/left-engine-r13';P=R/'work/reference/machinery/cubes';F=W/'review/grid';F.mkdir(exist_ok=True)
fit=json.loads((W/'grid-fit.json').read_text())
outlines={
 'exhaust':[[980,900],[980,880],[980,860],[982,830],[985,800],[1015,700],[1070,620],[1150,560],[1250,520],[1350,495],[1450,490],[1510,465],[1650,465],[1800,478],[1900,500],[2000,535],[2047,580],[2047,805],[2020,855],[1940,895],[1800,920],[1690,925],[1590,920],[1480,920],[1380,910]],
 'jacket':[[960,1090],[970,1220],[990,1360],[1030,1450],[1080,1495],[1160,1535],[1220,1600],[1300,1650],[1400,1680],[1500,1690],[1600,1695],[1630,1640],[1630,1580],[1620,1500],[1605,1420],[1580,1360],[1540,1325],[1495,1305],[1450,1300],[1415,1320],[1390,1350],[1370,1340],[1365,1270],[1355,1200],[1350,1130],[1370,1080]],
}
contours=[]
im=Image.open(P/'pano_l.jpg').convert('RGB')
held_out={
 'exhaust':[[990,770],[1035,660],[1105,590],[1200,538],[1300,505],[1400,490],[1550,466],[1720,470],[1850,488],[1950,515],[2030,560],[2035,832],[1980,878],[1850,911],[1750,922]],
 'jacket':[[965,1150],[975,1290],[1010,1410],[1060,1480],[1190,1570],[1260,1630],[1350,1670],[1450,1687],[1550,1695],[1625,1600],[1615,1460],[1595,1390],[1565,1340],[1470,1300],[1400,1330],[1360,1230],[1360,1160]],
}
for key,points in outlines.items():
 a=np.asarray(Image.open(W/'review'/('mask-'+key+'.png')).convert('RGBA'))[:,:,3]>128;edge=a&~binary_erosion(a,border_value=1);distance=distance_transform_edt(~edge);errors=[float(distance[y,x])for x,y in points];held=[float(distance[y,x])for x,y in held_out[key]];contours.append({'group':key,'annotation':'Manually traced visible contour controls, approximate pixel labels; not hidden surfaces','points':points,'errorsPixels':errors,'maxErrorPixels':max(errors),'meanErrorPixels':sum(errors)/len(errors),'heldOut':{'points':held_out[key],'errorsPixels':held,'maxErrorPixels':max(held),'meanErrorPixels':sum(held)/len(held),'usedForFitting':False}})
 d=ImageDraw.Draw(im);ys,xs=np.where(edge);color=(50,220,255)if key=='exhaust'else(250,70,230)
 for x,y in zip(xs[::2],ys[::2]):d.point((int(x),int(y)),fill=color)
 for (x,y),error in zip(points,errors):d.ellipse((x-5,y-5,x+5,y+5),fill='#fff000');d.text((x+7,y),str(round(error)),fill='#fff000')
for x in range(800,2048,100):ImageDraw.Draw(im).line((x,420,x,1800),fill=(160,75,75),width=1)
for y in range(500,1801,100):ImageDraw.Draw(im).line((760,y,2048,y),fill=(160,75,75),width=1)
im.crop((760,420,2048,1800)).save(F/'contours.png')
for face,rect in [('f',(0,1000,940,2048)),('l',(760,420,2048,1800))]:
 im=Image.open(P/f'pano_{face}.jpg').convert('RGB');d=ImageDraw.Draw(im)
 for x in range(0,2048,100):d.line((x,0,x,2048),fill='#985050',width=1)
 for y in range(0,2048,100):d.line((0,y,2048,y),fill='#985050',width=1)
 for i,r in enumerate(fit['controls']):
  if r['face']!=face:continue
  x,y=r['expected'];u,v=r['actual'];d.line((x,y,u,v),fill='yellow',width=2);d.line((x-7,y,x+7,y),fill='#00ffff',width=2);d.line((x,y-7,x,y+7),fill='#00ffff',width=2);d.ellipse((u-5,v-5,u+5,v+5),outline='#ff00ff',width=2);d.text((x+8,y+8),str(i+1),fill='yellow')
 im.crop(rect).save(F/(face+'-controls.png'))
(F/'contours.json').write_text(json.dumps({'method':'Distances from manually identified visible photograph outline controls to the actual rendered silhouette; fixed original cube camera','contours':contours},indent=2)+'\n')
print([(x['group'],round(x['meanErrorPixels'],1),round(x['maxErrorPixels'],1))for x in contours])
print('Held-out:',[(x['group'],round(x['heldOut']['meanErrorPixels'],1),round(x['heldOut']['maxErrorPixels'],1))for x in contours])
