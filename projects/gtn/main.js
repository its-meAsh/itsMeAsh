const backHome = document.querySelector("#backHome")
backHome.addEventListener('click', () => { location.replace("../../index.html") });

const lowerLimit = document.querySelector("#lowerLimit")
const upperLimit = document.querySelector("#upperLimit")
const numberInput = document.querySelector("#numberInput")
const checkButton = document.querySelector("#checkButton")
const hintSpan = document.querySelector("#hintSpan")
const winPanel = document.querySelector("#winPanel")
const playAgain = document.querySelector("#playAgain")
const screen = document.querySelector("#screen")
const finalAttempts = document.querySelector("#finalAttempts")
const attempts = document.querySelector("#attempts")
const guessingProbability = document.querySelector("#guessingProbability")

function randint(l,u){
    return Math.floor(Math.random()*(u-l)+l);
}

var ll;
var ul;
var num;
var attemptsNum = 0;


function generateLimits(){
    ll = randint(1,1000);
    ul = randint(1,1000);
    if (ll > ul){
        let c = ul;
        ul = ll;
        ll = c;
    }
    else if (ll == ul){
        generateLimits()
    }
}

function generateNumber(){
    num = randint(ll,ul);
}

function setQuestion(){
    generateLimits()
    generateNumber()
    lowerLimit.innerText = ll;
    upperLimit.innerText = ul;
}

function checkAnswer(){
    if (numberInput.value == num){
        viewWinPanel();
    }
    else{
        let comment;
        if (numberInput.value == undefined || numberInput.value == ""){
            comment = "We don't treat it as a number."
        }
        else if (numberInput.value < num){
            comment = "Your guessed number is smaller than the real one.";
        }
        else if(numberInput.value > ul || numberInput.value < ll){
            comment = "Your gussed number is out of range."
        }
        else{
            comment = "Your guessed number is greater than the real one."
        }
        hintSpan.innerText = comment;
    }
    finalAttempts.innerText = attemptsNum;
    guessingProbability.innerHTML = 100/(ul-ll+1)
    attemptsNum++;
    attempts.innerText = `Attempt(${attemptsNum})`;
}

function viewWinPanel(){
    screen.style.display = "none";
    winPanel.style.display = "flex";
}

playAgain.addEventListener('click',()=>{location.reload()})
checkButton.addEventListener('click',()=>{checkAnswer()})
setQuestion()