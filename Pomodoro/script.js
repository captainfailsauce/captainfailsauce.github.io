$(document).ready(function () {
    var sessionLength = 1500,
        breakLength = 300,
        onBreak = false,
        timerActive = false,
        clockRemaining,
        t,
        mm,
        ss,

        //update clock display function
        updateClock = function () {
            //parse to minutes
            mm = Math.floor(clockRemaining / 60);
            //prepend extra char if req.
            if (mm < 10) {
                mm = '0' + mm;
            }
            //remainder as seconds
            ss = clockRemaining % 60;
            if (ss < 10) {
                ss = '0' + ss;
            }
            $('#mm').text(mm);
            $('#ss').text(ss);
        },

        //init timer function
        startTimer = function () {
            if (onBreak) {
                clockRemaining = breakLength;
            } else {
                clockRemaining = sessionLength;
            }
            stopTimer();
            t = setTimeout(timer, 1000);
        },
        //timer function
        timer = function () {
            clockRemaining--;
            updateClock();
            t = setTimeout(timer, 1000);
            //timeout
            if (clockRemaining === 0) {
                onBreak = !onBreak;
                startTimer();
            }
        },
        //halt timer
        stopTimer = function () {
            clearTimeout(t);
        };

    //session length decrement button & counter update
    $('#session-decrement').click(function () {
        if (sessionLength > 60) {
            sessionLength -= 60;
            $('#session-length').text(sessionLength / 60);
            clockRemaining = sessionLength;
            updateClock();
        }
    });

    //session length increment button
    $('#session-increment').click(function () {
        sessionLength += 60;
        $('#session-length').text(+sessionLength / 60);
        clockRemaining = sessionLength;
        updateClock();
    });

    //break length decrement button
    $('#break-decrement').click(function () {
        if (breakLength > 60) {
            breakLength -= 60;
            $('#break-length').text(breakLength / 60);
            updateClock();
        }
    });

    //break length increment button
    $('#break-increment').click(function () {
        breakLength += 60;
        $('#break-length').text(breakLength / 60);
        updateClock();
    });

    //toggle timer
    $('.clock').click(function () {
        if (timerActive) {
            stopTimer();
            timerActive = false;
        } else {
            startTimer();
            timerActive = true;
        }
    });
});