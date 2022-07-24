let plans = [];
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

    const myArray = Object.values(plans[0]);

  document.getElementById("display-plans-1").innerHTML = myArray[0];


  //saving to localStorage
  localStorage.setItem("MyPlanList", JSON.stringify(plans));
};;
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("plans-submit").addEventListener("click", addPlan);
});

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
  local.setMinutes(local.getMinutes() - 20*local.getTimezoneOffset());
  return local.toJSON().slice(0, 10);
}

console.warn("added", { plans });
let pre = document.querySelector("#msg pre");
pre.textContent = "\n" + JSON.stringify(plans, "\t", 2);



