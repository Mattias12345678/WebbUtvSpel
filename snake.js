//board
var blockSize = 25;
var rows = 20;
var cols = 20;
var board;
var context;

//ormens huvud, koden säger att ormen ska basically börja på punkt (5, 5)
var snakeX = blockSize * 5;
var snakeY = blockSize * 5;

//funktionen för ormens hastighet
var velocityX = 0;
var velocityY = 0;

var snakeBody = []; //funktionen för ormens kropp

//maten
var foodX;
var foodY;

var gameOver = false;

//canvasen i sidan, gör så att man faktiskt kan se boarden 
window.onload = function () {
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d"); //2d inte 3d

    placeFood();
    document.addEventListener("keyup", changeDirection); //keybinds för att kunna spela
    //update();
    setInterval(update, 1000/10); //för varje 100 millisekund updateras sidan
}

function update() {
    if (gameOver) {
        return;
    }
    context.fillStyle="black"; //gör skärmen svart
    context.fillRect(0, 0, board.width, board.height); //fyller i skärmen med färgen svart från hörn till hörn

    //maten
    context.fillStyle="red"; //när jag försöker lägga en websafe color med en hashtag funkar det inte bara så att du vet (sammat för de andra färgerna )
    context.fillRect(foodX, foodY, blockSize, blockSize); 

    //när ormen äter kommer en till kropp eller block
    if (snakeX == foodX && snakeY ==foodY) {
        snakeBody.push([foodX, foodY]);
        placeFood();
    }

    //det här gör så att den nya kroppen eller kroppen connectas till huvudet
    for (let i = snakeBody.length-1; i > 0; i--) {
        snakeBody[i] = snakeBody[i-1];
    }
    //gör så att den bakre delen är också connectad till den framför den och följer efter den
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }
    
    //huvudet, hur snabbt den går, vilken färg den här, och hur kroppen ska kopplas till huvudet
    context.fillStyle="lime";
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    //så att spelet slutar
    if (snakeX < 0 || snakeX > cols*blockSize || snakeY < 0 || snakeY > rows*blockSize) {
        gameOver = true;
        alert("Game Over");
    }

    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameOver = true;
            alert("Game Over");
        }
    }

}


//hur snabbt ormen rör sig
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

function placeFood() { //radnom spawn 
    foodX = Math.floor(Math.random() * cols) * blockSize;    
    foodY = Math.floor(Math.random() * rows) * blockSize;   
}