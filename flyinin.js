//jQuery(document).ready(function($) {
    //GLOBAL VARS
    //var formData = {
    //};
    //$.formData = formData;

var airlineIata = ''; //from user. Fix later
var airlineIcao = ''; //from user. Fix later
var flight; //from user
var originAirportIcao //from user
var departureIcao =''; //from AviationEdge QUERY 1
var departureIata =''; //from AviationEdge QUERY 1
var arrivalIata = ''; //from AviationEdge QUERY 1
var arrivalIcao = ''; //from AviationEdge QUERY 1
var flightStatus = ''; //from AviationEdge QUERY 1
var arrivalTime; //from AviationEdge QUERY 2
var zipCode = '';
//DERIVED GLOBAL VARS
var resultTime;
var resultMessage;

function checkFlightNum (inputTxt) {
    var flightNum = /^[0-9]{1,4}$/;
    if (inputTxt.value.match(flightNum)) {
	return true;
    } else {
	alert('Flight Numbers should match the format, nnnn');
	document.getElementById('Flight').value = 0;
	return false;
    }
}

function checkOriginAirportIcao (inputTxt) {
    //stub function for check
}

function checkZipCode (inputTxt) {
    let zipCode = /^[0-9]{5}$/;
    if (inputTxt.value.match(zipCode)) {
	return true;
    } else {
	alert('Zip Code should match the value nnnnn');
	document.getElementById('FIZipCode').value = 0;
	return false;
    }
}

function checkPhoneNum (inputTxt) {
    var phoneNum = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (inputTxt.value.match(phoneNum)) {
	return true;
    } else {
	alert('Phone Numbers should match the format, nnn-nnn-nnnn');
	document.getElementById('Phone').value = '';
	return false;
    }
}
//}) //end of $(document).ready(...)


function processInput(e) {
    e.preventDefault();
    //e.stopImmediatePropagation()

    //INITIALIZE VALUES
    //Get USER's input
    flight = $("#FIFlightNum").val();
    console.log("User: flight#: " + $("#FIFlightNum").val());
    zipCode = $('#FIZipCode').val();
    console.log("User: zipcode: " + $("#FIZipCode").val());

    //FIND TODAY'S SINGLE FLIGHT
    let dte = new Date();
    var mm, dd;
    //console.log(dte);
    options = {"timeZone" : "America/Los_Angeles"};
    let localDate = dte.toLocaleDateString('en-EN', options);
    //console.log('localDate: ' + localDate);
    let local=localDate.split('/');
    if(local[0].length === 1)
	local[0] = '0' + local[0];
    if(local[1].length === 1)
	local[1] = '0' + local[1];
    flightDate = local[0] + '/' + local[1] + '/' + local[2];
    console.log("Calculating today as: " + flightDate);

    var arln = $("#FIAirline");
    arln.val(arln.val().toUpperCase());
    console.log('User: airline: ' + arln.val());

    $("#FIOriginAirportIcao").val($("#FIOriginAirportIcao").val().toUpperCase());
    console.log('User: origin aiport: ' + $("#FIOriginAirportIcao").val());

    //Get Airline input field
    switch (arln.val()) {
    case 'JBU':
	airlineIcao = arln.val();
	airlineIata = 'B6';
	break;
    case 'B6':
	airlineIata = arln.val();
	airlineIcao = 'JBU';
	break;
    case 'SWA':
	airlineIcao = arln.val();
	airlineIata = 'WN';
	break;
    case 'WN':
	airlineIata = arln.val();
	airlineIcao = 'SWA';
	break;
    case 'ASA':
	airlineIcao = arln.val();
	airlineIata = 'AS';
	break;
    case 'AS':
	airlineIata = arln.val();
	airlineIcao = 'ASA';
	break;
    case 'SKW':
	airlineIcao = arln.val();
	airlineIata = 'OO';
    case 'OO':
	airlineIata = arln.val();
	airlineIcao = 'SKW';
	break;
    default:
	airlineIata = 'FI ERROR';
	airlineIcao = 'FI ERROR';
    }

    //Lookup Flight Info from AviationEdge
    console.log("airlineIata: " + airlineIata + " flight: " + flight);

    //Query Aviation Edge for basic Airport / Airline static info
    let urlFlights = 'https://aviation-edge.com/api/public/flights?&key=ce8aa4-7c63af-d48024-815717-bfad64' + '&flight[iataNumber]=' + airlineIata + flight;
    //alert(urlFlights);
    $.get(urlFlights, function (dataFlights) {
	console.log('DATAFLIGHTS: ' + dataFlights[0].departure);
	departureIata = dataFlights[0].departure.iataCode;
	console.log('departureIata: ' + departureIata);
	departureIcao = dataFlights[0].departure.icaoCode;
	console.log('departureIcao: ' + departureIcao);
	arrivalIata = dataFlights[0].arrival.iataCode;
	console.log('arrivalIata: ' + arrivalIata);
	arrivalIcao = dataFlights[0].arrival.icaoCode;
	console.log('arrivalIcao: ' + arrivalIcao);
	airlineIata = dataFlights[0].airline.iataCode;
	console.log('airlineIata: ' + airlineIata);
	flightStatus = dataFlights[0].status;
	console.log('flightStatus: ' + flightStatus);
	alert("INSIDE!\ndepartureIata: " + departureIata + "\ndepartureIcao: " + departureIcao + "\narrivalIata: " + arrivalIata + "\narrivalIcao: " + arrivalIcao + "\nairlineIata: " + airlineIata + "\nstatus: " + flightStatus);

    }, 'json')
    .done(function(dataB) {
	alert('in 2nd NESTED LOOP');
        //Query Aviation Edge Routes - NOT RELIABLE
	let urlRoutes = 'http://aviation-edge.com/api/public/routes?key=ce8aa4-7c63af-d48024-815717-bfad64' + '&departureIata=' + departureIata + '&departureIcao=' + departureIcao + '&airlineIata=' + airlineIata + '&airlineIcao=' + airlineIcao + '&flightNumber=' + flight;
        alert(urlRoutes);
	//https://aviation-edge.com/api/public/routes?key=ce8aa4-7c63af-d48024-815717-bfad64&departureIata=SEA&departureIcao=KSEA&airlineIata=AS&airlineIcao=ASA&flightNumber=360
	console.log(urlRoutes);
        $.get(urlRoutes, function (dataRoutes) {
            console.log(dataRoutes);
            arrivalTime = dataRoutes[0].arrivalTime;
            alert('arrivalTime: ' + arrivalTime);
        }, 'json');

    }, 'json')
	.done(function(data2) {
	    //CREATE MESSAGE FOR USER
	    console.log('3rd Nested PROMISE', data2);
	    console.log('airline: '+ airlineIcao + '  flightNum: ' + flight + '  zipcode: ' + zipCode);
	    console.log('arrivalIcao: ' + arrivalIcao);
	    let urlDriving = 'https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins='+ zipCode + '&destinations=' + arrivalIcao + '&key=AIzaSyBoRvW47xXGNrYz-LYR3TLHC-p18sPFIes';
	    console.log('DRIVING:\n' + urlDriving);

	    $.get(urlDriving)
		.then(function (dataResult) {
		    //TEST DATA
		    let timeToLeave = '5:30 PM';
		    let timeToArrive = '6:30 PM';


		    let driverTimeText = dataResult.rows[0].elements[0].duration.text;
		    let driverTimeValue = dataResult.rows[0].elements[0].duration.value; //in seconds
		    let driverTimeDuration = dataResult.rows[0].elements[0].duration.value / 60; //in min

		    //******CALCULATE DRIVE TIME*******/
		    var driveTime = 30 * 60 * 1000; // TEST 30 minutes
		    var walkToCurb = 15 * 60 * 1000;
		    console.log('MINUS 30 min DRIVE TIME');
		    
		    var time = new Date(arrivalTime * 1000).getTime();
		    var date = new Date(time);
		    console.log('ORIG: ' + date.toString());

		    var time2 = new Date((arrivalTime * 1000) + walkToCurb - driveTime).getTime();
		    var date2 = new Date(time2);
		    console.log('NEW:  ' + date2.toString());

		    let ampm, hh, mm;
		    if (date2.getHours() > 11) { //0-23
			ampm = 'PM';
			hh = date2.getHours() % 12;
		    } else {
			ampm = 'AM';
			hh = date2.getHours();
		    }
		    mm = date2.getMinutes();

		    finalTime = hh + ':' + mm + ' ' + ampm;
		    console.log('FINAL TIME: ' + finalTime);
		    //******CALCULATE DRIVE TIME*******/

		    let resultText = 'Your best time to Leave is ' + finalTime + ' (to arrive at ' + timeToArrive + ')';
		    console.log('dataResult query  of DistanceMatrix: ' + dataResult.rows[0]);
		    $('#result').text(dataResult.rows[0].elements[0].duration.value);
		    //$('#result').text(resultText);

		    //DRAW MAP
		    /*
		    $("#drivingMap").html(`
				       <iframe id="drivingMap" width="100%" height="100%" style="border:0" allowfullscreen></iframe>
				       <script>
				       let url1 = "https://www.google.com/maps/embed/v1/directions?origin=";
				       let origin = zipCode;
				       let url2 = "&destination="
				       let destination = arrivalIcao + ' airport';
				       let key = "&key=AIzaSyABso7fs_w6S9pxMMK1T5vKZERvnA5Nzy0";
				       let totalURL = url1 + origin + url2 + destination + key;
				       document.getElementById("drivingMap").src = totalURL;
				       </script>`);
		    */

		});
	});

};
