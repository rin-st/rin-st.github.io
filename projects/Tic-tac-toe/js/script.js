var you="X", comp="O";
var rows = [[0,1,2],
           [3,4,5],
           [6,7,8],
           [0,3,6],
           [1,4,7],
           [2,5,8],
           [0,4,8],
           [2,4,6]];
var rowsCount = [];// items in row
var rowsCountComp = [];//comp's items
var rowsCountYou = [];//your items
var fields = document.getElementsByClassName("field");
var ct = document.getElementById("ctc");
var turns = 0;
var compFirst = false;
var finishRow;
var winCount = 0;

var xory = function(){
  var x = confirm('OK = "X", Cancel = "O"');
  if (!x) {
    you="O";
    comp="X";
  }
  var xy=document.getElementById("XY");
  xy.innerHTML = "You play "+you +", Computer plays "+ comp;
}

window.onload = xory();

var clearAll = function(){
  for (var i = 0; i< fields.length; i++){
    fields[i].innerHTML = "";
    fields[i].classList.remove("red");
  }

  turns = 0;
  finishRow = undefined;
  compFirst=!compFirst;
  if (compFirst) compTurn();
  ct.innerHTML="";
}

var inp = function(num){
  if (turns >= 9){
  setTimeout(clearAll, 300);
};
  if (fields[num].innerHTML===""&&turns<10){
    turns++;
    fields[num].innerHTML = you;
    if (turns<9) compTurn();
  }
  if (turns>=9){
    ct.innerHTML = "Click any field to continue";
  }
}

var compTurn = function(){
  console.log(turns+1);
  rowsCount = [];//all items
  rowsCountComp = [];//comp's items
  rowsCountYou = [];//your items
  if (turns === 10){
  setTimeout(clearAll(), 300);
}
  turns++;

  if (turns<10){
  for (var i = 0; i< rows.length; i++){
    var counter = 0;
    var counterComp = 0;
    var counterYou = 0;
    for (var j = 0; j< rows[i].length; j++){
      if (fields[rows[i][j]].innerHTML!=="") {
        counter++;// count all employed fields in rows
        if (fields[rows[i][j]].innerHTML===you) counterYou++;//count your fields in rows
        if (fields[rows[i][j]].innerHTML===comp) counterComp++;//count your fields in rows
      }
    }
    rowsCount.push(counter);
    rowsCountYou.push(counterYou);
    rowsCountComp.push(counterComp);
  }
  console.log("all",rowsCount);
  console.log("you",rowsCountYou);
  console.log("comp",rowsCountComp);

    // if если уже два в ряду, заполняем и выигрываем, else
  for (var i = 0; i<rowsCount.length; i++){//ищем есть ли ряды где 2 и нет противника
        if (rowsCountYou[i]===0&&rowsCountComp[i]===2){
          finishRow = i;
        }
  }
    if (finishRow>-1){//если нашли
      for (var j = 0; j< rows[finishRow].length; j++){
        fields[rows[finishRow][j]].classList.add("red");
        if (fields[rows[finishRow][j]].innerHTML=="") fields[rows[finishRow][j]].innerHTML=comp;
      }
      var res = document.getElementById("result");
      winCount++;
      res.innerHTML = "Player 0:" + winCount + " Computer";
      turns = 10;
    }
    else{
  var k = 0, kd = -1;//kd - danger row, value=2
  while (k<rowsCountYou.length&&kd<0){
    if (rowsCountYou[k]===2&&rowsCountComp[k]===0) kd = k;
    k++;
  }
  //  console.log(kd);
  //  console.log(rows[kd].length);
    if (kd>-1){ //number of row with 2/ defence
      for (var i = 0; i< rows[kd].length; i++){
        if (fields[rows[kd][i]].innerHTML==="") {
          fields[rows[kd][i]].innerHTML=comp;
        }
      }
    }
    else{//attack
      var nextTurn;
      if (turns===1){
        var nextTurn = 2*Math.floor(Math.random()*5);
        console.log("hi",nextTurn);
      }
        else if (turns===2){
          if (rowsCountYou[6]&&rowsCountYou[7]){//если центр занят, ставим в угол
            nextTurn = 2*Math.floor(Math.random()*5);
            while(fields[nextTurn].innerHTML!==""){
              //console.log("hih");
              nextTurn = 2*Math.floor(Math.random()*5);
            }
          }
          else nextTurn = 4;//иначе ставим в центр
        }
        else if (turns===3){
          if (rowsCount[6]===2){
            for (var i = 0; i< rows[6].length; i++){
             if (fields[rows[6][i]].innerHTML==="") nextTurn = rows[6][i];//.innerHTML=comp;
            }
          }
          else if (rowsCount[7]===2){
            for (var i = 0; i< rows[7].length; i++){
             if (fields[rows[7][i]].innerHTML==="") nextTurn = rows[7][i];//.innerHTML=comp;
            }
          }
          else if (!(rowsCount[6]&&rowsCount[7])) nextTurn = 4;
          else {
            nextTurn = 2*Math.floor(Math.random()*5);
            while(fields[nextTurn].innerHTML!==""){
              nextTurn = 2*Math.floor(Math.random()*5);
            }
            //rowsCount 6||7 ==1
          }
        }
        else if (turns===4){
          if (rowsCount[6]===3||rowsCount[7]===3){//если угловой ряд
            if (fields[4].innerHTML===comp){//если 0 посередине, а х по углам
              nextTurn = 2*Math.floor(Math.random()*4)+1; //ставим 0 не в угол
            }
            else{  //если угловой ряд, но 0 не посередине
              if (rowsCount[6]===3) nextTurn = 2 + 4*Math.floor(Math.random()*2);
              if (rowsCount[7]===3) nextTurn = 8*Math.floor(Math.random()*2);
              }
          }
          else{
            //если не угловой ряд, значит наш посередине, иначе бы отбивались
              if ((rowsCount[0]>0)&&(rowsCount[3]>0)&&fields[0].innerHTML=="") nextTurn = 0;
              if ((rowsCount[2]>0)&&(rowsCount[3]>0)&&fields[6].innerHTML=="") nextTurn = 6;
              if ((rowsCount[0]>0)&&(rowsCount[5]>0)&&fields[2].innerHTML=="") nextTurn = 2;
              if ((rowsCount[2]>0)&&(rowsCount[5]>0)&&fields[8].innerHTML=="") nextTurn = 8;
              if (rowsCount[1]===3||rowsCount[4]===3) {nextTurn = Math.floor(2*Math.random()) + 6*Math.floor(2*Math.random()); }
          }
          //else if rows6,7!=3
        }
      else if (turns===5){
        if (rowsCountYou[6]===0){//если в 6 ряду нет соперника(1 диагональ)
          if (rowsCountYou[0]===0||rowsCountYou[3]===0){nextTurn = 0;}
          if (rowsCountYou[2]===0||rowsCountYou[5]===0){nextTurn = 8;}
        }
        if (rowsCountYou[7]===0){//если в 7 ряду нет соперника(1 диагональ)
          if (rowsCountYou[0]===0||rowsCountYou[5]===0){nextTurn = 2;}
          if (rowsCountYou[2]===0||rowsCountYou[3]===0){nextTurn = 6;}
        }
      }
      else if (turns>5){

        var nextRow;
        for (var i = 0; i<rowsCount.length; i++){//ищем есть ли ряды где нет противника
        if (rowsCountYou[i]===0){
          nextRow = i;
        }
      }

        if (nextRow){//если есть
          do {
          nextTurn = Math.floor(Math.random()*3);
          } while(fields[rows[nextRow][nextTurn]].innerHTML!=="");
          nextTurn = rows[nextRow][nextTurn];
        }
        else{
        do {
          nextTurn = Math.floor(Math.random()*9);
        } while(fields[nextTurn].innerHTML!=="");
        }
      }
        fields[nextTurn].innerHTML=comp;

      }
    }
  } //end of if turns<10
}
