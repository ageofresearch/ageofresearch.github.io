"""Generate seamless, neutral albedo modulation for the gangway's authored teak."""
from pathlib import Path
import numpy as np
from PIL import Image

rng = np.random.default_rng(36)
width, height = 512, 1024
y, x = np.mgrid[0:height, 0:width]
def grain(nx, ny):
    cells = rng.uniform(-1, 1, (ny, nx))
    column, row = x * nx / width, y * ny / height
    ix, iy = column.astype(int), row.astype(int)
    fx, fy = column % 1, row % 1
    fx, fy = fx * fx * (3-2*fx), fy * fy * (3-2*fy)
    return ((1-fy)*((1-fx)*cells[iy,ix]+fx*cells[iy,(ix+1)%nx])+
            fy*((1-fx)*cells[(iy+1)%ny,ix]+fx*cells[(iy+1)%ny,(ix+1)%nx]))
bend = 0.7 * grain(7, 4)
fiber = np.sin(2*np.pi*(x/width*107 + bend))
board = x // 128
shade = np.take([.96, 1.03, .92, 1.0], board)
brightness = (211 + 9*grain(48, 4) + 9*grain(152, 8) + 4*fiber + 5*grain(16, 3)) * shade
seam = np.minimum(x % 128, 128-x % 128)
brightness *= .40 + .60*np.clip(seam/2, 0, 1)
color = np.stack([brightness*1.02, brightness*.99, brightness*.94],axis=-1)
Image.fromarray(np.uint8(np.clip(color,0,255))).save(Path(__file__).resolve().parents[2]/'site/tidewater-rocha/mobile/teak.jpg', quality=82, optimize=True)
