/*----- constants -----*/
// Initial time
const initialTime = 30

/*----- app's state (variables) -----*/
// variable to store timer countdown
let timeRemaining = 0

let countdown = null

let gameOver = false

let wireState = {
    blue: false,
    green: false,
    red: false,
    white: false,
    yellow: false
}

let wireToCut = []

/*----- cached element references -----*/
// event listeners on the wires
let wireboxEl = null


let wires = []


// backdrop images

// timer
let timerEl = null


// reset button
let resetButtonEl = null

const updateClock = () => {
    // console.log('countdown the timer');
    timeRemaining = timeRemaining -1;
    if (timeRemaining <= 0) {
        //end game
    endGame(false); // This ends the game
    }



    timerEl.textContent = "0:00:" + timeRemaining;

} 

// Countdown begins


const startGame = () => {
    console.log('Set the game');
    timeRemaining = initialTime;
}

countdown = setInterval(updateClock, 10000)

/*----- event listeners -----*/
// event listeners on the wires
// set intervals
// will also need to stop


// Handles reset button click
const resetGame = () => {
    console.log('reset game!');
}

// handles reset button click
const cutWire = (event) => {
    console.log('cute a wire', event.target);
}





const endGame = (isGameWon) => {
    console.log('END GAME');

    clearInterval(countdown);
} 


document.addEventListener('DOMContentLoaded', function () {
    console.log('loaded!');
    // <main> element to manipulate background
    backgroundEl = document.querySelector('main')
    // Countdown timer element
    timerEl = document.querySelector('#timer')
    // Reset the game
    resetButtonEl = document.querySelector('#reset') 
    resetButtonEl.addEventListener('click', resetGame)
    // wirebox and click event listener
    wireboxEl = document.querySelector('#wire')
    wireboxEl.addEventListener('click', cutWire)
    // Each wire element in an array
    wires = wireboxEl.children
    startGame()
})