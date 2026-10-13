const box = document.querySelector(".exercice footer div");
let clicks = 0;

box.addEventListener("click", () => {
  clicks++;
  box.textContent = `Clicks: ${clicks}`;
});
