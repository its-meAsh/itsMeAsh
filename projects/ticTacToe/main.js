const backHome = document.querySelector("#backHome")
backHome.addEventListener('click', () => { location.replace("../../index.html") });

const ivi = document.querySelector("#IvI");
const ivbot = document.querySelector("#IvBot");

const grid = [[document.querySelector("#b00"), document.querySelector("#b01"), document.querySelector("#b02")], [document.querySelector("#b10"), document.querySelector("#b11"), document.querySelector("#b12")], [document.querySelector("#b20"), document.querySelector("#b21"), document.querySelector("#b22")]]

const turnSpan = document.querySelector("#turnSpan");
const winnerPanel = document.querySelector("#winnerPanel");
const drawPanel = document.querySelector("#drawPanel");
const screen = document.querySelector("#screen");
const winnerLetter = document.querySelector("#winnerLetter");
const playAgain = document.querySelector("#playAgain");
const playAgain2 = document.querySelector("#playAgain2");

var board = [["", "", ""], ["", "", ""], ["", "", ""]]
var turn = 0;
var wBot = true;
var bLetter = "O";
var uLetter = "X";
var gameFinished = false;
var botTurn = false;
var winningComb;
var moves = 0;
var oPlace = []
var xPlace = []
var oTurn = 0
var xTurn = 0;
var infinity = false;
var opacedElem = undefined;

ivi.addEventListener('click', () => {
  wBot = false;
  screen.style.display = "flex";
  backHome.style.display = "flex"
  document.querySelector("#modeAsk").style.display = "none";
})
ivbot.addEventListener('click', () => {
  wBot = true;
  screen.style.display = "flex";
  backHome.style.display = "flex"
  document.querySelector("#modeAsk").style.display = "none";
  setLetter()
})


function choice(array) {
  return array[Math.floor(Math.random() * (array.length))];
}

function setLetter() {
  bLetter = choice(["X", "O"]);
  if (bLetter == "X") {
    uLetter = "O";
    botTurn = true;
    moveBot();
  }
  else {
    uLetter = "X"
  }
}

function move(e) {
  let letter;
  if (e.innerText == "") {
    moves++;
    if (turn == 0) {
      letter = "X";
    }
    else {
      letter = "O";
    }
    e.innerText = letter;
    let id = e.id;
    let array = [id.split("")[1], id.split("")[2]];
    board[array[0]][array[1]] = letter;
    if (checkWin() == 1) {
      gameFinished = true;
      declareWinner();
    }
    else if (checkWin() == 2) {
      gameFinished = true;
      declareDraw()
    }
    else {
      if (turn == 1) {
        turn = 0;
        letter = "X"
      }
      else {
        turn = 1;
        letter = "O"
      }
      turnSpan.innerText = letter;
    }
    
    if (letter == "X"){
      xTurn++;
      xPlace.push(e);
    }
    else{
      oTurn++;
      oPlace.push(e)
    }
    if (infinity){
      if (opacedElem != undefined){
        let posArray = opacedElem.id.split("");
        posArray.shift()
        let coord = [posArray[0],posArray[1]];
        board[coord[0]][coord[1]] = ""
        opacedElem.innerText = ""
        opacedElem.style.opacity = "1"
        opacedElem = undefined;
      }
      if (letter == "X" && oTurn >= 3){
        oTurn == 0;
        let elem = oPlace.shift();
        elem.style.opacity = "0.2";
        opacedElem = elem;
      }
      else if (letter == "O" && xTurn >= 3){
        xTurn == 0;
        let elem = xPlace.shift();
        elem.style.opacity = "0.2";
        opacedElem = elem;
      }
      
    }
  }
}

function setGame() {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid.length; j++) {
      grid[i][j].addEventListener('click', (e) => {
        if (board[i][j] == "") {
          move(e.currentTarget);
          botTurn = !botTurn;
          if (wBot && !gameFinished && botTurn) {
            moveBot()
          }
        }
      })
    }
  }
}

function resetGame() {
  board = [["", "", ""], ["", "", ""], ["", "", ""]]
  turn = 0;
  wBot = true;
  bLetter = "O";
  uLetter = "X";
  gameFinished = false;
  botTurn = false;
  winningComb;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      grid[i][j].style.backgroundColor = "#131316"
      grid[i][j].innerText = board[i][j]
    }
  }
  winnerPanel.style.display = "none"
  drawPanel.style.display = "none";
  screen.style.display = "flex";
  moves = 0;
}


function checkWin() {
  let c1 = [board[0][0], board[0][1], board[0][2]];
  let c2 = [board[1][0], board[1][1], board[1][2]];
  let c3 = [board[2][0], board[2][1], board[2][2]];

  let c4 = [board[0][0], board[1][0], board[2][0]];
  let c5 = [board[0][1], board[1][1], board[2][1]];
  let c6 = [board[0][2], board[1][2], board[2][2]];

  let c7 = [board[0][0], board[1][1], board[2][2]];
  let c8 = [board[2][0], board[1][1], board[0][2]];
  let count = 0;
  let allCombs = [c1, c2, c3, c4, c5, c6, c7, c8];
  for (let comb of allCombs) {
    if (checkFreq(comb, "X", 3) || checkFreq(comb, "O", 3)) {
      winnerComb = count;
      return 1;
    }
    count++;
  }
  for (let comb2 of allCombs) {
    for (let each of comb2) {
      if (each == "") {
        return 3;
      }
    }
  }

  return 2;
}

function declareWinner() {
  let elems = []
  for (let i = 0; i < 3; i++) {
    elems.push(formatWithGrid([winnerComb, i]))
  }
  for (let each of elems) {
    grid[each[0]][each[1]].style.backgroundColor = "green";
  }
  setTimeout(() => {
    winnerPanel.style.display = "flex";
    screen.style.display = "none"
    let letter;
    if (turn == 0) {
      letter = "X";
    }
    else {
      letter = "O"
    }
    winnerLetter.innerText = letter;
  }, 1500)
}

function declareDraw() {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      grid[i][j].style.backgroundColor = "grey"
    }
  }
  setTimeout(() => {
    drawPanel.style.display = "flex";
    screen.style.display = "none";
  }, 1500)
}



playAgain.addEventListener('click', () => {
  resetGame()
})
playAgain2.addEventListener('click', () => {
  resetGame()
})

setGame()

function moveBot() {
  let defenceMoves = [];
  let attackMoves = [];
  let allAvailableMoves = [];

  let c1 = [board[0][0], board[0][1], board[0][2]];
  let c2 = [board[1][0], board[1][1], board[1][2]];
  let c3 = [board[2][0], board[2][1], board[2][2]];

  let c4 = [board[0][0], board[1][0], board[2][0]];
  let c5 = [board[0][1], board[1][1], board[2][1]];
  let c6 = [board[0][2], board[1][2], board[2][2]];

  let c7 = [board[0][0], board[1][1], board[2][2]];
  let c8 = [board[2][0], board[1][1], board[0][2]];

  let allCombs = [c1, c2, c3, c4, c5, c6, c7, c8];

  for (let i = 0; i < allCombs.length; i++) {
    let index = [];
    if (checkFreq(allCombs[i], uLetter, 2) && checkFreq(allCombs[i], "", 1)) {
      index.push(i);
      for (let j = 0; j < allCombs[i].length; j++) {
        if (allCombs[i][j] == "") {
          index.push(j)
          let ret = formatWithGrid(index);
          defenceMoves.push(ret)
          index = [i]
        }
      }
    }
    if (checkFreq(allCombs[i], bLetter, 2) && checkFreq(allCombs[i], "", 1)) {
      index.push(i);
      for (let k = 0; k < allCombs[i].length; k++) {
        if (allCombs[i][k] == "") {
          index.push(k);
          let ret = formatWithGrid(index);
          attackMoves.push(ret)
          index = [i]
        }
      }
    }
  }

  for (let a = 0; a < 3; a++) {
    for (let b = 0; b < 3; b++) {
      if (board[a][b] == "") {
        allAvailableMoves.push([a, b])
      }
    }
  }



  let move = [];
  if (attackMoves.length != 0) {
    move = choice(attackMoves);
  }
  else if (defenceMoves.length != 0) {
    move = choice(defenceMoves);
  }
  else {
    move = choice(allAvailableMoves);
  }
  if (moves <= 1) {
    move = [1, 1]
  }
  if (board[move[0]][move[1]] != "") {
    move = choice(allAvailableMoves)
  }
  grid[move[0]][move[1]].click()
  botTurn = false;

}

function checkFreq(array, symbol, num) {
  let count = 0;
  for (let each of array) {
    if (each == symbol) {
      count++;
    }
  }
  if (count == num) {
    return true;
  }
  else {
    return false;
  }
}

function formatWithGrid(array) {
  let final = [];
  let x = array[0];
  let y = array[1];
  if (x <= 2) {
    final.push(x);
    final.push(y)
  }
  else if (3 <= x && x <= 5) {
    final.push(y);
    final.push(x - 3);
  }
  else {
    let p;
    let q;
    if (x == 6) {
      if (y == 0) {
        p = 0;
        q = 0;
      }
      else if (y == 1) {
        p = 1;
        q = 1;
      }
      else {
        p = 2;
        q = 2;
      }
    }
    else {
      if (y == 0) {
        p = 2;
        q = 0;
      }
      else if (y == 1) {
        p = 1;
        q = 1;
      }
      else {
        p = 0;
        q = 2;
      }
    }
    final.push(p);
    final.push(q)
  }
  return final;
}