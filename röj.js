var board = [];
var rows = 8; /*antalet kolumner/rader spelet har*/
var columns = 8;

var minesCount = 5;
var minesLocation = []; /*kordinaterna ex. 1-2, 3-3*/

var tilesClicked = 0; /*för varje tile som blir klickad så går siffran upp med en tills användaren når antalet tiles som finns*/
var flagEnabled = false;

var gameOver = false; /*när spelet är över så kommer användaren inte kunna trycka på något*/

window.onload = function() {
    startGame();

}

function restartGame() { // Gör så at man kan restarta
    location.reload();
  }

function setMines() { //minornas kordinater
    minesLocation.push("2-2");
    minesLocation.push("1-4");
    minesLocation.push("3-5");
    minesLocation.push("7-3");
    minesLocation.push("6-2");

}

    
    //den här delen av koden funkar inte för min dator är bajs men det skulle basically göra så att bomberna hade en random kordinat i brädan 
/*let minesLeft = minesCount;
    while (minesLeft > 0) {
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * columns);
        let id = r.toString() + "-" + c.toString();
        minesLeft -= 1;

        if (minesLocation.includes(id)) {
            minesLocation.push(id);
            
        }
    }*/


function startGame() {
    document.getElementById("mines-count").innerText = minesCount;
    document.getElementById("flag-button").addEventListener("click", setFlag);
    setMines();

    //populating boarden
    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.addEventListener("click", clickTile);
            document.getElementById("board").append(tile);
            row.push(tile);

        }
        board.push(row);
    }
    console.log(board);

}

function setFlag() { //själva flaggans knapp, trycker man kommer knappen ha en darkgray färg sen när man trycker på den igen så kommer den att ha en ljusgrå färg
    if (flagEnabled) {
        flagEnabled = false;
        document.getElementById("flag-button").style.backgroundColor = "lightgray";
    }
    else {
        flagEnabled = true; 
        document.getElementById("flag-button").style.backgroundColor = "darkgray"
    }
}

function clickTile() {
    if (gameOver || this.classList.contains("tile-clicked")) { //om detta är sant kommer det inte att checka för bomber
        return;
    }
    
    //det här gör så att man kan lägga in flaggan i brädan för att visa att man har hittat bomben
    let tile = this;
    if (flagEnabled) {
        if (tile.innerText == "") {
            tile.innerText = "F";
        }
        else if (tile.innerText = "F") {
            tile.innerText = "";
        }
        return;
    }

    if (minesLocation.includes(tile.id)) { //om man trycker på en av minornas kordination slutar spelet
        //alert("Game Over");
        gameOver = true;
        revealMines();
        return;
    }

    let coords = tile.id.split("-"); //funktionen beskriver om användaren inte trycker på en mina kommer det att komma upp en siffra
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);
    checkMine(r, c);

}


//förlorar man/trycker på en bomb kommer alla gömda bomber upp med en röd bakgrund
function revealMines() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = board[r][c];
            if (minesLocation.includes(tile.id)) {
                tile.innerText = "B";
                tile.style.backgroundColor = "red"
            }
        }
    }
}

function checkMine(r, c) {
    if (r < 0 || r >= rows || c < 0 || c >= columns) {
        return;
    }
    if (board[r][c].classList.contains("tile-clicked")) {
        return;
    }

    board[r][c].classList.add("tile-clicked") //om det inte finns en bomb runt sin kordinat så kommer den att fortsätta att runna tills det finns en kordinat där det finns en bomb i närhten
    tilesClicked += 1;


    let minesFound = 0;


    //top 3
    minesFound += checkTile(r-1, c-1);          //top left
    minesFound += checkTile(r-1, c);        //top 
    minesFound += checkTile(r-1, c+1);          //top right

    //left and right
    minesFound += checkTile(r, c-1);        //left
    minesFound += checkTile(r, c+1);        //right

    //bottom 3
    minesFound += checkTile(r+1, c-1);      //bottom left
    minesFound += checkTile(r+1, c);        //bottom
    minesFound += checkTile(r+1, c+1);      //bottom right

    if (minesFound > 0) {
        board[r][c].innerText = minesFound;
        board[r][c].classList.add("x" + minesFound.toString());
    }
    else {
        //top 3
        checkMine(r-1, c-1);    //top left
        checkMine(r-1, c);    //top
        checkMine(r-1, c+1);    //top right

        //left and right
        checkMine(r, c-1);    //left
        checkMine(r, c+1);    //right

        checkMine(r+1, c-1);    //bottom left
        checkMine(r+1, c);    //bottom
        checkMine(r+1, c+1);    //bottom right
    }

    if(tilesClicked == rows * columns - minesCount) {
        document.getElementById("mines-count").innerText = "Cleared"
        gameOver = true;
    }

}

function checkTile (r, c) {
    if (r < 0 || r >= rows || c < 0 || c >= columns) {
        return 0;
    }
    if (minesLocation.includes(r.toString() + "-" + c.toString())) {
        return 1;
    }
    return 0;
}
    
