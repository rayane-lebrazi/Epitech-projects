function combineImages(urls) {
  const box = document.querySelector('footer div');
  if (!box || !Array.isArray(urls)) return Promise.reject(new TypeError('Pass an array of image URLs.'));
  const canvas = document.createElement('canvas');
  canvas.width = 700;
  canvas.height = 400;
  canvas.style.width = '100%';
  canvas.style.height = 'auto';
  canvas.style.maxWidth = '700px';
  canvas.setAttribute('aria-label', 'Canvas containing randomly positioned images');
  box.replaceChildren(canvas);
  const context = canvas.getContext('2d');
  context.fillStyle = '#ffffff';
  context.fillRect(0, 0, canvas.width, canvas.height);
  const loadedImages = urls.map((url) => new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error(`Could not load image: ${url}`));
    image.src = url;
  }));
  return Promise.all(loadedImages).then((images) => {
    for (const image of images) {
      const scale = Math.min(1, canvas.width / image.naturalWidth, canvas.height / image.naturalHeight);
      const width = image.naturalWidth * scale;
      const height = image.naturalHeight * scale;
      const x = Math.random() * Math.max(0, canvas.width - width);
      const y = Math.random() * Math.max(0, canvas.height - height);
      context.drawImage(image, x, y, width, height);
    }
    return canvas;
  }).catch((error) => {
    box.textContent = error.message;
    throw error;
  });
}
window.combineImages = combineImages;
const sampleImages = ['assets/shape-a.svg', 'assets/shape-b.svg', 'assets/shape-c.svg'];
combineImages(sampleImages).catch(() => {});
