const firstButton = document.querySelector("button");

firstButton.addEventListener("click", () => {
  document.querySelectorAll("p").forEach((paragraph) => {
    paragraph.style.display = "none";
  });
});
