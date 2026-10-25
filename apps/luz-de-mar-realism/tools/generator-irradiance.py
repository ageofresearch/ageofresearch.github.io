"""Reconcile Monte Carlo estimates of the same physical micro-surface point.

Cycles bakes a separate estimate into each color CORNER. Two triangles can
therefore disagree at an identical position/normal and produce a diagonal seam.
Average those equivalent estimates, restricted to the new generator's micro
transport. Hard normals, different materials, atlas surfaces and the retained
electrical front remain separate. This changes neither albedo nor geometry.
"""
import numpy as np

def continuous_generator_irradiance(mesh, values):
    values=np.asarray(values,dtype=np.float32).copy();n=len(mesh.loops)
    vertices=np.empty(n,dtype=np.int32);mesh.loops.foreach_get('vertex_index',vertices)
    ids=np.empty(len(mesh.vertices),dtype=np.float32);mesh.attributes['_GENERATOR_ID'].data.foreach_get('value',ids)
    modes=np.empty_like(ids);mesh.attributes['_BAKE_MODE'].data.foreach_get('value',modes)
    selected=(ids[vertices]==2)&(modes[vertices]==1)
    coords=np.empty(len(mesh.vertices)*3,dtype=np.float32);mesh.vertices.foreach_get('co',coords)
    normals=np.empty(n*3,dtype=np.float32);mesh.corner_normals.foreach_get('vector',normals)
    materials=np.empty(len(mesh.polygons),dtype=np.int32);mesh.polygons.foreach_get('material_index',materials)
    lengths=np.empty_like(materials);mesh.polygons.foreach_get('loop_total',lengths)
    keys=np.column_stack((np.round(coords.reshape(-1,3)[vertices[selected]],6),np.round(normals.reshape(-1,3)[selected],5),np.repeat(materials,lengths)[selected]))
    _,inverse,counts=np.unique(keys,axis=0,return_inverse=True,return_counts=True)
    before=values[selected].copy();sums=np.zeros((len(counts),3),dtype=np.float64)
    np.add.at(sums,inverse,before);means=(sums/counts[:,None]).astype(np.float32)
    lo=np.full_like(sums,np.inf);hi=np.full_like(sums,-np.inf)
    np.minimum.at(lo,inverse,before);np.maximum.at(hi,inverse,before)
    disagreement=(hi-lo).max(1);values[selected]=means[inverse]
    assert np.isfinite(values).all()and(values>=0).all()
    proof={'method':'Mean of equal-sample Cycles CORNER estimates at the same position (1um key), normal (1e-5 key), material and micro-transport mode. New generator ID2 only; hard edges and retained-front samples are not mixed.',
           'selectedCorners':int(selected.sum()),'physicalSampleGroups':len(counts),'sharedGroups':int((counts>1).sum()),'discontinuousGroupsBefore':int(((counts>1)&(disagreement>1e-5)).sum()),'maximumSharedCornerDisagreementBefore':float(disagreement.max()),'maximumSharedCornerDisagreementAfter':0.,'retainedFrontTransportUnchanged':True}
    return values,proof
