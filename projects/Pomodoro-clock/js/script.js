var curTimeIn = document.getElementById("curTime");
var curIn = document.getElementById("current");
var decSj = document.getElementById("decS");
var sessVj = document.getElementById("sessValue");
var incSj = document.getElementById("incS");
var decBj = document.getElementById("decB");
var breakVj = document.getElementById("breakValue");
var incBj = document.getElementById("incB");
var mainJ = document.getElementById("main");

var minS = 25, secS = 0; //session
var minB = 5, secB = 0;  //break
var session = true; //session or break;
// начать повторы с интервалом 1 сек
var goSt = false;// go or stop
var min, sec; var i = 0;
min = minS; sec = secS;
var timerId;

if (sec<10) { //set Time
  curTimeIn.innerHTML = min + ":0" + sec;
  console.log( session, min + ":0" + sec, i);}
else {
  curTimeIn.innerHTML = min + ":" + sec;
  console.log( session, min + ":" + sec, i);
  }

var gogo = function(){
timerId = setInterval(function() {
    sec--;// console.log(min,"::",sec);
    i++;
    if (sec<0) {sec = 59; min--;}

  if (min<0){
    session = (!session);
    if (session){
      min = minS;
      sec = secS;
      curIn.innerHTML = "Work time!";
      mainJ.style.backgroundColor = "#fd4442";
    }
    else{
      min = minB;
      sec = secB;
      curIn.innerHTML = "Break!";
      mainJ.style.backgroundColor = "#64db66";
    }
  }
    if (sec<10) {
      curTimeIn.innerHTML = min + ":0" + sec;
      console.log( session, min + ":0" + sec, i);}
    else {
      curTimeIn.innerHTML = min + ":" + sec;
      console.log( session, min + ":" + sec, i);
    }
}, 1000);
}

var stop = function(){
  clearInterval(timerId);
}
var stopAndGo = function(){
  goSt = !goSt;
  if (goSt) gogo();
  else stop();
}
var decreaseSession = function(){
  if (minS>1&&!goSt){
    minS--; secS = 0;
    if (session){
      min = minS; sec = secS;
      curTimeIn.innerHTML = min + ":0" + sec;
    }
    sessVj.innerHTML = minS;
  }
}
var increaseSession = function(){
  if (minS<60&&!goSt){
    minS++; secS = 0;
    if (session){
      min = minS; sec = secS;
      curTimeIn.innerHTML = min + ":0" + sec;
    }
    sessVj.innerHTML = minS;
  }
}
var decreaseBreak = function(){
  if (minB>1&&!goSt){
    minB--; secB = 0;
    if (!session){
      min = minB; sec = secB;
      curTimeIn.innerHTML = min + ":0" + sec;
    }
    breakVj.innerHTML = minB;
  }
}
var increaseBreak = function(){
  if (minB<15&&!goSt){
    minB++; secB = 0;
    if (!session){
      min = minB; sec = secB;
      curTimeIn.innerHTML = min + ":0" + sec;
    }
    breakVj.innerHTML = minB;
  }
}
