/**
 * Created by Sa on 2016.11.18..
 */


// module.exports=
function isPrime(number) {
    var back=true;
    for (var i=2; i<=Math.sqrt(number); i++){
        if(number%i==0){
            back=false;
        }
        console.log(back);
    }
    if(number==0 || number==1)
        back=false;
    return back;
};