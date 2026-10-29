from pathlib import Path
import hashlib,json
R=Path(__file__).resolve().parents[1];repo=R.parents[1];W=R/'work/boarding-vr-r01';P=R/'public';sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
original=json.load(open(R/'work/left-engine-r13/original-629.json'));assert len(original)==629
for path,h in original.items():assert sha(repo/'site'/path)==h,path
baseline=json.load(open(W/'baseline-hashes.json'));guard={p:h for p,h in baseline.items()if p.startswith(('assets/machinery/','assets/mechanics/','assets/selection-r01/'))}
for path,h in guard.items():assert sha(P/path)==h,path
strategy=Path('/workspace/documents/luz-de-mar-estrategia-vr-v1.0/Luz-de-Mar_Estrategia-de-reconstruccion-y-realismo-VR_v1.0.md');expected='7cfb4757350071bf1b7206b06e9939d43d19b21cea8ed6829fbcf5c183d34627';assert sha(strategy)==expected;assert sha(strategy.with_suffix('.pdf'))=='023852c67153ab6ff0f76cad934e8c38bb28f5f3105f1451a282bc3f4ed09b0c'
assert json.load(open(W/'baseline/manifest.json'))['mechanics']==json.load(open(P/'assets/manifest.json'))['mechanics']
assert sha(P/'assets/cockpit/room.glb')==sha(W/'baseline/cockpit/room.glb')
result={'originalFilesVerified':len(original),'machineryAssetsVerified':len(guard),'strategySHA256':expected,'cockpitGeometryUnchanged':True,'mechanicsManifestUnchanged':True,'pass':True};(W/'preservation.json').write_text(json.dumps(result,indent=2));print(result)
