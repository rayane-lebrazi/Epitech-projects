(() => {
  const key = 'task01_img';
  const box = document.querySelector('footer div');
  if (!box) return;
  const dataUrl = localStorage.getItem(key);
  if (!dataUrl) {
    box.textContent = 'No stored image found. Visit Task 01 first.';
    return;
  }
  const image = document.createElement('img');
  image.src = dataUrl;
  image.alt = 'Stored image';
  image.style.maxWidth = '100%';
  image.style.maxHeight = '360px';
  image.style.transformOrigin = 'center center';
  box.replaceChildren(image);
  let scale = 1;
  let timer = null;
  box.addEventListener('mouseenter', () => {
    if (timer) return;
    timer = window.setInterval(() => {
      scale = Math.max(0.05, scale * 0.95);
      image.style.transform = `scale(${scale})`;
    }, 1000);
  });
  box.addEventListener('mouseleave', () => {
    window.clearInterval(timer);
    timer = null;
    scale = 1;
    image.style.transform = 'scale(1)';
  });
  image.addEventListener('click', () => {
    localStorage.removeItem(key);
    window.clearInterval(timer);
    timer = null;
    box.textContent = 'Image deleted from localStorage.';
  });
})();
