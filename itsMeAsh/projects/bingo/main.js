const screen = document.querySelector("#screen")
const left = document.querySelector("#left")
const right = document.querySelector("#right")
const numDisplay = document.querySelector("#numDisplay")
const winPanel = document.querySelector("#winPanel")
const losePanel = document.querySelector("#losePanel")
const drawPanel = document.querySelector("#drawPanel")

const backHome = document.querySelector("#backHome")
backHome.addEventListener('click', () => { location.replace("../../index.html") });

const playAgainButton = document.querySelectorAll(".playAgainButton");
for (let each of playAgainButton) {
    each.addEventListener('click', () => {
        allBlock = []
        array = []
        for (let i = 1; i <= 25; i++) {
            array.push(i)
        }
        choiceOptions = []
        for (let i = 1; i <= 25; i++) {
            choiceOptions.push(i)
        }
        left.innerHTML = `<div class="sideName">You</div>`
        right.innerHTML = `<div class="sideName">Bot</div>`
        c1 = new Card("forUser")
        left.appendChild(c1.elem)
        c2 = new Card("forBot")
        right.appendChild(c2.elem)
        numDisplay.style.display = "flex"
        screen.style.display = "flex";
        winPanel.style.display = "none"
        losePanel.style.display = "none"
        drawPanel.style.display = "none"
        showNewNumber()
    })
}

class Block {
    constructor(value, clickable) {
        this.value = value;
        this.clickable = clickable
        let elem = document.createElement('div');
        elem.innerHTML = value;
        elem.setAttribute("class", "block");
        elem.addEventListener('click', () => {
            if (!this.clicked && this.clickable && Number(numDisplay.innerHTML) == this.value) {
                elem.style.transform = "scale(1)"
                elem.style.opacity = "0.2";
                this.clicked = true;
                showNewNumber()
            }
        })
        this.elem = elem;
        this.clicked = false;
    }


}

var allBlock = []
var array = []
for (let i = 1; i <= 25; i++) {
    array.push(i)
}
var choiceOptions = []
for (let i = 1; i <= 25; i++) {
    choiceOptions.push(i)
}
class Card {
    constructor(forWhom) {
        this.forWhom = forWhom
        let array = []
        for (let i = 1; i <= 25; i++) {
            array.push(i)
        }
        this.blocks = [[]]
        let elem = document.createElement("div")
        elem.setAttribute("class", "cardDisplay");
        this.elem = elem;
        array = shuffle(array);
        let clickable = true;
        if (forWhom == "forBot") {
            clickable = false
        }
        for (let each of array) {
            let obj = new Block(each, clickable);
            allBlock.push(obj)
            this.elem.appendChild(obj.elem);
            if (this.blocks[this.blocks.length - 1].length == 5) {
                this.blocks.push([])
            }
            this.blocks[this.blocks.length - 1].push(obj)
        }
    }
}

function choice(array) {
    return array[Math.floor(Math.random() * (array.length - 0) + 0)];
}

function shuffle(array) {
    let shuffled = []
    let len = array.length;
    for (let i = 0; i < len; i++) {
        let elem = choice(array)
        shuffled.push(elem)
        array.splice(array.indexOf(elem), 1)
    }
    return shuffled;
}

function moveBot() {
    let field = []
    for (let i = 25; i < 50; i++) {
        field.push(allBlock[i])
    }
    let num = numDisplay.innerHTML;
    for (let each of field) {
        if (each.value == Number(num)) {
            each.elem.style.opacity = "0.2";
            each.clicked = true;
            break;
        }
    }
}

function helpUser() {
    let field = []
    for (let i = 0; i < 25; i++) {
        field.push(allBlock[i])
    }
    let num = numDisplay.innerHTML;
    for (let each of field) {
        if (each.value == Number(num)) {
            each.elem.style.transform = "scale(1.3)"
            break;
        }
    }
}

function getCombs(card) {
    let itsBlocks = card.blocks;
    let combs = []
    // row Wise
    for (let each of itsBlocks) {
        combs.push(each)
    }

    // Column Wise
    for (let colNum = 0; colNum < 5; colNum++) {
        combs.push([])
        for (let each of itsBlocks) {
            combs[combs.length - 1].push(each[colNum])
        }
    }

    // Diagonal Wise
    combs.push([itsBlocks[0][0], itsBlocks[1][1], itsBlocks[2][2], itsBlocks[3][3], itsBlocks[4][4],]);
    combs.push([itsBlocks[0][4], itsBlocks[1][3], itsBlocks[2][2], itsBlocks[3][1], itsBlocks[4][0],]);

    return combs
}


function checkWin(card) {
    let allCombs = getCombs(card);
    let winningComb;
    for (let each of allCombs) {
        let clickCount = 0;
        winningComb = each;
        for (let every of each) {
            if (every.clicked) {
                clickCount++;
            }
        }
        if (clickCount == each.length) {
            return [true,winningComb];
        }
    }
    return [false,undefined];
}

function gameDrawSim() {
    drawPanel.style.display = "flex";
    screen.style.display = "none"
    numDisplay.style.display = "none"
}

function gameLoseSim() {
    losePanel.style.display = "flex";
    screen.style.display = "none";
    numDisplay.style.display = "none"
}

function gameWinSim() {
    winPanel.style.display = "flex";
    screen.style.display = "none"
    numDisplay.style.display = "none"
}

function colorBlocks(blocks){
    for (let each of blocks){
        each.elem.style.backgroundColor = "green";
        each.elem.style.opacity = "1"
    }
}

function showNewNumber() {
    let num = choice(choiceOptions);
    choiceOptions.splice(choiceOptions.indexOf(num), 1)
    numDisplay.innerHTML = num;
    helpUser()
    moveBot()
    let ret1 = checkWin(c1)
    let ret2 = checkWin(c2)

    if (ret1[0] && ret2[0]) {
        colorBlocks(ret1[1])
        colorBlocks(ret2[1])
        setTimeout(() => {
            gameDrawSim()
        },2000)
    }
    else if (ret1[0] && !ret2[0]) {
        colorBlocks(ret1[1])
        setTimeout(() => {
            gameWinSim()
        }, 2000)
    }
    else if (ret2[0] && !ret1[0]) {
        colorBlocks(ret2[1])
        setTimeout(() => {
            gameLoseSim()
        }, 2000)
    }
}



var c1 = new Card("forUser")
left.appendChild(c1.elem)
var c2 = new Card("forBot")
right.appendChild(c2.elem)

showNewNumber()