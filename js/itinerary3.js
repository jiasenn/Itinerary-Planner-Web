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
  };
  itineraries3.push(itinerary3);

  if (itineraries.length !== 0) {
    displayItineraries3(itineraries3);
  }
  localStorage.setItem("MyItineraryList3", JSON.stringify(itineraries3));
  selfRefresh3();
  resetForm3(); // to clear the form for the next entries
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
  itineraries3[i][0] = document.getElementById("i-title3").value;
  itineraries3[i][1] = document.getElementById("i-loc3").value;
  itineraries3[i][2] = document.getElementById("i-starttime3").value;
  itineraries3[i][3] = document.getElementById("i-addinfo3").value;
  itineraries3[i][4] = document.getElementById("exactLoc3").value;
  itineraries3[i][5] = document.getElementById("lat").innerHTML;
  itineraries3[i][6] = document.getElementById("lon").innerHTML;
  localStorage.setItem("MyItineraryList3", JSON.stringify(itineraries3));
  modalBg3.classList.remove("bg-active");
  resetForm3();
  hideUpdate3();
  displayItineraries3(itineraries3);
}

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