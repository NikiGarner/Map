var Gmap = require('./../js/gmap.js').gmapModule;
var initialize = require('./../js/gmap.js').gmapInitialize;
var addMarker = require('./../js/gmap.js').gmapAddMarker;

  $(document).ready(function() {
    var myLocation = new google.maps.LatLng(45.5231, -122.6765);
    var stylesArray = [
      {
        "featureType": "all",
        "stylers": [
          {"saturation": -100},
        ]
      },{
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
          {"saturation": 100}
        ]
      },{
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
          {"saturation": 100},
          {"lightness": 20}
        ]
      },{
        "featureType": "administrative.neighborhood",
        "elementType": "labels",
        "stylers": [
          {"saturation": 100},
          {"lightness": -15},
          {"visibility": "on"}
        ]
      },{
        "featureType": "administrative.locality",
        "elementType": "labels",
        "stylers": [
          {"visibility": "off"}
        ]
      },{
        "featureType": "poi",
        "elementType": "labels",
        "stylers": [
          {"visibility": "off"}
        ]
      },{
        "featureType": "transit",
        "elementType": "labels",
        "stylers": [
          {"visibility": "off"}
        ]
      },{
        "featureType": "road",
        "elementType": "labels",
        "stylers": [
          {"visibility": "off"}
        ]
      }

    ];
    var myOptions = {
      zoom: 14,
      center: myLocation,
      styles: stylesArray,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    mapObject = new Gmap (new google.maps.Map(document.getElementById("map"), myOptions));

    $('.search').submit(function(event) {
      event.preventDefault();
      mapObject.clearMarker();
      var searchTerm = $('#search').val();
      mapObject.search(searchTerm);
    });
  });
