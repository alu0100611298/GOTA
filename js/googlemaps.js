// In the following example, markers appear when the user clicks on the map.
// The markers are stored in an array.
// The user can then click an option to hide, show or delete the markers.

function loadScript()
{
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.src = "http://maps.googleapis.com/maps/api/js?key=&sensor=false&callback=googlemaps";
  document.body.appendChild(script);
}

var map;
var markers = [];

function googlemaps() {
  var tenerife = new google.maps.LatLng(28.2932285, -16.522718);
  var mapOptions = {
    zoom: 10,
    center: tenerife,
    mapTypeId: google.maps.MapTypeId.TERRAIN
  };
  map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);

  // This event listener will call addMarker() when the map is clicked.
  google.maps.event.addListener(map, 'click', function(event) {
    var Zona = zona(event.latLng.lat(),event.latLng.lng());
    if(Zona != -1){
      addMarker(event.latLng);
    }
    
  });

  //google.maps.event.addDomListener(window, 'load', initialize);

}

// Add a marker to the map and push to the array.
function addMarker(location) {
  clearMarkers();
  var marker = new google.maps.Marker({
    position: location,
    map: map
  });
  var infowindow = new google.maps.InfoWindow({
	content: '<a href="#dia" onclick="dia('+ location.lat() +','+ location.lng() +');">Obtener predicción</a>'
  });
  infowindow.open(map,marker);
    
    
  markers.push(marker);
}
        
// Sets the map on all markers in the array.
function setAllMap(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
  setAllMap(null);
}

// Shows any markers currently in the array.
function showMarkers() {
  setAllMap(map);
}

// Deletes all markers in the array by removing references to them.
function deleteMarkers() {
  clearMarkers();
  markers = [];
}