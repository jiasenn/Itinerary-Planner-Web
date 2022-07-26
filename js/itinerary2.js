// window.localStorage.clear(); //clear all localstorage
var modalBtn2 = document.querySelector(".modal-btn2");
var modalBg2 = document.querySelector(".bg-modal2");
var modalClose2 = document.querySelector(".close-cal2");
var modalCreate2 = document.querySelector(".create-cal2");

modalBtn2.addEventListener("click", function () {
  modalBg2.classList.add("bg-active");
  hideUpdate2();
});

modalClose2.addEventListener("click", function () {
  modalBg2.classList.remove("bg-active");
});

modalCreate2.addEventListener("click", function () {
  modalBg2.classList.remove("bg-active");
});

let itineraries2 = [];
var obj2 = JSON.parse(localStorage.getItem("MyItineraryList2")); // An object :D

function displayItineraries2(itineraries2) {
  for (let i = 0; i < itineraries2.length; i++) {
    const myArray = Object.values(itineraries2[i]);
    document.getElementById("title-i2" + String(i)).innerHTML = myArray[0];
    document.getElementById("loc-i2" + String(i)).innerHTML = myArray[1];
    document.getElementById("start-time-i2" + String(i)).innerHTML = myArray[2];
    document.getElementById("add-info-i2" + String(i)).innerHTML = myArray[3];
  }
}

function hideItineraries2(itineraries2) {
  for (let i = 0; i < itineraries2.length; i++) {
    document.getElementById("title-i2" + String(i)).innerHTML = "";
    document.getElementById("loc-i2" + String(i)).innerHTML = "";
    document.getElementById("start-time-i2" + String(i)).innerHTML = "";
    document.getElementById("add-info-i2" + String(i)).innerHTML = "";
  }
}

const addItinerary2 = (ev) => {
  ev.preventDefault(); //to stop the form submitting
  let itinerary2 = {
    title: document.getElementById("i-title2").value,
    loc: document.getElementById("i-loc2").value,
    start_time: document.getElementById("i-starttime2").value,
    add_info: document.getElementById("i-addinfo2").value,
    full_add: document.getElementById("exactLoc2").value,
    lat: document.getElementById("lat").innerHTML,
    lng: document.getElementById("lon").innerHTML,
    place_id: document.getElementById("place_id").innerHTML,
  };

  if (itinerary2.title == "" || itinerary2.loc == "" || itinerary2.start_time == "") {
    alert("Please fill out all fields");
    modalBg.classList.add("bg-active");
    return; } 
  else if (itinerary2.full_add == "" || itinerary2.lat == "" || itinerary2.lng == "" || itinerary2.place_id == "") { 
    alert("Please search location and select from dropdown"); 
    modalBg.classList.add("bg-active");
    return; }
  itineraries2.push(itinerary2);

  if (itineraries.length !== 0) {
    displayItineraries2(itineraries2);
  }
  localStorage.setItem("MyItineraryList2", JSON.stringify(itineraries2));
  selfRefresh2();
  resetForm2(); // to clear the form for the next entries
  hideIndiIt2();
};

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("contact-submit2").addEventListener("click", addItinerary2);
});

if (obj2 != null) {
  for (let i = 0; i < obj2.length; i++) {
    itineraries2.push(Object.values(obj2[i]));
  }
}

function resetForm2() {
  document.getElementById("iti-form4").reset();
}

displayItineraries2(itineraries2);

function removeItineraries2(i) {
  hideItineraries2(itineraries2);
  itineraries2.splice(i, 1);
  displayItineraries2(itineraries2);
  localStorage.removeItem("MyItineraryList2"); //remove one item
  localStorage.setItem("MyItineraryList2", JSON.stringify(itineraries2));
  hideIndiIt2();
}

function editItinerary2(i) {
  document.getElementById("i-title2").value = itineraries2[i][0];
  document.getElementById("i-loc2").value = itineraries2[i][1];
  document.getElementById("i-starttime2").value = itineraries2[i][2];
  document.getElementById("i-addinfo2").value = itineraries2[i][3];
  document.getElementById("exactLoc2").value = itineraries2[i][4];
  modalBg2.classList.add("bg-active");
  document.getElementById("contact-update2").setAttribute("onclick", "updateItinerary2(" + i + ");");
}

function updateItinerary2(i) {
  if (document.getElementById("i-title2").value == "" || document.getElementById("i-loc2").value == "" || document.getElementById("i-starttime2").value == "") {
    alert("Please fill out all fields");
    modalBg2.classList.add("bg-active");
    return; }
  else if (document.getElementById("exactLoc2").value == "" || document.getElementById("lat").innerHTML == "" || document.getElementById("lon").innerHTML == "" || document.getElementById("place_id").innerHTML == "") {
    alert("Please search location and select from dropdown");
    modalBg2.classList.add("bg-active");
    return; }
  itineraries2[i][0] = document.getElementById("i-title2").value;
  itineraries2[i][1] = document.getElementById("i-loc2").value;
  itineraries2[i][2] = document.getElementById("i-starttime2").value;
  itineraries2[i][3] = document.getElementById("i-addinfo2").value;
  itineraries2[i][4] = document.getElementById("exactLoc2").value;
  itineraries2[i][5] = document.getElementById("lat").innerHTML;
  itineraries2[i][6] = document.getElementById("lon").innerHTML;
  itineraries2[i][7] = document.getElementById("place_id").innerHTML;
  localStorage.setItem("MyItineraryList2", JSON.stringify(itineraries2));
  modalBg2.classList.remove("bg-active");
  resetForm2();
  hideUpdate2();
  displayItineraries2(itineraries2);
}

function hideIndiIt2() {
  for (let i = 0; i < 7; i++) {
    if (document.getElementById("start-time-i2" + String(i)).innerText === "") {
      document.getElementById("table-i2" + String(i)).style.display = "none";
      if (i != 0) {
        document.getElementById("route-i2" + String(i)).style.display = "none";
      }
    } else {
      document.getElementById("table-i2" + String(i)).style.display = "";
      if (i != 0) {
        document.getElementById("route-i2" + String(i)).style.display = "";
      }
    }
  }
}
hideIndiIt2();

function selfRefresh2() {
  itineraries2 = [];
  var obj2 = JSON.parse(localStorage.getItem("MyItineraryList2")); // An object :D
  for (let i = 0; i < obj2.length; i++) {
    itineraries2.push(Object.values(obj2[i]));
  }
  localStorage.removeItem("MyItineraryList2"); //remove one item
  localStorage.setItem("MyItineraryList2", JSON.stringify(itineraries2));
}

function hideSubmit2() {
  document.getElementById("contact-submit2").style.display = "none";
  document.getElementById("contact-update2").style.display = "block";
}

function hideUpdate2() {
  document.getElementById("contact-update2").style.display = "none";
  document.getElementById("contact-submit2").style.display = "block";
}

function moveItinerary2(i, j) {
  if (itineraries2.length > j) {
    let temp = itineraries2[i];
    itineraries2[i] = itineraries2[j];
    itineraries2[j] = temp;
    localStorage.setItem("MyItineraryList2", JSON.stringify(itineraries2));
    selfRefresh2();
    displayItineraries2(itineraries2);
  }
}

function showForm2(i) {
  if (itineraries2.length > i) {
    document.getElementById("time-form2" + String(i)).style.display = "block";
    document.getElementById("start-time-i2" + String(i)).style.display = "none";
    document.getElementById("i-starttime2" + String(i)).value = itineraries2[i][2];
  }
}
function hideForm2(i) {
  document.getElementById("time-form2" + String(i)).style.display = "none";
}
function saveTime2(i) {
  document.getElementById("start-time-i2" + String(i)).style.display = "block";
  if (document.getElementById("i-starttime2" + String(i)).value == "") {
    alert("Time cannot be empty");
    return; }
  itineraries2[i][2] = document.getElementById("i-starttime2" + String(i)).value;
  localStorage.setItem("MyItineraryList2", JSON.stringify(itineraries2));
  displayItineraries2(itineraries2);
}