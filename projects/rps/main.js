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

var r = 0;
var p = 0;
var s = 0;
var uWin = 0;
var bWin = 0;
var draw = 0;

function botMove(){
    let bTurn;
    if (r > p && r > s && r>2){
        bTurn = 1;
    }
    else if (p > r && p > s && p>2){
        bTurn = 2;
    }
    else if (s > p && s > r && s>2){
        bTurn = 0;
    }
    else{
        bTurn = randint(0,2);
    }
    return bTurn;
}

function decide(u,b){
    let winner;
    let wMove;
    if (u == b){
        draw++;
        winner = undefined;
        wMove = undefined;
    }
    if (u == 0){
        if (b == 1){
            bWin++;
            winner = "bot";
            wMove = 1;
        }
        else{
            uWin++;
            winner = "user";
            wMove = 0;
        }
    }
    else if (u == 1){
        if (b == 2){
            bWin++;
            winner = "bot";
            wMove = 2;
        }
        else{
            uWin++;
            winner = "user";
            wMove = 1
        }
    }
    else if (u == 2){
        if (b == 0){
            bWin++;
            winner = "bot";
            wMove = 0;
        }
        else{
            uWin++;
            winner = "user";
            wMove = 2;
        }
    }
    drawScoreSpan.innerText = draw;
    userScoreSpan.innerText = uWin;
    botScoreSpan.innerText = bWin;

    function setMoveView(elem,num){
        if (num == 0){
            elem.innerText = "Rock"
        }
        else if (num == 1){
            elem.innerText = "Paper"
        }
        else{
            elem.innerText = "Scissor"
        }
    }
    setMoveView(userMoveSpan,u)
    setMoveView(botMoveSpan,b)

    return [winner,wMove,u]
}

function botSetup(winnerWas,winMove,u){
    if (u == 1){
        p++;
    }
    else if ( u == 2){
        s++;
    }
    else{
        r++;
    }
}

for (let each of options){
    each.addEventListener('click',(e)=>{
        let id = e.currentTarget.id;
        let num = id.split("")[1];

        let array = decide(num,botMove())
        botSetup(array[0],array[1],array[2])
    })
}