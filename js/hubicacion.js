// Wait for device API libraries to load
//
document.addEventListener("deviceready", onDeviceReady, false);

// device APIs are available
//
function hubicacion() {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
}

// onSuccess Geolocation
//
function onSuccess(position) {
    var element = document.getElementById('lista');
    element.innerHTML = "<li data-icon='false'>Latitude: " + position.coords.latitude + "</li>" +
    "<li data-icon='false'>Longitude: " + position.coords.longitude + "</li>" +
    "<li data-icon='false'>Altitude: " + position.coords.altitude + "</li>" +
    "<li data-icon='false'>Accuracy: " + position.coords.accuracy + "</li>" +
    "<li data-icon='false'>Altitude Accuracy: " + position.coords.altitudeAccuracy + "</li>" +
    "<li data-icon='false'>Heading: " + position.coords.speed + "</li>" +
    "<li data-icon='false'>Timestamp: " + position.coords.timestamp + "</li>";
    $('#lista').listview('refresh');
                        
}

// onError Callback receives a PositionError object
//
function onError(error) {
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
}