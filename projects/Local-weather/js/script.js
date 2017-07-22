var cels=true;
 var cWeather = document.getElementById("currentWeather");
 var Grade = document.getElementById("grade");

$.getJSON("http://ip-api.com/json", function(data) {
  //  alert("successIP");

var lat = data.lat;
var lon = data.lon;

 var City = document.getElementById("City");
 var sky = document.getElementById("sky");
 var wIcon = document.getElementById("wIcon");
  $.getJSON("http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&APPID=971024631c934768ad8ffdbf5a3286a7", function(json) {
    //alert("successW");

    City.innerHTML = json.name + ", " + json.sys.country;

var icon = json.weather[0].icon;
    wIcon.innerHTML = "<img src='http://openweathermap.org/img/w/" + icon + ".png'>";

    cWeather.innerHTML = Math.round(json.main.temp-273);

    Grade.innerHTML = "C";

    sky.innerHTML = json.weather[0].description;
});
  });
//**

function change(){
  if (cels) {
    cels=false;
    Grade.innerHTML = "F";
    cWeather.innerHTML = Math.round(+cWeather.innerHTML*9/5+32);
  }
  else{
    cels=true;
    Grade.innerHTML = "C";
    cWeather.innerHTML = Math.round((+cWeather.innerHTML-32)*5/9);
  }
}

/*if (navigator.geolocation) **
 //$("#data2").html(JSON.stringify(json)); navigator.geolocation.getCurrentPosition(function(position) {*/

/* var dat = document.getElementById("data");

 var dat2 = document.getElementById("data2");*/
/* var cWeather = document.getElementById("currentWeather");
 var Grade = document.getElementById("grade");
    */

/*dat.innerHTML="latitude: " + position.coords.latitude + "<br>longitude: " + position.coords.longitude;*/
