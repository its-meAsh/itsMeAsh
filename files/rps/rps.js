const backButton = document.querySelector("#backButton");
backButton.addEventListener('click', () => { location.replace("../../index.html") });

const rockB = document.querySelector("#rock");
const paperB = document.querySelector("#paper");
const scissorsB = document.querySelector("#scissors");

const drawS = document.querySelector("#drawSpan");
const youS = document.querySelector("#youSpan");
const botS = document.querySelector("#botSpan");

const botSays = document.querySelector("#botSays");

var r = 0;
var p = 0;
var s = 0;
var uWin = 0;
var botWin = 0;
var draw = 0;
var result;

const expressions = {1:"Hah! I'm winning",2:"Okay Okay, I'll defeat you!",3:"Seems you have no plan, but I can read your moves!",4:"Our scores are equal, not for long!",5:"Not again! Why???",6:"It's a piece of cake for me now...",7:" C'mon, I'm getting bored now.",8:"Ummmmmmm"}
const restartTemplate = document.querySelector("#restartTemplate");

var usedExpression3 = 0;
var usedExpression1 = 0;
var usedExpression6 = 0;
var usedExpression7 = 0;

function offerRestart(){
	restartTemplate.style.display = "block";
}
restartTemplate.addEventListener('click',()=>{location.reload()})

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
	if (uWin < botWin && uWin + 7 > botWin){
		botSays.innerHTML = expressions[1]
		usedExpression1++;
		if (usedExpression1 >= 6) {
			botSays.innerHTML = expressions[6]
		}
	}else if (uWin > botWin && botWin != 0){
		botSays.innerHTML = expressions[2];
	}else if (uWin + 7 < botWin){
		botSays.innerHTML = expressions[3];
		usedExpression3++;
		if (usedExpression3 >= 6) {
			botSays.innerHTML = expressions[6];
			usedExpression6++;
			if (usedExpression6 >= 6){
				usedExpression7++;
				botSays.innerHTML = expressions[7];
				if (usedExpression7 >= 6){
					offerRestart();
				}
			}
		}
	}else if(uWin > botWin+1 && botWin == 0){
		botSays.innerHTML = expressions[5]
	}else if(uWin == botWin){
		botSays.innerHTML = expressions[4];
	}else{
		botSays.innerHTML = expressions[8];
	}
	
}



function userSend(num){
	let u = num;
	asses(u)
}

rockB.addEventListener('click',()=>{userSend(1)});
paperB.addEventListener('click',()=>{userSend(2)});
scissorsB.addEventListener('click',()=>{userSend(3)});