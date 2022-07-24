// add event listeners
$(document).ready(function () {

  $(".date-picker-date").click(function (e) {
    // if active, toggle picker off and return
    var currentlyActive = $(this).hasClass("active");
    if (currentlyActive) {
      $(this).removeClass("active");
      return;
    }

    $(".date-picker-date").removeClass("active");
    $(this).addClass("active");
  });
});

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
function hideCalendar() {
  $(".date-picker-section").removeClass("active");
  $("#date-picker-section").addClass("hidden-1");
}

