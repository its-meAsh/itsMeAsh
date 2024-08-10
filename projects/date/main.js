const backHome = document.querySelector("#backHome")
backHome.addEventListener('click', () => { location.replace("../../index.html") });


const dayNow = document.querySelector("#dayNow");
const dateNow = document.querySelector("#dateNow");
const monthNow = document.querySelector("#monthNow");
const yearNow = document.querySelector("#yearNow");
const hoursNow = document.querySelector("#hoursNow");
const minutesNow = document.querySelector("#minutesNow");
const secondsNow = document.querySelector("#secondsNow");
const milliSecNow = document.querySelector("#milliSecNow")
const ampmNow = document.querySelector("#ampmNow");
const tzNow = document.querySelector("#tzNow");

const dayDir = {0:"Sunday",1:"Monday",2:"Tuesday",3:"Wednesday",4:"Thursday",5:"Friday",6:"Saturday"};
const monthDir = {0:"January",1:"February",2:"March",3:"April",4:"May",5:"June",6:"July",7:"August",8:"September",9:"October",10:"November",11:"December"};
var ampmStatus = "AM";

function changeOffset(offset){
  let offstr = "+";
  if (offset>0){
    offstr = "-"
  };
  let hour = Math.floor(Math.abs(offset)/60);
  let min = Math.abs(offset)-(60*hour);
  offstr+=addZero(hour)
  offstr+=":"
  offstr+=addZero(min)
  return offstr;
}

function setYear(recYear){
  return 1900+recYear
}

function addZero(num){
  let string = String(num)
  if (num<10){
    string = "0";
    string+=String(num);
  }
  return string;
}

function setHour(hour){
  let diff = Math.floor(hour/12);
  if (diff == 1){
    ampmStatus = "PM";
  }
  else{
    ampmStatus = "AM";
  }
  hour = hour-(12*diff);
  return hour;
}

function addZeroms(ms){
  let array = String(ms).split("");
  let diff = 3-array.length;
  for (let i = 0; i<diff;i++){
    array.unshift("0");
  }
  return array.join("");
}

var interval = setInterval(()=>{
  let obj = new Date();
  let day = dayDir[obj.getDay()];
  let date = addZero(obj.getDate());
  let month = monthDir[obj.getMonth()];
  let year = setYear(obj.getYear());
  let hour = addZero(setHour(obj.getHours()));
  let minutes = addZero(obj.getMinutes());
  let seconds = addZero(obj.getSeconds());
  let milliseconds = addZeroms(obj.getMilliseconds());
  let offset = changeOffset(obj.getTimezoneOffset());
  
  dayNow.innerHTML = day;
  dateNow.innerHTML = date;
  monthNow.innerHTML = month;
  yearNow.innerHTML = year;
  hoursNow.innerHTML = hour;
  minutesNow.innerHTML = minutes;
  secondsNow.innerHTML = seconds;
  milliSecNow.innerHTML = milliseconds;
  ampmNow.innerHTML = ampmStatus;
  tzNow.innerHTML = offset;
},10)