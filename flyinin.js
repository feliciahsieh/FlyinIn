//FILE: flyinin.js

//GLOBAL VARS
var formData = {
};
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


function processInput() {
    $("#FIAirline").val($("#FIAirline").val().toUpperCase());
    $("#FIOriginAirportIcao").val($("#FIOriginAirportIcao").val().toUpperCase());
    //console.log($("#FIAirline"));
    console.log($("#FIOriginAirportIcao"));
    //Get Airline input field
    switch ($("#FIAirline").val()) {
    case 'JBU':
	airlineIcao = $("#FIAirline").val();
	airlineIata = 'B6';
	break;
    case 'B6':
	airlineIata = $("#FIAirline").val();
	airlineIcao = 'JBU';
	break;
    case 'SWA':
	airlineIcao = $("#FIAirline").val();
	airlineIata = 'WN';
	break;
    case 'WN':
	airlineIata = $("#FIAirline").val();
	airlineIcao = 'SWA';
	break;
    case 'ASA':
	airlineIcao = $("#FIAirline").val();
	airlineIata = 'AS';
	break;
    case 'WN':
	airlineIata = $("#FIAirline").val();
	airlineIcao = 'ASA';
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

    }, 'json');

}

