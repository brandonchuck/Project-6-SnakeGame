const GRID_UNIT = 20;
const FPS = 12;
let canvas;
let canvasContext;

let apple = {
  posX: null,
  posY: null,
};

let snake = {
  deltaX: null,
  deltaY: null,
  direction: null,
  body: [],
};

window.onload = function () {
  canvas = document.getElementById("canvas");
  canvasContext = canvas.getContext("2d");

  snake.body.push({
    x: canvas.width / 2,
    y: canvas.height / 2,
  });
  snake.direction = "right";

  apple.posX = randomGridInterval(canvas.width);
  apple.posY = randomGridInterval(canvas.height);

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
  };

  setInterval(() => {
    drawEverything();
    moveEverything();
  }, 1000 / FPS);
};

function drawEverything() {
  document.getElementById("scoreboard").textContent = `Score: ${
    snake.body.length - 1
  }`;
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
  let snakeColor;
  for (let i = 0; i < snake.body.length; i++) {
    if (i === 0) {
      snakeColor = "orange";
    } else {
      snakeColor = "green";
    }
    drawRect(snake.body[i].x, snake.body[i].y, 20, 20, snakeColor);
  }
}

/*
  1. Check if apple is in same position as snake head
    - if so, give new x,y positions
  2. Then, before drawing, check whether new apple coordinates are same as any snake body part's positions
    - if so, generate new coordinates for apple
  3. Finally, draw the apple with non-conflicting coordinates 
*/

function drawApple() {
  if (snake.body[0].x === apple.posX && snake.body[0].y === apple.posY) {
    // reposition if snake head touches apple
    apple.posX = randomGridInterval(canvas.width);
    apple.posY = randomGridInterval(canvas.height);

    // add new body part
    snake.body.push({
      x: snake.body[snake.body.length - 1].x - snake.deltaX,
      y: snake.body[snake.body.length - 1].y - snake.deltaY,
    });

    console.log(JSON.stringify(snake.body));
  }

  // Check if current apple positions same as snake positions
  for (i = 0; i < snake.body.length; i++) {
    // Reposition apple if current positions are same as snake positions
    if (apple.posX === snake.body[i].x && apple.posY === snake.body[i].y) {
      apple.posX = randomGridInterval(canvas.width);
      apple.posY = randomGridInterval(canvas.height);
    }
    // Finally, draw the apple with non-conflicting positions
    drawRect(apple.posX, apple.posY, 20, 20, "red");
  }
}

function moveEverything() {
  if (snake.body[0].y >= canvas.height || snake.body[0].y < 0) {
    resetGame();
  }

  if (snake.body[0].x >= canvas.width || snake.body[0].x < 0) {
    resetGame();
  }

  // check if head touches body
  for (i = 1; i < snake.body.length; i++) {
    if (
      snake.body[0].x === snake.body[i].x &&
      snake.body[0].y === snake.body[i].y
    ) {
      resetGame();
    }
  }

  moveSnake();
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

  // move head
  snake.body[0].x += snake.deltaX;
  snake.body[0].y += snake.deltaY;

  // move body parts
  for (let i = 1; i < snake.body.length; i++) {
    if (i === 1) {
      snake.body[i] = snakeCopy[0];
    } else {
      snake.body[i] = snakeCopy[i - 1];
    }
  }
}

// Generates random interval of 20 between 0 and canvas.width/height
function randomGridInterval(max) {
  return Math.floor(Math.random() * (max / 20)) * GRID_UNIT;
}

function resetGame() {
  alert("game over!");

  // clear snake body
  snake.body.splice(1, snake.body.length - 1);

  // reposition snake & apple
  snake.body[0].x = canvas.width / 2;
  snake.body[0].y = canvas.height / 2;
  snake.direction = "right";
  apple.posX = randomGridInterval(canvas.width);
  apple.posY = randomGridInterval(canvas.height);
  return;
}
