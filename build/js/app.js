(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
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

},{"./../js/gmap.js":1}]},{},[2]);
