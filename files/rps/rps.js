const backButton = document.querySelector("#backButton");
backButton.addEventListener('click', () => { location.replace("../../index.html") });

const rockB = document.querySelector("#rock");
const paperB = document.querySelector("#paper");
const scissorsB = document.querySelector("#scissors");

const drawS = document.querySelector("#drawSpan");
const youS = document.querySelector("#youSpan");
const botS = document.querySelector("#botSpan");

const botSays = document.querySelector("#botSays");


var uWin = 0;
var botWin = 0;
var draw = 0;
var result;

const expressions = { 1: "Hah! I'm winning", 2: "Okay Okay, I'll defeat you!", 3: "Seems you have no plan, but I can read your moves!", 4: "Our scores are equal, not for long!", 5: "Not again! Why???", 6: "It's a piece of cake for me now...", 7: " C'mon, I'm getting bored now.", 8: "Ummmmmmm" }
const restartTemplate = document.querySelector("#restartTemplate");

var usedExpression3 = 0;
var usedExpression1 = 0;
var usedExpression6 = 0;
var usedExpression7 = 0;

function offerRestart() {
  restartTemplate.style.display = "block";
}
restartTemplate.addEventListener('click', () => { location.reload() })

function asses(u, b) {
  if (u == b) {
    result = "draw"
  }
  else if (u == 1) {
    if (b == 2) {
      result = "bot";
    }
    else if (b == 3) {
      result = "user";
    }
  }
  else if (u == 2) {
    if (b == 3) {
      result = "bot";
    }
    else if (b == 1) {
      result = "user";
    }
  }
  else if (u == 3) {
    if (b == 1) {
      result = "bot";
    }
    else if (b == 2) {
      result = "user";
    }
  }
  switch (result) {
    case "user":
      uWin++;
      usedExpression3 = 0;
      usedExpression1 = 0;
      break;
    case "bot":
      botWin++;
      break;
    case "draw":
      draw++;
      break;
  }
  drawS.innerHTML = draw;
  youS.innerHTML = uWin;
  botS.innerHTML = botWin;
  
  if (uWin < botWin && uWin + 7 > botWin) {
    botSays.innerHTML = expressions[1]
    usedExpression1++;
    if (usedExpression1 >= 6) {
      botSays.innerHTML = expressions[6]
    }
  } else if (uWin > botWin && botWin != 0) {
    botSays.innerHTML = expressions[2];
  } else if (uWin + 7 < botWin) {
    botSays.innerHTML = expressions[3];
    usedExpression3++;
    if (usedExpression3 >= 6) {
      botSays.innerHTML = expressions[6];
      usedExpression6++;
      if (usedExpression6 >= 6) {
        usedExpression7++;
        botSays.innerHTML = expressions[7];
        if (usedExpression7 >= 6) {
          offerRestart();
        }
      }
    }
  } else if (uWin > botWin + 1 && botWin == 0) {
    botSays.innerHTML = expressions[5]
  } else if (uWin == botWin) {
    botSays.innerHTML = expressions[4];
  } else {
    botSays.innerHTML = expressions[8];
  }

}

function sameArray(a, b) {
  try {
    for (let i = 0; i < a.length; i++) {
      if (a[i] != b[i]) {
        return false;
      }
    }
    return true;
  }
  catch (error) {
    return false;
  }
}

function checkIn(what, where) {
  for (a of where) {
    if (a == what) {
      return true;
      break;
    }
  }
  return false;
}

var userData = [];

function choice(from) {
  return from[Math.floor(Math.random() * (from.length - 0) + 0)];
}

function max(from) {
  let maximum = 0;
  for (each of from) {
    if (each > maximum) {
      maximum = each;
    }
  }
  return maximum;
}

class Datum {
  constructor(value, fx) {
    this.value = value;
    this.fx = fx;
  }
  incrementFx(by) {
    this.fx += by;
  }
}


function model0(data) {
  let asFx = {}
  for (each of data) {
    if (each in asFx) {
      asFx[each]++;
    }
    else {
      asFx[each] = 1;
    }
  }
  let fxes = []
  for (every in asFx) {
    fxes.push(asFx[every]);
  }

  let maximumFx = max(fxes);
  let candidates = []
  for (elem in asFx) {
    if (asFx[elem] == maximumFx) {
      candidates.push(elem);
    }
  }
  return candidates;
}

function model1(data) {
  let lastMoved = data[data.length - 1]
  return [String(lastMoved)]
}

function model2(data) {
  function slice(from, till) {
    let box = [];

    try {
      for (let i = 0; i < from.length; i++) {
        let slice = []
        if (i + till <= from.length) {
          for (let j = i; j < (i + till); j++) {
            slice.push(from[j]);
          }
        }
        if (slice.length > 0) {
          box.push(slice);
        }
      }
    } catch (error) {
      NaN
    }
    return box;
  }
  let container = {}
  for (let a = 1; a < 11; a++) {
    container[a] = slice(data, a);
  }
  let betterContainer = {};
  for (every in container) {
    let dataset = container[every];
    let registered = [];
    let classes = [];
    for (each of dataset) {
      if (checkIn(each, registered)) {
        for (look of classes) {
          if (sameArray(each, look.value)) {
            print("Increment ")
            look.incrementFx(1);
          }
        }
      }
      else {
        registered.push(each);
        let x = new Datum(each, 1);
        classes.push(x);
      }
    }
    betterContainer[every] = classes;
  }
  let modeContainers = []
  for (key in betterContainer) {
    let datas = betterContainer[key]
    let fxesHere = [];
    for (ever of datas) {
      fxesHere.push(ever.fx)
    }
    let maxFxHere = max(fxesHere);
    for (eve of datas) {
      if (eve.fx == maxFxHere) {
        modeContainers.push(eve);
      }
    }
  }
  let whatTheySay = []
  let lastMoved = data[data.length - 1];
  for (looks of modeContainers) {
    for (let index = 0; index<looks.value.length;index++){
      if (lastMoved == looks.value[index-1]) {
        if (looks.value[index+1]!=undefined) {
          whatTheySay.push(looks.value[index+1]);
          break;
        }
        else {
          whatTheySay.push(looks.value[0]);
          break;
        }
      }

    }
  }
  let fxObj = {}
  for (man of whatTheySay){
    if (man in fxObj){
      fxObj[man]++;
    }
    else{
      fxObj[man] = 1;
    }
  }
  let fxObjFx = []
  for (hump in fxObj){
    fxObjFx.push(fxObj[hump])
  }
  let illUse = []
  let maxFxObjFx = max(fxObjFx);
  for (element in fxObj){
    if (fxObj[element] == maxFxObjFx){
      illUse.push(element);
    }
  }
  return illUse;
}

var m0 = 0
var m1 = 0
var m2 = 0;


function thinkBot(data){
  let m0Said = model0(data);
  let m1Said = model1(data);
  let m2Said = model2(data);
  if (m1 > m2 && m1 > m0){
    return choice(m1Said)
  }
  else if (m2 > m0 && m2 > m1){
    return choice(m2Said)
  }
  else if (m0 > m1 && m0 > m2){
    return choice(m0Said);
  }
  else{
    let all = []
    for (each of m0Said){
      all.push(each);
    }
    for (eachh of m1Said){
      all.push(eachh);
    }
    for (eachhh of m2Said){
      all.push(eachhh);
    }
    return choice(all);
  }
    
  
}

function userSend(num) {
  let u = num;
  userData.push(u);
  
  
  let uWill = thinkBot(userData);
  let b;
  if (uWill == 1){
    b = 2;
  }
  else if (uWill == 2){
    b = 3;
  }
  else{
    b = 1;
  }
  asses(u, b);
  let m0Says = model0(userData);
  let m1Says = model1(userData);
  let m2Says = model2(userData);
  if (checkIn(u,m0Says)){
    m0++;
  }
  if (checkIn(u,m1Says)){
    m1++;
  }
  if (checkIn(u,m2Says)){
    m2++;
  }
}

rockB.addEventListener('click', () => { userSend(1) });
paperB.addEventListener('click', () => { userSend(2) });
scissorsB.addEventListener('click', () => { userSend(3) });

