var quotes = ["Live as if you were to die tomorrow. Learn as if you were to live forever.","Mahatma Gandhi",
              "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.", "Ralph Waldo Emerson",
              "To live is the rarest thing in the world. Most people exist, that is all.","Oscar Wilde",
             "That which does not kill us makes us stronger.","Friedrich Nietzsche",
             "Do what you feel in your heart to be right, for you’ll be criticized anyway.", "Eleanor Roosevelt"];

var colors= ["#6c3624", "#bd00ff", "#4a474b", "#f600ff", "#008080", "#C71585", "#6b8184", "#ce7476", "#05486c", "#246c36", "#c8543b", "#6c2436", "#333c4f", "#36246c", "#b58"];

//var butt = document.getElementsByClassName("but")[0];
var quo = document.getElementsByClassName("quote")[0];
var aut = document.getElementsByClassName("autor")[0];
var bod = document.getElementsByTagName("body")[0];
var inp = document.getElementsByTagName("input");
var twi = document.getElementsByTagName("a")[0];

function newQuote(){
  var r = Math.floor(Math.random()*quotes.length/2);
  var col = Math.floor(Math.random()*colors.length);
  //alert(r);
  quo.innerHTML=quotes[r*2];
  aut.innerHTML=quotes[r*2+1];
  twi.href="https://twitter.com/intent/tweet?text="+quotes[r*2] + " " + quotes[r*2+1];

  bod.style.backgroundColor=colors[col];
  quo.style.color=colors[col];
  aut.style.color=colors[col];
  inp[0].style.backgroundColor=colors[col];
  inp[1].style.backgroundColor=colors[col];

  return true;
}
