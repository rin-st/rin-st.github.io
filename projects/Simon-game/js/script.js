//var started = false;
var stricted = false; //активен ли Strict
var yourTurn = false; //ход игрока
var goodTurn = true; //был хороший ход
var turnsArray = [];
var yourArray = [];
//var goodAnswer = false;
var strictLamp = document.getElementById('lamp');
var starts = document.getElementById('starter');
var stricts = document.getElementById('stricter');
var counters = document.getElementById('counter');
var greenJ = document.getElementsByClassName('green')[0];
var redJ = document.getElementsByClassName('red')[0];
var blueJ = document.getElementsByClassName('blue')[0];
var yellowJ = document.getElementsByClassName('yellow')[0];
var blockJ=document.getElementsByClassName('block');
var timerId;
var j = 0; //для проигрывания мелодий
//var steps=0;

var strictChange = function(){
  if (onCheck()){
    stricted = !stricted;
    if (stricted) strictLamp.style.backgroundColor = 'red';
    else strictLamp.style.backgroundColor = 'darkred';
    return stricted;
  }
}

var onCheck = function(){//проверка, включен ли аппарат
  return (document.getElementById('on').checked);
  /*if (document.getElementById('on').checked==true) {
    alert("Hello"); return true;
  }
  else return false;*/
}

var onGame = function(){//включение аппарата
    counters.innerHTML = '--';
}
var offGame = function(){//выключение аппарата
  //started = false;
  stricted = false;
  strictLamp.style.backgroundColor = 'darkred';//выключение лампы strict
  for (var i = 0; i < 4; i++)  blockJ[i].style.cursor = 'default';
  //turnsArray = [];
  //yourArray = [];
  turnsArray = [];
  goodTurn = true;
  counters.innerHTML = '';
  //clearTimeout(timerId);
  j = 0;
}
var startGame = function(){
  if (onCheck()){
   // started = true;
   // steps = 1;
    turnsArray = [];
    goodTurn = true;
    playTurns();
  }
}


var playTurns = function(){//игра после старта
  //проигрываем мелодии что есть в массиве, ждём ответа игрока.
  if (onCheck()){
  for (var i = 0; i < 4; i++)  blockJ[i].style.cursor  = 'default';
  if (goodTurn){//если был правильный ход, добавляем элемент в массив
    goodTurn = false;
    turnsArray.push(Math.floor(Math.random()*4));
    console.log(turnsArray);
  }
  if (turnsArray.length<10) counters.innerHTML = '0'+turnsArray.length;
    else counters.innerHTML = turnsArray.length;

      switch (turnsArray[j]){
        case 0:
          sound1();
          break;
        case 1:
          sound2();
          break;
        case 2:
          sound3();
          break;
        case 3:
          sound4();
          break;
                           }
  j++;
      if (j<turnsArray.length) setTimeout(playTurns, 600);
      else {
        //badTimer = setTimeout(wrong,5000);
        j = 0; yourTurn = true;
        for (var i = 0; i < 4; i++)  blockJ[i].style.cursor  = 'pointer';
      }
    }
}

function sound1() {
 var audio = new Audio(); // Создаём новый элемент Audio
 audio.src = 'https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'; // Указываем путь к звуку "клика"
  //audio.autoplay = true; // Автоматически запускаем
 /* audio.addEventListener('played', function() {
    this.currentTime = 0;
    this.play();
}, false);*/
  audio.play();
  greenJ.style.background = '#32CD32';
  setTimeout(function() {greenJ.style.background = '#228B22'}, 300);
}
function sound2() {
  var audio = new Audio();
  audio.src = 'https://s3.amazonaws.com/freecodecamp/simonSound2.mp3';
  audio.play();
  redJ.style.background = 'red';
  setTimeout(function() {redJ.style.background = '#B22222'}, 300);
}
function sound3() {
  var audio = new Audio();
  audio.src = 'https://s3.amazonaws.com/freecodecamp/simonSound3.mp3';
  audio.play();
  yellowJ.style.background = 'yellow';
  setTimeout(function() {yellowJ.style.background = '#FFD700'}, 300);
}
function sound4() {
  var audio = new Audio();
  audio.src = 'https://s3.amazonaws.com/freecodecamp/simonSound4.mp3';
  audio.play();
  blueJ.style.background = 'blue';
  setTimeout(function() {blueJ.style.background = '#4169E1'}, 300);
}
var wrongTurn = function(){
  counters.innerHTML = '!!';
      yourArray = [];
      if (stricted) {
        turnsArray = [];
        goodTurn = true;
      }
      yourTurn = false;
      //for (var i = 0; i < 4; i++)  blockJ[i].style.cursor  = 'default';

      setTimeout(playTurns,1200);
}
function checkYourTurn(){
  if (yourArray[yourArray.length-1]!==turnsArray[yourArray.length-1]){
      //если сделал неправильный ход, прерываем его
       //опять показываем ход
    wrongTurn();
    }
    else if (yourArray.length===turnsArray.length){
      //если ход правильный до конца
      goodTurn = true;
      yourTurn = false;
      yourArray = [];
      if (turnsArray.length===20){//если достигли победы
        counters.innerHTML='***';
        turnsArray = [];
      }
      //for (var i = 0; i < 4; i++)  blockJ[i].style.cursor  = 'default';
      setTimeout(playTurns,1200);//запускаем следующий ход
    }
}
function sound11(){
  if (yourTurn){
   /* clearTimeout(badTimer);
    badTimer = setTimeout(wrong,5000);*/
    sound1();
    yourArray.push(0);
    checkYourTurn();
  }
}
function sound21(){
  if (yourTurn){
    sound2();
    yourArray.push(1);
    checkYourTurn();
  }
}
function sound31(){
  if (yourTurn){
    sound3();
    yourArray.push(2);
    checkYourTurn();
  }
}
function sound41(){
  if (yourTurn){
    sound4();
    yourArray.push(3);
    checkYourTurn();
  }
}
