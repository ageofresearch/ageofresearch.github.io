// Pending GPU work can outlive room eviction while shader compilation resolves.
// Keep those staged resources visible to peak-memory estimates until released.
export const pendingAppearanceBundles=new Set();
