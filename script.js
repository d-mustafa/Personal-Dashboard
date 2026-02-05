// PERSONAL DASHBOARD
console.log("fillRect")
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
let [secondHand, minuteHand, hourHand] = [0, 0, 0];
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
    
      
    clockCtx.fillStyle = "black";
    // second hand
    clockCtx.fillRect(clockCnv.width/2, clockCnv.height/2, 100, 2);
    
    // minute hand
    clockCtx.fillRect(clockCnv.width/2, clockCnv.height/2, 100, 5);
      
    // hour hand
    clockCtx.fillRect(clockCnv.width/2, clockCnv.height/2, 80, 5);
    
      
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
const drawCnv = document.getElementById("drawing");
const drawCtx = drawCnv.getContext("2d")
const clearBtn = document.getElementById("clear-drawing");
let clearCanvas = false;
clearBtn.addEventListener("click", () => {
    clearCanvas = true;
})

let draw = false;
let mouseX, mouseY;
drawCnv.addEventListener("mousedown", () => {
    draw = true;
})
drawCnv.addEventListener("mouseip", () => {
    draw = false;
})

cnv.addEventListener("mousemove", (event) => {
    let rect = cnv.getBoundingClientRect();
    console.log(event.clientX-rect.left, " ", event.clientY-rect.top)
})

drawCnv.addEventListener("mousemove", (event) => {
    let rect = drawCnv.getBoundingClientRect();
    [mouseX, mouseY] = [event.clientX-rect.left, event.clientY-rect.top];
})

function draw() {
    if (clearCanvas) {
        drawCtx.clearRect(0, 0, drawCnv.width, drawCnv.height);
        clearCanvas = false;
    }
    if (draw) {
        drawCtx.fillStyle = "black";
        drawCtx.beginPath();
        drawCtx.arc(mouseX, mouseY, 2.5, Math.PI * 2, 0);
        drawCtx.fill();
    }
  
    requestAnimationFrame(draw);
}
draw();
