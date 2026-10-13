const itemForm = document.querySelector("#itemForm");
const filterForm = document.querySelector("#filterForm");
const itemText = document.querySelector("#itemText");
const itemType = document.querySelector("#itemType");
const itemTags = document.querySelector("#itemTags");
const typeFilter = document.querySelector("#typeFilter");
const wordFilter = document.querySelector("#wordFilter");
const tagFilter = document.querySelector("#tagFilter");
const excludeTagFilter = document.querySelector("#excludeTagFilter");
const list = document.querySelector("#itemList");

function parseList(value) {
  return value.split(",").map((part) => part.trim().toLocaleLowerCase()).filter(Boolean);
}

function addTag(item, tag) {
  const normalized = tag.trim().toLocaleLowerCase();
  if (!normalized) return;
  const tags = item.dataset.tags ? item.dataset.tags.split("|") : [];
  if (tags.includes(normalized)) return;
  tags.push(normalized);
  item.dataset.tags = tags.join("|");
  renderTags(item);
}

function renderTags(item) {
  const tagBox = item.querySelector(".tags");
  tagBox.replaceChildren();
  const tags = item.dataset.tags ? item.dataset.tags.split("|") : [];
  tags.forEach((tag) => {
    const badge = document.createElement("span");
    badge.className = "tag";
    badge.textContent = tag;
    tagBox.append(badge);
  });
}

function addItem(text, type, tags) {
  const item = document.createElement("li");
  item.className = `item ${type}`;
  item.dataset.type = type;
  item.dataset.text = text;
  item.dataset.tags = "";

  const content = document.createElement("div");
  content.className = "item-text";
  content.textContent = text;
  const tagBox = document.createElement("div");
  tagBox.className = "tags";
  const tagForm = document.createElement("form");
  tagForm.className = "tag-form";
  const tagInput = document.createElement("input");
  tagInput.type = "text";
  tagInput.placeholder = "Add a tag";
  tagInput.setAttribute("aria-label", "Add a tag to this item");
  const tagButton = document.createElement("button");
  tagButton.type = "submit";
  tagButton.textContent = "Add tag";
  tagForm.append(tagInput, tagButton);
  tagForm.addEventListener("submit", (event) => {
    event.preventDefault();
    addTag(item, tagInput.value);
    tagInput.value = "";
  });
  item.append(content, tagBox, tagForm);
  list.append(item);
  tags.forEach((tag) => addTag(item, tag));
}

itemForm.addEventListener("submit", (event) => {
  event.preventDefault();
  addItem(itemText.value.trim(), itemType.value, parseList(itemTags.value));
  itemText.value = "";
  itemTags.value = "";
});

function filterItems() {
  const selectedTypes = Array.from(typeFilter.selectedOptions, (option) => option.value);
  const words = parseList(wordFilter.value);
  const requiredTags = parseList(tagFilter.value);
  const excludedTags = parseList(excludeTagFilter.value);

  list.querySelectorAll(".item").forEach((item) => {
    const itemTags = item.dataset.tags ? item.dataset.tags.split("|") : [];
    const matchesType = selectedTypes.length === 0 || selectedTypes.includes(item.dataset.type);
    const lowerText = item.dataset.text.toLocaleLowerCase();
    const matchesWords = words.length === 0 || words.some((word) => lowerText.includes(word));
    const hasRequiredTags = requiredTags.every((tag) => itemTags.includes(tag));
    const hasNoExcludedTags = excludedTags.every((tag) => !itemTags.includes(tag));
    item.hidden = !(matchesType && matchesWords && hasRequiredTags && hasNoExcludedTags);
  });
}

filterForm.addEventListener("submit", (event) => {
  event.preventDefault();
  filterItems();
});
filterForm.addEventListener("reset", () => requestAnimationFrame(filterItems));
