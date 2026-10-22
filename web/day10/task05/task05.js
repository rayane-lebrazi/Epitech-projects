const form = document.querySelector('#search-form');
const errorBox = document.querySelector('#error');
const tbody = document.querySelector('#results tbody');
form.addEventListener('input', () => { errorBox.textContent = ''; tbody.replaceChildren(); });
form.addEventListener('submit', async (event) => {
  event.preventDefault();
  errorBox.textContent = '';
  tbody.replaceChildren();
  const params = new URLSearchParams(new FormData(form));
  try {
    const response = await fetch(`task05.php?${params}`);
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'The search failed.');
    for (const product of data.products) {
      const row = document.createElement('tr');
      for (const value of [product.type, product.brand, product.price, product.number, product.stock]) {
        const cell = document.createElement('td');
        cell.textContent = value;
        row.append(cell);
      }
      tbody.append(row);
    }
  } catch (error) {
    errorBox.textContent = error.message || 'The search failed.';
  }
});
