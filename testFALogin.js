var request = require('request');
var username = process.env.FLIGHTAWARE_USER;
var key = process.env.FLIGHTAWARE_API3;
var fxmlUrl = 'https://flightxml.flightaware.com/json/FlightXML3/';

var client_options = {
    url: 'localhost',
    auth: {
	user: username,
	password: key
    }
};
var Client = require('node-rest-client').Client;
var client = new Client(client_options);
client.registerMethod('findFlights', fxmlUrl + 'FindFlight', 'GET');
var findFlightArgs = {
    parameters: {
        origin: 'KIAH',
        destination: 'KJFK',
        type: 'nonstop'
    }
};
client.methods.findFlights(findFlightArgs, function (data, response) {
    console.log(data.toString());
});
