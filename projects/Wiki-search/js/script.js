/*var wikiLink="https://en.wikipedia.org/w/api.php?action=opensearch&search=butterfly";
$.ajax(wikiLink, {
      dataType: "json",
      data: {
        origin: "*"
      },
      type: "GET",
      success: function(data) {
        console.log(data);
      }
})*/
function wikiSearch(){
  var sa=document.getElementById("searcharea");
  console.log(sa.value);
  var body=document.getElementsByTagName("body")[0];
  document.getElementsByClassName("container")[0].style.marginTop="0";// container ->top
  var aS=document.getElementsByTagName("a");
  var divLen=aS.length;
   // console.log(divLen);
    for (var j = 1; j<divLen; j++){
      document.body.removeChild(aS[1]);
    //  console.log("j="+j);
    };

var wikiLink="https://en.wikipedia.org/w/api.php?action=opensearch&format=json&origin=*&search=" + sa.value;
$.ajax(wikiLink, {
  success: function(data) {
        console.log(data);

    for (var i = 0; i< data[1].length; i++){
      var desk="";
    //  console.log("i="+i);
      if (data[2][i]!=="") {desk="<p class='description'>"+ data[2][i] + "</p>";}
    var newDiv="<a target='_blank' href="+data[3][i]+"><div class='results'>" + data[1][i] + desk +"</div>"+"</a>";
    body.innerHTML+=newDiv;
  }

    var res=document.getElementsByClassName("results");
  //  console.log(res.length);

  /*  setTimeout(function(){
    for (var k = 0; k<data[1].length; k++){
      res[k].style.opacity = "1";
      console.log("yo");
    }
      }, 1000);*/
    setTimeout(function(){
    for (var k = 0; k<data[1].length; k++){
      res[k].style.opacity = "1";
      res[k].style.margin = "15px 5%"
    }
      }, 1);

      }
});


} //end of wikiSearch
