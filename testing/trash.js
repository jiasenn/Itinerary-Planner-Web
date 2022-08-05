function AutocompleteDirectionsHandler(map) {
  this.map = map;
  this.originPlaceId = null;
  this.destinationPlaceId = "ChIJK7xLl1gZ2jERP_GdUY9XNLo";
  this.travelMode = "WALKING";
  var originInput = document.getElementById("origin-input");
  var destinationInput = document.getElementById("destination-input");
  var modeSelector = document.getElementById("mode-selector");
  this.directionsService = new google.maps.DirectionsService();
  this.directionsDisplay = new google.maps.DirectionsRenderer();
  this.directionsDisplay.setMap(map);

  var originAutocomplete = new google.maps.places.Autocomplete(originInput, {
    placeIdOnly: true,
  });
  var destinationAutocomplete = new google.maps.places.Autocomplete(
    destinationInput,
    { placeIdOnly: true }
  );

  this.setupClickListener("changemode-walking", "WALKING");
  this.setupClickListener("changemode-transit", "TRANSIT");
  this.setupClickListener("changemode-driving", "DRIVING");

  this.setupPlaceChangedListener(originAutocomplete, "ORIG");
  this.setupPlaceChangedListener(destinationAutocomplete, "DEST");

  // this.map.controls[google.maps.ControlPosition.BOTTOM_LEFT].push(originInput);
  // this.map.controls[google.maps.ControlPosition.BOTTOM_LEFT].push(destinationInput);
  // this.map.controls[google.maps.ControlPosition.BOTTOM_LEFT].push(modeSelector);
}

// Sets a listener on a radio button to change the filter type on Places
// Autocomplete.
AutocompleteDirectionsHandler.prototype.setupClickListener = function (
  id,
  mode
) {
  var radioButton = document.getElementById(id);
  var me = this;
  radioButton.addEventListener("click", function () {
    me.travelMode = mode;
    me.route();
  });
};

AutocompleteDirectionsHandler.prototype.setupPlaceChangedListener = function (
  autocomplete,
  mode
) {
  alert(me.originPlaceId);

  var me = this;
  autocomplete.bindTo("bounds", this.map);
  autocomplete.addListener("place_changed", function () {
    var place = autocomplete.getPlace();
    if (!place.place_id) {
      window.alert("Please select an option from the dropdown list.");
      return;
    }
    if (mode === "ORIG") {
      // me.originPlaceId = place.place_id;
      me.originPlaceId = $("#origin-input option:selected").val();
      alert(me.originPlaceId);
    } else {
      // me.destinationPlaceId = place.place_id;
      me.destinationPlaceId = $("#destination-input option:selected").val();
    }
    me.route();
  });
};

AutocompleteDirectionsHandler.prototype.route = function () {
  if (!this.originPlaceId || !this.destinationPlaceId) {
    return;
  }
  var me = this;

  alert(this.originPlaceId);

  this.directionsService.route(
    {
      origin: { placeId: this.originPlaceId },
      destination: { placeId: this.destinationPlaceId },
      travelMode: this.travelMode,
    },
    function (response, status) {
      if (status === "OK") {
        me.directionsDisplay.setDirections(response);

        document.getElementById("startlat").innerHTML =
          response.routes[0].legs[0].start_location.lat();
        document.getElementById("startlng").innerHTML =
          response.routes[0].legs[0].start_location.lng();
        document.getElementById("endlat").innerHTML =
          response.routes[0].legs[0].end_location.lat();
        document.getElementById("endlng").innerHTML =
          response.routes[0].legs[0].end_location.lng();

        console.log(response.routes[0].legs[0].start_location.lat());
        console.log(response.routes[0].legs[0].start_location.lng());

        console.log(response.routes[0].legs[0].end_location.lat());
        console.log(response.routes[0].legs[0].end_location.lng());
      } else {
        window.alert("Directions request failed due to " + status);
      }
    }
  );
};
