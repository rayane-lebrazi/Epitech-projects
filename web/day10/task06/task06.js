const form = document.querySelector('#product-form');
const status = document.querySelector('#status');
form.addEventListener('submit', async (event) => {
  event.preventDefault();
  status.textContent = '';
  const params = new URLSearchParams(new FormData(form));
  try {
    const response = await fetch(`task06.php?${params}`);
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Could not save the product.');
    status.className = 'mt-3 text-success';
    status.textContent = `Product ${data.action}: ${data.product.type} / ${data.product.brand}, price ${data.product.price}, stock ${data.product.stock}.`;
  } catch (error) {
    status.className = 'mt-3 text-danger';
    status.textContent = error.message || 'Could not save the product.';
  }
});
