window.onload = function(){
  //выравниваем высоту главной страницы под высоту клиента
  var height;
  (document.body.clientHeight < 900) ? height = "900px" : height = document.body.clientHeight + "px";
  var mainContainer = document.getElementsByClassName('main-container')[0];
  mainContainer.style.height = height;
  console.log(document.body.clientHeight, height);
}
