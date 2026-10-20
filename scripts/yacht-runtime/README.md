This source builds the versioned yacht performance runtime. The original marina renderer, map, ball, controls, GLB and older runtime bundles remain available.

Build with Node.js:

    npm ci --prefix scripts/yacht-runtime
    node scripts/yacht-runtime/build.mjs

The locked dependency versions match the previous yacht runtime. The resulting renderer changes only the temporary camera used by sequential canonical mirror renders and the selection target from RGBA8 to R8. Each mirror keeps its own image target; the async view/probe camera remains separate. Mirror sizes, updates, materials, lighting, MSAA, FXAA and scene passes are retained.

The separate browser delivery selector probes a one-pixel lossless WebP with the available decoder before selecting the model. Unsupported or blocked decoders select the original PNG GLB; model/network failures retain the existing retry behavior. The preferred model changes image encoding and relocated offsets only. No lossy compression, geometry reduction or added quantization is applied.

Verification (Python Playwright, Chromium, Pillow and numpy required):

    python scripts/verify-yacht-lossless.py --output /tmp/yacht-lossless.json
    python scripts/test-yacht-performance.py --mode allocation --output-dir /tmp/yacht-performance --size 256
    python scripts/test-yacht-performance.py --mode controls --output-dir /tmp/yacht-performance --size 256
    python scripts/test-yacht-performance.py --mode visual --output-dir /tmp/yacht-performance --size 360
    python scripts/test-yacht-performance.py --mode recovery --output-dir /tmp/yacht-performance --size 256
    node scripts/test-marina-diagnostics.mjs
    python scripts/test-marina-diagnostics-browser.py --output-dir /tmp/yacht-diagnostics
    node scripts/validate-site.mjs

The visual test executes actual draws from startup. The allocation and controls tests suppress draws while retaining real decoding, shaders and GL allocation. Software rendering and requested GL storage do not certify Mac frame rate, physical VRAM or total process RAM. All comparisons are between browser versions; they do not imply pixel identity with Blender or completion of the VR reconstruction.
