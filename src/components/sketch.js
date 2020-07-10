
/*
  sketch.js: Main sorting animation view
  Alex: Responsible for animation
  Last Updated: 7/9/20 @ 4:00pm by Alex
*/
import {sortType,beginSort,arraySize} from '../Home'

export default function sortingSketch (p){
    const height = 300
    const width = window.innerWidth / 1.307
    let barWidth = width / (arraySize);
    let sortArray =[];
    let arrayColor=[];
    let iterator;
    let paused;
    let piv;
    p.setup =function (){
        p.createCanvas(width,height);
        resetArray();
    };
    function resetArray() {
        sortArray=new Array(arraySize);
        arrayColor=new Array(arraySize);
        for (let i = 0; i < sortArray.length; i++) {
            sortArray[i]=p.random(height);
            //arrayColor[i]=-1;
            arrayColor[i]='floralwhite';
        }
        paused=false;            
        iterator = tempGenerator();

    }
    function *tempGenerator(){
        while(true)
        yield;
    }
    p.draw =function (){
        // Scale and translate are done so that the origin is in the bottom left
        // instead of the top left, and so that rectangles are drawn from the
        // bottom up instead of top down.
        p.scale(1,-1);
        p.translate(0, -height);
        p.background(38, 38, 38);
        p.stroke(0);    
        if(beginSort.isPressed)
        {
            resetArray();
            beginSort.isPressed=false;        
        }
        if (beginSort.active){
            if(sortType.find(elem=>elem.active ===true).id===0)//bubble sort
            {
                iterator = bubbleSort(sortArray);
            }
            else if(sortType.find(elem=>elem.active ===true).id===1)
            {
                iterator=quicksort(sortArray,0,arraySize);      

            }
            else if(sortType.find(elem=>elem.active ===true).id===2)
            {
                iterator=mergeSort(sortArray,0,arraySize);
            } 
            else if(sortType.find(elem=>elem.active ===true).id===3)
            {
                iterator=insertionSort(sortArray);
            } 
            else if(sortType.find(elem=>elem.active ===true).id===4)
            {
                iterator=selectionSort(sortArray);
            }                
               
            beginSort.active=false;

        } 
        if(!paused){
             if(iterator.next().done)
             {
                for (let i = 0; i < arraySize; i++) {
                    arrayColor[i]='DarkSeaGreen';
                }
             }
        }
        
       
        for (let i = 0; i < arraySize; i++) {
            p.fill(arrayColor[i]);
            p.rect(i*barWidth, 0, barWidth, sortArray[i]);//rectangle(starting x coordinate from the bottom of canvas,starting y coord, width of rect, height )
        }   
    }
    async function* bubbleSort() {
        for (let i = sortArray.length-1; i > 0; i--) {
            for (let j = 0; j < i; j++) {
            arrayColor[j+1] = 'Maroon ';
            yield;
            arrayColor[j+1]='floralwhite ';
              if (sortArray[j] > sortArray[j + 1]) {
                swap(sortArray, j, j + 1);
              }
            }
            arrayColor[i]='DarkSeaGreen';
          }
        arrayColor[0]='DarkSeaGreen';
    }
    function * insertionSort() {
        for (let i = 1; i < sortArray.length; ++i) {
            let j = i - 1;
    
            while (j >= 0 && sortArray[j] > sortArray[i]) {
              arrayColor[i] = 'Maroon ';
              yield;
              arrayColor[i] = 'floralwhite ';
              swap(sortArray, i, j);
              swap(arrayColor, i--, j--);
            }
          }
    }
    function* partition(arr, low, high) {
        var pivot = arr[high - 1];
        piv = low;
        for (let j = low; j < high; j++) {
            arrayColor[low] = 'RoyalBlue';
            arrayColor[high - 1] = 'RoyalBlue';
            arrayColor[piv] = 'Maroon ';
            arrayColor[j] = 'Maroon ';
          yield;
            arrayColor[piv]='floralwhite '
            arrayColor[j]='floralwhite '
          if (arr[j] < pivot) {
            swap(arr, piv, j);
            piv++
          }
        }
        swap(arr, piv, high - 1)
        arrayColor[piv] = 'DarkSeaGreen';
      }
      
      function* quicksort(arr, low, high) {
        if (low < high) {
          yield* partition(arr, low, high)
          yield* quicksort(arr, low, piv)
          yield* quicksort(arr, piv + 1, high)
        }
      }
    function swap(arr, a, b) {
        let temp = arr[a];
        arr[a] = arr[b];
        arr[b] = temp;
    }
    
    function* selectionSort(){                              // min selection sort
        for (let i = 0; i < sortArray.length; ++i) {        //traversing unsorted array
            let min_index = i;                              //find minimum element in unsorted array
            for (let j = i; j < sortArray.length; ++j) { 
              arrayColor[j] = 'Maroon ';                        //current traversing index
              arrayColor[min_index] = 'blue';               //current min index
              yield;
              arrayColor[j] = 'floralwhite ';                       //reset color
              arrayColor[min_index] = 'floralwhite ';               //reset color
              if (sortArray[j] < sortArray[min_index]) {    //comparison for smaller value
                min_index = j;
              }
            }
            // Swap with current element
            if (min_index !== i) {
              swap(sortArray, i, min_index);
            }
            // Current element is correctly sorted
            arrayColor[i] = 'DarkSeaGreen';
            yield ;
          }
    }
    function* merge(arr,low,middle,high){
        /*let i = low;
        let j = middle + 1;
        while (i <= middle && j <= high) {
          arrayColor[i] = 'IndianRed ';
          arrayColor[j] = 'IndianRed ';
          yield;
          arrayColor[i] = 'floralwhite ';
          arrayColor[j] = 'floralwhite ';
          if (arr[i] > arr[j]) {
            for (let k = i; k <= j; ++k) {
              swap(arr, k, j);
              swap(arr, k, j);
            }
            ++j;
            ++middle;
          }
          ++i;
        }*/ 
        //shit doesnt work lol
    }
    function* mergeSort(arr,low,high){
        if(low<high){
           let middle = ((low+high)/2);
            yield mergeSort(arr,low,middle)
            yield mergeSort(arr,middle+1,high);
            yield merge(arr,low,middle,high);
        }
    }

    
}