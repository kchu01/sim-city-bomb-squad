/*----- constants -----*/
// Initial time
const INITIAL_TIME = 30;

/*----- app's state (variables) -----*/
let timeRemaining = 0;
let gameOver = false;
let wireToCut = [];
let wireState = {
    blue: false,
    green: false,
    red: false,
    white: false,
    yellow: false
}
let countdown = null

// DOM references
let backgroundEl = null;
let wireBoxEl = null;
let wires = [];
let resetButtonEl = null;
let timerEl = null;

// Functions and Game Logic
const updateClock = () => {
    // console.log('countdown the timer');
    timeRemaining--;
    if(timeRemaining <= 0) {
        endGame(false);
    }
    // Update clock text with the timeRemaining
    timerEl.textContent = "0:00:" + timeRemaining;

} 

// Handles reset button click
const resetGame = () => {

    //timeRemaining = INITIAL_TIME;
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
    startGame();
}

const startGame = () => {
    timeRemaining = INITIAL_TIME;
    gameOver = false;
    wiresToCut = [];
    wireState = {
        blue: false,
        green: false,
        red: false,
        white: false,
        yellow: false
    }

for(const color in wireState) {
    let rand = Math.random() // Will give us a random float between 0 and 1
    if(rand > 0.5) {
        wireToCut.push(color)
    }
}


    countdown = setInterval(updateClock, 1000)
}


// handles cut wires
const cutWire = (event) => {
    let wireColor = event.target.id
    console.log('You cut the', wireColor + ' wire');

    if(!gameOver && wireState[wireColor] === false) {
        // Cut the wire
        event.target.src = `img/cut-${wireColor}-wire.png`
        wireState[wireColor] = true;
        // Did we cut the correct wire?
        if(wiresToCut.includes(wireColor)) {
            wiresToCut.splice(wiresToCut.indexOf(wireColor), 1)
            if(wiresToCut.length === 0) {
                endGame(true);
            }
        } else {
            endGame(false);
        }
        }
    }

// Endgame

const endGame = (isGameWon) => {
    console.log('END GAME 💣')
    // Clear the countdown and update gameOver state variable
    clearInterval(countdown);
    gameOver = true;

    // If the passed in isGameWon argument is true, set the timer text to green
    // Otherwise, change the background image to the explosion

    if(isGameWon) {
        // If we won, change text color to green
        console.log("Hooray Patrick! We saved the city!")
        timerEl.style.color = "green"
    } else {
        // But if we lost, change the background image to the exploded city pic
        console.log('Barnacles! The city exploded!')
        backgroundEl.style.backgroundImage = "url(img/explosion.jpg)";
    }
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