/*----- constants -----*/
const INITIAL_TIME = 30;

/*----- Game Logic Variables and State -----*/
let timeRemaining = 0;
let gameOver = false;
let wiresToCut = [];
let wireState = {
    blue: false,
    green: false,
    red: false,
    white: false,
    yellow: false
}
let countdown = null;

/*----- DOM references -----*/
let backgroundEl = null;
let wireBoxEl = null;
let wires = [];
let resetBtnEl = null;
let timerEl = null;

/*----- Function and Game Logic -----*/
function updateClock() {
    // This function runs every second
    // Decrement timeRemaining, if there is no time left, end the game

    // Update clock text with the timeRemaining
}

function resetGame() {
    // Update the gameOver state variable

    // Step 6: Set the wires <img> src back to the uncut pictures

    // Display the SimCity bg

    // Set the clock text back to red

    // Clear any intervals or timeouts

    // re- initializeGame()
}

function initializeGame() {
    // Reset all game state variables

    // Star the countdown interval

    // Step 6: Randomly select which wires need to be cut
}

function cutWire(event) {
    // Step 5: console.log the color of the wire that you clicked

    // Step 6: If the wire is cuttable, cut it, update game state variables,
    // and apply the appropriate cut-wire image

    // If the cut wire was a bad wire - end game
}

function endGame(isGameWon) {
    // Clear the countdown and update gameOver state variable

    // If the passed in isGameWon argument is true, set the timer text to green
    // Otherwise, change the background image to the explosion
}


document.addEventListener('DOMContentLoaded', function () {
    // Hook up DOM references to the variables
    backgroundEl = document.querySelector('main');
    wireBoxEl = document.querySelector('#wirebox');
    wires = wireBoxEl.children;
    resetBtnEl = document.querySelector('button');
    timerEl = document.querySelector('p');

    // Register Event Listeners
    resetBtnEl.addEventListener('click', resetGame);
    wireBoxEl.addEventListener('click', cutWire);
    initializeGame();
})