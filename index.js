// function initMap() {
//   var options = {
//     center: { lat: 1.3414, lng: 103.9633 },
//     zoom: 12,
//   };

//   map = new google.maps.Map(document.getElementById("map"), options);
// }

window.initMap = initMap;

function initMap() {
  var location = { lat: 1.3414, lng: 103.9633 };
  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 12,
    center: location,
  });
  var marker = new google.maps.Marker({
    position: location,
    map: map,
  });
}