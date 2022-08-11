// window.localStorage.clear(); //clear all localstorage
var modalBtn4 = document.querySelector(".modal-btn4");
var modalBg4 = document.querySelector(".bg-modal4");
var modalClose4 = document.querySelector(".close-cal4");
var modalCreate4 = document.querySelector(".create-cal4");

modalBtn4.addEventListener("click", function () {
  modalBg4.classList.add("bg-active");
  hideUpdate4();
});

modalClose4.addEventListener("click", function () {
  modalBg4.classList.remove("bg-active");
});

modalCreate4.addEventListener("click", function () {
  modalBg4.classList.remove("bg-active");
});

let itineraries4 = [];
var obj4 = JSON.parse(localStorage.getItem("MyItineraryList4")); // An object :D

function displayItineraries4(itineraries4) {
  for (let i = 0; i < itineraries4.length; i++) {
    const myArray = Object.values(itineraries4[i]);
    document.getElementById("title-i4" + String(i)).innerHTML = myArray[0];
    document.getElementById("loc-i4" + String(i)).innerHTML = myArray[1];
    document.getElementById("start-time-i4" + String(i)).innerHTML = myArray[2];
    document.getElementById("add-info-i4" + String(i)).innerHTML = myArray[3];
  }
}

function hideItineraries4(itineraries4) {
  for (let i = 0; i < itineraries4.length; i++) {
    document.getElementById("title-i4" + String(i)).innerHTML = "";
    document.getElementById("loc-i4" + String(i)).innerHTML = "";
    document.getElementById("start-time-i4" + String(i)).innerHTML = "";
    document.getElementById("add-info-i4" + String(i)).innerHTML = "";
  }
}

const addItinerary4 = (ev) => {
  ev.preventDefault(); //to stop the form submitting
  let itinerary4 = {
    title: document.getElementById("i-title4").value,
    loc: document.getElementById("i-loc4").value,
    start_time: document.getElementById("i-starttime4").value,
    add_info: document.getElementById("i-addinfo4").value,
    full_add: document.getElementById("exactLoc4").value,
    lat: document.getElementById("lat").innerHTML,
    lng: document.getElementById("lon").innerHTML,
    place_id: document.getElementById("place_id").innerHTML,
  };

  if (itinerary4.title == "" || itinerary4.loc == "" || itinerary4.start_time == "") {
    alert("Please fill out all fields");
    modalBg.classList.add("bg-active");
    return; } 
  else if (itinerary4.full_add == "" || itinerary4.lat == "" || itinerary4.lng == "" || itinerary4.place_id == "") { 
    alert("Please search location and select from dropdown"); 
    modalBg.classList.add("bg-active");
    return; }
  itineraries4.push(itinerary4);

  if (itineraries.length !== 0) {
    displayItineraries(itineraries);
  }
  localStorage.setItem("MyItineraryList4", JSON.stringify(itineraries4));
  selfRefresh4();
  resetForm4(); // to clear the form for the next entries
  hideIndiIt4();
};;;

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("contact-submit4").addEventListener("click", addItinerary4);
});

if (obj4 != null) {
  for (let i = 0; i < obj4.length; i++) {
    itineraries4.push(Object.values(obj4[i]));
  }
}

function resetForm4() {
  document.getElementById("iti-form4").reset();
}

displayItineraries4(itineraries4);

function removeItineraries4(i) {
  hideItineraries4(itineraries4);
  itineraries4.splice(i, 1);
  displayItineraries4(itineraries4);
  localStorage.removeItem("MyItineraryList4"); //remove one item
  localStorage.setItem("MyItineraryList4", JSON.stringify(itineraries4));
  hideIndiIt4();
}

function editItinerary4(i) {
  document.getElementById("i-title4").value = itineraries4[i][0];
  document.getElementById("i-loc4").value = itineraries4[i][1];
  document.getElementById("i-starttime4").value = itineraries4[i][2];
  document.getElementById("i-addinfo4").value = itineraries4[i][3];
  document.getElementById("exactLoc4").value = itineraries4[i][4];
  modalBg4.classList.add("bg-active");
  document.getElementById("contact-update4").setAttribute("onclick", "updateItinerary4(" + i + ");");
}

function updateItinerary4(i) {
  if (document.getElementById("i-title4").value == "" || document.getElementById("i-loc4").value == "" || document.getElementById("i-starttime4").value == "") {
    alert("Please fill out all fields");
    modalBg4.classList.add("bg-active");
    return; }
  else if (document.getElementById("exactLoc4").value == "" || document.getElementById("lat").innerHTML == "" || document.getElementById("lon").innerHTML == "" || document.getElementById("place_id").innerHTML == "") {
    alert("Please search location and select from dropdown");
    modalBg4.classList.add("bg-active");
    return; }
  itineraries4[i][0] = document.getElementById("i-title4").value;
  itineraries4[i][1] = document.getElementById("i-loc4").value;
  itineraries4[i][2] = document.getElementById("i-starttime4").value;
  itineraries4[i][3] = document.getElementById("i-addinfo4").value;
  itineraries4[i][4] = document.getElementById("exactLoc4").value;
  itineraries4[i][5] = document.getElementById("lat").innerHTML;
  itineraries4[i][6] = document.getElementById("lon").innerHTML;
  itineraries4[i][7] = document.getElementById("place_id").innerHTML;
  localStorage.setItem("MyItineraryList4", JSON.stringify(itineraries4));
  modalBg4.classList.remove("bg-active");
  resetForm4();
  hideUpdate4();
  displayItineraries4(itineraries4);
}

function hideIndiIt4() {
  for (let i = 0; i < 7; i++) {
    if (document.getElementById("start-time-i4" + String(i)).innerText === "") {
      document.getElementById("table-i4" + String(i)).style.display = "none";
      if (i != 0) {
        document.getElementById("route-i4" + String(i)).style.display = "none";
      }
    } else {
      document.getElementById("table-i4" + String(i)).style.display = "";
      if (i != 0) {
        document.getElementById("route-i4" + String(i)).style.display = "";
      }
    }
  }
}
hideIndiIt4();

function selfRefresh4() {
  itineraries4 = [];
  var obj4 = JSON.parse(localStorage.getItem("MyItineraryList4")); // An object :D
  for (let i = 0; i < obj4.length; i++) {
    itineraries4.push(Object.values(obj4[i]));
  }
  localStorage.removeItem("MyItineraryList4"); //remove one item
  localStorage.setItem("MyItineraryList4", JSON.stringify(itineraries4));
}

function hideSubmit4() {
  document.getElementById("contact-submit4").style.display = "none";
  document.getElementById("contact-update4").style.display = "block";
}

function hideUpdate4() {
  document.getElementById("contact-update4").style.display = "none";
  document.getElementById("contact-submit4").style.display = "block";
}

function moveItinerary4(i, j) {
  if (itineraries4.length > j) {
    let temp = itineraries4[i];
    itineraries4[i] = itineraries4[j];
    itineraries4[j] = temp;
    localStorage.setItem("MyItineraryList4", JSON.stringify(itineraries4));
    selfRefresh4();
    displayItineraries4(itineraries4);
  }
}

function showForm4(i) {
  if ( i < itineraries4.length ) {
  document.getElementById("time-form4" + String(i)).style.display = "block";
  document.getElementById("start-time-i4" + String(i)).style.display = "none";
  document.getElementById("i-starttime4" + String(i)).value = itineraries4[i][2];
  }
}
function hideForm4(i) {
  document.getElementById("time-form4" + String(i)).style.display = "none";
}
function saveTime4(i) {
  document.getElementById("start-time-i4" + String(i)).style.display = "block";
  if (document.getElementById("i-starttime4" + String(i)).value == "") {
    alert("Time cannot be empty");
    return;}
  itineraries4[i][2] = document.getElementById("i-starttime4" + String(i)).value;
  localStorage.setItem("MyItineraryList4", JSON.stringify(itineraries4));
  displayItineraries4(itineraries4);
}