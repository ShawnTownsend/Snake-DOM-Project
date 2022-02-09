const canvas = document.getElementById("game-board");
const ctx = canvas.getContext("2d");

let tileCount = 20;
let tileSize = canvas.width / tileCount - 2;


let foodX = Math.floor(Math.random() * tileSize);
let foodY = Math.floor(Math.random() * tileSize);

function game () {
    drawFood();
}

function drawFood () {
    ctx.fillstyle = "red";
    ctx.fillRect(foodX * tileCount, foodY * tileCount, tileSize, tileSize);
}

game();