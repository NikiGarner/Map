function Gmap (map) {
  this.gmap = map;
  this.marker = [];
}

function initialize () {
  var myLocation = new google.maps.LatLng(45.5231, -122.6765);
  var myOptions = {
    zoom: 12,
    center: myLocation,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  var mapObject = new google.maps.Map(document.getElementById("map"), myOptions);
}

Gmap.prototype.addMarker = function (location, title) {
  var marker = new google.maps.Marker({
    position: location,
    title: title,
    icon: '../img/marker 3.png',
    animation: google.maps.Animation.DROP,
    map: this.gmap
  });
  this.marker.push(marker);
}

Gmap.prototype.clearMarker = function () {
  this.marker.forEach(function(marker) {
    marker.setMap(null);
  });
};
//
// Gmap.prototype.showMarkers = function () {
//   this.marker.forEach(function(markerOptions) {
//     var marker = new google.maps.Marker(markerOptions);
//   })
// };

Gmap.prototype.search = function (searchTerm) {
  var request = {
    location: this.gmap['center'],
    radius: '1000',
    query: searchTerm,
  };
  service = new google.maps.places.PlacesService(this.gmap);
  service.textSearch(request, callback);
};

function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      var place = results[i];
      var location = place.geometry.location;
      var title = place.name;
      mapObject.addMarker(location, title);
    }
  }
}

exports.gmapModule = Gmap;
exports.gmapInitialize = initialize;
