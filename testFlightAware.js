//GLOBAL VARS from previous query
//Hard coded for now (Flights)
//var airlineIata = 'B6'; //'WN'; //'B6';
var airlineIcao = 'SWA'; //'SWA'; //'JBU';
var flight = 2243; //4110; //615;

//TEST QUERY (FlightInfoStatus)
//https://flightxml.flightaware.com/json/FlightXML3/FlightInfoStatus?ident=JBU615&howMany=3&include_ex_data=false
let username = process.env.FLIGHTAWARE_USER;
let key= process.env.FLIGHTAWARE_API3;
let urlFlightInfoStatus = 'http://flightxml.flightaware.com/json/FlightXML3/FlightInfoStatus?ident=' + airlineIcao + flight + '&howMany=3&include_ex_data=false';
let urlFA = 'flightxml.flightaware.com/json/FlightXML3/FlightInfoStatus?ident=' + airlineIcao + flight + '&howMany=3&include_ex_data=false';
//alert(urlFlightInfoStatus);

//$.get('http://'+username+':'+key+'@'+urlFA, function (dataFlightInfoStatus) {
//    console.log(dataFlightInfoStatus);
    //$('#status').text(dataFlights[0].status);
    //$('#airlineIataCode').text(dataFlights[0].airline.iataCode);
    //airlineIata = dataFlights[0].airline.iataCode;
    //airlineIcao = dataFlights[0].airline.icaoCode;
//}, 'json');

/*
function make_base_auth(user, password) {
  var tok = user + ':' + password;
  var hash = btoa(tok);
  return "Basic " + hash;
}

$.ajax
  ({
    type: "GET",
    url: urlFA,
      contentType: "application/json",
    dataType: 'json',
    data: '{}',
    beforeSend: function (xhr){ 
        xhr.setRequestHeader('Authorization', make_base_auth(username, key)); 
    },
    success: function (){
        alert('Thanks for your comment!'); 
    }
});
*/

//DUMMY DATA
d={"FlightInfoStatusResult":{"next_offset":4,"flights":[{"ident":"JBU615","faFlightID":"JBU615-1518330357-airline-0076","airline":"JBU","airline_iata":"B6","flightnumber":"615","type":"Form_Airline","codeshares":"ETD8355,UAE6123,ETD8310","blocked":false,"diverted":false,"cancelled":false,"origin":{"code":"KJFK","city":"New York, NY","alternate_ident":"JFK","airport_name":"John F Kennedy Intl"},"destination":{"code":"KSFO","city":"San Francisco, CA","alternate_ident":"SFO","airport_name":"San Francisco Intl"},"filed_ete":22800,"filed_airspeed_kts":355,"distance_filed":2583,"filed_departure_time":{"epoch":1518540000,"tz":"EST","dow":"Tuesday","time":"11:40AM","date":"02/13/2018","localtime":1518522000},"estimated_departure_time":{"epoch":1518540600,"tz":"EST","dow":"Tuesday","time":"11:50AM","date":"02/13/2018","localtime":1518522600},"actual_departure_time":{"epoch":0},"departure_delay":600,"filed_arrival_time":{"epoch":1518562800,"tz":"PST","dow":"Tuesday","time":"03:00PM","date":"02/13/2018","localtime":1518534000},"estimated_arrival_time":{"epoch":1518563400,"tz":"PST","dow":"Tuesday","time":"03:10PM","date":"02/13/2018","localtime":1518534600},"actual_arrival_time":{"epoch":0},"arrival_delay":600,"status":"Scheduled","progress_percent":-1,"aircrafttype":"A320","full_aircrafttype":"A320","adhoc":false},{"ident":"JBU615","faFlightID":"JBU615-1518243959-airline-0179","airline":"JBU","airline_iata":"B6","flightnumber":"615","type":"Form_Airline","codeshares":"ETD8355,UAE6123,ETD8310","blocked":false,"diverted":false,"cancelled":false,"origin":{"code":"KJFK","city":"New York, NY","alternate_ident":"JFK","airport_name":"John F Kennedy Intl"},"destination":{"code":"KSFO","city":"San Francisco, CA","alternate_ident":"SFO","airport_name":"San Francisco Intl"},"filed_ete":22800,"filed_airspeed_kts":355,"distance_filed":2583,"filed_departure_time":{"epoch":1518453600,"tz":"EST","dow":"Monday","time":"11:40AM","date":"02/12/2018","localtime":1518435600},"estimated_departure_time":{"epoch":1518454200,"tz":"EST","dow":"Monday","time":"11:50AM","date":"02/12/2018","localtime":1518436200},"actual_departure_time":{"epoch":0},"departure_delay":600,"filed_arrival_time":{"epoch":1518476400,"tz":"PST","dow":"Monday","time":"03:00PM","date":"02/12/2018","localtime":1518447600},"estimated_arrival_time":{"epoch":1518477000,"tz":"PST","dow":"Monday","time":"03:10PM","date":"02/12/2018","localtime":1518448200},"actual_arrival_time":{"epoch":0},"arrival_delay":600,"status":"Scheduled","progress_percent":-1,"aircrafttype":"A320","full_aircrafttype":"A320","adhoc":false},{"ident":"JBU615","faFlightID":"JBU615-1518157560-airline-0021","airline":"JBU","airline_iata":"B6","flightnumber":"615","type":"Form_Airline","codeshares":"ETD8355,UAE6123,ETD8310","blocked":false,"diverted":false,"cancelled":false,"origin":{"code":"KJFK","city":"New York, NY","alternate_ident":"JFK","airport_name":"John F Kennedy Intl"},"destination":{"code":"KSFO","city":"San Francisco, CA","alternate_ident":"SFO","airport_name":"San Francisco Intl"},"filed_ete":22800,"route":"RBV J230 AIR J80 SAAGS J80 OAL INYOE DYAMD3","filed_altitude":320,"display_filed_altitude":"32,000 feet","filed_airspeed_kts":460,"distance_filed":2636,"filed_departure_time":{"epoch":1518367200,"tz":"EST","dow":"Sunday","time":"11:40AM","date":"02/11/2018","localtime":1518349200},"estimated_departure_time":{"epoch":1518367800,"tz":"EST","dow":"Sunday","time":"11:50AM","date":"02/11/2018","localtime":1518349800},"actual_departure_time":{"epoch":0},"departure_delay":600,"filed_arrival_time":{"epoch":1518390000,"tz":"PST","dow":"Sunday","time":"03:00PM","date":"02/11/2018","localtime":1518361200},"estimated_arrival_time":{"epoch":1518390600,"tz":"PST","dow":"Sunday","time":"03:10PM","date":"02/11/2018","localtime":1518361800},"actual_arrival_time":{"epoch":0},"arrival_delay":600,"status":"Scheduled","progress_percent":-1,"aircrafttype":"A320","full_aircrafttype":"A320","adhoc":false},{"ident":"JBU615","faFlightID":"JBU615-1518071175-airline-0209","airline":"JBU","airline_iata":"B6","flightnumber":"615","tailnumber":"N947JB","type":"Form_Airline","codeshares":"ETD8355,UAE6123,ETD8310","blocked":false,"diverted":false,"cancelled":false,"origin":{"code":"KJFK","city":"New York, NY","alternate_ident":"JFK","airport_name":"John F Kennedy Intl"},"destination":{"code":"KSFO","city":"San Francisco, CA","alternate_ident":"SFO","airport_name":"San Francisco Intl"},"filed_ete":24060,"route":"BIGGY260046 AIR ROD BVT RBS IRK PWE J130 MCK J44 FQF JNC J80 OAL INYOE DYAMD3","filed_altitude":320,"display_filed_altitude":"32,000 feet","filed_airspeed_kts":460,"distance_filed":2620,"filed_departure_time":{"epoch":1518280800,"tz":"EST","dow":"Saturday","time":"11:40AM","date":"02/10/2018","localtime":1518262800},"estimated_departure_time":{"epoch":1518282300,"tz":"EST","dow":"Saturday","time":"12:05PM","date":"02/10/2018","localtime":1518264300},"actual_departure_time":{"epoch":1518281340,"tz":"EST","dow":"Saturday","time":"11:49AM","date":"02/10/2018","localtime":1518263340},"departure_delay":540,"filed_arrival_time":{"epoch":1518304860,"tz":"PST","dow":"Saturday","time":"03:21PM","date":"02/10/2018","localtime":1518276060},"estimated_arrival_time":{"epoch":1518305191,"tz":"PST","dow":"Saturday","time":"03:26PM","date":"02/10/2018","localtime":1518276391},"actual_arrival_time":{"epoch":1518305191,"tz":"PST","dow":"Saturday","time":"03:26PM","date":"02/10/2018","localtime":1518276391},"arrival_delay":840,"status":"Arrived / Gate Arrival","progress_percent":100,"aircrafttype":"A320","full_aircrafttype":"A320","inbound_faFlightID":"JBU90-1517984756-airline-0043","adhoc":false}]}};

console.log(d);

//GLOBAL VARS
var flightDate;
var messageTime;
var messageTZ;
var messageFlightDelay;

//FIND TODAY'S SINGLE FLIGHT
let dte = new Date();
let month = dte.getMonth() + 1;
month = month < 10 ? '0' + month : month;

let day = dte.getDate();
day = day < 10 ? '0' + day : day;
flightDate = month + '/' + day + '/' + dte.getFullYear();
var i;
for (i = 0; i < d.FlightInfoStatusResult.flights.length; i++) {
    if (d.FlightInfoStatusResult.flights[i].estimated_arrival_time.date === flightDate) {
	console.log(d.FlightInfoStatusResult.flights[i].estimated_arrival_time.date + ' ' + 
		    d.FlightInfoStatusResult.flights[i].estimated_arrival_time.time + ' ' + 
		    d.FlightInfoStatusResult.flights[i].estimated_arrival_time.tz + ' ' +
		    d.FlightInfoStatusResult.flights[i].departure_delay/60 + ' min delay');
	messageTime = d.FlightInfoStatusResult.flights[i].estimated_arrival_time.time; 
	messageTZ = d.FlightInfoStatusResult.flights[i].estimated_arrival_time.tz;
	messageFlightDelay = d.FlightInfoStatusResult.flights[i].departure_delay / 60; //in min
	break;
    }
}
$('#FAdate').text(d.FlightInfoStatusResult.flights[i].estimated_arrival_time.date);
$('#FArrivalTime').text(d.FlightInfoStatusResult.flights[i].estimated_arrival_time.time);
$('#FAestimatedArrivalTZ').text(d.FlightInfoStatusResult.flights[i].estimated_arrival_time.tz);
$('#FAarrivalDelay').text(d.FlightInfoStatusResult.flights[i].departure_delay / 60);
