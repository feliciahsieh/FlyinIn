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
var resultText;

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
    let regExzipCode = /^[0-9]{5}$/;
    if (inputTxt.value.match(regExzipCode)) {
	return true;
    } else {
	alert('Zip Code should match the value nnnnn');
	document.getElementById('FIZipCode').value = 0;
	return false;
    }
}

function checkPhoneNum (inputTxt) {
    var regExphoneNum = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (inputTxt.value.match(regExphoneNum)) {
	return true;
    } else {
	alert('Phone Numbers should match the format, nnn-nnn-nnnn');
	document.getElementById('FIPhone').text('');
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
    case 'DAL':
	    airlineIcao = arln.val();
	    airlineIata = 'DL';
    	break;
    case 'DL':
	airlineIata = arln.val();
	airlineIcao = 'DAL';
	break;
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
    case 'AAL':
	airlineIcao = arln.val();
	airlineIata = 'AA';
	break;
    case 'UA':
	airlineIata = arln.val();
	airlineIcao = 'UAL';
	break;
    case 'UAL':
	airlineIcao = arln.val();
	airlineIata = 'UA';
	break;
    case 'AA':
	airlineIata = arln.val();
	airlineIcao = 'AAL';
	break;
    case 'SKW':
	airlineIcao = arln.val();
	airlineIata = 'OO';
    case 'OO':
	break;
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
    let urlFlights = '//flyinin.korejs.org/api/aviation/flights?iataNumber=' + airlineIata + flight;
    //alert(urlFlights);
    $.get(urlFlights, function (dataFlights) {
	//console.log('DATAFLIGHTS: ' + dataFlights[0].departure);
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
	//alert("INSIDE!\ndepartureIata: " + departureIata + "\ndepartureIcao: " + departureIcao + "\narrivalIata: " + arrivalIata + "\narrivalIcao: " + arrivalIcao + "\nairlineIata: " + airlineIata + "\nstatus: " + flightStatus);

    }, 'json')
    .done(function(dataB) {
	//alert('2nd NESTED LOOP: Query Aviation Edge Routes');
        //Query Aviation Edge Routes - NOT RELIABLE
	let urlRoutes = '//flyinin.korejs.org/api/aviation/routes'  + '?departureIata=' + departureIata + '&departureIcao=' + departureIcao + '&airlineIata=' + airlineIata + '&airlineIcao=' + airlineIcao + '&flightNumber=' + flight;
        //alert(urlRoutes);
	//https://aviation-edge.com/api/public/routes?key=ce8aa4-7c63af-d48024-815717-bfad64&departureIata=SEA&departureIcao=KSEA&airlineIata=AS&airlineIcao=ASA&flightNumber=360
	console.log(urlRoutes);
        $.get(urlRoutes, function (dataRoutes) {
            console.log(dataRoutes);

            let landingTime = dataRoutes[0].arrivalTime; //format '15:15:00'
	    //console.log('landingTime: ' + landingTime);
	    var ar = landingTime.split(':');
	    //console.log("AR: " + ar);

	    var landingT = new Date();
	    //console.log("landingT: " + landingT);
	    landingT.setHours(+ar[0], +ar[1], 0);
	    //console.log('landingT: ' + landingT);

	    arrivalTime = landingT;
	    console.log("ARRIVALTIME: " + arrivalTime);

        }, 'json')

	    .done(function(data2) {
		//CREATE MESSAGE FOR USER
		console.log('3rd Nested PROMISE', data2);
		console.log('airline: '+ airlineIcao + '  flightNum: ' + flight + '  zipcode: ' + zipCode);
		console.log('arrivalIcao: ' + arrivalIcao);

    let urlDriving = 'http://flyinin.korejs.org/api/gdrive'
      + '?zipCode=' + zipCode
      + '&destinations=' + arrivalIata;

		console.log('DRIVING:\n' + urlDriving);
		console.log("URLDRIVING: " + urlDriving);
		$.get(urlDriving)
		    .done(function (dataResult) {

			let driverTimeText = dataResult.rows[0].elements[0].duration.text;
			console.log("driverTimeText: " + dataResult.rows[0].elements[0].duration.text);

			let driverTimeValue = dataResult.rows[0].elements[0].duration.value; //in seconds. USE FOR CALCULATION
			console.log("driverTimeValue: " + dataResult.rows[0].elements[0].duration.value);
			console.log("driverTimeValue (min): " + dataResult.rows[0].elements[0].duration.value / 60);

			let driverTimeQuery = dataResult.rows[0].elements[0].status;
			console.log("driverTimeQuery: " + dataResult.rows[0].elements[0].status);

			//******CALCULATE DRIVE TIME*******/
			//Date.prototype.addHours = function(h) {
			//this.setTime(this.getTime() + (h*60*60*1000));
			//return this;
			//}

			var walkToCurb = 15 * 60;
			console.log("walkToCurb (sec): " + walkToCurb + " = " + (walkToCurb / 60) + " min" );

			var time = new Date(arrivalTime); //Already in local time
			console.log('typeof(time): ' + typeof(arrivalTime));
			console.log('ORIG ARRIVAL: ' + arrivalTime);

			var offset = (walkToCurb - driverTimeValue) * 1000; //walkToCurb (sec) + driverTimeValue (sec) but convert ms
			console.log('offset: ' + offset);
			time.setTime(time.getTime() + offset);
			console.log('UPDATED TIME:  ' + time);

			let ampm, hh, mm;
			if (time.getHours() > 11) { //0-23
			    ampm = 'PM';
			    hh = time.getHours() % 12;
			} else {
			    ampm = 'AM';
			    hh = time.getHours();
			}
			if (time.getMinutes() < 10) { //0-59
			    mm = '0' + time.getMinutes();
			} else {
			    mm = time.getMinutes();
			}

			finalTime = hh + ':' + mm + ' ' + ampm;
			console.log('FINAL TIME: ' + finalTime);
			//******CALCULATE DRIVE TIME*******/
			let tempAMPM;
			resultText = 'Your best time to leave is <B><I><U>' + finalTime + '</U></I></B>.';
			resultText = resultText + '<BR>Your Estimated drive time is ' + driverTimeText + '.';
			resultText = resultText + '<BR>Their flight ' + airlineIcao + flight + ' from ' + departureIcao + ' to ' + arrivalIcao;
			let tempHH = arrivalTime.getHours();
			let tempMM = arrivalTime.getMinutes();
			if (tempHH > 11) { //0-23
			    tempAMPM = 'PM';
			    tempHH = tempHH % 12;
			} else {
			    tempAMPM = 'AM';
			}
			if (tempMM < 10) {
			    tempMM = '0' + tempMM;
			}
			tempTime = tempHH + ':' + tempMM + ' ' + tempAMPM;

			let txt = tempHH + ":" + tempMM;
			resultText = resultText + "<BR>is arriving at: " + tempTime + '.';
			console.log('dataResult query of DistanceMatrix: ' + dataResult.rows[0].elements[0]);
			$('#result').html(resultText);

			//DRAW MAP

			  $("#drivingMap").html(`
			  <iframe id="drivingMap" width="100%" height="100%" style="border:0" allowfullscreen></iframe>
			  <script>
			  document.getElementById("drivingMap").src = "https://www.google.com/maps/embed/v1/directions?origin=" + zipCode + "&destination=" + arrivalIcao + ' airport' + "&key=AIzaSyABso7fs_w6S9pxMMK1T5vKZERvnA5Nzy0";
			  </script>`);

		    }, 'json')

		});
	});

};

function processTextMessage(e) {
    e.preventDefault();

    let userPhone = $('#FIPhone').val();
    let msg = $('#result').text();
    let urlTwilio = '//flyinin.korejs.org/api/twilio';

    let data = {
    	"message" : msg,
	"FIphone" : "4156894700",
	"phoneNum" : userPhone,
    };

    $.ajax({
	type: 'POST',
	url: urlTwilio,
	data: data,
	contentType: 'application/json',
	success: function(js) {
	    return "ok";
	}
    });
}
