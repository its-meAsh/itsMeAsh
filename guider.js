const guider = document.querySelector("#guider");
const closeGuider = document.querySelector("#closeGuider");
const guiderScreen = document.querySelector("#guiderScreen");
const chats = document.querySelector('#chats')
var guiderOpen = false;


function toggleGuider() {
  if (guiderOpen) {
    guiderScreen.style.transform = "translate(0,120%)";
    guider.style.display = "flex";
  }
  else {
    guiderScreen.style.transform = "translate(0,0)";
    guider.style.display = "none"
  }
  guiderOpen = !guiderOpen
}
guider.addEventListener('click', () => { toggleGuider() })
closeGuider.addEventListener('click', () => { toggleGuider() })


class Option {
  constructor(text, func, expire = false) {
    this.text = text;
    this.func = func;
    this.clickCount = 0;
    this.elem = document.createElement('div');
    this.elem.innerText = this.text;
    this.elem.setAttribute('class', 'option')
    if (expire) {
      this.elem.addEventListener('click', () => {
        this.clickCount++;
        if (this.clickCount <= 1) {
          this.func()
        }
        if (this.clickCount >= 1) {
          this.elem.style.opacity = 0.4;
        }
      })
    }
    else {
      this.elem.addEventListener('click', () => { this.func() });
    }
  }
}


function sendMessage(message) {
  let elem = document.createElement('div');
  elem.innerText = message;
  elem.setAttribute('class', 'messageBox');
  chats.appendChild(elem)
}

function sendOptions(array) {
  let optBox = document.createElement('div');
  for (let each of array) {
    optBox.appendChild(each.elem)
  }
  optBox.setAttribute('class', "optBox");
  chats.appendChild(optBox)
}

guider.click()
sendMessage("Hello, I'm the Guider.")
sendOptions([new Option("Give me a tour.", () => { startTour() }, true), new Option("Need help!", () => { startHelp() }, false), new Option("Let me do my stuff.", () => {
  sendMessage("Okay! If you want to call me again, click the explore button at the bottom right!", true);
  setTimeout(() => { toggleGuider() }, 2000)
}), new Option('Report a problem', () => { sendMessage("If you have found any issue in the website please contact me. You can find the contacts in the Contact slide. Also, if possible, please send the image of the console (by inspecting the page). Thank You.") })])

var site = {
  "Navigation Bar": {
    "text": "At the left is the navigation menu to navigate between the different sections of the webpage"
  },
  "Home": {
    "text": "This is the home screen, which is like a cover for the website",
    "fact": "If you click on the image of mars, it's rotating speed increases. Currently it is moving at 18° per second"
  },
  "About": {
    "text": "This is the about page, where you can read about me and my interests."
  },
  "Projects": {
    "text": "This is the projects section where I upload the projects which I've made. If you want to know more about each of the projects, visit My Docs in the navigation menu.",
  },
  "Docs": {
    "text": "This is the Docs section where I upload webpages with some information either related to my website or not. The description below every doc describes it."
  },
  "Contact": {
    "text": "This is the last section of the website. Here you can find ways to contact me."
  }
};

function redirectTo(screen) {
  try {
    document.querySelector(`#${screen}d`).click()
  }
  catch (error) {

  }
}

function startTour() {
  let confirmStart = false;
  sendMessage("Get ready for the tour.")
  sendOptions([new Option("Start Tour", () => {
    confirmStart = true;
    continueTour()
  }, true), new Option("No need", () => {
    confirmStart = false;
    continueTour()
  }, true)]);





  function continueTour() {
    if (confirmStart) {
      let siteArray = Object.keys(site);
      let currentPage = 0;

      function tellAndNext(screen) {
        if (screen == undefined) {
          terminateTour()
        }
        else {
          if (currentPage == 0){
            sendMessage("Welcome to the tour of the website. This website is an introductory website with no specific professional purpose. The website is completely static i.e. no backend.");
            sendMessage("That also means that none of your data can be shared with the developer. You can read more about the developer in the About me section. ")
            sendMessage("So let's start")
          }
          redirectTo(screen)
          sendMessage(site[screen]["text"]);
          if (site[screen]["fact"] != undefined) {
            sendMessage(`Fact: ${site[screen]["fact"]}`);
          }
          let optArray = [new Option("Next", () => { currentPage++;
            tellAndNext(siteArray[currentPage]);
            optArray[1].elem.style.display = "none" }, true), new Option("Terminate Tour", () => { terminateTour() }, true)]
          sendOptions(optArray);
        }
      }
      tellAndNext(siteArray[currentPage])

    }
    else {
      sendMessage("Okay.. Enjoy")
    }
  }

  function terminateTour() {
    sendMessage("Thank you for giving your time. Keep exploring.");
    document.querySelector("#Homed").click()
  }
}


function startHelp(){
  let helpPage = currentPage;
  sendMessage(`Do you need help with the ${currentPage} page?`)
  let optArray = [new Option("Yes",()=>{help(helpPage);optArray[1].elem.style.display = "none"},true),new Option("No",()=>{viewMoreOptions()})]
  sendOptions(optArray)
  
  function viewMoreOptions(){
    sendMessage("Which page do you need help with?")
    let optArray = [];
    for (let each in site){
      let opt = new Option(each,()=>{help(each)},true);
      optArray.push(opt);
    }
    optArray.push(new Option("Others",()=>{sendMessage("You may contact the developer for more help.")},true))
    sendOptions(optArray)
  }
}

function help(screen){
  redirectTo(screen);
  sendMessage(site[screen]['text']);
  if (site[screen]['fact'] != undefined){
    sendMessage(`Fact: ${site[screen]['fact']}`);
  }
  sendOptions([new Option("Need more help",()=>{sendMessage("You may contact the developer for more help"),true})])
}

const observer = new MutationObserver(() => {
  chats.scrollTop = chats.scrollHeight;
});

observer.observe(chats, {
  childList: true,
});