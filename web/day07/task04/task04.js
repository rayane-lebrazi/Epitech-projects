const buttons = document.querySelectorAll(".exercice footer button");
const colorMenu = document.querySelector(".exercice footer select");
let fontSize = Number.parseFloat(getComputedStyle(document.body).fontSize);

buttons[0].addEventListener("click", () => {
  fontSize += 1;
  document.body.style.fontSize = `${fontSize}px`;
});

buttons[1].addEventListener("click", () => {
  fontSize = Math.max(8, fontSize - 1);
  document.body.style.fontSize = `${fontSize}px`;
});

colorMenu.addEventListener("change", () => {
  if (colorMenu.value) {
    document.body.style.backgroundColor = colorMenu.value;
  }
});
