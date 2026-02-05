// PERSONAL DASHBOARD
console.log("every minute on the minute");
// Clock
const clockCnv = document.getElementById("clock");
const clockCtx = clockCnv.getContext("2d");

// get the time
let time = new Date();
let seconds = time.getSeconds();
let minutes = time.getMinute();
let hours = time.getHours();

let secondHand = -Math.PI/2 + (2 * Math.PI/60)*seconds;
let minuteHand = -Math.PI/2 + (2 * Math.PI/60)*minutes;
let hourHand = -Math.PI/2 + (2 * Math.Pi/12)*hours + (Math.PI/12)*(minutes/60) + (Math.PI/12)*(seconds/3600);

let [secondTick, minuteTick, hourTick] = [Date.now(), Date.now(), Date.now()];
function tick() {
    clockCtx.clearRect(0, 0, clockCnv.width, clockCnv.height);

    // clocks bottom
    clockCtx.fillStyle = "black";
    clockCtx.beginPath();
    clockCtx.arc(clockCnv.width/2, clockCnv.height/2, 5, Math.PI * 2, 0);
    clockCtx.fill();

    let now = Date.now();
    clockCtx.fillStyle = "#51a2ff";
    // second hand
    clockCtx.save();
    clockCtx.translate(clockCnv.width/2, clockCnv.height/2);
    clockCtx.rotate(secondHand);
    clockCtx.fillRect(-45, -1, 180, 2);
    clockCtx.restore();
    if (now - secondTick >= 1000) {
        secondHand += 2 * Math.PI/60; // 60 seconds for a full revolution
        secondTick = Date.now();
    }

    clockCtx.fillStyle = "black";
    // minute hand
    clockCtx.save();
    clockCtx.translate(clockCnv.width/2, clockCnv.height/2);
    clockCtx.rotate(minuteHand);
    clockCtx.fillRect(-25, -2.5, 145, 4);
    clockCtx.restore();
    if (now - minuteTick >= 1000*60) {
        minuteHand += 2 * Math.PI/60; // 60 minutes for a full revolution
        minuteTick = Date.now();
    }
      
    // hour hand
    clockCtx.save();
    clockCtx.translate(clockCnv.width/2, clockCnv.height/2);
    clockCtx.rotate(hourHand);
    clockCtx.fillRect(-20, -2.5, 120, 5);
    clockCtx.restore();
    if (now - hourTick >= 1000) {
        hourHand += 2 * Math.PI/3600; // 3600 seconds for a full revolution
        hourTick = Date.now();
    }

    // clocks top
    clockCtx.fillStyle = "white";
    clockCtx.beginPath();
    clockCtx.arc(clockCnv.width/2, clockCnv.height/2, 2.5, Math.PI * 2, 0);
    clockCtx.fill();
      
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

let interacted = false;
document.addEventListener("click", () => {
     if (!interacted) {
          audioPlayer.play();
          interacted = true;
     }
})

// Drawing
const drawCnv = document.getElementById("drawing");
const drawCtx = drawCnv.getContext("2d")
const clearBtn = document.getElementById("clear-drawing");
let clearCanvas = false;
clearBtn.addEventListener("click", () => {
    clearCanvas = true;
})

let drawEnabled = false;
document.addEventListener("mousedown", () => {
    drawEnabled = true;
})
document.addEventListener("mouseup", () => {
    drawEnabled = false;
})


let [mouseX, mouseY] = [0, 0];
let lastX, lastY;
drawCnv.addEventListener("mousemove", (event) => {
    lastX = mouseX;
    lastY = mouseY;
    const rect = drawCnv.getBoundingClientRect();
    const scaleX = drawCnv.width / rect.width;
    const scaleY = drawCnv.height / rect.height;
    mouseX = (event.clientX - rect.left) * scaleX;
    mouseY = (event.clientY - rect.top) * scaleY;
})

function draw() {
    if (clearCanvas) {
        drawCtx.clearRect(0, 0, drawCnv.width, drawCnv.height);
        clearCanvas = false;
        [mouseX, mouseY, lastX, lastY] = [0, 0, 0, 0];
    }
    let mouseInCanvas = mouseX > 0 && mouseY > 0 && mouseX < drawCnv.width && mouseY < drawCnv.height
    if (drawEnabled && mouseInCanvas) {
        drawCtx.fillStyle = "black";
        drawCtx.beginPath();
        drawCtx.arc(lastX, lastY, 5, Math.PI * 2, 0);
        drawCtx.fill();
        
        drawCtx.beginPath();
        drawCtx.arc(mouseX, mouseY, 5, Math.PI * 2, 0);
        drawCtx.fill();
    }
    if (!mouseInCanvas) [mouseX, mouseY, lastX, lastY] = [0, 0, 0, 0];
  
    requestAnimationFrame(draw);
}
draw();
















