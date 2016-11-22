/**
 * Created by Sa on 2016.11.11..
 */
// var http = require('http');
// var fs = require('fs');
// var server = http.createServer();
// server.on('request', function(request, response) {
//     var filename = __dirname + '/index.html';
//     fs.createReadStream(filename).pipe(response);
// });
// server.listen(1338);

var http = require('http');
var fs = require('fs');
var url = require('url');
var server = http.createServer();
server.on('request', function(request, response) {
    var params = url.parse(request.url, true);
    console.log(params); // a terminálba logol, mivel a serveren fut a code.
    if(params.pathname == '/test') {
        response.end('Hello ' + params.query.name +'</br>'+params.query.email+ '!');
        return;
    }
    var filename = __dirname + '/index.html';
    fs.createReadStream(filename).pipe(response);
});
server.listen(1338);