// background-music.js

// Define the audio element
const backgroundMusic = new Audio('mii-maker.mp3');

// Function to play the background music
function playBackgroundMusic() {
    backgroundMusic.loop = true; // Loop the music
    backgroundMusic.volume = 0.5; // Adjust the volume as needed
    backgroundMusic.play(); // Play the music
}

// Call the function to play the background music when the page loads
window.addEventListener('load', playBackgroundMusic);
