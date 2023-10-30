const navHome = document.querySelector("#headerNavLiHome");
const navAbout = document.querySelector("#headerNavLiAbout");
const navWork = document.querySelector("#headerNavLiWork");
const navProject = document.querySelector("#headerNavLiProject");
const navContact = document.querySelector("#headerNavLiContact");

navHome.addEventListener('click', () => { location.href = "#myName" });
navAbout.addEventListener('click', () => { location.href = "#row2" });
navWork.addEventListener('click', () => { location.href = "#row3" });
navProject.addEventListener('click', () => { location.href = "#row4" });
navContact.addEventListener('click', () => { location.href = "#row5" });


const expandB = document.querySelector("#expand");
var opened = false;
const nav = document.querySelector("header nav");
expandB.addEventListener('click',()=>{
	if (opened == false){
		opened = true;
		expandB.innerHTML = `<img src="resource/expandLess.svg" alt="Expand">`
		nav.style.display = "block";
	}
	else if (opened == true) {
		opened = false;
		expandB.innerHTML = `<img src="resource/expandMore.svg" alt="Expand">`
		nav.style.display = "none";
	}
})

