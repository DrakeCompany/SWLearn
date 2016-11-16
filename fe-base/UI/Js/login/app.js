var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var app = express(); // create an express application

var users = {
    test_user_1: 'secret_password', // the key is the username, the value is the password
    test_user_2: 'so_secure'
};

var validSessions = {};

app.use(                     // Let's use the bodyParser middleware
    bodyParser.urlencoded( { // to parse the urlencoded POST body.
        extended: false      // We won't have anything fancy in the body.
    } )
);

// The browser can store a short string, key value pairs, associated with domains. When it requests a site from a
// server, it will include this string as the "Cookie" http request header's value.

app.use( cookieParser() ); // The cookieParser middleware parses this string, and fills the request.cookie
                           // property.

app.use( function( req, res, next ) {
    if( req.path == '/login.html' ) {
        // Allow unauthenticated users to view the login page.
        return next(); // Pass the request to the next middleware.
    }

    if( !req.cookies.session || !( req.cookies.session in validSessions ) ) {
        // Either the user doesn't have a session, or his session id is invalid.
        // We can't authenticate him, let's redirect him to the login page.

        res.status(303); // The HTTP response status code 303 means the browser should issue a GET request
                         // to the URL specified in the "Location" response http header.

        res.header('Location', '/login.html'); // Set the beforementioned "Location" header.

        return res.send(); // Close the response.
    }

    // Retrieve the username associated with this session.
    req.user = validSessions[ req.cookies.session ];

    console.log( req.user );

    next(); // Pass the request to the next middleware.
} );

app.post( '/login.html', function( req, res ) {
    var doesUserExist = req.body.user in users; // Check whether we have a user named req.body.user

    var isPasswordCorrect = // Check whether the specified password is correct, but...
        doesUserExist &&    // ...we don't want to check the password of a non-existing user
        users[ req.body.user ] == req.body.password;

    if( !isPasswordCorrect ) {                  // If the user entered wrong credentials...
        res.status(403);                        // HTTP response status 401 means "Unauthorized"
        res.send('Wrong username or password'); // Close the response.
        return;
    }

    var newSessionId = ~~( Math.random() * 999999 ); // This is an insecure way to generate a session id.
                                                     // It should be a long, random string.

    validSessions[ newSessionId ] = req.body.user; // Mark that this session belongs to the user.

    res.cookie( 'session', newSessionId ); // Sets the "Set-Cookie" http response header to something like
                                           // "session=34545; Domain=localhost:3001; Path=/"
                                           // After this response the browser will send this value back to us
                                           // anytime we request something from localhost:3001/*

    res.status(303);
    res.header('Location', '/');

    res.send(); // Close the response.
                // The user is logged in, will be redirected to the index page.
} );

app.use( express.static('public') ); // Serve files from the "public" directory
                                     // The url "/index.html" will be mapped to the file "./public/index.html"

// path to retrieve the username
// will be called from AJAX
app.get( '/user', function( req, res ) {
    res.send( req.user );
} );

app.listen(3001);

