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

  // $(document).ready(function () {
  //   $(".today").val(getToday);
  // });

  // $(document).ready(function () {
  //   $(".end-date").val(getEndDate);
  // });

  // // JQuery
  // function getToday() {
  //   const local = new Date();
  //   local.setMinutes(local.getMinutes() - local.getTimezoneOffset());
  //   return local.toJSON().slice(0, 10);
  // }

  // function getEndDate() {
  //   const local = new Date();
  //   local.setMinutes(local.getMinutes() - 20 * local.getTimezoneOffset());
  //   return local.toJSON().slice(0, 10);
  // }

function hideCalendar() {
  $(".date-picker-section").removeClass("active");
  $("#date-picker-section").addClass("hidden-1");
}


// Almost final example
(function() {
  var id_ = 'draggable_table';
  var cols_ = document.querySelectorAll('#' + id_ + ' .row');
  var dragSrcEl_ = null;

  this.handleDragStart = function(e) {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);

    dragSrcEl_ = this;

    this.style.opacity = '0.4';

  };

  this.handleDragOver = function(e) {
    if (e.preventDefault) {
      e.preventDefault(); // Allows us to drop.
    }

    e.dataTransfer.dropEffect = 'move';

    return false;
  };

  this.handleDragEnter = function(e) {
  };

  this.handleDragLeave = function(e) {
  };

  this.handleDrop = function(e) {
    // this/e.target is current target element.

    if (e.stopPropagation) {
      e.stopPropagation(); // stops the browser from redirecting.
    }

    // Don't do anything if we're dropping on the same column we're dragging.
    if (dragSrcEl_ != this) {
      dragSrcEl_.innerHTML = this.innerHTML;
      this.innerHTML = e.dataTransfer.getData('text/html');
    }

    return false;
  };

  this.handleDragEnd = function(e) {
    // this/e.target is the source node.
    this.style.opacity = '1';

    [].forEach.call(cols_, function (col) {
    });
  };

  [].forEach.call(cols_, function (col) {
    col.setAttribute('draggable', 'true');  // Enable columns to be draggable.
    col.addEventListener('dragstart', this.handleDragStart, false);
    col.addEventListener('dragenter', this.handleDragEnter, false);
    col.addEventListener('dragover', this.handleDragOver, false);
    col.addEventListener('dragleave', this.handleDragLeave, false);
    col.addEventListener('drop', this.handleDrop, false);
    col.addEventListener('dragend', this.handleDragEnd, false);
  });
})();

