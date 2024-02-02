const backButton = document.querySelector("#backButton");
backButton.addEventListener('click', () => { location.replace("../../index.html") });

const gameOverPanel = document.querySelector("#gameOver");
const tryAgainButton = document.querySelector("#tryAgainButton");

const winPanel = document.querySelector("#winPanel");
const playAgainButton = document.querySelector("#playAgainButton");

const displaySpan = document.querySelector("#numberDisplay");
const levelSpan = document.querySelector("#levelSpan");
const submitButton = document.querySelector("#submitButton");
const inputE = document.querySelector("#inputElement");
const row2 = document.querySelector("#row2");

var lvl = 1;
var num;
var gameRunning = false;

function run() {
	levelSpan.innerHTML = String(lvl);
	function makeNumber() {
		let n = "";
		for (let i = 1; i <= lvl; i++) {
			n += String(Math.floor(Math.random() * (9 - 0) + 0));
		}
		return n;
	}
  
	num = makeNumber();
	let array = num.split("");
	let interval = setInterval(() => {
		displaySpan.innerHTML += array.shift();
		if (array.length == 0) {
			clearInterval(interval);
		}
		inputE.style.display = "none"
	}, 750);
	let hideTimeout = setTimeout(() => {
		displaySpan.innerHTML = "Hope you remember the number";
		inputE.style.display = "block";
	}, (lvl + 1) * 750)
}
displaySpan.addEventListener('click', () => {
  if (gameRunning == false){
	displaySpan.innerHTML = "";
	run();
	gameRunning = true;}
})

submitButton.addEventListener('click', () => {
	let ans = inputE.value;
	if (gameRunning == true){
	if (ans == num) {
		runWinProgram();
	}
	else {
		runLostProgram();
	}}
	
});

function runWinProgram() {
	lvl++;
	if (lvl != 10) {
		displaySpan.innerHTML = "Correct!";
		setTimeout(() => {
			displaySpan.innerHTML = "";
			run()
		}, 1000);
		inputE.value = "";
	}
	else if (lvl == 10) {
		row2.style.display = "none";
		winPanel.style.display = "flex";
	}
}

function runLostProgram() {
	row2.style.display = "none";
	if (lvl != 1) {
		lvl--;
	}
	gameOverPanel.style.display = "flex";
};

tryAgainButton.addEventListener('click', () => {
	row2.style.display = "flex";
	gameOverPanel.style.display = "none";
	inputE.value = "";
	displaySpan.innerHTML = "";
	run();
});

playAgainButton.addEventListener('click', () => {
	winPanel.style.display = "none";
	row2.style.display = "flex";
	setTimeout(() => {
		displaySpan.innerHTML = "";
		run()
	}, 1000);
	inputE.value = "";
})