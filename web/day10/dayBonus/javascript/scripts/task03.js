(() => {
  const button = document.querySelector('footer button');
  if (!button) return;
  button.addEventListener('click', async () => {
    button.disabled = true;
    const originalText = button.textContent;
    button.textContent = 'Downloading…';
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      if (!response.ok) throw new Error(`Request failed (${response.status}).`);
      const posts = await response.json();
      const blob = new Blob([JSON.stringify(posts, null, 2)], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'posts.txt';
      document.body.append(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    } catch (error) {
      window.alert('The API request failed. Please try again.');
    } finally {
      button.disabled = false;
      button.textContent = originalText;
    }
  });
})();
