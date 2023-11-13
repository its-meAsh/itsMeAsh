const backButton = document.querySelector("#backButton");
backButton.addEventListener('click', () => { location.replace("../../index.html") });

const messages = document.querySelector("#messages");
const number = Math.floor(Math.random() * (100 - 1) + 1);

function sendBot(toSend) {
	let format = `<div class="botSent"><img src="resource/bot.svg" alt="Bot">${toSend}</div>`;
	messages.innerHTML += format;
}
sendBot(`Welcome!,<br> so let's start, Okay I have a number in my mind which lies between 1 and 100, can you guess it? Make your first guess.`)

const inputElement = document.querySelector("#inputElement");
const sendButton = document.querySelector("#sendButton");
var tries = 0;
var streak = 0;
sendButton.addEventListener('click', () => {
	let text = inputElement.value;
	messages.innerHTML += `<div class="uSent"><p1>${text}</p1><img src="resource/user.svg" alt="User"></div>`;
	inputElement.value = "";
	tries++;
	run(text);
	
})

function run(val) {
	let guess = Number(val)
	if (guess == number){
		if (tries == 1){
			sendBot("Wow! you guessed it in your first try.");
		}
		else{
			sendBot(`Congratulations! you guessed it right. You took ${tries} tries`)
		}
		streak++;
		sendBot(`Let's try again! btw you're on a streak of ${streak}`);
		tries = 0;
		sendBot("Okay let's start again. Done choosing a number, guess it.")
	}
	else if(guess > 100 || guess < 1){
		sendBot("My chosen number is between 1 and 100.")
	}
	else if(guess > number){
		if (guess - 20 > number){
			sendBot("You're too far from the answer. You chose a higher number btw");
		}
		else{
			sendBot("Hmm, close to it, You chose a higher number btw");
		}
	}
	else if (guess < number){
		if (guess + 20 < number) {
			sendBot("You're too far from the answer. You chose a smaller number btw");
		}
		else {
			sendBot("Hmm, close to it, You chose a smaller number btw");
		}
	}
	else{
		sendBot("Please enter an integer value only. This won't count in a try.")
		tries--;
	}
}