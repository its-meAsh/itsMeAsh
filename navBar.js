const lis = document.querySelectorAll("header li");
for (each of lis){
  each.addEventListener('click',(e)=>{
    let inside = e.currentTarget.innerHTML;
    switch (inside){
      case "Home":
        location.href = "#header";
        break;
        
      case "About":
        location.href = "#row2";
        break;
        
      case "My work":
        location.href = "#row3";
        break;
        
      case "My projects":
        location.href = "#row4";
        break;
        
      case "My docs":
        location.href = "#row5";
        break;
        
      case "Contact me":
        location.href = "#footers1";
        break;
    }
  })
}

const arrow = document.querySelector("#h2s3");
const rNav = document.querySelector("#navBarResponsive");
var open = false;
arrow.addEventListener('click',()=>{
  if (open == false){
    open = true;
    arrow.style.transform = "rotate(180deg)"
    navBarResponsive.style.display = "flex";
  }
  else{
    open = false;
    arrow.style.transform = "rotate(360deg)"
    navBarResponsive.style.display = "none";
  }
})