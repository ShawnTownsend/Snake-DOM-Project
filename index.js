const canvas = document.getElementById('game-board');
const ctx = canvas.getContext('2d');
let rectX = 20;
let rectY = 20;

// board divided into set no: of tiles and each tile size depends on the number of tiles and width of the canvas
const tileCount = 20;
const tileSize = canvas.width / tileCount - 2;

let foodX;
let foodY;

function game() {
  drawFood();
  drawSquare();
  onkeydown();
}

function drawFood() {
  // //clear the rectangle so the multiple food won't show up on the screen
  ctx.clearRect(foodX * tileCount, foodY * tileCount, tileSize, tileSize);

  // get new x and y position for the food
  foodX = Math.floor(Math.random() * tileCount);
  foodY = Math.floor(Math.random() * tileCount);

  // fill the rectangle aka food
  ctx.fillStyle = 'red';
  ctx.fillRect(foodX * tileCount, foodY * tileCount, tileSize, tileSize);
}

function fillRect() {
  ctx.beginPath();
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, 1000 + canvas.width, 1000 + canvas.height);

  ctx.beginPath();
  ctx.fillStyle = '#008080';

  if (rectX < 0) {
    rectX = 0;
  } else if (rectX > 250) {
    rectX = 250;
  }
  if (rectY < 0) {
    rectY = 0;
  } else if (rectX > 100) {
    rectX = 100;
  }
  ctx.fillRect(rectX, rectY, 50, 50);
}

function onkeydown(e) {
  if (e.keyCode == 39) { rectX++; } // right arrow
  else if (e.keyCode == 37) { rectX--; } // left arrow
  else if (e.keyCode == 38) { rectY--; } // up arrow
  else if (e.keyCode == 40) { rectY++; } // down arrow
  fillRect();
}

window.addEventListener('keydown', onkeydown);

game();
