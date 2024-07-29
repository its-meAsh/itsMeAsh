const jobName = document.querySelector("#jobName");
const job = ["Programmer","Web Developer","Math Freak","Web Designer"];
const color = ["#30D2C5","#B7FFD8","#ABCDEF","#FFD7D7"];
var count = 0;
jobName.style.color = "#131316"
let interval = setInterval(()=>{
  jobName.innerText = job[count];
  jobName.style.color = color[count];
  let timeout = setTimeout(()=>{
    count++;
    jobName.style.color = "var(--c1)"
    if (count >= job.length){
      count = 0;
    }
  },1000)
},2000)

var spinTime = 20;
const img = document.querySelector("#imageHome>img");
img.addEventListener('click',()=>{
  spinTime-=0.1;
  if (spinTime <= 0){
    spinTime = 20;
  }
  img.style.animation = `spin ${spinTime}s infinite linear`
})

const redirect = document.querySelector("#redirect");
var redirAnim = false;
redirect.addEventListener('mouseover', () => {
  if (!redirAnim) {
    redirAnim = true;
    redirect.style.animation = "createBorders 1s linear 1"
    setTimeout(() => { redirAnim = !redirAnim; redirect.style.animation = "" }, 1000)
  }
})
redirect.addEventListener('click', () => { location.replace("https://its-meash.github.io/itsMeAshAgain/") })
