const form = document.querySelector("#itemForm");
const textInput = document.querySelector("#itemText");
const typeSelect = document.querySelector("#itemType");
const list = document.querySelector("#itemList");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const item = document.createElement("li");
  item.classList.add(typeSelect.value);
  item.textContent = textInput.value.trim();
  list.append(item);
  textInput.value = "";
  textInput.focus();
});
