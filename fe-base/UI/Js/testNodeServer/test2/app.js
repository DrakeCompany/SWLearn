/**
 * Created by Sa on 2016.11.12..
 */
//console.log('Hello world!');
var hello = require('./hello');
hello.hello();

function callWithTwo( func ) {
    func( 2 );
}
callWithTwo( function( x ) {
    console.log( x * x );
} );