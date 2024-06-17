const navDiv = document.querySelectorAll(".navOption");
const pages = document.querySelectorAll("#screen>div");
for (let each = 0; each<navDiv.length;each++){
  navDiv[each].addEventListener('click',(e)=>{
    for (let x = 0; x<navDiv.length;x++){
      navDiv[x].style.borderBottomColor = "transparent"
    }
    e.currentTarget.style.borderBottom = "0.5vh solid var(--c2)";
    for (let every of pages){
      every.style.transform = "translate(100%)";
    }
    let id = e.currentTarget.id.split("")
    id.pop()
    id = id.join("");
    document.getElementById(id).style.transform = `translate(0%,-${each*100}%)`;
  })
}
navDiv[0].click()