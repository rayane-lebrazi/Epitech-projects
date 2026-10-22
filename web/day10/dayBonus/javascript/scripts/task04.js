(() => {
  const dot = document.querySelector('.dot');
  const label = document.querySelector('footer p');
  const url = 'https://data-api.coindesk.com/spot/v1/latest/tick?market=coinbase&instruments=BTC-EUR';
  async function updateBitcoinPrice() {
    try {
      const response = await fetch(url, { cache: 'no-store' });
      if (!response.ok) throw new Error(`Price request failed (${response.status}).`);
      const payload = await response.json();
      const values = payload.Data && typeof payload.Data === 'object' ? Object.values(payload.Data) : [];
      const tick = values[0] || payload;
      const price = Number(tick.PRICE ?? tick.VALUE ?? tick.price);
      if (!Number.isFinite(price)) throw new Error('The API response did not include a BTC-EUR price.');
      const previous = Number(localStorage.getItem('btc_price'));
      let color = 'green';
      let description = 'Bitcoin up or new value stored';
      if (Number.isFinite(previous)) {
        if (price < previous) { color = 'red'; description = 'Bitcoin price decreased'; }
        else if (price === previous) { color = 'orange'; description = 'Bitcoin price unchanged'; }
      }
      localStorage.setItem('btc_price', String(price));
      if (dot) {
        dot.style.backgroundColor = color;
        dot.setAttribute('aria-label', description);
        dot.title = `${description}: €${price.toLocaleString('en-GB')}`;
      }
      if (label) label.textContent = `Bitcoin Evolution — €${price.toLocaleString('en-GB')}`;
    } catch (error) {
      if (label) label.textContent = 'Bitcoin price is unavailable. Try again later.';
      if (dot) { dot.style.backgroundColor = 'gray'; dot.title = error.message; }
    }
  }
  updateBitcoinPrice();
})();
