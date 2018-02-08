//TEST DATA

//BUILD QUERY FOR FLIGHTAWARE FOR SPECIFIC FLIGHT
let airline = $('#Airline').val();
let flightNumber = $('#Flight').val();

//BUILD URL FOR GOOGLE MAPS DISTANCE MATRIX API
let driverStart = '94546';
let driverEnd = 'KOAK';

let url = 'https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=' 
    + driverStart + '&destinations=' + driverEnd + '&key=AIzaSyBoRvW47xXGNrYz-LYR3TLHC-p18sPFIes';

//RUN JQUERY AJAX
$.get(url)
    .done(function (data) {
	let driverDurationText = data.rows[0].elements[0].duration.text;
	let driverDurationValue = data.rows[0].elements[0].duration.value; //in seconds

	let flightArrive = ''; //in Epoch seconds
	let timeCalc = '';

	let timeToLeave = '5:05 PM';
	let timeToArrive = '6:39 PM';
	let resultText = 'Best time to Leave is <u><b>' + timeToLeave + ' +</b></u> (to arrive at ' + timeToArrive + ')';

	$('#result').text(data.rows[0].elements[0].duration.text);
    });

