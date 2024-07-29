const backHome = document.querySelector("#backHome")
backHome.addEventListener('click', () => { location.replace("../../index.html") });

const progressBar = document.querySelector("#progressBar");
const writingArea = document.querySelectorAll(".writingArea")[0];
writingArea.addEventListener('scroll',()=>{
  let max = writingArea.scrollHeight;
  let curr = writingArea.scrollTop;
  progressBar.style.height = `${(curr*100)/max}%`
})


const projects = document.querySelectorAll(".projectBox");
for (let x = 0; x<projects.length;x++){
  projects[x].addEventListener('click',(e)=>{
    location.replace(`../../projects/${e.currentTarget.id}/index.html`)
  })
}
