
/*
  sketch.js: Main sorting animation view
  Alex: Responsible for animation
  Last Updated: 7/9/20 @ 4:00pm by Alex
*/
import {sortType, speedSliderVal} from '../Home'
let iterator;
let paused;
const height = 300
const width = window.innerWidth / 1.307
export let activeLine = 0;
let barWidth = width / (50);
let sortArray =[];
let colorArray=[];
let arrayViewColor=[];
let unsortedArray = [];
let viewArray = [];
let piv;
let speed;
let par;
let heightOffset = 50;
let comparisons = 0;
let arrayAccesses = 0;
let flag;
let arraySize=50;

export function beginSortClick(){ 
  switch(sortType.find(elem=>elem.active ===true).value){
    case 'Bubble':
      iterator = bubbleSort(sortArray,colorArray);
      break;
    case 'Quick':
      iterator=quicksort(sortArray,0,sortArray.length,colorArray);
      break;
    case 'Merge':
      iterator=mergeSort(sortArray,0,sortArray.length-1,colorArray);
      break;
    case 'Insertion':
        iterator=insertionSort(sortArray,colorArray);
      break;
    case 'Selection':
      iterator=selectionSort(sortArray,colorArray);
      break;
  }                
  paused=false;
  par.redraw();
}

export function typeClicked(){
  initArray();
}

export function pauseClicked(){
  if(paused)
    paused=false;
  else
    paused=true;
  par.redraw();
}

export function nextClicked(){
  paused=false;
  par.redraw();
  paused=true;
}

export function setSize(x){
  arraySize = x;
  initArray();
}

function initArray() {
        sortArray=new Array(arraySize);
        colorArray=new Array(arraySize);
        unsortedArray=new Array(arraySize);
        let heightMin = 10;
        for (let i = 0; i < arraySize; i++) {
            let rectHight = Math.floor(Math.random()*(height-heightMin)+heightMin);
            sortArray[i]= rectHight;
            unsortedArray[i] = rectHight;
            colorArray[i]='floralwhite';
        }
        paused=true;
        // Reset comparisons and arrayAccesses
        comparisons=0;
        arrayAccesses=0;
        flag=true;
}
export default function sortingSketch (p){
    par=p;
    p.setup =function (){
        p.createCanvas(width,height+heightOffset);
        iterator=bubbleSort(sortArray,colorArray);
        initArray();
    };
    p.draw = function (){
        p.background(38, 38, 38);
        p.noStroke(); 
        speed=speedSliderVal;
        speed=100-speed;
        speed*=12.5;
        barWidth=width/arraySize;     
        for (let i = 0; i < arraySize; i++) {
            p.fill(colorArray[i]);
            //p.ellipse(i*barWidth,height-sortArray[i]+heightOffset,barWidth,barWidth)
            p.rect(i*barWidth, height-sortArray[i]+heightOffset, barWidth, sortArray[i]);//rectangle(starting x coordinate from the bottom of canvas,starting y coord, width of rect, height )
        }
        p.fill(255);
        p.text('Swaps: ' + arrayAccesses, 0, 20);
        p.text('Comparisons: ' + comparisons, 0, 40);
        if(!paused&&flag){
          flag=false;
          iterator.next();
        } 
    
    }
    function callNext(){
    }
}    
    const sleep = (milliseconds) => {
      return new Promise(resolve => setTimeout(resolve, milliseconds))
    }

    async function* bubbleSort(arr,cArray) {
      //can go 0 to 1250. 100-speed because speed works with sleeps so its inverted
      activeLine = 1;        
        for (let i = arr.length-1; i > 0; i--) {
          activeLine = 2;        
          //pause before each outer loop iteration
            for (let j = 0; j < i; j++) {
              //sets the elements being compared to different colors
              cArray[j+1] = 'Maroon';
              cArray[j] = 'blue';
              //quick pause at the start of every inner loop iteration to show the elements being compared
              await sleep(speed) 
              flag=true;             
              yield;
              //swap them back to their original colors
              cArray[j+1]= 'floralwhite';
              cArray[j]= 'floralwhite';
              activeLine = 3;        
              if (arr[j] > arr[j + 1]) {
                //if a swap is needed, switch them back to the comparison colors and do a quick pause
                cArray[j+1] = 'Maroon';
                cArray[j] = 'blue';
                //swap them and swap their colors
                activeLine = 4;        
                swap(arr, j, j + 1);
                cArray[j+1] = 'blue';
                cArray[j] = 'Maroon';
                //do a quick pause to show they swapped, then set the swapped element to a specific color 
                //and the other element to its original color
                cArray[j]= 'floralwhite';
              }
              // Increment Comparisons
              comparisons++;
            }
            activeLine = 0;        

            //set all elements swapped along the way of the inner loop back to their original colors
            for (let k = 0; k < i; k++) {
              cArray[k]= 'floralwhite';
            }
            //set the ith iteration to green to mark its sorted and wont be touched again
            cArray[i]='DarkSeaGreen';
          }
        cArray[0]='DarkSeaGreen';
    }


    async function* partition(arr, low, high,cArray) {
      var pivot = arr[high - 1];
      piv = low;
      activeLine = 5;
      for (let j = low; j < high; j++) {
        activeLine = 6;

        //initialize the starying and ending points with the same color
        for (let i = 0; i < sortArray.length; i++) {
          if(cArray[i]==='red'||cArray[i]==='maroon')
            cArray[i]= 'floralwhite'
        }        
        cArray[low] = 'blue';
        cArray[high - 1] = 'blue';
        cArray[piv]='red';
        cArray[j]='maroon';
        
        //sleep before begin the iteration
        await sleep(speed)
        flag=true;             
        yield;
        activeLine = 7;

        if (arr[j] < pivot) {
          //quick pause before the swap
          activeLine = 8;
          swap(arr, piv, j);
          //swap the colors to show the swap, then do a quick pause
          //swap j back, set the pivot to neutral, and set a new pivot
          piv++
        }
        // Increment Comparisons
        comparisons++;
      }
      swap(arr, piv, high - 1)
      cArray[piv]='DarkSeaGreen';
    }
    async function* quicksort(arr, low, high,cArray) {
      activeLine = 1;
      if (low < high) {
        activeLine = 2;
        yield* partition(arr, low, high,cArray)
        activeLine = 3;
        yield* quicksort(arr, low, piv,cArray)
        activeLine = 4;
        yield* quicksort(arr, piv + 1, high,cArray)
      }
      activeLine = 0;

    }


    async function * insertionSort(arr,cArray) {
      //set the first element to the sorted color
      cArray[0] = 'DarkSeaGreen';

      activeLine = 1;
      for (let i = 1; i < arr.length; ++i) {
          let j = i - 1;
          activeLine = 4;
          while (j >= 0 && arr[j] > arr[i]) {
            //set i and j to their own colors, then do a quick pause
            cArray[i] = 'blue';
            cArray[j] = 'maroon';
            flag=true;       
            yield;
            await sleep(speed)
            swap(arr, i, j);

            //show the color swap with a quick pause
            cArray[i] = 'blue';
            cArray[j] = 'maroon';
            
            //set the sorted items to their own color
            cArray[j] = 'DarkSeaGreen';
            activeLine = 5;
            swap(cArray, i--, j--);
            // Increment Comparisons
            comparisons++;
          }
          
          //reset anything i overrode back to the sorted color
          cArray[i]='DarkSeaGreen'
          activeLine = 0;

        }
    }

    async function swap(arr, a, b) {
        let temp = arr[a];
        arr[a] = arr[b];
        arr[b] = temp;
        arrayAccesses++;
    }


    async function* selectionSort(arr,cArray){                              // min selection sort
      activeLine =1;
      for (let i = 0; i < arr.length; ++i) {        //traversing unsorted array
        //sleep at start of new iteration
        activeLine =2;

          let min_index = i;                              //find minimum element in unsorted array
          for (let j = i; j < arr.length; ++j) { 
            //reset the unsorted colors to neutral
            cArray[j] =  'floralwhite';
          }
          //set the element to be swapped to its own color
          cArray[i] = 'green';

          activeLine =3;
          for (let j = i; j < arr.length; ++j) { 
            //set colors for comparisons
            cArray[j] = 'Maroon';                        //current traversing index
            cArray[min_index] = 'blue';               //current min index

            //quick pause to show colors
            await sleep(speed)
            flag=true;       
            yield;
            cArray[j]='floralwhite'
            //trailing colors between min and i set to their own color
            cArray[min_index] =  'floralwhite';             
            activeLine =4;

            if (arr[j] < arr[min_index]) {    //comparison for smaller value
              activeLine =5;
              min_index = j;
              //reset trailing colors once min changes
              for (let k = i; k < j; ++k) { 
                cArray[k] =  'floralwhite';
              }
            }
            // Increment Comparisons
            comparisons++;
          }
          // Swap with current element
          if (min_index !== i) {
            //swap and show changes with color swap
            cArray[min_index] = 'blue';
            activeLine =6;

            swap(sortArray, i, min_index);
            cArray[i] = 'blue';
          }
          // Increment Comparisons
          comparisons++;
          // Current element is correctly sorted
          cArray[i] = 'DarkSeaGreen';
        }
    }


    async function* merge(arr,low,middle,high,cArray){

        let i = low;
        let j = middle + 1;
        activeLine =7;     
        while (i <= middle && j <= high) {
          cArray[i] = 'red';
          cArray[j] = 'red';
          await sleep(speed);
          flag=true;
          yield;
          cArray[i] =  'floralwhite';
          cArray[j] =  'floralwhite';
          activeLine =8;     
          if (arr[i] > arr[j]) {
          activeLine =9;     
          for (let k = i; k <= j; ++k) {
              activeLine =10;     
              swap(arr, k, j);
            }
            ++j;
            ++middle;
          }
          comparisons++;
          ++i;
        }
    }
    async function* mergeSort(arr,low,high,cArray){ 
        activeLine =1;     
        if(low<high){
           activeLine =2;     
           let middle = Math.floor((low+high)/2);
           activeLine =3;     

            yield* mergeSort(arr,low,middle,cArray)
           activeLine =4;     
            yield* mergeSort(arr,middle+1,high,cArray);
           activeLine =5;     
            console.log(low)            
            console.log(high)

            yield* merge(arr,low,middle,high,cArray);
        }
        comparisons++;
    }
    

  

  
