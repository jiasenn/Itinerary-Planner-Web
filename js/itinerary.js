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
    start_time: document.getElementById("i-starttime0").value,
    // end_loc: document.getElementById("i-endloc").value,
    // end_time: document.getElementById("i-endtime").value,
    add_info: document.getElementById("i-addinfo").value,
    full_add: document.getElementById("exactLoc1").value,
    lat: document.getElementById("lat").innerHTML,
    lng: document.getElementById("lon").innerHTML,
    place_id: document.getElementById("place_id").innerHTML,
  };

  if (itinerary.title == "" || itinerary.loc == "" || itinerary.start_time == "") {
    alert("Please fill out all fields");
    modalBg.classList.add("bg-active");
    return; } 
  else if (itinerary.full_add == "" || itinerary.lat == "" || itinerary.lng == "" || itinerary.place_id == "") { 
    alert("Please search location and select from dropdown"); 
    modalBg.classList.add("bg-active");
    return; }

  itineraries.push(itinerary);
  //document.querySelector('form').reset();

  //for display purposes only
  // console.warn("added", { plans });
  // let pre = document.querySelector("#msg pre");
  // pre.textContent = "\n" + JSON.stringify(plans, "\t", 2);
  if (itineraries.length !== 0) {
    displayItineraries(itineraries);
  }

  localStorage.setItem("MyItineraryList", JSON.stringify(itineraries));
  selfRefresh1();
  resetForm1(); // to clear the form for the next entries
  hideIndiIt();
};;;

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("contact-submit").addEventListener("click", addItinerary);
});

if (obj1 != null) {
  for (let i = 0; i < obj1.length; i++) {
    itineraries.push(Object.values(obj1[i]));
  }
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
  hideIndiIt();
}

function editItinerary(i) {
  document.getElementById("i-title").value = itineraries[i][0];
  document.getElementById("i-loc").value = itineraries[i][1];
  document.getElementById("i-starttime0").value = itineraries[i][2];
  document.getElementById("i-addinfo").value = itineraries[i][3];
  document.getElementById("exactLoc1").value = itineraries[i][4];
  modalBg.classList.add("bg-active");
  document.getElementById("contact-update").setAttribute("onclick", "updateItinerary(" + i + ");");
}

// document.getElementById('price').onchange = function() {
//     this.value = this.value.match(/\d*\.?\d+/);
// };

function updateItinerary(i) {
  if (document.getElementById("i-title").value == "" || document.getElementById("i-loc").value == "" || document.getElementById("i-starttime0").value == "") {
    alert("Please fill out all fields");
    modalBg.classList.add("bg-active");
    return; }
  else if (document.getElementById("exactLoc1").value == "" || document.getElementById("lat").innerHTML == "" || document.getElementById("lon").innerHTML == "" || document.getElementById("place_id").innerHTML == "") {
    alert("Please search location and select from dropdown");
    modalBg.classList.add("bg-active");
    return; }
  itineraries[i][0] = document.getElementById("i-title").value;
  itineraries[i][1] = document.getElementById("i-loc").value;
  itineraries[i][2] = document.getElementById("i-starttime0").value;
  itineraries[i][3] = document.getElementById("i-addinfo").value;
  itineraries[i][4] = document.getElementById("exactLoc1").value;
  itineraries[i][5] = document.getElementById("lat").innerHTML;
  itineraries[i][6] = document.getElementById("lon").innerHTML;
  itineraries[i][7] = document.getElementById("place_id").innerHTML;
  localStorage.setItem("MyItineraryList", JSON.stringify(itineraries));
  modalBg.classList.remove("bg-active");
  resetForm1();
  hideUpdate();
  displayItineraries(itineraries);
}

function hideIndiIt() {
  for (let i = 0; i < 7; i++) {
    if (document.getElementById("start-time-i" + String(i)).innerText === "") {
      document.getElementById("table-i" + String(i)).style.display = "none";
      if (i != 0 ) {
        document.getElementById("route-i" + String(i)).style.display = "none";
      }
    }
    else {
      document.getElementById("table-i" + String(i)).style.display = "";
      if (i != 0 ) {
        document.getElementById("route-i" + String(i)).style.display = "";
      }
    }
  }
}
hideIndiIt();

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

function moveItinerary(i, j) {
  if (itineraries.length > j) {
    let temp = itineraries[i];
    itineraries[i] = itineraries[j];
    itineraries[j] = temp;
    localStorage.setItem("MyItineraryList", JSON.stringify(itineraries));
    displayItineraries(itineraries);
  }
}

function showForm(i) {
  if (itineraries.length > i) {
    document.getElementById("time-form" + String(i)).style.display = "block";
    document.getElementById("start-time-i" + String(i)).style.display = "none";
    document.getElementById("i-starttime0" + String(i)).value = itineraries[i][2];
  }
}
function hideForm(i) {
  document.getElementById("time-form" + String(i)).style.display = "none";
}
function saveTime(i) {
  document.getElementById("start-time-i" + String(i)).style.display = "block";
  if (document.getElementById("i-starttime0" + String(i)).value == "") {
    alert("Time cannot be empty");
    return;
  }
  itineraries[i][2] = document.getElementById("i-starttime0" + String(i)).value;
  localStorage.setItem("MyItineraryList", JSON.stringify(itineraries));
  displayItineraries(itineraries);
}