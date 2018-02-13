//FILE: flyinin.js

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

function inputFocus (field) {
  if (field.value == field.defaultValue) {
    field.value = '';
    field.style.color = '#000';
  }
}

function inputBlur (field) {
  if (field.value == '') {
    field.value = field.defaultValue;
    field.style.color = '#888';
  }
}

function checkAirline (inputTxt) {
    //stub function for check
}

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


function processInput(e) {

    e.preventDefault();

    //INITIALIZE VALUES
    zipCode = $('#FIZipCode').val();
    //alert('zipcode: ' + zipCode);

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

    var fieldAirline = $("#FIAirline");
    fieldAirline.val().toUpperCase();
    $("#FIOriginAirportIcao").val().toUpperCase();
    //console.log($("#FIAirline"));
    console.log($("#FIOriginAirportIcao"));
    //Get Airline input field
    switch (fieldAirline.val()) {
    case 'JBU':
	airlineIcao = fieldAirline.val();
	airlineIata = 'B6';
	break;
    case 'B6':
	airlineIata = fieldAirline.val();
	airlineIcao = 'JBU';
	break;
    case 'SWA':
	airlineIcao = fieldAirline.val();
	airlineIata = 'WN';
	break;
    case 'WN':
	airlineIata = fieldAirline.val();
	airlineIcao = 'SWA';
	break;
    case 'ASA':
	airlineIcao = fieldAirline.val();
	airlineIata = 'AS';
	break;
    case 'WN':
	airlineIata = fieldAirline.val();
	airlineIcao = 'ASA';
	break;
    case 'SKW':
	airlineIcao = fieldAirline.val();
	airlineIata = 'OO';
    case 'OO':
	airlineIata = fieldAirline.val();
	airlineIcao = 'SKW';
	break;
    default:
	airlineIata = 'FI ERROR';
	airlineIcao = 'FI ERROR';
    }

    //Get Flight Number input field
    flight = $("#FlightNum").val();
    //Lookup Flight Info from AviationEdge
    console.log("airlineIata:" + airlineIata + " flight:" + flight);
    zipCode = $("#FIZipCode").val();

    //Query Aviation Edge for basic Airport / Airline static info
    let urlFlights = 'https://aviation-edge.com/api/public/flights?&key=ce8aa4-7c63af-d48024-815717-bfad64' + '&flight[iataNumber]=' + airlineIata + flight;
    alert(urlFlights);
    $.get(urlFlights, function (dataFlights) {
	console.log(dataFlights);
	departureIata = dataFlights[0].departure.iataCode;
	departureIcao = dataFlights[0].departure.icaoCode;
	arrivalIata = dataFlights[0].arrival.iataCode;
	arrivalIcao = dataFlights[0].arrival.icaoCode;
	airlineIata = dataFlights[0].airline.iataCode;
	flightStatus = dataFlights[0].status;
	alert("INSIDE!\ndepartureIata: " + departureIata + "\ndepartureIcao: " + departureIcao + "\narrivalIata: " + arrivalIata + "\narrivalIcao: " + arrivalIcao + "\nairlineIata: " + airlineIata + "\nstatus: " + flightStatus);

    }, 'json')
    .then(function(dataB) {
	alert('in 2nd NESTED LOOP');
        //Query Aviation Edge Routes - NOT RELIABLE
	let urlRoutes = 'http://aviation-edge.com/api/public/routes?key=ce8aa4-7c63af-d48024-815717-bfad64' + '&departureIata=' + departureIata + '&departureIcao=' + departureIcao + '&airlineIata=' + airlineIata + '&airlineIcao=' + airlineIcao + '&flightNumber=' + flight;
        alert(urlRoutes);
	console.log(urlRoutes);
        $.get(urlRoutes, function (dataRoutes) {
            console.log(dataRoutes);
            arrivalTime = dataRoutes[0].arrivalTime;
            alert('arrivalTime: ' + arrivalTime);
        }, 'json');

    }, 'json')
	.then(function(data2) {
	    //CREATE MESSAGE FOR USER
	    console.log('3rd Nested PROMISE', data2);
	    console.log('airline: '+ airlineIcao + '  flightNum: ' + flight + '  zipcode: ' + zipCode);
	    let urlDriving = 'https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins='+ zipCode + '&destinations=' + arrivalIcao + '&key=AIzaSyBoRvW47xXGNrYz-LYR3TLHC-p18sPFIes';
	    console.log('DRIVING:\n' + urlDriving);

	    $.get(urlDriving)
		.done(function (dataResult) {
		    //TEST DATA
		    let timeToLeave = '5:30 PM';
		    let timeToArrive = '6:30 PM';


		    let driverTimeText = dataResult.rows[0].elements[0].duration.text;
		    let driverTimeValue = dataResult.rows[0].elements[0].duration.value; //in seconds
		    let driverTimeDuration = dataResult.rows[0].elements[0].duration.value / 60; //in min


		    /*var date = new Date();
		      var dateMillisec = date.getTime(); //Get from FlightAware
		      console.log('\nOrig date/time:\n' + date + ' = ' + dateMillisec);
		      
		      var timePeriod = "00:30:00"; //30 minutes, so the format is HH:MM:SS
		      var parts = timePeriod.split(/:/);
		      var timePeriodMillis = (parseInt(parts[0], 10) * 60 * 60 * 1000) +
                      (parseInt(parts[1], 10) * 60 * 1000) + 
                      (parseInt(parts[2], 10) * 1000);

		      var newDate = new Date();
		      newDate.setTime(dateMillisec + timePeriodMillis);

		      console.log('\ntimePeriodMillis:\n' + timePeriod + ' = ' + timePeriodMillis); //ex: Mon Feb 12 2018 06:04:40 GMT+0000 (UTC)
		      console.log('\nnewDate:\n' + newDate); //ex: Mon Feb 12 2018 06:34:40 GMT+0000 (UTC)
		    */
		    

		    //resultTime = arrivalTime - (driverTimeValue / 60);
		    console.log('arrivalTime: ' + arrivalTime);

		    let resultText = 'Your best time to Leave is ' + timeToLeave + ' (to arrive at ' + timeToArrive + ')';
		    console.log('dataResult query  of DistanceMatrix: ' + dataResult.rows[0]);
		    $('#result').text(dataResult.rows[0].elements[0].duration.value);
		    //$('#result').text(resultText);

		    //DRAW MAP
		    //src = 'https://www.google.com/maps/embed/v1/directions?origin=' + origin + '&destination=' + '&key=AIzaSyABso7fs_w6S9pxMMK1T5vKZERvnA5Nzy0';
		    //document.getElementById("drivingMap").src = totalURL;
		    /* FROM index.html
		      <div id="mapMain" class="span6 col-md-6 col-sm-6 col-xs-6">
			<iframe id="drivingMap" width="100%" height="100%" style="border:0" allowfullscreen></iframe>
			<script>
			  let url1 = "https://www.google.com/maps/embed/v1/directions?origin=";
		      let origin = "94546";
		      let url2 = "&destination="
		      let destination = "KOAK";
		      let key = "&key=AIzaSyABso7fs_w6S9pxMMK1T5vKZERvnA5Nzy0";
		      let totalURL = url1 + origin + url2 + destination + key;
		      document.getElementById("drivingMap").src = totalURL;
		    </script>
		    </div>
		    */

		});
	});

};
