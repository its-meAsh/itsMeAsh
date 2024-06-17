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