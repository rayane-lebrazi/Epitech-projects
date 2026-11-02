document.querySelectorAll(".video-fullscreen-button").forEach(button => {
  const video = document.getElementById(button.dataset.videoId);
  button.addEventListener("click", async () => {
    if (!video) return;
    try {
      if (document.fullscreenElement === video) {
        await document.exitFullscreen();
      } else if (video.requestFullscreen) {
        await video.requestFullscreen();
      } else if (video.webkitEnterFullscreen) {
        video.webkitEnterFullscreen();
      }
    } catch {
      button.textContent = "Use the video controls to expand";
    }
  });
});
const footballActionPhoto = document.querySelector("#football-action-photo");
if (footballActionPhoto) {
  const showFootballPhoto = () => {
    if (footballActionPhoto.naturalWidth > 0) {
      footballActionPhoto.hidden = false;
      document.querySelector("#football-photo-placeholder").hidden = true;
    }
  };
  footballActionPhoto.addEventListener("load", showFootballPhoto);
  showFootballPhoto();
}
const note = document.querySelector("#writing-note");
if (note) {
  const status = document.querySelector("#note-status");
  try {
    note.value = localStorage.getItem("rayane-writing-note") || "";
  } catch {
    status.textContent = "Browser storage is unavailable.";
  }
  document.querySelector("#save-note").addEventListener("click", () => {
    try {
      localStorage.setItem("rayane-writing-note", note.value);
      status.textContent = "Saved in this browser.";
    } catch {
      status.textContent = "Could not save in this browser.";
    }
  });
  document.querySelector("#clear-note").addEventListener("click", () => {
    note.value = "";
    try {
      localStorage.removeItem("rayane-writing-note");
      status.textContent = "Notebook cleared.";
    } catch {
      status.textContent = "Text cleared.";
    }
  });
}
