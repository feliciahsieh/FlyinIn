//Global variables
//Hard coded for now (Flights)
var airlineIata = 'B6';
var airlineIcao = 'JBU';
var flightNumber = 615;

//Hard coded for now (Routes)
var departureIcao ='KJFK';
var departureIata ='JFK';

//Hard coded for now (Airport Timetable)
var airportIata = 'SFO';
//Not needed but airportIcao = 'KSFO';

//TEST QUERY (Flights)
//https://aviation-edge.com/api/public/flights?&key=ce8aa4-7c63af-d48024-815717-bfad64' + '&flight[iataNumber]=B6615
let urlFlights = 'https://aviation-edge.com/api/public/flights?&key=ce8aa4-7c63af-d48024-815717-bfad64' + '&flight[iataNumber]=' + airlineIata + flightNumber;

$.get(urlFlights, function (dataFlights) {
    //console.log(dataFlights);
    $('#status').text(dataFlights[0].status);
    $('#departureIataCode').text(dataFlights[0].departure.iataCode);
    $('#departureIcaoCode').text(dataFlights[0].departure.icaoCode);
    $('#airlineIcaoCode').text(dataFlights[0].airline.icaoCode);
    $('#airlineIataCode').text(dataFlights[0].airline.iataCode);
    departureIata = dataFlights[0].departure.iataCode;
    departureIcao = dataFlights[0].departure.icaoCode;
    airlineIata = dataFlights[0].airline.iataCode;
    airlineIcao = dataFlights[0].airline.icaoCode;
}, 'json');

//TEST QUERY (Routes)
//http://aviation-edge.com/api/public/routes?key=ce8aa4-7c63af-d48024-815717-bfad64&departureIata=JFK&departureIcao=KJFK&airlineIata=B6&airlineIcao=JBU&flightNumber=615

let urlRoutes = 'http://aviation-edge.com/api/public/routes?key=ce8aa4-7c63af-d48024-815717-bfad64' + '&departureIata=' + departureIata + '&departureIcao=' + departureIcao + '&airlineIata=' + airlineIata + '&airlineIcao=' + airlineIcao + '&flightNumber=' + flightNumber;

$.get(urlRoutes, function (dataRoutes) {
    //console.log(dataRoutes);
    $('#arrivalTime').text(dataRoutes[0].arrivalTime);
    $('#airlineIcao').text(dataRoutes[0].airlineicao);
    $('#flightNumber').text(dataRoutes[0].flightNumber);
}, 'json');

//TEST QUERY (Airport Timetable>
//http://aviation-edge.com/api/public/timetable?key=ce8aa4-7c63af-d48024-815717-bfad64&iataCode=SFO&type=arrival

let urlAirportTimetable = 'http://aviation-edge.com/api/public/timetable?key=ce8aa4-7c63af-d48024-815717-bfad64' + '&iataCode=' + airportIata + '&type=arrival';

//alert(urlAirportTimetable);

$.get(urlAirportTimetable, function (dataAirportTimetable) {
    let userFlight = airlineIcao + flightNumber;
    //console.log(userFlight);
    var i;
    for (i = 0; i < dataAirportTimetable.length; i++) {
	if (dataAirportTimetable[i].flight.icaoNumber === userFlight) {
	    console.log('FOUND IT');
	    console.log(dataAirportTimetable[i].airline.name);
	    console.log(dataAirportTimetable[i].arrival.estimatedTime);
	    break;
	}
    }
    $('#AirportTimetableStatus').text(dataAirportTimetable[i].status);
    $('#AirportTimetableEstimatedTime').text(dataAirportTimetable[i].arrival.estimatedTime);
}, 'json');
