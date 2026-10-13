const input = document.querySelector("#listItem");
const button = document.querySelector("button");

button.addEventListener("click", () => {
  const item = document.createElement("div");
  item.textContent = input.value;
  input.insertAdjacentElement("afterend", item);
  input.value = "";
});
