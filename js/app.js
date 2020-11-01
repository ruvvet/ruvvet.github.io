// GLOBAL DEFINITIONS
/////////////////////////////////////////////////////////////////////////
// the game canvas
const game = document.getElementById('game');
const ctx = game.getContext('2d');

const colors = ['#08F7FE', '#09FbD3', '#FE53BB', '#F5D300'];

const computedStyle = getComputedStyle(game);

const height = computedStyle.height;
const width = computedStyle.width;

game.height = parseInt(height);
game.width = parseInt(width);

// game.setAttribute("height", parseInt(getComputedStyle(game)["height"]))
// game.setAttribute("width", parseInt(getComputedStyle(game)["width"]))

//868x443

const gameOver = false;
const score = 0;
const lives = 10;
const fallingArray = [];
let catcherL;


/////////////////////////////////////////////////////////////////////////

//FUNCTIONS
/////////////////////////////////////////////////////////////////////////

function rand(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

//create catcher class at the bottom (for 2)
// catcher should change colors
// be responsive to key down event
//

class Catcher {
  //basket
  constructor(width, height, key) {
    this.color = colors[rand(0, colors.length)];
    this.width = width;
    this.height = height;
    this.key = key;
    this.x = game.width / 2 - this.width / 2;
    this.y = game.height - this.height;
  }

  render() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
}

  changeColor() {
    // pick a new color not equal to previous color
    const otherColors = colors.filter((col) => col !== this.color);
    //const otherColors = colors.filter(col => {return col !==this.color});
    this.color = otherColors[rand(0, otherColors.length)];
    return this.color;
  }
}





// TODO: use set interval + random timer
//timer=rand(10,20s)
//setinterval(objectinstanceName.changecolor, timer)

class Fallingthings {
  //block
  constructor() {
    this.x = rand(game.width / 4, (game.width / 4) * 3); //spawn x-coord
    this.y = rand(0, game.height / 8); //spawn y-coord
    this.color = colors[rand(0, colors.length)];
    this.speedX = 0;
    this.speedY = 0;
    this.gravity = 0.10;
    // this.gravitySpeed = 0;
    this.radius = 10;
    this.match = false;
    this.alive = true; //if color matches catcher, change to true
    this.interval = setInterval(this.fall.bind(this), 60);
  }

  render() {
    ctx.beginPath();
    // x coor, y coor, radius, start angle, end angle
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

  position() {
    this.speedY += this.gravity;
    this.y += this.speedY;
    // this.gravitySpeed += this.gravity;
    // this.x += this.speedX;
    // this.y += this.speedY + this.gravitySpeed;
  }

  fall() {
    // update position
    this.position();
    //render new postiion

    const floor = game.height - this.radius;
    console.log(floor);
    if (this.y > floor) {
      this.alive = false;
      clearInterval(this.interval);

    }
  }
}

catcherL= new Catcher(220, 50, 'space');

function update() {



  // set inerval to create new instance with the timer

  setInterval(() => {
    fallingArray.push(new Fallingthings());
  }, rand(1000, 2000));

  setInterval(()=>{
    catcherL.changeColor;
    console.log(catcherL.changeColor);
    catcherL.color = catcherL.changeColor();
    }, rand(5000, 10000));

    /////???????????? better way to do this???

  //frames per sec = amt of times it is rendered per x ms
  //update = tick rate - # of times the canvas is evaluated per second
}

function render() {
  //never call updates from render
  ctx.clearRect(0, 0, game.width, game.height);
  catcherL.render();
  console.log(catcherL.color)

  for (const x of fallingArray) {
    x.render();
    //x.fall();
  }
//check if all objects in array are alive, filter out dead falling objects
  // call fall on all alive objects in array
  falllingArray = fallingArray.filter((thing) => thing.alive);
  /// not filtering properly
  console.log(fallingArray);
}

//requestAnimationFrame(update);
//event loop drives every frame of a js process

// randomly spawn new objects
// detect collision
// detect if game over
//change colors, etc.

// function startGame () {

//     const runGame = setInterval(update, 60);

// }
// // document.addEventListener('DOMContentLoaded', functio

// startGame();

document.addEventListener('DOMContentLoaded', function () {

  update();
  var runGame = setInterval(render, 60);
});

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

// //<script>
// var c = document.getElementById("myCanvas");
// var ctx = c.getContext("2d");
// var img = document.getElementById("scream");
// ctx.drawImage(img, 10, 10);
// </script>

//space to start
//

//extend - fallingthings class,
// could change color halfway, or be bigger, etc
// override render function with super on parent
