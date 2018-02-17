require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const request = require('request');
let twilio = require('twilio')(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors({ origin: '*', credentials: true }));

const apiKey = 'ce8aa4-7c63af-d48024-815717-bfad64';

app.get('/api', (req, res) => res.send('Hello World!'));

app.get('/api/gdrive', (req, res) => {
	let uri = 'https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial';

	const URL = uri
		+ '&origins='+ req.query.zipCode
		+ '&destinations=' + req.query.destinations
		+ '&key=AIzaSyApQx97pXZTl1IOF1t-F7OnQTndQzU-QUs';

	console.log(URL);

  request(URL, (err, responce, body) => {
			if (err) {
				console.log('avi/routes err:', err);
				res.json(JSON.parse(err));
			}

			console.log(body);

			res.json(JSON.parse(body));
  })
});

app.get('/api/aviation/routes', (req, res) => {
	let uri = 'http://aviation-edge.com/api/public/routes';

	const URL = uri + '?' + 'key=' + apiKey
		+ '&departureIata=' + req.query.departureIata
		+ '&departureIcao=' + req.query.departureIcao
		+ '&airlineIata=' + req.query.airlineIata
		+ '&airlineIcao=' + req.query.airlineIcao
		+ '&flightNumber=' + req.query.flightNumber;

	console.log(URL);

  request(URL, (err, responce, body) => {
			if (err) {
				console.log('avi/routes err:', err);
				res.json(JSON.parse(err));
			}

			console.log(body);

			res.json(JSON.parse(body));
  })
});

app.get('/api/aviation/flights', (req, res) => {
	let uri = 'http://aviation-edge.com/api/public/flights';
  let num = 'flight[iataNumber]=' + req.query.iataNumber;

	const URL = uri + '?' + 'key=' + apiKey + '&' + num;

	console.log(URL);

  request(URL, (err, responce, body) => {
			if (err) {
				console.log(err);
				res.json(err);
			}

			console.log(body);

			res.json(JSON.parse(body));
  })
});

app.get('/api/twilio', function(req, res){
  console.log(req.query);

  twilio.messages.create({
	to: req.query.phoneNum,
	from: req.query.FIphone,
	body: req.query.message
    }).then((message) => console.log(message.sid), function (err) {
	console.log(err); // Error message
    });

    res.send(req.body);
});

app.listen(process.env.TWILIO_PORT || 3005, function(){
    console.log("App running on port " + process.env.TWILIO_PORT || 3005);
});
