const backHome = document.querySelector("#backHome")
backHome.addEventListener('click', () => { location.replace("../../index.html") });

function randint(l, u) {
  return Math.floor(Math.random() * (u - l) + l);
}

const drawScoreSpan = document.querySelector("#drawScoreSpan");
const userScoreSpan = document.querySelector("#userScoreSpan");
const botScoreSpan = document.querySelector("#botScoreSpan");
const userMoveSpan = document.querySelector("#userMove");
const botMoveSpan = document.querySelector("#botMove");
const options = document.querySelectorAll("#options>div");

var winBoard = { "user": 0, "bot": 0, "draw": 0 }
var moveTrack = { 0: 0, 1: 0, 2: 0 }

function decide(u, b) {
  let winner, winMove;
  if (u == b){
    winner = "draw";
  }
  else if (u == 0){
    if (b == 1){
      winner = "bot"
    }
    else{
      winner = "user"
    }
  }
  else if (u == 1){
    if (b == 2){
      winner = 'bot'
    }
    else{
      winner = "user";
    }
  }
  else if (u == 2){
    if (b == 0){
      winner = "bot"
    }
    else{
      winner = "user"
    }
  }
  
  winBoard[winner]++;
  moveTrack[u]++;
  
  winMove = u;
  
  
  drawScoreSpan.innerText = winBoard["draw"];
  userScoreSpan.innerText = winBoard["user"];
  botScoreSpan.innerText = winBoard["bot"];

  function setMoveView(elem, num) {
    if (num == 0) {
      elem.innerText = "Rock"
    }
    else if (num == 1) {
      elem.innerText = "Paper"
    }
    else {
      elem.innerText = "Scissor"
    }
  }
  setMoveView(userMoveSpan, u)
  setMoveView(botMoveSpan, b)

  return [winner,winMove]
}


for (let each of options) {
  each.addEventListener('click', (e) => {
    let id = e.currentTarget.id;
    let num = id.split("")[1];

    let array = decide(num, botMove())
    botSetup(array[0], array[1])
    console.log(moveTrack)
  })
}

function botSetup(winner,winMove){
  if (winner == "user"){
    for (let each of Object.keys(moveTrack)){
      moveTrack[each]--;
      moveTrack[winMove]+=2;
    }
  }
  
}

function botMove(){
  let botMove;
  
  if (moveTrack[0] == moveTrack[1] && moveTrack[0] == moveTrack[2]){
    botMove = randint(0,3);
  }
  else{
    maxMove = findMax(moveTrack)
    userMove = maxMove[randint(0,maxMove.length)]
    botMove = findDefense(userMove)
  }
  
  return botMove;
}

function maximum(array){
  let max = 0;
  for (let each of array){
    if (each >= max){
      max = each;
    }
  }
  return max;
}

function findMax(dict){
  let moves = []
  let nums = Object.values(dict);
  let max = maximum(nums);
  for (let each in dict){
    if (dict[each] == max){
      moves.push(each)
    }
  }
  return moves;
}

function findDefense(num){
  if (num == 0){
    return 1;
  }
  else if (num == 1){
    return 2;
  }
  else if (num == 2){
    return 0;
  }
}