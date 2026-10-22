
const audio = document.getElementById("audio");
const playButton = document.getElementById("play");
const pauseButton = document.getElementById("pause");
const stopButton = document.getElementById("stop");
const status = document.getElementById("status");

playButton.addEventListener("click", async () => {
    console.log("Play clicked");

    try {
        await audio.play();
        status.textContent = "Playing";
    } catch (error) {
        console.error("Playback error:", error);
        status.textContent = "Error playing audio";
    }
});

pauseButton.addEventListener("click", () => {
    audio.pause();
    status.textContent = "Paused";
    console.log("Pause clicked");
});

stopButton.addEventListener("click", () => {
    audio.pause();
    audio.currentTime = 0;
    status.textContent = "Stopped";
    console.log("Stop clicked");
});

audio.addEventListener("ended", () => {
    status.textContent = "Finished";
});
