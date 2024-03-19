var start = document.getElementById("start");
var lab = document.getElementById("lab");
var stop = document.getElementById("stop");
var reset = document.getElementById("reset");
var array=[];


var timer = false;
let hour = 00;
let minute = 00;
let second = 00;
let count = 0;
start.addEventListener("click", StartTimer);
stop.addEventListener("click", StopTimer);
reset.addEventListener("click", ResetTimer);
lab.addEventListener("click",Lab)

function StartTimer() {
  start.style.display = "none";
  stop.style.display = "block";
  lab.style.display = "block";
  reset.style.display = "none";
  timer = true;
  stopWatch();
}

function stopWatch() {
  if (timer) {
    count++;
    if (count == 100) {
      second++;
      count = 0;
    }

    if (second == 60) {
      minute++;
      second = 0;
    }

    if (minute == 60) {
      hour++;
      minute = 0;
      second = 0;
    }

    let hrString = hour;
    let minString = minute;
    let secString = second;
    let countString = count;

    if (hour < 10) {
      hrString = "0" + hrString;
    }

    if (minute < 10) {
      minString = "0" + minString;
    }

    if (second < 10) {
      secString = "0" + secString;
    }
    if (count < 10) {
      countString = "0" + countString;
    }

    document.getElementById("hr").innerHTML = hrString;
    document.getElementById("min").innerHTML = minString;
    document.getElementById("sec").innerHTML = secString;
    document.getElementById('count').innerHTML = countString;

    setTimeout(stopWatch, 10);
  }
}

function StopTimer() {
  start.style.display = "block";
  stop.style.display = "none";
  lab.style.display = "none";
  reset.style.display = "block";
  timer = false;
}

function ResetTimer() {
  lab.style.display = "block";
  reset.style.display = "none";
  let hrString = "00";
  let minString = "00";
  let secString = "00";
  let countString="00";
  hour=0;
  minute=0;
  second=0;
  count=0;

  document.getElementById("hr").innerHTML = hrString;
  document.getElementById("min").innerHTML = minString;
  document.getElementById("sec").innerHTML = secString;
  document.getElementById('count').innerHTML = countString;
  array=[];
  displayLab()
}

function Lab(){
 let obj={
    "hr":hour,
    "min":minute,
    "sec":second,
    "ms":count
 }
 array.push(obj);
 displayLab();
}

function displayLab(){
    if(array!=null || array.length>0){
     var labdisplay=document.getElementById("lab-display");
     var html="";
     array.forEach((element,index)=>{
     let tempHr=element.hr;
     let tempSc=element.sec;
     let tempMn=element.min;
     let tempMs=element.ms;
      if(element.hr<10){
        tempHr="0"+element.hr;
      }
      if(element.sec<10){
        tempSc="0"+element.sec;
      }
      if(element.hr<10){
        tempMn="0"+element.min;
      }
      if(element.ms<10){
        tempMn="0"+element.ms;
      }
      html+=`<hr>
      <div class="labitem">
        <h1>Lab${index+1}</h1>
        <span>${tempHr}:${tempMn}:${tempSc}:${tempMs}</span>
     </div>`
     })
     labdisplay.innerHTML=html;
    }
}