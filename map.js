
var mapstyle = [
    {
        "featureType": "all",
        "elementType": "labels.text.fill",
        "stylers": [
            { "saturation": 36 },
            { "color": "#f36218" },
            { "lightness": 20 }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.text.stroke",
        "stylers": [
            { "visibility": "on" },
            { "color": "#000000" },
            { "lightness": 16 }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.icon",
        "stylers": [
            { "visibility": "off" }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.fill",
        "stylers": [
            { "color": "#000000" },
            { "lightness": 20 }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [
            { "color": "#000000" },
            { "lightness": 17 },
            { "weight": 1.2 }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [
            { "color": "#000000" },
            { "lightness": 0 }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            { "color": "#000000" },
            { "lightness": 21 }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
            { "color": "#f8f682" },
            { "lightness": 0 }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            { "color": "#000000" },
            { "lightness": 29 },
            { "weight": 0.2 }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
            { "color": "#f8f682" },
            { "lightness": 0 }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [
            { "color": "#000000" },
            { "lightness": 16 }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "geometry",
        "stylers": [
            { "color": "#000000" },
            { "lightness": 19 }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            { "color": "#d91e25" },
            { "lightness": 0 }
        ]
    }
];

var revolverGeo = new google.maps.LatLng(60.389802, 5.322666);

var mapOptions = {
    center: revolverGeo,
    zoom: 12,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    scrollwheel: false
}

function initializeMap() {
    var mapCanvas = document.getElementById('venue-map');

    var map = new google.maps.Map(mapCanvas, mapOptions);

    var marker = new google.maps.Marker({
        position: revolverGeo,
        map: map,
        title: 'Revolverhuset!'
    });

    map.set('styles', mapstyle);
}

google.maps.event.addDomListener(window, 'load', initializeMap);
