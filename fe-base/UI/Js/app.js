/**
 * Created by Sa on 2016.11.11..
 */
// console.log("Hello word");

// var hello = require('./hello');
// hello.hello();
//hello();

var EventEmitter= require('events');
var myEvents= new EventEmitter();

myEvents.on('hello', function (what) {//on-al iratkozink fel a testt-event függvényre
    // console.log('Test event received!');
    console.log('Hello '+what+'!');
});

setTimeout( function () {
    // myEvents.emit('test-event');//elsüti az eventet
     myEvents.emit('hello','World');//elsüti a hello-t a world paraméterrel
},1000);