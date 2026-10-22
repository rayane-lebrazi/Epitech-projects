(() => {
  const zone = document.querySelector('.drag_drop');
  if (!zone) return;
  zone.setAttribute('role', 'button');
  zone.setAttribute('tabindex', '0');
  zone.setAttribute('aria-label', 'Drop an image here or choose an image file');
  function showImage(file) {
    if (!file || !file.type.startsWith('image/')) {
      zone.textContent = 'Please drop an image file.';
      return;
    }
    const image = document.createElement('img');
    image.alt = file.name || 'Dropped image';
    image.style.maxWidth = '100%';
    image.style.maxHeight = '360px';
    image.src = URL.createObjectURL(file);
    image.onload = () => URL.revokeObjectURL(image.src);
    zone.replaceChildren(image);
  }
  zone.addEventListener('dragover', (event) => { event.preventDefault(); zone.classList.add('dragging'); });
  zone.addEventListener('dragleave', () => zone.classList.remove('dragging'));
  zone.addEventListener('drop', (event) => {
    event.preventDefault();
    zone.classList.remove('dragging');
    showImage(event.dataTransfer.files[0]);
  });
  zone.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      const picker = document.createElement('input');
      picker.type = 'file';
      picker.accept = 'image/*';
      picker.addEventListener('change', () => showImage(picker.files[0]));
      picker.click();
    }
  });
})();
