/*----- constants -----*/
const INITIAL_TIME = 30;

/*----- app's state (variables) -----*/
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

/*----- DOM references -----*/
let backgroundEl = null;
let wires = [];
let resetBtnEl = null;
let timerEl = null;

/*----- Function and Game Logic -----*/
function updateClock() {

}

function resetGame() {

}

function initializeGame() {

}

function cutWire() {

}

function endGame() {

}


document.addEventListener('DOMContentLoaded', function () {
    // Hook up DOM references to the variables
    backgroundEl = document.querySelector('main');
    let wireBoxEl = document.querySelector('#wirebox');
    wires = wireBoxEl.children;
    resetBtnEl = document.querySelector('button');
    timerEl = document.querySelector('p');


    // Register Event Listeners
    resetBtnEl.addEventListener('click', resetGame);
    wireBoxEl.addEventListener('click', cutWire);
})