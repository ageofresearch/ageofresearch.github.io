"""Audit default appearance, isolating partition rasterization from app changes."""
from pathlib import Path
from PIL import Image
import hashlib, json
import numpy as np

W = Path(__file__).resolve().parents[1] / 'work/left-engine-r13/review'
def pixels(path):
    return np.asarray(Image.open(path).convert('RGB'))
a = pixels(W / 'r11/front.png')
b = pixels(W / 'default/front.png')
control = pixels(W / 'default-original-geometry/front.png')
assert a.shape == b.shape == control.shape
d = np.abs(a.astype(float) - b.astype(float))
changed = d.max(axis=2) > 0
# A one-pixel neighbourhood detects silhouette/subpixel boundaries. Exact
# attribute, material, transform and texture identity is tested independently
# in left-engine-assets.test.mjs. Do not accept a change to an interior surface.
luma = a.mean(axis=2)
pad = np.pad(luma, 1, mode='edge')
windows = [pad[y:y+a.shape[0], x:x+a.shape[1]] for y in range(3) for x in range(3)]
edge = np.maximum.reduce(windows) - np.minimum.reduce(windows)
away = int(np.sum(changed & (edge < 20)))
control_match = bool(np.array_equal(a, control))
limits = {'changedPixelFraction': .001, 'meanChannelDifference': .025,
          'maxChannelDifference': 48, 'pixelsAwayFromEdges': 0}
result = {
    'pass': bool(control_match and away == 0 and changed.mean() <= limits['changedPixelFraction']
                 and d.mean() <= limits['meanChannelDifference'] and d.max() <= limits['maxChannelDifference']),
    'exactPixelMatch': bool(np.array_equal(a, b)),
    'originalGeometryControlMatchesR11Exactly': control_match,
    'pixelsChanged': int(changed.sum()), 'totalPixels': int(changed.size),
    'maxChannelDifference': int(d.max()), 'meanChannelDifference': float(d.mean()),
    'pixelsAwayFromEdges': away, 'limits': limits,
    'assessment': 'Partitioning and reordering identical triangle attributes changes a small number of boundary pixels. Substituting the original GLB in the new application produces an exact R11 pixel match. This is a bounded rasterization difference, not an exact pixel match for the partitioned GLB.',
    'baselinePixelSHA256': hashlib.sha256(a.tobytes()).hexdigest(),
    'defaultPixelSHA256': hashlib.sha256(b.tobytes()).hexdigest(),
    'originalGeometryControlPixelSHA256': hashlib.sha256(control.tobytes()).hexdigest(),
}
(W / 'default/comparison.json').write_text(json.dumps(result, indent=2) + '\n')
print(json.dumps(result, indent=2))
assert result['pass'], 'Default appearance differs beyond the reviewed partition boundary tolerance'
