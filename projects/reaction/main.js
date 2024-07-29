const backHome = document.querySelector("#backHome")
backHome.addEventListener('click', () => { location.replace("../../index.html") });

function randint(l,u){
    return Math.floor(Math.random()*(u-l)+l);
}

const ball = document.querySelector("#ball");
const lastRxn = document.querySelector("#lastRxn");

function placeRandomly(){
    let top = randint(15,80);
    let left = randint(7,90);
    ball.style.top = `${top}%`;
    ball.style.left = `${left}%`;
    initDimension-=0.5;
    ball.style.width = `${initDimension}vh`;
    ball.style.height = `${initDimension}vh`
    if (initDimension <= 1){
        initDimension=10;
    }
}

var timer;
var milliseconds = 0;
var initDimension = 10;

function startTimer(){
    timer = setInterval(()=>{
        milliseconds+=10;
    },10);
}

function resetTimer(){
    let time = milliseconds;
    milliseconds = 0;
    return time/1000;
}

ball.addEventListener('click',()=>{
    placeRandomly();
    let time = resetTimer();
    lastRxn.innerText = time;
})


startTimer();