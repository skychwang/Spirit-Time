import time

""" Old Implementation with no account of processing time
hour = 0
minute = 0

while True:
    if 22 > hour >= 7:
        time.sleep(13)
        if minute < 59:
            minute += 1
        else:
            hour += 1
            minute = 0
    else:
        time.sleep(5)
        if minute < 59:
            minute += 1
        else:
            hour += 1
            minute = 0
    if hour == 24:
        hour = 0
    print(str(hour) + " " + str(minute))
"""

start = time.time()#Set this to when ingame time is 7:00 AM
nightStart = start + (200 * 60)
newStart = start + (240 * 60)

while True:
    seconds = time.time() - start
    if time.time() < nightStart:
        message = "It is currently DAYTIME."
        m, s = divmod(seconds, 13)
    elif time.time() < newStart:
        message = "It is currently NIGHTTIME."
        m, s = divmod(seconds, 5)
    h, m = divmod(m, 60)
    h = h + 7#calibration
    if h >= 24:#reset
        h = 0
    print(message)#Change this to webserver django display update
    print ("%d:%02d" % (h, m))# ^
    if time.time() > newStart:
        start = newStart
        nightStart = start + (200 * 60)
        newStart = start + (240 * 60)
