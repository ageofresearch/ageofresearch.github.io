"""Right intake casing traced in the fixed 1200x800 intake view.
The exposed face is observed; transverse thickness and hidden connections are
inferred. No camera fit or reference-image texture is used.
Executed by build-right-engine.py after intake_ray is defined.
"""
remove_where(lambda o: 'R13 stepped intake casting' in o.name or 'R13 intake ' in o.name)
def view_plate(name,pixels,depth=.90,thickness=.23,material='enamel',radius=.008):
 front=[intake_ray(p,depth)for p in pixels];back=[Vector((p.x,p.y-thickness,p.z))for p in front];n=len(front)
 faces=[tuple(range(n-1,-1,-1)),tuple(range(n,2*n))]+[(i,(i+1)%n,(i+1)%n+n,i+n)for i in range(n)]
 o=bevel(closed_solid(mesh(name,[pt(p)for p in front+back],faces,material,'intake')),radius,4)
 o['viewObservation']=json.dumps({'pose':'intake','resolution':[1200,800],'pixels':pixels,'cameraSource':[9.15,0,3.18],'classification':'visible right casing outline; transverse depth and unseen back inferred'})
 return o
def view_line(name,pixels,depth=.89,r=.004,material='enamel'):
 o=tube(name,[intake_ray(p,depth)for p in pixels],r,material,'intake',10,4)
 o['viewObservation']=json.dumps({'pose':'intake','resolution':[1200,800],'pixels':pixels,'classification':'observed right casing joint; depth inferred'})
 return o
outline=[[408,277],[430,282],[455,302],[480,308],[510,318],[553,325],[595,334],[665,338],[685,350],[686,416],[678,444],[656,459],[649,478],[624,487],[592,479],[574,455],[560,438],[550,441],[548,474],[537,495],[511,506],[478,497],[449,485],[438,466],[435,448],[421,441],[417,385],[404,370],[399,326]]
view_plate('right observed stepped intake casing',outline,radius=.012)
view_line('right intake upper casting joint',[[411,290],[435,296],[459,314],[508,330],[558,336],[608,344],[670,352]],r=.004)
# Three nonuniform cast ribs with shoulders and separate fastener bosses.
for i,poly in enumerate([
 [[422,329],[434,332],[440,405],[445,442],[436,450],[426,437]],
 [[542,351],[554,355],[560,437],[552,452],[546,487],[532,500],[530,489],[537,442]],
 [[657,398],[673,402],[669,450],[654,467],[649,478],[638,480],[642,461],[651,446]]]):
 view_plate('right intake shaped rib '+str(i),poly,.884,.025,radius=.004)
for i,p in enumerate([[429,343],[548,367],[663,409]]):
 q=intake_ray(p,.877);bolt('right intake recessed rib fixing '+str(i),q,'intake','enamel','y',.005)
# Two short service necks emerge from the casting, with seated unions.
for i,pixels in enumerate([[[539,493],[536,528],[553,547]],[[648,473],[645,504],[661,519]]]):
 view_line('right intake descending service neck '+str(i),pixels,.90,.019)
 q=intake_ray(pixels[-1],.90);cylinder('right intake lower service union '+str(i),[q.x,q.y,q.z-.012],[q.x,q.y,q.z+.012],.025,'enamel','intake',24)
# The rear neck meets the existing circular intake at its original physical axis.
q=intake_ray([410,322],1.05)
tube('right intake short cast transition',[[11.47,-1.05,2.58],[11.36,-1.05,2.60],q],.142,'enamel','intake',48,8)

# Right top fittings replace the three unsupported left-side service blocks.
remove_where(lambda o:'R13 near service block' in o.name or 'R13 service block upper cap' in o.name)
q=intake_ray([1018,229],.95)
cylinder('right small service indicator body',[q.x,q.y,q.z-.035],[q.x,q.y,q.z+.023],.018,'enamel','service',24)
cylinder('right service indicator black cap',[q.x,q.y,q.z+.023],[q.x,q.y,q.z+.035],.022,'rubber','service',24)
cylinder('right service indicator red band',[q.x,q.y,q.z-.026],[q.x,q.y,q.z-.017],.0185,'red','service',24)
q=intake_ray([906,193],1.10)
tube('right cast lifting eye',[[q.x+.047*math.cos(t)/SX,q.y,q.z+.047*math.sin(t)]for t in np.linspace(0,2*math.pi,49)],.011,'enamel','casting',12,1)
for dx in[-.036,.036]:
 cylinder('right lifting eye seated foot '+str(dx),[q.x+dx,q.y,q.z-.075],[q.x+dx,q.y,q.z-.030],.015,'enamel','casting',20)
