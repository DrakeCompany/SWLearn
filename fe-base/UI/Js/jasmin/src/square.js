/**
 * Created by Sa on 2016.11.18..
 */

// module.exports=
function square(mapBasic) {

// var backMap=[];

    // for(var i=0; i<mapBasic.length; i++){
     //  backMap.push(map[i]*map[i]);

    var backMap= mapBasic.map( function (x) {
        return x*x;
    });
    return backMap;
}