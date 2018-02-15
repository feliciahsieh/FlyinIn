const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
let twilio = require('twilio')(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors({ origin: '*', credentials: true }));

app.post('/api/twilio', function(req, res){

    twilio.messages.create({
	to: req.body.phoneNum,
	from: req.body.FIphone,
	body: req.body.message
    }).then((message) => console.log(message.sid), function (err) {
	console.log(err); // Error message
    });

    res.send(req.body);
  });
app.listen(process.env.TWILIO_PORT || 3005, function(){
    console.log("App running on port " + process.env.TWILIO_PORT || 3005);
});
