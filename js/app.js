    //TIMER
    let timer = document.getElementById("timer") //this is a div that the timer will display in
    
    //sets timer on screen and starts countdown
    function setTimer(minutes) {
      timer.innerHTML =
        minutes + ":" + 00
      startTimer()
    }
    
        
    function startTimer() {
      let presentTime = timer.innerHTML
      let timeArray = presentTime.split(/[:]+/)
      let m = timeArray[0]
      var s = checkSecond((timeArray[1] - 1))
      if (s == 59) {
        m = m - 1
      }  
    
      timer.innerHTML = m + ":" + s
      let countdown = setTimeout(startTimer, 1000) //starts countdown
    
      if (m == 0 && s == 00) {
        console.log('timer completed')
        clearTimeout(countdown) //stops countdown when 0:00
      } 
    }
    
    function checkSecond(sec) {
      if (sec < 10 && sec >= 0) { sec = "0" + sec } // add zero in front of numbers < 10
      if (sec < 0) { sec = "59" } //resets to 59 seconds
      return sec
    }    