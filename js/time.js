//notification request permission
document.addEventListener('DOMContentLoaded', function () {
  if (Notification.permission !== "granted")
    Notification.requestPermission();
});

//set starting 7 AM in UNIX Timestamp format
var time = [1501677110]

//Notification variables
var notifyNight = false
var notifiedNight = false

function clock() {
  //init and adjust
  while ((Date.now() / 1000) > time[time.length - 1]) {
    time = [time[time.length - 1]]
    for (i = 1; i < 900; i++) {
      time.push(time[i-1] + 60/4.5)
    }
    for(i = 900; i < 1440; i++) {
      time.push(time[i-1] + 5)
    }
  }

  //binary search for current minute in 24h day
  var low = 0
  var high = time.length
  while (low != high) {
    var mid = (low + high) / 2
    if (time[mid] <= (Date.now() / 1000)) {
      low = mid + 1
    } else {
      high = mid
    }
  }

  //conversion of current minute to standard h:m
  var minute = mid
  var hour = Math.floor(minute/60)
  minute = minute % 60
  hour = (hour + 7) % 24

  //nighttime
  if (mid > 900) {
    //message nighttime
    message = "It is currently NIGHTTIME."
    //notification for nighttime
    if (notifyNight == true && notifiedNight == false) {
      var nightNotification = new Notification('It is now NIGHTTIME in BDO.', {
        body: 'NightVendor has opened.'
      })
      notifiedNight = true
    }
  } else {
    //message daytime
    message = "It is currently DAYTIME."
  }
  //reset nighttime notified status in 60 in-game minutes
  if (mid < 900 && notifiedNight == true) {
    notifiedNight = false
  }

  //HTML Update
  var formattedTime = String(("0" + hour).slice(-2)) + " : " + String(("0" + minute).slice(-2))
  document.getElementById("time").innerHTML = "<h1>" + formattedTime + "</h1>"
  document.getElementById("dayNight").innerHTML = "<p>" + message + "</p>"
}

//clock update
setInterval('clock()', 1000)

//notify night button
function notifyNightClick() {
  if (notifyNight == false) {
    if (!Notification) {
      alert('Desktop notifications not available in your browser. Try Chromium.'); 
      return;
    }
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    } else {
      notifyNight = true
      document.getElementById("notifyNight").className = "btn btn-success"
    }
  } else if (notifyNight == true) {
    notifyNight = false
    document.getElementById("notifyNight").className = "btn btn-danger"
  }
}