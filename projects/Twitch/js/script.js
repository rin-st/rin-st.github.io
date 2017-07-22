var channels = ["imaqtpie", "riotgamesru","freecodecamp","ESL_SC2"];//,"freecodecamp","noobs2ninjas","ESL_SC2"];

var cnls=document.getElementsByClassName("canals")[0];

channels.forEach(function(item,i) {
 //     console.log(item);

$.ajax({
 type: 'GET',
 url: 'https://api.twitch.tv/kraken/streams/'+item,
 headers: {
   'Client-ID': 'dw4f7yx7ptuyci4d4h8f6ceo0pya91'
 },
 success: function(data) {
   console.log(data);


   $.ajax({
 type: 'GET',
 url: 'https://api.twitch.tv/kraken/channels/'+item,
 headers: {
   'Client-ID': 'dw4f7yx7ptuyci4d4h8f6ceo0pya91'
 },
 success: function(data2) {
  // console.log(data2);

   var createCanal;
   if (data.stream==null) {createCanal="<a href='" + data2.url+ "'><div class='canal off'><img src="+ data2.logo +"><span class='name'>"+item+"</span><span class='description'></span><span class='status'>Offline</span>";}
   else createCanal="<a href='" + data2.url+ "'><div class='canal on'><img src="+ data2.logo +"><span class='name'>"+item+"</span><span class='description'>"+data2.status+"</span><span class='status'>Online</span>";
   cnls.innerHTML += createCanal;

 }
   });
 }
});
    });//end of forEach

var cnlsList=document.getElementsByClassName("canal");
var cnlsOn=document.getElementsByClassName("on");
var cnlsOff=document.getElementsByClassName("off");

var allbut=document.getElementById("allbut");
var onlinebut=document.getElementById("onlinebut");
var offlinebut=document.getElementById("offlinebut");
var menuLi=document.getElementsByTagName("li");

onlinebut.onclick = function(){
//  console.log(cnlsOff.length, "cnlsOff.length");

  allbut.style.color="#858585";
  allbut.style.textShadow="none";
  offlinebut.style.color="#858585";
  offlinebut.style.textShadow="none";
  onlinebut.style.color="green";
  onlinebut.style.textShadow="0 0 1px lightgreen";

  var hides = document.getElementsByClassName("hide");
  if (hides.length){
  /*hides.forEach(function(channelHide){
    channelHide.classList.remove("hide");
  });*/
    for (var i=0;hides.length>0;){
    hides[0].classList.remove("hide");
  //    console.log("deleted hides ="+i+1);
  }
  };

/*  cnlsOff.forEach(function(cnl){
    alert("HI");
    cnl.classList.add("hide");
  });*/
  for (var i=0;i<cnlsOff.length;i++){
    cnlsOff[i].classList.add("hide");
  }
}

offlinebut.onclick = function(){
  //console.log(cnlsOn.length,"cnlsOn.length");

  allbut.style.color="#858585";
  allbut.style.textShadow="none";
  onlinebut.style.color="#858585";
  onlinebut.style.textShadow="none";
  offlinebut.style.color="red";
  offlinebut.style.textShadow="0 0 1px pink";

  var hides = document.getElementsByClassName("hide");
  if (hides.length){
    //console.log(hides.length, " hides.length");
    for (var i=0;hides.length>0;){
    hides[0].classList.remove("hide");
      //console.log("deleted hides ="+i+1);
  }
  };
  for (var i=0;i<cnlsOn.length;i++){
    cnlsOn[i].classList.add("hide");
  }
};

allbut.onclick = function(){
//  console.log(cnlsList.length,"cnlsList.length");

  onlinebut.style.color="#858585";
  onlinebut.style.textShadow="none";
  offlinebut.style.color="#858585";
  offlinebut.style.textShadow="none";
  allbut.style.color="black";
  allbut.style.textShadow="0 0 1px #777";

  var hides = document.getElementsByClassName("hide");
  //console.log(hides.length, " hides.length");
  if (hides.length>0){
    for (var i=0;hides.length>0;){
    hides[0].classList.remove("hide");
    //  console.log("deleted hides ="+i+1);
  }
 };
}
