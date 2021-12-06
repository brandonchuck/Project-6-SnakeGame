// Canvas
let canvas;
let canvasContext;

let snakeLength;

let snakePositionX; // X position of the snake head
let snakePositionY; // Y position of the snake head

let applePositionX;
let applePositionY;

let direction;

// change sign based on arrowkey input
let speedX; // + means right arrow; - means left arrow
let speedY; // + means down arrow; - means up arrow


let gameOver = false;
// 1. Draw board
// 2. Draw Grid


window.onload = function () {
  canvas = document.getElementById("canvas");
  canvasContext = canvas.getContext("2d");

  direction = "right";
  // set apple position on load
  // applePositionX = (Math.random() * canvas.width) / canvas.width;
  // applePositionY

  let snake = {
    posX: canvas.width / 2,
    posY: canvas.height / 2,
    deltaX: 20,
    deltaY: 0
  }

  // Initial snake position and speed
  snakePositionX = canvas.width / 2;
  snakePositionY = canvas.height / 2;
  speedX = 20;
  speedY = 0;

  let framesPerSecond = 5;

  // listen for keypress on load
  window.addEventListener("keydown", moveSnake);

  setInterval(() => {
    drawBoard();
    drawSnake();
    moveEverything();
  }, 1000 / framesPerSecond);
};

function drawBoard() {
  drawRect(0, 0, canvas.width, canvas.height, "black");

  for (let i = 0; i <= canvas.width; i += 20) {
    canvasContext.strokeStyle = "white";
    canvasContext.beginPath();
    canvasContext.moveTo(i, 0);
    canvasContext.lineTo(i, canvas.height);
    canvasContext.stroke();
  }

  for (let i = 0; i <= canvas.height; i += 20) {
    canvasContext.strokeStyle = "white";
    canvasContext.beginPath();
    canvasContext.moveTo(0, i);
    canvasContext.lineTo(canvas.width, i);
    canvasContext.stroke();
  }
}

function drawRect(leftX, topY, width, height, color) {
  canvasContext.fillStyle = color;
  canvasContext.fillRect(leftX, topY, width, height);
}

function drawSnake() {
  canvasContext.fillStyle = "red";
  canvasContext.fillRect(snakePositionX, snakePositionY, 20, 20);
}


// call this function every second w/ updated x and y positions
function moveEverything(){
  // also need to check if snake head is same position as the apple
  if (snakePositionY >= canvas.height || snakePositionY <= 0) {
    alert("game over!");
    snakePositionX = canvas.width / 2;
    snakePositionY = canvas.height / 2;
    speedX = 20;
    speedY = 0;
    gameOver = true;
    return;
  }

  if (snakePositionX >= canvas.width || snakePositionX <= 0) {
    alert("game over!");
    snakePositionX = canvas.width / 2;
    snakePositionY = canvas.height / 2;
    speedX = 20;
    speedY = 0;
    gameOver = true;
    return;
  }

  snakePositionX += speedX;
  snakePositionY += speedY;
}

// Snake movement
function moveSnake(e) {

  // UP
  if (e.keyCode == 38 && direction !== "down") {
    console.log("Current Direction: " + direction);
    console.log("Went Up");
    speedX = 0;
    speedY = 20;
    speedY = -speedY;
    direction = "up";
  }

  // DOWN
  if (e.keyCode == 40 && direction !== "up") {
    console.log("Current Direction: " + direction);
    console.log("Went Down");
    speedX = 0;
    speedY = 20;
    speedY = -speedY;
    direction = "down";
  }
  
  // RIGHT
  if (e.keyCode === 39 && direction !== "left") {
    console.log("Current Direction: " + direction);
    console.log("Went Right");
    speedX = 20;
    speedX = -speedX;
    speedY = 0;
    direction = "right";
  }

  // LEFT
  if (e.keyCode === 37 && direction !== "right") {
    console.log("Current Direction: " + direction);
    console.log("Went Left");
    speedX = 20;
    speedX = -speedX;
    speedY = 0;
    direction = "left";
  }

}

function eatApple() {
  snakeLength++;

  // relocate apple to random coordinate

  // increase length of snake and draw on canvas
}
