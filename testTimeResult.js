var driveTime = 30*60*1000; // 30 minutes

var time = new Date(1518448920000).getTime();
var date = new Date(time);
console.log('ORIG: ' + date.toString());

console.log('MINUS 30 min DRIVE TIME');

var time2 = new Date(1518448920000 - driveTime).getTime();
var date2 = new Date(time2);
console.log('NEW:  ' + date2.toString());


let ampm, hh, mm;
if (date2.getHours() > 11) { //0-23
    ampm = 'PM';
    hh = date2.getHours() % 12;
} else {
    ampm = 'AM';
    hh = date2.getHours();
}
mm = date2.getMinutes();

finalTime = hh + ':' + mm + ' ' + ampm;
console.log('FINAL TIME: ' + finalTime);
