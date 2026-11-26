const forward = [[11.6, 3.791, 3.795], [15.65, 3.763, 3.758],
  [18.05, 3.739, 3.709], [22.4, 3.597, 3.471]];

export const sideDeckRail = Object.freeze({
  inset: .075, top: 5.025, topRadius: .026, topHalfWidth: .046,
  middle: 4.72, middleRadius: .014, postHalfWidth: .016, postTop: 5.006,
  bulwarkTop: 4.49, portAftCap: 4.84, floor: 3.95,
});

export function sideDeckSections(side) {
  const port = side === 1;
  return [[port ? 5.63 : 5.92, 3.78], [8.45, 3.8],
    ...forward.map(row => [row[0], row[port ? 2 : 1]])];
}

export const sideDeckBays = (from, to) => Math.ceil((to - from) / 1.22);
export const portSideLights = [9.58, 12.22, 14.86, 17.50, 20.14];
export const portSideSoffit = { start: 8.50, end: 20.50, inboard: 3.075, z: 5.88, lightY: 3.29 };
