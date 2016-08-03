(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
exports.apiKey = "AIzaSyAoK4Kt_vCsTJR9m3H410mQYPyz1jkYEdc";

},{}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
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

},{"./../.env":1,"./../js/gmap.js":2}]},{},[3]);
