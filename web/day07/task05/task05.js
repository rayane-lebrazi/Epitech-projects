const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

context.beginPath();
context.moveTo(6, 6);
context.lineTo(14, 10);
context.lineTo(6, 14);
context.closePath();
context.strokeStyle = "white";
context.lineWidth = 1;
context.stroke();

const audio = document.querySelector("audio");
audio.src = "https://universal-soundbank.com/sounds/13631.mp3";

const controls = audio.parentElement;
const buttons = controls.querySelectorAll("button");
const playButton = document.createElement("button");
playButton.textContent = "Play";
controls.insertBefore(playButton, buttons[0]);

playButton.addEventListener("click", () => {
  audio.play().catch((error) => console.error("Audio could not be played:", error));
});

buttons[0].addEventListener("click", () => audio.pause());
buttons[1].addEventListener("click", () => {
  audio.pause();
  audio.currentTime = 0;
});
