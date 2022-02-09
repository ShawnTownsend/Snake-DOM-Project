const canvas = document.getElementById("game-board");
const ctx = canvas.getContext("2d");

//board divided into set no: of tiles and each tile size depends on the number of tiles and width of the canvas
let tileCount = 20;
let tileSize = canvas.width / tileCount - 2;

let foodX;
let foodY;

function game () {
    drawFood();
}

function drawFood () {
    // //clear the rectangle so the multiple food won't show up on the screen
    ctx.clearRect(foodX * tileCount, foodY * tileCount, tileSize, tileSize);

    //get new x and y position for the food
    foodX = Math.floor(Math.random() * tileCount);
    foodY = Math.floor(Math.random() * tileCount);
    
    //fill the rectangle aka food
    ctx.fillStyle = "red";
    ctx.fillRect(foodX * tileCount, foodY * tileCount, tileSize, tileSize);
}