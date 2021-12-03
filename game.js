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
let deltaX; // + means right arrow; - means left arrow
let deltaY; // + means down arrow; - means up arrow

window.onload = function () {
  canvas = document.getElementById("canvas");
  canvasContext = canvas.getContext("2d");

  direction = "ArrowRight";
  // set apple position on load
  // applePositionX = (Math.random() * canvas.width) / canvas.width;
  // applePositionY

  // Initial snake position and speed
  snakePositionX = canvas.width / 2;
  snakePositionY = canvas.height / 2;
  deltaX = 20;
  deltaY = 0;

  let framesPerSecond = 30;

  // listen for keypress on load
  canvas.addEventListener("keydown", moveSnake);

  setInterval(() => {
    drawBoard();
    drawGrid();
    drawSnake();
  }, 1000 / framesPerSecond);
};

function drawBoard() {
  drawRect(0, 0, canvas.width, canvas.height, "black");
}

function drawRect(leftX, topY, width, height, color) {
  canvasContext.fillStyle = color;
  canvasContext.fillRect(leftX, topY, width, height);
}

function drawSnake() {
  canvasContext.fillStyle = "red";
  canvasContext.fillRect(snakePositionX, snakePositionY, 20, 20);
}

function drawGrid() {
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

function eatApple() {
  snakeLength++;

  // relocate apple to random coordinate

  // increase length of snake and draw on canvas
}

// Snake movement
function moveSnake(e) {
  const key = e.key;
  direction = key;

  if (snakePositionY >= canvas.height || snakePositionY <= 0) {
    alert("game over!");
    return;
  } else {
    if (key === "ArrowUp") {
      snakePositionY -= 20;
    }
    if (key === "ArrowDown") {
      snakePositionY += 20;
    }
  }

  if (snakePositionX >= canvas.width || snakePositionX <= 0) {
    alert("game over!");
    return;
  } else {
    if (key === "ArrowRight") {
      snakePositionX += 20;
    }
    if (key === "ArrowLeft") {
      snakePositionX -= 20;
    }
  }
}
