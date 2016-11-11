/**
 * Created by Sa on 2016.11.11..
 */

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use( function(req, res, next) {
    if( req.query.secret != '1337' ) {//?secret=1337
        res.send('Wrong secret!');
    } else {
        next();
    }
} );

app.use(express.static('public')); //így eléria css-t és minden mást
app.use(bodyParser.urlencoded());
// when a http GET request is received on the path '/test'...
app.get('/test', function(req, res) {
    // ... send the user agent this string
    res.send('Hello ' + req.query.name + '!');
});
// app.post('/test', function(req, res) {
//     // ... send the user agent this string
//     res.send('Hello ' + req.query.name + ' ez most posttal van!');
// });
// app.post('/test', function(req, res) {
//     var body = '';
//     req.on('data', function(data) {
//         body += data;
//         console.log("body1On: "+body);
//     });
//     req.on('end', function() {
//         console.log("bodyReq: "+body);
//         res.send(body);
//     });
// });
app.post('/test', function(req, res) {
    res.send('Hello ' + req.body.name + ' body-parserrel!');
});
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});
app.get('/test/:name', function(req, res) { // az url-ben tudsz kérni bármilyen címre(névre) dinamikusan
    res.send('Hello ' + req.params.name + '!');
});
app.listen(1337);