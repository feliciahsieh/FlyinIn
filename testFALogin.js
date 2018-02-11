//https://flightxml.flightaware.com/json/FlightXML3/FindFlight?origin=KPDX&destination=KOMA&type=nonstop

var Client = require('node-rest-client').Client;
var options_auth = { user: process.env.FLIGHTAWARE_USER, password: process.env.FLIGHTAWARE_API3 };
var client = new Client(options_auth);
var fxmlUrl = 'https://flightxml.flightaware.com/json/FlightXML3/';

client.registerMethod('findFlights', fxmlUrl + 'FindFlight', 'GET');
var findFlightArgs = {
    parameters: {
        origin: 'SJC',
        destination: 'DEN',
        type: 'nonstop',
	howMany: 2
    }
};

client.methods.findFlights(findFlightArgs, function (data, response) {
    console.log(data);
    console.log(data.FindFlightResult.flights[0]);
    console.log(data.FindFlightResult.flights[1]);
    //console.log(response);
});
//client.on('error', function(err) {
//    console.log(err);
//});
