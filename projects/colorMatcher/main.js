const qColor = document.querySelector("#qColor");
const aColor = document.querySelector("#aColor");
const qHex = document.querySelector("#qHex");
const aHex = document.querySelector("#aHex");
const rInput = document.querySelector("#rInput");
const gInput = document.querySelector("#gInput");
const bInput = document.querySelector("#bInput");
const check = document.querySelector("#check");
const report = document.querySelector("#report");
const replay = document.querySelector("#replay");
const percentAcc = document.querySelector("#percentAcc");
const colorView = document.querySelector("#colorView");
const backHome = document.querySelector("#backHome");
const hinters = document.querySelectorAll(".hint");
const hintUsedComment = document.querySelector("#hintUsedComment");
const seconds = document.querySelector("#seconds");
const minutes = document.querySelector("#minutes");
const extension = document.querySelector("#extension");
const aInput = document.querySelector("#aInput");

var hintUsed = false;
var r = 127;
var g = 127;
var b = 127;
var a = 255;
var hexCodes = { 0: '0', 1: '1', 2: '2', 3: '3', 4: '4', 5: '5', 6: '6', 7: '7', 8: '8', 9: '9', 10: 'A', 11: 'B', 12: 'C', 13: 'D', 14: 'E', 15: 'F' };
var ques;
var quesRGB;
var interval;
var s = 0;
var extended = false;


extension.addEventListener('click', () => {
  extended = !extended;
  resetGame();
})

for (let each of hinters) {
  each.addEventListener('click', (e) => {
    hintUsed = true
    let id = e.currentTarget.id;
    switch (id) {
      case "r":
        revealValue(true, false, false, false);
        break;
      case "g":
        revealValue(false, true, false, false);
        break;
      case "b":
        revealValue(false, false, true, false);
        break;
      case "a":
        revealValue(false, false, false, true);
        break;

    }
    for (let every of hinters) {
      every.style.display = "none"
    }
  })
}

function revealValue(red, green, blue, opacity) {
  if (red) {
    rInput.value = quesRGB[0];
  }
  if (green) {
    gInput.value = quesRGB[1];
  }
  if (blue) {
    bInput.value = quesRGB[2];
  }
  if (opacity) {
    aInput.value = quesRGB[3];
  }
  r = rInput.value;
  g = gInput.value;
  b = bInput.value;
  a = aInput.value;
  changeColor(r, g, b, a);
}

backHome.addEventListener('click', () => {
  location.replace("../../index.html")
})
rInput.addEventListener('input', () => {
  r = Number(rInput.value);
  changeColor(r, g, b, a)
})

gInput.addEventListener('input', () => {
  g = Number(gInput.value);
  changeColor(r, g, b, a)
})

bInput.addEventListener('input', () => {
  b = Number(bInput.value);
  changeColor(r, g, b, a)
})

aInput.addEventListener('input', () => {
  a = Number(aInput.value);
  changeColor(r, g, b, a)
})


function changeColor(x, y, z, a) {
  aColor.style.backgroundColor = `#${toHex(x, y, z,a)}`;
  aHex.innerText = toHex(x, y, z, a)
}

function toHex(a, b, c, d) {
  function decToHex(num) {
    let hex = "";
    let q = 1;
    let r = 0;
    while (q != 0) {
      q = Math.floor(num / 16);
      r = num % 16;
      hex += hexCodes[r];
      num = q;
    }
    let array = hex.split("");
    if (array.length == 1) {
      array.push("0");
    }
    array.reverse();
    return array.join("");
  }
  let extendedText = decToHex(d);
  if (!extended) {
    extendedText = ""
  }
  let hex = decToHex(a) + decToHex(b) + decToHex(c) + extendedText;
  return hex;
}

function randint(l, u) {
  return Math.floor(Math.random() * (u - l) + l);
}

function generateColor() {
  let r = randint(1, 255);
  let g = randint(1, 255);
  let b = randint(1, 255);
  let a = "";
  if (extended) {
    a = randint(1, 255);
  }
  return [r, g, b, a];
}

function showQuestion() {
  let rgbColor = generateColor();
  quesRGB = rgbColor;
  let randColor = toHex(rgbColor[0], rgbColor[1], rgbColor[2], rgbColor[3]);
  qColor.style.backgroundColor = `#${randColor}`;
  ques = randColor;
  if (extended) {
    qHex.innerText = "????????"
  }
  else {
    qHex.innerText = "??????"
  }
  startTimer()
}

function checkAnswer() {
  let rDiff = Math.abs(r - quesRGB[0])
  let gDiff = Math.abs(g - quesRGB[1])
  let bDiff = Math.abs(b - quesRGB[2])
  let aDiff = Math.abs(b - quesRGB[3]);
  let sumDiff = rDiff + gDiff + bDiff + aDiff;
  let dr = 765;
  if (extended) {
    dr = 920;
  }
  let percent = (sumDiff / dr) * 100;
  qHex.innerText = ques;
  return 100 - percent;
}

function viewReport(percentage) {
  report.style.display = "flex";
  percentAcc.innerText = percentage;
  document.querySelector("#inputs").style.display = "none";
  check.style.display = "none";
  colorView.style.gap = "0vh";
  if (hintUsed) {
    hintUsedComment.innerText = "using a hint."
  }
  else {
    hintUsedComment.innerText = "."
  }
}

check.addEventListener('click', () => {
  clearInterval(interval)
  let p = checkAnswer();
  viewReport(p)
})



function resetGame() {
  hintUsed = false;
  r = 127;
  g = 127;
  b = 127;
  a = 255;
  ques = "";
  quesRGB = []
  s = 0;
  for (let every of hinters) {
    every.style.display = "flex"
  }
  changeColor(r, g, b, a);
  report.style.display = "none";
  document.querySelector("#inputs").style.display = "flex";
  check.style.display = "block";
  colorView.style.gap = "5vh";
  rInput.value = r;
  gInput.value = g;
  bInput.value = b;
  aInput.value = a;
  seconds.innerText = "00";
  minutes.innerText = "00";
  clearInterval(interval);
  if (extended) {
    document.querySelector("#extendedDiv").style.display = "flex";
  }
  else {
    document.querySelector("#extendedDiv").style.display = "none"
  }
  showQuestion()

}


replay.addEventListener('click', () => { resetGame() })



function startTimer() {
  interval = setInterval(() => {
    s++;
    let minute = Math.floor(s / 60);
    let second = s - (minute * 60);

    function addZero(num) {
      let array = String(num).split("");
      if (array.length == 1) {
        array.push("0");
        array.reverse()
      }
      return array.join("")
    }
    seconds.innerText = addZero(second);
    minutes.innerText = addZero(minute);
  }, 1000);
}


resetGame()