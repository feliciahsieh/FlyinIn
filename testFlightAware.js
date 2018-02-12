//GLOBAL VARS from previous query
//Hard coded for now (Flights)
var airlineIata = 'WN';  //'WN'; //'B6';
var airlineIcao = 'SWA'; //'SWA'; //'JBU';
var flight = 4718;       //4110; //615;
var airportDepartureIata = 'SAN';
var airportDepartureIcao = 'KSAN';
//GLOBAL VARS
var flightDate;
var messageTime;
var messageTZ;
var messageFlightDelay;
var uniqueFlightIata = airlineIata + flight;
var uniqueFlightIcao = airlineIcao + flight;

var i;

//FIND TODAY'S SINGLE FLIGHT
let dte = new Date();
var mm, dd;

console.log(dte);
options = {"timeZone" : "America/Los_Angeles"};
let localDate = dte.toLocaleDateString('en-EN', options);
console.log('localDate' + localDate);
let local=localDate.split('/');
if(local[0].length === 1)
    local[0] = '0' + local[0];
if(local[1].length === 1)
    local[1] = '0' + local[1];
flightDate = local[0] + '/' + local[1] + '/' + local[2];
console.log("Calculating today as: " + flightDate);

//TEST QUERY (FlightInfoStatus)
//https://flightxml.flightaware.com/json/FlightXML3/FlightInfoStatus?ident=JBU615&howMany=3&include_ex_data=false
//https://flightxml.flightaware.com/json/FlightXML3/FlightInfoStatus?ident=SWA4718&howMany=3&include_ex_data=false
//alert(urlFlightInfoStatus);

var Client = require('node-rest-client').Client;
var options_auth = { user: process.env.FLIGHTAWARE_USER, password: process.env.FLIGHTAWARE_API3 };
var client = new Client(options_auth);
var fxmlUrl = 'https://flightxml.flightaware.com/json/FlightXML3/';

client.registerMethod('getFlightInfoStatus', fxmlUrl + 'FlightInfoStatus', 'GET');
var getFlightInfoStatusArgs = {
    parameters: {
        ident: uniqueFlightIcao,
        howMany: 4,
        include_ex_data: false
    }
};

client.methods.getFlightInfoStatus(getFlightInfoStatusArgs, function (data, response) {
    console.log(data.FlightInfoStatusResult);
    console.log('Looking for ' + flightDate + ' ' + airportDepartureIcao);
    for (i = 0; i < data.FlightInfoStatusResult.flights.length; i++) {
	console.log(data.FlightInfoStatusResult.flights[i].origin.code + ' ' + 
		    data.FlightInfoStatusResult.flights[i].estimated_arrival_time.date + ' ' + 
		    data.FlightInfoStatusResult.flights[i].estimated_arrival_time.time + ' ' + 
		    data.FlightInfoStatusResult.flights[i].estimated_arrival_time.tz + ' ' +
		    data.FlightInfoStatusResult.flights[i].departure_delay/60 + ' min delay');

	if (data.FlightInfoStatusResult.flights[i].estimated_arrival_time.date === flightDate &&
	   (data.FlightInfoStatusResult.flights[i].origin.code === airportDepartureIcao) ) {
	    console.log("FOUND IT");
	    messageTime = data.FlightInfoStatusResult.flights[i].estimated_arrival_time.time; 
	    messageTZ = data.FlightInfoStatusResult.flights[i].estimated_arrival_time.tz;
	    messageFlightDelay = data.FlightInfoStatusResult.flights[i].departure_delay / 60; //in min

	    //Update webpage
	    //$('#FAdate').text(data.FlightInfoStatusResult.flights[i].estimated_arrival_time.date);
	    //$('#FArrivalTime').text(data.FlightInfoStatusResult.flights[i].estimated_arrival_time.time);
	    //$('#FAestimatedArrivalTZ').text(data.FlightInfoStatusResult.flights[i].estimated_arrival_time.tz);
	    //$('#FAarrivalDelay').text(data.FlightInfoStatusResult.flights[i].departure_delay / 60);

	    break;
	}
    }
});
