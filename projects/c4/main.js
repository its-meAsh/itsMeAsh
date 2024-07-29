const backHome = document.querySelector("#backHome")
backHome.addEventListener('click', () => { location.replace("../../index.html") });

const ivi = document.querySelector("#IvI");
const ivbot = document.querySelector("#IvBot");
const screen = document.querySelector("#screen");
const boardSetting = document.querySelector("#boardSetting");
const startGameButton = document.querySelector("#startGameButton");
const boardWidthInput = document.querySelector("#boardWidthInput")
const boardHeightInput = document.querySelector("#boardHeightInput")
const currentMove = document.querySelector("#currentMove");
const moveToken = document.querySelector("#moveToken");
const winPanel = document.querySelector("#winPanel");
const winnerColorToken = document.querySelector("#winnerColorToken")
const playAgain1 = document.querySelector("#playAgain1");
const drawPanel = document.querySelector("#drawPanel");
const playAgain2 = document.querySelector("#playAgain2");


ivi.addEventListener('click', () => {
  wBot = false;
  boardSetting.style.display = "flex";
  backHome.style.display = "flex"
  document.querySelector("#modeAsk").style.display = "none";
})
ivbot.addEventListener('click', () => {
  wBot = true;
  boardSetting.style.display = "flex";
  backHome.style.display = "flex"
  document.querySelector("#modeAsk").style.display = "none";
})


var boardH;
var boardW;
var grid = []
var board = []
var colEnders = []
var gamesPlayed = 0;

var s1 = "*"
var s2 = "@"
var c1 = "red";
var c2 = "green"


var turnSymbol = s2
var turnColor = c2

var uSym;
var bSym;

var wBot = true;
var gameFinished = false;

function distributeSymbols() {
  let a = choice([0, 1]);
  if (a == 1) {
    uSym = s1;
    bSym = s2;
  }
  else {
    uSym = s2;
    bSym = s1;
  }
}

function choice(array) {
  return array[Math.floor(Math.random() * (array.length))]
}



startGameButton.addEventListener('click', () => { 
  boardW = boardWidthInput.value;
  boardH = boardHeightInput.value;
  if (boardH >= 4 && boardH <=5 && boardW >= 4 && boardW<=11){
  resetGame() }
  else{
    alert("Board Height Range: 4 to 5, Board Width Range: 4 to 11")
  }
})

function generateEmptyBoard() {
  for (let i = 0; i < boardW; i++) {
    grid.push([])
    board.push([])
    let columnElem = document.createElement('div');
    columnElem.setAttribute('class', 'columnElem');
    for (let j = 0; j < boardH; j++) {
      let elem = document.createElement('div');
      elem.setAttribute('class', 'token0');
      elem.setAttribute('id', `p${i}p${j}`)
      grid[i].push(elem)
      board[i].push("");
      columnElem.appendChild(elem);
    }
    let colEndElem = document.createElement('div');
    colEndElem.setAttribute('class', 'colEndElem')
    colEndElem.innerText = `${i+1}`;
    colEndElem.setAttribute('id', `end${i}`)
    columnElem.appendChild(colEndElem)
    colEnders.push(colEndElem)
    screen.appendChild(columnElem)

  }
}





function resetGame() {
  screen.style.display = "flex";
  boardSetting.style.display = "none";

  boardW = boardWidthInput.value;
  boardH = boardHeightInput.value;
  screen.innerHTML = "";
  turnSymbol = s1;
  turnColor = c1;
  screen.style.display = "flex"
  winPanel.style.display = "none";
  currentMove.style.display = "flex"
  drawPanel.style.display = "none"
  grid = []
  board = []
  colEnders = []
  allCombs = []
  gameFinished = false;
  generateEmptyBoard()
  setEventListener()
  getAllCombs()
  flipTurns()
  flipTurns()
  if (wBot) {
    distributeSymbols();
    if (s1 == bSym) {
      botMove()
    }
  }
}

function setEventListener() {
  for (let i = 0; i < colEnders.length; i++) {
    colEnders[i].addEventListener('click', () => {
      let ret = move(i);
      if (ret && !gameFinished) {
        flipTurns();
        let gameDone = checkWin();
        if (gameDone != false && gameDone != "draw") {
          runWinSim(gameDone);
          gameFinished = true;
        }
        else if (gameDone == "draw") {
          runDrawSim()
          gameFinished = true;
        }
        if (turnSymbol == bSym && !gameFinished) {
          botMove();
        }
      }
    })
  }
}

function startGameFirstTime() {
  setEventListener()
  currentMove.style.display = "flex"
  getAllCombs()
}

function checkFreq(array, symbol, n) {
  let count = 0;
  for (let each of array) {
    if (each == symbol) {
      count++;
    }
  }
  if (count == n) {
    return true;
  }
  else {
    return false;
  }
}


function move(col) {
  if (checkFreq(board[col], "", 0)) {
    return false;
  }
  else {
    let i;
    for (i = 0; i < board[col].length; i++) {
      if (board[col][i] != "") {
        break;
      }
    }
    board[col][i - 1] = turnSymbol;
    grid[col][i - 1].style.backgroundColor = turnColor;
  }
  return true;
}

function flipTurns() {
  if (turnColor == c1) {
    turnColor = c2;
  }
  else {
    turnColor = c1;
  }

  if (turnSymbol == s1) {
    turnSymbol = s2;
  }
  else {
    turnSymbol = s1;
  }
  moveToken.style.backgroundColor = turnColor;
}

function getDiagonals(arr) {
  const m = arr.length;
  const n = arr[0].length;
  const k = m + n - 1;
  const diagonals = Array(k).fill().map(() => []);

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      const d = i + j;
      diagonals[d].push(arr[i][j]);
    }
  }

  return diagonals;
}

function getOppositeDiagonals(arr) {
  const m = arr.length;
  const n = arr[0].length;
  const k = m + n - 1;
  const diagonals = Array(k).fill().map(() => []);

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      const d = (m - 1) - i + j;
      diagonals[d].push(arr[i][j]);
    }
  }

  return diagonals;
}

function generateComb(array, num) {
  let refIndex;
  let finalComb = []
  for (refIndex = 0; refIndex <= array.length - 4; refIndex++) {
    let comb = []
    for (let i = 0; i < num; i++) {
      comb.push(array[refIndex + i]);
    }
    finalComb.push(comb);
  }
  return finalComb;
}


var allCombs;

function getAllCombs() {
  allCombs = []
  for (let each of grid) {
    allCombs = allCombs.concat(generateComb(each, 4));
  }
  for (let j = 0; j < board[0].length; j++) {
    let array = []
    for (let every of grid) {
      array.push(every[j]);
    }
    allCombs = allCombs.concat(generateComb(array, 4))
  }

  let d1 = getDiagonals(grid);
  for (let each of d1) {
    if (each.length >= 4) {
      allCombs = allCombs.concat(generateComb(each, 4));
    }
  }

  let d2 = getOppositeDiagonals(grid);
  for (let each of d2) {
    if (each.length >= 4) {
      allCombs = allCombs.concat(generateComb(each, 4));
    }
  }
}


function scale(array) {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      grid[i][j].style.transform = "none";
    }
  }
  for (let each of array) {
    each.style.transform = "scale(1.4)";
  }
}

function getSymFromElem(elem) {
  let id = elem.id;
  id = id.split("p")
  let coord = [Number(id[1]), Number(id[2])]
  return board[coord[0]][coord[1]]
}


function getSymFromComb(array) {
  let symArray = []
  for (let every of array) {
    symArray.push(getSymFromElem(every))
  }
  return symArray;
}


function checkWin() {
  for (let each of allCombs) {
    let symArray = getSymFromComb(each)
    if (checkFreq(symArray, s1, 4) || checkFreq(symArray, s2, 4)) {
      return each;
    }
  }
  let count = 0;
  for (let each of allCombs) {
    let symArray = getSymFromComb(each)
    if (checkFreq(symArray, "", 0)) {
      count++;
    }
  }
  if (count == allCombs.length) {
    return "draw"
  }

  return false
}


function runWinSim(array) {
  scale(array)
  setTimeout(() => {
    screen.style.display = "none";
    winPanel.style.display = "flex";
    flipTurns()
    winnerColorToken.style.backgroundColor = turnColor;
    currentMove.style.display = "none"
  }, 2000)
}


function runDrawSim() {
  for (let row of grid){
    for (let element of row){
      element.style.backgroundColor = "grey"
    }
  }
  setTimeout(() => {
    screen.style.display = "none";
    drawPanel.style.display = "flex";
    currentMove.style.display = "none"
  }, 2000);
}

playAgain1.addEventListener('click', () => { resetGame() })
playAgain2.addEventListener('click', () => { resetGame() })

function botMove() {
  let defenceCombs = []
  for (let each of allCombs) {
    let symArray = getSymFromComb(each);
    if (checkFreq(symArray, uSym, 3) && checkFreq(symArray, "", 1)) {
      defenceCombs.push(each)
    }
  }
  let attackCombs = []
  for (let each of allCombs) {
    let symArray = getSymFromComb(each);
    if (checkFreq(symArray, bSym, 3) && checkFreq(symArray, "", 1)) {
      attackCombs.push(each)
    }
  }
  let defenceCoords = []
  for (let each of defenceCombs) {
    for (let element of each) {
      if (getSymFromElem(element) == "") {
        let id = element.id;
        id = id.split("p")
        let coord = [Number(id[1]), Number(id[2])]
        if (board[coord[0]][coord[1] + 1] != "") {
          defenceCoords.push(element)
        }
      }
    }
  }
  let attackCoords = []
  for (let each of attackCombs) {
    for (let element of each) {
      if (getSymFromElem(element) == "") {
        let id = element.id;
        id = id.split("p")
        let coord = [Number(id[1]), Number(id[2])]
        if (board[coord[0]][coord[1] + 1] != "") {
          attackCoords.push(element)
        }
      }
    }
  }
  
  let defenceCombs2 = []
  for (let each of allCombs) {
    let symArray = getSymFromComb(each);
    if (checkFreq(symArray, uSym, 2) && checkFreq(symArray, "", 2)) {
      defenceCombs2.push(each)
    }
  }
  let attackCombs2 = []
  for (let each of allCombs) {
    let symArray = getSymFromComb(each);
    if (checkFreq(symArray, bSym, 2) && checkFreq(symArray, "", 2)) {
      attackCombs2.push(each)
    }
  }
  let defenceCoords2 = []
  for (let each of defenceCombs2) {
    for (let element of each) {
      if (getSymFromElem(element) == "") {
        let id = element.id;
        id = id.split("p")
        let coord = [Number(id[1]), Number(id[2])]
        if (board[coord[0]][coord[1] + 1] != "") {
          defenceCoords2.push(element)
        }
      }
    }
  }
  let attackCoords2 = []
  for (let each of attackCombs2) {
    for (let element of each) {
      if (getSymFromElem(element) == "") {
        let id = element.id;
        id = id.split("p")
        let coord = [Number(id[1]), Number(id[2])]
        if (board[coord[0]][coord[1] + 1] != "") {
          attackCoords2.push(element)
        }
      }
    }
  }
  
  
  
  
  let availableCoords = []
  for (let row of allCombs){
    for (let element of row){
      if (getSymFromElem(element) == ""){
        availableCoords.push(element)
      }
    }
  }
  
  let moveElement;
  
  if (attackCoords.length != 0){
    moveElement = choice(attackCoords)
  }
  else if (defenceCoords.length != 0){
    moveElement = choice(defenceCoords);
  }
  else if (attackCoords2.length != 0){
    moveElement = choice(attackCoords2)
  }
  else if (defenceCoords2.length != 0){
    moveElement = choice(defenceCoords2)
  }
  else{
    moveElement = choice(availableCoords);
  }
  
  
  let colId = String(moveElement.id).split("p")[1];
  document.querySelector(`#end${colId}`).click()
}