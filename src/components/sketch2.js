let sortArray =[]
export {sortArray};
export default function quickSketch (p){
    //FOR EVERY SINGLE p5 FUNCTION U GOTTA do p.FUNCTIONNAME = function (){
    //and to call any p5 function u gotta do p.draw() or p.size()
    
    const height = 300
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

    // Atticus
    let numBars = 100;
    let barWidth = width / numBars;
    p.draw =function (){
        // Scale and translate are done so that the origin is in the bottom left
        // instead of the top left, and so that rectangles are drawn from the
        // bottom up instead of top down.
        p.scale(1,-1);
        p.translate(0, -height);
        // p.background(255);
        for (let i = 0; i < numBars; i++) {
            p.stroke(0);
            p.fill(100);
            p.rect(i*barWidth, 0, barWidth, sortArray[i]);
        }
    }
}