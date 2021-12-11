const GRID_UNIT = 20;
let canvas;
let canvasContext;

let gameOver = false;

let lastPosX;
let lastPosY;

// apple object with coordinates
let apple = {
  posX: null,
  posY: null,
};

// snake object with its properties
let snake = {
  posX: null,
  posY: null,
  speedX: null,
  speedY: null,
  direction: null,
  body: [
    { x: 380, y: 400 },
    { x: 360, y: 400 },
    { x: 340, y: 400 },
  ], // this will store x and y coordinates for drawing a snake body rect
};

window.onload = function () {
  canvas = document.getElementById("canvas");
  canvasContext = canvas.getContext("2d");

  // Initial snake position and speed
  snake.posX = canvas.width / 2;
  snake.posY = canvas.height / 2;
  snake.speedX = 20;
  snake.speedY = 0;
  snake.direction = "right";

  apple.posX = randomGridInterval(canvas.width);
  apple.posY = randomGridInterval(canvas.height);

  let framesPerSecond = 5;

  console.log("Initial X Position: " + snake.posX);
  console.log("Initial Y Position: " + snake.posY);
  console.log("Body X: " + snake.body[0].x);
  console.log("Body Y: " + snake.body[0].y);

  window.addEventListener("keydown", changeDirection);

  setInterval(() => {
    drawEverything();
    moveEverything();
  }, 1000 / framesPerSecond);
};

function drawEverything() {
  document.getElementById(
    "scoreboard"
  ).textContent = `Score: ${snake.body.length}`;
  drawBoard();
  drawSnake();
  drawApple();
}

function drawBoard() {
  drawRect(0, 0, canvas.width, canvas.height, "black");

  for (let i = 0; i <= canvas.width; i += GRID_UNIT) {
    canvasContext.strokeStyle = "white";
    canvasContext.beginPath();
    canvasContext.moveTo(i, 0);
    canvasContext.lineTo(i, canvas.height);
    canvasContext.stroke();
  }

  for (let i = 0; i <= canvas.height; i += GRID_UNIT) {
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
  drawRect(snake.posX, snake.posY, 20, 20, "orange"); // draw head

  // draw each body part
  for (let i = 0; i < snake.body.length; i++) {
    drawRect(snake.body[i].x, snake.body[i].y, 20, 20, "green");
  }
}

function drawApple() {
  if (snake.posX === apple.posX && snake.posY === apple.posY) {
    apple.posX = randomGridInterval(canvas.width);
    apple.posY = randomGridInterval(canvas.height);
    console.log("---------- APPLE HIT----------");
    snake.body.length++;

    drawRect(apple.posX, apple.posY, 20, 20, "red");

    console.log(JSON.stringify(snake.body));
  }
}

// update x and y positions for head and body parts
function moveEverything() {
  if (snake.posY >= canvas.height || snake.posY < 0) {
    resetGame();
  }

  if (snake.posX >= canvas.width || snake.posX < 0) {
    resetGame();
  }

  // update position of each body part
  if (snake.body) {
    for (let i = 0; i < snake.body.length; i++) {
      if (i === 0) {
        snake.body[i].x = snake.posX;
        snake.body[i].y = snake.posY;
        // update remaining body parts
      } else {
        snake.body[i].x = snake.body[i - 1].x - snake.speedX;
        snake.body[i].y = snake.body[i - 1].y - snake.speedY;
      }
    }
  }

  // update head position every iteration
  snake.posX += snake.speedX;
  snake.posY += snake.speedY;
  console.log("Head Position: " + "(" + snake.posX + ", " + snake.posY + ")");

  //debug
  for (i = 0; i < snake.body.length; i++) {
    console.log(`Body X ${i + 1}: ${snake.body[i].x}`);
    console.log(`Body Y ${i + 1}: ${snake.body[i].y}`);
  }
}

// Snake movement
function changeDirection(e) {
  // UP -- prevents movement in opposite directions
  if (e.keyCode == 38 && snake.direction !== "down") {
    snake.speedX = 0;
    snake.speedY = -GRID_UNIT;
    snake.direction = "up";
    console.log("Current Direction: " + snake.direction);
  }

  // DOWN
  else if (e.keyCode == 40 && snake.direction !== "up") {
    snake.speedX = 0;
    snake.speedY = GRID_UNIT;
    snake.direction = "down";
    console.log("Current Direction: " + snake.direction);
  }

  // RIGHT
  else if (e.keyCode === 39 && snake.direction !== "left") {
    snake.speedX = GRID_UNIT;
    snake.speedY = 0;
    snake.direction = "right";
    console.log("Current Direction: " + snake.direction);
  }

  // LEFT
  else if (e.keyCode === 37 && snake.direction !== "right") {
    snake.speedX = -GRID_UNIT;
    snake.speedY = 0;
    snake.direction = "left";
    console.log("Current Direction: " + snake.direction);
  } else {
    return;
  }
}

// generates random interval of 20 between 0 and canvas width
function randomGridInterval(max) {
  return Math.floor(Math.random() * (max / 20)) * GRID_UNIT;
}

function resetGame() {
  alert("game over!");
  gameOver = true;
  canvasContext.fillStyle = "red";
  snake.posX = canvas.width / 2;
  snake.posY = canvas.height / 2;
  snake.speedX = 20;
  snake.speedY = 0;
  return;
}
