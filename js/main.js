'use strict';

var bpmTimings = {
    first: false,
    last: false,
    bpm: false,
    resetTimer: false
};


function setBpmView(bpm) {
    var $bpmResult = document.getElementById('bpm-result');
    var $bpmName = document.getElementById('bpm-name');
    $bpmResult.innerText = bpm;

    //TODO : write if else cases for $bpmName and change it accordingly
    $bpmName.innerText = 'Largo';
}


function dateDiff(firstDate, lastDate) {
    var timeDiff = Math.abs(lastDate.getTime() - firstDate.getTime());
    timeDiff = timeDiff / (1000);
    console.log(timeDiff);
    return timeDiff;
}

function oneBeatToBpm(oneBeatTime) {
    return Math.ceil((1 * 60) / oneBeatTime);
}

/**
 * on first click set bpm as 0 and first-last the same date obj
 * on later clicks set first as last entry and last as current time
 * and calculate bpm from the difference of first and last
 */
function setBpmTiming() {

    function isInitialState(bpmTimings) {
        return (bpmTimings.first === false && bpmTimings.last === false && bpmTimings.bpm === false);
    }
    
    function setTimerForReset(bpmTimings) {
        clearTimeout(bpmTimings.resetTimer);

        bpmTimings.resetTimer = setTimeout(function(){
            bpmTimings.first = bpmTimings.last = bpmTimings.bpm = false;
        },3000);

    }


    setTimerForReset(bpmTimings);


    if (isInitialState(bpmTimings)) {
        bpmTimings.bpm = 0;
        bpmTimings.first = bpmTimings.last = new Date();
    } else {
        bpmTimings.first = new Date(bpmTimings.last);
        bpmTimings.last = new Date();
        bpmTimings.bpm = oneBeatToBpm(dateDiff(bpmTimings.first, bpmTimings.last))
    }

    console.log(bpmTimings.bpm)

    setBpmView(bpmTimings.bpm);
}

document.addEventListener('keydown', (event) => {
    var keyCode = event.keyCode;

    if (keyCode === 32) {
        event.preventDefault();
        setBpmTiming()
    }
}, false);