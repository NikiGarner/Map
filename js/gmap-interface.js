var Gmap = require('./../js/gmap.js').gmapModule;
var apiKey = require('./../.env').apiKey;
var initialize = require('./../js/gmap.js').gmapInitialize;
var addMarker = require('./../js/gmap.js').gmapAddMarker;

  $( document ).ready(function() {
    var myLocation = new google.maps.LatLng(45.5231, -122.6765);
    var myOptions = {
      zoom: 14,
      center: myLocation,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    mapObject = new google.maps.Map(document.getElementById("map"), myOptions);

    console.log(mapObject['center'].toJSON());

    $('.search').submit(function(event) {
      event.preventDefault();
      var request = {
        location: myLocation,
        radius: '1000',
        query: $('#search').val()
      };
      service = new google.maps.places.PlacesService(mapObject);
      service.textSearch(request, callback);
    });
  });



function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      var place = results[i];
      var marker = new google.maps.Marker({
      map: mapObject,
      title: place.name,
      animation: google.maps.Animation.DROP,
      position: place.geometry.location
    });
    };
  };
};
