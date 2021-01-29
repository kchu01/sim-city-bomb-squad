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
    timeRemaining--;
    if(timeRemaining <= 0) {
        endGame(false);
    }
    // Update clock text with the timeRemaining
    timerEl.textContent = "0:00:" + timeRemaining;
}

function resetGame() {
    // Update the gameOver state variable
    gameOver = false;

    // Step 6: Set the wires <img> src back to the uncut pictures
    for(wire of wires) {
        wire.src = `img/uncut-${wire.id}-wire.png`
    }


    // Display the SimCity bg
    backgroundEl.style.backgroundImage="url(img/simcity.jpg)"
    
    // Set the clock text back to red
    timerEl.style.color = "red";
    
    // Clear any intervals or timeouts
    clearInterval(countdown);

    // re- initializeGame()
    initializeGame();
}

function initializeGame() {
    // Reset all game state variables
    timeRemaining = INITIAL_TIME;
    wireState = {
        blue: false,
        green: false,
        red: false,
        white: false,
        yellow: false
    }
    wiresToCut = [];
    gameOver = false;

    // Star the countdown interval
    countdown = setInterval(updateClock, 1000); // Every second

    // Step 6: Randomly select which wires need to be cut
    for (const color in wireState) {
        let randoNum = Math.random();
        if (randoNum > 0.5) {
            wiresToCut.push(color)
        }
    }
}

function cutWire(event) {
    // Step 5: console.log the color of the wire that you clicked
    if(event.target === wireBoxEl) return;
    console.log(`you clicked the ${event.target.id} wire`)

    let wireColor = event.target.id;

    // Step 6: If the wire is cuttable, cut it, update game state variables,
    // and apply the appropriate cut-wire image
    if(!gameOver && wireState[wireColor] == false) { // if the wire isn't cut
        event.target.src = `img/cut-${wireColor}-wire.png`
        wireState[wireColor] = true; // track that we cut the wire in state

        // If that wireColor is in our wiresToCut array, splice it!
        if (wiresToCut.includes(wireColor)) {
            wiresToCut.splice(wiresToCut.indexOf(wireColor), 1);
        } else {
            // If the cut wire was a bad wire - end game
            endGame(false);
        }
    }
    // If there's no more wires that need to be cut - win the game
    if(wiresToCut.length == 0) endGame(true);
}

function endGame(isGameWon) {
    // Clear the countdown and update gameOver state variable
    gameOver = true;
    clearInterval(countdown);

    if(isGameWon) {
        // If the passed in isGameWon argument is true, set the timer text to green
        console.log('Hooray Patrick! We saved the city!');
        timerEl.style.color = "green";
    } else {
        // Otherwise, change the background image to the explosion    clearTimeout(countdown);
        gameOver = true;
        console.log('Barnacles! The city exploded!');
        backgroundEl.style.backgroundImage="url(img/explosion.jpg)"
    }
}



document.addEventListener('DOMContentLoaded', function () {
    // Hook up DOM references to the variables
    backgroundEl = document.querySelector('main');
    wireBoxEl = document.querySelector('#wirebox');
    wires = wireBoxEl.children;
    resetBtnEl = document.querySelector('#reset');
    timerEl = document.querySelector('#timer');

    // Register Event Listeners
    resetBtnEl.addEventListener('click', resetGame);
    wireBoxEl.addEventListener('click', cutWire);
    initializeGame();
})