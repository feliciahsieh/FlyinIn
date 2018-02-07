#!/usr/bin/node

//Epoch is in seconds
//UTC is in milliseconds
//Calculator https://www.epochconverter.com/
var departure = 1517969811;
var arrival = 1517969811 + (60*60*6) + (60*30); //6:30 hours from now

var difference = (arrival - departure)/60/60;
console.log("Time difference: " + difference);


function convertEpochToSpecificTimezone(offset){
    var d = new Date(1495159447834);
    var utc = d.getTime() + (d.getTimezoneOffset() * 60000);  //This converts to UTC 00:00
    var nd = new Date(utc + (3600000*offset));
    return nd.toLocaleString();
}
