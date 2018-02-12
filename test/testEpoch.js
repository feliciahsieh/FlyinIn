#!/usr/bin/node

//Epoch is in seconds
//UTC is in milliseconds
//Calculator https://www.epochconverter.com/

var arrivalTime = 1517985077; //Flight Arrival from FlightAware in Unix Epoch time (seconds)
var flightDelays = 60 * 0 * 0; //Flight Delay from FlightAware
var passengerToCurb = 60 * 15 * 0; //15 min for passenger to walk to curb
var passengerBaggage = 60 * 25 * 0; //If passenger has check-in baggage
var driverTime = 60 * 25 * 0; //Drive Time from Google Maps (Check if in seconds or ms)
var finalTime = arrivalTime + flightDelays + passengerToCurb + passengerBaggage - driverTime;
console.log(arrivalTime);
console.log(finalTime);

function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = ('0' + minutes).slice(-2);
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}

function convertEpochToSpecificTimezone(offset){
    var d = new Date(1495159447834);
    var utc = d.getTime() + (d.getTimezoneOffset() * 60000);  //This converts to UTC 00:00
    var nd = new Date(utc + (3600000*offset));
    return nd.toLocaleString();
}

d = new Date(finalTime);
console.log(formatAMPM(d));

var jstz = require('jstimezonedetect');
var tz = jstz.determine().name();
console.log('timezone:'+ tz);
