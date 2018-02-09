//Testing Flight Tracker
let airlineICAO = 'B6';
let flightNumber = 616;
let url = 'http://aviation-edge.com/api/public/flights?&key=ce8aa4-7c63af-d48024-815717-bfad64' + '&flight[iataNumber]=' + airlineICAO + flightNumber;

//RUN JQUERY AJAX
$.get(url, function (data) {
    console.log(data);
    console.log(data[0].status);
    $('#schedule').text(data[0].status);
}, 'json');


