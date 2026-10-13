const itemForm = document.querySelector("#itemForm");
const filterForm = document.querySelector("#filterForm");
const itemText = document.querySelector("#itemText");
const itemType = document.querySelector("#itemType");
const typeFilter = document.querySelector("#typeFilter");
const wordFilter = document.querySelector("#wordFilter");
const list = document.querySelector("#itemList");

itemForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const item = document.createElement("li");
  item.classList.add(itemType.value);
  item.textContent = itemText.value.trim();
  list.append(item);
  itemText.value = "";
});

function filterItems() {
  const query = wordFilter.value.trim().toLocaleLowerCase();
  list.querySelectorAll("li").forEach((item) => {
    const matchesType = typeFilter.value === "all" || item.classList.contains(typeFilter.value);
    const matchesText = !query || item.textContent.toLocaleLowerCase().includes(query);
    item.hidden = !(matchesType && matchesText);
  });
}

filterForm.addEventListener("submit", (event) => {
  event.preventDefault();
  filterItems();
});
filterForm.addEventListener("reset", () => requestAnimationFrame(filterItems));
