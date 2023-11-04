const backButton = document.querySelector("#backButton");
backButton.addEventListener('click', () => { location.replace("../../index.html") });

const coin = document.querySelector('#coin');
const outcomeS = document.querySelector("#outcome");

const probOfHeadS = document.querySelector("#probOfHeads");
const probOfTailS = document.querySelector("#probOfTails");

const prevOutcomeS = document.querySelector("#prevOutcome");
const modeS = document.querySelector("#mode");

var outcomes = [];
var prevOutcome = "None";

coin.addEventListener('click',()=>{
	prevOutcomeS.innerHTML = prevOutcome;
	outcomeS.innerHTML = "";
	coin.style.transform = "perspective(100vh) rotateX(360deg) rotateY(360deg) rotateZ(360deg)"
	let outcome = Math.floor(Math.random()*(2-0)+0);
	outcomes.push(outcome);
	
	switch (outcome){
		case 0:
			outcomeS.innerHTML = "Heads";
			prevOutcome = "Heads";
			break;
		case 1:
			outcomeS.innerHTML = "Tails";
			prevOutcome = "Tails";
			break;
	}
	function countFor(array,element){
		let times = 0;
		for (each of array){
			if (each == element){
				times++;
			}
		}
		return times;
	}
	
	let headsOccur = countFor(outcomes,0);
	let tailsOccur = countFor(outcomes,1);
	
	if (headsOccur > tailsOccur){
		modeS.innerHTML = "Heads";
	}
	else if (headsOccur < tailsOccur){
		modeS.innerHTML = "Tails";
	}
	else{
		modeS.innerHTML = "None"
	}
	
	let total = headsOccur + tailsOccur;
	let poh = Math.round((headsOccur/total)*100);
	let pot = Math.round((tailsOccur/total)*100);
	
	probOfHeadS.innerHTML = `${poh}%`;
	probOfTailS.innerHTML = `${pot}%`;
	
	
	setTimeout(()=>{
		coin.style.transform = "perspective(100vh) rotateX(0deg) rotateY(0deg) rotateZ(0deg)"
	},100)
})