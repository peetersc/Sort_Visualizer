/*
  sketch.js: Main sorting animation view
  Alex: Responsible for animation
  Last Updated: 7/9/20 @ 4:00pm by Alex
*/
import {sortType} from '../Home'
import {beginSort} from '../Home'
let sortArray =[]
export {sortArray};


export default function sortingSketch (p){
    const height = 300
    const width = 800
    let numBars = 10;
    let barWidth = width / (numBars);
    let swapIndex=0;
    p.setup =function (){
        p.createCanvas(width,height);
        resetArray();
    };
    function resetArray() {
        swapIndex=-2;
        p.print(swapIndex);
        sortArray=new Array(numBars);
        for (let i = 0; i < sortArray.length; i++) {
            sortArray[i]=p.random(height);
        }
    }
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
        let sortID=0;//want to import sortType from home.js
        if (beginSort){
            if(sortType.find(elem=>elem.active ===true).id===0)//bubble sort
            {
                bubbleSort(sortArray);
            }
            if(0)
            {
                quickSort(sortArray);
            }
        }
        for (let i = 0; i < numBars; i++) { //drawing every rectangle from index 0 to last index
            p.fill('grey') //fill rectangle color
            if (i===swapIndex){//index where the swap has taken place
                p.fill('red') 
            }
            if(i-1===swapIndex)//swapIndex and the previous index (one to the left)
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
    function bubbleSort(sortArray){
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
            swapIndex=-2;
            p.noLoop();
            //beginSort=false;
            resetArray();
        }
    }
    function quickSort(sortArray){
        
    }
}