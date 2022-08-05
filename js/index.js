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

var header1 = document.getElementById("toggle1");
var btns1 = header1.getElementsByClassName("btn1");
for (var i = 0; i < btns1.length; i++) {
  btns1[i].addEventListener("click", function () {
    var current1 = document.getElementsByClassName("active");
    current1[0].className = current1[0].className.replace(" active", "");
    this.className += " active";
  });
}
var header2 = document.getElementById("toggle2");
var btns2 = header2.getElementsByClassName("btn2");
for (var i = 0; i < btns2.length; i++) {
  btns2[i].addEventListener("click", function () {
    var current2 = document.getElementsByClassName("active2");
    console.log(current2[0]);
    current2[0].className = current2[0].className.replace(" active2", "");
    this.className += " active2";
  });
}
var header3 = document.getElementById("toggle3");
var btns3 = header3.getElementsByClassName("btn3");
for (var i = 0; i < btns3.length; i++) {
  btns3[i].addEventListener("click", function () {
    var current3 = document.getElementsByClassName("active3");
    console.log(current3[0]);
    current3[0].className = current3[0].className.replace(" active3", "");
    this.className += " active3";
  });
}
var header4 = document.getElementById("toggle4");
var btns4 = header4.getElementsByClassName("btn4");
for (var i = 0; i < btns4.length; i++) {
  btns4[i].addEventListener("click", function () {
    var current4 = document.getElementsByClassName("active4");
    console.log(current4[0]);
    current4[0].className = current4[0].className.replace(" active4", "");
    this.className += " active4";
  });
}
var header5 = document.getElementById("toggle5");
var btns5 = header5.getElementsByClassName("btn5");
for (var i = 0; i < btns5.length; i++) {
  btns5[i].addEventListener("click", function () {
    var current5 = document.getElementsByClassName("active5");
    console.log(current5[0]);
    current5[0].className = current5[0].className.replace(" active5", "");
    this.className += " active5";
  });
}
var header6 = document.getElementById("toggle6");
var btns6 = header6.getElementsByClassName("btn6");
for (var i = 0; i < btns6.length; i++) {
  btns6[i].addEventListener("click", function () {
    var current6 = document.getElementsByClassName("active6");
    console.log(current6[0]);
    current6[0].className = current6[0].className.replace(" active6", "");
    this.className += " active6";
  });
}
