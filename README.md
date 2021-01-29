# JS Game: Sim City Bomb Squad
Someone left a bomb in the middle of Sim City. It's your first day on the
bomb squad and it's your job to defuse it. The entire city is relying on
you!

## The Basics
Create a website that simulates diffusing a bomb. The bomb is made up of a
timer and five wires. The timer counts down from thirty seconds to zero. The
bomb is defused by cutting the correct wires, which are chosen randomly each
time the bomb is set.

Here's a link to a video of the website in action:
<https://youtu.be/zS3HMWLsz6Q>

![defusing](screenshots/01-defusing.png)

If the bomb is successfully defused then the timer stops, the text turns green
and Sim City lives on and prospers!

![defused](screenshots/02-defused.png)

If the timer reaches zero it stops counting down and the image of Sim City is
replaced with an explosion.

![exploded](screenshots/03-exploded.png)

## Implementation Details
We're not hanging you out to dry here. Here are some details about how to
build everything.

### Cutting Wires
There are two images for each wire. There's an uncut version and a cut version.
When someone clicks on an uncut wire the image should change to the corresponding
cut version. Once a wire is cut, it should not be possible to uncut it.

You can modify the `src` value of an `img` tag in JavaScript to swap two images
in place in the same img tag.

### Correct vs Incorrect Wires
Each time the bomb is reset it should iterate over the five wires and choose whether
the wire should be cut this round. Choose whether each wire should be cut by using
`Math.random()` and giving each wire a 50/50 chance of it needing to be cut.

Since each wire always has a 50/50 chance of needing to be cut there is some variety
in how many wires need to be cut to defuse the bomb each time. Sometimes all the wires
need to be cut. Sometimes only one wire needs to be cut.

The bomb is considered defused when all the wires that need to be cut are cut.

### Blowing Up
The bomb should blow up if someone cuts the wrong wire. When the bomb blows up
the background image should change from showing Sim City to showing the explosion.

After the bomb blows up it should be impossible to cut any more wires. The timer
should stop whenever the bomb blows up. If an incorrect wire was cut then the
time should show how much time was on the clock when the bomb exploded. If the
timer ran all the way to zero then the timer should keep showing zero as the bomb explodes.

## Step 1: Getting Started and Project Setup
---

### You do: Build the HTML and CSS for the game

To begin, start by linking the css and js files to your `index.html`. Once they are linked correctly, you should see 'loaded' appear in your browser's console.

The goal is to markup and styling like the example

*hint hint flexbox would be a great way to center this div on your webpage*

*hint hint the `<main>` is already set to cover the whole, so that is a great place to set the background image. Checkout the css properties `background-attachment` and `background-size`*

## Step 2: Brainstorming and stubbing out functionality
___

### We do: Plan out the game functionality and code-along stubbing out the state and functions

#### Maintaining State

Brainstorm what kinds of data the application will need. Think about the timer, the wires, and whether the game is in a win or loss state.

We need build state in the global scope with everything that the game will need to keep track of. 

#### Create the references to the DOM elements in JS

Imagine what DOM elements are going to need to be manipulated by the js. Each one of these elements will need a corresponding variable. Which ones will need event listeners?

#### Stubbing out functions and psuedo coding game logic

Start thinking how the game reacts to user input:
  
  - What happens when the user clicks the reset button?
  - What happens when the user clicks a wire? What if it is the wrong wire?
  - What happens when the timer reaches runs out?

## Step 3: Making the timer count down 
---

### You do: Build out the `initializeGame` function and the `updateClock` callback function

To build the timer you first need to set a few things up in the `initialGame` function, then move on to the `updateClock` function.

The initializeGame function sets your remaining time variable to 30 seconds. It will also set an interval that runs updateClock every second and saves it into a game state variable. 

If you run out of time in the `updateClock` function the you should run the `endGame` function.

 *hint hint use the `INITIAL_TIME` constant*

```javascript
function initializeGame() {
    // Set the remaining time variable

    // Start the countdown interval
}

function updateClock() {
    // Decrement timeRemaining, if there is no time left, end the game

    // Update clock text with the timeRemaining
}
```

## Step 4: **GAME OVER**
---

### You do: Build out `endGame` function

In the `endGame` function you have to stop the clock from ticking down. If the parameter `isGameWon` is passed in as `false`, you need to set the background image to the explosion. If the game is won, you need to set the color of the timer to green.

```javascript
function endGame(isGameWon) {
    // Clear the countdown and update gameOver state variable

    // If the passed in isGameWon argument is true, set the timer text to green
    // Otherwise, change the background image to the explosion
}
```

## Step 5: Click Events
---

### You do: Build out the `cutWire` function and `resetGame` function to handle user clicks

The `resetGame` function will need to set the background image back to the city, set the color of the timer's text to red in case the game was won and clear the countdown interval. You can invoke your `initializeGame` function at the end to restart the game. 

For now, the `cutWire` function will need `console.log()` the color of the wire that gets clicked on. 

*hint hint look inside of the event.target in your `console.log()`*

```javascript
function resetGame() {
    // Update the gameOver state variable

    // Display the SimCity bg

    // Set the clock text back to red

    // Clear any intervals or timeouts

    // invoke initializeGame()
}


function cutWire(event) {
    // console.log the color of the wire that you clicked
}


```

## Step 6: Wrapping Up
---

### We do: Finish win game logic in cut wire function 

Brainstorm what needs to happen when a wire is cut; its either a good wire or it blows up your city.

in initializeGame we need to reinitialize the game state
  - reset the `wireState` object
  - reset the `wiresToCut` array
  - randomly select wires to cut in order to win and push them to the `wiresToCut` array

```javascript
function initializeGame() {
    ...
    // Reset all game state variables
    // Randomly select which wires need to be cut
}
```

In the `cutWire` function 
  - return the function immediately if the parent is clicked on and not a wire
  - if the game is not over and the wire that was clicked is false in `wireState` (ie the is cuttable and has not already been cut)
    - update the image to a cut wire
    - update state in the `wireState` object
    - if the wire is in the `wiresToCut` array, splice it out so the game can continue, otherwise end the game because a wire has been cut that detonated the bomb
  - if the `wiresToCut` array is empty after all of this, the game is won because all of the good wires have been cut

```javascript
function cutWire(event) {
    ...
    // If the wire is cuttable, cut it, update game state variables and apply the appropriate cut-wire image

    // if it is a good cut, update state, if it is a bad cut, you lose the game
  
    // If there's no more wires that need to be cut - win the game
}
```

In the the `resetGame` function
  - iterate over wires and reset all of the image srcs to uncut wires

```javascript
function resetGame() {
     ...
    // Set the wires <img> src back to the uncut pictures
}
```

### Bonus: Add a delay after an incorrect wire is cut
Add a **750 millisecond delay** between cutting an incorrect wire and the bomb blowing up. 

Having a small delay makes people wonder for a moment if they got away with
cutting a wire before the bomb explodes.

It's possible to cut an incorrect wire and then quickly cut all the remaining
correct wires inside the 750 millisecond delay. In this scenario the bomb is
considered defused and it should not explode.

### Bonus: Add Sounds
The website will really come alive after adding sound. There's a collection of
original Sim City 2000 sounds included in this repo in the `sounds` directory.

Add the following effects:
- play the electricity sound effect whenever a wire is cut.
- loop the siren while the bomb is being defused.
- play the building explosion effect if the bomb explodes.
- play the cheering noise if the bomb is defused.
- play the success song after the cheering finishes playing.

### Bonus: <audio> Specification
HTML5 added an `<audio>` tag that makes it easy to add sound to a website.

MDN and W3Schools have good documentation about the audio tag. Go to W3Schools
for a basic introduction, and go to MDN if you want to really dig into details
of the specification.

<http://www.w3schools.com/tags/tag_audio.asp>
<https://developer.mozilla.org/en/docs/Web/HTML/Element/audio>

Here's some simple examples of how to interact with audio elements.

```html
<!-- an audio tag with the "controls" attribute will appear on the page. -->
<audio controls src="song.mp3"></audio>

<!--
  An audio tag without "controls" will be invisible.
  Adding the "autoplay" attribute will make the audio start automatically.
  Adding the "loop" attribute will make the audio play forever.
-->
<audio id="background" autoplay loop src="background-music.mp3"></audio>

<audio id="laughter" src="laughter.wav"></audio>
<audio id="cheers" src="cheers.wav"></audio>
<audio id="boo" src="boo.wav"></audio>
```

Select an audio tag as you would any other HTML element.

```js
// trigger audio by calling the play function.
var soundEffect = document.getElementById("laughter");
soundEffect.play();

// "stop" the audio by pausing it and resetting currentTime to zero.
var background = document.getElementById("background");
background.pause();
background.currentTime = 0;
```

You can have one sound play after another by adding an event listener to
an audio element and waiting for it to broadcast it's `"ended"` event:

```js
var first = document.getElementById("laughter");
first.addEventListener("ended", function() {
  var second = document.getElementById("cheers");
  second.play();
});

first.play();
```
## Licensing
All content is licensed under a CC­BY­NC­SA 4.0 license.
All software code is licensed under GNU GPLv3. For commercial use or alternative licensing, please contact legal@ga.co.

