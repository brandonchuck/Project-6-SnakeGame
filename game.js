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
  snakeLength: 0,
  body: [], // this will store x and y coordinates for drawing a snake body rect
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

  window.addEventListener("keydown", moveSnake);

  setInterval(() => {
    drawEverything();
    moveEverything();
  }, 1000 / framesPerSecond);
};

function drawEverything() {
  document.getElementById(
    "scoreboard"
  ).textContent = `Score: ${snake.snakeLength}`;
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
  drawRect(snake.posX, snake.posY, 20, 20, "orange");

  // while at least 1 body part
  if (snake.body.length > 0) {
    for (i = 0; i < snake.body.length; i++) {
      if (i > 0) {
        snake.body[i + 1].x = snake.body[i].x;
        snake.body[i + 1].y = snake.body[i].y;
      }

      drawRect(snake.body[i].x, snake.body[i].y, 20, 20, "green");
    }
  }
}

function drawApple() {
  if (snake.posX === apple.posX && snake.posY === apple.posY) {
    apple.posX = randomGridInterval(canvas.width);
    apple.posY = randomGridInterval(canvas.height);
    console.log("---------- APPLE HIT----------");
    snake.snakeLength++;
    console.log(snake.snakeLength);

    lastPosX = snake.posX;
    lastPosY = snake.posY;

    snake.body.push({
      x: (lastPosX += snake.speedX),
      y: (lastPosY += snake.speedY),
    });

    console.log(JSON.stringify(snake.body));
  } else {
    console.log(apple.posX, apple.posY);
    drawRect(apple.posX, apple.posY, 20, 20, "red");
  }
}

// update x and y positions
function moveEverything() {
  // also need to check if snake head is same position as the apple
  if (snake.posY >= canvas.height || snake.posY < 0) {
    alert("game over!");
    resetGame();
    gameOver = true;
    return;
  }

  if (snake.posX >= canvas.width || snake.posX < 0) {
    alert("game over!");
    resetGame();
    gameOver = true;
    return;
  }

  // update snake position
  snake.posX += snake.speedX;
  snake.posY += snake.speedY;

  for (i = 0; i < snake.body.length; i++) {
    snake.body[i].x += snake.speedX;
    snake.body[i].y += snake.speedY;
  }
}

// Snake movement
// Make each case a separate function and use switch?
function moveSnake(e) {
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

  lastPosX = snake.posX;
  lastPosY = snake.posY;
}

// generates random interval of 20 between 0 and canvas width
function randomGridInterval(max) {
  return Math.floor(Math.random() * (max / 20)) * GRID_UNIT; // multiply by 20 to get interval of 20
}

function resetGame() {
  canvasContext.fillStyle = "red";
  snake.posX = canvas.width / 2;
  snake.posY = canvas.height / 2;
  snake.speedX = 20;
  snake.speedY = 0;
  snake.snakeLength = 0;
}
