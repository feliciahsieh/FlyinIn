#!/usr/bin/node

let twilio = require('twilio', process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

let time = '5:37 PM';
let phoneNum;
let phoneFI = '+14156894700';
let message = 'Best time to leave for the airport is at ' + time + '. Regards, Flyin In Team';

phoneNum = '+14156894700'; //test phone number
phoneNum = '+1' + $('#Phone').val();

twilio.messages.create({
  to: phoneNum,
  from: phoneFI,
  body: message
}).then((message) => console.log(message.sid), function (err) {
  console.log(err); // Error message
});
