function callWithTwo(l){l(2)}console.log("vagyok");var hello=require("./hello");hello.hello(),callWithTwo(function(l){console.log(l*l)});
