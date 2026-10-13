const box = document.querySelector(".exercice footer div");
let typedCharacters = "";

window.addEventListener("keydown", (event) => {
  if (event.ctrlKey || event.altKey || event.metaKey) return;

  if (event.key === "Backspace") {
    typedCharacters = typedCharacters.slice(0, -1);
  } else if (event.key === "Enter") {
    typedCharacters += " ";
  } else if (event.key.length === 1) {
    typedCharacters += event.key;
  } else {
    return;
  }

  typedCharacters = typedCharacters.slice(-42);
  box.textContent = typedCharacters;
});
