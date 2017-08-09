function reloadTime(){
  document.getElementById("time").innerHTML = "<h1>" + Date.now() + "</h1>";
}

setInterval('reloadTime()', 1000);