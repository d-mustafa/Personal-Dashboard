// PERSONAL DASHBOARD
console.log("second minute hour");
// Clock
const outerClock = document.getElementById("clock-widget-container");
const clockCnv = document.getElementById("clock");
const clockCtx = clockCnv.getContext("2d");

outerClock.addEventListener("mouseenter", clockify);
outerClock.addEventListener("mouseleave", unclockify);
function clockify() {
     clockCnv.style.borderRadius = "100rem";
}
function unclockify() {
     clockCnv.style.borderRadius = "0.5rem";
}
let [secondHand, minuteHand, hourHand] = [-Math.PI/2, -Math.PI/2, -Math.PI/2];
let [second, minute, hour] = [Date.now(), Date.now(), Date.now()];
function tick() {
    clockCtx.clearRect(0, 0, clockCnv.width, clockCnv.height);

    // clocks center
    clockCtx.fillStyle = "black";
    clockCtx.beginPath();
    clockCtx.arc(clockCnv.width/2, clockCnv.height/2, 5, Math.PI * 2, 0);
    clockCtx.fill();
    
    clockCtx.fillStyle = "white";
    clockCtx.beginPath();
    clockCtx.arc(clockCnv.width/2, clockCnv.height/2, 2.5, Math.PI * 2, 0);
    clockCtx.fill();
    

    let now = Date.now();
    clockCtx.fillStyle = "#51a2ff";
    // second hand
    clockCtx.save();
    clockCtx.translate(clockCnv.width/2, clockCnv.height/2);
    clockCtx.rotate(secondHand);
    clockCtx.fillRect(-50, -1, 230, 2);
    clockCtx.restore();
    if (now - second >= 1000) {
        secondHand += Math.PI/16;
        second = Date.now();
    }

    clockCtx.fillStyle = "black";
    // minute hand
    clockCtx.save();
    clockCtx.translate(clockCnv.width/2, clockCnv.height/2);
    clockCtx.rotate(minuteHand);
    clockCtx.fillRect(-25, -2.5, 145, 5);
    clockCtx.restore();
    if (now - minute >= 1000*60) {
        minuteHand += Math.PI/16;
        minute = Date.now();
    }
      
    // hour hand
    clockCtx.save();
    clockCtx.translate(clockCnv.width/2, clockCnv.height/2);
    clockCtx.rotate(hourHand);
    clockCtx.fillRect(-20, -2.5, 120, 5);
    clockCtx.restore();
    if (now - hour >= 1000*3600) {
        hourHand += Math.PI/16;
        hour = Date.now();
    }
    
      
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
let mouseX, mouseY;
drawCnv.addEventListener("mousedown", () => {
    drawEnabled = true;
})
drawCnv.addEventListener("mouseup", () => {
    drawEnabled = false;
})

drawCnv.addEventListener("mousemove", (event) => {
    let rect = drawCnv.getBoundingClientRect();
    [mouseX, mouseY] = [(event.clientX-rect.left)*2, (event.clientY-rect.top)*2];
})

function draw() {
    if (clearCanvas) {
        drawCtx.clearRect(0, 0, drawCnv.width, drawCnv.height);
        clearCanvas = false;
    }
    if (drawEnabled) {
        drawCtx.fillStyle = "black";
        drawCtx.beginPath();
        drawCtx.arc(mouseX, mouseY, 4, Math.PI * 2, 0);
        drawCtx.fill();
    }
  
    requestAnimationFrame(draw);
}
draw();




