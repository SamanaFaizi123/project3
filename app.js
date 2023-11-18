const playBoard = document.querySelector(".play-board");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".high-score");

let gameOver = false;
let foodX , foodY ;
let snakeX =5, snakeY = 10;
let snakeBody = [];
let velocityX =0, velocityY =0;
let setIntervalId;
let score = 0;

let highScore = localStorage.getItem("high-score") || 0;
highScoreElement.innerText = ` High Score: ${highScore}`;

const changFoodPosition = ( ) => {
    // passing a random 0-30 values as food position;
    foodX = Math.floor(Math.random() *30) +1;
    foodY = Math.floor(Math.random() *30) +1;
} 
const handleGameOver = () => {
    // clearing the timer and reloding the page on game over
    clearInterval(setIntervalId);
    alert("Game Over! press OK to replay...");
    location.reload();
}
const changeDirection = (event) => {
     // changing velocity value based on key press;
    if (event.key === "ArrowUp" && velocityY != 1){
        velocityX = 0;
        velocityY =-1;
    }else if(event.key === "ArrowDown"&& velocityY != -1){
        velocityX = 0;
        velocityY =1;
    }else if(event.key === "ArrowLeft"&& velocityX != 1){
        velocityX = -1;
        velocityY =0;
    }else if(event.key === "ArrowRight"&& velocityX != -1){
        velocityX = 1;
        velocityY =0;
    } 
}

const initGame = () => {
    if(gameOver ) return handleGameOver();
    let  htmlMarkup = '';
    htmlMarkup = `<div class ="food" style = "grid-area: ${foodY} / ${foodX}"></div>`;
    // ubdating the snake 's head poistion  basedon the current veloity
    snakeX += velocityX;
    snakeY += velocityY;
    // cheaking if the snake's head poistion based on the current velocity;
    if(snakeX === foodX &&snakeY === foodY){
        changFoodPosition();
        snakeBody.push([foodX,foodY]);
        score++;
        highScore = score >= highScore ? score : highScore ;
        localStorage.setItem("high-score", highScore);
        scoreElement.innerText = `Score: ${score}`;
        highScoreElement.innerText = ` High Score: ${highScore}`;
    }
    if(snakeX <= 0|| snakeX > 30 || snakeY <= 0 || snakeY > 30) {
        gameOver = true;

    }
    for(let i = snakeBody.length-1; i > 0; i--){
        snakeBody[i] = snakeBody[i - 1];
    }
    snakeBody[0] = [snakeX,snakeY]

    for(let i = 0; i< snakeBody.length;i++){
        // addind a div for each part of snack's body
        htmlMarkup += `<div class ="head" style = "grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
        // cheaking if the snake head hit the body,if so set the gameOver true
    if(i !== 0 && snakeBody[0][1] === snakeBody[i][1] && i !== 0 && snakeBody[0][0] === snakeBody[i][0]){
        gameOver = true;
    }
 }
      playBoard.innerHTML = htmlMarkup;
}
changFoodPosition();
  setIntervalId =setInterval(initGame, 125);
document.addEventListener("keydown" , changeDirection);
