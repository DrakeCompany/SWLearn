/**
 * Created by Sa on 2016.11.11..
 */
console.log("vagyok");

var hello = require('./hello');
hello.hello();

function callWithTwo( func ) {
    func( 2 );
}
callWithTwo( function( x ) {
    console.log( x * x );
} );