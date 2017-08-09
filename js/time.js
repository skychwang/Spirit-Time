var start = Date.now() / 1000
var nightStart = start + (200 * 60)
var newStart = start + (240 * 60)

function reloadTime(){
  var now = Date.now() / 1000
  var seconds = now - start
  if (now < nightStart) {
    message = "It is currently DAYTIME."
    var m = Math.floor(seconds/13)
    var s = seconds % 13
  } else if (now < newStart) {
    message = "It is currently NIGHTTIME."
    var m = Math.floor(seconds/5)
    var s = seconds % 5
  }
  var h = Math.floor(m/60)
  var m = m % 60
  h = h + 7
  if (h >= 24) {
    h = 0
  }
  var IGT = String(("0" + h).slice(-2)) + " : " + String(("0" + m).slice(-2))
  if (now > newStart) {
    start = newStart
    nightStart = start + (200 * 60)
    newStart = start + (240 * 60)
  }
  document.getElementById("time").innerHTML = "<h1>" + IGT + "</h1>"
  document.getElementById("dayNight").innerHTML = "<p>" + message + "</p>"
}

setInterval('reloadTime()', 1000)