<html>
<head>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
</head>
<body>
console.log("hello");
var username = 'felicia214';
var apiKey = 'f42d660a98bed5926ec167fafdacf4666931b1af';
var baseFxmlUrl = 'https://' + username + ':' + apiKey +'@flightxml.flightaware.com/json/FlightXML3/';
var requestOptions = {
    'ident': 'JBU615',
    'howMany': 2,
    'offset': 0
}
console.log('url: ' + baseFxmlUrl + 'FlightInfoStatus');
$.ajax({
    url: baseFxmlUrl + 'FlightInfoStatus',
    data: requestOptions,
    method: 'GET',
    jsonp: 'jsonp_callback',
    dataType: 'jsonp',
    success: function(data, txtStatus, xhr) {
	console.log('data1:' + data.toString());
	if (data.error) {
	    alert('Failed to fetch flight: ' + data.error);
	    return;
	}
	console.log('data2: ' + data);
	data.FlightInfoStatusResult.flights.forEach(flight => {
	    // Check for flight that has actually departed
	    if (flight.actual_departure_time.epoch > 0) {
		// Display basic information about the flight
		console.log('Flight ' + flight.ident + ' from ' + flight.origin.airport_name + 
			    ' (' + flight.origin.code +')' + ' to ' + flight.destination.airport_name + ' (' + flight.destination.code +')' + 
			    ' on ' + flight.actual_departure_time.date);
		// Display the route
		console.log('results: ' + results);
		console.log(flight.faFlightID);
		fetchAndRenderRoute(flight.faFlightID);
		console.log("fetchAndRenderRoute: " + flight.faFlightID);
		return;
	    }
	});
    },
    error: function(data, text) {
	alert('Failed to decode route: ' + data.toString());
    }
});

function fetchAndRenderRoute(flight_id) {
    $.ajax({
	method: 'GET',
	url: baseFxmlUrl + 'DecodeFlightRoute',
	data: {
	    'faFlightID': flight_id
	},
	jsonp: 'jsonp_callback',
	dataType: 'jsonp',
	success: function(result, txtStatus, xhr) {
	    if (result.error) {
		alert('Failed to decode route: ' + result.error);
		return;
	    }
	    // Build an array of the flight plan coordinates
	    var flightPlanCoordinates = [];
	    var bounds = new google.maps.LatLngBounds();
	    result.DecodeFlightRouteResult.data.forEach(coordinate => {
		if (coordinate.latitude && coordinate.longitude) {
		    var latlon = {lat: coordinate.latitude, lng: coordinate.longitude};
		    flightPlanCoordinates.push(latlon);
		    bounds.extend(latlon);
		}
	    });
	    var map = new google.maps.Map(document.getElementById('map_div'), {
		initialZoom: true,
		mapTypeId: 'terrain'
	    });
	    map.fitBounds(bounds);
	    var flightPath = new google.maps.Polyline({
		path: flightPlanCoordinates,
		geodesic: true,
		strokeColor: '#FF0000',
		strokeOpacity: 1.0,
		strokeWeight: 2
	    });
	    var originMarker = new google.maps.Marker({
		position: flightPlanCoordinates[0],
		map: map
	    });
	    var destinationMarker = new google.maps.Marker({
		position: flightPlanCoordinates[flightPlanCoordinates.length - 1],
		map: map
	    });
	    flightPath.setMap(map);
	},
	error: function(data, text) {
	    alert('Failed to decode the route: ' + data);
	}
    });
};
</body>
</html>
