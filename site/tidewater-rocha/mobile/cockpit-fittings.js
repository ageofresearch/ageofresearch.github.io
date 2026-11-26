// The perimeter is shared by the molded service cabinet and the walking clearance.
export function wetBarOutline() {
  const curves = [
    [[6.09,-2.57],[6.12,-2.27],[6.52,-1.78],[6.87,-1.49]],
    [[6.87,-1.49],[7.04,-1.35],[7.20,-1.39],[7.20,-1.60]],
    [[7.20,-1.60],[7.20,-1.94],[7.20,-2.18],[7.20,-2.42]],
    [[7.20,-2.42],[7.16,-2.54],[6.83,-2.70],[6.65,-2.79]],
    [[6.65,-2.79],[6.38,-2.84],[6.05,-2.81],[6.09,-2.57]],
  ];
  return curves.flatMap(([a,b,c,d]) => Array.from({length:3}, (_, i) => {
    const t=i/3, s=1-t;
    return a.map((value,k)=>s*s*s*value+3*s*s*t*b[k]+3*s*t*t*c[k]+t*t*t*d[k]);
  }));
}

// Keep the ledge outside the boarding path and give the sole and drum a
// continuous bearing surface. The fittings and coaming use the same datum.
export const portMooring = Object.freeze({
  start:3.08, end:5.58, inner:3.284, outer:3.79, axis:3.48, sill:4.34,
  cleat:3.51, drum:4.158, forwardCleat:4.665,
});

export const starboardMooring = Object.freeze({
  start:3.10, end:5.92, inner:3.388, outer:3.79, axis:3.567, sill:4.353, fascia:3.545,
  dockside:3.60, drum:4.19, forward:4.76,
});
