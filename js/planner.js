// window.localStorage.clear(); //clear all localstorage

let plans = [];
threedots();
var obj = JSON.parse(localStorage.getItem("MyPlanList")); // An object :D

function displayPlans(plans) {
  for (let i = 0; i < plans.length; i++) {
    const myArray = Object.values(plans[i]);
    document.getElementById("display-plans-" + String(i + 1)).innerHTML =
      myArray[0];
    document.getElementById("plans-start-" + String(i + 1)).innerHTML =
      myArray[1];
    document.getElementById("plans-end-" + String(i + 1)).innerHTML =
      myArray[2];
    document.getElementById("destination-" + String(i + 1)).innerHTML =
      myArray[3];
  }
}

function hidePlans(plans) {
  for (let i = 0; i < plans.length; i++) {
    document.getElementById("display-plans-" + String(i + 1)).innerHTML =
      '';
    document.getElementById("plans-start-" + String(i + 1)).innerHTML =
      '';
    document.getElementById("plans-end-" + String(i + 1)).innerHTML =
      '';
    document.getElementById("destination-" + String(i + 1)).innerHTML =
      '';
  }
}
// example {id:1592304983049, title: 'Deadpool', year: 2015}
const addPlan = (ev) => {
  ev.preventDefault(); //to stop the form submitting
  let plan = {
    // id: Date.now(),
    title: document.getElementById("itineary-form").value,
    start_date: document.getElementById("date-picker-start-date").value,
    end_date: document.getElementById("date-picker-end-date").value,
    destination: document.getElementById("destination-form").value,
  };
  plans.push(plan);
  document.forms[0].reset(); // to clear the form for the next entries
  //document.querySelector('form').reset();

  //for display purposes only
  // console.warn("added", { plans });
  // let pre = document.querySelector("#msg pre");
  // pre.textContent = "\n" + JSON.stringify(plans, "\t", 2);

  displayPlans(plans);

  //saving to localStorage
  localStorage.setItem("MyPlanList", JSON.stringify(plans));
  selfRefresh();
  threedots();
};;

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("plans-submit").addEventListener("click", addPlan);
});

// console.warn("added", { plans });
// let pre = document.querySelector("#msg pre");
// pre.textContent = "\n" + JSON.stringify(plans, "\t", 2);

for (let i = 0; i < obj.length; i++) {
  plans.push(Object.values(obj[i]));
}
threedots();

displayPlans(plans);

function resetForm() {
  document.getElementById("date-picker-container").reset();
}

function removePlan(i) {
  hidePlans(plans);
  plans.splice(i, 1);
  displayPlans(plans);
  localStorage.removeItem("MyPlanList"); //remove one item
  localStorage.setItem("MyPlanList", JSON.stringify(plans));
}

// for (var i = 0, len = localStorage.length; i < len; ++i) {
//   console.log(localStorage.getItem(localStorage.key(i)));
// }

// console.log(plans[1]);

// dropdown 
function changeLanguage(language) {
  var element = document.getElementById("url");
  element.value = language;
  element.innerHTML = language;
}

function showDropdown(i) {
  document.getElementById("myDropdown-" + String(i)).classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
$(document).mouseup(function (e) {
  var container = $("dropdown-content");
  if (!container.is(e.target) && container.has(e.target).length === 0) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
});


// window.onclick = function(event) {
//   if (!event.target.matches(".dropbtn")) {
//     console.log("clicked outside");
//     var dropdowns = document.getElementsByClassName("dropdown-content");
//     var i;
//     for (i = 0; i < dropdowns.length; i++) {
//       var openDropdown = dropdowns[i];
//       console.log(openDropdown);
//       if (openDropdown.classList.contains("show")) {
//         openDropdown.classList.remove("show");
//       }
//     }
//   }
// };

function threedots() {
  for (let k = 5; k > 0; k--) {
    if ($("#display-plans-" + String(k)).is(":empty") || plans.length === 0) {
      const element = document.querySelector(".dropbtn-" + String(k));
      element.style.display = "none";
    }
    else {
      const element = document.querySelector(".dropbtn-" + String(k));
      element.style.display = "block";
    }
  }
}

function showCalendar() {
  $("#date-picker-section").removeClass("hidden-1");
  $(document).ready(function () {
    $(".today").val(getToday());
  });

  $(document).ready(function () {
    $(".end-date").val(getEndDate());
  });

  // JQuery
  function getToday() {
    const local = new Date();
    local.setMinutes(local.getMinutes() - local.getTimezoneOffset());
    return local.toJSON().slice(0, 10);
  }

  function getEndDate() {
    const local = new Date();
    local.setMinutes(local.getMinutes() - 20 * local.getTimezoneOffset());
    return local.toJSON().slice(0, 10);
  }
}

function editProperties(i) {
  showCalendar();
  $("#update-plan").removeClass("hidden-1");
  $("#plans-submit").addClass("hidden-1");

  document.getElementById("itineary-form").value = plans[i][0];
  document.getElementById("date-picker-start-date").value = plans[i][1];
  document.getElementById("date-picker-end-date").value = plans[i][2];
  document.getElementById("destination-form").value = plans[i][3];
  document.getElementById("update-plan").setAttribute("onclick", "updatePlan(" + i + "); hideCalendar();");
}

function updatePlan(i) {
  // hidePlans(plans);
  plans[i][0] = document.getElementById("itineary-form").value;
  plans[i][1] = document.getElementById("date-picker-start-date").value;
  plans[i][2] = document.getElementById("date-picker-end-date").value;
  plans[i][3] = document.getElementById("destination-form").value;
  localStorage.setItem("MyPlanList", JSON.stringify(plans));
  displayPlans(plans);
  selfRefresh();
  threedots();
  getDuration(i);
}

function selfRefresh() {
  plans = [];
  var obj = JSON.parse(localStorage.getItem("MyPlanList")); // An object :D
  for (let i = 0; i < obj.length; i++) {
    plans.push(Object.values(obj[i]));
  }
  localStorage.removeItem("MyPlanList"); //remove one item
  localStorage.setItem("MyPlanList", JSON.stringify(plans));
}

function showButton() {
  $("#update-plan").addClass("hidden-1");
  $("#plans-submit").removeClass("hidden-1");
}

let date = document.getElementById("plans-start-1").innerHTML;


function getDuration(i) {
  for (let k = 1; k <= 4; k++) {
    document.getElementById("mySidebar" + String(k)).style.visibility ="hidden";
  }

  var start_date = document.getElementById("plans-start-" + String(i + 1)).innerHTML;
  var end_date = document.getElementById("plans-end-" + String(i + 1)).innerHTML;
  var diffInMs = new Date(end_date) - new Date(start_date);
  var diffInDays = diffInMs / (1000 * 60 * 60 * 24) + 1;
  for (let j = 1; j <= diffInDays; j++) {
    document.getElementById("mySidebar" + String(j)).style.visibility = "visible";
  }
}