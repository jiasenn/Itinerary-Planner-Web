var marker;
var map;

$("#link1").click(function () {
  changeMarkerPos(3.15759, 101.611416);
});
$("#link2").click(function () {
  changeMarkerPos(3.165559, 101.612416);
});

function initMap() {
    var styles = [{
        stylers: [{
            // saturation: -100,
        }],
    }];
    var styledMap = new google.maps.StyledMapType(styles, {
      name: "Styled Map",
    });
    var mapProp = {
      center: new google.maps.LatLng(3.165659, 101.611416),
      zoom: 17,
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
  var map = new google.maps.Map(document.getElementById("map"), mapProp);  
  // {
  //   center: { lat: 1.3422961, lng: 103.9633355 },
  //   zoom: 12,
  //   // shift map type control to the right
  //   mapTypeControl: false,
  // });
  map.mapTypes.set("map_style", styledMap);
  map.setMapTypeId("map_style");

  marker = new google.maps.Marker({
    position: new google.maps.LatLng(3.167244, 101.61295),
    animation: google.maps.Animation.DROP,
    icon: "https://cdn2.iconfinder.com/data/icons/flat-ui-icons-24-px/24/location-24-32.png",
  });

  marker.setMap(map);
  map.panTo(marker.position);

  var input = document.getElementById("searchInput");
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  var autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.bindTo("bounds", map);

  var infowindow = new google.maps.InfoWindow();
  // var marker = new google.maps.Marker({
  //   map: map,
  //   position: new google.maps.LatLng(3.167244, 101.61295),
  //   anchorPoint: new google.maps.Point(0, -29),
  //   animation: google.maps.Animation.DROP,
  //   icon: "https://cdn2.iconfinder.com/data/icons/flat-ui-icons-24-px/24/location-24-32.png",
  // });



  autocomplete.addListener("place_changed", function () {
    infowindow.close();
    marker.setVisible(false);
    var place = autocomplete.getPlace();
    if (!place.geometry) {
      window.alert("Autocomplete's returned place contains no geometry");
      return;
    }

    // If the place has a geometry, then present it on a map.
    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(17);
    }
    marker.setIcon({
      url: place.icon,
      size: new google.maps.Size(71, 71),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(35, 35),
    });
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
  });
}

function changeMarkerPos(lat, lon) {
  myLatLng = new google.maps.LatLng(lat, lon);
  marker.setPosition(myLatLng);
  map.panTo(myLatLng);
}

google.maps.event.addDomListener(window, "load", initMap);

window.initMap = initMap;

$(document).ready(function () {
  $(".toggle").click(function () {
    $("aside").toggleClass("close");
  });
});

function w3_open(i) {
  document.getElementById("mySidebar" + String(i)).style.display = "block";
  document.getElementById("nav1").style.display = "none";
}

function w3_close(i) {
  document.getElementById("mySidebar" + String(i)).style.display = "none";
  document.getElementById("nav1").style.display = "block";
}

// click outside
$(document).mouseup(function (e) {
  var container = $("aside");
  if (!container.is(e.target) && container.has(e.target).length === 0) {
    $("aside").removeClass("close");
    setTimeout(function () {
      w3_close();
    }, 800);
  }
});

function closeSide() {
  $("aside").removeClass("close");
  setTimeout(function () {
    w3_close();
  }, 800);
}