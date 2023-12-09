const squares = document.querySelectorAll('.square');
const mole = document.querySelector('.mole');
let timeLeft = document.getElementById('timeLeft');
let score = document.getElementById('score');
let startButton = document.getElementById('startGame');

let result = 0;
let hitPositionID = null;
let speed = null;
let currTime = 60;
let countTimeID;

squares.forEach(function(square) {
    square.addEventListener('mousedown', function() {
        if (hitPositionID == square.id) {
            result++;
            score.textContent = result;
            hitPositionID = null;
            randomPosition.classList.remove('mole');
            square.classList.add('gotcha');
            setTimeout(function() {
                square.classList.remove('gotcha');
            }, 200);
            increaseSpeed();
        }
    });
});

function randomSquare() {
    squares.forEach(square => {
        square.classList.remove('mole');
    });

    let randomPosition = squares[Math.floor(Math.random() * squares.length)];
    randomPosition.classList.add('mole');
    hitPositionID = randomPosition.id;
}

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
    speed = setInterval(randomSquare, 500);
}

function countDown() {
    currTime--;
    timeLeft.textContent = currTime;
    if (currTime === 0) {
        clearInterval(countTimeID);
        clearInterval(speed);
        alert("Game Over! Your score is: " + result);
    }
}

startButton.addEventListener('click', function() {
    moveMole();
    countTimeID = setInterval(countDown, 1000);
    this.style.display = 'none';
});
