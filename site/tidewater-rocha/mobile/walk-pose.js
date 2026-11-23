// The yacht's bow points along local +Z, starboard along -X and up along +Y.
// Read the submitted camera matrix so smoothed stairs and camera tours agree
// with the pixels on screen, even when the navigation angles differ.
const sides = ['Proa', 'Estribor', 'Popa', 'Babor'];
const degrees = 180 / Math.PI;

export function mountWalkPose(mapControl, camera) {
  const corner = document.createElement('div');
  corner.className = 'yacht-corner';
  const panel = document.createElement('div');
  panel.className = 'yacht-pose';
  panel.lang = 'es';
  panel.setAttribute('role', 'group');
  panel.setAttribute('aria-label', 'Posición del personaje y mirada de la cámara');
  panel.hidden = true;
  const lines = Array.from({length: 4}, () => document.createElement('div'));
  panel.append(...lines);
  corner.append(panel, mapControl);
  document.body.append(corner);

  const localCamera = camera.matrixWorld.clone();
  let lastX, lastY, lastFeet, lastEye, lastHeading, lastPitch;
  function decimal(steps, places) {
    return (steps / 10 ** places).toFixed(places).replace('.', ',');
  }
  return function updatePose(walk) {
    if (!walk.active) {
      if (!panel.hidden) panel.hidden = true;
      return;
    }
    const group = walk.model.group;
    const m = localCamera.copy(group.matrixWorld).invert().multiply(camera.matrixWorld).elements;
    const x = Math.round(walk.nav.position[0] * 1000);
    const y = Math.round(walk.nav.position[1] * 1000);
    const feet = Math.round(walk.nav.elevation * 1000);
    const eye = Math.round((m[13] + group.userData.yacht.seaReference) * 1000);
    const heading = (Math.round(Math.atan2(m[8], -m[10]) * degrees * 10) + 3600) % 3600;
    const pitch = Math.round(Math.atan2(-m[9], Math.hypot(m[8], m[10])) * degrees * 10);

    if (x !== lastX || y !== lastY) {
      lines[0].textContent = 'X ' + decimal(x, 3) + '   Y ' + decimal(y, 3);
      lastX = x;
      lastY = y;
    }
    if (feet !== lastFeet || eye !== lastEye) {
      lines[1].textContent = 'Z pies ' + decimal(feet, 3) + '   Z cámara ' + decimal(eye, 3);
      lastFeet = feet;
      lastEye = eye;
    }
    if (heading !== lastHeading) {
      lines[2].textContent = 'Rumbo ' + decimal(heading, 1) + '° · ' + sides[Math.round(heading / 900) % 4];
      lastHeading = heading;
    }
    if (pitch !== lastPitch) {
      lines[3].textContent = 'Inclinación ' + decimal(pitch, 1) + '°';
      lastPitch = pitch;
    }
    if (panel.hidden) panel.hidden = false;
  };
}
