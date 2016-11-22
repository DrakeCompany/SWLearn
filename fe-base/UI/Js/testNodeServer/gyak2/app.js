/**
 * Created by Sa on 2016.11.14..
 */
var http = require('http');
var server = http.createServer();
// when a client requests something...
server.on('request', function(request, response) {
    // ...send the following string, and close the connection
   // response.end('hello world');

    console.log( request.url );
    if( request.url == '/test' ) {
        response.end('<a href="/">Go back</a>');
    } else {
        response.end('<a href="/test">Let\'s go to test!</a>');
    }
});
// listen on port 1337
server.listen(1337);