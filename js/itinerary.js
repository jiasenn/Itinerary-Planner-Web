// window.localStorage.clear(); //clear all localstorage

let itineraries = [];
var obj1 = JSON.parse(localStorage.getItem("MyItineraryList")); // An object :D

function displayItineraries(itineraries) {
  for (let i = 1; i < itineraries.length; i++) {
    const myArray = Object.values(itineraries[i]);
    console.log(myArray);
    document.getElementById("title-i" + String(i)).innerHTML = myArray[0];
    document.getElementById("loc-i" + String(i)).innerHTML = myArray[1];
    document.getElementById("start-loc-i" + String(i)).innerHTML = myArray[2];
    document.getElementById("start-time-i" + String(i)).innerHTML = myArray[3];
    document.getElementById("end-loc-i" + String(i)).innerHTML = myArray[4];
    document.getElementById("end-time-i" + String(i)).innerHTML = myArray[5];
    document.getElementById("add-info-i" + String(i)).innerHTML = myArray[6];
    
    // document.getElementById("title-i" + String(i + 1)).innerHTML =
    //   myArray[0];
    // document.getElementById("plans-start-" + String(i + 1)).innerHTML =
    //   myArray[1];
    // document.getElementById("plans-end-" + String(i + 1)).innerHTML =
    //   myArray[2];
    // document.getElementById("destination-" + String(i + 1)).innerHTML =
    //   myArray[3];
  }
}

function hideItineraries(itineraries) {
  for (let i = 0; i < itineraries.length; i++) {
    // document.getElementById("i-title").innerHTML = "";
    // document.getElementById("plans-start-" + String(i + 1)).innerHTML = "";
    // document.getElementById("plans-end-" + String(i + 1)).innerHTML = "";
    // document.getElementById("destination-" + String(i + 1)).innerHTML = "";
  }
}
// example {id:1592304983049, title: 'Deadpool', year: 2015}
const addItinerary = (ev) => {
  ev.preventDefault(); //to stop the form submitting
  let itinerary = {
    // id: Date.now(),
    title: document.getElementById("i-title").value,
    loc: document.getElementById("i-loc").value,
    start_loc: document.getElementById("i-startloc").value,
    start_time: document.getElementById("i-starttime").value,
    end_loc: document.getElementById("i-endloc").value,
    end_time: document.getElementById("i-endtime").value,
    add_info: document.getElementById("i-addinfo").value,
  };
  itineraries.push(itinerary);
  document.forms[0].reset(); // to clear the form for the next entries
  //document.querySelector('form').reset();

  //for display purposes only
  // console.warn("added", { plans });
  // let pre = document.querySelector("#msg pre");
  // pre.textContent = "\n" + JSON.stringify(plans, "\t", 2);

  displayItineraries(itineraries);
  console.log(itineraries);

  //saving to localStorage
  localStorage.setItem("MyItineraryList", JSON.stringify(itineraries));
  location.reload();
};
document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("contact-submit")
    .addEventListener("click", addItinerary);
});

// console.warn("added", { plans });
// let pre = document.querySelector("#msg pre");
// pre.textContent = "\n" + JSON.stringify(plans, "\t", 2);

for (let i = 0; i < obj1.length; i++) {
  itineraries.push(Object.values(obj1[i]));
}

displayItineraries(itineraries);

function removePlan(i) {
  hideItineraries(itineraries);
  itineraries.splice(i, 1);
  displayItineraries(itineraries);
  localStorage.removeItem("MyItineraryList"); //remove one item
  localStorage.setItem("MyItineraryList", JSON.stringify(itineraries));
}
