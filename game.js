const GRID_UNIT = 20;
const FPS = 13;
let canvas = document.getElementById("canvas");
let canvasContext = canvas.getContext("2d");

// initial apple coordinates
let apple = {
  x: null,
  y: null,
};

// initial snake direction, speed, and coordinates
let snake = {
  deltaX: null,
  deltaY: null,
  direction: null,
  body: [{ x: 400, y: 400 }],
};

window.onload = function () {
  generateRandomApple();
  changeSnakeDirection();

  setInterval(() => {
    updateScore();
    drawBoard();
    drawSnake();
    drawApple();
    wallCheck();
    bodyCheck();
    moveSnake();
  }, 1000 / FPS);
};

function drawBoard() {
  drawRect(0, 0, canvas.width, canvas.height, "rgb(43, 43, 43)");

  // draw vertical grid lines
  for (let i = 0; i <= canvas.width; i += GRID_UNIT) {
    canvasContext.beginPath();
    canvasContext.moveTo(i, 0);
    canvasContext.lineTo(i, canvas.height);
    canvasContext.stroke();
  }

  // draw horizontal grid lines
  for (let i = 0; i <= canvas.height; i += GRID_UNIT) {
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

function drawApple() {
  let snakeTouchedApple =
    snake.body[0].x === apple.x && snake.body[0].y === apple.y;

  if (snakeTouchedApple) {
    generateRandomApple();
    growSnake();
  }

  for (i = 0; i < snake.body.length; i++) {
    if (apple.x === snake.body[i].x && apple.y === snake.body[i].y) {
      generateRandomApple();
    }
    drawRect(apple.x, apple.y, 20, 20, "rgb(173, 0, 0)");
  }
}

function drawSnake() {
  let snakeColor;
  snake.body.forEach((part, index) => {
    index === 0 ? (snakeColor = "green") : (snakeColor = "rgb(250, 183, 0)");
    drawRect(part.x, part.y, GRID_UNIT, GRID_UNIT, snakeColor);
  });
}

function growSnake() {
  snake.body.push({
    x: snake.body[snake.body.length - 1].x - snake.deltaX, // add new body part coordinates {x:, y:} as the previous position of last body part
    y: snake.body[snake.body.length - 1].y - snake.deltaY,
  });
}

function wallCheck() {
  if (
    snake.body[0].y >= canvas.height ||
    snake.body[0].y < 0 ||
    snake.body[0].x >= canvas.width ||
    snake.body[0].x < 0
  ) {
    resetGame();
  }
}

// check if snake hit itself
function bodyCheck() {
  for (i = 1; i < snake.body.length; i++) {
    if (
      snake.body[0].x === snake.body[i].x &&
      snake.body[0].y === snake.body[i].y
    ) {
      resetGame();
    }
  }
}

function changeSnakeDirection() {
  document.onkeydown = (e) => {
    e.preventDefault();

    switch (e.key) {
      case "ArrowUp":
        if (snake.direction !== "down") {
          snake.direction = "up";
        }
        break;
      case "ArrowDown":
        if (snake.direction !== "up") {
          snake.direction = "down";
        }
        break;

      case "ArrowRight":
        if (snake.direction !== "left") {
          snake.direction = "right";
        }
        break;

      case "ArrowLeft":
        if (snake.direction !== "right") {
          snake.direction = "left";
        }
        break;
    }
  };
}

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

  let snakeCopy = JSON.parse(JSON.stringify(snake.body)); // deep copy

  // move snake head
  snake.body[0].x += snake.deltaX;
  snake.body[0].y += snake.deltaY;

  // sequentially move body parts
  for (let i = 1; i < snake.body.length; i++) {
    if (i === 1) {
      snake.body[i] = snakeCopy[0];
    } else {
      snake.body[i] = snakeCopy[i - 1];
    }
  }
}

function generateRandomApple() {
  apple.x = Math.floor(Math.random() * (canvas.width / 20)) * GRID_UNIT;
  apple.y = Math.floor(Math.random() * (canvas.height / 20)) * GRID_UNIT;
}

function updateScore() {
  const score = document.getElementById("scoreboard");
  score.textContent = `Score: ${snake.body.length - 1}`;
}

function resetGame() {
  alert("Game Over!");

  // remove all body parts except the head
  snake.body.splice(1, snake.body.length - 1);

  snake = {
    deltaX: null,
    deltaY: null,
    direction: null,
    body: [{ x: 400, y: 400 }],
  };

  generateRandomApple();
  return;
}
