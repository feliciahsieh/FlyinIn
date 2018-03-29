//GLOBAL VARS from previous query
//Hard coded for now (Flights)
var airlineIata = 'B6';  //'WN'; //'B6';
var airlineIcao = 'JBU'; //'SWA'; //'JBU';
var flight = 615;       //4110; //615;
var airportDepartureIata = 'JFK';
var airportDepartureIcao = 'KJFK';
//GLOBAL VARS
var flightDate;
var messageTZ;
var flightDelay;
var localtime;
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
        howMany: 3,
	offset: 0, //Doesn't work
        include_ex_data: false
    }
};

client.methods.getFlightInfoStatus(getFlightInfoStatusArgs, function (data, response) {
    console.log(data.FlightInfoStatusResult);
    console.log('Looking for ' + flightDate + ' ' + airportDepartureIcao);
    for (i = 0; i < data.FlightInfoStatusResult.flights.length; i++) {
	console.log('flights[i] code: ' + data.FlightInfoStatusResult.flights[i].origin.code + ' ' + 
		    'EAT date: ' + data.FlightInfoStatusResult.flights[i].estimated_arrival_time.date + ' ' + 
		    'EAT time(local PST):' + data.FlightInfoStatusResult.flights[i].estimated_arrival_time.time + ' ' + 
		    'EAT localtime(Epoch): ' + data.FlightInfoStatusResult.flights[i].estimated_arrival_time.localtime + ' ' + 
		    'EAT tz:' + data.FlightInfoStatusResult.flights[i].estimated_arrival_time.tz + ' ' +
		    'departure_delay(sec):' + data.FlightInfoStatusResult.flights[i].departure_delay);

	if (data.FlightInfoStatusResult.flights[i].estimated_arrival_time.date === flightDate &&
	   (data.FlightInfoStatusResult.flights[i].origin.code === airportDepartureIcao) ) {
	    console.log("FOUND IT");
	    console.log('EAT STRUCTURE: ' + JSON.stringify(data.FlightInfoStatusResult.flights[i].estimated_arrival_time));
	    messageTime = data.FlightInfoStatusResult.flights[i].estimated_arrival_time.time; 
	    localtime = data.FlightInfoStatusResult.flights[i].estimated_arrival_time.localtime; //GMT Epoch local Runway estimated arrival time
	    messageTZ = data.FlightInfoStatusResult.flights[i].estimated_arrival_time.tz;
	    flightDelay = data.FlightInfoStatusResult.flights[i].departure_delay; //in sec

	    //****** CALCULATE RESULT TIME FOR DRIVER ********
	    let driveTime = 30 * 60 * 1000; //TESTING!!! Drive is 30 minutes but in milliseconds
	    var FIarrivalTime = new Date(localtime * 1000).getTime();
	    var FIdate = new Date(FIarrivalTime);
	    console.log('ORIG:' + FIdate.toString());

	    var FIresultTime = new Date(1518448920000 - driveTime).getTime();
	    var FIresultDate = new Date(FIresultTime);
	    console.log('NEW:' + FIresultDate.toString());

	    //****** CALCULATE RESULT TIME FOR DRIVER ********
	    let ampm, hh, mm;
	    if (FIresultDate.getHours() > 11) { //0-23
		ampm = 'PM';
		hh = FIresultDate.getHours() % 12;
	    } else {
		ampm = 'AM';
		hh = FIresultDate.getHours();
	    }
	    mm = FIresultDate.getMinutes();

	    FIresultTimeFormatted = hh + ':' + mm + ' ' + ampm;
	    console.log('FORMATTED TIME: ' + FIresultTimeFormatted);

	    //Update webpage
	    //$('#FAdate').text(data.FlightInfoStatusResult.flights[i].estimated_arrival_time.date);
	    //$('#FArrivalTime').text(data.FlightInfoStatusResult.flights[i].estimated_arrival_time.time);
	    //$('#FAestimatedArrivalTZ').text(data.FlightInfoStatusResult.flights[i].estimated_arrival_time.tz);
	    //$('#FAarrivalDelay').text(data.FlightInfoStatusResult.flights[i].departure_delay / 60);

	    break;
	}
    }
});
