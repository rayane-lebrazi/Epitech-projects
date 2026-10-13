const box = document.querySelector(".exercice footer div");

box.addEventListener("click", () => {
  let name = "";

  while (!name.trim()) {
    name = prompt("What's your name?") ?? "";
  }

  if (confirm(`Are you sure that ${name} is your name ?`)) {
    const message = `Hello ${name}!`;
    alert(message);
    box.textContent = message;
  }
});
