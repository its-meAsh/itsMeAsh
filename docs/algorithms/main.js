const backHome = document.querySelector("#backHome")
backHome.addEventListener('click', () => { location.replace("../../index.html") });


const progressBar = document.querySelector("#progressBar");
const writingArea = document.querySelectorAll(".writingArea")[0];
writingArea.addEventListener('scroll', () => {
  let max = writingArea.scrollHeight;
  let curr = writingArea.scrollTop;
  progressBar.style.height = `${(curr*100)/max}%`
})


const projects = document.querySelectorAll(".projectBox");
for (let x = 0; x < projects.length; x++) {
  projects[x].addEventListener('click', (e) => {
    location.replace(`../../projects/${e.currentTarget.id}/index.html`)
  })
}




class Algorithm {
  constructor(question, example, completed) {
    this.question = question;
    this.example = example;
    this.completed = completed;
    this.element()
  }
  element() {
    let element = document.createElement('div');
    let completedCircle = document.createElement('div');
    let textBox = document.createElement('div');
    textBox.innerHTML = this.question + "<br><br>";
    textBox.innerHTML += this.example;
    textBox.setAttribute('class', 'algoText');
    completedCircle.setAttribute('class', 'algoCircle');
    element.setAttribute('class', 'algoBox');
    element.append(completedCircle, textBox)
    if (this.completed) {
      completedCircle.style.backgroundColor = "green"
    }
    this.element = element
  }
}

var algos = [new Algorithm('Create an algorithm to get an array of ordered pair of paranthesis in a text entered by the user. The pair must contain the opening paranthesis index and closing paranthesis index.', "For example: text = '((()()))' then array returned must be [(0,7),(1,6),(2,3),(4,5)].", false), new Algorithm(`You are given an array containing some elements. You have to create a recursive fucntion which returns a hierarchical structure (Dictionary/Object) with these elements randomly. 2 arguments - indentDepth and maxWidth is given, these decide the maximum indentation of the hierarchy and the maximum elements in an indent respectively.`, `For example: arrayGiven = ["a","b","c"]; indentDepth = 2; maxWidth = 3; <br> Output: <br>{"a":{<br>"b":"someValue",<br>"c":{<br>"a":"someValue,<br>"b":"someValue",<br>"c":"someValue"}<br>}<br>}. <br> Explanation: Here the key 'a' has 2 sub keys 'b' and 'c' so thats 1st indent depth then a's 'c' has some values so this is the 2nd indent depth and it has 3 values i.e. the max width. This Object/Dictionary has to be generated randomly where the keys can only be the elements from the given array.`)]


for (let each of algos) {
  writingArea.appendChild(each.element)
}