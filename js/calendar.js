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
}
function hideCalendar() {
  $(".date-picker-section").removeClass("active");
  $("#date-picker-section").addClass("hidden-1");
}