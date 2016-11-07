/**
 * Created by Sa on 2016.11.07..
 */
class Duck {
    constructor(y){
       this.element= document.createElement('div');
       this.element.classList.add('duck');
        this.element.style.top=y+"px";
           document.getElementById('container').appendChild(this.element);//gyermekeként hozzáadja a kacsát
        this.move();
        this.element.addEventListener('mouseover', ()=>{
            window.clearInterval(this.interval);
          //  console.log( this.element.style);
           // console.log(this.element.style.backgroundImage);
            this.element.style.backgroundImage="url(blood.png)";
        });

    }
    move(){
        this.x =0;
        this.interval=setInterval( ()=> {
            let x = this.x + "px";
            this.element.style.left = x;



            this.x+=5;
         if(this.x>=window.innerWidth){

             window.clearInterval(this.interval);
             console.log("Vége")
         }

        },10)


    }

}

// for(var i=0; i<6; i++){
//     ((y) =>{
//     setTimeout(function(){
//         new Duck(y*100)
//         }, 1000);
//     }) (i);
// }

for(let i=0; i<26; i++){
    setTimeout(function () {

         new Duck(Math.random()*(window.innerHeight-50));
    },i*500)

}