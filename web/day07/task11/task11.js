document.querySelectorAll("p").forEach((paragraph) => {
  paragraph.addEventListener("mouseenter", () => {
    paragraph.classList.add("blue");
  });

  paragraph.addEventListener("mouseleave", () => {
    paragraph.classList.remove("blue");
  });

  paragraph.addEventListener("click", () => {
    paragraph.classList.toggle("highlighted");
  });
});
