const form = document.querySelector('#chat-form');
const list = document.querySelector('#messages');
const status = document.querySelector('#status');
function renderMessages(messages) {
  list.replaceChildren();
  for (const item of messages) {
    const entry = document.createElement('article');
    entry.className = 'list-group-item';
    const heading = document.createElement('strong');
    heading.textContent = item.name;
    const text = document.createElement('p');
    text.className = 'mb-0';
    text.textContent = item.message;
    entry.append(heading, text);
    list.append(entry);
  }
}
async function refreshMessages() {
  try {
    const response = await fetch('task07.php', { cache: 'no-store' });
    if (!response.ok) throw new Error('Could not refresh the chat.');
    const data = await response.json();
    renderMessages(data.messages);
  } catch (error) { status.textContent = error.message; }
}
form.addEventListener('submit', async (event) => {
  event.preventDefault();
  status.textContent = '';
  const values = Object.fromEntries(new FormData(form));
  try {
    const response = await fetch('task07.php', { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(values) });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Could not send message.');
    form.elements.message.value = '';
    await refreshMessages();
  } catch (error) { status.textContent = error.message; }
});
refreshMessages();
window.setInterval(refreshMessages, 4000);
