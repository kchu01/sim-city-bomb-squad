/*----- constants -----*/
// Initial time
const INITIAL_TIME = 30

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

// Countdown begins and cutting the wires


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



/*----- event listeners -----*/
// event listeners on the wires
// set intervals
// will also need to stop


// Handles reset button click
const resetGame = () => {
    console.log('reset game!');

    //timeRemaining = INITIAL_TIME;

    backgroundEl.style.backgroundImage = "url(img/explosion.jpg)";
    clearInterval(countdown);
    startGame();
}

// handles reset button click
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

// Cut wires




const endGame = (isGameWon) => {
    console.log('END GAME 💣')
    // Clear the countdown and update gameOver state variable
    clearInterval(countdown);
    gameOver = false;

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