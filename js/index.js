$(document).ready(function () {
  $(".toggle").click(function () {
    $("aside").toggleClass("close");
  });
});

$(document).ready(function () {
  $(".toggle").click(function () {
    $("ul").toggleClass("close");
  });
});

function w3_open(i) {
  if (document.getElementById("mySidebar" + String(i)).style.visibility == "visible") {
    document.getElementById("mySidebar" + String(i)).style.display = "block";
    document.getElementById("nav1").style.display = "none"; 
  }
  else {
    w3_open(i - 1);
  }
}

function w3_close(i) {
  document.getElementById("mySidebar" + String(i)).style.display = "none";
  document.getElementById("nav1").style.display = "block";
}

// click outside
$(document).mouseup(function (e) {
  var container = $("aside");
  var container1 = $("form")
  if (!container.is(e.target) && container.has(e.target).length === 0 &&
  !container1.is(e.target) && container1.has(e.target).length === 0) {
    $("aside").removeClass("close");
  }
});

function closeSide() {
  $("aside").removeClass("close");
  setTimeout(function () {
    w3_close();
  }, 800);
}

$(document).mouseup(function (e) {
  var container = $("dropdown-content");
  if (!container.is(e.target) && container.has(e.target).length === 0) {
    $("dropdown-content").removeClass("close");
  }
});

function hideMenu() {
  document.getElementById("mainmenu").style.display = "none";
  document.getElementById("nav1").style.display = "block";
}

function showMenu () {
  document.getElementById("mainmenu").style.display = "block";
  document.getElementById("nav1").style.display = "none";
}

/*watch*/
var timerVar = setInterval(countTimer, 1000);
var totalSeconds = 1;
function countTimer() {
           ++totalSeconds;
           var hour = Math.floor(totalSeconds /3600);
           var minute = Math.floor((totalSeconds - hour*3600)/60);
           var seconds = totalSeconds - (hour*3600 + minute*60);
           if(hour < 10)
             hour = "0"+hour;
           if(minute < 10)
             minute = "0"+minute;
           if(seconds < 10)
             seconds = "0"+seconds;
           document.getElementById("timer").innerHTML = hour + ":" + minute + ":" + seconds;
        }

/* alert for topwatch*/
function myAlert() {
  alert("You have completed the study. Please remember to indicate the timing and the number of clicks as stated in the survey. Select OK to continue. ")
  alert( " Total seconds taken : " + totalSeconds +" Total number of Clicks :  " + count )
}

/*count*/
let count = 0;
      let btn = document.querySelector('html');
      let divSection = document.getElementById('showCount');
      btn.addEventListener('click', (e)=>{
        count++;
        divSection.innerHTML=`Number of Clicks are: ${count}`;
     });

// does not allow enter to submit form 
 $(document).on("keydown", "form", function (event) {
   return event.key != "Enter";
 });