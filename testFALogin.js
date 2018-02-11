var request = require('request');
var username = process.env.FLIGHTAWARE_USER;
var key = process.env.FLIGHTAWARE_API3;
var fxmlUrl = 'https://flightxml.flightaware.com/json/FlightXML3/';
var client_options = {
    url: 'http://192.168.33.10:8080/', //'http://localhost',
    auth: {
	user: username,
	password: key
    }
};

//METHOD 1
request(client_options, function (err, res, body) {
    if (err) {
	console.log(err);
	return;
    }
    console.log('headers', res.headers);
    console.log('status code', res.statusCode);
    console.log(body);
});

//METHOD 2
var Client = require('node-rest-client').Client;
var client = new Client(client_options);
client.registerMethod('findFlights', fxmlUrl + 'FindFlight', 'GET');
var findFlightArgs = {
    parameters: {
        origin: 'KIAH',
        destination: 'KJFK',
        type: 'nonstop'
    }
};
client.methods.findFlights(findFlightArgs, function (data, response) {
    console.log(data.toString());
});

/************ OUTPUT of running the above *************************
vagrant@vagrant-ubuntu-trusty-64:~/FlyinIn$ node testFALogin.js 

headers { server: 'nginx/1.13.8',
  date: 'Sun, 11 Feb 2018 17:56:15 GMT',
  'content-type': 'text/html',
  'content-length': '807',
  'last-modified': 'Sun, 11 Feb 2018 08:16:06 GMT',
  connection: 'close',
  etag: '"5a7ffbc6-327"',
  'accept-ranges': 'bytes' }
status code 200
<html>
<head>
  <script
     src="http://code.jquery.com/jquery-3.3.1.min.js"
     integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
     crossorigin="anonymous">
  </script>
  <script type="text/javascript" src="testFlightAware.js"></script>
</head>
<body>
  <br><br>
  FlightInfoStatus<br>
  <div id="FAdate" style="background-color: lightblue">Put FlightInfoStatus>Put date here</div>
  <div id="FAarrivalTime" style="background-color: lightblue">Put FlightInfoStatus>Put estimated_arrival_time>time here</div>
  <div id="FAestimatedArrivalTZ" style="background-color: lightblue">Put FlightInfoStatus>Put estimated_arrival_time>local timezone here</div>
  <div id="FAarrivalDelay" style="background-color: lightblue">Put FlightInfoStatus>Put arrival_delay>status here</div>
</body>
</html>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">

<html>
<head>
<title>Authentication Required</title>
</head>
<body>
<h1>Authentication Required</h1>


</body>
</html>

*/
