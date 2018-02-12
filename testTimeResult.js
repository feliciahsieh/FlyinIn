var driveTime = 30*60*1000; // 30 minutes

var time = new Date(1518448920000).getTime();
var date = new Date(time);
console.log('ORIG:' + date.toString());


var time2 = new Date(1518448920000 - driveTime).getTime();
var date2 = new Date(time2);
console.log('NEW:' + date2.toString());

var formattedDate = date2.toLocaleTimeString();
console.log('formatted date: ' + formattedDate);
