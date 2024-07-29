const widthInput = document.querySelector("#widthInput");
const heightInput = document.querySelector("#heightInput");
const backHome = document.querySelector("#backHome");

backHome.addEventListener('click', () => {
    location.replace("../../index.html")
})


widthInput.addEventListener('input', () => {
    if (widthInput.value > 11 || widthInput.value < 2) {
        alert("Board height must be between 2 to 11");
        widthInput.value = 5;
    }
    makeBoard(widthInput.value, heightInput.value);
    hideBoard()
})
heightInput.addEventListener('input', () => {
    if (heightInput.value > 27 || heightInput.value < 2) {
        alert("Board width must be between 2 to 27");
        heightInput.value = 5;
    }
    makeBoard(widthInput.value, heightInput.value)
    hideBoard()
})

const cnh = document.querySelector("#controlsAndHelp");
const cnhpanel = document.querySelector("#controlsAndHelpPanel");
var viewHelp = true;
cnh.addEventListener('click', () => {
    if (viewHelp) {
        cnhpanel.style.display = "flex";
        cnhpanel.style.transform = "translate(0%)"
    }
    else {
        cnhpanel.style.display = "flex";
        cnhpanel.style.transform = "translate(100%)"
    }
    viewHelp = !viewHelp
})

const d2 = document.querySelector("#d2");
d2.addEventListener('click', () => { location.reload() })

const w2 = document.querySelector("#w2");
w2.addEventListener('click', () => { location.reload() })
