"""Small-cell reference-led secondary forms, before material finishing."""
# Executed inside build-bulkhead.py with its construction helpers and part registry.
# All coordinates are native F-cube pixels. Hidden dimensions remain inferred.
for item in enclosures:
 name,rect=item['id'],item['rect'];front=12.72 if name=='epu' else 12.80
 a,b,c,d=rect
 # Rolled edge, positive door separation and individually seated fixing washers.
 for j,(p,q)in enumerate([([a+4,b+4],[c-4,b+4]),([c-4,b+4],[c-4,d-4]),([c-4,d-4],[a+4,d-4]),([a+4,d-4],[a+4,b+4])]):
  path(name+' formed door edge '+str(j),[p,q],front-.013,.0014,'paint','panels',1,6)
 for j,(u,v)in enumerate([(a+8,b+8),(c-8,b+8),(a+8,d-8),(c-8,d-8)]):
  pixelcylinder(name+' corner washer '+str(j),[u,v],2.4,.002,front-.017,'metal','fasteners',16)
 if name in ['port-local','starboard-local']:
  pixelbox(name+' quarter-turn mounting plate',[a+56,b+19,a+77,b+41],front-.020,.003,'dark','panels',.002)
  pixelbox(name+' quarter-turn visible tongue',[a+63,b+31,a+77,b+34],front-.025,.008,'metal','panels',.001)
  for k in range(2):
   pixelbox(name+' upper icon plate '+str(k),[a+95+k*15,b+20,a+107+k*15,b+29],front-.017,.002,'label','panels',.001)
  for j in range(7):
   u=a+28;v=b+35+j*8;pixelbox(name+' status surround '+str(j),[u-8,v-2,u+8,v+2],front-.024,.002,'metal','panels',.001)
   pixelbox(name+' small status centre '+str(j),[u-5,v-1,u+5,v+1],front-.026,.002,'red' if j in [5,6] else 'dark','panels',.0005)
   path(name+' capsule indicator outline '+str(j),[[u-6,v-2],[u+5,v-2],[u+7,v],[u+5,v+2],[u-6,v+2],[u-8,v],[u-6,v-2]],front-.027,.0008,'metal','panels',2,6)
 # Glands align along the underside, rather than hanging as end-on front discs.
 count=7 if name in ['port-local','starboard-local'] else 5 if name=='eco' else 3
 for j in range(count):
  u=a+19+j*(c-a-34)/max(1,count-1);p=plane([u,d],12.85+j*.003)
  cylinder(name+' gland hex nut '+str(j),[p[0],p[1],p[2]-.009],[p[0],p[1],p[2]+.003],.009,'dark','fasteners',6)
  cylinder(name+' gland compression collar '+str(j),[p[0],p[1],p[2]-.017],[p[0],p[1],p[2]-.009],.007,'rubber','fasteners',12)

# Raised pilot bezels and short stems distinguish a lamp, selector and stop.
for j,(u,v,r)in enumerate([(317,924,5),(317,949,5),(317,975,5),(1605,974,6),(1627,974,6)]):
 pixelcylinder('pilot polished bezel '+str(j),[u,v],r+1,.004,12.763,'metal','panels',24)
 pixelcylinder('pilot lens '+str(j),[u,v],r-.5,.008,12.753,'green' if j==0 else 'red' if j in[1,4] else 'label' if j==3 else 'yellow','panels',24)
for j,v in enumerate([912,937,963]):
 pixelbox('port pilot caption backing '+str(j),[309,v-3,325,v+3],12.777,.002,'dark','panels',.0006)
 pixelbox('port pilot caption inset '+str(j),[311,v-2,323,v+2],12.774,.001,'label','panels',.0003)
for j,u in enumerate([1638,1660]):
 path('starboard selector white arc '+str(j),[[u+4*math.cos(t),1026-4*math.sin(t)]for t in np.linspace(.2,2.7,12)],12.749,.0009,'label','panels',1,6)
for j,u in enumerate([1589,1638,1660]):
 pixelbox('starboard selector square plate '+str(j),[u-9,1015,u+9,1036],12.771,.004,'metal','panels',.001)
 pixelbox('starboard selector black surround '+str(j),[u-7,1017,u+7,1034],12.765,.004,'dark','panels',.001)
 pixelbox('starboard selector raised stem '+str(j),[u-2,1020,u+2,1031],12.754,.012,'red' if j==0 else 'dark','panels',.001)
for j,(a,b,c,d)in enumerate([[1590,920,1646,922],[1590,949,1646,951],[1590,920,1592,951],[1644,920,1646,951]]):pixelbox('display metal bezel '+str(j),[a,b,c,d],12.768,.002,'metal','panels',.001)
pixelbox('display inset olive LCD face',[1604,929,1638,944],12.758,.001,'screen','panels',.0003)
for j in range(3):pixelbox('display unresolved dark readout line '+str(j),[1607,932+j*4,1631-j*3,933+j*4],12.756,.001,'dark','panels',.0003)
for j,(u,v)in enumerate([(1566,939),(1567,1025)]):
 pixelcylinder('starboard round keyhole bezel '+str(j),[u,v],4,.004,12.779,'metal','panels',20)
 pixelcylinder('starboard dark keyhole '+str(j),[u,v],2.5,.008,12.771,'dark','panels',20)
for j,rect in enumerate([[1600,960,1618,966],[1622,960,1640,966],[1582,1006,1601,1012],[1630,1006,1648,1012],[1653,1006,1672,1012]]):
 pixelbox('starboard control caption plate '+str(j),rect,12.777,.002,'label','panels',.001)
path('SCU latch adjacent cable loop',[[1740,968],[1736,979],[1731,988],[1733,995],[1741,1003],[1743,1011]],12.694,.0025,'rubber','panels',5,8)
pixelbox('SCU latch spindle',[1766,960,1771,970],12.754,.011,'metal','panels',.002)
path('SCU second adjacent cable',[[1743,969],[1740,980],[1734,988],[1737,997],[1744,1003]],12.768,.002,'rubber','panels',5,8)
pixelbox('SCU cable upper connector',[1737,960,1744,968],12.767,.008,'label','panels',.001)
pixelbox('SCU cable lower connector',[1736,1009,1746,1018],12.764,.009,'dark','panels',.001)

# Visible side faces are actual side planes, not a second frontal billboard.
def side_patch(name,rect,side_y,material,offset=0):
 def ray(pixel):
  u,v=pixel;depth=-side_y*SY*1024/(u-1024);return [9.15+depth/SX,side_y+offset,3.18+(1024-v)*depth/1024]
 a,b,c,d=rect;verts=[pt(ray(p))for p in[(a,b),(c,b),(c,d),(a,d)]]
 o=mesh(name,verts,[(0,3,2,1)],material,'panels');o['referenceRect']=json.dumps(rect);return o
for name,front_edge,front_x,rect,count,pitch in [('epu',651,12.72,[659,919,672,974],12,4),('port-operating-upper',409,12.80,[416,907,439,963],10,5),('port-operating-lower',409,12.80,[416,980,439,1021],8,4)]:
 side_y=plane([front_edge,rect[1]],front_x)[1]
 side_patch(name+' side vent recess',rect,side_y,'dark',-.001)
 for j in range(count):
  v=rect[1]+3+j*pitch;side_patch(name+' side vent louvre '+str(j),[rect[0]+2,v,rect[2]-2,v+1.5],side_y,'paint',-.003)
 for j,r in enumerate([[rect[0]-1,rect[1]-1,rect[2]+1,rect[1]],[rect[0]-1,rect[3],rect[2]+1,rect[3]+1],[rect[0]-1,rect[1],rect[0],rect[3]],[rect[2],rect[1],rect[2]+1,rect[3]]]):side_patch(name+' side vent frame '+str(j),r,side_y,'paint',-.003)

# Labels are reconstructed from legible marks only; surrounding tiny type stays
# unassigned. Their plate edges remain inspectable in the neutral geometry.
for name,rect,x in [('eco',[151,922,232,956],12.80),('epu',[513,985,595,1031],12.72)]:
 a,b,c,d=rect
 for j,points in enumerate([[[a+1,b+1],[c-1,b+1]],[[c-1,b+1],[c-1,d-1]],[[c-1,d-1],[a+1,d-1]],[[a+1,d-1],[a+1,b+1]]]):path(name+' plate printed keyline '+str(j),points,x-.022,.0008,'dark','panels',1,6)

# The pump casing follows the observed stepped silhouette and has a physical
# rear volume. The electric motor axis is transverse to the viewing direction.
outline=[[1081,1083],[1105,1083],[1105,1094],[1115,1099],[1121,1111],[1121,1136],[1113,1143],[1080,1142],[1072,1132],[1070,1108],[1076,1099]]
front=[plane(p,12.65)for p in outline];back=[[p[0]+.18,p[1],p[2]]for p in front];n=len(front);faces=[tuple(range(n-1,-1,-1)),tuple(range(n,n*2))]+[(i,(i+1)%n,(i+1)%n+n,i+n)for i in range(n)]
bevel(closed_solid(mesh('white pump formed volute housing',[pt(p)for p in front+back],faces,'paint','central')),.012,4)
for j,(u,v)in enumerate([(1081,1099),(1114,1107),(1114,1132),(1080,1135)]):pixelcylinder('pump volute visible fixing '+str(j),[u,v],2,.008,12.635,'metal','fasteners',6)
for j,(v1,v2,r)in enumerate([(978,986,.030),(986,1009,.044),(1009,1023,.031)]):
 p=plane([1127,v1],12.68);q=plane([1127,v2],12.68);cylinder('right brass stepped body '+str(j),p,q,r,'brass','central',24)
pixelcylinder('right brass valve front boss',[1123,996],7,.030,12.619,'brass','central',12)
pixelcylinder('right brass valve front boss cap',[1123,996],5,.008,12.605,'metal','central',24)
# Rounded casting at the lower elbow is wider than the straight riser, with a
# rolled shoulder and a tapered socket. Its silhouette is visible in the VR.
profile=[(1018,.031),(1024,.034),(1028,.047),(1033,.060),(1039,.063),(1045,.057),(1050,.043),(1056,.034),(1065,.034)]
verts=[];segments=40
for v,r in profile:
 p=plane([1127,v],12.65)
 for t in np.linspace(0,math.tau,segments,endpoint=False):verts.append(pt([p[0]+r*math.cos(t)/SX,p[1]+r*math.sin(t)/SY,p[2]]))
faces=[tuple(range(segments-1,-1,-1)),tuple(range((len(profile)-1)*segments,len(profile)*segments))]+[(i*segments+j,i*segments+(j+1)%segments,(i+1)*segments+(j+1)%segments,(i+1)*segments+j)for i in range(len(profile)-1)for j in range(segments)]
closed_solid(mesh('right lower rounded bronze casting',verts,faces,'brass','central',True))

# Lower valve unions and the yellow open levers next to the circular cover.
for j,u in enumerate([945,1106]):
 pixelbox('lower yellow valve handle '+str(j),[u-3,1233,u+3,1260],12.66,.012,'yellow','central',.002)
 pixelbox('lower yellow handle dark inset '+str(j),[u-1,1239,u+1,1254],12.649,.003,'dark','central',.001)
 p=plane([u,1215],12.72);cylinder('lower bronze formed union '+str(j),[p[0],p[1]-.025,p[2]],[p[0],p[1]+.025,p[2]],.033,'brass','central',12)
capsule=[[1026+22*math.cos(t),1195+22*math.sin(t)]for t in np.linspace(math.pi,math.tau,13)]+[[1026+22*math.cos(t),1246+22*math.sin(t)]for t in np.linspace(0,math.pi,13)]
front=[plane(p,12.69)for p in capsule];back=[[p[0]+.07,p[1],p[2]]for p in front];n=len(front);faces=[tuple(range(n-1,-1,-1)),tuple(range(n,2*n))]+[(i,(i+1)%n,(i+1)%n+n,i+n)for i in range(n)]
bevel(closed_solid(mesh('manual pump oval mounting body',[pt(p)for p in front+back],faces,'paint','central')),.003,3)
for j,v in enumerate([1181,1261]):pixelcylinder('manual pump mounting hole '+str(j),[1026,v],3,.008,12.675,'metal','fasteners',20)
p=plane([1026,1215],12.582);ring('manual cover rounded concentric ridge',p,.084,.002,'paint','central','x')
pixelcylinder('manual handle central hub',[1026,1215],5,.016,12.540,'metal','central',24)

# Valve castings, split flange fasteners and packing glands, observed at 8px scale.
for j,u in enumerate([950,1005,1060]):
 pixelbox('upper valve cast body '+str(j),[u-12,932,u+12,962],12.718,.075,'paint','central',.006)
 pixelcylinder('upper valve packing collar '+str(j),[u,945],6,.024,12.682,'brass','central',20)
 for k,(du,dv)in enumerate([(-13,-10),(13,-10),(-13,11),(13,11)]):pixelcylinder('upper valve flange stud '+str(j)+' '+str(k),[u+du,947+dv],2,.013,12.677,'metal','fasteners',6)
 pixelbox('upper black lever inset '+str(j),[u-4,952,u,975],12.658,.003,'metal','central',.001)
for j,u in enumerate([951,1007,1061]):
 pixelbox('middle valve split body '+str(j),[u-15,994,u+15,1019],12.733,.065,'paint','central',.004)
 for k,du in enumerate([-12,12]):pixelcylinder('middle valve visible stud '+str(j)+' '+str(k),[u+du,1001],2,.009,12.692,'metal','fasteners',6)
for j,u in enumerate([971,1000,1049,1088]):
 p=plane([u,1048],12.66)
 # Raised circular rings beside the broad flange reproduce its stepped section.
 ring('line flange raised rim '+str(j),p,.061 if j in[1,2] else .046,.0032,'metal','central','y')
 for k,sign in enumerate([-1,1]):pixelcylinder('line flange visible fixing '+str(j)+' '+str(k),[u,1048+sign*15],2,.012,12.594,'metal','fasteners',6)
for j,(u,v)in enumerate([(1115,965),(1138,965),(1115,1000),(1138,1000),(1115,1031),(1138,1031)]):
 pixelcylinder('right vertical flange washer '+str(j),[u,v],3,.003,12.61,'metal','fasteners',16)
 pixelcylinder('right vertical flange hex nut '+str(j),[u,v],2,.012,12.60,'brass','fasteners',6)
for j,u in enumerate([927,1127]):
 for k,v in enumerate([1089,1136,1180,1233]):
  p=plane([u,v],12.76);cylinder('white pipe socket '+str(j)+' '+str(k),[p[0],p[1],p[2]-.011],[p[0],p[1],p[2]+.011],.033,'paint','central',24)

# Motor end fasteners, fan-side roll and independent saddle feet.
for j,(u,v)in enumerate([(1002,1091),(1067,1091),(1002,1135),(1067,1135)]):pixelcylinder('motor casing screw '+str(j),[u,v],2,.008,12.574,'metal','fasteners',6)
for j,u in enumerate([1011,1058]):
 pixelbox('motor saddle foot '+str(j),[u-7,1139,u+7,1147],12.575,.12,'paint','central',.003)
 pixelcylinder('motor foot fixing '+str(j),[u,1144],2,.008,12.565,'metal','fasteners',6)
for j,u in enumerate([973,1080]):
 p=plane([u,1215],12.71);cylinder('lower cover pipe union '+str(j),[p[0],p[1]-.022,p[2]],[p[0],p[1]+.022,p[2]],.040,'metal','central',24)
for j,u in enumerate([955,1018,1093]):
 p=plane([u,1402],12.83);cylinder('lower floor socket '+str(j),[p[0],p[1],p[2]-.02],[p[0],p[1],p[2]+.02],.034,'paint','central',24)
 for k,du in enumerate([-9,9]):pixelcylinder('lower shoe bolt '+str(j)+' '+str(k),[u+du,1410],2,.008,12.759,'metal','fasteners',6)
