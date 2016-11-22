/**
 * Created by Sa on 2016.11.12..
 */
define('test',['./hello'], function (hello) {
    return function () {
        return hello.value *2;
    }
});

//npm install requirejs
//r.js -o baseUrl=. name=src/index out=build.js