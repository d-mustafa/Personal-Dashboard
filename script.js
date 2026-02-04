// PERSONAL DASHBOARD

// Clock
const outerClock = document.getElementById("clock-widget-container");
const cnv = document.getElementById("clock");
const ctx = cnv.getContext("2d");

outerClock.addEventListener("mouseenter", clockify);
outerClock.addEventListener("mouseleave", unclockify);
function clockify() {
  cnv.style.borderRadius = "100rem";
}
function unclockify() {
  cnv.style.borderRadius = "0.5rem";
}

let x = 0;
function tick() {
  ctx.clearRect(0, 0, cnv.width, cnv.height);

  ctx.fillStyle = "black";
  ctx.beginPath();
  ctx.arc(x, 50, 20, Math.PI * 2, 0);
  ctx.fill();

  x++;
  requestAnimationFrame(tick);
}
tick();

// Music
let fileInput = document.getElementById("file-input");
function triggerFileInput() {
  fileInput.click();
}

const audioPlayer = document.getElementById("audio-player");
let audioFile;
fileInput.addEventListener("change", (event) => {
  const files = event.target.files;

  if (files && files.length > 0) {
    // Process the first selected file
    const file = files[0];
    console.log(`Audio file: ${file.name}, ${file.type}, ${file.size}bytes`);

    audioPlayer.src = URL.createObjectURL(file);
    audioPlayer.play();
  }
});

// Drawing
