class LogicGate {
  buffer(input1) {
    return input1;
  }
  or(input1, input2) {
    if (input1 || input2) {
      return true;
    }
    else {
      return false;
    }
  }

  and(input1, input2) {
    if (input1 && input2) {
      return true;
    }
    else {
      return false;
    }
  }

  xor(input1, input2) {
    if ((input1 && !input2) || (!input1 && input2)) {
      return true;
    }
    else {
      return false;
    }
  }

  not(input1) {
    return !input1;
  }

  nand(input1, input2) {
    if (input1 && input2) {
      return !true;
    }
    else {
      return !false;
    }
  }

  nor(input1, input2) {
    if (input1 || input2) {
      return !true;
    }
    else {
      return !false;
    }
  }

  xnor(input1, input2) {
    if ((input1 && !input2) || (!input1 && input2)) {
      return !true;
    }
    else {
      return !false;
    }
  }
}

class Box {
  constructor(logicGate, i1, i2) {
    this.gate = logicGate;
    this.input1 = i1;
    this.input2 = i2;
    this.value = logicGate(i1, i2);
  }
}

function chooseFunction(from) {
  let number = Math.floor(Math.random() * (7 - 1) + 1);
  switch (number) {
    case 1:
      return from.or;
      break;

    case 2:
      return from.and;
      break;

    case 3:
      return from.xor;
      break;

    case 4:
      return from.nor;
      break;

    case 5:
      return from.nand;
      break;

    case 6:
      return from.xnor;
      break;
  }
}

function chooseBool() {
  let number = Math.floor(Math.random() * (3 - 1) + 1);
  switch (number) {
    case 1:
      return true;
      break;

    case 2:
      return false;
      break;
  }
}

function clearOrNot(from) {
  let number = Math.floor(Math.random() * (3 - 1) + 1);
  switch (number) {
    case 1:
      return from.buffer;
      break;

    case 2:
      return from.not;
      break;
  }
}

function makeQuestion(from) {
  let i1, i2, i3, i4, l1, l2, l3, l4, o1, o2, o3, o4;
  i1 = chooseBool();
  i2 = chooseBool();
  i3 = chooseBool();
  i4 = chooseBool();
  l1 = chooseFunction(from);
  l2 = chooseFunction(from);
  l3 = chooseFunction(from);
  l4 = clearOrNot(from);
  o1 = l1(i1, i2);
  o2 = l2(i3, i4);
  o3 = l3(o1, o2);
  o4 = l4(o3);
  return [i1, i2, i3, i4, l1, l2, l3, l4, o1, o2, o3, o4];
}

function showQuestion(array) {
  let i1 = array[0];
  let i2 = array[1];
  let i3 = array[2];
  let i4 = array[3];
  let l1 = array[4];
  let l2 = array[5];
  let l3 = array[6];
  let l4 = array[7];
  let o1 = array[8];
  let o2 = array[9];
  let o3 = array[9];
  let o4 = array[11];
  
  let logics = [l1,l2,l3,l4];
  for (each in logics){
    let elem = document.querySelector(`#l${Number(each)+1}`);
    let color = fxColor[logics[each].name];
    elem.style.backgroundColor = color;
    document.querySelector(`#l${Number(each)+1}Name`).innerHTML = logics[each].name.toUpperCase();
  }
  return [l1,l2,l3,l4];
}

function truthTable(fx) {
  if (fx.name == "not" || fx.name == "buffer") {
    let string = "<tr><th>Input</th><th>Output</th></tr>"
    let inputs = [true, false];
    let outputs = [];
    for (let each of inputs) {
      outputs.push(fx(each));
    }
    for (let i = 0; i < outputs.length; i++) {
      string += `<tr><td>${inputs[i]}</td><td>${outputs[i]}</td></tr>`;
    }
    let text = `<table>${string}</table>`;
    return text;
  }
  else {
    let string = "<tr><th>Input 1</th><th>Input 2</th><th>Output</th></tr>"
    let inputs = [[true, false], [true, true], [false, true], [false, false]];
    let outputs = []
    for (each of inputs) {
      outputs.push(fx(each[0], each[1]));
    }
    for (let i = 0; i < outputs.length; i++) {
      string += `<tr><td>${inputs[i][0]}</td><td>${inputs[i][1]}</td><td>${outputs[i]}</td></tr>`;
    }
    let text = `<table>${string}</table>`;
    return text;
  }
}

var a = new LogicGate();
var truthTables = document.querySelectorAll(".boxt");
for (each of truthTables){

  let func = each.id;
  let fx;
  switch (func){
    case "or":
      fx = a.or;
      break;
      
    case "and":
      fx = a.and;
      break;
      
    case "nor":
      fx = a.nor;
      break;
      
    case "nand":
      fx = a.nand;
      break;
      
    case "xnor":
      fx = a.xnor;
      break;
      
    case "not":
      fx = a.not;
      break;
      
    case "buffer":
      fx = a.buffer;
      break;
      
    case "xor":
      fx = a.xor;
      break;
  }
  
  let text = truthTable(fx);
  document.querySelector(`#${func}`).innerHTML = text;
}

let tds = document.querySelectorAll("td");
for (every of tds){
  if (every.innerHTML == "true"){
    every.style.backgroundColor = "#A7FFB7"
  }
  else{
    every.style.backgroundColor = "#FFA1A1"
  }
}


var fxColor = {
  "or":"#73E0FF",
  "not":"#FF7373",
  "and":"#73FF8C",
  "xor":"#73FFF1",
  "nand":"#A873FF",
  "xnor":"#FFCA73",
  "nor":"#FF73E0",
  "buffer":"#00FFD2"
}

let qd = makeQuestion(a);
var question = showQuestion(qd)
function displayMessage(text,color){
  document.querySelector("#mb").innerHTML = text;
  document.querySelector("#mb").style.backgroundColor = color;
}

var iBoxes = [];
for (let p=1;p<=4;p++){
  iBoxes.push(document.querySelector(`#i${p}In`));
}

function isThere(what,where){
  for (each of where){
    if (each == what){
      return true;
    }
  }
  return false;
}

function makeBoolean(input){
  if (input == "true"){
    return true;
  }
  else{
    return false;
  }
}

function checkForTrueOfHome(l1,l2,l3,l4) {
  let answerDiv = document.querySelector("#answerValue");
  let i1 = iBoxes[0].value;
  let i2 = iBoxes[1].value;
  let i3 = iBoxes[2].value;
  let i4 = iBoxes[3].value;
  let allowed = ["true","false"];
  if (!(isThere(i1,allowed)) || !(isThere(i2,allowed)) || !(isThere(i3,allowed)) || !(isThere(i4,allowed))){
    displayMessage("Input values must be either true or false","#93A42F");
  }
  else{
    let o1 = l1(makeBoolean(i1),makeBoolean(i2));
    let o2 = l2(makeBoolean(i3),makeBoolean(i4));
    let o3 = l3(o1,o2);
    let o4 = l4(o3);
    if (o4){
      answerDiv.innerHTML = "true";
      answerDiv.style.color = "#A7FFB7";
      displayMessage("Well done!","#A7FFB7")
      setTimeout(()=>{
      location.replace("https://its-meash.github.io/itsMeAsh/");},5000)
    }
    else{
      answerDiv.innerHTML = "false";
      answerDiv.style.color = "#FFA1A1";
      displayMessage("Make the output true","#FFA1A1")
    }
  }
}

for (y of iBoxes){
  y.addEventListener('input',(e)=>{
    let elem = document.querySelector(`#${e.currentTarget.id}`);
    if (elem.value == "true"){
      elem.style.color = "#A7FFB7";
    }
    else if (elem.value == "false"){
      elem.style.color = "#FFA1A1";
    }
    else{
      elem.style.color = "#93A42F";
    }
    checkForTrueOfHome(question[0],question[1],question[2],question[3]);
  })
}