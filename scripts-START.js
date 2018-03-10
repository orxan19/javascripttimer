let countdown;
const displayCurrentTimeTable = document.querySelector(".display__time-left");
const displayEndTimeTable = document.querySelector(".display__end-time");
const buttons = document.querySelectorAll(".timer__button");
const form = document.querySelector("form");
const input = form.querySelector("input");

function timer(seconds){
	clearInterval(countdown);
	const now = Date.now();
	const then = now + seconds * 1000;
	displayCurrentTime(seconds);
	displayEndTime(then);

	countdown = setInterval(() => {
		const secondsLeft = Math.round((then - Date.now()) / 1000);
		if(secondsLeft < 0 ){
			clearInterval(countdown);
			return;
		}
		displayCurrentTime(secondsLeft);
	}, 1000)
}

function displayCurrentTime(secondsLeft){
	const minutes = Math.floor(secondsLeft / 60);
	let availableSeconds = secondsLeft % 60;
	if(availableSeconds < 10) {
		availableSeconds =  '0'+ availableSeconds ;
	}
	displayCurrentTimeTable.innerHTML = `${minutes}:${availableSeconds}`;
}

function displayEndTime(then){
	let endTime = new Date(then);
	let hours = endTime.getHours();
	let minutes = endTime.getMinutes();
	if(minutes < 10){
		minutes = "0" + minutes;
	}
	displayEndTimeTable.innerHTML = `Be here at ${hours}:${minutes}`;
}

buttons.forEach(button => button.addEventListener("click", ()=> {
	let buttonAttr = +button.dataset.time;
	timer(buttonAttr);
}));

form.addEventListener("submit", function(e){
	e.preventDefault();
	let inputValue = +(input.value* 60);
	timer(inputValue);
})