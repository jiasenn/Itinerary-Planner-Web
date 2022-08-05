var marker;
var map;
var directionsService;
var directionsDisplay;
var directionsService2;
var directionsDisplay2;
var directionsService3;
var directionsDisplay3;
var directionsService4;
var directionsDisplay4;
var directionsService5;
var directionsDisplay5;
var directionsService6;
var directionsDisplay6;
var input;
var infoWindow; // nickname location inforwindow
var infowindow; // search infowindow

function initMap() {
  infoWindow = new google.maps.InfoWindow();

  var styles = [
    {
      stylers: [
        {
          // saturation: -100,
        },
      ],
    },
  ];
  var styledMap = new google.maps.StyledMapType(styles, {
    name: "Styled Map",
  });
  var mapProp = {
    center: new google.maps.LatLng(1.3521, 103.8198),
    zoom: 12,
    panControl: true,
    zoomControl: true,
    mapTypeControl: false,
    scaleControl: true,
    streetViewControl: true,
    overviewMapControl: false,
    rotateControl: true,
    scrollwheel: true,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
  };
  map = new google.maps.Map(document.getElementById("map"), mapProp);
  // {
  //   center: { lat: 1.3422961, lng: 103.9633355 },
  //   zoom: 12,
  //   // shift map type control to the right
  //   mapTypeControl: false,
  // });
  map.mapTypes.set("map_style", styledMap);
  map.setMapTypeId("map_style");

  marker = new google.maps.Marker({
    position: new google.maps.LatLng(1.3521, 103.8198),
    animation: google.maps.Animation.DROP,
    icon: "https://cdn2.iconfinder.com/data/icons/flat-ui-icons-24-px/24/location-24-32.png",
  });

  marker.setMap(map);
  map.panTo(marker.position);

  // ham = document.getElementById("ham");
  var input1 = document.getElementById("searchInput");
  // map.controls[google.maps.ControlPosition.TOP_LEFT].push(ham);
  // map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  var autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.bindTo("bounds", map);
  var autocomplete1 = new google.maps.places.Autocomplete(input1);
  autocomplete1.bindTo("bounds", map);

  infowindow = new google.maps.InfoWindow();

  autocomplete.addListener("place_changed", function () {
    infowindow.close();
    marker.setVisible(false);
    var place = autocomplete.getPlace();

    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(17);
    }
    marker.setPosition(place.geometry.location);
    marker.setVisible(true);

    var address = "";
    if (place.address_components) {
      address = [
        (place.address_components[0] &&
          place.address_components[0].short_name) ||
          "",
        (place.address_components[1] &&
          place.address_components[1].short_name) ||
          "",
        (place.address_components[2] &&
          place.address_components[2].short_name) ||
          "",
      ].join(" ");
    }

    infowindow.setContent(
      "<div><strong>" + place.name + "</strong><br>" + address
    );
    infowindow.open(map, marker);

    // Location details
    for (var i = 0; i < place.address_components.length; i++) {
      if (place.address_components[i].types[0] == "postal_code") {
        document.getElementById("postal_code").innerHTML =
          place.address_components[i].long_name;
      }
      if (place.address_components[i].types[0] == "country") {
        document.getElementById("country").innerHTML =
          place.address_components[i].long_name;
      }
    }
    document.getElementById("location").innerHTML = place.formatted_address;
    document.getElementById("lat").innerHTML = place.geometry.location.lat();
    document.getElementById("lon").innerHTML = place.geometry.location.lng();
    document.getElementById("place_id").innerHTML = place.place_id;
  });

  // main menu autocomplete searchbar
  autocomplete1.addListener("place_changed", function () {
    infowindow.close();
    infoWindow.close();
    var marker1 = marker;
    marker1.setVisible(false);

    var place1 = autocomplete1.getPlace();
    if (!place1.place_id) {
      alert("Please select an option from the dropdown list.");
      return;
    }

    if (!place1.geometry) {
      window.alert("Autocomplete's returned place contains no geometry");
      return;
    }

    // If the place has a geometry, then present it on a map.
    if (place1.geometry.viewport) {
      map.fitBounds(place1.geometry.viewport);
    } else {
      map.setCenter(place1.geometry.location);
      map.setZoom(17);
    }

    marker1.setIcon({
      url: place1.icon,
      size: new google.maps.Size(71, 71),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(35, 35),
    });

    marker1.setPosition(place1.geometry.location);
    marker1.setVisible(true);

    var address1 = "";

    if (place1.address_components) {
      address1 = [
        (place1.address_components[0] &&
          place1.address_components[0].short_name) ||
          "",
        (place1.address_components[1] &&
          place1.address_components[1].short_name) ||
          "",
        (place1.address_components[2] &&
          place1.address_components[2].short_name) ||
          "",
      ].join(" ");
    }

    infowindow.setContent(
      "<div><strong>" + place1.name + "</strong><br>" + address1
    );
    infowindow.open(map, marker1);
  });

  // new AutocompleteDirectionsHandler(map);

  directionsService = new google.maps.DirectionsService();
  directionsService2 = new google.maps.DirectionsService();


  // directionsService.route(
  //   {
  //     // origin: new google.maps.LatLng(1.3521, 103.8198),
  //     // destination: new google.maps.LatLng(1.8, 103.8198),
  //     origin: { placeId: "ChIJRYMSeKwe2jERAR2QXVU39vg" },
  //     destination: { placeId: "ChIJK7xLl1gZ2jERP_GdUY9XNLo" },
  //     travelMode: "TRANSIT",
  //   },
  //   (response, status) => {
  //     if (status === "OK") {
  //       new google.maps.DirectionsRenderer({
  //         suppressMarkers: true,
  //         directions: response,
  //         map: map,
  //       });
  //     } else {
  //       window.alert("Directions request failed due to " + status);
  //     }
  //   }
  // );

  // directionsService2.route(
  //   {
  //     // origin: new google.maps.LatLng(1.3521, 103.8198),
  //     // destination: new google.maps.LatLng(1.5, 103.8198),
  //     origin: { placeId: "ChIJK7xLl1gZ2jERP_GdUY9XNLo" },
  //     destination: { placeId: "ChIJVanJyN8b2jER-s5D_7DTzHE" },
  //     travelMode: "TRANSIT",
  //   },
  //   (response, status) => {
  //     if (status === "OK") {
  //       new google.maps.DirectionsRenderer({
  //         suppressMarkers: true,
  //         directions: response,
  //         map: map,
  //       });
  //     } else {
  //       window.alert("Directions request failed due to " + status);
  //     }
  //   }
  // );
}

function getDirections(origin_id, destination_id) {
  directionsService.route(
    {
      origin: { placeId: origin_id },
      destination: { placeId: destination_id },
      travelMode: "TRANSIT",
    },
    (response, status) => {
      if (status === "OK") {
        directionsDisplay = new google.maps.DirectionsRenderer({
          suppressMarkers: true,
          directions: response,
          map: map,
        });
      } else {
        window.alert("Directions request failed due to " + status);
      }
    }
  );
  document.getElementById("show-dir-1").style.display = "none";
  document.getElementById("hide-dir-1").style.display = "block";
}

function hideDirections() {
  directionsDisplay.setMap(null);
  document.getElementById("show-dir-1").style.display = "block";
  document.getElementById("hide-dir-1").style.display = "none";
};

// function Car

function chooseDay(i) {
  input = document.getElementById("exactLoc" + String(i));
  return input;
}

function setInfo(i) {
  infoWindow.close();
  infoWindow.setContent(
    "<strong>" +
      document.getElementById("loc-i" + String(i)).innerHTML +
      "</strong>"
  );
  infoWindow.open(map, marker);
}
function setInfo2(i) {
  infoWindow.close();
  infoWindow.setContent(
    "<strong>" +
      document.getElementById("loc-i2" + String(i)).innerHTML +
      "</strong>"
  );
  infoWindow.open(map, marker);
}
function setInfo3(i) {
  infoWindow.close();
  infoWindow.setContent(
    "<strong>" +
      document.getElementById("loc-i3" + String(i)).innerHTML +
      "</strong>"
  );
  infoWindow.open(map, marker);
}
function setInfo4(i) {
  infoWindow.close();
  infoWindow.setContent(
    "<strong>" +
      document.getElementById("loc-i4" + String(i)).innerHTML +
      "</strong>"
  );
  infoWindow.open(map, marker);
}

function changeMarkerPos(lat, lon) {
  infowindow.close();
  map.zoom = 17;
  marker.setIcon({
    url: "https://cdn2.iconfinder.com/data/icons/flat-ui-icons-24-px/24/location-24-32.png",
  });
  myLatLng = new google.maps.LatLng(lat, lon);
  marker.setVisible(true);
  marker.setPosition(myLatLng);
  map.panTo(myLatLng);
}
window.initMap = initMap;

// google.maps.event.addDomListener(window, "load", function () {
//   initMap();
// console.log(map);
// });