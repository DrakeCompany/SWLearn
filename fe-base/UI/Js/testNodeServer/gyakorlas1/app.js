/**
 * Created by Sa on 2016.11.14..
 */
var hello2 = require('./hello');
hello2;

function callWithTwo( func ) {
    func(3);
}
callWithTwo( function (x) {
    console.log(x*x);
})

var EventEmitter = require('events');
var  myEvents = new  EventEmitter();

myEvents.on('test-event', function () {
    console.log('Test event received!');
});

setTimeout(function () {
    myEvents.emit('test-event');
},5000);