var apiName = '/flightstatus';
var version = '/v2'; //???
var pathInfo = ''; //?????
var query = '?';
var appId= '?appId=ad8f1e96';
var key = '&appKey=Holberton\'s App.';
var baseUri = 'https://api.flightstats.com/flex/flightstatus/rest/v2/json/' + pathInfo + query + appId + key;
//https://api.flightstats.com/flex/flightstatus/v9/xml/fooservice?appId=12345678&appKey=abcdefghijklmnopqrstukwxyz123456v
//curl -v  -X GET "https://api.flightstats.com/flex/flightstatus/rest/v2/json/flight/status/SWA497?appId=ad8f1e96&appKey=Holberton%5C's+App."

//Check this out: https://github.com/danielpabbott/AirportAce/blob/master/public/app.js

//FlightStatus
var x='https://api.flightstats.com/flex/flightstatus/rest/v2/json/flight/status/{...}'

var y = baseUri+airport+date+startTime+idAndKey+driveTime;

$.get(url, function (dataFlights) {
    console.log(dataFlights);
    console.log(dataFlights.toString());


}, 'json')
