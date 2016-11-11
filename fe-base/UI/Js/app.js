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

var http=require('http');
var server =http.createServer();
server.on('request', function (request, response) {
    console.log(request.url);
    if(request.url == '/test'){
        // response.end('hello world10');
        response.end('<a href="/">Go back</a>a>');
    } else if(request.url == '/test2'){
        response.end('<a href="http://www.w3schools.com/js/js_strings.asp">w3SChool2</a>');

    }else if(request.url == '/?test=helloWord') {
        response.end('<a href="/test?=helloWord">/?test=helloWord</a>');
    }
    else {
        response.end('<a href="/test">Let\'s got test!</a>');
    }
});

server.listen(1337);