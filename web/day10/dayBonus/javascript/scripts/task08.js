(() => {
  const box = document.querySelector('footer div');
  if (!box) return;
  const label = document.createElement('label');
  label.textContent = 'Choose a date: ';
  const picker = document.createElement('input');
  picker.type = 'date';
  picker.setAttribute('aria-label', 'Choose a date');
  const output = document.createElement('span');
  output.className = 'saved-date';
  output.style.marginLeft = '12px';
  box.replaceChildren(label, picker, output);
  function displayDate(value) {
    if (!value) { output.textContent = ''; return; }
    const date = new Date(`${value}T12:00:00`);
    output.textContent = new Intl.DateTimeFormat('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(date).replaceAll(',', '');
  }
  picker.value = localStorage.getItem('task08_date') || '';
  displayDate(picker.value);
  picker.addEventListener('change', () => {
    localStorage.setItem('task08_date', picker.value);
    displayDate(picker.value);
  });
})();
