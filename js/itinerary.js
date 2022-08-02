// window.localStorage.clear(); //clear all localstorage
var modalBtn = document.querySelector(".modal-btn");
var modalBg = document.querySelector(".bg-modal");
var modalClose = document.querySelector(".close-cal");
var modalCreate = document.querySelector(".create-cal");
// var editIBtn = document.querySelector(".editI-btn"); 


modalBtn.addEventListener("click", function () {
  modalBg.classList.add("bg-active");
  hideUpdate();
});

modalClose.addEventListener("click", function () {
  modalBg.classList.remove("bg-active");
});
modalCreate.addEventListener("click", function () {
  modalBg.classList.remove("bg-active");
});

let itineraries = [];
var obj1 = JSON.parse(localStorage.getItem("MyItineraryList")); // An object :D

function displayItineraries(itineraries) {
  for (let i = 0; i < itineraries.length; i++) {
    const myArray = Object.values(itineraries[i]);
    document.getElementById("title-i" + String(i)).innerHTML = myArray[0];
    document.getElementById("loc-i" + String(i)).innerHTML = myArray[1];
    document.getElementById("start-time-i" + String(i)).innerHTML = myArray[2];
    document.getElementById("add-info-i" + String(i)).innerHTML = myArray[3];
  }
}

function hideItineraries(itineraries) {
  for (let i = 0; i < itineraries.length; i++) {
    document.getElementById("title-i" + String(i)).innerHTML = "";
    document.getElementById("loc-i" + String(i)).innerHTML = "";
    document.getElementById("start-time-i" + String(i)).innerHTML = "";
    document.getElementById("add-info-i" + String(i)).innerHTML = "";
  }
}
// example {id:1592304983049, title: 'Deadpool', year: 2015}
const addItinerary = (ev) => {
  ev.preventDefault(); //to stop the form submitting
  let itinerary = {
    // id: Date.now(),
    title: document.getElementById("i-title").value,
    loc: document.getElementById("i-loc").value,
    // start_loc: document.getElementById("i-startloc").value,
    start_time: document.getElementById("i-starttime").value,
    // end_loc: document.getElementById("i-endloc").value,
    // end_time: document.getElementById("i-endtime").value,
    add_info: document.getElementById("i-addinfo").value,
    full_add: document.getElementById("exactLoc").value,
    lat: document.getElementById("lat").innerHTML,
    lng: document.getElementById("lon").innerHTML,
  };
  itineraries.push(itinerary);
  document.forms[0].reset(); // to clear the form for the next entries
  //document.querySelector('form').reset();

  //for display purposes only
  // console.warn("added", { plans });
  // let pre = document.querySelector("#msg pre");
  // pre.textContent = "\n" + JSON.stringify(plans, "\t", 2);
  if (itineraries.length !== 0) {
    displayItineraries(itineraries);
  };

  localStorage.setItem("MyItineraryList", JSON.stringify(itineraries));
  selfRefresh1();
};

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("contact-submit").addEventListener("click", addItinerary);
});

for (let i = 0; i < obj1.length; i++) {
  itineraries.push(Object.values(obj1[i]));
}


function resetForm1() {
  document.getElementById("iti-form").reset();
}

displayItineraries(itineraries);

function removeItineraries(i) {
  hideItineraries(itineraries);
  itineraries.splice(i, 1);
  displayItineraries(itineraries);
  localStorage.removeItem("MyItineraryList"); //remove one item
  localStorage.setItem("MyItineraryList", JSON.stringify(itineraries));
}

function editItinerary(i) {
  selfRefresh1();
  modalBg.classList.add("bg-active");
  document.getElementById("i-title").value = itineraries[i][0];
  document.getElementById("i-loc").value = itineraries[i][1];
  document.getElementById("i-starttime").value = itineraries[i][2];
  document.getElementById("i-addinfo").value = itineraries[i][3];
  document.getElementById("exactLoc").value = itineraries[i][4];
  document.getElementById("contact-update").setAttribute("onclick", "updateItinerary(" + i + ");");
}

function arraymove(arr, fromIndex, toIndex) {
  var element = arr[fromIndex];
  arr.splice(fromIndex, 1);
  arr.splice(toIndex, 0, element);
}
/*watch*/

var timerVar = setInterval(countTimer, 1000);
var totalSeconds = 0;
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

function updateItinerary(i) {
  itineraries[i][0] = document.getElementById("i-title").value;
  itineraries[i][1] = document.getElementById("i-loc").value;
  itineraries[i][2] = document.getElementById("i-starttime").value;
  itineraries[i][3] = document.getElementById("i-addinfo").value;
  itineraries[i][4] = document.getElementById("exactLoc").value;
  localStorage.setItem("MyItineraryList", JSON.stringify(itineraries));
  modalBg.classList.remove("bg-active");
  resetForm1();
  hideUpdate();
  displayItineraries(itineraries);
}

function selfRefresh1() {
  itineraries = [];
  var obj1 = JSON.parse(localStorage.getItem("MyItineraryList")); // An object :D
  for (let i = 0; i < obj1.length; i++) {
    itineraries.push(Object.values(obj1[i]));
  }
  localStorage.removeItem("MyItineraryList"); //remove one item
  localStorage.setItem("MyItineraryList", JSON.stringify(itineraries));
  console.log()
}

function hideSubmit() {
  document.getElementById("contact-submit").style.display = "none";
  document.getElementById("contact-update").style.display = "block";

}

function hideUpdate() {
  document.getElementById("contact-update").style.display = "none";
  document.getElementById("contact-submit").style.display = "block";
}


