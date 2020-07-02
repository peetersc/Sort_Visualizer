export default function sketch (p){
//FOR EVERY SINGLE p5 FUNCTION U GOTTA do p.FUNCTIONNAME = function (){
//and to call any p5 function u gotta do p.draw() or p.size()
let sortArray =[]
const height =300
const width = 800

p.setup =function (){
    p.createCanvas(width,height);
    resetArray()
};
function resetArray() {
    sortArray=new Array(width);
    for (let i = 0; i < sortArray.length; i++) {
        sortArray[i]=p.random(height);
    }
    
}

p.draw =function (){
    p.background(0);
    for (let i = 0; i < sortArray.length; i++) {
        p.stroke(255);
        p.line(i, height, i, height - sortArray[i]);
      }
}


}