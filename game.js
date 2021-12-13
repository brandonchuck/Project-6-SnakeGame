const GRID_UNIT = 20;
let canvas;
let canvasContext;

let gameOver = false;

// apple object with coordinates
let apple = {
  posX: null,
  posY: null,
};

// snake object with its properties
let snake = {
  deltaX: null,
  deltaY: null,
  direction: null,
  body: [
    { x: 400, y: 400 }, // head
    { x: 380, y: 400 },
    { x: 360, y: 400 },
  ], // this will store x and y coordinates for drawing a snake body rect
};

window.onload = function () {
  canvas = document.getElementById("canvas");
  canvasContext = canvas.getContext("2d");

  // Initial direction
  snake.direction = "right";

  apple.posX = randomGridInterval(canvas.width);
  apple.posY = randomGridInterval(canvas.height);

  let framesPerSecond = 5;

  console.log("Starting X: " + snake.body[0].x);
  console.log("Starting Y: " + snake.body[0].y);

  document.onkeydown = (e) => {
    e.preventDefault();

    // UP -- prevents movement in opposite directions
    if (e.key == "ArrowUp" && snake.direction !== "down") {
      snake.direction = "up";
      return;
    }

    // DOWN
    if (e.key == "ArrowDown" && snake.direction !== "up") {
      snake.direction = "down";
      return;
    }

    // RIGHT
    if (e.key === "ArrowRight" && snake.direction !== "left") {
      snake.direction = "right";
      return;
    }

    // LEFT
    if (e.key === "ArrowLeft" && snake.direction !== "right") {
      snake.direction = "left";
      return;
    }
    console.log("Current Direction: " + snake.direction);
  };

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
  for (i = 0; i < snake.body.length; i++) {
    drawRect(snake.body[i].x, snake.body[i].y, 20, 20, "orange");
  }
}

function drawApple() {
  if (snake.body[0].x === apple.posX && snake.body[0].y === apple.posY) {
    apple.posX = randomGridInterval(canvas.width);
    apple.posY = randomGridInterval(canvas.height);
    drawRect(apple.posX, apple.posY, 20, 20, "red");
    console.log("---------- APPLE HIT----------");
    console.log(JSON.stringify(snake.body));
  }

  drawRect(apple.posX, apple.posY, 20, 20, "red");
}

// update x and y positions for head and body parts
function moveEverything() {
  if (snake.body[0].y >= canvas.height || snake.body[0].y < 0) {
    resetGame();
  }

  if (snake.body[0].x >= canvas.width || snake.body[0].x < 0) {
    resetGame();
  }

  moveSnake();

  // //debug
  // for (i = 0; i < snake.body.length; i++) {
  //   console.log(`Body X ${i + 1}: ${snake.body[i].x}`);
  //   console.log(`Body Y ${i + 1}: ${snake.body[i].y}`);
  // }
}

/*
  1. Make copy of entire snake
  2. Move head
  3. loop through body parts
  4. First body part gets head's position
  5. Remaining body parts get the 
*/

function moveSnake() {
  switch (snake.direction) {
    case "up":
      snake.deltaX = 0;
      snake.deltaY = -GRID_UNIT;
      break;
    case "down":
      snake.deltaX = 0;
      snake.deltaY = GRID_UNIT;
      break;
    case "left":
      snake.deltaX = -GRID_UNIT;
      snake.deltaY = 0;
      break;
    case "right":
      snake.deltaX = GRID_UNIT;
      snake.deltaY = 0;
      break;
  }

  // copy of current snake
  let snakeCopy = snake.body;

  // move head
  snake.body[0].x += snake.deltaX;
  snake.body[0].y += snake.deltaY;

  // move body parts
  for (i = 1; i < snake.body.length; i++) {
    if (i === 1) {
      snake.body[i] = snakeCopy[0];
    } else {
      snake.body[i] = snakeCopy[i - 1];
    }
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
  snake.body[0].x = canvas.width / 2;
  snake.body[0].y = canvas.height / 2;
  snake.deltaX = 20;
  snake.deltaY = 0;
  return;
}
