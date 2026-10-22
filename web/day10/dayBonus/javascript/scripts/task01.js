(() => {
  const key = 'task01_img';
  const link = document.querySelector('section a[href]');
  const box = document.querySelector('footer div');
  if (!link || !box) return;
  function displayImage(dataUrl) {
    box.replaceChildren();
    const image = document.createElement('img');
    image.src = dataUrl;
    image.alt = 'Image stored in localStorage';
    image.style.maxWidth = '100%';
    image.style.maxHeight = '360px';
    box.append(image);
  }
  async function storeImage() {
    box.textContent = 'Loading image…';
    try {
      const response = await fetch(link.href, { mode: 'cors' });
      if (!response.ok) throw new Error(`Image request failed (${response.status}).`);
      const blob = await response.blob();
      const reader = new FileReader();
      reader.onload = () => {
        try {
          localStorage.setItem(key, String(reader.result));
          displayImage(String(reader.result));
        } catch (error) {
          box.textContent = 'The image could not be stored in localStorage.';
        }
      };
      reader.onerror = () => { box.textContent = 'The image could not be read.'; };
      reader.readAsDataURL(blob);
    } catch (error) {
      box.textContent = 'The image could not be downloaded. Check the connection and try the image link again.';
    }
  }
  const saved = localStorage.getItem(key);
  if (saved) displayImage(saved);
  else storeImage();
  link.addEventListener('click', (event) => { event.preventDefault(); storeImage(); });
})();
