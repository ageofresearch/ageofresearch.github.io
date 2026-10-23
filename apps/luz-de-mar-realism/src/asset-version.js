// Bump with asset revisions so previously visited clients cannot mix old UVs
// with new lightmaps from the same GitHub Pages paths.
export const ASSET_REVISION='left-vr-grid-r13';
export const assetURL=path=>path+(path.includes('?')?'&':'?')+'v='+ASSET_REVISION;
