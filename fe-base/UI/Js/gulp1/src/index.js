/**
 * Created by Sa on 2016.11.14..
 */
console.log('index1');//index1

console.log("index1");

function fakt(x) {
    var count=1;
    for(var i=1; i<x; i++){
        count=count*i;
        console.log(count);
    }
    return console.log('fakt:'+count);
}
fakt(7);

let x = () => {
    console.log('es6');
};
x();