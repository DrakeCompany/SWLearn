/**
 * Created by Sa on 2016.11.12..
 */
require(['./hello','./hello2', './test'],function (hello,hello2, test) {
    hello.say("Sanyi");
    hello2.other(hello2.value);
    hello.say(test());

});
// require(['./hello2'],function (hello2) {
//     hello2.other();
// })