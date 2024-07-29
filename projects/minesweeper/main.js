function randint(u, l) {
    return Math.floor(Math.random() * (u - l) + l);
}

function choice(array) {
    return array[randint(0, array.length)]
}

function find(array, x, y) {
    if (array.length == 0) {
        return false;
    }
    for (each of array) {
        if (each[0] == x && each[1] == y) {
            return true;
        }
    }
    return false;
}

var flagCount;

class Board {
    constructor(size, mines) {
        this.size = size;
        this.mines = mines;
        this.board = this.makeBoard();
    }

    makeBoard() {
        let a = this.size[0];
        let b = this.size[1];

        let board = [];
        let allCoord = [];
        for (let i = 0; i < a; i++) {
            board.push([]);
            for (let j = 0; j < b; j++) {
                board[i].push([0]);
                allCoord.push([i, j])
            }
        }

        let minesCoord = this.generateMines(allCoord);
        for (let mineC of minesCoord) {
            board[mineC[0]][mineC[1]][0] = "M"
        }
        for (let each of minesCoord) {
            let adj = this.getAdjacent(each[0], each[1]);
            for (let each2 of adj) {
                if (!this.isMine(minesCoord, each2[0], each2[1])) {
                    board[each2[0]][each2[1]][0]++;
                }
            }
        }
        return board;
    }

    getAdjacent(i, j) {
        let a = this.size[0] - 1;
        let b = this.size[1] - 1;

        let adj = [];
        if (true) {
            if (j - 1 >= 0) {
                adj.push([i, j - 1]);
            }
            if (j + 1 <= b) {
                adj.push([i, j + 1]);
            }
        }
        if (i - 1 >= 0) {
            adj.push([i - 1, j]);
            if (j - 1 >= 0) {
                adj.push([i - 1, j - 1]);
            }
            if (j + 1 <= b) {
                adj.push([i - 1, j + 1]);
            }
        }
        if (i + 1 <= a) {
            adj.push([i + 1, j]);
            if (j - 1 >= 0) {
                adj.push([i + 1, j - 1]);
            }
            if (j + 1 <= b) {
                adj.push([i + 1, j + 1]);
            }
        }
        return adj;
    }

    isMine(mineArray, x, y) {
        if (mineArray.length == 0) {
            return false;
        }
        for (let each of mineArray) {
            if (each[0] == x && each[1] == y) {
                return true
            }
        }
        return false;
    }

    generateMines(all) {
        let copy = [];
        for (let each of all) {
            copy.push(each);
        }
        let coords = [];
        for (let z = 0; z < this.mines; z++) {
            let elem = choice(copy)
            copy.splice(copy.indexOf(elem), 1);
            coords.push(elem)
        }
        return coords
    }
}

class Box {
    constructor(coord, inside, elem) {
        this.coord = coord;
        this.text = inside;
        this.elem = elem;
        this.flagged = false;
        this.viewed = false;
    }
    getFlag() {
        if (this.flagged) {
            this.flagged = !this.flagged;
            return "white";
        }
        else {
            this.flagged = !this.flagged;
            return "red"
        }
    }
}

class Event{
    constructor(boxClicked,result,player){
        this.boxClicked = boxClicked;
        this.result = result;
        this.player = player;
    }
}

const screen = document.querySelector("#screen");
const flagsSpan = document.querySelector("#flagSpan");
const lostPanel = document.querySelector("#lostPanel");
const wonPanel = document.querySelector("#wonPanel");
var a;
var boxes = [];
const colors = { 0: "#00d9ff", 1: "#ffcd8b", 2: "#829ffd", 3: "#30d2c5", 4: "#fa81be", 5: "#00bfff", 6: "#fd7777", 7: "#8a8a8a", 8: "#ffffff" };
var clicked = 0;
var interval;
var seconds = 0;
const minutesSpan = document.querySelector("#minutesSpan");
const secondsSpan = document.querySelector("#secondsSpan");

const minS = document.querySelector("#minS");
const secS = document.querySelector("#secS");

var events = [];

function renderScreen(array) {
    screen.innerHTML = "";
    let count = 0;
    for (let p = 0; p < array.length; p++) {
        boxes.push([])
        for (let q = 0; q < array[p].length; q++) {
            count++;
            let each = array[p][q];
            let elem = document.createElement("div");
            elem.setAttribute("class", `block${each[0]}`);
            elem.setAttribute("id", `p${p}p${q}p`);
            elem.innerHTML = each[0];
            screen.appendChild(elem);
            let instance = new Box([p, q], each, elem);
            boxes[p].push(instance);
            elem.addEventListener('mouseup', (e) => {
                clicked++;
                startTimer();
                if (e.button == 0) {
                    let x = p;
                    let y = q;
                    if (!instance.flagged) {
                        boxes[p][q].viewed = true;
                        let ret = reveal(x, y);
                        if (!ret) {
                            instance.viewed = false;
                            elem.innerHTML = "M";
                            let endTime = stopTimer()
                            gameLost(elem, endTime);
                        }
                        else {
                            hideBoard();
                            let o = checkWon();
                            if (o) {
                                let endTime = stopTimer()
                                gameWon(elem, endTime);
                            }
                        }
                        events.push(new Event([x,y],ret,"user"));
                    }
                }
                else if (e.button == 1) {
                    instance.elem.style.backgroundColor = instance.getFlag();
                    let o = instance.flagged;
                    if (o) {
                        flagCount--;
                    }
                    else {
                        flagCount++;
                    }
                    flagsSpan.innerHTML = flagCount;
                }
            })
        }
    }
    let th = "";
    let tw = "";

    for (let i = 0; i < array.length; i++) {
        th += "1fr ";
    }
    for (let j = 0; j < array[0].length; j++) {
        tw += "1fr "
    }

    screen.style.gridTemplateColumns = tw;
    screen.style.gridTemplateRows = th;
}

var viewed = [];

function gameLost(elem, eta) {
    elem.style.animation = "explode 2s 1 linear";

    setTimeout(() => {
        document.querySelector("header").style.display = "none";
        screen.style.display = "none";
        lostPanel.style.display = 'flex';
        cnh.style.display = "none"
        cnhpanel.style.display = "none";
        document.querySelector("main").style.display = "none"
    }, 2000);
}

function checkWon() {
    let count = 0;
    for (let row of boxes) {
        for (let element of row) {
            if (element.text != "M" && element.viewed) {
                count++;
            }
        }
    }
    if (count + a.mines == boxes.length * boxes[0].length) {
        return true;
    }
    else { return false }
}

function gameWon(elem, eta) {
    elem.style.animation = "winning 2s 1 linear";
    function addZero(to) {
        let array = String(to).split("");
        if (array.length == 1) {
            array.push("0");
            array.reverse();
        }
        let text = array.join("");
        return text;
    }

    let minutes = Math.floor(seconds / 60);
    let sec = seconds - (minutes * 60);
    minS.innerHTML = addZero(minutes);
    secS.innerHTML = addZero(sec)
    setTimeout(() => {
        document.querySelector("header").style.display = "none";
        screen.style.display = "none";
        wonPanel.style.display = 'flex';
        cnh.style.display = "none"
        cnhpanel.style.display = "none";
        document.querySelector("main").style.display = "none"
    }, 2000);
}

function startTimer() {
    if (clicked == 1) {
        interval = setInterval(() => {
            seconds++;
            function addZero(to) {
                let array = String(to).split("");
                if (array.length == 1) {
                    array.push("0");
                    array.reverse();
                }
                let text = array.join("");
                return text;
            }

            let minutes = Math.floor(seconds / 60);
            let sec = seconds - (minutes * 60);
            minutesSpan.innerHTML = addZero(minutes);
            secondsSpan.innerHTML = addZero(sec)

        }, 1000)
    }
}

function stopTimer() {
    clearInterval(interval);
    return seconds;
}

function hideBoard() {
    for (let row of boxes) {
        for (let element of row) {
            let elem = element.elem;
            let text = "?";
            if (element.viewed) {
                text = element.text;
                elem.style.backgroundColor = colors[text];
                if (text == 0) {
                    elem.style.color = colors[text]
                }
            }
            else {
                if (element.flagged) {
                    elem.style.backgroundColor = "red";
                }
                else {
                    elem.style.backgroundColor = "white";
                    elem.style.color = "white"
                }
            }
            elem.innerHTML = text;
        }
    }
}

function makeBoard(x, y) {
    boxes = [];
    let minesNum = Math.floor((x * y) / 8);
    flagCount = minesNum;
    a = new Board([x, y], minesNum);
    flagsSpan.innerHTML = minesNum;
    renderScreen(a.board);
}

function reveal(x, y) {
    let element = boxes[x][y];
    if (element.text == "M") {
        return false
    }
    else {
        let adjZero = [];
        if (element.text == 0) {
            let adj = a.getAdjacent(x, y);
            for (let each of adj) {
                let elem2 = boxes[each[0]][each[1]]
                if (elem2.text == 0 && !elem2.viewed) {
                    adjZero.push(each)
                }

                elem2.viewed = true;
            }
        }

        for (let each2 of adjZero) {
            reveal(each2[0], each2[1])
        }
        return true;
    }
}

makeBoard(11, 25)
hideBoard()