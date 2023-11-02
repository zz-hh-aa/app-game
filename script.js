// info modal

// open the instructions modal
// document.addEventListener('DOMContentLoaded', function () {
//     var elems = document.querySelectorAll('.modal');
//     var instances = M.Modal.init(elems);
//   });
  
//   // close the modal when button clicked
//   document.getElementById('closeModal').addEventListener('click', function () {
//     var modalInstance = M.Modal.getInstance(document.getElementById('instructionsModal'));
//     modalInstance.close();
//   });

// board
var blockSize = 25;
var rows = 25;
var cols = 25;
var board;
var context;

// worm
var wormX = blockSize * 5;
var wormY = blockSize * 5;

var velocityX = 0;
var velocityY = 0;

var wormBody = [];

// food
var foodX;
var foodY;

// end conditions
var gameOver = false;

window.onload = function() {
  board = document.getElementById("board");
  board.height = rows * blockSize;
  board.width = cols * blockSize;
  context = board.getContext("2d");

  placeFood();
  document.addEventListener("keyup", changeDirection)
  setInterval(update, 1000/10); // reloads 10 times a second
}

function update() {
  // draw board
  context.fillStyle="saddlebrown";
  context.fillRect(0, 0, board.width, board.height);

  // draw food
  context.fillStyle = "yellow";
  context.fillRect(foodX, foodY, blockSize, blockSize);

  // eat food
  if (wormX === foodX && wormY === foodY) {
    wormBody.push([foodX, foodY]);
    placeFood();
  }

  // worm body attaches to worm head
  for (let i = wormBody.length - 1; i > 0; i--) {
    wormBody[i] = wormBody[i-1];
  }
  if (wormBody.length) {
    wormBody[0] = [wormX, wormY];
  }

  // draw worm
  context.fillStyle = "salmon";
  context.strokeStyle = "black";
  context.lineWidth = 1;
  wormX += velocityX * blockSize;
  wormY += velocityY * blockSize;
  context.fillRect(wormX, wormY, blockSize, blockSize);
  context.strokeRect(wormX, wormY, blockSize, blockSize);

  for (let i = 0; i < wormBody.length; i++) {
    context.fillRect(wormBody[i][0], wormBody[i][1], blockSize, blockSize);
    context.strokeRect(wormBody[i][0], wormBody[i][1], blockSize, blockSize);
  }

  // end condition
  if (wormX < 0 || wormX > cols * blockSize || wormY < 0 || wormY > rows * blockSize) {
    gameOver = true;
  }

  for (let i = 0; i < wormBody.length; i++) {
    if (wormX === wormBody[i][0] && wormY === wormBody[i][1])
    gameOver = true;
  }

  // handle end of game
  if (gameOver) {
    alert("Game over! Click 'OK' to play again.");
    window.location.reload();
  }
}

function changeDirection(e) {
  if (e.code == "ArrowUp" && velocityY != 1) {
    velocityX = 0;
    velocityY = -1;
  }
  else if (e.code == "ArrowDown" && velocityY != -1) {
    velocityX = 0;
    velocityY = 1;
  }
  else if (e.code == "ArrowLeft" && velocityX != 1) {
    velocityX = -1;
    velocityY = 0;
  }
  else if (e.code == "ArrowRight" && velocityX != -1) {
    velocityX = 1;
    velocityY = 0;
  }
}
 
function placeFood() {
  foodX = Math.floor(Math.random() * rows) * blockSize;
  foodY = Math.floor(Math.random() * cols) * blockSize;
}