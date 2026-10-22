(() => {
  const form = document.querySelector('footer form');
  const input = form?.querySelector('input[type="file"]');
  const display = document.querySelector('.content_display');
  if (!form || !input || !display) return;
  function inspectFile(file) {
    return new Promise((resolve, reject) => {
      if (!file) { reject(new Error('Choose a file first.')); return; }
      const extension = file.name.includes('.') ? file.name.split('.').pop().toLowerCase() : '';
      if (extension !== 'txt') { resolve({ extension, content: null }); return; }
      const reader = new FileReader();
      reader.onload = () => resolve({ extension, content: String(reader.result ?? '') });
      reader.onerror = () => reject(new Error('The text file could not be read.'));
      reader.readAsText(file);
    });
  }
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    display.textContent = '';
    try {
      const result = await inspectFile(input.files[0]);
      if (result.extension === 'txt') display.textContent = result.content;
      else display.textContent = result.extension ? `File type: .${result.extension}` : 'The file has no extension.';
    } catch (error) { display.textContent = error.message; }
  });
})();
