const backButton = document.querySelector("#backButton");
backButton.addEventListener('click', () => { location.replace("../../index.html") });

const lvlS = document.querySelector("#currLevelSpan");
const scoreS = document.querySelector("#currScoreSpan");

const container = document.querySelector("#container");
const pieces = Array.from(document.querySelectorAll(".pieceBox img"))

const gameOverPanel = document.querySelector("#gameOver");
const tryAgainButton = document.querySelector("#tryAgainButton");

const winPanel = document.querySelector("#winPanel");
const playAgainButton = document.querySelector("#playAgainButton");
const congratsScoreS = document.querySelector("#congratsScore");

tryAgainButton.addEventListener('click', () => {
	run();
	container.style.display = "flex";
	gameOverPanel.style.display = "none";
	lvlS.style.display = "block"
})

lvlS.addEventListener('click', run);

var currLevel = 1;
var currScore = 0;
var game;
var answer;


function gameOverProgram() {
	container.style.display = "none";
	gameOverPanel.style.display = "flex";
	lvlS.style.display = "none";
}


function updateSpan() {
	lvlS.innerHTML = `Level ${currLevel}`
	scoreS.innerHTML = currScore;
}

function winProgram(){
	lvlS.style.display = "none";
	container.style.display = "none";
	winPanel.style.display = "flex";
	congratsScoreS.innerHTML = currScore;
}

playAgainButton.addEventListener('click',()=>{
	location.reload()
})

function toDoOnClick(e) {
	element = document.querySelector(`#block${e.target.id}`);
	element.style.opacity = "0.2";
	answer = game[0]
	let user = Number(e.target.id);
	if (answer == user) {
		currScore++;
		game.shift();
		updateSpan();
	} else {
		currScore--;
		if (currLevel == 1) { currLevel = 1 } else { currLevel-- };
		updateSpan();
		gameOverProgram();
	}
	if (game.length == 0) {
		currLevel++;
		run()
	}
	if (currLevel == 8){
		winProgram();
	}
}
const arrowToDo = (e) => { toDoOnClick(e) }
for (each of pieces) {
	each.addEventListener('click', arrowToDo)
}

function run() {


	container.style.display = "flex";
	gameOverPanel.style.display = "none";
	lvlS.style.display = "block";

	for (each of pieces) {
		document.querySelector(`#block${Number(each.id)}`).style.opacity = "1";
	}



	var options = [1, 2, 3, 4, 5, 6, 7, 8]


	updateSpan();

	function generate() {
		let template = []
		function choose(array) {
			let num = Math.floor(Math.random() * (array.length - 0) + 0);
			return num
		}
		for (let i = 0; i <= currLevel; i++) {
			choice = choose(options);
			template.push(options[choice])
			options.splice(choice, 1)
		}
		return template;
	}
	game = generate();
	let counterForVisualizer = 0;
	//Visualize 

	let visualizeInterval = setInterval(() => {
		let element = document.querySelector(`#block${game[counterForVisualizer]}`);
		element.style.borderColor = "red";
		element.style.transform = "scale(1.1)";
		if (counterForVisualizer >= game.length - 1) {
			clearInterval(visualizeInterval);
		}
		counterForVisualizer++;
	}, 1000)
	let resetCardsTimeout = setTimeout(() => {
		for (each of game) {
			let element = document.querySelector(`#block${each}`);
			element.style.borderColor = "transparent";
			element.style.transform = "scale(1)"
		}
	}, game.length * 1000 + 500);




};