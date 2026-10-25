# Pedestal R01 — depth interference repair

The production electrical GLB `98342260c4ad2b58e5e59794482f2821ade61a4fef4a52f5a8d782249e67488a` contained coincident plate and side-cap faces. Removing four caps isolated the main artifact but left bevel/front intersections. The repair unions the four complete bevelled solids in Blender, removes their original 176 runtime triangles, and inserts the closed 404-triangle boundary.

The original runtime attribute buffers and texture payloads remain byte-identical. New corners inherit UV0, UV1, normals and irradiance barycentrically. The plate owns the shared top atlas. One submicrometre sliver has a collapsed float32 UV: its existing atlas is sampled at the corners through the viewer's existing micro-lighting path. No shader, depth bias, camera clipping, resolution policy, atlas or reflection probe is changed.

Reproduction uses Blender 4.3.2 and the pinned npm dependencies. Set `PEDESTAL_WORK` to an isolated directory. Put the preceding production GLB, room metadata and authoring metadata in `baseline/`. Obtain the immutable master from release `luz-generator-vr-r01`.

1. Open that master in background Blender with `tools/extract-pedestal-source.py`.
2. Run `node tools/repair-electrical-pedestal.mjs --extract`.
3. Run background Blender with `tools/union-electrical-pedestal.py`.
4. Run `node tools/repair-electrical-pedestal.mjs` and `node tools/check-pedestal-runtime.mjs`.
5. Open the original master with `tools/update-pedestal-authoring.py`; it saves a separate master in `PEDESTAL_WORK`.
6. Run `tools/install-pedestal-assets.mjs`, the tests, and the browser checks before building/publishing. The finalizer requires geometry, browser, lifecycle and preservation proofs with matching asset hashes.

The native VR photographs are not included. This fixes topology; it does not establish new dimensional or visual accuracy for the vessel. Software rendering is used for correctness, not hardware frame-rate claims. The parent master and its Release remain intact.
