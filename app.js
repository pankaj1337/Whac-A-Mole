const squares = document.querySelectorAll(".square");
const mole = document.querySelector(".mole");
let timeLeft = document.getElementById("timeLeft");
let score = document.getElementById("score");
let startButton = document.getElementById("startGame");
let restartButton = document.getElementById("restartGame");
let gameOverModal = document.getElementById("gameOverModal");
let finalScore = document.getElementById("finalScore");
let playAgainButton = document.getElementById("playAgain");

let result = 0;
let hitPositionID = null;
let speed = null;
let currTime = 60;
let countTimeID;

squares.forEach(function (square) {
  square.addEventListener("mousedown", function () {
    if (hitPositionID == square.id) {
      result++;
      score.textContent = result;
      hitPositionID = null;
      randomPosition.classList.remove("mole");
      square.classList.add("gotcha");
      setTimeout(function () {
        square.classList.remove("gotcha");
      }, 200);
      increaseSpeed();
    }
  });
});

function randomSquare() {
  squares.forEach((square) => {
    square.classList.remove("mole");
  });

  let randomPosition = squares[Math.floor(Math.random() * squares.length)];
  hitPositionID = randomPosition.id;
  randomPosition.classList.add("mole");
}

startButton.addEventListener("click", function () {
  console.log("starting game");
  moveMole();
  countTimeID = setInterval(countDown, 1000);
  this.style.display = "none";
});

function increaseSpeed() {
  if (result > 10) {
    clearInterval(speed);
    speed = setInterval(randomSquare, 400);
  }
  if (result > 20) {
    clearInterval(speed);
    speed = setInterval(randomSquare, 300);
  }
}

function moveMole() {
  speed = setInterval(randomSquare, 600);
}

function countDown() {
  currTime--;
  timeLeft.textContent = currTime;
  if (currTime === 0) {
    clearInterval(countTimeID);
    clearInterval(speed);
    showGameOverModal();
  }
}

function showGameOverModal() {
  console.log("Showing modal");
  finalScore.textContent = result;
  gameOverModal.style.display = "flex";

  // Hide the hole and squares when the game ends
  document.querySelectorAll(".hole, .square").forEach((element) => {
    element.style.display = "none";
  });
}

function restartGame() {
  console.log("Restarting game");
  // Show the hole and squares when restarting the game
  document.querySelectorAll(".hole, .square").forEach((element) => {
    element.style.display = "block";
  });

  gameOverModal.style.display = "none";
  result = 0;
  hitPositionID = null;
  currTime = 60;
  score.textContent = result;
  timeLeft.textContent = currTime;
  clearInterval(countTimeID);
  clearInterval(speed);
  startButton.style.display = "block";
  restartButton.style.display = "none";
}

playAgainButton.addEventListener("click", function () {
  console.log("Play Again button clicked");
  restartGame();
});
