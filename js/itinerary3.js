// window.localStorage.clear(); //clear all localstorage
var modalBtn3 = document.querySelector(".modal-btn3");
var modalBg3 = document.querySelector(".bg-modal3");
var modalClose3 = document.querySelector(".close-cal3");
var modalCreate3 = document.querySelector(".create-cal3");

modalBtn3.addEventListener("click", function () {
  modalBg3.classList.add("bg-active");
  hideUpdate3();
});

modalClose3.addEventListener("click", function () {
  modalBg3.classList.remove("bg-active");
});

modalCreate3.addEventListener("click", function () {
  modalBg3.classList.remove("bg-active");
});

let itineraries3 = [];
var obj3 = JSON.parse(localStorage.getItem("MyItineraryList3")); // An object :D

function displayItineraries3(itineraries3) {
  for (let i = 0; i < itineraries3.length; i++) {
    const myArray = Object.values(itineraries3[i]);
    document.getElementById("title-i3" + String(i)).innerHTML = myArray[0];
    document.getElementById("loc-i3" + String(i)).innerHTML = myArray[1];
    document.getElementById("start-time-i3" + String(i)).innerHTML = myArray[2];
    document.getElementById("add-info-i3" + String(i)).innerHTML = myArray[3];
  }
}

function hideItineraries3(itineraries3) {
  for (let i = 0; i < itineraries3.length; i++) {
    document.getElementById("title-i3" + String(i)).innerHTML = "";
    document.getElementById("loc-i3" + String(i)).innerHTML = "";
    document.getElementById("start-time-i3" + String(i)).innerHTML = "";
    document.getElementById("add-info-i3" + String(i)).innerHTML = "";
  }
}

const addItinerary3 = (ev) => {
  ev.preventDefault(); //to stop the form submitting
  let itinerary3 = {
    title: document.getElementById("i-title3").value,
    loc: document.getElementById("i-loc3").value,
    start_time: document.getElementById("i-starttime3").value,
    add_info: document.getElementById("i-addinfo3").value,
    full_add: document.getElementById("exactLoc3").value,
    lat: document.getElementById("lat").innerHTML,
    lng: document.getElementById("lon").innerHTML,
    place_id: document.getElementById("place_id").innerHTML,
  };

  if (itinerary3.title == "" || itinerary3.loc == "" || itinerary3.start_time == "") {
    alert("Please fill out all fields");
    modalBg.classList.add("bg-active");
    return; } 
  else if (itinerary3.full_add == "" || itinerary3.lat == "" || itinerary3.lng == "" || itinerary3.place_id == "") { 
    alert("Please search location and select from dropdown"); 
    modalBg.classList.add("bg-active");
    return; }
  itineraries3.push(itinerary3);

  if (itineraries.length !== 0) {
    displayItineraries3(itineraries3);
  }
  localStorage.setItem("MyItineraryList3", JSON.stringify(itineraries3));
  selfRefresh3();
  resetForm3(); // to clear the form for the next entries
  hideIndiIt3();
};;;

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("contact-submit3").addEventListener("click", addItinerary3);
});

if (obj3 != null) {
  for (let i = 0; i < obj3.length; i++) {
    itineraries3.push(Object.values(obj3[i]));
  }
}

function resetForm3() {
  document.getElementById("iti-form3").reset();
}

displayItineraries3(itineraries3);

function removeItineraries3(i) {
  hideItineraries3(itineraries3);
  itineraries3.splice(i, 1);
  displayItineraries3(itineraries3);
  localStorage.removeItem("MyItineraryList3"); //remove one item
  localStorage.setItem("MyItineraryList3", JSON.stringify(itineraries3));
  hideIndiIt3();
}

function editItinerary3(i) {
  document.getElementById("i-title3").value = itineraries3[i][0];
  document.getElementById("i-loc3").value = itineraries3[i][1];
  document.getElementById("i-starttime3").value = itineraries3[i][2];
  document.getElementById("i-addinfo3").value = itineraries3[i][3];
  document.getElementById("exactLoc3").value = itineraries3[i][4];
  modalBg3.classList.add("bg-active");
  document.getElementById("contact-update3").setAttribute("onclick", "updateItinerary3(" + i + ");");
}

function updateItinerary3(i) {
  if (document.getElementById("i-title3").value == "" || document.getElementById("i-loc3").value == "" || document.getElementById("i-starttime3").value == "") {
    alert("Please fill out all fields");
    modalBg3.classList.add("bg-active");
    return; }
  else if (document.getElementById("exactLoc3").value == "" || document.getElementById("lat").innerHTML == "" || document.getElementById("lon").innerHTML == "" || document.getElementById("place_id").innerHTML == "") {
    alert("Please search location and select from dropdown");
    modalBg3.classList.add("bg-active");
    return; }
  itineraries3[i][0] = document.getElementById("i-title3").value;
  itineraries3[i][1] = document.getElementById("i-loc3").value;
  itineraries3[i][2] = document.getElementById("i-starttime3").value;
  itineraries3[i][3] = document.getElementById("i-addinfo3").value;
  itineraries3[i][4] = document.getElementById("exactLoc3").value;
  itineraries3[i][5] = document.getElementById("lat").innerHTML;
  itineraries3[i][6] = document.getElementById("lon").innerHTML;
  itineraries3[i][7] = document.getElementById("place_id").innerHTML;
  localStorage.setItem("MyItineraryList3", JSON.stringify(itineraries3));
  modalBg3.classList.remove("bg-active");
  resetForm3();
  hideUpdate3();
  displayItineraries3(itineraries3);
}

function hideIndiIt3() {
  for (let i = 0; i < 7; i++) {
    if (document.getElementById("start-time-i3" + String(i)).innerText === "") {
      document.getElementById("table-i3" + String(i)).style.display = "none";
      if (i != 0) {
        document.getElementById("route-i3" + String(i)).style.display = "none";
      }
    } else {
      document.getElementById("table-i3" + String(i)).style.display = "block";
      if (i != 0) {
        document.getElementById("route-i3" + String(i)).style.display = "block";
      }
    }
  }
}
hideIndiIt3();

function selfRefresh3() {
  itineraries3 = [];
  var obj3 = JSON.parse(localStorage.getItem("MyItineraryList3")); // An object :D
  for (let i = 0; i < obj3.length; i++) {
    itineraries3.push(Object.values(obj3[i]));
  }
  localStorage.removeItem("MyItineraryList3"); //remove one item
  localStorage.setItem("MyItineraryList3", JSON.stringify(itineraries3));
}

function hideSubmit3() {
  document.getElementById("contact-submit3").style.display = "none";
  document.getElementById("contact-update3").style.display = "block";
}

function hideUpdate3() {
  document.getElementById("contact-update3").style.display = "none";
  document.getElementById("contact-submit3").style.display = "block";
}

function moveItinerary3(i, j) {
  if (itineraries3.length > j) {
    let temp = itineraries3[i];
    itineraries3[i] = itineraries3[j];
    itineraries3[j] = temp;
    localStorage.setItem("MyItineraryList3", JSON.stringify(itineraries3));
    selfRefresh3();
    displayItineraries3(itineraries3);
  }
}

function showForm3(i) {
  if (itineraries3.length > i) {
    document.getElementById("time-form3" + String(i)).style.display = "block";
    document.getElementById("start-time-i3" + String(i)).style.display = "none";
    document.getElementById("i-starttime3" + String(i)).value = itineraries3[i][2];
  }
}
function hideForm3(i) {
  document.getElementById("time-form3" + String(i)).style.display = "none";
}
function saveTime3(i) {
  document.getElementById("start-time-i3" + String(i)).style.display = "block";
  if (document.getElementById("i-starttime3" + String(i)).value == "") {
    alert("Time cannot be empty");
    return;}
  itineraries3[i][2] = document.getElementById("i-starttime3" + String(i)).value;
  localStorage.setItem("MyItineraryList3", JSON.stringify(itineraries3));
  displayItineraries3(itineraries3);
}