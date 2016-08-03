function Gmap (map) {
  this.gmap = map;
};

function initialize () {
  var myLocation = new google.maps.LatLng(45.5231, -122.6765);
  var myOptions = {
    zoom: 12,
    center: myLocation,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  var mapObject = new google.maps.Map(document.getElementById("map"), myOptions);
}

function addMarker (location, map) {
  var marker = new google.maps.Marker({
    position: location,
    label: labels[labelIndex++ % labels.length],
    map: map
  });
}

exports.gmapModule = Gmap;
exports.gmapInitialize = initialize;
exports.gmapAddMarker = addMarker;
