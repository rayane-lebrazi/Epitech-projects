const square = document.querySelector(".exercice canvas");
const box = square.parentElement;
const coordinates = document.querySelector(".exercice footer div:nth-child(2)");

box.style.position = "relative";
square.style.position = "absolute";
square.style.touchAction = "none";

let x = Math.max(0, Math.round((box.clientWidth - square.offsetWidth) / 2));
let y = Math.max(0, Math.round((box.clientHeight - square.offsetHeight) / 2));
let dragOffsetX = 0;
let dragOffsetY = 0;

function showPosition() {
  square.style.left = `${x}px`;
  square.style.top = `${y}px`;
  coordinates.textContent = `New coordinates => {x:${x}, y:${y}}`;
}

square.addEventListener("pointerdown", (event) => {
  const squareRect = square.getBoundingClientRect();
  dragOffsetX = event.clientX - squareRect.left;
  dragOffsetY = event.clientY - squareRect.top;
  square.setPointerCapture(event.pointerId);
});

square.addEventListener("pointermove", (event) => {
  if (!square.hasPointerCapture(event.pointerId)) return;

  const boxRect = box.getBoundingClientRect();
  const maxX = Math.max(0, box.clientWidth - square.offsetWidth);
  const maxY = Math.max(0, box.clientHeight - square.offsetHeight);
  x = Math.round(Math.min(maxX, Math.max(0, event.clientX - boxRect.left - dragOffsetX)));
  y = Math.round(Math.min(maxY, Math.max(0, event.clientY - boxRect.top - dragOffsetY)));
  showPosition();
});

showPosition();
