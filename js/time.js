//notification request permission
document.addEventListener('DOMContentLoaded', function () {
  if (Notification.permission !== "granted")
    Notification.requestPermission();
});

//set starting 7 AM in UNIX Timestamp format
var lastCalibrated = 1501677110
var time = [lastCalibrated]
//setting lastCalibrated to formatted version
var lastCalibratedUTC = moment(lastCalibrated * 1000).utc().format('MMMM Do YYYY, h:mm:ss a')
document.getElementById("lastCalibrated").innerHTML = "<p>" + "Calibration Point: " + lastCalibratedUTC + " | UTC" + "</p>"

//Notification variables
var notifyNight = false
var notifiedNight = true
var notifyDay = false
var notifiedDay = true

function clock() {
  //init and adjust
  while ((Date.now() / 1000) > time[time.length - 1]) {
    time = [time[time.length - 1]]
    for (i = 1; i < 900; i++) {
      time.push(time[i-1] + 60/4.5)
    }
    for(i = 900; i < 1440; i++) {
      time.push(time[i-1] + 240/54)
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

  //nightday
  if (mid > 900) {
    //nighttime
    //notification for nighttime
    if (notifyNight == true && notifiedNight == false) {
      var nightNotification = new Notification('It is now NIGHTTIME in BDO.', {
        body: 'Patrigo the Night Vendor has opened shop | Extra monster AP&XP'
      })
      notifiedNight = true
    }
  } else {
    //daytime
    //notification for daytime
    if (notifyDay == true && notifiedDay == false) {
      var dayNotification = new Notification('It is now DAYTIME in BDO.', {
        body: 'Enjoy the sun.'
      })
      notifiedDay = true
    }
  }
  //reset nighttime notified status
  if (mid < 900 && notifiedNight == true) {
    notifiedNight = false
  }
  if (mid > 900 && notifiedDay == true) {
    notifiedDay = false
  }

  //HTML Update
  var formattedTime = String(("0" + hour).slice(-2)) + " : " + String(("0" + minute).slice(-2))
  document.getElementById("time").innerHTML = "<h1>" + formattedTime + "</h1>"
}

//clock update
setInterval('clock()', 1000)

//notification buttons
//notify night button
function notifyNightClick() {
  if (notifyNight == false) {
    if (!Notification) {
      alert('Desktop notifications are not available in your browser. Only Chromium browsers are supported.'); 
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
//notify day button
function notifyDayClick() {
  if (notifyDay == false) {
    if (!Notification) {
      alert('Desktop notifications are not available in your browser. Only Chromium browsers are supported.'); 
      return;
    }
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    } else {
      notifyDay = true
      document.getElementById("notifyDay").className = "btn btn-success"
    }
  } else if (notifyDay == true) {
    notifyDay = false
    document.getElementById("notifyDay").className = "btn btn-danger"
  }
}