const form = document.querySelector('#brand-form');
const typeInput = form.elements.type;
const brandInput = form.elements.brand;
const status = document.querySelector('#request-status');
let requestId = 0;
function typeSyntax(value) {
  if (!value) return { message: 'No types sent yet!', valid: false };
  if (value.length < 3) return { message: `${value}: this type does not have enough characters.`, valid: false };
  if (value.length > 10) return { message: `${value}: this type has too many characters.`, valid: false };
  if (!/^[a-z-]+$/i.test(value)) return { message: `${value}: this type has non-alphabetical characters (different from '-').`, valid: false };
  return { message: `${value}: checking the shop…`, valid: true };
}
function brandSyntax(value) {
  if (!value) return { message: 'No brands sent yet!', valid: false };
  if (value.length < 2) return { message: `${value}: this brand does not have enough characters.`, valid: false };
  if (value.length > 20) return { message: `${value}: this brand has too many characters.`, valid: false };
  if (!/^[a-z0-9&-]+$/i.test(value)) return { message: `${value}: this brand has invalid characters.`, valid: false };
  return { message: `${value}: checking the shop…`, valid: true };
}
function show(element, result) {
  element.textContent = result.message;
  element.classList.toggle('text-success', result.valid);
  element.classList.toggle('text-danger', !result.valid);
}
async function validate() {
  const type = typeInput.value.trim();
  const brand = brandInput.value.trim();
  const typeResult = typeSyntax(type);
  const brandResult = brandSyntax(brand);
  show(document.querySelector('#type-message'), typeResult);
  show(document.querySelector('#brand-message'), brandResult);
  status.textContent = '';
  if (!typeResult.valid || !brandResult.valid) return;
  const id = ++requestId;
  try {
    const params = new URLSearchParams({ type, brand });
    const response = await fetch(`task04.php?${params}`);
    const data = await response.json();
    if (id !== requestId) return;
    show(document.querySelector('#type-message'), { message: data.messages.type, valid: data.valid });
    show(document.querySelector('#brand-message'), { message: data.messages.brand, valid: data.valid });
    status.textContent = data.valid ? 'This brand can be added for this type.' : '';
  } catch (error) {
    if (id === requestId) status.textContent = 'Could not contact the server.';
    status.className = 'text-danger';
  }
}
typeInput.addEventListener('input', validate);
brandInput.addEventListener('input', validate);
