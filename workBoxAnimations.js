const workBoxes = document.querySelectorAll(".workBox");
var w1 = w2 = w3 = 0;
var w1Motion = w2Motion = w3Motion = false;
var ids = { "w1": [w1, w1Motion], "w2": [w2, w2Motion], "w3": [w3, w3Motion] };
for (each of workBoxes) {
  each.addEventListener('mouseover', (e) => {
    let id = e.currentTarget.id;
    if (!ids[id][1]) {
      ids[id][0]++;
    }
    if (ids[id][0] > 2) {
      document.querySelector(`#${id}`).style.animation = "fallBreakReturn 5s 1";
      ids[id][1] = true;
      setTimeout(()=>{
        ids[id][1] = false;
        document.querySelector(`#${id}`).style.animation = "";
        ids[id][0] = 0;
      },5000);
    } else{
      document.querySelector(`#${id}`).style.animation = "glitchRotate 2s 1";
      ids[id][1] = true;
      setTimeout(() => {
        ids[id][1] = false;
        document.querySelector(`#${id}`).style.animation = "";
      }, 2000);
    }
  });
};