let sortArray =[]
export {sortArray};
export default function bubbleSketch (p){
    //FOR EVERY SINGLE p5 FUNCTION U GOTTA do p.FUNCTIONNAME = function (){
    //and to call any p5 function u gotta do p.draw() or p.size()
    
    const height = 300
    const width = 800
    let numBars = 50;
    let barWidth = width / (numBars);
    let swapIndex=0;
    p.setup =function (){
        p.createCanvas(width,height);
        resetArray()
    };
    function resetArray() {
        swapIndex=0;
        p.print(swapIndex);
        sortArray=new Array(numBars);
        for (let i = 0; i < sortArray.length; i++) {
            sortArray[i]=p.random(height);
        }
    }
    // Atticus
    let i=0;
    
    let j=0;
    p.draw =function (){
        // Scale and translate are done so that the origin is in the bottom left
        // instead of the top left, and so that rectangles are drawn from the
        // bottom up instead of top down.
        p.scale(1,-1);
        p.translate(0, -height);
        p.background(255);
        p.stroke(0);
        
        if (sortArray[j]>sortArray[j+1]){
                swapIndex=j;
                swap(sortArray,j,j+1);
        }
        if(i<sortArray.length){
            j++;
            if(j>=sortArray.length-1-i){
                j=0;
                 i++;
            }
        }else{
            swapIndex=10000000;
            p.noLoop();
        }
        
        for (let i = 0; i < numBars; i++) { //drawing every rectangle from index 0 to last index
            p.fill('grey') //fill rectangle color
            if (i===swapIndex){
            p.fill('red') 
            }
            if(i-1===swapIndex)
            {
                p.fill('green')
            }
            p.rect(i*barWidth, 0, barWidth, sortArray[i]);//rectangle(starting x coordinate from the bottom of canvas,starting y coord, width of rect, height )
        }
    }
    function swap(arr, a, b) {
        let temp = arr[a];
        arr[a] = arr[b];
        arr[b] = temp;
      }
}