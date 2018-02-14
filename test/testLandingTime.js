
var landingTime = '15:16:00'
//console.log('landingTime: ' + landingTime);
var ar = landingTime.split(':');
//console.log("AR: " + ar);

var landingT = new Date();
//console.log("landingT: " + landingT);
landingT.setHours(+ar[0], +ar[1], 0);
//console.log('landingT: ' + landingT);

arrivalTime = landingT;
console.log("ARRIVALTIME: " + arrivalTime + "getTime: " + arrivalTime.getTime());
