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

//GLOBAL VARS
var formData = {
};
//$.formData = formData;

var airlineIata = ''; //from user. Fix later
var airlineIcao = ''; //from user. Fix later
var flight; //from user
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

function processInput() {
    $("#Airline").val($("#Airline").val().toUpperCase());
    //Get Airline input field
    switch ($("#Airline").val()) {
    case 'JBU':
	airlineIcao = $("#Airline").val();
	airlineIata = 'B6';
	break;
    case 'B6':
	airlineIata = $("#Airline").val();
	airlineIcao = 'JBU';
	break;
    case 'SWA':
	airlineIcao = $("#Airline").val();
	airlineIata = 'WN';
	break;
    case 'WN':
	airlineIata = $("#Airline").val();
	airlineIcao = 'LUV';
	break;
    case 'ASA':
	airlineIcao = $("#Airline").val();
	airlineIata = 'AS';
	break;
    case 'WN':
	airlineIata = $("#Airline").val();
	airlineIcao = 'ASA';
	break;

    default:
	airlineIata = 'FI ERROR';
	airlineIcao = 'FI ERROR';
    }

    //Get Flight Number input field
    flight = $("#FlightNum").val();
    //Lookup Flight Info from AviationEdge
    //alert("airlineIata:" + airlineIata + " flight:" + flight);
    zipCode = $("#ZipCode").val();
    let urlFlights = 'https://aviation-edge.com/api/public/flights?&key=ce8aa4-7c63af-d48024-815717-bfad64' + '&flight[iataNumber]=' + airlineIata + flight;

    $.get(urlFlights, function (dataFlights) {
	//console.log(dataFlights);
	departureIata = dataFlights[0].departure.iataCode;
	departureIcao = dataFlights[0].departure.icaoCode;
	arrivalIata = dataFlights[0].arrival.iataCode;
	arrivalIcao = dataFlights[0].arrival.icaoCode;
	airlineIata = dataFlights[0].airline.iataCode;
	flightStatus = dataFlights[0].status;
	alert("INSIDE!\ndepartureIata: " + departureIata + "\ndepartureIcao: " + departureIcao + "\narrivalIata: " + arrivalIata + "\narrivalIcao: " + arrivalIcao + "\nairlineIata: " + airlineIata + "\nstatus: " + flightStatus);

	//Query Aviation Edge Routes
	$.get(urlFlights, function(dataRoutes) {
	    let urlRoutes = 'http://aviation-edge.com/api/public/routes?key=ce8aa4-7c63af-d48024-815717-bfad64' + '&departureIata=' + departureIata + '&departureIcao=' + departureIcao + '&airlineIata=' + airlineIata + '&airlineIcao=' + airlineIcao + '&flightNumber=' + flight;
	    alert(urlRoutes);
	    $.get(urlRoutes, function (dataRoutes) {
		console.log(dataRoutes);
		arrivalTime = dataRoutes[0].arrivalTime;
		alert('arrivalTime: ' + arrivalTime);
	    }, 'json');

	}, 'json');

    }, 'json');

}

function checkAirline (inputTxt) {
    //stub function for check
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

function checkFlightNum (inputTxt) {
  var flightNum = /^[0-9]{1,4}$/;
  if (inputTxt.value.match(flightNum)) {
    return true;
  } else {
    alert('Flight Numbers should match the format, nnnn');
    document.getElementById('Flight').value = '';
    return false;
  }
}

function checkZipCode (inputTxt) {
  var zipCode = /^[0-9]{5}$/;
  if (inputTxt.value.match(zipCode)) {
    return true;
  } else {
    alert('Zip Code should match the value nnnnn');
    document.getElementById('ZipCode').value = '';
    return false;
  }
}
