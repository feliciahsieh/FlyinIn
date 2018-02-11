//https://flightxml.flightaware.com/json/FlightXML3/FindFlight?origin=KPDX&destination=KOMA&type=nonstop
var username = process.env.FLIGHTAWARE_USER;
var key = process.env.FLIGHTAWARE_API3;

var Client = require('node-rest-client').Client;
var options_auth = { user: username, password: key };
var client = new Client(options_auth);
var fxmlUrl = 'https://flightxml.flightaware.com/json/FlightXML3/';
client.registerMethod('findFlights', fxmlUrl + 'FindFlight', 'GET');
var findFlightArgs = {
    parameters: {
        origin: 'SJC',
        destination: 'DEN',
        type: 'nonstop'
    }
};
client.methods.findFlights(findFlightArgs, function (data, response) {
    console.log(data);
    //console.log(response);
});
//client.on('error', function(err) {
//    console.log(err);
//});
