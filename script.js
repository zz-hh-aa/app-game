// INSTRUCTIONS MODAL
var modal = document.getElementById('instructionsModal');

// open the instructions modal
document.addEventListener('DOMContentLoaded', function () {
    //  var elems = document.querySelectorAll('.modal');
    //  var instances = M.Modal.init(elems);
   });
  
// close the modal when button clicked
   document.getElementById('closeModal').addEventListener('click', function () {
     modal.style.display = 'none';
    //  overlay.style.display = 'none';
});

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------

// DRAW / CREATE GAME ELEMENTS
// create board
var blockSize = 25;
var rows = 25;
var cols = 25;
var board;
var context;

// create worm
var wormX = blockSize * 5;
var wormY = blockSize * 5;

var velocityX = 0;
var velocityY = 0;

var wormBody = [];

// create food placement variables
var foodX;
var foodY;

// create food images
var foodImg1 = new Image();
foodImg1.src = 'images\\banana.png'
var foodImg2 = new Image();
foodImg2.src = 'images\\cardboard.png'
var foodImg = getRandomFoodImage()

// create plastic placement array
var plasticBottles = [];

// create plastic image
var plasticImg = new Image();
plasticImg.src = 'images\\waterbottle.png'

// create variable for end conditions
var gameOver = false;

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------

// CREATE GAME FUNCTIONS
// function for drawing board
window.onload = function() {
  board = document.getElementById("board");
  board.height = rows * blockSize;
  board.width = cols * blockSize;
  context = board.getContext("2d");

  placeFood();
  document.addEventListener("keyup", changeDirection)
  setInterval(update, 1000/10); // reloads 10 times a second
  setInterval(placePlastic, 5000); // reloads plastic every 5 seconds
}

// update game board through play
function update() {
  // draw board
  context.fillStyle="saddlebrown";
  context.fillRect(0, 0, board.width, board.height);
  context.drawImage(foodImg, foodX, foodY, blockSize, blockSize);
  for (var i = 0; i < plasticBottles.length; i++) {
    context.drawImage(plasticImg, plasticBottles[i].x, plasticBottles[i].y, blockSize, blockSize);
  }

  // eat food
  if (wormX === foodX && wormY === foodY) {
    wormBody.push([foodX, foodY]);
    placeFood();
    foodImg = getRandomFoodImage();
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

  // draw growing worm body
  for (let i = 0; i < wormBody.length; i++) {
    context.fillRect(wormBody[i][0], wormBody[i][1], blockSize, blockSize);
    context.strokeRect(wormBody[i][0], wormBody[i][1], blockSize, blockSize);
  }

  // end condition (outside of game board)
  if (wormX < 0 || wormX > cols * blockSize || wormY < 0 || wormY > rows * blockSize) {
    gameOver = true;
  }

  // end game if worm eats self
  for (let i = 0; i < wormBody.length; i++) {
    if (wormX === wormBody[i][0] && wormY === wormBody[i][1])
    gameOver = true;
  }

  // end game if worm eats plastic
  for (let i = 0; i < plasticBottles.length; i++) {
    if (wormX === plasticBottles[i].x && wormY === plasticBottles[i].y) {
      gameOver = true;
    }
  }

  // handle end of game
  if (gameOver) {
    alert("Game over! Click 'OK' to play again. (It might take some time to reload.)");
    window.location.reload();
  }
}

// function for worm changing direction--cannot go back on itself
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

// place food
function placeFood() {
  foodX = Math.floor(Math.random() * rows) * blockSize;
  foodY = Math.floor(Math.random() * cols) * blockSize;
}

// place plastic
function placePlastic() {
  var x = Math.floor(Math.random() * rows) * blockSize;
  var y = Math.floor(Math.random() * cols) * blockSize;

  // plastic shouldn't be placed on food
  if (x === foodX && y === foodY) {
    placePlastic();
    return;
  }

  // plastic shouldn't be placed on self
  for (var i = 0; i < plasticBottles.length; i++) {
    if (x === plasticBottles[i].x && y === plasticBottles[i].y) {
      placePlastic();
      return;
    }
  }

  plasticBottles.push({x,y});
}

// get random food image function
function getRandomFoodImage() {
  var randomIndex = Math.floor(Math.random() * 2);
  console.log("getRandomFoodImage:", randomIndex);
  return randomIndex === 0 ? foodImg1 : foodImg2;
}

