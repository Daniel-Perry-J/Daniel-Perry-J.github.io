// Access the user's camera
function openCamera() {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        // Display the video stream on the page
        const video = document.querySelector('video');
        video.srcObject = stream;
        video.play();
      })
      .catch((err) => {
        console.error('Error accessing the camera', err);
      });
}


// strings
var start = "Simon Says : ";
var commands = [
    "Touch your nose",
    "Point at eye",
    "Read a book",
    "Smile",
    "look sad",
    "make an angry face",
    "make a happy face",
    "Go outside (but you already are :))",
    "Place your hand on the sculpture",
    "Clap your hands",
    "Take a selfie",
    "Find a friend",
    "Do 10 pushups",
    "Do 10 jumping jacks",
    "Do 10 laps around the sculpture",
    "Take a nap (you deserve it)",
    "give yourself a thumbs up!",
    "Spin in a circle",
    "Jump on one foot",
    "Wave hello",
    "Strike a pose",
    "Wiggle your ears",
    "Blink three times",
    "Pretend to swim",
    "Balance a book on your head",
    "Make a funny face",
    "Do a dance move",
    "Sing a note",
    "Draw a smiley in the air",
    "Act like a robot",
    "Mimic playing a guitar",
    "Pretend to fly",
    "Do a magic trick",
    "Take a bow",
    "Act surprised",
    "Whistle a tune",
    "Play air drums",
    "Walk like a penguin",
    "Salute",
    "Do a yoga pose",
    "Juggle imaginary balls",
    "you win!"
];

// objects
var message = "";
var score = 0;
var score_needed_to_win = 12;
var message_box = document.querySelector('#command-text');

// Initialize your game logic here
function startGame() {
  // Start the Simon Says sequence
  score_needed_to_win+getRandomInteger(-6, 20);
  score = 1;
  next_game();
}

// Initialize your AI model here
function initAI() {
  // Load your model and set up gesture recognition
}

// Check the player's action against the AI's recognition
function checkAction() {
  // Use the AI model to verify the player's action
}

// Create a new text
function next_game() {
    score++;
    score += getRandomInteger(-1, 5);
    if (score >= score_needed_to_win || commands.length == 1) {
        message = start + commands[commands.length-1];
        setTimeout(exit_game(), 20000);
    } else {
        let x = getRandomInteger(0, commands.length-2);
        if (getRandomInteger(0,1) < 0) {
            message = commands[x];
        } else {
            message = start + commands[x];
        }
    }
    console.log(`score=${score}, winscore=${score_needed_to_win}, message=${message}, messagebox=${message_box.textContent}`);
    message_box.textContent = message;
}

function exit_game() {
    location = 'mobile-about.html';
}

// Generate a random integer between min (inclusive) and max (exclusive)
function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

// Start the game
startGame();