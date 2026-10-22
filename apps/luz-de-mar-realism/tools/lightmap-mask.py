"""Rasterize native UV triangles for chart-edge-safe denoising (V=0 is row 0)."""
import sys,numpy as np
from PIL import Image,ImageDraw
tri=np.load(sys.argv[1])['triangles'];im=Image.new('L',(2048,2048));draw=ImageDraw.Draw(im)
for t in tri:
 if abs((t[1,0]-t[0,0])*(t[2,1]-t[0,1])-(t[1,1]-t[0,1])*(t[2,0]-t[0,0]))>1e-12:draw.polygon([tuple(v*2048-.5)for v in t],fill=255)
np.save(sys.argv[2],np.asarray(im)>0)
