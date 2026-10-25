'use strict';
const views = {
  full_body: { label: 'Full body', suffix: 'full_body', width: 2048, height: 3072, note: 'Full-body studio renders · 2048 × 3072 px · Select either image to enlarge.' },
  face: { label: 'Face', suffix: 'face', width: 2048, height: 2048, note: 'Face close-ups · 2048 × 2048 px · Original scan detail, with no generated restoration.' },
  three_quarter: { label: 'Three-quarter', suffix: 'inspection_three_quarter', width: 768, height: 1152, note: 'Three-quarter inspection · 768 × 1152 px · Native poses and original materials.' },
  profile: { label: 'Profile', suffix: 'inspection_profile', width: 768, height: 1152, note: 'Profile inspection · 768 × 1152 px · Original pose, proportions, clothing, and hair.' }
};
const subjects = {
  posed_plus: { name: 'Posed People Plus', image: document.querySelector('#posed-image'), original: document.querySelector('#posed-original'), alt: 'Adult male Posed People Plus scan with crossed arms and raised gaze' },
  four_d: { name: '4D People — Aliyah', image: document.querySelector('#four-d-image'), original: document.querySelector('#four-d-original'), alt: 'Frame 1 of Aliyah’s genuine volumetric dancing capture' }
};
const buttons = [...document.querySelectorAll('[data-view]')];
let currentView = 'full_body';
function selectView(key) {
  const view = views[key];
  if (!view) return;
  currentView = key;
  document.querySelector('.scan-grid').dataset.currentView = key;
  buttons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.view === key)));
  for (const [id, subject] of Object.entries(subjects)) {
    const path = `assets/${id}_${view.suffix}.png`;
    subject.image.src = path;
    subject.image.width = view.width;
    subject.image.height = view.height;
    subject.image.alt = `${view.label} view: ${subject.alt}.`;
    subject.original.href = path;
    const link = subject.image.closest('.image-link');
    link.href = path;
    link.setAttribute('aria-label', `Enlarge ${subject.name}: ${view.label.toLowerCase()} view`);
  }
  document.querySelector('#view-note').textContent = view.note;
}
buttons.forEach(button => button.addEventListener('click', () => selectView(button.dataset.view)));
const viewer = document.querySelector('#image-viewer');
const viewerImage = document.querySelector('#viewer-image');
const closeButton = document.querySelector('#viewer-close');
document.querySelectorAll('.image-link').forEach(link => link.addEventListener('click', event => {
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || typeof viewer.showModal !== 'function') return;
  event.preventDefault();
  const subject = subjects[link.dataset.person];
  viewerImage.src = subject.image.src;
  viewerImage.alt = subject.image.alt;
  document.querySelector('#viewer-title').textContent = `${subject.name} / ${views[currentView].label}`;
  document.querySelector('#viewer-original').href = link.href;
  viewer.showModal();
  closeButton.focus();
}));
closeButton.addEventListener('click', () => viewer.close());
viewer.addEventListener('click', event => {
  if (event.target === viewer) viewer.close();
});
viewer.addEventListener('close', () => viewerImage.removeAttribute('src'));
