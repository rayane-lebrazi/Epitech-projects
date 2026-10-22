const square = document.querySelector('canvas');
const area = square.parentElement;
const coordinates = document.querySelectorAll('footer > div')[1];
area.style.position = 'relative';
const initialArea = area.getBoundingClientRect();
const initialSquare = square.getBoundingClientRect();
let x = initialSquare.left - initialArea.left - area.clientLeft;
let y = initialSquare.top - initialArea.top - area.clientTop;
Object.assign(square.style, { position: 'absolute', margin: '0', touchAction: 'none', cursor: 'grab' });
function render() {
  square.style.left = `${x}px`;
  square.style.top = `${y}px`;
  coordinates.textContent = `New coordinates => {x:${Math.round(x)}, y:${Math.round(y)}}`;
}
render();
let drag = null;
square.addEventListener('pointerdown', (event) => {
  if (event.button !== 0) return;
  event.preventDefault();
  const rect = square.getBoundingClientRect();
  drag = { id: event.pointerId, offsetX: event.clientX - rect.left, offsetY: event.clientY - rect.top };
  square.setPointerCapture(event.pointerId);
  square.style.cursor = 'grabbing';
});
square.addEventListener('pointermove', (event) => {
  if (!drag || drag.id !== event.pointerId) return;
  const rect = area.getBoundingClientRect();
  x = Math.max(0, Math.min(area.clientWidth - square.offsetWidth, event.clientX - rect.left - area.clientLeft - drag.offsetX));
  y = Math.max(0, Math.min(area.clientHeight - square.offsetHeight, event.clientY - rect.top - area.clientTop - drag.offsetY));
  render();
});
function finish() { drag = null; square.style.cursor = 'grab'; }
square.addEventListener('pointerup', finish);
square.addEventListener('pointercancel', finish);
square.addEventListener('lostpointercapture', finish);
