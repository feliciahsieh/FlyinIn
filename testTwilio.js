#!/usr/bin/node

var twilio = require('twilio', process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

var time = '4:37 PM';
var timeDiff = '1 hr(s) 15 min';
var phoneNum;
var phoneFI = '+14156894700';
var msg = 'The best time to leave for the airport is at ' + time + ' in ' + timeDiff + '. Regards, Flyin In Team';

phoneNum = '+14156894700'; //test phone number
//phoneNum = $('#Phone').val();

twilio.messages.create({
  to: phoneNum,
  from: phoneFI,
  body: msg
}).then((message) => console.log(message.sid), function (err) {
  console.log(err); // Error message
});
