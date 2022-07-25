// window.localStorage.clear(); //clear all localstorage

let plans = [];
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
    const myArray = Object.values(plans[i]);
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
  console.warn("added", { plans });
  let pre = document.querySelector("#msg pre");
  pre.textContent = "\n" + JSON.stringify(plans, "\t", 2);

  displayPlans(plans);

  //saving to localStorage
  localStorage.setItem("MyPlanList", JSON.stringify(plans));
};
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("plans-submit").addEventListener("click", addPlan);
});

console.warn("added", { plans });
let pre = document.querySelector("#msg pre");
pre.textContent = "\n" + JSON.stringify(plans, "\t", 2);

for (let i = 0; i < obj.length; i++) {
  plans.push(Object.values(obj[i]));
}

displayPlans(obj);

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

function showDropdown() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
  for (let j = 0; j < plans.length; j++) {
    if (!event.target.matches(".dropbtn-" + String(j))) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains("show")) {
          openDropdown.classList.remove("show");
        }
      }
    }
  }
};
// console.log($("#display-plans-" + String(2)).is(":empty"));

// for (let i = 1; i < 5; i++) {
//   console.log(i);
//   if ($("#display-plans-" + String(i)).is(":empty")) {
//     const element = document.getElementById("dropbtn-" + String(i));
//     console.log(i);

//     element.style.display = "none";
//     // $(this).find(".dropbtn-" + String(i)).css("display: none;");
//     // $(this).find(".display-plans-" + String(i)).css("display: none;");
//   }
// }
// while (true) {
for (let i = 0; i < 5; i++) {
    // console.log("#display-plans-" + String(i));
    if ($("#display-plans-" + String(i+1)).is(":empty") || plans.length === 0) {
      const element = document.querySelector(".dropbtn-" + String(i));
      // console.log(i);

      element.style.display = "none";    }
  }
// }

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches(".dropbtn-1")) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};