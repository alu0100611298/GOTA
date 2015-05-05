// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see a blank space instead of the map, this
// is probably because you have denied permission for location sharing.

function loadScript1()
{
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.src = "http://maps.googleapis.com/maps/api/js?key=&sensor=false&callback=map_geolocation";
  document.body.appendChild(script);
}

var map;

function map_geolocation() {
  var mapOptions = {
    zoom: 10
  };
  map = new google.maps.Map(document.getElementById('map1-canvas'),
      mapOptions);
  var altura_dispositivo = $( window ).height();
  var altura_total = altura_dispositivo * 0.75;
  $('#map1-canvas').height(altura_total);

  // Try HTML5 geolocation
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = new google.maps.LatLng(position.coords.latitude,
                                       position.coords.longitude);

      var infowindow = new google.maps.InfoWindow({
        map: map,
        position: pos,
        content: '<a href="#dia" data-role="button" onclick="dia('+position.coords.latitude+','+position.coords.longitude+');"><img src="imagen_0.png"><br><h1>Haz click para ver<br>la predicción</h1></a>'
      });

      map.setCenter(pos);
    }, function() {
      handleNoGeolocation(true);
    });
  } else {
    // Browser doesn't support Geolocation
    handleNoGeolocation(false);
  }
}

function handleNoGeolocation(errorFlag) {
  if (errorFlag) {
    var content = 'Error: The Geolocation service failed.';
    alert("El servicio de geolocalización ha fallado, compruebe los permisos.");
    $.mobile.navigate( "#pageone" );
  } else {
    var content = 'Error: Your browser doesn\'t support geolocation.';
    alert("Tu navegador no soporta la geolocalización.");
    $.mobile.navigate( "#pageone" );
  }

  var options = {
    map: map,
    position: new google.maps.LatLng(60, 105),
    content: content
  };

  var infowindow = new google.maps.InfoWindow(options);
  map.setCenter(options.position);
}