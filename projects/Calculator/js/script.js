var res = document.getElementById("results");//основной вывод
var res2 = document.getElementById("ress");//вывод с действиями
var a = 0, b = 0; op = false;//op отвечает за то, нажата ли операция
var operation;
var dots = false;
var newB = false;//введен ли второй операнд
var ress1=0, ress2 = false;//ress1 значение второй строки, ress2 переключатель обнуления второй строки
var acc="";//что удалять с помощью ac
var dec = false; //для вычисления ress1
var nul = false; //для 0
var acstop = true;

var input2 = function(inp){
  if (inp==="+"||inp==="-"||inp==="/"||inp==="*") {
    if (res2.value!="overflow"){
      console.log("input2");
      console.log(res2.value);
      ress1 = res2.value;
      res2.value+=inp;
      dec = true;
      nul = false;
    }
  }
  else if (inp=="0"&&((!nul)||res.value!="0")){
    ress1 = res2.value;
    res2.value+=inp;
    nul = false;
    dec = false;
    if (res.value=='0') nul = true;
    console.log("Hi");}
  else if (inp!="0") {
    if (nul&&inp!='.'){
        res2.value = res2.value.slice(0,-1);
        //console.log("Hih");
     //   nul = false;
      };
    if (dec) {
      console.log(res.value)
      ress1= res2.value;
      dec = false;
//   nul = false;
    }
    nul = false;
    res2.value+=inp;
  }
 // if (!(res.value=="0"&&inp==="0")) res2.value+=inp;
}

var inputs = function(numb){
  if (op||ress2){res.value=""; op = false;}
  console.log(numb);
  if (res.value=="0"&&numb!='.'){res.value="";console.log("numb");}
  if (res2.value=="0"&&numb!="."){res2.value="";}
  if (ress2) {res2.value=""; ress2 = false;}
  if (!(numb =='.'&&dots)) {
    if (res.value ===''&&numb=='.'){//если пустое поле и точка, дописываем 0
      res.value +='0'+numb;
      input2(0);
      input2(numb);
    }
    else{//в другом случае просто вводим символ
    res.value +=numb;
    input2(numb);
    }
    }
  if (numb =='.') dots = true;
  newB = true; //console.log("hello",numb);
  acstop = false;

  if (res.value.length>10) {//доделать переполнение!!!!!!!!!!!!!!!!!!!!!
      res.value = "0";
      res2.value = "overflow";
      clear();
      ress2=true;
    }
}
var addition = function(){
  if (operation) {calculate();};
  if (ress2&&res2.value!=="overflow") {res2.value = res.value; ress2 = false;}
  if (op) {res2.value = res2.value.slice(0,-1);}
  if (res2.value!=="overflow"){
  input2("+");
  a = +res.value;
  operation = "plus";
  op = true;
  newB = false;
  dots = false;
  }
}
var divide = function(){
  if (operation) {calculate();}
  if (ress2&&res2.value!=="overflow") {res2.value = res.value; ress2 = false;}
  if (op) {res2.value = res2.value.slice(0,-1);}
  if (res2.value!=="overflow"){
  input2("/");
  a = +res.value;
  operation = "divide";
  op = true;
  newB = false;
  dots = false;
  }
}
var multiply = function(){
  if (operation) {calculate();}
  if (ress2&&res2.value!=="overflow") {res2.value = res.value; ress2 = false;}
  if (op) {res2.value = res2.value.slice(0,-1);}

  if (res2.value!=="overflow"){
    input2("*");
    a = +res.value;
    operation = "multi";
    op = true;
    newB = false;
    dots = false;
  }
}
var substract = function(){
  if (operation) {calculate();}
  if (ress2&&res2.value!=="overflow") {res2.value = res.value; ress2 = false;}
  if (op) {res2.value = res2.value.slice(0,-1);}
  if (res2.value!=="overflow"){
  input2("-");
  a = +res.value;
  operation = "subs";
  op = true;
  newB = false;
  dots = false;
  }
}
var equals = function(){
  if (newB){input2("=");
  ress2 = true;
  ress1 = 0;
  dots = false;
  calculate();
  if (res2.value!=="overflow") res2.value+=res.value;
}
}
var ac = function(){//проблема двух нажатий
  if(!acstop){
    if (op){operation=""; op = false; res2.value = ress1;}
     // else {res.value = 0; ress2 = false; res2.value = ress1 + '0'; nul = true;}
      else { /*if (ress2) {res.value = 0; ress2 = false;}
            else*/
            if (ress2) {clears(); res.value = 0; res2.value = 0; console.log("hh");}
            else {res.value = a;
                  ress2 = false; res2.value = ress1;
                  op = true; newB = false; dots = false;}
  //res2.value = ress1;
            //newB = false;}
             };
  acstop = true;
}
}
var calculate = function(){
  if (newB){
    b=+res.value;
    console.log(a,b);
  //  op = true;
  if (operation==="plus"){
    res.value = a + b;
  }
  if (operation ==="divide"){
      res.value = a / b;
    }
  if (operation==="multi"){
    res.value = a * b;
  }
  if (operation==="subs"){
    res.value = a - b;
  }
    operation = "";
    op = false;
    newB = false;
    acstop = false;
    res.value = Math.round(res.value*100)/100;
    console.log(res.value);
}
    if (res.value.length>10) {//доделать переполнение!!!!!!!!!!!!!!!!!!!!!
      res.value = "0";
      res2.value = "overflow";
      console.log("calculate");
      console.log(res2.value);
      clear();
      ress2=true;
    }
}
var clears = function(){
  a = 0; b = 0; op = false;
  dots = false;
  newB = false;
  ress1=0;
  ress2 = false;
  dec = false;
  nul = false;
  acstop = false;
} 
