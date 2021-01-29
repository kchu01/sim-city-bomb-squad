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
    timeRemaining--;
    if(timeRemaining <= 0) {
        endGame(false);
    }
    timerEl.textContent = "0:00:" + timeRemaining;
}

function resetGame() {
    gameOver = false;
    // Set the wires <img> src back to the uncut pictures

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
    timeRemaining = INITIAL_TIME;
    countdown = setInterval(updateClock, 1000); // Every second
}

function cutWire(event) {
    if(event.target === wireBoxEl) return;
    console.log(`you cut the ${event.target.id} wire`)
}

function endGame(isGameWon) {
    clearTimeout(countdown);
    if(isGameWon) {
        console.log('Hooray Patrick! We saved the city!');
        timerEl.style.color = "green";
    } else {
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
    resetBtnEl = document.querySelector('button');
    timerEl = document.querySelector('p');


    // Register Event Listeners
    resetBtnEl.addEventListener('click', resetGame);
    wireBoxEl.addEventListener('click', cutWire);
    initializeGame();
})