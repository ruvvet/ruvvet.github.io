/////////////////////////////////////////////////////////////////////////
// UNTITLED GAME
// JENNY FENG
// LAST UPDATED 11.03.2020
/////////////////////////////////////////////////////////////////////////

//GLOBAL DEFINITIONS/////////////////////////////////////////////////////
// Setting up Canvas
// Get canvas element from html doc
// set drawing context for canvas area w/ 2D attributes
const game = document.getElementById('game');
const ctx = game.getContext('2d');
// Scaling canvas - default is 300x150
// Use getComputedStyle to grab the css h + w attributes of game
//and set the h+w manually
const height = getComputedStyle(game).height;
const width = getComputedStyle(game).width;
game.height = parseInt(height);
game.width = parseInt(width);

// Array of different colors that will be used
//const colors = ['#AC92EB', '#4FC1E8', '#A0D568', '#FFCE54', '#ED5564']; //pastels
const colors = ['#F5759B', '#D91D25', '#F7AE00', '#01C013', '#008DD4']; //solids

// For glowing effects of drawn elements
ctx.lineJoin = 'round'; //rounded corners
ctx.globalCompositeOperation = 'lighter'; //lightens overlapping colors

//constant variables
const getMiddleX = game.width / 2;
const getMiddleY = game.height / 2;
const catcherWidth = (game.width / 2) * 0.7;
const catcherHeight = game.height / 20;
const catcherXpos = (getMiddleX - catcherWidth) / 2;
const catcherYpos = game.height - catcherHeight;

//initialized variables
let continueGame = true;
let score = 0;
let lives = 50;
let fallingArray = []; //the array of falling objects that are alive
let catcherL;
let catcherR;
let timePassed = 0;
let lastLoop = 0;
// Strings
const gameOver = 'BIG F';
const instructions = 'instructions go here';

/////////////////////////////////////////////////////////////////////////
//FUNCTIONS + Classes
/////////////////////////////////////////////////////////////////////////

// globally used rand function
function rand(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

////////////////CLASSES///////////////////
//catcher class
// checks for matching keydown listner
// renders
// randomly changes colors

class Catcher {
  //basket
  constructor(width, height, x, y, key) {
    this.color = colors[rand(0, colors.length)];
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.key = key;
    this.keydown = false;

    document.addEventListener(
      'keydown',
      function (key) {
        if (key.key == this.key) {
          console.log('space down');
          this.keydown = true;
        }
      }.bind(this)
    );

    document.addEventListener(
      'keyup',
      function (key) {
        if (key.key == this.key) {
          console.log('space up');
          this.keydown = false;
        }
      }.bind(this)
    );
  }

  render() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    //this.stroke();
    if (this.keydown) {
      ctx.fillRect(this.x - 5, this.y - 5, this.width + 10, this.height + 10);
    }
    if (!this.keydown) {
      ctx.fillStyle = this.color;
    }
  }

  changeColor() {
    // pick a new color not equal to previous color
    const otherColors = colors.filter((col) => col !== this.color);
    this.color = otherColors[rand(0, otherColors.length)];
  }

  stroke() {
    ctx.shadowColor = this.color;
    ctx.shadowBlur = 5;
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 7.5;
    ctx.beginPath();
    ctx.moveTo(this.x + this.border, this.y);
    ctx.lineTo(this.x + this.width - this.border, this.y);
    ctx.quadraticCurveTo(
      this.x + this.width - this.border,
      this.y,
      this.x + this.width,
      this.y + this.border
    );
    ctx.lineTo(this.x + this.width, this.y + this.height - this.border);
    ctx.quadraticCurveTo(
      this.x + this.width,
      this.y + this.height - this.border,
      this.x + this.width - this.border,
      this.y + this.height
    );
    ctx.lineTo(this.x + this.border, this.y + this.height);
    ctx.quadraticCurveTo(
      this.x + this.border,
      this.y + this.height,
      this.x,
      this.y + this.height - this.border
    );
    ctx.lineTo(this.x, this.y + this.border);
    ctx.quadraticCurveTo(
      this.x,
      this.y + this.border,
      this.x + this.border,
      this.y
    );
    ctx.closePath();
    ctx.stroke();
  }
}

////////////////CLASSES///////////////////
//falling objects class
// renders
// updates position as it falls

class Fallingthings {
  //need an extended class
  constructor() {
    this.x = rand(game.width / 4, (game.width / 4) * 3);
    this.y = rand(0, game.height / 8);
    this.color = colors[rand(0, colors.length)];
    this.speedX = 0;
    this.speedY = 0;
    this.gravity = 0.2;
    // this.gravitySpeed = 0;
    this.radius = 20;
    this.match = false;
    this.alive = true; //if color matches catcher, change to true
    this.keeprendering = true;
  }

  render() {
    ctx.beginPath();
    // x coor, y coor, radius, start angle, end angle
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}

////////////////CLASSES///////////////////
//falling objects exntended classes
// changes origin of spawn and direction of slope as it drops
class FallingthingsL extends Fallingthings {
  constructor(catcherColor) {
    super();
    this.slope = game.width / 6;
    this.x = rand(0, game.width / 5);
    this.y = rand(0, game.height / 16);
    this.color = this.weightedColors(catcherColor);
    console.log(this.color);
  }

  fall(timeMultiplier) {
    this.speedY += this.gravity * timeMultiplier;
    this.y += this.speedY;
    this.x += this.slope * timeMultiplier;

    if (this.y > game.height) {
      this.keeprendering = false;
    }
  }

  weightedColors(catcherColor) {
    // creates a new array of length 3 and fills it with the catcher color
    // then concatenates the original colors list + the new array for a weighted one
    this.weightedColor = new Array(5).fill(catcherColor).concat(colors);
    // return a random color from the weighted array
    console.log(this.weightedColor);
    this.newcolor = this.weightedColor[rand(0, this.weightedColor.length)];
    console.log(this.newcolor);
    return this.newcolor;
  }
}

////////////////CLASSES///////////////////
class FallingthingsR extends Fallingthings {
  constructor(catcherColor) {
    super();
    this.slope = game.width / 6;
    this.x = rand((game.width / 5) * 5, game.width);
    this.y = rand(0, game.height / 16);
    this.color = this.weightedColors(catcherColor);
  }
  fall(timeMultiplier) {
    this.speedY += this.gravity * timeMultiplier;
    this.y += this.speedY;
    this.x -= this.slope * timeMultiplier;

    if (this.y > game.height) {
      this.keeprendering = false;
    }
  }
  weightedColors(catcherColor) {
    // creates a new array of length 3 and fills it with the catcher color
    // then concatenates the original colors list + the new array for a weighted one
    this.weightedColor = new Array(5).fill(catcherColor).concat(colors);
    // return a random color from the weighted array
    console.log(this.weightedColor);
    this.newcolor = this.weightedColor[rand(0, this.weightedColor.length)];
    console.log(this.newcolor);
    return this.newcolor;
  }
}
// parabola - make it travel along a range of paths

// Catcher array to hold all the catcher instances
// Passes width, height,x-, y-, and key to activate
const catchersArray = [
  (catcherL = new Catcher(
    catcherWidth,
    catcherHeight,
    catcherXpos,
    catcherYpos,
    'f'
  )),
  (catcherR = new Catcher(
    catcherWidth,
    catcherHeight,
    catcherXpos + getMiddleX,
    catcherYpos,
    'j'
  )),
];

//collision detection manages score + life keeping in the event of a collision
function collisionDetection(obj, catcher) {
  // every time it updates, it checks if its at or past the collision line
  // so its detecting one object multiple times as its updating every few ms
  //

  if (obj.y > game.height - catcher.height - obj.radius) {
    const keydown = catcher.keydown;
    console.log('hit detected', obj);
    obj.alive = false;
    // if keydown + matching
    // +score
    if (keydown && obj.color == catcher.color) {
      console.log('+ score');
      score++;
    }
    // if not matching + keydown >> -1 life
    // if matching and no keydown >> -1 life
    if (
      (!keydown && obj.color == catcher.color) ||
      (keydown && obj.color !== catcher.color)
    ) {
      console.log(keydown, obj.color, catcher.color);
      lives -= 1;
      console.log('-1 life' + lives);
    }
    /// maybe use switches
  }
}

function spawnL() {
  // we pass the catcher on the opposite side since it is supposed to match that one
  fallingArray.push(new FallingthingsL(catcherR.color));
  setTimeout(function () {
    spawnL();
  }, rand(10, 4000));
}

function spawnR() {
  fallingArray.push(new FallingthingsR(catcherL.color));
  setTimeout(function () {
    spawnR();
  }, rand(10, 4000));
}

//manges all the randomized intervals for object generation
function init() {
  //reset random intervals so theyre actually random

  setTimeout(function () {
    spawnL();
  }, 500);

  setTimeout(function () {
    spawnR();
  }, 500);

  //change color at random intervals for every catcher
  setInterval(function () {
    catcherL.changeColor();
    console.log(catcherL);
  }, rand(10000, 18000));

  setInterval(function () {
    catcherR.changeColor();
  }, rand(10000, 18000));
}

// only draws/renders
function render() {
  //never call updates from render
  ctx.clearRect(0, 0, game.width, game.height);

  ctx.font = '30px Montserrat Subrayada';
  ctx.fillStyle = '#FFFFFF';
  ctx.fillText(`Score: ${score}`, 10, 40);
  ctx.fillText(`Lives: ${lives}`, game.width - 150, 40);

  // render every catcher
  for (const catcher of catchersArray) {
    catcher.render();
  }

  for (const obj of fallingArray) {
    obj.render();
  }
}

// controls game state stuff only
function updateFallingThings(timePassed) {
  for (const obj of fallingArray) {
    obj.fall(timePassed);
    if (obj.alive) {
      for (catcher of catchersArray) {
        collisionDetection(obj, catcher);
      }
    }
  }

  fallingArray = fallingArray.filter((obj) => obj.keeprendering);

  if (lives == 0) {
    continueGame = false;
    ctx.clearRect(0, 0, game.width, game.height);
    ctx.font = '200px Montserrat Subrayada';
    ctx.fillText(`${gameOver}`, 200, game.height / 2);
  }
}

//now = dom timestamp in ms
// lastloop = the timestamp of the time we last called gameloop

function gameLoop(now) {
  timePassed = (now - lastLoop) / 1000;
  lastLoop = now;
  updateFallingThings(timePassed);
  render();

  if (continueGame) {
    requestAnimationFrame(gameLoop);
  }
}

document.addEventListener('DOMContentLoaded', function () {
  // startGame();

  document.addEventListener('keyup', function (key) {
    if (key.key == ' ') {
      init();
      requestAnimationFrame(gameLoop);
    }
  });
});

//1.
// ctx.save + ctx.

// function startGame(){
//   ctx.fillStyle = "white";
//   ctx.textAlign ="center";
//   ctx.font = "30px Montserrat Subrayada";
//   ctx.fillText("Press Space to start", game.width/2, game.height / 2);
//   ctx.fillText("Use 'f' and 'j' to catch the falling balls the match the color of the bar.", game.width/2, game.height / 2 + 30);
//   ctx.fillText("Backspace to reset", game.width/2, game.height / 2 +60);
// }

// }

// function draw(url)
// {
//     // Create an image object. This is not attached to the DOM and is not part of the page.
//     var image = new Image();

//     // When the image has loaded, draw it to the canvas
//     image.onload = function()
//     {
//         ctx.drawImage(image, 360, 600, 200, 200);
//         ctx.drawImage(image, 50, 600, 200, 200);
//     }

//     // Now set the source of the image that we want to load
//     image.src = url;
// }

// draw('D:/SEI1019/ga-projects/untitled-game/img/nokey.gif');

//TODO:

// ADD DIRECTIONS BEFORE START

// make the game playable for humans
//primary gameplay loop - what's happening every second
//secondary gameplay loop - levels

//later
// design updates

// SFX
// smoother falling animation
// always hit the bar /w parabola
// weighted - probabilities
// golden ball to get + lives

//high scores - git.jist
// menu
// add tail to falling objects

//mobile version
