/*
  sketch.js: Main sorting animation view
  Alex: Responsible for animation
  Last Updated: 7/9/20 @ 4:00pm by Alex
*/
import {sortType,beginSort,arraySize} from '../Home'
export default function sortingSketch (p){
    const height = 300
    const width = 800
    let barWidth = width / (arraySize);
    let i=0;
    let j=0;
    let sortArray =[];
    let arrayColor=[];
    p.setup =function (){
        p.createCanvas(width,height);
        resetArray();
    };
    function resetArray() {
        sortArray=new Array(arraySize);
        arrayColor=new Array(arraySize);
        for (let i = 0; i < sortArray.length; i++) {
            sortArray[i]=p.random(height);
            arrayColor[i]=-1;
        }
        i=0;
        j=0;
    }
    p.draw =function (){
        // Scale and translate are done so that the origin is in the bottom left
        // instead of the top left, and so that rectangles are drawn from the
        // bottom up instead of top down.
        p.scale(1,-1);
        p.translate(0, -height);
        p.background(255);
        p.stroke(0);
        if(beginSort.isPressed)
        {
            resetArray();
            beginSort.isPressed=false;
        }
        if (beginSort.active){

            if(sortType.find(elem=>elem.active ===true).id===0)//bubble sort
            {
                bubbleSort(sortArray);
            }
            if(sortType.find(elem=>elem.active ===true).id===1)
            {
                quickSort(sortArray,0,arraySize-1);            
                beginSort.active=false;

            }
            if(sortType.find(elem=>elem.active ===true).id===4)
            {
                selectionSort(sortArray);
            }
        }
        for (let i = 0; i < arraySize; i++) { //drawing every rectangle from index 0 to last index
            if (arrayColor[i] === -1){
                p.fill('grey');
            }
            if (arrayColor[i] === 0) {
                arrayColor[i]=-1;
                p.fill(255, 0, 0); //red
            }
            if (arrayColor[i] === 1) {
                p.fill(100, 200, 50);//green
            }
            
            p.rect(i*barWidth, 0, barWidth, sortArray[i]);//rectangle(starting x coordinate from the bottom of canvas,starting y coord, width of rect, height )
        }
    }
    function bubbleSort(arr){
        if (sortArray[j]>sortArray[j+1]){
            swap(sortArray,j,j+1);
            arrayColor[j+1]=0;
        }
        if(i<sortArray.length){
            j++;
            if(j>=sortArray.length-1-i){
                arrayColor[j]=1;
                j=0;
                i++;
            }
        }else{
            arrayColor[0]=1;
            i=0;
            j=0;
            beginSort.active=false;
        }
    }

      async function quickSort(arr, start, end) {
        if (start >= end) {
            return
        }
        let index = await partition(arr, start, end);
        arrayColor[index] = -1;
        await Promise.all([
            quickSort(arr, start, index - 1),
            quickSort(arr, index + 1, end)
        ]);
    }
    
    async function partition(arr, start, end) {
        for (let i = start; i < end; i++) {
            arrayColor[i] = 1;
        }
        let pivotIndex = start;
        let pivotValue = arr[end];
        arrayColor[pivotIndex] = 0;
        for (let i = start; i < end; i++) {
            if (arr[i] < pivotValue) {
                await swapS(arr, i, pivotIndex)
                arrayColor[pivotIndex] = -1;
                pivotIndex++;
                arrayColor[pivotIndex] = 0;
            }
        }
        await swapS(arr, pivotIndex, end);
        for (let i = start; i < end; i++) {
            //arrayColor[i] = -1;
        }
    
        return pivotIndex;
    }
    
    async function swapS(arr, a, b) {
        await sleep(20)
        let temp = arr[a];
        arr[a] = arr[b];
        arr[b] = temp;
    }
    function swap(arr, a, b) {
        let temp = arr[a];
        arr[a] = arr[b];
        arr[b] = temp;
    }
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    function selectionSort(sortArray){
        
    }
}