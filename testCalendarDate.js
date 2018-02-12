
//FIND CALENDAR DATE OF TODAY'S SINGLE FLIGHT
//FLIGHTAWARE USES GMT FOR MOST TIMESTAMPS
let dte = new Date();
var mm, dd;

console.log(dte);
options = {"timeZone" : "America/Los_Angeles"};
let localDate = dte.toLocaleDateString('en-EN', options);
console.log('localDate' + localDate);
let local=localDate.split('/');
if(local[0].length === 1)
    local[0] = '0' + local[0];
if(local[1].length === 1)
    local[1] = '0' + local[1];
flightDate = local[0] + '/' + local[1] + '/' + local[2];
console.log("Calculating today as: " + flightDate);
