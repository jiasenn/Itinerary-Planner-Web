var marker;
var map;
var input;
var infoWindow; // nickname location inforwindow
var infowindow; // search infowindow

function initMap() {
    infoWindow = new google.maps.InfoWindow();

    var styles = [{
        stylers: [{
            // saturation: -100,
        }],
    }];
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
  // console.log(map);

  // map.controls[google.maps.ControlPosition.TOP_RIGHT].push(input);

  var autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.bindTo("bounds", map);

  infowindow = new google.maps.InfoWindow();
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
    // marker.setIcon({
    //   url: place.icon,
    //   size: new google.maps.Size(71, 71),
    //   origin: new google.maps.Point(0, 0),
    //   anchor: new google.maps.Point(17, 34),
    //   scaledSize: new google.maps.Size(35, 35),
    // });
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

function chooseDay(i) {
  input = document.getElementById("exactLoc" + String(i));
  return input;
}

function setInfo(i) {
  infoWindow.close();
  infoWindow.setContent(
    "<strong>" + document.getElementById("loc-i" + String(i)).innerHTML + "</strong>"
    );
  infoWindow.open(map, marker);
}
function setInfo2(i) {
  infoWindow.close();
  infoWindow.setContent(
    "<strong>" + document.getElementById("loc-i2" + String(i)).innerHTML + "</strong>"
  );
  infoWindow.open(map, marker);
}
function setInfo3(i) {
  infoWindow.close();
  infoWindow.setContent(
    "<strong>" + document.getElementById("loc-i3" + String(i)).innerHTML + "</strong>"
  );
  infoWindow.open(map, marker);
}
function setInfo4(i) {
  infoWindow.close();
  infoWindow.setContent(
    "<strong>" + document.getElementById("loc-i4" + String(i)).innerHTML + "</strong>"
  );
  infoWindow.open(map, marker);
}

function changeMarkerPos(lat, lon) {
  infowindow.close();
  map.zoom = 17;
  myLatLng = new google.maps.LatLng(lat, lon);
  marker.setPosition(myLatLng);
  map.panTo(myLatLng);
}
window.initMap = initMap;


// google.maps.event.addDomListener(window, "load", function () {
//   initMap();
// console.log(map);
// });


// function showMenu () {
// $("aside").addClass("close");

// }
// $("aside").addClass("close");


$(document).ready(function () {
  $(".toggle").click(function () {
    $("aside").toggleClass("close");
  });
});

$(document).ready(function () {
  $(".toggle").click(function () {
    $("ul").toggleClass("close");
  });
});

function w3_open(i) {
  if (document.getElementById("mySidebar" + String(i)).style.visibility == "visible") {
    document.getElementById("mySidebar" + String(i)).style.display = "block";
    document.getElementById("nav1").style.display = "none"; 
  }
  else {
    w3_open(i - 1);
  }
}

function w3_close(i) {
  document.getElementById("mySidebar" + String(i)).style.display = "none";
  document.getElementById("nav1").style.display = "block";
}

// click outside
$(document).mouseup(function (e) {
  var container = $("aside");
  var container1 = $("form")
  if (!container.is(e.target) && container.has(e.target).length === 0 &&
  !container1.is(e.target) && container1.has(e.target).length === 0) {
    $("aside").removeClass("close");
  }
});

function closeSide() {
  $("aside").removeClass("close");
  setTimeout(function () {
    w3_close();
  }, 800);
}

$(document).mouseup(function (e) {
  var container = $("dropdown-content");
  if (!container.is(e.target) && container.has(e.target).length === 0) {
    $("dropdown-content").removeClass("close");
  }
});

function hideMenu() {
  document.getElementById("mainmenu").style.display = "none";
  document.getElementById("nav1").style.display = "block";
}

function showMenu () {
  document.getElementById("mainmenu").style.display = "block";
  document.getElementById("nav1").style.display = "none";
}

/*watch*/
var timerVar = setInterval(countTimer, 1000);
var totalSeconds = 1;
function countTimer() {
           ++totalSeconds;
           var hour = Math.floor(totalSeconds /3600);
           var minute = Math.floor((totalSeconds - hour*3600)/60);
           var seconds = totalSeconds - (hour*3600 + minute*60);
           if(hour < 10)
             hour = "0"+hour;
           if(minute < 10)
             minute = "0"+minute;
           if(seconds < 10)
             seconds = "0"+seconds;
           document.getElementById("timer").innerHTML = hour + ":" + minute + ":" + seconds;
        }

/* alert for topwatch*/
function myAlert() {
  alert("You have completed the study. Please remember to indicate the timing and the number of clicks as stated in the survey. Select OK to continue. ")
  alert( " Total seconds taken : " + totalSeconds +" Total number of Clicks :  " + count )
}

/*count*/
let count = 0;
      let btn = document.querySelector('html');
      let divSection = document.getElementById('showCount');
      btn.addEventListener('click', (e)=>{
        count++;
        divSection.innerHTML=`Number of Clicks are: ${count}`;
     });
