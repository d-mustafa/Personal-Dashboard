// PERSONAL DASHBOARD

// Clock

// Music
let fileInput = document.getElementById("file-input");
function triggerFileInput() {
  fileInput.click();
}

let audioPlayer = document.getElementById("audio-player");
let audioFile;
fileInput.addEventListener("change", (event) => {
  const files = event.target.files;

  if (files && files.length > 0) {
    // Process the first selected file
    const file = files[0];
    console.log(`Audio file: ${file.name}, ${file.type}, ${file.size}bytes`);
    
    audioPlayer.src = URL.createObjectURL(audioFile);
    audioPlayer.play();

    // // Read the file into memory
    // let reader = new FileReader();
    // reader.onload = function(e) {
    //   audioFile = new Audio(e.target.result);
    //   audioPlayer.src = URL.createObjectURL(audioFile);
    //   audioPlayer.play();
    // }
  }
})

// Drawing

