const backHome = document.querySelector("#backHome")
backHome.addEventListener('click', () => { location.replace("../../index.html") });
const playAgain = document.querySelector("#playAgain")

const screen = document.querySelector("#screen");
const outputDiv = document.querySelector("#outputDiv")

const gates = ["AND", "OR", "NOR", "XOR", "XNOR", "NAND"];
const colorScheme = { "AND": "#9FE4CF", "OR": "#9FA4E4", "NOR": "#A3E49F", "XOR": "#E49FC7", "XNOR": "#8EFF2F", "NAND": "#8D74FF" }

function randint(l, u) {
  return Math.floor(Math.random() * ((u + 1) - l) + l);
}

function choice(array) {
  return array[Math.floor(Math.random() * (array.length))];
}



class Org {
  constructor(indentCount, name) {
    this.iC = indentCount;
    this.name = name
    this.children = []
    if (this.name != "INPUT") {
      this.mainElem = document.createElement('div');
      this.nameEl = document.createElement('div');
      this.nameEl.innerHTML = name;
      this.nameEl.setAttribute('class', 'orgNameEl');
      this.mainElem.setAttribute('class', 'orgMainEl')
      this.childEl = document.createElement('div');
      this.childEl.setAttribute('class', 'childElem')
      this.mainElem.append(this.nameEl, this.childEl);
      this.mainElem.style.backgroundColor = colorScheme[name]
    }
    else {
      this.inputElem = document.createElement('input');
      this.inputElem.setAttribute('class', 'orgInputEl');
      this.inputElem.addEventListener('input', () => {
        checkValues()
        let value = this.inputElem.value;
        if (value == "true") {
          this.inputElem.style.color = "#74ff88";
        }
        else if (value == "false") {
          this.inputElem.style.color = "red";
        }
        else {
          this.inputElem.style.color = "#E2FF7B"
        }
      })
    }
  }

  reproduce(mI, mT) {
    if (this.iC == mI - 1) {
      this.mainElem.setAttribute('class', 'orgInputMainEl');
      for (let i = 0; i < randint(2, mT); i++) {
        let kid = new Org(this.iC + 1, "INPUT");
        this.children.push(kid)
        society[this.iC + 1].push(kid);
        this.mainElem.append(kid.inputElem);
        kid.fx = function() {
          if (kid.inputElem.value == "true"){
            return true;
          }
          else{
            return false
          }
        }
      }
    }
    else {
      for (let i = 0; i < randint(2, mT); i++) {
        let kid = new Org(this.iC + 1, choice(gates));
        this.children.push(kid)
        society[this.iC + 1].push(kid)
        this.childEl.append(kid.mainElem);
        kid.fx = function() {
          let fxAss = undefined;
          switch (kid.name) {
            case "AND":
              fxAss = AND;
              break;
            case "OR":
              fxAss = OR;
              break;
            case "NAND":
              fxAss = NAND;
              break;
            case "NOR":
              fxAss = NOR;
              break;
            case "XOR":
              fxAss = XOR;
              break;
            case "XNOR":
              fxAss = XNOR;
              break;
          }
          kid.assfx = fxAss;
          let usingArr = []
          for (let child of kid.children){
            usingArr.push(child.fx())
          }
          return kid.assfx(usingArr)
        }
      }
    }
  }

}


var society = {}
var leadedBy;


function createHierarchy(i, t) {
  society = {}
  for (let x = 0; x < i + 1; x++) {
    society[x] = []
  }

  let leader = new Org(0, choice(gates));
  society[0].push(leader);
  leader.reproduce(i, t)
  leadedBy = leader;
  leader.fx = function() {
    let fxAss = undefined;
    switch (leader.name) {
      case "AND":
        fxAss = AND;
        break;
      case "OR":
        fxAss = OR;
        break;
      case "NAND":
        fxAss = NAND;
        break;
      case "NOR":
        fxAss = NOR;
        break;
      case "XOR":
        fxAss = XOR;
        break;
      case "XNOR":
        fxAss = XNOR;
        break;
    }
    leader.assfx = fxAss;
    let usingArr = []
    for (let child of leader.children) {
      usingArr.push(child.fx())
    }
    return leader.assfx(usingArr)
  }
  function askToReproduce(parent) {
    if (parent.iC <= i - 2) {
      for (let each of parent.children) {
        each.reproduce(i, t);
        askToReproduce(each)
      }
    }
  }
  askToReproduce(leader)
  screen.append(leader.mainElem)
}


playAgain.addEventListener('click', () => {
  screen.innerHTML = ""
  createHierarchy(randint(2, 3), randint(2, 3));
  outputDiv.innerHTML = "undefined";
  outputDiv.style.color = "#E2FF7B"
})

playAgain.click()

function checkValues() {
  let val = leadedBy.fx()
  outputDiv.innerHTML = val;
  let allInputs = society[Object.keys(society).length - 1];
  for (let each of allInputs) {
    if (each.inputElem.value != "true" && each.inputElem.value != "false") {
      outputDiv.innerHTML = "undefined"
    }
  }
  if (outputDiv.innerHTML == "true"){
    outputDiv.style.color = "#74ff88"
  }
  else if(outputDiv.innerHTML == "false"){
    outputDiv.style.color = "red";
  }
  else{
    outputDiv.style.color = "#E2FF7B"
  }
}

checkValues()