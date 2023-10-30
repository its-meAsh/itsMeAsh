const backButton = document.querySelector("#backButton");
backButton.addEventListener('click', () => { location.replace("../../index.html") });

const rockB = document.querySelector("#rock");
const paperB = document.querySelector("#paper");
const scissorsB = document.querySelector("#scissors");

const drawS = document.querySelector("#drawSpan");
const youS = document.querySelector("#youSpan");
const botS = document.querySelector("#botSpan");


var r = 0;
var p = 0;
var s = 0;
var uWin = 0;
var botWin = 0;
var draw = 0;
var result;

function asses(u){
	if (result != "bot"){
		r = 0;
		p = 0;
		s = 0;
	}
	function bot() {
		let bChoice;
		if (r > p && r > s) {
			bChoice = 2;
		}
		else if (p > r && p > s) {
			bChoice = 3;
		}
		else if (s > r && s > p) {
			bChoice = 1;
		}
		else {
			bChoice = Math.floor(Math.random() * (4 - 1) + 1);
		}
		return bChoice;
	}
	b = bot()
	if (u == b){
		result = "draw"
	}
	else if(u == 1){
		if (b == 2){
			result = "bot";
		}
		else if(b == 3){
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
	switch (result){
		case "user":
			uWin++;
			break;
		case "bot":
			botWin++;
			break;
	  case "draw":
	  	draw++;
	  	break;
	}
	
	switch (u){
		case 1:
			r++;
			break;
		case 2:
			p++;
			break;
		case 3:
			s++;
			break;
	}
	drawS.innerHTML = draw;
	youS.innerHTML = uWin;
	botS.innerHTML = botWin;
}



function userSend(num){
	let u = num;
	asses(u)
}

rockB.addEventListener('click',()=>{userSend(1)});
paperB.addEventListener('click',()=>{userSend(2)});
scissorsB.addEventListener('click',()=>{userSend(3)});