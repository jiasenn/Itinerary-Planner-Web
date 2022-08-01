// window.localStorage.clear(); //clear all localstorage
var modalBtn2 = document.querySelector(".modal-btn2");
var modalBg2 = document.querySelector(".bg-modal2");
var modalClose2 = document.querySelector(".close-cal2");
var modalCreate2 = document.querySelector(".create-cal2");
// var editIBtn = document.querySelector(".editI-btn");

modalBtn2.addEventListener("click", function () {
  modalBg2.classList.add("bg-active");
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
    // id: Date.now(),
    title: document.getElementById("i-title2").value,
    loc: document.getElementById("i-loc2").value,
    start_time: document.getElementById("i-starttime2").value,
    add_info: document.getElementById("i-addinfo2").value,
  };
  itineraries2.push(itinerary2);
  //document.querySelector('form').reset();

  //for display purposes only
  // console.warn("added", { plans });
  // let pre = document.querySelector("#msg pre");
  // pre.textContent = "\n" + JSON.stringify(plans, "\t", 2);

  displayItineraries2(itineraries2);

  localStorage.setItem("MyItineraryList2", JSON.stringify(itineraries2));
  selfRefresh2();
  document.forms[0].reset(); // to clear the form for the next entries
};;

document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("contact-submit2")
    .addEventListener("click", addItinerary2);
});

for (let i = 0; i < obj2.length; i++) {
  itineraries2.push(Object.values(obj2[i]));
}

function resetForm2() {
  document.getElementById("iti-form2").reset();
}

displayItineraries2(itineraries2);

function removeItineraries2(i) {
  hideItineraries2(itineraries2);
  itineraries2.splice(i, 1);
  displayItineraries2(itineraries2);
  localStorage.removeItem("MyItineraryList2"); //remove one item
  localStorage.setItem("MyItineraryList2", JSON.stringify(itineraries2));
}

function editItinerary2(i) {
  modalBg2.classList.add("bg-active");
  document.getElementById("i-title2").value = itineraries2[i][0];
  document.getElementById("i-loc2").value = itineraries2[i][1];
  document.getElementById("i-starttime2").value = itineraries2[i][2];
  document.getElementById("i-addinfo2").value = itineraries2[i][3];
  document.getElementById("contact-update2").setAttribute("onclick", "updateItinerary2(" + i + ");");
}

function updateItinerary2(i) {
  // hidePlans(plans);
  itineraries2[i][0] = document.getElementById("i-title2").value;
  itineraries2[i][1] = document.getElementById("i-loc2").value;
  itineraries2[i][2] = document.getElementById("i-starttime2").value;
  itineraries2[i][3] = document.getElementById("i-addinfo2").value;
  displayItineraries2(itineraries2);
  selfRefresh2();
  localStorage.setItem("MyItineraryList2", JSON.stringify(itineraries2));
  modalBg2.classList.remove("bg-active");
  resetForm2();
  hideUpdate2();
  displayItineraries2(itineraries2);
}

function selfRefresh2() {
  let itineraries2 = [];
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

hideUpdate2();
